/* ===== ROUTE 2: GULL'S REACH ===== */
/* ================================================================================================
   ROUTE 2 LOGIC: save flags, the Dredgers (Flats test + Mud Kelly), talk, ferry deck and landing, rooms, causeway gate,
   NET DRAG (route challenge, +4 once), Zero Day's failure beat (in-match prompt), the win screens (+3 once, SLICKER).
   ================================================================================================ */
const R2_DEF=()=>({ferryRidden:0,mouseSeen:0,islandReached:0,testBeaten:0,bossBeaten:0,challengeDone:0,netBest:0,zdFail:null,courierSeen:0});
function r2S(){const t=SAVE.r2=SAVE.r2||{},d=R2_DEF();for(const k in d)if(t[k]===undefined)t[k]=d[k];return t}
const r2Test=()=>!!r2S().testBeaten,r2Boss=()=>!!r2S().bossBeaten,r2GateOpen=()=>r2Boss();

/* ---- the Dredgers: a clean island crew (no referee table). Seven fixed slots QB RB WR WR TE OL OL: the Bible's LB/DB take OL/WR. ---- */
const R2_UNI=HB_UNI({j:0,jc:'#A55132',jt:'#E8E2D0',jn:'#E8E2D0',p:1,pc:'#D8D0C0',ps:'#A55132',sock:'#A55132',shoe:'#14110f',h:1,hc:'#A55132',hs:'#E8E2D0',mask:'#3A464E'});
const R2_CREWS=[
 {id:'dredgers1',name:'Dredgers',short:'DREDGERS',town:"Gull's Reach",ez:'DREDGERS',boss:'Tam Kelly',level:1,target:7,pickup:true,r2:true,col:'#A55132',logo:'r2rake',T:77,
  uni:R2_UNI,scout:"Mud's second string. Runs downhill, tackles low, never flags.",tag:'Salt and grit.',
  pre:["Mud wants to see you first.","Short one. First to 7."],win:"Mud's waiting. Go on.",lose:'Salt holds.',
  mix:()=>pick(['stack','bal','bal','blitz']),
  roster:hbRoster([['Tam Kelly','QB',77],['Ox Pruitt','RB',77],['Lacey Dunn','WR',76],['Dov Rusk','WR',76],['Neddy Shaw','TE',77],['Gaunt','OL',77],['Rook','OL',78]])},
 {id:'dredgers',name:'Dredgers',short:'DREDGERS',town:"Gull's Reach",ez:'DREDGERS',boss:'"Mud" Kelly',level:2,target:14,pickup:true,r2:true,r2boss:true,capSim:5,col:'#A55132',logo:'r2rake',T:79,
  uni:R2_UNI,scout:'Clean and heavy. Stacks the box on short yardage. Never quits on a play.',tag:'Salt and grit.',
  pre:['Harbor money stays in the harbor.','We play clean.'],win:'You earned it. No flags here.',lose:'Go on. Tell them who beat you.',
  mix:(down,togo)=>{if(down===3&&togo>=15)return Math.random()<.5?'deep':'bal';if(togo<=7)return Math.random()<.6?'stack':'bal';return pick(['bal','bal','stack','blitz','deep'])},
  roster:hbRoster([['"Mud" Kelly','QB',79],['Huck','RB',78],['Sal','WR',76],['Iris','WR',77],['Pete','TE',78],['Brack','OL',77],['Cole','OL',79]])}];
R2_CREWS.forEach(c=>{c.uni.jo=c.uni.jo||'#14110f';c.uni.po=c.uni.po||'#14110f';c.alt={jc:'#3A464E',jt:'#A55132',jn:'#E8E2D0',hc:'#A55132',hs:'#E8E2D0',sock:'#3A464E'}});   // away kit: slate with terracotta, used when terracotta clashes with your jersey

/* ---- live maps ---- */
const R2_PROPS=R2P;
const R2_NPCS=R2_OUT_NPCS.map(n=>Object.assign({hb:1,r2:1,t:n.f.slice()},n));
for(const id in HBI){if(!HBI[id].r2)continue;for(const n of HBI[id].npcs){n.r2=1;n.hb=1}}

/* ---- talk ---- */
function r2Lines(n){if(r2Boss()&&n.c)return n.c;if(r2Test()&&n.w)return n.w;return n.f}
function r2Talk(n){
  const S=r2S();
  if(!(SAVE.met||[]).includes(n.id)){SAVE.met=(SAVE.met||[]).concat(n.id);persist()}
  if(n.id==='r2_zd'||n.id==='r2_zdf'){
    if(S.zdFail==='force'){owSay(n.name,['I bailed on that route.',"Won't happen twice."]);return}
    if(S.zdFail==='check'){owSay(n.name,['You pulled me. Fair.','Next time, look at me first.']);return}}
  if(n.id==='r2_riptide'&&S.testBeaten){owSay(n.name,['Wear the slicker when they grab.','Tug did.']);return}
  if(n.pw){
    if(!(SAVE.pw||[]).includes(n.pw)){owSay(n.name,n.f||[],()=>owGive(n.pw,[n.name].concat(n.pwl)));return}
    owSay(n.name,n.t2||['Good luck.']);return}
  const L=(r2Lines(n)||['...']).slice();
  const after=n.crew?()=>r2Challenge(n):n.act==='ferryback'?()=>r2FerryAsk(n):n.act==='netdrag'?()=>r2NetAsk(n):null;
  owSay(n.name,L,after);
}
function r2Challenge(n){const S=r2S(),t=R2_CREWS[0],b=R2_CREWS[1];
  if(!S.testBeaten){owAsk(n.name,'The Flats test: my second string. First to '+t.target+'.  '+t.scout,[['PLAY',()=>owPlay(t)],['NOT YET']]);return}
  owAsk(n.name,(S.bossBeaten?'Rematch? ':'Me and mine. ')+'First to '+b.target+'.  '+b.scout,[['PLAY',()=>owPlay(b)],['NOT YET']])}

/* ---- props with their own act ---- */
function r2Act(p){const S=r2S();
  if(p.act==='bow'){owAsk('BOW RAMP',"Go ashore at Gull's Reach?",[['GO ASHORE',r2Land],['NOT YET']]);return true}
  if(p.act==='bell'){if(SND.smp)SND.smp('sfx_bell',1,.55);owSay("SHIP'S BELL",['Two bells.','The watch changes.']);return true}
  if(p.act==='crate'){if(!S.courierSeen){S.courierSeen=1;persist()}owSay('CRATE',['Q-7, stencilled on the slats.','BOUND FOR: CINDERHOLD.',"Off the ferry. Not on the log."]);return true}
  return false}

/* ---- doors, rooms, gate, edges ---- */
function r2DoorAt(x,y){for(const b of R2B)for(const d of b.doors)if(d[0]===x&&d[1]===y)return b;return null}
function r2Enter(b){SND.fx('open');OW.ret={x:OW.x,y:OW.y+1,map:'island'};const d=HBI[b.room];owPlace(b.room,Math.floor(d.w/2),d.h-2,'u',OW.ret);owHud();owToast(b.sign)}
const r2IsGate=(x,y)=>x===R2_GATE[0]&&(y===R2_GATE[1]||y===R2_GATE2[1]);
function r2Bump(x,y){if(M.island&&r2IsGate(x,y)&&!r2GateOpen()){SND.fx('err');owSay('CAUSEWAY GATE',['Chained. The Dredgers hold the key.','Beat Mud Kelly first.']);return true}return false}
function r2Arrive(){if(M.island&&OW.x>=R2_EXITX){owClearIn();owSay('THE CAUSEWAY',['Smells like soot.','(Cinderhold is coming soon.)'],()=>{OW.d='l';owTryMove('l',true)})}}
function r2Horn(){if(SND.smp)SND.smp('sfx_horn',1,.5)}
/* boarding at Hale Harbor (after the silhouette the first time): the deck. Stern = back to the harbor, bow = ashore. */
function r2Board(){const S=r2S();S.ferryRidden=1;persist();r2Horn();
  const d=HBI.r2_deck;owPlace('r2_deck',Math.floor(d.w/2),d.h-2,'u',null);OW.ret={x:HB_FERRY[0],y:HB_FERRY[1],map:'harbor'};owSave();owHud();owToast('THE FERRY');
  if(!S.mouseSeen)setTimeout(()=>{if(M.id!=='r2_deck'||OW.busy)return;S.mouseSeen=1;persist();owSay('MOUSE  ·  TEXT',['Is the harbor as big as people say?','Lot 9 went dark last night.','Come home with a trophy. Okay?'])},900)}
function r2Land(){const S=r2S(),first=!S.islandReached;S.islandReached=1;persist();r2Horn();
  owPlace('island',R2_ARR[0],R2_ARR[1],'r',null);OW.ret=null;owSave();owHud();
  owToast("GULL'S REACH");if(first)setTimeout(()=>{if(M.island)owToast('Salt. Wind. No rain.')},3400)}
function r2FerryAsk(n){owAsk(n.name,'Back to Hale Harbor? The ferry brings you here again any time.',[['RIDE BACK',()=>{r2Horn();owPlace('harbor',HB_FERRY[0],HB_FERRY[1],'u',null);OW.ret=null;owSave();owHud();owToast('HALE HARBOR')}],['STAY']])}
const r2Obj=()=>{const S=r2S();return S.bossBeaten?'CAUSEWAY OPEN':'DREDGERS '+(S.testBeaten?1:0)+'/2'};

/* ---- NET DRAG (route challenge, the Hale Mary tire's equivalent). 20 seconds, 60 pulls hauls the net. +4 upgrade points, once. ---- */
const ND={time:20,need:60};
function r2NetAsk(n){if(window.SHELVED_MINIS){owSay(n.name,['Tide is too rough to haul nets today.']);return}const S=r2S();
  owAsk(n.name,'NET DRAG: tap fast to haul the net in. '+ND.need+' pulls in '+ND.time+' seconds.'+(S.challengeDone?'  Best: '+S.netBest+'.':'  Haul it in for +4 upgrade points.'),[['HAUL',()=>r2Net(n)],['NOT NOW']])}
function r2Net(n){
  OW.busy=true;
  let el=$('#netdrag');if(!el){el=document.createElement('div');el.id='netdrag';el.style.cssText='position:absolute;inset:0;z-index:6;background:#0e171c;touch-action:none';el.innerHTML='<canvas style="width:100%;height:100%;display:block;touch-action:none"></canvas>';$('#world').appendChild(el)}
  if(el.parentElement!==$('#world'))$('#world').appendChild(el);
  el.hidden=false;el.style.display='block';
  const cv=el.firstChild,r=$('#world').getBoundingClientRect(),W=cv.width=Math.round(r.width),H=cv.height=Math.round(r.height),c=cv.getContext('2d');
  const k=Math.min(W/480,H/315),ox=(W-480*k)/2,oy=(H-315*k)/2;
  let time=ND.time,pulls=0,over=false,last=performance.now(),gone=false,yank=0,started=false;
  const close=()=>{if(gone)return;gone=true;cv.onpointerdown=null;el.style.display='none';OW.busy=false};
  const finish=()=>{over=true;const S=r2S();S.netBest=Math.max(S.netBest||0,pulls);const first=pulls>=ND.need&&!S.challengeDone;
    if(first){S.challengeDone=1;SAVE.upPts=(SAVE.upPts||0)+4}persist();
    cv.onpointerdown=e=>{e.stopPropagation();if(performance.now()-over<600)return;close();owHud();
      owSay(n.name,first?['Hauled. Good arms.','★ +4 UPGRADE POINTS','Spend them on any starter.']:pulls>=ND.need?['Hauled again. No points in it.','Best: '+S.netBest+'.']:[pulls+' pulls. Net slipped.','Need '+ND.need+'. Try again.'],first?()=>owToast('+4 UPGRADE POINTS'):null)};over=performance.now()};
  cv.onpointerdown=e=>{e.stopPropagation();e.preventDefault();if(over)return;started=true;pulls++;yank=1;if(pulls%3===1&&SND.smp)SND.smp('sfx_net',.9+Math.random()*.3,.45);else SND.beep&&SND.beep(300+pulls*4,.03)};
  const tick=now=>{if(gone)return;const dt=Math.min(.05,(now-last)/1000);last=now;
    if(!over&&started){time-=dt;if(time<=0){time=0;finish()}}
    yank=Math.max(0,yank-dt*6);
    const p=Math.min(1,pulls/ND.need);
    c.setTransform(1,0,0,1,0,0);c.fillStyle='#0e171c';c.fillRect(0,0,W,H);c.setTransform(k,0,0,k,ox,oy);
    const sky=c.createLinearGradient(0,0,0,120);sky.addColorStop(0,'#4B5B66');sky.addColorStop(1,'#8A97A0');c.fillStyle=sky;c.fillRect(0,0,480,120);
    const sea=c.createLinearGradient(0,120,0,315);sea.addColorStop(0,'#3A5560');sea.addColorStop(1,'#16262d');c.fillStyle=sea;c.fillRect(0,120,480,195);
    for(let i=0;i<14;i++){c.strokeStyle='rgba(220,235,240,.12)';c.lineWidth=2;const y=130+((i*37+now/40)%180),x=(i*71)%480;c.beginPath();c.moveTo(x,y);c.lineTo(x+30,y);c.stroke()}
    c.fillStyle='#5A4632';c.fillRect(0,96,480,26);c.fillStyle='#3e3022';for(let x=0;x<480;x+=40)c.fillRect(x,96,3,26);   // the pier edge
    // the net: it rises from the deep as you pull; fish flash inside it
    const ny=290-p*170-yank*6;c.strokeStyle='#bfa76a';c.lineWidth=4;c.beginPath();c.moveTo(240,110);c.lineTo(240,ny-30);c.stroke();
    c.fillStyle='rgba(78,124,122,.85)';c.beginPath();c.moveTo(180,ny-30);c.lineTo(300,ny-30);c.quadraticCurveTo(310,ny+40,240,ny+52);c.quadraticCurveTo(170,ny+40,180,ny-30);c.fill();
    c.strokeStyle='#243a39';c.lineWidth=2;for(let i=0;i<7;i++){c.beginPath();c.moveTo(185+i*18,ny-30);c.lineTo(205+i*8,ny+45);c.stroke()}for(let j=0;j<4;j++){c.beginPath();c.moveTo(180+j*3,ny-18+j*16);c.lineTo(300-j*3,ny-18+j*16);c.stroke()}
    for(let i=0;i<Math.floor(p*9);i++){c.fillStyle=i%2?'#cfd6d8':'#9fc4d4';c.beginPath();c.ellipse(205+(i*23)%70,ny+(i*13)%34-8,9,4,Math.sin(now/180+i)*.6,0,7);c.fill()}
    // bar + text
    c.fillStyle='rgba(0,0,0,.5)';c.fillRect(40,40,400,16);c.fillStyle=p>=1?'#35d07f':'#E8A33D';c.fillRect(42,42,396*p,12);
    c.fillStyle='#fff';c.font='700 24px "Barlow Condensed",sans-serif';c.textAlign='left';c.fillText('PULLS '+pulls+' / '+ND.need,14,30);c.textAlign='right';c.fillText(Math.ceil(time)+'s',466,30);
    c.textAlign='center';c.font='500 15px "Barlow Condensed",sans-serif';c.fillStyle='#E8E2D0';c.fillText(over?'':started?'TAP TAP TAP':'TAP FAST TO HAUL THE NET  ·  CLOCK STARTS ON YOUR FIRST TAP',240,306);
    if(over){c.fillStyle='rgba(0,0,0,.62)';c.fillRect(0,105,480,110);c.fillStyle=pulls>=ND.need?'#35d07f':'#ffd23a';c.font='700 34px "Bowlby One",Impact,sans-serif';c.fillText(pulls>=ND.need?'HAULED!':'NET SLIPPED',240,157);c.fillStyle='#fff';c.font='500 16px "Barlow Condensed",sans-serif';c.fillText(pulls+' pulls  ·  tap to continue',240,193)}
    requestAnimationFrame(tick)};
  requestAnimationFrame(tick)}

/* ---- ZERO DAY'S FAILURE BEAT (CF_12 3.1 #10): once, in a Dredgers game, on 3rd and 5+ with a pass called, he waves off his route.
   The outcome follows the choice, not luck: FORCE IT = he is not there, incomplete. CHECK DOWN = 5 yards, Zero Day -2 OVR this game. ---- */
function r2ZdCheck(){
  if(!G||!G.crew||!G.crew.r2||G.crew.practice)return false;const S=r2S();if(S.zdFail)return false;
  const pl=PLAYS[G.sel];if(!pl||pl.kind!=='pass'||G.down!==3||G.togo<5)return false;
  if(!SLOTS.some(k=>SAVE.starters[k]&&/Zero Day/.test(SAVE.starters[k].n0||SAVE.starters[k].name||'')))return false;
  G.mode='dead';show('#setbar',false);r2ZdBeat();return true}
function r2ZdBeat(){
  const S=r2S(),rip=SLOTS.some(k=>SAVE.starters[k]&&/Riptide/.test(SAVE.starters[k].n0||SAVE.starters[k].name||''));
  const d=document.createElement('div');d.id='zdBeat';d.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;background:rgba(10,16,20,.88);padding:16px';
  d.innerHTML='<div style="font:700 12px/1 Barlow Condensed,Impact,sans-serif;letter-spacing:.2em;color:#E8A33D">'+ddText().toUpperCase()+'</div>'+
   '<div style="font:400 20px/1.1 Bowlby One,Impact,sans-serif;color:#E8E2D0;letter-spacing:.04em;text-align:center">ZERO DAY WAVES OFF HIS ROUTE</div>'+
   '<div style="font:600 16px/1.35 Barlow Condensed,Arial,sans-serif;color:#fff;text-align:center">Zero Day is giving up.<br>Force the throw?</div>'+
   '<div style="display:flex;gap:12px;margin-top:6px"><button id="zdF" style="min-width:132px;height:46px;border-radius:9px;border:2px solid #E8A33D;background:#A9542F;color:#fff;font:700 17px Barlow Condensed,sans-serif;letter-spacing:.08em">FORCE IT</button>'+
   '<button id="zdC" style="min-width:132px;height:46px;border-radius:9px;border:2px solid #9FC4D4;background:#26333C;color:#E6DCC8;font:700 17px Barlow Condensed,sans-serif;letter-spacing:.08em">CHECK DOWN</button></div>'+
   '<div style="font:600 12px/1.3 Barlow Condensed,sans-serif;color:#9FC4D4;text-align:center;max-width:330px">Force it: he is not there, incomplete.<br>Check down: 5 yards'+(rip?' to Riptide':'')+', but Zero Day sulks (-2 OVR this game).</div>';
  document.body.appendChild(d);
  const go=k=>{d.remove();S.zdFail=k;persist();
    if(k==='force'){SND.fx('whiff');say('INCOMPLETE','Zero Day stopped running.',1000,()=>finishPlay({type:'tackle',spot:G.los}))}
    else{G.zdPen=1;SND.fx('first');say('CHECK DOWN',(rip?'Riptide, ':'')+'5 yards. Zero Day: -2 OVR this game.',1200,()=>finishPlay({type:'tackle',spot:G.los+5}))}};
  d.querySelector('#zdF').onclick=()=>go('force');d.querySelector('#zdC').onclick=()=>go('check')}

/* ---- win / loss screens for the Dredgers (route games: no team boost; Bible rewards: SLICKER after the test, +3 after Mud) ---- */
function r2Banner(html,col){const b=document.createElement('div');b.style.cssText='text-align:center;margin:6px 0 8px;padding:10px 8px;border:2px solid '+col+';border-radius:10px;background:rgba(232,163,61,.10);color:'+col+';font-weight:800;letter-spacing:.08em;font-size:16px';b.innerHTML=html;return b}
function r2End(win,c){
  const S=r2S();
  if(!win){$('#endH').textContent='TOUGH LOSS';$('#endScore').innerHTML=endScoreHTML(c);$('#endNote').textContent=c.boss.replace(/"/g,'')+': "'+c.lose+'"';screens('#end');return}
  const L=$('#stList');L.innerHTML='';$('#stScore').innerHTML=scoreHTML(c);
  const who=c.boss.replace(/"/g,'')+': "'+c.win+'" ';
  if(c.id==='dredgers1'){
    const first=!S.testBeaten;S.testBeaten=1;
    $('#stTitle').textContent='FLATS TEST PASSED';
    if(first){SAVE.pw=SAVE.pw||[];if(!SAVE.pw.includes('slicker'))SAVE.pw.push('slicker');persist();
      L.appendChild(r2Banner('★ POWER-UP: SLICKER ★<div style="font-size:12px;font-weight:600;letter-spacing:.03em;color:#f3e6c8;margin-top:5px">Riptide: "Tug\'s old slicker. He ran in it.<br>Never slipped once. Yours."</div><div style="font-size:11px;font-weight:600;color:#cfc3a5;margin-top:4px">'+POWERUPS.slicker.desc+'. Pick it before kickoff.</div>','#E8A33D'));
      $('#stNote').textContent=who+'Now Mud Kelly. First to 14.'}
    else{persist();$('#stNote').textContent=who+'You already passed the test. No new reward.'}
    show('#stDone',true);screens('#steal');return}
  // Mud Kelly
  const first=!S.bossBeaten;S.bossBeaten=1;if(first)SAVE.upPts=(SAVE.upPts||0)+3;persist();
  $('#stTitle').textContent='YOU BEAT THE DREDGERS!';if(first)rwShow(L,{gain:3,total:SAVE.upPts,why:['+3 \u00b7 first win over Mud Kelly (route bosses pay once)']});   // v2.97: points count up
  if(first){L.appendChild(r2Banner('★ THE CAUSEWAY IS OPEN ★<div style="font-size:12px;font-weight:600;letter-spacing:.03em;color:#f3e6c8;margin-top:5px">East past the Salt Works. Cinderhold is next.</div>','#E8A33D'))}
  $('#stNote').textContent=who+(first?'Spend the points on any starter.':'Rematch win. Route bosses pay once.');
  const u=document.createElement('button');u.textContent='UPGRADE PLAYERS ('+(SAVE.upPts||0)+' pts)';u.style.cssText='width:100%;margin:8px 0;border-color:#ffd23a;color:#ffd23a';u.className='btn';u.onclick=()=>openUpg(()=>owShow());L.appendChild(u);
  show('#stDone',true);screens('#steal')}

/* ---- ambient life sounds: a gull now and then on the island ---- */
let r2GullT=0;
function r2Life(dt){if(!M||!M.island||!SND.smp)return;r2GullT-=dt;if(r2GullT<=0){r2GullT=18+Math.random()*22;SND.smp('sfx_gull',.92+Math.random()*.16,.32)}}

/* ================================================================================================
   ROUTE 2 RENDER: the island (baked once), its props, life (gulls, the moored ferry, laundry, tumbleweed, the Cinderhold smoke
   plume on the horizon, the causeway chain), and the ferry deck room. Palette: slate #3A464E, bone #E8E2D0, rust #B5643C,
   Dredger terracotta #A55132. No neon, no rain. Baked daylight: no light pools outdoors.
   ================================================================================================ */
const r2Ch=(x,y)=>(x<0||y<0||x>=R2W||y>=R2H)?'~':R2G[y][x];
function r2SolidGrid(){const S=new Uint8Array(R2W*R2H);for(let y=0;y<R2H;y++)for(let x=0;x<R2W;x++){const c=R2G[y][x];if(c==='~'||c==='#'||c==='r')S[y*R2W+x]=1}return S}
function owBakeIsland(c,m){
  const g=c.getContext('2d'),R=owRnd(4471),B=BP;g.imageSmoothingEnabled=true;
  // sea: one cold gradient, then wind streaks
  {const gr=g.createLinearGradient(0,0,0,c.height);gr.addColorStop(0,'#2f4a55');gr.addColorStop(.5,'#2a434d');gr.addColorStop(1,'#1d3038');g.fillStyle=gr;g.fillRect(0,0,c.width,c.height);
    for(let i=0;i<260;i++){const x=R()*c.width,y=R()*c.height;g.strokeStyle='rgba(220,235,240,'+(.04+R()*.08)+')';g.lineWidth=1.5;g.beginPath();g.moveTo(x,y);g.lineTo(x+B*(.25+R()*.6),y-B*.05);g.stroke()}}
  const land=ch=>ch!=='~';
  // ground, tile by tile
  for(let y=0;y<R2H;y++)for(let x=0;x<R2W;x++){const ch=R2G[y][x],px=x*B,py=y*B;if(ch==='~')continue;
    if(ch==='P'){g.fillStyle='#5a4632';g.fillRect(px,py,B,B);for(let i=0;i<4;i++){g.fillStyle=R()<.5?'rgba(0,0,0,.18)':'rgba(255,230,190,.05)';g.fillRect(px+i*B/4,py,B/4,B)}g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=2;for(let i=1;i<4;i++){g.beginPath();g.moveTo(px+i*B/4,py);g.lineTo(px+i*B/4,py+B);g.stroke()}continue}
    if(ch==='_'){g.fillStyle='#7a6248';g.fillRect(px,py,B,B);for(let i=0;i<4;i++){g.fillStyle=R()<.5?'rgba(0,0,0,.14)':'rgba(255,235,200,.06)';g.fillRect(px,py+i*B/4,B,B/4);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;g.beginPath();g.moveTo(px,py+i*B/4);g.lineTo(px+B,py+i*B/4);g.stroke()}continue}
    if(ch==='='){g.fillStyle='#6e6a62';g.fillRect(px,py,B,B);for(let sy=0;sy<2;sy++)for(let sx=0;sx<2;sx++){g.fillStyle=R()<.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.12)';g.fillRect(px+sx*B/2+2,py+sy*B/2+2,B/2-4,B/2-4);g.strokeStyle='rgba(10,12,14,.5)';g.lineWidth=2;g.strokeRect(px+sx*B/2+2,py+sy*B/2+2,B/2-4,B/2-4)}
      if(R()<.5){g.fillStyle='rgba(60,90,50,.55)';g.beginPath();g.ellipse(px+R()*B,py+(R()<.5?B*.1:B*.9),B*.22,B*.07,0,0,7);g.fill()}continue}   // seaweed on the causeway stones
    if(ch===','){g.fillStyle='#d8d0c0';g.fillRect(px,py,B,B);g.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<5;i++)g.fillRect(px+R()*B,py+R()*B,3+R()*8,2);g.strokeStyle='rgba(120,110,95,.35)';g.lineWidth=1.4;for(let i=0;i<3;i++){g.beginPath();let cx=px+R()*B,cy=py+R()*B;g.moveTo(cx,cy);for(let q=0;q<3;q++){cx+=(R()-.5)*20;cy+=(R()-.5)*20;g.lineTo(cx,cy)}g.stroke()}continue}
    // shingle (also under buildings, doors and rocks)
    g.fillStyle=(x+y)%2?'#8a8478':'#86806f';g.fillRect(px,py,B,B);for(let i=0;i<12;i++){const v=R();g.fillStyle=v<.33?'#a39d8f':v<.66?'#6f695e':'#9a8f7c';g.beginPath();g.ellipse(px+R()*B,py+R()*B,B*(.04+R()*.06),B*(.03+R()*.04),R()*3,0,7);g.fill()}
    if(R()<.12){g.fillStyle='rgba(120,130,80,.5)';for(let i=0;i<5;i++){const gx=px+R()*B,gy=py+R()*B;g.fillRect(gx,gy-B*.12,2,B*.14)}}   // tufts of dune grass
  }
  // foam and wet shingle where land meets the sea
  for(let y=0;y<R2H;y++)for(let x=0;x<R2W;x++){if(!land(R2G[y][x]))continue;const px=x*B,py=y*B;
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){if(land(r2Ch(x+dx,y+dy)))continue;const ch=R2G[y][x];if(ch==='P'||ch==='=')continue;
      g.fillStyle='rgba(40,46,44,.35)';const fx=dx>0?px+B*.8:dx<0?px:px,fy=dy>0?py+B*.8:dy<0?py:py,fw=dx?B*.2:B,fh=dy?B*.2:B;g.fillRect(fx,fy,fw,fh);
      g.fillStyle='rgba(235,242,240,.55)';const ox=dx>0?px+B:dx<0?px-B*.12:px,oy=dy>0?py+B:dy<0?py-B*.12:py;g.fillRect(ox,oy,dx?B*.12:B,dy?B*.12:B)}}
  // pier and slipway posts
  for(let x=1;x<8;x+=2){for(const y of [11.86,14.0]){g.fillStyle='#2a1f18';g.fillRect(x*B+B*.4,y*B,B*.2,B*.18)}}
  // salt-pan dykes: low earth walls between the pans
  g.strokeStyle='rgba(110,98,80,.75)';g.lineWidth=5;for(const y of [14,17,20]){g.beginPath();g.moveTo(18*B,y*B);g.lineTo(34*B,y*B);g.stroke()}for(const x of [18,22,26,30,34]){g.beginPath();g.moveTo(x*B,14*B);g.lineTo(x*B,21*B);g.stroke()}
  // buildings, props
  for(const b of R2B)hbBakeB(g,b,R);
  for(const p of R2P)r2BakeProp(g,p,R);
}
function r2BakeProp(g,p,R){
  const B=BP,X=p.x*B,Y=p.y*B,w=(p.w||1)*B,h=(p.h||1)*B,cx=X+w/2,cy=Y+B/2,ol='rgba(10,12,14,.65)';g.save();
  const sh=(ww)=>{g.fillStyle='rgba(0,0,0,.34)';g.beginPath();g.ellipse(cx,Y+h-B*.12,ww||w*.45,B*.1,0,0,7);g.fill()};
  switch(p.t){
   case'wreck':{   // the MARY KELLY: a beached trawler on her side, ribs showing aft
     g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(cx,Y+h*.7,w*.5,h*.32,0,0,7);g.fill();
     g.fillStyle='#5c3a2a';g.beginPath();g.moveTo(X+B*.1,Y+h*.6);g.quadraticCurveTo(X+w*.1,Y+h*.05,X+w*.55,Y+h*.12);g.lineTo(X+w*.95,Y+h*.3);g.quadraticCurveTo(X+w,Y+h*.75,X+w*.6,Y+h*.86);g.lineTo(X+B*.3,Y+h*.86);g.closePath();g.fill();g.strokeStyle=ol;g.lineWidth=3;g.stroke();
     g.fillStyle='#B5643C';g.beginPath();g.moveTo(X+B*.2,Y+h*.62);g.quadraticCurveTo(X+w*.15,Y+h*.3,X+w*.5,Y+h*.3);g.lineTo(X+w*.5,Y+h*.5);g.lineTo(X+B*.25,Y+h*.72);g.closePath();g.fill();
     g.strokeStyle='#3a2a1c';g.lineWidth=5;for(let i=0;i<5;i++){const rx=X+w*(.58+i*.075);g.beginPath();g.moveTo(rx,Y+h*.2+i*2);g.quadraticCurveTo(rx+B*.15,Y+h*.5,rx,Y+h*.82);g.stroke()}   // ribs
     g.fillStyle='#e8e2d0';g.font='700 '+Math.round(B*.26)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('MARY KELLY',X+w*.3,Y+h*.47);
     g.fillStyle='#4a5a63';g.fillRect(X+w*.32,Y+h*.08,B*.6,B*.45);g.strokeStyle=ol;g.lineWidth=2;g.strokeRect(X+w*.32,Y+h*.08,B*.6,B*.45);   // wheelhouse
     g.fillStyle='rgba(240,240,232,.8)';for(let i=0;i<14;i++)g.fillRect(X+R()*w,Y+R()*h*.5,3,2);   // gull droppings, honestly
     break}
   case'saltpile':{sh(B*.42);g.fillStyle='#ece6d8';g.beginPath();g.moveTo(X+B*.08,Y+B*.86);g.quadraticCurveTo(cx,Y-B*.05,X+B*.92,Y+B*.86);g.closePath();g.fill();g.strokeStyle='rgba(120,110,95,.6)';g.lineWidth=2.5;g.stroke();
     g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.moveTo(cx-B*.1,Y+B*.3);g.quadraticCurveTo(cx-B*.28,Y+B*.6,cx-B*.3,Y+B*.84);g.lineTo(cx-B*.12,Y+B*.84);g.closePath();g.fill();break}
   case'rake':{g.strokeStyle='#6b4f33';g.lineWidth=4;g.beginPath();g.moveTo(X+B*.15,Y+B*.8);g.lineTo(X+B*.85,Y+B*.35);g.stroke();g.strokeStyle='#8a8f91';g.lineWidth=3;g.beginPath();g.moveTo(X+B*.7,Y+B*.2);g.lineTo(X+B*.98,Y+B*.52);g.stroke();for(let i=0;i<4;i++){g.beginPath();g.moveTo(X+B*(.72+i*.08),Y+B*(.24+i*.09));g.lineTo(X+B*(.66+i*.08),Y+B*(.3+i*.09));g.stroke()}break}
   case'booth':{sh(B*.44);g.fillStyle='#4a5a63';g.fillRect(X+B*.12,Y+B*.1,B*.76,B*.78);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.12,Y+B*.1,B*.76,B*.78);g.fillStyle='#B5643C';g.fillRect(X+B*.06,Y,B*.88,B*.16);
     g.fillStyle='rgba(159,196,212,.55)';g.fillRect(X+B*.2,Y+B*.24,B*.6,B*.28);g.fillStyle='#e8e2d0';g.font='700 '+Math.round(B*.15)+'px "Barlow Condensed",sans-serif';g.textAlign='center';g.fillText('TOLL',cx,Y+B*.72);break}
   case'sign':{g.fillStyle='#2a1f18';g.fillRect(cx-B*.04,Y+B*.3,B*.08,B*.6);g.fillStyle='#e8e2d0';g.fillRect(X+B*.02,Y+B*.04,B*.96,B*.36);g.strokeStyle=ol;g.lineWidth=2;g.strokeRect(X+B*.02,Y+B*.04,B*.96,B*.36);
     g.fillStyle='#3A464E';g.font='700 '+Math.round(B*.13)+'px "Barlow Condensed",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('CINDERHOLD →',cx,Y+B*.16);g.fillStyle='#A55132';g.fillText('9 MI',cx,Y+B*.31);break}
   case'gatepost':{sh(B*.24);g.fillStyle='#2b3036';g.fillRect(cx-B*.14,Y+B*.1,B*.28,B*.76);g.fillStyle='#B5643C';g.fillRect(cx-B*.16,Y+B*.06,B*.32,B*.12);g.strokeStyle=ol;g.lineWidth=2;g.strokeRect(cx-B*.14,Y+B*.1,B*.28,B*.76);break}
   case'laundry':{   // poles and line baked; the washing flaps in r2Anim
     g.fillStyle='#2a1f18';g.fillRect(X+B*.1,Y+B*.1,B*.07,B*.8);g.fillRect(X+w-B*.17,Y+B*.1,B*.07,B*.8);g.strokeStyle='rgba(40,30,20,.8)';g.lineWidth=2;g.beginPath();g.moveTo(X+B*.13,Y+B*.16);g.quadraticCurveTo(cx,Y+B*.3,X+w-B*.13,Y+B*.16);g.stroke();break}
   default:hbBakeProp(g,p,R);
  }
  g.restore()}

/* ---- island life (per frame; small, no gradients except the one cheap plume puff) ---- */
let r2LastT=0;
function r2Anim(og,OT,tm){
  const dt=Math.min(.2,Math.max(0,tm-r2LastT));r2LastT=tm;r2Life(dt);
  // the ferry moored north of the pier
  {const by=Math.sin(tm*1.1)*OT*.03;og.save();og.translate(0,by);const x0=.7*OT,y0=9.15*OT,W=5.1*OT,H=2.55*OT;
    og.fillStyle='rgba(0,0,0,.3)';og.beginPath();og.ellipse(x0+W/2,y0+H*.6,W*.55,H*.5,0,0,7);og.fill();
    og.fillStyle='#f1ead8';og.strokeStyle='#14181b';og.lineWidth=2.6;og.beginPath();og.moveTo(x0,y0+H*.15);og.lineTo(x0+W*.82,y0+H*.15);og.quadraticCurveTo(x0+W*1.06,y0+H*.5,x0+W*.82,y0+H*.95);og.lineTo(x0,y0+H*.95);og.closePath();og.fill();og.stroke();
    og.fillStyle='#C2492F';og.fillRect(x0,y0+H*.15,W*.82,OT*.14);og.fillStyle='#8a6a4a';og.fillRect(x0+OT*.2,y0+H*.3,W*.62,H*.5);
    og.fillStyle='#4A6FA5';og.fillRect(x0+W*.1,y0+H*.36,W*.3,H*.36);og.strokeStyle='#14181b';og.lineWidth=2;og.strokeRect(x0+W*.1,y0+H*.36,W*.3,H*.36);og.fillStyle='#ffe9b0';for(let i=0;i<3;i++)og.fillRect(x0+W*(.13+i*.09),y0+H*.42,W*.05,H*.12);
    og.fillStyle='#2a3338';og.font='700 '+Math.round(OT*.2)+'px "Bowlby One",Impact,sans-serif';og.textAlign='center';og.textBaseline='middle';og.fillText('FERRY',x0+W*.62,y0+H*.55);og.restore()}
  // the Cinderhold smoke plume on the eastern horizon (three puffs, slow)
  for(let i=0;i<5;i++){const t=((tm*.05+i/5)%1),x=40.6*OT+t*OT*1.8+Math.sin(tm*.3+i)*OT*.2,y=4.2*OT-t*OT*3.6;og.fillStyle='rgba(60,58,56,'+(.36*(1-t))+')';og.beginPath();og.arc(x,y,OT*(.35+t*.9),0,7);og.fill()}
  // laundry flapping on the line
  for(let i=0;i<4;i++){const x=(13.35+i*.62)*OT,y=7.24*OT+Math.sin(i*1.3)*OT*.04,sw=Math.sin(tm*4+i)*OT*.08;og.fillStyle=['#E8E2D0','#B5643C','#4E7C7A','#E8C53A'][i];og.beginPath();og.moveTo(x,y);og.lineTo(x+OT*.42,y);og.lineTo(x+OT*.42+sw,y+OT*.46);og.lineTo(x+sw,y+OT*.46);og.closePath();og.fill()}
  // tumbleweed rolling across the flats
  for(const [y0,sp,ph] of [[16.4,.05,0],[19.3,.035,.5]]){const t=((tm*sp+ph)%1),x=(18+t*16)*OT,y=y0*OT+Math.abs(Math.sin(tm*3+ph*9))*-OT*.12;og.save();og.translate(x,y);og.rotate(tm*3);og.strokeStyle='#8a7a52';og.lineWidth=1.4;for(let k=0;k<5;k++){og.beginPath();og.ellipse(0,0,OT*(.1+k*.015),OT*(.16-k*.012),k*.7,0,5.6);og.stroke()}og.fillStyle='rgba(0,0,0,.18)';og.beginPath();og.ellipse(0,OT*.2,OT*.14,OT*.04,0,0,7);og.fill();og.restore()}
  // gulls: on the wreck, on the pier posts, one riding the wind
  for(const [gx,gy,ph] of [[19.2,21.8,0],[21.4,21.6,1.7],[4.2,11.7,.9],[24.4,2.6,2.4],[33,12.6,3.3]]){const fl=Math.sin(tm*5+ph)>.6,x=gx*OT+Math.sin(tm*.5+ph)*OT*.08,y=gy*OT;og.save();og.translate(x,y);og.fillStyle='#ecebe4';og.beginPath();og.ellipse(0,0,OT*.09,OT*.055,0,0,7);og.fill();og.strokeStyle='#ecebe4';og.lineWidth=2;og.beginPath();if(fl){og.moveTo(-OT*.02,0);og.lineTo(-OT*.19,-OT*.1);og.moveTo(OT*.02,0);og.lineTo(OT*.19,-OT*.1)}else{og.moveTo(-OT*.02,0);og.lineTo(-OT*.16,OT*.03);og.moveTo(OT*.02,0);og.lineTo(OT*.16,OT*.03)}og.stroke();og.fillStyle='#d9a437';og.fillRect(OT*.08,-OT*.01,OT*.05,OT*.02);og.restore()}
  {const t=(tm*.06)%1.3-.15,gx=t*R2W*OT,gy=(5+Math.sin(tm*.7)*.8)*OT,fl=Math.sin(tm*7)>0;og.save();og.translate(gx,gy);og.strokeStyle='#ecebe4';og.lineWidth=2.4;og.beginPath();og.moveTo(-OT*.2,fl?-OT*.1:OT*.04);og.lineTo(0,0);og.lineTo(OT*.2,fl?-OT*.1:OT*.04);og.stroke();og.restore()}
  // pennants on the Salt Works roof
  for(const [fx,fy,col,ph] of [[27.3,4.2,'#A55132',0],[32.6,4.2,'#E8E2D0',1.4]]){og.save();og.translate(fx*OT,fy*OT);og.strokeStyle='#14181b';og.lineWidth=2.2;og.beginPath();og.moveTo(0,0);og.lineTo(0,-OT*.95);og.stroke();og.fillStyle=col;og.beginPath();og.moveTo(0,-OT*.95);for(let i=0;i<=6;i++)og.lineTo(i*OT*.09,-OT*.95+Math.sin(tm*5+i*.7+ph)*OT*.05);for(let i=6;i>=0;i--)og.lineTo(i*OT*.09,-OT*.62+Math.sin(tm*5+i*.7+ph)*OT*.05);og.closePath();og.fill();og.restore()}
  // ripples off the pier end and the causeway
  for(const [rx,ry] of [[.6,12.9],[41.5,11.6],[41.5,14.4]]){for(let i=0;i<2;i++){const t=((tm*.5+i*.5+rx)%1);og.strokeStyle='rgba(220,235,238,'+(.28*(1-t))+')';og.lineWidth=1.6;og.beginPath();og.ellipse(rx*OT,ry*OT,OT*(.25+t*.7),OT*(.09+t*.25),0,0,7);og.stroke()}}
  // the causeway chain, until the Dredgers fall
  if(!r2GateOpen()){const x=39.5*OT,y0=11.9*OT,y1=14.1*OT,sw=Math.sin(tm*1.6)*OT*.05;og.strokeStyle='#9aa4a8';og.lineWidth=3;og.setLineDash([4,3]);og.beginPath();og.moveTo(x,y0);og.quadraticCurveTo(x+OT*.25+sw,(y0+y1)/2,x,y1);og.stroke();og.setLineDash([]);
    og.fillStyle='#A55132';og.fillRect(x+OT*.05+sw*.5,(y0+y1)/2-OT*.14,OT*.36,OT*.28);og.strokeStyle='#E8E2D0';og.lineWidth=2;og.beginPath();og.moveTo(x+OT*.12,(y0+y1)/2-OT*.07);og.lineTo(x+OT*.34,(y0+y1)/2+OT*.07);og.moveTo(x+OT*.34,(y0+y1)/2-OT*.07);og.lineTo(x+OT*.12,(y0+y1)/2+OT*.07);og.stroke()}
}

/* ---- the ferry deck: the room renderer, then sea, rails and the bow ramp painted over it; the sea slides past while you stand ---- */
function r2BakeDeck(c,m){
  const keep=m.props;m.props=keep.filter(p=>p.k!=='ramp'&&p.k!=='ring');owBakeHarborRoom(c,m);m.props=keep;
  const g=c.getContext('2d'),B=BP,W=m.w*B,H=m.h*B;
  for(const sx of [0,W-B]){g.fillStyle='#2a434d';g.fillRect(sx,0,B,H);g.fillStyle='#8a8f91';g.fillRect(sx===0?B-8:W-B,2*B,8,H-3*B);for(let y=2*B;y<H-B;y+=B*.5){g.fillStyle='#5a6064';g.fillRect(sx===0?B-10:W-B+2,y,8,6)}}   // sea beyond the rails
  g.fillStyle='#2a434d';g.fillRect(0,H-B,W,B);for(const x of m.ex){g.fillStyle='#5a4632';g.fillRect(x*B,H-B,B,B);g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=2;for(let i=1;i<4;i++){g.beginPath();g.moveTo(x*B,H-B+i*B/4);g.lineTo(x*B+B,H-B+i*B/4);g.stroke()}}   // the stern gangway
  g.fillStyle='#e8e2d0';g.font='700 '+Math.round(B*.2)+'px "Barlow Condensed",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('STERN  ·  HALE HARBOR',W/2,H-B*.18);
  // wheelhouse windows on the back wall
  for(let i=0;i<4;i++){const wx=B*(1.6+i*2.3),wy=B*.95;g.fillStyle='#14181b';g.fillRect(wx-3,wy-3,B*.9+6,B*.42+6);g.fillStyle='rgba(159,196,212,.6)';g.fillRect(wx,wy,B*.9,B*.42)}
  // bow ramp (top centre): steel with chevrons pointing ashore
  {const p=m.props.find(q=>q.k==='ramp');if(p){const X=p.x*B,Y=p.y*B,w=(p.w||2)*B;g.fillStyle='#6e7477';g.fillRect(X+4,Y+4,w-8,B-8);g.strokeStyle='#14181b';g.lineWidth=3;g.strokeRect(X+4,Y+4,w-8,B-8);g.fillStyle='#E8C53A';for(let i=0;i<3;i++){const cx=X+w*(.25+i*.25);g.beginPath();g.moveTo(cx-B*.18,Y+B*.62);g.lineTo(cx,Y+B*.34);g.lineTo(cx+B*.18,Y+B*.62);g.lineTo(cx+B*.1,Y+B*.62);g.lineTo(cx,Y+B*.48);g.lineTo(cx-B*.1,Y+B*.62);g.closePath();g.fill()}
    g.fillStyle='#e8e2d0';g.font='700 '+Math.round(B*.16)+'px "Barlow Condensed",sans-serif';g.fillText('BOW  ·  ASHORE',X+w/2,Y+B*.18)}}
  // life ring on the back wall
  {const p=m.props.find(q=>q.k==='ring');if(p){const X=(p.x+.5)*B,Y=B*1.1;g.strokeStyle='#E8743A';g.lineWidth=B*.16;g.beginPath();g.arc(X,Y,B*.3,0,7);g.stroke();g.strokeStyle='#f4ecd6';g.lineWidth=B*.16;for(let a=0;a<4;a++){g.beginPath();g.arc(X,Y,B*.3,a*Math.PI/2,a*Math.PI/2+.4);g.stroke()}}}
}
function r2DeckAnim(og,OT,tm){
  if(!M||!M.def||!M.def.deck)return;const H=M.h*OT,W=M.w*OT;
  for(const sx of [0,W-OT]){for(let i=0;i<7;i++){const y=((tm*1.4*OT+i*OT*1.5)%(H+OT))-OT*.5,x=sx+OT*(.15+((i*37)%60)/100);og.strokeStyle='rgba(220,235,240,.28)';og.lineWidth=2;og.beginPath();og.moveTo(x,y);og.lineTo(x,y+OT*.45);og.stroke()}}
  for(let i=0;i<6;i++){const t=((tm*.6+i/6)%1),x=W/2+(i%2?1:-1)*t*W*.45;og.fillStyle='rgba(235,242,240,'+(.3*(1-t))+')';og.beginPath();og.ellipse(x,H-OT*.45,OT*(.2+t*.4),OT*.08,0,0,7);og.fill()}   // the wake
}
Object.assign(HB_ACTLAB,{bow:'GO ASHORE',bell:'BELL'});


const RWD={};const owGot=()=>true;
const UNL_J={1:1},UNL_P={2:1};   // one jersey + one pants per town, earned from that town's arcade mini-game (score 15+)
const ARC_WIN=15;
const unlJ=i=>!UNL_J[i]||(SAVE.arcWon||[]).includes(UNL_J[i])||SAVE.uni.j===i,unlP=i=>!UNL_P[i]||(SAVE.arcWon||[]).includes(UNL_P[i])||SAVE.uni.p===i,unlC=()=>true;
const owMet=()=>(SAVE.met||[]).length;

/* ---------- map objects ---------- */
const OWMAPS={};
function owMap(id){
  if(OWMAPS[id])return OWMAPS[id];
  let m;
  if(id==='street'){m={id,w:32,h:40,props:OWP,npcs:OWN,gates:OWGATES,room:false}}
  else if(id==='spillway'){m={id,w:SPW,h:SPH,props:SPPROPS,npcs:SPNPCS,gates:[],room:false,route:true}}
  else if(id==='harbor'){m={id,w:HBW,h:HBH,props:HB_PROPS,npcs:HB_NPCS,gates:[],room:false,harbor:true}}
  else if(id==='island'){m={id,w:R2W,h:R2H,props:R2_PROPS,npcs:R2_NPCS,gates:[],room:false,island:true}}
  else if(HBI[id]){const d=HBI[id];m={id,w:d.w,h:d.h,props:d.props,npcs:d.npcs,gates:[],room:true,def:d,hb:true,r2:!!d.r2,ex:d.ex||[Math.floor(d.w/2)-1,Math.floor(d.w/2)]}}
  else{const d=OWI[id];m={id,w:d.w,h:d.h,props:d.props,npcs:d.npcs,gates:[],room:true,def:d,ex:d.ex||[Math.floor(d.w/2)-1,Math.floor(d.w/2)]}}
  m.solid=new Uint8Array(m.w*m.h);if(m.route)m.solid.set(SPG.S);if(m.harbor)m.solid.set(hbSolidGrid());if(m.island)m.solid.set(r2SolidGrid());
  const S=(x,y)=>{if(x>=0&&y>=0&&x<m.w&&y<m.h)m.solid[y*m.w+x]=1};
  if(!m.room&&!m.route&&!m.harbor&&!m.island){
    for(let x=0;x<m.w;x++){S(x,0);if(!(x>=14&&x<=17))S(x,m.h-1)}
    for(let y=0;y<m.h;y++){S(0,y);if(!(y>=19&&y<=21))S(m.w-1,y)}
    for(const b of OWB)for(let y=b.y;y<b.y+b.h;y++)for(let x=b.x;x<b.x+b.w;x++)m.solid[y*m.w+x]=1;
    for(const b of OWB)for(const [x,y] of b.doors)m.solid[y*m.w+x]=0;
    for(let y=OWWATER.y0;y<=OWWATER.y1;y++)for(let x=OWWATER.x0;x<=OWWATER.x1;x++)m.solid[y*m.w+x]=1;
    for(const [x,y] of OWWATER.dock)m.solid[y*m.w+x]=0;
    for(const [x,y] of OWWATER.bridge)m.solid[y*m.w+x]=0;
  }else if(m.room){
    for(let x=0;x<m.w;x++){S(x,0);S(x,1);if(!m.ex.includes(x))S(x,m.h-1)}
    for(let y=0;y<m.h;y++){S(0,y);S(m.w-1,y)}
  }
  if(m.def&&m.def.arch&&m.def.arch.partitions)for(const pt of m.def.arch.partitions)for(let yy=0;yy<(pt.h||1);yy++)for(let xx=0;xx<(pt.w||1);xx++)S(pt.x+xx,pt.y+yy);
  for(const p of m.props)if(p.s)for(let yy=0;yy<(p.h||1);yy++)for(let xx=0;xx<(p.w||1);xx++)S(p.x+xx,p.y+yy);
  if(m.def&&m.def.dgDoors)for(const q of m.def.dgDoors)m.solid[q[1]*m.w+q[0]]=0;OWMAPS[id]=m;return m;
}
let M=owMap('street');
const owNpcAt=(x,y)=>M.npcs.find(n=>n.x===x&&n.y===y&&!n.off);
const owPropAt=(x,y)=>M.props.find(p=>((M.room||M.hb||M.harbor||M.island)?(x>=p.x&&x<p.x+(p.w||1)&&y>=p.y&&y<p.y+(p.h||1)):(p.x===x&&p.y===y))&&(p.m||p.act));
const g0east=x=>x>=28;
const owGateOpen=()=>SAVE.beaten.includes('captain');
const owBlocked=(x,y)=>{if(x<0||y<0||x>=M.w||y>=M.h)return true;if(M.solid[y*M.w+x])return true;if(dgBlock(x,y))return true;if(M.harbor&&hbIsGate(x,y)&&!hbGateOpen())return true;if(M.harbor&&hbIsYard(x,y)&&!hbYardOpen())return true;if(M.island&&r2IsGate(x,y)&&!r2GateOpen())return true;if(owNpcAt(x,y))return true;if(M.gates.some(g=>g[0]===x&&g[1]===y&&(g[0]>=28||!owGateOpen())))return true;return false};
const owDoorAt=(x,y)=>{if(M.room||M.route)return null;if(M.harbor)return hbDoorAt(x,y);if(M.island)return r2DoorAt(x,y);for(const b of OWB)for(const d of b.doors)if(d[0]===x&&d[1]===y)return b;return null};

/* ---------- baking ---------- */
function owNeon(g,txt,x,y,size,col,vertical){
  g.save();g.textAlign='center';g.textBaseline='middle';g.font='400 '+size+'px "Bowlby One",'+KJ;
  if(vertical){let yy=y-(txt.length-1)*size*.55;for(const ch of txt){g.shadowColor=col;g.shadowBlur=size*.7;g.fillStyle=col;g.fillText(ch,x,yy);g.shadowBlur=size*.25;g.fillStyle='#fff';g.fillText(ch,x,yy);yy+=size*1.1}}
  else{g.shadowColor=col;g.shadowBlur=size*.6;g.fillStyle=col;g.fillText(txt,x,y);g.shadowBlur=size*.2;g.fillStyle='#fff';g.fillText(txt,x,y)}
  g.restore();
}
let LG=[],VT=[];
/* ============ THE SPILLWAY: Route 1, Vapor City -> Hale Harbor (64 x 26) ============ */
const SPW=64,SPH=26;
/* terrain codes: 0 solid scenery, 1 road, 2 channel floor, 3 coast plateau, 4 water, 5 ramp, 6 alcove, 7 gravel shoulder */
const SPG=(()=>{
  const T=new Uint8Array(SPW*SPH),S=new Uint8Array(SPW*SPH).fill(1);
  const Rc=(x,y,w,h,v,s)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++){if(i<0||j<0||i>=SPW||j>=SPH)continue;T[j*SPW+i]=v;S[j*SPW+i]=s}};
  Rc(3,0,6,22,1,0);Rc(3,15,9,7,1,0);Rc(2,0,1,15,7,0);Rc(9,0,2,15,7,0);          // South Cut road, the turn east, gravel shoulders
  Rc(12,14,45,9,2,0);                                                              // Floodway, 9 tiles wide, x12..56
  Rc(32,11,5,3,6,0);Rc(39,12,3,2,6,0);                                             // rest alcove (50 yd) and maintenance-door nook (65 yd)
  Rc(50,11,3,3,5,0);Rc(44,5,20,6,3,0);                                             // ramp beside the Span, Saltline plateau
  Rc(44,0,20,4,4,1);Rc(57,11,7,15,4,1);                                            // harbor water north and east
  for(const [x,y] of [[54,5],[58,5],[54,10],[58,10]]){T[y*SPW+x]=0;S[y*SPW+x]=1}   // Broken Span pillars
  return{T,S}
})();
const spT=(x,y)=>(x<0||y<0||x>=SPW||y>=SPH)?0:SPG.T[y*SPW+x];
const spYd=y=>14+.4*y;   // yard -> tile x on the Floodway

function owBakeRoute(c,m){
  const g=c.getContext('2d'),R=owRnd(311),B=BP,W=c.width,H=c.height;
  const mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
  const rgb=a=>'rgb('+a[0]+','+a[1]+','+a[2]+')';
  // base colour shifts from city-dark (west) to cold harbor grey-green (east)
  const base=x=>mix([11,16,24],[40,58,62],clamp((x-30)/30,0,1));
  g.fillStyle='#090d14';g.fillRect(0,0,W,H);
  for(let y=0;y<SPH;y++)for(let x=0;x<SPW;x++){
    const t=spT(x,y),X=x*B,Y=y*B,b=base(x);let col;
    if(t===0)col=mix(b,[0,0,0],.35);else if(t===1)col=mix([34,28,28],[34,46,50],clamp((x-30)/30,0,1));
    else if(t===2){const u=clamp((x-12)/44,0,1);col=u<.5?mix([84,76,66],[68,70,70],u*2):mix([68,70,70],[60,76,88],(u-.5)*2)}else if(t===3)col=[58,76,88];else if(t===4)col=[22,48,58];
    else if(t===5)col=[60,74,80];else if(t===6)col=[40,50,58];else col=[24,30,38];
    const v=(R()-.5)*3;g.fillStyle=rgb(col.map(q=>clamp(q+v,0,255)));g.fillRect(X,Y,B+1,B+1)}
  // water: slow bands and reflections
  for(let y=0;y<SPH;y++)for(let x=0;x<SPW;x++)if(spT(x,y)===4){const X=x*B,Y=y*B;
    for(let i=0;i<3;i++){g.strokeStyle='rgba(150,210,220,'+(.05+R()*.07)+')';g.lineWidth=2;g.beginPath();const yy=Y+R()*B;g.moveTo(X+R()*B*.3,yy);g.lineTo(X+B*(.6+R()*.4),yy);g.stroke()}}
  // asphalt: seams, patches, painted edge lines, drains
  for(let y=0;y<22;y++)for(let x=3;x<12;x++)if(spT(x,y)===1){const X=x*B,Y=y*B;
    if(R()<.25){g.fillStyle='rgba(0,0,0,.10)';g.fillRect(X+R()*B*.4,Y+R()*B*.4,B*(.2+R()*.4),B*(.15+R()*.3))}
    if(R()<.06){g.strokeStyle='rgba(120,140,150,.25)';g.lineWidth=2;g.beginPath();g.moveTo(X+R()*B,Y);g.lineTo(X+R()*B,Y+B);g.stroke()}}
  g.strokeStyle='rgba(230,200,90,.55)';g.lineWidth=5;g.setLineDash([B*.5,B*.5]);g.beginPath();g.moveTo(5.9*B,0);g.lineTo(5.9*B,16.3*B);g.stroke();g.setLineDash([]);
  g.strokeStyle='rgba(210,220,225,.4)';g.lineWidth=4;g.beginPath();g.moveTo(3.1*B,0);g.lineTo(3.1*B,21.9*B);g.stroke();g.beginPath();g.moveTo(8.9*B,0);g.lineTo(8.9*B,14.9*B);g.stroke();
  // chevrons pointing the way east on the turn
  g.fillStyle='rgba(235,205,100,.5)';for(let i=0;i<3;i++){const cx=(5+i*2.2)*B,cy=18.5*B;g.beginPath();g.moveTo(cx,cy-B*.5);g.lineTo(cx+B*.5,cy);g.lineTo(cx,cy+B*.5);g.lineTo(cx+B*.2,cy);g.closePath();g.fill()}
  // ---------- industrial mass north of the channel ----------
  const roof=(x,y,w,h,col,det)=>{const X=x*B,Y=y*B,Wd=w*B,Hh=h*B;
    g.fillStyle='rgba(0,0,0,.45)';g.fillRect(X+B*.25,Y+B*.35,Wd,Hh);
    g.fillStyle=col;g.fillRect(X,Y,Wd,Hh);g.strokeStyle='rgba(180,200,210,.28)';g.lineWidth=3;g.strokeRect(X+1.5,Y+1.5,Wd-3,Hh-3);
    g.fillStyle='rgba(255,255,255,.05)';for(let i=1;i<w;i++)g.fillRect(X+i*B-1,Y,2,Hh*.72);
    // facade strip on the south face
    const fy=Y+Hh-B*1.15;g.fillStyle='rgba(0,0,0,.5)';g.fillRect(X,fy,Wd,B*1.15);
    for(let i=0;i<Math.floor(w);i++){if(R()<.55){g.fillStyle='rgba(230,170,90,'+(.18+R()*.3)+')';g.fillRect(X+i*B+B*.2,fy+B*.25,B*.6,B*.3)}}
    if(det)det(X,Y,Wd,Hh)};
  const vents=(X,Y,Wd,Hh)=>{for(let i=0;i<Wd/B/2.2;i++){const vx=X+B*(.6+i*2.2),vy=Y+B*(.5+R()*1.2);g.fillStyle='#232c36';g.fillRect(vx,vy,B*.8,B*.8);g.fillStyle='#10161e';g.beginPath();g.arc(vx+B*.4,vy+B*.4,B*.28,0,7);g.fill()}};
  roof(11,0,10,11,'#1a222d',vents);roof(22.5,1,8,10,'#161e28',vents);roof(32,2,5.5,9,'#1c2631',vents);roof(37.5,3,6.5,8,'#17202a',vents);
  // west side of the road: fence and cut-off scrap yard
  g.fillStyle='#0b1018';g.fillRect(0,0,2*B,22*B);
  g.strokeStyle='rgba(150,170,180,.5)';g.lineWidth=2;for(let y=0;y<15;y+=.5){g.beginPath();g.moveTo(2*B,y*B);g.lineTo(2*B+B*.18,(y+.25)*B);g.stroke()}
  g.strokeStyle='rgba(150,170,180,.45)';g.lineWidth=4;g.beginPath();g.moveTo(2.1*B,0);g.lineTo(2.1*B,15*B);g.stroke();
  // stacked containers (muted), tanks and pipes
  const cont=(x,y,w,col)=>{const X=x*B,Y=y*B;g.fillStyle='rgba(0,0,0,.4)';g.fillRect(X+B*.2,Y+B*.3,w*B,B*1.7);g.fillStyle=col;g.fillRect(X,Y,w*B,B*1.7);g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=2;for(let i=1;i<w*3;i++){g.beginPath();g.moveTo(X+i*B/3,Y+3);g.lineTo(X+i*B/3,Y+B*1.7-3);g.stroke()}};
  cont(0,16,2,'#4b3a2f');cont(0,18.3,2,'#2f4650');cont(0,20.4,2,'#56483a');
  cont(13,23,3,'#3b4a52');cont(18,23.2,3,'#4a3d34');cont(25,23,3,'#2e4148');cont(41,23.1,3,'#46403a');
  for(const [tx,ty] of [[44.5,0.6],[47.5,0.6]]){}
  // ---------- channel north wall and south wall ----------
  const wall=(x0,x1,y0,y1,light)=>{for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)if(spT(x,y)===0){const X=x*B,Y=y*B;g.fillStyle=y===y1-1?'#4a5864':'#323f4a';g.fillRect(X,Y,B+1,B+1);
      if(R()<.5){g.fillStyle='rgba(120,160,150,'+(.05+R()*.1)+')';g.fillRect(X+R()*B*.5,Y,B*.2,B)}
      if(y===y1-1){g.fillStyle='rgba(255,255,255,.12)';g.fillRect(X,Y,B,4)}}};
  wall(12,57,11,14);wall(12,57,23,26);
  // salt stains and runoff streaks on channel walls
  for(let i=0;i<60;i++){const x=12+R()*45,y=R()<.5?11+R()*2.5:23+R()*2.5;g.fillStyle='rgba(190,215,205,'+(.04+R()*.07)+')';g.fillRect(x*B,y*B,B*(.15+R()*.4),B*(.5+R()*1.5))}
  // drain outlets on the south wall
  for(let x=16;x<56;x+=6.5){const X=x*B,Y=23.3*B;g.fillStyle='#10161c';g.fillRect(X,Y,B*1.3,B*.8);g.fillStyle='rgba(120,190,200,.28)';g.fillRect(X+B*.3,Y+B*.8,B*.7,B*1.4)}
  // ---------- FLOODWAY field markings ----------
  const fx0=12*B,fx1=57*B,fy0=14*B,fy1=23*B;
  for(let x=12;x<57;x++)for(let y=14;y<23;y++){const X=x*B,Y=y*B;g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=2;g.strokeRect(X,Y,B,B);if(R()<.07){g.fillStyle='rgba(0,0,0,.2)';g.fillRect(X+R()*B*.5,Y+R()*B*.5,B*.4,B*.3)}}
  spTexture(g,B,R);
  // end zones
  const ez=(x0,x1,col)=>{g.fillStyle=col;g.fillRect(x0*B,fy0,(x1-x0)*B,fy1-fy0);g.fillStyle='rgba(255,255,255,.07)';for(let i=-12;i<14;i+=2){g.save();g.beginPath();g.rect(x0*B,fy0,(x1-x0)*B,fy1-fy0);g.clip();g.beginPath();g.moveTo(x0*B+i*B*.6,fy0);g.lineTo(x0*B+i*B*.6+B*9,fy1);g.lineTo(x0*B+i*B*.6+B*9+B*.5,fy1);g.lineTo(x0*B+i*B*.6+B*.5,fy0);g.fill();g.restore()}};
  ez(12,14,'rgba(40,120,120,.34)');ez(54,57,'rgba(198,242,58,.2)');
  g.fillStyle='rgba(210,225,225,.6)';g.font='700 '+Math.round(B*1.2)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';
  g.save();g.translate(13*B,18.5*B);g.rotate(-Math.PI/2);g.fillText('CHANNEL',0,0);g.restore();g.save();g.translate(55.5*B,19.4*B);g.rotate(Math.PI/2);g.font='700 '+Math.round(B*.95)+'px "Bowlby One",Impact,sans-serif';g.fillText('RATS',0,0);g.restore();
  // sidelines
  g.fillStyle='rgba(225,232,235,.62)';g.fillRect(fx0,14.1*B,fx1-fx0,B*.14);g.fillRect(fx0,22.76*B,fx1-fx0,B*.14);
  // yard lines every 10 yards (4 tiles), thicker at midfield
  for(let k=0;k<=10;k++){const x=spYd(k*10)*B;g.fillStyle='rgba(225,232,235,'+(k%5===0?.62:.5)+')';g.fillRect(x-B*.07,fy0,B*(k===5?.2:.14),fy1-fy0)}
  // 5-yard ticks and hash marks
  for(let yd=5;yd<100;yd+=5){if(yd%10===0)continue;const x=spYd(yd)*B;g.fillStyle='rgba(225,232,235,.4)';g.fillRect(x-B*.04,fy0,B*.08,B*.7);g.fillRect(x-B*.04,fy1-B*.7,B*.08,B*.7);g.fillRect(x-B*.04,17.2*B,B*.08,B*.4);g.fillRect(x-B*.04,19.4*B,B*.08,B*.4)}
  for(let yd=1;yd<100;yd++){if(yd%5===0)continue;const x=spYd(yd)*B;g.fillStyle='rgba(225,232,235,.3)';g.fillRect(x-B*.025,17.3*B,B*.05,B*.22);g.fillRect(x-B*.025,19.5*B,B*.05,B*.22)}
  // yard numerals: 1.4 tiles tall, centred on their yard line, upper set reads from the north wall, lower set from the south wall
  g.fillStyle='rgba(225,235,238,.45)';g.font='700 '+Math.round(B*1.4)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';
  for(let k=1;k<=9;k++){const n=(k<=5?k:10-k)*10,x=spYd(k*10)*B;
    g.fillText(String(n),x,15.55*B);g.save();g.translate(x,21.2*B);g.rotate(Math.PI);g.fillText(String(n),0,0);g.restore()}
  // wear: overpaint speckle in floor colour
  for(let i=0;i<2400;i++){const x=(12+R()*45)*B,y=(14+R()*9)*B;g.fillStyle='rgba(60,74,82,'+(.2+R()*.35)+')';g.fillRect(x,y,B*(.04+R()*.25),B*(.03+R()*.12))}
  // cracks, rubble, puddles
  g.strokeStyle='rgba(10,14,18,.5)';g.lineWidth=3;for(let i=0;i<26;i++){let x=(13+R()*43)*B,y=(14.4+R()*8)*B;g.beginPath();g.moveTo(x,y);for(let j=0;j<5;j++){x+=(R()-.35)*B*.6;y+=(R()-.5)*B*.5;g.lineTo(x,y)}g.stroke()}
  for(let i=0;i<14;i++){const x=(13+R()*43)*B,y=(14.6+R()*7.6)*B;g.fillStyle='rgba(20,34,40,.55)';g.beginPath();g.ellipse(x,y,B*(.4+R()*.6),B*(.18+R()*.25),0,0,7);g.fill();g.strokeStyle='rgba(160,210,220,.18)';g.lineWidth=2;g.stroke()}
  // rest alcove 50 yd, door nook 65 yd
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(32*B,11*B,5*B,B*.5);g.fillStyle='#202a33';g.fillRect(32*B,11*B,5*B,B*1.2);
  g.fillStyle='#14222a';g.fillRect(39*B,12*B,3*B,B*.9);
  // sluice gate on the east end and the harbor beyond
  g.fillStyle='#26323b';g.fillRect(57*B,14*B,B*.9,9*B);for(let y=14;y<23;y++){g.fillStyle='rgba(110,140,150,.5)';g.fillRect(57.1*B,y*B+B*.15,B*.7,B*.12)}
  // ramp: ridged slope
  for(let y=11;y<14;y++)for(let x=50;x<53;x++){const X=x*B,Y=y*B;g.fillStyle='rgba(255,255,255,.07)';for(let i=0;i<5;i++)g.fillRect(X,Y+i*B/5,B,2)}
  g.fillStyle='rgba(235,205,100,.5)';g.fillRect(49.85*B,11*B,B*.1,3*B);g.fillRect(53*B-B*.05,11*B,B*.1,3*B);
  // ---------- SALTLINE: plateau, harbor, cranes, skyline ----------
  for(let x=44;x<64;x++)for(let y=5;y<11;y++){const X=x*B,Y=y*B;g.fillStyle='rgba(0,0,0,.14)';g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=2;g.strokeRect(X,Y,B,B);if(R()<.35){g.fillStyle='rgba(205,225,215,'+(.04+R()*.07)+')';g.fillRect(X+R()*B*.5,Y+R()*B*.5,B*.5,B*.3)}}
  g.strokeStyle='rgba(225,232,235,.45)';g.lineWidth=4;g.setLineDash([B*.6,B*.5]);g.beginPath();g.moveTo(44*B,7.5*B);g.lineTo(64*B,7.5*B);g.stroke();g.setLineDash([]);
  g.fillStyle='#161e27';g.fillRect(44*B,4*B,20*B,B);g.strokeStyle='rgba(180,200,205,.5)';g.lineWidth=3;for(let x=44;x<64;x++){g.beginPath();g.moveTo(x*B,4*B);g.lineTo(x*B+B*.5,5*B);g.lineTo(x*B+B,4*B);g.stroke()}
  // cranes on the quay (north water)
  const crane=(x,y,s)=>{g.save();g.translate(x*B,y*B);g.scale(s,s);g.strokeStyle='#33424c';g.lineWidth=5;g.fillStyle='#3d4d58';g.fillRect(-B*.3,-B*.1,B*.6,B*.9);g.beginPath();g.moveTo(0,0);g.lineTo(0,-B*3);g.moveTo(-B*1.2,-B*3);g.lineTo(B*2.8,-B*3);g.moveTo(0,-B*3);g.lineTo(-B*1.2,-B*2.6);g.stroke();g.strokeStyle='rgba(190,60,60,.7)';g.lineWidth=3;g.beginPath();g.moveTo(B*2.2,-B*3);g.lineTo(B*2.2,-B*1.4);g.stroke();g.fillStyle='rgba(255,90,90,.9)';g.beginPath();g.arc(B*2.8,-B*3,4,0,7);g.fill();g.restore()};
  crane(47.5,3.6,.9);crane(51,3.8,1.1);crane(61,3.7,.95);
  // distant Hale Harbor: hazy silhouettes with a few lit windows, north and east across the water
  const sky=(x0,x1,y0,y1,a)=>{for(let x=x0;x<x1;x+=.55+R()*.5){const w=.4+R()*.7,h=(y1-y0)*(.3+R()*.7);g.fillStyle='rgba(38,58,66,'+a+')';g.fillRect(x*B,y1*B-h*B,w*B,h*B);if(R()<.7){g.fillStyle='rgba(235,225,170,'+(a*.9)+')';for(let j=0;j<2;j++)g.fillRect((x+R()*w*.6)*B,(y1-h*R())*B,B*.07,B*.1)}}};

  // ---------- review pass: void fill, field tint, feathered entrance, ramp markings ----------
  // lower-left: sheds, fence and containers instead of black void
  g.fillStyle='#0f161e';g.fillRect(3*B,22*B,9*B,4*B);
  roof(4,23,5,3,'#1a222d',vents);cont(9.4,23.3,2.4,'#3a4a52');cont(0,23.2,2,'#4b3a2f');
  g.strokeStyle='rgba(150,170,180,.4)';g.lineWidth=3;g.beginPath();g.moveTo(2.4*B,22.1*B);g.lineTo(12*B,22.1*B);g.stroke();
  // jersey barriers along the south shoulder of the road
  for(let i=0;i<7;i++){g.fillStyle='#5a6670';g.fillRect((3.2+i*1.2)*B,21.55*B,B*1.05,B*.34);g.fillStyle='rgba(235,120,60,.6)';g.fillRect((3.2+i*1.2)*B,21.6*B,B*.3,B*.24)}
  // manholes, drain grates, stop line, worn arrows
  for(const [x,y] of [[4.3,5.5],[7.6,10.2],[4.6,16.3]]){g.fillStyle='rgba(8,12,16,.7)';g.beginPath();g.arc(x*B,y*B,B*.34,0,7);g.fill();g.strokeStyle='rgba(120,140,150,.4)';g.lineWidth=2;g.stroke()}
  for(const y of [3.5,8,12.5]){g.fillStyle='rgba(6,10,14,.75)';g.fillRect(8.35*B,y*B,B*.55,B*.9);g.strokeStyle='rgba(120,140,150,.35)';g.lineWidth=1.5;for(let i=1;i<5;i++){g.beginPath();g.moveTo(8.35*B,y*B+i*B*.18);g.lineTo(8.9*B,y*B+i*B*.18);g.stroke()}}
  g.fillStyle='rgba(225,230,235,.4)';g.fillRect(3.2*B,13.4*B,5.6*B,B*.22);
  // warm sodium pools + wet-road reflections and neon smears
  const pool=(x,y,r,c1)=>{const q=g.createRadialGradient(x*B,y*B,0,x*B,y*B,r*B);q.addColorStop(0,c1);q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect((x-r)*B,(y-r)*B,2*r*B,2*r*B)};
  for(const y of [3,9,15])pool(5.8,y,4,'rgba(255,150,70,.13)');pool(5.5,19,4.5,'rgba(255,150,70,.12)');
  for(const [x,y,c] of [[4.2,6.4,'255,60,200'],[7.4,11.2,'60,220,255'],[4.8,17.2,'255,60,200']]){const q=g.createLinearGradient(0,y*B,0,(y+2.2)*B);q.addColorStop(0,'rgba('+c+',.16)');q.addColorStop(1,'rgba('+c+',0)');g.fillStyle=q;g.fillRect(x*B,y*B,B*.35,B*2.2)}
  // lit windows on the warehouse faces beside the cut
  for(let i=0;i<5;i++){g.fillStyle='rgba(255,190,110,'+(.35+R()*.3)+')';g.fillRect((9.3+R()*.9)*B,(1+i*2.6)*B,B*.5,B*.3)}
  // distant Vapor City lights beyond the west fence
  for(let i=0;i<14;i++){g.fillStyle=R()<.5?'rgba(255,120,60,.55)':'rgba(255,70,190,.5)';g.fillRect((.1+R()*1.7)*B,(R()*14)*B,B*.14,B*.14)}
  // ramp: bolder rails, chevrons pointing up, foot lamp glow
  g.fillStyle='rgba(240,215,100,.85)';g.fillRect(49.82*B,11*B,B*.16,3*B);g.fillRect(53*B-B*.08,11*B,B*.16,3*B);
  for(let i=0;i<3;i++){const cy=(13.1-i*.9)*B;g.fillStyle='rgba(240,215,100,.6)';g.beginPath();g.moveTo(51.5*B,cy-B*.4);g.lineTo(52.2*B,cy+B*.1);g.lineTo(51.8*B,cy+B*.1);g.lineTo(51.5*B,cy-B*.1);g.lineTo(51.2*B,cy+B*.1);g.lineTo(50.8*B,cy+B*.1);g.closePath();g.fill()}
  pool(51.5,14.2,3.2,'rgba(255,235,160,.16)');
  // tint across the field: warm for the first ~15 yd, cool over the last ~20; light feathered in at the entrance
  let tg=g.createLinearGradient(12*B,0,20*B,0);tg.addColorStop(0,'rgba(255,150,70,.16)');tg.addColorStop(1,'rgba(255,150,70,0)');g.fillStyle=tg;g.fillRect(12*B,fy0,8*B,fy1-fy0);
  tg=g.createLinearGradient(46*B,0,57*B,0);tg.addColorStop(0,'rgba(110,190,200,0)');tg.addColorStop(1,'rgba(110,190,220,.2)');g.fillStyle=tg;g.fillRect(46*B,fy0,11*B,fy1-fy0);
  tg=g.createLinearGradient(6*B,0,18*B,0);tg.addColorStop(0,'rgba(0,0,0,0)');tg.addColorStop(.5,'rgba(0,0,0,.42)');tg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=tg;g.fillRect(6*B,11*B,12*B,15*B);
  // Hale Harbor: lit far-shore district across the east water, tall tower with beacon, harbor sign on the quay
  // harbor sign painted on the quay: where the route ends
  g.save();g.fillStyle='rgba(205,225,230,.2)';g.font='700 '+Math.round(B*.4)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';if('letterSpacing' in g)g.letterSpacing=Math.round(B*.07)+'px';g.fillText('HALE HARBOR',47.6*B,11.6*B);   // stenciled on the concrete like the yard numbers: faint, worn
  g.globalCompositeOperation='destination-out';for(let i=0;i<70;i++){g.fillStyle='rgba(0,0,0,'+(.1+R()*.2)+')';g.fillRect((43+R()*9.5)*B,(11.25+R()*.7)*B,B*(.04+R()*.1),B*(.02+R()*.05))}g.restore();
  // chalk marks and a spare ball by the kids' catch spot
  g.save();g.strokeStyle='rgba(235,240,235,.38)';g.lineWidth=Math.max(2,B*.035);g.lineCap='round';
  g.beginPath();g.moveTo(49.75*B,9.9*B);g.lineTo(50.25*B,9.9*B);g.moveTo(52.75*B,9.9*B);g.lineTo(52.25*B,9.9*B);g.stroke();   // two throwing marks
  g.setLineDash([B*.12,B*.1]);g.beginPath();g.moveTo(50.5*B,9.9*B);g.lineTo(52*B,9.9*B);g.stroke();g.setLineDash([]);   // dashed line between them
  g.beginPath();g.arc(51.3*B,10.6*B,B*.2,0,7);g.stroke();   // chalk circle
  g.beginPath();g.moveTo(51.2*B,10.5*B);g.lineTo(51.4*B,10.7*B);g.moveTo(51.4*B,10.5*B);g.lineTo(51.2*B,10.7*B);g.stroke();
  g.restore();
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(53.55*B,10.55*B,B*.16,B*.07,0,0,7);g.fill();   // spare ball resting on the ground
  g.fillStyle='#7a4a2a';g.beginPath();g.ellipse(53.5*B,10.45*B,B*.15,B*.09,-.3,0,7);g.fill();g.strokeStyle='#e8e2d4';g.lineWidth=Math.max(1,B*.015);g.beginPath();g.moveTo(53.42*B,10.42*B);g.lineTo(53.58*B,10.48*B);g.stroke();
  g.fillText('▸',62*B,9.2*B);
  for(const p of m.props)spBakeP(g,p,B);
  spPolish(g,m,B,R);
  g.fillStyle='rgba(255,40,30,.9)';g.beginPath();g.arc(8.5*B,14.5*B,B*.07,0,7);g.fill();g.fillStyle='rgba(255,40,30,.35)';g.beginPath();g.arc(8.5*B,14.5*B,B*.16,0,7);g.fill();
  // ---------- atmosphere ----------
  // warm Vapor City glow at the start, fading with distance
  let gr=g.createRadialGradient(5.5*B,-1*B,B,5.5*B,0,B*13);gr.addColorStop(0,'rgba(255,122,50,.26)');gr.addColorStop(.5,'rgba(255,60,140,.1)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);
  // cold fog increasing to the east
  gr=g.createLinearGradient(36*B,0,64*B,0);gr.addColorStop(0,'rgba(150,190,185,0)');gr.addColorStop(1,'rgba(175,210,225,.3)');g.fillStyle=gr;g.fillRect(0,0,W,H);
  gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'rgba(0,0,0,.18)');gr.addColorStop(1,'rgba(0,0,0,.28)');g.fillStyle=gr;g.fillRect(0,0,W,H);
  // lights: warm sodium in the cut, pale green over the channel, cool teal at the quay
  const L=(x,y,r,col,a)=>LG.push({x:x*B,y:y*B,r:r*B,col,a,f:R()*6});
  for(const y of [3,9,15])L(2.6,y,2.6,'#ff7a1a',.28);for(const y of [6,12])L(9.4,y,2.4,'#ff9a50',.24);L(5.5,19,3,'#ff9a50',.2);L(10,18,3,'#ffb070',.18);
  for(const x of [18,30,42,50])L(x,13.5,4.2,'#bff0d8',.18);for(const x of [24,36,48])L(x,23.2,3.6,'#a0d8e8',.14);
  L(34,12,3,'#ffd9a0',.3);L(40,12.8,2.4,'#ff7a60',.2);
  for(const x of [47,53,60])L(x,5.6,3.6,'#9fe8f0',.22);L(61,3.5,3,'#ffe0a0',.18);L(8.5,14.5,1.8,'#ff2a1a',.4);for(const x of [47.5,51,61])L(x+2.5,1.2,2.4,'#ff6a5a',.3);
  // street-lamp posts (drawn, not props)
  const lamp=(x,y)=>{g.fillStyle='#0a0e14';g.fillRect(x*B-3,y*B-B*.6,6,B*.8);g.fillStyle='#ffe9b8';g.beginPath();g.arc(x*B,y*B-B*.65,6,0,7);g.fill()};
  for(const [x,y] of [[2.6,3],[2.6,9],[2.6,15],[9.4,6],[9.4,12],[18,13.6],[30,13.6],[42,13.6],[50,13.6],[45,5.6],[53,5.6],[60,5.6]])lamp(x,y);
  // foreground overpass: the Broken Span (x54..58) drawn over the plateau
  const fc=document.createElement('canvas');fc.width=5*B+8;fc.height=SPH*B;const f=fc.getContext('2d');
  const FX=54*B;
  const deckSeg=(y0,y1,a)=>{f.fillStyle='rgba(66,78,86,'+a+')';f.fillRect(0,y0*B,5*B,(y1-y0)*B);f.fillStyle='rgba(30,38,44,'+(a*.9)+')';f.fillRect(0,y0*B,B*.35,(y1-y0)*B);f.fillRect(4.65*B,y0*B,B*.35,(y1-y0)*B);
    f.strokeStyle='rgba(235,205,100,'+(a*.7)+')';f.lineWidth=4;f.setLineDash([B*.5,B*.5]);f.beginPath();f.moveTo(2.5*B,y0*B);f.lineTo(2.5*B,y1*B);f.stroke();f.setLineDash([]);
    f.strokeStyle='rgba(20,26,30,.45)';f.lineWidth=2;for(let y=y0;y<y1;y+=.5){f.beginPath();f.moveTo(B*.35,y*B);f.lineTo(4.65*B,y*B);f.stroke();const jx=(Math.floor(y*2)%2?1.4:3.2)*B;f.beginPath();f.moveTo(jx,y*B);f.lineTo(jx,(y+.5)*B);f.stroke()}
    f.fillStyle='rgba(12,16,20,'+(a*.8)+')';f.fillRect(.9*B,y0*B,B*.28,(y1-y0)*B);f.fillRect(3.82*B,y0*B,B*.28,(y1-y0)*B);f.fillStyle='rgba(120,130,138,.5)';for(let y=y0+.3;y<y1;y+=1.2){f.fillRect(.97*B,y*B,4,4);f.fillRect(3.89*B,y*B,4,4)}
    f.strokeStyle='rgba(12,16,20,'+(a*.5)+')';f.lineWidth=5;for(let y=y0;y<y1-1.5;y+=3){f.beginPath();f.moveTo(1.1*B,y*B);f.lineTo(3.9*B,(y+1.5)*B);f.moveTo(3.9*B,y*B);f.lineTo(1.1*B,(y+1.5)*B);f.stroke()}
    f.save();f.beginPath();f.rect(0,y0*B,B*.35,(y1-y0)*B);f.rect(4.65*B,y0*B,B*.35,(y1-y0)*B);f.clip();f.fillStyle='rgba(235,200,60,.75)';for(let y=y0-1;y<y1+1;y+=.7){f.beginPath();f.moveTo(0,y*B+B*.4);f.lineTo(5*B,y*B+B*.4-B*.2);f.lineTo(5*B,y*B+B*.4-B*.2+B*.28);f.lineTo(0,y*B+B*.4+B*.28);f.fill()}f.restore()};
  deckSeg(0,15,.62);deckSeg(23,26,.62);
  // jagged break, hazard stripes, rebar
  f.fillStyle='rgba(235,200,60,.8)';for(let i=0;i<10;i++){f.beginPath();f.moveTo(i*B*.5,14.2*B);f.lineTo(i*B*.5+B*.25,14.2*B);f.lineTo(i*B*.5+B*.5,14.6*B);f.lineTo(i*B*.5+B*.25,14.6*B);f.fill()}
  f.fillStyle='rgba(66,78,86,.8)';f.beginPath();f.moveTo(0,15*B);for(let i=0;i<=10;i++)f.lineTo(i*B*.5,15*B+(i%2?B*.5:B*.1)+R()*B*.3);f.lineTo(5*B,15*B);f.closePath();f.fill();
  f.strokeStyle='rgba(150,80,50,.85)';f.lineWidth=3;for(let i=0;i<9;i++){f.beginPath();f.moveTo((.4+i*.55)*B,15.1*B);f.lineTo((.4+i*.55)*B+(R()-.5)*B*.5,15.9*B+R()*B*.5);f.stroke()}
  // dangling slab, hanging crooked from the south stub
  f.save();f.translate(.2*B,22.8*B);f.rotate(-.18);f.fillStyle='rgba(58,70,78,.88)';f.fillRect(0,-B*2.2,4.6*B,B*2.2);f.fillStyle='rgba(235,200,60,.7)';for(let i=0;i<9;i++)f.fillRect(i*B*.55,-B*2.2,B*.28,B*.22);f.strokeStyle='rgba(150,80,50,.8)';f.lineWidth=3;for(let i=0;i<7;i++){f.beginPath();f.moveTo(i*B*.7+B*.3,-B*2.2);f.lineTo(i*B*.7+B*.3+(R()-.5)*B*.4,-B*2.8);f.stroke()}f.restore();
  {const sg=f.createLinearGradient(0,0,B*.9,0);sg.addColorStop(0,'rgba(0,0,0,.35)');sg.addColorStop(1,'rgba(0,0,0,0)');f.fillStyle=sg;f.fillRect(0,0,B*.9,15*B);const sg2=f.createLinearGradient(5*B,0,5*B-B*.9,0);sg2.addColorStop(0,'rgba(0,0,0,.35)');sg2.addColorStop(1,'rgba(0,0,0,0)');f.fillStyle=sg2;f.fillRect(5*B-B*.9,0,B*.9,15*B)}
  m.fg={c:fc,x:54,y:0,w:5};
  // deck shadow cast onto the plateau and channel floor
  // pillars (solid tiles) in the baked layer
  for(const [x,y] of [[54,5],[58,5],[54,10],[58,10]]){g.fillStyle='rgba(0,0,0,.4)';g.fillRect(x*B+B*.15,y*B+B*.2,B,B);g.fillStyle='#56626c';g.fillRect(x*B,y*B,B,B);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=3;g.strokeRect(x*B+2,y*B+2,B-4,B-4)}
  // rubble under the broken section
  for(let i=0;i<30;i++){const x=(54+R()*3)*B,y=(15+R()*7)*B;g.fillStyle='rgba('+(70+R()*40|0)+','+(80+R()*40|0)+','+(86+R()*40|0)+',.9)';g.beginPath();g.moveTo(x,y);g.lineTo(x+B*(.15+R()*.3),y+B*.1);g.lineTo(x+B*.1,y+B*(.15+R()*.3));g.fill()}
  m.lights=LG;
}
/* ---- THE SPILLWAY: NPCs, props and art (phase 2) ---- */
const SPPROPS=[
 {x:2,y:3,t:'sp_crate',s:1,m:['Gatehouse logbooks and rain tarps stacked under a tin lid.']},
 {x:9,y:10,t:'sp_bench',s:1},
 {x:20,y:14,t:'sp_tire',s:1,act:'tire'},
 {x:34,y:11,t:'sp_vend',s:1,m:['A vending machine hums. SOLD OUT in three languages.']},
 {x:32,y:12,t:'sp_bench',s:1},
 {x:40,y:12,t:'sp_door',s:1,m:['A steel maintenance door. No handle.','A sticker: MUNICIPAL — NO ENTRY.','The paint has been scraped off one corner. Somebody tried.']},
 {x:48,y:14,t:'sp_crate',s:1,m:['Weathered freight crates staged near the floodway ramp.']},
 {x:53,y:17,t:'sp_crate',s:1,m:['A wooden crate. Stenciled Q-7, then QM over the top.','No other marking. No manifest.','Nothing about it says who sent it.']},
 {x:45,y:6,t:'sp_bench',s:1},
 {x:48,y:5,t:'sp_jersey',s:1,m:['A jersey hung on a nail. HALE 14.','Salt-stiff. Left out for the rain.',"A note, sun-faded: 'Bring it home, Tug.'"]},
 {x:47,y:5,t:'sp_case',s:1,m:['A glass case, bolted to the wall.','Inside: a game ball, a muddy cleat, and a photo of a kid in a #14 jersey.',"'MARLOW HALE - HALE HARBOR'S FINEST'"]},
 {x:54,y:16,t:'sp_truck',s:1,w:3,h:2}
];
const SPNPCS=[
 {id:'gatekeeper',civ:'guard',x:4,y:3,d:'d',name:'GATE BOOK',tf:()=>{const R=(SAVE.route||{});
   if(R.rats2)return["Both tests. Don't stand here all night."];
   if(R.rats1)return["The Rats let you through. Took them long enough."];
   if((SAVE.met||[]).includes('gatekeeper'))return["You signed. Go on."];
   return["You're the first name in this book since the Freight Line shut.","Sign it. Then the Floodway's yours.","That's not me being friendly. That's the rule."]}},
 {id:'retiredLocal',civ:'fisher',x:7,y:10,d:'l',name:'RETIRED LOCAL',tf:()=>{
   if((SAVE.route||{}).rats1)return["'Throw it into the dark.'","Your brother's line, not mine.","Go on, then."];
   return["Only one Deuce I ever saw throw like that.","Not you. Your brother.","Go on, then."]}},
 {id:'mack',x:18,y:16,d:'l',name:'MACK "HARDHAT" DWYER',crew:'rats1',tf:()=>{
   if((SAVE.route||{}).rats1)return["Enough. Pressure held.","Second test is downfield. Don't smile yet."];
   return["We keep this channel playable.","You want through? Show us you can handle pressure.","First to 7. That's the test."]}},
 {id:'rat2',x:36,y:16,d:'l',name:'CHANNEL RAT',crew:'rats2',tf:()=>{const R=(SAVE.route||{});
   if(R.rats2)return["Huh. Go on."];
   if(!R.rats1)return["Mack first."];
   return["Mack said you passed his.","This one is mine.","First to 7."]}},
 {id:'driverA',civ:'fan',x:53,y:16,d:'r',name:'DRIVER',tf:()=>["You signed it. You signed it, so it's on you.","It says Q-7, with QM over it. What does that even mean?"]},
 {id:'kid1',civ:'kid',x:50,y:9,d:'r',name:'KID',tf:()=>['Tug Hale used to play right here.','My dad says he threw a ball so hard it broke a window in the old bait shack.',"He's gonna come back. He promised."]},
 {id:'kid2',civ:'kid',x:52,y:9,d:'l',name:'KID',t:['Catch!','...Aw, I dropped it.']},
 {id:'driverB',civ:'busker',x:53,y:18,d:'l',name:'DRIVER',tf:()=>["I signed what they handed me. I don't count crates.","Doesn't mean anything to me. Not my crate."]}
];
function spBakeP(g,p,B){
  const X=p.x*B,Y=p.y*B,t=p.t,cx=X+B/2;
  const sh=(w,h,y)=>{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(cx,y,w,h,0,0,7);g.fill()};
  if(t==='sp_tire'){
    // static parts: wall bracket + beam, chain anchor, hand-painted sign on the wall, spray-painted target on the floor (the tire itself swings: see spAnim)
    g.fillStyle='#14181c';g.fillRect(X-B*.55,Y-B*.02,B*2.1,B*.14);g.fillStyle='#4b565e';g.fillRect(X-B*.55,Y-B*.02,B*2.1,B*.05);
    g.fillStyle='#14181c';for(const bx of [X-B*.4,X+B*1.3])g.fillRect(bx,Y-B*.4,B*.12,B*.42);
    g.fillStyle='#d8d2b8';g.fillRect(X-B*.35,Y-B*.82,B*1.85,B*.46);g.strokeStyle='#14110f';g.lineWidth=3;g.strokeRect(X-B*.35,Y-B*.82,B*1.85,B*.46);
    g.fillStyle='#8a2a1c';g.font='700 '+Math.round(B*.26)+'px "Barlow Condensed",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('HALE MARY',X+B*.575,Y-B*.58);
    const mx=cx,my=Y+B*1.45;g.save();g.globalAlpha=.7;g.strokeStyle='#e8642a';g.lineWidth=6;g.setLineDash([B*.22,B*.07]);g.beginPath();g.ellipse(mx,my,B*.62,B*.46,0,0,7);g.stroke();g.setLineDash([]);g.lineWidth=4;g.beginPath();g.moveTo(mx-B*.42,my);g.lineTo(mx+B*.42,my);g.moveTo(mx,my-B*.34);g.lineTo(mx,my+B*.34);g.stroke();g.restore();
    g.fillStyle='rgba(232,100,42,.5)';for(let i=0;i<24;i++){const a2=i*2.1,r2=B*(.6+(i%5)*.07);g.fillRect(mx+Math.cos(a2)*r2,my+Math.sin(a2)*r2*.65,3,3)}
  }else if(t==='sp_vend'){
    sh(B*.36,B*.1,Y+B*.92);
    g.fillStyle='#233b44';g.fillRect(X+B*.14,Y+B*.04,B*.72,B*.88);g.strokeStyle='#05080a';g.lineWidth=3;g.strokeRect(X+B*.14,Y+B*.04,B*.72,B*.88);
    g.fillStyle='#8ff0ff';g.globalAlpha=.55;g.fillRect(X+B*.2,Y+B*.1,B*.4,B*.62);g.globalAlpha=1;
    g.fillStyle='#ff5a4a';for(let i=0;i<3;i++)g.fillRect(X+B*.66,Y+B*(.14+i*.14),B*.14,B*.08);
    g.fillStyle='#05080a';g.fillRect(X+B*.22,Y+B*.78,B*.56,B*.1);
  }else if(t==='sp_bench'){
    sh(B*.4,B*.1,Y+B*.8);
    g.fillStyle='#3b4249';g.fillRect(X+B*.06,Y+B*.4,B*.88,B*.16);g.fillStyle='#14181b';g.fillRect(X+B*.12,Y+B*.56,6,B*.2);g.fillRect(X+B*.86-6,Y+B*.56,6,B*.2);
    g.fillStyle='#4f585f';g.fillRect(X+B*.06,Y+B*.24,B*.88,B*.1);
  }else if(t==='sp_door'){
    g.fillStyle='#3d464c';g.fillRect(X+B*.08,Y+B*.04,B*.84,B*.92);g.strokeStyle='#0c1013';g.lineWidth=4;g.strokeRect(X+B*.08,Y+B*.04,B*.84,B*.92);
    g.strokeStyle='#59636a';g.lineWidth=2;g.strokeRect(X+B*.2,Y+B*.14,B*.6,B*.72);
    g.fillStyle='#e9d36a';g.fillRect(X+B*.3,Y+B*.3,B*.4,B*.16);g.fillStyle='#14110f';g.fillRect(X+B*.34,Y+B*.35,B*.32,3);g.fillRect(X+B*.34,Y+B*.41,B*.2,3);
    g.fillStyle='#8a5a3a';g.fillRect(X+B*.14,Y+B*.78,B*.16,B*.12);
  }else if(t==='sp_crate'){
    sh(B*.36,B*.1,Y+B*.9);
    g.fillStyle='#6b4f34';g.fillRect(X+B*.1,Y+B*.2,B*.8,B*.66);g.strokeStyle='#2a1c10';g.lineWidth=3;g.strokeRect(X+B*.1,Y+B*.2,B*.8,B*.66);
    g.beginPath();g.moveTo(X+B*.1,Y+B*.2);g.lineTo(X+B*.9,Y+B*.86);g.moveTo(X+B*.9,Y+B*.2);g.lineTo(X+B*.1,Y+B*.86);g.stroke();
    g.fillStyle='#f0ead8';g.font='700 '+Math.round(B*.24)+'px "Barlow Condensed",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Q-7',cx,Y+B*.46);
    g.fillStyle='#d6362f';g.font='700 '+Math.round(B*.28)+'px "Barlow Condensed",sans-serif';g.fillText('QM',cx+3,Y+B*.5);
  }else if(t==='sp_jersey'){
    // memorial: rail with a nail, flowers at the foot, a note card, a pool of pale light (the jersey itself sways: see spAnim)
    const q=g.createRadialGradient(cx,Y+B*.85,0,cx,Y+B*.85,B*1.7);q.addColorStop(0,'rgba(255,224,160,.3)');q.addColorStop(1,'rgba(255,224,160,0)');g.fillStyle=q;g.fillRect(cx-B*1.8,Y-B*.9,B*3.6,B*3.6);
    g.fillStyle='#2a2320';g.fillRect(cx-B*.62,Y+B*.1,B*1.24,B*.1);g.fillStyle='#4a403a';g.fillRect(cx-B*.62,Y+B*.1,B*1.24,B*.035);g.fillStyle='#2a2320';g.fillRect(cx-B*.6,Y+B*.1,B*.1,B*.78);g.fillRect(cx+B*.5,Y+B*.1,B*.1,B*.78);
    g.fillStyle='#9aa4aa';g.fillRect(cx-2,Y+B*.12,4,B*.1);
    g.fillStyle='#f2efe4';g.fillRect(cx+B*.3,Y+B*.3,B*.26,B*.34);g.strokeStyle='rgba(20,17,15,.55)';g.lineWidth=2;g.strokeRect(cx+B*.3,Y+B*.3,B*.26,B*.34);g.strokeStyle='rgba(60,50,45,.5)';g.lineWidth=1.5;for(let i=0;i<4;i++){g.beginPath();g.moveTo(cx+B*.34,Y+B*(.38+i*.07));g.lineTo(cx+B*(.52-(i%2)*.06),Y+B*(.38+i*.07));g.stroke()}
    const fc=['#ff7aa8','#ffd23a','#f4f4f0','#c6f23a','#ff7aa8'];for(let i=0;i<5;i++){const fx=cx-B*.5+i*B*.25,fy=Y+B*(.92+(i%2)*.03);g.strokeStyle='#2f7a3a';g.lineWidth=2;g.beginPath();g.moveTo(fx,fy+B*.14);g.lineTo(fx,fy);g.stroke();g.fillStyle=fc[i];for(let k=0;k<5;k++){g.beginPath();g.arc(fx+Math.cos(k*1.256)*4,fy+Math.sin(k*1.256)*4,3,0,7);g.fill()}g.fillStyle='#ffe9a0';g.beginPath();g.arc(fx,fy,2.4,0,7);g.fill()}
  }else if(t==='sp_case'){
    // glass trophy case bolted to the back wall: game ball, muddy cleat, a photo
    g.fillStyle='rgba(0,0,0,.4)';g.fillRect(X+B*.08,Y+B*.86,B*.86,B*.12);
    g.fillStyle='#2b2a2e';g.fillRect(X+B*.06,Y+B*.04,B*.88,B*.86);g.strokeStyle='#0c1013';g.lineWidth=3;g.strokeRect(X+B*.06,Y+B*.04,B*.88,B*.86);
    g.fillStyle='rgba(150,205,215,.3)';g.fillRect(X+B*.14,Y+B*.12,B*.72,B*.66);g.fillStyle='rgba(255,255,255,.14)';g.beginPath();g.moveTo(X+B*.14,Y+B*.12);g.lineTo(X+B*.4,Y+B*.12);g.lineTo(X+B*.14,Y+B*.46);g.fill();
    g.fillStyle='#8b4a1f';g.beginPath();g.ellipse(X+B*.34,Y+B*.62,B*.15,B*.09,-.4,0,7);g.fill();g.strokeStyle='#f4f4f0';g.lineWidth=1.5;g.beginPath();g.moveTo(X+B*.3,Y+B*.64);g.lineTo(X+B*.38,Y+B*.6);g.stroke();
    g.fillStyle='#4a3a2a';g.fillRect(X+B*.55,Y+B*.58,B*.22,B*.1);g.fillStyle='#14110f';g.fillRect(X+B*.55,Y+B*.66,B*.22,B*.04);
    g.fillStyle='#e8e2cf';g.fillRect(X+B*.5,Y+B*.2,B*.28,B*.26);g.fillStyle='#2f7f86';g.fillRect(X+B*.55,Y+B*.3,B*.18,B*.14);g.fillStyle='#d8b890';g.beginPath();g.arc(X+B*.64,Y+B*.27,B*.04,0,7);g.fill();
    g.fillStyle='#c9a24a';g.fillRect(X+B*.2,Y+B*.8,B*.6,B*.06);
  }else if(t==='sp_truck'){
    const w=(p.w||3)*B,h=(p.h||2)*B;
    g.fillStyle='rgba(0,0,0,.4)';g.fillRect(X+6,Y+h-8,w-4,14);
    g.fillStyle='#53606a';g.fillRect(X+4,Y+8,w*.68,h-18);g.strokeStyle='#0c1013';g.lineWidth=4;g.strokeRect(X+4,Y+8,w*.68,h-18);
    g.strokeStyle='#7b8993';g.lineWidth=2;for(let i=1;i<5;i++){g.beginPath();g.moveTo(X+4+i*w*.136,Y+10);g.lineTo(X+4+i*w*.136,Y+h-12);g.stroke()}
    g.fillStyle='#3a4650';g.fillRect(X+w*.7,Y+14,w*.28,h-30);g.strokeStyle='#0c1013';g.strokeRect(X+w*.7,Y+14,w*.28,h-30);
    g.fillStyle='rgba(143,240,255,.5)';g.fillRect(X+w*.86,Y+20,w*.1,h-42);
    g.fillStyle='#ffd23a';g.fillRect(X+w*.97,Y+22,5,10);g.fillRect(X+w*.97,Y+h-40,5,10);
    g.fillStyle='#0c1013';g.fillRect(X+8,Y+h-14,10,8);g.fillRect(X+w*.4,Y+h-14,10,8);
  }
}

/* ---- v2.63 polish: floor texture, light pools, AO + rim ---- */
function spTexture(g,B,R){
  // poured in sections: faded painted blocks every 5 yd, big mottling, hazard stripes at the end lines, stencils
  for(let yd=0;yd<100;yd+=5){const x0=spYd(yd)*B,w=2*B;g.fillStyle=(yd/5)%2?'rgba(255,238,215,.035)':'rgba(10,14,20,.05)';g.fillRect(x0,14*B,w,9*B)}
  for(let i=0;i<70;i++){const x=(12+R()*45)*B,y=(14+R()*9)*B,r=B*(.8+R()*2);const q=g.createRadialGradient(x,y,0,x,y,r);const lite=R()<.5;q.addColorStop(0,lite?'rgba(255,240,220,.05)':'rgba(0,0,0,.07)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(x-r,y-r,2*r,2*r)}
  for(const x0 of [14,53.6]){g.save();g.beginPath();g.rect(x0*B,14*B,B*.4,9*B);g.clip();g.fillStyle='rgba(240,200,40,.5)';for(let i=-2;i<12;i++){g.beginPath();g.moveTo(x0*B-B*.4,(14+i*.9)*B+B*.9);g.lineTo(x0*B-B*.4+B*.45,(14+i*.9)*B+B*.9);g.lineTo(x0*B+B*.8,(14+i*.9)*B-B*.2);g.lineTo(x0*B+B*.35,(14+i*.9)*B-B*.2);g.fill()}g.restore()}
  g.save();g.fillStyle='rgba(230,225,210,.22)';g.font='700 '+Math.round(B*.3)+'px "Barlow Condensed",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';
  g.fillText('PROPERTY OF CITY WATER DEPT',25*B,22.45*B);g.fillText('KEEP CLEAR',41.5*B,22.45*B);g.fillText('SECTION 7 · NO PARKING',36*B,14.5*B);g.restore();
}
const SPPOOLS=(()=>{const a=[],C={amb:'255,144,64',cy:'144,216,232',mg:'255,79,216',lm:'198,242,58',ice:'159,232,240',bea:'255,224,160'};
  const NX=[14.5,19,23.5,28,32.5,37,41.5,46,50.5,55],SX=[16.5,21,25.5,30,34.5,39,43.5,48,52.5];
  const pick=(x,i)=>{if(x<28)return i%4===3?'mg':'amb';if(x<44)return['amb','cy','lm','cy','mg','amb'][i%6];return i%3===2?'bea':(i%2?'cy':'ice')};
  NX.forEach((x,i)=>a.push([x,15.6,3.3,pick(x,i),.34,'n']));SX.forEach((x,i)=>a.push([x,21.4,3.3,pick(x+1.3,i+2),.3,'s']));
  for(const [x,y,c] of [[46.5,7.8,'ice'],[50.5,6.4,'bea'],[49.5,9.4,'cy'],[55.5,8.6,'ice'],[52,8,'bea']])a.push([x,y,2.6,c,.32,'p']);
  for(const y of [3,6.5,10,13.5,17.5,20]){a.push([5.8,y,3.9,'amb',.34,'c']);}
  for(const [x,y,c] of [[55.5,5.8,'ice'],[44.6,9.6,'ice'],[36.2,12,'cy'],[12.8,19.6,'amb'],[55.8,19.6,'ice']])a.push([x,y,2.5,c,.3,'e']);
  a.push([40.5,13.4,1.6,'amb',.4,'d']);a.push([34,13.2,2,'amb',.34,'d']);a.push([51.5,13,2,'bea',.34,'d']);
  return{list:a,C}})();
function spPolish(g,m,B,R){
  const wk=(x,y)=>!(x<0||y<0||x>=SPW||y>=SPH)&&!m.solid[y*SPW+x]&&spT(x,y)!==4;
  const sol=(x,y)=>x>=0&&y>=0&&x<SPW&&y<SPH&&m.solid[y*SPW+x]&&spT(x,y)!==4;
  // ambient occlusion at the base of every solid thing + a light rim on the walkable edge
  const D=[[0,-1],[0,1],[-1,0],[1,0]];
  for(let y=0;y<SPH;y++)for(let x=0;x<SPW;x++){if(!wk(x,y))continue;const X=x*B,Y=y*B;
    for(const [dx,dy] of D){if(!sol(x+dx,y+dy))continue;const ao=B*.3;let q,rx,ry,rw,rh,qx0,qy0,qx1,qy1;
      if(dy===-1){qx0=0;qy0=Y;qx1=0;qy1=Y+ao;rx=X;ry=Y;rw=B;rh=ao}else if(dy===1){qx0=0;qy0=Y+B;qx1=0;qy1=Y+B-ao;rx=X;ry=Y+B-ao;rw=B;rh=ao}else if(dx===-1){qx0=X;qy0=0;qx1=X+ao;qy1=0;rx=X;ry=Y;rw=ao;rh=B}else{qx0=X+B;qy0=0;qx1=X+B-ao;qy1=0;rx=X+B-ao;ry=Y;rw=ao;rh=B}
      q=g.createLinearGradient(qx0,qy0,qx1,qy1);q.addColorStop(0,'rgba(0,0,0,.42)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(rx,ry,rw,rh);
      g.fillStyle='rgba(225,238,242,.2)';if(dy===-1)g.fillRect(X,Y+ao*.55,B,3);else if(dy===1)g.fillRect(X,Y+B-ao*.55-3,B,3);else if(dx===-1)g.fillRect(X+ao*.55,Y,3,B);else g.fillRect(X+B-ao*.55-3,Y,3,B)}}
  // overhead fixtures on the channel walls and their cones
  const C=SPPOOLS.C;
  for(const [x,y,r,c,a,k] of SPPOOLS.list){if(k!=='n'&&k!=='s')continue;const X=x*B,fy=k==='n'?13.5*B:22.95*B,col=C[c];
    const cg=g.createLinearGradient(0,fy,0,y*B);cg.addColorStop(0,'rgba('+col+',.2)');cg.addColorStop(1,'rgba('+col+',0)');g.fillStyle=cg;g.beginPath();g.moveTo(X-B*.1,fy);g.lineTo(X+B*.1,fy);g.lineTo(X+B*.9,y*B);g.lineTo(X-B*.9,y*B);g.closePath();g.fill();
    g.fillStyle='#0a0e13';g.fillRect(X-B*.2,fy-B*.1,B*.4,B*.18);g.fillStyle='rgba('+col+',1)';g.fillRect(X-B*.13,fy+(k==='n'?B*.06:-B*.1),B*.26,B*.06);g.fillStyle='rgba(60,70,78,.9)';g.fillRect(X-1,fy-B*.4,2,B*.3)}
  // coloured pools on the floor (distinct circles, additive)
  g.save();g.globalCompositeOperation='lighter';
  for(const [x,y,r,c,a] of SPPOOLS.list){const col=C[c],X=x*B,Y=y*B,R2=r*B;const q=g.createRadialGradient(X,Y,0,X,Y,R2);q.addColorStop(0,'rgba('+col+','+a+')');q.addColorStop(.55,'rgba('+col+','+(a*.62)+')');q.addColorStop(.88,'rgba('+col+','+(a*.16)+')');q.addColorStop(1,'rgba('+col+',0)');g.fillStyle=q;g.beginPath();g.arc(X,Y,R2,0,7);g.fill()}
  // wet asphalt reflections in the South Cut: long orange smears under each sodium lamp
  for(const y of [3,9,15]){const q=g.createLinearGradient(0,y*B,0,(y+3.4)*B);q.addColorStop(0,'rgba(255,140,60,.2)');q.addColorStop(1,'rgba(255,140,60,0)');g.fillStyle=q;g.fillRect(5.2*B,y*B,1.2*B,3.4*B)}
  g.restore();
}

/* ---- v2.63 polish: the route's two animated props (drawn every frame, under the figures) ---- */
function spJerseyArt(g,U){g.fillStyle='#2f7f86';g.beginPath();g.moveTo(-.3*U,.06*U);g.lineTo(-.14*U,0);g.lineTo(.14*U,0);g.lineTo(.3*U,.06*U);g.lineTo(.24*U,.22*U);g.lineTo(.2*U,.16*U);g.lineTo(.2*U,.66*U);g.lineTo(-.2*U,.66*U);g.lineTo(-.2*U,.16*U);g.lineTo(-.24*U,.22*U);g.closePath();g.fill();g.strokeStyle='#0c1013';g.lineWidth=Math.max(1,U*.03);g.stroke();
  g.fillStyle='#e8f2f0';g.font='700 '+Math.round(U*.3)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('14',0,.36*U)}
function OWNPC_KID(id){const n=((typeof M!=="undefined"&&M.npcs)||[]).find(q=>q.id===id);return n?{x:n.x,y:n.y}:null}
function spAnim(og,OT,tm){
  const T=SPPROPS.find(p=>p.t==='sp_tire'),J=SPPROPS.find(p=>p.t==='sp_jersey');
  if(T){const px=(T.x+.5)*OT,py=(T.y+.08)*OT,ang=Math.sin(tm*Math.PI*2*.4)*5*Math.PI/180;
    og.save();og.translate(px,py);og.rotate(ang);
    og.strokeStyle='#8a9399';og.lineWidth=Math.max(1.5,OT*.05);og.setLineDash([OT*.08,OT*.05]);og.beginPath();og.moveTo(0,0);og.lineTo(0,.3*OT);og.stroke();og.setLineDash([]);
    og.fillStyle='#14110f';og.beginPath();og.ellipse(0,.62*OT,.36*OT,.3*OT,0,0,7);og.fill();og.strokeStyle='#4a5258';og.lineWidth=Math.max(1.5,OT*.05);og.stroke();
    og.fillStyle='#3a1f1a';og.beginPath();og.ellipse(0,.62*OT,.16*OT,.13*OT,0,0,7);og.fill();og.strokeStyle='#f4f4f0';og.lineWidth=Math.max(1.5,OT*.05);og.beginPath();og.ellipse(0,.62*OT,.28*OT,.23*OT,0,0,7);og.stroke();
    og.restore();
    const d=Math.hypot(OW.px-T.x,OW.py-T.y);if(d<=2.4&&!OW.sleep){const a=(.28+.22*Math.sin(tm*4))*(d<1.6?1:(2.4-d)/.8);og.save();og.globalCompositeOperation='lighter';og.globalAlpha=Math.max(0,a);const q=og.createRadialGradient(px,py+.62*OT,0,px,py+.62*OT,OT*1.3);q.addColorStop(0,'rgba(255,150,70,1)');q.addColorStop(1,'rgba(255,150,70,0)');og.fillStyle=q;og.fillRect(px-OT*1.3,py-OT*.7,OT*2.6,OT*2.6);og.restore()}}
  {const K1=OWNPC_KID('kid1'),K2=OWNPC_KID('kid2');if(K1&&K2){   // the two kids play catch: ball arcs between them, throwing arm lifts
    const per=2.4,ph=(tm%per)/per,dir=ph<.5?1:-1,u=ph<.5?ph*2:(ph-.5)*2,sx=dir>0?K1.x:K2.x,ex=dir>0?K2.x:K1.x;
    const bx=(sx+.5+(ex-sx)*u)*OT,by=(K1.y+.4-Math.sin(u*Math.PI)*.75)*OT;
    og.fillStyle='rgba(0,0,0,.25)';og.beginPath();og.ellipse(bx,(K1.y+.95)*OT,OT*.1,OT*.04,0,0,7);og.fill();
    og.save();og.translate(bx,by);og.rotate(u*6*dir);og.fillStyle='#8a5530';og.beginPath();og.ellipse(0,0,OT*.11,OT*.07,0,0,7);og.fill();og.strokeStyle='#efe9da';og.lineWidth=Math.max(1,OT*.02);og.beginPath();og.moveTo(-OT*.04,0);og.lineTo(OT*.04,0);og.stroke();og.restore();
    const th=u<.25?1-u*4:0,tk=dir>0?K1:K2,rk=dir>0?K2:K1;   // thrower arm lifts just before release; catcher hands up on arrival
    const arm=(k,lift)=>{if(lift<=0)return;const hx=(k.x+.5+(k.x<(dir>0?K2.x:K1.x)?.28:-.28))*OT,hy=(k.y+.42-lift*.3)*OT;og.fillStyle='#d9a37c';og.beginPath();og.arc(hx,hy,OT*.07,0,7);og.fill()};
    arm(tk,th);arm(rk,u>.75?(u-.75)*4:0)}}
  if(J){const px=(J.x+.5)*OT,py=(J.y+.14)*OT,ang=Math.sin(tm*Math.PI*2*.2)*3*Math.PI/180;og.save();og.translate(px,py);og.rotate(ang);spJerseyArt(og,OT);og.restore()}
}
function owBake(m){
  if(m.baked)return;
  if(m.harbor){owBakeChunked(m,owBakeHarbor);return}   // v3.20T: the big harbor is drawn in chunks
  LG=[];VT=[];
  const c=document.createElement('canvas');c.width=m.w*BP;c.height=m.h*BP;
  if(m.room)(m.def&&m.def.deck?r2BakeDeck:m.hb?owBakeHarborRoom:owBakeRoom)(c,m);else if(m.island)owBakeIsland(c,m);else if(m.harbor)owBakeHarbor(c,m);else if(m.route)owBakeRoute(c,m);else{owBakeStreet(c,m);
    // town lighting zones are painted into the baked picture once, so they cost nothing while you walk
    const g=c.getContext('2d'),Z=owZoneMaps();g.imageSmoothingEnabled=true;
    g.globalCompositeOperation='multiply';g.drawImage(Z.M,0,0,c.width,c.height);
    g.globalCompositeOperation='lighter';g.drawImage(Z.A,0,0,c.width,c.height);g.globalCompositeOperation='source-over'}
  m.baked=c;m.lights=LG;m.vents=VT;
}
function owBakeStreet(c,m){
  const g=c.getContext('2d'),R=owRnd(77),OWW=m.w,OWH=m.h;
  const bAt=(x,y)=>OWB.some(b=>x>=b.x&&x<b.x+b.w&&y>=b.y&&y<b.y+b.h);
  g.fillStyle='#0a121a';g.fillRect(0,0,c.width,c.height);
  for(let y=0;y<OWH;y++)for(let x=0;x<OWW;x++){
    const px=x*BP,py=y*BP;
    let nearB=false;for(let dy=-1;dy<=1&&!nearB;dy++)for(let dx=-1;dx<=1;dx++)if(bAt(x+dx,y+dy)){nearB=true;break}
    const side=nearB&&!bAt(x,y);
    if(side){   // sidewalk: lighter paving slabs with grout lines, chips and a curb where it meets the road
      g.fillStyle='#16212d';g.fillRect(px,py,BP,BP);
      for(let sy=0;sy<2;sy++)for(let sx=0;sx<2;sx++){const v=R();g.fillStyle=v<.3?'rgba(160,200,230,.05)':v<.55?'rgba(0,0,0,.10)':'rgba(255,255,255,0)';g.fillRect(px+sx*BP/2,py+sy*BP/2,BP/2,BP/2)}
      g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=2;g.beginPath();g.moveTo(px,py+BP/2);g.lineTo(px+BP,py+BP/2);g.moveTo(px+BP/2,py);g.lineTo(px+BP/2,py+BP);g.stroke();
      g.strokeStyle='rgba(120,170,210,.10)';g.lineWidth=1;g.strokeRect(px+.5,py+.5,BP-1,BP-1);
      for(let i=0;i<3;i++){g.fillStyle='rgba(255,255,255,.05)';g.fillRect(px+R()*BP,py+R()*BP,2+R()*3,1+R()*2)}
      const road=(dx,dy)=>{const X=x+dx,Y=y+dy;return X>=0&&Y>=0&&X<OWW&&Y<OWH&&!bAt(X,Y)&&!(()=>{let nb=false;for(let ay=-1;ay<=1&&!nb;ay++)for(let ax=-1;ax<=1;ax++)if(bAt(X+ax,Y+ay)){nb=true;break}return nb})()};
      g.shadowBlur=0;
      const edge=(x0,y0,w0,h0,dx,dy)=>{g.fillStyle='rgba(150,195,225,.26)';g.fillRect(x0,y0,w0,h0);g.fillStyle='rgba(0,0,0,.5)';g.fillRect(x0+dx*3,y0+dy*3,w0,h0)};   // lit lip + dark drop to the road
      if(road(0,1))edge(px,py+BP-4,BP,3,0,1);if(road(0,-1))edge(px,py+1,BP,3,0,-1);if(road(1,0))edge(px+BP-4,py,3,BP,1,0);if(road(-1,0))edge(px+1,py,3,BP,-1,0);
    }else{   // asphalt: smooth, darker, no grid; worn lanes and patched cracks
      g.fillStyle='#0a131c';g.fillRect(px,py,BP,BP);
      for(let i=0;i<7;i++){g.fillStyle=R()<.5?'rgba(255,255,255,.022)':'rgba(0,0,0,.22)';g.fillRect(px+R()*BP,py+R()*BP,1+R()*3,1+R()*2)}
      let nearSide=false;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<OWW&&Y<OWH&&!bAt(X,Y)){let nb=false;for(let ay=-1;ay<=1&&!nb;ay++)for(let ax=-1;ax<=1;ax++)if(bAt(X+ax,Y+ay)){nb=true;break}if(nb)nearSide=true}}
      if(nearSide){g.fillStyle='rgba(0,0,0,.28)';g.fillRect(px,py,BP,BP);if(R()<.12){g.fillStyle='rgba(0,0,0,.45)';g.fillRect(px+BP*.2,py+BP*.45,BP*.6,3);g.fillStyle='rgba(120,160,190,.18)';for(let q=0;q<4;q++)g.fillRect(px+BP*.22+q*BP*.15,py+BP*.5,2,BP*.16)}}   // gutter drain slots
      if(R()<.07){const pw2=BP*(.3+R()*.5),ph2=BP*(.25+R()*.4),qx=px+R()*(BP-pw2),qy=py+R()*(BP-ph2);g.fillStyle='rgba(2,6,10,.5)';g.fillRect(qx,qy,pw2,ph2);g.strokeStyle='rgba(120,160,190,.10)';g.lineWidth=1;g.strokeRect(qx,qy,pw2,ph2)}   // road patch
      if(R()<.05){g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=1.5;g.beginPath();let cx2=px+R()*BP,cy2=py;g.moveTo(cx2,cy2);for(let q=0;q<4;q++){cx2+=(R()-.5)*14;cy2+=BP/4;g.lineTo(cx2,cy2)}g.stroke()}   // crack   // gutter shadow along the curb
    }
  }
  const hx=h=>{const n=parseInt(h.slice(1),16);return (n>>16&255)+','+(n>>8&255)+','+(n&255)};
  const nearB=(x,y)=>{let best=OWB[0],bd=1e9;for(const b of OWB){const cx=b.x+b.w/2,cy=b.y+b.h,d=Math.hypot(x-cx,(y-cy)*1.3);if(d<bd){bd=d;best=b}}return [best,bd]};
  for(let i=0;i<190;i++){const x=R()*OWW,y=R()*OWH;if(bAt(x|0,y|0))continue;const [nb,nd]=nearB(x,y);
    const col='rgba('+hx(nd<7?(i%2?nb.col:nb.col2):(['#27e0ff','#ff2fa8','#27e0ff'][i%3]))+',';
    const rx=BP*(.3+R()*.8),ry=BP*(.12+R()*.2);
    g.fillStyle='rgba(2,6,10,.55)';g.beginPath();g.ellipse(x*BP,y*BP,rx,ry,0,0,7);g.fill();   // dark wet patch
    g.fillStyle=col+'.16)';g.beginPath();g.ellipse(x*BP,y*BP,rx*.92,ry*.85,0,0,7);g.fill();
    g.strokeStyle=col+'.38)';g.lineWidth=1.5;g.beginPath();g.ellipse(x*BP,y*BP,rx*.55,ry*.5,0,0,5);g.stroke();
    g.fillStyle=col+'.28)';g.fillRect(x*BP-rx*.5,y*BP-1,rx*.7,2)}   // broken glint
  {g.globalCompositeOperation='lighter';for(const [x0,y0,x1,y1,cc] of [[13,10,18,38,'255,120,60'],[0,19,32,22,'39,224,255']]){const gr=g.createLinearGradient(x0*BP,0,x1*BP,0);gr.addColorStop(0,'rgba('+cc+',0)');gr.addColorStop(.5,'rgba('+cc+',.16)');gr.addColorStop(1,'rgba('+cc+',0)');g.fillStyle=gr;g.fillRect(x0*BP,y0*BP,(x1-x0)*BP,(y1-y0)*BP)}g.globalCompositeOperation='source-over'}
  g.fillStyle='rgba(255,210,60,.55)';for(let y=10*BP;y<OWH*BP;y+=BP*.9)g.fillRect(16*BP-3,y,6,BP*.5);
  g.fillStyle='rgba(159,246,255,.45)';for(let x=BP;x<OWW*BP;x+=BP*.9)if(!(x>13*BP&&x<18*BP))g.fillRect(x,20.5*BP-3,BP*.5,6);
  for(let i=0;i<8;i++){g.fillStyle='rgba(220,230,255,.35)';g.fillRect(14*BP+i*BP*.5,18.2*BP,BP*.3,BP*.55);g.fillRect(14*BP+i*BP*.5,21.4*BP,BP*.3,BP*.55)}
  for(let y=10;y<=12;y++)for(let x=9;x<=22;x++){g.fillStyle=(x+y)%2?'#152230':'#122030';g.fillRect(x*BP,y*BP,BP,BP);g.strokeStyle='rgba(39,224,255,.22)';g.strokeRect(x*BP+.5,y*BP+.5,BP-1,BP-1)}
  owBakeCanal(g,R);
  for(const b of OWB)owBakeB(g,b,R);
  // light spill + wet reflection streaks in front of every door and under every sign
  g.save();g.globalCompositeOperation='lighter';
  for(const b of OWB){const dx=(b.doors.reduce((q,d)=>q+d[0],0)/b.doors.length+.5)*BP,dy=(b.y+b.h)*BP,c1=hx(b.col),c2=hx(b.col2);
    const ell=(cx,cy,rx,ry,cc,al)=>{g.save();g.translate(cx,cy);g.scale(1,ry/rx);const gr=g.createRadialGradient(0,0,0,0,0,rx);gr.addColorStop(0,'rgba('+cc+','+al+')');gr.addColorStop(.55,'rgba('+cc+','+al*.45+')');gr.addColorStop(1,'rgba('+cc+',0)');g.fillStyle=gr;g.fillRect(-rx,-rx,rx*2,rx*2);g.restore()};
    const wide=b.doors.length>1?2.3:1.7;
    ell(dx,dy+BP*.7,BP*wide*1.25,BP*1.5,c1,.34);      // main pool in front of the door
    ell(dx,dy+BP*.3,BP*wide*.7,BP*.9,c2,.22);          // tighter inner glow
    if(b.kind!=='arena')ell(b.x*BP+b.w*BP/2,dy-BP*.2,b.w*BP*.42,BP*.8,c1,.12);   // sign light on the facade
    const gr=g.createLinearGradient(0,dy+BP*.4,0,dy+BP*3.2);gr.addColorStop(0,'rgba('+c1+',.13)');gr.addColorStop(1,'rgba('+c1+',0)');   // vertical wet smear
    g.fillStyle=gr;for(let k=-1;k<=1;k++){const w=BP*(.1+R()*.14);g.fillRect(dx+k*BP*.62*(b.doors.length>1?1.3:1)-w/2,dy+BP*.4,w,BP*(1.5+R()*1.7))}}
  {const ab=OWB.find(q=>q.id==='arena'),ax=(ab.doors[0][0]+1)*BP,ay=(ab.y+ab.h)*BP;   // arena entrance: bright beam on the ground and chevrons leading to it
   const bg=g.createLinearGradient(0,ay,0,ay+BP*4.5);bg.addColorStop(0,'rgba(255,120,220,.30)');bg.addColorStop(1,'rgba(255,47,168,0)');g.fillStyle=bg;g.beginPath();g.moveTo(ax-BP*.9,ay);g.lineTo(ax+BP*.9,ay);g.lineTo(ax+BP*1.8,ay+BP*4.5);g.lineTo(ax-BP*1.8,ay+BP*4.5);g.fill();
   g.lineWidth=5;g.lineCap='round';for(let i=0;i<4;i++){const yy=ay+BP*(1+i*1.05);g.strokeStyle='rgba(255,79,216,'+(.55-i*.1)+')';g.beginPath();g.moveTo(ax-BP*.5,yy+BP*.3);g.lineTo(ax,yy);g.lineTo(ax+BP*.5,yy+BP*.3);g.stroke()}g.lineCap='butt'}
  g.restore();
  const wall=(x,y,w,h)=>{g.fillStyle='#0a131c';g.fillRect(x,y,w,h);g.fillStyle='#04080e';g.fillRect(x,y,w,6);for(let i=0;i<w+h;i+=BP*.5){g.fillStyle='rgba(90,150,200,.12)';if(w>h)g.fillRect(x+i,y,2,h);else g.fillRect(x,y+i,w,2)}}
  wall(0,0,OWW*BP,BP*.9);wall(0,0,BP*.9,OWH*BP);wall(OWW*BP-BP*.9,0,BP*.9,19*BP);wall(OWW*BP-BP*.9,22*BP,BP*.9,18*BP);
  g.fillStyle='#0a131c';g.fillRect(0,OWH*BP-BP*.9,14*BP,BP*.9);g.fillRect(18*BP,OWH*BP-BP*.9,14*BP,BP*.9);
  g.fillStyle='#27e0ff';g.shadowColor='#27e0ff';g.shadowBlur=14;g.fillRect(.9*BP-4,BP*.9,4,OWH*BP);g.fillStyle='#ff2fa8';g.shadowColor='#ff2fa8';g.fillRect(OWW*BP-.9*BP,.9*BP,4,18*BP);g.shadowBlur=0;
  for(const [x,y,r,col,a] of [[4.5,20.6,2.4,'#58c8ff',0.21],[6.6,20.6,2.4,'#58c8ff',0.21],[2,20,2.2,'#58c8ff',0.15],   // canal lanterns
    [11.5,29.3,2.9,'#ffb060',0.26],[8,34,2.6,'#ffb060',0.20],[23.5,34,2.6,'#ffb060',0.20],[16,38.2,3,'#ffb060',0.17],             // cozy lamps
    [20.5,29.3,3,'#f0fff4',0.22],[16,10.6,3.6,'#ffd0ee',0.11],[9.5,10.6,2.6,'#ff6ad0',0.14],[22.5,10.6,2.6,'#ff6ad0',0.14],             // pharma and arena
    [4,9.3,3.2,'#c06bff',0.24],[28,9.3,3.2,'#58ffb0',0.20],[24.5,30.3,3.4,'#b06bff',0.22]])LG.push({x:x*BP,y:y*BP,r:r*BP,col,a,f:R()*9});
  owBakeCyber(g,R);
  for(const p of m.props)owBakeP(g,p,R);
}
/* ---------- cyberpunk dressing: smog, cables, pipes, giant screens, waste (all painted once) ---------- */
function owBakeCyber(g,R){
  const B=BP;
  // exposed ductwork and steam pipes on every building roof
  for(const b of OWB){if(b.id==='arena')continue;const X=b.x*B,Y=b.y*B,W=b.w*B;
    const py=Y+B*.28;g.fillStyle='rgba(0,0,0,.45)';g.fillRect(X+8,py+8,W-16,10);
    g.fillStyle='#262440';g.fillRect(X+6,py,W-12,9);g.fillStyle='#3e3a62';g.fillRect(X+6,py,W-12,3);
    for(let x=X+16;x<X+W-10;x+=B*1.1){g.fillStyle='#14122a';g.fillRect(x,py-2,5,13)}
    g.fillStyle='#262440';g.fillRect(X+6,py,9,B*1.1);g.fillStyle='#3e3a62';g.fillRect(X+6,py,3,B*1.1);   // down-pipe
    g.fillStyle='#4a2a1a';g.fillRect(X+6,py+B*.55,9,5);
    VT.push({x:X+W-B*.9,y:py,r:1});VT.push({x:X+10,y:py+B*1.1,r:1});
    const fs=.75+R()*.5,fx=X+B*.9+R()*Math.max(0,W-B*3.2),fyy=Y+B*(.8+R()*.25);
    g.save();g.translate(fx,fyy);g.scale(fs,fs);const dx=0,dy=0;
    g.fillStyle='#1c1a32';g.fillRect(dx,dy,B*1.1,B*.7);g.strokeStyle='#4a4672';g.lineWidth=2;g.strokeRect(dx+1,dy+1,B*1.1-2,B*.7-2);
    g.fillStyle='#0a0818';g.beginPath();g.arc(dx+B*.55,dy+B*.35,B*.24,0,7);g.fill();g.strokeStyle='#5a5688';g.beginPath();g.arc(dx+B*.55,dy+B*.35,B*.24,0,7);g.stroke();
    for(let k=0;k<3;k++){const a=k*2.1;g.beginPath();g.moveTo(dx+B*.55,dy+B*.35);g.lineTo(dx+B*.55+Math.cos(a)*B*.22,dy+B*.35+Math.sin(a)*B*.22);g.stroke()}
    g.restore();
    // varied rooftop clutter so the skyline is not six identical lids
    const cx0=X+B*.8,span=Math.max(0,W-B*2.4),pick=(R()*3|0);
    for(let n=0;n<(b.w>=6?3:2);n++){const px=cx0+((n*.37+R()*.25+(fx-X)/W*.5)%1)*span,py=Y+B*(.55+R()*.5),t=(pick+n)%4;
      if(Math.abs(px-fx)<B*1.1&&Math.abs(py-fyy)<B*.9)continue;
      g.fillStyle='rgba(0,0,0,.4)';g.fillRect(px+4,py+B*.5,B*.45,6);
      if(t===0){g.fillStyle='#0d1822';g.fillRect(px+3,py+B*.3,3,B*.3);g.fillRect(px+B*.32,py+B*.3,3,B*.3);g.fillStyle='#1b2a38';g.fillRect(px,py-4,B*.44,B*.4);g.fillStyle='#2b4054';g.fillRect(px,py-4,B*.44,4);g.strokeStyle='#07101a';g.lineWidth=1.5;g.strokeRect(px,py-4,B*.44,B*.4)}   // water tank
      else if(t===1){g.strokeStyle='#07101a';g.lineWidth=3;g.beginPath();g.moveTo(px+B*.2,py+B*.5);g.lineTo(px+B*.2,py-B*.5);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(px+B*.08,py-B*.3);g.lineTo(px+B*.32,py-B*.3);g.stroke();g.fillStyle='#ff3b5c';g.beginPath();g.arc(px+B*.2,py-B*.5,4,0,7);g.fill();LG.push({x:px+B*.2,y:py-B*.5,r:B*.8,col:'#ff3b5c',a:.45,f:R()*9})}   // antenna
      else if(t===2){g.fillStyle='#0a1520';g.fillRect(px,py,B*.6,B*.36);g.fillStyle='rgba('+(R()<.5?'39,224,255':'255,176,46')+',.55)';g.fillRect(px+4,py+4,B*.6-8,B*.36-8);g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(120,200,255,.10)';g.fillRect(px-6,py-6,B*.6+12,B*.36+12);g.restore();g.strokeStyle='#2b4054';g.lineWidth=2;g.strokeRect(px,py,B*.6,B*.36)}   // skylight
      else{g.strokeStyle='#07101a';g.lineWidth=3;g.beginPath();g.moveTo(px+B*.1,py+B*.5);g.lineTo(px+B*.3,py);g.stroke();g.fillStyle='#16222e';g.beginPath();g.ellipse(px+B*.32,py-B*.04,B*.26,B*.18,-.5,0,7);g.fill();g.strokeStyle='#3a5268';g.lineWidth=1.5;g.stroke()}   // dish
    }}
  // giant LED ad screens on the lot and tower roofs
  const ads=[['crew1','#ff2fa8','#27e0ff','\u5e83\u544a'],['crew2','#ffd23a','#ff2fa8','\u9244\u738b'],['crew3','#27e0ff','#58ffb0','\u96fb\u8133'],['club','#9b5cff','#ff2fa8','\u5922']];
  for(const [id,c1,c2,txt] of ads){const b=OWB.find(q=>q.id===id),sw=Math.min(b.w-2.2,4)*B,sh=B*1.15,sx=b.x*B+B*1.1,sy=b.y*B+B*1.7;
    g.fillStyle='rgba(0,0,0,.5)';g.fillRect(sx-2,sy+10,sw+8,sh+8);g.fillStyle='#05030c';g.fillRect(sx-5,sy-5,sw+10,sh+10);
    const gr=g.createLinearGradient(sx,sy,sx+sw,sy+sh);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.globalAlpha=.9;g.fillRect(sx,sy,sw,sh);g.globalAlpha=1;
    for(let y=sy;y<sy+sh;y+=4){g.fillStyle='rgba(0,0,0,.28)';g.fillRect(sx,y,sw,2)}
    g.fillStyle='rgba(255,255,255,.35)';for(let k=0;k<4;k++)g.fillRect(sx+10+k*(sw/4),sy+sh-16-R()*sh*.5,sw/6,8+R()*sh*.4);
    g.save();g.font='400 '+Math.round(sh*.62)+'px "Bowlby One",'+KJ;g.textAlign='center';g.textBaseline='middle';g.shadowColor='#fff';g.shadowBlur=10;g.fillStyle='#fff';g.fillText(txt,sx+sw/2,sy+sh/2);g.restore();
    g.strokeStyle='#4a4672';g.lineWidth=2;g.strokeRect(sx-5,sy-5,sw+10,sh+10);
    LG.push({x:sx+sw/2,y:sy+sh+B*.7,r:Math.max(sw*.8,B*2.4),col:c1,a:.2,f:R()*9})}
  // cyberware clinic: a hanging black-market sign squeezed beside Skyline Drifters
  owNeon(g,'\u7fa9\u4f53',9.75*B,25.6*B,B*.42,'#ff2fa8',true);owNeon(g,'CYBER',10.3*B,27.2*B,B*.2,'#27e0ff',false);LG.push({x:9.9*B,y:26.3*B,r:B*2.2,col:'#ff2fa8',a:.3,f:R()*9});
  // a patched-together lean-to leaning on the Glitch Cats lot (x10, y14-15) breaks up the mirror layout
  {const lx=10*B,ly=14*B,lw=B,lh=2*B;g.fillStyle='rgba(0,0,0,.5)';g.fillRect(lx+6,ly+10,lw,lh);g.fillStyle='#1a2530';g.fillRect(lx,ly,lw,lh);
   for(let i=0;i<4;i++){g.fillStyle=i%2?'#3a5560':'#2c4450';g.beginPath();g.moveTo(lx,ly+i*lh/4);g.lineTo(lx+lw,ly+i*lh/4+6);g.lineTo(lx+lw,ly+(i+1)*lh/4+6);g.lineTo(lx,ly+(i+1)*lh/4);g.fill()}
   g.strokeStyle='#7a4a2a';g.lineWidth=3;g.strokeRect(lx+2,ly+2,lw-4,lh-4);g.fillStyle='#ff7a1a';g.fillRect(lx+B*.25,ly+B*.9,B*.5,B*.3);
   LG.push({x:lx+B*.5,y:ly+B*1.2,r:B*1.8,col:'#ff7a1a',a:.3,f:R()*9})}
  // a small memorial at the 22 fence: candles and flowers
  {const mx=2*B,my=23.5*B;for(const [dx,c] of [[-.15,'#ff2fa8'],[.1,'#ffd23a'],[.3,'#27e0ff']]){g.fillStyle='#e8e8f0';g.fillRect(mx+dx*B,my,5,9);g.fillStyle=c;g.shadowColor=c;g.shadowBlur=8;g.beginPath();g.arc(mx+dx*B+2.5,my-3,3,0,7);g.fill();g.shadowBlur=0}LG.push({x:mx+B*.1,y:my,r:B*1.4,col:'#ffd23a',a:.26,f:R()*9})}
  // spilled waste: cans, boxes, wrappers, and bags along the curbs
  for(let i=0;i<150;i++){const x=(1+R()*30)*B,y=(1+R()*38)*B;if(OWB.some(b=>x>b.x*B-4&&x<(b.x+b.w)*B+4&&y>b.y*B-4&&y<(b.y+b.h)*B+4))continue;if(x>OWWATER.x0*B-8&&x<(OWWATER.x1+1)*B+8&&y>OWWATER.y0*B-8&&y<(OWWATER.y1+1)*B+8)continue;
    const t=R();if(t<.4){g.fillStyle=['#c8c8d8','#ff2fa8','#27e0ff','#ffd23a'][i%4];g.globalAlpha=.55;g.fillRect(x,y,4+R()*5,3+R()*3)}
    else if(t<.7){g.globalAlpha=.7;g.fillStyle='#4a3a2a';g.fillRect(x,y,8+R()*8,6+R()*5);g.fillStyle='#2a2018';g.fillRect(x,y+4,10,2)}
    else{g.globalAlpha=.8;g.fillStyle='#0a0810';g.beginPath();g.ellipse(x,y,6+R()*4,5,0,0,7);g.fill();g.fillStyle='rgba(160,170,200,.3)';g.fillRect(x-2,y-3,3,2)}}
  g.globalAlpha=1;
  // dense webs of power cables sagging between the rooflines and lamp posts
  const cab=(x0,y0,x1,y1,sag)=>{x0*=B;y0*=B;x1*=B;y1*=B;sag*=B;const mx=(x0+x1)/2,my=(y0+y1)/2+sag;
    g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=5;g.beginPath();g.moveTo(x0,y0+14);g.quadraticCurveTo(mx,my+18,x1,y1+14);g.stroke();
    g.strokeStyle='rgba(6,3,16,.92)';g.lineWidth=2.4;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(mx,my,x1,y1);g.stroke();
    g.strokeStyle='rgba(120,110,200,.22)';g.lineWidth=.8;g.beginPath();g.moveTo(x0,y0-1);g.quadraticCurveTo(mx,my-1,x1,y1-1);g.stroke()};
  for(const c of [[9.8,12.6,22.2,12.6,1.5],[9.8,16.2,22.2,15.8,1.4],[10,18.4,21.8,18.4,1],[10,23.0,21.8,23.4,1.2],[10,31.5,21.8,31.7,1.1],
    [1.5,19,9.8,19.4,.8],[22.5,18.8,30.5,19.2,.9],[10,11,22,11,1.3],[3,22.5,9,23.5,.6]])cab(...c);
  // sparking cable ends and junction boxes
  for(const [x,y] of [[10.0,13],[22,13.4],[10,18.4],[21.8,23.4],[18,26.2]]){g.fillStyle='#1a1830';g.fillRect(x*B-7,y*B-6,14,12);g.strokeStyle='#4a4672';g.lineWidth=1;g.strokeRect(x*B-7,y*B-6,14,12);g.fillStyle=R()<.5?'#ff3b5c':'#58ffb0';g.beginPath();g.arc(x*B,y*B,2.2,0,7);g.fill();LG.push({x:x*B,y:y*B,r:B*.9,col:'#ff3b5c',a:.12,f:R()*9})}
  // smog: thick drifting bands that eat the light at street level
  for(let i=0;i<34;i++){const x=R()*32*B,y=R()*40*B,rx=B*(2.5+R()*4),ry=B*(.9+R()*1.6),gr=g.createRadialGradient(x,y,2,x,y,rx);const c=i%3?'60,70,95':'70,95,90';gr.addColorStop(0,'rgba('+c+',.20)');gr.addColorStop(1,'rgba('+c+',0)');g.fillStyle=gr;g.save();g.translate(x,y);g.scale(1,ry/rx);g.translate(-x,-y);g.fillRect(x-rx,y-rx,rx*2,rx*2);g.restore()}
}
function owBakeCanal(g,R){
  const W=OWWATER,X=W.x0*BP,Y=W.y0*BP,w=(W.x1-W.x0+1)*BP,h=(W.y1-W.y0+1)*BP;
  g.fillStyle='rgba(0,0,0,.5)';g.fillRect(X-4,Y-4,w+8,h+10);
  const gr=g.createLinearGradient(0,Y,0,Y+h);gr.addColorStop(0,'#08283b');gr.addColorStop(1,'#040f20');g.fillStyle=gr;g.fillRect(X,Y,w,h);
  for(const [y0,y1,hz] of [[Y,Y+14,0],[Y+h-14,Y+h,1]]){const eg=g.createLinearGradient(0,y0,0,y1);eg.addColorStop(hz?1:0,'rgba(0,0,0,.6)');eg.addColorStop(hz?0:1,'rgba(0,0,0,0)');g.fillStyle=eg;g.fillRect(X,y0,w,y1-y0)}   // dark water edge
  for(let i=0;i<14;i++){const x=X+R()*w,y0=Y+8+R()*(h-16),c=['39,224,255','255,47,168','255,176,46'][i%3];for(let k=0;k<4;k++){g.fillStyle='rgba('+c+','+(.16-k*.03)+')';g.fillRect(x+(R()-.5)*8,y0+k*7,BP*(.5-k*.08)*(.6+R()*.6),2)}}   // broken reflections
  for(let i=0;i<46;i++){const x=X+R()*w,y=Y+R()*h;g.strokeStyle=['rgba(39,224,255,.35)','rgba(255,47,168,.28)','rgba(159,246,255,.2)'][i%3];g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+BP*(.2+R()*.5),y);g.stroke()}
  g.fillStyle='#2a2448';g.fillRect(X-6,Y-6,w+12,8);g.fillRect(X-6,Y+h-2,w+12,8);   // concrete banks
  g.strokeStyle='rgba(39,224,255,.45)';g.lineWidth=2;g.shadowColor='#27e0ff';g.shadowBlur=4;g.strokeRect(X,Y,w,h);g.shadowBlur=0;
  // dock
  const d=W.dock,dx=d[0][0]*BP,dy=d[0][1]*BP,dw=d.length*BP;
  g.fillStyle='#4a3322';g.fillRect(dx,dy-2,dw,BP+4);
  for(let x=dx;x<dx+dw;x+=BP*.25){g.fillStyle='#6b4a30';g.fillRect(x+2,dy,BP*.25-4,BP);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x,dy,2,BP)}
  g.fillStyle='#2b1d12';for(const px of [dx+4,dx+dw-12]){g.fillRect(px,dy+BP-4,8,14)}
  {const sg2=g.createLinearGradient(0,dy+BP,0,dy+BP+BP*.5);sg2.addColorStop(0,'rgba(0,0,0,.6)');sg2.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=sg2;g.fillRect(dx-2,dy+BP,dw+4,BP*.5)}   // dock shadow on the water
  for(const mx2 of [X+BP*.3,X+BP*2.6,X+BP*7.4]){g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(mx2+3,Y+h+8,8,3,0,0,7);g.fill();g.fillStyle='#10161e';g.fillRect(mx2-4,Y+h-6,8,16);g.fillStyle='#3a2f20';g.fillRect(mx2-5,Y+h-8,10,5);g.strokeStyle='#6b4a30';g.lineWidth=2;g.beginPath();g.moveTo(mx2-5,Y+h-6);g.lineTo(mx2+5,Y+h-4);g.stroke()}   // mooring posts
  // little steel footbridge across the canal, railings along both banks, and a culvert where the water meets the avenue
  {const bx=9*BP,bw=2*BP;g.fillStyle='rgba(0,0,0,.5)';g.fillRect(bx-4,Y+4,bw+8,h);g.fillStyle='#2a3340';g.fillRect(bx,Y-6,bw,h+12);for(let yy=Y-6;yy<Y+h+6;yy+=BP*.2){g.fillStyle='rgba(0,0,0,.35)';g.fillRect(bx,yy,bw,2);g.fillStyle='rgba(160,190,220,.10)';g.fillRect(bx,yy+2,bw,2)}
    g.strokeStyle='#27e0ff';g.shadowColor='#27e0ff';g.shadowBlur=8;g.lineWidth=3;g.beginPath();g.moveTo(bx+2,Y-6);g.lineTo(bx+2,Y+h+6);g.moveTo(bx+bw-2,Y-6);g.lineTo(bx+bw-2,Y+h+6);g.stroke();g.shadowBlur=0;
    LG.push({x:bx+bw/2,y:Y+h/2,r:BP*2.4,col:'#27e0ff',a:.18,f:R()*9})}
  {const rail=(y)=>{for(let x=X;x<X+w;x+=BP*.5){const inDock=x>=4*BP-2&&x<7*BP,inBr=x>=9*BP-2&&x<11*BP;if(inDock||inBr)continue;g.fillStyle='#05080e';g.fillRect(x,y-8,4,12);}
      g.strokeStyle='rgba(39,224,255,.75)';g.shadowColor='#27e0ff';g.shadowBlur=6;g.lineWidth=2;for(const [a0,a1] of [[X,4*BP],[7*BP,9*BP],[11*BP,X+w]]){g.beginPath();g.moveTo(a0,y-6);g.lineTo(a1,y-6);g.stroke()}g.shadowBlur=0};
    rail(Y-8);rail(Y+h+8)}
  g.fillStyle='#070b12';g.fillRect(X+w-6,Y+6,6,h-12);g.strokeStyle='#3a4a5a';g.lineWidth=2;for(let yy=Y+10;yy<Y+h-8;yy+=10){g.beginPath();g.moveTo(X+w-6,yy);g.lineTo(X+w,yy);g.stroke()}   // culvert grate
  // fishing line and bobber
  const lx=5*BP+BP*.7,ly=21*BP+BP*.5;g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1.5;g.beginPath();g.moveTo(lx,ly);g.quadraticCurveTo(lx+BP*.4,ly+BP*.2,lx+BP*.35,22*BP+BP*.45);g.stroke();
  g.fillStyle='#ff3b5c';g.beginPath();g.arc(lx+BP*.35,22*BP+BP*.45,5,0,7);g.fill();g.strokeStyle='rgba(159,246,255,.5)';g.beginPath();g.ellipse(lx+BP*.35,22*BP+BP*.5,12,4,0,0,7);g.stroke();
  LG.push({x:X+w/2,y:Y+h/2,r:BP*4.2,col:'#27e0ff',a:.16,f:R()*9});
}
function owBakeB(g,b,R){
  const X=b.x*BP,Y=b.y*BP,W=b.w*BP,H=b.h*BP,fh=2*BP,ry=Y,rh=H-fh,fy=Y+rh;
  g.fillStyle='rgba(0,0,0,.45)';g.fillRect(X-6,Y+10,W+12,H+14);
  if(rh>0){
  if(b.kind==='arena'){
    g.fillStyle='#050a10';g.fillRect(X,ry,W,rh);
    g.fillStyle='#0d1620';g.fillRect(X+8,ry+8,W-16,rh-8);
    const fx=X+BP*1.6,fy2=ry+BP*1.2,fw=W-BP*3.2,fhh=rh-BP*1.8;
    const gr=g.createLinearGradient(0,fy2,0,fy2+fhh);gr.addColorStop(0,'#0c2a3a');gr.addColorStop(1,'#10213a');g.fillStyle=gr;g.fillRect(fx,fy2,fw,fhh);g.fillStyle='rgba(3,6,12,.5)';g.fillRect(fx,fy2,fw,fhh);
    g.strokeStyle='rgba(159,246,255,.8)';g.lineWidth=3;g.shadowColor='#27e0ff';g.shadowBlur=10;g.strokeRect(fx,fy2,fw,fhh);g.shadowBlur=0;
    for(let i=1;i<10;i++){g.strokeStyle='rgba(159,246,255,.35)';g.beginPath();g.moveTo(fx+fw*i/10,fy2);g.lineTo(fx+fw*i/10,fy2+fhh);g.stroke()}
    g.strokeStyle='#ff4fd8';g.shadowColor='#ff2fa8';g.shadowBlur=12;g.beginPath();g.arc(fx+fw/2,fy2+fhh/2,BP*1.1,0,7);g.stroke();g.shadowBlur=0;
    g.fillStyle='#ff4fd8';const cx=fx+fw/2,cy=fy2+fhh/2;g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?BP*.28:BP*.62;g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}g.closePath();g.fill();
    for(let i=0;i<6;i++){g.fillStyle='rgba(120,100,220,'+(.12+i*.02)+')';g.fillRect(X+8,ry+8+i*8,W-16,3);g.fillRect(X+8,ry+rh-12-i*7,W-16,3)}
    for(const [lx,ly] of [[X+BP*.7,ry+BP*.7],[X+W-BP*.7,ry+BP*.7],[X+BP*.7,ry+rh-BP*.7],[X+W-BP*.7,ry+rh-BP*.7]]){g.fillStyle='#e8f6ff';g.beginPath();g.arc(lx,ly,8,0,7);g.fill();LG.push({x:lx,y:ly,r:BP*2.4,col:'#27e0ff',a:.28,f:R()*9})}
  }else if(b.kind==='lot'){
    g.fillStyle='#060b12';g.fillRect(X,ry,W,rh);
    g.fillStyle='#0c141d';g.fillRect(X+10,ry+10,W-20,rh-10);
    const lx=X+BP*.7,ly=ry+BP*.55,lw=W-BP*1.4,lh=rh-BP*.8;
    g.fillStyle='#101a2c';g.fillRect(lx,ly,lw,lh);
    g.strokeStyle=b.col;g.lineWidth=3;g.shadowColor=b.col;g.shadowBlur=9;g.strokeRect(lx,ly,lw,lh);g.shadowBlur=0;
    for(let i=1;i<8;i++){g.strokeStyle='rgba(159,246,255,.3)';g.beginPath();g.moveTo(lx+lw*i/8,ly);g.lineTo(lx+lw*i/8,ly+lh);g.stroke()}
    g.fillStyle=b.col;g.beginPath();g.arc(lx+lw/2,ly+lh/2,BP*.5,0,7);g.fill();
    for(let x=X;x<X+W;x+=BP*.35){g.strokeStyle='rgba(180,190,230,.25)';g.beginPath();g.moveTo(x,ry);g.lineTo(x+BP*.35,ry+rh);g.stroke()}
    LG.push({x:lx+lw/2,y:ly+lh/2,r:BP*3,col:b.col,a:.2,f:R()*9});
  }else{
    const gr=g.createLinearGradient(0,ry,0,ry+rh);gr.addColorStop(0,'#101a25');gr.addColorStop(1,'#0a111a');g.fillStyle=gr;g.fillRect(X,ry,W,rh);
    g.strokeStyle='rgba(120,100,220,.18)';g.lineWidth=2;for(let i=1;i<b.w;i++){g.beginPath();g.moveTo(X+i*BP,ry);g.lineTo(X+i*BP,ry+rh);g.stroke()}
    const n=Math.max(1,Math.floor(b.w*(b.h-2)/8));
    for(let i=0;i<n;i++){const ax=X+BP*.4+R()*(W-BP*1.6),ay=ry+BP*.3+R()*Math.max(4,rh-BP*1.1),k=R();
      if(k<.4){g.fillStyle='#18232f';g.fillRect(ax,ay,BP*.8,BP*.6);g.strokeStyle='#050a10';g.lineWidth=2;g.strokeRect(ax,ay,BP*.8,BP*.6);g.beginPath();g.arc(ax+BP*.4,ay+BP*.3,BP*.2,0,7);g.stroke();VT.push({x:ax+BP*.4,y:ay+BP*.3,r:1})}
      else if(k<.7){g.fillStyle='#1b2733';g.beginPath();g.arc(ax+BP*.4,ay+BP*.4,BP*.34,0,7);g.fill();g.strokeStyle='rgba(255,255,255,.2)';g.lineWidth=2;g.stroke()}
      else{g.strokeStyle='#03060a';g.lineWidth=3;g.beginPath();g.moveTo(ax,ay);g.lineTo(ax+BP*.2,ay-BP*.5);g.stroke();g.fillStyle='#ff3b5c';g.beginPath();g.arc(ax+BP*.2,ay-BP*.5,4,0,7);g.fill();LG.push({x:ax+BP*.2,y:ay-BP*.5,r:BP*.7,col:'#ff3b5c',a:.5,f:R()*9})}}
    g.strokeStyle='rgba(255,255,255,.1)';g.strokeRect(X+2,ry+2,W-4,rh-4);
  }
  g.strokeStyle=b.col;g.lineWidth=4;g.shadowColor=b.col;g.shadowBlur=10;g.beginPath();g.moveTo(X,ry+rh);g.lineTo(X,ry);g.lineTo(X+W,ry);g.lineTo(X+W,ry+rh);g.stroke();g.shadowBlur=0;
  }
  const fg=g.createLinearGradient(0,fy,0,fy+fh);fg.addColorStop(0,'#16212d');fg.addColorStop(1,'#080e16');g.fillStyle=fg;g.fillRect(X,fy,W,fh);
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(X,fy,W,5);
  if(b.kind!=='arena'){   // facade variety: concrete band, a vertical pipe run and a roof tank on some buildings
    g.fillStyle='rgba(150,165,185,.10)';g.fillRect(X,fy+BP*.46,W,4);
    const pk=((b.x*7+b.y*3)%3);
    if(pk!==1){const px2=X+BP*(pk===0?.9:b.w-.9);g.fillStyle='#0a1118';g.fillRect(px2-4,Y+BP*.2,8,H-BP*.2);g.fillStyle='rgba(150,170,200,.25)';g.fillRect(px2-4,Y+BP*.2,2,H-BP*.2);for(let yy=Y+BP*.6;yy<Y+H-BP*.4;yy+=BP*1.3){g.fillStyle='#1b2733';g.fillRect(px2-7,yy,14,5)}}
    if(b.kind==='shop'&&b.w>=4){g.fillStyle='#0b131c';g.fillRect(X+W-BP*1.6,Y+BP*.25,BP*.9,BP*.7);g.strokeStyle='rgba(150,170,200,.3)';g.lineWidth=2;g.strokeRect(X+W-BP*1.6,Y+BP*.25,BP*.9,BP*.7);g.fillStyle='rgba(150,170,200,.16)';for(let i=0;i<3;i++)g.fillRect(X+W-BP*1.5,Y+BP*.35+i*BP*.18,BP*.7,3)}
  }
  const isDoorCol=i=>b.doors.some(d=>d[0]===b.x+i);
  for(let i=0;i<b.w;i++){
    if(isDoorCol(i)){
      const dx=X+i*BP;g.fillStyle='#03060a';g.fillRect(dx+6,fy+BP*.35,BP-12,fh-BP*.35);
      g.strokeStyle=b.col2;g.lineWidth=4;g.shadowColor=b.col2;g.shadowBlur=16;g.strokeRect(dx+6,fy+BP*.35,BP-12,fh-BP*.35);g.shadowBlur=0;
      const dg=g.createLinearGradient(0,fy+BP*.4,0,fy+fh);dg.addColorStop(0,nrgba(b.col2,.12));dg.addColorStop(1,nrgba(b.col2,.42));g.fillStyle=dg;g.fillRect(dx+8,fy+BP*.4,BP-16,fh-BP*.4);
      g.fillStyle='rgba(255,255,255,.55)';g.fillRect(dx+9,fy+BP*.4,2,fh-BP*.4);g.fillRect(dx+BP-11,fy+BP*.4,2,fh-BP*.4);   // lit door jambs
      g.fillStyle='#15202b';g.fillRect(dx+3,fy+fh-6,BP-6,6);g.fillStyle=nrgba(b.col2,.8);g.fillRect(dx+6,fy+fh-6,BP-12,2);   // threshold step
      g.fillStyle='#fff';g.shadowColor=b.col2;g.shadowBlur=12;g.beginPath();g.arc(dx+BP/2,fy+BP*.3,3.2,0,7);g.fill();g.shadowBlur=0;   // door lamp
      LG.push({x:dx+BP/2,y:fy+fh,r:BP*1.5,col:b.col2,a:.26,f:R()*9});
    }else{
      for(let r=0;r<2;r++){const wx=X+i*BP+BP*.2,wy=fy+BP*.62+r*BP*.62;if(wy+BP*.42>fy+fh-4)continue;
        const q=R(),lit=q<.68,shut=q>.88;g.fillStyle=shut?'#16212c':lit?['#ffd9a0','#9ff6ff','#ff9be8','#c9a6ff'][(R()*4)|0]:'#060b12';g.globalAlpha=lit?.45+R()*.45:1;g.fillRect(wx,wy,BP*.6,BP*.4);g.globalAlpha=1;if(shut){g.fillStyle='rgba(0,0,0,.55)';for(let sl=2;sl<BP*.4;sl+=5)g.fillRect(wx,wy+sl,BP*.6,2)}g.strokeStyle='rgba(0,0,0,.6)';g.strokeRect(wx,wy,BP*.6,BP*.4);{const vv=R();if(vv<.12){g.fillStyle='rgba(20,14,8,.85)';g.fillRect(wx,wy,BP*.6,BP*.4);g.strokeStyle='#4a3a2e';g.lineWidth=3;g.beginPath();g.moveTo(wx,wy+BP*.1);g.lineTo(wx+BP*.6,wy+BP*.3);g.moveTo(wx,wy+BP*.3);g.lineTo(wx+BP*.6,wy+BP*.1);g.stroke();g.lineWidth=1}else if(vv<.22){g.fillStyle='#0a1118';g.fillRect(wx,wy,BP*.6,BP*.4);g.fillStyle='#1d2a36';for(let sl=3;sl<BP*.4;sl+=4)g.fillRect(wx+2,wy+sl,BP*.6-4,2)}else if(vv<.3&&lit){g.strokeStyle='rgba(0,0,0,.7)';g.lineWidth=2;g.beginPath();g.moveTo(wx+BP*.15,wy);g.lineTo(wx+BP*.35,wy+BP*.22);g.lineTo(wx+BP*.25,wy+BP*.4);g.stroke();g.lineWidth=1}else if(vv<.4){g.fillStyle='rgba(0,0,0,.5)';g.fillRect(wx-2,wy-2,BP*.6+4,4);g.fillStyle='rgba(180,200,220,.12)';g.fillRect(wx-2,wy+BP*.4,BP*.6+4,3)}}if(lit&&R()<.25){g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,220,180,.10)';g.fillRect(wx-3,wy+BP*.4,BP*.6+6,BP*.25);g.restore()}}
    }
  }
  {const base=g.createLinearGradient(0,fy+fh-BP*.5,0,fy+fh);base.addColorStop(0,'rgba(0,0,0,0)');base.addColorStop(1,'rgba(0,0,0,.6)');g.fillStyle=base;g.fillRect(X,fy+fh-BP*.5,W,BP*.5);   // darker wall foot
   const dxs=b.doors.map(d=>d[0]),ax0=(Math.min(...dxs))*BP-BP*.18,ax1=(Math.max(...dxs)+1)*BP+BP*.18,ay=fy+BP*.18;   // awning over the door(s)
   g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.moveTo(ax0+4,ay+BP*.3);g.lineTo(ax1+4,ay+BP*.3);g.lineTo(ax1+10,ay+BP*.62);g.lineTo(ax0-2,ay+BP*.62);g.fill();
   const aw=Math.max(1,Math.round((ax1-ax0)/(BP*.3)));for(let i=0;i<aw;i++){const x0=ax0+i*(ax1-ax0)/aw,x1=ax0+(i+1)*(ax1-ax0)/aw;g.fillStyle=i%2?b.col2:'#0a111a';g.globalAlpha=i%2?.75:.95;g.beginPath();g.moveTo(x0+2,ay);g.lineTo(x1-2,ay);g.lineTo(x1+1,ay+BP*.34);g.lineTo(x0-1,ay+BP*.34);g.fill()}g.globalAlpha=1;
   g.shadowColor=b.col2;g.shadowBlur=8;g.fillStyle=b.col2;g.fillRect(ax0,ay+BP*.34,ax1-ax0,3);g.shadowBlur=0}
  g.strokeStyle='rgba(0,0,0,.7)';g.lineWidth=4;g.beginPath();g.moveTo(X,fy+BP*.28);for(let x=X;x<X+W;x+=BP)g.quadraticCurveTo(x+BP*.5,fy+BP*.5,x+BP,fy+BP*.28);g.stroke();
  const sx=X+W/2,sy=fy+BP*.28;
  {const pw=b.kind==='arena'?W*.62:Math.min(W-BP*.5,Math.max(BP*1.5,(b.sign.length<3?BP*1.4:b.sign.length*BP*.36))),ph=b.kind==='arena'?BP*1.35:(b.sub&&b.sign.length>=3?BP*.82:b.sign.length<3?BP*1.2:BP*.5),py=b.kind==='arena'?fy+BP*.1:fy+BP*.06;
   g.fillStyle='rgba(4,3,12,.82)';g.fillRect(sx-pw/2,py,pw,ph);g.strokeStyle=nrgba(b.col,.5);g.lineWidth=2;g.strokeRect(sx-pw/2,py,pw,ph)}
  if(b.kind==='arena'){owNeon(g,b.sign,sx,fy+BP*.62,BP*.72,b.col);owNeon(g,b.sub,sx,fy+BP*1.4,BP*.42,b.col2);LG.push({x:sx,y:fy+BP*.9,r:W*.42,col:b.col,a:.09,f:2})}
  else{const big=b.sign.length<3;owNeon(g,b.sign,sx,sy+(big?BP*.42:BP*.12),big?BP*.92:BP*.4,b.col);if(b.sub&&!big)owNeon(g,b.sub,sx,sy+BP*.62,BP*.3,b.col2);else if(b.sub)owNeon(g,b.sub,sx,fy+fh-BP*.24,BP*.34,b.col2);LG.push({x:sx,y:fy+BP*.5,r:Math.max(BP*2,W*.45),col:b.col,a:.11,f:R()*9})}
  for(const side of [0,1]){const kx=X+(side?W-BP*.28:BP*.28);owNeon(g,b.ck[side],kx,fy-BP*.3,BP*.36,side?b.col2:b.col,true)}
  g.globalCompositeOperation='lighter';const sg=g.createRadialGradient(sx,Y+H+BP*.9,5,sx,Y+H+BP*.9,Math.max(BP*3.4,W*.8));sg.addColorStop(0,nrgba(b.col,b.kind==='arena'?.13:.24));sg.addColorStop(1,nrgba(b.col,0));g.fillStyle=sg;g.save();g.translate(0,Y+H+BP*.9);g.scale(1,.38);g.translate(0,-(Y+H+BP*.9));g.fillRect(sx-W,Y+H-BP*3,W*2,BP*8);g.restore();g.globalCompositeOperation='source-over';
  {const sh=g.createLinearGradient(0,Y+H,0,Y+H+BP*.9);sh.addColorStop(0,'rgba(0,0,0,.55)');sh.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=sh;g.fillRect(X-4,Y+H,W+8,BP*.9)}
  {const sh2=g.createLinearGradient(X+W,0,X+W+BP*.7,0);sh2.addColorStop(0,'rgba(0,0,0,.4)');sh2.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=sh2;g.fillRect(X+W,Y+BP*.3,BP*.7,H-BP*.2)}
}
function owBakeP(g,p,R){
  const X=p.x*BP,Y=p.y*BP,cx=X+BP/2,cy=Y+BP/2;
  g.save();
  const sh=(w)=>{g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(cx,cy+BP*.34,w||BP*.3,BP*.12,0,0,7);g.fill()};
  if(p.t==='lamp'){sh();g.strokeStyle='#050410';g.lineWidth=7;g.beginPath();g.moveTo(cx,cy+BP*.3);g.lineTo(cx,cy-BP*.8);g.lineTo(cx+BP*.22,cy-BP*.8);g.stroke();g.fillStyle='#ffe8b0';g.shadowColor='#ff9a3c';g.shadowBlur=20;g.beginPath();g.arc(cx+BP*.26,cy-BP*.78,9,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';g.translate(cx+BP*.1,cy+BP*.25);g.scale(1,.55);{const gr=g.createRadialGradient(0,0,0,0,0,BP*1.4);gr.addColorStop(0,'rgba(255,170,80,.30)');gr.addColorStop(.5,'rgba(255,140,60,.12)');gr.addColorStop(1,'rgba(255,140,60,0)');g.fillStyle=gr;g.fillRect(-BP*1.4,-BP*1.4,BP*2.8,BP*2.8)}g.restore();LG.push({x:cx+BP*.26,y:cy-BP*.7,r:BP*2.6,col:'#ff9a3c',a:.22,f:R()*9})}
  else if(p.t==='pole'){sh();g.strokeStyle='#050410';g.lineWidth=8;g.beginPath();g.moveTo(cx,cy+BP*.3);g.lineTo(cx,cy-BP*.9);g.stroke();const col=(p.x+p.y)%2?'#27e0ff':'#ff2fa8';owNeon(g,STAD.kanji[(p.x+p.y)%16],cx,cy-BP*.3,BP*.4,col,true);LG.push({x:cx,y:cy-BP*.4,r:BP*2,col,a:.25,f:R()*9})}
  else if(p.t==='vend'){sh(BP*.38);g.fillStyle='#1a1536';g.fillRect(X+8,Y+BP*.1,BP-16,BP*.82);g.fillStyle='#27e0ff';g.shadowColor='#27e0ff';g.shadowBlur=14;g.fillRect(X+14,Y+BP*.2,BP-28,BP*.42);g.shadowBlur=0;g.fillStyle='#ff2fa8';g.fillRect(X+14,Y+BP*.7,BP-28,6);LG.push({x:cx,y:cy,r:BP*1.4,col:'#27e0ff',a:.2,f:R()*9})}
  else if(p.t==='dump'){sh(BP*.42);g.fillStyle='#1f6f4a';g.fillRect(X+6,Y+BP*.22,BP-12,BP*.6);g.fillStyle='#2b9a69';g.fillRect(X+4,Y+BP*.16,BP-8,BP*.16);g.strokeStyle='#0a0818';g.lineWidth=3;g.strokeRect(X+6,Y+BP*.22,BP-12,BP*.6)}
  else if(p.t==='crate'){sh(BP*.38);g.fillStyle='#4a3a2e';g.fillRect(X+8,Y+BP*.25,BP-16,BP*.56);g.strokeStyle='#241a12';g.lineWidth=3;g.strokeRect(X+8,Y+BP*.25,BP-16,BP*.56);g.beginPath();g.moveTo(X+8,Y+BP*.25);g.lineTo(X+BP-8,Y+BP*.81);g.stroke()}
  else if(p.t==='bench'){sh(BP*.4);if(p.vert){g.fillStyle='#06050f';g.fillRect(X+2,Y+4,5,BP-8);g.fillStyle='#2a2448';g.fillRect(X+6,Y+4,BP*.26,BP-8);g.fillStyle='#27e0ff';g.fillRect(X+5,Y+4,3,BP-8)}else{g.fillStyle='#2a2448';g.fillRect(X+4,Y+BP*.38,BP-8,BP*.2);g.fillStyle='#06050f';g.fillRect(X+8,Y+BP*.58,6,BP*.2);g.fillRect(X+BP-14,Y+BP*.58,6,BP*.2);g.fillStyle='#27e0ff';g.fillRect(X+4,Y+BP*.36,BP-8,3)}}
  else if(p.t==='stall'){sh(BP*.42);g.fillStyle='#1c1630';g.fillRect(X+4,Y+BP*.42,BP-8,BP*.5);g.fillStyle='#3a2c18';g.fillRect(X+4,Y+BP*.42,BP-8,6);
    for(let i=0;i<5;i++){g.fillStyle=i%2?'#ff2fa8':'#ffd23a';g.fillRect(X+2+i*(BP-4)/5,Y+BP*.06,(BP-4)/5,BP*.3)}   // striped awning
    g.fillStyle='#ffb060';g.shadowColor='#ffb060';g.shadowBlur=12;g.fillRect(X+10,Y+BP*.56,BP-20,5);g.shadowBlur=0;VT.push({x:cx,y:Y+BP*.4,r:1});LG.push({x:cx,y:cy,r:BP*1.8,col:'#ffb060',a:.3,f:R()*9})}
  else if(p.t==='repair'){sh(BP*.42);g.fillStyle='#141a2a';g.fillRect(X+3,Y+BP*.34,BP-6,BP*.58);g.fillStyle='#27e0ff';g.shadowColor='#27e0ff';g.shadowBlur=10;g.fillRect(X+8,Y+BP*.42,BP-16,BP*.22);g.shadowBlur=0;
    for(let i=0;i<3;i++){g.fillStyle=['#58ffb0','#ff2fa8','#ffd23a'][i];g.fillRect(X+10+i*14,Y+BP*.72,8,6)}g.fillStyle='#4a4672';g.fillRect(X+BP*.7,Y+BP*.12,3,BP*.28);g.beginPath();g.arc(X+BP*.7+1,Y+BP*.1,5,0,7);g.fill();LG.push({x:cx,y:cy,r:BP*1.7,col:'#27e0ff',a:.28,f:R()*9})}
  else if(p.t==='hoload'){sh(BP*.38);g.fillStyle='#14122a';g.fillRect(X+14,Y+BP*.55,BP-28,BP*.38);g.strokeStyle='#4a4672';g.lineWidth=2;g.strokeRect(X+14,Y+BP*.55,BP-28,BP*.38);
    const gr=g.createLinearGradient(0,Y-BP*1.4,0,Y+BP*.55);gr.addColorStop(0,'rgba(255,47,168,0)');gr.addColorStop(1,'rgba(255,47,168,.55)');g.fillStyle=gr;g.beginPath();g.moveTo(cx-6,Y+BP*.55);g.lineTo(cx-BP*.5,Y-BP*1.4);g.lineTo(cx+BP*.5,Y-BP*1.4);g.lineTo(cx+6,Y+BP*.55);g.fill();
    {g.fillStyle='rgba(255,230,250,.7)';g.beginPath();g.arc(cx,Y-BP*.55,BP*.2,0,7);g.fill();g.fillRect(cx-BP*.2,Y-BP*.3,BP*.4,BP*.55);for(let y=Y-BP*1.4;y<Y+BP*.5;y+=5){g.fillStyle='rgba(0,0,0,.35)';g.fillRect(cx-BP*.5,y,BP,2)}}
    LG.push({x:cx,y:Y-BP*.2,r:BP*2.4,col:'#ff2fa8',a:.26,f:R()*9})}
  else if(p.t==='barrier'){sh(BP*.4);g.fillStyle='#e8c53a';g.fillRect(X+3,Y+BP*.34,BP-6,BP*.34);g.fillStyle='#0a0818';for(let i=0;i<4;i++){g.beginPath();g.moveTo(X+8+i*14,Y+BP*.34);g.lineTo(X+18+i*14,Y+BP*.34);g.lineTo(X+10+i*14,Y+BP*.68);g.lineTo(X+i*14,Y+BP*.68);g.fill()}}
  else if(p.t==='cone'){sh(BP*.2);g.fillStyle='#ff7a1a';g.beginPath();g.moveTo(cx-BP*.14,cy+BP*.24);g.lineTo(cx,cy-BP*.24);g.lineTo(cx+BP*.14,cy+BP*.24);g.fill();g.fillStyle='#fff';g.fillRect(cx-BP*.08,cy,BP*.16,5)}
  else if(p.t==='vent'){g.fillStyle='#050410';g.beginPath();g.ellipse(cx,cy+4,BP*.3,BP*.18,0,0,7);g.fill();g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=2;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(cx+i*BP*.1,cy-BP*.06);g.lineTo(cx+i*BP*.1,cy+BP*.14);g.stroke()}VT.push({x:cx,y:cy,r:0})}
  else if(p.t==='hut'){const X0=1*BP,Y0=18*BP,w=2*BP,h=2*BP;g.fillStyle='rgba(0,0,0,.45)';g.fillRect(X0-4,Y0+10,w+8,h+6);
    g.fillStyle='#3a2a1c';g.fillRect(X0+6,Y0+BP*.7,w-12,h-BP*.7);for(let x=X0+6;x<X0+w-6;x+=14){g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x,Y0+BP*.7,2,h-BP*.7)}
    g.fillStyle='#1c1534';g.beginPath();g.moveTo(X0-4,Y0+BP*.78);g.lineTo(X0+w/2,Y0+BP*.1);g.lineTo(X0+w+4,Y0+BP*.78);g.fill();g.strokeStyle='#27e0ff';g.lineWidth=3;g.shadowColor='#27e0ff';g.shadowBlur=10;g.stroke();g.shadowBlur=0;
    g.fillStyle='#050410';g.fillRect(X0+w/2-14,Y0+h-BP*.7,28,BP*.7);g.fillStyle='#ffe8b0';g.shadowColor='#ff9a3c';g.shadowBlur=12;g.fillRect(X0+10,Y0+BP*.95,16,14);g.shadowBlur=0;
    owNeon(g,'\u91e3',X0+w/2,Y0+BP*.5,BP*.4,'#ff2fa8');LG.push({x:X0+18,y:Y0+BP*1.05,r:BP*1.8,col:'#ff9a3c',a:.3,f:R()*9})}
  else if(p.t==='car'){   // parked hover-car, top-down, 2 tiles long: wide rear, tapered nose, dark body, subtle trim
    const v=p.o==='v',L=BP*2-14,Wd=BP*.64,mx=v?cx:X+BP,my=v?Y+BP:cy;
    g.translate(mx,my);if(v)g.rotate(Math.PI/2);
    const ug=g.createRadialGradient(0,0,0,0,0,L*.6);ug.addColorStop(0,p.col+'30');ug.addColorStop(1,p.col+'00');g.fillStyle=ug;g.beginPath();g.ellipse(0,2,L*.6,Wd*.9,0,0,7);g.fill();
    g.fillStyle='rgba(0,0,0,.55)';g.beginPath();g.ellipse(2,6,L*.5,Wd*.5,0,0,7);g.fill();
    const body=()=>{g.beginPath();g.moveTo(-L/2,-Wd*.5);g.lineTo(-L*.12,-Wd*.5);g.quadraticCurveTo(L*.3,-Wd*.46,L/2,-Wd*.16);g.lineTo(L/2,Wd*.16);g.quadraticCurveTo(L*.3,Wd*.46,-L*.12,Wd*.5);g.lineTo(-L/2,Wd*.5);g.quadraticCurveTo(-L/2-3,0,-L/2,-Wd*.5);g.closePath()};
    body();g.fillStyle='#0d1824';g.fill();g.strokeStyle=p.col;g.globalAlpha=.7;g.lineWidth=1.5;g.stroke();g.globalAlpha=1;
    g.fillStyle='#17283a';g.beginPath();g.moveTo(-L*.4,-Wd*.4);g.lineTo(L*.1,-Wd*.4);g.lineTo(L*.1,Wd*.4);g.lineTo(-L*.4,Wd*.4);g.closePath();g.fill();   // rear deck
    g.fillStyle='#070d14';g.beginPath();g.moveTo(-L*.2,-Wd*.34);g.lineTo(L*.14,-Wd*.3);g.lineTo(L*.26,-Wd*.12);g.lineTo(L*.26,Wd*.12);g.lineTo(L*.14,Wd*.3);g.lineTo(-L*.2,Wd*.34);g.closePath();g.fill();   // canopy
    g.fillStyle='rgba(140,210,255,.22)';g.fillRect(-L*.14,-Wd*.28,L*.2,Wd*.12);   // roof highlight
    g.fillStyle='#04080e';g.fillRect(-L*.05,-Wd*.62,L*.1,Wd*.14);g.fillRect(-L*.05,Wd*.48,L*.1,Wd*.14);   // side mirrors / pods
    g.fillStyle='#ffe8b0';g.fillRect(L/2-7,-Wd*.14,4,Wd*.1);g.fillRect(L/2-7,Wd*.04,4,Wd*.1);
    g.fillStyle='#ff2fa8';g.shadowColor='#ff2fa8';g.shadowBlur=5;g.fillRect(-L/2+1,-Wd*.4,3,Wd*.8);g.shadowBlur=0;
    g.setTransform(1,0,0,1,0,0);
    LG.push({x:v?cx:X+BP,y:v?Y+BP:cy,r:BP*1.4,col:p.col,a:.10,f:R()*9})}
  else if(p.t==='kayak'){g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(cx,cy+8,BP*.5,BP*.12,0,0,7);g.fill();g.fillStyle='#ff7a1a';g.beginPath();g.moveTo(cx-BP*.5,cy+2);g.quadraticCurveTo(cx,cy+BP*.3,cx+BP*.5,cy+2);g.quadraticCurveTo(cx,cy-BP*.1,cx-BP*.5,cy+2);g.fill();g.strokeStyle='#ffd23a';g.lineWidth=2;g.stroke();g.strokeStyle='#cfd3d6';g.lineWidth=3;g.beginPath();g.moveTo(cx-BP*.35,cy-BP*.15);g.lineTo(cx+BP*.35,cy+BP*.2);g.stroke()}
  else if(p.t==='fence22'){g.strokeStyle='rgba(180,190,230,.35)';g.lineWidth=1.5;for(let i=0;i<8;i++){g.beginPath();g.moveTo(X+i*8,Y+4);g.lineTo(X+i*8+16,Y+BP-4);g.moveTo(X+BP-i*8,Y+4);g.lineTo(X+BP-i*8-16,Y+BP-4);g.stroke()}g.fillStyle='#050410';g.fillRect(X+2,Y,4,BP);g.fillRect(X+BP-6,Y,4,BP);owNeon(g,'22',cx,cy,BP*.55,'#ff2fa8')}
  else if(p.t==='sign'){sh(BP*.3);g.fillStyle='#050410';g.fillRect(cx-4,Y+BP*.5,8,BP*.34);g.fillStyle='#17122e';g.fillRect(X+6,Y+BP*.1,BP-12,BP*.42);g.strokeStyle='#ffd23a';g.lineWidth=3;g.shadowColor='#ffd23a';g.shadowBlur=8;g.strokeRect(X+6,Y+BP*.1,BP-12,BP*.42);g.shadowBlur=0;g.fillStyle='#ffd23a';g.fillRect(X+14,Y+BP*.22,BP-28,5);g.fillRect(X+14,Y+BP*.34,BP-36,4)}
  g.restore();
}
/* interiors: floor, walls, neon, then furniture */
function owBakeRoom(c,m){
  const g=c.getContext('2d'),d=m.def,R=owRnd(d.title.length*131+7),W=m.w*BP,H=m.h*BP;
  g.fillStyle='#05040c';g.fillRect(0,0,W,H);
  owFloor(g,m,d,R);
  // puddle-like shine on the floor
  for(let i=0;i<10;i++){g.fillStyle=nrgba(d.acc,.06);g.beginPath();g.ellipse((1.5+R()*(m.w-3))*BP,(2.5+R()*(m.h-4))*BP,BP*(.3+R()),BP*.18,0,0,7);g.fill()}
  // back wall, side walls and front wall
  const wg=g.createLinearGradient(0,0,0,2*BP);wg.addColorStop(0,'#07050f');wg.addColorStop(1,d.wall);g.fillStyle=wg;g.fillRect(0,0,W,2*BP);
  for(let x=0;x<W;x+=BP){g.strokeStyle='rgba(255,255,255,.05)';g.beginPath();g.moveTo(x,0);g.lineTo(x,2*BP);g.stroke()}
  g.fillStyle=d.wall;g.fillRect(0,0,BP,H);g.fillRect(W-BP,0,BP,H);g.fillRect(0,H-BP,W,BP);
  g.fillStyle='#07050f';g.fillRect(0,H-BP,W,6);
  g.shadowColor=d.acc;g.shadowBlur=12;g.fillStyle=d.acc;g.fillRect(BP-4,2*BP-3,W-2*BP+8,5);g.fillRect(BP-4,2*BP,4,H-3*BP);g.fillRect(W-BP,2*BP,4,H-3*BP);g.shadowBlur=0;
  owNeon(g,d.title,W/2,BP*.82,Math.min(BP*.62,(W-BP*3)/(d.title.length*.62)),d.acc);
  owNeon(g,d.kan,BP*1.7,BP*.9,BP*.7,d.acc2);owNeon(g,d.kan,W-BP*1.7,BP*.9,BP*.7,d.acc2);
  LG.push({x:W/2,y:BP*.9,r:W*.45,col:d.acc,a:.22,f:1.5});
  // exit mat
  for(const x of m.ex){const X=x*BP,Y=(m.h-1)*BP;g.fillStyle='#04030a';g.fillRect(X,Y,BP,BP);g.fillStyle='#e8c53a';for(let i=0;i<4;i++){g.beginPath();g.moveTo(X+i*16,Y+BP*.7);g.lineTo(X+i*16+8,Y+BP*.7);g.lineTo(X+i*16+2,Y+BP);g.lineTo(X+i*16-6,Y+BP);g.fill()}g.fillStyle='rgba(39,224,255,.18)';g.fillRect(X,Y,BP,BP*.6)}
  LG.push({x:(m.ex[0]+1)*BP,y:(m.h-.6)*BP,r:BP*2.4,col:'#27e0ff',a:.25,f:4});
  if(d.arch){hbArchZones(g,d,BP);hbArchWallDeco(g,d,BP)}
  for(const p of m.props)owBakeRP(g,p,m,R,d);
  if(d.arch&&d.arch.partitions)hbArchPartitions(g,d,BP);
  owRoomMood(g,m,d,R,W,H);
}

/* dark rooms: depth at the walls, 2-3 colored light pools, wall decor and floor clutter per room */
function owRoomMood(g,m,d,R,W,H){
  const id=m.id,B=BP,a1=hexRGB(d.acc),a2=hexRGB(d.acc2||d.acc);
  // 1. darken the floor and add depth along the thick walls
  g.fillStyle='rgba(1,4,10,.38)';g.fillRect(B,2*B,W-2*B,H-3*B);
  for(const [x0,y0,x1,y1,hz] of [[B,2*B,B+B*.9,H-B,0],[W-B-B*.9,2*B,W-B,H-B,0],[B,H-B-B*.9,W-B,H-B,1],[B,2*B,W-B,2*B+B*.9,1]]){
    const gr=hz?g.createLinearGradient(0,y0,0,y1):g.createLinearGradient(x0,0,x1,0);
    const rev=(x0>W/2)||(hz&&y0>H/2);const c0='rgba(0,0,0,.62)',c1='rgba(0,0,0,0)';gr.addColorStop(0,rev?c1:c0);gr.addColorStop(1,rev?c0:c1);g.fillStyle=gr;g.fillRect(x0,y0,x1-x0,y1-y0)}
  g.fillStyle='rgba(255,255,255,.06)';g.fillRect(0,0,B,3);g.fillRect(W-B,0,B,3);   // wall-top highlight
  if(id==='arena'){   // steel-panel walls with neon strips, like the football field's walls
    for(const left of [1,0]){const wx=left?B:W-B-14,col=left?'39,224,255':'255,47,168';
      g.fillStyle='#15112b';g.fillRect(wx,2*B,14,H-3*B);g.fillStyle='#0f0b22';g.fillRect(wx,2*B,14,6);g.fillRect(wx,H-B-6,14,6);
      for(let yy=2*B;yy<H-B;yy+=B*.5){g.fillStyle='rgba(0,0,0,.55)';g.fillRect(wx,yy,14,2);g.fillStyle='rgba(255,255,255,.05)';g.fillRect(wx,yy+2,14,1)}
      g.fillStyle='rgba('+col+',.95)';g.shadowColor='rgb('+col+')';g.shadowBlur=10;g.fillRect(left?wx+11:wx,2*B,3,H-3*B);g.shadowBlur=0;
      g.save();g.globalCompositeOperation='lighter';const sp=g.createLinearGradient(left?wx+14:wx,0,left?wx+14+B*1.3:wx-B*1.3,0);sp.addColorStop(0,'rgba('+col+',.22)');sp.addColorStop(1,'rgba('+col+',0)');g.fillStyle=sp;g.fillRect(left?wx+14:wx-B*1.3,2*B,B*1.3,H-3*B);g.restore()}
  }
  // 2. colored light pools (additive)
  g.save();g.globalCompositeOperation='lighter';
  const pool=(x,y,rx,ry,c,al)=>{g.save();g.translate(x,y);g.scale(1,ry/rx);const gr=g.createRadialGradient(0,0,0,0,0,rx);gr.addColorStop(0,'rgba('+c+','+al+')');gr.addColorStop(.6,'rgba('+c+','+al*.4+')');gr.addColorStop(1,'rgba('+c+',0)');g.fillStyle=gr;g.fillRect(-rx,-rx,rx*2,rx*2);g.restore()};
  pool(W*.28,H*.52,B*3.2,B*2.2,a1,.30);pool(W*.74,H*.45,B*3,B*2,a2,.26);pool(W*.5,H*.86,B*3.6,B*1.2,a1,.16);
  g.restore();
  // 3. cables across the back wall and a few posters (kept subtle on arch-designed rooms)
  if(!d.arch){g.strokeStyle='rgba(2,4,8,.9)';g.lineWidth=3;for(let i=0;i<3;i++){const x0=B+R()*W*.3,x1=W-B-R()*W*.3,y=B*(.35+i*.28);g.beginPath();g.moveTo(x0,y);g.quadraticCurveTo((x0+x1)/2,y+B*(.35+R()*.3),x1,y+B*.05);g.stroke()}}
  const poster=(x,y,w,h,c)=>{g.fillStyle='#07101a';g.fillRect(x-2,y-2,w+4,h+4);g.fillStyle='rgba('+c+',.55)';g.fillRect(x,y,w,h);g.fillStyle='rgba(0,0,0,.35)';for(let k=4;k<h;k+=7)g.fillRect(x,y+k,w,2);g.fillStyle='rgba(255,255,255,.55)';g.fillRect(x+4,y+4,w*.5,3)};
  const ps=[[B*1.15,B*1.2],[W-B*2,B*1.2]];for(const [x,y] of ps)poster(x,y+B*.22,B*.5,B*.5,R()<.5?a1:a2);
  // 4. identity per room
  const glowRect=(x,y,w,h,c)=>{g.save();g.shadowColor='rgb('+c+')';g.shadowBlur=10;g.fillStyle='rgb('+c+')';g.fillRect(x,y,w,h);g.restore()};
  if(id==='pawn'){for(let i=0;i<7;i++){const x=B*2.4+i*(W-B*4.8)/6,len=B*(.2+R()*.25);g.strokeStyle='#07101a';g.lineWidth=2;g.beginPath();g.moveTo(x,0);g.lineTo(x,B*.55+len);g.stroke();g.fillStyle=['#ffb02e','#27e0ff','#ff2fa8','#c8c8d8'][i%4];g.beginPath();g.arc(x,B*.6+len,B*.1+R()*B*.06,0,7);g.fill()}   // hanging goods
    glowRect(B*2,B*4.9,W-B*4,3,'255,122,26');pool(W/2,B*4.9,B*4.5,B*.8,'255,122,26',.22)}   // glowing counter edge
  if(id==='club'){for(let i=0;i<6;i++){const x=B*2+i*(W-B*4)/5;g.fillStyle=['#27e0ff','#9b5cff','#ff2fa8'][i%3];g.beginPath();g.moveTo(x,B*1.15);g.lineTo(x+B*.26,B*1.15);g.lineTo(x+B*.13,B*1.7);g.fill()}   // pennants
    glowRect(B*1.2,B*1.95,B*1.6,3,'255,210,58');glowRect(W-B*2.8,B*1.95,B*1.6,3,'255,210,58')}   // trophy shelves
  if(id==='crew3'){for(let i=0;i<22;i++){g.fillStyle='rgba(255,255,255,'+(.15+R()*.5)+')';g.fillRect(B*1.3+R()*(W-B*2.6),B*1.1+R()*B*.7,2,2)}   // stars through the skyline window
    for(let i=0;i<9;i++){const bx=B*1.4+i*(W-B*2.8)/9,bh=B*(.15+R()*.45);g.fillStyle='rgba(8,18,26,.9)';g.fillRect(bx,B*1.9-bh,B*.28,bh)}}
  if(id==='home'){g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,190,120,.12)';g.beginPath();g.moveTo(B*2.2,B*2);g.lineTo(B*3.8,B*2);g.lineTo(B*5.0,B*4.8);g.lineTo(B*2.8,B*4.8);g.fill();g.restore()}   // window light shaft
  if(id==='pharma'){for(let i=0;i<14;i++){g.fillStyle=['#58ffb0','#27e0ff','#ff9be8'][i%3];g.globalAlpha=.8;g.fillRect(B*1.6+i*(W-B*3.2)/14,B*1.55+(i%2)*B*.2,B*.1,B*.22)}g.globalAlpha=1}   // vial shelves
  // 5. floor clutter (omitted on arch-designed rooms to keep floors crisp & readable)
  if(!d.arch)for(let i=0;i<14;i++){const x=B*1.3+R()*(W-B*2.6),y=B*2.4+R()*(H-B*4),t=R();if(t<.4){g.fillStyle='rgba(200,210,230,.3)';g.fillRect(x,y,5,3)}else if(t<.7){g.fillStyle='rgba(0,0,0,.5)';g.beginPath();g.ellipse(x,y,9,4,0,0,7);g.fill()}else{g.strokeStyle='rgba(2,4,8,.8)';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+14,y+6,x+30,y);g.stroke()}}
  // 6. vignette
  const vg=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.25,W/2,H/2,Math.max(W,H)*.7);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.5)');g.fillStyle=vg;g.fillRect(0,0,W,H);
}
const hexRGB=h=>{const n=parseInt(String(h||'#888888').slice(1),16);return(n>>16&255)+','+(n>>8&255)+','+(n&255)};

function owFloor(g,m,d,R){
  const f=d.fl||'plain',W=m.w,H=m.h,x0=BP,y0=2*BP,x1=(W-1)*BP,y1=(H-1)*BP,aw=x1-x0,ah=y1-y0;
  g.save();g.beginPath();g.rect(x0,y0,aw,ah);g.clip();
  const fill=c=>{g.fillStyle=c;g.fillRect(x0,y0,aw,ah)};
  const line=(c,w,ax,ay,bx,by)=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(ax,ay);g.lineTo(bx,by);g.stroke()};
  const spk=(n,c,s)=>{for(let i=0;i<n;i++){g.fillStyle=c;g.fillRect(x0+R()*aw,y0+R()*ah,s||2,s||2)}};
  const cxm=(x0+x1)/2,cym=(y0+y1)/2;
  if(f==='wood'){            // home: warm long planks and a rug
    fill('#4a2f22');
    for(let y=y0,r=0;y<y1;y+=16,r++){let x=x0-R()*70;while(x<x1){const len=BP*(1.4+R()*2.2),v=R();g.fillStyle=v<.3?'#5d3b29':v<.6?'#53341f':v<.85?'#62402e':'#4b2e1e';g.fillRect(x,y,len-1,15);g.fillStyle='rgba(0,0,0,.32)';g.fillRect(x,y+15,len,1);g.fillRect(x+len-1,y,1,16);g.fillStyle='rgba(255,210,150,.07)';g.fillRect(x+R()*len*.6,y+4+R()*6,len*.3,1);x+=len}}
    if(!d.arch){g.fillStyle='#6b2250';g.fillRect(3*BP,4*BP,4*BP,3*BP);g.strokeStyle='#ffd23a';g.lineWidth=3;g.strokeRect(3*BP+6,4*BP+6,4*BP-12,3*BP-12);g.strokeStyle='rgba(255,47,168,.7)';g.lineWidth=2;g.strokeRect(3*BP+14,4*BP+14,4*BP-28,3*BP-28);
    for(let i=0;i<14;i++)line('rgba(255,210,150,.25)',1,3*BP+10+i*17,4*BP+8,3*BP+10+i*17,4*BP+12)}}
  else if(f==='clinic'){     // pharma: pale clinic tile with a green guide path
    fill('#3b6470');
    for(let x=x0;x<x1;x+=BP)line('rgba(10,30,40,.55)',2,x,y0,x,y1);for(let y=y0;y<y1;y+=BP)line('rgba(10,30,40,.55)',2,x0,y,x1,y);
    for(let y=y0;y<y1;y+=BP)for(let x=x0;x<x1;x+=BP){g.fillStyle='rgba(255,255,255,'+(.05+R()*.07)+')';g.fillRect(x+3,y+3,BP-6,BP-6);g.fillStyle='rgba(255,255,255,.12)';g.fillRect(x+6,y+6,BP*.45,3)}
    g.fillStyle='rgba(88,255,176,.30)';const ex=m.ex[0]*BP;g.fillRect(ex+8,3*BP,6,ah-BP);g.fillRect(ex+2*BP-14,3*BP,6,ah-BP)}
  else if(f==='boards'){     // bar: dark worn vertical boards, spills
    fill('#1b1124');
    for(let x=x0;x<x1;x+=22){const v=R();g.fillStyle=v<.4?'#241632':v<.7?'#1e1329':'#2a1a3a';g.fillRect(x,y0,21,ah);g.fillStyle='rgba(0,0,0,.45)';g.fillRect(x+21,y0,1,ah);for(let k=0;k<3;k++){const yy=y0+R()*ah;g.fillStyle='rgba(0,0,0,.4)';g.fillRect(x,yy,21,1);}}
    for(let i=0;i<18;i++){g.fillStyle='rgba(255,255,255,.05)';g.fillRect(x0+R()*aw,y0+R()*ah,10+R()*26,1+R()*2)}
    for(let i=0;i<5;i++){g.fillStyle=['rgba(155,92,255,.16)','rgba(255,47,168,.14)'][i%2];g.beginPath();g.ellipse(x0+R()*aw,y0+R()*ah,14+R()*18,8+R()*8,R()*3,0,7);g.fill()}}
  else if(f==='circuit'){    // den: raised server-room panels with glowing traces
    fill('#08191a');
    for(let y=y0;y<y1;y+=BP*2)for(let x=x0;x<x1;x+=BP*2){g.fillStyle='#0c2224';g.fillRect(x+3,y+3,BP*2-6,BP*2-6);g.strokeStyle='rgba(88,255,176,.20)';g.lineWidth=1;g.strokeRect(x+3.5,y+3.5,BP*2-7,BP*2-7);for(let k=0;k<4;k++){g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.arc(x+14+(k%2)*(BP*2-28),y+14+(k>>1)*(BP*2-28),2.5,0,7);g.fill()}}
    g.lineWidth=2;for(let i=0;i<14;i++){let x=x0+((R()*W)|0)*BP,y=y0+((R()*(H-3))|0)*BP;g.strokeStyle=i%3?'rgba(88,255,176,.42)':'rgba(39,224,255,.45)';g.beginPath();g.moveTo(x,y);for(let s=0;s<3;s++){x+=((R()<.5?-1:1)*BP*(1+(R()*2|0)));g.lineTo(x,y);y+=BP*(1+(R()*2|0));g.lineTo(x,y)}g.stroke();g.fillStyle=g.strokeStyle;g.beginPath();g.arc(x,y,4,0,7);g.fill()}}
  else if(f==='carpet'){     // arcade: loud patterned carpet
    fill('#0b0818');
    const cols=['rgba(39,224,255,.16)','rgba(255,47,168,.16)','rgba(255,210,58,.12)','rgba(88,255,176,.12)'];
    for(let y=y0,r=0;y<y1;y+=30,r++)for(let x=x0+(r%2)*22;x<x1;x+=44){const c=cols[((x/44|0)+r*2)%4];g.fillStyle=c;const t=(((x/44|0)+r)%3);
      if(t===0){g.beginPath();g.moveTo(x+11,y+4);g.lineTo(x+18,y+15);g.lineTo(x+11,y+26);g.lineTo(x+4,y+15);g.closePath();g.fill()}
      else if(t===1){g.beginPath();g.arc(x+11,y+15,6,0,7);g.fill()}
      else{g.strokeStyle=c;g.lineWidth=3;g.beginPath();g.moveTo(x+2,y+20);g.lineTo(x+9,y+9);g.lineTo(x+16,y+20);g.lineTo(x+22,y+9);g.stroke()}}
    g.strokeStyle='rgba(255,210,58,.7)';g.shadowColor='#ffd23a';g.shadowBlur=8;g.lineWidth=3;g.strokeRect(x0+8,y0+8,aw-16,ah-16);g.shadowBlur=0}
  else if(f==='concrete'){   // pawn: poured slabs, cracks, oil stains
    fill('#3a352f');
    for(let y=y0;y<y1;y+=BP*3)for(let x=x0;x<x1;x+=BP*3){g.fillStyle='rgba('+(R()<.5?'255,235,200':'0,0,0')+','+(.03+R()*.05)+')';g.fillRect(x,y,BP*3,BP*3)}
    for(let x=x0;x<x1;x+=BP*3)line('rgba(0,0,0,.55)',3,x,y0,x,y1);for(let y=y0;y<y1;y+=BP*3)line('rgba(0,0,0,.55)',3,x0,y,x1,y);
    for(let i=0;i<6;i++){g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(x0+R()*aw,y0+R()*ah,10+R()*16,6+R()*8,R()*3,0,7);g.fill()}
    for(let i=0;i<5;i++){let x=x0+R()*aw,y=y0+R()*ah;g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=1.5;g.beginPath();g.moveTo(x,y);for(let s=0;s<5;s++){x+=(R()-.4)*18;y+=(R()-.3)*14;g.lineTo(x,y)}g.stroke()}
    spk(110,'rgba(255,255,255,.07)');g.fillStyle='rgba(255,122,26,.18)';g.fillRect(x0,y1-10,aw,4)}
  else if(f==='rubber'){     // club: gym rubber mat with painted lines
    fill('#252b34');
    for(let y=y0;y<y1;y+=6)line('rgba(0,0,0,.22)',1,x0,y,x1,y);spk(160,'rgba(255,255,255,.06)');
    g.strokeStyle='rgba(255,210,58,.7)';g.lineWidth=3;g.strokeRect(x0+12,y0+12,aw-24,ah-24);
    g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=2;g.beginPath();g.arc(cxm,cym+BP*.3,BP*1.3,0,7);g.stroke();line('rgba(255,255,255,.35)',2,cxm,y0+12,cxm,y1-12);
    g.fillStyle='rgba(39,224,255,.18)';g.beginPath();g.arc(cxm,cym+BP*.3,BP*.5,0,7);g.fill()}
  else if(f==='glitch'){     // crew1: hex mesh with corrupted data bars
    fill('#150b27');
    const hs=22,hh=hs*.866;for(let row=0,y=y0;y<y1+hh;y+=hh,row++)for(let x=x0+(row%2)*hs*.75;x<x1+hs;x+=hs*1.5){g.strokeStyle='rgba(155,92,255,.26)';g.lineWidth=1;g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;g.lineTo(x+Math.cos(a)*hs*.5,y+Math.sin(a)*hs*.5)}g.closePath();g.stroke()}
    for(let i=0;i<22;i++){const r=R();g.fillStyle=r<.45?'rgba(255,47,168,.22)':r<.8?'rgba(39,224,255,.20)':'rgba(255,255,255,.12)';g.fillRect(x0+R()*aw,y0+R()*ah,BP*(.5+R()*1.4),3+R()*7)}
    g.fillStyle='rgba(255,47,168,.20)';for(const px of [cxm-BP*.8,cxm+BP*.8]){g.beginPath();g.arc(px,cym+BP*.5,10,0,7);g.fill()}g.beginPath();g.ellipse(cxm,cym+BP*.85,16,12,0,0,7);g.fill()}
  else if(f==='plate'){      // crew2: scrap-metal diamond plate, rust, hazard edge
    fill('#34291b');
    for(let y=y0,r=0;y<y1;y+=14,r++)for(let x=x0+(r%2)*9;x<x1;x+=18){g.fillStyle='rgba(255,220,160,.12)';g.beginPath();g.moveTo(x+4,y+1);g.lineTo(x+9,y+7);g.lineTo(x+4,y+13);g.lineTo(x-1,y+7);g.closePath();g.fill()}
    for(let x=x0;x<x1;x+=BP*2)line('rgba(0,0,0,.6)',3,x,y0,x,y1);for(let y=y0;y<y1;y+=BP*2)line('rgba(0,0,0,.6)',3,x0,y,x1,y);
    for(let i=0;i<9;i++){g.fillStyle='rgba(190,80,20,'+(.15+R()*.15)+')';g.beginPath();g.ellipse(x0+R()*aw,y0+R()*ah,12+R()*22,8+R()*12,R()*3,0,7);g.fill()}
    for(let x=x0;x<x1;x+=28){g.fillStyle='#e8b020';g.beginPath();g.moveTo(x,y1-9);g.lineTo(x+14,y1-9);g.lineTo(x+8,y1);g.lineTo(x-6,y1);g.fill()}}
  else if(f==='seam'){       // crew3: rooftop standing-seam metal, skylight glints, puddles
    fill('#15302f');
    for(let x=x0;x<x1;x+=26){g.fillStyle='rgba(255,255,255,.05)';g.fillRect(x,y0,12,ah);line('rgba(0,0,0,.5)',2,x,y0,x,y1);line('rgba(159,246,255,.22)',1,x+2,y0,x+2,y1)}
    for(let y=y0+BP*2;y<y1;y+=BP*3)line('rgba(0,0,0,.45)',3,x0,y,x1,y);
    for(let i=0;i<6;i++){g.fillStyle='rgba(39,224,255,.16)';g.beginPath();g.ellipse(x0+R()*aw,y0+R()*ah,18+R()*26,7+R()*8,0,0,7);g.fill()}
    for(let x=x0+13;x<x1;x+=BP*2)for(let y=y0+BP*3;y<y1;y+=BP*3){g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.arc(x,y,2.5,0,7);g.fill()}}
  else if(f==='court'){      // arena: the same blue-steel turf, yard lines, end zones and boundary as the football field
    const tw=BP;
    for(let x=x0,i=0;x<x1;x+=tw,i++){g.fillStyle=i%2?'#1d3348':'#17283a';g.fillRect(x,y0,tw,ah)}
    for(let i=0;i<260;i++){g.fillStyle=R()<.5?'rgba(160,210,255,.05)':'rgba(0,0,0,.12)';g.fillRect(x0+R()*aw,y0+R()*ah,2+R()*4,1+R()*2)}
    const ez=BP*1.5;g.fillStyle='rgba(255,47,168,.34)';g.fillRect(x0,y0,ez,ah);g.fillStyle='rgba(39,224,255,.30)';g.fillRect(x1-ez,y0,ez,ah);
    for(let k=0;k<2;k++){const ex=k?x1-ez:x0;g.save();g.globalAlpha=.16;g.fillStyle='#fff';for(let yy=y0+4;yy<y1;yy+=BP*.5)g.fillRect(ex,yy,ez,2);g.restore()}
    g.strokeStyle='rgba(235,245,255,.55)';g.lineWidth=2;for(let x=x0+ez;x<=x1-ez+1;x+=BP){g.beginPath();g.moveTo(x,y0+12);g.lineTo(x,y1-12);g.stroke()}   // yard lines
    g.strokeStyle='rgba(235,245,255,.45)';g.lineWidth=2;for(let x=x0+ez+BP/2;x<x1-ez;x+=BP){for(const hy of [y0+ah*.38,y0+ah*.62]){g.beginPath();g.moveTo(x,hy-5);g.lineTo(x,hy+5);g.stroke()}}   // hash marks
    g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=3;g.beginPath();g.moveTo(cxm,y0+12);g.lineTo(cxm,y1-12);g.stroke();   // midfield
    g.fillStyle='rgba(255,79,216,.85)';g.shadowColor='#ff2fa8';g.shadowBlur=10;g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?BP*.2:BP*.5;g.lineTo(cxm+Math.cos(a)*rr,cym+Math.sin(a)*rr)}g.closePath();g.fill();g.shadowBlur=0;
    g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=4;g.strokeRect(x0+8,y0+8,aw-16,ah-16);   // boundary
    g.strokeStyle='rgba(39,224,255,.45)';g.lineWidth=2;g.shadowColor='#27e0ff';g.shadowBlur=8;g.strokeRect(x0+2,y0+2,aw-4,ah-4);g.shadowBlur=0;
    }
  else{fill(d.floor)}
  g.restore();
}
function owBakeRP2(g,p,m,R,d){
  const X=p.x*BP,Y=p.y*BP,w=(p.w||1)*BP,h=(p.h||1)*BP,cx=X+w/2,cy=Y+h/2,a=d.acc,a2=d.acc2||d.acc,t=p.t;
  const sh=ww=>{g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(cx,Y+h-BP*.1,ww||w*.4,BP*.1,0,0,7);g.fill()};
  const box=(c,x,y,ww,hh)=>{g.fillStyle=c;g.fillRect(x,y,ww,hh)};
  const glow=(c,s)=>{g.shadowColor=c;g.shadowBlur=s||10;g.fillStyle=c};
  if(t==='none')return;
  if(t==='pot'){sh();box('#2a2440',X+10,Y+BP*.36,BP-20,BP*.5);box('#6a6a80',X+8,Y+BP*.3,BP-16,BP*.12);box('#e8c8a0',X+14,Y+BP*.34,BP-28,BP*.08);VT.push({x:cx,y:Y+BP*.3,r:1});LG.push({x:cx,y:cy,r:BP*1.2,col:'#ff7a1a',a:.2,f:R()*9})}
  else if(t==='booth'){sh();box('#5a1a3a',X+2,Y+BP*.3,BP-4,BP*.55);box('#8a2a5a',X+2,Y+BP*.3,BP-4,BP*.12);box('#3a2f58',X+10,Y+BP*.5,BP-20,BP*.2);glow(a,6);g.fillRect(X+10,Y+BP*.5,BP-20,2);g.shadowBlur=0}
  else if(t==='lantern'){g.strokeStyle='#050410';g.lineWidth=2;g.beginPath();g.moveTo(cx,Y);g.lineTo(cx,Y+BP*.3);g.stroke();glow('#ff3b5c',16);g.beginPath();g.ellipse(cx,Y+BP*.55,BP*.2,BP*.26,0,0,7);g.fill();g.shadowBlur=0;box('#ffe8b0',cx-3,Y+BP*.45,6,BP*.2);LG.push({x:cx,y:Y+BP*.6,r:BP*1.8,col:'#ff3b5c',a:.3,f:R()*9})}
  else if(t==='rug'){g.fillStyle='rgba(255,47,168,.18)';g.fillRect(X+6,Y+6,w-12,h-12)}
  else if(t==='fridge'){sh();box('#cfe9f0',X+6,Y+BP*.04,BP-12,BP*.92);box('rgba(39,224,255,.35)',X+10,Y+BP*.1,BP-20,BP*.8);g.strokeStyle='#05303a';g.lineWidth=2;g.strokeRect(X+6,Y+BP*.04,BP-12,BP*.92);for(let i=1;i<4;i++)box('#05303a',X+10,Y+BP*.1+i*BP*.2,BP-20,2);LG.push({x:cx,y:cy,r:BP*1.2,col:'#27e0ff',a:.2,f:R()*9})}
  else if(t==='chair'){sh(BP*.3);box('#2fe0a8',X+14,Y+BP*.4,BP-28,BP*.22);box('#1a7a5a',X+14,Y+BP*.2,BP-28,BP*.2);box('#06050f',X+16,Y+BP*.62,5,BP*.2);box('#06050f',X+BP-21,Y+BP*.62,5,BP*.2)}
  else if(t==='scale'){sh(BP*.3);box('#e8f0f4',X+10,Y+BP*.55,BP-20,BP*.25);box('#27e0ff',X+BP/2-6,Y+BP*.6,12,4)}
  else if(t==='xsign'){for(let i=0;i<3;i++){}glow('#58ffb0',18);const cx2=X+w/2,cy2=Y+BP*.5;g.fillRect(cx2-5,cy2-16,10,32);g.fillRect(cx2-16,cy2-5,32,10);g.shadowBlur=0;LG.push({x:cx2,y:cy2,r:BP*2,col:'#58ffb0',a:.3,f:R()*9})}
  else if(t==='bottles'){box('#1a1030',X,Y+BP*.1,BP,BP*.9);for(let r=0;r<2;r++){box('#07050f',X+2,Y+BP*.46+r*BP*.4,BP-4,3);for(let i=0;i<4;i++){g.fillStyle=[a,a2,'#58ffb0','#ffd23a'][(i+p.x+r)%4];g.globalAlpha=.9;g.fillRect(X+6+i*14,Y+BP*.14+r*BP*.4,8,BP*.28);g.fillRect(X+8+i*14,Y+BP*.08+r*BP*.4,4,BP*.08);g.globalAlpha=1}}LG.push({x:cx,y:cy,r:BP*1.1,col:a,a:.2,f:R()*9})}
  else if(t==='dj'){sh();box('#1c1534',X+4,Y+BP*.2,BP-8,BP*.7);glow(a2,10);g.beginPath();g.arc(cx,cy,BP*.24,0,7);g.fill();g.shadowBlur=0;g.fillStyle='#050410';g.beginPath();g.arc(cx,cy,BP*.08,0,7);g.fill();LG.push({x:cx,y:cy,r:BP*1.4,col:a2,a:.3,f:R()*9})}
  else if(t==='dancefloor'){for(let i=0;i<p.w;i++)for(let j=0;j<p.h;j++){g.fillStyle=['rgba(255,47,168,.32)','rgba(39,224,255,.30)','rgba(155,92,255,.32)','rgba(255,210,58,.26)'][(i*3+j*5+R()*2|0)%4];g.fillRect(X+i*BP+3,Y+j*BP+3,BP-6,BP-6)}LG.push({x:cx,y:cy,r:BP*3.2,col:a2,a:.28,f:R()*9},{x:cx,y:cy,r:BP*2,col:a,a:.2,f:R()*9+3})}
  else if(t==='holo'){sh(w*.45);box('#16102a',X+6,Y+BP*.5,w-12,BP*.4);glow(a,12);g.globalAlpha=.55;g.beginPath();g.ellipse(cx,Y+BP*.4,w*.34,BP*.16,0,0,7);g.fill();g.fillRect(cx-3,Y+BP*.05,6,BP*.3);g.globalAlpha=1;g.shadowBlur=0;LG.push({x:cx,y:Y+BP*.4,r:BP*2.2,col:a,a:.3,f:R()*9})}
  else if(t==='monwall'){for(let i=0;i<p.w;i++){const cc=[a,a2,'#ff3b5c','#ffd23a'][i%4];box('#0a0f12',X+i*BP+4,Y+BP*.12,BP-8,BP*.7);glow(cc,6);g.globalAlpha=.7;g.fillRect(X+i*BP+8,Y+BP*.2,BP-16,BP*.5);g.globalAlpha=1;g.shadowBlur=0;LG.push({x:X+i*BP+BP/2,y:Y+BP*.5,r:BP*1.1,col:cc,a:.12,f:R()*9})}}
  else if(t==='bed'){sh(w*.45);box('#2a2040',X+2,Y+BP*.2,w-4,BP*.7);box('#e8e0f0',X+6,Y+BP*.28,BP*.5,BP*.3);box('#5a3a8a',X+BP*.6,Y+BP*.26,w-BP*.6-6,BP*.62);box('#7a5aaa',X+BP*.6,Y+BP*.26,w-BP*.6-6,BP*.12);g.strokeStyle='#05040c';g.lineWidth=3;g.strokeRect(X+2,Y+BP*.2,w-4,BP*.7)}
  else if(t==='window'){box('#05040c',X+6,Y+BP*.08,w-12,BP*.84);const gr=g.createLinearGradient(0,Y,0,Y+BP);gr.addColorStop(0,'#2a0f4a');gr.addColorStop(1,'#ff2fa8');g.fillStyle=gr;g.globalAlpha=.55;g.fillRect(X+10,Y+BP*.14,w-20,BP*.72);g.globalAlpha=1;g.strokeStyle='rgba(170,200,255,.5)';g.lineWidth=1.5;for(let i=0;i<14;i++){const x=X+14+R()*(w-28),y=Y+BP*.18+R()*BP*.5;g.beginPath();g.moveTo(x,y);g.lineTo(x-3,y+12);g.stroke()}g.strokeStyle='#ffd23a';g.lineWidth=3;g.strokeRect(X+6,Y+BP*.08,w-12,BP*.84);g.beginPath();g.moveTo(cx,Y+BP*.08);g.lineTo(cx,Y+BP*.92);g.stroke();LG.push({x:cx,y:cy,r:BP*2,col:'#ff2fa8',a:.28,f:R()*9})}
  else if(t==='photo'){sh(BP*.3);box('#2a2040',X+14,Y+BP*.3,BP-28,BP*.6);box('#e8d5a8',X+18,Y+BP*.36,BP-36,BP*.42);g.fillStyle='#c8102e';g.fillRect(cx-10,Y+BP*.5,8,10);g.fillStyle='#2f6bff';g.fillRect(cx+2,Y+BP*.58,6,8)}
  else if(t==='jerseyframe'){box('#050410',X+10,Y+BP*.08,BP-20,BP*.84);g.strokeStyle='#ffd23a';g.lineWidth=3;g.strokeRect(X+10,Y+BP*.08,BP-20,BP*.84);g.fillStyle='#e4572e';g.beginPath();g.moveTo(X+18,Y+BP*.2);g.lineTo(X+BP-18,Y+BP*.2);g.lineTo(X+BP-14,Y+BP*.4);g.lineTo(X+BP-20,Y+BP*.42);g.lineTo(X+BP-20,Y+BP*.82);g.lineTo(X+20,Y+BP*.82);g.lineTo(X+20,Y+BP*.42);g.lineTo(X+14,Y+BP*.4);g.fill();owNeon(g,'7',cx,Y+BP*.58,BP*.3,'#fff')}
  else if(t==='desk'){sh(w*.45);box('#3a2f58',X+2,Y+BP*.45,w-4,BP*.15);box('#1c1534',X+8,Y+BP*.6,6,BP*.3);box('#1c1534',X+w-14,Y+BP*.6,6,BP*.3);box('#0a1a14',X+14,Y+BP*.12,BP*.7,BP*.4);glow(a,8);g.globalAlpha=.7;for(let i=0;i<3;i++)g.fillRect(X+20,Y+BP*.2+i*8,BP*.4,3);g.globalAlpha=1;g.shadowBlur=0;LG.push({x:X+BP*.5,y:Y+BP*.3,r:BP*1.2,col:a,a:.18,f:R()*9})}
  else if(t==='ball'){sh(BP*.28);g.fillStyle='#8b4a1f';g.beginPath();g.ellipse(cx,cy+8,BP*.26,BP*.16,.3,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(cx-8,cy+6);g.lineTo(cx+8,cy+10);g.stroke()}
  else if(t==='cables'){g.strokeStyle='rgba(88,255,176,.35)';g.lineWidth=3;for(let i=0;i<4;i++){g.beginPath();g.moveTo(X+R()*w,Y);g.bezierCurveTo(X+R()*w,Y+h*.3,X+R()*w,Y+h*.6,X+R()*w,Y+h);g.stroke()}}
  else if(t==='pinball'){sh();box('#1c1534',X+6,Y+BP*.2,BP-12,BP*.7);glow(a,10);g.fillRect(X+10,Y+BP*.26,BP-20,BP*.4);g.shadowBlur=0;g.fillStyle='#ff4fd8';g.beginPath();g.arc(cx,Y+BP*.4,5,0,7);g.fill();LG.push({x:cx,y:cy,r:BP*1.1,col:a,a:.2,f:R()*9})}
  else if(t==='claw'){sh();box('rgba(159,246,255,.2)',X+6,Y+BP*.06,BP-12,BP*.7);box('#ff2fa8',X+6,Y+BP*.72,BP-12,BP*.22);g.strokeStyle=a;g.lineWidth=2;g.strokeRect(X+6,Y+BP*.06,BP-12,BP*.7);g.fillStyle='#ffd23a';for(let i=0;i<3;i++){g.beginPath();g.arc(X+16+i*14,Y+BP*.62,6,0,7);g.fill()}box('#cfd3d6',cx-1,Y+BP*.1,2,BP*.2);LG.push({x:cx,y:cy,r:BP*1.2,col:'#ff2fa8',a:.2,f:R()*9})}
  else if(t==='ticket'){for(let i=0;i<p.w;i++){g.fillStyle=[a,a2,'#58ffb0'][i%3];g.globalAlpha=.7;g.fillRect(X+i*BP+6,Y+BP*.2,BP-12,6);g.globalAlpha=1}owNeon(g,'GAMES',X+w/2,Y+BP*.65,BP*.3,a)}
  else if(t==='cage'){g.fillStyle='rgba(0,0,0,.4)';g.fillRect(X,Y+BP*.8,BP,BP*.14);box('#2a2040',X,Y+BP*.5,BP,BP*.34);g.strokeStyle='#8a7a6a';g.lineWidth=2;for(let i=0;i<7;i++){g.beginPath();g.moveTo(X+i*10+4,Y+BP*.5);g.lineTo(X+i*10+4,Y+BP*.05);g.stroke()}g.beginPath();g.moveTo(X,Y+BP*.05);g.lineTo(X+BP,Y+BP*.05);g.stroke();box(a,X,Y+BP*.78,BP,4)}
  else if(t==='safe'){sh();box('#3a3a48',X+3,Y+BP*.06,BP-6,BP*.9);g.strokeStyle='#8a8a9a';g.lineWidth=3;g.strokeRect(X+3,Y+BP*.06,BP-6,BP*.9);box('#ffd23a',cx-2,cy-12,4,24);g.fillStyle='#ffd23a';g.beginPath();g.arc(cx,cy,8,0,7);g.fill();g.fillStyle='#3a3a48';g.beginPath();g.arc(cx,cy,4,0,7);g.fill()}
  else if(t==='hang'){g.strokeStyle='#050410';g.lineWidth=2;g.beginPath();g.moveTo(cx,Y);g.lineTo(cx,Y+BP*.35);g.stroke();const k=(p.x/2|0)%3;if(k===0){g.fillStyle='#e0a040';g.beginPath();g.ellipse(cx,Y+BP*.65,BP*.2,BP*.3,0,0,7);g.fill();box('#3a2a10',cx-2,Y+BP*.2,4,BP*.3)}else if(k===1){g.fillStyle='#c8102e';g.fillRect(cx-14,Y+BP*.35,28,BP*.5);g.fillStyle='#fff';g.fillRect(cx-8,Y+BP*.5,16,5)}else{glow('#27e0ff',8);g.fillRect(cx-12,Y+BP*.4,24,BP*.4);g.shadowBlur=0}}
  else if(t==='weights'){sh();box('#2a2a38',X+4,Y+BP*.55,BP-8,BP*.12);for(const dx of [-.34,.34]){box('#0a0a12',cx+BP*dx-5,Y+BP*.32,10,BP*.58);box('#e8e8f0',cx+BP*dx-3,Y+BP*.4,6,BP*.42)}box('#8a8a9a',X+4,Y+BP*.58,BP-8,3)}
  else if(t==='board'){box('#0a1a14',X+6,Y+BP*.12,w-12,BP*.76);g.strokeStyle=a;g.lineWidth=3;g.shadowColor=a;g.shadowBlur=8;g.strokeRect(X+6,Y+BP*.12,w-12,BP*.76);g.shadowBlur=0;g.strokeStyle='#fff';g.lineWidth=2;for(let i=0;i<4;i++){g.beginPath();g.arc(X+20+i*28,Y+BP*.4,5,0,7);g.stroke()}g.strokeStyle='#ffd23a';g.beginPath();g.moveTo(X+20,Y+BP*.65);g.quadraticCurveTo(X+60,Y+BP*.2,X+w-20,Y+BP*.6);g.stroke()}
  else if(t==='catstatue'){sh();box('#2a2048',X+12,Y+BP*.62,BP-24,BP*.3);g.fillStyle=a;g.shadowColor=a;g.shadowBlur=14;g.beginPath();g.ellipse(cx,Y+BP*.5,BP*.22,BP*.28,0,0,7);g.fill();g.beginPath();g.moveTo(cx-14,Y+BP*.28);g.lineTo(cx-8,Y+BP*.08);g.lineTo(cx-2,Y+BP*.26);g.fill();g.beginPath();g.moveTo(cx+14,Y+BP*.28);g.lineTo(cx+8,Y+BP*.08);g.lineTo(cx+2,Y+BP*.26);g.fill();g.shadowBlur=0;LG.push({x:cx,y:cy,r:BP*1.5,col:a,a:.3,f:R()*9})}
  else if(t==='couch'){sh();box('#4a1a5a',X+2,Y+BP*.3,BP-4,BP*.55);box('#6a2a7a',X+2,Y+BP*.3,BP-4,BP*.16);box('#2a0a3a',X+2,Y+BP*.78,BP-4,BP*.08)}
  else if(t==='tvstand'){sh(w*.45);box('#1c1534',X+4,Y+BP*.5,w-8,BP*.4);box('#050410',X+10,Y+BP*.06,w-20,BP*.52);glow(a2,10);g.globalAlpha=.55;g.fillRect(X+14,Y+BP*.12,w-28,BP*.4);g.globalAlpha=1;g.shadowBlur=0;LG.push({x:cx,y:cy,r:BP*2,col:a2,a:.3,f:R()*9})}
  else if(t==='tv'){for(let i=0;i<p.w;i++){const cc=[a,a2,'#27e0ff','#ffd23a'][i%4];box('#0a0818',X+i*BP+4,Y+BP*.12,BP-8,BP*.72);glow(cc,8);g.globalAlpha=.6;g.fillRect(X+i*BP+8,Y+BP*.2,BP-16,BP*.56);g.globalAlpha=1;g.shadowBlur=0;owNeon(g,'\u732b',X+i*BP+BP/2,Y+BP*.5,BP*.34,'#fff')}}
  else if(t==='speaker'){sh();box('#16102a',X+10,Y+BP*.1,BP-20,BP*.84);g.strokeStyle=a;g.lineWidth=2;for(const yy of [.32,.68]){g.beginPath();g.arc(cx,Y+BP*yy,BP*.16,0,7);g.stroke()}}
  else if(t==='tires'){sh();for(let i=0;i<3;i++){g.fillStyle='#14110f';g.beginPath();g.ellipse(cx,Y+BP*(.75-i*.2),BP*.34,BP*.16,0,0,7);g.fill();g.strokeStyle='#3a3a42';g.lineWidth=2;g.stroke()}}
  else if(t==='barrel'){sh();box('#4a3a2a',X+12,Y+BP*.32,BP-24,BP*.58);box('#2a1a0a',X+12,Y+BP*.45,BP-24,3);box('#2a1a0a',X+12,Y+BP*.7,BP-24,3);glow('#ff7a1a',20);g.beginPath();g.moveTo(cx-10,Y+BP*.32);g.quadraticCurveTo(cx-6,Y+BP*.05,cx,Y+BP*.1);g.quadraticCurveTo(cx+4,Y+BP*.04,cx+10,Y+BP*.32);g.fill();g.shadowBlur=0;g.fillStyle='#ffd23a';g.beginPath();g.ellipse(cx,Y+BP*.28,6,BP*.1,0,0,7);g.fill();LG.push({x:cx,y:Y+BP*.3,r:BP*2.6,col:'#ff7a1a',a:.4,f:R()*9})}
  else if(t==='throne'){sh(w*.45);box('#3a2a18',X+8,Y+BP*.55,w-16,BP*.4);box('#5a3a1a',X+14,Y,w-28,BP*.62);g.strokeStyle='#f2b632';g.lineWidth=3;g.strokeRect(X+14,Y,w-28,BP*.62);g.fillStyle='#f2b632';for(let i=0;i<3;i++){g.beginPath();g.moveTo(X+20+i*30,Y);g.lineTo(X+30+i*30,-6+Y);g.lineTo(X+40+i*30,Y);g.fill()}}
  else if(t==='chains'){g.strokeStyle='#8a8a9a';g.lineWidth=3;for(let i=0;i<p.w;i++){const x=X+i*BP+BP/2;for(let y=Y;y<Y+BP*.9;y+=10){g.beginPath();g.ellipse(x,y+4,3,5,0,0,7);g.stroke()}}}
  else if(t==='planter'){sh();box('#2a3a2e',X+8,Y+BP*.5,BP-16,BP*.4);glow('#2fe0a8',10);for(let i=0;i<5;i++){g.beginPath();g.ellipse(cx+(i-2)*8,Y+BP*.36-Math.abs(i-2)*3,BP*.08,BP*.26,(i-2)*.3,0,7);g.fill()}g.shadowBlur=0}
  else if(t==='lounge'){sh();box('#0a4a4a',X+2,Y+BP*.45,BP-4,BP*.4);box('#2fe0a8',X+2,Y+BP*.4,BP-4,BP*.12);box('#05303a',X+4,Y+BP*.78,6,BP*.14);box('#05303a',X+BP-10,Y+BP*.78,6,BP*.14)}
  else if(t==='maptable'){sh(w*.45);box('#16342f',X+4,Y+BP*.3,w-8,BP*.5);g.strokeStyle=a;g.lineWidth=2;g.strokeRect(X+8,Y+BP*.36,w-16,BP*.36);g.beginPath();g.moveTo(X+14,Y+BP*.6);g.lineTo(X+40,Y+BP*.45);g.lineTo(X+70,Y+BP*.62);g.lineTo(X+w-14,Y+BP*.42);g.stroke();g.fillStyle='#ffd23a';g.beginPath();g.arc(X+40,Y+BP*.45,4,0,7);g.fill()}
  else if(t==='skyline'){let x=X;g.fillStyle='#050816';while(x<X+w){const bw=14+R()*20,bh=BP*(.35+R()*.55);g.fillRect(x,Y+BP-bh,bw,bh);g.fillStyle='rgba(255,210,150,.7)';for(let q=0;q<4;q++)if(R()<.5)g.fillRect(x+3+R()*(bw-8),Y+BP-bh+4+R()*(bh-8),3,3);g.fillStyle='#050816';x+=bw+2}glow('#ffd9a0',16);g.beginPath();g.arc(X+w*.8,Y+BP*.28,9,0,7);g.fill();g.shadowBlur=0;LG.push({x:cx,y:cy,r:w*.4,col:a,a:.2,f:2})}
  else if(t==='stringlights'){g.strokeStyle='#050410';g.lineWidth=2;g.beginPath();g.moveTo(X,Y+4);g.quadraticCurveTo(cx,Y+BP*.6,X+w,Y+4);g.stroke();for(let i=0;i<=8;i++){const u=i/8,x=X+w*u,y=Y+4+Math.sin(u*Math.PI)*BP*.28;glow([a,a2,'#ffd23a'][i%3],10);g.beginPath();g.arc(x,y+4,4,0,7);g.fill();g.shadowBlur=0;if(i%2===0)LG.push({x,y:y+8,r:BP*.9,col:[a,a2,'#ffd23a'][i%3],a:.22,f:R()*9})}}
  else if(t==='turnstile'){sh();box('#2a2448',X+14,Y+BP*.2,BP-28,BP*.7);g.fillStyle=a;g.fillRect(X+4,Y+BP*.42,BP-8,5);g.fillStyle=a2;g.fillRect(cx-3,Y+BP*.34,6,BP*.2);glow('#58ffb0',8);g.fillRect(X+16,Y+BP*.24,8,4);g.shadowBlur=0}
  else if(t==='banner'){box('#050410',cx-2,Y,4,6);box(a,X+10,Y+4,BP-20,BP*.8);g.fillStyle=a2;g.beginPath();g.moveTo(X+10,Y+BP*.84);g.lineTo(cx,Y+BP*.65);g.lineTo(X+BP-10,Y+BP*.84);g.fill();owNeon(g,'NET',cx,Y+BP*.34,BP*.26,'#fff')}
  else if(t==='bigscreen'){box('#050410',X+6,Y+BP*.1,w-12,BP*.8);const gr=g.createLinearGradient(0,Y,0,Y+BP);gr.addColorStop(0,'#0c4a2a');gr.addColorStop(1,'#10351f');g.fillStyle=gr;g.fillRect(X+14,Y+BP*.18,w-28,BP*.64);g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;for(let i=1;i<8;i++){g.beginPath();g.moveTo(X+14+(w-28)*i/8,Y+BP*.18);g.lineTo(X+14+(w-28)*i/8,Y+BP*.82);g.stroke()}g.strokeStyle=a;g.lineWidth=3;g.shadowColor=a;g.shadowBlur=12;g.strokeRect(X+6,Y+BP*.1,w-12,BP*.8);g.shadowBlur=0;LG.push({x:cx,y:cy,r:w*.5,col:'#58ffb0',a:.22,f:R()*9})}
  else if(t==='tunnel'){g.fillStyle='#02010a';g.beginPath();g.moveTo(X,Y+h);g.lineTo(X,Y+BP*.35);g.quadraticCurveTo(cx,Y-BP*.2,X+w,Y+BP*.35);g.lineTo(X+w,Y+h);g.fill();g.strokeStyle=a2;g.lineWidth=3;g.shadowColor=a2;g.shadowBlur=12;g.stroke();g.shadowBlur=0}
}
function owBakeRP(g,p,m,R,d){
  const X=p.x*BP,Y=p.y*BP,cx=X+BP/2,cy=Y+BP/2,a=d.acc,a2=d.acc2||d.acc;
  g.save();
  const sh=w=>{g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(cx,cy+BP*.38,w||BP*.36,BP*.1,0,0,7);g.fill()};
  const t=p.t;
  if(t==='counter'){g.fillStyle='rgba(0,0,0,.4)';g.fillRect(X,Y+BP*.78,BP,BP*.14);g.fillStyle='#2a2040';g.fillRect(X,Y+BP*.28,BP,BP*.54);g.fillStyle='#463a68';g.fillRect(X,Y+BP*.18,BP,BP*.16);g.fillStyle=a;g.shadowColor=a;g.shadowBlur=8;g.fillRect(X,Y+BP*.7,BP,5);g.shadowBlur=0}
  else if(t==='stool'){sh(BP*.26);g.fillStyle='#06050f';g.fillRect(cx-3,cy,6,BP*.34);g.fillStyle=a2;g.beginPath();g.ellipse(cx,cy-2,BP*.26,BP*.13,0,0,7);g.fill();g.strokeStyle='#06050f';g.lineWidth=2;g.stroke()}
  else if(t==='table'){g.fillStyle='rgba(0,0,0,.4)';g.fillRect(X+2,Y+BP*.72,BP-4,BP*.16);g.fillStyle='#3a2f58';g.fillRect(X,Y+BP*.26,BP,BP*.4);g.fillStyle='#1a1430';g.fillRect(X,Y+BP*.6,BP,BP*.08);g.fillStyle=a;g.fillRect(X+8,Y+BP*.3,BP-16,3)}
  else if(t==='plant'){sh(BP*.28);g.fillStyle='#2a2040';g.fillRect(cx-BP*.2,cy+BP*.08,BP*.4,BP*.28);g.fillStyle='#2fe0a8';g.shadowColor='#2fe0a8';g.shadowBlur=10;for(let i=0;i<5;i++){g.beginPath();g.ellipse(cx+(i-2)*8,cy-BP*.05-Math.abs(i-2)*4,BP*.08,BP*.26,(i-2)*.35,0,7);g.fill()}}
  else if(t==='shelf'){g.fillStyle='#16102a';g.fillRect(X,Y,BP,BP);g.strokeStyle='#05040c';g.lineWidth=3;g.strokeRect(X+2,Y+2,BP-4,BP-4);for(let r=0;r<3;r++){g.fillStyle='#07050f';g.fillRect(X+3,Y+BP*.3+r*BP*.3,BP-6,3);for(let i=0;i<3;i++){g.fillStyle=[a,a2,'#ffd23a','#9ff6ff'][(R()*4)|0];g.globalAlpha=.8;g.fillRect(X+8+i*16,Y+BP*.1+r*BP*.3,10,BP*.18);g.globalAlpha=1}}}
  else if(t==='cab'){sh(BP*.4);g.fillStyle='#1c1534';g.fillRect(X+8,Y+BP*.06,BP-16,BP*.9);g.fillStyle=['#27e0ff','#ff2fa8','#58ffb0','#ffd23a'][(p.x+p.y)%4];g.shadowColor=g.fillStyle;g.shadowBlur=12;g.fillRect(X+14,Y+BP*.14,BP-28,BP*.34);g.shadowBlur=0;g.fillStyle='#0a0818';g.fillRect(X+14,Y+BP*.56,BP-28,BP*.12);g.fillStyle='#ff4fd8';g.beginPath();g.arc(cx-8,Y+BP*.62,4,0,7);g.fill();g.fillStyle='#ffd23a';g.beginPath();g.arc(cx+8,Y+BP*.62,4,0,7);g.fill();LG.push({x:cx,y:Y+BP*.3,r:BP*1.2,col:a2,a:.2,f:R()*9})}
  else if(t==='term'){sh(BP*.36);g.fillStyle='#1c1534';g.fillRect(X+6,Y+BP*.18,BP-12,BP*.52);g.fillStyle='#0b1a14';g.fillRect(X+10,Y+BP*.24,BP-20,BP*.36);g.fillStyle=a;g.shadowColor=a;g.shadowBlur=8;for(let i=0;i<4;i++)g.fillRect(X+14,Y+BP*.3+i*7,BP*.3+R()*BP*.2,3);g.shadowBlur=0;g.fillStyle='#16102a';g.fillRect(X+10,Y+BP*.72,BP-20,BP*.12);LG.push({x:cx,y:cy,r:BP*1.1,col:a,a:.18,f:R()*9})}
  else if(t==='rack'){sh(BP*.4);g.fillStyle='#16102a';g.fillRect(X+6,Y+BP*.04,BP-12,BP*.92);for(let i=0;i<6;i++){g.fillStyle='#07050f';g.fillRect(X+10,Y+BP*.1+i*BP*.14,BP-20,BP*.1);g.fillStyle=['#58ffb0','#ff3b5c','#27e0ff'][(i+p.y)%3];g.fillRect(X+BP-22,Y+BP*.13+i*BP*.14,4,4)}}
  else if(t==='locker'||t==='mirror'){g.fillStyle='#1a2236';g.fillRect(X+3,Y+BP*.02,BP-6,BP*.96);g.strokeStyle='#05040c';g.lineWidth=3;g.strokeRect(X+3,Y+BP*.02,BP-6,BP*.96);
    if(t==='mirror'){g.fillStyle='#27e0ff';g.globalAlpha=.35;g.fillRect(X+8,Y+BP*.1,BP-16,BP*.8);g.globalAlpha=1;g.strokeStyle=a;g.lineWidth=3;g.shadowColor=a;g.shadowBlur=10;g.strokeRect(X+8,Y+BP*.1,BP-16,BP*.8);g.shadowBlur=0;LG.push({x:cx,y:cy,r:BP*1.4,col:a,a:.25,f:R()*9})}
    else{g.fillStyle='#0a0f1e';for(let i=0;i<3;i++)g.fillRect(X+14,Y+BP*.12+i*5,BP-28,2);g.fillStyle=p.act?'#ffd23a':a;g.fillRect(cx-3,Y+BP*.5,6,BP*.14);if(p.act){g.shadowColor='#ffd23a';g.shadowBlur=10;g.strokeStyle='#ffd23a';g.lineWidth=3;g.strokeRect(X+3,Y+BP*.02,BP-6,BP*.96);LG.push({x:cx,y:cy,r:BP*1.3,col:'#ffd23a',a:.25,f:R()*9})}}}
  else if(t==='bench'){sh(BP*.4);g.fillStyle='#2a2448';g.fillRect(X+2,Y+BP*.4,BP-4,BP*.2);g.fillStyle='#06050f';g.fillRect(X+8,Y+BP*.6,6,BP*.2);g.fillRect(X+BP-14,Y+BP*.6,6,BP*.2);g.fillStyle=a;g.fillRect(X+2,Y+BP*.38,BP-4,3)}
  else if(t==='case'){sh(BP*.4);g.fillStyle='#16102a';g.fillRect(X+5,Y+BP*.06,BP-10,BP*.9);g.fillStyle='rgba(159,246,255,.16)';g.fillRect(X+8,Y+BP*.1,BP-16,BP*.82);g.strokeStyle=a;g.lineWidth=2;g.shadowColor=a;g.shadowBlur=8;g.strokeRect(X+8,Y+BP*.1,BP-16,BP*.82);g.shadowBlur=0;g.fillStyle='#ffd23a';g.beginPath();g.moveTo(cx-8,Y+BP*.2);g.lineTo(cx+8,Y+BP*.2);g.lineTo(cx+5,Y+BP*.5);g.lineTo(cx-5,Y+BP*.5);g.fill();g.fillRect(cx-3,Y+BP*.5,6,BP*.12);g.fillRect(cx-9,Y+BP*.62,18,5)}
  else if(t==='jukebox'){sh();g.fillStyle='#2a1a4a';g.fillRect(X+8,Y+BP*.08,BP-16,BP*.88);g.fillStyle=a2;g.shadowColor=a2;g.shadowBlur=12;g.beginPath();g.arc(cx,Y+BP*.34,BP*.24,Math.PI,0);g.fill();g.fillRect(X+14,Y+BP*.34,BP-28,BP*.3);g.shadowBlur=0;LG.push({x:cx,y:cy,r:BP*1.5,col:a2,a:.28,f:R()*9})}
  else if(t==='crate'){sh();g.fillStyle='#4a3a2e';g.fillRect(X+8,Y+BP*.25,BP-16,BP*.56);g.strokeStyle='#241a12';g.lineWidth=3;g.strokeRect(X+8,Y+BP*.25,BP-16,BP*.56);g.beginPath();g.moveTo(X+8,Y+BP*.25);g.lineTo(X+BP-8,Y+BP*.81);g.stroke()}
  else owBakeRP2(g,p,m,R,d);
  g.restore();
}

/* ---------- state, input, movement ---------- */
const OW={x:15,y:23,px:15,py:23,d:'d',mv:false,pr:0,ph:0,nx:0,ny:0,bump:0,busy:false,t:0,fade:0,ret:null,la:0,lt:0,ld:'d'};
const owKeys={};let owDirIn=null;
const OWDIR={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]};
/* walking up close: every blocked tile is a whole square, but a low object (scale, stool, bench, table) only fills part of it.
   Gaps (in 64ths of a tile) of the empty margin per object [top,bottom,left,right]; the walker leans into that margin so you stand right at the art. */
const OWGAP={bed:[11,0,0,0],desk:[7,0,2,2],counter:[11,5,0,0],table:[16,8,0,0],plant:[5,0,2,2],chair:[12,0,13,13],scale:[35,0,10,10],stool:[20,0,14,14],jukebox:[0,0,8,8],dj:[12,0,4,4],term:[11,0,6,6],crate:[14,0,6,6],pinball:[12,0,5,5],bench:[24,0,2,2],weights:[20,0,4,4],couch:[19,0,2,2],lounge:[25,0,2,2],maptable:[19,0,4,4],turnstile:[12,0,4,4],tires:[11,0,6,6],dump:[10,0,4,4],vend:[6,0,7,7],barrier:[21,0,0,3],kayak:[21,16,0,0],photo:[19,0,13,13],holo:[3,0,6,6],cab:[3,0,6,6],case:[3,0,5,5],rack:[2,0,6,6],lamp:[0,0,13,13],pole:[0,0,13,13],cage:[2,4,0,0],barrel:[3,0,6,6],tvstand:[3,0,4,4],catstatue:[4,0,6,6],speaker:[6,0,6,6],claw:[2,0,5,5],safe:[2,0,1,1],planter:[1,0,3,3],fridge:[1,0,5,5]};
const owPropOver=(x,y)=>M.props.find(p=>p.s&&x>=p.x&&x<p.x+(p.w||1)&&y>=p.y&&y<p.y+(p.h||1));
function owLeanFor(d,nx,ny){const p=owPropOver(nx,ny);if(!p)return 0;const g=OWGAP[p.t];if(!g)return 0;
  const gap=d==='d'?g[0]:d==='u'?g[1]:d==='r'?g[2]:g[3];     // walking down you meet the top margin, and so on
  return gap>=6?Math.min(.42,gap/64*.85):0}
function owSave(){SAVE.ow=Object.assign(SAVE.ow||{},{map:M.id,x:OW.x,y:OW.y,d:OW.d,ret:OW.ret});persist()}
function owResize(){const r=$('#app').getBoundingClientRect();owW=r.width;owH=r.height;owDpr=Math.min(window.devicePixelRatio||1,2);owc.width=Math.round(owW*owDpr);owc.height=Math.round(owH*owDpr)}
function owFree(){const big=['street','spillway','harbor','island'];if(big.includes(M.id)){for(const k of big){if(k===M.id)continue;const o=OWMAPS[k];if(o&&o.baked){try{owZap(o.baked);if(o.fg&&o.fg.c)o.fg.c.width=o.fg.c.height=0}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}o.baked=null;o.fg=null;o.lights=null;o.vents=null}}}if(M.hb){for(const k in OWMAPS){const o=OWMAPS[k];if(k!==M.id&&o.hb&&o.baked){try{owZap(o.baked)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}o.baked=null;o.lights=null;o.vents=null}}}}
/* v2.95 MEMORY: the town's pre-drawn map (23-35 MB) is let go while a match is on; it is drawn again (well under a second) on the way back */
function owRelease(){try{if(typeof M!=='undefined'&&M){if(M.baked){owZap(M.baked);M.baked=null}if(M.fg&&M.fg.c){M.fg.c.width=M.fg.c.height=0;M.fg=null}}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
function owPlace(map,x,y,d,ret){M=owMap(map);owFree();owBake(M);OW.x=OW.px=x;OW.y=OW.py=y;OW.d=d||'d';OW.mv=false;OW.ret=ret||OW.ret||null;OW.fade=1;OW.la=0;OW.lt=0;owSave();owHud()}
function owShow(){SPR.clear();
  {const _bl=$('#owBlack');if(_bl){_bl.hidden=true;_bl.style.opacity=0}}
  if(SAVE&&((SAVE.testR2===1||SAVE.tPlaza===1)||((SAVE.ow&&(SAVE.ow.map==='harbor'||SAVE.ow.map==='island'))&&!(SAVE.beaten||[]).includes('captain')))&&!SAVE.v341Fresh){SAVE=freshSave();SAVE.v341Fresh=1;persist()}
  SND.setMode('ow');screens('#world');OWON=true;show('#hud',false);
  if(!SAVE.ow)SAVE.ow={map:'street',x:15,y:15,d:'u'};
  hbMigrate();   // v3.20bT: one-time move of an older Hale Harbor position onto the current map

  owResize();
  const o=SAVE.ow,mp=(OWI[o.map]||HBI[o.map]||o.map==='street'||o.map==='spillway'||o.map==='harbor'||o.map==='island')?o.map:'street';
  OW.ret=o.ret||null;
  M=owMap(mp);owFree();owBake(M);OW.x=OW.px=o.x;OW.y=OW.py=o.y;OW.d=o.d||'d';OW.mv=false;dgOnShow();
  if(owBlocked(OW.x,OW.y)){OW.x=OW.px=15;OW.y=OW.py=23;M=owMap('street');owBake(M)}
  owHud();owMsgHide();
  if(owGateOpen()&&!SAVE.ow.gates){SAVE.ow.gates=1;persist();SND.fx('ok');owSay('NARRATOR',['The Netrunners are beaten. The south gate hums open. The freight line to the east stays shut.'],()=>owSay('MAINFRAME MO',['Voss. Wait.','That Tuesday, a crate came in and I handed your brother a vial. Same as a hundred before it. I never knew what was in it.','I never told anyone. I am telling you.','The crate was stamped Q-7.'],()=>owSay('MOUSE',['You did it! The whole block saw the gate open.','The pharmacist pressed this on me. A sealed bag, and a note. Read it.','NOTE: \"If someone you love takes what Dante took, open this. Two doses. It holds them an hour. It does not cure. Get them to a doctor who is not his. - The Pharmacist\"','\u2605 GOT: SEALED BAG (do not open yet)','Dante\'s 22 is still on the fence. Look at it before you go.','Hale Harbor is the next stop on the Five-Line Circuit. Past the Spillway.'],()=>{SAVE.bag=1;persist()})))}
  else if(SAVE.storyV!==2){SAVE.storyV=2;SAVE.story={card:0};persist();owIntro()}
}
function owIntro(){
  const bl=$('#owBlack');bl.style.transition='none';bl.style.opacity=1;bl.hidden=false;
  owPlace('home',2,3,'d',null);OW.sleep=true;owHud();
  owSay('VAPOR CITY  \u00b7  2:07 AM',['The rain in Vapor City does not fall. It hangs, and takes the color of the nearest sign.','Two years ago Eli Voss\'s brother Dante, number 22, collapsed outside the Netrunners Arena. A paramedic found nothing. The league called it a preexisting condition.','Now the city is switching off the last open fields. Only the Arena stays lit.','Eli has not slept right since.'],()=>{
    bl.style.transition='opacity 1.8s';bl.style.opacity=0;
    setTimeout(()=>{bl.hidden=true;OW.sleep=false;OW.d='d';owSay('ELI',['...','Dante.','Something slid under the door. The cat is sitting on it.','Check the cat.'],()=>owToast('GOAL  TALK TO THE CAT'))},1900)});
}
function owCard(){
  owSay('STRAY CAT',['Meow.','(She is sitting on an envelope the courier slid under the door.)'],()=>
  owSay('THE CARD',['THE FIVE-LINE CIRCUIT. Five towns. One champion. Beat the Netrunners, and the gate opens.','In black ink beneath it: THROW IT INTO THE DARK.  -D','The D has a tail Dante never made. Eli decides it is the rain.','GOAL: beat the three street crews, then the Netrunners. Win the Circuit. Keep Vapor City lit.'],()=>{SAVE.story.card=1;persist();owToast('GOAL  BEAT THE NETRUNNERS')}));
}
function owHide(){OWON=false}
function owHud(){
  $('#world').classList.toggle('hb',!!(M.harbor||M.hb||M.island));
  const hbm=M.harbor||M.hb,n=(hbm?['baitdogs','longshore','gantry']:['cats','kings','rollers']).filter(id=>SAVE.beaten.includes(id)).length,cap=SAVE.beaten.includes(hbm?'closers':'captain'),got=Object.keys(RWD).filter(owGot).length;
  $('#owTown').textContent=M.room?'':(M.route?'THE SPILLWAY':M.island?"GULL'S REACH":M.harbor?'HALE HARBOR':'VAPOR CITY');
  $('#owObj').textContent=(cap?'CLEARED':'CREWS '+n+'/3')+((SAVE.upPts||0)?'  \u00b7  UPG '+SAVE.upPts:'');if(M.island||M.r2)$('#owObj').textContent=r2Obj()+((SAVE.upPts||0)?'  \u00b7  UPG '+SAVE.upPts:'');const upgControl=$('#mUpg');if(upgControl)upgControl.textContent='UPGRADES'+((SAVE.upPts||0)?' ('+SAVE.upPts+')':'');
}
/* dialogue */
let owLines=[],owAfter=null,owChoices=null;
const OW_PORTRAITS=[[/\beli\b/i,'Assets/portraits/eli.webp',null],[/zero\s*day/i,'Assets/portraits/zeroday.webp',null],[/riptide/i,'Assets/portraits/riptide.webp',null],[/\brita\b/i,'Assets/portraits/rita.webp','Assets/portraits/rita_hyped.webp'],[/\bbram\b/i,'Assets/portraits/bram.webp','Assets/portraits/bram_hyped.webp'],[/\bmo\b/i,'Assets/portraits/mo.webp','Assets/portraits/mo_hyped.webp']];
function owSetPortrait(name,hyped){const img=$('#owPort'),msg=$('#owMsg');if(!img||!msg)return;const s=String(name||'');const hit=OW_PORTRAITS.find(([rx])=>rx.test(s));if(hit){img.src=(hyped&&hit[2])?hit[2]:hit[1];img.alt=s;img.hidden=false;msg.classList.add('has-portrait')}else{img.hidden=true;img.removeAttribute('src');msg.classList.remove('has-portrait')}}
function owMsgHide(){$('#owMsg').hidden=true;owSetPortrait('');owLines=[];owAfter=null;owChoices=null;OW.busy=false}
function owSay(name,lines,after){owLines=lines.slice();owAfter=after||null;owChoices=null;$('#owName').textContent=name;const _hyp=/[!]|challenge|ready|beat|bring|step up|show me|run it|field|ball|circuit|win|game|turf|crew|play|test|arena/i.test((lines||[]).join(' '))||!!(M&&M.room);owSetPortrait(name,_hyp);$('#owBtns').innerHTML='';$('#owMsg').hidden=false;OW.busy=true;owNext()}
function owNext(){
  if(owChoices)return;
  if(!owLines.length){const a=owAfter;owMsgHide();if(a)a();return}
  $('#owTxt').textContent=owLines.shift();SND.fx('blip');
}
function owAsk(name,text,choices){
  owLines=[];owAfter=null;owChoices=choices;$('#owName').textContent=name;owSetPortrait(name,true);$('#owTxt').textContent=text;$('#owMsg').hidden=false;OW.busy=true;SND.fx('q');
  const box=$('#owBtns');box.innerHTML='';choices.forEach(([lab,fn])=>{const b=document.createElement('button');b.textContent=lab;b.onclick=e=>{e.stopPropagation();owMsgHide();if(fn)fn()};box.appendChild(b)});
}
$('#owMsg').addEventListener('pointerdown',e=>{e.stopPropagation();if(!owChoices)owNext()});
function owToast(t){SND.fx('ok2');const e=$('#owToast');e.textContent=t;e.hidden=false;e.classList.remove('go');void e.offsetWidth;e.classList.add('go');clearTimeout(owToast.t);owToast.t=setTimeout(()=>{e.hidden=true},3200)}
/* doors, people, challenges */
function owEnter(b){
  if(M.island){r2Enter(b);return}
  if(M.harbor){hbEnter(b);return}
  SND.fx('open');
  OW.ret={x:OW.x,y:OW.y+1};
  if(dgEnterArena(b)){owHud();return}
  const d=OWI[b.id];owPlace(b.id,Math.floor(d.w/2),d.h-2,'u',OW.ret);owHud();
}
function owLeave(){if(M.hb){hbLeave();return}SND.fx('close');const hb=OWB.find(b=>b.id===M.id),r=OW.ret||(hb?{x:hb.doors[0][0],y:hb.doors[0][1]+1}:{x:15,y:23});owPlace('street',r.x,r.y,'d',null);OW.ret=null;owHud();}
function owChallenge(n){
  const c=CREWS.find(x=>x.id===n.crew)||ROUTE_CREWS.find(x=>x.id===n.crew),i=CREWS.indexOf(c);
  if(!c){console.warn('owChallenge: unknown crew '+n.crew);return}
  if(c.pickup){
    SAVE.route=SAVE.route||{};
    if(c.id==='rats2'&&!SAVE.route.rats1)return;   // the rat's own line already said "Mack first."
    if(SAVE.route[c.id])return;
    owAsk(n.name,'Take this test? First to '+c.target+'.  '+c.scout,[['PLAY',()=>owPlay(c)],['NOT YET']]);
    return}
  if(c.captain){
    if(!CREWS.slice(0,3).every(x=>SAVE.beaten.includes(x.id))){owSay(n.name,['I only play proven runners.','Beat Glitch Cats, Scrap Kings and the Skyline Drifters first.']);return}
    owAsk(n.name,SAVE.beaten.includes('captain')?'Back for more? First to '+c.target+'.':"You made it. First to "+c.target+'. Ready to run my field?',[['PLAY',()=>owPlay(c)],['NOT YET']]);return}
  if(i>0&&!SAVE.beaten.includes(CREWS[i-1].id)){owSay(n.name,['Not yet. Beat '+CREWS[i-1].name+' first.']);return}
  owAsk(n.name,(SAVE.beaten.includes(c.id)?'Rematch? ':'Take on my crew? ')+'First to '+c.target+'.  '+c.scout,[['PLAY',()=>owPlay(c)],['NOT YET']]);
}
const PW_POOL=[['gloves','legs']];   // power-ups introduced per town; pawn trades only use towns reached so far
const owTown=()=>((typeof M!=='undefined'&&M&&(M.harbor||M.hb||M.island))||(typeof G!=='undefined'&&G&&G.crew&&(G.crew.town2||G.crew.r2)))?2:1;
function owSwap(n){
  const key='t'+owTown();SAVE.swapped=SAVE.swapped||[];
  if(SAVE.swapped.includes(key)){owSay(n.name,['One trade per town. Come back in the next district.']);return}
  const avail=PW_POOL.slice(0,owTown()).flat(),own=SAVE.pw||[];
  const gives=own.filter(g=>avail.some(a=>!own.includes(a)));
  if(!own.length){owSay(n.name,['You have nothing to trade yet.','Go earn a power-up from the locals first.']);return}
  if(!gives.length){owSay(n.name,["You already hold everything I could trade you. Nothing to swap."]);return}
  owAsk(n.name,'Trade a power-up for a different one? (once per town)',gives.map(g=>[POWERUPS[g].name,()=>{
    const to=avail.filter(a=>!own.includes(a));
    const doIt=r=>{SAVE.pw=SAVE.pw.filter(x=>x!==g).concat(r);if(SAVE.pwSel===g)SAVE.pwSel=null;SAVE.swapped.push(key);persist();owSay(n.name,['Deal. You gave up '+POWERUPS[g].name+'.','\u2605 POWER-UP: '+POWERUPS[r].name+' - '+POWERUPS[r].desc],()=>owToast('TRADED  '+POWERUPS[r].name))};
    if(to.length===1)doIt(to[0]);else owAsk(n.name,'Which one do you want?',to.map(r=>[POWERUPS[r].name,()=>doIt(r)]).concat([['NEVERMIND']]))
  }]).concat([['NOT NOW']]));
}
function owStats(n){
  const s=stt(),m=Math.floor(s.secs/60),h=Math.floor(m/60),tm=h?h+'h '+(m%60)+'m':m+' min';
  owSay(n.name,['Pulled your file off the grid.','TIME PLAYED: '+tm,'GAMES PLAYED: '+s.games+'   (W '+s.wins+' / L '+(s.games-s.wins)+')','Crews beaten: '+['cats','kings','rollers','captain'].filter(i=>SAVE.beaten.includes(i)).length+' of 4']);
}
function owArcade(n){
  owAsk(n.name,'Play CATCH RUSH? Catch footballs (+1), dodge trash (-2). 20 seconds.'+((SAVE.arcWon||[]).includes(1)?'':'  Score '+ARC_WIN+'+ wins a new jersey and pants.')+(SAVE.arcadeHi?'  Best: '+SAVE.arcadeHi:''),[['PLAY',()=>owMini()],['NOT NOW']]);
}
/* ---- Hanging-tire throw (Spillway). Overlay on the Catch Rush pattern; reward is +2 upgrade points, once. ---- */
const TIRE_K=1.15,TIRE_R=.03,TIRE_D=.64,TIRE_ANG=30,TIRE_FREQ=2,TIRE_AMP=.16,TIRE_THROWS=8,TIRE_NEED=5,TIRE_TIME=30;   // tire radius cut 75% (was .12); make 5 of 8 throws   // the tire swings side to side: x = W/2 + sin(seconds*FREQ)*AMP*W; a throw is judged against where the tire is when the ball lands
function tireCalc(W,H,dx,dy){
  const D=H*TIRE_D,R=H*TIRE_R,power=clamp(-dy/(H*.35),0,1),ang=clamp(dx/(W*.5),-1,1)*TIRE_ANG*Math.PI/180;
  const lx=W/2+Math.sin(ang)*power*TIRE_K*D,ly=H*.82-Math.cos(ang)*power*TIRE_K*D;
  const tx=arguments.length>4?arguments[4]:W/2;return{power,ang,lx,ly,R,D,hit:Math.hypot(lx-tx,ly-H*.18)<=R}}
function tireLines(hits,first){
  if(hits>=TIRE_NEED)return[hits+' out of '+TIRE_THROWS+'.','Clean.',first?'+2 UPGRADE POINTS.':'(No new points.)'];
  return[hits?hits+' out of '+TIRE_THROWS+'.':'Nothing.',"The tire swings. It doesn't settle.",hits>=3?'Try again when your arm remembers.':"Come back when you're warm."]}
function owTire(){
  OW.busy=true;
  let el=$('#tire');
  if(!el){el=document.createElement('div');el.id='tire';el.style.cssText='position:absolute;inset:0;z-index:7;background:#0a0d12;touch-action:none';el.innerHTML='<canvas style="width:100%;height:100%;display:block;touch-action:none"></canvas>';$('#world').appendChild(el)}
  if(el.parentElement!==$('#world'))$('#world').appendChild(el);
  el.hidden=false;el.style.display='block';
  const cv=el.firstChild,r=$('#world').getBoundingClientRect(),W=cv.width=Math.round(r.width),H=cv.height=Math.round(r.height),c=cv.getContext('2d');
  const land0=W>H;let throws=0,hits=0,time=TIRE_TIME,over=false,expired=false,aim=null,flight=null,aimLocked=false,swing=0,last=performance.now(),flash=0,res=null,gone=false,ball=null;
  const MX=W/2,MY=H*.82,TX=W/2,TY=H*.18,TR=H*TIRE_R,tireX=()=>W/2+Math.sin(performance.now()/1000*TIRE_FREQ)*TIRE_AMP*W;
  const pos=e=>({x:e.clientX-r.left,y:e.clientY-r.top});
  const rel=()=>{try{if(aim)cv.releasePointerCapture(aim.id)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}};
  const close=()=>{if(gone)return;gone=true;rel();aim=null;removeEventListener('resize',onRz);cv.onpointerdown=cv.onpointermove=cv.onpointerup=cv.onpointercancel=null;el.style.display='none';OW.busy=false};
  const abandon=()=>{close()};   // orientation change or close mid-sequence: no reward, no penalty
  const onRz=()=>{if((innerWidth>innerHeight)!==land0)abandon()};addEventListener('resize',onRz);
  const finish=()=>{if(over)return;over=true;rel();aim=null;SAVE.route=SAVE.route||{};const first=hits>=TIRE_NEED&&!SAVE.route.tire;
    if(first){SAVE.route.tire=1;SAVE.upPts=(SAVE.upPts||0)+2;persist()}
    res={hits,first};
    cv.onpointerdown=()=>{close();owSay('NARRATOR',tireLines(hits,first))}};
  cv.onpointerdown=e=>{if(over||aimLocked||aim)return;const q=pos(e);aim={id:e.pointerId,sx:q.x,sy:q.y,cx:q.x,cy:q.y};try{cv.setPointerCapture(e.pointerId)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}e.preventDefault();e.stopPropagation()};
  cv.onpointermove=e=>{if(!aim||e.pointerId!==aim.id)return;const q=pos(e);aim.cx=q.x;aim.cy=q.y;e.stopPropagation()};
  cv.onpointerup=e=>{if(!aim||e.pointerId!==aim.id)return;const q=pos(e);aim.cx=q.x;aim.cy=q.y;const k=tireCalc(W,H,aim.cx-aim.sx,aim.cy-aim.sy);rel();aim=null;e.stopPropagation();
    if(over||k.power<.05)return;aimLocked=true;flight={t:0,k}};
  cv.onpointercancel=e=>{if(aim&&e.pointerId===aim.id){rel();aim=null}};   // during aim: no throw consumed; a ball already in flight keeps flying
  const tick=now=>{if(gone)return;const dt=Math.min(.05,(now-last)/1000);last=now;
    if(!over){time-=dt;if(time<=0&&!expired){time=0;expired=true;if(aim){rel();aim=null}if(!flight)finish()}}
    if(flight){flight.t+=dt/.6;const f=Math.min(1,flight.t),k=flight.k;ball={x:MX+(k.lx-MX)*f,y:MY+(k.ly-MY)*f-Math.sin(f*Math.PI)*H*.1,s:1+Math.sin(f*Math.PI)*.35};
      if(f>=1){throws++;if(Math.hypot(k.lx-tireX(),k.ly-TY)<=TR){hits++;swing=1;flash=.4}flight=null;aimLocked=false;ball=null;if(hits>=TIRE_NEED||throws>=TIRE_THROWS||hits+(TIRE_THROWS-throws)<TIRE_NEED||expired)finish()}}
    swing=Math.max(0,swing-dt*.8);flash=Math.max(0,flash-dt);
    c.fillStyle='#0a0d12';c.fillRect(0,0,W,H);const gg=c.createLinearGradient(0,0,0,H);gg.addColorStop(0,'#1a2128');gg.addColorStop(1,'#10151a');c.fillStyle=gg;c.fillRect(0,0,W,H);
    c.strokeStyle='rgba(255,255,255,.08)';c.lineWidth=2;for(let i=0;i<5;i++){const y=H*(.3+i*.15);c.beginPath();c.moveTo(W*.2,y);c.lineTo(W*.8,y);c.stroke()}
    // chain + tire (hit radius is the tire's outer radius)
    const sx=(tireX()-TX)+Math.sin(swing*9)*swing*10;c.strokeStyle='#8a9399';c.lineWidth=3;c.setLineDash([6,5]);c.beginPath();c.moveTo(TX,0);c.lineTo(TX+sx,TY-TR);c.stroke();c.setLineDash([]);
    c.fillStyle=flash>0?'#35d07f':'#14110f';c.beginPath();c.arc(TX+sx,TY,TR,0,7);c.fill();c.strokeStyle='#59636a';c.lineWidth=4;c.stroke();c.fillStyle='#0a0d12';c.beginPath();c.arc(TX+sx,TY,TR*.45,0,7);c.fill();c.strokeStyle='#f4f4f0';c.lineWidth=3;c.beginPath();c.arc(TX+sx,TY,TR*.76,0,7);c.stroke();
    // throwing mark
    c.strokeStyle='rgba(244,244,240,.7)';c.lineWidth=4;c.beginPath();c.moveTo(MX-36,MY+10);c.lineTo(MX+36,MY+10);c.stroke();c.fillStyle='rgba(244,244,240,.25)';c.beginPath();c.ellipse(MX-14,MY+22,7,11,0,0,7);c.ellipse(MX+14,MY+22,7,11,0,0,7);c.fill();
    // aim preview
    if(aim&&!over){const k=tireCalc(W,H,aim.cx-aim.sx,aim.cy-aim.sy);if(k.power>=.05){c.strokeStyle='rgba(120,235,255,.7)';c.lineWidth=2;c.setLineDash([6,6]);c.beginPath();c.moveTo(MX,MY);c.lineTo(k.lx,k.ly);c.stroke();c.setLineDash([]);c.strokeStyle='#9ff6ff';c.lineWidth=3;c.beginPath();c.arc(k.lx,k.ly,9,0,7);c.moveTo(k.lx-14,k.ly);c.lineTo(k.lx+14,k.ly);c.moveTo(k.lx,k.ly-14);c.lineTo(k.lx,k.ly+14);c.stroke()}}
    // ball
    const bx=ball?ball.x:MX,by=ball?ball.y:MY-4,bs=ball?ball.s:1;if(!over){c.save();c.translate(bx,by);c.scale(bs,bs);c.fillStyle='#8b4a1f';c.beginPath();c.ellipse(0,0,13,8,-.5,0,7);c.fill();c.strokeStyle='#f4f4f0';c.lineWidth=2;c.beginPath();c.moveTo(-5,2);c.lineTo(5,-2);c.stroke();c.restore()}
    c.fillStyle='#fff';c.font='700 24px "Barlow Condensed",sans-serif';c.textAlign='left';c.fillText('HITS '+hits+'/'+TIRE_NEED+'  ·  THROWS '+throws+'/'+TIRE_THROWS,16,34);c.textAlign='right';c.fillText(Math.ceil(time)+'s',W-16,34);
    c.textAlign='center';c.font='500 15px "Barlow Condensed",sans-serif';c.fillStyle='#9ff6ff';c.fillText(over?'':'DRAG UP AND RELEASE TO THROW',W/2,H-14);
    if(over){c.fillStyle='rgba(0,0,0,.62)';c.fillRect(0,H*.36,W,H*.3);c.fillStyle=res.hits>=TIRE_NEED?'#35d07f':'#ffd23a';c.font='700 36px "Bowlby One",Impact,sans-serif';c.fillText(res.hits+' / '+TIRE_NEED,W/2,H*.36+H*.12);c.fillStyle='#fff';c.font='500 17px "Barlow Condensed",sans-serif';c.fillText('Tap to continue',W/2,H*.36+H*.22)}
    requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
}
function owMini(){
  OW.busy=true;
  let el=$('#mini');if(!el){el=document.createElement('div');el.id='mini';el.style.cssText='position:absolute;inset:0;z-index:6;background:#06050f;touch-action:none';el.innerHTML='<canvas style="width:100%;height:100%;display:block"></canvas>';$('#world').appendChild(el)}
  if(el.parentElement!==$('#world'))$('#world').appendChild(el);
  el.hidden=false;el.style.display='block';
  const cv=el.firstChild,r=$('#world').getBoundingClientRect(),W=cv.width=Math.round(r.width),H=cv.height=Math.round(r.height),c=cv.getContext('2d');
  let px=W/2,tx=W/2,sc=0,time=20,items=[],spawn=0,over=false,last=performance.now(),flash=0,lives=0;
  const mv=e=>{e.stopPropagation();tx=e.clientX-r.left};cv.onpointerdown=cv.onpointermove=mv;
  const fin=()=>{over=true;SAVE.arcadeHi=Math.max(SAVE.arcadeHi||0,sc);persist();cv.onpointerdown=()=>{cv.onpointerdown=cv.onpointermove=null;el.style.display='none';OW.busy=false;const first=sc>=ARC_WIN&&!(SAVE.arcWon||[]).includes(1);if(first){SAVE.arcWon=(SAVE.arcWon||[]).concat(1);persist()}
    owSay('ARCADE OWNER',first?['Score '+sc+'! You crushed it.','\u2605 PRIZE: Tank jersey + Block Stripe pants','Wear them at the Clubhouse mirror.']:[(sc>=SAVE.arcadeHi&&sc>0?'New high score: '+sc+'!':'Score '+sc+'. High score: '+SAVE.arcadeHi+'.')].concat((SAVE.arcWon||[]).includes(1)?['Come back and beat it.']:['Score '+ARC_WIN+' or more and I give you a prize: a new jersey and pants.']),first?()=>owToast('UNLOCKED  TANK JERSEY + BLOCK STRIPE'):null)}};
  const tick=now=>{if(el.style.display==='none')return;const dt=Math.min(.05,(now-last)/1000);last=now;
    if(!over){time-=dt;if(time<=0){time=0;fin()}spawn-=dt;if(spawn<=0){spawn=.35+Math.random()*.3;items.push({x:30+Math.random()*(W-60),y:-20,v:150+Math.random()*120+(20-time)*8,bad:Math.random()<.32,rot:Math.random()*6})}
      px+=(tx-px)*Math.min(1,dt*14);for(const it of items){it.y+=it.v*dt;it.rot+=dt*5}
      for(const it of items){if(!it.done&&it.y>H-110&&it.y<H-60&&Math.abs(it.x-px)<44){it.done=1;if(it.bad){sc=Math.max(0,sc-2);flash=.25}else sc++}}
      items=items.filter(i=>!i.done&&i.y<H+30)}
    flash=Math.max(0,flash-dt);
    c.fillStyle='#0b0820';c.fillRect(0,0,W,H);c.strokeStyle='rgba(155,92,255,.18)';for(let x=0;x<W;x+=40){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke()}
    for(const it of items){c.save();c.translate(it.x,it.y);c.rotate(it.rot);if(it.bad){c.fillStyle='#6b7078';c.fillRect(-14,-14,28,28);c.strokeStyle='#ff3b5c';c.lineWidth=3;c.strokeRect(-14,-14,28,28);c.beginPath();c.moveTo(-8,-8);c.lineTo(8,8);c.moveTo(8,-8);c.lineTo(-8,8);c.stroke()}else{c.fillStyle='#8b4a1f';c.beginPath();c.ellipse(0,0,20,12,0,0,7);c.fill();c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.moveTo(-8,0);c.lineTo(8,0);c.stroke()}c.restore()}
    c.fillStyle=flash>0?'#ff3b5c':'#27e0ff';c.shadowColor=c.fillStyle;c.shadowBlur=14;c.fillRect(px-36,H-92,72,16);c.fillRect(px-22,H-110,44,22);c.shadowBlur=0;
    c.fillStyle='#fff';c.font='700 26px "Barlow Condensed",sans-serif';c.textAlign='left';c.fillText('SCORE '+sc,16,48);c.textAlign='right';c.fillText(Math.ceil(time)+'s',W-16,48);
    c.textAlign='center';c.font='500 15px "Barlow Condensed",sans-serif';c.fillStyle='#9ff6ff';c.fillText(over?'':'DRAG TO MOVE',W/2,H-24);
    if(over){c.fillStyle='rgba(0,0,0,.6)';c.fillRect(0,H*.35,W,150);c.fillStyle='#ffd23a';c.font='700 44px "Bowlby One",sans-serif';c.fillText('TIME!  '+sc,W/2,H*.35+70);c.fillStyle='#fff';c.font='500 18px "Barlow Condensed",sans-serif';c.fillText('Tap to continue',W/2,H*.35+115)}
    requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
}
const POWERUPS={gloves:{name:'STICKY GLOVES',desc:'Receivers catch more'},legs:{name:'IRON LEGS',desc:'Stamina refills fast'}};
function owPlay(c){
  const have=(SAVE.pw||[]);
  const go=()=>{SND.fx('bong');OW.busy=true;owSave();owHide();startMatch(c);if(SAVE.pwSel&&PW[SAVE.pwSel])setTimeout(()=>{try{fxText(POWERUPS[SAVE.pwSel].name,'#ffd23a')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}},900)};
  if(!have.length){SAVE.pwSel=null;go();return}
  owAsk('POWER-UP','Bring one power-up? It lasts one match.  '+have.map(id=>POWERUPS[id].name+': '+POWERUPS[id].desc).join('  /  '),have.map(id=>[POWERUPS[id].name,()=>{SAVE.pwSel=id;persist();go()}]).concat([[ 'NONE',()=>{SAVE.pwSel=null;persist();go()}]]));
}
function owGive(id,lines){SAVE.pw=SAVE.pw||[];if(SAVE.pw.includes(id))return false;SAVE.pw.push(id);persist();owSay(lines[0],lines.slice(1).concat(['\u2605 POWER-UP: '+POWERUPS[id].name+' - '+POWERUPS[id].desc,'You can bring one into any game. It asks before kickoff.']),()=>owToast('POWER-UP  '+POWERUPS[id].name));return true}
function owReward(n){
  const R=RWD[n.rw];
  if(owGot(n.rw)){owSay(n.name,['Enjoy the gear. Spread the word.']);return}
  if(owMet()<R.need){owSay(n.name,n.t.concat(["I'm not comfortable giving gifts to strangers.","Meet more people around town first.  ("+owMet()+'/'+R.need+' met)']));return}
  SAVE.got=(SAVE.got||[]).concat(n.rw);persist();owHud();
  owSay(n.name,[R.line,'\u2605 UNLOCKED: '+R.name,'Open the mirror in the Clubhouse to wear it.'],()=>owToast('UNLOCKED  '+R.name));
}
function owTalk(n){
  if(n.r2){r2Talk(n);return}
  if(n.hb){hbTalk(n);return}
  if(n.tf)n=Object.assign({},n,{t:n.tf(),__src:n});
  if(n.gate){owSay(n.name,(n.gate==='E')?['The freight line stays shut. Authorized crates only.']:owGateOpen()?['Route is open. Hale Harbor is the Circuit\'s next stop.']:['Gate is closed.','Only the runner who beats the Netrunners gets through.']);return}
  if(n.act==='tester'){owAsk(n.name,'PLAYTEST: pick an opponent, no unlock needed.',CREWS.map(c=>[c.name.toUpperCase(),()=>owPlay(c)]).concat([['NOT NOW']]));return}   // TESTER-REMOVE
  if(!(SAVE.met||[]).includes(n.id)){SAVE.met=(SAVE.met||[]).concat(n.id);persist();owHud()}
  if(n.crew){owSay(n.name,n.t,()=>owChallenge(n));return}
  if(n.act==='card'&&SAVE.story&&SAVE.story.card===0){owCard();return}
  if(n.act==='stats'){owSay(n.name,n.t,()=>owStats(n));return}
  if(n.act==='mini'){owSay(n.name,n.t,()=>owArcade(n));return}
  if(n.act==='drill'&&typeof fdTalk==='function'){fdTalk(n);return}
  if(n.act==='swap'){owSay(n.name,n.t,()=>owSwap(n));return}
  if(n.pw){if(!owGive(n.pw,[n.name].concat(n.pwl)))owSay(n.name,n.t2||['Good luck out there.']);return}
  owSay(n.name,n.t);
}
function owBump(x,y){
  if(hbBump(x,y)||r2Bump(x,y))return;
  if(dgBump(x,y))return;
  const n=owNpcAt(x,y);if(n){const isBoss=!!(n.boss3||(n.id&&CH3MAP[n.id]&&CH3MAP[n.id].boss3));if(!isBoss){if(n._origD===undefined)n._origD=n.d||'d';const dx=OW.x-n.x,dy=OW.y-n.y;n.d=Math.abs(dx)>Math.abs(dy)?(dx>0?'r':'l'):(dy>0?'d':'u')}n._greetUntil=performance.now()+1500;owTalk(n);return}
  if(M.room){const cp=owPropOver(x,y);const ck=cp&&(cp.k||cp.t);
    if(cp&&!cp.act&&(ck==='counter'||ck==='bar'||ck==='cage'||ck==='table'||ck==='desk'||ck==='icebin')){
      const bx=x+(x-OW.x),by=y+(y-OW.y),bn=owNpcAt(bx,by);
      if(bn){const isBoss=!!(bn.boss3||(bn.id&&CH3MAP[bn.id]&&CH3MAP[bn.id].boss3));if(!isBoss){if(bn._origD===undefined)bn._origD=bn.d||'d';const dx=OW.x-bn.x,dy=OW.y-bn.y;bn.d=Math.abs(dx)>Math.abs(dy)?(dx>0?'r':'l'):(dy>0?'d':'u')}bn._greetUntil=performance.now()+1500;owTalk(bn);return}}}
  const p=owPropAt(x,y);
  if(p){if(p.act&&(M.hb||M.harbor||M.island)&&(r2Act(p)||hbAct(p)))return;if(p.act==='tire'){if(window.SHELVED_MINIS){owSay('HANGING TIRE',['A weathered tire swinging over the channel.']);return}SAVE.route=SAVE.route||{};owAsk('TIRE',SAVE.route.tire?'Again? No points in it.':'A tire on a chain. A throwing mark on the ground. Make 5 out of 8. Practice?',[['THROW',()=>owTire()],['CANCEL']]);return}
    if(p.act==='squad'){owAsk('LOCKER','Your squad and upgrades. Points: '+(SAVE.upPts||0),[['SQUAD',()=>{owClub=true;owHide();renderSquad();screens('#squad')}],['UPGRADE',()=>{owClub=true;owHide();openUpg(()=>{owClub=false;owShow()})}],['CLOSE']]);return}
    if(p.act==='team'){owAsk('MIRROR','Change your look?',[['MY TEAM',()=>{owClub=true;owHide();renderTeam();screens('#team')}],['CLOSE']]);return}
    owSay('',p.m);return}
  if(M.gates.some(g=>g[0]===x&&g[1]===y&&(g[0]>=28||!owGateOpen()))){SND.fx('err');owSay('GATE',[g0east(x)?'The freight line is shut. Not yet.':'The gate is sealed. Beat the Netrunners to open it.'])}
}
function owTryMove(d,force){
  if(OW.mv)return false;OW.d=d;const [dx,dy]=OWDIR[d],nx=OW.x+dx,ny=OW.y+dy;
  if(owBlocked(nx,ny)){OW.lt=owLeanFor(d,nx,ny);OW.ld=d;if(!force&&OW.bump<=0){OW.bump=.3;owBump(nx,ny)}return false}
  OW.lt=0;OW.mv=true;OW.pr=0;OW.nx=nx;OW.ny=ny;return true;
}
function owClearIn(){owDirIn=null;for(const k in owKeys)owKeys[k]=false}
function owArrive(){
  OW.x=OW.nx;OW.y=OW.ny;OW.mv=false;owSave();
  if(M.room){if(dgArrive())return;if(OW.y===M.h-1){owClearIn();if(M.id==='home'&&SAVE.story&&SAVE.story.card===0){OW.y=M.h-2;OW.py=M.h-2;owSay('ELI',['The cat is sitting on something. Check it first.']);return}owLeave()}return}
  const b=owDoorAt(OW.x,OW.y);if(b){owClearIn();owEnter(b);return}
  if(M.harbor){hbArrive();return}
  if(M.island){r2Arrive();return}
  if(M.route){if(OW.y===0){owClearIn();owPlace('street',15,38,'u',null);owHud();return}if(OW.x>=M.w-1){owClearIn();hbEnterTown()}return}
  if(OW.y>=M.h-1||OW.x>=M.w-1){if(owGateOpen()&&OW.y>=M.h-1){owClearIn();owPlace('spillway',5,1,'d',null);owHud();return}owClearIn();owSay('ROUTE',['Beyond here the road runs to Hale Harbor, the next stop on the Circuit.'],()=>{OW.d=OW.y>=M.h-1?'u':'l';owTryMove(OW.d,true)})}
}
function owInteract(){
  if(OW.busy){if(!owChoices)owNext();return}
  const [dx,dy]=OWDIR[OW.d],tx=OW.x+dx,ty=OW.y+dy;
  if(M&&M.npcs){
    const hit=M.npcs.find(n=>!n.off&&Math.round(n.x)===tx&&Math.round(n.y)===ty);
    if(hit){
      const opp={u:'d',d:'u',l:'r',r:'l'}[OW.d]||'d';
      if(hit._origD===undefined)hit._origD=hit.d||'d';
      if(!(hit.boss3||(hit.id&&CH3MAP[hit.id]&&CH3MAP[hit.id].boss3)))hit.d=opp;
      hit._greetUntil=performance.now()+1500;
    }
  }
  owBump(tx,ty);
}
const PLOOP=(()=>{const a=[];for(let x=13;x<=18;x++)a.push([x,13]);for(let y=14;y<=17;y++)a.push([18,y]);for(let x=17;x>=13;x--)a.push([x,17]);for(let y=16;y>=14;y--)a.push([13,y]);return a})();
function owPatrol(dt){
  if(M.room)return;
  for(const n of M.npcs){if(!n.patrol)continue;
    if(n.pi==null){n.pi=0;n.mv=1;n.hold=0}
    if(n.mv<1){n.mv=Math.min(1,n.mv+dt/.22);n.rx=n.ox+(n.x-n.ox)*n.mv;n.ry=n.oy+(n.y-n.oy)*n.mv;continue}
    n.rx=n.x;n.ry=n.y;
    if(OW.busy){n.hold=2.5;continue}
    if(n.hold>0){n.hold-=dt;continue}
    const LP=n.loop||PLOOP,nx=LP[(n.pi+1)%LP.length],cur=LP[n.pi];
    if((OW.x===nx[0]&&OW.y===nx[1])||(OW.mv&&OW.nx===nx[0]&&OW.ny===nx[1]))continue;
    if(M.npcs.some(o=>o!==n&&o.x===nx[0]&&o.y===nx[1]))continue;
    n.ox=n.x;n.oy=n.y;n.x=nx[0];n.y=nx[1];n.pi=(n.pi+1)%LP.length;n.mv=0;
    n.d=nx[0]>cur[0]?'r':nx[0]<cur[0]?'l':nx[1]>cur[1]?'d':'u'}
}
function owStep(dt){
  owPatrol(dt);
  if(!OW.busy&&M&&M.npcs){const _gn=performance.now();for(let _i=0;_i<M.npcs.length;_i++){const _n=M.npcs[_i];if(_n._greetUntil&&_gn>_n._greetUntil){_n._greetUntil=0;if(_n._origD!==undefined&&!_n.patrol){_n.d=_n._origD}_n._origD=undefined}}}
  OW.t+=dt;if(OW.bump>0)OW.bump-=dt;if(OW.fade>0)OW.fade=Math.max(0,OW.fade-dt*3);
  const held=owDirIn||owKeys.arrowup||owKeys.arrowdown||owKeys.arrowleft||owKeys.arrowright||owKeys.w||owKeys.a||owKeys.s||owKeys.d;
  { const tgt=OW.mv?0:(OW.busy||held?OW.lt:0);OW.la+=(tgt-OW.la)*Math.min(1,dt*14);if(OW.la<.005)OW.la=0 }
  if(OW.busy)return;
  let want=owDirIn;
  if(!want){if(owKeys.arrowup||owKeys.w)want='u';else if(owKeys.arrowdown||owKeys.s)want='d';else if(owKeys.arrowleft||owKeys.a)want='l';else if(owKeys.arrowright||owKeys.d)want='r'}
  if(!want&&window.__gpInput&&window.__gpInput.active){const gx=window.__gpInput.sx||0,gy=window.__gpInput.sy||0;if(Math.hypot(gx,gy)>.35)want=Math.abs(gx)>Math.abs(gy)?(gx>0?'r':'l'):(gy>0?'u':'d')}
  if(OW.mv){const _sd=(typeof DG!=='undefined'&&DG&&DG.slow>0)?.68:.27;OW.pr+=dt/_sd;OW.ph+=dt*(.27/_sd)*2.4;if(OW.pr>=1){OW.pr=1;OW.px=OW.nx;OW.py=OW.ny;SND.step(M.room);owArrive();if(!OW.mv&&want&&!OW.busy)owTryMove(want)}else{OW.px=OW.x+(OW.nx-OW.x)*OW.pr;OW.py=OW.y+(OW.ny-OW.y)*OW.pr}}
  else if(want)owTryMove(want);
}
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(!OWON)return;owKeys[k]=true;if(k===' '||k==='enter'||k==='e'){owInteract();e.preventDefault()}});
addEventListener('keyup',e=>{owKeys[e.key.toLowerCase()]=false});
(()=>{
  let id=null,ox=0,oy=0;
  owc.addEventListener('pointerdown',e=>{if(id!==null)return;id=e.pointerId;ox=e.clientX;oy=e.clientY;owc.setPointerCapture(id);const b=$('#owBase');b.hidden=false;const r=$('#app').getBoundingClientRect();b.style.left=(ox-r.left)+'px';b.style.top=(oy-r.top)+'px';$('#owKnob').style.transform='translate(0,0)'});
  owc.addEventListener('pointermove',e=>{if(e.pointerId!==id)return;let dx=e.clientX-ox,dy=e.clientY-oy;const m=Math.hypot(dx,dy);
    if(m>44){ox+=dx/m*(m-44);oy+=dy/m*(m-44);dx=e.clientX-ox;dy=e.clientY-oy}
    $('#owKnob').style.transform='translate('+dx*.7+'px,'+dy*.7+'px)';
    owDirIn=m<14?null:(Math.abs(dx)>Math.abs(dy)?(dx>0?'r':'l'):(dy>0?'d':'u'))});
  const up=e=>{if(e.pointerId!==id)return;id=null;owDirIn=null;$('#owBase').hidden=true};
  owc.addEventListener('pointerup',up);owc.addEventListener('pointercancel',up);
})();
$('#owA').addEventListener('pointerdown',e=>{e.stopPropagation();owInteract()});
$('#owMenu').addEventListener('pointerdown',e=>{e.stopPropagation();if(OW.busy)return;owSave();owHide();renderMenu();screens('#menu')});

/* ---------- drawing ---------- */
const RAINOW=Array.from({length:70},()=>({x:Math.random(),y:Math.random(),v:.9+Math.random()*.7}));
function owFig(x,y,dir,moving,uni,look,num,ph){
  const sx=x*OWT+OWT/2,sy=y*OWT+OWT-6;
  renderPerson(og,{x:sx,y:sy,S:OWT/15.4,view:dir==='u'?'b':dir==='d'?'f':'s',flip:dir==='l'?-1:1,speed:moving?5:0,phi:ph*TAU,cx:dir==='l'?-1:dir==='r'?1:0,sa:dir==='u'?1:dir==='d'?-1:0,uni,look,gear:null,star:false,num,t:0,hasBall:false,tname:'',lname:null,cache:true,team:'O',stance:false});
}

/* ===================== v3.34T TOWN TEST (CF_85 Build 5, OVERWORLD GO / NO-GO) =====================
   ONLY Eli and two of his crew (Zero Day, Riptide), ONLY in Hale Harbor (the town and its rooms). Every other person, every other
   town and all game rules are untouched. Look only: positions, talk, walking, collisions and saves are the game's own.
   How: each of the three is drawn ONCE from the KayKit 3D model into flat pictures (front, back, side; 8 walk frames + 6 idle
   frames; left = the side picture mirrored), the first time he is on screen in the harbor. The town then draws those pictures,
   exactly where and when it drew the classic figure (same feet spot, same glow around Eli, same depth order).
   Eli wears the team kit (as his classic figure does); Zero Day and Riptide wear their classic street colours, no helmet.
   MENU: TOWN PEOPLE: KAYKIT (TEST) / CLASSIC. Classic = exactly v3.33T. Files missing or any error -> classic figure.
   To remove the experiment: set the switch to CLASSIC (or KTCFG.on=0); nothing else depends on it. ===================== */
const KTCFG=window.KTCFG={on:1,
  h:1.30,          // drawn picture height in tiles (the figure fills KTCFG.fill of it)
  fill:.86,foot:.07,tilt:.30,   // how much of the picture the body fills, feet line, camera tilt (looking down onto the town)
  cw:64,ch:104,    // baked picture size in pixels per frame
  outline:1.6,     // outline width at bake size
  walk:'Walking_A',walkN:8,idle:'Idle_A',idleN:6,idleFps:5,
  yaw:{d:0,u:Math.PI,r:Math.PI/2},
  head:.7,bareHead:.78,   // helmet head scale (as in matches) / bare head scale for street clothes
  shadow:.34,
  who:{},          // v3.35T: townspeople stay classic (Build 5 NO-GO). Old test: {hb_zd:'zd',hb_riptide:'rip',riptide_yard:'rip'}
  eliAll:1};       // v3.35T: Eli is KayKit everywhere (0 = Hale Harbor only, as in v3.34T)
const KT={want:true,sh:{},ms:{},bytes:0,err:'',retry:0,draws:0};
try{if(localStorage.getItem('cf_kkt')==='0')KT.want=false}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
const ktHarbor=()=>!!(typeof M!=='undefined'&&M&&(M.harbor||M.hb));
function ktFind(re){const all=[];try{for(const k of SLOTS)if(SAVE.starters[k])all.push(SAVE.starters[k]);for(const p of (SAVE.bench||[]))all.push(p)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}return all.find(p=>re.test(p.n0||p.name||''))||null}
function ktRecipe(id){
  if(id==='eli')return{key:'eli|'+JSON.stringify(SAVE.uni),d:SAVE.starters.QB||{name:'Eli Voss',pos:'QB'},num:7,uni:SAVE.uni,helm:true,pads:true,head:KTCFG.head};
  const civ=id==='zd'?'runner':'courier',C=Object.assign({},CIV[civ]||{},HB_CIV[civ]||{}),pl=ktFind(id==='zd'?/Zero Day/:/Riptide/)||{name:id==='zd'?'"Zero Day" Darnell Reyes':'"Riptide" Sterling',pos:id==='zd'?'WR':'RB'};
  const uni=Object.assign({},DEF_UNI,{jc:C.body,jt:C.trim,jn:C.body,jo:C.body,pc:C.pants,ps:C.pants,po:C.pants,sock:C.pants,shoe:'#1c1a18',hc:C.body,hs:C.body,mask:C.body});
  return{key:id,d:pl,num:0,uni,helm:false,pads:false,plain:true,head:KTCFG.bareHead}}
function ktSheet(id){
  const rc=ktRecipe(id);let sh=KT.sh[id];if(sh&&sh.key===rc.key)return sh;
  if(sh&&sh.key!==rc.key){KT.bytes-=sh.bytes;delete KT.sh[id]}
  if(typeof P3D==='undefined'||!P3D.kkTown||performance.now()<KT.retry)return null;
  const t0=performance.now(),C=KTCFG,frames=[];
  try{const P=P3D.kkTown,dur=n=>{const c=P3D.kkClipDur?P3D.kkClipDur(n):1;return c||1};
    const wd=dur(C.walk),id2=dur(C.idle);
    for(let i=0;i<C.walkN;i++)frames.push({clip:C.walk,t:wd*i/C.walkN});
    for(let i=0;i<C.idleN;i++)frames.push({clip:C.idle,t:id2*i/C.idleN});
    const cv=P({frames,yaws:[C.yaw.d,C.yaw.u,C.yaw.r],cw:C.cw,ch:C.ch,tilt:C.tilt,foot:C.foot,fill:C.fill,outline:C.outline,d:rc.d,num:rc.num,uni:rc.uni,helm:rc.helm,pads:rc.pads,plain:rc.plain,head:rc.head});
    if(!cv){KT.retry=performance.now()+600;return null}
    sh={key:rc.key,d:cv[0],u:cv[1],r:cv[2],bytes:cv.reduce((s,c)=>s+c.width*c.height*4,0)};KT.sh[id]=sh;KT.bytes+=sh.bytes;KT.ms[id]=+(performance.now()-t0).toFixed(1);return sh}
  catch(e){KT.err=String(e&&e.message||e);KT.want=false;try{console.warn('[CF] town KayKit off: '+KT.err);ktLab()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return null}}
function ktDraw(sh,x,y,dir,moving,ph,tm,seed){
  const C=KTCFG,img=dir==='u'?sh.u:dir==='d'?sh.d:sh.r,flip=dir==='l'?-1:1;
  const fi=moving?Math.floor((((ph%1)+1)%1)*C.walkN)%C.walkN:C.walkN+(Math.floor(tm*C.idleFps+seed*3.7)%C.idleN);
  const sx=x*OWT+OWT/2,sy=y*OWT+OWT-6,dh=C.h*OWT,dw=dh*C.cw/C.ch,fy=sy+dh*C.foot;
  const g=og,sb=g.shadowBlur,sc=g.shadowColor;
  g.save();g.shadowBlur=0;g.fillStyle='rgba(0,0,0,'+C.shadow+')';g.beginPath();g.ellipse(sx,sy+1,OWT*.27,OWT*.09,0,0,7);g.fill();g.restore();
  g.save();g.shadowBlur=sb;g.shadowColor=sc;g.translate(sx,0);g.scale(flip,1);
  g.drawImage(img,fi*C.cw,0,C.cw,C.ch,-dw/2,fy-dh,dw,dh);g.restore();KT.draws++;return true}
function ktOn(){return KTCFG.on&&KT.want&&ktHarbor()}
function ktEli(x,y,dir,moving,ph){if(!(KTCFG.eliAll?KTCFG.on&&KT.want:ktOn()))return false;const sh=ktSheet('eli');if(!sh)return false;return ktDraw(sh,x,y,dir,moving,ph,(typeof OW!=='undefined'?OW.t:0)||0,0)}
function ktCiv(n,tm){if(!ktOn())return false;const id=KTCFG.who[n.id];if(!id)return false;const sh=ktSheet(id);if(!sh)return false;
  return ktDraw(sh,n.rx!=null?n.rx:n.x,n.ry!=null?n.ry:n.y,n.d,!!(n.patrol&&n.mv<1),n.ph||0,tm,(n.x*7+n.y*3)%5)}
function ktLab(){const b=document.getElementById('mKT');if(b)b.textContent='ELI IN TOWN: '+(KT.want?'KAYKIT (TEST)':'CLASSIC')+(KT.err?' (OFF: '+KT.err.slice(0,40)+')':'')}
setTimeout(()=>{const ro=document.getElementById('mRO');if(!ro||document.getElementById('mKT'))return;const b=document.createElement('button');b.className='btn';b.id='mKT';
  b.onclick=()=>{KT.want=!KT.want;if(KT.want)KT.err='';try{localStorage.setItem('cf_kkt',KT.want?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}ktLab()};((dev=>{if(dev){const row=document.createElement('div');row.className='ui-menu-setting';row.appendChild(b);dev.appendChild(row)}else ro.parentNode.appendChild(b)})(document.querySelector('.ui-menu-dev')));ktLab()},60);
window.KT_SHEET=id=>{const s=KT.sh[id];return s?[s.d,s.u,s.r].map(c=>c.toDataURL()):null};
window.KT_DBG=()=>({want:KT.want,on:KTCFG.on,here:ktHarbor(),sheets:Object.keys(KT.sh),bytes:KT.bytes,ms:KT.ms,err:KT.err,draws:KT.draws});
/* ---------- civilians: street people who are NOT football players (coats, hoods, apron, umbrella, armor) ---------- */
