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
  return{x:tx,y};
 });
}
export function maskFromRows(rows){
 if(!Array.isArray(rows)||rows.length!==HEIGHT)throw new Error('Expected 140 alpha rows');
 const mask=new Uint8Array(WIDTH*HEIGHT);
 for(let y=0;y<HEIGHT;y++)for(const span of rows[y]){
  if(!Array.isArray(span)||span.length!==2)throw new Error('Invalid alpha span');
  const[x0,x1]=span;
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
 return{candidatePixels:cp,referencePixels:rp,intersectionPixels:inter,unionPixels:union,iou:union?inter/union:1,precision:cp?inter/cp:(rp?0:1),recall:rp?inter/rp:(cp?0:1),candidateOnlyPixels:cp-inter,referenceOnlyPixels:rp-inter};
}
function pointKey(p){return p[0]+','+p[1];}
export function traceOuterContour(rows){
 const mask=maskFromRows(rows),edges=[],outgoing=new Map();
 const add=(sx,sy,ex,ey,dir)=>{
  const i=edges.length,edge={start:[sx,sy],end:[ex,ey],dir};edges.push(edge);
  const k=pointKey(edge.start);if(!outgoing.has(k))outgoing.set(k,[]);outgoing.get(k).push(i);
 };
 const on=(x,y)=>x>=0&&x<WIDTH&&y>=0&&y<HEIGHT&&mask[y*WIDTH+x]===1;
 for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++)if(on(x,y)){
  if(!on(x,y-1))add(x,y,x+1,y,0);
  if(!on(x+1,y))add(x+1,y,x+1,y+1,1);
  if(!on(x,y+1))add(x+1,y+1,x,y+1,2);
  if(!on(x-1,y))add(x,y+1,x,y,3);
 }
 const used=new Uint8Array(edges.length),loops=[];
 for(let i=0;i<edges.length;i++){
  if(used[i])continue;
  const first=edges[i].start,loop=[];let current=i,closed=false,guard=0;
  while(!used[current]&&guard++<=edges.length){
   used[current]=1;const edge=edges[current];loop.push(edge.start);
   const end=edge.end;
   if(end[0]===first[0]&&end[1]===first[1]){closed=true;break;}
   const options=(outgoing.get(pointKey(end))||[]).filter(k=>!used[k]);
   if(!options.length)break;
   const rank=k=>{const turn=(edges[k].dir-edge.dir+4)%4;return turn===1?0:turn===0?1:turn===3?2:3;};
   current=options.sort((a,b)=>rank(a)-rank(b))[0];
  }
  if(!closed||loop.length<4)continue;
  const simple=[];
  for(let k=0;k<loop.length;k++){
   const prev=loop[(k+loop.length-1)%loop.length],cur=loop[k],next=loop[(k+1)%loop.length];
   const cross=(cur[0]-prev[0])*(next[1]-cur[1])-(cur[1]-prev[1])*(next[0]-cur[0]);
   if(cross!==0)simple.push({x:cur[0],y:cur[1]});
  }
  let twiceArea=0;
  for(let k=0;k<simple.length;k++){const a=simple[k],b=simple[(k+1)%simple.length];twiceArea+=a.x*b.y-b.x*a.y;}
  loops.push({points:simple,area:Math.abs(twiceArea)/2});
 }
 if(!loops.length)throw new Error('Could not trace a closed alpha contour');
 return loops.sort((a,b)=>b.area-a.area)[0].points;
}
export function deriveLocalBodyPolygon(rows,direction){
 return traceOuterContour(rows).map(({x,y})=>{
  let localX=x;
  if(direction==='right')localX=50+(x-50)/0.72;
  if(direction==='left')localX=50+(50-x)/0.72;
  return{x:localX,y};
 });
}
export function measureGrannyMaskFit(annotation,pixelMasks){
 return pixelMasks.map(entry=>{
  const view=CODE_TO_VIEW[entry.direction],semantic=annotation.directions[view];
  if(!semantic)throw new Error('Missing Granny semantic direction: '+view);
  const exactBody=maskFromRows(entry.bodyAlpha.rows),exactUmbrella=maskFromRows(entry.umbrellaExposedDelta.rows);
  const manual=semantic.manualBodyPolygonCandidate||{bodyPolygon:semantic.bodyPolygon,bodyAppendagePolygons:semantic.bodyAppendagePolygons||[]};
  const manualBody=rasterizePolygons([manual.bodyPolygon,...(manual.bodyAppendagePolygons||[])],view);
  const derivedBody=rasterizePolygons([semantic.bodyPolygon],view);
  const propCandidate=rasterizePolygons(semantic.manualPropPolygonCandidate||semantic.propPolygons||[],view);
  const visiblePropCandidate=rasterizePolygons(semantic.visiblePropPolygon?[semantic.visiblePropPolygon]:[],view);
  const body=compareMasks(manualBody,exactBody),derived=compareMasks(derivedBody,exactBody),prop=compareMasks(propCandidate,exactUmbrella),visibleProp=compareMasks(visiblePropCandidate,exactUmbrella);
  return{direction:view,manualBodyCandidateFit:body,pixelDerivedBodyContourFit:derived,visibleUmbrellaManualCoverage:{candidatePixels:prop.candidatePixels,visibleUmbrellaPixels:prop.referencePixels,coveredVisiblePixels:prop.intersectionPixels,coverage:prop.recall,uncoveredVisiblePixels:prop.referenceOnlyPixels,candidateOutsideVisiblePixels:prop.candidateOnlyPixels,note:'Candidate prop geometry may include occluded umbrella area; candidateOutsideVisiblePixels is not a false-positive count.'},pixelDerivedVisibleUmbrellaContourFit:visibleProp};
 });
}
