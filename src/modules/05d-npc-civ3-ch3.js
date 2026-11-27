const CIV={
 courier:{sc:1,body:'#e8742a',trim:'#27e0ff',pants:'#15202e',hat:'cap',pack:'#27e0ff',hair:'#1a1410'},
 mouse:{sc:.78,body:'#ff2fa8',trim:'#ffd0ee',pants:'#2a2540',hood:1,ears:1,hair:'#2a1a20'},
 kid:{sc:.84,body:'#27e0ff',trim:'#0a2a38',pants:'#1a2433',hood:1,hair:'#1a1410'},
 vendor:{sc:1,body:'#2a2f3a',trim:'#e8e8f0',pants:'#1a1d26',apron:'#f2f2f8',band:'#ff3b5c',hair:'#14110f',bowl:1},
 runner:{sc:1,body:'#58ffb0',trim:'#ffffff',pants:'#0e2a24',band:'#ff2fa8',hair:'#1a1410'},
 fisher:{sc:1,body:'#d8b020',trim:'#8a6a10',pants:'#1a2433',hat:'wide',long:1,hair:'#d8d8e0'},
 granny:{sc:.94,body:'#9a4a9a',trim:'#ffd0ee',pants:'#2a1a2a',long:1,bun:1,umb:'#ff2fa8',hair:'#e8e8f0'},
 busker:{sc:1,body:'#3a5a8a',trim:'#ff7a1a',pants:'#1a1a26',hat:'beanie',keys:1,hair:'#1a1410'},
 guard:{sc:1.08,body:'#1b2430',trim:'#27e0ff',pants:'#10161e',helm:1,wide:1,baton:1,hair:'#000'},
 fan:{sc:1,body:'#ff2fa8',trim:'#ffffff',pants:'#1a2433',hair:'#1a1410',scarf:1},
 clinic:{sc:1,body:'#e8f4f8',trim:'#27e0ff',pants:'#1a2433',long:1,hair:'#2a1a20',band:'#27e0ff'},
 dancer:{sc:1,body:'#9b5cff',trim:'#ff2fa8',pants:'#2a1a4a',hair:'#ff2fa8',bun:1},
 coach:{sc:1,body:'#3a4a6a',trim:'#ffd23a',pants:'#1a2433',hat:'cap',hair:'#e0e0e8'},
 hacker:{sc:1,body:'#1a2a24',trim:'#58ffb0',pants:'#10161e',hood:1,hair:'#000'},
 tech:{sc:1,body:'#2a2f3a',trim:'#27e0ff',pants:'#14182a',apron:'#58ffb0',band:'#27e0ff',hair:'#14110f'},
 broker:{sc:1,body:'#5a3a2a',trim:'#ffb02e',pants:'#1a1410',long:1,hat:'beanie',hair:'#8a8a90'},
 usher:{sc:1,body:'#2a1a3a',trim:'#ff2fa8',pants:'#14102a',hat:'cap',hair:'#1a1410'}
};
const CIV_FANC=['#ff2fa8','#27e0ff','#ffd23a','#9b5cff','#58ffb0','#ff7a1a'];
let CIV3CTX=null;let CIV3ON=true;try{CIV3ON=localStorage.getItem('cf_civ3')!=='0'}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
/* ---------- CIV3: classic townspeople, LOOK SHEET v10 (outside art review rounds 1-9 applied; round 9 = side + back views, 2026-11-22). Proposal, not in the game. ----------
   Review rules: one signature shape >= 8 U sticking >= 4 U out of the body box; one outer outline 0.7 U #1E262C (done by the cached-
   picture wrapper); light from upper left (right 30% of body x0.80, left 1.5 U edge +8%, 1.5 U shade band under hair/hats); faces =
   two 1.4 U eye dots only (+ blush on kids and the gull lady); max 4 colours + skin; dark bodies get a 1 U #6F8794 left rim;
   props >= 5 U and >= 25% lightness away from the body; only lights glow (radius 9 U #E8A33D 28%); ground shadow 14 x 4 U.
   Variety: 3 coats per job, 6 hair styles, widths 13/15/17, stoop for the old, beards on at most 1 in 3 men, 4 skin tones.
   parts: 'under' = ground shadow + light glow (drawn live), 'fig' = the figure (cached with the outline). */
const OUTL='#1E262C';
const CIV3={
 fisher:{coats:['#C9A24A','#C9A24A','#BE9440'],acc:'#C2492F',long:1,hem:20,hats:['wideF','wideF','watch','none'],beard:3},
 slicker:{coats:['#E8C53A','#E8C53A','#D9A93A'],acc:'#E8A33D',long:1,hem:20,hat:'sou',beard:1,beardC:'#E6DCC8',old:1,light:1},
 sailor:{coats:['#E6DCC8'],pants:['#2F4A6A','#26333C','#3A4A55'],acc:'#C9A24A',hats:['watch','teamcap','none'],beard:3},
 welder:{coats:['#C2492F','#A9542F','#B5643C'],acc:'#E8C53A',w:17,hat:'mask',beard:2,boots:1,light:1},
 painter:{coats:['#4C9A8A','#4E7C7A','#5C8A9A'],pants:['#E6DCC8'],acc:'#D9437A',hat:'beret',beard:3},
 cook:{coats:['#F2EFE6'],acc:'#C2492F',hat:'toque',apron:'#C2492F',beard:3},
 vendor:{coats:['#A9542F','#B5643C','#A9542F'],acc:'#4E7C7A',long:1,hem:20,hat:'scarfK',apron:'#E6DCC8',fem:1},
 kid:{coats:['#B5643C','#4E7C7A','#A9542F'],acc:'#E8C53A',ws:[12,13,15],hats:['beanieP','beanieP','teamcap'],kid:1},
 kid2:{coats:['#2F5A8A','#3A6AA0','#2F5A8A'],acc:'#E8C53A',hood:1,hem:14,kid:1},
 courier:{hemS:16,band:'#A9542F',coats:['#9FC4D4','#B8D4E0','#8AB0C0'],acc:'#A9542F',hats:['capP','capP','none'],beard:3},
 coach:{long:1,hem:19,hemUp:6,band:'#E8C53A',coats:['#3A4A55','#2F5A8A','#4E5A62'],acc:'#E8C53A',ws:[15,17,17],hats:['teamcap','none','watch'],beard:3},
 guard:{coats:['#26333C','#2B3A44','#1F2A30'],acc:'#E8C53A',w:15,long:1,hem:21,hat:'peaked',light:1},
 runner:{hemS:15,coats:['#4E7C7A','#2F5A8A','#C2492F'],pants:['#A9542F'],acc:'#D9437A',shorts:1,hair:'tail'},
 clinic:{coats:['#F2EFE6'],acc:'#C2492F',long:1,hem:18,hemUp:3,hat:'nurse',fem:1,hairC:'#8A9BA5'},
 broker:{coats:['#5A4636','#4A3A2C','#6A5240'],acc:'#E8C53A',long:1,hem:17,hat:'bowler',beard:3},
 granny:{coats:['#2F5A8A'],acc:'#D9437A',long:1,hem:22,hair:'bun',hairC:'#ECECEC',old:1,fem:1,blush:1},
 fan:{coats:['#4E7C7A','#4E7C7A','#4E7C7A','#2F5A8A','#A9542F'],acc:'#E8C53A',hats:['teamcap','teamcap','beanieP'],beard:3},
 ref:{hemS:16,coats:['#F2EFE6'],acc:'#E8C53A',hat:'blackcap',pants:['#14110f']}
};
function cMul(hex,k){const n=parseInt(hex.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v)));let r=n>>16,g=n>>8&255,b=n&255;
  if(k<1){r*=k;g*=k;b*=k}else{const t=k-1;r+=(255-r)*t;g+=(255-g)*t;b+=(255-b)*t}return '#'+((1<<24)|(f(r)<<16)|(f(g)<<8)|f(b)).toString(16).slice(1)}
function cLum(hex){const n=parseInt(hex.slice(1),16);return (.3*(n>>16)+.59*(n>>8&255)+.11*(n&255))/255}
function owCiv3(x,y,dir,moving,n,tm,ph,part){
  const kind=n.civ,K=CIV3[kind]||CIV3.fan,base=Object.assign({},CIV[kind]||CIV.fan,n.hb?(HB_CIV[kind]||HB_CIV.fan):{});
  const h=n.seed3!=null?n.seed3>>>0:((n.x*13+n.y*7+kind.length*3)|0)>>>0,h2=n.seed3!=null?(n.seed3>>>4)>>>0:((n.x*5+n.y*11)|0)>>>0;
  const g=CIV3CTX||og,U=OWT/36*(K.kid?.86:1)*[.97,1,1.04][h%3],sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-6;
  const side=dir==='l'||dir==='r',back=dir==='u',f=dir==='l'?-1:1;
  let coat=n.coat3||(K.coats?K.coats[h%K.coats.length]:HB_FANC[((n.x*7+n.y*3)|0)%HB_FANC.length]);
  const acc=n.acc3||K.acc||(['#E8C53A','#D9437A'][h%2]);
  const pants=n.pants3||(K.pants?K.pants[h%K.pants.length]:'#26333C');
  const skin=['#e6b48a','#c98a62','#8a5a3a','#f0c8a0'][n.seed3!=null?(n.seed3>>>7)%4:((n.x*5+n.y)|0)%4],skinB=cMul(skin,.75);
  const HAT0=n.hat3||(K.hats?K.hats[(h2>>1)%K.hats.length]:K.hat),HAT=HAT0==='none'?undefined:HAT0;
  const hairStyles=['short','part','tail','curly','long','bald'];
  const hs=n.hair3||K.hair||((K.fem||n.fem3)?['tail','long','curly','part'][h2%4]:hairStyles[h2%6]);
  const hairC=n.hairC3||K.hairC||(K.old?'#ECECEC':['#1a1410','#4a2e1c','#8a5a2a','#c8a060','#2a1a10','#6a6a70'][h2%6]);
  const bw0=n.bw3||K.w||(K.ws?K.ws[(h2>>2)%K.ws.length]:K.kid?13:[13,15,17][(h>>1)%3]),bw=(side?bw0*10/13:bw0)*U;
  const legH=11*U,bodyH=15*U,top=-legH-bodyH,hr=(K.kid?6.9:6)*U;
  const t=tm||0,sw=moving?Math.sin(t*11+(ph||0)*6):0;
  const _greet=!!(n._greetUntil&&performance.now()<n._greetUntil),_gStep=Math.floor(t/.2)%3;
  const _dig=(kind==='kid2'&&!moving)?[0,2.4,3.2,1.2][Math.floor(t/.45)%4]*U:0;
  const _carry=(kind==='sailor'||kind==='courier')?[0,1.4,0,.8][Math.floor(t/.4)%4]*U:0;
  const _sit=n.sit?2.8*U:0;
  const bob=(moving?Math.abs(sw)*1.2*U:Math.sin(t*2+n.x)*.4*U)-_dig-_sit+_carry;
  const stoop=K.old?1*U:0,_nod=(_greet&&n.boss3)?[0,2.2,1.0][_gStep]*U:0,hx=(side?f*(1*U+stoop):0),hy=top-6*U+(side?0:stoop*.5)+_nod;
  const R=(x,y,w,hh,c)=>{g.fillStyle=c;g.fillRect(x,y,w,hh)},C=(x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill()},
        E=(x,y,rx,ry,c,a)=>{g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,a||0,0,7);g.fill()},
        L=(x1,y1,x2,y2,w,c)=>{g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()},
        P=(pts,c)=>{g.fillStyle=c;g.beginPath();g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.closePath();g.fill()};
  // hands: front view = viewer's right (+x) holds things; side view = the hand in front
  const hand=side?[f*1.5*U,top+12.5*U]:[bw/2+1.5*U,top+12.5*U],lhand=[-bw/2-1.5*U,top+12.5*U];
  // where the light prop sits (for the glow)
  let lightAt=null;
  const lsw=[0,3,-3][Math.floor((tm||0)/.5)%3]*U;
  if(kind==='slicker')lightAt=[(side?f*9*U:bw/2+10*U)+lsw,-12*U];
  if(kind==='guard')lightAt=[side?f*4*U:bw/2+3*U,hy-12*U];
  if(kind==='welder')lightAt=[side?f*12*U:bw/2+12*U,top+6*U];
  g.save();g.translate(sx,sy);
  if(part!=='fig'){   // ---------- under: ground shadow + glow
    E(0,1*U,7*U,2*U,'rgba(0,0,0,.30)');
    if(lightAt&&!(back&&kind==='welder')){const a=kind==='slicker'?[.25,.45,.35][Math.floor(t/.5)%3]:kind==='welder'?[.4,.5,.4,0][Math.floor(t/.3)%4]:kind==='guard'?.40:.28,gR=(kind==='slicker'?13:kind==='guard'?15:kind==='welder'?(Math.floor(t/.3)%4===1?16:14):9)*U;
      const gr=g.createRadialGradient(lightAt[0],lightAt[1]-bob,0,lightAt[0],lightAt[1]-bob,gR);gr.addColorStop(0,'rgba(232,163,61,'+a+')');gr.addColorStop(1,'rgba(232,163,61,0)');g.fillStyle=gr;g.beginPath();g.arc(lightAt[0],lightAt[1]-bob,gR,0,7);g.fill()}
    if(part==='under'){g.restore();return}
  }
  // ---------- figure
  // ground props (do not bob)
  if(kind==='fisher'&&!moving){const bx=side?-f*8*U:-bw/2-7*U;R(bx-1.5*U,-7*U,8*U,7*U,'#9FC4D4');R(bx-1.5*U,-7*U,8*U,1.4*U,cMul('#9FC4D4',.7));E(bx+2.5*U,-8.4*U,1.5*U,2.4*U,'#E8A33D');P([bx+2.5*U,-10.2*U,bx+.4*U,-12.2*U,bx+4.6*U,-12.2*U],'#E8A33D')}
  // legs + boots
  const legC=K.shorts?skin:pants,bootH=(K.boots?5:2.4)*U;
  const lg=(lx,ly,c)=>{R(lx,ly,4*U,legH,c)};
  const D3={R,C,E,L,P};
  if(n.boss3)ch3Legs(g,n,U,side,back,f,legH,legC,D3,bw0);else if(side){lg(-3*U+sw*3*U*f,-legH,legC);lg(0-sw*3*U*f,-legH,cMul(legC,.8))}else{lg(-4.5*U,-legH+sw*U,legC);lg(.5*U,-legH-sw*U,cMul(legC,.8))}
  if(K.shorts){if(side)P([-3.5*U,-legH,4.5*U,-legH,5.5*U,-legH+5.5*U,-4.5*U,-legH+5.5*U],pants);else{P([-5*U,-legH,5*U,-legH,7.5*U,-legH+5.5*U,-7.5*U,-legH+5.5*U],pants);P([1.5*U,-legH,5*U,-legH,7.5*U,-legH+5.5*U,2.5*U,-legH+5.5*U],cMul(pants,.8))}}
  if(!n.boss3)R(-5*U,-bootH,10*U,bootH,'#14110f');
  g.translate(0,-bob);if(n.boss3)g.translate(0,2*U);
  if(kind==='runner'&&side){g.translate(0,-legH);g.rotate(f*6*Math.PI/180);g.translate(0,legH)}
  // ---------- behind the body
  const rodTip=[side?-f*15*U:bw/2+16*U,hy-20*U];
  const rodWob=[0,-3.5,0,3.5][Math.floor(t/.6)%4]*U;
  if(kind==='fisher'&&(back||side)){L(side?f*1*U:bw/2+1*U,top+12*U,rodTip[0],rodTip[1]+rodWob,1.2*U,'#5A3A22')}
  if(back){
    if(kind==='kid')C(bw/2-2.5*U,top+12.5*U,5.5*U,'#E6DCC8');                                   // 1. ball 3 U past the hip
    if(kind==='welder')P([-3.5*U,top+3*U,3.5*U,top+3*U,9*U,-5*U,-9*U,-5*U],'#3A4A55');          // 3. apron hem 18 U shows at the sides
    if(kind==='vendor'){R(-11*U,top+10*U,22*U,3*U,'#E6DCC8');R(-11*U,top+12.4*U,22*U,.8*U,cMul('#E6DCC8',.75))}   // 8. tray edges
    if(kind==='kid2'){const px=bw/2-1*U,py=top+13*U;g.strokeStyle='#E8C53A';g.lineWidth=.8*U;g.beginPath();g.arc(px+2*U,py,3*U,Math.PI,0);g.stroke();R(px-2*U,py,8*U,7*U,'#E8C53A')}   // 9. pail at the side
  }
  if(kind==='guard'&&back){L(bw/2+3*U,-2*U,bw/2+3*U,hy-6*U,1.4*U,'#3e3226');R(bw/2-2*U,hy-18*U,10*U,12*U,'#2a2a2a');R(bw/2+2*U,hy-16*U,2*U,8*U,'#E8A33D');P([bw/2+-.5*U,hy-18*U,bw/2+6.5*U,hy-18*U,bw/2+4.5*U,hy-22*U,bw/2+1.5*U,hy-22*U],'#2a2a2a')}
  if(kind==='fan'&&back){L(bw/2+1.5*U,top+12*U,bw/2+3*U,hy-14*U,1.2*U,'#5A3A22');P([bw/2+3*U,hy-14*U,bw/2+15*U,hy-10*U,bw/2+3*U,hy-6*U],'#4E7C7A')}
  if(kind==='runner'){const swing=Math.sin(t*(moving?11:3))*3*U;if(back)R(-1.6*U+swing,hy+2*U,3.2*U,11*U,hairC);else if(side)P([-f*5*U,hy-2.5*U,-f*16*U+swing,hy+5*U,-f*5*U,hy+2.5*U],hairC);else{E(hx+7.4*U+swing*.5,hy+2.5*U,2.4*U,6*U,hairC,-.5);C(hx+5*U,hy-3.6*U,2*U,hairC)}}
  // ---------- body (coat): shoulders bw, hem width + height
  const hemV=K.hem?K.hem+(kind==='granny'?0:[-1,0,1][h2%3]):0;const hemW=(K.hem?(side?hemV*10/13:hemV):K.hemS?Math.max(K.hemS,bw0+1)*(side?10/13:1):bw0*(side?10/13:1)-1)*U,hemY=K.long?-(K.hemUp||4)*U:top+bodyH;
  const bodyPath=()=>{g.beginPath();g.moveTo(-bw/2,top+3*U);g.quadraticCurveTo(-bw/2,top,-bw/2+3*U,top);g.lineTo(bw/2-3*U,top);g.quadraticCurveTo(bw/2,top,bw/2,top+3*U);g.lineTo(hemW/2,hemY);g.lineTo(-hemW/2,hemY);g.closePath()};
  g.fillStyle=coat;bodyPath();g.fill();
  g.save();bodyPath();g.clip();
  const W=Math.max(bw,hemW);
  // details inside the coat
  if(kind==='sailor')for(let k=0;k<4;k++)R(-W/2,top+2*U+k*3.6*U,W,2*U,'#2F5A8A');
  if(kind==='ref')for(let k=0;k<5;k++)R(-W/2+(k*2+.5)*W/10,top,W/10*1.05,bodyH+20*U,'#14110f');
  if(K.apron&&!back){if(side)R(f>0?0:-5*U,top+5*U,5*U,40*U,K.apron);else if(kind==='vendor'){P([-5*U,top+5*U,5*U,top+5*U,6.5*U,hemY,-6.5*U,hemY],K.apron)}else if(kind!=='cook')R(-4.5*U,top+5*U,9*U,hemY-top-5*U,K.apron)}
  if(kind==='welder'&&!back&&side)R(f>0?-1*U:-4*U,top+3*U,5*U,13*U,'#3A4A55');
  if(kind==='painter'&&!back)[['#D9437A',-3,5],['#E8C53A',2,9],['#9FC4D4',-1,12]].forEach(([c,dx,dy])=>C(dx*U,top+dy*U,1.5*U,c));
  if(kind==='coach')R(-W/2,top+1*U,W,2*U,acc);
  if(kind==='granny')R(-W/2-2*U,hemY-2.5*U,W+4*U,2.5*U,'#D9437A');
  if(kind==='vendor')R(-W/2-2*U,hemY-3*U,W+4*U,3*U,'#E6DCC8');
  if(kind==='clinic')R(-W/2-2*U,hemY-2*U,W+4*U,2*U,'#C2492F');
  if(kind==='guard')R(-W/2-2*U,hemY-2*U,W+4*U,2*U,'#C9A24A');
  if(K.band)R(-W/2-2*U,hemY-2*U,W+4*U,2*U,K.band);
  // light: right 30% darker, left 1.5 U lighter, dark coats get a cool rim
  g.fillStyle='rgba(0,0,0,.20)';g.fillRect(W/2-W*.3,top,W*.3+2*U,60*U);
  {const dark=cLum(coat)<cLum('#3A4A55')+.01;g.strokeStyle=dark?'#6F8794':'rgba(255,255,255,.12)';g.lineWidth=(dark?2.2:3)*U;g.beginPath();g.moveTo(-bw/2,top+3*U);g.lineTo(-hemW/2,hemY);g.stroke()}
  g.restore();
  if(cLum(coat)<cLum('#3A4A55')+.01&&!back){g.strokeStyle='#7E97A4';g.lineWidth=1.6*U;g.lineCap='butt';g.beginPath();g.moveTo(-bw/2+.8*U,top+3*U);g.lineTo(-hemW/2+.8*U,hemY-.2*U);g.stroke()}
  if(kind==='cook'&&!back){if(side)R(f>0?0:-5*U,top+5*U,5*U,16*U,K.apron);else{P([-4.5*U,top+5*U,4.5*U,top+5*U,8.5*U,-5*U,-8.5*U,-5*U],K.apron);P([2*U,top+5*U,4.5*U,top+5*U,8.5*U,-5*U,4*U,-5*U],cMul(K.apron,.82));R(-8.5*U,-8*U,17*U,3*U,cMul(K.apron,.62))}R(-3*U,top-1*U,6*U,2*U,'#C2492F')}
  if(kind==='welder'&&!back&&!side){P([-3.5*U,top+3*U,3.5*U,top+3*U,8*U,-5*U,-8*U,-5*U],'#3A4A55');P([1.5*U,top+3*U,3.5*U,top+3*U,8*U,-5*U,3.5*U,-5*U],cMul('#3A4A55',.8));R(-3.5*U,top+3*U,7*U,1.2*U,cMul('#3A4A55',1.3));L(-5.6*U,top+9*U,5.6*U,top+9*U,1*U,'#E8A33D');L(-7*U,-8*U,7*U,-8*U,1*U,'#E8A33D')}
  if(kind==='ref'){const sw2=side?6:8,yb=top+bodyH-3*U,ye=top+bodyH+3.5*U;P([-bw/2+.5*U,yb,bw/2-.5*U,yb,sw2*U,ye,-sw2*U,ye],'#1E262C');R(-sw2*U,ye-2*U,sw2*2*U,2*U,'#E8C53A')}
  if(back){
    if(kind==='cook'){P([-7*U,-11*U,7*U,-11*U,8.5*U,-6*U,-8.5*U,-6*U],K.apron);R(-bw/2,top+8.5*U,bw,1.6*U,K.apron);P([0,top+9.3*U,-4*U,top+7.8*U,-4*U,top+10.8*U],K.apron);P([0,top+9.3*U,4*U,top+7.8*U,4*U,top+10.8*U],cMul(K.apron,.85));C(0,top+9.3*U,1*U,cMul(K.apron,.7))}   // 2. apron skirt + bow
    if(kind==='welder'){L(-bw/2+2*U,top+1*U,bw/2-2.5*U,top+12*U,1.5*U,'#26333C');L(bw/2-2*U,top+1*U,-bw/2+2.5*U,top+12*U,1.5*U,'#26333C');C(0,top+6.6*U,1.5*U,'#E8A33D')}   // 3. crossed straps + buckle
    if(kind==='courier'){L(bw/2-1.5*U,top+.5*U,-bw/2+1*U,top+10*U,3*U,'#A9542F')}   // 6. strap across the back
    if(kind==='coach'){R(-6.5*U,top+1.5*U,13*U,2*U,'#E8C53A');R(-3*U,top+6*U,6*U,4*U,'#E6DCC8');R(-1.6*U,top+6.8*U,.9*U,2.4*U,'#26333C');R(.6*U,top+6.8*U,.9*U,2.4*U,'#26333C')}   // 7. yoke + number plate
  }
  if(n.ch3)ch3Body(g,n,U,{bw,top,hemW,hemY,side,back,f,coat},D3);
  if(kind==='courier'&&!back){L(-bw/2+1*U,top+1*U,bw/2,top+11*U,1.5*U,'#E6DCC8')}
  if(kind==='granny'){R(-4.5*U,top-2*U,9*U,3*U,'#D9437A');if(!back)R(1*U,top,2.6*U,7*U,'#D9437A');else R(-1.3*U,top,2.6*U,6*U,'#D9437A')}
  if(kind==='fisher'&&!back){g.strokeStyle='#E8C53A';g.lineWidth=1*U;g.lineCap='butt';g.beginPath();g.moveTo(-bw/2+.5*U,top+3*U);g.lineTo(-hemW/2+.5*U,hemY-.2*U);g.stroke()}
  if(kind==='fisher'){R(-5*U,top-1.2*U,10*U,2.8*U,'#C2492F');if(!back)R(side?-f*2*U:1*U,top+1*U,4*U,10*U,'#C2492F');else R(-2*U,top+1*U,4*U,8*U,'#C2492F')}
  if(kind==='broker'){R(-4.5*U,top-1.2*U,9*U,2.6*U,'#C9A24A');if(!back)R(side?-f*1*U:-3*U,top+1*U,3*U,10*U,'#C9A24A')}
  if(kind==='kid'){R(-4.5*U,top-1*U,9*U,2.2*U,'#E8C53A');if(!back)R(side?-f*1*U:-2.5*U,top+1*U,2*U,6*U,'#E8C53A')}
  if(kind==='fan'){R(-4*U,top-1*U,8*U,2.4*U,acc);if(!back)R(side?-f*1*U:1.5*U,top+1*U,2*U,12*U,acc)}
  if((kind==='coach'||kind==='ref')&&!back){const lw=1.5*U,ln=8*U;g.strokeStyle=kind==='coach'?'#E8C53A':'#C2492F';g.lineWidth=lw;g.beginPath();g.moveTo(-3*U,top);g.lineTo(0,top+ln);g.lineTo(3*U,top);g.stroke();R(-1.5*U,top+ln-.5*U,3*U,2.2*U,kind==='coach'?'#E6E6E6':'#E8C53A')}
  if(kind==='guard'){R(-bw/2-2*U,top-.6*U,5*U,2*U,'#E8C53A');R(bw/2-3*U,top-.6*U,5*U,2*U,'#E8C53A')}
  if(kind==='guard'&&!back)C(side?f*2*U:-3.5*U,top+4.5*U,1.5*U,'#E8C53A');
  if(kind==='clinic'&&!back){g.strokeStyle='#4E7C7A';g.lineWidth=1*U;g.beginPath();g.moveTo(-3*U,top);g.quadraticCurveTo(-3*U,top+7*U,0,top+8*U);g.quadraticCurveTo(3*U,top+7*U,3*U,top);g.stroke();C(0,top+8.5*U,1.4*U,'#4E7C7A')}
  // ---------- arms
  const armR=((kind==='painter'||kind==='ref')&&!back||n.civ==='dancer4')&&!side;   // right arm raised
  if(side){const as=sw*1*U*f;R(-1.5*U+as,top+3*U,3.5*U,9*U,cMul(n.slv3||coat,.9));R(-1.5*U+as,top+11*U,3.5*U,2.5*U,skin)}
  else{if(_greet&&!n.boss3&&!back){g.save();g.translate(-bw/2-1.5*U,top+3.5*U);g.rotate(-2.35+[-.28,.26,-.18][_gStep]);R(-1.5*U,0,3*U,9*U,n.slv3||coat);R(-1.5*U,8.2*U,3*U,2.6*U,skin);g.restore()}else{R(-bw/2-3*U,top+3*U,3*U,9*U,n.slv3||coat);R(-bw/2-3*U,top+11*U,3*U,2.5*U,skin)}
    if(armR){g.save();g.translate(bw/2+1.5*U,top+3*U);g.rotate(kind==='ref'?Math.PI*.95:n.civ==='dancer4'?Math.PI*1.1:Math.PI*.75);R(-1.5*U,0,3*U,9*U,cMul(coat,.8));R(-1.5*U,8*U,3*U,2.5*U,skin);g.restore()}
    else{R(bw/2,top+3*U,3*U,9*U,cMul(n.slv3||coat,.8));R(bw/2,top+11*U,3*U,2.5*U,skin)}
    if(cLum(n.slv3||coat)<cLum('#3A4A55')+.01)R(-bw/2-3*U,top+3*U,1.6*U,9*U,'#7E97A4');
    if(kind==='runner'){R(-bw/2-3*U,top+9*U,3*U,2*U,'#F2EFE6');R(bw/2,top+9*U,3*U,2*U,'#F2EFE6')}}
  if(kind==='courier'&&back){R(-bw/2-4*U,top+8*U,12*U,10*U,'#A9542F');R(-bw/2-4*U,top+8*U,12*U,2.6*U,cMul('#A9542F',.78))}
  if(kind==='courier'&&!back){const cw=(side?bw:bw+6*U)/2+1*U;P([-cw+2*U,top-.5*U,cw-2*U,top-.5*U,cw+1*U,top+6*U,-cw-1*U,top+6*U],cMul(coat,.82));R(-cw-1*U,top+4.8*U,cw*2+2*U,1.2*U,'#A9542F')}
  if(kind==='sailor'){const cx=side?-f*1*U:-bw/2,cy=top+3.5*U;g.strokeStyle='#C9A24A';g.lineWidth=2.2*U;g.beginPath();g.arc(cx,cy,4.9*U,0,7);g.stroke();g.strokeStyle=cMul('#C9A24A',.72);g.lineWidth=.8*U;g.beginPath();g.arc(cx,cy,4.9*U,0,7);g.stroke()}
  if(back){
    if(kind==='slicker'){const lx=lightAt[0],ly=-18*U;L(bw/2,top+11*U,lx,ly-1.6*U,1*U,'#2a2a2a');g.strokeStyle='#2a2a2a';g.lineWidth=1*U;g.beginPath();g.arc(lx,ly-1.4*U,1.4*U,Math.PI,0);g.stroke();R(lx-4.5*U,ly,9*U,11*U,'#2a2a2a');R(lx-1*U,ly+1.5*U,2*U,8*U,'#E8A33D');R(lx-5.1*U,ly-.8*U,10.2*U,1.5*U,'#2a2a2a')}   // 4. lantern from behind
    if(kind==='kid'){const bx=bw/2+3*U,by2=hy-9*U+Math.sin(t*2.2)*1*U;g.strokeStyle='#E6DCC8';g.lineWidth=.5*U;g.beginPath();g.moveTo(bw/2+1*U,top+12*U);g.quadraticCurveTo(bx+1*U,(top+12*U+by2)/2,bx,by2+4.5*U);g.stroke();E(bx,by2,4.5*U,5*U,'#D9437A');P([bx-.8*U,by2+5.4*U,bx+.8*U,by2+5.4*U,bx,by2+4.4*U],'#D9437A')}   // 1. balloon
  }
  if(kind==='ref'&&(side||back)){const cx=side?f*9*U:bw/2+2*U,cy=side?top-12*U:top-11*U;L(side?f*1*U:bw/2+1*U,top+3*U,cx-(side?f*1*U:0),cy+3*U,3*U,cMul(coat,.85));g.save();g.translate(cx,cy);g.rotate((side?f:1)*Math.PI/4);R(-2*U,-4*U,4*U,8*U,'#E8C53A');R(-2*U,-4*U,4*U,1*U,cMul('#E8C53A',.8));g.restore()}   // 5. card in side + back
  // ---------- hand props (front / side)
  if(!back){
    const [hxp,hyp]=hand;
    if(kind==='fisher'&&!side){L(hxp,hyp,rodTip[0],rodTip[1]+rodWob,1.2*U,'#5A3A22')}
    if(kind==='fisher'){const fsw=[0,3,0,-3][Math.floor(t/.6)%4]*U,fx=rodTip[0]+fsw,fy=rodTip[1]+rodWob+7.5*U;g.strokeStyle='rgba(230,220,200,.85)';g.lineWidth=.6*U;g.beginPath();g.moveTo(rodTip[0],rodTip[1]+rodWob);g.lineTo(fx,fy-1.5*U);g.stroke();E(fx,fy+1.5*U,1.6*U,4*U,'#9FC4D4');P([fx-1.8*U,fy+6.6*U,fx+1.8*U,fy+6.6*U,fx,fy+4.4*U],'#9FC4D4');C(fx,fy-.6*U,.5*U,'#26333C')}
    if(kind==='slicker'){const lx=lightAt[0],ly=-18*U;L(hxp,hyp,hxp+(side?f:1)*4*U,hyp-2.5*U,1.3*U,'#2a2a2a');L(hxp+(side?f:1)*4*U,hyp-2.5*U,lx,ly-1.6*U,1*U,'#2a2a2a');g.strokeStyle='#2a2a2a';g.lineWidth=1*U;g.beginPath();g.arc(lx,ly-1.4*U,1.4*U,Math.PI,0);g.stroke();R(lx-4.5*U,ly,9*U,11*U,'#2a2a2a');R(lx-3.4*U,ly+1.1*U,6.8*U,8.8*U,'#E8A33D');R(lx-1.5*U,ly+2.6*U,3*U,5.8*U,'#FFE7A8');R(lx-5.1*U,ly-.8*U,10.2*U,1.5*U,'#2a2a2a')}
    
    if(kind==='welder'){const dr=[-2.2,0,2.8,.8][Math.floor(t/.3)%4]*U,tx=side?f*12*U:bw/2+12*U,ty=top+6*U+dr;L(hxp,hyp-1*U+dr,tx,ty,1.8*U,'#4A5258');C(tx,ty,1.5*U,'#9fe8ff');
      const fr=Math.floor(t/.3)%4;if(fr<3){const SP=[[[2,-2],[3.5,.5],[.5,-3.5],[4,-3],[1.5,1.5],[3,-4.5]],[[3,-3.5],[5,0],[1.5,-5],[5.5,-2],[2.5,2],[4.5,-5.5]],[[4,-5],[6.5,1],[2.5,-6.5],[7,-3.5],[3.5,3],[6,-7]]][fr];SP.forEach(([a,b])=>C(tx+(side?f:1)*a*U,ty+b*U,1.5*U*(fr===1?1:.85),fr===1?'#FFE7A8':'#E8C53A'))}}
    if(kind==='painter'){const bx=side?hxp:bw/2+5*U,by=side?hyp:top-1*U,tipx=side?f*8*U:bw/2+8*U,tipy=top-4*U;L(bx,by,tipx,tipy,1.2*U,'#8a5a2a');R(tipx-1.5*U,tipy-3*U,3*U,3*U,'#D9437A')}
    if(kind==='cook'){const st=[0,4,-4][Math.floor(t/.7)%3]*U,lx=hxp+(side?f:1)*4.5*U+st;L(hxp,hyp,lx-(side?f:1)*1*U,hyp-1*U,1.6*U,K.coats[0]);L(lx,hyp+2*U,lx-st*.5,hyp-12*U,1.4*U,'#9FC4D4');g.fillStyle='#9FC4D4';g.beginPath();g.arc(lx,hyp+2.5*U,2.8*U,0,Math.PI);g.fill();R(lx-2.8*U,hyp+2.2*U,5.6*U,.8*U,cMul('#9FC4D4',.75))}
    if(kind==='vendor'&&!side){R(-8*U,top+10*U,16*U,4*U,'#E6DCC8');R(-8*U,top+13*U,16*U,1*U,cMul('#E6DCC8',.75));E(-3.5*U,top+9.4*U,2.5*U,1*U,'#9FC4D4');E(1.5*U,top+9.2*U,2.5*U,1*U,'#E8A33D');E(4.5*U,top+9.6*U,2.2*U,1*U,'#9FC4D4')}
    if(kind==='vendor'&&side){R(f*1*U-(f<0?7:0)*U,top+10*U,7*U,3*U,'#E6DCC8');E(f*4*U,top+9.4*U,2.4*U,1*U,'#E8A33D')}
    if(kind==='kid'){const sx2=lhand[0]-(side?0:1)*U,by2=hy-9*U+Math.sin(t*2.2)*1*U;g.strokeStyle='#E6DCC8';g.lineWidth=.5*U;g.beginPath();g.moveTo(side?hxp:lhand[0],side?hyp:lhand[1]);g.quadraticCurveTo(sx2-2*U,(lhand[1]+by2)/2,sx2-1*U,by2+4.5*U);g.stroke();E(sx2-1*U,by2,4.5*U,5*U,'#D9437A');P([sx2-1.8*U,by2+5.4*U,sx2-.2*U,by2+5.4*U,sx2-1*U,by2+4.4*U],'#D9437A');C(sx2-2.6*U,by2-2*U,1*U,'rgba(255,255,255,.45)')}
    if(kind==='kid'){const bx=hxp+(side?f*2:2)*U;C(bx+2*U,hyp,5.5*U,'#E6DCC8');C(bx+.4*U,hyp-1.8*U,1.6*U,'#26333C');C(bx+3.8*U,hyp+2*U,1.5*U,'#26333C')}
    if(kind==='kid2'){const px=hxp,py=hyp+1*U;g.strokeStyle='#E8C53A';g.lineWidth=.8*U;g.beginPath();g.arc(px,py,3*U,Math.PI,0);g.stroke();R(px-4*U,py,8*U,7*U,'#E8C53A');R(px-4*U,py,8*U,1.2*U,cMul('#E8C53A',.8));E(px,py-.6*U,2*U,1.2*U,'#C2492F');C(px-2.4*U,py-1.6*U,.9*U,'#C2492F');C(px+2.4*U,py-1.6*U,.9*U,'#C2492F')}
    if(kind==='courier'){if(side)R(-f*bw/2-(f>0?5:-1)*U*0-(f>0?4:0)*U,top+8*U,9*U*.7,8*U,'#A9542F');else{R(bw/2-4*U,top+7*U,12*U,10*U,'#A9542F');R(bw/2-4*U,top+7*U,12*U,2.6*U,cMul('#A9542F',.78));R(lhand[0]-4.5*U,lhand[1]-2*U,6*U,4*U,'#E6DCC8')}}
    if(kind==='coach'){const cx=(side?f*7*U:bw/2+5*U)-(side&&f<0?10:0)*U;L(hxp,hyp,cx+1*U,top+8*U,2.4*U,cMul(coat,.8));R(cx,top,10*U,12*U,'#8a6a40');R(cx+.9*U,top+1*U,8.2*U,10.2*U,'#E6DCC8');R(cx+3.4*U,top-.8*U,3.2*U,2*U,'#4A5258');R(cx+1.8*U,top+4.4*U,6.2*U,.9*U,'#9a9a90');R(cx+1.8*U,top+7*U,5*U,.9*U,'#9a9a90');R(cx+1.8*U,top+9.4*U,5.6*U,.9*U,'#9a9a90')}
    if(kind==='guard'){const gx=side?f*4*U:bw/2+3*U;L(gx,-2*U,gx,hy-6*U,1.4*U,'#5A3A22');R(gx-5*U,hy-18*U,10*U,12*U,'#2a2a2a');R(gx-3.8*U,hy-16.8*U,7.6*U,9.6*U,'#E8A33D');R(gx-1.6*U,hy-15.4*U,3.2*U,6.6*U,'#FFE7A8');R(gx-5.6*U,hy-19.4*U,11.2*U,1.6*U,'#2a2a2a');P([gx-3.5*U,hy-19.4*U,gx+3.5*U,hy-19.4*U,gx+1.5*U,hy-22*U,gx-1.5*U,hy-22*U],'#2a2a2a');R(gx-5.6*U,hy-6.6*U,11.2*U,1.2*U,'#2a2a2a')}
    if(kind==='clinic'){const bx=side?-f*bw/2-(f>0?8:0)*U:lhand[0]-7*U,by=lhand[1]-1*U;L(lhand[0],lhand[1],bx+4*U,by,.8*U,'#7a2a1c');R(bx,by,8*U,7*U,'#C2492F');R(bx,by,8*U,1.6*U,cMul('#C2492F',.75));R(bx+3.2*U,by+2.6*U,1.6*U,3.6*U,'#F2EFE6');R(bx+2.2*U,by+3.6*U,3.6*U,1.6*U,'#F2EFE6')}
    if(kind==='broker'){const ux=hxp+(side?f:1)*1.5*U;g.fillStyle='#14110f';g.beginPath();g.moveTo(ux,-.5*U+bob);g.lineTo(ux-1.6*U,-14*U);g.lineTo(ux,-24.5*U);g.lineTo(ux+1.6*U,-14*U);g.closePath();g.fill();L(ux,-24.5*U,ux,-27*U,.9*U,'#14110f');g.strokeStyle='#C9A24A';g.lineWidth=1.4*U;g.beginPath();g.arc(ux-1.6*U,-27*U,1.6*U,0,Math.PI,true);g.stroke();R(ux-.8*U,-17*U,1.6*U,1*U,'#C9A24A');if(!side){R(lhand[0]-6*U,lhand[1]-7*U,7*U,9*U,'#2F5A8A');R(lhand[0]-6*U,lhand[1]-7*U,1.4*U,9*U,'#E8C53A')}}
    if(kind==='granny'){const tap=Math.floor(t/.8)%3===2?2*U:0,cx=hxp+(side?f:1)*1*U;L(cx,hyp-7*U+tap,cx+(side?f:1)*.5*U,-.5*U+bob,(n.noGull?2:1.3)*U,'#5A3A22');if(n.noGull)L(cx-.7*U,hyp-6*U+tap,cx-.7*U+(side?f:1)*.5*U,-1.5*U+bob,.6*U,'#9A7A5A');g.strokeStyle='#5A3A22';g.lineWidth=1.3*U;g.beginPath();g.arc(cx-1.6*U,hyp-7*U+tap,1.6*U,Math.PI,0);g.stroke()}
    if(kind==='fan'){const swy=[0,4,0,-4][Math.floor(t/.4)%4]*U;const tx=hxp+1.5*U+([0,1,0,-1][Math.floor(t/.4)%4])*1.4*U;L(hxp,hyp+1*U,tx,hy-14*U,1.2*U,'#5A3A22');P([tx,hy-14*U,tx+(side?f:1)*12*U,hy-10*U+swy,tx,hy-6*U],'#4E7C7A');P([tx,hy-11*U,tx+(side?f:1)*7*U,hy-10*U+swy*.6,tx,hy-9*U],'#E8C53A')}
    if(kind==='ref'&&!side){R(bw/2+1.5*U,top-17*U,6*U,8*U,'#E8C53A');R(bw/2+1.5*U,top-17*U,6*U,1.2*U,cMul('#E8C53A',.8))}
  }
  if(n.ch3)ch3Hand(g,n,U,{bw,top,side,back,f,t,skin,coat,moving,as:sw*1*U*f},D3);
  // ---------- head
  C(hx,hy,hr,skin);
  if(!back){g.fillStyle='#2A1E1A';if(side){C(hx+f*(hr-2*U),hy+.8*U,1.4*U,'#2A1E1A');if(!K.kid)E(hx+f*(hr+.1*U),hy+2.2*U,.9*U,1.1*U,cMul(skin,.9))}else{C(hx-2.5*U,hy+.8*U,1.4*U,'#2A1E1A');C(hx+2.5*U,hy+.8*U,1.4*U,'#2A1E1A')}
    if(K.blush||K.kid){g.globalAlpha=.5;if(side)C(hx+f*2.4*U,hy+3*U,1*U,'#D9806A');else{C(hx-3.6*U,hy+3*U,1*U,'#D9806A');C(hx+3.6*U,hy+3*U,1*U,'#D9806A')}g.globalAlpha=1}}
  // right-side shade on the head + 1.5 U band under the hair/hat
  // beards: at most 1 in 3 men (K.beard: 1 = always, 2 = welder block, 3 = maybe)
  const beardOn=!n.fem3&&!n.noBeard3&&(K.beard===1||K.beard===2&&h%2===0||K.beard===3&&(h2+kind.length*7)%3===0);
  if(kind==='fan'&&beardOn&&!back){R(hx-3*U,hy+3.4*U,6*U,4*U,'#5A4636')}
  else if(beardOn&&!back){const bc=K.beardC||(K.beard===2?cMul(hairC,.6):['#5A4636','#3A2A22','#8A6B3A'][(h>>3)%3]),shp=K.beard===1||K.beard===2?0:(h>>2)%3;g.fillStyle=bc;
    if(side)E(hx+f*2.6*U,hy+3*U,(n.civ==='keeper'?1.5:3)*U,(n.civ==='keeper'?2:2.6)*U,bc);else if(shp===0){g.beginPath();g.moveTo(hx-5.2*U,hy+3.2*U);g.quadraticCurveTo(hx-4.6*U,hy+8*U,hx,hy+8*U);g.quadraticCurveTo(hx+4.6*U,hy+8*U,hx+5.2*U,hy+3.2*U);g.lineTo(hx+3.4*U,hy+3.6*U);g.lineTo(hx-3.4*U,hy+3.6*U);g.closePath();g.fill()}else if(shp===1)P([hx-4*U,hy+3.2*U,hx+4*U,hy+3.2*U,hx,hy+8*U],bc);else{R(hx-5.8*U,hy+2.6*U,2.4*U,4.6*U,bc);R(hx+3.4*U,hy+2.6*U,2.4*U,4.6*U,bc);R(hx-3.4*U,hy+5.4*U,6.8*U,1.6*U,bc)}}
  // ---------- hair (when no full cover)
  const cover=K.hood||['peaked','toque','scarfK','mask','sou','watch','beanieP','wideF','bowler','teamcap','capP','blackcap','beret','nurse'].includes(HAT);
  const hair=()=>{g.fillStyle=hairC;
    if(hs==='bald'){if(HAT)return;R(hx-hr-.2*U,hy-2.6*U,1.6*U,2.4*U,hairC);R(hx+hr-1.4*U,hy-2.6*U,1.6*U,2.4*U,hairC);if(back)R(hx-5*U,hy,10*U,2.4*U,hairC);return}
    if(hs==='curly'&&HAT){C(hx-hr+.4*U,hy-2.2*U,1.8*U,hairC);C(hx+hr-.4*U,hy-2.2*U,1.8*U,hairC);if(back)R(hx-5*U,hy-1*U,10*U,3*U,hairC);return}   // under a hat: side tufts only
    if(hs==='curly'){for(let k=0;k<7;k++){const a=Math.PI*(1+k/6);C(hx+Math.cos(a)*5.6*U,hy-1*U+Math.sin(a)*5.6*U,2.4*U,hairC)}if(back)C(hx,hy,6.4*U,hairC);return}
    g.beginPath();g.arc(hx,hy-1.4*U,hr+.2*U,Math.PI*.95,Math.PI*2.05);g.fill();if(back)C(hx,hy,hr+.2*U,hairC);
    if(hs==='part'&&!back&&!side)P([hx-6*U,hy-2*U,hx+3*U,hy-1*U,hx+3*U,hy-5*U,hx-6*U,hy-5*U],hairC);
    if(hs==='tail'&&kind!=='runner'){if(back)R(hx-1.4*U,hy+3*U,2.8*U,6*U,hairC);else if(side)R(hx-f*6.5*U-(f>0?1.6:0)*U,hy-1*U,2.2*U,7*U,hairC)}
    if(hs==='long'){if(back)R(hx-6*U,hy,12*U,7*U,hairC);else{R(hx-6.4*U,hy-1*U,2.2*U,8*U,hairC);if(!side)R(hx+4.2*U,hy-1*U,2.2*U,8*U,hairC)}}
    if(hs==='bun'){const d4=n.civ==='dancer4',bxx=side?hx-f*(d4?4.6:4.5)*U:hx,byy=hy-(d4?6.6+(!moving?[0,.5,1,.5][Math.floor(t/.45)%4]:0):7.8)*U,br=(d4?3.6:4.5)*U;C(bxx,byy,br,hairC);R(bxx-1*U,byy-.6*U,2*U,.8*U,'rgba(255,255,255,.35)');if(d4){g.save();g.translate(bxx,byy+br*.75);if(side)g.rotate(-f*.5);R(-2.4*U,-1*U,4.8*U,2*U,'#4A2F8A');g.restore()}}};
  if(!cover||['wideF','bowler','teamcap','capP','blackcap','beret','nurse','watch','mask'].includes(HAT))hair();
  // ---------- hats
  const H=HAT;
  if(K.hood){const hc=coat;P([hx-3.5*U,hy-6*U,hx+3.5*U,hy-6*U,hx+(side?-f*1.5:0)*U,hy-hr-4.4*U],hc);g.fillStyle=hc;g.beginPath();g.arc(hx,hy-.5*U,7.2*U,Math.PI*1.02,Math.PI*1.98+(back?3.1:0));g.fill();if(back){C(hx,hy,7.2*U,hc);g.strokeStyle='#E8C53A';g.lineWidth=2*U;g.beginPath();g.arc(hx,hy-.5*U,6.4*U,Math.PI*.15,Math.PI*.85);g.stroke()}else if(side){g.strokeStyle='#E8C53A';g.lineWidth=2*U;g.beginPath();g.arc(hx,hy-.5*U,6.4*U,f>0?-Math.PI*.45:Math.PI*.55,f>0?Math.PI*.45:Math.PI*1.45);g.stroke()}else{g.strokeStyle='#E8C53A';g.lineWidth=2*U;g.beginPath();g.arc(hx,hy-.5*U,6.4*U,Math.PI*1.05,Math.PI*1.95);g.stroke()}if(!back&&!side){R(hx-7.2*U,hy-1*U,2.2*U,6.5*U,hc);R(hx+5*U,hy-1*U,2.2*U,6.5*U,cMul(hc,.8))}else R(hx-f*7*U-(f>0?0:-0)*U,hy-2*U,3*U,7*U,hc)}
  if(H==='wideF'){E(hx,hy-3.8*U,13*U,2*U,'#26333C');g.fillStyle='#26333C';g.beginPath();g.arc(hx,hy-4.6*U,5.5*U,Math.PI,0);g.fill();R(hx-5.5*U,hy-5.8*U,11*U,1.2*U,'#C2492F')}
  if(H==='sou'){if(back||side)P([hx-6*U,hy-3*U,hx+6*U,hy-3*U,hx+(side?-f*7:7)*U,hy+5*U,hx+(side?-f*1:-7)*U,hy+5*U],cMul(coat,.85));else{R(hx-hr-1.6*U,hy-3*U,2*U,7*U,cMul(coat,.85));R(hx+hr-.4*U,hy-3*U,2*U,7*U,cMul(coat,.85))}E(hx,hy-3.6*U,12*U,2.2*U,coat);E(hx,hy-3.1*U,12*U,1*U,cMul(coat,.75));g.fillStyle=coat;g.beginPath();g.arc(hx,hy-4.4*U,5.5*U,Math.PI,0);g.fill()}
  if(H==='watch'){g.fillStyle='#2F5A8A';g.beginPath();g.arc(hx,hy-1.8*U,6.4*U,Math.PI,0);g.fill();R(hx-6.4*U,hy-4.6*U,12.8*U,2.8*U,cMul('#2F5A8A',1.15))}
  if(H==='mask'){if(!back&&Math.floor(t/.3)%4===1){R(hx-6*U,hy-6*U,12*U,10*U,'#26333C');R(hx-4*U,hy-1.5*U,8*U,2.4*U,'#58FFB0')}else{g.save();g.translate(hx,hy-14.5*U);g.rotate(-.22);R(-6*U,-3.5*U,12*U,7*U,'#26333C');R(-4*U,-1.5*U,8*U,2.4*U,'#4E7C7A');g.restore();L(hx-4*U,hy-9*U,hx-5.2*U,hy-12*U,.9*U,'#26333C');L(hx+4*U,hy-9*U,hx+5.6*U,hy-13*U,.9*U,'#26333C')}}
  if(H==='beret'){E(hx+(side?-f:1)*1.5*U,hy-5*U,7*U,2.6*U,'#D9437A');C(hx+(side?-f:1)*1.5*U,hy-8*U,1*U,'#D9437A');E(hx+(side?-f:1)*1.5*U,hy-4.2*U,7*U,1*U,cMul('#D9437A',.75))}
  if(H==='toque'){const sq=Math.floor(t/.7)%3===1?.8*U:0;R(hx-6*U,hy-6.4*U,12*U,3.8*U,'#F2EBDD');[[-4.2,-10],[4.2,-10],[0,-12.6],[-2,-11.4],[2,-11.4]].forEach(([a,b])=>C(hx+a*U,hy+b*U+sq,4.6*U,'#F2EBDD'));R(hx-6*U,hy-3.6*U,12*U,1.2*U,'#C2492F')}
  if(H==='scarfK'){g.fillStyle='#4E7C7A';g.beginPath();g.arc(hx,hy-.6*U,6.9*U,Math.PI*.92,Math.PI*2.08);g.fill();if(back){C(hx,hy,6.9*U,'#4E7C7A');C(hx,hy+5*U,2.5*U,cMul('#4E7C7A',.85));P([hx-1*U,hy+6*U,hx-3.5*U,hy+10*U,hx-1*U,hy+9.5*U],'#4E7C7A');P([hx+1*U,hy+6*U,hx+3.5*U,hy+10*U,hx+1*U,hy+9.5*U],'#4E7C7A')}else if(side){C(hx-f*5*U,hy+1*U,2.6*U,'#4E7C7A')}else{R(hx-6.8*U,hy-1*U,1.8*U,4*U,'#4E7C7A');R(hx+5*U,hy-1*U,1.8*U,4*U,cMul('#4E7C7A',.8));C(hx+8.4*U,hy-3*U,2.6*U,'#4E7C7A');P([hx+8*U,hy-2*U,hx+11.5*U,hy+2*U,hx+9.5*U,hy+3*U],'#4E7C7A')}}
  if(H==='beanieP'){g.fillStyle=acc;g.beginPath();g.arc(hx,hy-1.8*U,hr+.4*U,Math.PI,0);g.fill();R(hx-hr-.6*U,hy-4.4*U,(hr+.6*U)*2,3*U,cMul(acc,.85));C(hx,hy-hr-4*U,3*U,'#F2EFE6')}
  if(H==='capP'){g.fillStyle=coat;g.beginPath();g.arc(hx,hy-1.8*U,6.6*U,Math.PI,0);g.fill();R(hx-6.6*U,hy-3*U,13.2*U,1.2*U,cMul(coat,.75));if(side)R(f>0?hx+3*U:hx-8*U,hy-3.2*U,5*U,1.6*U,cMul(coat,.7));else if(!back)E(hx,hy-2.6*U,7.2*U,1.1*U,cMul(coat,.7))}
  if(H==='teamcap'||H==='blackcap'){const cc=H==='blackcap'?'#14110f':acc;g.fillStyle=cc;g.beginPath();g.arc(hx,hy-1.8*U,6.3*U,Math.PI,0);g.fill();if(!back){if(side)R(f>0?hx:hx-10*U,hy-3.2*U,10*U,1.6*U,cMul(cc,.75));else E(hx,hy-2.6*U,7.4*U,1.4*U,cMul(cc,.75))}}
  if(H==='peaked'){R(hx-8.5*U,hy-9*U,17*U,4.6*U,'#26333C');R(hx-8.5*U,hy-9*U,17*U,1.1*U,'#3A4A55');R(hx-6.5*U,hy-5.6*U,13*U,1.3*U,'#E8C53A');if(side)R(f>0?hx+2*U:hx-10*U,hy-4.4*U,8*U,1.8*U,'#14110f');else if(!back)E(hx,hy-3.6*U,7.5*U,1.9*U,'#14110f');C(hx,hy-7*U,1*U,'#E8C53A')}
  if(H==='nurse'){R(hx-6*U,hy-10.6*U,12*U,6*U,'#F2EBDD');R(hx-6*U,hy-5.4*U,12*U,.8*U,cMul('#F2EBDD',.8));R(hx-2*U,hy-8.2*U,4*U,1.4*U,'#C2492F');R(hx-.7*U,hy-9.6*U,1.4*U,4*U,'#C2492F')}
  if(H==='bowler'){E(hx,hy-3.8*U,8.5*U,1.7*U,'#26333C');g.fillStyle='#26333C';g.beginPath();g.ellipse(hx,hy-4.4*U,5.8*U,6*U,0,Math.PI,0);g.fill();R(hx-5.8*U,hy-5.8*U,11.6*U,1.5*U,'#E8C53A')}
  if(kind==='runner')R(hx-hr,hy-3.6*U,hr*2,2*U,'#D9437A');
  // gull on the gull lady's right shoulder
  if(kind==='granny'&&!n.noGull){const gx0=side?-f*2*U:bw/2+.5*U,gy0=top-6.5*U;g.save();g.translate(gx0,gy0);if(side&&f<0)g.scale(-1,1);const gx=0,gy=0,wf=Math.floor(t/.8)%3,tl=(wf===1?-.26:wf===2?.14:0)+(side&&wf!==1?-.26:0),wd=wf===2?3*U:0,wu=wf===1?-2.5*U:0;
    E(gx,gy,6*U,3.5*U,'#F2EBDD');g.save();g.translate(gx+4.4*U,gy-3*U);g.rotate(tl);C(0,0,2.6*U,'#F2EBDD');P([2.2*U,-.5*U,5*U,.3*U,2.2*U,1.1*U],'#E8A33D');C(.9*U,-.6*U,.65*U,'#14110f');g.restore();
    P([gx-1.5*U,gy-1*U+wd,gx-8.5*U,gy-4*U+wd*1.5+wu*1.6,gx+2.5*U,gy-.6*U+wd],'#9aa4aa');R(gx-.8*U,gy+2.6*U,.9*U,3*U,'#E8A33D');R(gx+1.4*U,gy+2.6*U,.9*U,3*U,'#E8A33D');g.restore()}
  if(n.ch3)ch3Post(g,n,U,{bw,top,back,side,f,t,bob,hx,hy,hr,skin,coat},D3);
  g.restore();
}

/* outline: figure drawn once into a reused scratch picture, then stamped 8 times in the outline colour + once on top */
const CIV3S={c:null,t:null};
function civ3Scratch(W,H){for(const k of ['c','t']){let c=CIV3S[k];if(!c){c=CIV3S[k]=document.createElement('canvas')}if(c.width<W||c.height<H){c.width=Math.max(W,c.width);c.height=Math.max(H,c.height)}}return CIV3S}
function owCiv3Draw(x,y,dir,moving,n,tm,ph){
  owCiv3(x,y,dir,moving,n,tm,ph,'under');
  /* speed-up: a standing townsperson keeps a finished picture (figure + outline) and redraws it at most 10 times a second */
  if(!moving){const _lite=document.body&&document.body.classList.contains('lite'),_hz=_lite?3:10;
    const T0=og.getTransform(),k0=Math.min(_lite?2:3,Math.hypot(T0.a,T0.b)||1),U0=OWT/36,px=(n.rx!=null?n.rx:n.x),py=(n.ry!=null?n.ry:n.y),tq=Math.floor((tm||0)*_hz)/_hz;
    const key=dir+'|'+px+'|'+py+'|'+k0.toFixed(2)+'|'+tq,sx0=px*OWT+OWT/2,sy0=py*OWT+OWT-6,bx0=sx0-37*U0,by0=sy0-63*U0,BW0=74*U0,BH0=72*U0;
    let C=n._c3;if(!C||C.key!==key){const W=Math.ceil(BW0*k0),H=Math.ceil(BH0*k0);if(!C){C=n._c3={key:'',c:document.createElement('canvas')};const _pl=owCiv3Draw._pool||(owCiv3Draw._pool=[]);if(_pl.indexOf(n)<0)_pl.push(n);while(_pl.length>48){let oi=0,ot=1e18;for(let _k=0;_k<_pl.length;_k++){const q=_pl[_k];if(q!==n&&(q._c3T||0)<ot){ot=q._c3T||0;oi=_k}}const old=_pl.splice(oi,1)[0];if(old&&old._c3){old._c3.c.width=0;old._c3.c.height=0;old._c3=null}}}
      if(C.c.width!==W||C.c.height!==H){C.c.width=W;C.c.height=H}const g2=C.c.getContext('2d');g2.setTransform(1,0,0,1,0,0);g2.clearRect(0,0,W,H);g2.setTransform(k0,0,0,k0,-bx0*k0,-by0*k0);
      civ3Fig(g2,x,y,dir,moving,n,tq,ph);C.key=key}
    n._c3T=performance.now();og.drawImage(C.c,bx0,by0,BW0,BH0);return}
  civ3Fig(og,x,y,dir,moving,n,tm,ph)}
function civ3Fig(D,x,y,dir,moving,n,tm,ph){
  const T=D.getTransform(),k=Math.min(3,Math.hypot(T.a,T.b)||1),U=OWT/36,sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-6;
  const bx=sx-36*U,by=sy-62*U,BW=72*U,BH=70*U,W=Math.ceil(BW*k),H=Math.ceil(BH*k);
  const S=civ3Scratch(W,H),c=S.c,cg=c.getContext('2d');cg.setTransform(1,0,0,1,0,0);cg.clearRect(0,0,W+2,H+2);cg.setTransform(k,0,0,k,-bx*k,-by*k);
  CIV3CTX=cg;try{owCiv3(x,y,dir,moving,n,tm,ph,'fig')}finally{CIV3CTX=null}
  const t=S.t,tg=t.getContext('2d');tg.globalCompositeOperation='copy';tg.drawImage(c,0,0,W,H,0,0,W,H);tg.globalCompositeOperation='source-in';tg.fillStyle='#1E262C';tg.fillRect(0,0,W,H);tg.globalCompositeOperation='source-over';
  const w=.7*U;for(let a=0;a<8;a++)D.drawImage(t,0,0,W,H,bx+Math.cos(a*Math.PI/4)*w,by+Math.sin(a*Math.PI/4)*w,BW,BH);D.drawImage(c,0,0,W,H,bx,by,BW,BH)}
const CIV4_ALIAS={busker:'busker4',dancer:'dancer4',hacker:'hacker4',mouse:'mouse4',tech:'tech4',usher:'usher4'};
function owCiv(x,y,dir,moving,n,tm,ph){
  if(CIV3ON){
    if(CIV3[n.civ])return owCiv3Draw(x,y,dir,moving,n,tm,ph);
    const al=CIV4_ALIAS[n.civ];
    if(al&&CIV3[al]){const p=n._c4a||(n._c4a=Object.assign(Object.create(n),{civ:al,ch3:1}));return owCiv3Draw(x,y,dir,moving,p,tm,ph)}
  }
  return owCivOld(x,y,dir,moving,n,tm,ph)
}
window.CIV3SET=v=>{CIV3ON=v};
/* ---------- CHAR3: crew members + story characters in the approved drawn (civ3) style. LOOK SHEET round 2 (CF_103), proposal. ----------
   Owner rules (2026-11-22): every crew member wears the TEAM JACKET (team colour body, contrast sleeves, crew mark big on the back,
   on the chest and on the sleeve) and carries the team helmet by the facemask. Captains (crew bosses) look the same but SIT ON A
   TROPHY THRONE (round 2: a spiky fan welded from rivals' facemask bars and goalpost tips, helmet-shell arms, on a stone dais) and
   toss a football. Story characters on a team wear that team's jacket; the rest keep a job look, one look per job in every town.
   New jobs: KEEPER (shop/bar man: bib apron, towel, glass) and ELDER (gull lady's bun, shawl and cane without the gull).
   Drawing goes through owCiv3 (same outline, light, faces, cache); this file adds the hooks it calls when n.ch3 is set. */
const TEAM3={
 street:{a:'#e4572e',s:'#F2EFE6',t:'#14110f',p:'#ece8dc',hel:'#1f3f9e',mk:'star',mc:'#F2EFE6',sp:'bar'},
 cats:{a:'#8e5bd8',s:'#F2EFE6',t:'#3f2273',p:'#2b2b34',hel:'#3f2273',mk:'cat',mc:'#F2EFE6',sp:'ears'},
 kings:{a:'#f2b632',s:'#14110f',t:'#14110f',p:'#26333C',hel:'#14110f',mk:'crown',mc:'#14110f',sp:'bar'},
 rollers:{a:'#2CB8A8',s:'#F2EFE6',t:'#0d4a3c',p:'#E6DCC8',hel:'#0d4a3c',mk:'wings',mc:'#F2EFE6',sp:'bar'},
 captain:{a:'#d6362f',s:'#14110f',t:'#ffc23d',p:'#14110f',hel:'#5a0f0c',mk:'bolt',mc:'#ffc23d',sp:'wire'},
 rats1:{a:'#c6f23a',s:'#26333C',t:'#14110f',p:'#26333C',hel:'#c6f23a',mk:'hardhat',mc:'#14110f',sp:'hardhat'},
 baitdogs:{a:'#1F3A5F',s:'#B5643C',t:'#E8E2D0',p:'#1F3A5F',hel:'#1F3A5F',mk:'anchor',mc:'#E8E2D0',sp:'hook'},
 longshore:{a:'#2E6B4A',s:'#E8E2D0',t:'#2B3036',p:'#E8E2D0',hel:'#2E6B4A',mk:'hooks',mc:'#E8E2D0',sp:'hook'},
 gantry:{a:'#2D3440',s:'#D8D2C4',t:'#D9A441',p:'#2B3036',hel:'#3A4350',mk:'crane',mc:'#D9A441',sp:'bar',rim:'#9CC4DD'},
 closers:{a:'#9FC6D8',s:'#F2EFE6',t:'#3A4450',p:'#3A4450',hel:'#9FC6D8',mk:'bell',mc:'#3A4450',sp:'bell'},
 dredgers:{a:'#8A4A30',s:'#E8E2D0',t:'#3A464E',p:'#D8D0C0',hel:'#8A4A30',mk:'bucket',mc:'#E9D9B8',sp:'teeth'}
};
TEAM3.rats2=TEAM3.rats1;TEAM3.dredgers1=TEAM3.dredgers;
const RIVAL3={street:'#2F6F6A',cats:'#f2b632',kings:'#2CB8A8',rollers:'#d6362f',captain:'#8e5bd8',rats1:'#1F3A5F',rats2:'#1F3A5F',baitdogs:'#c6f23a',
  longshore:'#B5643C',gantry:'#2E6B4A',closers:'#D9A441',dredgers:'#9FC6D8',dredgers1:'#9FC6D8'};
const POS3={QB:15,RB:15,WR:13,TE:17,OL:19};
const FEM3=/^(Rita|Marla|Nessa|Hana|Odele|Ines|Marta|Lacey|Iris|Pepper)\b/;
Object.assign(CIV3,{
 crew:{coats:['#888888'],acc:'#E8C53A',beard:3},
 keeper:{coats:['#E6DCC8','#D8CDB4','#E6DCC8'],pants:['#3A3E44','#2F3A40'],acc:'#6B4A36',ws:[15,17,17],hats:['none','none','watch'],beard:3}
});
/* named players keep their own signature wherever they appear (crews sheet, story sheet, variety, town) */
const RIP3={tape14:1,satchel:1,hat3:'none',hair3:'short',hairC3:'#1a1410',noBeard3:1,bw3:13},ZD3={zd:1,hat3:'none',hair3:'curly',hairC3:'#2a1a10',noBeard3:1};
const NAMEX3=[[/Zero Day/,ZD3],[/Riptide/,RIP3],[/Ten-Ton/,{pennant:1}]];
function ch3Seed(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function ch3Team(id){if(id==='street'){let u=null;try{u=SAVE.uni}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}const T=Object.assign({},TEAM3.street);if(u){T.a=u.jc||T.a;T.s=u.jt||T.s;T.p=u.pc||T.p;T.hel=u.hc||T.hel}return T}return TEAM3[id]||TEAM3.street}
function ch3Crew(team,name,pos,boss,extra){const T=ch3Team(team),sd=ch3Seed(name),bare=name.replace(/^"[^"]*"\s*/,''),fem=FEM3.test(bare)||FEM3.test(name);
  const hats=['none','none','beanieP','teamcap'],nx=team==='captain'?{}:(NAMEX3.find(([re])=>re.test(name))||[0,{}])[1];   // Netrunners' roster slot for Zero Day: plain member
  return Object.assign({ch3:1,civ:'crew',team3:team,T3:T,name3:name,pos3:pos,boss3:!!boss,seed3:sd,fem3:fem,coat3:T.a,slv3:T.s,acc3:T.t==='#14110f'?T.hel:T.t,
    pants3:T.p,bw3:POS3[pos]||15,hat3:hats[(sd>>>9)%4],hair3:fem?['tail','long','curly'][(sd>>>3)%3]:undefined},nx,extra||{})}
const ch3MC=T=>T.t==='#14110f'?T.s:T.t;   // a light accent for team-coloured details
/* ---- crew marks (s = full size in px) ---- */
function ch3Mark(g,mk,cx,cy,s,c,R,C,E,L,P){g.save();g.translate(cx,cy);const u=s/8;
  if(mk==='anchor'){R(-.8*u,-3.6*u,1.6*u,6.6*u,c);R(-2.6*u,-2.6*u,5.2*u,1.3*u,c);C(0,-3.8*u,1.2*u,c);g.strokeStyle=c;g.lineWidth=1.4*u;g.beginPath();g.arc(0,.4*u,3.4*u,.15*Math.PI,.85*Math.PI);g.stroke();P([3.4*u,.2*u,4.4*u,-1.4*u,2.2*u,-.4*u],c)}
  else if(mk==='hooks'){g.strokeStyle=c;g.lineWidth=1.3*u;g.lineCap='butt';g.beginPath();g.moveTo(-3.4*u,-3.6*u);g.lineTo(2.4*u,2.2*u);g.moveTo(3.4*u,-3.6*u);g.lineTo(-2.4*u,2.2*u);g.stroke();
    g.lineWidth=1.4*u;g.beginPath();g.moveTo(2.4*u,2.2*u);g.quadraticCurveTo(4.4*u,4.8*u,1*u,4.6*u);g.lineTo(.6*u,3.2*u);g.moveTo(-2.4*u,2.2*u);g.quadraticCurveTo(-4.4*u,4.8*u,-1*u,4.6*u);g.lineTo(-.6*u,3.2*u);g.stroke();   // 2 U hooked ends
    P([-3.4*u,-3.6*u,-4.2*u,-4.6*u,-2.4*u,-4*u],c);P([3.4*u,-3.6*u,4.2*u,-4.6*u,2.4*u,-4*u],c)}
  else if(mk==='crane'){g.strokeStyle=c;g.lineWidth=1.2*u;g.strokeRect(-3.8*u,-3.8*u,7.6*u,7.6*u);R(-.5*u,-3.8*u,1*u,4*u,c);g.beginPath();g.arc(-.6*u,1.4*u,1.6*u,0,Math.PI);g.stroke()}
  else if(mk==='bell'){P([-1.6*u,-3*u,1.6*u,-3*u,2.6*u,1.6*u,3.6*u,2.4*u,-3.6*u,2.4*u,-2.6*u,1.6*u],c);C(0,-3.4*u,.9*u,c);C(0,3.4*u,1*u,c)}
  else if(mk==='bucket'){R(-3.5*u,-3.2*u,7*u,3*u,c);for(const k of [-3.2,-1,1.2])P([k*u,-.4*u,(k+2)*u,-.4*u,(k+1)*u,3.6*u],c)}   // 7 x 3 U bar + three 2 x 3 U teeth
  else if(mk==='cat'){C(0,.6*u,3.2*u,c);P([-3*u,-.6*u,-2.6*u,-4.2*u,-.6*u,-2.2*u],c);P([3*u,-.6*u,2.6*u,-4.2*u,.6*u,-2.2*u],c)}
  else if(mk==='crown'){P([-3.8*u,2.6*u,-3.8*u,-2.6*u,-1.9*u,-.4*u,0,-3.6*u,1.9*u,-.4*u,3.8*u,-2.6*u,3.8*u,2.6*u],c)}
  else if(mk==='wings'){P([-4*u,-1*u,0,-3.6*u,4*u,-1*u,4*u,.4*u,0,-2*u,-4*u,.4*u],c);P([-4*u,2*u,0,-.6*u,4*u,2*u,4*u,3.4*u,0,1*u,-4*u,3.4*u],c)}
  else if(mk==='bolt'){P([1*u,-4*u,-2.4*u,.6*u,-.2*u,.6*u,-1*u,4*u,2.4*u,-.8*u,.2*u,-.8*u],c)}
  else if(mk==='hardhat'){g.fillStyle=c;g.beginPath();g.arc(0,1*u,3.2*u,Math.PI,0);g.fill();R(-4.2*u,.8*u,8.4*u,1.4*u,c);R(-.5*u,-2.6*u,1*u,3*u,c)}
  else{const r1=4*u,r2=1.7*u,p=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,r=k%2?r2:r1;p.push(Math.cos(a)*r,Math.sin(a)*r)}P(p,c)}   // star
  g.restore()}
/* ---- helmet: 7 x 6 U shell ~12% lighter than the jacket (Gantry #3A4350), 1 U stripe #F1EDE4, 2 U facemask #C9D3D8 ---- */
function ch3Shell(T){return T.hel==='#3A4350'?'#3A4350':cMul(T.a,1.12)}
function ch3Helmet(g,hx,hy,U,T,f,R,C,E,L,P){const sh=ch3Shell(T);E(hx,hy,3.5*U,3*U,sh);g.fillStyle=cMul(sh,.8);g.beginPath();g.ellipse(hx,hy,3.5*U,3*U,0,.15*Math.PI,.85*Math.PI);g.fill();
  g.strokeStyle='#F1EDE4';g.lineWidth=1*U;g.beginPath();g.ellipse(hx,hy,2.7*U,2.2*U,0,1.1*Math.PI,1.9*Math.PI);g.stroke();
  g.strokeStyle='#C9D3D8';g.lineWidth=.9*U;g.beginPath();g.moveTo(hx+f*2.4*U,hy-.6*U);g.lineTo(hx+f*4.6*U,hy);g.lineTo(hx+f*4.4*U,hy+2.6*U);g.lineTo(hx+f*1.4*U,hy+2.8*U);g.moveTo(hx+f*2.6*U,hy+1.2*U);g.lineTo(hx+f*4.5*U,hy+1.3*U);g.stroke();
  C(hx-f*1*U,hy+.4*U,.7*U,'#14110f')}
function ch3Ball(g,x,y,U,rot,R,C,E,L,P){g.save();g.translate(x,y);g.rotate(rot);E(0,0,3.2*U,2*U,'#7A4A2A');g.strokeStyle='#F2EFE6';g.lineWidth=.5*U;g.beginPath();g.moveTo(-1.4*U,-.4*U);g.lineTo(1.4*U,-.4*U);for(let k=-1;k<=1;k++){g.moveTo(k*.7*U,-1*U);g.lineTo(k*.7*U,.2*U)}g.stroke();g.restore()}

/* ================= TROPHY THRONE (round 3) =================
   A heap of gear taken from beaten rivals: straight blades (cut facemask bars / goalpost tips, 3 U base -> clean 1 U point) fanning
   from one point behind the captain's head, 2-3 overlapping steel plates with a stepped top (no rounded panel, no badge), helmet-shell
   arms in the two NEAREST RIVAL crews' colours, 4 U legs with a solid 2 U brace, 3 U stepped stone dais. Steel #3A4350 / #4B5666,
   light rim #9CC4DD, nubs #8794A3, a lighter plate #566274 behind the head. Static; never glows. Units: U, floor = 0, up = negative.
   The captain sits 2 U lower than standing: head centre -30, head top -36. */
const TH3={steel:'#3A4350',top:'#4B5666',dark:'#2A3038',rim:'#9CC4DD',nub:'#8794A3',head:'#566274'};
const NEAR3={baitdogs:['longshore','gantry'],longshore:['baitdogs','gantry'],gantry:['longshore','closers'],closers:['gantry','baitdogs'],
  dredgers:['closers','rats1'],dredgers1:['closers','rats1'],cats:['kings','rollers'],kings:['cats','rollers'],rollers:['kings','captain'],
  captain:['rollers','cats'],rats1:['captain','baitdogs'],rats2:['captain','baitdogs'],street:['cats','kings']};
function ch3Rivals(n){return (NEAR3[n.team3]||['kings','cats']).map(id=>ch3Shell(TEAM3[id]))}
/* blades: [angle from straight up in degrees (- = viewer's left), tip height above the floor]; 5-7 per crew, never a mirror */
const FAN3=[[[-50,42],[-31,47],[-13,48],[10,44],[27,46],[46,42]],[[-47,43],[-24,48],[-6,46],[17,48],[38,42]],[[-52,42],[-36,45],[-19,48],[2,46],[19,47],[33,43],[50,42]],
  [[-44,46],[-22,42],[-8,48],[14,45],[32,47],[49,42]]];
function ch3Fan(n){return FAN3[ch3Seed(n.team3||'x')%4]}
function ch3Blades(g,n,U,mir,D){const {R,C,E,L,P}=D,T=n.T3,sty=T.sp,ox=0,oy=-30,blades=ch3Fan(n);
  blades.forEach(([a,tipH],k)=>{const ar=a*Math.PI/180*mir,dx=Math.sin(ar),dy=-Math.cos(ar),Lt=(tipH-30)/Math.cos(a*Math.PI/180),r0=8.2;   // start 2 U outside the head
    const x0=(ox+dx*r0)*U,y0=(oy+dy*r0)*U,x1=(ox+dx*Lt)*U,y1=(oy+dy*Lt)*U,nx=-dy,ny=dx,wb=(sty==='teeth'?4:3)*U/2,wt=.5*U;
    if(sty==='wire'){g.strokeStyle=TH3.top;g.lineWidth=1.6*U;g.beginPath();g.moveTo(x0,y0);for(let q=1;q<=6;q++){const f2=q/6,w=(q%2?1.4:-1.4)*U*(q<6?1:0);g.lineTo(x0+(x1-x0)*f2+nx*w,y0+(y1-y0)*f2+ny*w)}g.stroke();return}
    P([x0-nx*wb,y0-ny*wb,x1-nx*wt,y1-ny*wt,x1+dx*1.4*U,y1+dy*1.4*U,x1+nx*wt,y1+ny*wt,x0+nx*wb,y0+ny*wb],k%2?TH3.steel:TH3.top);
    g.strokeStyle=k%2?TH3.top:TH3.rim;g.lineWidth=.6*U;g.beginPath();g.moveTo(x0-nx*wb*.8,y0-ny*wb*.8);g.lineTo(x1-nx*wt*.6,y1-ny*wt*.6);g.stroke();
    if(k===1||k===blades.length-2){const mx=x0+(x1-x0)*.45,my=y0+(y1-y0)*.45;g.save();g.translate(mx,my);g.rotate(ar);R(-1.5*U,-.5*U,3*U,1*U,TH3.nub);g.restore()}   // 3 U crossguard nubs
    if(sty==='ears'&&k%2===0)P([x1-1.6*U,y1+2.4*U,x1+dx*1.2*U,y1+dy*1.2*U,x1+1.6*U,y1+2.4*U],TH3.steel)});
  // per-crew toppers (>= 4 U) on two blade tips so every captain's throne has its own outline
  [blades[1],blades[blades.length-2]].forEach(([a,tipH])=>{const ar=a*Math.PI/180*mir,Lt=(tipH-30)/Math.cos(a*Math.PI/180)-1.6,x=Math.sin(ar)*Lt*U,y=(oy-Math.cos(ar)*Lt)*U;ch3Topper(g,T,x,y,U,D)})}
/* topper shapes, about 5 x 5 U, centred on (x,y) = a blade tip */
function ch3Topper(g,T,x,y,U,D){const {R,C,E,L,P}=D,c=T.a,e=cMul(T.a,1.3),sty=T.sp,mk=T.mk;
  if(sty==='bell'){P([x-1.4*U,y-1.8*U,x+1.4*U,y-1.8*U,x+2.4*U,y+1.8*U,x-2.4*U,y+1.8*U],'#D9A441');C(x,y+2.4*U,.8*U,'#D9A441');return}
  if(sty==='hardhat'){g.fillStyle=c;g.beginPath();g.arc(x,y+1*U,2.6*U,Math.PI,0);g.fill();R(x-3.4*U,y+.8*U,6.8*U,1.2*U,c);return}
  if(sty==='wire'){g.strokeStyle='#ffc23d';g.lineWidth=.8*U;g.beginPath();g.arc(x,y,2.2*U,0,7);g.stroke();return}
  g.fillStyle=c;g.strokeStyle=c;g.lineCap='round';
  if(mk==='anchor'){g.lineWidth=1.3*U;g.beginPath();g.arc(x,y-1*U,3*U,.1*Math.PI,.9*Math.PI);g.stroke();P([x+2.6*U,y+.6*U,x+4*U,y-1.6*U,x+1.6*U,y-.6*U],c);P([x-2.6*U,y+.6*U,x-4*U,y-1.6*U,x-1.6*U,y-.6*U],c)}   // anchor flukes
  else if(mk==='crane'){g.lineWidth=1.3*U;g.beginPath();g.moveTo(x,y-2.6*U);g.lineTo(x,y+.6*U);g.arc(x-1.4*U,y+.6*U,1.4*U,0,Math.PI);g.stroke();R(x-1.4*U,y-3.4*U,2.8*U,1*U,c)}   // crane hook
  else if(mk==='crown')P([x-3*U,y+2*U,x-3*U,y-2*U,x-1.5*U,y-.4*U,x,y-3*U,x+1.5*U,y-.4*U,x+3*U,y-2*U,x+3*U,y+2*U],c);   // crown points
  else if(mk==='cat'){P([x-3*U,y+2*U,x-2.4*U,y-3*U,x-.4*U,y+.6*U],c);P([x+3*U,y+2*U,x+2.4*U,y-3*U,x+.4*U,y+.6*U],c);R(x-3*U,y+1*U,6*U,1.4*U,c)}   // cat ears
  else if(mk==='hooks'){g.lineWidth=1.2*U;g.beginPath();g.moveTo(x-2.6*U,y-2.6*U);g.lineTo(x+1.6*U,y+1.6*U);g.moveTo(x+2.6*U,y-2.6*U);g.lineTo(x-1.6*U,y+1.6*U);g.stroke();g.beginPath();g.arc(x+.4*U,y+2.2*U,1.2*U,-.3,2.6);g.stroke();g.beginPath();g.arc(x-.4*U,y+2.2*U,1.2*U,.5,3.4);g.stroke()}   // crossed hooks
  else if(mk==='wings'){P([x-3*U,y,x,y-2.8*U,x+3*U,y,x+3*U,y+1.2*U,x,y-1.4*U,x-3*U,y+1.2*U],c);P([x-3*U,y+2.2*U,x,y-.6*U,x+3*U,y+2.2*U,x+3*U,y+3.2*U,x,y+.6*U,x-3*U,y+3.2*U],e)}   // chevron fins
  else if(mk==='bucket'){R(x-3*U,y-2.4*U,6*U,2*U,c);for(const k of [-3,-1,1])P([x+k*U,y-.4*U,x+(k+2)*U,y-.4*U,x+(k+1)*U,y+2.6*U],c)}   // bucket teeth
  else{const p=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,r=k%2?1.2:2.8;p.push(x+Math.cos(a)*r*U,y+Math.sin(a)*r*U)}P(p,c)}}   // star
/* 3 stepped plates behind the captain (front) / facing us (back). ph = half width */
function ch3Plates3(g,n,U,ph,mir,back,D){const {R}=D,T=n.T3;
  const pl=back?[[-ph,.5,-32,TH3.steel],[-.5,ph,-29,TH3.top]]:[[-ph,-4.5,-25,TH3.steel],[3.5,ph,-27,TH3.steel],[-6,6,-31,TH3.top]];   // left low, right higher, centre highest (stepped top)
  for(const [a,b,top,c] of pl){const x0=back?a:Math.min(a,b)*mir,x1=back?b:Math.max(a,b)*mir;R(Math.min(x0,x1)*U,top*U,Math.abs(x1-x0)*U,(top*-1-9.5)*U,c);R(Math.min(x0,x1)*U,top*U,Math.abs(x1-x0)*U,.8*U,cMul(c,1.25));
    R(Math.min(x0,x1)*U,top*U,.9*U,(top*-1-9.5)*U,TH3.rim);for(const yy of [top+2,-12]){R((Math.min(x0,x1)+1)*U,yy*U,.9*U,.9*U,TH3.nub);R((Math.max(x0,x1)-1.9)*U,yy*U,.9*U,.9*U,TH3.nub)}}
  R(-ph*U+1.6*U,-23*U,1*U,12*U,T.a);R(ph*U-2.6*U,-25*U,1*U,14*U,T.a);                       // 1 U team inlay
  if(!back)R(-6*U,-35*U,12*U,10*U,TH3.head)}                                                 // lighter plate behind the head (12 x 10 U)
function ch3Dais(g,U,half,D){const {R,E}=D,h1=(half+6)*U,h2=(half+3)*U;
  E(0,.6*U,h1+3*U,4*U,'rgba(0,0,0,.20)');
  R(-h1,-1.6*U,2*h1,1.6*U,TH3.steel);R(-h2,-3*U,2*h2,1.5*U,TH3.steel);
  R(-h1,-1.6*U,h1*.7,.6*U,TH3.top);R(-h1+h1*.95,-1.6*U,h1*1.05,.6*U,TH3.top);R(-h2,-3*U,h2*1.2,.6*U,TH3.top);R(h2*.45,-3*U,h2*.35,.6*U,TH3.top);R(-h2*.3,-1*U,h2*.5,.4*U,TH3.dark);   // irregular, broken ribs
  R(-h2,-3*U,2*h2,.3*U,TH3.rim);R(-h2,-3*U,1*U,1.5*U,TH3.rim);R(-h1,-1.6*U,1*U,1.6*U,TH3.rim);R(-h1,-1.6*U,h1-h2,.3*U,TH3.rim)}
function ch3ArmBlock(g,n,x0,w,U,D,lit,rc){const {R,C,E,L,P}=D;   // shoulder pad (steel) + a 5 x 5 U rival helmet on top
  R(x0,-13.6*U,w,4.1*U,TH3.steel);R(x0,-13.6*U,w,.8*U,TH3.top);
  g.fillStyle=rc;g.beginPath();g.ellipse(x0+w/2,-15.6*U,2.6*U,2.6*U,0,Math.PI,0);g.fill();R(x0+w/2-2.6*U,-15.6*U,5.2*U,2*U,rc);
  g.strokeStyle='#F1EDE4';g.lineWidth=.8*U;g.beginPath();g.arc(x0+w/2,-15.6*U,2*U,1.15*Math.PI,1.85*Math.PI);g.stroke();
  g.strokeStyle='#C9D3D8';g.lineWidth=.7*U;g.beginPath();g.moveTo(x0+w/2+1.4*U,-15*U);g.lineTo(x0+w/2+2.8*U,-14.6*U);g.lineTo(x0+w/2+2.6*U,-13.4*U);g.stroke();
  if(lit){R(x0,-13.6*U,1*U,4.1*U,TH3.rim)}}
/* a 5 x 5 U rival helmet lying on the dais: shell in the rival crew's colour, white stripe, light facemask */
function ch3Trophy(g,x,U,col,f,D){const {R,C,E}=D;g.fillStyle=col;g.beginPath();g.arc(x,-5.6*U,2.6*U,Math.PI,0);g.fill();R(x-2.6*U,-5.6*U,5.2*U,2.4*U,col);R(x-2.6*U,-3.6*U,5.2*U,.6*U,cMul(col,.7));
  g.strokeStyle='#F1EDE4';g.lineWidth=.8*U;g.beginPath();g.arc(x,-5.6*U,2*U,1.15*Math.PI,1.85*Math.PI);g.stroke();
  g.strokeStyle='#C9D3D8';g.lineWidth=.8*U;g.beginPath();g.moveTo(x+f*1.6*U,-5.2*U);g.lineTo(x+f*3.4*U,-4.8*U);g.lineTo(x+f*3.2*U,-3.4*U);g.stroke()}
function ch3Legs4(g,U,ao,D){const {R}=D;for(const s of [-1,1]){R(s*ao*U-(s>0?4:0)*U,-9.5*U,4*U,6.5*U,TH3.steel);R(s*ao*U-(s>0?4:0)*U,-9.5*U,4*U,.6*U,TH3.top)}
  R(-ao*U+4*U,-7*U,2*ao*U-8*U,2*U,TH3.dark);R(-ao*U+4*U,-7*U,2*ao*U-8*U,.5*U,TH3.top)}           // solid 2 U brace (no dotted grille)
function ch3ThroneFront(g,n,U,D,bw0){const {R,C,E,L,P}=D,T=n.T3,ph=bw0/2+4,ai=bw0/2+.5,ao=bw0/2+5.5,rv=ch3Rivals(n);
  ch3Dais(g,U,ao,D);ch3Legs4(g,U,ao,D);ch3Blades(g,n,U,1,D);ch3Plates3(g,n,U,ph,1,false,D);
  P([0,-38.6*U,2.4*U,-36.2*U,0,-33.8*U,-2.4*U,-36.2*U],TH3.top);ch3Mark(g,T.mk,0,-36.2*U,3.4*U,ch3MC(T),R,C,E,L,P);   // small crest plate at the top (front only)
  R(-ao*U,-10.6*U,2*ao*U,2.2*U,TH3.top);R(-ao*U,-8.4*U,2*ao*U,1*U,TH3.steel);
  ch3ArmBlock(g,n,-ao*U,5*U,U,D,1,rv[0]);ch3ArmBlock(g,n,ai*U,5*U,U,D,0,rv[1])}
function ch3ThroneSide(g,n,U,f,D){const {R,C,E,L,P}=D,T=n.T3,bx=-f*7.5*U,rv=ch3Rivals(n);
  ch3Dais(g,U,10,D);
  R(f*3*U-(f>0?0:4)*U,-9.5*U,4*U,6.5*U,TH3.steel);R(-f*9*U-(f>0?0:4)*U,-9.5*U,4*U,6.5*U,TH3.steel);R(Math.min(-f*6*U,f*4*U),-7*U,10*U,2*U,TH3.dark);
  // blades fanning backwards from staggered points on the post: angle from vertical / length (U) / base height
  const SB=[[10,14,-28],[24,11,-27],[36,9,-26],[45,7,-24.5],[17,8,-25.5]],rot=ch3Seed(n.team3||'')%3;
  SB.forEach(([deg,len,by],k)=>{const ang=(deg+[0,3,-3][(rot+k)%3])*Math.PI/180,x0=bx-f*.6*U,y0=by*U,dx=-f*Math.sin(ang),dy=-Math.cos(ang),x1=x0+dx*len*U,y1=y0+dy*len*U,nx=-dy,ny=dx,wb=1.5*U,wt=.5*U;
    if(T.sp==='wire'){g.strokeStyle=TH3.top;g.lineWidth=1.6*U;g.beginPath();g.moveTo(x0,y0);for(let q=1;q<=6;q++){const w=(q%2?1.2:-1.2)*U*(q<6?1:0);g.lineTo(x0+(x1-x0)*q/6+nx*w,y0+(y1-y0)*q/6+ny*w)}g.stroke()}
    else P([x0-nx*wb,y0-ny*wb,x1-nx*wt,y1-ny*wt,x1+dx*1.4*U,y1+dy*1.4*U,x1+nx*wt,y1+ny*wt,x0+nx*wb,y0+ny*wb],k%2?TH3.steel:TH3.top);
    if(k===1||k===3){g.save();g.translate(x0+(x1-x0)*.5,y0+(y1-y0)*.5);g.rotate(Math.atan2(dy,dx)+Math.PI/2);R(-1.5*U,-.5*U,3*U,1*U,TH3.nub);g.restore()}
    if(k===0)ch3Topper(g,T,x1+dx*.6*U,y1+dy*.6*U,U,D)});
  // one short blade curving forward over the head (2 U clear of it)
  g.strokeStyle=TH3.top;g.lineCap='butt';g.lineWidth=1.8*U;g.beginPath();g.moveTo(bx,-29*U);g.quadraticCurveTo(bx+f*1*U,-41.5*U,f*3*U,-40.5*U);g.stroke();
  g.lineWidth=1*U;g.beginPath();g.moveTo(f*2.6*U,-40.6*U);g.lineTo(f*5*U,-39.4*U);g.stroke();
  for(const [d0,top,c] of [[0,-28,TH3.steel],[-2.4,-24,TH3.top]]){R(bx-f*d0*U-1.6*U,top*U,3.2*U,(-top-9.5)*U,c);R(bx-f*d0*U-1.6*U,top*U,3.2*U,.8*U,cMul(c,1.25))}   // stepped plate edges
  R(f>0?bx-1.6*U:bx+.6*U,-28*U,1*U,18.5*U,TH3.rim);
  R(Math.min(bx,f*7*U),-10.6*U,Math.abs(f*7*U-bx),2.2*U,TH3.top);
  R(Math.min(bx,f*5*U),-14.5*U,Math.abs(f*5*U-bx),4*U,TH3.steel);R(Math.min(bx,f*5*U),-14.5*U,Math.abs(f*5*U-bx),.8*U,TH3.top);
  const hx=f*6.5*U;C(hx,-17*U,2.6*U,rv[0]);R(hx-2.6*U,-17*U,5.2*U,2.4*U,rv[0]);g.strokeStyle='#F1EDE4';g.lineWidth=.8*U;g.beginPath();g.arc(hx,-17*U,2*U,1.15*Math.PI,1.85*Math.PI);g.stroke();
  g.strokeStyle='#C9D3D8';g.lineWidth=.9*U;g.beginPath();g.moveTo(hx+f*2*U,-17*U);g.lineTo(hx+f*4*U,-16.4*U);g.lineTo(hx+f*3.6*U,-14.2*U);g.stroke()}   // rival helmet sticking out of the arm
function ch3ThroneBack(g,n,U,D,bw0){const {R,C,E,L,P}=D,T=n.T3,ph=bw0/2+4,ai=bw0/2+.5,ao=bw0/2+5.5,rv=ch3Rivals(n);
  ch3Legs4(g,U,ao,D);ch3ArmBlock(g,n,-ao*U,5*U,U,D,1,rv[1]);ch3ArmBlock(g,n,ai*U,5*U,U,D,0,rv[0]);
  ch3Blades(g,n,U,-1,D);ch3Plates3(g,n,U,ph,-1,true,D);
  g.save();g.translate(1.5*U,-18.5*U);g.rotate(.06);R(-6*U,-6*U,12*U,12*U,cMul(T.a,.85));R(-6*U,-6*U,12*U,.8*U,cMul(T.a,1.2));R(-6*U,-6*U,.8*U,12*U,TH3.rim);
  for(const [px,py] of [[-5,-5],[4.2,-5],[-5,4.2],[4.2,4.2]])R(px*U,py*U,.8*U,.8*U,TH3.nub);ch3Mark(g,T.mk,0,0,8*U,T.mc==='#14110f'?'#F1EDE4':T.mc,R,C,E,L,P);g.restore()}   // mark on its own welded plate, slightly crooked
/* hook 1 — legs: captains sit (dais + throne first, then short seated legs); members unchanged */
function ch3Legs(g,n,U,side,back,f,legH,legC,D,bw0){const {R}=D;
  const rv=ch3Rivals(n);
  if(back){ch3Dais(g,U,bw0/2+5.5,D);ch3Trophy(g,(bw0/2+10)*U,U,rv[0],-1,D);ch3Trophy(g,-(bw0/2+10)*U,U,rv[1],1,D);return}
  if(side){ch3ThroneSide(g,n,U,f,D);ch3Trophy(g,-f*14*U,U,rv[1],-f,D);
    R(Math.min(-1.5*U,f*7*U),-9.5*U,Math.abs(f*7*U+1.5*U),3.2*U,legC);R(f*5*U-2*U,-6.4*U,4*U,2*U,cMul(legC,.85));R(f*5*U-2.2*U+f*1*U,-4.6*U,5*U,1.6*U,'#14110f');return}
  ch3ThroneFront(g,n,U,D,bw0);ch3Trophy(g,-(bw0/2+10)*U,U,rv[0],-1,D);ch3Trophy(g,(bw0/2+10)*U,U,rv[1],1,D);
  R(-5*U,-9.8*U,4.4*U,3.4*U,cMul(legC,1.08));R(.6*U,-9.8*U,4.4*U,3.4*U,cMul(legC,.95));
  R(-4.8*U,-6.6*U,4*U,2.2*U,legC);R(.8*U,-6.6*U,4*U,2.2*U,cMul(legC,.8));R(-5.4*U,-4.6*U,4.8*U,1.6*U,'#14110f');R(.6*U,-4.6*U,4.8*U,1.6*U,'#14110f')}
/* hook 2 — jacket / apron details on the body (after the coat, before the arms) */
function ch3Body(g,n,U,o,D){const {R,C,E,L,P}=D,{bw,top,hemW,hemY,side,back,f,coat}=o;
  if(n.civ==='keeper'){const ap='#6B4A36',apL=cMul(ap,1.35);
    if(back){R(-hemW/2-.5*U,top+15*U,2*U,9*U,ap);R(hemW/2-1.5*U,top+15*U,2*U,9*U,ap);R(-bw/2,top+8*U,bw,1.2*U,ap);R(-1.5*U,top+7.6*U,3*U,2*U,ap);P([-1.5*U,top+8.6*U,-3.6*U,top+11.4*U,-2.2*U,top+11.6*U],ap);P([1.5*U,top+8.6*U,3.6*U,top+11.4*U,2.2*U,top+11.6*U],cMul(ap,.85))}   // 3 x 2 U knot + tails
    else if(side){R(f>0?0:-5*U,top+2*U,5*U,27*U,ap);R(f>0?0:-5*U,top+2*U,1*U,27*U,apL)}
    else{R(-2*U,top+1*U,4*U,6*U,ap);L(-2*U,top+1*U,-3.4*U,top-1*U,.7*U,ap);L(2*U,top+1*U,3.4*U,top-1*U,.7*U,ap);   // 4 x 6 U bib + neck strap
      P([-4*U,top+6*U,4*U,top+6*U,6.5*U,-3*U,-6.5*U,-3*U],ap);P([1.5*U,top+6*U,4*U,top+6*U,6.5*U,-3*U,3*U,-3*U],cMul(ap,.8));L(-4*U,top+6*U,-6.5*U,-3*U,1*U,apL);R(-2*U,top+1*U,1*U,6*U,apL);
      R(-bw/2,top+8*U,bw,1*U,cMul(ap,.8));R(-2.5*U,top+11*U,5*U,3*U,cMul(ap,1.2))}
    return}
  if(n.civ!=='crew')return;const T=n.T3,tr=n.acc3;
  R(-hemW/2,hemY-2.2*U,hemW,2.2*U,tr);R(-hemW/2,hemY-2.2*U,hemW,.5*U,cMul(tr,1.3));        // ribbed hem band
  if(T.rim&&!back&&!side){R(-bw/2,top+2*U,1*U,hemY-top-2*U,T.rim);R(-bw/2+2*U,top-.2*U,bw/2-2*U,.8*U,T.rim)}   // Gantry: 1 U upper-left rim
  if(n.satchel){g.strokeStyle='#D8C7A0';g.lineWidth=2*U;g.lineCap='butt';g.beginPath();if(back){g.moveTo(-bw/2+1.5*U,top+.5*U);g.lineTo(bw/2-1*U,top+12.5*U)}else if(side){g.moveTo(-f*.5*U,top);g.lineTo(f*1.5*U,top+12*U)}else{g.moveTo(bw/2-1.5*U,top+.5*U);g.lineTo(-bw/2+1*U,top+12.5*U)}g.stroke()}
  if(back){R(-4.5*U,top-1*U,9*U,2.4*U,tr);
    if(n.tape14){g.fillStyle=T.mc;g.font='900 '+(9*U)+'px Impact,"Arial Black",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('14',0,top+7*U);g.save();g.translate(0,top+7*U);g.rotate(-.4);R(-7*U,-1*U,14*U,2*U,'#E8E1CF');g.restore()}
    else ch3Mark(g,T.mk,0,top+6.5*U,9*U,T.mc,R,C,E,L,P);
    return}
  if(side){R(f>0?-1*U:-3*U,top-1*U,4*U,2*U,tr);return}
  R(-.4*U,top+1*U,.8*U,hemY-top-3*U,cMul(coat,.6));R(-4*U,top-1*U,8*U,2.2*U,tr);P([-1.6*U,top+1*U,1.6*U,top+1*U,0,top+3.4*U],cMul(coat,.75));
  ch3Mark(g,T.mk,-bw/2+3.8*U,top+5.6*U,5*U,T.mc,R,C,E,L,P);                                   // chest mark 5 x 5 U
  if(n.tape14){g.fillStyle=T.mc;g.font='900 '+(4.2*U)+'px Impact,"Arial Black",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('14',bw/2-3.6*U,top+5.6*U);g.save();g.translate(bw/2-3.6*U,top+5.6*U);g.rotate(-.35);R(-3.4*U,-1*U,6.8*U,2*U,'#E8E1CF');g.restore()}}
/* hook 3 — hands: helmet (members), ball toss (captains), towel + glass + rolled sleeves (keeper), sleeve mark, satchel, pennant */
function ch3Hand(g,n,U,o,D){const {R,C,E,L,P}=D,{bw,top,side,back,f,t,skin,coat}=o;
  if(n.civ==='keeper'){const fr=Math.floor(t/.45)%4,gl=(fr===1||fr===2?-2:0)*U,tsw=(fr%2?1:0)*U,tw='#F1EDE4';
    if(side){R(-1.5*U,top+7*U,3.5*U,4*U,skin);R(-1.5*U,top+6.4*U,3.5*U,1.2*U,cMul(coat,.8))}
    else{R(-bw/2-3*U,top+7*U,3*U,4*U,skin);R(bw/2,top+7*U,3*U,4*U,skin);R(-bw/2-3*U,top+6.4*U,3*U,1.2*U,cMul(coat,.8));R(bw/2,top+6.4*U,3*U,1.2*U,cMul(coat,.7))}
    if(back){R(-bw/2+1*U+tsw,top-1.2*U,3*U,7*U,tw);R(-bw/2+1*U+tsw,top+4.8*U,3*U,1*U,'#CFC8B8')}
    else if(side){const tx=-f*(bw/2-1*U)-(f>0?3:0)*U+(-f)*tsw;R(tx,top-1.2*U,3*U,7*U,tw);R(tx,top+4.8*U,3*U,1*U,'#CFC8B8');R(-f*.5*U-1.5*U,top-1.6*U,3*U,1.6*U,tw)}   // towel 3 x 6 U on the shoulder
    else{R(-bw/2-.6*U+tsw*.5,top-1.6*U,3*U,7*U,tw);R(-bw/2-.6*U+tsw*.5,top+4.4*U,3*U,1*U,'#CFC8B8');R(-bw/2+1.4*U,top+1*U,2*U,4*U,tw)}   // + 2 U tail on the chest
    if(!back){const gx=side?f*3*U:bw/2+1.5*U,gy=top+11*U+gl;R(gx-1.5*U,gy,3*U,4*U,'#BFD8E2');R(gx-1.5*U,gy,1*U,4*U,'#F1EDE4');R(gx-1.5*U,gy+2.6*U,3*U,1.4*U,'#E8A33D')}   // glass 3 x 4 U + 1 U highlight
    return}
  if(n.civ!=='crew')return;const T=n.T3,mir=back?-1:1;
  if(side&&!n.boss3){const ax=(o.as||0)+.25*U;if(n.tape14){g.fillStyle=cMul(T.s,.45);g.font='900 '+(4*U)+'px Impact,"Arial Black",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('14',ax,top+6*U);R(ax-2.2*U,top+5.2*U,4.4*U,2*U,'#E8E1CF')}
  }   // sleeve mark dropped in side view (review round 2)
  if(n.boss3){const fr=Math.floor(t/.35)%4,up=[0,4,8,4][fr]*U,rot=[-.5,.6,1.6,2.6][fr];
    if(back)return;                                                                       // back view ball: drawn over the throne in hook 4
    const bx=side?f*3*U:bw/2+1.5*U,by=top+9*U-up;R(bx-1.5*U,top+9.5*U,3*U,3.5*U,skin);ch3Ball(g,bx,by,U,rot,R,C,E,L,P);return}
  const sw=[0,2,0,-2][Math.floor(t/.5)%4]*U*(o.moving?0:1),hx=(side?f*6.5*U:(bw/2+3*U)*mir),hy=top+16.5*U;   // helmet in the hand (other hand from behind)
  L(side?f*2*U:(bw/2+1.5*U)*mir,top+12.5*U,hx-(side?f:mir)*.6*U+sw,hy-2.6*U,1.2*U,'#C9D3D8');
  ch3Helmet(g,hx+sw,hy,U,T,side?f:mir,R,C,E,L,P);
  if(n.satchel){const sx=side?-f*(bw/2+1.5*U):-(bw/2+2.8*U)*mir,sy=top+11.5*U;R(sx-2.5*U,sy,5*U,4*U,'#7A5A3A');R(sx-2.5*U,sy,5*U,1.2*U,'#5C4430');R(sx-.5*U,sy+1.2*U,1*U,1*U,'#D8C7A0')}   // satchel 5 x 4 U hanging outside the left hip
  if(n.pennant){const px=side?-f*3*U:-(bw/2+1.5*U)*mir,py=top+12.5*U,dir=side?-f:-mir,ty=top-14*U;L(px,py+1.5*U,px,ty,2*U,'#5A3A22');P([px,ty,px+dir*6*U,ty+2.5*U,px,ty+5*U],T.s);R(px+(dir>0?.8:-2.4)*U,ty+1.8*U,1.6*U,1.4*U,T.a)}}   // pennant: 2 U pole up past the head, 6 x 5 U flag in the sleeve colour
/* hook 4 — after the head: Zero Day's headband + hair puff; captain seen from behind = throne over the body, forearm + ball above */
function ch3Post(g,n,U,o,D){const {R,C,E,L,P}=D;
  if(n.zd){const {hx,hy,hr,side,back,f}=o;
    if(back)C(hx,hy-6.4*U,2.4*U,n.hairC3);else if(side)C(hx-f*5.6*U,hy-4.4*U,2.4*U,n.hairC3);else C(hx,hy-7*U,2.2*U,n.hairC3);   // 4 U puff out the back/top
    R(hx-hr-.2*U,hy-3.6*U,hr*2+.4*U,2*U,'#E8458A');if(side)P([hx-f*(hr-.5*U),hy-3.6*U,hx-f*(hr+3*U),hy-2.4*U,hx-f*(hr+2.6*U),hy-.4*U,hx-f*(hr-.5*U),hy-1.6*U],'#E8458A')}   // 2 x 3 U tail                                          // 2 U headband
  if(n.civ!=='crew'||!n.boss3||!o.back)return;
  g.save();g.translate(0,o.bob-2*U);const bw0=n.bw3||15;ch3ThroneBack(g,n,U,D,bw0);
  g.strokeStyle=TH3.rim;g.lineWidth=1*U;g.beginPath();g.arc(o.hx,o.hy+2*U,o.hr+.5*U,1.05*Math.PI,cLum(n.hairC3||'#888')<.2||/Marla/.test(n.name3||'')?1.95*Math.PI:1.42*Math.PI);g.stroke();   // 1 U light rim (whole top for dark hair)
  const fr=Math.floor(o.t/.35)%4,up=[0,4,8,4][fr]*U,ax=-(o.hr+2)*U;
  R(ax-1.25*U,-37*U,2.5*U,5*U,n.slv3);R(ax-1.25*U,-37*U,.8*U,5*U,cMul(n.slv3,1.2));R(ax-1.25*U,-38.6*U,2.5*U,1.8*U,o.skin||'#c98a62');   // forearm + hand beside the head
  ch3Ball(g,ax,-40.6*U-up,U,[-.5,.6,1.6,2.6][fr],R,C,E,L,P);g.restore()}

/* ---- who gets what (by person id; everyone else is unchanged). Look only: names, talk, places, rosters untouched. ---- */
function ch3Roster(team,i){if(team==='street'){try{const k=['QB','RB','WR1','WR2','TE','OL1','OL2'][i],p=SAVE.starters[k];if(p)return [p.name,k.replace(/\d/,'')]}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
  const all=[].concat(typeof CREWS!=='undefined'?CREWS:[],typeof ROUTE_CREWS!=='undefined'?ROUTE_CREWS:[],typeof HB_CREWS!=='undefined'?HB_CREWS:[],typeof R2_CREWS!=='undefined'?R2_CREWS:[]);
  const c=all.find(x=>x.id===team);const r=c&&c.roster&&c.roster[i];return r?[r.name||r.n,r.pos]:['Player '+i,'WR']}
const CH3MAP={
 // captains (crew bosses): trophy throne + football
 hb_rita:['baitdogs',0,1],hb_deke:['longshore',0,1],hb_marla:['gantry',0,1],hb_bram:['closers',0,1],r2_mud:['dredgers',0,1],
 mo:['captain',0,1],pete:['cats',0,1],rusty:['kings',0,1],lou:['rollers',0,1],mack:['rats1',0,1],rat2:['rats2',0,1],
 // crew members standing in rooms
 hb_pete:['baitdogs','Pete "Ten-Ton" Okafor','OL'],hb_splinter:['longshore','"Splinter" Jim Doyle','TE'],hb_wick:['gantry',3],
 cat1:['cats',1],cat2:['cats',2],king1:['kings',1],king2:['kings',4],drift1:['rollers',2],drift2:['rollers',5],mate1:['street',1],
 // Eli's teammates (Street Kings jacket in the player's colours); signatures come from NAMEX3 (Riptide: taped 14 + satchel; Zero Day: headband + puff)
 hb_zd:['street','"Zero Day" Darnell Reyes','WR'],r2_zd:['street','"Zero Day" Darnell Reyes','WR'],r2_zdf:['street','"Zero Day" Darnell Reyes','WR'],
 hb_riptide:['street','"Riptide" Sterling','RB'],riptide_yard:['street','"Riptide" Sterling','RB'],r2_riptide:['street','"Riptide" Sterling','RB'],r2_ripf:['street','"Riptide" Sterling','RB'],
 hb_riptide_b:['closers','"Riptide" Sterling','RB'],
 // job fixes (one look per job in every town)
 hb_cadogan:{civ:'granny',ch3:1,noGull:1,coat3:'#7A5476'},hb_agnes:{civ:'granny',ch3:1,noGull:1,coat3:'#55606A'},r2_sela:{civ:'granny',ch3:1,noGull:1,coat3:'#5C6B4E'},
 hb_duke:{civ:'keeper',ch3:1},hb_cormac:{civ:'keeper',ch3:1},hb_marv:{civ:'keeper',ch3:1},r2_keep:{civ:'keeper',ch3:1},hb_dockhand:{civ:'keeper',ch3:1},
 owner:{civ:'keeper',ch3:1},bartender:{civ:'keeper',ch3:1},
 pharmacist:{civ:'clinic',ch3:1},manager:{civ:'coach',ch3:1},regular3:{civ:'coach',ch3:1},mate2:{civ:'kid',ch3:1},
 // review round 1, fix 9: Netrunners Arena fans off the crew hues (drawn style, colours no crew uses)
 fan1:{civ:'fan',ch3:1,coat3:'#B08A8F'},fan2:{civ:'fan',ch3:1,coat3:'#7A8F4A',acc3:'#D5C3A1'}
};
const NUDGE3={hb_rita:-.75,hb_zd:-.85};   // draw offset in tiles: Rita's throne off the Gillnet desk, Zero Day off Riptide in the Boat Shed
function ch3Rec(n){const r=ch3Rec0(n);if(r&&NUDGE3[n.id]!=null)r.rx=n.x+NUDGE3[n.id];return r}
function ch3Rec0(n){const m=CH3MAP[n.id];if(!m)return null;if(!Array.isArray(m))return m;
  let [team,a,b,boss,extra]=m;let name,pos;if(typeof a==='number'){[name,pos]=ch3Roster(team,a);boss=b;if(team==='street')for(let k=1;k<7&&/Zero Day|Riptide/.test(name);k++)[name,pos]=ch3Roster(team,(a+k-1)%6+1)}else{name=a;pos=b}
  return ch3Crew(team,name,pos,boss,extra)}
let CH3ON=true;try{CH3ON=localStorage.getItem('cf_ch3')!=='0'}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
/* v3.39T roll-out step E1 done: every area (Hale Harbor, ferry deck, Gull's Reach + rooms, Vapor City + rooms + arena, Spillway).
   One look per character everywhere; only people listed in CH3MAP change. Return false here for an id to keep its classic look. */
const CH3AREA=id=>true;
function ch3Proxy(n){if(!CH3ON||!CH3AREA(n.id||''))return null;if(n._p3===undefined){const r=ch3Rec(n);n._p3=r?Object.assign(Object.create(n),r):null}return n._p3}

window.CH3SET=v=>{CH3ON=v};
/* ---------- CIV4: townsperson types that had NO look yet (CF_85 step C, look sheet CF_104 round 3, APPROVED 2026-11-22). On TEST from v3.40T. ----------
   Same approved drawn style (civ3 v10 + chars3): one signature shape per type that shows in front, side and back views; one outline;
   light from the upper left; two eye dots; max 4 colours + skin. Vapor City is the neon town, so its neon props are the LIGHTS of
   these figures and glow in their own neon colour (like the harbor lanterns glow amber); nothing else glows.
   Types: Mouse (story), Usher (story, arena dungeon), Granny Volt (elder + neon umbrella), Street Busker (keytar), Noodle Vendor (bowl),
   Gate Guard (city security: helmet + neon baton), Hologram Dancer, Hacker, Tech Vendor.
   Drawing goes through owCiv3 via the chars3 hooks (ch3Body / ch3Hand / ch3Post); glows go under the figure (not outlined). */
const NEON4={pink:'#ff2fa8',cyan:'#27e0ff',green:'#58ffb0',orange:'#ff7a1a',yellow:'#ffd23a',purple:'#9b5cff',red:'#ff3b5c'};
Object.assign(CIV3,{
 mouse4:{coats:['#E0418F'],pants:['#2A2540'],acc:'#ff2fa8',kid:1,ws:[13],hair:'short',hairC:'#2a1a20'},
 usher4:{coats:['#3B2A52'],pants:['#1E1830'],acc:'#ffd23a',ws:[15],hair:'short',hairC:'#1a1410',beard:0},
 busker4:{coats:['#3A5A8A','#2F4E7A','#45689A'],pants:['#1A1A26'],acc:'#ff7a1a',hat:'beanieP',beard:3},
 noodle4:{coats:['#2A2F3A','#30343F','#262B35'],pants:['#1A1D26'],acc:'#ff3b5c',hair:'short',beard:3},
 sec4:{coats:['#1B2430','#22303C','#1F2A36'],pants:['#10161E'],acc:'#27e0ff',w:17,hair:'bald',beard:3},
 dancer4:{coats:['#7E4FD8'],pants:['#4A2F8A'],acc:'#ff2fa8',fem:1,long:1,hem:21,hemUp:7,hair:'bun',hairC:'#ff2fa8'},
 hacker4:{coats:['#1F3A30','#223D33','#1C3329'],pants:['#10161E'],acc:'#58ffb0',hair:'short',beard:3},
 tech4:{coats:['#2A2F3A'],pants:['#14182A'],acc:'#27e0ff',fem:1,hair:'tail',hairC:'#14110f',apron:'#3FBF8A'}
});
const C4={mouse4:1,usher4:1,busker4:1,noodle4:1,sec4:1,dancer4:1,hacker4:1,tech4:1};
function c4Fr(t,step,n){return Math.floor((t||0)/step)%n}
/* hood with a face opening (Mouse, Hacker); drawn after the head */
function c4Hood(g,D,U,hx,hy,hr,coat,trim,side,back,f){const {R,C,P}=D,r=hr+1.3*U;
  g.fillStyle=coat;
  if(back){C(hx,hy-.3*U,r,coat);P([hx-r*.8,hy+2*U,hx+r*.8,hy+2*U,hx+3*U,hy+r+1.5*U,hx-3*U,hy+r+1.5*U],cMul(coat,.9));return}
  g.beginPath();g.arc(hx,hy-.4*U,r,Math.PI*1.0,Math.PI*2.0);g.fill();
  if(side){g.save();g.beginPath();g.rect(f>0?hx-r-2*U:hx-1.2*U,hy-r-2*U,r+3.2*U,2*r+4*U);g.clip();C(hx-f*1*U,hy+.6*U,r,coat);g.restore();
    P([hx-f*2*U,hy+3*U,hx-f*(r+.6*U),hy+4*U,hx-f*3*U,hy+r+1.6*U],cMul(coat,.85));
    g.strokeStyle=trim;g.lineWidth=1.3*U;g.beginPath();g.moveTo(hx-f*1.2*U,hy-r+.2*U);g.quadraticCurveTo(hx+f*1.6*U,hy-r+.6*U,hx+f*1.4*U,hy-2.4*U);g.stroke();return}
  R(hx-r,hy-1*U,2.4*U,6.5*U,coat);R(hx+r-2.4*U,hy-1*U,2.4*U,6.5*U,cMul(coat,.8));
  g.strokeStyle=trim;g.lineWidth=1.3*U;g.beginPath();g.arc(hx,hy,hr-.1*U,Math.PI*1.04,Math.PI*1.96);g.stroke()}
/* ---- glows under the figure (live, not outlined): only the neon props ---- */
function c4Glow(g,x,y,r,col,a){const n=parseInt(col.slice(1),16),rgb=(n>>16)+','+(n>>8&255)+','+(n&255),gr=g.createRadialGradient(x,y,0,x,y,r);
  gr.addColorStop(0,'rgba('+rgb+','+a+')');gr.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function c4Under(g,dir,n,tm){const kind=n.civ,K=CIV3[kind];if(!K||!(C4[kind]||n.volt))return;
  const h=n.seed3!=null?n.seed3>>>0:((n.x*13+n.y*7+kind.length*3)|0)>>>0,U=OWT/36*(K.kid?.86:1)*[.97,1,1.04][h%3];
  const side=dir==='l'||dir==='r',back=dir==='u',f=dir==='l'?-1:1,t=tm||0,sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-6,top=-26*U,hy=top-6*U;
  g.save();g.translate(sx,sy);
  if(kind==='mouse4'){const up=c4Fr(t,.6,4)===2?2*U:0;c4Glow(g,side?f*6.5*U:8*U,top+11*U-up,(back?3:4.5)*U,NEON4.cyan,back?.25:.40)}
  if(kind==='usher4'){const a=[-.15,0,.15,0][c4Fr(t,.5,4)];const bx=side?f*1.5*U:9*U,ang=side?(f>0?-.9:-Math.PI+.9):-1.05+a,L=13*U;c4Glow(g,bx+Math.cos(ang)*L,top+12.5*U+Math.sin(ang)*L,7*U,NEON4.pink,.34)}
  if(n.volt){c4Glow(g,side?-f*1*U:-2*U,hy-9*U,17*U,NEON4.pink,.20)}
  if(kind==='busker4'&&!back){c4Glow(g,side?f*10*U:-1*U,top+(side?12:11)*U,5*U,NEON4.orange,.34)}
  if(kind==='noodle4'&&!back){const bx=side?f*9*U:12*U,by=top+8*U;for(let k=0;k<3;k++){const q=((t*.55+k/3)%1);g.fillStyle='rgba(242,239,230,'+(.55*(1-q)).toFixed(3)+')';g.beginPath();g.arc(bx+Math.sin(q*6+k)*1.6*U,by-q*13*U,(1.6+q*2.2)*U,0,7);g.fill()}}   // steam (not a light: no glow, just drawn live so it is not outlined)
  if(kind==='noodle4'&&back){const bx=12*U,by=top+8*U;for(let k=0;k<3;k++){const q=((t*.55+k/3)%1);g.fillStyle='rgba(242,239,230,'+(.32*(1-q)).toFixed(3)+')';g.beginPath();g.arc(bx+Math.sin(q*6+k)*1.6*U,by-q*13*U,(1.3+q*1.8)*U,0,7);g.fill()}}
  if(kind==='sec4'){c4Glow(g,side?f*4.5*U:11.5*U,top+3*U,9*U,NEON4.cyan,.30);if(!back)c4Glow(g,side?f*2*U:0,hy-2*U,6*U,NEON4.cyan,.25)}
  if(kind==='dancer4'){g.save();g.scale(1,.32);c4Glow(g,0,0,15*U,NEON4.cyan,.55);g.restore();g.strokeStyle='rgba(39,224,255,.9)';g.lineWidth=1*U;g.beginPath();g.ellipse(0,.3*U,10*U,3*U,0,0,7);g.stroke();
    g.fillStyle='rgba(39,224,255,.10)';g.beginPath();g.moveTo(-10*U,0);g.lineTo(-7*U,hy-6*U);g.lineTo(7*U,hy-6*U);g.lineTo(10*U,0);g.fill()}   // projector disc + faint light cone
  if(kind==='hacker4'){c4Glow(g,side?f*9*U:back?11*U:12*U,top+9*U,10*U,NEON4.green,.30)}
  if(kind==='tech4'){c4Glow(g,side?f*6*U:back?9*U:10.5*U,top-1*U,6*U,NEON4.cyan,.38)}
  g.restore()}
/* ---- hook 2: details on the body ---- */
function c4Body(g,n,U,o,D){const {R,C,E,L,P}=D,{bw,top,hemW,hemY,side,back,f,coat}=o,k=n.civ,K=CIV3[k];
  if(k==='usher4'){const gd=NEON4.yellow,pk=NEON4.pink;R(-hemW/2,hemY-1.6*U,hemW,1.6*U,pk);   // pink piping at the hem
    if(back){R(-bw/2,top+1*U,bw,2*U,pk);P([-4*U,top+3*U,4*U,top+3*U,0,top+9*U],pk);P([-2.4*U,top+3*U,2.4*U,top+3*U,0,top+6.6*U],coat);return}   // pink yoke with a V
    if(side){for(const yy of [4,8,12])C(f*2.4*U,top+yy*U,.9*U,gd);return}
    for(const yy of [4,8,12]){C(-2.6*U,top+yy*U,.9*U,gd);C(2.6*U,top+yy*U,.9*U,gd)};R(-4*U,top-1*U,8*U,2*U,pk);return}
  if(k==='busker4'){if(!back&&!side){g.strokeStyle='#14110f';g.lineWidth=1.6*U;g.beginPath();g.moveTo(-bw/2+1.5*U,top+.5*U);g.lineTo(bw/2-1*U,top+12*U);g.stroke()}
    if(back){g.strokeStyle='#14110f';g.lineWidth=1.6*U;g.beginPath();g.moveTo(bw/2-1.5*U,top+.5*U);g.lineTo(-bw/2+1*U,top+12*U);g.stroke()}return}
  if(k==='noodle4'){const ap='#F2EFE6';if(back){R(-bw/2,top+8.5*U,bw,1.4*U,ap);P([0,top+9.2*U,-3.5*U,top+7.8*U,-3.5*U,top+10.8*U],ap);P([0,top+9.2*U,3.5*U,top+7.8*U,3.5*U,top+10.8*U],cMul(ap,.85));R(-hemW/2-.5*U,hemY-5*U,2*U,5*U,ap);R(hemW/2-1.5*U,hemY-5*U,2*U,5*U,ap);return}
    if(side){R(f>0?0:-5*U,top+5*U,5*U,hemY-top-5*U+3*U,ap);return}
    P([-4.5*U,top+5*U,4.5*U,top+5*U,6*U,hemY+3*U,-6*U,hemY+3*U],ap);P([1.5*U,top+5*U,4.5*U,top+5*U,6*U,hemY+3*U,3*U,hemY+3*U],cMul(ap,.85));R(-6*U,hemY+1.2*U,12*U,1.8*U,NEON4.red);return}   // apron + red hem stripe
  if(k==='sec4'){const cy=NEON4.cyan,pl='#3A4656';
    R(-bw/2-2*U,top-1.2*U,6*U,4.4*U,pl);R(bw/2-4*U,top-1.2*U,6*U,4.4*U,cMul(pl,.8));R(-bw/2-2*U,top-1.2*U,6*U,.8*U,'#8794A3');R(bw/2-4*U,top-1.2*U,6*U,.8*U,'#8794A3');   // armour pads 2 U past the shoulders
    if(back){R(-5*U,top+1.5*U,10*U,11*U,pl);R(-1.5*U,top+2*U,3*U,10*U,cy);R(-bw/2-2*U,top-1.2*U,bw+4*U,.8*U,'#8794A3');return}   // back plate + 2 x 8 U reflective stripe (no glow)
    if(side){R(f>0?-1*U:-3*U,top+6*U,4*U,1.4*U,cy);return}
    R(-bw/2+3*U,top+7*U,bw-6*U,1.6*U,cy);R(-3*U,top+11*U,6*U,3*U,pl);return}   // chest light strip + belt plate
  if(k==='dancer4'){g.save();g.globalAlpha=.32;for(let yy=top+2*U;yy<hemY-1*U;yy+=3*U){const w=bw+(hemW-bw)*(yy-top)/(hemY-top)-1*U;R(-w/2,yy,w,.7*U,'#B79CF0')}g.restore();   // hologram scan lines
    R(-hemW/2-1*U,hemY-1.6*U,hemW+2*U,1.6*U,NEON4.pink);if(!side)R(-bw/2+.5*U,top+5*U,bw-1*U,1.4*U,NEON4.pink);return}
  if(k==='hacker4'){if(!back&&!side){R(-.5*U,top+2*U,1*U,hemY-top-4*U,cMul(coat,.7));R(-1.8*U,top+1*U,.8*U,6*U,NEON4.green);R(1*U,top+1*U,.8*U,6*U,NEON4.green)}   // zip + hood cords
    if(!side)R(-bw/2+2*U,hemY-6*U,bw-4*U,4*U,cMul(coat,.8));return}   // front pocket
  if(k==='tech4'){const ap=K.apron;if(back){R(-bw/2,top+8.5*U,bw,1.2*U,ap);R(-1.5*U,top+8*U,3*U,2*U,ap);return}   // apron tie
    if(side){R(f>0?0:-5*U,top+5*U,5*U,hemY-top-5*U,ap);return}
    P([-4.5*U,top+5*U,4.5*U,top+5*U,6*U,hemY,-6*U,hemY],ap);P([1.5*U,top+5*U,4.5*U,top+5*U,6*U,hemY,3*U,hemY],cMul(ap,.85));R(-6*U,hemY-2*U,12*U,2*U,NEON4.cyan);
    for(const [xx,c] of [[-3,'#8A93A8'],[-1.4,'#E8C53A'],[.4,'#8A93A8']])R(xx*U,top+8*U,.8*U,3.5*U,c);return}   // tools in the bib pocket
}
/* ---- hook 3: hand props ---- */
function c4Hand(g,n,U,o,D){const {R,C,E,L,P}=D,{bw,top,side,back,f,t,skin,coat}=o,k=n.civ;
  const hand=side?[f*1.5*U,top+12.5*U]:[bw/2+1.5*U,top+12.5*U];
  if(k==='mouse4'){const fr=c4Fr(t,.6,4),up=fr===2?2*U:0,lit=fr===1?'#BFF4FF':NEON4.cyan;
    if(back){R(bw/2-.5*U,top+9*U-up,2*U,4.5*U,'#14110f');R(bw/2+1*U,top+9.4*U-up,.8*U,3.6*U,lit);return}   // phone edge + screen light past the hip
    const px=side?f*6.5*U:bw/2+2.5*U,py=top+8.5*U-up;L(hand[0],hand[1],px,py+4*U,2.4*U,coat);R(px-1.8*U,py,3.6*U,5.2*U,'#14110f');R(px-1.2*U,py+.6*U,2.4*U,3.6*U,lit);R(px-.8*U,py+1.2*U,1.6*U,.5*U,'#14110f');R(px-.8*U,py+2.4*U,1*U,.5*U,'#14110f');return}
  if(k==='usher4'){const a=[-.15,0,.15,0][c4Fr(t,.5,4)],ang=side?(f>0?-.9:-Math.PI+.9):-1.05+a,bx=side?hand[0]:9*U,by=hand[1],c=Math.cos(ang),s=Math.sin(ang);
    L(bx,by,bx+c*4*U,by+s*4*U,2*U,'#2a2a2a');L(bx+c*4*U,by+s*4*U,bx+c*13*U,by+s*13*U,2.4*U,NEON4.pink);L(bx+c*4.6*U,by+s*4.6*U,bx+c*12.4*U,by+s*12.4*U,.9*U,'#FFD0EE');   // light wand: grip + glowing tube
    if(!back&&!side){const tx=-bw/2-4.5*U;R(tx,top+7.5*U,3*U,6*U,'#F4F1E8');R(tx,top+7.5*U,3*U,1*U,cMul('#F4F1E8',.82));R(tx+.5*U,top+13.5*U,2*U,3*U,'#F4F1E8');R(tx,top+10*U,3*U,.6*U,NEON4.pink)}   // paper ticket roll + 3 U tail
    return}
  if(k==='busker4'){const fr=c4Fr(t,.4,4),tilt=[-.22,-.28,-.22,-.16][fr];
    if(back){R(-bw/2-6*U,top+11*U,6*U,3.2*U,'#14110f');R(bw/2,top+8*U,5*U,3.2*U,'#14110f');R(-bw/2-7.5*U,top+10.4*U,2.4*U,4.4*U,'#14110f');L(-bw/2+1.5*U,top+12*U,-bw/2+.5*U,top+17*U,1.4*U,'#14110f');return}   // keytar ends past both sides + headstock
    if(side){g.save();g.translate(f*1*U,top+12*U);g.rotate(f*-.12);const x0=f>0?0:-18*U;R(x0,-1.5*U,18*U,3*U,'#14110f');R(x0+(f>0?4:2)*U,-1.1*U,12*U,1.6*U,'#F2EFE6');for(let q=0;q<5;q++)R(x0+(f>0?4:2)*U+q*3*U,-1.1*U,.5*U,1.6*U,'#14110f');R(x0+(f>0?4+[1,2,3,2][fr]*3:2+[3,2,1,2][fr]*3)*U,-1.1*U,2.5*U,1.6*U,NEON4.orange);R(f>0?17*U:-20*U,-2.6*U,3*U,5.2*U,'#14110f');g.restore();return}
    g.save();g.translate(0,top+12*U);g.rotate(tilt);R(-12*U,-2.6*U,22*U,5.2*U,'#14110f');R(-12*U,-2.6*U,22*U,.8*U,'#3A3E48');
    R(-8*U,-1.4*U,14*U,2.4*U,'#F2EFE6');for(let q=0;q<7;q++)R((-8+q*2)*U,-1.4*U,.5*U,2.4*U,'#14110f');R((-8+[1,3,5,3][fr]*2)*U,-1.4*U,1.6*U,2.4*U,NEON4.orange);   // keys, the lit one moves
    R(-18*U,-1*U,6.5*U,2*U,'#14110f');R(-20*U,-2*U,2.6*U,4*U,'#14110f');R(7*U,-1.8*U,2.4*U,1.4*U,NEON4.orange);g.restore();return}   // neck + headstock to the left, light at the body end
  if(k==='noodle4'){const fr=c4Fr(t,.5,4),lift=(fr===1||fr===2?2*U:0);
    if(back){g.fillStyle='#F2EFE6';g.beginPath();g.arc(bw/2+3*U,top+9*U,4.5*U,0,Math.PI);g.fill();R(bw/2-1.5*U,top+9*U,9*U,1*U,NEON4.red);L(bw/2+4*U,top+9*U-lift,bw/2+6*U,top+.5*U-lift,.8*U,'#8a5a2a');return}   // bowl edge past the hip + chopstick tips
    const bx=side?f*9.5*U:bw/2+5*U,by=top+9*U;L(hand[0],hand[1],bx-(side?f:1)*2*U,by+2*U,2.4*U,coat);
    g.fillStyle='#F2EFE6';g.beginPath();g.arc(bx,by,5.6*U,0,Math.PI);g.fill();R(bx-5.6*U,by,11.2*U,1.3*U,'#FF2D55');E(bx,by-.2*U,4.9*U,1.1*U,'#E8C53A');   // bowl, red rim, noodles
    L(bx-1*U,by-1*U-lift,bx+1*U,by-10*U-lift,.8*U,'#8a5a2a');L(bx+.6*U,by-1*U-lift,bx+3*U,by-9.6*U-lift,.8*U,'#8a5a2a');if(lift){g.strokeStyle='#E8C53A';g.lineWidth=.6*U;g.beginPath();g.moveTo(bx,by-1*U);g.quadraticCurveTo(bx+.4*U,by-4*U,bx+.2*U,by-3*U-lift);g.stroke()}return}
  if(k==='sec4'){const fr=c4Fr(t,.6,4),sw=[0,1.5,0,-1.5][fr]*U,bx=side?hand[0]:hand[0],by=hand[1],tx=bx+(side?f:1)*1*U+sw,ty=top-5*U;
    L(bx,by,bx+(tx-bx)*.25,by+(ty-by)*.25,2.2*U,'#2a2a2a');L(bx+(tx-bx)*.25,by+(ty-by)*.25,tx,ty,2.2*U,NEON4.cyan);L(bx+(tx-bx)*.3,by+(ty-by)*.3,tx,ty,.8*U,'#DFFBFF');return}   // neon baton held up and out
  if(k==='hacker4'){const fr=c4Fr(t,.35,4);
    if(back){const x0=bw/2-1*U,y0=top+5*U;R(x0,y0,8*U,6.5*U,NEON4.green);for(let q=0;q<3;q++)R(x0+1*U,y0+(1+((q*2+fr)%5))*U,[5,3,4][q]*U,.6*U,'#10301F');R(x0-1*U,y0+6.5*U,10*U,1.6*U,'#3A3E48');return}   // the screen, seen past his side
    if(side){R(f>0?2*U:-12*U,top+11*U,10*U,1.6*U,'#3A3E48');g.save();g.translate(f*12*U,top+11*U);g.rotate(f*-.35);R(f>0?-1.4*U:0,-8*U,1.4*U,8*U,'#3A3E48');g.restore();R(f>0?3*U:-11*U,top+10*U,8*U,1*U,NEON4.green);return}
    const x0=bw/2-2*U,y0=top+5*U;R(x0,y0,10*U,7*U,'#3A3E48');R(x0,y0,10*U,.8*U,cMul('#3A3E48',1.4));C(x0+5*U,y0+3.4*U,1.2*U,NEON4.green);R(x0-1*U,y0+7*U,12*U,1.6*U,'#2A2E36');R(x0+.5*U,y0-.6*U,9*U,.6*U,[NEON4.green,'#BFFFE0',NEON4.green,'#BFFFE0'][fr]);return}   // laptop lid back + logo, green spill on top
  if(k==='dancer4'){const fr=c4Fr(t,.45,4),wv=[0,1,0,-1][fr]*U,c=n.coat3||coat;
    if(side){L(f*.5*U,top+3.5*U,f*5.5*U,top-4*U,3*U,cMul(c,.85));L(f*5.5*U,top-4*U,f*7.5*U+wv,top-13*U,2.6*U,cMul(c,.85));C(f*7.6*U+wv,top-14*U,1.6*U,skin)}
    else{const sx=bw/2+3.6*U,sy=top-6.6*U;L(sx,sy,sx+1.2*U+wv,top-15*U,3*U,cMul(c,.85));C(sx+1.3*U+wv,top-16*U,1.6*U,skin)}
    return}
  if(k==='tech4'){const fr=c4Fr(t,.5,4),rot=[0,.5,0,-.5][fr],cx=side?f*6*U:bw/2+3.5*U,cy=top-1*U;
    L(hand[0],hand[1],cx-(side?f:1)*1*U,cy+3*U,2.4*U,coat);L(cx-(side?f:1)*1*U,cy+3*U,cx,cy+.6*U,.7*U,'#C9D3D8');
    g.save();g.translate(cx,cy);g.rotate(rot);R(-2*U,-2.5*U,4*U,5*U,'#10161E');R(-1.3*U,-1.8*U,2.6*U,3.6*U,NEON4.cyan);for(const yy of [-1.6,-.2,1.2]){R(-2.6*U,yy*U,.6*U,.6*U,'#8A93A8');R(2*U,yy*U,.6*U,.6*U,'#8A93A8')}g.restore();return}   // 4 x 5 U data chip in tweezers
}
/* ---- hook 4: after the head: hoods, ears, caps, helmets, headbands, the umbrella, the hologram glitch ---- */
function c4Post(g,n,U,o,D){const {R,C,E,L,P}=D,{hx,hy,hr,side,back,f,t,bw,top}=o,k=n.civ;
  if(k==='mouse4'){const coat=n.coat3||CIV3.mouse4.coats[0];c4Hood(g,D,U,hx,hy,hr,coat,'#FFB8DE',side,back,f);
    const ear=(x,y)=>{C(x,y,3.3*U,coat);if(!back&&!side)C(x,y+.3*U,1.7*U,'#FFB8DE')};
    if(side){C(hx-f*3.2*U,hy-9.6*U,2.6*U,coat);C(hx-f*3*U,hy-9.4*U,1.4*U,'#FFB8DE');R(hx-f*3.2*U-1.1*U,hy-7.6*U,2.2*U,1.3*U,coat)}else{ear(hx-5.4*U,hy-7.4*U);ear(hx+5.4*U,hy-7.4*U)}
    if(back)R(hx-.5*U,hy-hr,1*U,2*hr+1*U,'#C23A8C');return}   // round mouse ears on the hood
  if(k==='hacker4'){const coat=n.coat3||o.coat||CIV3.hacker4.coats[0],fr=c4Fr(t,.35,8);c4Hood(g,D,U,hx,hy,hr,coat,NEON4.green,side,back,f);
    const lens=fr===5?'#BFFFE0':NEON4.green;
    if(back){R(hx-hr-.6*U,hy-5*U,2*hr+1.2*U,1.2*U,'#14110f');return}   // only the goggle strap from behind
    if(side){R(hx-f*hr,hy-5.6*U,f*(2*hr+1*U),1.2*U,'#14110f');C(hx+f*(hr-.4*U),hy-4.8*U,2.2*U,'#14110f');C(hx+f*(hr-.4*U),hy-4.8*U,1.4*U,lens);return}
    R(hx-6*U,hy-5.6*U,12*U,1.2*U,'#14110f');for(const s of [-1,1]){C(hx+s*2.6*U,hy-5*U,2.3*U,'#14110f');C(hx+s*2.6*U,hy-5*U,1.5*U,lens)}return}   // goggles pushed up on the hood
  if(k==='usher4'){const cap='#3B2A52',x=hx+(side?-f*.5*U:0);R(x-5.2*U,hy-10.4*U,10.4*U,4.6*U,cap);R(x-5.2*U,hy-10.4*U,10.4*U,.8*U,cMul(cap,1.4));R(x-5.2*U,hy-7*U,10.4*U,1.2*U,NEON4.yellow);   // pillbox cap with a gold band
    for(const s of (side?[-f]:[-1,1])){R(s>0?bw/2-1*U:-bw/2-2*U,top-.8*U,3*U,2*U,NEON4.yellow);for(let q=0;q<3;q++)R((s>0?bw/2-1*U:-bw/2-2*U)+q*1.1*U,top+1.2*U,.6*U,2*U,NEON4.yellow)}   // gold epaulettes with fringe
    return}
  if(k==='sec4'){const hc='#10161E',fr=c4Fr(t,.4,6),x=hx;g.fillStyle=hc;g.beginPath();g.arc(x,hy-.8*U,hr+1*U,Math.PI,0);g.fill();R(x-hr-1*U,hy-1*U,2*U,5*U,hc);R(x+hr-1*U,hy-1*U,2*U,5*U,cMul(hc,1.2));
    C(x+(side?-f*2:0)*U,hy-hr-1.2*U,1.2*U,'#3A4656');R(x-.5*U+(side?-f*2:0)*U,hy-hr-4*U,1*U,3*U,'#3A4656');   // helmet + short antenna
    if(back){C(x,hy,hr+.4*U,hc);R(x-hr,hy-2*U,2*hr,1.6*U,'#3A4656');R(x-1*U,hy-1.8*U,2*U,1.2*U,NEON4.cyan);return}
    const vx=side?x+f*1.5*U:x,vh=(side?3:2)*U;R(vx-(side?3.5:5.5)*U,hy-1.2*U-vh,(side?7:11)*U,vh,NEON4.cyan);R(vx-(side?3.5:5.5)*U+[0,2,4,6,4,2][fr]*U*(side?.5:1),hy-1.2*U-vh,1.6*U,vh,'#DFFBFF');return}   // visor light above the eyes, a bright spot scans across
  if(k==='noodle4'){const rd='#FF2D55';R(hx-hr-.2*U,hy-3.4*U,2*hr+.4*U,2*U,rd);R(hx-hr-.2*U,hy-1.4*U,2*hr+.4*U,.6*U,'#14110f');
    if(back){R(hx-1*U,hy-3.6*U,2*U,2.4*U,'#E8344E');R(hx-1*U,hy-1.4*U,1*U,4*U,'#E8344E');R(hx,hy-1.4*U,1*U,4.4*U,cMul('#E8344E',.85))}   // plain 2 U knot + two 1 x 4 U tails
    else if(side){P([hx-f*(hr-.4*U),hy-3*U,hx-f*(hr+3.4*U),hy-.6*U,hx-f*(hr+2.6*U),hy+1*U,hx-f*(hr-.4*U),hy-1.6*U],rd)}
    else R(hx+hr-1.2*U,hy-3*U,1.6*U,4*U,rd);return}
  if(k==='dancer4'){const fr=c4Fr(t,.45,4);if(fr===3){g.save();g.beginPath();g.rect(-20*U,top+6*U,40*U,3*U);g.clip();g.translate(2.5*U,0);R(-bw/2,top+6*U,bw,3*U,o.coat||CIV3.dancer4.coats[0]);R(-bw/2,top+6*U,bw,.7*U,'#B79CF0');g.restore();R(-bw/2-3*U,top+8.6*U,bw+6*U,.5*U,'#B79CF0')}   // glitch: a slice of her slips 2.5 U
    return}
  if(k==='tech4'){const fr=c4Fr(t,.5,4),tl=(fr===1||fr===2?-2:0)*U,band='#8A93A8',cy=NEON4.cyan;R(hx-hr-.2*U,hy-5*U,2*hr+.4*U,2*U,band);   // 2 U loupe headband
    if(back){R(hx-1.6*U,hy-3*U,1*U,3.5*U,band);R(hx+.6*U,hy-3*U,1*U,3*U,band)}   // band tails from behind
    const sx2=side?f:1,ax=hx+sx2*hr,lx=hx+sx2*(hr+5*U),ly=hy-3.6*U+tl;L(ax-sx2*.5*U,hy-4*U,lx-sx2*3.6*U,ly,1.5*U,band);   // swing-out arm: lens 4+ U past the head outline
    g.strokeStyle=cy;g.lineWidth=1*U;g.beginPath();g.arc(lx,ly,4*U,0,7);g.stroke();if(!back){g.fillStyle='rgba(39,224,255,.30)';g.beginPath();g.arc(lx,ly,3.1*U,0,7);g.fill();C(lx-1*U,ly-1*U,.7*U,'#F2FFFF')}else{g.fillStyle='#1E2A34';g.beginPath();g.arc(lx,ly,3.1*U,0,7);g.fill()}
    const tx=side?-sx2*(bw/2+.5*U):-bw/2-1.5*U;R(tx,top-2*U,3*U,6*U,band);R(tx+.6*U,top-3.6*U,.6*U,1.8*U,'#E8C53A');R(tx+1.8*U,top-3.2*U,.6*U,1.4*U,'#E8C53A');   // tool roll 3 x 6 U on the shoulder, pens sticking up
    return}
  if(n.volt){const fr=c4Fr(t,.55,4),sw=[0,1,0,-1][fr]*U,hx2=side?-f*5*U:back?bw/2+1.5*U:-bw/2-1.5*U,hy2=top+12.5*U,cx=hx2+(side?f*1*U:back?-1.5*U:1.5*U)+sw,cy=hy-8*U,r=12*U;
    L(hx2,hy2,cx,cy-r*.6,1*U,'#14110f');if(side)L(f*1.5*U,top+12*U,hx2,hy2,2.2*U,cMul(n.coat3||'#6A3A8A',.85));g.fillStyle='#2A1F3D';g.beginPath();g.moveTo(cx-r,cy+1*U);g.bezierCurveTo(cx-r,cy-r*.95,cx+r,cy-r*.95,cx+r,cy+1*U);g.closePath();g.fill();
    g.strokeStyle='#3A2E4E';g.lineWidth=.6*U;for(const q of [-.55,0,.55]){g.beginPath();g.moveTo(cx,cy-r*.7);g.lineTo(cx+q*r,cy+1*U);g.stroke()}
    g.strokeStyle=NEON4.pink;g.lineWidth=1.4*U;g.beginPath();g.moveTo(cx-r,cy+1*U);g.bezierCurveTo(cx-r,cy-r*.95,cx+r,cy-r*.95,cx+r,cy+1*U);g.stroke();for(const q of [-1,-.45,.1,.65,1])C(cx+q*r*.98,cy+1.4*U,.8*U,NEON4.pink);   // neon rim + scallops
    R(cx-.5*U,cy-r*.72-2.4*U,1*U,2.6*U,'#14110f');g.strokeStyle='#14110f';g.lineWidth=1*U;g.beginPath();g.arc(hx2+(side?f:1)*1.2*U,hy2+1.4*U,1.2*U,0,Math.PI);g.stroke();   // tip + crook handle
    for(const [q,ph] of [[-.95,0],[.9,2]]){const d=((fr+ph)%4)*2.4*U;C(cx+q*r,cy+2.6*U+d,.75*U,'#9FE8FF')}}   // drips falling off the rim
}
/* chain into the chars3 hooks (owCiv3 calls these when n.ch3 is set) */
{const _b=ch3Body,_h=ch3Hand,_p=ch3Post;
 ch3Body=function(g,n,U,o,D){if(C4[n.civ])return c4Body(g,n,U,o,D);return _b(g,n,U,o,D)};
 ch3Hand=function(g,n,U,o,D){if(C4[n.civ])return c4Hand(g,n,U,Object.assign({},o),D);return _h(g,n,U,o,D)};
 ch3Post=function(g,n,U,o,D){if(C4[n.civ]||n.volt){c4Post(g,n,U,o,D);if(!C4[n.civ])return _p(g,n,U,o,D);return}return _p(g,n,U,o,D)};
 const _d=owCiv3Draw;owCiv3Draw=function(x,y,dir,moving,n,tm,ph){try{c4Under(og,dir,n,tm)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}return _d(x,y,dir,moving,n,tm,ph)}}
/* who gets what (by person id). Look only. The last three are the agreed reuse fixes (they borrowed another type's figure). */
Object.assign(CH3MAP,{
 mouse:{civ:'mouse4',ch3:1},usher:{civ:'usher4',ch3:1},granny:{civ:'granny',ch3:1,noGull:1,coat3:'#6A3A8A',volt:1},
 busker:{civ:'busker4',ch3:1},vendor:{civ:'noodle4',ch3:1},gateS:{civ:'sec4',ch3:1},gateE:{civ:'sec4',ch3:1},
 regular2:{civ:'dancer4',ch3:1},hacker:{civ:'hacker4',ch3:1},techgirl:{civ:'tech4',ch3:1},
 gamer2:{civ:'kid',ch3:1},driverB:{civ:'fan',ch3:1},shopper2:{civ:'fan',ch3:1}
});


function ch3Lab(){const b=document.getElementById('mCH');if(b)b.textContent='CHARACTERS: '+(CH3ON?'NEW (TEST)':'CLASSIC')}
setTimeout(()=>{const ro=document.getElementById('mRO');if(!ro||document.getElementById('mCH'))return;const b=document.createElement('button');b.className='btn';b.id='mCH';
  b.onclick=()=>{CH3ON=!CH3ON;try{localStorage.setItem('cf_ch3',CH3ON?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}ch3Lab()};((dev=>{if(dev){const row=document.createElement('div');row.className='ui-menu-setting';row.appendChild(b);dev.appendChild(row)}else ro.parentNode.appendChild(b)})(document.querySelector('.ui-menu-dev')));ch3Lab()},80);

function civ3Lab(){const b=document.getElementById('mCV');if(b)b.textContent='TOWNSFOLK: '+(CIV3ON?'NEW (TEST)':'CLASSIC')}
setTimeout(()=>{const ro=document.getElementById('mRO');if(!ro||document.getElementById('mCV'))return;const b=document.createElement('button');b.className='btn';b.id='mCV';
  b.onclick=()=>{CIV3ON=!CIV3ON;try{localStorage.setItem('cf_civ3',CIV3ON?'1':'0')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}civ3Lab()};((dev=>{if(dev){const row=document.createElement('div');row.className='ui-menu-setting';row.appendChild(b);dev.appendChild(row)}else ro.parentNode.appendChild(b)})(document.querySelector('.ui-menu-dev')));civ3Lab()},70);
function owCivOld(x,y,dir,moving,n,tm,ph){
  const kind=n.civ,P=Object.assign({},CIV[kind]||CIV.fan);
  if(n.hb)Object.assign(P,HB_CIV[kind]||HB_CIV.fan);
  if(kind==='fan'&&n.hb){P.body=HB_FANC[((n.x*7+n.y*3)|0)%HB_FANC.length];P.pants=['#26333C','#2b3036','#1f2a30'][(n.x+n.y)%3]}else if(kind==='fan'){P.body=CIV_FANC[((n.x*7+n.y*3)|0)%CIV_FANC.length];P.pants=['#1a2433','#241a2e','#10202a'][(n.x+n.y)%3]}
  const g=og,U=OWT/36*P.sc*[.95,1,1.07,.98,1.04][((n.x*3+n.y*5)|0)%5],sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-6,side=dir==='l'||dir==='r',back=dir==='u',f=dir==='l'?-1:1;
  const skin=['#e6b48a','#c98a62','#8a5a3a','#f0c8a0'][((n.x*5+n.y)|0)%4];
  const sw=moving?Math.sin(tm*11+ph*6):0,bob=moving?Math.abs(sw)*1.2*U:Math.sin(tm*2+n.x)*.4*U;
  g.save();g.translate(sx,sy);
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,1,9*U,3*U,0,0,7);g.fill();
  const legH=n.sit?5*U:P.long?6*U:11*U,bodyH=P.long?21*U:15*U,bw=(P.wide?17:side?10:13)*U;
  // legs
  g.fillStyle=P.pants;if(side){g.fillRect(-3*U+sw*3*U*f,-legH,4*U,legH);g.fillRect(0-sw*3*U*f,-legH,4*U,legH)}else{g.fillRect(-4.5*U,-legH+sw*U,4*U,legH);g.fillRect(.5*U,-legH-sw*U,4*U,legH)}
  g.fillStyle='#0a0c12';g.fillRect(-5*U,-2*U,10*U,2.4*U);
  g.translate(0,-bob);
  const top=-legH-bodyH;
  // pack on the back for the courier, keyboard for the busker drawn later
  if(P.pack&&(back||side)){g.fillStyle=P.pack;g.shadowColor=P.pack;g.shadowBlur=6;g.fillRect(side?-f*bw/2-5*U*(f>0?1:0)-(f<0?0:0):-5*U,top+2*U,side?5*U:10*U,10*U);g.shadowBlur=0}
  // body
  g.fillStyle=P.body;g.beginPath();g.moveTo(-bw/2,top+3*U);g.quadraticCurveTo(-bw/2,top,-bw/2+3*U,top);g.lineTo(bw/2-3*U,top);g.quadraticCurveTo(bw/2,top,bw/2,top+3*U);g.lineTo(P.long?bw/2+2*U:bw/2-1*U,top+bodyH);g.lineTo(P.long?-bw/2-2*U:-bw/2+1*U,top+bodyH);g.closePath();g.fill();
  if(P.stripes){g.fillStyle=P.stripes;for(let sx=-bw/2+1.6*U;sx<bw/2-1*U;sx+=4.4*U)g.fillRect(sx,top+1*U,2.4*U,bodyH-1*U)}g.fillStyle='rgba(255,255,255,.14)';g.fillRect(f>0?bw/2-3*U:-bw/2,top+2*U,3*U,bodyH-4*U);   // rim light from the neon
  g.fillStyle='rgba(0,0,0,.25)';g.fillRect(-bw/2,top+bodyH-3*U,bw,3*U);
  if(P.apron&&!back&&!side){g.fillStyle=P.apron;g.fillRect(-4.5*U,top+5*U,9*U,bodyH-5*U)}
  if(P.apron&&side){g.fillStyle=P.apron;g.fillRect(f>0?0:-5*U,top+5*U,5*U,bodyH-5*U)}
  if(P.helm||P.wide){g.fillStyle=P.trim;g.fillRect(-bw/2-1*U,top,3*U,4*U);g.fillRect(bw/2-2*U,top,3*U,4*U);g.fillStyle='rgba(39,224,255,.8)';g.fillRect(-bw/2+3*U,top+7*U,bw-6*U,1.6*U)}   // armor shoulder + chest light strip
  if(P.scarf&&!back){g.fillStyle=P.trim;g.fillRect(-4*U,top-1*U,8*U,3*U)}
  {const cv=((n.x*11+n.y*5+kind.length)|0)%5;   // per-person silhouette extras so no two civilians read the same
   if(cv===0&&!P.pack){g.strokeStyle=P.trim||'#888';g.lineWidth=1.6*U;g.beginPath();g.moveTo(-bw/2+1*U,top+2*U);g.lineTo(bw/2-1*U,top+bodyH-4*U);g.stroke();g.fillStyle='#10161e';g.fillRect(side?-f*bw/2-2*U:bw/2-5*U,top+bodyH-8*U,7*U,6*U)}   // shoulder bag
   else if(cv===1&&!P.pack){g.fillStyle='#10161e';if(back)g.fillRect(-5*U,top+1*U,10*U,11*U);else if(side)g.fillRect(-f*bw/2-(f>0?4:0)*U-(f<0?-1:0)*U,top+2*U,4*U,10*U);else{g.fillRect(-bw/2+1*U,top+1*U,2*U,9*U);g.fillRect(bw/2-3*U,top+1*U,2*U,9*U)}}   // backpack
   else if(cv===2){g.fillStyle=P.trim||'#556';g.fillRect(-bw/2-1*U,top-2*U,bw+2*U,3.5*U)}   // high collar
   else if(cv===3&&!P.long){g.fillStyle=P.body;g.beginPath();g.moveTo(-bw/2,top+bodyH-4*U);g.lineTo(-bw/2-3*U,top+bodyH+1*U);g.lineTo(bw/2+3*U,top+bodyH+1*U);g.lineTo(bw/2,top+bodyH-4*U);g.fill()}}   // flared coat hem
  // arms
  g.fillStyle=P.body;if(!side){g.fillRect(-bw/2-3*U,top+3*U,3*U,9*U);g.fillRect(bw/2,top+3*U,3*U,9*U)}else g.fillRect(-1.5*U,top+3*U,3.5*U,9*U);
  g.fillStyle=skin;if(!side){g.fillRect(-bw/2-3*U,top+11*U,3*U,2.5*U);g.fillRect(bw/2,top+11*U,3*U,2.5*U)}else g.fillRect(-1.5*U,top+11*U,3.5*U,2.5*U);
  // head
  const hy=top-6*U;
  g.fillStyle=skin;g.beginPath();g.arc(side?f*1*U:0,hy,6*U,0,7);g.fill();
  if(!back){g.fillStyle='#14110f';if(side){g.fillRect(f*4*U-1*U,hy-1.5*U,2*U,2*U)}else{g.fillRect(-3*U,hy-1*U,2*U,2*U);g.fillRect(1.2*U,hy-1*U,2*U,2*U)}}
  // hair / hood / hats
  const hairC=P.hair;g.fillStyle=hairC;
  if(P.hood){g.fillStyle=P.body;g.beginPath();g.arc(side?f*.5*U:0,hy-.5*U,7*U,Math.PI*1.05,Math.PI*1.95+(back?3.1:0));g.fill();if(back){g.beginPath();g.arc(0,hy,7*U,0,7);g.fill()}else{g.fillRect(-7*U,hy-1*U,2*U,6*U);g.fillRect(5*U,hy-1*U,2*U,6*U)}
    if(P.ears){g.beginPath();g.arc(-5*U,hy-7*U,2.6*U,0,7);g.arc(5*U,hy-7*U,2.6*U,0,7);g.fill()}}
  else if(P.helm){g.fillStyle='#10161e';g.beginPath();g.arc(side?f*1*U:0,hy-.5*U,6.8*U,Math.PI,0);g.fill();g.fillRect(-6.8*U+(side?f*1*U:0),hy-.5*U,13.6*U,back?6*U:2.2*U);if(!back){g.fillStyle='rgba(39,224,255,.9)';g.shadowColor='#27e0ff';g.shadowBlur=5;g.fillRect(-5*U+(side?f*1.5*U:0),hy-.2*U,10*U,2*U);g.shadowBlur=0}}
  else if(P.hat==='wide'){g.fillStyle='#2b2b3a';g.beginPath();g.ellipse(side?f*1*U:0,hy-3*U,10*U,3*U,0,0,7);g.fill();g.beginPath();g.arc(side?f*1*U:0,hy-4*U,5.5*U,Math.PI,0);g.fill()}
  else if(P.hat==='beanie'){g.fillStyle=P.trim;g.beginPath();g.arc(side?f*1*U:0,hy-1*U,6.4*U,Math.PI,0);g.fill();g.fillRect(-6.4*U+(side?f*1*U:0),hy-2*U,12.8*U,2.5*U)}
  else if(P.hat==='cap'){g.fillStyle=P.body;g.beginPath();g.arc(side?f*1*U:0,hy-1*U,6.3*U,Math.PI,0);g.fill();if(!back){g.fillStyle=P.trim;g.fillRect(side?(f>0?0:-9*U):-6*U,hy-1.6*U,side?9*U:12*U,2*U)}}
  else{g.beginPath();g.arc(side?f*.6*U:0,hy-1.4*U,6.2*U,Math.PI*.95,Math.PI*2.05);g.fill();if(back){g.beginPath();g.arc(0,hy,6.2*U,0,7);g.fill()}}
  if(P.bun){g.fillStyle=hairC;g.beginPath();g.arc(side?-f*5*U:0,hy-6*U,3*U,0,7);g.fill()}
  if(P.band){g.fillStyle=P.band;g.fillRect(-6*U,hy-3*U,12*U,2*U)}
  // props: umbrella dome, keyboard, bowl, baton
  if(P.umb){g.fillStyle='rgba(10,8,24,.92)';g.beginPath();g.arc(0,hy-9*U,13*U,Math.PI,0);g.fill();g.strokeStyle=P.umb;g.shadowColor=P.umb;g.shadowBlur=8;g.lineWidth=2;g.beginPath();g.arc(0,hy-9*U,13*U,Math.PI,0);g.stroke();g.shadowBlur=0;g.strokeStyle='#05030a';g.lineWidth=2;g.beginPath();g.moveTo(0,hy-9*U);g.lineTo(0,top+8*U);g.stroke()}
  if(P.keys){g.fillStyle='#0a0c12';g.fillRect(-9*U,top+bodyH-6*U,18*U,5*U);g.fillStyle='#ff7a1a';g.shadowColor='#ff7a1a';g.shadowBlur=6;g.fillRect(-8*U,top+bodyH-5.5*U,16*U,1.5*U);g.shadowBlur=0}
  if(P.bowl&&!back){g.fillStyle='#e8e8f0';g.beginPath();g.ellipse(f*8*U,top+bodyH-3*U,4*U,2*U,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,.18)';for(let k=0;k<2;k++){const q=((tm*.8+k*.5)%1);g.beginPath();g.arc(f*8*U+Math.sin(q*6)*2*U,top+bodyH-5*U-q*10*U,(1.5+q)*U,0,7);g.fill()}}
  if(P.baton){g.strokeStyle='#27e0ff';g.shadowColor='#27e0ff';g.shadowBlur=5;g.lineWidth=2*U;g.beginPath();g.moveTo(bw/2+2*U,top+10*U);g.lineTo(bw/2+4*U,top+bodyH);g.stroke();g.shadowBlur=0}
  g.restore();
}
function owCat(x,y,d,tm,pal){
  const P=pal||{b:'#5a5a6a',k:'#3a3a48',h:'#6a6a7a',t:'#4a4a58',e:'#58ffb0',n:'#ff9bd8'},gl=pal&&Math.sin(tm*9+x*3.1)>.93;
  const sx=x*OWT+OWT/2,sy=y*OWT+OWT-5,s=OWT/44,f=d==='l'?-1:1;
  og.save();og.translate(sx+(gl?3:0),sy);og.scale(f*s,s);if(pal){og.shadowColor=pal.e;og.shadowBlur=8}
  og.fillStyle='rgba(0,0,0,.4)';og.beginPath();og.ellipse(0,0,15,5,0,0,7);og.fill();
  const tail=Math.sin(tm*2.4)*.35;
  og.strokeStyle=P.t;og.lineWidth=5;og.lineCap='round';og.beginPath();og.moveTo(-11,-6);og.quadraticCurveTo(-24,-8+tail*20,-19,-24+tail*14);og.stroke();
  og.fillStyle=P.b;og.beginPath();og.ellipse(-2,-10,14,10,0,0,7);og.fill();           // body
  og.fillStyle=P.k;og.beginPath();og.ellipse(-8,-8,5,7,.3,0,7);og.fill();           // haunch
  og.fillStyle=P.h;og.beginPath();og.ellipse(9,-20,9,8,0,0,7);og.fill();            // head
  og.beginPath();og.moveTo(3,-25);og.lineTo(4,-35);og.lineTo(10,-27);og.fill();og.beginPath();og.moveTo(16,-26);og.lineTo(16,-35);og.lineTo(10,-27);og.fill();   // ears
  og.fillStyle=P.n;og.beginPath();og.moveTo(5,-27);og.lineTo(5,-32);og.lineTo(8,-28);og.fill();og.beginPath();og.moveTo(14,-27);og.lineTo(14,-32);og.lineTo(11,-28);og.fill();
  const blink=Math.sin(tm*.9)>.97;
  og.fillStyle=P.e;og.shadowColor=P.e;og.shadowBlur=6;if(blink)og.fillRect(5,-21,3,1.5),og.fillRect(11,-21,3,1.5);else{og.beginPath();og.ellipse(6.5,-21,2,2.6,0,0,7);og.fill();og.beginPath();og.ellipse(12.5,-21,2,2.6,0,0,7);og.fill()}og.shadowBlur=0;
  og.fillStyle=P.n;og.fillRect(8.5,-17.5,2,1.6);
  og.strokeStyle='rgba(255,255,255,.6)';og.lineWidth=.8;for(const dy of [-1.5,1])for(const dx of [1,-1]){og.beginPath();og.moveTo(9.5+dx*2,-17+dy);og.lineTo(9.5+dx*9,-17+dy*3);og.stroke()}
  og.fillStyle=P.h;og.fillRect(5,-8,4,8);og.fillRect(10,-8,4,8);   // front paws
  og.restore();
}
const owNpcLook=new Map();
function owNpcFig(n){
  let e=owNpcLook.get(n.id);
  if(!e){const c=n.crew&&(CREWS.find(x=>x.id===n.crew)||ROUTE_CREWS.find(x=>x.id===n.crew)||HB_CREWS.find(x=>x.id===n.crew)||R2_CREWS.find(x=>x.id===n.crew));e={look:lookOf({name:n.name+n.id,pos:n.crew?'QB':'WR'}),uni:c?c.uni:Object.assign({},DEF_UNI,{jc:['#27e0ff','#ff2fa8','#9b5cff','#58ffb0','#ffd23a','#ff7a1a'][owNpcLook.size%6],pc:'#1a1536',hc:'#1a1536',mask:'#ff2fa8',ps:'#27e0ff',sock:'#27e0ff'})};owNpcLook.set(n.id,e)}
  return e;
}
/* ---------- town lighting zones ----------
   Two tiny maps (4 pixels per tile) are stretched over the street, so colors melt into each other with no hard edges:
   an additive glow map (colour) and a multiply map (brightness). Each zone is an oval: [x,y,radiusX,radiusY,r,g,b,strength]. */
const ZW=4;
const ZADD=[
 [16,5,13,8,255,120,200,0.12],   // arena: bright, hot-pink energetic
 [6,15,8,6,170,90,255,0.14],     // Glitch Cats lot: electric violet
 [26,15,8,6,255,170,50,0.14],    // Scrap Kings lot: amber
 [4,5,7,6,255,40,190,0.20],      // Holo Bar: saturated neon pink
 [28,5,6,6,40,255,170,0.13],     // Data Den: cold green
 [25,27,7,6,190,70,255,0.20],    // Clubhouse strip: neon purple
 [5,21,9,5,30,120,255,0.19],     // canal, dock and hut: cool blue
 [20,26,6,6,255,250,225,0.18],   // Pharma and shops: clean warm white
 [6,28,6,5,40,230,190,0.12],     // Skyline Drifters: teal
 [12,27,4,4,255,150,60,0.16],    // home: warm lamp-light
 [16,36,14,5,255,150,60,0.10]    // quiet south blocks: dim amber
];
const ZMUL=[                     // [x,y,rx,ry,r,g,b,strength] darkening; lower channels = dimmer and tinted
 [5,21,10,5,105,140,230,.62],   // canal: calm, dimmer, bluish
 [12,28,5,5,150,115,105,.62],   // home: cozy, dim
 [16,36,14,5,140,115,115,.66],  // south quiet blocks: dim
 [6,28,6,5,140,190,180,.35]     // tower side: shaded
];
let ZC=null;
function owZoneMaps(){
  if(ZC)return ZC;
  const w=32*ZW,h=40*ZW,mk=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
  const A=mk(),Mm=mk(),a=A.getContext('2d'),m=Mm.getContext('2d');
  a.fillStyle='rgb(4,9,16)';a.fillRect(0,0,w,h);a.globalCompositeOperation='lighter';
  m.fillStyle='rgb(138,156,172)';m.fillRect(0,0,w,h);
  const blob=(g,z,mulMode)=>{const [x,y,rx,ry,r,gg,b,st]=z;g.save();g.translate(x*ZW,y*ZW);g.scale(rx*ZW,ry*ZW);const gr=g.createRadialGradient(0,0,0,0,0,1);
    const col=mulMode?r+','+gg+','+b:Math.round(r*st)+','+Math.round(gg*st)+','+Math.round(b*st);
    gr.addColorStop(0,'rgba('+col+','+(mulMode?st:1)+')');gr.addColorStop(.55,'rgba('+col+','+(mulMode?st*.55:.5)+')');gr.addColorStop(1,'rgba('+col+',0)');g.fillStyle=gr;g.fillRect(-1,-1,2,2);g.restore()};
  for(const z of ZADD)blob(a,z,false);
  for(const z of ZMUL)blob(m,z,true);
  ZC={A,M:Mm};return ZC;
}
function spToast(){if(!OWON||!M||!M.route||OW.busy||OW.px<54||OW.px>=59||OW.py<4||OW.py>=11)return;SAVE.route=SAVE.route||{};if(SAVE.route.span)return;SAVE.route.span=1;try{persist()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}owToast('UNDER THE BROKEN SPAN')}
function zdBeat(){
  const R=SAVE.route;if(!R||!R.zdBond||R.zdSeen||OW.busy||!OWON)return;
  const lines=R.zdCatch?["You threw to me. In a real match.","That's not the same as being trusted.","...don't make it weird."]:["No catches. Not in either test.","...I wasn't open.","(He doesn't say it again. But he gets open.)"];
  R.zdSeen=1;persist();owSay('ZERO DAY',lines)}
function owFrame(dt){
  if(M&&!M.baked)owBake(M);   // v2.95: drawn again if it was let go during a match
  zdBeat();spToast();owStep(dt);SND.zone(M,OW.px,OW.py);
  {const te=$('#owTown');if(te){if(OW.rtM!==M.id){OW.rtM=M.id;OW.rt=0}OW.rt=(OW.rt||0)+dt;te.style.opacity=M.route?String(clamp(1-(OW.rt-3)/1.2,0,1)):'';}}
  const SW=owW,SH=owH;if(M.route){const px=OW.px,tz0=px<11?1:px<19?1-.5*(px-11)/8:px<27?.5:px<36?.5+.3*(px-27)/9:.8,tz=Math.max(tz0,SH/(M.h*OWT),SW/(M.w*OWT));OW.z=(OW.z||1)+(tz-(OW.z||1))*Math.min(1,dt*2.2)}else if(M.room){const fit=Math.min(SW/(M.w*OWT),SH/(M.h*OWT))*.92,tz=clamp(fit,.72,1.15);OW.z=(OW.z||tz)+(tz-(OW.z||tz))*Math.min(1,dt*6)}else{const cover=Math.max(1,SW/(M.w*OWT),SH/(M.h*OWT));OW.z=(OW.z||1)+(cover-(OW.z||1))*Math.min(1,dt*2.2)}const z=OW.z||1,W=SW/z,H=SH/z,OT=OWT,rk=M.route?Math.min(Math.max(clamp((52-OW.px)/12,0,1),.4),OW.px>=44?clamp((OW.py-10.5)/3,0,1):1):1;og.setTransform(owDpr*z,0,0,owDpr*z,0,0);og.imageSmoothingEnabled=true;
  const mw=M.w*OT,mh=M.h*OT,k=OT/BP;
  let cx=OW.px*OT+OT/2-W/2,cy=OW.py*OT+OT/2-H*(M.route?.46+clamp((14-OW.py)/3,0,1)*(.2*clamp((OW.px-40)/4,0,1)-.32*clamp((OW.px-54)/5,0,1)):.46);
  const fitX=mw<=W,fitY=mh<=H;
  cx=fitX?(mw-W)/2:clamp(cx,0,mw-W);cy=fitY?(mh-H)/2:clamp(cy,0,mh-H);
  og.fillStyle='#05040c';og.fillRect(0,0,W,H);
  og.save();og.translate(-cx,-cy);
  owBlit(M,cx,cy,W,H,k,fitX||fitY,mw,mh);
  const tm=performance.now()/1000;
  if(M.id==='street'){for(const [gx,gy] of M.gates){if(gx<28&&owGateOpen())continue;const X=gx*OT,Y=gy*OT,vt=gx>=28,pul=.5+.4*Math.sin(tm*4+gx+gy);
      og.fillStyle='#0a0818';og.fillRect(X,Y+OT*.12,OT,OT*.76);og.fillStyle='#e8c53a';
      for(let i=0;i<4;i++){og.beginPath();if(vt){og.moveTo(X+OT*.12,Y+i*OT/4);og.lineTo(X+OT*.88,Y+i*OT/4+OT/8);og.lineTo(X+OT*.88,Y+i*OT/4+OT/4);og.lineTo(X+OT*.12,Y+i*OT/4+OT/8)}else{og.moveTo(X+i*OT/4,Y+OT*.14);og.lineTo(X+i*OT/4+OT/8,Y+OT*.14);og.lineTo(X+i*OT/4+OT/8-OT*.07,Y+OT*.86);og.lineTo(X+i*OT/4-OT/8-OT*.07,Y+OT*.86)}og.fill()}
      og.fillStyle='rgba(255,59,92,'+pul+')';og.fillRect(X+OT*.4,Y+OT*.04,OT*.2,OT*.1)}
    og.fillStyle='#2a2352';og.fillRect(14*OT-OT*.16,38*OT+OT*.1,OT*.16,OT*.8);og.fillRect(18*OT,38*OT+OT*.1,OT*.16,OT*.8);og.fillRect(30*OT+OT*.1,19*OT-OT*.16,OT*.8,OT*.16);og.fillRect(30*OT+OT*.1,22*OT,OT*.8,OT*.16)}
  for(const v of M.vents){for(let i=0;i<3;i++){const ph=((tm*.5+i/3+v.x*.013)%1),px=v.x*k+Math.sin(ph*6+i)*5,py=v.y*k-ph*OT*1.1;og.globalAlpha=(1-ph)*.22;og.fillStyle='#cfe6ff';og.beginPath();og.arc(px,py,OT*(.1+ph*.2),0,7);og.fill()}}

  if(M.id==='street'){
    // flickering signs: a few neon signs stutter now and then (cheap dark overlay on the sign plaque)
    for(const [id,ph] of [['arena',1.3],['bar',4.1],['pawn',7.7],['arcade',2.6]]){const b=OWB.find(q=>q.id===id),sx=(b.x+b.w/2)*OT,sy=(b.y+b.h-2)*OT+OT*(id==='arena'?.1:.06),pw=(id==='arena'?b.w*.62:Math.min(b.w-.5,Math.max(1.5,b.sign.length<3?1.4:b.sign.length*.36)))*OT,ph2=(id==='arena'?1.35:(b.sub&&b.sign.length>=3?.82:b.sign.length<3?1.2:.5))*OT;
      const fl=Math.max(0,Math.sin(tm*31+ph*9)*Math.sin(tm*1.7+ph)-.72)*3.2;if(fl>0){og.fillStyle='rgba(3,6,12,'+Math.min(.85,fl)+')';og.fillRect(sx-pw/2,sy,pw,ph2)}}
  }
  og.globalAlpha=1;
  if(!M.room&&!M.harbor&&!M.island){   // rain splashes are pinned to the ground (world grid cells), so they stay put as the camera moves
    const C=OT*2.5,hh=(a,b,c)=>{const v=Math.sin(a*12.9898+b*78.233+c*37.719)*43758.5453;return v-Math.floor(v)};
    og.lineWidth=1;
    for(let iy=Math.floor(cy/C)-1;iy<=Math.floor((cy+H)/C);iy++)for(let ix=Math.floor(cx/C)-1;ix<=Math.floor((cx+W)/C);ix++){
      const o=hh(ix,iy,1);if(o>.45)continue;
      const t=tm*.9+o*7,ph=t%1,cyc=Math.floor(t),px=(ix+hh(ix,iy,cyc+2))*C,py=(iy+hh(ix,iy,cyc+5))*C;
      if(px<cx-OT||px>cx+W+OT||py<cy-OT||py>cy+H+OT)continue;
      const tx=px/OT,ty=py/OT;let inB=false;if(M.route){const tt=spT(Math.floor(tx),Math.floor(ty));inB=!(tt===1||tt===2||tt===3||tt===5||tt===7)}else for(const b of OWB)if(tx>=b.x-.2&&tx<=b.x+b.w+.2&&ty>=b.y-.2&&ty<=b.y+b.h+.2){inB=true;break}
      if(inB)continue;
      og.strokeStyle='rgba(190,230,255,'+(.4*(1-ph)*rk)+')';og.beginPath();og.ellipse(px,py,OT*.05+ph*OT*.22,(OT*.05+ph*OT*.22)*.4,0,0,7);og.stroke()}}
  if(M.route)spAnim(og,OT,tm);
  if(M.harbor)hbAnim(og,OT,tm);
  if(M.island)r2Anim(og,OT,tm);
  if(M.r2)r2DeckAnim(og,OT,tm);
  if(M.hb)hbRoomAnim(og,OT,tm);
  dgAnim(og,OT,tm);
  const list=[{y:OW.py,n:null},...M.npcs.filter(n=>!n.off).map(n=>({y:n.y,n})),...vcCritEnts()].sort((a,b)=>a.y-b.y);
  for(const it of list){if(it.a){vcCritDraw(it.a,tm);continue}
    if(!it.n){if(M.route&&!OW.sleep&&z<.9){const rs=Math.min(1.8,.8/z);og.save();og.strokeStyle='rgba(120,235,255,.8)';og.lineWidth=2/z*.7;og.beginPath();og.ellipse(OW.px*OT+OT/2,OW.py*OT+OT*.92,OT*.42*rs,OT*.15*rs,0,0,7);og.stroke();og.restore()}if(!OW.sleep){og.shadowColor='rgba(120,235,255,.75)';og.shadowBlur=7}if(!OW.sleep)(ktEli(OW.px+OWDIR[OW.ld][0]*OW.la,OW.py+OWDIR[OW.ld][1]*OW.la,OW.d,OW.mv,OW.ph)||owFig(OW.px+OWDIR[OW.ld][0]*OW.la,OW.py+OWDIR[OW.ld][1]*OW.la,OW.d,OW.mv,SAVE.uni,lookOf(SAVE.starters.QB),7,OW.ph));og.shadowBlur=0;if(OW.sleep){const sx=1.55*OT,sy=2.5*OT;og.fillStyle='#e6b48a';og.beginPath();og.arc(sx,sy-4,OT*.17,0,7);og.fill();og.fillStyle='#14110f';og.beginPath();og.arc(sx,sy-8,OT*.17,Math.PI,0);og.fill();og.fillStyle='rgba(120,90,200,.9)';og.fillRect(sx+OT*.12,sy-OT*.14,OT*.95,OT*.36)}}
    else{const n=it.n;if(n.gate==='S'&&owGateOpen()){const o={S:{x:12,y:38},E:{x:30,y:23}}[n.gate];n.x=o.x;n.y=o.y}if(n.sprite==='cat'){owCat(n.x,n.y,n.d,tm,n.pal);continue}const e=owNpcFig(n);
      // a little glow over anyone who still has a gift for you
      if(n.pw&&!(SAVE.pw||[]).includes(n.pw)){og.fillStyle='rgba(255,210,60,'+(.5+.4*Math.sin(tm*4))+')';og.beginPath();const sx=(n.rx!=null?n.rx:n.x)*OT+OT/2,sy=(n.ry!=null?n.ry:n.y)*OT-OT*.9;og.moveTo(sx,sy+8);og.lineTo(sx-7,sy-4);og.lineTo(sx+7,sy-4);og.fill()}
      const crewCol=(M.id==='crew1'||M.id==='crew2'||M.id==='crew3'||M.id==='arena')?(OWB.find(q=>q.id===M.id)||{}).col:(n.id==='mate1'?'#27e0ff':null);
      if(crewCol&&!n.civ){const rx=(n.rx!=null?n.rx:n.x)*OT+OT/2,ry=(n.ry!=null?n.ry:n.y)*OT+OT*.9;og.save();og.strokeStyle=crewCol;og.lineWidth=2;og.globalAlpha=.55+.2*Math.sin(tm*3);og.shadowColor=crewCol;og.shadowBlur=8;og.beginPath();og.ellipse(rx,ry,OT*.46,OT*.17,0,0,7);og.stroke();og.restore();og.shadowColor=crewCol;og.shadowBlur=7}
      if(ch3Proxy(n))owCiv3Draw(0,0,n.d,n.patrol&&n.mv<1,ch3Proxy(n),tm,0);else if(n.civ){if(!ktCiv(n,tm))owCiv(0,0,n.d,n.patrol&&n.mv<1,n,tm,0)}else owFig(n.rx!=null?n.rx:n.x,n.ry!=null?n.ry:n.y,n.d,n.patrol&&n.mv<1,e.uni,e.look,n.num||(n.num=((n.x*13+n.y*7)%88)+3),0);og.shadowBlur=0}
  }
  if(M.harbor)hbCanopies(og,OT,tm,cx,cy,W,H);   // v3.21T tree canopies above the people
  if(M.fg){{const sg=og.createLinearGradient(54.3*OT,0,59.3*OT,0);sg.addColorStop(0,'rgba(0,0,0,0)');sg.addColorStop(.1,'rgba(0,0,8,.46)');sg.addColorStop(.9,'rgba(0,0,8,.46)');sg.addColorStop(1,'rgba(0,0,0,0)');og.fillStyle=sg;og.fillRect(54.3*OT,4.4*OT,5*OT,6.8*OT)}og.drawImage(M.fg.c,0,0,M.fg.c.width,M.fg.c.height,M.fg.x*OT,M.fg.y*OT,M.fg.c.width*k,M.fg.c.height*k)}
  if(M.fg&&!OW.sleep&&OW.px>M.fg.x-1&&OW.px<M.fg.x+M.fg.w){og.save();{const rs=Math.min(1.8,.8/z);og.strokeStyle='rgba(120,235,255,.85)';og.lineWidth=2/z*.7;og.beginPath();og.ellipse(OW.px*OT+OT/2,OW.py*OT+OT*.92,OT*.42*rs,OT*.15*rs,0,0,7);og.stroke()}og.shadowColor='rgba(120,235,255,.75)';og.shadowBlur=7;(ktEli(OW.px+OWDIR[OW.ld][0]*OW.la,OW.py+OWDIR[OW.ld][1]*OW.la,OW.d,OW.mv,OW.ph)||owFig(OW.px+OWDIR[OW.ld][0]*OW.la,OW.py+OWDIR[OW.ld][1]*OW.la,OW.d,OW.mv,SAVE.uni,lookOf(SAVE.starters.QB),7,OW.ph));og.restore()}
  og.globalCompositeOperation='lighter';
  const x0=cx/k,y0=cy/k,x1=(cx+W)/k,y1=(cy+H)/k;
  for(const L of M.lights){if(L.x<x0-L.r||L.x>x1+L.r||L.y<y0-L.r||L.y>y1+L.r)continue;const fl=.75+.25*Math.sin(tm*3+L.f)+(Math.sin(tm*13+L.f*3)>.97?-.35:0);og.globalAlpha=Math.min(.8,Math.max(0,L.a*(M.room?1.8:1.45)*fl));const r=L.r*k*1.25;og.drawImage(glowImg(L.col),L.x*k-r,L.y*k-r,r*2,r*2)}
  og.globalAlpha=1;og.globalCompositeOperation='source-over';
  og.restore();og.setTransform(owDpr,0,0,owDpr,0,0);
  if(!M.room&&!M.harbor&&!M.island&&rk>.02){og.strokeStyle='rgba(150,255,190,'+(.20*rk)+')';og.lineWidth=1;og.beginPath();
    for(const r of RAINOW){r.y+=dt*r.v*1.3;r.x-=dt*.04;if(r.y>1){r.y=0;r.x=Math.random()*1.1}if(r.x<0)r.x+=1;const x=r.x*SW,y=r.y*SH;og.moveTo(x,y);og.lineTo(x-3,y+13)}og.stroke()}
  
  const vg=og.createRadialGradient(SW/2,SH*.5,SH*.3,SW/2,SH*.5,SH*.85);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,4,10,.55)');og.fillStyle=vg;og.fillRect(0,0,SW,SH);
  hbSilFrame(dt,SW,SH);
  if(OW.fade>0){og.fillStyle='rgba(5,4,12,'+OW.fade+')';og.fillRect(0,0,SW,SH)}
}

resize();renderMenu();owShow();
G=null;F=null;
requestAnimationFrame(loop);



/* ============ TEAM LOGOS: original emblems drawn in code. Colours come from the team's kit, the town supplies the look (neon glow in Vapor City). ============ */
const LOGO_BASE=['bolt','crown','flame','star','claw','wing','eye','gem','chev','sun'];
const LOGO_CREW={cats:'cat',kings:'kcrown',rollers:'skyline',captain:'node'};
const LOGO_NAMES={bolt:'BOLT',crown:'CROWN',flame:'FLAME',star:'STAR',claw:'CLAW',wing:'WING',eye:'EYE',gem:'GEM',chev:'RISE',sun:'GEARSUN',cat:'GLITCH CAT',kcrown:'SCRAP KING',skyline:'SKYLINE',node:'NETRUNNER'};
const lumaOf=h=>{h=String(h||'#888').replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16)||0;return(.299*(n>>16&255)+.587*(n>>8&255)+.114*(n&255))/255};
const LOGO_GLYPH={
 bolt:(A,B,K)=>`<path d="M58 6 26 54h21l-7 40 34-52H53z" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><path d="M52 24 40 48h14l-4 20 14-22H52z" fill="${B}" opacity=".55"/>`,
 crown:(A,B,K)=>`<path d="M12 72 8 30l24 20 18-28 18 28 24-20-4 42z" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><rect x="14" y="76" width="72" height="12" rx="2" fill="${B}" stroke="${K}" stroke-width="3"/><circle cx="50" cy="22" r="5" fill="${B}"/>`,
 flame:(A,B,K)=>`<path d="M50 6C58 26 80 36 76 62 74 80 62 92 50 92 38 92 24 80 24 62 24 50 32 44 36 32 42 38 44 42 46 46 46 32 46 20 50 6z" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><path d="M50 50C54 60 64 64 62 76 61 84 56 88 50 88 44 88 38 84 38 76 38 70 42 66 44 60 46 62 48 64 49 66 49 58 49 54 50 50z" fill="${B}"/>`,
 star:(A,B,K)=>`<polygon points="50,6 62,36 94,38 69,58 78,90 50,72 22,90 31,58 6,38 38,36" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><polygon points="50,28 55,42 70,43 58,52 62,67 50,59 38,67 42,52 30,43 45,42" fill="${B}" opacity=".7"/>`,
 claw:(A,B,K)=>['20,10 36,10 50,90 34,90','42,10 58,10 72,90 56,90','64,10 80,10 94,90 78,90'].map((p,i)=>`<polygon points="${p}" fill="${i==1?B:A}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>`).join(''),
 wing:(A,B,K)=>`<path d="M8 62C28 30 60 18 94 22 76 32 68 40 64 48 74 46 84 46 92 48 72 56 64 62 60 70 68 70 76 72 82 74 56 88 28 84 8 62z" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><path d="M30 56C46 40 66 32 84 28" stroke="${B}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
 eye:(A,B,K)=>`<path d="M4 50Q50 8 96 50 50 92 4 50z" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="50" r="19" fill="${B}" stroke="${K}" stroke-width="3"/><circle cx="50" cy="50" r="8" fill="${K}"/>`,
 gem:(A,B,K)=>`<polygon points="50,6 88,36 50,94 12,36" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><path d="M12 36H88M50 6 34 36 50 94 66 36z" stroke="${B}" stroke-width="3" fill="none" stroke-linejoin="round"/>`,
 chev:(A,B,K)=>[4,30,56].map((o,i)=>`<polygon points="50,${6+o} 92,${40+o} 92,${56+o} 50,${22+o} 8,${56+o} 8,${40+o}" fill="${i==1?B:A}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>`).join(''),
 sun:(A,B,K)=>{let t='';for(let i=0;i<10;i++)t+=`<rect x="44" y="4" width="12" height="20" rx="2" fill="${A}" stroke="${K}" stroke-width="2.5" transform="rotate(${i*36} 50 50)"/>`;return t+`<circle cx="50" cy="50" r="30" fill="${A}" stroke="${K}" stroke-width="3.5"/><circle cx="50" cy="50" r="14" fill="${B}" stroke="${K}" stroke-width="3"/>`},
 cat:(A,B,K)=>`<path d="M14 88V24l22 20c9-3 19-3 28 0l22-20v64Q50 100 14 88z" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><path d="M28 58l18 5v8l-18-5zM72 58 54 63v8l18-5z" fill="${B}"/><rect x="10" y="74" width="30" height="5" fill="${K}"/><rect x="60" y="48" width="30" height="5" fill="${K}"/><path d="M50 74l-5-5h10z" fill="${K}"/>`,
 kcrown:(A,B,K)=>{let t='';for(let i=0;i<8;i++)t+=`<rect x="45" y="30" width="10" height="14" rx="2" fill="${B}" stroke="${K}" stroke-width="2.5" transform="rotate(${i*45} 50 68)"/>`;return t+`<circle cx="50" cy="68" r="22" fill="${B}" stroke="${K}" stroke-width="3"/><path d="M22 58 18 18l18 14 14-22 14 22 18-14-4 40z" fill="${A}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/>`},
 skyline:(A,B,K)=>`<path d="M6 46Q50 8 94 46" stroke="${B}" stroke-width="5" fill="none" stroke-linecap="round"/>`+[[10,60,14,32],[26,44,14,48],[42,28,16,64],[60,50,14,42],[76,64,14,28]].map(([x,y,w,h],i)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${i==2?B:A}" stroke="${K}" stroke-width="3"/>`).join('')+`<path d="M46 40h8M46 50h8M46 60h8" stroke="${K}" stroke-width="2.5"/>`,
 node:(A,B,K)=>`<path d="M50 50H18V24M50 50H82V24M50 50H18V78M50 50H82V78" stroke="${A}" stroke-width="5" fill="none" stroke-linejoin="round"/>`+[[18,24],[82,24],[18,78],[82,78]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="${B}" stroke="${K}" stroke-width="3"/>`).join('')+`<circle cx="50" cy="50" r="19" fill="${A}" stroke="${K}" stroke-width="3.5"/><circle cx="50" cy="50" r="8" fill="${B}"/>`
};
const LOGO_SHAPE={shield:'M50 3 93 15V52C93 75 73 91 50 98 27 91 7 75 7 52V15z',round:'M50 3A47 47 0 1 1 49.9 3z',hex:'M50 3 91 26.5V73.5L50 97 9 73.5V26.5z'};
let _lgN=0;
function logoSVG(glyph,col,town,opt){opt=opt||{};const A=col||'#9b5cff',K='#0b0b12',B=lumaOf(A)>.62?'#14110f':'#ffffff',g=LOGO_GLYPH[glyph]||LOGO_GLYPH.bolt,th=(town&&TOWN_THEMES[town])||TOWN_FALLBACK,neon=th.fx==='rain',id='lg'+(++_lgN),shape=opt.shape||(['crown','kcrown','gem','star'].includes(glyph)?'hex':['eye','sun','node','flame'].includes(glyph)?'round':'shield');
  const ring=neon?th.b:A;if(opt.bg)return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 112 112" width="100%" height="100%">${neon?`<defs><filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`:''}<g${neon?` filter="url(#${id})"`:''}>${g(A,B,K)}</g></svg>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 112 112" width="100%" height="100%">${neon?`<defs><filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`:''}<g${neon?` filter="url(#${id})"`:''}><path d="${LOGO_SHAPE[shape]}" fill="${K}" stroke="${ring}" stroke-width="${neon?4:5}" stroke-linejoin="round"/>${neon?`<path d="${LOGO_SHAPE[shape]}" fill="none" stroke="${th.a}" stroke-width="1.5" transform="translate(50 50) scale(.88) translate(-50 -50)"/>`:`<path d="${LOGO_SHAPE[shape]}" fill="none" stroke="${B}" stroke-width="1.5" opacity=".5" transform="translate(50 50) scale(.86) translate(-50 -50)"/>`}<g transform="translate(50 52) scale(.72) translate(-50 -50)">${g(A,B,K)}</g></g></svg>`}
function crewLogo(c){return c.logo||LOGO_CREW[c.id]||LOGO_BASE[(hash(c.id||c.name||'x')>>3)%LOGO_BASE.length]}

/* ============ PLAYER LOGO SYSTEM: 10 selectable logos, each a 3-layer SVG (--team-primary / --team-secondary / --team-accent) plus fixed neutrals ============ */
const LK='#0b0b12',LW='#ffffff';
const _P='style="fill:var(--team-primary)"',_S='style="fill:var(--team-secondary)"',_A='style="fill:var(--team-accent)"',_K='fill="#0b0b12"',_W='fill="#ffffff"',_O='stroke="#0b0b12" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
const LOGOS={};const LOGO_ORDER=[];
function registerLogo(id,name,art){LOGOS[id]={id,name,art};if(!LOGO_ORDER.includes(id))LOGO_ORDER.push(id)}   // a new logo = one registerLogo call; nothing else changes
const mirror=(f)=>f+`<g transform="translate(100 0) scale(-1 1)">${f}</g>`;
registerLogo('wolf','THE OUTCASTS',`
 ${mirror(`<path ${_P} ${_O} d="M16 46 14 8 42 28z"/><path ${_K} d="M21 36 21 20 32 30z"/><path ${_S} ${_O} d="M13 58 0 66 12 74 2 88 24 84z"/>`)}
 <path ${_P} ${_O} d="M16 44 42 26H58L84 44 80 62 66 70 62 78H38L34 70 20 62z"/>
 <path ${_S} ${_O} d="M36 52H64L62 70 58 96H42L38 70z"/>
 ${mirror(`<path ${_K} d="M22 48 44 52 43 60 26 56z"/><path ${_A} d="M27 51 41 54 40 57 28 55z"/>`)}
 <path ${_K} d="M40 52H60L58 66 50 72 42 66z"/>
 <path ${_K} d="M38 80H62L58 92H42z"/>
 <path ${_W} d="M40 80 44 91 47 82zM53 82 56 91 60 80z"/>
 <path d="M50 26 50 42" stroke="#0b0b12" stroke-width="3" stroke-linecap="round"/>`);
registerLogo('skull','DEAD SIGNAL',`
 <path ${_P} ${_O} d="M50 6C27 6 14 23 17 44 19 54 24 58 28 62V82H72V62C76 58 81 54 83 44 86 23 73 6 50 6z"/>
 <path ${_S} d="M12 28H34V34H12zM66 52H90V58H66z"/>
 <path ${_K} d="M25 38H45V57H25zM55 38H75V57H55z"/>
 <path ${_A} d="M30 43H40V52H30zM60 43H70V52H60z"/>
 <path ${_K} d="M50 58 43 70H57z"/>
 <path ${_W} d="M31 72H69V84H31z"/><path d="M40 72v12M50 72v12M60 72v12" stroke="#0b0b12" stroke-width="2.5"/>
 <path ${_A} d="M6 46H22V50H6zM78 24H94V28H78zM70 86H92V90H70z"/>`);
registerLogo('bolt','SHOCKWAVE',`
 <path d="M14 22A40 40 0 0 0 14 78M5 10A56 56 0 0 0 5 90" style="stroke:var(--team-secondary)" stroke-width="5" fill="none" stroke-linecap="round"/>
 <path d="M86 22A40 40 0 0 1 86 78M95 10A56 56 0 0 1 95 90" style="stroke:var(--team-secondary)" stroke-width="5" fill="none" stroke-linecap="round"/>
 <path ${_P} ${_O} d="M62 3 22 55H47L36 97 82 40H55z"/>
 <path ${_A} d="M58 22 38 49H52L47 70 68 44H54z"/>`);
registerLogo('shark','DEEP CUT',`
 <path ${_P} ${_O} d="M3 54C20 36 48 30 72 38L92 18 88 50 99 78 72 62C54 78 24 76 3 54z"/>
 <path ${_S} ${_O} d="M40 34 55 6 64 38z"/>
 <path ${_S} d="M8 57C30 68 56 70 72 61 54 74 24 72 8 57z"/>
 <path ${_W} d="M9 56l4 7 3-5 4 7 3-5 4 7 3-5 4 6 3-4 4 5 3-3-2-5z"/>
 <circle ${_A} ${_O} cx="24" cy="49" r="4.5"/><circle ${_K} cx="25" cy="49" r="1.8"/>
 <path d="M44 46v12M51 45v12M58 45v11" stroke="#0b0b12" stroke-width="2.5" stroke-linecap="round"/>`);
registerLogo('phoenix','REBIRTH',`
 ${mirror(`<path ${_P} ${_O} d="M54 56C68 50 80 36 82 8 90 22 92 30 92 40 96 34 98 28 98 20 104 36 100 54 90 62 94 66 98 66 100 72 88 78 72 72 54 70z"/><path ${_A} d="M60 64C72 62 82 66 92 72 82 80 68 76 58 72z"/><path ${_S} d="M60 52C70 46 78 38 82 24 82 40 72 54 60 58z"/>`)}
 <path ${_A} ${_O} d="M50 74C34 88 40 96 50 101 60 96 66 88 50 74z"/>
 ${mirror(`<path ${_A} ${_O} d="M45 74C32 80 24 90 30 100 38 92 44 88 47 78z"/>`)}
 <path ${_W} d="M50 82C44 88 46 94 50 96 54 94 56 88 50 82z"/>
 <path ${_P} ${_O} d="M50 36C61 40 63 56 57 72L50 80 43 72C37 56 39 40 50 36z"/>
 <path ${_P} ${_O} d="M41 30C41 18 58 17 61 28L74 33 61 38C57 42 42 41 41 30z"/>
 <path ${_A} ${_O} d="M61 28 74 33 61 38z"/>
 <path ${_A} ${_O} d="M43 22 34 2 47 14 50 -2 54 13 66 4 59 22z"/>
 <circle ${_W} cx="53" cy="29" r="3"/><circle ${_K} cx="54" cy="29" r="1.6"/>
 <path ${_S} d="M47 46C54 48 55 58 52 68L50 72 48 68C45 58 45 50 47 46z"/>`);
registerLogo('oni','THE RENEGADES',`
 ${mirror(`<path ${_S} ${_O} d="M27 34 16 2 40 26z"/>`)}
 <path ${_P} ${_O} d="M50 96 22 82 11 48 20 28H80L89 48 78 82z"/>
 <path ${_S} d="M50 30 57 42 50 54 43 42z"/>
 <path ${_K} d="M20 40 46 50 44 54 20 46zM80 40 54 50 56 54 80 46z"/>
 ${mirror(`<path ${_A} d="M25 47 43 52 41 58 28 54z"/>`)}
 <path ${_W} ${_O} d="M24 68 76 68 70 86 30 86z"/>
 <path d="M34 68v18M42 68v18M50 68v18M58 68v18M66 68v18" stroke="#0b0b12" stroke-width="2"/>
 <path ${_W} ${_O} d="M30 68 34 56 38 68zM62 68 66 56 70 68z"/>`);
const LOGO_DEF='wolf';
const logoId=id=>LOGOS[id]?id:LOGO_DEF;   // saved ids that no longer exist fall back instead of breaking
function teamLogoColors(u){u=u||SAVE.uni;let p=u.jc||'#e4572e',s=u.hc||'#1f3f9e',a=u.jt||'#ffffff';if(s.toLowerCase()===p.toLowerCase())s=lumaOf(p)>.5?'#14110f':'#ffffff';return{p,s,a}}
/* LogoRenderer: logo id + three colours + size -> inline SVG (transparent, recoloured through CSS variables, artwork untouched) */
function LogoRenderer(id,p,s,a,size){const L=LOGOS[logoId(id)];return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size||'100%'}" height="${size||'100%'}" style="--team-primary:${p};--team-secondary:${s};--team-accent:${a};overflow:visible;filter:drop-shadow(0 0 1.2px rgba(255,255,255,.55))" role="img" aria-label="${L.name}">${L.art}</svg>`}
function myLogoHTML(size){const c=teamLogoColors();return LogoRenderer(SAVE.logo,c.p,c.s,c.a,size)}
function renderLogoPick(){const cur=logoId(SAVE.logo),c=teamLogoColors();
  const pv=$('#tLogoPrev');if(pv)pv.innerHTML=LogoRenderer(cur,c.p,c.s,c.a,'100%');
  const btn=$('#tLogoBtn');if(btn)btn.onclick=openLogoMenu}
function openLogoMenu(){let m=document.getElementById('lgMenu');if(m)m.remove();m=document.createElement('div');m.id='lgMenu';
  const cur=logoId(SAVE.logo),c=teamLogoColors();
  m.innerHTML='<div class="lgh"><span>PICK YOUR LOGO</span><button class="lgx" type="button">CLOSE</button></div><div class="lgrid"></div>';
  const box=m.querySelector('.lgrid');
  LOGO_ORDER.forEach(id=>{const b=document.createElement('button');b.type='button';b.className='lgt'+(id===cur?' on':'');b.setAttribute('aria-label',LOGOS[id].name);b.innerHTML=LogoRenderer(id,c.p,c.s,c.a,'100%');b.onclick=()=>{SAVE.logo=id;persist();m.remove();renderLogoPick();setScoreLogo()};box.appendChild(b)});
  m.querySelector('.lgx').onclick=()=>m.remove();m.onclick=e=>{if(e.target===m)m.remove()};document.body.appendChild(m)}
function setOppLogo(c){const e=document.getElementById('oLg');if(e&&c)e.innerHTML=logoSVG(crewLogo(c),(G_oppUniPending||c.uni).jc,c.town,{shape:'shield'})}   // the opponent keeps its story/crew emblem
function scoreFit(){requestAnimationFrame(()=>{for(const id of['yName','oName']){const el=document.getElementById(id);if(!el)continue;let f=16;el.style.whiteSpace='nowrap';el.style.lineHeight='';el.style.fontSize=f+'px';el.style.letterSpacing='.05em';while(f>12&&el.scrollWidth>el.clientWidth+0.5){f-=.5;el.style.fontSize=f+'px';if(f<14)el.style.letterSpacing='.02em'}if(el.scrollWidth>el.clientWidth+0.5){el.style.whiteSpace='normal';el.style.lineHeight='1';el.style.fontSize='12px';el.style.letterSpacing='.03em'}}})}
window.addEventListener('resize',()=>{try{scoreFit()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}});
function setScoreLogo(){const e=document.getElementById('yLg');if(e)e.innerHTML=myLogoHTML('100%')}

/* ============ MATCHUP INTRO: one template, filled from the match data; it stays up until this match's core sprite sets are baked ============ */
const TOWN_THEMES={   // a new town only needs a new entry here
 'Vapor City':{bg:'radial-gradient(120% 90% at 50% 0%,#2a1450 0%,#120a2a 55%,#07040f 100%)',a:'#ff2fa8',b:'#27e0ff',fx:'rain',holo:1}
};
const TOWN_FALLBACK={bg:'linear-gradient(180deg,#171b24,#090b10)',a:'#9fb2c8',b:'#5d6f86',fx:null};
/* ---- Route 2 registrations that need later-defined tables (injected after TOWN_THEMES) ---- */
Object.assign(LOGO_GLYPH,{
 r2rake:(A,B,K)=>`<rect x="46" y="8" width="9" height="62" rx="3" fill="#A55132" stroke="${K}" stroke-width="3"/><rect x="14" y="62" width="72" height="12" rx="3" fill="#3A464E" stroke="${K}" stroke-width="3.5"/><path d="M20 74V90M33 74V90M46 74V90M59 74V90M72 74V90M84 74V90" stroke="#3A464E" stroke-width="6" stroke-linecap="round"/><path d="M20 74V90M33 74V90M46 74V90M59 74V90M72 74V90M84 74V90" stroke="${K}" stroke-width="1.5" stroke-linecap="round" opacity=".5"/><path d="M22 30l6-6 6 6-6 6zM70 22l5-5 5 5-5 5zM74 44l4-4 4 4-4 4z" fill="#E8E2D0" stroke="${K}" stroke-width="2"/>`});
TOWN_THEMES["Gull's Reach"]={bg:'radial-gradient(120% 90% at 50% 0%,#5C6B73 0%,#3A464E 55%,#1b2328 100%)',a:'#E8E2D0',b:'#A55132',fx:null};
POWERUPS.gaff={name:'GAFF',desc:'+4 team defense for one match (your tacklers hook and hold)'};
POWERUPS.slicker={name:'SLICKER',desc:'+8 power for ball carriers for one match (they slip tackles)'};
PW_POOL.push(['gaff','slicker']);

/* ---- registrations that need later-defined tables (injected after TOWN_THEMES) ---- */
/* ---- logos: flat, three layers (base = team colour, then the Bible's accent colours) ---- */
Object.assign(LOGO_GLYPH,{
 hbanchor:(A,B,K)=>`<circle cx="50" cy="20" r="9" fill="none" stroke="${K}" stroke-width="9"/><circle cx="50" cy="20" r="9" fill="none" stroke="#3A4A55" stroke-width="5"/><rect x="45" y="26" width="10" height="56" fill="#3A4A55" stroke="${K}" stroke-width="3"/><rect x="28" y="40" width="44" height="9" fill="#3A4A55" stroke="${K}" stroke-width="3"/><path d="M14 62Q18 90 50 90 82 90 86 62L74 70Q68 80 50 80 32 80 26 70z" fill="#B5643C" stroke="${K}" stroke-width="3" stroke-linejoin="round"/><path d="M12 60 24 62 18 74z" fill="#E8E2D0" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/><path d="M88 60 76 62 82 74z" fill="#E8E2D0" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/>`,
 hbhooks:(A,B,K)=>`<path d="M24 12 70 88" stroke="${K}" stroke-width="13" stroke-linecap="round" fill="none"/><path d="M24 12 70 88" stroke="#2B3036" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M76 12 30 88" stroke="${K}" stroke-width="13" stroke-linecap="round" fill="none"/><path d="M76 12 30 88" stroke="#2F6F6A" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M70 88Q86 84 82 70M30 88Q14 84 18 70" stroke="#E8E2D0" stroke-width="5" stroke-linecap="round" fill="none"/>`,
 hbcrane:(A,B,K)=>`<rect x="14" y="10" width="72" height="14" fill="#2B3036" stroke="${K}" stroke-width="3.5"/><rect x="14" y="10" width="14" height="80" fill="#2B3036" stroke="${K}" stroke-width="3.5"/><rect x="72" y="10" width="14" height="80" fill="#2B3036" stroke="${K}" stroke-width="3.5"/><path d="M44 24V48M56 24V48" stroke="#D9A441" stroke-width="3.5"/><path d="M50 48V64Q50 82 66 78M50 48V64Q50 82 36 80" stroke="#9FC6D8" stroke-width="7" stroke-linecap="round" fill="none"/><circle cx="36" cy="80" r="4.5" fill="#9FC6D8" stroke="${K}" stroke-width="2"/>`,
 hbbell:(A,B,K)=>`<path d="M50 10Q30 12 28 44 26 66 14 78H86Q74 66 72 44 70 12 50 10z" fill="#3A4450" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><rect x="38" y="4" width="24" height="9" rx="3" fill="#F2EFE6" stroke="${K}" stroke-width="3"/><rect x="10" y="76" width="80" height="9" rx="3" fill="#F2EFE6" stroke="${K}" stroke-width="3"/><circle cx="50" cy="90" r="6" fill="#D9A441" stroke="${K}" stroke-width="2.5"/>`});
TOWN_THEMES['Hale Harbor']={bg:'radial-gradient(120% 90% at 50% 0%,#3A4A55 0%,#26333C 55%,#10181d 100%)',a:'#E8A33D',b:'#9FC4D4',fx:null};

POWERUPS.anchor={name:'ANCHOR SET',desc:'+8 blocking for one match'};
POWERUPS.beacon={name:'BEACON EYE',desc:'+8 throwing for one match'};
PW_POOL.push(['anchor','beacon']);
UNL_J[3]=2;UNL_P[3]=2;JERSEY_NAMES.push('Trawl Knit');PANTS_NAMES.push('Dock Cuff');

/* ===== v2.73 JERSEY + PANTS STYLES ON THE NEW ART: each style is a small vector overlay, clipped to the jersey / the legs, switched on by the palette ===== */
const ART_JO=[
 '',   // 0 plain
 // 1 TANK: the shoulder wings are cut away to bare arm, with a stitched armhole
 '<g clip-path="url(#c15)"><g opacity="var(--jo1)"><path d="M20,70 L110,70 L112,96 Q104,150 86,190 L86,230 L20,230 Z" fill="var(--skin)"/><path d="M110,94 Q104,150 86,190" fill="none" stroke="#15111d" stroke-width="3.4" stroke-linecap="round"/><path d="M210,94 Q216,150 234,190" fill="none" stroke="#15111d" stroke-width="3.4" stroke-linecap="round"/><path d="M300,70 L210,70 L208,96 Q216,150 234,190 L234,230 L300,230 Z" fill="var(--skin)"/><path d="M112,98 Q104,150 88,188" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-dasharray="5 4"/><path d="M208,98 Q216,150 232,188" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-dasharray="5 4"/></g></g>',
 // 2 ARM STRIPES: two bands around each shoulder wing
 '<g clip-path="url(#c15)"><g opacity="var(--jo2)"><g fill="none" stroke-linecap="butt"><path d="M44,126 L82,134 M50,140 L84,150" stroke="#15111d" stroke-width="9.6"/><path d="M44,126 L82,134 M50,140 L84,150" stroke="var(--accent)" stroke-width="6.4"/><path d="M276,126 L238,134 M270,140 L236,150" stroke="#15111d" stroke-width="9.6"/><path d="M276,126 L238,134 M270,140 L236,150" stroke="var(--accent)" stroke-width="6.4"/></g></g></g>',
 // 3 TRAWL KNIT: a diamond net weave over the jersey, a chest band and a ribbed hem
 '<g clip-path="url(#c15)"><g opacity="var(--jo3)"><defs><pattern id="knitp" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0,4.5 L4.5,0 L9,4.5 L4.5,9 Z" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="1.2"/></pattern></defs><rect x="30" y="90" width="260" height="196" fill="url(#knitp)"/><rect x="85" y="196" width="150" height="14" fill="var(--accent)" opacity=".95"/><rect x="85" y="196" width="150" height="14" fill="none" stroke="#15111d" stroke-width="2.4"/><rect x="95" y="262" width="130" height="17" fill="#000" opacity=".22"/><path d="M99,262 V279 M107,262 V279 M115,262 V279 M123,262 V279 M131,262 V279 M139,262 V279 M147,262 V279 M155,262 V279 M163,262 V279 M171,262 V279 M179,262 V279 M187,262 V279 M195,262 V279 M203,262 V279 M211,262 V279" stroke="#000" stroke-opacity=".4" stroke-width="2"/></g></g>'];
const ART_PO=[
 '',
 // 1 DOUBLE STRIPE: two thin lines beside the outer stripe
 '<g opacity="var(--po1)" fill="none" stroke-linecap="round" stroke-linejoin="round"><g clip-path="url(#c1)"><path d="M113,298 L82,340 L85,400 L86,420 L94,432" stroke="#15111d" stroke-width="5.6"/><path d="M113,298 L82,340 L85,400 L86,420 L94,432" stroke="var(--accent)" stroke-width="3"/><path d="M121,298 L90,340 L93,400 L94,420 L101,430" stroke="#15111d" stroke-width="5.6"/><path d="M121,298 L90,340 L93,400 L94,420 L101,430" stroke="var(--accent)" stroke-width="3"/></g>'+
   '<g clip-path="url(#c7)"><path d="M207,298 L238,340 L235,400 L234,420 L226,432" stroke="#15111d" stroke-width="5.6"/><path d="M207,298 L238,340 L235,400 L234,420 L226,432" stroke="var(--accent)" stroke-width="3"/><path d="M199,298 L230,340 L227,400 L226,420 L219,430" stroke="#15111d" stroke-width="5.6"/><path d="M199,298 L230,340 L227,400 L226,420 L219,430" stroke="var(--accent)" stroke-width="3"/></g></g>',
 // 2 BLOCK STRIPE: one wide block down each outer leg
 '<g opacity="var(--po2)" fill="none" stroke-linecap="round" stroke-linejoin="round"><g clip-path="url(#c1)"><path d="M103,298 L71,340 L74,400 L75,420 L84,436" stroke="#15111d" stroke-width="21"/><path d="M103,298 L71,340 L74,400 L75,420 L84,436" stroke="var(--accent)" stroke-width="17"/><path d="M103,298 L71,340 L74,400 L75,420 L84,436" stroke="#fff" stroke-opacity=".5" stroke-width="3" transform="translate(-4,0)"/></g>'+
   '<g clip-path="url(#c7)"><path d="M217,298 L249,340 L246,400 L245,420 L236,436" stroke="#15111d" stroke-width="21"/><path d="M217,298 L249,340 L246,400 L245,420 L236,436" stroke="var(--accent)" stroke-width="17"/></g></g>',
 // 3 DOCK CUFF: a wide cuff and a rope line above the ankle
 '<g opacity="var(--po3)"><g clip-path="url(#c1)"><rect x="55" y="394" width="80" height="24" fill="var(--accent)"/><rect x="55" y="394" width="80" height="24" fill="none" stroke="#15111d" stroke-width="3"/><path d="M60,402 H130 M60,410 H130" stroke="#000" stroke-opacity=".35" stroke-width="2"/></g><g clip-path="url(#c7)"><rect x="185" y="394" width="80" height="24" fill="var(--accent)"/><rect x="185" y="394" width="80" height="24" fill="none" stroke="#15111d" stroke-width="3"/><path d="M190,402 H260 M190,410 H260" stroke="#000" stroke-opacity=".35" stroke-width="2"/></g></g>'];
function artStyled(view,celebrate=false){
  const C=artStyled.c||(artStyled.c={}),key=view+(celebrate?'|celebrate':'');if(C[key])return C[key];
  let t=ART.svg[view];
  if(celebrate){const open='<g data-layer="base_arms"><g transform="translate(0,7)">',close='</g></g>',a0=t.indexOf(open),a1=t.indexOf(close,a0+open.length),right=view==='f'?'<use href="#s25" fill="var(--skin)"/>':'<use href="#s24" fill="var(--skin)"/>';
    if(a0>=0&&a1>=0){const inner=t.slice(a0+open.length,a1),split=inner.indexOf(right);if(split>=0){const left=inner.slice(0,split),r=inner.slice(split),raised=open+'<g transform="rotate(112 90 140)">'+left+'</g><g transform="rotate(-112 230 140)">'+r+'</g></g></g>';t=t.slice(0,a0)+raised+t.slice(a1+close.length)}}}
  const jm='</g></g><g data-layer="base_face">',pm='</g><g data-layer="base_belt">';
  const ji=t.indexOf(jm),pi=t.indexOf(pm);
  if(ji>0&&pi>0&&pi<ji){t=t.slice(0,pi)+ART_PO.join('')+t.slice(pi,ji)+ART_JO.join('')+t.slice(ji)}
  return C[key]=t}

function matchKind(c){if(c.mystery||c.final)return{tag:'FINAL BOSS',mystery:1};if(c.captain)return{tag:'CAPTAIN \u00b7 '+String(c.boss||'').toUpperCase()};if(c.pickup)return{tag:'ROUTE PICKUP'};return{tag:'CREW GAME'}}
const muAvg=l=>{l=l.filter(Boolean);return l.length?Math.round(l.reduce((a,p)=>a+ovr(p),0)/l.length):0};
const muStar=l=>{l=l.filter(Boolean);return l.find(p=>p.pos==='QB')||l.slice().sort((a,b)=>ovr(b)-ovr(a))[0]};
let MU={on:false,t0:0,ready:false,tm:0,el:null};
function muEl(){if(MU.el)return MU.el;
  const st=document.createElement('style');st.textContent=`
#mu{position:fixed;inset:0;z-index:200;display:none;flex-direction:column;color:#fff;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;overflow:hidden;user-select:none;-webkit-user-select:none}
#mu.on{display:flex}
#mu .bgfx{position:absolute;inset:0;pointer-events:none;opacity:.5}
#mu .rain{background:repeating-linear-gradient(100deg,transparent 0 14px,rgba(120,220,255,.16) 14px 15px,transparent 15px 40px);background-size:120px 120px}
@keyframes murain{to{background-position:-40px 120px}}
#mu .holo{background:repeating-linear-gradient(0deg,rgba(255,47,168,.08) 0 2px,transparent 2px 5px)}
#mu .top{position:relative;display:flex;justify-content:space-between;align-items:center;padding:6px 14px 0;font-size:16px;font-weight:800;letter-spacing:.12em;line-height:22px;min-height:28px}
#mu .top .town{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;max-width:38%;color:var(--a);text-shadow:0 0 10px var(--a);border:2px solid var(--a);border-radius:12px;padding:0 10px;box-shadow:0 0 10px var(--a) inset}
#mu .top .tag{max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.06em;color:#fff;border:2px solid var(--b);border-radius:12px;padding:0 10px;text-shadow:0 0 8px var(--b);box-shadow:0 0 10px var(--b) inset}
#mu .mid{position:relative;flex:1;min-height:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:stretch;padding:0 10px}
#mu .pn{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0;min-height:0;padding:0 6px}
#mu .pn canvas{flex:1;min-height:0;width:100%;max-width:190px;object-fit:contain;filter:drop-shadow(0 0 12px var(--tc))}
#mu .pn.my{--tc:var(--c1)} #mu .pn.op{--tc:var(--c2)}
#mu .nm{font-weight:900;letter-spacing:.06em;text-align:center;line-height:1.05;text-shadow:0 0 12px var(--tc);max-width:100%;word-break:keep-all;padding:2px 0}
#mu .nr{display:flex;align-items:center;justify-content:center;gap:8px;max-width:100%;position:relative;z-index:1}#mu .nl{flex:none;width:46px;height:46px;filter:drop-shadow(0 0 8px var(--tc))}#mu .nr .nm{min-width:0}
#mu .ov{font-size:16px;font-weight:800;line-height:20px;color:#fff;letter-spacing:.1em}
#mu .ov b{display:inline-block;background:var(--tc);color:#0b0b10;border-radius:4px;padding:0 6px;margin-left:4px}
#mu .vs{align-self:center;width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:900;font-style:italic;background:radial-gradient(circle,#1a0f33 55%,#0b0714);border:3px solid var(--a);box-shadow:0 0 22px var(--a),0 0 40px var(--b) inset;text-shadow:0 0 12px var(--b);}
@keyframes muglow{from{box-shadow:0 0 12px var(--a),0 0 24px var(--b) inset}to{box-shadow:0 0 30px var(--a),0 0 50px var(--b) inset}}
#mu .bot{position:relative;padding:0 14px 6px;text-align:center}
#mu .first{font-size:16px;font-weight:800;letter-spacing:.14em;line-height:20px}
#mu .bar{height:6px;border-radius:3px;background:rgba(255,255,255,.15);margin:3px auto 3px;max-width:420px;overflow:hidden}
#mu .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--a),var(--b));transition:width .15s}
#mu .tap{font-size:16px;font-weight:900;letter-spacing:.2em;line-height:20px;color:var(--b);text-shadow:0 0 10px var(--b)}
#mu .tap.go{animation:mublink .8s steps(2) infinite}
@keyframes mublink{50%{opacity:.35}}
#mu .split{position:absolute;inset:0;pointer-events:none}
#mu .split i{position:absolute;inset:0}
#mu .hl{clip-path:polygon(0 0,56% 0,44% 100%,0 100%);background:linear-gradient(90deg,rgba(4,4,10,.9),rgba(8,8,16,.6))}
#mu .hr{clip-path:polygon(56% 0,100% 0,100% 100%,44% 100%);background:linear-gradient(100deg,rgba(0,0,0,.45) 0,var(--c2) 105%);opacity:.8}
#mu .hl::after,#mu .hr::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,var(--dc) 1.3px,transparent 1.8px) 0 0/9px 9px;-webkit-mask-image:linear-gradient(var(--md),#000 0,transparent 75%);mask-image:linear-gradient(var(--md),#000 0,transparent 75%)}
#mu .hl{--dc:var(--c1);--md:90deg} #mu .hr{--dc:rgba(0,0,0,.45);--md:270deg}
#mu .sl{clip-path:polygon(51% 0,60% 0,49% 100%,40% 100%);background:repeating-linear-gradient(77deg,transparent 0 7px,var(--a) 7px 9px);opacity:.85}
#mu .pn{position:relative}
#mu .pn .lg{position:absolute;left:50%;top:44%;width:min(100%,72vh);aspect-ratio:1;transform:translate(-50%,-50%);opacity:.6;pointer-events:none}
#mu .pn.my .lg,#mu .pn.op .lg{left:50%;top:42%;width:min(92%,60vh)}
#mu .pn canvas,#mu .pn .nm,#mu .pn .ov{position:relative;z-index:1}
#mu.myst .pn.op .lg{filter:brightness(0);opacity:.3}
#mu.myst canvas{filter:brightness(0) drop-shadow(0 0 12px var(--tc))}`;
  document.head.appendChild(st);
  const d=document.createElement('div');d.id='mu';d.innerHTML='<div class="split"><i class="hl"></i><i class="hr"></i><i class="sl"></i></div><div class="bgfx fx1"></div><div class="bgfx fx2"></div><div class="top"><span class="town"></span><span class="tag"></span></div><div class="mid"><div class="pn my"><div class="lg"></div><div class="nr"><div class="nm"></div></div><div class="ov"></div></div><div class="vs">VS</div><div class="pn op"><div class="lg"></div><div class="nr"><div class="nm"></div></div><div class="ov"></div></div></div><div class="bot"><div class="first"></div><div class="bar"><i></i></div><div class="tap">LOADING</div></div>';
  document.body.appendChild(d);MU.el=d;
  const tapIt=e=>{if(!MU.on||!MU.ready)return;if(e&&e.type==='keydown'&&!/^(Enter| |Spacebar)$/.test(e.key))return;e&&e.preventDefault&&e.preventDefault();muClose()};
  d.addEventListener('pointerdown',tapIt);window.addEventListener('keydown',e=>{if(MU.on&&MU.ready)tapIt(e);else if(MU.on)e.stopPropagation()},true);
  return d}
function muFit(el){let f=22;el.style.whiteSpace='nowrap';el.style.fontSize=f+'px';while(f>16&&el.scrollWidth>el.clientWidth){f--;el.style.fontSize=f+'px'}if(el.scrollWidth>el.clientWidth)el.style.whiteSpace='normal'}   // long names shrink first (never below 12 pt), then wrap: never cut off
function muStarDraw(cv,uni,d,mystery,tries){if(!cv.isConnected)return;const m0=ART.miss,dpr=Math.min(window.devicePixelRatio||1,2.5),w=cv.clientWidth||120,h=cv.clientHeight||150;
  if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr)}
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);const lk=lookOf(d),S=Math.min((h-8)/16.6,w/12);
  try{renderPerson(g,{art:true,x:w/2,y:h-4,S:S*(lk.h||1),view:'f',flip:1,speed:0,phi:0,cx:0,sa:0,uni,look:lk,gear:null,num:d.pos==='QB'?7:12,star:false,t:0,hasBall:false,preview:true,tname:'',lname:null})}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  if(ART.on&&ART.miss>m0&&(tries||0)<60)setTimeout(()=>muStarDraw(cv,uni,d,mystery,(tries||0)+1),100)}
function muCoreProgress(){const R=ART.run;if(!ART.on||!R.on||!R.inited||!F||!F.all)return{n:0,r:0,ok:true};const nd=R.need&&R.need.length?R.need:[];const n1=nd.n1===undefined?nd.length:nd.n1;let r=0;for(let i=0;i<n1;i++)if(R.ready.has(nd[i][0].key+'|'+nd[i][1]))r++;return{n:n1,r,ok:!n1||r>=n1}}
function showMatchup(crew,done){const d=muEl(),th=TOWN_THEMES[crew.town]||TOWN_FALLBACK,kind=matchKind(crew);MU.done=done;MU.crew=crew;
  d.style.background=th.bg;d.style.setProperty('--a',th.a);d.style.setProperty('--b',th.b);d.style.setProperty('--c1',SAVE.uni.jc);d.style.setProperty('--c2',(G.oppUni||crew.uni).jc);
  d.querySelector('.fx1').className='bgfx fx1'+(th.fx==='rain'?' rain':'');d.querySelector('.fx2').className='bgfx fx2'+(th.holo?' holo':'');
  d.classList.toggle('myst',!!kind.mystery);d.querySelector('.town').textContent=String(crew.town||'').toUpperCase();d.querySelector('.tag').textContent=kind.tag;
  const my=Object.values(SAVE.starters||{}),op=crew.roster||[],pn=d.querySelectorAll('.pn');
  const _muOppPort=(()=>{const b=String(crew.boss||crew.name||'');if(/\brita\b/i.test(b))return'Assets/portraits/rita_hyped.webp';if(/\bbram\b/i.test(b))return'Assets/portraits/bram_hyped.webp';if(/\bmo\b/i.test(b)||crew.id==='captain')return'Assets/portraits/mo_hyped.webp';return null})();
  pn[0].querySelector('.lg').innerHTML=(!kind.mystery&&_muOppPort)?'<img class="mu-port" src="Assets/portraits/eli.webp" alt="Eli">':myLogoHTML('100%');
  pn[1].querySelector('.lg').innerHTML=(!kind.mystery&&_muOppPort)?'<img class="mu-port mu-port-opp" src="'+_muOppPort+'" alt="'+String(crew.boss||crew.name||'').replace(/"/g,'')+'">':logoSVG(crewLogo(crew),(G.oppUni||crew.uni).jc,crew.town,{bg:1});
  {const _cs=(typeof CREW_STYLE!=='undefined'&&CREW_STYLE[crew.id])||null;const _map={press:'PRESS COVERAGE',disguise:'DISGUISED SHELLS',edgeHeat:'EDGE HEAT',bait:'ROUTE BAITERS',bite:'RUN BLITZERS',strong:'HEAVY STRONG BOX',nochase:'CONTAIN ZONE',clamp:'CLAMP COVERAGE'};
   let sc=d.querySelector('.mu-scout');if(!sc){sc=document.createElement('div');sc.className='mu-scout';const ft=d.querySelector('.first');if(ft&&ft.parentNode)ft.after(sc)}
   const tags=_cs?Object.keys(_cs).map(k=>_map[k]).filter(Boolean):[];sc.textContent=(!kind.mystery&&tags.length)?'SCOUTING: '+tags.join(' · '):'';sc.hidden=!sc.textContent}
  pn[0].querySelector('.nm').textContent=(SAVE.teamName||'Your Team').toUpperCase();pn[0].querySelector('.ov').innerHTML='OVR<b>'+muAvg(my)+'</b>';
  pn[1].querySelector('.nm').textContent=kind.mystery?'? ? ?':String(crew.name).toUpperCase();pn[1].querySelector('.ov').innerHTML='OVR<b>'+(kind.mystery?'??':muAvg(op))+'</b>';
  d.querySelector('.first').textContent='FIRST TO '+crew.target+' WINS';d.querySelector('.bar i').style.width='0%';const tp=d.querySelector('.tap');tp.textContent='LOADING';tp.classList.remove('go');
  MU.on=true;MU.ready=false;MU.t0=performance.now();MU.capped=false;d.classList.add('on');
  requestAnimationFrame(()=>{muFit(pn[0].querySelector('.nm'));muFit(pn[1].querySelector('.nm'));});
  clearInterval(MU.tm);MU.tm=setInterval(()=>{const el=performance.now()-MU.t0,pr=muCoreProgress();d.querySelector('.bar i').style.width=Math.round(100*Math.min(1,Math.min(1,el/2000)*.4+.6*(pr.n?pr.r/pr.n:1)))+'%';
    if(!MU.ready&&el>=2000&&pr.ok){MU.ready=true}else if(!MU.ready&&el>=8000){MU.ready=true;MU.capped=true;ART.introCap=(ART.introCap||0)+1;try{console.log('matchup intro: 8 s cap reached with',pr.r+'/'+pr.n,'core sets baked')}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
    if(MU.ready){clearInterval(MU.tm);ART.introMs=Math.round(el);tmark('introReady',Math.round(el)+'ms'+(MU.capped?' CAPPED':''));ART.introLast={ms:Math.round(el),capped:MU.capped,r:pr.r,n:pr.n};const t=d.querySelector('.tap');t.textContent='TAP TO PLAY';t.classList.add('go');clearTimeout(MU.auto);MU.auto=0;   /* Keep the matchup on screen until the player explicitly taps TAP TO PLAY. */d.querySelector('.bar i').style.width='100%'}},100)}
function muClose(){clearInterval(MU.tm);clearTimeout(MU.auto);if(MU.playerFrame)cancelAnimationFrame(MU.playerFrame);MU.playerFrame=0;MU.on=false;MU.el.classList.remove('on');const f=MU.done;MU.done=null;if(f)f()}

/* ============ Vapor City native wildlife: code-drawn mice & crows matching owCat vector style ============ */
const VC_CRIT={lt:0,ents:null};
function vcMakeCrits(){
  const R=Math.random,E=[];
  // Mice scurrying near alley & service dumpsters (Glitch Cats, Scrap Kings, Pawn & Trade)
  E.push({k:'mouse',x:11.1,y:16.1,x0:10.8,x1:12.2,st:'idle',t:1+R()*2,dir:1,sd:R()*9});
  E.push({k:'mouse',x:20.2,y:16.1,x0:19.6,x1:20.9,st:'idle',t:1.6+R()*2,dir:-1,sd:R()*9});
  E.push({k:'mouse',x:28.0,y:33.8,x0:27.2,x1:28.7,st:'idle',t:1.2+R()*2,dir:-1,sd:R()*9});
  // Crows perched on Arena roof & Pawn & Trade roof
  for(const [x,y,d] of [[9.55,7.35,1],[21.7,7.35,-1],[24.5,35.1,-1]])E.push({k:'crow',perch:1,x,y,hx:x,hy:y,dir:d,st:'idle',t:2+R()*4,al:1,lift:0,sd:R()*9});
  // Plaza crows that peck on the ground and flutter away when Eli walks near
  for(const [x,y] of [[14.5,10.6],[17.6,10.85]])E.push({k:'crow',perch:0,x,y,hx:x,hy:y,dir:R()<.5?1:-1,st:'idle',t:1+R()*2,al:1,lift:0,sd:R()*9});
  return E;
}
function vcCritStep(dt){
  const E=VC_CRIT.ents,R=Math.random;
  for(const a of E){
    if(a.k==='mouse'){
      a.t-=dt;
      if(a.st==='idle'){if(a.t<=0){a.st='walk';a.tx=a.x0+R()*(a.x1-a.x0);a.dir=a.tx>a.x?1:-1}}
      else{const d=a.tx-a.x;if(Math.abs(d)<.05){a.st='idle';a.t=1.2+R()*2.8}else a.x+=Math.sign(d)*Math.min(Math.abs(d),1.55*dt)}
    }else if(a.k==='crow'){
      if(a.perch){a.t-=dt;if(a.t<=0){a.dir=-a.dir;a.t=2.8+R()*4.5}}
      else{
        const dE=Math.hypot(OW.px-a.x,OW.py-a.y);
        if(a.st==='idle'){
          a.t-=dt;
          if(a.t<=0){a.t=1.4+R()*2.8;if(R()<.5)a.dir=-a.dir;else a.x=Math.max(a.hx-.45,Math.min(a.hx+.45,a.x+a.dir*.14))}
          if(dE<1.8){a.st='fly';a.t=0;a.dir=a.x>=OW.px?1:-1}
        }else if(a.st==='fly'){
          a.t+=dt;a.x+=a.dir*2.7*dt;a.lift+=2.3*dt;a.al=Math.max(0,1-Math.max(0,a.t-.65)/.7);
          if(a.t>1.35){a.st='gone';a.t=7+R()*5}
        }else if(a.st==='gone'){
          a.t-=dt;if(a.t<=0&&Math.hypot(OW.px-a.hx,OW.py-a.hy)>3.2){a.st='land';a.x=a.hx;a.y=a.hy;a.lift=0;a.al=0;a.t=0}
        }else if(a.st==='land'){
          a.al=Math.min(1,a.al+dt*2.2);if(a.al>=1){a.st='idle';a.t=1+R()*2}
        }
      }
    }
  }
}
function vcCritEnts(){
  if(!M||M.id!=='street')return[];
  if(!VC_CRIT.ents)VC_CRIT.ents=vcMakeCrits();
  const now=performance.now()/1000,dt=Math.min(.1,Math.max(0,now-(VC_CRIT.lt||now)));VC_CRIT.lt=now;
  vcCritStep(dt);
  return VC_CRIT.ents.filter(a=>a.st!=='gone').map(a=>({y:a.y,a}));
}
function owMouse(a,tm){
  const sx=a.x*OWT+OWT/2,sy=a.y*OWT+OWT-5,s=OWT/48,f=a.dir<0?-1:1,mv=a.st==='walk',bob=mv?Math.abs(Math.sin(tm*18+a.sd))*2.2:0;
  og.save();og.translate(sx,sy);og.scale(f*s,s);
  og.fillStyle='rgba(0,0,0,.38)';og.beginPath();og.ellipse(0,0,10,3.2,0,0,7);og.fill();
  const wag=Math.sin(tm*(mv?14:4)+a.sd)*3.5;
  og.strokeStyle='#d98fa8';og.lineWidth=2.2;og.lineCap='round';og.beginPath();og.moveTo(-8,-3-bob);og.quadraticCurveTo(-16,-4+wag*.5,-21,-9+wag);og.stroke();
  og.fillStyle='#5c6070';og.beginPath();og.ellipse(-1,-5-bob,8.5,5.2,0,0,7);og.fill();
  og.fillStyle='#434654';og.beginPath();og.ellipse(-5,-4-bob,4,3.8,.2,0,7);og.fill();
  og.fillStyle='#7c8094';og.beginPath();og.ellipse(0,-7.2-bob,5.5,2.2,-.1,0,7);og.fill();
  og.fillStyle='#6c7082';og.beginPath();og.moveTo(5,-8.5-bob);og.lineTo(13,-4.5-bob);og.lineTo(5,-2-bob);og.closePath();og.fill();
  og.fillStyle='#4e5262';og.beginPath();og.arc(3.5,-10-bob,3.4,0,7);og.fill();
  og.fillStyle='#ff9bd8';og.beginPath();og.arc(3.8,-10-bob,1.9,0,7);og.fill();
  og.fillStyle='#ff9bd8';og.beginPath();og.arc(13.2,-4.6-bob,1.5,0,7);og.fill();
  og.fillStyle='#090b12';og.beginPath();og.arc(8.2,-6.1-bob,1.2,0,7);og.fill();
  og.fillStyle='#e8f4ff';og.fillRect(8.5,-6.8-bob,.7,.7);
  const st=mv?Math.sin(tm*20+a.sd)*2.2:0;
  og.fillStyle='#d98fa8';og.fillRect(-5+st,-1.5,3,1.8);og.fillRect(3-st,-1.5,3,1.8);
  og.restore();
}
function owCrow(a,tm){
  const fly=a.st==='fly',sx=a.x*OWT+OWT/2,sy=(a.y-a.lift)*OWT+OWT-5,s=OWT/44,f=a.dir<0?-1:1;
  const peck=!fly&&Math.sin(tm*2.2+a.sd)>.86?1:0;
  og.save();og.globalAlpha=a.al!=null?a.al:1;
  if(!fly){og.fillStyle='rgba(0,0,0,.38)';og.beginPath();og.ellipse(sx,a.y*OWT+OWT-4,8*s,2.8*s,0,0,7);og.fill()}
  og.translate(sx,sy);og.scale(f*s,s);
  if(!fly){og.strokeStyle='#3a3d4a';og.lineWidth=1.8;og.beginPath();og.moveTo(-2,-5);og.lineTo(-2,0);og.moveTo(2,-5);og.lineTo(2,0);og.stroke()}
  og.fillStyle='#0b0e18';og.beginPath();og.moveTo(-7,-8);og.lineTo(-16,-4);og.lineTo(-14,-11);og.closePath();og.fill();
  og.fillStyle='#151a2a';og.beginPath();og.ellipse(-1,-10,8.5,5.5,-.2,0,7);og.fill();
  if(fly){
    const fl=Math.sin(tm*22+a.sd)*10;
    og.fillStyle='#242d46';og.beginPath();og.moveTo(-2,-11);og.quadraticCurveTo(-5,-22+fl,-14,-16+fl);og.lineTo(-4,-8);og.closePath();og.fill();
    og.fillStyle='#1b2238';og.beginPath();og.moveTo(1,-10);og.quadraticCurveTo(4,-20-fl*0.6,-5,-18-fl*0.6);og.lineTo(-1,-8);og.closePath();og.fill();
  }else{
    og.fillStyle='#242d46';og.beginPath();og.ellipse(-3,-10.5,6.5,3.2,-.25,0,7);og.fill();
    og.strokeStyle='#3d4c73';og.lineWidth=1;og.beginPath();og.arc(-2,-11.5,5,-.9,.2);og.stroke();
  }
  const hx=peck?8:6.5,hy=peck?-11.5:-15.5;
  og.fillStyle='#192034';og.beginPath();og.arc(hx,hy,4.6,0,7);og.fill();
  og.fillStyle='#4a5568';og.beginPath();og.moveTo(hx+3.5,hy-1.2);og.lineTo(hx+10.5,hy+.5+(peck?2:0));og.lineTo(hx+3.2,hy+2);og.closePath();og.fill();
  og.fillStyle='#ffd23a';og.beginPath();og.arc(hx+1.8,hy-.8,1.2,0,7);og.fill();
  og.fillStyle='#06080f';og.beginPath();og.arc(hx+2.0,hy-.8,.55,0,7);og.fill();
  og.restore();
}
function vcCritDraw(a,tm){if(a.k==='mouse')owMouse(a,tm);else if(a.k==='crow')owCrow(a,tm)}


