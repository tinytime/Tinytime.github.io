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

  // Solid-black silhouette sheet from the alpha of the actual native captures.
  // This is a shape-inspection aid, not a silhouette-quality score.
  const silhouetteResult = await page.evaluate(async ({ captures }) => {
    const cellW = 256, cellH = 420, pad = 18, cols = 4, rows = 5;
    const canvas = document.createElement('canvas');
    canvas.width = pad + cols * (cellW + pad);
    canvas.height = pad + rows * (cellH + pad);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#777982'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < captures.length; i++) {
      const item = captures[i], image = new Image();
      image.src = item.dataUrl; await image.decode();
      const mask = document.createElement('canvas');
      mask.width = image.naturalWidth; mask.height = image.naturalHeight;
      const maskCtx = mask.getContext('2d', { willReadFrequently: true });
      maskCtx.drawImage(image, 0, 0);
      const pixels = maskCtx.getImageData(0, 0, mask.width, mask.height);
      for (let p = 0; p < pixels.data.length; p += 4) {
        if (pixels.data[p + 3] > 0) {
          pixels.data[p] = 0; pixels.data[p + 1] = 0; pixels.data[p + 2] = 0;
        }
      }
      maskCtx.putImageData(pixels, 0, 0);
      const x = pad + (i % cols) * (cellW + pad);
      const y = pad + Math.floor(i / cols) * (cellH + pad);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 18px monospace'; ctx.textAlign = 'left';
      ctx.fillText(item.civ.toUpperCase() + ' / ' + item.direction.toUpperCase(), x, y + 20);
      ctx.drawImage(mask, x, y + 32, cellW, 384);
    }
    return { dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height };
  }, { captures });
  fs.writeFileSync(path.join(out, 'five-civilian-black-silhouette-4x-contact-sheet.png'),
    Buffer.from(silhouetteResult.dataUrl.split(',')[1], 'base64'));

  // Composite the five direct 28x42 front captures over the actual night-town
  // screenshot as a lighting/ground diagnostic. This is explicitly NOT proof
  // that these NPCs were spawned live in the town scene.
  const townScreenshotPath = path.join(out, 'game-town-1x.png');
  let townCompositeCreated = false;
  if (fs.existsSync(townScreenshotPath)) {
    const townDataUrl = 'data:image/png;base64,' + fs.readFileSync(townScreenshotPath).toString('base64');
    const townSprites = gameScaleCaptures.filter(x => x.direction === 'front');
    const townComposite = await page.evaluate(async ({ townDataUrl, sprites }) => {
      const bg = new Image(); bg.src = townDataUrl; await bg.decode();
      const canvas = document.createElement('canvas');
      canvas.width = bg.naturalWidth; canvas.height = bg.naturalHeight;
      const ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = false;
      ctx.drawImage(bg, 0, 0);
      ctx.fillStyle = 'rgba(8,10,20,.78)'; ctx.fillRect(12, 54, 430, 28);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'left';
      ctx.fillText('DIRECT 28x42 NPCS / TOWN-GROUND COMPOSITE (DIAGNOSTIC)', 22, 73);
      const startX = Math.round(canvas.width * .36);
      const y = Math.round(canvas.height * .77);
      for (let i = 0; i < sprites.length; i++) {
        const item = sprites[i], image = new Image();
        image.src = item.dataUrl; await image.decode();
        const x = startX + i * 48;
        ctx.drawImage(image, x, y, 28, 42);
        ctx.fillStyle = '#fff'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText(item.civ.toUpperCase(), x + 14, y - 5);
      }
      return { dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height };
    }, { townDataUrl, sprites: townSprites });
    fs.writeFileSync(path.join(out, 'five-civilian-town-ground-composite.png'),
      Buffer.from(townComposite.dataUrl.split(',')[1], 'base64'));
    townCompositeCreated = true;
  }

  // Focused evidence sheets requested for the correction round. Native and
  // direct 28x42 captures are kept in separate sheets so scale provenance is clear.
  const focusedGroups = [
    { file: 'coach-courier-back-native-comparison.png', items: captures.filter(x => x.direction === 'back' && ['coach','courier'].includes(x.civ)), cellW: 256, cellH: 420, cols: 2 },
    { file: 'coach-courier-back-game-scale-comparison.png', items: gameScaleCaptures.filter(x => x.direction === 'back' && ['coach','courier'].includes(x.civ)), cellW: 160, cellH: 220, cols: 2 },
    { file: 'cook-prop-contact-native.png', items: captures.filter(x => ['front','left','right'].includes(x.direction) && x.civ === 'cook'), cellW: 256, cellH: 420, cols: 3 },
    { file: 'cook-prop-contact-game-scale.png', items: gameScaleCaptures.filter(x => ['front','left','right'].includes(x.direction) && x.civ === 'cook'), cellW: 160, cellH: 220, cols: 3 },
    { file: 'usher-game-scale-readability.png', items: gameScaleCaptures.filter(x => x.civ === 'usher'), cellW: 160, cellH: 220, cols: 4 }
  ];
  for (const group of focusedGroups) {
    const rows = Math.ceil(group.items.length / group.cols);
    const focused = await page.evaluate(async ({ items, cellW, cellH, cols, rows }) => {
      const pad = 18, canvas = document.createElement('canvas');
      canvas.width = pad + cols * (cellW + pad);
      canvas.height = pad + rows * (cellH + pad);
      const ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#292b35'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < items.length; i++) {
        const item = items[i], image = new Image(); image.src = item.dataUrl; await image.decode();
        const x = pad + (i % cols) * (cellW + pad), y = pad + Math.floor(i / cols) * (cellH + pad);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 16px monospace'; ctx.textAlign = 'left';
        ctx.fillText(item.civ.toUpperCase() + ' / ' + item.direction.toUpperCase(), x, y + 20);
        ctx.fillStyle = '#777982'; ctx.fillRect(x, y + 32, cellW, cellH - 36);
        if (cellW === 256) ctx.drawImage(image, x, y + 32, 256, 384);
        else ctx.drawImage(image, x + Math.round((cellW - 112) / 2), y + 32, 112, 168);
      }
      return { dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height };
    }, { items: group.items, cellW: group.cellW, cellH: group.cellH, cols: group.cols, rows });
    fs.writeFileSync(path.join(out, group.file), Buffer.from(focused.dataUrl.split(',')[1], 'base64'));
  }

  const checks = [
    ['directional integrity', report.civilianVisualIntegrityAudit?.pass, report.civilianVisualIntegrityAudit?.checked + '/' + report.civilianVisualIntegrityAudit?.expected],
    ['direct 28x42 capture assertion', report.gameScaleNpcCaptureAudit?.pass, report.gameScaleNpcCaptureAudit?.captured + '/' + report.gameScaleNpcCaptureAudit?.expected],
    ['role debug', report.roleDebugAudit?.pass, report.roleDebugAudit?.captureCount + '/' + report.roleDebugAudit?.expected],
    ['prop audit', report.npcPropAudit?.pass, report.npcPropAudit?.archetypeCount + ' archetypes'],
    ['gallery', report.galleryVisualPass, 'rendered'],
    ['silhouette diagnostic inventory', report.civilianTypeSilhouetteAudit?.pass, 'review triggers: ' + (report.civilianTypeSilhouetteAudit?.reviewPairs?.length ?? 0) + '; max IoU ' + report.civilianTypeSilhouetteAudit?.maxRenderedIoU],
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
    '- Black silhouette sheet: `five-civilian-black-silhouette-4x-contact-sheet.png` (' + silhouetteResult.width + '×' + silhouetteResult.height + '), generated from native-capture alpha.',
    '- Town-ground composite: ' + (townCompositeCreated ? '`five-civilian-town-ground-composite.png`' : 'not generated; town screenshot unavailable') + ' — diagnostic composition over the actual night-town screenshot, not live NPC spawn proof.',
    '- Pairwise silhouette IoU: 0.85 is a human-review trigger only; full-character alpha uses alpha > 0 and includes visible held/worn props. Triggered pairs: ' + (report.civilianTypeSilhouetteAudit?.reviewPairs || []).slice(0, 5).map(x => x.direction + ' ' + x.pair.join('/') + ' ' + x.iou.toFixed(3)).join('; '),
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
    '- Black silhouettes are derived from native-capture alpha masks and are for shape comparison only.',
    '- The town-ground composite overlays direct sprites onto a captured town screenshot; it is not a live in-game spawn or placement test.',
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
