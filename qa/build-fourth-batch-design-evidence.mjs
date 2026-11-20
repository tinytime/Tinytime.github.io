// Fourth-batch design-source evidence. This is a QA projection utility only:
// it rasterizes approved-stage SVG hypotheses and captures existing roster faces.
// It does not load or alter any production renderer for Sailor/Slicker/Painter.
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'project-background/qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-05.svg');
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
    return {data,sheets:sheetsOut};
  },svg);
  const writeData=(file,dataUrl)=>fs.writeFileSync(file,Buffer.from(dataUrl.split(',')[1],'base64'));
  for(const [key,item] of Object.entries(svgData.data)){
    writeData(path.join(out,key+'.png'),item.native);
    writeData(path.join(out,key+'-direct-28x42.png'),item.direct);
    writeData(path.join(out,key+'-enlarged-4x.png'),item.enlarged4x);
  }
  for(const [key,url] of Object.entries(svgData.sheets))writeData(path.join(out,key+'-comparison.png'),url);

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

  const report={
    status:'design_source_projection_only',
    source:'project-background/qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-05.svg',
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
    note:'The roster face sheet and six matched 40x38 comparison rows are human geometric evidence. Comparator pairs: Sailor Clinic/Guard, Slicker Hacker/Courier, Painter Cook/Busker. Final face geometry remains subject to owner review.'
  };
  fs.writeFileSync(path.join(out,'fourth-batch-design-evidence-report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report));
} finally {
  await browser.close();
  server.close();
}
