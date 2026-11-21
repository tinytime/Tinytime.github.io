import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// Non-production evidence only. Revision-21 silhouette and construction art are immutable inputs.
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const basePath=path.join(root,'project-background/qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg');
const overlayPath=path.join(root,'project-background/qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-INTEGRATED-FACE-OVERLAYS-01.svg');
const out=path.join(root,'qa-output/fourth-batch-integrated-faces');
fs.mkdirSync(out,{recursive:true});
const base=fs.readFileSync(basePath,'utf8'),overlay=fs.readFileSync(overlayPath,'utf8');
const blob=crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+Buffer.byteLength(base)+'\0'),Buffer.from(base)])).digest('hex');
const approved='36f645d7de9ee5bedc79a0288c50bc8399382f4b';
if(blob!==approved)throw new Error('Protected revision-21 source mismatch: '+blob);
if(!base.includes('DESIGN EXPLORATION 21'))throw new Error('Revision-21 source title missing');
const ids=['sailor-front','sailor-left','sailor-right','slicker-front','slicker-left','slicker-right','painter-front','painter-left','painter-right'];
for(const id of ids)if(!overlay.includes('id="'+id+'"'))throw new Error('Missing overlay '+id);
const svgOpen=overlay.indexOf('<svg');
const inner=overlay.slice(overlay.indexOf('>',svgOpen)+1,overlay.lastIndexOf('</svg>'));
const composite=base.replace('</svg>',inner+'</svg>');
const people=[{id:'sailor',label:'SAILOR #12',y:128},{id:'slicker',label:'SLICKER #13',y:458},{id:'painter',label:'PAINTER #14',y:788}];
const xByDirection={front:51,left:271,right:381},directions=['front','left','right'];
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:1});
 const result=await page.evaluate(async({source,baseSource,people,directions,xByDirection})=>{
  const render=async(x,y,w,h,src=source)=>{
   const svg=src.replace('width="1800" height="1330" viewBox="0 0 1800 1330"',`width="${w}" height="${h}" viewBox="${x} ${y} 64 96"`);
   const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);await img.decode();
   const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.drawImage(img,0,0,w,h);return c.toDataURL('image/png');
  };
  const data=[],containmentAudit=[];
  for(const p of people)for(const d of directions){
   const x=xByDirection[d],y=p.y,baseUrl=await render(x,y,64,96,baseSource),compositeUrl=await render(x,y,64,96);
   const a=new Image(),b=new Image();a.src=baseUrl;b.src=compositeUrl;await a.decode();await b.decode();
   const ca=document.createElement('canvas'),cb=document.createElement('canvas');ca.width=cb.width=64;ca.height=cb.height=96;
   const xa=ca.getContext('2d',{willReadFrequently:true}),xb=cb.getContext('2d',{willReadFrequently:true});xa.drawImage(a,0,0);xb.drawImage(b,0,0);
   const aa=xa.getImageData(0,0,64,96).data,bb=xb.getImageData(0,0,64,96).data;let outside=0;
   for(let k=0;k<aa.length;k+=4){const bg=aa[k]>215&&aa[k+1]>212&&aa[k+2]>205;const changed=Math.abs(aa[k]-bb[k])+Math.abs(aa[k+1]-bb[k+1])+Math.abs(aa[k+2]-bb[k+2])>18;if(bg&&changed)outside++;}
   containmentAudit.push({character:p.id,direction:d,overlayPixelsOutsideApprovedSilhouette:outside,pass:outside===0});
   data.push({key:p.id+'-'+d,label:p.id[0].toUpperCase()+'-'+d[0].toUpperCase(),native:await render(xByDirection[d],p.y,64,96),direct:await render(xByDirection[d],p.y,28,42)});
  }
  const sheet=async(scale)=>{
   const w=scale==='native'?64:28,h=scale==='native'?96:42,g=12,lh=18,cols=3,c=document.createElement('canvas');
   c.width=g+cols*(w+g);c.height=g+3*(h+lh+g)+14;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width,c.height);x.fillStyle='#fff';x.font='bold 7px sans-serif';x.fillText('S=Sailor K=Slicker P=Painter',g,9);
   for(let i=0;i<data.length;i++){const p=data[i],im=new Image();im.src=p[scale];await im.decode();const px=g+(i%3)*(w+g),py=g+14+Math.floor(i/3)*(h+lh+g);x.fillStyle='#fff';x.font='bold 9px sans-serif';x.fillText(p.label,px,py+11);x.drawImage(im,px,py+lh,w,h);}
   return c.toDataURL('image/png');
  };
  return {data,nativeSheet:await sheet('native'),directSheet:await sheet('direct'),containmentAudit};
 },{source:composite,baseSource:base,people,directions,xByDirection});
 const write=(p,url)=>fs.writeFileSync(p,Buffer.from(url.split(',')[1],'base64'));
 for(const item of result.data){
  write(path.join(out,item.key+'-64x96.png'),item.native);
  write(path.join(out,item.key+'-direct-28x42.png'),item.direct);
  const enlarged=await page.evaluate(async url=>{const im=new Image();im.src=url;await im.decode();const c=document.createElement('canvas');c.width=256;c.height=384;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(im,0,0,256,384);return c.toDataURL('image/png');},item.native);
  write(path.join(out,item.key+'-enlarged-4x.png'),enlarged);
 }
 write(path.join(out,'integrated-faces-native-64x96.png'),result.nativeSheet);
 write(path.join(out,'integrated-faces-direct-28x42.png'),result.directSheet);
 // Extract the same 40x38 head crop used by the existing F6 roster comparator.
 const cropDir=path.join(out,'integrated-face-crops-40x38');fs.mkdirSync(cropDir,{recursive:true});
 const crops=[];
 for(const item of result.data){
  const crop=await page.evaluate(async url=>{const im=new Image();im.src=url;await im.decode();const c=document.createElement('canvas');c.width=40;c.height=38;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(im,12,0,40,38,0,0,40,38);return c.toDataURL('image/png');},item.native);
  write(path.join(cropDir,item.key+'.png'),crop);crops.push({key:item.key,dataUrl:crop});
 }
 const rows=[
  {key:'sailor-front',direction:'front',candidates:['clinic','guard']},
  {key:'sailor-left',direction:'left',candidates:['clinic','guard']},
  {key:'slicker-front',direction:'front',candidates:['hacker','courier']},
  {key:'slicker-left',direction:'left',candidates:['hacker','courier']},
  {key:'painter-front',direction:'front',candidates:['cook','busker']},
  {key:'painter-left',direction:'left',candidates:['cook','busker']}
 ];
 const compareData=rows.map(row=>({
  ...row,design:crops.find(x=>x.key===row.key)?.dataUrl,
  refs:row.candidates.map(c=>{const p=path.join(root,'qa-output/fourth-batch-design/roster-face-crops-native-64x96',c+'-'+row.direction+'.png');return 'data:image/png;base64,'+fs.readFileSync(p).toString('base64');})
 }));
 if(compareData.some(x=>!x.design||x.refs.some(y=>!y)))throw new Error('Integrated matched-face comparison crop missing');
 const comparisons=await page.evaluate(async rows=>{
  const draw=async scale=>{
   const gap=12,cell=40*scale,cellH=38*scale,head=16*scale,label=12*scale,rowH=head+label+cellH+gap,cols=3;
   const c=document.createElement('canvas');c.width=gap+cols*(cell+gap);c.height=gap+rows.length*rowH;
   const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width);
   const names=['INTEGRATED','ROSTER A','ROSTER B'];
   for(let r=0;r<rows.length;r++){
    const row=rows[r],imgs=[row.design,...row.refs],py=gap+r*rowH;
    x.fillStyle='#fff';x.font=scale===1?'bold 8px sans-serif':'bold 12px sans-serif';x.fillText(row.key.toUpperCase(),gap,py+10*scale);
    for(let col=0;col<3;col++){
     const px=gap+col*(cell+gap),im=new Image();im.src=imgs[col];await im.decode();
     x.fillStyle='#fff';x.font=scale===1?'7px sans-serif':'10px sans-serif';x.fillText(names[col],px,py+head+8*scale);
     x.drawImage(im,px,py+head+label,cell,cellH);
    }
   }
   return c.toDataURL('image/png');
  };
  return {native:await draw(1),enlarged:await draw(3)};
 },compareData);
 write(path.join(out,'integrated-matched-face-comparisons-native-40x38.png'),comparisons.native);
 write(path.join(out,'integrated-matched-face-comparisons-3x.png'),comparisons.enlarged);
 if(result.containmentAudit.some(x=>!x.pass))throw new Error('Integrated face overlay extends outside the approved revision-21 silhouette: '+JSON.stringify(result.containmentAudit.filter(x=>!x.pass)));
 const manifest={stage:'non-production integrated grayscale face study',revision21_blob:blob,overlay:'SAILOR-SLICKER-PAINTER-INTEGRATED-FACE-OVERLAYS-01.svg',characters:people.map(x=>x.id),directions,counts:{native64x96:9,direct28x42:9,enlarged4x:9,integratedFaceCrops40x38:9,matchedFaceRows:6},containmentAudit:result.containmentAudit,protected:{revision21_source_modified:false,construction_source_modified:false,production_renderer_modified:false,golden_snapshots_modified:false}};
 fs.writeFileSync(path.join(out,'integrated-face-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log(JSON.stringify({manifest}));
}finally{await browser.close();}
