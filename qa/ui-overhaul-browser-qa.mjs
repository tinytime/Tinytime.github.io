import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'ui-overhaul-qa-output');
fs.mkdirSync(out,{recursive:true});
const checks=[],failures=[],pageErrors=[],consoleErrors=[],sameOriginFailures=[];
const check=(name,pass,detail=null)=>{checks.push({name,pass:!!pass,detail});if(!pass)failures.push(name)};
const server=createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname)}catch{res.writeHead(400).end('Bad request');return}
 const target=path.resolve(root,'.'+pathname);
 if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403).end('Forbidden');return}
 fs.readFile(target,(err,data)=>{if(err){res.writeHead(404).end('Not found');return}
 const ext=path.extname(target).toLowerCase(),types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.wav':'audio/wav','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
 res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});res.end(data)});
});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
const base='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
page.on('pageerror',e=>pageErrors.push({message:e.message,stack:e.stack}));
page.on('console',m=>{if(m.type()==='error')consoleErrors.push({text:m.text(),location:m.location()})});
page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)sameOriginFailures.push({url:r.url(),status:r.status()})});
try{
 await page.goto(base+'/index.html?uiqa=1',{waitUntil:'load',timeout:60000});
 await page.waitForFunction(()=>document.querySelector('#menu')?.dataset.uiMenuReady==='1',null,{timeout:15000});
 // Inspect startup, explicitly enter the overworld when the game exposes its existing owShow helper,
 // then use the real visible HUD button exactly once. Never force-click a hidden control.
 const menu=page.locator('#menu');
 const openOverworldMenu=page.locator('#owMenu');
 const describeStartup=()=>page.evaluate(()=>{
  const inspect=el=>{if(!el)return null;const s=getComputedStyle(el),r=el.getBoundingClientRect();const ancestors=[];for(let p=el;p&&ancestors.length<6;p=p.parentElement){const ps=getComputedStyle(p),pr=p.getBoundingClientRect();ancestors.push({tag:p.tagName,id:p.id||null,className:typeof p.className==='string'?p.className:'',hidden:p.hidden,display:ps.display,visibility:ps.visibility,opacity:ps.opacity,rect:{x:Math.round(pr.x),y:Math.round(pr.y),width:Math.round(pr.width),height:Math.round(pr.height)}})}return{tag:el.tagName,id:el.id||null,className:typeof el.className==='string'?el.className:'',text:(el.innerText||el.textContent||'').trim().slice(0,100),hidden:el.hidden,display:s.display,visibility:s.visibility,opacity:s.opacity,rect:{x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height)},ancestors}};
  return{readyState:document.readyState,bodyClass:document.body.className,app:inspect(document.querySelector('#app')),world:inspect(document.querySelector('#world')),owMenu:inspect(document.querySelector('#owMenu')),menu:inspect(document.querySelector('#menu')),visibleButtons:[...document.querySelectorAll('button')].map(inspect).filter(x=>x.rect.width>0&&x.rect.height>0&&x.display!=='none'&&x.visibility!=='hidden'&&Number(x.opacity)>.01)};
 });
 const startupBefore=await describeStartup();
 await page.screenshot({path:path.join(out,'startup-before-overworld.png'),fullPage:true});
 // The browser fixture should review the actual town overworld, not whichever interior the saved test profile last occupied.
 const townFixture=await page.evaluate(()=>{
  const api=window.SG,map=api&&typeof api.M==='function'?api.M():null;
  if(map&&map.room&&api&&typeof api.owPlace==='function'){api.owPlace('street',15,23,'d',null);return{movedFromInterior:true,map:api.M()?.id||null}}
  return{movedFromInterior:false,map:map?.id||null};
 });
 check('Visual QA fixture uses the town overworld',townFixture.map==='street'||townFixture.map==='street',townFixture);
 const startupHasOverworldButton=await openOverworldMenu.count()===1&&await openOverworldMenu.isVisible();
 // startupBefore is diagnostic context, not a pass/fail requirement: owShow may be needed.
 let invokedOverworldHelper=false;
 if(!startupHasOverworldButton)invokedOverworldHelper=await page.evaluate(()=>{if(typeof window.SG?.owShow==='function'){window.SG.owShow();return true}return false});
 check('Existing overworld entry helper available when needed',startupHasOverworldButton||invokedOverworldHelper,{invokedOverworldHelper});
 const startupAfterHelper=await describeStartup();
 fs.writeFileSync(path.join(out,'startup-state.json'),JSON.stringify({before:startupBefore,townFixture,afterHelper:startupAfterHelper,invokedOverworldHelper},null,2));
 await page.screenshot({path:path.join(out,'startup-after-helper.png'),fullPage:true});
 if(!startupHasOverworldButton)await page.waitForFunction(()=>{const b=document.querySelector('#owMenu');if(!b)return false;const s=getComputedStyle(b),r=b.getBoundingClientRect();return !b.hidden&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)>.5&&r.width>0&&r.height>0;},null,{timeout:10000});
 const startupAfter=await describeStartup();
 fs.writeFileSync(path.join(out,'startup-state.json'),JSON.stringify({before:startupBefore,townFixture,afterHelper:startupAfterHelper,after:startupAfter,invokedOverworldHelper},null,2));
 await page.screenshot({path:path.join(out,'startup-after-overworld.png'),fullPage:true});
 check('Overworld MENU opener genuinely visible',await openOverworldMenu.isVisible(),startupAfter.owMenu);
 const overworldChrome=await page.locator('#owTop .ui-ow-pill').evaluate(el=>({background:getComputedStyle(el).backgroundColor,townShadow:getComputedStyle(el.querySelector('#owTown')).textShadow,borderRadius:getComputedStyle(el).borderRadius}));
 check('Overworld town, cleared and upgrade status share a quiet matte navy pill',overworldChrome.background==='rgba(19, 22, 32, 0.85)'&&overworldChrome.townShadow==='none'&&parseFloat(overworldChrome.borderRadius)>=12,overworldChrome);

 if(!(await openOverworldMenu.isVisible()))throw new Error('The existing overworld entry helper did not expose #owMenu. Inspect startup-state.json and startup screenshots; do not bypass visibility.');
 await openOverworldMenu.click();
 await page.waitForFunction(()=>{const e=document.querySelector('#menu');if(!e)return false;const s=getComputedStyle(e);return !e.hidden&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)>.5&&e.getBoundingClientRect().height>0;},null,{timeout:10000});
 const menuIsActuallyVisible=()=>menu.evaluate(e=>{const s=getComputedStyle(e);return !e.hidden&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)>.5&&e.getBoundingClientRect().height>0});
 check('Menu visibly opens from overworld',await menuIsActuallyVisible());
 check('Menu module initialized',await menu.evaluate(e=>e.classList.contains('ui-menu-ready')));
 const primary=await Promise.all(['#mSquad','#mTeam','#mUpg','#mGoals','#mFb','#mSave','#mTown'].map(s=>page.locator(s).count()));
 check('Primary controls retained',primary.every(n=>n===1),primary);
 const objective=(await page.locator('.ui-menu-goal-text').textContent())?.trim();
 check('Current objective populated',!!objective,objective);
 check('MENU selected by default',await page.locator('[data-tab="menu"]').getAttribute('aria-selected')==='true');
 const nullTextDiagnostics=await page.locator('#menu').evaluate(root=>{const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const hits=[];while(walker.nextNode()){const t=walker.currentNode.textContent||'';if(/null|undefined/i.test(t))hits.push({text:t.trim(),parent:walker.currentNode.parentElement?.outerHTML.slice(0,700)||null})}return hits});
 fs.writeFileSync(path.join(out,'menu-null-text-diagnostics.json'),JSON.stringify(nullTextDiagnostics,null,2));
 await page.screenshot({path:path.join(out,'desktop-menu.png'),fullPage:true});
 const desktopShell=await page.locator('#menu').evaluate(el=>{const r=el.getBoundingClientRect();return{x:r.x,width:r.width,center:r.x+r.width/2,viewport:innerWidth}});
 check('Desktop menu uses a centered 920px maximum composition',desktopShell.width<=920&&Math.abs(desktopShell.center-desktopShell.viewport/2)<=2,desktopShell);
 check('Menu UPG points badge is visible',await page.locator('.ui-menu-upg').isVisible()&&(await page.locator('.ui-menu-upg').textContent()).trim().startsWith('UPG'));
 const menuBrand=await page.locator('.ui-menu-brand').evaluate(el=>{const r=el.getBoundingClientRect();return{center:r.left+r.width/2,viewport:innerWidth,mark:getComputedStyle(el.querySelector('.ui-menu-mark')).display}});
 check('Menu title and town pill are centered between the corner controls',Math.abs(menuBrand.center-menuBrand.viewport/2)<2&&menuBrand.mark==='none',menuBrand);

 check('DATA & SUPPORT remains a distinct menu group',await page.locator('#uiMenuHome .ui-menu-support').isVisible()&&(await page.locator('#uiMenuHome .ui-menu-support').innerText()).includes('DATA & SUPPORT'));
 const townCtaStyle=await page.locator('#mTown').evaluate(el=>({backgroundImage:getComputedStyle(el).backgroundImage,color:getComputedStyle(el).color}));
 check('BACK TO TOWN uses the crimson/pink exit treatment',townCtaStyle.backgroundImage.includes('239, 71, 111')&&townCtaStyle.color==='rgb(255, 255, 255)',townCtaStyle);
 const menuTileGeometry=await page.locator('#uiMenuHome .ui-menu-grid .ui-menu-icon-card').evaluateAll(items=>items.map(el=>{const r=el.getBoundingClientRect(),copy=el.querySelector('.ui-menu-action-copy'),c=copy?.getBoundingClientRect();return{label:copy?.querySelector('strong')?.textContent||'',x:r.x,y:r.y,width:r.width,height:r.height,textFits:!!c&&c.right<=r.right+1&&c.left>=r.left-1}}));
 check('Menu uses the four Stage One tiles in reference order',menuTileGeometry.length===4&&menuTileGeometry.map(x=>x.label).join('|')==='UPGRADES|MY TEAM|PLAYBOOK|GOALS & STATS'&&Math.abs(menuTileGeometry[0].y-menuTileGeometry[1].y)<3&&menuTileGeometry[2].y>menuTileGeometry[0].y&&Math.abs(menuTileGeometry[2].y-menuTileGeometry[3].y)<3,menuTileGeometry);
 check('Menu card labels do not clip',menuTileGeometry.every(x=>x.textFits),menuTileGeometry);
 const menuCardBorders=await page.locator('#uiMenuHome .ui-menu-grid .ui-menu-icon-card').evaluateAll(items=>items.map(el=>getComputedStyle(el).borderTopColor));
 check('Menu uses a gold UPGRADES tile and cyan frames for the other three actions',menuCardBorders[0]==='rgba(245, 184, 65, 0.88)'&&menuCardBorders.slice(1).every(x=>x==='rgba(77, 225, 242, 0.82)'),menuCardBorders);
 await page.locator('.ui-menu-playbook').click();
 check('Playbook overlay opens',await page.locator('.ui-menu-playbook-overlay').isVisible());
 const playCount=await page.locator('.ui-menu-play-card').count();
 check('Playbook entries render',playCount>0,playCount);
 check('Playbook route diagrams render',await page.locator('.ui-menu-play-diagram-wrap svg').count()===playCount);
 await page.locator('.ui-menu-play-card').first().click();check('Playbook selected card receives gold treatment',await page.locator('.ui-menu-play-card.is-selected').count()===1);
 await page.locator('.ui-menu-playbook-flip').click();check('Playbook FLIP control toggles diagrams',await page.locator('.ui-menu-playbook-flip').getAttribute('aria-pressed')==='true');
 await page.locator('.ui-menu-playbook-flip').click();
 const playbookDiagram=await page.locator('.ui-menu-play-diagram-wrap svg').first().evaluate(el=>({height:el.getBoundingClientRect().height,width:el.getBoundingClientRect().width}));
 check('Desktop playbook route diagrams use the enlarged presentation',playbookDiagram.height>=115,playbookDiagram);
 await page.screenshot({path:path.join(out,'desktop-playbook.png'),fullPage:true});
 await page.locator('[data-filter="RUN"]').click();
 const runCards=await page.locator('.ui-menu-play-card span').allTextContents();
 check('Playbook category filter works',runCards.length>0&&runCards.every(x=>x==='RUN'),runCards);
 await page.locator('[data-filter="ALL"]').click();
 await page.locator('.ui-menu-playbook-back').click();
 check('Playbook returns to menu',!(await page.locator('.ui-menu-playbook-overlay').isVisible()));

 await page.setViewportSize({width:390,height:844});
 await page.locator('#mGoals').click();
 check('GOALS & STATS opens as a modal screen',await page.locator('#goalsP').isVisible());
 check('GOALS & STATS has three accessible tabs',await page.locator('#goalsP [role="tab"]').count()===3);
 check('GOALS & STATS starts on CHALLENGES',await page.locator('#ui-goals-tab-challenges').getAttribute('aria-selected')==='true'&&await page.locator('#ui-goals-panel-challenges').isVisible());
 const trophyBadge=await page.locator('#goalsP .ui-goals-trophy').evaluate(el=>({count:el.querySelector('.ui-goals-trophy-count')?.textContent||'',width:el.getBoundingClientRect().width}));
 check('Goals header includes the live trophy progress badge',trophyBadge.count==='0/13'&&trophyBadge.width>=50,trophyBadge);
 const goalsTabRail=await page.locator('#goalsP .ui-goals-tabs').evaluate(el=>({radius:getComputedStyle(el).borderRadius,border:getComputedStyle(el).borderTopWidth}));
 check('Goals tabs use one segmented rounded rail',goalsTabRail.radius==='999px'&&parseFloat(goalsTabRail.border)>=1,goalsTabRail);
 const challengeFrame=await page.locator('#ui-goals-panel-challenges .ui-goals-challenge').first().evaluate(el=>({border:getComputedStyle(el).borderTopWidth,color:getComputedStyle(el).borderTopColor,shadow:getComputedStyle(el).boxShadow}));
 check('Challenge cards use the cyan outer and gold inset frame from the mockup',parseFloat(challengeFrame.border)>=2&&challengeFrame.color==='rgba(77, 225, 242, 0.82)'&&challengeFrame.shadow.includes('245, 184, 65'),challengeFrame);

 const challengePanel=await page.locator('#ui-goals-panel-challenges').evaluate(el=>({cards:el.querySelectorAll('.ui-goals-challenge').length,pills:el.querySelectorAll('.ui-goals-trail-pill').length,complete:el.querySelectorAll('.ui-goals-challenge.is-complete').length}));
 check('Challenge cards show color-coded trail rewards',challengePanel.cards>0&&challengePanel.pills===challengePanel.cards,challengePanel);
 await page.screenshot({path:path.join(out,'goals-stats-challenges.png')});
 const challengeBottom=await page.locator('#goalsP').evaluate(el=>{const content=el.querySelector('.ui-goals-content');content.scrollTop=content.scrollHeight;const last=el.querySelector('#ui-goals-panel-challenges .ui-goals-challenge:last-child').getBoundingClientRect(),close=el.querySelector('.ui-goals-close').getBoundingClientRect();return{gap:close.top-last.bottom,paddingBottom:parseFloat(getComputedStyle(content).paddingBottom),scrollTop:content.scrollTop,contentBottom:content.getBoundingClientRect().bottom,closeTop:close.top}});
 check('Pinned CLOSE footer clears the final challenge card after scrolling',challengeBottom.gap>=8&&challengeBottom.paddingBottom>=10,challengeBottom);
 await page.screenshot({path:path.join(out,'goals-stats-challenges-bottom.png')});
 await page.locator('#goalsP .ui-goals-content').evaluate(el=>el.scrollTop=0);
 await page.locator('#ui-goals-tab-achievements').click();
 const achievementPanel=await page.locator('#ui-goals-panel-achievements').evaluate(el=>({visible:!el.hidden,cards:el.querySelectorAll('.ui-goals-achievement').length,medals:el.querySelectorAll('.ui-goals-medal').length,counters:el.querySelectorAll('.ui-goals-achievement-count').length,progress:el.querySelectorAll('.ui-goals-progress').length,selected:document.querySelector('#ui-goals-tab-achievements')?.getAttribute('aria-selected')}));
 check('Achievements tab shows medals, counters and progress',achievementPanel.visible&&achievementPanel.cards>0&&achievementPanel.medals===achievementPanel.cards&&achievementPanel.counters===achievementPanel.cards&&achievementPanel.progress>0&&achievementPanel.selected==='true',achievementPanel);
 const oneOffCount=await page.locator('#ui-goals-panel-achievements .ui-goals-achievement-count').first().textContent();
 check('One-off achievements show 0 / 1 counters instead of LOCKED labels',oneOffCount.trim()==='0 / 1',oneOffCount);

 await page.screenshot({path:path.join(out,'goals-stats-achievements.png')});
 const achievementBottom=await page.locator('#goalsP').evaluate(el=>{const content=el.querySelector('.ui-goals-content');content.scrollTop=content.scrollHeight;const last=el.querySelector('#ui-goals-panel-achievements .ui-goals-achievement:last-child').getBoundingClientRect(),close=el.querySelector('.ui-goals-close').getBoundingClientRect();return{gap:close.top-last.bottom,scrollTop:content.scrollTop,contentBottom:content.getBoundingClientRect().bottom,closeTop:close.top}});
 check('Pinned CLOSE footer clears the final achievement card after scrolling',achievementBottom.gap>=8,achievementBottom);
 await page.screenshot({path:path.join(out,'goals-stats-achievements-bottom.png')});
 await page.locator('#goalsP .ui-goals-content').evaluate(el=>el.scrollTop=0);
 await page.locator('#ui-goals-tab-stats').click();
 const teamStatsPanel=await page.locator('#ui-goals-panel-stats').evaluate(el=>({visible:!el.hidden,cards:el.querySelectorAll('.ui-goals-stat-card').length,note:el.querySelector('.ui-goals-note')?.textContent||'',selected:document.querySelector('#ui-goals-tab-stats')?.getAttribute('aria-selected')}));
 check('Team Stats uses four career cards and the MY SQUAD > CAREER note',teamStatsPanel.visible&&teamStatsPanel.cards===4&&teamStatsPanel.note.includes('MY SQUAD')&&teamStatsPanel.note.includes('CAREER')&&teamStatsPanel.selected==='true',teamStatsPanel);
 const statLayout=await page.locator('#ui-goals-panel-stats .ui-goals-stat-card').evaluateAll(es=>es.map(el=>({label:el.querySelector('.ui-goals-stat-label')?.textContent.trim(),x:el.getBoundingClientRect().x,width:el.getBoundingClientRect().width,skill:el.classList.contains('is-skill'),cells:el.querySelectorAll('.ui-goals-skill-cell').length})));
 check('Team Stats follows two-up, full-width Receiving and three-cell Skill Moves layout',statLayout.length===4&&statLayout[0].x>statLayout[1].x&&statLayout[2].width>=statLayout[0].width*1.8&&statLayout[3].width>=statLayout[0].width*1.8&&statLayout[3].skill&&statLayout[3].cells===3,statLayout);

 await page.screenshot({path:path.join(out,'goals-stats-team-stats.png')});
 await page.locator('.ui-goals-close').click();
 check('GOALS & STATS CLOSE returns to the menu',await page.locator('#goalsP').count()===0);
 await page.locator('#mGoals').click();
 await page.keyboard.press('Escape');
 check('GOALS & STATS closes with Escape',await page.locator('#goalsP').count()===0);
 await page.setViewportSize({width:1440,height:1000});

 const tabDiagnostics=await page.locator('.ui-menu-tabs').evaluate(el=>({rect:(()=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}})(),display:getComputedStyle(el).display,visibility:getComputedStyle(el).visibility,buttons:[...el.querySelectorAll('button')].map(b=>({tab:b.dataset.tab,rect:(()=>{const r=b.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}})(),display:getComputedStyle(b).display,visibility:getComputedStyle(b).visibility}))}));
 check('Tab bar and Settings tab visible',await page.locator('[data-tab="settings"]').isVisible(),tabDiagnostics);
 await page.locator('[data-tab="settings"]').click();
 check('Settings panel switches',await page.locator('#uiMenuSettings').isVisible()&&!(await page.locator('#uiMenuHome').isVisible()));
 check('Settings screen omits the Home-only current-goal card',await page.locator('.ui-menu-goal').isHidden());

 const settingsDensity=await page.locator('#uiMenuSettings .ui-menu-setting').first().evaluate(el=>({paddingTop:getComputedStyle(el).paddingTop,paddingBottom:getComputedStyle(el).paddingBottom}));
 check('Settings rows use the tightened Stage One spacing',settingsDensity.paddingTop==='7px'&&settingsDensity.paddingBottom==='7px',settingsDensity);
 for(const id of ['mMus','mSfx','mVol','mHap','mCam','mLT','mReset'])check('Settings control visible: '+id,await page.locator('#'+id).count()===1&&await page.locator('#'+id).isVisible());
 check('Volume setting has a leading icon',await page.locator('label[for="mVol"] .ui-setting-icon').count()===1);
 const resolutionDiagnostics=await page.evaluate(()=>{
  const describe=el=>el?{tag:el.tagName,id:el.id||null,className:typeof el.className==='string'?el.className:'',text:(el.innerText||el.textContent||'').trim().slice(0,180),html:el.outerHTML.slice(0,900),parent:el.parentElement?.outerHTML.slice(0,1400)||null}:null;
  return{settingsText:document.querySelector('#uiMenuSettings')?.innerText||'',mRS:describe(document.querySelector('#mRS')),resolutionLike:[...document.querySelectorAll('[id],[class]')].filter(e=>/resol/i.test((e.id||'')+' '+(typeof e.className==='string'?e.className:''))).slice(0,20).map(describe),group:describe(document.querySelector('.ui-resolution-group')),settingsChildren:[...(document.querySelector('#uiMenuSettings')?.children||[])].map(describe)};
 });
 await page.screenshot({path:path.join(out,'desktop-settings-pre-resolution.png'),fullPage:true});
 fs.writeFileSync(path.join(out,'resolution-diagnostics.json'),JSON.stringify(resolutionDiagnostics,null,2));
 const resolutionGroup=page.locator('.ui-resolution-group'),resolutionCount=await resolutionGroup.locator('button').count();
 const originalResolution=await page.locator('#mRS').count()?((await page.locator('#mRS').textContent())||'').trim():null;
 check('Resolution segmented control visible',await resolutionGroup.isVisible().catch(()=>false)&&resolutionCount===3,{resolutionCount,diagnostics:resolutionDiagnostics});
 const resolutionButtons=await resolutionGroup.locator('button').evaluateAll(buttons=>buttons.map(b=>({text:b.textContent.trim(),value:b.dataset.value,pressed:b.getAttribute('aria-pressed')}))).catch(()=>[]);
 check('Resolution options are LOW / MED / HIGH', ['LOW','MED','HIGH'].every(label=>resolutionButtons.some(b=>b.text===label)), resolutionButtons);
 if(resolutionButtons.some(b=>b.text==='MED')&&originalResolution!==null){
  await resolutionGroup.locator('button').filter({hasText:'MED'}).click();
  const afterResolution=(await page.locator('#mRS').textContent())?.trim()||'';
  check('Resolution selection updates original setting',afterResolution.includes('MEDIUM'),{before:originalResolution,after:afterResolution});
  const restoreResolution=originalResolution.match(/RESOLUTION:\s*(.+)/i)?.[1]?.trim().toUpperCase()||'HIGH';
  const restoreLabel=restoreResolution==='MEDIUM'?'MED':'HIGH';
  await resolutionGroup.locator('button').filter({hasText:restoreLabel}).click();
  if(restoreResolution==='SHARP')await page.locator('#mRS').evaluate(el=>{el.click();el.click();el.click()});
  check('Resolution selection restores original setting',(await page.locator('#mRS').textContent())?.trim()===originalResolution);
 }else{
  check('Resolution native control exists',originalResolution!==null,{originalResolution,diagnostics:resolutionDiagnostics});
  check('Resolution selection can be exercised',false,'No usable segmented resolution/native control pair');
 }
 await page.locator('#mReset').click();
 check('Reset confirmation modal opens',await page.locator('.ui-menu-modal-backdrop').isVisible());
 check('Reset requires explicit confirmation', (await page.locator('#mReset').textContent())?.trim()==='RESET PROGRESS');
 await page.setViewportSize({width:390,height:844});
 const resetModalGeometry=await page.locator('.ui-menu-confirm').evaluate(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,viewport:{width:innerWidth,height:innerHeight},backdropVisible:!!el.closest('.ui-menu-modal-backdrop')&&!el.closest('.ui-menu-modal-backdrop').hidden}});
 check('Portrait reset confirmation fits viewport',resetModalGeometry.backdropVisible&&resetModalGeometry.x>=0&&resetModalGeometry.y>=0&&resetModalGeometry.x+resetModalGeometry.width<=390&&resetModalGeometry.y+resetModalGeometry.height<=844,resetModalGeometry);
 await page.screenshot({path:path.join(out,'portrait-reset-confirm.png'),fullPage:true});
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('.ui-menu-cancel').click();
 check('Reset confirmation can be cancelled',!(await page.locator('.ui-menu-modal-backdrop').isVisible()));
 const music=page.locator('#mMus'),before=(await music.textContent())?.trim();
 await music.click();const after=(await music.textContent())?.trim();
 check('Music toggle responds',after!==before,{before,after});
 await music.click();check('Music toggle restores state',(await music.textContent())?.trim()===before);
 await page.locator('#mVol').evaluate(e=>{e.value='37';e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))});
 check('Volume input works',await page.locator('#mVol').inputValue()==='37');
 await page.screenshot({path:path.join(out,'desktop-settings.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:path.join(out,'portrait-settings.png'),fullPage:true});
 const settingsEnd=await page.evaluate(()=>{const sc=document.querySelector('#menu .ui-menu-content'),danger=document.querySelector('#uiMenuSettings .ui-menu-danger'),footer=document.querySelector('#menu .ui-menu-foot');if(!sc||!danger||!footer)return null;sc.scrollTop=sc.scrollHeight;const d=danger.getBoundingClientRect(),f=footer.getBoundingClientRect();return{scrollTop:sc.scrollTop,scrollHeight:sc.scrollHeight,clientHeight:sc.clientHeight,paddingBottom:getComputedStyle(sc).paddingBottom,dangerBottom:d.bottom,footerTop:f.top,clearance:f.top-d.bottom,overflowY:getComputedStyle(sc).overflowY}});check('Settings danger zone can scroll fully clear of BACK TO TOWN',!!settingsEnd&&settingsEnd.overflowY==='auto'&&parseFloat(settingsEnd.paddingBottom)>=24&&settingsEnd.clearance>=8,settingsEnd);
 await page.setViewportSize({width:1440,height:1000});

 await page.locator('[data-tab="credits"]').click();
 check('Credits panel switches',await page.locator('#uiMenuCredits').isVisible());
 check('Credits tab removes the Home-only CURRENT GOAL card',await page.locator('#menu .ui-menu-goal').isHidden());
 const credit=(await page.locator('#uiMenuCredits').innerText()).toUpperCase();
 check('Credits categories present',['3D ART & UI','MUSIC & SFX','TOWN AMBIENCE'].every(s=>credit.includes(s)));
 check('Credits use three concise grouped cards',await page.locator('#uiMenuCredits .ui-menu-credit-group').count()===3);
 const creditDetails=await page.locator('#uiMenuCredits .ui-menu-credit-details').evaluateAll(ds=>ds.map(d=>({open:d.open,text:d.textContent})));
 check('Credits show the full source attribution in all three reference cards',creditDetails.length===3&&creditDetails.every(d=>d.open)&&creditDetails[0].text.includes('Kay Lousberg')&&creditDetails[1].text.includes('glitchart')&&creditDetails[2].text.includes('Thimras')&&creditDetails[2].text.includes('Kevin MacLeod'),creditDetails);

 check('Build footer retained',await page.locator('#mBuild').count()===1&&await page.locator('#mBuild').isVisible());
 await page.waitForFunction(()=>document.querySelector('.ui-menu-dev #mSnd')&&document.querySelector('.ui-menu-dev #mKKF'),null,{timeout:5000});
 check('Build trigger is concise', (await page.locator('#mBuild').textContent()).trim()==='BUILD INFO');
 check('Detailed build metadata is kept in developer drawer',(await page.locator('.ui-menu-dev .ui-menu-build-details').textContent()).includes('TEST BUILD ROUTE 2 START'));
 check('Asset diagnostics are moved into developer drawer',await page.locator('.ui-menu-dev #mSnd').count()===1&&await page.locator('.ui-menu-dev #mKKF').count()===1);
 check('Primary Credits hides raw asset diagnostics',await page.locator('#uiMenuCredits > #mSnd, #uiMenuCredits > #mKKF').count()===0);
 check('Developer drawer is hidden by default',!(await page.locator('.ui-menu-dev').isVisible()));
 await page.screenshot({path:path.join(out,'desktop-credits.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(120);await page.screenshot({path:path.join(out,'portrait-credits.png'),fullPage:true});await page.setViewportSize({width:1440,height:1000});
 for(let i=0;i<5;i++)await page.locator('#mBuild').click({delay:80});
 check('Developer drawer opens',await page.locator('.ui-menu-dev').isVisible());
 const devMaxHeight=await page.locator('.ui-menu-dev').evaluate(el=>parseFloat(getComputedStyle(el).maxHeight));
 check('Developer drawer remains a bounded utility panel',devMaxHeight<=220,devMaxHeight);
 const dev=await Promise.all(['#mRO','#mPL','#mPR'].map(s=>page.locator(s).count()));
 check('Developer controls retained',dev.every(n=>n===1),dev);
 await page.screenshot({path:path.join(out,'desktop-credits-developer.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:path.join(out,'portrait-credits-developer.png'),fullPage:true});
 await page.setViewportSize({width:1440,height:1000});
 for(let i=0;i<5;i++)await page.locator('#mBuild').click({delay:80});
 check('Developer drawer closes',!(await page.locator('.ui-menu-dev').isVisible()));
 await page.locator('[data-tab="menu"]').focus();await page.keyboard.press('ArrowRight');
 check('Keyboard tab navigation works',await page.locator('[data-tab="settings"]').getAttribute('aria-selected')==='true');

 const assets=await page.evaluate(async()=>Promise.all(['audio/amb_fy.4e6b0cb4.mp3','models/kk_barbarian.ebfa6c96.txt'].map(async p=>{
  try{const r=await fetch('/'+p,{cache:'no-store'}),b=await r.arrayBuffer();return{path:p,status:r.status,bytes:b.byteLength,contentType:r.headers.get('content-type')}}
  catch(e){return{path:p,error:String(e)}}
 })));
 check('Audio asset request succeeds',assets[0].status===200&&assets[0].bytes>1000,assets[0]);
 check('Model asset request succeeds',assets[1].status===200&&assets[1].bytes>100,assets[1]);

 for(const v of [{name:'portrait',width:390,height:844},{name:'landscape',width:844,height:390}]){
  await page.setViewportSize({width:v.width,height:v.height});await page.locator('[data-tab="menu"]').click();await page.waitForTimeout(120);
  const g=await page.locator('#menu').evaluate(e=>{
   const r=e.getBoundingClientRect(),t=document.querySelector('#mTown').getBoundingClientRect(),b=document.querySelector('.ui-menu-tabs').getBoundingClientRect(),c=document.querySelector('.ui-menu-content');
   return{menu:{x:r.x,width:r.width,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth},town:{top:t.top,bottom:t.bottom},tabs:{top:b.top,bottom:b.bottom},content:{scrollHeight:c.scrollHeight,clientHeight:c.clientHeight},viewport:{width:innerWidth,height:innerHeight}}
  });
  check(v.name+' menu fits width',g.menu.x>=-1&&g.menu.x+g.menu.width<=v.width+1&&g.menu.scrollWidth<=g.menu.clientWidth+1,g);
  const legacySquadRow=await page.locator('#menu .btnrow:has(#mSquad,#mTeam)').evaluate(el=>({display:getComputedStyle(el).display,buttonText:[...el.querySelectorAll('button')].map(b=>b.textContent.trim()),hiddenButtons:[...el.querySelectorAll('button')].filter(b=>b.hidden).map(b=>b.id)}));
  check(v.name+' legacy MY SQUAD row is hidden after menu controls are relocated',legacySquadRow.display==='none',legacySquadRow);
  if(v.name==='portrait'){const brand=await page.evaluate(()=>{const t=document.querySelector('.ui-menu-title'),u=document.querySelector('.ui-menu-upg');const a=t.getBoundingClientRect(),b=u.getBoundingClientRect();return{titleRight:a.right,upgLeft:b.left,titleScroll:t.scrollWidth,titleClient:t.clientWidth}});check('Portrait menu title clears UPG badge',brand.titleRight<=brand.upgLeft-4&&brand.titleScroll<=brand.titleClient+1,brand)}
  check(v.name+' return button visible',g.town.top>=-1&&g.town.bottom<=v.height+1,g.town);
  check(v.name+' tabs visible',g.tabs.top>=-1&&g.tabs.bottom<=v.height+1,g.tabs);
  await page.screenshot({path:path.join(out,v.name+'-menu.png'),fullPage:true});
 }
 await page.setViewportSize({width:360,height:780});await page.waitForTimeout(120);
 const narrowMenu=await page.locator('#menu').evaluate(el=>{const r=el.getBoundingClientRect();return{x:r.x,width:r.width,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,viewport:innerWidth}});
 check('360px portrait menu has no horizontal overflow',narrowMenu.x>=-1&&narrowMenu.x+narrowMenu.width<=360&&narrowMenu.scrollWidth<=narrowMenu.clientWidth+1,narrowMenu);
 const narrowBrand=await page.evaluate(()=>{const t=document.querySelector('.ui-menu-title'),u=document.querySelector('.ui-menu-upg'),a=t.getBoundingClientRect(),b=u.getBoundingClientRect();return{titleRight:a.right,upgLeft:b.left,titleScroll:t.scrollWidth,titleClient:t.clientWidth}});
 check('360px portrait title clears the UPG badge',narrowBrand.titleRight<=narrowBrand.upgLeft-4&&narrowBrand.titleScroll<=narrowBrand.titleClient+1,narrowBrand);
 const goalsLabel=await page.locator('#mGoals .ui-menu-action-copy strong').evaluate(el=>{const r=document.createRange();r.selectNodeContents(el);const rects=[...r.getClientRects()].map(x=>({x:x.x,y:x.y,width:x.width,height:x.height}));return{text:el.textContent.trim(),fontSize:getComputedStyle(el).fontSize,lineHeight:getComputedStyle(el).lineHeight,rects,lineCount:rects.length}});
 check('GOALS & STATS wraps to exactly two lines at 360px',goalsLabel.text==='GOALS & STATS'&&goalsLabel.lineCount===2,goalsLabel);
 const playbookFit=await page.evaluate(()=>{const t=document.querySelector('.ui-menu-playbook .ui-menu-action-copy'),s=t?.querySelector('strong'),a=document.querySelector('.ui-menu-playbook .ui-menu-card-arrow');if(!t||!s||!a)return null;const range=document.createRange();range.selectNodeContents(s);const textRects=[...range.getClientRects()];const x=t.getBoundingClientRect(),y=a.getBoundingClientRect();return{textRight:Math.max(...textRects.map(r=>r.right)),copyRight:x.right,arrowLeft:y.left,clearance:y.left-Math.max(...textRects.map(r=>r.right)),copyClearance:y.left-x.right,cardWidth:document.querySelector('.ui-menu-playbook').getBoundingClientRect().width}});
 check('360px Playbook label clears its arrow without overlap',!!playbookFit&&playbookFit.clearance>=4&&playbookFit.copyClearance>=4,playbookFit);
 await page.screenshot({path:path.join(out,'narrow-menu-360.png'),fullPage:true});
 await page.setViewportSize({width:1440,height:1000});

 await page.locator('#mTown').evaluate(el=>el.click());
 await page.waitForFunction(()=>{const w=document.querySelector('#world');return w&&!w.hidden&&getComputedStyle(w).display!=='none'},null,{timeout:10000}).catch(()=>{});
 const world=await page.locator('#world').isVisible();check('Back to town opens overworld',world);
 if(world){await page.screenshot({path:path.join(out,'overworld-after-return.png'),fullPage:true});const b=page.locator('#owMenu');check('Overworld menu button visible',await b.count()===1&&await b.isVisible());check('Overworld town pill visible',await page.locator('#owTop .ui-ow-pill').isVisible());const hudSpacing=await page.evaluate(()=>{const a=document.querySelector('#owTown').getBoundingClientRect(),s=document.querySelector('#owTop .ui-ow-status').getBoundingClientRect();return{gap:s.left-a.right,computedGap:getComputedStyle(document.querySelector('#owTop .ui-ow-pill')).columnGap,town:document.querySelector('#owTown').textContent,status:document.querySelector('#owTop .ui-ow-status').textContent}});check('Overworld town label has clear space before CLEARED pill',hudSpacing.gap>=8,hudSpacing);check('Overworld status and UPG badges visible',await page.locator('#owTop .ui-ow-status').isVisible()&&await page.locator('#owTop .ui-ow-upg').isVisible());check('Overworld GOAL strip visible',await page.locator('#owTop .ui-ow-goal').isVisible());check('Contextual A-button label visible',await page.locator('#owA .ui-ow-a-label').isVisible()&&!!(await page.locator('#owA .ui-ow-a-label').textContent())?.trim());const canvas=await page.locator('#owc').evaluate(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,viewport:{width:innerWidth,height:innerHeight}}});check('Overworld canvas fills viewport',canvas.x<=1&&canvas.y<=1&&canvas.width>=canvas.viewport.width-1&&canvas.height>=canvas.viewport.height-1,canvas);await page.setViewportSize({width:390,height:844});await page.waitForTimeout(120);const headerGap=await page.locator('#owTop .ui-ow-pill').evaluate(el=>{const a=el.querySelector('#owTown').getBoundingClientRect(),b=el.querySelector('.ui-ow-status').getBoundingClientRect();return b.left-a.right});check('Overworld title and CLEARED pill have 8px breathing room',headerGap>=8,headerGap);await page.screenshot({path:path.join(out,'overworld-portrait.png'),fullPage:true});const pc=await page.locator('#owc').evaluate(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,viewport:{width:innerWidth,height:innerHeight}}});check('Portrait Overworld canvas fills viewport',pc.x<=1&&pc.y<=1&&pc.width>=pc.viewport.width-1&&pc.height>=pc.viewport.height-1,pc);await page.setViewportSize({width:844,height:390});await page.waitForTimeout(120);await b.click();check('Overworld menu reopens',await menuIsActuallyVisible())}
 // Exercise the real match flow in landscape: matchup, play-calling sheet, pre-snap, live play and post-game.
 const matchStart=await page.evaluate(()=>{const crew=window.SG&&window.SG.CREWS&&window.SG.CREWS.find(c=>!c.captain);if(!crew||typeof window.SG.startMatch!=='function')return false;window.SG.startMatch(crew);return true});
 check('A real crew match can be started for visual QA',matchStart);
 if(matchStart){
  await page.waitForFunction(()=>{const e=document.querySelector('#mu');return e&&e.classList.contains('on')},null,{timeout:15000});
  await page.waitForFunction(()=>document.querySelector('#mu .tap')?.classList.contains('go'),null,{timeout:15000});
  await page.evaluate(()=>{const state=window.SG&&typeof window.SG.muState==='function'?window.SG.muState():null;if(state&&state.auto){clearTimeout(state.auto);state.auto=0}});
  check('Pre-game matchup overlay remains visible for inspection',await page.locator('#mu').isVisible());
  check('Pre-game TAP TO PLAY prompt fits inside the viewport',await page.locator('#mu .tap').isVisible());
  const introGap=await page.evaluate(()=>{const b=document.querySelector('#mu .bar').getBoundingClientRect(),t=document.querySelector('#mu .tap').getBoundingClientRect();return{gap:t.top-b.bottom,tapBg:getComputedStyle(document.querySelector('#mu .tap')).backgroundColor,tapBorder:getComputedStyle(document.querySelector('#mu .tap')).borderTopWidth}});
  check('Pre-game TAP TO PLAY is separated from the progress bar',introGap.gap>=8&&introGap.tapBg==='rgb(77, 225, 242)'&&parseFloat(introGap.tapBorder)>=1,introGap);
  const matchupBadges=await page.locator('#mu .pn').evaluateAll(es=>es.map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return{bg:s.backgroundColor,border:s.borderTopWidth,radius:s.borderTopLeftRadius,width:r.width,height:r.height}}));check('Both matchup logos sit on solid rounded navy badge cards',matchupBadges.length===2&&matchupBadges.every(x=>x.bg==='rgb(19, 22, 32)'&&parseFloat(x.border)>=2&&parseFloat(x.radius)>=18&&x.width>=170&&x.height>=190),matchupBadges);
 const matchupPanelFills=await page.locator('#mu .pn').evaluateAll(es=>es.map(el=>getComputedStyle(el).backgroundColor));check('Pre-game team badge cards remain solid matte navy over the atmosphere',matchupPanelFills.length===2&&matchupPanelFills.every(x=>x==='rgb(19, 22, 32)'),matchupPanelFills);
 const matchupBadgeAccents=await page.locator('#mu .pn').evaluateAll(es=>es.map(el=>getComputedStyle(el).borderTopColor));
 check('Pre-game team badge cards use gold home and cyan away accents',matchupBadgeAccents[0]==='rgb(245, 184, 65)'&&matchupBadgeAccents[1]==='rgb(77, 225, 242)',matchupBadgeAccents);
 const matchupLogoLayout=await page.locator('#mu .pn').evaluateAll(es=>es.map(el=>{const c=el.getBoundingClientRect(),l=el.querySelector('.lg').getBoundingClientRect(),o=el.querySelector('.ov').getBoundingClientRect();return{card:{left:c.left,right:c.right,top:c.top,bottom:c.bottom},logo:{left:l.left,right:l.right,top:l.top,bottom:l.bottom},ovr:{left:o.left,right:o.right,top:o.top,bottom:o.bottom}}}));
 check('Pre-game logos are contained inside their cards and OVR pills sit below',matchupLogoLayout.length===2&&matchupLogoLayout.every(x=>x.logo.left>=x.card.left&&x.logo.right<=x.card.right&&x.logo.top>=x.card.top&&x.logo.bottom<=x.card.bottom&&x.ovr.top>=x.card.bottom-1),matchupLogoLayout);
 const pregameAtmosphere=await page.evaluate(()=>{const split=document.querySelector('#mu .split'),left=document.querySelector('#mu .fx1'),right=document.querySelector('#mu .fx2'),lb=getComputedStyle(left),rb=getComputedStyle(right),lp=getComputedStyle(left,'::before'),rp=getComputedStyle(right,'::before');return{base:getComputedStyle(split).backgroundImage,splitChildren:[...split.children].map(n=>getComputedStyle(n).display),left:{background:lb.backgroundImage,clip:lb.clipPath,opacity:lb.opacity,texture:lp.backgroundImage,pseudo:lp.content},right:{background:rb.backgroundImage,clip:rb.clipPath,opacity:rb.opacity,skyline:rp.backgroundImage,shape:rp.clipPath,pseudo:rp.content},town:getComputedStyle(document.querySelector('#mu .top .town')).color,tag:getComputedStyle(document.querySelector('#mu .top .tag')).color}});
 check('Pre-game pairs warm floodlit turf with a defocused town skyline and keeps halftone split layers off',pregameAtmosphere.base.includes('radial-gradient')&&pregameAtmosphere.splitChildren.every(x=>x==='none')&&pregameAtmosphere.left.background.includes('repeating-linear-gradient')&&pregameAtmosphere.left.texture.includes('repeating-linear-gradient')&&pregameAtmosphere.left.pseudo!=='none'&&pregameAtmosphere.right.background.includes('radial-gradient')&&pregameAtmosphere.right.skyline.includes('repeating-linear-gradient')&&pregameAtmosphere.right.shape.includes('polygon')&&pregameAtmosphere.right.pseudo!=='none'&&pregameAtmosphere.town==='rgb(245, 184, 65)'&&pregameAtmosphere.tag==='rgb(77, 225, 242)',pregameAtmosphere);

  
  const matchupFinish=await page.evaluate(()=>{const split=document.querySelector('#mu .split'),fx=document.querySelector('#mu .fx1');return{beam:getComputedStyle(split).backgroundImage,lightBank:getComputedStyle(fx,'::after').content,lightSize:getComputedStyle(fx,'::after').width,home:getComputedStyle(document.querySelector('#mu .pn.my')).backgroundColor,away:getComputedStyle(document.querySelector('#mu .pn.op')).backgroundColor}});
  check('Pre-game backdrop includes the handoff-style diagonal floodlight beam and stadium light bank',matchupFinish.beam.includes('linear-gradient(118deg')&&matchupFinish.lightBank!=='none'&&matchupFinish.lightSize!=='0px'&&matchupFinish.home==='rgb(19, 22, 32)'&&matchupFinish.away==='rgb(19, 22, 32)',matchupFinish);

await page.screenshot({path:path.join(out,'match-pre-game.png'),fullPage:true});
  await page.locator('#mu').click({position:{x:420,y:350}});
  await page.waitForFunction(()=>{const e=document.querySelector('#sheet');return e&&!e.hidden},null,{timeout:10000});
  check('In-match playbook overlay opens',await page.locator('#sheet').isVisible());
  check('In-match CALL PLAY action visible',await page.locator('#callBtn').isVisible());
  check('In-match selected play has gold treatment',await page.locator('#cards .card.sel').count()===1);
  check('In-match FLIP control is visible',await page.locator('#flipBtn').isVisible());
  const playbookPalette=await page.locator('#sheet').evaluate(el=>({surface:getComputedStyle(el).backgroundColor,borderTop:getComputedStyle(el).borderTopColor,shadow:getComputedStyle(el).boxShadow}));
  check('In-match Playbook uses the unified matte navy surface and restrained gold edge',playbookPalette.surface==='rgb(19, 22, 32)'&&playbookPalette.borderTop==='rgba(245, 184, 65, 0.78)'&&!playbookPalette.shadow.includes('77, 225, 242'),playbookPalette);
  const playbookStates=await page.evaluate(()=>({inactive:getComputedStyle(document.querySelector('#pbTabs .pbTab:not(.on)')).backgroundColor,activeBorder:getComputedStyle(document.querySelector('#pbTabs .pbTab.on')).borderTopColor,selectedBorder:getComputedStyle(document.querySelector('#cards .card.sel')).borderTopColor,routeBg:getComputedStyle(document.querySelector('#cards .card canvas')).backgroundColor}));
  check('Playbook categories and selected play use consistent inner-navy and gold states',playbookStates.inactive==='rgb(28, 33, 48)'&&playbookStates.activeBorder==='rgb(245, 184, 65)'&&playbookStates.selectedBorder==='rgb(245, 184, 65)'&&playbookStates.routeBg==='rgb(16, 23, 34)',playbookStates);
  const callStyle=await page.locator('#callBtn').evaluate(el=>({backgroundColor:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));
  check('In-match CALL PLAY uses the cyan CTA treatment',callStyle.backgroundColor==='rgb(77, 225, 242)'&&callStyle.color==='rgb(8, 19, 27)',callStyle);
  await page.locator('#flipBtn').click();
  check('In-match FLIP toggles selected play orientation',await page.locator('#flipBtn').evaluate(el=>el.classList.contains('on')));
  const sheetTop=await page.locator('#sheet').evaluate(el=>el.getBoundingClientRect().top);check('In-match Playbook sheet clears scoreboard lower edge',sheetTop>=66,sheetTop);
  const playbookLayout=await page.locator('#cards').evaluate(el=>({columns:getComputedStyle(el).gridTemplateColumns.split(' ').length,cards:[...el.querySelectorAll('.card')].map(card=>{const title=card.querySelector('b');return{text:title?.innerText.trim()||'',fontSize:title?getComputedStyle(title).fontSize:null,scroll:title?.scrollWidth||0,client:title?.clientWidth||0,width:title?.getBoundingClientRect().width||0}})}));
  check('In-match Playbook uses four to five cards per landscape row and every title fits',playbookLayout.columns>=4&&playbookLayout.columns<=5&&playbookLayout.cards.length>0&&playbookLayout.cards.every(card=>card.scroll<=card.client+1&&card.width>0),playbookLayout);
  const diagramStyle=await page.locator('#cards .card canvas').first().evaluate(el=>({filter:getComputedStyle(el).filter,background:getComputedStyle(el).backgroundColor,card:getComputedStyle(el.closest('.card')).backgroundColor}));
  check('In-match route diagrams use neutral monochrome art and no brown/gold card fill',diagramStyle.filter.includes('grayscale(1)')&&diagramStyle.background==='rgb(16, 23, 34)'&&diagramStyle.card==='rgb(28, 33, 48)',diagramStyle);

await page.screenshot({path:path.join(out,'match-playbook-overlay.png'),fullPage:true});
  check('FIRST TO remains visible in the in-game playbook overlay',await page.locator('#tgtTag').isVisible());
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(120);await page.screenshot({path:path.join(out,'match-playbook-portrait.png'),fullPage:true});await page.setViewportSize({width:844,height:390});await page.waitForTimeout(120);
  await page.locator('#callBtn').click();
  await page.waitForFunction(()=>{const e=document.querySelector('#setbar');return e&&!e.hidden},null,{timeout:10000});
  check('Pre-snap action bar visible',await page.locator('#hike').isVisible());
  const hikeStyle=await page.locator('#hike').evaluate(el=>({backgroundColor:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));
  const hikeTextRGB=(hikeStyle.color.match(/\d+/g)||[]).map(Number);check('HIKE uses the solid cyan primary-action treatment',hikeStyle.backgroundColor==='rgb(77, 225, 242)'&&hikeTextRGB.length===3&&hikeTextRGB.every(v=>v<60),hikeStyle);
  const preSnapControls=await page.locator('#setbar button.sb').evaluateAll(es=>es.map(el=>({text:el.innerText.replace(/\\s+/g,' ').trim(),background:getComputedStyle(el).backgroundColor,border:getComputedStyle(el).borderTopColor,borderWidth:getComputedStyle(el).borderTopWidth})));
  check('Pre-snap CHANGE PLAY and SHOW PLAY use matte navy with gold borders',preSnapControls.length===2&&preSnapControls.every(x=>x.background==='rgb(19, 22, 32)'&&x.border==='rgb(245, 184, 65)'&&parseFloat(x.borderWidth)>=2),preSnapControls);
  const scoreCard=await page.locator('#bug').evaluate(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return{width:r.width,background:s.backgroundColor,borderRadius:s.borderTopLeftRadius,border:s.borderTopWidth}});
  check('Stage One in-game scoreboard is framed as a matte navy card',scoreCard.width<=1000&&scoreCard.background==='rgba(19, 22, 32, 0.96)'&&parseFloat(scoreCard.border)>=1&&parseFloat(scoreCard.borderRadius)>=8,scoreCard);
  const pauseControl=await page.locator('#exit').evaluate(el=>({radius:getComputedStyle(el).borderRadius,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height,label:el.getAttribute('aria-label')}));check('Scoreboard EXIT control is a circular accessible pause icon',pauseControl.radius==='50%'&&pauseControl.width===42&&pauseControl.height===42&&pauseControl.label==='Pause / exit match',pauseControl);
  const scoreboardControls=await page.evaluate(()=>{const a=document.querySelector('#bug').getBoundingClientRect(),clock=document.querySelector('#bClock'),c=clock.getBoundingClientRect(),readout=document.querySelector('#clockReadout').getBoundingClientRect(),t=document.querySelector('#tgtTag'),tr=t.getBoundingClientRect(),e=document.querySelector('#exit'),r=e.getBoundingClientRect(),s=getComputedStyle(e),inside=clock.contains(t);return{targetInsideClock:inside,targetText:t.textContent.trim(),targetRect:{left:tr.left,right:tr.right,top:tr.top,bottom:tr.bottom},clockRect:{left:c.left,right:c.right,top:c.top,bottom:c.bottom},readoutRect:{left:readout.left,right:readout.right,top:readout.top,bottom:readout.bottom},scoreboardRect:{left:a.left,right:a.right,top:a.top,bottom:a.bottom},exitRect:{left:r.left,right:r.right,top:r.top,bottom:r.bottom},exitRadius:s.borderTopLeftRadius,exitWidth:r.width,exitHeight:r.height,display:getComputedStyle(t).display,position:getComputedStyle(t).position,overlap:Math.min(readout.bottom,tr.bottom)-Math.max(readout.top,tr.top),gap:tr.left-readout.right}});
  check('Stage One FIRST TO target is integrated beside PLAY CLOCK inside the scoreboard',scoreboardControls.targetInsideClock&&scoreboardControls.targetText==='FIRST TO 21 WINS'&&scoreboardControls.display!=='none'&&scoreboardControls.position==='static'&&scoreboardControls.gap>=4&&scoreboardControls.overlap>0&&scoreboardControls.targetRect.right<=scoreboardControls.clockRect.right,scoreboardControls);
  check('Scoreboard circular EXIT control remains clearly separate',scoreboardControls.exitRadius==='50%'&&Math.abs(scoreboardControls.exitWidth-scoreboardControls.exitHeight)<=1,scoreboardControls);
  await page.screenshot({path:path.join(out,'match-pre-snap.png'),fullPage:true});
  const preHikeState=await page.locator('#hike').evaluate(el=>{const g=window.SG?.G,r=el.getBoundingClientRect(),hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);let snap=null;try{snap=window.SG?.snapDbg?.()}catch(e){snap={error:String(e)}}return{mode:g?.mode,fmode:window.SG?.F?.mode,crew:g?.crew?.id,crewR2:g?.crew?.r2,down:g?.down,togo:g?.togo,sel:g?.sel,selectedPlay:window.SG?.PLAYS?.[g?.sel]?.id,playKind:window.SG?.PLAYS?.[g?.sel]?.kind,fourthHidden:document.querySelector('#fourth')?.hidden,setbarHidden:document.querySelector('#setbar')?.hidden,disabled:el.disabled,handler:typeof el.onclick,startPlayWait:window.SG?.startPlay?._w||0,hitTarget:hit?.id||hit?.tagName,hitIsHike:hit===el||el.contains(hit),snapDbg:snap,zdBeat:!!document.querySelector('#zdBeat')}});
  check('HIKE is enabled in the active pre-snap state',preHikeState.mode==='set'&&preHikeState.fourthHidden&&!preHikeState.disabled&&preHikeState.handler==='function'&&preHikeState.hitIsHike,preHikeState);
  await page.locator('#hike').evaluate(el=>{window.__hikeEventTrace=[];for(const type of ['pointerdown','pointerup','click'])el.addEventListener(type,()=>window.__hikeEventTrace.push(type),true);const original=el.onclick;el.onclick=function(e){window.__hikeEventTrace.push('onclick');return original.call(this,e)}});
  await page.locator('#hike').click();
  const clickedLive=await page.waitForFunction(()=>window.SG?.G?.mode==='live'||window.SG?.F?.mode==='live',null,{timeout:45000}).then(()=>true).catch(()=>false);
  let liveState=await page.evaluate(()=>{const g=window.SG?.G;let snap=null;try{snap=window.SG?.snapDbg?.()}catch(e){snap={error:String(e)}}return{mode:g?.mode,fmode:window.SG?.F?.mode,ctlHidden:document.querySelector('#ctl')?.hidden,setbarHidden:document.querySelector('#setbar')?.hidden,startPlayWait:window.SG?.startPlay?._w||0,eventTrace:window.__hikeEventTrace||[],snapDbg:snap}});
  check('HIKE receives real pointer-up and click activation',liveState.eventTrace.includes('pointerup')&&liveState.eventTrace.includes('click')&&liveState.eventTrace.includes('onclick'),liveState.eventTrace);
  check('HIKE button click starts live play',clickedLive,liveState);
  const snapReadiness=liveState.snapDbg?.snapReady;
  check('HIKE snaps only after required player sprites are ready',!!snapReadiness&&snapReadiness.artReady===true&&snapReadiness.carryReady===true&&snapReadiness.missing===0,{snapReadiness,liveState});
  check('HIKE readiness wait stays within 20 seconds',Number.isFinite(snapReadiness?.waitMs)&&snapReadiness.waitMs<=20000,snapReadiness);
  if(!clickedLive){
   const directState=await page.evaluate(()=>{window.SG?.startPlay?.();const g=window.SG?.G;let snap=null;try{snap=window.SG?.snapDbg?.()}catch(e){snap={error:String(e)}}return{mode:g?.mode,fmode:window.SG?.F?.mode,crew:g?.crew?.id,crewR2:g?.crew?.r2,down:g?.down,togo:g?.togo,sel:g?.sel,selectedPlay:window.SG?.PLAYS?.[g?.sel]?.id,playKind:window.SG?.PLAYS?.[g?.sel]?.kind,fourthHidden:document.querySelector('#fourth')?.hidden,startPlayWait:window.SG?.startPlay?._w||0,eventTrace:window.__hikeEventTrace||[],snapDbg:snap,zdBeat:!!document.querySelector('#zdBeat')}});
   await page.waitForFunction(()=>window.SG?.G?.mode==='live'||window.SG?.F?.mode==='live',null,{timeout:3000}).catch(()=>null);
   liveState=await page.evaluate(()=>{const g=window.SG?.G;let snap=null;try{snap=window.SG?.snapDbg?.()}catch(e){snap={error:String(e)}}return{mode:g?.mode,fmode:window.SG?.F?.mode,crew:g?.crew?.id,crewR2:g?.crew?.r2,down:g?.down,togo:g?.togo,sel:g?.sel,selectedPlay:window.SG?.PLAYS?.[g?.sel]?.id,playKind:window.SG?.PLAYS?.[g?.sel]?.kind,ctlHidden:document.querySelector('#ctl')?.hidden,setbarHidden:document.querySelector('#setbar')?.hidden,fourthHidden:document.querySelector('#fourth')?.hidden,startPlayWait:window.SG?.startPlay?._w||0,eventTrace:window.__hikeEventTrace||[],snapDbg:snap,zdBeat:!!document.querySelector('#zdBeat'),direct:true}});
   check('Direct game start fallback is only needed if the UI click failed',liveState.mode==='live'||liveState.fmode==='live',{preHikeState,liveState,directState});
  }
  const liveNow=liveState.mode==='live'||liveState.fmode==='live';
  if(!liveNow)throw new Error('Unable to enter live play after the actual HIKE control and direct diagnostic fallback: '+JSON.stringify({preHikeState,liveState}));
  const turboRing=await page.locator('#bTurbo').evaluate(el=>{const p=getComputedStyle(el,'::after'),s=getComputedStyle(el);return{display:p.display,background:p.backgroundImage,mask:p.maskImage||p.webkitMaskImage,inset:p.inset,overflow:s.overflow,outlineStyle:s.outlineStyle,outlineWidth:s.outlineWidth,outlineOffset:s.outlineOffset}});
  check('Live-play TURBO control has a visible segmented outer stamina ring',turboRing.display!=='none'&&turboRing.background.includes('repeating-conic-gradient')&&turboRing.background.includes('conic-gradient')&&turboRing.mask.includes('radial-gradient')&&turboRing.inset.includes('-8px')&&turboRing.overflow==='visible'&&turboRing.outlineStyle==='dashed'&&parseFloat(turboRing.outlineWidth)>=2&&parseFloat(turboRing.outlineOffset)>=4,turboRing);
  const qaHooks=await page.evaluate(()=>window.SG&&window.SG.__uiqa?true:false);
  check('Query-gated match QA hooks are available',qaHooks);
  if(qaHooks){
   const openPrepared=await page.evaluate(()=>window.SG.__uiqa.openReceiver());
   check('Deterministic live-play OPEN receiver fixture can be prepared',openPrepared);
   await page.waitForTimeout(250);
   const receiverCue=await page.evaluate(()=>{const off=window.SG?.F?.off||{};const roles=['WR1','WR2','TE','RB'];return{open:roles.filter(k=>off[k]?.hi),covered:roles.filter(k=>off[k]&&!off[k].hi),mode:window.SG?.F?.mode,clockOn:window.SG?.G?.clockOn}});
   check('Live Play highlights open receiver(s) and leaves covered receivers muted',receiverCue.open.length>=1&&receiverCue.covered.length>=1&&receiverCue.mode==='live'&&receiverCue.clockOn===false,receiverCue);
  }
  await page.screenshot({path:path.join(out,'match-live-play.png'),fullPage:true});
  if(qaHooks){
   const runnerPrepared=await page.evaluate(()=>window.SG.__uiqa.runnerControls());
   check('Deterministic live-runner state can expose HURDLE',runnerPrepared);
   await page.waitForFunction(()=>document.querySelector('#bHurdle')?.classList.contains('show')&&document.querySelector('#bHurdle').textContent.trim()==='HURDLE',null,{timeout:5000});
   const hurdleStyle=await page.locator('#bHurdle').evaluate(el=>{const r=el.getBoundingClientRect(),t=document.querySelector('#bTurbo').getBoundingClientRect(),s=getComputedStyle(el);return{display:s.display,text:el.textContent.trim(),background:s.backgroundColor,border:s.borderTopColor,borderWidth:s.borderTopWidth,clearance:t.left-r.right}});
   check('Live HURDLE uses matte navy, gold border and clears TURBO',hurdleStyle.display==='flex'&&hurdleStyle.text==='HURDLE'&&hurdleStyle.background==='rgb(19, 22, 32)'&&hurdleStyle.border==='rgb(245, 184, 65)'&&parseFloat(hurdleStyle.borderWidth)>=2&&hurdleStyle.clearance>=8,hurdleStyle);
   await page.screenshot({path:path.join(out,'match-live-runner-controls.png'),fullPage:true});
   const divePrepared=await page.evaluate(()=>window.SG.__uiqa.diveControls());
   check('Deterministic live-runner state can expose DIVE',divePrepared);
   await page.waitForFunction(()=>document.querySelector('#bHurdle')?.textContent.trim()==='DIVE',null,{timeout:5000});
   const diveStyle=await page.locator('#bHurdle').evaluate(el=>({text:el.textContent.trim(),background:getComputedStyle(el).backgroundColor,border:getComputedStyle(el).borderTopColor}));
   check('Live DIVE keeps the same matte navy and gold control treatment',diveStyle.text==='DIVE'&&diveStyle.background==='rgb(19, 22, 32)'&&diveStyle.border==='rgb(245, 184, 65)',diveStyle);
   await page.screenshot({path:path.join(out,'match-live-dive-controls.png'),fullPage:true});
  }
  if(qaHooks){
   const pileStarted=await page.evaluate(()=>window.SG.__uiqa.startFumble());
   check('Fumble pile can be triggered in live play',pileStarted);
   await page.waitForFunction(()=>{const e=document.querySelector('#pile');return e&&!e.hidden},null,{timeout:10000});
   await page.evaluate(()=>{const sheet=document.querySelector('#sheet'),setbar=document.querySelector('#setbar');if(sheet)sheet.hidden=true;if(setbar)setbar.hidden=true});
   const pileGeometry=await page.evaluate(()=>{const bar=document.querySelector('#pileBar'),b=bar.getBoundingClientRect(),a=document.querySelector('#pileBtn').getBoundingClientRect(),style=e=>{const s=getComputedStyle(e);return{background:s.backgroundColor,backgroundImage:s.backgroundImage,color:s.color,border:s.borderTopColor}},center=b.left+b.width/2;return{barWidth:b.width,viewport:innerWidth,ratio:b.width/innerWidth,barLeft:b.left,barRight:b.right,centerX:center,buttonLeft:a.left,clearance:a.left-b.right,centered:Math.abs(center-innerWidth/2)<2,barStyle:style(bar),trackStyle:style(document.querySelector('#pileTrack')),fillStyle:style(document.querySelector('#pileFill')),leftLabel:style(document.querySelector('#pileL')),rightLabel:style(document.querySelector('#pileR')),buttonStyle:style(document.querySelector('#pileBtn'))}});
   check('Fumble meter is centered in the usable field lane and clears the A mash button',pileGeometry.ratio>=.50&&pileGeometry.ratio<=.58&&pileGeometry.clearance>=8&&Math.abs(pileGeometry.centerX-innerWidth*.40)<2,pileGeometry);
   check('Fumble contest panel, track, labels and A mash button use the Stage One navy/gold/cyan palette',pileGeometry.barStyle.background==='rgba(19, 22, 32, 0.96)'&&pileGeometry.barStyle.color==='rgb(245, 247, 250)'&&pileGeometry.trackStyle.background==='rgb(13, 20, 32)'&&pileGeometry.fillStyle.backgroundImage.includes('77, 225, 242')&&pileGeometry.fillStyle.backgroundImage.includes('245, 184, 65')&&pileGeometry.leftLabel.color==='rgb(77, 225, 242)'&&pileGeometry.rightLabel.color==='rgb(245, 184, 65)'&&pileGeometry.buttonStyle.background==='rgb(19, 22, 32)'&&pileGeometry.buttonStyle.color==='rgb(77, 225, 242)'&&pileGeometry.buttonStyle.border==='rgb(245, 184, 65)',pileGeometry);
   await page.waitForFunction(()=>/^[0-9]+[.][0-9]s$/.test((document.querySelector('#pileT')?.textContent||'').trim()),null,{timeout:5000});
   const pileTimer=await page.locator('#pileT').evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect(),bar=document.querySelector('#pileBar').getBoundingClientRect();return{text:el.textContent.trim(),background:s.backgroundColor,color:s.color,border:s.borderTopWidth,borderColor:s.borderTopColor,radius:s.borderTopLeftRadius,height:r.height,display:s.display,top:r.top,bottom:r.bottom,barBottom:bar.bottom,centerX:r.left+r.width/2,barCenterX:bar.left+bar.width/2}});
   check('Fumble countdown uses the gold-edged navy seconds pill directly beneath and centered on the contest bar',/^[0-9]+[.][0-9]s$/.test(pileTimer.text)&&pileTimer.background==='rgba(19, 22, 32, 0.98)'&&pileTimer.color==='rgb(245, 184, 65)'&&pileTimer.borderColor==='rgba(245, 184, 65, 0.82)'&&parseFloat(pileTimer.border)>=1&&pileTimer.radius==='999px'&&pileTimer.height>=22&&pileTimer.top>=pileTimer.barBottom+6&&pileTimer.top<=pileTimer.barBottom+36&&Math.abs(pileTimer.centerX-pileTimer.barCenterX)<=4,pileTimer);
   await page.screenshot({path:path.join(out,'match-fumble-pile.png'),fullPage:true});
   await page.evaluate(()=>{const pile=document.querySelector('#pile');if(pile)pile.hidden=true});
   const defenseReady=await page.evaluate(()=>window.SG.__uiqa.defense());
   check('Defense selection state can be rendered for deterministic visual QA',defenseReady);
   await page.waitForFunction(()=>{const e=document.querySelector('#dcall');return e&&!e.hidden},null,{timeout:10000});
   check('Defense selection screen appears in the Stage One match flow',await page.locator('#dcall').isVisible());
   check('FIRST TO remains visible above the defense-selection modal',await page.locator('#tgtTag').isVisible());
   check('Defense selection offers BLITZ, BALANCED and PREVENT',await page.locator('#dcall button[data-c]').count()===3);
   const defensePanel=await page.locator('#dcall').evaluate(el=>{const r=el.getBoundingClientRect();return{left:r.left,right:r.right,width:r.width,viewport:innerWidth}});
   check('Defense selection is a centered floating panel below the scoreboard',defensePanel.left>=0&&defensePanel.right<=defensePanel.viewport&&Math.abs((defensePanel.left+defensePanel.right)/2-defensePanel.viewport/2)<2&&defensePanel.width<defensePanel.viewport-40,defensePanel);
   const defenseFit=await page.locator('#dcall').evaluate(el=>{const r=el.getBoundingClientRect(),buttons=[...el.querySelectorAll('.row>button')],rows=buttons.map(b=>[...b.querySelectorAll('.dco-row')].map(n=>n.getBoundingClientRect().bottom));return{top:r.top,bottom:r.bottom,viewport:innerHeight,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight,rowBottoms:rows}});
   check('Defense selection exposes every stat row without clipping or internal scrolling',defenseFit.top>=68&&defenseFit.bottom<=defenseFit.viewport&&defenseFit.scrollHeight<=defenseFit.clientHeight+1&&defenseFit.rowBottoms.flat().every(y=>y<=defenseFit.bottom-4),defenseFit);
   const defenseRows=await page.locator('#dcall button[data-c] .dco').evaluateAll(nodes=>nodes.map(n=>({rows:n.querySelectorAll('.dco-row').length,columns:getComputedStyle(n).gridTemplateColumns.split(' ').length,rowColumns:[...n.querySelectorAll('.dco-row')].map(row=>getComputedStyle(row).gridTemplateColumns.split(' ').length),labels:[...n.querySelectorAll('.dco-label')].map(x=>x.textContent.trim())})));
   check('Defense cards show three aligned STOP, BIG PLAY and TAKEAWAY stat rows',defenseRows.length===3&&defenseRows.every(x=>x.rows===3&&x.columns===1&&x.rowColumns.every(n=>n===2)&&x.labels.join('|')==='STOP|BIG PLAY|TAKEAWAY'),defenseRows);

   check('Defense selection headline names possession inside the modal', (await page.locator('#dcTop').textContent()).includes('THEY GET THE BALL'));
   const duplicateBanner=await page.locator('#banner').evaluate(el=>{const s=getComputedStyle(el);return{visible:el.classList.contains('show')&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)>.01,text:el.textContent.trim(),display:s.display}});
   check('Defense selection hides the duplicate THEY GET THE BALL field banner',!duplicateBanner.visible,duplicateBanner);
   await page.screenshot({path:path.join(out,'match-defense-selection.png'),fullPage:true});
   await page.locator('#dcall button[data-c="bal"]').click();
   await page.waitForFunction(()=>{const e=document.querySelector('#tick');return e&&getComputedStyle(e).display!=='none'},null,{timeout:5000});
   check('Defense simulation begins after choosing a call',await page.locator('#tick').isVisible());
   check('Defense simulation names the selected call',(await page.locator('#tkTitle').textContent()).includes('BALANCED'));
   check('Offensive controls are hidden during defense simulation',await page.locator('#sheet').isHidden()&&await page.locator('#setbar').isHidden()&&await page.locator('#ctl').isHidden());
   await page.waitForFunction(()=>{const t=(document.querySelector('#tkPlay')?.textContent||'').trim();return t.length>18&&!/THEY START AT/i.test(t)&&/(YARD|YDS|COMPLETE|INCOMPLETE|TOUCHDOWN|FIELD GOAL|INTERCEPT|TURNOVER|SACK|NO GAIN)/i.test(t)},null,{timeout:20000});
   check('Defense simulation play-by-play shows a completed simulated snap',await page.locator('#tkPlay').isVisible()&&/(YARD|YDS|COMPLETE|INCOMPLETE|TOUCHDOWN|FIELD GOAL|INTERCEPT|TURNOVER|SACK|NO GAIN)/i.test((await page.locator('#tkPlay').textContent()).trim()));
   check('Defense simulation includes TAP TO SKIP',await page.locator('#tkHint').isVisible()&&(await page.locator('#tkHint').textContent()).includes('TAP TO SKIP'));
   const drivePill=await page.locator('#tkTop').evaluate(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return{top:r.top,viewport:innerHeight,background:s.backgroundColor,border:s.borderTopWidth}});
   check('Defense drive pill is lowered clear of the top HUD and uses the navy status treatment',drivePill.top>=drivePill.viewport*.15+12&&drivePill.background==='rgba(19, 22, 32, 0.96)'&&parseFloat(drivePill.border)>=1,drivePill);
   
   
   const drivePillFit=await page.locator('#tkTop').evaluate(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el),title=el.querySelector('#tkTitle'),status=el.querySelector('#tkSt');return{left:r.left,right:r.right,width:r.width,height:r.height,viewport:innerWidth,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,transform:s.transform,maxWidth:s.maxWidth,title:title?.textContent.trim()||'',status:status?.textContent.trim()||'',titleScroll:title?.scrollWidth||0,titleClient:title?.clientWidth||0,statusScroll:status?.scrollWidth||0,statusClient:status?.clientWidth||0,text:el.innerText.trim()}});
   check('Defense drive pill is centered and keeps the full down-and-distance and yard-line context inside the viewport',drivePillFit.left>=12&&drivePillFit.right<=drivePillFit.viewport-12&&Math.abs((drivePillFit.left+drivePillFit.right)/2-drivePillFit.viewport/2)<2&&drivePillFit.scrollWidth<=drivePillFit.clientWidth+1&&drivePillFit.titleScroll<=drivePillFit.titleClient+1&&drivePillFit.statusScroll<=drivePillFit.statusClient+1&&/BALL ON/i.test(drivePillFit.text),drivePillFit);
const driveTransition=await page.evaluate(()=>{const banner=document.querySelector('#banner'),pill=document.querySelector('#tkTop'),title=document.querySelector('#tkTitle'),bs=getComputedStyle(banner),ps=getComputedStyle(pill);return{bannerText:banner?.textContent.trim()||'',bannerOpacity:bs.opacity,bannerVisibility:bs.visibility,title:title?.textContent.trim()||'',pillAnimation:ps.animationName,pillDelay:ps.animationDelay}});
   check('Defense simulation clears the prior field banner before revealing THEIR DRIVE',/BALANCED/i.test(driveTransition.title)&&driveTransition.bannerOpacity==='0'&&driveTransition.bannerVisibility==='hidden'&&driveTransition.pillAnimation==='ui-drive-pill-arrive',driveTransition);

await page.screenshot({path:path.join(out,'match-defense-simulation.png'),fullPage:true});
   const toast=await page.evaluate(()=>window.SG.__uiqa.achievement());
   check('Achievement toast can be triggered',toast);
   await page.waitForFunction(()=>{const e=document.querySelector('#achT');return e&&getComputedStyle(e).opacity!=='0'},null,{timeout:5000});
   check('Achievement toast is visible',await page.locator('#achT').isVisible());
   const toastRect=await page.locator('#achT').evaluate(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el),ticker=document.querySelector('#tkPlay')?.getBoundingClientRect(),app=document.querySelector('#app')?.getBoundingClientRect();return{x:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height,vw:innerWidth,vh:innerHeight,appBottom:app?.bottom??innerHeight,appBottomGap:(app?.bottom??innerHeight)-r.bottom,pointerEvents:s.pointerEvents,tickerTop:ticker?.top??null}});
   check('Achievement toast is bottom-centered, within bounds and non-blocking',toastRect.top>toastRect.vh*.55&&Math.abs((toastRect.x+toastRect.right)/2-toastRect.vw/2)<2&&toastRect.x>=0&&toastRect.right<=toastRect.vw&&toastRect.bottom<=toastRect.vh&&toastRect.pointerEvents==='none',toastRect);
   const tickerBottom=await page.locator('#tkPlay').evaluate(el=>el.getBoundingClientRect().bottom);
   check('Achievement toast anchors to the bottom edge of the game surface and clears the play-by-play ticker',toastRect.appBottomGap>=6&&toastRect.appBottomGap<=20&&(toastRect.top>tickerBottom+6||toastRect.bottom<toastRect.tickerTop-6),{...toastRect,tickerBottom});
   await page.screenshot({path:path.join(out,'match-achievement-toast.png'),fullPage:true});
   await page.evaluate(()=>window.SG.__uiqa.postGame());
   check('Achievement toast clears before the post-game result',await page.locator('#achT').count()===0);
  }else await page.evaluate(()=>window.SG.endGame(false));
  await page.waitForFunction(()=>{const e=document.querySelector('#end');return e&&!e.hidden},null,{timeout:10000});
  check('Post-game result screen visible',await page.locator('#end').isVisible());
  check('Post-game STYLE POINTS card is present even when the match earns zero',await page.locator('#endStyle').isVisible()&&(await page.locator('#endStyle').textContent()).startsWith('STYLE POINTS'));
  check('Post-game shows the match-mode pill',await page.locator('#end .ui-end-mode').isVisible()&&(await page.locator('#end .ui-end-mode').textContent()).includes('CREW GAME'));
  const endStyles=await page.evaluate(()=>({surface:getComputedStyle(document.querySelector('#end')).backgroundColor,rematch:getComputedStyle(document.querySelector('#eAgain')).backgroundColor,rematchText:getComputedStyle(document.querySelector('#eAgain')).color,menu:getComputedStyle(document.querySelector('#eMenu')).backgroundColor}));
  check('Post-game uses matte navy surface, gold rematch and cyan-edged menu action',endStyles.surface==='rgb(19, 22, 32)'&&endStyles.rematch==='rgb(245, 184, 65)'&&endStyles.rematchText==='rgb(19, 22, 32)'&&endStyles.menu==='rgb(28, 33, 48)',endStyles);
  const scorePanel=await page.locator('#endScore').evaluate(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return{width:r.width,background:s.backgroundColor,border:s.borderTopWidth,radius:s.borderTopLeftRadius,children:el.children.length}});
  check('Post-game team score block is framed inside a matte navy card',scorePanel.background==='rgb(19, 22, 32)'&&parseFloat(scorePanel.border)>=1&&parseFloat(scorePanel.radius)>=12&&scorePanel.children>=1,scorePanel);
  const scoreCardContent=await page.locator('#endScore').evaluate(el=>({children:[...el.children].map(n=>({tag:n.tagName,classes:typeof n.className==='string'?n.className:'svg'})),logos:[...el.children].filter(n=>n.classList?.contains('ui-end-logo')).length,svgCount:el.querySelectorAll('svg').length,matchup:el.querySelector('.ui-end-score-matchup')?.textContent||'',score:el.querySelector('.ui-end-score-value')?.textContent?.trim()||''}));
  check('Post-game score card carries exactly two team marks',scoreCardContent.logos===2&&scoreCardContent.svgCount===2,scoreCardContent);
  check('Post-game card pairs both team marks with the matchup and score',scoreCardContent.matchup.includes('VS')&&!!scoreCardContent.score,scoreCardContent);
  await page.screenshot({path:path.join(out,'match-post-game.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(120);
  const postPortrait=await page.locator('#end').evaluate(el=>{const r=el.getBoundingClientRect();return{left:r.left,right:r.right,width:r.width,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,viewport:innerWidth}});
  check('Portrait post-game screen fits viewport',postPortrait.left>=0&&postPortrait.right<=390&&postPortrait.scrollWidth<=postPortrait.clientWidth+1,postPortrait);
  const postLayout=await page.locator('#end').evaluate(el=>{const h=el.querySelector('h2').getBoundingClientRect(),score=el.querySelector('#endScore').getBoundingClientRect(),buttons=el.querySelector('.btnrow').getBoundingClientRect();return{height:el.getBoundingClientRect().height,headingTop:h.top,scoreTop:score.top,buttonsBottom:buttons.bottom,viewport:innerHeight}});check('Portrait post-game result actions reach the lower thumb zone',postLayout.buttonsBottom>=postLayout.viewport-120,postLayout);
  await page.screenshot({path:path.join(out,'match-post-game-portrait.png'),fullPage:true});
  const practiceWin=await page.evaluate(()=>window.SG.__uiqa.postGamePracticeWin());
  check('Deterministic practice-win result can be rendered',practiceWin);
  check('Practice-win result uses the correct win banner and practice mode pill',await page.locator('#end h2').textContent()==='PRACTICE WIN'&&(await page.locator('#end .ui-end-mode').textContent()).includes('PRACTICE'));
  check('Practice-win result carries the earned STYLE POINTS total',await page.locator('#endStyle').textContent()==='STYLE POINTS  3,700');
  const celebrationState=await page.evaluate(()=>{const allPlayers=Object.values(window.SG.F?.off||{}).filter(p=>p&&typeof p==='object'&&'x' in p),players=allPlayers.filter(p=>p.celeb>0),notCelebrating=allPlayers.filter(p=>!(p.celeb>0)||p.fall||p.lying||p.stun),renderer=window.CF3D?.info||{};return{result:window.SG.F?.res?.type,players:players.length,allPlayers:allPlayers.length,notCelebrating:notCelebrating.length,rendererFrames:window.SG.__uiqa.practiceRenderFrameDelta||0,rendererOn:renderer.on,rendererError:renderer.err,last3D:window.__CF3D_LAST_DRAW,spriteFrames:window.__CF2D_CELEB_SPRITE_RENDERED||0}});
  check('Practice-win result renders a live touchdown celebration pose for the squad',celebrationState.result==='td'&&celebrationState.players>=3&&celebrationState.allPlayers>=3&&celebrationState.notCelebrating===0&&celebrationState.rendererFrames>=20&&(celebrationState.last3D===true||celebrationState.spriteFrames>=3),celebrationState);
  const endHudState=await page.locator('#hud').evaluate(el=>({hidden:el.hidden,renderOnly:el.classList.contains('ui-end-render-only'),opacity:getComputedStyle(el).opacity,pointerEvents:getComputedStyle(el).pointerEvents,inert:el.inert,ariaHidden:el.getAttribute('aria-hidden')}));
  check('Post-game hides HUD chrome without disabling the 3D player renderer',!endHudState.hidden&&endHudState.renderOnly&&endHudState.opacity==='0'&&endHudState.pointerEvents==='none'&&endHudState.inert&&endHudState.ariaHidden==='true',endHudState);
  const practiceLayout=await page.locator('#end').evaluate(el=>{const note=el.querySelector('#endNote'),style=el.querySelector('#endStyle'),score=el.querySelector('#endScore'),frame=getComputedStyle(el,'::before');const nr=note.getBoundingClientRect(),sr=style.getBoundingClientRect(),cr=score.getBoundingClientRect();return{noteText:note.textContent.trim(),noteBottom:nr.bottom,styleTop:sr.top,scoreBottom:cr.bottom,frameBottom:parseFloat(frame.top)+parseFloat(frame.height)}});
  check('Practice-win reward card sits below the squad frame with the practice note retained',practiceLayout.noteText==='Practice win. No rewards.'&&practiceLayout.styleTop>=practiceLayout.frameBottom+12&&practiceLayout.styleTop>=practiceLayout.noteBottom+8,practiceLayout);
  await page.waitForTimeout(700);
  check('Practice-win result retains both team logos and side-by-side actions',await page.locator('#endScore .ui-end-logo').count()===2&&await page.locator('#end .btnrow').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length===2));
  await page.screenshot({path:path.join(out,'match-post-game-practice-win-portrait.png'),fullPage:true});
 }

 check('No same-origin HTTP errors',sameOriginFailures.length===0,sameOriginFailures);
 check('No uncaught page exceptions',pageErrors.length===0,pageErrors);
 const report={sourceCommit:process.env.GITHUB_SHA||null,testedUrl:base+'/index.html?uiqa=1',checks,failures,pageErrors,consoleErrors,sameOriginFailures,screenshots:fs.readdirSync(out).filter(n=>n.endsWith('.png'))};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
 fs.writeFileSync(path.join(out,'summary.md'),['# UI-Overhaul Browser QA','', 'Commit: '+(report.sourceCommit||'local'),'Passed: '+checks.filter(c=>c.pass).length+'/'+checks.length,'Failed: '+failures.length,'',...checks.map(c=>'- ['+(c.pass?'x':' ')+'] '+c.name+(c.detail?' — '+JSON.stringify(c.detail):''))].join('\n'));
 console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
}catch(e){const failureState=await page.evaluate(()=>{const g=window.SG?.G;let snap=null;try{snap=window.SG?.snapDbg?.()}catch(err){snap={error:String(err)}}return{mode:g?.mode,fmode:window.SG?.F?.mode,crew:g?.crew?.id,crewR2:g?.crew?.r2,down:g?.down,togo:g?.togo,sel:g?.sel,selectedPlay:window.SG?.PLAYS?.[g?.sel]?.id,playKind:window.SG?.PLAYS?.[g?.sel]?.kind,fourthHidden:document.querySelector('#fourth')?.hidden,setbarHidden:document.querySelector('#setbar')?.hidden,sheetHidden:document.querySelector('#sheet')?.hidden,hikeHandler:typeof document.querySelector('#hike')?.onclick,snapDbg:snap,zdBeat:!!document.querySelector('#zdBeat')}}).catch(err=>({diagnosticError:String(err)}));fs.writeFileSync(path.join(out,'fatal-error.txt'),(e.stack||String(e)+'\n')+'\nDIAGNOSTIC\n'+JSON.stringify({failureState,pageErrors,consoleErrors,sameOriginFailures},null,2));throw e}
finally{await browser.close();await new Promise(resolve=>server.close(resolve))}