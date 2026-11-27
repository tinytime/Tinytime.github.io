import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const modules = [
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

const parts = modules.map((m) => {
  const full = path.join(root, m);
  return `/* --- MODULE: ${m} --- */\n` + fs.readFileSync(full, 'utf8');
});

const out = [
  '/* Auto-assembled by scripts/build-core.mjs from 9 src/modules/*.js files — edit source modules directly. */',
  '(() => {',
  "'use strict';",
  ...parts,
  '})();',
  "window.addEventListener('pagehide', () => { if (window.CFRuntime) window.CFRuntime.disposeTrackedListeners(); });",
  '',
].join('\n');

fs.writeFileSync(path.join(root, 'src/engine/game-core.js'), out, 'utf8');
console.log(`Assembled src/engine/game-core.js (${Buffer.byteLength(out, 'utf8').toLocaleString()} bytes) from ${modules.length} modules`);
