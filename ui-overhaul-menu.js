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
  const updateGoal=()=>{const src=byId('owObj');goalText.textContent=src&&src.textContent.trim()||'Explore town, build your squad, and take on the crews.'};
  updateGoal();
  const tabs=document.createElement('div');tabs.className='ui-menu-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Menu sections');
  const content=document.createElement('div');content.className='ui-menu-content';
  const pane=(id,title)=>{const el=document.createElement('section');el.className='ui-menu-pane';el.id=id;el.setAttribute('role','tabpanel');el.setAttribute('aria-label',title);content.appendChild(el);return el};
  const home=pane('uiMenuHome','Menu'),settings=pane('uiMenuSettings','Settings'),credits=pane('uiMenuCredits','Credits');
  const footer=document.createElement('footer');footer.className='ui-menu-foot';
  const dev=document.createElement('section');dev.className='ui-menu-dev';dev.hidden=true;
  const devTitle=document.createElement('div');devTitle.className='ui-menu-dev-title';devTitle.textContent='DEVELOPER / TEST DRAWER';dev.appendChild(devTitle);
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
  ['mFb','mSave'].forEach(id=>moveControl(id,support,'',true));
  const saveStatus=byId('mSaveSt');if(saveStatus)support.appendChild(saveStatus);
  if(crewList)home.appendChild(crewList);
  const audio=card(settings,'AUDIO');
  moveControl('mMus',audio,'MUSIC',false);moveControl('mSfx',audio,'EFFECTS',false);
  const vol=byId('mVol');
  if(vol){const old=vol.closest('.btnrow'),row=document.createElement('div');row.className='ui-menu-setting';const label=document.createElement('label');label.className='ui-menu-setting-label';label.textContent='VOLUME';label.htmlFor='mVol';row.append(label,vol);audio.appendChild(row);if(old&&!old.querySelector('button,input,select'))old.remove()}
  const gameplay=card(settings,'GAMEPLAY & DISPLAY');
  moveControl('mHap',gameplay,'HAPTICS',false);moveControl('mCam',gameplay,'RUNNER CAMERA',false);moveControl('mLT',gameplay,'LITE EFFECTS',false);moveControl('mRS',gameplay,'RESOLUTION',false);
  const danger=card(settings,'DANGER ZONE','ui-menu-danger');moveControl('mReset',danger,'RESET PROGRESS',false);
  const parts=[
   ['3D ART & UI',(creditText.match(/Characters and animations:[\s\S]*/i)||[])[0]||'Character and animation credits.'],
   ['MUSIC & SFX',(()=>{const a=creditText.indexOf('Sound credits:'),b=creditText.indexOf('The Spillway:');return a>=0?creditText.slice(a,b>a?b:undefined):'Music and sound-effect credits.'})()],
   ['TOWN AMBIENCE',(()=>{const a=creditText.indexOf('The Spillway:');return a>=0?creditText.slice(a):'Town ambience credits.'})()]
  ];
  parts.forEach(([title,body])=>{const group=document.createElement('section');group.className='ui-menu-credit-group';const h=document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=body;group.append(h,p);credits.appendChild(group)});
  if(creditSource)creditSource.remove();
  moveControl('mRO',dev,'FPS COUNTER',false);moveControl('mPL',dev,'PERFORMANCE LOG',false);moveControl('mPR',dev,'PERFORMANCE REPORT',false);
  credits.append(build,dev);
  const defs=[['menu','MENU',home],['settings','SETTINGS',settings],['credits','CREDITS',credits]];
  const selectTab=name=>defs.forEach(([key,label,p])=>{const b=tabs.querySelector('[data-tab="'+key+'"]'),active=key===name;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;p.hidden=!active});
  defs.forEach(([key,label,p])=>{const b=document.createElement('button');b.type='button';b.className='ui-menu-tab';b.textContent=label;b.dataset.tab=key;b.setAttribute('role','tab');b.setAttribute('aria-controls',p.id);b.addEventListener('click',()=>selectTab(key));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const i=defs.findIndex(x=>x[0]===key),next=defs[(i+(e.key==='ArrowRight'?1:2))%3];selectTab(next[0]);tabs.querySelector('[data-tab="'+next[0]+'"]').focus()});tabs.appendChild(b)});
  selectTab('menu');
  const townButton=byId('mTown');
  if(townButton){const old=townButton.closest('.btnrow');townButton.removeAttribute('style');footer.appendChild(townButton);if(old&&!old.querySelector('button,input,select'))old.remove()}
  if(oldLogo)oldLogo.remove();if(oldSub)oldSub.remove();if(oldTagline)oldTagline.remove();
  menu.append(head,goal,tabs,content,footer);
  menu.classList.add('ui-menu-ready');
  const upg=head.querySelector('.ui-menu-upg'),upgButton=byId('mUpg');if(upgButton)upg.addEventListener('click',()=>upgButton.click());
  const close=head.querySelector('.ui-menu-close'),townButton=byId('mTown');if(close&&townButton)close.addEventListener('click',()=>townButton.click());
  if(window.MutationObserver){const source=byId('owObj'),liveTown=byId('owTown');if(source)new MutationObserver(updateGoal).observe(source,{childList:true,subtree:true,characterData:true});if(liveTown)new MutationObserver(updateHeader).observe(liveTown,{childList:true,subtree:true,characterData:true});if(upgButton)new MutationObserver(updateHeader).observe(upgButton,{childList:true,subtree:true,characterData:true,attributes:true})}
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();