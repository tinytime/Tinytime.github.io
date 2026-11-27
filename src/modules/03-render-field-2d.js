/* ============================ rendering: camera ============================ */
/* Landscape for the football game only: when a match is on and the phone is held sideways, the app fills the whole screen width and the camera switches to its landscape settings. Held upright it asks you to turn the phone (with a way to keep playing upright). */
let rotSkip=false;
function syncLand(){
  const hud=$('#hud'),inMatch=!OWON&&hud&&!hud.hidden&&typeof G!=='undefined'&&G&&G.mode!=='end';
  const inDrill=!!(typeof G!=='undefined'&&G&&G.drill);
  const wide=innerWidth>innerHeight,want=(inMatch||inDrill)&&wide;
  if(want!==LAND){LAND=want;document.body.classList.toggle('land',want);resize()}
  const needLand=(inMatch||inDrill)&&!wide&&!window.__noRot;
  if(needLand!==syncLand.n){syncLand.n=needLand;const rm=$('#rotMsg');if(rm)rm.hidden=!needLand}
  const isPhone=Math.min(innerWidth,innerHeight)<600&&(navigator.maxTouchPoints>0||(window.matchMedia&&matchMedia('(pointer: coarse)').matches));
  const needPort=isPhone&&!inMatch&&!inDrill&&wide&&!window.__noRot;
  if(needPort!==syncLand.p){syncLand.p=needPort;const rp=$('#rotPortMsg');if(rp)rp.hidden=!needPort}
}
let RESI=0;const RES=[{n:'HIGH',d:2},{n:'MEDIUM',d:1.5},{n:'LOW',d:1},{n:'SHARP',d:2.5}];try{const v=+localStorage.getItem('sg_res');if(v>=0&&v<RES.length)RESI=v}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
function resize(){const r=$('#app').getBoundingClientRect();W=r.width;H=r.height;try{ART.hp=CAMCFGL.artHp}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}   // sprites grow a little in a short window (Claude's viewer) so they stay about 53 px tall
  const dpr=Math.min(window.devicePixelRatio||1,window.__perfLvl>=2?1.5:(RES[RESI].d>2&&!window.__perfLvl?2.5:2),RES[RESI].d);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=false;rebuildVignette()}
addEventListener('resize',()=>{syncLand();resize();if(OWON)owResize()});
const D=17;
const WFAR=118,NFAR=-18;   // the real ends of the stadium: end zone to y=110, a concrete apron to 118 (the far wall), and the same behind the near end zone
function refPass(fn){fn()}   // no separate view any more: the stadium is projected exactly like the field (same pan, same zoom)
function P(x,y){
  if(camMode()==='side'){
    const Us=W/26*cam.zoom,s=clamp(1+(x-cam.x)*.005,.8,1.25);
    return{sx:W*.4+(y-cam.y)*Us,sy:H*.38+(x-cam.x)*Us*.62*s,u:Us*s};
  }
  const U0=WU*U0F*cam.zoom,d=y-cam.y,s=D2/(Math.max(d,-D2*.45)+D2);   // size and width shrink like a normal perspective ...
  return{sx:W/2+(x-cam.x)*U0*s,sy:syDepth(d),u:U0*s};   // ... while the rows run up the screen on a gentler curve, so a yard near the line of scrimmage stays tall
}
const sdir=(dx,dy)=>camMode()==='side'?{x:dy,y:dx}:{x:dx,y:-dy};
function quad(x0,y0,x1,y1,col){
  ctx.fillStyle=col;ctx.beginPath();
  const n=1;   // true projection: straight edges stay straight, no subdividing   // long strips follow the curve of the field instead of cutting across it
  for(let i=0;i<=n;i++){const p=P(x0,y0+(y1-y0)*i/n);i?ctx.lineTo(p.sx,p.sy):ctx.moveTo(p.sx,p.sy)}
  for(let i=n;i>=0;i--){const p=P(x1,y0+(y1-y0)*i/n);ctx.lineTo(p.sx,p.sy)}
  ctx.closePath();ctx.fill()}
function poly(pts,fill,stroke,lw){ctx.beginPath();pts.forEach((q,i)=>{const p=P(q[0],q[1]);i?ctx.lineTo(p.sx,p.sy):ctx.moveTo(p.sx,p.sy)});if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw||1;ctx.stroke()}}
function ellipsePts(x,y,rx,ry,n){const a=[];for(let i=0;i<n;i++){const t=i/n*TAU;a.push([x+Math.cos(t)*rx,y+Math.sin(t)*ry])}return a}

/* ============================ field & stadium ============================ */
const hsl2hex=(h,sa,l)=>{const a=sa*Math.min(l,1-l),f=n=>{const k=(n+h/30)%12,c=l-a*Math.max(-1,Math.min(k-3,9-k,1));return Math.round(c*255).toString(16).padStart(2,'0')};return'#'+f(0)+f(8)+f(4)};
const TURF_BASE='#1A2E40',TURF_A=hsl2hex(208.4,.4222,.125+.035),TURF_B=hsl2hex(208.4,.4222,.125-.035);   /* v3.10: darker asphalt (was .176 +/- .05) so the lines stand out */   // surface #1A2E40 with mowing stripes every 5 yd, +/-3 points of lightness (it was #16222f / #121c28)
const SCUFF=(()=>{const r=mulberry(77),a=[];for(let i=0;i<900;i++)a.push({x:1+r()*(FW-2),y:-4+r()*108,r:r(),dx:(r()-.5)*1.6,dy:(r()-.5)*.5,dark:r()<.45});return a})();
function drawSideBarrier(ymin,ymax){   // with the flatter camera the sidelines only show toward the far end, so a low barrier wall stands just outside them (it fills the dark ground beside the field)
  if(!LAND)return;const hy=7;
  for(const sd of [0,1]){const x=sd?FW+6:-6,a=P(x,Math.max(ymin,-6)),b=P(x,ymax),a2={sx:a.sx,sy:a.sy-hy*a.u},b2={sx:b.sx,sy:b.sy-hy*b.u};
    ctx.globalAlpha=1;const gr=ctx.createLinearGradient(0,Math.min(b2.sy,a2.sy),0,a.sy);gr.addColorStop(0,'#140f2a');gr.addColorStop(1,'#241c46');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.lineTo(b2.sx,b2.sy);ctx.lineTo(a2.sx,a2.sy);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=1;for(let y=Math.ceil(Math.max(ymin,-6)/8)*8;y<ymax;y+=8){const q=P(x,y);ctx.beginPath();ctx.moveTo(q.sx,q.sy);ctx.lineTo(q.sx,q.sy-hy*q.u);ctx.stroke()}
    ctx.strokeStyle=sd?'rgba(255,47,168,.8)':'rgba(39,224,255,.8)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(a.sx,a.sy-.35*a.u);ctx.lineTo(b.sx,b.sy-.35*b.u);ctx.stroke();ctx.globalAlpha=1}}
function drawTurfDetail(ymin,ymax){   // scuffs and wear, all drawn in code: at most 6% opacity, heavier near the line of scrimmage and the hash marks
  const los=F?F.los:(G?G.los:25);ctx.lineCap='round';
  for(const q of SCUFF){if(q.y<ymin||q.y>ymax)continue;const dl=(q.y-los)/7,dh=(Math.abs(q.x-CX)-3.5)/1.6,w=.25+.75*Math.max(Math.exp(-dl*dl),.8*Math.exp(-dh*dh));if(q.r>w)continue;
    const a=P(q.x,q.y),b=P(q.x+q.dx,q.y+q.dy);ctx.globalAlpha=.06*(.35+.65*w);ctx.strokeStyle=q.dark?'#000':'#cfe3f5';ctx.lineWidth=q.dark?Math.max(1.5,a.u*.28):Math.max(1,a.u*.1);ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy+(q.dark?1:0));ctx.stroke()}
  ctx.globalAlpha=1}
const POOLS=[[CX-9,14],[CX+8,34],[CX-7,58],[CX+10,80],[CX-6,100]];
let POOLS2=[];   // four neon light pools: cyan / magenta, centre about +15 lightness points, still +6 at 60% of the radius
let POOLSPR=null;function poolSprite(k){if(!POOLSPR){POOLSPR=[];for(const rgb of ['39,224,255','255,47,168']){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d'),gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba('+rgb+',.14)');gr.addColorStop(.6,'rgba('+rgb+',.09)');gr.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=gr;g.fillRect(0,0,128,128);POOLSPR.push(c)}}return POOLSPR[k]}
function drawLightPools(ymin,ymax){
  if(camMode()!=='side'){ctx.save();ctx.globalCompositeOperation='lighter';
    for(const [x,y,k] of POOLS2){if(y<ymin-10||y>ymax+10)continue;const c=P(x,y),f=P(x,y+11),rx=15*c.u,ry=Math.max(6,Math.abs(c.sy-f.sy)*.62);ctx.drawImage(poolSprite(k),c.sx-rx,c.sy-ry,rx*2,ry*2)}
    ctx.restore();return}
  drawLightPoolsOld(ymin,ymax)}
// hard-edged stadium shadow band: a slanted strip across the field, 35 yards of the 100 (35%), about 10 lightness points darker
const SHADOW_Y0=0,SHADOW_Y1=35;
function drawShadowBand(ymin,ymax){
  if(camMode()==='side')return;const y0=Math.max(SHADOW_Y0,ymin),y1=Math.min(SHADOW_Y1,ymax);if(y1<=y0)return;const sl=FW*(window.__slope||.22);
  const e=(y,sgn)=>y+sgn*sl,t0=SHADOW_Y0>=ymin?1:0,t1=SHADOW_Y1<=ymax?1:0;
  const pts=[[0,y0-(t0?sl:0)],[FW,y0+(t0?sl:0)],[FW,y1+(t1?sl:0)],[0,y1-(t1?sl:0)]];
  const pn=P(CX,y0),pf=P(CX,y1),gr=ctx.createLinearGradient(0,pn.sy,0,pf.sy);gr.addColorStop(0,'rgba(2,4,14,.74)');gr.addColorStop(1,'rgba(2,4,14,.66)');   // hard side edges, but the far end of the band is lighter
  poly(pts,gr);
  if(!window.__norim){ctx.save();ctx.strokeStyle='rgba(150,205,255,.42)';ctx.lineWidth=1.6;ctx.beginPath();for(const [a,b] of [[0,1],[3,2]]){const p=P(pts[a][0],pts[a][1]),q=P(pts[b][0],pts[b][1]);ctx.moveTo(p.sx,p.sy);ctx.lineTo(q.sx,q.sy)}ctx.stroke();ctx.restore()}}   // the two long edges get a thin cool rim so the cast shadow reads as a hard edge
// worn marks baked into the turf at fixed spots: 32 scuffs, dark streaks about -6 lightness points, pale ones about +7
const SCUFF2=(()=>{const r=mulberry(91),a=[];for(let i=0;i<44;i++){const near=r()<.65;a.push({x:3+r()*(FW-6),y:near?6+r()*40:-2+r()*104,len:1.4+r()*4.2,ang:(r()-.5)*1.4,w:.14+r()*.3,dark:i%3===0})}return a})();
function drawBakedScuffs(ymin,ymax){
  if(camMode()==='side')return;
  for(const q of SCUFF2){if(q.y<ymin||q.y>ymax)continue;const dx=Math.cos(q.ang)*q.len/2,dy=Math.sin(q.ang)*q.len/2,nx=-Math.sin(q.ang)*q.w,ny=Math.cos(q.ang)*q.w;
    poly([[q.x-dx-nx,q.y-dy-ny],[q.x+dx-nx,q.y+dy-ny],[q.x+dx+nx,q.y+dy+ny],[q.x-dx+nx,q.y-dy+ny]],q.dark?'rgba(0,0,0,.40)':'rgba(205,228,248,.22)')}}
// chipped yard lines: every yard line loses 12-18% of its length in small gaps (positions fixed per line)
const CHIPS=new Map();
function chipGaps(y){let g=CHIPS.get(y);if(g)return g;const r=mulberry(1000+y*7),tot=FW*(.12+r()*.06),n=6,slot=FW/n,w=tot/n;g=[];for(let i=0;i<n;i++){const x0=i*slot+r()*(slot-w);g.push([x0,x0+w])}CHIPS.set(y,g);return g}
function lnChip(y,col,w,al,ymin,ymax){if(y<ymin||y>ymax)return;ctx.globalAlpha=al||1;let x=0;for(const [a,b] of chipGaps(y)){if(a>x)quad(x,y,a,y+w,col);x=b}if(x<FW)quad(x,y,FW,y+w,col);ctx.globalAlpha=1}
function drawLightPoolsOld(ymin,ymax){   // soft overhead light pools lying on the turf: players walk through them
  ctx.save();ctx.globalCompositeOperation='lighter';
  for(const [x,y] of POOLS){if(y<ymin-8||y>ymax+8)continue;const c=P(x,y),f=P(x,y+11),rx=15*c.u,ry=Math.max(6,Math.abs(c.sy-f.sy)*.62);const gr=ctx.createRadialGradient(0,0,0,0,0,1);gr.addColorStop(0,'rgba(190,220,255,.10)');gr.addColorStop(.55,'rgba(190,220,255,.05)');gr.addColorStop(1,'rgba(190,220,255,0)');
    ctx.save();ctx.translate(c.sx,c.sy);ctx.scale(rx,ry);ctx.fillStyle=gr;ctx.beginPath();ctx.arc(0,0,1,0,7);ctx.fill();ctx.restore()}
  ctx.restore()}
let SIDE=null;
/* The side walls and billboards are drawn on their own layer, dimmed by half, and then laid on the picture, so only they go dark (the field, the players and the far wall keep their brightness). */
function sideBegin(){if(!LAND)return;const q=Math.min(1,1/Math.max(1,cv.width/W)),sw=Math.max(2,Math.round(cv.width*q)),sh=Math.max(2,Math.round(cv.height*q)),c=SIDE&&SIDE.c;   // the dimmed side-wall layer is drawn at 1 pixel per screen point: it is soft background, and at 2x or 3x it was the most expensive thing on screen
  if(!SIDE||c.width!==sw||c.height!==sh){const cc=document.createElement('canvas');cc.width=sw;cc.height=sh;SIDE={c:cc,x:cc.getContext('2d')}}
  SIDE.x.setTransform(1,0,0,1,0,0);SIDE.x.clearRect(0,0,SIDE.c.width,SIDE.c.height);SIDE.x.setTransform(SIDE.c.width/W,0,0,SIDE.c.height/H,0,0);SIDE.main=ctx;ctx=SIDE.x}
function sideEnd(over){if(!LAND||!SIDE||ctx!==SIDE.x)return;const x=SIDE.x;x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='source-atop';x.fillStyle=window.__noDim?'rgba(0,0,0,0)':'rgba(0,0,0,.6)';x.fillRect(0,0,SIDE.c.width,SIDE.c.height);x.globalCompositeOperation='source-over';ctx=SIDE.main;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=true;
  const bl=(x0,y0,x1,y1)=>{x0=Math.max(0,Math.floor(x0));y0=Math.max(0,Math.floor(y0));x1=Math.min(W,Math.ceil(x1));y1=Math.min(H,Math.ceil(y1));if(x1<=x0||y1<=y0)return;const q=SIDE.c.width/W,kx=cv.width/W,ky=cv.height/H;ctx.drawImage(SIDE.c,x0*q,y0*q,(x1-x0)*q,(y1-y0)*q,x0*kx,y0*ky,(x1-x0)*kx,(y1-y0)*ky)};
  // only the parts of the layer that can show are copied: below the row where the turf fills the whole screen width there is nothing, and (when the turf is painted over it afterwards) neither is the middle of the field
  const R=sideRegion();if(!R||over)bl(0,0,W,R?R.cut:H);else{bl(0,0,W,R.wall);if(R.cut>R.wall){bl(0,R.wall,R.xl,R.cut);bl(R.xr,R.wall,W,R.cut)}}
  ctx.restore()}
function sideRegion(){if(!LAND||camMode()==='side')return null;const k=sideRegion.k;if(k&&k.f===frameNo)return k.v;
  let cut=0;{const a=cam.y;let found=false;for(let d=-4;d<=90&&!found;d+=1){const y=a+d,l=P(0,y).sx,r=P(FW,y).sx;if(l>-6||r<W+6){cut=Math.min(H,P(CX,y).sy+8);found=true}}if(!found)cut=Math.min(H,P(CX,a+90).sy+8)}
  const wy=Math.min(WALLY,a2()),pw=P(CX,wy),xl=Math.max(0,P(0,wy-.5).sx+6),xr=Math.min(W,P(FW,wy-.5).sx-6),v={cut:Math.max(2,cut),wall:Math.min(H,pw.sy+4),xl,xr};sideRegion.k={f:frameNo,v};return v}
const a2=()=>cam.y+120;
let camLive=0,WALLY=113,sideVis=[1,1];   // how visible the left/right sideline is: only when the carrier is within ~10 yards of it
/* CAMERA SETTINGS (all tunable, also from the console as CAMCFG): horizon = screen row of the horizon (0-1 of height); focus = row the ball carrier sits on; depth = perspective strength (smaller = stronger, a lower camera); xscale = how wide a yard is on screen at the focus row (smaller = more field visible across); zoomMax / zoomIn = the biggest push-in and the push-in used once a run opens up; minZoom = the furthest it will pull back to keep a crowd on screen; look = seconds of look-ahead in the carrier's direction; lookY = look-ahead up the field. The viewing angle follows from horizon + depth: about 37 degrees down at the defaults. */
const CAMCFG=window.CAMCFG={horizon:.2,focus:.66,depth:30,xscale:.047,zoomIn:1.0,minZoom:.93,look:.55,lookY:.35};
const CAMCFGL=window.CAMCFGL={across:44,acrossK:16.6,back:5,horizon:.12,focus:.861,depth:16.6,xscale:.047,wallRow:.27,hPct:.108,sizeDepth:.2,artDepth:1,artHp:.2285,margin:.05};   // across = yards of field visible across the screen at the line of scrimmage; hPct = a player's height as a share of screen height at the carrier's depth; sizeDepth = how much of the perspective shrink players actually get (0 = none); margin = clear space kept around the carrier's group   // the same settings for landscape: scale = how many screen-heights wide a 'screen width' of the portrait camera is
let D2=30,U0F=.047,MY=.0153,HORF=.2,FOCF=.66,LAND=false,WU=390;
const CAMPC=window.CAMPC={horizon:-.55,focus:.60,depth:80,acrossK:24,ty:-4};   // TUNE: the play-call camera (landscape): a higher, flatter-looking angle zoomed out so both lines and the backfield show; it eases into the play camera when the play is called
let CAMB=0,PCS=1,CAMR=0,CAMP=0;const PASSCFG=window.PASSCFG={on:true,horizon:.15,focus:.9,depth:16.6,acrossK:18};   // v3.16KK1 TUNE (F7): the pocket camera while the QB holds the ball on a pass play (landscape): a lower angle behind him (horizon .12 to .15, QB a little lower on screen: focus .861 to .9) and a little wider (16.6 to 18 yd across per screen height)
   // v3.09: CAMR 0..1 = how far the camera has moved to the low runner camera (RUNCFG), eased like CAMB
const RUNCFG=window.RUNCFG={horizon:.4,focus:.97,depth:18};   // v3.09 TUNE: the landscape runner camera (blended in once the carrier is 3+ yd past the line)   // CAMB: 0 = play camera, 1 = play-call camera (eased); PCS: players shrink with the zoom-out
function applyCam(){if(typeof G!=='undefined'&&G&&G.drill){D2=220;U0F=.047;HORF=-4.2;FOCF=.55;MY=.024;WU=W/(44*U0F);PCS=.78;return}const C=LAND?CAMCFGL:CAMCFG,b=LAND?CAMB:0,r=LAND?CAMR*(1-b):0,pp=LAND&&PASSCFG.on?CAMP*(1-b)*(1-r):0,mx=(a,c,rr,ps)=>{let v=a+(rr-a)*r;if(ps!==undefined)v+=(ps-v)*pp;return v+(c-v)*b};let dp=mx(C.depth,CAMPC.depth,RUNCFG.depth,PASSCFG.depth);D2=dp;U0F=C.xscale;HORF=mx(C.horizon,CAMPC.horizon,RUNCFG.horizon,PASSCFG.horizon);FOCF=mx(C.focus,CAMPC.focus,RUNCFG.focus,PASSCFG.focus);MY=(FOCF-HORF)/D2;const AC=LAND&&C.acrossK?mx(C.acrossK,CAMPC.acrossK,C.acrossK,PASSCFG.acrossK)*W/H:CAMCFGL.across;WU=LAND?W/(AC*U0F*(D2/(5+D2))):W;
  if(LAND&&C.acrossK){const AC0=C.acrossK*W/H;PCS=WU/(W/(AC0*U0F*(C.depth/(5+C.depth))))}else PCS=1}   // landscape: a yard is always the same share of a player's width, whatever the window shape
applyCam();   // ONE true perspective on a flat ground plane (D2 = how far away the vanishing distance is); HORF = the row where the visible field ends under the skyline   // one camera for the whole play: horizon 25% down, the camera's focus row 66% down, about 9 player widths across at the line
const horY=()=>H*(FOCF-(FOCF-HORF)*cam.zoom),horY0=()=>H*HORF;   // the true horizon row: where the flat ground vanishes
const syDepthZ=(d,z)=>{const f=H*FOCF,k=H*MY*D2*z;return f-k+k*D2/(Math.max(d,-D2*.45)+D2)};   // screen row of a ground point d yards past the camera focus: straight projective, so every line on the ground stays straight
const syDepth=d=>syDepthZ(d,cam.zoom);   // the yard rows stretch with the zoom too   // a yard is a constant 2.1% of the screen up to 15 yards past the focus, then the far field squashes toward the horizon   // screen row of a spot d yards past the camera's focus
const syScale=sc=>syDepth(D2/sc-D2);
const shade=(hex,f)=>{const n=parseInt(String(hex).slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;if(f>=0){r+=(255-r)*f;g+=(255-g)*f;b+=(255-b)*f}else{r*=1+f;g*=1+f;b*=1+f}return'rgb('+(r|0)+','+(g|0)+','+(b|0)+')'};
const homeCol=()=>SAVE.uni.jc,awayCol=()=>(G&&G.crew?(G.oppUni||G.crew.uni).jc:'#8e5bd8');
const DECO=(()=>{const r=mulberry(11),dirt=[],tufts=[],props=[];
  for(let i=0;i<9;i++)dirt.push({x:12+r()*(FW-24),y:12+r()*76,rx:1.2+r()*2.2,ry:.8+r()*1.3,a:.12+r()*.1});
  for(let i=0;i<80;i++)tufts.push([r()*FW,r()*104-2,r()]);
  const kinds=['cone','cooler','bench','tire','cart'];
  for(let i=0;i<30;i++)props.push({side:r()<.5?-1:1,y:4+r()*92,k:kinds[Math.floor(r()*kinds.length)]});
  return{dirt,tufts,props}})();
function board(ax,ay,bx,by,hg,col){const a=P(ax,ay),b=P(bx,by);ctx.fillStyle='#0a0716';ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.lineTo(b.sx,b.sy-b.u*hg);ctx.lineTo(a.sx,a.sy-a.u*hg);ctx.closePath();ctx.fill();
  const i=.1;ctx.fillStyle=nrgba(col,.8);ctx.beginPath();ctx.moveTo(a.sx,a.sy-a.u*hg*i);ctx.lineTo(b.sx,b.sy-b.u*hg*i);ctx.lineTo(b.sx,b.sy-b.u*hg*(1-i));ctx.lineTo(a.sx,a.sy-a.u*hg*(1-i));ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.moveTo(a.sx,a.sy-a.u*hg*.5);ctx.lineTo(b.sx,b.sy-b.u*hg*.5);ctx.lineTo(b.sx,b.sy-b.u*hg*.62);ctx.lineTo(a.sx,a.sy-a.u*hg*.62);ctx.closePath();ctx.fill()}
const BOARDC=['#ff2fa8','#27e0ff','#9b5cff','#ff5ad0','#1fd1b8','#ff7a3a'];
function fence(ax,ay,bx,by,h,i){
  const a=P(ax,ay),b=P(bx,by),col=ax<CX?STAD.cy:STAD.mg;
  ctx.fillStyle='rgba(18,10,40,.55)';ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.lineTo(b.sx,b.sy-b.u*h);ctx.lineTo(a.sx,a.sy-a.u*h);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(120,200,255,.28)';ctx.lineWidth=Math.max(1,a.u*.05);ctx.beginPath();
  for(let k=1;k<4;k++){const f=k/4,sx=a.sx+(b.sx-a.sx)*f,sy=a.sy+(b.sy-a.sy)*f,u=a.u+(b.u-a.u)*f;ctx.moveTo(sx,sy);ctx.lineTo(sx,sy-u*h)}
  ctx.stroke();
  ctx.strokeStyle=nrgba(col,.3);ctx.lineWidth=Math.max(3,a.u*.32);ctx.beginPath();ctx.moveTo(a.sx,a.sy-a.u*h);ctx.lineTo(b.sx,b.sy-b.u*h);ctx.stroke();   // glow
  ctx.strokeStyle=col;ctx.lineWidth=Math.max(1.4,a.u*.1);ctx.beginPath();ctx.moveTo(a.sx,a.sy-a.u*h);ctx.lineTo(b.sx,b.sy-b.u*h);ctx.moveTo(a.sx,a.sy);ctx.lineTo(a.sx,a.sy-a.u*h);ctx.stroke();
  if(i%3===1)board(ax,ay+.6,bx,by-.6,h*.62,BOARDC[i%6]);   // ad panel hung on the barrier
}

/* ---- Town 1 stadium: a neon megacity. Every town gets its own palette, props and signs; this is the first one. ---- */
const STAD={cy:'#27e0ff',mg:'#ff2fa8',pu:'#9b5cff',neon:['#27e0ff','#ff2fa8','#9b5cff','#27e0ff','#ff5ad0'],
  bld:['#1d1836','#251c44','#16142c','#2a1f4a','#1a1a3a','#30204e','#14122a'],
  kanji:['\u96fb','\u591c','\u8857','\u62f3','\u9152','\u9eba','\u85ac','\u9f8d','\u86c7','\u732b','\u8ced','\u91d1','\u96e8','\u5149','\u95c7','\u5e97']};
/* ---- the neighbourhood around the lot: tall brick blocks down both sides, a wall of buildings behind the end zone, lamps, trees and parked cars ---- */
const SURR=(()=>{const r=mulberry(23),L=[],Rr=[],E=[],SP=[];
  const types=['tenement','store','brownstone','warehouse','tenement','brownstone','store'];
  const cols=STAD.bld;
  const mk=(o)=>Object.assign({t:types[(r()*types.length)|0],col:cols[(r()*cols.length)|0],s:(r()*9999)|0,wt:r()>.72,fe:r()>.5},o);
  for(const sd of [-1,1]){let y=-18;const arr=sd<0?L:Rr;
    while(y<132){const len=11+r()*7;arr.push(mk({y0:y,y1:y+len,h:14+r()*20,d:10+r()*10}));y+=len+(r()>.88?3:0)}}
  let x=-80,big=false;
  while(x<FW+80){let w=18+r()*12,h=30+r()*34;const hitMid=!big&&x+w>CX-6;if(hitMid){big=true;w=34;h=52}
    E.push(mk({x0:x,x1:x+w,y:130+r()*5,h,mid:hitMid}));x+=w+(r()>.8?4:0)}
  for(let y=-6;y<128;y+=18){SP.push({k:'lamp',x:-9.5,y:y+4});SP.push({k:'lamp',x:FW+9.5,y:y+13})}
  for(let y=2;y<125;y+=15){SP.push({k:'pylon',x:-12+r()*1.5,y:y+r()*5});SP.push({k:'pylon',x:FW+12-r()*1.5,y:y+7+r()*5})}
  const carc=['#27e0ff','#ff2fa8','#9b5cff','#ff5ad0','#1fd1b8'];
  for(let i=0;i<14;i++)SP.push({k:'car',x:r()<.5?-11.5:FW+11.5,y:6+r()*112,c:carc[(r()*carc.length)|0]});
  for(let i=0;i<12;i++)SP.push({k:r()<.5?'vent':'can',x:r()<.5?-8.2:FW+8.2,y:4+r()*114});
  for(let y=3;y<124;y+=10){SP.push({k:'blade',x:-15.2,y:y+r()*4,s:(r()*99999)|0});SP.push({k:'blade',x:FW+15.2,y:y+5+r()*4,s:(r()*99999)|0})}
  SP.sort((a,b)=>b.y-a.y);
  return{L,R:Rr,E,SP}})();
const hsh=(a,b,c)=>{let t=Math.imul((a|0)^Math.imul(b|0,374761393)^Math.imul(c|0,668265263),1274126177);t^=t>>>13;t=Math.imul(t,1103515245);return((t>>>8)%1000)/1000};
const nrgba=(hex,a)=>{const n=parseInt(String(hex).slice(1),16);return'rgba('+(n>>16)+','+((n>>8)&255)+','+(n&255)+','+a+')'};
const SIGNS=[['\u9eba','NOODLE'],['\u9152','BAR'],['\u85ac','PHARMA'],['\u9f8d','DRAGON'],['\u591c','NIGHT'],['\u8ced','ARCADE'],['\u732b','CAT'],['\u91d1','PAWN'],['\u5e97','24H'],['\u96fb','TECH']];
let SCANP=null;const scanPat=()=>SCANP||(SCANP=(()=>{const c=document.createElement('canvas');c.width=4;c.height=3;const g=c.getContext('2d');g.fillStyle='rgba(0,0,0,.24)';g.fillRect(0,0,4,1);return ctx.createPattern(c,'repeat')})());
const GLOWC={};
function glowImg(col){let c=GLOWC[col];if(!c){c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),gr=g.createRadialGradient(32,32,1,32,32,32);gr.addColorStop(0,nrgba(col,.85));gr.addColorStop(.35,nrgba(col,.28));gr.addColorStop(1,nrgba(col,0));g.fillStyle=gr;g.fillRect(0,0,64,64);GLOWC[col]=c}return c}
const KJ='"Noto Sans JP","Hiragino Sans","Yu Gothic","Noto Sans CJK JP",sans-serif';
/* a neon sign: stacked glyphs with a soft halo */
const NTC=new Map();let NTC_PX=0;const NTC_MAX=8e6,NTM=document.createElement('canvas').getContext('2d');   // v2.95: at most 8 M pixels (32 MB) of lettering, least recently used goes first; one shared surface for measuring (before: a new 300x150 one per sign)   // lettering is drawn once and re-stamped: the glow strokes were the priciest thing in the stadium
function neonText(txt,x,y,size,col,vertical,alpha){
  const q=Math.max(6,Math.round(size/2)*2),k=txt+'|'+q+'|'+col+'|'+(vertical?1:0);let e=NTC.get(k);if(e){NTC.delete(k);NTC.set(k,e)}   // most recently used goes to the back of the line
  if(!e){
    const chars=vertical?Array.from(txt):[txt],pad=q*.5,dpr=Math.min(window.devicePixelRatio||1,2);
    const m=NTM;m.font='900 '+q+'px '+KJ;
    const w=Math.ceil((vertical?q*1.2:m.measureText(txt).width)+pad*2),h=Math.ceil((vertical?chars.length*q*1.08:q*1.2)+pad*2);
    const c=document.createElement('canvas');c.width=Math.ceil(w*dpr);c.height=Math.ceil(h*dpr);const g=c.getContext('2d');g.scale(dpr,dpr);
    g.font='900 '+q+'px '+KJ;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
    chars.forEach((ch,i)=>{const xx=w/2,yy=pad+q*.6+(vertical?i*q*1.08:0);g.globalAlpha=.35;g.strokeStyle=col;g.lineWidth=Math.max(2,q*.32);g.strokeText(ch,xx,yy);g.globalAlpha=1;g.fillStyle='#fff';g.fillText(ch,xx,yy);g.globalAlpha=.7;g.fillStyle=col;g.fillText(ch,xx,yy)});
    e={c,w,h,pad,q};NTC.set(k,e);NTC_PX+=c.width*c.height;
    for(const [k2,o] of NTC){if(NTC_PX<=NTC_MAX||NTC.size<=1)break;if(k2===k)continue;NTC_PX-=o.c.width*o.c.height;o.c.width=o.c.height=0;NTC.delete(k2)}}
  const f=size/e.q,a=ctx.globalAlpha;ctx.globalAlpha=a*(alpha==null?1:alpha);
  ctx.drawImage(e.c,x-e.w/2*f,y-(e.pad+e.q*.6)*f,e.w*f,e.h*f);ctx.globalAlpha=a;
}
/* real neon tube lettering: a hollow outline with a bright core and a glow, a few letters flickering */
function neonTube(txt,x,y,size,col,fl,seed){
  ctx.save();ctx.font='400 '+size+'px "Bowlby One",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';
  ctx.globalAlpha=.9*fl;ctx.drawImage(glowImg(col),x-size*txt.length*.42,y-size*1.1,size*txt.length*.84,size*2.2);
  const ch=Array.from(txt),wd=ch.map(c=>ctx.measureText(c).width),tot=wd.reduce((a,b)=>a+b,0);let cx0=x-tot/2;
  ch.forEach((c,i)=>{const cx=cx0+wd[i]/2;cx0+=wd[i];const on=((performance.now()/1000*1.7+seed+i*1.3)%11)<10.2?1:.25;
    ctx.globalAlpha=.4*fl*on;ctx.strokeStyle=col;ctx.lineWidth=Math.max(3,size*.26);ctx.strokeText(c,cx,y);
    ctx.globalAlpha=fl*on;ctx.strokeStyle=col;ctx.lineWidth=Math.max(1.4,size*.11);ctx.strokeText(c,cx,y);
    ctx.strokeStyle='#fff';ctx.lineWidth=Math.max(.7,size*.04);ctx.strokeText(c,cx,y)});
  ctx.restore();
}
function drawBld(m,Lw,h,b,tone,uMin,acc,hz){
  const q=(u0,v0,u1,v1,col)=>{u0=Math.max(u0,uMin);if(u1<=u0)return;const a=m(u0,v0),bb=m(u1,v0),c=m(u1,v1),d=m(u0,v1);ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(bb.x,bb.y);ctx.lineTo(c.x,c.y);ctx.lineTo(d.x,d.y);ctx.closePath();ctx.fill()};
  const NE=STAD.neon,nc=NE[b.s%5],nc2=NE[(b.s>>3)%5];
  q(0,0,Lw,h,shade(b.col,tone));
  // metal panel seams
  ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=1;ctx.beginPath();for(let v=2.4;v<h;v+=2.4){const a=m(Math.max(0,uMin),v),c=m(Lw,v);ctx.moveTo(a.x,a.y);ctx.lineTo(c.x,c.y)}ctx.stroke();
  // lit neon roof edge + a faint wash of its colour on the wall below
  q(0,h-.45,Lw,h,nc);q(0,h-2.6,Lw,h-.45,nrgba(nc,.10));
  const gf=4,ty=b.t;
  if(ty==='store'){q(.6,3.4,Lw-.6,4.5,'#07050f');q(.7,3.5,Lw-.7,4.4,nrgba(nc2,.85));q(1.2,.5,Lw*.62,3.2,hsh(b.s,1,1)>.3?nrgba(nc,.55):'#07050f');q(Lw*.7,0,Lw*.7+1.8,3.1,'#07050f');q(1.2,.5,Lw*.62,.9,'rgba(255,255,255,.2)');
    {const sc=Math.abs(m(0,1).y-m(0,0).y),ux=Math.abs(m(1,0).x-m(0,0).x),pp=m(Lw/2,3.95);if(sc>2.2&&ux>sc*.35){ctx.save();ctx.translate(pp.x,pp.y);ctx.scale(Math.min(1,ux/sc),1);neonTube(SIGNS[b.s%10][1],0,0,sc*1.05,nc,1,b.s);ctx.restore()}}}
  else if(ty==='warehouse'){q(Lw*.12,0,Lw*.55,4.4,'#2a2744');ctx.strokeStyle='rgba(0,0,0,.45)';ctx.beginPath();for(let v=.8;v<4.4;v+=.8){const a=m(Lw*.12,v),c=m(Lw*.55,v);ctx.moveTo(a.x,a.y);ctx.lineTo(c.x,c.y)}ctx.stroke();
    q(Lw*.6,1,Lw*.95,Math.min(h-2,7),nrgba(nc,.9));q(Lw*.64,1.6,Lw*.9,2.6,'rgba(255,255,255,.5)');q(Lw*.66,3.6,Lw*.86,4.3,'rgba(10,5,30,.6)')}
  else{q(Lw*.4,0,Lw*.4+1.8,3.2,'#05040a');q(Lw*.4-.2,3.3,Lw*.4+2,3.7,nc);if(ty==='brownstone')q(Lw*.4-.7,0,Lw*.4+2.5,.5,'#4a4670')}
  const v0=ty==='warehouse'?6:gf+1.4;let ri=0;const WC=['#27e0ff','#ff2fa8','#b58cff','#ffe0a0','#27e0ff'];
  for(let v=v0;v+2.4<h-2.4;v+=4.2,ri++){let ci=0;for(let u=1.6;u+1.8<Lw-.8;u+=3.7,ci++){
    const r0=hsh(b.s,ci,ri),lit=r0>.55;q(u-.2,v-.2,u+2,v+2.6,'rgba(0,0,0,.45)');q(u,v,u+1.8,v+2.4,lit?nrgba(WC[(r0*100|0)%5],.9):'#0a0816');
    if(lit)q(u,v,u+1.8,v+.9,'rgba(255,255,255,.2)')}}
  // a tall vertical sign
  if(b.s%4===0&&h>20&&Lw>9){const u0=Lw*.12,v1=h*.32,ch=3,w=1.7;q(u0,v1,u0+w,v1+ch*2.2+.8,'#07050f');q(u0-.15,v1-.15,u0,v1+ch*2.2+.95,nrgba(nc2,.8));
    const p=m(u0+w/2,v1+ch*2.2+.4),sc=Math.abs(m(0,1).y-m(0,0).y),ux=Math.abs(m(1,0).x-m(0,0).x);
    if(sc>1.5){ctx.save();ctx.translate(p.x,p.y);ctx.scale(Math.min(1,ux/sc||0),1);const kk=STAD.kanji,s0=b.s;neonText(kk[s0%16]+kk[(s0>>4)%16]+kk[(s0>>8)%16],0,sc*1.05,sc*1.9,nc2,true);ctx.restore()}}
  if(b.fe&&ty!=='warehouse'&&Lw>9){const u=Lw*.5-1.5;ctx.strokeStyle='#4a4670';ctx.lineWidth=Math.max(1,Math.abs(m(0,0).x-m(.5,0).x)*.3+.6);
    for(let v=gf+.4;v+4<h-1;v+=4.2){q(u,v,u+3.4,v+.35,'#4a4670');const a=m(u+.1,v),c=m(u+3.3,v+4.2);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(c.x,c.y);ctx.stroke();const d=m(u+.1,v+1.1),e=m(u+.1,v);ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(e.x,e.y);ctx.stroke()}}
  // exposed cable bundle running down the wall
  if(b.s%3===1&&Lw>6){const u=Lw*.82,a=m(u,h-.5),c=m(u+.5,gf);ctx.strokeStyle='#0a0814';ctx.lineWidth=Math.max(1.2,Math.abs(m(1,0).x-m(0,0).x)*.4);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo((a.x+c.x)/2+3,(a.y+c.y)/2,c.x,c.y);ctx.stroke()}
  if(hz>0){q(0,0,Lw,h,'rgba(150,30,190,'+hz+')')}
}
function drawRoofBits(m,Lw,h,b,u){
  const p=m(Lw*.5,h),t=performance.now()/1000;
  if(b.wt){const w=3.4*u;ctx.fillStyle='#14102a';ctx.fillRect(p.x-w*.45,p.y-w*.9,w*.12,w*.9);ctx.fillRect(p.x+w*.33,p.y-w*.9,w*.12,w*.9);ctx.fillStyle='#2a2444';ctx.fillRect(p.x-w*.5,p.y-w*1.9,w,w);ctx.fillStyle=STAD.cy;ctx.fillRect(p.x-w*.5,p.y-w*1.45,w,w*.12)}
  else if(b.s%3===0){const w=2.4*u;ctx.fillStyle='#1c1832';ctx.fillRect(p.x-w*1.6,p.y-w*.9,w,w*.9);ctx.fillStyle='#262040';ctx.fillRect(p.x+w*.3,p.y-w*.6,w*1.2,w*.6)}
  else if(b.s%3===1){ctx.strokeStyle='#14102a';ctx.lineWidth=Math.max(1,u*.12);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x,p.y-u*5);ctx.moveTo(p.x-u*1,p.y-u*3.6);ctx.lineTo(p.x+u*1,p.y-u*3.6);ctx.stroke();
    if(((t*1.2+b.s)%2)<1.1){ctx.fillStyle='#ff3b5c';ctx.fillRect(p.x-u*.15,p.y-u*5.2,u*.3,u*.3)}}
}
function drawSprite(o){
  const p=P(o.x,o.y);if(p.sx<-60||p.sx>W+60)return;const u=p.u,hz=clamp((o.y-cam.y-30)/220,0,.45),t=performance.now()/1000;
  const gl=(col,x,y,r,a)=>{ctx.globalAlpha=a==null?1:a;ctx.drawImage(glowImg(col),x-r,y-r,r*2,r*2);ctx.globalAlpha=1};
  if(o.k==='lamp'){const dir=o.x<0?1:-1,col=o.x<0?STAD.cy:STAD.mg;ctx.strokeStyle='#1a1630';ctx.lineWidth=Math.max(1.5,u*.22);ctx.beginPath();ctx.moveTo(p.sx,p.sy);ctx.lineTo(p.sx,p.sy-u*8.5);ctx.lineTo(p.sx+dir*u*1.6,p.sy-u*9.1);ctx.stroke();
    const lx=p.sx+dir*u*1.6,ly=p.sy-u*9.1;gl(col,lx,ly,u*4.6,.9);ctx.fillStyle='#fff';ctx.fillRect(lx-u*.7,ly-u*.15,u*1.4,u*.3);
    ctx.fillStyle=nrgba(col,.10);ctx.beginPath();ctx.ellipse(lx,p.sy,u*3.2,u*.9,0,0,7);ctx.fill()}   // coloured pool of light on the ground
  else if(o.k==='blade'){const NE=STAD.neon,col=NE[o.s%5],col2=NE[(o.s>>3)%5],kk=STAD.kanji,n=2+(o.s%2),sz=u*1.5,hh=n*sz*1.08+u*.7,top=p.sy-u*(11+(o.s%4)*1.4)-hh*.2,w=u*2.2,dir=o.x<0?-1:1,fl=((t*1.6+o.s)%13)<12?1:.35;
    ctx.strokeStyle='#0a0814';ctx.lineWidth=Math.max(1.5,u*.18);ctx.beginPath();ctx.moveTo(p.sx,top+hh*.2);ctx.lineTo(p.sx+dir*u*2.4,top+hh*.2);ctx.moveTo(p.sx,top+hh*.8);ctx.lineTo(p.sx+dir*u*2.4,top+hh*.8);ctx.stroke();
    gl(col,p.sx,top+hh/2,u*5.5,.55*fl);ctx.fillStyle='#07050f';ctx.fillRect(p.sx-w/2,top,w,hh);ctx.strokeStyle=nrgba(col,.45*fl);ctx.lineWidth=Math.max(3,u*.4);ctx.strokeRect(p.sx-w/2,top,w,hh);ctx.strokeStyle=nrgba(col,fl);ctx.lineWidth=Math.max(1.3,u*.14);ctx.strokeRect(p.sx-w/2,top,w,hh);
    let sg='';for(let i=0;i<n;i++)sg+=kk[(o.s*3+i*7)%16];neonText(sg,p.sx,top+u*.35+sz*.55,sz,col2,true,fl)}
  else if(o.k==='pylon'){const col=o.x<0?STAD.mg:STAD.cy,fl=((t*3+o.y)%7)<6.4?1:.35;ctx.fillStyle='#1a1630';ctx.fillRect(p.sx-u*.5,p.sy-u*.8,u,u*.8);ctx.fillStyle='#0a0814';ctx.fillRect(p.sx-u*.22,p.sy-u*6.4,u*.44,u*5.7);gl(col,p.sx,p.sy-u*3.6,u*3.6,.8*fl);ctx.fillStyle=col;ctx.globalAlpha=fl;ctx.fillRect(p.sx-u*.1,p.sy-u*6,u*.2,u*4.8);ctx.globalAlpha=1}
  else if(o.k==='car'){const w=3.3*u,h=1.3*u;ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.ellipse(p.sx,p.sy,w*.62,u*.35,0,0,7);ctx.fill();
    ctx.fillStyle=nrgba(o.c,.55);ctx.fillRect(p.sx-w*.5,p.sy-u*.35,w,u*.22);gl(o.c,p.sx,p.sy-u*.15,w*.7,.5);
    ctx.fillStyle='#161230';ctx.fillRect(p.sx-w/2,p.sy-h-u*.5,w,h);ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(p.sx-w/2,p.sy-h-u*.5,w,h*.2);ctx.fillStyle='#231d46';ctx.fillRect(p.sx-w*.4,p.sy-h-u*1.25,w*.8,u*.8);ctx.fillStyle=nrgba(STAD.cy,.55);ctx.fillRect(p.sx-w*.34,p.sy-h-u*1.15,w*.68,u*.6);
    ctx.fillStyle=STAD.mg;ctx.fillRect(p.sx-w*.47,p.sy-h*.95-u*.2,u*.5,u*.22);ctx.fillRect(p.sx+w*.47-u*.5,p.sy-h*.95-u*.2,u*.5,u*.22)}
  else if(o.k==='vent'){ctx.fillStyle='#1a1630';ctx.fillRect(p.sx-u*.5,p.sy-u*.9,u,u*.9);ctx.fillStyle='#2a2444';ctx.fillRect(p.sx-u*.58,p.sy-u*1.05,u*1.16,u*.2);
    for(let i=0;i<3;i++){const k=((t*.5+i/3+o.y*.13)%1);ctx.fillStyle='rgba(190,210,255,'+(.2*(1-k))+')';ctx.beginPath();ctx.arc(p.sx+Math.sin(k*5+i)*u*.3,p.sy-u*1.1-k*u*3,u*(.35+k*.7),0,7);ctx.fill()}}
  else{ctx.fillStyle='#1a1630';ctx.fillRect(p.sx-u*.5,p.sy-u*1.3,u,u*1.3);ctx.fillStyle=o.x<0?STAD.cy:STAD.mg;ctx.fillRect(p.sx-u*.5,p.sy-u*.9,u,u*.14);ctx.fillStyle='#2a2444';ctx.fillRect(p.sx-u*.58,p.sy-u*1.45,u*1.16,u*.22)}
  if(hz>0){ctx.fillStyle='rgba(150,30,190,'+hz*.5+')';ctx.fillRect(p.sx-u*2,p.sy-u*10,u*4,u*10)}
}
function drawSurround(part){
  const acc=G&&G.crew?G.crew.col:'#8e5bd8',cy=cam.y;
  // end-zone wall of buildings, farthest first
  const E=SURR.E.slice().sort((a,b)=>b.y-a.y);
  for(const b of (part==='S'?[]:E)){const p=P(b.x0,b.y),Lw=b.x1-b.x0;if(p.sx>W+200||p.sx+Lw*p.u<-200)continue;
    const m=(u,v)=>({x:p.sx+u*p.u,y:p.sy-v*p.u});
    drawBld(m,Lw,b.h,b,-.05,0,acc,clamp((b.y-cy-35)/230,0,.5));
    if(b.mid){const sy0=b.h*.56,a=m(Lw*.1,sy0),c=m(Lw*.9,sy0+7.5),t=performance.now()/1000,fl=.8+.1*Math.sin(t*5)+(Math.sin(t*23)>.96?-.3:0),ac=acc||'#9b5cff',bw2=c.x-a.x,bh2=a.y-c.y;
      ctx.fillStyle=nrgba(ac,.16);ctx.beginPath();ctx.moveTo(a.x+bw2*.2,a.y+bh2*.9);ctx.lineTo(a.x+bw2*.8,a.y+bh2*.9);ctx.lineTo(c.x,c.y);ctx.lineTo(a.x,c.y);ctx.closePath();ctx.fill();   // projector beam
      ctx.globalAlpha=fl;ctx.fillStyle=nrgba(ac,.55);ctx.fillRect(a.x,c.y,bw2,bh2);ctx.fillStyle=scanPat();ctx.fillRect(a.x,c.y,bw2,bh2);ctx.strokeStyle=ac;ctx.lineWidth=2;ctx.strokeRect(a.x,c.y,bw2,bh2);
      ctx.font='400 '+Math.max(9,p.u*4.2)+'px "Bowlby One",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const nm=G&&G.crew?(G.crew.town||G.crew.name).toUpperCase():'THE BLOCK';ctx.strokeStyle=nrgba(ac,.6);ctx.lineWidth=Math.max(3,p.u*.7);ctx.lineJoin='round';ctx.strokeText(nm,(a.x+c.x)/2,(a.y+c.y)/2);ctx.fillStyle='#fff';ctx.fillText(nm,(a.x+c.x)/2,(a.y+c.y)/2);ctx.globalAlpha=1}
    drawRoofBits(m,Lw,b.h,b,p.u)}
  // the two sides, farthest block first
  for(const sd of (part==='E'?[]:[-1,1])){const arr=sd<0?SURR.L:SURR.R,fx=sd<0?-16:FW+16;
    for(let i=arr.length-1;i>=0;i--){const b=arr[i];if(b.y1<cy-9)continue;
      const p0=P(fx,Math.max(b.y0,cy-9));
      // its end face (looking at the camera)
      if(b.y0>cy-9){const p=P(fx,b.y0),dx=sd;const m=(u,v)=>({x:p.sx+dx*u*p.u,y:p.sy-v*p.u});drawBld(m,b.d,b.h,b,.02,0,acc,clamp((b.y0-cy-35)/230,0,.5))}
      // the face looking at the field
      const uMin=Math.max(0,cy-9-b.y0),Lw=b.y1-b.y0,m=(u,v)=>{const pp=P(fx,b.y0+u);return{x:pp.sx,y:pp.sy-v*pp.u}};
      drawBld(m,Lw,b.h,b,sd<0?-.12:-.2,uMin,acc,clamp((b.y0-cy-35)/230,0,.5));
      drawRoofBits(m,Lw,b.h,b,P(fx,Math.max(b.y0,cy-9)+Lw*.5).u)}}
  for(const o of (part==='E'?[]:SURR.SP)){if(o.y<cy-8)continue;drawSprite(o)}
}

/* ---- the sideline walls: tall industrial stadium walls made of steel panels, with big screens, neon strips, conduits and exposed wiring. They carry the stadium's mood themselves. ---- */
const WALLTXT=[['NET','RUNNERS'],['VAPOR','CITY'],['\u96fb','DOWN'],['\u591c','GAME'],['BLITZ','\u62f3'],['\u96e8','LIVE']];
function drawWall(left,ymin,ymax){
  const x=left?-2.5:FW+2.5,d=left?1:-1,col=left?STAD.cy:STAD.mg,col2=left?STAD.mg:STAD.cy,HV=28,t=performance.now()/1000;
  const y0=Math.max(-12,Math.floor(ymin/7)*7);
  for(let y=y0,i=0;y<WALLY&&y<ymax;y+=7,i++){
    const k=((y/7)|0)+(left?30:41),A=P(x,y),B=P(x,y+7),dx=B.sx-A.sx;
    if(Math.max(A.sx,B.sx)<-40||Math.min(A.sx,B.sx)>W+40)continue;
    const pt=(f,v)=>({x:A.sx+dx*f,y:(A.sy+(B.sy-A.sy)*f)-(A.u+(B.u-A.u)*f)*v});
    const Q=(f0,v0,f1,v1,fill)=>{const a=pt(f0,v0),b=pt(f1,v0),c=pt(f1,v1),e=pt(f0,v1);ctx.fillStyle=fill;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.lineTo(e.x,e.y);ctx.closePath();ctx.fill()};
    const L=(f0,v0,f1,v1,col,w)=>{const a=pt(f0,v0),b=pt(f1,v1);ctx.strokeStyle=col;ctx.lineWidth=Math.max(1,w*(A.u+B.u)/2);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()};
    const u=(A.u+B.u)/2,hz=clamp((y-cam.y-20)/160,0,.5),lod=u>5?2:u>2.6?1:0;
    // floor spill of the wall's neon light
    poly([[x,y],[x,y+7],[x+d*3,y+7],[x+d*3,y]],nrgba(col,.12));
    // steel panel body, plinth and seams
    Q(0,0,1,HV,'#15112b');Q(0,0,1,2.6,'#1d1838');Q(0,HV-2.2,1,HV,'#0f0b22');
    L(0,0,1,0,'rgba(0,0,0,.5)',.08);L(0,2.6,1,2.6,'rgba(0,0,0,.5)',.07);L(0,7.6,1,7.6,'rgba(0,0,0,.4)',.06);L(0,HV-2.2,1,HV-2.2,'rgba(0,0,0,.5)',.07);
    L(0,0,0,HV,'rgba(0,0,0,.55)',.1);L(.5,2.6,.5,HV-2.2,'rgba(0,0,0,.25)',.05);
    // lower band: neon ad panel or vent grille
    if(k%3!==2){Q(.08,.4,.92,2.2,'#07050f');Q(.1,.55,.9,2.05,nrgba(BOARDC[k%6],.82));if(lod>=1)Q(.1,1.15,.9,1.4,'rgba(255,255,255,.3)')}
    else{Q(.08,.4,.92,2.2,'#07050f');if(lod>=1)for(let v=.55;v<2.1;v+=.4)L(.1,v,.9,v,'rgba(120,120,170,.5)',.06)}
    // glowing neon strips
    L(0,2.9,1,2.9,nrgba(col,.35),.42);L(0,2.9,1,2.9,col,.13);
    L(0,HV-2.5,1,HV-2.5,nrgba(col2,.3),.36);L(0,HV-2.5,1,HV-2.5,col2,.11);
    if(lod>=1&&k%2===0){
      // big screen
      const f0=.1,f1=.9,v0=5,v1=14,fl=.8+.12*Math.sin(t*3+k)+(Math.sin(t*17+k*3)>.985?-.35:0),sc=BOARDC[(k*5)%6];
      Q(f0-.03,v0-.4,f1+.03,v1+.4,'#05040c');Q(f0,v0,f1,v1,nrgba(sc,.7*fl));Q(f0,v0,f1,v0+(v1-v0)*.5,'rgba(0,0,0,.28)');
      const m1=pt(f0,v0),m2=pt(f1,v1);Q(f0,v0,f1,v1,scanPat());
      const w=WALLTXT[k%6],cx=(m1.x+m2.x)/2,cy1=pt(.5,v0+(v1-v0)*.7),cy2=pt(.5,v0+(v1-v0)*.3),c=Math.min(1,Math.abs(dx)*.8/(u*5));
      if(u>3.5&&c>.14){ctx.save();ctx.translate(cx,cy1.y);ctx.scale(c,1);neonText(w[0],0,0,u*2.6,'#ffffff',false,fl);ctx.restore();ctx.save();ctx.translate(cx,cy2.y);ctx.scale(c,1);neonText(w[1],0,0,u*2.0,sc,false,fl);ctx.restore()}
      ctx.strokeStyle=nrgba(sc,.8*fl);ctx.lineWidth=Math.max(1,u*.1);ctx.beginPath();const a=pt(f0,v0),b=pt(f1,v0),cc=pt(f1,v1),e=pt(f0,v1);ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(cc.x,cc.y);ctx.lineTo(e.x,e.y);ctx.closePath();ctx.stroke();
    }else if(lod>=1){
      // conduits, junction box with status lights, hanging cables
      L(.25,2.9,.25,HV-2.2,'#2a2550',.34);L(.31,2.9,.31,HV-2.2,'#0a0816',.16);L(.72,2.9,.72,HV-2.2,'#2a2550',.34);
      const jb=pt(.5,10.5),jw=Math.max(3,u*1.6);ctx.fillStyle='#0a0816';ctx.fillRect(jb.x-jw/2,jb.y-jw*.8,jw,jw*.8);ctx.fillStyle=(((t*2+k)%2)<1)?'#ff3b5c':'#3dffa0';ctx.fillRect(jb.x-jw*.38,jb.y-jw*.62,jw*.22,jw*.22);ctx.fillStyle=col;ctx.fillRect(jb.x+jw*.1,jb.y-jw*.62,jw*.22,jw*.22);
      ctx.strokeStyle='#05040c';ctx.lineWidth=Math.max(1.4,u*.16);const q0=pt(.05,HV-2.4),q1=pt(.5,HV-7.4),q2=pt(.95,HV-2.4);ctx.beginPath();ctx.moveTo(q0.x,q0.y);ctx.quadraticCurveTo(q1.x,q1.y,q2.x,q2.y);ctx.stroke();
      const r0=pt(.1,HV-2.4),r1=pt(.55,HV-5.4),r2=pt(.9,HV-2.4);ctx.strokeStyle=nrgba(col2,.75);ctx.lineWidth=Math.max(1,u*.08);ctx.beginPath();ctx.moveTo(r0.x,r0.y);ctx.quadraticCurveTo(r1.x,r1.y,r2.x,r2.y);ctx.stroke();
    }
    // upper tier: steel truss with warning lights, and a hung neon banner every other bay
    if(lod>=1){ctx.strokeStyle='#2a2550';ctx.lineWidth=Math.max(1,u*.07);ctx.beginPath();for(let f=0;f<1;f+=.25){let a=pt(f,16.4),b=pt(f+.125,24.6),c=pt(f+.25,16.4);ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(c.x,c.y)}ctx.stroke()}
    L(0,16.4,1,16.4,'#2a2550',.12);L(0,24.6,1,24.6,'#2a2550',.12);
    if(lod>=2){const wl=pt(.5,24.6);ctx.fillStyle=(((t*1.5+k)%2)<1)?'#ff3b5c':'#2a0a14';ctx.fillRect(wl.x-u*.25,wl.y-u*.25,u*.5,u*.5)}
    if(lod>=1&&k%2===1){const bc=BOARDC[(k*3)%6],b0=pt(.3,17.2),b1=pt(.7,24.2);Q(.3,17.2,.7,24.2,nrgba(bc,.55));Q(.3,17.2,.7,17.6,bc);Q(.3,23.8,.7,24.2,bc);const cx2=(b0.x+b1.x)/2,cy2=(b0.y+b1.y)/2,c2=Math.min(1,Math.abs(dx)*.4/(u*3));if(u>2.5&&c2>.14){ctx.save();ctx.translate(cx2,cy2);ctx.scale(c2,1);neonText(STAD.kanji[(k*7)%16]+STAD.kanji[(k*5+3)%16],0,-u*1.6,u*2.4,'#ffffff',true,.95);ctx.restore()}}
    // steel column with hazard stripes, every other bay
    if(k%2===0){Q(-.03,0,.04,HV,'#0a0816');if(lod>=2)for(let v=0;v<2.6;v+=.65)Q(-.03,v,.04,v+.33,'#e8c53a')}
    // catwalk lip with a light bar
    Q(0,HV-.9,1,HV,'#05040c');Q(.06,HV-.62,.94,HV-.4,'#e8f6ff');if(lod>=2){const lb=pt(.5,HV-.5);ctx.globalAlpha=.7;ctx.drawImage(glowImg(col),lb.x-u*4,lb.y-u*2,u*8,u*4);ctx.globalAlpha=1}
    if(hz>0)Q(0,0,1,HV,'rgba(150,30,190,'+hz+')');
  }
}
function drawBoards(ymin,ymax,part){
  const y0=Math.max(-12,Math.floor(ymin/7)*7);
  if(camMode()==='side'){for(let y=y0,i=0;y<112&&y<ymax;y+=7,i++){const k=((y/7)|0)+20;fence(-6,y,-6,y+7,3.6,k);fence(FW+6,y,FW+6,y+7,3.6,k+1)}}
  else if(part!=='far'){sideBegin();drawWall(true,ymin,ymax);drawWall(false,ymin,ymax);sideEnd()}   // the side walls and billboards are dimmed by half; only the far wall keeps its neon
  const farA=LAND?clamp((46-(WALLY-cam.y))/10,0,1):1;if(part!=='side'&&(LAND?farA>0:(camMode()!=='side'||ymax>110))){   // the far wall is a real object at the end of the stadium; it comes out of the haze as that end gets close (nothing at all 46+ yards away)
    const a=P(-6,WALLY),b=P(FW+6,WALLY),hh=a.u*13,w=b.sx-a.sx,t=performance.now()/1000;   // the steel wall behind the far end zone
    ctx.fillStyle='#120e26';ctx.fillRect(a.sx,a.sy-hh,w,hh);drawBackBrick(a,hh,w);
    ctx.fillStyle='rgba(0,0,0,.3)';for(let yy=a.sy-hh+a.u*1.2;yy<a.sy;yy+=a.u*1.2)ctx.fillRect(a.sx,yy,w,1);
    for(let x=a.sx+a.u*2;x<b.sx;x+=a.u*4.4){ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(x,a.sy-hh,1.5,hh)}
    // conduits and exposed wiring
    ctx.fillStyle='#2a2550';ctx.fillRect(a.sx,a.sy-hh*.96,w,Math.max(2,a.u*.35));ctx.fillRect(a.sx,a.sy-hh*.1,w,Math.max(2,a.u*.35));
    ctx.strokeStyle='#07050f';ctx.lineWidth=Math.max(1.5,a.u*.14);ctx.beginPath();for(let i=0;i<4;i++){const x0=a.sx+w*(.08+i*.26);ctx.moveTo(x0,a.sy-hh*.95);ctx.quadraticCurveTo(x0+w*.1,a.sy-hh*.62,x0+w*.2,a.sy-hh*.93)}ctx.stroke();
    // big screens
    const n=5,seg=w/n;for(let i=0;i<n;i++){const col=BOARDC[(i*2+1)%6],x0=a.sx+seg*(i+.12),sw=seg*.76,y0=a.sy-hh*.84,sh=hh*.5,fl=.78+.12*Math.sin(t*3+i*1.7);
      ctx.fillStyle='#05040c';ctx.fillRect(x0-2,y0-2,sw+4,sh+4);ctx.fillStyle=nrgba(col,.78*fl);ctx.fillRect(x0,y0,sw,sh);
      ctx.fillStyle=scanPat();ctx.fillRect(x0,y0,sw,sh);
      neonText(STAD.kanji[(i*3+4)%16],x0+sw/2,y0+sh/2,Math.max(10,sh*.62),'#ffffff',false,.95)}
    ctx.strokeStyle=STAD.cy;ctx.lineWidth=Math.max(2,a.u*.25);ctx.beginPath();ctx.moveTo(a.sx,a.sy-hh);ctx.lineTo(b.sx,a.sy-hh);ctx.stroke();
    for(let x=-6;x<FW+6;x+=8)fence(x,WALLY-.8,x+8,WALLY-.8,3.6,(x/8|0)+40);
    if(LAND&&farA<1){ctx.fillStyle='rgba(11,9,24,'+(1-farA)+')';ctx.fillRect(a.sx-4,a.sy-a.u*34,w+8,a.u*34+a.u*1.2)}
  }
}
function drawPropsOld(ymin,ymax){
  for(const o of DECO.props){if(o.y<ymin||o.y>ymax)continue;const xx=o.side<0?-3.3:FW+3.3,p=P(xx,o.y),u=p.u*1.6;
    if(o.k==='cone'){ctx.fillStyle='#ff7a1a';ctx.beginPath();ctx.moveTo(p.sx,p.sy-u*.9);ctx.lineTo(p.sx-u*.35,p.sy);ctx.lineTo(p.sx+u*.35,p.sy);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(p.sx-u*.2,p.sy-u*.5,u*.4,u*.12)}
    else if(o.k==='cooler'){ctx.fillStyle='#ff8a1f';ctx.fillRect(p.sx-u*.5,p.sy-u*.8,u,u*.8);ctx.fillStyle='#fff';ctx.fillRect(p.sx-u*.55,p.sy-u*.95,u*1.1,u*.2)}
    else if(o.k==='bench'){ctx.fillStyle='#7a5a3a';ctx.fillRect(p.sx-u*1.1,p.sy-u*.8,u*2.2,u*.25);ctx.fillStyle='#3a2a1a';ctx.fillRect(p.sx-u*1,p.sy-u*.55,u*.2,u*.55);ctx.fillRect(p.sx+u*.8,p.sy-u*.55,u*.2,u*.55)}
    else if(o.k==='tire'){ctx.fillStyle='#1a1a1a';ctx.beginPath();ctx.ellipse(p.sx,p.sy-u*.35,u*.55,u*.4,0,0,7);ctx.fill();ctx.fillStyle='#555';ctx.beginPath();ctx.ellipse(p.sx,p.sy-u*.35,u*.25,u*.18,0,0,7);ctx.fill()}
    else{ctx.strokeStyle='#cfd3d6';ctx.lineWidth=Math.max(1,u*.08);ctx.strokeRect(p.sx-u*.6,p.sy-u*.9,u*1.2,u*.6);ctx.beginPath();ctx.moveTo(p.sx-u*.5,p.sy-u*.3);ctx.lineTo(p.sx-u*.4,p.sy);ctx.moveTo(p.sx+u*.5,p.sy-u*.3);ctx.lineTo(p.sx+u*.4,p.sy);ctx.stroke()}}
  for(const [x,y] of [[0,0],[FW,0],[0,100],[FW,100]]){if(y<ymin-2||y>ymax+2)continue;const p=P(x,y);ctx.fillStyle='#ff7a1a';ctx.fillRect(p.sx-p.u*.2,p.sy-p.u*.9,p.u*.4,p.u*.9);ctx.fillStyle='#fff';ctx.fillRect(p.sx-p.u*.2,p.sy-p.u*.6,p.u*.4,p.u*.14)}
}
const OPPL={key:'',c:null,busy:false};
function oppLogoCanvas(){const c=G&&G.crew;if(!c)return null;const key=c.id+'|'+((G.oppUni||c.uni).jc||'');if(OPPL.key===key)return OPPL.c;
  if(OPPL.busy===key)return null;OPPL.busy=key;
  try{const col=(G.oppUni||c.uni).jc||c.col,svg=logoSVG(crewLogo(c),col,c.town,{shape:'shield'}),im=new Image();
    im.onload=()=>{try{const N=320,pad=36,sz=N-pad*2,cc=document.createElement('canvas');cc.width=cc.height=N;const g=cc.getContext('2d');
      const sil=document.createElement('canvas');sil.width=sil.height=sz;const sg=sil.getContext('2d');sg.drawImage(im,0,0,sz,sz);sg.globalCompositeOperation='source-in';sg.fillStyle='#f4f8ff';sg.fillRect(0,0,sz,sz);
      g.save();g.shadowColor=col;g.shadowBlur=34;g.globalAlpha=.9;g.drawImage(sil,pad-6,pad-6,sz+12,sz+12);g.restore();   // team-colour glow behind
      for(let i=0;i<12;i++){const a=i/12*TAU;g.drawImage(sil,pad+Math.cos(a)*6,pad+Math.sin(a)*6,sz,sz)}   // near-white outline
      g.drawImage(im,pad,pad,sz,sz);OPPL.c=cc;OPPL.key=key}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}};
    im.onerror=()=>{};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg.indexOf('xmlns')<0?svg.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"'):svg)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  return null}

/* ===== SURROUNDINGS pass: cached tiles (drawn once), sideline wall, prop clusters with ground shadows, lamp posts, curb and haze ===== */
const SURR_STEP=()=>window.__step===undefined?9:window.__step;
const S2={tiles:{},pat:{}};
function s2Tile(kind){const crew=G&&G.crew,key=kind+'|'+(crew?crew.id:'');if(S2.tiles[key])return S2.tiles[key];
  const acc=crew?crew.col:'#9b5cff',r=mulberry(({brick:5,tag:8,word:13,crate:2,tag2:21,tag3:34,vent:41,alley:52,sign:63,sign2:64})[kind]||3);let c=document.createElement('canvas'),g;
  if(kind==='chain'){c.width=c.height=24;g=c.getContext('2d');g.strokeStyle='rgba(190,210,230,.55)';g.lineWidth=1.1;g.beginPath();for(let i=-24;i<48;i+=12){g.moveTo(i,0);g.lineTo(i+24,24);g.moveTo(i+24,0);g.lineTo(i,24)}g.stroke()}
  else{c.width=192;c.height=96;g=c.getContext('2d');g.fillStyle='#160d1c';g.fillRect(0,0,192,96);
    for(let y=0,row=0;y<96;y+=12,row++)for(let x=-(row%2)*12;x<192;x+=24){const v=r();g.fillStyle=v<.2?'#3b2543':v<.55?'#2f1d38':'#27172f';g.fillRect(x+1,y+1,22,10);if(r()<.1){g.fillStyle='rgba(255,255,255,.06)';g.fillRect(x+1,y+1,22,2)}}
    g.fillStyle='rgba(0,0,0,.28)';g.fillRect(0,0,192,96*.18);   // darker toward the top: the lamps light the lower wall
    if(kind==='tag'||kind==='word'){const cols=['#27e0ff','#ff2fa8',acc,'#ffe14a'];g.lineCap='round';
      for(let i=0;i<(kind==='tag'?5:3);i++){const col=cols[i%4];g.strokeStyle=col;g.shadowColor=col;g.shadowBlur=7;g.globalAlpha=.8;g.lineWidth=2.5+r()*3;g.beginPath();const x0=10+r()*140,y0=30+r()*50;g.moveTo(x0,y0);g.bezierCurveTo(x0+20+r()*30,y0-30*r(),x0+40+r()*40,y0+25*r(),x0+60+r()*50,y0-10+r()*20);g.stroke()}
      g.globalAlpha=1;g.shadowBlur=0}
    if(kind==='word'){const t=(crew&&(crew.short||crew.town))||'STREET';g.save();g.translate(96,56);g.rotate(-.06);g.font='400 40px "Bowlby One",Impact,sans-serif';{const m=g.measureText(t).width;if(m>150)g.font='400 '+Math.max(14,Math.floor(40*150/m))+'px "Bowlby One",Impact,sans-serif'}g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=7;g.strokeStyle='#0b0612';g.strokeText(t,0,0);g.shadowColor=acc;g.shadowBlur=12;g.fillStyle='#f4eefc';g.fillText(t,0,0);g.restore()}
    if(kind==='crate'){c.width=64;c.height=64;g=c.getContext('2d');g.fillStyle='#b8661f';g.fillRect(0,0,64,64);g.fillStyle='#8c4a12';for(let i=0;i<4;i++)g.fillRect(0,i*16+6,64,3);g.strokeStyle='#5e300a';g.lineWidth=4;g.strokeRect(2,2,60,60);g.beginPath();g.moveTo(4,4);g.lineTo(60,60);g.moveTo(60,4);g.lineTo(4,60);g.stroke()}}
  if(kind==='tag2'){g.save();g.translate(96,54);g.rotate(.05);g.font='400 46px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=8;g.strokeStyle='#0b0612';g.strokeText('ZED',0,0);g.shadowColor='#ff2fa8';g.shadowBlur=10;g.fillStyle='#ff6fd0';g.fillText('ZED',0,0);g.shadowBlur=0;g.lineWidth=2;g.strokeStyle='#fff';g.strokeText('ZED',0,0);g.restore();for(let i=0;i<8;i++){g.fillStyle='rgba(255,111,208,.7)';g.fillRect(52+i*12+r()*4,68,2,5+r()*16)}}
  if(kind==='tag3'){g.lineCap='round';g.lineJoin='round';const cs=['#27e0ff','#ffe14a','#ff2fa8'];for(let i=0;i<3;i++){g.strokeStyle=cs[i];g.shadowColor=cs[i];g.shadowBlur=8;g.lineWidth=3+i;g.globalAlpha=.85;g.beginPath();const x0=14+i*56,y0=22+r()*30;g.moveTo(x0,y0+30);g.lineTo(x0+22,y0);g.lineTo(x0+44,y0+30);g.stroke()}g.globalAlpha=1;g.shadowBlur=0;g.fillStyle='#ffe14a';for(let i=0;i<4;i++){const x=20+r()*150,y=60+r()*28;g.fillRect(x,y,4,4)}}
  if(kind==='vent'){g.fillStyle='#232838';g.fillRect(30,22,132,56);g.strokeStyle='#0a0c14';g.lineWidth=3;g.strokeRect(30,22,132,56);for(let i=0;i<7;i++){g.fillStyle='#10131d';g.fillRect(36,28+i*7,120,3.5);g.fillStyle='rgba(255,255,255,.07)';g.fillRect(36,31.5+i*7,120,1.5)}g.fillStyle='#3a4258';g.fillRect(12,0,8,96);g.fillRect(172,0,8,96);g.fillStyle='rgba(255,140,60,.2)';g.fillRect(44,78,46,12)}
  if(kind==='alley'){g.fillStyle='#05030a';g.beginPath();g.moveTo(54,96);g.lineTo(54,36);g.quadraticCurveTo(96,4,138,36);g.lineTo(138,96);g.fill();const gr=g.createLinearGradient(0,40,0,96);gr.addColorStop(0,'rgba(255,170,70,0)');gr.addColorStop(1,'rgba(255,170,70,.5)');g.fillStyle=gr;g.fillRect(56,40,80,56);g.fillStyle='#0b0814';g.fillRect(70,68,34,28);g.fillStyle='#1a1222';g.fillRect(70,68,34,5);g.strokeStyle='#3a2a1a';g.lineWidth=2;g.beginPath();g.moveTo(118,30);g.lineTo(118,96);g.stroke()}
  if(kind==='sign'||kind==='sign2'){const t=kind==='sign'?'ARCADE':'NOODLES',col=kind==='sign'?'#27e0ff':'#ff2fa8';g.fillStyle='#07050f';g.fillRect(24,26,144,44);g.strokeStyle=col;g.lineWidth=3;g.shadowColor=col;g.shadowBlur=10;g.strokeRect(24,26,144,44);g.font='400 24px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(t,96,49);g.shadowBlur=0}
  S2.tiles[key]=c;return c}
function s2Pat(kind){const t=s2Tile(kind),k=kind+'|'+(G&&G.crew?G.crew.id:'');return S2.pat[k]||(S2.pat[k]=ctx.createPattern(t,'repeat'))}
// one wall segment: tile mapped onto the (a->b) ground edge with height hu pixels
function s2Wall(tile,a,b,hu,alpha){const iw=tile.width,ih=tile.height;ctx.save();ctx.globalAlpha=alpha;ctx.transform((b.sx-a.sx)/iw,(b.sy-a.sy)/iw,0,hu/ih,a.sx,a.sy-hu);ctx.drawImage(tile,0,0);ctx.restore()}
const WSEG=(()=>{const out=[[],[]],ks=['brick','tag','tag2','vent','brick','alley','tag3','sign','brick','sign2'];
  for(let sd=0;sd<2;sd++){const r=mulberry(sd?91:47),words=[10,40,70,100];let y=-24,last='';
    while(y<WFAR+8){let len=r()<.4?6:8,k;if(sd===0&&words.length&&y>=words[0]-4){k='word';len=8;words.shift()}else{do{k=ks[Math.floor(r()*ks.length)]}while(k===last||(k==='alley'&&last==='vent'))}
      last=k;out[sd].push({y,len,k});y+=len}}
  return out})();
function drawSideWall(ymin,ymax){   // a long strip per sideline (about 140 yards, a different thing every few yards); the trapezoid is fixed, only the yard offset scrolls
  if(!LAND||camMode()==='side'||SURR_STEP()<1)return;const WH=9,yEnd=Math.min(ymax,WFAR);
  for(const sd of [0,1]){const x=sd?FW+6.4:-6.4;
    for(const sg of WSEG[sd]){const y=sg.y;if(y+sg.len<ymin||y>=yEnd)continue;const a=P(x,y),b=P(x,y+sg.len);if(Math.abs(b.sx-a.sx)<1)continue;
      const hu=(a.u+b.u)/2*WH;if(sg.k==='word'){s2Wall(s2Tile('brick'),a,b,hu,1);const fd=Math.min(clamp((Math.min(a.sx,b.sx)-10)/70,0,1),clamp((W-10-Math.max(a.sx,b.sx))/70,0,1));if(fd>.01)s2Wall(s2Tile('word'),a,b,hu,fd)}else s2Wall(s2Tile(sg.k),a,b,hu,1);
      ctx.save();ctx.transform((b.sx-a.sx)/24/4,(b.sy-a.sy)/24/4,0,hu/24/4.2,a.sx,a.sy-hu);ctx.globalAlpha=.9;ctx.fillStyle=s2Pat('chain');ctx.fillRect(0,0,96,24);ctx.restore();   // chain-link along the top
      ctx.strokeStyle='rgba(0,0,0,.45)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(a.sx,a.sy-hu);ctx.stroke()}   // post between segments
    const a=P(x,Math.max(ymin,NFAR)),b=P(x,yEnd);ctx.strokeStyle=sd?'rgba(255,47,168,.85)':'rgba(39,224,255,.85)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(a.sx,a.sy-a.u*WH);ctx.lineTo(b.sx,b.sy-b.u*WH);ctx.stroke()}}
function drawBackBrick(a,hh,w){if(SURR_STEP()<1)return;const sc=hh/96;ctx.save();ctx.translate(a.sx,a.sy-hh);ctx.scale(sc,sc);ctx.globalAlpha=.9;ctx.fillStyle=s2Pat('tag');ctx.fillRect(0,0,w/sc,96);ctx.restore()}
// STEP 2: prop clusters, each with a ground shadow
const TOWERS=[16,56,96];
const CLUSTERS=(()=>{const out=[],ks=['crates','bench','fence','cooler','barrels','cones','crates','bench','dumpster'];
  for(const sd of [-1,1]){const r=mulberry(sd<0?5:6);let y=-12+r()*4,last='';while(y<WFAR-3){let k;do{k=ks[Math.floor(r()*ks.length)]}while(k===last);last=k;if(!(sd<0&&TOWERS.some(t=>Math.abs(y-t)<7)))out.push({s:sd,y,k});y+=7+r()*6}}
  for(const t of TOWERS)out.push({s:-1,y:t,k:'tower'});return out})();
function s2Shadow(p,u,wd){ctx.fillStyle='rgba(0,0,0,.5)';ctx.beginPath();ctx.ellipse(p.sx+u*.25,p.sy+u*.04,u*wd,u*.2,0,0,7);ctx.fill()}
function s2Crate(sx,sy,u,col){ctx.fillStyle=col||'#b8661f';ctx.fillRect(sx-u*.5,sy-u*.9,u,u*.9);ctx.fillStyle='rgba(0,0,0,.25)';for(let i=1;i<4;i++)ctx.fillRect(sx-u*.5,sy-u*.9+u*.9*i/4-1,u,2);ctx.strokeStyle='#5e300a';ctx.lineWidth=Math.max(1,u*.06);ctx.strokeRect(sx-u*.5,sy-u*.9,u,u*.9);ctx.fillStyle='rgba(255,220,160,.28)';ctx.fillRect(sx-u*.5,sy-u*.9,u,u*.12)}
function wbox(x0,x1,y0,y1,h,cf,cs,ct){   // a plain box standing on the ground, seen from the camera end: near face, the face toward the field, and the roof
  const A=P(x0,y0),B=P(x1,y0),C=P(x1,y1),D=P(x0,y1),f=(pts,col)=>{ctx.fillStyle=col;ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath();ctx.fill()};
  f([[A.sx,A.sy],[B.sx,B.sy],[B.sx,B.sy-h*B.u],[A.sx,A.sy-h*A.u]],cf);f([[B.sx,B.sy],[C.sx,C.sy],[C.sx,C.sy-h*C.u],[B.sx,B.sy-h*B.u]],cs);f([[A.sx,A.sy-h*A.u],[B.sx,B.sy-h*B.u],[C.sx,C.sy-h*C.u],[D.sx,D.sy-h*D.u]],ct)}
function drawProps(ymin,ymax){
  if(SURR_STEP()<2){return drawPropsOld(ymin,ymax)}
  for(const o of CLUSTERS){if(o.y<ymin||o.y>ymax)continue;const xx=o.s<0?-4.0:FW+4.0,p=P(xx,o.y),u=p.u*1.45;
    if(o.k==='crates'){s2Shadow(p,u,1.15);s2Crate(p.sx-u*.5,p.sy,u,'#b8661f');s2Crate(p.sx+u*.55,p.sy,u,'#a3581a');s2Crate(p.sx+u*.02,p.sy-u*.9,u*.95,'#c4752a');
      ctx.fillStyle='#ff7a1a';ctx.beginPath();ctx.moveTo(p.sx+u*1.35,p.sy-u*.75);ctx.lineTo(p.sx+u*1.1,p.sy);ctx.lineTo(p.sx+u*1.6,p.sy);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(p.sx+u*1.26,p.sy-u*.4,u*.2,u*.1)}
    else if(o.k==='bench'){s2Shadow(p,u,1.5);ctx.fillStyle='#7a5a3a';ctx.fillRect(p.sx-u*1.1,p.sy-u*.8,u*2.2,u*.25);ctx.fillStyle='#8a6a48';ctx.fillRect(p.sx-u*1.1,p.sy-u*1.05,u*2.2,u*.2);ctx.fillStyle='#3a2a1a';ctx.fillRect(p.sx-u*1,p.sy-u*.55,u*.2,u*.55);ctx.fillRect(p.sx+u*.8,p.sy-u*.55,u*.2,u*.55);
      ctx.fillStyle='#ff8a1f';ctx.fillRect(p.sx+u*1.3,p.sy-u*.7,u*.7,u*.7);ctx.fillStyle='#fff';ctx.fillRect(p.sx+u*1.25,p.sy-u*.85,u*.8,u*.16);s2Shadow({sx:p.sx+u*1.6,sy:p.sy},u,.5)}
    else if(o.k==='cooler'){s2Shadow(p,u,1);ctx.fillStyle='#ff8a1f';ctx.fillRect(p.sx-u*.5,p.sy-u*.9,u,u*.9);ctx.fillStyle='#fff';ctx.fillRect(p.sx-u*.55,p.sy-u*1.02,u*1.1,u*.16);ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(p.sx-u*.5,p.sy-u*.5,u,2)}
    else if(o.k==='barrels'){s2Shadow(p,u,1.2);for(const [dx,c] of [[-.5,'#2f6b8a'],[.5,'#b8402a']]){ctx.fillStyle=c;ctx.fillRect(p.sx+u*dx-u*.4,p.sy-u*1.1,u*.8,u*1.1);ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(p.sx+u*dx-u*.4,p.sy-u*.75,u*.8,3);ctx.fillRect(p.sx+u*dx-u*.4,p.sy-u*.35,u*.8,3)}}
    else if(o.k==='cones'){s2Shadow(p,u,1.1);for(const dx of [-.8,0,.8]){ctx.fillStyle='#ff7a1a';ctx.beginPath();ctx.moveTo(p.sx+u*dx,p.sy-u*.8);ctx.lineTo(p.sx+u*(dx-.28),p.sy);ctx.lineTo(p.sx+u*(dx+.28),p.sy);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(p.sx+u*(dx-.14),p.sy-u*.4,u*.28,u*.1)}}
    else if(o.k==='dumpster'){s2Shadow(p,u,1.7);ctx.fillStyle='#1f4a3a';ctx.fillRect(p.sx-u*1.4,p.sy-u*1.1,u*2.8,u*1.1);ctx.fillStyle='#2a6650';ctx.fillRect(p.sx-u*1.5,p.sy-u*1.25,u*3,u*.22);ctx.fillStyle='rgba(0,0,0,.3)';for(let i=1;i<4;i++)ctx.fillRect(p.sx-u*1.4+u*.7*i,p.sy-u*1.1,2,u*1.1)}
    else if(o.k==='tower'){const T=o.y;s2Shadow(P(-4.2,T+2),u*1.1,1.2);wbox(-6,-1.2,T,T+4.5,7,'#232a3c','#2d3650','#3b4764');
      const A=P(-1.2,T),B=P(-1.2,T+4.5);ctx.fillStyle='#0a0c14';for(let i=0;i<3;i++){const f=.2+i*.27,q={sx:A.sx+(B.sx-A.sx)*f,sy:A.sy+(B.sy-A.sy)*f,u:A.u+(B.u-A.u)*f};ctx.beginPath();ctx.ellipse(q.sx,q.sy-q.u*3.6,q.u*.5,q.u*.9,0,0,7);ctx.fill();ctx.strokeStyle='#4a5470';ctx.lineWidth=1;ctx.stroke()}
      const t=P(-3.6,T+2.2);ctx.fillStyle=(Math.floor(performance.now()/700)%2)?'#ff3b5c':'#3a0c18';ctx.fillRect(t.sx-2,t.sy-t.u*7.9,4,4)}
    else{s2Shadow(p,u,1.6);ctx.save();ctx.strokeStyle='#cfd3d6';ctx.lineWidth=Math.max(1,u*.07);for(const dx of [-1.4,-.5,.4,1.3]){ctx.beginPath();ctx.moveTo(p.sx+u*dx,p.sy);ctx.lineTo(p.sx+u*dx,p.sy-u*1.5);ctx.stroke()}
      ctx.beginPath();ctx.moveTo(p.sx-u*1.4,p.sy-u*1.5);ctx.lineTo(p.sx+u*1.3,p.sy-u*1.5);ctx.stroke();ctx.globalAlpha=.55;ctx.lineWidth=Math.max(.8,u*.035);ctx.beginPath();for(let i=-1.4;i<1.3;i+=.3){ctx.moveTo(p.sx+u*i,p.sy-u*1.5);ctx.lineTo(p.sx+u*(i+.45),p.sy);ctx.moveTo(p.sx+u*(i+.45),p.sy-u*1.5);ctx.lineTo(p.sx+u*i,p.sy)}ctx.stroke();ctx.restore()}}
  for(const [x,y] of [[0,0],[FW,0],[0,100],[FW,100]]){if(y<ymin-2||y>ymax+2)continue;const p=P(x,y);s2Shadow(p,p.u*.6,.6);ctx.fillStyle='#ff7a1a';ctx.fillRect(p.sx-p.u*.2,p.sy-p.u*.9,p.u*.4,p.u*.9);ctx.fillStyle='#fff';ctx.fillRect(p.sx-p.u*.2,p.sy-p.u*.6,p.u*.4,p.u*.14)}}
// STEP 3: lamp posts and light rigs. pass 'n' = hardware, pass 'l' = additive glow and cones
const LAMPS=(()=>{const a=[];for(let i=-1;i<=4;i++){const y=8+24*i;a.push(i%2===0?[-7.2,y,'#27e0ff',[CX-10,y]]:[FW+7.2,y,'#ff2fa8',[CX+9,y]])}return a})();   // a light rig every 24 yards, alternating cyan (left) and magenta (right); each one's pool lies on the turf under it
POOLS2=LAMPS.map(l=>[l[3][0],l[3][1],l[0]<0?0:1]);
function drawLamps(ymin,ymax,pass){if(!LAND||camMode()==='side'||SURR_STEP()<3)return;
  for(const [,,col,pool] of LAMPS){const p=P(pool[0],pool[1]);if(pool[1]<ymin-4||pool[1]>ymax+4)continue;const hh=p.u*24,hy=Math.max(p.sy-hh,-6),hx=p.sx;
    if(pass!=='l'){ctx.strokeStyle='rgba(8,6,16,.9)';ctx.lineWidth=Math.max(1,p.u*.1);ctx.beginPath();ctx.moveTo(hx,0);ctx.lineTo(hx,hy);ctx.stroke();ctx.fillStyle='#0c0a16';ctx.fillRect(hx-p.u*.9,hy-p.u*.45,p.u*1.8,p.u*.5);ctx.fillStyle='#fff';ctx.fillRect(hx-p.u*.7,hy+p.u*.02,p.u*1.4,Math.max(2,p.u*.18))}
    if(pass!=='n'){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(0,hy,0,p.sy);g.addColorStop(0,nrgba(col,.20));g.addColorStop(1,nrgba(col,0));ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(hx-p.u*.7,hy);ctx.lineTo(hx+p.u*.7,hy);ctx.lineTo(hx+p.u*9,p.sy);ctx.lineTo(hx-p.u*9,p.sy);ctx.closePath();ctx.fill();
      const rg=ctx.createRadialGradient(hx,hy,0,hx,hy,p.u*3);rg.addColorStop(0,nrgba(col,.8));rg.addColorStop(.3,nrgba(col,.3));rg.addColorStop(1,nrgba(col,0));ctx.fillStyle=rg;ctx.fillRect(hx-p.u*3,hy-p.u*3,p.u*6,p.u*6);ctx.restore()}}
  for(const [x,y,col,pool] of LAMPS){if(y<ymin-6||y>ymax+6)continue;const p=P(x,y),hh=p.u*13,top=p.sy-hh,dir=x<CX?1:-1,hx=p.sx+dir*p.u*1.6;
    if(pass!=='l'){ctx.fillStyle='#0c0a16';ctx.fillRect(p.sx-Math.max(1.5,p.u*.2),top,Math.max(3,p.u*.4),hh);ctx.fillRect(Math.min(p.sx,hx)-1,top-1,Math.abs(hx-p.sx)+2,Math.max(2,p.u*.25));ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(hx,top+1,Math.max(2,p.u*.4),Math.max(1.5,p.u*.22),0,0,7);ctx.fill();s2Shadow(p,p.u*1.2,.5)}
    if(pass!=='n'){const tgt=P(pool[0],pool[1]);ctx.save();ctx.globalCompositeOperation='lighter';
      const g=ctx.createLinearGradient(hx,top,tgt.sx,tgt.sy);g.addColorStop(0,nrgba(col,.16));g.addColorStop(1,nrgba(col,0));ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(hx-p.u*.5,top);ctx.lineTo(hx+p.u*.5,top);ctx.lineTo(tgt.sx+p.u*5,tgt.sy);ctx.lineTo(tgt.sx-p.u*5,tgt.sy);ctx.closePath();ctx.fill();
      const rg=ctx.createRadialGradient(hx,top,0,hx,top,p.u*3.2);rg.addColorStop(0,nrgba(col,.75));rg.addColorStop(.25,nrgba(col,.3));rg.addColorStop(1,nrgba(col,0));ctx.fillStyle=rg;ctx.fillRect(hx-p.u*3.2,top-p.u*3.2,p.u*6.4,p.u*6.4);ctx.restore()}}}
// STEP 4: curb outside each sideline (hardware) and a low haze where the field runs into the far wall (glow)
function drawEdge(ymin,ymax,pass){if(!LAND||camMode()==='side'||SURR_STEP()<4)return;
  const y0=Math.max(ymin,NFAR),y1=Math.min(ymax,WFAR);
  if(pass!=='l'){quad(-1.4,y0,-.05,y1,'#2d3c55');quad(FW+.05,y0,FW+1.4,y1,'#2d3c55');ctx.save();ctx.globalAlpha=.55;quad(-1.4,y0,-1.15,y1,'#9fb4d6');quad(FW+1.15,y0,FW+1.4,y1,'#9fb4d6');ctx.globalAlpha=.7;quad(-.3,y0,-.05,y1,'#c8d6ee');quad(FW+.05,y0,FW+.3,y1,'#c8d6ee');ctx.restore()}
  if(pass!=='n'){const h0=horY(),hg=ctx.createLinearGradient(0,h0-H*.045,0,h0+H*.075);hg.addColorStop(0,'rgba(140,90,255,0)');hg.addColorStop(.5,cz('rgba(150,100,255,.26)','rgba(160,215,230,.2)'));hg.addColorStop(1,'rgba(140,90,255,0)');ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle=hg;ctx.fillRect(0,h0-H*.045,W,H*.12);ctx.restore()}}
/* ===== SCREEN-FIXED SHELL: everything outside the playing surface is drawn ONCE, with a frozen camera, into cached canvases and simply blitted every frame ===== */
const SH={key:'',back:null,fn:null,fl:null,ref:{y:18}};
function drawShadowShell(ymax){   // the shadow cast by the left wall: a hard-edged strip along the left side that widens toward the far end (about 35% of the field), with a thin cool rim on its slanted edge
  const pts=[[0,-6],[6,-6],[31,ymax],[0,ymax]];poly(pts,'rgba(2,4,14,.52)');
  ctx.save();ctx.strokeStyle='rgba(150,205,255,.5)';ctx.lineWidth=1.6;ctx.beginPath();const p=P(pts[1][0],pts[1][1]),q=P(pts[2][0],pts[2][1]);ctx.moveTo(p.sx,p.sy);ctx.lineTo(q.sx,q.sy);ctx.stroke();ctx.restore()}

/* ===== PERF LOG: while ON the game times every frame (and what each part of it cost), keeps the slow ones, and builds a plain-text report that can be copied out of the phone ===== */
const XLOG=window.XLOG={star:[],pile:[],opp:[],drives:[],games:[],fourth:[],lines:[]};
const glog=t=>{XLOG.lines.push(t);if(XLOG.lines.length>400)XLOG.lines.shift()};
const cn=k=>{if(F&&F.cn)F.cn[k]=(F.cn[k]||0)+1};
const gs=()=>G?(G.you+'-'+G.opp):'';
function reportExtra(ln){
  const pl=PLOG.filter(p=>p.car!==undefined),avg=a=>a.length?(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1):'-',pc=(a,f)=>a.length?Math.round(100*a.filter(f).length/a.length)+'%':'-';
  const med=a=>a.length?a.slice().sort((x,y)=>x-y)[a.length>>1]:'-';
  const bk=g=>g<=0?'<=0':g<=2?'1-2':g<=5?'3-5':g<=9?'6-9':g<=14?'10-14':g<=29?'15-29':'30+';
  const run=pl.filter(p=>p.id==='run_in'||p.id==='run_out');
  if(run.length){ln.push('RUNNING DETAIL (run plays: '+run.length+')');
    for(const id of ['run_in','run_out']){const r=run.filter(p=>p.id===id);if(!r.length)continue;const g=r.map(p=>p.gain),B={};for(const x of g)B[bk(x)]=(B[bk(x)]||0)+1;
      ln.push('  '+id+' '+r.length+' plays avg '+avg(g)+' med '+med(g)+' | buckets '+['<=0','1-2','3-5','6-9','10-14','15-29','30+'].map(k=>k+':'+(B[k]||0)).join(' '));
      const dc={};for(const p of r){const b=dc[p.call]||(dc[p.call]=[]);b.push(p.gain)}ln.push('    by defense call: '+Object.keys(dc).map(k=>k+' '+dc[k].length+'x avg '+avg(dc[k])+' med '+med(dc[k])).join(' | '))}
    const mv=run.filter(p=>p.juke+p.stiff>0),nm=run.filter(p=>p.juke+p.stiff===0);
    ln.push('  with juke/stiff move '+mv.length+' plays avg '+avg(mv.map(p=>p.gain))+' | no move '+nm.length+' plays avg '+avg(nm.map(p=>p.gain)));
    ln.push('  per run play: juke '+avg(run.map(p=>p.juke))+', stiff '+avg(run.map(p=>p.stiff))+', style '+avg(run.map(p=>p.style))+', auto broken tackles '+avg(run.map(p=>p.brk))+', powered through '+avg(run.map(p=>p.pow))+', turbo used avg '+avg(run.map(p=>p.turboUsed))+'%');
    const bw={},tk={};for(const p of run){for(const k in p.cn){bw[k]=(bw[k]||0)+p.cn[k]}if(p.by){const b=tk[p.by]||(tk[p.by]={n:0,d:[]});b.n++;b.d.push(p.dep)}}
    ln.push('  blocks (win=pancake/shed): '+['OL','TE','WR','RB'].map(g=>g+' won '+(bw['bw'+g]||0)+' shed '+(bw['bs'+g]||0)).join(' | ')+'  | sheds by '+['DL','LB','DB'].map(k=>k+' '+(bw['sh_'+k]||0)).join(' '));
    ln.push('  tackled by: '+Object.keys(tk).map(k=>k+' '+tk[k].n+' (avg depth '+avg(tk[k].d)+')').join(' | '));
    const lat=run.filter(p=>p.id==='run_out'),ld=run.filter(p=>p.id==='run_in');
    ln.push('  stuffed (<=0): '+pc(run,p=>p.gain<=0)+' | 10+: '+pc(run,p=>p.gain>=10)+' | 15+: '+pc(run,p=>p.gain>=15)+' | 30+: '+pc(run,p=>p.gain>=30))}
  const pa=pl.filter(p=>p.tgt);
  if(pa.length){ln.push('PASSING DETAIL (throws: '+pa.length+')');
    ln.push('  completions '+pa.filter(p=>p.comp).length+'/'+pa.length+', ints '+pa.filter(p=>p.type==='int').length+', avg yds on completions '+avg(pa.filter(p=>p.comp).map(p=>p.gain)));
    for(const id of ['short','deep','screen','flea']){const r=pa.filter(p=>p.id===id);if(r.length)ln.push('  '+id+' '+r.length+' throws, comp '+r.filter(p=>p.comp).length+', avg gain '+avg(r.map(p=>p.gain)))}
    const tg={};for(const p of pa){const b=tg[p.tgt]||(tg[p.tgt]={n:0,c:0,y:0});b.n++;if(p.comp){b.c++;b.y+=p.gain}}ln.push('  targets: '+Object.keys(tg).map(k=>k+' '+tg[k].c+'/'+tg[k].n+' '+tg[k].y+'y').join(' | '));
    ln.push('  sacks '+pl.filter(p=>p.sack).length+', pass plays total '+pl.filter(p=>p.id!=='run_in'&&p.id!=='run_out').length)}
  const sp=XLOG.star;
  ln.push('STAR PLAY (events: '+sp.length+')');
  const E=k=>sp.filter(e=>e.k===k);
  ln.push('  earned '+E('ready').length+', activated '+E('use').length+' (run '+E('use').filter(e=>e.kind==='run').length+', catch '+E('use').filter(e=>e.kind==='catch').length+'), expired unused '+E('lost').length+', armed but star never got it '+E('wasted').length+', explosive plays credited '+E('exp').length);
  const sp2=PLOG.filter(p=>p.sp);ln.push('  star play results: '+(sp2.length?sp2.map(p=>p.sp+' '+p.gain+'y'+(p.type==='td'?' TD':'')+' ('+p.cname+')').join(', '):'none')+'; avg '+avg(sp2.map(p=>p.gain)));
  const plain=pl.filter(p=>!p.sp&&p.star&&(p.id==='run_in'||p.id==='run_out'));ln.push('  star ball carriers without star play: '+plain.length+' runs avg '+avg(plain.map(p=>p.gain))+' | 15+ plays by stars: '+pl.filter(p=>p.star&&p.gain>=15).length+' of '+pl.filter(p=>p.star).length);
  ln.push('  timeline: '+(sp.length?sp.map(e=>e.k+(e.nm?'('+e.nm+')':'')+(e.kind?'/'+e.kind:'')+'@p'+e.p).join(' '):'none'));
  const pi=XLOG.pile;
  ln.push('FUMBLE PILE-UPS: '+pi.length+(pi.length?' | held on '+pi.filter(e=>e.won).length+', lost '+pi.filter(e=>!e.won).length+' | taps avg '+avg(pi.map(e=>e.taps))+' ('+avg(pi.map(e=>e.rate))+'/s) | '+pi.map(e=>(e.won?'W':'L')+e.taps).join(' '):''));
  const op=XLOG.opp;
  ln.push('THEIR DRIVES (defense): '+op.length+(op.length?' | TD '+op.filter(e=>e.res==='td').length+', FG '+op.filter(e=>e.res==='fg').length+', empty '+op.filter(e=>e.res==='stop').length+', turnovers forced '+op.filter(e=>e.res==='turnover').length+' | zone triggered '+op.filter(e=>e.zone).length:''));
  for(const e of op.slice(-12))ln.push('  '+e.res+' ['+(e.call||'-')+'] ('+e.plays+' plays, start '+e.fp+', rating gap '+(e.m!==undefined?e.m:'-')+')'+(e.zone?' ZONE '+e.zone+' '+e.zoneTk+'tk':'')+(e.res==='turnover'?' '+e.kind:'')+' | tackle leaders '+e.lead);
  const dv=XLOG.drives;ln.push('YOUR DRIVES: '+dv.length+(dv.length?' | '+dv.map(d=>d.res+' '+d.plays+'p/'+d.yds+'y').join(', '):''));
  if(XLOG.fourth.length)ln.push('4TH DOWN DECISIONS: '+XLOG.fourth.map(f=>f.a+' (4th&'+f.togo+' @'+f.los+')').join(', '));
  if(XLOG.games.length)ln.push('GAMES: '+XLOG.games.map(g=>g.res+' '+g.score+' ('+g.plays+' plays, '+g.secs+'s)').join(' | '));
  ln.push('PLAY-BY-PLAY / EVENT LOG (oldest first, last '+Math.min(160,XLOG.lines.length)+' of '+XLOG.lines.length+')');for(const t of XLOG.lines.slice(-160))ln.push('  '+t)}
const PLOG=window.PLOG=[];const TM=window.TM=[];const tmark=(n,x)=>{if(window.PL&&PL.on)TM.push({n,t:Math.round(performance.now()),x:x||''})};
const PL=window.PL=(()=>{
  const SUB={bkFar:1,bkNear:1},SLOWMS=22;
  const o={on:false,cur:{},ev:[],mark:0,last:null,reset(){o.t0=0;o.n=0;o.sum=0;o.b22=0;o.b33=0;o.b50=0;o.mx=0;o.all={};o.slowAll={};o.slow=[];o.nSlow=0;o.sit={};o.sitSlow={};o.evAll={};o.evSlow={};o.long=0;o.lateMax=0;o.slowLate=0;o.slowFree=0;if(window.__LC)window.__LC.length=0},
    set(v){o.on=v;if(v)o.reset();lateTimer(v)},
    add(k,ms){o.cur[k]=(o.cur[k]||0)+ms},
    endFrame(total){if(!o.on)return;o.last={jt:(ART.jt||[]).filter(a=>a[1]>3).map(a=>a[0]+' '+Math.round(a[1])+'ms').join(','),total,parts:o.cur,ev:o.ev,mode:(G?G.mode:'-')+'/'+(F?F.mode:'-'),cx:cam.x,cy:cam.y,cz:cam.zoom,ez:(G&&F?(F.carrier?F.carrier.y:0):0)};o.cur={};o.ev=[]},
    frame(raw,now){if(!o.on)return;if(!o.t0)o.t0=now;if(raw>2000){o.long++;return}
      o.n++;o.sum+=raw;if(raw>o.mx)o.mx=raw;if(raw>SLOWMS)o.b22++;if(raw>33)o.b33++;if(raw>50)o.b50++;
      const late=o.lateMax;o.lateMax=0;const L=o.last;if(!L)return;L.late=late;const slow=raw>SLOWMS,zone=L.cy<33?'own third':L.cy<66?'middle third':'far third',sit=L.mode+' | '+zone;
      for(const k in L.parts){o.all[k]=(o.all[k]||0)+L.parts[k];if(slow)o.slowAll[k]=(o.slowAll[k]||0)+L.parts[k]}
      o.all.total=(o.all.total||0)+L.total;if(slow)o.slowAll.total=(o.slowAll.total||0)+L.total;
      o.sit[sit]=(o.sit[sit]||0)+1;if(slow)o.sitSlow[sit]=(o.sitSlow[sit]||0)+1;
      for(const e of L.ev){o.evAll[e]=(o.evAll[e]||0)+1;if(slow)o.evSlow[e]=(o.evSlow[e]||0)+1}
      if(slow){o.nSlow++;if(late>30)o.slowLate++;else o.slowFree++;const r={t:(now-o.t0)/1000,raw,L};if(o.slow.length<600)o.slow.push(r);else{let mi=0;for(let i=1;i<o.slow.length;i++)if(o.slow[i].raw<o.slow[mi].raw)mi=i;if(raw>o.slow[mi].raw)o.slow[mi]=r}}},
    report(){if(!o.n)return 'No frames recorded yet. Turn PERF LOG on, play a drive, then open this again.';
      const f=n=>n.toFixed(1),p=(n,d)=>d?Math.round(100*n/d)+'%':'-',dur=(o.sum/1000),A=o.all,S=o.slowAll,n=o.n,ns=o.nSlow||1;
      const ln=[];ln.push('CIRCUIT FOOTBALL PERF REPORT');ln.push(String(BUILD));
      ln.push('screen '+Math.round(W)+'x'+Math.round(H)+' css, canvas '+cv.width+'x'+cv.height+', dpr '+(cv.width/W).toFixed(1)+', level '+(window.__perfLvl||0));
      ln.push('UA '+(navigator.userAgent||'').replace(/Mozilla\/5.0 /,'').slice(0,110));
      ln.push('recorded '+f(dur)+' s, '+n+' frames, avg '+f(1000*n/o.sum)+' fps, longest frame '+Math.round(o.mx)+' ms, gaps over 2 s ignored '+o.long);
      ln.push('slow frames: >22ms '+o.b22+' ('+p(o.b22,n)+'), >33ms '+o.b33+' ('+p(o.b33,n)+'), >50ms '+o.b50+' ('+p(o.b50,n)+')');
      ln.push('');ln.push('WHERE THE TIME GOES (ms per frame, all frames vs slow frames)');
      const keys=Object.keys(A).filter(k=>k!=='total').sort((a,b)=>A[b]-A[a]);
      ln.push('  total work   '+f(A.total/n)+'  vs  '+f((S.total||0)/ns));
      for(const k of keys)ln.push('  '+(k+(SUB[k]?' (inside field)':'')).padEnd(22)+f(A[k]/n)+'  vs  '+f((S[k]||0)/ns));
      ln.push('  (total work minus the listed parts = game logic, sounds, scoreboard)');
      ln.push('');ln.push('IS THE GAME BLOCKED OR IS THE PHONE BUSY ELSEWHERE? (slow frames where a 25 ms timer ran 30+ ms late = something held up the game thread; the rest = the game thread was free)');ln.push('  game thread held up '+o.slowLate+'   free '+o.slowFree+'    lite effects '+(document.body.classList.contains('lite')?'ON':'OFF'));
      ln.push('');ln.push('WHEN IT HAPPENS (slow frames / all frames in that situation)');
      for(const k of Object.keys(o.sit).sort((a,b)=>(o.sitSlow[b]||0)-(o.sitSlow[a]||0)).slice(0,8))ln.push('  '+k.padEnd(28)+(o.sitSlow[k]||0)+' / '+o.sit[k]);
      ln.push('');ln.push('BACKDROP REBUILDS (frames that started one: in slow frames / in all frames)');
      for(const k of Object.keys(o.evAll))ln.push('  '+k+'  '+(o.evSlow[k]||0)+' / '+o.evAll[k]);
      ln.push('');ln.push('LONG CALLBACKS (timers and touch handlers that ran 25+ ms, outside drawing; empty = the long stalls come from somewhere other than the game code)');
      {const lc=(window.__LC||[]).slice().sort((a,b)=>b[1]-a[1]).slice(0,12);if(!lc.length)ln.push('  none');for(const c of lc)ln.push('  '+((c[0]-o.t0)/1000).toFixed(1)+'s  '+Math.round(c[1])+'ms  '+c[2]+'  '+c[3])}
      ln.push('');ln.push('WORST FRAMES (time into recording, frame ms, work ms, biggest parts, state, camera y, events)');
      const w=o.slow.slice().sort((a,b)=>b.raw-a.raw).slice(0,15);
      for(const r of w){const L=r.L,top=Object.keys(L.parts).filter(k=>!SUB[k]).sort((a,b)=>L.parts[b]-L.parts[a]).slice(0,3).map(k=>k+' '+f(L.parts[k])).join(', ');
        ln.push('  '+f(r.t)+'s  '+Math.round(r.raw)+'ms  work '+f(L.total)+'  ['+top+']  '+L.mode+'  y '+f(L.cy)+'  late '+Math.round(L.late||0)+'  '+(L.ev.join(',')||'-')+(L.jt?'  jobs '+L.jt:''))}
      if(PLOG.length){ln.push('PLAY RESULTS (real plays this session: yards, outcomes; STAR PLAY plays listed separately: '+PLOG.filter(p=>p.gb).length+' of '+PLOG.length+')');const by={};for(const p of PLOG.filter(p=>!p.gb)){const b=by[p.id]||(by[p.id]={n:0,y:0,td:0,int:0,inc:0,sack:0,fum:0,t:0});b.n++;b.y+=p.gain;(b.g||(b.g=[])).push(p.gain);b.t+=p.t;if(p.type==='td')b.td++;if(p.type==='int')b.int++;if(p.type==='inc')b.inc++;if(p.sack)b.sack++;if(p.type==='fumble')b.fum++}for(const k in by){const b=by[k];ln.push('  '+k+': '+b.n+' plays, avg '+(b.y/b.n).toFixed(1)+' yds, td '+b.td+', inc '+b.inc+', int '+b.int+', sack '+b.sack+', fum '+b.fum+', avg '+(b.t/b.n).toFixed(1)+'s'+(b.n>=3?', median '+(b.g.slice().sort((x,y)=>x-y)[b.g.length>>1])+', 2 or less '+Math.round(100*b.g.filter(x=>x<=2).length/b.n)+'%, 10+ '+Math.round(100*b.g.filter(x=>x>=10).length/b.n)+'%':''))}const cl={};for(const p of PLOG.filter(p=>!p.gb)){const k=p.id+'/'+p.call;const b=cl[k]||(cl[k]={n:0,y:0});b.n++;b.y+=p.gain}ln.push('  defense adapted to your play-calling on '+PLOG.filter(p=>p.ad).length+' of '+PLOG.length+' plays');ln.push('  by call: '+Object.keys(cl).map(k=>k+' '+cl[k].n+'x '+(cl[k].y/cl[k].n).toFixed(1)).join(', '))}
        reportExtra(ln);
      if(TM.length){ln.push('TIMING EVENTS (ms since first):');const t0=TM[0].t;for(const e of TM.slice(-40))ln.push('  +'+(e.t-t0)+'  '+e.n+(e.x?'  '+e.x:''))}
      return ln.join('\n')},
    show(){let d=document.getElementById('plO');if(!d){d=document.createElement('div');d.id='plO';d.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(8,6,18,.96);display:flex;flex-direction:column;padding:10px;gap:8px';
        d.innerHTML='<textarea id="plT" readonly style="flex:1;width:100%;background:#0b0918;color:#cfe;border:1px solid #27e0ff;border-radius:8px;font:11px/1.35 ui-monospace,Menlo,monospace;padding:8px;resize:none"></textarea><div style="display:flex;gap:8px"><button class="btn" id="plC" style="flex:1">COPY</button><button class="btn" id="plR" style="flex:1">CLEAR DATA</button><button class="btn" id="plX" style="flex:1">CLOSE</button></div>';document.body.appendChild(d);
        const t=d.querySelector('#plT');
        d.querySelector('#plC').onclick=()=>{const txt=t.value,b=d.querySelector('#plC');const ok=()=>{b.textContent='COPIED';setTimeout(()=>b.textContent='COPY',1500)};
          const fb=()=>{try{t.focus();t.select();t.setSelectionRange(0,txt.length);if(document.execCommand('copy'))ok();else b.textContent='PRESS AND HOLD TEXT TO COPY'}catch(e){b.textContent='PRESS AND HOLD TEXT TO COPY'}};
          try{navigator.clipboard.writeText(txt).then(ok,fb)}catch(e){fb()}};
        d.querySelector('#plR').onclick=()=>{o.reset();t.value=o.report()};
        d.querySelector('#plX').onclick=()=>{d.style.display='none'}}
      d.style.display='flex';d.querySelector('#plT').value=o.report()}};
  o.reset();let tl=performance.now(),lt=0;   // v2.93b: the 25 ms lateness timer runs only while PERF LOG is on (it ran 40 times a second always)
  function lateTimer(on){clearInterval(lt);lt=0;if(on){tl=performance.now();lt=setInterval(()=>{const n=performance.now(),l=n-tl-25;tl=n;if(o.on&&l>o.lateMax)o.lateMax=l},25)}}
  lateTimer(o.on);return o})();
const BK={cur:null,back:null,job:null,key:''},BKF={cur:null,back:null,job:null,key:''};   // two cached layers, each slid by the exact remainder around ITS OWN depth: NEAR (side buildings + side walls, anchored 30 yd ahead of the camera) and FAR (the buildings and screens behind the end zone, anchored at the far wall). One anchor for both made the far objects creep by a few pixels between rebuilds and snap back, which showed as jitter once the skyline was on screen.
function bkCanvas(){const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;return{c,g:c.getContext('2d'),ax:0,ay:0,as:1,cx:0,cy:0,cz:1,cb:0,valid:false}}
const farA0=()=>[P(CX,WFAR+6),P(CX,WFAR+7)],nearA0=()=>[P(CX,cam.y+30),P(CX,cam.y+31)];
function bkSlice(B,phase,L){   // one third of a rebuild, drawn with the camera the build started with (so the frame that triggers it stays cheap)
  const g=B.g,svc=ctx,sv={x:cam.x,y:cam.y,z:cam.zoom,b:CAMB,r:CAMR},far=L==='f';ctx=g;cam.x=B.cx;cam.y=B.cy;cam.zoom=B.cz;CAMB=B.cb;CAMR=B.cr||0;applyCam();
  try{
    if(phase===0){g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,B.c.width,B.c.height);g.setTransform(cv.width/W,0,0,cv.height/H,0,0);g.imageSmoothingEnabled=false;const [a0,a1]=far?farA0():nearA0();B.ax=a0.sx;B.ay=a0.sy;B.as=Math.abs(a1.sy-a0.sy);if(RT()){if(far)routeEnd()}else drawSurround(far?'E':'S')}
    else if(phase===1){if(!far&&!RT()){drawWall(true,cam.y-22,WFAR+1);drawWall(false,cam.y-22,WFAR+1)}}
    else{g.save();g.setTransform(1,0,0,1,0,0);if(!window.__noDim){g.globalCompositeOperation='source-atop';g.fillStyle=RT2()?'rgba(0,0,0,.25)':'rgba(0,0,0,.6)';g.fillRect(0,0,B.c.width,B.c.height)}g.restore();if(far&&!RT()){drawHolos();drawBoards(cam.y-22,WFAR+1,'far')}}
  }finally{ctx=svc;cam.x=sv.x;cam.y=sv.y;cam.zoom=sv.z;CAMB=sv.b;CAMR=sv.r;applyCam()}}
function bkLayer(L,S,ty,tx,tz){
  const key=W+'x'+H+'|'+cv.width+'|'+(G&&G.crew?G.crew.id:'');
  if(S.key!==key||!S.cur||S.cur.c.width!==cv.width||S.cur.c.height!==cv.height){S.key=key;S.cur=bkCanvas();S.back=bkCanvas();S.job=null;const B=S.cur;B.cx=cam.x;B.cy=cam.y;B.cz=cam.zoom;B.cb=CAMB;B.cr=CAMR;for(let ph=0;ph<3;ph++)bkSlice(B,ph,L);B.valid=true}
  const C=S.cur;
  if(!S.job&&(Math.abs(cam.y-C.cy)>ty||Math.abs(cam.x-C.cx)>tx||Math.abs(cam.zoom-C.cz)>tz||Math.abs(CAMB-C.cb)>.02||Math.abs(CAMR-(C.cr||0))>.02)){const B=S.back;B.cx=cam.x;B.cy=cam.y;B.cz=cam.zoom;B.cb=CAMB;B.cr=CAMR;S.job={B,ph:0};if(PL.on)PL.ev.push(L==='f'?'rebuildFar':'rebuildNear')}
  if(S.job){const j=S.job;bkSlice(j.B,j.ph++,L);window.__bkb=(window.__bkb||0)+(j.ph===1?1:0);if(j.ph>=3){j.B.valid=true;S.back=S.cur;S.cur=j.B;S.job=null}}
  const D=S.cur,[c0,c1]=L==='f'?farA0():nearA0(),k=Math.abs(c1.sy-c0.sy)/(D.as||1);
  ctx.save();ctx.translate(c0.sx,c0.sy);ctx.scale(k,k);ctx.translate(-D.ax,-D.ay);ctx.scale(W/D.c.width,H/D.c.height);ctx.drawImage(D.c,0,0);ctx.restore()}
function drawBackCached(){   // the heavy far layers use the SAME camera as the field; cached, rebuilt in three slices (a one-frame rebuild made every 4th frame late), slid and scaled by the exact remainder every frame
  const t0=performance.now();
  if(window.__nocache){refPass(()=>{sideBegin();drawSurround();sideEnd();drawHolos();drawBoards(cam.y-22,WFAR+1)});return}
  {const a=PL.on?performance.now():0;bkLayer('f',BKF,.5,.5,.012);if(PL.on){const b=performance.now();PL.add('bkFar',b-a);bkLayer('n',BK,.3,.4,.008);PL.add('bkNear',performance.now()-b)}else bkLayer('n',BK,.3,.4,.008)}
  if(window.__bkprof)(window.__bkms=window.__bkms||[]).push(performance.now()-t0);
}
function drawShadowTowers(ymin,ymax){   // each tower on the left sideline casts a hard-edged shadow over the left of the field; it starts at the tower and scrolls with it
  if(camMode()==='side')return;
  for(const T of TOWERS){const ya=Math.max(T,ymin),yb=Math.min(T+34,ymax);if(yb<=ya)continue;const xa=5+22*(ya-T)/34,xb=5+22*(yb-T)/34;
    poly([[0,ya],[xa,ya],[xb,yb],[0,yb]],'rgba(2,4,14,.52)');ctx.save();ctx.strokeStyle='rgba(150,205,255,.5)';ctx.lineWidth=1.6;ctx.beginPath();const p=P(xa,ya),q=P(xb,yb);ctx.moveTo(p.sx,p.sy);ctx.lineTo(q.sx,q.sy);ctx.stroke();ctx.restore()}}
function drawAprons(){   // beyond each end zone: a few yards of bare concrete (a different surface from the turf), then the wall
  const ymin=cam.y-22;
  for(const [a,b] of [[110,WFAR],[NFAR,-10]]){if(b<ymin||a>cam.y+130)continue;
    quad(-8,a,FW+8,b,RT2()?SHIPCFG.gutter:cz('#4b566f','#4a4946'));ctx.save();ctx.globalAlpha=.5;for(let y=a+3;y<b;y+=3)quad(-8,y,FW+8,y+.12,'#0b0e18');for(let x=-8+6.7;x<FW+8;x+=6.7)quad(x,a,x+.12,b,'#0b0e18');ctx.restore();
    ctx.save();ctx.globalAlpha=.6;quad(-8,a<b?(a===110?110:b-.3):a,FW+8,a<b?(a===110?110.35:b):a+.3,'#c9d6ea');ctx.restore()}}
let SKY=null,SKYk='';
function skyFixed(){   // a distant skyline: fixed to the screen, nothing on it belongs to the stadium
  const hh=Math.round(H*.34),k=W+'x'+H+'|'+cv.width,yo=horY()-hh;   // v3.09: the skyline sits on the horizon (with the low runner camera it is well down the screen)
  if(SKYk!==k){SKYk=k;const sc=cv.width/W,c=document.createElement('canvas');c.width=Math.round(W*sc);c.height=Math.round(hh*sc);const g=c.getContext('2d');g.scale(sc,sc);const r=mulberry(7),WC=['#27e0ff','#ff2fa8','#b58cff','#ffe0a0'];
    const gr=g.createLinearGradient(0,0,0,hh);gr.addColorStop(0,'#04030c');gr.addColorStop(.55,'#140a30');gr.addColorStop(1,'#3a1458');g.fillStyle=gr;g.fillRect(0,0,W,hh);
    for(const [col,h0,h1,lit] of [['#3a2a85',.45,1,.26],['#2a1d66',.25,.7,.32]]){for(let x=-10;x<W;){const bw=14+r()*26,bh=hh*(h0+r()*(h1-h0));g.fillStyle=col;g.fillRect(x,hh-bh,bw,bh+2);if(bh>hh*.8){g.fillStyle='#ff3b6b';g.globalAlpha=.9;g.fillRect(x+bw/2-1,hh-bh-4,2,4);g.globalAlpha=1}for(let wy=hh-bh+4;wy<hh-6;wy+=6)for(let wx=x+3;wx<x+bw-3;wx+=5)if(r()<lit){g.fillStyle=WC[(r()*4)|0];g.globalAlpha=.5+r()*.4;g.fillRect(wx,wy,2,3);g.globalAlpha=1}x+=bw+r()*3}}
    const hz=g.createLinearGradient(0,hh*.55,0,hh);hz.addColorStop(0,'rgba(150,100,255,0)');hz.addColorStop(1,'rgba(150,100,255,.18)');g.fillStyle=hz;g.fillRect(0,hh*.55,W,hh*.45);SKY=c}
  if(yo>0){ctx.fillStyle='#04030c';ctx.fillRect(0,0,W,yo+1)}ctx.drawImage(SKY,0,yo,W,hh)}
function shellBuild(){
  const sv={x:cam.x,y:cam.y,zoom:cam.zoom},svB=CAMB,svCtx=ctx,svW=WALLY;
  cam.x=CX;cam.y=SH.ref.y;cam.zoom=1;CAMB=0;const svR=CAMR;CAMR=0;applyCam();
  const mk=()=>{const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const g=c.getContext('2d');g.setTransform(cv.width/W,0,0,cv.height/H,0,0);g.imageSmoothingEnabled=false;return{c,g}};
  const B=mk(),N=mk(),Lh=mk();
  try{
    const ymin=cam.y-22,kk=H*MY*D2*cam.zoom,sH=(horY()+3-(H*FOCF-kk))/kk;let ymax=Math.min(cam.y+110,sH>.02?cam.y+D2*(1/sH-1):cam.y+110);const sW=(CAMCFGL.wallRow*H-(H*FOCF-kk))/kk;WALLY=cam.y+D2*(1/sW-1);ymax=Math.min(ymax,WALLY);
    ctx=B.g;drawBackdrop();quad(-400,108,FW+400,900,'#0b0918');quad(-24,110,FW+24,Math.max(126,WALLY+2),'#1c1736');sideBegin();drawSurround();sideEnd();drawHolos();drawBoards(ymin,ymax);
    ctx=N.g;drawShadowShell(ymax);drawEdge(ymin,ymax,'n');drawSideWall(ymin,ymax);drawProps(ymin,ymax);drawLamps(ymin,ymax,'n');
    ctx=Lh.g;drawLightPools(ymin,ymax);drawLamps(ymin,ymax,'l');drawEdge(ymin,ymax,'l')
  }finally{ctx=svCtx;cam.x=sv.x;cam.y=sv.y;cam.zoom=sv.zoom;CAMB=svB;CAMR=svR;WALLY=svW;applyCam();if(sideRegion.k)sideRegion.k=null}
  SH.back=B.c;SH.fn=N.c;SH.fl=Lh.c;window.__shell=SH}
function shellEnsure(){if(!LAND||camMode()==='side'||window.__noshell)return false;const key=W+'x'+H+'|'+cv.width+'|'+(G&&G.crew?G.crew.id:'');if(SH.key!==key||!SH.back){SH.key=key;shellBuild()}return true}

/* ===== PAINTED END-ZONE LOGOS: each end zone carries its team's logo, painted flat on the turf (same projection as the field), one cached image per logo ===== */
const EZL={};
function ezLogo(key,svg,col){const e=EZL[key];if(e)return e.c;EZL[key]={c:null};
  try{const im=new Image();im.onload=()=>{try{const N=300,pad=30,sz=N-pad*2,cc=document.createElement('canvas');cc.width=cc.height=N;const g=cc.getContext('2d');
      const sil=document.createElement('canvas');sil.width=sil.height=sz;const sg=sil.getContext('2d');sg.drawImage(im,0,0,sz,sz);sg.globalCompositeOperation='source-in';sg.fillStyle='#f4f8ff';sg.fillRect(0,0,sz,sz);
      for(let i=0;i<12;i++){const a=i/12*TAU;g.drawImage(sil,pad+Math.cos(a)*7,pad+Math.sin(a)*7,sz,sz)}   // painted white keyline
      g.drawImage(im,pad,pad,sz,sz);EZL[key].c=cc}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}};im.onerror=()=>{};
    im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg.indexOf('xmlns')<0?svg.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"'):svg)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  return null}
const EZW={};
function ezWord(text,bg,cands,fillOv){const fk=document.fonts&&document.fonts.check?document.fonts.check('120px "Bowlby One"'):1,key=text+'|'+bg+'|'+fk+'|'+(fillOv||'');const hit=EZW[key];if(hit&&(fk||performance.now()-hit._t<3000))return hit;
  const bl=lumaOf(bg);const fill=fillOv||(bl<.5?shade(bg,.5):shade(bg,-.35));   // tone-on-tone: a lighter (or darker) tint of the end-zone color, like paint
  const cw=1400,ch=400,cv=document.createElement('canvas');cv.width=cw;cv.height=ch;const g=cv.getContext('2d');
  const fs=420;g.font='400 '+fs+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='alphabetic';let w=g.measureText(text).width;const sx=Math.min(1.25,1240/w);
  g.save();g.translate(cw/2,338);g.scale(sx,1);g.lineJoin='round';
  g.strokeStyle=bl<.5?'rgba(255,255,255,.55)':'rgba(255,255,255,.7)';g.lineWidth=30;g.strokeText(text,0,0);   // thin light rim so the letters keep an edge under white uniforms
  g.strokeStyle='#0b0918';g.lineWidth=20;g.strokeText(text,0,0);   // dark outline
  g.fillStyle=fill;g.strokeStyle=fill;g.lineWidth=6;g.strokeText(text,0,0);g.fillText(text,0,0);g.restore();
  cv._t=performance.now();EZW[key]=cv;return cv}
function drawEZLogos(ymin,ymax){
  if(window.__noez||camMode()==='side'||!G)return;const RTm=RT();
  const items=[[-5,()=>{const c=teamLogoColors();return {k:'me|'+SAVE.logo+'|'+c.p+c.s+c.a,svg:LogoRenderer(SAVE.logo,c.p,c.s,c.a,300),text:RT3()?'HARBOR':RT2()?'HALE':RTm?'CHANNEL':(SAVE.teamName||'YOU').toUpperCase().slice(0,12),bg:RT3()?'#3A464E':RT2()?'#2F6F6A':RTm?'#1d4a52':shade(homeCol(),-.35),fill:(RT2()||RT3())?'#E8E2D0':null,cands:[c.s,c.a,'#ffffff','#ffd23a']}}],
    [105,()=>{const c=G.crew,u=G.oppUni||c.uni,col=u.jc||c.col;return {k:'op|'+c.id+'|'+col,svg:logoSVG(crewLogo(c),col,c.town,{shape:'shield'}),text:(RT2()||RT3())?String(c.ez||c.short||c.name).toUpperCase():RTm?'RATS':String(c.ez||c.short||c.name).toUpperCase(),bg:RTm&&!RT2()&&!RT3()?'#3e5212':shade(awayCol(),-.35),fill:(RT2()||RT3())?[u.jt,u.hc,'#E8E2D0','#ffffff'].find(h=>h&&Math.abs(lumaOf(h)-lumaOf(shade(awayCol(),-.35)))>.3)||'#E8E2D0':null,cands:[u.hc,u.jt,'#ffffff','#ffd23a']}}]];
  for(const [yy,f] of items){if(yy+5<ymin||yy-5>ymax)continue;let o;try{o=f()}catch(e){continue}
    const c0=P(CX,yy);
    const wc=ezWord(o.text,o.bg,o.cands,o.fill);{const hy=4.4,a_=P(CX,yy-hy),b_=P(CX,yy+hy),w_=(1400/1300)*34*c0.u,h_=Math.abs(a_.sy-b_.sy);if(w_>20&&h_>4){ctx.save();ctx.globalAlpha=.9;ctx.drawImage(wc,c0.sx-w_/2,c0.sy-h_/2,w_,h_);ctx.restore()}}   // BIG block letters across the end zone, like a real one
    if(RTm)continue;
    const cv=ezLogo(o.k,o.svg);if(!cv)continue;
    for(const xx of [4.8,FW-4.8]){const p0=P(xx,yy),a_=P(xx,yy-2.6),b_=P(xx,yy+2.6),w_=5.2*p0.u*1.35,h_=Math.abs(a_.sy-b_.sy)*1.35;if(w_<8||h_<3)continue;ctx.save();ctx.globalAlpha=.9;ctx.drawImage(cv,p0.sx-w_/2,p0.sy-h_/2,w_,h_);ctx.restore()}}   // the logo at each end of the word
}
function drawMidLogo(ymin,ymax){
  if(RT()){if(50>ymin-8&&50<ymax+8){ctx.globalAlpha=.7;poly(ellipsePts(CX,50,8,8,72),null,RT3()?'rgba(211,204,193,.8)':'rgba(255,170,60,.8)',2.5);ctx.globalAlpha=1}return}
  if(50>ymin-8&&50<ymax+8){const OL=(!window.__noopl&&camMode()!=='side')?oppLogoCanvas():null;ctx.globalAlpha=OL?.5:1;poly(ellipsePts(CX,50,8,8,72),null,'rgba(39,224,255,.9)',OL?2:3);ctx.globalAlpha=1;
    if(OL){const oc=(G.oppUni||G.crew.uni).jc||G.crew.col;ctx.globalAlpha=.25;poly(ellipsePts(CX,50,5.8,5.8,72),shade(oc,-.5));ctx.globalAlpha=1;poly(ellipsePts(CX,50,5.8,5.8,72),null,oc,2.4);   // the ring takes the opponent's colour
      const c0=P(CX,50),a_=P(CX,50-5.6),b_=P(CX,50+5.6),w_=11.4*c0.u,h_=Math.abs(a_.sy-b_.sy)*1.03;ctx.save();ctx.globalAlpha=.85;ctx.drawImage(OL,c0.sx-w_/2*1.5,c0.sy-h_/2*1.5,w_*1.5,h_*1.5);ctx.restore()}   // squashed with the field's perspective, drawn from one cached image, kept at 85% so players and numbers read over it
    else{
    ctx.globalAlpha=.25;poly(ellipsePts(CX,50,5.8,5.8,72),shade(homeCol(),-.45));ctx.globalAlpha=1;poly(ellipsePts(CX,50,5.8,5.8,72),null,'rgba(255,47,168,.9)',2);
    const pts=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*TAU/10,r=i%2?2.2:4.8;pts.push([CX+Math.cos(a)*r,50+Math.sin(a)*r])}ctx.globalAlpha=.4;poly(pts,'#ff4fd8');ctx.globalAlpha=1;poly(pts,null,'#9ff6ff',1.5)}}
}
function drawFieldDeco(ymin,ymax){
  if(0)for(const o of DECO.dirt){if(o.y<ymin||o.y>ymax)continue;poly(ellipsePts(o.x,o.y,o.rx*1.15,o.ry*1.15,12),(o.x<CX?'rgba(39,224,255,':'rgba(255,47,168,')+(o.a*.55)+')')}
  for(const t of RT()?[]:DECO.tufts){if(t[1]<ymin||t[1]>ymax||(camMode()!=='side'&&t[1]<cam.y-4))continue;const p=P(t[0],t[1]);ctx.fillStyle=t[2]>.5?'rgba(255,47,168,.2)':'rgba(39,224,255,.2)';const s=Math.max(1.5,p.u*.12);ctx.fillRect(p.sx-s*.3,p.sy-s*.4,s*.5,s*4)}
  const word=(t,y,col)=>{if(y<ymin-6||y>ymax+6)return;const p=P(CX,y);ctx.save();ctx.translate(p.sx,p.sy);if(camMode()==='side')ctx.rotate(-Math.PI/2);else{const q=P(CX,y+1.5),vs=clamp(Math.abs(q.sy-p.sy)/(1.5*p.u),.12,1);ctx.scale(1,vs)}ctx.fillStyle=col;ctx.strokeStyle='rgba(0,0,0,.45)';ctx.lineWidth=Math.max(2,p.u*.5);ctx.lineJoin='round';ctx.font='400 '+Math.max(8,p.u*(t.length>7?3.1:4.2))+'px "Bowlby One",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.strokeText(t,0,0);ctx.fillText(t,0,0);ctx.restore()};
  
}
const crowdBase=['#ff4d6d','#ffd23a','#4dd0e1','#7be07b','#ffffff','#b58cff','#ff8a1f'];
function drawCrowd(){}
let BG=null,BGkey='';
function buildBG(){
  const dpr=Math.min(window.devicePixelRatio||1,2),HOR=Math.ceil(horY0())+2,w=W+240;
  const c=document.createElement('canvas');c.width=Math.round(w*dpr);c.height=Math.round(HOR*dpr);
  const g=c.getContext('2d');g.scale(dpr,dpr);const rr=mulberry(7),NE=STAD.neon,WC=['#27e0ff','#ff2fa8','#b58cff','#ffe0a0'];
  const sky=g.createLinearGradient(0,0,0,HOR);sky.addColorStop(0,'#04030c');sky.addColorStop(.5,'#140a30');sky.addColorStop(.82,'#52166e');sky.addColorStop(1,'#d3278f');g.fillStyle=sky;g.fillRect(0,0,w,HOR);
  // searchlight beams
  for(const [bx,sw,col] of [[.22,40,'#27e0ff'],[.7,34,'#ff2fa8']]){const x=w*bx,gr=g.createLinearGradient(x,HOR,x+60,0);gr.addColorStop(0,nrgba(col,.22));gr.addColorStop(1,nrgba(col,0));g.fillStyle=gr;g.beginPath();g.moveTo(x-sw*.2,HOR);g.lineTo(x+sw*.2,HOR);g.lineTo(x+70+sw,0);g.lineTo(x+70,0);g.fill()}
  const base=HOR-4;
  const layer=(col,hMin,hMax,wMin,wMax,lit,dark)=>{for(let x=-20;x<w;){const bw=wMin+rr()*(wMax-wMin),bh=HOR*(hMin+rr()*(hMax-hMin));g.fillStyle=col;g.fillRect(x,base-bh,bw,bh+6);
      if(dark>0){g.fillStyle='rgba(0,0,0,'+dark+')';g.fillRect(x+bw*.7,base-bh,bw*.3,bh)}
      for(let wy=base-bh+5;wy<base-8;wy+=6)for(let wx=x+3;wx<x+bw-3;wx+=5)if(rr()<lit){g.fillStyle=WC[(rr()*4)|0];g.globalAlpha=.55+rr()*.4;g.fillRect(wx,wy,2,3);g.globalAlpha=1}
      if(rr()>.6){g.fillStyle='#1a1038';g.fillRect(x+bw*.45,base-bh-12,1.6,12);g.fillStyle='#ff3b5c';g.fillRect(x+bw*.45-.5,base-bh-13,2.6,2.6)}
      x+=bw+rr()*3}};
  layer('#2a1d5c',.35,.9,16,34,.16,.2);   // far megacity towers
  // floating holographic ads between the far towers
  for(let i=0;i<4;i++){const x=w*(.08+i*.26)+rr()*30,y=HOR*(.12+rr()*.25),pw=46+rr()*30,ph=22+rr()*18,col=NE[(i*2)%5];
    const gr=g.createLinearGradient(x,y,x,y+ph);gr.addColorStop(0,nrgba(col,.55));gr.addColorStop(1,nrgba(col,.12));g.fillStyle=gr;g.fillRect(x,y,pw,ph);g.strokeStyle=nrgba(col,.9);g.lineWidth=1.2;g.strokeRect(x,y,pw,ph);
    g.fillStyle='rgba(0,0,0,.2)';for(let yy=y;yy<y+ph;yy+=3)g.fillRect(x,yy,pw,1);
    g.font='900 '+(ph*.72)+'px '+KJ;g.textAlign='center';g.textBaseline='middle';g.fillStyle='rgba(255,255,255,.9)';g.fillText(STAD.kanji[(i*5+2)%16]+STAD.kanji[(i*7+9)%16],x+pw/2,y+ph/2+1)}
  layer('#1a1342',.3,.75,22,44,.1,.3);    // middle towers
  // neon kanji signs on the mid towers
  for(let i=0;i<7;i++){const x=w*(.04+i*.15)+rr()*40,hgt=36+rr()*22,y=HOR*(.18+rr()*.3),col=NE[(i+1)%5];g.fillStyle='#07050f';g.fillRect(x-7,y-2,14,hgt+4);g.strokeStyle=nrgba(col,.9);g.lineWidth=1.4;g.strokeRect(x-7,y-2,14,hgt+4);
    g.font='900 12px '+KJ;g.textAlign='center';g.textBaseline='middle';const chs=[0,1,2];chs.forEach(k=>{g.fillStyle=nrgba(col,.35);g.fillText(STAD.kanji[(i*3+k*5)%16],x,y+7+k*12);g.fillStyle='#fff';g.fillText(STAD.kanji[(i*3+k*5)%16],x,y+7+k*12)});
    const gg=g.createRadialGradient(x,y+hgt/2,2,x,y+hgt/2,34);gg.addColorStop(0,nrgba(col,.35));gg.addColorStop(1,nrgba(col,0));g.fillStyle=gg;g.fillRect(x-36,y-30,72,hgt+60)}
  layer('#0f0b26',.22,.55,30,62,.06,.35);   // near dark towers
  // flying traffic
  for(let i=0;i<9;i++){const x=rr()*w,y=HOR*(.15+rr()*.5),col=rr()>.5?'#ffe0a0':'#ff5a5a';g.fillStyle=col;g.fillRect(x,y,2,1.5);g.fillStyle=nrgba(col,.3);g.fillRect(x-9,y+.3,9,.9)}
  // steel truss and cables across the top
  g.fillStyle='#05040c';g.fillRect(0,0,w,5);g.strokeStyle='#0a0818';g.lineWidth=1.4;g.beginPath();for(let x=0;x<w;x+=18){g.moveTo(x,0);g.lineTo(x+9,16);g.lineTo(x+18,0)}g.stroke();
  g.strokeStyle='#05040c';g.lineWidth=2;g.beginPath();for(let i=0;i<5;i++){const x0=w*(i*.22),x1=x0+w*.26;g.moveTo(x0,10);g.quadraticCurveTo((x0+x1)/2,HOR*.34,x1,10)}g.stroke();
  // haze rising from the street, glowing magenta
  const hz=g.createLinearGradient(0,base-HOR*.45,0,HOR);hz.addColorStop(0,'rgba(255,47,168,0)');hz.addColorStop(1,'rgba(255,47,168,.5)');g.fillStyle=hz;g.fillRect(0,base-HOR*.45,w,HOR*.45+2);
  g.fillStyle='#0a0716';g.fillRect(0,base,w,HOR-base);
  return c;
}
function drawBackdrop(){
  const HOR=horY(),key=W+'x'+H+'|'+(G&&G.crew?G.crew.id:'');
  if(BGkey!==key){BG=buildBG();BGkey=key}
  const shift=clamp(-(cam.x-CX)*1.3,-110,110);
  ctx.drawImage(BG,-120+shift,HOR-horY0(),W+240,horY0()+2);
}

/* ===== v2.63 ROUTE MATCH THEME: only when G.crew.pickup (the Spillway pickup games). Same field renderer, same HUD; concrete, amber paint, a harbor behind, dockworkers watching. ===== */
const RT=()=>!!(G&&G.crew&&(G.crew.pickup||G.crew.town2));
const RT2=()=>!!(G&&G.crew&&G.crew.town2);
const RT3=()=>!!(G&&G.crew&&G.crew.r2);
const cz=(o,r)=>RT()?r:o;
const RTURF=['#2d343b','#292f36','#31373d','#2b3238'];
function turfCol(y,alt){
  if(!RT())return y>=100?(alt?shade(awayCol(),-.3):shade(awayCol(),-.4)):y<0?(alt?shade(homeCol(),-.3):shade(homeCol(),-.4)):(alt?TURF_A:TURF_B);
  if(RT3()){if(y>=100)return alt?shade(awayCol(),-.3):shade(awayCol(),-.4);if(y<0)return alt?'#3A464E':'#343f46';const k=((Math.floor(y/5)%4)+4)%4;return ['#5C554F','#57514b','#625a53','#5a534d'][k]}
  if(RT2()){if(y>=100)return alt?shade(awayCol(),-.3):shade(awayCol(),-.4);if(y<0)return alt?'#2F6F6A':'#2a645f';return alt?SHIPCFG.deck[0]:SHIPCFG.deck[1]}if(y>=100)return alt?'#5f7d1e':'#56711b';if(y<0)return alt?'#2c6a74':'#26606a';return RTURF[((Math.floor(y/5)%4)+4)%4]}
/* ===== v3.19T SHIP FIELD (CF_81 section 4): Town 2's field is the deck of Tug's old ship in flooded Dry Dock 14. LOOK ONLY:
   no dice, nothing a play depends on. Only drawn when RT2() (a Town 2 crew). NO people anywhere (canon: no crowd).
   Heavy pieces (sky, far wall, masts, cannons, nets) are cached pictures; the deck seams fade out with distance and are off
   with LITE EFFECTS. Knobs: window.SHIPCFG. ===== */
const SHIPCFG=window.SHIPCFG={seam:1.3333,seamA:[.55,.3,.12],deck:['#8E8578','#878072'],gutter:'#6E6458',hull:'#5C4A3A',hullDk:'#3a2c22',rail:'#4A3A2E',
  lid:'#8A3B2A',iron:'#2B3036',bronze:'#A8803A',rope:'#C9B37E',sail:'#D8CDB5',flag:'#14110f',bone:'#E8E2D0',puff:1.4};
const SHIP={puff:null,sky:null,skyK:'',spr:{}};
const shipLite=()=>document.body.classList.contains('lite');
function shipSeams(ymin,ymax){if(shipLite()||camMode()==='side')return;const C=SHIPCFG,bands=[[cam.y-22,cam.y+12,C.seamA[0]],[cam.y+12,cam.y+24,C.seamA[1]],[cam.y+24,cam.y+35,C.seamA[2]]];
  for(const [a0,b0,al] of bands){const a=Math.max(a0,ymin,-10),b=Math.min(b0,ymax,110);if(b<=a)continue;ctx.fillStyle='rgba(111,102,90,'+al+')';ctx.beginPath();
    for(let x=-5.3;x<FW+5.4;x+=C.seam){const p1=P(x,a),p2=P(x+.09,a),p3=P(x+.09,b),p4=P(x,b);ctx.moveTo(p1.sx,p1.sy);ctx.lineTo(p2.sx,p2.sy);ctx.lineTo(p3.sx,p3.sy);ctx.lineTo(p4.sx,p4.sy);ctx.closePath()}
    ctx.fill()}}
const SHIP_GRATES=[[11.5,21.5,4.2,3],[37.6,36,4.2,3],[11.5,71.5,4.2,3]];   // [x0,y0,w,h] in yards
function shipGrates(ymin,ymax){if(camMode()==='side')return;const q=(x0,y0,x1,y1)=>{const a=P(x0,y0),b=P(x1,y0),c=P(x1,y1),d=P(x0,y1);ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.lineTo(c.sx,c.sy);ctx.lineTo(d.sx,d.sy);ctx.closePath()};
  for(const [x0,y0,w,h] of SHIP_GRATES){if(y0+h<ymin||y0>ymax)continue;
    ctx.fillStyle='rgba(0,0,0,.28)';ctx.beginPath();q(x0-.35,y0-.35,x0+w+.35,y0+h+.35);ctx.fill();   // shadow lip
    ctx.fillStyle='#5C4A3A';ctx.beginPath();q(x0-.2,y0-.2,x0+w+.2,y0+h+.2);ctx.fill();   // coaming (frame)
    ctx.fillStyle='#1f1812';ctx.beginPath();q(x0,y0,x0+w,y0+h);ctx.fill();   // the dark hold below
    const c=P(x0+w/2,y0+h/2),nx=8,ny=6;const vs=clamp(Math.abs(P(x0,y0).sy-P(x0,y0+h).sy)/(h*c.u),.15,1);ctx.strokeStyle='#8A7862';ctx.lineCap='butt';   // 16 wooden bars
    ctx.lineWidth=Math.max(1,c.u*.1);ctx.beginPath();for(let i=0;i<=nx;i++){const a=P(x0+i*w/nx,y0),b=P(x0+i*w/nx,y0+h);ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy)}ctx.stroke();
    ctx.lineWidth=Math.max(1,c.u*.1*vs);ctx.beginPath();for(let j=0;j<=ny;j++){const a=P(x0,y0+j*h/ny),b=P(x0+w,y0+j*h/ny);ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy)}ctx.stroke()}}
/* ---- sky + sea backdrop, fixed to the screen like routeSky (cached) ---- */
function shipSky(){const hh=Math.round(H*.34),k=W+'x'+H+'|'+cv.width,yo=horY()-hh;if(yo>0){ctx.fillStyle='#3A4450';ctx.fillRect(0,0,W,yo+1)}
  if(SHIP.skyK!==k){SHIP.skyK=k;const sc=cv.width/W,c=document.createElement('canvas');c.width=Math.round(W*sc);c.height=Math.round(hh*sc);const g=c.getContext('2d');g.scale(sc,sc);const r=mulberry(31);
    const gr=g.createLinearGradient(0,0,0,hh*.74);gr.addColorStop(0,'#3A4450');gr.addColorStop(.6,'#6B7787');gr.addColorStop(1,'#C98A3E');g.fillStyle=gr;g.fillRect(0,0,W,hh*.74+1);
    for(let i=0;i<6;i++){g.fillStyle='rgba(232,214,190,'+(.05+r()*.06)+')';g.beginPath();g.ellipse(r()*W,hh*(.12+r()*.3),40+r()*80,5+r()*7,0,0,7);g.fill()}
    const wy0=hh*.74,wg=g.createLinearGradient(0,wy0,0,hh);wg.addColorStop(0,'#2F4A55');wg.addColorStop(1,'#3E5A66');g.fillStyle=wg;g.fillRect(0,wy0,W,hh-wy0);
    g.fillStyle='#22313a';g.fillRect(W*.46,wy0+2,W*.3,2.2);   // the breakwater line
    for(let x=-4;x<W*.24;){const bw=8+r()*14,bh=hh*(.04+r()*.07);g.fillStyle='#24323b';g.fillRect(x,wy0-bh,bw,bh+1);if(r()<.5){g.fillStyle='rgba(255,210,140,.7)';g.fillRect(x+bw*.4,wy0-bh*.6,1.5,2)}x+=bw+r()*2}   // low harbor roofs, left
    g.strokeStyle='#1c2830';g.lineWidth=2;const cx0=W*.12,by=wy0-hh*.08;g.beginPath();g.moveTo(cx0,by);g.lineTo(cx0,by-hh*.36);g.moveTo(cx0-14,by-hh*.36);g.lineTo(cx0+30,by-hh*.36);g.moveTo(cx0+24,by-hh*.36);g.lineTo(cx0+24,by-hh*.2);g.stroke();   // gantry crane
    for(let x=W*.9;x<W+6;){const bw=8+r()*10,bh=hh*(.03+r()*.05);g.fillStyle='#24323b';g.fillRect(x,wy0-bh,bw,bh+1);x+=bw+r()*3}   // low roofs, right
    const sx=W*.32,sy=wy0-1;g.fillStyle='#2a333a';g.beginPath();g.moveTo(sx-26,sy);g.lineTo(sx+30,sy);g.lineTo(sx+24,sy-5);g.lineTo(sx-22,sy-5);g.closePath();g.fill();g.fillRect(sx-4,sy-12,9,7);   // one distant ship
    const tx=W*.84,ty=wy0;g.fillStyle='#E6DCC8';g.fillRect(tx-3,ty-hh*.34,6,hh*.34);g.fillStyle='#2F4A55';for(let k2=1;k2<4;k2++)g.fillRect(tx-3,ty-hh*.34+k2*hh*.085,6,hh*.03);g.fillStyle='#E8A33D';g.fillRect(tx-2.5,ty-hh*.38,5,4);   // the Beacon, on the right (south)
    g.fillStyle='rgba(232,163,61,.12)';g.beginPath();g.moveTo(tx,ty-hh*.37);g.lineTo(tx-W*.22,ty-hh*.5);g.lineTo(tx-W*.22,ty-hh*.3);g.closePath();g.fill();   // its static beam (12%)
    for(let i=0;i<34;i++){g.strokeStyle='rgba(240,200,140,'+(.07+r()*.1)+')';g.lineWidth=1.1;const y=wy0+3+r()*(hh-wy0-4),x=r()*W;g.beginPath();g.moveTo(x,y);g.lineTo(x+4+r()*12,y);g.stroke()}
    SHIP.sky=c}
  ctx.drawImage(SHIP.sky,0,yo,W,hh)}
/* ---- the bow (far end wall) with the foremast, yards, crow's nest, black flag and ratlines; drawn into the cached far layer ---- */
function shipEnd(){const C=SHIPCFG,yb=WFAR+6,p=P(CX,yb),u=p.u,m=(a,v)=>({x:p.sx+(a-CX)*u,y:p.sy-v*u});
  const lw=x=>Math.max(1,u*x);
  // foremast behind the forecastle
  const mb=m(CX-.6,0),mt=m(CX+.6,64);ctx.fillStyle='#3B2E24';ctx.fillRect(mb.x,mt.y,mt.x-mb.x,mb.y-mt.y);
  for(const [v,hw] of [[28,15],[44,10]]){const a=m(CX-hw,v),b=m(CX+hw,v+.9);ctx.fillStyle='#3B2E24';ctx.fillRect(a.x,b.y,b.x-a.x,a.y-b.y);   // yards
    ctx.fillStyle=C.sail;for(let i=0;i<5;i++){const q=m(CX-hw+.8+i*(hw*2-1.6)/4,v-.4);ctx.beginPath();ctx.ellipse(q.x,q.y,u*hw*.22,u*.75,0,0,7);ctx.fill()}}   // furled sails
  {const a=m(CX-2,49),b=m(CX+2,51.5);ctx.fillStyle='#4A3A2E';ctx.fillRect(a.x,b.y,b.x-a.x,a.y-b.y)}   // crow's nest
  {const a=m(CX+.6,60),b=m(CX+8.5,65.5),w=b.x-a.x,h=a.y-b.y;ctx.fillStyle=C.flag;ctx.fillRect(a.x,b.y,w,h);   // the black flag: the Closers' bell over crossed bones
    const cx=a.x+w*.5,cy=b.y+h*.42;ctx.strokeStyle=C.bone;ctx.lineWidth=lw(.35);ctx.beginPath();ctx.moveTo(cx-w*.28,cy+h*.38);ctx.lineTo(cx+w*.28,cy+h*.14);ctx.moveTo(cx-w*.28,cy+h*.14);ctx.lineTo(cx+w*.28,cy+h*.38);ctx.stroke();
    ctx.fillStyle=C.bone;ctx.beginPath();ctx.moveTo(cx-w*.14,cy+h*.12);ctx.quadraticCurveTo(cx-w*.14,cy-h*.3,cx,cy-h*.3);ctx.quadraticCurveTo(cx+w*.14,cy-h*.3,cx+w*.14,cy+h*.12);ctx.closePath();ctx.fill()}
  // shrouds / ratlines from the forecastle rail to the mast (outside the field picture: they rise from the wall top)
  ctx.strokeStyle='rgba(59,46,36,.75)';ctx.lineWidth=lw(.12);ctx.beginPath();for(const sd of [-1,1])for(const [x0,v1] of [[38,44],[32,44],[26,28],[20,28]]){const a=m(CX+sd*x0,15),b=m(CX+sd*.6,v1);ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y)}ctx.stroke();
  // bowsprit seen end-on above the bow
  {const a=m(CX-.35,15),b=m(CX+.35,20);ctx.fillStyle='#3B2E24';ctx.fillRect(a.x,b.y,b.x-a.x,a.y-b.y)}
  // the forecastle face (end wall)
  const L=m(CX-46,0),Rr=m(CX+46,0),T=m(CX-46,15);const wg=ctx.createLinearGradient(0,T.y,0,L.y);wg.addColorStop(0,C.hull);wg.addColorStop(1,C.hullDk);ctx.fillStyle=wg;ctx.fillRect(L.x,T.y,Rr.x-L.x,L.y-T.y);
  ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=lw(.1);ctx.beginPath();for(let v=1.8;v<15;v+=1.8){const a=m(CX-46,v),b=m(CX+46,v);ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y)}ctx.stroke();
  {const a=m(CX-46,14),b=m(CX+46,15.4);ctx.fillStyle=C.rail;ctx.fillRect(a.x,b.y,b.x-a.x,a.y-b.y)}
  for(const gx of [-36,-22,22,36]){const a=m(CX+gx-1.6,3),b=m(CX+gx+1.6,6.2);ctx.fillStyle='#0d0a08';ctx.fillRect(a.x,b.y,b.x-a.x,a.y-b.y);const l=m(CX+gx-1.6,6.4),l2=m(CX+gx+1.6,8.4);ctx.fillStyle=C.lid;ctx.fillRect(l.x,l2.y,l2.x-l.x,l.y-l2.y)}
  {const a=m(CX-9,8.6),b=m(CX+9,11.6);ctx.fillStyle='#6B4A2E';ctx.fillRect(a.x,b.y,b.x-a.x,a.y-b.y);ctx.strokeStyle='rgba(0,0,0,.6)';ctx.lineWidth=lw(.12);ctx.strokeRect(a.x,b.y,b.x-a.x,a.y-b.y);   // the name board: every letter gouged out (D4)
    const r=mulberry(14);ctx.strokeStyle='rgba(232,214,180,.55)';ctx.lineWidth=lw(.16);ctx.beginPath();for(let i=0;i<11;i++){const x=a.x+(b.x-a.x)*(.08+i*.08),y=b.y+(a.y-b.y)*(.25+r()*.2);ctx.moveTo(x,y);ctx.lineTo(x+(b.x-a.x)*(.03+r()*.05),y+(a.y-b.y)*(.35+r()*.2))}ctx.stroke()}
  for(const lx of [-14,14]){const q=m(CX+lx,10);ctx.fillStyle='#E8A33D';ctx.fillRect(q.x-u*.45,q.y-u*.7,u*.9,u*1.1)}   // two bow lanterns
  ctx.fillStyle='rgba(230,225,205,.6)';ctx.font='700 '+Math.max(8,u*1.6)+'px "Bowlby One",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const tt=m(CX,4.6);ctx.fillText('THE BASIN',tt.x,tt.y)}
/* ---- per-frame shell: gutter rail, bulwarks with gunports, cannons, cannonball stacks, cargo nets, crates, the flag chest, puffs ---- */
const SHIP_CANNON=[10,20,30,40,50,60,70,80,90],SHIP_NETS=[25,75];
// the deck between the far end line (110) and the bow (118): bow chasers, shot piles and netted cargo, clear of the goal-mast (|x-CX|>7)
const SHIP_APRON=[['cannon',CX-13,114.5,4.4],['cannon',CX+13,114.5,4.4],['balls',CX-8.5,112.8,2.8],['balls',CX+8.5,112.8,2.8],
  ['cargo',CX-22,115,5.2],['cargo',CX+22,115,5.2],['balls',CX-30,113.5,2.6],['cannon',CX+30,114.5,4.2]];
function shipWall(y0,y1){const C=SHIPCFG,WH=10;
  for(const sd of [0,1]){const x=sd?FW+6.4:-6.4,a=P(x,y0),b=P(x,y1);if(Math.abs(b.sx-a.sx)<1)continue;const a2=a.sy-WH*a.u,b2=b.sy-WH*b.u;
    const gr=ctx.createLinearGradient(0,Math.min(a2,b2),0,Math.max(a.sy,b.sy));gr.addColorStop(0,C.hull);gr.addColorStop(1,C.hullDk);ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.lineTo(b.sx,b2);ctx.lineTo(a.sx,a2);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,.3)';ctx.lineWidth=1;ctx.beginPath();for(let h=1.6;h<WH;h+=1.6){ctx.moveTo(a.sx,a.sy-h*a.u);ctx.lineTo(b.sx,b.sy-h*b.u)}ctx.stroke();   // planking
    ctx.strokeStyle='rgba(0,0,0,.45)';ctx.lineWidth=1.2;ctx.beginPath();for(let y=Math.ceil(y0/7)*7;y<y1;y+=7){const q=P(x,y);ctx.moveTo(q.sx,q.sy);ctx.lineTo(q.sx,q.sy-WH*q.u)}ctx.stroke();   // ribs
    ctx.fillStyle=C.rail;ctx.beginPath();ctx.moveTo(a.sx,a2);ctx.lineTo(b.sx,b2);ctx.lineTo(b.sx,b2+.9*b.u);ctx.lineTo(a.sx,a2+.9*a.u);ctx.closePath();ctx.fill();   // top rail
    for(const y of SHIP_CANNON){if(y<y0||y>y1)continue;const q=P(x,y-.8),q2=P(x,y+.8);const top=q.sy-5*q.u,bot=q.sy-2.8*q.u;   // gunport + open lid
      ctx.fillStyle='#0d0a08';ctx.beginPath();ctx.moveTo(q.sx,bot);ctx.lineTo(q2.sx,q2.sy-2.8*q2.u);ctx.lineTo(q2.sx,q2.sy-5*q2.u);ctx.lineTo(q.sx,top);ctx.closePath();ctx.fill();
      ctx.fillStyle=C.lid;ctx.beginPath();ctx.moveTo(q.sx,q.sy-5.3*q.u);ctx.lineTo(q2.sx,q2.sy-5.3*q2.u);ctx.lineTo(q2.sx,q2.sy-6.9*q2.u);ctx.lineTo(q.sx,q.sy-6.9*q.u);ctx.closePath();ctx.fill()}
    for(const y of SHIP_NETS){if(y<y0-4||y>y1+4)continue;ctx.strokeStyle=C.rope;ctx.globalAlpha=.45;ctx.lineWidth=1;ctx.beginPath();   // cargo net draped over the rail (loose diagonal mesh)
      for(let k=-6;k<=6;k++){const ya=y-2.6+k*.9,yb=ya+5.2;const q=P(x,ya),q2=P(x,yb),q3=P(x,ya+5.2),q4=P(x,yb-5.2);ctx.moveTo(q.sx,q.sy-9.4*q.u);ctx.lineTo(q2.sx,q2.sy-3*q2.u);ctx.moveTo(q4.sx,q4.sy-3*q4.u);ctx.lineTo(q3.sx,q3.sy-9.4*q3.u)}ctx.stroke();ctx.globalAlpha=1}}}
function shipSpr(k,f){let s=SHIP.spr[k];if(!s){s=SHIP.spr[k]=document.createElement('canvas');s.width=128;s.height=96;f(s.getContext('2d'))}return s}
const SHIP_SP={
  cannon:g=>{   // seen from behind: wooden carriage, four wheels, the iron barrel running away from us to its muzzle
    g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(64,88,50,7,0,0,7);g.fill();
    g.fillStyle='#5C4A3A';g.beginPath();g.moveTo(22,84);g.lineTo(106,84);g.lineTo(96,50);g.lineTo(32,50);g.closePath();g.fill();
    g.strokeStyle='#3a2c22';g.lineWidth=3;g.beginPath();g.moveTo(26,72);g.lineTo(102,72);g.moveTo(29,61);g.lineTo(99,61);g.stroke();
    for(const [x,y,r] of [[22,82,12],[106,82,12],[34,58,9],[94,58,9]]){g.fillStyle='#3a2c22';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#6B5440';g.beginPath();g.arc(x,y,r*.45,0,7);g.fill()}
    g.fillStyle='#24292e';g.beginPath();g.moveTo(44,60);g.lineTo(84,60);g.lineTo(74,10);g.lineTo(54,10);g.closePath();g.fill();
    g.fillStyle='#363c42';g.fillRect(56,14,6,44);
    g.fillStyle='#A8803A';g.fillRect(46,46,36,4);g.fillRect(50,26,28,3);
    g.fillStyle='#24292e';g.beginPath();g.ellipse(64,10,12,5,0,0,7);g.fill();g.fillStyle='#090a0b';g.beginPath();g.ellipse(64,10,6,2.6,0,0,7);g.fill();
    g.fillStyle='#24292e';g.beginPath();g.arc(64,66,7,0,7);g.fill()},
  balls:g=>{g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(64,88,46,7,0,0,7);g.fill();
    const rows=[[4,82],[3,66],[2,50],[1,34]];for(const [n,y] of rows)for(let i=0;i<n;i++){const x=64+(i-(n-1)/2)*18;g.fillStyle='#24292e';g.beginPath();g.arc(x,y,9.5,0,7);g.fill();g.fillStyle='rgba(255,255,255,.16)';g.beginPath();g.arc(x-3,y-3,3,0,7);g.fill()}},
  cargo:g=>{   // crates and sacks under a rope cargo net
    g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(64,88,56,7,0,0,7);g.fill();
    g.fillStyle='#8A6A4A';g.fillRect(12,46,44,40);g.fillRect(58,54,40,32);g.fillRect(34,18,40,32);
    g.strokeStyle='#5C4A3A';g.lineWidth=3;g.strokeRect(12,46,44,40);g.strokeRect(58,54,40,32);g.strokeRect(34,18,40,32);
    g.fillStyle='#C9B37E';g.beginPath();g.ellipse(106,74,16,13,0,0,7);g.fill();g.fillStyle='#B39C68';g.beginPath();g.ellipse(100,62,10,7,0,0,7);g.fill();
    g.save();g.beginPath();g.moveTo(8,88);g.quadraticCurveTo(10,12,56,10);g.quadraticCurveTo(102,10,124,88);g.closePath();g.clip();
    g.strokeStyle='rgba(226,210,160,.9)';g.lineWidth=2;g.beginPath();for(let k=-8;k<=10;k++){g.moveTo(k*14,96);g.lineTo(k*14+60,0);g.moveTo(k*14+60,96);g.lineTo(k*14,0)}g.stroke();g.restore();
    g.strokeStyle='#C9B37E';g.lineWidth=3;g.beginPath();g.moveTo(8,88);g.quadraticCurveTo(10,12,56,10);g.quadraticCurveTo(102,10,124,88);g.stroke()},
  crate:g=>{g.fillStyle='#8A6A4A';g.fillRect(20,26,88,66);g.strokeStyle='#5C4A3A';g.lineWidth=6;g.strokeRect(20,26,88,66);g.beginPath();g.moveTo(20,26);g.lineTo(108,92);g.stroke()},
  chest:g=>{g.fillStyle='#4A3A2E';g.fillRect(22,14,84,22);g.fillStyle='#E8C53A';for(const [x,r] of [[36,-.5],[54,.2],[70,-.2],[86,.5]]){g.save();g.translate(x,48);g.rotate(r);g.fillRect(-8,-34,16,28);g.restore()}g.fillStyle='#5C4A3A';g.fillRect(18,44,92,40);g.fillStyle='#A8803A';g.fillRect(18,44,92,5);g.fillRect(58,49,12,14)}};
function shipPlace(k,x,y,w){const p=P(x,y);if(p.sy<-60||p.sy>H+60||p.sx<-120||p.sx>W+120)return;const s=shipSpr(k,SHIP_SP[k]),ww=w*p.u,hh=ww*s.height/s.width;ctx.drawImage(s,p.sx-ww/2,p.sy-hh,ww,hh)}
function shipPools(ymin,ymax){ctx.save();ctx.globalCompositeOperation='lighter';
  for(const [x,y,rgb] of [[-3,15,'232,163,61'],[FW+3,35,'159,196,212'],[-3,55,'232,163,61'],[FW+3,75,'159,196,212'],[-3,95,'232,163,61']]){if(y<ymin-10||y>ymax+10)continue;let sp=RT_SPR[rgb];if(!sp){sp=RT_SPR[rgb]=document.createElement('canvas');sp.width=sp.height=128;const g=sp.getContext('2d'),gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba('+rgb+',.24)');gr.addColorStop(.6,'rgba('+rgb+',.15)');gr.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=gr;g.fillRect(0,0,128,128)}
    const c=P(x,y),f=P(x,y+9),rx=8*c.u,ry=Math.max(5,Math.abs(c.sy-f.sy)*.6);ctx.drawImage(sp,c.sx-rx,c.sy-ry,rx*2,ry*2)}ctx.restore()}
function shipShell(ymin,ymax){if(!LAND||camMode()==='side')return;const y0=cam.y-22,y1=WFAR+1,c0=Math.max(y0,NFAR),c1=Math.min(y1,WFAR);
  shipPools(ymin,ymax);quad(-1.4,c0,-.05,c1,SHIPCFG.rail);quad(FW+.05,c0,FW+1.4,c1,SHIPCFG.rail);
  shipWall(y0,y1);const items=[];
  for(const y of SHIP_CANNON)for(const sd of [0,1]){if(y<y0-4||y>y1+4)continue;items.push({y,f:()=>shipPlace('cannon',sd?FW+4.6:-4.6,y,3.4)});if(y%20===10)items.push({y:y+3,f:()=>shipPlace('balls',sd?FW+4.4:-4.4,y+3,2.4)})}
  for(const [k,x,y,w] of SHIP_APRON)if(y>=y0-4&&y<=y1+4)items.push({y,f:()=>shipPlace(k,x,y,w)});
  for(const y of SHIP_NETS)for(const sd of [0,1]){if(y<y0-4||y>y1+4)continue;items.push({y,f:()=>shipPlace('cargo',sd?FW+4.6:-4.6,y,3.6)})}
  if(50>=y0-4&&50<=y1+4)items.push({y:50,f:()=>shipPlace('chest',-3.4,50,1.9)});   // D6: a sea chest of yellow flags at the 50 (show, don't tell)
  items.sort((a,b)=>b.y-a.y);for(const it of items)it.f();
  shipPuffDraw()}
/* ---- D7: look-only cannon puff on YOUR touchdown (two cannons just ahead of the camera); off with LITE EFFECTS ---- */
function shipPuff(){if(!RT2()||shipLite())return;SHIP.puff={t0:performance.now()}}   // the two bow cannons on the far wall fire (always in view when you score)
function shipPuffDraw(){const P0=SHIP.puff;if(!P0)return;const t=(performance.now()-P0.t0)/1000;if(t>SHIPCFG.puff){SHIP.puff=null;return}const k=t/SHIPCFG.puff;
  for(const sd of [-1,1]){const p=P(CX+sd*22,WFAR+6);if(p.sy<-60||p.sy>H+60)continue;const gx=p.sx,gy=p.sy-4.6*p.u,u=Math.max(p.u,4.5);
    if(k<.12){ctx.fillStyle='rgba(255,196,110,'+(.9-k*6).toFixed(3)+')';ctx.beginPath();ctx.arc(gx,gy,u*(1.6+k*10),0,7);ctx.fill()}   // muzzle flash
    for(let i=0;i<6;i++){const r=u*(1.4+k*(4+i*1.1)),dx=sd*u*(.5+k*(5+i*3.2)),dy=-u*(.3+k*(1.4+i*.7));
      ctx.fillStyle='rgba(216,210,196,'+(Math.max(0,.75-k*.75)*(1-i*.1)).toFixed(3)+')';ctx.beginPath();ctx.arc(gx+dx,gy+dy,r,0,7);ctx.fill()}}}
/* ---- the goalposts as masts (owner, 2026-11-21): same shape and spots, built as a mast, a yard with a furled sail, two topmasts with
   pennants in the town colours and a lantern at each end of the yard ---- */
function shipGoalMast(yy,col,lite,t){const base=P(CX,yy),v=base.u*.9,L=P(CX-3.08,yy),R=P(CX+3.08,yy),cb=3.3*v,up=13.3*v;ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.lineCap='round';
  const beam=(x1,y1,x2,y2,w)=>{ctx.strokeStyle='#2a1f17';ctx.lineWidth=w+Math.max(1.5,v*.12);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.strokeStyle='#6B5440';ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()};
  ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.ellipse(base.sx,base.sy,v*.9,v*.25,0,0,7);ctx.fill();
  beam(base.sx,base.sy,base.sx,base.sy-cb,Math.max(4,v*.5));   // the mast foot
  beam(L.sx,L.sy-cb,L.sx,L.sy-up-1.6*v,Math.max(3,v*.32));beam(R.sx,R.sy-cb,R.sx,R.sy-up-1.6*v,Math.max(3,v*.32));   // topmasts
  ctx.strokeStyle='rgba(42,31,23,.85)';ctx.lineWidth=Math.max(1,v*.06);ctx.beginPath();for(const S of [L,R]){ctx.moveTo(S.sx,S.sy-up-1.4*v);ctx.lineTo(base.sx,base.sy-cb*.15)}ctx.stroke();   // stays
  beam(L.sx-v*.5,L.sy-cb,R.sx+v*.5,R.sy-cb,Math.max(3.5,v*.42));   // the yard = crossbar
  ctx.fillStyle='#D8CDB5';for(let i=0;i<4;i++){const x=L.sx+(R.sx-L.sx)*(.14+i*.24);ctx.beginPath();ctx.ellipse(x,L.sy-cb-v*.38,(R.sx-L.sx)*.11,v*.34,0,0,7);ctx.fill()}   // furled sail
  for(const S of [L,R]){const tx=S.sx,ty=S.sy-up-1.6*v,w=v*1.6,h=v*.7,fl=lite?0:Math.sin(t*3+S.sx)*v*.12;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(tx+w,ty+h*.5+fl);ctx.lineTo(tx,ty+h);ctx.closePath();ctx.fill()}   // pennants
  for(const S of [L,R]){const lx=S.sx+(S===L?-v*.5:v*.5),ly=S.sy-cb+v*.25;ctx.strokeStyle='#1d1d1f';ctx.lineWidth=Math.max(1,v*.06);ctx.beginPath();ctx.moveTo(lx,ly-v*.2);ctx.lineTo(lx,ly+v*.2);ctx.stroke();ctx.fillStyle='#1d1d1f';ctx.fillRect(lx-v*.3,ly+v*.2,v*.6,v*.6);ctx.fillStyle=col;ctx.fillRect(lx-v*.2,ly+v*.28,v*.4,v*.42);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=lite?.5:.4+.15*Math.sin(t*1.6);ctx.beginPath();ctx.arc(lx,ly+v*.5,v*.9,0,7);ctx.fill();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'}
  ctx.restore()}
/* ---- field-life pieces in ship dress: lanterns on iron posts (same spots as the light pillars), barrels and rope buckets ---- */
function shipLantern(a,col,lite,t,i){const v=a.u;ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.strokeStyle='#1d1d1f';ctx.lineWidth=Math.max(1,v*.14);ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(a.sx,a.sy-v*2.3);ctx.stroke();
  ctx.fillStyle='#1d1d1f';ctx.fillRect(a.sx-v*.32,a.sy-v*2.75,v*.64,v*.5);ctx.fillStyle=col;ctx.fillRect(a.sx-v*.22,a.sy-v*2.68,v*.44,v*.36);
  ctx.globalCompositeOperation='lighter';const pulse=lite?.7:.6+.25*Math.sin(t*1.6+i*1.3);ctx.globalAlpha=pulse*.28;ctx.fillStyle=col;ctx.beginPath();ctx.arc(a.sx,a.sy-v*2.5,v*.5,0,7);ctx.fill();ctx.globalAlpha=pulse*.22;ctx.beginPath();ctx.ellipse(a.sx,a.sy,v*.6,v*.16,0,0,7);ctx.fill();ctx.restore()}
function shipObj(o,v){if(o.k==='barrel'){ctx.fillStyle='#6B4A2E';ctx.fillRect(-v*.22,-v*.55,v*.44,v*.55);ctx.fillStyle='#2B2B2B';ctx.fillRect(-v*.22,-v*.46,v*.44,v*.05);ctx.fillRect(-v*.22,-v*.16,v*.44,v*.05)}
  else{ctx.fillStyle='#5C4A3A';ctx.fillRect(-v*.2,-v*.38,v*.4,v*.38);ctx.fillStyle=SHIPCFG.rope;ctx.beginPath();ctx.ellipse(0,-v*.38,v*.2,v*.08,0,0,7);ctx.fill();ctx.strokeStyle=SHIPCFG.rope;ctx.lineWidth=Math.max(1,v*.05);ctx.beginPath();ctx.moveTo(v*.12,-v*.4);ctx.quadraticCurveTo(v*.4,-v*.6,v*.22,-v*.05);ctx.stroke()}}

let SKYR=null,SKYRk='';
function routeSky(){if(RT2()){shipSky();return}   // the harbor behind the far wall: fixed to the screen like the city skyline it replaces
  const hh=Math.round(H*.34),k=W+'x'+H+'|'+cv.width+(RT3()?'|r3':''),yo=horY()-hh;if(yo>0){ctx.fillStyle=RT3()?'#3d4a53':'#09131b';ctx.fillRect(0,0,W,yo+1)}   // v3.09: on the horizon, sky colour above
  if(SKYRk!==k&&RT3()){SKYRk=k;const sc=cv.width/W,c=document.createElement('canvas');c.width=Math.round(W*sc);c.height=Math.round(hh*sc);const g=c.getContext('2d');g.scale(sc,sc);const r=mulberry(23);
    const gr=g.createLinearGradient(0,0,0,hh);gr.addColorStop(0,'#3d4a53');gr.addColorStop(.7,'#6f7d86');gr.addColorStop(1,'#8A97A0');g.fillStyle=gr;g.fillRect(0,0,W,hh);
    for(let i=0;i<7;i++){g.fillStyle='rgba(225,230,232,'+(.05+r()*.06)+')';g.beginPath();g.ellipse(r()*W,hh*(.15+r()*.35),40+r()*70,6+r()*8,0,0,7);g.fill()}
    const sx=W*.8;for(let i=0;i<9;i++){g.fillStyle='rgba(48,46,44,'+(.5-i*.045)+')';g.beginPath();g.ellipse(sx+i*7,hh*.66-i*hh*.07,8+i*3.5,5+i*2,0,0,7);g.fill()}   // Cinderhold smoke
    g.fillStyle='#38423f';g.beginPath();g.moveTo(-5,hh*.76);for(let x=0;x<=W+10;x+=12)g.lineTo(x,hh*.72-Math.abs(Math.sin(x*.013))*hh*.1-r()*3);g.lineTo(W+10,hh*.8);g.closePath();g.fill();
    const wy0=hh*.76;const wg=g.createLinearGradient(0,wy0,0,hh);wg.addColorStop(0,'#3a5560');wg.addColorStop(1,'#56717a');g.fillStyle=wg;g.fillRect(0,wy0,W,hh-wy0);
    for(let i=0;i<30;i++){g.strokeStyle='rgba(235,240,240,'+(.08+r()*.12)+')';g.lineWidth=1.2;const y=wy0+2+r()*(hh-wy0-3),x=r()*W;g.beginPath();g.moveTo(x,y);g.lineTo(x+4+r()*14,y);g.stroke()}SKYR=c}
  if(SKYRk!==k){SKYRk=k;const sc=cv.width/W,c=document.createElement('canvas');c.width=Math.round(W*sc);c.height=Math.round(hh*sc);const g=c.getContext('2d');g.scale(sc,sc);const r=mulberry(11);
    const gr=g.createLinearGradient(0,0,0,hh);gr.addColorStop(0,'#09131b');gr.addColorStop(.6,'#1b3440');gr.addColorStop(1,'#46707c');g.fillStyle=gr;g.fillRect(0,0,W,hh);
    // Hale Harbor far shore: low lit district, one tall beacon tower
    for(let x=-6;x<W;){const bw=10+r()*20,bh=hh*(.14+r()*.3);g.fillStyle='#142a33';g.fillRect(x,hh*.74-bh,bw,bh+2);for(let wy=hh*.74-bh+3;wy<hh*.72;wy+=5)for(let wx=x+2;wx<x+bw-2;wx+=4)if(r()<.3){g.fillStyle=r()<.7?'rgba(255,225,160,.8)':'rgba(160,235,240,.7)';g.fillRect(wx,wy,1.6,2.2)}x+=bw+r()*3}
    const tx=W*.72;g.fillStyle='#10242c';g.fillRect(tx-4,hh*.12,8,hh*.64);g.fillRect(tx-9,hh*.12,18,5);g.fillStyle='rgba(255,100,90,.95)';g.beginPath();g.arc(tx,hh*.1,3,0,7);g.fill();const bg=g.createRadialGradient(tx,hh*.1,0,tx,hh*.1,30);bg.addColorStop(0,'rgba(255,200,120,.55)');bg.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=bg;g.fillRect(tx-30,hh*.1-30,60,60);
    // cranes
    g.strokeStyle='#0d1c24';g.lineWidth=2.2;for(const [cx0,s0] of [[W*.14,1],[W*.4,.8],[W*.9,1.1]]){const by=hh*.76;g.beginPath();g.moveTo(cx0,by);g.lineTo(cx0,by-hh*.5*s0);g.moveTo(cx0-18*s0,by-hh*.5*s0);g.lineTo(cx0+34*s0,by-hh*.5*s0);g.moveTo(cx0,by-hh*.5*s0);g.lineTo(cx0-18*s0,by-hh*.42*s0);g.moveTo(cx0+28*s0,by-hh*.5*s0);g.lineTo(cx0+28*s0,by-hh*.3*s0);g.stroke();g.fillStyle='rgba(255,90,90,.9)';g.fillRect(cx0+33*s0,by-hh*.5*s0-1,3,3)}
    // water with light reflections, then fog
    const wy0=hh*.74;const wg=g.createLinearGradient(0,wy0,0,hh);wg.addColorStop(0,'#1a3a46');wg.addColorStop(1,'#2d5a66');g.fillStyle=wg;g.fillRect(0,wy0,W,hh-wy0);
    for(let i=0;i<40;i++){g.strokeStyle='rgba(255,225,160,'+(.08+r()*.12)+')';g.lineWidth=1.2;const y=wy0+2+r()*(hh-wy0-3),x=r()*W;g.beginPath();g.moveTo(x,y);g.lineTo(x+4+r()*14,y);g.stroke()}
    const fg=g.createLinearGradient(0,hh*.45,0,hh);fg.addColorStop(0,'rgba(190,220,225,0)');fg.addColorStop(1,'rgba(190,220,225,.32)');g.fillStyle=fg;g.fillRect(0,hh*.45,W,hh*.55);SKYR=c}
  ctx.drawImage(SKYR,0,yo,W,hh)}
function routeEnd(){if(RT2()){shipEnd();return}   // far layer: the channel's end wall with a sluice gate, containers and the harbor crane tops
  const yb=WFAR+6,p=P(CX,yb),u=p.u,m=(a,v)=>({x:p.sx+(a-CX)*u,y:p.sy-v*u});
  const L=m(CX-46,0),Rr=m(CX+46,0),T=m(CX-46,15);
  const wg=ctx.createLinearGradient(0,T.y,0,L.y);wg.addColorStop(0,RT3()?'#b9b0a1':'#46535c');wg.addColorStop(1,RT3()?'#6e665c':'#222a31');ctx.fillStyle=wg;ctx.fillRect(L.x,T.y,Rr.x-L.x,L.y-T.y);
  ctx.strokeStyle='rgba(0,0,0,.4)';ctx.lineWidth=Math.max(1,u*.12);for(let a=CX-46;a<=CX+46;a+=6){const q=m(a,0),q2=m(a,15);ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(q2.x,q2.y);ctx.stroke()}
  const g0=m(CX-10,0),g1=m(CX+10,11);ctx.fillStyle='#0c1217';ctx.fillRect(g0.x,g1.y,g1.x-g0.x,g0.y-g1.y);ctx.strokeStyle='#59656d';ctx.lineWidth=Math.max(1.5,u*.25);ctx.strokeRect(g0.x,g1.y,g1.x-g0.x,g0.y-g1.y);
  ctx.strokeStyle='rgba(120,135,142,.5)';ctx.lineWidth=Math.max(1,u*.15);for(let a=CX-9;a<CX+10;a+=1.6){const q=m(a,0),q2=m(a,11);ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(q2.x,q2.y);ctx.stroke()}
  ctx.fillStyle='#e8c53a';const h0=m(CX-10,11),h1=m(CX+10,12.4);for(let i=0;i<20;i++){const x0=h0.x+(h1.x-h0.x)*i/20;ctx.fillRect(x0,h1.y,(h1.x-h0.x)/40,h0.y-h1.y)}
  for(const [a,v,w,hh,col] of [[-40,0,9,6.5,'#6b3f2a'],[-30,0,9,6.5,'#2f5560'],[-35,6.5,9,6.5,'#6b5a2a'],[24,0,9,6.5,'#2f5560'],[33,0,9,6.5,'#6b3f2a'],[28,6.5,9,6.5,'#5a3328']]){const q=m(CX+a,v),q2=m(CX+a+w,v+hh);ctx.fillStyle=col;ctx.fillRect(q.x,q2.y,q2.x-q.x,q.y-q2.y);ctx.strokeStyle='rgba(0,0,0,.5)';ctx.lineWidth=Math.max(1,u*.12);for(let i=1;i<9;i++){const xx=q.x+(q2.x-q.x)*i/9;ctx.beginPath();ctx.moveTo(xx,q2.y);ctx.lineTo(xx,q.y);ctx.stroke()}}
  ctx.fillStyle='rgba(230,225,205,.55)';ctx.font='700 '+Math.max(8,u*1.6)+'px "Bowlby One",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const tt=m(CX,13.6);ctx.fillText(RT3()?'THE SALT FLATS':RT2()?'THE BASIN':'THE SPILLWAY',tt.x,tt.y)}
function routeSideWall(ymin,ymax){
  if(!LAND||camMode()==='side')return;const y0=Math.max(ymin,NFAR),y1=Math.min(ymax,WFAR),WH=10;
  for(const sd of [0,1]){const x=sd?FW+6.4:-6.4,a=P(x,y0),b=P(x,y1);if(Math.abs(b.sx-a.sx)<1)continue;const a2=a.sy-WH*a.u,b2=b.sy-WH*b.u;
    const gr=ctx.createLinearGradient(0,Math.min(a2,b2),0,Math.max(a.sy,b.sy));gr.addColorStop(0,RT3()?'#6A4A3A':'#46525b');gr.addColorStop(1,RT3()?'#2e221c':'#1d242a');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.lineTo(b.sx,b2);ctx.lineTo(a.sx,a2);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,.45)';ctx.lineWidth=1.2;for(let y=Math.ceil(y0/7)*7;y<y1;y+=7){const q=P(x,y);ctx.beginPath();ctx.moveTo(q.sx,q.sy);ctx.lineTo(q.sx,q.sy-WH*q.u);ctx.stroke()}
    ctx.fillStyle='rgba(224,140,60,.32)';ctx.beginPath();ctx.moveTo(a.sx,a.sy-3.2*a.u);ctx.lineTo(b.sx,b.sy-3.2*b.u);ctx.lineTo(b.sx,b.sy-4.3*b.u);ctx.lineTo(a.sx,a.sy-4.3*a.u);ctx.closePath();ctx.fill();
    for(let y=Math.ceil(y0/9)*9;y<y1;y+=9){if(((y*7)|0)%3)continue;const q=P(x,y),q2=P(x,y+1.4);ctx.fillStyle='rgba(190,215,205,.1)';ctx.fillRect(Math.min(q.sx,q2.sx),q.sy-WH*q.u,Math.abs(q2.sx-q.sx)+1,WH*q.u*.9)}
    ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.lineTo(b.sx,b.sy-1.1*b.u);ctx.lineTo(a.sx,a.sy-1.1*a.u);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(200,225,235,.5)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(a.sx,a2);ctx.lineTo(b.sx,b2);ctx.stroke()}}
function routeFig(p,u,hat){ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(p.sx,p.sy,u*.5,u*.16,0,0,7);ctx.fill();
  ctx.fillStyle='#0b1117';ctx.beginPath();ctx.moveTo(p.sx-u*.34,p.sy);ctx.lineTo(p.sx-u*.3,p.sy-u*1.3);ctx.lineTo(p.sx+u*.3,p.sy-u*1.3);ctx.lineTo(p.sx+u*.34,p.sy);ctx.closePath();ctx.fill();
  ctx.fillStyle=RT3()?'rgba(165,81,50,.85)':'rgba(198,242,58,.75)';ctx.fillRect(p.sx-u*.3,p.sy-u*1.0,u*.6,u*.1);ctx.fillRect(p.sx-u*.3,p.sy-u*.7,u*.6,u*.08);
  ctx.fillStyle='#0b1117';ctx.beginPath();ctx.arc(p.sx,p.sy-u*1.58,u*.26,0,7);ctx.fill();ctx.fillStyle=hat;ctx.beginPath();ctx.arc(p.sx,p.sy-u*1.66,u*.27,Math.PI,0);ctx.fill();ctx.fillRect(p.sx-u*.34,p.sy-u*1.68,u*.68,u*.07)}
const RT_WORK=[[-2.2,23],[-2.4,52],[-2.3,83],[14,111.5],[26,111.8],[41,111.4]];   // six dockworkers: three along the left sideline, three behind the far end zone
const RT_STACKS=[[FW+3.4,10],[FW+3.2,31],[FW+3.6,57],[FW+3.3,79]];
function routeProps(ymin,ymax){
  if(!LAND||camMode()==='side')return;const items=[];
  RT_WORK.forEach(([x,y],i)=>{if(y>=ymin-4&&y<=ymax+4)items.push({y,f:()=>{const p=P(x,y);routeFig(p,p.u*1.15,i%2?'#d8c040':'#c6f23a')}})});
  RT_STACKS.forEach(([x,y],i)=>{if(y>=ymin-4&&y<=ymax+4)items.push({y,f:()=>{const p=P(x,y),u=p.u;for(let k=0;k<3;k++){const w=u*1.5,cy=p.sy-k*u*.55;ctx.fillStyle='#14110f';ctx.beginPath();ctx.ellipse(p.sx,cy-u*.3,w*.5,u*.3,0,0,7);ctx.fill();ctx.strokeStyle='#3a4248';ctx.lineWidth=Math.max(1,u*.1);ctx.stroke();ctx.fillStyle='#07090b';ctx.beginPath();ctx.ellipse(p.sx,cy-u*.3,w*.2,u*.1,0,0,7);ctx.fill()}}})});
  items.sort((a,b)=>b.y-a.y);for(const it of items)it.f()}
const RT_LAMPS=[[6,'#ff9040'],[26,'#90d8e8'],[46,'#ff9040'],[66,'#c6f23a'],[86,'#90d8e8']];
function routeLamps(ymin,ymax,pass){
  if(!LAND||camMode()==='side')return;
  RT_LAMPS.forEach(([y,col],i)=>{if(y<ymin-6||y>ymax+6)return;for(const sd of [0,1]){if((i+sd)%2)continue;const x=sd?FW+6.1:-6.1,p=P(x,y),hy=p.sy-8.6*p.u,dir=sd?-1:1;
    if(pass!=='l'){ctx.fillStyle='#0a0e13';ctx.fillRect(p.sx-p.u*.7,hy-p.u*.3,p.u*1.4,p.u*.5);ctx.fillStyle=col;ctx.fillRect(p.sx-p.u*.5,hy+p.u*.18,p.u,Math.max(2,p.u*.14));ctx.strokeStyle='rgba(8,10,14,.9)';ctx.lineWidth=Math.max(1,p.u*.1);ctx.beginPath();ctx.moveTo(p.sx,hy-p.u*.3);ctx.lineTo(p.sx,hy-p.u*1.6);ctx.stroke()}
    if(pass!=='n'){const tx=P(sd?FW-5:5,y);ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(p.sx,hy,tx.sx,tx.sy);g.addColorStop(0,nrgba(col,.2));g.addColorStop(1,nrgba(col,0));ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(p.sx-p.u*.5,hy);ctx.lineTo(p.sx+p.u*.5,hy);ctx.lineTo(tx.sx+p.u*6,tx.sy);ctx.lineTo(tx.sx-p.u*6,tx.sy);ctx.closePath();ctx.fill();const rg=ctx.createRadialGradient(p.sx,hy+p.u*.2,0,p.sx,hy+p.u*.2,p.u*3);rg.addColorStop(0,nrgba(col,.8));rg.addColorStop(.3,nrgba(col,.3));rg.addColorStop(1,nrgba(col,0));ctx.fillStyle=rg;ctx.fillRect(p.sx-p.u*3,hy-p.u*3,p.u*6,p.u*6);ctx.restore()}}})}
const RT_POOLS=[[CX-8,10,'255,144,64'],[CX+9,24,'144,216,232'],[CX-7,38,'255,144,64'],[CX+8,52,'255,79,216'],[CX-9,66,'144,216,232'],[CX+7,80,'255,144,64'],[CX-6,94,'198,242,58']];
const RT_SPR={};
function routePools(ymin,ymax){ctx.save();ctx.globalCompositeOperation='lighter';
  for(const [x,y,rgb] of RT_POOLS){if(y<ymin-10||y>ymax+10)continue;let sp=RT_SPR[rgb];if(!sp){sp=RT_SPR[rgb]=document.createElement('canvas');sp.width=sp.height=128;const g=sp.getContext('2d'),gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba('+rgb+',.24)');gr.addColorStop(.6,'rgba('+rgb+',.15)');gr.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=gr;g.fillRect(0,0,128,128)}
    const c=P(x,y),f=P(x,y+11),rx=15*c.u,ry=Math.max(6,Math.abs(c.sy-f.sy)*.62);ctx.drawImage(sp,c.sx-rx,c.sy-ry,rx*2,ry*2)}
  ctx.restore()}
function drawRouteShell(ymin,ymax){if(RT2()){shipShell(ymin,ymax);return}routePools(ymin,ymax);const y0=cam.y-22,y1=WFAR+1;
  // curb: concrete with an amber paint edge
  const c0=Math.max(y0,NFAR),c1=Math.min(y1,WFAR);quad(-1.4,c0,-.05,c1,'#3a4249');quad(FW+.05,c0,FW+1.4,c1,'#3a4249');ctx.save();ctx.globalAlpha=.7;quad(-.3,c0,-.05,c1,'#ffb347');quad(FW+.05,c0,FW+.3,c1,'#ffb347');ctx.restore();
  routeSideWall(y0,y1);routeProps(y0,y1);routeLamps(y0,y1,'n');routeLamps(y0,y1,'l')}
/* v3.10 SKY LIGHTS: with the low runner camera the top of the screen was dark wall. A glow band above the horizon and four slow searchlight beams
   in the town's two colours fill it (look only; the glow stays with LITE EFFECTS, the beams do not). */
function skyGlow(){if(CAMR<.05||camMode()==='side')return;const th=flTheme(),h0=horY(),t=performance.now()/1000,lite=document.body.classList.contains('lite');
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=CAMR;
  const g=ctx.createLinearGradient(0,h0-H*.34,0,h0);g.addColorStop(0,th.b+'00');g.addColorStop(.6,th.b+'2e');g.addColorStop(1,th.a+'5c');ctx.fillStyle=g;ctx.fillRect(0,h0-H*.34,W,H*.34);
  if(!lite)for(let i=0;i<4;i++){const x=W*(.14+i*.24),a=Math.sin(t*.35+i*1.9)*.32,col=i%2?th.a:th.b,L=H*.5,w=W*.035,dx=Math.sin(a)*L,dy=-Math.cos(a)*L;
    const bg=ctx.createLinearGradient(x,h0,x+dx,h0+dy);bg.addColorStop(0,col+'66');bg.addColorStop(1,col+'00');ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(x-w*.2,h0);ctx.lineTo(x+w*.2,h0);ctx.lineTo(x+dx+w,h0+dy);ctx.lineTo(x+dx-w,h0+dy);ctx.closePath();ctx.fill()}
  ctx.restore()}
function drawField(){
  const side=camMode()==='side',shellOn=!side&&LAND;
  let ymin,ymax;
  if(side){const Us=W/26*cam.zoom;ymin=cam.y-W*.4/Us-6;ymax=cam.y+W*.6/Us+6;const sg=ctx.createLinearGradient(0,0,0,H);sg.addColorStop(0,'#5a3a38');sg.addColorStop(1,'#2b2230');ctx.fillStyle=sg;ctx.fillRect(0,0,W,H)}
  else{ymin=cam.y-22;{const kk=H*MY*D2*cam.zoom,sH=(horY()+3-(H*FOCF-kk))/kk;ymax=Math.min(cam.y+110,sH>.02?cam.y+D2*(1/sH-1):cam.y+110);
    if(LAND){WALLY=WFAR;ymax=Math.min(ymax,WFAR+1)}else WALLY=113}ctx.fillStyle='#0b0918';ctx.fillRect(0,0,W,H);if(shellOn){if(RT())routeSky();else skyFixed()}else{drawBackdrop();quad(-400,108,FW+400,900,'#0b0918')}}
  if(LAND){const s0=Math.max(-10,Math.floor(ymin/5)*5);for(let y=s0;y<110&&y<ymax;y+=5){const a=Math.max(y,ymin),b=y+5;if(b<=a)continue;const alt=Math.round(y/5)%2===0;quad(-90,a,FW+90,b,turfCol(y,alt))}}   // the ground runs on past the boundary, so the sidelines only show when you are near them
  for(const sd of [0,1]){ctx.globalAlpha=LAND?sideVis[sd]:1;if(!sd){quad(-400,ymin,-6,ymax,cz('#120f26','#10151a'));quad(-6,ymin,0,ymax,cz('#18223a','#3a342c'));quad(-24,ymin,-6,ymax,cz('#1c1736','#15191e'))}else{quad(FW+6,ymin,FW+400,ymax,cz('#120f26','#10151a'));quad(FW,ymin,FW+6,ymax,cz('#18223a','#3a342c'));quad(FW+6,ymin,FW+24,ymax,cz('#1c1736','#15191e'))}}ctx.globalAlpha=1;if(RT2()&&LAND){for(const sd of [0,1]){ctx.globalAlpha=sideVis[sd];if(sd)quad(FW,ymin,FW+6.4,ymax,SHIPCFG.gutter);else quad(-6.4,ymin,0,ymax,SHIPCFG.gutter)}ctx.globalAlpha=1}if(shellOn){drawAprons();drawBackCached();skyGlow()}else{if(!side||ymax>112)quad(-24,110,FW+24,Math.max(126,WALLY+2),cz('#1c1736','#15191e'));
  if(!side){sideBegin();drawSurround();sideEnd()}
  drawHolos();
  drawBoards(ymin,ymax)}
  const s0=Math.max(-10,Math.floor(ymin/5)*5);
  for(let y=s0;y<110&&y<ymax;y+=5){const a=Math.max(y,ymin),b=y+5;if(b<=a)continue;
    const alt=Math.round(y/5)%2===0;let col;
    col=turfCol(y,alt);
    quad(0,a,FW,b,col)}
  if(!side){const h0=horY();if(!drawField._hg||drawField._hh!==H||drawField._h0!==h0){drawField._hh=H;drawField._h0=h0;const lg=ctx.createLinearGradient(0,h0,0,h0+H*.34);lg.addColorStop(0,'rgba(80,130,185,.15)');lg.addColorStop(1,'rgba(80,130,185,0)');drawField._hg=lg}ctx.fillStyle=drawField._hg;ctx.fillRect(0,h0,W,H*.34)}   // the far turf was nearly black: a gentle cool lift so far players stay readable
  if(RT2()){shipSeams(ymin,ymax);shipGrates(ymin,ymax)}drawFieldDeco(ymin,ymax);
  drawTurfDetail(ymin,ymax);drawBakedScuffs(ymin,ymax);if(!shellOn){drawShadowBand(ymin,ymax);drawLightPools(ymin,ymax);drawSideBarrier(ymin,ymax);drawSideWall(ymin,ymax)}
  const ln=(y,col,w,al)=>{if(y<ymin||y>ymax)return;ctx.globalAlpha=al||1;quad(0,y,FW,y+w,col);ctx.globalAlpha=1};
  if(!RT())for(let x=5;x<FW-4;x+=6.5)quad(x,Math.max(ymin,-10),x+.12,Math.min(ymax,110),'rgba(39,224,255,.08)');   // faint glowing grid
  for(let y=0;y<=100;y+=5){if(y<ymin||y>ymax)continue;const gl=y===0||y===100;if(side){ln(y,gl?cz('#ff4fd8','#ffb347'):cz('#27e0ff','#ffa63a'),gl?1.1:.6,.12);ln(y,gl?cz('#ff9be8','#ffd9a0'):cz('#9ff6ff','#ffc971'),gl?.5:.22,y%10===0?.95:.6)}else{if(RT2()||RT3())lnChip(y,RT3()?'#D3CCC1':'#E8E2D0',(gl||y%10===0)?.42:.2,.95,ymin,ymax);else{lnChip(y,gl?cz('#ff4fd8','#ffb347'):cz('#27e0ff','#ffa63a'),gl?1.6:1.3,.2,ymin,ymax);lnChip(y,gl?cz('#ffd6f4','#ffe6bd'):cz('#eafcff','#ffe2b0'),gl?.6:.45,y%10===0?1:.85,ymin,ymax)   /* v3.10: yard lines twice as thick, near-white, wider glow */}}}
  ctx.globalAlpha=LAND?sideVis[0]:1;quad(-1.8,Math.max(ymin,-10),1.6,Math.min(ymax,110),cz('rgba(39,224,255,.32)','rgba(255,170,60,.26)'));quad(-.5,Math.max(ymin,-10),.4,Math.min(ymax,110),cz('#9ff6ff','#ffc971'));ctx.globalAlpha=LAND?sideVis[1]:1;quad(FW-1.6,Math.max(ymin,-10),FW+1.8,Math.min(ymax,110),cz('rgba(255,47,168,.32)','rgba(255,170,60,.26)'));   /* v3.10: glowing sideline strips */quad(FW-.4,Math.max(ymin,-10),FW+.5,Math.min(ymax,110),cz('#ff9be8','#ffd9a0'));ctx.globalAlpha=1;
  for(let y=10;y<=90;y+=10){const dn=y+1.2-cam.y;if(y<ymin||y>ymax||dn>20||dn<-5)continue;const al=dn<12?1:clamp((20-dn)/8,0,1);   // yard numerals fade out past ~20 yards and shrink with the same projection as everything else
    for(const xx of [5,FW-5]){const p=P(xx,y+1.2),q=P(xx,y+3.2),vs=clamp(Math.abs(q.sy-p.sy)/(2*p.u),.2,1),fsz=p.u*3.4;   /* v3.10: yard numbers twice the size, moved in from the sideline */if(fsz<5)continue;const nn=String(y>50?100-y:y);
      ctx.save();ctx.globalAlpha=al;ctx.translate(p.sx,p.sy);ctx.scale(1,vs);ctx.font='400 '+fsz+'px "Bowlby One",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=RT2()?'rgba(138,75,47,.3)':cz('rgba(255,47,168,.55)','rgba(0,0,0,.35)');ctx.fillText(nn,RT2()?1:1.5,RT2()?1:1.5);ctx.fillStyle=RT3()?'rgba(232,226,208,.72)':RT2()?'#F2EFE6':cz('rgba(159,246,255,.9)','rgba(255,196,110,.62)');ctx.fillText(nn,0,0);if(RT2()){ctx.fillStyle=(Math.round(y/5)%2===0)?SHIPCFG.deck[0]:SHIPCFG.deck[1];const bw=fsz*(nn.length>1?1.7:.9);ctx.fillRect(-bw/2,-fsz*.03,bw,Math.max(1,fsz*.07))}ctx.restore()}}
  if(G){if(SIMV.on){ln(SIMV.cf>-50?SIMV.cf:-99,'#ffd23a',.45,.95);ln(SIMV.cl,'#2f6bff',.45,.95)}else{ln(G.ltg<=100?G.ltg:-99,'#ffd23a',.45,.95);ln(F?F.los:G.los,'#2f6bff',.45,.95)}ln(100,'#ff3b30',.5,.9)}
  for(let y=Math.max(1,Math.ceil(ymin),Math.ceil(cam.y-4));y<Math.min(100,ymax);y++){for(const xx of [CX-3.5,CX+3.5]){quad(xx,y,xx+(RT2()?.6:.5),y+(RT2()?.36:.3),RT3()?'rgba(211,204,193,.55)':RT2()?'rgba(232,226,208,.6)':cz('rgba(159,246,255,.5)','rgba(255,190,100,.45)'))}}
  drawMidLogo(ymin,ymax);drawEZLogos(ymin,ymax);   // the dashed centre hash column runs UNDER the midfield logo
  if(shellOn&&RT()){drawRouteShell(ymin,ymax)}
  else if(shellOn){drawShadowTowers(ymin,ymax);drawLightPools(ymin,ymax);{const y0=cam.y-22,y1=WFAR+1,o=window.__only;if(!o||o==='curb')drawEdge(y0,y1,'n');if(!o||o==='wall')drawSideWall(y0,y1);if(!o||o==='props')drawProps(y0,y1);if(!o){drawLamps(y0,y1,'n');drawLamps(y0,y1,'l');drawEdge(y0,y1,'l')}}}   // the screen-fixed shell: walls, curbs, props, rigs, lamp posts, shadow, pools and haze
  else{drawEdge(ymin,ymax);drawProps(ymin,ymax);drawLamps(ymin,ymax);
  sideBegin();drawWallFrame();sideEnd(true)}
}

const RAIN=(()=>{const r=mulberry(5),a=[];for(let i=0;i<70;i++)a.push([r(),r(),.6+r()*.8]);return a})();
function drawAtmos(){
  if(window.__norain)return;
  if(RT3()){const t=performance.now()/1000;ctx.strokeStyle='rgba(232,226,208,.16)';ctx.lineWidth=1.2;ctx.beginPath();for(const d of RAIN.slice(0,26)){const x=((d[0]*W+t*160*d[2])%(W+80))-40,y=d[1]*H,l=18+d[2]*26;ctx.moveTo(x,y);ctx.lineTo(x+l,y-l*.06)}ctx.stroke();return}
  if(RT2()){if(!bmLite()){const t=performance.now()/1000;ctx.save();ctx.strokeStyle='rgba(220,235,248,.22)';ctx.lineWidth=1.5;for(let i=0;i<3;i++){const gx=((t*24+i*W*.37)%(W+80))-40,gy=H*(.09+i*.035)+Math.sin(t*2+i)*6,fl=Math.sin(t*6+i*2)*3;ctx.beginPath();ctx.moveTo(gx-8,gy+fl);ctx.quadraticCurveTo(gx-3,gy-3,gx,gy);ctx.quadraticCurveTo(gx+3,gy-3,gx+8,gy+fl);ctx.stroke()}const _mpH=!!(G&&Math.max(G.you||0,G.opp||0)>=(G.target||15)-7);ctx.fillStyle=_mpH?'rgba(190,220,242,.15)':'rgba(190,215,235,.07)';ctx.fillRect(0,H*.14+Math.sin(t*.4)*8,W,H*(_mpH?.16:.11));ctx.restore()}return}
  const t=performance.now()/1000,sp=camMode()==='side'?0:1;
  // wet street: the magenta glow of the signs reflected in the far end of the field
  if(sp&&!RT()){const hy=horY();if(!drawAtmos._wg||drawAtmos._wh!==H||drawAtmos._hy!==hy){drawAtmos._wh=H;drawAtmos._hy=hy;const gr=ctx.createLinearGradient(0,hy-H*.06,0,hy+H*.2);gr.addColorStop(0,'rgba(255,47,168,0)');gr.addColorStop(.23,'rgba(255,47,168,.20)');gr.addColorStop(1,'rgba(255,47,168,0)');drawAtmos._wg=gr}ctx.save();ctx.fillStyle=drawAtmos._wg;ctx.fillRect(0,hy-H*.06,W,H*.26);if(F&&F.los>=75){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.45;ctx.fillRect(0,hy-H*.06,W,H*.26)}ctx.restore()}
  // Bespoke venue ambient storytelling: Vapor City rising sideline steam / Spillway warm dust motes (Sprint 3)
  if(!bmLite()&&sp){
    if(!RT()){ctx.save();for(let i=0;i<5;i++){const sx=i%2?W*.06+i*6:W*.94-i*6,sy=H*.68-((t*28+i*53)%(H*.36)),al=.12*Math.sin(((t*28+i*53)%(H*.36))/(H*.36)*Math.PI);ctx.fillStyle='rgba(255,210,165,'+al.toFixed(3)+')';ctx.beginPath();ctx.arc(sx+Math.sin(t*1.5+i)*8,sy,10+i*2.5,0,TAU);ctx.fill()}ctx.restore()}
    else{ctx.save();ctx.fillStyle='rgba(255,194,102,.22)';for(let i=0;i<14;i++){const mx=((i*97+t*18*(.6+(i%3)*.3))%W),my=((i*53+Math.sin(t+i)*18+H*.2)%(H*.65));ctx.fillRect(mx,my,2,2)}ctx.restore()}
  }
  // rain (escalates to neon downpour on match point)
  const _mpR=!!(G&&Math.max(G.you||0,G.opp||0)>=(G.target||15)-7);
  ctx.strokeStyle=_mpR?'rgba(159,246,255,.34)':'rgba(180,215,255,.22)';ctx.lineWidth=_mpR?1.35:1;ctx.beginPath();
  for(const d of RAIN){const _sp=_mpR?590:420,x=((d[0]*W+t*(_mpR?95:60)*d[2])%(W+40))-20,y=((d[1]*H+t*_sp*d[2])%(H+40))-20,l=(_mpR?14:10)+d[2]*(_mpR?18:14);ctx.moveTo(x,y);ctx.lineTo(x-l*.22,y+l)}
  ctx.stroke();
}
function drawHolos(){
  if(camMode()==='side')return;
  if(LAND&&WALLY-cam.y>=46)return;const t=performance.now()/1000,pr=P(CX,LAND?WALLY-.5:113);
  const defs=[[-13,13,12,6,'#27e0ff',0],[0,17,14,7.5,'#ff2fa8',1],[13,12,12,6,'#9b5cff',2]];
  for(const [dx,h,pw,ph,col,k] of defs){const x=pr.sx+dx*pr.u,y=pr.sy-h*pr.u,w=pw*pr.u,hh=ph*pr.u,fl=.75+.15*Math.sin(t*4+k*2)+(Math.sin(t*19+k*7)>.97?-.35:0);
    const gr=ctx.createLinearGradient(x,y,x,y+hh);gr.addColorStop(0,nrgba(col,.5*fl));gr.addColorStop(1,nrgba(col,.12*fl));ctx.fillStyle=gr;ctx.fillRect(x-w/2,y,w,hh);
    ctx.strokeStyle=nrgba(col,.95*fl);ctx.lineWidth=1.6;ctx.strokeRect(x-w/2,y,w,hh);ctx.fillStyle=scanPat();ctx.fillRect(x-w/2,y,w,hh);
    const _signs=RT2()?['HARBOR','DRY DOCK','STEEL']:RT3()?['GULLS','REACH','TIDE']:RT()?['FLOODWAY','SPILLWAY','RUN']:['VAPOR','CIRCUIT','DUSK'];neonText(_signs[k%3],x,y+hh/2,Math.max(10,hh*.42),col,false,fl)}
}

/* The near end of each sideline wall is off the edge of the screen, so we carry it down the screen sides: a corridor wall that rushes past the camera, drawn behind the players. */
function drawWallFrame(){
  if(camMode()==='side')return;
  const HR=horY(),U0=WU*U0F*cam.zoom,t=performance.now()/1000,N=12;
  for(const left of [true,false]){
    const xw=left?-2.5:FW+2.5,dist=Math.max(.5,Math.abs(xw-cam.x))*U0,se=(W/2)/dist;
    if(se>=1.2||(LAND&&D2>50))continue;   // the wedge of wall panels was drawn for the old, steeper camera; the flatter camera uses the barrier wall instead
    const sye=syScale(se),fwb=W*.27,col=left?STAD.cy:STAD.mg,col2=left?STAD.mg:STAD.cy;
    const xi=i=>fwb*Math.pow(i/N,1.3),yi=i=>sye+(H+10-sye)*i/N;
    ctx.save();if(!left){ctx.translate(W,0);ctx.scale(-1,1)}
    ctx.beginPath();ctx.moveTo(0,sye);for(let i=1;i<=N;i++)ctx.lineTo(xi(i),yi(i));ctx.lineTo(0,H+10);ctx.closePath();{const fg=ctx.createLinearGradient(0,H*.4,0,H*.58);fg.addColorStop(0,'#120e26');fg.addColorStop(1,'rgba(18,14,38,0)');ctx.fillStyle=fg;ctx.fill()}
    const xAt=y=>fwb*Math.pow(Math.max(0,(y-sye)/(H+10-sye)),1.3);
    // panels, seams and big screens, spaced like the receding wall so they swell toward the bottom
    let prev=sye;
    for(let j=1;j<9;j++){
      const sj=se*Math.pow(1.4,j),yj=syScale(sj);if(prev>H*.6)break;const uj=U0*sj;
      ctx.strokeStyle='rgba(0,0,0,.55)';ctx.lineWidth=Math.max(1.5,uj*.09);ctx.beginPath();ctx.moveTo(0,yj);ctx.lineTo(xAt(yj),yj);ctx.stroke();
      if(j%2===0&&yj-prev>30&&yj<H*.58){const mid=(yj+prev)/2,xm=xAt(mid),x0=xm*.14,x1=xm*.92,y0=prev+(yj-prev)*.18,y1=yj-(yj-prev)*.18,fl=.8+.12*Math.sin(t*3+j)+(Math.sin(t*17+j*3)>.985?-.35:0),sc=BOARDC[(j*2+(left?0:3))%6];
        if(x1-x0>30){ctx.fillStyle='#05040c';ctx.fillRect(x0-3,y0-3,x1-x0+6,y1-y0+6);ctx.fillStyle=nrgba(sc,.72*fl);ctx.fillRect(x0,y0,x1-x0,y1-y0);ctx.fillStyle=scanPat();ctx.fillRect(x0,y0,x1-x0,y1-y0);
          ctx.save();ctx.translate((x0+x1)/2,(y0+y1)/2);if(!left)ctx.scale(-1,1);neonText(STAD.kanji[(j*3+(left?1:6))%16],0,0,Math.min((y1-y0)*.7,(x1-x0)*.9),'#ffffff',false,fl);ctx.restore();
          ctx.strokeStyle=nrgba(sc,.9*fl);ctx.lineWidth=2;ctx.strokeRect(x0,y0,x1-x0,y1-y0)}}
      prev=yj;
    }
    ctx.restore();
    // neon strips running along the foot of the wall, drawn over the clip so they glow past it
    ctx.save();if(!left){ctx.translate(W,0);ctx.scale(-1,1)}
    {const sg=ctx.createLinearGradient(0,H*.46,0,H*.66);sg.addColorStop(0,col);sg.addColorStop(1,nrgba(col,0));const sg2=ctx.createLinearGradient(0,H*.46,0,H*.66);sg2.addColorStop(0,nrgba(col,.28));sg2.addColorStop(1,nrgba(col,0));
    }
    ctx.restore();
  }
}
function drawLane(){if(!LANE||!F||window.__noplayers)return;const pl=PLAYS[G.sel];if(!pl)return;
  if(pl.kind==='run'&&pl.aim&&(F.mode==='pre'||F.mode==='live')){let a=.4;if(F.mode==='live'){if(F.handed){const e=F.t-(F.hT||F.t);a=.4*(1-e/.5)}if(a<=.02)a=0}
    if(a>0){const x=CX+F.fx*pl.aim[0];ctx.save();ctx.globalAlpha=a;ctx.strokeStyle='#ffd23a';ctx.lineCap='round';ctx.lineJoin='round';
      for(const dy of [.6,2.1,3.6]){const c=P(x,F.los+dy),l=P(x-.9,F.los+dy-.8),r=P(x+.9,F.los+dy-.8);ctx.lineWidth=Math.max(2,c.u*.28);ctx.beginPath();ctx.moveTo(l.sx,l.sy);ctx.lineTo(c.sx,c.sy);ctx.lineTo(r.sx,r.sy);ctx.stroke()}ctx.restore()}}
  {const Q=F.off&&F.off.QB;if(ROUTES_LIVE>0&&F.mode==='live'&&pl.kind==='pass'&&Q&&F.carrier===Q&&F.passer===Q&&!F.ballAir&&F.t<ROUTES_LIVE){ctx.save();ctx.globalAlpha=.32*(1-F.t/ROUTES_LIVE);ctx.lineWidth=2;ctx.setLineDash([6,6]);ctx.lineCap='round';   // v3.16FF3
    for(const r of ['WR1','WR2','TE','RB']){const p=F.off[r];if(!p||p.mode!=='route'||!p.route||p.ri>=p.route.length)continue;ctx.strokeStyle=ROLECOL[r];ctx.beginPath();let q=P(p.x,p.y);ctx.moveTo(q.sx,q.sy);for(let i=p.ri;i<p.route.length;i++){q=P(p.route[i][0],p.route[i][1]);ctx.lineTo(q.sx,q.sy)}ctx.stroke()}ctx.restore()}}
  const Q=F.off&&F.off.QB;if(F.mode==='live'&&pl.kind==='pass'&&Q&&F.carrier===Q&&F.passer===Q&&!F.ballAir){ctx.save();ctx.strokeStyle='#ff4d4d';ctx.globalAlpha=.6;
    for(const d of F.def){if(!d.rush||d.eng||d.fall||d.stun>0)continue;if(Math.hypot(d.x-Q.x,d.y-Q.y)>5)continue;const pr=P(d.x,d.y);ctx.lineWidth=Math.max(1.5,pr.u*.12);ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,pr.u*.75,pr.u*.75*.42,0,0,7);ctx.stroke()}ctx.restore()}}   // v3.16DD3
function drawRoutes(){
  if(!F||F.mode!=='pre'||!((G.mode==='playcall'&&!$('#sheet').hidden)||(G.mode==='set'&&G.showPlay)))return;
  const pl=PLAYS[G.sel],fx=F.fx;ctx.lineCap='round';ctx.lineJoin='round';
  const line=(pts,col)=>{
    if(pts.length<2)return;
    const proj=pts.map(q=>P(q[0],q[1]));
    const trace=()=>{ctx.beginPath();for(let i=0;i<proj.length;i++){const p=proj[i];i?ctx.lineTo(p.sx,p.sy):ctx.moveTo(p.sx,p.sy)}ctx.stroke()};
    ctx.setLineDash([8,6]);
    ctx.strokeStyle='rgba(8,10,16,.84)';ctx.lineWidth=6;trace();
    ctx.strokeStyle=col;ctx.lineWidth=3;trace();
    ctx.setLineDash([]);
    const a=proj[proj.length-2],b=proj[proj.length-1],ang=Math.atan2(b.sy-a.sy,b.sx-a.sx),sz=9;
    ctx.fillStyle=col;ctx.strokeStyle='rgba(8,10,16,.86)';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(b.sx,b.sy);ctx.lineTo(b.sx-Math.cos(ang-.52)*sz,b.sy-Math.sin(ang-.52)*sz);ctx.lineTo(b.sx-Math.cos(ang+.52)*sz,b.sy-Math.sin(ang+.52)*sz);ctx.closePath();ctx.fill();ctx.stroke();
  };
  if(pl.routes)for(const r in pl.routes){const p=F.off[r];line([[p.x,p.y],...pl.routes[r].map(q=>[p.sx0+fx*q[0]*LAT,Math.min(p.sy0+q[1],109)])],ROLECOL[r])}
  if(pl.arrow)line(pl.arrow.map(q=>[CX+fx*q[0],G.los+q[1]]),ROLECOL.RB);
  ctx.setLineDash([]);
}

/* ============================ rendering: people ============================ */
/*MODEL-START*/
let SKINC=null,SLV=false;
function limb(g,pts,w,col,S){
  g.lineCap='round';g.lineJoin='round';
  g.strokeStyle=g.__off?(col===SKINC?'rgba(0,0,0,0)':SLV?'rgba(20,10,5,.6)':'rgba(0,0,0,.3)'):'rgba(0,0,0,.6)';g.lineWidth=w+(g.__off?Math.max(SLV?1.1:.8,S*(SLV?.26:.14)):Math.max(1.2,S*.34));g.beginPath();pts.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke();
  g.strokeStyle=col;g.lineWidth=w;g.beginPath();pts.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke();
}
function ballBody(g,rx,ry,S,spin,showLaces,thin){
  const ol='#1a0c05';
  g.beginPath();g.moveTo(-rx,0);g.bezierCurveTo(-rx*.7,-ry*1.38,rx*.7,-ry*1.38,rx,0);g.bezierCurveTo(rx*.7,ry*1.38,-rx*.7,ry*1.38,-rx,0);g.closePath();
  const gr=g.createLinearGradient(0,-ry,0,ry);gr.addColorStop(0,'#c8773a');gr.addColorStop(.45,'#9a5126');gr.addColorStop(1,'#4d230d');g.fillStyle=gr;g.fill();
  g.save();g.clip();
  g.fillStyle='#f4efe6';for(const e of [-1,1]){g.fillRect(e*rx*.66-S*.13,-ry*1.5,S*.26,ry*3);g.fillRect(e*rx*.8-S*.1,-ry*1.5,S*.2,ry*3)}   // the two white end stripes
  g.fillStyle='rgba(255,230,190,.35)';g.beginPath();g.ellipse(-rx*.15,-ry*.55,rx*.5,ry*.22,0,0,7);g.fill();   // shine
  g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(rx*.1,ry*.9,rx*.9,ry*.4,0,0,7);g.fill();
  g.restore();
  if(showLaces){const ly=-ry*.2+Math.sin(spin||0)*ry*.1;g.strokeStyle='#f4efe6';g.lineWidth=Math.max(1,S*.14);g.lineCap='round';g.beginPath();g.moveTo(-rx*.34,ly);g.lineTo(rx*.34,ly);for(let i=-2;i<=2;i++){g.moveTo(i*rx*.14,ly-ry*.2);g.lineTo(i*rx*.14,ly+ry*.2)}g.stroke()}
  g.lineJoin='round';
  g.beginPath();g.moveTo(-rx,0);g.bezierCurveTo(-rx*.7,-ry*1.38,rx*.7,-ry*1.38,rx,0);g.bezierCurveTo(rx*.7,ry*1.38,-rx*.7,ry*1.38,-rx,0);g.closePath();
  if(ART.on){g.strokeStyle=ol;g.lineWidth=1;g.stroke();g.strokeStyle='rgba(255,236,200,.55)';g.lineWidth=1;g.beginPath();g.ellipse(-rx*.1,-ry*.35,rx*.55,ry*.28,0,Math.PI*1.1,Math.PI*1.9);g.stroke();return}   // a 1 px dark edge and a highlight, no white ring
  if(thin){const dk=Math.max(.8,S*.15),wt=Math.max(.8,S*.2);g.strokeStyle='#fff';g.lineWidth=dk+2*wt;g.stroke();g.strokeStyle=ol;g.lineWidth=dk;g.stroke()}   // carry ball: a thin white edge, about 1 px at 52 px tall
  else{g.strokeStyle='#fff';g.lineWidth=Math.max(1.6,S*.26);g.stroke();g.strokeStyle=ol;g.lineWidth=Math.max(.9,S*.12);g.stroke()}
}
function ballFly(g,x,y,len,ang,spin){   // a ball in the air: laces roll smoothly around the long axis, no white ring
  const rx=len/2,ry=len*.27;g.save();g.translate(x,y);g.rotate(ang);
  const body=()=>{g.beginPath();g.moveTo(-rx,0);g.bezierCurveTo(-rx*.7,-ry*1.38,rx*.7,-ry*1.38,rx,0);g.bezierCurveTo(rx*.7,ry*1.38,-rx*.7,ry*1.38,-rx,0);g.closePath()};
  body();const gr=g.createLinearGradient(0,-ry,0,ry);gr.addColorStop(0,'#c8773a');gr.addColorStop(.45,'#9a5126');gr.addColorStop(1,'#4d230d');g.fillStyle=gr;g.fill();
  g.save();g.clip();
  g.fillStyle='#f4efe6';for(const e of[-1,1]){g.fillRect(e*rx*.62-len*.026,-ry*1.5,len*.052,ry*3);g.fillRect(e*rx*.78-len*.02,-ry*1.5,len*.04,ry*3)}
  g.restore();
  const c=Math.cos(spin),sn=Math.sin(spin),ly=sn*ry*.78,wid=Math.max(.15,c);   // the laces ride around the ball: across the width by sin, fading and thinning toward the far side
  if(c>-.35){g.globalAlpha=Math.max(0,Math.min(1,(c+.35)/.6));g.strokeStyle='#f4efe6';g.lineWidth=Math.max(1,len*.04);g.lineCap='round';g.beginPath();g.moveTo(-rx*.3,ly);g.lineTo(rx*.3,ly);for(let i=-2;i<=2;i++){g.moveTo(i*rx*.13,ly-ry*.22*wid);g.lineTo(i*rx*.13,ly+ry*.22*wid)}g.stroke();g.globalAlpha=1}
  g.fillStyle='rgba(255,230,190,.3)';g.beginPath();g.ellipse(-rx*.15,-ry*.5,rx*.5,ry*.2,0,0,7);g.fill();
  body();g.strokeStyle='#1a0c05';g.lineWidth=1;g.lineJoin='round';g.stroke();
  g.restore()}
function ballSpiral(g,x,y,S,ang,spin,long){
  g.save();g.translate(x,y);g.rotate(ang);
  S*=1.3;const c=Math.cos(spin);ballBody(g,S*(long?1.9:1.3),S*(long?.82:.9),S,spin,c>-.2);
  g.restore();
}
function ballShape(g,x,y,S,rot,thin){S*=1.3;g.save();g.translate(x,y);if(!thin){g.fillStyle='rgba(0,0,0,.32)';g.beginPath();g.ellipse(S*.25,S*.7,S*1.6,S*.5,0,0,7);g.fill()}g.rotate(rot||0);ballBody(g,S*1.75,S*.82,S,0,true,thin);g.restore()}
function starShape(g,x,y,r,col){g.save();g.translate(x,y);g.scale(1,.5);g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*TAU/10,rr=i%2?r*.45:r;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}g.closePath();g.fillStyle=col;g.fill();g.lineWidth=Math.max(1.5,r*.14);g.strokeStyle='#000';g.stroke();g.restore()}
/* A cartoon hand: a palm with a heel, three tapered fingers and a thumb in two pieces, knuckle lines and a thin outline. */
function drawHand(g,A,sgn,S,col,back){
  S*=.62;
  let ux=A.hand.x-A.elbow.x,uy=A.hand.y-A.elbow.y;const um=Math.hypot(ux,uy);if(um<.01){ux=0;uy=1}else{ux/=um;uy/=um}
  const ol=g.__off?'rgba(0,0,0,0)':'rgba(20,12,8,.85)',od=S*.2,dark=shade(col,-.22);
  g.save();g.translate(A.hand.x,A.hand.y);g.rotate(Math.atan2(uy,ux)-Math.PI/2);g.lineJoin='round';g.lineCap='round';
  const th=-sgn;   // thumb sits on the inner side
  const caps=[[-.5*S,.8*S,-.56*S,1.5*S,.58*S],[0,.85*S,0,1.65*S,.6*S],[.5*S,.8*S,.56*S,1.5*S,.58*S],[th*.78*S,.2*S,th*1.2*S,.95*S,.66*S]];
  if(back)caps.pop();   // seen from behind the thumb is tucked out of sight
  for(const c of caps){g.strokeStyle=ol;g.lineWidth=c[4]+od*2;g.beginPath();g.moveTo(c[0],c[1]);g.lineTo(c[2],c[3]);g.stroke()}
  g.fillStyle=ol;g.beginPath();g.ellipse(0,.45*S,.88*S+od,.82*S+od,0,0,7);g.fill();
  for(const c of caps){g.strokeStyle=col;g.lineWidth=c[4];g.beginPath();g.moveTo(c[0],c[1]);g.lineTo(c[2],c[3]);g.stroke()}
  g.fillStyle=col;g.beginPath();g.ellipse(0,.45*S,.88*S,.82*S,0,0,7);g.fill();
  g.strokeStyle='rgba(60,25,10,.45)';g.lineWidth=Math.max(.8,S*.13);   // finger gaps, thumb crease, knuckles
  g.beginPath();g.moveTo(-.26*S,1.15*S);g.lineTo(-.28*S,1.6*S);g.moveTo(.26*S,1.15*S);g.lineTo(.28*S,1.6*S);
  if(back){g.stroke();g.fillStyle=dark;g.globalAlpha=.5;for(const kx of [-.5,0,.5]){g.beginPath();g.ellipse(kx*S,.95*S,.17*S,.12*S,0,0,7);g.fill()}g.globalAlpha=1;g.strokeStyle='rgba(60,25,10,.3)';g.beginPath();g.moveTo(-.35*S,.3*S);g.lineTo(.35*S,.3*S);g.stroke()}   // knuckles and tendons on the back of the hand
  else{g.moveTo(th*.35*S,.55*S);g.quadraticCurveTo(th*.7*S,.75*S,th*.95*S,.7*S);g.stroke()}
  g.fillStyle=dark;g.globalAlpha=.25;g.beginPath();g.ellipse(.25*S,.7*S,.6*S,.5*S,0,0,7);g.fill();g.globalAlpha=1;
  g.restore();
}
const lumOf=c=>{const n=parseInt(String(c).slice(1),16)||0;return(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255};
function drawCleat(g,x,y,S,view,flip,col,acc){
  g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';
  const dark=lumOf(col)<.25;   // dark cleats keep their colour but get a thin light outline, a light sole line and a toe highlight
  const ol=dark?'rgba(255,255,255,.5)':(g.__off?'rgba(0,0,0,.25)':'rgba(15,10,8,.85)'),lw=dark?Math.max(1,S*.13):Math.max(1,S*.3),lt=dark?'#3a3a40':(acc||shade(col,.12)),sole=dark?'#55575e':'#2c2c30',stud='#2b2b2b',sd=view==='s';
  if(sd){g.scale(flip,1);
    g.fillStyle=stud;for(const u of [-.55,.25,1.0]){g.beginPath();g.moveTo((u-.17)*S,.55*S);g.lineTo((u+.17)*S,.55*S);g.lineTo((u+.1)*S,.85*S);g.lineTo((u-.1)*S,.85*S);g.closePath();g.fill()}
    g.beginPath();g.moveTo(-.95*S,.52*S);g.lineTo(-1.02*S,-.2*S);g.quadraticCurveTo(-1.0*S,-.72*S,-.45*S,-.72*S);g.lineTo(.2*S,-.7*S);g.quadraticCurveTo(.45*S,-.3*S,.95*S,-.12*S);g.quadraticCurveTo(1.6*S,.0*S,1.6*S,.38*S);g.lineTo(1.55*S,.55*S);g.closePath();
    g.fillStyle=col;g.fill();g.strokeStyle=ol;g.lineWidth=lw;g.stroke();
    g.fillStyle=lt;g.beginPath();g.moveTo(.95*S,-.1*S);g.quadraticCurveTo(1.55*S,0,1.57*S,.36*S);g.lineTo(.8*S,.36*S);g.quadraticCurveTo(.85*S,.1*S,.95*S,-.1*S);g.fill();if(dark){g.fillStyle='rgba(255,255,255,.35)';g.fillRect(1.0*S,-.02*S,.35*S,.1*S)}
    g.fillStyle=sole;g.fillRect(-.97*S,.38*S,2.55*S,dark?.14*S:.22*S);g.strokeRect(-.97*S,.38*S,2.55*S,dark?.14*S:.22*S);
    g.strokeStyle='#fff';g.lineWidth=Math.max(.8,S*.14);g.beginPath();g.moveTo(.0*S,-.5*S);g.lineTo(.3*S,-.28*S);g.moveTo(.28*S,-.38*S);g.lineTo(.55*S,-.14*S);g.stroke();
  }else{
    g.fillStyle=stud;for(const u of [-.6,.6]){g.beginPath();g.moveTo((u-.16)*S,.55*S);g.lineTo((u+.16)*S,.55*S);g.lineTo((u+.1)*S,.85*S);g.lineTo((u-.1)*S,.85*S);g.closePath();g.fill()}
    g.beginPath();g.moveTo(-.95*S,.55*S);g.lineTo(-.92*S,-.05*S);g.quadraticCurveTo(-.8*S,-.5*S,0,-.5*S);g.quadraticCurveTo(.8*S,-.5*S,.92*S,-.05*S);g.lineTo(.95*S,.55*S);g.closePath();
    g.fillStyle=col;g.fill();g.strokeStyle=ol;g.lineWidth=lw;g.stroke();
    if(view==='f'&&!dark){g.fillStyle=lt;g.beginPath();g.ellipse(0,.12*S,.62*S,.34*S,0,0,7);g.fill();g.strokeStyle='rgba(15,10,8,.55)';g.lineWidth=Math.max(.7,S*.12);g.stroke();   // toe cap
      g.strokeStyle='#fff';g.lineWidth=Math.max(.7,S*.13);g.beginPath();for(const yy of [-.36,-.2]){g.moveTo(-.3*S,yy*S);g.lineTo(.3*S,(yy+.05)*S)}g.stroke()}   // laces
    g.fillStyle=sole;g.fillRect(-1.0*S,.4*S,2.0*S,dark?.12*S:.22*S);g.strokeRect(-1.0*S,.4*S,2.0*S,dark?.12*S:.22*S);if(dark&&view==='f'){g.fillStyle='rgba(255,255,255,.3)';g.fillRect(-.3*S,-.2*S,.6*S,.08*S)}
    if(view==='f'&&!dark){g.fillStyle=lt;g.beginPath();g.ellipse(0,.12*S,.72*S,.34*S,0,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=Math.max(.8,S*.14);g.beginPath();for(const yy of [-.3,-.1]){g.moveTo(-.3*S,yy*S);g.lineTo(.3*S,yy*S)}g.stroke()}
    else if(!dark){g.fillStyle=lt;g.fillRect(-.28*S,-.45*S,.56*S,.5*S)}
  }
  g.restore();
}
function renderLying(g,o){
  const S=o.S,x=o.x,y=o.y,U=o.uni,L=o.look;SKINC=L.skin;
  const fl=Math.cos(o.rot||0)<0?-1:1,bwd=Math.min(1.25,.85+.2*L.w),dk=lumOf(U.shoe)<.25;   // a clear horizontal body: head at one end, legs out the other
  g.save();g.translate(x,y-S*1.3);g.scale(fl,1);
  const ink=g.__off?'rgba(0,0,0,0)':'rgba(20,12,8,.8)';
  for(const k of [-1,1]){const y0=k*S*1.0*bwd;
    limb(g,[[-S*1.8,y0],[-S*4.4,y0+k*S*.2]],S*1.9,U.pc,S);                         // pants
    limb(g,[[-S*4.2,y0+k*S*.2],[-S*6.1,y0+k*S*.35]],S*1.35,U.sock,S);               // sock
    g.fillStyle=U.shoe;g.fillRect(-S*7.2,y0+k*S*.35-S*.75,S*1.5,S*1.5);             // cleat
    g.strokeStyle=dk?'rgba(255,255,255,.5)':'rgba(15,10,8,.7)';g.lineWidth=Math.max(1,S*.18);g.strokeRect(-S*7.2,y0+k*S*.35-S*.75,S*1.5,S*1.5);
    g.fillStyle=dk?'#55575e':'#2c2c30';g.fillRect(-S*7.2,y0+k*S*.35-S*.75,S*.28,S*1.5)}   // sole
  g.fillStyle=U.pc;g.fillRect(-S*2.4,-S*1.6*bwd,S*1.3,S*3.2*bwd);                    // hips
  const tr=()=>{g.beginPath();g.moveTo(-S*1.4,-S*1.7*bwd);g.quadraticCurveTo(S*1.2,-S*2.1*bwd,S*2.9,-S*2.2*bwd);g.quadraticCurveTo(S*3.5,0,S*2.9,S*2.2*bwd);g.quadraticCurveTo(S*1.2,S*2.1*bwd,-S*1.4,S*1.7*bwd);g.closePath()};
  tr();const gr=g.createLinearGradient(0,-S*2,0,S*2);gr.addColorStop(0,shade(U.jc,.18));gr.addColorStop(.5,U.jc);gr.addColorStop(1,shade(U.jc,-.22));g.fillStyle=gr;g.fill();g.strokeStyle=ink;g.lineWidth=Math.max(1.2,S*.34);g.stroke();
  g.fillStyle=shade(U.jc,.2);g.beginPath();g.ellipse(S*2.4,-S*1.9*bwd,S*1.2,S*.9,0,0,7);g.fill();g.beginPath();g.ellipse(S*2.4,S*1.9*bwd,S*1.2,S*.9,0,0,7);g.fill();   // shoulder pads
  g.strokeStyle=U.jt;g.lineWidth=Math.max(1,S*.42);g.beginPath();g.moveTo(S*.4,-S*1.9*bwd);g.lineTo(S*.4,S*1.9*bwd);g.moveTo(S*1.0,-S*1.95*bwd);g.lineTo(S*1.0,S*1.95*bwd);g.stroke();   // trim bands
  for(const k of [-1,1]){limb(g,[[S*2.6,k*S*2.1*bwd],[S*4.6,k*S*3.2*bwd]],S*1.2,L.skin,S);limb(g,[[S*2.6,k*S*2.1*bwd],[S*3.5,k*S*2.55*bwd]],S*1.6,U.jc,S);g.fillStyle='#d9d6cf';g.beginPath();g.arc(S*4.9,k*S*3.3*bwd,S*.8,0,7);g.fill()}   // arms, sleeves, gloves
  g.save();g.rotate(-Math.PI/2*0);g.font='800 '+S*2.4+'px "Barlow Condensed",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
  g.save();g.translate(-S*.2,0);g.rotate(-Math.PI/2);g.lineWidth=Math.max(2,S*.5);g.strokeStyle='#000';g.strokeText(o.num,0,0);g.fillStyle='#fff';g.fillText(o.num,0,0);g.restore();g.restore();   // the number, laid along the body
  g.fillStyle=L.skin;g.beginPath();g.ellipse(S*5.6,0,S*1.3,S*1.5,0,0,7);g.fill();   // face
  g.fillStyle=U.hc;g.beginPath();g.ellipse(S*4.5,0,S*2.0,S*2.2,0,0,7);g.fill();g.strokeStyle=ink;g.lineWidth=Math.max(1.2,S*.34);g.stroke();   // helmet
  g.fillStyle=U.jt;g.fillRect(S*3.0,-S*.22,S*2.6,S*.44);
  g.strokeStyle=U.mask;g.lineWidth=Math.max(1,S*.3);g.lineCap='round';g.beginPath();for(const yy of [-1,0,1])for(const _ of [0]){g.moveTo(S*5.2,yy*S*.8);g.lineTo(S*6.7,yy*S*.8)}g.moveTo(S*6.7,-S*.8);g.lineTo(S*6.7,S*.8);g.stroke();   // cage
  g.restore();
}
/* Draws one person. Kid-sized head, chunky limbs, and a body type that follows the position. */
function renderBody(g,o){
  const S=o.S,x=o.x,y=o.y,U=o.uni,L=o.look,gear=o.gear,bw=L.w,shw=L.sh||1,hsz=L.hd||1,tp=L.tp||.85;
  SKINC=L.skin;
  const view=o.view,flip=o.flip,sp=o.speed||0,amp=clamp(sp/6.5,0,1.25),phi=o.phi||0,t=o.t||0;
  const leanM=(clamp(sp/8,0,1)*1.25+(((o.speed||0)<.5&&!o.lying&&!o.lock&&!o.throwK&&!o.catching)?.62:0)+(o.lunge?1.3:0)+(o.stance?.1:0)+(o.power?1.6:0)+(o.throwK!==undefined?Math.sin(o.throwK*Math.PI)*1.8:0))*S;
  const bob=-Math.abs(Math.sin(phi))*.5*S*amp;
  const lx=o.view==='s'?(o.cx||0)*leanM*.8+flip*Math.sin(phi*2+.6)*.14*S*amp:Math.sin(o.phi||0)*.3*S*clamp((o.speed||0)/6.5,0,1.2),ly=-(o.sa||0)*leanM*.5;
  const ready=(sp<.5&&!o.lying&&!o.lock&&!o.throwK&&!o.catching)?(L.rd||1):0;   // idle: low athletic stance
  const wsh=view==='s'?0:ready*((o.num||0)%2?1:-1)*.7*S;   // idle: shoulders shifted over one hip
  const rl=view==='s'?0:clamp(sp/6,0,1);   // running seen from front/behind: shoulders and head drop, the torso foreshortens
  const tlo=((L.tl||1)-1)*3.3*S;   // a longer torso for the QB
  const bendR=(L.bend||22)*Math.PI/180,dxF=ready*1.2*S,dAim=2*3.1*S*Math.cos(bendR/2);   // idle: the knee bend is set by the leg geometry (thigh-to-shin angle)
  const hipH=ready?Math.sqrt(Math.max(1,dAim*dAim-dxF*dxF)):6.0*S;
  const hip={x:x,y:y-hipH};
  const shl={x:x+lx+wsh,y:y-9.9*S-tlo+ly+bob+ready*1.2*S+rl*1.4*S};
  const hd={x:x+lx*1.25+wsh*1.1,y:y-12.9*S-tlo+ly*1.3+bob+ready*1.9*S+rl*2.3*S};
  const tw=view==='s'?S*3.6*(L.sw||1)*.7:S*3.6*(L.sw||1);   // side view: chest depth about 70% of the front width      // half width at the shoulders
  const wd=view==='s'?tw*.74:tw*(.66+.05*tp);                      // half width at the waist
  const legW=S*(1.36+.66*(bw-1))*(L.lg||1)*(view==='s'?1.12:1),legT=legW*(L.lt||1),armW=Math.max(.8,(1.0+.36*(bw-1))*shw*.92)*S;
  const hipW=view==='s'?0:Math.max(wd*.5,legW*.78);
  const leg=(side,ph)=>{
    const sw=Math.sin(ph),cs=Math.cos(ph),lift=Math.max(0,cs)*3.8*S*amp*(1+.6*Math.max(0,-sw));let foot,knee;
    if(view==='s'){
      let fx=x+flip*sw*3.2*S*amp+flip*side*ready*1.2*S,fy=y-lift;   // ready stance seen from the side: one foot staggered ahead of the other
      
      if(o.throwK!==undefined){const k=o.throwK,st=Math.min(1,k*2.2);if(side<0){fx=x+flip*(.3+1.7*st)*S;fy=y-Math.sin(st*Math.PI)*1.3*S}else{fx=x-flip*1.0*S;fy=y}}
      const A1_=3.1*S,A2_=3.1*S;let dx=fx-hip.x,dy=fy-hip.y,d=Math.hypot(dx,dy)||1;const dm=Math.min(d,A1_+A2_-.05),ux=dx/d,uy=dy/d;
      fx=hip.x+ux*dm;fy=hip.y+uy*dm;
      const a=(A1_*A1_-A2_*A2_+dm*dm)/(2*dm),hh=Math.sqrt(Math.max(0,A1_*A1_-a*a));
      let px=-uy,py=ux;if(px*flip<0){px=-px;py=-py}
      foot={x:fx,y:fy};knee={x:hip.x+ux*a+px*hh,y:hip.y+uy*a+py*hh};
    }else{const dir=view==='b'?-1:1;foot={x:x+side*(hipW+(o.stance?.7*S:.15*S)+ready*1.05*S),y:y+sw*dir*2.2*S*amp-lift*.9};knee={x:(hip.x+foot.x)/2+side*(.35+ready*.7)*S,y:(hip.y+foot.y)/2-lift*.6}}
    if(o.probe&&view==='s')(o.probe.legs=o.probe.legs||[]).push({hip:{x:hip.x,y:hip.y},knee:{x:knee.x,y:knee.y},foot:{x:foot.x,y:foot.y}});
    return{foot,knee,hp:{x:hip.x+side*hipW,y:hip.y},side};
  };
  const L1=leg(-1,phi),L2=leg(1,phi+Math.PI);
  const order=view==='s'?(L1.foot.y>=L2.foot.y?[L2,L1]:[L1,L2]):[L1,L2];
  const lum=c=>{const n=parseInt(String(c).slice(1),16)||0;return(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255};
  const taper=(a,b,wa,wb,col,caps=true)=>{const dx=b.x-a.x,dy=b.y-a.y,dl=Math.hypot(dx,dy)||1,nx=-dy/dl,ny=dx/dl;g.fillStyle=col;g.beginPath();g.moveTo(a.x+nx*wa/2,a.y+ny*wa/2);g.lineTo(b.x+nx*wb/2,b.y+ny*wb/2);g.lineTo(b.x-nx*wb/2,b.y-ny*wb/2);g.lineTo(a.x-nx*wa/2,a.y-ny*wa/2);g.closePath();g.fill();if(caps){g.beginPath();g.arc(a.x,a.y,wa/2,0,7);g.fill();g.beginPath();g.arc(b.x,b.y,wb/2,0,7);g.fill()}};
  const drawLeg=l=>{
    const sk=L.skin,lp=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}),te=lp(l.hp,l.knee,.92),se=lp(l.knee,l.foot,.14),ft={x:l.foot.x,y:l.foot.y-S*.3};
    const shd=(a,b,ox,w,col)=>{g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(a.x+ox,a.y);g.lineTo(b.x+ox,b.y);g.stroke()};
    limb(g,[[l.hp.x,l.hp.y],[l.knee.x,l.knee.y]],legW*1.36,sk,S);                       // bare thigh
    {const ox=view==='s'?0:l.side*legW*.26;shd(te,l.knee,ox,legW*.3,'rgba(80,35,15,.22)');shd(l.knee,se,ox,legW*.26,'rgba(80,35,15,.2)');   // muscle shading on the outer side
     const hx=view==='s'?-flip*legW*.22:-l.side*legW*.18;shd(lp(l.knee,se,.15),se,hx,legW*.16,'rgba(255,235,215,.2)');   // calf highlight
     if(view!=='b'){g.fillStyle='rgba(255,235,215,.16)';g.beginPath();g.ellipse(l.knee.x,l.knee.y,legW*.36,legW*.3,0,0,7);g.fill()}}   // knee cap
    {const kc=lp(l.knee,ft,.3),ka=lp(l.knee,ft,.9);   // sock tube with a calf: about 15% wider than the ankle
     taper(l.knee,kc,legW*1.4,legW*1.52,U.sock);taper(kc,ka,legW*1.52,legW*1.32,U.sock);
     const wf=t=>legW*(t<.3?1.4+.12*t/.3:1.52-.2*(t-.3)/.6),a0=.14,b0=.38;taper(lp(l.knee,ft,a0),lp(l.knee,ft,b0),wf(a0),wf(b0),lum(U.sock)>.55?(U.jo||'#14110f'):'#ffffff',false)}   // one stripe band, solid sock below it
    {const hx=view==='s'?-flip*legW*.3:-l.side*legW*.26;g.strokeStyle='rgba(255,255,255,.2)';g.lineWidth=legW*.2;g.beginPath();g.moveTo(lp(l.knee,ft,.28).x+hx,lp(l.knee,ft,.28).y);g.lineTo(lp(l.knee,ft,.52).x+hx,lp(l.knee,ft,.52).y);g.stroke()}
    if(view==='s'){taper({x:l.hp.x,y:l.hp.y-S*.5},te,legT*1.95,legT*1.3,U.pc)}   // pants taper from a thick thigh to a narrower knee
    else taper(l.hp,te,legT*1.85,legT*1.28,U.pc);
    {const kp=l.knee;g.fillStyle=shade(U.pc,-.14);g.strokeStyle=g.__off?'rgba(0,0,0,0)':'rgba(20,12,8,.6)';g.lineWidth=Math.max(.8,S*.2);g.beginPath();g.ellipse(kp.x,kp.y-S*.1,legW*.47,legW*.37,0,0,7);g.fill();g.stroke();g.strokeStyle='rgba(0,0,0,.32)';g.lineWidth=Math.max(1,S*.24);g.beginPath();g.arc(kp.x,kp.y-S*.1,legW*.42,.15*Math.PI,.85*Math.PI);g.stroke();g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.ellipse(kp.x-legW*.12,kp.y-legW*.1,legW*.26,legW*.16,0,0,7);g.fill()}   // knee pad bump
    {const dk='rgba(60,40,20,.28)';g.strokeStyle=dk;g.lineCap='round';g.lineWidth=Math.max(.9,S*.22);   // pants seams: hem, side seam and a couple of folds
     g.beginPath();g.moveTo(te.x-legW*.55,te.y);g.lineTo(te.x+legW*.55,te.y);g.stroke();
     if(view!=='s'){g.beginPath();g.moveTo(l.hp.x+l.side*legW*.6,l.hp.y+S*.5);g.lineTo(te.x+l.side*legW*.6,te.y);g.stroke();
       g.lineWidth=Math.max(.8,S*.18);g.beginPath();g.moveTo(l.hp.x-l.side*legW*.5,l.hp.y+S*.8);g.quadraticCurveTo(l.hp.x,l.hp.y+S*1.05,l.hp.x+l.side*legW*.3,l.hp.y+S*.85);g.moveTo(te.x-legW*.45,te.y-S*.5);g.lineTo(te.x-legW*.15,te.y-S*.1);g.stroke()}}
    if(U.p>0){
      const side=view==='s',po=U.po||'#14110f';
      const stripe=(off,w,col)=>{g.strokeStyle=col;g.lineWidth=w;g.lineCap='butt';g.beginPath();g.moveTo(l.hp.x+off,l.hp.y+S*.35);g.lineTo(te.x+off,te.y);g.stroke()};
      if(U.p===1){const w=Math.max(1,S*.3);if(side){stripe(-legW*.17,w,U.ps);stripe(legW*.17,w,U.ps)}else{stripe(l.side*legW*.5,w,U.ps);stripe(l.side*legW*.36,w,U.ps)}}
      else if(U.p===3){const w=Math.max(1,S*.22),off=side?0:l.side*legW*.5;stripe(off,w,U.ps);const band=(t,bw2)=>{const bx=l.hp.x+(te.x-l.hp.x)*t,by=l.hp.y+(te.y-l.hp.y)*t;g.strokeStyle=U.ps;g.lineWidth=bw2;g.lineCap='butt';g.beginPath();g.moveTo(bx-legW*.58,by);g.lineTo(bx+legW*.58,by);g.stroke()};band(.88,Math.max(1,S*.32));band(.76,Math.max(1,S*.26));g.fillStyle=U.ps;g.fillRect(l.knee.x-legW*.3,l.knee.y-S*.2,legW*.6,S*.7)}   // Dock Cuff: side tape, two rolled cuff bands, knee patch
      else{const w=legW*.28,off=side?0:l.side*legW*.43;stripe(off,w+Math.max(.8,S*.24),po);stripe(off,w,U.ps)}
    }
    if(view==='b'){const kx=l.knee.x,ky=l.knee.y;g.strokeStyle='rgba(0,0,0,.32)';g.lineWidth=Math.max(1,S*.22);g.lineCap='round';g.beginPath();g.moveTo(kx-legW*.4,ky+S*.1);g.quadraticCurveTo(kx,ky+S*.45,kx+legW*.4,ky+S*.1);g.stroke()   // back of the knee
    }
    drawCleat(g,l.foot.x+(view==='s'?flip*.35*S:0),l.foot.y-S*.15,S*1.32,view,flip,U.shoe,U.jc);
  };
  const armSet=(side,ph)=>{
    const sw=Math.sin(ph);
    const sh={x:shl.x+(view==='s'?flip*(side>0?.15:-.15)*S:side*(tw-.2*S)),y:shl.y+.45*S-(view==='s'?0:sw*.16*S*amp)};
    let hand,elbow;
    if(view==='s'){
      let run=clamp(amp,0,1.1),lag=Math.sin(ph-.5),th=sw*(.2+.72*run)-.05*run,bend=(.5+1.0*run)+.3*run*lag,ph2=th+bend;if(ready){th=.35;bend=1.1;ph2=th+bend}   // ready stance: forearms forward, hands hovering above the knees. small relaxed swing; elbow stays bent, hand stays near the hip, forearm trails the upper arm
      elbow={x:sh.x+flip*Math.sin(th)*1.7*S,y:sh.y+Math.cos(th)*1.7*S};
      hand={x:elbow.x+flip*Math.sin(ph2)*1.6*S,y:elbow.y+Math.cos(ph2)*1.6*S};
    }else{
      const dirv=view==='b'?-1:1,fw=sw*dirv,lg=Math.sin(ph-.5)*dirv;
      hand={x:sh.x+side*(1.0+.3*amp-.5*amp*Math.max(0,fw)-ready*.9)*S,y:sh.y+(3.9-1.2*amp+ready*.3)*S-fw*3.4*S*amp-Math.abs(sw)*.2*S*amp+lg*.2*S*amp};
      elbow={x:(sh.x+hand.x)/2+side*(1.3-.7*Math.min(1,ready+amp*1.2)+.2*amp)*S,y:(sh.y+hand.y)/2+.5*S*amp};
      if(ready>0){elbow={x:sh.x+side*1.2*S,y:sh.y+2.3*S};hand={x:sh.x-side*.4*S,y:sh.y+4.5*S}}   // ready: elbows bent about 85 degrees and pushed out, hands in front of the thighs
    }
    return{sh,hand,elbow};
  };
  const A1=armSet(-1,phi+Math.PI),A2=armSet(1,phi);
  const setArm=(A,hand,elbow)=>{A.hand=hand;A.elbow=elbow||{x:(A.sh.x+hand.x)/2,y:(A.sh.y+hand.y)/2+S*.4}};
  const bside=o.ballSide||1;
  const bA=view==='s'?(flip>0?A2:A1):(bside>0?A2:A1);
  let ballPos=null,ballRot=.5;
  const ld=o.lock;
  const blockPose=(dir,push)=>{const j=Math.sin(t*14+(o.num||0))*.22*S*push;   // blocking: hands at chest height, elbows bent about 90 degrees, forearms forward
    for(const A of [A1,A2]){const sd2=Math.sign(A.sh.x-shl.x)||(A===A2?1:-1);
      if(view==='s'){const f=Math.sign(dir.x)||flip;setArm(A,{x:A.sh.x+f*2.3*S+j,y:A.sh.y+1.0*S+j*.5},{x:A.sh.x+f*.35*S,y:A.sh.y+2.1*S})}
      else setArm(A,{x:A.sh.x-sd2*.9*S+j,y:A.sh.y+.9*S+j*.5},{x:A.sh.x+sd2*.85*S,y:A.sh.y+2.5*S})}};
  if(ld){blockPose(ld,1)}
  else if(o.lungeDir){for(const A of [A1,A2])setArm(A,{x:A.sh.x+o.lungeDir.x*3*S,y:A.sh.y+o.lungeDir.y*3*S})}
  else if(o.throwK!==undefined){
    const k=o.throwK,f=view==='s'?flip:1,sd=view==='s',sh2=A2.sh;
    const pose=i=>sd?[
      {h:{x:shl.x+f*.2*S,y:shl.y-2.3*S},e:{x:shl.x-f*.9*S,y:shl.y-.7*S}},
      {h:{x:shl.x+f*2.3*S,y:shl.y-3.3*S},e:{x:shl.x+f*.7*S,y:shl.y-2.2*S}},
      {h:{x:shl.x+f*1.6*S,y:shl.y+2.0*S},e:{x:shl.x+f*1.1*S,y:shl.y+.1*S}}][i]:[
      {h:{x:sh2.x+.3*S,y:shl.y-2.3*S},e:{x:sh2.x+1.5*S,y:shl.y-.5*S}},
      {h:{x:sh2.x+.2*S,y:shl.y-3.9*S},e:{x:sh2.x+.9*S,y:shl.y-2.2*S}},
      {h:{x:sh2.x-1.6*S,y:shl.y+1.8*S},e:{x:sh2.x-.3*S,y:shl.y+.2*S}}][i];
    const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}),ez=t=>t*t*(3-2*t);
    let Hn,En;   // cocked at the ear, then a quick snap forward, then follow through across the body
    if(k<.42){Hn=pose(0).h;En=pose(0).e}
    else if(k<.6){const t=ez((k-.42)/.18);Hn=mix(pose(0).h,pose(1).h,t);En=mix(pose(0).e,pose(1).e,t)}
    else{const t=ez((k-.6)/.4);Hn=mix(pose(1).h,pose(2).h,t);En=mix(pose(1).e,pose(2).e,t)}
    setArm(A2,Hn,En);
    const g0=sd?{x:shl.x+f*2.2*S,y:shl.y+.2*S}:{x:A1.sh.x-.6*S,y:shl.y+.4*S},g1=sd?{x:shl.x+f*.4*S,y:shl.y+.9*S}:{x:A1.sh.x+.4*S,y:shl.y+1.2*S};
    setArm(A1,mix(g0,g1,ez(clamp((k-.5)/.3,0,1))));
    if(k<.52){ballPos={x:Hn.x+(sd?f*.5*S:0),y:Hn.y-(sd?.1:.7)*S};ballRot=sd?-.7*f:-Math.PI/2}
  }
  else if(o.catching){for(const A of [A1,A2])setArm(A,{x:A.sh.x+(A===A1?-.6:.6)*S,y:A.sh.y-2.6*S})}
  if(o.moveAnim){
    const mk=o.moveAnim;
    if(mk==='swim'){setArm(A2,{x:A2.sh.x+.4*S,y:A2.sh.y-3.4*S+Math.sin(t*20)*.6*S},{x:A2.sh.x+1.4*S,y:A2.sh.y-1.6*S});setArm(A1,{x:A1.sh.x-1*S,y:A1.sh.y+1.4*S})}
    else if(mk==='power'){blockPose({x:flip,y:-1},1.6)}
    else if(mk==='spin'){for(const A of [A1,A2])setArm(A,{x:A.sh.x+(A===A1?-2.6:2.6)*S,y:A.sh.y+.4*S})}
  }
  if(o.bothArmsDir){for(const A of [A1,A2])setArm(A,{x:A.sh.x+o.bothArmsDir.x*3.6*S,y:A.sh.y+o.bothArmsDir.y*3.6*S-.3*S},{x:A.sh.x+o.bothArmsDir.x*1.8*S,y:A.sh.y+o.bothArmsDir.y*1.8*S})}
  if(o.armDir){const A=bside>0?A1:A2;setArm(A,{x:A.sh.x+o.armDir.x*3.6*S,y:A.sh.y+o.armDir.y*3.6*S-.3*S},{x:A.sh.x+o.armDir.x*1.8*S,y:A.sh.y+o.armDir.y*1.8*S})}
  if(o.hasBall){
    if(o.styleOn&&!o.armDir){
      const bs=view==='s'?flip:bside;
      if(o.styleKind===0){setArm(bA,{x:bA.sh.x+bs*3.4*S,y:bA.sh.y+1.4*S});ballPos={x:bA.hand.x+bs*.8*S,y:bA.hand.y}}
      else if(o.styleKind===1){const hb=Math.abs(Math.sin(t*9));setArm(bA,{x:bA.sh.x+bs*1.2*S,y:bA.sh.y+2.8*S});ballPos={x:bA.hand.x,y:bA.hand.y+(1-hb)*-2.6*S+S*.8}}
      else{const hb=Math.abs(Math.sin(t*4.5));setArm(bA,{x:bA.sh.x+bs*.5*S,y:bA.sh.y-1.8*S});ballPos={x:shl.x+bs*.6*S,y:hd.y-3.2*S-hb*2.8*S};ballRot=t*8}
    }else if(o.handoff&&!o.moveAnim){
      const H=o.handoff,A=view==='s'?bA:(H.x>=0?A2:A1),hnd={x:A.sh.x+H.x*2.9*S,y:A.sh.y+H.y*1.6*S+1.1*S};setArm(A,hnd,{x:A.sh.x+H.x*1.4*S,y:A.sh.y+1.2*S});ballPos={x:hnd.x+H.x*.5*S,y:hnd.y-.1*S};ballRot=0;
    }else if(!o.moveAnim){
      const bs=view==='s'?flip:bside;
      if(view==='s'){const hand={x:bA.sh.x+bs*1.5*S,y:bA.sh.y+2.0*S};setArm(bA,hand,{x:bA.sh.x+bs*.2*S,y:bA.sh.y+1.7*S});ballPos={x:hand.x-bs*.25*S,y:hand.y+.95*S};ballRot=bs*.3}
      else{const hand={x:bA.sh.x-bs*.2*S,y:bA.sh.y+3.9*S};setArm(bA,hand,{x:bA.sh.x+bs*1.5*S,y:bA.sh.y+2.6*S});ballPos={x:bA.sh.x+bs*1.65*S,y:bA.sh.y+2.9*S};ballRot=Math.PI/2+bs*.22}
    }
  }
  const aw=(view==='s'?armW*1.12:armW*.9)*((L.sw||1)>1.2?.9:1),sw2=aw*(view==='s'?1.38:1.72),sleeveEnd=.5;
  const along=(A,t)=>({x:A.sh.x+(A.elbow.x-A.sh.x)*t,y:A.sh.y+(A.elbow.y-A.sh.y)*t});
  // a stripe laid exactly over part of the sleeve: same width, flat ends, so it can never spill out
  const seg=(A,t0,t1,col)=>{const a=along(A,t0),b=along(A,t1);g.strokeStyle=col;g.lineWidth=sw2+Math.max(1.4,S*.5)*.9;g.lineCap='butt';g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();g.lineCap='round'};
  const armPre=A=>{
    if(view==='s'){limb(g,[[A.sh.x,A.sh.y],[A.elbow.x,A.elbow.y]],aw*(view==='s'?1.3:1.62)+S*.4,'#2a1208',S);limb(g,[[A.elbow.x,A.elbow.y],[A.hand.x,A.hand.y]],aw*.86+S*.4,'#2a1208',S)}   // dark edge so the arm separates from the chest
    limb(g,[[A.sh.x,A.sh.y],[A.elbow.x,A.elbow.y]],aw*(view==='s'?1.3:1.62),L.skin,S);                          // big bicep
    limb(g,[[A.elbow.x,A.elbow.y],[A.hand.x,A.hand.y]],aw*.86,L.skin,S);                       // forearm
    {const m=along(A,.62),q=along(A,.95),nx=-(A.elbow.y-A.sh.y),ny=(A.elbow.x-A.sh.x),nl=Math.hypot(nx,ny)||1,o2=aw*.26/nl;
     g.strokeStyle='rgba(80,35,15,.32)';g.lineWidth=aw*.34;g.lineCap='round';g.beginPath();g.moveTo(m.x+nx*o2,m.y+ny*o2);g.lineTo(q.x+nx*o2,q.y+ny*o2);g.stroke();   // muscle shading
     g.strokeStyle='rgba(255,235,215,.3)';g.lineWidth=aw*.2;g.beginPath();g.moveTo(m.x-nx*o2,m.y-ny*o2);g.lineTo(q.x-nx*o2,q.y-ny*o2);g.stroke()}
    if(gear&&gear.sleeves)limb(g,[[A.elbow.x,A.elbow.y],[A.hand.x,A.hand.y]],aw*.8,gear.sc,S);
    if(U.j!==1){const e=along(A,sleeveEnd);SLV=true;limb(g,[[A.sh.x,A.sh.y],[e.x,e.y]],sw2,U.jc,S);SLV=false;
      {const dx=e.x-A.sh.x,dy=e.y-A.sh.y,dl=Math.hypot(dx,dy)||1,nx=-dy/dl,ny=dx/dl,o3=sw2*.27;g.lineCap='round';   // tight sleeve: three tones, dark underside, base, light bicep crest
       g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=sw2*.34;g.beginPath();g.moveTo(A.sh.x+nx*o3,A.sh.y+ny*o3);g.lineTo(e.x+nx*o3,e.y+ny*o3);g.stroke();
       g.strokeStyle='rgba(255,255,255,.24)';g.lineWidth=sw2*.22;g.beginPath();g.moveTo(A.sh.x-nx*o3,A.sh.y-ny*o3);g.lineTo(e.x-nx*o3,e.y-ny*o3);g.stroke();
       g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=Math.max(1,S*.26);g.beginPath();g.moveTo(e.x-nx*sw2*.5,e.y-ny*sw2*.5);g.quadraticCurveTo(e.x+dx/dl*sw2*.34,e.y+dy/dl*sw2*.34,e.x+nx*sw2*.5,e.y+ny*sw2*.5);g.stroke()}   // curved sleeve edge over the bicep           // short sleeve
      if(U.j===2){seg(A,.12,.2,U.jt);seg(A,.26,.34,U.jt)}else if(U.j===3){seg(A,.3,.4,U.jt)}}
    if(view==='s'){g.fillStyle=L.skin;g.beginPath();g.arc(A.elbow.x,A.elbow.y,aw*.62,0,7);g.fill();g.strokeStyle='rgba(60,25,10,.45)';g.lineWidth=Math.max(1,S*.22);g.beginPath();g.arc(A.elbow.x,A.elbow.y,aw*.62,Math.PI*.1,Math.PI*.9);g.stroke()}   // the elbow as its own bump
    if(view==='b'){g.fillStyle='rgba(60,25,10,.28)';g.beginPath();g.ellipse(A.elbow.x,A.elbow.y,armW*.55,armW*.45,0,0,7);g.fill();const m=along(A,.8);g.strokeStyle='rgba(60,25,10,.25)';g.lineWidth=Math.max(1,armW*.25);g.beginPath();g.moveTo(m.x,m.y);g.lineTo(A.elbow.x+(A.hand.x-A.elbow.x)*.5,A.elbow.y+(A.hand.y-A.elbow.y)*.5);g.stroke()}   // elbow and forearm muscle from behind
  };
  const armPost=(A,redo)=>{
    if(view!=='s'&&U.j!==1){const e=along(A,sleeveEnd);g.strokeStyle=U.jc;g.lineWidth=sw2*.9;g.lineCap='round';g.beginPath();g.moveTo(A.sh.x,A.sh.y);g.lineTo(e.x,e.y);g.stroke();if(U.j===2){seg(A,.12,.2,U.jt);seg(A,.26,.34,U.jt)}else if(U.j===3){seg(A,.3,.4,U.jt)}}   // the sleeve sits over the shirt edge, so the arm is joined to the body
    if(redo){limb(g,[[A.elbow.x,A.elbow.y],[A.hand.x,A.hand.y]],aw*.86,L.skin,S);if(gear&&gear.sleeves)limb(g,[[A.elbow.x,A.elbow.y],[A.hand.x,A.hand.y]],aw*.8,gear.sc,S)}   // forearm stays in front of the shirt
    g.strokeStyle=U.jt;g.lineWidth=aw*.8;g.lineCap='butt';g.beginPath();g.moveTo(A.elbow.x+(A.hand.x-A.elbow.x)*.66,A.elbow.y+(A.hand.y-A.elbow.y)*.66);g.lineTo(A.elbow.x+(A.hand.x-A.elbow.x)*.9,A.elbow.y+(A.hand.y-A.elbow.y)*.9);g.stroke();g.lineCap='round';
    drawHand(g,A,view==='s'?flip:(Math.sign(A.sh.x-shl.x)||1),S,(gear&&gear.gloves)?gear.gc:'#d9d6cf',view==='b');
  };
  const drawArm=A=>{armPre(A);armPost(A,false)};
  const pelvis=()=>{
    const wdh=view==='s'?wd*.98:wd*1.02,hy2=hip.y;
    g.fillStyle=U.pc;g.strokeStyle='rgba(20,12,8,.7)';g.lineWidth=Math.max(1,S*.26);g.lineJoin='round';
    g.beginPath();
    if(view==='s'){g.ellipse(hip.x,hy2+S*.6,wdh,S*.95,0,0,7)}
    else{g.moveTo(hip.x-wdh,hy2-S*.2);g.lineTo(hip.x+wdh,hy2-S*.2);g.bezierCurveTo(hip.x+wdh*1.14,hy2+S*.3,hip.x+wdh*1.18,hy2+S*.8,hip.x+wdh*1.06,hy2+S*1.35);g.quadraticCurveTo(hip.x,hy2+S*.95,hip.x-wdh*1.06,hy2+S*1.35);g.bezierCurveTo(hip.x-wdh*1.18,hy2+S*.8,hip.x-wdh*1.14,hy2+S*.3,hip.x-wdh,hy2-S*.2);g.closePath()}
    g.fill();g.stroke();
    g.strokeStyle=shade(U.pc,-.38);g.lineWidth=Math.max(1.2,S*.4);g.lineCap='butt';g.beginPath();g.moveTo(hip.x-wdh*.98,hy2+S*.12);g.lineTo(hip.x+wdh*.98,hy2+S*.12);g.stroke();   // waistband
    if(view!=='s'){g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=Math.max(.8,S*.2);g.beginPath();g.moveTo(hip.x,hy2+S*.4);g.lineTo(hip.x,hy2+S*1.0);g.stroke()}
  };
  const torso=()=>{
    const th=hip.y-shl.y,top=shl.y-S*.6,sd=view==='s',tn=0,sq=1;
    const TW=tw*sq,WD=wd*sq,bulge=1+.14*(bw-.8),cxo=0;
    const lf=sd?(flip>0?.9:1.16*bulge):1,rf=sd?(flip>0?1.16*bulge:.9):1,xL=shl.x+cxo,xH=hip.x+cxo;
    // pelvis in pants colour so the legs join the body
    const path=()=>{g.beginPath();g.moveTo(xL-TW*lf,shl.y+S*.8);g.quadraticCurveTo(xL-TW*lf*1.04,top+S*.25,xL-TW*lf*.8,top+S*.1);g.quadraticCurveTo(xL-TW*.35,top-S*.2,xL,top-S*.2);g.quadraticCurveTo(xL+TW*.35,top-S*.2,xL+TW*rf*.8,top+S*.1);g.quadraticCurveTo(xL+TW*rf*1.04,top+S*.25,xL+TW*rf,shl.y+S*.8);
      if(sd){g.bezierCurveTo(xL+TW*rf*.98,shl.y+th*.32,xH+WD*rf*.92,shl.y+th*.62,xH+WD*rf*1.0,shl.y+th*.84);g.quadraticCurveTo(xH+WD*rf*1.2,hip.y+S*.1,xH+WD*rf*1.12,hip.y+S*.6);g.quadraticCurveTo(xH,hip.y+S*.85,xH-WD*lf*1.12,hip.y+S*.6);g.quadraticCurveTo(xH-WD*lf*1.2,hip.y+S*.1,xH-WD*lf*1.0,shl.y+th*.84);g.bezierCurveTo(xH-WD*lf*.92,shl.y+th*.62,xL-TW*lf*.98,shl.y+th*.32,xL-TW*lf,shl.y+S*.8);g.closePath();return}
      g.bezierCurveTo(xL+TW*rf*1.02,shl.y+th*.35,xH+WD*rf*1.02,shl.y+th*.75,xH+WD*rf*1.12,hip.y+S*.55);g.quadraticCurveTo(xH,hip.y+S*.8,xH-WD*lf*1.12,hip.y+S*.55);g.bezierCurveTo(xH-WD*lf*1.02,shl.y+th*.75,xL-TW*lf*1.04,shl.y+th*.35,xL-TW*lf,shl.y+S*.8);g.closePath()};
    g.save();path();const gr=g.createLinearGradient(xL-TW*lf,0,xL+TW*rf,0);gr.addColorStop(0,shade(U.jc,.16));gr.addColorStop(.45,U.jc);gr.addColorStop(1,shade(U.jc,-.14));g.fillStyle=gr;g.fill();g.clip();
    if(U.j===1){g.fillStyle=L.skin;g.beginPath();g.ellipse(xL,top+S*.55,TW*.3,S*.8,0,0,7);g.fill()}
    if(U.j===3){g.fillStyle=U.jt;g.fillRect(xL-TW*2,top+th*.17,TW*4,th*.1);g.fillRect(xL-TW*2,top+th*.33,TW*4,th*.06);g.fillStyle=U.jt;g.beginPath();g.ellipse(xL,top+S*.1,TW*.42,S*.5,0,0,7);g.fill()}   // Trawl Knit: two stripes high on the chest and a contrast collar
    g.fillStyle='rgba(255,255,255,.14)';g.beginPath();g.ellipse(xL-TW*.25,shl.y+th*.3,TW*.45,th*.22,0,0,7);g.fill();   // chest highlight
    if(!sd){g.fillStyle='rgba(0,0,0,.14)';g.beginPath();g.ellipse(xH,hip.y-th*.12,WD*.85,th*.22,0,0,7);g.fill()}   // belly shadow: tapers the jersey in at the waist
    g.fillStyle='rgba(0,0,0,.13)';if(sd){g.fillRect(xL+(flip>0?-TW*.15:-TW*lf),top,TW*.55,th+S*2)}else{g.fillRect(xL+TW*.52,top,TW*.7,th+S*2);g.fillStyle='rgba(255,255,255,.07)';g.fillRect(xL-TW*1.2,top,TW*.5,th+S*2)}   // light from one side
    if(!sd){g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=Math.max(.8,S*.24);g.lineCap='round';g.beginPath();
      if(view==='f'){g.moveTo(xL-TW*.72,shl.y+th*.36);g.quadraticCurveTo(xL,shl.y+th*.52,xL+TW*.72,shl.y+th*.36);g.moveTo(xL,shl.y+th*.5);g.lineTo(xH,hip.y-th*.12)}   // pecs and the middle line of the torso
      else{g.moveTo(xL,shl.y+th*.1);g.lineTo(xH,hip.y-th*.1);g.moveTo(xL-TW*.6,shl.y+th*.3);g.quadraticCurveTo(xL-TW*.3,shl.y+th*.45,xL-TW*.08,shl.y+th*.28);g.moveTo(xL+TW*.6,shl.y+th*.3);g.quadraticCurveTo(xL+TW*.3,shl.y+th*.45,xL+TW*.08,shl.y+th*.28)}   // spine and shoulder blades
      g.stroke()}
    g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=Math.max(.8,S*.2);g.lineCap='round';g.beginPath();   // jersey: side seams, folds at the waist and a hem
    if(!sd){g.moveTo(xL-TW*.93,shl.y+th*.22);g.lineTo(xH-WD*1.0,hip.y+S*.2);g.moveTo(xL+TW*.93,shl.y+th*.22);g.lineTo(xH+WD*1.0,hip.y+S*.2);
      g.moveTo(xL-TW*.62,hip.y-th*.3);g.quadraticCurveTo(xL-TW*.32,hip.y-th*.2,xL-TW*.06,hip.y-th*.36);g.moveTo(xL+TW*.62,hip.y-th*.28);g.quadraticCurveTo(xL+TW*.34,hip.y-th*.18,xL+TW*.08,hip.y-th*.34)}
    else{g.moveTo(xL-TW*.2,hip.y-th*.35);g.quadraticCurveTo(xL+TW*.1,hip.y-th*.25,xL+TW*.4,hip.y-th*.38)}
    g.moveTo(xH-WD*1.05,hip.y+S*.28);g.lineTo(xH+WD*1.05,hip.y+S*.28);g.stroke();
    g.restore();
    g.strokeStyle=g.__off?'rgba(0,0,0,0)':'rgba(20,12,8,.7)';g.lineWidth=Math.max(1.1,S*.26);g.lineJoin='round';path();g.stroke();
    if(view!=='s'){g.strokeStyle=U.jt;g.lineWidth=Math.max(1,S*.4);g.lineCap='round';g.beginPath();if(view==='f'){g.moveTo(xL-S*1.0,top+S*.15);g.quadraticCurveTo(xL,top+S*1.2,xL+S*1.0,top+S*.15)}else{g.moveTo(xL-S*.9,top+S*.2);g.quadraticCurveTo(xL,top+S*.55,xL+S*.9,top+S*.2)}g.stroke()}   // collar
  };
  const pads=()=>{   // structured shoulder pads under the jersey: a layered cap with ridges, wide at the shoulder and tapering to the neck
    const pad=(cx,py,sg,rx,ry)=>{
      const P=(u,v)=>[cx+sg*u*rx,py+v*ry],path=()=>{g.beginPath();g.moveTo(...P(-.85,-.7));g.quadraticCurveTo(...P(-.1,-1.25),...P(.72,-.62));g.quadraticCurveTo(...P(1.12,-.2),...P(1.08,.42));g.quadraticCurveTo(...P(1.0,.98),...P(.5,1.0));g.lineTo(...P(-.7,.62));g.closePath()};
      g.save();path();const gr=g.createLinearGradient(...P(-.6,-1),...P(1,1));gr.addColorStop(0,shade(U.jc,.24));gr.addColorStop(.5,U.jc);gr.addColorStop(1,shade(U.jc,-.28));g.fillStyle=gr;g.fill();g.clip();
      g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=Math.max(.9,S*.24);g.lineCap='round';for(const k of [.38,.68]){g.beginPath();g.moveTo(...P(-.7+k*.2,-.7+k*.5));g.quadraticCurveTo(...P(.2,-.8+k*.9),...P(1.0,.1+k*.8));g.stroke()}   // plate ridges
      g.strokeStyle='rgba(255,255,255,.26)';g.lineWidth=Math.max(.8,S*.2);g.beginPath();g.moveTo(...P(-.5,-.78));g.quadraticCurveTo(...P(.2,-1.02),...P(.7,-.58));g.stroke();g.restore();   // top edge catching the light
      g.strokeStyle=g.__off?'rgba(0,0,0,.5)':'rgba(20,12,8,.85)';g.lineWidth=Math.max(1,S*.3);g.lineJoin='round';path();g.stroke()};
    if(view==='s'){pad(shl.x+flip*.2*S,shl.y+.1*S,flip,S*2.4,S*1.7)}
    else{const px=tw*.9,rx=tw*.36+S*.7,ry=S*1.45,py=shl.y+S*.15;pad(shl.x-px+rx*.12,py,-1,rx,ry);pad(shl.x+px-rx*.12,py,1,rx,ry)}
  };
  const jtxt=()=>{
    if(view!=='s'&&S>=2.6){
      // team name (or a star's last name on the back) above a smaller number, drawn last so no stripe can hide it
      const fs=S*(view==='b'?2.44:1.05);g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
      const xL=shl.x,xH=hip.x,TW=tw,th=hip.y-shl.y,nx=(xL+xH)/2,ny=shl.y+th*.68,ty=shl.y+th*.3;
      const topT=(view==='b'&&o.lname)?o.lname:o.tname;
      if(topT){const f2=S*(view==='b'&&o.lname?.62:.5);g.font='800 '+f2+'px "Barlow Condensed",Impact,sans-serif';const tx=String(topT).toUpperCase(),mw=TW*1.55;
        if(S>=4.6){g.lineWidth=Math.max(1,f2*.2);g.strokeStyle=U.jo||'#14110f';g.strokeText(tx,nx,ty,mw)}g.fillStyle=U.jn;g.fillText(tx,nx,ty,mw)}
      g.font='800 '+fs+'px "Barlow Condensed",Impact,sans-serif';
      if(view==='b'){const nyb=ny+th*.04;g.lineJoin='round';g.lineWidth=Math.max(2,fs*.2);g.strokeStyle='#000';g.strokeText(o.num,nx,nyb);g.fillStyle='#fff';g.fillText(o.num,nx,nyb)}   // solid white, hard black outline
      else{g.lineWidth=Math.max(1.4,fs*.22);g.strokeStyle=U.jo||'#14110f';g.strokeText(o.num,nx,ny);g.fillStyle=U.jn;g.fillText(o.num,nx,ny)}
    }
  };
  const head=()=>{
    const Sh=S*.76;   // helmet about 24% smaller, so the body reads bigger
    const r=2.25*Sh*hsz,hx=hd.x+(view==='s'?flip*.3*Sh:0),hy=hd.y,hc=L.hc,sk=L.skin,hr=L.hair,ln=Math.max(1.2,Sh*.38),sd=view==='s',fr=view==='f',bk=view==='b';
    const tn=sd?0:(o.cx||0),sq=1-.3*Math.abs(tn),fo=fr?tn*r*.3:0,fc=hx+fo,sx0=hx+(fr?fo*.4:0);
    const rx=sd?r*.94:r*.97,dsk=shade(sk,-.2),lsk=shade(sk,.18),ol='rgba(20,12,8,.8)',bo=g.__off?'rgba(0,0,0,0)':ol,hcol=U.hc,mcol=U.mask;
    const out=()=>{g.strokeStyle=bo;g.lineWidth=ln;g.stroke()};
    const headPath=()=>{g.beginPath();g.ellipse(hx,hy,rx,r,0,0,7)};
    const pt=(u,v)=>[hx+flip*u*r,hy+v*r];
    limb(g,[[shl.x,shl.y-.5*S],[hx,hy+r*.7]],S*(bk?2.3:1.5),sk,S);   // neck
    if(bk){g.strokeStyle='rgba(60,25,10,.3)';g.lineWidth=S*.8;g.lineCap='round';g.beginPath();g.moveTo(shl.x-S*.5,shl.y-.9*S);g.lineTo(hx-S*.4,hy+r*.75);g.stroke();   // neck shadow
      g.strokeStyle=U.jt;g.lineWidth=Math.max(1.5,S*.75);g.lineCap='round';g.beginPath();g.moveTo(shl.x-S*1.7,shl.y-.15*S);g.quadraticCurveTo(shl.x,shl.y+.85*S,shl.x+S*1.7,shl.y-.15*S);g.stroke()}   // jersey collar
    // ---- hair: the helmet covers it; long hair and dreads come out the back, an afro puffs out below the rim
    g.fillStyle=hc;
    if(hr==='dreads'||hr==='long'){const n=hr==='dreads'?(sd?5:9):(sd?4:5);g.lineCap='round';
      for(let i=0;i<n;i++){const f=n===1?0:i/(n-1)*2-1,q=n===1?0:i/(n-1);let ox,sy,len;
        if(sd){ox=-flip*(r*.5+q*r*.5);sy=hy+r*.15;len=(hr==='dreads'?2.4:3.1)*Sh*(1-.15*q)}
        else if(bk){ox=f*r*.82;sy=hy+r*.1;len=(hr==='dreads'?2.3:2.9)*Sh*(1-.22*Math.abs(f))}
        else{if(Math.abs(f)<.55)continue;ox=f*r*.95;sy=hy+r*.5;len=(hr==='dreads'?1.7:2.2)*Sh}
        const sw=Math.sin(t*3+i)*.3*Sh*amp,ex=hx+ox*1.12+sw,ey=hy+r*.78+len;
        g.strokeStyle=bo;g.lineWidth=Sh*1.05+ln;g.beginPath();g.moveTo(hx+ox,sy);g.quadraticCurveTo(hx+ox*1.1,hy+r*.7,ex,ey);g.stroke();g.strokeStyle=hc;g.lineWidth=Sh*1.05;g.stroke()}}
    else if(hr==='afro'){const pts=sd?[[-flip*.72,.78],[-flip*.42,.9]]:bk?[[-.8,.8],[-.4,.92],[0,.96],[.4,.92],[.8,.8]]:[[-.9,.62],[.9,.62]];
      for(const [u,v] of pts){g.beginPath();g.arc(hx+u*r,hy+v*r,r*.27,0,7);g.fill();g.strokeStyle=bo;g.lineWidth=ln*.8;g.stroke()}}
    // ---- the head under the helmet
    g.fillStyle=bk&&hr!=='bald'?hc:sk;headPath();g.fill();out();
    // ---- helmet shell: one colour, with ear flaps, a face opening and a shaded far side
    g.beginPath();
    if(sd){g.moveTo(...pt(-1.0,.62));g.bezierCurveTo(...pt(-1.18,-.5),...pt(-.65,-1.22),...pt(0,-1.22));g.bezierCurveTo(...pt(.6,-1.22),...pt(1.0,-.85),...pt(1.02,-.4));g.lineTo(...pt(.45,-.3));g.lineTo(...pt(.3,.1));g.lineTo(...pt(.28,.72));g.lineTo(...pt(-.75,.76));g.quadraticCurveTo(...pt(-1.0,.76),...pt(-1.0,.62));g.closePath()}
    else{g.moveTo(sx0-r*1.12,hy+r*.35);g.bezierCurveTo(sx0-r*1.2,hy-r*.7,sx0-r*.7,hy-r*1.22,sx0,hy-r*1.22);g.bezierCurveTo(sx0+r*.7,hy-r*1.22,sx0+r*1.2,hy-r*.7,sx0+r*1.12,hy+r*.35);g.quadraticCurveTo(sx0+r*1.1,hy+r*.76,sx0+r*.8,hy+r*.74);g.lineTo(sx0-r*.8,hy+r*.74);g.quadraticCurveTo(sx0-r*1.1,hy+r*.76,sx0-r*1.12,hy+r*.35);g.closePath()}
    g.fillStyle=hcol;g.fill();
    if(bk){g.save();g.clip();g.fillStyle='rgba(0,0,0,.3)';g.fillRect(sx0-r*1.3,hy+r*.3,r*2.6,r);   // darker lower shell
      g.fillStyle='#1a1a1f';g.fillRect(sx0-r*1.3,hy+r*.48,r*2.6,r*.2);g.fillStyle='rgba(255,255,255,.22)';g.fillRect(sx0-r*1.3,hy+r*.48,r*2.6,Math.max(1,Sh*.14));   // rubber back bumper
      g.restore()}
    g.save();g.clip();g.fillStyle='rgba(0,0,0,.22)';if(sd)g.fillRect(hx-flip*r*1.3,hy-r*1.3,r*1.0,r*2.6);else g.fillRect(sx0+r*.35,hy-r*1.3,r*1.0,r*2.6);
    g.fillStyle=U.jt;if(sd)g.fillRect(hx-flip*r*.2-Sh*.22,hy-r*1.3,Sh*.45,r*.85);else g.fillRect(sx0-Sh*.25,hy-r*1.3,Sh*.5,r*.85);   // centre stripe
    g.fillStyle='rgba(255,255,255,.32)';g.beginPath();g.ellipse(sd?hx-flip*r*.15:sx0-r*.35,hy-r*.85,r*.4,r*.17,sd?0:-.35,0,7);g.fill();g.restore();
    g.strokeStyle=bo;g.lineWidth=ln;g.stroke();
    if(fr){   // the face shows through the helmet opening
      const orx=r*.7*sq,ory=r*.68,oy=hy+r*.28;
      g.beginPath();g.ellipse(fc,oy,orx,ory,0,0,7);g.fillStyle=sk;g.fill();g.save();g.clip();g.fillStyle='rgba(60,25,10,.14)';g.beginPath();g.ellipse(fc+orx*.6,oy+r*.2,orx,ory*1.1,0,0,7);g.fill();
      if(L.beard==='beard'){g.fillStyle=hc;g.beginPath();g.ellipse(fc,hy+r*.74,orx*1.2,r*.5,0,0,7);g.fill()}g.restore();
      g.beginPath();g.ellipse(fc,oy,orx,ory,0,0,7);g.strokeStyle=bo;g.lineWidth=ln*.7;g.stroke();
    }
    if(!bk){
      const md=L.mood||0,mo=L.mouth||0,es=L.eyes||0,brow=hr==='bald'?'#3a2a20':hc;
      if(fr){
        {g.save();g.beginPath();g.ellipse(fc,hy+r*.28,r*.7*sq,r*.68,0,0,7);g.clip();   // dark shadow band under the brim, and a harder, darker face
          const bgr=g.createLinearGradient(0,hy-r*.45,0,hy+r*.22);bgr.addColorStop(0,'rgba(15,5,2,.85)');bgr.addColorStop(1,'rgba(15,5,2,0)');g.fillStyle=bgr;g.fillRect(fc-r,hy-r*.45,r*2,r*.7);
          g.fillStyle='rgba(45,16,6,.24)';g.fillRect(fc-r,hy-r*.45,r*2,r*1.5);g.restore()}
        for(const e of [-1,1]){const cx=fc+e*r*.4*sq,ey=hy+r*.1;
          g.fillStyle='#0e0603';g.beginPath();g.ellipse(cx,ey,Sh*.4,Sh*(es===1?.12:.17),e*.1,0,7);g.fill();   // small narrow eye, no white ring
          g.fillStyle='rgba(255,255,255,.55)';g.fillRect(cx+e*Sh*.06,ey-Sh*.08,Sh*.12,Sh*.07);
          g.strokeStyle=brow;g.lineWidth=Math.max(2,Sh*.66);g.lineCap='round';const by=ey-Sh*.52;   // heavy angled brow
          g.beginPath();g.moveTo(cx-e*Sh*.72,by-Sh*.05);g.lineTo(cx+e*Sh*.72,by+Sh*.3);g.stroke();
          g.strokeStyle='rgba(10,4,2,.5)';g.lineWidth=Math.max(1,Sh*.2);g.beginPath();g.moveTo(cx-e*Sh*.5,by+Sh*.06);g.lineTo(cx+e*Sh*.62,by+Sh*.34);g.stroke()}
        const ny=hy+r*.36;
        g.fillStyle=dsk;g.beginPath();g.moveTo(fc-Sh*.28,hy+r*.02);g.quadraticCurveTo(fc-Sh*.5,ny-Sh*.2,fc-Sh*.62,ny+Sh*.3);g.quadraticCurveTo(fc,ny+Sh*.75,fc+Sh*.62,ny+Sh*.3);g.quadraticCurveTo(fc+Sh*.5,ny-Sh*.2,fc+Sh*.28,hy+r*.02);g.closePath();g.globalAlpha=.55;g.fill();g.globalAlpha=1;
        g.fillStyle=sk;g.beginPath();g.ellipse(fc-Sh*.05,ny+Sh*.12,Sh*.5,Sh*.42,0,0,7);g.fill();g.strokeStyle='rgba(60,25,10,.55)';g.lineWidth=Math.max(.8,Sh*.18);g.stroke();
        g.fillStyle=lsk;g.beginPath();g.ellipse(fc-Sh*.18,ny-Sh*.02,Sh*.18,Sh*.14,0,0,7);g.fill();
        g.fillStyle='#2a140c';for(const e of [-1,1]){g.beginPath();g.ellipse(fc+e*Sh*.3,ny+Sh*.45,Sh*.16,Sh*.1,0,0,7);g.fill()}
        if(L.beard==='stache'){g.fillStyle=hc;g.beginPath();g.moveTo(fc,hy+r*.5);g.quadraticCurveTo(fc-r*.5,hy+r*.42,fc-r*.56,hy+r*.62);g.quadraticCurveTo(fc-r*.3,hy+r*.58,fc,hy+r*.58);g.quadraticCurveTo(fc+r*.3,hy+r*.58,fc+r*.56,hy+r*.62);g.quadraticCurveTo(fc+r*.5,hy+r*.42,fc,hy+r*.5);g.fill();g.strokeStyle=ol;g.lineWidth=ln*.6;g.stroke()}
        
        const my=hy+r*.72;g.lineCap='round';g.lineJoin='round';const mw=r*.26*sq;   // a tight, serious mouth
        if(mo===3){g.fillStyle='#3a1208';g.beginPath();g.ellipse(fc,my+r*.03,mw*.75,r*.1,0,0,7);g.fill();g.strokeStyle=ol;g.lineWidth=Math.max(.8,Sh*.18);g.stroke()}
        else if(mo===2){g.fillStyle='#f3efe6';g.fillRect(fc-mw,my-r*.03,mw*2,r*.08);g.strokeStyle=ol;g.lineWidth=Math.max(.8,Sh*.2);g.strokeRect(fc-mw,my-r*.03,mw*2,r*.08)}
        else{g.strokeStyle='#3a1208';g.lineWidth=Math.max(1,Sh*.26);g.beginPath();g.moveTo(fc-mw,my+(mo===1?r*.02:0));g.lineTo(fc+mw,my-(mo===1?r*.03:0));g.stroke()}
      }else{   // profile
        const [ex,ey]=pt(.46,.05);
        g.fillStyle='rgba(15,5,2,.4)';g.beginPath();g.moveTo(...pt(.3,-.3));g.lineTo(...pt(1.0,-.36));g.lineTo(...pt(1.0,.04));g.lineTo(...pt(.3,.06));g.closePath();g.fill();   // shadow under the brim
        g.fillStyle='#0e0603';g.beginPath();g.ellipse(ex+flip*Sh*.1,ey+Sh*.05,Sh*.44,Sh*.17,flip*.08,0,7);g.fill();   // narrow eye
        g.strokeStyle=brow;g.lineWidth=Math.max(2,Sh*.62);g.lineCap='round';g.beginPath();g.moveTo(ex-flip*Sh*.55,ey-Sh*.55);g.lineTo(ex+flip*Sh*.85,ey-Sh*.28);g.stroke();   // heavy brow
        const nx=hx+flip*rx*.96,ny=hy+r*.3;g.fillStyle=sk;g.beginPath();g.moveTo(nx-flip*Sh*.3,ny-Sh*.9);g.quadraticCurveTo(nx+flip*Sh*.95,ny+Sh*.1,nx+flip*Sh*.5,ny+Sh*.55);g.quadraticCurveTo(nx,ny+Sh*.7,nx-flip*Sh*.4,ny+Sh*.5);g.closePath();g.fill();g.strokeStyle=ol;g.lineWidth=Math.max(.9,Sh*.24);g.stroke();
        g.fillStyle='#2a140c';g.beginPath();g.ellipse(nx+flip*Sh*.1,ny+Sh*.42,Sh*.14,Sh*.09,0,0,7);g.fill();
        const [mx,my]=pt(.62,.68);
        if(mo===3){g.fillStyle='#4a1810';g.beginPath();g.ellipse(mx,my,r*.13,r*.2,0,0,7);g.fill()}
        else{g.beginPath();g.moveTo(mx-flip*r*.26,my-r*.1);g.quadraticCurveTo(mx+flip*r*.05,my+r*.28,mx+flip*r*.34,my-r*.08);g.lineTo(mx-flip*r*.26,my-r*.1);g.fillStyle='#4a1810';g.fill();g.save();g.clip();g.fillStyle='#fff';g.fillRect(mx-r*.5,my-r*.12,r,r*.12);g.restore();g.strokeStyle=ol;g.lineWidth=Math.max(1,Sh*.22);g.stroke()}
      }
      if(gear&&gear.visor){g.fillStyle=gear.vc;g.globalAlpha=.85;const ey=hy+r*.04;if(fr)g.fillRect(fc-r*.66*sq,ey-Sh*.55,r*1.32*sq,Sh*1.15);else g.fillRect(flip>0?hx+r*.3:hx-r*1.0,ey-Sh*.55,r*.7,Sh*1.15);g.globalAlpha=1}
    }
    // ---- ear holes and the facemask, in its own colour
    g.fillStyle='#1a1410';
    if(sd){const [ax,ay]=pt(-.05,.28);g.beginPath();g.arc(ax,ay,Sh*.5,0,7);g.fill();g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=Math.max(.8,Sh*.15);g.stroke()}
    else for(const e of [-1,1]){g.beginPath();g.arc(sx0+e*r*.98,hy+r*.28,Sh*(bk?.5:.38),0,7);g.fill();if(bk){g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=Math.max(.8,Sh*.15);g.stroke()}}
    if(!bk){
      g.strokeStyle='rgba(235,235,235,.92)';g.lineWidth=Math.max(1,Sh*.24);g.lineCap='round';g.beginPath();   // chin strap
      if(sd){const a=pt(-.05,.3),b=pt(.5,.95);g.moveTo(...a);g.lineTo(...b)}else{g.moveTo(sx0-r*.98,hy+r*.3);g.lineTo(fc-r*.5*sq,hy+r*1.0);g.moveTo(sx0+r*.98,hy+r*.3);g.lineTo(fc+r*.5*sq,hy+r*1.0)}g.stroke();
      g.fillStyle='#eee';g.beginPath();if(sd){const c=pt(.58,.98);g.ellipse(c[0],c[1],r*.14,r*.11,0,0,7)}else g.ellipse(fc,hy+r*1.05,r*.22*sq,r*.1,0,0,7);g.fill();
      const bars=()=>{if(sd){const f=(u,v)=>pt(u,v);   // side: three bars, two posts, wrapped past the chin
          g.moveTo(...f(.3,-.28));g.lineTo(...f(1.15,-.22));g.moveTo(...f(.3,.36));g.lineTo(...f(1.18,.38));g.moveTo(...f(.3,.74));g.lineTo(...f(1.1,.74));
          g.moveTo(...f(1.15,-.22));g.lineTo(...f(1.18,.38));g.lineTo(...f(1.1,.74));g.lineTo(...f(.95,1.12));g.lineTo(...f(.35,1.02));
          g.moveTo(...f(.72,-.26));g.lineTo(...f(.72,1.08))}
        else{const cl=fc-r*.8*sq,cr=fc+r*.8*sq,t=hy-r*.3,m=hy+r*.36,b=hy+r*.74,ch=hy+r*1.14,p1=fc-r*.66*sq,p2=fc+r*.66*sq;   // front: three bars, two posts, from under the brim down past the chin
          g.moveTo(cl,t);g.lineTo(cr,t);g.moveTo(cl,m);g.lineTo(cr,m);g.moveTo(cl,b);g.lineTo(cr,b);
          g.moveTo(cl,t);g.lineTo(cl,b);g.quadraticCurveTo(cl,ch,fc,ch);g.quadraticCurveTo(cr,ch,cr,b);g.lineTo(cr,t);
          g.moveTo(p1,t);g.lineTo(p1,ch-r*.04);g.moveTo(p2,t);g.lineTo(p2,ch-r*.04)}};
      g.lineCap='round';g.lineJoin='round';g.strokeStyle=ol;g.lineWidth=Sh*.46;g.beginPath();bars();g.stroke();g.strokeStyle=mcol;g.lineWidth=Sh*.28;g.beginPath();bars();g.stroke();g.strokeStyle='rgba(255,255,255,.28)';g.lineWidth=Math.max(.7,Sh*.08);g.beginPath();bars();g.stroke();
    }
  };
  if(view==='s'){
    const far=flip>0?A1:A2,near=flip>0?A2:A1;
    drawArm(far);drawLeg(order[0]);drawLeg(order[1]);
    if(ballPos&&bA===far)ballShape(g,ballPos.x,ballPos.y,S,ballRot);   // far side: the chest hides most of it
    torso();pads();
    head();
    armPre(near);
    if(ballPos&&bA===near)ballShape(g,ballPos.x,ballPos.y,S,ballRot);
    armPost(near,true);
  }else{
    drawLeg(order[0]);drawLeg(order[1]);armPre(A1);armPre(A2);torso();pads();
    if(ballPos&&!o.hasBall)ballShape(g,ballPos.x,ballPos.y,S,ballRot);
    if(ballPos&&o.hasBall)ballShape(g,ballPos.x,ballPos.y,S*.95,ballRot);   // tucked: drawn over the jersey, then the bent arm goes over it
    armPost(bA===A1?A2:A1,true);armPost(bA,true);jtxt();
    head();
  }
  if(o.probe){o.probe.shl={x:shl.x,y:shl.y};o.probe.hip={x:hip.x,y:hip.y};o.probe.hd={x:hd.x,y:hd.y}}
  if(o.dizzy){g.fillStyle='#ffd23a';for(let i=0;i<3;i++){const a=t*7+i*2.1;g.fillRect(hd.x+Math.cos(a)*S*2.8-S*.4,hd.y-S*3.2+Math.sin(a)*S*.7,S*.8,S*.8)}}
}
/* One outline around the whole figure: the body is drawn without outlines onto a scratch canvas, then a dark silhouette is stamped around it and the figure goes on top. */
const FIG={c:null,s:null,r:null};
function renderPerson(g,o){
  const S=o.S,x=o.x,y=o.y,L=o.look;
  if(g.canvas&&g.getTransform){const m=g.getTransform(),cw=g.canvas.width,ch=g.canvas.height,sx=x*m.a+m.e,sy=y*m.d+m.f,rx=13*S*m.a,ry=18*S*m.d;if(sx+rx<0||sx-rx>cw||sy+ry*.2<0||sy-ry>ch)return}   // off screen: nothing to draw
  const useArt=ART.on&&o.art&&!(o.lying&&0);
  if(o.lying){if(!useArt){g.fillStyle='rgba(0,0,0,.5)';g.beginPath();g.ellipse(x+S*.8,y+S*.3,S*6.4,S*2.0,0,0,7);g.fill()}if(o.star)starShape(g,x,y+S*.4,S*4.6,'#fff')}
  else{
    if(o.star){const on=!!o.spOn,pulse=on?.85+Math.abs(Math.sin((o.t||0)*6.5))*.45:.92+Math.sin((o.t||0)*4)*.08;g.save();g.shadowColor=on?'rgba(255,210,58,1)':'rgba(255,255,255,.9)';g.shadowBlur=S*(on?6:2.2);starShape(g,x,y+S*.2,S*(on?6.4:5.6)*pulse,'#fff');if(on)starShape(g,x,y+S*.2,S*(on?6.4:5.6)*pulse,'#fff');g.restore();g.fillStyle=on?'rgba(255,210,58,.16)':'rgba(255,255,255,.12)';g.beginPath();g.ellipse(x,y-S*4.5,S*3.6,S*5.8,0,0,7);g.fill()}
    if(o.aura){g.fillStyle=o.aura;g.beginPath();g.ellipse(x,y-S*4.5,S*3.8,S*6,0,0,7);g.fill()}
    if(!useArt){g.fillStyle='rgba(0,0,0,.62)';g.beginPath();g.ellipse(x+S*.7,y+S*.3,S*(2.9+1.3*L.w)*1.4,S*1.75,0,0,7);g.fill()}
  }
  if(useArt){let ok=false,ex=false;try{ok=artDraw(g,o)}catch(err){ex=true;ART.exc=(ART.exc||0)+1;ART.lastExc=String(err&&err.message||err).slice(0,80);try{g.restore()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}   // a failed draw falls through to the plain figure below, never to nothing
    if(ok)return
    if(!ex){if(!o.lying){g.fillStyle='rgba(0,0,0,.62)';g.beginPath();g.ellipse(x+S*.7,y+S*.3,S*(2.9+1.3*L.w)*1.4,S*1.75,0,0,7);g.fill()}return}}   // the new art is still decoding: draw nothing (just the shadow) rather than flashing the old figure
  if(useArt&&!o.lying){g.fillStyle='rgba(0,0,0,.62)';g.beginPath();g.ellipse(x+S*.7,y+S*.3,S*(2.9+1.3*L.w)*1.4,S*1.75,0,0,7);g.fill()}
  if(!(o.cache&&spriteFig(g,o)))figLive(g,o);
}
/* ---- baked player sprites: a player's body only changes when his pose changes, so each distinct pose is drawn once (outline and all), kept, and then simply stamped on screen ---- */
const SPR={map:new Map(),px:0,max:10e6,id:new WeakMap(),n:0,warmLeft:0,warmAt:new WeakMap(),
  oid(ob){let v=this.id.get(ob);if(!v){v=++this.n;this.id.set(ob,v)}return v},
  trim(){while(this.px>this.max&&this.map.size>1){const kk=this.map.keys().next().value,old=this.map.get(kk);this.map.delete(kk);this.px-=old.W*old.H;old.c.width=old.c.height=0}},
  clear(){for(const e of this.map.values()){e.c.width=e.c.height=0}this.map.clear();this.px=0}};
const SPR_B=[2,2.5,3.1,3.9,4.9,6.1,7.6,9.5,12,15],SPR_N=10;
function sprKey(o,Sb,pi,sp,cx,sa,tq){return o.look&&SPR.oid(o.look)+'|'+SPR.oid(o.uni)+'|'+o.num+'|'+o.tname+'|'+(o.lname||'')+'|'+o.view+'|'+o.flip+'|'+pi+'|'+sp+'|'+cx+'|'+sa+'|'+(o.stance?1:0)+'|'+(o.hasBall?o.ballSide:0)+'|'+(o.lock?o.lock.x.toFixed(1)+','+o.lock.y.toFixed(1)+','+tq:'')+'|'+(o.star?1:0)+'|'+Sb+'|'+(window.__perfLvl>=1?1:0)}
function sprBake(o,Sb,k,pi,sp,cx,sa,tq){
  const W=Math.ceil(17*Sb*k),H=Math.ceil(18.5*Sb*k),c=document.createElement('canvas');c.width=W;c.height=H;
  const sg=c.getContext('2d');sg.setTransform(k,0,0,k,0,0);
  const o2=Object.assign({},o,{x:8.5*Sb,y:16*Sb,S:Sb,phi:pi*TAU/SPR_N,speed:sp,cx,sa,t:tq,cache:false,aura:null,star:false});
  figLive(sg,o2);return{c,W,H};
}
function spriteFig(g,o){
  if(o.lying||o.preview||o.throwK!==undefined||o.moveAnim||o.armDir||o.handoff||o.styleOn||o.lunge||o.lungeDir||o.catching||!g.getTransform)return false;
  const M=g.getTransform(),k=M.a,S=o.S;let Sb=SPR_B[SPR_B.length-1];for(const b of SPR_B){if(b>=S*.93){Sb=b;break}}
  const sp=(o.speed||0)<.3?0:Math.round(o.speed*2)/2,pi=sp?(((Math.round((o.phi||0)/(TAU/SPR_N))%SPR_N)+SPR_N)%SPR_N):0,cx=Math.round((o.cx||0)*2)/2,sa=Math.round((o.sa||0)*2)/2,tq=o.lock?Math.round((o.t||0)*14/(TAU/6))%6:0;
  const key=sprKey(o,Sb,pi,sp,cx,sa,tq);if(!key)return false;
  let e=SPR.map.get(key);
  if(e){SPR.map.delete(key);SPR.map.set(key,e)}
  else{e=sprBake(o,Sb,k,pi,sp,cx,sa,tq);SPR.map.set(key,e);SPR.px+=e.W*e.H;SPR.trim()}
  const w=17*S,h=18.5*S,dx=(Math.round((o.x-w/2)*k+M.e)-M.e)/k,dy=(Math.round((o.y-16*S)*M.d+M.f)-M.f)/M.d,sm=g.imageSmoothingEnabled;
  g.imageSmoothingEnabled=true;g.drawImage(e.c,0,0,e.W,e.H,dx,dy,w,h);g.imageSmoothingEnabled=sm;
  // while the play is being set up, quietly bake this player's running frames so the first stride after the snap is already ready
  if(o.warm&&SPR.warmLeft>0){const wi=(SPR.warmAt.get(o.look)||0);SPR.warmAt.set(o.look,(wi+1)%SPR_N);
    const wv=o.team==='D'?'f':'b',w2=Object.assign({},o,{view:wv,flip:1,stance:false,hasBall:false,lock:null,cx:0,sa:wv==='f'?-1:1}),kk=sprKey(w2,Sb,wi,6,0,w2.sa,0);
    if(kk&&!SPR.map.has(kk)){SPR.warmLeft--;const e2=sprBake(w2,Sb,k,wi,6,0,w2.sa,0);SPR.map.set(kk,e2);SPR.px+=e2.W*e2.H;SPR.trim()}}
  return true;
}
function figLive(g,o){
  const S=o.S,x=o.x,y=o.y;
  const k=(g.getTransform?g.getTransform().a:1)||1,bw=(o.lying?24:17)*S,bh=(o.lying?22:18.5)*S,bx=x-bw/2,by=y-(o.lying?18:16)*S,pw=Math.ceil(bw*k),ph=Math.ceil(bh*k);
  if(!FIG.c||FIG.c.width<pw||FIG.c.height<ph){const W=Math.max(pw,FIG.c?FIG.c.width:0),H=Math.max(ph,FIG.c?FIG.c.height:0);FIG.c=document.createElement('canvas');FIG.s=document.createElement('canvas');FIG.r=document.createElement('canvas');FIG.c.width=FIG.s.width=FIG.r.width=W;FIG.c.height=FIG.s.height=FIG.r.height=H}
  const oc=FIG.c.getContext('2d'),sc=FIG.s.getContext('2d');
  oc.setTransform(1,0,0,1,0,0);oc.clearRect(0,0,pw,ph);oc.setTransform(k,0,0,k,-bx*k,-by*k);oc.__off=true;oc.imageSmoothingEnabled=false;
  if(o.lying)renderLying(oc,o);else renderBody(oc,o);
  sc.setTransform(1,0,0,1,0,0);sc.clearRect(0,0,pw,ph);sc.globalCompositeOperation='source-over';sc.drawImage(FIG.c,0,0,pw,ph,0,0,pw,ph);sc.globalCompositeOperation='source-in';sc.fillStyle='rgba(20,12,8,.96)';sc.fillRect(0,0,pw,ph);
  const lo=window.__perfLvl>=1,t=Math.max(1.2,S*.3)*(lo?1.2:.95),w=pw/k,h=ph/k,ns=(S<2.2||lo)?2:4;   // a thin outline round the whole figure: the flat silhouette stamped in a ring, then the figure on top
  const M=g.getTransform?g.getTransform():{a:1,d:1,e:0,f:0},snap=(v,m,e)=>(Math.round(v*m+e)-e)/m;   // land on whole device pixels so the copies are plain 1:1 blits
  for(let i=0;i<ns;i++){const a=i*TAU/ns+Math.PI/4;g.drawImage(FIG.s,0,0,pw,ph,snap(bx+Math.cos(a)*t,M.a,M.e),snap(by+Math.sin(a)*t,M.d,M.f),w,h)}
  g.drawImage(FIG.c,0,0,pw,ph,snap(bx,M.a,M.e),snap(by,M.d,M.f),w,h);
  if(!lo&&!o.lying&&S>=2.2){   // a thin light edge on the top and both sides, so overlapping bodies stay apart
    const rc=FIG.r.getContext('2d'),d=Math.max(1,Math.min(2,S*.26))*k;
    rc.setTransform(1,0,0,1,0,0);rc.globalCompositeOperation='source-over';rc.clearRect(0,0,pw,ph);rc.drawImage(FIG.s,0,0,pw,ph,0,0,pw,ph);
    rc.globalCompositeOperation='destination-out';rc.drawImage(FIG.s,0,0,pw,ph,0,d,pw,ph);rc.drawImage(FIG.s,0,0,pw,ph,d,0,pw,ph);rc.drawImage(FIG.s,0,0,pw,ph,-d,0,pw,ph);
    rc.globalCompositeOperation='source-in';rc.fillStyle='rgba(255,255,255,.42)';rc.fillRect(0,0,pw,ph);
    g.drawImage(FIG.r,0,0,pw,ph,snap(bx,M.a,M.e),snap(by,M.d,M.f),w,h);
  }
}
/* ============ APPROVED PLAYER ART (test build ART-T): layered front/back sprites, cached by palette, skin, facing and size ============ */
const ART={svg:{f:"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"320\" height=\"512\" viewBox=\"0 0 320 512\"><defs><path id=\"s1\" d=\"M96.0,291.0 L160.0,291.0 L160.0,324.0 L157.0,340.0 L127.0,400.0 L132.0,422.0 L123.0,440.0 L79.0,440.0 L66.0,422.0 L65.0,400.0 L62.0,340.0 Z\"/><clipPath id=\"c1\"><use href=\"#s1\"/></clipPath><mask id=\"m1\"><use href=\"#s1\" fill=\"#fff\"/><use href=\"#s1\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s2\" d=\"M64.0,386.0 L128.0,386.0 L126.0,416.0 L66.0,416.0 Z\"/><clipPath id=\"c2\"><use href=\"#s2\"/></clipPath><mask id=\"m2\"><use href=\"#s2\" fill=\"#fff\"/><use href=\"#s2\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s3\" d=\"M77.0,438.0 L123.0,438.0 L123.0,468.0 L77.0,468.0 Z\"/><clipPath id=\"c3\"><use href=\"#s3\"/></clipPath><mask id=\"m3\"><use href=\"#s3\" fill=\"#fff\"/><use href=\"#s3\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s4\" d=\"M80.0,466.0 L118.0,466.0 L125.0,480.0 L125.0,492.0 L65.0,492.0 L65.0,482.0 L72.0,472.0 Z\"/><clipPath id=\"c4\"><use href=\"#s4\"/></clipPath><mask id=\"m4\"><use href=\"#s4\" fill=\"#fff\"/><use href=\"#s4\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s5\" d=\"M65.0,477.0 L125.0,477.0 L125.0,492.0 L65.0,492.0 Z\"/><clipPath id=\"c5\"><use href=\"#s5\"/></clipPath><mask id=\"m5\"><use href=\"#s5\" fill=\"#fff\"/><use href=\"#s5\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s6\" d=\"M63.0,492.0 L127.0,492.0 L127.0,498.0 L63.0,498.0 Z\"/><clipPath id=\"c6\"><use href=\"#s6\"/></clipPath><mask id=\"m6\"><use href=\"#s6\" fill=\"#fff\"/><use href=\"#s6\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s7\" d=\"M224.0,291.0 L160.0,291.0 L160.0,324.0 L163.0,340.0 L193.0,400.0 L188.0,422.0 L197.0,440.0 L241.0,440.0 L254.0,422.0 L255.0,400.0 L258.0,340.0 Z\"/><clipPath id=\"c7\"><use href=\"#s7\"/></clipPath><mask id=\"m7\"><use href=\"#s7\" fill=\"#fff\"/><use href=\"#s7\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s8\" d=\"M256.0,386.0 L192.0,386.0 L194.0,416.0 L254.0,416.0 Z\"/><clipPath id=\"c8\"><use href=\"#s8\"/></clipPath><mask id=\"m8\"><use href=\"#s8\" fill=\"#fff\"/><use href=\"#s8\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s9\" d=\"M243.0,438.0 L197.0,438.0 L197.0,468.0 L243.0,468.0 Z\"/><clipPath id=\"c9\"><use href=\"#s9\"/></clipPath><mask id=\"m9\"><use href=\"#s9\" fill=\"#fff\"/><use href=\"#s9\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s10\" d=\"M240.0,466.0 L202.0,466.0 L195.0,480.0 L195.0,492.0 L255.0,492.0 L255.0,482.0 L248.0,472.0 Z\"/><clipPath id=\"c10\"><use href=\"#s10\"/></clipPath><mask id=\"m10\"><use href=\"#s10\" fill=\"#fff\"/><use href=\"#s10\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s11\" d=\"M255.0,477.0 L195.0,477.0 L195.0,492.0 L255.0,492.0 Z\"/><clipPath id=\"c11\"><use href=\"#s11\"/></clipPath><mask id=\"m11\"><use href=\"#s11\" fill=\"#fff\"/><use href=\"#s11\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s12\" d=\"M257.0,492.0 L193.0,492.0 L193.0,498.0 L257.0,498.0 Z\"/><clipPath id=\"c12\"><use href=\"#s12\"/></clipPath><mask id=\"m12\"><use href=\"#s12\" fill=\"#fff\"/><use href=\"#s12\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s13\" d=\"M35.0,132.0 L37.0,112.0 L70.0,97.0 L112.0,90.0 L132.0,88.0 L132.0,152.0 L44.0,152.0 Z\"/><clipPath id=\"c13\"><use href=\"#s13\"/></clipPath><mask id=\"m13\"><use href=\"#s13\" fill=\"#fff\"/><use href=\"#s13\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s14\" d=\"M285.0,132.0 L283.0,112.0 L250.0,97.0 L208.0,90.0 L188.0,88.0 L188.0,152.0 L276.0,152.0 Z\"/><clipPath id=\"c14\"><use href=\"#s14\"/></clipPath><mask id=\"m14\"><use href=\"#s14\" fill=\"#fff\"/><use href=\"#s14\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s15\" d=\"M142.0,92.0 L112.0,96.0 L66.0,104.0 L46.0,118.0 L41.0,132.0 L60.0,150.0 L80.0,170.0 L85.0,190.0 L85.0,215.0 L97.5,279.0 L222.5,279.0 L235.0,215.0 L235.0,190.0 L240.0,170.0 L260.0,150.0 L279.0,132.0 L274.0,118.0 L254.0,104.0 L208.0,96.0 L178.0,92.0 Z\"/><clipPath id=\"c15\"><use href=\"#s15\"/></clipPath><mask id=\"m15\"><use href=\"#s15\" fill=\"#fff\"/><use href=\"#s15\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s16\" d=\"M144.0,60.0 L176.0,60.0 L178.0,100.0 L142.0,100.0 Z\"/><clipPath id=\"c16\"><use href=\"#s16\"/></clipPath><mask id=\"m16\"><use href=\"#s16\" fill=\"#fff\"/><use href=\"#s16\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s17\" d=\"M136.0,44.0 L184.0,44.0 L184.0,76.0 L172.0,86.0 L148.0,86.0 L136.0,76.0 Z\"/><clipPath id=\"c17\"><use href=\"#s17\"/></clipPath><mask id=\"m17\"><use href=\"#s17\" fill=\"#fff\"/><use href=\"#s17\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s18\" d=\"M125.0,54.0 L124.0,32.0 L140.0,16.0 L160.0,12.0 L180.0,16.0 L196.0,32.0 L195.0,54.0 L195.0,70.0 L184.0,70.0 L182.0,48.0 L160.0,43.0 L138.0,48.0 L136.0,70.0 L125.0,70.0 Z\"/><clipPath id=\"c18\"><use href=\"#s18\"/></clipPath><mask id=\"m18\"><use href=\"#s18\" fill=\"#fff\"/><use href=\"#s18\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s19\" d=\"M155.0,12.0 L165.0,12.0 L165.0,45.0 L155.0,45.0 Z\"/><clipPath id=\"c19\"><use href=\"#s19\"/></clipPath><mask id=\"m19\"><use href=\"#s19\" fill=\"#fff\"/><use href=\"#s19\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s20\" d=\"M153.0,86.0 L167.0,86.0 L165.0,92.0 L155.0,92.0 Z\"/><clipPath id=\"c20\"><use href=\"#s20\"/></clipPath><mask id=\"m20\"><use href=\"#s20\" fill=\"#fff\"/><use href=\"#s20\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s21\" d=\"M97.5,279.0 L222.5,279.0 L224.0,295.0 L96.0,295.0 Z\"/><clipPath id=\"c21\"><use href=\"#s21\"/></clipPath><mask id=\"m21\"><use href=\"#s21\" fill=\"#fff\"/><use href=\"#s21\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s22\" d=\"M150.0,280.0 L170.0,280.0 L170.0,294.0 L150.0,294.0 Z\"/><clipPath id=\"c22\"><use href=\"#s22\"/></clipPath><mask id=\"m22\"><use href=\"#s22\" fill=\"#fff\"/><use href=\"#s22\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s23\" d=\"M39.5,140.0 Q27.5,140.0 25.0,145.0 L22.5,150.0 L19.3,160.0 L17.9,170.0 L18.3,180.0 L20.2,189.0 L21.3,193.5 Q22.4,198.0 22.9,213.0 L24.3,249.0 Q24.5,254.0 29.5,254.0 L53.5,254.0 Q58.5,254.0 60.0,249.2 L72.7,209.4 Q76.4,198.0 79.6,186.4 L92.5,140.0 Z\"/><clipPath id=\"c23\"><use href=\"#s23\"/></clipPath><mask id=\"m23\"><use href=\"#s23\" fill=\"#fff\"/><use href=\"#s23\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s24\" d=\"M19.8,158.0 L17.9,170.0 L88.3,170.0 L90.0,158.0 Z\"/><clipPath id=\"c24\"><use href=\"#s24\"/></clipPath><mask id=\"m24\"><use href=\"#s24\" fill=\"#fff\"/><use href=\"#s24\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s25\" d=\"M280.5,140.0 Q292.5,140.0 295.0,145.0 L297.5,150.0 L300.7,160.0 L302.1,170.0 L301.7,180.0 L299.8,189.0 L298.7,193.5 Q297.6,198.0 297.1,213.0 L295.7,249.0 Q295.5,254.0 290.5,254.0 L266.5,254.0 Q261.5,254.0 260.0,249.2 L247.3,209.4 Q243.6,198.0 240.4,186.4 L227.5,140.0 Z\"/><clipPath id=\"c25\"><use href=\"#s25\"/></clipPath><mask id=\"m25\"><use href=\"#s25\" fill=\"#fff\"/><use href=\"#s25\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s26\" d=\"M300.2,158.0 L302.1,170.0 L231.7,170.0 L230.0,158.0 Z\"/><clipPath id=\"c26\"><use href=\"#s26\"/></clipPath><mask id=\"m26\"><use href=\"#s26\" fill=\"#fff\"/><use href=\"#s26\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s27\" d=\"M24.2,253.9 Q24.8,252.0 26.8,252.0 L56.8,252.0 Q58.8,252.0 58.8,254.0 L58.8,258.0 Q58.9,262.0 58.1,265.9 L53.8,288.1 Q52.4,295.0 45.4,295.0 L27.4,295.0 Q20.4,295.0 20.7,288.0 L21.7,266.0 Q21.9,262.0 23.0,258.2 Z\"/><clipPath id=\"c27\"><use href=\"#s27\"/></clipPath><mask id=\"m27\"><use href=\"#s27\" fill=\"#fff\"/><use href=\"#s27\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s28\" d=\"M295.8,253.9 Q295.2,252.0 293.2,252.0 L263.2,252.0 Q261.2,252.0 261.2,254.0 L261.2,258.0 Q261.1,262.0 261.9,265.9 L266.2,288.1 Q267.6,295.0 274.6,295.0 L292.6,295.0 Q299.6,295.0 299.3,288.0 L298.3,266.0 Q298.1,262.0 297.0,258.2 Z\"/><clipPath id=\"c28\"><use href=\"#s28\"/></clipPath><mask id=\"m28\"><use href=\"#s28\" fill=\"#fff\"/><use href=\"#s28\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask></defs><g data-layer=\"pants\"><use href=\"#s1\" fill=\"var(--pants)\"/><g clip-path=\"url(#c1)\"><path d=\"M60.0,289.0 L107.1,289.0 L60.0,341.7 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M122.8,289.0 L162.0,289.0 L162.0,442.0 L89.4,442.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m1)\"><use href=\"#s1\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s1\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s2\" fill=\"var(--pants)\"/><g clip-path=\"url(#c2)\"><path d=\"M62.0,384.0 L93.4,384.0 L62.0,396.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M103.7,384.0 L130.0,384.0 L130.0,418.0 L81.9,418.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m2)\"><use href=\"#s2\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s2\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M150.0,330.0 L120.0,396.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"0.4\"/><use href=\"#s7\" fill=\"var(--pants)\"/><g clip-path=\"url(#c7)\"><path d=\"M158.0,289.0 L205.1,289.0 L158.0,341.7 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M220.8,289.0 L260.0,289.0 L260.0,442.0 L187.4,442.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m7)\"><use href=\"#s7\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s7\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s8\" fill=\"var(--pants)\"/><g clip-path=\"url(#c8)\"><path d=\"M190.0,384.0 L221.4,384.0 L190.0,396.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M231.7,384.0 L258.0,384.0 L258.0,418.0 L209.9,418.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m8)\"><use href=\"#s8\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s8\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M170.0,330.0 L200.0,396.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"0.4\"/><path d=\"M103.0,298.0 L71.0,340.0 L74.0,400.0 L75.0,420.0 L84.0,436.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"13.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M103.0,298.0 L71.0,340.0 L74.0,400.0 L75.0,420.0 L84.0,436.0\" fill=\"none\" stroke=\"var(--stripe)\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M103.0,298.0 L71.0,340.0 L74.0,400.0 L75.0,420.0 L84.0,436.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"3.0\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M217.0,298.0 L249.0,340.0 L246.0,400.0 L245.0,420.0 L236.0,436.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"13.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M217.0,298.0 L249.0,340.0 L246.0,400.0 L245.0,420.0 L236.0,436.0\" fill=\"none\" stroke=\"var(--stripe)\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M217.0,298.0 L249.0,340.0 L246.0,400.0 L245.0,420.0 L236.0,436.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"3.0\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g data-layer=\"base_belt\"><g transform=\"translate(0,7)\"><use href=\"#s21\" fill=\"#1c1824\"/><g clip-path=\"url(#c21)\"><path d=\"M94.0,277.0 L154.9,277.0 L94.0,284.4 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M175.4,277.0 L226.0,277.0 L226.0,297.0 L131.8,297.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m21)\"><use href=\"#s21\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s21\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s22\" fill=\"var(--accent)\"/><g mask=\"url(#m22)\"><use href=\"#s22\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s22\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"accent_socks\"><use href=\"#s3\" fill=\"var(--sock)\"/><g clip-path=\"url(#c3)\"><path d=\"M75.0,436.0 L98.2,436.0 L75.0,448.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M105.5,436.0 L125.0,436.0 L125.0,470.0 L89.9,470.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m3)\"><use href=\"#s3\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s3\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M78.0,448.0 L122.0,448.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M78.0,448.0 L122.0,448.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M78.0,448.0 L122.0,448.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M78.0,459.0 L122.0,459.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"6.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M78.0,459.0 L122.0,459.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M78.0,459.0 L122.0,459.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.8\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><use href=\"#s9\" fill=\"var(--sock)\"/><g clip-path=\"url(#c9)\"><path d=\"M195.0,436.0 L218.2,436.0 L195.0,448.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M225.5,436.0 L245.0,436.0 L245.0,470.0 L209.9,470.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m9)\"><use href=\"#s9\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s9\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M242.0,448.0 L198.0,448.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M242.0,448.0 L198.0,448.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M242.0,448.0 L198.0,448.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M242.0,459.0 L198.0,459.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"6.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M242.0,459.0 L198.0,459.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M242.0,459.0 L198.0,459.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.8\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g data-layer=\"base_cleats\"><use href=\"#s4\" fill=\"#C9CDD6\"/><g clip-path=\"url(#c4)\"><path d=\"M63.0,464.0 L92.6,464.0 L63.0,474.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M102.2,464.0 L127.0,464.0 L127.0,494.0 L81.8,494.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m4)\"><use href=\"#s4\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s4\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s5\" fill=\"var(--cap)\"/><g mask=\"url(#m5)\"><use href=\"#s5\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s5\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M70.0,479.0 L120.0,479.0\" fill=\"none\" stroke=\"#f4f4f8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M92.0,469.0 L116.0,469.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M90.0,473.0 L119.0,473.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M88.0,477.0 L121.0,477.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><use href=\"#s6\" fill=\"#e0a22a\"/><g mask=\"url(#m6)\"><use href=\"#s6\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s6\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s10\" fill=\"#C9CDD6\"/><g clip-path=\"url(#c10)\"><path d=\"M193.0,464.0 L222.6,464.0 L193.0,474.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M232.2,464.0 L257.0,464.0 L257.0,494.0 L211.8,494.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m10)\"><use href=\"#s10\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s10\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s11\" fill=\"var(--cap)\"/><g mask=\"url(#m11)\"><use href=\"#s11\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s11\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M250.0,479.0 L200.0,479.0\" fill=\"none\" stroke=\"#f4f4f8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M228.0,469.0 L204.0,469.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M230.0,473.0 L201.0,473.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M232.0,477.0 L199.0,477.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><use href=\"#s12\" fill=\"#e0a22a\"/><g mask=\"url(#m12)\"><use href=\"#s12\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s12\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g data-layer=\"base_arms\"><g transform=\"translate(0,7)\"><use href=\"#s23\" fill=\"var(--skin)\"/><g clip-path=\"url(#c23)\"><rect x=\"67.14774820413052\" y=\"138\" width=\"74.57336789821461\" height=\"118\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m23)\"><use href=\"#s23\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s23\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s24\" fill=\"var(--accent)\"/><g clip-path=\"url(#c24)\"><path d=\"M15.9,156.0 L51.1,156.0 L15.9,162.1 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M62.6,156.0 L92.0,156.0 L92.0,172.0 L38.1,172.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m24)\"><use href=\"#s24\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s24\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s25\" fill=\"var(--skin)\"/><g clip-path=\"url(#c25)\"><rect x=\"276.7157295232982\" y=\"138\" width=\"74.57336789821463\" height=\"118\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m25)\"><use href=\"#s25\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s25\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s26\" fill=\"var(--accent)\"/><g clip-path=\"url(#c26)\"><path d=\"M228.0,156.0 L263.2,156.0 L228.0,162.1 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M274.7,156.0 L304.1,156.0 L304.1,172.0 L250.2,172.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m26)\"><use href=\"#s26\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s26\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"base_gloves\"><g transform=\"translate(0,7)\"><use href=\"#s27\" fill=\"#4d5063\"/><g clip-path=\"url(#c27)\"><path d=\"M18.4,250.0 L38.1,250.0 L18.4,266.6 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M44.3,250.0 L60.9,250.0 L60.9,297.0 L31.2,297.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m27)\"><use href=\"#s27\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s27\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M27.8,256.0 L55.8,256.0\" fill=\"none\" stroke=\"#c4c8d6\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M26.2,270.0 L33.2,271.0\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M35.2,270.6 L42.2,271.6\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M44.2,271.2 L51.2,272.2\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><use href=\"#s28\" fill=\"#4d5063\"/><g clip-path=\"url(#c28)\"><path d=\"M259.1,250.0 L278.8,250.0 L259.1,266.6 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M285.0,250.0 L301.6,250.0 L301.6,297.0 L271.9,297.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m28)\"><use href=\"#s28\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s28\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M292.2,256.0 L264.2,256.0\" fill=\"none\" stroke=\"#c4c8d6\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M293.8,270.0 L286.8,271.0\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M284.8,270.6 L277.8,271.6\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M275.8,271.2 L268.8,272.2\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/></g></g><g data-layer=\"base_pads\"><g transform=\"translate(0,7)\"><use href=\"#s13\" fill=\"#aab0bf\"/><g clip-path=\"url(#c13)\"><use href=\"#s13\" fill=\"none\" stroke=\"#6f758a\" stroke-width=\"12\"/></g><g clip-path=\"url(#c13)\"><path d=\"M33.0,86.0 L79.6,86.0 L33.0,109.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M95.1,86.0 L134.0,86.0 L134.0,154.0 L62.2,154.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m13)\"><use href=\"#s13\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s13\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s14\" fill=\"#aab0bf\"/><g clip-path=\"url(#c14)\"><use href=\"#s14\" fill=\"none\" stroke=\"#6f758a\" stroke-width=\"12\"/></g><g clip-path=\"url(#c14)\"><path d=\"M186.0,86.0 L232.6,86.0 L186.0,109.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M248.1,86.0 L287.0,86.0 L287.0,154.0 L215.2,154.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m14)\"><use href=\"#s14\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s14\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"base_neck\"><g transform=\"translate(0,7)\"><use href=\"#s16\" fill=\"var(--skin)\"/><g clip-path=\"url(#c16)\"><rect x=\"165.76\" y=\"58\" width=\"36\" height=\"44\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#s16\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"jersey\"><g transform=\"translate(0,7)\"><use href=\"#s15\" fill=\"var(--jersey)\"/><g clip-path=\"url(#c15)\"><path d=\"M39.0,90.0 L150.5,90.0 L39.0,155.6 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M188.6,90.0 L281.0,90.0 L281.0,281.0 L107.6,281.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m15)\"><use href=\"#s15\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s15\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M104.0,274.0 L216.0,274.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M104.0,274.0 L216.0,274.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M104.0,274.0 L216.0,274.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M140.0,96.0 L160.0,114.0 L180.0,96.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M140.0,96.0 L160.0,114.0 L180.0,96.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M140.0,96.0 L160.0,114.0 L180.0,96.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g></g><g data-layer=\"base_face\"><g transform=\"translate(160,0) scale(1.118) translate(-160,-12)\"><use href=\"#s17\" fill=\"var(--skin)\"/><g clip-path=\"url(#c17)\"><rect x=\"167.68\" y=\"42\" width=\"48\" height=\"46\" fill=\"#000\" opacity=\"0.25\"/><path d=\"M136.0,72.0 L148.0,86.0 L172.0,86.0 L184.0,72.0 L184.0,86.0 L136.0,86.0 Z\" fill=\"#000\" opacity=\".3\"/></g><use href=\"#s17\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><ellipse cx=\"149\" cy=\"62\" rx=\"6\" ry=\"2.34\" fill=\"#f4f4f6\" stroke=\"#15111d\" stroke-width=\"1\"/><ellipse cx=\"149\" cy=\"62\" rx=\"1.3\" ry=\"1.3\" fill=\"#1a1018\"/><path d=\"M142,59.66 L156,59.66\" stroke=\"#1b1118\" stroke-width=\"4\" stroke-linecap=\"butt\"/><ellipse cx=\"171\" cy=\"62\" rx=\"6\" ry=\"2.34\" fill=\"#f4f4f6\" stroke=\"#15111d\" stroke-width=\"1\"/><ellipse cx=\"171\" cy=\"62\" rx=\"1.3\" ry=\"1.3\" fill=\"#1a1018\"/><path d=\"M164,59.66 L178,59.66\" stroke=\"#1b1118\" stroke-width=\"4\" stroke-linecap=\"butt\"/><path d=\"M139.0,53.0 L156.0,58.0\" fill=\"none\" stroke=\"#1b1118\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M181.0,53.0 L164.0,58.0\" fill=\"none\" stroke=\"#1b1118\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M152.0,77.0 L168.0,77.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M140.0,72.0 L148.0,84.0 L160.0,87.0 L172.0,84.0 L180.0,72.0\" fill=\"none\" stroke=\"#5a3320\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"0.55\"/></g></g><g data-layer=\"helmet\"><g transform=\"translate(160,0) scale(1.118) translate(-160,-12)\"><use href=\"#s18\" fill=\"var(--helmet)\"/><g clip-path=\"url(#c18)\"><path d=\"M122.0,10.0 L157.1,10.0 L122.0,31.7 Z\" fill=\"#fff\" opacity=\"0.12\"/><path d=\"M168.6,10.0 L198.0,10.0 L198.0,72.0 L144.2,72.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m18)\"><use href=\"#s18\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s18\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"accent_helmet\"><g transform=\"translate(160,0) scale(1.118) translate(-160,-12)\"><use href=\"#s19\" fill=\"var(--hs)\"/><g mask=\"url(#m19)\"><use href=\"#s19\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s19\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"base_helmetparts\"><g transform=\"translate(160,0) scale(1.118) translate(-160,-12)\"><ellipse cx=\"131\" cy=\"58\" rx=\"4.4\" ry=\"7.5\" fill=\"#0b0912\" stroke=\"#15111d\" stroke-width=\"1.5\"/><ellipse cx=\"189\" cy=\"58\" rx=\"4.4\" ry=\"7.5\" fill=\"#0b0912\" stroke=\"#15111d\" stroke-width=\"1.5\"/><path d=\"M138.0,46.0 L138.0,76.0 L148.0,86.0 L172.0,86.0 L182.0,76.0 L182.0,46.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"5.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M138.0,46.0 L138.0,76.0 L148.0,86.0 L172.0,86.0 L182.0,76.0 L182.0,46.0\" fill=\"none\" stroke=\"var(--mask)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M138.0,46.0 L138.0,76.0 L148.0,86.0 L172.0,86.0 L182.0,76.0 L182.0,46.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.5\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M137.0,46.0 L183.0,46.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"5.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M137.0,46.0 L183.0,46.0\" fill=\"none\" stroke=\"var(--mask)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M137.0,46.0 L183.0,46.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.5\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M137.0,71.0 L183.0,71.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"5.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M137.0,71.0 L183.0,71.0\" fill=\"none\" stroke=\"var(--mask)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M137.0,71.0 L183.0,71.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.5\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M137.0,79.0 L183.0,79.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"5.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M137.0,79.0 L183.0,79.0\" fill=\"none\" stroke=\"var(--mask)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M137.0,79.0 L183.0,79.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.5\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M160.0,44.0 L160.0,87.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"5.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M160.0,44.0 L160.0,87.0\" fill=\"none\" stroke=\"var(--mask)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M160.0,44.0 L160.0,87.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.5\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M131.0,64.0 L147.0,84.0\" fill=\"none\" stroke=\"#e8e8f0\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M189.0,64.0 L173.0,84.0\" fill=\"none\" stroke=\"#e8e8f0\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><use href=\"#s20\" fill=\"#e8e8f0\"/><g mask=\"url(#m20)\"><use href=\"#s20\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s20\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linejoin=\"round\"/></g></g></svg>",b:"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"320\" height=\"512\" viewBox=\"0 0 320 512\"><defs><path id=\"s1\" d=\"M96.0,291.0 L160.0,291.0 L160.0,324.0 L157.0,340.0 L127.0,400.0 L132.0,422.0 L123.0,440.0 L79.0,440.0 L66.0,422.0 L65.0,400.0 L62.0,340.0 Z\"/><clipPath id=\"c1\"><use href=\"#s1\"/></clipPath><mask id=\"m1\"><use href=\"#s1\" fill=\"#fff\"/><use href=\"#s1\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s2\" d=\"M64.0,386.0 L128.0,386.0 L126.0,416.0 L66.0,416.0 Z\"/><clipPath id=\"c2\"><use href=\"#s2\"/></clipPath><mask id=\"m2\"><use href=\"#s2\" fill=\"#fff\"/><use href=\"#s2\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s3\" d=\"M77.0,438.0 L123.0,438.0 L123.0,468.0 L77.0,468.0 Z\"/><clipPath id=\"c3\"><use href=\"#s3\"/></clipPath><mask id=\"m3\"><use href=\"#s3\" fill=\"#fff\"/><use href=\"#s3\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s4\" d=\"M80.0,466.0 L118.0,466.0 L125.0,480.0 L125.0,492.0 L65.0,492.0 L65.0,482.0 L72.0,472.0 Z\"/><clipPath id=\"c4\"><use href=\"#s4\"/></clipPath><mask id=\"m4\"><use href=\"#s4\" fill=\"#fff\"/><use href=\"#s4\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s5\" d=\"M72.0,472.0 L118.0,472.0 L120.0,490.0 L70.0,490.0 Z\"/><clipPath id=\"c5\"><use href=\"#s5\"/></clipPath><mask id=\"m5\"><use href=\"#s5\" fill=\"#fff\"/><use href=\"#s5\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s6\" d=\"M63.0,492.0 L127.0,492.0 L127.0,498.0 L63.0,498.0 Z\"/><clipPath id=\"c6\"><use href=\"#s6\"/></clipPath><mask id=\"m6\"><use href=\"#s6\" fill=\"#fff\"/><use href=\"#s6\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s7\" d=\"M224.0,291.0 L160.0,291.0 L160.0,324.0 L163.0,340.0 L193.0,400.0 L188.0,422.0 L197.0,440.0 L241.0,440.0 L254.0,422.0 L255.0,400.0 L258.0,340.0 Z\"/><clipPath id=\"c7\"><use href=\"#s7\"/></clipPath><mask id=\"m7\"><use href=\"#s7\" fill=\"#fff\"/><use href=\"#s7\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s8\" d=\"M256.0,386.0 L192.0,386.0 L194.0,416.0 L254.0,416.0 Z\"/><clipPath id=\"c8\"><use href=\"#s8\"/></clipPath><mask id=\"m8\"><use href=\"#s8\" fill=\"#fff\"/><use href=\"#s8\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s9\" d=\"M243.0,438.0 L197.0,438.0 L197.0,468.0 L243.0,468.0 Z\"/><clipPath id=\"c9\"><use href=\"#s9\"/></clipPath><mask id=\"m9\"><use href=\"#s9\" fill=\"#fff\"/><use href=\"#s9\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s10\" d=\"M240.0,466.0 L202.0,466.0 L195.0,480.0 L195.0,492.0 L255.0,492.0 L255.0,482.0 L248.0,472.0 Z\"/><clipPath id=\"c10\"><use href=\"#s10\"/></clipPath><mask id=\"m10\"><use href=\"#s10\" fill=\"#fff\"/><use href=\"#s10\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s11\" d=\"M248.0,472.0 L202.0,472.0 L200.0,490.0 L250.0,490.0 Z\"/><clipPath id=\"c11\"><use href=\"#s11\"/></clipPath><mask id=\"m11\"><use href=\"#s11\" fill=\"#fff\"/><use href=\"#s11\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s12\" d=\"M257.0,492.0 L193.0,492.0 L193.0,498.0 L257.0,498.0 Z\"/><clipPath id=\"c12\"><use href=\"#s12\"/></clipPath><mask id=\"m12\"><use href=\"#s12\" fill=\"#fff\"/><use href=\"#s12\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s13\" d=\"M35.0,132.0 L37.0,112.0 L70.0,97.0 L112.0,90.0 L132.0,88.0 L132.0,152.0 L44.0,152.0 Z\"/><clipPath id=\"c13\"><use href=\"#s13\"/></clipPath><mask id=\"m13\"><use href=\"#s13\" fill=\"#fff\"/><use href=\"#s13\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s14\" d=\"M285.0,132.0 L283.0,112.0 L250.0,97.0 L208.0,90.0 L188.0,88.0 L188.0,152.0 L276.0,152.0 Z\"/><clipPath id=\"c14\"><use href=\"#s14\"/></clipPath><mask id=\"m14\"><use href=\"#s14\" fill=\"#fff\"/><use href=\"#s14\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s15\" d=\"M142.0,92.0 L112.0,96.0 L66.0,104.0 L46.0,118.0 L41.0,132.0 L60.0,150.0 L80.0,170.0 L85.0,190.0 L85.0,215.0 L97.5,279.0 L222.5,279.0 L235.0,215.0 L235.0,190.0 L240.0,170.0 L260.0,150.0 L279.0,132.0 L274.0,118.0 L254.0,104.0 L208.0,96.0 L178.0,92.0 Z\"/><clipPath id=\"c15\"><use href=\"#s15\"/></clipPath><mask id=\"m15\"><use href=\"#s15\" fill=\"#fff\"/><use href=\"#s15\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s16\" d=\"M144.0,60.0 L176.0,60.0 L178.0,100.0 L142.0,100.0 Z\"/><clipPath id=\"c16\"><use href=\"#s16\"/></clipPath><mask id=\"m16\"><use href=\"#s16\" fill=\"#fff\"/><use href=\"#s16\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s17\" d=\"M125.0,54.0 L124.0,32.0 L140.0,16.0 L160.0,12.0 L180.0,16.0 L196.0,32.0 L195.0,54.0 L190.0,72.0 L176.0,84.0 L144.0,84.0 L130.0,72.0 Z\"/><clipPath id=\"c17\"><use href=\"#s17\"/></clipPath><mask id=\"m17\"><use href=\"#s17\" fill=\"#fff\"/><use href=\"#s17\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s18\" d=\"M155.0,12.0 L165.0,12.0 L165.0,80.0 L155.0,80.0 Z\"/><clipPath id=\"c18\"><use href=\"#s18\"/></clipPath><mask id=\"m18\"><use href=\"#s18\" fill=\"#fff\"/><use href=\"#s18\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s19\" d=\"M138.0,72.0 L182.0,72.0 L184.0,84.0 L136.0,84.0 Z\"/><clipPath id=\"c19\"><use href=\"#s19\"/></clipPath><mask id=\"m19\"><use href=\"#s19\" fill=\"#fff\"/><use href=\"#s19\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s20\" d=\"M97.5,279.0 L222.5,279.0 L224.0,295.0 L96.0,295.0 Z\"/><clipPath id=\"c20\"><use href=\"#s20\"/></clipPath><mask id=\"m20\"><use href=\"#s20\" fill=\"#fff\"/><use href=\"#s20\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s21\" d=\"M150.0,280.0 L170.0,280.0 L170.0,294.0 L150.0,294.0 Z\"/><clipPath id=\"c21\"><use href=\"#s21\"/></clipPath><mask id=\"m21\"><use href=\"#s21\" fill=\"#fff\"/><use href=\"#s21\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s22\" d=\"M39.5,140.0 Q27.5,140.0 25.0,145.0 L22.5,150.0 L19.3,160.0 L17.9,170.0 L18.3,180.0 L20.2,189.0 L21.3,193.5 Q22.4,198.0 22.9,213.0 L24.3,249.0 Q24.5,254.0 29.5,254.0 L53.5,254.0 Q58.5,254.0 60.0,249.2 L72.7,209.4 Q76.4,198.0 79.6,186.4 L92.5,140.0 Z\"/><clipPath id=\"c22\"><use href=\"#s22\"/></clipPath><mask id=\"m22\"><use href=\"#s22\" fill=\"#fff\"/><use href=\"#s22\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s23\" d=\"M19.8,158.0 L17.9,170.0 L88.3,170.0 L90.0,158.0 Z\"/><clipPath id=\"c23\"><use href=\"#s23\"/></clipPath><mask id=\"m23\"><use href=\"#s23\" fill=\"#fff\"/><use href=\"#s23\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s24\" d=\"M280.5,140.0 Q292.5,140.0 295.0,145.0 L297.5,150.0 L300.7,160.0 L302.1,170.0 L301.7,180.0 L299.8,189.0 L298.7,193.5 Q297.6,198.0 297.1,213.0 L295.7,249.0 Q295.5,254.0 290.5,254.0 L266.5,254.0 Q261.5,254.0 260.0,249.2 L247.3,209.4 Q243.6,198.0 240.4,186.4 L227.5,140.0 Z\"/><clipPath id=\"c24\"><use href=\"#s24\"/></clipPath><mask id=\"m24\"><use href=\"#s24\" fill=\"#fff\"/><use href=\"#s24\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s25\" d=\"M300.2,158.0 L302.1,170.0 L231.7,170.0 L230.0,158.0 Z\"/><clipPath id=\"c25\"><use href=\"#s25\"/></clipPath><mask id=\"m25\"><use href=\"#s25\" fill=\"#fff\"/><use href=\"#s25\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s26\" d=\"M24.2,253.9 Q24.8,252.0 26.8,252.0 L56.8,252.0 Q58.8,252.0 58.8,254.0 L58.8,258.0 Q58.9,262.0 58.1,265.9 L53.8,288.1 Q52.4,295.0 45.4,295.0 L27.4,295.0 Q20.4,295.0 20.7,288.0 L21.7,266.0 Q21.9,262.0 23.0,258.2 Z\"/><clipPath id=\"c26\"><use href=\"#s26\"/></clipPath><mask id=\"m26\"><use href=\"#s26\" fill=\"#fff\"/><use href=\"#s26\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask><path id=\"s27\" d=\"M295.8,253.9 Q295.2,252.0 293.2,252.0 L263.2,252.0 Q261.2,252.0 261.2,254.0 L261.2,258.0 Q261.1,262.0 261.9,265.9 L266.2,288.1 Q267.6,295.0 274.6,295.0 L292.6,295.0 Q299.6,295.0 299.3,288.0 L298.3,266.0 Q298.1,262.0 297.0,258.2 Z\"/><clipPath id=\"c27\"><use href=\"#s27\"/></clipPath><mask id=\"m27\"><use href=\"#s27\" fill=\"#fff\"/><use href=\"#s27\" fill=\"#000\" transform=\"translate(3.0,3.0)\"/></mask></defs><g data-layer=\"pants\"><use href=\"#s1\" fill=\"var(--pants)\"/><g clip-path=\"url(#c1)\"><path d=\"M60.0,289.0 L107.1,289.0 L60.0,341.7 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M122.8,289.0 L162.0,289.0 L162.0,442.0 L89.4,442.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m1)\"><use href=\"#s1\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s1\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s2\" fill=\"var(--pants)\"/><g clip-path=\"url(#c2)\"><path d=\"M62.0,384.0 L93.4,384.0 L62.0,396.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M103.7,384.0 L130.0,384.0 L130.0,418.0 L81.9,418.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m2)\"><use href=\"#s2\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s2\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M150.0,330.0 L120.0,396.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"0.4\"/><use href=\"#s7\" fill=\"var(--pants)\"/><g clip-path=\"url(#c7)\"><path d=\"M158.0,289.0 L205.1,289.0 L158.0,341.7 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M220.8,289.0 L260.0,289.0 L260.0,442.0 L187.4,442.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m7)\"><use href=\"#s7\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s7\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s8\" fill=\"var(--pants)\"/><g clip-path=\"url(#c8)\"><path d=\"M190.0,384.0 L221.4,384.0 L190.0,396.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M231.7,384.0 L258.0,384.0 L258.0,418.0 L209.9,418.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m8)\"><use href=\"#s8\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s8\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M170.0,330.0 L200.0,396.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"0.4\"/><path d=\"M103.0,298.0 L71.0,340.0 L74.0,400.0 L75.0,420.0 L84.0,436.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"13.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M103.0,298.0 L71.0,340.0 L74.0,400.0 L75.0,420.0 L84.0,436.0\" fill=\"none\" stroke=\"var(--stripe)\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M103.0,298.0 L71.0,340.0 L74.0,400.0 L75.0,420.0 L84.0,436.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"3.0\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M217.0,298.0 L249.0,340.0 L246.0,400.0 L245.0,420.0 L236.0,436.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"13.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M217.0,298.0 L249.0,340.0 L246.0,400.0 L245.0,420.0 L236.0,436.0\" fill=\"none\" stroke=\"var(--stripe)\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M217.0,298.0 L249.0,340.0 L246.0,400.0 L245.0,420.0 L236.0,436.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"3.0\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g data-layer=\"base_belt\"><g transform=\"translate(0,7)\"><use href=\"#s20\" fill=\"#1c1824\"/><g clip-path=\"url(#c20)\"><path d=\"M94.0,277.0 L154.9,277.0 L94.0,284.4 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M175.4,277.0 L226.0,277.0 L226.0,297.0 L131.8,297.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m20)\"><use href=\"#s20\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s20\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s21\" fill=\"var(--accent)\"/><g mask=\"url(#m21)\"><use href=\"#s21\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s21\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"accent_socks\"><use href=\"#s3\" fill=\"var(--sock)\"/><g clip-path=\"url(#c3)\"><path d=\"M75.0,436.0 L98.2,436.0 L75.0,448.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M105.5,436.0 L125.0,436.0 L125.0,470.0 L89.9,470.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m3)\"><use href=\"#s3\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s3\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M78.0,448.0 L122.0,448.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M78.0,448.0 L122.0,448.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M78.0,448.0 L122.0,448.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M78.0,459.0 L122.0,459.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"6.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M78.0,459.0 L122.0,459.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M78.0,459.0 L122.0,459.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.8\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><use href=\"#s9\" fill=\"var(--sock)\"/><g clip-path=\"url(#c9)\"><path d=\"M195.0,436.0 L218.2,436.0 L195.0,448.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M225.5,436.0 L245.0,436.0 L245.0,470.0 L209.9,470.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m9)\"><use href=\"#s9\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s9\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M242.0,448.0 L198.0,448.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M242.0,448.0 L198.0,448.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M242.0,448.0 L198.0,448.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M242.0,459.0 L198.0,459.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"6.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M242.0,459.0 L198.0,459.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M242.0,459.0 L198.0,459.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.8\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g data-layer=\"base_cleats\"><use href=\"#s4\" fill=\"#C9CDD6\"/><g clip-path=\"url(#c4)\"><path d=\"M63.0,464.0 L92.6,464.0 L63.0,474.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M102.2,464.0 L127.0,464.0 L127.0,494.0 L81.8,494.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m4)\"><use href=\"#s4\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s4\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s5\" fill=\"var(--cap)\"/><g mask=\"url(#m5)\"><use href=\"#s5\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s5\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s6\" fill=\"#e0a22a\"/><g mask=\"url(#m6)\"><use href=\"#s6\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s6\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s10\" fill=\"#C9CDD6\"/><g clip-path=\"url(#c10)\"><path d=\"M193.0,464.0 L222.6,464.0 L193.0,474.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M232.2,464.0 L257.0,464.0 L257.0,494.0 L211.8,494.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m10)\"><use href=\"#s10\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s10\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s11\" fill=\"var(--cap)\"/><g mask=\"url(#m11)\"><use href=\"#s11\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s11\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s12\" fill=\"#e0a22a\"/><g mask=\"url(#m12)\"><use href=\"#s12\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s12\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g data-layer=\"base_arms\"><g transform=\"translate(0,7)\"><use href=\"#s22\" fill=\"var(--skin)\"/><g clip-path=\"url(#c22)\"><rect x=\"67.14774820413052\" y=\"138\" width=\"74.57336789821461\" height=\"118\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m22)\"><use href=\"#s22\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s22\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s23\" fill=\"var(--accent)\"/><g clip-path=\"url(#c23)\"><path d=\"M15.9,156.0 L51.1,156.0 L15.9,162.1 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M62.6,156.0 L92.0,156.0 L92.0,172.0 L38.1,172.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m23)\"><use href=\"#s23\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s23\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#s24\" fill=\"var(--skin)\"/><g clip-path=\"url(#c24)\"><rect x=\"276.7157295232982\" y=\"138\" width=\"74.57336789821463\" height=\"118\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m24)\"><use href=\"#s24\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s24\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s25\" fill=\"var(--accent)\"/><g clip-path=\"url(#c25)\"><path d=\"M228.0,156.0 L263.2,156.0 L228.0,162.1 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M274.7,156.0 L304.1,156.0 L304.1,172.0 L250.2,172.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m25)\"><use href=\"#s25\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s25\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"base_gloves\"><g transform=\"translate(0,7)\"><use href=\"#s26\" fill=\"#4d5063\"/><g clip-path=\"url(#c26)\"><path d=\"M18.4,250.0 L38.1,250.0 L18.4,266.6 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M44.3,250.0 L60.9,250.0 L60.9,297.0 L31.2,297.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m26)\"><use href=\"#s26\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s26\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M27.8,256.0 L55.8,256.0\" fill=\"none\" stroke=\"#c4c8d6\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M26.2,270.0 L33.2,271.0\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M35.2,270.6 L42.2,271.6\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M44.2,271.2 L51.2,272.2\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><use href=\"#s27\" fill=\"#4d5063\"/><g clip-path=\"url(#c27)\"><path d=\"M259.1,250.0 L278.8,250.0 L259.1,266.6 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M285.0,250.0 L301.6,250.0 L301.6,297.0 L271.9,297.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m27)\"><use href=\"#s27\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s27\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M292.2,256.0 L264.2,256.0\" fill=\"none\" stroke=\"#c4c8d6\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M293.8,270.0 L286.8,271.0\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M284.8,270.6 L277.8,271.6\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M275.8,271.2 L268.8,272.2\" fill=\"none\" stroke=\"#d6d9e6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/></g></g><g data-layer=\"base_pads\"><g transform=\"translate(0,7)\"><use href=\"#s13\" fill=\"#aab0bf\"/><g clip-path=\"url(#c13)\"><use href=\"#s13\" fill=\"none\" stroke=\"#6f758a\" stroke-width=\"12\"/></g><g clip-path=\"url(#c13)\"><path d=\"M33.0,86.0 L79.6,86.0 L33.0,109.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M95.1,86.0 L134.0,86.0 L134.0,154.0 L62.2,154.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m13)\"><use href=\"#s13\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s13\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#s14\" fill=\"#aab0bf\"/><g clip-path=\"url(#c14)\"><use href=\"#s14\" fill=\"none\" stroke=\"#6f758a\" stroke-width=\"12\"/></g><g clip-path=\"url(#c14)\"><path d=\"M186.0,86.0 L232.6,86.0 L186.0,109.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M248.1,86.0 L287.0,86.0 L287.0,154.0 L215.2,154.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m14)\"><use href=\"#s14\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s14\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"base_neck\"><g transform=\"translate(0,7)\"><use href=\"#s16\" fill=\"var(--skin)\"/><g clip-path=\"url(#c16)\"><rect x=\"165.76\" y=\"58\" width=\"36\" height=\"44\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#s16\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"jersey\"><g transform=\"translate(0,7)\"><use href=\"#s15\" fill=\"var(--jersey)\"/><g clip-path=\"url(#c15)\"><path d=\"M39.0,90.0 L150.5,90.0 L39.0,155.6 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M188.6,90.0 L281.0,90.0 L281.0,281.0 L107.6,281.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m15)\"><use href=\"#s15\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s15\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M104.0,274.0 L216.0,274.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M104.0,274.0 L216.0,274.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M104.0,274.0 L216.0,274.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M140.0,96.0 L160.0,104.0 L180.0,96.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M140.0,96.0 L160.0,104.0 L180.0,96.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M140.0,96.0 L160.0,104.0 L180.0,96.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g></g><g data-layer=\"base_face\"><g transform=\"translate(160,0) scale(1.118) translate(-160,-12)\"></g></g><g data-layer=\"helmet\"><g transform=\"translate(160,0) scale(1.118) translate(-160,-12)\"><use href=\"#s17\" fill=\"var(--helmet)\"/><g clip-path=\"url(#c17)\"><path d=\"M122.0,10.0 L157.1,10.0 L122.0,36.5 Z\" fill=\"#fff\" opacity=\"0.12\"/><path d=\"M168.6,10.0 L198.0,10.0 L198.0,86.0 L144.2,86.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m17)\"><use href=\"#s17\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s17\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"accent_helmet\"><g transform=\"translate(160,0) scale(1.118) translate(-160,-12)\"><use href=\"#s18\" fill=\"var(--hs)\"/><g mask=\"url(#m18)\"><use href=\"#s18\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s18\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linejoin=\"round\"/></g></g><g data-layer=\"base_helmetparts\"><g transform=\"translate(160,0) scale(1.118) translate(-160,-12)\"><ellipse cx=\"131\" cy=\"58\" rx=\"4.4\" ry=\"7.5\" fill=\"#0b0912\" stroke=\"#15111d\" stroke-width=\"1.5\"/><ellipse cx=\"189\" cy=\"58\" rx=\"4.4\" ry=\"7.5\" fill=\"#0b0912\" stroke=\"#15111d\" stroke-width=\"1.5\"/><use href=\"#s19\" fill=\"var(--helmet)\"/><g clip-path=\"url(#c19)\"><path d=\"M134.0,70.0 L158.1,70.0 L134.0,76.1 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M165.8,70.0 L186.0,70.0 L186.0,86.0 L149.4,86.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m19)\"><use href=\"#s19\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#s19\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M131.0,64.0 L131.0,76.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/></g></g></svg>"},masters:new Map(),mmax:32,sprites:new Map(),px:0,max:9e6,nums:new Map(),npx:0,nmax:1.5e6,hits:0,miss:0,fallback:0,
  on:(()=>{try{if(/[?&]art=old/.test(location.search))return false;return localStorage.getItem('sg_art')!=='old'}catch(e){return true}})(),
  hp:.1495,W:320,H:512,FEET:[160,499],NUM:{b:[160,199],f:[160,185]},HEAD:[160,0],HAND:[[39,281],[281,281]],CARRY:[[8,308],[312,308]],
  toggle(){this.on=!this.on;try{localStorage.setItem('sg_art',this.on?'new':'old')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}this.clear();return this.on},
  clear(){for(const m of this.masters.values())if(m.c)m.c.width=m.c.height=0;this.masters.clear();for(const e of this.sprites.values())e.c.width=e.c.height=0;this.sprites.clear();this.px=0;for(const e of this.nums.values())e.c.width=e.c.height=0;this.nums.clear();this.npx=0;if(this.run)this.run.clear()},
  mem(){let m=0;for(const e of this.masters.values())if(e.c)m+=e.c.width*e.c.height*4;return{masters:this.masters.size,masterMB:+(m/1048576).toFixed(2),sprites:this.sprites.size,spriteMB:+(this.px*4/1048576).toFixed(2),numbers:this.nums.size,numberMB:+(this.npx*4/1048576).toFixed(2),run:this.run?{sets:this.run.ready.size,frames:this.run.sp.size,MB:+(this.run.px*4/1048576).toFixed(2),bakes:this.run.bakes,bakesLive:this.run.bakesLive,late:this.run.late,fail:this.run.fail,err:this.run.err}:null}}};
const hexOk=(c,d)=>/^#[0-9a-f]{6}$/i.test(c||'')?c:d;
for(const k of['f','b'])ART.svg[k]=ART.svg[k].replace(/stroke="#15111d" stroke-width="13\.4"/g,'stroke="var(--po)" stroke-width="13.4"').split('var(--cap)').join('var(--shoe)');   // two existing color slots now reach the art: the pants-stripe outline, and the toe cap / heel tab of the cleat (the light-gray upper stays)
/* SHORTS: the pants end just under the knee pad; the sock now runs from there down (same shapes, so the cuts, loops and bakes follow). */
{const SH=[["M96.0,291.0 L160.0,291.0 L160.0,324.0 L157.0,340.0 L127.0,400.0 L132.0,422.0 L123.0,440.0 L79.0,440.0 L66.0,422.0 L65.0,400.0 L62.0,340.0 Z","M96.0,291.0 L160.0,291.0 L160.0,324.0 L157.0,340.0 L127.0,400.0 L128.0,410.0 L66.0,410.0 L65.0,400.0 L62.0,340.0 Z"],
["M224.0,291.0 L160.0,291.0 L160.0,324.0 L163.0,340.0 L193.0,400.0 L188.0,422.0 L197.0,440.0 L241.0,440.0 L254.0,422.0 L255.0,400.0 L258.0,340.0 Z","M224.0,291.0 L160.0,291.0 L160.0,324.0 L163.0,340.0 L193.0,400.0 L192.0,410.0 L254.0,410.0 L255.0,400.0 L258.0,340.0 Z"],
["M64.0,386.0 L128.0,386.0 L126.0,416.0 L66.0,416.0 Z","M64.0,386.0 L128.0,386.0 L126.0,406.0 L66.0,406.0 Z"],["M256.0,386.0 L192.0,386.0 L194.0,416.0 L254.0,416.0 Z","M256.0,386.0 L192.0,386.0 L194.0,406.0 L254.0,406.0 Z"],
["M77.0,438.0 L123.0,438.0 L123.0,468.0 L77.0,468.0 Z","M73.0,410.0 L127.0,410.0 L123.0,438.0 L123.0,468.0 L77.0,468.0 L77.0,438.0 Z"],["M243.0,438.0 L197.0,438.0 L197.0,468.0 L243.0,468.0 Z","M247.0,410.0 L193.0,410.0 L197.0,438.0 L197.0,468.0 L243.0,468.0 L243.0,438.0 Z"],
["L75.0,420.0 L84.0,436.0","L74.0,408.0"],["L245.0,420.0 L236.0,436.0","L246.0,408.0"]];
for(const k of['f','b']){let t=ART.svg[k];for(const [a,b] of SH)t=t.split(a).join(b);ART.svg[k]=t}}
/* GEAR: arm sleeves (the arm below the jersey cuff, in the chosen colour) and a visor (a tinted shield over the eyes, front view only). Both are driven by colour slots, off by default. */
for(const k of['f','b']){let t=ART.svg[k];const a0=t.indexOf('<g data-layer="base_arms">'),a1=t.indexOf('<g data-layer=',a0+10);
  let arms=t.slice(a0,a1).replace(/<use href="#s(\d+)" fill="var\(--skin\)"\/>/g,(m,n)=>m+'<g clip-path="url(#c'+n+')"><rect x="0" y="170" width="320" height="100" fill="var(--sl)" fill-opacity="var(--slo)"/></g>');
  t=t.slice(0,a0)+arms+t.slice(a1);
  if(k==='f'){const m='</g><g data-layer="helmet">';if(t.indexOf(m)>0)t=t.replace(m,'<g opacity="var(--vo)"><rect x="126" y="38" width="74" height="30" rx="9" fill="var(--vc)" fill-opacity=".55" stroke="var(--po)" stroke-width="2.5"/><path d="M134 44 L158 44 L150 62 L134 62 Z" fill="#fff" fill-opacity=".28"/></g>'+m)}
  ART.svg[k]=t}
function artPal(u,skin,L){
  const v={jersey:hexOk(u.jc,'#e4572e'),pants:hexOk(u.pc,'#ece8dc'),helmet:hexOk(u.hc,hexOk(u.jc,'#e4572e')),accent:hexOk(u.jt,'#ffffff'),stripe:hexOk(u.ps,hexOk(u.jc,'#e4572e')),cap:hexOk(u.jc,'#e4572e'),sock:hexOk(u.sock,hexOk(u.jc,'#e4572e')),hs:hexOk(u.hs,hexOk(u.jt,'#ffffff')),mask:hexOk(u.mask,'#e2e5ee'),skin:hexOk(skin,'#b97a52'),sl:hexOk(L&&L.sl,'#000000'),slo:L&&L.slo==='1'?'1':'0',vc:hexOk(L&&L.vc,'#000000'),vo:L&&L.vo==='1'?'1':'0',po:hexOk(u.po,'#15111d'),shoe:hexOk(u.shoe,'#14110f'),jo1:(u.j|0)===1?'1':'0',jo2:(u.j|0)===2?'1':'0',jo3:(u.j|0)===3?'1':'0',po1:(u.p|0)===1?'1':'0',po2:(u.p|0)===2?'1':'0',po3:(u.p|0)===3?'1':'0'};
  return{v,key:v.jersey+v.pants+v.helmet+v.accent+v.stripe+v.cap+v.sock+v.hs+v.mask+v.skin+v.po+v.shoe+v.sl+v.slo+v.vc+v.vo+v.jo1+v.jo2+v.jo3+v.po1+v.po2+v.po3}}
function artMaster(pal,view,celebrate=false){   // the 320x512 master: decoded from the layered vector art once per palette+skin+facing/pose (async the first time)
  const key=pal.key+view+(celebrate?'|celebrate':'');let m=ART.masters.get(key);
  if(m){if(m.c){ART.masters.delete(key);ART.masters.set(key,m);return m.c}return null}
  m={c:null};ART.masters.set(key,m);
  const s=artStyled(view,celebrate).replace(/var\(--(\w+)\)/g,(a,k)=>pal.v[k]||'#ff00ff'),im=new Image();
  im.onload=()=>{const c=document.createElement('canvas');c.width=ART.W;c.height=ART.H;const g=c.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(im,0,0,ART.W,ART.H);m.c=c;
    while(ART.masters.size>ART.mmax){const kk=ART.masters.keys().next().value,o=ART.masters.get(kk);if(o.c)o.c.width=o.c.height=0;ART.masters.delete(kk)}};
  im.onerror=()=>{m.bad=true};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);return null}
// Only 8 sprite sizes exist (7% to 30% of the screen height, each 23% bigger than the last). A player is drawn from the next size up and scaled down a touch, so no new picture is ever baked while the play runs.
const ART_TOL=.04;   // TUNE: fraction of change in canvas height / pixel ratio that is ignored
function artSteps(){const k=(cv&&W?cv.width/W:0)||window.devicePixelRatio||1;let key=H+'|'+k.toFixed(2);if(ART._h0&&Math.abs(H-ART._h0)/ART._h0<ART_TOL&&Math.abs(k-ART._k0)/ART._k0<ART_TOL)key=ART._sk;else{ART._h0=H;ART._k0=k}if(ART._sk!==key){ART._sk=key;if(ART.run&&ART.run.clear)ART.run.clear();const lo=.07*H*k,hi=.30*H*k,a=[];for(let i=0;i<8;i++)a.push(Math.max(8,Math.round(lo*Math.pow(hi/lo,i/7)/2)*2));ART._st=a}return ART._st}
function artSized(pal,view,hpx,wsc,celebrate=false){   // downscale the master in halving steps with high-quality smoothing, then cache that size
  const st=artSteps();let hb=st[7];for(const v of st){if(v>=hpx*.98){hb=v;break}}const key=pal.key+view+'|'+hb+'|'+wsc+(celebrate?'|celebrate':'');
  let e=ART.sprites.get(key);if(e){ART.sprites.delete(key);ART.sprites.set(key,e);return e}
  const mc=artMaster(pal,view,celebrate);if(!mc)return null;
  const sc=hb/500,tw=Math.max(4,Math.round(ART.W*sc*wsc)),th=Math.max(4,Math.round(ART.H*sc));
  let cur=mc;
  while(cur.height>=th*2){const c=document.createElement('canvas');c.width=Math.max(tw,Math.round(cur.width/2));c.height=Math.max(th,Math.round(cur.height/2));const g=c.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(cur,0,0,c.width,c.height);if(cur!==mc){cur.width=cur.height=0}cur=c}
  const c=document.createElement('canvas');c.width=tw;c.height=th;const g=c.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(cur,0,0,tw,th);if(cur!==mc)cur.width=cur.height=0;
  e={c,sc:th/ART.H,scx:tw/(ART.W*wsc)};ART.sprites.set(key,e);ART.px+=tw*th;
  while(ART.px>ART.max&&ART.sprites.size>1){const kk=ART.sprites.keys().next().value,o=ART.sprites.get(kk);ART.sprites.delete(kk);ART.px-=o.c.width*o.c.height;o.c.width=o.c.height=0}
  return e}
/* the approved blocky vector digits (never mirrored); one cached little canvas per number, so numbers 0-99 never multiply the body cache */
const ART_SEG={'0':'ABCDEF','1':'BC','2':'ABGED','3':'ABGCD','4':'FGBC','5':'AFGCD','6':'AFGECD','7':'ABC','8':'ABCDEFG','9':'ABCDFG'};
function artDigit(ch,x,y,w,t,h){
  const ym=y+(h-t)/2,hs=(h+t)/2,R={A:[x,y,w,t],D:[x,y+h-t,w,t],G:[x,ym,w,t],F:[x,y,t,hs],E:[x,ym,t,hs],B:[x+w-t,y,t,hs],C:[x+w-t,ym,t,hs]};
  if(ch==='1'){const sx=x+w/2-t/2+t*.35;return[[[sx,y,t,h],[sx-t*1.05,y,t*1.05,t]],[]]}
  const rects=[...ART_SEG[ch]].map(k=>R[k]),holes=[];
  if(ch==='0')holes.push([x+t,y+t,w-2*t,h-2*t]);
  if(ch==='8'||ch==='9')holes.push([x+t,y+t,w-2*t,ym-(y+t)]);
  if(ch==='6'||ch==='8')holes.push([x+t,ym+t,w-2*t,y+h-t-(ym+t)]);
  return[rects,holes]}
const ART_NX0=80,ART_NY0=140,ART_NW=160,ART_NH=120;
// number layer (v1.21): sizes are in art units with the 4-unit outline INCLUDED; centered on the jersey (x=160) and between the collar and the belt
ART.NC={b:{H:80,W:110,gap:8,cy:196,tr:.1875,minH:80,maxH:92},f:{H:56,W:70,gap:5,cy:201,tr:.172,minH:56,maxH:64}};   // collar bottom 115/125, belt top 277 (measured from the torso)
function artNGeom(s,view){
  const c=ART.NC[view==='b'?'b':'f'],ih=c.H-8,t=ih*c.tr,one=s.length===1,glyph=ch=>ch==='1'?.7:1;
  const w1=ih*(view==='b'?.6875:.6875);   // single digit width (the approved 66:96 / 44:64 ratio)
  let ws,gap=c.gap;
  if(one)ws=[w1];else{const iw=c.W-8-gap,base=iw/(glyph(s[0])+glyph(s[1])),w=Math.min(base,ih*(view==='b'?.667:.594));ws=[w*glyph(s[0]),w*glyph(s[1])]}
  return{ih,t,ws,gap,top:c.cy-ih/2}}
function artNumber(num,view,fill,outl,sc,wsc){
  const s=String(Math.max(0,Math.min(99,num|0))),vv=view==='b'?'b':'f',key=s+'|'+vv+'|'+fill+'|'+outl+'|'+Math.round(sc*1000)+'|'+wsc+'|'+ART.NC[vv].H;
  let e=ART.nums.get(key);if(e){ART.nums.delete(key);ART.nums.set(key,e);return e}
  const G=artNGeom(s,vv);let items=[];
  if(one1(s)){items=[[s,160-G.ws[0]/2,G.ws[0]]]}else{const tot=G.ws[0]+G.ws[1]+G.gap;let x=160-tot/2;for(let i=0;i<2;i++){items.push([s[i],x,G.ws[i]]);x+=G.ws[i]+G.gap}}
  let R=[],Ho=[];for(const[c,x,w]of items){const[r,hh]=artDigit(c,x,G.top,w,G.t,G.ih);
    let dx=0;if(c==='1'||c==='7'){let A=0,CX=0;for(const q of r){A+=q[2]*q[3];CX+=(q[0]+q[2]/2)*q[2]*q[3]}dx=Math.max(-.06*w,Math.min(.06*w,(x+w/2)-CX/A))}   // 1 and 7: the glyph's centroid goes onto its cell center (at most 6% of the digit width)
    R=R.concat(r.map(q=>[q[0]+dx,q[1],q[2],q[3]]));Ho=Ho.concat(hh.map(q=>[q[0]+dx,q[1],q[2],q[3]]))}
  const sx=sc*wsc,cw=Math.ceil(ART_NW*sx)+2,ch=Math.ceil(ART_NH*sc)+2,c=document.createElement('canvas');c.width=cw;c.height=ch;const g=c.getContext('2d');
  g.setTransform(sx,0,0,sc,-ART_NX0*sx,-ART_NY0*sc);
  g.fillStyle=outl;for(const[x,y,w,hh]of R)g.fillRect(x-4,y-4,w+8,hh+8);
  for(const[x,y,w,hh]of Ho)g.clearRect(x,y,w,hh);
  g.fillStyle=fill;for(const[x,y,w,hh]of R)g.fillRect(x,y,w,hh);
  e={c,sx,sy:sc,holes:Ho};ART.nums.set(key,e);ART.npx+=cw*ch;
  while(ART.npx>ART.nmax&&ART.nums.size>1){const kk=ART.nums.keys().next().value,o=ART.nums.get(kk);ART.nums.delete(kk);ART.npx-=o.c.width*o.c.height;o.c.width=o.c.height=0}
  return e}
const one1=s=>s.length===1;
function artShadow(g,cx,cy,rx,ry,al,feather){   // a filled ellipse with a soft edge, from a radial gradient (no canvas filters, so it runs on iPhones too)
  const f=Math.min(.9,feather/Math.max(1,Math.min(rx,ry*1)));g.save();g.translate(cx,cy);g.scale(1,ry/rx);const gr=g.createRadialGradient(0,0,0,0,0,rx);
  gr.addColorStop(0,'rgba(0,0,0,'+al+')');gr.addColorStop(Math.max(.3,1-feather/Math.max(1,ry)),'rgba(0,0,0,'+al+')');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,rx,0,7);g.fill();g.restore()}

/* ============ RUN LOOP (v1.26): the back-view run cycle, built from parts (legs, arms, torso) and baked into the 8 sprite size steps before the snap ============ */
/* RIG: animatable parts for the back-view run loop. Reads the locked back-view art (ART.svg.b) and re-assembles it from parts:
   two legs (thigh, calf, sock, foot), two arms (upper arm, forearm + glove), belt, and the upper body (pads, neck, jersey, helmet).
   Parts are cut out of the same artwork with clip regions (8 px or more overlap, rounded at the arms), so with no pose applied it is the locked art.
   Arms get ONE outline pass around the assembled arm (underlay stroke), so no seam line crosses the elbow. */
/* RIG: animatable parts for the back-view run loop. Reads the locked back-view art (ART.svg.b) and re-assembles it from parts:
   two legs (thigh, calf, sock, foot), two arms (upper arm, forearm + glove), belt, and the upper body (pads, neck, jersey, helmet).
   Parts are cut out of the same artwork with clip regions (8 px or more overlap, rounded at the arms), so with no pose applied it is the locked art.
   Arms get ONE outline pass around the assembled arm (underlay stroke), so no seam line crosses the elbow. */
/* RIG: animatable parts for the back-view run loop. Reads the locked back-view art (ART.svg.b) and re-assembles it from parts:
   two legs (thigh, calf, sock, foot), two arms (upper arm, forearm + glove), belt, and the upper body (pads, neck, jersey, helmet).
   Parts are cut out of the same artwork with clip regions (8 px or more overlap, rounded at the arms), so with no pose applied it is the locked art.
   Arms get ONE outline pass around the assembled arm (underlay stroke), so no seam line crosses the elbow. */
/* RIG: animatable parts for the back-view run loop. Reads the locked back-view art (ART.svg.b) and re-assembles it from parts:
   two legs (thigh, calf, sock, foot), two arms (upper arm, forearm + glove), belt, and the upper body (pads, neck, jersey, helmet).
   Parts are cut out of the same artwork with clip regions (8 px or more overlap, rounded at the arms), so with no pose applied it is the locked art.
   Arms get ONE outline pass around the assembled arm (underlay stroke), so no seam line crosses the elbow. */
/* linemen: arms held wider and lower than a skill player's */
function lineArms(p){for(const a of['AL','AR']){const q=p[a];if(!q)continue;const out=a==='AL'?1:-1;if(q.ur!==undefined)q.ur=q.ur*.7+out*14;if(q.fr!==undefined)q.fr=q.fr*.5;if(q.us!==undefined)q.us=q.us*.95}}
const RIG=(function(){
const R={ready:false};
const mm=(p,q)=>[p[0]*q[0]+p[2]*q[1],p[1]*q[0]+p[3]*q[1],p[0]*q[2]+p[2]*q[3],p[1]*q[2]+p[3]*q[3],p[0]*q[4]+p[2]*q[5]+p[4],p[1]*q[4]+p[3]*q[5]+p[5]];
const T=(x,y)=>[1,0,0,1,x,y],Rt=d=>{const r=d*Math.PI/180,c=Math.cos(r),s=Math.sin(r);return[c,s,-s,c,0,0]},Sc=(a,b)=>[a,0,0,b,0,0];
const about=(px,py,...ms)=>{let m=T(px,py);for(const q of ms)m=mm(m,q);return mm(m,T(-px,-py))};
const ap=(m,x,y)=>[m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]];
const sv=m=>'matrix('+m.map(v=>+v.toFixed(4)).join(' ')+')';
R.mm=mm;R.about=about;R.ap=ap;
// joints, absolute art coordinates (left side; the right side is mirrored about x=160)
const HIP=[128,291],KNEE=[96,401],SOCK=[100,436],ANK=[100,466],SHO=[60,154],ELB=[50,212];
const CUT_K=401,CUT_S=436,CUT_F=466,CUT_E=212,DISC=29;
R.J={HIP,KNEE,SOCK,ANK,SHO,ELB};
const mir=(p,m)=>m?[320-p[0],p[1]]:p;
R.init=function(svg){
  const layer=n=>{const a='<g data-layer="'+n+'">',i=svg.indexOf(a);if(i<0)return'';const re=/<g\b|<\/g>/g;re.lastIndex=i+a.length;let d=1,m;while((m=re.exec(svg))){d+=m[0]==='<g'?1:-1;if(!d)return svg.slice(i+a.length,m.index)}return''};
  const defs=svg.slice(svg.indexOf('<defs>')+6,svg.indexOf('</defs>'));
  // arms: split the two arms, strip the arm's own outline stroke (width 3) and keep an underlay path for the single outline pass
  const splitAt=(s,re)=>{let c=0,i=-1;const g=new RegExp(re.source,'g');let m;while((m=g.exec(s))){c++;if(c===2){i=m.index;break}}return i<0?[s,'']:[s.slice(0,i),s.slice(i)]};
  const armsIn=layer('base_arms'),armsInner=armsIn.replace(/^<g transform="translate\(0,7\)">/,'').replace(/<\/g>$/,'');
  const [aL,aR]=splitAt(armsInner,/<use href="#s\d+" fill="var\(--skin\)"\/>/);
  const strip=h=>{let id=null,st='';const out=h.replace(/<use href="#(s\d+)" fill="none" stroke="#15111d" stroke-width="3" stroke-linejoin="round"\/>/,(a,b)=>{id=b;st=a;return''});return{fill:out,id,st}};
  const sl=strip(aL),sr=strip(aR);
  const glIn=layer('base_gloves'),glInner=glIn.replace(/^<g transform="translate\(0,7\)">/,'').replace(/<\/g>$/,'');
  const [gL,gR]=splitAt(glInner,/<use href="#s\d+" fill="#4d5063"\/>/);
  const T7=h=>'<g transform="translate(0,7)">'+h+'</g>';
  const under=id=>T7('<use href="#'+id+'" fill="#15111d" stroke="#15111d" stroke-width="3" stroke-linejoin="round"/>');
  R.t={defs,
    legs:layer('pants')+layer('accent_socks')+layer('base_cleats'),
    belt:'<g>'+layer('base_belt')+'</g>',
    armL:T7(sl.fill),armR:T7(sr.fill),underL:under(sl.id),underR:under(sr.id),strokeL:T7(sl.st),strokeR:T7(sr.st),
    gloveL:T7(gL),gloveR:T7(gR),
    torso:layer('base_pads')+layer('base_neck')+layer('jersey')+layer('base_face')+layer('helmet')+layer('accent_helmet')+layer('base_helmetparts'),
    body:layer('base_pads')+layer('base_neck')+layer('jersey'),head:layer('base_face')+layer('helmet')+layer('accent_helmet')+layer('base_helmetparts')};
  // clip regions
  let cp='<clipPath id="hx0"><rect x="-60" y="0" width="220" height="560"/></clipPath><clipPath id="hx1"><rect x="160" y="0" width="220" height="560"/></clipPath>';
  const ys=[[ 'th',-60,CUT_K+9],['ca',CUT_K-9,CUT_S+9],['so',CUT_S-9,CUT_F+9],['fo',CUT_F-9,620]];
  for(const [id,y0,y1] of ys)cp+='<clipPath id="'+id+'"><rect x="-60" y="'+y0+'" width="440" height="'+(y1-y0)+'"/></clipPath>';
  for(const m of[0,1]){const e=mir(ELB,m);
    cp+='<clipPath id="au'+m+'"><rect x="-60" y="-60" width="440" height="'+(CUT_E+60)+'"/><circle cx="'+e[0]+'" cy="'+e[1]+'" r="'+DISC+'"/></clipPath>';
    cp+='<clipPath id="af'+m+'"><rect x="-60" y="'+CUT_E+'" width="440" height="400"/><circle cx="'+e[0]+'" cy="'+e[1]+'" r="'+DISC+'"/></clipPath>';
    cp+='<clipPath id="ou'+m+'"><rect x="-60" y="-60" width="440" height="'+(CUT_E-DISC+60)+'"/></clipPath><clipPath id="of'+m+'"><rect x="-60" y="'+(CUT_E+DISC)+'" width="440" height="400"/></clipPath>';}
  R.t.clips=cp+'<g id="gLegs">'+R.t.legs+'</g><g id="gBelt">'+R.t.belt+'</g><g id="gTorso">'+R.t.torso+'</g><g id="gBody">'+R.t.body+'</g><g id="gHead">'+R.t.head+'</g><g id="gAL">'+R.t.armL+'</g><g id="gAR">'+R.t.armR+'</g><g id="gUL">'+R.t.underL+'</g><g id="gUR">'+R.t.underR+'</g><g id="gSL">'+R.t.strokeL+'</g><g id="gSR">'+R.t.strokeR+'</g><g id="gGL">'+R.t.gloveL+'</g><g id="gGR">'+R.t.gloveR+'</g>';
  const u=id=>'<use href="#'+id+'"/>';R.u={legs:u('gLegs'),belt:u('gBelt'),torso:u('gTorso'),body:u('gBody'),head:u('gHead'),AL:u('gAL'),AR:u('gAR'),UL:u('gUL'),UR:u('gUR'),SL:u('gSL'),SR:u('gSR'),GL:u('gGL'),GR:u('gGR')};
  R.ready=true;
};
// pose: {L:{ts,ss,rt,rs,rf,sole,dx},R:{...},AL:{us,ur,fs,fr},AR:{...},tw,bounce}
function legSVG(P,m){
  const q=Object.assign({ts:1,ss:1,rt:0,rs:0,rf:0,sole:0,dx:0,hd:0},P),s=m?-1:1;if(q.tsx)q.ts*=q.tsx;if(q.hd)q.ts*=(1-q.hd/207);
  const hip=mir(HIP,m),kn=mir(KNEE,m),so=mir(SOCK,m),an=mir(ANK,m);
  const sk=q.sole?Math.max(q.ss,.82):Math.max(q.ss,.9);
  let Mt=about(hip[0],hip[1],Rt(q.rt*s),Sc(1,q.ts));if(q.dx)Mt=mm(T(q.dx*s,0),Mt);if(q.hd)Mt=mm(T(0,q.hd),Mt);
  const Mc=mm(Mt,about(kn[0],kn[1],Rt(q.rs*s),Sc(1,q.ss)));
  const Mk=mm(Mc,about(so[0],so[1],Sc(1,sk/Math.max(q.ss,.01))));
  const Mf=mm(Mk,about(an[0],an[1],Rt(q.rf*s)));
  const g=(M,c)=>'<g transform="'+sv(M)+'"><g clip-path="url(#'+c+')"><g clip-path="url(#hx'+m+')">'+R.u.legs+'</g></g></g>';
  let o=g(Mt,'th')+g(Mc,'ca')+g(Mk,'so');
  let sole=null;
  const bot=ap(Mk,an[0],ANK[1]+2);   // where the sock ends, in screen space
  if(q.sole){   // heel lifted: from behind the camera sees the underside of the cleat: grey heel upper, amber plate with studs
    const cx=bot[0],cy=bot[1];
    const rr=(x,y,w,h,r,f,sw)=>'<rect x="'+(cx+x)+'" y="'+(cy+y)+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+f+'" stroke="#15111d" stroke-width="'+sw+'"/>';
    o+=rr(-31,-3,62,15,5,'#C9CDD6',2.5)+rr(-34,8,68,29,6,'var(--shoe)',2.5)+rr(-27,12,54,21,4,'#e0a22a',2.2);
    for(const dx of[-17,0,17])for(const dy of[18,27])o+='<ellipse cx="'+(cx+dx)+'" cy="'+(cy+dy)+'" rx="5" ry="3.4" fill="#3a3326" stroke="#15111d" stroke-width="1.3"/>';
    o+='<path d="M'+(cx-27)+','+(cy+13)+' L'+(cx+27)+','+(cy+13)+'" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>';
    sole=cy+37;
  }else{
    o+=g(Mf,'fo');
    sole=ap(Mf,an[0],498)[1];
  }
  return{svg:o,sole};
}
function armSVG(P,m){
  const q=Object.assign({us:1,ur:0,fs:1,fr:0},P),s=m?-1:1;
  const sh=mir(SHO,m),el=mir(ELB,m);
  const Mu=about(sh[0],sh[1],Rt(q.ur*s),Sc(1,q.us));
  const Mf=mm(Mu,about(el[0],el[1],Rt(q.fr*s),Sc(1,q.fs)));
  const fill=m?R.u.AR:R.u.AL,und=m?R.u.UR:R.u.UL,gl=m?R.u.GR:R.u.GL,stk=m?R.u.SR:R.u.SL;
  const part=(M,c,h)=>'<g transform="'+sv(M)+'"><g clip-path="url(#'+c+m+')">'+h+'</g></g>';
  // two underlays first, then the two fills: one outline around the assembled arm, no seam across the elbow
  // the arm's own outline is drawn on top everywhere except inside the elbow zone, where only the single underlay outline exists
  return part(Mu,'au',und)+part(Mf,'af',und)+part(Mu,'au',fill)+part(Mf,'af',fill)+part(Mu,'ou',stk)+part(Mf,'of',stk)+'<g transform="'+sv(Mf)+'">'+gl+'</g>';
}
R.measure=function(pose){   // joint and hand/foot positions after the pose, twist and bounce (art units)
  const out={},up=-(pose.bounce||0),tw=Rt(pose.tw||0),Tw=about(160,280,tw);
  for(const [k,m] of[['L',0],['R',1]]){
    const q=Object.assign({us:1,ur:0,fs:1,fr:0},pose[m?'AR':'AL']||{}),s=m?-1:1,sh=mir(SHO,m),el=mir(ELB,m);
    const Mu=about(sh[0],sh[1],Rt(q.ur*s),Sc(1,q.us)),Mf=mm(Mu,about(el[0],el[1],Rt(q.fr*s),Sc(1,q.fs)));
    const e=ap(Tw,...ap(Mu,el[0],el[1])),g=ap(Tw,...ap(Mf,...mir([41,282],m)));
    const ad=R.leanGeom(pose.lean)?R.leanGeom(pose.lean).armDy:0;out['elbow'+k]=[e[0],e[1]+up+ad];out['glove'+k]=[g[0],g[1]+up+ad];const sp=ap(Tw,...ap(Mu,sh[0],sh[1]));out['sho'+k]=[sp[0],sp[1]+up];
    const lq=Object.assign({ts:1,ss:1,rt:0,rs:0,rf:0,dx:0},pose[k]||{}),hip=mir(HIP,m),kn=mir(KNEE,m),so=mir(SOCK,m);
    let Mt=about(hip[0],hip[1],Rt(lq.rt*s),Sc(1,lq.ts));if(lq.dx)Mt=mm(T(lq.dx*s,0),Mt);const Mc=mm(Mt,about(kn[0],kn[1],Rt(lq.rs*s),Sc(1,lq.ss)));
    const kk=ap(Mt,kn[0],kn[1]),ss2=ap(Mc,so[0],so[1]),hh=ap(Mt,hip[0],hip[1]);out['knee'+k]=[kk[0],kk[1]+up];out['hip'+k]=[hh[0],hh[1]+up];out['sock'+k]=[ss2[0],ss2[1]+up];
  }
  return out};
R.leanGeom=function(l){if(!l)return null;const d=l.d,k=l.k,pt=286-(286-89)*k+d;return{d,k,armDy:d+(286-(286-154)*k-154),headDy:pt+2-80.5,numDy:(286-(286-196)*k+d)-196,padTop:pt}};
const bkSVG=bk=>bk?bk.map(r=>'<rect x="'+r[0]+'" y="'+r[1]+'" width="'+r[2]+'" height="'+r[3]+'" fill="#15111d"/>').join(''):'';   // a dark backing behind the upper body, so the tiny gaps between helmet, neck and pads (and between arm and jersey) never show the field through
R.frame=function(pose,opt){
  opt=opt||{};const ln=R.leanGeom(pose.lean),hd=ln?ln.d:0;
  const L=legSVG(Object.assign({hd},pose.L||{}),0),Rr=legSVG(Object.assign({hd},pose.R||{}),1);
  let aR=armSVG(pose.AR||{},1),aL=armSVG(pose.AL||{},0);if(opt.skip==='AL')aL='';if(opt.skip==='AR')aR='';if(opt.keep==='AL')aR='';if(opt.keep==='AR')aL='';let arms=aR+aL;if(ln)arms='<g transform="translate(0,'+ln.armDy.toFixed(2)+')">'+arms+'</g>';
  const up=-(pose.bounce||0);
  const body='<g transform="translate(0,'+up+')">'+(opt.only==='arms'?'':Rr.svg+L.svg)+(opt.only?'':(ln?'<g transform="translate(0,'+ln.d+')">'+R.u.belt+'</g>':R.u.belt))+'<g transform="rotate('+(pose.tw||0)+' 160 280)"'+(pose.yaw?' ><g transform="translate(160,0) scale('+Math.cos(pose.yaw*Math.PI/180).toFixed(4)+',1) translate(-160,0)">':'>')+bkSVG(pose.bk)+arms+(opt.only?'':(ln?'<g transform="translate(0,'+ln.d+') '+sv(about(160,286,Sc(1,ln.k)))+'">'+R.u.body+'</g><g transform="translate(0,'+ln.headDy.toFixed(2)+')">'+R.u.head+'</g>':R.u.torso))+(pose.yaw?'</g>':'')+'</g></g>';
  return{svg:'<svg xmlns="http://www.w3.org/2000/svg" width="320" height="512" viewBox="0 0 320 512"><defs>'+R.t.defs+R.t.clips+'</defs>'+body+'</svg>',soleL:L.sole+up,soleR:Rr.sole+up};
};
// ---------- the poses ----------
const PUMP={us:1,ur:50,fs:1,fr:-90},FWD={us:.6,ur:-10,fs:.5,fr:-150};
const BACKSW={us:.82,ur:-8,fs:.8,fr:-38},UPSW={us:.74,ur:-9,fs:.52,fr:150};   // arms passing the hips: one hanging back, one bent up at chest height
const TUCK={us:.84,ur:-15,fs:.62,fr:160};   // ball arm: tucked high, held still
R.TUCK=TUCK;
const KEY=[
 {L:{ts:1,ss:1},R:{ts:.86,ss:.3,sole:1},AL:PUMP,AR:FWD,tw:-8,bounce:0,sh:1},                    // 1 foot plant
 {L:{ts:.94,ss:.95},R:{ts:.9,ss:.6,sole:1},AL:BACKSW,AR:UPSW,tw:0,bounce:-8,sh:1.05,bk:[[80,232,5,10]]},          // 2 lowest point (arms passing)
 {L:{ts:1,ss:1},R:{ts:.75,ss:.2,sole:1},AL:PUMP,AR:FWD,tw:8,bounce:8,sh:.95},                   // 3 push-off
 {L:{ts:.97,ss:.95},R:{ts:.62,ss:.2,sole:1},AL:PUMP,AR:FWD,tw:8,bounce:18,sh:.75}           // 4 airborne: right sole high, left leg reaching, foot lower, no sole
];
const LIFT={"run": [[1, 0.912], [0.988, 0.936], [1, 0.873], [0.992, 0.817], [0.912, 1], [0.936, 0.988], [0.873, 1], [0.817, 0.992]], "turbo": [[1, 0.877], [0.982, 0.914], [1, 0.819], [0.989, 0.726], [0.877, 1], [0.914, 0.982], [0.819, 1], [0.726, 0.989]]};
const flip=p=>({L:p.R,R:p.L,AL:p.AR,AR:p.AL,tw:-p.tw,bounce:p.bounce,sh:p.sh,bk:p.bk?p.bk.map(r=>[320-r[0]-r[2],r[1],r[2],r[3]]):undefined});
R.KEY=KEY;
// loop(variant): variant {turbo:bool, ball:0|'L'|'R'}
R.loop=function(v){
  v=v||{};const nc=!!v.nc&&!v.line&&!v.turbo&&!v.ball;const amp=v.line?.75:v.turbo?1.15:nc?1.6:1,bn=v.line?.3:v.turbo?1.05:nc?1.25:1;
  const SCALE={ts:1,ss:1,us:1,fs:1};const sc=(o,keys)=>{if(!o)return o;const r=Object.assign({},o);for(const k of keys)if(r[k]!==undefined){r[k]=SCALE[k]?Math.max(.12,1-(1-r[k])*amp):r[k]*amp}return r};
  const fr=[];
  for(let i=0;i<8;i++){
    let p=i<4?KEY[i]:flip(KEY[i-4]);
    p={L:sc(p.L,['ts','ss','rt','rs']),R:sc(p.R,['ts','ss','rt','rs']),AL:sc(p.AL,['us','ur','fs']),AR:sc(p.AR,['us','ur','fs']),tw:p.tw*amp,bounce:p.bounce*bn,sh:p.sh,bk:p.bk};
    if(nc){for(const a of['AL','AR']){const q=p[a];if(!q||q.ur===undefined)continue;const o=Object.assign({},q);o.ur=o.ur>0?50+(o.ur-50)*.5*1.2+10:o.ur*.75-24;o.us=Math.min(1,o.us*1.1);p[a]=o}}
    if(v.turbo){for(const a of['AL','AR'])if(p[a]&&p[a].fr!==undefined)p[a]=Object.assign({},p[a],{fr:p[a].fr*Math.min(1.1,amp)})}
    if(v.ball==='L')p.AL=TUCK;else if(v.ball==='R')p.AR=TUCK;
    p.lean=v.line?{d:15,k:.9}:v.turbo?{d:30,k:.88}:{d:25,k:.9};
    if(v.line)lineArms(p);
    {const g=R.leanGeom(p.lean);p.bk=(p.bk||[]).concat([[131,g.padTop-3,10,14],[177,g.padTop-3,10,14],[126,g.padTop,6,5]])}
    {const lx=(v.turbo?LIFT.turbo:LIFT.run)[i];p.L=Object.assign({},p.L,{tsx:lx[0]});p.R=Object.assign({},p.R,{tsx:lx[1]})}   // the kicked leg is shortened a little more so its sole flashes at the same height as before the lean
    fr.push(p);
  }
  return v.line?[fr[0],fr[2],fr[4],fr[6]]:fr;
};
return R;
})();

/* SIDE: the side-view runner (facing right) built from parts; 4 approved key poses -> 8-frame loop */
const RIGF=(function(){
const R={ready:false};
const mm=(p,q)=>[p[0]*q[0]+p[2]*q[1],p[1]*q[0]+p[3]*q[1],p[0]*q[2]+p[2]*q[3],p[1]*q[2]+p[3]*q[3],p[0]*q[4]+p[2]*q[5]+p[4],p[1]*q[4]+p[3]*q[5]+p[5]];
const T=(x,y)=>[1,0,0,1,x,y],Rt=d=>{const r=d*Math.PI/180,c=Math.cos(r),s=Math.sin(r);return[c,s,-s,c,0,0]},Sc=(a,b)=>[a,0,0,b,0,0];
const about=(px,py,...ms)=>{let m=T(px,py);for(const q of ms)m=mm(m,q);return mm(m,T(-px,-py))};
const ap=(m,x,y)=>[m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]];
const sv=m=>'matrix('+m.map(v=>+v.toFixed(4)).join(' ')+')';
R.mm=mm;R.about=about;R.ap=ap;
// joints, absolute art coordinates (left side; the right side is mirrored about x=160)
const HIP=[128,291],KNEE=[96,401],SOCK=[100,436],ANK=[100,466],SHO=[60,154],ELB=[50,212];
const CUT_K=401,CUT_S=436,CUT_F=466,CUT_E=212,DISC=29;
R.J={HIP,KNEE,SOCK,ANK,SHO,ELB};
const mir=(p,m)=>m?[320-p[0],p[1]]:p;
R.init=function(svg){
  const layer=n=>{const a='<g data-layer="'+n+'">',i=svg.indexOf(a);if(i<0)return'';const re=/<g\b|<\/g>/g;re.lastIndex=i+a.length;let d=1,m;while((m=re.exec(svg))){d+=m[0]==='<g'?1:-1;if(!d)return svg.slice(i+a.length,m.index)}return''};
  const defs=svg.slice(svg.indexOf('<defs>')+6,svg.indexOf('</defs>'));
  // arms: split the two arms, strip the arm's own outline stroke (width 3) and keep an underlay path for the single outline pass
  const splitAt=(s,re)=>{let c=0,i=-1;const g=new RegExp(re.source,'g');let m;while((m=g.exec(s))){c++;if(c===2){i=m.index;break}}return i<0?[s,'']:[s.slice(0,i),s.slice(i)]};
  const armsIn=layer('base_arms'),armsInner=armsIn.replace(/^<g transform="translate\(0,7\)">/,'').replace(/<\/g>$/,'');
  const [aL,aR]=splitAt(armsInner,/<use href="#s\d+" fill="var\(--skin\)"\/>/);
  const strip=h=>{let id=null,st='';const out=h.replace(/<use href="#(s\d+)" fill="none" stroke="#15111d" stroke-width="3" stroke-linejoin="round"\/>/,(a,b)=>{id=b;st=a;return''});return{fill:out,id,st}};
  const sl=strip(aL),sr=strip(aR);
  const glIn=layer('base_gloves'),glInner=glIn.replace(/^<g transform="translate\(0,7\)">/,'').replace(/<\/g>$/,'');
  const [gL,gR]=splitAt(glInner,/<use href="#s\d+" fill="#4d5063"\/>/);
  const T7=h=>'<g transform="translate(0,7)">'+h+'</g>';
  const under=id=>T7('<use href="#'+id+'" fill="#15111d" stroke="#15111d" stroke-width="3" stroke-linejoin="round"/>');
  R.t={defs,
    legs:layer('pants')+layer('accent_socks')+layer('base_cleats'),
    belt:'<g>'+layer('base_belt')+'</g>',
    armL:T7(sl.fill),armR:T7(sr.fill),underL:under(sl.id),underR:under(sr.id),strokeL:T7(sl.st),strokeR:T7(sr.st),
    gloveL:T7(gL),gloveR:T7(gR),
    torso:layer('base_pads')+layer('base_neck')+layer('jersey')+layer('base_face')+layer('helmet')+layer('accent_helmet')+layer('base_helmetparts'),
    body:layer('base_pads')+layer('base_neck')+layer('jersey'),head:layer('base_face')+layer('helmet')+layer('accent_helmet')+layer('base_helmetparts')};
  // clip regions
  let cp='<clipPath id="hx0"><rect x="-60" y="0" width="220" height="560"/></clipPath><clipPath id="hx1"><rect x="160" y="0" width="220" height="560"/></clipPath>';
  const ys=[[ 'th',-60,CUT_K+9],['ca',CUT_K-9,CUT_S+9],['so',CUT_S-9,CUT_F+9],['fo',CUT_F-9,620]];
  for(const [id,y0,y1] of ys)cp+='<clipPath id="'+id+'"><rect x="-60" y="'+y0+'" width="440" height="'+(y1-y0)+'"/></clipPath>';
  for(const m of[0,1]){const e=mir(ELB,m);
    cp+='<clipPath id="au'+m+'"><rect x="-60" y="-60" width="440" height="'+(CUT_E+60)+'"/><circle cx="'+e[0]+'" cy="'+e[1]+'" r="'+DISC+'"/></clipPath>';
    cp+='<clipPath id="af'+m+'"><rect x="-60" y="'+CUT_E+'" width="440" height="400"/><circle cx="'+e[0]+'" cy="'+e[1]+'" r="'+DISC+'"/></clipPath>';
    cp+='<clipPath id="ou'+m+'"><rect x="-60" y="-60" width="440" height="'+(CUT_E-DISC+60)+'"/></clipPath><clipPath id="of'+m+'"><rect x="-60" y="'+(CUT_E+DISC)+'" width="440" height="400"/></clipPath>';}
  R.t.clips=cp+'<g id="gLegs">'+R.t.legs+'</g><g id="gBelt">'+R.t.belt+'</g><g id="gTorso">'+R.t.torso+'</g><g id="gBody">'+R.t.body+'</g><g id="gHead">'+R.t.head+'</g><g id="gAL">'+R.t.armL+'</g><g id="gAR">'+R.t.armR+'</g><g id="gUL">'+R.t.underL+'</g><g id="gUR">'+R.t.underR+'</g><g id="gSL">'+R.t.strokeL+'</g><g id="gSR">'+R.t.strokeR+'</g><g id="gGL">'+R.t.gloveL+'</g><g id="gGR">'+R.t.gloveR+'</g>';
  const u=id=>'<use href="#'+id+'"/>';R.u={legs:u('gLegs'),belt:u('gBelt'),torso:u('gTorso'),body:u('gBody'),head:u('gHead'),AL:u('gAL'),AR:u('gAR'),UL:u('gUL'),UR:u('gUR'),SL:u('gSL'),SR:u('gSR'),GL:u('gGL'),GR:u('gGR')};
  R.ready=true;
};
// pose: {L:{ts,ss,rt,rs,rf,sole,dx},R:{...},AL:{us,ur,fs,fr},AR:{...},tw,bounce}
function legSVG(P,m){
  const q=Object.assign({ts:1,ss:1,rt:0,rs:0,rf:0,sole:0,dx:0,hd:0},P),s=m?-1:1;if(q.tsx)q.ts*=q.tsx;if(q.hd)q.ts*=(1-q.hd/207);
  const hip=mir(HIP,m),kn=mir(KNEE,m),so=mir(SOCK,m),an=mir(ANK,m);
  const sk=q.sole?Math.max(q.ss,.82):Math.max(q.ss,.9);
  let Mt=about(hip[0],hip[1],Rt(q.rt*s),Sc(1,q.ts));if(q.dx)Mt=mm(T(q.dx*s,0),Mt);if(q.hd)Mt=mm(T(0,q.hd),Mt);
  const Mc=mm(Mt,about(kn[0],kn[1],Rt(q.rs*s),Sc(1,q.ss)));
  const Mk=mm(Mc,about(so[0],so[1],Sc(1,sk/Math.max(q.ss,.01))));
  const Mf=mm(Mk,about(an[0],an[1],Rt(q.rf*s)));
  const g=(M,c)=>'<g transform="'+sv(M)+'"><g clip-path="url(#'+c+')"><g clip-path="url(#hx'+m+')">'+R.u.legs+'</g></g></g>';
  let o=g(Mt,'th')+g(Mc,'ca')+g(Mk,'so');
  let sole=null;
  const bot=ap(Mk,an[0],ANK[1]+2);   // where the sock ends, in screen space
  if(q.sole){   // heel lifted: from behind the camera sees the underside of the cleat: grey heel upper, amber plate with studs
    const cx=bot[0],cy=bot[1];
    const rr=(x,y,w,h,r,f,sw)=>'<rect x="'+(cx+x)+'" y="'+(cy+y)+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+f+'" stroke="#15111d" stroke-width="'+sw+'"/>';
    o+=rr(-31,-3,62,15,5,'#C9CDD6',2.5)+rr(-34,8,68,29,6,'var(--shoe)',2.5)+rr(-27,12,54,21,4,'#e0a22a',2.2);
    for(const dx of[-17,0,17])for(const dy of[18,27])o+='<ellipse cx="'+(cx+dx)+'" cy="'+(cy+dy)+'" rx="5" ry="3.4" fill="#3a3326" stroke="#15111d" stroke-width="1.3"/>';
    o+='<path d="M'+(cx-27)+','+(cy+13)+' L'+(cx+27)+','+(cy+13)+'" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>';
    sole=cy+37;
  }else{
    o+=g(Mf,'fo');
    sole=ap(Mf,an[0],498)[1];
  }
  return{svg:o,sole};
}
function armSVG(P,m){
  const q=Object.assign({us:1,ur:0,fs:1,fr:0},P),s=m?-1:1;
  const sh=mir(SHO,m),el=mir(ELB,m);
  const Mu=about(sh[0],sh[1],Rt(q.ur*s),Sc(1,q.us));
  const Mf=mm(Mu,about(el[0],el[1],Rt(q.fr*s),Sc(1,q.fs)));
  const fill=m?R.u.AR:R.u.AL,und=m?R.u.UR:R.u.UL,gl=m?R.u.GR:R.u.GL,stk=m?R.u.SR:R.u.SL;
  const part=(M,c,h)=>'<g transform="'+sv(M)+'"><g clip-path="url(#'+c+m+')">'+h+'</g></g>';
  // two underlays first, then the two fills: one outline around the assembled arm, no seam across the elbow
  // the arm's own outline is drawn on top everywhere except inside the elbow zone, where only the single underlay outline exists
  return part(Mu,'au',und)+part(Mf,'af',und)+part(Mu,'au',fill)+part(Mf,'af',fill)+part(Mu,'ou',stk)+part(Mf,'of',stk)+'<g transform="'+sv(Mf)+'">'+gl+'</g>';
}
R.measure=function(pose){   // joint and hand/foot positions after the pose, twist and bounce (art units)
  const out={},up=-(pose.bounce||0),tw=Rt(pose.tw||0),Tw=about(160,280,tw);
  for(const [k,m] of[['L',0],['R',1]]){
    const q=Object.assign({us:1,ur:0,fs:1,fr:0},pose[m?'AR':'AL']||{}),s=m?-1:1,sh=mir(SHO,m),el=mir(ELB,m);
    const Mu=about(sh[0],sh[1],Rt(q.ur*s),Sc(1,q.us)),Mf=mm(Mu,about(el[0],el[1],Rt(q.fr*s),Sc(1,q.fs)));
    const e=ap(Tw,...ap(Mu,el[0],el[1])),g=ap(Tw,...ap(Mf,...mir([41,282],m)));
    const ad=R.leanGeom(pose.lean)?R.leanGeom(pose.lean).armDy:0;out['elbow'+k]=[e[0],e[1]+up+ad];out['glove'+k]=[g[0],g[1]+up+ad];const sp=ap(Tw,...ap(Mu,sh[0],sh[1]));out['sho'+k]=[sp[0],sp[1]+up];
    const lq=Object.assign({ts:1,ss:1,rt:0,rs:0,rf:0,dx:0},pose[k]||{}),hip=mir(HIP,m),kn=mir(KNEE,m),so=mir(SOCK,m);
    let Mt=about(hip[0],hip[1],Rt(lq.rt*s),Sc(1,lq.ts));if(lq.dx)Mt=mm(T(lq.dx*s,0),Mt);const Mc=mm(Mt,about(kn[0],kn[1],Rt(lq.rs*s),Sc(1,lq.ss)));
    const kk=ap(Mt,kn[0],kn[1]),ss2=ap(Mc,so[0],so[1]),hh=ap(Mt,hip[0],hip[1]);out['knee'+k]=[kk[0],kk[1]+up];out['hip'+k]=[hh[0],hh[1]+up];out['sock'+k]=[ss2[0],ss2[1]+up];
  }
  return out};
R.leanGeom=function(l){if(!l)return null;const d=l.d,k=l.k,pt=286-(286-89)*k+d;return{d,k,armDy:d+(286-(286-154)*k-154),headDy:pt+2-80.5,numDy:(286-(286-196)*k+d)-196,padTop:pt}};
const bkSVG=bk=>bk?bk.map(r=>'<rect x="'+r[0]+'" y="'+r[1]+'" width="'+r[2]+'" height="'+r[3]+'" fill="#15111d"/>').join(''):'';   // a dark backing behind the upper body, so the tiny gaps between helmet, neck and pads (and between arm and jersey) never show the field through
R.frame=function(pose,opt){
  opt=opt||{};const ln=R.leanGeom(pose.lean),hd=ln?ln.d:0;
  const L=legSVG(Object.assign({hd},pose.L||{}),0),Rr=legSVG(Object.assign({hd},pose.R||{}),1);
  const ov=pose.over||{};let aR=armSVG(pose.AR||{},1),aL=armSVG(pose.AL||{},0);if(opt.skip==='AL')aL='';if(opt.skip==='AR')aR='';if(opt.keep==='AL')aR='';if(opt.keep==='AR')aL='';const wr=h=>ln?'<g transform="translate(0,'+ln.armDy.toFixed(2)+')">'+h+'</g>':h;let arms=wr((ov.AR?'':aR)+(ov.AL?'':aL));const armsO=wr((ov.AR?aR:'')+(ov.AL?aL:''));   // front view: an arm marked 'over' is drawn in front of the jersey
  const up=-(pose.bounce||0);
  const body='<g transform="translate(0,'+up+')">'+(opt.only==='arms'?'':Rr.svg+L.svg)+(opt.only?'':(ln?'<g transform="translate(0,'+ln.d+')">'+R.u.belt+'</g>':R.u.belt))+'<g transform="rotate('+(pose.tw||0)+' 160 280)"'+(pose.yaw?' ><g transform="translate(160,0) scale('+Math.cos(pose.yaw*Math.PI/180).toFixed(4)+',1) translate(-160,0)">':'>')+bkSVG(pose.bk)+arms+(opt.only?'':(ln?'<g transform="translate(0,'+ln.d+') '+sv(about(160,286,Sc(1,ln.k)))+'">'+R.u.body+'</g><g transform="translate(0,'+ln.headDy.toFixed(2)+')">'+R.u.head+'</g>':R.u.torso))+armsO+(pose.yaw?'</g>':'')+'</g></g>';
  return{svg:'<svg xmlns="http://www.w3.org/2000/svg" width="320" height="512" viewBox="0 0 320 512"><defs>'+R.t.defs+R.t.clips+'</defs>'+body+'</svg>',soleL:L.sole+up,soleR:Rr.sole+up};
};
// ---------- the poses ----------
const PUMP={us:1,ur:50,fs:1,fr:-90},FWD={us:.6,ur:-10,fs:.5,fr:-150};
const BACKSW={us:.82,ur:-8,fs:.8,fr:-38},UPSW={us:.74,ur:-9,fs:.52,fr:150};   // arms passing the hips: one hanging back, one bent up at chest height
const TUCK={us:.84,ur:-15,fs:.62,fr:160};   // ball arm: tucked high, held still
R.TUCK=TUCK;
const KEY=[
 {L:{ts:1,ss:1},R:{ts:.86,ss:.3,sole:1},AL:PUMP,AR:FWD,tw:-8,bounce:0,sh:1},                    // 1 foot plant
 {L:{ts:.94,ss:.95},R:{ts:.9,ss:.6,sole:1},AL:BACKSW,AR:UPSW,tw:0,bounce:-8,sh:1.05,bk:[[80,232,5,10]]},          // 2 lowest point (arms passing)
 {L:{ts:1,ss:1},R:{ts:.75,ss:.2,sole:1},AL:PUMP,AR:FWD,tw:8,bounce:8,sh:.95},                   // 3 push-off
 {L:{ts:.97,ss:.95},R:{ts:.62,ss:.2,sole:1},AL:PUMP,AR:FWD,tw:8,bounce:18,sh:.75}           // 4 airborne: right sole high, left leg reaching, foot lower, no sole
];
const LIFT={"run": [[1, 0.912], [0.988, 0.936], [1, 0.873], [0.992, 0.817], [0.912, 1], [0.936, 0.988], [0.873, 1], [0.817, 0.992]], "turbo": [[1, 0.877], [0.982, 0.914], [1, 0.819], [0.989, 0.726], [0.877, 1], [0.914, 0.982], [0.819, 1], [0.726, 0.989]]};
const flip=p=>({L:p.R,R:p.L,AL:p.AR,AR:p.AL,tw:-p.tw,bounce:p.bounce,sh:p.sh,bk:p.bk?p.bk.map(r=>[320-r[0]-r[2],r[1],r[2],r[3]]):undefined});
R.KEY=KEY;
// loop(variant): variant {turbo:bool, ball:0|'L'|'R'}
R.loop=function(v){
  v=v||{};const amp=v.turbo?1.15:1,bn=v.turbo?1.05:1;
  const SCALE={ts:1,ss:1,us:1,fs:1};const sc=(o,keys)=>{if(!o)return o;const r=Object.assign({},o);for(const k of keys)if(r[k]!==undefined){r[k]=SCALE[k]?Math.max(.12,1-(1-r[k])*amp):r[k]*amp}return r};
  const fr=[];
  for(let i=0;i<8;i++){
    let p=i<4?KEY[i]:flip(KEY[i-4]);
    p={L:sc(p.L,['ts','ss','rt','rs']),R:sc(p.R,['ts','ss','rt','rs']),AL:sc(p.AL,['us','ur','fs']),AR:sc(p.AR,['us','ur','fs']),tw:p.tw*amp,bounce:p.bounce*bn,sh:p.sh,bk:p.bk};
    if(v.turbo){for(const a of['AL','AR'])if(p[a]&&p[a].fr!==undefined)p[a]=Object.assign({},p[a],{fr:p[a].fr*Math.min(1.1,amp)})}
    if(v.ball==='L')p.AL=TUCK;else if(v.ball==='R')p.AR=TUCK;
    p.lean=v.turbo?{d:30,k:.88}:{d:25,k:.9};
    {const g=R.leanGeom(p.lean);p.bk=(p.bk||[]).concat([[131,g.padTop-3,10,14],[177,g.padTop-3,10,14],[126,g.padTop,6,5]])}
    {const lx=(v.turbo?LIFT.turbo:LIFT.run)[i];p.L=Object.assign({},p.L,{tsx:lx[0]});p.R=Object.assign({},p.R,{tsx:lx[1]})}   // the kicked leg is shortened a little more so its sole flashes at the same height as before the lean
    fr.push(p);
  }
  return fr;
};

/* FRONT loop: 4 approved key poses, then the same four with legs and arms swapped (the number is never mirrored) */
const FP=[{"L": {"ts": 1, "ss": 1}, "R": {"ts": 0.68, "ss": 1, "rs": -10}, "AL": {"us": 0.9, "ur": -25, "fs": 0.9, "fr": -160}, "AR": {"us": 0.85, "ur": -40, "fs": 0.7, "fr": -10}, "over": {"AL": 1}, "tw": 0, "bounce": 0, "lean": {"d": 25, "k": 0.9}}, {"L": {"ts": 0.95, "ss": 0.85}, "R": {"ts": 0.85, "ss": 0.95, "rs": -6}, "AL": {"us": 0.9, "ur": -20, "fs": 0.9, "fr": -135}, "AR": {"us": 0.85, "ur": -30, "fs": 0.75, "fr": -30}, "over": {"AL": 1}, "tw": 0, "bounce": -8, "lean": {"d": 25, "k": 0.9}}, {"L": {"ts": 1, "ss": 1}, "R": {"ts": 0.62, "ss": 1, "rs": -8}, "AL": {"us": 0.9, "ur": -25, "fs": 0.9, "fr": -160}, "AR": {"us": 0.85, "ur": -40, "fs": 0.7, "fr": -10}, "over": {"AL": 1}, "tw": 0, "bounce": 8, "lean": {"d": 25, "k": 0.9}}, {"L": {"ts": 0.88, "ss": 0.92}, "R": {"ts": 0.6, "ss": 1, "rs": -10}, "AL": {"us": 0.9, "ur": -25, "fs": 0.9, "fr": -160}, "AR": {"us": 0.85, "ur": -40, "fs": 0.7, "fr": -10}, "over": {"AL": 1}, "tw": 0, "bounce": 18, "lean": {"d": 25, "k": 0.9}}];
const CARRYF={us:.9,ur:-25,fs:.9,fr:-160};   // the carry arm: forearm held across the chest, still for the whole run
const cp=o=>JSON.parse(JSON.stringify(o));
const flipF=p=>{const q=cp(p),o=p.over||{};q.L=p.R;q.R=p.L;q.AL=p.AR;q.AR=p.AL;q.over={AL:o.AR?1:0,AR:o.AL?1:0};q.tw=-(p.tw||0);return q};
R.loopF=function(v){v=v||{};const nc=!!v.nc&&!v.line&&!v.turbo&&!v.ball;const amp=v.line?.75:v.turbo?1.1:nc?1.6:1,fr=[];
  const SC={ts:1,ss:1,us:1,fs:1};const sc=(o,keys)=>{if(!o)return o;const r=Object.assign({},o);for(const k of keys)if(r[k]!==undefined)r[k]=SC[k]?Math.max(.12,1-(1-r[k])*amp):r[k]*amp;return r};
  for(let i=0;i<8;i++){let p=cp(i<4?FP[i]:flipF(FP[i-4]));
    p.L=sc(p.L,['ts','ss','rt','rs']);p.R=sc(p.R,['ts','ss','rt','rs']);p.AL=sc(p.AL,['us','ur','fs']);p.AR=sc(p.AR,['us','ur','fs']);p.bounce=(p.bounce||0)*(v.line?.3:nc?1.25:amp);if(nc){for(const a of['AL','AR']){const q=p[a];if(q&&q.ur!==undefined)q.ur=q.ur*1.6}}
    if(v.turbo)p.lean={d:28,k:.89};if(v.line){p.lean=Object.assign({},p.lean,{d:15});lineArms(p)}
    if(v.ball==='L'){p.AL=cp(CARRYF);p.over={AL:1,AR:p.over.AR?1:0}}else if(v.ball==='R'){p.AR=cp(CARRYF);p.over={AR:1,AL:p.over.AL?1:0}}
    fr.push(p)}
  return v.line?[fr[0],fr[2],fr[4],fr[6]]:fr};
return R;
})();
const SIDER=(function(){
const S={};const mm=RIG.mm,ap=(m,p)=>RIG.ap(m,p[0],p[1]),about=(p,...ms)=>RIG.about(p[0],p[1],...ms);
const Rt=d=>{const r=d*Math.PI/180,c=Math.cos(r),s=Math.sin(r);return[c,s,-s,c,0,0]};const sv=m=>"matrix("+m.map(v=>+v.toFixed(4)).join(" ")+")";
S.defs="<path id=\"q1\" d=\"M101.0,113.0 Q94.0,130.0 93.0,155.0 Q92.0,180.0 98.0,210.0 Q104.0,240.0 107.0,263.0 Q110.0,286.0 162.0,286.0 Q214.0,286.0 214.0,263.0 Q214.0,240.0 222.0,215.0 Q230.0,190.0 233.0,165.0 Q236.0,140.0 231.0,122.0 Q226.0,104.0 208.0,97.0 Q190.0,90.0 165.0,88.0 Q140.0,86.0 124.0,91.0 Q108.0,96.0 101.0,113.0 Z\"/><clipPath id=\"k1\"><use href=\"#q1\"/></clipPath><mask id=\"m1\"><use href=\"#q1\" fill=\"#fff\"/><use href=\"#q1\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q2\" d=\"M109.0,104.0 Q112.0,94.0 131.0,89.0 Q150.0,84.0 164.0,90.0 Q178.0,96.0 180.0,111.0 Q182.0,126.0 175.0,135.0 Q168.0,144.0 146.0,145.0 Q124.0,146.0 116.0,139.0 Q108.0,132.0 107.0,123.0 Q106.0,114.0 109.0,104.0 Z\"/><clipPath id=\"k2\"><use href=\"#q2\"/></clipPath><mask id=\"m2\"><use href=\"#q2\" fill=\"#fff\"/><use href=\"#q2\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q3\" d=\"M106.0,279.0 L216.0,279.0 L218.0,295.0 L104.0,295.0 Z\"/><clipPath id=\"k3\"><use href=\"#q3\"/></clipPath><mask id=\"m3\"><use href=\"#q3\" fill=\"#fff\"/><use href=\"#q3\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q4\" d=\"M146.0,68.0 L178.0,68.0 L182.0,98.0 L144.0,98.0 Z\"/><clipPath id=\"k4\"><use href=\"#q4\"/></clipPath><mask id=\"m4\"><use href=\"#q4\" fill=\"#fff\"/><use href=\"#q4\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q5\" d=\"M117.0,51.0 Q116.0,40.0 121.0,28.0 Q126.0,16.0 137.0,10.0 Q148.0,4.0 159.0,5.0 Q170.0,6.0 177.0,14.0 Q184.0,22.0 186.0,33.0 Q188.0,44.0 188.0,53.0 Q188.0,62.0 185.0,69.0 Q182.0,76.0 166.0,78.0 Q150.0,80.0 139.0,79.0 Q128.0,78.0 123.0,70.0 Q118.0,62.0 117.0,51.0 Z\"/><clipPath id=\"k5\"><use href=\"#q5\"/></clipPath><mask id=\"m5\"><use href=\"#q5\" fill=\"#fff\"/><use href=\"#q5\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q6\" d=\"M172.0,42.0 L192.0,44.0 L196.0,66.0 L184.0,78.0 L170.0,74.0 Z\"/><clipPath id=\"k6\"><use href=\"#q6\"/></clipPath><mask id=\"m6\"><use href=\"#q6\" fill=\"#fff\"/><use href=\"#q6\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q7\" d=\"M130.0,10.0 L166.0,4.0 L184.0,20.0 L182.0,28.0 L164.0,14.0 L134.0,20.0 Z\"/><clipPath id=\"k7\"><use href=\"#q7\"/></clipPath><mask id=\"m7\"><use href=\"#q7\" fill=\"#fff\"/><use href=\"#q7\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q8\" d=\"M155.0,104.0 Q186.0,102.0 189.0,126.0 Q192.0,150.0 188.0,175.0 Q184.0,200.0 157.0,201.0 Q130.0,202.0 124.0,176.0 Q118.0,150.0 121.0,128.0 Q124.0,106.0 155.0,104.0 Z\"/><clipPath id=\"k8\"><use href=\"#q8\"/></clipPath><mask id=\"m8\"><use href=\"#q8\" fill=\"#fff\"/><use href=\"#q8\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q9\" d=\"M118.0,150.0 L192.0,150.0 L190.0,164.0 L118.0,164.0 Z\"/><clipPath id=\"k9\"><use href=\"#q9\"/></clipPath><mask id=\"m9\"><use href=\"#q9\" fill=\"#fff\"/><use href=\"#q9\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q10\" d=\"M157.0,198.0 Q186.0,198.0 184.0,218.0 Q182.0,238.0 178.0,252.0 Q174.0,266.0 157.0,266.0 Q140.0,266.0 135.0,252.0 Q130.0,238.0 129.0,218.0 Q128.0,198.0 157.0,198.0 Z\"/><clipPath id=\"k10\"><use href=\"#q10\"/></clipPath><mask id=\"m10\"><use href=\"#q10\" fill=\"#fff\"/><use href=\"#q10\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q11\" d=\"M159.0,258.0 Q178.0,258.0 180.0,279.0 Q182.0,300.0 161.0,303.0 Q140.0,306.0 140.0,282.0 Q140.0,258.0 159.0,258.0 Z\"/><clipPath id=\"k11\"><use href=\"#q11\"/></clipPath><mask id=\"m11\"><use href=\"#q11\" fill=\"#fff\"/><use href=\"#q11\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q12\" d=\"M155.0,104.0 Q186.0,102.0 189.0,126.0 Q192.0,150.0 188.0,175.0 Q184.0,200.0 157.0,201.0 Q130.0,202.0 124.0,176.0 Q118.0,150.0 121.0,128.0 Q124.0,106.0 155.0,104.0 Z\"/><clipPath id=\"k12\"><use href=\"#q12\"/></clipPath><mask id=\"m12\"><use href=\"#q12\" fill=\"#fff\"/><use href=\"#q12\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q13\" d=\"M118.0,150.0 L192.0,150.0 L190.0,164.0 L118.0,164.0 Z\"/><clipPath id=\"k13\"><use href=\"#q13\"/></clipPath><mask id=\"m13\"><use href=\"#q13\" fill=\"#fff\"/><use href=\"#q13\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q14\" d=\"M157.0,198.0 Q186.0,198.0 184.0,218.0 Q182.0,238.0 178.0,252.0 Q174.0,266.0 157.0,266.0 Q140.0,266.0 135.0,252.0 Q130.0,238.0 129.0,218.0 Q128.0,198.0 157.0,198.0 Z\"/><clipPath id=\"k14\"><use href=\"#q14\"/></clipPath><mask id=\"m14\"><use href=\"#q14\" fill=\"#fff\"/><use href=\"#q14\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q15\" d=\"M159.0,258.0 Q178.0,258.0 180.0,279.0 Q182.0,300.0 161.0,303.0 Q140.0,306.0 140.0,282.0 Q140.0,258.0 159.0,258.0 Z\"/><clipPath id=\"k15\"><use href=\"#q15\"/></clipPath><mask id=\"m15\"><use href=\"#q15\" fill=\"#fff\"/><use href=\"#q15\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q16\" d=\"M108.0,279.0 L214.0,279.0 L214.0,300.0 L204.0,356.0 L197.0,401.0 L193.0,418.0 L181.0,430.0 L164.0,434.0 L147.0,430.0 L135.0,418.0 L131.0,401.0 L124.0,356.0 L110.0,300.0 Z\"/><clipPath id=\"k16\"><use href=\"#q16\"/></clipPath><mask id=\"m16\"><use href=\"#q16\" fill=\"#fff\"/><use href=\"#q16\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q17\" d=\"M130.0,384.0 L198.0,384.0 L198.0,416.0 L130.0,416.0 Z\"/><clipPath id=\"k17\"><use href=\"#q17\"/></clipPath><mask id=\"m17\"><use href=\"#q17\" fill=\"#fff\"/><use href=\"#q17\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q18\" d=\"M131.0,401.0 L135.0,384.0 L147.0,372.0 L164.0,368.0 L181.0,372.0 L193.0,384.0 L197.0,401.0 L195.0,428.0 L189.0,468.0 L146.0,468.0 L144.0,452.0 L124.0,426.0 Z\"/><clipPath id=\"k18\"><use href=\"#q18\"/></clipPath><mask id=\"m18\"><use href=\"#q18\" fill=\"#fff\"/><use href=\"#q18\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q19\" d=\"M142.0,438.0 L190.0,438.0 L190.0,470.0 L142.0,470.0 Z\"/><clipPath id=\"k19\"><use href=\"#q19\"/></clipPath><mask id=\"m19\"><use href=\"#q19\" fill=\"#fff\"/><use href=\"#q19\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q20\" d=\"M138.0,466.0 L184.0,466.0 L198.0,476.0 L222.0,484.0 L230.0,492.0 L228.0,498.0 L138.0,498.0 L134.0,480.0 Z\"/><clipPath id=\"k20\"><use href=\"#q20\"/></clipPath><mask id=\"m20\"><use href=\"#q20\" fill=\"#fff\"/><use href=\"#q20\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q21\" d=\"M206.0,480.0 L230.0,490.0 L230.0,498.0 L200.0,498.0 Z\"/><clipPath id=\"k21\"><use href=\"#q21\"/></clipPath><mask id=\"m21\"><use href=\"#q21\" fill=\"#fff\"/><use href=\"#q21\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q22\" d=\"M132.0,492.0 L232.0,492.0 L232.0,498.0 L132.0,498.0 Z\"/><clipPath id=\"k22\"><use href=\"#q22\"/></clipPath><mask id=\"m22\"><use href=\"#q22\" fill=\"#fff\"/><use href=\"#q22\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q23\" d=\"M134.0,468.0 L150.0,468.0 L152.0,492.0 L134.0,494.0 Z\"/><clipPath id=\"k23\"><use href=\"#q23\"/></clipPath><mask id=\"m23\"><use href=\"#q23\" fill=\"#fff\"/><use href=\"#q23\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q24\" d=\"M108.0,279.0 L214.0,279.0 L214.0,300.0 L204.0,356.0 L197.0,401.0 L193.0,418.0 L181.0,430.0 L164.0,434.0 L147.0,430.0 L135.0,418.0 L131.0,401.0 L124.0,356.0 L110.0,300.0 Z\"/><clipPath id=\"k24\"><use href=\"#q24\"/></clipPath><mask id=\"m24\"><use href=\"#q24\" fill=\"#fff\"/><use href=\"#q24\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q25\" d=\"M130.0,384.0 L198.0,384.0 L198.0,416.0 L130.0,416.0 Z\"/><clipPath id=\"k25\"><use href=\"#q25\"/></clipPath><mask id=\"m25\"><use href=\"#q25\" fill=\"#fff\"/><use href=\"#q25\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q26\" d=\"M131.0,401.0 L135.0,384.0 L147.0,372.0 L164.0,368.0 L181.0,372.0 L193.0,384.0 L197.0,401.0 L195.0,428.0 L189.0,468.0 L146.0,468.0 L144.0,452.0 L124.0,426.0 Z\"/><clipPath id=\"k26\"><use href=\"#q26\"/></clipPath><mask id=\"m26\"><use href=\"#q26\" fill=\"#fff\"/><use href=\"#q26\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q27\" d=\"M142.0,438.0 L190.0,438.0 L190.0,470.0 L142.0,470.0 Z\"/><clipPath id=\"k27\"><use href=\"#q27\"/></clipPath><mask id=\"m27\"><use href=\"#q27\" fill=\"#fff\"/><use href=\"#q27\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q28\" d=\"M138.0,466.0 L184.0,466.0 L198.0,476.0 L222.0,484.0 L230.0,492.0 L228.0,498.0 L138.0,498.0 L134.0,480.0 Z\"/><clipPath id=\"k28\"><use href=\"#q28\"/></clipPath><mask id=\"m28\"><use href=\"#q28\" fill=\"#fff\"/><use href=\"#q28\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q29\" d=\"M206.0,480.0 L230.0,490.0 L230.0,498.0 L200.0,498.0 Z\"/><clipPath id=\"k29\"><use href=\"#q29\"/></clipPath><mask id=\"m29\"><use href=\"#q29\" fill=\"#fff\"/><use href=\"#q29\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q30\" d=\"M132.0,492.0 L232.0,492.0 L232.0,498.0 L132.0,498.0 Z\"/><clipPath id=\"k30\"><use href=\"#q30\"/></clipPath><mask id=\"m30\"><use href=\"#q30\" fill=\"#fff\"/><use href=\"#q30\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><path id=\"q31\" d=\"M134.0,468.0 L150.0,468.0 L152.0,492.0 L134.0,494.0 Z\"/><clipPath id=\"k31\"><use href=\"#q31\"/></clipPath><mask id=\"m31\"><use href=\"#q31\" fill=\"#fff\"/><use href=\"#q31\" fill=\"#000\" transform=\"translate(3,3)\"/></mask><g id=\"Sjersey\"><use href=\"#q1\" fill=\"var(--jersey)\"/><g clip-path=\"url(#k1)\"><path d=\"M90.0,84.0 L158.2,84.0 L90.0,154.0 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M181.3,84.0 L238.0,84.0 L238.0,288.0 L132.3,288.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m1)\"><use href=\"#q1\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q1\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"Shem\"><path d=\"M112.0,282.0 L212.0,282.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M112.0,282.0 L212.0,282.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M112.0,282.0 L212.0,282.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g id=\"Spad\"><use href=\"#q2\" fill=\"#aab0bf\"/><g clip-path=\"url(#k2)\"><path d=\"M104.0,82.0 L141.0,82.0 L104.0,105.1 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M153.1,82.0 L184.0,82.0 L184.0,148.0 L127.3,148.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m2)\"><use href=\"#q2\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q2\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"Sbelt\"><use href=\"#q3\" fill=\"#1c1824\"/><g clip-path=\"url(#k3)\"><path d=\"M102.0,277.0 L156.4,277.0 L102.0,284.4 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M174.7,277.0 L220.0,277.0 L220.0,297.0 L135.9,297.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m3)\"><use href=\"#q3\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q3\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g id=\"Sneck\"><use href=\"#q4\" fill=\"var(--skin)\"/><g clip-path=\"url(#k4)\"><path d=\"M142.0,66.0 L161.5,66.0 L142.0,78.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M167.6,66.0 L184.0,66.0 L184.0,100.0 L154.6,100.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q4\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"Shead\"><use href=\"#q5\" fill=\"var(--helmet)\"/><g clip-path=\"url(#k5)\"><path d=\"M114.0,2.0 L149.1,2.0 L114.0,29.8 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M160.6,2.0 L190.0,2.0 L190.0,82.0 L136.2,82.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m5)\"><use href=\"#q5\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q5\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><use href=\"#q6\" fill=\"var(--skin)\"/><g clip-path=\"url(#k6)\"><path d=\"M168.0,40.0 L182.0,40.0 L168.0,54.2 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M186.1,40.0 L198.0,40.0 L198.0,80.0 L177.3,80.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q6\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M176.0,50.0 L194.0,46.0\" fill=\"none\" stroke=\"#1b1118\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><ellipse cx=\"184\" cy=\"56\" rx=\"5\" ry=\"2.4\" fill=\"#f4f4f6\" stroke=\"#15111d\" stroke-width=\"1\"/><circle cx=\"185\" cy=\"56\" r=\"1.4\" fill=\"#1a1018\"/><use href=\"#q7\" fill=\"var(--hs)\"/><g mask=\"url(#m7)\"><use href=\"#q7\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q7\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g><ellipse cx=\"148\" cy=\"50\" rx=\"8\" ry=\"12\" fill=\"#0b0912\" stroke=\"#15111d\" stroke-width=\"1.6\"/></g><path d=\"M182.0,40.0 L212.0,44.0 L210.0,72.0 L182.0,74.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"5.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M182.0,40.0 L212.0,44.0 L210.0,72.0 L182.0,74.0\" fill=\"none\" stroke=\"var(--mask)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M182.0,40.0 L212.0,44.0 L210.0,72.0 L182.0,74.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.5\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M184.0,53.0 L211.0,57.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"5.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M184.0,53.0 L211.0,57.0\" fill=\"none\" stroke=\"var(--mask)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M184.0,53.0 L211.0,57.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.5\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M184.0,64.0 L210.0,66.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"5.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M184.0,64.0 L210.0,66.0\" fill=\"none\" stroke=\"var(--mask)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M184.0,64.0 L210.0,66.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.5\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M150.0,66.0 L168.0,80.0 L184.0,76.0\" fill=\"none\" stroke=\"#e8e8f0\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/></g><g id=\"SANuu\"><use href=\"#q8\" fill=\"#15111d\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"SANfu\"><use href=\"#q10\" fill=\"#15111d\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"SANuf\"><use href=\"#q8\" fill=\"var(--skin)\"/><g clip-path=\"url(#k8)\"><path d=\"M116.0,100.0 L152.0,100.0 L116.0,136.0 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M163.9,100.0 L194.0,100.0 L194.0,204.0 L138.7,204.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m8)\"><use href=\"#q8\" fill=\"#fff\" opacity=\".85\"/></g></g><g id=\"SANff\"><use href=\"#q10\" fill=\"var(--skin)\"/><g clip-path=\"url(#k10)\"><path d=\"M126.0,196.0 L154.7,196.0 L126.0,221.1 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M164.0,196.0 L188.0,196.0 L188.0,268.0 L144.2,268.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m10)\"><use href=\"#q10\" fill=\"#fff\" opacity=\".85\"/></g></g><g id=\"SANbd\"><use href=\"#q9\" fill=\"var(--accent)\"/><g mask=\"url(#m9)\"><use href=\"#q9\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q9\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g id=\"SANgl\"><use href=\"#q11\" fill=\"#4d5063\"/><g clip-path=\"url(#k11)\"><path d=\"M138.0,256.0 L159.3,256.0 L138.0,274.3 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M166.0,256.0 L184.0,256.0 L184.0,308.0 L151.8,308.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m11)\"><use href=\"#q11\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q11\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g id=\"SAFuu\"><use href=\"#q12\" fill=\"#15111d\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"SAFfu\"><use href=\"#q14\" fill=\"#15111d\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"SAFuf\"><use href=\"#q12\" fill=\"var(--skin)\"/><g clip-path=\"url(#k12)\"><path d=\"M116.0,100.0 L152.0,100.0 L116.0,136.0 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M163.9,100.0 L194.0,100.0 L194.0,204.0 L138.7,204.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q12\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m12)\"><use href=\"#q12\" fill=\"#fff\" opacity=\".85\"/></g></g><g id=\"SAFff\"><use href=\"#q14\" fill=\"var(--skin)\"/><g clip-path=\"url(#k14)\"><path d=\"M126.0,196.0 L154.7,196.0 L126.0,221.1 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M164.0,196.0 L188.0,196.0 L188.0,268.0 L144.2,268.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q14\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m14)\"><use href=\"#q14\" fill=\"#fff\" opacity=\".85\"/></g></g><g id=\"SAFbd\"><use href=\"#q13\" fill=\"var(--accent)\"/><use href=\"#q13\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m13)\"><use href=\"#q13\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q13\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g id=\"SAFgl\"><use href=\"#q15\" fill=\"#4d5063\"/><g clip-path=\"url(#k15)\"><path d=\"M138.0,256.0 L159.3,256.0 L138.0,274.3 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M166.0,256.0 L184.0,256.0 L184.0,308.0 L151.8,308.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q15\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m15)\"><use href=\"#q15\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q15\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g id=\"SLNtu\"><use href=\"#q16\" fill=\"#15111d\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"SLNsu\"><use href=\"#q18\" fill=\"#15111d\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"SLNtf\"><use href=\"#q16\" fill=\"var(--pants)\"/><g clip-path=\"url(#k16)\"><path d=\"M106.0,277.0 L156.8,277.0 L106.0,331.7 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M173.7,277.0 L216.0,277.0 L216.0,436.0 L137.7,436.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m16)\"><use href=\"#q16\" fill=\"#fff\" opacity=\".85\"/></g></g><g id=\"SLNsf\"><use href=\"#q18\" fill=\"var(--pants)\"/><g clip-path=\"url(#k18)\"><path d=\"M122.0,366.0 L157.6,366.0 L122.0,402.0 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M169.3,366.0 L199.0,366.0 L199.0,470.0 L144.4,470.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m18)\"><use href=\"#q18\" fill=\"#fff\" opacity=\".85\"/></g></g><g id=\"SLNst\"><path d=\"M164.0,296.0 L168.0,360.0 L164.0,404.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"13.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M164.0,296.0 L168.0,360.0 L164.0,404.0\" fill=\"none\" stroke=\"var(--stripe)\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M164.0,296.0 L168.0,360.0 L164.0,404.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"3.0\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g id=\"SLNss\"><path d=\"M164.0,396.0 L166.0,430.0 L166.0,444.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"13.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M164.0,396.0 L166.0,430.0 L166.0,444.0\" fill=\"none\" stroke=\"var(--stripe)\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M164.0,396.0 L166.0,430.0 L166.0,444.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"3.0\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g id=\"SLNpd\"><use href=\"#q17\" fill=\"var(--pants)\"/><g clip-path=\"url(#k17)\"><path d=\"M128.0,382.0 L161.3,382.0 L128.0,394.9 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M172.2,382.0 L200.0,382.0 L200.0,418.0 L149.0,418.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m17)\"><use href=\"#q17\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q17\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g id=\"SLNsk\"><use href=\"#q19\" fill=\"var(--sock)\"/><g clip-path=\"url(#k19)\"><path d=\"M140.0,436.0 L164.1,436.0 L140.0,448.9 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M171.8,436.0 L192.0,436.0 L192.0,472.0 L155.4,472.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m19)\"><use href=\"#q19\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q19\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M144.0,448.0 L188.0,448.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M144.0,448.0 L188.0,448.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M144.0,448.0 L188.0,448.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M144.0,459.0 L188.0,459.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"6.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M144.0,459.0 L188.0,459.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M144.0,459.0 L188.0,459.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.8\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g id=\"SLNft\"><use href=\"#q20\" fill=\"#C9CDD6\"/><g clip-path=\"url(#k20)\"><path d=\"M132.0,464.0 L178.2,464.0 L132.0,476.9 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M193.5,464.0 L232.0,464.0 L232.0,500.0 L160.9,500.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><g mask=\"url(#m20)\"><use href=\"#q20\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q20\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#q23\" fill=\"var(--shoe)\"/><g mask=\"url(#m23)\"><use href=\"#q23\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q23\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#q21\" fill=\"var(--shoe)\"/><g mask=\"url(#m21)\"><use href=\"#q21\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q21\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M166.0,468.0 L184.0,474.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M172.0,472.0 L190.0,478.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M178.0,476.0 L196.0,482.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><use href=\"#q22\" fill=\"#e0a22a\"/><g mask=\"url(#m22)\"><use href=\"#q22\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q22\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g id=\"SLFtu\"><use href=\"#q24\" fill=\"#15111d\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"SLFsu\"><use href=\"#q26\" fill=\"#15111d\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/></g><g id=\"SLFtf\"><use href=\"#q24\" fill=\"var(--pants)\"/><g clip-path=\"url(#k24)\"><path d=\"M106.0,277.0 L156.8,277.0 L106.0,331.7 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M173.7,277.0 L216.0,277.0 L216.0,436.0 L137.7,436.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q24\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m24)\"><use href=\"#q24\" fill=\"#fff\" opacity=\".85\"/></g></g><g id=\"SLFsf\"><use href=\"#q26\" fill=\"var(--pants)\"/><g clip-path=\"url(#k26)\"><path d=\"M122.0,366.0 L157.6,366.0 L122.0,402.0 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M169.3,366.0 L199.0,366.0 L199.0,470.0 L144.4,470.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q26\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m26)\"><use href=\"#q26\" fill=\"#fff\" opacity=\".85\"/></g></g><g id=\"SLFst\"><path d=\"M164.0,296.0 L168.0,360.0 L164.0,404.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"13.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M164.0,296.0 L168.0,360.0 L164.0,404.0\" fill=\"none\" stroke=\"var(--stripe)\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M164.0,296.0 L168.0,360.0 L164.0,404.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"3.0\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g id=\"SLFss\"><path d=\"M164.0,396.0 L166.0,430.0 L166.0,444.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"13.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M164.0,396.0 L166.0,430.0 L166.0,444.0\" fill=\"none\" stroke=\"var(--stripe)\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M164.0,396.0 L166.0,430.0 L166.0,444.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"3.0\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g id=\"SLFpd\"><use href=\"#q25\" fill=\"var(--pants)\"/><g clip-path=\"url(#k25)\"><path d=\"M128.0,382.0 L161.3,382.0 L128.0,394.9 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M172.2,382.0 L200.0,382.0 L200.0,418.0 L149.0,418.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q25\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m25)\"><use href=\"#q25\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q25\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g><g id=\"SLFsk\"><use href=\"#q27\" fill=\"var(--sock)\"/><g clip-path=\"url(#k27)\"><path d=\"M140.0,436.0 L164.1,436.0 L140.0,448.9 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M171.8,436.0 L192.0,436.0 L192.0,472.0 L155.4,472.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q27\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m27)\"><use href=\"#q27\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q27\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M144.0,448.0 L188.0,448.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"8.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M144.0,448.0 L188.0,448.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M144.0,448.0 L188.0,448.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"2.7\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/><path d=\"M144.0,459.0 L188.0,459.0\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"6.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M144.0,459.0 L188.0,459.0\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M144.0,459.0 L188.0,459.0\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\"1.8\" stroke-linecap=\"round\" transform=\"translate(-1.6,-1.6)\"/></g><g id=\"SLFft\"><use href=\"#q28\" fill=\"#C9CDD6\"/><g clip-path=\"url(#k28)\"><path d=\"M132.0,464.0 L178.2,464.0 L132.0,476.9 Z\" fill=\"#fff\" opacity=\"0.15\"/><path d=\"M193.5,464.0 L232.0,464.0 L232.0,500.0 L160.9,500.0 Z\" fill=\"#000\" opacity=\"0.25\"/></g><use href=\"#q28\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m28)\"><use href=\"#q28\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q28\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#q31\" fill=\"var(--shoe)\"/><use href=\"#q31\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m31)\"><use href=\"#q31\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q31\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><use href=\"#q29\" fill=\"var(--shoe)\"/><use href=\"#q29\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m29)\"><use href=\"#q29\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q29\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M166.0,468.0 L184.0,474.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M172.0,472.0 L190.0,478.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><path d=\"M178.0,476.0 L196.0,482.0\" fill=\"none\" stroke=\"#6a6d82\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"1\"/><use href=\"#q30\" fill=\"#e0a22a\"/><use href=\"#q30\" fill=\"#000\" opacity=\"0.28\"/><g mask=\"url(#m30)\"><use href=\"#q30\" fill=\"#fff\" opacity=\".85\"/></g><use href=\"#q30\" fill=\"none\" stroke=\"#15111d\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/></g>";
S.ids={"LN": [16, 18], "LF": [24, 26]};
S.KEY=[{"lean": 21, "tN": -26, "sN": 18, "fNabs": 0, "tF": 28, "sF": 62, "fFabs": 52, "aN": 52, "eN": -72, "aF": -56, "eF": -88, "lift": 0}, {"lean": 24, "tN": -20, "sN": 38, "fNabs": 0, "tF": -58, "sF": 98, "fFabs": 58, "aN": -22, "eN": -82, "aF": 34, "eF": -72, "lift": 0}, {"lean": 24, "tN": 30, "sN": 6, "fNabs": 52, "tF": -84, "sF": 74, "fFabs": 12, "aN": 60, "eN": -78, "aF": -60, "eF": -88, "lift": 0}, {"lean": 22, "tN": 22, "sN": 100, "fNabs": 54, "tF": -76, "sF": 46, "fFabs": 34, "aN": -42, "eN": -86, "aF": 44, "eF": -82, "lift": 26, "sh": 0.75}];

const HIP=[160,291],KNEE=[164,401],ANK=[166,466],SHO=[156,114],ELB=[158,205],NECK=[162,84];
const U=id=>'<use href="#S'+id+'"/>',G=(M,c)=>'<g transform="'+sv(M)+'">'+c+'</g>';
S.W=400;S.H=536;S.GROUND=522;S.AX=205;
S.frame=function(pz,opt){opt=opt||{};
  const L=pz.lean||0,Mb=about(HIP,Rt(L));
  const arm=(tag,a,e)=>{const Mu=mm(Mb,about(SHO,Rt(a))),Mf=mm(Mu,about(ELB,Rt(e)));return[G(Mu,U(tag+'uu'))+G(Mf,U(tag+'fu'))+G(Mu,U(tag+'uf'))+G(Mf,U(tag+'ff'))+G(Mu,U(tag+'bd'))+G(Mf,U(tag+'gl')),Mf]};
  const leg=(tag,t,s,fabs)=>{const f=fabs-t-s,Mt=about(HIP,Rt(t)),Ms=mm(Mt,about(KNEE,Rt(s))),Mf=mm(Ms,about(ANK,Rt(f))),ids=S.ids[tag],cid='kc'+tag;
    const clip='<clipPath id="'+cid+'"><use href="#q'+ids[0]+'" transform="'+sv(Mt)+'"/><use href="#q'+ids[1]+'" transform="'+sv(Ms)+'"/></clipPath>';
    return[clip+G(Mt,U(tag+'tu'))+G(Ms,U(tag+'su'))+G(Mt,U(tag+'tf'))+G(Ms,U(tag+'sf'))+G(Mt,U(tag+'st'))+G(Ms,U(tag+'ss'))+'<g clip-path="url(#'+cid+')">'+G(Mt,U(tag+'pd'))+'</g>'+G(Ms,U(tag+'sk'))+G(Mf,U(tag+'ft')),Mf]};
  const aF=arm('AF',pz.aF,pz.eF),aN=arm('AN',pz.aN,pz.eN),lF=leg('LF',pz.tF,pz.sF,pz.fFabs),lN=leg('LN',pz.tN,pz.sN,pz.fNabs);
  let g=-1e9;for(const M of[lF[1],lN[1]])for(const p of[[132,498],[232,498],[138,498]])g=Math.max(g,ap(M,p)[1]);
  const dy0=(498-(pz.lift||0))-g,dy=pz.dyo!==undefined?pz.dyo:dy0,head=(pz.head!==undefined?pz.head:-L*.5);
  const body=opt.only==='AN'?aN[0]:aF[0]+lF[0]+lN[0]+G([1,0,0,1,0,0],U('belt'))+G(Mb,U('neck')+U('jersey')+U('hem')+U('pad'))+(opt.skip==='AN'?'':aN[0])+G(mm(Mb,about(NECK,Rt(head))),U('head'));
  const gl=ap(aN[1],[160,282]);
  return{svg:'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="536" viewBox="0 0 400 536"><defs>'+S.defs+'</defs><g transform="translate(45,'+(dy+24).toFixed(2)+')">'+body+'</g></svg>',dy,dy0,sh:pz.sh||1,ball:[gl[0]+45,gl[1]+dy+24]}};
const swap=p=>({lean:p.lean,tN:p.tF,sN:p.sF,fNabs:p.fFabs,tF:p.tN,sF:p.sN,fFabs:p.fNabs,aN:p.aF,eN:p.eF,aF:p.aN,eF:p.eN,lift:p.lift,sh:p.sh});
const TUCK={aN:8,eN:-112};
S.BOB=.15;   // TUNE: how much of each pose's own ground drop is kept (0 = hips dead level, 1 = old behaviour)
S.loop=function(v){v=v||{};const k=v.line?.75:v.turbo?1.15:1;let out=[];
  for(let i=0;i<8;i++){const base=S.KEY[i%4],p=i<4?Object.assign({},base):swap(base);
    p.lean=v.line?15:(p.lean||0)+(v.turbo?5:0);if(v.line){p.eN=(p.eN||0)*.8;p.eF=(p.eF||0)*.8}for(const a of['tN','tF','aN','aF'])p[a]*=k;for(const a of['sN','sF'])p[a]*=(v.turbo?1.08:1);
    if(v.ball){p.aN=TUCK.aN;p.eN=TUCK.eN}
    out.push(p)}
  if(v.n16){const ks=['lean','tN','sN','fNabs','tF','sF','fFabs','aN','eN','aF','eF','lift'],o2=[];
    for(let i=0;i<8;i++){const a=out[i],b=out[(i+1)%8],m={};for(const q of ks)m[q]=((a[q]||0)+(b[q]||0))/2;m.sh=((a.sh||1)+(b.sh||1))/2;o2.push(a,m)}   // in-between poses: the angles halfway between two neighbouring approved poses (solid, never blended pixels)
    out=o2}
  if(S.BOB<1){const bob=v.line?S.BOB*.3:S.BOB,d=out.map(p=>S.frame(p).dy0),mean=d.reduce((a,b)=>a+b,0)/d.length;out.forEach((p,i)=>{p.dyo=mean+(d[i]-mean)*bob})}
  return v.line?[out[0],out[2],out[4],out[6]]:out};
return S})();

ART.run={on:(()=>{try{return localStorage.getItem('sg_run')!=='0'}catch(e){return true}})(),sp:new Map(),px:0,max:16e6,busy:new Set(),ready:new Set(),need:[],nk:'',bakes:0,bakesLive:0,late:0,fail:0,inited:false,err:'',
  conc:10,jobs:[],q:[],qs:new Set(),steps:{run:[3,5],c:[4,6]},poses:{},meta:{},V:{run:{nc:1},cL:{ball:'L'},cR:{ball:'R'},cLt:{ball:'L',turbo:1},cRt:{ball:'R',turbo:1},fr:{front:1,nc:1},frt:{front:1,turbo:1},lrun:{line:1},lfr:{front:1,line:1},lsR:{side:1,line:1},cFL:{front:1,ball:'L',skip:'AL'},cFR:{front:1,ball:'R',skip:'AR'},cFLt:{front:1,ball:'L',turbo:1,skip:'AL'},cFRt:{front:1,ball:'R',turbo:1,skip:'AR'},cFLo:{front:1,ball:'L',keep:'AL',one:1},cFRo:{front:1,ball:'R',keep:'AR',one:1},cFLto:{front:1,ball:'L',turbo:1,keep:'AL',one:1},cFRto:{front:1,ball:'R',turbo:1,keep:'AR',one:1},sR:{side:1},sC:{side:1,ball:1},sCt:{side:1,ball:1,turbo:1},tBL:{thr:'b',tg:'L'},tBM:{thr:'b',tg:'M'},tBR:{thr:'b',tg:'R'},tS:{thr:'s',side:1},hB:{hold:'b'},hS:{hold:'s',side:1},cLn:{ball:'L',skip:'AL'},cRn:{ball:'R',skip:'AR'},sCn:{side:1,ball:1,skip:'AN'},yF0:{sty:'F',mv:0,front:1},yF1:{sty:'F',mv:1,front:1},yF2:{sty:'F',mv:2,front:1},yB0:{sty:'B',mv:0},yB1:{sty:'B',mv:1},yB2:{sty:'B',mv:2},yS0:{sty:'S',mv:0,side:1},yS1:{sty:'S',mv:1,side:1},yS2:{sty:'S',mv:2,side:1}},sm:new Map(),
  clear(){for(const e of this.sp.values())for(const s in e)e[s].c.width=e[s].c.height=0;this.sp.clear();this.ready.clear();this.px=0;this.nk=''},
  toggle(){this.on=!this.on;try{localStorage.setItem('sg_run',this.on?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}return this.on}};

/* ---- QB throw (4 approved key poses) and drop-back hold: frames pre-made like the run loop, wider canvas so the arm and ball never clip */
const CVB={W:480,H:512,AX:240,GR:499,ox:80,oy:0,vb:'-80 0 480 512'},CVS={W:520,H:616,AX:265,GR:602,ox:60,oy:80,vb:'-60 -80 520 616'};
const THR_T=.37;   // the throw lasts .37 s; the ball leaves at .22 s (60%) = frame 4 of 8
const lerpP=(a,b,u)=>{if(typeof a==='number'&&typeof b==='number')return a+(b-a)*u;if(a&&b&&typeof a==='object'&&typeof b==='object'){const o={};for(const k of new Set([...Object.keys(a),...Object.keys(b)])){const x=a[k],y=b[k];o[k]=x===undefined?y:y===undefined?x:lerpP(x,y,u)}return o}return u<.5?a:b};
const BK_AL={L:{us:.95,ur:100,fs:1,fr:0},M:{us:.62,ur:48,fs:.5,fr:-20},R:{us:.8,ur:-70,fs:.9,fr:-70}},BK_ALc={L:{us:.95,ur:95,fs:1,fr:0},M:{us:.6,ur:55,fs:.5,fr:-10},R:{us:.8,ur:-70,fs:.9,fr:-70}};
const BK_KEY=tg=>[
 {L:{ts:.96,ss:.95},R:{ts:.96,ss:.95},AR:{us:.82,ur:135,fs:.85,fr:85},AL:BK_AL[tg],tw:6,yaw:10,bounce:0,lean:{d:14,k:.95},bo:[0,-40,-.95]},
 {L:{ts:.95,ss:.95,sole:1},R:{ts:.97,ss:.97},AR:{us:.9,ur:78,fs:.85,fr:150},AL:BK_ALc[tg],tw:-14,yaw:30,bounce:0,lean:{d:-9,k:.95},bo:[0,-40,-.8]},
 {L:{ts:.97,ss:.97},R:{ts:.97,ss:.97},AR:{us:.95,ur:176,fs:1.0,fr:60},AL:{us:.7,ur:20,fs:.7,fr:-40},tw:16,yaw:-12,bounce:6,lean:{d:12,k:.96},bo:[52,-30,-.55]},
 {L:{ts:.95,ss:.9},R:{ts:.84,ss:.45,sole:1},AR:{us:1.0,ur:-60,fs:1.1,fr:-10},AL:{us:.8,ur:30,fs:.9,fr:20},tw:26,yaw:30,bounce:2,lean:{d:20,k:.93}}];
const SD_KEY=[
 {lean:6,aN:90,eN:120,aF:-80,eF:-5,tN:-12,sN:14,fNabs:0,tF:14,sF:18,fFabs:0,head:-3,bo:[0,-30,-.85]},
 {lean:-8,aN:90,eN:90,aF:-60,eF:-10,tN:-8,sN:18,fNabs:0,tF:24,sF:30,fFabs:-30,head:2,bo:[0,-30,-.85]},
 {lean:14,aN:-170,eN:30,aF:25,eF:100,tN:-30,sN:34,fNabs:0,tF:10,sF:16,fFabs:0,head:-6,bo:[16,-40,-.8]},
 {lean:22,aN:50,eN:-120,aF:30,eF:-60,tN:-6,sN:24,fNabs:0,tF:-52,sF:72,fFabs:22,head:-10}];
const THR_SEQ=[[0,0,0],[0,1,.5],[1,1,0],[1,2,.5],[2,2,0],[2,3,.33],[2,3,.66],[3,3,0]];   // frame 0 load, 2 cock, 4 release, 7 follow-through
function thrPoses(v){const K=v.thr==='b'?BK_KEY(v.tg):SD_KEY;return THR_SEQ.map(([a,b,u])=>{const KA=K[a],KB=(v.thr==='s'&&a===1&&b===2)?Object.assign({},K[b],{aN:190}):K[b];const p=lerpP(KA,KB,u);p.bo=a===b?K[a].bo:(K[a].bo&&K[b].bo?lerpP(K[a].bo,K[b].bo,u):(K[a].bo||K[b].bo));p.held=(a<2||(a===2&&b===2)||(a===1&&b===2)||(a===2&&b===3&&false));return p})}
function holdPoses(v){const out=[];
  if(v.hold==='b'){for(let i=0;i<8;i++){const s=Math.sin(i/8*TAU);out.push({L:{ts:.96+.03*s,ss:.95},R:{ts:.96-.03*s,ss:.95},AR:{us:.8,ur:40,fs:.8,fr:115},AL:{us:.8,ur:-40,fs:.8,fr:-115},tw:4,yaw:8,bounce:Math.abs(s)*2,lean:{d:12,k:.95},bo:[0,0,-.7]})}}
  else{for(let i=0;i<8;i++){const s=Math.sin(i/8*TAU);out.push({lean:10,tN:-8*s,sN:10+6*Math.max(0,s),fNabs:0,tF:8*s,sF:10+6*Math.max(0,-s),fFabs:0,aN:15,eN:-120,aF:20,eF:-115,head:-4,bo:[0,-4,-.5]})}}
  return out}
function thrMeta(vk,v,pz,i){const B=v.thr==='b'||v.hold==='b';
  if(B){const m=RIG.measure(pz),lg=RIG.leanGeom(pz.lean),g=m.gloveR,o=pz.bo;let ball=null;if(o){ball=v.hold?{x:CVB.ox+262,y:178,r:o[2]}:{x:g[0]+CVB.ox+o[0],y:g[1]+o[1],r:o[2]}}
    return{tw:pz.tw||0,b:pz.bounce||0,sh:1,ny:lg?lg.numDy:0,yaw:pz.yaw||0,cv:CVB,ball:null,thrBall:ball,hold:!!v.hold}}
  const f=SIDER.frame(pz),o=pz.bo;let ball=null;if(o)ball=v.hold?{x:f.ball[0]+CVS.ox+0,y:f.ball[1]+CVS.oy+o[1],r:o[2]}:{x:f.ball[0]+CVS.ox+o[0],y:f.ball[1]+CVS.oy+o[1],r:o[2]};
  return{tw:0,b:0,sh:f.sh,cv:CVS,ball:null,thrBall:ball,hold:!!v.hold}}
/* ---- STYLE moves: the approved key poses as ball-arm overlays. The body is the run loop without its ball arm; the arm and the ball are drawn on top. Right-handed carriers use the mirror image. ---- */
const CVY={W:640,H:512,AX:320,GR:499,ox:160,oy:0,vb:'-160 0 640 512'};
function styPoses(view,mv){const A=(us,ur,fs,fr)=>({us,ur,fs,fr}),out=[],PI=Math.PI;
  if(view==='S'){const sd=o=>Object.assign({lean:20,tN:-26,sN:18,fNabs:0,tF:28,sF:62,fFabs:52,aN:52,eN:-72,aF:-56,eF:-88,lift:0,dyo:0},o);
    const sp=[[[{aN:135,eN:0},[-28,-28,30]],[{aN:121,eN:8},[-34,-21,52]]],[[{aN:-20,eN:-20},[0,0,0]],[{aN:25,eN:-30},null]],[[{aN:-140,eN:-40},[14,-24,0]],[{aN:-130,eN:-48},[14,-24,10]]]][mv];
    for(const [q,off] of sp){const pose=sd(q),f=SIDER.frame(pose,{only:'AN'});out.push({pose,meta:{tw:0,b:0,sh:1,cv:CVS,ball:off?{x:f.ball[0]+CVS.ox+off[0],y:f.ball[1]+CVS.oy+off[1],r:off[2]*PI/180}:null,hide:!off}})}
    return out}
  const rig=view==='F'?RIGF:RIG;
  const sp=[[[A(1,85,1,-4),[-34,-4,-12]],[A(1,70,1,6),[-34,-4,14]]],
    [view==='F'?[[A(.9,-18,.8,18),[-2,2,-20]]][0]:[[A(.9,-50,.85,5),[22,8,-14]]][0]],
    view==='F'?[[A(.9,-145,.9,-70),[-4,-14,-20]],[A(.9,-137,.9,-62),[-4,-14,-10]]]:[[A(1,-168,1,-6),[-4,-34,-20]],[A(1,-160,1,-2),[-4,-34,-8]]]][mv];
  for(const [arm,off] of (mv===1?[sp[0]]:sp)){const pose={L:{ts:1,ss:1},R:{ts:1,ss:1},tw:0,bounce:0,lean:{d:25,k:.9},AL:arm,over:{AL:1}},m=rig.measure(pose),g=m.gloveL;
    out.push({pose,meta:{tw:0,b:0,sh:1,cv:CVY,ball:{x:g[0]+off[0]+CVY.ox,y:g[1]+off[1],r:off[2]*PI/180}}})}
  return out}
function styBallFx(kd,t,h){
  if(kd===0){const a=t*15;return{dx:Math.cos(a)*.4*h,dy:Math.sin(a)*.24*h-.1*h,r:a*1.5}}   // reach: ball orbits the body
  if(kd===1){const u=(t/.45)%1;return{dx:0,dy:-Math.sin(Math.PI*u)*.45*h,r:u*12.56}}        // hand switch: high toss arc
  return{dx:Math.sin(t*9)*.1*h,dy:-(.2+.22*Math.abs(Math.sin(t*9)))*h,r:t*18}}              // ball high: pump over head
const STY_PER=[.14,.3,.18];   // faster pose toggles
const styKey=(o,side,front)=>'y'+(side?'S':front?'F':'B')+Math.max(0,Math.min(2,o.styleKind|0));
const styBody=(o,side,front)=>{const l=(o.ballSide||1)>0;return side?'sCn':front?(l?'cFL':'cFR'):(l?'cLn':'cRn')};
function styOK(o,pal,side,front){const R=ART.run;if(!o.styleOn||!o.hasBall||o.sprint||!(o.pos==='QB'||o.pos==='RB'))return false;const bv=styBody(o,side,front),pk=pal.key+'|';return R.ready.has(pk+bv)&&(!front||R.ready.has(pk+bv+'o'))&&R.ready.has(pk+styKey(o,side,front))}
function runInit(){const R=ART.run;if(R.inited)return;RIG.init(ART.svg.b);RIGF.init(ART.svg.f);
  for(const k in R.V){const v=R.V[k];if(v.sty){const sp=styPoses(v.sty,v.mv);R.poses[k]=sp.map(q=>q.pose);R.meta[k]=sp.map(q=>q.meta);continue}if(v.thr||v.hold){const fr=v.thr?thrPoses(v):holdPoses(v);R.poses[k]=fr;R.meta[k]=fr.map((p,i)=>thrMeta(k,v,p,i));continue}if(v.side){const fr=SIDER.loop(Object.assign({},v,{n16:v.line?0:1}));R.poses[k]=fr;R.meta[k]=fr.map(p=>{const f=SIDER.frame(p);return{tw:0,b:0,sh:f.sh,ball:v.ball?f.ball:null}});continue}if(v.front){let fr=RIGF.loopF(v);if(v.one)fr=[Object.assign({},fr[0],{bounce:0})];R.poses[k]=fr;R.meta[k]=fr.map(p=>{const m=RIGF.measure(p),lg=RIGF.leanGeom(p.lean),b=v.ball,e=b==='L'?m.elbowL:m.elbowR,g=b==='L'?m.gloveL:m.gloveR;return{tw:0,b:p.bounce||0,sh:1,ny:lg?lg.numDy:0,ball:(b&&!v.one)?[(e[0]+g[0])/2,(e[1]+g[1])/2]:null,fball:(b&&!v.one)?1:0}});continue}const fr=RIG.loop(v);R.poses[k]=fr;R.meta[k]=fr.map(p=>{const m=RIG.measure(p),b=v.ball,lg=RIG.leanGeom(p.lean);return{tw:p.tw||0,b:p.bounce||0,sh:p.sh||1,ny:lg?lg.numDy:0,ball:b==='L'?m.gloveL:b==='R'?m.gloveR:null}})}
  R.inited=true}
const runKey=(pk,vk,i)=>pk+'|'+vk+'|'+i;
function runTrim(R,keep){   // v2.95: sprites reused from storage now respect the budget too (before, only freshly made ones did)
  while(R.px>R.max&&R.sp.size>1&&!(R.sp.size===1&&R.sp.has(keep))){const kk=evictPick(R),o=R.sp.get(kk);R.evict=(R.evict||0)+1;R.sp.delete(kk);for(const s in o){R.px-=o[s].c.width*o[s].c.height;o[s].c.width=o[s].c.height=0}const pp=kk.split('|');R.ready.delete(pp[0]+'|'+pp[1]);R.ready.delete(pp[0]+'|'+pp[1]+'^16')}}
/* when the sprite budget is full, throw away the least valuable sprite first: other teams' leftovers, then STYLE art, then Turbo art, then throw art; the everyday run loops of the players on the field go last */
const _bc=document.createElement('canvas');_bc.width=_bc.height=8;const _bg=_bc.getContext('2d',{willReadFrequently:true});
function canvasBlank(c){try{_bg.clearRect(0,0,8,8);_bg.drawImage(c,0,0,c.width,c.height,0,0,8,8);const d=_bg.getImageData(0,0,8,8).data;for(let i=3;i<d.length;i+=4)if(d[i]>8)return false;return true}catch(e){return false}}   // a freshly baked body that is completely transparent: the phone ran out of canvas memory and gave us an empty canvas
function evictPick(R){let cur=null;try{cur=new Set(artPals().map(p=>p.key))}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  let best=null,bs=99;for(const k of R.sp.keys()){const a=k.split('|'),vk=a[1];let sc=/^(y[FBS]\d|cLn|cRn|sCn)$/.test(vk)?0:/^(frt|sCt|cLt|cRt|cFLt|cFRt|cFLto|cFRto)$/.test(vk)?1:/^(hB|hS|tBL|tBM|tBR|tS)$/.test(vk)?2:3;if(cur&&!cur.has(a[0]))sc-=5;if(R._nsrc!==R.need){R._nsrc=R.need;R._ns=new Set(R.need.map(x=>x[0].key+'|'+x[1]))}if(!R._ns.has(a[0]+'|'+vk)&&!R._ns.has(a[0]+'|'+vk.replace(/o$/,'')))sc-=3;   // variants this play does not use go first
  if(sc<bs){bs=sc;best=k;if(sc<=-5)break}}
  return best||R.sp.keys().next().value}
function runResample(src,th){const tw=Math.max(4,Math.round(src.width*th/src.height));let cur=src;
  while(cur.height>=th*2){const c=document.createElement('canvas');c.width=Math.max(tw,Math.round(cur.width/2));c.height=Math.max(th,Math.round(cur.height/2));const g=c.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(cur,0,0,c.width,c.height);if(cur!==src)cur.width=cur.height=0;cur=c}
  const c=document.createElement('canvas');c.width=tw;c.height=th;const g=c.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(cur,0,0,tw,th);if(cur!==src)cur.width=cur.height=0;return c}
function runBakeFresh(pal,vk,i){const R=ART.run,key=runKey(pal.key,vk,i);
  const sd=!!R.V[vk].side,cvx=R.meta[vk]&&R.meta[vk][i]&&R.meta[vk][i].cv;const VV=R.V[vk];let svg0=(VV.sty?(VV.sty==='S'?SIDER.frame(R.poses[vk][i],{only:'AN'}):(VV.sty==='F'?RIGF:RIG).frame(R.poses[vk][i],{keep:'AL',only:'arms'})):sd?SIDER.frame(R.poses[vk][i],{skip:VV.skip}):VV.front?RIGF.frame(R.poses[vk][i],{skip:VV.skip,keep:VV.keep,only:VV.keep?'arms':undefined}):RIG.frame(R.poses[vk][i],{skip:VV.skip})).svg;if(cvx)svg0=svg0.replace(/width="\d+" height="\d+" viewBox="[^"]*"/,'width="'+cvx.W+'" height="'+cvx.H+'" viewBox="'+cvx.vb+'"');const svg=svg0.replace(/var\(--(\w+)\)/g,(a,k)=>pal.v[k]||'#ff00ff'),im=new Image();
  const live=()=>F&&F.mode==='live';
  // every bake is cut into small jobs (draw the sprite, then one size at a time, then store it) that the pump runs a few ms per frame: nothing ever blocks a frame
  const go=()=>{const J=()=>{if(live()){R.busy.delete(key);R.late++;return}   // never bake while a play is running: it is picked up again before the next snap
    const CW=cvx?cvx.W:sd?SIDER.W:ART.W,CH=cvx?cvx.H:sd?SIDER.H:ART.H,m=document.createElement('canvas');m.width=CW;m.height=CH;m.getContext('2d').drawImage(im,0,0,CW,CH);
    const st=artSteps(),rg=/^(run|sR|fr|frt|lrun|lsR|lfr)$/.test(vk)?R.steps.run:R.steps.c,e={},steps=[];let px=0;for(let s=rg[0];s<=rg[1];s++)steps.push(s);
    const fin=()=>{if(live()){m.width=m.height=0;for(const s in e)e[s].c.width=e[s].c.height=0;R.busy.delete(key);R.late++;return}
      m.width=m.height=0;
      {let bad=false;for(const s in e)if(canvasBlank(e[s].c)){bad=true;break}
       if(bad){for(const s in e)e[s].c.width=e[s].c.height=0;R.busy.delete(key);R.blank=(R.blank||0)+1;R.max=Math.max(12e6,Math.min(R.max,R.px)*.88);   // empty bake: throw it away, and lower the budget (the device's real memory limit is lower than we thought)
         while(R.px>R.max&&R.sp.size>1){const kk=evictPick(R),o=R.sp.get(kk);R.evict=(R.evict||0)+1;R.sp.delete(kk);for(const s in o){R.px-=o[s].c.width*o[s].c.height;o[s].c.width=o[s].c.height=0}const pp=kk.split('|');R.ready.delete(pp[0]+'|'+pp[1]);R.ready.delete(pp[0]+'|'+pp[1]+'^16')}
         return}}
      R.busy.delete(key);R.sp.set(key,e);R.px+=px;R.bakes++;try{cachePut(pal,vk,i,e)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}
      const P=R.poses[vk].length,stp=P>=8?P/8:1;let full=true;for(let j=0;j<P;j+=stp)if(!R.sp.has(runKey(pal.key,vk,j))){full=false;break}if(full)R.ready.add(pal.key+'|'+vk);if(P>8&&full){let f2=true;for(let j=1;j<P;j+=2)if(!R.sp.has(runKey(pal.key,vk,j))){f2=false;break}if(f2)R.ready.add(pal.key+'|'+vk+'^16')}
      while(R.px>R.max&&R.sp.size>1){const kk=evictPick(R),o=R.sp.get(kk);R.evict=(R.evict||0)+1;R.sp.delete(kk);for(const s in o){R.px-=o[s].c.width*o[s].c.height;o[s].c.width=o[s].c.height=0}const pp=kk.split('|');R.ready.delete(pp[0]+'|'+pp[1]);R.ready.delete(pp[0]+'|'+pp[1]+'^16')}};
    const one=()=>{if(live()){fin();return}const s=steps.shift(),th=Math.max(8,Math.round(CH*st[s]/500)),c=runResample(m,th);e[s]={c,sc:c.height/CH};px+=c.width*c.height;R.jobs.unshift(steps.length?one:fin)};one.h=1;fin.h=0;
    R.jobs.unshift(one);kickBakePump()};J.h=1;R.jobs.push(J);kickBakePump()};if(im.decode)im.decode().then(go,go);else im.onload=go;
  im.onerror=()=>{R.busy.delete(key);R.fail++};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}

/* ---- sprite cache: baked run frames are kept on the device (IndexedDB), so the next launch loads them instead of drawing them again ---- */
const CACHE_V='c4';let _idb;
function idb(){if(_idb!==undefined)return _idb;_idb=new Promise((res,rej)=>{try{if(typeof indexedDB==='undefined'){rej();return}const r=indexedDB.open('cf-sprites',1);r.onupgradeneeded=()=>r.result.createObjectStore('f');r.onsuccess=()=>res(r.result);r.onerror=()=>rej();r.onblocked=()=>rej();setTimeout(rej,2500)}catch(e){rej()}}).catch(()=>null);return _idb}
function djb(str){let h=5381;for(let k=0;k<str.length;k++)h=((h<<5)+h+str.charCodeAt(k))|0;return (h>>>0).toString(36)}
function cacheKey(pal,vk,i){const R=ART.run,sd=!!R.V[vk].side,m=R.meta[vk]&&R.meta[vk][i];return CACHE_V+'|'+artSteps().join('.')+'|'+djb(JSON.stringify(R.poses[vk][i])+(m&&m.cv?JSON.stringify(m.cv):'')+(sd?String(SIDER.defs.length):R.V[vk].front?'F'+String((ART.svg&&ART.svg.f||'').length):String((ART.svg&&ART.svg.b||'').length)))+'|'+pal.key+'|'+vk+'|'+i}
function cacheGet(ck){return idb().then(db=>!db?null:new Promise(res=>{try{const q=db.transaction('f').objectStore('f').get(ck);q.onsuccess=()=>res(q.result||null);q.onerror=()=>res(null)}catch(e){res(null)}}))}
const cacheQ=[];let cacheBusy=0;
function cachePut(pal,vk,i,e){cacheQ.push([cacheKey(pal,vk,i),e]);if(!cacheBusy)cachePump()}
function cachePump(){cacheBusy=1;const job=cacheQ.shift();if(!job){cacheBusy=0;return}
  const [ck,e]=job,steps=Object.keys(e);
  Promise.all(steps.map(st=>new Promise(res=>{try{e[st].c.toBlob(b=>res(b?{b,sc:e[st].sc}:null),'image/png')}catch(x){res(null)}}))).then(arr=>{
    if(arr.some(x=>!x))return;const rec={steps:{}};steps.forEach((st,k)=>rec.steps[st]=arr[k]);
    return idb().then(db=>{if(!db)return;try{db.transaction('f','readwrite').objectStore('f').put(rec,ck)}catch(x){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",x)}})}).catch(()=>{}).then(()=>setTimeout(cachePump,40))}
function runBake(pal,vk,i){const R=ART.run,key=runKey(pal.key,vk,i);if(R.sp.has(key)||R.busy.has(key))return;R.busy.add(key);
  const fresh=()=>runBakeFresh(pal,vk,i);let ck;try{ck=cacheKey(pal,vk,i)}catch(x){fresh();return}
  cacheGet(ck).then(rec=>{
    const rg=/^(run|sR|fr|frt|lrun|lsR|lfr)$/.test(vk)?R.steps.run:R.steps.c,want=[];for(let st=rg[0];st<=rg[1];st++)want.push(st);
    if(!rec||!want.every(st=>rec.steps&&rec.steps[st])||typeof createImageBitmap==='undefined'){fresh();return}
    Promise.all(want.map(st=>createImageBitmap(rec.steps[st].b))).then(bms=>{
      if(F&&F.mode==='live'){bms.forEach(b=>b.close&&b.close());R.busy.delete(key);R.late++;return}
      const e={};let px=0;want.forEach((st,k)=>{const b=bms[k],c=document.createElement('canvas');c.width=b.width;c.height=b.height;c.getContext('2d').drawImage(b,0,0);b.close&&b.close();e[st]={c,sc:rec.steps[st].sc};px+=c.width*c.height});
      R.busy.delete(key);R.sp.set(key,e);R.px+=px;R.bakes++;R.hits=(R.hits||0)+1;runTrim(R,key);
      const P=R.poses[vk].length,stp=P>=8?P/8:1;let full=true;for(let j=0;j<P;j+=stp)if(!R.sp.has(runKey(pal.key,vk,j))){full=false;break}if(full)R.ready.add(pal.key+'|'+vk);if(P>8&&full){let f2=true;for(let j=1;j<P;j+=2)if(!R.sp.has(runKey(pal.key,vk,j))){f2=false;break}if(f2)R.ready.add(pal.key+'|'+vk+'^16')}
    }).catch(()=>fresh())},()=>fresh())}
const CARRYV=/^(sC|sCt|cL|cR|cLt|cRt|cFL|cFR|cFLt|cFRt)$/;
function runEnq(pal,vk,i){const R=ART.run,key=runKey(pal.key,vk,i);if(R.sp.has(key)||R.busy.has(key)||R.qs.has(key))return;R.qs.add(key);R.q.push([pal,vk,i,key]);kickBakePump()}   // carry loops jump the queue
const BAKE_BUDGET=2.5,BAKE_BUDGET_MENU=8,BAKE_BUDGET_SNAP=20,BAKE_COOLDOWN=700,BAKE_SLOWFRAME=20;   // Bake budgets, temporary pre-snap budget, screen-change cooldown and slow-frame guard
function bakeOK(){if(window.__fb)return true;if(OWON||document.hidden)return false;if(startPlay._w>0)return true;const now=performance.now(),gm=G?G.mode:'';if(ART._gm!==gm){ART._gm=gm;ART._gmT=now}
  const h=document.getElementById('hud');if(h&&!h.hidden&&G){if(G.mode==='intro')return true;if(G.mode!=='playcall'&&G.mode!=='set')return false;return now-ART._gmT>BAKE_COOLDOWN}return now-(ART._gmT||0)>BAKE_COOLDOWN}
function bkMenu(){const hh=document.getElementById('hud');return !hh||hh.hidden||(G&&(G.mode==='playcall'||G.mode==='intro'||G.mode==='set'))||startPlay._w>0}   // nothing is moving on these screens: baking never waits for a slow frame there
let _bakeScheduled=false;function kickBakePump(){if(_bakeScheduled||(typeof CG!=='undefined'&&CG.bakeOff))return;_bakeScheduled=true;requestAnimationFrame(bakePump)}function bakePump(){_bakeScheduled=false;try{if(typeof CG==='undefined'||!CG.bakeOff)bakeBody()}catch(e){if(typeof cgCatch==='function')cgCatch(e,'sprite baking')}if((typeof CG==='undefined'||!CG.bakeOff)&&ART&&ART.run&&(ART.run.jobs.length||ART.run.q.length))kickBakePump()}   // v2.90: a baking error no longer stops baking for good
function bakeBody(){const R=ART.run,now=performance.now(),dt=now-(R._pl||now);R._pl=now;
  if((R.jobs.length||R.q.length)&&bakeOK()){if(dt<BAKE_SLOWFRAME||bkMenu()||(R._sk=(R._sk||0)+1)>12){R._sk=0;const t0=performance.now(),hh=document.getElementById('hud'),menu=!hh||hh.hidden||(G&&(G.mode==='playcall'||G.mode==='intro'||G.mode==='set'))||startPlay._w>0,bud=window.__fb?30:menu?(startPlay._w>0?BAKE_BUDGET_SNAP:BAKE_BUDGET_MENU):BAKE_BUDGET;let heavy=0;   // skip while frames are already slow; otherwise about 3 ms of baking per frame
    do{const j0=R.jobs[0];if(heavy&&!window.__fb&&!menu&&(R.jobs.length?j0.h:true))break;const j=R.jobs.shift(),tt=performance.now();if(j){if(j.h)heavy=1;try{j()}catch(e){R.fail++}(ART.jt=ART.jt||[]).push([j.n||'job',performance.now()-tt])}else if(R.q.length){heavy=1;const a=R.q.shift();R.qs.delete(a[3]);try{runBake(a[0],a[1],a[2])}catch(e){R.fail++}(ART.jt=ART.jt||[]).push(['start',performance.now()-tt])}}while((R.jobs.length||R.q.length)&&performance.now()-t0<bud)}}
  CG.bakeOk()}
requestAnimationFrame(kickBakePump);
function runNeeded(){const runs=[],sr0=[],runs0=[],carry0=[],carry=[],thr=[],lz=[],sty=[],runsS=[],sty0=[],seen=new Set();if(!F||!F.all)return[];
  const add=(arr,pal,vk)=>{const k=pal.key+'|'+vk;if(seen.has(k))return;seen.add(k);arr.push([pal,vk])};
  for(const p of F.all){const pos=(p.d&&p.d.pos)||p.pos;if(pos==='OL'||pos==='DL'){const pl=artPal(uniFor(p),lookOf(p.d).skin,lookOf(p.d));add(runs,pl,'lrun');add(runs,pl,'lsR');add(runs,pl,'lfr');continue}const L=lookOf(p.d),pal=artPal(uniFor(p),L.skin,L);const cr=p.team==='O'&&(pos==='QB'||pos==='RB');add(cr?runs0:runsS,pal,'run');if(cr)add(sr0,pal,'sR');else add(runsS,pal,'sR');add(runs,pal,'fr');add(lz,pal,'frt');if(cr){add(carry0,pal,'sC');for(const v of['cL','cR','cFL','cFR','cFLo','cFRo'])add(carry,pal,v);for(const v of['cLn','cRn','sCn','yF0','yF1','yF2','yB0','yB1','yB2','yS0','yS1','yS2'])add(sty0,pal,v);for(const v of['sCt','cLt','cRt','cFLt','cFRt','cFLto','cFRto'])add(lz,pal,v)};if(p.team==='O'&&pos==='QB')for(const v of['hB','hS','tBM','tBL','tBR','tS'])add(thr,pal,v)}
  const out=sr0.concat(carry0,runs0,runsS,sty0,runs,carry,thr,lz);out.n0=sr0.length+carry0.length+runs0.length+runsS.length;   // gate on base run, side-run and carry loops; front-facing loops bake afterward and fall back to run until ready
  out.n1=out.n0;return out}
function runPre(){const R=ART.run;if(!R.on||!ART.on||(F&&F.mode==='live')||document.hidden)return;const inM=(()=>{const h=document.getElementById('hud');return !!(h&&!h.hidden)})();
  try{runWarm();if(R.busy.size+R.q.length>=6)return;if(!R.inited)runInit();
    if(!R.pre||R.preKey!==JSON.stringify(SAVE.uni)){R.preKey=JSON.stringify(SAVE.uni);R.pre=[];const seen=new Set();
      for(const k in SAVE.starters){const d=SAVE.starters[k];if(!d||d.pos==='OL'||d.pos==='DL')continue;const pal=artPal(SAVE.uni,lookOf(d).skin,lookOf(d));
        const isC=d.pos==='QB'||d.pos==='RB',vs=(isC?['sR','sC','run']:['run','sR']).concat(['fr']).concat(isC?['cL','cR','cFL','cFR','cFLo','cFRo','cLn','cRn','sCn','yF0','yF1','yF2','yB0','yB1','yB2','yS0','yS1','yS2','cLt','cRt','sCt','cFLt','cFRt','cFLto','cFRto']:[]).concat(['frt']).concat(d.pos==='QB'?['hB','hS','tBM','tBL','tBR','tS']:[]);
        for(const v of vs){const kk=pal.key+'|'+v;if(!seen.has(kk)){seen.add(kk);R.pre.push([pal,v,isC&&vs.indexOf(v)<3?0:(v==='fr'||(!isC&&vs.indexOf(v)<2))?1:(v[0]==='h'||(v[0]==='t'&&v!=='tS'&&false)||/^t[BS]/.test(v)?3:2)])}}}
      R.pre.sort((a,b)=>a[2]-b[2])}
    for(const [pal,vk,ph] of R.pre){if(inM&&ph>2)continue;if(R.ready.has(pal.key+'|'+vk))continue;const P=R.poses[vk].length;for(let i=0;i<P;i+=(P>=8?P/8:1)){if(R.busy.size+R.q.length>=6)return;runEnq(pal,vk,i)}}
    if(!inM)for(const [pal,vk] of R.pre){const P=R.poses[vk].length;if(P<=8||!R.ready.has(pal.key+'|'+vk)||R.ready.has(pal.key+'|'+vk+'^16'))continue;for(let i=1;i<P;i+=2){if(R.busy.size+R.q.length>=6)return;runEnq(pal,vk,i)}}
  }catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
setInterval(runPre,50);
function runWarm(){const R=ART.run;if(!R.on||!F||!F.all||F.mode==='live')return;
  if(!R.inited){try{runInit()}catch(e){R.on=false;R.err=String(e);return}}
  const key=artSteps().join()+'|'+F.all.map(p=>p.num+(p.role||'')).join();if(R.nk!==key){R.nk=key;R.need=runNeeded()}
  for(const [pal,vk] of R.need){if(R.ready.has(pal.key+'|'+vk))continue;if(R.px>R.max*.92&&/^(frt|sCt|cLt|cRt|cFLt|cFRt|cFLto|cFRto)$/.test(vk))continue;const P=R.poses[vk].length;for(let i=0;i<P;i+=(P>=8?P/8:1)){if(R.busy.size+R.q.length>=R.conc)return;runEnq(pal,vk,i)}}
  for(const [pal,vk] of R.need){const P=R.poses[vk].length;if(P<=8||R.V[vk].skip||!R.ready.has(pal.key+'|'+vk)||R.ready.has(pal.key+'|'+vk+'^16'))continue;for(let i=1;i<P;i+=2){if(R.busy.size+R.q.length>=R.conc)return;runEnq(pal,vk,i)}}}   // the 8 even frames first (a playable loop), the in-between frames after that   // one set at a time, two frames decoding at once, only while no play is running
function runPick(o,pal,hpx,side,front){const R=ART.run,pos=o.pos,LN=pos==='OL'||pos==='DL';
  const carry=!LN&&o.hasBall&&(pos==='QB'||pos==='RB');let vk=LN?(side?'lsR':front?'lfr':'lrun'):side?'sR':front?(o.sprint?'frt':'fr'):'run';if(carry)vk=side?(o.sprint?'sCt':'sC'):front?(((o.ballSide||1)>0?'cFL':'cFR')+(o.sprint?'t':'')):(((o.ballSide||1)>0?'cL':'cR')+(o.sprint?'t':''));
  const sty=carry&&styOK(o,pal,side,front),bodyV=sty?styBody(o,side,front):null;if(sty)vk=bodyV;
   const okv=v=>R.ready.has(pal.key+'|'+v)&&(!/^cF/.test(v)||R.ready.has(pal.key+'|'+v+'o'));
  if(!okv(vk)){const nt=LN?vk:vk.replace(/t$/,''),fb=LN?vk:side?'sR':front?'fr':'run';const fb2=front?'run':side?'run':'fr';if(nt!==vk&&nt.length>1&&okv(nt))vk=nt;else if(vk!==fb&&okv(fb))vk=fb;else if(!LN&&okv(fb2))vk=fb2;else return null}
  const P=R.poses[vk].length,N=P<8?P:(P>8&&R.ready.has(pal.key+'|'+vk+'^16'))?16:8,fi=(Math.floor((((o.phi||0)/TAU)%1+1)%1*N)%N)*(P/N),e=R.sp.get(runKey(pal.key,vk,fi));if(!e)return null;
  const st=artSteps(),rg=/^(run|sR|fr|frt|lrun|lsR|lfr)$/.test(vk)?R.steps.run:R.steps.c;
  for(let s=rg[0];s<=rg[1];s++){const ent=e[s];if(ent&&st[s]>=hpx*.92)return{ent,vk,fi,s,n:N,fr:(((o.phi||0)/TAU)%1+1)%1*N-fi/(P/N),m:R.meta[vk][fi],side:!!side,ov:/^cF/.test(vk),sty:!!sty&&vk===bodyV}}
  return null}
function thrPick(o,pal,hpx,sideSt){const R=ART.run;let vk,fi=0;
  if(o.throwK!==undefined){const el=o.throwK*.45;fi=Math.max(0,Math.min(7,Math.floor(el/THR_T*8)));vk=sideSt?'tS':'tB'+(o.thrDir||'M')}
  else{vk=sideSt?'hS':'hB';fi=(o.speed||0)>1.3?(Math.floor((((o.phi||0)/TAU)%1+1)%1*8)&7):0}
  if(!R.ready.has(pal.key+'|'+vk))return null;
  const e=R.sp.get(runKey(pal.key,vk,fi));if(!e)return null;const st=artSteps();
  for(let s=R.steps.c[0];s<=R.steps.c[1];s++){const ent=e[s];if(ent&&st[s]>=hpx*.92)return{ent,vk,fi,m:R.meta[vk][fi],side:!!sideSt,thr:true}}
  return null}
const ART_WS={OL:1.08,DL:1.08,QB:.94,WR:.94,DB:.94};
const TK=window.__TK=window.__TK||{};const TWN=(window.__TW!==undefined?window.__TW:0);const BSZ_=.052;
function artDraw(g,o){if(o.tcx!==undefined&&!o.hasBall&&!o.preview&&!o.lying){   // non-carriers: the loop follows a SMOOTHED travel direction (0.15 s) and a loop is held at least 0.25 s before it can switch
    const NV=ART._nv||(ART._nv=new Map()),now_=performance.now();let e_=NV.get(o.id);
    if(!e_||now_-e_.pt>600)e_={x:o.tcx,y:o.tsa,c:null,t:now_,pt:now_};else{const a_=1-Math.exp(-(now_-e_.pt)/150);e_.x+=(o.tcx-e_.x)*a_;e_.y+=(o.tsa-e_.y)*a_;e_.pt=now_}
    NV.set(o.id,e_);const d_=Math.abs(e_.x)>1.5*Math.abs(e_.y)?'s':e_.y>0?'b':'f';
    const nm_=Math.hypot(e_.x,e_.y)||1,cs_=e_.hx===undefined?1:(e_.x*e_.hx+e_.y*e_.hy)/nm_;   // held 0.12 s, or switch at once on a turn of more than 60 degrees
    if(e_.c===null||(d_!==e_.c&&(now_-e_.t>=120||cs_<.5))){if(e_.c!==null&&e_.c!==d_){ART.sw=(ART.sw||0)+1;ART.swPlay=(ART.swPlay||0)+1;e_.sw=(e_.sw||0)+1}e_.t=now_;e_.c=d_;e_.hx=e_.x/nm_;e_.hy=e_.y/nm_}
    if(window.__dbg&&o.id!==undefined)((window.__pp=window.__pp||{})[o.id]||(window.__pp[o.id]={rf:0,fbm:0,slow:0,still:0,opp:0,pos:o.pos,team:o.team})).sw=e_.sw||0;
    const sx_=e_.x<0?-1:1;o=Object.assign({},o,{fcx:o.cx,fsa:o.sa,cx:e_.c==='s'?sx_:0,sa:e_.c==='s'?0:e_.c==='b'?1:-1})}   // non-carriers draw the loop that matches the way they TRAVEL (a defender backpedaling or shuffling no longer runs the front loop 'forward')
  if(o.styleOn&&o.styleKind===1&&o.hasBall&&((performance.now()/450|0)&1))o=Object.assign({},o,{ballSide:-(o.ballSide||1)});   // hand switch: the ball changes hands every 0.45 s
  const BSZ=(TK.s||BSZ_);if(window.__dbg&&!o.preview)(window.__oLast=window.__oLast||{})[o.id]=o;
  const u=o.uni,L=o.look,pal=artPal(u,L.skin,L),M=g.getTransform?g.getTransform():{a:1,d:1,e:0,f:0},k=M.a||1,h=o.S*16.2,x=o.x,y=o.y-(o.celeb>0?Math.abs(Math.sin((o.t||0)*6))*o.S*1.4:0);
  const wsc=o.preview?1:(ART_WS[o.pos]||1);
  let view=o.view==='b'?'b':'f',lean=0;
  if(!o.preview){const cx=o.cx||0,sa=o.sa||0;
    if(Math.abs(cx)>1.5*Math.abs(sa)){view=sa>0?'b':sa<0?'f':(o.team==='O'?'b':'f');lean=(cx>0?1:-1)*6*Math.PI/180}   // mostly sideways: hold the nearest of front/back and lean toward the travel direction
    else view=sa>0?'b':'f'}
  const still=o.preview||o.pre||o.lying||!!o.lock||o.piled||!!(o.celeb>0);   // pre-snap, blocking (locked up) and piled players stay perfectly upright
  let rf=null,sdir=0;
  const GATE=o.hasBall?1.3:.5;   // non-carriers draw the run loop from 0.5 up (only the ball carrier keeps the 1.3 gate)
  if(ART.run.on&&ART.run.inited&&!still&&(o.speed||0)>GATE){
    const cx=o.cx||0,sa=o.sa||0,rat=Math.abs(cx)/(Math.abs(sa)+1e-4),was=ART.run.sm.get(o.id)||0,wantSide=was?rat>1.15:rat>1.8;   // turning hand-off with a little hysteresis: exactly one of back / side is drawn each frame
    if(o.id!==undefined)ART.run.sm.set(o.id,wantSide?1:0);
    if(wantSide&&cx){sdir=cx>0?1:-1;rf=runPick(o,pal,h*k,true)}
    else if(view==='b')rf=runPick(o,pal,h*k,false);else if(view==='f')rf=runPick(o,pal,h*k,false,true)}   // moving away from the camera: the back run loop, sideways: the side run loop (if all 8 frames are ready)
  if(ART.run.on&&ART.run.inited&&!o.preview&&!o.lying&&!o.pre&&o.pos==='QB'&&view==='b'&&(o.throwK!==undefined||o.pocket)){const ss=ART.run.sm.get(o.id)||0,tp=thrPick(o,pal,h*k,ss);if(tp){rf=tp;sdir=ss?((o.cx||0)<0?-1:1):0}}
  if(window.__dbg&&!o.preview&&o.id!==undefined&&!o.hasBall){const P=(window.__pp=window.__pp||{}),e=P[o.id]||(P[o.id]={rf:0,fbm:0,slow:0,still:0,opp:0,pos:o.pos,team:o.team});if(still)e.still++;else if((o.speed||0)<=1.3)e.slow++;else if(rf)e.rf++;else e.fbm++;if(o.fcx!==undefined&&o.fcx*o.cx+o.fsa*o.sa<0)e.opp++}
  if(!o.hasBall&&!o.preview&&!o.pre&&ART.run.on&&ART.run.inited&&(o.speed||0)>.4){ART.mvM=(ART.mvM||0)+1;if(!rf){ART.upM=(ART.upM||0)+1;const c_=o.lock?'lk':(o.lying||o.piled)?'pl':(o.speed||0)<=GATE?'sl':'nr';(ART.upC||(ART.upC={}))[c_]=(ART.upC[c_]||0)+1;if(window.__dbg&&o.id!==undefined){const e=(window.__pp=window.__pp||{})[o.id];if(e)(e.cause=e.cause||{})[c_]=(e.cause[c_]||0)+1}}}
  if(!rf&&!o.hasBall&&!o.preview&&ART.run.on&&ART.run.inited&&!still&&(o.speed||0)>.4){ART.up=(ART.up||0)+1;ART.upPlay=(ART.upPlay||0)+1;if(window.__dbg&&o.id!==undefined){const e=(window.__pp=window.__pp||{})[o.id];if(e)e.up=(e.up||0)+1}}   // a moving non-carrier drawn upright
  if(!rf&&ART.run.on&&ART.run.inited&&!still&&(o.speed||0)>GATE&&!o.preview&&!o.lying){ART.fbm=(ART.fbm||0)+1}
  let sp;if(rf)sp={c:rf.ent.c,sc:rf.ent.sc};else{sp=artSized(pal,view,h*k,wsc,!!(o.celeb>0));if(!sp){const L=ART._ls&&ART._ls.get(o.id);if(L&&L.sp.c.width>0&&performance.now()-L.t<2000){sp=L.sp;ART.held=(ART.held||0)+1}else{ART.miss++;if(window.__dbg&&o.id!==undefined){const P=(window.__pp=window.__pp||{}),e=P[o.id]||(P[o.id]={rf:0,fbm:0,slow:0,still:0,opp:0,pos:o.pos,team:o.team});e.nobody=(e.nobody||0)+1}return false}}}
  if(rf&&o.id!==undefined&&!o.preview)(ART._ls||(ART._ls=new Map())).set(o.id,{sp,t:performance.now()});
  const SD=!!(rf&&rf.side),s=h/500*(SD?(window.__SS||.95):1),cv=rf&&rf.m&&rf.m.cv,w=cv?cv.W*s*(SD?1:wsc):SD?SIDER.W*s:ART.W*s*wsc,hh=cv?cv.H*s:SD?SIDER.H*s:ART.H*s,dxf=cv?x-cv.AX*s*(SD?1:wsc):SD?x-SIDER.AX*s:x-160*s*wsc,dyf=cv?y-cv.GR*s:SD?y-SIDER.GROUND*s:y-499*s;
  if(still||rf)lean=0;else if(lean)lean=lean/2;   // lean toward travel: 3 degrees
  const run=still||rf?0:Math.min(1,(o.speed||0)/4.5);let bob=0,tilt=0;
  if(run>0){const ph=(o.phi||0);bob=Math.abs(Math.sin(ph))*h*.015*run;tilt=Math.sin(ph)*1.5*Math.PI/180*run}   // stopgap for the other facings: running bob + alternate tilt
  {const cap=5*Math.PI/180,tot=lean+tilt;if(Math.abs(tot)>cap){const f=cap/Math.abs(tot);lean*=f;tilt*=f}}   // lean plus alternate rotation never exceeds 5 degrees
  let styScale=1;
  const styFx=!!(o.styleOn&&o.hasBall&&(o.pos==='QB'||o.pos==='RB')&&!o.sprint&&!o.pre&&!o.lying&&(o.speed||0)>1.3);
  if(styFx){const t=performance.now()/1000,kd=Math.max(0,Math.min(2,o.styleKind|0)),D=Math.PI/180,dr=(o.ballSide||1)>0?1:-1,
    W=[8,6.6,7.5][kd],A=[13,17,11][kd];
    const ph=t*W;tilt=Math.sin(ph)*A*D;lean=(kd===2?-14:kd===0?11:0)*D*dr;   // swagger tilt; reach leans in, ball-high leans back
    bob=Math.abs(Math.sin(ph))*h*(kd===2?.15:.12);                             // strut hop
    styScale=1+.09*Math.abs(Math.sin(ph*.5))+(kd===2?.04:0);                   // squash/stretch pump
    g.save();g.globalAlpha=.6;g.strokeStyle='#ff8ad8';g.lineWidth=Math.max(2,h*.045);const rp=1+.2*Math.abs(Math.sin(ph));
    g.beginPath();g.ellipse(x,y,h*.34*rp,h*.11*rp,0,0,7);g.stroke();g.restore()
    if(!(rf&&rf.sty)){const R_=ART.run,w=R_.styWhy||(R_.styWhy={});const pk=pal.key+'|',sd_=!!(rf&&rf.side),fr_=view==='f'&&!sd_,why=!rf?'no-run-art':!R_.ready.has(pk+styBody(o,sd_,fr_))?'body-not-ready':!R_.ready.has(pk+styKey(o,sd_,fr_))?'overlay-not-ready':'other';w[why]=(w[why]||0)+1;R_.styMiss=(R_.styMiss||0)+1}}   // pink ring on the turf (spotting aid)   // STYLE on but the style art was not drawn
  // shadow: its own layer under the feet, depth-scaled; flattened when the player is down; it shrinks a little while the runner is in the air
  const rot=o.lying?((Math.cos(o.rot||0)>=0?1:-1)*85*Math.PI/180):0,shf=rf?rf.m.sh:1;
  g.save();
  {const u=h/52,sw=(o.lying?h*.52*2:195*s*wsc*1.15*shf),sh=o.lying?h*.1:sw*.35;   // soft ellipse: 1.15 x the foot span wide, 0.35 x that tall, black 55%, 2 px feather, 2 px down-right
    const sx0=x+2*u+(o.lying?Math.sign(rot)*h*.34:0),sy0=y+2*u;artShadow(g,sx0,sy0,sw/2,sh/2,.75,2*u);
    if(!o.lying){const cw=65*s*wsc,ch=cw*.3;for(const cxu of [95,224]){artShadow(g,x+(cxu-160)*s*wsc+1*u,y-ch*.15+1*u,cw/2,ch/2,.7*(rf?(.5+.5*shf):1),1*u)}}}   // plus a tight contact shadow (70%) under each cleat
  if(SD&&o.gv&&o.phr>.05&&!(TWN>0&&rf&&rf.fr>.04)){const NN=(rf&&rf.n)||8,fq=(((o.phi||0)/TAU*NN)%1+1)%1,apf=NN*o.phr,cl=v=>Math.max(-7,Math.min(7,v));g.translate(cl(-.55*(o.gv[0]/apf)*(fq-.5)),cl(-.55*(o.gv[1]/apf)*(fq-.5)))}   // the planted cleat stays still on the turf during each of the 8 animation frames instead of sliding with the runner
  g.translate(x,y-bob);g.rotate(rot+lean+tilt);if(styScale!==1)g.scale(styScale,styScale);g.translate(-x,-y);
  if(SD&&sdir<0){g.translate(x,0);g.scale(-1,1);g.translate(-x,0)}   // runners going left: the same side art, mirrored (it has no number)
  const sm=g.imageSmoothingEnabled;g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';
  const snap=(v,m,e)=>(Math.round(v*m+e)-e)/m;
  const bx=(rot||lean||tilt)?dxf:snap(dxf,k,M.e),by=(rot||lean||tilt)?dyf:snap(dyf,M.d||k,M.f);
  let ballDone=false,frontBall=null;
  const bpf0=(o.hasBall&&rf&&!rf.thr&&!rf.sty)?(rf.m.ball||(ART.run.meta[SD?(o.sprint?'sCt':'sC'):(((o.ballSide||1)>0?'cL':'cR')+(o.sprint?'t':''))]||[])[rf.fi]?.ball):null;
  let bpf=bpf0;if(bpf0&&TWN>0&&rf&&rf.fr>.04&&rf.m.ball){const nb=(ART.run.meta[rf.vk]||[])[(rf.fi+1)&7],nbb=nb&&nb.ball;if(nbb){const f2=Math.min(1,rf.fr*TWN);bpf=[bpf0[0]+(nbb[0]-bpf0[0])*f2,bpf0[1]+(nbb[1]-bpf0[1])*f2]}}   // the ball follows the same in-between pose as the body
  if(bpf){const bp=bpf,side=(o.ballSide||1)>0?0:1;   // run loop: the ball is pressed against the ribs under the carry arm, and the sprite (torso, forearm) is drawn over it: about half of it is hidden
    if(SD)ballShape(g,bx+(bp[0]+(TK.sx!==undefined?TK.sx:0))*s,by+(bp[1]+(TK.sy!==undefined?TK.sy:2))*s,h*BSZ,TK.sr!==undefined?TK.sr:.25,true);
    else if(rf.m.fball){frontBall=bp}
    else{const sg=side?1:-1;ballShape(g,bx+(bp[0]+5*sg)*s*wsc,by+(bp[1]-25)*s,h*BSZ,side?.5:-.5,true)}
    ballDone=true}
  if(rf&&rf.sty)ballDone=true;
  {const R_=ART.run;R_.cs=R_.cs||{n:0,loop:0,fb:0,byvk:{}};if(o.hasBall&&(o.pos==='QB'||o.pos==='RB')&&!(rf&&rf.thr)&&(o.speed||0)>1.3&&!o.pre&&!o.lying){R_.cs.n++;const okv=rf&&/^(sC|sCt|cL|cR|cLt|cRt|cFL|cFR|cFLt|cFRt|sCn|cLn|cRn)$/.test(rf.vk);if(okv)R_.cs.loop++;else{R_.cs.fb++;R_.fallbackCarry=(R_.fallbackCarry||0)+1}const kk=(rf?rf.vk:'static')+(ballDone?'':(SD?'/FRONTTUCK_ON_SIDE':'/frontTuck'));R_.cs.byvk[kk]=(R_.cs.byvk[kk]||0)+1}}
  let fdone=false;if(o.hasBall&&!ballDone&&!SD&&!(rf&&rf.thr)){const sd0=(o.ballSide||1)>0?0:1,fx=TK.fx!==undefined?TK.fx:18,fy=TK.fy!==undefined?TK.fy:222,fr=TK.fr!==undefined?TK.fr:1.25;ballShape(g,bx+(sd0?320-fx:fx)*s*wsc,by+fy*s,h*BSZ,sd0?-fr:fr,true);fdone=true}
  const tb=rf&&rf.thr&&rf.m.thrBall,ws=SD?1:wsc,pre0=o.pocket&&rf&&rf.thr&&rf.m.hold;
  if(pre0&&tb)ballShape(g,bx+tb.x*s*ws,by+tb.y*s,h*BSZ,tb.r,true);
  if(!window.__shadowOnly){const e2=(TWN>0&&rf&&!rf.thr&&rf.s!==undefined&&rf.fr>.04)?ART.run.sp.get(runKey(pal.key,rf.vk,(rf.fi+1)&7)):null,t2=e2&&e2[rf.s];
    if(t2&&t2.c.width===sp.c.width&&t2.c.height===sp.c.height){const tc=ART._tw||(ART._tw=document.createElement('canvas'));if(tc.width!==sp.c.width||tc.height!==sp.c.height){tc.width=sp.c.width;tc.height=sp.c.height}const tg=tc.getContext('2d'),f2=Math.min(1,rf.fr*TWN);   // in-between pose: the two neighbouring baked frames cross-faded (premultiplied add, so the overlap stays solid)
      tg.globalCompositeOperation='source-over';tg.clearRect(0,0,tc.width,tc.height);tg.globalAlpha=1-f2;tg.drawImage(sp.c,0,0);tg.globalCompositeOperation='lighter';tg.globalAlpha=f2;tg.drawImage(t2.c,0,0);tg.globalAlpha=1;g.drawImage(tc,0,0,tc.width,tc.height,bx,by,w,hh)}
    else g.drawImage(sp.c,0,0,sp.c.width,sp.c.height,bx,by,w,hh)}
  if(rf&&rf.thr&&!rf.m.hold){const r4=ART.run.meta[rf.vk][4].thrBall;if(r4)ART.hand={sx:bx+r4.x*s*ws,sy:by+r4.y*s,sd:SD,x,y,k:performance.now()};   // where the ball is on the release frame
    if(tb&&o.heldBall)ballShape(g,bx+tb.x*s*ws,by+tb.y*s,h*BSZ,tb.r,true)}
  if(o.hasBall&&!ballDone&&!fdone&&!(rf&&rf.thr)){const a=ART.CARRY[(o.ballSide||1)>0?0:1],side=(o.ballSide||1)>0?0:1,bxp=bx+a[0]*s*wsc,byp=by+a[1]*s;ballShape(g,bxp,byp,h*BSZ,side?.5:-.5,true)}   // static art: 30% of the sprite height long, goes on after the arm and before the number
  const ne=SD?null:artNumber(o.num,view,hexOk(u.jn,'#ffffff'),hexOk(u.jo,'#14110f'),sp.sc,wsc);
  if(SD){}else if(rf){const m=rf.m,a=m.tw*Math.PI/180;g.save();g.translate(bx,by);g.scale(s*wsc,s);if(m.cv)g.translate(m.cv.ox,0);g.translate(160,280-m.b);g.rotate(a);if(m.yaw){g.translate(160,0);g.scale(Math.cos(m.yaw*Math.PI/180),1);g.translate(-160,0)}g.translate(-160,-280);   // the number rides on the torso: it twists and bounces with it, and is never mirrored
    g.drawImage(ne.c,0,0,ne.c.width,ne.c.height,ART_NX0,ART_NY0+(m.ny||0),ne.c.width/ne.sx,ne.c.height/ne.sy);g.restore()}   // the number follows the lowered, shorter torso (its size is unchanged)
  else g.drawImage(ne.c,0,0,ne.c.width,ne.c.height,bx+ART_NX0*s*wsc,by+ART_NY0*s,ne.c.width/ne.sx*s*wsc,ne.c.height/ne.sy*s);
  if(frontBall&&rf){const FB=window.__FB||{x:2,y:2,r:.3},sg=(o.ballSide||1)>0?1:-1;   // front carry: body, number, then the ball, then the carry forearm over the ball (the ball sits inside the torso outline, mostly hidden)
    ballShape(g,bx+(frontBall[0]+FB.x*sg)*s*wsc,by+(frontBall[1]+FB.y)*s,h*BSZ,-sg*FB.r,true);
    const oe=ART.run.sp.get(runKey(pal.key,rf.vk+'o',0)),ot=oe&&oe[rf.s];if(ot)g.drawImage(ot.c,0,0,ot.c.width,ot.c.height,bx,by-(rf.m.b||0)*s,w,hh)}
  if(rf&&rf.sty){const R_=ART.run,SDv=!!rf.side,yk=styKey(o,SDv,view==='f'),P=R_.poses[yk].length,fi2=P>1?(Math.floor(performance.now()/1000/STY_PER[Math.max(0,Math.min(2,o.styleKind|0))])%P):0,ye=R_.sp.get(runKey(pal.key,yk,fi2)),yt=ye&&ye[rf.s],mt=R_.meta[yk][fi2];
    if(yt&&mt){const cvv=mt.cv,rt=(o.ballSide||1)<0&&!SDv;
      if(SDv){const dyb=(R_.poses[rf.vk][rf.fi]&&R_.poses[rf.vk][rf.fi].dyo)||0;g.drawImage(yt.c,0,0,yt.c.width,yt.c.height,bx-cvv.ox*s,by-cvv.oy*s+dyb*s,cvv.W*s,cvv.H*s);
        if(mt.ball&&!mt.hide){const kd=Math.max(0,Math.min(2,o.styleKind|0)),tn=performance.now()/1000;for(let q=3;q>=0;q--){const f=styBallFx(kd,tn-q*.035,h);g.globalAlpha=q?.3-q*.07:1;ballShape(g,bx+(mt.ball.x-cvv.ox)*s+f.dx,by+(mt.ball.y-cvv.oy+dyb)*s+f.dy,h*BSZ*1.7,mt.ball.r+f.r,true)}g.globalAlpha=1}}
      else{const cxm=bx+160*s*wsc,yb=-(rf.m.b||0)*s;g.save();if(rt){g.translate(cxm,0);g.scale(-1,1);g.translate(-cxm,0)}
        g.drawImage(yt.c,0,0,yt.c.width,yt.c.height,bx-cvv.ox*s*wsc,by+yb,cvv.W*s*wsc,cvv.H*s);
        if(mt.ball){const kd=Math.max(0,Math.min(2,o.styleKind|0)),tn=performance.now()/1000;for(let q=3;q>=0;q--){const f=styBallFx(kd,tn-q*.035,h);g.globalAlpha=q?.3-q*.07:1;ballShape(g,bx+(mt.ball.x-cvv.ox)*s*wsc+f.dx,by+yb+mt.ball.y*s+f.dy,h*BSZ*1.7,mt.ball.r+f.r,true)}g.globalAlpha=1}g.restore()}}}
  if(styFx&&!(rf&&rf.sty)){const kd=Math.max(0,Math.min(2,o.styleKind|0)),tn=performance.now()/1000,ga=g.globalAlpha;   // art not baked yet: the same big ball path around the runner
    for(let q=3;q>=0;q--){const f=styBallFx(kd,tn-q*.035,h);g.globalAlpha=ga*(q?.3-q*.07:1);ballShape(g,x+f.dx,y-.5*h+f.dy,h*BSZ*1.7,f.r,true)}g.globalAlpha=ga}
  if(window.__dbg&&rf)(window.__runLog=window.__runLog||[]).push({id:o.id,vk:rf.vk,sty:!!rf.sty,fi:rf.fi,x,y,h,speed:o.speed,phi:o.phi,sd:sdir});
  if(o.celeb>0)window.__CF2D_CELEB_SPRITE_RENDERED=(window.__CF2D_CELEB_SPRITE_RENDERED||0)+1;g.imageSmoothingEnabled=sm;g.restore();ART.hits++;return true}
setTimeout(()=>{try{if(!ART.on)return;const t=performance.now();for(const k in SAVE.starters){const d=SAVE.starters[k],L=lookOf(d),pal=artPal(SAVE.uni,L.skin,L);artMaster(pal,'f');artMaster(pal,'b')}ART.menuMs=Math.round(performance.now()-t)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}},400);   // the menu starts decoding the player's own team right away
{const bl=$('#mBuild');if(bl){const lab=()=>{bl.textContent=BUILD+'  |  PLAYER ART: '+(ART.on?(ART.run.on?'NEW + RUN LOOP':'NEW'):'OLD')+'  (tap to switch)'};lab();bl.style.cursor='pointer';bl.onclick=()=>{if(ART.on&&ART.run.on)ART.run.toggle();else if(ART.on)ART.toggle();else{ART.toggle();if(!ART.run.on)ART.run.toggle()}lab()}}}
/* warm the cache for everyone on the field so no player ever pops in */
function artPals(){const m=new Map();if(F&&F.all)for(const p of F.all){const L=lookOf(p.d),pal=artPal(uniFor(p),L.skin,L);m.set(pal.key,pal)}return[...m.values()]}
function artWarm(){const _t=performance.now();try{artWarm0()}finally{(ART.jt=ART.jt||[]).push(['warm',performance.now()-_t])}}
function artWarm0(){if(!ART.on||!F||!F.all)return;runWarm();if(!ART.t0)ART.t0=performance.now();const pals=artPals();let ready=true;for(const pal of pals)for(const v of'fb')if(!artMaster(pal,v))ready=false;
  if(ready&&!ART.loadMs&&ART.t0)ART.loadMs=Math.round(performance.now()-ART.t0);
  if(ready){ART.wq=ART.wq||[];if(!ART.wdone||ART.wdone!==pals.map(q=>q.key).join()){ART.wdone=pals.map(q=>q.key).join();const k=(window.devicePixelRatio||1);ART.wq=[];const st=artSteps();for(const pal of pals)for(const v of'fb')for(const hb of st)for(const w of[1,1.08,.94])ART.wq.push([pal,v,hb,w]);for(const q of F.all){const L=lookOf(q.d),pal=artPal(uniFor(q),L.skin),u=uniFor(q),w=ART_WS[(q.d&&q.d.pos)||q.pos]||1;for(const v of'fb')for(const hb of st)ART.wq.push([pal,v,hb,w,q.num,u])}}
    if(F.mode==='live'||(!window.__fb&&!bakeOK()))return;const _b=performance.now();for(let i=0;i<10&&ART.wq.length&&(i<1||performance.now()-_b<2);i++){const [pal,v,hp,w,nm,u]=ART.wq.shift();const sp=artSized(pal,v,hp,w);if(sp&&u&&nm!==undefined)artNumber(nm,v,hexOk(u.jn,'#ffffff'),hexOk(u.jo,'#14110f'),sp.sc,w)}}}   // masters first, then the sized sprites for every size a player can be drawn at, a few per frame, all while the menu and play-call screens are up
function carryReady(){const R=ART.run;if(!R.on||!R.inited||!R.need.length)return true;for(const [pal,vk] of R.need.slice(0,R.need.n0||0))if(!R.ready.has(pal.key+'|'+vk))return false;return true}   // the QB/RB run, side-run and side-carry loops
function artReady(){if(!ART.on||!F||!F.all)return true;for(const pal of artPals())for(const v of'fb')if(!artMaster(pal,v))return false;return true}
/*MODEL-END*/
const lastName=n=>String(n||'').replace(/["']/g,'').trim().split(/\s+/).pop();
function uniFor(p){return p.team==='O'?SAVE.uni:(G.oppUni||G.crew.uni)}
function playerPx(pr,Lh,star){   // a player's drawn height in pixels
  if(LAND){const sc=pr.u/(WU*U0F*cam.zoom);return ART.on?clamp(H*ART.hp*cam.zoom*PCS*Math.pow(sc,CAMCFGL.artDepth)*(Lh||1)*(star?1.05:1),H*.07*PCS,H*.30):clamp(H*CAMCFGL.hPct*cam.zoom*Math.pow(sc,CAMCFGL.sizeDepth)*(Lh||1)*(star?1.05:1),H*.10,H*.12)}   // players always stand 10-12% of the screen height
  return Math.max(24,3.3*Math.min(pr.u,WU/16.5*cam.zoom*1.3))*PSCALE*(Lh||1)*(star?1.1:1)}
let PSCALE=1.4;   // how big players are drawn in a game (1 = the old size)
const SIDE_STRIDE=.55;   // TUNE: side-run foot cycles per yard relative to before (1 = old; lower = slower legs for the same ground speed)
function smoothPhi(p,rate,skf){const M=ART.phM||(ART.phM=new Map()),now=performance.now(),id=p.id||p.role;let e=M.get(id);const sim=p.ph;
  if(!e||now-e.t>250){e={ph:sim,t:now};M.set(id,e);return sim*TAU}
  const dt=Math.min(.05,(now-e.t)/1000);e.t=now;e.ph+=rate*dt;if(skf<.999)e.slow=1;else{if(e.slow){e.ph=sim;e.slow=0}let d=sim-e.ph;d-=Math.round(d);e.ph+=d*.05}return e.ph*TAU}   // stretched strides (side run) run free of the simulation phase; the pull back toward it only applies at normal stride, and snaps when the stride returns to normal
function drawPerson(p,pr){
  const L=lookOf(p.d),isStar=!!(p.d.star||p.d.special);
  const dsc=1;   // a touch smaller far up the field, a touch bigger near the camera
  const h=playerPx(pr,L.h,isStar)*dsc,S=h/16.2,x=pr.sx,y=pr.sy;
  if(window.__dbg)(window.__dbgList=window.__dbgList||[]).push({id:p.id||p.role,wx:p.x,wy:p.y,car:p===(F&&F.carrier),team:p.team,pos:(p.d&&p.d.pos)||p.pos,x,y,h,S,w:W,H:H,z:cam.zoom,vs:cam.vs,cl:camLive});
  const uni=uniFor(p);
  const lying=p.fall||(p.knock&&p.stun>0);
  const fa=p.fa+(p.spin>0?(1-p.spin/.4)*TAU:0);
  const sd=sdir(Math.cos(fa),Math.sin(fa));
  const cxs=sd.x,sas=-sd.y;
  const SKF=1-(1-(window.__SK!==undefined?window.__SK:SIDE_STRIDE))*clamp((Math.abs(cxs)/(Math.abs(sas)+.05)-.8)/1.2,0,1);   // sideways runners take longer strides (fewer foot cycles per yard)
  const view=sas>.5?'b':sas<-.5?'f':'s',flip=cxs<0?-1:1;
  if(p===F.carrier&&F.mode==='live'&&!lying){ctx.strokeStyle='#38c6d9';ctx.lineWidth=Math.max(2,S*.7);ctx.beginPath();ctx.ellipse(x,y,S*4.6,S*1.9,0,0,7);ctx.stroke()}
  let bsd=p.x<CX?1:-1;
  if(p===F.carrier&&F.mode==='live'){const Q=ART.cs;if(!Q||Q.p!==p||Q.f!==F){ART.cs={p,f:F,side:bsd}}else{const rel=p.x-CX;if(Math.abs(rel)>8&&((rel<0?1:-1)!==Q.side)&&Math.abs(p.vx)>3&&Math.sign(p.vx)===Math.sign(rel)){Q.side=rel<0?1:-1;ART.run.sw=(ART.run.sw||0)+1;if(window.__dbg)(window.__ballLog=window.__ballLog||[]).push({t:F.t,x:p.x,to:Q.side})}}bsd=ART.cs.side}   // the carrier keeps the ball on one side for the whole run; it only changes on an explicit cut toward the other sideline (logged)
  const gp=P(p.x+p.vx*.05,p.y+p.vy*.05),spd=Math.hypot(p.vx,p.vy);
  const o={gv:[(gp.sx-pr.sx)/.05,(gp.sy-pr.sy)/.05],phr:spd/(1.9+spd*.14)*SKF,id:p.id||p.role,sprint:p===F.carrier&&!!p.spr,x,y,S,uni,look:L,gear:isStar?gearOf(p.d):null,star:isStar,num:p.num,t:performance.now()/1000,view,flip,cx:cxs,sa:sas,tcx:spd>.5?sdir(p.vx/spd,p.vy/spd).x:undefined,tsa:spd>.5?-sdir(p.vx/spd,p.vy/spd).y:undefined,
    speed:Math.hypot(p.vx,p.vy),celeb:p.celeb||0,celebV:p.celebV||0,phi:smoothPhi(p,spd/(1.9+spd*.14)*SKF,SKF),stance:F.mode==='pre'&&(p.role==='OL1'||p.role==='OL2'||p.pos==='DL'),
    lying,rot:-Math.atan2(sdir(Math.cos(p.fa),Math.sin(p.fa)).y,sdir(Math.cos(p.fa),Math.sin(p.fa)).x)*-1,
    aura:null,spOn:!!(p===F.carrier&&F.gb),
    dizzy:p.dizzy&&p.stun>0,lunge:p.lunge>0,ballSide:bsd,hasBall:p===F.carrier&&!F.ballAir&&F.mode!=='pre'&&!F.snap,styleOn:p.styleOn,styleKind:p.styleKind};
  if(lying){const sdv=sdir(Math.cos(p.fa),Math.sin(p.fa));o.rot=Math.atan2(sdv.y,sdv.x)}
  if(p.eng){const dx=p.eng.x-p.x,dy=p.eng.y-p.y,m=Math.hypot(dx,dy)||1;o.lock=sdir(dx/m,dy/m)}
  if(p.lunge>0&&F.carrier){const dx=F.carrier.x-p.x,dy=F.carrier.y-p.y,m=Math.hypot(dx,dy)||1;o.lungeDir=sdir(dx/m,dy/m)}
  if(p.throwT>0){o.throwK=1-p.throwT/.45;o.thrDir=p.thrDir||'M';o.heldBall=!!(F.ballAir&&F.ball&&F.ball.t<0)}
  o.pocket=!!(o.hasBall&&p===F.passer&&F.mode==='live');
  if(F.ballAir&&F.ball&&p===F.ball.target&&dist(p,F.ball.cur)<5)o.catching=true;
  if(p.moveAnim){o.moveAnim=p.moveAnim.name;o.power=p.moveAnim.name==='power'}
  if(p.arm>0)o.armDir=sdir(Math.cos(p.h),Math.sin(p.h));
  o.tname=p.team==='O'?SAVE.teamName:G.crew.name;
  if(p.d.star||p.d.special)o.lname=lastName(p.d.name);
  if(p===F.off.QB&&F.carrier===p&&F.mode==='live'&&!F.handed&&!F.snap&&PLAY&&(PLAY.kind==='run'||PLAY.kind==='flea')){const R2=F.off.RB,dx=R2.x-p.x,dy=R2.y-p.y,m=Math.hypot(dx,dy)||1;o.handoff=sdir(dx/m,dy/m)}
  o.pre=F.mode==='pre';o.piled=!!(p.fall||p.knock||p.stun>0);o.cache=true;o.team=p.team;o.warm=F.mode!=='live';o.art=true;o.pos=(p.d&&p.d.pos)||p.pos;
  renderPerson(ctx,o);
}
window.__CF3D_DRAW_ENTITIES=drawEntities;
function drawEntities(){
  if(SIMV.on){drawSimMarker();return}
  artWarm();SPR.warmLeft=2;if(window.__dbg)window.__dbgList=[];
  for(const e of parts){if(e.kind!=='dust')continue;const pr=P(e.x,e.y),k=e.t/e.life;const bh=playerPx(pr,1,0);ctx.globalAlpha=Math.min(.4,(1-k)*.38);ctx.fillStyle=e.col;ctx.beginPath();ctx.arc(pr.sx,pr.sy-Math.min(e.z*pr.u*.5,bh*.12),Math.min(e.r*pr.u*.7*(.5+k*1.3),bh*.3),0,7);ctx.fill();ctx.globalAlpha=1}   // dust sits under the players
  const list=F.all.map(p=>({p,pr:P(p.x,p.y)}));try{window.CF3D&&CF3D.kkHud&&CF3D.kkHud(list)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}list.sort((a,b)=>(a.pr.sy-b.pr.sy)||(a.p.y-b.p.y)||(a.p.x-b.p.x));
  if(CAMR>.5&&F.carrier&&F.mode==='live'){const i=list.findIndex(e=>e.p===F.carrier);if(i>=0)list.push(list.splice(i,1)[0])}   // v3.09: in the runner camera the carrier is drawn last, so a chaser behind him never hides him
  flDraw();bmLift(list);bmGhosts();
  // Altitude-responsive ground contact shadows (Pillar 4)
  ctx.save();ctx.fillStyle='rgba(6,8,14,0.34)';
  for(let _si=0;_si<list.length;_si++){const _e=list[_si],_p=_e.p,_pr=_e.pr;if(_pr.sy<-60||_pr.sy>H+60||_pr.sx<-60||_pr.sx>W+60)continue;const _air=_p.air?Math.sin(Math.PI*clamp(_p.air.t/_p.air.T,0,1)):0,_sc=1-_air*.45,_rx=Math.max(5,_pr.u*.48*_sc),_ry=Math.max(2,_rx*.38);ctx.globalAlpha=.34*(1-_air*.55);ctx.beginPath();ctx.ellipse(_pr.sx,_pr.sy+(_pr.lift||0)+1,_rx,_ry,0,0,TAU);ctx.fill()}
  ctx.restore();   // v3.08: field life (game/14e); v3.07: launch arc + juke ghosts (game/14d)
  if(window.CF3D&&CF3D._syncVenue)CF3D._syncVenue();const rendered3D=!!P3D.draw(list);window.__CF3D_LAST_DRAW=rendered3D;if(!rendered3D)for(const {p,pr} of list){if(pr.sy<-90||pr.sy>H+90||pr.sx<-70||pr.sx>W+70)continue;drawPerson(p,pr)}   // v3.02: 3D players (game/14c); 2D if 3D is off or fails
  if(F.ballAir&&F.ball&&F.ball.t>=0){const bl=F.ball,b=bl.cur,pr=P(b.x,b.y);
    {const kAir=clamp(bl.t/Math.max(.05,bl.T),0,1),tp=P(bl.to.x,bl.to.y),rO=Math.max(8,tp.u*(1.35-.85*kAir));ctx.save();ctx.strokeStyle=F.gb?'#ffd23a':'#38c6d9';ctx.globalAlpha=.35+.5*kAir;ctx.lineWidth=2.2;ctx.beginPath();ctx.ellipse(tp.sx,tp.sy,rO,rO*.42,0,0,TAU);ctx.stroke();ctx.restore()}const S=Math.max(3,pr.u*.3);ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,pr.u*.5,pr.u*.2,0,0,7);ctx.fill();
    const ah=P(b.x+(bl.to.x-bl.from.x)*.03,b.y+(bl.to.y-bl.from.y)*.03),ang0=Math.atan2(ah.sy-pr.sy,ah.sx-pr.sx),bsy=pr.sy-b.h*pr.u*.9-pr.u*1.4;
    let ang=ang0;if(ART.on){   // the nose follows the real climb: up on the rise, level at the top, down on the descent (never more than 28 degrees off the ground track)
      const pv=bl._pw;if(pv&&bl.t>pv.t+.001){const dt=bl.t-pv.t,vx=(b.x-pv.x)/dt,vy=(b.y-pv.y)/dt,vh=(b.h-pv.h)/dt,q=P(b.x+vx*.05,b.y+vy*.05),qy=q.sy-(b.h+vh*.05)*q.u*.9-q.u*1.4,raw=Math.atan2(qy-bsy,q.sx-pr.sx);let d=raw-ang0;d=Math.atan2(Math.sin(d),Math.cos(d));bl._pa=(bl._pa||0)*.6+Math.max(-.49,Math.min(.49,d))*.4}
      bl._pw={x:b.x,y:b.y,h:b.h,t:bl.t};ang=ang0+(bl._pa||0)}
    if(ART.on){const ph=playerPx(pr),ln=Math.max(8,ph*(TK.s||BSZ_)/.066*.30);if(window.__dbg)(window.__bl=window.__bl||[]).push([+bl.t.toFixed(2),+ln.toFixed(1),+ph.toFixed(1),+((ang-ang0)*57.3).toFixed(0),+(ang*57.3).toFixed(0),+(bl.t*9.4%6.283).toFixed(2)]);let fx=pr.sx,fy=bsy;{const hd=ART.hand;if(hd&&performance.now()-hd.k<900&&bl.t<.14){if(!bl._o)bl._o=[hd.sx-pr.sx,hd.sy-bsy];const kk=Math.max(0,1-Math.pow(bl.t/.14,1.5));fx+=bl._o[0]*kk;fy+=bl._o[1]*kk}}ballFly(ctx,fx,fy,ln,ang,bl.t*9.4)}
    else ballSpiral(ctx,pr.sx,bsy,S*1.5,ang,bl.t*34,Math.abs(Math.cos(ang))>.55)}
  if(F.snap){const k=F.snap.t/F.snap.T,Q=F.off.QB,x=F.snap.from.x+(Q.x-F.snap.from.x)*k,y=F.snap.from.y+(Q.y-F.snap.from.y)*k,pr=P(x,y);ballShape(ctx,pr.sx,pr.sy-pr.u*(.7+Math.sin(Math.PI*k)*.7),Math.max(3,pr.u*.3),k*18)}
  if(F.lat&&!F.latDone){const k=F.latT/.45,qb=F.off.QB;const x=F.latFrom.x+(qb.x-F.latFrom.x)*k,y=F.latFrom.y+(qb.y-F.latFrom.y)*k,pr=P(x,y);ballShape(ctx,pr.sx,pr.sy-pr.u*(1.4+Math.sin(Math.PI*k)*2.4),Math.max(3,pr.u*.45),k*20)}
  // Diegetic carrier stamina arc (Pillar 3): visible when stamina < 85% or tired
  if(F&&F.mode==='live'&&F.carrier&&!F.ballAir&&!F.gb&&(F.turbo<85||F.tired)){
    const c=F.carrier,pr=P(c.x,c.y),rad=Math.max(12,pr.u*.95),pct=clamp(F.turbo/100,0,1);
    ctx.save();ctx.lineCap='round';
    ctx.strokeStyle='rgba(0,0,0,0.45)';ctx.lineWidth=4;
    ctx.beginPath();ctx.ellipse(pr.sx,pr.sy+2,rad,rad*.42,0,Math.PI*.15,Math.PI*.85);ctx.stroke();
    ctx.strokeStyle=F.tired?'#ff4a4a':(pct<.3?'#ffae36':'#38c6d9');ctx.lineWidth=2.5;
    ctx.beginPath();ctx.ellipse(pr.sx,pr.sy+2,rad,rad*.42,0,Math.PI*.15,Math.PI*.15+Math.PI*.7*pct);ctx.stroke();
    ctx.restore();
  }
  // dust and impact effects
  for(const e of parts){const pr=P(e.x,e.y),k=e.t/e.life;
    if(e.kind==='dust'){}
    else if(e.kind==='ring'){ctx.globalAlpha=(1-k);ctx.strokeStyle=e.col;ctx.lineWidth=Math.max(2,pr.u*.25*(1-k));ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,pr.u*e.r*(.6+k*3),pr.u*e.r*(.6+k*3)*.45,0,0,7);ctx.stroke();ctx.globalAlpha=1}
    else if(e.kind==='spark'){ctx.globalAlpha=1-k;ctx.fillStyle=e.col;ctx.fillRect(pr.sx-1.5,pr.sy-e.z*pr.u*.8-1.5,3,3);ctx.globalAlpha=1}}
  const q=F.carrier;
  if(F.mode==='live'&&q&&q.role==='QB'&&F.passer===q&&!F.lock){
    for(const [r,l] of BTN){const p=F.off[r],pr=P(p.x,p.y);const yy=pr.sy-Math.max(22,2.75*pr.u)*1.1-12,rad=Math.max(9,pr.u*.55);
      const C=window.CUE,cg=cueGap(q,p);
      p.hi=(p.stun>0||!cg.inr)?false:(p.hi?cg.nd>C.off:cg.nd>C.on);   // v3.16W1: open where the ball would arrive (he lights up, and goes dark as a defender closes in)   // open = nobody close; he lights up, and goes dark again as a defender closes in
      if(p.hi){const pu=.5+.5*Math.sin(performance.now()/160);ctx.strokeStyle='rgba(93,255,154,'+(.55+.4*pu)+')';ctx.lineWidth=Math.max(3,pr.u*.22);ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,pr.u*(1.05+.12*pu),pr.u*(1.05+.12*pu)*.42,0,0,7);ctx.stroke();
        ctx.fillStyle='rgba(93,255,154,.14)';ctx.fill()}
      const open=!!p.hi;
      ctx.fillStyle=open?ROLECOL[r]:'rgba(19,22,32,.84)';ctx.beginPath();ctx.arc(pr.sx,yy,rad,0,7);ctx.fill();
      ctx.strokeStyle=open?'#5dff9a':'rgba(203,213,225,.28)';ctx.lineWidth=open?2.5:1.5;ctx.stroke();
      if(open){
        ctx.strokeStyle='#5dff9a';ctx.lineWidth=3.5;ctx.beginPath();ctx.arc(pr.sx,yy,rad+3.5,0,7);ctx.stroke();
        const pillW=Math.max(30,rad*2.65),pillH=Math.max(12,rad*.92),pillY=yy+rad+7;
        ctx.fillStyle='rgba(52,211,153,.96)';ctx.beginPath();ctx.roundRect(pr.sx-pillW/2,pillY,pillW,pillH,pillH/2);ctx.fill();
        ctx.fillStyle='#08251a';ctx.font='900 '+Math.max(8,rad*.62)+'px "Barlow Condensed",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('OPEN',pr.sx,pillY+pillH/2);
      }
      ctx.fillStyle=open?'#071b14':'#cbd5e1';ctx.font='900 '+rad*1.2+'px "Barlow Condensed",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const _inm=document.documentElement.dataset.input,_gm=_inm==='xbox'?{1:'A',2:'B',3:'X',4:'Y'}:_inm==='playstation'?{1:'\u2715',2:'\u25cb',3:'\u25a1',4:'\u25b3'}:_inm==='nintendo'?{1:'B',2:'A',3:'Y',4:'X'}:null,_lbl=_gm&&_gm[l]?_gm[l]:l;ctx.fillText(_lbl,pr.sx,yy+1)}
  }
  if(q&&F.mode==='live'){const pr=P(q.x,q.y);ctx.fillStyle='#fff';ctx.strokeStyle='#000';ctx.lineWidth=3;ctx.font='700 13px "Barlow Condensed",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const nm=q.name.replace(/"[^"]*"\s*/,'').split(' ').pop();const qL=lookOf(q.d),qh=playerPx(pr,qL.h,q.d.star||q.d.special),ny=pr.sy+qh*.12+4;ctx.textBaseline='top';ctx.strokeText(nm,pr.sx,ny);ctx.fillText(nm,pr.sx,ny)}   // like NFL Street: the name sits under the carrier's feet, clear of every jersey number
}
function drawPopups(dt){
  for(let i=popups.length-1;i>=0;i--){const p=popups[i];p.t+=dt;if(p.t>1.1){popups.splice(i,1);continue}
    if(LAND&&(p.hid||/^(SWIM!|SPIN!|BULL RUSH!|PANCAKE!)$/.test(p.text)))continue;   /* v3.13 B5: lineman labels off in every landscape camera */   // v3.10: said by a big callout instead / lineman labels off in the runner camera
    const pr=p.tp?P(p.tp.x,p.tp.y):P(p.x,p.y);const a=p.t<.9?1:(1.1-p.t)/.2;ctx.globalAlpha=a;
    ctx.font='400 '+Math.max(15,Math.min(26,pr.u*.95))+'px "Bowlby One",Impact,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=5;ctx.strokeStyle='#000';ctx.lineJoin='round';
    const yy=pr.sy-.95*playerPx(pr,1,1)-14-p.t*34-(p.k||0)*Math.max(18,Math.min(28,pr.u*1.05));ctx.strokeText(p.text,pr.sx,yy);ctx.fillStyle=p.col;ctx.fillText(p.text,pr.sx,yy);ctx.globalAlpha=1}
}
let _vignetteGrad=null;
function rebuildVignette(){_vignetteGrad=ctx.createRadialGradient(W*.5,H*.5,H*.3,W*.5,H*.5,H*.8);_vignetteGrad.addColorStop(0,'rgba(0,0,0,0)');_vignetteGrad.addColorStop(1,'rgba(0,0,0,.35)')}
let frameNo=0;
function draw(rdt){frameNo++;const pt=k=>{if(PL.on){const n=performance.now();PL.add(k,n-PL.mark);PL.mark=n}};if(PL.on)PL.mark=performance.now();
  ctx.save();
  bmShakeApply(rdt);bmPunchApply(rdt);   // v3.13 B1/B2: trauma shake + camera punch (game/14d)
  if(Math.abs(camLean)>.0005){const a=Math.abs(camLean),s=Math.cos(a)+Math.max(W/H,H/W)*Math.sin(a);ctx.translate(W/2,H/2);ctx.rotate(camLean);ctx.scale(s,s);ctx.translate(-W/2,-H/2)}   // v3.09: the camera leans a little into a cut (scaled so the corners stay covered)
  drawField();pt('field');
  if(G&&G.drill&&typeof fdDrawField3D==='function')fdDrawField3D();
  if(F&&!window.__noplayers){drawLane();drawRoutes();drawEntities()}pt('players');
  drawAtmos();pt('rain+glow');
  if(G&&G.drill&&typeof fdDrawHud3D==='function')fdDrawHud3D();
  drawPopups(rdt);bmSpeedLines();bmImpactDraw(rdt);   // v3.09; v3.13 impact bursts + impact frame
  if(!_vignetteGrad)rebuildVignette();ctx.fillStyle=_vignetteGrad;ctx.fillRect(0,0,W,H);pt('popups+vignette');
  ctx.restore();
}
let zoomIn=false,zCap=1;
/* v3.06 (item 15) RUNNER CAMERA: once the ball carrier is 3+ yards past the line (not the passer, not while the ball is in the air), the
   camera pushes in to RUNCAM.zoom and sits closer behind him (back x RUNCAM.back), as far as keeps him and the players around him on
   screen (fitSet); it eases back out at the whistle. MENU > RUNNER CAMERA: ON / OFF (kept on this device). */
const RUNCAM=window.RUNCAM={zoom:1.6,back:.8,on:true,lean:.012,kick:1.06,widen:.07,wFrom:5.8};   /* v3.13: widen = most pull-back at top speed (0 = off); wFrom = speed (yd/s) where it starts, just under a jogging back */   /* v3.09: zoom 1.25 -> 1.6 with the low RUNCFG camera (game/09); lean = most camera roll toward a cut (radians, about 2 degrees); kick = zoom push while TURBO is held */try{if(localStorage.getItem('cf_runcam')==='0')RUNCAM.on=false}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
const runZ=()=>RUNCAM.on?RUNCAM.zoom:CAMCFG.zoomIn;
const runHero=()=>!!(RUNCAM.on&&LAND&&zoomIn);   // v3.09: while the runner camera is on, only the carrier has to stay on screen: the camera no longer backs off to fit the defenders around him
let camLean=0;

const FITR=7;
const _FIT_LOOKAHEADS=[0,.4,.8];
const _fitList=[],_fitHero=[null],_fitOut={lo:0,hi:0,vert:true},_fitDef=[],_fitNear=[];
function fitSet(){   // zero-alloc reusable neighborhood set: carrier + 3 nearest defenders + 4 nearest players
  const c=F&&F.carrier;_fitList.length=0;if(!c)return _fitList;
  _fitList.push(c);_fitDef.length=0;_fitNear.length=0;
  const r2=FITR*FITR;
  for(let i=0;i<F.def.length;i++){const d=F.def[i];if(d.fall)continue;const dx=d.x-c.x,dy=d.y-c.y,q=dx*dx+dy*dy;if(q<=r2){d._fd2=q;_fitDef.push(d)}}
  _fitDef.sort((a,b)=>a._fd2-b._fd2);
  for(let i=0;i<3&&i<_fitDef.length;i++){const p=_fitDef[i];if(_fitList.indexOf(p)<0)_fitList.push(p)}
  for(let i=0;i<F.all.length;i++){const p=F.all[i];if(p===c)continue;const dx=p.x-c.x,dy=p.y-c.y,q=dx*dx+dy*dy;if(q<=r2){p._fd2=q;_fitNear.push(p)}}
  _fitNear.sort((a,b)=>a._fd2-b._fd2);
  for(let i=0;i<4&&i<_fitNear.length;i++){const p=_fitNear[i];if(_fitList.indexOf(p)<0)_fitList.push(p)}
  return _fitList;
}
function fitViewInto(z,list,las,out){   // zero-alloc projection bounds check
  let lo=-1e9,hi=1e9,vert=true;const mg=LAND?CAMCFGL.margin:.082,laArr=las||_FIT_LOOKAHEADS;
  const hBase=LAND?H*(ART.on?ART.hp:CAMCFGL.hPct)*z*1.15:0,hExp=ART.on?CAMCFGL.artDepth:CAMCFGL.sizeDepth;
  const yMax=(1-mg)*H,yMin=(LAND?.08:.10)*H;
  for(let i=0;i<list.length;i++){const p=list[i],vx=p.vx||0,vy=p.vy||0;
    for(let j=0;j<laArr.length;j++){const la=laArr[j],px=p.x+vx*la,py=p.y+vy*la,d=py-cam.y,sc=D2/(Math.max(d,-D2*.45)+D2),u=WU*U0F*z*sc;
      const hp=LAND?hBase*Math.pow(sc,hExp):3.3*u*PSCALE*1.1,R=((.5-mg)*W-.42*hp)/u;
      if(px-R>lo)lo=px-R;if(px+R<hi)hi=px+R;
      const sy=syDepthZ(d,z);if(sy>yMax||sy-hp<yMin)vert=false}}
  out.lo=lo;out.hi=hi;out.vert=vert;return out;
}
function fitView(z,list,las){const o=fitViewInto(z,list,las,_fitOut);return{lo:o.lo,hi:o.hi,vert:o.vert}}
function solveMaxZoom(zMin,zMax,list){   // 6-step binary search (~0.015 precision) instead of ~30-step linear scan
  fitViewInto(zMax,list,null,_fitOut);if(_fitOut.vert&&_fitOut.lo<=_fitOut.hi)return zMax;
  let lo=zMin,hi=zMax;
  for(let k=0;k<6;k++){const mid=(lo+hi)*.5;fitViewInto(mid,list,null,_fitOut);if(_fitOut.vert&&_fitOut.lo<=_fitOut.hi)lo=mid;else hi=mid}
  return lo;
}
function dynZoom(dt){
  const c=F&&F.carrier;if(c&&F.mode==='dead'&&!F.ballAir){zoomIn=false;const l2=fitSet();const r2=solveMaxZoom(CAMCFG.minZoom,1,l2);zCap=Math.min(zCap,r2);return Math.min(1,zCap)}
  if(!c||F.mode!=='live'||F.ballAir){zoomIn=false;zCap=1;return 1}
  const past=c.y-F.los,early=RUNCAM.on&&LAND&&((PLAY&&PLAY.kind==='run')||(F.caught&&c.role!=='QB'));
  if(early)zoomIn=true;else if(!zoomIn&&past>=3)zoomIn=true;else if(zoomIn&&past<2)zoomIn=false;
  let list;if(runHero()){_fitHero[0]=c;list=_fitHero}else list=fitSet();
  const want=zoomIn?runZ():1,raw=solveMaxZoom(CAMCFG.minZoom,want,list);
  if(raw<zCap)zCap=raw;else zCap+=(raw-zCap)*(1-Math.exp(-(runHero()?7:3)*dt));
  return zCap;
}
let fitLast=null;
let hudBotC=[0,57];
function hudBot(){const n=performance.now();if(n-hudBotC[0]>400){try{const r=$('#hud').getBoundingClientRect(),a=$('#app').getBoundingClientRect();hudBotC=[n,Math.max(30,r.bottom-a.top)]}catch(e){hudBotC=[n,57]}}return hudBotC[1]}
// On pass plays the camera also keeps every receiver's head 4% of the screen below the scoreboard, and the ball 3% below it, by moving the view up the field (never so far that the passer drops below 88% of the screen).
function passNeed(){
  const f=H*FOCF,k=H*MY*D2*cam.zoom,hb=hudBot(),hp=H*ART.hp*.62,need=(Y)=>k*D2/(Math.max(Y-f+k,1))-D2;
  let want=-1e9;
  for(const r of ['WR1','WR2','TE','RB']){const q=F.off[r];if(!q||q.fall)continue;let cy=Math.max(cam.y,want>-1e8?want:cam.y);for(let it=0;it<4;it++){const sq=D2/(Math.max(q.y-cy,-D2*.45)+D2),hq=H*ART.hp*cam.zoom*sq;cy=q.y-need(hb+H*.045+hq)}want=Math.max(want,cy)}
  if(F.ballAir&&F.ball&&F.ball.cur){const b=F.ball.cur,u=WU*U0F*cam.zoom*(D2/(Math.max(b.y-cam.y,-D2*.45)+D2));want=Math.max(want,b.y-need(hb+H*.035+(b.h*.9+1.4)*u))}
  return want}
function passClampTy(ty){
  let want=passNeed();const pq=F.passer;
  if(pq&&!F.ballAir&&F.carrier===pq){const f=H*FOCF,k=H*MY*D2*cam.zoom,cap=pq.y-(k*D2/Math.max(H*.88-f+k,1)-D2);want=Math.min(want,Math.max(ty,cap))}
  return Math.max(ty,want)}
const CJ=[];
function camJ(){if(CJ.length<12)return'-';const d=[];for(let i=2;i<CJ.length;i++)d.push(Math.abs(CJ[i]-2*CJ[i-1]+CJ[i-2]));d.sort((a,b)=>a-b);return d[Math.floor(d.length*.95)].toFixed(3)}
function camUpdate(rdt){
  if(window.__camFix){Object.assign(cam,window.__camFix);return}
  const side=camMode()==='side';
  applyCam();let ty=-4,tx=CX,tz=1;{const fp=F&&(F.carrier||F.passer);const fx0=fp?fp.x:CX,vl=clamp((13-fx0)/3,0,1),vr=clamp((13-(FW-fx0))/3,0,1);const k=1-Math.exp(-6*rdt);sideVis[0]+=(vl-sideVis[0])*k;sideVis[1]+=(vr-sideVis[1])*k}
  if(F){
    if(G.mode==='set'){ty=side?F.los-3:F.los-7.5;tx=CX;tz=1}
    else if(F.mode==='pre'||G.mode==='playcall'){ty=side?F.los+1.5:(G.mode==='playcall'?F.los+CAMPC.ty:F.los-7.5);tx=CX;tz=1;zoomIn=false}
    else{const f=(G&&G.drill&&G.drill.id==='t2_crush'&&G.drill.players&&G.drill.players[0])?G.drill.players[0]:(F.ballAir&&F.ball?F.ball.cur:(F.carrier||F.passer||{x:CX,y:F.los})),rk=(RUNCAM.on&&!F.ballAir&&runZ()>1)?clamp((cam.zoom-1)/(runZ()-1),0,1):0;ty=side?f.y+(F.ballAir?3:2):f.y-CAMCFGL.back*(1-(1-RUNCAM.back)*rk)-(F.ballAir?1:0)+(F.ballAir?0:clamp((f.vy||0)*CAMCFG.lookY,-.5,2.5)*(1-.8*CAMR));   // v3.09: little look-ahead in the runner camera, so the runner stays low and steady
      if(side)tx=CX;else{
        const z=cam.zoom,dz=.05*W/(WU*U0F*z),fxl=f.x+(F.carrier&&!F.ballAir?clamp((f.vx||0)*CAMCFG.look,-4,4):0),off=fxl-cam.x;tx=fxl-clamp(off,-dz,dz);   // the camera leads: it aims a half second ahead of the carrier   // sideways pan with a soft dead zone of 10% of the screen width
        const dist=Math.min(f.x,FW-f.x),wg=clamp((10-dist)/3,0,1),Lx=.385*W/(WU*U0F*z),Lm=(LAND?.36:.35)*W/(WU*U0F*z);   // within about 8 yards of a sideline, pan to it so it sits 8-15% from the screen edge
        tx=tx*(1-wg)+(f.x<CX?Lx:FW-Lx)*wg;tx=clamp(tx,Lm,FW-Lm);
        const fs=runHero()&&F.carrier?[F.carrier]:fitSet(),v0=fitView(z,fs,[0]),v=fitView(z,fs);fitLast=v0;tx=v.lo<=v.hi?clamp(tx,v.lo,v.hi):(v0.lo<=v0.hi?clamp(tx,v0.lo,v0.hi):(v0.lo+v0.hi)/2);if(window.__dbg)window.__fitv=[+v.lo.toFixed(1),+v.hi.toFixed(1),v.vert,+tx.toFixed(1),+cam.x.toFixed(1)];   // and never let the carrier or the 4 nearest players slip past the 8% margin
        tz=dynZoom(Math.min(rdt,.05));if(runHero()&&F.carrier&&!(F.cine>0)){const c=F.carrier,s=Math.hypot(c.vx||0,c.vy||0);tz*=1-RUNCAM.widen*clamp((s-RUNCAM.wFrom)/2.5,0,1)}}if(G&&G.drill){ty=f.y;tx=clamp(f.x,18,FW-18);tz=1}}   // v3.13 B9: the view opens up a little at top speed (the TURBO press gets its kick from the B2 punch)   // v3.09: TURBO push-in
  }
  if(SIMV.on){simStep(rdt);ty=Math.min(SIMV.cl,SIMV.cf)-5.5;tx=CX;tz=1}
  if(F&&F.cine>0&&!SIMV.on){F.cine-=rdt;const f=F.carrier;if(f&&!side){const pr=1-F.cine/SP_CINE;ty=f.y-CAMCFGL.back*.55;tx=f.x+(.5-pr)*6;tz=1.55}}
  const passPlay=!!(F&&!side&&LAND&&G&&PLAY&&PLAY.kind!=='run'&&PLAY.kind!=='flea'&&F.off);
  const passOn=passPlay&&((G.mode==='live'&&F.mode==='live'&&(F.ballAir||(F.passer&&F.carrier===F.passer)))||G.mode==='dead');
  if(passOn)ty=passClampTy(ty);
  {const pt=(passOn&&!F.ballAir&&F.passer&&F.carrier===F.passer&&F.mode==='live')?1:0;CAMP+=(pt-CAMP)*(1-Math.exp(-(pt?3:5)*rdt));if(Math.abs(pt-CAMP)<.002)CAMP=pt}   // v3.16KK1: ease into the pocket camera after the snap, out when the ball is thrown
  {const bt=(LAND&&G&&(G.mode==='playcall'||G.drill))?1:0;CAMB+=(bt-CAMB)*(1-Math.exp(-4.2*rdt));if(Math.abs(bt-CAMB)<.002)CAMB=bt}
  {const c=F&&F.carrier,rt=(!(G&&G.drill)&&F&&F.mode==='live'&&!F.ballAir&&c&&!(F.passer===c)&&runHero()&&!SIMV.on)?1:0;CAMR+=(rt-CAMR)*(1-Math.exp(-(rt?7:3)*rdt));   /* v3.10: in within about 0.4 s */if(Math.abs(rt-CAMR)<.002)CAMR=rt;   // v3.09: ease into / out of the low runner camera
   const lt=(rt&&c&&!bmLite())?-clamp((c.vx||0)/7,-1,1)*RUNCAM.lean:0;camLean+=(lt-camLean)*(1-Math.exp(-5*rdt))}
  const k=1-Math.exp(-6*rdt);if(window.__camlog){const f0=F&&(F.carrier||F.passer);window.__camlog.push([performance.now(),rdt,tx,cam.x,f0?f0.x:0,f0?(f0.vx||0):0,cam.zoom,tz])}cam.y+=(ty-cam.y)*k;cam.x+=(tx-cam.x)*k;
  if(passOn){const w=passNeed();if(cam.y<w)cam.y=w}   // hard floor: the view never lags behind a deep receiver or the ball
  {const cx0=cam.x;if(!side&&F&&F.mode!=='pre'&&!(F.cine>0)&&G.mode==='live'&&fitLast&&fitLast.lo<=fitLast.hi)cam.x=clamp(cam.x,fitLast.lo,fitLast.hi);if(window.__camlog&&window.__camlog.length)window.__camlog[window.__camlog.length-1].push(cam.x-cx0,fitLast?fitLast.lo:0,fitLast?fitLast.hi:0);CJ.push(cam.x);if(CJ.length>120)CJ.shift()}   // the margin is a hard rule: if easing would let the group slip inside the 8% edge, the camera is simply held at the limit
  if(side){cam.zoom+=(tz-cam.zoom)*k}
  else{const w=(F&&F.cine>0)?7:3,dt=Math.min(rdt,.05),acc=w*w*(tz-cam.zoom)-2*w*cam.zv;cam.zv+=acc*dt;cam.zoom+=cam.zv*dt;if(window.__dbg){window.__zt=(window.__zt||0)+dt;(window.__zlog=window.__zlog||[]).push([window.__zt,cam.zoom])}if(Math.abs(tz-cam.zoom)<.0005&&Math.abs(cam.zv)<.002){cam.zoom=tz;cam.zv=0}}   // a critically damped ease: starts and ends at rest, about a second end to end
}
let hudCache={};
function setT(id,v){if(hudCache[id]!==v){const was=hudCache[id];hudCache[id]=v;$(id).textContent=v;
  if((id==='#nY'||id==='#nO')&&typeof was==='number'&&v>was&&!document.body.classList.contains('lite')){const e=$(id);e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump')}}}   // v3.13 B7: the score jumps when it goes up
function updateHud(){
  if(!G||$('#hud').hidden)return;
  (()=>{for(const [id,val] of [['#nY',G.you],['#nO',G.opp]]){const el=$(id),nv=String(val);if(el&&el.textContent!==nv){const prev=+el.textContent||0;el.textContent=nv;if(val>prev&&!(document.body&&document.body.classList.contains('lite'))){el.classList.remove('bump');void el.offsetWidth;el.classList.add('bump')}}}})();setT('#dd',ddText());setT('#sp',spotTxt(G.los));setT('#clk',G.clockOn?Math.max(0,Math.ceil(G.clock)):(G.mode==='live'||G.guide1?'--':25));$('#bClock').classList.toggle('low',!!G.clockOn&&G.clock<=5);
  const live=F&&F.gb&&F.mode==='live';
  {const sp=G.sp,st=starsOnO(),q=st.length?st.map(x=>sp.m[x.name]||0).sort((a,b)=>b-a)[0]:0,rdy=!!sp.ready;$('#gbFill').style.width=(rdy?100:q)+'%';$('#gb').classList.toggle('full',rdy&&!live);$('#gb').classList.toggle('live',!!live)}
  setT('#gbTxt',live?'\u2605 STAR PLAY ACTIVE':(G.sp.ready?'\u2605 STAR PLAY READY \u00b7 '+G.sp.left+' LEFT':(starsOnO().length?'\u2605 STAR PLAY '+Math.round(Math.max(0,...starsOnO().map(x=>G.sp.m[x.name]||0)))+'%':'NO STAR PLAYER')));
  const _tb=Math.max(0,Math.min(100,F?F.turbo:100));$('#turboFill').style.height=_tb+'%';$('#turboWrap').classList.toggle('tired',!!(F&&F.tired));$('#turboWrap').setAttribute('role','progressbar');$('#turboWrap').setAttribute('aria-valuenow',String(Math.round(_tb)));$('#turboWrap').setAttribute('aria-label','Stamina '+Math.round(_tb)+'%');const _bt=$('#bTurbo');if(_bt){_bt.classList.toggle('tired',!!(F&&F.tired));let _fl=_bt.querySelector('.ui-turbo-fill');if(!_fl){_bt.innerHTML='<span class="ui-turbo-fill" aria-hidden="true"></span><span class="ui-turbo-txt">TURBO</span>';_fl=_bt.querySelector('.ui-turbo-fill')}_fl.style.height=_tb+'%'}
  {const b=$('#bTurbo'),st=((F?F.turbo:100)/100).toFixed(3);if(b._st!==st){b._st=st;b.style.setProperty('--st',st)}b.classList.toggle('tired',!!(F&&F.tired));   // v3.13 B7: stamina ring on TURBO
   const cc=F&&F.mode==='live'&&F.carrier;cdSweep('#bJuke',cc?cc.cdJ||0:0);cdSweep('#bSpin',cc?cc.cdS||0:0);cdSweep('#bStiff',cc?cc.arm||0:0);{const hb=$('#bHurdle'),m=hdMode();hb.classList.toggle('show',!!m);hb.classList.toggle('dive',m==='dive');const tx=m==='dive'?'DIVE':'HURDLE';if(hb.textContent!==tx){hb.textContent=tx;hb.setAttribute('aria-label',tx)}cdSweep('#bHurdle',cc?cc.cdH||0:0)}}   // v3.13 B6: cooldown sweeps
  $('#bStyle').classList.toggle('on',!!(F&&F.carrier&&F.carrier.styleOn));
  const qb=F&&F.carrier&&F.carrier.role==='QB'&&F.passer===F.carrier&&!F.lock&&!F.ballAir;
  $('#thr').style.visibility=G.mode==='live'&&qb?'visible':'hidden';
  if(G.mode==='playcall'&&!$('#sheet').hidden)updateGBBtn();
}
