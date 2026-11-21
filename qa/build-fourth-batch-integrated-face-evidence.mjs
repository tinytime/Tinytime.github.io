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
 const result=await page.evaluate(async({source,people,directions,xByDirection})=>{
  const render=async(x,y,w,h)=>{
   const svg=source.replace('width="1800" height="1330" viewBox="0 0 1800 1330"',`width="${w}" height="${h}" viewBox="${x} ${y} 64 96"`);
   const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);await img.decode();
   const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.drawImage(img,0,0,w,h);return c.toDataURL('image/png');
  };
  const data=[];
  for(const p of people)for(const d of directions)data.push({key:p.id+'-'+d,label:p.label+' / '+d.toUpperCase(),native:await render(xByDirection[d],p.y,64,96),direct:await render(xByDirection[d],p.y,28,42)});
  const sheet=async(scale)=>{
   const w=scale==='native'?64:28,h=scale==='native'?96:42,g=12,lh=18,cols=3,c=document.createElement('canvas');
   c.width=g+cols*(w+g);c.height=g+3*(h+lh+g);const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#777982';x.fillRect(0,0,c.width,c.height);
   for(let i=0;i<data.length;i++){const p=data[i],im=new Image();im.src=p[scale];await im.decode();const px=g+(i%3)*(w+g),py=g+Math.floor(i/3)*(h+lh+g);x.fillStyle='#fff';x.font='bold 9px sans-serif';x.fillText(p.label,px,py+11);x.drawImage(im,px,py+lh,w,h);}
   return c.toDataURL('image/png');
  };
  return {data,nativeSheet:await sheet('native'),directSheet:await sheet('direct')};
 },{source:composite,people,directions,xByDirection});
 const write=(p,url)=>fs.writeFileSync(p,Buffer.from(url.split(',')[1],'base64'));
 for(const item of result.data){
  write(path.join(out,item.key+'-64x96.png'),item.native);
  write(path.join(out,item.key+'-direct-28x42.png'),item.direct);
  const enlarged=await page.evaluate(async url=>{const im=new Image();im.src=url;await im.decode();const c=document.createElement('canvas');c.width=256;c.height=384;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(im,0,0,256,384);return c.toDataURL('image/png');},item.native);
  write(path.join(out,item.key+'-enlarged-4x.png'),enlarged);
 }
 write(path.join(out,'integrated-faces-native-64x96.png'),result.nativeSheet);
 write(path.join(out,'integrated-faces-direct-28x42.png'),result.directSheet);
 const manifest={stage:'non-production integrated grayscale face study',revision21_blob:blob,overlay:'SAILOR-SLICKER-PAINTER-INTEGRATED-FACE-OVERLAYS-01.svg',characters:people.map(x=>x.id),directions,counts:{native64x96:9,direct28x42:9,enlarged4x:9},protected:{revision21_source_modified:false,construction_source_modified:false,production_renderer_modified:false,golden_snapshots_modified:false}};
 fs.writeFileSync(path.join(out,'integrated-face-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log(JSON.stringify({manifest}));
}finally{await browser.close();}
