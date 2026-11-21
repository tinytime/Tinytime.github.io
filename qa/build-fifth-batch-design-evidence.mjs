// Isolated Batch 5 design evidence: vector projections and matched current-roster comparisons only.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'project-background/qa-artifacts/fifth-civilian-batch');
const silhouettePath=path.join(dir,'WELDER-KID-KID2-SILHOUETTE-EXPLORATION-01.svg');
const facePath=path.join(dir,'WELDER-KID-KID2-FACE-HEAD-EXPLORATION-01.svg');
const out=path.join(root,'qa-output/fifth-batch-design');
fs.mkdirSync(out,{recursive:true});
const silhouette=fs.readFileSync(silhouettePath,'utf8');
const face=fs.readFileSync(facePath,'utf8');
const blobHash=text=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+Buffer.byteLength(text)+'\0'),Buffer.from(text)])).digest('hex');
const sourceBlobs={silhouette:blobHash(silhouette),faceHead:blobHash(face)};
const expected={silhouette:'5892e66018fed61ceb02c3b222738d14870ce524',faceHead:'bbed7692680234c30591ea3a03d170c22d87a12f'};
for(const key of Object.keys(expected))if(sourceBlobs[key]!==expected[key])throw new Error(key+' source blob mismatch: '+sourceBlobs[key]);
if(!silhouette.includes('Twelve original solid-black civilian silhouettes'))throw new Error('Silhouette sheet description mismatch');
if((silhouette.match(/<g class="sil">/g)||[]).length!==12)throw new Error('Expected twelve silhouette direction groups');
if(!face.includes('#15 WELDER')||!face.includes('#16 KID')||!face.includes('#17 KID 2'))throw new Error('Face/head sheet missing a character');
const people=[{id:'welder',rowY:156},{id:'kid',rowY:384},{id:'kid2',rowY:614}];
const directions=[{id:'front',x:420},{id:'back',x:600},{id:'left',x:780},{id:'right',x:960}];
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1200,height:1000},deviceScaleFactor:1});
 const rendered=await page.evaluate(async({silhouette,face,people,directions})=>{
  const renderSvg=async(source,viewBox,width,height)=>{
   const svg=source.replace(/width="[^"]+" height="[^"]+" viewBox="[^"]+"/,'width="'+width+'" height="'+height+'" viewBox="'+viewBox+'"');
   const parsed=new DOMParser().parseFromString(svg,'image/svg+xml');
   const parseError=parsed.getElementsByTagName('parsererror')[0];
   if(parseError)throw new Error('Malformed SVG source: '+parseError.textContent.slice(0,500));
   const img=new Image(),blobUrl=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
   try{img.src=blobUrl;await img.decode();}catch(error){throw new Error('SVG image decode failed for viewBox '+viewBox+': '+error.message);}finally{URL.revokeObjectURL(blobUrl);}
   const c=document.createElement('canvas');c.width=width;c.height=height;
   const ctx=c.getContext('2d');ctx.clearRect(0,0,width,height);ctx.drawImage(img,0,0,width,height);
   return c.toDataURL('image/png');
  };
  const items=[];
  for(const person of people)for(const direction of directions){
   const x=direction.x,y=person.rowY;
   items.push({key:person.id+'-'+direction.id,
    native:await renderSvg(silhouette,x+' '+y+' 121.6 182.4',64,96),
    direct:await renderSvg(silhouette,x+' '+y+' 121.6 182.4',28,42)});
  }
  const fullSilhouette=await renderSvg(silhouette,'0 0 1120 900',1120,900);
  const faceNative=await renderSvg(face,'0 0 1000 560',1000,560);
  const faceEnlarged=await renderSvg(face,'0 0 1000 560',2000,1120);
  const sheet=async(scale)=>{
   const isNative=scale==='native',w=isNative?64:28,h=isNative?96:42,g=14,label=16,cols=4;
   const c=document.createElement('canvas');c.width=g+cols*(w+g);c.height=g+3*(h+label+g);
   const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.fillStyle='#777982';ctx.fillRect(0,0,c.width,c.height);
   for(let i=0;i<items.length;i++){
    const item=items[i],url=isNative?item.native:item.direct,im=new Image();im.src=url;await im.decode();
    const x=g+(i%cols)*(w+g),y=g+Math.floor(i/cols)*(h+label+g);
    const shortLabel={welder:'W',kid:'K',kid2:'K2'}[item.key.split('-')[0]]+'-'+({front:'F',back:'B',left:'L',right:'R'}[item.key.split('-')[1]]);
    ctx.fillStyle='#fff';ctx.font='bold 7px sans-serif';ctx.fillText(shortLabel,x,y+10);
    ctx.drawImage(im,x,y+label,w,h);
   }
   return c.toDataURL('image/png');
  };
  return {items,fullSilhouette,faceNative,faceEnlarged,nativeSheet:await sheet('native'),directSheet:await sheet('direct')};
 },{silhouette,face,people,directions});
 const write=(name,data)=>fs.writeFileSync(path.join(out,name),Buffer.from(data.split(',')[1],'base64'));
 for(const item of rendered.items){
  write(item.key+'-native-64x96.png',item.native);
  write(item.key+'-direct-28x42.png',item.direct);
  const enlarged=await page.evaluate(async url=>{
   const img=new Image();img.src=url;await img.decode();
   const c=document.createElement('canvas');c.width=256;c.height=384;
   const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.drawImage(img,0,0,256,384);
   return c.toDataURL('image/png');
  },item.native);
  write(item.key+'-enlarged-4x.png',enlarged);
 }
 write('silhouette-sheet-full-1120x900.png',rendered.fullSilhouette);
 write('silhouette-contact-native-64x96.png',rendered.nativeSheet);
 write('silhouette-contact-direct-28x42.png',rendered.directSheet);
 write('face-head-sheet-1000x560.png',rendered.faceNative);
 write('face-head-sheet-enlarged-2x.png',rendered.faceEnlarged);
 const connectivityDiagnostics=await page.evaluate(async items=>{
  const out=[];
  for(const item of items)for(const scale of ['native','direct']){
   const im=new Image();im.src=item[scale];await im.decode();
   const c=document.createElement('canvas');c.width=im.width;c.height=im.height;
   const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(im,0,0);
   const data=ctx.getImageData(0,0,c.width,c.height).data,w=c.width,h=c.height,mask=new Uint8Array(w*h);
   let pixels=0,minX=w,minY=h,maxX=-1,maxY=-1;
   for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4;if(data[i]<100&&data[i+1]<100&&data[i+2]<100){mask[y*w+x]=1;pixels++;minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}}
   const seen=new Uint8Array(w*h),queue=new Int32Array(w*h),sizes=[];
   for(let i=0;i<mask.length;i++){if(!mask[i]||seen[i])continue;let a=0,b=0,size=0;queue[b++]=i;seen[i]=1;while(a<b){const n=queue[a++],x=n%w,y=Math.floor(n/w);size++;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;const k=yy*w+xx;if(mask[k]&&!seen[k]){seen[k]=1;queue[b++]=k;}}}sizes.push(size);}
   out.push({key:item.key,scale,width:w,height:h,opaquePixels:pixels,components:sizes.length,componentSizes:sizes.sort((a,b)=>b-a),bounds:pixels?{minX,minY,maxX,maxY}:null,edgeContacts:{left:Array.from({length:h},(_,y)=>mask[y*w]).some(Boolean),right:Array.from({length:h},(_,y)=>mask[y*w+w-1]).some(Boolean),top:Array.from(mask.slice(0,w)).some(Boolean),bottom:Array.from(mask.slice((h-1)*w)).some(Boolean)}});
  }
  return out;
 },rendered.items);
 fs.writeFileSync(path.join(out,'connectivity-diagnostics.json'),JSON.stringify(connectivityDiagnostics,null,2)+'\n');

 // Capture the approved/active roster as black silhouettes for matched native-scale comparison.
 // These are read-only snapshots from the current game renderer; the proposed batch art stays
 // a separate vector source and is never installed into npc_sprites.js.
 const htmlPath=path.join(root,'VaporCity_HD2D_Hybrid_Test.html');
 const spritePath=path.join(root,'npc_sprites.js');
 const server=createServer((req,res)=>{
  const url=new URL(req.url,'http://127.0.0.1');
  const file=path.join(root,decodeURIComponent(url.pathname.slice(1)));
  if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);res.end('Not found');return;}
  const ext=path.extname(file),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'};
  res.writeHead(200,{'content-type':types[ext]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 try {
  await page.goto('http://127.0.0.1:'+server.address().port+'/VaporCity_HD2D_Hybrid_Test.html',{waitUntil:'load',timeout:60000});
  await page.waitForTimeout(1200);
  await page.addScriptTag({path:spritePath});
  const roster=await page.evaluate(async()=>{
   if(!window.SG||typeof window.SG.npcRenderDirectionalSnapshots!=='function')throw new Error('Existing roster directional snapshot hook unavailable');
   const ids=['runner','coach','ref','courier','guard','vendor','cook','clinic','tech','hacker','fisher','sailor','slicker','painter','usher','dancer'];
   const dirs={d:'front',u:'back',l:'left',r:'right',front:'front',back:'back',left:'left',right:'right'};
   const snapshots=window.SG.npcRenderDirectionalSnapshots(),rows=[];
   for(const civ of ids)for(const [rawDir,direction] of Object.entries(dirs)){
    const item=snapshots.find(x=>String(x.civ).toLowerCase()===civ&&String(x.direction).toLowerCase()===rawDir);
    if(!item||!item.dataUrl)continue;
    const im=new Image();im.src=item.dataUrl;await im.decode();
    const c=document.createElement('canvas');c.width=64;c.height=96;
    const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(im,0,0,64,96);
    const px=ctx.getImageData(0,0,64,96);
    for(let k=0;k<px.data.length;k+=4)if(px.data[k+3]>0){px.data[k]=0;px.data[k+1]=0;px.data[k+2]=0;}
    ctx.putImageData(px,0,0);
    rows.push({civ,direction,dataUrl:c.toDataURL('image/png'),faceDataUrl:item.dataUrl});
   }
   return rows;
  });
  const rosterIds=['runner','coach','ref','courier','guard','vendor','cook','clinic','tech','hacker','fisher','sailor','slicker','painter','usher'];
  const directions2=['front','back','left','right'];
  const rosterByKey=new Map(roster.map(x=>[x.civ+'-'+x.direction,x.dataUrl]));
  const comparisonSheets=await page.evaluate(async({roster,items,rosterIds,directions})=>{
   const rosterMap=new Map(roster.map(x=>[x.civ+'-'+x.direction,x.dataUrl]));
   const proposed=new Map();
   for(const item of items){
    const im=new Image();im.src=item.native;await im.decode();
    const cv=document.createElement('canvas');cv.width=64;cv.height=96;
    const cx=cv.getContext('2d',{willReadFrequently:true});cx.drawImage(im,0,0,64,96);
    const px=cx.getImageData(0,0,64,96);
    for(let k=0;k<px.data.length;k+=4){
     const lum=(px.data[k]+px.data[k+1]+px.data[k+2])/3;
     px.data[k]=0;px.data[k+1]=0;px.data[k+2]=0;px.data[k+3]=Math.round(255-lum);
    }
    cx.putImageData(px,0,0);proposed.set(item.key,cv.toDataURL('image/png'));
   }
   const out={};
   for(const person of ['welder','kid','kid2']){
    const gap=10,labelH=13,cellW=64,cellH=96,cols=4,rows=rosterIds.length+1;
    const c=document.createElement('canvas');c.width=gap+cols*(cellW+gap);c.height=gap+rows*(cellH+labelH+gap);
    const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width,c.height);
    const all=[{id:person,label:person.toUpperCase()+' #'+({welder:15,kid:16,kid2:17}[person]),proposed:true},...rosterIds.map(id=>({id,label:id.toUpperCase()}))];
    for(let r=0;r<all.length;r++)for(let d=0;d<directions.length;d++){
     const item=all[r],dir=directions[d],url=item.proposed?proposed.get(person+'-'+dir):rosterMap.get(item.id+'-'+dir);
     const px=gap+d*(cellW+gap),py=gap+r*(cellH+labelH+gap);
     x.fillStyle='#fff';x.font='bold 8px sans-serif';x.fillText(item.label,px,py+9);
     if(url){const im=new Image();im.src=url;await im.decode();x.drawImage(im,px,py+labelH,cellW,cellH);}
     else{x.strokeStyle='#bbb';x.strokeRect(px,py+labelH,cellW,cellH);x.fillStyle='#ddd';x.font='7px sans-serif';x.fillText('NO SNAPSHOT',px+2,py+labelH+12);}
    }
    out[person]=c.toDataURL('image/png');
   }
   return out;
  },{roster,items:rendered.items,rosterIds,directions:directions2});
  for(const [person,url] of Object.entries(comparisonSheets))write('roster-silhouette-comparison-'+person+'-native-64x96.png',url);

  // Matched face geometry comparisons: two closest roster candidates for each
  // proposed face, front and profile, at a shared 40x38 crop size.
  const faceRows=[
   {key:'welder-front',person:'welder',direction:'front',box:[464,136,62,64],candidates:['guard','fisher']},
   {key:'welder-profile',person:'welder',direction:'left',box:[684,134,66,68],candidates:['guard','fisher']},
   {key:'kid-front',person:'kid',direction:'front',box:[458,267,74,74],candidates:['dancer','vendor']},
   {key:'kid-profile',person:'kid',direction:'left',box:[686,265,72,72],candidates:['dancer','vendor']},
   {key:'kid2-front',person:'kid2',direction:'front',box:[456,396,72,72],candidates:['clinic','ref']},
   {key:'kid2-profile',person:'kid2',direction:'left',box:[684,395,70,72],candidates:['clinic','ref']}
  ];
  const faceComparisons=await page.evaluate(async({face,rows,roster})=>{
   const rosterMap=new Map(roster.map(x=>[x.civ+'-'+x.direction,x.faceDataUrl]));
   const cropSvg=async(box)=>{
    const [x,y,w,h]=box;
    const svg=face.replace(/width="[^"]+" height="[^"]+" viewBox="[^"]+"/,'width="40" height="38" viewBox="'+x+' '+y+' '+w+' '+h+'"');
    const im=new Image();im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);await im.decode();
    const c=document.createElement('canvas');c.width=40;c.height=38;c.getContext('2d').drawImage(im,0,0,40,38);return c.toDataURL('image/png');
   };
   const out=[];
   for(const row of rows){
    const design=await cropSvg(row.box),refs=[];
    for(const civ of row.candidates){
     const src=rosterMap.get(civ+'-'+row.direction);
     if(!src){refs.push(null);continue;}
     const im=new Image();im.src=src;await im.decode();
     const c=document.createElement('canvas');c.width=40;c.height=38;
     const ctx=c.getContext('2d',{willReadFrequently:true});ctx.fillStyle='#fff';ctx.fillRect(0,0,40,38);ctx.imageSmoothingEnabled=false;
     const crop=row.direction==='front'?[26,12,14,7]:[20,12,24,7];
     ctx.drawImage(im,crop[0],crop[1],crop[2],crop[3],0,0,40,38);
     const px=ctx.getImageData(0,0,40,38);
     for(let k=0;k<px.data.length;k+=4){const lum=Math.round(.2126*px.data[k]+.7152*px.data[k+1]+.0722*px.data[k+2]);px.data[k]=lum;px.data[k+1]=lum;px.data[k+2]=lum;px.data[k+3]=255;}
     ctx.putImageData(px,0,0);refs.push(c.toDataURL('image/png'));
    }
    out.push({...row,design,refs});
   }
   if(out.some(row=>row.refs.some(ref=>!ref)))throw new Error('Matched face comparison candidate crop missing: '+JSON.stringify(out.filter(row=>row.refs.some(ref=>!ref)).map(row=>row.key)));
   const gap=8,gutter=64,cellW=40,cellH=38,labelH=16,rowH=cellH+labelH+gap,cols=3;
   const c=document.createElement('canvas');c.width=gutter+cols*(cellW+gap)+gap;c.height=gap+out.length*rowH;
   const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width,c.height);
   for(let r=0;r<out.length;r++){
    const row=out[r],images=[row.design,...row.refs],py=gap+r*rowH;
    const shortLabel=({welder:'WELDER',kid:'KID',kid2:'KID2'}[row.person]||row.person.toUpperCase())+' '+(row.direction==='front'?'FRONT':'PROFILE');
    x.fillStyle='#fff';x.font='bold 7px sans-serif';x.fillText(shortLabel,gap,py+10);
    for(let col=0;col<3;col++){
     const px=gutter+gap+col*(cellW+gap);
     x.fillStyle='#fff';x.font='bold 7px sans-serif';x.fillText(col===0?'NEW':row.candidates[col-1].toUpperCase(),px,py+10);
     if(images[col]){const im=new Image();im.src=images[col];await im.decode();x.drawImage(im,px,py+labelH,cellW,cellH);}
    }
   }
   const enlarged=document.createElement('canvas');enlarged.width=c.width*3;enlarged.height=c.height*3;
   const ec=enlarged.getContext('2d');ec.imageSmoothingEnabled=false;ec.drawImage(c,0,0,enlarged.width,enlarged.height);
   return {native:c.toDataURL('image/png'),enlarged3x:enlarged.toDataURL('image/png'),rows:out};
  },{face,rows:faceRows,roster});
  write('matched-face-comparisons-native-40x38.png',faceComparisons.native);
  write('matched-face-comparisons-enlarged-3x.png',faceComparisons.enlarged3x);
  const faceDir=path.join(out,'matched-face-crops');fs.mkdirSync(faceDir,{recursive:true});
  for(const row of faceComparisons.rows){
   const save=(filename,url)=>fs.writeFileSync(path.join(faceDir,filename),Buffer.from(url.split(',')[1],'base64'));
   save(row.key+'-new.png',row.design);
   row.refs.forEach((url,i)=>{if(url)save(row.key+'-'+row.candidates[i]+'.png',url);});
  }
  const rosterManifest={
   existingRosterIds:rosterIds,
   directionCount:directions2.length,
   availableRosterSnapshots:roster.length,
   matchedNativeSilhouetteSheets:Object.keys(comparisonSheets),
   matchedFaceRows:faceComparisons.rows.length,
   faceCropSize:{width:40,height:38},
   note:'The 15 existing 64x96 roster civilians are captured from current renderer snapshots and converted to black alpha silhouettes; Granny Volt is reviewed separately through her dedicated 100x140 renderer and is a craftsmanship benchmark, not a silhouette template. New batch art is rasterized from its own SVG source. These are comparative design aids, not approval evidence.'
  };
  fs.writeFileSync(path.join(out,'roster-comparison-manifest.json'),JSON.stringify(rosterManifest,null,2)+'\n');
 } finally {
  await new Promise(resolve=>server.close(resolve));
 }

 const manifest={stage:'non-production identity, silhouette, face and roster-comparison design evidence',commit:process.env.GITHUB_SHA||null,sourceBlobs,connectivityDiagnostics,counts:{characters:3,directionsPerCharacter:4,native64x96:12,direct28x42:12,enlarged4x:12,faceHeadViews:6},
  renderMethod:'Each native and direct-size image is rasterized from the source SVG vector at its target dimensions using an independent SVG viewBox render; direct 28x42 files are not resized from native captures.',
  scope:{productionRendererChanged:false,paletteApproved:false,colourRenderProposalPresentButOutOfScope:true,colourRenderCaptured:false,goldenSnapshotsChanged:false,snapshotProvenanceChanged:false}};
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log(JSON.stringify(manifest));
}finally{await browser.close();}
