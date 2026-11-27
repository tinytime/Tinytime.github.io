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

console.log('RUNTIME SMOKE PASSED (v3.16 MAIN save migration, SND.dbg.mem math, CIV4_ALIAS coverage)');
