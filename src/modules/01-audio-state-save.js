/* ============================ helpers ============================ */
const $=s=>document.querySelector(s);
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const rnd=(a,b)=>a+Math.random()*(b-a);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const TAU=Math.PI*2;
function angDiff(a,b){let d=b-a;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;return d}
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const OPT='A';   // size option: A = bigger players on a narrow field, B = a bit smaller on a wider one
const FW=60, CX=FW/2, LAT=1, WSP=[17.6,17.6], DEEPX=14.2, ZX=9.2;   /* v3.14 (user): a wider field for more running room (was 53.3 wide); receivers split a little wider (16.8 -> 17.6, deep corners 13.5 -> 14.2) so they stay on screen at the snap; the rest is room toward the sidelines */   // a regulation-width field (53.3 yd); the camera shows ~18 yd of it and pans. Route sideways movement is back to 100%, zones back to v1.11 spacing; the receiver/DB split stays tight so all 11 fit on screen at the snap.
//   // a narrower field: about 9 player widths between the sidelines. LAT squeezes route sideways moves to fit it
const SLOTS=['QB','RB','WR1','WR2','TE','OL1','OL2'];
const posOf=s=>s.replace(/\d/,'');
let SPEED=1;

/* ============================ sound ============================
   Everything is made with the Web Audio API. Real files (Kenney UI clicks, the two synthwave loops, the rain loop) are embedded as
   base64 in window.SGA; football hits, crowd, whistle, steam and the like are synthesized. If anything fails the game just stays silent. */
const SND=(()=>{
  let ac=null,mst,musB,sfxB,ambB,musF,nb=null,vis=true,mode='ow',lz=0,lastKick=0,nextKick=0,evT=0,unlocked=false;
  const B={},E={},EG={},AM={},thr={};
  const DATA=window.SGA||{},FILES=window.SGA_FILES||null,KEYS=Object.keys(FILES||DATA);
  /* v2.92 SOUND FILES: when the build puts the sounds beside the page (window.SGA_FILES) instead of inside it, every file is downloaded
     as soon as the page opens (3 tries each), then turned into sound at the first tap exactly as before. A file that never arrives just
     stays silent; LOAD holds the numbers shown in the menu. With the sounds inside the page (window.SGA) nothing changes. */
  const LOAD={total:FILES?KEYS.length:0,ok:0,fail:0,bytes:0,t0:performance.now(),t1:0,bad:[]},READY={},WAITQ={};
  function fetchTry(url,n){return fetch(url).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.arrayBuffer()}).catch(e=>n>1?new Promise(res=>setTimeout(res,700*(4-n))).then(()=>fetchTry(url,n-1)):Promise.reject(e))}
  function bytesFor(k,cb){if(!FILES){if(DATA[k])cb(b64(DATA[k]).buffer);return}if(READY[k]){const ab=READY[k];delete READY[k];cb(ab);return}(WAITQ[k]=WAITQ[k]||[]).push(cb)}
  const loadDone=()=>{if(LOAD.ok+LOAD.fail===LOAD.total)LOAD.t1=performance.now()};
  const _loadKey=k=>fetchTry(FILES[k],3).then(ab=>{LOAD.ok++;LOAD.bytes+=ab.byteLength;loadDone();const q=WAITQ[k];if(q&&q.length){delete WAITQ[k];q[0](ab)}else READY[k]=ab},
    e=>{LOAD.fail++;LOAD.bad.push(k);loadDone();try{console.error('[CF] sound file did not load: '+k,e)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}});
  if(FILES){const _defer=[];for(const k of KEYS){if(/^amb_|^pa_|^mus_(hb|sp|r2)$/.test(k))_defer.push(k);else _loadKey(k)}
    const _runDefer=()=>_defer.forEach((k,i)=>setTimeout(()=>_loadKey(k),i*120));
    if(typeof requestIdleCallback==='function')requestIdleCallback(_runDefer,{timeout:1500});else setTimeout(_runDefer,900)}
  const cfg=()=>{const s=(typeof SAVE!=='undefined'&&SAVE&&SAVE.settings)||null;if(!s)return{mus:1,sfx:1,vol:.8};if(!s.snd)s.snd={mus:1,sfx:1,vol:.8};return s.snd};
  const T=()=>ac.currentTime;
  const b64=s=>{const bin=atob(s),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u};
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function nz(d,type,f0,f1,q,g,att,bus,when){
    if(!ac||!nb)return;const t=when||T(),s=ac.createBufferSource();s.buffer=nb;s.loop=true;s.playbackRate.value=.85+Math.random()*.3;
    const f=ac.createBiquadFilter();f.type=type;f.Q.value=q;f.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)f.frequency.exponentialRampToValueAtTime(f1,t+d);
    const o=ac.createGain();o.gain.setValueAtTime(.0001,t);o.gain.exponentialRampToValueAtTime(Math.max(.0002,g),t+Math.max(.003,att));o.gain.exponentialRampToValueAtTime(.0001,t+d);
    s.connect(f);f.connect(o);o.connect(bus||sfxB);s.start(t,Math.random()*1.5);s.stop(t+d+.05)}
  function tn(f0,f1,d,type,g,bus,when){
    if(!ac)return;const t=when||T(),o=ac.createOscillator(),n=ac.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)o.frequency.exponentialRampToValueAtTime(f1,t+d);
    n.gain.setValueAtTime(.0001,t);n.gain.exponentialRampToValueAtTime(Math.max(.0002,g),t+.01);n.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(n);n.connect(bus||sfxB);o.start(t);o.stop(t+d+.03)}
  let activeVoices=0,duckUntil=0,duckTarget=1;const MAX_VOICES=18;
  function duckMusic(lv,hold){if(!ac||!musB)return;const n=T();duckTarget=Math.min(duckTarget,lv==null?.32:lv);duckUntil=Math.max(duckUntil,n+(hold||.55));musB.gain.setTargetAtTime(cfg().mus?.85*dk*duckTarget:0,n,.03)}
  let paSrc=null,paMoveT=0;function playPA(k,cap,delay,soft){if(soft&&performance.now()-paMoveT<1350)return;if(soft)paMoveT=performance.now();if(cap&&window.A11Y)window.A11Y.caption(cap);if(!ac||!cfg().sfx||!vis)return;const b=B[k];if(!b)return;try{if(paSrc){paSrc.onended=null;paSrc.stop();paSrc=null}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn('pa',e)}duckMusic(.24,1.15);const s=ac.createBufferSource(),g=ac.createGain();s.buffer=b;s.playbackRate.value=1;g.gain.value=1.05;s.connect(g);g.connect(sfxB);paSrc=s;s.onended=()=>{if(paSrc===s)paSrc=null};if(k==='pa_sack'&&B._cGroan)_playBuf(B._cGroan,.45,0);s.start(T()+(delay||0))}
  function _fieldPan(){try{if(!OWON&&F&&F.carrier&&typeof cam!=='undefined')return clamp((F.carrier.x-cam.x)/14,-.72,.72)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return 0}
  function _playBuf(buf,vol,pan){if(!ac||!buf||activeVoices>=MAX_VOICES)return;activeVoices++;const s=ac.createBufferSource(),g=ac.createGain();s.buffer=buf;s.playbackRate.value=.94+Math.random()*.12;g.gain.value=Math.min(1.1,vol==null?.75:vol);if(pan&&ac.createStereoPanner){const p=ac.createStereoPanner();p.pan.value=clamp(pan,-.75,.75);s.connect(g);g.connect(p);p.connect(sfxB)}else{s.connect(g);g.connect(sfxB)}s.onended=()=>{activeVoices=Math.max(0,activeVoices-1)};s.start(T())}
  function play(name,rate,vol,when,pan){
    const b=B[name];if(!ac||!b||activeVoices>=MAX_VOICES)return;activeVoices++;
    const s=ac.createBufferSource(),g=ac.createGain();s.buffer=b;
    const jit=name==='x_cheer'||name==='x_rocket'?1:(.95+Math.random()*.1);
    s.playbackRate.value=(rate||1)*jit;g.gain.value=Math.min(1.15,vol==null?1:vol);
    const pv=pan!==undefined?pan:0;
    if(pv&&ac.createStereoPanner){const p=ac.createStereoPanner();p.pan.value=clamp(pv,-.75,.75);s.connect(g);g.connect(p);p.connect(sfxB)}
    else{s.connect(g);g.connect(sfxB)}
    s.onended=()=>{activeVoices=Math.max(0,activeVoices-1)};s.start(when||T())}
  const cheer=(lv,d)=>{nz(d,'bandpass',900,1100,.5,.12*lv,d*.3);nz(d,'bandpass',2200,2700,.6,.07*lv,d*.3)};
  const FX={
    hike(){tn(95,55,.12,'sine',.4);nz(.06,'highpass',2500,2500,.7,.22,.005)},
    handoff(){nz(.09,'lowpass',900,500,.7,.28,.005)},
    throw(){nz(.3,'bandpass',500,2600,1.2,.3,.07)},
    catch(){if(B.x_hit){play('x_hit',1.08,.8,undefined,_fieldPan());tn(150,70,.12,'sine',.2)}else{nz(.07,'highpass',1800,1800,.7,.4,.003);tn(150,70,.14,'sine',.4)}},
    deflect(){nz(.1,'bandpass',2200,900,1,.35,.004);tn(320,200,.1,'triangle',.15)},
    incomplete(){FX.whistle();B.x_bounce?play('x_bounce',1,.4,T()+.12):tn(260,180,.25,'triangle',.06)},
    juke(){if(B.x_arrow)play('x_arrow',1.22,.7,undefined,_fieldPan());else nz(.17,'bandpass',900,3300,1.4,.25,.03)},
    ankle(){FX.juke();play('glitch',.8,.5);B.x_app?play('x_app',1.1,.25,T()+.1):cheer(.35,.8)},
    stiff(){nz(.22,'bandpass',300,900,1,.3,.04)},
    whiff(){nz(.13,'bandpass',1800,600,1,.2,.02)},
    style(){tn(520,1040,.12,'triangle',.12);play('pluck',1.2,.5)},
    stiffHit(){if(B.x_stiff){play('x_stiff',1,.9);tn(120,45,.18,'sine',.35)}else FX.hit()},
    hit(){const pan=_fieldPan();play('p'+(1+((Math.random()*5)|0)),.88+Math.random()*.16,1.02,undefined,pan);if(B._fHit&&ac){_playBuf(B._fHit[(FX._hi=(FX._hi||0)+1)&3],.75,pan)}else{tn(115,36,.22,'sine',.48);nz(.035,'bandpass',2600,1400,1.4,.28,.002)}},
    bigHit(){duckMusic(.28,.6);const t=T();play('p'+(1+((Math.random()*5)|0)),.64,1.12,undefined,_fieldPan());play('p'+(1+((Math.random()*5)|0)),.8,.8,t+.05);tn(70,28,.5,'sine',.7);nz(.55,'lowpass',2200,200,.7,.4,.01);B.x_app?play('x_app',1.15,.3,t+.1):cheer(.55,1.1);playPA('pa_bighit','BIG HIT!',.05,1)},
    whistle(){if(B.x_whistle)play('x_whistle',1,.55);else{tn(2800,2860,.38,'triangle',.07);tn(2840,2780,.38,'square',.02)}},
    td(){duckMusic(.25,.95);const t=T();[523,659,784,1047,1319].forEach((f,i)=>tn(f,f,.2,'square',.08,sfxB,t+i*.09));tn(220,220,1,'sawtooth',.07,sfxB,t+.2);B.x_cheer?play('x_cheer',1,.9,t+.15):cheer(1.1,2.8);play('ok2',.8,.6,t+.1);if(B._cRoar)_playBuf(B._cRoar,.52,0);playPA('pa_td','TOUCHDOWN!',.12)},
    first(){const t=T();tn(660,660,.1,'square',.07);tn(990,990,.2,'square',.07,sfxB,t+.1);B.x_app?play('x_app',1,.35,t+.1):cheer(.45,1);playPA('pa_first','FIRST DOWN!',.04)},
    int(){duckMusic(.3,.8);tn(520,140,.55,'sawtooth',.11);nz(1,'bandpass',500,280,.6,.3,.1);if(B._cGasp)_playBuf(B._cGasp,.48,0);if(B._cGroan)_playBuf(B._cGroan,.42,0);playPA('pa_int','INTERCEPTED!',.05)},
    fumble(){duckMusic(.3,.75);if(B.x_boing){play('x_boing',1,.7);nz(.2,'lowpass',800,300,.6,.2,.01)}else{tn(300,90,.35,'square',.09);nz(.25,'lowpass',800,300,.6,.3,.01);nz(.9,'bandpass',500,300,.6,.2,.1)}if(B._cGasp)_playBuf(B._cGasp,.5,0);playPA('pa_fumble','FUMBLE!',.05)},
    gbArm(){const t=T();tn(180,1100,.4,'sawtooth',.45);tn(360,2200,.4,'square',.2);tn(90,90,.3,'sine',.6);play('pluck',1.4,1.8,t+.05);nz(.35,'bandpass',500,4000,1.5,.6,.2)},
    gbOn(){duckMusic(.26,.95);play('x_rocket',1,1.15,undefined,_fieldPan());tn(110,900,.9,'sawtooth',.4);nz(1,'bandpass',400,4200,1,.7,.35);tn(60,30,.8,'sine',.9);cheer(.5,1.4)},
    buzzer(){tn(160,160,.5,'square',.1)},
    win(){const t=T();[392,523,659,784,1047].forEach((f,i)=>tn(f,f,.25,'square',.07,sfxB,t+i*.12));B.x_cheer?play('x_cheer',1,.9,t+.3):cheer(1,2.4);playPA('pa_over','GAME OVER!',.18)},
    lose(){const t=T();[392,330,262,196].forEach((f,i)=>tn(f,f*.97,.35,'triangle',.1,sfxB,t+i*.2));nz(1.2,'bandpass',500,260,.6,.2,.2);playPA('pa_over','GAME OVER!',.18)},
    upgrade(){play('max',1,.8)},
    ui(){play('ui',1,.8)},sel(){play('sel',1,.9)},back(){play('back',1,.8)},err(){play('err',1,.8)},ok(){play('ok',1,.8)},ok2(){play('ok2',1,.8)},
    open(){play('open',1,.9)},close(){play('close',1,.9)},bong(){play('bong',1,.9)},q(){play('q',1,.7)},tick(){play('tick',1.2,.8)},
    blip(){play(Math.random()<.5?'blip':'blip2',.9+Math.random()*.25,.6)},
    blitzCue(pan){if(!ac||!cfg().sfx)return;play('tick',.78,.35,undefined,pan);nz(.08,'bandpass',1800,900,1.6,.12,.005)}
  };
  function fx(n){if(window.A11Y)window.A11Y.onSfx(n);if(!ac||!cfg().sfx||!vis)return;const now=performance.now();if(thr[n]&&now-thr[n]<45)return;thr[n]=now;try{const f=FX[n];if(f)f()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
  function step(room){if(!ac||!cfg().sfx)return;try{if(B._fStep){const _hb=area==='hb'||area==='r2';_playBuf(B._fStep[(step._i=(step._i||0)+1)&3],room?.18:_hb?.26:.22,0);if(!room&&!_hb)nz(.04,'highpass',3800,3200,.7,.025,.003)}else{nz(.05,'lowpass',room?1300:2200,500,.7,room?.08:.1,.003)}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
  function beep(f,d,type,vol){if(!ac||!cfg().sfx)return;try{tn(f,f*.9,d,type||'square',Math.min(.12,(vol||.035)*1.6))}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
  /* ---------- graph ---------- */
  function build(){
    mst=ac.createGain();const comp=ac.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=5;mst.connect(comp);comp.connect(ac.destination);
    musB=ac.createGain();sfxB=ac.createGain();ambB=ac.createGain();musF=ac.createBiquadFilter();musF.type='lowpass';musF.frequency.value=9000;musF.Q.value=.5;
    musF.connect(musB);musB.connect(mst);sfxB.connect(mst);ambB.connect(mst);
    nb=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate);{const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}
    const _mkFoley=(lenS,fn)=>{const b=ac.createBuffer(1,Math.floor(ac.sampleRate*lenS),ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=fn(i/ac.sampleRate,i/d.length);return b};
    B._fHit=[0,1,2,3].map(v=>_mkFoley(.16,(t,k)=>{const crack=Math.exp(-t*48)*Math.sin(t*(950+v*130)*6.28)*.42,sub=Math.exp(-t*18)*Math.sin(t*(95-v*6-t*260)*6.28)*.62,grit=Math.exp(-t*28)*(Math.random()*2-1)*.26;return clamp(crack+sub+grit,-1,1)}));
    B._fStep=[0,1,2,3].map(v=>_mkFoley(.06,(t,k)=>clamp(Math.exp(-t*65)*(Math.random()*2-1)*(.35+v*.04)+Math.exp(-t*90)*Math.sin(t*(140+v*18)*6.28)*.25,-1,1)));
    B._cRoar=_mkFoley(.85,(t,k)=>{const env=Math.min(1,t/.12)*Math.exp(-Math.max(0,t-.25)*2.4);return clamp(env*((Math.random()*2-1)*.38+Math.sin(t*310*6.28)*.12+Math.sin(t*620*6.28)*.08),-1,1)});
    B._cGasp=_mkFoley(.36,(t,k)=>{const env=Math.sin(Math.min(1,k)*Math.PI);return clamp(env*(Math.random()*2-1)*.32*Math.exp(-t*4.5),-1,1)});
    B._cGroan=_mkFoley(.62,(t,k)=>{const env=Math.min(1,t/.08)*Math.exp(-t*3.2),f=175-t*75;return clamp(env*(Math.sin(t*f*6.28)*.28+Math.sin(t*f*1.5*6.28)*.14+(Math.random()*2-1)*.18),-1,1)});
    const loop=(type,f,q,lf)=>{const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const fl=ac.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q||.7;const g=ac.createGain();g.gain.value=0;s.connect(fl);
      if(lf){const mod=ac.createGain();mod.gain.value=lf[2];const l=ac.createOscillator(),d=ac.createGain();l.type=lf[3]||'sine';l.frequency.value=lf[0];d.gain.value=lf[1];l.connect(d);d.connect(mod.gain);l.start();fl.connect(mod);mod.connect(g)}else fl.connect(g);
      g._syn=1;s.start();return g};   // v2.93b: not connected until a place turns it up (see set)
    AM.water=loop('bandpass',450,.8,[.35,.35,.65]);AM.steam=loop('highpass',3600);AM.crowd=loop('bandpass',700,.5,[.2,.25,.75]);AM.siz=loop('highpass',5200,.7,[9,.5,.5,'square']);
    const hum=(fs,type,lp)=>{const g=ac.createGain();g.gain.value=0;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;f.connect(g);g._syn=1;for(const fr of fs){const o=ac.createOscillator();o.type=type;o.frequency.value=fr;o.connect(f);o.start()}return g};
    AM.buzz=hum([100,150.5],'sawtooth',500);AM.holo=hum([220,330.6],'sine',900);AM.room=hum([55,110.3],'triangle',400);
    if(B.rain){const s=ac.createBufferSource();s.buffer=B.rain;s.loop=true;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=9000;const g=ac.createGain();g.gain.value=0;s.connect(f);f.connect(g);g._syn=1;s.start();AM.rain=g;AM.rainF=f}
    applyCfg()}
  let dk=1;
  function applyCfg(){if(!ac)return;const c=cfg(),t=T();mst.gain.setTargetAtTime(clamp(c.vol,0,1),t,.05);musB.gain.setTargetAtTime(c.mus?.85*dk:0,t,.2);ambB.gain.setTargetAtTime(c.sfx?dk:0,t,.2);sfxB.gain.setTargetAtTime(c.sfx?1:0,t,.05);syncMusic()}
  const AREA_MUS={vc:'mus1',sp:'mus_sp',hb:'mus_hb',r2:'mus_r2'};let area='vc';
  const wantMus=k=>mode==='game'?k==='mus2':k===(E[AREA_MUS[area]]?AREA_MUS[area]:'mus1');
  function loadMusic(){for(const k of KEYS.filter(q=>q.startsWith('mus'))){if(E[k]||(!FILES&&!DATA[k]))continue;try{const el=new Audio();el.loop=true;el.preload='auto';E[k]=el;const src=ac.createMediaElementSource(el),g=ac.createGain();g.gain.value=0;src.connect(g);g.connect(musF);EG[k]=g;
    bytesFor(k,ab=>{try{el.src=URL.createObjectURL(new Blob([ab],{type:'audio/mpeg'}));el._has=1;if(ac)syncMusic()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}})}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}syncMusic()}
  /* iOS lets a music player start only after it has been played once during a tap: done for every player that has its music, on every tap until it is done */
  function prime(){for(const k in E){const el=E[k];if(!el._has||el._primed)continue;el._primed=1;el.play&&el.play().then(()=>{const w=wantMus(k);if(!(w&&cfg().mus))el.pause()}).catch(()=>{el._primed=0})}}
  function syncMusic(){if(!ac)return;const c=cfg(),t=T();for(const k in E){const want=wantMus(k);EG[k].gain.setTargetAtTime(want&&c.mus?1:0,t,.9);
    if(want&&c.mus&&vis){E[k].play&&E[k].play().catch(()=>{})}else{clearTimeout(E[k]._pt);E[k]._pt=setTimeout(()=>{const w=wantMus(k);if(!(w&&cfg().mus&&vis))E[k].pause()},3500)}}}
  /* v2.93 MEMORY: the four area sound beds (about 37 MB once unpacked) are no longer all unpacked at the first tap. Their small packed
     files are kept, and only the bed for the area you are in is unpacked; it is let go (after fading out) when you leave the area and
     during a match. Everything else (short sounds, rain) is unpacked once, as before. */
  const BEDS={hb:['amb_hb'],sp:['amb_sp'],r2:['amb_r2','amb_fy']},PACKED={},SRC={},BUSY={},DROP={};
  function bedsFor(a){if(!ac)return;const want=new Set(BEDS[a]||[]);
    for(const k of ['amb_hb','amb_sp','amb_r2','amb_fy']){
      if(want.has(k)){clearTimeout(DROP[k]);DROP[k]=0;if(!B[k]&&!BUSY[k]&&PACKED[k]){BUSY[k]=1;try{const p=ac.decodeAudioData(PACKED[k].slice(0),b=>{BUSY[k]=0;B[k]=b;buildBed(k)},()=>{BUSY[k]=0});if(p&&p.catch)p.catch(()=>{BUSY[k]=0})}catch(e){BUSY[k]=0}}}
      else if(AM[k]&&!DROP[k]){set(AM[k],0,.3);DROP[k]=setTimeout(()=>{DROP[k]=0;try{SRC[k].stop();SRC[k].disconnect();AM[k].disconnect()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}delete SRC[k];delete AM[k];delete B[k]},2500)}}}
  function decode(){for(const k of KEYS){if(k.startsWith('mus'))continue;if(/^amb_/.test(k)){bytesFor(k,ab=>{PACKED[k]=ab;bedsFor(mode==='game'?null:area)});continue}bytesFor(k,ab=>{try{const p=ac.decodeAudioData(ab,b=>{B[k]=b;if(k==='rain'&&ac&&!AM.rain)buildRain();if(k.startsWith('amb_')&&ac&&!AM[k])buildBed(k)},()=>{});if(p&&p.catch)p.catch(()=>{})}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}})}}
  function buildBed(k){if(!B[k]||AM[k])return;const s=ac.createBufferSource();s.buffer=B[k];s.loop=true;const g=ac.createGain();g.gain.value=0;s.connect(g);g.connect(ambB);s.start();AM[k]=g;SRC[k]=s}
  function buildRain(){if(!B.rain||AM.rain)return;const s=ac.createBufferSource();s.buffer=B.rain;s.loop=true;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=9000;const g=ac.createGain();g.gain.value=0;s.connect(f);f.connect(g);g._syn=1;s.start();AM.rain=g;AM.rainF=f}
  /* iOS: mark the page's audio as 'ambient' so it mixes with music already playing on the phone (and follows the silent switch) instead of pausing it */
  function ambient(){try{if(navigator.audioSession&&navigator.audioSession.type!=='ambient')navigator.audioSession.type='ambient'}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
  ambient();
  function unlock(){
    ambient();
    try{if(!ac){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;ac=new C();build();decode();loadMusic();
        prime()}
      else{if(ac.state!=='running')ac.resume();prime()}}catch(e){ac=null}}
  /* ---------- places: rain, water, steam, hums, crowd and music follow where you are ---------- */
  const ZONES=[[16,5,13,8,.75,9000],[6,15,8,6,.6,6000],[26,15,8,6,.6,6000],[4,5,7,6,.55,900],[28,5,6,6,.5,2500],[25,27,7,6,.55,1000],[5,21,9,5,.35,2200],[20,26,6,6,.5,5000],[12,27,4,4,.4,3500],[16,36,14,5,.3,2500]];
  const ROOM={home:{mv:.3,lp:900,room:.05},pharma:{mv:.35,lp:1100,buzz:.07},bar:{mv:.8,lp:550,kick:1},den:{mv:.3,lp:1200,room:.1,chirp:1},arcade:{mv:.18,lp:1500,chip:1},pawn:{mv:.18,lp:900,room:.05},club:{mv:.5,lp:800,kick:1},crew1:{mv:.4,lp:1100,glitch:1},crew2:{mv:.4,lp:900,clank:1},crew3:{mv:.4,lp:1100,rain:.3},arena:{mv:.5,lp:3000,crowd:.22}};
  /* v2.93b BATTERY: the made-up sound loops (water, steam, crowd, sizzle, three hums) and the rain are plugged into the speakers only
     while a place has them turned up. Before, all of them were worked out 44,100 times a second even at volume 0. After fading to 0
     they are unplugged; turning them up plugs them back in (they fade in, so you cannot hear the switch). */
  const set=(g,v,tc)=>{if(!g)return;
    if(g._syn){if(v>.0005){if(g._off){clearTimeout(g._off);g._off=0}if(!g._on){g.connect(ambB);g._on=1}}
      else if(g._on&&!g._off)g._off=setTimeout(()=>{g._off=0;try{g.disconnect()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}g._on=0},Math.round((tc||.4)*6000))}
    g.gain.setTargetAtTime(v,T(),tc||.4)};
  function zone(map,px,py){
    if(!ac||mode==='game')return;const now=performance.now();if(now-lz<120)return;const dt=Math.min(.5,(now-lz)/1000);lz=now;
    let w={rain:0,water:0,steam:0,buzz:0,holo:0,siz:0,crowd:0,room:0,amb_hb:0,amb_sp:0,amb_r2:0,amb_fy:0},mv=.5,lp=6000,rf=9000,ev=null;
    {const a=(map.island||map.r2)?'r2':(map.harbor||map.hb)?'hb':map.route?'sp':'vc';if(a!==area){area=a;syncMusic()}bedsFor(area)}
    if(map.island){w.amb_r2=.4;mv=.42;lp=8000}else if(map.harbor){w.room=.03;w.amb_hb=.42;mv=.4;lp=7000}else if(map.route){const k=clamp(px/Math.max(1,map.w-1),0,1);w.rain=.5*clamp(1-k*1.25,0,1);w.amb_sp=.32;mv=.42;lp=7500}else if(!map.room){
      w.rain=.5;for(const z of ZONES){const k=clamp(1-Math.hypot((px-z[0])/z[2],(py-z[1])/z[3]),0,1);mv+=(z[4]-mv)*k;lp+=(z[5]-lp)*k}
      let ws=1e9,wst=1e9,wb=1e9,wh=1e9;for(const p of map.props){const d=Math.hypot(p.x-px,p.y-py);if(p.t==='vent')ws=Math.min(ws,d);else if(p.t==='stall'){wst=Math.min(wst,d);ws=Math.min(ws,d+1.5)}else if(p.t==='hoload')wh=Math.min(wh,d);else if(p.t==='repair'||p.t==='vend'||p.t==='pole')wb=Math.min(wb,d)}
      w.steam=clamp(1-ws/3,0,1)*.02;w.siz=clamp(1-wst/3,0,1)*.05;w.buzz=clamp(1-wb/4,0,1)*.1;w.holo=clamp(1-wh/4,0,1)*.1;
      const dw=Math.hypot(px-5,py-21.5);w.water=clamp(1-dw/4,0,1)*.02;
      for(const b of OWB){const d=Math.hypot(b.doors[0][0]-px,b.doors[0][1]-py);w.buzz=Math.max(w.buzz,clamp(1-d/4,0,1)*.07)}
    }else{
      const r=ROOM[map.id]||{mv:.35,lp:900};mv=r.mv;lp=r.lp;w.rain=map.hb?0:(r.rain||.1);if(map.r2){if(map.def&&map.def.deck){w.amb_fy=.42;mv=.4;lp=6000}else w.amb_r2=.08}else if(map.hb)w.amb_hb=.07;rf=1100;w.room=r.room||.06;w.buzz=r.buzz||0;w.crowd=r.crowd||0;ev=r}
    for(const k in w)set(AM[k],w[k]);set(AM.rain,w.rain*.3);if(AM.rainF)AM.rainF.frequency.setTargetAtTime(rf,T(),.5);
    musF.frequency.setTargetAtTime(lp,T(),.5);for(const k in EG)if(k===(E[AREA_MUS[area]]?AREA_MUS[area]:'mus1'))EG[k].gain.setTargetAtTime(cfg().mus?clamp(mv*2,0,1):0,T(),.6);
    // random little events that give each room a personality
    if(ev&&cfg().sfx&&vis){
      if(ev.kick){if(nextKick<T()-1)nextKick=T()+.05;while(nextKick<T()+.3){tn(125,42,.2,'sine',.4,ambB,nextKick);if(Math.round((nextKick*10))%2)nz(.05,'highpass',5000,5000,.7,.05,.002,ambB,nextKick+.23);nextKick+=.46}}
      const rr=Math.random();
      if(ev.chip&&rr<dt*4){const n=[523,587,659,784,880,988,1175,1319][(Math.random()*8)|0];tn(n,n,.09,'square',.035,ambB)}
      if(ev.chirp&&rr<dt*1.2)tn(1500+Math.random()*2200,1500+Math.random()*2200,.06,'sine',.03,ambB);
      if(ev.glitch&&rr<dt*.6)play('glitch',.7+Math.random()*.6,.25);
      if(ev.clank&&rr<dt*.35){nz(.14,'bandpass',1400,1100,6,.2,.003,ambB);tn(420,390,.18,'square',.025,ambB)}
    }
  }
  /* ---------- football: crowd bed, tension, running footsteps ---------- */
  let stepT=0,gt=0,starNext=0,starI=0,duckOn=false;
  // star power: a quick, sparkling arpeggio that climbs and shifts key, written for this game, loops only while Star Play is live
  const STAR_ROOTS=[0,2,4,2],STAR_PAT=[0,4,7,12,7,4,0,4,7,12,16,12,7,12,16,19];
  function starNote(t,i){const bar=(i>>4)&3,k=i&15,semi=STAR_ROOTS[bar]+STAR_PAT[k],f=523.25*Math.pow(2,semi/12);
    tn(f,f,.08,'square',.2,sfxB,t);tn(f*2,f*2,.06,'triangle',.1,sfxB,t);if(k%4===0)nz(.04,'highpass',6500,6500,.7,.2,.002,sfxB,t)}
  function star(on,dt){if(!!on!==duckOn){duckOn=!!on;dk=duckOn?.22:1;applyCfg()}if(!on||!cfg().sfx||!vis){starNext=0;return}const n=T();if(starNext<n)starNext=n+.03;while(starNext<n+.25){starNote(starNext,starI++);starNext+=.075}}
  function game(G,F,dt){
    if(!ac||!G)return;gt+=dt;star(!!(F&&F.gb),dt);
    {const nT=T();if(duckTarget<1&&nT>=duckUntil){duckTarget=1;musB.gain.setTargetAtTime(cfg().mus?.85*dk:0,nT,.25)}
      const isSlow=(typeof hitStop!=='undefined'&&hitStop>0)||(typeof slowT!=='undefined'&&slowT>0);
      if(isSlow)musF.frequency.setTargetAtTime(780,nT,.04)}
    if(F&&F.mode==='live'&&F.carrier&&cfg().sfx){const c=F.carrier,sp=Math.hypot(c.vx||0,c.vy||0);
      if(sp>2.5&&!c.fall){stepT-=dt*(.6+sp/8);if(stepT<=0){stepT=.2;if(B._fStep&&ac)_playBuf(B._fStep[(game._si=(game._si||0)+1)&3],.22,_fieldPan());else{nz(.045,'lowpass',1600,600,.7,.11,.003)}}}
      if(F.def&&(!game._bzT||T()-game._bzT>1.4)){for(let i=0;i<F.def.length;i++){const d=F.def[i];if(d.eng||d.fall||d.stun>0)continue;const dx=d.x-c.x,dy=d.y-c.y;if(Math.abs(dx)>2.4&&Math.hypot(dx,dy)<4.6){game._bzT=T();FX.blitzCue(clamp(dx/10,-.8,.8));break}}}
      const _mpM=Math.max(G.you||0,G.opp||0)>=(G.target||15)-7,_hiSt=(F.los>=75||G.down>=3||_mpM);if(_hiSt&&cfg().mus){const _beat=60/128,_barIdx=Math.floor(T()/(_beat*.5));if(game._rzB!==_barIdx){game._rzB=_barIdx;const _st=_barIdx%8;if(_st===0||_st===4)tn(_st===0?86:70,42,.08,'sine',_st===0?.16:.11,musB);if(_st%2===1)nz(.024,'highpass',7200,6400,.9,.055,.002,musB);if(_st===2||_st===6)nz(.045,'bandpass',1800,1100,1.2,.07,.003,musB);if(_mpM||(F.los>=75&&G.down>=3)){const _arp=[220,261.6,329.6,392,329.6,261.6,293.7,349.2][_st];tn(_arp,_arp,.09,'triangle',.045,musB)}}}
    }
    if(gt<.25)return;gt=0;
    const tgt=G.target||15,close=Math.max(G.you,G.opp)/tgt,late=clamp((close-.5)*2,0,1),hot=(F&&F.gb?.5:0)+(G.spArmed?.3:0);
    set(AM.crowd,.14+.14*late+.1*hot,.6);set(AM.amb_hb,0,.6);set(AM.amb_sp,0,.6);set(AM.amb_r2,0,.6);set(AM.amb_fy,0,.6);set(AM.rain,0,.6);set(AM.water,0,.6);set(AM.steam,0,.6);set(AM.siz,0,.6);set(AM.buzz,0,.6);set(AM.holo,0,.6);set(AM.room,0,.6);
    musF.frequency.setTargetAtTime(clamp(4200+late*5000+hot*3000,3000,12000),T(),.8);if(EG.mus2)EG.mus2.gain.setTargetAtTime(cfg().mus?.9+late*.1:0,T(),.8)}
  function setMode(m){mode=m;if(!ac)return;bedsFor(m==='game'?null:area);if(m==='game'){for(const k of ['rain','water','steam','siz','buzz','holo','room','crowd','amb_hb','amb_sp','amb_r2','amb_fy'])set(AM[k],0,.5)}else{musF.frequency.setTargetAtTime(6000,T(),.3);set(AM.crowd,0,.5)}syncMusic()}
  document.addEventListener('visibilitychange',()=>{vis=!document.hidden;if(!ac)return;if(vis){ambient();ac.resume&&ac.resume();syncMusic()}else{for(const k in E)E[k].pause();ac.suspend&&ac.suspend()}});
  addEventListener('pagehide',()=>{if(ac){for(const k in E)E[k].pause();ac.suspend&&ac.suspend()}});
  for(const ev of ['pointerdown','touchend','keydown'])addEventListener(ev,unlock,{passive:true});
  document.addEventListener('pointerdown',e=>{const b=e.target&&e.target.closest&&e.target.closest('button');if(!b)return;if(b.closest('#sheet,#setbar,#ctl,#fourth,#hud,#owA'))return;fx(b.closest('#owBtns')?'sel':b.id==='sBack'||/back|close|done/i.test(b.id+b.textContent)?'back':'ui')},true);
  return{fx,pa:playPA,smp:(n,r,v)=>{try{if(ac&&cfg().sfx&&vis)play(n,r,v)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}},step,beep,zone,game,setMode,applyCfg,unlock,get ready(){return !!ac},get dbg(){const o={};for(const k in E)o[k]={paused:E[k].paused,t:+E[k].currentTime.toFixed(1),g:+EG[k].gain.value.toFixed(2)};o.mode=mode;o.area=area;o.amb={hb:AM.amb_hb?+AM.amb_hb.gain.value.toFixed(2):null,sp:AM.amb_sp?+AM.amb_sp.gain.value.toFixed(2):null,r2:AM.amb_r2?+AM.amb_r2.gain.value.toFixed(2):null,fy:AM.amb_fy?+AM.amb_fy.gain.value.toFixed(2):null,rain:AM.rain?+AM.rain.gain.value.toFixed(2):null};o.state=ac&&ac.state;o.buf=Object.keys(B).length;o.mem=Object.values(B).flat().reduce((a,b)=>a+(b&&b.length&&b.numberOfChannels?b.length*b.numberOfChannels*4:0),0);o.syn=Object.keys(AM).filter(k=>AM[k]&&AM[k]._syn&&AM[k]._on);o.files=LOAD.total;o.ok=LOAD.ok;o.fail=LOAD.fail;return o},get load(){return LOAD}};
})();
function beep(f,d,type,vol){SND.beep(f,d,type,vol)}

/* ============================ players, looks & uniforms ============================ */
const mk=(name,pos,spd,pow,hnd,blk,tkl,thr,special,star)=>({name,pos,spd,pow,hnd,blk,tkl,thr,special:special||null,star:!!star});
const POS_W={QB:{thr:.38,acc:.28,spd:.16,pow:.09,hnd:.09},RB:{spd:.45,pow:.4,hnd:.15},WR:{spd:.4,hnd:.5,pow:.1},TE:{hnd:.35,blk:.3,pow:.2,spd:.15},OL:{blk:.6,pow:.4}};
function ovr(p){const w=POS_W[p.pos];if(!w)return Math.round((p.spd+p.pow+p.tkl)/3);let s=0;for(const k in w)s+=p[k]*w[k];return Math.round(s)}
const SPECIALS={
  hailmary:{name:'HAIL MARY',role:'WR',desc:'Star Play: he gets a 40% speed burst and every throw to him is caught'},
  bulldozer:{name:'BULLDOZER',role:'RB',desc:'Star Play: breaks 3 tackles and trucks never fail'},
  cannon:{name:'LASER ARM',role:'QB',desc:'Star Play: rushers slow down and throws fly faster'}
};
const SKIN=['#f6d5b8','#e6b48a','#c98f63','#a8714a','#8d5a3a','#6e4630','#4a2e22'];
const HAIRC=['#14110f','#2a1a10','#5a3b22','#8b5a2b','#c9a26b','#b5392b','#d9d9d9'];
const HAIRS=['short','short','fade','afro','dreads','long','mohawk','buzz','cornrows','afro','bald','short','fade'];
const BODY={QB:{bend:15,w:1.0,sw:.9,lg:.95,lt:1,tl:1.1,rd:.65,sh:1.02,h:1.1,hd:.96,tp:.85},RB:{bend:22,w:1.3,sw:1,lg:1,lt:1.22,tl:1,rd:.85,sh:1.22,h:.92,hd:1,tp:.68},WR:{bend:15,w:.92,sw:.78,lg:.87,lt:1,tl:1,rd:.65,sh:1,h:1.1,hd:.98,tp:.7},TE:{bend:22,w:1.3,sw:1,lg:1.03,lt:1,tl:1,rd:.85,sh:1.15,h:1.05,hd:1,tp:.85},
  OL:{bend:30,w:1.8,sw:1.25,lg:1.12,lt:1,tl:1,rd:1,sh:1.2,h:.98,hd:1,tp:1},DL:{bend:30,w:1.75,sw:1.25,lg:1.12,lt:1,tl:1,rd:1,sh:1.2,h:.98,hd:1,tp:.95},LB:{bend:22,w:1.4,sw:1,lg:1.05,lt:1,tl:1,rd:.85,sh:1.18,h:1,hd:1,tp:.8},DB:{bend:15,w:1.0,sw:.78,lg:.87,lt:1,tl:1,rd:.65,sh:1,h:1.08,hd:.98,tp:.8}};
function lookOf(d){
  if(d._look)return d._look;
  const h=hash(d.n0||d.name||'x'),pos=d.pos,B=BODY[pos]||BODY.LB,v=.97+((h>>9)%7)/100;
  const l={skin:SKIN[h%SKIN.length],hair:HAIRS[(h>>3)%HAIRS.length],hc:HAIRC[(h>>6)%HAIRC.length],
    w:B.w*v,sw:B.sw||1,lg:B.lg||1,rd:B.rd||1,bend:B.bend||22,lt:B.lt||1,tl:B.tl||1,sh:B.sh,h:B.h*(.98+((h>>12)%5)/100),hd:B.hd,tp:B.tp,mouth:(h>>8)%4,mood:(h>>5)%4,eyes:(h>>11)%3,beard:[null,null,'beard','stache',null][(h>>14)%5]};
  if(d.star&&(d.n0||d.name).indexOf('Reyes')>=0){l.skin=SKIN[4];l.hair='dreads';l.hc='#14110f'}
  if(d.skinC)l.skin=d.skinC;
  l.sl=d.sleeve||'#000000';l.slo=d.sleeve?'1':'0';l.vc=d.visor||'#000000';l.vo=d.visor?'1':'0';   // gear: arm sleeves and a visor, each with its own colour (off unless chosen)
  Object.defineProperty(d,'_look',{value:l,enumerable:false,writable:true});return l;
}
function gearOf(d){
  if(!d||!(d.star||d.special))return null;
  if(!d.gear)d.gear={sleeves:true,sc:'#ffd23a',visor:true,vc:'#38c6d9',gloves:true,gc:'#ffd23a'};
  return d.gear;
}
const gearOfD=d=>gearOf(d);   // v3.16KK1: the 3D code has its own gearOf, so it reaches this one by this name
const DEF_UNI={j:2,jc:'#e4572e',jt:'#ffffff',jn:'#ffffff',jo:'#14110f',p:1,pc:'#ece8dc',ps:'#e4572e',po:'#14110f',sock:'#e4572e',shoe:'#14110f',h:0,hc:'#1f3f9e',hs:'#ffffff',mask:'#6b7078'};
const JERSEY_NAMES=['Plain','Tank','Arm Stripes'];
const PANTS_NAMES=['Plain','Double Stripe','Block Stripe'];
const UNI_SLOTS=[['jc','JERSEY'],['jt','TRIM / PADS'],['jn','NUMBERS'],['jo','NUMBER OUTLINE'],['pc','PANTS'],['ps','PANT STRIPE'],['po','STRIPE OUTLINE'],['sock','SOCKS'],['shoe','SPIKES'],['hc','HELMET'],['mask','FACEMASK']];
const GEAR_SLOTS=[['sc','SLEEVES'],['vc','VISOR'],['gc','GLOVES']];
const PAL=['#e4572e','#c8102e','#ff8a1f','#ffc23d','#f5e663','#58c26a','#0b7a3b','#38c6d9','#2f6bff','#1c2f6b','#7b3fd1','#ff7ac8','#ffffff','#cfd3d6','#6b7078','#14110f','#8b5a2b','#e8d5a8'];

const REF={QB:{spd:62,pow:52,hnd:45,thr:74},RB:{spd:72,pow:70,hnd:50},WR:{spd:75,pow:48,hnd:66},TE:{spd:58,pow:70,hnd:62,blk:64},OL:{spd:45,pow:74,blk:70}};
const OFFS={QB:{thr:1,acc:-7,spd:-5,pow:-9,hnd:-3,blk:-20},RB:{spd:1,pow:-1,hnd:-4,blk:-15},WR:{spd:2,hnd:1,pow:-10,blk:-14},TE:{spd:-5,hnd:-2,pow:-1,blk:-1},OL:{spd:-12,hnd:-13,pow:0,blk:1}};
/* Every player gets rated around his team's level T: speed, strength (pow), blocking, tackling, catching (hnd), coverage. */
function rescale(p,T){
  const o=OFFS[p.pos]||OFFS.WR,rf=REF[p.pos]||{},h=hash(p.name);let i=0;
  for(const k in o){const fl=rf[k]!==undefined?clamp((p[k]-rf[k])*.2,-4,4):0;p[k]=clamp(Math.round(T+o[k]+fl+((h>>(i++*3))%5)-2),30,99)}
  const w=POS_W[p.pos];if(w){const d=T+(((h>>12)%3)-1)-ovr(p);for(const k in w)p[k]=clamp(Math.round(p[k]+d),30,99)}   // so his overall lands on his team's level
  p.tkl=clamp(Math.round((p.pow>p.blk?p.pow:(p.pow+p.blk)/2)-3),30,99);p.cov=clamp(Math.round((p.spd+p.hnd)/2-2),25,99);
  return p;
}
const statLine=p=>'SPD '+p.spd+' \u00b7 STR '+p.pow+' \u00b7 BLK '+p.blk+' \u00b7 HND '+p.hnd+' \u00b7 DEF '+defOvr(p)+(p.pos==='QB'?' \u00b7 THP '+p.thr+' \u00b7 ACC '+(p.acc!==undefined?p.acc:Math.round(p.thr*.9)):'');
function freshSave(){const sv=freshSave0();Object.keys(sv.starters).forEach(k=>rescale(sv.starters[k],73));sv.starters.QB.thr=86;sv.starters.QB.acc=82;sv.qbV=2;sv.ratV=1;sv.upV=1;sv.upPts=0;return sv}   // starting QB: about 31 yards of range and good accuracy
function freshSave0(){return{starters:{
  QB:mk('Eli "Deuce" Voss','QB',66,52,45,30,40,74),
  RB:mk('Dre "Tank" Wallace','RB',70,76,50,40,50,30),
  WR1:mk('Jay "Jet" Morales','WR',80,48,66,30,44,30),
  WR2:mk('Cam Ortiz','WR',72,50,70,30,44,30),
  TE:mk('Ben "Barn" Kowalski','TE',58,70,62,64,52,30),
  OL1:mk('Moose Dupree','OL',46,76,38,72,60,20),
  OL2:mk('Hank Tuttle','OL',44,72,36,68,58,20)},bench:[],beaten:[],uniV:2,uni:Object.assign({},DEF_UNI),teamName:'Street Kings',settings:{cam:'behind'},ow:{x:15,y:23,d:'d'}}}

const CREWS=[
 {id:'cats',name:'Glitch Cats',short:'GLITCH',town:'Vapor City',ez:'GLITCH CATS',boss:'Pixel Pete',level:1,target:21,col:'#8e5bd8',
  uni:{j:2,jc:'#8e5bd8',jt:'#ffffff',jn:'#ffffff',p:1,pc:'#2b2b34',ps:'#8e5bd8',sock:'#ffffff',shoe:'#14110f',h:2,hc:'#3f2273',hs:'#ffffff',mask:'#ffffff'},
  scout:'Plays it safe. Mostly balanced looks with a stray blitz.',
  mix:()=>pick(['bal','bal','bal','deep','deep','stack','blitz']),
  roster:[mk('Pixel Pete Ruiz','QB',58,44,40,30,40,66),mk('Fast Eddie Park','RB',68,58,48,30,40,30),mk('Nico Sandoval','WR',72,44,62,30,40,30),mk("Lil' Terry Bell",'WR',66,42,58,30,40,30),mk('Woody Haas','TE',52,60,54,56,45,30),mk('Circuit Dan','OL',40,66,30,62,52,20),mk('Pavel Nowak','OL',38,62,30,58,50,20)]},
 {id:'kings',name:'Scrap Kings',short:'SCRAP',town:'Vapor City',ez:'SCRAP KINGS',boss:'Rusty Okoye',level:2,target:21,col:'#f2b632',
  uni:{j:0,jc:'#f2b632',jt:'#14110f',jn:'#14110f',p:2,pc:'#14110f',ps:'#f2b632',sock:'#f2b632',shoe:'#ffffff',h:1,hc:'#14110f',hs:'#f2b632',mask:'#f2b632'},
  scout:'Loves to stack the box. Running into it gets you stuffed. Throw.',
  mix:()=>pick(['stack','stack','stack','bal','bal','blitz','deep']),
  roster:[mk('Rusty Okoye','QB',62,50,44,30,40,70),mk('Crash Delgado','RB',72,68,52,30,44,30),mk('Slick Vince Navarro','WR',76,46,66,30,40,30),mk('Mikey Two-Hands','WR',70,48,72,30,42,30),mk('Gus "Gravel" Lindqvist','TE',55,68,60,62,50,30),mk('Big Tobias','OL',42,72,32,68,56,20),mk('Kenji Watanabe','OL',44,68,34,66,56,20)]},
 {id:'rollers',name:'Skyline Drifters',short:'DRIFTERS',town:'Vapor City',ez:'SKYLINE DRIFTERS',boss:'Slick Lou Martinez',level:3,target:21,col:'#2fa88a',
  uni:{j:1,jc:'#2fa88a',jt:'#ffffff',jn:'#ffffff',p:1,pc:'#ffffff',ps:'#2fa88a',sock:'#2fa88a',shoe:'#14110f',h:0,hc:'#0d4a3c',hs:'#ffffff',mask:'#14110f'},
  scout:'Sits back in deep coverage, then comes with the blitz on 3rd down.',
  mix:(down)=>down===3?pick(['blitz','blitz','blitz','bal']):pick(['deep','deep','deep','bal','stack']),
  roster:[mk('Slick Lou Martinez','QB',66,54,48,30,44,76),mk('Jolt Abernathy','RB',78,70,56,30,46,30),mk('Pepper Quinn','WR',80,50,72,30,44,30),mk('Rico Salazar','WR',74,52,74,30,44,30),mk('Walt Brennan','TE',60,72,66,68,54,30),mk('Titan Mbeki','OL',46,78,34,74,62,20),mk('Oskar Lund','OL',48,74,34,72,62,20)]},
 {id:'captain',name:'Netrunners',short:'NETS',town:'Vapor City',ez:'NETRUNNERS',boss:'Mainframe Mo',level:4,target:28,captain:true,col:'#d6362f',
  uni:{j:1,jc:'#d6362f',jt:'#14110f',jn:'#ffc23d',p:2,pc:'#14110f',ps:'#ffc23d',sock:'#14110f',shoe:'#ffc23d',h:2,hc:'#5a0f0c',hs:'#ffc23d',mask:'#ffc23d'},
  scout:'Blitzes on 3rd down. Stacks the box on 4th and short. Opens in deep coverage.',
  mix:(down,togo)=>{if(down===3)return Math.random()<.7?'blitz':'bal';if(down===4||togo<=7)return Math.random()<.7?'stack':'bal';return pick(['deep','deep','bal','stack'])},
  roster:[mk('Mainframe Mo Calloway','QB',70,60,50,30,48,80),mk('Brick Hayes','RB',76,84,56,30,52,30),mk('"Zero Day" Darnell Reyes','WR',94,56,88,30,50,30,'hailmary',true),mk('Cedric Vaughn','WR',82,52,78,30,48,30),mk('Tommy "Tree" Okonkwo','TE',66,78,72,76,60,30),mk('Anvil Barrett','OL',50,86,38,86,75,20),mk('Bruno Castellano','OL',48,84,36,82,72,20)]}
];
CREWS.forEach((c,i)=>{c.uni=Object.assign({jo:'#14110f',po:'#14110f'},c.uni);c.T=[66,69,72,75][i];c.roster.forEach(p=>rescale(p,c.T))});   // worst crew is 73, the final city is 91

/* ROUTE CREWS (route encounters; never part of CREWS, never count toward crew progression) */
const ROUTE_ROSTERS={
 rats1:()=>[mk('Mack "Hardhat" Dwyer','QB',68,68,60,30,60,76),mk('Rat 1','RB',74,72,58,30,44,30),mk('Rat 2','WR',78,54,68,30,40,30),mk('Rat 3','WR',76,56,68,30,40,30),mk('Rat 4','TE',68,70,70,70,50,30),mk('Rat 5','OL',40,70,30,70,52,20),mk('Rat 6','OL',40,70,30,70,52,20)],
 rats2:()=>[mk('Rat Boss 2','QB',70,70,62,30,62,78),mk('Rat 7','RB',76,74,60,30,46,30),mk('Rat 8','WR',80,56,70,30,42,30),mk('Rat 9','WR',78,58,70,30,42,30),mk('Rat 10','TE',70,72,72,72,52,30),mk('Rat 11','OL',42,72,32,72,54,20),mk('Rat 12','OL',42,72,32,72,54,20)]
};
const ROUTE_CREWS=[
 {id:'rats1',name:'Channel Rats',short:'RATS',town:'The Spillway',ez:'CHANNEL RATS',boss:'Mack "Hardhat" Dwyer',level:1,target:7,pickup:true,col:'#c6f23a',uni:Object.assign({jo:'#14110f',po:'#14110f'},{j:1,jc:'#c6f23a',jt:'#14110f',jn:'#14110f',jo:'#f4f4f0',p:2,pc:'#14110f',ps:'#c6f23a',po:'#f4f4f0',sock:'#c6f23a',shoe:'#14110f',h:1,hc:'#c6f23a',hs:'#14110f',mask:'#14110f'}),scout:'Blue-collar. Runs the ball straight at you. Won\'t take a big shot until you force them to.',mix:()=>Math.random()<.55?'stack':'bal',roster:ROUTE_ROSTERS.rats1(),T:72},
 {id:'rats2',name:'Channel Rats',short:'RATS',town:'The Spillway',ez:'CHANNEL RATS',boss:'Rat Boss 2',level:2,target:7,pickup:true,col:'#c6f23a',uni:Object.assign({jo:'#14110f',po:'#14110f'},{j:1,jc:'#c6f23a',jt:'#14110f',jn:'#14110f',jo:'#f4f4f0',p:2,pc:'#14110f',ps:'#c6f23a',po:'#f4f4f0',sock:'#c6f23a',shoe:'#14110f',h:1,hc:'#c6f23a',hs:'#14110f',mask:'#14110f'}),scout:'Blue-collar. Runs the ball straight at you. Won\'t take a big shot until you force them to.',mix:()=>Math.random()<.55?'stack':'bal',roster:ROUTE_ROSTERS.rats2(),T:73}
];
ROUTE_CREWS.forEach(c=>c.roster.forEach(p=>rescale(p,c.T)));

/* ============================ plays ============================ */
const LSP=2.6;   /* v3.14 (user): the line spreads out (was 2.05) */   // blockers stand shoulder to shoulder: 2.05 yd center to center is about 1.25 lineman widths on screen
const FORM={QB:[0,-7.7],RB:[2.6,-9.7],WR1:[-WSP[0],-.3],WR2:[WSP[1],-.3],TE:[LSP,-.3],OL1:[0,-.3],OL2:[-LSP,-.3]};   // line spacing is 2.5x what it was; receivers sit near the edges of the screen   // OL1 is the center
const NUM={QB:7,RB:22,WR1:81,WR2:11,TE:88,OL1:52,OL2:72};
const ROLECOL={WR1:'#ffd23a',WR2:'#4dd0e1',TE:'#7be07b',RB:'#ff8ad8'};
const BTN=[['WR1','A'],['WR2','B'],['TE','C'],['RB','D']];
const PLAYS=[
 {id:'run_in',name:'Run Inside',tag:'RUN',kind:'run',hand:.32,aim:[.4,-.6],arrow:[[3.2,-5.4],[.4,-.6],[0,10]],blurb:'Up the gut. A stacked box stuffs it.'},
 {id:'run_out',name:'Run Outside',tag:'RUN',kind:'run',hand:.45,aim:[8,-3.2],arrow:[[3.2,-5.4],[8,-3.2],[17,4]],blurb:'Pitch and race the edge. Great vs. deep coverage.'},
 {id:'short',name:'Short Pass',tag:'PASS',kind:'pass',routes:{WR1:[[0,7],[-7,7]],WR2:[[0,6],[-6,10]],TE:[[0,8],[0,6.2]],RB:[[5,0],[10,3]]},blurb:'Quick throws. Throw after the cut. Beats the blitz.'},
 {id:'deep',name:'Deep Pass',tag:'PASS',kind:'pass',routes:{WR1:[[0,8],[-3,12],[-4,26]],WR2:[[0,10],[-7,19],[-8,25]],TE:[[0,16]],RB:[[3,1],[6,5]]},blurb:'Go long. Needs time and a strong arm. Dies to the blitz.'},
 {id:'screen',name:'Screen',tag:'PASS',kind:'pass',routes:{RB:[[-4,.6],[-8,1.4]],WR1:[[0,25]],WR2:[[0,25]],TE:[[-5,1.6]]},blurb:'Let them rush, dump it behind. Beats the blitz.'},
 {id:'smash',name:'Smash',tag:'PASS',kind:'pass',routes:{WR2:[[0,5],[0,4.2]],TE:[[0,9],[6,17]],WR1:[[0,6],[5,10]],RB:[[-5,0],[-9,2]]},blurb:'Outside man stops short, the tight end runs to the corner over him. Hi-lo on the corner.'},
 {id:'dig',name:'Dig',tag:'PASS',kind:'pass',routes:{WR1:[[0,12],[8,12],[15,12.5]],WR2:[[0,28]],TE:[[0,4],[-10,5]],RB:[[5,0],[9,3]]},blurb:'Twelve yards and break inside. The go route clears it out. Throw as he turns.'},
 {id:'ycross',name:'Y-Cross',tag:'PASS',kind:'pass',routes:{TE:[[0,5],[-8,11],[-17,13]],WR1:[[0,8],[-2,27]],WR2:[[0,9],[0,7.5]],RB:[[-5,0],[-9,2]]},blurb:'Tight end crosses the whole field. The go route clears the side he runs to.'},
 {id:'flea',name:'Flea Flicker',tag:'TRICK',kind:'flea',hand:.32,lat:1.45,aim:[.4,-.6],routes:{WR1:[[0,26]],WR2:[[0,10],[-6,25]],TE:[[0,20]]},blurb:'Fake the run, pitch it back, go deep. Risky.'}
];
const PLAYS_X=[
 {id:'slant',name:'Slant',tag:'PASS',kind:'pass',req:'captain',routes:{WR1:[[0,3],[7,7],[14,11]],WR2:[[0,3],[-7,7],[-14,11]],TE:[[0,5],[3,10]],RB:[[5,0],[9,2]]},blurb:'Quick inside break. Catch it and run. Beats the blitz.'},
 {id:'post',name:'Post',tag:'PASS',kind:'pass',req:'captain',deepish:1,routes:{WR1:[[0,9],[6,18],[9,29]],WR2:[[0,8],[-6,16],[-9,27]],TE:[[0,8]],RB:[[3,1],[6,5]]},blurb:'Stem, then break to the middle. Throw after he breaks inside.'},
 {id:'mesh',name:'Crossers',tag:'PASS',kind:'pass',req:'captain',routes:{WR1:[[0,4],[9,8],[17,10]],WR2:[[0,4],[-9,9],[-17,11]],TE:[[0,10],[-4,12]],RB:[[6,0],[11,3]]},blurb:'Two receivers cross the middle. Short catch, long run.'},
 {id:'draw',name:'Draw',tag:'RUN',kind:'run',req:'captain',hand:.62,aim:[.4,-.6],arrow:[[3.2,-5.4],[.4,-.6],[0,10]],blurb:'Late handoff up the gut. Holes open after the rush commits.'},
 {id:'counter',name:'Counter',tag:'RUN',kind:'run',req:'captain',hand:.66,aim:[-5.5,-2.2],arrow:[[3.2,-5.4],[-5.5,-2.2],[-11,4]],blurb:'Run to the other edge. The defense is leaning the wrong way.'},
 {id:'seam',name:'Seam Shot',tag:'PASS',kind:'pass',req:'closers',deepish:1,routes:{TE:[[0,10],[0,30]],WR1:[[0,6],[4,14]],WR2:[[0,6],[-4,14]],RB:[[6,0],[11,4]]},blurb:'Tight end up the seam. Splits a deep shell.'},
 {id:'wheel',name:'Wheel',tag:'PASS',kind:'pass',req:'closers',deepish:1,routes:{RB:[[7,0],[13,5],[14,19]],WR1:[[0,8],[4,14]],WR2:[[0,10],[-6,15]],TE:[[0,6]]},blurb:'Back swings out, then turns up the sideline. Linebackers cannot keep up.'},
 {id:'dmove',name:'Out and Up',tag:'PASS',kind:'pass',req:'closers',deepish:1,routes:{WR1:[[0,7],[-5,9],[-7,28]],WR2:[[0,7],[5,9],[7,28]],TE:[[0,8]],RB:[[4,0],[8,3]]},blurb:'Fake the out, then go. Corners jump the first cut.'},
 {id:'bomb',name:'Four Verts',tag:'PASS',kind:'pass',req:'closers',deepish:1,routes:{WR1:[[0,33]],WR2:[[0,33]],TE:[[0,24]],RB:[[4,1],[9,5]]},blurb:'Everyone goes deep. Needs time. Dies to the blitz.'},
 {id:'power',name:'Power',tag:'RUN',kind:'run',req:'closers',hand:.28,aim:[3.6,-.6],arrow:[[3.2,-5.4],[3.6,-.6],[2,10]],blurb:'Downhill and fast. Hits the hole before it closes.'}
];
PLAYS[3].deepish=1;   // v3.04 (item 10, user approved): Counter handoff .62 -> .66 s (was the best run by far); Slant breaks sharper at 3 yd + TE seam (was the weakest play); Short and Post cards say when to throw
const PLAYS_BASE=PLAYS.length;
function playsSync(box){
  const have=(typeof SAVE!=='undefined'&&SAVE&&SAVE.beaten)||[];
  PLAYS.length=PLAYS_BASE;PLAYS_X.forEach(p=>{if(have.includes(p.req))PLAYS.push(p)});
  const sig=PLAYS.map(p=>p.id).join();if(box&&box.dataset.sig!==sig){box.innerHTML='';delete box.dataset.built;box.dataset.sig=sig}
}
const DLY=1.3,DLX=[-LSP,0,LSP];   // v3.16V3: centred, head-up on OL2, OL1 and the TE   // DL use the blocker spacing, in the gaps about a yard off the ball
const LBD=1.5;   /* v3.14 (user): linebackers line up this much deeper */
const DEF_FORM={   /* v3.16U2: 1 LB + 1 safety + 2 corners (was 2 LB + 2 DB). Positions are [x, yards off the ball]. */
 bal:{dl:DLX.map(x=>[x,DLY]),lb:[[0,5.2]],s:[[0,12.5]],db:[[-WSP[0]-1.4,7],[WSP[1]+1.4,7]]},
 blitz:{dl:DLX.map(x=>[x,DLY]),lb:[[0,4.6]],s:[[3.2,6.5]],db:[[-WSP[0]-1.4,6.5],[WSP[1]+1.4,6.5]]},
 deep:{dl:DLX.map(x=>[x,DLY]),lb:[[0,6.5]],s:[[0,15.5]],db:[[-DEEPX-.4,12],[DEEPX+.4,12]]},
 stack:{dl:DLX.map(x=>[x,DLY]),lb:[[-1.6,4]],s:[[1.9,5.2]],db:[[-WSP[0]-1.4,6.5],[WSP[1]+1.4,6.5]]},
 spy:{dl:DLX.map(x=>[x,DLY]),lb:[[0,5.5]],s:[[0,12]],db:[[-WSP[0]-1.4,7],[WSP[1]+1.4,7]]},   // v3.16FF2
 goal:{dl:DLX.map(x=>[x,DLY]),lb:[[0,2.6]],s:[[2.2,3.2]],db:[[-WSP[0]+1,2.4],[WSP[1]-1,2.4]]}
};
const SHELL2=true;   // v3.16JJ1 (user): packages by call. Base (Balanced, Blitz, Stack, Spy) 2 DL + 2 LB + 1 S + 2 CB; Deep = prevent 2 DL + 1 LB + 2 S + 2 CB; Goal Line = the old 3 DL + 1 LB + 1 S + 2 CB. false = old shell for every call
const DLX2=[-LSP,LSP];   // the two linemen head-up on OL2 and the TE: OL1 (the centre) is uncovered and climbs
const DEF_FORM2={   /* [x, yards off the ball]; linebackers and safety deeper than the old shell (user) */
 bal:{dl:DLX2.map(x=>[x,DLY]),lb:[[-2.6,6.5],[2.6,6.5]],s:[[0,14]],db:[[-WSP[0]-1.4,7],[WSP[1]+1.4,7]]},
 blitz:{dl:DLX2.map(x=>[x,DLY]),lb:[[-2.2,5],[2.2,5]],s:[[0,12]],db:[[-WSP[0]-1.4,6.5],[WSP[1]+1.4,6.5]]},
 deep:{dl:DLX2.map(x=>[x,DLY]),lb:[[0,7.5]],s:[[-7,16],[7,16]],db:[[-DEEPX-.4,12],[DEEPX+.4,12]]},   // prevent: 2 DL, 1 LB, 2 safeties, 2 corners (user)
 stack:{dl:DLX2.map(x=>[x,DLY]),lb:[[-2,5],[2,5]],s:[[1.9,6.5]],db:[[-WSP[0]-1.4,6.5],[WSP[1]+1.4,6.5]]},
 spy:{dl:DLX2.map(x=>[x,DLY]),lb:[[0,6],[2.8,6.5]],s:[[0,13.5]],db:[[-WSP[0]-1.4,7],[WSP[1]+1.4,7]]}
};
const DEF_ASSIGN2={
 bal:{lb1:['cover','RB',2],lb2:['zone',0,5],s1:['cover','TE',4.5],db1:['cover','WR1',2.8],db2:['cover','WR2',2.8]},
 blitz:{lb1:['rush'],lb2:['rush'],s1:['zone',0,14],db1:['cover','WR1',2.2],db2:['cover','WR2',2.2]},
 deep:{lb1:['zone',0,8],s1:['zone',-7,17],s2:['zone',7,17],db1:['cover','WR1',6],db2:['cover','WR2',6]},
 stack:{lb1:['cover','RB',1.3],lb2:['zone',0,4],s1:['cover','TE',1.3],db1:['cover','WR1',1.5],db2:['cover','WR2',1.5]},
 spy:{lb1:['spy'],lb2:['zone',0,6],s1:['zone',0,12],db1:['cover','WR1',2.8],db2:['cover','WR2',2.8]}
};
const GEAR3D=true;   // v3.16KK1 L9: uniform options and star gear on the 3D players (false = as before)
const CHIP_T=.35,CHIP_B=.15,CL_LEAD=.6;   // TUNE v3.16JJ1: climber helps the play-side lineman this long, the help it gives that block, how far ahead of the linebacker he aims
const DEF_ASSIGN={
 bal:{lb1:['cover','RB',2],s1:['cover','TE',4.5],db1:['cover','WR1',2.8],db2:['cover','WR2',2.8]},
 blitz:{lb1:['rush'],s1:['rush'],db1:['cover','WR1',2.2],db2:['cover','WR2',2.2]},
 deep:{lb1:['zone',0,9],s1:['zone',0,17],db1:['cover','WR1',6],db2:['cover','WR2',6]},
 stack:{lb1:['cover','RB',1.3],s1:['cover','TE',1.3],db1:['cover','WR1',1.5],db2:['cover','WR2',1.5]},
 spy:{lb1:['spy'],s1:['zone',0,12],db1:['cover','WR1',2.8],db2:['cover','WR2',2.8]},
 goal:{lb1:['cover','RB',1],s1:['cover','TE',1],db1:['cover','WR1',1],db2:['cover','WR2',1]}
};

/* ============================ save ============================ */
let SAVE;
/* v2.89 SAVE PROTECTION. The save lives in street_gridiron_v1. Copies (never written over by play):
   _backup        the last save that loaded fine (written right after a good load)
   _before_update the save exactly as it was before this build first changed it (one per build)
   _failed        a save that could not be loaded (kept as it was)
   _replaced      the save that was there before a restore or a reset
   If a save exists but will not load, autosave is switched OFF (SVS.locked) and the recovery screen asks what to do. */
const SV_KEY='street_gridiron_v1',SV_BAK=SV_KEY+'_backup',SV_PRE=SV_KEY+'_before_update',SV_BAD=SV_KEY+'_failed',SV_PREV=SV_KEY+'_replaced';
const SVS={locked:false,blocked:false,raw:null,why:'',failN:0,lastOk:0,lastErr:'',warnT:0,fresh:false};
function migrateSave(s){
    if(s&&s.starters&&s.starters.QB){if(!s.uniV){const jm={0:0,1:2,2:1,3:0,4:1},pm={0:0,1:2,2:1},hm={0:0,1:1,2:2,3:2};if(s.uni){s.uni.j=jm[s.uni.j]||0;s.uni.p=pm[s.uni.p]||0;s.uni.h=hm[s.uni.h]||0}s.uniV=2}
    s.uni=Object.assign({},DEF_UNI,s.uni||{});if(s.uni.mask==='#cfd3d6'||s.uni.mask==='#ffd23a')s.uni.mask=DEF_UNI.mask;if(s.uni.hc==='#ffffff'||s.uni.hc==='#14110f')s.uni.hc=DEF_UNI.hc;if(!s.ratV){Object.keys(s.starters).forEach(k=>rescale(s.starters[k],73));s.bench=[];s.ratV=1}if(s.qbV!==2){for(const q of [...Object.values(s.starters),...(s.bench||[])])if(q&&q.pos==='QB'){q.thr=Math.max(q.thr,86);q.acc=Math.max(q.acc||0,82)}s.qbV=2}if(!s.ow)s.ow={map:'street',x:15,y:23,d:'d'};if(s.upV!==1){let pp=0;for(const id of (s.beaten||[]))pp+=id==='captain'?10:7;s.upPts=(s.upPts||0)+pp;s.upV=1}s.got=s.got||[];s.met=s.met||[];{const g=(id)=>{if(!s.got.includes(id))s.got.push(id)},U={'#38c6d9':'pharma','#7b3fd1':'bar','#ff7ac8':'bar','#f5e663':'arcade','#ffc23d':'pawn'};if(s.uni.j===1)g('noodle');if(s.uni.p===2)g('den');for(const k in s.uni){const v=String(s.uni[k]).toLowerCase();if(U[v])g(U[v])}}s.teamName=s.teamName||'Street Kings';s.settings=Object.assign({cam:'behind'},s.settings||{});return s}
  return null}
function parseSave(raw){   // raw text -> a migrated save, or throws with a plain reason
  if(typeof raw!=='string'||!raw.trim())throw new Error('the saved data is empty');
  let s;try{s=JSON.parse(raw)}catch(e){throw new Error('the saved data is damaged (not readable)')}
  const r=migrateSave(s);if(!r)throw new Error('the saved data is not a Circuit Football save');return r}
function svGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function svSet(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}
function loadSave(){
  let raw=null;
  try{raw=localStorage.getItem(SV_KEY)}catch(e){SVS.blocked=true;SVS.why='this browser is blocking saved data';return freshSave()}
  if(raw===null){SVS.fresh=true;return freshSave()}   // no save yet: a new player
  let s=null;try{s=parseSave(raw)}catch(e){SVS.why=String(e&&e.message||e)}
  if(!s){SVS.locked=true;SVS.raw=raw;svSet(SV_BAD,raw);return freshSave()}   // keep the bad save untouched; the recovery screen takes over
  setTimeout(()=>{   // after the whole game script has run (BUILD exists); uses the text exactly as it was loaded
    const pre=svGet(SV_PRE);let pb='';try{pb=JSON.parse(pre).build}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
    if(pb!==BUILD)svSet(SV_PRE,JSON.stringify({build:BUILD,at:Date.now(),raw}));
    if(svGet(SV_BAK)!==raw)svSet(SV_BAK,raw)},0);
  return s;
}
function persist(){const _t=performance.now();try{persist0()}finally{(ART.jt=ART.jt||[]).push(['persist',performance.now()-_t])}}
function persist0(){if(SVS.locked)return;   // a save that failed to load is never written over
  try{localStorage.setItem(SV_KEY,JSON.stringify(SAVE));const was=SVS.failN;SVS.failN=0;SVS.lastOk=Date.now();if(was)svNote('SAVING WORKS AGAIN','Your progress is being saved.',false)}
  catch(e){SVS.failN++;SVS.lastErr=String(e&&e.name==='QuotaExceededError'?'the device storage is full':e&&e.message||e);svFailed()}}
SAVE=loadSave();
function acquire(p,slot){
  p=JSON.parse(JSON.stringify(p));SAVE.starters[slot]=p;
  SAVE.stolen=SAVE.stolen||[];SAVE.stolen.push(p.name);persist();
}

/* ============================ state ============================ */
let G=null,F=null,PLAY=null;
const input={sx:0,sy:0,turbo:false};
const keys={};
let timeScale=1,slowT=0,shakeT=0,flashT=0;
const popups=[],parts=[];
const cam={x:CX,y:-4,zoom:1,vs:1,zv:0};
let W=390,H=700;
const cv=$('#cv');let ctx=cv.getContext('2d');
const camMode=()=>'behind';   // the side camera is gone: football is always the behind view
/* The stick is read in screen terms (right, up). In the side camera the field runs left to right, so we turn it into field directions. */
function stickWorld(){return camMode()==='side'?{x:-input.sy,y:input.sx}:{x:input.sx,y:input.sy}}

/* ============================ UI helpers ============================ */
let G_oppUniPending=null,sayTok=0,bannerExtra='',sayCur=null;
addEventListener('pointerdown',e=>{const c=sayCur,b=$('#banner');if(!c||c.tok!==sayTok||!b||!b.classList.contains('show')||performance.now()-c.t<250)return;if(e.target&&e.target.closest&&e.target.closest('#exit'))return;sayCur=null;sayTok++;b.classList.remove('show');if(c.cb)c.cb()},true);   // a tap skips the banner
function say(t,sub,ms,cb){const tok=++sayTok;sayCur={tok,cb,t:performance.now()};const b=$('#banner');b.classList.toggle('small',document.body.classList.contains('fxon'));b.innerHTML='<b>'+t+'</b>'+(sub?'<small>'+sub+'</small>':'')+(bannerExtra?'<small class="x">'+bannerExtra+'</small>':'');bannerExtra='';b.classList.add('show');
  setTimeout(()=>{if(tok!==sayTok)return;b.classList.remove('show');if(cb)cb();flushDeferredDefCall()},ms/Math.max(1,SPEED))}
function fxShow(t,col,glow){const e=$('#fx'),e2=$('#fx2');   // v3.09: the callout still showing moves up and fades (at most 2 on screen)
  if(FXQ<=0&&e2&&e.classList.contains('show')&&e.textContent&&performance.now()-(fxText.t||0)<1000){e2.textContent=e.textContent;e2.style.color=e.style.color;e2.style.setProperty('--fxs',e.style.getPropertyValue('--fxs')||'30px');e2.classList.toggle('meh',e.classList.contains('meh'));e2.classList.remove('up');void e2.offsetWidth;e2.classList.add('up')}
  fxText.t=performance.now();e.textContent=t;e.style.color=col||'#fff';e.style.setProperty('--fxg',glow||(col&&col!=='#fff'&&col!=='#ffffff'?col:'rgba(255,255,255,.35)'));
  e.style.setProperty('--fxs','30px');e.classList.remove('show');
  try{const rg=document.createRange();rg.selectNodeContents(e);const tw=rg.getBoundingClientRect().width,mw=e.getBoundingClientRect().width*.9;if(tw>mw&&tw>0)e.style.setProperty('--fxs',(30*mw/tw).toFixed(1)+'px')}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}   // a long callout shrinks to fit the screen width (measured, so it holds for any font)
  e.classList.toggle('meh',!!fxText.meh);fxText.meh=false;   /* v3.13 B5: a failure (TOO EARLY, TOO SLOW, TIRED) is small and grey */
  fxText.cur={meh:e.classList.contains('meh')};if(!fxText.meh&&!e.classList.contains('meh')){document.body.classList.add('fxon');clearTimeout(fxText.oh);fxText.oh=setTimeout(()=>document.body.classList.remove('fxon'),1120);const bn=$('#banner');if(bn&&bn.classList.contains('show'))bn.classList.add('small')}void e.offsetWidth;e.classList.add('show');clearTimeout(fxText.h);if(document.body.classList.contains('lite'))fxText.h=setTimeout(()=>e.classList.remove('show'),1120)}
const WRSTALK=true;   // v3.16X3 (OFF, user decision): true = receivers stalk-block the corners on runs. Measured: run yards +19%, safety makes 81% of run tackles
const SCHEMES=true,SCH_T=.5,SCHEME={run_in:'in',draw:'in',counter:'in',run_out:'out',power:'pow'};   // TUNE v3.16X4: run schemes; blockers keep their scheme man until SCH_T s after the handoff
const CELEB_T=1.8;   // TUNE v3.16X2: seconds the scorer celebrates (plays under the banner)
const POSES=true,STALL_T=5,FALLS=true,SETTLE_T=.6,SETTLE_D=10,CFORCE=0,FIRE_T=.25,   // v3.16Z2 (OFF): 1.3 = play-side corner shades outside the runner. Measured: runs 16.0 to 20.4 yd (coming up to the line: 26.5; with BACK_LEAD .5 too: 28.7)
FIRE_R=3.2;   // TUNE v3.16Z1: when the line meets on runs, and how far apart a pair may be
const SHOW_PTS=false;   // v3.16Y1 (user): no +600 / +1,400 point tags on the field
const FXQ=700;   // TUNE v3.16X1: ms a big callout owns the screen before the next one may replace it (0 = old behaviour: two at once)
function fxText(t,col,glow){if(/\u2605/.test(t))haptic('medium');const meh=!!fxText.meh;fxText.meh=false;const now=performance.now(),el=now-(fxText.t||0),pri=/TOUCHDOWN|HOUSE CALL|HIGHLIGHT REEL|\u2605|SAFETY|INTERCEPT|FUMBLE/.test(t);
  if(FXQ<=0||el>=FXQ||pri){fxText.q=null;clearTimeout(fxText.qh);fxText.meh=meh;fxShow(t,col,glow);return}
  if(fxText.cur&&!fxText.cur.meh&&meh)return;   // a grey failure never pushes out a success that is still up
  if(fxText.q&&!fxText.q.meh&&meh)return;
  fxText.q={t,col,glow,meh};clearTimeout(fxText.qh);fxText.qh=setTimeout(()=>{const q=fxText.q;fxText.q=null;if(q){fxText.meh=q.meh;fxShow(q.t,q.col,q.glow)}},FXQ-el)}
const SAME_P=.4,NOCHASE=.985,CREW_STYLE={cats:{press:1},kings:{press:1},rollers:{bait:1},captain:{bait:1,disguise:1,edgeHeat:1},baitdogs:{bite:1,press:1},longshore:{strong:1},gantry:{nochase:1,edgeHeat:1},closers:{strong:1,clamp:1}};const CSTY=()=>(G&&G.crew&&CREW_STYLE[G.crew.id])||{};   // TUNE v3.16EE3
const TD_FREEZE=.14;   // TUNE v3.16EE4
function a11yInit(){try{const L=(sel,a)=>{const e=document.querySelector(sel);if(e)for(const k in a)e.setAttribute(k,a[k])};   // v3.16EE4
  L('#cv',{role:'img','aria-label':'Football field'});L('#owc',{role:'img','aria-label':'Town map'});
  document.querySelectorAll('canvas').forEach(c=>{if(!c.getAttribute('aria-label'))c.setAttribute('aria-hidden','true')});
  L('#banner',{role:'status','aria-live':'polite'});L('#fx',{'aria-live':'polite'});
  if(!document.getElementById('a11yCss')){const st=document.createElement('style');st.id='a11yCss';st.textContent='button:focus-visible,[role=button]:focus-visible{outline:3px solid #ffd23a!important;outline-offset:2px}';document.head.appendChild(st)}
  if(!window.__rmDone){window.__rmDone=1;if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)document.body.classList.add('lite')}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
setTimeout(a11yInit,0);addEventListener('load',a11yInit);
const HAP={on:true,last:0};try{HAP.on=localStorage.getItem('cf_hap')!=='0'}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
function haptic(kind){if(!HAP.on)return;const n=performance.now();if(n-HAP.last<70&&kind!=='success'&&kind!=='warning')return;HAP.last=n;HAP.n=(HAP.n||0)+1;HAP.k=kind;   // v3.16EE1
  try{const C=window.Capacitor,H=C&&C.Plugins&&C.Plugins.Haptics;if(H){if(kind==='success'||kind==='warning')H.notification({type:kind.toUpperCase()});else H.impact({style:kind.toUpperCase()});return}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  try{const w=window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.haptic;if(w){w.postMessage(kind);return}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  const _HC={light:{v:12,g:[50,.18,.35]},medium:{v:22,g:[90,.4,.55]},heavy:{v:[32,24,48],g:[180,.85,.7]},ankle:{v:[14,28,22],g:[110,.35,.75]},gb:{v:[20,30,35,30,55],g:[260,.9,.9]},success:{v:[24,45,55],g:[220,.65,.85]},warning:{v:[20,40,20],g:[120,.45,.3]}};const _c=_HC[kind]||_HC.light;try{if(navigator.vibrate)navigator.vibrate(_c.v)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}try{const pads=navigator.getGamepads?navigator.getGamepads():[];for(let i=0;i<pads.length;i++){const a=pads[i]&&pads[i].vibrationActuator;if(a&&typeof a.playEffect==='function')a.playEffect('dual-rumble',{duration:_c.g[0],strongMagnitude:_c.g[1],weakMagnitude:_c.g[2]}).catch(()=>{})}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
function popup(text,x,y,col){let tp=null,bd=2.6;if(F&&F.all)for(const q of F.all){const d=Math.hypot(q.x-x,q.y-(y-1));if(d<bd){bd=d;tp=q}}popups.push({text,x,y,t:0,col:col||'#ffd23a',tp,k:tp?popups.filter(o=>o.tp===tp&&o.t<.7).length:0})}   // move labels ride on the player they belong to
function setSlow(f,s){timeScale=f;slowT=s}
const ORD=['','1st','2nd','3rd','4th'];
function spotTxt(y){y=Math.round(y);return y<50?'OWN '+y:y===50?'MIDFIELD':'OPP '+(100-y)}
function show(id,on){
  const el=$(id);
  if(id==='#hud'&&on){el.classList.remove('ui-end-render-only');el.removeAttribute('aria-hidden');el.inert=false}
  el.hidden=!on;
  if(window.emitUI)window.emitUI('ui:sync',{id,on});
  // FIRST TO is integrated into the scoreboard clock. Hide it while either
  // overlay owns the HUD header, and restore it when both overlays close.
  if(id==='#sheet'||id==='#dcall'){
    const overlayActive=(id==='#sheet'?on:!$('#sheet').hidden)|| (id==='#dcall'?on:!$('#dcall').hidden);
    $('#tgtTag').style.display=overlayActive?'none':'';
  }
}
function screens(which){['#menu','#squad','#team','#gear','#steal','#end','#world','#upg'].forEach(s=>show(s,s===which))}
const teamShort=()=>(SAVE.teamName||'YOU').toUpperCase().slice(0,8);

/* ============================ upgrades ============================ */
const UP_CAPS=[84,90,95,99];   // stat cap by town
const UP_STATS=[['spd','SPEED + COVERAGE'],['pow','STRENGTH + TACKLING'],['hnd','HANDS + BALL SKILLS'],['blk','BLOCKING + DL MOVES']];
let upTab='QB',upBack=null;
const upCost=v=>Math.max(1,1+Math.floor((v-60)/12));
/* v2.91 (user rule 2026-11-12): the stat cap comes from progress, never from the map you stand on. Beating a town's captain raises it for
   good: start 84; Netrunners beaten 90; Closers beaten 95; the Town 3 and Town 4 captains add their ids here when those towns exist. */
const CAP_CAPTAINS=['captain','closers'];
const upCapLevel=()=>1+CAP_CAPTAINS.filter(id=>((typeof SAVE!=='undefined'&&SAVE&&SAVE.beaten)||[]).includes(id)).length;
const upCap=()=>UP_CAPS[Math.min(upCapLevel(),UP_CAPS.length)-1];
let sqBack=null,sqSel={t:'s',k:'QB'},sqTab='stats';
const PRIM={QB:'QB',RB:'RB',WR:'WR1',TE:'TE',OL:'OL1'};
function openUpg(back){sqBack=back||null;renderSquad();screens('#squad')}
const sqPlayer=()=>sqSel.t==='s'?SAVE.starters[sqSel.k]:SAVE.bench[sqSel.i];
const sqNum=p=>{if(p.jn!==undefined)return p.jn;const sl=sqSel.t==='s'&&SAVE.starters[sqSel.k]===p?sqSel.k:PRIM[p.pos];return NUM[sl]||NUM[PRIM[p.pos]]||7};
function sqRedraw(){const p=sqPlayer();if(!p)return;const cv=$('#sqCv');cv._num=sqNum(p);previewFigures(cv,SAVE.uni,lookOf(p),gearOf(p),p)}
function renderSquad(){
  if(sqSel.t==='s'&&!SAVE.starters[sqSel.k])sqSel={t:'s',k:'QB'};if(sqSel.t==='b'&&!SAVE.bench[sqSel.i])sqSel={t:'s',k:'QB'};
  const cap=upCap(),pts=SAVE.upPts||0,p=sqPlayer();
  $('#sqPts').innerHTML='<span class="ui-squad-metric"><small>PTS</small><b>'+pts+'</b></span><span class="ui-squad-metric"><small>CAP</small><b>'+cap+'</b></span><span class="ui-squad-defense">DEF '+teamDef()+'</span>';
  // player strip: starters, then bench
  const st=$('#sqStrip');st.innerHTML='';
  const card=(q,tag,on,fn)=>{const b=document.createElement('button');b.className='sqc'+(on?' on':'')+(tag==='BENCH'?' bn':'');b.innerHTML='<span class="p">'+(tag==='BENCH'?q.pos:tag)+'</span><span class="o">'+ovr(q)+'</span><span class="n">'+lastName(q.name)+(q.star?' \u2605':'')+'</span><span class="t">'+(tag==='BENCH'?'BENCH':'STARTER')+'</span>';b.onclick=fn;st.appendChild(b)};
  SLOTS.forEach(k=>card(SAVE.starters[k],k,sqSel.t==='s'&&sqSel.k===k,()=>{sqSel={t:'s',k};renderSquad()}));
  SAVE.bench.forEach((q,i)=>card(q,'BENCH',sqSel.t==='b'&&sqSel.i===i,()=>{sqSel={t:'b',i};renderSquad()}));
  // header
  const hd=$('#sqHead');hd.innerHTML='<div class="pos">'+(sqSel.t==='s'?sqSel.k:p.pos)+'</div><div class="nm">'+p.name+(p.star?' <span class="star">\u2605</span>':'')+'<small>#'+sqNum(p)+' \u00b7 '+p.pos+(p.special?' \u00b7 '+SPECIALS[p.special].name:'')+'</small></div><div class="ov">'+ovr(p)+'<small>OVR \u00b7 DEF '+defOvr(p)+'</small></div>';
  if(sqSel.t==='b'){const bt=document.createElement('button');bt.textContent='START';bt.onclick=()=>{
    const slots=SLOTS.filter(s=>posOf(s)===p.pos);let weak=slots[0];for(const s of slots)if(ovr(SAVE.starters[s])<ovr(SAVE.starters[weak]))weak=s;
    const i=SAVE.bench.indexOf(p);SAVE.bench.splice(i,1,SAVE.starters[weak]);SAVE.starters[weak]=p;persist();sqSel={t:'s',k:weak};renderSquad()};hd.appendChild(bt)}
  chips($('#sqTabs'),['ATTRIBUTES','STYLE & GEAR','CAREER'],sqTab==='stats'?0:(sqTab==='career'?2:1),i=>{sqTab=['stats','look','career'][i];renderSquad()});   // v3.15: CAREER tab
  const box=$('#sqBody'),keep=box.scrollTop;box.innerHTML='';
  if(sqTab==='stats'){
    const key=POS_W[p.pos]||{},list=UP_STATS.slice();if(p.pos==='QB'){list.unshift(['acc','ACCURACY']);list.unshift(['thr','THROW POWER'])}
    list.sort((a,b)=>(key[b[0]]||0)-(key[a[0]]||0));
    for(const [k,lab] of list){
      if(p[k]===undefined&&k==='acc')p.acc=Math.round(p.thr*.9);
      const v=p[k]||0,cost=upCost(v),atCap=v>=cap,d=document.createElement('div');d.className='ustat';
      d.innerHTML='<div class="ul">'+lab+(key[k]?'<i>\u2605</i>':'')+'</div><div class="ub"><b style="width:'+clamp((v-30)/69*100,2,100)+'%"></b><u style="left:'+((cap-30)/69*100)+'%"></u></div><div class="uv">'+v+'</div>';
      const b=document.createElement('button');b.textContent=atCap?'MAX':'+2 \u00b7 '+cost;b.disabled=atCap||pts<cost;
      b.onclick=()=>{p[k]=Math.min(cap,v+2);SAVE.upPts=pts-cost;persist();SND.fx('upgrade');renderSquad()};
      d.appendChild(b);box.appendChild(d)}
  }else if(sqTab==='look'){
    const lock=()=>{if(!p.skinC)p.skinC=lookOf(p).skin};   // keep the skin tone when the name (which picked it) changes
    box.insertAdjacentHTML('beforeend','<div class="lbl">NAME</div>');
    const inp=document.createElement('input');inp.type='text';inp.maxLength=12;inp.value=p.name;inp.autocomplete='off';
    inp.oninput=()=>{const v=inp.value.replace(/[^A-Za-z0-9 .'-]/g,'').slice(0,12);if(!v.trim())return;lock();if(!p.n0)p.n0=p.name;/* v3.11: who he is never changes with his name */p.name=v;p._look=null;persist();sqRedraw();$('#sqHead .nm').firstChild.textContent=p.name;const c=$('#sqStrip .on .n');if(c)c.textContent=lastName(p.name)+(p.star?' \u2605':'')};
    inp.onblur=()=>{if(!inp.value.trim())inp.value=p.name};
    box.appendChild(inp);
    box.insertAdjacentHTML('beforeend','<div class="lbl">SKIN TONE</div>');
    const sr=document.createElement('div');sr.className='skinrow';const cur=lookOf(p).skin;
    SKIN.forEach(c=>{const b=document.createElement('button');b.style.background=c;b.className=c===cur?'on':'';b.onclick=()=>{p.skinC=c;p._look=null;persist();renderSquad()};sr.appendChild(b)});box.appendChild(sr);
    box.insertAdjacentHTML('beforeend','<div class="lbl">JERSEY NUMBER</div>');
    const nr=document.createElement('div');nr.className='numrow';
    const used=new Set(SLOTS.filter(k=>SAVE.starters[k]!==p).map(k=>sqNum(SAVE.starters[k])));
    const step=dir=>{let n=sqNum(p);for(let i=0;i<100;i++){n=(n+dir+100)%100;if(!used.has(n))break}p.jn=n;persist();renderSquad()};
    const m=document.createElement('button');m.textContent='\u2212';m.onclick=()=>step(-1);const pl=document.createElement('button');pl.textContent='+';pl.onclick=()=>step(1);const nb=document.createElement('b');nb.textContent='#'+sqNum(p);
    nr.append(m,nb,pl);box.appendChild(nr);
    /* Legacy Visor & Arm Sleeves gear tab retired */
  }else if(sqTab==='career'){csRender(box,p)   // v3.15
  }else{
    const styleBack=document.createElement('button');styleBack.className='chip';styleBack.style.cssText='width:100%;margin:2px 0 8px;border-color:#4DE1F2;color:#4DE1F2';styleBack.textContent='BACK TO STYLE';styleBack.onclick=()=>{sqTab='look';renderSquad()};box.appendChild(styleBack);
    for(const [key,lab,def] of [['visor','VISOR','#38c6d9'],['sleeve','ARM SLEEVES','#ffd23a']]){
      box.insertAdjacentHTML('beforeend','<div class="lbl">'+lab+'</div>');
      const row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:8px;margin-bottom:4px';
      const tg=document.createElement('button');tg.className='chip'+(p[key]?' on':'');tg.textContent=p[key]?'ON':'OFF';tg.style.minWidth='64px';
      tg.onclick=()=>{if(p[key])delete p[key];else p[key]=def;p._look=null;persist();renderSquad()};row.appendChild(tg);
      box.appendChild(row);
      if(p[key]){const pl=document.createElement('div');pl.className='pal';pl.style.cssText='flex:1;margin:0;grid-template-columns:repeat(9,1fr);gap:4px';row.appendChild(pl);palette(pl,p[key],c=>{p[key]=c;p._look=null;persist();renderSquad()})}
    }
    if(!ART.on&&(p.star||p.special)){const gb=document.createElement('button');gb.className='chip';gb.style.marginTop='8px';gb.textContent='EDIT GEAR';gb.onclick=()=>openGear(p);box.appendChild(gb)}
  }
  box.scrollTop=keep;
  requestAnimationFrame(sqRedraw);
}
$('#mUpg').onclick=()=>openUpg(()=>{renderMenu();screens('#menu')});
$('#uBack').onclick=()=>{if(upBack)upBack();else{renderMenu();screens('#menu')}};

/* ============================ menu / squad ============================ */
function renderMenu(){
  saveMenuLine();
  {const L=SND.load,bl=$('#mBuild');if(L&&L.total&&bl){let e=$('#mSnd');if(!e){e=document.createElement('div');e.id='mSnd';e.className='note';e.style.cssText='margin-top:4px;font-size:12px;opacity:.75';bl.after(e)}   // v2.92: sound files status (only when the sounds are separate files)
    const done=L.ok+L.fail;e.style.color=L.fail?'#ffd23a':'';e.textContent='Sound files: '+L.ok+' of '+L.total+' loaded'+(done<L.total?' (still loading)':' in '+((L.t1-L.t0)/1000).toFixed(1)+' s')+(L.fail?'. '+L.fail+' did not load and stay silent: '+L.bad.join(', '):'')}}
  {const hb=$('#mHap');if(hb)hb.textContent='HAPTICS: '+(HAP.on?'ON':'OFF')}{const b=$('#mRO');if(b)b.textContent='FPS COUNTER: '+(window.sgRO?'ON':'OFF');const p=$('#mPL');if(p)p.textContent='PERF LOG: '+(PL.on?'ON':'OFF');const rs=$('#mRS');if(rs)rs.textContent='RESOLUTION: '+RES[RESI].n;const l=$('#mLT');if(l)l.textContent='LITE EFFECTS: '+(document.body.classList.contains('lite')?'ON':'OFF')}
  {const rc=$('#mRC');if(rc&&window.RUNCAM)rc.textContent='RUNNER CAMERA: '+(RUNCAM.on?'ON':'OFF')}   // v3.06
  {const old=$('#mNext');if(old)old.remove();const nx=nxBox(true);const sub=document.querySelector('#menu .sub');if(nx&&sub){nx.id='mNext';sub.after(nx)}}   // v2.99: next unlock signpost
  const box=$('#crewList');box.innerHTML='';
  CREWS.forEach((c,i)=>{
    const unlocked=c.captain?CREWS.slice(0,3).every(x=>SAVE.beaten.includes(x.id)):(i===0||SAVE.beaten.includes(CREWS[i-1].id));
    const done=SAVE.beaten.includes(c.id);
    const b=document.createElement('button');b.className='crew';b.style.setProperty('--c',c.col);b.disabled=!unlocked;
    b.innerHTML='<b>'+c.name+(c.captain?' \u2605':'')+'</b><div class="meta"><span>'+(c.captain?'CAPTAIN':'CREW '+(i+1)+' \u00b7 '+c.boss.toUpperCase())+' \u00b7 FIRST TO '+c.target+'</span><span class="done">'+(done?'BEATEN \u2713':(unlocked?'':'LOCKED'))+'</span></div><div class="scout">'+(unlocked?c.scout:'Beat all three crews first.')+'</div>';
    b.onclick=()=>startMatch(c);box.appendChild(b);
  });
  $('#mCam').textContent='CAMERA: '+SAVE.settings.cam.toUpperCase();
  {const c=SAVE.settings.snd||(SAVE.settings.snd={mus:1,sfx:1,vol:.8});$('#mMus').textContent='MUSIC: '+(c.mus?'ON':'OFF');$('#mSfx').textContent='EFFECTS: '+(c.sfx?'ON':'OFF');$('#mVol').value=Math.round(c.vol*100)}
}
$('#mSquad').onclick=()=>{sqBack=null;renderSquad();screens('#squad')};
$('#sBack').onclick=()=>{if(sqBack){const f=sqBack;sqBack=null;f()}else if(owClub){owClub=false;owShow()}else{renderMenu();screens('#menu')}};
$('#mTown').onclick=()=>owShow();
$('#mMus').onclick=()=>{const c=SAVE.settings.snd||(SAVE.settings.snd={mus:1,sfx:1,vol:.8});c.mus=c.mus?0:1;persist();SND.applyCfg();renderMenu()};
$('#mPL').onclick=()=>{PL.set(!PL.on);renderMenu()};$('#mHap').onclick=()=>{HAP.on=!HAP.on;try{localStorage.setItem('cf_hap',HAP.on?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}if(HAP.on)haptic('medium');renderMenu()};$('#mPR').onclick=()=>PL.show();$('#mRS').onclick=()=>{RESI=(RESI+1)%RES.length;try{localStorage.setItem('sg_res',RESI)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}resize();BK.cur=null;BKF.cur=null;SKYk='';renderMenu()};$('#mLT').onclick=()=>{document.body.classList.toggle('lite');renderMenu()};
$('#mRO').onclick=()=>{if(window.sgReadout)window.sgReadout(!window.sgRO);renderMenu()};
$('#mSfx').onclick=()=>{const c=SAVE.settings.snd||(SAVE.settings.snd={mus:1,sfx:1,vol:.8});c.sfx=c.sfx?0:1;persist();SND.applyCfg();renderMenu()};
$('#mVol').oninput=e=>{const c=SAVE.settings.snd||(SAVE.settings.snd={mus:1,sfx:1,vol:.8});c.vol=e.target.value/100;SND.applyCfg()};
$('#mVol').onchange=()=>{persist();SND.fx('ui')};
$('#mCam').onclick=()=>{SAVE.settings.cam=SAVE.settings.cam==='behind'?'side':'behind';persist();renderMenu()};

let resetArm=0;
/* ---- playtest: build label + feedback form ---- */
const BUILD='TEST BUILD ROUTE 2 START (v3.41T VAPOR TOWNSFOLK TYPES)';window.CF_TEST=true;
{const bl=$('#mBuild');if(bl)bl.textContent=BUILD;
 let rate=0;const rt=$('#fbRate');[1,2,3,4,5].forEach(n=>{const b=document.createElement('button');b.className='btn';b.style.minWidth='0';b.textContent=n;b.onclick=()=>{rate=n;[...rt.children].forEach(c=>{const on=+c.textContent===n;c.style.background=on?'#27e0ff':'';c.style.color=on?'#000':''})};rt.appendChild(b)});
 $('#mFb').onclick=()=>{$('#fb').hidden=false;$('#fbMsg').textContent=''};
 $('#fbClose').onclick=()=>{$('#fb').hidden=true};
 $('#fbCopy').onclick=()=>{
  const sv=SAVE||{},txt=['CIRCUIT FOOTBALL FEEDBACK','Build: '+BUILD,'Device: '+navigator.userAgent,'Screen: '+innerWidth+'x'+innerHeight+' @'+(window.devicePixelRatio||1)+'x',
   'Progress: crews beaten='+((sv.beaten||[]).join(',')||'none')+'; upgrade pts='+(sv.upPts||0)+'; sound='+JSON.stringify((sv.settings||{}).snd||{}),'',
   'Errors caught: '+((typeof CG!=='undefined'&&CG.log.length)?CG.log.slice(-3).map(x=>x.msg+' ['+x.where+'] x'+x.count).join('; '):'none'),'',
   'Doing: '+$('#fbDo').value,'Went wrong: '+$('#fbBad').value,'Fun/great: '+$('#fbGood').value,'Fun rating: '+(rate||'-')+'/5'].join('\n');
  const ok=()=>{$('#fbMsg').textContent='Copied! Now paste it into a message to the developer.'},fail=()=>{const t=document.createElement('textarea');t.value=txt;t.style.cssText='position:fixed;left:0;top:0;opacity:0';document.body.appendChild(t);t.focus();t.select();let g=false;try{g=document.execCommand('copy')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}t.remove();if(g)ok();else{$('#fbMsg').style.color='#ffd23a';$('#fbMsg').textContent='Could not copy. Please screenshot this screen instead.'}};
  try{navigator.clipboard.writeText(txt).then(ok,fail)}catch(e){fail()}}}
$('#mReset').onclick=e=>{const n=Date.now();if(n-resetArm<2500){svSet(SV_PREV,JSON.stringify(SAVE));try{localStorage.removeItem(SV_KEY)}catch(err){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn('reset',err)}SAVE=freshSave();persist();renderMenu();e.target.textContent='RESET PROGRESS';if(typeof owShow==='function')owShow()}else{resetArm=n;e.target.textContent='TAP AGAIN TO WIPE'}};

/* ============================ team + gear editors ============================ */
let teamSlot='jc',gearSlot='sc',gearPlayer=null;
function chips(box,names,cur,fn,ok){box.innerHTML='';names.forEach((n,i)=>{const lk=ok&&!ok(i),b=document.createElement('button');b.className='chip'+(i===cur?' on':'')+(lk?' locked':'');b.textContent=lk?'\ud83d\udd12 '+n:n;b.onclick=()=>{if(lk){b.textContent='Earn it in '+(i>=3?'Hale Harbor':'Vapor City');return}fn(i)};box.appendChild(b)})}
function palette(box,cur,fn,ok){box.innerHTML='';PAL.forEach(c=>{const lk=ok&&!ok(c),b=document.createElement('button');b.style.background=c;let cl=c.toLowerCase()===String(cur).toLowerCase()?'on':'';if(lk){cl+=' locked';b.textContent='\ud83d\udd12'}b.className=cl;b.onclick=()=>{if(!lk)fn(c)};box.appendChild(b)})}
function slotButtons(box,defs,obj,sel,fn){box.innerHTML='';defs.forEach(([k,n])=>{const b=document.createElement('button');b.className='slot'+(k===sel?' on':'');b.innerHTML='<i style="background:'+obj[k]+'"></i>'+n;b.onclick=()=>fn(k);box.appendChild(b)})}
function renderTeam(){
  const u=SAVE.uni;
  // Keep team identity controls paired as one save-backed editor group.
  let identity=$('#team .ui-team-identity');
  if(!identity){const labels=[...document.querySelectorAll('#team > .lbl')],nameLabel=labels.find(e=>e.textContent.trim()==='TEAM NAME'),logoLabel=labels.find(e=>e.textContent.trim()==='TEAM LOGO'),nameInput=$('#tName'),logoRow=$('#tLogoBtn')?.closest('.lprev');if(nameLabel&&logoLabel&&nameInput&&logoRow){identity=document.createElement('section');identity.className='ui-team-identity';nameLabel.before(identity);nameLabel.dataset.uiRole='team-name-label';logoLabel.dataset.uiRole='team-logo-label';identity.append(nameLabel,nameInput,logoLabel,logoRow)}}
  $('#tName').value=SAVE.teamName;
  chips($('#tJersey'),JERSEY_NAMES,u.j,i=>{u.j=i;persist();renderTeam()},unlJ);
  chips($('#tPants'),PANTS_NAMES,u.p,i=>{u.p=i;persist();renderTeam()},unlP);
  slotButtons($('#tSlots'),UNI_SLOTS,u,teamSlot,k=>{teamSlot=k;renderTeam()});
  palette($('#tPal'),u[teamSlot],c=>{u[teamSlot]=c;persist();renderTeam()},unlC);
  for(const id of['#tJersey','#tPants']){const e=$(id);e.hidden=false;if(e.previousElementSibling)e.previousElementSibling.hidden=false}   // jersey and pants style do nothing with the new art, so they are hidden (the saved choice is kept)
  previewFigures($('#tPrev'),u,lookOf({name:'Preview WR',pos:'WR'}),null);renderLogoPick();goalsTeamRow();   // v3.15 run trail picker
}
$('#tName').addEventListener('input',e=>{SAVE.teamName=e.target.value.slice(0,14)||'Street Kings';persist()});
$('#mTeam').onclick=()=>{renderTeam();screens('#team')};
$('#tBack').onclick=()=>{if(owClub){owClub=false;owShow()}else{renderMenu();screens('#menu')}};
function openGear(p){gearPlayer=p;gearOf(p);renderGear();screens('#gear')}
function renderGear(){
  const p=gearPlayer,g=gearOf(p);$('#gTitle').textContent=p.name.toUpperCase();
  const tg=$('#gToggles');tg.innerHTML='';
  [['sleeves','Arm Sleeves'],['visor','Visor'],['gloves','Gloves']].forEach(([k,n])=>{const b=document.createElement('button');b.className='chip'+(g[k]?' on':'');b.textContent=n+(g[k]?': ON':': OFF');b.onclick=()=>{g[k]=!g[k];persist();renderGear()};tg.appendChild(b)});
  slotButtons($('#gSlots'),GEAR_SLOTS,g,gearSlot,k=>{gearSlot=k;renderGear()});
  palette($('#gPal'),g[gearSlot],c=>{g[gearSlot]=c;persist();renderGear()});
  for(const id of['#gToggles','#gSlots','#gPal']){const e=$(id),hid=ART.on&&!GEAR3D;e.hidden=hid;if(e.previousElementSibling&&e.previousElementSibling.classList.contains('lbl'))e.previousElementSibling.hidden=hid}   // sleeves, visor and glove colors do nothing with the new art
  previewFigures($('#gPrev'),SAVE.uni,lookOf(p),g,p);
}
$('#gBack').onclick=()=>{renderSquad();screens('#squad')};
function previewFigures(cvs,uni,look,gear,pl,_try){const _m0=ART.miss;
  {const d=pl||{name:'Preview WR',pos:'WR'},n=cvs._num!==undefined?cvs._num:81;let ok=false;try{ok=P3D.preview(cvs,[{d,uni,num:n,yaw:.4,x:.3},{d,uni,num:n,yaw:Math.PI-.4,x:.7}])}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}if(ok)return}   // v3.02: the 3D player, front and back (2D if 3D is off)
  if(ART.on){let rdy=true;for(const lk of(Array.isArray(look)?look:[look])){const pal=artPal(uni,lk.skin,lk);if(!artMaster(pal,'f'))rdy=false;if(!artMaster(pal,'b'))rdy=false}
    if(!rdy){if((_try||0)<80)setTimeout(()=>{if(cvs.isConnected&&cvs.offsetParent)previewFigures(cvs,uni,look,gear,pl,(_try||0)+1)},60);return}}   // wait for the new art to decode and keep the last picture on screen: never draw the old figure in its place
  const r=cvs.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2.5);
  const w=Math.max(200,Math.round((r.width||340))),h=Math.round(r.height||215);
  if(cvs.width!==Math.round(w*dpr)||cvs.height!==Math.round(h*dpr)){cvs.width=Math.round(w*dpr);cvs.height=Math.round(h*dpr)}
  const g=cvs.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
  const S=Math.min((h-(ART.on?48:30))/16.6,w/23);   // the new art is a little taller than the old figure, so it needs a bit more headroom
  const lks=Array.isArray(look)?look:[look,look,look];
  const views=[['f',.3],['b',.7]];
  views.forEach(([v,fx],i)=>{const lk=lks[i];
    renderPerson(g,{art:true,x:w*fx,y:h-24,S:S*(lk.h||1),view:v,flip:1,speed:0,phi:0,cx:0,sa:0,uni,look:lk,gear,num:cvs._num!==undefined?cvs._num:([7,22,81,66][i]||7),star:!!gear,t:0,hasBall:false,preview:true,tname:SAVE.teamName,lname:(pl&&pl.name)?lastName(pl.name):null});
  });
  if(ART.on&&ART.miss>_m0&&(_try||0)<40)setTimeout(()=>{if(cvs.isConnected&&cvs.offsetParent)previewFigures(cvs,uni,look,gear,pl,(_try||0)+1)},100);   // the art decodes async the first time: redraw the preview until the real sprites are in
}
/* ============ v2.89 SAVE SCREENS: save-failed notice, SAVE CODE (export + restore), recovery screen when a save will not load ============ */
// Save code = 'CF1-' + base64 of the save text + '-' + 8-digit check. Base64 so Notes or a message app cannot change quotes; the check catches a cut-off copy.
function svHash(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return ('0000000'+h.toString(16)).slice(-8)}
function svEncode(raw){const by=new TextEncoder().encode(raw);let bin='';for(let i=0;i<by.length;i+=8192)bin+=String.fromCharCode.apply(null,by.subarray(i,i+8192));const b=btoa(bin);return 'CF1-'+b+'-'+svHash(b)}
function svDecode(code){
  code=String(code||'').replace(/\s+/g,'');
  if(!code)throw new Error('nothing was pasted');
  if(code[0]==='{')return code;   // plain save text also works
  const m=/^CF1-([A-Za-z0-9+/=]+)-([0-9a-f]{8})$/.exec(code);
  if(!m)throw new Error(code.slice(0,4)==='CF1-'?'the code is cut off or changed. Copy the whole code again':'that is not a save code (a save code starts with CF1-)');
  if(svHash(m[1])!==m[2])throw new Error('the code is cut off or changed. Copy the whole code again');
  const bin=atob(m[1]),by=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)by[i]=bin.charCodeAt(i);
  return new TextDecoder().decode(by)}
function svSummary(s){const b=(s.beaten||[]).length;return '"'+(s.teamName||'Street Kings')+'": '+b+' crew'+(b===1?'':'s')+' beaten, '+(s.upPts||0)+' upgrade points'}
function svAgo(t){if(!t)return 'not yet';const s=Math.round((Date.now()-t)/1000);return s<60?s+' s ago':Math.round(s/60)+' min ago'}
function svCopyText(txt,msgEl,okText){
  const ok=()=>{msgEl.style.color='#58ffb0';msgEl.textContent=okText},
   fail=()=>{const t=document.createElement('textarea');t.value=txt;t.style.cssText='position:fixed;left:0;top:0;opacity:0';document.body.appendChild(t);t.focus();t.select();let g=false;try{g=document.execCommand('copy')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}t.remove();if(g)ok();else{msgEl.style.color='#ffd23a';msgEl.textContent='Could not copy. Press and hold the code above, then Select All and Copy.'}};
  try{navigator.clipboard.writeText(txt).then(ok,fail)}catch(e){fail()}}
function svNote(title,sub,bad){const e=$('#svToast');if(!e)return;$('#svToastT').textContent=title;$('#svToastS').textContent=sub||'';e.style.borderColor=bad?'#ffd23a':'#58ffb0';e.style.opacity=1;
  clearTimeout(svNote.t);svNote.t=setTimeout(()=>{e.style.opacity=0},bad?6000:3000)}
setTimeout(()=>{
  const b=document.getElementById('svCopyLink');
  if(b&&!b._wired){b._wired=1;b.addEventListener('click',()=>{
    const out=document.getElementById('svOut'),msg=document.getElementById('svMsg');
    if(!out||!out.value)return;
    const url=location.origin+location.pathname+'?save='+encodeURIComponent(out.value.trim());
    svCopyText(url,msg,'SAVE LINK COPIED — OPEN ON ANY DEVICE TO RESTORE');
  })}
  try{
    const sp=new URLSearchParams(location.search).get('save');
    if(sp&&!window.__svUrlHandled){
      window.__svUrlHandled=1;
      const inp=document.getElementById('svIn'),pnl=document.getElementById('svPanel'),msg=document.getElementById('svMsg');
      if(inp&&pnl){inp.value=sp;pnl.hidden=false;if(msg){msg.style.color='#ffd23a';msg.textContent='SAVE LINK DETECTED — TAP RESTORE THIS CODE TO LOAD'}if(history&&history.replaceState)history.replaceState(null,'',location.pathname)}
    }
  }catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn('saveLink',e)}
},350);
function svFailed(){const n=Date.now(),gap=SVS.blocked?300000:60000;if(n-SVS.warnT<gap)return;SVS.warnT=n;
  svNote('PROGRESS NOT SAVED','Saving failed: '+SVS.lastErr+'. Open MENU, then SAVE CODE, to copy your progress.',true);saveMenuLine()}
function saveMenuLine(){const e=$('#mSaveSt');if(!e)return;
  if(SVS.blocked){e.style.color='#ffd23a';e.textContent='Saving is OFF: this browser is blocking saved data. Use SAVE CODE to keep your progress.';return}
  if(SVS.failN){e.style.color='#ffd23a';e.textContent='SAVING FAILED ('+SVS.lastErr+'). Last good save: '+svAgo(SVS.lastOk)+'. Copy your SAVE CODE now.';return}
  e.style.color='';e.textContent='Progress saved '+svAgo(SVS.lastOk)+'.'}
// write a new save text and restart the game on it. Autosave is switched off first so nothing can write over it before the restart.
function svInstall(raw,msgEl){
  SVS.locked=true;
  if(!svSet(SV_KEY,raw)||svGet(SV_KEY)!==raw){msgEl.style.color='#ffd23a';msgEl.textContent='Could not write the save on this device. Nothing was changed.';SVS.locked=!!SVS.raw;return false}
  msgEl.style.color='#58ffb0';msgEl.textContent='Restored. Restarting the game...';
  setTimeout(()=>{try{location.reload()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}},300);
  setTimeout(()=>{msgEl.textContent='Restored. Close the game and open it again to keep playing.'},2500);
  return true}

// ---- MENU > SAVE CODE ----
{let arm=0,armRaw=null;
 $('#mSave').onclick=()=>{let code='';try{code=svEncode(JSON.stringify(SAVE))}catch(e){code=''}
   $('#svOut').value=code;$('#svIn').value='';$('#svMsg').textContent='';arm=0;$('#svRest').textContent='RESTORE THIS CODE';
   const st=$('#svStat');if(SVS.blocked||SVS.failN){st.style.color='#ffd23a';st.textContent=SVS.blocked?'Saving is OFF in this browser. Copy this code to keep your progress.':'Saving is failing ('+SVS.lastErr+'). Copy this code now.'}
   else{st.style.color='';st.textContent='Progress saved '+svAgo(SVS.lastOk)+'. '+svSummary(SAVE)+'.'}
   $('#svPanel').hidden=false};
 $('#svClose').onclick=()=>{$('#svPanel').hidden=true;saveMenuLine()};
 $('#svCopy').onclick=()=>svCopyText($('#svOut').value,$('#svMsg'),'Copied! Paste it into Notes or a message to yourself.');
 $('#svIn').oninput=()=>{arm=0;$('#svRest').textContent='RESTORE THIS CODE'};
 $('#svRest').onclick=()=>{const msg=$('#svMsg');let raw,s;
   try{raw=svDecode($('#svIn').value);s=parseSave(raw)}catch(e){msg.style.color='#ffd23a';msg.textContent='Not restored: '+String(e&&e.message||e)+'. Nothing was changed.';arm=0;return}
   if(!arm||Date.now()-arm>8000||armRaw!==raw){arm=Date.now();armRaw=raw;$('#svRest').textContent='TAP AGAIN TO REPLACE';msg.style.color='#ffd23a';
     msg.textContent='This code holds '+svSummary(s)+'. It will REPLACE your current progress ('+svSummary(SAVE)+'). Tap again to confirm.';return}
   svSet(SV_PREV,JSON.stringify(SAVE));   // the progress being replaced is kept
   svInstall(raw,msg)}}

// ---- RECOVERY SCREEN (a save exists but will not load) ----
function svFixShow(){
  const why=$('#svFixWhy');why.textContent='Reason: '+(SVS.why||'unknown')+'.';
  let bak=null,bs=null;{const r=svGet(SV_BAK);if(r&&r!==SVS.raw){try{bs=parseSave(r);bak=r}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}}
  const bb=$('#svFixBak'),bi=$('#svFixBakInfo');
  if(bak){bb.hidden=false;bi.textContent='Backup from the last time the game opened: '+svSummary(bs)+'.'}
  else{bb.hidden=true;bi.textContent='There is no working backup on this device.'}
  const msg=$('#svFixMsg');let armNew=0;
  bb.onclick=()=>{svInstall(bak,msg)};
  $('#svFixCopy').onclick=()=>svCopyText(SVS.raw,msg,'Copied the broken save. Paste it into a message to the developer.');
  $('#svFixPaste').onclick=()=>{$('#svFixPasteBox').hidden=false;$('#svFixCode').focus()};
  $('#svFixLoad').onclick=()=>{let raw;try{raw=svDecode($('#svFixCode').value);parseSave(raw)}catch(e){msg.style.color='#ffd23a';msg.textContent='Not loaded: '+String(e&&e.message||e)+'.';return}
    svInstall(raw,msg)};
  $('#svFixNew').onclick=e=>{if(!armNew||Date.now()-armNew>4000){armNew=Date.now();e.target.textContent='TAP AGAIN TO START OVER';return}
    if(svGet(SV_BAD)!==SVS.raw&&!svSet(SV_BAD,SVS.raw)){msg.style.color='#ffd23a';msg.textContent='Could not keep a copy of the broken save, so it was not replaced. Copy it first.';return}
    try{localStorage.removeItem(SV_KEY)}catch(e){msg.style.color='#ffd23a';msg.textContent='Could not clear the broken save on this device.';return}
    msg.style.color='#58ffb0';msg.textContent='Starting a new game...';setTimeout(()=>{try{location.reload()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}},300)};
  $('#svFix').hidden=false}
if(SVS.locked)svFixShow();
else if(SVS.blocked)setTimeout(()=>svNote('SAVING IS OFF','This browser is blocking saved data, so progress will be lost when the game closes.',true),1500);

