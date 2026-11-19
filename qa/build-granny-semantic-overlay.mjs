// Capture Granny Volt from the live vector renderer and build a four-direction semantic review sheet.
// Candidate polygons are source-space annotations, not approved measurements.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from 'node:http';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'qa-output');
fs.mkdirSync(out, { recursive: true });
const server = createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  const target = path.resolve(root, '.' + pathname);
  if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403).end('Forbidden'); return; }
  fs.readFile(target,(err,data) => {
    if(err){res.writeHead(404).end('Not found');return;}
    const ext=path.extname(target).toLowerCase();
    const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json'};
    res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});res.end(data);
  });
});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
const browser=await chromium.launch({headless:true});
try {
  const page=await browser.newPage();
  await page.goto('http://127.0.0.1:'+server.address().port+'/VaporCity_HD2D_Hybrid_Test.html',{waitUntil:'networkidle'});
  const result=await page.evaluate(async()=>{
    const createGrannyRenderer=window.NPC_SPRITES&&window.NPC_SPRITES.createGrannyRenderer;
    if(typeof createGrannyRenderer!=='function') throw new Error('NPC_SPRITES.createGrannyRenderer is not exposed by npc_sprites.js');
    const OWT=36/0.28; // renderer scale becomes exactly 1 source unit per output pixel.
    const x=-.1111111111, y=.1044444444;
    const render=(dir,excludeUmbrella)=>{
      const canvas=document.createElement('canvas');canvas.width=100;canvas.height=140;
      const ctx=canvas.getContext('2d');
      const draw=createGrannyRenderer({OWT,og:ctx,artShadow:()=>{}});
      draw({x,y},dir,false,0,0,ctx,{excludeUmbrella,excludeGroundEffects:true});
      return canvas.toDataURL('image/png');
    };
    const directions=['d','u','l','r'].map(direction=>({direction,body:render(direction,true),full:render(direction,false)}));
    const readAlphaRows=async(dataUrl)=>{
      const image=new Image();image.src=dataUrl;await image.decode();
      const canvas=document.createElement('canvas');canvas.width=100;canvas.height=140;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
      const pixels=ctx.getImageData(0,0,100,140).data;
      const rows=[];let bounds={left:100,top:140,right:-1,bottom:-1},pixelCount=0;
      for(let y=0;y<140;y++){
        const spans=[];let start=-1;
        for(let x=0;x<100;x++){
          const on=pixels[(y*100+x)*4+3]>8;
          if(on){pixelCount++;bounds.left=Math.min(bounds.left,x);bounds.right=Math.max(bounds.right,x);bounds.top=Math.min(bounds.top,y);bounds.bottom=Math.max(bounds.bottom,y);}
          if(on&&start<0)start=x;
          if(!on&&start>=0){spans.push([start,x-1]);start=-1;}
        }
        if(start>=0)spans.push([start,99]);
        rows.push(spans);
      }
      return {rows,bounds:pixelCount?bounds:null,pixelCount};
    };
    const masks=[];
    for(const d of directions){
      const body=await readAlphaRows(d.body),full=await readAlphaRows(d.full);
      const fullImage=new Image();fullImage.src=d.full;await fullImage.decode();
      const bodyImage=new Image();bodyImage.src=d.body;await bodyImage.decode();
      const c=document.createElement('canvas');c.width=100;c.height=140;
      const ctx=c.getContext('2d',{willReadFrequently:true});
      ctx.drawImage(fullImage,0,0);const fullPx=ctx.getImageData(0,0,100,140).data;
      ctx.clearRect(0,0,100,140);ctx.drawImage(bodyImage,0,0);const bodyPx=ctx.getImageData(0,0,100,140).data;
      const rows=[];let pixelCount=0;
      for(let y=0;y<140;y++){
        const spans=[];let start=-1;
        for(let x=0;x<100;x++){
          const on=fullPx[(y*100+x)*4+3]>8&&bodyPx[(y*100+x)*4+3]<=8;
          if(on)pixelCount++;
          if(on&&start<0)start=x;
          if(!on&&start>=0){spans.push([start,x-1]);start=-1;}
        }
        if(start>=0)spans.push([start,99]);
        rows.push(spans);
      }
      masks.push({direction:d.direction,bodyAlpha:{threshold:8,...body},fullAlpha:{threshold:8,...full},umbrellaExposedDelta:{threshold:8,rows,pixelCount}});
    }
    return {directions,masks};
  });
  for(const d of result.directions){
    for(const layer of ['body','full']){
      const data=d[layer].split(',')[1];
      fs.writeFileSync(path.join(out,'granny-'+d.direction+'-'+layer+'.png'),Buffer.from(data,'base64'));
    }
  }
  const annotation={
    schemaVersion:1,
    character:'granny',
    status:'candidate_source_annotated',
    sourceCommit:process.env.GITHUB_SHA||null,
    sourceFile:'npc_sprites.js:createGrannyRenderer/drawGrannyVoltSprite',
    sourceGrid:{width:100,height:140},
    pixelMaskConvention:'Exact renderer-output alpha masks in 100x140 source space; row spans are inclusive [xStart,xEnd], alpha threshold >8/255. bodyAlpha is the accessory-excluded anatomy render (raised gripping hand retained); umbrellaExposedDelta is the full-render alpha not present in the body pass. These are pixel masks, distinct from the coarse candidate polygons below.',
    pixelMasks:result.masks,
    renderConvention:'Native source-space capture from live renderer at 1 output pixel per source unit; idle phase 0; ground effects disabled; body layer excludes umbrella canopy and shaft but retains raised gripping hand/arm. Side-view .72 x scale and left mirror are applied by renderer, not pre-baked into coordinates.',
    directions:{
      front:{headTop:8,chin:46,shoulderLeft:{x:36,y:49},shoulderRight:{x:66,y:49},shoulderY:49,pelvisY:97,footBaseline:136,
        bodyPolygon:[{x:32,y:8},{x:66,y:8},{x:68,y:42},{x:70,y:56},{x:73,y:84},{x:73,y:111},{x:78,y:130},{x:78,y:136},{x:27,y:136},{x:27,y:130},{x:32,y:111},{x:27,y:108},{x:29,y:83},{x:30,y:60},{x:32,y:49}],
        bodyAppendagePolygons:[[{x:35,y:55},{x:39,y:57},{x:36,y:68},{x:35,y:81},{x:31,y:83},{x:30,y:81},{x:31,y:67}], [{x:62,y:53},{x:66,y:53},{x:68,y:47},{x:67,y:43},{x:66,y:41},{x:63,y:45},{x:66,y:47},{x:64,y:50}], [{x:62,y:44},{x:66,y:45},{x:65,y:38},{x:62,y:37},{x:61,y:41},{x:64,y:38},{x:65,y:39}]],
        headwearPolygons:[[{x:15,y:-1},{x:50,y:-1},{x:82,y:20},{x:82,y:24},{x:68,y:26},{x:48,y:25},{x:24,y:25},{x:15,y:23}]],
        propPolygons:[[{x:65,y:15},{x:66,y:38},{x:65,y:39},{x:64,y:37}]]},
      back:{headTop:8,chin:49,shoulderLeft:{x:36,y:49},shoulderRight:{x:66,y:49},shoulderY:49,pelvisY:97,footBaseline:136,
        bodyPolygon:[{x:32,y:8},{x:66,y:8},{x:68,y:42},{x:70,y:56},{x:73,y:84},{x:73,y:111},{x:78,y:130},{x:78,y:136},{x:27,y:136},{x:27,y:130},{x:32,y:111},{x:27,y:108},{x:29,y:83},{x:30,y:60},{x:32,y:49}],
        bodyAppendagePolygons:[[{x:35,y:55},{x:39,y:57},{x:36,y:68},{x:35,y:81},{x:31,y:83},{x:30,y:81},{x:31,y:67}], [{x:62,y:53},{x:66,y:53},{x:68,y:47},{x:67,y:43},{x:66,y:41},{x:63,y:45},{x:66,y:47},{x:64,y:50}], [{x:62,y:44},{x:66,y:45},{x:65,y:38},{x:62,y:37},{x:61,y:41},{x:64,y:38},{x:65,y:39}]],
        headwearPolygons:[[{x:15,y:-1},{x:50,y:-1},{x:82,y:20},{x:82,y:24},{x:68,y:26},{x:48,y:25},{x:24,y:25},{x:15,y:23}]],propPolygons:[[{x:65,y:15},{x:66,y:38},{x:65,y:39},{x:64,y:37}]]},
      right:{headTop:8,chin:46,shoulderLeft:{x:44,y:50},shoulderRight:{x:56,y:50},shoulderY:50,pelvisY:97,footBaseline:136,
        bodyPolygon:[{x:39,y:8},{x:61,y:8},{x:64,y:42},{x:65,y:56},{x:66,y:84},{x:66,y:111},{x:70,y:130},{x:70,y:136},{x:30,y:136},{x:30,y:130},{x:34,y:111},{x:31,y:108},{x:34,y:83},{x:35,y:60},{x:38,y:49}],
        bodyAppendagePolygons:[[{x:39,y:55},{x:43,y:57},{x:42,y:68},{x:42,y:81},{x:38,y:83},{x:37,y:81},{x:38,y:67}], [{x:59,y:53},{x:63,y:53},{x:65,y:47},{x:64,y:43},{x:63,y:41},{x:60,y:45},{x:63,y:47},{x:61,y:50}], [{x:60,y:44},{x:64,y:45},{x:63,y:38},{x:60,y:37},{x:59,y:41}]],
        headwearPolygons:[[{x:25,y:-1},{x:50,y:-1},{x:74,y:20},{x:74,y:24},{x:64,y:26},{x:48,y:25},{x:32,y:25},{x:25,y:23}]],propPolygons:[[{x:61,y:15},{x:62,y:38},{x:61,y:39},{x:60,y:37}]]},
      left:{headTop:8,chin:46,shoulderLeft:{x:44,y:50},shoulderRight:{x:56,y:50},shoulderY:50,pelvisY:97,footBaseline:136,
        bodyPolygon:[{x:39,y:8},{x:61,y:8},{x:64,y:42},{x:65,y:56},{x:66,y:84},{x:66,y:111},{x:70,y:130},{x:70,y:136},{x:30,y:136},{x:30,y:130},{x:34,y:111},{x:31,y:108},{x:34,y:83},{x:35,y:60},{x:38,y:49}],
        bodyAppendagePolygons:[[{x:39,y:55},{x:43,y:57},{x:42,y:68},{x:42,y:81},{x:38,y:83},{x:37,y:81},{x:38,y:67}], [{x:59,y:53},{x:63,y:53},{x:65,y:47},{x:64,y:43},{x:63,y:41},{x:60,y:45},{x:63,y:47},{x:61,y:50}], [{x:60,y:44},{x:64,y:45},{x:63,y:38},{x:60,y:37},{x:59,y:41}]],
        headwearPolygons:[[{x:25,y:-1},{x:50,y:-1},{x:74,y:20},{x:74,y:24},{x:64,y:26},{x:48,y:25},{x:32,y:25},{x:25,y:23}]],propPolygons:[[{x:61,y:15},{x:62,y:38},{x:61,y:39},{x:60,y:37}]]}
    }
  };
  fs.writeFileSync(path.join(out,'granny-semantic-candidate.json'),JSON.stringify(annotation,null,2)+'\n');
  const sheet=await page.evaluate(async({directions,annotation})=>{
    const canvas=document.createElement('canvas');canvas.width=4*260+24;canvas.height=330;
    const c=canvas.getContext('2d');c.fillStyle='#292b35';c.fillRect(0,0,canvas.width,canvas.height);
    const colors={body:'#ff3535',headwear:'#39a8ff',props:'#ffd21a',points:'#35f27c'};
    for(let i=0;i<directions.length;i++){
      const d=directions[i],a=annotation.directions[{d:'front',u:'back',l:'left',r:'right'}[d.direction]];
      const im=new Image();im.src=d.body;await im.decode();
      const x=12+i*260,y=12;c.fillStyle='#fff';c.font='bold 16px monospace';c.fillText(d.direction.toUpperCase(),x,y+16);
      c.drawImage(im,x,y+24,240,280);
      const map=p=>{const side=d.direction==='l'||d.direction==='r';const localX=50+(p.x-50)*(side?.72:1);const screenX=d.direction==='l'?100-localX:localX;return [x+120+(screenX-50)*2.4,y+24+p.y*2]};
      const poly=(pts,color)=>{c.beginPath();pts.forEach((p,j)=>{const [xx,yy]=map(p);if(!j)c.moveTo(xx,yy);else c.lineTo(xx,yy)});c.closePath();c.strokeStyle=color;c.lineWidth=1.5;c.stroke()};
      poly(a.bodyPolygon,colors.body);for(const p of a.bodyAppendagePolygons)poly(p,colors.body);
      for(const p of a.headwearPolygons)poly(p,colors.headwear);for(const p of a.propPolygons)poly(p,colors.props);
      for(const k of ['shoulderLeft','shoulderRight']){const [xx,yy]=map(a[k]);c.fillStyle=colors.points;c.beginPath();c.arc(xx,yy,3,0,7);c.fill()}
    }
    return canvas.toDataURL('image/png');
  },{directions:result.directions,annotation});
  fs.writeFileSync(path.join(out,'granny-four-direction-semantic-overlay.png'),Buffer.from(sheet.split(',')[1],'base64'));
  console.log(JSON.stringify({pass:true,directions:result.directions.length,source:'live createGrannyRenderer',status:annotation.status,outputs:['granny-four-direction-semantic-overlay.png','granny-semantic-candidate.json']}));
} finally { await browser.close(); server.close(); }
