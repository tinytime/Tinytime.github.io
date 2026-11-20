import { chromium } from 'playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const sourcePath = resolve(root, 'project-background/qa-artifacts/third-civilian-batch/HACKER-FISHER-FINISHED-DESIGN-STUDY.svg');
const outDir = resolve(root, 'project-background/qa-artifacts/third-civilian-batch');
const svg = await readFile(sourcePath, 'utf8');
const svgTag = svg.slice(svg.indexOf('<svg'), svg.indexOf('>', svg.indexOf('<svg')) + 1);
const width = Number(svgTag.match(/\bwidth=["'](\d+)["']/)?.[1]);
const height = Number(svgTag.match(/\bheight=["'](\d+)["']/)?.[1]);
const viewBox = svgTag.match(/\bviewBox=["']([^"']+)["']/)?.[1];
if (width !== 1680 || height !== 1720 || viewBox?.trim() !== '0 0 1680 1720') {
  throw new Error(`Unexpected design sheet geometry: ${width}x${height}; viewBox=${viewBox}`);
}
const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate SVG IDs detected.');
const hrefs = [...svg.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
const unresolved = hrefs.filter(h => !ids.includes(h));
if (unresolved.length) throw new Error(`Unresolved SVG references: ${unresolved.join(', ')}`);
for (const id of ['hacker-front-art','hacker-back-art','hacker-left-art','hacker-right-art','fisher-front-art','fisher-back-art','fisher-left-art','fisher-right-art']) {
  if (!ids.includes(id)) throw new Error(`Missing scale capture target: ${id}`);
}
const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><style>html,body{margin:0;padding:0;width:${width}px;height:${height}px;overflow:hidden;background:#171b22}img{display:block;width:${width}px;height:${height}px}</style></head><body><img id="sheet" src="${dataUri}" width="${width}" height="${height}"></body></html>`, { waitUntil: 'load' });
  const info = await page.locator('#sheet').evaluate(async img => { await img.decode(); return {complete:img.complete,width:img.naturalWidth,height:img.naturalHeight}; });
  if (!info.complete || info.width !== width || info.height !== height) throw new Error(`SVG failed to render: ${JSON.stringify(info)}`);
  await mkdir(outDir, { recursive: true });
  const full = await page.screenshot({ type: 'png' });
  await writeFile(resolve(outDir, 'HACKER-FISHER-FINISHED-DESIGN-STUDY-1X.png'), full);
  const page3x = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 3 });
  await page3x.setContent(`<!doctype html><html><head><style>html,body{margin:0;padding:0;width:${width}px;height:${height}px;overflow:hidden;background:#171b22}img{display:block;width:${width}px;height:${height}px}</style></head><body><img id="sheet" src="${dataUri}" width="${width}" height="${height}"></body></html>`, { waitUntil: 'load' });
  await page3x.locator('#sheet').evaluate(img => img.decode());
  const full3x = await page3x.screenshot({ type: 'png' });
  await writeFile(resolve(outDir, 'HACKER-FISHER-FINISHED-DESIGN-STUDY-3X.png'), full3x);

  const captures = [];
  for (const [character, rowY, prefix] of [['Hacker',1150,'hacker'],['Fisher',1430,'fisher']]) {
    for (let i=0;i<4;i++) {
      const panelX = 54 + i*394;
      const directions = ['front','back','left-profile','right-profile'];
      captures.push({
        character, direction: directions[i],
        native: { x: panelX+12, y: rowY+54, width:64, height:96 },
        direct: { x: panelX+98, y: rowY+80, width:28, height:42 }
      });
    }
  }
  const nativeClips = [], directClips = [];
  for (const item of captures) {
    const n = await page.screenshot({ type:'png', clip:item.native });
    const d = await page.screenshot({ type:'png', clip:item.direct });
    nativeClips.push({ ...item, png:n.toString('base64') });
    directClips.push({ ...item, png:d.toString('base64') });
  }
  const montages = await page.evaluate(async ({ nativeClips, directClips }) => {
    const decode = async b64 => { const img = new Image(); img.src = 'data:image/png;base64,'+b64; await img.decode(); return img; };
    const nativeCanvas = document.createElement('canvas'); nativeCanvas.width=4*104; nativeCanvas.height=2*132;
    const nc=nativeCanvas.getContext('2d'); nc.fillStyle='#222832'; nc.fillRect(0,0,nativeCanvas.width,nativeCanvas.height);
    for(let i=0;i<nativeClips.length;i++){const item=nativeClips[i],img=await decode(item.png);const x=(i%4)*104,y=Math.floor(i/4)*132;nc.fillStyle='#f1f0eb';nc.font='bold 10px sans-serif';nc.fillText(item.character+' '+item.direction,x+4,y+13);nc.drawImage(img,x+20,y+24,64,96);}
    const directCanvas = document.createElement('canvas'); directCanvas.width=4*76; directCanvas.height=2*78;
    const dc=directCanvas.getContext('2d');dc.fillStyle='#222832';dc.fillRect(0,0,directCanvas.width,directCanvas.height);
    const nnCanvas = document.createElement('canvas'); nnCanvas.width=4*140; nnCanvas.height=2*200;
    const qc=nnCanvas.getContext('2d');qc.fillStyle='#222832';qc.fillRect(0,0,nnCanvas.width,nnCanvas.height);
    for(let i=0;i<directClips.length;i++){const item=directClips[i],img=await decode(item.png);const x=(i%4)*76,y=Math.floor(i/4)*78;dc.fillStyle='#f1f0eb';dc.font='bold 9px sans-serif';dc.fillText(item.character+' '+item.direction,x+2,y+11);dc.drawImage(img,x+24,y+18,28,42);
      const qx=(i%4)*140,qy=Math.floor(i/4)*200;qc.fillStyle='#f1f0eb';qc.font='bold 10px sans-serif';qc.fillText(item.character+' '+item.direction,qx+4,qy+14);qc.imageSmoothingEnabled=false;qc.drawImage(img,qx+14,qy+24,112,168);}
    return { native:nativeCanvas.toDataURL('image/png').split(',')[1], direct:directCanvas.toDataURL('image/png').split(',')[1], nearest:nnCanvas.toDataURL('image/png').split(',')[1] };
  }, {nativeClips,directClips});
  const outputs = [
    ['HACKER-FISHER-NATIVE-64X96-DESIGN-CAPTURES.png',montages.native],
    ['HACKER-FISHER-DIRECT-28X42-DESIGN-CAPTURES.png',montages.direct],
    ['HACKER-FISHER-NEAREST-NEIGHBOUR-4X-DESIGN-CAPTURES.png',montages.nearest]
  ];
  for (const [name,b64] of outputs) await writeFile(resolve(outDir,name),Buffer.from(b64,'base64'));
  const report = {
    source: 'HACKER-FISHER-FINISHED-DESIGN-STUDY.svg',
    sourceSha256: createHash('sha256').update(svg).digest('hex'),
    sourceDimensions: {width,height,viewBox},
    sourceType: 'design-stage vector; not game-renderer output',
    rendered: info,
    directionalCaptures: captures.map(({character,direction})=>({character,direction,native:'64x96',direct:'28x42'})),
    outputs: ['HACKER-FISHER-FINISHED-DESIGN-STUDY-1X.png','HACKER-FISHER-FINISHED-DESIGN-STUDY-3X.png',...outputs.map(x=>x[0])],
    nearestNeighbour: 'Direct 28x42 crops upscaled 4x with canvas imageSmoothingEnabled=false',
    browser: 'Playwright Chromium'
  };
  await writeFile(resolve(outDir,'HACKER-FISHER-DESIGN-RENDER-REPORT.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({ ...report, bytes:{full:full.length,full3x:full3x.length} },null,2));
} finally { await browser.close(); }
