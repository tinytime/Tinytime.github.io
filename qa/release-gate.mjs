import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fail = (msg) => { console.error('FAIL:', msg); process.exit(1); };

// 1. Syntax check all JS modules
const jsFiles = [
  'vendor/three.r158.min.js',
  'src/core/perf-log.js',
  'src/core/ui-bus.js',
  'src/core/a11y.js',
  'src/core/gamepad.js',
  'src/data/audio-manifest.js',
  'src/data/p3d-model.js',
  'src/engine/game-core.js',
  'ui-overhaul-menu.js',
];
for (const f of jsFiles) {
  const full = path.join(root, f);
  if (!fs.existsSync(full)) fail(`Missing JS file: ${f}`);
  execFileSync(process.execPath, ['--check', full], { stdio: 'inherit' });
}

// 2. index.html size & zero inline script gate
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (Buffer.byteLength(html, 'utf8') >= 25000) fail('index.html exceeds 25 KB budget');
if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) fail('Inline <script> found in index.html');

// 3. Zero silent empty catch blocks in game-core.js
const gc = fs.readFileSync(path.join(root, 'src/engine/game-core.js'), 'utf8');
const emptyCatches = (gc.match(/catch\s*\([^)]*\)\s*\{\s*\}/g) || []).length;
if (emptyCatches > 0) fail(`Found ${emptyCatches} silent empty catch blocks in game-core.js`);

// 4. CSS brace balance
for (const cf of ['styles/base.css', 'ui-overhaul.css']) {
  const css = fs.readFileSync(path.join(root, cf), 'utf8');
  const o = (css.match(/\{/g) || []).length;
  const c = (css.match(/\}/g) || []).length;
  if (o !== c) fail(`Unbalanced CSS braces in ${cf}: ${o} vs ${c}`);
}

// 5. Required optimized assets exist & raw bloat removed
for (const req of ['Assets/title-screen.webp', 'audio/rain.b0c6101e.mp3']) {
  if (!fs.existsSync(path.join(root, req))) fail(`Missing required asset: ${req}`);
}
if (fs.existsSync(path.join(root, 'IMG_1892.png'))) fail('Unused IMG_1892.png still present');


// 6. Verify 6 modular source files exist & 0 MutationObservers in ui-overhaul-menu.js
const srcMods = [
  'src/modules/01-audio-state-save.js',
  'src/modules/02-match-sim-input.js',
  'src/modules/03-render-field-2d.js',
  'src/modules/04-render-kaykit-3d.js',
  'src/modules/05a-overworld-vapor.js',
  'src/modules/05b-hale-harbor.js',
  'src/modules/05c-spillway-route2.js',
  'src/modules/05d-npc-civ3-ch3.js',
  'src/modules/06-dungeons-drills.js',
];
for (const m of srcMods) {
  if (!fs.existsSync(path.join(root, m))) fail(`Missing source module: ${m}`);
}
const menuJs = fs.readFileSync(path.join(root, 'ui-overhaul-menu.js'), 'utf8');
const moCount = (menuJs.match(/MutationObserver/g) || []).length;
if (moCount > 0) fail(`Found ${moCount} MutationObservers in ui-overhaul-menu.js (must be 0)`);


// 7. HTML <div> balance check & zero silent catches in src/core/*.js
const divOpen = (html.match(/<div\b/gi) || []).length;
const divClose = (html.match(/<\/div>/gi) || []).length;
if (divOpen !== divClose) fail(`Unbalanced <div> tags in index.html: ${divOpen} open vs ${divClose} close`);
for (const cf of ['src/core/ui-bus.js', 'src/core/a11y.js', 'src/core/gamepad.js']) {
  const ct = fs.readFileSync(path.join(root, cf), 'utf8');
  const ec = (ct.match(/catch\s*(?:\([^)]*\))?\s*\{\s*\}/g) || []).length;
  if (ec > 0) fail(`Found ${ec} silent catch blocks in ${cf}`);
}


// 8. Verify 6 cel-shaded character bust portraits exist
for (const p of ['eli','zeroday','riptide','rita','bram','mo','rita_hyped','bram_hyped','mo_hyped']) {
  if (!fs.existsSync(path.join(root, `Assets/portraits/${p}.webp`))) fail(`Missing portrait asset: Assets/portraits/${p}.webp`);
}


// 9. Verify 10 stadium PA announcer clips exist
for (const k of ['pa_td','pa_first','pa_fire','pa_rz','pa_4th','pa_sack','pa_int','pa_fumble','pa_mp','pa_over','pa_juke','pa_spin','pa_truck','pa_hurdle','pa_catch','pa_break','pa_bighit','pa_house','pa_downs','pa_fg_good','pa_fg_no','pa_star']) {
  if (!fs.existsSync(path.join(root, `audio/pa/${k}.mp3`))) fail(`Missing PA audio clip: audio/pa/${k}.mp3`);
}

execFileSync(process.execPath, [path.join(root, 'qa/runtime-smoke.mjs')], { stdio: 'inherit' });
console.log('ALL RELEASE GATE CHECKS PASSED (8 JS modules, <25KB index.html, 0 silent catches, CSS balanced, assets verified)');
