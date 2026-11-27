import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });

for (const entry of ['Assets', 'audio', 'models', 'vendor', 'src', 'styles', 'ui-overhaul.css', 'ui-overhaul-menu.js', 'index.html']) {
  const from = path.join(root, entry);
  const to = path.join(dist, entry);
  if (fs.existsSync(from)) fs.cpSync(from, to, { recursive: true, force: true });
}
console.log('Copied runtime assets and modules to dist/ for deployable static build');
