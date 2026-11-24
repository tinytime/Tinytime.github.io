/* Circuit Football RPG — functional tabbed Overworld menu.
   Existing game controls are moved intact so their original handlers/state remain authoritative. */
(() => {
 const boot=()=>{
  const menu=document.getElementById('menu');
  if(!menu||menu.dataset.uiMenuReady==='1')return;
  menu.dataset.uiMenuReady='1';
  const byId=id=>document.getElementById(id);
  const oldLogo=menu.querySelector('.logo'),oldSub=menu.querySelector('.sub');
  const oldTagline=[...menu.querySelectorAll('p.note')].find(el=>/^Walk Vapor City/i.test(el.textContent.trim()));
  const town=oldSub&&oldSub.textContent.trim()||'CIRCUIT FOOTBALL';
  const creditSource=[...menu.querySelectorAll('p.note,.note')].find(el=>/^Sound credits:/i.test(el.textContent.trim()));
  const creditText=creditSource&&creditSource.textContent.trim()||'';
  const build=byId('mBuild'),crewList=byId('crewList');
  const head=document.createElement('header');head.className='ui-menu-head';
  head.innerHTML='<button type="button" class="ui-menu-close" aria-label="Back to town">×</button><div class="ui-menu-brand"><div class="ui-menu-mark" aria-hidden="true">CF</div><div><div class="ui-menu-title">CIRCUIT FOOTBALL</div><div class="ui-menu-town"></div></div></div><button type="button" class="ui-menu-upg">UPG</button>';
  const updateHeader=()=>{const liveTown=byId('owTown');head.querySelector('.ui-menu-town').textContent=liveTown&&liveTown.textContent.trim()||town;const upg=byId('mUpg');const value=upg&&upg.textContent.match(/\(([^)]+)\)/);head.querySelector('.ui-menu-upg').textContent='UPG '+(value?value[1]:'0')};
  updateHeader();
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
  if(build){build.classList.add('ui-menu-build-trigger');build.setAttribute('role','button');build.setAttribute('tabindex','0');build.setAttribute('aria-label','Five taps open the developer and test drawer');build.setAttribute('aria-expanded','false');
   build.addEventListener('click',()=>{taps++;clearTimeout(tapTimer);tapTimer=setTimeout(()=>{taps=0},1800);if(taps>=5){dev.hidden=!dev.hidden;taps=0;build.setAttribute('aria-expanded',String(!dev.hidden))}});
   build.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();build.click()}});
  }
  const card=(parent,title,extra)=>{const box=document.createElement('section');box.className='ui-menu-card'+(extra?' '+extra:'');const h=document.createElement('h3');h.className='ui-menu-card-title';h.textContent=title;box.appendChild(h);parent.appendChild(box);return box};
  const actions=card(home,'TEAM & PROGRESSION','ui-menu-actions');
  const support=card(home,'DATA & SUPPORT','ui-menu-actions');
  const moveControl=(id,parent,label,action)=>{
   const el=byId(id);if(!el)return;
   const old=el.closest('.btnrow');
   if(action){el.removeAttribute('style');parent.appendChild(el)}
   else {const row=document.createElement('div');row.className='ui-menu-setting';const txt=document.createElement('span');txt.className='ui-menu-setting-label';txt.textContent=label;row.appendChild(txt);el.removeAttribute('style');row.appendChild(el);parent.appendChild(row)}
   if(old&&!old.querySelector('button,input,select'))old.remove();
  };

  ['mSquad','mTeam','mUpg','mGoals'].forEach(id=>moveControl(id,actions,'',true));
  const playbookButton=document.createElement('button');playbookButton.type='button';playbookButton.className='ui-menu-playbook';playbookButton.textContent='PLAYBOOK  ·  '+(window.SG&&Array.isArray(window.SG.PLAYS)?window.SG.PLAYS.length:0)+' PLAYS';actions.appendChild(playbookButton);
  const playbookOverlay=document.createElement('section');playbookOverlay.className='ui-menu-playbook-overlay';playbookOverlay.hidden=true;playbookOverlay.setAttribute('role','dialog');playbookOverlay.setAttribute('aria-modal','true');playbookOverlay.setAttribute('aria-label','Playbook');
  playbookOverlay.innerHTML='<header class="ui-menu-playbook-head"><button type="button" class="ui-menu-playbook-back" aria-label="Back to menu">←</button><div><div class="ui-menu-eyebrow">CIRCUIT FOOTBALL</div><h2>PLAYBOOK</h2></div><span class="ui-menu-playbook-count"></span></header><nav class="ui-menu-playbook-filters" aria-label="Filter plays"><button type="button" data-filter="ALL" aria-pressed="true">ALL</button><button type="button" data-filter="RUN" aria-pressed="false">RUN</button><button type="button" data-filter="PASS" aria-pressed="false">PASS</button><button type="button" data-filter="TRICK" aria-pressed="false">TRICK</button></nav><div class="ui-menu-playbook-list"></div>';
  const playList=playbookOverlay.querySelector('.ui-menu-playbook-list'),playCount=playbookOverlay.querySelector('.ui-menu-playbook-count');
  const renderPlaybook=filter=>{
   const plays=window.SG&&Array.isArray(window.SG.PLAYS)?window.SG.PLAYS:[];
   const shown=plays.filter(p=>filter==='ALL'||p.tag===filter);playList.replaceChildren();playCount.textContent=plays.length+' PLAYS';
   shown.forEach(p=>{const item=document.createElement('article');item.className='ui-menu-play-card';const top=document.createElement('div');top.className='ui-menu-play-card-top';const name=document.createElement('strong');name.textContent=p.name||'Untitled play';const tag=document.createElement('span');tag.textContent=p.tag||'PLAY';top.append(name,tag);const desc=document.createElement('p');desc.textContent=p.blurb||'A play in your playbook.';item.append(top,desc);playList.appendChild(item)});
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
  actions.append(byId('mUpg'),byId('mTeam'),playbookButton,byId('mGoals'),byId('mSquad'));
  support.append(byId('mSave'),byId('mFb'));if(saveStatus)support.appendChild(saveStatus);
  if(crewList)home.appendChild(crewList);
  const audio=card(settings,'AUDIO');
  moveControl('mMus',audio,'MUSIC',false);moveControl('mSfx',audio,'EFFECTS',false);
  const compactValue=(id,prefix,label)=>{const el=byId(id);if(!el)return;el.classList.add('ui-menu-toggle-pill');const sync=()=>{const raw=el.textContent.trim(),clean=raw.replace(new RegExp('^'+prefix+'\\s*:\\s*','i'),'');if(clean!==raw)el.textContent=clean;el.setAttribute('aria-label',label+': '+clean);if(/^(ON|OFF)$/i.test(clean))el.setAttribute('aria-pressed',String(clean.toUpperCase()==='ON'))};sync();if(window.MutationObserver)new MutationObserver(sync).observe(el,{childList:true,subtree:true,characterData:true})};
  compactValue('mMus','MUSIC','Music');compactValue('mSfx','EFFECTS','Effects');compactValue('mHap','HAPTICS','Haptics');compactValue('mCam','CAMERA','Runner camera');compactValue('mLT','LITE EFFECTS','Lite effects');
  const vol=byId('mVol');
  if(vol){const old=vol.closest('.btnrow'),row=document.createElement('div');row.className='ui-menu-setting';const label=document.createElement('label');label.className='ui-menu-setting-label';label.textContent='VOLUME';label.htmlFor='mVol';row.append(label,vol);audio.appendChild(row);if(old&&!old.querySelector('button,input,select'))old.remove()}
  const gameplay=card(settings,'GAMEPLAY & DISPLAY');
  moveControl('mHap',gameplay,'HAPTICS',false);moveControl('mCam',gameplay,'RUNNER CAMERA',false);moveControl('mLT',gameplay,'LITE EFFECTS',false);
  moveControl('mRS',gameplay,'RESOLUTION',false);
  const resolutionButton=byId('mRS'),resolutionRow=resolutionButton&&resolutionButton.closest('.ui-menu-setting');
  if(resolutionButton&&resolutionRow){
   resolutionButton.classList.add('ui-resolution-native');resolutionButton.setAttribute('aria-hidden','true');resolutionButton.tabIndex=-1;
   const group=document.createElement('div');group.className='ui-resolution-group';group.setAttribute('role','group');group.setAttribute('aria-label','Resolution');
   const options=[['LOW','LOW'],['MED','MEDIUM'],['HIGH','HIGH']];
   const syncResolution=()=>{const current=(resolutionButton.textContent.match(/RESOLUTION:\s*(.+)/i)||[])[1]||'HIGH';group.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===current.trim().toUpperCase())))};
   options.forEach(([label,value])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.value=value;b.addEventListener('click',()=>{for(let i=0;i<4;i++){const current=(resolutionButton.textContent.match(/RESOLUTION:\s*(.+)/i)||[])[1]||'';if(current.trim().toUpperCase()===value)break;resolutionButton.click()}syncResolution()});group.appendChild(b)});
   resolutionRow.appendChild(group);syncResolution();
  }
  const danger=card(settings,'DANGER ZONE','ui-menu-danger');moveControl('mReset',danger,'RESET PROGRESS',false);
  const resetButton=byId('mReset');
  const resetDialog=document.createElement('div');resetDialog.className='ui-menu-modal-backdrop';resetDialog.hidden=true;resetDialog.innerHTML='<section class="ui-menu-confirm" role="dialog" aria-modal="true" aria-labelledby="uiResetTitle" aria-describedby="uiResetText"><div class="ui-menu-eyebrow">DANGER ZONE</div><h2 id="uiResetTitle">RESET PROGRESS?</h2><p id="uiResetText">This permanently resets your team, upgrades, and town progress on this device. This cannot be undone.</p><div class="ui-menu-confirm-actions"><button type="button" class="ui-menu-cancel">CANCEL</button><button type="button" class="ui-menu-confirm-reset">RESET PROGRESS</button></div></section>';
  const cancelReset=resetDialog.querySelector('.ui-menu-cancel'),confirmReset=resetDialog.querySelector('.ui-menu-confirm-reset');
  const closeReset=()=>{resetDialog.hidden=true;if(resetButton)resetButton.focus()};
  document.addEventListener('click',e=>{const target=e.target&&e.target.closest&&e.target.closest('#mReset');if(!target)return;e.preventDefault();e.stopImmediatePropagation();resetDialog.hidden=false;cancelReset.focus()},true);cancelReset.addEventListener('click',closeReset);confirmReset.addEventListener('click',()=>{resetDialog.hidden=true;const target=byId('mReset'),action=target&&target.onclick;if(action){action.call(target,{target});action.call(target,{target})}else if(window.SG&&typeof window.SG.resetSave==='function')window.SG.resetSave()});resetDialog.addEventListener('click',e=>{if(e.target===resetDialog)closeReset()});document.addEventListener('keydown',e=>{if(!resetDialog.hidden&&e.key==='Escape'){e.preventDefault();closeReset()}})
  const parts=[
   ['3D ART & UI',(creditText.match(/Characters and animations:[\s\S]*/i)||[])[0]||'Character and animation credits.'],
   ['MUSIC & SFX',(()=>{const a=creditText.indexOf('Sound credits:'),b=creditText.indexOf('The Spillway:');return a>=0?creditText.slice(a,b>a?b:undefined):'Music and sound-effect credits.'})()],
   ['TOWN AMBIENCE',(()=>{const a=creditText.indexOf('The Spillway:');return a>=0?creditText.slice(a):'Town ambience credits.'})()]
  ];
  parts.forEach(([title,body])=>{const group=document.createElement('section');group.className='ui-menu-credit-group';const h=document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=body;group.append(h,p);credits.appendChild(group)});
  if(creditSource)creditSource.remove();
  const testControls=byId('m3D')&&byId('m3D').closest('.btnrow');if(testControls){const testCard=card(dev,'TEST TOOLS');testCard.appendChild(testControls)}
  if(artAction){const artCard=card(dev,'PLAYER ART');const artToggle=document.createElement('button');artToggle.type='button';artToggle.className='btn';artToggle.textContent='TOGGLE PLAYER ART';artToggle.addEventListener('click',()=>artAction.call(build));artCard.appendChild(artToggle)}
  moveControl('mRO',dev,'FPS COUNTER',false);moveControl('mPL',dev,'PERFORMANCE LOG',false);moveControl('mPR',dev,'PERFORMANCE REPORT',false);
  const soundStatus=byId('mSnd');if(soundStatus)credits.appendChild(soundStatus);
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
  const upg=head.querySelector('.ui-menu-upg'),upgButton=byId('mUpg');if(upgButton)upg.addEventListener('click',()=>upgButton.click());
  const close=head.querySelector('.ui-menu-close'),townControl=byId('mTown');if(close&&townControl)close.addEventListener('click',()=>townControl.click());
  if(window.MutationObserver){const source=byId('owObj'),liveTown=byId('owTown');if(source)new MutationObserver(updateGoal).observe(source,{childList:true,subtree:true,characterData:true});if(liveTown)new MutationObserver(updateHeader).observe(liveTown,{childList:true,subtree:true,characterData:true});if(upgButton)new MutationObserver(updateHeader).observe(upgButton,{childList:true,subtree:true,characterData:true,attributes:true})}
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();