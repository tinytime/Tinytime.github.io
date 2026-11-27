/* ============================ match flow ============================ */
const PW={};   // power-up active for the current game (at most one)
const rgbOf=h=>{h=/^#[0-9a-f]{6}$/i.test(h||'')?h:'#888888';return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]};
const cdist=(a,b)=>{const x=rgbOf(a),y=rgbOf(b),rm=(x[0]+y[0])/2;return Math.sqrt((2+rm/256)*(x[0]-y[0])**2+4*(x[1]-y[1])**2+(2+(255-rm)/256)*(x[2]-y[2])**2)/3};   // weighted colour distance, 0..~255
const uShade=(h,f)=>'#'+rgbOf(h).map(v=>Math.max(0,Math.min(255,Math.round(v*f))).toString(16).padStart(2,'0')).join('');
const uLum=h=>{const c=rgbOf(h);return .299*c[0]+.587*c[1]+.114*c[2]};
// Every game the other team gets a jersey, pants and helmet that clearly differ from yours; if their normal colours already do, nothing changes.
function awayUni(crew){const me=SAVE.uni,u=crew.uni,TURF='#1A2E40',ci=Math.max(0,CREWS.indexOf(crew));
  const jOk=j=>cdist(j,me.jc)>=75&&cdist(j,me.pc)>=40,pOk=p=>cdist(p,me.pc)>=70,hOk=h=>cdist(h,me.hc)>=55;
  const out=Object.assign({},u);
  if(!jOk(u.jc)&&crew.alt&&jOk(crew.alt.jc)){Object.assign(out,crew.alt);return out}
  if(!jOk(u.jc)){   // jersey clashes: swap in a bright colour that is also well away from the turf, a different one for each crew
    const taken=CREWS.map(c=>c.uni.jc).concat(CREWS.slice(0,ci).map(c=>awayUni(c).jc)),J=['#f4f4ee','#2f6fe0','#e4572e','#ff7ab8','#f2b632','#2fa88a','#8e5bd8','#d6362f'].filter(j=>!taken.includes(j));let pick=null;   // never wear another crew's own colour
    for(let k=0;k<J.length&&!pick;k++){const j=J[(k+ci*2)%J.length];if(jOk(j)&&cdist(j,TURF)>=75)pick=j}
    pick=pick||'#f4f4ee';const dark=uLum(pick)<120,tx=dark?'#ffffff':'#14110f';
    Object.assign(out,{jc:pick,ps:tx,jt:tx,jn:tx,sock:pick,hs:tx,mask:dark?'#ffffff':'#14110f'});
    if(hOk(u.hc)&&cdist(u.hc,TURF)>=55&&cdist(u.hc,pick)>=30)out.hc=u.hc;else out.hc='#f4f4ee'}
  if(!hOk(out.hc)||cdist(out.hc,TURF)<55){const H=[uShade(out.jc,.55),'#f4f4ee',uShade(out.jc,1.35),'#c9ced6','#d6362f'];out.hc=H.find(h=>hOk(h)&&cdist(h,TURF)>=90)||H.find(h=>hOk(h)&&cdist(h,TURF)>=55)||'#f4f4ee'}
  if(!pOk(out.pc)){const P=['#14110f','#1d3a8a','#8a1f2b','#2b2b34','#f4f4ee','#ece8dc','#2f6fe0'];out.pc=P.find(p=>p!==u.pc&&pOk(p)&&cdist(p,TURF)>=40&&cdist(p,out.jc)>=30)||'#f4f4ee'}
  return out}
function startMatch(crew){startPlay._w=0;startPlay._t=0;if(typeof owRelease==='function')owRelease();G_oppUniPending=awayUni(crew);ART.t0=0;ART.loadMs=0;ART.wdone='';ART.snapReady=null;SND.setMode('game');SPR.clear();for(const k in PW)delete PW[k];if(SAVE.pwSel&&(SAVE.pw||[]).includes(SAVE.pwSel))PW[SAVE.pwSel]=1;
  if(!TEST_STARS)for(const k of ['QB','RB','WR1','WR2']){const q=SAVE.starters[k];if(q&&q.star&&!q.special&&/Voss|Wallace|Morales|Ortiz/.test(q.name))q.star=false}   // undo the old test stars
  if(TEST_STARS)for(const k of ['QB','RB','WR1','WR2'])if(SAVE.starters[k])SAVE.starters[k].star=true;   // TEST ONLY: remove when done testing Star Play
  const FIRST_DOWN=25;
  POTG.score=0;POTG.fr=null;POTG.F=null;POTG.label='';
  G={crew,oppUni:G_oppUniPending,you:0,opp:0,target:crew.target,los:25,down:1,togo:FIRST_DOWN,ltg:25+FIRST_DOWN,style:0,maxCombo:0,plog0:PLOG.length,sp:{m:{},ready:null,left:0,cool:0},spArmed:false,dv:{plays:0,yds:0},pn:0,t0:performance.now(),sel:0,flip:false,mode:'playcall',call:'bal',clock:25,clockOn:false,showPlay:false};
  screens(null);show('#hud',true);$('#oName').textContent=crew.short;$('#yName').textContent=(SAVE.teamName||'YOU').toUpperCase();setScoreLogo();setOppLogo(crew);scoreFit();$('#tgtTag').textContent='FIRST TO '+crew.target+' WINS';$('#tY').style.setProperty('--tc',SAVE.uni.jc);$('#tO').style.setProperty('--tc',G_oppUniPending.jc);show('#setbar',false);
  gdStart(crew);goalsStart(crew);   // v3.15   // v3.00: guided first game (prompts only)
  F=null;setupField();G.mode='intro';
  if(window.triggerBroadcastWipe)window.triggerBroadcastWipe();showMatchup(crew,enterPlaycall);
}
/* The defense remembers your last calls: spam the run and they stack the box and blitz more, spam passes and they play deep and blitz more. It leans, it never locks: at most half the time. */
function pickCall(){
  const c=G.crew;let call=c.mix(G.down,G.togo,G.los);G.adapted=false;
  const h=G.hist||[];
  if(h.length>=2){
    const rec=h.slice(-ADAPT_N);let run=0,pass=0,deep=0,tot=0;
    rec.forEach((id,i)=>{const w=1+i*ADAPT_RECENCY;tot+=w;{const pk=PLAYS.find(q=>q.id===id)||{};if(pk.kind==='run')run+=w;else if(pk.kind==='pass'){pass+=w;if(pk.deepish)deep+=w}}});
    const rs=run/tot,ps=pass/tot,k=Math.min(1,rec.length/ADAPT_WARM);
    if(rs>=ADAPT_AT){if(Math.random()<Math.min(ADAPT_MAX,(rs-.5)*ADAPT_GAIN)*k){call=Math.random()<.75?'stack':'blitz';G.adapted=true}}
    else if(ps>=ADAPT_AT){if(Math.random()<Math.min(ADAPT_MAX,(ps-.5)*ADAPT_GAIN)*k){call=(G.down>=3&&G.togo>=17)?pick(['blitz','deep']):(deep/pass>.5)?pick(['deep','deep','bal']):pick(['bal','bal','deep','stack']);G.adapted=true}}   // v3.16V1: no blitz answer to quick passes except 3rd and long
  }
  if(G.los>=95&&Math.random()<GOAL_P){call='goal';G.adapted=false}else if(G.down===3&&G.togo>=10&&G.togo<=17&&!G.adapted&&Math.random()<SPY_P)call='spy';   // v3.16FF2
  if(call!=='goal'&&call!=='spy'&&!G.adapted&&h.length>=2&&h[h.length-1]===h[h.length-2]&&Math.random()<SAME_P){const pk=PLAYS.find(q=>q.id===h[h.length-1])||{};call=pk.kind==='run'?'stack':pk.deepish?'deep':'bal';G.adapted=true;G.repeat=true}   // v3.16EE3: same play twice
  return call}
/* Ratings are squeezed toward the middle during a play: a 10-point edge should be an advantage you can feel, not a different game. (The menus still show the real ratings.) */
const RATING_K=.8,TIGHT=.55,HBACK=true,HB_X=2.0,HB_Y=-3.8,WR_DBPEN=6,WR_LBBON=3,CLIMB=true,GAPOWN=true,GAPHOLD=.25,BLK_ARRIVE=4,BLK_HOLD=2.6,WROFF=.8,WRENG=2.9,BLK_BASE=.25,BLK_K=.008,RUN_LEAD=1.1,LB_READ=.05,DB_BLK=-.15,BREAK_PUR=.95,CATCH_D=30,CATCH_MAX=.2,FF_LEN=4,FF_K=.5,FF_MAX=2.8,LINE_WRAP=.07,TK_BASE=.92,TK_MIN=.62,SPR_FLOOR=1.22,BACK_LEAD=0,BACK_CLAMP=3,WR_BLKPEN=.10,PS_SHED=.07,FLEA_BITE=1.4,RAC_R=.92,RAC_D=1.12,PS_READ=.1,PS_LEAD=1,PS_DBREACT=.12,PILE_START=.55,PILE_TAP=.04,PILE_CPU=7,PILE_T=2.6,SAFE_Y=9,SAFE_ON=3.5,DB_CHASE=1.0,PS_ATTACK=-1.5,CLOSE_B=0,CLOSE_R=5,ADAPT_AT=.55,ADAPT_MAX=.5,ADAPT_N=3,ADAPT_RECENCY=1,ADAPT_WARM=3,ADAPT_GAIN=2.2;
function cmpRatings(d){const o=Object.assign({},d);for(const k of['spd','pow','hnd','blk','tkl','cov','thr','acc'])if(typeof o[k]==='number')o[k]=Math.round(73+(o[k]-73)*RATING_K);return o}
function mkP(team,role,d0,x,y){const d=cmpRatings(d0);const up=team==='O';if(up&&d){const ps=d.pos||role;if(PW.slicker&&(ps==='RB'||ps==='WR'||ps==='TE')&&typeof d.pow==='number')d.pow=clamp(d.pow+8,30,99);if(G&&G.zdPen&&/Zero Day/.test(d.n0||d.name||'')){for(const k of ['spd','hnd','pow'])if(typeof d[k]==='number')d[k]=clamp(d[k]-2,30,99)}if(PW.anchor&&ps==='OL'&&typeof d.blk==='number')d.blk=clamp(d.blk+8,30,99);if(PW.beacon&&ps==='QB'){if(typeof d.thr==='number')d.thr=clamp(d.thr+8,30,99);if(typeof d.acc==='number')d.acc=clamp(d.acc+8,30,99)}}return{team,role,d,name:d.name,pos:(d&&d.pos)||role,x,y,vx:0,vy:0,h:up?Math.PI/2:-Math.PI/2,fa:up?Math.PI/2:-Math.PI/2,ph:Math.random(),stun:0,fall:false,knock:false,dizzy:false,eng:null,engT:0,moveT:rnd(.4,.9),mode:'hold',route:null,ri:0,cdJ:0,inv:0,slow:0,tk:0,react:0,num:0,override:null,arm:0,spin:0,lunge:0,throwT:0,burst:0,moveAnim:null,beat:0,styleOn:false,styleKind:0,dash:null,sv:null,av:0,stepT:0,cutRec:9,fool:0}}
let defCount=0;
function mkDef(role,crew,call,star){
  const T=crew.T||73,o={DL:{spd:-4,pow:2,tkl:1,cov:-12},LB:{spd:-2,pow:0,tkl:1,cov:-6},DB:{spd:2,pow:-4,tkl:-2,cov:2}}[role]||{spd:0,pow:0,tkl:0,cov:0},b=0,j=()=>rnd(-2,2);
  return{name:star?crew.boss:'Def '+crew.id+' '+(defCount++%40),pos:role,star:!!star,spd:clamp(Math.round(T+o.spd+j()+b-(call==='stack'&&role==='DB'?3:0)),30,99),pow:clamp(Math.round(T+o.pow+j()+b),30,99),tkl:clamp(Math.round(T+o.tkl+j()+b),30,99),cov:clamp(Math.round(T+o.cov+j()+b),25,99),hnd:T-10,blk:30,thr:30}
}
function setupField(keepCall){
  const prev=G.call;
  G.call=keepCall?prev:pickCall();
  const fx=G.flip?-1:1;
  F={cn:{},mode:'pre',los:G.los,t:0,fx,off:{},offList:[],def:[],all:[],ball:null,ballAir:false,carrier:null,passer:null,turbo:100,tired:false,handed:false,lock:false,lat:false,latDone:false,latT:0,aim:null,gb:false,breaks:0,maxBreaks:3,stars:new Set()};
  for(const s of SLOTS){const f=FORM[s];const p=mkP('O',s,SAVE.starters[s],CX+fx*f[0],G.los+f[1]);p.num=SAVE.starters[s].jn!==undefined?SAVE.starters[s].jn:NUM[s];p.sx0=p.x;p.sy0=p.y;F.off[s]=p;F.offList.push(p);F.all.push(p);if(p.d.special)F.stars.add(p.d.special)}
  F.carrier=F.off.QB;F.passer=F.off.QB;
  const pk2=SHELL2&&G.call!=='goal',df=(pk2?DEF_FORM2:DEF_FORM)[G.call],as=(pk2?DEF_ASSIGN2:DEF_ASSIGN)[G.call],names=!pk2?['dl1','dl2','dl3','lb1','s1','db1','db2']:G.call==='deep'?['dl1','dl2','lb1','s1','s2','db1','db2']:['dl1','dl2','lb1','lb2','s1','db1','db2'];
  const spots=[...df.dl.map(p=>['DL',p]),...df.lb.map(p=>['LB',p]),...df.s.map(p=>['DB',p]),...df.db.map(p=>['DB',p])];
  spots.forEach(([role,pos],i)=>{
    const star=G.crew.captain&&names[i]==='lb1';
    const d=mkDef(role,G.crew,G.call,star);const _cs=CSTY(),_shellDy=_cs.disguise?(G.call==='blitz'?(role==='DB'?2.0:role==='LB'?.8:0):(G.call==='deep'?(role==='DB'?-1.0:0):0)):(G.call==='stack'||G.call==='blitz'||_cs.press)?(role==='DB'?-1.4:role==='LB'?-1.1:0):(G.call==='deep'?(role==='DB'?2.4:role==='LB'?1.2:0):0);const p=mkP('D',role,d,CX+pos[0]*fx,clamp(G.los+pos[1]+_shellDy,G.los+.5,108));
    p.id=names[i];p.num=star?99:pick([54,56,91,92,95,31,24,29,52,58,93]);p.react=(G.call==='stack'?.12:.2)+rnd(0,.08)+(role==='DB'?.04:0);if(CSTY().strong&&(p.id==='lb1'||p.id==='s1'))p.x+=(F.fx||1)*1.5;   // v3.16EE3: Longshoremen load the strong side

    const a=role==='DL'?((!pk2&&p.id==='dl2'&&(G.call==='bal'||G.call==='deep'))?['zone',0,3]:['rush']):as[p.id];p.mode=a[0];p.rush=a[0]==='rush';
    if(a[0]==='cover'){p.assign=a[1];p.cush=_cs.clamp?Math.max(.6,a[2]*.78):a[2]}
    if(a[0]==='zone'){p.zx=CX+a[1]*fx;p.zy=a[2]}
    F.def.push(p);F.all.push(p);
  });
  parts.length=0;
  artWarm();
  if(G&&typeof G.sel==='number')alignWRs();   // the formation for the highlighted play is already on the field when the sheet opens
}
/* v3.16MM1 F6 REPLAY. While a play is live (and for a moment after the whistle) every other step is recorded: the shallow numbers and
   flags of every player, the ball and the play. After a big play (touchdown, 20+ yd gain, interception, fumble, sack) a REPLAY button
   sits on the play sheet next to SAME PLAY. It swaps the old play back in, plays it at REPLAY.speed in the runner/ball camera, then
   puts the new play back exactly as it was. Tap anywhere to stop. The game itself is never stepped during a replay. */
const REPLAY=window.REPLAY={on:true,speed:.6,len:7,tail:1.2};
const REP={fr:[],F:null,big:false,act:null,k:0},POTG={score:0,fr:null,F:null,label:''};
function repCopy(o,seen){const r={};for(const k in o){const v=o[k];if(v===null||typeof v!=='object'){if(typeof v!=='function')r[k]=v}
  else if(F&&F.all&&F.all.includes(v))r[k]=v;else if(!Array.isArray(v)&&seen<1&&Object.getPrototypeOf(v)===Object.prototype)r[k]=repCopy(v,seen+1)}return r}
function repRec(){if(!REPLAY.on||!F||!F.all)return;if(REP.F!==F){REP.F=F;REP.fr=[];REP.big=false;REP.endT=undefined}
  if(F.mode!=='live'&&(F.t-(REP.endT||0))>REPLAY.tail)return;if(F.mode!=='live'&&REP.endT===undefined)return;
  REP.k^=1;if(REP.k)return;   // every other frame is plenty
  const fp={};for(const k in F){const v=F[k];if(k==='mode'||k==='pile')continue;if(v===null||typeof v!=='object'){if(typeof v!=='function')fp[k]=v}else if(F.all.includes(v))fp[k]=v}
  REP.fr.push({F:fp,ball:F.ball?repCopy(F.ball,0):null,p:F.all.map(p=>repCopy(p,0))});if(REP.fr.length>REPLAY.len*30)REP.fr.shift()}
function repApply(fr){for(const k in fr.F)F[k]=fr.F[k];if(fr.ball&&F.ball)Object.assign(F.ball,repCopy(fr.ball,0));F.all.forEach((p,i)=>{const s=fr.p[i];if(s)Object.assign(p,repCopy(s,0))})}
function repStart(){if(!REP.big||!REP.F||REP.fr.length<20||REP.act||!G||G.mode!=='playcall')return;
  REP.act={F,mode:G.mode,clockOn:G.clockOn,i:0,now:REP.fr[REP.fr.length-1]};G.clockOn=false;show('#sheet',false);F=REP.F;F.mode='dead';G.mode='replay';show('#repTag',true);beep(600,.05);repApply(REP.fr[0])}
function repStep(rdt){const a=REP.act;if(!a)return;a.i+=rdt*30*REPLAY.speed;const n=REP.fr.length;if(a.i>=n-1){repStop();return}repApply(REP.fr[Math.floor(a.i)])}
function repStop(){const a=REP.act;if(!a)return;repApply(a.now);REP.act=null;F=a.F;G.mode=a.mode||'playcall';G.clockOn=a.clockOn;show('#repTag',false);if(a.retScreen){show('#hud',false);screens(a.retScreen)}else{show('#sheet',true)}bmHide&&bmHide()}
function repStartPOTG(retScreen){if(!POTG.fr||POTG.fr.length<20||!POTG.F||REP.act||!G)return;
  REP.F=POTG.F;REP.fr=POTG.fr;REP.big=true;
  REP.act={F,mode:G.mode,clockOn:false,retScreen,i:0,now:POTG.fr[POTG.fr.length-1]};
  screens(null);show('#hud',true);F=POTG.F;F.mode='dead';G.mode='replay';show('#repTag',true);beep(680,.06);repApply(POTG.fr[0])}
function boxScoreHTML(){
  const ps=PLOG.slice(G&&typeof G.plog0==='number'?G.plog0:0);
  let pYds=0,rYds=0,comp=0,att=0,lng=0;
  for(const p of ps){
    if(p.tgt||p.type==='inc'||p.type==='int'){att++;if(p.comp){comp++;pYds+=p.gain}}
    else if(p.type==='tackle'||p.type==='td'||p.type==='oob'){rYds+=p.gain}
    if(p.gain>lng)lng=p.gain;
  }
  const items=[['PASS YDS',pYds],['RUSH YDS',rYds],['COMP',comp+'/'+att],['LONGEST',lng+'y'],['MAX COMBO',(G&&G.maxCombo||0)+'x'],['STYLE',Math.round(G&&G.style||0)]];
  return items.map(([k,v])=>'<div class="ui-bs-cell"><span>'+k+'</span><b>'+v+'</b></div>').join('');
}
function syncEndExtras(screenId){
  const box=$(screenId==='#steal'?'#stBox':'#endBox'),btn=$(screenId==='#steal'?'#stPOTG':'#endPOTG');
  if(box){box.innerHTML=boxScoreHTML();box.hidden=false}
  if(btn){const ok=!!(REPLAY.on&&POTG.fr&&POTG.fr.length>=20);btn.hidden=!ok;if(ok){btn.textContent='▶ PLAY OF THE GAME ('+POTG.label+')';btn.onclick=e=>{e.stopPropagation();repStartPOTG(screenId)}}}
}
$('#repBtn').onclick=e=>{e.stopPropagation();repStart()};
document.addEventListener('pointerdown',()=>{if(REP.act)setTimeout(repStop,0)},true);
function enterPlaycall(){
  setupField();G.mode='playcall';F.mode='pre';
  show('#hud',true);show('#ctl',false);show('#turboWrap',false);show('#turboLbl',false);show('#setbar',false);G.clockOn=false;
  resetJoy();
  if(G.down===4){if(SND.pa)SND.pa('pa_4th','FOURTH DOWN!');showFourth()}else{
    if(Math.max(G.you||0,G.opp||0)>=(G.target||15)-7&&!G._mpAnnounced){G._mpAnnounced=1;if(SND.pa)SND.pa('pa_mp','MATCH POINT!')}
    else if(G.los>=80&&!G._rzAnnounced){G._rzAnnounced=1;if(SND.pa)SND.pa('pa_rz','RED ZONE!')}
    showSheet()}
}
function showSheet(){
  show('#fourth',false);show('#sheet',true);show('#setbar',false);G.mode='playcall';G.clock=25;G.clockOn=!G.guide1;   // v3.00: no play clock on a new player's first drive
  $('#shDD').textContent=ddText().toUpperCase();
  buildCards();updateGBBtn();$('#flipBtn').classList.toggle('on',G.flip);
  {const r=$('#repBtn');if(r)r.hidden=!(REPLAY.on&&REP.big&&REP.fr.length>=20)}{const b=$('#sameBtn'),i=G.lastId?PLAYS.findIndex(p=>p.id===G.lastId):-1;b.hidden=i<0||!!G.guide1;if(i>=0)b.innerHTML='SAME PLAY<small>'+PLAYS[i].name+'</small>'}   // v3.13 C: re-call the last play and snap in one tap
  gdTip('call','PICK ANY PLAY, THEN TAP CALL PLAY · NO PLAY CLOCK THIS DRIVE',5000,'low');gdStar();
}
/* STAR PLAY: only a star player can have one. Two explosive plays by the same star on one drive make it ready; it stays ready for 3 plays, then it is gone. */
const TEST_STARS=false,SP_YARDS=20,SP_PLAYS=3,SP_CINE=1.0;
/* STAR METER (per star player, 0-100). TUNE: SP_BIG = a 20+ yard play (4 fill it), SP_YD = per yard gained, SP_FD/SP_TD = bonuses, SPK = multiplier on style points (broken tackles, ankle breakers, STYLE running), SP_CAP = most a single play can add, SP_REP = credit when the same play was one of your last two calls, drains: SP_LOSS (lost yards), SP_TO (turnover), SP_INC (incomplete to him). */
const SP_BIG=25,SP_YD=.6,SP_FD=4.5,SP_TD=8,SPK=2.2,SP_CAP=50,SP_REP=.8,SP_LOSS=4,SP_TO=20,SP_INC=2,SP_QB=10;
const starsOnO=()=>SLOTS.map(k=>SAVE.starters[k]).filter(q=>q&&(q.star||q.special));
const lastNm=n=>String(n||'').split(' ').slice(-1)[0].toUpperCase();
function spNewDrive(){if(G)G._rzAnnounced=0}   // star meters carry across drives; they only clear when that star's play is earned
function spFeed(v){const c=F&&F.carrier;if(!c||!(c.d.star||c.d.special)||c.team!=='O')return;(F.spAcc=F.spAcc||{})[c.d.name]=((F.spAcc||{})[c.d.name]||0)+v*SPK}   // style points go into the carrier's meter
function updateGBBtn(){
  const b=$('#gbBtn'),st=starsOnO(),sp=G.sp,ready=!!sp.ready;
  if(!ready)G.spArmed=false;
  if(!st.length){b.className='none';b.innerHTML='\u2605 STAR PLAY<br>NO STAR';return}
  const rows=st.map(x=>({n:x.name,c:Math.round(sp.m[x.name]||0),r:sp.ready===x.name})).sort((a,b)=>(b.r-a.r)||(b.c-a.c));
  b.className=ready?(G.spArmed?'on':'ready'):'multi';
  if(ready)b.classList.add('multi');
  b.innerHTML=rows.map(o=>{const tag=o.r?(G.spArmed?'ARMED':'TAP \u00d7'+sp.left):o.c+'%';
    return '<span class="sr'+(o.r?' rd':'')+'"><b>'+lastNm(o.n)+'</b><u><i style="width:'+(o.r?100:o.c)+'%"></i></u><em>'+tag+'</em></span>'}).join('')}
function activateStar(c){
  XLOG.star.push({k:'use',kind:'run',nm:lastNm(c.d.name),p:(G.pn||0)+1});F.spKind='run';
  F.gb=true;F.breaks=0;F.maxBreaks=c.d.special==='bulldozer'?3:1;F.spWait=false;F.spUsed=true;G.sp.ready=null;G.spArmed=false;
  fxText('\u2605 STAR PLAY! \u2605','#ffd23a');flashT=.5}
$('#gbBtn').onclick=()=>{if(G.sp.ready){G.spArmed=!G.spArmed;SND.fx('gbArm');updateGBBtn()}};
$('#flipBtn').onclick=()=>{G.flip=!G.flip;beep(500,.05);setupField(true);F.mode='pre';G.mode='playcall';show('#sheet',true);show('#setbar',false);buildCards(true);$('#flipBtn').classList.toggle('on',G.flip)};
function ddText(){const d=Math.max(1,Math.min(G.togo,100-G.los));return ORD[clamp(G.down,1,4)]+' & '+(100-G.los<=25&&G.togo>=100-G.los?'Goal':Math.ceil(d))}
function showFourth(){
  show('#sheet',false);show('#fourth',true);
  const dist=Math.ceil(Math.min(G.togo,100-G.los));
  $('#f4txt').textContent='4th & '+dist+' at '+spotTxt(G.los)+'. '+(G.crew.id==='captain'?'He likes to stack the box here.':'Your call.');
  const fgd=100-G.los+17;$('#f4fg').disabled=fgd>58;$('#f4fg').textContent='FIELD GOAL'+(fgd>58?'':' ('+Math.round(clamp(1.5-fgd*.02,.15,.95)*100)+'%)');
}
$('#fourth').addEventListener('click',e=>{
  const a=e.target.dataset&&e.target.dataset.a;if(!a)return;beep(300,.08);
  show('#fourth',false);
  XLOG.fourth.push({a,togo:Math.ceil(G.togo),los:G.los});glog('4TH DOWN: chose '+a.toUpperCase()+' (4th & '+Math.ceil(G.togo)+' at '+G.los+')');
  if(a==='go'){showSheet();return}
  if(a==='fg'){const d=100-G.los+17;const ok=Math.random()<clamp(1.5-d*.02,.15,.95);
    G.mode='dead';
    if(ok){G.dvRes='fg';say('FIELD GOAL IS GOOD!','+3',1400,()=>{G.you+=3;afterScore(false)});beep(660,.2)}
    else{G.dvRes='fg miss';say('NO GOOD!','Clanked off the pole',1500,()=>turnover(G.los))}
    try{window.CF3D&&CF3D.kkKick&&CF3D.kkKick(ok,ok?1400:1500)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}   // v3.29T: look only
  if(a==='punt'){G.dvRes='punt';G.mode='dead';const net=Math.round(rnd(30,44));let s=G.los+net;say('PUNT','Booms it '+net+' yards',1300,()=>{oppDrive(s>=100?20:100-s)});try{window.CF3D&&CF3D.kkKick&&CF3D.kkKick(true,1300,'punt')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
});
setInterval(()=>{const b=document.getElementById('cards'),sh=document.getElementById('sheet');if(b&&sh&&!sh.hidden)b.classList.toggle('more',b.scrollWidth>b.clientWidth+6&&b.scrollLeft+b.clientWidth<b.scrollWidth-6)},400);   // fade the right edge while more cards are off-screen
const PB_GRP={flea:'TRICK',draw:'TRICK',counter:'TRICK',dmove:'TRICK'};   // v2.84 playbook groups: misdirection plays live under TRICK
const pbGrp=pl=>PB_GRP[pl.id]||pl.tag;
const PB={tab:'ALL',pg:0};
const PB_MIN={w:96,h:64};   // v3.16LL1 TUNE (F8): smallest card size (was 130 x 76); 96 wide (v3.16MM1) so 21 fit on an 852 x 393 screen
const favs=()=>(SAVE.favs||(SAVE.favs=[]));
function favToggle(id){const f=favs(),k=f.indexOf(id);if(k<0)f.push(id);else f.splice(k,1);persist();beep(k<0?660:330,.05)}
const PB_ICO={ALL:'<rect x="5" y="5" width="13" height="13" rx="3"/><rect x="22" y="5" width="13" height="13" rx="3"/><rect x="5" y="22" width="13" height="13" rx="3"/><rect x="22" y="22" width="13" height="13" rx="3"/>',
 RUN:'<path d="M5 33 Q18 33 22 21 T35 7" fill="none" stroke-width="4" stroke-linecap="round"/><path d="M26 6 L36 6 L35 16" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
 PASS:'<ellipse cx="20" cy="22" rx="14" ry="9" transform="rotate(-30 20 22)"/><path d="M15 25 L25 19 M17 20 l3 5 M21 18 l3 5" stroke="#1d1915" stroke-width="2.4" fill="none"/>',
 FAV:'<path d="M20 4 L25 15 L37 16 L28 24 L31 36 L20 30 L9 36 L12 24 L3 16 L15 15 Z"/>',
 TRICK:'<path d="M10 8 H30 V27 H10 Z"/><rect x="4" y="27" width="32" height="5" rx="2"/><rect x="10" y="21" width="20" height="4" fill="#1d1915"/>'};
function pbTabs(){
  const box=$('#pbTabs');
  if(!box.dataset.built){box.dataset.built=1;if(favs().length)PB.tab='FAV';for(const t of['FAV','ALL','RUN','PASS','TRICK']){const b=document.createElement('button');b.className='pbTab';b.dataset.t=t;
    b.innerHTML='<svg viewBox="0 0 40 40" fill="currentColor" stroke="currentColor">'+PB_ICO[t]+'</svg><span><b>'+t+'</b><small></small></span>';
    b.onclick=()=>{if(PB.tab===t)return;PB.tab=t;PB.pg=0;beep(520,.04);const L=pbList();if(L.length)G.sel=L[0];buildCards(true)};box.appendChild(b)}}
  for(const b of box.children){const t=b.dataset.t,n=t==='ALL'?PLAYS.length:t==='FAV'?PLAYS.filter(p=>favs().includes(p.id)).length:PLAYS.filter(p=>pbGrp(p)===t).length;b.classList.toggle('on',PB.tab===t);b.disabled=!n&&t!=='FAV';b.querySelector('small').textContent=(t==='FAV'&&!n)?'TAP \u2606':n+(n===1?' PLAY':' PLAYS')}}
function pbList(){return PLAYS.map((p,i)=>i).filter(i=>PB.tab==='ALL'||(PB.tab==='FAV'?favs().includes(PLAYS[i].id):pbGrp(PLAYS[i])===PB.tab))}
function pbFit(w,h){return{cols:3,rows:2,n:6}}
function buildCards(redraw){
  const box=$('#cards');playsSync(box);
  if(!(G.sel>=0&&G.sel<PLAYS.length))G.sel=0;
  let L=pbList();if(!L.length&&PB.tab!=='FAV'){PB.tab='ALL';L=pbList()}
  pbTabs();
  const nav=$('#pbNav'),W=$('#pbGrid').getBoundingClientRect().width||600,H=$('#pbMain').getBoundingClientRect().height||200;   // measure the steady box, not the grid (it shrinks when the page arrows show)
  let f=pbFit(W,H);if(L.length>f.n)f=pbFit(W,H-34);PB.key=pbKey();
  const pages=Math.max(1,Math.ceil(L.length/f.n));
  if(!redraw&&L.includes(G.sel))PB.pg=Math.floor(L.indexOf(G.sel)/f.n);   // reopen on the page with the play you last picked
  PB.pg=clamp(PB.pg,0,pages-1);
  nav.hidden=true;
  box.style.gridTemplateColumns='repeat('+f.cols+',minmax(0,1fr))';box.style.gridTemplateRows='none';
  box.innerHTML='';box.dataset.built=1;
  for(const i of L){const pl=PLAYS[i],wrap=document.createElement('div'),c=document.createElement('div'),fav=document.createElement('button');wrap.className='cardWrap';c.className='card';c.dataset.i=i;
    const fv=favs().includes(pl.id);c.innerHTML='<b><span>'+pl.name+'</span></b><canvas width="168" height="124"></canvas>';
    fav.type='button';fav.className='fav'+(fv?' on':'');fav.setAttribute('aria-label','favourite');fav.setAttribute('aria-pressed',fv?'true':'false');fav.textContent=fv?'★':'☆';
    fav.onclick=e=>{e.preventDefault();e.stopPropagation();favToggle(pl.id);buildCards(true)};
    c.onclick=()=>{G.sel=i;beep(500,.04);updateSel();callPlay()};wrap.append(c,fav);box.appendChild(wrap);drawCard(c.querySelector('canvas'),pl,G.flip?-1:1)}
  if(PB.tab==='FAV'&&!L.length){box.innerHTML='<div class="favEmpty">No favourites yet. Tap the \u2606 on any play card to add it here.</div>'}
  updateSel();
}
$('#pbPrev').onclick=()=>{PB.pg--;beep(440,.04);buildCards(true)};$('#pbNext').onclick=()=>{PB.pg++;beep(440,.04);buildCards(true)};
function pbKey(){const W=$('#pbGrid').getBoundingClientRect().width,H=$('#pbMain').getBoundingClientRect().height;if(!W||!H)return '';const L=pbList();let f=pbFit(W,H);if(L.length>f.n)f=pbFit(W,H-34);return f.cols+'x'+f.rows}
setInterval(()=>{if(typeof G==='undefined'||!G||$('#sheet').hidden)return;const k=pbKey();if(k&&k!==PB.key)buildCards(true)},250);   // the sheet was measured while hidden, or the phone turned: lay the cards out again
function updateSel(){
  if(G&&F&&G.mode==='playcall')alignWRs();
  document.querySelectorAll('#cards .card').forEach(c=>c.classList.toggle('sel',+c.dataset.i===G.sel));
  $('#blurb').textContent=PLAYS[G.sel].name+'. '+PLAYS[G.sel].blurb;
}
function drawCard(cvs,pl,fx){
  const c=cvs.getContext('2d'),w=cvs.width,h=cvs.height;
  const X=x=>w/2+x*fx*(w/(FW+6)),Y=y=>h-14-(y+9)*(h-24)/34;
  c.fillStyle='#3a362c';c.fillRect(0,0,w,h);c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=1;c.beginPath();c.moveTo(0,Y(0));c.lineTo(w,Y(0));c.stroke();
  c.fillStyle='rgba(255,255,255,.35)';for(const [x,y] of (SHELL2?[[DLX2[0],1.3],[DLX2[1],1.3],[-2.6,6.5],[2.6,6.5],[0,14]]:[[DLX[0],1.3],[DLX[1],1.3],[DLX[2],1.3],[-2.6,5],[2.6,5]]).concat([[-WSP[0],6],[WSP[1],6]])){c.beginPath();c.arc(w/2+x*fx*(w/(FW+6)),Y(y),3,0,7);c.fill()}
  const col={QB:'#fff',RB:'#ff8ad8',WR1:'#ffd23a',WR2:'#4dd0e1',TE:'#7be07b',OL1:'#bbb',OL2:'#bbb'};
  const fpos=k=>(k==='WR1'||k==='WR2')?runSpot(k,pl,1,FORM[k][0],FORM[k][1],pl.kind==='run'):FORM[k];
  c.lineWidth=3;c.lineJoin='round';
  if(pl.routes)for(const r in pl.routes){const f=fpos(r);c.strokeStyle=col[r];c.beginPath();c.moveTo(X(f[0]),Y(f[1]));for(const p of pl.routes[r])c.lineTo(X(f[0]+p[0]*LAT),Y(Math.min(f[1]+p[1],12)));c.stroke()}
  if(pl.arrow){c.strokeStyle='#ff8ad8';c.setLineDash([6,4]);c.beginPath();pl.arrow.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(Math.min(p[1],12))):c.moveTo(X(p[0]),Y(p[1])));c.stroke();c.setLineDash([])}
  for(const s of SLOTS){const f=fpos(s);c.fillStyle=col[s];c.beginPath();c.arc(X(f[0]),Y(f[1]),4.5,0,7);c.fill()}
}
/* Step one: pick a play and tap CALL PLAY. The camera drops in behind the offense. Step two: SHOW PLAY if you want the routes drawn on the field, then HIKE. */
/* run plays: the receivers walk in tight before the hike (to crack the linebackers); on any other play they split back out */
function alignWRs(){
  const pl=PLAYS[G&&G.sel];if(!F||!F.off||!pl||F.mode!=='pre')return;
  const tight=pl.kind==='run';
  for(const k of['WR1','WR2']){const w=F.off[k];if(!w)continue;if(w.fx0===undefined){w.fx0=w.sx0;w.fy0=w.sy0}
    const sp=runSpot(k,pl,F.fx,w.fx0-CX,w.fy0-G.los,tight);
    w.x=w.sx0=CX+sp[0];w.y=w.sy0=G.los+sp[1];w.wTx=w.x;w.wTy=w.y;w.vx=w.vy=0;w._motionFlip=false}
}
/* Where a receiver stands. Run plays: the one away from the run comes across as a wing back / second tight end off the line, the other one tucks in tight. Used for the live field and for the play-sheet pictures. */
function runSpot(k,pl,fx,dx,dy,tight){
  if(!tight)return[dx,dy];
  const strong=(pl.aim&&pl.aim[0]<0?-1:1)*fx;
  if(HBACK&&dx*strong<0)return[strong*HB_X,HB_Y];
  return[dx*TIGHT,dy];
}
function callPlay(){
  if(!G||G.mode!=='playcall'||$('#sheet').hidden)return;
  alignWRs();
  G.mode='set';G.showPlay=false;show('#sheet',false);show('#setbar',true);$('#showBtn').innerHTML='SHOW<br>PLAY';$('#showBtn').classList.remove('on');beep(400,.06);
  gdTip('hike','TAP HIKE! TO SNAP THE BALL',4000);
}
$('#callBtn').onclick=callPlay;
$('#sameBtn').onclick=()=>{if(!G||G.mode!=='playcall'||$('#sheet').hidden)return;const i=PLAYS.findIndex(p=>p.id===G.lastId);if(i<0)return;G.sel=i;callPlay();startPlay()};   // v3.13 C
$('#changeBtn').onclick=()=>{if(G.mode!=='set')return;G.mode='playcall';show('#setbar',false);show('#sheet',true);beep(300,.05)};
$('#showBtn').onclick=()=>{G.showPlay=!G.showPlay;$('#showBtn').innerHTML=G.showPlay?'HIDE<br>PLAY':'SHOW<br>PLAY';$('#showBtn').classList.toggle('on',G.showPlay);beep(500,.04)};
const hikeBtn=$('#hike');let hikeStamp=0;const fireHike=()=>{const now=performance.now();if(now-hikeStamp<250)return;hikeStamp=now;startPlay()};
hikeBtn.addEventListener('pointerup',e=>{if(e.button===0)fireHike()});
hikeBtn.onclick=fireHike;
hikeBtn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fireHike()}});

/* ============================ snap ============================ */
const qbRange=q=>Math.max(8,((q.d.thr||60)-24)*.5);
function startPlay(){
  if(typeof r2ZdCheck==='function'&&r2ZdCheck())return;
  if(G.mode!=='playcall'&&G.mode!=='set')return;
  if(!$('#fourth').hidden)return;   // 4th-down choice is open: no snap until they pick
  const artOK=artReady(),carryOK=carryReady();if(!artOK||!carryOK){if(!startPlay._t)startPlay._t=performance.now();startPlay._w=(startPlay._w||0)+1;ART.snapWait=Math.round(performance.now()-startPlay._t);setTimeout(startPlay,50);return}
  const R=ART.run,missing=R.need.slice(0,R.need.n0||0).filter(([pal,vk])=>!R.ready.has(pal.key+'|'+vk)).length;ART.snapWait=startPlay._t?Math.round(performance.now()-startPlay._t):0;ART.snapReady={artReady:artOK,carryReady:carryOK,missing,waitMs:ART.snapWait,at:Math.round(performance.now())};tmark('snap','waited '+ART.snapWait+'ms');startPlay._w=0;startPlay._t=0;   // never snap the ball while the new sprites are still loading
  G.clockOn=false;show('#setbar',false);if(G.guide)gdHide();
  const pl=PLAYS[G.sel];PLAY=pl;G.lastId=pl.id;F.stunt=pl.kind==='pass'&&G.call==='blitz'&&Math.random()<STUNT_P;F.jam=pl.kind==='pass'&&G.call==='blitz';if(F.stunt){const q=F.def.find(x=>x.id==='dl2');if(q)q.noEng=STUNT_T+.35}SND.fx('hike');(G.hist||(G.hist=[])).push(pl.id);if(G.hist.length>12)G.hist.shift();
  const fx=F.fx;
  F.mode='live';F.t=0;F.turbo=100;G.mode='live';
  const run=pl.kind==='run'||pl.kind==='flea';
  let rk=1;if(pl.routes){let md=0;for(const r in pl.routes)for(const q of pl.routes[r])md=Math.max(md,q[1]);const reach=qbRange(F.off.QB)*.92-5;if(md>reach)rk=Math.max(.4,reach/md)}   // routes shrink to fit what his arm can reach
  for(const s of SLOTS){const p=F.off[s];p.route=null;p.ri=0;p.mode='hold';p.tgt=null;p.tgtT=0;
    const _mfx=p._motionFlip?-fx:fx;if(pl.routes&&pl.routes[s]){p.route=pl.routes[s].map(r=>[clamp(p.sx0+_mfx*r[0]*LAT,2,FW-2),Math.min(p.sy0+r[1]*rk,109)]);p.mode='route'}
    else if(s==='QB')p.mode='hold';
    else if(s==='RB'&&run)p.mode='hold';
    else if(s.startsWith('OL'))p.mode=run?'block':'hold';
    else p.mode='block';
  }
  if(pl.kind==='run')for(const k of['WR1','WR2']){const w=F.off[k];if(w.wTx!==undefined){w.x=w.wTx;w.y=w.wTy}w.vx=0;w.vy=0}   // run plays: receivers get a running start toward the linebackers (they stack in tight)
  F.carrier=F.off.QB;F.passer=F.off.QB;
  if(!run){   // pass protection: line up each blocker with a rusher before the snap
    const bl=SLOTS.map(k=>F.off[k]).filter(o=>o.mode==='hold'&&o.role!=='QB').sort((a,b)=>a.x-b.x),ru=F.def.filter(d=>d.rush).sort((a,b)=>a.x-b.x);
    bl.forEach((b,i)=>{b.tgt=ru.length?ru[Math.round(i*(ru.length-1)/Math.max(1,bl.length-1))]:null})}
  if(run){F.lock=true;F.passer=null;F.aim={x:CX+fx*pl.aim[0],y:G.los+pl.aim[1]}}
  {const C=F.off.OL1;F.snap={t:0,T:.3,from:{x:C.x,y:C.y+.4}};F.lock=true}   // the center snaps it back to the QB
  F.spAcc={};{const h=G.pHist||(G.pHist=[]);F.spRep=h.slice(-2).includes(PLAY.id);h.push(PLAY.id);if(h.length>6)h.shift()}
  F.spUsed=false;F.spWait=false;F.spName=null;F.snap2={down:G.down,togo:Math.ceil(G.togo),los:G.los,armed:!!G.spArmed,ready:!!G.sp.ready};
  if(G.spArmed&&G.sp.ready){F.spWait=true;F.spName=G.sp.ready;fxText('\u2605 STAR PLAY ARMED','#ffd23a')}
  resetJoy();
  show('#sheet',false);show('#ctl',true);show('#turboWrap',true);show('#turboLbl',true);buildThrow();
}
function buildThrow(){
  const t=$('#thr');t.innerHTML='';
  BTN.forEach(([r,l])=>{const b=document.createElement('button');b.style.borderColor=ROLECOL[r];b.style.color=ROLECOL[r];b.innerHTML=l+'<small>'+(r==='WR1'||r==='WR2'?'WR':r)+'</small>';
    b.addEventListener('pointerdown',e=>{e.preventDefault();throwTo(r)});t.appendChild(b)});
}

/* ============================ effects ============================ */
function dust(x,y,n,pw){for(let i=0;i<n;i++){const a=Math.random()*TAU,sp=rnd(.6,2.6)*(pw||1);parts.push({kind:'dust',x:x+Math.cos(a)*.3,y:y+Math.sin(a)*.3,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,z:0,vz:rnd(.4,1.6),t:0,life:rnd(.5,1),r:rnd(.45,1.1)*(pw||1),col:pick(['#cdbb9c','#b8a584','#a39378','#dccfb4'])})}}
function ring(x,y,pw,col){parts.push({kind:'ring',x,y,t:0,life:.32,r:pw||1,col:col||'#fff'})}
function sparks(x,y,n,col){for(let i=0;i<n;i++){const a=Math.random()*TAU;parts.push({kind:'spark',x,y,vx:Math.cos(a)*rnd(3,7),vy:Math.sin(a)*rnd(3,7),z:.8,vz:rnd(1,3),t:0,life:rnd(.25,.45),col:col||'#ffd23a'})}}
function updParts(dt){for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.t+=dt;if(p.t>=p.life){parts.splice(i,1);continue}if(p.kind!=='ring'){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=Math.exp(-3*dt);p.vy*=Math.exp(-3*dt);p.z+=p.vz*dt;p.vz-=(p.kind==='spark'?9:-.3)*dt}}}
function ragdoll(d,vx,vy,spin,t){if(d.eng)releaseDef(d);d.fallV=FALLS?1:0;d.fall=true;d.knock=true;d.stun=t;d.sv={x:vx,y:vy};d.av=spin;d.vx=d.vy=0;d.dizzy=false}

/* ============================ movement ============================ */
function drive(p,dh,ts,dt,turnMax){
  let s=Math.hypot(p.vx,p.vy);
  if(dh!==null&&ts>0){
    const diff=angDiff(p.h,dh);
    const tr=(turnMax||9)*(1-(p.turnLoss!==undefined?p.turnLoss:.45)*clamp(s/8,0,1));   // v3.13 B8: the carrier keeps more of his turn at speed (AI unchanged)
    p.h+=clamp(diff,-tr*dt,tr*dt);
    ts*=Math.max(.3,Math.cos(diff*.9));
  }else ts=0;
  const acc=ts>s?(p.accUp||15):26;   // v3.13 B8: the carrier's first step bites (AI unchanged; braking stays 26)
  s+=clamp(ts-s,-acc*dt,acc*dt);
  p.vx=Math.cos(p.h)*s;p.vy=Math.sin(p.h)*s;
  p.x+=p.vx*dt;p.y+=p.vy*dt;
  p.ph+=s*dt/(1.9+s*.14);
}
const RATED_CAP=window.RATED_CAP={on:true};   // v3.16PP1 (user): nobody the computer moves runs faster than his rating
function seek(p,x,y,sp,dt,arrive,turn){
  const dx=x-p.x,dy=y-p.y,d=Math.hypot(dx,dy);
  if(d<.3){drive(p,null,0,dt);return true}
  let v=sp*(p.burst>0?1.4:1);if(RATED_CAP.on&&p.d&&p.d.spd!==undefined)v=Math.min(v,baseSpd(p.d.spd)*starBoost(p));
  drive(p,Math.atan2(dy,dx),v,dt,turn||9);
  return d<(arrive||.3);
}
const psOut=d=>!!(isRun()&&F.aim&&Math.abs(F.aim.x-CX)>3&&(d.pos==='LB'||d.pos==='DB')&&(d.x-CX)*Math.sign(F.aim.x-CX)>=-1);   // a defender on the side the outside run is going
const starBoost=p=>(F&&F.gb&&p.d.special==='hailmary')?1.4:1;
const baseSpd=v=>3.3+v*.037;   // rating 60 is about 5.5, rating 90 is about 6.6
const JAM={on:true,t:.45,k:.55},PRESS={r:3.5,k:1.4};   // TUNE v3.16NN1 (E16): on a Blitz call the corners press: receivers run at k of their speed for the first t s. A throw with a free rusher inside r yd misses by up to 1+k times as much
const recSpeed=p=>baseSpd(p.d.spd)*starBoost(p)*((JAM.on&&F&&F.jam&&(p.role==='WR1'||p.role==='WR2')&&F.t<JAM.t)?JAM.k:1);
const defSpeed=d=>baseSpd(d.d.spd);   // v3.16PP1: rating speed (was x.96 and a fade on long plays)

const INBUF={action:null,arg:null,until:0};
const INPUT_BUFFER_MS=150,LOS_COYOTE_T=.12;
function bufferInput(action,arg){INBUF.action=action;INBUF.arg=arg;INBUF.until=performance.now()+INPUT_BUFFER_MS}
function consumeBufferedInput(){
  if(!INBUF.action)return;
  if(performance.now()>INBUF.until){INBUF.action=null;return}
  const act=INBUF.action,arg=INBUF.arg;INBUF.action=null;
  if(act==='juke')doJuke(arg,true);
  else if(act==='stiff')doStiff(true);
  else if(act==='spin')doSpin(true);
  else if(act==='hurdle')doHurdle(true);
  else if(act==='throw')throwTo(arg,true);
}
function timingBonus(d,lo,hi){return(d>=lo&&d<=hi)?.18:0}

function comboLink(kind,c){
  if(!F||!c)return 1;
  const now=F.t||0,cb=F.combo||(F.combo={n:0,last:'',until:0});
  if(now<=cb.until&&cb.last&&cb.last!==kind){cb.n=Math.min(4,cb.n+1)}
  else if(now>cb.until){cb.n=1}
  cb.last=kind;cb.until=now+2.6;
  if(G&&cb.n>(G.maxCombo||0))G.maxCombo=cb.n;
  if(cb.n>=2){
    const lbl=cb.n>=3?'ON FIRE! x'+cb.n:'COMBO x'+cb.n;
    const col=cb.n>=3?'#ffd23a':'#38c6d9';
    popup(lbl,c.x,c.y+2.2,col);
    addStyle(cb.n*6,lbl,c.x,c.y+2.2,col);
    SND.beep(520+cb.n*110,.09,'triangle',.06);
    if(cb.n>=3&&!cb._firePA){cb._firePA=1;if(SND.pa)SND.pa('pa_fire',"HE'S ON FIRE!")}
  }
  return cb.n;
}
function doMotion(){
  if(!G||G.mode!=='set'||!F||F.mode!=='pre'||F._motioned)return;
  const wr=F.off&&F.off.WR1;if(!wr)return;
  F._motioned=true;
  const targetX=clamp(wr.x<CX?CX+6:CX-6,3,FW-3);
  wr.x=targetX;wr.sx0=targetX;wr.wTx=targetX;wr._motionFlip=true;
  let followed=false;
  for(const d of F.def){
    if(d.mode==='cover'&&d.assign==='WR1'){d.x=clamp(targetX+(d.x>CX?-.6:.6),2,FW-2);followed=true}
  }
  SND.fx('ok');haptic('light');
  fxText(followed?'MOTION READ: MAN COVERAGE':'MOTION READ: ZONE COVERAGE',followed?'#38c6d9':'#ffd23a');
  if(window.A11Y)window.A11Y.caption(followed?'MAN COVERAGE':'ZONE COVERAGE');
}
function doAudible(){
  if(!G||G.mode!=='set'||!F||F.mode!=='pre'||!PLAYS||PLAYS.length<2)return;
  const cur=PLAYS[G.sel],wantPass=cur&&cur.kind==='run';
  let idx=-1;
  for(let off=1;off<=PLAYS.length;off++){const i=(G.sel+off)%PLAYS.length,p=PLAYS[i];if(wantPass?(p.kind==='pass'):(p.kind==='run')){idx=i;break}}
  if(idx<0)idx=(G.sel+1)%PLAYS.length;
  G.sel=idx;PLAY=PLAYS[idx];setupField();G.mode='set';
  SND.fx('ok2');haptic('light');
  fxText('AUDIBLE: '+(PLAY.name||'NEW PLAY').toUpperCase(),'#ffd23a');
  if(window.A11Y)window.A11Y.caption('AUDIBLE CALLED');
}

function stepLive(dt){
  if(F.spWait&&!F.gb){const c0=F.carrier;if(c0&&!F.ballAir&&c0.d.name===F.spName&&(c0.role!=='QB'||c0.y>F.los+1))activateStar(c0)}
  const pl=PLAY;F.t+=dt;
  if(F.snap){F.snap.t+=dt;if(F.snap.t>=F.snap.T){F.snap=null;if(!(pl.kind==='run'||pl.kind==='flea'))F.lock=false}}
  if(!F.lock&&!F.ballAir)consumeBufferedInput();
  for(const p of F.all){
    if(p.cdH>0)p.cdH-=dt;if(p.hurdle&&!p.air)p.hurdle=false;
    if(p.cdJ>0)p.cdJ-=dt;if(p.inv>0)p.inv-=dt;if(p.slow>0)p.slow-=dt;if(p.tk>0)p.tk-=dt;if(p.arm>0){p.arm-=dt;if(p.arm<=0&&p===F.carrier&&p.armHit&&!p.armHit.size)armMiss(p)}if(p.spin>0)p.spin-=dt;if(p.cdS>0)p.cdS-=dt;if(p.spinT>0){p.spinT-=dt;if(p.spinT<=0&&p===F.carrier)spinEnd(p)}if(p.lunge>0)p.lunge-=dt;if(p.throwT>0)p.throwT-=dt;if(p.burst>0)p.burst-=dt;if(p.beat>0)p.beat-=dt;
    if(p.moveAnim){p.moveAnim.t-=dt;if(p.moveAnim.t<=0)p.moveAnim=null}
    if(p.stun>0){p.stun-=dt;if(p.stun<=0){p.fall=false;p.knock=false;p.dizzy=false;p.sv=null;p.av=0}}
    if(p.sv){p.x+=p.sv.x*dt;p.y+=p.sv.y*dt;const f=Math.exp(-4.2*dt);p.sv.x*=f;p.sv.y*=f;if(Math.hypot(p.sv.x,p.sv.y)<.25)p.sv=null}
    if(p.av){p.fa+=p.av*dt;p.av*=Math.exp(-2.6*dt)}
  }
  const QB=F.off.QB,RB=F.off.RB;
  if((pl.kind==='run'||pl.kind==='flea')&&!F.handed){
    const side=RB.x>=QB.x?1:-1;seek(RB,QB.x+side*.85,QB.y+.1,5.4,dt,.3);   // meet the QB first, then take the ball
    if(!F.snap&&F.t>=Math.max(.3,pl.hand)&&dist(RB,QB)<1.3){F.handed=true;F.lock=false;F.carrier=RB;SND.fx('handoff')}
  }
  if(pl.kind==='flea'&&F.handed&&!F.lat&&F.t>=pl.lat){F.lat=true;F.latT=0;F.latFrom={x:RB.x,y:RB.y};F.carrier=null;RB.mode='block';F.lock=true;RB.styleOn=false}
  if(F.lat&&!F.latDone){F.latT+=dt;if(F.latT>=.45){if(Math.random()<.1&&!F.gb){F.latDone=true;F.latAt=F.t;F.lock=false;F.carrier=QB;F.passer=QB;startPile(QB,null);return}F.noThrow=F.t+.5;F.latDone=true;F.latAt=F.t;F.lock=false;F.carrier=QB;F.passer=QB;QB.vx=QB.vy=0;   /* v3.14 (user): no FLEA FLICKER! callout (it covered the receivers) */for(const d of F.def){if(d.mode==='cover'||d.pos==='DB'){d.fool=.4;d.foolAt={x:d.x,y:d.y-1.2}}}}}
  moveCarrier(dt);
  if(F.passer&&F.carrier===F.passer&&!F.ballAir){if(F.passer.y>F.los+.35){F.losOverT=(F.losOverT||0)+dt;if(F.losOverT>LOS_COYOTE_T){F.passer=null;popup('PAST THE LINE',F.carrier.x,F.carrier.y+1.6,'#cfd3d6')}}else{F.losOverT=0}}
  if(isRun()){F.assT=(F.assT||0)-dt;if(F.assT<=0){F.assT=.2;assignBlocks()}}
  for(const p of F.offList)aiOff(p,dt);
  engageCheck();updEng(dt);
  for(const d of F.def)aiDef(d,dt);
  separate();
  updFacing(dt);
  if(F.ballAir){const b=F.ball;b.t+=dt;const k=clamp(b.t/b.T,0,1);b.cur={x:b.from.x+(b.to.x-b.from.x)*k,y:b.from.y+(b.to.y-b.from.y)*k,h:b.t<0?1.4:1.4*(1-k)+Math.sin(Math.PI*k)*clamp(b.len*.22,1.5,7)*(b.bullet?.42:1.15)};if(b.t>=b.T)resolveCatch()}
  if(F.mode!=='live')return;
  contacts(dt);
  if(F.mode!=='live')return;
  const c=F.carrier;
  if(c&&!F.ballAir){
    if(!F._gotFirst&&G&&G.ltg<=100&&c.y>=G.ltg&&c.y<100){F._gotFirst=true;popup('1ST DOWN!',c.x,c.y+1.8,'#ffd23a');ring(c.x,G.ltg,1.4,'#ffd23a');SND.fx('ok2');haptic('light')}
    if(c.y>=100){const _yds=Math.max(1,Math.round(100-F.los)),_nm=String((c.d&&c.d.name)||c.role).split(' ').pop().toUpperCase();const _cb=(F.combo&&F.combo.n>=2)?' · '+F.combo.n+'x COMBO':'';popup(_nm+' · '+_yds+' YD TD'+_cb,c.x,99,'#ffd23a');if(typeof RT2==='function'&&RT2()&&SND.smp)SND.smp('sfx_horn',.92,.45);endPlay('td');return}
    if(c.x<0||c.x>FW){if(F.caught&&F.t-(F.caughtAt||0)<.35&&Math.abs(c.x-clamp(c.x,0,FW))<.55){c.x=clamp(c.x,.4,FW-.4);popup('TOE TAP!',c.x,c.y+1.8,'#ffd23a')}else{c.x=clamp(c.x,0,FW);endPlay('oob');return}}
    if(c.y<0){c.y=0;endPlay('tackle');return}
  }
}
function updFacing(dt){
  for(const p of F.all){
    if(p.fall)continue;
    const s=Math.hypot(p.vx,p.vy);let t=p.fa;
    if(p.eng)t=Math.atan2(p.eng.y-p.y,p.eng.x-p.x);
    else if(p.lunge>0&&F.carrier)t=Math.atan2(F.carrier.y-p.y,F.carrier.x-p.x);
    else if(s>.7)t=Math.atan2(p.vy,p.vx);
    else if(p===F.off.QB&&F.passer===p)t=Math.PI/2+(F.mode==='pre'?Math.sin(performance.now()/700)*.22:0);
    if(!(typeof G!=='undefined'&&G&&G.drill)&&p.team==='O'&&!(p===F.carrier&&p.role!=='QB')&&Math.sin(t)<.05)t=Math.atan2(Math.abs(Math.sin(t))+.35,Math.cos(t));   // backpedal or retreat: keep facing upfield
    p.fa+=clamp(angDiff(p.fa,t),-13*dt,13*dt);
  }
}

function moveCarrier(dt){
  const c=F.carrier;if(!c||F.ballAir||F.lock)return;
  if(c.dive){const v=c.dive;v.t+=dt;const k=Math.min(1,v.t/v.T);c.x=v.x0+v.dx*k;c.y=v.y0+v.dy*k;c.vx=v.dx/v.T;c.vy=v.dy/v.T;if(v.t<.14)c.inv=Math.max(c.inv||0,.05);if(k>=1&&c.y<100&&F.mode==='live'){c.dive=null;c.vx=c.vy=0;c.fall=true;c.fallV=1;c.stun=9;endPlay('tackle')}return}   // v3.16OO1: the dive carries him, then he is down where he lands
  if(c.dash){c.dash.t-=dt;c.x+=c.dash.vx*dt;c.y+=c.dash.vy*dt;c.ph+=dt*2.2;if(c.dash.t<=0){c.dash=null}return}
  const sv=stickWorld(),mx=sv.x,my=sv.y,mag=Math.min(1,Math.hypot(mx,my));
  const pocket=c.role==='QB'&&F.passer===c;   // set to throw: slow shuffle unless he holds turbo to scramble
  let sp=baseSpd(c.d.spd)*starBoost(c);if(c.role==='QB')sp*=.89;   // a passer, not a runner
  const want=mag>.2;
  let mult=1;
  if(c.styleOn&&input.turbo&&want)c.styleOn=false;   // hitting Turbo ends STYLE
  const sprint=input.turbo&&want&&!c.styleOn&&(F.gb||(F.turbo>0&&!F.tired));c.spr=sprint;
  if(sprint){mult=c.role==='QB'?1.22:1.25;if(!F.gb)F.turbo=Math.max(0,F.turbo-(c.role==='QB'?32:26)*dt);if(F.turbo<=0){F.tired=true}
    c.stepT-=dt;if(c.stepT<=0){c.stepT=.11;dust(c.x-c.vx*.05,c.y-c.vy*.05,2,.5)}}
  else{F.turbo=Math.min(100,F.turbo+(want?4:7)*dt*(PW.legs?2.2:1))}
  if(F.gb)F.turbo=100;
  if(F.tired&&F.turbo>18)F.tired=false;
  if(c.styleOn){mult*=.72;styleTick(c,dt)}
  if(c.arm>0)mult*=.82;
  if(c.spinT>0)mult*=SPIN.slow;   // v3.09
  if(F.caught&&c===F.carrier&&c.role!=='QB'&&!PLAY.deepish)mult*=RAC_R;   // run after the catch on short throws and screens
  if(F.gb)mult*=1.06;
  if(F.combo&&F.combo.n>=2&&F.t<=F.combo.until)mult*=1+Math.min(.12,(F.combo.n-1)*.06);
  if(F.tired&&!F.gb)mult*=.78;   // out of gas: everybody slows down
  if(c.slow>0)mult*=.55;
  if(pocket&&!sprint)mult*=.45;   // set to throw: slow unless he holds turbo to scramble
  const MOVE=window.MOVE||(window.MOVE={up:20,spr:23,burst:40,bt:.32,tl:.2,turn:13});   // v3.16NN1 (E13): burst 34 to 40, .22 to .32 s
   // v3.13 B8 numbers: acceleration (yd/s/s) jogging / sprinting / first .22 s of a TURBO press; tl = share of turn rate lost at full speed (was 15 / 15 / 15, .45)
  {const fresh=sprint&&!c.wasSpr;c.wasSpr=sprint;if(fresh)c.burstT=MOVE.bt;if(c.burstT>0)c.burstT-=dt;c.accUp=c.burstT>0?MOVE.burst:(sprint?MOVE.spr:MOVE.up);c.turnLoss=MOVE.tl}   // v3.13 B8 (approved balance change): first step bites, TURBO kicks, cuts hold their speed (players are made fresh every snap, so nothing carries over)
  drive(c,mag>.14?Math.atan2(my,mx):null,sp*mult*Math.min(1,mag*1.2),dt,MOVE.turn);   // v3.13b: carrier turn rate 10 -> 13
}
function styleTick(c,dt){
  if(c.role==='QB'&&F.passer===c){c.styleOn=false;return}
  c.styleAcc=(c.styleAcc||0)+dt;
  if(c.styleAcc>.8){c.styleAcc=0;G.style+=5;spFeed(5);popup(pick(['SWAG!','SHOWTIME!','TOO SMOOTH!','HOT DOG!','FILTHY!']),c.x,c.y+1.5,'#ff8ad8')}
}
const MOVE_J=window.MOVE_J={t:.16,v:14.4};   // v3.13b (user): quicker juke cut, same distance (was .22 s at 10.5 yd/s); odds unchanged
function doJuke(dirX,fromBuf){
  const c=F&&F.carrier;if(!c||F.mode!=='live')return;
  if(F.ballAir||F.lock||c.cdJ>0||c.dash){if(!fromBuf)bufferInput('juke',dirX);return}
  if(!spend(24))return;
  cn('juke');c.styleOn=false;   // a juke ends STYLE
  const lat={x:-Math.sin(c.h),y:Math.cos(c.h)};
  const swd=dirX?(camMode()==='side'?{x:0,y:dirX}:{x:dirX,y:0}):stickWorld();let sgn=Math.sign(swd.x*lat.x+swd.y*lat.y);if(!sgn){sgn=((CX-c.x)*lat.x>=0)?1:-1}
  c.jkSide=sgn;c.dash={t:MOVE_J.t,vx:c.vx*.8+lat.x*sgn*MOVE_J.v,vy:c.vy*.8+lat.y*sgn*MOVE_J.v};flMark(c.x,c.y,.8);/* v3.08 turf mark at the cut */c.inv=.2;c.cdJ=.95;c.spin=.4;SND.fx('juke');
  dust(c.x,c.y,6,.8);
  let n=0,tried=0;c.jk=(c.jk||0)+1;   // v2.96 honest feedback
  for(const d of F.def){
    if(d.stun>0)continue;const dx=d.x-c.x,dy=d.y-c.y;
    if(Math.hypot(dx,dy)<2.7&&dx*Math.cos(c.h)+dy*Math.sin(c.h)>-.6){
      tried++;
      let p=.28+(c.d.spd-d.d.spd)/220+(c.role==='RB'?.06:0);
      if(F.gb)p+=.25;
      p+=timingBonus(Math.hypot(dx,dy),.9,1.8);if(Math.random()<clamp(p,.08,.92)){
        // defender bites hard and falls over
        ragdoll(d,lat.x*sgn*-3.2,lat.y*sgn*-3.2,sgn*5,1.25);dust(d.x,d.y,9,1.1);n++;
      }
    }
  }
  if(n){F.cn.ankle=(F.cn.ankle||0)+n;comboLink('juke',c);if(n>=2)popup('ANKLES GONE!',c.x,c.y+2.5,'#ff4fd8');/* v3.15 career count */c.slipJ=c.jk;addStyle(9*n,'ANKLE BREAKER!',c.x,c.y+1.5,'#b58cff');bmHide();shakeT=.18;setSlow(.55,.18);SND.fx('ankle');bmCall('ANKLE BREAKER!',MVC.juke);bmMove(c)}   // v3.07: screen-wide callout
  else{popup(tried?'TOO SLOW':'TOO EARLY',c.x,c.y+1.5,'#b58cff');bmSay(tried?'TOO SLOW':'TOO EARLY');whiff(c)}   // v2.96 (wording by the user): a juke nobody bites on = TOO SLOW; nobody close = TOO EARLY
}
/* v3.09 SPIN (swipe DOWN on the right side; user asked for it 2026-11-12). Costs 20 stamina, 0.9 s cooldown, the runner spins for 0.4 s and
   slows a little. A NEW ODDS RULE (spinOdds, below): each defender who reaches him during the spin gets one roll; if it comes up he whiffs
   and stumbles (stun 0.7 s). If the roll fails, the normal tackle check follows exactly as before (tackleOdds is unchanged). */
const SPIN=window.SPIN={cost:20,t:.4,cd:.9,slow:.85,base:.40,spd:250,rb:.05,min:.15,max:.70};
function spinOdds(c,d){return clamp(SPIN.base+(c.d.spd-d.d.tkl)/SPIN.spd+(c.role==='RB'?SPIN.rb:0)+(F.gb?.2:0),SPIN.min,SPIN.max)}
function doSpin(fromBuf){
  const c=(G&&G.drill&&G.drill.id==='t2_crush'&&G.drill.players)?G.drill.players[0]:(F&&F.carrier);if(!c||F.mode!=='live')return;
  const dashBusy=c.dash&&c.dash.t>MOVE_J.t*.3;
  if(F.ballAir||F.lock||dashBusy||c.arm>0||c.spinT>0||(c.cdS||0)>0){if(!fromBuf)bufferInput('spin',null);return}
  if(c.dash)c.dash=null;
  if(!spend(SPIN.cost))return;
  cn('spin');c.styleOn=false;c.spinT=SPIN.t;c.spin=SPIN.t;c.cdS=SPIN.cd;c.spinHit=new Set();c.jk=(c.jk||0)+1;SND.fx('juke');
  dust(c.x,c.y,6,.7);if(!bmLite()){sparks(c.x,c.y,10,'#ff4fd8');sparks(c.x,c.y,8,'#7ff6ff');ring(c.x,c.y,1,'#ff4fd8')}
}
function spinEnd(c){if(c.spinHit&&!c.spinHit.size){popup('TOO EARLY',c.x,c.y+1.5,MVC.spin);bmSay('TOO EARLY');whiff(c)}}
function doStiff(fromBuf){
  const c=F&&F.carrier;if(!c||F.mode!=='live')return;
  const dashBusy=c.dash&&c.dash.t>MOVE_J.t*.3;
  if(F.ballAir||F.lock||c.arm>0||dashBusy){if(!fromBuf)bufferInput('stiff',null);return}
  if(c.dash)c.dash=null;
  if(!spend(22))return;
  cn('stiff');c.styleOn=false;   // a stiff arm ends STYLE
  c.arm=.4;c.armHit=new Set();SND.fx('stiff');
}
/* v2.96: a stiff arm that hit nobody says so, and the first few times explain how it works */
/* v3.16OO1 HURDLE / DIVE (user). One button left of TURBO, shown while you carry the ball past the line.
   HURDLE: a tackler within HURDLE.r yd in front of you: roll HURDLE odds (speed vs his tackling); clear him = in the air for T s, he can't touch
   you and stumbles; fail = he takes you down. Nobody there = TOO EARLY (half the stamina back). Costs HURDLE.cost, cooldown HURDLE.cd.
   DIVE (the button inside DIVE.r yd of the goal line): a fixed lunge of DIVE.len yd toward the goal line in DIVE.T s, untouchable; if he
   doesn't reach the end zone he is down where he lands. */
const HURDLE=window.HURDLE={cost:22,cd:1,r:2.6,T:.5,h:1.15,base:.45,spd:200,min:.15,max:.8},DIVE=window.DIVE={r:5,len:2.8,T:.38};
function hdMode(){const c=F&&F.carrier;if(!c||F.mode!=='live'||F.ballAir||c.role==='QB'&&F.passer===c)return '';return c.y>=100-DIVE.r?'dive':'hurdle'}
function doHurdle(fromBuf){
  const c=F&&F.carrier,m=hdMode();if(!c||F.mode!=='live')return;
  if(!m||F.lock||c.dash||c.dive||c.air||c.spinT>0||(c.cdH||0)>0){if(!fromBuf&&m)bufferInput('hurdle',null);return}
  if(m==='dive'){if(!spend(10))return;cn('dive');const dy=Math.max(DIVE.len*.75,DIVE.len*Math.cos(0)),dx=clamp((c.vx||0)*.12,-1,1);c.dive={t:0,T:DIVE.T,x0:c.x,y0:c.y,dx,dy};c.styleOn=false;SND.fx('juke');dust(c.x,c.y,8,1);bmCall&&bmCall('DIVE!','#ff5a36');return}
  if(!spend(HURDLE.cost))return;c.cdH=HURDLE.cd;cn('hurdle');c.styleOn=false;
  let d=null,bd=HURDLE.r;for(const q of F.def){if(q.eng||q.stun>0||q.fall)continue;const dy=q.y-c.y,dx=Math.abs(q.x-c.x);if(dy>-.3&&dy<HURDLE.r&&dx<1.6){const dd=Math.hypot(dx,dy);if(dd<bd){bd=dd;d=q}}}
  c.air={t:0,T:HURDLE.T,h:HURDLE.h};c.hurdle=true;SND.fx('juke');
  if(!d){popup('TOO EARLY',c.x,c.y+1.5,'#ffd23a');bmSay('TOO EARLY');whiff(c);return}
  const p=clamp(HURDLE.base+(c.d.spd-d.d.tkl)/HURDLE.spd+(F.gb?.25:0)+timingBonus(bd,.9,1.65),HURDLE.min,.92);
  if(Math.random()<p){c.inv=HURDLE.T;d.stun=.6;d.tk=1;d.vx=d.vy=0;addStyle(10,'HURDLED!',c.x,c.y+1.5,'#ffd23a');comboLink('hurdle',c);bmCall('HURDLED!','#ffd23a');bmMove&&bmMove(c);dust(d.x,d.y,8,1);cn('hurdleWin')}
  else{c.air=null;c.hurdle=false;popup('CLIPPED',c.x,c.y+1.5,'#ffd23a');tackle(c,d)}
}
function whiff(c){if(c&&c===F.carrier&&MOVE_REFUND>0&&F.lastSpend){F.turbo+=F.lastSpend*MOVE_REFUND;F.lastSpend=0}if(!POSES||!c)return;c.whiffTo=F.t+.35;dust(c.x,c.y,4,.6)}   // v3.16BB2: a failed move looks like one
function armMiss(c){popup('TOO EARLY',c.x,c.y+1.5,'#ff5a36');bmSay('TOO EARLY');whiff(c);let k=0;try{k=+(localStorage.getItem('cfArmTip')||0)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  if(k<3){moveTip("TRUCK: SWIPE UP WHEN A TACKLER IS RIGHT IN FRONT");try{localStorage.setItem('cfArmTip',k+1)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}}
/* a one-line tip under the scoreboard for 2.5 s (used by the move tips) */
function moveTip(txt){let e=document.getElementById('mvTip');if(!e){e=document.createElement('div');e.id='mvTip';e.style.cssText='position:absolute;left:50%;top:calc(env(safe-area-inset-top,0px) + 52px);transform:translateX(-50%);z-index:6;max-width:90%;padding:5px 12px;border-radius:8px;background:rgba(20,17,15,.88);border:2px solid #ffd23a;color:#ffd23a;font:800 13px "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.06em;text-align:center;pointer-events:none;transition:opacity .3s';$('#app').appendChild(e)}
  e.textContent=txt;e.style.opacity=1;e.hidden=false;clearTimeout(moveTip.t);moveTip.t=setTimeout(()=>{e.style.opacity=0},2500)}
function doStyle(){
  const c=F&&F.carrier;if(!c||F.mode!=='live'||F.ballAir||F.lock)return;
  if(c.role==='QB'&&F.passer===c)return;
  c.styleOn=!c.styleOn;if(c.styleOn){cn('style');c.styleKind=(c.styleKind+1)%3;SND.fx('style')}
}
function spend(n){if(F.gb)return true;if(F.turbo<n){popup('NEED TURBO',F.carrier.x,F.carrier.y+1.5,'#e5484d');bmSay('NEED TURBO');$('#turboWrap').classList.add('tired');setTimeout(()=>$('#turboWrap').classList.remove('tired'),350);return false}F.turbo=Math.max(0,F.turbo-n);F.lastSpend=n;if(F.turbo<=0)F.tired=true;return true}
function releaseDef(d){const b=d.eng;if(b){b.eng=null}d.eng=null}
function chargeGB(n,label,x,y){if(label&&x!==undefined)popup(label,x,y,'#ffd23a')}
function S2c(gn){const S=F.snap2||{};return S.togo>=18&&gn>=S.togo&&gn>=25}   // a first down that took a long gain
function stylePts(n,label){const e=$('#fxPts');if(!e||!n||!SHOW_PTS)return;e.textContent=(label?label+'  ':'')+'+'+(n*100).toLocaleString('en-US');e.classList.remove('show');void e.offsetWidth;e.classList.add('show')}   // v3.16W2: style points shown x100 under the callout
function endStyleShow(){}
function addStyle(pts,label,x,y,col){G.style+=pts;stylePts(pts);spFeed(label==='DIVING CATCH!'?6/SPK:pts);popup(label,x,y,col)}
function knock(d,t){if(d.eng)releaseDef(d);d.fallV=0;d.stun=t;d.fall=true;d.knock=true;d.vx=d.vy=0}

/* ============================ blocking ============================ */
function engage(b,d,T){b.penR=false;b.eng=d;d.eng=b;b.engT=T;b.engAt=F.t;b.decT=isRun()?rnd(.7,1.4):0;b.vx=b.vy=d.vx=d.vy=0;d.moveT=rnd(.35,.7);dust(d.x,d.y,3,.5)}
const isRun=()=>!!PLAY&&(PLAY.kind==='run'||(PLAY.kind==='flea'&&!F.lat));
/* Where the runner is heading. Blockers use this to decide who to wall off and which way to shove them. */
function laneX(){const c=F.carrier;if(F.handed&&c&&c.role!=='QB')return clamp(c.x+c.vx*.7,2,FW-2);return F.aim?F.aim.x:CX}
function blockT(b,d){
  const pass=F.carrier===F.off.QB||F.ballAir;
  if(pass)return clamp(5.4+(b.d.blk-d.d.pow)/30+rnd(0,1),3,8)*(PLAY.id==='screen'&&F.t<.9?.5:1);
  return 4+(b.d.blk-d.d.pow)/35+rnd(0,.7);
}
/* Run plays: work out who can reach the hole, then give each of those defenders his own blocker (nearest first). */
function assignBlocks(){
  const c=F.carrier,handed=F.handed&&c&&c.role!=='QB';
  const T=handed?{x:c.x+c.vx*.5,y:c.y+c.vy*.5}:(F.aim||{x:CX,y:F.los});
  F.holeT=T;
  const bl=F.offList.filter(b=>b.mode==='block'&&!b.eng&&b.stun<=0&&b!==c&&b.role!=='QB'&&!(b.role==='RB'&&!F.handed));
  const ds=F.def.filter(d=>d.stun<=0&&!d.eng&&!(handed&&d.y<c.y-2.5)).map(d=>({d,th:Math.hypot(d.x-T.x,(d.y-T.y)*.8)-(d.pos==='DL'?1.5:0)})).sort((a,b)=>a.th-b.th);
  for(const b of bl)b.tgt=null;
  const taken=new Set();
  /* climbing lineman: the lineman nearest the hole lets his man go and climbs to the linebacker nearest the hole (a combo block) */
  let dsU=ds;
  /* receivers commit: once a WR picks his man he stays on him for a moment, so he doesn't swap targets (and run away) every time the runner shifts */
  const locked=new Set();
  if(SCHEMES&&PLAY.kind==='run'&&F.aim&&!(F.hT!==undefined&&F.t>F.hT+SCH_T)){   // v3.16X4: run scheme
    if(!F.sch){const side=Math.sign(F.aim.x-CX)||1,by=(a,b)=>(a.x-b.x)*side;const L=['OL2','OL1','TE'].map(r=>F.off[r]).sort(by),Wr=['WR1','WR2'].map(r=>F.off[r]).sort(by);
      const DL=F.def.filter(d=>d.pos==='DL').sort(by),LB=F.def.find(d=>d.pos==='LB'),S=F.def.find(d=>d.id==='s1'),CB=F.def.filter(d=>d.pos==='DB'&&d.id[0]!=='s').sort(by);
      const k=SCHEME[PLAY.id]||'in',m=new Map();
      if(SHELL2&&DL.length<L.length){const used=new Set();for(const dl of DL){let bb=null,bd=1e9;for(const b of L){if(used.has(b))continue;const q=Math.abs(b.x-dl.x);if(q<bd){bd=q;bb=b}}if(bb){used.add(bb);m.set(bb,dl)}}const fr=L.find(b=>!used.has(b)),LBs=F.def.filter(d=>d.pos==='LB').sort(by);if(fr&&LBs.length){m.set(fr,LBs[LBs.length-1]);F.climber=fr;fr.climbT=F.t;fr.chipDL=DL.slice().sort(by)[DL.length-1]}}else{m.set(L[0],DL[0]);m.set(L[1],DL[1]);m.set(L[2],DL[2])}if(LBFREE&&WRSTALK){if(CB[1])m.set(Wr[1],CB[1]);if(CB[0])m.set(Wr[0],CB[0])}else if(k==='in'){m.set(Wr[1],LB);m.set(Wr[0],S)}   // tuned: outside and power leave the receivers free (they pick up whoever shows); see CF_01 for the stronger versions tried
      F.sch=m}
    for(const b of bl){const d=F.sch.get(b);if(d&&!d.eng&&d.stun<=0&&!d.fall&&!locked.has(d)&&!(handed&&d.y<c.y-2.5)){b.tgt=d;taken.add(b);locked.add(d);if(b.role==='WR1'||b.role==='WR2'){b.lockD=d;b.lockT=F.t+.4}}}}
  for(const b of bl){if((b.role==='WR1'||b.role==='WR2')&&b.lockD&&F.t<b.lockT){const o=ds.find(x=>x.d===b.lockD);if(o&&!locked.has(o.d)){b.tgt=o.d;taken.add(b);locked.add(o.d)}}}
  dsU=ds.filter(o=>!locked.has(o.d));
  /* receivers go for the linebackers first (never run past them to a corner): each free receiver takes the nearest linebacker still unblocked */
  if(PLAY.kind==='run'){
    for(const b of bl){if(!(b.role==='WR1'||b.role==='WR2')||taken.has(b))continue;
      let best=null,bd=1e9;const stalk=WRSTALK&&(CLIMB||LBFREE)&&PLAY.id!=='screen'&&PLAY.kind!=='flea';for(const o of dsU){if(stalk?!(o.d.pos==='DB'&&o.d.id[0]!=='s'):o.d.pos!=='LB')continue;const dd=Math.hypot(o.d.x-b.x,o.d.y-b.y);if(dd<bd){bd=dd;best=o}}   // v3.16X3: stalk the corner
      if(best){b.tgt=best.d;taken.add(b);b.lockD=best.d;b.lockT=F.t+1.1;locked.add(best.d);dsU=dsU.filter(o=>o!==best)}}
  }
  if(CLIMB&&!(LBFREE&&WRSTALK&&!LBCLIMB)&&PLAY.id!=='screen'&&PLAY.kind!=='flea'){
    const ols=bl.filter(b=>b.role.startsWith('OL')),lbs=ds.filter(o=>o.d.pos==='LB');
    if(!F.climber||F.climber.eng||F.climber.stun>0){if(!F.climber||!F.climber.eng)F.climber=ols.sort((a,b)=>Math.abs(a.x-T.x)-Math.abs(b.x-T.x))[0]||null}
    const cl=F.climber;
    if(cl&&!cl.eng&&lbs.length&&bl.includes(cl)){const lb=lbs.sort((a,b)=>Math.abs(a.d.x-T.x)-Math.abs(b.d.x-T.x))[0].d;cl.tgt=lb;taken.add(cl);dsU=dsU.filter(o=>o.d!==lb)}
  }
  for(const {d} of dsU){
    let best=null,bd=1e9;
    for(const b of bl){if(taken.has(b))continue;
      const dd=Math.hypot(d.x-b.x,d.y-b.y)+((b.role==='WR1'||b.role==='WR2')?(d.pos==='DB'?(LBFREE&&WRSTALK&&d.id[0]!=='s'?-WR_LBBON:WR_DBPEN):d.pos==='LB'?(LBFREE&&WRSTALK?99:-WR_LBBON):0):0)+((b.role==='WR1'||b.role==='WR2')&&d.y<b.y-1.5?10:0)+(b.role.startsWith('OL')&&d.pos==='DB'?6:0)+(!b.role.startsWith('OL')&&d.pos==='DL'?((b.role==='WR1'||b.role==='WR2')&&WRSTALK?99:6):0);
      if(dd<bd){bd=dd;best=b}}
    if(!best)break;
    best.tgt=d;taken.add(best);if(best.role==='WR1'||best.role==='WR2'){best.lockD=d;best.lockT=F.t+1.1}
  }
}
function fireOff(){if(F.fired||!SCHEMES||!isRun()||!F.sch||F.t<FIRE_T)return;F.fired=true;for(const r of ['OL1','OL2','TE']){const b=F.off[r],d=F.sch.get(b);if(b&&d&&!b.eng&&!d.eng&&b.stun<=0&&d.stun<=0&&!d.fall&&Math.hypot(d.x-b.x,d.y-b.y)<FIRE_R){engage(b,d,blockT(b,d))}}}   // v3.16Z1: the line fires off together
function stallCheck(){const Q=F.off.QB;if(STALL_T<=0||F.stalled||F.ballAir||F.carrier!==Q||F.passer!==Q||F.t<STALL_T||Q.y>F.los)return;F.stalled=true;for(const d of F.def){if(d.pos!=='DL'&&!d.rush)continue;if(d.eng){const b=d.eng;releaseDef(d);b.stun=.5}d.mode='rush';d.rush=true;d.burst=.6;d.react=0}}   // v3.16AA1: the pocket breaks down
function engageCheck(){fireOff();stallCheck();
  for(const b of F.offList){
    if(b.eng||b.stun>0||b===F.carrier||b.role==='QB')continue;
    if(b.mode!=='hold'&&b.mode!=='block')continue;
    if(b.role==='RB'&&!F.handed)continue;
    for(const d of F.def){if(d.eng||d.stun>0||(d.noEng&&F.t<d.noEng))continue;if(b===F.climber&&b.tgt&&b.tgt.pos==='LB'&&d.pos==='DL')continue;if(isRun()&&(b.role==='WR1'||b.role==='WR2')&&b.tgt&&d.pos==='DL'&&d!==b.tgt)continue;/* receivers don't get tied up by a lineman on the way to their linebacker */if(Math.hypot(d.x-b.x,d.y-b.y)<(isRun()&&(b.role==='WR1'||b.role==='WR2')?WRENG:1.25)){engage(b,d,blockT(b,d));break}}
  }
}
/* Defenders try swim, spin and power moves while engaged. Success depends on their ratings against the blocker. */
function tryMove(b,d){
  const pass=F.carrier===F.off.QB||F.ballAir;
  const opts=d.pos==='DL'?['power','power','swim','spin']:d.pos==='LB'?['power','power','swim','spin']:['swim','spin'];
  const mv=pick(opts);
  const stat=mv==='power'?d.d.pow:mv==='swim'?(d.d.spd*.5+d.d.tkl*.5):(d.d.spd*.6+d.d.tkl*.4);
  let p=.07+(stat-b.d.blk)*.007+(pass?.05:0)+(d.rush&&G.call==='blitz'?.04:0);
  p=clamp(p,.04,.7);
  d.moveAnim={name:mv,t:.4};
  // blocker may pancake instead
  const pk=clamp((b.d.blk-d.d.pow)*.004-.02,0,.18);
  if(Math.random()<pk){
    ragdoll(d,Math.cos(b.fa)*3.5,Math.sin(b.fa)*3.5,pick([-1,1])*4,1.4);b.eng=null;d.eng=null;
    popup('PANCAKE!',d.x,d.y+1,'#7be07b');dust(d.x,d.y,12,1.2);ring(d.x,d.y,1.2);SND.fx('hit');return;
  }
  if(Math.random()<p){
    b.eng=null;d.eng=null;b.stun=.55;b.beat=.6;d.burst=.55;d.react=0;
    popup(mv==='swim'?'SWIM!':mv==='spin'?'SPIN!':'BULL RUSH!',d.x,d.y+1.2,'#ff8a5c');
    if(mv==='spin')d.spin=.35;
    dust(d.x,d.y,7,.9);beep(240,.08,'square',.03);
    if(F.carrier===F.off.QB&&d.rush)d.pressure=true;
  }
}
function updEng(dt){
  for(const b of F.offList){
    const d=b.eng;if(!d)continue;b.engT-=dt;
    if(d.stun>0||b.stun>0||b.engT<=0){const worn=b.engT<=0;b.eng=null;d.eng=null;if(worn){b.stun=.4;d.react=0}continue}
    if(isRun()){   // run block: after a moment one of them wins, and the odds come from the ratings (the offense is favoured)
      b.decT-=dt;
      if(!b.penR&&F.t-b.engAt>=PEN_T&&d.pos==='DL'){b.penR=true;if(Math.random()<clamp(PEN_P+(d.d.pow-b.d.blk)*BLK_K*1.5,.05,.6)*(d.chipped?.4:1)){cn('pen');b.eng=null;d.eng=null;b.stun=.6;b.beat=.6;d.burst=.7;d.react=0;d.pen=true;d.noEng=F.t+PEN_FREE;d.moveAnim={name:'swim',t:.4};popup('SWIM!',d.x,d.y+1.2,'#ff8a5c');dust(d.x,d.y,7,.9);continue}}   // v3.16HH1: a lineman can beat his man right away and blow up the run (nobody can pick him up again for PEN_FREE s)
      if(b.decT<=0&&BLK_ARRIVE>0&&!(WR_FAST&&(b.role==='WR1'||b.role==='WR2'))){const r=F.carrier;const near=F.handed&&r&&r!==F.off.QB&&r.y>=d.y-BLK_ARRIVE&&Math.abs(r.x-d.x)<BLK_ARRIVE+2.5;if(!near&&F.t-b.engAt<BLK_HOLD)b.decT=.08}   // v3.16W4: hold the fight until the runner arrives
      if(b.decT<=0){
        const pw=clamp(BLK_BASE+(b.d.blk-d.d.pow)*BLK_K+(d.pos==='DB'?DB_BLK:0)-((b.role==='WR1'||b.role==='WR2')?WR_BLKPEN:0)-(psOut(d)?PS_SHED:0)+(d.chipped?CHIP_B:0),BLK_FLOOR,.93);
        if(Math.random()<pw){   // driven into the ground
          cn('bw'+(b.role.startsWith('OL')?'OL':b.role==='TE'?'TE':b.role==='RB'?'RB':'WR'));ragdoll(d,Math.cos(b.fa)*3.2,Math.sin(b.fa)*3.2,pick([-1,1])*4,rnd(1.1,1.9));b.eng=null;d.eng=null;b.beat=.3;
          if(Math.random()<.4){popup('PANCAKE!',d.x,d.y+1,'#7be07b');SND.fx('hit')}dust(d.x,d.y,9,1);
        }else{   // he sheds the block
          cn('bs'+(b.role.startsWith('OL')?'OL':b.role==='TE'?'TE':b.role==='RB'?'RB':'WR'));cn('sh_'+d.pos);const mv=pick(d.pos==='DB'?['swim','spin']:['power','swim','spin']);d.moveAnim={name:mv,t:.4};
          b.eng=null;d.eng=null;b.stun=.5;b.beat=.6;d.burst=.55;d.react=0;if(mv==='spin')d.spin=.35;
          popup(mv==='swim'?'SWIM!':mv==='spin'?'SPIN!':'BULL RUSH!',d.x,d.y+1.2,'#ff8a5c');dust(d.x,d.y,7,.9);beep(240,.08,'square',.03);
        }
        continue}
    }else{d.moveT-=dt;if(d.moveT<=0){d.moveT=rnd(.6,1.1)*(d.pos==='DB'?1.5:1);tryMove(b,d);if(!b.eng)continue}}
    const k=Math.min(1,dt*12);d.x+=(b.x-d.x)*k;d.y+=((b.y+.95)-d.y)*k;d.vx=d.vy=0;b.vx=b.vy=0;
    // shuffling: the pair drifts toward whoever is winning
    const push=(!(F.carrier===F.off.QB)&&!F.ballAir)?1.2:0;
    b.y+=(push+(d.moveAnim&&d.moveAnim.name==='power'?-1.4:0))*dt;
    b.x+=Math.sin(F.t*11+b.x)*.25*dt;
    // run plays: the blocker drives his man away from the hole, opening a lane
    if(isRun()){const lx=laneX(),side=Math.sign(d.x-lx)||(b.x<lx?-1:1),eff=1+clamp((b.d.blk-d.d.pow)/110,-.5,.5);b.x+=side*2.6*eff*dt;b.y+=.5*dt}
  }
}

/* A sharp cut can leave the defender covering him guessing: he bites, slows down and loses ground. Faster receivers fool slower defenders more. */
const LANE=true;   // v3.16DD3: running-lane chevrons + free-rusher rings
const ROUTE_FOOL={slant:.8,mesh:.8,short:.9,dmove:1.2,wheel:1.1};   // TUNE v3.16DD2: route cut fooling by play (1 = as before)
function fooled(r,t,cut){
  for(const d of F.def){
    if(d.mode!=='cover'||d.assign!==r.role)continue;
    const edge=r.d.spd-(d.d.spd+(d.d.cov||d.d.spd))/2,pf=clamp((.55+cut*.15+edge/150)*((PLAY&&ROUTE_FOOL[PLAY.id])||1),.2,.92);   // v3.16DD2: by route
    if(Math.random()<pf){d.fool=clamp(.3+cut*.3+edge/200,.2,.9);d.foolAt={x:t[0],y:t[1]};if(d.fool>.75)popup('LOST HIM!',d.x,d.y+1.3,'#4dd0e1')}
  }
}
function aiOff(p,dt){
  if(p===F.carrier)return;
  if(p.stun>0||p.eng){p.vx=p.vy=0;return}
  if(p.role==='QB'){drive(p,null,0,dt);return}
  if(p.role==='RB'&&!F.handed&&(PLAY.kind==='run'||PLAY.kind==='flea'))return;
  if(p.override){seek(p,p.override.x,p.override.y,recSpeed(p)*1.15,dt,.4);return}
  if(p.mode==='route'){
    if(p.ri<p.route.length){
      const t=p.route[p.ri],last=p.ri===p.route.length-1;
      const prev=p.ri?p.route[p.ri-1]:[p.sx0,p.sy0],next=last?null:p.route[p.ri+1];
      const cut=next?Math.abs(angDiff(Math.atan2(t[1]-prev[1],t[0]-prev[0]),Math.atan2(next[1]-t[1],next[0]-t[0]))):0;
      let m=1;const dd=Math.hypot(t[0]-p.x,t[1]-p.y);
      if(cut>.6)m=.55+.45*clamp((dd-.3)/1.8,0,1);          // plant and slow down into the cut
      p.cutRec+=dt;if(p.cutRec<.55)m*=.62+.55*(p.cutRec/.55);   // then explode out of it
      if(seek(p,t[0],t[1],recSpeed(p)*m,dt,cut>.6?.5:(last?.3:.9),cut>.6?15:9)){p.ri++;if(cut>.6){p.cutRec=0;fooled(p,t,cut)}}
    }else{
      const Q=F.off.QB;
      if(SETTLE_T>0&&p.setT===undefined){const e=p.route[p.route.length-1];p.setT=(e[1]-F.los<=SETTLE_D)?SETTLE_T:0}
      if(p.setT>0){p.setT-=dt;let nd=null,bd=6;for(const d of F.def){if(d.fall||d.eng)continue;const q=Math.hypot(d.x-p.x,d.y-p.y);if(q<bd){bd=q;nd=d}}let ax=p.x,ay=p.y-.6;if(nd){const k=(6-bd)/6;ax+=(p.x-nd.x)/(bd||1)*2*k;ay+=(p.y-nd.y)/(bd||1)*1.2*k}seek(p,clamp(ax,2,FW-2),Math.max(ay,F.los+1),recSpeed(p)*.45,dt,.3);return}   // v3.16Z3: settle in the soft spot
      if(!p.tail){const n=p.route.length,a=n>1?p.route[n-2]:[p.sx0,p.sy0],b2=p.route[n-1];let dx=b2[0]-a[0],dy=b2[1]-a[1];const m=Math.hypot(dx,dy);if(m<.5){dx=0;dy=1}else{dx/=m;dy/=m}p.tail={dx,dy,back:false}}
      const T=p.tail,sp=recSpeed(p)*.9;
      if(!T.back){
        seek(p,p.x+T.dx*6,p.y+T.dy*6,sp,dt,.5);
        if(p.x<1.5||p.x>FW-1.5||p.y>96||p.y<F.los-4){T.back=true;   // hit the boundary: turn around and come back a few yards, no further
          const ex=p.x<1.5?1:p.x>FW-1.5?-1:0,ey=p.y>96?-1:p.y<F.los-4?1:0;T.tx=clamp(p.x+ex*4,2.5,FW-2.5);T.ty=clamp(p.y+ey*4+(ex&&!ey?-1.5:0),F.los-3,95)}
      }else{
        seek(p,T.tx,T.ty,sp*.8,dt,.5);   // settle in a spot a few yards back from the edge
      }
    }
    return}
  if(p.mode==='hold'){
    let best=null,bd=8;for(const d of F.def){if(d.eng||d.stun>0||!d.rush)continue;const dd=Math.hypot(d.x-p.x,d.y-p.y);if(dd<bd){bd=dd;best=d}}
    if(PLAY.id==='screen'&&F.t>.9&&(p.role==='OL1'||p.role==='OL2')){p.mode='block';return}
    const t=p.tgt,ok=t&&!t.eng&&t.stun<=0&&t.rush,tg=ok?t:best;
    if(tg)seek(p,tg.x,Math.min(tg.y,p.sy0+2),4.4,dt);else drive(p,null,0,dt);
    return;
  }
  if(p.mode==='block'){
    const run=isRun(),ref=F.carrier||F.off.RB||F.off.QB,lx=laneX();
    if(run){
      const d=p.tgt,T=F.holeT||F.aim||{x:CX,y:F.los};
      if(d&&!d.eng&&d.stun<=0){
        // get on the hole side of him so the shove drives him away from the lane
        let ux=T.x-d.x,uy=T.y-d.y;const m=Math.hypot(ux,uy)||1;ux/=m;uy/=m;
        if(SHELL2&&p===F.climber&&d.pos==='LB'){const side=Math.sign((F.aim||T).x-CX)||1,cd=p.chipDL;
          if(cd&&F.t-(p.climbT||0)<CHIP_T&&cd.eng){seek(p,cd.x-side*.3,cd.y-.6,recSpeed(p)*1.1,dt,.3,12);if(Math.hypot(cd.x-p.x,cd.y-p.y)<1.7)cd.chipped=true;return}   // chip: hip to hip with the play-side lineman
          const ax=d.x+d.vx*CL_LEAD+side*.5,ay=Math.max(d.y+d.vy*CL_LEAD-.4,F.los+.8);seek(p,ax,ay,recSpeed(p)*1.15,dt,.4,12);return}   // climb: take the angle to his play-side shoulder
        const isW=p.role==='WR1'||p.role==='WR2',dist=Math.hypot(d.x-p.x,d.y-p.y),near=isW?clamp((4.5-dist)/3,0,1):1,lead=isW?.45:.2,off=(isW&&d.pos==='LB'?WROFF:.8)*near,ax=d.x+d.vx*lead+ux*off,ay=d.y+d.vy*lead+uy*off-.2*near;
        seek(p,ax,ay,recSpeed(p)*(p.role.startsWith('OL')?1.1:1.55),dt,.4,12);
      }else{seek(p,T.x,Math.max(p.y,F.los)+2,recSpeed(p)*.8,dt,.6)}   // nobody left to block: clear the lane
      return;
    }
    p.tgtT=(p.tgtT||0)-dt;
    const free=d=>d&&!d.eng&&d.stun<=0&&!F.offList.some(o=>o!==p&&o.tgt===d);
    if(!free(p.tgt)||p.tgtT<=0){
      let best=null,bc=1e9;
      for(const d of F.def){if(!free(d))continue;
        let cost=Math.hypot(d.x-p.x,d.y-p.y);
        if(run)cost+=Math.abs(d.x-lx)*.9+(d.y<ref.y-2?9:0);else cost+=(d.y<ref.y-3?7:0);
        if(cost<bc){bc=cost;best=d}}
      p.tgt=best;p.tgtT=.5;
    }
    const d=p.tgt;
    if(d){const side=run?(Math.sign(lx-d.x)||1):0;seek(p,d.x+side*.45,d.y-.1,recSpeed(p)*.95,dt)}else drive(p,null,0,dt);
  }
}

const PEN_P=.15,PEN_T=.3,PEN_FREE=1.2,WR_FAST=1,LBFREE=1,LBCLIMB=0,BLK_FLOOR=.08,BLITZ_SPD=.85,MOVE_REFUND=.5,STUNT_BURST=1.5,LB_RD=.1,LB_SP=1,LB_TK=-.06;   // v3.16II1 linebacker on runs: extra seconds before he reacts to the handoff, speed multiplier, tackle odds change   // TUNE v3.16HH: DL quick-win chance per run block, when it is rolled (s after contact), lowest block-win chance, blitzer speed vs before, stamina back on a missed move
const ROUTES_LIVE=1.6,GOAL_P=.5,SPY_P=.2,STUNT_P=.5,STUNT_T=.45;   // TUNE v3.16FF1: share of blitz pass plays with a stunt, and how long the twist lasts
function aiDef(d,dt){
  if(d.eng||d.stun>0){d.vx=d.vy=0;return}
  const pl=PLAY,QB=F.off.QB,_csA=CSTY(),_eh=!!(_csA.edgeHeat&&d.rush&&(d.id==='dl1'||d.id==='dl3'||d.pos==='LB'));if(F.t<Math.max(0,d.react-(_eh?.12:0))+(d.pos==='DL'&&pl.kind==='pass'&&!(F.stunt&&(d.id==='dl1'||d.id==='dl2'))?.35:0))return;   // linemen need a beat to read pass and get off the ball
  let sp=defSpeed(d)*(_eh?1.07:1);
  const foolT=d.fool>0&&d.foolAt;if(d.fool>0){d.fool-=dt;sp*=.5}
  const c=F.carrier||(F.lat&&!F.latDone?QB:null);
  const isRun=pl.kind==='run'||(pl.kind==='flea'&&!F.lat);
  let tx,ty;
  if(F.ballAir){
    const rd=Math.max(.06,.16+(100-(d.d.cov||60))/500+(d.pos==='DL'?.12:0)-(_csA.bait&&d.pos==='DB'?.05:0)),seen=F.ball.t>=rd;   // nobody reads the ball the instant it leaves the QB's hand: better coverage men break sooner
    if(!seen&&d.mode==='cover'){const r=F.off[d.assign];tx=foolT?d.foolAt.x:r.x;ty=(foolT?d.foolAt.y:r.y)+d.cush*.6}
    else if(!seen&&d.mode==='zone'){tx=d.zx;ty=F.los+d.zy}
    else if(!seen){tx=F.carrier?F.carrier.x:d.x;ty=F.carrier?F.carrier.y:d.y-1}
    else if(d.chaser){tx=F.ball.to.x;ty=F.ball.to.y}
    else if(d.mode==='cover'){const r=F.off[d.assign];tx=foolT?d.foolAt.x:r.x;ty=(foolT?d.foolAt.y:r.y)+d.cush*.6}
    else if(d.mode==='zone'){tx=d.zx;ty=F.los+d.zy}
    else{tx=F.ball.to.x;ty=F.ball.to.y}
    seek(d,tx,ty,sp,dt);return;
  }
  let runner=null;
  if(isRun)runner=(F.carrier&&F.carrier!==QB)?F.carrier:F.off.RB;
  else if(c&&(c.role!=='QB'||c.y>F.los+1))runner=c;
  if(runner&&isRun&&d.pos!=='DL'&&pl.kind==='run'&&!(CSTY().bite&&(pl.id==='draw'||pl.id==='counter'))){if(!F.handed&&dist(F.off.RB,QB)>1.5){if(d.mode!=='rush'){if(d.hx===undefined){d.hx=d.x;d.hy=d.y}seek(d,d.hx,d.hy,sp*.5,dt);return}runner=null}else{if(F.hT===undefined)F.hT=F.t;const rd=(d.pos==='DB'?(psOut(d)?.06:.18):(psOut(d)?.05:.08)+LB_RD)+(d.react-.2);if(F.t<F.hT+rd)runner=null}}   // v3.16V2: read the handoff, not the snap   // backers read the handoff before they fill
  if(runner&&pl.kind==='flea'&&d.pos!=='DL'&&runner.y<F.los+.8){const bite=d.pos==='LB'?.2:.1;if(!d._bk)d._bk=Math.random();if(d._bk>bite)runner=null;else sp*=.55}   // the fake only fools a few of them, and they bite slowly: most keep their coverage
  if(runner){if(d.pos!=='DL'||runner.role==='QB')sp=Math.max(sp,baseSpd(runner.d.spd)*starBoost(runner)*Math.max((runner.spr&&!runner.styleOn)?SPR_FLOOR:(runner.y>=G.ltg?.95:.92),(isRun&&runner.y>F.los+6)?BREAK_PUR:0));
    if(isRun&&runner.y>F.los+6&&d.pos!=='DL')sp*=1+clamp(dist(d,runner)/CATCH_D,0,CATCH_MAX);
    if(isRun&&d.pos!=='DL'&&d.y<runner.y+1&&dist(d,runner)<CLOSE_R)sp*=1+CLOSE_B;   // a defender right on his heels keeps the pressure on (a sprinter can't just coast away from a man he already has)   // open-field catch-up: the further behind he is, the harder a defender runs (so one missed tackle isn't a 70-yard touchdown)   // pursuit: LB/DB run at least 2% faster than the runner, 10% once he is past the first-down marker (linemen get no boost)
    if(!isRun&&F.caught&&d.pos!=='DL')sp*=RAC_D;
    if(isRun&&d.pos!=='DL'&&CSTY().nochase&&runner.y>F.los+1)sp*=NOCHASE;   // v3.16EE3: Gantry Gang don't chase
    if(isRun&&d.pos==='LB')sp*=LB_SP;if(isRun&&d.pos!=='DL')sp*=(G.call==='stack'?1.07:G.call==='deep'?.94:G.call==='blitz'?1.02:1);   // a stacked box fills the gaps faster; a deep shell is slow to come up
    if(pl.id==='screen')sp*=1.1;   // the rushers see the screen and turn on it
    /* intercept point: where the defender and runner can actually meet. (The old lead guess pointed behind a defender whenever the runner was faster and coming at him, so he turned and ran away.) */
    let lead=0;{const rx=runner.x-d.x,ry=runner.y-d.y,vx=runner.vx,vy=runner.vy,qa=vx*vx+vy*vy-sp*sp,qb=2*(rx*vx+ry*vy),qc=rx*rx+ry*ry;
      if(Math.abs(qa)<1e-6){if(qb<0)lead=-qc/qb}else{const disc=qb*qb-4*qa*qc;if(disc>=0){const sq=Math.sqrt(disc),t1=(-qb-sq)/(2*qa),t2=(-qb+sq)/(2*qa);const cand=[t1,t2].filter(t=>t>0);if(cand.length)lead=Math.min(...cand)}}
      {const bs=isRun&&F.aim&&(d.pos==='LB'||d.pos==='DB')&&(d.x-runner.x)*(Math.sign(F.aim.x-CX)||1)<=1.5;lead=clamp(lead,0,bs?BACK_CLAMP:1.2);if(isRun&&d.pos==='LB'&&!bs)lead*=psOut(d)?PS_LEAD:RUN_LEAD}}   // backers and backs flow with the play: they chase from the side and behind instead of cutting him off perfectly
    tx=runner.x+runner.vx*lead;ty=runner.y+runner.vy*lead;
    /* backside linebackers and corners take a cut-off angle: they run to where the runner will be downfield, not to where he is, so a runner who beats the first level still has to get past them */
    if(BACK_LEAD>0&&isRun&&(d.pos==='LB'||d.pos==='DB')&&F.aim&&runner.y>F.los-1){const side=Math.sign(F.aim.x-CX)||1;
      if((d.x-runner.x)*side<=1.5){const dd=dist(d,runner),T=clamp(dd/Math.max(sp,5),.3,2.6)*BACK_LEAD;tx=clamp(runner.x+runner.vx*T,1,FW-1);ty=runner.y+runner.vy*T}}
    if(isRun&&d.pos==='DB'&&SAFE_ON>0){const bsd=F.aim&&(d.x-runner.x)*(Math.sign(F.aim.x-CX)||1)<=1.5;if(runner.y<F.los+(bsd?SAFE_ON:PS_ATTACK)){tx=clamp(runner.x,2,FW-2);ty=F.los+SAFE_Y;sp*=.9}else sp*=DB_CHASE}   /* corners play safety on runs: they stay over the top until the runner gets close */
    if(CFORCE>0&&isRun&&d.pos==='DB'&&d.id!=='s1'&&F.handed&&F.aim){const side=Math.sign(F.aim.x-CX)||1;if((d.x-CX)*side>0&&runner.y<d.y+.5){tx=clamp(runner.x+side*CFORCE,2,FW-2)}}   // v3.16Z2: play-side corner keeps outside leverage (shades to the runner's outside shoulder, keeps his depth)
    if(GAPHOLD>0&&isRun&&d.pos==='DL'&&!d.pen){if(d.gx===undefined)d.gx=d.x;if(!F.handed||F.t<(F.hT||F.t)+GAPHOLD){tx=d.gx;ty=F.los+.4;sp*=.7}else if(F.aim&&runner.y<F.los+1.5){const side=Math.sign(F.aim.x-CX)||1;if((d.gx-CX)*side>LSP*.5)tx=side>0?Math.max(tx,runner.x+1.2):Math.min(tx,runner.x-1.2)}}   // v3.16V3: hold your gap until the handoff plus a beat; the play-side end keeps outside contain
    if(GAPOWN&&isRun&&d.pos==='DL'&&F.aim&&!d.pen){const side=Math.sign(F.aim.x-CX)||1;if((d.x-CX)*side<0&&runner.y<F.los+3&&Math.abs(runner.x-d.x)>3.5){tx=d.x+clamp(runner.x-d.x,-1.8,1.8);ty=F.los+.6;sp*=.85}}   // v3.16U4: back-side lineman stays home against the cutback
    if(dist(d,runner)<1.9)d.lunge=.25}
  else if(d.mode==='rush'&&F.stunt&&F.t<STUNT_T&&(d.id==='dl1'||d.id==='dl2')&&!isRun){if(d.gx===undefined)d.gx=d.x;const o=F.def.find(q=>q.id===(d.id==='dl1'?'dl2':'dl1'));if(o&&o.gx===undefined)o.gx=o.x;const sd=Math.sign((F.def.find(q=>q.id==='dl1').gx)-(F.def.find(q=>q.id==='dl2').gx))||-1;   // v3.16FF1: stunt
    if(d.id==='dl1'){tx=o.gx;ty=F.los+.2}else{const k=F.t/STUNT_T;tx=F.def.find(q=>q.id==='dl1').gx+sd*(1+1.5*k);ty=F.los+.6-1.6*k}}
  else if(d.mode==='rush'){if(!isRun&&d.pos!=='DL')sp*=BLITZ_SPD;if(F.stunt&&d.id==='dl2'&&!d.stB&&F.t>=STUNT_T){d.stB=1;d.burst=STUNT_BURST}const t=c||QB;tx=t.x;ty=t.y;const dl=d.pos==='DL';if(dl&&t===QB&&F.passer===QB&&dist(d,t)>5)tx+=(Math.sign(d.x-t.x)||(d.id==='dl1'?-1:1))*4;   // linemen take the edge: a wider path to the passer
    sp*=(F.gb&&F.stars.has('cannon'))?.65:(dl?.72:1.3);if(F.latDone){const e=F.t-F.latAt;sp*=e<FLEA_BITE?.45:e<2.4?1.15:1}}   // the pitch back gives the rush a second wind
  else if(d.mode==='cover'){const r=F.off[d.assign];tx=foolT?d.foolAt.x:r.x;const edge=(d.d.cov||60)-((r.d.spd+r.d.hnd)/2);ty=(foolT?d.foolAt.y:r.y)+d.cush+clamp(1.9-edge/40,.8,3);sp*=clamp(.86+edge/200,.78,.99)}   // coverage rating decides how well he stays with his man
  else if(d.mode==='spy'){const Q=F.off.QB,qc=F.carrier===Q;if(qc&&Q.y>F.los-1.5){tx=Q.x;ty=Q.y}else{tx=clamp(Q.x,3,FW-3);ty=F.los+5}}   // v3.16FF2: QB spy
  else{let br=null,bd=9;for(const k of ['WR1','WR2','TE','RB']){const r=F.off[k];if(r.mode!=='route')continue;const dd=Math.hypot(r.x-d.zx,r.y-(F.los+d.zy));if(dd<bd){bd=dd;br=r}}
    if(br){tx=br.x;ty=br.y+1.6}else{tx=d.zx;ty=F.los+d.zy}}
  seek(d,tx,ty,sp,dt);
}
function separate(){
  const a=F.all;
  for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){
    const p=a[i],q=a[j];if(p.eng===q||q.eng===p)continue;
    if(p.fall||q.fall)continue;
    const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);
    if(d<.8&&d>.001){const k=(.8-d)/2;p.x-=dx/d*k;p.y-=dy/d*k;q.x+=dx/d*k;q.y+=dy/d*k}
  }
}

/* ============================ contact, tackles, passing ============================ */
function contacts(dt){
  const c=F.carrier;if(!c||F.ballAir||F.lock)return;
  if(c.arm>0){
    for(const d of F.def){
      if(d.fall||d.stun>0||c.armHit.has(d))continue;
      const dx=d.x-c.x,dy=d.y-c.y,dd=Math.hypot(dx,dy);
      if(dd<1.9&&Math.abs(angDiff(c.h,Math.atan2(dy,dx)))<1.15){
        c.armHit.add(d);
        let p=.3+(c.d.pow-d.d.tkl)/100*.5+(c.d.spd-d.d.spd)/800;
        
        p+=timingBonus(dd,.85,1.55);const win=(F.gb&&F.stars.has('bulldozer'))||Math.random()<clamp(p,.08,.9);
        if(win){
          const side=Math.sign(dx*-Math.sin(c.h)+dy*Math.cos(c.h))||1;
          const nx=-Math.sin(c.h)*side,ny=Math.cos(c.h)*side;
          ragdoll(d,nx*8+Math.cos(c.h)*2,ny*8+Math.sin(c.h)*2,side*-10,1.6);
          cn('truckWin');/* v3.15 career count */c.slow=.12;c.shoveTo=F.t+.35;addStyle(14,'TRUCKED!',d.x,d.y+1,'#ff5a36');comboLink('truck',c);bmHide();setSlow(.45,.22);shakeT=.25;bmLaunch(d);bmBigHit();bmCall('TRUCKED!',MVC.stiff);bmMove(c);   /* v3.07: launch arc, flash + hit-stop, callout */dust(d.x,d.y,12,1.3);sparks(d.x,d.y,6,'#ffd23a');ring(d.x,d.y,1.3);SND.fx('stiffHit');
        }else{popup('HIT THE GYM',c.x,c.y+1,'#aaa');bannerExtra='HIT THE GYM';tackle(c,d);return}   // v2.96: the reason goes on the result banner (the popup is cleared when the play ends)
      }
    }
  }
  if(c.inv>0){if(c.jk&&c.slipJ!==c.jk&&F.def.some(d=>!d.eng&&d.stun<=0&&dist(d,c)<1.2)){c.slipJ=c.jk;popup('SLIPPED HIM',c.x,c.y+1.5,'#b58cff')}return}   // v2.96: the juke made a tackler miss
  if(c.spinT>0&&c.spinHit){for(const d of F.def){if(d.eng||d.stun>0||d.fall||c.spinHit.has(d)||dist(d,c)>=1.2)continue;c.spinHit.add(d);   // v3.09 SPIN: one roll per defender who reaches him
      if(Math.random()<spinOdds(c,d)){d.stun=.7;d.tk=1;d.dizzy=true;d.vx=d.vy=0;addStyle(9,'SPUN HIM!',c.x,c.y+1.5,MVC.spin);comboLink('spin',c);dust(d.x,d.y,8,1);if(!bmLite())sparks(d.x,d.y,8,'#7ff6ff');SND.fx('whiff');bmCall('SPIN!',MVC.spin,'#7ff6ff');bmMove(c);cn('spinWin')}}}
  const near=F.def.filter(d=>!d.eng&&d.stun<=0&&dist(d,c)<1.2&&!(c.armHit&&c.armHit.has(d)));
  if(!near.length)return;
  const d=near[0];
  if(F.gb&&F.breaks<F.maxBreaks&&d.tk<=0){
    F.breaks++;ragdoll(d,Math.cos(c.h)*2+rnd(-2,2),Math.sin(c.h)*2+rnd(-2,2),pick([-1,1])*8,1.2);c.inv=.35;d.tk=1;
    cn('starBrk');addStyle(8,'\u2605 STAR BREAK!',c.x,c.y+1.5,'#ffd23a');shakeT=.45;F.cine=SP_CINE;setSlow(.22,SP_CINE*.8);flashT=.25;dust(d.x,d.y,10,1.1);ring(d.x,d.y,1.1,'#ffd23a');SND.fx('hit');
    return;
  }
  if(near.length>=2){   // a gang tackle is very likely, but ratings still matter: a strong back can shake two weak tacklers
    const t2=clamp(.82+(near[0].d.tkl+near[1].d.tkl-2*c.d.pow)/400,.7,.97);
    if(Math.random()<t2){tackle(c,d);return}
    for(const q of near.slice(0,2)){q.stun=.5;q.tk=.9}c.slow=.3;cn('pow');addStyle(8,'POWERED THROUGH!',c.x,c.y+1,'#7be07b');dust(c.x,c.y,8,.9);SND.fx('whiff');return}
  if(d.tk>0)return;
  const p=tackleOdds(c,d);
  if(Math.random()<p)tackle(c,d);
  else{const _dx=d.x-c.x,_dy=d.y-c.y,_dm=Math.hypot(_dx,_dy)||1;d.sv={x:(_dx/_dm)*5.2+(c.vx||0)*.25,y:(_dy/_dm)*5.2+(c.vy||0)*.25};d.stun=.55;d.tk=.9;c.slow=.22;cn('brk');addStyle(5,'BROKEN TACKLE!',c.x,c.y+1,'#7be07b');bmSay('BROKEN TACKLE!','#7be07b');dust(d.x,d.y,7,.9);SND.fx('whiff')}
}
/* One defender against the ball carrier: ratings, then the angle of the hit and how fast the two are moving. */
function tackleOdds(c,d){
  const dx=d.x-c.x,dy=d.y-c.y,m=Math.hypot(dx,dy)||1,sp=Math.hypot(c.vx,c.vy);
  const fr=sp>1?(dx*c.vx+dy*c.vy)/(m*sp):0;   // +1: defender straight ahead of the runner, -1: chasing from behind
  const cl=((d.vx-c.vx)*(-dx)+(d.vy-c.vy)*(-dy))/m;   // how fast they are closing on each other
  let p=TK_BASE+(d.d.tkl-c.d.pow)/200+(c.role==='QB'?.17:0)+(d.pos==='LB'&&isRun()?LB_TK:0);
  p+=fr*.05;   // head-on and shoulder hits stick, a reach from behind often slides off
  p-=clamp((sp-5.5)/3,0,1)*.08*(fr>-.2?1:1.5);   // a runner at full speed is harder to wrap, most of all from behind
  if(F.handed&&isRun()&&c.role!=='QB'&&c.y<F.los+2&&sp>3)p-=LINE_WRAP;   // a runner with a head of steam at the line is harder to wrap up
  p+=clamp(cl/12,-.08,.12);   // closing momentum strongly governs tackle wrap
  const glance=Math.abs(fr)<.35&&cl<2.2;if(glance)p-=.16;   // glancing arm-tackle slides off cleanly
  else if(fr>.65&&cl>4.5)p+=.12;   // squared-up high-momentum hit sticks reliably
  return clamp(p,TK_MIN,.97)}
function tackle(c,d){haptic('medium');
  const styled=c.styleOn;const spd=Math.hypot(c.vx,c.vy);{const ax=d.x-c.x,ay=d.y-c.y,m=Math.hypot(ax,ay)||1,dot=(ax*Math.cos(c.h)+ay*Math.sin(c.h))/m;c.fallV=FALLS?(dot>.45?1:dot<-.3?0:2):0;c.fallS=(ax*Math.sin(c.h)-ay*Math.cos(c.h))>0?1:-1;d.fallV=0}   // v3.16Z4: which way he goes down
  c.styleOn=false;c.fall=true;c.knock=true;c.stun=9;c.sv={x:Math.cos(c.h)*Math.min(spd,6)*.7,y:Math.sin(c.h)*Math.min(spd,6)*.7};c.vx=c.vy=0;
  const nx=Math.cos(c.fa+Math.PI/2),ny=Math.sin(c.fa+Math.PI/2);d.x=c.x+nx*.8;d.y=c.y+ny*.8;d.fall=true;d.knock=true;d.stun=9;d.vx=d.vy=0;d.fa=c.fa+.2;d.sv={x:c.sv.x*.8,y:c.sv.y*.8};
  // falling forward: a handed-off runner stopped at the line always drives his legs for a couple of yards (keeps a no-moves run from losing yards every time)
  if(F.handed&&c.role!=='QB'&&F.carrier===c&&isRun()){const gl=c.y-F.los;if(gl<FF_LEN)c.y+=clamp((FF_LEN-gl)*FF_K,0,FF_MAX)*(c.d.pow>=70?1:.85)}
  const big=spd>6.5;
  SND.fx(big?'bigHit':'hit');shakeT=big?.35:.18;if(big){bmBigHit();bmCall('BIG HIT!','#ffffff')}flMark(c.x,c.y,big?1.4:1);   /* v3.07; v3.08 turf mark */dust(c.x,c.y,big?18:10,big?1.5:1);ring(c.x,c.y,big?1.6:1,'#fff');if(big)setSlow(.5,.16);
  let fp=c.role==='QB'?.055:.035;if(styled)fp=.09;fp=Math.min(fp,.3);
  const fum=!F.gb&&Math.random()<fp;
  if(fum)startPile(c,d);else endPlay('tackle',{by:d});
}
function throwTo(role,fromBuf,forceBullet){
  if(!F||F.mode!=='live')return;
  const q=F.carrier;if(!q||q.role!=='QB'||F.ballAir||F.passer!==q)return;
  if(F.lock||(F.noThrow&&F.t<F.noThrow)){if(!fromBuf)bufferInput('throw',role);return}   // he has to catch the pitch and set his feet
  const r=F.off[role];if(!r||r.stun>0)return;
  F.tgt=role;
  if(F.spWait&&!F.gb&&r.d.name===F.spName){XLOG.star.push({k:'use',kind:'catch',nm:lastNm(r.d.name),p:(G.pn||0)+1});F.spKind='catch';F.gb=true;F.breaks=0;F.maxBreaks=r.d.special==='bulldozer'?3:1;F.spWait=false;F.spUsed=true;F.spCatch=true;G.sp.ready=null;G.spArmed=false;fxText('\u2605 STAR CATCH! \u2605','#ffd23a')}   // the armed star is the target: this one is caught
  const isBullet=!!(forceBullet||keys['shift']||window.__gpBullet);const sp=(17+q.d.thr*.12)*(F.gb&&F.stars.has('cannon')?1.25:1)*(isBullet?1.26:.94);if(isBullet)popup('BULLET!',q.x,q.y+1.8,'#38c6d9');
  let T=dist(q,r)/sp+.2,tg=predict(r,T);T=dist(q,tg)/sp+.2;tg=predict(r,T);
  tg.y=Math.min(tg.y,108);
  const aim={x:tg.x,y:tg.y},gbT=F.gb&&F.stars.has('cannon');
  let range=qbRange(q)*(gbT?1.25:1),short=false;   // arm strength: how far he can really throw it
  const dd0=dist(q,tg);
  if(dd0>range&&!F.gb){const k=range/dd0;tg={x:q.x+(tg.x-q.x)*k,y:q.y+(tg.y-q.y)*k};short=true}
  if(!F.gb){   // accuracy: the ball lands near the spot, and the miss grows with distance
    let pr=99;for(const d of F.def)if(d.rush&&!d.eng&&!d.fall&&d.stun<=0)pr=Math.min(pr,dist(d,q));F.pressT=pr<PRESS.r;
    const acc=q.d.acc!==undefined?q.d.acc:Math.round((q.d.thr||60)*.9),sd=((100-acc)/100)*2.4*(1+dist(q,tg)/55)*(1+PRESS.k*clamp(1-pr/PRESS.r,0,1)),g=()=>(Math.random()+Math.random()+Math.random()-1.5)*1.6;
    tg={x:clamp(tg.x+g()*sd,1,FW-1),y:Math.min(tg.y+g()*sd*.85,108)}}
  F.ball={from:{x:q.x,y:q.y},to:tg,aim,short,bullet:isBullet,t:-.22,T:Math.max(.15,T-.22),len:dist(q,tg),target:r,cur:{x:q.x,y:q.y,h:1.4}};
  F.ballAir=true;F.carrier=null;q.vx=q.vy=0;q.throwT=.45;{const ddx=tg.x-q.x;q.thrDir=ddx<-4?'L':ddx>4?'R':'M'}r.override={x:aim.x,y:aim.y};
  SND.fx('throw');
  const ds=F.def.filter(d=>!d.eng).sort((a,b)=>dist(a,tg)-dist(b,tg));
  F.def.forEach(d=>d.chaser=false);ds.slice(0,2).forEach(d=>d.chaser=true);
  F.def.forEach(d=>{if(d.mode==='cover'&&d.assign===role)d.chaser=true});
}
window.CUE={on:1.4,off:1.0,r:.3,k:.7};
function cueGap(q,p){const C=window.CUE,cs=17+q.d.thr*.12;let cT=dist(q,p)/cs+.2,ct=predict(p,cT);cT=dist(q,ct)/cs+.2;ct=predict(p,cT);let nd=99;for(const d of F.def)if(!d.fall&&!d.eng)nd=Math.min(nd,Math.hypot(d.x-ct.x,d.y-ct.y)-Math.max(0,cT-C.r)*defSpeed(d)*C.k);return {nd,inr:dist(q,ct)<=qbRange(q)}}   // TUNE v3.16W1: OPEN cue. Clear space (yd) the receiver will have when the ball gets there, after each defender runs at k of his speed for the flight time minus r
function predict(p,T){
  let x=p.x,y=p.y,ri=p.ri;const sp=recSpeed(p);let rem=sp*T;
  while(rem>0&&p.route&&ri<p.route.length){const t=p.route[ri];const dx=t[0]-x,dy=t[1]-y,dd=Math.hypot(dx,dy);if(dd<=rem){x=t[0];y=t[1];rem-=dd;ri++}else{x+=dx/dd*rem;y+=dy/dd*rem;rem=0}}
  if(rem>.01){const spd=Math.hypot(p.vx||0,p.vy||0);if(spd>.5){const k=(rem/sp)*.9;x+=p.vx*k;y+=p.vy*k}}   // route done: he keeps going the way he is moving
  return{x:clamp(x,1,FW-1),y};
}
function resolveCatch(){
  const b=F.ball,r=b.target,tg=b.to;F.ballAir=false;
  const scr=PLAY.id==='screen';
  let dd=9;for(const d of F.def){if(scr&&d.rush)continue;dd=Math.min(dd,dist(d,tg))}
  const rr=dist(r,tg);
  if(F.gb){catchBall(r);r.x=tg.x;r.y=tg.y;if(F.spCatch){F.spCatch=false;F.cine=SP_CINE;setSlow(.22,SP_CINE*.8);flashT=.25;shakeT=.3;popup('\u2605 STAR CATCH!',r.x,r.y+1.5,'#ffd23a')}fxText(F.stars.has('hailmary')&&r.d.special==='hailmary'?'HAIL MARY!':'CAUGHT!','#ffd23a');SND.fx('catch');tdCatch(r,tg);return}
  if(rr>2.6){if(!scr&&dd<1.7&&Math.random()<.22)endPlay('int',{x:tg.x,y:tg.y});else endPlay('inc',{why:b.short?'FELL SHORT':'OFF TARGET'});return}
  const open=clamp((dd-.6)/2.4,0,1);
  const _csC=CSTY();let dcov=60;{let bd=99;for(const d of F.def){const q=dist(d,tg);if(q<bd){bd=q;dcov=d.d.cov||60}}}if(_csC.clamp)dcov+=4;
  let pc=clamp(.62+.34*open+(r.d.hnd-dcov)/320+(PW.gloves&&r.team==='O'?.1:0),.38,.97);
  pc*=1-clamp((b.len-18)/50,0,.2);   // long throws are harder to bring in
  pc*=1-clamp((rr-.8)/6,0,.3);   // a ball that isn't right on him is harder to haul in
  if(scr)pc=clamp(.9+(r.d.hnd-60)/400,.8,.98);
  // Bullet vs Lob tactical coverage tradeoffs
  let _tipped=false;
  if(!scr&&b.bullet){const mx=(b.from.x+tg.x)*.5,my=(b.from.y+tg.y)*.5;for(const d of F.def){if((d.pos==='LB'||d.pos==='DL')&&!d.fall&&Math.hypot(d.x-mx,d.y-my)<1.85){pc-=.14;_tipped=true;break}}if(dd<1.6)pc-=.05}
  else if(!scr&&!b.bullet){if(b.len>=18||tg.x<4||tg.x>FW-4)pc=Math.min(.97,pc+.08)}
  if(!scr&&_csC.bait&&Math.abs(tg.x-CX)<6&&dd<2.2)pc=Math.max(.32,pc-.06);
  
  if(Math.random()<pc){catchBall(r);if(dd<1.5)addStyle(12,'DIVING CATCH!',r.x,r.y+1.5,'#4dd0e1');else popup('CATCH',r.x,r.y+1.5,'#fff');SND.fx('catch');tdCatch(r,tg)}
  else if(!scr&&dd<1.7&&Math.random()<clamp(.10+(dcov-r.d.hnd)/280,.03,.22))endPlay('int',{x:tg.x,y:tg.y});
  else endPlay('inc',{why:_tipped?'TIPPED IN LANE':(dd<1.7?'BROKEN UP':'DROPPED')});
}
/* a ball caught in the end zone (or on the goal line) is a touchdown on the spot, before any tackle can move him out */
function tdCatch(r,tg){if(r&&r.team==='O'&&F.mode==='live'&&Math.max(r.y,(tg&&tg.y)||0)>=100){r.y=Math.max(r.y,100);glog('  CAUGHT IN THE END ZONE: touchdown');endPlay('td');return true}return false}
function catchBall(r){
  F.caught=true;F.carrier=r;F.passer=null;r.override=null;r.mode='carry';
  if(G&&G.crew&&G.crew.pickup&&r.team==='O'&&r.d&&r.d.special==='hailmary'){SAVE.route=SAVE.route||{};if(!SAVE.route.zdBond){SAVE.route.zdBond=1;SAVE.route.zdCatch=1;persist()}}
  for(const p of F.offList){if(p!==r){p.override=null;p.route=null;p.mode='block'}}
  F.def.forEach(d=>d.chaser=false);
}

/* ============================ end of play ============================ */
const BIGLINES=['OH HE\'S GONE!','WHAT A PLAY!','THE CROWD LOSES IT!','NOBODY TOUCHES HIM!','PURE STREET!','ABSOLUTELY FILTHY!'];
const HITLINES=['STUFFED AT THE LINE','HE GOES DOWN HARD','LIGHTS OUT','WRAPPED UP','BIG HIT'];
/* a fumble is not an automatic turnover: the ball goes loose in a pile and the player taps A faster than the computer defender to hold on (no ratings edge; the offense starts ahead) */
function startPile(c,d){
  if(!F||F.mode!=='live'||F.pile)return;
  F.pile={v:PILE_START,t:0,cpuT:.3,taps:0,c,d,done:false,go:.1};
  input.sx=input.sy=0;input.turbo=false;resetJoy();show('#ctl',false);show('#turboWrap',false);show('#turboLbl',false);
  SND.fx('fumble');shakeT=.3;setSlow(1,0);
  $('#pileFill').style.width=(PILE_START*100)+'%';$('#pileT').textContent='';const _hm=!!(window.A11Y&&window.A11Y.cfg.holdToMash);$('#pileSub').innerHTML=_hm?'HOLD <b>A</b> TO HOLD ON!':'MASH <b>A</b> TO HOLD ON!';
  show('#pile',true)}
function pileTap(){const P=F&&F.pile;if(!P||P.done||P.go>0)return;P.v=Math.min(1,P.v+PILE_TAP);P.taps++;beep(380+P.v*520,.03,'square',.03);const b=$('#pileBtn');b.classList.add('dn');clearTimeout(pileTap._t);pileTap._t=setTimeout(()=>b.classList.remove('dn'),50)}
function pileTick(dt){
  const P=F&&F.pile;if(!P||P.done)return;
  if(P.go>0){P.go-=dt;return}
  if(window.A11Y&&window.A11Y.cfg.holdToMash&&window.__pileHeld){P._ha=(P._ha||0)+dt;while(P._ha>=.15){P._ha-=.15;pileTap()}}
  P.t+=dt;P.cpuT-=dt;
  while(P.cpuT<=0){P.v=Math.max(0,P.v-PILE_TAP);P.cpuT+=(1/PILE_CPU)*rnd(.8,1.2)}
  $('#pileFill').style.width=(P.v*100)+'%';$('#pileT').textContent=Math.max(0,PILE_T-P.t).toFixed(1)+'s';
  if(P.v>=1||P.v<=0||P.t>=PILE_T)pileEnd(P.v>=.5)}
function pileEnd(won){
  const P=F.pile;if(!P||P.done)return;P.done=true;show('#pile',false);
  const c=P.c,d=P.d;F.pile=null;{const rate=+(P.taps/Math.max(.1,P.t)).toFixed(1);XLOG.pile.push({won,taps:P.taps,rate});glog('  PILE-UP '+(won?'HELD ON':'LOST IT')+' taps '+P.taps+' ('+rate+'/s) of '+P.t.toFixed(1)+'s')}
  if(won){SND.fx('first');bannerExtra='YOU HELD ON!';endPlay('tackle',{by:d||F.def[0]})}
  else endPlay('fumble',{})}
function endPlay(type,ex){
  if(!F||F.mode!=='live')return;
  F.mode='dead';G.mode='dead';show('#ctl',false);show('#turboWrap',false);show('#turboLbl',false);
  input.sx=input.sy=0;input.turbo=false;resetJoy();
  const c=F.carrier||F.passer||F.off.QB;
  SND.fx(type==='td'?'':type==='inc'?((ex&&ex.why==='BROKEN UP')?'deflect':'incomplete'):type==='int'?'int':type==='fumble'?'fumble':'whistle');
  let spot=c.y,title,sub,oppGain=8;
  REP.endT=F.t;REP.big=false;
  if(type==='td'){spot=100;title='TOUCHDOWN!';sub=pick(BIGLINES);oppGain=0}
  else if(type==='inc'){spot=F.los;title='INCOMPLETE';sub=(ex&&ex.why)||'';oppGain=12}
  else if(type==='int'){spot=ex.y;title='INTERCEPTED!';sub=spot>=100?'Picked off in the end zone · TOUCHBACK':'Picked off in the alley';oppGain=45}   // v3.05 (item 11): end-zone pick = touchback
  else if(type==='fumble'){title='FUMBLE!';sub='The ball is loose and they pounce on it';oppGain=45}
  else{
    const gain=Math.round(spot-F.los);
    if(c.role==='QB'&&F.passer===c&&spot<F.los-.4){title='SACKED!';sub='Loss of '+Math.abs(gain);oppGain=35}
    else if(type==='oob'){title=(gain>0?gain+' YARDS':'NO GAIN')+' \u00b7 OUT OF BOUNDS';sub='';oppGain=5}
    else{title=gain>0?gain+'-YARD GAIN':gain===0?'NO GAIN':'LOSS OF '+Math.abs(gain);sub=gain>=12?pick(BIGLINES):pick(HITLINES);oppGain=gain<=0?25:gain<=3?14:gain<8?7:2}
    if(gain>=(F.caught?20:10))bannerExtra='EXPLOSIVE PLAY!'   // the third banner line, stacked instead of floating over the other two
  }

  {const ri=(typeof hbRefFlag==='function')?hbRefFlag(type,spot,c):null;if(ri){if(type==='td')SND.fx('whistle');F.refInfo=ri;type='flag';spot=F.los;title='FLAG';sub=ri.call;bannerExtra='';oppGain=0}}
  if(type==='td'){bmTD();if(typeof shipPuff==='function')shipPuff();SND.fx('td');fxText('TOUCHDOWN!','#ffd23a');if(c&&!c.fall){c.celeb=CELEB_T;c.celebV=Math.floor(Math.random()*3);c.vx=c.vy=0}}   /* v3.11: the celebration waits for the flag check */
  F.res={type,spot};REP.big=REP.F===F&&(type==='td'||type==='int'||type==='fumble'||spot-F.los>=20||(c.role==='QB'&&F.passer===c&&spot<F.los-.4));
  {const _gn=Math.round(spot-F.los),_imp=(type==='td'?100:0)+Math.max(0,_gn)+(F.combo&&F.combo.n>=3?25:0);if(REP.F===F&&REP.fr.length>=20&&(type==='td'||_gn>=15)&&_imp>POTG.score){POTG.score=_imp;POTG.F=F;POTG.fr=REP.fr.slice();POTG.label=(type==='td'?'TD · ':'')+_gn+' YDS'}}
  PLOG.push({car:c.role,cname:lastNm(c.d.name),star:!!(c.d.star||c.d.special),sp:F.spUsed?(F.spKind||'run'):'',tgt:F.tgt||'',comp:!!(F.tgt&&F.caught&&type!=='inc'&&type!=='int'),juke:F.cn.juke||0,stiff:F.cn.stiff||0,style:F.cn.style||0,brk:F.cn.brk||0,pow:F.cn.pow||0,starBrk:F.cn.starBrk||0,turboUsed:Math.round(100-F.turbo),by:(ex&&ex.by)?ex.by.pos:'',dep:(ex&&ex.by)?+(ex.by.y-F.los).toFixed(1):0,cn:F.cn,ad:!!G.adapted,gb:!!F.gb,id:PLAY.id,call:G.call,type,gain:Math.round(spot-F.los),sack:type==='tackle'&&c.role==='QB'&&F.passer===c&&spot<F.los-.4,t:+F.t.toFixed(1)});
  {G.pn=(G.pn||0)+1;const gn=Math.round(spot-F.los);if(type==='tackle'||type==='td'||type==='oob'){G.dv.plays++;G.dv.yds+=gn}else G.dv.plays++;
   const S2=F.snap2||{};glog('p'+G.pn+' '+S2.down+'&'+S2.togo+' @'+S2.los+' '+PLAY.id+'/'+G.call+' -> '+type.toUpperCase()+' '+gn+'y | '+lastNm(c.d.name)+'('+c.role+')'+((c.d.star||c.d.special)?'*':'')+(F.spUsed?' STAR-'+(F.spKind||'run'):S2.armed?' (armed, star not used)':S2.ready?' (star ready, not armed)':'')+' | brk '+(F.cn.brk||0)+' pow '+(F.cn.pow||0)+' starBrk '+(F.cn.starBrk||0)+' juke '+(F.cn.juke||0)+' stiff '+(F.cn.stiff||0)+' style '+(F.cn.style||0)+' | tkl '+((ex&&ex.by)?ex.by.pos+'@'+(ex.by.y-F.los).toFixed(0):'-')+' | turbo '+Math.round(100-F.turbo)+'% | '+F.t.toFixed(1)+'s'+(G.adapted?' | D ADAPTED':'')+' | '+gs())}

  if(type==='tackle'&&c.role==='QB'&&F.passer===c&&spot<F.los-.4&&SND.pa)SND.pa('pa_sack','SACKED!');
  if(type==='int'||type==='fumble')haptic('warning');   // v3.16EE1
  {const gn=Math.round(spot-F.los);if((type==='tackle'||type==='oob'||type==='td')&&!F.spUsed){let nm=null,pt=0;if(type==='td'&&gn>=40){nm='HOUSE CALL!';pt=25}else if(gn>=30){nm='HIGHLIGHT REEL!';pt=20}else if(type!=='td'&&S2c(gn)){nm='MOVIN\' THE STICKS!';pt=6}if(nm){G.style+=pt;if(type==='td')bannerExtra=nm;else{bannerExtra='';bmCall(nm,'#ffd23a');stylePts(pt)}}}}   // v3.16W2: named big plays
  if(window.SG&&window.SG.onEnd)window.SG.onEnd(type,spot-F.los,PLAY.id,G.call);
  try{csPlay(c,type,Math.round(spot-F.los))}catch(e){try{console.error(e)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}   // v3.15 career stats + goals (no dice)
  popups.length=0;
  {const sp=G.sp,gain=spot-F.los,nm=c.d.name,isStar=q=>q&&(q.d.star||q.d.special),mult=F.spRep?SP_REP:1;
   if(F.spWait&&!F.spUsed)XLOG.star.push({k:'wasted',nm:lastNm(F.spName),p:G.pn});
   if(F.spUsed){sp.ready=null;G.spArmed=false;sp.cool=1}
   else if(sp.ready){sp.left--;if(sp.left<=0){popup('STAR PLAY LOST',c.x,c.y+1.5,'#e5484d');XLOG.star.push({k:'lost',nm:lastNm(sp.ready),p:G.pn});glog('  STAR PLAY EXPIRED UNUSED ('+lastNm(sp.ready)+')');sp.ready=null;G.spArmed=false}}
   const add=(name,v,why)=>{const m0=sp.m[name]||0,m1=clamp(m0+v,0,100);sp.m[name]=m1;if(Math.abs(v)>=.5){XLOG.star.push({k:'m',nm:lastNm(name),v:Math.round(v),why,m:Math.round(m1),p:G.pn});glog('  STAR METER '+lastNm(name)+' '+(v>=0?'+':'')+Math.round(v)+' ('+why+') -> '+Math.round(m1)+(F.spRep&&v>0?' [repeat call, half credit]':''))}return m1};
   if(isStar(c)&&F.carrier===c&&(type==='tackle'||type==='oob'||type==='td'||type==='fumble')){
     if(type==='fumble')add(nm,-SP_TO,'fumble');
     else{let v=(F.spAcc[nm]||0);const why=[];if(F.spAcc[nm])why.push('style/breaks '+Math.round(F.spAcc[nm]));
       if(gain>=SP_YARDS){v+=SP_BIG;why.push('big play '+Math.round(gain)+'y')}else if(gain>0){v+=gain*SP_YD;why.push(Math.round(gain)+'y')}
       if(spot>=G.ltg&&type!=='td'){v+=SP_FD;why.push('first down')}if(type==='td'){v+=SP_TD;why.push('TD')}
       v=Math.min(SP_CAP,v*mult);if(gain<0){v=-SP_LOSS;why.length=0;why.push('lost '+Math.abs(Math.round(gain))+'y')}
       const m1=add(nm,v,why.join(', '));
       if(v>0&&m1<100)bannerExtra=(bannerExtra?bannerExtra+' \u00b7 ':'')+'\u2605 +'+Math.round(v)+'%'}}
   else if(type==='int'&&isStar(F.off.QB)&&F.off.QB.d)add(F.off.QB.d.name,-SP_TO,'interception');
   if(type==='inc'&&F.tgt){const r=F.off[F.tgt];if(r&&isStar(r))add(r.d.name,-SP_INC,'incomplete')}
   if((type==='tackle'||type==='td'||type==='oob')&&F.caught&&F.passer===null&&gain>=SP_YARDS&&F.off.QB&&isStar(F.off.QB)&&F.off.QB!==c)add(F.off.QB.d.name,SP_QB*mult,'completion '+Math.round(gain)+'y');
   if(sp.cool>0&&!F.spUsed)sp.cool--;
   else if(!sp.ready&&!F.spUsed){const full=starsOnO().filter(q=>(sp.m[q.name]||0)>=100).sort((a,b)=>(sp.m[b.name]||0)-(sp.m[a.name]||0))[0];
     if(full){XLOG.star.push({k:'ready',nm:lastNm(full.name),p:G.pn});glog('  STAR PLAY READY: '+lastNm(full.name));sp.ready=full.name;sp.left=SP_PLAYS;sp.m[full.name]=0;popup('\u2605 STAR PLAY READY! \u2605',c.x,c.y+1.5,'#ffd23a');bannerExtra='\u2605 STAR PLAY READY';SND.fx('gbArm')}}}
  const ms=type==='td'?1200:900;   // v3.13 C: result banners 1.2 s at most (a tap still skips)
  say(title,sub,ms,()=>finishPlay(F.res));
}
function finishPlay(r){
  if(r.type==='flag'){hbRefBeat(()=>{if(F.refInfo&&F.refInfo.turnover){turnover(G.los,true);return}say((F.refInfo&&F.refInfo.td)?'NO TOUCHDOWN':'REPLAY DOWN',ddText()+' \u00b7 '+spotTxt(G.los),700,enterPlaycall)});return}
  if(r.type==='td'){G.you+=7;afterScore(true);return}
  if(r.type==='int'&&r.spot>=100){spNewDrive();G.dvRes=G.dvRes||'turnover';G.mode='dead';say('TOUCHBACK','They start at their 25',1200,()=>oppDrive(25));return}   // v3.05 (item 11, user approved): a pick in their end zone is a touchback at their 25 (was their 1)
  if(r.type==='int'){turnover(r.spot);return}
  if(r.type==='fumble'){turnover(r.spot);return}
  const spot=clamp(Math.round(r.spot),1,99);
  let note;
  if(spot>=G.ltg){G.los=spot;G.down=1;G.togo=Math.min(25,100-spot);G.ltg=Math.min(100,spot+25);note='FIRST DOWN';SND.fx('first');fxText('FIRST DOWN','#ffd23a')}
  else{G.los=spot;G.down++;G.togo=Math.ceil(G.ltg-spot);if(G.down>4){turnover(spot,true);return}note=ORD[G.down].toUpperCase()+' DOWN'}
  say(note,ddText()+' \u00b7 '+spotTxt(G.los),600,enterPlaycall);
}
function afterScore(td){spNewDrive();G.dvRes=G.dvRes||'td';
  if(G.you>=G.target){endGame(true);return}
  oppDrive(25);
}
function turnover(spot,downs){spNewDrive();G.dvRes=G.dvRes||(downs?'downs':'turnover');
  G.mode='dead';
  say(downs?'TURNOVER ON DOWNS':'THEY GET THE BALL','',1200,()=>oppDrive(clamp(100-spot,1,99)));
}
/* DEFENSE: one rating, "DEFENSE", built from the offense stats (speed = coverage, strength = tackling, blocking = DL moves), so upgrading the offense lifts the defense too. */
const DEF_W={QB:{spd:.4,pow:.3,blk:.1,hnd:.2},RB:{spd:.3,pow:.4,blk:.1,hnd:.2},WR:{spd:.4,pow:.25,blk:.1,hnd:.25},TE:{blk:.3,pow:.35,spd:.15,hnd:.2},OL:{blk:.45,pow:.4,spd:.05,hnd:.1}};
const DEF_ADJ=4;
function defOvr(p){const w=DEF_W[p.pos]||{spd:.3,pow:.3,blk:.25,hnd:.15};let x=0;for(const k in w)x+=(p[k]||60)*w[k];return Math.round(x+DEF_ADJ)}
const teamDef=()=>Math.round(SLOTS.reduce((a,k)=>a+defOvr(SAVE.starters[k]),0)/SLOTS.length);
/* THEIR DRIVE is played out snap by snap from the ratings and the field position, so the result comes from the plays you can read in the ticker. THE ZONE: a player with 4 tackles on one drive is in the zone, and on the next 3 plays each has a chance he forces a fumble or picks it off. */
const ZONE_N=4,ZONE_TO=.25,ZONE_PLAYS=3;
const DCALLS={blitz:{n:'BLITZ',d:'More stops and takeaways. Big plays and touchdowns when it fails.',stuff:.07,big:.06,to:.025,rz:0},bal:{n:'BALANCED',d:'Standard odds.',stuff:0,big:0,to:0,rz:0},prev:{n:'PREVENT',d:'Fewer big plays and touchdowns. They settle for field goals more.',stuff:-.04,big:-.07,to:-.01,rz:.45,wall:.08,wallY:80}};   // v3.03 (item 9, user picked MILD): PREVENT bends but does not break: inside your 20 (yd >= wallY) +8 stop odds per play, and 45% of their touchdown plays stopped at the 2 (was 40%)
const HND_BASE=67.6,teamHands=()=>SLOTS.reduce((a,k)=>a+(SAVE.starters[k].hnd||60),0)/SLOTS.length;
const SIM_K={hk:.0009,mean:5.2,mk:.1,stuff:.17,sk:.005,big:.085,bk:.003,to:.012,tk:.0004};
function ydTxt(yd){const my=100-yd;return yd>50?'YOUR '+Math.round(my):'THEIR '+Math.round(yd)}
const CAP_SIM=10;   // v2.85: the captain's drives get this much extra offense (about half their drives end in a touchdown)
/* v3.01: their offense and your defense as the drive really uses them, and the per-play odds for a call (no dice rolled here) */
function dcSide(){const c=G.crew,boost=(c.captain||c.r2boss)&&!c.practice?(c.capSim!==undefined?c.capSim:CAP_SIM):0,gaff=PW.gaff?4:0;
  return{T:c.T||73,boost,O:(c.T||73)+boost,d:teamDef(),gaff,D:teamDef()+gaff}}
function dcOdds(m,cm,yd){const K=SIM_K,w=cm.wall&&yd>=cm.wallY?cm.wall:0;return{pS:clamp(K.stuff-m*K.sk+cm.stuff+w,.06,.4),pB:clamp(K.big+m*K.bk+cm.big,.015,.22),pT:clamp(K.to+m*K.tk+cm.to+(teamHands()-HND_BASE)*K.hk,.008,.09)}}
function simDrive(fp,call){
  const O=(G.crew.T||73)+((G.crew.captain||G.crew.r2boss)&&!G.crew.practice?(G.crew.capSim!==undefined?G.crew.capSim:CAP_SIM):0),   /* v2.86: a crew can set its own capSim (Bram +7) */Dm=teamDef()+(PW.gaff?4:0),m=O-Dm,cm=DCALLS[call]||DCALLS.bal,K=SIM_K;
  const D=SLOTS.map(k=>{const q=SAVE.starters[k];return{q,tk:0,w:defOvr(q)+((q.star||q.special)?30:0)}});
  const pickD=()=>{let tot=0;for(const d of D)tot+=d.w;let x=Math.random()*tot;for(const d of D){x-=d.w;if(x<=0)return d}return D[0]};
  const ln=q=>String(q.name||'').replace(/^.*\s/,'').toUpperCase(),ord=n=>['','1st','2nd','3rd','4th'][n]||'4th';
  let yd=fp,down=1,togo=Math.min(25,100-fp),zone=null,zLeft=0,res=null,turn=null,snaps=0,plays=0,wallSaid=false;const L=[{t:'THEY START AT '+ydTxt(fp),c:'',s:{yd:fp,down:1,togo}}];
  while(!res&&snaps<14){
    if(down===4){
      const fgOk=yd>=62,pFG=clamp(.9-(100-yd+17-25)*.014,.35,.95);
      if(fgOk&&(togo>5||Math.random()<.3)){const good=Math.random()<pFG;L.push({t:'4th & '+Math.ceil(togo)+' · FIELD GOAL '+(good?'IS GOOD':'MISSES'),c:good?'bad':'good'});res=good?'fg':'stop';break}
      if(!(togo<=5&&Math.random()<.5)){L.push({t:'4th & '+Math.ceil(togo)+' \u00b7 PUNT',c:'good'});res='stop';break}
      L.push({t:'4th & '+Math.ceil(togo)+' · THEY GO FOR IT',c:''})}
    snaps++;
    if(zone&&zLeft>0){zLeft--;if(Math.random()<ZONE_TO){const q=zone.q,rcv=q.pos==='WR'||q.pos==='QB';turn={d:zone,kind:rcv?'int':'fum'};L.push({t:ord(down)+' & '+Math.ceil(togo)+' · ★ '+ln(q)+(rcv?' PICKS IT OFF!':' FORCES A FUMBLE!'),c:'zone'});res='turnover';break}}
    if(cm.wall&&yd>=cm.wallY&&!wallSaid){wallSaid=true;L.push({t:'INSIDE YOUR 20 · PREVENT TIGHTENS UP',c:''})}   // v3.03: says when the PREVENT wall starts (no dice)
    const pass=Math.random()<.5,r=Math.random();
    const {pS,pB,pT}=dcOdds(m,cm,yd);   // v3.01: same formula, now shared with the call screen
    const hd=ord(down)+' & '+Math.ceil(togo)+' · '+(pass?'Pass':'Run')+' · ';
    let gain,txt;plays++;
    if(r<pT){const d=pickD();turn={d,kind:pass?'int':'fum'};const _st=(d.q.star||d.q.special)?'\u2605 ':'';L.push({t:hd+_st+ln(d.q)+(pass?' JUMPS THE ROUTE — PICK!':' STRIPS IT LOOSE — FUMBLE!'),c:'zone'});d.tk++;res='turnover';break}
    else if(r<pT+pS){gain=Math.round(rnd(-3,1));const d=pickD();d.tk++;txt=pass?(gain<=-2?'SACKED by '+ln(d.q)+' for '+Math.abs(gain):gain===0?'Incomplete':'Stopped by '+ln(d.q)+' after '+gain):(gain<0?ln(d.q)+' drops him for '+Math.abs(gain):'Stuffed by '+ln(d.q)+' for '+gain);if(pass&&gain>-2)gain=0}
    else if(r<pT+pS+pB){gain=Math.round(rnd(20,40));const d=pickD();d.tk++;txt='BIG PLAY, '+gain+' yards · run down by '+ln(d.q)}
    else{gain=Math.round(clamp(rnd(5,14)+m*K.mk,1,20));const a=pickD();a.tk++;if(Math.random()<.2){const b=pickD();if(b!==a)b.tk++}txt=(pass?'Complete, ':'Run, ')+gain+' yards · '+ln(a.q)+' makes the stop'}
    if(call==='prev'&&yd+gain>=100&&Math.random()<cm.rz)gain=Math.max(1,98-yd);
    gain=Math.min(gain,100-yd);yd+=gain;togo-=gain;
    L.push({t:hd+txt,c:gain>=20?'bad':gain<=0?'good':''});
    if(yd>=100){L[L.length-1].s={yd:100,down:1,togo:0};L.push({t:'TOUCHDOWN',c:'bad',s:{yd:100,down:1,togo:0}});res='td';break}
    if(togo<=0){down=1;togo=Math.min(25,100-yd)}else down++;
    L[L.length-1].s={yd,down,togo};
    if(!zone){const z=D.find(d=>d.tk>=ZONE_N);if(z){zone=z;zLeft=ZONE_PLAYS;L.push({t:'★ '+ln(z.q)+' IS IN THE ZONE ('+z.tk+' tackles)',c:'zone'})}}
    if(down>4){L.push({t:'TURNOVER ON DOWNS',c:'good'});res='stop'}
  }
  if(!res){res=yd>=62?'fg':'stop';L.push({t:res==='fg'?'FIELD GOAL IS GOOD':'DRIVE STALLS',c:res==='fg'?'bad':'good'})}
  return{L,res,turn,zone,D,plays,snaps,m}}
let deferredDefCallFp=null;
function flushDeferredDefCall(){if(deferredDefCallFp===null||!$('#tick').hidden||document.body.classList.contains('ach-toast-active')||$('#banner').classList.contains('show'))return false;const fp=deferredDefCallFp;deferredDefCallFp=null;showDefCall(fp);return true}
function showDefCall(fp){
  if(!$('#tick').hidden||document.body.classList.contains('ach-toast-active')||$('#banner').classList.contains('show')){deferredDefCallFp=fp;show('#dcall',false);return false}
  deferredDefCallFp=null;sayTok++;sayCur=null;const possessionBanner=$('#banner');possessionBanner.classList.remove('show');possessionBanner.innerHTML='';
  const S=dcSide(),m=S.O-S.D,pc=x=>Math.round(x*100)+'%';
  $('#dcTop').textContent='THEY GET THE BALL · '+ydTxt(fp);
  $('#dcRate').innerHTML='THEIR OFFENSE <b>'+S.O+'</b>'+(S.boost?' <small>('+S.T+' + '+S.boost+' captain push)</small>':'')+' · YOUR DEFENSE <b>'+S.D+'</b>'+(S.gaff?' <small>('+S.d+' + 4 gaff)</small>':'');   // v3.01: the numbers the drive really uses
  for(const b of $('#dcall').querySelectorAll('button[data-c]')){const k=b.dataset.c,o=dcOdds(m,DCALLS[k]);let e=b.querySelector('.dco');if(!e){e=document.createElement('span');e.className='dco';b.appendChild(e)}
    e.replaceChildren();
    const rows=[['STOP',pc(o.pS)],['BIG PLAY',pc(o.pB)],['TAKEAWAY',pc(o.pT)]];
    for(const [label,value] of rows){const row=document.createElement('span');row.className='dco-row';const name=document.createElement('span');name.className='dco-label';name.textContent=label;const rate=document.createElement('b');rate.className='dco-value';rate.textContent=value;row.append(name,rate);e.appendChild(row)}
    if(k==='prev'){const note=document.createElement('span');note.className='dco-note';note.textContent='INSIDE YOUR 20 · STOP '+pc(dcOdds(m,DCALLS[k],100).pS)+' · '+pc(DCALLS[k].rz)+' OF TOUCHDOWNS STOPPED AT THE 2';e.appendChild(note)}}
  show('#sheet',false);show('#fourth',false);show('#dcall',true);
  gdTip('def','THEIR BALL: PICK A DEFENSE · EACH BUTTON SHOWS ITS ODDS FOR EVERY PLAY',5000)}   // v3.01: guided first game
$('#dcall').addEventListener('click',e=>{const bt=e.target.closest&&e.target.closest('button[data-c]'),a=bt&&bt.dataset.c;if(!a||!G||(!G.pendFp&&G.pendFp!==0))return;const fp=G.pendFp;G.pendFp=null;beep(300,.08);show('#dcall',false);runOppDrive(fp,a);if(achQ.length&&!achTimer&&!document.body.classList.contains('ach-toast-active'))achNext()});   // tapping the small text inside a button counts too; a second tap can't start the drive twice
function oppDrive(fp){
  G.mode='dead';G.guide1=false;   // v3.00: the play clock is back from the next drive
  {const dv=G.dv||{plays:0,yds:0};XLOG.drives.push({res:G.dvRes||'other',plays:dv.plays,yds:Math.round(dv.yds)});glog('YOUR DRIVE ENDED: '+(G.dvRes||'other')+', '+dv.plays+' plays, '+Math.round(dv.yds)+' yds');G.dv={plays:0,yds:0};G.dvRes=null}
  G.pendFp=Math.round(fp);showDefCall(G.pendFp)}
function runOppDrive(fp,call){
  const S=simDrive(fp,call),ln=q=>String(q.name||'').replace(/^.*\s/,'').toUpperCase();let pts=S.res==='td'?7:S.res==='fg'?3:0,t,s,cont;
  if(S.res==='turnover'){const tn=S.turn;t=tn.kind==='int'?'★ '+ln(tn.d.q)+' PICKS IT OFF!':tn.kind==='fum'?'FUMBLE! WE GET IT BACK':'TURNOVER';s='You take over';cont=()=>{G.los=Math.round(clamp(100-fp+rnd(-5,5)+(S.snaps>2?0:0),22,70))}}
  else if(S.res==='td'){t=G.crew.name.toUpperCase()+' SCORE';s='+7';cont=()=>{G.los=25}}
  else if(S.res==='fg'){t='THEIR FIELD GOAL';s='+3';cont=()=>{G.los=25}}
  else{t='THEY COME UP EMPTY';s='Stopped';cont=()=>{G.los=Math.round(rnd(28,42))}}
  const lead=S.D.slice().sort((a,b)=>b.tk-a.tk)[0];if(S.res!=='turnover'&&lead.tk>=3)s+=' · '+ln(lead.q)+' '+lead.tk+' TKL';
  XLOG.opp.push({res:S.res==='stop'?'stop':S.res,call,plays:S.plays,fp:Math.round(fp),zone:S.zone?ln(S.zone.q):'',zoneTk:S.zone?S.zone.tk:0,kind:S.turn?S.turn.kind:'',lead:S.D.slice().sort((a,b)=>b.tk-a.tk).slice(0,3).map(d=>ln(d.q)+' '+d.tk).join(', '),m:S.m});
  glog('THEIR DRIVE ['+call+'] start '+ydTxt(fp)+' | rating gap '+S.m+' | '+S.res.toUpperCase()+' | '+S.plays+' plays | zone: '+(S.zone?ln(S.zone.q):'none')+' | tackles: '+S.D.slice().sort((a,b)=>b.tk-a.tk).map(d=>ln(d.q)+' '+d.tk).join(', '));
  for(const x of S.L)glog('    '+x.t);
  G.opp+=pts;if(G.ms&&S.res==='td')G.ms.tdA++;   // v3.15: for the SHUTOUT challenge
  const fin=()=>say(t,s,1200,()=>{   // v3.13 C: 1.2 s (tap skips)
    if(G.opp>=G.target){endGame(false);return}
    cont();G.down=1;G.togo=Math.min(25,100-G.los);G.ltg=Math.min(100,G.los+25);enterPlaycall()});
  playTicker(S.L,fin,call)}
let tickT=null;
/* SUPER SIM: their drive plays out on the real field. SIMV holds the blue line of scrimmage and the yellow first-down line (in your field coordinates), the ball marker sits on the line, and the camera frames both. */
const SIMV={on:false,cl:50,cf:40,tl:50,tf:40,show:true};
function simSet(s,snap){if(!s)return;SIMV.tl=100-s.yd;SIMV.tf=(s.yd+s.togo>=100||s.yd>=100)?-99:100-(s.yd+s.togo);if(snap){SIMV.cl=SIMV.tl;SIMV.cf=SIMV.tf>-50?SIMV.tf:SIMV.tl-25;cam.y=Math.min(SIMV.cl,SIMV.cf)-5.5;cam.x=CX;cam.zoom=1;cam.zv=0}}
function simStep(rdt){const k=1-Math.exp(-5*rdt);SIMV.cl+=(SIMV.tl-SIMV.cl)*k;const tf=SIMV.tf>-50?SIMV.tf:SIMV.tl-25;SIMV.cf+=(tf-SIMV.cf)*k}
function drawSimMarker(){
  const y=SIMV.cl,pr=P(CX,y),u=pr.u;if(pr.sy<-60||pr.sy>H+60)return;
  ctx.save();ctx.globalAlpha=.5;ctx.strokeStyle='#2f6bff';ctx.lineWidth=Math.max(2,u*.18);ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,u*2.2,u*.8,0,0,7);ctx.stroke();ctx.restore();   // glow ring on the line of scrimmage
  ctx.save();ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.ellipse(pr.sx+u*.15,pr.sy+u*.12,u*1.25,u*.5,0,0,7);ctx.fill();
  ctx.translate(pr.sx,pr.sy-u*.35);ctx.fillStyle='#8a4a22';ctx.strokeStyle='#2a1408';ctx.lineWidth=Math.max(1.5,u*.12);ctx.beginPath();ctx.ellipse(0,0,u*1.15,u*.62,0,0,7);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#fff';ctx.lineWidth=Math.max(1,u*.1);ctx.beginPath();ctx.moveTo(-u*.45,0);ctx.lineTo(u*.45,0);ctx.stroke();for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*u*.2,-u*.14);ctx.lineTo(i*u*.2,u*.14);ctx.stroke()}ctx.restore();
  for(let i=1;i<=3;i++){const q=P(CX,y-i*2.2),w=q.u*(1.5-i*.2);ctx.save();ctx.globalAlpha=.75-i*.17;ctx.strokeStyle='#ffd23a';ctx.lineWidth=Math.max(2,q.u*.22);ctx.beginPath();ctx.moveTo(q.sx-w,q.sy-w*.5);ctx.lineTo(q.sx,q.sy+w*.2);ctx.lineTo(q.sx+w,q.sy-w*.5);ctx.stroke();ctx.restore()}   // chevrons: they are driving toward you
}
function playTicker(L,done,call){
  const P=$('#tkPlay');show('#tick',true);clearTimeout(tickT);
  SIMV.on=true;simSet(L[0].s||{yd:25,down:1,togo:25},true);
  $('#tkTitle').textContent='THEIR DRIVE'+(call?' \u00b7 '+({blitz:'BLITZ',bal:'BALANCED',prev:'PREVENT'}[call]||''):'');
  let i=0,fin=false,cur=L[0].s||{yd:25,down:1,togo:25};
  const setS=s=>{if(!s)return;cur=s;simSet(s);$('#tkSt').textContent=s.yd>=100?'IN THE END ZONE':ORD[Math.min(4,s.down)]+' & '+(100-s.yd<=25&&s.togo>=100-s.yd?'Goal':Math.ceil(s.togo))+' \u00b7 BALL ON '+ydTxt(s.yd)};
  setS(cur);
  const show1=x=>{P.className=x.c||'';P.classList.remove('pop');void P.offsetWidth;if(x.c!=='zone')P.classList.add('pop');P.textContent=x.t;setS(x.s)};
  const end=()=>{if(fin)return;fin=true;clearTimeout(tickT);setTimeout(()=>{show('#tick',false);SIMV.on=false;done()},650)};
  const add=()=>{if(i>=L.length){end();return}const x=L[i++];show1(x);if(x.c==='zone')SND.fx('gbArm');else beep(x.c==='bad'?200:x.c==='good'?520:360,.05,'square',.03);tickT=setTimeout(add,i>=L.length?1100:x.c==='zone'?1400:1000)};
  $('#tick').onclick=()=>{if(fin)return;clearTimeout(tickT);while(i<L.length)show1(L[i++]);end()};
  add()}
function stt(){return SAVE.stats||(SAVE.stats={games:0,wins:0,secs:0})}
const scoreHTML=c=>{const e=t=>String(t).replace(/[<>&]/g,'');return '<div style="font:700 12px/1.2 system-ui,sans-serif;letter-spacing:.14em;color:#cdbfa5;text-shadow:none">'+e((SAVE.teamName||'YOU').toUpperCase().slice(0,14))+'  vs  '+e(String(c.short||c.name).toUpperCase())+'</div><div style="font-size:54px;line-height:1.05">'+G.you+' - '+G.opp+'</div>'};
const endScoreHTML=c=>{const clean=t=>String(t).replace(/[<>&]/g,'');const away=logoSVG(crewLogo(c),c.col||'#9b5cff',c.town,{shape:'shield'});return '<span class="ui-end-logo">'+myLogoHTML('34px')+'</span><span class="ui-end-score-matchup"><b>'+clean((SAVE.teamName||'YOU').toUpperCase().slice(0,14))+'</b><i>VS</i><b>'+clean(String(c.short||c.name).toUpperCase())+'</b></span><strong class="ui-end-score-value">'+G.you+' <i>–</i> '+G.opp+'</strong><span class="ui-end-logo">'+away+'</span>'};
function endGame(win){achClear();endStyleShow();
  XLOG.games.push({res:win?'WIN':'LOSS',score:G.you+'-'+G.opp,plays:G.pn||0,secs:Math.round((performance.now()-(G.t0||performance.now()))/1000)});glog('=== GAME OVER: '+(win?'WIN':'LOSS')+' '+G.you+'-'+G.opp+' vs '+(G.crew&&G.crew.name)+' ===');
  SND.fx(win?'win':'lose');
  {const s=stt();s.games++;if(win)s.wins++;if(G.guide){SAVE.tutDone=1;G.guide=false;gdHide()}persist()}   // v3.00: the guided first game happens once
  G.mode='end';const c=G.crew;const hud=$('#hud');if(hud&&c&&!c.pickup&&!c.r2){hud.hidden=false;hud.classList.add('ui-end-render-only');hud.setAttribute('aria-hidden','true');hud.inert=true}else show('#hud',false);show('#sheet',false);show('#fourth',false);show('#ctl',false);show('#setbar',false);
  if(c&&c.r2){r2End(win,c);return}
  if(c&&c.pickup){   // route encounter: never touches SAVE.beaten, SAVE.rm, team stats or the crew counter
    SAVE.route=SAVE.route||{};
    if(!win){
      if(c.id==='rats2'&&!SAVE.route.zdBond){SAVE.route.zdBond=1;persist()}
      $('#endScore').innerHTML=endScoreHTML(c);$('#endNote').textContent=(c.id==='rats1')?"Pressure got you. Come back when it doesn't.":'Not yet.';syncEndExtras('#end');screens('#end');return}
    let gained=0;
    if(!SAVE.route[c.id]){SAVE.route[c.id]=1;SAVE.upPts=(SAVE.upPts||0)+3;gained=3}
    if(c.id==='rats2'&&!SAVE.route.zdBond)SAVE.route.zdBond=1;
    persist();
    $('#stTitle').textContent='CHANNEL CLEARED';$('#stScore').innerHTML=scoreHTML(c);
    $('#stNote').textContent=gained?'Spend the points on any starter.':'You already cleared this test. Route tests pay once.';
    $('#stList').innerHTML='';if(gained)rwShow($('#stList'),{gain:gained,total:SAVE.upPts,why:['+3 \u00b7 first time through the '+c.name+' test (route tests pay once)']});show('#stDone',true);syncEndExtras('#steal');screens('#steal');return}
  if(c&&c.practice){$('#endH').textContent=win?'PRACTICE WIN':'PRACTICE LOSS';$('#endScore').innerHTML=endScoreHTML(c);$('#endNote').textContent=win?'Practice win. No rewards.':'Practice loss. No penalty.';syncEndExtras('#end');screens('#end');return}
  if(!win){$('#endH').textContent='TOUGH LOSS';$('#endScore').innerHTML=endScoreHTML(c);$('#endNote').textContent=c.lose?c.boss.replace(/"/g,'')+': "'+c.lose+'"':'Tough one against '+c.name+'. Change up the plays and try again.';syncEndExtras('#end');screens('#end');return}
  const first=!SAVE.beaten.includes(c.id);SAVE.rm=SAVE.rm||{};let gain=0;if(first)gain=c.gain!==undefined?c.gain:(c.captain?10:7);else if((SAVE.rm[c.id]||0)<3){gain=1;SAVE.rm[c.id]=(SAVE.rm[c.id]||0)+1}
  SAVE.upPts=(SAVE.upPts||0)+gain;
  let teamUp=0;
  const rwCap=upCap(),rwOvr0={};for(const q of [...Object.values(SAVE.starters),...(SAVE.bench||[])])rwOvr0[q.name]=ovr(q);   // v2.97: overalls before the boost, for the bars
  if(first){   // first win over any crew: every player on your team gets +1 to every stat (never past this town's cap). Three crews and the captain make +4 per town.
    const cap=upCap(),ST=['spd','pow','hnd','blk','tkl','cov','thr','acc'];
    const all=[...Object.values(SAVE.starters),...(SAVE.bench||[])];
    for(const q of all){const isQ=q.pos==='QB';if(isQ&&q.acc===undefined)q.acc=Math.round(q.thr*.9);for(const k of ST){if((k==='thr'||k==='acc')&&!isQ)continue;if(q[k]!==undefined&&q[k]<cap)q[k]=Math.min(cap,q[k]+1)}}
    teamUp=1}
  const newPlays=first&&typeof PLAYS_X!=='undefined'?PLAYS_X.filter(p=>p.req===c.id):[];if(first)SAVE.beaten.push(c.id);persist();
  $('#stTitle').textContent='YOU BEAT THE '+c.name.toUpperCase()+'!';$('#stScore').innerHTML=scoreHTML(c);
  const L=$('#stList');L.innerHTML='';
  const stolen=SAVE.stolen||[];
  const rowFor=(p,btnTxt,fn)=>{const d=document.createElement('div');d.className='row3';d.innerHTML='<div class="pos">'+p.pos+'</div><div class="nm">'+p.name+(p.star?' <span class="star">\u2605</span>':'')+'<small>'+statLine(p)+(p.special?' \u00b7 '+SPECIALS[p.special].name:'')+'</small></div><div class="ov">'+ovr(p)+'</div>';if(btnTxt){const b=document.createElement('button');b.textContent=btnTxt;b.onclick=fn;d.appendChild(b)}return d};
  const dropFor=p=>{   // your roster is 7: taking him means dropping someone at his position
    L.innerHTML='';$('#stNote').textContent='Your roster is full at 7. Pick who to drop to make room for '+p.name+'.';show('#stDone',false);
    L.appendChild(rowFor(p));
    SLOTS.filter(k=>posOf(k)===p.pos).forEach(k=>{const q=SAVE.starters[k];L.appendChild(rowFor(q,'DROP',()=>{acquire(p,k);L.innerHTML='';$('#stNote').textContent='You took '+p.name+' and dropped '+q.name+'.'+(p.special?' Arm your Star Play before the snap to unleash '+SPECIALS[p.special].name+'.':'');show('#stDone',true)}))});
    const keep=document.createElement('button');keep.className='alt';keep.textContent='NEVER MIND, KEEP MY GUYS';keep.onclick=()=>{L.innerHTML='';$('#stNote').textContent='You kept your roster.';show('#stDone',true)};L.appendChild(keep);
  };
  const upBtn=()=>{const u=document.createElement('button');u.textContent='UPGRADE PLAYERS ('+SAVE.upPts+' pts)';u.style.cssText='width:100%;margin:8px 0;border-color:#ffd23a;color:#ffd23a';u.className='btn';u.onclick=()=>openUpg(()=>owShow());return u};
  const ptsLine=(gain||teamUp)?'':'No new points: a rematch win pays +1 three times, and you have had all 3. You have '+SAVE.upPts+' to spend. ';   // v2.98: the points and the boost are explained in the panel (rwWhy)
  const rwWhy=[];if(gain)rwWhy.push(first?'+'+gain+' \u00b7 first win over the '+c.name+(c.captain?' (captain)':''):'+1 \u00b7 rematch win, '+(SAVE.rm[c.id]||0)+' of 3 that pay');
  if(teamUp)rwWhy.push('+1 to every stat \u00b7 first win over a crew (stat cap '+rwCap+')');
  if(c.captain){
    const star=c.roster.find(p=>p.star);
    L.appendChild(upBtn());
    if(stolen.includes(star.name)){$('#stNote').textContent=ptsLine+'You already have '+star.name+'.';show('#stDone',true)}
    else{   // the captain's star joins automatically; the weakest starter at his position moves to the bench (nobody is lost)
      SAVE.bench=SAVE.bench||[];
      const slots=SLOTS.filter(k=>posOf(k)===star.pos);let weak=slots[0];for(const k of slots)if(ovr(SAVE.starters[k])<ovr(SAVE.starters[weak]))weak=k;
      const out=SAVE.starters[weak];acquire(star,weak);if(out)SAVE.bench.push(out);persist();if(c.onJoin)c.onJoin();
      const bn=document.createElement('div');bn.style.cssText='text-align:center;margin:6px 0 8px;padding:10px 8px;border:2px solid #ffd23a;border-radius:10px;background:rgba(255,210,58,.12);color:#ffd23a;font-weight:800;letter-spacing:.08em;font-size:16px;text-shadow:0 0 8px #ffb02e';
      bn.innerHTML='\u2605 '+star.name.toUpperCase()+' JOINS YOUR TEAM! \u2605<div style="font-size:11px;font-weight:600;letter-spacing:.04em;color:#ffe8b0;text-shadow:none;margin-top:4px">'+(out?out.name+' moves to your bench. ':'')+(star.special?'Arm your Star Play before the snap to unleash '+SPECIALS[star.special].name+'.':'')+'</div>';
      L.appendChild(bn);L.appendChild(rowFor(star));
      $('#stNote').textContent=c.town2?ptsLine+(c.win?c.boss.replace(/"/g,'')+': "'+c.win+'" ':'')+'Riptide Sterling joins: "They handed Bram every call. You won anyway. Clean. I\'m yours."':ptsLine+'Darnell "Zero Day" Reyes shrugs. Mo buried his real stats, and he will believe you throw to him in traffic when he sees it.';show('#stDone',true)}
  }else{
    $('#stNote').textContent=ptsLine+(c.win?c.boss.replace(/"/g,'')+': "'+c.win+'" ':'')+'Spend the points on any starter.';L.appendChild(upBtn());show('#stDone',true);
  }
  if(newPlays.length){const pb=document.createElement('div');pb.style.cssText='text-align:center;margin:6px 0 8px;padding:10px 8px;border:2px solid #4dd0e1;border-radius:10px;background:rgba(77,208,225,.12);color:#9ff0fa;font-weight:800;letter-spacing:.08em;font-size:16px;text-shadow:0 0 8px #27b8d0';
    pb.innerHTML='\u2605 '+newPlays.length+' NEW PLAYS AVAILABLE! \u2605<div style="font-size:12px;font-weight:600;letter-spacing:.04em;color:#d6f7fb;text-shadow:none;margin-top:4px">'+newPlays.map(p=>p.name).join(' \u00b7 ')+'</div><div style="font-size:11px;font-weight:600;letter-spacing:.04em;color:#a9d9df;text-shadow:none;margin-top:3px">Find them in your playbook.</div>';pb.appendChild(rwCards(newPlays));
    const st=L.querySelector('.row3');if(c.captain&&st)st.after(pb);else L.insertBefore(pb,L.firstChild)}
  {const nx=nxBox(false);if(nx)L.appendChild(nx)}   // v2.99: what the next unlock is and how to get it
  rwShow(L,{gain,total:SAVE.upPts,ovr0:teamUp?rwOvr0:null,why:rwWhy});   // v2.97: points count up, team boost bars
  syncEndExtras('#steal');screens('#steal');
}
$('#stDone').onclick=()=>owShow();
$('#eAgain').onclick=()=>startMatch(G.crew);
$('#eMenu').onclick=()=>owShow();
let exitArm=0;
const exitButton=$('#exit');exitButton.textContent='Ⅱ';exitButton.setAttribute('aria-label','Pause / exit match');exitButton.title='Pause / exit match';exitButton.onclick=e=>{const n=Date.now();if(n-exitArm<2200){sayTok++;$('#banner').classList.remove('show');G.mode='end';F.mode='dead';show('#hud',false);show('#sheet',false);show('#fourth',false);show('#ctl',false);show('#setbar',false);resetJoy();owShow();exitButton.classList.remove('is-armed')}else{exitArm=n;exitButton.classList.add('is-armed');exitButton.setAttribute('aria-label','Confirm exit match');exitButton.title='Tap again to exit match'}};
/* ============ v2.97 REWARDS YOU CAN SEE (player experience item 2). Same amounts as before: this only shows them. ============
   rwShow(list,{gain,total,ovr0}) puts a panel at the top of the win screen: the points count up (+0 -> +7, and your total),
   and after a first win the team boost is shown as one bar per starter growing from the old overall to the new one.
   rwCards(plays) draws a card for each play a win unlocked (the same drawing as the playbook). LITE EFFECTS shows the end state at once. */
function rwStyle(){if(document.getElementById('rwCss'))return;const s=document.createElement('style');s.id='rwCss';
  s.textContent='.rw{margin:4px 0 10px;padding:10px 12px;border:2px solid #ffd23a;border-radius:10px;background:rgba(255,210,58,.08)}'+
  '.rwPts{display:flex;align-items:baseline;gap:10px;justify-content:center}.rwPts b{font-family:var(--disp);font-weight:400;font-size:40px;line-height:1;color:#ffd23a;text-shadow:0 3px 0 #000}'+
  '.rwPts span{font-weight:800;letter-spacing:.1em;font-size:15px;color:#fff3b0}.rwPts small{display:block;font-size:12px;letter-spacing:.08em;color:var(--dim)}'+
  '.rwW{margin-top:6px;text-align:center;font-size:13px;font-weight:700;letter-spacing:.04em;color:#fff3b0;line-height:1.35}'+
  '.rwH{margin:10px 0 4px;font-size:12px;font-weight:800;letter-spacing:.12em;color:#58ffb0;text-align:center}'+
  '.rwR{display:flex;align-items:center;gap:8px;height:20px;font-size:13px}.rwR .p{width:34px;font-family:var(--disp);font-size:12px;color:#ffd23a}.rwR .n{width:92px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '.rwR .b{flex:1;height:9px;border-radius:5px;background:#0a0818;overflow:hidden}.rwR .b i{display:block;height:100%;background:linear-gradient(90deg,#27e0ff,#58ffb0);transition:width .9s cubic-bezier(.2,.8,.2,1)}'+
  '.rwR .v{width:64px;text-align:right;font-family:var(--disp);font-size:13px}.rwR .v em{font-style:normal;color:#58ffb0}'+
  '.rwC{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px}.rwC div{width:116px;border:2px solid #4dd0e1;border-radius:8px;background:#1d1915;overflow:hidden;animation:rwPop .45s cubic-bezier(.2,1.4,.4,1) both}'+
  '.rwC canvas{display:block;width:100%;height:auto;background:#3a362c}.rwC b{display:block;padding:3px 5px;font-size:12px;letter-spacing:.04em;color:#fff;background:rgba(0,0,0,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '@keyframes rwPop{0%{transform:scale(.3) rotate(-8deg);opacity:0}100%{transform:none;opacity:1}}';
  document.head.appendChild(s)}
const rwLite=()=>document.body.classList.contains('lite');
function rwCount(el,from,to,ms,fmt,done){if(rwLite()||from===to){el.textContent=fmt(to);if(done)done();return}const t0=performance.now();
  const step=()=>{const k=Math.min(1,(performance.now()-t0)/ms),v=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));el.textContent=fmt(v);if(k<1)requestAnimationFrame(step);else if(done)done()};requestAnimationFrame(step)}
function rwShow(list,o){
  if(!list||!o||(!(o.gain>0)&&!o.ovr0))return;rwStyle();   // nothing earned: no panel (the note already says so)
  const box=document.createElement('div');box.className='rw';
  const pts=document.createElement('div');pts.className='rwPts';
  const n=document.createElement('b'),lab=document.createElement('span'),tot=document.createElement('small');
  n.textContent='+0';lab.textContent='UPGRADE POINTS';
  const wrap=document.createElement('div');wrap.append(lab,tot);pts.append(n,wrap);box.appendChild(pts);
  if(o.gain>0){const t1=o.total||0,t0=t1-o.gain;tot.textContent='YOU HAVE '+t0;
    setTimeout(()=>{rwCount(n,0,o.gain,700,v=>'+'+v);rwCount(tot,t0,t1,900,v=>'YOU HAVE '+v,()=>{try{SND.fx('upgrade')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}})},rwLite()?0:250)}
  else{n.textContent='+0';tot.textContent='YOU HAVE '+(o.total||0)}
  if(o.why&&o.why.length){const w=document.createElement('div');w.className='rwW';for(const s of o.why){const r=document.createElement('div');r.textContent=s;w.appendChild(r)}box.appendChild(w)}   // v2.98: where every point came from
  if(o.ovr0){
    const h=document.createElement('div');h.className='rwH';h.textContent='TEAM BOOST · +1 TO EVERY STAT';box.appendChild(h);
    const sc=v=>Math.max(2,Math.min(100,(v-50)/49*100));
    SLOTS.forEach((k,i)=>{const q=SAVE.starters[k];if(!q)return;const o0=o.ovr0[q.name],o1=ovr(q);
      const r=document.createElement('div');r.className='rwR';
      const p=document.createElement('span');p.className='p';p.textContent=k;
      const nm=document.createElement('span');nm.className='n';nm.textContent=lastName(q.name);
      const b=document.createElement('span');b.className='b';const fill=document.createElement('i');b.appendChild(fill);
      const v=document.createElement('span');v.className='v';
      if(o0===undefined){fill.style.width=sc(o1)+'%';v.innerHTML='<em>NEW</em> ';v.appendChild(document.createTextNode(String(o1)))}
      else{fill.style.width=sc(o0)+'%';v.textContent=String(o0);
        setTimeout(()=>{fill.style.width=sc(o1)+'%';rwCount(v,o0,o1,800,x=>o1>o0&&x===o1?o0+' → '+o1:String(x))},rwLite()?0:450+i*90)}
      r.append(p,nm,b,v);box.appendChild(r)})}
  list.insertBefore(box,list.firstChild);return box}
function rwCards(plays){rwStyle();const box=document.createElement('div');box.className='rwC';
  plays.forEach((pl,i)=>{const d=document.createElement('div');d.style.animationDelay=(rwLite()?0:.5+i*.15)+'s';
    const cv=document.createElement('canvas');cv.width=168;cv.height=124;try{drawCard(cv,pl,1)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
    const b=document.createElement('b');b.textContent=pl.name;d.append(cv,b);box.appendChild(d)});
  return box}
/* ============ v2.99 NEXT UNLOCK SIGNPOST (player experience item 4). Text only: reads the save, changes nothing. ============
   Plays unlock by beating a town captain (Netrunners, then Closers; the req field on PLAYS_X). nextUnlock() finds the first captain not yet
   beaten that still has plays waiting, and the next crew to beat on the way there (a captain opens after his town's three crews).
   Shown in the menu and at the bottom of every crew win screen. With every play unlocked: the menu says so, the win screen shows nothing. */
function nextUnlock(){
  if(typeof PLAYS_X==='undefined')return null;
  const beat=(SAVE&&SAVE.beaten)||[],towns=[CREWS];if(typeof HB_CREWS!=='undefined')towns.push(HB_CREWS);
  for(const T of towns){const cap=T.find(c=>c.captain);if(!cap||beat.includes(cap.id))continue;
    const plays=PLAYS_X.filter(p=>p.req===cap.id);if(!plays.length)continue;
    const step=T.filter(c=>!c.captain).find(c=>!beat.includes(c.id))||null;
    return {plays,cap,step}}
  return {done:true}}
function nxText(n){
  if(!n||n.done)return null;
  return {head:'NEXT UNLOCK · '+n.plays.length+(n.plays.length===1?' PLAY':' PLAYS'),
    plays:n.plays.map(p=>p.name).join(' · '),
    how:'Beat the '+n.cap.name+', the '+n.cap.town+' captain.'+(n.step?' Next step: the '+n.step.name+'.':' Their match is open now.')}}
function nxStyle(){if(document.getElementById('nxCss'))return;const s=document.createElement('style');s.id='nxCss';
  s.textContent='.nx{margin:8px 0;padding:8px 10px;border:2px dashed #4dd0e1;border-radius:10px;background:rgba(77,208,225,.07);text-align:center}'+
  '.nx b{display:block;font-size:12px;font-weight:800;letter-spacing:.12em;color:#4dd0e1}.nx div{margin-top:3px;font-size:13px;font-weight:700;letter-spacing:.03em;color:#d6f7fb;line-height:1.3}'+
  '.nx small{display:block;margin-top:3px;font-size:12px;letter-spacing:.03em;color:var(--dim);line-height:1.3}';
  document.head.appendChild(s)}
function nxBox(menu){const n=nextUnlock();if(!n)return null;nxStyle();const d=document.createElement('div');d.className='nx';
  const b=document.createElement('b');d.appendChild(b);
  if(n.done){if(!menu)return null;b.textContent='ALL PLAYS UNLOCKED';const s=document.createElement('small');s.textContent=(PLAYS_BASE+PLAYS_X.length)+' plays in your book.';d.appendChild(s);return d}
  const t=nxText(n);b.textContent=t.head;const p=document.createElement('div');p.textContent=t.plays;const s=document.createElement('small');s.textContent=t.how;d.append(p,s);return d}
/* ============ v3.00 GUIDED FIRST GAME (player experience item 5). Prompts only: odds, plays and rewards unchanged. ============
   Only in a brand-new player's first match (the Glitch Cats, no crew beaten, no game finished, not marked done in the save).
   - One short prompt per thing, the first time it comes up: pick a play, HIKE, tap a receiver to throw, run with the left thumb + TURBO,
     swipe to juke / stiff arm (on the next carry, so it is one idea at a time).
   - No play clock on the player's first drive (it comes back after their first defensive stand).
   - Every play in the playbook stays open; nothing is locked.
   - The match ending (win or loss) marks it done in the save (SAVE.tutDone), so it never shows again.
   - STAR PLAY: no star is on a new team, so its prompt comes the first time any star's play is ready, in any match (SAVE.tutStar). */
function gdStart(crew){
  G.gSeen={};G.guide=!!(crew&&crew.id==='cats'&&!crew.practice&&!SAVE.tutDone&&!(SAVE.beaten||[]).length&&!stt().games);G.guide1=G.guide}
function gdShow(txt,ms,pos){let e=document.getElementById('gdTip');
  if(!e){e=document.createElement('div');e.id='gdTip';e.style.cssText='position:absolute;left:50%;top:calc(env(safe-area-inset-top,0px) + 52px);transform:translateX(-50%);z-index:40;max-width:92%;padding:7px 14px;border-radius:10px;background:rgba(10,24,30,.94);border:2px solid #4dd0e1;color:#d6f7fb;font:800 15px "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.06em;text-align:center;line-height:1.25;pointer-events:none;transition:opacity .3s;box-shadow:0 4px 14px rgba(0,0,0,.5)';$('#app').appendChild(e)}
  const low=pos==='low';   // play-call screen: over the play description next to CALL PLAY, so the play cards stay readable
  e.style.top=low?'auto':'calc(env(safe-area-inset-top,0px) + 52px)';e.style.bottom=low?'calc(env(safe-area-inset-bottom,0px) + 10px)':'auto';
  e.style.left=low?'max(12px,env(safe-area-inset-left,0px))':'50%';e.style.transform=low?'none':'translateX(-50%)';e.style.maxWidth=low?'min(48%,520px)':'92%';
  e.textContent=txt;e.style.opacity=1;e.hidden=false;clearTimeout(gdShow.t);gdShow.t=setTimeout(()=>{e.style.opacity=0},ms||4500)}
function gdHide(){const e=document.getElementById('gdTip');if(e)e.style.opacity=0;clearTimeout(gdShow.t)}
function gdTip(key,txt,ms,pos){if(!G||!G.guide||G.gSeen[key])return false;G.gSeen[key]=G.pn+1;gdShow(txt,ms,pos);return true}
/* called once a frame while the guide is on (cheap): prompts that depend on who has the ball */
const _isTouch=()=>!!(window.matchMedia&&window.matchMedia('(pointer: coarse)').matches);
function gdTick(){
  if(!F||F.mode!=='live'||G.mode!=='live')return;const c=F.carrier;if(!c)return;
  const touch=_isTouch(),ak=(window.A11Y&&window.A11Y.cfg.keys)||{juke:'q',stiff:'e',spin:'f'};
  if(c.role==='QB'&&F.passer===c&&!F.lock&&PLAY&&PLAY.kind==='pass'){
    if(gdTip('throw',touch?'TAP A RECEIVER TO THROW':'CLICK A RECEIVER OR PRESS 1-4 TO THROW',4000))setSlow(.35,1.0);
  }else if(c.role!=='QB'&&!F.ballAir){
    if(gdTip('run',touch?'DRAG LEFT THUMB TO RUN · HOLD TURBO':'WASD TO RUN · HOLD SHIFT FOR TURBO',3500))return;
    if(G.gSeen.run&&G.gSeen.run<G.pn+1){
      const msg=touch?'SWIPE ◀ ▶ JUKE · ▲ TRUCK · ▼ SPIN':(ak.juke.toUpperCase()+' JUKE · '+ak.stiff.toUpperCase()+' TRUCK · '+ak.spin.toUpperCase()+' SPIN');
      if(gdTip('juke',msg,3800))setSlow(.4,.9);
    }}}
/* the first time any star's play is ready (any match): how to use it */
function gdStar(){if(!G||!G.sp||!G.sp.ready||SAVE.tutStar)return;SAVE.tutStar=1;persist();
  gdShow('STAR PLAY READY: TAP ★ STAR PLAY, THEN CALL YOUR PLAY ('+G.sp.left+' PLAYS TO USE IT)',5500)}

/* ============ v3.15 CAREER STATS + REPLAY GOALS (player experience items 12 + 13; user, 2026-11-14). No dice are rolled here. ============
   CAREER STATS: every play adds to the ball carrier's (and the passer's) career line in SAVE.cs, keyed by who he is (his first name
   before any rename, p.n0), so renaming never loses his numbers. Shown in MY SQUAD > CAREER and in MENU > GOALS & STATS.
   CREW CHALLENGES: one per Town 1 / Town 2 crew, open on any win against that crew. Cosmetic only: each unlocks a RUN TRAIL colour
   (the glowing ribbon and juke ghosts behind your runner), picked in MY TEAM. No points, stats, plays or odds.
   ACHIEVEMENTS: badges with progress, shown in MENU > GOALS & STATS; a toast when one is earned. No reward. */
const TRAILS={violet:{n:'VIOLET',c:'#b57bff'},amber:{n:'AMBER',c:'#ffb020'},teal:{n:'TEAL',c:'#2fe0c0'},glitch:{n:'GLITCH',c:'#ff3fd8'},rust:{n:'RUST',c:'#e0662e'},steel:{n:'STEEL',c:'#9fc4d4'},spark:{n:'SPARK',c:'#fff36a'},gold:{n:'GOLD',c:'#ffd23a'}};
const CHAL=[
 {crew:'cats',n:'SHUTOUT',d:'Win without giving up a touchdown',ok:m=>m.tdA===0,tr:'violet'},
 {crew:'kings',n:'GROUND GAME',d:'Run for 120+ yards in the match',ok:m=>m.rush>=120,tr:'amber'},
 {crew:'rollers',n:'BLOWOUT',d:'Win by 14 or more',ok:m=>m.you-m.opp>=14,tr:'teal'},
 {crew:'captain',n:'ANKLE TAKER',d:'Perform 3 ankle breakers in the match',ok:m=>m.ankle>=3,tr:'glitch'},
 {crew:'baitdogs',n:'TRUCK STOP',d:'Perform 3 trucks in the match',ok:m=>m.truck>=3,tr:'rust'},
 {crew:'longshore',n:'CLEAN HANDS',d:'Win without a fumble or interception',ok:m=>m.to===0,tr:'steel'},
 {crew:'gantry',n:'BIG PLAY',d:'Gain 50+ yards on one play',ok:m=>m.long>=50,tr:'spark'},
 {crew:'closers',n:'NO DOUBT',d:'Beat the Closers by 14 or more',ok:m=>m.you-m.opp>=14,tr:'gold'}];
const goalsSave=()=>{const g=SAVE.goals||(SAVE.goals={done:[],trails:[],ach:[],n:{}});g.done=g.done||[];g.trails=g.trails||[];g.ach=g.ach||[];g.n=g.n||{};return g};
const crewName=id=>{const c=(typeof CREWS!=='undefined'?CREWS:[]).concat(typeof HB_CREWS!=='undefined'?HB_CREWS:[]).find(c=>c.id===id);return c?c.name:id};
const csKey=d=>(d&&(d.n0||d.name))||'?';
function csOf(d){const cs=SAVE.cs||(SAVE.cs={}),k=csKey(d);return cs[k]||(cs[k]={g:0,ra:0,ry:0,rt:0,rl:0,rc:0,cy:0,ct:0,cl:0,pa:0,pc:0,py:0,pt:0,pi:0,an:0,tr:0,sp:0,bt:0,fl:0})}
function goalsStart(crew){G.ms={tdA:0,rush:0,to:0,long:0,ankle:0,truck:0,you:0,opp:0}}
/* one finished play (called from endPlay; a flag is replayed, so it does not count) */
function csPlay(c,type,gain){
  if(!G||!G.ms||!F||type==='flag'||!c||c.team!=='O')return;const m=G.ms,cn=F.cn||{},caught=!!(F.caught&&F.carrier===c&&c.role!=='QB'),qb=F.off&&F.off.QB;
  const cs=csOf(c.d),td=type==='td',lost=type==='fumble';
  if(F.tgt&&qb&&(caught||type==='inc'||type==='int')){const q=csOf(qb.d);q.pa++;if(caught){q.pc++;q.py+=gain;if(td)q.pt++}if(type==='int'){q.pi++;m.to++}}
  if(caught){cs.rc++;cs.cy+=gain;if(td)cs.ct++;cs.cl=Math.max(cs.cl,gain)}
  else if(type==='tackle'||type==='td'||type==='oob'||lost){const sack=c.role==='QB'&&F.passer===c;if(!sack){cs.ra++;cs.ry+=gain;if(td)cs.rt++;cs.rl=Math.max(cs.rl,gain);m.rush+=gain}}
  if(lost){cs.fl++;m.to++}
  cs.an+=cn.ankle||0;cs.tr+=cn.truckWin||0;cs.sp+=cn.spinWin||0;cs.bt+=(cn.brk||0)+(cn.pow||0);m.ankle+=cn.ankle||0;m.truck+=cn.truckWin||0;
  if(type!=='inc'&&type!=='int')m.long=Math.max(m.long,gain);
  const g=goalsSave();if(F.spUsed)g.n.star=(g.n.star||0)+1;if(td&&gain>=60)g.n.house=1;
  achCheck(true)}
/* the match is over: games played, challenge, achievements. Returns the challenge result for the win screen. */
function goalsEnd(win){
  if(!G||!G.ms)return null;const m=G.ms;m.you=G.you;m.opp=G.opp;const g=goalsSave();
  for(const k of SLOTS){const q=SAVE.starters[k];if(q)csOf(q).g++}
  if(m.rush>=100)g.n.century=1;if(win&&m.tdA===0)g.n.shut=(g.n.shut||0)+1;
  let res=null;const ch=CHAL.find(c=>c.crew===(G.crew&&G.crew.id));
  if(ch&&!(G.crew.practice)){const was=g.done.includes(ch.crew);res={ch,was,ok:false};if(win&&ch.ok(m)){res.ok=true;if(!was){g.done.push(ch.crew);if(!g.trails.includes(ch.tr))g.trails.push(ch.tr)}}}
  achCheck(false);persist();G.ms=null;return res}
const ACH=[
 {id:'td1',n:'PAYDIRT',d:'Score your first touchdown',v:t=>t.td,max:1},
 {id:'century',n:'CENTURY',d:'Run for 100+ yards in one match',v:(t,n)=>n.century||0,max:1},
 {id:'house',n:'HOUSE CALL',d:'Score on a 60+ yard play',v:(t,n)=>n.house||0,max:1},
 {id:'ankle',n:'ANKLE COLLECTOR',d:'Break 25 ankles',v:t=>t.an,max:25},
 {id:'truck',n:'ROAD GRADER',d:'Perform 25 trucks',v:t=>t.tr,max:25},
 {id:'spin',n:'SPIN CYCLE',d:'Win 25 spins',v:t=>t.sp,max:25},
 {id:'gun',n:'GUNSLINGER',d:'Throw 25 touchdown passes',v:t=>t.pt,max:25},
 {id:'work',n:'WORKHORSE',d:'Run for 1,000 yards (whole team)',v:t=>t.ry,max:1000},
 {id:'hands',n:'SURE HANDS',d:'Catch 100 passes (whole team)',v:t=>t.rc,max:100},
 {id:'wall',n:'BRICK WALL',d:'Win 3 matches without giving up a touchdown',v:(t,n)=>n.shut||0,max:3},
 {id:'star',n:'STAR POWER',d:'Use 10 Star Plays',v:(t,n)=>n.star||0,max:10},
 {id:'chal4',n:'CHALLENGER',d:'Complete 4 crew challenges',v:(t,n,g)=>g.done.length,max:4},
 {id:'chal8',n:'ALL EIGHT',d:'Complete all 8 crew challenges',v:(t,n,g)=>g.done.length,max:8}];
function csTeam(){const t={ry:0,rt:0,rc:0,cy:0,ct:0,py:0,pt:0,an:0,tr:0,sp:0,td:0};for(const k in (SAVE.cs||{})){const c=SAVE.cs[k];for(const f of ['ry','rt','rc','cy','ct','py','pt','an','tr','sp'])t[f]+=c[f]||0}t.td=t.rt+t.ct;return t}
function achCheck(live){const g=goalsSave(),t=csTeam(),got=[];for(const a of ACH){if(g.ach.includes(a.id))continue;if(a.v(t,g.n,g)>=a.max){g.ach.push(a.id);got.push(a)}}
  if(got.length){persist();for(const a of got)achToast(a)}}
const achQ=[];let achTimer=0;function achToast(a){achQ.push(a);if(achQ.length===1)achNext()}
function achNext(){const a=achQ[0];if(!a)return;let e=document.getElementById('achT');if(!e){e=document.createElement('div');e.id='achT';e.style.cssText='position:fixed;left:50%;top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);transform:translateX(-50%);z-index:100002;box-sizing:border-box;width:max-content;max-width:min(82vw,440px);padding:7px 16px;border-radius:10px;background:rgba(24,18,6,.94);border:2px solid #ffd23a;color:#ffd23a;font:800 14px "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.08em;text-align:center;pointer-events:none;transition:opacity .3s;box-shadow:0 0 18px rgba(255,210,58,.4)';document.body.appendChild(e)}
  document.body.classList.add('ach-toast-active');e.innerHTML='';const b=document.createElement('b');b.textContent='★ ACHIEVEMENT · '+a.n;const s=document.createElement('div');s.style.cssText='font-size:11px;color:#fff3b0;font-weight:600';s.textContent=a.d;e.append(b,s);e.style.opacity=1;
  clearTimeout(achTimer);achTimer=setTimeout(()=>{e.style.opacity=0;achTimer=setTimeout(()=>{achTimer=0;achQ.shift();if(deferredDefCallFp!==null){document.body.classList.remove('ach-toast-active');flushDeferredDefCall();return}if(achQ.length)achNext();else{document.body.classList.remove('ach-toast-active');flushDeferredDefCall()}},350)},2600)}
function achClear(){clearTimeout(achTimer);achTimer=0;achQ.length=0;document.body.classList.remove('ach-toast-active');const e=document.getElementById('achT');if(e)e.remove()}
/* the trail colour drawn behind your runner (null = jersey colour) */
function trailCol(p){if(!p||p.team!=='O'||!SAVE.trail)return null;const t=TRAILS[SAVE.trail];return t&&goalsSave().trails.includes(SAVE.trail)?t.c:null}
/* small HTML helpers (all text set as text, never as HTML) */
const gEl=(tag,css,txt)=>{const e=document.createElement(tag);if(css)e.style.cssText=css;if(txt!==undefined)e.textContent=txt;return e};
function csLines(c,pos){const L=[];const r1=(a,b)=>b?(a/b).toFixed(1):'0.0';
  if(pos==='QB'||c.pa)L.push(['PASSING',c.pc+'/'+c.pa+' · '+c.py+' YDS · '+c.pt+' TD · '+c.pi+' INT']);
  if(c.ra||pos==='RB')L.push(['RUSHING',c.ra+' CAR · '+c.ry+' YDS ('+r1(c.ry,c.ra)+') · '+c.rt+' TD · LONG '+c.rl]);
  if(c.rc||pos==='WR'||pos==='TE')L.push(['RECEIVING',c.rc+' REC · '+c.cy+' YDS · '+c.ct+' TD · LONG '+c.cl]);
  L.push(['MOVES',c.an+' ANKLES · '+c.tr+' TRUCKS · '+c.sp+' SPINS · '+c.bt+' BROKEN TACKLES']);
  if(c.fl)L.push(['FUMBLES LOST',String(c.fl)]);return L}
function csRender(box,p){const c=(SAVE.cs||{})[csKey(p)];
  box.appendChild(gEl('div','font-size:12px;letter-spacing:.12em;color:var(--dim);margin:2px 0 6px','CAREER · '+(c?c.g:0)+' MATCHES'));
  if(!c){box.appendChild(gEl('div','font-size:14px;color:#e5dccb','No plays yet. Get him the ball.'));return}
  for(const [h,v] of csLines(c,p.pos)){const r=gEl('div','display:flex;gap:8px;align-items:baseline;padding:5px 8px;margin-bottom:4px;border:2px solid var(--line);border-radius:8px;background:var(--panel)');r.append(gEl('b','width:92px;flex:none;font-size:12px;letter-spacing:.1em;color:var(--gold)',h),gEl('span','font-size:14px;font-weight:700',v));box.appendChild(r)}}
/* MY TEAM: the run trail picker */
function goalsTeamRow(){const host=document.getElementById('tLogoPrev');if(!host)return;const lp=host.closest('.lprev');let w=document.getElementById('trRow');if(w)w.remove();
  w=gEl('div');w.id='trRow';w.appendChild(gEl('div','','')).className='lbl';w.firstChild.textContent='RUN TRAIL (CREW CHALLENGES)';
  const row=gEl('div');row.className='chips';const g=goalsSave(),cur=SAVE.trail&&g.trails.includes(SAVE.trail)?SAVE.trail:null;
  const add=(id,label,col,lk,why)=>{const b=gEl('button',col?'border-color:'+col+';color:'+(lk?'':col):'',lk?'🔒 '+label:label);b.className='chip'+(id===cur?' on':'')+(lk?' locked':'');b.onclick=()=>{if(lk){b.textContent=why;return}SAVE.trail=id;persist();goalsTeamRow()};row.appendChild(b)};
  add(null,'TEAM COLOUR','',false);for(const ch of CHAL){const t=TRAILS[ch.tr];add(ch.tr,t.n,t.c,!g.trails.includes(ch.tr),ch.n+' vs '+crewName(ch.crew))}
  w.appendChild(row);lp.after(w)}
/* MENU > GOALS & STATS */
function goalsPanel(){
 const existing=document.getElementById('goalsP');if(existing)existing.remove();
 const g=goalsSave()||{},team=csTeam()||{};
 const doneChallenges=Array.isArray(g.done)?g.done:[];
 const unlockedTrails=Array.isArray(g.trails)?g.trails:[];
 const earned=Array.isArray(g.ach)?g.ach:[];
 const make=(tag,cls,text)=>{
  const node=document.createElement(tag);
  if(cls)node.className=cls;
  if(text!==undefined&&text!==null)node.textContent=String(text);
  return node;
 };
 const fmt=value=>Number(value||0).toLocaleString();
 const crew=id=>{try{return crewName(id)}catch(_){return id}};
 const P=make('div','ui-goals-panel');P.id='goalsP';P.setAttribute('role','dialog');P.setAttribute('aria-modal','true');P.setAttribute('aria-labelledby','uiGoalsTitle');
 const inner=make('div','ui-goals-inner');
 const header=make('header','ui-goals-header');
 const topClose=make('button','ui-goals-x','×');topClose.type='button';topClose.setAttribute('aria-label','Close Goals and Stats');
 const titleWrap=make('div','ui-goals-title-wrap');
 const title=make('h1','ui-goals-title','GOALS & STATS');title.id='uiGoalsTitle';
 titleWrap.append(title);
 const trophy=make('div','ui-goals-trophy');trophy.innerHTML='<small>🏆</small><b>'+earned.length+'/'+ACH.length+'</b>';
 header.append(topClose,titleWrap,trophy);inner.appendChild(header);
 const tabBar=make('div','ui-goals-tabs');tabBar.setAttribute('role','tablist');tabBar.setAttribute('aria-label','Goals and stats sections');
 const content=make('div','ui-goals-content');
 const panels={},buttons={};
 const tabDefs=[['challenges','CHALLENGES'],['achievements','ACHIEVEMENTS'],['stats','TEAM STATS']];
 const activate=(id,focus=false)=>{
  for(const key of Object.keys(panels)){
   const active=key===id;panels[key].hidden=!active;
   buttons[key].setAttribute('aria-selected',String(active));buttons[key].tabIndex=active?0:-1;
   buttons[key].classList.toggle('is-active',active);
  }
  if(focus)buttons[id].focus();
 };
 for(const [id,label] of tabDefs){
  const button=make('button','ui-goals-tab',label);button.type='button';button.id='ui-goals-tab-'+id;
  button.dataset.goalsTab=id;button.setAttribute('role','tab');button.setAttribute('aria-controls','ui-goals-panel-'+id);
  button.setAttribute('aria-selected','false');button.tabIndex=-1;
  const section=make('section','ui-goals-panel');section.id='ui-goals-panel-'+id;
  section.setAttribute('role','tabpanel');section.setAttribute('aria-labelledby',button.id);section.hidden=true;
  button.addEventListener('click',()=>activate(id));
  button.addEventListener('keydown',event=>{
   if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
   event.preventDefault();const index=tabDefs.findIndex(item=>item[0]===id);
   const next=event.key==='Home'?0:event.key==='End'?tabDefs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabDefs.length)%tabDefs.length;
   activate(tabDefs[next][0],true);
  });
  buttons[id]=button;panels[id]=section;tabBar.appendChild(button);content.appendChild(section);
 }
 const challenges=panels.challenges;
 challenges.appendChild(make('p','ui-goals-intro','Beat each crew while meeting its challenge to unlock a colour for your RUN TRAIL. Rewards are cosmetic.'));
 for(const challenge of CHAL){
  const isDone=doneChallenges.includes(challenge.crew),trail=TRAILS[challenge.tr]||{n:String(challenge.tr||'TRAIL').toUpperCase(),c:'#F5B841'};
  const card=make('article','ui-goals-card ui-goals-challenge'+(isDone?' is-complete':''));
  const head=make('div','ui-goals-card-head');
  const name=make('div','ui-goals-card-title',(isDone?'✓ ':'')+challenge.n+' · '+String(crew(challenge.crew)).toUpperCase());
  const pill=make('span','ui-goals-trail-pill',String(trail.n||challenge.tr).toUpperCase()+' TRAIL');
  pill.style.color=trail.c||'#F5B841';pill.style.borderColor=trail.c||'#F5B841';
  head.append(name,pill);
  card.append(head,make('p','ui-goals-card-desc',challenge.d),make('span','ui-goals-state',isDone?'CHALLENGE COMPLETE · TRAIL UNLOCKED':(unlockedTrails.includes(challenge.tr)?'TRAIL UNLOCKED':'NOT YET EARNED')));
  challenges.appendChild(card);
 }
 const achievements=panels.achievements;
 achievements.appendChild(make('p','ui-goals-intro','Earn medals by building your career. Progress is saved automatically.'));
 for(const achievement of ACH){
  const isEarned=earned.includes(achievement.id);
  let value=0;try{value=Math.min(Number(achievement.max)||1,Number(achievement.v(team,g.n,g))||0)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}
  const max=Math.max(1,Number(achievement.max)||1),percent=Math.max(0,Math.min(100,value/max*100));
  const card=make('article','ui-goals-card ui-goals-achievement'+(isEarned?' is-earned':''));
  const head=make('div','ui-goals-card-head'),identity=make('div','ui-goals-achievement-identity');
  identity.append(make('span','ui-goals-medal',isEarned?'★':'✦'),make('span','ui-goals-card-title',achievement.n));
  const count=make('span','ui-goals-achievement-count',fmt(value)+' / '+fmt(max));
  head.append(identity,count);card.append(head,make('p','ui-goals-card-desc',achievement.d));
  if(max>1){
   const track=make('div','ui-goals-progress');track.setAttribute('role','progressbar');track.setAttribute('aria-valuemin','0');
   track.setAttribute('aria-valuemax',String(max));track.setAttribute('aria-valuenow',String(value));
   const fill=make('i','');fill.style.width=percent+'%';track.appendChild(fill);card.appendChild(track);
  }
  achievements.appendChild(card);
 }
 const stats=panels.stats;
 stats.appendChild(make('div','ui-goals-eyebrow','TEAM CAREER'));
 const statGrid=make('div','ui-goals-stat-grid');
 const passCard=make('article','ui-goals-stat-card');
 passCard.innerHTML='<span class="ui-goals-stat-label">PASSING</span><strong class="ui-goals-stat-value">'+fmt(team.py)+' YDS</strong><span class="ui-goals-stat-pill">'+fmt(team.pt)+' TD</span>';
 const rushCard=make('article','ui-goals-stat-card');
 rushCard.innerHTML='<span class="ui-goals-stat-label">RUSHING</span><strong class="ui-goals-stat-value">'+fmt(team.ry)+' YDS</strong><span class="ui-goals-stat-pill">'+fmt(team.rt)+' TD</span>';
 const recCard=make('article','ui-goals-stat-card ui-goals-stat-wide');
 recCard.innerHTML='<span class="ui-goals-stat-label">RECEIVING</span><div class="ui-goals-stat-pair"><b>'+fmt(team.rc)+' <small>REC</small></b><b>'+fmt(team.cy)+' <small>YDS</small></b></div>';
 const moveCard=make('article','ui-goals-stat-card ui-goals-stat-wide');
 moveCard.innerHTML='<span class="ui-goals-stat-label">SKILL MOVES</span><div class="ui-goals-stat-trio"><div><b>'+fmt(team.an)+'</b><small>ANKLES</small></div><div><b>'+fmt(team.tr)+'</b><small>TRUCKS</small></div><div><b>'+fmt(team.sp)+'</b><small>SPINS</small></div></div>';
 statGrid.append(passCard,rushCard,recCard,moveCard);
 const note=make('p','ui-goals-note');note.innerHTML='For individual player stats, visit <span style="color:#F5B841">MY SQUAD &gt; CAREER</span>.';
 stats.append(statGrid,note);
 const close=make('button','ui-goals-close','CLOSE');close.type='button';
 const onKey=event=>{if(event.key==='Escape'){event.preventDefault();closePanel()}};
 const closePanel=()=>{
  document.removeEventListener('keydown',onKey);P.remove();
  const trigger=document.getElementById('mGoals');if(trigger)trigger.focus();
 };
 close.addEventListener('click',closePanel);topClose.addEventListener('click',closePanel);
 inner.append(tabBar,content,close);P.appendChild(inner);document.body.appendChild(P);
 document.addEventListener('keydown',onKey);activate('challenges');buttons.challenges.focus();
}
/* the win screen: how the crew challenge went */
function goalsWinBox(res){if(!res)return;const L=$('#stList');if(!L||$('#steal').hidden)return;const t=TRAILS[res.ch.tr];
  const b=gEl('div','text-align:center;margin:6px 0 8px;padding:8px;border:2px solid '+(res.ok?t.c:'var(--line)')+';border-radius:10px;background:rgba(255,255,255,.04)');
  b.append(gEl('b','display:block;font-size:13px;letter-spacing:.12em;color:'+(res.ok?t.c:'var(--dim)'),'CREW CHALLENGE · '+res.ch.n),gEl('div','font-size:13px;color:#e5dccb;margin-top:2px',res.ch.d+'.'),
    gEl('div','font-size:13px;font-weight:800;margin-top:3px;color:'+(res.ok?t.c:'#cdbfa5'),res.ok?(res.was?'Done again. '+t.n+' TRAIL already yours.':'★ UNLOCKED: '+t.n+' RUN TRAIL (pick it in MY TEAM)'):'Not this time. Try it in a rematch.'));
  L.appendChild(b)}
{const _eg=endGame;endGame=function(win){let res=null;try{res=goalsEnd(win)}catch(e){try{console.error(e)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}const r=_eg.apply(this,arguments);try{goalsWinBox(res)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}return r}}
$('#mGoals').onclick=()=>goalsPanel();
{const _eg=endGame;endGame=function(win){const was=(SAVE.beaten||[]).includes('longshore');const r=_eg.apply(this,arguments);try{if(win&&!was&&(SAVE.beaten||[]).includes('longshore')){const T=hbS();T.yardSeen=true;persist();const L=$('#stList');if(L){const b=gEl('div','text-align:center;margin:6px 0 8px;padding:8px;border:2px solid #E8A33D;border-radius:10px;background:rgba(255,255,255,.04)');b.append(gEl('b','display:block;font-size:13px;letter-spacing:.12em;color:#E8A33D','LONGSHORE YARD OPEN'),gEl('div','font-size:13px;color:#e5dccb;margin-top:2px','The chained gate on the Commons is open.'));L.appendChild(b)}}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}return r}}   // v3.26T announce the yard

/* ============================ input ============================ */
const jz=$('#joyZone');let joyId=null,jb={x:0,y:0};
function setStick(e){let dx=(e.clientX-jb.x)/46,dy=(jb.y-e.clientY)/46;const m=Math.hypot(dx,dy),DZ=.12;if(m<DZ){dx=0;dy=0}else{const sc=Math.min(1,(m-DZ)/(1-DZ));dx=(dx/m)*sc;dy=(dy/m)*sc}input.sx=dx;input.sy=dy;$('#joyKnob').style.transform='translate('+dx*38+'px,'+(-dy*38)+'px)'}
/* The stick resets whenever controls appear or disappear, and a new touch always takes over. That fixes a stuck stick
   that happened when a finger was lifted while the controls were hidden. */
function resetJoy(){joyId=null;input.sx=input.sy=0;input.kb=false;$('#joyBase').hidden=true;$('#joyHint').style.opacity=1;input.turbo=false;$('#bTurbo').classList.remove('on')}
/* tap a receiver on the field to throw to him (replaces the side buttons) */
addEventListener('pointerdown',e=>{
  if(!F||!G||G.mode!=='live'||OWON)return;const q=F.carrier;if(!q||q.role!=='QB'||F.passer!==q||F.lock||F.ballAir)return;
  if(e.target&&e.target.closest&&e.target.closest('button,#hud,#sheet,#fourth,#setbar'))return;
  const r=cv.getBoundingClientRect(),k=W/r.width,tx=(e.clientX-r.left)*k,ty=(e.clientY-r.top)*k;let best=null,bd=1e9;
  for(const [role] of BTN){const p=F.off[role];if(!p||p.stun>0)continue;const pr=P(p.x+(p.vx||0)*.08,p.y+(p.vy||0)*.08),cy=pr.sy-Math.max(22,2.75*pr.u)*.55,my=pr.sy-Math.max(22,2.75*pr.u)*1.1-12;
    const d=Math.min(Math.hypot(tx-pr.sx,ty-cy),Math.hypot(tx-pr.sx,ty-my),Math.hypot(tx-pr.sx,ty-pr.sy)),lim=Math.max(46,pr.u*1.5);
    if(d<lim&&d<bd){bd=d;best=role}}
  if(best){e.preventDefault();e.stopPropagation();throwTo(best)}
},true);
jz.addEventListener('pointerdown',e=>{e.preventDefault();joyId=e.pointerId;try{jz.setPointerCapture(e.pointerId)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}
  const r=$('#app').getBoundingClientRect();jb={x:e.clientX,y:e.clientY};const b=$('#joyBase');b.hidden=false;b.style.left=(e.clientX-r.left)+'px';b.style.top=(e.clientY-r.top)+'px';$('#joyHint').style.opacity=0;setStick(e)});
jz.addEventListener('pointermove',e=>{if(e.pointerId===joyId)setStick(e)});
function endJoy(e){if(e.pointerId!==joyId)return;joyId=null;input.sx=input.sy=0;$('#joyBase').hidden=true;$('#joyHint').style.opacity=1}
['pointerup','pointercancel','lostpointercapture'].forEach(t=>jz.addEventListener(t,endJoy));
addEventListener('pointerup',e=>{if(e.pointerId===joyId)endJoy(e)});
addEventListener('pointercancel',e=>{if(e.pointerId===joyId)endJoy(e)});
addEventListener('blur',resetJoy);
document.addEventListener('visibilitychange',()=>{if(document.hidden)resetJoy()});
const hold=(el,on,off)=>{el.addEventListener('pointerdown',e=>{e.preventDefault();try{el.setPointerCapture(e.pointerId)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}on()});['pointerup','pointercancel','lostpointercapture'].forEach(t=>el.addEventListener(t,()=>off&&off()))};
if($('#audibleBtn'))$('#audibleBtn').addEventListener('click',doAudible);
  if($('#motionBtn'))$('#motionBtn').addEventListener('click',doMotion);
$('#pile').addEventListener('pointerdown',e=>{e.preventDefault();window.__pileHeld=true;pileTap()});['pointerup','pointercancel','pointerleave'].forEach(ev=>$('#pile').addEventListener(ev,()=>{window.__pileHeld=false}));
hold($('#bTurbo'),()=>{input.turbo=true;$('#bTurbo').classList.add('on')},()=>{input.turbo=false;$('#bTurbo').classList.remove('on')});
hold($('#bJuke'),()=>doJuke());hold($('#bStiff'),doStiff);hold($('#bStyle'),doStyle);hold($('#bSpin'),doSpin);hold($('#bHurdle'),doHurdle);
/* v3.13 B6 TACTILE BUTTONS: press flash + ripple; a sweep shows the cooldown; a move you cannot afford shakes TURBO (the stamina ring).
   iPhone Safari has no web vibration, so there are no real haptics: the flash, ripple and sound stand in for them. */
function tact(b){b.addEventListener('pointerdown',()=>{b.classList.add('pressed');if(document.body.classList.contains('lite'))return;const r=document.createElement('i');r.className='rip';b.appendChild(r);setTimeout(()=>r.remove(),360)},{passive:true});
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>b.classList.remove('pressed')))}
document.querySelectorAll('.gbtn').forEach(tact);
function cdSweep(id,v){const b=$(id);if(!b)return;if(v>0){b._m=Math.max(b._m||0,v);b.style.setProperty('--cd',(v/b._m).toFixed(3));b.classList.add('cd')}else if(b._m){b._m=0;b.classList.remove('cd')}}   // learns the full cooldown length by itself
{const _sp=spend;spend=function(n){const ok=_sp.apply(this,arguments);if(!ok){const w=$('#bTurbo');w.classList.remove('no');void w.offsetWidth;w.classList.add('no')}return ok}}
/* swipes on the right side of the screen: left or right = juke that way, up = stiff arm (the left thumb steers, turbo stays a button) */
{const sz=$('#swipeZone'),hint=$('#swipeHint'),SW_MIN=22;let swId=null,o=null,used=0;
  try{used=+(localStorage.getItem('cfSwipes')||0)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}
  if(used>=8)hint.style.opacity=0;
  const live=()=>{const c=F&&F.carrier;return !!(G&&G.mode==='live'&&F.mode==='live'&&c&&!F.ballAir&&!F.lock&&!(c.role==='QB'&&F.passer===c))};
  sz.addEventListener('pointerdown',e=>{if(!live())return;e.preventDefault();swId=e.pointerId;o={x:e.clientX,y:e.clientY,t:performance.now()};try{sz.setPointerCapture(e.pointerId)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}});
  sz.addEventListener('pointermove',e=>{if(e.pointerId!==swId||!o)return;
    const dx=e.clientX-o.x,dy=e.clientY-o.y,ax=Math.abs(dx),up=-dy;
    if(performance.now()-o.t>700){o={x:e.clientX,y:e.clientY,t:performance.now()};return}   // a slow drag is not a swipe
    if(Math.max(ax,Math.abs(dy))<SW_MIN)return;
    if(up>ax){doStiff()}else if(dy>ax){doSpin()}else if(ax>Math.abs(dy)){doJuke(dx>0?1:-1)}   // v3.09: swipe down = spin
    o=null;   // one swipe, one move: lift and swipe again for the next
    used++;if(used===8)hint.style.opacity=0;try{localStorage.setItem('cfSwipes',used)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}});
  const end=e=>{if(e.pointerId===swId){swId=null;o=null}};
  ['pointerup','pointercancel','lostpointercapture'].forEach(t=>sz.addEventListener(t,end));
}
addEventListener('keydown',e=>{
  if(e.target&&e.target.tagName==='INPUT')return;
  keys[e.key.toLowerCase()]=true;const k=e.key.toLowerCase();
  if(F&&F.pile&&(k===' '||k==='a'||k==='enter')){window.__pileHeld=true;if(!e.repeat)pileTap();e.preventDefault();return}
  if(G&&G.mode==='playcall'&&(k===' '||k==='enter')&&!$('#sheet').hidden){callPlay();e.preventDefault()}
  else if(G&&G.mode==='set'&&(k===' '||k==='enter')){startPlay();e.preventDefault()}
  else if(G&&G.mode==='set'&&k==='tab'){doAudible();e.preventDefault()}
  else if(G&&G.mode==='set'&&k==='m'){doMotion();e.preventDefault()}
  const _ak=(window.A11Y&&window.A11Y.cfg.keys)||{juke:'q',stiff:'e',spin:'f',hurdle:'h',style:'r'};if(k===_ak.juke)doJuke();if(k===_ak.stiff)doStiff();if(k===_ak.spin)doSpin();if(k===_ak.hurdle)doHurdle();if(k===_ak.style)doStyle();
  const ti={'1':'WR1','2':'WR2','3':'TE','4':'RB'}[k];if(ti)throwTo(ti);
  if(k==='arrowright'&&G&&G.mode==='playcall'){G.sel=(G.sel+1)%PLAYS.length;updateSel()}
  if(k==='arrowleft'&&G&&G.mode==='playcall'){G.sel=(G.sel+PLAYS.length-1)%PLAYS.length;updateSel()}
});
addEventListener('keyup',e=>{const k=e.key.toLowerCase();keys[k]=false;if(k===' '||k==='a'||k==='enter')window.__pileHeld=false});
function kbStick(dt){
  if(joyId!==null)return;
  if(window.__gpInput&&window.__gpInput.active&&(window.__gpInput.sx||window.__gpInput.sy||window.__gpInput.turbo)){
    input.sx=window.__gpInput.sx;input.sy=window.__gpInput.sy;input.turbo=!!window.__gpInput.turbo;input.kb=true;return;
  }
  const x=(keys['d']||keys['arrowright']?1:0)-(keys['a']||keys['arrowleft']?1:0),y=(keys['w']||keys['arrowup']?1:0)-(keys['s']||keys['arrowdown']?1:0);
  if(x||y||input.kb){
    const m=Math.hypot(x,y)||1,tx=x?x/m:0,ty=y?y/m:0;
    const step=dt?1-Math.exp(-22*dt):1;
    input.sx+=(tx-input.sx)*step;input.sy+=(ty-input.sy)*step;
    if(!x&&!y&&Math.hypot(input.sx,input.sy)<.04){input.sx=0;input.sy=0;input.kb=false}else input.kb=true;
  }
  input.turbo=input.turbo&&joyId!==null?true:(keys['shift']||$('#bTurbo').classList.contains('on'));
}

