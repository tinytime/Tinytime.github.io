import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
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
const expected={silhouette:'c5af2903fb5b9e93d59a81409929e0fc88ecf285',faceHead:'147bb88a01b878f89a1eb41d7b65e8c0adf62f34'};
for(const key of Object.keys(expected))if(sourceBlobs[key]!==expected[key])throw new Error(key+' source blob mismatch: '+sourceBlobs[key]);
if(!silhouette.includes('12 original solid-black civilian silhouettes'))throw new Error('Silhouette sheet description mismatch');
if((silhouette.match(/<g class="sil">/g)||[]).length!==12)throw new Error('Expected twelve silhouette direction groups');
if(!face.includes('#15 WELDER')||!face.includes('#16 KID')||!face.includes('#17 KID 2'))throw new Error('Face/head sheet missing a character');
const people=[{id:'welder',rowY:156},{id:'kid',rowY:384},{id:'kid2',rowY:614}];
const directions=[{id:'front',x:176},{id:'back',x:426},{id:'left',x:676},{id:'right',x:926}];
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1200,height:1000},deviceScaleFactor:1});
 const rendered=await page.evaluate(async({silhouette,face,people,directions})=>{
  const renderSvg=async(source,viewBox,width,height)=>{
   const svg=source.replace(/width="[^"]+" height="[^"]+" viewBox="[^"]+"/,'width="'+width+'" height="'+height+'" viewBox="'+viewBox+'"');
   const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);await img.decode();
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
    ctx.fillStyle='#fff';ctx.font='bold 8px sans-serif';ctx.fillText(item.key.toUpperCase(),x,y+10);
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
 const manifest={stage:'non-production identity/silhouette design projections',commit:process.env.GITHUB_SHA||null,sourceBlobs,
  counts:{characters:3,directionsPerCharacter:4,native64x96:12,direct28x42:12,enlarged4x:12,faceHeadViews:6},
  renderMethod:'Each native and direct-size image is rasterized from the source SVG vector at its target dimensions using an independent SVG viewBox render; direct 28x42 files are not resized from native captures.',
  scope:{productionRendererChanged:false,paletteArtworkChanged:false,goldenSnapshotsChanged:false,snapshotProvenanceChanged:false}};
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log(JSON.stringify(manifest));
}finally{await browser.close();}
