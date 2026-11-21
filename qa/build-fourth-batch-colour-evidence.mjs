import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'project-background/qa-artifacts/fourth-civilian-batch');
const basePath=path.join(dir,'SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg');
const facePath=path.join(dir,'SAILOR-SLICKER-PAINTER-INTEGRATED-FACE-OVERLAYS-01.svg');
const studyPath=path.join(dir,'SAILOR-SLICKER-PAINTER-COLOUR-STUDY-02.svg');
// Design-only projection: this script never loads or edits the production renderer.
const out=path.join(root,'qa-output/fourth-batch-colour-study');
fs.mkdirSync(out,{recursive:true});
const base=fs.readFileSync(basePath,'utf8');
const face=fs.readFileSync(facePath,'utf8');
const study=fs.readFileSync(studyPath,'utf8');
const blob=s=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+Buffer.byteLength(s)+'\0'),Buffer.from(s)])).digest('hex');
const expectedBase='36f645d7de9ee5bedc79a0288c50bc8399382f4b';
const expectedFace='59c71c823c2b42cd1ea039f724fce0c05e6dcc37';
if(blob(base)!==expectedBase)throw new Error('Protected revision-21 silhouette source mismatch: '+blob(base));
if(blob(face)!==expectedFace)throw new Error('Integrated grayscale face source mismatch: '+blob(face));
const basePaths=[...base.matchAll(/<path\b[^>]*d="([^"]+)"/g)].map(m=>m[1]);
const missingPaths=basePaths.filter(d=>!study.includes('d="'+d+'"'));
if(missingPaths.length)throw new Error('Colour study altered or omitted '+missingPaths.length+' protected base path(s)');
const faceIds=['sailor-front','sailor-left','sailor-right','slicker-front','slicker-left','slicker-right','painter-front','painter-left','painter-right'];
const propFaceIds=faceIds.map(id=>id.replace(/^(sailor|slicker|painter)-/,'$1-prop-'));
for(const id of [...faceIds,...propFaceIds])if(!study.includes('id="'+id+'"'))throw new Error('Missing integrated face overlay '+id);
const propFaceSkinRules=['#sailor-prop-front>path:first-child,#sailor-prop-left>g>path:first-child,#sailor-prop-right>path:first-child{fill:#B98264;stroke:#704B3D}','#slicker-prop-front>path:first-child,#slicker-prop-left>g>path:first-child,#slicker-prop-right>path:first-child{fill:#946B56;stroke:#5F463B}','#painter-prop-front>path:first-child,#painter-prop-left>g>path:first-child,#painter-prop-right>path:first-child{fill:#D3A078;stroke:#8B634D}'];
for(const rule of propFaceSkinRules)if(!study.includes(rule))throw new Error('Missing character-specific prop-face skin rule '+rule);
const panels=[
 ['sailor','front',51,128,false],['sailor','back',161,128,false],['sailor','left',271,128,false],['sailor','right',381,128,false],
 ['slicker','front',51,458,false],['slicker','back',161,458,false],['slicker','left',271,458,false],['slicker','right',381,458,false],
 ['painter','front',53,788,false],['painter','back',161,788,false],['painter','left',271,788,false],['painter','right',378,788,false],
 ['sailor','front-prop',51,286,true],['sailor','back-prop',161,286,true],['sailor','left-prop',271,286,true],['sailor','right-prop',381,286,true],
 ['slicker','front-prop',51,616,true],['slicker','back-prop',161,616,true],['slicker','left-prop',271,616,true],['slicker','right-prop',381,616,true],
 ['painter','front-prop',53,946,true],['painter','back-prop',161,946,true],['painter','left-prop',271,946,true],['painter','right-prop',378,946,true]
];
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:900,height:700},deviceScaleFactor:1});
 const rendered=await page.evaluate(async({source,panels})=>{
  const img=new Image();const svgUrl=URL.createObjectURL(new Blob([source],{type:'image/svg+xml'}));img.src=svgUrl;try{await img.decode();}finally{URL.revokeObjectURL(svgUrl);}
  const out=[];
  for(const [character,direction,x,y,prop] of panels){
   const capture=async(w,h)=>{
    const c=document.createElement('canvas');c.width=w;c.height=h;
    const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;
    ctx.drawImage(img,x,y,64,96,0,0,w,h);
    return c.toDataURL('image/png').split(',')[1];
   };
   out.push({character,direction,prop,native:await capture(64,96),direct:await capture(28,42),enlarged:await capture(256,384)});
  }
  return out;
 },{source:study,panels});
 const save=(name,b64)=>fs.writeFileSync(path.join(out,name),Buffer.from(b64,'base64'));
 for(const p of rendered){const key=p.character+'-'+p.direction;save(key+'-64x96.png',p.native);save(key+'-28x42.png',p.direct);save(key+'-4x.png',p.enlarged);}
 const makeSheet=async(key,w,h)=>{
  const rows=6,cols=4,g=12,lh=18;
  const c=await page.evaluate(({rendered,key,w,h})=>{
   const rows=6,cols=4,g=12,lh=18,cv=document.createElement('canvas');
   cv.width=g+cols*(w+g);cv.height=g+rows*(h+lh+g);
   const ctx=cv.getContext('2d');ctx.fillStyle='#777982';ctx.fillRect(0,0,cv.width,cv.height);
   const items=rendered;
   return Promise.all(items.map(async(p,i)=>{
    const im=new Image();im.src='data:image/png;base64,'+p[key];await im.decode();
    const x=g+(i%cols)*(w+g),y=g+Math.floor(i/cols)*(h+lh+g);
    ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';ctx.fillText(p.character+' '+p.direction,x,y+10);
    ctx.drawImage(im,x,y+lh,w,h);
   })).then(()=>cv.toDataURL('image/png').split(',')[1]);
  },{rendered,key,w,h});
  save(key+'-contact-sheet.png',c);
 };
 await makeSheet('native',64,96);await makeSheet('direct',28,42);
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify({
  sourceCommit:process.env.GITHUB_SHA||null,baseBlob:blob(base),faceBlob:blob(face),
  studySha256:crypto.createHash('sha256').update(study).digest('hex'),
  captures:rendered.map(({character,direction,prop})=>({character,direction,prop,native:'64x96',direct:'28x42',enlarged:'4x'})),
  assertions:{protectedBasePaths:basePaths.length,missingBasePaths:missingPaths.length,faceOverlays:faceIds.length,propFaceOverlays:propFaceIds.length,propFaceSkinRules:propFaceSkinRules.length,captureCount:rendered.length}
 },null,2));
 console.log(JSON.stringify({pass:true,protectedBasePaths:basePaths.length,captures:rendered.length,native:rendered.length,direct:rendered.length,enlarged:rendered.length,output:out}));
}finally{await browser.close();}
