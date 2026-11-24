/* Circuit Football RPG — functional tabbed Overworld menu.
   Existing game controls are moved intact so their original handlers/state remain authoritative. */
(() => {
 const boot=()=>{
  const menu=document.getElementById('menu');
  if(!menu||menu.dataset.uiMenuReady==='1')return;
  menu.dataset.uiMenuReady='1';
  const cachedIds=['mSquad','mTeam','mUpg','mGoals','mFb','mSave','mSaveSt','mMus','mSfx','mVol','mHap','mCam','mLT','mRS','mReset','mRO','mPL','mPR','mTown','mBuild','m3D','mSnd','crewList','owObj','owTown'];
  const elementCache=new Map(cachedIds.map(id=>[id,document.getElementById(id)]).filter(([,el])=>!!el));
  const byId=id=>elementCache.get(id)||document.getElementById(id);
  const oldLogo=menu.querySelector('.logo'),oldSub=menu.querySelector('.sub');
  const oldTagline=[...menu.querySelectorAll('p.note')].find(el=>/^Walk Vapor City/i.test(el.textContent.trim()));
  const town=oldSub&&oldSub.textContent.trim()||'CIRCUIT FOOTBALL';
  const creditSource=[...menu.querySelectorAll('p.note,.note')].find(el=>/^Sound credits:/i.test(el.textContent.trim()));
  const creditText=creditSource&&creditSource.textContent.trim()||'';
  const build=byId('mBuild'),buildDetailsInitial=build&&build.textContent.trim(),crewList=byId('crewList');
  const head=document.createElement('header');head.className='ui-menu-head';
  head.innerHTML='<button type="button" class="ui-menu-close" aria-label="Back to town">×</button><div class="ui-menu-brand"><div class="ui-menu-mark" aria-hidden="true">CF</div><div><div class="ui-menu-title">CIRCUIT FOOTBALL</div><div class="ui-menu-town"></div></div></div><button type="button" class="ui-menu-upg">UPG</button>';
  const updateHeader=()=>{const liveTown=byId('owTown');head.querySelector('.ui-menu-town').textContent=liveTown&&liveTown.textContent.trim()||town;const upg=byId('mUpg');const value=upg&&upg.textContent.match(/\(([^)]+)\)/);head.querySelector('.ui-menu-upg').textContent='UPG '+(value?value[1]:'0')};
  updateHeader();
  const upgControl=byId('mUpg');if(upgControl){const old=upgControl.closest('.btnrow');upgControl.hidden=true;upgControl.setAttribute('aria-hidden','true');menu.appendChild(upgControl);if(old&&!old.querySelector('button,input,select'))old.remove()}
  const goal=document.createElement('section');goal.className='ui-menu-goal';
  goal.innerHTML='<div class="ui-menu-eyebrow">CURRENT GOAL</div><div class="ui-menu-goal-text"></div>';
  const goalText=goal.querySelector('.ui-menu-goal-text');
  const defaultGoal=oldTagline&&oldTagline.textContent.trim()||'Beat the street crews, upgrade your players, then take on the Netrunners.';
  const updateGoal=()=>{const src=byId('owObj'),raw=src&&src.textContent.trim()||'';const statusOnly=/^CLEARED\b/i.test(raw)||/^UPG\s*\d+/i.test(raw);goalText.textContent=raw&&!statusOnly?raw:defaultGoal};
  updateGoal();
  const tabs=document.createElement('div');tabs.className='ui-menu-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Menu sections');tabs.style.display='grid';tabs.style.visibility='visible';
  const content=document.createElement('div');content.className='ui-menu-content';
  const pane=(id,title)=>{const el=document.createElement('section');el.className='ui-menu-pane';el.id=id;el.setAttribute('role','tabpanel');el.setAttribute('aria-label',title);content.appendChild(el);return el};
  const home=pane('uiMenuHome','Menu'),settings=pane('uiMenuSettings','Settings'),credits=pane('uiMenuCredits','Credits');
  const footer=document.createElement('footer');footer.className='ui-menu-foot';
  const dev=document.createElement('section');dev.className='ui-menu-dev';dev.hidden=true;
  const devTitle=document.createElement('div');devTitle.className='ui-menu-dev-title';devTitle.textContent='DEVELOPER / TEST DRAWER';dev.appendChild(devTitle);
  const artAction=build&&build.onclick;if(build)build.onclick=null;
  let taps=0,tapTimer;
  if(build){build.textContent='BUILD INFO';build.classList.add('ui-menu-build-trigger');build.setAttribute('role','button');build.setAttribute('tabindex','0');build.setAttribute('aria-label','Build information. Five taps open developer and test tools');build.setAttribute('aria-expanded','false');
   build.addEventListener('click',()=>{taps++;clearTimeout(tapTimer);tapTimer=setTimeout(()=>{taps=0},1800);if(taps>=5){dev.hidden=!dev.hidden;taps=0;build.setAttribute('aria-expanded',String(!dev.hidden))}});
   build.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();build.click()}});
  }
  const card=(parent,title,extra)=>{const box=document.createElement('section');box.className='ui-menu-card'+(extra?' '+extra:'');if(title){const h=document.createElement('h3');h.className='ui-menu-card-title';h.textContent=title;box.appendChild(h)}parent.appendChild(box);return box};
  const assetStatusCard=card(dev,'ASSET STATUS');
  const buildDetailsCard=card(dev,'BUILD DETAILS');
  const buildDetailsText=document.createElement('p');buildDetailsText.className='ui-menu-build-details';buildDetailsText.textContent=buildDetailsInitial||'Build metadata will appear here.';buildDetailsCard.appendChild(buildDetailsText);
  const moveAssetStatus=()=>['mSnd','mKKF'].forEach(id=>{const el=document.getElementById(id);if(el&&el.parentNode!==assetStatusCard)assetStatusCard.appendChild(el)});
  moveAssetStatus();
  if(window.MutationObserver){const assetObserver=new MutationObserver(moveAssetStatus);assetObserver.observe(menu,{childList:true,subtree:true})}
  const decorateAction=(el,icon,title,sub)=>{if(!el)return;el.classList.add('ui-menu-icon-card');el.innerHTML='<span class="ui-menu-icon" aria-hidden="true">'+icon+'</span><span class="ui-menu-action-copy"><strong>'+title+'</strong><small>'+sub+'</small></span><span class="ui-menu-card-arrow" aria-hidden="true">↗</span>'};
  const icon=(paths)=>'<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+paths+'</svg>';
  const actions=card(home,'','ui-menu-actions ui-menu-grid');
  const support=card(home,'DATA & SUPPORT','ui-menu-actions ui-menu-support');
  const moveControl=(id,parent,label,action)=>{
   const el=byId(id);if(!el)return;
   const old=el.closest('.btnrow');
   if(action){el.removeAttribute('style');parent.appendChild(el)}
   else {const row=document.createElement('div');row.className='ui-menu-setting';const txt=document.createElement('span');txt.className='ui-menu-setting-label';const glyph=({MUSIC:'♫',EFFECTS:'✦',HAPTICS:'⌁','RUNNER CAMERA':'◉','LITE EFFECTS':'☼',RESOLUTION:'▦','RESET PROGRESS':'⚠'}[label]||'•');txt.innerHTML='<span class="ui-setting-icon" aria-hidden="true">'+glyph+'</span><span>'+label+'</span>';row.appendChild(txt);el.removeAttribute('style');row.appendChild(el);parent.appendChild(row)}
   if(old&&!old.querySelector('button,input,select'))old.remove();
  };

  ['mTeam','mGoals'].forEach(id=>moveControl(id,actions,'',true));
  byId('mTeam').dataset.uiTile='team';decorateAction(byId('mTeam'),icon('<path d="M8 4h8l2 3 3 1-2 12H5L3 8l3-1 2-3Z"/><path d="M9 4c0 2 1 3 3 3s3-1 3-3"/><path d="M8 12h8"/>'),'MY TEAM','Build your lineup');
  const squadControl=byId('mSquad');if(squadControl){squadControl.hidden=true;squadControl.setAttribute('aria-hidden','true');}
  byId('mGoals').dataset.uiTile='goals';decorateAction(byId('mGoals'),icon('<path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 12v5m-4 3h8m-7-3h6"/>'),'GOALS & STATS','Challenges and records');
  const upgradeButton=document.createElement('button');upgradeButton.type='button';upgradeButton.className='ui-menu-icon-card';upgradeButton.setAttribute('aria-label','Open upgrades');
  upgradeButton.innerHTML='<span class="ui-menu-icon" aria-hidden="true">'+icon('<path d="M12 3 20 6v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z"/><path d="M12 7v8m-4-4h8"/>')+'</span><span class="ui-menu-action-copy"><strong>UPGRADES</strong><small>Improve your starters</small></span><span class="ui-menu-card-arrow" aria-hidden="true">↗</span>';
  upgradeButton.dataset.uiTile='upgrades';upgradeButton.addEventListener('click',()=>{const control=byId('mUpg');if(control)control.click()});
  actions.prepend(upgradeButton);
  const playbookButton=document.createElement('button');playbookButton.type='button';playbookButton.className='ui-menu-playbook ui-menu-icon-card';playbookButton.dataset.uiTile='playbook';playbookButton.setAttribute('aria-label','Open playbook');playbookButton.innerHTML='<span class="ui-menu-icon" aria-hidden="true">'+icon('<path d="M4 18V6m0 12h16M7 15l4-4 3 2 5-7"/><path d="m16 6 3 0 0 3"/>')+'</span><span class="ui-menu-action-copy"><strong>PLAYBOOK</strong><small>'+(window.SG&&Array.isArray(window.SG.PLAYS)?window.SG.PLAYS.length:0)+' plays · Pick your call</small></span><span class="ui-menu-card-arrow" aria-hidden="true">↗</span>';actions.insertBefore(playbookButton,byId('mGoals'));
  const playbookOverlay=document.createElement('section');playbookOverlay.className='ui-menu-playbook-overlay';playbookOverlay.hidden=true;playbookOverlay.setAttribute('role','dialog');playbookOverlay.setAttribute('aria-modal','true');playbookOverlay.setAttribute('aria-label','Playbook');
  playbookOverlay.innerHTML='<header class="ui-menu-playbook-head"><button type="button" class="ui-menu-playbook-back" aria-label="Back to menu">←</button><div><div class="ui-menu-eyebrow">CIRCUIT FOOTBALL</div><h2>PLAYBOOK</h2></div><span class="ui-menu-playbook-count"></span><button type="button" class="ui-menu-playbook-flip" aria-pressed="false">FLIP</button></header><nav class="ui-menu-playbook-filters" aria-label="Filter plays"><button type="button" data-filter="ALL" aria-pressed="true">ALL</button><button type="button" data-filter="RUN" aria-pressed="false">RUN</button><button type="button" data-filter="PASS" aria-pressed="false">PASS</button><button type="button" data-filter="TRICK" aria-pressed="false">TRICK</button></nav><div class="ui-menu-playbook-list"></div>';
  const playList=playbookOverlay.querySelector('.ui-menu-playbook-list'),playCount=playbookOverlay.querySelector('.ui-menu-playbook-count');
  let selectedPlayId=null;
  const playColors={WR1:'#F5B841',WR2:'#4DE1F2',TE:'#34D399',RB:'#FF79B8'};
  const playStarts={WR1:[28,67],WR2:[152,67],TE:[112,67],RB:[101,70]};
  const playDiagram=p=>{const paths=[];if(p.routes){for(const [role,steps] of Object.entries(p.routes)){const start=playStarts[role]||[90,67];let x=start[0],y=start[1],d='M '+x+' '+y;for(const step of steps||[]){x=Math.max(8,Math.min(172,x+Number(step[0]||0)*2.2));y=Math.max(9,Math.min(70,y-Number(step[1]||0)*1.65));d+=' L '+x.toFixed(1)+' '+y.toFixed(1)}paths.push('<path d="'+d+'" stroke="'+(playColors[role]||'#F5F7FA')+'"/>')}}else{const d=p.id==='run_out'?'M 90 68 L 112 53 L 157 44':'M 90 68 L 99 53 L 91 29';paths.push('<path d="'+d+'" stroke="#F5B841"/>')}const player=(x,y,color)=>'<circle cx="'+x+'" cy="'+y+'" r="3.2" fill="'+color+'" stroke="#0b1020" stroke-width="1"/>';return '<svg class="ui-play-diagram" viewBox="0 0 180 78" role="img" aria-label="'+(p.name||'Football')+' route diagram"><defs><marker id="play-arrow-'+p.id+'" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0 L5 2.5 L0 5Z" fill="#F5F7FA"/></marker></defs><rect x="3" y="5" width="174" height="68" rx="6" fill="#101827" stroke="#34445A"/><path d="M3 22H177 M3 39H177 M3 56H177" stroke="#25354B" stroke-width=".8" stroke-dasharray="3 4"/><path d="M3 61H177" stroke="#F5F7FA" stroke-opacity=".45" stroke-dasharray="2 3"/><g fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#play-arrow-'+p.id+')">'+paths.join('')+'</g>'+player(90,69,'#F5F7FA')+player(101,70,'#FF79B8')+player(28,67,playColors.WR1)+player(152,67,playColors.WR2)+player(112,67,playColors.TE)+'</svg>'};
  const selectPlay=id=>{selectedPlayId=id;playList.querySelectorAll('.ui-menu-play-card').forEach(el=>el.classList.toggle('is-selected',el.dataset.playId===id))};
  playbookOverlay.querySelector('.ui-menu-playbook-flip').addEventListener('click',e=>{const flipped=playList.classList.toggle('is-flipped');e.currentTarget.setAttribute('aria-pressed',String(flipped))});
  const renderPlaybook=filter=>{
   const plays=window.SG&&Array.isArray(window.SG.PLAYS)?window.SG.PLAYS:[];
   const shown=plays.filter(p=>filter==='ALL'||p.tag===filter);playList.replaceChildren();playCount.textContent=plays.length+' PLAYS';
   shown.forEach(p=>{const item=document.createElement('article');item.className='ui-menu-play-card';item.dataset.playId=p.id||p.name;item.setAttribute('role','button');item.tabIndex=0;const top=document.createElement('div');top.className='ui-menu-play-card-top';const name=document.createElement('strong');name.textContent=p.name||'Untitled play';const tag=document.createElement('span');tag.textContent=p.tag||'PLAY';top.append(name,tag);const diagram=document.createElement('div');diagram.className='ui-menu-play-diagram-wrap';diagram.innerHTML=playDiagram(p);const desc=document.createElement('p');desc.textContent=p.blurb||'A play in your playbook.';item.append(top,diagram,desc);item.addEventListener('click',()=>selectPlay(item.dataset.playId));item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectPlay(item.dataset.playId)}});playList.appendChild(item)});
   if(!shown.length){const empty=document.createElement('p');empty.className='ui-menu-play-empty';empty.textContent='No plays in this category yet.';playList.appendChild(empty)}
   if(!shown.some(p=>(p.id||p.name)===selectedPlayId))selectedPlayId=shown[0]&&(shown[0].id||shown[0].name)||null;selectPlay(selectedPlayId);
   playbookOverlay.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));

   if(!shown.length){const empty=document.createElement('p');empty.className='ui-menu-play-empty';empty.textContent='No plays in this category yet.';playList.appendChild(empty)}
   playbookOverlay.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
  };
  playbookOverlay.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>renderPlaybook(b.dataset.filter)));
  const closePlaybook=()=>{playbookOverlay.hidden=true;playbookButton.focus()};
  playbookOverlay.querySelector('.ui-menu-playbook-back').addEventListener('click',closePlaybook);
  playbookButton.addEventListener('click',()=>{renderPlaybook('ALL');playbookOverlay.hidden=false;playbookOverlay.querySelector('.ui-menu-playbook-back').focus()});
  playbookOverlay.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closePlaybook()}});
  ['mFb','mSave'].forEach(id=>moveControl(id,support,'',true));
  const saveStatus=byId('mSaveSt');if(saveStatus)support.appendChild(saveStatus);
  actions.append(byId('mTeam'),playbookButton,byId('mGoals'));
  decorateAction(byId('mFb'),icon('<path d="M4 5h16v11H8l-4 4V5Z"/><path d="M8 9h8M8 12h5"/>'),'SEND FEEDBACK','Share a bug or idea');
  decorateAction(byId('mSave'),icon('<path d="M5 3h12l4 4v14H3V3h2Z"/><path d="M7 3v6h10V3M7 21v-8h10v8"/>'),'SAVE CODE','Back up your progress');
  support.append(byId('mFb'),byId('mSave'));if(saveStatus)support.appendChild(saveStatus);
  if(crewList)home.appendChild(crewList);
  const audio=card(settings,'AUDIO');
  moveControl('mMus',audio,'MUSIC',false);moveControl('mSfx',audio,'EFFECTS',false);
  const compactValue=(id,prefix,label)=>{const el=byId(id);if(!el)return;el.classList.add('ui-menu-toggle-pill');const sync=()=>{const raw=el.textContent.trim(),clean=raw.replace(new RegExp('^'+prefix+'\\s*:\\s*','i'),'');if(clean!==raw)el.textContent=clean;el.setAttribute('aria-label',label+': '+clean);if(/^(ON|OFF)$/i.test(clean))el.setAttribute('aria-pressed',String(clean.toUpperCase()==='ON'))};sync();if(window.MutationObserver)new MutationObserver(sync).observe(el,{childList:true,subtree:true,characterData:true})};
  compactValue('mMus','MUSIC','Music');compactValue('mSfx','EFFECTS','Effects');compactValue('mHap','HAPTICS','Haptics');compactValue('mCam','CAMERA','Runner camera');compactValue('mLT','LITE EFFECTS','Lite effects');
  const vol=byId('mVol');
  if(vol){const old=vol.closest('.btnrow'),row=document.createElement('div');row.className='ui-menu-setting';const label=document.createElement('label');label.className='ui-menu-setting-label';label.innerHTML='<span class="ui-setting-icon" aria-hidden="true">♪</span><span>VOLUME</span>';label.htmlFor='mVol';row.append(label,vol);audio.appendChild(row);if(old&&!old.querySelector('button,input,select'))old.remove()}
  const gameplay=card(settings,'GAMEPLAY & DISPLAY');
  moveControl('mHap',gameplay,'HAPTICS',false);moveControl('mCam',gameplay,'RUNNER CAMERA',false);moveControl('mLT',gameplay,'LITE EFFECTS',false);
  moveControl('mRS',gameplay,'RESOLUTION',false);
  const installResolution=()=>{const resolutionButton=byId('mRS');if(!resolutionButton||resolutionButton.dataset.uiSegmented==='1')return;let resolutionRow=resolutionButton.closest('.ui-menu-setting');if(!resolutionRow){resolutionRow=document.createElement('div');resolutionRow.className='ui-menu-setting';const label=document.createElement('span');label.className='ui-menu-setting-label';label.textContent='RESOLUTION';resolutionRow.append(label,resolutionButton);gameplay.appendChild(resolutionRow)}resolutionButton.dataset.uiSegmented='1';resolutionButton.classList.add('ui-resolution-native');resolutionButton.setAttribute('aria-hidden','true');resolutionButton.tabIndex=-1;const group=document.createElement('div');group.className='ui-resolution-group';group.setAttribute('role','group');group.setAttribute('aria-label','Resolution');const options=[['LOW','LOW'],['MED','MEDIUM'],['HIGH','HIGH']];const syncResolution=()=>{const raw=(resolutionButton.textContent.match(/RESOLUTION:\s*(.+)/i)||[])[1]||'HIGH',current=raw.trim().toUpperCase()==='SHARP'?'HIGH':raw.trim().toUpperCase();group.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===current)))};options.forEach(([label,value])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.value=value;b.addEventListener('click',()=>{for(let i=0;i<4;i++){const current=(resolutionButton.textContent.match(/RESOLUTION:\s*(.+)/i)||[])[1]||'';if(current.trim().toUpperCase()===value)break;resolutionButton.click()}syncResolution()});group.appendChild(b)});resolutionRow.appendChild(group);syncResolution();if(window.MutationObserver)new MutationObserver(syncResolution).observe(resolutionButton,{childList:true,subtree:true,characterData:true})};installResolution();if(window.MutationObserver)new MutationObserver(installResolution).observe(menu,{childList:true,subtree:true});
  const danger=card(settings,'DANGER ZONE','ui-menu-danger');moveControl('mReset',danger,'RESET PROGRESS',false);
  const resetButton=byId('mReset');
  const resetDialog=document.createElement('div');resetDialog.className='ui-menu-modal-backdrop';resetDialog.hidden=true;resetDialog.innerHTML='<section class="ui-menu-confirm" role="dialog" aria-modal="true" aria-labelledby="uiResetTitle" aria-describedby="uiResetText"><div class="ui-menu-eyebrow">DANGER ZONE</div><h2 id="uiResetTitle">RESET PROGRESS?</h2><p id="uiResetText">This permanently resets your team, upgrades, and town progress on this device. This cannot be undone.</p><div class="ui-menu-confirm-actions"><button type="button" class="ui-menu-cancel">CANCEL</button><button type="button" class="ui-menu-confirm-reset">RESET PROGRESS</button></div></section>';
  const cancelReset=resetDialog.querySelector('.ui-menu-cancel'),confirmReset=resetDialog.querySelector('.ui-menu-confirm-reset');
  const closeReset=()=>{resetDialog.hidden=true;if(resetButton)resetButton.focus()};
  document.addEventListener('click',e=>{const target=e.target&&e.target.closest&&e.target.closest('#mReset');if(!target)return;e.preventDefault();e.stopImmediatePropagation();resetDialog.hidden=false;cancelReset.focus()},true);cancelReset.addEventListener('click',closeReset);confirmReset.addEventListener('click',()=>{resetDialog.hidden=true;const target=byId('mReset'),action=target&&target.onclick;if(action){action.call(target,{target});action.call(target,{target})}else if(window.SG&&typeof window.SG.resetSave==='function')window.SG.resetSave()});resetDialog.addEventListener('click',e=>{if(e.target===resetDialog)closeReset()});document.addEventListener('keydown',e=>{if(!resetDialog.hidden&&e.key==='Escape'){e.preventDefault();closeReset()}})
  const parts=[
   ['3D ART & UI','Character models, animation, interface design and visual assets.',(creditText.match(/Characters and animations:[\s\S]*/i)||[])[0]||'Character and animation credits.'],
   ['MUSIC & SFX','Original soundtrack, sound effects and gameplay audio.',(()=>{const a=creditText.indexOf('Sound credits:'),b=creditText.indexOf('The Spillway:');return a>=0?creditText.slice(a,b>a?b:undefined):'Music and sound-effect credits.'})()],
   ['TOWN AMBIENCE','Environmental loops and the sounds of Vapor City.',(()=>{const a=creditText.indexOf('The Spillway:');return a>=0?creditText.slice(a):'Town ambience credits.'})()]
  ];
  parts.forEach(([title,summary,body])=>{const group=document.createElement('section');group.className='ui-menu-credit-group';const h=document.createElement('h3');h.textContent=title;const short=document.createElement('p');short.className='ui-menu-credit-summary';short.textContent=summary;const details=document.createElement('details');details.className='ui-menu-credit-details';details.open=true;const toggle=document.createElement('summary');toggle.textContent='VIEW FULL ATTRIBUTION';const p=document.createElement('p');p.textContent=body;details.append(toggle,p);group.append(h,short,details);credits.appendChild(group)});
  if(creditSource)creditSource.remove();
  const testControls=byId('m3D')&&byId('m3D').closest('.btnrow');if(testControls){const testCard=card(dev,'TEST TOOLS');testCard.appendChild(testControls)}
  if(artAction){const artCard=card(dev,'PLAYER ART');const artToggle=document.createElement('button');artToggle.type='button';artToggle.className='btn';artToggle.textContent='TOGGLE PLAYER ART';artToggle.addEventListener('click',()=>{artAction.call(build);if(build){buildDetailsText.textContent=build.textContent.trim();build.textContent='BUILD INFO'}});artCard.appendChild(artToggle)}
  moveControl('mRO',dev,'FPS COUNTER',false);moveControl('mPL',dev,'PERFORMANCE LOG',false);moveControl('mPR',dev,'PERFORMANCE REPORT',false);
  moveAssetStatus();
  credits.append(build,dev);
  const defs=[['menu','MENU',home],['settings','SETTINGS',settings],['credits','CREDITS',credits]];
  const selectTab=name=>defs.forEach(([key,label,p])=>{const b=tabs.querySelector('[data-tab="'+key+'"]'),active=key===name;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;p.hidden=!active});
  defs.forEach(([key,label,p])=>{const b=document.createElement('button');b.type='button';b.className='ui-menu-tab';b.style.display='block';b.style.visibility='visible';b.textContent=label;b.dataset.tab=key;b.setAttribute('role','tab');b.setAttribute('aria-controls',p.id);b.addEventListener('click',()=>selectTab(key));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const i=defs.findIndex(x=>x[0]===key),next=defs[(i+(e.key==='ArrowRight'?1:2))%3];selectTab(next[0]);tabs.querySelector('[data-tab="'+next[0]+'"]').focus()});tabs.appendChild(b)});
  selectTab('menu');
  const townButton=byId('mTown');
  if(townButton){const old=townButton.closest('.btnrow');townButton.removeAttribute('style');footer.appendChild(townButton);if(old&&!old.querySelector('button,input,select'))old.remove()}
  if(oldLogo)oldLogo.remove();if(oldSub)oldSub.remove();if(oldTagline)oldTagline.remove();
  menu.append(head,goal,tabs,content,footer,resetDialog,playbookOverlay);

  menu.classList.add('ui-menu-ready');
  const upg=head.querySelector('.ui-menu-upg');if(upgControl)upg.addEventListener('click',()=>upgControl.click());
  const close=head.querySelector('.ui-menu-close'),townControl=byId('mTown');if(close&&townControl)close.addEventListener('click',()=>townControl.click());
  if(window.MutationObserver){const source=byId('owObj'),liveTown=byId('owTown');if(source)new MutationObserver(updateGoal).observe(source,{childList:true,subtree:true,characterData:true});if(liveTown)new MutationObserver(updateHeader).observe(liveTown,{childList:true,subtree:true,characterData:true});if(upgControl)new MutationObserver(updateHeader).observe(upgControl,{childList:true,subtree:true,characterData:true,attributes:true})}
  // Recompose the live Overworld HUD without replacing the game's canvas, state or handlers.
  const owTop=byId('owTop'),owTown=byId('owTown'),owObj=byId('owObj'),owA=byId('owA');
  if(owTop&&owTown&&owObj&&!owTop.querySelector('.ui-ow-pill')){
   const pill=document.createElement('div');pill.className='ui-ow-pill';
   const status=document.createElement('span');status.className='ui-ow-status';
   const upg=document.createElement('span');upg.className='ui-ow-upg';
   const goalStrip=document.createElement('div');goalStrip.className='ui-ow-goal';
   goalStrip.innerHTML='<span class="ui-ow-goal-tag">GOAL</span><span class="ui-ow-goal-copy"></span>';
   const goalCopy=goalStrip.querySelector('.ui-ow-goal-copy');
   pill.append(owTown,status,upg,owObj);owTop.replaceChildren(pill,goalStrip);
   owObj.classList.add('ui-visually-hidden');
   const syncOverworld=()=>{
    const raw=owObj.textContent.trim(),match=raw.match(/UPG\s+(\d+)/i),clean=raw.replace(/\s*[·|]\s*UPG\s+\d+/i,'').trim();
    status.textContent=clean||'VAPOR CITY';status.classList.toggle('is-cleared',/^CLEARED/i.test(clean));upg.textContent='UPG '+(match?match[1]:'0');
    const api=window.SG,map=api&&typeof api.M==='function'?api.M():null;
    const town=owTown.textContent.trim()||(map&&(map.harbor||map.hb?'HALE HARBOR':map.island||map.r2?"GULL'S REACH":map.route?'THE SPILLWAY':'VAPOR CITY'))||'VAPOR CITY';
    if(owTown.textContent.trim()!==town)if(owTown.textContent!==town)owTown.textContent=town;
    goalCopy.textContent=map&&map.route?'Follow the Spillway to Hale Harbor.':map&&(map.harbor||map.hb)?'Take on the harbor crews and keep the Circuit moving.':map&&(map.island||map.r2)?"Explore Gull's Reach and complete its challenges.":'Beat the three street crews, then take on the Netrunners.';
   };
   syncOverworld();
   if(window.MutationObserver){new MutationObserver(syncOverworld).observe(owTown,{childList:true,subtree:true,characterData:true});new MutationObserver(syncOverworld).observe(owObj,{childList:true,subtree:true,characterData:true})}
  }
  if(owA&&!owA.querySelector('.ui-ow-a-letter')){
   owA.innerHTML='<span class="ui-ow-a-letter">A</span><small class="ui-ow-a-label">EXPLORE</small>';
   const updateActionLabel=()=>{
    const api=window.SG, map=api&&typeof api.M==='function'?api.M():null, player=api&&api.OW;
    let label='EXPLORE';
    if(player&&player.busy)label='CONTINUE';
    else if(map&&map.room)label='EXIT';
    else if(map&&map.route)label='TRAVEL';
    else if(map&&player){
     const d=({u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]})[player.d]||[0,1],x=player.x+d[0],y=player.y+d[1];
     const npc=(map.npcs||[]).find(n=>n.x===x&&n.y===y&&!n.off);
     const prop=(map.props||[]).find(p=>x>=p.x&&x<p.x+(p.w||1)&&y>=p.y&&y<p.y+(p.h||1)&&(p.act||p.m));
     if(npc)label='TALK';
     else if(prop){const action=String(prop.act||prop.t||prop.m||'').toLowerCase();label=/fish|bait|cast/.test(action)?'FISH':/tire|arcade|mini|play/.test(action)?'PLAY':/squad|locker|upgrade/.test(action)?'SQUAD':/team|mirror|style/.test(action)?'CUSTOMIZE':/door|enter|gate/.test(action)?'ENTER':'INTERACT'}
    }
    const node=owA.querySelector('.ui-ow-a-label');if(node&&node.textContent!==label)node.textContent=label;
    owA.setAttribute('aria-label','A button: '+label);
   };
   updateActionLabel();window.setInterval(updateActionLabel,250);

  }
  const enhanceGoals=()=>{
   const panel=document.getElementById('goalsP');if(!panel||panel.dataset.uiMockupEnhance==='1')return;
   panel.dataset.uiMockupEnhance='1';
   const trophy=panel.querySelector('.ui-goals-trophy');
   let count=trophy&&trophy.querySelector('.ui-goals-trophy-count');
   if(trophy&&!count){count=document.createElement('span');count.className='ui-goals-trophy-count';trophy.appendChild(count)}
   const update=()=>{
    const achievements=[...panel.querySelectorAll('#ui-goals-panel-achievements .ui-goals-achievement')];
    const earned=achievements.filter(card=>card.classList.contains('is-earned')).length;
    if(count){const next=earned+'/13';if(count.textContent!==next)count.textContent=next}
    achievements.forEach(card=>{
     const badge=card.querySelector('.ui-goals-achievement-count');if(!badge)return;
     const maxMatch=badge.textContent.match(/\/\s*(\d+)/),max=maxMatch?Number(maxMatch[1]):(/LOCKED/i.test(badge.textContent)?1:0);
     if(max===1){const next=card.classList.contains('is-earned')?'1 / 1':'0 / 1';if(badge.textContent.trim()!==next)badge.textContent=next}
    });
    const stats=panel.querySelector('#ui-goals-panel-stats');
    const skill=stats&&[...stats.querySelectorAll('.ui-goals-stat-card')].find(card=>card.querySelector('.ui-goals-stat-label')?.textContent.trim()==='SKILL MOVES');
    if(skill&&!skill.querySelector('.ui-goals-skill-grid')){
     const detail=skill.querySelector('.ui-goals-stat-sub')?.textContent||skill.textContent||'';
     const values=['ANKLES','TRUCKS','SPINS'].map(label=>{
      const after=detail.match(new RegExp(label+'\\s*(?:[:·•—-]\\s*)?([\\d,]+)','i'));
      const before=detail.match(new RegExp('([\\d,]+)\\s*'+label,'i'));
      const value=after?.[1]||before?.[1];
      return value?{label,value}:null;
     });
     if(values.every(Boolean)){
      skill.classList.add('is-skill');
      const grid=document.createElement('div');grid.className='ui-goals-skill-grid';
      values.forEach(item=>{const cell=document.createElement('div');cell.className='ui-goals-skill-cell';const value=document.createElement('b');value.textContent=item.value;const label=document.createElement('span');label.textContent=item.label;cell.append(value,label);grid.appendChild(cell)});
      skill.appendChild(grid);
     }
    }
   };
   update();
   if(window.MutationObserver)new MutationObserver(update).observe(panel,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','hidden']});
   panel.addEventListener('click',event=>{if(event.target.closest('#ui-goals-tab-stats'))requestAnimationFrame(update)});
  };
  const enhanceEnd=()=>{
   const end=document.getElementById('end');if(!end||end.hidden)return;
   const heading=end.querySelector('#endH');if(!heading)return;
   let pill=end.querySelector('.ui-end-mode');
   if(!pill){pill=document.createElement('div');pill.className='ui-end-mode';heading.insertAdjacentElement('afterend',pill)}
   const label=/PRACTICE/i.test(heading.textContent)?'NO REWARDS · PRACTICE MODE':'CREW GAME';if(pill.textContent!==label)pill.textContent=label;
  };

  // Hold every visible player upright in the raised-arm pose through the practice-win reveal.
  const reinforcePracticeWinCelebration=()=>{
   const end=byId('end'),heading=end&&end.querySelector('#endH'),game=window.SG&&window.SG.F;
   if(!end||end.hidden||!heading||!/^PRACTICE WIN$/i.test(heading.textContent.trim())||game?.res?.type!=='td'||end.dataset.uiPracticeCelebration==='1')return;
   end.dataset.uiPracticeCelebration='1';
   let frames=0;
   const apply=()=>{
    const current=window.SG&&window.SG.F;
    if(current?.res?.type==='td')Object.values(current.off||{}).forEach(player=>{
     if(!player||typeof player!=='object'||!('x' in player))return;
     player.fall=0;player.lying=0;player.stun=0;player.vy=0;
     player.celeb=Math.max(Number(player.celeb)||0,90);
    });
    if(++frames<90)requestAnimationFrame(apply);
   };
   requestAnimationFrame(apply);
  };

  enhanceGoals();enhanceEnd();reinforcePracticeWinCelebration();
  if(window.MutationObserver){
   const pageObserver=new MutationObserver(()=>{enhanceGoals();enhanceEnd();reinforcePracticeWinCelebration()});
   pageObserver.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
