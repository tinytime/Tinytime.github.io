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
  const squadControl=byId('mSquad');if(squadControl){squadControl.hidden=false;squadControl.removeAttribute('aria-hidden');squadControl.removeAttribute('style');actions.appendChild(squadControl);decorateAction(squadControl,icon('<path d="M4 7h16v13H4z"/><path d="M8 7V5a4 4 0 0 1 8 0v2M8 12h8M8 16h5"/>'),'MY SQUAD','Starters & upgrades');squadControl.dataset.uiTile='squad';}
  byId('mGoals').dataset.uiTile='goals';decorateAction(byId('mGoals'),icon('<path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 12v5m-4 3h8m-7-3h6"/>'),'GOALS & STATS','Challenges and records');
  const playbookButton=document.createElement('button');playbookButton.type='button';playbookButton.className='ui-menu-playbook ui-menu-icon-card';playbookButton.dataset.uiTile='playbook';playbookButton.setAttribute('aria-label','Open playbook');playbookButton.innerHTML='<span class="ui-menu-icon" aria-hidden="true">'+icon('<path d="M4 18V6m0 12h16M7 15l4-4 3 2 5-7"/><path d="m16 6 3 0 0 3"/>')+'</span><span class="ui-menu-action-copy"><strong>PLAYBOOK</strong><small>'+(window.SG&&Array.isArray(window.SG.PLAYS)?window.SG.PLAYS.length:0)+' plays · Pick your call</small></span><span class="ui-menu-card-arrow" aria-hidden="true">↗</span>';
  actions.append(squadControl,byId('mTeam'),playbookButton,byId('mGoals'));
  if(squadControl){squadControl.classList.add('ui-menu-icon-card');squadControl.dataset.uiTile='squad';}
  const teamSave=byId('tBack');if(teamSave)teamSave.textContent='SAVE & EQUIP';
  const initTeamTabs=()=>{
   const team=document.getElementById('team'),preview=document.getElementById('tPrev');
   if(!team||!preview||team.querySelector('.ui-team-tabs'))return;
   const tabs=document.createElement('div');tabs.className='ui-team-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Team customization sections');
   const content=document.createElement('div');content.className='ui-team-tab-content';
   const makePanel=(id,label)=>{const panel=document.createElement('section');panel.className='ui-team-tab-panel';panel.id=id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-label',label);content.appendChild(panel);return panel};
   const panels={identity:makePanel('uiTeamIdentity','Identity'),uniform:makePanel('uiTeamUniform','Uniform'),trails:makePanel('uiTeamTrails','Trails')};
   const activate=(key,focus=false)=>{for(const [name,panel] of Object.entries(panels)){const active=name===key;panel.hidden=!active;const button=tabs.querySelector('[data-team-tab="'+name+'"]');button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1}if(focus)tabs.querySelector('[aria-selected="true"]')?.focus()};
   [['identity','IDENTITY'],['uniform','UNIFORM'],['trails','TRAILS']].forEach(([key,label])=>{const button=document.createElement('button');button.type='button';button.className='ui-team-tab';button.dataset.teamTab=key;button.setAttribute('role','tab');button.textContent=label;button.addEventListener('click',()=>activate(key));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();const keys=['identity','uniform','trails'],next=keys[(keys.indexOf(key)+(event.key==='ArrowRight'?1:2))%3];activate(next,true)});tabs.appendChild(button)});
   preview.after(tabs);tabs.after(content);
   const identity=team.querySelector('.ui-team-identity');if(identity)panels.identity.appendChild(identity);
   const directLabels=[...team.children].filter(el=>el.classList?.contains('lbl'));
   const takeLabel=text=>directLabels.find(el=>el.textContent.trim()===text);
   const jerseyLabel=takeLabel('JERSEY STYLE'),pantsLabel=takeLabel('PANTS STYLE'),colorsLabel=takeLabel('COLORS (TAP A SLOT, THEN A COLOR)');
   ['tJersey','tPants','tSlots','tPal'].forEach(id=>{const el=document.getElementById(id);if(el)panels.uniform.appendChild(el)});
   [jerseyLabel,pantsLabel,colorsLabel].forEach(el=>{if(el)panels.uniform.insertBefore(el,panels.uniform.querySelector('#'+(el===jerseyLabel?'tJersey':el===pantsLabel?'tPants':'tSlots'))||null)});
   // Jersey/pants cut choices are intentionally non-interactive in the current player-art renderer.
   // Preserve the saved values, but do not leave orphaned headings or expose dead controls.
   ['tJersey','tPants'].forEach(id=>{const control=document.getElementById(id),label=control?.previousElementSibling;if(control)control.hidden=true;if(label?.classList?.contains('lbl'))label.hidden=true});
   const fixedStyleNote=document.createElement('small');fixedStyleNote.className='ui-team-fixed-style-note';fixedStyleNote.textContent='JERSEY & PANTS CUTS ARE NOT CURRENTLY CUSTOMIZABLE.';panels.uniform.insertBefore(fixedStyleNote,panels.uniform.querySelector('#tSlots'));
   const placeTrail=()=>{
    const row=document.getElementById('trRow');if(!row)return;
    if(row.parentElement!==panels.trails)panels.trails.appendChild(row);
    const chips=row.querySelector('.chips');if(!chips)return;
    [...chips.children].forEach(chip=>{
     if(chip.classList.contains('ui-team-trail-option'))return;
     if(!chip.classList.contains('chip'))return;
     const option=document.createElement('div');option.className='ui-team-trail-option';
     chip.before(option);option.appendChild(chip);
     if(chip.classList.contains('locked')){
      const trailName=chip.textContent.replace(/^🔒\s*/,'').trim();
      // Crew/challenge data is private to the game's main-script closure; keep this display map local.
      const trailCrewNames={VIOLET:'Glitch Cats',AMBER:'Scrap Kings',TEAL:'Skyline Drifters',GLITCH:'Netrunners',RUST:'Bait Dogs',STEEL:'Longshoremen',SPARK:'Gantry Gang',GOLD:'Closers'};
      const crew=trailCrewNames[trailName]||'Crew challenge';
      const hint=document.createElement('small');hint.className='ui-team-trail-hint';hint.textContent=crew.toUpperCase();
      hint.setAttribute('aria-label','Unlock by completing the '+crew+' crew challenge');
      option.appendChild(hint);
      const reason='Complete the '+crew+' challenge';
      chip.title=reason;chip.setAttribute('aria-label',trailName+' trail locked. '+reason);
      chip.onclick=()=>{chip.title=reason};
     }
    });
   };
   placeTrail();
   if(window.MutationObserver){const observer=new MutationObserver(placeTrail);observer.observe(team,{childList:true,subtree:true})}
   activate('identity');
  };
  const initTeamHeader=()=>{
   const team=document.getElementById('team');if(!team||team.querySelector('.ui-team-head'))return;
   const heading=team.querySelector(':scope > h2');if(!heading)return;
   const header=document.createElement('header');header.className='ui-team-head';
   const back=document.createElement('button');back.type='button';back.className='ui-team-back';back.textContent='← BACK';back.setAttribute('aria-label','Back to menu without using SAVE & EQUIP');
   const badge=document.createElement('span');badge.className='ui-team-upg';badge.setAttribute('role','status');
   const sync=()=>{const source=byId('owObj'),raw=source&&source.textContent||'',match=raw.match(/UPG\s+(\d+)/i);badge.textContent='UPG '+(match?match[1]:'0')};
   back.addEventListener('click',()=>byId('tBack')?.click());
   header.append(back,heading,badge);team.insertBefore(header,team.firstChild);sync();
   if(window.MutationObserver){const source=byId('owObj');if(source)new MutationObserver(sync).observe(source,{childList:true,subtree:true,characterData:true})}
  };
  const teamTile=byId('mTeam');if(teamTile)teamTile.addEventListener('click',()=>requestAnimationFrame(()=>{initTeamHeader();initTeamTabs()}));
  const installSquadPresentation=()=>{
   const body=document.getElementById('sqBody');if(!body||body.dataset.uiSquadPresentation==='1')return;
   body.dataset.uiSquadPresentation='1';
   let processing=false,queued=false;
   const process=()=>{
    queued=false;if(processing)return;
    const current=document.getElementById('sqBody');if(!current)return;
    current.querySelectorAll('.ustat button').forEach(button=>{
     const label=button.textContent.trim();
     if(/^\+2\s*[·•]\s*\d+$/.test(label))button.textContent=label+'P';
    });
    const edit=[...current.querySelectorAll('button')].find(button=>button.textContent.trim()==='EDIT GEAR & TRAILS');
    if(!edit)return;
    processing=true;
    edit.click();
    const gearBody=document.getElementById('sqBody');
    const back=[...gearBody.querySelectorAll('button')].find(button=>button.textContent.trim()==='BACK TO STYLE');
    if(back){
     const gearNodes=[...gearBody.children].filter(node=>node!==back);
     back.click();
     const styleBody=document.getElementById('sqBody');
     const oldEdit=[...styleBody.querySelectorAll('button')].find(button=>button.textContent.trim()==='EDIT GEAR & TRAILS');
     if(oldEdit)oldEdit.remove();
     const group=document.createElement('section');group.className='ui-squad-inline-gear';group.setAttribute('aria-label','Visor and arm sleeve customization');
     gearNodes.forEach(node=>group.appendChild(node));
     const numberRow=styleBody.querySelector('.numrow');
     if(numberRow)numberRow.after(group);else styleBody.appendChild(group);
    }
    processing=false;
   };
   const schedule=()=>{if(queued||processing)return;queued=true;requestAnimationFrame(process)};
   if(window.MutationObserver)new MutationObserver(schedule).observe(body,{childList:true,subtree:true,characterData:true});
   document.addEventListener('click',event=>{if(event.target.closest('#sqTabs,#mSquad'))schedule()},true);
   schedule();
  };
  installSquadPresentation();

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
   const header=panel.querySelector('.ui-goals-header');
   if(header&&!header.querySelector('.ui-goals-header-close')){
    const close=document.createElement('button');close.type='button';close.className='ui-goals-header-close';
    close.setAttribute('aria-label','Close Goals & Stats');close.textContent='×';
    close.addEventListener('click',()=>panel.querySelector('.ui-goals-close')?.click());
    header.insertBefore(close,header.firstChild);
   }
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
    const receiving=stats&&[...stats.querySelectorAll('.ui-goals-stat-card')].find(card=>card.querySelector('.ui-goals-stat-label')?.textContent.trim()==='RECEIVING');
    if(receiving){
     if(!receiving.classList.contains('is-receiving'))receiving.classList.add('is-receiving');
     const value=receiving.querySelector('.ui-goals-stat-value');
     if(value){
      let number=value.querySelector('.ui-goals-stat-number');
      if(!number){
       const raw=value.textContent.trim();number=document.createElement('span');number.className='ui-goals-stat-number';number.textContent=raw;
       const unit=document.createElement('span');unit.className='ui-goals-stat-unit';unit.textContent='REC';value.replaceChildren(number,unit);
      }
      const accessibleValue=(number.textContent.trim()||'0')+' receptions';
      if(value.getAttribute('aria-label')!==accessibleValue)value.setAttribute('aria-label',accessibleValue);
     }
     const yards=receiving.querySelector('.ui-goals-stat-sub');
     const yardMatch=yards&&yards.textContent.match(/([\d,]+)\s*(?:YARDS?|YDS?)/i);
     if(yardMatch){const next=yardMatch[1]+' YDS';if(!yards.querySelector('.ui-goals-yards-number')){const number=document.createElement('span');number.className='ui-goals-yards-number';number.textContent=yardMatch[1];const unit=document.createElement('span');unit.className='ui-goals-yards-unit';unit.textContent='YDS';yards.replaceChildren(number,unit)}else{const number=yards.querySelector('.ui-goals-yards-number');if(number.textContent!==yardMatch[1])number.textContent=yardMatch[1]}}
    }
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


/* Owner polish batch 2: use the game's native six-play pager and preserve the per-player star meter. */
(()=>{
 const bootPolish=()=>{
  const pile=document.getElementById('pile'),bar=document.getElementById('pileBar');
  if(pile&&bar&&!pile.querySelector('.ui-pile-heading')){
   const heading=[...pile.querySelectorAll('#pileTitle,*')].find(el=>el.children.length===0&&/^FUMBLE!?$/i.test((el.textContent||'').trim()));
   if(heading){
    heading.textContent='FUMBLE';
    heading.classList.add('ui-pile-heading');
    bar.parentNode.insertBefore(heading,bar);
   }
  }

  const sheet=document.getElementById('sheet'),nav=document.getElementById('pbNav');
  const flip=document.getElementById('flipBtn'),call=document.getElementById('callBtn');
  if(sheet&&nav&&flip&&call&&!sheet.querySelector('.ui-playbook-footer')){
   const footer=document.createElement('div');footer.className='ui-playbook-footer';
   const actions=document.createElement('div');actions.className='ui-playbook-actions';
   actions.append(flip,call);
   footer.append(nav,actions);
   sheet.appendChild(footer);
  }

  const rewriteTruckAchievement=()=>{
   const panel=document.getElementById('goalsP');
   const root=panel&&panel.querySelector('#ui-goals-panel-achievements');
   if(!root)return;
   const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
   const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
   nodes.forEach(node=>{
    const next=node.nodeValue.replace(/win\\s+25\\s+trucks/ig,'Perform 25 trucks');
    if(next!==node.nodeValue)node.nodeValue=next;
   });
  };
  rewriteTruckAchievement();
  if(window.MutationObserver&&!document.body.dataset.uiTruckCopyObserver){
   document.body.dataset.uiTruckCopyObserver='1';
   new MutationObserver(rewriteTruckAchievement).observe(document.body,{subtree:true,childList:true});
  }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootPolish,{once:true});else bootPolish();
})();


/* Circuit Football RPG title gate — UI-Overhaul integration.
   The existing game and its Settings remain authoritative behind this entry screen. */
(()=> {
 const bootTitle=()=>{
  if(document.getElementById('uiTitleScreen'))return;
  const title=document.createElement('section');
  title.id='uiTitleScreen';title.className='ui-title-screen';title.setAttribute('role','region');
  title.setAttribute('aria-label','Circuit Football RPG title screen');
  title.innerHTML="    <svg class=\"title-scene\" viewBox=\"0 0 864 1536\" preserveAspectRatio=\"xMidYMid slice\" role=\"img\" aria-label=\"Neon waterfront city at dusk, football field and three helmeted players\">\n      <defs>\n        <linearGradient id=\"tsSky\" x2=\"0\" y2=\"1\"><stop stop-color=\"#07132b\"/><stop offset=\".48\" stop-color=\"#17264b\"/><stop offset=\".7\" stop-color=\"#a65a47\"/><stop offset=\"1\" stop-color=\"#0a211c\"/></linearGradient>\n        <linearGradient id=\"tsField\" x2=\"0\" y2=\"1\"><stop stop-color=\"#285d37\"/><stop offset=\"1\" stop-color=\"#071b13\"/></linearGradient>\n        <linearGradient id=\"tsBlue\" x2=\"0\" y2=\"1\"><stop stop-color=\"#1489db\"/><stop offset=\"1\" stop-color=\"#06316d\"/></linearGradient>\n        <linearGradient id=\"tsOrange\" x2=\"0\" y2=\"1\"><stop stop-color=\"#ff8a26\"/><stop offset=\"1\" stop-color=\"#a72e0d\"/></linearGradient>\n        <linearGradient id=\"tsPurple\" x2=\"0\" y2=\"1\"><stop stop-color=\"#8a32c6\"/><stop offset=\"1\" stop-color=\"#351064\"/></linearGradient>\n        <linearGradient id=\"tsBlack\" x2=\"0\" y2=\"1\"><stop stop-color=\"#424d5d\"/><stop offset=\"1\" stop-color=\"#111923\"/></linearGradient>\n        <filter id=\"tsGlow\"><feGaussianBlur stdDeviation=\"8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n      </defs>\n      <rect width=\"864\" height=\"1536\" fill=\"url(#tsSky)\"/>\n      <path d=\"M0 385L100 290 190 365 285 260 390 350 500 250 610 350 720 230 864 330V800H0Z\" fill=\"#25314c\" opacity=\".55\"/>\n      <g fill=\"#101a31\" stroke=\"#263b59\" stroke-width=\"5\">\n        <path d=\"M0 210h90v560H0zM94 315h75v455H94zM175 170h105v600H175zM285 260h75v510h-75zM365 110h115v660H365zM490 220h78v550h-78zM575 150h100v620H575zM684 245h78v525h-78zM770 125h94v645h-94z\"/>\n      </g>\n      <g fill=\"#ffb44e\" opacity=\".85\"><path d=\"M18 255h9v13h-9zM42 255h9v13h-9zM18 300h9v13h-9zM42 300h9v13h-9zM198 220h12v16h-12zM228 220h12v16h-12zM198 265h12v16h-12zM228 265h12v16h-12zM390 170h12v17h-12zM420 170h12v17h-12zM390 215h12v17h-12zM420 215h12v17h-12z\"/></g>\n      <g fill=\"#ff2fa8\" filter=\"url(#tsGlow)\" opacity=\".9\"><path d=\"M600 275h55v8h-55zM600 315h55v8h-55zM600 355h55v8h-55zM705 330h110v7H705zM705 370h110v7H705zM705 410h110v7H705z\"/></g>\n      <g stroke=\"#27e0ff\" stroke-width=\"5\" fill=\"none\" filter=\"url(#tsGlow)\"><path d=\"M730 80v250h72V80zM610 430h52v165h-52z\"/></g>\n      <g fill=\"#27e0ff\" font-family=\"Arial,sans-serif\" font-weight=\"900\" text-anchor=\"middle\"><text x=\"766\" y=\"135\" font-size=\"32\">N</text><text x=\"766\" y=\"178\" font-size=\"32\">E</text><text x=\"766\" y=\"221\" font-size=\"32\">O</text><text x=\"766\" y=\"264\" font-size=\"32\">N</text><text x=\"636\" y=\"490\" font-size=\"25\">PIXEL</text><text x=\"636\" y=\"525\" font-size=\"25\">CITY</text></g>\n      <g stroke=\"#d5a06a\" stroke-width=\"9\" fill=\"none\" opacity=\".9\"><path d=\"M0 650L250 510 250 850M20 650l220 110M250 510l-35 340M0 715h255M115 570v270M0 570l250 170\"/><path d=\"M0 545l60-70 50 70M0 545h110M60 475v95\"/></g>\n      <path d=\"M0 750L864 750V1536H0Z\" fill=\"url(#tsField)\"/>\n      <g stroke=\"#f5f2d8\" stroke-width=\"7\" opacity=\".9\" fill=\"none\">\n        <path d=\"M0 890H864M0 1035H864M0 1180H864M0 1325H864M0 1470H864\"/>\n        <path d=\"M0 750L0 1536M864 750L864 1536\" stroke-width=\"9\"/>\n      </g>\n      <g stroke=\"#f5f2d8\" stroke-width=\"5\" opacity=\".85\"><path d=\"M300 1015h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30m-30 24h38m-38 24h30\"/></g>\n      <g fill=\"#fff\" font-family=\"Arial,sans-serif\" font-size=\"38\" font-weight=\"900\" opacity=\".9\"><text x=\"24\" y=\"925\">30</text><text x=\"24\" y=\"1070\">20</text><text x=\"24\" y=\"1215\">10</text><text x=\"720\" y=\"925\">30</text><text x=\"720\" y=\"1070\">20</text><text x=\"720\" y=\"1215\">10</text></g>\n      <!-- Original simplified helmeted-player silhouettes, arranged as a three-player lineup. -->\n      <g stroke=\"#080d18\" stroke-width=\"13\" stroke-linejoin=\"round\">\n        <g transform=\"translate(188 680)\">\n          <path d=\"M22 185l-5 178 42 12 36-144 35 144 43-12-8-178z\" fill=\"url(#tsPurple)\"/><path d=\"M20 210l-45 90 38 24 54-70M166 210l48 84-38 24-52-66\" fill=\"#5b2094\"/><path d=\"M37 350l-14 120 65 9 10-116M133 350l16 120 65 9 4-115\" fill=\"#21153d\"/><path d=\"M10 463h82l-10 35-83-2zM143 463h82l14 33-88 3z\" fill=\"#181328\"/><path d=\"M28 50q74-82 148 0l-7 100H35z\" fill=\"url(#tsPurple)\"/><path d=\"M18 70q83-100 165 0v42H18z\" fill=\"#f0b72e\"/><path d=\"M15 100h174v62H15z\" fill=\"#29134d\"/><path d=\"M28 108h146v34H28z\" fill=\"#9db6d3\"/><path d=\"M88 0h45v26H88z\" fill=\"#e7b52b\"/><path d=\"M70 220h90\" stroke=\"#f4ca53\" stroke-width=\"17\"/><text x=\"78\" y=\"286\" fill=\"#fff\" stroke=\"none\" font-size=\"60\" font-family=\"Arial\" font-weight=\"900\">81</text>\n        </g>\n        <g transform=\"translate(330 585)\">\n          <path d=\"M20 245l-15 215 76 14 42-172 41 172 76-14-15-215z\" fill=\"url(#tsBlue)\"/><path d=\"M25 265l-72 105 45 30 91-86M225 265l72 105-45 30-91-86\" fill=\"url(#tsOrange)\"/><path d=\"M35 445l-22 170 85 12 30-170M158 445l30 170 85-12-22-170\" fill=\"#0a1b3d\"/><path d=\"M-5 605h115l-5 39H-25zM178 605h115l30 39H185z\" fill=\"#a94b17\"/><path d=\"M30 75q95-100 190 0l-10 142H40z\" fill=\"url(#tsBlue)\"/><path d=\"M28 100h194v75H28z\" fill=\"#f7a52a\"/><path d=\"M37 117h176v46H37z\" fill=\"#172c4a\"/><path d=\"M94 0h62v34H94z\" fill=\"#f6f7fa\"/><path d=\"M112 0h27v160h-27z\" fill=\"#ff7b1a\"/><path d=\"M8 143h231\" stroke=\"#dce8f5\" stroke-width=\"15\"/><path d=\"M42 146h160\" stroke=\"#8c9fb4\" stroke-width=\"6\"/><path d=\"M-10 295h245\" stroke=\"#f7a52a\" stroke-width=\"19\"/><text x=\"82\" y=\"390\" fill=\"#fff\" stroke=\"none\" font-size=\"112\" font-family=\"Arial\" font-weight=\"900\">7</text><path d=\"M-3 300q-60 85-18 120\" stroke=\"#fff\" stroke-width=\"18\" fill=\"none\"/><ellipse cx=\"-8\" cy=\"407\" rx=\"36\" ry=\"25\" fill=\"#7d3517\"/><path d=\"M-30 405l45 4M-18 390l-1 30\" stroke=\"#fff\" stroke-width=\"5\"/>\n        </g>\n        <g transform=\"translate(570 700)\">\n          <path d=\"M20 180l-6 185 44 12 34-145 36 145 45-12-8-185z\" fill=\"url(#tsBlack)\"/><path d=\"M18 205l-46 92 39 24 58-72M165 205l47 90-39 24-58-70\" fill=\"#242e3d\"/><path d=\"M34 356l-12 115 66 8 12-111M131 356l15 115 66 8 2-111\" fill=\"#141d2b\"/><path d=\"M8 465h85l-10 32-88-1zM146 465h82l15 32-88 2z\" fill=\"#0c1320\"/><path d=\"M25 55q73-82 146 0l-7 104H33z\" fill=\"url(#tsBlack)\"/><path d=\"M16 80h165v67H16z\" fill=\"#182230\"/><path d=\"M27 100h143v32H27z\" fill=\"#a9c0d4\"/><path d=\"M84 6h46v25H84z\" fill=\"#b5c0cc\"/><text x=\"67\" y=\"285\" fill=\"#fff\" stroke=\"none\" font-size=\"60\" font-family=\"Arial\" font-weight=\"900\">22</text>\n        </g>\n      </g>\n      <g stroke=\"#b8e7ff\" stroke-width=\"3\" opacity=\".35\"><path d=\"M150 0l-25 280M280 0l-18 240M460 0l-22 300M580 0l-22 220M690 0l-20 280M820 0l-30 260\"/></g>\n    </svg>"+
   '<div class="ui-title-brand"><div class="ui-title-circuit">CIRCUIT</div><div class="ui-title-football">FOOTBALL</div><div class="ui-title-rpg">RPG</div></div>'+
   '<div class="ui-title-actions"><button id="uiTitleStart" type="button">BEAT THE CIRCUIT</button><button id="uiTitleSettings" type="button">SETTINGS</button><div class="ui-title-version">v3.40</div></div>';
  document.body.appendChild(title);
  let returnToTitle=false;
  const showTitle=()=>{const menu=document.getElementById('menu');if(menu)menu.hidden=true;title.hidden=false;returnToTitle=false};
  const openTitleSettings=()=>{
   returnToTitle=true;title.hidden=true;
   const menuButton=document.getElementById('owMenu');if(menuButton)menuButton.click();
   const settingsTab=document.querySelector('#menu [data-tab="settings"]');
   if(settingsTab)settingsTab.click();
   else {const menu=document.getElementById('menu');if(menu)menu.hidden=false;returnToTitle=false;title.hidden=false}
  };
  title.querySelector('#uiTitleStart').addEventListener('click',()=>{
   title.hidden=true;
   if(typeof window.SG?.owShow==='function')window.SG.owShow();
  });
  title.querySelector('#uiTitleSettings').addEventListener('click',openTitleSettings);
  document.addEventListener('click',event=>{
   if(!returnToTitle)return;
   const target=event.target instanceof Element?event.target:null;
   if(!target||!target.closest('.ui-menu-close,#mTown'))return;
   event.preventDefault();event.stopImmediatePropagation();showTitle();
  },true);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&returnToTitle)showTitle()});
  title.hidden=false;
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootTitle,{once:true});
 else bootTitle();
})();
