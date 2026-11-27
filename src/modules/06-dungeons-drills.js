/* ================= v3.17B ARENA DUNGEON REV 3 (CF_73 REV 3): hub, keycards, ARENA LIGHTS, Dante's ball, drone, heavy ball =================
   Rooms: dg1 Lobby, dgc Concourse (hub), dgl Locker Room, dge Equipment Cage, dgg Gauntlet (drone), dgt Center Court, dgv Vault,
   then the existing arena (Mo). Save: SAVE.dg.arena (v:2). Never writes SAVE.beaten. Unsolved-room state lives in memory only. */
var DGK={v:2,ball:false,solved:null,cards:0,got:null,used:null,lights:'pink',pass:false,tunnel:false,map:false,visited:null,bossAccess:false,cleared:false,shortcut:false,loot:false};
function dgS(){if(!SAVE.dg||typeof SAVE.dg!=='object')SAVE.dg={};let a=SAVE.dg.arena;if(!a||typeof a!=='object')a=SAVE.dg.arena={};
  if(a.v!==2&&a.v!==undefined){const keep={ball:!!a.ball,loot:!!a.loot};for(const k of Object.keys(a))delete a[k];Object.assign(a,keep)}   // v3.17A TEST saves: keep the ball and +2, start the new layout fresh
  for(const k in DGK)if(a[k]===undefined)a[k]=(k==='solved'||k==='got'||k==='used'||k==='visited')?{}:DGK[k];
  for(const k of ['solved','got','used','visited'])if(!a[k]||typeof a[k]!=='object')a[k]={};
  if(a.lights!=='pink'&&a.lights!=='cyan')a.lights='pink';a.v=2;return a}
function dgCrews(){return ['cats','kings','rollers'].every(id=>(SAVE.beaten||[]).includes(id))}
function dgDone(){return (SAVE.beaten||[]).includes('captain')||dgS().cleared===true}
var DG={st:{},fly:null,hfly:null,inv:0,flash:0,last:0,t:0,gateSeen:false,taunt:{},shake:0};
var DGC={pink:'#ff2fa8',cyan:'#27e0ff',gold:'#ffd23a',green:'#58ffb0',red:'#ff3b5c'};
var DG_BALL_MAX=8,DG_BALL_SP=12;

/* ---- room shells ---- */
function dgL(list){return list.map(([x,y])=>({x,y,t:'locker',s:1}))}
var DG_ROOMS={
 dg1:{w:12,h:9,fl:'court',floor:'#10301c',wall:'#1d1546',acc:'#ff2fa8',acc2:'#27e0ff',title:'ARENA LOBBY',kan:'拳',dg:1,dgDoors:[[5,1],[6,1]],
  props:[{x:1,y:2,t:'case',s:1},{x:10,y:2,t:'case',s:1},{x:8,y:3,t:'desk',s:1},{x:9,y:3,t:'counter',s:1},{x:1,y:6,t:'bench',s:1},{x:10,y:6,t:'plant',s:1},{x:2,y:7,t:'banner',s:0},{x:9,y:7,t:'banner',s:0}],npcs:[]},
 dgc:{w:12,h:11,fl:'court',floor:'#121a30',wall:'#1d1546',acc:'#27e0ff',acc2:'#ff2fa8',title:'CONCOURSE',kan:'拳',dg:1,dgDoors:[[5,1],[6,1],[0,5],[0,8],[11,5],[11,8]],
  props:[{x:1,y:2,t:'plant',s:1},{x:10,y:2,t:'vend',s:1},{x:1,y:9,t:'bench',s:1},{x:10,y:9,t:'plant',s:1}],npcs:[]},
 dgl:{w:12,h:10,fl:'court',floor:'#14142e',wall:'#1d1546',acc:'#9b5cff',acc2:'#27e0ff',title:'LOCKER ROOM',kan:'拳',dg:1,ex:[],dgDoors:[[5,1],[6,1],[11,5]],
  props:dgL([[1,2],[2,2],[3,2],[4,2],[7,2],[8,2],[9,2],[10,2],[1,3],[2,3],[3,3],[4,3],[10,3],[1,4],[4,4],[5,4],[6,4],[7,4],[1,5],[3,5],[4,5],[1,6],[3,6],[4,6],[6,6],[7,6],[8,6],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8]]),npcs:[]},
 dge:{w:12,h:10,fl:'court',floor:'#0f2a24',wall:'#151a40',acc:'#ffd23a',acc2:'#27e0ff',title:'EQUIPMENT',kan:'拳',dg:1,ex:[],dgDoors:[[11,6]],
  props:[{x:1,y:2,t:'crate',s:1},{x:10,y:2,t:'weights',s:1},{x:10,y:3,t:'crate',s:1}],npcs:[]},
 dgg:{w:12,h:11,fl:'court',floor:'#1a1426',wall:'#2a1440',acc:'#ffd23a',acc2:'#ff2fa8',title:'GAUNTLET',kan:'拳',dg:1,dgDoors:[[5,1],[6,1]],props:[],npcs:[]},
 dgt:{w:12,h:11,fl:'court',floor:'#10301c',wall:'#162038',acc:'#58ffb0',acc2:'#ff2fa8',title:'CENTER COURT',kan:'拳',dg:1,dgDoors:[],props:[],npcs:[]},
 dgv:{w:12,h:9,fl:'court',floor:'#1c1430',wall:'#2a1440',acc:'#ffd23a',acc2:'#9b5cff',title:'VAULT',kan:'拳',dg:1,ex:[],dgDoors:[[0,5]],
  props:[{x:1,y:2,t:'case',s:1},{x:1,y:7,t:'crate',s:1}],npcs:[]}
};
(function(){for(const k in DG_ROOMS)OWI[k]=DG_ROOMS[k];
  const a=OWI.arena;if(a){const u=a.npcs.find(n=>n.id==='usher');if(u){a.npcs=a.npcs.filter(n=>n!==u);u.x=7;u.y=4;u.d='d';u.t=(u.t||[]).concat(["The vault eats your throws unless you play its rules.","Blood to start. Ocean to steer. Crown to open what's hidden here."]);OWI.dg1.npcs.push(u)}a.dgDoors=[[0,7]]}
  for(const k of Object.keys(DG_ROOMS).concat(['arena']))if(OWMAPS[k])delete OWMAPS[k]})();

/* ---- helpers ---- */
var DG_DIRS={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]};
function dgHas(list,x,y){return !!list&&list.some(q=>q[0]===x&&q[1]===y)}
function dgEli(x,y){return (OW.x===x&&OW.y===y)||(OW.mv&&OW.nx===x&&OW.ny===y)}
function dgLightUp(color){return dgS().lights!==color}   // a block of the lit colour is down; the other colour is up
function dgTaunt(id,t){if(DG.taunt[id])return;DG.taunt[id]=1;setTimeout(()=>{if(M&&M.id===id)owToast(t)},700)}
function dgVisit(id){const a=dgS();if(!a.visited[id]){a.visited[id]=1;persist()}}
function dgBuzz(){SND.fx('err');DG.shake=.25}
function dgGiveCard(id){const a=dgS();if(a.got[id])return;a.got[id]=1;a.cards=(a.cards||0)+1;persist();SND.fx('ok2');owToast('GOT  KEYCARD')}
function dgPing(px,py,col){DG.pings=(DG.pings||[]).concat({x:px,y:py,c:col||DGC.gold,t:.5})}

/* ---- rooms ----
   Each room: home [x,y,d] (entrance after reset/reload), doors {tile:[x,y], to, at:[x,y,d], open(st), oneway, unlock()},
   cls(x,y,st) -> null | {k:'rail'} | {k:'pad',t:'/'|'\\'} | {k:'tgt',o} | {k:'tall'} | {k:'hb'} | {k:'obj',o}
   movers(st) -> moving things a thrown ball can hit [{x,y,o}] */
var DGR={};
DGR.dg1={home:[6,7,'u'],
  init(){return {}},
  doors(){return [{tile:[5,1],to:'dgc',at:[5,9,'u'],open:dgCrews},{tile:[6,1],to:'dgc',at:[6,9,'u'],open:dgCrews},{tile:[5,8],to:'street',open:()=>true},{tile:[6,8],to:'street',open:()=>true}]},
  cls(x,y){if(y===2&&(x===5||x===6)&&!dgCrews())return {k:'tall',gate:1};return null},
  bump(x,y){const P=[[2,'cats','GLITCH CATS'],[3,'kings','SCRAP KINGS'],[4,'rollers','SKYLINE DRIFTERS']];
    if(y===1){const p=P.find(q=>q[0]===x);if(p){owSay(p[2],[(SAVE.beaten||[]).includes(p[1])?'BEATEN.':'NOT BEATEN YET.']);return true}}
    if(y===2&&(x===5||x===6)&&!dgCrews()){SND.fx('err');owSay('GATE',['Locked. Beat all three crews to open it.']);return true}
    return false},
  enter(){if(dgCrews()&&!DG.gateSeen){DG.gateSeen=true;SND.fx('open')}}};

DGR.dgc={home:[5,9,'u'],key:'concourse',
  rail:[[5,3],[6,3],[7,3]],glass:[[7,4],[9,4],[7,5],[9,5],[8,6]],pads:[[4,3,'/'],[8,3,'\\']],
  init(){return {}},
  doors(){const a=dgS();return [
    {tile:[5,1],to:'arena',at:[1,7,'r'],open:()=>a.tunnel,lock:'pass'},{tile:[6,1],to:'arena',at:[1,7,'r'],open:()=>a.tunnel,lock:'pass'},
    {tile:[0,5],to:'dgl',at:[10,5,'l'],open:()=>true},{tile:[0,8],open:()=>false,oneway:1},
    {tile:[11,5],to:'dgg',at:[5,9,'u'],open:()=>!!a.used.east,lock:'card',use:'east'},{tile:[11,8],to:'dgv',at:[1,5,'r'],open:()=>!!a.used.vault,lock:'card',use:'vault'},
    {tile:[5,10],to:'dg1',at:[5,2,'d'],open:()=>true},{tile:[6,10],to:'dg1',at:[6,2,'d'],open:()=>true}]},
  cls(x,y){const a=dgS(),solved=!!a.solved.concourse;
    if(x===2&&y===3)return {k:'tgt',o:{kind:'lights',hit:dgLights}};
    if(dgHas(this.rail,x,y))return {k:'rail'};
    const p=this.pads.find(q=>q[0]===x&&q[1]===y);if(p)return {k:'pad',t:p[2]};
    if(x===8&&y===5&&!solved)return {k:'tgt',o:{kind:'bank',ballOnly:1,hit:()=>{a.solved.concourse=true;persist();SND.fx('ok2');DG.flash=0}}};
    if(dgHas(this.glass,x,y)&&!(solved&&x===8&&y===6))return {k:'tall',glass:1};
    return null},
  pickup(x,y){const a=dgS();if(x===8&&y===5&&a.solved.concourse&&!a.got.k2){dgGiveCard('k2');return true}return false}};

DGR.dgl={home:[10,5,'l'],
  init(){return {}},
  doors(){return [{tile:[5,1],to:'dge',at:[5,2,'d'],open:()=>true,drop:1},{tile:[6,1],to:'dge',at:[6,2,'d'],open:()=>true,drop:1},{tile:[11,5],to:'dgc',at:[1,5,'r'],open:()=>true}]},
  cls(x,y){if((x===5||x===6)&&y===3&&dgLightUp('cyan'))return {k:'tall',lights:'cyan'};
    if(x===3&&y===7&&dgLightUp('pink'))return {k:'tall',lights:'pink'};return null},
  pickup(x,y){if(x===1&&y===7&&!dgS().got.k1){dgGiveCard('k1');return true}return false},
  enter(){dgTaunt('dgl','MO: Every runner hits my wall.')}};

DGR.dge={home:[5,2,'d'],key:'cage',
  rail:[[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7]],
  init(){return {open:!!dgS().ball,t0:DG.t}},
  doors(){const a=dgS();return [{tile:[11,6],to:'dgc',at:[1,8,'r'],open:()=>!!a.solved.cage}]},
  cls(x,y,st){if(x===4&&y===4)return {k:'tgt',o:{kind:'press',hit:()=>{if(!st.open){st.open=true;SND.fx('open')}else SND.fx('blip')}}};
    if(x===2&&y===4)return {k:'obj',o:'cage'};if(dgHas(this.rail,x,y))return {k:'rail'};return null},
  bump(x,y,st){if(x===2&&y===4){if(!st.open){owSay('',['A locked cage. A tag reads VOSS 22.']);return true}if(!dgS().ball){dgGetBall();return true}owSay('',['The cage is empty now.']);return true}return false},
  movers(st){if(dgS().solved.cage)return [];const T=8/2.5,u=((DG.t-st.t0)%(2*T))/T,x=u<=1?2+u*8:2+(2-u)*8;
    return [{x,y:8,o:{kind:'moving',hit:()=>{dgS().solved.cage=true;persist();SND.fx('ok2')}}}]}};

DGR.dgg={home:[5,9,'u'],key:'gauntlet',safe:[[2,8],[3,8],[8,4],[9,4]],stops:[1,4,5,6,7,10],
  init(){return {on:!dgS().solved.gauntlet,hp:3,dhp:3,balls:[],warn:[],next:1.2,seq:7,dx:5.5,ph:'move',pt:0,from:5.5,to:5.5,green:0,si:0}},
  doors(st){return [{tile:[5,1],to:'dgt',at:[5,9,'u'],open:()=>!st.on},{tile:[6,1],to:'dgt',at:[6,9,'u'],open:()=>!st.on},{tile:[5,10],to:'dgc',at:[10,5,'l'],open:()=>true},{tile:[6,10],to:'dgc',at:[10,5,'l'],open:()=>true}]},
  cls(x,y,st){if(y===2&&(x===5||x===6)&&st.on)return {k:'tall',bar:1};return null},
  isSafe(x,y){return dgHas(this.safe,x,y)},
  // footballs fly across the whole room along rows (3-9) and columns (1-10), from all four walls; each lane blinks before it fires
  hz(st){if(!st.on)return [];const out=st.balls.map(b=>({k:'ball',x:b.x,y:b.y}));out.push({k:'drone',x:st.dx,y:2});return out},
  movers(st){if(!st.on)return [];return [{x:st.dx,y:2,o:{kind:'drone',hit:()=>dgDroneHit(st)}}]},
  enter(){}};
var DG_BALL_T=.4,DG_SPAWN=.42,DG_WARN=.7;
function dgRnd(st){st.seq=(Math.imul(st.seq,1103515245)+12345)>>>0;return (st.seq>>>8)/16777216}
function dgDroneStep(st,dt){if(!st.on)return;const R=DGR.dgg;st.pt+=dt;if(st.green>0)st.green-=dt;
  // balls: spawn after a warning blink, fly, leave
  st.next-=dt;if(st.next<=0){st.next=DG_SPAWN;const v=dgRnd(st)<.5,dir=dgRnd(st)<.5?1:-1,lane=v?1+Math.floor(dgRnd(st)*10):3+Math.floor(dgRnd(st)*7);st.warn.push({v,dir,lane,t:DG_WARN})}
  for(const w of st.warn){w.t-=dt;if(w.t<=0){const sp=1/DG_BALL_T;st.balls.push(w.v?{x:w.lane,y:w.dir>0?1.6:9.4,vx:0,vy:w.dir*sp}:{x:w.dir>0?.6:10.4,y:w.lane,vx:w.dir*sp,vy:0})}}
  st.warn=st.warn.filter(w=>w.t>0);for(const b of st.balls){b.x+=b.vx*dt;b.y+=b.vy*dt}st.balls=st.balls.filter(b=>b.x>.3&&b.x<10.7&&b.y>1.3&&b.y<9.7);
  // drone: patrols row 2, then glides to a column away from the safe spots and vents green
  if(st.ph==='move'){st.dx=5.5+4*Math.sin(st.pt*1.1);if(st.pt>3.2){st.ph='aim';st.pt=0;st.from=st.dx;st.to=R.stops[st.si++%R.stops.length]}}
  else if(st.ph==='aim'){st.dx=st.from+(st.to-st.from)*Math.min(1,st.pt/.6);if(st.pt>.6){st.ph='vent';st.pt=0;st.green=2.2;SND.fx('q')}}
  else if(st.ph==='vent'){if(st.pt>2.2){st.ph='move';st.pt=Math.asin(Math.max(-1,Math.min(1,(st.dx-5.5)/4)))/1.1;if(st.pt<0)st.pt+=Math.PI*2/1.1}}}
function dgDroneHit(st){if(st.green<=0){SND.fx('blip');dgPing(st.dx,2,'#9aa4b8');return}st.green=0;st.dhp--;SND.fx('ok');dgPing(st.dx,2,DGC.green);
  if(st.dhp<=0){st.on=false;st.balls=[];st.warn=[];const a=dgS();a.solved.gauntlet=true;persist();SND.fx('ok2')}else{st.ph='move';st.pt=0}}
DGR.dgt={home:[5,9,'u'],key:'court',cm:[3,3],tt:[1,4],gate:[6,6],start:[3,8],dock:[9,2],
  rail:[[1,6],[2,6],[3,6],[4,6],[5,6],[5,2],[5,3],[5,4],[5,5]],glass:[[7,6],[8,6]],
  isTrack(x,y){return x===9&&y>=3&&y<=9},
  init(){const a=dgS();return a.solved.court?{hb:[3,3],carry:false,ride:false,gate:0,u:[],done:true,t0:DG.t,ch:{on:false,x:8,y:8,d:'l',ph:0,cd:0,stun:0}}:{hb:[3,8],carry:false,ride:false,gate:0,u:[],done:false,t0:DG.t,ch:{on:false,x:8,y:8,d:'l',ph:0,cd:0,stun:0}}},
  doors(){return [{tile:[5,10],to:'dgg',at:[5,2,'d'],open:()=>true},{tile:[6,10],to:'dgg',at:[6,2,'d'],open:()=>true}]},
  // the receiver sled runs up and down column 9: bottom (y 9) to the top dock (y 3), pausing at each end
  sledY(st){const t=((DG.t-st.t0)%9.2+9.2)%9.2;return t<4?9-6*(t/4):t<4.6?3:t<8.6?3+6*((t-4.6)/4):9},
  cls(x,y,st){if(x===this.tt[0]&&y===this.tt[1])return {k:'tgt',o:{kind:'timed',ballOnly:1,hit:()=>{st.gate=3.0;SND.fx('ok')}}};
    if(x===this.gate[0]&&y===this.gate[1]&&!st.done&&(st.gate<=0||st.carry)&&!(st.hb&&st.hb[0]===x&&st.hb[1]===y)&&!(st.gate>0&&dgEli(x,y)))return {k:'tall',bar:1};
    if(this.isTrack(x,y))return {k:'track'};
    if(x===4&&y===3&&dgLightUp('pink'))return {k:'tall',lights:'pink'};
    if(dgHas(this.rail,x,y))return {k:'rail'};
    if(dgHas(this.glass,x,y))return {k:'tall',glass:1};
    if(!st.carry&&st.hb&&st.hb[0]===x&&st.hb[1]===y)return {k:'hb'};return null},
  bump(x,y,st){if(st.hb&&!st.carry&&st.hb[0]===x&&st.hb[1]===y){if(st.done){SND.fx('blip');return true}st.u.push(dgSnapT(st));st.carry=true;st.hb=null;SND.fx('pluck');if(st.ch&&!st.ch.on){st.ch.on=true;st.ch.stun=.35;SND.fx('err');owToast('BRICK HAYES: NOT ON MY COURT!')}return true}return false},
  enter(){dgTaunt('dgt','MO: Lights stay on in here.')}};
function dgSnapT(st){return {hb:st.hb?st.hb.slice():null,carry:st.carry,ride:st.ride,ex:OW.x,ey:OW.y,ed:OW.d}}
function dgFreeNear(st,list){for(const [x,y] of list)if(!dgEli(x,y)&&!owNpcAt(x,y))return [x,y];return list[0]}
function dgHeavyLand(st,x,y){const R=DGR.dgt;st.carry=false;
  if(R.isTrack(x,y)){if(Math.abs(R.sledY(st)-y)<.6){st.ride=true;st.hb=null;SND.fx('ok');dgPing(x,y,DGC.green);return}
    st.hb=dgFreeNear(st,[R.start,[2,8],[4,8]]);dgBuzz();dgPing(x,y,DGC.red);return}   // missed the sled: the ball goes back to the start
  st.hb=[x,y];if(x===R.cm[0]&&y===R.cm[1]&&!st.done){st.done=true;st.gate=0;if(st.ch)st.ch.on=false;DG.slow=0;const a=dgS();a.solved.court=true;a.pass=true;persist();setTimeout(()=>{SND.fx('ok2');owToast("GOT  MO'S PASS")},350)}else SND.fx('drop')}
function dgHeavyThrow(){const st=DG.st.dgt,R=DGR.dgt;if(!st||!st.carry||DG.hfly)return;const [dx,dy]=DG_DIRS[OW.d];let land=null;
  for(let i=1;i<=3;i++){const x=OW.x+dx*i,y=OW.y+dy*i;if(x<1||y<2||x>10||y>9)break;
    if(R.isTrack(x,y)){land=[x,y];break}
    if(x===R.gate[0]&&y===R.gate[1])break;   // the gate scanner won't pass the game ball
    const c=R.cls(x,y,{...st,carry:false});if(M.solid[y*M.w+x]||(c&&c.k!=='rail'))break;if(!(c&&c.k==='rail'))land=[x,y]}
  if(!land){dgBuzz();return}st.u.push(dgSnapT(st));DG.hfly={x0:OW.x,y0:OW.y,x1:land[0],y1:land[1],t:0};st.carry=false;SND.fx('pluck')}
function dgHeavyPut(){const st=DG.st.dgt,R=DGR.dgt;if(!st||!st.carry)return false;const [dx,dy]=DG_DIRS[OW.d],x=OW.x+dx,y=OW.y+dy;
  if(x<1||y<2||x>10||y>9||M.solid[y*M.w+x]||R.cls(x,y,{...st,carry:false})||owNpcAt(x,y)){dgBuzz();return true}st.u.push(dgSnapT(st));dgHeavyLand(st,x,y);return true}
function dgSledStep(st){if(!st.ride)return;const R=DGR.dgt;if(R.sledY(st)<=3.02){st.ride=false;st.hb=dgFreeNear(st,[R.dock,[10,2]]);SND.fx('drop')}}
function dgChaserWalkable(st,x,y){
  if(x<1||x>10||y<2||y>9)return false;
  const R=DGR.dgt;
  if(R.isTrack(x,y)||dgHas(R.rail,x,y)||dgHas(R.glass,x,y))return false;
  if(x===4&&y===3&&dgLightUp('pink'))return false;
  if(x===R.gate[0]&&y===R.gate[1]&&!st.done&&st.gate<=0)return false;
  return true;
}
function dgChaserStep(st,dt){
  if(DG.slow>0)DG.slow=Math.max(0,DG.slow-dt);
  const ch=st.ch;if(!ch||!ch.on||st.done)return;
  if(ch.cd>0)ch.cd=Math.max(0,ch.cd-dt);
  if(ch.stun>0){ch.stun=Math.max(0,ch.stun-dt);return}
  // Never stay stuck on a tile that became non-walkable (e.g. timed gate closing)
  const rx=Math.round(ch.x),ry=Math.round(ch.y);
  if(!dgChaserWalkable(st,rx,ry)){
    for(const [dx,dy] of [[0,1],[0,-1],[1,0],[-1,0]]){if(dgChaserWalkable(st,rx+dx,ry+dy)){ch.x=ch.tx=rx+dx;ch.y=ch.ty=ry+dy;break}}
  }
  // Check tackle contact with Eli (strict 3.0s cooldown before he can tackle again)
  const dxE=OW.px-ch.x,dyE=OW.py-ch.y,distE=Math.hypot(dxE,dyE);
  if(distE<.56&&ch.cd<=0){
    DG.slow=2.0;ch.cd=3.0;ch.stun=1.0;ch.tx=rx;ch.ty=ry;DG.flash=.45;
    SND.fx('err');try{SND.fx('hit')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
    dgPing(OW.px,OW.py,DGC.red);owToast('TACKLED! SLOWED 2s');return;
  }
  // Strictly orthogonal tile-to-tile movement so he can NEVER cut across walls, rails, glass, or closed gates
  if(ch.tx===undefined||!dgChaserWalkable(st,ch.tx,ch.ty)){ch.tx=rx;ch.ty=ry}
  const atTile=Math.hypot(ch.tx-ch.x,ch.ty-ch.y)<.05;
  if(atTile){
    ch.x=ch.tx;ch.y=ch.ty;
    const sx=ch.x,sy=ch.y,gx=Math.round(OW.px),gy=Math.round(OW.py);
    if(sx!==gx||sy!==gy){
      const q=[[sx,sy]],par=new Map();par.set(sx+','+sy,null);
      let best=null,bd=1e9,found=false;
      while(q.length){
        const [cx,cy]=q.shift(),d=Math.hypot(cx-gx,cy-gy);
        if(d<bd){bd=d;best=[cx,cy]}
        if(cx===gx&&cy===gy){found=true;break}
        for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
          const nx=cx+dx,ny=cy+dy,kk=nx+','+ny;
          if(par.has(kk)||!dgChaserWalkable(st,nx,ny))continue;
          par.set(kk,[cx,cy]);q.push([nx,ny]);
        }
      }
      let cur=found?[gx,gy]:best;
      if(cur&&(cur[0]!==sx||cur[1]!==sy)){
        while(cur){const p=par.get(cur[0]+','+cur[1]);if(!p||(p[0]===sx&&p[1]===sy))break;cur=p}
        if(cur&&dgChaserWalkable(st,cur[0],cur[1])){
          const nd=cur[0]>sx?'r':cur[0]<sx?'l':cur[1]>sy?'d':'u';
          if(ch.d&&nd!==ch.d){ch.d=nd;ch.stun=.10;return}   // brief human cut-back delay on turns
          ch.tx=cur[0];ch.ty=cur[1];ch.d=nd;
        }
      }
    }
  }
  const vx=ch.tx-ch.x,vy=ch.ty-ch.y,len=Math.hypot(vx,vy);
  if(len>.01){
    const sp=2.55,step=Math.min(len,sp*dt);
    const nx=ch.x+vx/len*step,ny=ch.y+vy/len*step;
    if(dgChaserWalkable(st,Math.round(nx),Math.round(ny))){ch.x=nx;ch.y=ny;ch.ph+=dt*2.8}
    else{ch.tx=rx;ch.ty=ry}
  }
}
DGR.dgv={home:[1,5,'r'],key:'vault',
  rail:[[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,4],[9,5],[9,6],[9,7]],
  init(){return {n:0,t0:DG.t,open:!!dgS().solved.vault}},
  doors(){return [{tile:[0,5],to:'dgc',at:[10,8,'l'],open:()=>true}]},
  tg(st,id){return {kind:'order',ballOnly:1,id,col:['','#ff3b5c','#3b7bff','#ffd23a'][id],hit:()=>dgOrder(st,id)}},
  cls(x,y,st){if(!st.open&&x===7&&y===2)return {k:'tgt',o:this.tg(st,1)};if(!st.open&&x===3&&y===2)return {k:'tgt',o:this.tg(st,3)};
    if(x===3&&y===6)return {k:'obj',o:'chest'};if(dgHas(this.rail,x,y))return {k:'rail'};return null},
  movers(st){if(st.open)return [];const T=3/1.6,u=((DG.t-st.t0)%(2*T))/T,y=u<=1?4+u*3:4+(2-u)*3;return [{x:10,y,o:this.tg(st,2)}]},
  bump(x,y,st){if(x===3&&y===6){const a=dgS();if(!st.open){owSay('',['A steel chest. Locked.']);return true}
      if(a.map){owSay('',['Empty now.']);return true}
      const lines=[];if(!a.loot){a.loot=true;SAVE.upPts=(SAVE.upPts||0)+2;lines.push('★ +2 UPGRADE POINTS')}a.map=true;persist();owHud();lines.push('★ GOT: DUNGEON MAP (in MENU)');
      owSay('',['Spare tape, a stopwatch, a folded map.'].concat(lines),()=>owToast('GOT  DUNGEON MAP'));return true}return false}};
function dgOrder(st,id){if(st.open)return;if(id===st.n+1){st.n=id;SND.fx('ok');if(st.n===3){st.open=true;dgS().solved.vault=true;persist();SND.fx('ok2')}}else{st.n=0;dgBuzz()}}

/* ---- ARENA LIGHTS ---- */
function dgLights(){const a=dgS();a.lights=a.lights==='pink'?'cyan':'pink';persist();SND.fx('ok');DG.lightFx=.6}   // the only lights blocks are in rooms Eli is not in when he flips it

/* ---- the arena (Mo) ---- */
var DG_CAGE6=[12,7];
function dgArenaBlock(x,y){if(x===0&&y===7)return !dgS().tunnel;if(x===DG_CAGE6[0]&&y===DG_CAGE6[1]&&!dgS().ball)return true;return false}

/* ---- hooks ---- */
function dgSt(){const R=DGR[M.id];return DG.st[M.id]||(DG.st[M.id]=R.init())}
function dgDoorAt(R,st,x,y){return R.doors(st).find(d=>d.tile[0]===x&&d.tile[1]===y)}
function dgBlock(x,y){if(typeof DGR==='undefined'||!DGR||!M)return false;if(M.id==='arena')return dgArenaBlock(x,y);const R=DGR[M.id];if(!R)return false;const st=dgSt();
  const d=dgDoorAt(R,st,x,y);if(d)return !d.open(st)||!!d.oneway||(M.id==='dgt'&&!!st.carry);
  if(R.cls(x,y,st))return true;return false}
function dgBump(x,y){if(typeof DGR==='undefined'||!DGR||!M)return false;
  if(M.id==='arena'){if(x===DG_CAGE6[0]&&y===DG_CAGE6[1]&&!dgS().ball){dgGetBall();return true}return false}
  const R=DGR[M.id];if(!R)return false;const st=dgSt();
  if(R.bump&&R.bump(x,y,st))return true;
  const d=dgDoorAt(R,st,x,y);if(d&&!d.open(st)){const a=dgS();
    if(d.lock==='card'){if(a.cards>0){a.cards--;a.used[d.use]=true;persist();SND.fx('open');return true}SND.fx('err');owSay('DOOR',['Keycard lock.']);return true}
    if(d.lock==='pass'){if(a.pass){a.tunnel=true;a.bossAccess=true;persist();SND.fx('open');return true}SND.fx('err');owSay('TUNNEL',["Staff only. Needs MO'S PASS."]);return true}
    SND.fx('err');return true}
  const c=R.cls(x,y,st);if(c){if(c.k==='tgt'){if(c.o.ballOnly){SND.fx('blip');return true}c.o.hit();return true}if(c.lights||c.bar||c.gate||c.glass){SND.fx('err');return true}return true}
  return false}
function dgEnterArena(b){if(typeof DGR==='undefined'||!DGR)return false;if(b.id!=='arena'||dgDone())return false;dgGo('dg1',[6,7,'u']);return true}
function dgGo(to,at){DG.fly=null;DG.hfly=null;DG.slow=0;
  if(to==='street'){SND.fx('close');OW.ret=null;owPlace('street',15,10,'d',null);owHud();return}
  if(to==='arena'){SND.fx('open');owPlace('arena',1,7,'r',OW.ret);dgReachedMo();return}
  const R=DGR[to];DG.st[to]=R.init();DG.inv=0;SND.fx('open');owPlace(to,at[0],at[1],at[2],OW.ret);dgVisit(to);if(R.enter)R.enter();owHud()}
function dgReachedMo(){const a=dgS();dgVisit('arena');if(!a.cleared){a.cleared=true;a.shortcut=true;persist();setTimeout(()=>owToast('SHORTCUT OPEN  FRONT DOOR'),400)}}
function dgArrive(){if(typeof DGR==='undefined'||!DGR||!M)return false;
  if(M.id==='arena'){if(OW.x===0&&OW.y===7){owClearIn();dgGo('dgc',[5,2,'d']);return true}return false}
  const R=DGR[M.id];if(!R)return false;const st=dgSt();
  const d=dgDoorAt(R,st,OW.x,OW.y);if(d&&d.to){owClearIn();if(d.drop)SND.fx('drop');dgGo(d.to,d.at||[OW.x,OW.y,OW.d]);return true}
  if(R.pickup&&R.pickup(OW.x,OW.y))return true;
  return false}
function dgOnShow(){if(typeof DGR==='undefined'||!DGR)return;try{dgS()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}if(!M||!DGR[M.id])return;if(!DG.st[M.id]){const R=DGR[M.id];DG.st[M.id]=R.init();OW.x=OW.px=R.home[0];OW.y=OW.py=R.home[1];OW.d=R.home[2];OW.mv=false}}
function dgRoomUnsolved(){const R=M&&DGR[M.id];if(!R||!R.key||R.key==='concourse')return false;return !dgS().solved[R.key]}
function dgReset(){const R=DGR[M.id];if(!R||!dgRoomUnsolved())return;DG.st[M.id]=R.init();DG.fly=null;DG.hfly=null;DG.inv=0;DG.slow=0;
  OW.mv=false;OW.x=OW.px=R.home[0];OW.y=OW.py=R.home[1];OW.d=R.home[2];owClearIn();owSave();SND.fx('back');DG.flash=.35}
function dgAskReset(){if(!dgRoomUnsolved()||OW.busy)return;owAsk('RESET ROOM','Put this room back to how it started?',[['RESET',()=>dgReset()],['CANCEL']])}
function dgUndo(){const st=DG.st.dgt;if(M.id!=='dgt'||!st||st.done||!st.u.length||OW.busy||OW.mv||DG.hfly)return;const s=st.u.pop();st.hb=s.hb;st.carry=s.carry;st.ride=!!s.ride;OW.x=OW.px=s.ex;OW.y=OW.py=s.ey;OW.d=s.ed;owClearIn();SND.fx('back')}
function dgGetBall(){const a=dgS();if(a.ball)return;a.ball=true;persist();SND.fx('ok2');
  owSay('',['A worn ball. 22 in marker.','Wrapped in a page of his playbook.','Green grid paper. Routes in pencil.'],()=>owSay('ELI',['...Dante.'],()=>owSay('',['★ GOT: DANTE\'S BALL'],()=>owToast('GOT  DANTE\'S BALL'))))}

/* A while carrying the heavy ball puts it down in front of Eli */
var DG_owI=owInteract;owInteract=function(){if(!OW.busy&&M&&M.id==='dgt'&&DG.st.dgt&&DG.st.dgt.carry){dgHeavyPut();return}return DG_owI.apply(this,arguments)};
/* ---- THROW: the ball flies in real time; pads turn it; it stops at walls; moving things are checked every frame ---- */
function dgCanThrow(){return !!(M&&DGR[M.id]&&M.id!=='dg1'&&(dgS().ball||(M.id==='dgt'&&DG.st.dgt&&DG.st.dgt.carry)))}
function dgThrow(){if(!dgCanThrow()||OW.busy||OW.mv||DG.fly||DG.hfly)return;if(M.id==='dgt'&&DG.st.dgt&&DG.st.dgt.carry){dgHeavyThrow();return}
  const [dx,dy]=DG_DIRS[OW.d];DG.fly={tx:OW.x,ty:OW.y,dx,dy,f:0,n:0,back:0,bx:0,by:0};SND.fx('pluck')}
function dgFlyEnd(f){f.back=.001;f.bx=f.tx+f.dx*f.f;f.by=f.ty+f.dy*f.f}
function dgFlyStep(dt){const f=DG.fly;if(!f)return;
  if(f.back){f.back+=dt;if(f.back>=.22)DG.fly=null;return}
  const R=DGR[M.id],st=dgSt();let rem=dt*DG_BALL_SP;
  while(rem>0&&!f.back){const step=Math.min(rem,1-f.f);f.f+=step;rem-=step;
    // moving things (checked at the current float position)
    const px=f.tx+f.dx*f.f,py=f.ty+f.dy*f.f;for(const m of (R.movers?R.movers(st):[]))if(Math.abs(m.x-px)<.55&&Math.abs(m.y-py)<.55){m.o.hit();dgPing(m.x,m.y);dgFlyEnd(f);break}
    if(f.back)break;
    if(f.f>=1){const x=f.tx+f.dx,y=f.ty+f.dy;f.n++;
      if(x<0||y<0||x>=M.w||y>=M.h||M.solid[y*M.w+x]||dgDoorAt(R,st,x,y)||owNpcAt(x,y)){f.f=.35;dgFlyEnd(f);SND.fx('drop');break}
      const c=R.cls(x,y,st);
      if(c&&c.k==='tgt'){f.tx=x;f.ty=y;f.f=0;c.o.hit();dgPing(x,y);dgFlyEnd(f);break}
      if(c&&c.k==='pad'){f.tx=x;f.ty=y;f.f=0;const [a,b]=[f.dx,f.dy];if(c.t==='/'){f.dx=-b;f.dy=-a}else{f.dx=b;f.dy=a}SND.fx('tick');}
      else if(c&&c.k!=='rail'){f.f=.35;dgFlyEnd(f);SND.fx('drop');break}
      else{f.tx=x;f.ty=y;f.f=0}
      if(f.n>=DG_BALL_MAX){dgFlyEnd(f);break}}}}
function dgHflyStep(dt){const h=DG.hfly;if(!h)return;h.t+=dt/.4;if(h.t>=1){DG.hfly=null;dgHeavyLand(DG.st.dgt,h.x1,h.y1)}}

/* ---- hazards and hits (Gauntlet) ---- */
function dgHazStep(dt){if(M.id!=='dgg')return;const R=DGR.dgg,st=dgSt();if(!st.on)return;dgDroneStep(st,dt);
  if(DG.inv>0){DG.inv-=dt;return}if(R.isSafe(Math.round(OW.px),Math.round(OW.py)))return;
  for(const h of R.hz(st)){if(Math.abs(h.x-OW.px)<.55&&Math.abs(h.y-OW.py)<.55){
    st.hp--;DG.flash=.4;SND.fx('err');try{SND.fx('hit')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
    if(st.hp<=0){DG.st.dgg=R.init();OW.mv=false;OW.x=OW.px=R.home[0];OW.y=OW.py=R.home[1];OW.d='u';owClearIn();owSave();DG.inv=1.5;return}
    DG.inv=1.2;return}}}

/* ---- buttons and HUD ---- */
function dgUI(){let w=document.getElementById('dgUI');if(w)return w;const host=document.getElementById('world');if(!host)return null;
  w=document.createElement('div');w.id='dgUI';host.appendChild(w);
  const st=document.createElement('style');st.textContent='#dgUI button{position:absolute;font-family:var(--disp);color:#fff;background:rgba(10,8,24,.82);z-index:5}#dgThrow{right:100px;bottom:calc(env(safe-area-inset-bottom,0px) + 44px);width:64px;height:64px;border-radius:50%;border:3px solid #ffd23a;font-size:13px;box-shadow:0 0 14px rgba(255,210,58,.5)}#dgReset,#dgUndo{left:12px;height:36px;padding:0 12px;border-radius:8px;border:2px solid #27e0ff;font-size:13px}#dgReset{top:calc(env(safe-area-inset-top,0px) + 120px)}#dgUndo{top:calc(env(safe-area-inset-top,0px) + 162px);border-color:#58ffb0}#dgMapBox{position:fixed;inset:0;z-index:80;background:rgba(5,4,12,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--disp);color:#fff}#dgMapBox canvas{width:340px;height:300px}#dgMapBox button{margin-top:14px;height:40px;padding:0 18px;border-radius:8px;border:2px solid #27e0ff;background:rgba(10,8,24,.9);color:#fff;font-family:var(--disp)}';document.head.appendChild(st);
  for(const [id,txt,fn] of [['dgThrow','THROW',dgThrow],['dgReset','RESET ROOM',dgAskReset],['dgUndo','UNDO',dgUndo]]){const b=document.createElement('button');b.id=id;b.textContent=txt;b.hidden=true;
    b.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();if(OW.busy&&id!=='dgThrow')return;fn()});w.appendChild(b)}
  return w}
function dgUISync(){const w=dgUI();if(!w)return;const inDg=!!(OWON&&M&&DGR[M.id]),a=dgS();
  const vis={dgThrow:inDg&&dgCanThrow(),dgReset:inDg&&dgRoomUnsolved(),dgUndo:inDg&&M.id==='dgt'&&dgRoomUnsolved()&&DG.st.dgt&&DG.st.dgt.u.length>0};
  for(const id in vis){const b=document.getElementById(id);if(b&&b.hidden===vis[id])b.hidden=!vis[id]}
  if(inDg&&M.id!=='dg1'){const o=document.getElementById('owObj'),t='KEYCARDS '+(a.cards||0)+(a.pass&&!a.tunnel?"  ·  MO'S PASS":'')+'  ·  '+(a.lights==='pink'?'PINK':'CYAN')+' LIGHTS';if(o&&o.textContent!==t)o.textContent=t}}
addEventListener('keydown',e=>{if(!OWON)return;const k=(e.key||'').toLowerCase();if(k==='t')dgThrow();else if(k==='u')dgUndo()});

/* ---- MAP (MENU) ---- */
var DG_MAPPOS={dg1:[2,4],dgc:[2,3],dgl:[1,3],dge:[1,2],dgg:[3,3],dgt:[4,3],dgv:[3,4],arena:[2,2]};
var DG_NAMES={dg1:'LOBBY',dgc:'CONCOURSE',dgl:'LOCKERS',dge:'EQUIPMENT',dgg:'GAUNTLET',dgt:'COURT',dgv:'VAULT',arena:'MO'};
function dgShowMap(){const a=dgS();let box=document.getElementById('dgMapBox');if(box)box.remove();dgUI();box=document.createElement('div');box.id='dgMapBox';
  box.innerHTML='<div style="font-size:20px;letter-spacing:.1em;margin-bottom:8px">NETRUNNERS ARENA</div><canvas width=680 height=600></canvas><div id=dgMapInfo style="margin-top:8px;font-size:14px"></div><button>CLOSE</button>';
  document.body.appendChild(box);box.querySelector('button').onclick=()=>box.remove();
  const g=box.querySelector('canvas').getContext('2d'),S=130,ox=-60,oy=-150,P=id=>[ox+DG_MAPPOS[id][0]*S,oy+DG_MAPPOS[id][1]*S];
  const links=[['dg1','dgc',null],['dgc','dgl',null],['dgl','dge','ONE-WAY'],['dge','dgc','ONE-WAY'],['dgc','dgg','KEY'],['dgg','dgt',null],['dgc','dgv','KEY'],['dgc','arena','PASS']];
  g.lineWidth=6;for(const [p,q,l] of links){if(!(a.visited[p]||a.map)||!(a.visited[q]||a.map))continue;const [x1,y1]=P(p),[x2,y2]=P(q);g.strokeStyle=l==='KEY'?DGC.gold:l==='PASS'?DGC.pink:l?'#9aa4b8':'#3a4a6a';g.beginPath();g.moveTo(x1+50,y1+40);g.lineTo(x2+50,y2+40);g.stroke();
    if(a.map&&l){const mx=(x1+x2)/2+50,my=(y1+y2)/2+40,col=l==='KEY'?DGC.gold:l==='PASS'?DGC.pink:'#9aa4b8';g.fillStyle='#05040c';g.beginPath();g.arc(mx,my,15,0,7);g.fill();g.strokeStyle=col;g.lineWidth=3;g.stroke();
      if(l==='ONE-WAY'){const ang=Math.atan2(y2-y1,x2-x1);g.fillStyle=col;g.beginPath();g.moveTo(mx+Math.cos(ang)*9,my+Math.sin(ang)*9);g.lineTo(mx+Math.cos(ang+2.4)*8,my+Math.sin(ang+2.4)*8);g.lineTo(mx+Math.cos(ang-2.4)*8,my+Math.sin(ang-2.4)*8);g.fill()}
      else{g.fillStyle=col;g.font='bold 16px sans-serif';g.textAlign='center';g.fillText(l==='KEY'?'K':'P',mx,my+6)}}}
  for(const id in DG_MAPPOS){const seen=a.visited[id]||id==='dg1';if(!seen&&!a.map)continue;const [x,y]=P(id);g.fillStyle=seen?'#1c1838':'#0c0a18';g.fillRect(x,y,100,80);g.strokeStyle=M&&M.id===id?DGC.green:seen?DGC.cyan:'#3a3450';g.lineWidth=M&&M.id===id?6:3;g.strokeRect(x,y,100,80);
    g.fillStyle=seen?'#fff':'#6a6480';g.font='bold 16px sans-serif';g.textAlign='center';g.fillText(DG_NAMES[id],x+50,y+46)}
  box.querySelector('#dgMapInfo').textContent='KEYCARDS '+(a.cards||0)+(a.pass?"  ·  MO'S PASS":'')+(a.map?'  ·  K = keycard door, P = pass, arrow = one-way':'  ·  (find the map to see the locks)')}
setTimeout(()=>{const ro=document.getElementById('mRO');if(!ro||document.getElementById('mDGMap'))return;const b=document.createElement('button');b.className='btn';b.id='mDGMap';b.textContent='DUNGEON MAP';
  b.onclick=()=>dgShowMap();ro.parentNode.appendChild(b);setInterval(()=>{const a=SAVE&&SAVE.dg&&SAVE.dg.arena;b.hidden=!(a&&a.visited&&Object.keys(a.visited).length)},1000)},60);

/* ---- drawing ---- */
function dgAnim(og,OT,tm){if(typeof DGR==='undefined'||!DGR)return;
  const now=performance.now(),dt=Math.min(.05,DG.last?(now-DG.last)/1000:0);DG.last=now;
  const live=OWON&&!OW.busy;if(live)DG.t+=dt;if(DG.flash>0)DG.flash-=dt;if(DG.shake>0)DG.shake-=dt;if(DG.lightFx>0)DG.lightFx-=dt;
  dgUISync();if(!M)return;
  if(M.id==='arena'){dgDrawArena(og,OT,tm);return}
  const R=DGR[M.id];if(!R)return;const st=dgSt(),a=dgS();
  if(live){dgFlyStep(dt);dgHflyStep(dt);dgHazStep(dt);if(M.id==='dgt'){if(st.gate>0)st.gate-=dt;dgSledStep(st);dgChaserStep(st,dt)}}
  // doors
  for(const d of R.doors(st)){const [x,y]=d.tile;if(x===5||x===6){if(y===1&&x===5)dgDrawDoor(og,OT,R.doors(st).find(q=>q.tile[0]===6&&q.tile[1]===1)?d.open(st):d.open(st),tm,d.lock,d.drop);continue}
    if(x===0||x===M.w-1)dgDrawSideDoor(og,OT,x,y,d.open(st)&&!d.oneway,d.lock,d.oneway)}
  if(M.id==='dg1')dgDrawLobby(og,OT,tm);
  for(const [x,y] of (R.rail||[]))dgDrawRail(og,OT,x,y);
  // tiles that the room classifies
  for(let y=2;y<M.h-1;y++)for(let x=1;x<M.w-1;x++){const c=R.cls(x,y,st);if(!c)continue;
    if(c.k==='pad')dgDrawPad(og,OT,x,y,c.t);
    else if(c.k==='tgt')dgDrawTarget(og,OT,x,y,c.o,st,tm);
    else if(c.lights)dgDrawBar(og,OT,x,y,{up:true,col:c.lights==='pink'?DGC.pink:DGC.cyan,pat:c.lights==='pink'?'stripe':'bars'},tm);
    else if(c.glass)dgDrawGlass(og,OT,x,y);
    else if(c.bar)dgDrawBar(og,OT,x,y,{up:true,col:M.id==='dgt'?DGC.green:DGC.gold,pat:'stripe'},tm);
    else if(c.k==='hb')dgDrawHeavy(og,OT,x,y,0)}
  // lowered lights blocks show as dotted floor
  if(M.id==='dgl'){if(!dgLightUp('cyan'))for(const x of [5,6])dgDrawBar(og,OT,x,3,{up:false,col:DGC.cyan},tm);if(!dgLightUp('pink'))dgDrawBar(og,OT,3,7,{up:false,col:DGC.pink},tm)}
  if(M.id==='dgc'){if(a.solved.concourse&&!a.got.k2)dgDrawCard(og,OT,8,5,tm)}
  if(M.id==='dgl'&&!a.got.k1)dgDrawCard(og,OT,1,7,tm);
  if(M.id==='dge'){dgDrawCage(og,OT,2,4,st.open,!a.ball,true)}
  if(M.id==='dgg')dgDrawGauntlet(og,OT,st,tm);
  if(M.id==='dgt')dgDrawCourt(og,OT,st,tm);
  if(M.id==='dgv')dgDrawVault(og,OT,st,tm);
  if(R.movers)for(const m of R.movers(st))if(m.o.kind!=='drone')dgDrawTarget(og,OT,m.x,m.y,m.o,st,tm,true);
  if(DG.fly)dgDrawBall(og,OT,DG.fly);
  if(DG.hfly){const h=DG.hfly,x=h.x0+(h.x1-h.x0)*h.t,y=h.y0+(h.y1-h.y0)*h.t-Math.sin(h.t*Math.PI)*.9;dgDrawHeavy(og,OT,x,y,1)}
  if(M.id==='dgt'&&st.carry)dgDrawHeavy(og,OT,OW.px,OW.py-.75,1);
  if(DG.pings)for(const p of DG.pings){p.t-=dt;og.strokeStyle=p.c;og.globalAlpha=Math.max(0,p.t*2);og.lineWidth=3;og.beginPath();og.arc(p.x*OT+OT/2,p.y*OT+OT/2,OT*(.3+(.5-p.t)*1.2),0,7);og.stroke();og.globalAlpha=1}
  if(DG.pings)DG.pings=DG.pings.filter(p=>p.t>0);
  if(DG.flash>0){og.fillStyle='rgba(255,59,92,'+(DG.flash*.5)+')';og.fillRect(OW.px*OT-OT*.2,OW.py*OT-OT*.6,OT*1.4,OT*1.6)}
  if(DG.inv>0&&Math.floor(DG.inv*12)%2===0){og.strokeStyle='rgba(255,255,255,.7)';og.lineWidth=2;og.beginPath();og.ellipse(OW.px*OT+OT/2,OW.py*OT+OT*.5,OT*.5,OT*.6,0,0,7);og.stroke()}
  if(M.id==='dgg'&&st.on){for(let i=0;i<3;i++){og.fillStyle=i<st.hp?DGC.red:'rgba(255,255,255,.18)';og.beginPath();og.arc(OW.px*OT+OT/2+(i-1)*OT*.28,OW.py*OT-OT*.55,OT*.1,0,7);og.fill()}}
  if(DG.lightFx>0){og.fillStyle=(a.lights==='pink'?'rgba(255,47,168,':'rgba(39,224,255,')+(DG.lightFx*.25)+')';og.fillRect(0,0,M.w*OT,M.h*OT)}
}
function dgDrawDoor(og,OT,open,tm,lock,drop){const X=5*OT+3,Y=OT*1.08,W=2*OT-6,H=OT*.92;
  og.fillStyle='#04030a';og.fillRect(X,Y,W,H);og.lineWidth=3;og.strokeStyle=open?(drop?DGC.gold:DGC.green):lock==='pass'?DGC.pink:DGC.red;og.shadowColor=og.strokeStyle;og.shadowBlur=8;og.strokeRect(X,Y,W,H);og.shadowBlur=0;
  const cx=X+W/2;
  if(open){og.fillStyle=drop?'rgba(255,210,58,.14)':'rgba(88,255,176,.16)';og.fillRect(X,Y,W,H);og.fillStyle=drop?DGC.gold:DGC.green;
    if(drop){og.fillRect(cx-10,Y+H*.3,20,4);og.fillRect(cx-6,Y+H*.5,12,4);og.fillRect(cx-2,Y+H*.7,4,4)}
    else for(let i=0;i<2;i++){const yy=Y+H*(.62-i*.3)-((tm*1.5)%1)*4;og.beginPath();og.moveTo(cx-9,yy+6);og.lineTo(cx,yy-3);og.lineTo(cx+9,yy+6);og.lineTo(cx+6,yy+8);og.lineTo(cx,yy+2);og.lineTo(cx-6,yy+8);og.fill()}}
  else{og.fillStyle='#1a1430';og.fillRect(X+3,Y+3,W-6,H-6);og.fillStyle=lock==='pass'?'rgba(255,47,168,.55)':'rgba(255,59,92,.55)';for(let i=1;i<4;i++)og.fillRect(X+3,Y+H*i/4,W-6,2);
    if(lock==='pass'){og.fillStyle=DGC.pink;og.font='bold '+Math.round(OT*.26)+'px sans-serif';og.textAlign='center';og.fillText('PASS',cx,Y+H*.66);og.textAlign='left'}
    else{const cy=Y+H*.55;og.fillStyle=DGC.red;og.fillRect(cx-6,cy-2,12,9);og.strokeStyle=DGC.red;og.lineWidth=2;og.beginPath();og.arc(cx,cy-3,4,Math.PI,0);og.stroke()}}}
function dgDrawSideDoor(og,OT,x,y,open,lock,oneway){const X=x*OT+(x===0?2:OT*.12),Y=y*OT+3,W=OT*.86,H=OT-6;og.fillStyle='#04030a';og.fillRect(X,Y,W,H);
  og.strokeStyle=oneway?'#9aa4b8':open?DGC.green:lock==='card'?DGC.gold:DGC.red;og.lineWidth=3;og.strokeRect(X,Y,W,H);
  if(open){og.fillStyle='rgba(88,255,176,.16)';og.fillRect(X,Y,W,H)}
  else if(oneway){og.fillStyle='#9aa4b8';og.beginPath();const cx=X+W/2,cy=Y+H/2,s=x===0?1:-1;og.moveTo(cx+s*8,cy);og.lineTo(cx-s*4,cy-7);og.lineTo(cx-s*4,cy+7);og.fill()}
  else if(lock==='card'){og.fillStyle=DGC.gold;og.fillRect(X+W*.25,Y+H*.3,W*.5,H*.4);og.fillStyle='#04030a';og.fillRect(X+W*.25,Y+H*.38,W*.5,3)}}
function dgDrawLobby(og,OT,tm){const P=[[2,'cats','#9b5cff'],[3,'kings','#f2b632'],[4,'rollers','#2fa88a']];
  for(const [x,id,col] of P){const done=(SAVE.beaten||[]).includes(id),X=x*OT,Y=OT*1.12;og.fillStyle='#07050f';og.fillRect(X+3,Y,OT-6,OT*.75);
    og.strokeStyle=col;og.lineWidth=2;og.strokeRect(X+3,Y,OT-6,OT*.75);og.fillStyle=done?col:'rgba(255,255,255,.12)';og.fillRect(X+6,Y+3,OT-12,OT*.75-6);
    og.strokeStyle=done?'#05040c':DGC.red;og.lineWidth=3;og.beginPath();const cx=X+OT/2,cy=Y+OT*.38;
    if(done){og.moveTo(cx-7,cy);og.lineTo(cx-2,cy+5);og.lineTo(cx+8,cy-6)}else{og.rect(cx-6,cy-2,12,9);og.moveTo(cx-4,cy-2);og.arc(cx,cy-3,4,Math.PI,0)}og.stroke()}
  const open=dgCrews();for(const x of [5,6]){const X=x*OT,Y=2*OT;if(open){og.fillStyle='rgba(88,255,176,.14)';og.fillRect(X,Y,OT,OT);og.fillStyle=DGC.green;og.fillRect(X+4,Y+OT*.45,OT*.18,4);og.fillRect(X+OT-4-OT*.18,Y+OT*.45,OT*.18,4)}
    else{og.fillStyle='#2a2448';og.fillRect(X+3,Y+OT*.25,OT-6,OT*.6);og.fillStyle=DGC.red;for(let i=0;i<3;i++)og.fillRect(X+5,Y+OT*(.32+i*.17),OT-10,3)}}}
function dgDrawRail(og,OT,x,y){const X=x*OT,Y=y*OT;og.fillStyle='rgba(0,0,0,.35)';og.fillRect(X+3,Y+OT*.62,OT-6,OT*.2);og.fillStyle='#c8d4e0';og.fillRect(X,Y+OT*.42,OT,4);og.fillRect(X+OT*.15,Y+OT*.42,4,OT*.4);og.fillRect(X+OT*.8,Y+OT*.42,4,OT*.4)}
function dgDrawGlass(og,OT,x,y){const X=x*OT,Y=y*OT;og.fillStyle='rgba(159,246,255,.16)';og.fillRect(X+2,Y+2,OT-4,OT-4);og.strokeStyle='rgba(159,246,255,.75)';og.lineWidth=2;og.strokeRect(X+2,Y+2,OT-4,OT-4);og.strokeStyle='rgba(255,255,255,.5)';og.beginPath();og.moveTo(X+6,Y+OT*.6);og.lineTo(X+OT*.4,Y+6);og.stroke()}
function dgDrawPad(og,OT,x,y,t){const X=x*OT,Y=y*OT;og.fillStyle='#1c1838';og.fillRect(X+3,Y+3,OT-6,OT-6);og.strokeStyle=DGC.gold;og.lineWidth=5;og.shadowColor=DGC.gold;og.shadowBlur=8;og.beginPath();
  if(t==='/'){og.moveTo(X+6,Y+OT-6);og.lineTo(X+OT-6,Y+6)}else{og.moveTo(X+6,Y+6);og.lineTo(X+OT-6,Y+OT-6)}og.stroke();og.shadowBlur=0}
function dgDrawBar(og,OT,x,y,b,tm){const X=x*OT,Y=y*OT;
  if(b.up){og.fillStyle='rgba(0,0,0,.45)';og.fillRect(X+2,Y+OT*.7,OT-4,OT*.3);og.fillStyle='#14102a';og.fillRect(X+2,Y+OT*.05,OT-4,OT*.8);og.save();og.beginPath();og.rect(X+2,Y+OT*.05,OT-4,OT*.8);og.clip();og.fillStyle=b.col;
    if(b.pat==='stripe'){for(let i=-2;i<4;i++){og.beginPath();og.moveTo(X+i*OT*.34,Y+OT*.85);og.lineTo(X+i*OT*.34+OT*.17,Y+OT*.85);og.lineTo(X+i*OT*.34+OT*.17+OT*.8,Y);og.lineTo(X+i*OT*.34+OT*.8,Y);og.fill()}}
    else{for(let i=0;i<3;i++)og.fillRect(X+2,Y+OT*(.15+i*.25),OT-4,OT*.1)}
    og.restore();og.strokeStyle=b.col;og.lineWidth=2;og.shadowColor=b.col;og.shadowBlur=8;og.strokeRect(X+2,Y+OT*.05,OT-4,OT*.8);og.shadowBlur=0}
  else{og.strokeStyle=b.col;og.globalAlpha=.6;og.lineWidth=1.5;og.strokeRect(X+4,Y+4,OT-8,OT-8);og.fillStyle=b.col;for(let i=0;i<3;i++)for(let j=0;j<3;j++){og.beginPath();og.arc(X+OT*(.28+i*.22),Y+OT*(.28+j*.22),1.6,0,7);og.fill()}og.globalAlpha=1}}
function dgDrawTarget(og,OT,x,y,o,st,tm,moving){const X=x*OT,Y=y*OT,cx=X+OT/2,cy=Y+OT/2;
  if(o.kind==='lights'){const a=dgS(),col=a.lights==='pink'?DGC.pink:DGC.cyan;og.fillStyle='#1c1838';og.fillRect(X+4,Y+4,OT-8,OT-8);og.strokeStyle=col;og.lineWidth=3;og.shadowColor=col;og.shadowBlur=10;og.strokeRect(X+4,Y+4,OT-8,OT-8);og.shadowBlur=0;
    og.fillStyle=DGC.pink;og.fillRect(X+8,Y+8,(OT-16)/2,OT-16);og.fillStyle=DGC.cyan;og.fillRect(X+OT/2,Y+8,(OT-16)/2,OT-16);og.fillStyle='#05040c';og.fillRect(a.lights==='pink'?X+OT/2:X+8,Y+8,(OT-16)/2,OT-16);return}
  if(o.kind==='press'){og.fillStyle='#1c1838';og.fillRect(X+OT*.18,Y+OT*.2,OT*.64,OT*.64);og.strokeStyle=DGC.gold;og.lineWidth=2;og.strokeRect(X+OT*.18,Y+OT*.2,OT*.64,OT*.64);og.strokeStyle=DGC.gold;og.lineWidth=3;og.beginPath();og.arc(cx,cy,OT*.16,0,7);og.stroke();return}
  // ball targets: concentric rings; timed shows its clock; order shows its number
  const col=o.kind==='timed'?DGC.green:o.kind==='bank'?DGC.pink:DGC.cyan;
  og.fillStyle='rgba(0,0,0,.4)';og.beginPath();og.ellipse(cx,Y+OT*.88,OT*.3,OT*.08,0,0,7);og.fill();
  og.fillStyle='#f0e6d0';og.beginPath();og.arc(cx,cy,OT*.34,0,7);og.fill();og.fillStyle=col;og.beginPath();og.arc(cx,cy,OT*.25,0,7);og.fill();og.fillStyle='#f0e6d0';og.beginPath();og.arc(cx,cy,OT*.14,0,7);og.fill();og.fillStyle=col;og.beginPath();og.arc(cx,cy,OT*.06,0,7);og.fill();
  if(o.kind==='order'){const done=st&&st.n>=o.id;og.fillStyle='#05040c';og.beginPath();og.arc(cx,cy,OT*.36,0,7);og.fill();og.fillStyle=o.col;og.beginPath();og.arc(cx,cy,OT*.3,0,7);og.fill();og.fillStyle='#05040c';
    if(o.id===1){og.beginPath();og.arc(cx,cy,OT*.11,0,7);og.fill()}else if(o.id===2){og.fillRect(cx-OT*.1,cy-OT*.1,OT*.2,OT*.2)}else{og.beginPath();og.moveTo(cx,cy-OT*.13);og.lineTo(cx+OT*.12,cy+OT*.09);og.lineTo(cx-OT*.12,cy+OT*.09);og.fill()}
    if(done){og.strokeStyle=DGC.green;og.lineWidth=3;og.beginPath();og.arc(cx,cy,OT*.42,0,7);og.stroke()}return}
  if(o.kind==='timed'&&st&&st.gate>0){og.strokeStyle=DGC.green;og.lineWidth=3;og.beginPath();og.arc(cx,cy,OT*.42,-Math.PI/2,-Math.PI/2+Math.PI*2*(st.gate/3));og.stroke()}}
function dgDrawCard(og,OT,x,y,tm){const X=x*OT,Y=y*OT-Math.sin(tm*3)*3;og.fillStyle=DGC.gold;og.shadowColor=DGC.gold;og.shadowBlur=12;og.fillRect(X+OT*.22,Y+OT*.3,OT*.56,OT*.38);og.shadowBlur=0;og.fillStyle='#05040c';og.fillRect(X+OT*.22,Y+OT*.38,OT*.56,3)}
function dgDrawCage(og,OT,x,y,open,hasBall,tag){const X=x*OT,Y=y*OT;og.fillStyle='#0c0a18';og.fillRect(X+3,Y+OT*.08,OT-6,OT*.86);
  if(hasBall){og.fillStyle='#8a4a22';og.beginPath();og.ellipse(X+OT/2,Y+OT*.6,OT*.22,OT*.14,0,0,7);og.fill();og.strokeStyle='#f0e6d0';og.lineWidth=1.5;og.beginPath();og.moveTo(X+OT*.4,Y+OT*.6);og.lineTo(X+OT*.6,Y+OT*.6);og.stroke()}
  if(!open){og.strokeStyle='#9aa4b8';og.lineWidth=2;for(let i=0;i<5;i++){og.beginPath();og.moveTo(X+5+i*(OT-10)/4,Y+OT*.08);og.lineTo(X+5+i*(OT-10)/4,Y+OT*.94);og.stroke()}}
  else{og.strokeStyle=DGC.green;og.lineWidth=2;og.strokeRect(X+3,Y+OT*.08,OT-6,OT*.86)}
  if(tag){og.fillStyle=DGC.gold;og.font='bold '+Math.round(OT*.24)+'px sans-serif';og.textAlign='center';og.fillText('VOSS 22',X+OT/2,Y-OT*.05);og.textAlign='left'}}
function dgDrawBall(og,OT,f){let x,y;if(f.back){const u=Math.min(1,f.back/.22);x=f.bx+(OW.px-f.bx)*u;y=f.by+(OW.py-f.by)*u}else{x=f.tx+f.dx*f.f;y=f.ty+f.dy*f.f}
  const X=x*OT+OT/2,Y=y*OT+OT*.45;og.fillStyle='rgba(0,0,0,.35)';og.beginPath();og.ellipse(X,y*OT+OT*.8,OT*.14,OT*.05,0,0,7);og.fill();
  og.save();og.translate(X,Y);og.rotate(performance.now()/60);og.fillStyle='#8a4a22';og.beginPath();og.ellipse(0,0,OT*.17,OT*.11,0,0,7);og.fill();og.strokeStyle='#f0e6d0';og.lineWidth=1.5;og.beginPath();og.moveTo(-4,0);og.lineTo(4,0);og.stroke();og.restore()}
function dgDrawHeavy(og,OT,x,y,air){const X=x*OT+OT/2,Y=y*OT+OT*.5;if(!air){og.fillStyle='rgba(0,0,0,.45)';og.beginPath();og.ellipse(X,y*OT+OT*.85,OT*.34,OT*.1,0,0,7);og.fill()}
  og.fillStyle='#5a2e14';og.beginPath();og.ellipse(X,Y,OT*.36,OT*.24,0,0,7);og.fill();og.strokeStyle='#ffd23a';og.lineWidth=2;og.beginPath();og.ellipse(X,Y,OT*.36,OT*.24,0,0,7);og.stroke();og.strokeStyle='#f0e6d0';og.lineWidth=2;og.beginPath();og.moveTo(X-8,Y);og.lineTo(X+8,Y);for(let i=-6;i<=6;i+=4){og.moveTo(X+i,Y-3);og.lineTo(X+i,Y+3)}og.stroke()}
function dgDrawGauntlet(og,OT,st,tm){const R=DGR.dgg,on=st.on;
  for(const [x,y] of R.safe){og.fillStyle='rgba(88,255,176,'+(on?.22:.08)+')';og.fillRect(x*OT+2,y*OT+2,OT-4,OT-4);og.strokeStyle=DGC.green;og.lineWidth=2;og.setLineDash([5,4]);og.strokeRect(x*OT+3,y*OT+3,OT-6,OT-6);og.setLineDash([])}
  for(const [x0,y0] of [[2,8],[8,4]]){og.fillStyle=DGC.green;og.font='bold '+Math.round(OT*.2)+'px sans-serif';og.textAlign='center';og.fillText('SAFE',x0*OT+OT,y0*OT-OT*.08);og.textAlign='left'}
  if(!on){const X=st.dx*OT,Y=2*OT;og.fillStyle='#2a2448';og.fillRect(X+6,Y+OT*.5,OT-12,OT*.3);return}
  // lane warnings: a red streak along the lane and a light on the wall it fires from
  for(const w of st.warn){const a=.15+.25*(1-w.t/DG_WARN);og.fillStyle='rgba(255,59,92,'+a+')';
    if(w.v){og.fillRect(w.lane*OT+OT*.42,2*OT,OT*.16,OT*8);og.fillStyle=DGC.red;og.fillRect(w.lane*OT+OT*.25,w.dir>0?OT*1.7:OT*9.85,OT*.5,OT*.18)}
    else{og.fillRect(OT,w.lane*OT+OT*.42,OT*10,OT*.16);og.fillStyle=DGC.red;og.fillRect(w.dir>0?OT*.7:OT*10.95,w.lane*OT+OT*.25,OT*.18,OT*.5)}}
  for(const b of st.balls){const X=b.x*OT,Y=b.y*OT,ang=Math.atan2(b.vy,b.vx);og.fillStyle='rgba(0,0,0,.35)';og.beginPath();og.ellipse(X+OT/2,Y+OT*.8,OT*.16,OT*.05,0,0,7);og.fill();
    og.save();og.translate(X+OT/2,Y+OT*.5);og.rotate(ang);og.fillStyle='#8a4a22';og.beginPath();og.ellipse(0,0,OT*.2,OT*.13,0,0,7);og.fill();og.strokeStyle='#f0e6d0';og.lineWidth=1.5;og.beginPath();og.moveTo(0,-4);og.lineTo(0,4);og.stroke();og.restore()}
  {const X=st.dx*OT,Y=2*OT,g=st.green>0,cy=Y+OT*.35+Math.sin(tm*5)*3;og.fillStyle='rgba(0,0,0,.35)';og.beginPath();og.ellipse(X+OT/2,Y+OT*1.1,OT*.36,OT*.1,0,0,7);og.fill();
    og.fillStyle='#2a2448';og.beginPath();og.ellipse(X+OT/2,cy,OT*.46,OT*.26,0,0,7);og.fill();og.strokeStyle=g?DGC.green:DGC.red;og.lineWidth=3;og.stroke();
    og.fillStyle=g?DGC.green:DGC.red;og.shadowColor=og.fillStyle;og.shadowBlur=g?18:10;og.beginPath();og.arc(X+OT/2,cy,OT*(g?.15:.11),0,7);og.fill();og.shadowBlur=0;
    if(g){og.strokeStyle='rgba(88,255,176,.35)';og.lineWidth=2;og.setLineDash([4,5]);og.beginPath();og.moveTo(X+OT/2,Y+OT);og.lineTo(X+OT/2,OT*10);og.stroke();og.setLineDash([])}
    for(let i=0;i<3;i++){og.fillStyle=i<st.dhp?DGC.gold:'rgba(255,255,255,.2)';og.fillRect(X+OT*(.2+i*.22),cy-OT*.48,OT*.16,4)}}}

function dgDrawCourt(og,OT,st,tm){const R=DGR.dgt,[cx,cy]=R.cm;og.strokeStyle='rgba(255,255,255,.35)';og.lineWidth=2;og.strokeRect(OT+4,2*OT+4,OT*10-8,OT*8-8);
  og.strokeStyle=st.done?DGC.green:'rgba(255,210,58,.85)';og.lineWidth=3;og.beginPath();og.arc(cx*OT+OT/2,cy*OT+OT/2,OT*.42,0,7);og.stroke();og.beginPath();og.moveTo(cx*OT+OT*.2,cy*OT+OT/2);og.lineTo(cx*OT+OT*.8,cy*OT+OT/2);og.moveTo(cx*OT+OT/2,cy*OT+OT*.2);og.lineTo(cx*OT+OT/2,cy*OT+OT*.8);og.stroke();
  if(!dgLightUp('pink'))dgDrawBar(og,OT,4,3,{up:false,col:DGC.pink},tm);
  for(const [x,y] of R.glass)dgDrawGlass(og,OT,x,y);
  // the sled track, the top dock, the sled (with the ball when it is riding)
  for(let y=3;y<=9;y++){og.fillStyle='#14102a';og.fillRect(9*OT+4,y*OT,OT-8,OT);og.fillStyle='#c8d4e0';og.fillRect(9*OT+6,y*OT,3,OT);og.fillRect(10*OT-9,y*OT,3,OT)}
  {const [dx,dy]=R.dock;og.strokeStyle=DGC.gold;og.lineWidth=2;og.setLineDash([4,3]);og.strokeRect(dx*OT+3,dy*OT+3,OT-6,OT-6);og.setLineDash([])}
  {const sy=R.sledY(st),X=9*OT,Y=sy*OT;og.fillStyle='rgba(0,0,0,.4)';og.fillRect(X+2,Y+OT*.78,OT-4,OT*.16);og.fillStyle=DGC.pink;og.fillRect(X+4,Y+OT*.12,OT-8,OT*.62);og.fillStyle='#14102a';og.fillRect(X+8,Y+OT*.22,OT-16,OT*.3);
    if(st.ride)dgDrawHeavy(og,OT,9,sy-.25,1)}
  const [gx,gy]=R.gate;if(!st.done&&st.gate>0){og.fillStyle='rgba(88,255,176,.25)';og.fillRect(gx*OT,gy*OT,OT,OT);og.fillStyle=DGC.green;og.fillRect(gx*OT,gy*OT+OT-4,OT*(st.gate/3),4)}
  else if(st.done){og.fillStyle='rgba(88,255,176,.14)';og.fillRect(gx*OT,gy*OT,OT,OT)}
  if(st.done){og.fillStyle=DGC.pink;og.font='bold '+Math.round(OT*.24)+'px sans-serif';og.textAlign='center';og.fillText('PASS',cx*OT+OT/2,cy*OT-OT*.25);og.textAlign='left'}
  // Netrunners crew member chaser (Brick Hayes) + active pursuit ring
  if(st.ch&&!st.done){
    const ch=st.ch,cap=CREWS.find(c=>c.id==='captain'),uni=cap?cap.uni:{jc:'#d6362f',jt:'#14110f',jn:'#ffc23d',pc:'#14110f',ps:'#ffc23d',hc:'#5a0f0c',hs:'#ffc23d',mask:'#ffc23d',sock:'#14110f',shoe:'#ffc23d'};
    if(!ch._look)ch._look=lookOf({name:'Brick Hayes',pos:'RB'});
    if(ch.on){
      const rx=ch.x*OT+OT/2,ry=ch.y*OT+OT*.88;
      const rCol=ch.cd>0?'#8892a8':DGC.red;og.save();og.strokeStyle=rCol;og.lineWidth=2.5;og.globalAlpha=ch.cd>0?.35:(.55+.3*Math.sin(tm*8));og.shadowColor=rCol;og.shadowBlur=ch.cd>0?0:10;
      og.beginPath();og.ellipse(rx,ry,OT*.44,OT*.16,0,0,7);og.stroke();og.restore();
    }
    owFig(ch.x,ch.y,ch.d,ch.on&&ch.stun<=0,uni,ch._look,22,ch.ph);
  }
  // 2-second tackle slowdown bar over Eli
  if(DG.slow>0){
    const ex=OW.px*OT+OT/2,ey=OW.py*OT;
    og.save();og.strokeStyle='#ff7a1a';og.lineWidth=2.5;og.globalAlpha=.75;og.beginPath();og.ellipse(ex,ey+OT*.88,OT*.46,OT*.18,0,0,7);og.stroke();
    og.fillStyle='rgba(10,8,24,.82)';og.fillRect(ex-OT*.45,ey-OT*.52,OT*.9,6);
    og.fillStyle='#ff3b5c';og.fillRect(ex-OT*.45,ey-OT*.52,OT*.9*(DG.slow/2),6);og.restore();
  }}
function dgDrawVault(og,OT,st,tm){const X=3*OT,Y=6*OT;og.fillStyle='#3a3020';og.fillRect(X+3,Y+OT*.25,OT-6,OT*.62);og.strokeStyle=st.open?DGC.green:DGC.gold;og.lineWidth=2;og.strokeRect(X+3,Y+OT*.25,OT-6,OT*.62);
  if(st.open&&!(dgS().map)){og.fillStyle='rgba(255,210,60,'+(.5+.4*Math.sin(tm*4))+')';og.beginPath();og.moveTo(X+OT/2,Y+OT*.2);og.lineTo(X+OT/2-6,Y);og.lineTo(X+OT/2+6,Y);og.fill()}}
function dgDrawArena(og,OT,tm){const a=dgS();
  if(!(SAVE.beaten||[]).includes('captain')){const mo=(M.npcs||[]).find(n=>n.id==='mo');if(mo){const cx=mo.x*OT+OT/2,cy=mo.y*OT+OT*.9,r=OT*(1.3+.12*Math.sin(tm*2.2));og.save();og.globalCompositeOperation='lighter';const g=og.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(255,47,168,.35)');g.addColorStop(.6,'rgba(39,224,255,.12)');g.addColorStop(1,'rgba(0,0,0,0)');og.fillStyle=g;og.beginPath();og.ellipse(cx,cy,r,r*.5,0,0,7);og.fill();og.restore()}}
  if(a.tunnel){const X=0,Y=7*OT;og.fillStyle='#04030a';og.fillRect(X,Y+2,OT*.9,OT-4);og.strokeStyle=DGC.green;og.lineWidth=2;og.strokeRect(X+1,Y+2,OT*.9,OT-4);og.fillStyle='rgba(88,255,176,.18)';og.fillRect(X,Y+2,OT*.9,OT-4)}
  if(!a.ball)dgDrawCage(og,OT,DG_CAGE6[0],DG_CAGE6[1],true,true,true)}

/* ---- TEST only ---- */
var DG_STASH='street_gridiron_v1_test_dungeon_stash';
function dgTestSetup(){try{if(!svGet(DG_STASH))svSet(DG_STASH,JSON.stringify(SAVE));
  SAVE.beaten=['cats','kings','rollers'];SAVE.dg={};dgS();DG.st={};DG.gateSeen=false;DG.taunt={};SAVE.ow={map:'street',x:15,y:11,d:'u',gates:0,ret:null};persist();owShow()}catch(e){console.error(e)}}
function dgTestRestore(){try{const raw=svGet(DG_STASH);if(!raw)return false;SAVE=JSON.parse(raw);DG.st={};try{localStorage.removeItem(DG_STASH)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}persist();return true}catch(e){console.error(e);return false}}
setTimeout(()=>{if(!window.CF_TEST)return;const back=document.getElementById('mPXback');if(!back||document.getElementById('mDG'))return;
  const c=document.createElement('button');c.className='btn';c.id='mDG';c.textContent='TEST: ARENA DUNGEON';c.onclick=()=>dgTestSetup();back.parentNode.insertBefore(c,back);
  const old=back.onclick;back.onclick=e=>{dgTestRestore();if(old)old(e)}},50);
setTimeout(()=>{if(!window.CF_TEST)return;const back=document.getElementById('mPXback');if(!back||document.getElementById('mKV'))return;   // v3.28T clip viewer
  const c=document.createElement('button');c.className='btn';c.id='mKV';c.textContent='TEST: CLIP VIEWER';c.onclick=()=>{try{CF3D.kkViewer.open();c.textContent='TEST: CLIP VIEWER'}catch(e){c.textContent='TEST: CLIP VIEWER ('+String(e&&e.message||e).slice(0,40)+')'}};back.parentNode.insertBefore(c,back)},60);
setInterval(()=>{const bl=document.getElementById('mBuild');if(!bl||!window.KKLIB)return;let e=document.getElementById('mKKF');if(!e){e=document.createElement('div');e.id='mKKF';e.className='note';e.style.cssText='margin-top:4px;font-size:12px;opacity:.75';bl.after(e)}const t=KKLIB.line();if(e.textContent!==t)e.textContent=t},700);   // v3.28T model files status
window.CFDG={DG,DGR,DG_ROOMS,dgS,dgThrow,dgUndo,dgReset,dgTestSetup,dgTestRestore,dgGo,dgDone,dgCrews,dgBlock,dgShowMap,mv:d=>owTryMove(d),act:()=>owInteract(),bl:(x,y)=>owBlocked(x,y),enter:id=>owEnter(OWB.find(b=>b.id===id)),persist:()=>persist(),hud:()=>$('#owObj').textContent,msg:()=>$('#owMsg').hidden?null:$('#owTxt').textContent,next:()=>owNext(),btns:()=>[...$('#owBtns').children].map(b=>b.textContent),click:t=>{const b=[...$('#owBtns').children].find(q=>q.textContent===t);if(b)b.click()}};   // test hook
/* ================= end v3.17B ARENA DUNGEON ================= */
/* ================= v3.30 BASIN DUNGEON (TOWN 2 — DRY DOCK 14) =================
   11 interconnected rooms across 2 floors (F2 Upper Gantry Deck: bd1-bd5; F1 Lower Dry Dock Floor: bd6-bd11)
   leading into HBI.hb_B01 (Captain Bram "The Wall" Kessler / Closers).
   Macro mechanic: Sluice Water Level (FLOODED / DRAINED).
   Signature Town 2 Item: Tug's Mooring Line (G / HOOK) — 6-tile orthogonal grapple (zip bollards, pull crates, stun Otto).
   Save: SAVE.dg.basin (v:1). Never mutates SAVE.beaten. Unsolved room state lives in memory only (BD.st). */

var BDK={v:1,hook:false,water:'flooded',craneDropped:false,keys:0,got:null,used:null,solved:null,visited:null,stairsOpen:false,map:false,pass:false,bossAccess:false,cleared:false,shortcut:false,loot:false};
function bdS(){
  if(!SAVE.dg||typeof SAVE.dg!=='object')SAVE.dg={};
  let b=SAVE.dg.basin;if(!b||typeof b!=='object')b=SAVE.dg.basin={};
  for(const k in BDK)if(b[k]===undefined)b[k]=(k==='solved'||k==='got'||k==='used'||k==='visited')?{}:BDK[k];
  for(const k of ['solved','got','used','visited'])if(!b[k]||typeof b[k]!=='object')b[k]={};
  if(b.water!=='flooded'&&b.water!=='drained')b.water='flooded';
  b.v=1;return b;
}
function bdCrews(){return ['baitdogs','longshore','gantry'].every(id=>(SAVE.beaten||[]).includes(id))}
function bdDone(){return bdS().cleared===true}
var BD={st:{},hookAnim:null,zip:null,gateSeen:false,taunt:{}};
var BDC={concrete:'#6A6F72',slate:'#3A4A55',rust:'#A9542F',water:'#5B93AD',waterHi:'#9FC6D8',brass:'#E8A33D',green:'#58FFB0',red:'#FF3B5C',chalk:'#EEF2F5'};
var BD_HOOK_MAX=6,BD_HOOK_SP=18;

/* ---- Room Shells (registered into HBI so Hale Harbor audio & industrial styling apply) ---- */
var BD_ROOMS={
  bd1:{hb:1,bd:1,fl:'concrete',floor:'#596066',wall:'#2E3B46',wl:'panel',acc:'#E8A33D',acc2:'#9FC6D8',w:12,h:9,title:'CAISSON GATEHOUSE',
    ex:[5,6],dgDoors:[[5,1],[6,1],[11,4]],
    props:[{x:1,y:2,k:'bench',s:1},{x:10,y:2,k:'icebin',s:1},{x:1,y:6,k:'flagbin',s:1},{x:10,y:6,k:'bench',s:1}],
    npcs:[{id:'bd_watch',civ:'guard',x:8,y:4,d:'d',name:'DOCK WATCHMAN',t:["Dry Dock 14. Bram locked the caisson after he towed Tug's boat inside.","Flood lifts the hull. Drain bares the floor.","Bram hid the master key where Tug built his name."]}]},
  bd2:{hb:1,bd:1,fl:'concrete',floor:'#4E575E',wall:'#2B3842',wl:'panel',acc:'#E8A33D',acc2:'#9FC6D8',w:14,h:11,title:'GANTRY OVERLOOK (F2)',
    ex:[6,7],dgDoors:[[6,1],[7,1],[0,5],[13,5],[13,3],[1,9]],
    props:[{x:1,y:2,k:'icebin',s:1},{x:12,y:9,k:'flagbin',s:1}],npcs:[]},
  bd3:{hb:1,bd:1,fl:'concrete',floor:'#545C62',wall:'#2E3B46',wl:'panel',acc:'#E8A33D',acc2:'#9FC6D8',w:13,h:9,title:'SIGNAL BRIDGE (F2)',
    ex:[],dgDoors:[[12,4],[1,7]],
    props:[{x:11,y:2,k:'bench',s:1},{x:1,y:2,k:'flagbin',s:1}],npcs:[]},
  bd4:{hb:1,bd:1,fl:'concrete',floor:'#50585E',wall:'#313D48',wl:'panel',acc:'#E8A33D',acc2:'#A9542F',w:11,h:10,title:'CRANE CAB (F2)',
    ex:[],dgDoors:[[0,5]],
    props:[{x:9,y:8,k:'icebin',s:1}],npcs:[]},
  bd5:{hb:1,bd:1,fl:'plank',floor:'#6E5742',wall:'#2F4248',wl:'panel',acc:'#E8A33D',acc2:'#9FC6D8',w:14,h:10,title:'RIGGING LOFT (F2)',
    ex:[],dgDoors:[[0,5],[0,8]],
    props:[{x:12,y:2,k:'flagbin',s:1},{x:12,y:8,k:'icebin',s:1}],npcs:[]},
  bd6:{hb:1,bd:1,fl:'concrete',floor:'#4B545B',wall:'#293845',wl:'panel',acc:'#9FC6D8',acc2:'#E8A33D',w:12,h:10,title:'SLUICE VALVE (F1)',
    ex:[],dgDoors:[[10,2],[11,5]],
    props:[{x:10,y:8,k:'icebin',s:1}],npcs:[]},
  bd7:{hb:1,bd:1,fl:'concrete',floor:'#586066',wall:'#2C3944',wl:'panel',acc:'#9FC6D8',acc2:'#E8A33D',w:14,h:12,title:'DRY DOCK FLOOR (F1)',
    ex:[],dgDoors:[[0,5],[13,5],[2,10],[7,11],[10,11]],
    props:[{x:1,y:2,k:'flagbin',s:1},{x:12,y:2,k:'icebin',s:1}],npcs:[]},
  bd8:{hb:1,bd:1,fl:'concrete',floor:'#48525A',wall:'#283642',wl:'panel',acc:'#9FC6D8',acc2:'#A9542F',w:13,h:11,title:'BILGE & HULL (F1)',
    ex:[],dgDoors:[[6,1]],
    props:[{x:11,y:2,k:'icebin',s:1}],npcs:[]},
  bd9:{hb:1,bd:1,fl:'concrete',floor:'#52585E',wall:'#3B3236',wl:'panel',acc:'#A9542F',acc2:'#E8A33D',w:14,h:11,title:'THE PENALTY BOX (F1)',
    ex:[],dgDoors:[[0,5],[6,10],[7,10]],
    props:[],npcs:[]},
  bd10:{hb:1,bd:1,fl:'concrete',floor:'#5A5B56',wall:'#353D44',wl:'panel',acc:'#E8A33D',acc2:'#9FC6D8',w:12,h:9,title:"REF'S VAULT (F1)",
    ex:[],dgDoors:[[6,1]],
    props:[{x:1,y:2,k:'cash',s:1,m:['Banded cash envelopes. Every ref in the harbor is on this ledger.']},{x:10,y:2,k:'flagbin',s:1,m:['Fresh yellow flags. Weighted at the corners.']}],npcs:[]},
  bd11:{hb:1,bd:1,fl:'concrete',floor:'#4C545C',wall:'#2A3640',wl:'panel',acc:'#E8A33D',acc2:'#A9542F',w:14,h:12,title:'CAISSON CHAMBER (F1)',
    ex:[],dgDoors:[[6,1],[7,1],[13,3]],
    props:[{x:1,y:2,k:'flagbin',s:1}],npcs:[]}
};

(function(){
  for(const k in BD_ROOMS){HBI[k]=BD_ROOMS[k];if(OWMAPS[k])delete OWMAPS[k]}
})();

/* ---- Basin Helpers ---- */
function bdInRoom(id){return !!(id&&BDR[id])}
function bdVisit(id){const b=bdS();if(!b.visited[id]){b.visited[id]=1;persist()}}
function bdTaunt(id,t){if(BD.taunt[id])return;BD.taunt[id]=1;setTimeout(()=>{if(M&&M.id===id)owToast(t)},700)}
function bdGiveKey(id){const b=bdS();if(b.got[id])return;b.got[id]=1;b.keys=(b.keys||0)+1;persist();SND.fx('ok2');owToast('GOT  BRASS KEY')}
function bdToggleWater(){
  const b=bdS();b.water=b.water==='flooded'?'drained':'flooded';b.stairsOpen=true;persist();
  SND.fx('open');DG.shake=.35;DG.lightFx=.5;
  owToast(b.water==='drained'?'BASIN DRAINED · F1 OPEN':'BASIN FLOODED · HULL FLOATING');
}
function bdGetHook(){
  const b=bdS();if(b.hook)return;b.hook=true;persist();SND.fx('ok2');
  owSay('',['Heavy braided hemp. A forged brass deck hook.','Tied to a faded 2014 pennant: TUG.'],()=>owSay('ELI',['This can cross the dock — and pull cargo.'],()=>owSay('',["★ GOT: TUG'S MOORING LINE (Press G / HOOK)"],()=>owToast('GOT  MOORING LINE'))));
}

/* ---- Basin Room Controllers (BDR) ---- */
var BDR={};

// bd1: Caisson Gatehouse (F2)
BDR.bd1={home:[6,7,'u'],floor:'F2',
  init(){return {}},
  doors(){const b=bdS();return [
    {tile:[5,1],to:'bd2',at:[6,9,'u'],open:bdCrews},{tile:[6,1],to:'bd2',at:[7,9,'u'],open:bdCrews},
    {tile:[11,4],to:'hb_B01',at:[1,5,'r'],open:()=>!!b.shortcut,shortcut:1},
    {tile:[5,8],to:'harbor',open:()=>true},{tile:[6,8],to:'harbor',open:()=>true}]},
  cls(x,y){if(y===2&&(x===5||x===6)&&!bdCrews())return {k:'tall',gate:1};return null},
  bump(x,y){
    const P=[[2,'baitdogs','BAIT DOGS'],[3,'longshore','LONGSHOREMEN'],[4,'gantry','GANTRY GANG']];
    if(y===1){const p=P.find(q=>q[0]===x);if(p){owSay(p[2],[(SAVE.beaten||[]).includes(p[1])?'BEATEN.':'NOT BEATEN YET.']);return true}}
    if(y===2&&(x===5||x===6)&&!bdCrews()){SND.fx('err');owSay('CAISSON GATE',['Locked. Beat the Bait Dogs, Longshoremen, and Gantry Gang first.']);return true}
    if(x===11&&y===4&&!bdS().shortcut){SND.fx('err');owSay('DOCKSIDE SHORTCUT',['Locked from the inside. Reach Bram Kessler to unbolt it.']);return true}
    return false},
  enter(){if(bdCrews()&&!BD.gateSeen){BD.gateSeen=true;SND.fx('open')}owToast('THE BASIN DUNGEON · FLOOR 2')}};

// bd2: Gantry Overlook — Upper Hub (F2)
BDR.bd2={home:[6,9,'u'],floor:'F2',key:'hub2',
  well(x,y){return x>=4&&x<=9&&y>=4&&y<=7},
  gap(x,y){return x===11&&(y===2||y===3)},
  init(){return {}},
  doors(){const b=bdS();return [
    {tile:[6,1],to:'hb_B01',at:[7,8,'u'],open:()=>!!b.bossAccess,lock:'pass'},
    {tile:[7,1],to:'hb_B01',at:[7,8,'u'],open:()=>!!b.bossAccess,lock:'pass'},
    {tile:[0,5],to:'bd3',at:[11,4,'l'],open:()=>true},
    {tile:[13,5],to:'bd5',at:[1,5,'r'],open:()=>!!b.used.rig,lock:'key',use:'rig'},
    {tile:[13,3],to:'bd4',at:[1,5,'r'],open:()=>true},
    {tile:[1,9],to:'bd7',at:[2,9,'u'],open:()=>!!b.stairsOpen,stairs:1},
    {tile:[6,10],to:'bd1',at:[6,2,'d'],open:()=>true},{tile:[7,10],to:'bd1',at:[6,2,'d'],open:()=>true}]},
  cls(x,y){
    if(this.well(x,y))return {k:'well'};
    if(this.gap(x,y))return {k:'pit'};
    if((x===10&&y===3)||(x===12&&y===3))return {k:'bollard'};
    if(x===1&&y===9&&!bdS().stairsOpen)return {k:'tall',bar:1};
    return null},
  bump(x,y){
    if(this.well(x,y)){owSay('DRY DOCK WELL',[bdS().water==='flooded'?'Dark harbor water fills Dry Dock 14 below. Tug\'s wooden hull floats near the rim.':'Dry Dock 14 is drained. Concrete slipways and keel blocks lie exposed below.']);return true}
    if(x===1&&y===9&&!bdS().stairsOpen){SND.fx('err');owSay('LOWER STAIRWELL',['Flooded at the bottom. Find the Sluice Valve to drain the Basin first.']);return true}
    if(this.gap(x,y)){owSay('BROKEN CATWALK',['A 2-tile drop over steel girders. A brass bollard gleams on the far side.']);return true}
    return false},
  enter(){bdTaunt('bd2','BRAM: Look down, Voss. That hull is mine now.')}};

// bd3: Signal Bridge (F2) — Double-Bank + Timed Semaphores -> Brass Key #1 + Stairs to bd6
BDR.bd3={home:[11,4,'l'],floor:'F2',key:'bridge',
  pads:[[7,2,'/'],[7,5,'/'],[5,6,'\\'],[5,3,'\\']],
  init(){return {t1:0,t2:0,open:!!bdS().solved.bridge}},
  doors(st){return [
    {tile:[12,4],to:'bd2',at:[1,5,'r'],open:()=>true},
    {tile:[1,7],to:'bd6',at:[10,3,'d'],open:()=>st.open,stairs:1}]},
  cls(x,y,st){
    const p=this.pads.find(q=>q[0]===x&&q[1]===y);if(p)return {k:'pad',t:p[2]};
    if(x===4&&y===5)return {k:'tgt',o:{kind:'timed',ballOnly:1,id:1,hit:()=>{st.t1=5.0;SND.fx('ok');if(st.t2>0&&!st.open){st.open=true;bdS().solved.bridge=true;persist();SND.fx('ok2');owToast('DRAWBRIDGE LOWERED')}}}};
    if(x===4&&y===3)return {k:'tgt',o:{kind:'timed',ballOnly:1,id:2,hit:()=>{st.t2=5.0;SND.fx('ok');if(st.t1>0&&!st.open){st.open=true;bdS().solved.bridge=true;persist();SND.fx('ok2');owToast('DRAWBRIDGE LOWERED')}}}};
    if(x>=5&&x<=7&&y>=2&&y<=7){if(st.open&&y===4)return null;return {k:'water'}}
    return null},
  pickup(x,y){if(x===2&&y===4&&bdS().solved.bridge&&!bdS().got.k1){bdGiveKey('k1');return true}return false},
  step(st,dt){if(st.t1>0)st.t1=Math.max(0,st.t1-dt);if(st.t2>0)st.t2=Math.max(0,st.t2-dt)}};

// bd6: Sluice Valve Room (F1) — Moving Buoy Targets -> Primary Sluice Wheel (Flooded/Drained)
BDR.bd6={home:[10,3,'d'],floor:'F1',key:'sluice',
  init(){return {h1:!!bdS().solved.sluice,h2:!!bdS().solved.sluice,t0:DG.t}},
  doors(){return [
    {tile:[10,2],to:'bd3',at:[2,7,'r'],open:()=>true,stairs:1},
    {tile:[11,5],to:'bd7',at:[1,5,'r'],open:()=>bdS().water==='drained'}]},
  cls(x,y,st){
    if(x>=1&&x<=6&&y>=3&&y<=8)return bdS().water==='flooded'?{k:'water'}:null;
    if(x===7&&y>=3&&y<=8)return {k:'rail'};
    if(x===8&&y===3)return {k:'valve',unlocked:!!(st.h1&&st.h2)};
    return null},
  movers(st){
    if(st.h1&&st.h2)return [];
    const T=4/1.5,u=((DG.t-st.t0)%(2*T))/T,y1=u<=1?3+u*4:3+(2-u)*4,y2=u<=1?7-u*4:7-(2-u)*4;
    const out=[];
    if(!st.h1)out.push({x:5,y:y1,o:{kind:'moving',hit:()=>{st.h1=true;SND.fx('ok');if(st.h1&&st.h2){bdS().solved.sluice=true;persist();SND.fx('ok2');owToast('SLUICE WHEEL UNLOCKED')}}}})
    if(!st.h2)out.push({x:3,y:y2,o:{kind:'moving',hit:()=>{st.h2=true;SND.fx('ok');if(st.h1&&st.h2){bdS().solved.sluice=true;persist();SND.fx('ok2');owToast('SLUICE WHEEL UNLOCKED')}}}})
    return out},
  bump(x,y,st){
    if(x===8&&y===3){
      if(!(st.h1&&st.h2)){SND.fx('err');owSay('SLUICE WHEEL',['Jammed by two buoy locks out in the channel. Hit both buoys with Dante\'s Ball.']);return true}
      bdToggleWater();return true}
    if(x===11&&y===5&&bdS().water==='flooded'){SND.fx('err');owSay('SLUICE TUNNEL',['Submerged. Turn the Sluice Wheel to drain Dry Dock 14 first.']);return true}
    return false}};

// bd5: Rigging Loft (F2) — Acquire Tug's Mooring Line + Hook-Zip Escape
BDR.bd5={home:[1,5,'r'],floor:'F2',key:'rig',
  nets:[[6,2],[6,3],[6,4],[6,5],[6,6],[3,4],[4,4],[3,5]],
  init(){return {open:!!bdS().hook,shutter:!!bdS().solved.rig,crate:[2,8]}},
  doors(st){return [
    {tile:[0,5],to:'bd2',at:[12,5,'l'],open:()=>true},
    {tile:[0,8],to:'bd2',at:[12,8,'l'],open:()=>st.shutter}]},
  cls(x,y,st){
    if(x===10&&y===3)return {k:'tgt',o:{kind:'press',ballOnly:1,hit:()=>{if(!st.open){st.open=true;SND.fx('ok2');owToast('RIGGING LOCKER OPEN')}else SND.fx('blip')}}};
    if(x===3&&y===2)return {k:'obj',o:'locker'};
    if(dgHas(this.nets,x,y))return {k:'rail'};
    if(x>=5&&x<=8&&(y===7||y===8))return {k:'pit'};
    if((x===4&&y===8)||(x===9&&y===8))return {k:'bollard'};
    if(st.crate&&st.crate[0]===x&&st.crate[1]===y)return {k:'crate',track:[[2,8],[3,8],[4,7]]};
    if(x===1&&y===8&&!st.shutter)return {k:'tall',bar:1};
    return null},
  onPull(st,nx,ny){if(nx===3&&ny===8){st.shutter=true;bdS().solved.rig=true;persist();SND.fx('ok2');owToast('RETURN CHUTE OPEN')}},
  bump(x,y,st){
    if(x===3&&y===2){if(!st.open){owSay('RIGGING LOCKER',['Locked. Tag reads: TUG — 2014. Hit the release switch across the cargo net.']);return true}
      if(!bdS().hook){bdGetHook();return true}owSay('RIGGING LOCKER',['Empty now.']);return true}
    return false}};

// bd7: Dry Dock Floor — Lower Hub (F1)
BDR.bd7={home:[2,9,'u'],floor:'F1',key:'hub1',
  hull(x,y){return x>=4&&x<=8&&y>=4&&y<=6},
  basin(x,y){return x>=3&&x<=11&&y>=3&&y<=8},
  trench(x,y){return y===9&&x>=5&&x<=9},
  init(){return {}},
  doors(){const b=bdS(),dry=b.water==='drained';return [
    {tile:[0,5],to:'bd6',at:[10,5,'l'],open:()=>dry},
    {tile:[2,10],to:'bd2',at:[2,9,'r'],open:()=>true,stairs:1},
    {tile:[13,5],to:'bd9',at:[1,5,'r'],open:()=>dry&&!!b.used.pen,lock:'key',use:'pen'},
    {tile:[7,11],to:'bd10',at:[6,2,'d'],open:()=>true},
    {tile:[10,11],to:'bd8',at:[6,2,'d'],open:()=>dry}]},
  cls(x,y){
    const dry=bdS().water==='drained';
    if(this.trench(x,y))return {k:'pit'};
    if((x===7&&y===8)||(x===7&&y===10))return {k:'bollard'};
    if(x===11&&y===4)return {k:'bollard'};
    if(!dry&&this.basin(x,y)){
      // When flooded, Tug's hull floats up as a walkable bridge from west rim (x=3,y=5) to x=8,y=5!
      if(this.hull(x,y)||(x===3&&y===5))return null;
      return {k:'water'};
    }
    if(dry&&this.hull(x,y))return {k:'hull'};
    if(dry&&x===11&&y===3)return {k:'rail'}; // High pier unreachable on foot when drained; hook across when flooded!
    return null},
  pickup(x,y){if(x===11&&y===2&&!bdS().got.k2){bdGiveKey('k2');return true}return false},
  bump(x,y){
    if(this.hull(x,y)&&bdS().water==='drained'){owSay("TUG'S HULL",['Resting on concrete keel blocks. If the basin floods, this deck would float right up to the upper pier.']);return true}
    if(x===13&&y===5&&bdS().water==='flooded'){SND.fx('err');owSay('PENALTY BOX DOOR',['Submerged. Drain the Basin first.']);return true}
    return false}};

// bd4: Crane Cab (F2) — Pull Mobile Pad Crate + Bank Shot -> Crane Drop + Brass Key #3
BDR.bd4={home:[1,5,'r'],floor:'F2',key:'crane',
  init(){return {crate:bdS().craneDropped?[7,4]:[7,7],u:[],done:!!bdS().craneDropped}},
  doors(){return [{tile:[0,5],to:'bd2',at:[12,3,'l'],open:()=>true}]},
  cls(x,y,st){
    if(st.crate&&st.crate[0]===x&&st.crate[1]===y)return {k:'padcrate',t:'\\',track:[[7,3],[7,4],[7,5],[7,6],[7,7]]};
    if(x>=2&&x<=9&&y===6)return {k:'rail'};
    if(x===7&&y===8)return {k:'tgt',o:{kind:'bank',ballOnly:1,hit:()=>{if(!st.done){st.done=true;bdS().craneDropped=true;bdS().solved.crane=true;persist();SND.fx('ok2');DG.shake=.35;owToast('CRANE CONTAINER DROPPED · KEY UNLOCKED')}}}};
    if(x===2&&y===2)return {k:'obj',o:'chest'};
    return null},
  bump(x,y,st){
    if(x===2&&y===2){
      if(!st.done){owSay('CRANE LOCKBOX',['Locked until the overhead gantry drops its counterweight.']);return true}
      if(!bdS().got.k3){bdGiveKey('k3');return true}
      owSay('CRANE LOCKBOX',['Empty now.']);return true}
    return false}};

// bd8: Bilge & Hull (F1) — Local Aux Valve + Pull Mobile Pad while Drained -> Flood -> Bank into Buoy
BDR.bd8={home:[6,2,'d'],floor:'F1',key:'bilge',
  init(){return {crate:bdS().solved.bilge?[8,5]:[8,8],u:[],done:!!bdS().solved.bilge}},
  doors(){return [{tile:[6,1],to:'bd7',at:[10,10,'u'],open:()=>true}]},
  cls(x,y,st){
    const dry=bdS().water==='drained';
    if(x===2&&y===3)return {k:'valve',unlocked:true};
    if(st.crate&&st.crate[0]===x&&st.crate[1]===y)return {k:'padcrate',t:'/',track:[[8,4],[8,5],[8,6],[8,7],[8,8]]};
    if(x===4&&y===5){
      if(!dry)return {k:'tgt',o:{kind:'bank',ballOnly:1,hit:()=>{if(!st.done){st.done=true;bdS().solved.bilge=true;persist();SND.fx('ok2');owToast('BILGE SEAL RELEASED')}}}};
      return {k:'sunken'};
    }
    if(!dry&&x>=3&&x<=10&&y>=4&&y<=9)return {k:'water'};
    if(x===3&&y>=4&&y<=9)return {k:'rail'};
    return null},
  bump(x,y){
    if(x===2&&y===3){bdToggleWater();return true}
    if(x===4&&y===5&&bdS().water==='drained'){owSay('SUNKEN BUOY',['Sitting at the bottom of the bilge. Flood the water to float it into throw range.']);return true}
    return false}};

// bd9: The Penalty Box (F1) — Mini-Boss: "Ironclad" Otto + Flag Turrets (Hook Stun + Ball Relay)
BDR.bd9={home:[1,5,'r'],floor:'F1',key:'penbox',
  safe:[[2,8],[3,8],[10,3],[11,3]],
  init(){return {on:!bdS().solved.penbox,hp:3,ohp:3,flags:[],warn:[],next:1.4,seq:19,ox:7,oy:5,od:'l',stun:0,ot:0}},
  doors(st){const b=bdS();return [
    {tile:[0,5],to:'bd7',at:[12,5,'l'],open:()=>true},
    {tile:[6,10],to:'bd11',at:[6,2,'d'],open:()=>!st.on&&!!b.used.caisson,lock:'key',use:'caisson'},
    {tile:[7,10],to:'bd11',at:[7,2,'d'],open:()=>!st.on&&!!b.used.caisson,lock:'key',use:'caisson'}]},
  isSafe(x,y){return dgHas(this.safe,x,y)},
  cls(x,y,st){
    if(y===9&&(x===6||x===7)&&st.on)return {k:'tall',bar:1};
    if(x===7&&y===2)return {k:'tgt',o:{kind:'relay',ballOnly:1,hit:()=>bdOttoRelay(st)}};
    return null},
  hz(st){if(!st.on)return [];const out=st.flags.map(f=>({k:'flag',x:f.x,y:f.y}));out.push({k:'otto',x:st.ox,y:st.oy});return out},
  movers(st){if(!st.on)return [];return [{x:st.ox,y:st.oy,o:{kind:'otto',hit:()=>{SND.fx('blip');dgPing(st.ox,st.oy,'#9aa4b8');owToast('SHIELDED! USE MOORING LINE (G)')}}}]},
  step(st,dt){
    if(!st.on)return;
    if(st.stun>0){st.stun=Math.max(0,st.stun-dt)}
    else{
      st.ot+=dt;
      const sp=1.7+(3-st.ohp)*.35;
      st.ox=7+4.2*Math.sin(st.ot*sp);
      st.oy=5+1.8*Math.cos(st.ot*sp*.7);
    }
    st.next-=dt;
    if(st.next<=0){
      st.next=Math.max(.55,1.05-(3-st.ohp)*.16);
      const v=dgRnd(st)<.5,dir=dgRnd(st)<.5?1:-1,lane=v?2+Math.floor(dgRnd(st)*10):3+Math.floor(dgRnd(st)*6);
      st.warn.push({v,dir,lane,t:.75});
    }
    for(const w of st.warn){w.t-=dt;if(w.t<=0){const sp=2.4;st.flags.push(w.v?{x:w.lane,y:w.dir>0?1.8:9.2,vx:0,vy:w.dir*sp}:{x:w.dir>0?1.2:12.4,y:w.lane,vx:w.dir*sp,vy:0})}}
    st.warn=st.warn.filter(w=>w.t>0);
    for(const f of st.flags){f.x+=f.vx*dt;f.y+=f.vy*dt}
    st.flags=st.flags.filter(f=>f.x>.5&&f.x<13.2&&f.y>1.4&&f.y<9.6);
  },
  enter(){if(!bdS().solved.penbox)bdTaunt('bd9','OTTO: Flag on the play! Pull my sled if you can!')}};

function bdOttoRelay(st){
  if(!st.on)return;
  if(st.stun<=0){SND.fx('blip');dgPing(7,2,'#9aa4b8');owToast('STUN OTTO WITH MOORING LINE (G) FIRST');return}
  st.stun=0;st.ohp--;SND.fx('ok');dgPing(7,2,BDC.green);
  if(st.ohp<=0){st.on=false;st.flags=[];st.warn=[];bdS().solved.penbox=true;persist();SND.fx('ok2');owToast('OTTO CLEARED · SOUTH HATCH UNLOCKED')}
}

// bd10: Ref's Secret Vault (Optional, F1) — 4-Target Flag Code + Crate Yank + Bank Shot -> Map & +2 Upgrade Points
BDR.bd10={home:[6,2,'d'],floor:'F1',key:'vault2',
  init(){return {n:0,crate:[8,4],open:!!bdS().solved.vault2}},
  doors(){return [{tile:[6,1],to:'bd7',at:[7,10,'u'],open:()=>true}]},
  tg(st,id){return {kind:'order',ballOnly:1,id,col:['','#FF3B5C','#3B7BFF','#E8A33D','#58FFB0'][id],hit:()=>bdOrder(st,id)}},
  cls(x,y,st){
    if(x===2&&y===4)return {k:'pad',t:'/'};
    if(x>=1&&x<=4&&y===6)return {k:'rail'};
    if(st.crate&&st.crate[0]===x&&st.crate[1]===y)return {k:'crate',track:[[8,4],[8,5],[8,6]]};
    if(!st.open&&x===3&&y===3)return {k:'tgt',o:this.tg(st,1)};
    if(!st.open&&x===9&&y===4)return {k:'tgt',o:this.tg(st,2)};
    if(!st.open&&x===9&&y===7)return {k:'tgt',o:this.tg(st,3)};
    if(!st.open&&x===2&&y===7)return {k:'tgt',o:this.tg(st,4)};
    if(x===6&&y===7)return {k:'obj',o:'chest'};
    return null},
  bump(x,y,st){
    if(x===6&&y===7){
      const b=bdS();
      if(!st.open){owSay('REF LOCKBOX',['Locked. Hit the four flag targets in order: Red, Blue, Gold, Green.']);return true}
      if(b.map){owSay('REF LOCKBOX',['Empty now.']);return true}
      const lines=[];if(!b.loot){b.loot=true;SAVE.upPts=(SAVE.upPts||0)+2;lines.push('★ +2 UPGRADE POINTS')}
      b.map=true;persist();owHud();lines.push('★ GOT: BASIN DUNGEON MAP (in MENU)');
      owSay('',['Harbor blueprints, ref envelopes, and a dry-dock schematic.'].concat(lines),()=>owToast('GOT  BASIN MAP'));return true}
    return false}};
function bdOrder(st,id){if(st.open)return;if(id===st.n+1){st.n=id;SND.fx('ok');if(st.n===4){st.open=true;bdS().solved.vault2=true;persist();SND.fx('ok2');owToast('VAULT UNLOCKED')}}else{st.n=0;dgBuzz()}}

// bd11: The Caisson Chamber (F1) — Climactic Finale -> Boss Key: Caisson Pass + Hoist to bd2
BDR.bd11={home:[6,2,'d'],floor:'F1',key:'caisson',
  cm:[11,3],tt:[12,8],gate:[9,4],start:[2,9],dock:[10,5],
  isTrack(x,y){return y===7&&x>=3&&x<=10},
  init(){const s=!!bdS().solved.caisson;return {hb:s?[11,3]:[2,9],carry:false,ride:false,gate:0,crate:[4,5],u:[],done:s,t0:DG.t,ref:{x:5,y:5,dir:1,cd:0}}},
  doors(st){return [
    {tile:[6,1],to:'bd9',at:[6,9,'u'],open:()=>true},{tile:[7,1],to:'bd9',at:[7,9,'u'],open:()=>true},
    {tile:[13,3],to:'bd2',at:[10,2,'l'],open:()=>st.done,hoist:1}]},
  sledX(st){const t=((DG.t-st.t0)%8+8)%8;return t<3.5?3+7*(t/3.5):t<4?10:t<7.5?10-7*((t-4)/3.5):3},
  cls(x,y,st){
    if(x===this.tt[0]&&y===this.tt[1])return {k:'tgt',o:{kind:'timed',ballOnly:1,hit:()=>{st.gate=4.5;SND.fx('ok')}}};
    if(x===this.gate[0]&&y===this.gate[1]&&!st.done&&(st.gate<=0||st.carry))return {k:'tall',bar:1};
    if(this.isTrack(x,y))return {k:'track'};
    if(y===6&&x>=3&&x<=10)return {k:'pit'};
    if((x===2&&y===6)||(x===11&&y===6))return {k:'bollard'};
    if(x===9&&(y===2||y===3||y===5))return {k:'rail'};
    if(st.crate&&st.crate[0]===x&&st.crate[1]===y)return {k:'crate',track:[[4,4],[4,5],[4,6],[4,7],[4,8]]};
    if(!st.carry&&st.hb&&st.hb[0]===x&&st.hb[1]===y)return {k:'hb'};
    return null},
  bump(x,y,st){
    if(st.hb&&!st.carry&&st.hb[0]===x&&st.hb[1]===y){
      if(st.done){SND.fx('blip');return true}
      st.u.push({hb:st.hb.slice(),carry:st.carry,ride:st.ride,crate:st.crate?st.crate.slice():null,ex:OW.x,ey:OW.y,ed:OW.d});
      st.carry=true;st.hb=null;SND.fx('pluck');return true}
    return false},
  step(st,dt){
    if(st.gate>0)st.gate=Math.max(0,st.gate-dt);
    if(st.ride&&this.sledX(st)>=9.95){st.ride=false;st.hb=[10,5];SND.fx('drop')}
    if(st.done)return;
    const r=st.ref;if(r.cd>0)r.cd=Math.max(0,r.cd-dt);
    r.y+=r.dir*1.4*dt;if(r.y>=9){r.y=9;r.dir=-1}if(r.y<=3){r.y=3;r.dir=1}
    // Sightline check (3 tiles horizontally on same row, blocked if Flag-Crate cover is between Eli and Ref)
    if(r.cd<=0&&Math.abs(OW.py-r.y)<.55&&Math.abs(OW.px-r.x)<=3.2){
      const blocked=st.crate&&Math.abs(st.crate[1]-r.y)<.6&&((OW.px<st.crate[0]&&st.crate[0]<r.x)||(r.x<st.crate[0]&&st.crate[0]<OW.px));
      if(!blocked){DG.slow=2.0;r.cd=3.5;DG.flash=.4;SND.fx('err');owToast('FLAG! WHISTLE SLOWDOWN 2s')}
    }
  },
  enter(){bdTaunt('bd11','BRAM: Pull all the lines you want. The Caisson stays shut.')}};

function bdHeavyLand(st,x,y){
  const R=BDR.bd11;st.carry=false;
  if(R.isTrack(x,y)){
    if(Math.abs(R.sledX(st)-x)<.8){st.ride=true;st.hb=null;SND.fx('ok');dgPing(x,y,BDC.green);return}
    st.hb=R.start.slice();dgBuzz();dgPing(x,y,BDC.red);return;
  }
  st.hb=[x,y];
  if(x===R.cm[0]&&y===R.cm[1]&&!st.done){
    st.done=true;st.gate=0;DG.slow=0;
    const b=bdS();b.solved.caisson=true;b.pass=true;persist();
    setTimeout(()=>{SND.fx('ok2');owToast('GOT  CAISSON PASS · HOIST OPEN')},300);
  }else SND.fx('drop');
}

/* ---- Entry, Navigation, and Boss Shortcut ---- */
function bdEnterBasin(b){
  if(b.id!=='B01'||bdDone())return false;
  bdGo('bd1',[6,7,'u']);return true;
}
function bdReachedBram(){
  const b=bdS();bdVisit('hb_B01');
  if(!b.cleared){b.cleared=true;b.shortcut=true;persist();setTimeout(()=>owToast('SHORTCUT OPEN · GATEHOUSE'),400)}
}
function bdGo(to,at){
  DG.fly=null;DG.hfly=null;DG.slow=0;BD.hookAnim=null;BD.zip=null;
  if(to==='harbor'){SND.fx('close');OW.ret=null;owPlace('harbor',24,19,'u',null);owHud();return}
  if(to==='hb_B01'){SND.fx('open');owPlace('hb_B01',at?at[0]:7,at?at[1]:8,at?at[2]:'u',{x:24,y:19,d:'u',map:'harbor'});bdReachedBram();owHud();return}
  const R=BDR[to];BD.st[to]=R.init();DG.inv=0;SND.fx('open');owPlace(to,at[0],at[1],at[2],{x:24,y:19,d:'u',map:'harbor'});bdVisit(to);if(R.enter)R.enter();owHud();
}
function bdSt(){const R=BDR[M.id];return BD.st[M.id]||(BD.st[M.id]=R.init())}

/* ---- Mooring Line (G / HOOK) ---- */
function bdCanHook(){return !!(M&&BDR[M.id]&&M.id!=='bd1'&&bdS().hook)}
function bdHook(){
  if(!bdCanHook()||OW.busy||OW.mv||DG.fly||DG.hfly||BD.hookAnim||BD.zip)return;
  const R=BDR[M.id],st=bdSt(),[dx,dy]=DG_DIRS[OW.d];
  SND.fx('pluck');
  // Raycast up to BD_HOOK_MAX tiles orthogonally
  let hit=null;
  for(let i=1;i<=BD_HOOK_MAX;i++){
    const x=OW.x+dx*i,y=OW.y+dy*i;
    if(x<0||y<0||x>=M.w||y>=M.h||M.solid[y*M.w+x])break;
    // Check Otto mini-boss in bd9
    if(M.id==='bd9'&&st.on&&Math.hypot(st.ox-x,st.oy-y)<.95){
      hit={kind:'otto',x:st.ox,y:st.oy};break;
    }
    const c=R.cls(x,y,st);
    if(!c)continue;
    if(c.k==='bollard'){hit={kind:'bollard',x,y,land:[x-dx,y-dy]};break}
    if(c.k==='crate'||c.k==='padcrate'){hit={kind:'crate',x,y,c};break}
    if(c.k==='rail'||c.k==='water'||c.k==='pit'||c.k==='well'||c.k==='track')continue;
    break;
  }
  const endX=hit?hit.x:OW.x+dx*Math.min(BD_HOOK_MAX,3),endY=hit?hit.y:OW.y+dy*Math.min(BD_HOOK_MAX,3);
  BD.hookAnim={x0:OW.x,y0:OW.y,x1:endX,y1:endY,t:0,hit,dx,dy};
}

function bdHookStep(dt){
  const h=BD.hookAnim;
  if(h){
    h.t+=dt*4.5;
    if(h.t>=1){
      BD.hookAnim=null;
      const R=BDR[M.id],st=bdSt();
      if(!h.hit){SND.fx('drop');return}
      if(h.hit.kind==='otto'){
        st.stun=2.8;SND.fx('ok2');dgPing(st.ox,st.oy,BDC.green);owToast('OTTO STUNNED! THROW AT NORTH RELAY!');return;
      }
      if(h.hit.kind==='bollard'){
        const [lx,ly]=h.hit.land;
        if(lx>=1&&ly>=2&&lx<M.w-1&&ly<M.h-1&&!M.solid[ly*M.w+lx]){
          BD.zip={x0:OW.px,y0:OW.py,x1:lx,y1:ly,t:0};SND.fx('ok');dgPing(h.hit.x,h.hit.y,BDC.brass);
        }else SND.fx('err');
        return;
      }
      if(h.hit.kind==='crate'){
        const nx=h.hit.x-h.dx,ny=h.hit.y-h.dy;
        const okTrack=!h.hit.c.track||dgHas(h.hit.c.track,nx,ny);
        if(okTrack&&!(nx===OW.x&&ny===OW.y)&&!M.solid[ny*M.w+nx]){
          if(st.u)st.u.push({crate:st.crate.slice(),hb:st.hb?st.hb.slice():null,carry:!!st.carry,ride:!!st.ride,ex:OW.x,ey:OW.y,ed:OW.d});
          st.crate=[nx,ny];SND.fx('ok');dgPing(nx,ny,BDC.brass);
          if(R.onPull)R.onPull(st,nx,ny);
        }else SND.fx('err');
        return;
      }
    }
  }
  const z=BD.zip;
  if(z){
    z.t+=dt*5.5;
    if(z.t>=1){OW.x=OW.px=z.x1;OW.y=OW.py=z.y1;OW.mv=false;BD.zip=null;owSave();dgArrive()}
    else{OW.px=z.x0+(z.x1-z.x0)*z.t;OW.py=z.y0+(z.y1-z.y0)*z.t}
  }
}

/* ---- Hook into Town 1 DG Engine Cleanly (Zero Regression) ---- */
var _dgBlock=dgBlock;
dgBlock=function(x,y){
  if(M&&BDR[M.id]){
    const R=BDR[M.id],st=bdSt();
    const d=dgDoorAt(R,st,x,y);if(d)return !d.open(st)||(M.id==='bd11'&&!!st.carry);
    if(R.cls(x,y,st))return true;return false;
  }
  return _dgBlock(x,y);
};

var _dgBump=dgBump;
dgBump=function(x,y){
  if(M&&BDR[M.id]){
    const R=BDR[M.id],st=bdSt();
    if(R.bump&&R.bump(x,y,st))return true;
    const d=dgDoorAt(R,st,x,y);
    if(d&&!d.open(st)){
      const b=bdS();
      if(d.lock==='key'){if(b.keys>0){b.keys--;b.used[d.use]=true;persist();SND.fx('open');return true}SND.fx('err');owSay('BRASS LOCK',['Locked. Needs a Brass Key.']);return true}
      if(d.lock==='pass'){if(b.pass){b.bossAccess=true;persist();SND.fx('open');owToast('CAISSON GATE OPEN');return true}SND.fx('err');owSay('BOSS GATE',['Sealed tight. Needs the CAISSON PASS.']);return true}
      SND.fx('err');return true;
    }
    const c=R.cls(x,y,st);
    if(c){if(c.k==='tgt'){if(c.o.ballOnly){SND.fx('blip');return true}c.o.hit();return true}SND.fx('err');return true}
    return false;
  }
  return _dgBump(x,y);
};

var _dgArrive=dgArrive;
dgArrive=function(){
  if(M&&BDR[M.id]){
    const R=BDR[M.id],st=bdSt();
    const d=dgDoorAt(R,st,OW.x,OW.y);
    if(d&&d.to){owClearIn();if(d.stairs||d.hoist)SND.fx('drop');bdGo(d.to,d.at||[OW.x,OW.y,OW.d]);return true}
    if(R.pickup&&R.pickup(OW.x,OW.y))return true;
    return false;
  }
  return _dgArrive();
};

var _dgOnShow=dgOnShow;
dgOnShow=function(){
  _dgOnShow();
  try{bdS()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  if(M&&BDR[M.id]&&!BD.st[M.id]){const R=BDR[M.id];BD.st[M.id]=R.init();OW.x=OW.px=R.home[0];OW.y=OW.py=R.home[1];OW.d=R.home[2];OW.mv=false}
};

var _dgCanThrow=dgCanThrow;
dgCanThrow=function(){
  if(M&&BDR[M.id])return M.id!=='bd1'&&(!!dgS().ball||(M.id==='bd11'&&BD.st.bd11&&BD.st.bd11.carry));
  return _dgCanThrow();
};

var _dgRoomUnsolved=dgRoomUnsolved;
dgRoomUnsolved=function(){
  if(M&&BDR[M.id]){const R=BDR[M.id];if(!R.key||R.key==='hub1'||R.key==='hub2')return false;return !bdS().solved[R.key]}
  return _dgRoomUnsolved();
};

var _dgReset=dgReset;
dgReset=function(){
  if(M&&BDR[M.id]){
    const R=BDR[M.id];if(!dgRoomUnsolved())return;
    BD.st[M.id]=R.init();DG.fly=null;DG.hfly=null;BD.hookAnim=null;BD.zip=null;DG.inv=0;DG.slow=0;
    OW.mv=false;OW.x=OW.px=R.home[0];OW.y=OW.py=R.home[1];OW.d=R.home[2];owClearIn();owSave();SND.fx('back');DG.flash=.35;return;
  }
  _dgReset();
};

var _dgUndo=dgUndo;
dgUndo=function(){
  if(M&&BDR[M.id]){
    const st=BD.st[M.id];if(!st||st.done||!st.u||!st.u.length||OW.busy||OW.mv||DG.hfly||BD.hookAnim)return;
    const s=st.u.pop();
    if(s.crate)st.crate=s.crate;if('hb' in s)st.hb=s.hb;if('carry' in s)st.carry=s.carry;if('ride' in s)st.ride=!!s.ride;
    OW.x=OW.px=s.ex;OW.y=OW.py=s.ey;OW.d=s.ed;owClearIn();SND.fx('back');return;
  }
  _dgUndo();
};

var _dgThrow=dgThrow;
dgThrow=function(){
  if(M&&BDR[M.id]){
    if(!dgCanThrow()||OW.busy||OW.mv||DG.fly||DG.hfly||BD.hookAnim||BD.zip)return;
    if(M.id==='bd11'&&BD.st.bd11&&BD.st.bd11.carry){
      const st=BD.st.bd11,R=BDR.bd11,[dx,dy]=DG_DIRS[OW.d];let land=null;
      for(let i=1;i<=3;i++){const x=OW.x+dx*i,y=OW.y+dy*i;if(x<1||y<2||x>=M.w-1||y>=M.h-1)break;
        if(R.isTrack(x,y)){land=[x,y];break}
        if(x===R.gate[0]&&y===R.gate[1])break;
        const c=R.cls(x,y,{...st,carry:false});if(M.solid[y*M.w+x]||(c&&c.k!=='rail'&&c.k!=='pit'))break;if(!(c&&(c.k==='rail'||c.k==='pit')))land=[x,y]}
      if(!land){dgBuzz();return}
      st.u.push({hb:null,carry:true,ride:false,crate:st.crate?st.crate.slice():null,ex:OW.x,ey:OW.y,ed:OW.d});
      DG.hfly={x0:OW.x,y0:OW.y,x1:land[0],y1:land[1],t:0,bd:1};st.carry=false;SND.fx('pluck');return;
    }
    const [dx,dy]=DG_DIRS[OW.d];DG.fly={tx:OW.x,ty:OW.y,dx,dy,f:0,n:0,back:0,bx:0,by:0,bd:1};SND.fx('pluck');return;
  }
  _dgThrow();
};

var _owInteractBD=owInteract;
owInteract=function(){
  if(!OW.busy&&M&&M.id==='bd11'&&BD.st.bd11&&BD.st.bd11.carry){
    const st=BD.st.bd11,R=BDR.bd11,[dx,dy]=DG_DIRS[OW.d],x=OW.x+dx,y=OW.y+dy;
    if(x<1||y<2||x>=M.w-1||y>=M.h-1||M.solid[y*M.w+x]||R.cls(x,y,{...st,carry:false})){dgBuzz();return}
    st.u.push({hb:null,carry:true,ride:false,crate:st.crate?st.crate.slice():null,ex:OW.x,ey:OW.y,ed:OW.d});
    bdHeavyLand(st,x,y);return;
  }
  return _owInteractBD.apply(this,arguments);
};

/* ---- HUD Button (#dgHook) & G Keybind ---- */
var _dgUI=dgUI;
dgUI=function(){
  const w=_dgUI();if(!w)return null;
  if(!document.getElementById('dgHook')){
    const st=document.createElement('style');
    st.textContent='#dgHook{right:176px;bottom:calc(env(safe-area-inset-bottom,0px) + 44px);width:64px;height:64px;border-radius:50%;border:3px solid #9FC6D8;font-size:13px;box-shadow:0 0 12px rgba(159,198,216,.45)}';
    document.head.appendChild(st);
    const b=document.createElement('button');b.id='dgHook';b.textContent='HOOK';b.hidden=true;
    b.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();if(OW.busy)return;bdHook()});
    w.appendChild(b);
  }
  return w;
};
var _dgUISync=dgUISync;
dgUISync=function(){
  _dgUISync();
  const inBd=!!(OWON&&M&&BDR[M.id]);
  const bHook=document.getElementById('dgHook');
  if(bHook){const show=inBd&&bdCanHook();if(bHook.hidden===show)bHook.hidden=!show}
  if(!inBd)return;
  const b=bdS(),st=BD.st[M.id];
  const vis={dgThrow:dgCanThrow(),dgReset:dgRoomUnsolved(),dgUndo:dgRoomUnsolved()&&st&&st.u&&st.u.length>0};
  for(const id in vis){const el=document.getElementById(id);if(el&&el.hidden===vis[id])el.hidden=!vis[id]}
  if(M.id!=='bd1'){
    const o=document.getElementById('owObj'),t='KEYS '+(b.keys||0)+(b.pass&&!b.bossAccess?'  ·  CAISSON PASS':'')+'  ·  '+b.water.toUpperCase();
    if(o&&o.textContent!==t)o.textContent=t;
  }
};
addEventListener('keydown',e=>{if(!OWON)return;if((e.key||'').toLowerCase()==='g')bdHook()});

/* ---- Two-Floor Basin Dungeon Map ---- */
var BD_MAPPOS={
  bd1:[2,2.2],bd2:[2,1.2],bd3:[1,1.2],bd5:[3,1.2],bd4:[3,.3],hb_B01:[2,.3],
  bd6:[1,3.4],bd7:[2,3.4],bd9:[3,3.4],bd10:[1.4,4.3],bd8:[2.4,4.3],bd11:[3.3,4.3]
};
var BD_NAMES={bd1:'GATE',bd2:'GANTRY',bd3:'BRIDGE',bd4:'CRANE',bd5:'RIGGING',hb_B01:'BRAM',bd6:'SLUICE',bd7:'FLOOR',bd8:'BILGE',bd9:'PENALTY',bd10:'VAULT',bd11:'CAISSON'};
var _dgShowMap=dgShowMap;
dgShowMap=function(){
  if(!(M&&(BDR[M.id]||M.id==='hb_B01'||M.harbor)))return _dgShowMap();
  const b=bdS();let box=document.getElementById('dgMapBox');if(box)box.remove();dgUI();
  box=document.createElement('div');box.id='dgMapBox';
  box.innerHTML='<div style="font-size:20px;letter-spacing:.1em;margin-bottom:6px">THE BASIN · DRY DOCK 14</div><canvas width=680 height=600></canvas><div id=dgMapInfo style="margin-top:8px;font-size:13px"></div><button>CLOSE</button>';
  document.body.appendChild(box);box.querySelector('button').onclick=()=>box.remove();
  const g=box.querySelector('canvas').getContext('2d'),P=id=>[30+BD_MAPPOS[id][0]*155,20+BD_MAPPOS[id][1]*104];
  g.fillStyle='#9FC6D8';g.font='bold 14px sans-serif';g.fillText('F2 · UPPER GANTRY',18,22);g.fillText('F1 · LOWER DRY DOCK',18,350);
  g.strokeStyle='rgba(159,198,216,.3)';g.setLineDash([6,5]);g.beginPath();g.moveTo(16,326);g.lineTo(664,326);g.stroke();g.setLineDash([]);
  const links=[['bd1','bd2',null],['bd2','bd3',null],['bd2','bd5','KEY'],['bd2','bd4','HOOK'],['bd2','hb_B01','PASS'],['bd3','bd6','STAIR'],['bd2','bd7','STAIR'],['bd6','bd7',null],['bd7','bd9','KEY'],['bd7','bd10','HOOK'],['bd7','bd8',null],['bd9','bd11','KEY']];
  g.lineWidth=4;
  for(const [p,q,l] of links){
    if(!(b.visited[p]||b.map)||!(b.visited[q]||b.map))continue;
    const [x1,y1]=P(p),[x2,y2]=P(q);
    g.strokeStyle=l==='KEY'||l==='PASS'?BDC.brass:l==='HOOK'?BDC.waterHi:'#5A6B78';
    g.beginPath();g.moveTo(x1+46,y1+28);g.lineTo(x2+46,y2+28);g.stroke();
  }
  for(const id in BD_MAPPOS){
    const seen=b.visited[id]||id==='bd1';if(!seen&&!b.map)continue;
    const [x,y]=P(id);
    g.fillStyle=seen?'#22303C':'#121A22';g.fillRect(x,y,92,56);
    g.strokeStyle=M&&M.id===id?BDC.green:seen?BDC.waterHi:'#3A4A55';g.lineWidth=M&&M.id===id?5:2.5;g.strokeRect(x,y,92,56);
    g.fillStyle=seen?'#F2F5F7':'#6A7A86';g.font='bold 13px sans-serif';g.textAlign='center';g.fillText(BD_NAMES[id],x+46,y+33);
  }
  g.textAlign='left';
  box.querySelector('#dgMapInfo').textContent='KEYS '+(b.keys||0)+(b.hook?'  ·  MOORING LINE':'')+(b.pass?'  ·  CAISSON PASS':'')+'  ·  WATER: '+b.water.toUpperCase();
};

/* ---- Basin Physics, Ball Override & Rendering ---- */
function bdFlyStep(dt){
  const f=DG.fly;if(!f||!f.bd)return;
  if(f.back){f.back+=dt;if(f.back>=.22)DG.fly=null;return}
  const R=BDR[M.id],st=bdSt();let rem=dt*DG_BALL_SP;
  while(rem>0&&!f.back){
    const step=Math.min(rem,1-f.f);f.f+=step;rem-=step;
    const px=f.tx+f.dx*f.f,py=f.ty+f.dy*f.f;
    for(const m of (R.movers?R.movers(st):[]))if(Math.abs(m.x-px)<.6&&Math.abs(m.y-py)<.6){m.o.hit();dgPing(m.x,m.y);dgFlyEnd(f);break}
    if(f.back)break;
    if(f.f>=1){
      const x=f.tx+f.dx,y=f.ty+f.dy;f.n++;
      if(x<0||y<0||x>=M.w||y>=M.h||M.solid[y*M.w+x]||dgDoorAt(R,st,x,y)||owNpcAt(x,y)){f.f=.35;dgFlyEnd(f);SND.fx('drop');break}
      const c=R.cls(x,y,st);
      if(c&&c.k==='tgt'){f.tx=x;f.ty=y;f.f=0;c.o.hit();dgPing(x,y);dgFlyEnd(f);break}
      if(c&&(c.k==='pad'||c.k==='padcrate')){f.tx=x;f.ty=y;f.f=0;const [a,b]=[f.dx,f.dy];if(c.t==='/'){f.dx=-b;f.dy=-a}else{f.dx=b;f.dy=a}SND.fx('tick')}
      else if(c&&!['rail','water','pit','well','track','sunken'].includes(c.k)){f.f=.35;dgFlyEnd(f);SND.fx('drop');break}
      else{f.tx=x;f.ty=y;f.f=0}
      if(f.n>=DG_BALL_MAX){dgFlyEnd(f);break}
    }
  }
}

var _dgAnim=dgAnim;
dgAnim=function(og,OT,tm){
  if(!(M&&BDR[M.id])){_dgAnim(og,OT,tm);return}
  const now=performance.now(),dt=Math.min(.05,DG.last?(now-DG.last)/1000:0);DG.last=now;
  const live=OWON&&!OW.busy;if(live)DG.t+=dt;if(DG.flash>0)DG.flash-=dt;if(DG.shake>0)DG.shake-=dt;if(DG.lightFx>0)DG.lightFx-=dt;if(DG.slow>0)DG.slow=Math.max(0,DG.slow-dt);
  dgUISync();
  const R=BDR[M.id],st=bdSt(),b=bdS();
  if(live){
    bdFlyStep(dt);
    if(DG.hfly&&DG.hfly.bd){DG.hfly.t+=dt/.4;if(DG.hfly.t>=1){const h=DG.hfly;DG.hfly=null;bdHeavyLand(BD.st.bd11,h.x1,h.y1)}}
    bdHookStep(dt);
    if(R.step)R.step(st,dt);
    if(M.id==='bd9'&&st.on){
      if(DG.inv>0)DG.inv-=dt;
      else if(!R.isSafe(Math.round(OW.px),Math.round(OW.py))){
        for(const h of R.hz(st))if(Math.abs(h.x-OW.px)<.55&&Math.abs(h.y-OW.py)<.55){
          st.hp--;DG.flash=.4;SND.fx('err');try{SND.fx('hit')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
          if(st.hp<=0){BD.st.bd9=R.init();OW.mv=false;OW.x=OW.px=R.home[0];OW.y=OW.py=R.home[1];OW.d='r';owClearIn();owSave();DG.inv=1.5;break}
          DG.inv=1.2;break;
        }
      }
    }
  }
  // Draw doors
  for(const d of R.doors(st)){
    const [x,y]=d.tile;
    if(y===1&&(x===5||x===6)){dgDrawDoor(og,OT,d.open(st),tm,d.lock,false);continue}
    if(d.stairs||d.hoist){
      og.fillStyle=d.open(st)?'rgba(159,198,216,.25)':'rgba(40,50,60,.6)';og.fillRect(x*OT+2,y*OT+2,OT-4,OT-4);
      og.strokeStyle=d.open(st)?BDC.brass:BDC.red;og.lineWidth=2;og.strokeRect(x*OT+2,y*OT+2,OT-4,OT-4);
      for(let i=0;i<3;i++){og.fillStyle=BDC.brass;og.fillRect(x*OT+6,y*OT+6+i*(OT*.24),OT-12,3)}
    }else if(x===0||x===M.w-1){dgDrawSideDoor(og,OT,x,y,d.open(st),d.lock==='key'?'card':d.lock,false)}
  }
  // Draw tiles
  for(let y=2;y<M.h-1;y++)for(let x=1;x<M.w-1;x++){
    const c=R.cls(x,y,st);if(!c)continue;
    const X=x*OT,Y=y*OT;
    if(c.k==='water'){og.fillStyle=BDC.water;og.fillRect(X,Y,OT,OT);og.fillStyle='rgba(255,255,255,.16)';og.fillRect(X+4,Y+OT*.35+Math.sin(tm*2+x)*2,OT-8,3)}
    else if(c.k==='well'){og.fillStyle=b.water==='flooded'?'#2B5870':'#2D343A';og.fillRect(X,Y,OT,OT);if(x>=5&&x<=8&&y>=5&&y<=6){og.fillStyle='#6E4A2E';og.fillRect(X+2,Y+3,OT-4,OT-6)}}
    else if(c.k==='pit'){og.fillStyle='#0B1015';og.fillRect(X,Y,OT,OT);og.strokeStyle='#3A4A55';og.lineWidth=1.5;og.strokeRect(X+2,Y+2,OT-4,OT-4)}
    else if(c.k==='rail')dgDrawRail(og,OT,x,y);
    else if(c.k==='pad')dgDrawPad(og,OT,x,y,c.t);
    else if(c.k==='bollard'){og.fillStyle='#2B353D';og.fillRect(X+4,Y+4,OT-8,OT-8);og.fillStyle=BDC.brass;og.beginPath();og.arc(X+OT/2,Y+OT/2,OT*.26,0,7);og.fill();og.strokeStyle='#F6C46D';og.lineWidth=2;og.stroke()}
    else if(c.k==='crate'||c.k==='padcrate'){og.fillStyle='#7D5636';og.fillRect(X+3,Y+3,OT-6,OT-6);og.strokeStyle=BDC.brass;og.lineWidth=2;og.strokeRect(X+3,Y+3,OT-6,OT-6);
      if(c.k==='padcrate'){og.strokeStyle='#F6C46D';og.lineWidth=4;og.beginPath();if(c.t==='/'){og.moveTo(X+7,Y+OT-7);og.lineTo(X+OT-7,Y+7)}else{og.moveTo(X+7,Y+7);og.lineTo(X+OT-7,Y+OT-7)}og.stroke()}}
    else if(c.k==='valve'){og.fillStyle='#25333E';og.fillRect(X+3,Y+3,OT-6,OT-6);og.strokeStyle=c.unlocked?BDC.waterHi:BDC.rust;og.lineWidth=3;og.beginPath();og.arc(X+OT/2,Y+OT/2,OT*.3,0,7);og.stroke();og.beginPath();og.moveTo(X+OT*.2,Y+OT/2);og.lineTo(X+OT*.8,Y+OT/2);og.moveTo(X+OT/2,Y+OT*.2);og.lineTo(X+OT/2,Y+OT*.8);og.stroke()}
    else if(c.k==='hull'){og.fillStyle='#6E4A2E';og.fillRect(X+1,Y+1,OT-2,OT-2);og.strokeStyle='#A9542F';og.lineWidth=2;og.strokeRect(X+2,Y+2,OT-4,OT-4)}
    else if(c.k==='sunken'){og.fillStyle='rgba(159,198,216,.22)';og.beginPath();og.arc(X+OT/2,Y+OT/2,OT*.24,0,7);og.fill()}
    else if(c.k==='tgt')dgDrawTarget(og,OT,x,y,c.o,st,tm);
    else if(c.k==='hb')dgDrawHeavy(og,OT,x,y,0);
    else if(c.k==='track'){og.fillStyle='#1C2630';og.fillRect(X,Y+4,OT,OT-8);og.fillStyle='#9FC6D8';og.fillRect(X,Y+7,OT,2);og.fillRect(X,Y+OT-9,OT,2)}
    else if(c.k==='obj'){og.fillStyle='#3A3020';og.fillRect(X+3,Y+OT*.2,OT-6,OT*.68);og.strokeStyle=BDC.brass;og.lineWidth=2;og.strokeRect(X+3,Y+OT*.2,OT-6,OT*.68)}
    else if(c.bar||c.gate)dgDrawBar(og,OT,x,y,{up:true,col:BDC.brass,pat:'stripe'},tm);
  }
  // Room-specific overlays
  if(M.id==='bd3'&&b.solved.bridge&&!b.got.k1)dgDrawCard(og,OT,2,4,tm);
  if(M.id==='bd7'&&!b.got.k2)dgDrawCard(og,OT,11,2,tm);
  if(M.id==='bd9'){
    for(const [sx,sy] of R.safe){og.fillStyle='rgba(88,255,176,.18)';og.fillRect(sx*OT+2,sy*OT+2,OT-4,OT-4);og.strokeStyle=BDC.green;og.lineWidth=2;og.strokeRect(sx*OT+3,sy*OT+3,OT-6,OT-6)}
    if(st.on){
      for(const w of st.warn){og.fillStyle='rgba(232,163,61,.28)';if(w.v)og.fillRect(w.lane*OT+OT*.38,2*OT,OT*.24,OT*8);else og.fillRect(OT,w.lane*OT+OT*.38,OT*12,OT*.24)}
      for(const f of st.flags){og.fillStyle=BDC.brass;og.fillRect(f.x*OT+OT*.25,f.y*OT+OT*.25,OT*.5,OT*.5)}
      const ox=st.ox*OT+OT/2,oy=st.oy*OT+OT/2;
      og.fillStyle=st.stun>0?BDC.green:BDC.rust;og.beginPath();og.arc(ox,oy,OT*.42,0,7);og.fill();og.strokeStyle=BDC.brass;og.lineWidth=3;og.stroke();
      for(let i=0;i<3;i++){og.fillStyle=i<st.ohp?BDC.brass:'rgba(255,255,255,.2)';og.fillRect(ox-OT*.35+i*OT*.26,oy-OT*.62,OT*.2,4)}
      for(let i=0;i<3;i++){og.fillStyle=i<st.hp?BDC.red:'rgba(255,255,255,.18)';og.beginPath();og.arc(OW.px*OT+OT/2+(i-1)*OT*.28,OW.py*OT-OT*.55,OT*.1,0,7);og.fill()}
    }
  }
  if(M.id==='bd11'){
    const sx=R.sledX(st);og.fillStyle=BDC.rust;og.fillRect(sx*OT+3,7*OT+4,OT-6,OT-8);
    if(st.ride)dgDrawHeavy(og,OT,sx,6.8,1);
    if(st.carry)dgDrawHeavy(og,OT,OW.px,OW.py-.75,1);
    og.strokeStyle=st.done?BDC.green:BDC.brass;og.lineWidth=3;og.beginPath();og.arc(11*OT+OT/2,3*OT+OT/2,OT*.4,0,7);og.stroke();
    if(!st.done){const r=st.ref;og.fillStyle='#111';og.beginPath();og.arc(r.x*OT+OT/2,r.y*OT+OT/2,OT*.35,0,7);og.fill();og.strokeStyle='#fff';og.lineWidth=2;og.stroke()}
  }
  if(R.movers)for(const m of R.movers(st))if(m.o.kind!=='otto')dgDrawTarget(og,OT,m.x,m.y,m.o,st,tm,true);
  if(DG.fly)dgDrawBall(og,OT,DG.fly);
  if(DG.hfly){const h=DG.hfly,x=h.x0+(h.x1-h.x0)*h.t,y=h.y0+(h.y1-h.y0)*h.t-Math.sin(h.t*Math.PI)*.9;dgDrawHeavy(og,OT,x,y,1)}
  if(BD.hookAnim){
    const h=BD.hookAnim,cx=h.x0+(h.x1-h.x0)*Math.min(1,h.t),cy=h.y0+(h.y1-h.y0)*Math.min(1,h.t);
    og.strokeStyle='#D9B472';og.lineWidth=3;og.beginPath();og.moveTo(h.x0*OT+OT/2,h.y0*OT+OT/2);og.lineTo(cx*OT+OT/2,cy*OT+OT/2);og.stroke();
    og.fillStyle=BDC.brass;og.beginPath();og.arc(cx*OT+OT/2,cy*OT+OT/2,OT*.16,0,7);og.fill();
  }
  if(DG.pings){for(const p of DG.pings){p.t-=dt;og.strokeStyle=p.c;og.globalAlpha=Math.max(0,p.t*2);og.lineWidth=3;og.beginPath();og.arc(p.x*OT+OT/2,p.y*OT+OT/2,OT*(.3+(.5-p.t)*1.2),0,7);og.stroke();og.globalAlpha=1}DG.pings=DG.pings.filter(p=>p.t>0)}
  if(DG.flash>0){og.fillStyle='rgba(255,59,92,'+(DG.flash*.45)+')';og.fillRect(OW.px*OT-OT*.2,OW.py*OT-OT*.6,OT*1.4,OT*1.6)}
};

/* ---- TEST: BASIN DUNGEON Dev Button & QA Harness (window.CFBD) ---- */
var BD_STASH='street_gridiron_v1_test_basin_stash';
function bdTestSetup(){
  try{
    if(!svGet(BD_STASH))svSet(BD_STASH,JSON.stringify(SAVE));
    SAVE.beaten=['cats','kings','rollers','captain','baitdogs','longshore','gantry'];
    if(!SAVE.dg)SAVE.dg={};SAVE.dg.arena=Object.assign(dgS(),{ball:true,cleared:true});
    SAVE.dg.basin={};bdS();BD.st={};BD.gateSeen=false;BD.taunt={};
    SAVE.ow={map:'harbor',x:24,y:19,d:'d',gates:1,ret:null};persist();owShow();
  }catch(e){console.error(e)}
}
function bdTestRestore(){
  try{const raw=svGet(BD_STASH);if(!raw)return false;SAVE=JSON.parse(raw);BD.st={};try{localStorage.removeItem(BD_STASH)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}persist();return true}catch(e){console.error(e);return false}
}
setTimeout(()=>{
  if(!window.CF_TEST)return;const back=document.getElementById('mPXback');if(!back||document.getElementById('mBD'))return;
  const c=document.createElement('button');c.className='btn';c.id='mBD';c.textContent='TEST: BASIN DUNGEON';c.onclick=()=>bdTestSetup();
  back.parentNode.insertBefore(c,back);
  const old=back.onclick;back.onclick=e=>{bdTestRestore();if(old)old(e)};
},55);
window.CFBD={BD,BDR,BD_ROOMS,bdS,bdHook,bdToggleWater,bdGo,bdDone,bdCrews,bdTestSetup,bdTestRestore,bdReachedBram};

/* ---- Auto-place player at Hale Harbor Basin Dungeon entrance (B01 door: 24,20) ---- */
(function(){
  try{
    if(SAVE&&SAVE.bdStartV!==2){
      SAVE.bdStartV=2;
      SAVE.tRef=1;SAVE.tPlaza=1;
      SAVE.hbMapV=typeof HB_MAPV!=='undefined'?HB_MAPV:(SAVE.hbMapV||1);
      SAVE.beaten=Array.from(new Set((SAVE.beaten||[]).concat(['cats','kings','rollers','captain','baitdogs','longshore','gantry'])));
      if(!SAVE.dg)SAVE.dg={};
      SAVE.dg.arena=Object.assign(dgS(),{ball:true,cleared:true});
      SAVE.dg.basin={};bdS();BD.st={};
      SAVE.ow={map:'harbor',x:24,y:19,d:'d',gates:1,ret:null};
      persist();
      owShow();
      setTimeout(()=>owToast('THE BASIN · PRESS DOWN TO ENTER DUNGEON'),500);
    }
  }catch(e){console.error('bdStartV error',e)}
})();
/* ================= end v3.30 BASIN DUNGEON ================= */
/* ================= v3.31 FIELD DRILLS (REAL 3D KAYKIT MODELS ON REAL TOWN FIELDS) =================
   - Runs directly inside the live 3D match engine (drawField(), P3D.draw() KayKit skinned models, real town stadiums,
     real Runner Camera, real stickWorld() / doJuke() / doSpin() / doStiff() / ragdoll() / popups).
   - SHELVED_MINIS = true: shelves Crane Drop, Hanging-Tire Throw, and Net Drag cleanly.
   - Town 1 Arcade (Pixel Palace): Catch Rush. Town 2 Arcade (Salt Arcade): Riptide's Boat Race.
   - Recurring Field-Drill Host: COACH VANCE in Vapor City (18,16) and Hale Harbor (26,19).
   - Town 1 Field Drill: RUSHING ATTACK (Vapor City neon stadium, 3D KayKit RB/OL/DEF, neon gates & tackle dummies).
   - Town 2 Field Drill: CRUSH THE CARRIER (Hale Harbor concrete field, 4-way 3D KayKit keep-away brawl & fumbles).
   - Town 3 Field Drill: PRECISION PASSING (reserved in FIELD_DRILLS for Cinderhold). */

window.SHELVED_MINIS = true;

/* ---- Town 2 Salt Arcade -> Riptide Boat Race Swap ---- */
var _origHbArcadeAsk = hbArcadeAsk;
hbArcadeAsk = function(n){
  if(!window.SHELVED_MINIS)return _origHbArcadeAsk(n);
  const T=hbS(),won=(SAVE.arcWon||[]).includes(2);
  owAsk(n.name,'Play RIPTIDE BOAT RACE? Alternate left/right taps to row round the island in under 33.0s.'+(won?'':'  Win for Trawl Knit jersey + Dock Cuff pants.')+(T.raceBest?'  Best: '+T.raceBest.toFixed(2)+'s':''),[['RACE',()=>hbRaceArcade(n)],['NOT NOW']]);
};
function hbRaceArcade(n){
  hbRace(n);
  const iv=setInterval(()=>{
    const el=document.getElementById('race');
    if(!el||el.style.display==='none'){
      clearInterval(iv);
      const T=hbS();
      if(T.raceBest&&T.raceBest<33.0&&!(SAVE.arcWon||[]).includes(2)){
        SAVE.arcWon=(SAVE.arcWon||[]).concat(2);persist();
        setTimeout(()=>owSay(n.name,['Beat 33.0s clean!','★ PRIZE: Trawl Knit jersey + Dock Cuff pants','Wear them at the Clubhouse mirror.']),350);
      }
    }
  },400);
}

/* ---- Field Drills Save Schema & Registry ---- */
function fdS(){
  if(!SAVE.drills||typeof SAVE.drills!=='object')SAVE.drills={};
  for(const id of ['t1_rush','t2_crush','t3_pass'])if(!SAVE.drills[id])SAVE.drills[id]={best:0,medal:0};
  return SAVE.drills;
}
var FIELD_DRILLS={
  t1_rush:{
    id:'t1_rush',town:'Vapor City',name:'RUSHING ATTACK',
    blurb:'60s on-field RB gauntlet on Vapor City turf. Hit neon bonus gates, cut past tackle dummies, break tackles with Juke/Spin/Stiff-Arm, and score TDs.',
    medals:[1400,2600,4000],time:60
  },
  t2_crush:{
    id:'t2_crush',town:'Hale Harbor',name:'CRUSH THE CARRIER',
    blurb:'75s 4-way keep-away brawl on Hale Harbor turf. Hold the ball (+15/sec), chain Jukes/Spins/Stiff-Arms/Wall-Jukes, crush carriers for fumbles, and hold the 2x Hotspot.',
    medals:[1500,2800,4200],time:75
  },
  t3_pass:{
    id:'t3_pass',town:'Cinderhold',name:'PRECISION PASSING',
    blurb:'Reserved for Town 3: Madden 2004 Mini-Camp ring-route passing drill.',
    medals:[1200,2400,3800],time:60,reserved:true
  }
};
function fdMedalName(m){return ['NONE','BRONZE','SILVER','GOLD'][m||0]}
function fdAward(id,score){
  const cfg=FIELD_DRILLS[id],st=fdS()[id];
  const prevBest=st.best||0,prevMedal=st.medal||0;
  if(score>prevBest)st.best=score;
  let newMedal=prevMedal;
  for(let i=0;i<3;i++)if(score>=cfg.medals[i])newMedal=Math.max(newMedal,i+1);
  const gained=Math.max(0,newMedal-prevMedal);
  if(gained>0){st.medal=newMedal;SAVE.upPts=(SAVE.upPts||0)+gained}
  persist();
  return {best:st.best,medal:st.medal,gained,newRecord:score>prevBest};
}
function fdTalk(n){
  const id=n.drill||'t1_rush',cfg=FIELD_DRILLS[id],st=fdS()[id];
  const medTxt='Best: '+(st.best||0)+'  ·  Medal: '+fdMedalName(st.medal)+' (B:'+cfg.medals[0]+' / S:'+cfg.medals[1]+' / G:'+cfg.medals[2]+')';
  owAsk('COACH VANCE · '+cfg.name,cfg.blurb+'\n'+medTxt,[['START DRILL',()=>startFieldDrill(id)],['NOT NOW']]);
}

/* ---- Launch Drill Directly Inside the Real 3D Match Engine ---- */
function fdEnsureExitBtn(){
  let b=document.getElementById('fdExitBtn');
  if(!b){
    b=document.createElement('button');b.id='fdExitBtn';b.textContent='EXIT DRILL';
    b.style.cssText='position:fixed;left:12px;top:calc(env(safe-area-inset-top,0px) + 12px);z-index:85;padding:8px 14px;border-radius:8px;border:2px solid #ffd23a;background:rgba(10,16,24,.88);color:#fff;font-family:var(--disp);font-size:14px;cursor:pointer';
    b.onclick=()=>fdEndDrill(true);
    document.body.appendChild(b);
  }
  b.hidden=false;return b;
}
function fdSyncBtns(){
  const dr=G&&G.drill,rot=$('#rotMsg')&&!$('#rotMsg').hidden;
  let sb=document.getElementById('fdStartBtn');
  if(!sb){
    sb=document.createElement('button');sb.id='fdStartBtn';sb.textContent='START';
    sb.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:86;padding:18px 46px;border-radius:14px;border:3px solid #ffd23a;background:rgba(10,18,28,.94);color:#ffd23a;font-family:var(--disp);font-size:32px;letter-spacing:.08em;box-shadow:0 0 28px rgba(255,210,58,.45);cursor:pointer';
    sb.onclick=()=>{if(G&&G.drill&&!G.drill.started){G.drill.started=true;SND.fx('bong');fdSyncBtns()}};
    document.body.appendChild(sb);
  }
  sb.hidden=!(dr&&!dr.started&&!dr.over&&!rot);

  let tb=document.getElementById('fdTackleBtn');
  if(!tb){
    tb=document.createElement('button');tb.id='fdTackleBtn';tb.textContent='TACKLE';
    tb.style.cssText='position:fixed;right:20px;bottom:calc(env(safe-area-inset-bottom,0px) + 124px);z-index:86;width:82px;height:82px;border-radius:50%;border:3px solid #ff3b5c;background:rgba(42,10,16,.92);color:#fff;font-family:var(--disp);font-size:17px;letter-spacing:.04em;box-shadow:0 0 18px rgba(255,59,92,.55);cursor:pointer';
    tb.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();fdDoTackleDive()});
    document.body.appendChild(tb);
  }
  const showTackle=!!(dr&&dr.id==='t2_crush'&&dr.started&&!dr.over&&!rot&&(dr._loose||F.carrier!==dr.players[0]));
  tb.hidden=!showTackle;
}
function fdDoTackleDive(){
  const dr=G&&G.drill;if(!dr||dr.id!=='t2_crush'||!dr.started||dr.over)return;
  const you=dr.players[0];if(!you||you.fall||you.stun>0||you.tackleDive||(you.cdT||0)>0)return;
  if(!dr._loose&&F.carrier===you)return;
  const tgt=(!dr._loose&&F.carrier)?F.carrier:dr.ball;
  let dx=tgt.x-you.x,dy=tgt.y-you.y,d=Math.hypot(dx,dy);
  if(d<.2){dx=Math.cos(you.fa||0);dy=Math.sin(you.fa||0);d=1}
  const sp=16.8;
  you.tackleDive={t:0,T:.34,vx:(dx/d)*sp,vy:(dy/d)*sp,hit:false};
  you.cdT=.75;you.fa=Math.atan2(dy,dx);
  SND.fx('juke');dust(you.x,you.y,8,.9);
}

function startFieldDrill(id){
  const cfg=FIELD_DRILLS[id];if(!cfg||cfg.reserved)return;
  SND.fx('bong');OW.busy=true;owSave();owHide();
  if(typeof owRelease==='function')owRelease();
  SND.setMode('game');SPR.clear();
  const crew=(id==='t2_crush'&&typeof HB_CREWS!=='undefined')?Object.assign({},HB_CREWS[3],{town2:true}):CREWS[0];
  G_oppUniPending=awayUni(crew);
  G={crew,oppUni:G_oppUniPending,you:0,opp:0,target:99,los:65,down:1,togo:25,ltg:90,style:0,sp:{m:{},ready:null,left:0,cool:0},spArmed:false,dv:{plays:0,yds:0},pn:0,t0:performance.now(),sel:0,flip:false,mode:'live',call:'bal',clock:0,clockOn:false,showPlay:false,drill:null};
  PLAY={id:'drill_'+id,kind:'run',hand:0,name:cfg.name};
  screens(null);show('#hud',false);show('#sheet',false);show('#setbar',false);show('#ctl',true);show('#turboWrap',true);show('#turboLbl',true);
  fdEnsureExitBtn();

  if(window.P3DCFG){window.P3DCFG._baseTilt=window.P3DCFG._baseTilt||window.P3DCFG.tilt;window.P3DCFG.tilt=1.02}
  if(id==='t1_rush')fdInitRush3D();
  else fdInitCrush3D();
  try{const t=$('#thr');if(t)t.style.visibility='hidden'}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  if(typeof syncLand==='function')syncLand();
  fdSyncBtns();
  artWarm();
}

function fdEndDrill(aborted){
  const dr=G&&G.drill;
  for(const bid of ['fdExitBtn','fdStartBtn','fdTackleBtn']){const el=document.getElementById(bid);if(el)el.hidden=true;}
  show('#ctl',false);show('#turboWrap',false);show('#turboLbl',false);
  const id=dr?dr.id:null,score=dr?Math.round(dr.score):0;
  if(window.P3DCFG&&window.P3DCFG._baseTilt)window.P3DCFG.tilt=window.P3DCFG._baseTilt;
  if(G)G.drill=null;
  F=null;G=null;OW.busy=false;
  owShow();
  if(!aborted&&id){
    const res=fdAward(id,score);
    const lines=['Final Score: '+score+'  (Best: '+res.best+')','Medal: '+fdMedalName(res.medal)];
    if(res.gained>0)lines.push('★ +'+res.gained+' UPGRADE POINT'+(res.gained>1?'S':''));
    setTimeout(()=>owSay('COACH VANCE',lines,res.gained>0?()=>owToast('+'+res.gained+' UPGRADE PTS'):null),250);
  }
}

/* Tap/click on match canvas when drill is over to return to Coach Vance */
addEventListener('pointerdown',e=>{
  if(!OWON&&G&&G.drill&&G.drill.over&&performance.now()-G.drill.overAt>600){
    e.stopPropagation();fdEndDrill(false);
  }
},true);
addEventListener('keydown',e=>{
  if(!OWON&&G&&G.drill){
    const k=(e.key||'').toLowerCase();
    if(k==='escape')fdEndDrill(true);
    else if(!G.drill.started&&(k===' '||k==='enter')){G.drill.started=true;SND.fx('bong');fdSyncBtns()}
    else if(G.drill.started&&G.drill.id==='t2_crush'&&(k===' '||k==='k'))fdDoTackleDive();
  }
});

/* =====================================================================
   TOWN 1 (3D): RUSHING ATTACK — Real Vapor City Stadium + 3D KayKit Models
   Field coords: x in [4, 56] (CX=30), y from 65 -> 100 (End Zone!)
   ===================================================================== */
function fdInitRush3D(){
  G.drill={id:'t1_rush',started:false,time:60,score:0,rep:1,mult:1,tds:0,broken:0,over:false,overAt:0,pause:0,gates:[],dummies:[]};
  fdSpawnRushRep3D();
}
function fdSpawnRushRep3D(){
  const dr=G.drill;
  F={cn:{},mode:'live',los:65,t:0,fx:1,off:{},offList:[],def:[],all:[],ball:null,ballAir:false,carrier:null,passer:null,turbo:100,tired:false,handed:true,lock:false,lat:false,latDone:false,latT:0,aim:null,gb:false,breaks:0,maxBreaks:9,stars:new Set()};
  parts.length=0;
  // Eli (3D KayKit RB)
  const rb=mkP('O','RB',SAVE.starters.RB||{name:'Eli Voss',pos:'RB',spd:84,pow:78,hnd:80},CX,65);
  rb.num=SAVE.starters.RB&&SAVE.starters.RB.jn!==undefined?SAVE.starters.RB.jn:22;
  rb.fa=Math.PI/2;rb._lastY=65;
  F.off.RB=rb;F.offList.push(rb);F.all.push(rb);F.carrier=rb;
  // Lead Blocker (3D KayKit Big-Body OL)
  const ol=mkP('O','OL1',SAVE.starters.OL1||{name:'Lead Block',pos:'OL',spd:74,pow:84,blk:84},CX,70);
  ol.num=74;ol.fa=Math.PI/2;
  F.off.OL1=ol;F.offList.push(ol);F.all.push(ol);
  // Bonus Gates (2 Cyan +100, 1 narrow Gold +250)
  const sgn=(dr.rep%2?1:-1);
  dr.gates=[
    {x:CX+sgn*9,y:76,w:6.2,gold:false,hit:false},
    {x:CX-sgn*8,y:85,w:6.2,gold:false,hit:false},
    {x:CX+(dr.rep%3===0?0:sgn*11),y:93,w:4.8,gold:true,hit:false}
  ];
  // Padded Tackle Dummies on the turf
  dr.dummies=[
    {x:CX-sgn*4,y:73,r:1.5},
    {x:CX+sgn*3,y:82,r:1.5},
    {x:CX-sgn*5,y:90,r:1.5}
  ];
  // Escalating 3D KayKit Defenders (2 -> 4)
  const nDef=Math.min(4,2+Math.floor((dr.rep-1)/2));
  for(let i=0;i<nDef;i++){
    const role=i===0?'LB':'DB';
    const d0=mkDef(role,G.crew,'bal',i===0);
    const sx=CX+(i-(nDef-1)/2)*11,sy=78+((i*6)%16);
    const def=mkP('D',role,d0,sx,sy);
    def.id='d'+i;def.num=54+i*7;def.fa=-Math.PI/2;
    F.def.push(def);F.all.push(def);
  }
}

/* =====================================================================
   TOWN 2 (3D): CRUSH THE CARRIER — Real Hale Harbor Stadium + 4x 3D KayKit
   Field coords: x in [6, 54], y in [36, 76] (walled concrete harbor field)
   ===================================================================== */
function fdInitCrush3D(){
  G.drill={id:'t2_crush',started:false,time:75,score:0,over:false,overAt:0,streak:1,hot:{x:CX,y:56,r:6.2,t:20},ball:{x:CX,y:56,vx:0,vy:0,z:0,vz:0},players:[]};
  F={cn:{},mode:'live',los:56,t:0,fx:1,off:{},offList:[],def:[],all:[],ball:null,ballAir:false,carrier:null,passer:null,turbo:100,tired:false,handed:true,lock:false,lat:false,latDone:false,latT:0,aim:null,gb:false,breaks:0,maxBreaks:9,stars:new Set()};
  parts.length=0;
  // Eli (3D KayKit RB — player controlled)
  const you=mkP('O','RB',SAVE.starters.RB||{name:'Eli Voss',pos:'RB',spd:85,pow:80,hnd:82},CX-10,56);
  you.num=22;you.fa=0;you._drillYou=true;you._dName='ELI';you._dScore=0;
  F.off.RB=you;F.offList.push(you);F.all.push(you);F.carrier=null;
  // 3 Real 3D KayKit Hale Harbor Bruisers (Otto Big-Body DL, Deke LB, Quinn DB)
  const rivals=[
    {role:'DL',name:'OTTO',num:99,x:CX+10,y:62},
    {role:'LB',name:'DEKE',num:55,x:CX+10,y:50},
    {role:'DB',name:'QUINN',num:24,x:CX,y:66}
  ];
  for(const rv of rivals){
    const d0=mkDef(rv.role,G.crew,'bal',rv.role==='DL');
    const p=mkP('D',rv.role,d0,rv.x,rv.y);
    p.num=rv.num;p.fa=Math.PI;p._drillYou=false;p._dName=rv.name;p._dScore=0;
    F.def.push(p);F.all.push(p);
  }
  G.drill.players=[you,...F.def];
  // Player starts WITH the ball!
  F.carrier=you;G.drill._loose=false;G.drill.ball.x=you.x;G.drill.ball.y=you.y;
}

/* ---- 3D Drill Physics Step (called directly from main RAF loop!) ---- */
function fdStep3D(rdt){
  const dr=G.drill;if(!dr)return;
  fdSyncBtns();
  const rot=$('#rotMsg')&&!$('#rotMsg').hidden;
  if(!dr.started||dr.over||rot)return;
  const dt=Math.min(.04,rdt*timeScale);
  F.t+=dt;
  dr.time-=dt;
  if(dr.time<=0){dr.time=0;dr.over=true;dr.overAt=performance.now();SND.fx('ok2');return}
  if(dr.id==='t1_rush')fdStepRush3D(dr,dt);
  else fdStepCrush3D(dr,dt);
}

function fdStepRush3D(dr,dt){
  if(dr.pause>0){dr.pause-=dt;if(dr.pause<=0)fdSpawnRushRep3D();return}
  const c=F.carrier;if(!c)return;
  // Tick player cooldowns & real moveCarrier (gives real 3D Juke, Spin, Stiff-Arm, Hurdle, Turbo!)
  for(const p of F.all){
    if(p.cdJ>0)p.cdJ-=dt;if(p.cdS>0)p.cdS-=dt;if(p.cdH>0)p.cdH-=dt;if(p.cdT>0)p.cdT-=dt;
    if(p.inv>0)p.inv-=dt;if(p.slow>0)p.slow-=dt;if(p.stun>0)p.stun-=dt;
    if(p.arm>0)p.arm-=dt;if(p.spinT>0){p.spinT-=dt;p.spin=p.spinT}
    if(p.fall){p.x+=p.sv.x*dt;p.y+=p.sv.y*dt;p.sv.x*=.92;p.sv.y*=.92;if(p.stun<=0){p.fall=false;p.knock=false}}
  }
  moveCarrier(dt);
  c.x=clamp(c.x,3,FW-3);c.y=clamp(c.y,60,101);
  // Yardage score
  if(c.y>c._lastY){dr.score+=(c.y-c._lastY)*6;c._lastY=c.y}
  // Bonus gates
  for(const g of dr.gates){
    if(!g.hit&&Math.abs(c.y-g.y)<1.4&&Math.abs(c.x-g.x)<g.w/2+.8){
      g.hit=true;const pts=(g.gold?250:100)*dr.mult;dr.score+=pts;
      if(g.gold)dr.mult=Math.min(4,dr.mult+1);
      SND.fx('ok');popup((g.gold?'GOLD GATE +':'GATE +')+pts,g.x,g.y+1.2,g.gold?'#ffd23a':'#27e0ff');
    }
  }
  // Tackle dummies (push back unless hurdling or spinning)
  for(const dm of dr.dummies){
    const d=Math.hypot(c.x-dm.x,c.y-dm.y);
    if(d<dm.r+.7&&!c.air&&!(c.spinT>0)){
      const nx=(c.x-dm.x)/(d||1),ny=(c.y-dm.y)/(d||1);
      c.x=dm.x+nx*(dm.r+.8);c.y=dm.y+ny*(dm.r+.8);SND.fx('drop');
    }
  }
  // Lead Blocker seeks nearest active defender
  const ol=F.off.OL1;
  if(ol&&!ol.fall){
    let best=null,bd=1e9;
    for(const d of F.def){if(d.stun>0||d.fall)continue;const dd=Math.hypot(d.x-ol.x,d.y-ol.y);if(dd<bd){bd=dd;best=d}}
    if(best){
      const dx=best.x-ol.x,dy=best.y-ol.y,len=Math.hypot(dx,dy)||1;
      ol.vx=dx/len*6.4;ol.vy=dy/len*6.4;ol.x+=ol.vx*dt;ol.y+=ol.vy*dt;ol.ph+=dt*2.4;
      if(len<1.5){best.stun=1.1;best.vx=best.vy=0;dust(best.x,best.y,6,.8);SND.fx('hit')}
    }
  }
  // Defenders pursue & tackle / get juked-spun-trucked
  for(const d of F.def){
    if(d.fall||d.stun>0)continue;
    const dx=c.x-d.x,dy=c.y-d.y,len=Math.hypot(dx,dy)||1,sp=defSpeed(d);
    d.vx=dx/len*sp;d.vy=dy/len*sp;d.x+=d.vx*dt;d.y+=d.vy*dt;d.ph+=dt*2.6;
    if(len<1.45){
      const evading=!!(c.dash||c.inv>0||c.spinT>0||c.arm>0||c.air);
      if(evading){
        dr.broken++;dr.mult=Math.min(4,dr.mult+1);
        const pts=(c.arm>0?125:100)*dr.mult;dr.score+=pts;
        const lbl=c.arm>0?'TRUCKED! +':c.spinT>0?'SPUN HIM! +':'ANKLE BREAKER! +';
        ragdoll(d,-dx/len*7,-dy/len*7,6,1.5);dust(d.x,d.y,8,1);
        SND.fx(c.arm>0?'stiffHit':'ankle');popup(lbl+pts,c.x,c.y+1.5,'#ff2fa8');
      }else{
        ragdoll(c,dx/len*3,dy/len*3,3,.8);dust(c.x,c.y,10,1.1);
        SND.fx('hit');popup('TACKLED!',c.x,c.y+1.5,'#ff3b5c');
        dr.mult=1;dr.rep++;dr.pause=1.0;return;
      }
    }
  }
  updFacing(dt);
  // End Zone TD!
  if(c.y>=100){
    const pts=400*dr.mult;dr.score+=pts;dr.tds++;dr.rep++;
    SND.fx('ok2');popup('TOUCHDOWN! +'+pts,c.x,99,'#58ffb0');dr.pause=1.0;
  }
}

function fdStepCrush3D(dr,dt){
  const you=dr.players[0];
  // Rotate 2x Hotspot every 20s
  dr.hot.t-=dt;
  if(dr.hot.t<=0){dr.hot.t=20;dr.hot.x=14+Math.random()*32;dr.hot.y=42+Math.random()*26;SND.fx('q');popup('2x HOTSPOT SHIFTED!',dr.hot.x,dr.hot.y+1.5,'#E8A33D')}
  // Cooldowns & ragdoll recovery
  for(const p of dr.players){
    if(p.cdJ>0)p.cdJ-=dt;if(p.cdS>0)p.cdS-=dt;if(p.cdH>0)p.cdH-=dt;if(p.cdT>0)p.cdT-=dt;
    if(p.inv>0)p.inv-=dt;if(p.slow>0)p.slow-=dt;if(p.stun>0)p.stun-=dt;
    if(p.arm>0)p.arm-=dt;if(p.spinT>0){p.spinT-=dt;p.spin=p.spinT}
    if(p.fall){p.x+=p.sv.x*dt;p.y+=p.sv.y*dt;p.sv.x*=.9;p.sv.y*=.9;if(p.stun<=0){p.fall=false;p.knock=false}}
  }
  // Move Eli with real match stick + Juke/Spin/Stiff-Arm
  const prevDash=!!you.dash;
  if(!you.fall&&you.stun<=0){
    if(you.tackleDive){
      const td=you.tackleDive;td.t+=dt;you.vx=td.vx;you.vy=td.vy;
      you.x=clamp(you.x+td.vx*dt,6,FW-6);you.y=clamp(you.y+td.vy*dt,36,76);
      you.ph+=dt*3.2;you.fallV=1;
      if(td.t>=td.T){you.tackleDive=null;if(!td.hit){you.stun=.32;you.vx*=.2;you.vy*=.2}}
    }else if(you.dash){
      you.dash.t-=dt;you.x+=you.dash.vx*dt;you.y+=you.dash.vy*dt;you.ph+=dt*2.4;
      if(you.dash.t<=0)you.dash=null;
    }else{
      const sv=stickWorld(),mag=Math.min(1,Math.hypot(sv.x,sv.y));
      const hasBall=!dr._loose&&F.carrier===you;
      const turboOn=!!(input&&input.turbo&&F.turbo>4);
      if(turboOn)F.turbo=Math.max(0,F.turbo-28*dt);else F.turbo=Math.min(100,F.turbo+20*dt);
      const baseSp=hasBall?7.4:7.4*1.1,sp=baseSp*(turboOn?1.18:1)*(you.spinT>0?.82:1);
      const tvx=mag>.05?(sv.x/Math.max(mag,.001))*mag*sp:0,tvy=mag>.05?(sv.y/Math.max(mag,.001))*mag*sp:0;
      const k=Math.min(1,dt*14);
      you.vx+=(tvx-you.vx)*k;you.vy+=(tvy-you.vy)*k;
      you.x+=you.vx*dt;you.y+=you.vy*dt;
      you.ph+=Math.hypot(you.vx,you.vy)*dt*.32;you.spr=turboOn&&mag>.3;
    }
    you.x=clamp(you.x,6,FW-6);you.y=clamp(you.y,36,76);
    if(!prevDash&&you.dash&&!dr._loose&&F.carrier===you&&(you.x<10||you.x>FW-10)){
      const pts=140*dr.streak;you._dScore+=pts;popup('WALL JUKE! +'+pts,you.x,you.y+1.6,'#9FC6D8');
    }
  }
  // AI movement for the 3 Hale Harbor bruisers
  const liveCar=dr._loose?null:F.carrier;
  for(const ai of dr.players){
    if(ai._drillYou||ai.fall||ai.stun>0)continue;
    let tx=dr.ball.x,ty=dr.ball.y;
    if(liveCar===ai){
      let near=null,nd=1e9;
      for(const o of dr.players){if(o===ai||o.fall||o.stun>0)continue;const d=Math.hypot(o.x-ai.x,o.y-ai.y);if(d<nd){nd=d;near=o}}
      if(near&&nd<9){tx=ai.x+(ai.x-near.x)*2;ty=ai.y+(ai.y-near.y)*2}else{tx=dr.hot.x;ty=dr.hot.y}
    }else if(liveCar){tx=liveCar.x;ty=liveCar.y}
    const dx=tx-ai.x,dy=ty-ai.y,len=Math.hypot(dx,dy)||1,carSp=7.4,sp=liveCar===ai?carSp:carSp*1.1;
    ai.vx=dx/len*sp;ai.vy=dy/len*sp;ai.x=clamp(ai.x+ai.vx*dt,6,FW-6);ai.y=clamp(ai.y+ai.vy*dt,36,76);ai.ph+=dt*2.5;
  }
  // Loose fumble ball physics & pickup
  if(dr._loose){
    dr.ball.x=clamp(dr.ball.x+dr.ball.vx*dt,7,FW-7);dr.ball.y=clamp(dr.ball.y+dr.ball.vy*dt,37,75);
    dr.ball.vx*=Math.pow(.22,dt);dr.ball.vy*=Math.pow(.22,dt);
    dr.ball.z=Math.max(0,dr.ball.z+dr.ball.vz*dt);dr.ball.vz-=18*dt;if(dr.ball.z<=0&&dr.ball.vz<0)dr.ball.vz*=-.45;
    F.carrier=you; // keep camera on Eli while chasing loose ball
    for(const p of dr.players){
      if(p.fall||p.stun>0)continue;
      if(Math.hypot(p.x-dr.ball.x,p.y-dr.ball.y)<1.7){
        dr._loose=false;F.carrier=p;SND.fx('pluck');
        if(p._drillYou){popup('SCOOPED!',p.x,p.y+1.5,'#E8A33D');dr.streak=1}
        break;
      }
    }
  }else{
    const car=F.carrier;dr.ball.x=car.x;dr.ball.y=car.y;dr.ball.z=1.1;
    const inHot=Math.hypot(car.x-dr.hot.x,car.y-dr.hot.y)<=dr.hot.r;
    car._dScore+=(inHot?30:15)*dt;
    // Tackle & Instant Fumble check
    for(const p of dr.players){
      if(p===car||p.fall||p.stun>0)continue;
      const d=Math.hypot(p.x-car.x,p.y-car.y);
      const hitR=(p._drillYou&&p.tackleDive)?2.35:1.6;
      if(d<hitR){
        const evading=car._drillYou&&!!(car.dash||car.inv>0||car.spinT>0||car.arm>0);
        if(evading){
          dr.streak=Math.min(4,dr.streak+1);
          const pts=(car.arm>0?110:90)*dr.streak;car._dScore+=pts;
          const lbl=car.arm>0?'TRUCKED! +':car.spinT>0?'SPUN HIM! +':'ANKLE BREAKER! +';
          ragdoll(p,(p.x-car.x)/(d||1)*7,(p.y-car.y)/(d||1)*7,6,1.4);dust(p.x,p.y,8,1);
          SND.fx(car.arm>0?'stiffHit':'ankle');popup(lbl+pts,car.x,car.y+1.6,'#58ffb0');
        }else{
          // TACKLED -> TACKLER IMMEDIATELY GETS THE BALL, EVERYONE ELSE FREEZES FOR 2.0s!
          const ang=Math.atan2(car.y-p.y,car.x-p.x);
          ragdoll(car,Math.cos(ang)*5,Math.sin(ang)*5,6,2.0);dust(car.x,car.y,12,1.2);
          for(const o of dr.players){if(o!==p){o.stun=Math.max(o.stun||0,2.0);o.vx=0;o.vy=0;o.tackleDive=null}}
          dr._loose=false;F.carrier=p;dr.ball.x=p.x;dr.ball.y=p.y;dr.ball.z=1.1;dr.streak=1;
          if(p.tackleDive){p.tackleDive.hit=true;p.tackleDive=null}
          SND.fx(p._drillYou?'ok2':'hit');
          if(p._drillYou){p._dScore+=125;popup('TACKLED! YOUR BALL +125',p.x,p.y+1.8,'#E8A33D')}
          else if(car._drillYou){popup('STRIPPED! FROZEN 2s',car.x,car.y+1.8,'#ff3b5c')}
          else{popup(p._dName+' TOOK IT!',p.x,p.y+1.8,'#9FC6D8')}
          break;
        }
      }
    }
  }
  updFacing(dt);
  dr.score=you._dScore;
}

/* ---- 3D-Perspective Field Props (Gates, Dummies, Hotspot, Loose Ball) ---- */
function fdDrawField3D(){
  const dr=G&&G.drill;if(!dr)return;
  if(dr.id==='t1_rush'){
    // Glowing neon Bonus Gates projected onto the real Vapor City 3D turf
    for(const g of dr.gates){
      const pL=P(g.x-g.w/2,g.y),pR=P(g.x+g.w/2,g.y),gh=Math.max(18,pL.u*2.8);
      const col=g.hit?'#58ffb0':g.gold?'#ffd23a':'#27e0ff';
      ctx.save();
      ctx.strokeStyle=col;ctx.lineWidth=Math.max(3,pL.u*.22);ctx.shadowColor=col;ctx.shadowBlur=12;
      ctx.beginPath();ctx.moveTo(pL.sx,pL.sy);ctx.lineTo(pL.sx,pL.sy-gh);ctx.lineTo(pR.sx,pR.sy-gh);ctx.lineTo(pR.sx,pR.sy);ctx.stroke();
      if(!g.hit){
        ctx.fillStyle=g.gold?'rgba(255,210,58,.18)':'rgba(39,224,255,.14)';
        ctx.beginPath();ctx.moveTo(pL.sx,pL.sy);ctx.lineTo(pL.sx,pL.sy-gh);ctx.lineTo(pR.sx,pR.sy-gh);ctx.lineTo(pR.sx,pR.sy);ctx.fill();
      }
      ctx.restore();
    }
    // Padded Tackle Dummies standing on the turf
    for(const dm of dr.dummies){
      const pr=P(dm.x,dm.y),rw=Math.max(7,pr.u*.85),rh=Math.max(18,pr.u*2.4);
      ctx.save();
      ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,rw*1.1,rw*.42,0,0,7);ctx.fill();
      ctx.fillStyle='#9b3d20';ctx.fillRect(pr.sx-rw*.6,pr.sy-rh,rw*1.2,rh);
      ctx.strokeStyle='#ffd23a';ctx.lineWidth=2;ctx.strokeRect(pr.sx-rw*.6,pr.sy-rh,rw*1.2,rh);
      ctx.restore();
    }
  }else if(dr.id==='t2_crush'){
    // 2x Hotspot Zone projected onto the real Hale Harbor concrete turf
    const pr=P(dr.hot.x,dr.hot.y),rx=pr.u*dr.hot.r,ry=rx*.44;
    ctx.save();
    ctx.fillStyle='rgba(232,163,61,.22)';ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,rx,ry,0,0,7);ctx.fill();
    ctx.strokeStyle='#E8A33D';ctx.lineWidth=3;ctx.setLineDash([8,6]);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='#F6C46D';ctx.font='800 '+Math.max(13,Math.round(pr.u*.9))+'px "Barlow Condensed",sans-serif';ctx.textAlign='center';
    ctx.fillText('2x HOTSPOT',pr.sx,pr.sy+4);
    ctx.restore();
    // Glowing carrier ring under whoever holds the ball
    if(!dr._loose&&F.carrier){
      const pc=P(F.carrier.x,F.carrier.y);
      ctx.save();ctx.strokeStyle='#58ffb0';ctx.lineWidth=3.5;ctx.beginPath();ctx.ellipse(pc.sx,pc.sy,pc.u*1.3,pc.u*.52,0,0,7);ctx.stroke();ctx.restore();
    }
    // Loose bouncing fumble football
    if(dr._loose){
      const pb=P(dr.ball.x,dr.ball.y);
      ctx.save();
      ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.ellipse(pb.sx,pb.sy,Math.max(5,pb.u*.5),Math.max(2,pb.u*.2),0,0,7);ctx.fill();
      ballShape(ctx,pb.sx,pb.sy-dr.ball.z*pb.u*.7,Math.max(5,pb.u*.42),performance.now()/80);
      ctx.restore();
    }
  }
}

/* ---- Crisp Drill HUD Overlay on Top of Real 3D Match Canvas ---- */
function fdDrawHud3D(){
  const dr=G&&G.drill;if(!dr)return;
  ctx.save();
  ctx.fillStyle='rgba(8,14,22,.78)';ctx.fillRect(W/2-230,8,460,44);
  ctx.strokeStyle=dr.id==='t1_rush'?'#27e0ff':'#E8A33D';ctx.lineWidth=2;ctx.strokeRect(W/2-230,8,460,44);
  ctx.font='800 22px "Barlow Condensed",sans-serif';ctx.textAlign='center';ctx.fillStyle='#fff';
  if(dr.id==='t1_rush'){
    ctx.fillText('RUSHING ATTACK · '+Math.round(dr.score)+' PTS · ×'+dr.mult+' · TDs '+dr.tds+' · '+Math.ceil(dr.time)+'s',W/2,37);
  }else{
    const sb=dr.players.map(p=>p._dName+' '+Math.round(p._dScore)).join('  |  ');
    ctx.font='800 18px "Barlow Condensed",sans-serif';
    ctx.fillText(sb+'  ·  '+Math.ceil(dr.time)+'s',W/2,36);
  }
  if(dr.over){
    ctx.fillStyle='rgba(6,12,18,.84)';ctx.fillRect(0,H*.34,W,H*.32);
    ctx.fillStyle='#ffd23a';ctx.font='800 42px "Barlow Condensed",sans-serif';
    ctx.fillText('DRILL COMPLETE · '+Math.round(dr.score)+' PTS',W/2,H*.48);
    ctx.fillStyle='#fff';ctx.font='600 18px sans-serif';
    ctx.fillText('Tap or click anywhere to return to Coach Vance',W/2,H*.57);
  }
  ctx.restore();
}

/* ---- Dev Quick-Launch Buttons & QA Hook ---- */
setTimeout(()=>{
  if(!window.CF_TEST)return;
  const back=document.getElementById('mPXback');if(!back)return;
  for(const [id,lbl,drill] of [['mFD1','TEST: RUSHING ATTACK','t1_rush'],['mFD2','TEST: CRUSH CARRIER','t2_crush']]){
    if(document.getElementById(id))continue;
    const b=document.createElement('button');b.className='btn';b.id=id;b.textContent=lbl;
    b.onclick=()=>startFieldDrill(drill);
    back.parentNode.insertBefore(b,back);
  }
},65);
window.CFDRILL={FIELD_DRILLS,fdS,fdAward,fdTalk,startFieldDrill,fdEndDrill,fdInitRush3D,fdInitCrush3D,fdStep3D,fdDrawField3D,fdDrawHud3D};
/* ================= end v3.31 FIELD DRILLS ================= */



window.SG={eg:w=>endGame(w),f4:()=>showFourth(),snapDbg:()=>{const R=ART.run;const miss=[];for(const [pal,vk] of R.need.slice(0,R.need.n0||0))if(!R.ready.has(pal.key+'|'+vk))miss.push(pal.key.slice(0,12)+'|'+vk);let am=0;for(const pal of artPals())for(const v of'fb')if(!artMaster(pal,v))am++;return {mode:G.mode,on:R.on,inited:R.inited,need:R.need.length,n0:R.need.n0,miss:miss.slice(0,8),nmiss:miss.length,artMissing:am,artReady:artReady(),carryReady:carryReady(),snapReady:ART.snapReady||null,jobs:R.jobs.length,q:R.q.length,busy:R.busy.size,fail:R.fail}},WSEG,CLUSTERS,camfix:o=>{window.__camFix=o},enterPlaycall:()=>enterPlaycall(),cam:()=>cam,LogoRenderer,LOGOS,LOGO_ORDER,registerLogo,logoId,logoSVG,LOGO_GLYPH,muState:()=>MU,lf:()=>ART.lf||[],SIDER:SIDER,RIGF,RIG,runInit,artDraw:(g,o)=>artDraw(g,o),uniFor:p=>uniFor(p),lookOf:d=>lookOf(d),playerPx:(...a)=>playerPx(...a),ART,artNumber:(...a)=>artNumber(...a),say:(a,b,c,d)=>say(a,b,c,d),setX:v=>{bannerExtra=v},popup:(a,b,c,d)=>popup(a,b,c,d),WALLY:()=>WALLY,sideVis:()=>sideVis,setPS:v=>{PSCALE=v;SPR.clear()},owLeave,owHide,P:(x,y)=>P(x,y),SND,OW,owShow,M:()=>M,owPlace,owTalk,owGot,owSay,renderPerson,lookOf,callPlay,endGame,get G(){return G},get F(){return F},get PLAY(){return PLAY},input,SAVE:()=>SAVE,startMatch,CREWS,PLAYS,throwTo,doJuke,doStiff,doStyle,startPlay,setSpeed:v=>{SPEED=v},resetSave:()=>{SAVE=freshSave();persist()},renderTeam,openGear,renderSquad,screens,renderMenu};
if((location.hostname==='127.0.0.1'||location.hostname==='localhost')&&new URLSearchParams(location.search).get('uiqa')==='1'){
  window.SG.__uiqa={
    openReceiver:()=>{
      if(!F||!G||!F.off||!F.off.QB)return false;
      const q=F.off.QB;
      F.mode='live';G.mode='live';F.passer=q;F.carrier=q;F.lock=false;G.clockOn=false;q.d.thr=60;
      window.CUE={on:.1,off:.05,r:.3,k:0};
      for(const d of F.def||[]){d.x=1000;d.y=1000;d.fall=false;d.eng=false}
      for(const role of ['WR1','WR2','TE','RB'])if(F.off[role]){const p=F.off[role];p.hi=false;p.stun=0;p.vx=0;p.vy=0}
      if(F.off.WR1){F.off.WR1.x=q.x+22;F.off.WR1.y=q.y+8}
      if(F.off.WR2){F.off.WR2.x=q.x-22;F.off.WR2.y=q.y+8}
      return true;
    },
    startFumble:()=>{if(!F||!G)return false;F.mode='live';G.mode='live';const c=F.carrier||F.passer||(F.off&&F.off.QB);if(!c)return false;startPile(c,F.def&&F.def[0]);return !!F.pile},
    loseFumble:()=>{if(!F||!F.pile)return false;pileEnd(false);return true},
    defense:()=>{if(!G||!G.crew)return false;G.mode='dead';G.pendFp=35;showDefCall(35);return !$('#dcall').hidden||deferredDefCallFp===35},
    achievement:()=>{if(!ACH||!ACH.length)return false;achToast(ACH[0]);return true},
    postGame:()=>{clearTimeout(tickT);deferredDefCallFp=null;SIMV.on=false;show('#tick',false);show('#dcall',false);endGame(false);return true},
    postGamePracticeWin:async()=>{if(!G||!G.crew)return false;clearTimeout(tickT);SIMV.on=false;show('#tick',false);show('#dcall',false);G.crew.practice=true;G.style=37;G.you=14;G.opp=0;if(F){F.res={type:'td',spot:100};Object.values(F.off||{}).filter(p=>p&&typeof p==='object'&&'x' in p).forEach(p=>{p.celeb=60;p.celebV=0;p.vx=0;p.vy=0;p.fall=false;p.fallK=0;p.lyT=0;p.wasLy=false;p.stun=0;})}show('#hud',true);window.__CF2D_CELEB_SPRITE_RENDERED=0;window.__CF3D_LAST_DRAW=null;const before=window.CF3D?.info?.frames||0;await new Promise(resolve=>{let frames=0;const step=()=>{window.__CF3D_DRAW_ENTITIES();if(++frames>=45)resolve();else requestAnimationFrame(step)};requestAnimationFrame(step)});window.SG.__uiqa.practiceRenderFrameDelta=(window.CF3D?.info?.frames||0)-before;endGame(true);return !$('#end').hidden},
    runnerControls:()=>{if(!F||!G||!F.off||!F.off.QB||!F.off.RB)return false;const q=F.off.QB,rb=F.off.RB;F.mode='live';G.mode='live';F.passer=q;F.carrier=rb;F.ballAir=false;F.lock=false;G.clockOn=false;rb.x=q.x;rb.y=50;rb.hi=false;return true},
    diveControls:()=>{if(!F||!F.carrier)return false;F.carrier.y=96;return true}
  };
}


/* ===== Owner-requested shared-arena pre-game matchup ===== */
function muRGBA(hex,a){const m=String(hex||'').match(/^#([0-9a-f]{6})$/i);if(!m)return 'rgba(120,140,160,'+a+')';const n=parseInt(m[1],16);return 'rgba('+(n>>16)+','+((n>>8)&255)+','+(n&255)+','+a+')'}
function muArenaScene(town){
 const n=String(town||'').toLowerCase();
 if(n.includes('vapor'))return 'vapor-city';
 if(n.includes('hale')||n.includes('harbor'))return 'hale-harbor';
 if(n.includes('gull')||n.includes('reach'))return 'gulls-reach';
 if(n.includes('spillway')||n.includes('channel'))return 'spillway';
 return 'route-field';
}
function muArenaPaint(cv,town){
 const dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(1,cv.clientWidth||innerWidth),h=Math.max(1,cv.clientHeight||innerHeight);
 cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);
 const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
 const th=TOWN_THEMES[town]||TOWN_FALLBACK,tc=th.a||'#E8A33D',tc2=th.b||'#9FC4D4',scene=muArenaScene(town);
 const palettes={
  'vapor-city':{sky:['#11152c','#292447','#111b27'],horizon:'#27243a',turf:['#24423e','#101e23']},
  'hale-harbor':{sky:['#172936','#40545e','#17242a'],horizon:'#2b4149',turf:['#2c493f','#102127']},
  'gulls-reach':{sky:['#253640','#687b82','#27363b'],horizon:'#35464a',turf:['#40503d','#19251f']},
  'spillway':{sky:['#17232d','#43515a','#1b292e'],horizon:'#2e3d42',turf:['#354a40','#14231f']},
  'route-field':{sky:['#17212c','#3b4a52','#1b292e'],horizon:'#2b3b3e',turf:['#30483e','#14231f']}
 };
 const p=palettes[scene]||palettes['route-field'],sky=g.createLinearGradient(0,0,0,h);
 sky.addColorStop(0,p.sky[0]);sky.addColorStop(.43,p.sky[1]);sky.addColorStop(1,p.sky[2]);g.fillStyle=sky;g.fillRect(0,0,w,h);
 const horizon=h*.43;
 g.save();g.globalAlpha=.96;
 if(scene==='vapor-city'){
  const seed=String(town||'').split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  for(let i=0;i<16;i++){const bw=w*(.028+((seed+i*13)%13)/1000),x=i*w/15-bw/2,bh=h*(.12+((seed+i*29)%23)/100),y=h*.43-bh;g.fillStyle=i%3===0?'#17182d':'#202039';g.fillRect(x,y,bw,bh);g.fillStyle='rgba(110,215,235,.42)';for(let wy=y+7;wy<horizon-5;wy+=Math.max(9,h*.035))for(let wx=x+5;wx<x+bw-3;wx+=Math.max(8,bw*.22))g.fillRect(wx,wy,Math.max(2,bw*.07),Math.max(2,h*.009))}
  g.fillStyle='#3b2450';g.fillRect(w*.68,h*.20,w*.12,h*.045);g.strokeStyle='#ff54c8';g.lineWidth=2;g.strokeRect(w*.68,h*.20,w*.12,h*.045);
 }else if(scene==='hale-harbor'){
  g.fillStyle='#304d58';g.fillRect(0,h*.29,w,h*.15);g.fillStyle='#1a3039';g.beginPath();g.moveTo(0,h*.36);g.lineTo(w*.16,h*.32);g.lineTo(w*.3,h*.37);g.lineTo(w*.48,h*.33);g.lineTo(w*.68,h*.37);g.lineTo(w*.84,h*.32);g.lineTo(w,h*.35);g.lineTo(w,h*.44);g.lineTo(0,h*.44);g.fill();
  for(const x of [w*.18,w*.77]){g.strokeStyle='#202e35';g.lineWidth=Math.max(3,w*.004);g.beginPath();g.moveTo(x,h*.42);g.lineTo(x,h*.12);g.lineTo(x+w*.12,h*.28);g.stroke();g.beginPath();g.moveTo(x,h*.18);g.lineTo(x-w*.045,h*.31);g.stroke()}
  g.fillStyle='#17262c';g.beginPath();g.moveTo(w*.34,h*.38);g.lineTo(w*.58,h*.38);g.lineTo(w*.54,h*.415);g.lineTo(w*.38,h*.415);g.fill();
 }else if(scene==='gulls-reach'){
  g.fillStyle='#3a4c50';g.beginPath();g.moveTo(0,h*.31);g.lineTo(w*.12,h*.27);g.lineTo(w*.25,h*.34);g.lineTo(w*.39,h*.29);g.lineTo(w*.53,h*.37);g.lineTo(w*.53,h*.44);g.lineTo(0,h*.44);g.fill();
  g.fillStyle='#26383c';g.beginPath();g.moveTo(w*.78,h*.43);g.lineTo(w*.81,h*.19);g.lineTo(w*.84,h*.19);g.lineTo(w*.87,h*.43);g.fill();g.fillStyle='#d7d5c8';g.fillRect(w*.805,h*.17,w*.07,h*.035);g.fillStyle='#a55132';g.fillRect(w*.80,h*.155,w*.08,h*.018);g.fillStyle='#4b6268';g.fillRect(0,h*.35,w,h*.08);
 }else if(scene==='spillway'){
  g.fillStyle='#26373e';g.beginPath();g.moveTo(0,h*.22);g.lineTo(w*.16,h*.28);g.lineTo(w*.16,h*.44);g.lineTo(0,h*.44);g.fill();g.beginPath();g.moveTo(w,h*.22);g.lineTo(w*.84,h*.28);g.lineTo(w*.84,h*.44);g.lineTo(w,h*.44);g.fill();
  g.strokeStyle='#82949a';g.lineWidth=Math.max(3,w*.006);for(const x of [w*.24,w*.76]){g.beginPath();g.arc(x,h*.35,h*.075,Math.PI,0);g.stroke();g.beginPath();g.moveTo(x-h*.075,h*.35);g.lineTo(x-h*.075,h*.43);g.moveTo(x+h*.075,h*.35);g.lineTo(x+h*.075,h*.43);g.stroke()}g.fillStyle='#17272d';g.fillRect(w*.32,h*.34,w*.36,h*.10);
 }else{
  g.fillStyle='#33474b';g.beginPath();g.moveTo(0,h*.39);for(let i=0;i<=12;i++){const x=w*i/12,y=h*(.29+((i*17)%7)*.012);g.lineTo(x,y)}g.lineTo(w,h*.44);g.lineTo(0,h*.44);g.fill();
  for(let i=0;i<18;i++){const x=w*i/17,y=h*(.34+((i*11)%5)*.012),r=Math.max(5,w*.009);g.fillStyle='#1d3432';g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill()}
 }
 g.restore();
 g.fillStyle=p.horizon;g.globalAlpha=.86;g.fillRect(0,h*.37,w,h*.07);g.globalAlpha=1;
 g.strokeStyle='rgba(210,225,225,.14)';g.lineWidth=1;for(let row=0;row<4;row++){const y=h*.375+row*h*.014;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke()}
 for(const side of [0,1]){const x=side?w*.92:w*.08,y=h*.12;g.save();g.globalAlpha=.78;const beam=g.createRadialGradient(x,y,2,x,y,h*.58);beam.addColorStop(0,muRGBA(side?tc2:tc,.25));beam.addColorStop(1,'rgba(10,12,20,0)');g.fillStyle=beam;g.beginPath();g.moveTo(x-12,y);g.lineTo(side?w*.42:w*.58,h*.78);g.lineTo(side?w*1.08:-w*.08,h*.78);g.closePath();g.fill();g.fillStyle='#e6edf0';for(let j=0;j<5;j++){g.beginPath();g.arc(x+(j-2)*7,y,2.1,0,7);g.fill()}g.restore()}
 const turf=g.createLinearGradient(0,horizon,0,h);turf.addColorStop(0,p.turf[0]);turf.addColorStop(1,p.turf[1]);g.fillStyle=turf;g.fillRect(0,horizon,w,h-horizon);
 g.save();g.globalAlpha=.13;for(let y=horizon;y<h;y+=Math.max(12,h*.035)){g.fillStyle=Math.round(y)%2?'#b5c9ad':'#061313';g.fillRect(0,y,w,Math.max(2,h*.008))}g.restore();
 g.strokeStyle='rgba(231,239,232,.34)';g.lineWidth=Math.max(1,w*.0015);
 for(let i=0;i<=8;i++){const y=horizon+(h-horizon)*i/8;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();for(const x of [w*.32,w*.38,w*.62,w*.68]){g.beginPath();g.moveTo(x,y-3);g.lineTo(x,y+3);g.stroke()}}
 g.strokeStyle='rgba(245,248,240,.54)';g.lineWidth=2;g.strokeRect(w*.045,horizon+7,w*.91,h-horizon-14);
 g.save();g.globalAlpha=.12;const wash=g.createLinearGradient(0,0,w,0);wash.addColorStop(0,tc);wash.addColorStop(.5,'rgba(0,0,0,0)');wash.addColorStop(1,tc2);g.fillStyle=wash;g.fillRect(0,horizon,w,h-horizon);g.restore();
 cv.dataset.arenaTown=String(town||'');cv.dataset.arenaScene=scene;
}
function muPickThree(list){const src=(list||[]).filter(Boolean),positions=['QB','RB','WR'];return positions.map((pos,i)=>src.find(p=>p.pos===pos||p.pos===('WR'+(i===2?'2':'1')))||src[i]||src[0]).filter(Boolean).slice(0,3)}
function muDrawTeam3D(side,list,uni,now){
 const renderer=window.CF3D,wrap=side.querySelector('.players'),source=wrap.querySelector('.mu-team-source');if(!renderer||typeof renderer.kkShowcase!=='function'||!source)return false;
 const dpr=Math.min(window.devicePixelRatio||1,2),wr=wrap.getBoundingClientRect(),w=Math.max(2,Math.round(wr.width)),h=Math.max(2,Math.round(wr.height)),pw=Math.round(w*dpr),ph=Math.round(h*dpr);
 if(source.width!==pw||source.height!==ph){source.width=pw;source.height=ph}
 const players=muPickThree(list),slots=[...wrap.querySelectorAll('.mu-player-slot')],poses=['celebrate','idle','pushup'],clips=['Cheering','Idle_A','Push_Ups'];
 const figs=players.map((player,i)=>{const r=slots[i].getBoundingClientRect(),x=clamp((r.left+r.width/2-wr.left)/wr.width,.05,.95),clip=clips[i],duration=renderer.kkClipDur(clip)||1,num=player.jn!==undefined?player.jn:(player.num!==undefined?player.num:[7,22,12][i]);return{d:player,uni,num,yaw:0,x,clip,t:((now||performance.now())/1000+i*.41)%duration,tilt:.08,zoom:(h<190?.66:.58)*(i===1?1.08:.92)}});
 const ok=renderer.kkShowcase(source,figs,false);
 slots.forEach((slot,i)=>{const cv=slot.querySelector('.mu-player'),r=slot.getBoundingClientRect(),sx=Math.max(0,Math.round((r.left-wr.left)*dpr)),sw=Math.max(1,Math.min(source.width-sx,Math.round(r.width*dpr))),ch=Math.max(2,Math.round(r.height*dpr)),cw=Math.max(2,Math.round(r.width*dpr));if(cv.width!==cw||cv.height!==ch){cv.width=cw;cv.height=ch}const g=cv.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cw,ch);if(ok)g.drawImage(source,sx,0,sw,source.height,0,0,cw,ch);cv.dataset.modelRenderer='threejs-kaykit-skinned';cv.dataset.modelReady=ok?'true':'false';cv.dataset.modelClip=clips[i];cv.dataset.modelScale=String(figs[i].zoom)});
 return ok;
}
function muBuildPlayers(side,list,uni){const wrap=side.querySelector('.players');wrap.innerHTML='';const source=document.createElement('canvas');source.className='mu-team-source';source.setAttribute('aria-hidden','true');wrap.appendChild(source);const poses=['celebrate','idle','pushup'];muPickThree(list).forEach((p,i)=>{if(!p)return;const slot=document.createElement('div');slot.className='mu-player-slot pose-'+poses[i]+' '+(i===1?'player-large':'player-medium');slot.dataset.pose=poses[i];slot.dataset.playerSize=i===1?'large':'medium';slot.dataset.playerRole=p.pos||['QB','RB','WR'][i];const cv=document.createElement('canvas');cv.className='mu-player';cv.setAttribute('aria-label',poses[i]+' 3D player');cv.dataset.modelRenderer='threejs-kaykit-skinned';slot.appendChild(cv);wrap.appendChild(slot)})}
muEl=function(){
 if(MU.el)return MU.el;const st=document.createElement('style');
 st.textContent=String.raw`
#mu{position:fixed;inset:0;z-index:200;display:none;flex-direction:column;justify-content:flex-start;color:#fff;font-family:"Barlow Condensed",system-ui,sans-serif;overflow:hidden;user-select:none;-webkit-user-select:none;background:#131620;isolation:isolate}
#mu.on{display:flex}
#mu .mu-arena{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
#mu .split{position:absolute;inset:0;z-index:1;pointer-events:none;background:none}
#mu .split i{position:absolute;inset:0;display:block}
#mu .hl{clip-path:polygon(0 0,58% 0,42% 100%,0 100%);background:linear-gradient(135deg,var(--homeTint,rgba(245,184,65,.45)) 0%,rgba(19,22,32,.75) 100%)}
#mu .hr{clip-path:polygon(58% 0,100% 0,100% 100%,42% 100%);background:linear-gradient(225deg,var(--awayTint,rgba(77,225,242,.45)) 0%,rgba(19,22,32,.75) 100%)}
#mu .sl{display:block;clip-path:polygon(57.7% 0,58.3% 0,42.3% 100%,41.7% 100%);background:linear-gradient(180deg,rgba(245,184,65,.85) 0%,#fff4cc 50%,rgba(245,184,65,.9) 100%);filter:drop-shadow(0 0 8px rgba(245,184,65,.85));opacity:.95}
#mu .bgfx{display:none}
#mu .top{position:relative;z-index:4;flex:none;display:grid;grid-template-columns:minmax(0,1fr) clamp(48px,7vh,66px) minmax(0,1fr);align-items:center;justify-items:center;padding:max(18px,calc(env(safe-area-inset-top) + 12px)) clamp(10px,3vw,32px) 0;min-height:36px;gap:clamp(6px,1.5vw,16px);pointer-events:none}
#mu .top .town{grid-column:1}
#mu .top .tag{grid-column:3}
#mu .top .town,#mu .top .tag{box-sizing:border-box;width:min(100%,clamp(164px,21vw,236px));max-width:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#F5F7FA;text-shadow:none;border-radius:999px;padding:6px 14px;background:rgba(19,22,32,.92);box-shadow:0 4px 14px rgba(0,0,0,.35);text-align:center;font-size:clamp(12px,1.8vw,18px);font-weight:900;letter-spacing:.08em;line-height:1.15}
#mu .top .town{border:2px solid #F5B841}
#mu .top .tag{border:2px solid #4DE1F2}
#mu .mid{position:relative;z-index:3;flex:1 1 auto;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) clamp(48px,7vh,66px) minmax(0,1fr);align-items:stretch;padding:clamp(12px,3vh,26px) clamp(10px,3vw,32px) max(12px,env(safe-area-inset-bottom));gap:clamp(6px,1.5vw,16px)}
#mu .side{position:relative;min-width:0;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:clamp(4px,.8vh,8px)}
#mu .pn{box-sizing:border-box;position:relative;z-index:3;flex:none;margin-top:clamp(24px,10vh,72px);width:min(100%,clamp(164px,21vw,236px));height:clamp(168px,37vh,238px);min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:clamp(4px,.7vh,7px);padding:clamp(8px,1.6vh,14px) clamp(10px,1.4vw,16px) clamp(8px,1.4vh,12px);background:#131620;border:2.5px solid var(--tc);border-radius:22px;box-shadow:0 10px 24px rgba(0,0,0,.45);overflow:visible}
#mu .pn.my{--tc:#F5B841}
#mu .pn.op{--tc:#4DE1F2}
#mu .lg{position:static;flex:1 1 auto;min-height:0;width:clamp(76px,17vh,132px);height:clamp(76px,17vh,132px);max-width:100%;display:flex;align-items:center;justify-content:center;opacity:1;filter:none;pointer-events:none}
#mu .lg svg{width:100%;height:100%;display:block}
#mu .nr{display:flex;align-items:center;justify-content:center;max-width:100%;width:100%;position:relative;z-index:1;flex:none}
#mu .nm{font-size:clamp(15px,2.7vh,24px);font-weight:900;letter-spacing:.03em;text-align:center;line-height:1.02;text-shadow:none;color:#F5F7FA;max-width:100%;word-break:normal;padding:0;overflow-wrap:anywhere}
#mu .ov{position:relative;z-index:4;flex:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;margin:2px 0 0;padding:4px 16px;background:#131620;border:1.5px solid var(--tc);border-radius:999px;color:#F5F7FA;font-size:clamp(11px,1.7vh,15px);font-weight:900;line-height:1.1;letter-spacing:.08em;white-space:nowrap}
#mu .ov b{display:inline;background:transparent;color:var(--tc);border-radius:0;padding:0;margin:0}
#mu .vs{align-self:center;margin:0;transform:translateY(-1vh);width:clamp(48px,7vh,66px);height:clamp(48px,7vh,66px);flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:clamp(20px,3.4vh,30px);font-weight:900;font-style:italic;background:#131620;color:#F5B841;border:2.5px solid #F5B841;box-shadow:0 0 18px rgba(245,184,65,.35),0 6px 18px rgba(0,0,0,.5);text-shadow:none}
#mu .players{position:relative;z-index:2;width:100%;flex:1 1 0;min-height:0;display:flex;align-items:flex-end;justify-content:space-evenly;gap:clamp(2px,.6vw,8px);padding:0 clamp(2px,1vw,12px) clamp(18px,5vh,38px);overflow:visible}
#mu .mu-team-source{position:absolute;inset:0;width:100%;height:100%;visibility:hidden;pointer-events:none}
#mu .mu-player-slot{position:relative;flex:1 1 0;min-width:0;max-width:none;height:100%;min-height:72px;display:flex;align-items:flex-end;justify-content:center;overflow:visible}
#mu .mu-player-slot.player-large{flex:1.15 1 0;max-width:none}
#mu .mu-player{display:block;width:100%;height:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 6px 6px rgba(0,0,0,.55))}
#mu .mu-number{display:none}
#mu .bot{position:absolute;left:50%;bottom:max(8px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:6;width:min(42vw,360px);max-width:92vw;padding:0;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(4px,.8vh,7px)}
#mu .first{display:inline-flex;align-items:center;justify-content:center;padding:4px 16px;background:#131620;border:1.5px solid rgba(245,184,65,.78);border-radius:999px;color:#F5F7FA;font-size:clamp(11px,1.7vh,15px);font-weight:900;letter-spacing:.1em;line-height:1.15;white-space:nowrap}
#mu .bar{width:100%;height:clamp(8px,1.5vh,12px);border-radius:999px;background:rgba(19,22,32,.92);border:1.5px solid rgba(255,255,255,.35);margin:0;overflow:hidden}
#mu .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#4DE1F2,#F5B841);transition:width .15s;border-radius:inherit}
#mu .tap{display:inline-flex;align-items:center;justify-content:center;min-height:clamp(30px,4.6vh,38px);padding:5px clamp(24px,3.6vw,36px);font-size:clamp(13px,2vh,18px);font-weight:900;letter-spacing:.1em;line-height:1;color:#131620;background:#4DE1F2;border:0;border-radius:999px;box-shadow:0 3px 0 #147f98;text-shadow:none;cursor:pointer}
#mu .tap.go{animation:none;box-shadow:0 3px 0 #147f98,0 0 0 2px rgba(77,225,242,.25)}
@media(max-height:430px) and (orientation:landscape){
  #mu .top{padding-top:10px;min-height:28px;grid-template-columns:minmax(0,1fr) 44px minmax(0,1fr)}
  #mu .top .town,#mu .top .tag{width:min(100%,154px);font-size:11px;padding:4px 10px}
  #mu .mid{grid-template-columns:minmax(0,1fr) 44px minmax(0,1fr);padding:10px clamp(10px,3vw,24px) 6px}
  #mu .side{gap:3px}
  #mu .pn{margin-top:clamp(14px,7vh,36px);width:min(100%,154px);height:clamp(124px,36vh,152px);padding:5px 8px;gap:2px;border-radius:16px}
  #mu .lg{width:clamp(50px,14vh,72px);height:clamp(50px,14vh,72px)}
  #mu .nm{font-size:clamp(13px,2.8vh,16px)}
  #mu .ov{font-size:10px;padding:2px 10px}
  #mu .vs{width:44px;height:44px;font-size:18px;transform:translateY(-1vh)}
  #mu .players{padding-bottom:16px}
  #mu .mu-player-slot{min-height:64px}
  #mu .bot{bottom:5px;width:min(38vw,290px);gap:3px}
  #mu .first{font-size:10px;padding:2px 11px}
  #mu .bar{height:7px}
  #mu .bot .tap{min-height:26px;padding:4px 20px;font-size:12px}
}
@media(max-width:560px) and (orientation:portrait){
  #mu .top{grid-template-columns:minmax(0,1fr) 42px minmax(0,1fr);padding:max(14px,calc(env(safe-area-inset-top) + 8px)) 8px 0;gap:4px}
  #mu .top .town,#mu .top .tag{width:min(100%,152px);font-size:11px;padding:4px 8px}
  #mu .mid{grid-template-columns:minmax(0,1fr) 42px minmax(0,1fr);padding:12px 8px 106px;gap:4px}
  #mu .pn{width:min(100%,152px);height:clamp(158px,26vh,206px);padding:8px;border-radius:18px}
  #mu .lg{width:clamp(58px,10vh,84px);height:clamp(58px,10vh,84px)}
  #mu .nm{font-size:clamp(14px,2.2vh,18px)}
  #mu .ov{font-size:11px;padding:3px 10px}
  #mu .vs{width:42px;height:42px;font-size:18px;transform:translateY(-1vh)}
  #mu .bot{width:min(88vw,360px)}
}
`;
 document.head.appendChild(st);const d=document.createElement('div');d.id='mu';
 d.innerHTML='<canvas class="mu-arena" aria-hidden="true"></canvas><div class="split"><i class="hl"></i><i class="hr"></i><i class="sl"></i></div><div class="top"><span class="town"></span><span class="tag"></span></div><div class="mid"><div class="side home-side"><div class="pn my"><div class="lg"></div><div class="nr"><div class="nm"></div></div><div class="ov"></div></div><div class="players"></div></div><div class="vs">VS</div><div class="side away-side"><div class="pn op"><div class="lg"></div><div class="nr"><div class="nm"></div></div><div class="ov"></div></div><div class="players"></div></div></div><div class="bot"><div class="first"></div><div class="bar"><i></i></div><button class="tap" type="button">LOADING</button></div>';
 document.body.appendChild(d);MU.el=d;const tapIt=e=>{if(!MU.on||!MU.ready)return;if(e&&e.type==='keydown'&&!/^(Enter| |Spacebar)$/.test(e.key))return;e&&e.preventDefault&&e.preventDefault();muClose()};d.addEventListener('pointerdown',tapIt);window.addEventListener('keydown',e=>{if(MU.on&&MU.ready)tapIt(e);else if(MU.on)e.stopPropagation()},true);return d;
};
showMatchup=function(crew,done){
 const d=muEl(),kind=matchKind(crew);MU.done=done;MU.crew=crew;d.style.setProperty('--a','#F5B841');d.style.setProperty('--b','#4DE1F2');d.style.setProperty('--c1',SAVE.uni.jc);d.style.setProperty('--c2',(G.oppUni||crew.uni).jc);d.style.setProperty('--homeTint',muRGBA(SAVE.uni.jc,.45));d.style.setProperty('--awayTint',muRGBA((G.oppUni||crew.uni).jc,.45));d.classList.toggle('myst',!!kind.mystery);
 d.querySelector('.town').textContent=String(crew.town||'').toUpperCase();d.querySelector('.tag').textContent=kind.tag;const my=Object.values(SAVE.starters||{}),op=crew.roster||[],home=d.querySelector('.pn.my'),away=d.querySelector('.pn.op');
 home.querySelector('.lg').innerHTML=myLogoHTML('100%');away.querySelector('.lg').innerHTML=logoSVG(crewLogo(crew),(G.oppUni||crew.uni).jc,crew.town,{bg:1});home.querySelector('.nm').textContent=(SAVE.teamName||'Your Team').toUpperCase();home.querySelector('.ov').innerHTML='OVR<b>'+muAvg(my)+'</b>';away.querySelector('.nm').textContent=kind.mystery?'? ? ?':String(crew.name).toUpperCase();away.querySelector('.ov').innerHTML='OVR<b>'+(kind.mystery?'??':muAvg(op))+'</b>';
 muArenaPaint(d.querySelector('.mu-arena'),crew.town);muBuildPlayers(d.querySelector('.home-side'),[SAVE.starters.QB,SAVE.starters.RB,SAVE.starters.WR1,SAVE.starters.WR2,SAVE.starters.TE],SAVE.uni);muBuildPlayers(d.querySelector('.away-side'),op,G.oppUni||crew.uni);
 d.querySelector('.first').textContent='FIRST TO '+crew.target+' WINS';d.querySelector('.bar i').style.width='0%';const tp=d.querySelector('.tap');tp.textContent='LOADING';tp.classList.remove('go');MU.on=true;MU.ready=false;MU.t0=performance.now();MU.capped=false;d.classList.add('on');requestAnimationFrame(()=>{muFit(home.querySelector('.nm'));muFit(away.querySelector('.nm'))});
 clearInterval(MU.tm);MU.tm=setInterval(()=>{const el=performance.now()-MU.t0,pr=muCoreProgress();d.querySelector('.bar i').style.width=Math.round(100*Math.min(1,Math.min(1,el/2000)*.4+.6*(pr.n?pr.r/pr.n:1)))+'%';if(!MU.ready&&el>=2000&&pr.ok)MU.ready=true;else if(!MU.ready&&el>=8000){MU.ready=true;MU.capped=true;ART.introCap=(ART.introCap||0)+1;try{console.log('matchup intro: 8 s cap reached with',pr.r+'/'+pr.n+' core sets baked')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}if(MU.ready){clearInterval(MU.tm);ART.introMs=Math.round(el);tmark('introReady',Math.round(el)+'ms'+(MU.capped?' CAPPED':''));ART.introLast={ms:Math.round(el),capped:MU.capped,r:pr.r,n:pr.n};tp.textContent='TAP TO PLAY';tp.classList.add('go');d.querySelector('.bar i').style.width='100%'}},100);
 if(MU.playerFrame)cancelAnimationFrame(MU.playerFrame);MU.last3D=0;const animate=now=>{if(!MU.on)return;if(now-MU.last3D>=1000/12){muDrawTeam3D(d.querySelector('.home-side'),[SAVE.starters.QB,SAVE.starters.RB,SAVE.starters.WR1,SAVE.starters.WR2,SAVE.starters.TE],SAVE.uni,now);muDrawTeam3D(d.querySelector('.away-side'),G.crew.roster||[],G.oppUni||G.crew.uni,now);MU.last3D=now}MU.playerFrame=requestAnimationFrame(animate)};MU.playerFrame=requestAnimationFrame(animate);
};
window.addEventListener('resize',()=>{if(MU.on&&MU.el)muArenaPaint(MU.el.querySelector('.mu-arena'),MU.crew&&MU.crew.town)});
window.SG.__pregameQA=()=>({town:MU.crew&&MU.crew.town,players:MU.el?MU.el.querySelectorAll('.mu-player').length:0,backgrounds:MU.el?MU.el.querySelectorAll('.mu-arena').length:0,arenaTown:MU.el?.querySelector('.mu-arena')?.dataset.arenaTown||'',arenaScene:MU.el?.querySelector('.mu-arena')?.dataset.arenaScene||'',teamSizes:MU.el?[...MU.el.querySelectorAll('.side')].map(side=>[...side.querySelectorAll('.mu-player-slot')].map(slot=>slot.dataset.playerSize||'')):[],playerScales:MU.el?[...MU.el.querySelectorAll('.mu-player')].map(cv=>Number(cv.dataset.modelScale||0)):[],teamTints:MU.el?{home:getComputedStyle(MU.el).getPropertyValue('--homeTint').trim(),away:getComputedStyle(MU.el).getPropertyValue('--awayTint').trim()}:null,sceneSamples:{vapor:muArenaScene('Vapor City'),harbor:muArenaScene('Hale Harbor'),reach:muArenaScene("Gull's Reach"),spillway:muArenaScene('The Spillway')},renderScene:(town)=>{const cv=document.createElement('canvas');muArenaPaint(cv,town);return cv.toDataURL('image/png')},renderers:MU.el?[...MU.el.querySelectorAll('.mu-player')].map(cv=>cv.dataset.modelRenderer||''):[],modelReady:MU.el?[...MU.el.querySelectorAll('.mu-player')].filter(cv=>cv.dataset.modelReady==='true').length:0,clips:window.CF3D?.kk?.clips||[],modelStatus:window.KKLIB?.line?.()||'unavailable'});
/* ===== end pre-game matchup ===== */
