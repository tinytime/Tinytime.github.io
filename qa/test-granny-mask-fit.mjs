import assert from 'node:assert/strict';
import { compareMasks, deriveLocalBodyPolygon, deriveLocalMaskContours, maskFromRows, rasterizePolygons, traceOuterContour, traceOuterContours } from './granny-mask-fit.mjs';
const square=[{x:10,y:10},{x:13,y:10},{x:13,y:13},{x:10,y:13}];
const candidate=rasterizePolygons([square],'front'),exact=new Uint8Array(14000);
for(let y=10;y<13;y++)for(let x=10;x<13;x++)exact[y*100+x]=1;
const perfect=compareMasks(candidate,exact);assert.equal(perfect.iou,1);assert.equal(perfect.precision,1);assert.equal(perfect.recall,1);
const partial=new Uint8Array(exact);partial[12*100+12]=0;const partialFit=compareMasks(candidate,partial);assert.ok(partialFit.iou<1&&partialFit.iou>0);assert.equal(partialFit.referenceOnlyPixels,0);assert.equal(partialFit.candidateOnlyPixels,1);
const rows=Array.from({length:140},()=>[]);for(let y=10;y<13;y++)rows[y]=[[10,12]];
const rowMask=maskFromRows(rows);assert.equal(rowMask[10*100+10],1);assert.equal(rowMask[10*100+9],0);assert.equal(rowMask.reduce((a,b)=>a+b,0),9);
const contour=traceOuterContour(rows);assert.equal(contour.length,4);assert.equal(compareMasks(rasterizePolygons([contour],'front'),rowMask).iou,1);
const localLeft=deriveLocalBodyPolygon(rows,'left');assert.equal(compareMasks(rasterizePolygons([localLeft],'left'),rowMask).iou,1);
const split=Array.from({length:140},()=>[]);for(let y=20;y<23;y++)split[y]=[[10,12],[30,32]];
const loops=traceOuterContours(split);assert.equal(loops.length,2);
const splitPolygons=deriveLocalMaskContours(split,'front');assert.equal(splitPolygons.length,2);
assert.equal(compareMasks(rasterizePolygons(splitPolygons,'front'),maskFromRows(split)).iou,1);

const withHole=Array.from({length:140},()=>[]);
for(let y=40;y<45;y++)withHole[y]=[[40,44]];
withHole[42]=[[40,41],[43,44]];
assert.equal(traceOuterContours(withHole).length,1);
const holeMask=maskFromRows(withHole);
const holeContour=rasterizePolygons(traceOuterContours(withHole),'front');
assert.equal(holeContour.reduce((a,b)=>a+b,0),25);
assert.equal(holeMask.reduce((a,b)=>a+b,0),24);

console.log('Granny mask-fit helper tests passed (9 fixtures).');
