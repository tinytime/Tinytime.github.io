import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = path.join(root, 'VaporCity_HD2D_Hybrid_Test.html');
const out = path.join(root, 'qa-output');
fs.mkdirSync(out, { recursive: true });

const htmlSource = fs.readFileSync(html, 'utf8');
const mainScriptStart = htmlSource.indexOf('window.SG={');
const scriptOpen = mainScriptStart >= 0 ? htmlSource.lastIndexOf('<script', mainScriptStart) : -1;
const scriptBodyStart = scriptOpen >= 0 ? htmlSource.indexOf('>', scriptOpen) + 1 : -1;
const scriptBodyEnd = scriptBodyStart >= 0 ? htmlSource.indexOf('</script>', mainScriptStart) : -1;
let syntaxCheck = { found: false, ok: false, error: 'Main game script was not found' };
if (scriptBodyStart >= 0 && scriptBodyEnd > scriptBodyStart) {
  const checkFile = path.join(out, 'game-main-check.js');
  fs.writeFileSync(checkFile, htmlSource.slice(scriptBodyStart, scriptBodyEnd));
  const checked = spawnSync(process.execPath, ['--check', checkFile], { encoding: 'utf8' });
  syntaxCheck = { found: true, ok: checked.status === 0, error: checked.stderr || null };
}
const npcSpriteSyntaxRun = spawnSync(process.execPath, ['--check', path.join(root, 'npc_sprites.js')], { encoding: 'utf8' });
const npcSpriteSyntaxCheck = { ok: npcSpriteSyntaxRun.status === 0, error: npcSpriteSyntaxRun.stderr || null };

const npcInventoryRun = spawnSync(process.execPath, [path.join(root, 'qa', 'generate-npc-inventory.mjs'), '--check'], {
  cwd: root,
  encoding: 'utf8'
});
const npcInventoryCheck = {
  ok: npcInventoryRun.status === 0,
  stdout: (npcInventoryRun.stdout || '').trim(),
  error: npcInventoryRun.stderr || (npcInventoryRun.status === 0 ? null : 'NPC inventory validation failed')
};

const grannyRefPath = path.join(root, 'qa', 'granny-ref.json');
const grannyRefExpected = JSON.parse(fs.readFileSync(grannyRefPath, 'utf8'));
const grannyRefGeneratorRun = spawnSync(process.execPath, [path.join(root, 'qa', 'generate-granny-ref.mjs'), '--check'], {
  cwd: root,
  encoding: 'utf8'
});
const grannyRefGeneratorCheck = {
  ok: grannyRefGeneratorRun.status === 0,
  stdout: (grannyRefGeneratorRun.stdout || '').trim(),
  error: grannyRefGeneratorRun.stderr || (grannyRefGeneratorRun.status === 0 ? null : 'Granny reference loader is stale')
};

// Serve the repository over localhost. Chromium blocks Fetch API requests on file:// URLs.
const server = createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  const target = path.resolve(root, '.' + pathname);
  if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403).end('Forbidden'); return; }
  fs.readFile(target, (error, data) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    const ext = path.extname(target).toLowerCase();
    const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json', '.css':'text/css', '.mp3':'audio/mpeg', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
});
await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
const gameUrl = 'http://127.0.0.1:' + server.address().port + '/VaporCity_HD2D_Hybrid_Test.html';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const pageErrors = [];
const scriptErrors = [];
const consoleErrors = [];
await page.addInitScript(() => {
  window.__qaScriptErrors = [];
  window.addEventListener('error', e => {
    window.__qaScriptErrors.push({
      message: e.message,
      filename: e.filename,
      line: e.lineno,
      column: e.colno
    });
  });
});
page.on('pageerror', e => pageErrors.push({ message: e.message, stack: e.stack }));
page.on('console', m => {
  if (m.type() === 'error') consoleErrors.push({ text: m.text(), location: m.location() });
});

try {
  await page.goto(gameUrl, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1200);
  const npcSpriteModuleLoaded = await page.evaluate(() => !!window.NPC_SPRITES &&
    typeof window.NPC_SPRITES.createGrannyRenderer === 'function' &&
    typeof window.NPC_SPRITES.createCivRenderer === 'function');
  await page.screenshot({ path: path.join(out, 'game-menu-1x.png'), fullPage: true });

  // Click the exact game menu control; do not infer navigation from button text.
  const townButton = page.locator('#mTown');
  const townButtonVisible = await townButton.count() > 0 && await townButton.isVisible();
  let townClickAttempted = false;
  let townClickError = null;
  if (townButtonVisible) {
    townClickAttempted = true;
    try {
      await townButton.click({ timeout: 5000 });
      await page.waitForTimeout(1800);
    } catch (e) {
      townClickError = e.message;
    }
  }

  const worldState = await page.locator('#world').evaluate(el => ({
    hidden: el.hidden,
    display: getComputedStyle(el).display,
    visibility: getComputedStyle(el).visibility,
    rect: (() => { const r = el.getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width,height:r.height }; })()
  })).catch(e => ({ error: e.message }));

  // Force the real Vapor City street map for the player-view screenshot.
  // The test save can start in a later district, and menu labels are not a reliable map selector.
  let townSceneState = await page.evaluate(() => {
    const sg = window.SG;
    if (!sg || typeof sg.owPlace !== 'function' || typeof sg.M !== 'function') {
      return { pass: false, error: 'Game scene controls are unavailable' };
    }
    if (sg.M()?.id !== 'street') sg.owPlace('street', 19, 23, 'd', null);
    const map = sg.M();
    return {
      mapId: map?.id || null,
      npcCount: Array.isArray(map?.npcs) ? map.npcs.length : null,
      grannyPresent: Array.isArray(map?.npcs) && map.npcs.some(n => n.id === 'granny')
    };
  });
  await page.waitForTimeout(700);
  townSceneState.pass = townSceneState.mapId === 'street' && townSceneState.grannyPresent;
  await page.screenshot({ path: path.join(out, 'game-town-1x.png'), fullPage: true });

  const grannyMeasurements = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcMeasureGranny !== 'function') throw new Error('Granny measurement hook is unavailable');
    return window.SG.npcMeasureGranny();
  });
  const grannyRuntimeRef = await page.evaluate(() => ({
    source: window.GRANNY_REF_DATA || null,
    active: window.SG?.npcGrannyRef?.() || null
  }));
  const near = (a, b) => typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) < 1e-8;
  const metricKeys = ['bodyHeight', 'headTopRow', 'neckRow', 'headHeight', 'shoulderRow', 'shoulderWidth', 'footRow', 'totalHeight'];
  const directionsMatch = grannyRefExpected.directions.length === grannyMeasurements.directions.length &&
    grannyRefExpected.directions.every(expected => {
      const actual = grannyMeasurements.directions.find(d => d.direction === expected.direction);
      return !!actual && metricKeys.every(key => actual[key] === expected[key]) &&
        ['minX', 'maxX', 'minY', 'maxY', 'width', 'height'].every(key =>
          actual.bodyBounds[key] === expected.bodyBounds[key] && actual.fullBounds[key] === expected.fullBounds[key]);
    });
  const inGameKeys = ['mapTileSize', 'cameraZoom', 'rendererScale', 'bodyWidthPixels', 'bodyHeightPixels', 'fullHeightPixels', 'bodyHeightInTiles', 'deviceScale'];
  const inGameMatch = inGameKeys.every(key => near(grannyMeasurements.inGame[key], grannyRefExpected.inGame[key]));
  const canvasScaleCheck = near(grannyMeasurements.inGame.screenScaleX, 1 / grannyMeasurements.inGame.deviceScale) &&
    near(grannyMeasurements.inGame.screenScaleY, 1 / grannyMeasurements.inGame.deviceScale) &&
    near(grannyMeasurements.inGame.screenScaleX, grannyMeasurements.inGame.screenScaleY);
  const runtimeRefMatch = !!grannyRuntimeRef.source && !!grannyRuntimeRef.active &&
    grannyRuntimeRef.active.bodyHeight === grannyRefExpected.bodyHeight &&
    grannyRuntimeRef.active.totalHeight === grannyRefExpected.totalHeight &&
    grannyRuntimeRef.active.headHeight === grannyRefExpected.headHeight &&
    grannyRuntimeRef.active.shoulderWidth === grannyRefExpected.shoulderWidth &&
    grannyRuntimeRef.active.footRow === grannyRefExpected.footRow &&
    near(grannyRuntimeRef.active.nativeScale, grannyRefExpected.scaleFactor);
  const grannyMeasurementCheck = {
    pass: directionsMatch && inGameMatch && canvasScaleCheck && runtimeRefMatch && grannyMeasurements.directions?.length === 4,
    directionCount: grannyMeasurements.directions?.length || 0,
    directionsMatch,
    inGameMatch,
    canvasScaleCheck,
    canvasScale: { x: grannyMeasurements.inGame.screenScaleX, y: grannyMeasurements.inGame.screenScaleY, deviceScale: grannyMeasurements.inGame.deviceScale },
    runtimeRefMatch
  };

  const npcPaletteAudit = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcPaletteAudit !== 'function') throw new Error('NPC palette audit hook is unavailable');
    return window.SG.npcPaletteAudit();
  });
  const npcPaletteCheck = {
    pass: npcPaletteAudit.length === 23 && npcPaletteAudit.every(item => item.uniqueColorCount <= 12),
    spriteCount: npcPaletteAudit.length,
    maxUniqueColors: Math.max(...npcPaletteAudit.map(item => item.uniqueColorCount)),
    overLimit: npcPaletteAudit.filter(item => item.uniqueColorCount > 12)
  };

  const npcBodyMeasurements = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcMeasureCivBodies !== 'function') throw new Error('NPC body measurement hook is unavailable');
    return window.SG.npcMeasureCivBodies();
  });
  const bodyReference = await page.evaluate(() => window.GRANNY_REF_DATA);
  const expectedBodyPixels = bodyReference.bodyHeight * bodyReference.scaleFactor;
  const civScale = expectedBodyPixels / bodyReference.visibleCivHeight;
  const galleryBackground = '#777982';
  const luminance = hex => {
    const rgb = hex.match(/[0-9a-f]{2}/gi).map(v => parseInt(v,16)/255).map(v => v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
    return 0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];
  };
  const bgLum = luminance(galleryBackground);
  const allBodyMeasurements = [...npcBodyMeasurements.civs, npcBodyMeasurements.granny];
  const bodyRows = allBodyMeasurements.map(item => {
    const granny = item.civ === 'granny';
    const scale = granny ? bodyReference.scaleFactor : civScale;
    // Civilian canvas height is inclusive; the 80-row visible body is the
    // distance between the first and last opaque rows (bodyHeight - 1).
    const renderedHeightPixels = (granny ? item.bodyHeight : item.bodyHeight - 1) * scale;
    // owCiv anchors its 64x96 sprite at row 80; Granny's native renderer
    // anchors at source row 137 with her measured foot row at 136.
    const baselineOffset = item.footRow - (granny ? 137 : 80);
    const expectedBaselineOffset = granny ? -1 : 0;
    const outlineLum = luminance(item.outlineColor);
    const contrastRatio = (Math.max(outlineLum,bgLum)+0.05)/(Math.min(outlineLum,bgLum)+0.05);
    return {...item,renderedHeightPixels,heightDeviationPixels:Math.abs(renderedHeightPixels-expectedBodyPixels),
      baselineOffset,baselineDelta:Math.abs(baselineOffset-expectedBaselineOffset),
      contrastRatio,outlineContrastPercent:Math.abs(outlineLum-bgLum)/Math.max(outlineLum,bgLum)};
  });
  const npcBodyCheck = {
    pass: bodyRows.length === 24 && bodyRows.every(item => item.heightDeviationPixels <= 1 &&
      item.baselineDelta <= 0.02 && item.outlinePixelCount > 0 && item.contrastRatio >= 1.3 &&
      item.outlineContrastPercent >= 0.30),
    spriteCount: bodyRows.length,
    expectedBodyHeightPixels: expectedBodyPixels,
    maxHeightDeviationPixels: Math.max(...bodyRows.map(item=>item.heightDeviationPixels)),
    maxBaselineDelta: Math.max(...bodyRows.map(item=>item.baselineDelta)),
    missingOutline: bodyRows.filter(item=>item.outlinePixelCount===0).map(item=>item.civ),
    lowContrast: bodyRows.filter(item=>item.contrastRatio<1.3||item.outlineContrastPercent<0.30).map(item=>({civ:item.civ,outlineColor:item.outlineColor,contrastRatio:item.contrastRatio,outlineContrastPercent:item.outlineContrastPercent})),
    measurements: bodyRows
  };

  const npcSnapshotData = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcRenderSnapshots !== 'function') throw new Error('NPC snapshot hook is unavailable');
    return window.SG.npcRenderSnapshots();
  });
  const snapshotDir = path.join(out, 'npc-snapshots');
  fs.mkdirSync(snapshotDir, { recursive: true });
  const snapshotResults = npcSnapshotData.map(item => {
    const bytes = Buffer.from(item.dataUrl.split(',')[1], 'base64');
    const outputPath = path.join(snapshotDir, item.civ + '.png');
    fs.writeFileSync(outputPath, bytes);
    const goldenPath = path.join(root, 'qa', 'golden-npcs', item.civ + '.png');
    if (!fs.existsSync(goldenPath)) return { civ: item.civ, status: 'missing', bytes: bytes.length };
    const golden = fs.readFileSync(goldenPath);
    return { civ: item.civ, status: Buffer.compare(bytes, golden) === 0 ? 'match' : 'changed', bytes: bytes.length };
  });
  const allSnapshotsMissing = snapshotResults.length === 24 && snapshotResults.every(item => item.status === 'missing');
  const snapshotCheck = {
    // The first clean run may seed the golden directory. Partial baselines or
    // any changed existing PNG remain hard failures.
    pass: snapshotResults.length === 24 && (allSnapshotsMissing || snapshotResults.every(item => item.status === 'match')),
    baselinePending: allSnapshotsMissing,
    expectedCount: 24,
    snapshotCount: snapshotResults.length,
    matches: snapshotResults.filter(item => item.status === 'match').length,
    missing: snapshotResults.filter(item => item.status === 'missing').map(item => item.civ),
    changed: snapshotResults.filter(item => item.status === 'changed').map(item => item.civ),
    snapshots: snapshotResults
  };

  const archetypeSilhouettes = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcMeasureArchetypeMasks !== 'function') throw new Error('Archetype silhouette hook is unavailable');
    return window.SG.npcMeasureArchetypeMasks({ excludeProps: true });
  });
  const silhouetteComparisons = [];
  for (const direction of ['d', 'u', 'l', 'r']) {
    const view = archetypeSilhouettes.filter(item => item.direction === direction);
    for (let i = 0; i < view.length; i++) for (let j = i + 1; j < view.length; j++) {
      let intersection = 0, union = 0, edgeRowsDifferentBy2 = 0;
      for (let y = 0; y < 96; y++) {
        let leftA = 64, rightA = -1, leftB = 64, rightB = -1;
        for (let x = 0; x < 64; x++) {
          const a = view[i].maskRows[y][x] === '1', b = view[j].maskRows[y][x] === '1';
          if (a && b) intersection++;
          if (a || b) union++;
          if (a) { leftA = Math.min(leftA, x); rightA = Math.max(rightA, x); }
          if (b) { leftB = Math.min(leftB, x); rightB = Math.max(rightB, x); }
        }
        if (y >= 20 && y <= 47 && leftA < 64 && leftB < 64 &&
            (Math.abs(leftA - leftB) >= 2 || Math.abs(rightA - rightB) >= 2)) edgeRowsDifferentBy2++;
      }
      silhouetteComparisons.push({
        direction,
        pair: [view[i].archetype, view[j].archetype],
        iou: union ? intersection / union : 1,
        edgeRowsDifferentBy2
      });
    }
  }
  const silhouetteBaseline = {
    archetypeCount: new Set(archetypeSilhouettes.map(x => x.archetype)).size,
    viewCount: 4,
    pairCount: silhouetteComparisons.length,
    targetIoU: 0.85,
    maskBasis: 'Body and clothing silhouettes; handheld props, bags, and gear excluded.',
    pairsBelowTarget: silhouetteComparisons.filter(x => x.iou < 0.85).length,
    pairsAtOrAboveTarget: silhouetteComparisons.filter(x => x.iou >= 0.85).length,
    minIoU: Math.min(...silhouetteComparisons.map(x => x.iou)),
    maxIoU: Math.max(...silhouetteComparisons.map(x => x.iou)),
    minEdgeRowsDifferentBy2: Math.min(...silhouetteComparisons.map(x => x.edgeRowsDifferentBy2)),
    comparisons: silhouetteComparisons
  };

  const silhouetteQualityCheck = {
    // Reject trivial one-row edge edits: a distinct body silhouette must
    // hold its contour difference across at least six torso/head scanlines.
    pass: silhouetteBaseline.pairCount === 180 &&
      silhouetteBaseline.pairsBelowTarget === silhouetteBaseline.pairCount &&
      silhouetteBaseline.pairsAtOrAboveTarget === 0 &&
      silhouetteBaseline.minEdgeRowsDifferentBy2 >= 6,
    pairCount: silhouetteBaseline.pairCount,
    pairsBelowTarget: silhouetteBaseline.pairsBelowTarget,
    pairsAtOrAboveTarget: silhouetteBaseline.pairsAtOrAboveTarget,
    failingOverlapPairs: silhouetteComparisons.filter(x => x.iou >= 0.85),
    failingEdgePairs: silhouetteComparisons.filter(x => x.edgeRowsDifferentBy2 < 6),
    minIoU: silhouetteBaseline.minIoU,
    maxIoU: silhouetteBaseline.maxIoU,
    minEdgeRowsDifferentBy2: silhouetteBaseline.minEdgeRowsDifferentBy2,
    minimumDistinctEdgeRows: 6,
    requirements: 'All 180 archetype pairs must have IoU < 0.85 in all four directions; every pair must differ by at least 2 px across at least six torso/head edge rows.'
  };

  const galleryToggle = page.locator('#owNpcGalleryToggle');
  const galleryState = await galleryToggle.evaluate(el => ({
    hidden: el.hidden,
    display: getComputedStyle(el).display,
    visibility: getComputedStyle(el).visibility,
    opacity: getComputedStyle(el).opacity,
    rect: (() => { const r = el.getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width,height:r.height }; })()
  })).catch(e => ({ error: e.message }));
  const galleryToggleVisible = await galleryToggle.count() > 0 && await galleryToggle.isVisible();
  await page.screenshot({ path: path.join(out, 'game-town-1x.png'), fullPage: true });

  let galleryOpened = false;
  let galleryClickError = null;
  if (galleryToggleVisible) {
    try {
      await galleryToggle.click({ timeout: 5000 });
      await page.waitForTimeout(500);
      galleryOpened = true;
    } catch (e) { galleryClickError = e.message; }
  }

  const galleryCanvas = page.locator('#owNpcGalleryCanvas');
  const galleryExists = await galleryCanvas.count() > 0 && await galleryCanvas.isVisible();
  let canvasMetrics = null;
  let galleryRenderError = null;
  if (galleryExists) {
    galleryRenderError = await galleryCanvas.evaluate(c => c.dataset.renderError || null);
    canvasMetrics = await galleryCanvas.evaluate(canvas => {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      const img = ctx.getImageData(0, 0, width, height);
      let alphaPixels = 0, minX = width, minY = height, maxX = -1, maxY = -1;
      const colors = new Set();
      const stride = Math.max(1, Math.floor(Math.sqrt(width * height / 100000)));
      for (let y = 0; y < height; y += stride) for (let x = 0; x < width; x += stride) {
        const p = (y * width + x) * 4, a = img.data[p + 3];
        if (a > 0) { alphaPixels++; minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); }
        if (a > 0) colors.add(img.data[p] + ',' + img.data[p+1] + ',' + img.data[p+2]);
      }
      return { width, height, sampledStride: stride, sampledAlphaPixels: alphaPixels, sampledUniqueRGB: colors.size,
        alphaBounds: maxX < 0 ? null : { minX, minY, maxX, maxY } };
    });
    // Export the complete backing canvas, not the clipped gallery panel viewport.
    // The panel intentionally scrolls on smaller screens, so page screenshots can omit row 4.
    const galleryPng = await galleryCanvas.evaluate(c => c.toDataURL('image/png'));
    fs.writeFileSync(path.join(out, 'npc-gallery-1x.png'), Buffer.from(galleryPng.split(',')[1], 'base64'));
    const gallery4xPng = await galleryCanvas.evaluate(async c => {
      const scaled = document.createElement('canvas');
      scaled.width = c.width * 4;
      scaled.height = c.height * 4;
      const ctx = scaled.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(c, 0, 0, scaled.width, scaled.height);
      return scaled.toDataURL('image/png');
    });
    fs.writeFileSync(path.join(out, 'npc-gallery-4x.png'), Buffer.from(gallery4xPng.split(',')[1], 'base64'));
    const grannyDirectionalVisualCheck = await galleryCanvas.evaluate(c => {
      const ctx = c.getContext('2d');
      const cellW = Math.floor(c.width / 10);
      const cellH = Math.floor(c.height / 4);
      // Compare the first gallery column (Granny) above the label band.
      // The sprite occupies the upper 72% of each cell; labels are excluded.
      const cropHeight = Math.floor(cellH * 0.72);
      const crops = [];
      for (let row = 0; row < 4; row++) {
        crops.push(ctx.getImageData(0, row * cellH, cellW, cropHeight).data);
      }
      const comparisons = [];
      for (let row = 1; row < 4; row++) {
        let differentPixels = 0;
        for (let p = 0; p < crops[0].length; p += 4) {
          if (crops[0][p] !== crops[row][p] || crops[0][p+1] !== crops[row][p+1] ||
              crops[0][p+2] !== crops[row][p+2] || crops[0][p+3] !== crops[row][p+3]) differentPixels++;
        }
        comparisons.push({ directions: ['front', 'back', 'left', 'right'][0] + ' vs ' + ['front', 'back', 'left', 'right'][row], differentPixels });
      }
      return { pass: comparisons.every(x => x.differentPixels > 0), comparisons,
        note: 'Pixel comparison of Granny gallery sprite crops; direction labels excluded.' };
    });
    canvasMetrics.grannyDirectionalVisualCheck = grannyDirectionalVisualCheck;
    canvasMetrics.cellGrid = await galleryCanvas.evaluate(c => {
      const ctx = c.getContext('2d');
      const { width, height } = c;
      const cols = 10, rows = 4;
      const cellW = Math.floor(width / cols), cellH = Math.floor(height / rows);
      const pixels = ctx.getImageData(0, 0, width, height).data;
      const bg = [pixels[0], pixels[1], pixels[2]];
      const cells = [];
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        let visible = 0, minX = cellW, minY = cellH, maxX = -1, maxY = -1;
        const x0 = col * cellW, y0 = row * cellH;
        for (let y = y0; y < Math.min(height, y0 + cellH); y++) {
          for (let x = x0; x < Math.min(width, x0 + cellW); x++) {
            const p = (y * width + x) * 4;
            if (pixels[p] !== bg[0] || pixels[p+1] !== bg[1] || pixels[p+2] !== bg[2]) {
              visible++; minX = Math.min(minX, x-x0); minY = Math.min(minY, y-y0);
              maxX = Math.max(maxX, x-x0); maxY = Math.max(maxY, y-y0);
            }
          }
        }
        cells.push({ row, col, nonBackgroundPixels: visible,
          bounds: maxX < 0 ? null : { minX, minY, maxX, maxY } });
      }
      return { rows, cols, cellWidth: cellW, cellHeight: cellH,
        nonEmptyCells: cells.filter(x => x.nonBackgroundPixels > 100).length, cells };
    });
  }

  scriptErrors.push(...await page.evaluate(() => window.__qaScriptErrors || []));
  const report = {
    timestamp: new Date().toISOString(),
    htmlFile: path.basename(html),
    syntaxCheck,
    npcSpriteSyntaxCheck,
    npcSpriteModuleLoaded,
    npcInventoryCheck,
    grannyRefGeneratorCheck,
    pageTitle: await page.title(),
    townButtonVisible,
    townClickAttempted,
    townClickError,
    townSceneState,
    grannyMeasurements,
    grannyRuntimeRef,
    grannyMeasurementCheck,
    npcPaletteAudit,
    npcPaletteCheck,
    npcBodyCheck,
    snapshotCheck,
    archetypeSilhouetteCount: archetypeSilhouettes.length,
    silhouetteMaskDiagnostics: archetypeSilhouettes
      .filter(item => ['courier', 'trades'].includes(item.archetype))
      .map(item => ({ archetype: item.archetype, direction: item.direction, maskRows: item.maskRows })),
    silhouetteBaseline,
    silhouetteQualityCheck,
    worldState,
    galleryState,
    galleryToggleVisible,
    galleryOpened,
    galleryClickError,
    galleryFound: galleryExists,
    galleryRenderError,
    galleryVisualPass: galleryExists && !galleryRenderError,
    grannyDirectionalVisualCheck: canvasMetrics?.grannyDirectionalVisualCheck || null,
    canvasMetrics,
    scriptErrors,
    pageErrors,
    consoleErrors,
    note: 'Browser QA. Native-grid snapshots are written to qa-output/npc-snapshots and compared byte-for-byte with qa/golden-npcs. Gallery PNGs are exported from the full backing canvas; cellGrid verifies 40 non-empty archetype-direction cells but does not certify visual quality.'
  };
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (!syntaxCheck.ok || !npcSpriteSyntaxCheck.ok || !npcSpriteModuleLoaded || !npcInventoryCheck.ok || !grannyRefGeneratorCheck.ok || !townSceneState.pass || !grannyMeasurementCheck.pass || !npcPaletteCheck.pass || !npcBodyCheck.pass || !snapshotCheck.pass || !silhouetteQualityCheck.pass || !galleryExists || galleryRenderError || !canvasMetrics?.grannyDirectionalVisualCheck?.pass || pageErrors.length || scriptErrors.length || (canvasMetrics?.cellGrid?.nonEmptyCells !== 40)) process.exitCode = 1;
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
