import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsonPath = path.join(root, 'qa', 'granny-ref.json');
const jsPath = path.join(root, 'qa', 'granny-ref.js');
const ref = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const expectedDirections = ['d', 'u', 'l', 'r'];
if (!Array.isArray(ref.directions) || ref.directions.map(d => d.direction).join(',') !== expectedDirections.join(',')) {
  throw new Error('Granny reference must contain d/u/l/r measurements in order');
}
for (const d of ref.directions) {
  if (d.bodyHeight !== ref.bodyHeight || d.headHeight !== ref.headHeight ||
      d.shoulderWidth !== ref.shoulderWidth || d.footRow !== ref.footRow ||
      d.totalHeight !== ref.totalHeight) {
    throw new Error('Direction ' + d.direction + ' does not match the reference summary');
  }
}
if (ref.umbrellaExclusion !== 'The measurement pass skips the canopy path and shaft line; it retains the gripping hand and arm. Contact shadow and foot glow are disabled.') {
  throw new Error('Unexpected umbrella exclusion method');
}
const generated = '// Generated from qa/granny-ref.json. Do not edit by hand.\\n' +
  'window.GRANNY_REF_DATA = Object.freeze(' + JSON.stringify(ref, null, 2) + ');\\n';
if (process.argv.includes('--check')) {
  if (!fs.existsSync(jsPath) || fs.readFileSync(jsPath, 'utf8') !== generated) {
    throw new Error('qa/granny-ref.js is stale; regenerate it from qa/granny-ref.json');
  }
  console.log(JSON.stringify({ pass: true, bodyHeight: ref.bodyHeight, headHeight: ref.headHeight, shoulderWidth: ref.shoulderWidth, footRow: ref.footRow }));
} else {
  fs.writeFileSync(jsPath, generated);
  console.log('Generated qa/granny-ref.js from qa/granny-ref.json');
}
