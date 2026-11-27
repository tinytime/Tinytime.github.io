/* ============ 3D PLAYERS v3 "ONE BODY" (v3.12T) ============
   Players in a match are drawn as small 3D figures (Three.js r158 from cdn.jsdelivr.net, unpkg.com as backup) instead of the 2D sprites.
   v3.12: each figure is now ONE smooth skinned body (made in Blender, review rounds 3-6, approved in CF_33) instead of 44 stacked shapes.
   - Three builds share every vertex: lean (WR, DB), mid (QB, RB, LB, TE), heavy (OL, DL). 11 bones, the same joints the pose code always moved.
   - Colours come from 9 slots per figure (jersey, pants, skin, helmet, facemask, socks, shoes, gloves, trim); jersey numbers are painted on
     the front and back panels from the 00-99 atlas. Normals are worked out here (hard at shoes and gloves).
   - About one draw call per player plus the ball and the outline pass. Positions, sizes, draw order, foot pinning, fall, preview,
     the PLAYERS 3D/2D menu switch and the fall-back to 2D on any error all work as before.
   - Dropped with the new body: visor, towel, wristbands, bicep bands, pant stripes and the tank / long-sleeve jersey looks.
   Model data below: base64 of cf_body_v6.bin (55,716 bytes; see CF_34). */
  const P3D_MODEL=window.P3D_MODEL;
/* ============ v3.28T KAYKIT MODEL LIBRARY (CF_85 Build 1). KayKit by Kay Lousberg (CC0): every body (Mannequin_Medium, Mannequin_Large,
   the six Adventurers) and all 159 animation clips live in 22 data files BESIDE the page (models/kk_*.txt, base64, a fingerprint in each name),
   like the sound files. They load in the background (3 at a time, 3 tries each) and are checked against their fingerprints.
   Anything missing -> the match players stay the classic figures; nothing else changes. MENU: "Model files: N of N loaded". ============ */
const KKLIB=window.KKLIB=(()=>{
  const MAN={"v":1,"bodies":[{"name":"mannequin_medium","rig":"Medium","file":"kk_mannequin_medium.67ef892f.txt","bytes":216548,"sha256":"67ef892f3e6fcec602adf089264a5eb88263509139d05359048116c5fdc0679e"},{"name":"mannequin_large","rig":"Large","file":"kk_mannequin_large.f5e652a0.txt","bytes":275920,"sha256":"f5e652a05e0d2ef615ab52e53e37ee0a916072facdcd11d853bc8d9877ed5ed2"},{"name":"barbarian","rig":"Medium","file":"kk_barbarian.ebfa6c96.txt","bytes":190732,"sha256":"ebfa6c960156123644a9b7d7d585157867cdc1eb0187b6397f164ad43f6b3342"},{"name":"knight","rig":"Medium","file":"kk_knight.200e5dd4.txt","bytes":166222,"sha256":"200e5dd49a0761abac513706af3bee6cc3b70baf0c931ca7bbd1948bc7707df4"},{"name":"mage","rig":"Medium","file":"kk_mage.2d68fb69.txt","bytes":175112,"sha256":"2d68fb69400c8c53c34f6e4c3c83cf206b68634474c26c4fc24bfbb7841dcfd2"},{"name":"ranger","rig":"Medium","file":"kk_ranger.3e3998c5.txt","bytes":235616,"sha256":"3e3998c5867504a34d01cebd6288e873b7f88e7bd0d998a7a8da5ef2ed2a2ba5"},{"name":"rogue","rig":"Medium","file":"kk_rogue.0c3f825f.txt","bytes":201742,"sha256":"0c3f825f30dc6c3dec672442ee157041143c07011e9f7e4533c7be02f44e0ace"},{"name":"rogue_hooded","rig":"Medium","file":"kk_rogue_hooded.20f3504d.txt","bytes":188886,"sha256":"20f3504d51866f76a6b318f2e5bb447f465b7cb9389b69418c531faea131f120"}],"clips":[{"name":"large_combatmelee","rig":"Large","file":"kk_large_combatmelee.cf16ddfd.txt","bytes":117932,"sha256":"cf16ddfdbb927e2a1a246ae4565d5183d1a8bdbf61ad2b04c34e0b6f09c01f85","clips":["Melee_1H_Slash","Melee_1H_Stab","Melee_2H_Attack","Melee_2H_Idle","Melee_2H_Slam","Melee_Block","Melee_Block_Attack","Melee_Block_Hit","Melee_Blocking","Melee_Dualwield_Slash","Melee_Dualwield_SlashCombo","Melee_Unarmed_Idle","Melee_Unarmed_Kick","Melee_Unarmed_Punch","Melee_Unarmed_Smash"]},{"name":"large_general","rig":"Large","file":"kk_large_general.f913b3f6.txt","bytes":25070,"sha256":"f913b3f6ea10ab24e9010796ba6b8ba829da60b9af0577f5070879bc70a093bf","clips":["Death_A","Death_A_Pose","Hit_A","Idle_A","Idle_B"]},{"name":"large_movementadvanced","rig":"Large","file":"kk_large_movementadvanced.a87121f1.txt","bytes":10180,"sha256":"a87121f1e5887932692a9a939a8e0833d17428a3d9777c3104863330661f1602","clips":["Dodge_Backwards","Dodge_Forward","Dodge_Left","Dodge_Right"]},{"name":"large_movementbasic","rig":"Large","file":"kk_large_movementbasic.d2735a68.txt","bytes":13904,"sha256":"d2735a68f4b81d38acfd5e3e327166b95bf52c5a22e422c949e3dfb0f802f128","clips":["Running_A","Walking_A"]},{"name":"large_simulation","rig":"Large","file":"kk_large_simulation.1ccedd2c.txt","bytes":13692,"sha256":"1ccedd2cb2e4fb5e3128e78154258069c0d17d730735e87b4d1e7066ca4f3da5","clips":["Flexing"]},{"name":"large_special","rig":"Large","file":"kk_large_special.0f9e2a9e.txt","bytes":6938,"sha256":"0f9e2a9e6b739e1d748630d94c6f287163fe374e0ddad94b812dd987a0cfda4f","clips":["EXPERIMENTAL_Large_Transform"]},{"name":"medium_combatmelee","rig":"Medium","file":"kk_medium_combatmelee.b14b7cad.txt","bytes":124296,"sha256":"b14b7cad8131e87e4a60bc88795f55b7215e27fa311ce7f0bd485ea2d44c6ce7","clips":["Melee_1H_Attack_Chop","Melee_1H_Attack_Jump_Chop","Melee_1H_Attack_Slice_Diagonal","Melee_1H_Attack_Slice_Horizontal","Melee_1H_Attack_Stab","Melee_2H_Attack_Chop","Melee_2H_Attack_Slice","Melee_2H_Attack_Spin","Melee_2H_Attack_Spinning","Melee_2H_Attack_Stab","Melee_2H_Idle","Melee_Block","Melee_Block_Attack","Melee_Block_Hit","Melee_Blocking","Melee_Dualwield_Attack_Chop","Melee_Dualwield_Attack_Slice","Melee_Dualwield_Attack_Stab","Melee_Unarmed_Attack_Kick","Melee_Unarmed_Attack_Punch_A","Melee_Unarmed_Idle"]},{"name":"medium_combatranged","rig":"Medium","file":"kk_medium_combatranged.3b5010d7.txt","bytes":113670,"sha256":"3b5010d73570b4cd5176809f79df2e60c575df929ba052b5145f6d308b7842a7","clips":["Ranged_1H_Aiming","Ranged_1H_Reload","Ranged_1H_Shoot","Ranged_1H_Shooting","Ranged_2H_Aiming","Ranged_2H_Reload","Ranged_2H_Shoot","Ranged_2H_Shooting","Ranged_Bow_Aiming_Idle","Ranged_Bow_Draw","Ranged_Bow_Draw_Up","Ranged_Bow_Idle","Ranged_Bow_Release","Ranged_Bow_Release_Up","Ranged_Magic_Raise","Ranged_Magic_Shoot","Ranged_Magic_Spellcasting","Ranged_Magic_Spellcasting_Long","Ranged_Magic_Summon"]},{"name":"medium_general","rig":"Medium","file":"kk_medium_general.5e322bc5.txt","bytes":76902,"sha256":"5e322bc5f663d5c068cd1a85703e571f4670dd70e6388677509f7c95f88bb3f8","clips":["Death_A","Death_A_Pose","Death_B","Death_B_Pose","Hit_A","Hit_B","Idle_A","Idle_B","Interact","PickUp","Spawn_Air","Spawn_Ground","Throw","Use_Item"]},{"name":"medium_movementadvanced","rig":"Medium","file":"kk_medium_movementadvanced.13f2997d.txt","bytes":62496,"sha256":"13f2997d9b5721130b2954d842f1c3d4898099f9bfce54fc33ae54d87d8b8091","clips":["Crawling","Crouching","Dodge_Backward","Dodge_Forward","Dodge_Left","Dodge_Right","Running_HoldingBow","Running_HoldingRifle","Running_Strafe_Left","Running_Strafe_Right","Sneaking","Walking_Backwards"]},{"name":"medium_movementbasic","rig":"Medium","file":"kk_medium_movementbasic.692d0276.txt","bytes":54714,"sha256":"692d0276a608b660ab2fb19fcac2ca7850bae7984c967535f430cfb1adc61f19","clips":["Jump_Full_Long","Jump_Full_Short","Jump_Idle","Jump_Land","Jump_Start","Running_A","Running_B","Walking_A","Walking_B","Walking_C"]},{"name":"medium_simulation","rig":"Medium","file":"kk_medium_simulation.43d00815.txt","bytes":80854,"sha256":"43d008154465dd58796b44e3617ca76b253438258ec5c845ac0227e8a9ef1577","clips":["Cheering","Lie_Down","Lie_Idle","Lie_StandUp","Push_Ups","Sit_Chair_Down","Sit_Chair_Idle","Sit_Chair_StandUp","Sit_Floor_Down","Sit_Floor_Idle","Sit_Floor_StandUp","Sit_Ups","Waving"]},{"name":"medium_special","rig":"Medium","file":"kk_medium_special.952c7e89.txt","bytes":125380,"sha256":"952c7e896a1dba6d4297751679859a07a539cd8d424e2fbdb0a5ef67c11cf0d3","clips":["EXPERIMENTAL_Medium_Transform","Skeletons_Awaken_Floor","Skeletons_Awaken_Floor_Long","Skeletons_Awaken_Standing","Skeletons_Death","Skeletons_Death_Pose","Skeletons_Death_Resurrect","Skeletons_Idle","Skeletons_Inactive_Floor_Pose","Skeletons_Inactive_Standing_Pose","Skeletons_Spawn_Ground","Skeletons_Taunt","Skeletons_Taunt_Longer","Skeletons_Walking"]},{"name":"medium_tools","rig":"Medium","file":"kk_medium_tools.08fd16b9.txt","bytes":221634,"sha256":"08fd16b9c8a3b436f5079a3077f563bdd3aeb1f883a321cf36050a54ca077637","clips":["Chop","Chopping","Dig","Digging","Fishing_Bite","Fishing_Cast","Fishing_Catch","Fishing_Idle","Fishing_Reeling","Fishing_Struggling","Fishing_Tug","Hammer","Hammering","Holding_A","Holding_B","Holding_C","Lockpick","Lockpicking","Pickaxe","Pickaxing","Saw","Sawing","Work_A","Work_B","Work_C","Working_A","Working_B","Working_C"]}]};
  const all=MAN.bodies.concat(MAN.clips),L={man:MAN,total:all.length,ok:0,fail:0,bytes:0,bad:[],files:{},done:false,started:false,t0:0,t1:0,checked:0};
  function parse(ab){const u=new Uint8Array(ab);if(u[0]!==67||u[1]!==70||u[2]!==75||u[3]!==75)throw new Error('not a model file');const n=new DataView(ab).getUint32(4,true);
    return{h:JSON.parse(new TextDecoder().decode(u.subarray(8,8+n))),blob:ab.slice(8+n)}}
  async function sha(ab){try{if(!(window.crypto&&crypto.subtle))return null;const d=await crypto.subtle.digest('SHA-256',ab);return Array.from(new Uint8Array(d),x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return null}}
  function unb64(t){const b=atob(t.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer}   // files are base64 text (the host serves no .bin)
  function fetchTry(url,n){return fetch(url).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(unb64).catch(e=>n>1?new Promise(res=>setTimeout(res,700*(4-n))).then(()=>fetchTry(url,n-1)):Promise.reject(e))}
  function one(e){return fetchTry((L.base||'models/')+e.file,3).then(async ab=>{const hs=await sha(ab);if(hs){if(hs!==e.sha256)throw new Error('fingerprint does not match');L.checked++}
      L.files[e.name]=parse(ab);L.ok++;L.bytes+=ab.byteLength})
    .catch(err=>{L.fail++;L.bad.push(e.name+': '+String(err&&err.message||err));try{console.warn('[CF] model file '+e.file+' failed: '+(err&&err.message||err))}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}})
    .finally(()=>{if(L.ok+L.fail===L.total&&!L.done){L.done=true;L.t1=performance.now()}})}
  function start(){if(L.started)return;L.started=true;L.t0=performance.now();let i=0;const next=()=>{if(i>=all.length)return Promise.resolve();return one(all[i++]).then(next)};for(let k=0;k<3;k++)next()}
  L.start=start;L.has=n=>!!L.files[n];L.get=n=>L.files[n];L.failed=n=>L.bad.some(b=>b.startsWith(n+':'));
  L.line=()=>L.ok===L.total?'Model files: '+L.ok+' of '+L.total+' loaded ('+(L.bytes/1048576).toFixed(1)+' MB)':
    L.done?'Model files: '+L.ok+' of '+L.total+' loaded, '+L.fail+' failed (classic players)':'Model files: '+L.ok+' of '+L.total+' loaded...';
  setTimeout(start,1200);return L})();
const P3D=(()=>{
  const S={on:false,ok:false,want:true,err:'',frames:0,ms:0,calls:0,tris:0,rigs:0,lost:false};
  try{if(localStorage.getItem('cf_3d')==='0')S.want=false}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  const CFG=window.P3DCFG={tilt:.5,outline:1.5,ink:[.05,.035,.075],inner:.55,inkLo:.25,inkHi:.85,ramp:[72,152,232],light:[1.15,1.65,1.55,1.55,.65],head:1};
  const MH=1.78,MAXR=24,TILT0=Math.cos(.42);
  let T=null,R=null,scene=null,cam3=null,rt=null,qs=null,qc=null,qm=null,glc=null,cw=0,ch=0;
  const LT={},GEO={};let inkU=null,lastLook='',numTex=null,ballIM=null,ballTone=null;
  const rigs=[],bind=new Map(),VIS=[],INFO={hasBall:false,stance:false,qbHold:false,heldBall:false,catching:false};let lab=()=>{},stamp=0;
  const BONES=P3D_MODEL.hdr.bones,PAR=P3D_MODEL.hdr.parents;
  /* which of the three bodies each position wears */
  const BUILD_OF={WR:'lean',DB:'lean',QB:'mid',RB:'mid',LB:'mid',TE:'mid',OL:'heavy',DL:'heavy'};
  const BW={lean:.9,mid:1.05,heavy:1.4};
  function bodyOf(p){const t=String(p.pos||'').toUpperCase(),r=String(p.role||'').toUpperCase();
    for(let i=0;i<2;i++){const s=i?t:r;if(/^QB/.test(s))return'QB';if(/^(RB|HB|FB)/.test(s))return'RB';if(/^WR/.test(s))return'WR';if(/^TE/.test(s))return'TE';
      if(/^(OL|OT|OG|C$)/.test(s))return'OL';if(/^(DL|DE|DT|NT)/.test(s))return'DL';if(/^(LB|MLB|OLB)/.test(s))return'LB';if(/^(DB|CB|FS|SS|SAF|S\d?$)/.test(s))return'DB'}
    return'WR'}
  // gear: decided from the player's name hash so a player always looks the same (v3.12: only the glove colour is still used)
  function hashOf(p){const s=String((p.d&&(p.d.n0||p.d.name||p.d.id))||p.name||p.id||p.role||'');let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  const rnd=(h,k)=>((Math.imul(h^Math.imul(k+1,2654435761),2246822519)>>>7)&1023)/1024;
  function gearOf(bt,h){return{gl:rnd(h,2)<.85,glc:(rnd(h,3)*4)|0}}
  /* ---------- the v6 body: one skinned mesh, 11 bones, three builds that share every vertex (made in Blender, rounds 3-6) ---------- */
  function loadModel(){
    const H0=P3D_MODEL.hdr,nv=H0.nv,ni=H0.ni,bin=atob(P3D_MODEL.b64),buf=new ArrayBuffer(bin.length),u8=new Uint8Array(buf);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);
    let o=0;const take=(C,n)=>{const a=new C(buf,o,n);o+=n*C.BYTES_PER_ELEMENT;return a};
    const pm=take(Int16Array,nv*3),pl=take(Int16Array,nv*3),ph=take(Int16Array,nv*3),idx=take(Uint16Array,ni),si=take(Uint8Array,nv*2),sw=take(Uint8Array,nv),sl=take(Uint8Array,nv),uv=take(Uint8Array,nv*2);
    if(o!==buf.byteLength)throw new Error('3D body data is damaged');
    const skI=new Uint16Array(nv*4),skW=new Float32Array(nv*4),slot=new Float32Array(nv),uvN=new Float32Array(nv*2);
    for(let i=0;i<nv;i++){skI[i*4]=si[i*2];skI[i*4+1]=si[i*2+1];const w=sw[i]/255;skW[i*4]=w;skW[i*4+1]=1-w;slot[i]=sl[i];
      uvN[i*2]=uv[i*2]===255?-1:uv[i*2]/250;uvN[i*2+1]=uv[i*2+1]===255?-1:uv[i*2+1]/250}
    const reg=new Float32Array(nv),BN=H0.bones,PV=H0.builds.mid.pivots;for(let i=0;i<nv;i++){const b=BN[sw[i]>=128?si[i*2]:si[i*2+1]],x=pm[i*3]/1000,y=pm[i*3+1]/1000,s0=sl[i];let r=0;
      if(b==='head'&&s0===2)r=1;else if((b==='elR'||b==='elL'||b==='shR'||b==='shL')&&s0===2)r=2;else if((b==='shR'||b==='shL')&&s0===0&&y<1.2&&Math.abs(x)>Math.abs(PV[b][0])-.04)r=(y>1.1&&y<1.165)?4:3;else if(s0===1&&Math.abs(pm[i*3+2]/1000)<.075&&(((b==='hpR'||b==='hpL')&&Math.abs(x)>Math.abs(PV[b][0])+.08)||(b==='hips'&&Math.abs(x)>.22)))r=5;reg[i]=r}   // v3.16KK1 L9
    const index=new T.BufferAttribute(new Uint16Array(idx),1),aI=new T.Uint16BufferAttribute(skI,4),aW=new T.BufferAttribute(skW,4),aS=new T.BufferAttribute(slot,1),aU=new T.BufferAttribute(uvN,2);
    for(const [nm,d] of [['mid',null],['lean',pl],['heavy',ph]]){
      const pos=new Float32Array(nv*3);for(let i=0;i<nv*3;i++)pos[i]=(pm[i]+(d?d[i]:0))/1000;
      const g=new T.BufferGeometry();g.setIndex(index);g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('normal',new T.BufferAttribute(smoothNormals(pos,idx,sl),3));
      g.setAttribute('skinIndex',aI);g.setAttribute('skinWeight',aW);g.setAttribute('aSlot',aS);g.setAttribute('aUvN',aU);g.setAttribute('aReg',new T.BufferAttribute(reg,1));GEO[nm]=g}}
  /* normals: smooth across the colour seams (same spot = same normal), hard at the shoes and gloves so they read as their own pieces */
  function smoothNormals(pos,idx,sl){const nv=pos.length/3,key=new Array(nv),acc=new Map(),out=new Float32Array(nv*3);
    for(let i=0;i<nv;i++)key[i]=Math.round(pos[i*3]*2000)+','+Math.round(pos[i*3+1]*2000)+','+Math.round(pos[i*3+2]*2000)+(sl[i]===6?'S':sl[i]===7?'G':'');
    for(let f=0;f<idx.length;f+=3){const a=idx[f]*3,b=idx[f+1]*3,c=idx[f+2]*3,ux=pos[b]-pos[a],uy=pos[b+1]-pos[a+1],uz=pos[b+2]-pos[a+2],vx=pos[c]-pos[a],vy=pos[c+1]-pos[a+1],vz=pos[c+2]-pos[a+2];
      const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;for(const v of [idx[f],idx[f+1],idx[f+2]]){const k=key[v];let s=acc.get(k);if(!s){s=[0,0,0];acc.set(k,s)}s[0]+=nx;s[1]+=ny;s[2]+=nz}}
    for(let i=0;i<nv;i++){const s=acc.get(key[i])||[0,1,0],m=Math.hypot(s[0],s[1],s[2])||1;out[i*3]=s[0]/m;out[i*3+1]=s[1]/m;out[i*3+2]=s[2]/m}return out}
  /* one toon material per figure: same shader for all (compiled once), its own colours and number */
  function bodyMat(U){const m=new T.MeshToonMaterial({color:0xffffff,gradientMap:LT.g});
    m.onBeforeCompile=s=>{s.uniforms.inkC=inkU.c;s.uniforms.inkK=inkU.k;s.uniforms.inkLo=inkU.lo;s.uniforms.inkHi=inkU.hi;s.uniforms.cols=U.cols;s.uniforms.numMap=U.map;s.uniforms.numCell=U.cell;s.uniforms.numC=U.nc;s.uniforms.numO=U.no;s.uniforms.rgC=U.rgC;s.uniforms.rgOn=U.rgOn;
      s.vertexShader='attribute float aSlot;\nattribute vec2 aUvN;\nattribute float aReg;\nvarying float vReg;\nvarying float vSlot;\nvarying vec2 vUvN;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvSlot=aSlot;vUvN=aUvN;vReg=aReg;');
      s.fragmentShader='uniform vec3 inkC;uniform float inkK;uniform float inkLo;uniform float inkHi;uniform vec3 cols[9];uniform sampler2D numMap;uniform vec2 numCell;uniform vec3 numC;uniform vec3 numO;uniform vec3 rgC[6];uniform float rgOn[6];\nvarying float vReg;\nvarying float vSlot;\nvarying vec2 vUvN;\n'+
        s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n{int si=int(vSlot+0.5);vec3 bc=cols[0];for(int i=1;i<9;i++){if(i==si)bc=cols[i];}{int ri=int(vReg+0.5);for(int i=1;i<6;i++){if(i==ri&&rgOn[i]>0.5)bc=rgC[i];}}diffuseColor.rgb=bc;\n if(vUvN.x>=0.0&&vUvN.y>=0.0){vec2 nu=(clamp(vUvN,0.0,1.0)*0.92+0.04+numCell)*0.1;vec4 tx=texture2D(numMap,nu);diffuseColor.rgb=mix(diffuseColor.rgb,mix(numO,numC,tx.r),step(0.45,tx.a));}}')
        .replace('#include <opaque_fragment>','#include <opaque_fragment>\n{float fr=abs(normal.z);gl_FragColor.rgb=mix(gl_FragColor.rgb,inkC,(1.0-smoothstep(inkLo,inkHi,fr))*inkK);}')};
    m.customProgramCacheKey=()=>'cfskin7';return m}
  function init(){
    if(S.ok||S.err)return S.ok;
    try{
      T=window.THREE;if(!T||!T.WebGLRenderer||!T.SkinnedMesh)throw new Error('Three.js did not load');
      glc=document.createElement('canvas');
      glc.addEventListener('webglcontextlost',e=>{e.preventDefault();S.lost=true;S.on=false},false);
      glc.addEventListener('webglcontextrestored',()=>{S.lost=false},false);
      R=new T.WebGLRenderer({canvas:glc,alpha:true,antialias:false,premultipliedAlpha:true,powerPreference:'default'});
      T.ColorManagement.enabled=false;R.outputColorSpace=T.LinearSRGBColorSpace;R.setClearColor(0x000000,0);R.autoClear=true;R.info.autoReset=false;
      scene=new T.Scene();cam3=new T.OrthographicCamera(0,390,700,0,1,40000);cam3.position.set(0,0,20000);
      LT.h=new T.HemisphereLight(0x4a8fe0,0x2a1a3a,1.45);scene.add(LT.h);
      const key=new T.DirectionalLight(0xffd8a8,1.95);key.position.set(-.55,.85,.55);scene.add(key);LT.k=key;
      const rimC=new T.DirectionalLight(0x2fe0ff,1.1);rimC.position.set(-.85,.3,-.55);scene.add(rimC);LT.c=rimC;
      const rimM=new T.DirectionalLight(0xff2fd8,1.1);rimM.position.set(.85,.3,-.55);scene.add(rimM);LT.m=rimM;
      LT._syncVenue=()=>{if(!LT.h||!LT.k)return;const vid=(typeof RT2==='function'&&RT2())?'harbor':(typeof RT3==='function'&&RT3())?'gulls':(typeof RT==='function'&&RT())?'spillway':'vapor';if(LT._v===vid)return;LT._v=vid;const P={vapor:[0x4a8fe0,0x2a1a3a,1.45,0xffd8a8,1.95,0x2fe0ff,1.1,0xff2fd8,1.1],spillway:[0x6e7f91,0x30261e,1.35,0xffb45c,2.05,0xff9e3d,.75,0x8fb8d6,.55],harbor:[0x88a8c8,0x1d2a38,1.4,0xdceeff,1.85,0x7cc4e8,.65,0x4c6b8a,.45],gulls:[0x9ec5e6,0x364238,1.5,0xfff0d4,2.0,0x9be3ff,.55,0xffcf88,.5]}[vid];LT.h.color.setHex(P[0]);LT.h.groundColor.setHex(P[1]);LT.h.intensity=P[2];LT.k.color.setHex(P[3]);LT.k.intensity=P[4];LT.c.color.setHex(P[5]);LT.c.intensity=P[6];LT.m.color.setHex(P[7]);LT.m.intensity=P[8]};const bnc=new T.DirectionalLight(0xff9a3c,.65);bnc.position.set(0,-.3,.3);scene.add(bnc);LT.b=bnc;
      const gm=new T.DataTexture(new Uint8Array([72,72,72,255,152,152,152,255,232,232,232,255]),3,1,T.RGBAFormat);LT.g=gm;gm.minFilter=gm.magFilter=T.NearestFilter;gm.needsUpdate=true;
      inkU={c:{value:new T.Vector3(CFG.ink[0],CFG.ink[1],CFG.ink[2])},k:{value:CFG.inner},lo:{value:CFG.inkLo},hi:{value:CFG.inkHi}};
      // jersey numbers: one 10 x 10 atlas (00-99). Red = digit fill, green = digit outline, painted in the number and number-outline colours
      const nc=document.createElement('canvas');nc.width=nc.height=640;const g=nc.getContext('2d');g.textAlign='center';g.textBaseline='middle';g.font='900 40px "Arial Black",Impact,sans-serif';g.lineJoin='round';
      for(let n=0;n<100;n++){const c=n%10,r=(n/10)|0,x=c*64+32,y=r*64+34;g.lineWidth=9;g.strokeStyle='#00ff00';g.strokeText(String(n),x,y);g.fillStyle='#ff0000';g.fillText(String(n),x,y)}
      numTex=new T.CanvasTexture(nc);numTex.generateMipmaps=false;numTex.minFilter=T.LinearFilter;numTex.anisotropy=2;
      loadModel();
      // the ball in a hand or at the chest: one instanced mesh for every figure
      ballTone=new T.MeshToonMaterial({color:0xffffff,gradientMap:gm});
      ballIM=new T.InstancedMesh(new T.SphereGeometry(.5,12,8),ballTone,MAXR*3);ballIM.frustumCulled=false;ballIM.count=0;
      {const z=new T.Matrix4().makeScale(0,0,0),c=new T.Color('#8a4a22');for(let i=0;i<MAXR*3;i++){ballIM.setMatrixAt(i,z);ballIM.setColorAt(i,c)}}scene.add(ballIM);
      rt=new T.WebGLRenderTarget(4,4,{samples:R.capabilities.isWebGL2?4:0});
      qm=new T.ShaderMaterial({uniforms:{t:{value:rt.texture},px:{value:new T.Vector2(1,1)},w:{value:CFG.outline},ink:{value:new T.Vector3(CFG.ink[0],CFG.ink[1],CFG.ink[2])}},
        vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
        fragmentShader:'uniform sampler2D t;uniform vec2 px;uniform float w;uniform vec3 ink;varying vec2 vUv;void main(){vec4 c=texture2D(t,vUv);float m=0.;vec2 d=px*w;'+
          'm=max(m,texture2D(t,vUv+vec2(d.x,0.)).a);m=max(m,texture2D(t,vUv-vec2(d.x,0.)).a);m=max(m,texture2D(t,vUv+vec2(0.,d.y)).a);m=max(m,texture2D(t,vUv-vec2(0.,d.y)).a);'+
          'm=max(m,texture2D(t,vUv+d*.7071).a);m=max(m,texture2D(t,vUv-d*.7071).a);m=max(m,texture2D(t,vUv+vec2(d.x,-d.y)*.7071).a);m=max(m,texture2D(t,vUv+vec2(-d.x,d.y)*.7071).a);'+
          'float o=m*(1.-c.a);gl_FragColor=vec4(c.rgb+ink*o,c.a+o);}',depthTest:false,depthWrite:false,transparent:false});
      qs=new T.Scene();const qq=new T.Mesh(new T.PlaneGeometry(2,2),qm);qq.frustumCulled=false;qs.add(qq);qc=new T.OrthographicCamera(-1,1,1,-1,0,1);
      S.ok=true;
    }catch(e){S.err=String(e&&e.message||e);S.ok=false;try{console.error('[CF] 3D players off: '+S.err);lab()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}
    return S.ok}
  /* ---------- one figure: root -> tilt -> yaw -> fall -> the 11 bones of the body ---------- */
  function node(par,x,y,z){const o=new T.Object3D();o.position.set(x||0,y||0,z||0);if(par)par.add(o);return o}
  function makeRig(i){
    const root=new T.Object3D(),tilt=node(root),yaw=node(tilt),fall=node(yaw),N={root,tilt,yaw,fall};
    for(const b of BONES){const o=new T.Bone();o.name=b;N[b]=o}
    for(const b of BONES)(PAR[b]?N[PAR[b]]:fall).add(N[b]);
    const P={ballR:node(N.elR),ballL:node(N.elL),ball2:node(N.spine),shoeR:node(N.knR),shoeL:node(N.knL)};
    const U={rgC:{value:Array.from({length:6},()=>new T.Color(1,1,1))},rgOn:{value:[0,0,0,0,0,0]},cols:{value:Array.from({length:9},()=>new T.Color(1,1,1))},map:{value:numTex},cell:{value:new T.Vector2(0,9)},nc:{value:new T.Color(1,1,1)},no:{value:new T.Color(0,0,0)}};
    const mesh=new T.SkinnedMesh(GEO.mid,bodyMat(U));mesh.frustumCulled=false;mesh.visible=false;scene.add(mesh);
    return{i,N,P,U,mesh,sk:null,build:'',p:null,cur:{},seen:0,fallK:0,bsd:1,sg:[],sgOK:false,bt:'WR',g:null,ab:.2,hip:.86,lay:.2,lyT:9,wasLy:false}}
  /* put the bones at this build's joints, record the rest pose, bind the body to it */
  function build(r,bn){
    if(r.build===bn)return;r.build=bn;const B=P3D_MODEL.hdr.builds[bn],N=r.N,pv=B.pivots,rs=B.rest,wp={};
    N.root.position.set(0,0,0);N.root.scale.set(1,1,1);N.root.rotation.set(0,0,0);N.tilt.rotation.set(0,0,0);N.yaw.rotation.set(0,0,0);N.fall.rotation.set(0,0,0);
    for(const b of BONES){const p=PAR[b],o=N[b],a=pv[b],q=p?pv[p]:[0,0,0];let dx=a[0]-q[0],dy=a[1]-q[1],dz=a[2]-q[2];
      if(p&&rs[p]&&rs[p][2]){const c=Math.cos(-rs[p][2]),s=Math.sin(-rs[p][2]),x=dx*c-dy*s,y=dx*s+dy*c;dx=x;dy=y}   // a child of a shoulder sits in the shoulder's turned frame
      o.position.set(dx,dy,dz);o.rotation.set(rs[b][0],rs[b][1],rs[b][2]);o.scale.set(1,1,1)}
    N.root.updateMatrixWorld(true);
    const inv=BONES.map(b=>N[b].matrixWorld.clone().invert());
    if(r.sk)r.sk.dispose();r.sk=new T.Skeleton(BONES.map(b=>N[b]),inv);r.mesh.geometry=GEO[bn];r.mesh.bind(r.sk,new T.Matrix4());
    r.ab=Math.abs(rs.shL[2])||.2;r.hip=pv.hips[1];r.lay=.2*Math.pow(BW[bn],.8);r.cur={};
    const kn=pv.knR[1];r.P.shoeR.position.set(0,-kn+.5,.03);r.P.shoeL.position.set(0,-kn+.5,.03);   // (0,-.5,0) in these is the sole, for foot pinning
    for(const s of 'RL'){const o=r.P['ball'+s];o.position.set(0,-.27,.07);o.scale.set(.17,.17,.28);o.rotation.set(.3,0,0)}
    r.P.ball2.position.set(0,pv.shR[1]-pv.spine[1]-.2,.2);r.P.ball2.scale.set(.17,.17,.28);r.P.ball2.rotation.set(0,Math.PI/2,0)}
  const hexC=(h,d)=>{const s=/^#[0-9a-f]{6}$/i.test(h||'')?h:d;return new T.Color(s)};
  const pick=(u,ks,d)=>{for(let i=0;i<ks.length;i++){const v=u[ks[i]];if(/^#[0-9a-f]{6}$/i.test(v||''))return v}return d};
  const TRIMK=['jt','jtrim','trim','jerseyTrim','jc2','tr'],PSTK=['ps','pst','pstripe','pantStripe','pn2','pantTrim'],NOK=['jno','nout','numOutline','numOut','no','jo'];
  function colour(r,p){
    const u=p._uni||uniFor(p),L=lookOf(p.d),num=Math.max(0,Math.min(99,p.num|0)),jt=pick(u,TRIMK,u.jn),ps=pick(u,PSTK,u.jn),no=pick(u,NOK,'#14110f'),sg=r.sg,bt=bodyOf(p);
    let ch=!r.sgOK;const gd=gearOfD(p.d),f=[u.jc,u.jn,u.pc,u.sock,u.shoe,u.hc,u.hs,u.mask,L.skin,num,jt,ps,no,bt,u.j,u.p,gd?JSON.stringify(gd):''];
    for(let i=0;i<f.length;i++){if(sg[i]!==f[i]){sg[i]=f[i];ch=true}}
    if(!ch)return;r.sgOK=true;r.bt=bt;
    r.g=gearOf(bt,hashOf(p));build(r,BUILD_OF[bt]||'mid');const g=r.g;
    const jc=hexC(u.jc,'#888888'),jn=hexC(u.jn,'#ffffff'),skin=hexC(L.skin,'#c98f63'),jtC=hexC(jt,'#ffffff'),psC=hexC(ps,'#ffffff'),dark=new T.Color('#141318');
    // slots: 0 jersey, 1 pants, 2 skin, 3 helmet, 4 facemask, 5 socks, 6 shoes, 7 gloves, 8 trim (helmet stripe, sleeve cuffs, waist band)
    const C=[jc,hexC(u.pc,'#dddddd'),skin,hexC(u.hc,'#444444'),hexC(u.mask,'#6b7078'),hexC(u.sock,'#ffffff'),hexC(u.shoe,'#14110f'),g.gl?[jtC,jn,dark,psC][g.glc]:skin,jtC];
    for(let i=0;i<9;i++)r.U.cols.value[i].copy(C[i]);
    {const on=r.U.rgOn.value,rc=r.U.rgC.value,G3=GEAR3D;for(let i=0;i<6;i++)on[i]=0;   // v3.16KK1 L9: jersey style, pant stripe, star sleeves / visor / gloves
     if(G3&&gd&&gd.visor){on[1]=1;rc[1].copy(hexC(gd.vc,'#38c6d9')).multiplyScalar(.8)}
     if(G3&&gd&&gd.sleeves){on[2]=1;rc[2].copy(hexC(gd.sc,'#ffd23a'))}
     if(G3&&gd&&gd.gloves){r.U.cols.value[7].copy(hexC(gd.gc,'#ffd23a'))}
     if(G3&&u.j===1){on[3]=1;rc[3].copy(on[2]?rc[2]:skin);on[4]=1;rc[4].copy(rc[3])}   // tank: bare (or sleeved) arms
     else if(G3&&u.j===2){on[4]=1;rc[4].copy(jtC)}
     else if(G3&&u.j===3&&!on[2]){on[2]=1;rc[2].copy(jc)}   // arm stripes: a band of trim near the cuff
     if(G3&&(u.p===1||u.p===2)){on[5]=1;rc[5].copy(psC)}}
    r.U.cell.value.set(num%10,9-((num/10)|0));r.U.nc.value.copy(jn);r.U.no.value.copy(hexC(no,'#14110f'))}
  /* ---------- pose: target angles, eased so nothing snaps ---------- */
  const ease=(r,k,v,a)=>{const c=r.cur[k];r.cur[k]=c===undefined?v:c+(v-c)*a;return r.cur[k]};
  function pose(r,p,dt,info){
    const N=r.N,P=r.P,now=performance.now()/1000,ab=r.ab,LL=r.hip,bsd=r.bsd;
    const lying=p.fall||(p.knock&&p.stun>0),spd=Math.hypot(p.vx||0,p.vy||0),amp=clamp(spd/6.2,0,1),ph=(p.ph||0)*TAU,hasBall=info.hasBall;
    let ak=16,lean=.1,pitch=0,roll=0,twist=0,sway=0,headX=-.08,headZ=0,hipY=LL,wide=.06,rx=-.12,rz=ab,lx=-.12,lz=ab,er=-.4,el=-.4,hR=0,hL=0,kR=.06,kL=.06,ballHand=0,ballChest=false;
    if(spd>.4&&!lying){
      const s=Math.sin(ph),c=Math.cos(ph),sa=Math.sin(ph-1.1),sb=Math.sin(ph+Math.PI-1.1),ia=1-amp;
      hR=-s*1.3*amp;hL=s*1.3*amp;kR=(.35+1.55*(sa>0?sa:0))*amp+.08;kL=(.35+1.55*(sb>0?sb:0))*amp+.08;
      rx=s*1.15*amp-.15*ia;lx=-s*1.15*amp-.15*ia;rz=lz=ab*.55+ab*.45*ia;er=el=-1.65*amp-.5*ia;
      lean=.15+.55*amp+(p.spr?.14:0);hipY=LL-.055*amp+Math.abs(c)*.055*amp;twist=-s*.42*amp;roll=-c*.055*amp;wide=.05;headX=-lean*.85;ak=20;
      if(p.styleOn){
        if(p.styleKind===0){kR*=1.6;kL*=1.6;hR*=1.45;hL*=1.45;lean-=.14;rx*=1.4;lx*=1.4;headX-=.3}
        else if(p.styleKind===1){const w=now*15;twist=Math.sin(w)*.75;roll=Math.cos(w)*.3;sway=Math.sin(w+Math.PI)*.22;rz=lz=.65;rx=lx=-.5;er=el=-.9;lean=.25;headZ=Math.sin(w*.5)*.15}
        else{lean-=.12;headZ=Math.sin(now*3.5)*.25}}}
    else if(F&&F.mode==='pre'&&!info.prev){ak=14;const bob=Math.sin(now*6.5+r.i*1.7);
      if(info.stance){lean=.9;pitch=.16;hipY=LL*.68;hR=-1.15;hL=-.95;kR=1.65;kL=1.55;wide=.28;rx=-1.25;rz=.12;er=-.02;lx=-.35;lz=ab+.1;el=-1.25;headX=-1.1}
      else if(p.role==='QB'){lean=.46;hipY=LL*.86;hR=hL=-.55;kR=kL=.95+bob*.04;wide=.16;rx=lx=-1.1;rz=lz=-.12;er=el=-.6;headX=-.35}
      else if(POSES&&(p.role==='WR1'||p.role==='WR2')){lean=.6;hipY=LL*.9;hR=hL=-.5;kR=kL=.8+bob*.03;wide=.08;rx=-.3;lx=-.5;rz=lz=ab+.1;er=-1.6;el=-1.4;headX=-.45;twist=.12}   // v3.16CC2: stances
      else if(POSES&&p.role==='TE'){lean=.82;pitch=.14;hipY=LL*.72;hR=hL=-.95;kR=kL=1.45;wide=.3;rx=-1.2;rz=.15;er=-.05;lx=-.4;lz=ab+.1;el=-1.2;headX=-1.0}
      else if(POSES&&p.role==='RB'){lean=.72;hipY=LL*.84;hR=hL=-.7;kR=kL=1.0+bob*.04;wide=.22;rx=lx=-.95;rz=lz=.3;er=el=-.25;headX=-.4}
      else if(POSES&&p.pos==='LB'){lean=.5;hipY=LL*.82;hR=hL=-.7;kR=kL=1.15+bob*.05;wide=.3;rx=lx=-.75;rz=lz=ab+.25;er=el=-1.5;headX=-.35;roll=bob*.02}
      else if(POSES&&p.pos==='DB'){lean=.42;hipY=LL*.9;hR=hL=-.4;kR=kL=.65+bob*.04;wide=.16;rx=-.55;lx=-.35;rz=lz=ab+.2;er=el=-1.3;headX=-.2;twist=-.15}
      else{lean=.55;hipY=LL*.88;hR=-.62;hL=-.32;kR=.95+bob*.05;kL=.7-bob*.05;wide=.2;rx=-.6;lx=-.5;rz=lz=ab+.15;er=el=-1.0;headX=-.5;roll=bob*.03}}
    if(p.dizzy&&p.stun>0&&!lying){const w=Math.sin(now*5+r.i);roll=w*.18;lean=.2;headX=.45;headZ=w*.3;rx=-.2+w*.15;lx=-.2-w*.15;rz=lz=.5;er=el=-.5;kR=kL=.5;hR=w*.2;hL=-w*.2;sway=w*.1}
    if(p.eng&&!lying){ak=20;lean=.68;pitch=.12;hipY=LL*.84;hR=-.6;kR=.85;hL=.3;kL=.45;wide=.26;rx=lx=-1.55;rz=lz=.35;er=el=-.35;headX=-.5;const w=Math.sin(now*11+r.i)*.1;rx+=w;lx-=w;twist=w*.8}
    if(p.lunge>0&&!lying){ak=28;lean=1.35;pitch=.55;hipY=LL*.74;hR=-1.15;kR=.3;hL=.9;kL=.18;wide=.14;rx=lx=-2.35;rz=lz=.5;er=el=-.2;headX=-1.0}
    if(info.catching){ak=32;lean=.05;hipY=LL;hR=-.78;kR=1.02;hL=.12;kL=.2;rx=lx=-2.7;rz=lz=.35;er=el=-.18;headX=-.55
      if(POSES&&F&&F.ball&&F.ball.to&&F.def){const to=F.ball.to;let dd=9;for(const d of F.def)if(!d.fall)dd=Math.min(dd,Math.hypot(d.x-to.x,d.y-to.y));const rr=Math.hypot(p.x-to.x,p.y-to.y);   // v3.16BB1: catch poses
        if(dd<1.6&&rr>1.0){ak=26;lean=1.25;pitch=.45;hipY=LL*.62;hR=.5;kR=.15;hL=.75;kL=.2;rx=lx=-2.45;rz=lz=.2;er=el=-.05;headX=-.9}
        else if(dd<1.6){const up=.12;hipY=LL+up;hR=-.2;kR=.25;hL=-.55;kL=.9;rx=lx=-3.05;rz=lz=.18;er=el=0;lean=-.1;headX=.35;twist=.15}}}
    if(p.spin>0&&!lying){ak=24;lean=.1;rx=lx=-.5;rz=lz=1.45;er=el=-.2;kR=.8;hR=-.6;headX=0;roll=Math.sin(now*20)*.15}
    if(p.moveAnim&&p.moveAnim.name==='swim'){rx=-2.8;rz=.5;er=-.4;lx=-.6;lean=.5;twist=.55}
    if(hasBall){
      if(info.qbHold){rx=lx=-.85;rz=lz=-.05;er=el=-1.65;ballChest=true}
      else{const right=bsd>0;roll=right?.1:-.1;lean+=.06;
        if(p.styleOn&&p.styleKind===2){if(right){rx=-1.75;rz=.75;er=-.15}else{lx=-1.75;lz=.75;el=-.15}lean=.0;headX=-.3}
        else{if(right){rx=-.35;rz=.1;er=-2.05}else{lx=-.35;lz=.1;el=-2.05}}
        ballHand=right?1:-1}}
    if(p.arm>0&&!lying){const right=!(hasBall&&bsd>0);if(right){rx=-1.75;rz=.05;er=0;twist=.45}else{lx=-1.75;lz=.05;el=0;twist=-.45}lean=Math.max(lean,.5)}
    if(POSES&&F&&F.mode==='live'&&!lying&&!F.handed&&!F.snap&&typeof PLAY!=='undefined'&&PLAY&&PLAY.kind==='run'&&F.off&&F.off.RB&&F.off.QB){const R2=F.off.RB,Q=F.off.QB,dh=Math.hypot(R2.x-Q.x,R2.y-Q.y);   // v3.16AA3: handoff exchange
      if(p===Q&&F.carrier===Q&&dh<3.6){const k=clamp((3.6-dh)/2.4,0,1);rx=-1.25*k;rz=.25+.75*k;er=-.35;twist=.35*k;lean=.3;ballHand=1;ballChest=false;info.qbHold=false}
      else if(p===R2&&dh<3.2){const k=clamp((3.2-dh)/2,0,1);rx=-1.0*k-.2;rz=.15;er=-2.0*k;lx=-.35;lz=.35;el=-.9*k;lean=.32;headX=-.25}}
    if(POSES&&p.dash&&!lying){const sd=p.jkSide||1;roll=.38*sd;sway=.12*sd;lean=.42;hipY=LL*.86;kR=sd>0?1.15:.35;kL=sd>0?.35:1.15;hR=sd>0?-.7:-.2;hL=sd>0?-.2:-.7;wide=.24;twist=-.3*sd;
      if(hasBall&&bsd>0){lx=-.35;lz=1.2;el=-.25}else{rx=-.35;rz=1.2;er=-.25}headX=-.3}   // v3.16AA4: juke plant
    if(POSES&&p.whiffTo&&F&&F.t<p.whiffTo&&!lying&&!p.dash){const w=Math.sin(now*22);roll=w*.22;lean=.6;pitch=.12;headX=-.75;hipY=LL*.9;kR=.75;kL=.4;if(hasBall&&bsd>0){lx=-1.4+w*.45;lz=.95;el=-.3}else{rx=-1.4+w*.45;rz=.95;er=-.3}}   // v3.16BB2: stumble
    if(p.hurdle&&p.air&&!lying){const k=p.air.t/p.air.T,u=Math.sin(Math.PI*k);hR=-1.5*u-.2;kR=2.0*u+.2;hL=-.6*u;kL=1.3*u+.2;lean=.35;headX=-.2;if(hasBall&&bsd>0){rx=-1.6*u;rz=.6}else{lx=-1.6*u;lz=.6}}   // v3.16OO1: hurdle
    if(p.dive&&!lying){const k=Math.min(1,p.dive.t/p.dive.T);lean=.5+1.0*k;hipY=LL*(.9-.35*k);hR=.3;hL=.5;kR=.2;kL=.3;headX=-.5;if(hasBall&&bsd>0){lx=-2.6;lz=.15;el=0}else{rx=-2.6;rz=.15;er=0}rx=-2.6;rz=.1}   // v3.16OO1: dive, ball reaching for the line
    if(POSES&&p.shoveTo&&F&&F.t<p.shoveTo&&!lying){const right=!(hasBall&&bsd>0);if(right){rx=-1.95;rz=.0;er=.05;twist=.6}else{lx=-1.95;lz=.0;el=.05;twist=-.6}lean=.78;hipY=LL*.9;hR=-.9;kR=.6;hL=.35;kL=.25;headX=-.6}   // v3.16AA4: truck shove
    if(p.throwT>0&&!lying){ak=36;const k=1-p.throwT/.45;
      if(k<.35){const q=k/.35;rx=1.35*q;rz=1.75*q+.2;er=-1.9;twist=1.0*q;lean=.15-.18*q;lx=-1.85*q;lz=.18;el=-.15;hL=-.85*q;kL=1.25*q;hR=.2*q;kR=.35*q;hipY=LL*(1-.08*q);headX=-.35}
      else{const q=Math.min(1,(k-.35)/.35);rx=1.35-3.55*q;rz=1.95-1.7*q;er=-1.9+1.75*q;twist=1.0-1.7*q;headZ=.15*q;lean=-.02+.62*q;lx=-1.5+.9*q;lz=.15;el=-.2-1.2*q;hL=-.75;kL=1.1-.6*q;hR=.15+.4*q;kR=.3+.9*q;pitch=.08*q;headX=-.3-.3*q}
      ballHand=info.heldBall?1:0;ballChest=false}
    if(p.celeb>0&&!lying){p.celeb-=dt;const w=now*8,v=p.celebV||0;ak=18;pitch=0;roll=0;sway=0;headZ=0;
      if(v===0){const hop=Math.max(0,Math.sin(w))*.16;hipY=LL+hop;rx=lx=-2.95;rz=lz=.3+.08*Math.sin(w*.5);er=el=-.08;lean=-.12;hR=hL=-.15;kR=kL=.15+hop;headX=.35;twist=Math.sin(w*.5)*.2;wide=.1;ballHand=1;ballChest=false}
      else if(v===1){rx=-3.0;rz=.15;er=0;lx=-.2;lz=1.0;el=-1.8;lean=-.06;headX=.45;hR=-.1;hL=.05;kR=kL=.1;wide=.12;sway=Math.sin(w*.4)*.08;twist=-.25;ballHand=1;ballChest=false}
      else{rx=lx=-1.55;rz=lz=1.5;er=el=-2.2;lean=.05;wide=.22;hipY=LL*.94;hR=hL=-.3;kR=kL=.45;headX=.1;twist=Math.sin(w*.6)*.3;ballHand=0;ballChest=false}}   // v3.16X2: touchdown celebration
    if(lying&&!r.wasLy)r.lyT=0;r.wasLy=lying;r.lyT+=dt;
    r.fallK+=((lying?1:0)-r.fallK)*Math.min(1,dt*(lying?11:5));
    const a=1-Math.exp(-dt*ak),fk=r.fallK;
    N.hips.position.y=ease(r,'hy',hipY,a);N.hips.rotation.x=ease(r,'pt',pitch,a);N.hips.rotation.z=ease(r,'sw',sway,a);
    N.spine.rotation.x=ease(r,'ln',lean,a);N.spine.rotation.y=ease(r,'tw',twist,a);N.spine.rotation.z=ease(r,'rl',roll,a);
    N.head.rotation.x=ease(r,'hx',headX,a);N.head.rotation.z=ease(r,'hz',headZ,a);
    N.shR.rotation.x=ease(r,'srx',rx,a);N.shR.rotation.z=-ease(r,'srz',rz,a);N.shL.rotation.x=ease(r,'slx',lx,a);N.shL.rotation.z=ease(r,'slz',lz,a);
    N.elR.rotation.x=ease(r,'er',er,a);N.elL.rotation.x=ease(r,'el',el,a);
    N.hpR.rotation.x=ease(r,'hr',hR,a);N.hpL.rotation.x=ease(r,'hl',hL,a);N.knR.rotation.x=ease(r,'kr',kR,a);N.knL.rotation.x=ease(r,'kl',kL,a);
    N.hpR.rotation.z=-ease(r,'wr',wide,a);N.hpL.rotation.z=ease(r,'wl',wide,a);
    if(fk>.02){const bn=.14*Math.exp(-7*r.lyT)*Math.sin(15*r.lyT);{const fv=p.fallV||0,q=(fk+bn*fk)*Math.PI/2;if(fv===1){N.fall.rotation.x=-q;N.fall.rotation.z=0}else if(fv===2){N.fall.rotation.x=q*.25;N.fall.rotation.z=q*(p.fallS||1)}else{N.fall.rotation.x=q;N.fall.rotation.z=0}}   // v3.16Z4: forward / onto his back / onto his side
      N.hips.position.y=N.hips.position.y*(1-fk)+r.lay*fk;
      N.shR.rotation.z=N.shR.rotation.z*(1-fk)-1.3*fk;N.shL.rotation.z=N.shL.rotation.z*(1-fk)+1.3*fk;N.hpR.rotation.z=N.hpR.rotation.z*(1-fk)-.38*fk;N.hpL.rotation.z=N.hpL.rotation.z*(1-fk)+.38*fk;
      N.knL.rotation.x=N.knL.rotation.x*(1-fk)+1.0*fk;N.hpL.rotation.x=N.hpL.rotation.x*(1-fk)-.4*fk}
    else{N.fall.rotation.x=0;N.fall.rotation.z=0}
    P.ballR.visible=ballHand>0;P.ballL.visible=ballHand<0;P.ball2.visible=ballChest}
  /* ============ v3.18T KAYKIT TEST: my team's match players are the KayKit Mannequin_Medium (Kay Lousberg, CC0) with its own
     animation clips (Idle_A, Running_A from Rig_Medium_General / MovementBasic). Code-built helmet (solid colour + facemask) on the head
     bone and shoulder pads on the chest bone; colours from the team uniform every match. Opponents keep the classic figures.
     Any failure -> KK.err is set and my team falls back to the classic figures the same frame. MENU: MY TEAM 3D: KAYKIT / CLASSIC. ============ */
  const KK={want:true,ok:false,err:'',tried:false,geo:null,BN:[],PAR:[],REST:[],IBM:[],clips:{},hg:null,pg:null,bg:null,faceTex:null,rigs:[],bind:new Map(),stamp:0,ms:0,frames:0,HB:null,CB:null};
  try{if(localStorage.getItem('cf_kk')==='0')KK.want=false}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  const KKCFG=window.KKCFG={defense:1,walkClip:'Walking_A',walkIn:.4,walkOut:.5,head:.7,neck:1.25,top:1.02,scale:1.0,footSync:1,helm:{grow:1.05,push:.035,win:.95,top:.28,bars:[.04,-.18,-.4],mask:1.13,rad:.03},num:{y0:.76,h:.42,asp:1.25},pads:{"c":[0,1.12,0],"r":[0.38,0.14,0.26],"p":2.4,"cut":0,"trim":0},padsOld:{c:[0,1.04,0],r:[.55,.2,.3],p:3.2,cut:-.45},runRef:6.5,syncMin:.2,syncMax:2.6,runMin:.8,runMax:1.7,idleClip:'Idle_A',runClip:'Running_A',fade:.18,ballX:0,ballY:.1,ballZ:.07};
  const KSLOT=11;   // 0 jersey 1 pants 2 skin 3 socks 4 shoes 5 gloves 6 face 7 helmet 8 trim 9 facemask 10 ball
  /* ---------- v3.28T: KayKit model library decoders (files from KKLIB) ---------- */
  const KBN=b=>b.replace(/[.\s:\/\[\]]/g,'_');
  function kkBodyData(name){   // raw decoded arrays of one body file (no three.js objects)
    const f=KKLIB.get(name);if(!f)throw new Error('model file '+name+' missing');const h=f.h,bl=f.blob,nv=h.nv,ni=h.ni,nb=h.bones.length,lo=h.box[0],hi=h.box[1];
    const qp=new Int16Array(bl,h.pos,nv*3),qn=new Int8Array(bl,h.nor,nv*3),qu=new Uint16Array(bl,h.uv,nv*2),pos=new Float32Array(nv*3),nor=new Float32Array(nv*3),uv=new Float32Array(nv*2);
    for(let i=0;i<nv;i++){for(let c=0;c<3;c++)pos[i*3+c]=lo[c]+(qp[i*3+c]+32767)/65534*(hi[c]-lo[c]);
      const x=qn[i*3]/127,y=qn[i*3+1]/127,z=qn[i*3+2]/127,m=Math.hypot(x,y,z)||1;nor[i*3]=x/m;nor[i*3+1]=y/m;nor[i*3+2]=z/m;uv[i*2]=qu[i*2]/65535;uv[i*2+1]=qu[i*2+1]/65535}
    return{h,nv,ni,nb,pos,nor,uv,idx:new Uint16Array(bl.slice(h.idx,h.idx+ni*2)),ji:new Uint8Array(bl,h.si,nv*4),jw:new Uint8Array(bl,h.sw,nv*4),sl:h.slot!==undefined?new Uint8Array(bl,h.slot,nv):null,
      ibm:new Float32Array(bl.slice(h.ibm,h.ibm+nb*64)),face:h.face!==undefined?new Uint8Array(bl,h.face,4096):null,png:new Uint8Array(bl,h.tex[0],h.tex[1])}}
  const KCL={};   // pack name -> {clip name -> T.AnimationClip}
  function kkClipPack(name,only){   // every clip of one pack (or only the named ones) as three.js clips; bone names made binding-safe
    const key=name+(only?'|'+only.join(','):'');if(KCL[key])return KCL[key];const f=KKLIB.get(name);if(!f)throw new Error('model file '+name+' missing');
    const h=f.h,bl=f.blob,out={};
    for(const c of h.clips){if(only&&!only.includes(c.name))continue;const tr=[];
      for(const t of c.tracks){const [bi,p,n,to,vo]=t,fr=new Uint16Array(bl,to,n),tm=new Float32Array(n);for(let k=0;k<n;k++)tm[k]=fr[k]/h.fps;const nm=KBN(h.bones[bi]);
        if(p==='r'){const q=new Int16Array(bl,vo,n*4),v=new Float32Array(n*4);for(let k=0;k<n*4;k++)v[k]=q[k]/32767;
          for(let k=0;k<n;k++){const m=Math.hypot(v[k*4],v[k*4+1],v[k*4+2],v[k*4+3])||1;for(let c2=0;c2<4;c2++)v[k*4+c2]/=m}tr.push(new T.QuaternionKeyframeTrack(nm+'.quaternion',tm,v))}
        else{const q=new Int16Array(bl,vo,n*3),bx=t[5],v=new Float32Array(n*3);for(let k=0;k<n;k++)for(let c2=0;c2<3;c2++)v[k*3+c2]=bx[c2]+(q[k*3+c2]+32767)/65534*(bx[3+c2]-bx[c2]);
          tr.push(new T.VectorKeyframeTrack(nm+(p==='t'?'.position':'.scale'),tm,v))}}
      out[c.name]=new T.AnimationClip(c.name,Math.max(c.dur,1/h.fps),tr)}
    return KCL[key]=out}
  const KK_MATCH={body:'mannequin_medium',packs:[['medium_general',['Idle_A','Idle_B']],['medium_movementbasic',['Running_A','Running_B','Walking_A']],['medium_simulation',['Cheering','Push_Ups']]]};   // pre-game previews use real KayKit cheer and push-up clips
  function kkLoad(){
    const D=kkBodyData(KK_MATCH.body),H0=D.h,nv=D.nv,nb=D.nb,pos=D.pos,nor=D.nor,ji=D.ji,jw=D.jw,sl=D.sl,ibm=D.ibm;if(!sl||!D.face)throw new Error('match body has no colour slots');
    const skI=new Uint16Array(nv*4),skW=new Float32Array(nv*4),slot=new Float32Array(nv),uvN=new Float32Array(nv*2),num=new Float32Array(nv*3);
    for(let i=0;i<nv;i++){let s=0;for(let k=0;k<4;k++){skI[i*4+k]=ji[i*4+k];skW[i*4+k]=jw[i*4+k]/255;s+=skW[i*4+k]}if(s>0)for(let k=0;k<4;k++)skW[i*4+k]/=s;
      slot[i]=sl[i];if(sl[i]===6){uvN[i*2]=Math.min(254,Math.round(D.uv[i*2]*2*254))/254;uvN[i*2+1]=Math.min(254,Math.round((D.uv[i*2+1]-.5)*2*254))/254}else{uvN[i*2]=-1;uvN[i*2+1]=-1}
      const x=pos[i*3],y=pos[i*3+1];const NB=KKCFG.num,nw=NB.h*NB.asp;num[i*3]=(nw/2-x)/nw;num[i*3+1]=(y-NB.y0)/NB.h;num[i*3+2]=(sl[i]===0&&y<NB.y0+NB.h*1.15&&y>NB.y0-NB.h*.15&&Math.abs(x)<nw*.74&&nor[i*3+2]<-.3)?1:0}   // v3.33T: upper back   // number on the back of the jersey
    const g=new T.BufferGeometry();g.setIndex(new T.BufferAttribute(D.idx,1));g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('normal',new T.BufferAttribute(nor,3));
    g.setAttribute('skinIndex',new T.Uint16BufferAttribute(skI,4));g.setAttribute('skinWeight',new T.BufferAttribute(skW,4));g.setAttribute('aSlot',new T.BufferAttribute(slot,1));
    g.setAttribute('aUvN',new T.BufferAttribute(uvN,2));g.setAttribute('aNum',new T.BufferAttribute(num,3));KK.geo=g;
    KK.BN=H0.bones.map(KBN);KK.PAR=H0.parents;KK.REST=H0.rest;
    for(let b=0;b<nb;b++)KK.IBM.push(new T.Matrix4().fromArray(ibm,b*16));
    const bindPos=b=>new T.Vector3().setFromMatrixPosition(KK.IBM[b].clone().invert());
    KK.HB=bindPos(KK.BN.indexOf('head'));KK.CB=bindPos(KK.BN.indexOf('chest'));
    for(const [pk,names] of KK_MATCH.packs)Object.assign(KK.clips,kkClipPack(pk,names));
    for(const [,names] of KK_MATCH.packs)for(const n of names)if(!KK.clips[n])throw new Error('clip '+n+' missing');
    KK.hg=kkHelmetGeo();KK.pg=kkPadsGeo();
    {const fb=D.face,fd=new Uint8Array(64*64*4);for(let i=0;i<64*64;i++){const y=63-(i>>6),x=i&63,v=fb[i];const o=(y*64+x)*4;fd[o]=fd[o+1]=fd[o+2]=v;fd[o+3]=255}   // raw grey bytes, top row first; flipped so row 0 is the bottom like an image texture
      KK.faceTex=new T.DataTexture(fd,64,64,T.RGBAFormat);KK.faceTex.minFilter=KK.faceTex.magFilter=T.LinearFilter;KK.faceTex.needsUpdate=true}}
  /* ============ v3.29T KAYKIT MATCH ACTIONS (CF_85 Build 2) + v3.30T: Build 2b moves, more in-game moments, Build 4 presentation
     (celebrations, huddle walk, stances, win/loss screen, MY TEAM previews). Look only: every pose is read from the game's own timers (dash, spinT,
     arm, throwT, stun, fall, eng, lunge, the ball's flight); nothing here writes to a player, the ball or the clock, so timing,
     possession, collisions, odds and controls are exactly as before. An "action layer" is laid over the run/idle clip each frame:
     the clip's pose at a time taken from the game timer (so it can never run ahead or lag), faded in and out. Moving players get
     arms and chest only (legs keep the foot-synced run, so no sliding); standing players get the whole body. The clips never move
     the player: the root's travel is taken out of every action clip (the game moves him, as before).
     Packs load in the background; any pack that fails -> its actions keep the v3.28T look (run/idle + tip-over). MENU: MATCH MOVES. ============ */
  const KK_ACT={packs:[['medium_general',['Throw','Hit_A','Hit_B','Death_A','Death_B','Interact','Use_Item']],
    ['medium_movementadvanced',['Dodge_Left','Dodge_Right','Dodge_Forward','Dodge_Backward','Walking_Backwards','Running_Strafe_Left','Running_Strafe_Right','Crouching']],
    ['medium_combatmelee',['Melee_2H_Attack_Spinning','Melee_Unarmed_Attack_Punch_A','Melee_Blocking','Melee_Block_Attack','Melee_Block_Hit','Melee_Unarmed_Attack_Kick','Melee_1H_Attack_Slice_Horizontal','Melee_Unarmed_Idle']],
    ['medium_movementbasic',['Jump_Idle','Jump_Start','Jump_Land','Jump_Full_Short','Walking_B','Walking_C']],['medium_simulation',['Lie_StandUp','Sit_Floor_StandUp','Cheering','Waving','Sit_Floor_Idle','Push_Ups']],
    ['medium_special',['Skeletons_Taunt','Skeletons_Taunt_Longer','Skeletons_Idle']],['medium_tools',['Holding_A']],['medium_combatranged',['Ranged_Magic_Raise']]]};
  const KA={got:{},bad:{},ev:{},all:false,off:false,n:0,log:[],fs:{}};
  try{if(localStorage.getItem('cf_kka')==='0')KA.off=true}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  const KACFG=window.KACFG={fout:.14,
    fall:{Death_A:{T:.4,s:0,a:.7},Death_B:{T:.5,s:.3,a:.68}},     // game seconds to reach the ground; s..a = the part of the clip played (he lands at a)
    getup:{Death_A:{n:'Lie_StandUp',a:.25,b:1},Death_B:{n:'Sit_Floor_StandUp',a:0,b:1},T:.5,minStun:.5,fin:.18},   // the last T s of a knock-down: up on his feet as the stun ends
    juke:{a:0,b:.9},spin:{n:'Melee_2H_Attack_Spinning'},
    stiff:{n:'Melee_Unarmed_Attack_Punch_A',mirror:1,a:.3,p:.45,b:.75},   // clip fractions: start, arm fully out (held), end
    thr:{n:'Throw',rel:.52,a:.18},                                  // rel = fraction of the clip where the ball leaves the hand
    catch:{n:'Jump_Idle',t:.5},lunge:{n:'Dodge_Forward',t:.55},
    block:{O:'Melee_Blocking',D:'Melee_Block_Attack',beat:'Melee_Block_Hit'},hit:{n:'Hit_A',T:.5},
    kick:{n:'Melee_Unarmed_Attack_Kick',hit:.46},back:{in:2.25,out:2.0},strafe:{in:1.05,out:.85},moving:.6,
    // v3.30T
    handoff:{qb:'Interact',qa:.15,qp:.45,rb:'Holding_A',rt:.3,hold:.35},swim:'Melee_1H_Attack_Slice_Horizontal',power:'Melee_Block_Attack',
    hurdle:['Jump_Start','Jump_Idle','Jump_Land'],dive:'Dodge_Forward',style:['Skeletons_Taunt','Skeletons_Taunt_Longer','Cheering'],lat:{n:'Throw',a:.45,b:.95},
    star:{n:'Ranged_Magic_Raise',T:.6,a:.1,b:.6},turbo:'Running_B',bigHit:{n:'Hit_B',T:.15},whiff:'Hit_B',truck:'Melee_Block_Attack',dizzy:'Skeletons_Idle',
    deep:18,contest:.35,pile:{c:'Melee_Blocking',d:'Melee_Block_Attack'},
    celeb:['Cheering','Jump_Full_Short','Skeletons_Taunt'],mates:['Cheering','Waving','Jump_Full_Short'],sack:'Skeletons_Taunt_Longer',pick:'Cheering',
    stance:{line:'Crouching',lineT:0,def:'Melee_Unarmed_Idle'},huddle:{on:1,jog:4.6,delay:.55,ring:1.7,back:7,wait:.35,maxT:1.4,setX:2.5,crouch:'Crouching'},walks:['Walking_A','Walking_B','Walking_C'],
    end:{win:['Cheering','Jump_Full_Short','Waving'],loss:['Sit_Floor_Idle','Idle_B','Sit_Floor_Idle']},prev:['Idle_B','Cheering','Push_Ups'],fps:15};
  let KQ=null,KV3=null;   // made with the first rig (three.js loads after this module)
  const KUP=new Set(['spine','chest','head','upperarm_l','lowerarm_l','wrist_l','hand_l','upperarm_r','lowerarm_r','wrist_r','hand_r']);
  let KALL=null,KREST=null;
  function kkSets(){if(KALL)return;KQ=new T.Quaternion();KV3=new T.Vector3();KALL=new Set(KK.BN);KREST={};KK.BN.forEach((n,b)=>{KREST[n]={q:new T.Quaternion().fromArray(KK.REST[b][1]),p:new T.Vector3().fromArray(KK.REST[b][0])}})}
  function kkMirror(c){   // the same move with the other arm: swap left/right bones and mirror across the body's centre line
    const sw=n=>n.replace(/_l\b/,'_#').replace(/_r\b/,'_l').replace(/_#/,'_r');
    return new T.AnimationClip(c.name+'_M',c.duration,c.tracks.map(t=>{const [bn,pp]=t.name.split('.'),v=Float32Array.from(t.values);
      if(pp==='quaternion')for(let i=0;i<v.length;i+=4){v[i+1]=-v[i+1];v[i+2]=-v[i+2]}else if(pp==='position')for(let i=0;i<v.length;i+=3)v[i]=-v[i];
      return new t.constructor(sw(bn)+'.'+pp,Float32Array.from(t.times),v)}))}
  function kkEval(c){const E={dur:c.duration,tr:[],has:{}};for(const t of c.tracks){const [bn,pp]=t.name.split('.');if(KK.BN.indexOf(bn)<0||pp==='scale')continue;
      E.tr.push({bn,q:pp==='quaternion',ip:t.createInterpolant()});E.has[bn+(pp==='quaternion'?'q':'p')]=1}return E}
  function kkAddClip(c){KK.clips[c.name]=c;KA.ev[c.name]=kkEval(c);KA.n++}
  function kkExtra(){   // merge the action clips as their files arrive (the match never waits for them)
    if(KA.all||!KK.ok||!window.KKLIB)return;kkSets();let all=true;
    for(const [pk,names] of KK_ACT.packs){const key=pk+'|'+names.join(',');if(KA.got[key]||KA.bad[pk])continue;
      if(!KKLIB.has(pk)){if(KKLIB.done||KKLIB.failed(pk))KA.bad[pk]='file missing';else all=false;continue}
      try{const cl=kkClipPack(pk,names);
        for(const n of names){const c0=cl[n];if(!c0)continue;const c=new T.AnimationClip(n,c0.duration,c0.tracks.filter(t=>t.name!=='root.position'));   // the clip never carries the player
          kkAddClip(c);if(n===KACFG.stiff.n)kkAddClip(kkMirror(c))}
        KA.got[key]=1}catch(e){KA.bad[pk]=String(e&&e.message||e);try{console.warn('[CF] match moves pack '+pk+' off: '+KA.bad[pk])}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}}
    if(all)KA.all=true}
  function kkRestPose(r){kkSets();const RS=r.rest||KREST;for(const n of KK.BN){const b=r.B[n];if(!b)continue;b.quaternion.copy(RS[n].q);b.position.copy(RS[n].p)}}   // bones the run clip doesn't drive must not keep an old action's pose
  function kkAct(r,n){let a=r.act[n];const c=r.lg?kbClip(n):KK.clips[n];if(!a&&c){a=r.act[n]=r.mixer.clipAction(c);a.enabled=true}return a}
  const kkHas=n=>!KA.off&&!!KA.ev[n];
  function kkGameRate(){try{return F&&F.mode==='live'?LIVE_SPEED*SPEED*timeScale*(hitStop>0?.03:1):1}catch(e){return 1}}
  function kkFoot2(name){   // like kkFootSpeed, but any direction (backwards walk, strafes): planted-foot speed in the ground plane
    if(name in KA.fs)return KA.fs[name];KA.fs[name]=0;const clip=KK.clips[name];if(!clip)return 0;
    const r=kkMakeRig(98),a=kkAct(r,name),n=64,dt=clip.duration/n,v=new T.Vector3(),Fp={l:[],r:[]};a.play();
    for(let i=0;i<=n;i++){r.mixer.setTime(i*dt);r.N.root.updateMatrixWorld(true);for(const k of ['l','r']){r.B['foot_'+k].getWorldPosition(v);Fp[k].push([v.x,v.y,v.z])}}
    let sum=0,cnt=0;for(const k of ['l','r']){const f=Fp[k],mn=Math.min(...f.map(q=>q[1]));for(let i=0;i<n;i++){if(f[i][1]<mn+.035&&f[i+1][1]<mn+.035){sum+=Math.hypot(f[i+1][0]-f[i][0],f[i+1][2]-f[i][2])/dt;cnt++}}}
    r.mesh.removeFromParent();r.N.root.removeFromParent();r.mixer.stopAllAction();return KA.fs[name]=cnt?sum/cnt:0}
  function kkProbe(name,bones,n){   // tests / tuning: world positions of some bones over a clip (model units, feet at 0)
    const clip=KK.clips[name];if(!clip)return null;const r=kkMakeRig(97),a=kkAct(r,name),v=new T.Vector3(),out=[];n=n||24;a.play();
    for(let i=0;i<=n;i++){r.mixer.setTime(i*clip.duration/n);r.N.root.updateMatrixWorld(true);out.push(bones.map(b=>{r.B[b].getWorldPosition(v);return[+v.x.toFixed(3),+v.y.toFixed(3),+v.z.toFixed(3)]}))}
    r.mesh.removeFromParent();r.N.root.removeFromParent();r.mixer.stopAllAction();return{dur:clip.duration,out}}
  function kkOvApply(r,o){   // pose = clip at time o.t, weight o.w, only the bones in o.set (bones the clip leaves at rest go to rest)
    const E0=KA.ev[o.n],E=r.lg?kbEv(o.n):E0;if(!E||!E0||o.w<=0)return;const t=Math.min(Math.max(r.lg?o.t/E0.dur*E.dur:o.t,0),E.dur),w=Math.min(1,o.w),RS=r.rest||KREST;
    for(const x of E.tr){if(!o.set.has(x.bn))continue;const v=x.ip.evaluate(t),b=r.B[x.bn];if(x.q)b.quaternion.slerp(KQ.fromArray(v),w);else b.position.lerp(KV3.fromArray(v),w)}
    for(const bn of o.set){const b=r.B[bn];if(!b)continue;if(!E.has[bn+'q'])b.quaternion.slerp(RS[bn].q,w);if(o.set===KALL&&!E.has[bn+'p'])b.position.lerp(RS[bn].p,w)}}
  function kkLeft(r){const e=r.N.yaw.matrixWorld.elements;return[e[0],e[1]]}   // the figure's own left, on screen (scene x right, y up)
  function kkSide(r,pr,wx,wy){const q=P(wx,wy),l=kkLeft(r);return(q.sx-pr.sx)*l[0]-(q.sy-pr.sy)*l[1]}   // > 0: that world point is on his left
  function kkLoco(p,r,pr,spd,need,yw,sc){   // backpedal / side-step while facing upfield (QB dropback, pass protection): no moonwalking
    if(KA.off||spd<.4||!F||(F.mode!=='live'&&F.mode!=='pre'))return null;const d=Math.abs(angDiff(p.fa,Math.atan2(p.vy,p.vx))),C=KACFG,was=r.loco||'';let k='';
    if(kkHas('Walking_Backwards')&&(was==='B'?d>C.back.out:d>C.back.in))k='B';
    else if(kkHas('Running_Strafe_Left')&&kkHas('Running_Strafe_Right')&&(was==='S'?d>C.strafe.out:d>C.strafe.in)&&d<C.back.in)k='S';
    r.loco=k;if(!k)return null;
    if(k==='B'){const fs=kkF2(r,'Walking_Backwards');return fs>0?{clip:'Walking_Backwards',ts:clamp(need/fs,KKCFG.syncMin,KKCFG.syncMax)}:null}
    const left=kkSide(r,pr,p.x+p.vx*.2,p.y+p.vy*.2)>0,n=left?'Running_Strafe_Left':'Running_Strafe_Right',fs=kkF2(r,n);
    const perS=sc*Math.hypot(Math.cos(yw),Math.sin(yw)*Math.sin(CFG.tilt)),perF=sc*Math.hypot(Math.sin(yw),Math.cos(yw)*Math.sin(CFG.tilt));   // side-on travel has its own screen scale
    return fs>0?{clip:n,ts:clamp(need*(perF/Math.max(perS,1e-3))/fs,KKCFG.syncMin,KKCFG.syncMax)}:null}
  function kkPick(p,r,lying,spd,pr,now){   // which action (if any) this player is doing right now, and where in its clip
    const C=KACFG,mv=spd>C.moving,up=mv?KUP:KALL;r.noTw=false;r.lieOv=false;if(!(p.stun>0))r.st1=0;
    if(lying){
      if(!r.ly){r.ly=1;r.lyE=0;r.st0=p.stun||0;r.fv=r.dv?0:(p.fallV||0);r.big=!r.dv&&typeof timeScale!=='undefined'&&timeScale<1&&kkHas(C.bigHit.n);r.dvs=r.dv;r.dv=0}
      if(r.big&&r.lyE<C.bigHit.T){const E=KA.ev[C.bigHit.n];r.lieOv=true;return{n:C.bigHit.n,t:r.lyE/C.bigHit.T*.5*E.dur,set:KALL,fin:.03,lie:1}}   // BIG HIT: the jolt before he goes down
      const fn=r.fv===0?'Death_B':'Death_A',G=C.getup[fn],gu=G&&kkHas(G.n)&&r.st0>=C.getup.minStun&&r.st0<4?Math.min(C.getup.T,r.st0*.5):0;
      if(gu>0&&p.stun>0&&p.stun<gu){const E=KA.ev[G.n],k=1-p.stun/gu;r.lieOv=true;return{n:G.n,t:(G.a+(G.b-G.a)*k)*E.dur,set:KALL,fin:C.getup.fin,lie:1}}
      if(kkHas(fn)){const E=KA.ev[fn],f=C.fall[fn],a=f.a||1,s0=r.dvs?.55:f.s,le=Math.max(0,r.lyE-(r.big?C.bigHit.T:0));r.lieOv=true;return{n:fn,t:(s0+(a-s0)*Math.min(1,le/f.T))*E.dur,set:KALL,fin:.05,lie:1}}
      return null}
    r.ly=0;if(!F||(F.mode!=='live'&&!(typeof REP!=='undefined'&&REP.act)))return kkPresent(p,r,spd,pr,now);   // replays restore every timer, so the moves replay too   // after the whistle every timer stops: only the presentation moments below (players already down stay down)
    const loop=(n,o)=>(now/1000*1+(o||0))%KA.ev[n].dur;
    if(F.pile&&(p===F.pile.c||p===F.pile.d)){const n=p===F.pile.c?C.pile.c:C.pile.d;if(kkHas(n))return{n,t:loop(n,r.ph),set:KALL,fin:.1}}   // the pile push
    if(p.hurdle&&p.air&&kkHas(C.hurdle[0])&&kkHas(C.hurdle[1])&&kkHas(C.hurdle[2])){const k=Math.min(1,p.air.t/p.air.T);r.noTw=true;   // hurdle: take off, tuck, land (the game lifts him)
      const [a,b,c]=C.hurdle;return k<.3?{n:a,t:(.3+.7*k/.3)*KA.ev[a].dur,set:KALL,fin:.03}:k<.7?{n:b,t:loop(b),set:KALL,fin:.03}:{n:c,t:(k-.7)/.3*.6*KA.ev[c].dur,set:KALL,fin:.03}}
    if(p.dive&&kkHas(C.dive)&&kkHas('Death_B')){const k=Math.min(1,p.dive.t/p.dive.T);r.dv=1;   // goal-line dive: lunge, ball arm out, then flat out forwards
      return k<.55?{n:C.dive,t:k/.55*.6*KA.ev[C.dive].dur,set:KALL,fin:.03}:{n:'Death_B',t:(.45+.2*(k-.55)/.45)*KA.ev.Death_B.dur,set:KALL,fin:.05}}
    if(p.dash&&MOVE_J.t>0&&kkHas('Dodge_Left')&&kkHas('Dodge_Right')){r.noTw=true;
      if(r.jk!==p.dash){r.jk=p.dash;r.jkL=kkSide(r,pr,p.x-Math.sin(p.h)*(p.jkSide||1),p.y+Math.cos(p.h)*(p.jkSide||1))>0}   // which way he cuts, on his own body
      const n=r.jkL?'Dodge_Left':'Dodge_Right',k=1-Math.max(0,p.dash.t)/MOVE_J.t;return{n,t:(C.juke.a+(C.juke.b-C.juke.a)*k)*KA.ev[n].dur,set:KALL,fin:.03}}
    if(p.spin>0&&kkHas(C.spin.n)){const T0=p.spinT>0?SPIN.t:p.moveAnim&&p.moveAnim.name==='spin'?.35:0;
      if(T0>0){r.noTw=true;const k=1-Math.min(T0,p.spinT>0?p.spinT:p.spin)/T0;return{n:C.spin.n,t:k*KA.ev[C.spin.n].dur,set:KALL,fin:.03}}}
    if(p.arm>0&&kkHas(C.stiff.n)){const n=C.stiff.mirror?C.stiff.n+'_M':C.stiff.n,E=KA.ev[n];if(E){const k=1-p.arm/.4,S=C.stiff;   // the free (left) arm: the ball stays in the right hand
      const f=k<.25?S.a+(S.p-S.a)*k/.25:k<.75?S.p:S.p+(S.b-S.p)*(k-.75)/.25;return{n,t:f*E.dur,set:up,fin:.04}}}
    if(p.throwT>0&&kkHas(C.thr.n)){const E=KA.ev[C.thr.n],k=1-p.throwT/.45,rel=.22/.45,S=C.thr;   // the ball leaves the hand when F.ball.t reaches 0 = 0.22 s into the 0.45 s throw
      const f=k<rel?S.a+(S.rel-S.a)*k/rel:S.rel+(1-S.rel)*(k-rel)/(1-rel);return{n:C.thr.n,t:f*E.dur,set:up,fin:.05}}
    if(F.lat&&!F.latDone&&F.off){const k=Math.min(1,F.latT/.45);   // flea-flicker lateral: the runner tosses it back, the QB takes it
      if(p===F.off.RB&&kkHas(C.lat.n))return{n:C.lat.n,t:(C.lat.a+(C.lat.b-C.lat.a)*k)*KA.ev[C.lat.n].dur,set:up,fin:.04};
      if(p===F.off.QB&&kkHas(C.catch.n))return{n:C.catch.n,t:C.catch.t*KA.ev[C.catch.n].dur,set:KUP,fin:.08}}
    if(F.off&&F.off.RB&&F.off.QB&&typeof PLAY!=='undefined'&&PLAY&&(PLAY.kind==='run'||PLAY.kind==='flea')){const Q=F.off.QB,RB=F.off.RB,H0=KA.hand;   // handoff: QB holds it out, runner takes it and secures it
      if(F.handed&&(!H0||H0.F!==F))KA.hand={F,t:F.t};
      if(!F.handed&&!F.snap&&F.carrier===Q){const dh=Math.hypot(RB.x-Q.x,RB.y-Q.y);
        if(p===Q&&dh<3.6&&kkHas(C.handoff.qb)){const k=Math.min(1,(3.6-dh)/2.4),H=C.handoff;return{n:H.qb,t:(H.qa+(H.qp-H.qa)*k)*KA.ev[H.qb].dur,set:up,fin:.08}}
        if(p===RB&&dh<3.2&&kkHas(C.handoff.rb))return{n:C.handoff.rb,t:C.handoff.rt*KA.ev[C.handoff.rb].dur,set:KUP,fin:.1}}
      if(p===RB&&F.handed&&KA.hand&&KA.hand.F===F&&F.t-KA.hand.t<C.handoff.hold&&kkHas(C.handoff.rb))return{n:C.handoff.rb,t:C.handoff.rt*KA.ev[C.handoff.rb].dur,set:KUP,fin:.05}}
    if(F&&F.ballAir&&F.ball&&F.ball.t>=0){const B=F.ball;
      if(p===B.target&&dist(p,B.cur)<5){if(B.len>C.deep&&dist(p,B.cur)<2.6&&kkHas('Jump_Start')&&kkHas('Jump_Idle')){const d0=dist(p,B.cur);return d0>1.3?{n:'Jump_Start',t:(.35+.65*(2.6-d0)/1.3)*KA.ev.Jump_Start.dur,set:KALL,fin:.05}:{n:'Jump_Idle',t:loop('Jump_Idle'),set:KALL,fin:.05}}   // deep ball: he leaves his feet for it
        if(kkHas(C.catch.n))return{n:C.catch.n,t:C.catch.t*KA.ev[C.catch.n].dur,set:KUP,fin:.12}}
      if(p.team==='D'&&!p.eng&&B.T-B.t<C.contest&&dist(p,B.to)<2.2&&kkHas(C.catch.n))return{n:C.catch.n,t:C.catch.t*KA.ev[C.catch.n].dur,set:KUP,fin:.06}}   // defender going up for it (pick or break-up)
    if(p===F.carrier&&F.gb){if(!KA.star||KA.star.F!==F)KA.star={F,t:F.t};const e=F.t-KA.star.t,S=C.star;if(e<S.T&&kkHas(S.n))return{n:S.n,t:(S.a+(S.b-S.a)*e/S.T)*KA.ev[S.n].dur,set:KUP,fin:.06}}   // star play: power-up pose
    if(p.moveAnim&&(p.moveAnim.name==='swim'||p.moveAnim.name==='power')){const n=p.moveAnim.name==='swim'?C.swim:C.power;if(kkHas(n)){const k=1-Math.max(0,p.moveAnim.t)/.4;return{n,t:(.15+.6*k)*KA.ev[n].dur,set:up,fin:.04}}}   // pass rush moves
    if(p.shoveTo&&F.t<p.shoveTo&&kkHas(C.truck)){const k=1-(p.shoveTo-F.t)/.35;return{n:C.truck,t:(.2+.4*k)*KA.ev[C.truck].dur,set:up,fin:.04}}   // TRUCKED: shoulder shove
    if(p.whiffTo&&F.t<p.whiffTo&&!p.dash&&kkHas(C.whiff)){const k=1-(p.whiffTo-F.t)/.35;return{n:C.whiff,t:k*.6*KA.ev[C.whiff].dur,set:up,fin:.04}}   // TOO EARLY: a stumble
    if(p.dizzy&&p.stun>0&&kkHas(C.dizzy))return{n:C.dizzy,t:loop(C.dizzy,r.ph*4),set:mv?KUP:KALL,fin:.12};   // spun out: seeing stars
    if(p.eng&&kkHas(C.block[p.team==='D'?'D':'O'])){const n=C.block[p.team==='D'?'D':'O'],E=KA.ev[n];return{n,t:((now/1000*kkGameRate()+r.ph*3)%E.dur),set:up,fin:.12}}
    if(p.lunge>0&&kkHas(C.lunge.n))return{n:C.lunge.n,t:C.lunge.t*KA.ev[C.lunge.n].dur,set:KUP,fin:.08};
    if(p.stun>0&&!p.dizzy){if(!(r.st1>0)||p.stun>r.st1+.01)r.st0s=p.stun;r.st1=p.stun;
      const n=p.beat>0&&kkHas(C.block.beat)?C.block.beat:C.hit.n;if(kkHas(n)){const E=KA.ev[n],k=Math.min(1,(r.st0s-p.stun)/Math.min(C.hit.T,r.st0s||C.hit.T));return{n,t:k*E.dur,set:up,fin:.04}}}
    if(p===F.carrier&&p.styleOn&&!F.ballAir){const n=C.style[(p.styleKind|0)%3];if(kkHas(n))return{n,t:loop(n),set:KUP,fin:.1}}   // STYLE: showboating
    return null}
  const KD=new WeakMap();   // per play: when the whistle went (presentation timing)
  function kkPresent(p,r,spd,pr,now){   // after the whistle and before the snap: celebrations, huddle, stances (looks only)
    const C=KACFG,s=now/1000,res=F&&F.res,loop=(n,o)=>((s+(o||0))%KA.ev[n].dur+KA.ev[n].dur)%KA.ev[n].dur;let d=KD.get(F);if(!d){d={t:s};KD.set(F,d)}const e=s-d.t;
    if(typeof REP!=='undefined'&&REP.act)return null;
    if(pr&&pr.hv&&pr.hv.wait&&kkHas(C.huddle.crouch))return{n:C.huddle.crouch,t:(C.stance.lineT||0)*KA.ev[C.huddle.crouch].dur,set:KALL,fin:.2};   // in the huddle
    if(F.mode==='pre'){if(pr&&pr.hv)return null;const ln=/^OL|^TE$/.test(p.role||'')||p.pos==='DL',df=p.team==='D'&&!ln,n=ln?C.stance.line:df?C.stance.def:'';   // stances at the line
      return n&&kkHas(n)&&spd<.3?{n,t:ln?(C.stance.lineT||0)*KA.ev[n].dur:loop(n,r.ph),set:KALL,fin:.25}:null}
    if(!res)return null;
    if(p.celeb>0){const n=C.celeb[(p.celebV|0)%3];if(kkHas(n))return{n,t:loop(n),set:KALL,fin:.1}}   // the scorer
    if(res.type==='td'&&p.team==='O'&&!p.fall){const dl=.3+(r.i%4)*.15,n=C.mates[r.i%3];if(e>dl&&kkHas(n))return{n,t:loop(n,-dl),set:KALL,fin:.15}}   // teammates join in
    const Q=F.off&&F.off.QB;
    if(p.team==='D'&&!p.fall&&(res.type==='int'||(res.type==='tackle'&&Q&&F.passer===Q&&F.carrier===Q&&res.spot<F.los-.4))){   // the defense: a pick or a sack
      const at=res.type==='int'?(F.carrier&&F.carrier.team==='D'?F.carrier:null):Q;let best=null,bd=1e9;for(const q of F.def){if(q.fall)continue;const dd=at?Math.hypot(q.x-at.x,q.y-at.y):Math.abs(q.y-res.spot);if(dd<bd){bd=dd;best=q}}
      if(best===p){const n=res.type==='int'?C.pick:C.sack;if(e>.2&&kkHas(n))return{n,t:loop(n,-.2),set:KALL,fin:.15}}}
    return null}
  function kkActions(p,r,lying,spd,pr,dt,now){   // pick + fade + pose; returns the action now showing (or null)
    if(lying)r.lyE=(r.lyE||0)+dt*kkGameRate();else if(!(p.dive))r.dv=r.dv&&p.fall?1:0;r.hvNow=pr&&pr.hv?(pr.hv.wait?2:1):0;
    const a=KA.off||!KA.n?(r.noTw=r.lieOv=false,null):kkPick(p,r,lying,spd,pr,now),o=r.ov||(r.ov={cur:null,prev:null});
    if(a){if(o.cur&&o.cur.n===a.n){o.cur.t=a.t;o.cur.set=a.set}else{if(o.cur)o.prev=o.cur;o.cur={n:a.n,t:a.t,set:a.set,w:0,fin:a.fin||.08,lie:a.lie};
        if(KA.log.length<400)KA.log.push({n:a.n,role:p.role,team:p.team,ft:F&&+F.t.toFixed(2),mode:F&&F.mode})}}
    else if(o.cur){if(o.cur.lie&&!lying&&!/StandUp/.test(o.cur.n)&&(!F||F.mode!=='live')){o.cur=null;o.prev=null}else{o.prev=o.cur;o.cur=null}}   // a new play puts a downed player straight back in his stance (no fade from lying)
    if(o.prev){o.prev.w-=dt/KACFG.fout;if(o.prev.w<=0)o.prev=null}
    if(o.cur)o.cur.w=Math.min(1,o.cur.w+dt/o.cur.fin);
    if(o.prev)kkOvApply(r,o.prev);if(o.cur)kkOvApply(r,o.cur);
    if(o.prev&&o.prev.lie&&!o.cur)r.fallK=0;   // getting up: the figure is already upright, no tip-back
    return o.cur}
  /* FIELD GOAL: the kick is a 4th-down choice with no live play, so the KayKit kicker plays his kick in the result banner (pictures made
     once, then flipped through while the banner shows; the banner's text, timing and the result are unchanged). */
  function kkKick(good,ms,kind){
    try{if(!KK.want||!KK.ok||KA.off)return false;kkExtra();const n=KACFG.kick.n;if(!kkHas(n))return false;const b=document.getElementById('banner');if(!b)return false;
      const dpr=Math.min(2,window.devicePixelRatio||1),cw2=Math.round(Math.min(260,window.innerWidth*.6)),ch2=Math.round(cw2*.55),W2=Math.round(cw2*dpr),H2=Math.round(ch2*dpr);
      const fr=10,E=KA.ev[n],sheet=document.createElement('canvas');sheet.width=W2*fr;sheet.height=H2;const one=document.createElement('canvas');one.width=W2;one.height=H2;const sg=sheet.getContext('2d');
      let q=null;try{q=F&&F.off&&(F.off.RB||F.off.QB)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}const u=q?(q._uni||uniFor(q)):(SAVE&&SAVE.uni);
      for(let i=0;i<fr;i++){if(!kkShowcase(one,[{x:.3,yaw:Math.PI/2*.9,clip:n,t:E.dur*i/(fr-1),uni:u,num:3,d:{name:'Kicker',pos:'WR'},tilt:.15,zoom:.8}],'#244a2c'))return false;sg.drawImage(one,i*W2,0)}
      const cv=document.createElement('canvas');cv.width=W2;cv.height=H2;cv.id='kkKick';cv.style.cssText='display:block;margin:6px auto 0;width:'+cw2+'px;height:'+ch2+'px;border-radius:8px';
      const old=document.getElementById('kkKick');if(old)old.remove();b.appendChild(cv);const g=cv.getContext('2d'),t0=performance.now(),D=(ms||1400)/Math.max(1,SPEED),hit=KACFG.kick.hit;
      const loop=()=>{if(!cv.isConnected)return;const e=(performance.now()-t0)/D,k=Math.min(1,e/.55),fi=Math.min(fr-1,Math.round(k*(fr-1)));g.drawImage(sheet,fi*W2,0,W2,H2,0,0,W2,H2);
        const px=W2*.86,base=H2*.92,punt=kind==='punt';if(!punt){g.strokeStyle='#ffd23a';g.lineWidth=Math.max(2,W2/90);g.beginPath();g.moveTo(px,base);g.lineTo(px,H2*.55);g.moveTo(px-W2*.07,H2*.55);g.lineTo(px+W2*.07,H2*.55);g.moveTo(px-W2*.07,H2*.55);g.lineTo(px-W2*.07,H2*.12);g.moveTo(px+W2*.07,H2*.55);g.lineTo(px+W2*.07,H2*.12);g.stroke()}
        const bx0=W2*.4,by0=H2*.86;let bx=bx0,by=by0;if(k>hit){const f=Math.min(1,(e-.55*hit)/.5);if(punt){bx=bx0+(W2*1.1-bx0)*f;by=by0-(by0+H2*.15)*Math.sin(f*Math.PI*.8)}else if(good){bx=bx0+(px-bx0)*f;by=by0-(by0-H2*.22)*Math.sin(f*Math.PI*.62)/Math.sin(Math.PI*.62)}
          else{const f1=Math.min(1,f/.8);bx=bx0+(px+W2*.07-bx0)*f1;by=by0-(by0-H2*.3)*Math.sin(f1*Math.PI*.55);if(f>.8)by+=(f-.8)*H2*1.5}}
        g.fillStyle='#8a4a22';g.beginPath();g.ellipse(bx,by,W2/45,W2/70,-.5,0,7);g.fill();if(e<1.2)requestAnimationFrame(loop)};loop();return true}
    catch(e){try{console.warn('[CF] kick picture off: '+(e&&e.message||e))}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return false}}
  function kkSample(){   // tests: one row per KayKit player this frame (nothing here is used by the game)
    const out=[],v=new T.Vector3(),w=new T.Vector3();for(const [p,r] of KK.bind){if(!r.mesh.visible)continue;r.B.hips.getWorldPosition(v);r.N.root.getWorldPosition(w);
      const sc=r.N.root.scale.x||1,o=r.ovNow,carry=p===F.carrier&&!F.ballAir&&F.mode!=='pre'&&!F.snap;
      out.push({id:p.id||p.role,role:p.role,team:p.team,ov:o?o.n:'',ovw:o?+o.w.toFixed(2):0,ovk:o&&KA.ev[o.n]?+(o.t/KA.ev[o.n].dur).toFixed(3):0,full:!!(o&&o.set===KALL),loco:r.loco||'',clip:r.cur,
        hud:r.hvNow||0,ovt:o?+o.t.toFixed(3):0,        fallK:+(r.fallK||0).toFixed(3),ball:r.ball.visible,carry,lying:!!(p.fall||(p.knock&&p.stun>0)),stun:+(p.stun||0).toFixed(3),spd:+Math.hypot(p.vx||0,p.vy||0).toFixed(2),dash:!!p.dash,
        big:!!r.lg,hipsOff:+(Math.hypot(v.x-w.x,v.y-w.y)/sc/r.uk).toFixed(3),headY:(()=>{r.B.head.getWorldPosition(v);return+((v.y-w.y)/sc/r.uk).toFixed(3)})(),sx:+r.N.root.position.x.toFixed(1),fx:r.fxy?+r.fxy[0].toFixed(3):0,fy:r.fxy?+r.fxy[1].toFixed(3):0,rad:(()=>{if(!r.fxy)return 0;const q0=P(r.fxy[0],r.fxy[1]),q1=P(r.fxy[0]+1,r.fxy[1]),ppy=Math.abs(q1.sx-q0.sx)||1;return+((r.lg?KB.padHW:KKCFG.pads.r[0])*sc/ppy).toFixed(3)})(),eng:p.eng?(p.eng.id||p.eng.role):'',sy:+r.N.root.position.y.toFixed(1),rsc:+sc.toFixed(2)})}
    return out}

  /* ---------- v3.30T HUDDLE WALK (looks only): after the whistle the offense jogs toward a huddle 7 yd behind the next spot; the new
     formation starts in the huddle and breaks out to the real spots. Only the drawing moves: every real position, the snap, the play
     clock and the menus are untouched. Snapping early just finishes the walk at once. ---------- */
  const KH=new WeakMap();let KHlast=null;KA.pops=0;
  function kkHud(list){
    const C=KACFG.huddle;if(!C.on||KA.off||!KA.n||!KK.ok||!F||!F.off||(typeof REP!=='undefined'&&REP.act))return;
    const s=performance.now()/1000,off=list.filter(e=>e.p.team==='O'&&kkUse(e.p)).sort((a,b)=>(a.p.role<b.p.role?-1:1));if(!off.length)return;
    let h=KH.get(F);const res=F.res;
    if(F.mode==='dead'&&res&&/^(tackle|oob|inc|flag)$/.test(res.type)){
      if(!h||h.k!=='in'){const bx=res.type==='inc'||res.type==='flag'?CX:clamp((F.carrier||F.off.QB).x,8,FW-8),by=(res.type==='inc'||res.type==='flag'?F.los:res.spot)-C.back;
        h={k:'in',t:s,cx:bx,cy:by,P:new Map()};KH.set(F,h);off.forEach((e,i)=>{const a=i/off.length*TAU;h.P.set(e.p,{x0:e.p.x,y0:e.p.y,tx:bx+Math.cos(a)*C.ring,ty:by+Math.sin(a)*C.ring})})}
      KHlast={cx:h.cx,cy:h.cy,F};
      for(const e of off){const q=h.P.get(e.p);if(!q||e.p.fall||(e.p.knock&&e.p.stun>0))continue;const dx=q.tx-q.x0,dy=q.ty-q.y0,D=Math.hypot(dx,dy),go=Math.max(0,s-h.t-C.delay)*C.jog,m=Math.min(D,go),ux=D?dx/D:0,uy=D?dy/D:0;
        const x=q.x0+ux*m,y=q.y0+uy*m,mov=go>0&&m<D;kkSet(e,x,y,mov?ux*C.jog:0,mov?uy*C.jog:0,mov?Math.atan2(uy,ux):(go>0?Math.atan2(h.cy-y,h.cx-x):e.p.fa),!mov&&go>0)}
      return}
    if(F.mode==='pre'){
      if(!h){const cx=F.off.QB?F.off.QB.x:CX,cy=F.los-C.back;h={k:'out',t:s,pr:0,ls:s,cx,cy,P:new Map()};KH.set(F,h);
        off.forEach((e,i)=>{const a=i/off.length*TAU,x0=cx+Math.cos(a)*C.ring,y0=cy+Math.sin(a)*C.ring,D=Math.hypot(e.p.x-x0,e.p.y-y0);h.P.set(e.p,{x0,y0,D,v:Math.max(C.jog,D/C.maxT)})})}
      const dt=Math.min(.1,s-h.ls);h.ls=s;h.pr+=dt*(G&&G.mode==='set'?C.setX:1);const w=h.pr-C.wait;
      for(const e of off){const q=h.P.get(e.p);if(!q)continue;const m=Math.min(q.D,Math.max(0,w)*q.v);if(m>=q.D)continue;const ux=(e.p.x-q.x0)/(q.D||1),uy=(e.p.y-q.y0)/(q.D||1);
        kkSet(e,q.x0+ux*m,q.y0+uy*m,w>0?ux*q.v:0,w>0?uy*q.v:0,w>0?Math.atan2(uy,ux):Math.atan2(h.cy-q.y0,h.cx-q.x0),w<=0)}
      return}
    if(F.mode==='live'&&h&&h.k==='out'&&!h.done){h.done=1;for(const [p,q] of h.P)if(h.pr-C.wait<q.D/q.v)KA.pops++}}   // snapped before they reached their spots: they are drawn on them (counted for tests)
  function kkSet(e,x,y,vx,vy,fa,wait){const pr=P(x,y);e.pr=Object.assign({},pr,{hv:{x,y,vx,vy,fa,wait}})}
  /* ---------- v3.30T STAGES: animated KayKit close-ups outside the field (MY TEAM / MY SQUAD / gear previews, the win/loss screen) ---------- */
  function kkStage(cvs,figs,size){   // figs: [{d,uni,num,yaw,x,clips:[...],per}]; runs at KACFG.fps while the canvas is on screen
    cvs._kkF=figs;if(size)cvs._kkS=size;if(cvs._kkOn)return kkStageDraw(cvs);cvs._kkOn=1;cvs._kkT0=performance.now();let last=0;
    const tick=t=>{if(!cvs.isConnected||!cvs.offsetParent||!KK.want||KK.err){cvs._kkOn=0;return}requestAnimationFrame(tick);if(t-last<1000/KACFG.fps)return;last=t;kkStageDraw(cvs)};
    requestAnimationFrame(tick);return kkStageDraw(cvs)}
  function kkStageDraw(cvs){try{kkExtra();const z=cvs._kkS,b=cvs.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(120,Math.round(b.width||z&&z[0]||340)),h=Math.max(80,Math.round(b.height||z&&z[1]||215)),pw=Math.round(w*dpr),ph=Math.round(h*dpr);
      if(cvs.width!==pw||cvs.height!==ph){cvs.width=pw;cvs.height=ph}const e=(performance.now()-cvs._kkT0)/1000;
      const figs=cvs._kkF.map((f,i)=>{const L=(f.clips||['Idle_B']).filter(n=>KK.clips[n]);const per=f.per||3.5,n=L.length?L[Math.floor(e/per)%L.length]:KKCFG.idleClip,c=KK.clips[n];
        return Object.assign({},f,{clip:n,t:((e+i*.37)%c.duration),tilt:f.tilt===undefined?.1:f.tilt})});
      return kkShowcase(cvs,figs,false)}catch(err){try{console.warn('[CF] KayKit stage off: '+(err&&err.message||err))}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return false}}
  function kkPreview(cvs,figs){   // MY TEAM / MY SQUAD / gear: KayKit figures instead of the classic ones (front + back so the number shows)
    if(!KK.want||KK.err||!kkInit())return false;const C=KACFG;
    return kkStage(cvs,figs.map((f,i)=>({d:f.d,uni:f.uni,num:f.num,yaw:f.yaw,x:f.x,clips:i===0?['Idle_B']:C.prev,per:4,zoom:.92})))}
  setTimeout(()=>{for(const [sid,aid,cid] of [['end','endScore','kkEndCv'],['steal','stScore','kkWinCv']]){const el=document.getElementById(sid);if(!el)continue;   // win / loss screens: three of your players, cheering or sitting
    new MutationObserver(()=>{if(el.hidden)return;let cv=document.getElementById(cid);
      try{if(!KK.want||KK.err||!kkInit())return;const win=sid==='steal'||(G&&G.you>G.opp),C=KACFG.end;let ps=[];try{ps=F&&F.all?F.all.filter(p=>p.team==='O'):[]}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
        const pick=['QB','RB','WR1'].map(r=>ps.find(p=>p.role===r)).filter(Boolean);if(!pick.length)return;
        if(!cv){cv=document.createElement('canvas');cv.id=cid;cv.style.cssText='display:block;margin:4px auto 6px;width:min(300px,78vw);height:120px';const sc=document.getElementById(aid);(sc||el.firstChild).after(cv)}
        kkStage(cv,pick.map((p,i)=>({d:p.d,uni:p._uni||uniFor(p),num:p.num,yaw:(i-1)*-.45,x:.2+i*.3,clips:[(win?C.win:C.loss)[i]],per:99,zoom:.85})),[300,120])}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}).observe(el,{attributes:true,attributeFilter:['hidden']})}},0);
  /* ============ v3.31T THE BIG GUY (CF_85 Build 3): offensive and defensive linemen wear the KayKit Mannequin_Large body (its own
     mesh, skeleton, face and its own big-body clips), not a scaled-up medium player. Look only (decision D5): hitboxes, positions,
     speeds, ratings, blocking odds and every timer are the game's own; this code only chooses which body is drawn and which clip
     it plays. The large skeleton has the same bone names and the same rest turns as the medium one (only longer bones), so every
     medium clip can also drive it: the turns are kept and the hip / foot travel is scaled to the longer legs ("retargeted").
     The big body's own clips are used where KayKit has them (idle, walk, run, blocking, hits, dodges, the big fall, flexing);
     the others borrow the medium clip, retargeted. Gear (helmet, pads, number) is rebuilt from the big body's own head and chest.
     Files missing or any error -> the linemen keep the medium body (exactly the v3.30T look). MENU: LINEMEN: BIG BODY / MEDIUM. ============ */
  const KBCFG=window.KBCFG={on:1,tall:1.13,head:1.12,shadow:1.45,gap:1.05,padY:1,tuck:1.6,num:{a:.95,b:2.05,asp:1.25},pad:[0.95, 0.9, 0.97],padDrop:0,
    who:p=>/^OL/.test(String(p.role||''))||p.pos==='DL'||p.pos==='OL',   // which players wear the big body (any player can be added here)
    // medium clip name (what the action layer asks for) -> the big body's own clip; anything not listed borrows the medium clip, retargeted
    map:{Idle_A:'Idle_A',Idle_B:'Idle_B',Running_A:'Running_A',Running_B:'Running_A',Walking_A:'Walking_A',Walking_B:'Walking_A',Walking_C:'Walking_A',
      Melee_Blocking:'Melee_Blocking',Melee_Block_Attack:'Melee_Block_Attack',Melee_Block_Hit:'Melee_Block_Hit',Melee_Unarmed_Idle:'Melee_Unarmed_Idle',
      Hit_A:'Hit_A',Hit_B:'Hit_A',Dodge_Left:'Dodge_Left',Dodge_Right:'Dodge_Right',Dodge_Forward:'Dodge_Forward',Dodge_Backward:'Dodge_Backwards',
      Melee_1H_Attack_Slice_Horizontal:'Melee_Unarmed_Punch',Cheering:'Flexing',Skeletons_Taunt_Longer:'Flexing'},
    packs:[['large_general',['Idle_A','Idle_B','Hit_A','Death_A']],['large_movementbasic',['Running_A','Walking_A']],
      ['large_movementadvanced',['Dodge_Left','Dodge_Right','Dodge_Forward','Dodge_Backwards']],
      ['large_combatmelee',['Melee_Blocking','Melee_Block_Attack','Melee_Block_Hit','Melee_Unarmed_Idle','Melee_Unarmed_Punch','Melee_Unarmed_Smash']],['large_simulation',['Flexing']]]};
  const KB={want:true,ok:false,tried:false,err:'',clips:{},ev:{},fs:{},nat:{},BN:[],PAR:[],REST:[],IBM:[],RS:null,uk:1,kH:1};
  try{if(localStorage.getItem('cf_kkb')==='0')KB.want=false}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  const kbIs=p=>!!(KBCFG.on&&KB.want&&p&&KBCFG.who(p)&&kbInit());
  function kbInit(){
    if(KB.ok||KB.tried)return KB.ok;if(!KK.ok)return false;const L=window.KKLIB,need=['mannequin_large'].concat(KBCFG.packs.map(p=>p[0]));
    if(!L||!need.every(n=>L.has(n))){const bad=L?need.filter(n=>L.failed(n)):need;if(!bad.length&&L&&!L.done)return false;   // still loading: medium body until the files are in
      KB.tried=true;KB.err='big-body files missing ('+bad.join(', ')+')';try{console.warn('[CF] big linemen off: '+KB.err);kbLab()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return false}
    KB.tried=true;try{kbLoad();KB.ok=true}catch(e){KB.err=String(e&&e.message||e);KB.ok=false;try{console.warn('[CF] big linemen off: '+KB.err);kbLab()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}
    return KB.ok}
  function kbLab(){const m=document.getElementById('mKB');if(m)m.textContent='LINEMEN: '+(KB.want?'BIG BODY (TEST)':'MEDIUM (v3.30T)')+(KB.err?' (BIG OFF: '+KB.err.slice(0,40)+')':'')}
  function kbBox(pos,si,bi,nv){const lo=[1e9,1e9,1e9],hi=[-1e9,-1e9,-1e9];for(let i=0;i<nv;i++){if(si[i*4]!==bi)continue;for(let c=0;c<3;c++){const v=pos[i*3+c];if(v<lo[c])lo[c]=v;if(v>hi[c])hi[c]=v}}
    return{lo,hi,c:[0,1,2].map(c=>(lo[c]+hi[c])/2),s:[0,1,2].map(c=>hi[c]-lo[c])}}
  function kbLoad(){
    const D=kkBodyData('mannequin_large'),H0=D.h,nv=D.nv,nb=D.nb,pos=D.pos,nor=D.nor,ji=D.ji,jw=D.jw,sl=D.sl,ibm=D.ibm;if(!sl||!D.face)throw new Error('big body has no colour slots');
    KB.BN=H0.bones.map(KBN);KB.PAR=H0.parents;KB.REST=H0.rest;for(let b=0;b<nb;b++)KB.IBM.push(new T.Matrix4().fromArray(ibm,b*16));
    for(const n of KK.BN){const a=KK.REST[KK.BN.indexOf(n)],b=KB.REST[KB.BN.indexOf(n)];if(!b)throw new Error('big body lacks bone '+n);   // same rest turns, or the medium clips would twist him
      if(Math.abs(a[1][0]*b[1][0]+a[1][1]*b[1][1]+a[1][2]*b[1][2]+a[1][3]*b[1][3])<.995)throw new Error('big body rest pose differs at '+n)}
    const bw=(BN,IBM,n)=>new T.Vector3().setFromMatrixPosition(IBM[BN.indexOf(n)].clone().invert());
    KB.HB=bw(KB.BN,KB.IBM,'head');KB.CB=bw(KB.BN,KB.IBM,'chest');KB.SB=bw(KB.BN,KB.IBM,'spine');
    KB.uk=KB.REST[KB.BN.indexOf('hips')][0][1]/KK.REST[KK.BN.indexOf('hips')][0][1];   // leg-length ratio (hip height), for retargeting
    // sizes of the medium and big heads and chests, from the meshes (for the helmet, pads and number)
    const gm=KK.geo,mp=gm.attributes.position.array,ms=gm.attributes.skinIndex.array,mN=gm.attributes.position.count;
    const si16=new Uint16Array(nv*4);for(let i=0;i<nv*4;i++)si16[i]=ji[i];
    KB.hM=kbBox(mp,ms,KK.BN.indexOf('head'),mN);KB.hL=kbBox(pos,si16,KB.BN.indexOf('head'),nv);KB.cM=kbBox(mp,ms,KK.BN.indexOf('chest'),mN);KB.cL=kbBox(pos,si16,KB.BN.indexOf('chest'),nv);
    const topL=KB.hL.hi[1]-KB.HB.y,topM=KB.hM.hi[1]-KK.HB.y;KB.kH=KB.hL.s[1]/KB.hM.s[1];
    KB.height=()=>KB.HB.y+topL*(KKCFG.top/Math.max(.01,topM))*KBCFG.head;   // feet to helmet top (the medium rule, on his own head)
    // number on the back: the medium rule (spine..chest band, 1.5 : 1) laid on the big torso
    const NB=KBCFG.num,SP=KB.CB.y-KB.SB.y,SY=KB.SB.y+SP*NB.a,nh=SP*(NB.b-NB.a),CY=SY+nh,nw=nh*NB.asp;   // v3.33T: upper back
    const skI=new Uint16Array(nv*4),skW=new Float32Array(nv*4),slot=new Float32Array(nv),uvN=new Float32Array(nv*2),num=new Float32Array(nv*3);
    for(let i=0;i<nv;i++){let s=0;for(let k=0;k<4;k++){skI[i*4+k]=ji[i*4+k];skW[i*4+k]=jw[i*4+k]/255;s+=skW[i*4+k]}if(s>0)for(let k=0;k<4;k++)skW[i*4+k]/=s;
      slot[i]=sl[i]===0&&pos[i*3+1]<KBCFG.tuck?1:sl[i];if(sl[i]===6){uvN[i*2]=Math.min(254,Math.round(D.uv[i*2]*2*254))/254;uvN[i*2+1]=Math.min(254,Math.round((D.uv[i*2+1]-.5)*2*254))/254}else{uvN[i*2]=-1;uvN[i*2+1]=-1}   // v3.33T: the big shirt's tail is tucked in (pants colour below KBCFG.tuck)
      const x=pos[i*3],y=pos[i*3+1];num[i*3]=(nw/2-x)/nw;num[i*3+1]=(y-SY)/nh;num[i*3+2]=(sl[i]===0&&y<CY+nh*.12&&y>SY-nh*.14&&Math.abs(x)<nw*.74&&nor[i*3+2]<-.3)?1:0}
    const g=new T.BufferGeometry();g.setIndex(new T.BufferAttribute(D.idx,1));g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('normal',new T.BufferAttribute(nor,3));
    g.setAttribute('skinIndex',new T.Uint16BufferAttribute(skI,4));g.setAttribute('skinWeight',new T.BufferAttribute(skW,4));g.setAttribute('aSlot',new T.BufferAttribute(slot,1));
    g.setAttribute('aUvN',new T.BufferAttribute(uvN,2));g.setAttribute('aNum',new T.BufferAttribute(num,3));KB.geo=g;
    {const fb=D.face,fd=new Uint8Array(64*64*4);for(let i=0;i<64*64;i++){const y=63-(i>>6),x=i&63,v=fb[i];const o=(y*64+x)*4;fd[o]=fd[o+1]=fd[o+2]=v;fd[o+3]=255}
      KB.faceTex=new T.DataTexture(fd,64,64,T.RGBAFormat);KB.faceTex.minFilter=KB.faceTex.magFilter=T.LinearFilter;KB.faceTex.needsUpdate=true}
    KB.RS={};KB.BN.forEach((n,b)=>{KB.RS[n]={q:new T.Quaternion().fromArray(KB.REST[b][1]),p:new T.Vector3().fromArray(KB.REST[b][0])}});
    for(const [pk,names] of KBCFG.packs){const cl=kkClipPack(pk,names);for(const n of names){const c0=cl[n];if(!c0)throw new Error('big clip '+n+' missing');KB.nat[n]=new T.AnimationClip('L_'+n,c0.duration,c0.tracks.filter(t=>t.name!=='root.position'))}}
    KB.hg=kbHelmetGeo();KB.pg=kbPadsGeo()}
  function kbRetarget(c){   // a medium clip for the big skeleton: turns kept, travel scaled to the longer bones
    const rm={},rl={};KK.BN.forEach((n,b)=>rm[n]=KK.REST[b][0]);KB.BN.forEach((n,b)=>rl[n]=KB.REST[b][0]);const k=KB.uk;
    return new T.AnimationClip('R_'+c.name,c.duration,c.tracks.filter(t=>!/\.scale$|^root\.position$/.test(t.name)).map(t=>{const [bn,pp]=t.name.split('.');if(pp!=='position')return t;
      const a=rm[bn],b=rl[bn];if(!a||!b)return null;const v=Float32Array.from(t.values);for(let i=0;i<v.length;i+=3)for(let c2=0;c2<3;c2++)v[i+c2]=b[c2]+(v[i+c2]-a[c2])*k;
      return new T.VectorKeyframeTrack(t.name,Float32Array.from(t.times),v)}).filter(Boolean))}
  function kbClip(n){   // the clip a big rig plays for a medium clip name
    if(n in KB.clips)return KB.clips[n];const nat=KBCFG.map[n]&&KB.nat[KBCFG.map[n]];let c=null;
    if(nat)c=nat;else if(KK.clips[n])c=kbRetarget(KK.clips[n]);if(c)KB.clips[n]=c;return c}
  function kbEv(n){if(n in KB.ev)return KB.ev[n];const c=kbClip(n);return KB.ev[n]=c?kkEval(c):null}
  function kbFoot(name){   // kkFootSpeed for the big body (his own legs)
    if(name in KB.fs)return KB.fs[name];KB.fs[name]=0;const clip=kbClip(name);if(!clip)return 0;
    const r=kkMakeRig(95,true),a=kkAct(r,name),n=64,dt=clip.duration/n,v=new T.Vector3(),Fp={l:[],r:[]};a.play();
    for(let i=0;i<=n;i++){r.mixer.setTime(i*dt);r.N.root.updateMatrixWorld(true);for(const k of ['l','r']){r.B['foot_'+k].getWorldPosition(v);Fp[k].push([v.y,v.z])}}
    let sum=0,cnt=0;const th=.035*KB.uk;for(const k of ['l','r']){const f=Fp[k],mn=Math.min(...f.map(q=>q[0]));for(let i=0;i<n;i++){if(f[i][0]<mn+th&&f[i+1][0]<mn+th){sum+=-(f[i+1][1]-f[i][1])/dt;cnt++}}}
    r.mesh.removeFromParent();r.N.root.removeFromParent();r.mixer.stopAllAction();return KB.fs[name]=cnt?Math.max(0,sum/cnt):0}
  function kbFoot2(name){   // kkFoot2 for the big body (backpedal / side-steps)
    const key='2:'+name;if(key in KB.fs)return KB.fs[key];KB.fs[key]=0;const clip=kbClip(name);if(!clip)return 0;
    const r=kkMakeRig(94,true),a=kkAct(r,name),n=64,dt=clip.duration/n,v=new T.Vector3(),Fp={l:[],r:[]};a.play();
    for(let i=0;i<=n;i++){r.mixer.setTime(i*dt);r.N.root.updateMatrixWorld(true);for(const k of ['l','r']){r.B['foot_'+k].getWorldPosition(v);Fp[k].push([v.x,v.y,v.z])}}
    let sum=0,cnt=0;const th=.035*KB.uk;for(const k of ['l','r']){const f=Fp[k],mn=Math.min(...f.map(q=>q[1]));for(let i=0;i<n;i++){if(f[i][1]<mn+th&&f[i+1][1]<mn+th){sum+=Math.hypot(f[i+1][0]-f[i][0],f[i+1][2]-f[i][2])/dt;cnt++}}}
    r.mesh.removeFromParent();r.N.root.removeFromParent();r.mixer.stopAllAction();return KB.fs[key]=cnt?sum/cnt:0}
  function kbHelmetGeo(){   // kkHelmetGeo on the big head: same cut, same bars, sized from his own head
    const g=KB.geo,pos=g.attributes.position.array,nor=g.attributes.normal.array,si=g.attributes.skinIndex.array,idx=g.index.array,hb=KB.BN.indexOf('head'),off=KB.HB,E=KKCFG.helm;
    const cM=[0,1.66,.03],k=[0,1,2].map(i=>KB.hL.s[i]/KB.hM.s[i]),c=[0,1,2].map(i=>KB.hL.c[i]+(cM[i]-KB.hM.c[i])*k[i]),P=[],Nm=[],S=[],kk=KB.kH;
    for(let f=0;f<idx.length;f+=3){const v=[idx[f],idx[f+1],idx[f+2]];if(!v.every(i=>si[i*4]===hb))continue;
      let cx=0,cy=0,cz=0;for(const i of v){cx+=(pos[i*3]-c[0])/k[0];cy+=(pos[i*3+1]-c[1])/k[1];cz+=(pos[i*3+2]-c[2])/k[2]}const m=Math.hypot(cx,cy,cz)||1,th=Math.atan2(cx/m,cz/m),el=Math.asin(cy/m),a=Math.abs(th);
      if(a<E.win&&el<E.top&&el>-1.2)continue;if(el<(a>2.0?-.95:-.55))continue;
      for(const i of v){for(let q=0;q<3;q++)P.push(c[q]+(pos[i*3+q]-c[q])*E.grow+nor[i*3+q]*E.push*kk-[off.x,off.y,off.z][q]);Nm.push(nor[i*3],nor[i*3+1],nor[i*3+2]);S.push(7)}}
    const ring=(th,el,m)=>{const R=[.47,.56,.55];return[c[0]+Math.sin(th)*Math.cos(el)*R[0]*k[0]*m,c[1]+Math.sin(el)*R[1]*k[1]*m,c[2]+Math.cos(th)*Math.cos(el)*R[2]*k[2]*m]};
    for(const el of E.bars){const pts=[];for(let i=0;i<=8;i++){const th=-E.win*1.05+2.1*E.win*i/8;pts.push(ring(th,el,E.mask))}kkTube(pts,E.rad*kk,9,P,Nm,S,off)}
    {const pts=[];for(let i=0;i<=5;i++)pts.push(ring(0,E.bars[0]+.04-(E.bars[0]-E.bars[E.bars.length-1]+.08)*i/5,E.mask));kkTube(pts,E.rad*kk,9,P,Nm,S,off)}
    return kkPack(P,Nm,S)}
  function kbPadsGeo(){   // kkPadsGeo on the big chest: the medium shelf, scaled to his chest
    const E=KKCFG.pads,kx=KB.cL.s[0]/KB.cM.s[0],k=[kx,kx*KBCFG.padY,KB.cL.s[2]/KB.cM.s[2]],c=[KB.cL.c[0]+(E.c[0]-KB.cM.c[0])*k[0],KB.cL.hi[1]-(KB.cM.hi[1]-E.c[1])*k[1]-KBCFG.padDrop,KB.cL.c[2]+(E.c[2]-KB.cM.c[2])*k[2]],R=E.r.map((v,i)=>v*k[i]*KBCFG.pad[i]),off=KB.CB,pw=E.p,P=[],Nm=[],S=[];KB.padHW=R[0];
    const sg=new T.SphereGeometry(1,28,16).toNonIndexed(),a=sg.attributes.position.array;
    const sq=(x,y,z)=>{const r=Math.pow(Math.pow(Math.abs(x),pw)+Math.pow(Math.abs(y),2)+Math.pow(Math.abs(z),pw),-1/pw);return[x*r,y*r,z*r]};
    for(let f=0;f<a.length;f+=9){const cy=(a[f+1]+a[f+4]+a[f+7])/3;if(cy<E.cut)continue;const sl=cy<E.cut+(E.trim===undefined?.22:E.trim)?8:0;const q=[0,1,2].map(j=>sq(a[f+j*3],a[f+j*3+1],a[f+j*3+2]));
      const ux=q[1][0]-q[0][0],uy=q[1][1]-q[0][1],uz=q[1][2]-q[0][2],vx=q[2][0]-q[0][0],vy=q[2][1]-q[0][1],vz=q[2][2]-q[0][2];
      let nx=(uy*vz-uz*vy)/R[0],ny=(uz*vx-ux*vz)/R[1],nz=(ux*vy-uy*vx)/R[2];const nm=Math.hypot(nx,ny,nz)||1;
      for(const p of q){P.push(c[0]+p[0]*R[0]-off.x,c[1]+p[1]*R[1]-off.y,c[2]+p[2]*R[2]-off.z);Nm.push(nx/nm,ny/nm,nz/nm);S.push(sl)}}
    sg.dispose();return kkPack(P,Nm,S)}
  const kbScale=()=>KBCFG.tall*kkHeight()/KB.height();   // big model units -> medium model units (he stands KBCFG.tall x a medium player)
  /* SPACING (drawing only): engaged / side-by-side linemen are drawn no closer than KBCFG.gap yards apart, so the wide bodies don't sink
     into each other. Only the drawn spot moves (like the huddle walk); the real players are never touched. */
  function kbSpace(list){
    if(!KB.ok||!KBCFG.gap||!F)return;const up=e=>kkUse(e.p)&&!e.p.fall&&!(e.p.knock&&e.p.stun>0),all=list.filter(up);if(!all.some(e=>kbIs(e.p)))return;
    const at=e=>e.pr.hv?[e.pr.hv.x,e.pr.hv.y]:[e.p.x,e.p.y],mv=new Map();
    for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){const a=all[i],b=all[j],ba=kbIs(a.p),bb=kbIs(b.p);if(!ba&&!bb)continue;
      const need=KBCFG.gap*(ba&&bb?1:.75),A=at(a),B=at(b),dx=A[0]-B[0],dy=A[1]-B[1],d=Math.hypot(dx,dy);if(d>=need||d<1e-4)continue;const push=(need-d)/2,ux=dx/d,uy=dy/d;
      for(const [e,s] of [[a,1],[b,-1]]){const m=mv.get(e)||[0,0];m[0]+=ux*push*s;m[1]+=uy*push*s;mv.set(e,m)}}
    for(const [e,m] of mv){const A=at(e),q=P(A[0]+m[0],A[1]+m[1]);e.pr=Object.assign({},e.pr,{sx:q.sx,sy:q.sy,u:q.u,kbx:m[0],kby:m[1]});KB.spaced=(KB.spaced||0)+1}}
  const kkFS=(r,n)=>r.lg?kbFoot(n):kkFootSpeed(n),kkF2=(r,n)=>r.lg?kbFoot2(n):kkFoot2(n);   // v3.31T: foot speeds on each body
  /* plain geometry helpers: per-triangle slot, dummy attributes so the one material works for every part */
  function kkPack(P,Nm,S){const n=S.length,g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(new Float32Array(P),3));g.setAttribute('normal',new T.BufferAttribute(new Float32Array(Nm),3));
    g.setAttribute('aSlot',new T.BufferAttribute(new Float32Array(S),1));g.setAttribute('aUvN',new T.BufferAttribute(new Float32Array(n*2).fill(-1),2));g.setAttribute('aNum',new T.BufferAttribute(new Float32Array(n*3),3));return g}
  function kkShell(c,R,seg,keepTri,slotTri,P,Nm,S,off){const sg=new T.SphereGeometry(1,seg[0],seg[1]).toNonIndexed(),a=sg.attributes.position.array;
    for(let f=0;f<a.length;f+=9){const cx=(a[f]+a[f+3]+a[f+6])/3,cy=(a[f+1]+a[f+4]+a[f+7])/3,cz=(a[f+2]+a[f+5]+a[f+8])/3,m=Math.hypot(cx,cy,cz)||1,th=Math.atan2(cx/m,cz/m),el=Math.asin(cy/m);
      if(!keepTri(th,el))continue;const s=slotTri(th,el);
      for(let k=0;k<3;k++){const x=a[f+k*3],y=a[f+k*3+1],z=a[f+k*3+2];P.push(c[0]+x*R[0]-off.x,c[1]+y*R[1]-off.y,c[2]+z*R[2]-off.z);const nx=x/R[0],ny=y/R[1],nz=z/R[2],nm=Math.hypot(nx,ny,nz)||1;Nm.push(nx/nm,ny/nm,nz/nm);S.push(s)}}
    sg.dispose()}
  function kkTube(pts,rad,slot,P,Nm,S,off){const tg=new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(p[0],p[1],p[2]))),Math.max(6,pts.length*2),rad,5,false).toNonIndexed(),a=tg.attributes.position.array,nn=tg.attributes.normal.array;
    for(let i=0;i<a.length;i+=3){P.push(a[i]-off.x,a[i+1]-off.y,a[i+2]-off.z);Nm.push(nn[i],nn[i+1],nn[i+2]);S.push(slot)}tg.dispose()}
  function kkHelmetGeo(){   // the helmet is the head's own shape blown up a little (so the round-box chibi head never pokes through), face window cut out; head-bone space
    const g=KK.geo,pos=g.attributes.position.array,nor=g.attributes.normal.array,si=g.attributes.skinIndex.array,idx=g.index.array,hb=KK.BN.indexOf('head'),off=KK.HB;
    const c=[0,1.66,.03],P=[],Nm=[],S=[],E=KKCFG.helm;
    for(let f=0;f<idx.length;f+=3){const v=[idx[f],idx[f+1],idx[f+2]];if(!v.every(i=>si[i*4]===hb))continue;
      let cx=0,cy=0,cz=0;for(const i of v){cx+=pos[i*3]-c[0];cy+=pos[i*3+1]-c[1];cz+=pos[i*3+2]-c[2]}const m=Math.hypot(cx,cy,cz)||1,th=Math.atan2(cx/m,cz/m),el=Math.asin(cy/m),a=Math.abs(th);
      if(a<E.win&&el<E.top&&el>-1.2)continue;if(el<(a>2.0?-.95:-.55))continue;
      for(const i of v){for(let k=0;k<3;k++)P.push(c[k]+(pos[i*3+k]-c[k])*E.grow+nor[i*3+k]*E.push-[off.x,off.y,off.z][k]);Nm.push(nor[i*3],nor[i*3+1],nor[i*3+2]);S.push(7)}}
    const ring=(th,el,k)=>{const R=[.47,.56,.55];return[c[0]+Math.sin(th)*Math.cos(el)*R[0]*k,c[1]+Math.sin(el)*R[1]*k,c[2]+Math.cos(th)*Math.cos(el)*R[2]*k]};
    for(const el of E.bars){const pts=[];for(let i=0;i<=8;i++){const th=-E.win*1.05+2.1*E.win*i/8;pts.push(ring(th,el,E.mask))}kkTube(pts,E.rad,9,P,Nm,S,off)}
    {const pts=[];for(let i=0;i<=5;i++)pts.push(ring(0,E.bars[0]+.04-(E.bars[0]-E.bars[E.bars.length-1]+.08)*i/5,E.mask));kkTube(pts,E.rad,9,P,Nm,S,off)}
    return kkPack(P,Nm,S)}
  function kkPadsGeo(){   // shoulder pads in the chest bone's space: a wide, flat, squared-off shelf in jersey colour with a trim band at the edge
    const P=[],Nm=[],S=[],E=KKCFG.pads,c=E.c,R=E.r,off=KK.CB,pw=E.p;
    const sg=new T.SphereGeometry(1,28,16).toNonIndexed(),a=sg.attributes.position.array;
    const sq=(x,y,z)=>{const r=Math.pow(Math.pow(Math.abs(x),pw)+Math.pow(Math.abs(y),2)+Math.pow(Math.abs(z),pw),-1/pw);return[x*r,y*r,z*r]};
    for(let f=0;f<a.length;f+=9){const cy=(a[f+1]+a[f+4]+a[f+7])/3;if(cy<E.cut)continue;const sl=cy<E.cut+(E.trim===undefined?.22:E.trim)?8:0;
      const q=[0,1,2].map(k=>sq(a[f+k*3],a[f+k*3+1],a[f+k*3+2]));
      const ux=q[1][0]-q[0][0],uy=q[1][1]-q[0][1],uz=q[1][2]-q[0][2],vx=q[2][0]-q[0][0],vy=q[2][1]-q[0][1],vz=q[2][2]-q[0][2];
      let nx=(uy*vz-uz*vy)/R[0],ny=(uz*vx-ux*vz)/R[1],nz=(ux*vy-uy*vx)/R[2];const nm=Math.hypot(nx,ny,nz)||1;
      for(const p of q){P.push(c[0]+p[0]*R[0]-off.x,c[1]+p[1]*R[1]-off.y,c[2]+p[2]*R[2]-off.z);Nm.push(nx/nm,ny/nm,nz/nm);S.push(sl)}}
    sg.dispose();return kkPack(P,Nm,S)}
  function kkMat(U,skin){const m=new T.MeshToonMaterial({color:0xffffff,gradientMap:LT.g,side:skin?T.FrontSide:T.DoubleSide});
    m.onBeforeCompile=s=>{s.uniforms.inkC=inkU.c;s.uniforms.inkK=inkU.k;s.uniforms.inkLo=inkU.lo;s.uniforms.inkHi=inkU.hi;s.uniforms.kcols=U.cols;s.uniforms.numMap=U.map;s.uniforms.numCell=U.cell;s.uniforms.numC=U.nc;s.uniforms.numO=U.no;s.uniforms.faceMap=U.face;
      s.vertexShader='attribute float aSlot;\nattribute vec2 aUvN;\nattribute vec3 aNum;\nvarying float vSlot;\nvarying vec2 vUvN;\nvarying vec3 vNum;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvSlot=aSlot;vUvN=aUvN;vNum=aNum;');
      s.fragmentShader='uniform vec3 inkC;uniform float inkK;uniform float inkLo;uniform float inkHi;uniform vec3 kcols['+KSLOT+'];uniform sampler2D numMap;uniform vec2 numCell;uniform vec3 numC;uniform vec3 numO;uniform sampler2D faceMap;\nvarying float vSlot;\nvarying vec2 vUvN;\nvarying vec3 vNum;\n'+
        s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n{int si=int(vSlot+0.5);vec3 bc=kcols[0];for(int i=1;i<'+KSLOT+';i++){if(i==si)bc=kcols[i];}diffuseColor.rgb=bc;\n'+
          ' if(si==6&&vUvN.x>=0.0){float fl=texture2D(faceMap,vec2(vUvN.x,1.0-vUvN.y)).r;diffuseColor.rgb=mix(inkC*1.5,bc,smoothstep(0.35,0.6,fl));}\n'+
          ' if(vNum.z>0.5&&vNum.x>0.0&&vNum.x<1.0&&vNum.y>0.0&&vNum.y<1.0){vec2 nu=(clamp(vNum.xy,0.0,1.0)*0.92+0.04+numCell)*0.1;vec4 tx=texture2D(numMap,nu);diffuseColor.rgb=mix(diffuseColor.rgb,mix(numO,numC,tx.r),step(0.45,tx.a));}}')
        .replace('#include <opaque_fragment>','#include <opaque_fragment>\n{float fr=abs(normal.z);gl_FragColor.rgb=mix(gl_FragColor.rgb,inkC,(1.0-smoothstep(inkLo,inkHi,fr))*inkK);}')};
    m.customProgramCacheKey=()=>'cfkk1';return m}
  function kkInit(){
    if(KK.ok||KK.tried)return KK.ok;
    const L=window.KKLIB,need=[KK_MATCH.body].concat(KK_MATCH.packs.map(p=>p[0]));
    if(L&&!need.every(n=>L.has(n))){const bad=need.filter(n=>L.failed(n));if(!bad.length&&!L.done)return false;   // still loading: classic figures until the files are in
      KK.tried=true;KK.err='model files missing ('+(bad.join(', ')||need.filter(n=>!L.has(n)).join(', '))+')';try{console.error('[CF] KayKit players off: '+KK.err);lab()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return false}
    KK.tried=true;
    try{if(!L)throw new Error('KayKit model library missing');kkLoad();KK.ok=true}
    catch(e){KK.err=String(e&&e.message||e);KK.ok=false;try{console.error('[CF] KayKit players off: '+KK.err);lab()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}
    return KK.ok}
  function kkMakeRig(i,big){const D=big?KB:KK;
    const root=new T.Object3D(),tilt=node(root),yaw=node(tilt),fall=node(yaw),N={root,tilt,yaw,fall},B={},bones=[];
    for(let b=0;b<D.BN.length;b++){const o=new T.Bone();o.name=D.BN[b];const r=D.REST[b];o.position.fromArray(r[0]);o.quaternion.fromArray(r[1]);o.scale.fromArray(r[2]);bones.push(o);B[D.BN[b]]=o}
    for(let b=0;b<bones.length;b++)(D.PAR[b]>=0?bones[D.PAR[b]]:fall).add(bones[b]);
    scene.add(root);root.visible=false;root.updateMatrixWorld(true);
    const U={cols:{value:Array.from({length:KSLOT},()=>new T.Color(1,1,1))},map:{value:numTex},cell:{value:new T.Vector2(0,9)},nc:{value:new T.Color(1,1,1)},no:{value:new T.Color(0,0,0)},face:{value:D.faceTex}};
    const mesh=new T.SkinnedMesh(D.geo,kkMat(U,true));mesh.frustumCulled=false;mesh.visible=false;scene.add(mesh);
    const sk=new T.Skeleton(bones,D.IBM.map(m=>m.clone()));mesh.bind(sk,new T.Matrix4());
    const helm=new T.Mesh(D.hg,kkMat(U,false));helm.frustumCulled=false;B.head.add(helm);
    const pads=new T.Mesh(D.pg,kkMat(U,false));pads.frustumCulled=false;B.chest.add(pads);
    if(!KK.bg){KK.bg=new T.SphereGeometry(1,12,8);const n=KK.bg.attributes.position.count;KK.bg.setAttribute('aSlot',new T.BufferAttribute(new Float32Array(n).fill(10),1));KK.bg.setAttribute('aUvN',new T.BufferAttribute(new Float32Array(n*2).fill(-1),2));KK.bg.setAttribute('aNum',new T.BufferAttribute(new Float32Array(n*3),3))}
    const ball=new T.Mesh(KK.bg,kkMat(U,false));ball.frustumCulled=false;const bk=big?1/kbScale():1;ball.scale.set(.15*bk,.15*bk,.24*bk);ball.visible=false;(B.hand_r||B.wrist_r||B.lowerarm_r).add(ball);
    const mixer=new T.AnimationMixer(fall),act={};if(!big)for(const k in KK.clips){act[k]=mixer.clipAction(KK.clips[k]);act[k].enabled=true}
    return{i,lg:!!big,bk,rest:big?KB.RS:null,uk:big?KB.uk:1,N,B,U,mesh,sk,helm,pads,ball,mixer,act,cur:null,p:null,seen:0,sg:[],fallK:0,yw:undefined,ph:Math.random()*.8}}
  function kkColour(r,p){
    const u=p._uni||uniFor(p),L=lookOf(p.d),num=Math.max(0,Math.min(99,p.num|0)),jt=pick(u,TRIMK,u.jn),no=pick(u,NOK,'#14110f'),sg=r.sg;
    const f=[u.jc,u.jn,u.pc,u.sock,u.shoe,u.hc,u.mask,L.skin,num,jt,no];let ch=false;for(let i=0;i<f.length;i++){if(sg[i]!==f[i]){sg[i]=f[i];ch=true}}if(!ch)return;
    const jc=hexC(u.jc,'#888888'),skin=hexC(L.skin,'#c98f63'),hc=hexC(u.hc,'#444444');let mk=hexC(u.mask,'#6b7078');
    {const d=Math.abs(mk.r-hc.r)+Math.abs(mk.g-hc.g)+Math.abs(mk.b-hc.b);if(d<.25)mk=hc.clone().multiplyScalar(hc.r+hc.g+hc.b>1.5?.45:1.9)}   // the facemask always differs from the shell
    const g=gearOf('',hashOf(p)),gd=gearOfD(p.d),jtC=hexC(jt,'#ffffff');let gl=g.gl?[jtC,hexC(u.jn,'#ffffff'),new T.Color('#141318'),hexC(u.ps,'#ffffff')][g.glc]:skin;if(GEAR3D&&gd&&gd.gloves)gl=hexC(gd.gc,'#ffd23a');
    const C=[jc,hexC(u.pc,'#dddddd'),skin,hexC(u.sock,'#ffffff'),hexC(u.shoe,'#14110f'),gl,skin,hc,jtC,mk,new T.Color('#8a4a22')];
    for(let i=0;i<KSLOT;i++)r.U.cols.value[i].copy(C[i]);
    r.U.cell.value.set(num%10,9-((num/10)|0));r.U.nc.value.copy(hexC(u.jn,'#ffffff'));r.U.no.value.copy(hexC(no,'#14110f'))}
  const kkUse=p=>KK.want&&!KK.err&&p&&(p.team==='O'||(p.team==='D'&&KKCFG.defense))&&kkInit();   // v3.18cT: the defense too
  function kkPlay(r,name,ts,dt){const a=kkAct(r,name);if(!a)return;a.timeScale=ts;
    if(r.cur!==name){const old=r.cur&&r.act[r.cur];a.reset();a.play();if(old){a.time=(old.time/old.getClip().duration)*a.getClip().duration;old.crossFadeTo(a,KKCFG.fade,false)}else a.time=r.ph*a.getClip().duration;r.cur=name}}
  function kkDraw(p,pr,rank,dt,now){
    kkExtra();const big=kbIs(p);let r=KK.bind.get(p);if(r&&!!r.lg!==big){KK.bind.delete(p);r.p=null;r=null}   // v3.31T: the body changed (big files arrived / switch)
    if(!r){for(const q of KK.rigs)if(!q.p&&!!q.lg===big){r=q;break}
      if(!r&&KK.cur)for(const q of KK.rigs)if(q.p&&q.p!==p&&!!q.lg===big&&!KK.cur.some(v=>v.p===q.p)){KK.bind.delete(q.p);q.p=null;r=q;break}   // re-use the rig of a player who left the field (new play)
      if(!r){if(KK.rigs.length>=30)return;r=kkMakeRig(KK.rigs.length,big);KK.rigs.push(r)}r.p=p;r.sg=[];r.cur=null;r.yw=undefined;r.fallK=p.fall?1:0;KK.bind.set(p,r)}
    r.seen=KK.stamp;kkColour(r,p);
    const L=lookOf(p.d),star=!!(p.d.star||p.d.special),h=playerPx(pr,L.h,star),sc=h/kkHeight()*KKCFG.scale*TILT0/Math.cos(CFG.tilt)*(r.lg?kbScale():1),lying=p.fall||(p.knock&&p.stun>0);
    ctx.fillStyle='rgba(0,0,0,.32)';ctx.beginPath();ctx.ellipse(pr.sx,pr.sy+(pr.lift||0),h*(lying?.42:.27)*(r.lg?KBCFG.shadow:1),h*(lying?.13:.09),0,0,7);ctx.fill();
    if(p===F.carrier&&F.mode==='live'&&!lying){const s=h/16.2;ctx.strokeStyle='#38c6d9';ctx.lineWidth=Math.max(2,s*.7);ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,s*4.6,s*1.9,0,0,7);ctx.stroke()}
    const pv=pr.hv||(KA.n&&!KA.off&&F.mode!=='live'&&F.mode!=='pre'&&!(typeof REP!=='undefined'&&REP.act)?{x:p.x,y:p.y,vx:0,vy:0,fa:p.fa}:p);   // v3.30T: after the whistle nobody runs on the spot
    if(p===F.carrier&&F.mode==='live'&&!F.ballAir&&!lying){const _ch=p.h||0;if(p._cutH!==undefined&&Math.hypot(p.vx||0,p.vy||0)>3.5&&Math.abs(angDiff(p._cutH,_ch))>.62&&(!p._cutT||now-p._cutT>.28)){p._cutT=now;dust(p.x,p.y,5,.75)}p._cutH=_ch}
    const hasBall=p===F.carrier&&!F.ballAir&&F.mode!=='pre'&&!F.snap,spd=Math.hypot(pv.vx||0,pv.vy||0),held=!KA.off&&p.throwT>0&&F.ballAir&&F.ball&&F.ball.t<0;   // v3.29T: the ball stays in the QB's hand until it is released
    if(spd>.4&&!lying){let clip=KKCFG.runClip,ts=clamp(spd/KKCFG.runRef,KKCFG.runMin,KKCFG.runMax);const fs=kkFS(r,KKCFG.runClip);
      if(KKCFG.footSync&&fs>0){   // feet stay planted: play the clip so a planted foot slides back on screen exactly as fast as the player moves
        const e=.15,q=P(pv.x+(pv.vx||0)*e,pv.y+(pv.vy||0)*e),scr=Math.hypot(q.sx-pr.sx,q.sy-pr.sy)/e*kkPlayRate(),yw=r.yw===undefined?0:r.yw,
          per=sc*Math.hypot(Math.sin(yw),Math.cos(yw)*Math.sin(CFG.tilt));   // screen pixels per model unit along the way he faces
        if(per>1e-3){const need=scr/per;ts=need/fs;const wf=kkFS(r,KKCFG.walkClip);   // slow movers walk (v3.18cT): no slow-motion running
          const walkNow=r.cur===KKCFG.walkClip?ts<KKCFG.walkOut:ts<KKCFG.walkIn;
          if(wf>0&&walkNow){clip=KKCFG.walkClip;ts=need/wf}if(clip===KKCFG.walkClip&&pr.hv){const wn=KACFG.walks[r.i%3],w2=KK.clips[wn]?kkFS(r,wn):0;if(w2>0){clip=wn;ts=need/w2}}   // huddle walkers: three different walks
          if(clip===KKCFG.runClip&&!KA.off&&p===F.carrier&&p.spr&&F.mode==='live'&&KK.clips[KACFG.turbo]){const fb=kkFS(r,KACFG.turbo);if(fb>0){clip=KACFG.turbo;ts=need/fb}}   // turbo: the leaning sprint
          const lc=kkLoco(pv,r,pr,spd,need,yw,sc);if(lc){clip=lc.clip;ts=lc.ts}ts=clamp(ts,KKCFG.syncMin,KKCFG.syncMax)}}
      kkPlay(r,clip,ts,dt)}else{r.loco='';kkPlay(r,KKCFG.idleClip,lying?0:1,dt)}
    if(KA.n)kkRestPose(r);r.mixer.update(dt);r.ovNow=kkActions(p,r,lying,spd,pr,dt,now);r.B.head.scale.setScalar(r.lg?KBCFG.head:KKCFG.head);
    const N=r.N;let fa=pv.fa+(p.spin>0&&!r.noTw?(1-p.spin/.4)*TAU:0);if(p.dizzy&&p.stun>0)fa+=Math.sin(now/120)*.4;
    const want=Math.atan2(Math.cos(fa),-Math.sin(fa));N.yaw.rotation.y=r.yw===undefined?want:r.yw+angDiff(r.yw,want)*Math.min(1,dt*20);r.yw=N.yaw.rotation.y;
    if(r.lieOv)r.fallK=0;else r.fallK+=((lying?1:0)-r.fallK)*Math.min(1,dt*(lying?11:5));{const q=r.fallK*Math.PI/2,fv=p.fallV||0;if(fv===1){N.fall.rotation.set(-q,0,0)}else if(fv===2){N.fall.rotation.set(q*.25,0,q*(p.fallS||1))}else N.fall.rotation.set(q,0,0);N.fall.position.y=r.fallK*.25*(r.bk||1)}
    r.fxy=[(pr.hv?pr.hv.x:p.x)+(pr.kbx||0),(pr.hv?pr.hv.y:p.y)+(pr.kby||0)];N.tilt.rotation.x=CFG.tilt;N.root.position.set(pr.sx,H-pr.sy-(pr.lift||0)*0,rank*600);N.root.scale.setScalar(sc);
    r.ball.visible=hasBall||held;r.ball.position.set(KKCFG.ballX*r.bk,KKCFG.ballY*r.bk,KKCFG.ballZ*r.bk);
    N.root.visible=true;N.root.updateMatrixWorld(true);r.mesh.visible=true;r.sk.update()}
  function kkPlayRate(){try{return F&&F.mode==='live'?LIVE_SPEED*SPEED:1}catch(e){return 1}}   // a live play runs faster than real time (LIVE_SPEED): the feet must keep up
  const kkHeight=()=>KKCFG.neck+KKCFG.top*KKCFG.head;   // feet to helmet top, with the head scaled
  const KFS={};
  function kkFootSpeed(name){   // how fast (model units per second) a planted foot moves back in this clip at speed 1; measured once
    if(name in KFS)return KFS[name];KFS[name]=0;const clip=KK.clips[name];if(!clip)return 0;
    const r=kkMakeRig(99),a=r.act[name],n=64,dt=clip.duration/n,v=new T.Vector3(),F={l:[],r:[]};a.play();
    for(let i=0;i<=n;i++){r.mixer.setTime(i*dt);r.N.root.updateMatrixWorld(true);for(const k of ['l','r']){r.B['foot_'+k].getWorldPosition(v);F[k].push([v.y,v.z])}}
    let sum=0,cnt=0;for(const k of ['l','r']){const f=F[k],mn=Math.min(...f.map(q=>q[0]));for(let i=0;i<n;i++){if(f[i][0]<mn+.035&&f[i+1][0]<mn+.035){sum+=-(f[i+1][1]-f[i][1])/dt;cnt++}}}
    r.mesh.removeFromParent();r.N.root.removeFromParent();r.mixer.stopAllAction();
    return KFS[name]=cnt?Math.max(0,sum/cnt):0}
  const KSR=[],KSRB=[];
  function kkShowcase(cvs,figs,bg){   // close-up of KayKit figures (proof sheets / tests): figs=[{uni,num,d,yaw,x,clip,t,tilt,hasBall}]
    if(!init()||!kkInit())return false;const pw=cvs.width,ph=cvs.height;
    sync();if(!kkShowcase._rt){kkShowcase._rt=new T.WebGLRenderTarget(pw,ph,{samples:0});kkShowcase._w=pw;kkShowcase._h=ph}else if(kkShowcase._w!==pw||kkShowcase._h!==ph){kkShowcase._rt.setSize(pw,ph);kkShowcase._w=pw;kkShowcase._h=ph}if(R.domElement.width!==pw||R.domElement.height!==ph){R.setSize(pw,ph,false);cw=pw;ch=ph}qm.uniforms.t.value=kkShowcase._rt.texture;qm.uniforms.px.value.set(1/pw,1/ph);qm.uniforms.w.value=CFG.outline*2;
    cam3.left=0;cam3.right=pw;cam3.top=ph;cam3.bottom=0;cam3.updateProjectionMatrix();
    for(const r of rigs)r.mesh.visible=false;kkHideAll();ballIM.count=0;for(const r of KSR.concat(KSRB).filter(Boolean)){r.mesh.visible=false;r.N.root.visible=false}
    figs.forEach((f,i)=>{const big=kbIs({role:'',pos:f.d&&f.d.pos,d:f.d}),RA=big?KSRB:KSR;let r=RA[i];if(!r){r=kkMakeRig((big?120:100)+i,big);RA[i]=r}r.N.root.visible=true;const p={d:f.d||{name:'Showcase '+i,pos:'WR'},team:'O',num:f.num,_uni:f.uni,fa:0};
      r.sg=[];kkColour(r,p);r.mixer.stopAllAction();kkExtra();kkRestPose(r);const a=kkAct(r,f.clip||KKCFG.idleClip)||kkAct(r,KKCFG.idleClip);a.reset();a.play();a.weight=1;r.mixer.setTime(f.t||0);r.B.head.scale.setScalar(r.lg?KBCFG.head:KKCFG.head);
      const N=r.N;N.yaw.rotation.y=f.yaw||0;N.tilt.rotation.x=f.tilt===undefined?.1:f.tilt;N.fall.rotation.set(0,0,0);N.fall.position.y=0;N.root.position.set(pw*f.x,ph*.06,i*600+100);N.root.scale.setScalar(ph*.85/kkHeight()*(f.zoom||1)*(r.lg?kbScale():1));
      r.ball.visible=!!f.hasBall;r.ball.position.set(KKCFG.ballX*r.bk,KKCFG.ballY*r.bk,KKCFG.ballZ*r.bk);N.root.visible=true;N.root.updateMatrixWorld(true);r.mesh.visible=true;r.sk.update()});
    R.setRenderTarget(kkShowcase._rt);R.clear();R.render(scene,cam3);R.setRenderTarget(null);R.render(qs,qc);qm.uniforms.t.value=rt.texture;
    const g=cvs.getContext('2d');g.setTransform(1,0,0,1,0,0);if(bg===false)g.clearRect(0,0,pw,ph);else{g.fillStyle=bg||'#1a2e40';g.fillRect(0,0,pw,ph)}g.drawImage(glc,0,0,pw,ph,0,0,pw,ph);
    for(const r of KSR.concat(KSRB).filter(Boolean)){r.mesh.visible=false;r.N.root.visible=false}return true}
  function kkEnd(){for(const r of KK.rigs){if(r.p&&r.seen!==KK.stamp){KK.bind.delete(r.p);r.p=null}if(!r.p){r.mesh.visible=false;r.N.root.visible=false}}}
  function kkHideAll(){for(const r of KK.rigs){r.mesh.visible=false;r.N.root.visible=false}}
  /* ============ v3.28T CLIP VIEWER (TEST menu): any KayKit body with any of its clips, played live. Look only.
     Bodies: the two mannequins and the six Adventurers (painted textures, parts can be switched off). Medium bodies play the 131
     medium clips, the big mannequin the 28 large clips. MARK flags a clip you dislike (kept on this phone, listed under MARKED). ============ */
  const KV={on:false,el:null,cv:null,bi:0,ci:0,rigs:{},clips:{},list:{},play:true,speed:1,yaw:0,raf:0,last:0,err:'',frames:0,ms:0,marks:[]};
  try{KV.marks=JSON.parse(localStorage.getItem('cf_kkmark')||'[]')||[]}catch(e){KV.marks=[]}
  const kvBodies=()=>KKLIB.man.bodies.filter(b=>KKLIB.has(b.name));
  function kvClipList(rig){   // [[pack, clip name]] for a rig, in pack order
    if(KV.list[rig])return KV.list[rig];const out=[];for(const c of KKLIB.man.clips)if(c.rig===rig&&KKLIB.has(c.name))for(const n of c.clips)out.push([c.name,n]);return KV.list[rig]=out}
  function kvClip(pack,name){return kkClipPack(pack)[name]}
  function kvTex(png){const t=new T.Texture();const img=new Image(),u=URL.createObjectURL(new Blob([png],{type:'image/png'}));img.onload=()=>{t.image=img;t.needsUpdate=true;URL.revokeObjectURL(u)};img.src=u;
    t.flipY=false;t.magFilter=T.NearestFilter;t.minFilter=T.LinearFilter;return t}
  function kvRig(name){
    if(KV.rigs[name])return KV.rigs[name];const D=kkBodyData(name),h=D.h,nv=D.nv;
    const skI=new Uint16Array(nv*4),skW=new Float32Array(nv*4);for(let i=0;i<nv;i++){let s=0;for(let k=0;k<4;k++){skI[i*4+k]=D.ji[i*4+k];skW[i*4+k]=D.jw[i*4+k]/255;s+=skW[i*4+k]}if(s>0)for(let k=0;k<4;k++)skW[i*4+k]/=s}
    const g=new T.BufferGeometry();g.setIndex(new T.BufferAttribute(D.idx,1));g.setAttribute('position',new T.BufferAttribute(D.pos,3));g.setAttribute('normal',new T.BufferAttribute(D.nor,3));g.setAttribute('uv',new T.BufferAttribute(D.uv,2));
    g.setAttribute('skinIndex',new T.Uint16BufferAttribute(skI,4));g.setAttribute('skinWeight',new T.BufferAttribute(skW,4));
    const root=new T.Object3D(),tilt=node(root),yaw=node(tilt),bones=[],BN=h.bones.map(KBN);
    for(let b=0;b<BN.length;b++){const o=new T.Bone();o.name=BN[b];const r=h.rest[b];o.position.fromArray(r[0]);o.quaternion.fromArray(r[1]);o.scale.fromArray(r[2]);bones.push(o)}
    for(let b=0;b<bones.length;b++)(h.parents[b]>=0?bones[h.parents[b]]:yaw).add(bones[b]);
    const IBM=[];for(let b=0;b<bones.length;b++)IBM.push(new T.Matrix4().fromArray(D.ibm,b*16));
    const sk=new T.Skeleton(bones,IBM),mat=new T.MeshToonMaterial({color:0xffffff,map:kvTex(D.png),gradientMap:LT.g}),parts=[];
    scene.add(root);root.visible=false;
    for(const m of h.meshes){const pg=g.clone();pg.setIndex(new T.BufferAttribute(D.idx.slice(m.i0,m.i0+m.ni),1));const ms=new T.SkinnedMesh(pg,mat);ms.frustumCulled=false;ms.visible=false;scene.add(ms);ms.bind(sk,new T.Matrix4());parts.push({name:m.name,mesh:ms,on:true})}
    const r={name,rig:KKLIB.man.bodies.find(b=>b.name===name).rig,root,tilt,yaw,bones,sk,parts,mixer:new T.AnimationMixer(yaw),act:null,cur:'',h:h.box[1][1]-h.box[0][1],rest:h.rest};
    return KV.rigs[name]=r}
  function kvHide(){for(const k in KV.rigs){const r=KV.rigs[k];r.root.visible=false;for(const p of r.parts)p.mesh.visible=false}}
  function kvSet(bi,ci){const B=kvBodies();if(!B.length)throw new Error('no model files loaded');KV.bi=(bi+B.length)%B.length;const r=kvRig(B[KV.bi].name),L=kvClipList(r.rig);
    if(!L.length)throw new Error('no clips for '+r.rig);KV.ci=(ci+L.length)%L.length;const [pk,nm]=L[KV.ci],clip=kvClip(pk,nm),key=pk+'/'+nm;
    if(r.cur!==key){r.mixer.stopAllAction();if(r.act)r.mixer.uncacheAction(r.act.getClip());r.act=r.mixer.clipAction(clip);r.act.reset();r.act.setLoop(T.LoopRepeat,Infinity);r.act.play();r.cur=key}
    kvLabel();return{body:B[KV.bi].name,rig:r.rig,pack:pk,clip:nm,dur:clip.duration,tracks:clip.tracks.length,n:L.length}}
  function kvRender(dt){
    const B=kvBodies(),r=kvRig(B[KV.bi].name),cv=KV.cv;if(!cv)return;const t0=performance.now();
    const pw=cv.width,ph=cv.height;sync();R.setSize(pw,ph,false);rt.setSize(pw,ph);qm.uniforms.px.value.set(1/pw,1/ph);qm.uniforms.w.value=CFG.outline*2;cw=ch=0;
    cam3.left=0;cam3.right=pw;cam3.top=ph;cam3.bottom=0;cam3.updateProjectionMatrix();
    for(const q of rigs)q.mesh.visible=false;kkHideAll();for(const q of KSR){q.mesh.visible=false;q.N.root.visible=false}ballIM.count=0;kvHide();
    if(KV.play)r.mixer.update(dt*KV.speed);r.yaw.rotation.y=KV.yaw;r.tilt.rotation.x=.18;
    const sc=Math.min(ph*.72,pw*.9)/r.h;r.root.position.set(pw*.5,ph*.16,100);r.root.scale.setScalar(sc);r.root.visible=true;r.root.updateMatrixWorld(true);
    for(const p of r.parts){p.mesh.visible=p.on}r.sk.update();
    R.setRenderTarget(rt);R.clear();R.render(scene,cam3);R.setRenderTarget(null);R.render(qs,qc);
    const g=cv.getContext('2d');g.setTransform(1,0,0,1,0,0);const gr=g.createLinearGradient(0,0,0,ph);gr.addColorStop(0,'#1d3348');gr.addColorStop(1,'#0b1520');g.fillStyle=gr;g.fillRect(0,0,pw,ph);
    g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(pw*.5,ph*.84,sc*.45,sc*.12,0,0,7);g.fill();g.drawImage(glc,0,0,pw,ph,0,0,pw,ph);
    kvHide();KV.frames++;KV.ms+=performance.now()-t0}
  function kvLoop(ts){if(!KV.on)return;const dt=KV.last?Math.min(.1,(ts-KV.last)/1000):0;KV.last=ts;try{kvSize();kvRender(dt)}catch(e){KV.err=String(e&&e.message||e);kvLabel();console.error('[CF] clip viewer: '+KV.err);return}KV.raf=requestAnimationFrame(kvLoop)}
  function kvSize(){const cv=KV.cv,b=cv.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1),w=Math.max(2,Math.round(b.width*d)),h=Math.max(2,Math.round(b.height*d));if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}}
  const kvMarkKey=()=>{const B=kvBodies(),r=kvRig(B[KV.bi].name),[pk,nm]=kvClipList(r.rig)[KV.ci];return r.rig+':'+nm};
  function kvLabel(){if(!KV.el)return;const q=s=>KV.el.querySelector(s),B=kvBodies();if(!B.length)return;const r=kvRig(B[KV.bi].name),L=kvClipList(r.rig),[pk,nm]=L[KV.ci]||['',''];
    q('#kvB').textContent=B[KV.bi].name.toUpperCase().replace(/_/g,' ')+'  ('+(KV.bi+1)+'/'+B.length+')';
    q('#kvC').textContent=nm+'  ('+(KV.ci+1)+'/'+L.length+')';q('#kvP').textContent=pk.replace(/_/g,' ')+(KV.err?'  ERROR: '+KV.err.slice(0,60):'');
    const mk=KV.marks.includes(kvMarkKey());q('#kvMk').textContent=mk?'MARKED X':'MARK';q('#kvMk').style.color=mk?'#ff6b6b':'';
    q('#kvPl').textContent=KV.play?'PAUSE':'PLAY';q('#kvSp').textContent='SPEED '+KV.speed+'x';
    q('#kvML').textContent=KV.marks.length?'MARKED ('+KV.marks.length+'): '+KV.marks.join(', '):'MARKED: none yet';
    const pr=q('#kvParts');pr.innerHTML='';if(r.parts.length>1&&!/^mannequin/.test(r.name))for(const p of r.parts){const b=document.createElement('button');b.className='btn';b.style.cssText='min-width:0;padding:6px 8px;font-size:11px;flex:0 0 auto;opacity:'+(p.on?1:.45);b.textContent=p.name;b.onclick=()=>{p.on=!p.on;kvLabel()};pr.appendChild(b)}}
  function kvList(){const B=kvBodies(),r=kvRig(B[KV.bi].name),L=kvClipList(r.rig),box=KV.el.querySelector('#kvList');if(box.style.display==='block'){box.style.display='none';return}
    box.innerHTML='';L.forEach(([pk,nm],i)=>{const b=document.createElement('button');b.className='btn';b.style.cssText='display:block;width:100%;margin:3px 0;text-align:left;font-size:12px;padding:8px'+(i===KV.ci?';border-color:#27e0ff':'');
      b.textContent=(i+1)+'. '+nm+(KV.marks.includes(r.rig+':'+nm)?'  X':'')+'   · '+pk.replace(/^(medium|large)_/,'');b.onclick=()=>{kvSet(KV.bi,i);box.style.display='none'};box.appendChild(b)});box.style.display='block'}
  function kvBuild(){
    const d=document.createElement('div');d.id='kkV';d.style.cssText='position:fixed;inset:0;z-index:2147483000;background:#0b1520;display:flex;color:#dff6ff;font-family:inherit;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);touch-action:none';
    const bs='min-width:0;padding:8px 10px;font-size:12px';
    d.innerHTML='<style>#kkV{flex-direction:column}#kvStage{flex:1;min-height:0;display:flex;flex-direction:column}#kvCtl{padding:4px 8px 8px}#kvParts .btn{flex:0 0 auto}'+
      '@media (orientation:landscape){#kkV{flex-direction:row}#kvCtl{width:47%;max-width:430px;overflow-y:auto;align-self:center}}</style>'+
      '<div id="kvStage"><div style="display:flex;align-items:center;gap:8px;padding:6px 8px"><button class="btn" id="kvX" style="'+bs+'">CLOSE</button><div style="flex:1;font-size:13px;letter-spacing:.12em;color:#27e0ff">CLIP VIEWER</div><button class="btn" id="kvLs" style="'+bs+'">LIST</button></div>'+
      '<div style="position:relative;flex:1;min-height:0"><canvas id="kvCv" style="position:absolute;inset:0;width:100%;height:100%;touch-action:none"></canvas><div id="kvList" style="display:none;position:absolute;inset:0;overflow-y:auto;background:rgba(8,16,24,.96);padding:6px 10px;-webkit-overflow-scrolling:touch;touch-action:pan-y"></div></div></div>'+
      '<div id="kvCtl">'+
      '<div style="display:flex;align-items:center;gap:6px;margin:3px 0"><button class="btn" id="kvB0" style="'+bs+'">&lt;</button><div id="kvB" style="flex:1;text-align:center;font-size:13px"></div><button class="btn" id="kvB1" style="'+bs+'">&gt;</button></div>'+
      '<div style="display:flex;align-items:center;gap:6px;margin:3px 0"><button class="btn" id="kvC0" style="'+bs+'">&lt;</button><div style="flex:1;text-align:center"><div id="kvC" style="font-size:14px;color:#fff"></div><div id="kvP" style="font-size:10px;opacity:.6"></div></div><button class="btn" id="kvC1" style="'+bs+'">&gt;</button></div>'+
      '<div style="display:flex;gap:6px;margin:3px 0;flex-wrap:wrap"><button class="btn" id="kvPl" style="'+bs+'">PAUSE</button><button class="btn" id="kvSp" style="'+bs+'">SPEED 1x</button><button class="btn" id="kvTn" style="'+bs+'">TURN</button><button class="btn" id="kvMk" style="'+bs+'">MARK</button></div>'+
      '<div id="kvParts" style="display:flex;gap:4px;flex-wrap:wrap;margin:3px 0"></div><div id="kvML" style="font-size:10px;opacity:.7;max-height:3.6em;overflow-y:auto"></div></div>';
    document.body.appendChild(d);KV.el=d;KV.cv=d.querySelector('#kvCv');const q=s=>d.querySelector(s);
    for(const ev of ['touchstart','touchmove','touchend','pointerdown','pointerup','keydown','keyup','click','mousedown'])d.addEventListener(ev,e=>e.stopPropagation());
    q('#kvX').onclick=kkViewerClose;q('#kvLs').onclick=kvList;q('#kvB0').onclick=()=>kvSet(KV.bi-1,0);q('#kvB1').onclick=()=>kvSet(KV.bi+1,0);q('#kvC0').onclick=()=>kvSet(KV.bi,KV.ci-1);q('#kvC1').onclick=()=>kvSet(KV.bi,KV.ci+1);
    q('#kvPl').onclick=()=>{KV.play=!KV.play;kvLabel()};q('#kvSp').onclick=()=>{KV.speed=KV.speed===1?.5:KV.speed===.5?.25:KV.speed===.25?2:1;kvLabel()};q('#kvTn').onclick=()=>{KV.yaw=(Math.round(KV.yaw/(Math.PI/4))+1)*(Math.PI/4);kvLabel()};
    q('#kvMk').onclick=()=>{const k=kvMarkKey(),i=KV.marks.indexOf(k);if(i>=0)KV.marks.splice(i,1);else KV.marks.push(k);try{localStorage.setItem('cf_kkmark',JSON.stringify(KV.marks))}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}kvLabel()};
    let dx=null;KV.cv.addEventListener('pointerdown',e=>{dx=e.clientX});KV.cv.addEventListener('pointermove',e=>{if(dx===null)return;KV.yaw+=(e.clientX-dx)*.012;dx=e.clientX});const up=()=>{dx=null};KV.cv.addEventListener('pointerup',up);KV.cv.addEventListener('pointercancel',up)}
  function kkViewerOpen(){
    if(!init())throw new Error('3D is off'+(S.err?': '+S.err:''));if(!kvBodies().length)throw new Error(KKLIB.line());
    if(!KV.el)kvBuild();KV.el.style.display='flex';KV.on=true;KV.err='';KV.last=0;kvSet(KV.bi,KV.ci);cancelAnimationFrame(KV.raf);KV.raf=requestAnimationFrame(kvLoop);return true}
  function kkViewerClose(){KV.on=false;cancelAnimationFrame(KV.raf);if(KV.el)KV.el.style.display='none';try{kvHide()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}cw=ch=0}
  const kkViewer={open:kkViewerOpen,close:kkViewerClose,set:kvSet,render:dt=>{kvSize();kvRender(dt)},state:()=>({on:KV.on,bi:KV.bi,ci:KV.ci,err:KV.err,frames:KV.frames,ms:KV.ms,marks:KV.marks.slice(),bodies:kvBodies().map(b=>b.name)}),
    bones:()=>{const B=kvBodies(),r=kvRig(B[KV.bi].name);r.root.updateMatrixWorld(true);return r.bones.map(b=>b.getWorldPosition(new T.Vector3()).toArray())},list:rig=>kvClipList(rig).map(x=>x.join('/')),rig:n=>{const r=kvRig(n);return{parts:r.parts.map(p=>p.name),rig:r.rig,h:r.h,bones:r.bones.length}},step:dt=>{const B=kvBodies(),r=kvRig(B[KV.bi].name);r.mixer.update(dt);r.root.updateMatrixWorld(true)}};
  /* ---------- per frame ---------- */
  let Z=null,FOOT=null;
  function sync(){const dpr=Math.min(2.5,Math.max(1,cv.width/Math.max(1,W))),w=Math.max(1,Math.round(W*dpr)),h=Math.max(1,Math.round(H*dpr));
    if(w!==cw||h!==ch){cw=w;ch=h;R.setPixelRatio(1);R.setSize(w,h,false);rt.setSize(w,h);qm.uniforms.px.value.set(1/w,1/h)}
    qm.uniforms.w.value=CFG.outline*dpr;qm.uniforms.ink.value.set(CFG.ink[0],CFG.ink[1],CFG.ink[2]);inkU.c.value.set(CFG.ink[0],CFG.ink[1],CFG.ink[2]);inkU.k.value=CFG.inner;inkU.lo.value=CFG.inkLo;inkU.hi.value=CFG.inkHi;
    {const lk=CFG.ramp.join()+'|'+CFG.light.join();if(lk!==lastLook){lastLook=lk;const d=LT.g.image.data;for(let i=0;i<3;i++){d[i*4]=d[i*4+1]=d[i*4+2]=CFG.ramp[i]}LT.g.needsUpdate=true;
      LT.h.intensity=CFG.light[0];LT.k.intensity=CFG.light[1];LT.c.intensity=CFG.light[2];LT.m.intensity=CFG.light[3];LT.b.intensity=CFG.light[4]||0}}
    cam3.left=0;cam3.right=W;cam3.top=H;cam3.bottom=0;cam3.updateProjectionMatrix()}
  function balls(r){const b=r.i*3;let k=0;for(const nm of ['ballR','ballL','ball2']){const o=r.P[nm];ballIM.setMatrixAt(b+k,o.visible&&r.mesh.visible?o.matrixWorld:Z);k++}}
  function feet(r){const v=FOOT.set(0,-.5,0);r.P.shoeR.localToWorld(v);const yR=v.y;FOOT.set(0,-.5,0);r.P.shoeL.localToWorld(FOOT);return Math.min(yR,FOOT.y)}
  function draw(list){
    if(!S.want||S.lost||!F||($('#hud').hidden&&!(G&&G.drill))||!init())return false;
    const t0=performance.now();
    try{
      sync();if(!Z){Z=new T.Matrix4().makeScale(0,0,0);FOOT=new T.Vector3()}
      const now=t0;stamp++;VIS.length=0;
      for(let i=0;i<list.length;i++){const e=list[i],pr=e.pr;if(pr.sy<-90||pr.sy>H+90||pr.sx<-70||pr.sx>W+70)continue;VIS.push(e);const r=bind.get(e.p);if(r)r.seen=stamp}
      for(let i=0;i<rigs.length;i++){const r=rigs[i];if(r.p&&r.seen!==stamp){bind.delete(r.p);r.p=null}}
      for(let i=0;i<VIS.length;i++){const p=VIS[i].p;if(bind.has(p)||kkUse(p))continue;let r=null;for(let j=0;j<rigs.length;j++)if(!rigs[j].p){r=rigs[j];break}
        if(!r){if(rigs.length>=MAXR-2)continue;r=makeRig(rigs.length);rigs.push(r)}
        r.p=p;r.cur={};r.fallK=(p.fall?1:0);r.sgOK=false;r.bsd=p.x<CX?-1:1;r.lyT=9;r.wasLy=false;r.seen=stamp;bind.set(p,r)}
      const dt=Math.min(.05,(now-(S.last||now))/1000)||.016;S.last=now;
      for(const r of rigs)r.mesh.visible=false;kkHideAll();KK.stamp++;KK.cur=VIS;
      ctx.save();
      for(let rank=0;rank<VIS.length;rank++){const p=VIS[rank].p,pr=VIS[rank].pr,r=bind.get(p);if(kkUse(p)){kkDraw(p,pr,rank,dt,now);continue}if(!r)continue;colour(r,p);
        const L=lookOf(p.d),star=!!(p.d.star||p.d.special),h=playerPx(pr,L.h,star),sc=h/MH*TILT0/Math.cos(CFG.tilt),lying=p.fall||(p.knock&&p.stun>0);
        ctx.fillStyle='rgba(0,0,0,.32)';ctx.beginPath();ctx.ellipse(pr.sx,pr.sy+(pr.lift||0),h*(lying?.42:.25),h*(lying?.13:.085),0,0,7);ctx.fill();
        if(p===F.carrier&&F.mode==='live'&&!lying){const s=h/16.2;ctx.strokeStyle='#38c6d9';ctx.lineWidth=Math.max(2,s*.7);ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,s*4.6,s*1.9,0,0,7);ctx.stroke()}
        const hasBall=p===F.carrier&&!F.ballAir&&F.mode!=='pre'&&!F.snap;
        if(hasBall){const rel=p.x-CX;if(Math.abs(rel)>8&&Math.sign(rel)!==r.bsd&&Math.abs(p.vx)>3)r.bsd=Math.sign(rel)}
        INFO.hasBall=hasBall;INFO.stance=F.mode==='pre'&&(p.role==='OL1'||p.role==='OL2'||p.pos==='DL');INFO.qbHold=hasBall&&p.role==='QB'&&F.passer===p;
        INFO.heldBall=!!(F.ballAir&&F.ball&&F.ball.t<0&&F.passer===null&&p.role==='QB');INFO.catching=!!(F.ballAir&&F.ball&&p===F.ball.target&&dist(p,F.ball.cur)<5);
        if(p.throwT>0&&F.ballAir&&F.ball&&F.ball.t<0)INFO.heldBall=true;
        pose(r,p,dt,INFO);
        const N=r.N;let fa=p.fa+(p.spin>0?(1-p.spin/.4)*TAU:0);if(p.dizzy&&p.stun>0)fa+=Math.sin(now/120)*.4;
        const want=Math.atan2(Math.cos(fa),-Math.sin(fa));
        N.yaw.rotation.y=r.cur.yw===undefined?want:r.cur.yw+angDiff(r.cur.yw,want)*Math.min(1,dt*20);r.cur.yw=N.yaw.rotation.y;
        N.tilt.rotation.x=CFG.tilt;
        N.root.position.set(pr.sx,H-pr.sy,rank*600);N.root.scale.setScalar(sc);
        N.root.updateMatrixWorld(true);
        if(r.fallK<.5){const gap=feet(r)-(H-pr.sy);if(Math.abs(gap)>.01){N.root.position.y-=gap;N.root.updateMatrixWorld(true)}}   // the lowest shoe stands on the player's spot
        r.mesh.visible=true;r.sk.update()}
      ctx.restore();kkEnd();
      for(const r of rigs)balls(r);
      ballIM.count=rigs.length*3;ballIM.instanceMatrix.needsUpdate=true;
      R.info.reset();R.setRenderTarget(rt);R.clear();R.render(scene,cam3);R.setRenderTarget(null);R.render(qs,qc);
      ctx.drawImage(glc,0,0,W,H);
      S.on=true;S.frames++;S.rigs=bind.size;S.calls=R.info.render.calls;S.tris=R.info.render.triangles;S.ms=S.ms*.9+(performance.now()-t0)*.1;
      return true}
    catch(e){S.err=String(e&&e.message||e);S.ok=false;S.on=false;try{console.error('[CF] 3D players off after an error: '+S.err);lab()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return false}}
  /* ---------- customization preview (MY SQUAD, MY TEAM, gear): the same figure, standing, front and back ---------- */
  const PVR=[],PINFO={hasBall:false,stance:false,qbHold:false,heldBall:false,catching:false,prev:true};
  function preview(cvs,figs){
    if(!S.want||S.lost||!init())return false;
    if(kkPreview(cvs,figs))return true;   // v3.30T
    try{
      const b=cvs.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(120,Math.round(b.width||340)),h=Math.max(80,Math.round(b.height||215)),pw=Math.round(w*dpr),ph=Math.round(h*dpr);
      if(cvs.width!==pw||cvs.height!==ph){cvs.width=pw;cvs.height=ph}
      if(!Z){Z=new T.Matrix4().makeScale(0,0,0);FOOT=new T.Vector3()}
      sync();R.setSize(pw,ph,false);rt.setSize(pw,ph);qm.uniforms.px.value.set(1/pw,1/ph);qm.uniforms.w.value=CFG.outline*dpr*1.5;cw=ch=0;
      cam3.left=0;cam3.right=pw;cam3.top=ph;cam3.bottom=0;cam3.updateProjectionMatrix();
      for(const r of rigs)r.mesh.visible=false;kkHideAll();ballIM.count=0;
      const gy=ph*.05;
      for(let i=0;i<2;i++){let r=PVR[i];if(!r){r=makeRig(MAXR-1-i);PVR[i]=r}const f=figs[i];r.mesh.visible=false;
        if(!f)continue;
        const p={d:f.d,pos:f.d.pos,role:f.d.pos,name:f.d.name,num:f.num,team:'O',vx:0,vy:0,ph:0,fa:0,_uni:f.uni};
        r.p=p;r.cur={};r.sgOK=false;r.sg=[];r.bsd=1;r.fallK=0;colour(r,p);pose(r,p,.016,PINFO);
        const bw=BW[r.build]||1,N=r.N,sc=Math.min(ph*.86,pw*.5/Math.max(.7,.62+.55*(bw-.9)))/MH;N.yaw.rotation.y=f.yaw;N.tilt.rotation.x=.1;N.root.position.set(pw*f.x,gy,i*600+100);N.root.scale.setScalar(sc);N.root.updateMatrixWorld(true);
        const gap=feet(r)-gy;if(Math.abs(gap)>.01){N.root.position.y-=gap;N.root.updateMatrixWorld(true)}
        r.mesh.visible=true;r.sk.update();r.p=null}
      R.setRenderTarget(rt);R.clear();R.render(scene,cam3);R.setRenderTarget(null);R.render(qs,qc);
      const g=cvs.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,pw,ph);g.drawImage(glc,0,0,pw,ph,0,0,pw,ph);
      for(const r of PVR)r.mesh.visible=false;
      S.pv=(S.pv||0)+1;return true}
    catch(e){S.err=String(e&&e.message||e);S.ok=false;S.on=false;try{console.error('[CF] 3D preview off after an error: '+S.err);lab()}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return false}}
  function menuBtn(){const ro=document.getElementById('mRO');if(!ro||document.getElementById('m3D'))return;const row=ro.parentNode,b=document.createElement('button');b.className='btn';b.id='m3D';
    lab=()=>{b.textContent='PLAYERS: '+(S.want?'3D':'2D')+(S.err?' (3D OFF: '+S.err.slice(0,40)+')':'')};lab();setTimeout(()=>{if(window.THREE===undefined)init()},0);
    b.onclick=()=>{S.want=!S.want;try{localStorage.setItem('cf_3d',S.want?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}lab()};row.appendChild(b)}
  setTimeout(menuBtn,0);
  setTimeout(()=>{const ro=document.getElementById('mRO');if(!ro||document.getElementById('mKK'))return;const b=document.createElement('button');b.className='btn';b.id='mKK';
    const lb=()=>{b.textContent='PLAYER MODELS: '+(KK.want?'KAYKIT (TEST)':'CLASSIC')+(KK.err?' (KAYKIT OFF: '+KK.err.slice(0,40)+')':'')};lb();b.onclick=()=>{KK.want=!KK.want;try{localStorage.setItem('cf_kk',KK.want?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}lb()};ro.parentNode.appendChild(b);
    const b2=document.createElement('button');b2.className='btn';b2.id='mKA';const lb2=()=>{b2.textContent='MATCH MOVES: '+(KA.off?'BASIC (v3.28T)':'KAYKIT (TEST)')};lb2();b2.onclick=()=>{KA.off=!KA.off;try{localStorage.setItem('cf_kka',KA.off?'0':'1')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}lb2()};ro.parentNode.appendChild(b2);
    const b3=document.createElement('button');b3.className='btn';b3.id='mKB';const lb3=()=>{b3.textContent='LINEMEN: '+(KB.want?'BIG BODY (TEST)':'MEDIUM (v3.30T)')+(KB.err?' (BIG OFF: '+KB.err.slice(0,40)+')':'')};lb3();b3.onclick=()=>{KB.want=!KB.want;try{localStorage.setItem('cf_kkb',KB.want?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}lb3()};ro.parentNode.appendChild(b3)},0);
  setTimeout(()=>{const ro=document.getElementById('mRO');if(!ro||document.getElementById('mRC'))return;const b=document.createElement('button');b.className='btn';b.id='mRC';
    const lb=()=>{b.textContent='RUNNER CAMERA: '+(window.RUNCAM&&RUNCAM.on?'ON':'OFF')};lb();b.onclick=()=>{RUNCAM.on=!RUNCAM.on;try{localStorage.setItem('cf_runcam',RUNCAM.on?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}lb()};ro.parentNode.appendChild(b)},0);
  /* ============ v3.34T TOWN TEST (CF_85 Build 5): bakes KayKit figures into flat pictures for the top-down town (decision D1).
     Look only. Renders one strip per facing (front, back, side) of the given frames into plain 2D canvases, then hides its own rigs
     again, so matches and previews are untouched. Returns null while the model files are still loading. ============ */
  const KTR=[];
  function kkTown(spec){
    if(!init()||!kkInit())return null;
    const n=spec.frames.length,cwp=spec.cw,pw=cwp*n,ph=spec.ch,out=[];
    sync();R.setSize(pw,ph,false);rt.setSize(pw,ph);qm.uniforms.px.value.set(1/pw,1/ph);qm.uniforms.w.value=spec.outline!=null?spec.outline:CFG.outline*2;cw=ch=0;
    cam3.left=0;cam3.right=pw;cam3.top=ph;cam3.bottom=0;cam3.updateProjectionMatrix();
    for(const r of rigs)r.mesh.visible=false;kkHideAll();ballIM.count=0;for(const r of KSR.concat(KSRB).filter(Boolean)){r.mesh.visible=false;r.N.root.visible=false}
    const p={d:spec.d,team:'O',num:spec.num,_uni:spec.uni,fa:0};
    try{
      for(let i=0;i<n;i++){let r=KTR[i];if(!r){r=kkMakeRig(300+i,false);KTR[i]=r}r.sg=[];kkColour(r,p);
        if(spec.plain){r.U.nc.value.copy(r.U.cols.value[0]);r.U.no.value.copy(r.U.cols.value[0]);r.U.cols.value[5].copy(r.U.cols.value[2]);r.U.cols.value[7].copy(r.U.cols.value[2]);r.U.cols.value[9].copy(r.U.cols.value[2])}   // street clothes: no number, bare hands
        r.helm.visible=spec.helm!==false;r.pads.visible=spec.pads!==false;r.ball.visible=false}
      for(const yaw of spec.yaws){
        for(let i=0;i<n;i++){const r=KTR[i],f=spec.frames[i];r.mixer.stopAllAction();kkRestPose(r);const a=kkAct(r,f.clip)||kkAct(r,KKCFG.idleClip);a.reset();a.play();a.weight=1;a.timeScale=1;r.mixer.setTime(f.t||0);
          r.B.head.scale.setScalar(spec.head||KKCFG.head);
          const N=r.N;N.yaw.rotation.y=yaw;N.tilt.rotation.x=spec.tilt||0;N.fall.rotation.set(0,0,0);N.fall.position.set(0,0,0);
          N.root.position.set(cwp*(i+.5),ph*spec.foot,i*600+100);N.root.scale.setScalar(ph*spec.fill/kkHeight());N.root.visible=true;N.root.updateMatrixWorld(true);r.mesh.visible=true;r.sk.update()}
        R.setRenderTarget(rt);R.clear();R.render(scene,cam3);R.setRenderTarget(null);R.render(qs,qc);
        const c=document.createElement('canvas');c.width=pw;c.height=ph;c.getContext('2d').drawImage(glc,0,0,pw,ph,0,0,pw,ph);out.push(c)}
    }finally{for(const r of KTR){r.mesh.visible=false;r.N.root.visible=false;r.helm.visible=true;r.pads.visible=true;r.sg=[]}}
    return out}
  return{draw,preview,init,S,CFG,KKCFG,KACFG,kkShowcase,_syncVenue:()=>LT&&LT._syncVenue&&LT._syncVenue(),kkTown,kkClipDur:n=>KK.clips[n]?KK.clips[n].duration:0,kkViewer,kkKick,kkProbe,kkSample,kkHud:l=>{kkHud(l);try{kbSpace(l)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}},kkPreview,kbIs,get kb(){return{hM:KB.hM,hL:KB.hL,cM:KB.cM,cL:KB.cL,HB:KB.HB,CB:KB.CB,MHB:KK.HB,MCB:KK.CB,ok:KB.ok,err:KB.err,want:KB.want,on:KBCFG.on,spaced:KB.spaced||0,scale:KB.ok?+kbScale().toFixed(3):0,uk:KB.uk,fs:KB.fs,clips:Object.keys(KB.clips)}},get ka(){return{pops:KA.pops,off:KA.off,n:KA.n,all:KA.all,bad:KA.bad,clips:Object.keys(KA.ev),log:KA.log,foot:KA.fs}},get kk(){return{foot:KFS,want:KK.want,ok:KK.ok,err:KK.err,rigs:KK.bind.size,made:KK.rigs.length,clips:Object.keys(KK.clips),bound:[...KK.bind].map(([p,r])=>({role:p.role,team:p.team,rig:r.i,big:!!r.lg,clip:r.cur,ov:r.ovNow?r.ovNow.n:'',ovw:r.ovNow?+r.ovNow.w.toFixed(2):0,fallK:+(r.fallK||0).toFixed(2),ball:r.ball.visible,ts:r.cur&&r.act[r.cur]?+r.act[r.cur].timeScale.toFixed(2):0,spd:+Math.hypot(p.vx||0,p.vy||0).toFixed(2)}))}},kkDbg(p){const r=KK.bind.get(p);if(!r)return null;const v=new T.Vector3(),vs=[0,3000,6000].map(i=>r.mesh.getVertexPosition(i,v).toArray().map(x=>+x.toFixed(1)));const hw=new T.Vector3();r.helm.getWorldPosition(hw);const bw=['root','hips','chest','head','foot_l'].map(n=>r.B[n].getWorldPosition(new T.Vector3()).toArray().map(x=>+x.toFixed(1)));const ib=KK.IBM[0].elements.map(x=>+x.toFixed(2));const bl=['root','hips','head'].map(n=>r.B[n].position.toArray().map(x=>+x.toFixed(3)));return{bw,ib,bl,vs,helm:hw.toArray().map(x=>+x.toFixed(1)),root:r.N.root.position.toArray().map(x=>+x.toFixed(1)),sc:r.N.root.scale.x,vis:[r.mesh.visible,r.N.root.visible],W,H,clip:r.cur,cols:r.U.cols.value.map(c=>'#'+c.getHexString()),num:r.sg[8]}},get canvas(){return glc},get info(){return{on:S.on,ok:S.ok,want:S.want,err:S.err,frames:S.frames,rigs:S.rigs,calls:S.calls,tris:S.tris,ms:+S.ms.toFixed(2),lost:S.lost,pv:S.pv||0,
    bound:[...bind].map(([p,r])=>({role:p.role||p.id,team:p.team,rig:r.i,body:r.bt,build:r.build}))}},
    dbgParts(p){const r=bind.get(p);if(!r)return null;return{build:r.build,cols:r.U.cols.value.map(c=>'#'+c.getHexString())}},
    debugRig(p){const r=bind.get(p);if(!r)return null;const a=r.P.shoeR.localToWorld(new T.Vector3(0,-.5,0)),v=r.P.shoeL.localToWorld(new T.Vector3(0,-.5,0));return{rig:r.i,root:r.N.root.position.toArray(),feetY:Math.min(a.y,v.y),yaw:r.N.yaw.rotation.y,fallK:r.fallK}}}
})();
window.CF3D=P3D;
/* ============ v3.07 (item 16) BIG MOVE MOMENTS: look only. No dice are rolled here, so no odds change. ============
   - Screen-wide callout (the big #fx text) for ANKLE BREAKER!, STIFF ARM! and BIG HIT!.
   - Ghost trail: fading afterimages of the runner along a juke (drawn under the players, in his jersey colour).
   - Big hits (a hard tackle, a stiff-arm win): a short white flash and a hit-stop (the play freezes for HITSTOP seconds).
   - A stiff-armed defender is lifted off the ground in an arc while he is thrown aside (where he lands does not change).
   LITE EFFECTS turns off the trail and the hit-stop. */
const BM=window.BM={stop:.12,moveStop:.05,flash:.14,ghostLife:.38,ghostA:.55,ghostStretch:2.2,arcH:1.3,arcT:.5,trail:.7,trailW:1.5,trailA:.8,glow:.7,lines:22};   // v3.09: big-hit stop .08 -> .12 s; .05 s on every move that works; ribbon trail (seconds kept, width as a share of his height, strength); speed lines
const MVC=window.MVC={juke:'#3dff7a',stiff:'#ff7a2e',spin:'#ff4fd8',hit:'#ffffff',bad:'#ff4a4a'};   // v3.09 callout colour per move
let hitStop=0;
const LIVE=window.LIVE={speed:1.15};let LIVE_SPEED=1.35;Object.defineProperty(LIVE,'speed',{get:()=>LIVE_SPEED,set:v=>{LIVE_SPEED=+v||1}});   // v3.10 (user approved): live play runs 15% faster (both teams, every timer inside a play); banners and the time between plays are untouched
const bmLite=()=>document.body.classList.contains('lite');
function bmCall(t,col,g){fxText(t,col,g)}
function bmHide(){if(popups.length)popups[popups.length-1].hid=true}
function bmSay(t,col){bmHide();if(col){bmCall(t,col);return}fxText.meh=true;bmCall(t,'#d8d2c4','rgba(0,0,0,0)')}   // v3.13 B5: no colour given = a failure: small grey, no glow (BROKEN TACKLE! passes its colour and stays big)   // v3.10: the runner's own message goes up in the big style; its small popup is kept for the log but not drawn
function bmBigHit(){haptic('heavy');if(bmLite()){flashT=Math.max(flashT,BM.flash);bmShake(.75);return}   // v3.13: ONE flash. LITE EFFECTS keeps the old soft white flash; otherwise the impact frame replaces it
  hitStop=Math.max(hitStop,BM.stop);const c=F&&F.carrier,h=c?c.h:Math.PI/2;bmBigHit.t=performance.now();
  bmShake(.75,-Math.cos(h)*.8,Math.sin(h)*.8);bmPunch(.08);bmImpact(c,'#fff');bmImpactFrame()}
function bmMove(c){haptic('light');if(!bmLite())hitStop=Math.max(hitStop,BM.moveStop);if(c)c.glowT=BM.glow;
  if(c&&!bmLite()&&performance.now()-(bmBigHit.t||0)>80){bmShake(.3,(c.vx||0)>0?.5:-.5,0);bmPunch(.05);bmImpact(c,c.spinT>0?MVC.spin:c.arm>0?MVC.stiff:MVC.juke);bmImpactFrame()}}   // v3.13: a move that works (ANKLE BREAKER, SPIN, TRUCK) also flashes (user, 2026-11-14)
/* v3.13 TOUCHDOWN: shake, punch, gold burst and the impact frame (LITE EFFECTS: the old white flash) */
function bmTD(){haptic('success');if(bmLite()){flashT=Math.max(flashT,.5);bmShake(.6);return}hitStop=Math.max(hitStop,TD_FREEZE);const c=F&&F.carrier;bmShake(.6);bmPunch(.08);bmImpact(c,'#ffd23a');bmImpactFrame()}
/* v3.13 B1 TRAUMA SHAKE: strength builds with each hit (0..1), felt as trauma^2, fades in about 0.45 s. Smooth noise, not random jitter.
   dx,dy = which way the hit pushed (screen units, -1..1); the shake leans that way. LITE EFFECTS: 40%. */
const SHK=window.SHK={tr:0,max:16,rot:.014,decay:2.2,dx:0,dy:0};
function bmShake(a,dx,dy){SHK.tr=Math.min(1,SHK.tr+a*(bmLite()?.4:1));if(dx!==undefined){SHK.dx=dx;SHK.dy=dy||0}}
function bmShakeApply(rdt){if(shakeT>0&&SHK.tr<.3)SHK.tr=.3;   // older callers that only set shakeT still shake, softly
  if(SHK.tr<=0)return;const s=SHK.tr*SHK.tr,t=performance.now()/1000,n=(f,o)=>Math.sin(t*f+o)*.6+Math.sin(t*f*2.3+o*1.7)*.4;
  const ox=(n(47,1)+SHK.dx*.7)*SHK.max*s,oy=(n(53,4)+SHK.dy*.7)*SHK.max*s,z=1+.035*s;   // z: a tiny zoom so the corners stay covered
  ctx.translate(W/2+ox,H/2+oy);ctx.rotate(n(31,7)*SHK.rot*s);ctx.scale(z,z);ctx.translate(-W/2,-H/2);
  SHK.tr=Math.max(0,SHK.tr-SHK.decay*rdt);const _sd=Math.exp(-9.75*rdt);SHK.dx*=_sd;SHK.dy*=_sd}
/* v3.13 B2 CAMERA PUNCH: a quick spring push-in toward the carrier on impact and on the TURBO press (never zooms out). Off with LITE EFFECTS. */
const PUNCH=window.PUNCH={z:0,v:0,k:220,d:16,was:false};
function bmPunch(a){if(!bmLite())PUNCH.v+=a*28}
function bmPunchApply(rdt){const c=F&&F.carrier,dt=Math.min(rdt,.033);
  if(c&&c.spr&&!PUNCH.was&&F.mode==='live')bmPunch(.045);PUNCH.was=!!(c&&c.spr);   // TURBO press = a small kick
  PUNCH.v+=(-PUNCH.k*PUNCH.z-PUNCH.d*PUNCH.v)*dt;PUNCH.z+=PUNCH.v*dt;if(Math.abs(PUNCH.z)<1e-4&&Math.abs(PUNCH.v)<1e-3){PUNCH.z=0;PUNCH.v=0}
  const s=1+Math.max(0,PUNCH.z);if(s<1.001)return;const pr=c?P(c.x,c.y):{sx:W/2,sy:H/2};ctx.translate(pr.sx,pr.sy);ctx.scale(s,s);ctx.translate(-pr.sx,-pr.sy)}
/* v3.13 B3 IMPACT BURST: comic-style streaks + a core flash at the hit, 0.22 s. IMPACT FRAME: a 50 ms colour-invert of the picture, the ONE flash for
   big hits, touchdowns and moves that work. Photosensitivity: at most one every 0.6 s (under 2 a second). Both off with LITE EFFECTS. */
const IMP=[],IMPF=window.IMPF={t:0,last:-1e9,gap:600,n:0};
function bmImpact(p,col){if(!p||bmLite())return;IMP.push({x:p.x,y:p.y,t:0,col:col||'#fff',a:Math.random()*TAU});if(IMP.length>6)IMP.shift()}
function bmImpactFrame(){if(bmLite())return;const n=performance.now();if(n-IMPF.last<IMPF.gap)return;IMPF.last=n;IMPF.t=.05;IMPF.n++}
function bmImpactDraw(rdt){
  for(let i=IMP.length-1;i>=0;i--){const m=IMP[i];m.t+=rdt;const k=m.t/.22;if(k>=1){IMP.splice(i,1);continue}
    const pr=P(m.x,m.y),h=playerPx(pr,1,0),cx=pr.sx,cy=pr.sy-h*.5,r0=h*(.3+.9*k),r1=r0+h*(.9-.6*k);
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=m.col;ctx.fillStyle=m.col;ctx.lineCap='round';
    for(let j=0;j<14;j++){const a=m.a+j*TAU/14+(j%2)*.12;ctx.globalAlpha=(1-k)*(j%2?.6:1);ctx.lineWidth=(j%2?2:5)*(1-k)+1;
      ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);ctx.lineTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);ctx.stroke()}
    ctx.globalAlpha=(1-k)*.9;ctx.beginPath();ctx.arc(cx,cy,h*.28*(1-k),0,TAU);ctx.fill();ctx.restore()}
  if(IMPF.t>0){IMPF.t-=rdt;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='difference';ctx.globalAlpha=.85;ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.width,cv.height);ctx.restore()}}   // v3.09: a move that works: a tiny freeze and the ribbon trail lights up
function bmLaunch(d){d.air={t:0,T:BM.arcT,h:BM.arcH}}
function bmStep(dt){if(!F)return;for(const p of F.all){if(p.air){p.air.t+=dt;if(p.air.t>=p.air.T)p.air=null}}
  const c=F.carrier;if(c&&c.dash&&!bmLite()){const g=c.ghost||(c.ghost=[]);const n=performance.now()/1000;if(!g.length||n-g[g.length-1].t>.035)g.push({x:c.x,y:c.y,t:n});if(g.length>10)g.shift()}
  if(c&&F.mode==='live'&&!F.ballAir&&!bmLite()){const n=performance.now()/1000,tr=c.trl||(c.trl=[]);tr.push({x:c.x,y:c.y,t:n});while(tr.length&&n-tr[0].t>BM.trail)tr.shift();if(c.glowT>0)c.glowT-=dt}}   // v3.09: the carrier's path for the ribbon trail
/* the list of players to draw: lifted players get a raised copy of their screen spot (pr.lift = pixels above the ground) */
function bmLift(list){for(const e of list){const a=e.p.air;if(!a)continue;const k=a.t/a.T,lift=a.h*Math.sin(Math.PI*k)*e.pr.u;if(lift>.5)e.pr=Object.assign({},e.pr,{sy:e.pr.sy-lift,lift})}}
/* v3.09 RIBBON TRAIL: a thick glowing ribbon along the carrier's last half second, in his jersey colour with a bright core, while a move is lighting him up
   (a juke, spin or stiff arm that works) or while he sprints in the runner camera. Drawn under the players. Off with LITE EFFECTS. */
function bmRibbon(){const c=F&&F.carrier;if(!c||bmLite()||!c.trl||c.trl.length<3||F.mode!=='live')return;
  const on=Math.max(c.glowT>0?c.glowT/BM.glow:0,c.dash?1:0,(c.spr&&CAMR>.5)?1:0,c.spinT>0?1:0);if(on<=.02)return;
  const n=performance.now()/1000,col=trailCol(c)||(uniFor(c)||{}).jc||'#38c6d9',pts=c.trl.map(q=>{const pr=P(q.x,q.y);return{x:pr.sx,y:pr.sy,w:pr.u*BM.trailW,k:1-(n-q.t)/BM.trail}});   /* v3.10: laid on the turf behind him (trailW = yards wide): at chest height the runner's own body hid it from the behind camera */
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.lineJoin='round';
  for(const [cc,wk,al] of [[col,1,BM.trailA],['#7ff6ff',.4,BM.trailA]]){ctx.strokeStyle=cc;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],k=Math.max(0,b.k);if(k<=0)continue;ctx.globalAlpha=al*k*on;ctx.lineWidth=Math.max(1,b.w*wk*(.35+.65*k));ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
  ctx.restore()}
/* v3.09 SPEED LINES at the screen edges while the carrier sprints (TURBO) in the runner camera. Off with LITE EFFECTS. */
function bmSpeedLines(){const c=F&&F.carrier,hot=!!(F&&F.combo&&F.combo.n>=3&&F.t<=F.combo.until);if(!c||(!c.spr&&!hot)||CAMR<.5||bmLite()||F.mode!=='live')return;const cx=W/2,cy=H*.45,R=Math.hypot(W,H)*.5,t=performance.now();
  ctx.save();ctx.strokeStyle='#e6fbff';ctx.lineCap='round';for(let i=0;i<BM.lines;i++){const a=(i/BM.lines)*TAU+.13+Math.sin(i*5.1)*.1,ph=((t/260+i*.37)%1),r0=R*(.5+ph*.3),r1=r0+R*(.12+.1*ph),ky=H/W*1.15;   // streaks fly outward from the middle of the picture
    ctx.globalAlpha=CAMR*.5*Math.sin(Math.PI*ph);ctx.lineWidth=1.5+(i%3);ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0*ky);ctx.lineTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1*ky);ctx.stroke()}ctx.restore()}
function bmGhosts(){bmRibbon();if(!F||bmLite())return;const n=performance.now()/1000;
  for(const p of F.offList){const g=p.ghost;if(!g||!g.length)continue;while(g.length&&n-g[0].t>BM.ghostLife)g.shift();if(!g.length)continue;
    const col=trailCol(p)||(uniFor(p)||{}).jc||'#ffffff';ctx.save();ctx.fillStyle=col;ctx.globalCompositeOperation='lighter';   // glowing afterimages
    for(const q of g){const k=1-(n-q.t)/BM.ghostLife,pr=P(p.x+(q.x-p.x)*BM.ghostStretch,p.y+(q.y-p.y)*BM.ghostStretch),   // stretched back along the cut so the trail reads at game size
      h=playerPx(pr,lookOf(p.d).h,!!(p.d.star||p.d.special));ctx.globalAlpha=BM.ghostA*k;
      ctx.beginPath();ctx.ellipse(pr.sx,pr.sy-h*.42,h*.17,h*.36,0,0,7);ctx.fill();ctx.beginPath();ctx.arc(pr.sx,pr.sy-h*.86,h*.12,0,7);ctx.fill()}
    ctx.restore()}}
/* ============ v3.08 (item 17) A FIELD WITH LIFE: look only, no dice rolled, nothing a play depends on. NO CROWD (canon). ============
   - Glowing goalposts at both end lines (y 110 and -10) in the town's two colours.
   - Light pillars: soft beams rising at both sidelines (0.8 yd out) every 20 yards, slowly pulsing (still with LITE EFFECTS on).
   - Sideline objects (cones, barrels) 1.4 yards outside the sidelines: a player who runs into one knocks it flying (it slides, tumbles
     and lies where it stops); they are set back up for every new play.
   - Turf marks: a dark scuff where a tackle or a hard cut happens; they stay for the match (at most FL.max).
   Drawn every frame after the field and before the players (game/14 drawEntities calls flDraw). */
const FL=window.FL={max:40,objGap:12,pillarGap:10,pillarW:1.1,pillarH:18,f:null,g:null,objs:[],marks:[]};
function flTheme(){const t=G&&G.crew&&typeof TOWN_THEMES!=='undefined'&&TOWN_THEMES[G.crew.town];return t||(typeof TOWN_FALLBACK!=='undefined'?TOWN_FALLBACK:{a:'#9fb2c8',b:'#5d6f86'})}
function flReset(){FL.objs=[];let i=0;for(const sd of [-1,1])for(let y=-4;y<=104;y+=FL.objGap){FL.objs.push({x:sd<0?-1.4:FW+1.4,y:y+(sd>0?FL.objGap/2:0),vx:0,vy:0,a:0,va:0,tip:0,k:(i++)%3===2?'barrel':'cone'})}}
function flMark(x,y,s){if(!G)return;FL.marks.push({x,y,s:s||1});if(FL.marks.length>FL.max)FL.marks.shift()}
function flStep(dt){if(!F||!G)return;
  if(FL.g!==G){FL.g=G;FL.marks=[]}if(FL.f!==F){FL.f=F;flReset()}
  for(const o of FL.objs){
    for(const p of F.all){const vx=p.sv?p.sv.x:p.vx||0,vy=p.sv?p.sv.y:p.vy||0,sp=Math.hypot(vx,vy);if(sp<1.5)continue;const dx=o.x-p.x,dy=o.y-p.y,d=Math.hypot(dx,dy);
      if(d<.9){const n=d||1;o.vx=vx*1.1+dx/n*1.6;o.vy=vy*1.1+dy/n*1.6;o.va=(dx>=0?1:-1)*(6+sp);o.tip=1}}
    if(o.vx||o.vy){o.x+=o.vx*dt;o.y+=o.vy*dt;const f=Math.exp(-2.6*dt);o.vx*=f;o.vy*=f;o.a+=o.va*dt;o.va*=f;if(Math.hypot(o.vx,o.vy)<.05){o.vx=o.vy=0;o.va=0}}}}
function flVisible(pr){return pr.sy>-40&&pr.sy<H+60&&pr.sx>-80&&pr.sx<W+80}
function flDraw(){if(!F||!G||camMode()==='side')return;const th=flTheme(),t=performance.now()/1000,lite=document.body.classList.contains('lite'),ymin=cam.y-6;
  ctx.save();
  // turf marks (under everything)
  ctx.fillStyle='#000';for(const m of FL.marks){if(m.y<ymin)continue;const pr=P(m.x,m.y);if(!flVisible(pr))continue;ctx.globalAlpha=.22;ctx.beginPath();ctx.ellipse(pr.sx,pr.sy,pr.u*.55*m.s,pr.u*.16*m.s,0,0,7);ctx.fill();ctx.globalAlpha=.12;ctx.beginPath();ctx.ellipse(pr.sx+pr.u*.35*m.s,pr.sy+pr.u*.04,pr.u*.3*m.s,pr.u*.09*m.s,0,0,7);ctx.fill()}
  ctx.globalAlpha=1;
  // light pillars, then the goalposts (additive glow)
  ctx.globalCompositeOperation='lighter';
  let i=0;for(const sd of [0,1])for(let y=0;y<=100;y+=FL.pillarGap){i++;if(y<ymin)continue;const x=sd?FW+.8:-.8,a=P(x,y);if(!flVisible(a))continue;if(RT2()){shipLantern(a,sd?th.a:th.b,lite,t,i);continue}
    const col=sd?th.a:th.b,hgt=FL.pillarH*a.u*.9,w=Math.max(2,(lite?.5:FL.pillarW)*a.u),   /* v3.09: columns of light, every 10 yd (were thin lines every 20) */pulse=lite?.7:.55+.3*Math.sin(t*1.6+i*1.3),gr=ctx.createLinearGradient(0,a.sy,0,a.sy-hgt);
    gr.addColorStop(0,col);gr.addColorStop(.5,col+'99');gr.addColorStop(1,col+'00');ctx.fillStyle=gr;
    const _pDim=(F&&F.mode==='live')?.52:1;ctx.globalAlpha=pulse*.26*_pDim;ctx.fillRect(a.sx-w*1.1,a.sy-hgt,w*2.2,hgt);   // soft halo
    ctx.globalAlpha=pulse*.55*_pDim;ctx.fillRect(a.sx-w/2,a.sy-hgt,w,hgt);   // bright core
    ctx.globalAlpha=pulse*.7;ctx.beginPath();ctx.ellipse(a.sx,a.sy,w*1.6,w*.4,0,0,7);ctx.fill()}   // light pool at its foot
  for(const [yy,col] of [[110,th.a],[-10,th.b]]){if(yy<ymin)continue;if(RT2()){shipGoalMast(yy,col,lite,t);continue}const base=P(CX,yy);if(!flVisible(base)&&!flVisible({sx:base.sx,sy:base.sy-14*base.u,u:base.u}))continue;
    const v=base.u*.9,L=P(CX-3.08,yy),R=P(CX+3.08,yy),cb=3.3*v,up=13.3*v,seg=[[base.sx,base.sy,base.sx,base.sy-cb],[L.sx,L.sy-cb,R.sx,R.sy-cb],[L.sx,L.sy-cb,L.sx,L.sy-up],[R.sx,R.sy-cb,R.sx,R.sy-up]];
    ctx.lineCap='round';for(const [lw,al] of [[Math.max(4,v*.6),.22],[Math.max(2,v*.22),.9]]){ctx.globalAlpha=al;ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.beginPath();for(const s of seg){ctx.moveTo(s[0],s[1]);ctx.lineTo(s[2],s[3])}ctx.stroke()}}
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
  // sideline objects
  for(const o of FL.objs){if(o.y<ymin)continue;const pr=P(o.x,o.y);if(!flVisible(pr))continue;const v=pr.u*.9;ctx.save();ctx.translate(pr.sx,pr.sy);ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(0,0,v*.35,v*.1,0,0,7);ctx.fill();
    ctx.rotate(o.tip?Math.PI/2*Math.sign(o.va||1)+o.a*.15:0);
    if(RT2()){shipObj(o,v)}else if(o.k==='cone'){ctx.fillStyle='#ff7a1f';ctx.beginPath();ctx.moveTo(-v*.22,0);ctx.lineTo(v*.22,0);ctx.lineTo(0,-v*.62);ctx.closePath();ctx.fill();ctx.fillStyle='#fff3d0';ctx.fillRect(-v*.12,-v*.36,v*.24,v*.08);ctx.fillStyle='#14110f';ctx.fillRect(-v*.28,-v*.04,v*.56,v*.06)}
    else{ctx.fillStyle='#2a3340';ctx.fillRect(-v*.2,-v*.55,v*.4,v*.55);ctx.fillStyle=th.a;ctx.globalAlpha=.85;ctx.fillRect(-v*.2,-v*.42,v*.4,v*.06);ctx.fillRect(-v*.2,-v*.2,v*.4,v*.06);ctx.globalAlpha=1}
    ctx.restore()}
  ctx.restore()}

/* ============================ loop ============================ */
let last=performance.now();
let hudAt=0,flashOn=false,perfSum=0,perfN=0,perfBad=0;
window.__perfLvl=0;
/* Quality governor: if the phone can't hold ~38 fps for a second and a half, drop the outline to its cheaper setting, then lower the canvas resolution a notch. It never goes back up, so it can't flicker. */
function perfTick(raw){
  if(raw>120||!G||!F||F.mode!=='live'){perfSum=0;perfN=0;return}
  perfSum+=raw;perfN++;
  if(perfN>=60){if(perfSum/perfN>28){if(++perfBad>=3&&window.__perfLvl<2){window.__perfLvl++;perfBad=0;if(window.__perfLvl>=2)resize()}}else perfBad=0;perfSum=0;perfN=0}
}
(()=>{const syncTgt=()=>{try{const h=$('#hud');if(!h||h.hidden)return;const t=$('#tgtTag'),b=$('#bug'),a=$('#app');if(!t||!b||!a)return;const br=b.getBoundingClientRect(),ar=a.getBoundingClientRect();if(br.width){t.style.left=(br.right-ar.left+6)+'px';t.style.top=(br.top-ar.top+(br.height-t.offsetHeight)/2)+'px'}}catch(e){window.CFRuntime&&window.CFRuntime.warn('syncTgt',e)}};const b=$('#bug'),a=$('#app');if(typeof ResizeObserver==='function'&&b&&a){const ro=new ResizeObserver(syncTgt);ro.observe(b);ro.observe(a)}window.addEventListener('resize',syncTgt);if(window.onUI)window.onUI('hud:update',syncTgt);syncTgt()})();
const fpsBuf=[];let fpsLive=false,fpsAt=0,fpsLast='';   // playtest readout: median fps of the current / last play and the drawing density
function fpsTick(raw,now){const live=!!(F&&F.mode==='live'&&!OWON);if(live&&!fpsLive){fpsBuf.length=0;ART.upPlay=0;ART.swPlay=0;ART.upM=0;ART.mvM=0;ART.upC={}}fpsLive=live;if(live&&raw>0&&raw<500){fpsBuf.push(raw);if(fpsBuf.length>900)fpsBuf.shift()}
  if(now-fpsAt>500&&fpsBuf.length>8){fpsAt=now;const a=fpsBuf.slice().sort((x,y)=>x-y),med=a[a.length>>1],t=Math.round(1000/Math.max(8,med))+' fps<br>'+(cv.width/W).toFixed(1)+'x<br>nb '+(ART.miss||0)+' x'+(ART.exc||0)+' b'+((ART.run&&ART.run.blank)||0)+' e'+((ART.run&&ART.run.evict)||0)+'<br>upMove '+(ART.upM||0)+' of '+(ART.mvM||0)+'<br>notready '+((ART.upC&&ART.upC.nr)||0)+' locked '+((ART.upC&&ART.upC.lk)||0)+' down '+((ART.upC&&ART.upC.pl)||0)+' slow '+((ART.upC&&ART.upC.sl)||0)+'<br>sw '+(ART.swPlay||0)+'<br>cam j95 '+camJ()+' yd rb '+(window.__bkb||0)+'<br>px '+(((ART.run&&ART.run.px)||0)/1e6).toFixed(0)+'/'+(((ART.run&&ART.run.max)||0)/1e6).toFixed(0);if(t!==fpsLast){fpsLast=t;$('#fpsRO').innerHTML=t}}}
(()=>{const ro=()=>document.getElementById('fpsRO');let on=false;try{on=localStorage.getItem('sg_ro')==='1'||/[#&?]ro\b/.test(location.href)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  const set=v=>{on=v;window.sgRO=v;try{localStorage.setItem('sg_ro',v?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}const e=ro();if(e)e.classList.toggle('on',v)};set(on);window.sgReadout=set;   // debug readout: OFF by default; five quick taps in the top-left corner of the stage turn it on or off
  let taps=[];window.addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect();if(e.clientX-r.left>46||e.clientY-r.top>46||e.clientX<r.left||e.clientY<r.top)return;const n=performance.now();taps=taps.filter(t=>n-t<2500);taps.push(n);if(taps.length>=5){taps=[];set(!on)}},true)})();
/* v2.90 CRASH GUARD: the next frame is ALWAYS requested, even when a frame fails (cgCatch records it and shows the recovery message; see game/15b).
   While the guard has paused the game (CG.paused, after repeated failures) frames keep coming but the game step is skipped. */
function loopNext(){CG.asked=true;requestAnimationFrame(loop)}
function loop(now){const _t=performance.now();CG.asked=false;try{if(CG.paused)last=now;else{loop0(now);CG.okFrame()}}catch(e){cgCatch(e,'frame')}finally{ART.lm=performance.now()-_t;try{if(PL.on)PL.endFrame(ART.lm)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}if(!CG.asked)loopNext()}}
const FRAME_MAX=.1;   // v3.16NN1 (E17), was .05
function loop0(now){
  const raw=now-last,rdt=Math.min(FRAME_MAX,raw/1000);last=now;syncLand();if(syncLand.n){loopNext();return}perfTick(raw);fpsTick(raw,now);PL.frame(raw,now);if(raw>24&&raw<2000){(ART.lf=ART.lf||[]).push([now|0,raw|0,G&&G.mode,F&&F.mode,(ART.jt||[]).map(a=>a[0]+':'+(a[1]|0)).join(',')||'-',ART.lm|0]);if(ART.lf.length>600)ART.lf.shift()}ART.jt=[];
  if(slowT>0){slowT-=rdt;if(slowT<=0)timeScale=1}
  if(shakeT>0)shakeT-=rdt;
  if(flashT>0){flashT-=rdt;$('#flash').style.opacity=Math.max(0,flashT*1.6);flashOn=true}else if(flashOn){$('#flash').style.opacity=0;flashOn=false}
  kbStick(rdt);
  if(!document.hidden){const s=stt();s.secs+=rdt;const inLivePlay=!OWON&&F&&F.mode==='live';if(!inLivePlay&&(!loop.sv||now-loop.sv>15000)){loop.sv=now;persist()}}
  if(G&&!OWON)SND.game(G,F,rdt);
  if(G&&G.clockOn&&(G.mode==='playcall'||G.mode==='set')){const c0=Math.ceil(G.clock);G.clock-=rdt;if(G.clock>0&&G.clock<=3&&Math.ceil(G.clock)!==c0)SND.fx('tick');if(G.clock<=0){G.clock=0;G.clockOn=false;tmark('clock0');fxText('PLAY CLOCK!','#ff5a36');SND.fx('buzzer');startPlay()}}
  if(!OWON&&F&&F.pile)pileTick(rdt);
  if(!OWON&&G&&G.guide)gdTick();   // v3.00: guided first game prompts
  if(hitStop>0)hitStop-=rdt;const _fz=hitStop>0?.03:1,_sdt=rdt*timeScale*_fz;bmStep(_sdt);if(!OWON)flStep(_sdt);   // v3.07: hit-stop + launch arcs / ghost trail (game/14d)
  if(REP.act)repStep(rdt);else if(!OWON&&G&&G.drill&&typeof fdStep3D==='function'){fdStep3D(rdt)}else if(!OWON&&F&&F.mode==='live'&&!F.pile){let rem=rdt*timeScale*SPEED*LIVE_SPEED*(hitStop>0?.03:1);while(rem>0&&F.mode==='live'&&!F.pile){const s=Math.min(rem,1/60);stepLive(s);rem-=s}}
  if(!REP.act&&!OWON&&F&&G&&(G.mode==='live'||G.mode==='dead'))repRec();
  updParts(_sdt);
  if(OWON)owFrame(rdt);else{if(PL.on)PL.mark=performance.now();camUpdate(rdt);if(PL.on)PL.add('camera',performance.now()-PL.mark);draw(rdt)}if(now-hudAt>90){hudAt=now;updateHud();if(window.emitUI)window.emitUI('hud:update',{ow:OWON,mode:G&&G.mode})}   // the scoreboard and meters only need ~10 refreshes a second
  loopNext();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){try{persist()}catch(e){window.CFRuntime&&window.CFRuntime.warn('persist',e)}}});
let owClub=false;
/* ============ v2.90 CRASH GUARD ============
   Before v2.90 any error inside a frame stopped the game for good (frozen screen). Now:
   - the main loop and the sprite baker always ask for their next frame (game/15 loop(), game/14 bakePump());
   - every error is RECORDED (what, where, game state; kept in localStorage cf_errors, last 20 kinds) and REPORTED (console, and the
     first few of each kind are re-thrown outside the frame so test tools and the browser still see them; nothing is silently swallowed);
   - one error: a message bar "SOMETHING WENT WRONG" with BACK TO TOWN / KEEP PLAYING; the game keeps running;
   - repeated errors (3 failing frames in a row, or 8 errors within 5 s): the game PAUSES itself so it cannot spin in an error loop, and a
     recovery screen offers BACK TO TOWN, TRY TO CONTINUE, COPY ERROR REPORT, SAVE CODE;
   - BACK TO TOWN ends any match (like EXIT: no result, no reward, no penalty), closes every match screen and puts you back in the overworld;
     if that fails, or the overworld itself keeps failing, it moves you to a safe spot (Hale Harbor ferry dock once Town 2 is open, else
     the Vapor City start). */
const CG={asked:false,paused:false,bad:0,recent:[],log:[],seen:{},n:0,shown:false,bakeBad:0,bakeOff:false,lastTown:0,townLvl:0,pausedAt:0,retryAt:0,saveT:0,busy:false,
  okFrame(){this.bad=0},bakeOk(){this.bakeBad=0}};
try{const o=JSON.parse(localStorage.getItem('cf_errors')||'[]');if(Array.isArray(o))CG.log=o.slice(-20)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
function cgState(){const s={};try{s.ow=OWON?((typeof M!=='undefined'&&M&&M.id)||'?'):'match';if(G){s.g=G.mode;s.crew=G.crew&&G.crew.id}if(F)s.f=F.mode}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}return s}
function cgSave(){const n=Date.now();if(n-CG.saveT<1000){clearTimeout(CG.st);CG.st=setTimeout(cgSave,1100);return}CG.saveT=n;try{localStorage.setItem('cf_errors',JSON.stringify(CG.log.slice(-20)))}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
function cgCatch(e,where){
  if(CG.busy){try{console.error('[CF] error while handling an error',e)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}return}
  CG.busy=true;
  try{
    const msg=String((e&&e.message)||e||'unknown error').slice(0,200),st=String((e&&e.stack)||'').split('\n').slice(0,5).map(s=>s.trim()).join(' | ').slice(0,500);
    const sig=where+'|'+msg+'|'+(st.split(' | ')[1]||''),now=Date.now();CG.n++;
    let ent=CG.log.find(x=>x.sig===sig);
    if(ent){ent.count++;ent.last=now;ent.state=cgState()}else{ent={sig,where,msg,stack:st,build:BUILD,first:now,last:now,count:1,state:cgState()};CG.log.push(ent);if(CG.log.length>20)CG.log.shift()}
    cgSave();
    const k=CG.seen[sig]=(CG.seen[sig]||0)+1;
    try{console.error('[CF] '+where+': '+msg,e)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}
    if(k<=3&&e&&typeof e==='object'){try{e.__cf=1}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}setTimeout(()=>{throw e},0)}   // reported again outside the frame (marked so it is not counted twice)
    if(where==='sprite baking'){if(++CG.bakeBad>=3&&!CG.bakeOff){CG.bakeOff=true;cgBar()}else if(CG.bakeBad===1)cgBar();return}
    if(where==='frame')CG.bad++;
    CG.recent=CG.recent.filter(t=>now-t<5000);CG.recent.push(now);
    if(!CG.paused&&(CG.bad>=3||CG.recent.length>=8))cgPause();
    else if(!CG.paused)cgBar();
  }catch(x){try{console.error('[CF] crash guard failed',x)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}
  finally{CG.busy=false}}
addEventListener('error',ev=>{const e=ev.error;if(e&&e.__cf)return;if(!e&&!ev.message)return;cgCatch(e||ev.message,'timer or tap')});
addEventListener('unhandledrejection',ev=>{const r=ev.reason;if(r&&r.__cf)return;try{const sig='promise|'+String((r&&r.message)||r);let ent=CG.log.find(x=>x.sig===sig);if(ent){ent.count++;ent.last=Date.now()}else{CG.log.push({sig,where:'promise',msg:String((r&&r.message)||r).slice(0,200),stack:'',build:BUILD,first:Date.now(),last:Date.now(),count:1,state:cgState()});if(CG.log.length>20)CG.log.shift()}cgSave();bgWarn(sig)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}});   // v3.16CC4: recorded, plus a small toast for errors that are not known to be harmless

// ---- screens ----
function cgEl(id,css,html){let e=document.getElementById(id);if(!e){e=document.createElement('div');e.id=id;e.style.cssText=css;e.innerHTML=html;document.body.appendChild(e)}return e}
const CG_BTN='flex:1;min-width:120px;height:46px;border-radius:8px;border:2px solid #43392d;background:#2a241d;color:#f3ede0;font:800 15px \'Barlow Condensed\',\'Arial Narrow\',sans-serif;letter-spacing:.04em';   // single quotes: this goes inside style="..."
function bgWarn(sig){if(/NotAllowed|AbortError|NotSupported|play\(\)|interrupted|Load failed|Failed to fetch|NetworkError|font|decode/i.test(sig))return;CG.bw=CG.bw||{};if(CG.bw[sig]||(CG.bwN||0)>=2)return;CG.bw[sig]=1;CG.bwN=(CG.bwN||0)+1;
  let e=document.getElementById('bgWarn');if(!e){e=document.createElement('div');e.id='bgWarn';e.setAttribute('role','status');e.style.cssText='position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 70px);transform:translateX(-50%);z-index:9000;background:rgba(29,25,21,.92);border:1px solid #ffd23a;border-radius:8px;padding:5px 10px;color:#f3ede0;font:600 12px/1.25 "Barlow Condensed","Arial Narrow",sans-serif;pointer-events:none;max-width:70vw;text-align:center;transition:opacity .3s';document.body.appendChild(e)}
  e.textContent='A background task hit an error. The game kept going. (It is saved for the bug report.)';e.style.opacity='1';clearTimeout(bgWarn.h);bgWarn.h=setTimeout(()=>{e.style.opacity='0'},3500)}   // v3.16CC4
function cgBar(){if(CG.paused||CG.shown)return;CG.shown=true;
  const b=cgEl('cgBar','position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 12px);z-index:99998;max-width:460px;margin:0 auto;background:#1d1915;border:2px solid #ffd23a;border-radius:10px;padding:10px 12px;color:#fff;font:600 14px/1.3 "Barlow Condensed","Arial Narrow",sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.6)',
    '<b style="display:block;color:#ffd23a;letter-spacing:.08em;font-size:16px">SOMETHING WENT WRONG</b><span>The game caught an error and kept running. If anything looks stuck, go back to town. Your progress is safe.</span><div style="display:flex;gap:8px;margin-top:8px"><button id="cgBarTown" style="'+CG_BTN+';background:#ff5a36;border-color:#ff5a36">BACK TO TOWN</button><button id="cgBarKeep" style="'+CG_BTN+'">KEEP PLAYING</button></div>');
  b.hidden=false;
  $('#cgBarTown').onclick=()=>{b.hidden=true;CG.shown=false;cgToTown()};
  $('#cgBarKeep').onclick=()=>{b.hidden=true;CG.shown=false}}
function cgPause(){CG.paused=true;CG.pausedAt=Date.now();try{const b=$('#cgBar');if(b)b.hidden=true;CG.shown=false;input.sx=input.sy=0;input.turbo=false}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  const f=cgEl('cgFix','position:fixed;inset:0;z-index:99999;background:rgba(10,8,18,.97);overflow:auto;padding:calc(env(safe-area-inset-top,0px) + 18px) 16px calc(env(safe-area-inset-bottom,0px) + 24px);color:#f3ede0;font:600 15px/1.3 "Barlow Condensed","Arial Narrow",sans-serif',
    '<div style="max-width:460px;margin:0 auto"><h2 style="font:400 26px \'Bowlby One\',Impact,sans-serif;color:#ffd23a;margin:0 0 6px">THE GAME HIT A PROBLEM</h2>'+
    '<div id="cgWhy" style="font-size:13px;opacity:.8;margin-bottom:8px"></div>'+
    '<div style="margin-bottom:12px">It kept failing, so it paused itself instead of freezing. <span id="cgSaved"></span></div>'+
    '<div style="display:flex;flex-direction:column;gap:8px"><button id="cgTown" style="'+CG_BTN+';flex:none;background:#ff5a36;border-color:#ff5a36">BACK TO TOWN</button><button id="cgRetry" style="'+CG_BTN+';flex:none">TRY TO CONTINUE</button><button id="cgCopy" style="'+CG_BTN+';flex:none">COPY ERROR REPORT</button><button id="cgSave" style="'+CG_BTN+';flex:none;border-color:#58ffb0;color:#58ffb0">SAVE CODE (BACKUP)</button></div>'+
    '<div id="cgMsg" style="margin-top:10px;font-size:13px;min-height:18px"></div><div style="margin-top:6px;font-size:12px;opacity:.7">BACK TO TOWN leaves any match without a result. Nothing is lost or penalized.</div></div>');
  const last=CG.log[CG.log.length-1]||{};$('#cgWhy').textContent='Error: '+(last.msg||'unknown')+' ('+(last.where||'?')+').';
  $('#cgSaved').textContent=(typeof SVS!=='undefined'&&SVS.lastOk)?'Your progress was last saved '+svAgo(SVS.lastOk)+'.':'';
  const r=$('#cgRetry'),again=CG.retryAt&&Date.now()-CG.retryAt<15000;r.hidden=!!again;$('#cgMsg').textContent=again?'It failed again right after continuing, so that option is gone. Go back to town.':'';$('#cgMsg').style.color='#ffd23a';
  $('#cgTown').onclick=()=>cgToTown();
  r.onclick=()=>{CG.retryAt=Date.now();cgResume()};
  $('#cgCopy').onclick=()=>svCopyText(cgReport(),$('#cgMsg'),'Copied. Paste it into a message to the developer.');
  $('#cgSave').onclick=()=>{try{$('#mSave').onclick();const p=$('#svPanel');p.style.zIndex=100000}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}};
  f.hidden=false}
function cgResume(){CG.paused=false;CG.bad=0;CG.recent=[];const f=$('#cgFix');if(f)f.hidden=true;try{const p=$('#svPanel');if(p){p.hidden=true;p.style.zIndex=60}}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
function cgExtra(){const L=[];   // v3.16DD4
  try{const i=P3D.info;L.push('3D players: '+(i.on?'ON':'OFF')+(i.want?'':' (turned off in the menu)')+(i.ok?'':' (not started)')+(i.lost?' (WebGL context lost)':'')+(i.err?' | 3D error: '+String(i.err).slice(0,160):'')+' | rigs '+i.rigs+', last 3D draw '+i.ms+' ms')}catch(e){L.push('3D players: unknown ('+e.message+')')}
  try{L.push('Resolution: '+RES[RESI].n+' | canvas '+cv.width+'x'+cv.height+' for '+Math.round(W)+'x'+Math.round(H)+' | device pixel ratio '+(window.devicePixelRatio||1)+' | quality governor level '+(window.__perfLvl||0)+' | LITE EFFECTS '+(document.body.classList.contains('lite')?'ON':'OFF'))}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  try{if(fpsBuf.length>8){const a=fpsBuf.slice().sort((x,y)=>x-y),med=a[a.length>>1],p90=a[Math.floor(a.length*.9)],mx=a[a.length-1];L.push('Frame time, last play ('+a.length+' frames): median '+med.toFixed(1)+' ms ('+Math.round(1000/Math.max(1,med))+' fps), 90% under '+p90.toFixed(1)+' ms, worst '+mx.toFixed(0)+' ms')}else L.push('Frame time: no play recorded yet')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  return L}
function cgReport(){const L=['CIRCUIT FOOTBALL ERROR REPORT','Build: '+BUILD,'Device: '+navigator.userAgent,'Errors this session: '+CG.n].concat(cgExtra(),['']);
  for(const x of CG.log.slice(-10).reverse())L.push(new Date(x.last).toISOString()+' x'+x.count+' ['+x.where+'] '+x.msg+' | state '+JSON.stringify(x.state||{})+(x.stack?' | '+x.stack:''));
  return L.join('\n')}
/* back to town: every step on its own, so one broken step does not stop the rest */
function cgToTown(){
  const n=Date.now(),lvl=(n-CG.lastTown<30000)?CG.townLvl+1:0;CG.lastTown=n;CG.townLvl=lvl;   // a second try within 30 s goes to a safe spot
  const step=(name,fn)=>{try{fn()}catch(e){cgNote(e,name)}};
  step('end match',()=>{sayTok++;$('#banner').classList.remove('show');if(G){G.mode='end';G.pendFp=null;G.clockOn=false}if(F){F.mode='dead';F.pile=null}});
  step('close screens',()=>{for(const id of ['#hud','#sheet','#fourth','#ctl','#setbar','#dcall','#tick','#pile','#turboWrap','#turboLbl','#rotMsg','#fb','#svPanel'])show(id,false);try{clearTimeout(tickT)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}SIMV.on=false;resetJoy();
    if(typeof MU!=='undefined'&&MU){clearInterval(MU.tm);MU.on=false;MU.done=null;if(MU.el)MU.el.classList.remove('on')}
    const bl=$('#owBlack');if(bl){bl.hidden=true;bl.style.opacity=0}});
  let ok=false;
  if(lvl===0)step('return to the overworld',()=>{owShow();ok=true});
  if(!ok)step('move to a safe spot',()=>{const t2=(SAVE.beaten||[]).includes('captain')&&SAVE.t2&&SAVE.t2.entered;
    SAVE.ow=Object.assign(SAVE.ow||{},t2?{map:'harbor',x:42,y:47,d:'d',ret:null}:{map:'street',x:15,y:23,d:'d',ret:null});if(t2)SAVE.hbMapV=HB_MAPV;owShow();ok=true});
  cgResume();
  if(ok){try{owToast(lvl?'MOVED TO A SAFE SPOT':'BACK IN TOWN')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
  else cgPause()}
function cgNote(e,where){try{const msg=String((e&&e.message)||e).slice(0,200),sig='recovery: '+where+'|'+msg;let ent=CG.log.find(x=>x.sig===sig);if(ent){ent.count++;ent.last=Date.now()}else{CG.log.push({sig,where:'recovery: '+where,msg,stack:String((e&&e.stack)||'').split('\n').slice(0,3).join(' | '),build:BUILD,first:Date.now(),last:Date.now(),count:1,state:cgState()})}cgSave();console.error('[CF] recovery step failed: '+where,e)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}
