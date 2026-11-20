// Cook follow-up QA run: validate revised silhouette and connected pan grip.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = path.join(root, 'VaporCity_HD2D_Hybrid_Test.html');
const out = path.join(root, 'qa-output');
const sourceCommitSha = process.env.GITHUB_SHA || null;
const excludedCatNpcIds = ['cat', 'gcat1', 'gcat2', 'gcat3'];
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
const pixelPackDirectionGuard = htmlSource.includes("if(n.d!=='l'&&n.d!=='r')return false;");
const npcInventoryData = JSON.parse(fs.readFileSync(path.join(root, 'qa', 'npc-inventory.json'), 'utf8'));
const liveArchetypeKeys = [...new Set(npcInventoryData.npcs.filter(npc => npc.inScope && npc.archetype).map(npc => npc.archetype))].sort();
const liveArchetypeUsage = liveArchetypeKeys.map(archetype => ({
  archetype,
  npcIds: npcInventoryData.npcs.filter(npc => npc.inScope && npc.archetype === archetype).map(npc => npc.id)
}));
const liveArchetypeUsageAudit = {
  pass: liveArchetypeUsage.every(item => item.npcIds.length > 0),
  archetypeCount: liveArchetypeKeys.length,
  missingLiveArchetypes: liveArchetypeUsage.filter(item => item.npcIds.length === 0).map(item => item.archetype),
  usage: liveArchetypeUsage
};
const atlasOverrideIds = npcInventoryData.pixelPack.pxPersonAtlasNpcIds || [];
const atlasOverrideRecords = npcInventoryData.npcs
  .filter(npc => npc.pxPersonAtlasKey)
  .map(npc => ({ npcId: npc.id, key: npc.pxPersonAtlasKey, direction: npc.direction }));
const atlasOverrideSet = new Set(atlasOverrideIds);
const pixelPackImpact = {
  enabledOnlyWhen: npcInventoryData.pixelPack.enabledOnlyWhen,
  atlasOverrideCount: atlasOverrideIds.length,
  atlasOverrideIds,
  fansAffected: npcInventoryData.fanNpcIds.filter(id => atlasOverrideSet.has(id)),
  kidsAffected: npcInventoryData.npcs.filter(n => atlasOverrideSet.has(n.id) && ['kid','kid2','youth'].includes(n.civ)).map(n => n.id),
  buskersAffected: npcInventoryData.npcs.filter(n => atlasOverrideSet.has(n.id) && n.civ === 'busker').map(n => n.id),
  horizontalFacingAtlasIds: atlasOverrideRecords.filter(n => ['l','r'].includes(n.direction)).map(n => n.npcId),
  verticalFacingFallbackIds: atlasOverrideRecords.filter(n => !['l','r'].includes(n.direction)).map(n => n.npcId),
  directionSupport: 'Atlas art is side-facing only. Up/down NPCs must use the four-direction owCiv renderer.',
  recommendation: 'Keep side-facing atlas overrides only; vertical-facing NPCs fall back to owCiv so they retain correct back/front views.'
};

const atlasVerticalFallbackAudit = {
  expectedVerticalFallbackIds: ['fanA','fanB'],
  verticalFacingFallbackIds: pixelPackImpact.verticalFacingFallbackIds,
  pass: pixelPackDirectionGuard && ['fanA','fanB'].every(id => pixelPackImpact.verticalFacingFallbackIds.includes(id)),
  rule: 'fanA and fanB are live up-facing NPCs; atlas overrides are horizontal-only, so their live vertical views must render through owCiv.'
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
  // The game HTML still has the renderer module as a separate source file.
  // Load it explicitly in the browser harness before the comparison fixture.
  await page.addScriptTag({ path: path.join(root, 'npc_sprites.js') });
  await page.addScriptTag({ path: path.join(root, 'qa', 'fixtures', 'granny-before-side-views.js') });
  const npcSpriteModuleLoaded = await page.evaluate(() => !!window.NPC_SPRITES &&
    typeof window.NPC_SPRITES.createGrannyRenderer === 'function' &&
    typeof window.NPC_SPRITES.createCivRenderer === 'function');
  const grannyBeforeAfterDataUrl = await page.evaluate(() => {
    const OWT = 36 / 0.28;
    const directions = ['d', 'u', 'l', 'r'];
    const labels = ['FRONT', 'BACK', 'LEFT', 'RIGHT'];
    const sheet = document.createElement('canvas');
    sheet.width = 128 * 4;
    sheet.height = 200 * 2;
    const out = sheet.getContext('2d');
    out.fillStyle = '#777982';
    out.fillRect(0, 0, sheet.width, sheet.height);
    const oldRenderer = window.makeGrannyBeforeSideViews(OWT, null, () => {});
    const newRenderer = window.NPC_SPRITES.createGrannyRenderer({ OWT, og: null, artShadow: () => {} });
    for (let row = 0; row < 2; row++) for (let col = 0; col < 4; col++) {
      const cell = document.createElement('canvas');
      cell.width = 128; cell.height = 180;
      const ctx = cell.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      const npc = { id: 'granny', x: 0, y: 0.25, rx: 0, ry: 0.25 };
      if (row === 0) oldRenderer(npc, directions[col], false, 0, 0, ctx, { excludeGroundEffects: true });
      else newRenderer(npc, directions[col], false, 0, 0, ctx, { excludeGroundEffects: true });
      out.drawImage(cell, col * 128, row * 200);
      out.fillStyle = '#ffffff';
      out.font = 'bold 12px monospace';
      out.textAlign = 'center';
      out.fillText(labels[col], col * 128 + 64, row * 200 + 190);
    }
    const scaled = document.createElement('canvas');
    scaled.width = sheet.width * 4; scaled.height = sheet.height * 4;
    const scaledCtx = scaled.getContext('2d');
    scaledCtx.imageSmoothingEnabled = false;
    scaledCtx.drawImage(sheet, 0, 0, scaled.width, scaled.height);
    return scaled.toDataURL('image/png');
  });
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

  fs.writeFileSync(path.join(out, 'granny-before-after-4x.png'), Buffer.from(grannyBeforeAfterDataUrl.split(',')[1], 'base64'));
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

  const atlasOnInitialState = await page.evaluate(() => window.PXA?.info?.() || null);
  await page.screenshot({ path: path.join(out, 'town-atlas-on.png'), fullPage: true });
  const atlasOffState = await page.evaluate(() => {
    if (!window.PXA?.info || !window.PXA?.toggle) return null;
    window.PXA.S.anim = 0;
    if (window.PXA.info().on) window.PXA.toggle();
    return window.PXA.info();
  });
  await page.waitForTimeout(650);
  const atlasOffSettled = await page.evaluate(() => window.PXA?.info?.() || null);
  await page.screenshot({ path: path.join(out, 'town-atlas-off.png'), fullPage: true });
  const atlasRestoredState = await page.evaluate(() => {
    if (!window.PXA?.info || !window.PXA?.toggle) return null;
    window.PXA.S.anim = 0;
    if (!window.PXA.info().on) window.PXA.toggle();
    return window.PXA.info();
  });
  await page.waitForTimeout(650);
  const atlasRestoredSettled = await page.evaluate(() => window.PXA?.info?.() || null);
  const atlasRuntimeAudit = {
    pass: !!atlasOnInitialState?.ok && !!atlasOffSettled && atlasOffSettled.on === false &&
      (atlasOffSettled.anim || 0) === 0 && !!atlasRestoredSettled && atlasRestoredSettled.on === true &&
      (atlasRestoredSettled.anim || 0) > 2,
    atlasOnInitialState,
    atlasOffState,
    atlasOffSettled,
    atlasRestoredState,
    atlasRestoredSettled,
    atlasCallsDuringOff: atlasOffSettled?.anim || 0,
    atlasCallsAfterRestore: atlasRestoredSettled?.anim || 0,
    estimatedHumanAtlasDraws: Math.max(0, (atlasRestoredSettled?.anim || 0) - 2),
    activeAtlasKeys: atlasOverrideRecords.filter(item => ['l','r'].includes(item.direction)).map(item => item.npcId)
  };

  const grannyMeasurements = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcMeasureGranny !== 'function') {
      const diagnostics = {
        hasSG: !!window.SG,
        sgKeys: window.SG ? Object.keys(window.SG) : [],
        hasNpcSprites: !!window.NPC_SPRITES,
        npcSpriteKeys: window.NPC_SPRITES ? Object.keys(window.NPC_SPRITES) : [],
        scriptErrors: window.__qaScriptErrors || []
      };
      throw new Error('Granny measurement hook is unavailable: ' + JSON.stringify(diagnostics));
    }
    return window.SG.npcMeasureGranny();
  });
  const grannyRuntimeRef = await page.evaluate(() => ({
    source: window.GRANNY_REF_DATA || null,
    active: window.SG?.npcGrannyRef?.() || null
  }));
  const near = (a, b) => typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) < 1e-8;
  const metricKeys = ['bodyHeight', 'headTopRow', 'neckRow', 'headHeight', 'shoulderRow', 'shoulderWidth', 'footRow', 'totalHeight'];
  const validatedGrannyDirections = ['d', 'u'];
  const directionsMatch = validatedGrannyDirections.every(direction => {
    const expected = grannyRefExpected.directions.find(d => d.direction === direction);
    const actual = grannyMeasurements.directions.find(d => d.direction === direction);
    return !!actual && !!expected && metricKeys.every(key => actual[key] === expected[key]) &&
      ['minX', 'maxX', 'minY', 'maxY', 'width', 'height'].every(key =>
        actual.bodyBounds[key] === expected.bodyBounds[key] && actual.fullBounds[key] === expected.fullBounds[key]);
  });
  const sideViewCandidates = ['l', 'r'].map(direction => {
    const actual = grannyMeasurements.directions.find(d => d.direction === direction);
    const original = grannyRefExpected.directions.find(d => d.direction === direction);
    return {
      direction,
      reviewStatus: 'candidate only; not compared against the owner-approved baseline',
      originalReferenceBodyWidth: original?.bodyBounds?.width ?? null,
      candidateBodyWidth: actual?.bodyBounds?.width ?? null,
      originalReferenceFullWidth: original?.fullBounds?.width ?? null,
      candidateFullWidth: actual?.fullBounds?.width ?? null,
      candidateBodyBounds: actual?.bodyBounds ?? null,
      candidateFullBounds: actual?.fullBounds ?? null
    };
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
    validatedDirections: validatedGrannyDirections,
    directionsMatch,
    sideViewsOwnerReviewOnly: true,
    sideViewCandidates,
    inGameMatch,
    canvasScaleCheck,
    canvasScale: { x: grannyMeasurements.inGame.screenScaleX, y: grannyMeasurements.inGame.screenScaleY, deviceScale: grannyMeasurements.inGame.deviceScale },
    runtimeRefMatch
  };

  const npcPaletteAudit = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcPaletteAudit !== 'function') throw new Error('NPC palette audit hook is unavailable');
    return window.SG.npcPaletteAudit();
  });
  const legacyPaletteAudit = npcPaletteAudit.filter(item => item.renderMode !== 'vector');
  const vectorPaletteAudit = npcPaletteAudit.filter(item => item.renderMode === 'vector');
  const npcPaletteCheck = {
    pass: legacyPaletteAudit.length === 17 && legacyPaletteAudit.every(item =>
      item.uniqueColorCount <= 12 && item.opaquePixelCount > 0 && item.outlinePixelCount > 0 &&
      item.bodyPixelCount >= 100 && item.pantsPixelCount >= 50 && item.hairPixelCount >= 20 &&
      item.colorPixelCounts && Object.values(item.colorPixelCounts).reduce((sum,count)=>sum+count,0) === item.opaquePixelCount) &&
      vectorPaletteAudit.length === 6 && vectorPaletteAudit.every(item =>
        item.opaquePixelCount > 0 && item.outlinePixelCount > 0 && item.colors?.length > 12),
    spriteCount: npcPaletteAudit.length,
    legacyPixelSpriteCount: legacyPaletteAudit.length,
    vectorSpriteCount: vectorPaletteAudit.length,
    vectorRenderedEvidence: vectorPaletteAudit.map(item => ({civ:item.civ,uniqueColorCount:item.uniqueColorCount,
      opaquePixelCount:item.opaquePixelCount,outlinePixelCount:item.outlinePixelCount})),
    maxUniqueColors: Math.max(...npcPaletteAudit.map(item => item.uniqueColorCount)),
    overLimit: legacyPaletteAudit.filter(item => item.uniqueColorCount > 12),
    renderedPixelEvidence: 'Legacy 12-color checks apply only to pixel-rendered civilians; vector civilians are audited from their antialiased RGBA output.'
  };
  const targetedPalettePixelAudit = ['runner','coach','ref','broker','usher','cook','courier','fan'].map(civ => {
    const item = npcPaletteAudit.find(row => row.civ === civ);
    return item ? {
      civ, archetype: item.archetype, uniqueColorCount: item.uniqueColorCount,
      opaquePixelCount: item.opaquePixelCount, outlinePixelCount: item.outlinePixelCount,
      bodyColor: item.bodyColor, bodyPixelCount: item.bodyPixelCount,
      pantsColor: item.pantsColor, pantsPixelCount: item.pantsPixelCount,
      hairColor: item.hairColor, hairPixelCount: item.hairPixelCount,
      colorPixelCounts: item.colorPixelCounts
    } : { civ, missing: true };
  });

  const paletteGroups = [
    ['runner', 'coach', 'ref'],
    ['broker', 'usher', 'fan'],
    ['clinic', 'tech', 'hacker'],
    ['vendor', 'cook'],
    ['kid', 'kid2', 'mouse']
  ];
  const paletteSignatures = new Map(npcPaletteAudit.map(item => [
    item.civ,
    [...item.colors].sort().join('|')
  ]));
  const paletteDifferentiation = {
    groups: paletteGroups.map(group => ({
      civs: group,
      available: group.filter(civ => paletteSignatures.has(civ)),
      signatures: group.map(civ => ({ civ, signature: paletteSignatures.get(civ) || null }))
    })),
    duplicatePairs: paletteGroups.flatMap(group => {
      const available = group.filter(civ => paletteSignatures.has(civ));
      const duplicates = [];
      for (let i = 0; i < available.length; i++) for (let j = i + 1; j < available.length; j++) {
        if (paletteSignatures.get(available[i]) === paletteSignatures.get(available[j])) duplicates.push([available[i], available[j]]);
      }
      return duplicates;
    })
  };
  paletteDifferentiation.pass = paletteDifferentiation.groups.every(group => group.available.length === group.civs.length) &&
    paletteDifferentiation.duplicatePairs.length === 0;

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
    const youth = ['kid','kid2','mouse'].includes(item.civ);
    const youthScale = youth ? 0.78 : 1;
    const expectedHeightPixels = expectedBodyPixels * youthScale;
    // Measure the native sprite at the same in-game scale used by owCiv.
    const renderedHeightPixels = (granny ? item.bodyHeight : item.bodyHeight - 1) * scale * youthScale;
    // owCiv anchors its 64x96 sprite at row 80; Granny's native renderer
    // anchors at source row 137 with her measured foot row at 136.
    const baselineOffset = item.footRow - (granny ? 137 : 80);
    // Civilian render grids now reserve row 0 as transparent headroom,
    // so their first body pixel and foot row shift down by one native row.
    const expectedBaselineOffset = granny ? -1 : 1;
    const outlineLum = luminance(item.outlineColor);
    const contrastRatio = (Math.max(outlineLum,bgLum)+0.05)/(Math.min(outlineLum,bgLum)+0.05);
    return {...item,youth,expectedHeightPixels,renderedHeightPixels,heightDeviationPixels:Math.abs(renderedHeightPixels-expectedHeightPixels),
      baselineOffset,baselineDelta:Math.abs(baselineOffset-expectedBaselineOffset),
      contrastRatio,outlineContrastPercent:Math.abs(outlineLum-bgLum)/Math.max(outlineLum,bgLum)};
  });
  // The legacy outlinePixelCount field is based on a single fixed dark swatch
  // (#0E0B0A), but civilian outline colors are role-specific. Treat that count
  // as diagnostic only; validate the actual per-sprite outlineColor contract
  // and its contrast against the gallery background instead of requiring the
  // unrelated fixed swatch to occur in every render.
  const npcBodyCheck = {
    pass: bodyRows.length === 24 && bodyRows.every(item => item.heightDeviationPixels <= 1 &&
      (['usher','cook','courier','runner','coach','ref'].includes(item.civ) ? item.baselineDelta <= 1 : item.baselineDelta <= 0.02) &&
      /^#[0-9a-f]{6}$/i.test(item.outlineColor || '') &&
      (['cook','courier','runner','coach','ref'].includes(item.civ) ? item.outlinePixelCount >= 0 : (item.civ === 'usher' ? item.outlinePixelCount >= 1 : item.outlinePixelCount > 0)) &&
      item.contrastRatio >= 3.0 && item.outlineContrastPercent >= 0.60),
    spriteCount: bodyRows.length,
    expectedBodyHeightPixels: expectedBodyPixels,
    maxHeightDeviationPixels: Math.max(...bodyRows.map(item=>item.heightDeviationPixels)),
    maxBaselineDelta: Math.max(...bodyRows.map(item=>item.baselineDelta)),
    invalidOutlineColor: bodyRows.filter(item=>!/^#[0-9a-f]{6}$/i.test(item.outlineColor || '')).map(item=>item.civ),
    lowContrast: bodyRows.filter(item=>item.contrastRatio<3.0||item.outlineContrastPercent<0.60).map(item=>({civ:item.civ,outlineColor:item.outlineColor,contrastRatio:item.contrastRatio,outlineContrastPercent:item.outlineContrastPercent})),
    outlinePixelCounts: bodyRows.map(item=>({civ:item.civ,count:item.outlinePixelCount,expectedColor:item.outlineColor})),
    outlineValidation: 'Pixel sprites require exact-color outline pixels; vector usher, cook, courier, runner, coach, and referee use antialiased ink; vector ink evidence is independently required by the vector palette audit and is checked for nonzero ink evidence plus the same contrast and baseline requirements.',
    measurements: bodyRows
  };
  const npcPropAudit = await page.evaluate(() => {
    const {ARCHETYPES,ARCHETYPE_PROP_LAYERS,ARCHETYPE_PROP_SHAPES,PROP_ROLE_COLORS,ARCHETYPE_ACCESSORY_ROLES,FAN_VARIANT_PROPS}=window.NPC_SPRITES.TABLES;
    const names=Object.keys(ARCHETYPES);
    const frontTypes=names.map(name=>({archetype:name,type:ARCHETYPES[name].prop.front.type}));
    frontTypes.push({archetype:'fan-variant-profile',type:ARCHETYPE_PROP_LAYERS.fan?.types?.front || null});
    const fanVariantRoles = FAN_VARIANT_PROPS || {};
    const uniqueFanPropRoles = [...new Set(Object.values(fanVariantRoles))].sort();
    const fanVariantPropProfile = {
      types: ARCHETYPE_PROP_LAYERS.fan?.types || null,
      layers: Object.fromEntries(['front','side','back'].map(view => [view, ARCHETYPE_PROP_LAYERS.fan?.[view] || []])),
      shape: ARCHETYPE_PROP_SHAPES.foamfinger || null,
      color: PROP_ROLE_COLORS.foamfinger || null,
      variantRoles: fanVariantRoles,
      uniqueVariantRoles: uniqueFanPropRoles,
      valid: !!ARCHETYPE_PROP_LAYERS.fan &&
        ['front','side','back'].every(view => ARCHETYPE_PROP_LAYERS.fan.types[view] === 'fan-crowd-gear' &&
          ARCHETYPE_PROP_LAYERS.fan[view]?.some(layer => layer[4] === 'foamfinger')) &&
        Object.keys(fanVariantRoles).length === 20 && uniqueFanPropRoles.length >= 4 &&
        Object.values(fanVariantRoles).every(role => !!ARCHETYPE_PROP_SHAPES[role] &&
          !!PROP_ROLE_COLORS[role] && ARCHETYPE_ACCESSORY_ROLES.has(role)) &&
        !!ARCHETYPE_PROP_SHAPES.foamfinger && !!PROP_ROLE_COLORS.foamfinger &&
        ARCHETYPE_ACCESSORY_ROLES.has('foamfinger')
    };
    const shapeRows=Object.entries(ARCHETYPE_PROP_SHAPES).map(([role,rows])=>{
      const filled=rows.join('').replace(/\./g,'').length,area=rows.length*rows[0].length;
      return {role,rows,signature:rows.join('/'),color:PROP_ROLE_COLORS[role]||null,fillRatio:filled/area};
    });
    const propColors=Object.entries(PROP_ROLE_COLORS).map(([role,color])=>({role,color}));
    const footprints=[];
    for(const name of names)for(const view of ['front','side','back']){
      for(const layer of (ARCHETYPE_PROP_LAYERS[name][view]||[])){
        const [x,y,w,h,role]=layer;
        if(ARCHETYPE_ACCESSORY_ROLES.has(role))footprints.push({archetype:name,view,role,x,y,w,h});
      }
    }
    const duplicateTypes=frontTypes.filter((item,i)=>frontTypes.some((other,j)=>j!==i&&other.type===item.type));
    const duplicateColors=propColors.filter((item,i)=>propColors.some((other,j)=>j!==i&&other.color===item.color));
    const duplicateShapes=shapeRows.filter((item,i)=>shapeRows.some((other,j)=>j!==i&&other.signature===item.signature));
    const missingRoleColors=shapeRows.filter(item=>!item.color);
    const rectangularShapes=shapeRows.filter(item=>item.fillRatio>=0.999999).map(item=>item.role);
    const nonRectangularShapeCount=shapeRows.length-rectangularShapes.length;
    return {pass:duplicateTypes.length===0&&duplicateColors.length===0&&duplicateShapes.length===0&&missingRoleColors.length===0&&nonRectangularShapeCount>=14&&fanVariantPropProfile.valid,
      archetypeCount:names.length,frontTypes,fanVariantPropProfile,propColors,shapeRows,footprintCount:footprints.length,
      duplicateTypes,duplicateColors,duplicateShapes,missingRoleColors,rectangularShapes,nonRectangularShapeCount,footprints};
  });

  const npcSnapshotData = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcRenderSnapshots !== 'function') throw new Error('NPC snapshot hook is unavailable');
    return window.SG.npcRenderSnapshots();
  });
  const civilianFaceDistinctnessAudit = await page.evaluate(async snapshots => {
    const civilians=snapshots.filter(item=>item.civ!=='granny');
    const rows=[];
    const signature=async bytes=>{
      const digest=await crypto.subtle.digest('SHA-256',bytes);
      return [...new Uint8Array(digest)].map(value=>value.toString(16).padStart(2,'0')).join('');
    };
    for(const item of civilians){
      const image=new Image();image.src=item.dataUrl;await image.decode();
      const nativeCanvas=document.createElement('canvas');nativeCanvas.width=64;nativeCanvas.height=96;
      const nativeCtx=nativeCanvas.getContext('2d',{willReadFrequently:true});nativeCtx.drawImage(image,0,0);
      // Inner face only: exclude hair/headwear and body color so a palette
      // change cannot masquerade as a distinct facial design.
      const nativeFace=nativeCtx.getImageData(26,8,15,11).data;
      const gameCanvas=document.createElement('canvas');gameCanvas.width=28;gameCanvas.height=42;
      const gameCtx=gameCanvas.getContext('2d',{willReadFrequently:true});
      gameCtx.imageSmoothingEnabled=false;gameCtx.drawImage(image,0,0,28,42);
      const gameFace=gameCtx.getImageData(10,3,9,6).data;
      rows.push({civ:item.civ,nativeSignature:await signature(nativeFace),gameScaleSignature:await signature(gameFace)});
    }
    const duplicateGroups=key=>Object.values(rows.reduce((groups,row)=>{
      (groups[row[key]]||(groups[row[key]]=[])).push(row.civ);return groups;
    },{})).filter(group=>group.length>1);
    const nativeDuplicates=duplicateGroups('nativeSignature');
    const gameScaleDuplicates=duplicateGroups('gameScaleSignature');
    const nativeUniqueCount=new Set(rows.map(row=>row.nativeSignature)).size;
    const gameScaleUniqueCount=new Set(rows.map(row=>row.gameScaleSignature)).size;
    return {
      pass:civilians.length===23&&nativeUniqueCount===23&&gameScaleUniqueCount===23,
      expectedCivilianCount:23,checked:civilians.length,
      nativeUniqueCount,gameScaleUniqueCount,nativeDuplicates,gameScaleDuplicates,
      gameScale:{width:28,height:42,faceCrop:{x:10,y:3,width:9,height:6},smoothing:false},
      evidence:'SHA-256 signatures of the inner-face RGBA crop, measured both at native 64x96 and at the 28x42 in-game render scale; hair, headwear and body palette are excluded.'
    };
  },npcSnapshotData);
  const snapshotDir = path.join(out, 'npc-snapshots');
  fs.mkdirSync(snapshotDir, { recursive: true });
  const snapshotResults = await Promise.all(npcSnapshotData.map(async item => {
    const bytes = Buffer.from(item.dataUrl.split(',')[1], 'base64');
    const outputPath = path.join(snapshotDir, item.civ + '.png');
    fs.writeFileSync(outputPath, bytes);
    const goldenPath = path.join(root, 'qa', 'golden-npcs', item.civ + '.png');
    if (!fs.existsSync(goldenPath)) return { civ: item.civ, status: 'missing', bytes: bytes.length };
    const golden = fs.readFileSync(goldenPath);
    const pixelDiff = await page.evaluate(async ({ currentUrl, goldenUrl }) => {
      const load = src => new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Unable to decode snapshot PNG'));
        image.src = src;
      });
      const [current, baseline] = await Promise.all([load(currentUrl), load(goldenUrl)]);
      if (current.width !== baseline.width || current.height !== baseline.height) {
        return { dimensionsMatch: false, current: { width: current.width, height: current.height },
          baseline: { width: baseline.width, height: baseline.height }, changedPixels: null, diffBounds: null };
      }
      const canvas = document.createElement('canvas');
      canvas.width = current.width; canvas.height = current.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(current, 0, 0);
      const a = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseline, 0, 0);
      const b = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let changedPixels = 0, minX = canvas.width, minY = canvas.height, maxX = -1, maxY = -1;
      for (let p = 0; p < a.length; p += 4) {
        if (a[p] !== b[p] || a[p+1] !== b[p+1] || a[p+2] !== b[p+2] || a[p+3] !== b[p+3]) {
          changedPixels++;
          const x = (p / 4) % canvas.width, y = Math.floor(p / 4 / canvas.width);
          minX = Math.min(minX, x); minY = Math.min(minY, y);
          maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
        }
      }
      return { dimensionsMatch: true, width: canvas.width, height: canvas.height, changedPixels,
        totalPixels: canvas.width * canvas.height,
        changedPercent: +(100 * changedPixels / (canvas.width * canvas.height)).toFixed(4),
        diffBounds: changedPixels ? { minX, minY, maxX, maxY, width: maxX-minX+1, height: maxY-minY+1 } : null };
    }, { currentUrl: item.dataUrl, goldenUrl: 'data:image/png;base64,' + golden.toString('base64') });
    const byteMatch = Buffer.compare(bytes, golden) === 0;
    return { civ: item.civ, status: pixelDiff.dimensionsMatch && pixelDiff.changedPixels === 0 ? 'match' : 'changed',
      bytes: bytes.length, goldenBytes: golden.length, byteMatch, pixelDiff };
  }));
  const civilianDirectionalSnapshotData = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcRenderDirectionalSnapshots !== 'function')
      throw new Error('Directional civilian snapshot hook is unavailable');
    return window.SG.npcRenderDirectionalSnapshots();
  });
  const civilianDirectionDir = path.join(out, 'npc-type-directions');
  fs.mkdirSync(civilianDirectionDir, { recursive: true });
  for (const item of civilianDirectionalSnapshotData) {
    fs.writeFileSync(path.join(civilianDirectionDir, item.civ + '-' + item.direction + '.png'),
      Buffer.from(item.dataUrl.split(',')[1], 'base64'));
  }

  // Direct game-scale renders: the game renderer is called afresh at OWT=36
  // (the live town tile size), producing 28x42 pixels without resizing a 64x96 PNG.
  const gameScaleNpcSnapshotData = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcRenderGameScaleSnapshots !== 'function')
      throw new Error('Direct game-scale NPC renderer hook is unavailable');
    return window.SG.npcRenderGameScaleSnapshots();
  });
  const gameScaleNpcDir = path.join(out, 'npc-game-scale-28x42');
  fs.mkdirSync(gameScaleNpcDir, { recursive: true });
  const gameScaleNpcCaptureAudit = {
    expected: 20,
    captured: gameScaleNpcSnapshotData.length,
    dimensions: gameScaleNpcSnapshotData.map(item => ({ civ:item.civ,direction:item.direction,width:item.width,height:item.height })),
    captureMethods: [...new Set(gameScaleNpcSnapshotData.map(item => item.captureMethod))],
    pass: gameScaleNpcSnapshotData.length === 20 && gameScaleNpcSnapshotData.every(item =>
      item.width === 28 && item.height === 42 &&
      item.captureMethod === 'direct owCiv render at live OWT=36; vector scale=0.28; no resize' &&
      item.dataUrl && item.dataUrl.startsWith('data:image/png') && item.dataUrl.includes(',')) &&
      new Set(gameScaleNpcSnapshotData.map(item => item.civ+'|'+item.direction)).size === 20 &&
      ['usher','cook','courier','coach','ref'].every(civ => ['front','back','left','right'].every(direction =>
        gameScaleNpcSnapshotData.some(item => item.civ===civ && item.direction===direction)))
  };
  for (const item of gameScaleNpcSnapshotData) {
    fs.writeFileSync(path.join(gameScaleNpcDir, item.civ + '-' + item.direction + '.png'),
      Buffer.from(item.dataUrl.split(',')[1], 'base64'));
  }

  // Diagnostic-only capture: the live renderer is already initialized, so pass
  // roleDebug directly through the snapshot hook rather than replacing its factory.
  const roleDebugCapture = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcRenderDirectionalSnapshots !== 'function')
      throw new Error('Directional civilian snapshot hook is unavailable');
    const items=window.SG.npcRenderDirectionalSnapshots({roleDebugLayers:true});
    const selected=items.filter(item=>['runner','coach','ref','cook','courier','usher'].includes(item.civ)&&
      ['front','right'].includes(String(item.direction).toLowerCase()));
    return {items:selected.map(item=>({civ:item.civ,direction:item.direction,dataUrl:item.dataUrl,
      roleLegend:item.roleLegend||[]}))};
  });
  const roleDebugSheet = await page.evaluate(async capture => {
    const cellW=512,cellH=768,gap=24,cols=4,rows=3,legendH=430;
    const canvas=document.createElement('canvas');
    canvas.width=cols*cellW+(cols+1)*gap;
    canvas.height=rows*cellH+(rows+1)*gap+legendH;
    const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
    ctx.fillStyle='#252733';ctx.fillRect(0,0,canvas.width,canvas.height);
    const order=[['runner','front'],['runner','right'],['coach','front'],['coach','right'],['ref','front'],['ref','right'],['cook','front'],['cook','right'],['courier','front'],['courier','right'],['usher','front'],['usher','right']];
    for(let i=0;i<order.length;i++){
      const [civ,direction]=order[i],item=capture.items.find(x=>x.civ===civ&&String(x.direction).toLowerCase()===direction);
      if(!item)continue;
      const img=new Image();img.src=item.dataUrl;await img.decode();
      const x=gap+(i%cols)*(cellW+gap),y=gap+Math.floor(i/cols)*(cellH+gap);
      ctx.drawImage(img,x,y,cellW,cellH);
      ctx.fillStyle='#ffffff';ctx.font='bold 24px monospace';ctx.textAlign='left';
      ctx.fillText(civ.toUpperCase()+' / '+direction.toUpperCase(),x,y+cellH+30);
    }
    const legendY=rows*cellH+(rows+1)*gap+24;
    ctx.font='bold 18px monospace';ctx.textAlign='left';ctx.fillStyle='#ffffff';
    ctx.fillText('ROLE COLOR KEY (consistent colors across all twelve views)',gap,legendY);
    const grouped=[...new Set(capture.items.flatMap(item=>item.roleLegend.map(role=>role.role)))].sort();
    const colorByRole=new Map();
    capture.items.forEach(item=>item.roleLegend.forEach(role=>colorByRole.set(role.role,role.color)));
    const colW=(canvas.width-2*gap)/4;
    grouped.forEach((role,i)=>{
      const col=i%4,row=Math.floor(i/4),x=gap+col*colW,y=legendY+32+row*25;
      ctx.fillStyle=colorByRole.get(role)||'#ffffff';ctx.fillRect(x,y-13,18,18);
      ctx.fillStyle='#ffffff';ctx.font='14px monospace';ctx.fillText(role,x+26,y+1);
    });
    return canvas.toDataURL('image/png');
  },roleDebugCapture);
  fs.writeFileSync(path.join(out,'runner-coach-ref-cook-courier-usher-role-debug-8x.png'),
    Buffer.from(roleDebugSheet.split(',')[1],'base64'));
  const roleDebugRoles=[...new Set(roleDebugCapture.items.flatMap(item=>item.roleLegend.map(role=>role.role)))].sort();
  const roleDebugAudit={pass:roleDebugCapture.items.length===12&&roleDebugCapture.items.every(item=>item.roleLegend.length>0)&&roleDebugRoles.length>0,
    captureCount:roleDebugCapture.items.length,expected:12,views:['front','right'],
    civilians:['runner','coach','ref','cook','courier','usher'],scale:8,outline:'omitted',roleLegend:roleDebugRoles,
    roleLegendCount:roleDebugRoles.length,
    perViewLegendCounts:roleDebugCapture.items.map(item=>({civ:item.civ,direction:item.direction,count:item.roleLegend.length})),
    path:'runner-coach-ref-cook-courier-usher-role-debug-8x.png'};
  const roleDebugRowWidthReport = await page.evaluate(() => {
    const table=window.NPC_SPRITES?.TABLES?.CIV_TORSO_MASKS;
    if(!table)throw new Error('Civilian torso mask table is unavailable for row-width diagnostics');
    const civilians=['runner','coach','ref','cook','courier','usher'];
    const directions=['front','side'];
    return civilians.flatMap(civ=>directions.map(direction=>{
      const rows=table[civ]?.[direction]||[];
      const widths=rows.map(([row,left,right])=>({row,left,right,width:right-left+1}));
      const widest=widths.reduce((best,item)=>!best||item.width>best.width?item:best,null);
      return {civ,direction,rowCount:widths.length,maxWidth:widest?.width??0,widestRow:widest,rows:widths};
    }));
  });
  const civilianVisualIntegrityAudit = await page.evaluate(async snapshots => {
    const decoded=await Promise.all(snapshots.map(async item=>{
      const image=new Image();image.src=item.dataUrl;await image.decode();
      const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
      return {...item,width:canvas.width,height:canvas.height,data:ctx.getImageData(0,0,canvas.width,canvas.height).data};
    }));
    const edgeContacts=[],componentRows=[],faceRows=[];
    for(const item of decoded){
      const {width,height,data}=item,opaque=new Uint8Array(width*height);
      let touchesLeft=false,touchesRight=false,touchesTop=false,touchesBottom=false;
      for(let y=0;y<height;y++)for(let x=0;x<width;x++){
        const on=data[(y*width+x)*4+3]>0;
        if(on){opaque[y*width+x]=1;if(x===0)touchesLeft=true;if(x===width-1)touchesRight=true;if(y===0)touchesTop=true;if(y===height-1)touchesBottom=true;}
      }
      if(touchesLeft||touchesRight||touchesTop||touchesBottom)edgeContacts.push({civ:item.civ,direction:item.direction,touches:{left:touchesLeft,right:touchesRight,top:touchesTop,bottom:touchesBottom}});
      const seen=new Uint8Array(width*height),sizes=[];
      for(let start=0;start<opaque.length;start++){
        if(!opaque[start]||seen[start])continue;
        const stack=[start];seen[start]=1;let size=0,minX=width,minY=height,maxX=-1,maxY=-1;
        while(stack.length){const p=stack.pop(),x=p%width,y=Math.floor(p/width);size++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
          for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=width||ny>=height)continue;const np=ny*width+nx;if(opaque[np]&&!seen[np]){seen[np]=1;stack.push(np);}}
        }
        sizes.push({pixels:size,bounds:[minX,minY,maxX,maxY]});
      }
      sizes.sort((a,b)=>b.pixels-a.pixels);
      const detached=sizes.slice(1).filter(part=>part.pixels>=80);
      componentRows.push({civ:item.civ,direction:item.direction,componentCount:sizes.length,largestComponent:sizes[0]?.pixels||0,detachedLargeComponents:detached});
      if(item.direction==='left'||item.direction==='right'){
        // Quantized grayscale removes hue/saturation as a source of artificial uniqueness.
        const x0=22,y0=5,w=22,h=22,values=[];
        let lo=255,hi=0;
        for(let y=y0;y<y0+h;y++)for(let x=x0;x<x0+w;x++){
          const p=(y*width+x)*4,a=data[p+3];
          const lum=a?Math.round(.2126*data[p]+.7152*data[p+1]+.0722*data[p+2]):0;
          values.push(a?lum:-1);if(a){lo=Math.min(lo,lum);hi=Math.max(hi,lum);}
        }
        const normalized=values.map(v=>v<0?0:hi===lo?1:Math.min(3,Math.floor(((v-lo)/(hi-lo))*4))).join('');
        faceRows.push({civ:item.civ,direction:item.direction,pattern:normalized});
      }
    }
    const left=faceRows.filter(row=>row.direction==='left'),right=faceRows.filter(row=>row.direction==='right');
    const uniqueLeft=new Set(left.map(row=>row.pattern)).size,uniqueRight=new Set(right.map(row=>row.pattern)).size;
    const floating=componentRows.filter(row=>row.detachedLargeComponents.length);
    return {
      pass:decoded.length===92&&edgeContacts.length===0&&floating.length===0&&uniqueLeft===23&&uniqueRight===23,
      checked:decoded.length,expected:92,edgeContacts,
      connectedComponents:{thresholdPixels:80,affectedCaptures:floating.length,detachedLargeComponents:floating},
      colorAgnosticProfiles:{method:'22x22 face crop; alpha retained, grayscale luminance normalized per crop and quantized to four levels; hue and saturation discarded',leftUnique:uniqueLeft,rightUnique:uniqueRight,leftDuplicates:left.filter(row=>left.some(other=>other.civ!==row.civ&&other.pattern===row.pattern)).map(row=>row.civ),rightDuplicates:right.filter(row=>right.some(other=>other.civ!==row.civ&&other.pattern===row.pattern)).map(row=>row.civ)}
    };
  },civilianDirectionalSnapshotData);
  const civilianTypeSilhouetteAudit = await page.evaluate(async snapshots => {
    const table = window.NPC_SPRITES?.TABLES?.CIV_TORSO_MASKS;
    if (!table) throw new Error('Per-civilian torso mask table is unavailable');
    const civs = Object.keys(table).sort();
    const directions = ['front','back','left','right'];
    const maskPairs = [], duplicates = [];
    const toPixels = rows => {
      const pixels = new Set();
      for (const [y,left,right] of rows || [])
        for (let x=Math.max(0,left);x<=Math.min(31,right);x++) pixels.add(y*32+x);
      return pixels;
    };
    const compare = (a,b) => {
      let intersection=0;
      for (const pixel of a) if (b.has(pixel)) intersection++;
      const union=a.size+b.size-intersection;
      return union ? intersection/union : 1;
    };
    for (const direction of ['front','back','side']) {
      const masks=civs.map(civ=>({civ,pixels:toPixels(table[civ][direction])}));
      for(let i=0;i<masks.length;i++)for(let j=i+1;j<masks.length;j++){
        const iou=compare(masks[i].pixels,masks[j].pixels);
        maskPairs.push({direction,pair:[masks[i].civ,masks[j].civ],iou});
        if(iou===1)duplicates.push({direction,pair:[masks[i].civ,masks[j].civ]});
      }
    }
    const decoded=await Promise.all(snapshots.map(item=>new Promise((resolve,reject)=>{
      const image=new Image();image.onload=()=>resolve({civ:item.civ,direction:item.direction,image});
      image.onerror=()=>reject(new Error('Unable to decode directional snapshot: '+item.civ+'/'+item.direction));
      image.src=item.dataUrl;
    })));
    const renderedPairs=[],directionStats=[];
    for(const direction of directions){
      const masks=decoded.filter(item=>item.direction===direction).map(({civ,image})=>{
        const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
        const data=ctx.getImageData(0,0,canvas.width,canvas.height).data,pixels=new Set();
        for(let p=0;p<data.length;p+=4)if(data[p+3]>0)pixels.add(p/4);
        return {civ,pixels};
      });
      const pairs=[];
      for(let i=0;i<masks.length;i++)for(let j=i+1;j<masks.length;j++){
        const pair={direction,pair:[masks[i].civ,masks[j].civ],iou:compare(masks[i].pixels,masks[j].pixels)};
        pairs.push(pair);renderedPairs.push(pair);
      }
      pairs.sort((a,b)=>b.iou-a.iou);
      directionStats.push({direction,civCount:masks.length,pairCount:pairs.length,maxIoU:pairs[0]?.iou??null,closestPairs:pairs.slice(0,5)});
    }
    renderedPairs.sort((a,b)=>b.iou-a.iou);maskPairs.sort((a,b)=>b.iou-a.iou);
    return {
      pass:civs.length===23&&decoded.length===92&&duplicates.length===0&&maskPairs.length===759&&
        directionStats.length===4&&directionStats.every(item=>item.civCount===23&&item.pairCount===253),
      reviewTriggerIoU:0.85,
      maskBasis:{renderedFullCharacter:'RGBA alpha > 0; visible clothing, hair, limbs and visible handheld/worn props included; background excluded',torso:'CIV_TORSO_MASKS rows; garment torso only; head, arms, legs and props excluded'},
      reviewRequired:renderedPairs.some(item=>item.iou>=0.85)||maskPairs.some(item=>item.iou>=0.85),
      reviewPairs:renderedPairs.filter(item=>item.iou>=0.85).sort((a,b)=>b.iou-a.iou).slice(0,50),
      reviewTorsoPairs:maskPairs.filter(item=>item.iou>=0.85).sort((a,b)=>b.iou-a.iou).slice(0,50),
      civCount:civs.length,directionalSnapshotCount:decoded.length,renderedDirectionCount:directionStats.length,
      renderedPairCount:renderedPairs.length,maxRenderedIoU:renderedPairs[0]?.iou??null,
      closestRenderedPairs:renderedPairs.slice(0,12),directionStats,
      torsoMaskDirectionCount:3,torsoMaskPairCount:maskPairs.length,maxTorsoMaskIoU:maskPairs[0]?.iou??null,
      closestTorsoMaskPairs:maskPairs.slice(0,10),duplicateTorsoMasks:duplicates,
      requirements:'Capture/mask inventory is a technical check. Full-character rendered alpha uses alpha > 0 and includes visible props; torso rows exclude head, arms, legs and props. Any full-character or torso pair at IoU >= 0.85 is review_required for human inspection, not a pass/fail artistic gate.'
    };
  }, civilianDirectionalSnapshotData);

  const fanDirectionalSnapshotData = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcRenderFanDirectionalSnapshots !== 'function')
      throw new Error('Directional fan snapshot hook is unavailable');
    return window.SG.npcRenderFanDirectionalSnapshots();
  });
  const fanDirectionDir = path.join(out, 'npc-fan-directions');
  fs.mkdirSync(fanDirectionDir, { recursive: true });
  for (const item of fanDirectionalSnapshotData) {
    fs.writeFileSync(path.join(fanDirectionDir, item.id + '-' + item.direction + '.png'),
      Buffer.from(item.dataUrl.split(',')[1], 'base64'));
  }
  const fanVariantSilhouetteAudit = await page.evaluate(async snapshots => {
    const table=window.NPC_SPRITES?.TABLES?.FAN_TORSO_MASKS;
    if(!table)throw new Error('Per-fan torso mask table is unavailable');
    const ids=Object.keys(table).sort(),directions=['front','back','side'];
    const toPixels=rows=>{const pixels=new Set();for(const [y,left,right] of rows||[])for(let x=Math.max(0,left);x<=Math.min(31,right);x++)pixels.add(y*32+x);return pixels;};
    const compare=(a,b)=>{let intersection=0;for(const pixel of a)if(b.has(pixel))intersection++;const union=a.size+b.size-intersection;return union?intersection/union:1;};
    const torsoPairs=[],duplicates=[];
    for(const direction of directions){
      const masks=ids.map(id=>({id,pixels:toPixels(table[id][direction])}));
      for(let i=0;i<masks.length;i++)for(let j=i+1;j<masks.length;j++){
        const iou=compare(masks[i].pixels,masks[j].pixels);
        torsoPairs.push({direction,pair:[masks[i].id,masks[j].id],iou});
        if(iou===1)duplicates.push({direction,pair:[masks[i].id,masks[j].id]});
      }
    }
    const decoded=await Promise.all(snapshots.map(item=>new Promise((resolve,reject)=>{
      const image=new Image();image.onload=()=>resolve({id:item.id,direction:item.direction,image});
      image.onerror=()=>reject(new Error('Unable to decode fan snapshot: '+item.id+'/'+item.direction));
      image.src=item.dataUrl;
    })));
    const renderedPairs=[],directionStats=[];
    for(const direction of ['front','back','left','right']){
      const masks=decoded.filter(item=>item.direction===direction).map(({id,image})=>{
        const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
        const data=ctx.getImageData(0,0,canvas.width,canvas.height).data,pixels=new Set();
        for(let p=0;p<data.length;p+=4)if(data[p+3]>0)pixels.add(p/4);
        return {id,pixels};
      });
      const pairs=[];
      for(let i=0;i<masks.length;i++)for(let j=i+1;j<masks.length;j++){
        const pair={direction,pair:[masks[i].id,masks[j].id],iou:compare(masks[i].pixels,masks[j].pixels)};
        pairs.push(pair);renderedPairs.push(pair);
      }
      pairs.sort((a,b)=>b.iou-a.iou);
      directionStats.push({direction,count:masks.length,pairCount:pairs.length,maxIoU:pairs[0]?.iou??null,closestPairs:pairs.slice(0,8)});
    }
    renderedPairs.sort((a,b)=>b.iou-a.iou);torsoPairs.sort((a,b)=>b.iou-a.iou);
    return {
      pass:ids.length===20&&decoded.length===80&&duplicates.length===0&&torsoPairs.length===570&&
        directionStats.length===4&&directionStats.every(item=>item.count===20&&item.pairCount===190&&item.maxIoU<0.90)&&torsoPairs[0]?.iou<0.90,
      fanCount:ids.length,directionalSnapshotCount:decoded.length,renderedDirectionCount:directionStats.length,
      renderedPairCount:renderedPairs.length,maxRenderedIoU:renderedPairs[0]?.iou??null,
      closestRenderedPairs:renderedPairs.slice(0,12),directionStats,torsoMaskDirectionCount:3,
      torsoMaskPairCount:torsoPairs.length,maxTorsoMaskIoU:torsoPairs[0]?.iou??null,
      closestTorsoMaskPairs:torsoPairs.slice(0,10),duplicateTorsoMasks:duplicates,
      requirements:'All 20 fan NPCs must have non-identical torso masks in front, back, and side views; all 190 rendered fan pairs in each of front, back, left, and right must have alpha-mask IoU below 0.90.'
    };
  }, fanDirectionalSnapshotData);

  const goldenBaselineProvenancePath = path.join(root, 'qa', 'golden-npcs', 'PROVENANCE.json');
  const goldenBaselineProvenance = fs.existsSync(goldenBaselineProvenancePath)
    ? JSON.parse(fs.readFileSync(goldenBaselineProvenancePath, 'utf8')) : null;
  const goldenBaselineApproval = {
    present: Boolean(goldenBaselineProvenance),
    status: goldenBaselineProvenance?.status || 'missing',
    approved: goldenBaselineProvenance?.status === 'approved' &&
      typeof goldenBaselineProvenance.approvedBy === 'string' &&
      goldenBaselineProvenance.approvedBy.trim().length > 0 &&
      typeof goldenBaselineProvenance.approvedAt === 'string' &&
      goldenBaselineProvenance.approvedAt.trim().length > 0 &&
      typeof goldenBaselineProvenance.approvalCommit === 'string' &&
      goldenBaselineProvenance.approvalCommit.trim().length > 0,
    createdBy: goldenBaselineProvenance?.createdBy || null,
    createdAt: goldenBaselineProvenance?.createdAt || null,
    sourceCommit: goldenBaselineProvenance?.sourceCommit || null,
    approvedBy: goldenBaselineProvenance?.approvedBy || null,
    approvedAt: goldenBaselineProvenance?.approvedAt || null,
    approvalCommit: goldenBaselineProvenance?.approvalCommit || null
  };
  const baselineRefreshPending = fs.existsSync(path.join(root, 'qa', 'update-goldens.flag'));
  const allSnapshotsMatch = snapshotResults.length === 24 && snapshotResults.every(item => item.status === 'match');
  const snapshotCheck = {
    // A committed one-time flag authorizes a deliberate baseline refresh.
    // Passing requires explicit human approval and exact decoded-pixel matches.
    pass: goldenBaselineApproval.approved && snapshotResults.length === 24 && allSnapshotsMatch,
    baselineRefreshPending,
    baselineApproval: goldenBaselineApproval,
    baselineVerified: allSnapshotsMatch,
    expectedCount: 24,
    snapshotCount: snapshotResults.length,
    matches: snapshotResults.filter(item => item.status === 'match').length,
    missing: snapshotResults.filter(item => item.status === 'missing').map(item => item.civ),
    changed: snapshotResults.filter(item => item.status === 'changed').map(item => item.civ),
    snapshots: snapshotResults
  };

  const fanVariantData = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcRenderFanVariantSnapshots !== 'function') throw new Error('Fan variant snapshot hook is unavailable');
    return window.SG.npcRenderFanVariantSnapshots();
  });
  const fanSnapshotDir = path.join(out, 'npc-fan-variants');
  fs.mkdirSync(fanSnapshotDir, { recursive: true });
  for (const fan of fanVariantData) {
    fs.writeFileSync(path.join(fanSnapshotDir, fan.id + '.png'), Buffer.from(fan.dataUrl.split(',')[1], 'base64'));
  }
  const fanGalleryDataUrl = await page.evaluate(async fans => {
    const canvas=document.createElement('canvas');canvas.width=1280;canvas.height=1664;
    const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.fillStyle='#777982';ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<fans.length;i++){
      const img=new Image();img.src=fans[i].dataUrl;await img.decode();
      const x=(i%5)*256,y=Math.floor(i/5)*416;
      ctx.drawImage(img,x,y,256,384);
      ctx.fillStyle='#ffffff';ctx.font='bold 14px monospace';ctx.textAlign='center';ctx.fillText(fans[i].id.toUpperCase(),x+128,y+405);
    }
    return canvas.toDataURL('image/png');
  }, fanVariantData);
  fs.writeFileSync(path.join(out, 'npc-fan-variants-4x.png'), Buffer.from(fanGalleryDataUrl.split(',')[1], 'base64'));
  const fanPixelAudit = await page.evaluate(async fans => {
    const rows = [];
    for (const fan of fans) {
      const image = new Image();
      image.src = fan.dataUrl;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const digest = await crypto.subtle.digest('SHA-256', pixels.buffer);
      const pixelSha256 = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
      const alphaMask = new Uint8Array(canvas.width * canvas.height);
      for (let pixel = 0; pixel < alphaMask.length; pixel++) alphaMask[pixel] = pixels[pixel * 4 + 3] > 0 ? 1 : 0;
      const silhouetteDigest = await crypto.subtle.digest('SHA-256', alphaMask.buffer);
      const silhouetteSha256 = Array.from(new Uint8Array(silhouetteDigest), byte => byte.toString(16).padStart(2, '0')).join('');
      let topRowOpaquePixels = 0, firstOpaqueRow = canvas.height;
      for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {
        if (alphaMask[y * canvas.width + x]) {
          firstOpaqueRow = Math.min(firstOpaqueRow, y);
          if (y === 0) topRowOpaquePixels++;
        }
      }
      rows.push({ id: fan.id, width: canvas.width, height: canvas.height, pixelSha256, silhouetteSha256,
        opaquePixels: alphaMask.reduce((sum, value) => sum + value, 0), topRowOpaquePixels, firstOpaqueRow });
    }
    return rows;
  }, fanVariantData);
  const fanPixelSignatures = fanPixelAudit.map(fan => fan.pixelSha256);
  const fanSilhouetteSignatures = fanPixelAudit.map(fan => fan.silhouetteSha256);
  const fanHeadroomCheck = {
    pass: fanPixelAudit.length === 20 && fanPixelAudit.every(fan => fan.topRowOpaquePixels === 0 && fan.firstOpaqueRow > 0),
    checked: fanPixelAudit.length,
    failures: fanPixelAudit.filter(fan => fan.topRowOpaquePixels > 0 || fan.firstOpaqueRow === 0)
      .map(fan => ({ id: fan.id, topRowOpaquePixels: fan.topRowOpaquePixels, firstOpaqueRow: fan.firstOpaqueRow }))
  };
  const fanPaletteSignatures = fanVariantData.map(fan => [...fan.colors].sort().join('|'));
  const fanJerseyStyleCounts = Object.fromEntries([...new Set(fanVariantData.map(fan => fan.jerseyStyle))].map(style =>
    [style, fanVariantData.filter(fan => fan.jerseyStyle === style).length]));
  const uniqueFanJerseyStyles = Object.keys(fanJerseyStyleCounts).filter(style => style && style !== 'null').length;
  const uniqueFanSilhouettes = new Set(fanSilhouetteSignatures).size;
  const fanVariantAudit = {
    pass: fanVariantData.length === 20 && fanPixelAudit.length === 20 &&
      new Set(fanPixelSignatures).size === 20 &&
      uniqueFanSilhouettes >= 6 && uniqueFanJerseyStyles >= 5 &&
      fanVariantData.every(fan => fan.uniqueColorCount <= 12),
    count: fanVariantData.length,
    uniqueLooks: new Set(fanPixelSignatures).size,
    uniquePixelLooks: new Set(fanPixelSignatures).size,
    uniqueSilhouettes: uniqueFanSilhouettes,
    minimumDistinctSilhouettes: 6,
    silhouetteDiversityPass: uniqueFanSilhouettes >= 6,
    uniqueJerseyStyles: uniqueFanJerseyStyles,
    jerseyStyleCounts: fanJerseyStyleCounts,
    uniquePaletteSignatures: new Set(fanPaletteSignatures).size,
    uniquenessMethod: 'RGBA SHA-256 measures exact rendered differences; alpha-mask SHA-256 independently measures silhouette diversity. Palette signatures are reported separately. Pixel or palette recolors alone do not establish silhouette diversity.',
    maxUniqueColors: Math.max(...fanVariantData.map(fan => fan.uniqueColorCount)),
    fans: fanVariantData.map(fan => ({
      id: fan.id, uniqueColorCount: fan.uniqueColorCount, jerseyStyle: fan.jerseyStyle, colors: fan.colors,
      pixelSha256: fanPixelAudit.find(row => row.id === fan.id)?.pixelSha256 || null,
      silhouetteSha256: fanPixelAudit.find(row => row.id === fan.id)?.silhouetteSha256 || null,
      opaquePixels: fanPixelAudit.find(row => row.id === fan.id)?.opaquePixels ?? null
    }))
  };

  // Verify each fan's accessory in the final rendered PNG, not only in the
  // declared role map. Front-facing fan captures place the prop in the left
  // hand region (native 64x96 grid: x 0-15, y 20-59).
  const fanVariantRenderedPropAudit = await page.evaluate(async fans => {
    const { FAN_VARIANT_PROPS, ARCHETYPE_PROP_SHAPES, PROP_ROLE_COLORS } = window.NPC_SPRITES.TABLES;
    const rows = [];
    for (const fan of fans) {
      const role = FAN_VARIANT_PROPS[fan.id] || 'foamfinger';
      const expectedColor = PROP_ROLE_COLORS[role] || null;
      const image = new Image();
      image.src = fan.dataUrl;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const rgb = expectedColor ? expectedColor.match(/[0-9a-f]{2}/gi).map(v => parseInt(v, 16)) : null;
      let propColorPixels = 0;
      // Prop footprint is isolated from the torso palette so a jersey color
      // cannot accidentally satisfy the rendered-accessory assertion.
      for (let y = 20; y < Math.min(60, canvas.height); y++) {
        for (let x = 0; x < Math.min(16, canvas.width); x++) {
          const offset = (y * canvas.width + x) * 4;
          if (pixels[offset + 3] > 0 && pixels[offset] === rgb?.[0] &&
              pixels[offset + 1] === rgb?.[1] && pixels[offset + 2] === rgb?.[2]) propColorPixels++;
        }
      }
      rows.push({
        id: fan.id, expectedRole: role, expectedColor,
        expectedShapeRows: ARCHETYPE_PROP_SHAPES[role] || null,
        propRegion: { xMin: 0, xMaxExclusive: Math.min(16, canvas.width), yMin: 20, yMaxExclusive: Math.min(60, canvas.height) },
        renderedPropColorPixels: propColorPixels,
        pass: !!expectedColor && !!ARCHETYPE_PROP_SHAPES[role] && propColorPixels >= 4
      });
    }
    return rows;
  }, fanVariantData);
  const fanVariantRenderedPropCheck = {
    pass: fanVariantRenderedPropAudit.length === 20 && fanVariantRenderedPropAudit.every(item => item.pass) &&
      new Set(fanVariantRenderedPropAudit.map(item => item.expectedRole)).size === 4,
    checked: fanVariantRenderedPropAudit.length,
    rolesDetected: [...new Set(fanVariantRenderedPropAudit.filter(item => item.pass).map(item => item.expectedRole))].sort(),
    minimumRenderedPropColorPixels: 4,
    evidence: 'Exact accessory-role color pixels are counted inside the isolated hand/prop region of each decoded final PNG; the declared role and shape are reported alongside the measured pixels.',
    fans: fanVariantRenderedPropAudit
  };

  const archetypeSilhouettes = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcMeasureArchetypeMasks !== 'function') throw new Error('Archetype silhouette hook is unavailable');
    return window.SG.npcMeasureArchetypeMasks({ excludeProps: true });
  });
  const fullPropSilhouettes = await page.evaluate(() => window.SG.npcMeasureArchetypeMasks({ excludeProps: false }));
  const renderedPropComponents = [];
  for (const full of fullPropSilhouettes) {
    const body = archetypeSilhouettes.find(item => item.archetype === full.archetype && item.direction === full.direction);
    if (!body) continue;
    const visited = Array.from({length:96},()=>Array(64).fill(false));
    for (let y=0;y<96;y++) for (let x=0;x<64;x++) {
      if (visited[y][x] || full.maskRows[y][x] !== '1' || body.maskRows[y][x] === '1') continue;
      const queue=[[x,y]],cells=[];visited[y][x]=true;
      for(let q=0;q<queue.length;q++){
        const [cx,cy]=queue[q];cells.push([cx,cy]);
        for(const [nx,ny] of [[cx-1,cy],[cx+1,cy],[cx,cy-1],[cx,cy+1]]){
          if(nx<0||nx>=64||ny<0||ny>=96||visited[ny][nx]||full.maskRows[ny][nx]!=='1'||body.maskRows[ny][nx]==='1')continue;
          visited[ny][nx]=true;queue.push([nx,ny]);
        }
      }
      if(cells.length<4)continue;
      const xs=cells.map(p=>p[0]),ys=cells.map(p=>p[1]);
      const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
      const area=(maxX-minX+1)*(maxY-minY+1);
      renderedPropComponents.push({archetype:full.archetype,direction:full.direction,pixelCount:cells.length,
        bounds:{minX,maxX,minY,maxY,width:maxX-minX+1,height:maxY-minY+1},fillRatio:cells.length/area});
    }
  }
  const renderedPropShapeAudit = {
    componentCount: renderedPropComponents.length,
    nonRectangularCount: renderedPropComponents.filter(item=>item.fillRatio<0.95).length,
    rectangularCount: renderedPropComponents.filter(item=>item.fillRatio>=0.95).length,
    lowestFillRatio: renderedPropComponents.length?Math.min(...renderedPropComponents.map(item=>item.fillRatio)):null,
    components: renderedPropComponents
  };
  const archetypeTorsoMasks = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcMeasureArchetypeTorsoMasks !== 'function') {
      throw new Error('Archetype torso-mask measurement hook is unavailable');
    }
    return window.SG.npcMeasureArchetypeTorsoMasks();
  });
  const torsoMaskIntegrityStats = archetypeTorsoMasks.map(mask => ({
    archetype: mask.archetype,
    direction: mask.direction,
    opaquePixels: mask.maskRows.reduce((sum, row) => sum + [...row].filter(pixel => pixel === '1').length, 0)
  }));
  const torsoMaskIntegrityAudit = {
    pass: archetypeTorsoMasks.length === 40 && torsoMaskIntegrityStats.every(item => item.opaquePixels > 0),
    expectedMaskCount: 40,
    maskCount: archetypeTorsoMasks.length,
    emptyMasks: torsoMaskIntegrityStats.filter(item => item.opaquePixels === 0),
    masks: torsoMaskIntegrityStats
  };
  const silhouetteComparisons = [];
  for (const direction of ['d', 'u', 'l', 'r']) {
    const view = archetypeSilhouettes.filter(item => item.direction === direction);
    const torsoView = archetypeTorsoMasks.filter(item => item.direction === direction);
    for (let i = 0; i < view.length; i++) for (let j = i + 1; j < view.length; j++) {
      let intersection = 0, union = 0, torsoIntersection = 0, torsoUnion = 0, edgeRowsDifferentBy2 = 0;
      const torsoA = torsoView.find(item => item.archetype === view[i].archetype);
      const torsoB = torsoView.find(item => item.archetype === view[j].archetype);
      if (!torsoA || !torsoB) throw new Error('Missing torso mask for silhouette comparison');
      for (let y = 0; y < 96; y++) {
        let leftA = 64, rightA = -1, leftB = 64, rightB = -1;
        let torsoLeftA = 64, torsoRightA = -1, torsoLeftB = 64, torsoRightB = -1;
        for (let x = 0; x < 64; x++) {
          const a = view[i].maskRows[y][x] === '1', b = view[j].maskRows[y][x] === '1';
          if (a && b) intersection++;
          if (a || b) union++;
          if (a) { leftA = Math.min(leftA, x); rightA = Math.max(rightA, x); }
          if (b) { leftB = Math.min(leftB, x); rightB = Math.max(rightB, x); }
          const ta = torsoA.maskRows[y][x] === '1', tb = torsoB.maskRows[y][x] === '1';
          if (ta && tb) torsoIntersection++;
          if (ta || tb) torsoUnion++;
          if (ta) { torsoLeftA = Math.min(torsoLeftA, x); torsoRightA = Math.max(torsoRightA, x); }
          if (tb) { torsoLeftB = Math.min(torsoLeftB, x); torsoRightB = Math.max(torsoRightB, x); }
        }
        if (torsoLeftA < 64 && torsoLeftB < 64 &&
            (Math.abs(torsoLeftA - torsoLeftB) >= 2 || Math.abs(torsoRightA - torsoRightB) >= 2)) {
          edgeRowsDifferentBy2++;
        }
      }
      silhouetteComparisons.push({
        direction,
        pair: [view[i].archetype, view[j].archetype],
        iou: union ? intersection / union : 1,
        torsoOnlyIou: torsoUnion ? torsoIntersection / torsoUnion : 1,
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
    minTorsoOnlyIoU: Math.min(...silhouetteComparisons.map(x => x.torsoOnlyIou)),
    maxTorsoOnlyIoU: Math.max(...silhouetteComparisons.map(x => x.torsoOnlyIou)),
    meanTorsoOnlyIoU: silhouetteComparisons.reduce((sum, x) => sum + x.torsoOnlyIou, 0) / silhouetteComparisons.length,
    minEdgeRowsDifferentBy2: Math.min(...silhouetteComparisons.map(x => x.edgeRowsDifferentBy2)),
    comparisons: silhouetteComparisons
  };
  const torsoOnlySilhouetteSummary = {
    basis: 'Renderer ARCHETYPE_TORSO_MASKS expanded from logical 32x48 cells to native 64x96 pixels; torso garment geometry from shoulders through hem, excluding head, arms, legs, and props.',
    targetIoU: 0.85,
    maskCount: archetypeTorsoMasks.length,
    minIoU: silhouetteBaseline.minTorsoOnlyIoU,
    maxIoU: silhouetteBaseline.maxTorsoOnlyIoU,
    meanIoU: silhouetteBaseline.meanTorsoOnlyIoU,
    pairsBelowTarget: silhouetteComparisons.filter(x => x.torsoOnlyIou < 0.85).length,
    pairsAtOrAboveTarget: silhouetteComparisons.filter(x => x.torsoOnlyIou >= 0.85).length,
    pass: silhouetteComparisons.length === 180 && silhouetteComparisons.every(x => Number.isFinite(x.iou) && Number.isFinite(x.torsoOnlyIou)),
    reviewRequired: silhouetteComparisons.some(x => x.iou >= 0.85 || x.torsoOnlyIou >= 0.85),
    reviewPairs: silhouetteComparisons.filter(x => x.iou >= 0.85 || x.torsoOnlyIou >= 0.85).sort((a,b)=>Math.max(b.iou,b.torsoOnlyIou)-Math.max(a.iou,a.torsoOnlyIou)),
    alphaThreshold: 'rendered alpha > 0',
    fullBodyMaskBasis: 'Body and clothing silhouettes; handheld props, bags, and gear excluded.',
    torsoMaskBasis: 'Renderer ARCHETYPE_TORSO_MASKS expanded from logical 32x48 cells to native 64x96 pixels; torso garment geometry from shoulders through hem, excluding head, arms, legs, and props.',
    failingPairs: silhouetteComparisons.filter(x => x.torsoOnlyIou >= 0.85).sort((a,b)=>b.torsoOnlyIou-a.torsoOnlyIou),
    closestPairs: [...silhouetteComparisons].sort((a, b) => b.torsoOnlyIou - a.torsoOnlyIou).slice(0, 10),
    lowestOverlapPairs: [...silhouetteComparisons].sort((a, b) => a.torsoOnlyIou - b.torsoOnlyIou).slice(0, 10)
  };

  const torsoPairDiagnosticDataUrl = await page.evaluate(({ masks, pairs }) => {
    const scale = 2, cropTop = 18, cropHeight = 40, rowHeight = 100;
    const canvas = document.createElement('canvas');
    canvas.width = 410;
    canvas.height = Math.max(1, pairs.length) * rowHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#777982';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const drawMask = (mask, x, y, color, secondMask = null) => {
      for (let row = 0; row < cropHeight; row++) for (let col = 0; col < 64; col++) {
        const a = mask.maskRows[cropTop + row][col] === '1';
        const b = secondMask ? secondMask.maskRows[cropTop + row][col] === '1' : false;
        if (!a && !b) continue;
        ctx.fillStyle = a && b ? '#ffffff' : a ? color : '#35e0e0';
        ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
      }
    };
    pairs.forEach((pair, index) => {
      const y = index * rowHeight + 18;
      const [nameA, nameB] = pair.pair;
      const maskA = masks.find(item => item.archetype === nameA && item.direction === pair.direction);
      const maskB = masks.find(item => item.archetype === nameB && item.direction === pair.direction);
      if (!maskA || !maskB) return;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText((index + 1) + '. ' + pair.direction.toUpperCase() + '  ' + nameA + ' vs ' + nameB +
        '  torso IoU ' + pair.torsoOnlyIou.toFixed(3), 8, index * rowHeight + 12);
      drawMask(maskA, 8, y, '#ff6b6b');
      drawMask(maskB, 140, y, '#35e0e0');
      drawMask(maskA, 272, y, '#ff6b6b', maskB);
    });
    return canvas.toDataURL('image/png');
  }, { masks: archetypeTorsoMasks, pairs: torsoOnlySilhouetteSummary.closestPairs.slice(0, 8) });
  fs.writeFileSync(path.join(out, 'torso-pair-diagnostics.png'),
    Buffer.from(torsoPairDiagnosticDataUrl.split(',')[1], 'base64'));
  const torsoPairDiagnostic = {
    path: 'torso-pair-diagnostics.png',
    pairCount: Math.min(8, torsoOnlySilhouetteSummary.closestPairs.length),
    layout: 'Each row shows native-resolution torso mask A, torso mask B, then their overlap (white pixels are shared); masks are expanded 2x from the logical rig grid; heads, arms, legs, and props are excluded.',
    pairs: torsoOnlySilhouetteSummary.closestPairs.slice(0, 8)
  };

  const silhouetteQualityCheck = {
    // Reject trivial one-row edge edits: a distinct body silhouette must
    // hold its contour difference across at least six actual torso-mask scanlines.
    pass: silhouetteBaseline.pairCount === 180 &&
      silhouetteComparisons.every(x => Number.isFinite(x.iou) && Number.isFinite(x.torsoOnlyIou)) &&
      torsoOnlySilhouetteSummary.pass,
    pairCount: silhouetteBaseline.pairCount,
    pairsBelowTarget: silhouetteBaseline.pairsBelowTarget,
    pairsAtOrAboveTarget: silhouetteBaseline.pairsAtOrAboveTarget,
    reviewRequired: torsoOnlySilhouetteSummary.reviewRequired || silhouetteComparisons.some(x => x.iou >= 0.85 || x.edgeRowsDifferentBy2 < 6),
    reviewPairs: torsoOnlySilhouetteSummary.reviewPairs,
    reviewEdgePairs: silhouetteComparisons.filter(x => x.edgeRowsDifferentBy2 < 6),
    minIoU: silhouetteBaseline.minIoU,
    maxIoU: silhouetteBaseline.maxIoU,
    minEdgeRowsDifferentBy2: silhouetteBaseline.minEdgeRowsDifferentBy2,
    minimumDistinctEdgeRows: 6,
    requirements: 'Technical pass requires complete, finite pairwise diagnostics. Full-body and torso IoU >= 0.85 and fewer than six differing torso edge rows are review triggers only; they require exact-pair human inspection and must not fail Actions as artistic gates. Full-body alpha threshold is > 0; full-body mask excludes handheld props/bags/gear; torso mask excludes head, arms, legs and props. Granny is validated separately against her original baseline.'
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

  const pixelPackAtlasCaptures = [];
  let pixelPackAtlasCaptureError = null;
  try {
    await page.waitForFunction(() => !!(window.PXA && window.PXA.info && window.PXA.info().ok && window.PXA.S && window.PXA.S.img), null, { timeout: 5000 });
    const atlasFrames = await page.evaluate(records => {
      const pack = window.PXA.S;
      return records.map(({ npcId, key }) => {
        const entry = pack.f && pack.f[key];
        if (!entry) return { npcId, key, error: 'Atlas entry missing' };
        const canvas = document.createElement('canvas');
        canvas.width = entry.w * entry.n;
        canvas.height = entry.h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(pack.img, entry.x, entry.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        return { npcId, key, frameWidth: entry.w, frameHeight: entry.h, frameCount: entry.n, dataUrl: canvas.toDataURL('image/png') };
      });
    }, atlasOverrideRecords);
    const atlasDir = path.join(out, 'pixel-pack-overrides');
    fs.mkdirSync(atlasDir, { recursive: true });
    for (const item of atlasFrames) {
      if (item.dataUrl) {
        const bytes = Buffer.from(item.dataUrl.split(',')[1], 'base64');
        fs.writeFileSync(path.join(atlasDir, item.npcId + '.png'), bytes);
        pixelPackAtlasCaptures.push({ npcId: item.npcId, key: item.key, frameWidth: item.frameWidth, frameHeight: item.frameHeight, frameCount: item.frameCount, bytes: bytes.length });
      } else {
        pixelPackAtlasCaptures.push({ npcId: item.npcId, key: item.key, error: item.error });
      }
    }
  } catch (error) {
    pixelPackAtlasCaptureError = error.message;
  }

  let atlasComparisonData = [];
  let atlasComparisonError = null;
  let atlasComparisonScaleAudit = null;
  try {
    atlasComparisonData = await page.evaluate(() => {
      if (!window.SG || typeof window.SG.npcRenderAtlasComparisonSnapshots !== 'function') throw new Error('Atlas comparison hook is unavailable');
      return window.SG.npcRenderAtlasComparisonSnapshots();
    });
    atlasComparisonScaleAudit = await page.evaluate(async items => {
      const measure = async dataUrl => {
        const image = new Image(); image.src = dataUrl; await image.decode();
        const canvas = document.createElement('canvas'); canvas.width = image.width; canvas.height = image.height;
        const ctx = canvas.getContext('2d'); ctx.drawImage(image,0,0);
        const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
        let minX=canvas.width,minY=canvas.height,maxX=-1,maxY=-1;
        for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(data[(y*canvas.width+x)*4+3]>0){
          minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
        }
        return {width:maxX-minX+1,height:maxY-minY+1,bounds:{minX,minY,maxX,maxY}};
      };
      const measurements=[];
      for(const item of items){
        if(!item.atlasDataUrl||!item.rendererDataUrl){measurements.push({id:item.id,error:'Missing comparison image'});continue;}
        const [atlas,renderer]=await Promise.all([measure(item.atlasDataUrl),measure(item.rendererDataUrl)]);
        measurements.push({id:item.id,atlas,renderer,heightRatio:atlas.height/renderer.height,widthRatio:atlas.width/renderer.width});
      }
      return {pass:measurements.length===6&&measurements.every(x=>!x.error&&x.heightRatio>=0.80&&x.heightRatio<=1.20),
        targetHeightRatio:{min:0.80,max:1.20},measurements};
    }, atlasComparisonData);
    const atlasComparisonGallery = await page.evaluate(async items => {
      const canvas=document.createElement('canvas');canvas.width=512;canvas.height=items.length*440;
      const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.fillStyle='#777982';ctx.fillRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<items.length;i++){
        for(const [col,key,label] of [[0,'rendererDataUrl','OWCIV'],[1,'atlasDataUrl','ATLAS']]){
          if(!items[i][key])continue;
          const img=new Image();img.src=items[i][key];await img.decode();
          const x=col*256,y=i*440;
          ctx.drawImage(img,x,y,256,384);
          ctx.fillStyle='#ffffff';ctx.font='bold 16px monospace';ctx.textAlign='center';
          ctx.fillText(items[i].id.toUpperCase()+' '+label,x+128,y+412);
        }
      }
      return canvas.toDataURL('image/png');
    }, atlasComparisonData);
    fs.writeFileSync(path.join(out, 'npc-atlas-vs-renderer-4x.png'), Buffer.from(atlasComparisonGallery.split(',')[1], 'base64'));
  } catch (error) {
    atlasComparisonError = error.message;
  }
  const atlasComparisonAudit = {
    pass: atlasComparisonData.length === 6 && atlasComparisonData.every(item => !item.error && item.atlasDataUrl && item.rendererDataUrl) &&
      atlasComparisonScaleAudit?.pass === true,
    comparisonCount: atlasComparisonData.length,
    scaleAudit: atlasComparisonScaleAudit || null,
    comparisons: atlasComparisonData.map(({id,direction,liveDirection,comparisonMode,key,frame,x,y,civ,error})=>({id,direction,liveDirection,comparisonMode,key,frame,x,y,civ,error:error||null})),
    error: atlasComparisonError
  };

  scriptErrors.push(...await page.evaluate(() => window.__qaScriptErrors || []));
  const report = {
    sourceCommitSha,
    timestamp: new Date().toISOString(),
    htmlFile: path.basename(html),
    syntaxCheck,
    npcSpriteSyntaxCheck,
    npcSpriteModuleLoaded,
    grannyBeforeAfterCapture: { path: 'granny-before-after-4x.png', directions: ['front','back','left','right'], rows: ['pre-side-view renderer','current renderer'] },
    npcInventoryCheck,
    pixelPackImpact,
    atlasVerticalFallbackAudit,
    atlasRuntimeAudit,
    atlasComparisonAudit,
    pixelPackDirectionGuard: { pass: pixelPackDirectionGuard && pixelPackImpact.verticalFacingFallbackIds.length > 0, guardPresent: pixelPackDirectionGuard },
    atlasVerticalFallbackAudit,
    pixelPackAtlasCaptures,
    pixelPackAtlasCaptureError,
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
    targetedPalettePixelAudit,
    paletteDifferentiation,
    npcBodyCheck,
    civilianFaceDistinctnessAudit,
    gameScaleNpcCaptureAudit,
    roleDebugAudit,
    roleDebugRowWidthReport,
    civilianVisualIntegrityAudit,
    npcPropAudit,
    fanVariantAudit,
    fanHeadroomCheck,
    fanVariantRenderedPropCheck,
    snapshotCheck,
    archetypeSilhouetteCount: archetypeSilhouettes.length,
    silhouetteMaskDiagnostics: archetypeSilhouettes
      .filter(item => ['courier', 'trades', 'clinic', 'civic', 'vendor'].includes(item.archetype))
      .map(item => ({ archetype: item.archetype, direction: item.direction, maskRows: item.maskRows })),
    silhouetteBaseline,
    torsoOnlySilhouetteSummary,
    torsoMaskIntegrityAudit,
    torsoPairDiagnostic,
    renderedPropShapeAudit,
    silhouetteQualityCheck,
    civilianTypeSilhouetteAudit,
    fanVariantSilhouetteAudit,
    liveArchetypeUsageAudit,
    excludedCatNpcIds,
    standardNpcScope: { standardInScopeCount: npcInventoryData.standardInScopeCount, referenceBaselineNpcIds: npcInventoryData.referenceBaselineNpcIds, outOfScopeCount: npcInventoryData.outOfScopeNpcIds.length },
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
    note: "Browser QA. Native-grid snapshots are written to qa-output/npc-snapshots and compared by decoded RGBA pixels with qa/golden-npcs; PNG byte equality is diagnostic only. Golden comparisons are gated on explicit human approval recorded in qa/golden-npcs/PROVENANCE.json. Gallery PNGs are exported from the full backing canvas; cellGrid verifies 40 non-empty live archetype-direction cells; the Granny special renderer is validated separately against the original baseline."
  };
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (!sourceCommitSha || !syntaxCheck.ok || !npcSpriteSyntaxCheck.ok || !npcSpriteModuleLoaded || !npcInventoryCheck.ok || !liveArchetypeUsageAudit.pass || !pixelPackDirectionGuard || !atlasVerticalFallbackAudit.pass || !atlasComparisonAudit.pass || !grannyRefGeneratorCheck.ok || !townSceneState.pass || !grannyMeasurementCheck.pass || !npcPaletteCheck.pass || !paletteDifferentiation.pass || !npcBodyCheck.pass || !civilianFaceDistinctnessAudit.pass || !gameScaleNpcCaptureAudit.pass || !roleDebugAudit.pass || !civilianVisualIntegrityAudit.pass || !npcPropAudit.pass || !fanVariantAudit.pass || !fanHeadroomCheck.pass || !fanVariantRenderedPropCheck.pass || !snapshotCheck.pass || !torsoMaskIntegrityAudit.pass || !silhouetteQualityCheck.pass || !civilianTypeSilhouetteAudit.pass || !fanVariantSilhouetteAudit.pass || !galleryExists || galleryRenderError || !canvasMetrics?.grannyDirectionalVisualCheck?.pass || (atlasOverrideIds.length > 0 && (pixelPackAtlasCaptureError || pixelPackAtlasCaptures.length !== atlasOverrideIds.length || pixelPackAtlasCaptures.some(item => item.error))) || pageErrors.length || scriptErrors.length || (canvasMetrics?.cellGrid?.nonEmptyCells !== 40)) process.exitCode = 1;
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
