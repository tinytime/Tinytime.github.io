import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const svgPath=path.join(root,'project-background/qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CONSTRUCTION-DETAIL-STUDY-01.svg');
const svg=fs.readFileSync(svgPath,'utf8');
const out=path.join(root,'qa-output/fourth-batch-construction-study');
fs.mkdirSync(out,{recursive:true});
const expected=['SAILOR #12','SLICKER #13','PAINTER #14'];
const dirs=['FRONT','BACK','LEFT PROFILE','RIGHT PROFILE'];
for(const n of expected) if(!svg.includes(n)) throw new Error('Missing character label '+n);
for(const d of dirs) if(!svg.includes('· '+d)) throw new Error('Missing direction '+d);
const panelCount=(svg.match(/<rect width="270" height="210"/g)||[]).length;
const detailCount=(svg.match(/class="detail"/g)||[]).length;
if(panelCount!==12 || detailCount!==12) throw new Error('Expected 12 panels and 12 detail overlays; got '+panelCount+'/'+detailCount);
if(!svg.includes('owner-approved revision 21') && !svg.includes('revision 21')) throw new Error('Approved revision-21 baseline not identified');
const usedColours=[...new Set(svg.match(/#[0-9a-fA-F]{6}/g)||[])];\nconst allowedColours=new Set(['#f3f1eb','#202124','#555555','#555','#222222','#222','#e7e4dc','#c9c5bb','#333333','#333','#080a0e']);\nif(usedColours.some(colour=>!allowedColours.has(colour.toLowerCase()))) throw new Error('Unexpected colour swatch/palette content: '+usedColours.join(','));

const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({viewport:{width:1200,height:1180},deviceScaleFactor:1});
 await page.setContent('<html><body style="margin:0;background:#777982"><img id="study" style="display:block;width:1200px;height:1180px" /></body></html>');
 await page.locator('#study').evaluate((el,src)=>{el.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(src)},svg);
 await page.locator('#study').evaluate(el=>el.decode());
 await page.screenshot({path:path.join(out,'construction-detail-study-01-full.png'),fullPage:true});
 const captures=await page.evaluate(async()=>{
  const source=document.querySelector('#study');
  const chars=['sailor','slicker','painter'], names=['SAILOR #12','SLICKER #13','PAINTER #14'];
  const dirs=['front','back','left','right'];
  const items=[];
  for(let r=0;r<3;r++) for(let d=0;d<4;d++){
   const x=20+d*290+70, y=130+r*230+28, w=64*1.45, h=96*1.45;
   const render=async(width,height)=>{
    const c=document.createElement('canvas');c.width=width;c.height=height;
    const ctx=c.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=true;
    ctx.drawImage(source,x,y,w,h,0,0,width,height);
    return c.toDataURL('image/png');
   };
   items.push({key:chars[r]+'-'+dirs[d],native:await render(64,96),direct:await render(28,42),enlarged:await render(256,384)});
  }
  return items;
 });
 const write=(file,url)=>fs.writeFileSync(file,Buffer.from(url.split(',')[1],'base64'));
 for(const item of captures){
  write(path.join(out,item.key+'-64x96.png'),item.native);
  write(path.join(out,item.key+'-28x42.png'),item.direct);
  write(path.join(out,item.key+'-4x.png'),item.enlarged);
 }
 fs.writeFileSync(path.join(out,'capture-manifest.json'),JSON.stringify({
  source:'SAILOR-SLICKER-PAINTER-CONSTRUCTION-DETAIL-STUDY-01.svg',
  baseline:'SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg',
  panels:panelCount,detailOverlays:detailCount,
  captures:captures.map(x=>x.key),
  note:'Independent vector renders at 64x96 and 28x42; 4x crops are diagnostic only.'
 },null,2)+'\\n');
 console.log(JSON.stringify({panels:panelCount,detailOverlays:detailCount,captures:captures.length,output:out}));
} finally { await browser.close(); }
