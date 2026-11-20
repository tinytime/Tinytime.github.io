// Fourth-batch design-source evidence for revision 20 (Sailor compact connected rope coil, Painter flat wedge brush and wrapped grip; preservation-gated). QA projection utility only:
// it rasterizes approved-stage SVG hypotheses and captures existing roster faces.
// It does not load or alter any production renderer for Sailor/Slicker/Painter.
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'project-background/qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-20.svg');
const htmlPath = path.join(root, 'VaporCity_HD2D_Hybrid_Test.html');
const spritePath = path.join(root, 'npc_sprites.js');
const out = path.join(root, 'qa-output/fourth-batch-design');
fs.mkdirSync(out, { recursive: true });
const svg = fs.readFileSync(sourcePath, 'utf8');

const people = [
  { id:'sailor', label:'SAILOR #12', row:0 },
  { id:'slicker', label:'SLICKER #13', row:1 },
  { id:'painter', label:'PAINTER #14', row:2 }
];
const directions = ['front','back','left','right'];
const panelX = [51,161,271,381]; // exact 64x96 figure-field origins in source SVG
const bodyY = [128,458,788];
const propY = [286,616,946];

const server = createServer((req,res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const file = path.join(root, decodeURIComponent(url.pathname.slice(1)));
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  const ext = path.extname(file);
  const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'}; const type=types[ext]||'application/octet-stream';
  res.writeHead(200, {'content-type':type});
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
const baseUrl = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({headless:true});
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  const svgData = await page.evaluate(async source => {
    const captures = [];
    const sheets = {};
    const renderCrop = async (sx,sy,w,h) => {
      // Change the SVG viewport before rasterization. Native 64x96 and direct
      // 28x42 are therefore two independent vector renders, never a resize.
      const croppedSvg=source.replace('width="1800" height="1330" viewBox="0 0 1800 1330"',
        'width="'+w+'" height="'+h+'" viewBox="'+sx+' '+sy+' 64 96"');
      const image=new Image();
      image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(croppedSvg);
      await image.decode();
      const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      ctx.imageSmoothingEnabled=true;ctx.drawImage(image,0,0,w,h);
      return canvas.toDataURL('image/png');
    };
    const directions=['front','back','left','right'];
    const xs=[51,161,271,381], bodyYs=[128,458,788], propYs=[286,616,946];
    const data={};
    const characterNames=['sailor','slicker','painter'];
    for(let r=0;r<3;r++) for(let d=0;d<4;d++) for(const mode of ['body','prop']){
      const x=xs[d],y=mode==='body'?bodyYs[r]:propYs[r];
      const item={character:characterNames[r],direction:directions[d],mode,
        native:await renderCrop(x,y,64,96),direct:await renderCrop(x,y,28,42)};
      const key=item.character+'-'+item.mode+'-'+item.direction;
      data[key]=item;
    }
    const sourceDirectionLabels=(source.match(/class="lab">/g)||[]).length;
    if(!source.includes('EXPLORATION 20') || directions.length!==4 || sourceDirectionLabels!==24) throw new Error('Unexpected fourth-batch source revision or incomplete 24-view label set');
    // Every civilian's body-only anatomy and prop-on construction must be one
    // continuous dark silhouette in native and independently rasterized
    // direct game-scale projections. Eight-neighbour connectivity is used;
    // no similarity or minimum-size threshold is applied.
    const anatomyConnectivityAudit=[];
    for(const character of characterNames) for(const mode of ['body','prop']) for(const direction of directions) for(const scale of ['native','direct']) {
      const src=data[character+'-'+mode+'-'+direction][scale];
      const im=new Image();im.src=src;await im.decode();
      const width=im.naturalWidth,height=im.naturalHeight;
      const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(im,0,0);
      const rgba=ctx.getImageData(0,0,width,height).data;
      const dark=new Uint8Array(width*height),seen=new Uint8Array(width*height);
      for(let i=0;i<dark.length;i++){const k=i*4;dark[i]=rgba[k]<70&&rgba[k+1]<70&&rgba[k+2]<70?1:0;}
      const componentDetails=[];
      for(let i=0;i<dark.length;i++) if(dark[i]&&!seen[i]) {
        const stack=[i];seen[i]=1;let area=0,minX=width,maxX=0,minY=height,maxY=0;
        while(stack.length){const at=stack.pop(),x=at%width,y=Math.floor(at/width);
          area++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
          for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
            if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;
            if(nx<0||ny<0||nx>=width||ny>=height)continue;
            const ni=ny*width+nx;if(dark[ni]&&!seen[ni]){seen[ni]=1;stack.push(ni);}
          }
        }
        componentDetails.push({area,bounds:{x0:minX,x1:maxX,y0:minY,y1:maxY}});
      }
      anatomyConnectivityAudit.push({character,mode,direction,scale,width,height,connectedComponents:componentDetails.length,components:componentDetails,pass:componentDetails.length===1});
    }
    // Profile-region pixel counts are descriptive only; no arbitrary minimum
    // is imposed. Body-only geometry must remain present in every prop-on view.
    const bodyPreservationAudit=[];
    for(const character of characterNames) for(const direction of directions) {
      const body=new Image(),prop=new Image();
      body.src=data[character+'-body-'+direction].native;
      prop.src=data[character+'-prop-'+direction].native;
      await body.decode(); await prop.decode();
      const canvas=document.createElement('canvas');canvas.width=64;canvas.height=96;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      ctx.drawImage(body,0,0);const b=ctx.getImageData(0,0,64,96).data;
      ctx.clearRect(0,0,64,96);ctx.drawImage(prop,0,0);const p=ctx.getImageData(0,0,64,96).data;
      let removed=0;
      for(let k=0;k<b.length;k+=4) if(b[k]<70&&b[k+1]<70&&b[k+2]<70&&p[k]>150&&p[k+1]>150&&p[k+2]>150) removed++;
      bodyPreservationAudit.push({character,direction,removedBodyPixels:removed,pass:removed===0});
    }
    // Preserve per-view failure detail in the artifact before failing the gate.
    const profilePropAudit=[];
    // Designated near-side views for the separate Sailor/Painter tools. Pixel
    // counts are descriptive only; zero removed body pixels is the pass/fail invariant.
    for(const [character,direction,region] of [
      ['sailor','right',{x0:45,x1:64,y0:35,y1:65}],
      ['painter','left',{x0:0,x1:18,y0:35,y1:75}]
    ]){
      const body=new Image(),prop=new Image();
      body.src=data[character+'-body-'+direction].native;
      prop.src=data[character+'-prop-'+direction].native;
      await body.decode();await prop.decode();
      const canvas=document.createElement('canvas');canvas.width=64;canvas.height=96;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      ctx.drawImage(body,0,0);const b=ctx.getImageData(0,0,64,96).data;
      ctx.clearRect(0,0,64,96);ctx.drawImage(prop,0,0);const p=ctx.getImageData(0,0,64,96).data;
      let added=0,regionAdded=0,removed=0;
      for(let y=0;y<96;y++)for(let x=0;x<64;x++){
        const k=(y*64+x)*4;
        const propDark=p[k]<70&&p[k+1]<70&&p[k+2]<70;
        const bodyLight=b[k]>150&&b[k+1]>150&&b[k+2]>150;
        const bodyDark=b[k]<70&&b[k+1]<70&&b[k+2]<70;
        const propLight=p[k]>150&&p[k+1]>150&&p[k+2]>150;
        if(propDark&&bodyLight){
          added++;
          if(x>=region.x0&&x<region.x1&&y>=region.y0&&y<region.y1)regionAdded++;
        }
        if(bodyDark&&propLight)removed++;
      }
      const pass=removed===0;
      profilePropAudit.push({character,direction,addedSilhouettePixels:added,propRegionAddedPixels:regionAdded,removedBodyPixels:removed,thresholdApplied:false,pass});
    }
    const sheet=(keys,scale,columns,cellW,cellH)=>{
      const gap=16,rows=Math.ceil(keys.length/columns),canvas=document.createElement('canvas');
      canvas.width=gap+columns*(cellW+gap);canvas.height=gap+rows*(cellH+gap);
      const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.fillStyle='#777982';ctx.fillRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<keys.length;i++){
        const item=data[keys[i]],src=scale==='native'?item.native:item.direct,img2=new Image();
        const x=gap+(i%columns)*(cellW+gap),y=gap+Math.floor(i/columns)*(cellH+gap);
        ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';const parts=keys[i].split('-');ctx.fillText(parts[0].toUpperCase()+' / '+parts[2][0].toUpperCase(),x,y+13);
        const im=new Image();im.src=src;
        // Decode is synchronous after the promise below; use predecoded cache.
        const decoded=decodedImages.get(src);ctx.drawImage(decoded,x,y+20,cellW,cellH);
      }
      return canvas.toDataURL('image/png');
    };
    const decodedImages=new Map();
    for(const item of Object.values(data)) for(const src of [item.native,item.direct]) {
      if(decodedImages.has(src))continue;
      const im=new Image();im.src=src;await im.decode();decodedImages.set(src,im);
    }
    const keysFor=(mode,dirs)=>characterNames.flatMap(id=>dirs.map(d=>id+'-'+mode+'-'+d));
    const sheetsOut={};
    for(const mode of ['body','prop']) {
      const all=keysFor(mode,directions);
      sheetsOut[mode+'-native']=sheet(all,'native',4,128,192);
      sheetsOut[mode+'-direct']=sheet(all,'direct',4,56,84);
      sheetsOut[mode+'-front-group']=sheet(characterNames.map(id=>id+'-'+mode+'-front'),'native',3,128,192);
    }
    const enlarge=(src,factor)=>{
      const im=decodedImages.get(src),c=document.createElement('canvas');c.width=im.width*factor;c.height=im.height*factor;
      const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/png');
    };
    for(const [key,item] of Object.entries(data)) item.enlarged4x=enlarge(item.native,4);
    return {data,sheets:sheetsOut,profilePropAudit,bodyPreservationAudit,anatomyConnectivityAudit};
  },svg);
  const writeData=(file,dataUrl)=>fs.writeFileSync(file,Buffer.from(dataUrl.split(',')[1],'base64'));
  for(const [key,item] of Object.entries(svgData.data)){
    writeData(path.join(out,key+'.png'),item.native);
    writeData(path.join(out,key+'-direct-28x42.png'),item.direct);
    writeData(path.join(out,key+'-enlarged-4x.png'),item.enlarged4x);
  }
  for(const [key,url] of Object.entries(svgData.sheets))writeData(path.join(out,key+'-comparison.png'),url);
  fs.writeFileSync(path.join(out,'body-preservation-audit.json'),JSON.stringify(svgData.bodyPreservationAudit,null,2)+'\\n');
  console.log(JSON.stringify({bodyPreservationAudit:svgData.bodyPreservationAudit}));
  if(svgData.bodyPreservationAudit.some(x=>!x.pass))throw new Error('Body-only silhouette pixels removed by prop-on view: '+JSON.stringify(svgData.bodyPreservationAudit.filter(x=>!x.pass)));
  fs.writeFileSync(path.join(out,'profile-prop-audit.json'),JSON.stringify(svgData.profilePropAudit,null,2)+'\\n');
  console.log(JSON.stringify({profilePropAudit:svgData.profilePropAudit}));
  if(svgData.profilePropAudit.some(x=>!x.pass))throw new Error('Prop-on projection removes body-only pixels; anatomy must be preserved');
  fs.writeFileSync(path.join(out,'anatomy-connectivity-audit.json'),JSON.stringify(svgData.anatomyConnectivityAudit,null,2)+'\n');
  console.log(JSON.stringify({anatomyConnectivityAudit:svgData.anatomyConnectivityAudit}));
  if(svgData.anatomyConnectivityAudit.some(x=>!x.pass))throw new Error('Civilian anatomy/prop contact is disconnected: '+JSON.stringify(svgData.anatomyConnectivityAudit.filter(x=>!x.pass)));

  // Capture the proposed new face designs at exact 40x38 crop size.
  const faceStudyPath = path.join(root, 'project-background/qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg');
  const faceStudySvg = fs.readFileSync(faceStudyPath, 'utf8');
  const faceDesigns = await page.evaluate(async source => {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    await img.decode();
    const fields = [
      {key:'sailor-front',x:20},{key:'sailor-profile',x:75},
      {key:'slicker-front',x:185},{key:'slicker-profile',x:240},
      {key:'painter-front',x:350},{key:'painter-profile',x:405}
    ];
    return fields.map(f => {
      const canvas=document.createElement('canvas');canvas.width=40;canvas.height=38;
      const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=true;
      ctx.drawImage(img,f.x,65,40,38,0,0,40,38);
      return {key:f.key,dataUrl:canvas.toDataURL('image/png')};
    });
  },faceStudySvg);
  const faceDesignDir=path.join(out,'new-face-design-crops-40x38');fs.mkdirSync(faceDesignDir,{recursive:true});
  for(const item of faceDesigns)writeData(path.join(faceDesignDir,item.key+'.png'),item.dataUrl);
  const faceDesignSheet=await page.evaluate(async items=>{
    const gap=12,w=160,h=170,cols=3,rows=2;
    const c=document.createElement('canvas');c.width=gap+cols*(w+gap);c.height=gap+rows*(h+gap);
    const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width,c.height);
    for(let i=0;i<items.length;i++){
      const im=new Image();im.src=items[i].dataUrl;await im.decode();
      const px=gap+(i%cols)*(w+gap),py=gap+Math.floor(i/cols)*(h+gap);
      x.fillStyle='#fff';x.font='bold 12px sans-serif';x.fillText(items[i].key.toUpperCase(),px,py+12);
      x.drawImage(im,px,py+20,w,h-20);
    }
    return c.toDataURL('image/png');
  },faceDesigns);
  writeData(path.join(out,'new-face-designs-matched-40x38.png'),faceDesignSheet);

  // Capture current roster face crops through the existing game hooks. This is
  // read-only comparison evidence; no new NPC renderers are installed.
  await page.goto(baseUrl+'/VaporCity_HD2D_Hybrid_Test.html',{waitUntil:'load',timeout:60000});
  await page.waitForTimeout(1200);
  await page.addScriptTag({path:spritePath});
  const rosterFaces = await page.evaluate(async () => {
    if(!window.SG || typeof window.SG.npcRenderDirectionalSnapshots!=='function')
      throw new Error('Existing roster directional snapshot hook unavailable');
    const snapshots=window.SG.npcRenderDirectionalSnapshots();
    const wanted=snapshots.filter(x=>['d','l','r','front','left','right'].includes(String(x.direction).toLowerCase()));
    const out=[];
    for(const item of wanted){
      const im=new Image();im.src=item.dataUrl;await im.decode();
      const c=document.createElement('canvas');c.width=40;c.height=38;
      const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;
      // Broad head/face crop keeps hair, jaw and profile nose visible for
      // geometric comparison; no automated similarity score is applied.
      ctx.drawImage(im,12,0,40,38,0,0,40,38);
      out.push({civ:item.civ,direction:item.direction,dataUrl:c.toDataURL('image/png')});
    }
    return out;
  });
  const faceDir=path.join(out,'roster-face-crops-native-64x96');fs.mkdirSync(faceDir,{recursive:true});
  for(const item of rosterFaces)writeData(path.join(faceDir,item.civ+'-'+item.direction+'.png'),item.dataUrl);
  const faceComparisonRows = [
    {key:'sailor-front',direction:'front',candidates:['clinic','guard']},
    {key:'sailor-profile',direction:'left',candidates:['clinic','guard']},
    {key:'slicker-front',direction:'front',candidates:['hacker','courier']},
    {key:'slicker-profile',direction:'left',candidates:['hacker','courier']},
    {key:'painter-front',direction:'front',candidates:['cook','busker']},
    {key:'painter-profile',direction:'left',candidates:['cook','busker']}
  ];
  const faceComparisons = faceComparisonRows.map(row => ({
    ...row,
    design:faceDesigns.find(x=>x.key===row.key).dataUrl,
    refs:row.candidates.map(civ=>rosterFaces.find(x=>x.civ===civ && x.direction===row.direction)?.dataUrl)
  }));
  if(faceComparisons.some(x=>!x.design || x.refs.some(y=>!y))) throw new Error('Matched face comparison crop missing');
  const faceComparisonData = await page.evaluate(async rows=>{
    const draw=async(scale)=>{
      const gap=12,cellW=40*scale,cellH=38*scale,headH=14*scale,labelH=10*scale,cols=3;
      const rowH=headH+labelH+cellH+gap;
      const c=document.createElement('canvas');c.width=gap+cols*(cellW+gap);c.height=gap+rows.length*rowH;
      const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width,c.height);
      for(let r=0;r<rows.length;r++){
        const row=rows[r],images=[row.design,...row.refs];
        const py=gap+r*rowH;
        x.fillStyle='#fff';x.font=scale===1?'bold 8px sans-serif':'bold 12px sans-serif';
        x.fillText(row.key.split('-')[0].toUpperCase()+' / '+row.direction.toUpperCase(),gap,py+9*scale);
        for(let col=0;col<3;col++){
          const px=gap+col*(cellW+gap),labelY=py+headH;
          const im=new Image();im.src=images[col];await im.decode();
          x.fillStyle='#fff';x.font=scale===1?'bold 6px sans-serif':'bold 10px sans-serif';
          const label=col===0?'NEW':row.candidates[col-1].toUpperCase();
          x.fillText(label,px,labelY+8*scale);
          x.drawImage(im,px,labelY+labelH,cellW,cellH);
        }
      }
      return c.toDataURL('image/png');
    };
    return {native:await draw(1),enlarged3x:await draw(3)};
  },faceComparisons);
  writeData(path.join(out,'matched-face-comparisons-native-40x38.png'),faceComparisonData.native);
  writeData(path.join(out,'matched-face-comparisons-3x.png'),faceComparisonData.enlarged3x);

  const faceSheet=await page.evaluate(async items=>{
    const gap=12,cellW=160,cellH=170,cols=8,rows=Math.ceil(items.length/cols);
    const c=document.createElement('canvas');c.width=gap+cols*(cellW+gap);c.height=gap+rows*(cellH+gap);
    const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width,c.height);
    for(let i=0;i<items.length;i++){
      const it=items[i],im=new Image();im.src=it.dataUrl;await im.decode();
      const px=gap+(i%cols)*(cellW+gap),py=gap+Math.floor(i/cols)*(cellH+gap);
      x.fillStyle='#fff';x.font='bold 12px sans-serif';x.fillText(String(it.civ).toUpperCase()+' / '+String(it.direction).toUpperCase(),px,py+12);
      x.drawImage(im,px,py+18,cellW,152);
    }
    return c.toDataURL('image/png');
  },rosterFaces);
  writeData(path.join(out,'roster-face-crops-contact-sheet.png'),faceSheet);

  // Matched-scale rear silhouette comparison: the proposed Sailor body-only
  // rear view against the live roster Welder rear view. This is a human
  // differentiation aid; it does not assign a family or make an approval.
  const welderBackDataUrl = await page.evaluate(() => {
    const snapshots=window.SG.npcRenderDirectionalSnapshots();
    const item=snapshots.find(x=>x.civ==='welder' && x.direction==='back');
    if(!item || !item.dataUrl) throw new Error('Welder back directional snapshot unavailable');
    return item.dataUrl;
  });
  writeData(path.join(out,'welder-back-native-64x96.png'),welderBackDataUrl);
  const sailorWelderBackSheet = await page.evaluate(async ({sailorUrl,welderUrl}) => {
    const load=async src=>{const im=new Image();im.src=src;await im.decode();return im;};
    const sailor=await load(sailorUrl),welder=await load(welderUrl);
    const c=document.createElement('canvas');c.width=320;c.height=228;
    const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width,c.height);
    x.fillStyle='#fff';x.font='bold 11px sans-serif';x.fillText('PROPOSED SAILOR / BACK',12,14);x.fillText('LIVE WELDER / BACK',172,14);
    x.drawImage(sailor,12,24,128,192);
    const mask=document.createElement('canvas');mask.width=welder.naturalWidth;mask.height=welder.naturalHeight;
    const m=mask.getContext('2d',{willReadFrequently:true});m.drawImage(welder,0,0);
    const pixels=m.getImageData(0,0,mask.width,mask.height);
    for(let i=0;i<pixels.data.length;i+=4){
      if(pixels.data[i+3]>0){pixels.data[i]=8;pixels.data[i+1]=10;pixels.data[i+2]=14;}
    }
    m.putImageData(pixels,0,0);x.drawImage(mask,172,24,128,192);
    return c.toDataURL('image/png');
  },{sailorUrl:svgData.data['sailor-body-back'].native,welderUrl:welderBackDataUrl});
  writeData(path.join(out,'sailor-welder-back-silhouette-comparison.png'),sailorWelderBackSheet);

  const report={
    status:'design_source_projection_only',
    revision:19,
    bodyPreservationAudit:svgData.bodyPreservationAudit,
    anatomyConnectivityAudit:svgData.anatomyConnectivityAudit,
    integratedWeatherDetail:'Slicker revision-18 rainwear construction preserved unchanged; Painter revision-19 flat wedge brush head and curved tunic hem; Sailor integrated rope-tail detail; Painter front grip body-mask correction; Sailor detached tail removed; no separate umbrella',
    source:'project-background/qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-19.svg',
    figureFields:24,
    nativeCaptures:Object.keys(svgData.data).length,
    direct28x42Captures:Object.values(svgData.data).filter(x=>x.direct).length,
    enlargedNearestNeighbourCaptures:Object.values(svgData.data).filter(x=>x.enlarged4x).length,
    rasterization:'SVG viewport reset to each 64x96 figure field, then independently rasterized at exact 64x96 and exact 28x42 output dimensions; direct 28x42 is a separate vector rasterization',
    rosterFaceCrops:rosterFaces.length,
    newFaceDesignCrops:faceDesigns.length,
    matchedFaceComparisonRows:faceComparisons.length,
    rosterFaceDirections:[...new Set(rosterFaces.map(x=>x.direction))],
    faceCropDimensions:{width:40,height:38,source:'current game directional snapshot hook, native 64x96'},
    note:"The roster face sheet and six matched 40x38 comparison rows are human geometric evidence. Comparator pairs: Sailor Clinic/Guard, Slicker Hacker/Courier, Painter Cook/Busker. Slicker’s umbrella was removed after it failed the direct 28x42 readability check; the design now uses a face-open face-side-open hood opening, rear rainwear seams, shortened chest closure and a stronger character-left storm flap. Profile prop-region counts are descriptive only; no arbitrary minimum threshold is applied. Automated prop audit asserts that prop-on preserves all body-only pixels. Final face geometry remains subject to owner review."
  };
  fs.writeFileSync(path.join(out,'fourth-batch-design-evidence-report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report));
} finally {
  await browser.close();
  server.close();
}
