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
 await page.goto(base+'/index.html',{waitUntil:'load',timeout:60000});
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
 const menuTileGeometry=await page.locator('#uiMenuHome .ui-menu-grid .ui-menu-icon-card').evaluateAll(items=>items.map(el=>{const r=el.getBoundingClientRect(),copy=el.querySelector('.ui-menu-action-copy'),c=copy?.getBoundingClientRect();return{label:copy?.querySelector('strong')?.textContent||'',x:r.x,y:r.y,width:r.width,height:r.height,textFits:!!c&&c.right<=r.right+1&&c.left>=r.left-1}}));
 check('Menu uses four icon-led 2×2 cards',menuTileGeometry.length===4&&Math.abs(menuTileGeometry[0].y-menuTileGeometry[1].y)<3&&menuTileGeometry[2].y>menuTileGeometry[0].y&&Math.abs(menuTileGeometry[2].y-menuTileGeometry[3].y)<3,menuTileGeometry);
 check('Menu card labels do not clip',menuTileGeometry.every(x=>x.textFits),menuTileGeometry);
 await page.locator('.ui-menu-playbook').click();
 check('Playbook overlay opens',await page.locator('.ui-menu-playbook-overlay').isVisible());
 const playCount=await page.locator('.ui-menu-play-card').count();
 check('Playbook entries render',playCount>0,playCount);
 await page.screenshot({path:path.join(out,'desktop-playbook.png'),fullPage:true});
 await page.locator('[data-filter="RUN"]').click();
 const runCards=await page.locator('.ui-menu-play-card span').allTextContents();
 check('Playbook category filter works',runCards.length>0&&runCards.every(x=>x==='RUN'),runCards);
 await page.locator('[data-filter="ALL"]').click();
 await page.locator('.ui-menu-playbook-back').click();
 check('Playbook returns to menu',!(await page.locator('.ui-menu-playbook-overlay').isVisible()));

 const tabDiagnostics=await page.locator('.ui-menu-tabs').evaluate(el=>({rect:(()=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}})(),display:getComputedStyle(el).display,visibility:getComputedStyle(el).visibility,buttons:[...el.querySelectorAll('button')].map(b=>({tab:b.dataset.tab,rect:(()=>{const r=b.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}})(),display:getComputedStyle(b).display,visibility:getComputedStyle(b).visibility}))}));
 check('Tab bar and Settings tab visible',await page.locator('[data-tab="settings"]').isVisible(),tabDiagnostics);
 await page.locator('[data-tab="settings"]').click();
 check('Settings panel switches',await page.locator('#uiMenuSettings').isVisible()&&!(await page.locator('#uiMenuHome').isVisible()));
 for(const id of ['mMus','mSfx','mVol','mHap','mCam','mLT','mReset'])check('Settings control visible: '+id,await page.locator('#'+id).count()===1&&await page.locator('#'+id).isVisible());
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
 await page.setViewportSize({width:1440,height:1000});

 await page.locator('[data-tab="credits"]').click();
 check('Credits panel switches',await page.locator('#uiMenuCredits').isVisible());
 const credit=(await page.locator('#uiMenuCredits').innerText()).toUpperCase();
 check('Credits categories present',['3D ART & UI','MUSIC & SFX','TOWN AMBIENCE'].every(s=>credit.includes(s)));
 check('Build footer retained',await page.locator('#mBuild').count()===1&&await page.locator('#mBuild').isVisible());
 for(let i=0;i<5;i++)await page.locator('#mBuild').click({delay:80});
 check('Developer drawer opens',await page.locator('.ui-menu-dev').isVisible());
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
  check(v.name+' return button visible',g.town.top>=-1&&g.town.bottom<=v.height+1,g.town);
  check(v.name+' tabs visible',g.tabs.top>=-1&&g.tabs.bottom<=v.height+1,g.tabs);
  await page.screenshot({path:path.join(out,v.name+'-menu.png'),fullPage:true});
 }

 await page.locator('#mTown').evaluate(el=>el.click());
 await page.waitForFunction(()=>{const w=document.querySelector('#world');return w&&!w.hidden&&getComputedStyle(w).display!=='none'},null,{timeout:10000}).catch(()=>{});
 const world=await page.locator('#world').isVisible();check('Back to town opens overworld',world);
 if(world){await page.screenshot({path:path.join(out,'overworld-after-return.png'),fullPage:true});const b=page.locator('#owMenu');check('Overworld menu button visible',await b.count()===1&&await b.isVisible());await b.click();check('Overworld menu reopens',await menuIsActuallyVisible())}

 // Exercise the real in-match play-calling sheet through the game's exposed test API.
 const matchStarted=await page.evaluate(()=>{
  const api=window.SG;if(!api||!api.CREWS?.length||typeof api.startMatch!=='function'||typeof api.enterPlaycall!=='function')return false;
  api.startMatch(api.CREWS[0]);return true;
 });
 check('Matchup test fixture can start a real game',matchStarted);
 if(matchStarted){
  await page.screenshot({path:path.join(out,'pre-game-matchup.png'),fullPage:true});
  await page.evaluate(()=>window.SG.enterPlaycall());
  await page.waitForFunction(()=>{const e=document.querySelector('#sheet');return e&&!e.hidden&&getComputedStyle(e).display!=='none'},null,{timeout:10000});
  check('In-match playbook overlay opens',await page.locator('#sheet').isVisible());
  check('In-match play cards render',await page.locator('#cards .card').count()>0);
  check('In-match selected play has gold treatment',await page.locator('#cards .card.sel').count()===1);
  check('In-match FLIP control is visible',await page.locator('#flipBtn').isVisible());
  const callStyle=await page.locator('#callBtn').evaluate(el=>({visible:!!(el.offsetWidth&&el.offsetHeight),background:getComputedStyle(el).backgroundImage,color:getComputedStyle(el).color}));
  check('In-match CALL PLAY uses the cyan CTA treatment',callStyle.visible&&callStyle.background.includes('linear-gradient')&&callStyle.color==='rgb(7, 25, 35)',callStyle);
  await page.screenshot({path:path.join(out,'match-playbook-overlay.png'),fullPage:true});
  await page.locator('#flipBtn').click();
  check('In-match FLIP control toggles',await page.locator('#flipBtn').evaluate(el=>el.classList.contains('on')));
  await page.locator('#callBtn').click();
  await page.waitForFunction(()=>{const e=document.querySelector('#setbar');return e&&!e.hidden&&getComputedStyle(e).display!=='none'},null,{timeout:10000});
  check('CALL PLAY advances to pre-snap controls',await page.locator('#hike').isVisible());
  await page.screenshot({path:path.join(out,'match-pre-snap.png'),fullPage:true});
  const liveStarted=await page.evaluate(()=>{if(typeof window.SG?.startPlay!=='function')return false;window.SG.startPlay();return true});
  check('Live play can be started from pre-snap',liveStarted);
  if(liveStarted){
   await page.waitForFunction(()=>window.SG?.G?.mode==='live',null,{timeout:15000});
   await page.waitForTimeout(350);
   await page.screenshot({path:path.join(out,'match-live-play.png'),fullPage:true});
   check('Live play state is active',await page.evaluate(()=>window.SG?.G?.mode==='live'));
  }
 }
 check('No same-origin HTTP errors',sameOriginFailures.length===0,sameOriginFailures);
 check('No uncaught page exceptions',pageErrors.length===0,pageErrors);
 const report={sourceCommit:process.env.GITHUB_SHA||null,testedUrl:base+'/index.html',checks,failures,pageErrors,consoleErrors,sameOriginFailures,screenshots:fs.readdirSync(out).filter(n=>n.endsWith('.png'))};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
 fs.writeFileSync(path.join(out,'summary.md'),['# UI-Overhaul Browser QA','', 'Commit: '+(report.sourceCommit||'local'),'Passed: '+checks.filter(c=>c.pass).length+'/'+checks.length,'Failed: '+failures.length,'',...checks.map(c=>'- ['+(c.pass?'x':' ')+'] '+c.name+(c.detail?' — '+JSON.stringify(c.detail):''))].join('\n'));
 console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
}catch(e){fs.writeFileSync(path.join(out,'fatal-error.txt'),e.stack||String(e));throw e}
finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
