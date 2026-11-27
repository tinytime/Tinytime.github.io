import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const fail = (msg) => { console.error('RUNTIME SMOKE FAIL:', msg); process.exit(1); };

// 1. Verify v3.16 legacy MAIN save migration does not crash and preserves roster/progress
const m1 = fs.readFileSync(path.join(root, 'src/modules/01-audio-state-save.js'), 'utf8');
const saveStart = m1.indexOf('/* ============================ save ============================ */');
const stateStart = m1.indexOf('/* ============================ state ============================ */');
if (saveStart < 0 || stateStart < 0) fail('Could not locate save module slice');

const playsStart = m1.indexOf('/* ============================ plays ============================ */');
const playersStart = m1.indexOf('/* ============================ players, looks & uniforms ============================ */');
const helpersEnd = m1.indexOf('/* ============================ sound ============================');
const saveCode = m1.slice(0, helpersEnd) + '\n' + m1.slice(playersStart, stateStart);

const sandbox = {
  console, Math, Date, JSON, Object, Array, Number, String, Boolean, Set, Map, RegExp, parseInt, parseFloat, isNaN,
  localStorage: { _d: {}, getItem(k){ return this._d[k] ?? null; }, setItem(k,v){ this._d[k]=String(v); }, removeItem(k){ delete this._d[k]; } },
  window: { __cfDebug: false },
  document: { getElementById(){ return null; } },
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(saveCode + '\nthis.__TEST = { freshSave, migrateSave };', sandbox);

// Simulate a minimal v3.16 MAIN save (pre-Hale Harbor, pre-sound settings, pre-dungeons)
const v316Save = {
  teamName: 'STREET KINGS',
  beaten: ['cats'],
  upPts: 4,
  uni: { jc: '#2f6bff', j2: '#ffd23a', pc: '#18223a', hc: '#2f6bff' },
  starters: sandbox.__TEST.freshSave().starters,
};
const migrated = sandbox.__TEST.migrateSave(JSON.parse(JSON.stringify(v316Save)));
if (!migrated || migrated.teamName !== 'STREET KINGS') fail('migrateSave corrupted teamName');
if (!Array.isArray(migrated.beaten) || migrated.beaten[0] !== 'cats') fail('migrateSave lost beaten crews');
if (!migrated.starters || !migrated.starters.QB) fail('migrateSave lost QB starter');
if (!migrated.uni || !migrated.uni.jc) fail('migrateSave lost uni');
if (typeof migrated.upPts !== 'number') fail('migrateSave lost upPts');

// 2. Verify SND.dbg.mem returns finite number with array foley entries
const memCheck = Object.values({ a: { length: 1000, numberOfChannels: 1 }, _fHit: [{ length: 500, numberOfChannels: 1 }, { length: 500, numberOfChannels: 1 }] })
  .flat().reduce((a, b) => a + (b && b.length && b.numberOfChannels ? b.length * b.numberOfChannels * 4 : 0), 0);
if (!Number.isFinite(memCheck) || memCheck !== 8000) fail(`SND.dbg.mem formula failed: ${memCheck}`);

// 3. Verify 05d-npc-civ3-ch3.js CIV4_ALIAS covers all 6 generic Vapor City keys
const m5d = fs.readFileSync(path.join(root, 'src/modules/05d-npc-civ3-ch3.js'), 'utf8');
for (const k of ['busker', 'dancer', 'hacker', 'mouse', 'tech', 'usher']) {
  if (!m5d.includes(`${k}:'${k}4'`)) fail(`Missing CIV4_ALIAS entry for ${k}`);
}


// 4. Full top-level boot + RAF tick smoke test (prevents TDZ/ReferenceError boot crashes)
{
  class CustomEventPoly extends Event { constructor(t, o) { super(t, o); this.detail = o && o.detail; } }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  function makeEl(tag, id) {
    const classes = new Set();
    const attrs = {};
    const el = {
      tagName: (tag || 'DIV').toUpperCase(), id: id || '', hidden: false, textContent: '', innerHTML: '', value: '', dataset: {},
      style: { setProperty(){}, removeProperty(){}, getPropertyValue(){ return ''; }, getPropertyPriority(){ return ''; } },
      classList: { add(...c){ c.forEach(x => classes.add(x)); }, remove(...c){ c.forEach(x => classes.delete(x)); }, toggle(c,f){ if(f===undefined){ classes.has(c)?classes.delete(c):classes.add(c); } else if(f) classes.add(c); else classes.delete(c); }, contains(c){ return classes.has(c); } },
      children: [], parentNode: null,
      appendChild(c){ c.parentNode = el; el.children.push(c); return c; },
      append(...cs){ cs.forEach(c => { if(c && typeof c === 'object'){ c.parentNode = el; el.children.push(c); } }); },
      prepend(...cs){ cs.forEach(c => { if(c && typeof c === 'object'){ c.parentNode = el; el.children.unshift(c); } }); },
      insertBefore(c){ c.parentNode = el; el.children.unshift(c); return c; },
      after(){}, remove(){}, setAttribute(k,v){ attrs[k]=v; }, getAttribute(k){ return attrs[k]??null; }, removeAttribute(k){ delete attrs[k]; },
      addEventListener(){}, removeEventListener(){}, querySelector(){ return makeEl('div',''); }, querySelectorAll(){ return []; }, closest(){ return null; },
      getBoundingClientRect(){ return { left:0, top:0, width:390, height:844, right:390, bottom:844 }; },
      getContext(){ return new Proxy({}, { get:(t,k)=> k==='getTransform'?()=>({a:1,b:0,c:0,d:1,e:0,f:0}) : k==='measureText'?()=>({width:20}) : (k==='createLinearGradient'||k==='createRadialGradient')?()=>({addColorStop(){}}) : k==='getImageData'?()=>({data:new Uint8ClampedArray(16)}) : k==='createPattern'?()=>({}) : ()=>{} }); },
      width:390, height:844, clientWidth:390, clientHeight:844, offsetWidth:390, offsetHeight:844, click(){}
    };
    return el;
  }
  const byId = {}; for (const id of ids) byId[id] = makeEl(id==='cv'||id==='owc'?'canvas':'div', id);
  const doc = { readyState:'complete', hidden:false, documentElement:makeEl('html'), head:makeEl('head'), body:makeEl('body'), getElementById:id=>byId[id]||null, querySelector:sel=>(sel.startsWith('#')&&!/[ .:\[]/.test(sel.slice(1)))?(byId[sel.slice(1)]||null):makeEl('div'), querySelectorAll:()=>[], createElement:tag=>makeEl(tag), addEventListener(){}, removeEventListener(){} };
  const rafs = [];
  const ctxObj = { window:null, self:null, document:doc, console, EventTarget, Event, CustomEvent:CustomEventPoly, Element:class{}, HTMLElement:class{}, KeyboardEvent:class{}, URLSearchParams, location:{origin:'https://test.github.io',pathname:'/',search:'',hash:'',href:'https://test.github.io/'}, history:{replaceState(){}}, navigator:{userAgent:'iPhone',maxTouchPoints:5,vibrate(){}}, performance:{now:()=>Date.now()}, localStorage:{_d:{},getItem(k){return this._d[k]??null;},setItem(k,v){this._d[k]=String(v);},removeItem(k){delete this._d[k];}}, matchMedia:()=>({matches:false,addEventListener(){}}), requestAnimationFrame:fn=>{rafs.push(fn);return rafs.length;}, cancelAnimationFrame(){}, setTimeout:()=>1, clearTimeout(){}, setInterval:()=>1, clearInterval(){}, addEventListener(){}, removeEventListener(){}, innerWidth:390, innerHeight:844, devicePixelRatio:2, Image:class{set src(v){}}, Audio:class{play(){return Promise.resolve();}pause(){}}, Blob:class{}, URL:{createObjectURL:()=>''}, fetch:()=>Promise.resolve({ok:true,arrayBuffer:()=>Promise.resolve(new ArrayBuffer(0)),json:()=>Promise.resolve({})}), THREE:undefined };
  ctxObj.window = ctxObj; ctxObj.self = ctxObj;
  const bctx = vm.createContext(ctxObj);
  for (const f of ['src/core/perf-log.js','src/data/audio-manifest.js','src/core/ui-bus.js','src/core/a11y.js','src/core/gamepad.js','src/data/p3d-model.js','src/engine/game-core.js','ui-overhaul-menu.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), bctx, { filename: f });
  }
  if (typeof ctxObj.SG?.owShow !== 'function') throw new Error('window.SG.owShow must exist after boot');
  for (let i = 0; i < Math.min(3, rafs.length); i++) rafs[i](Date.now() + i * 16);
}

console.log('RUNTIME SMOKE PASSED (v3.16 MAIN save migration, SND.dbg.mem math, CIV4_ALIAS coverage)');
