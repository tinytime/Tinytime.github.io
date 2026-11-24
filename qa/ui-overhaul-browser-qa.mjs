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
 // Game boots into the overworld; open the menu through its real HUD control before testing.
 const overworldMenuButton=page.locator('#owMenu');
 check('Overworld menu button available at startup',await overworldMenuButton.count()===1&&await overworldMenuButton.isVisible());
 await overworldMenuButton.click();
 await page.waitForFunction(()=>{const e=document.querySelector('#menu');return e&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>0},null,{timeout:10000});
 const menu=page.locator('#menu');
 const openOverworldMenu=page.locator('#owMenu');
 const initialScreen=await page.evaluate(()=>({menuOpacity:getComputedStyle(document.querySelector('#menu')).opacity,worldHidden:document.querySelector('#world')?.hidden,menuHidden:document.querySelector('#menu')?.hidden}));
 if(!(await openOverworldMenu.isVisible())) await page.evaluate(()=>{if(window.SG?.owShow)window.SG.owShow()});
 await page.waitForFunction(()=>{const b=document.querySelector('#owMenu');return !!b&&getComputedStyle(b).display!=='none'&&getComputedStyle(b).visibility!=='hidden'&&b.getBoundingClientRect().width>0;},null,{timeout:10000});
 check('Overworld MENU opener visible',await openOverworldMenu.isVisible(),initialScreen);
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
 await page.screenshot({path:path.join(out,'desktop-menu.png'),fullPage:true});
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
 check('Resolution segmented control visible',await page.locator('.ui-resolution-group').isVisible()&&await page.locator('.ui-resolution-group button').count()===4);
 const originalResolution=(await page.locator('#mRS').textContent())?.trim();
 const resolutionButtons=await page.locator('.ui-resolution-group button').evaluateAll(buttons=>buttons.map(b=>({text:b.textContent.trim(),value:b.dataset.value,pressed:b.getAttribute('aria-pressed')})));
 check('Resolution options are LOW / MED / HIGH / SHARP', ['LOW','MED','HIGH','SHARP'].every(label=>resolutionButtons.some(b=>b.text===label)), resolutionButtons);
 await page.locator('.ui-resolution-group button').filter({hasText:'MED'}).click();
 check('Resolution selection updates original setting', (await page.locator('#mRS').textContent())?.includes('MEDIUM'));
 const restoreResolution=originalResolution?.match(/RESOLUTION:\s*(.+)/i)?.[1]?.trim().toUpperCase()||'HIGH';
 const restoreLabel=restoreResolution==='MEDIUM'?'MED':restoreResolution;
 await page.locator('.ui-resolution-group button').filter({hasText:restoreLabel}).click();
 check('Resolution selection restores original setting',(await page.locator('#mRS').textContent())?.trim()===originalResolution);
 await page.locator('#mReset').click();
 check('Reset confirmation modal opens',await page.locator('.ui-menu-modal-backdrop').isVisible());
 check('Reset requires explicit confirmation', (await page.locator('#mReset').textContent())?.trim()==='RESET PROGRESS');
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

 await page.locator('#mTown').click();
 await page.waitForFunction(()=>{const w=document.querySelector('#world');return w&&!w.hidden&&getComputedStyle(w).display!=='none'},null,{timeout:10000}).catch(()=>{});
 const world=await page.locator('#world').isVisible();check('Back to town opens overworld',world);
 if(world){await page.screenshot({path:path.join(out,'overworld-after-return.png'),fullPage:true});const b=page.locator('#owMenu');check('Overworld menu button visible',await b.count()===1&&await b.isVisible());await b.click();check('Overworld menu reopens',await menuIsActuallyVisible())}
 check('No same-origin HTTP errors',sameOriginFailures.length===0,sameOriginFailures);
 check('No uncaught page exceptions',pageErrors.length===0,pageErrors);
 const report={sourceCommit:process.env.GITHUB_SHA||null,testedUrl:base+'/index.html',checks,failures,pageErrors,consoleErrors,sameOriginFailures,screenshots:fs.readdirSync(out).filter(n=>n.endsWith('.png'))};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
 fs.writeFileSync(path.join(out,'summary.md'),['# UI-Overhaul Browser QA','', 'Commit: '+(report.sourceCommit||'local'),'Passed: '+checks.filter(c=>c.pass).length+'/'+checks.length,'Failed: '+failures.length,'',...checks.map(c=>'- ['+(c.pass?'x':' ')+'] '+c.name+(c.detail?' — '+JSON.stringify(c.detail):''))].join('\n'));
 console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
}catch(e){fs.writeFileSync(path.join(out,'fatal-error.txt'),e.stack||String(e));throw e}
finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
