// Build a compact, clearly labelled review sheet from the native QA captures.
// This does not grade artwork or modify game code / golden snapshots.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const out = path.join(root, 'qa-output');
const directions = ['front', 'back', 'left', 'right'];
const civilians = ['usher', 'cook', 'courier', 'coach', 'ref'];
const reportPath = path.join(out, 'report.json');
const summaryPath = path.join(out, 'five-civilian-review-summary.md');
fs.mkdirSync(out, { recursive: true });

if (!fs.existsSync(reportPath)) {
  fs.writeFileSync(summaryPath, '# Five-civilian review evidence\n\nNo report.json was produced by the browser QA step. Native review sheet was not generated.\n');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const captureDir = path.join(out, 'npc-type-directions');
const captures = [];
const missing = [];
for (const civ of civilians) for (const direction of directions) {
  const file = path.join(captureDir, civ + '-' + direction + '.png');
  if (!fs.existsSync(file)) { missing.push(civ + '/' + direction); continue; }
  captures.push({ civ, direction, dataUrl: 'data:image/png;base64,' + fs.readFileSync(file).toString('base64') });
}

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  const result = await page.evaluate(async ({ captures }) => {
    const cellW = 256, cellH = 420, pad = 18, cols = 4, rows = 5;
    const canvas = document.createElement('canvas');
    canvas.width = pad + cols * (cellW + pad);
    canvas.height = pad + rows * (cellH + pad);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#292b35'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < captures.length; i++) {
      const item = captures[i];
      const image = new Image(); image.src = item.dataUrl; await image.decode();
      const x = pad + (i % cols) * (cellW + pad);
      const y = pad + Math.floor(i / cols) * (cellH + pad);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 18px monospace'; ctx.textAlign = 'left';
      ctx.fillText(item.civ.toUpperCase() + ' / ' + item.direction.toUpperCase(), x, y + 20);
      ctx.fillStyle = '#777982'; ctx.fillRect(x, y + 32, cellW, 384);
      ctx.drawImage(image, x, y + 32, 256, 384);
    }
    return { dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height };
  }, { captures });
  fs.writeFileSync(path.join(out, 'five-civilian-native-4x-contact-sheet.png'),
    Buffer.from(result.dataUrl.split(',')[1], 'base64'));

  const gameScaleDir = path.join(out, 'npc-game-scale-28x42');
  const gameScaleCaptures = [];
  const missingGameScale = [];
  for (const civ of civilians) for (const direction of directions) {
    const file = path.join(gameScaleDir, civ + '-' + direction + '.png');
    if (!fs.existsSync(file)) { missingGameScale.push(civ + '/' + direction); continue; }
    gameScaleCaptures.push({ civ, direction, dataUrl: 'data:image/png;base64,' + fs.readFileSync(file).toString('base64') });
  }
  const gameScaleResult = await page.evaluate(async ({ captures }) => {
    const cellW = 160, cellH = 220, pad = 18, cols = 4, rows = 5;
    const canvas = document.createElement('canvas');
    canvas.width = pad + cols * (cellW + pad);
    canvas.height = pad + rows * (cellH + pad);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#292b35'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < captures.length; i++) {
      const item = captures[i];
      const image = new Image(); image.src = item.dataUrl; await image.decode();
      const x = pad + (i % cols) * (cellW + pad);
      const y = pad + Math.floor(i / cols) * (cellH + pad);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'left';
      ctx.fillText(item.civ.toUpperCase() + ' / ' + item.direction.toUpperCase(), x, y + 16);
      ctx.fillStyle = '#777982'; ctx.fillRect(x, y + 24, cellW, 168);
      ctx.drawImage(image, x + 24, y + 24, 112, 168);
    }
    return { dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height };
  }, { captures: gameScaleCaptures });
  fs.writeFileSync(path.join(out, 'five-civilian-game-scale-4x-contact-sheet.png'),
    Buffer.from(gameScaleResult.dataUrl.split(',')[1], 'base64'));

  const checks = [
    ['directional integrity', report.civilianVisualIntegrityAudit?.pass, report.civilianVisualIntegrityAudit?.checked + '/' + report.civilianVisualIntegrityAudit?.expected],
    ['direct 28x42 capture assertion', report.gameScaleNpcCaptureAudit?.pass, report.gameScaleNpcCaptureAudit?.captured + '/' + report.gameScaleNpcCaptureAudit?.expected],
    ['role debug', report.roleDebugAudit?.pass, report.roleDebugAudit?.captureCount + '/' + report.roleDebugAudit?.expected],
    ['prop audit', report.npcPropAudit?.pass, report.npcPropAudit?.archetypeCount + ' archetypes'],
    ['gallery', report.galleryVisualPass, 'rendered'],
    ['civilian type silhouette gate', report.civilianTypeSilhouetteAudit?.pass, 'max IoU ' + report.civilianTypeSilhouetteAudit?.maxRenderedIoU],
    ['golden snapshot gate', report.snapshotCheck?.pass, (report.snapshotCheck?.matches ?? '?') + ' matches / ' + (report.snapshotCheck?.changed?.length ?? '?') + ' changed']
  ];
  const lines = [
    '# Five-civilian review evidence',
    '',
    '- Tested source: `' + (report.sourceCommitSha || 'unknown') + '`',
    '- Capture timestamp: ' + (report.timestamp || 'unknown'),
    '- Native captures expected: 20 (five civilians × four directions)',
    '- Native captures found: ' + captures.length + '/20',
    '- Missing captures: ' + (missing.length ? missing.join(', ') : 'none'),
    '- Contact sheet: `five-civilian-native-4x-contact-sheet.png`',
    '- Contact sheet dimensions: ' + result.width + '×' + result.height,
    '- Direct game-scale captures found: ' + gameScaleCaptures.length + '/20',
    '- Missing direct game-scale captures: ' + (missingGameScale.length ? missingGameScale.join(', ') : 'none'),
    '- Direct game-scale contact sheet: `five-civilian-game-scale-4x-contact-sheet.png` (' + gameScaleResult.width + '×' + gameScaleResult.height + ')',
    '- **This is an automated evidence index, not an artistic or visual approval.**',
    '',
    '## Automated checks',
    '',
    '| Check | Result | Evidence |',
    '|---|---|---|',
    ...checks.map(([name, pass, evidence]) => '| ' + name + ' | ' + (pass === true ? 'PASS' : pass === false ? 'FAIL' : 'NOT REPORTED') + ' | ' + String(evidence ?? 'n/a') + ' |'),
    '',
    '## Evidence boundaries',
    '',
    '- Native contact sheet uses the actual 64×96 directional PNG captures enlarged 4× with nearest-neighbour rendering.',
    '- Game-scale contact sheet uses direct 28×42 renderer PNGs enlarged 4× with nearest-neighbour rendering; it is not derived from native captures.',
    '- Direct 28×42 captures are reported separately; do not describe resized images as direct game-scale captures.',
    '- No golden snapshots are changed by this script.',
    '- A human must inspect the contact sheet and individual PNGs before recording a visual verdict.',
    ''
  ];
  fs.writeFileSync(summaryPath, lines.join('\n'));
  console.log('\n' + lines.join('\n'));
  console.log('Review contact sheet written: ' + path.join(out, 'five-civilian-native-4x-contact-sheet.png'));
  if (missingGameScale.length) {
    console.error('Missing five-civilian direct game-scale captures:', missingGameScale.join(', '));
    process.exitCode = 1;
  }
  if (missing.length) {
    console.error('Missing five-civilian directional captures:', missing.join(', '));
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
