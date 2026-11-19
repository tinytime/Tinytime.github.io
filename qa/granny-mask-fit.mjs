// Non-gating comparison of source-space candidate polygons against exact renderer alpha row masks.
const WIDTH=100, HEIGHT=140;
const CODE_TO_VIEW={d:'front',u:'back',l:'left',r:'right'};
function pointInPolygon(x,y,p){
 let inside=false;
 for(let i=0,j=p.length-1;i<p.length;j=i++){
  const a=p[i],b=p[j];
  if((a.y>y)!==(b.y>y)&&x<((b.x-a.x)*(y-a.y))/(b.y-a.y)+a.x)inside=!inside;
 }
 return inside;
}
function transformPolygon(polygon,direction){
 return polygon.map(({x,y})=>{
  let tx=x;
  if(direction==='left'||direction==='right')tx=50+(tx-50)*0.72;
  if(direction==='left')tx=100-tx;
  return {x:tx,y};
 });
}
export function maskFromRows(rows){
 if(!Array.isArray(rows)||rows.length!==HEIGHT)throw new Error('Expected 140 alpha rows');
 const mask=new Uint8Array(WIDTH*HEIGHT);
 for(let y=0;y<HEIGHT;y++)for(const span of rows[y]){
  if(!Array.isArray(span)||span.length!==2)throw new Error('Invalid alpha span');
  const [x0,x1]=span;
  if(!Number.isInteger(x0)||!Number.isInteger(x1)||x0<0||x1>=WIDTH||x0>x1)throw new Error('Out-of-bounds alpha span');
  for(let x=x0;x<=x1;x++)mask[y*WIDTH+x]=1;
 }
 return mask;
}
export function rasterizePolygons(polygons,direction){
 const mask=new Uint8Array(WIDTH*HEIGHT),transformed=polygons.map(p=>transformPolygon(p,direction));
 for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++){
  if(transformed.some(p=>pointInPolygon(x+.5,y+.5,p)))mask[y*WIDTH+x]=1;
 }
 return mask;
}
export function compareMasks(candidate,reference){
 if(!(candidate instanceof Uint8Array)||!(reference instanceof Uint8Array)||candidate.length!==WIDTH*HEIGHT||reference.length!==WIDTH*HEIGHT)throw new Error('Masks must be 100x140 Uint8Array values');
 let cp=0,rp=0,inter=0,union=0;
 for(let i=0;i<candidate.length;i++){
  const a=!!candidate[i],b=!!reference[i];cp+=a?1:0;rp+=b?1:0;inter+=a&&b?1:0;union+=a||b?1:0;
 }
 return {candidatePixels:cp,referencePixels:rp,intersectionPixels:inter,unionPixels:union,iou:union?inter/union:1,precision:cp?inter/cp:(rp?0:1),recall:rp?inter/rp:(cp?0:1),candidateOnlyPixels:cp-inter,referenceOnlyPixels:rp-inter};
}
export function measureGrannyMaskFit(annotation,pixelMasks){
 return pixelMasks.map(entry=>{
  const view=CODE_TO_VIEW[entry.direction],semantic=annotation.directions[view];
  if(!semantic)throw new Error('Missing Granny semantic direction: '+view);
  const exactBody=maskFromRows(entry.bodyAlpha.rows),exactUmbrella=maskFromRows(entry.umbrellaExposedDelta.rows);
  const bodyCandidate=rasterizePolygons([semantic.bodyPolygon,...(semantic.bodyAppendagePolygons||[])],view);
  const propCandidate=rasterizePolygons(semantic.propPolygons||[],view);
  const body=compareMasks(bodyCandidate,exactBody),prop=compareMasks(propCandidate,exactUmbrella);
  return {direction:view,bodyCandidateFit:body,visibleUmbrellaCoverage:{candidatePixels:prop.candidatePixels,visibleUmbrellaPixels:prop.referencePixels,coveredVisiblePixels:prop.intersectionPixels,coverage:prop.recall,uncoveredVisiblePixels:prop.referenceOnlyPixels,candidateOutsideVisiblePixels:prop.candidateOnlyPixels,note:'Candidate prop geometry may include occluded umbrella area; candidateOutsideVisiblePixels is not a false-positive count.'}};
 });
}
