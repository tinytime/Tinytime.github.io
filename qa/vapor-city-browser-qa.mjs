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
  const npcPaletteCheck = {
    pass: npcPaletteAudit.length === 23 && npcPaletteAudit.every(item => item.uniqueColorCount <= 12),
    spriteCount: npcPaletteAudit.length,
    maxUniqueColors: Math.max(...npcPaletteAudit.map(item => item.uniqueColorCount)),
    overLimit: npcPaletteAudit.filter(item => item.uniqueColorCount > 12)
  };

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
  // The legacy outlinePixelCount field is based on a single fixed dark swatch
  // (#0E0B0A), but civilian outline colors are role-specific. Treat that count
  // as diagnostic only; validate the actual per-sprite outlineColor contract
  // and its contrast against the gallery background instead of requiring the
  // unrelated fixed swatch to occur in every render.
  const npcBodyCheck = {
    pass: bodyRows.length === 24 && bodyRows.every(item => item.heightDeviationPixels <= 1 &&
      item.baselineDelta <= 0.02 && /^#[0-9a-f]{6}$/i.test(item.outlineColor || '') &&
      item.outlinePixelCount > 0 && item.contrastRatio >= 1.3 && item.outlineContrastPercent >= 0.30),
    spriteCount: bodyRows.length,
    expectedBodyHeightPixels: expectedBodyPixels,
    maxHeightDeviationPixels: Math.max(...bodyRows.map(item=>item.heightDeviationPixels)),
    maxBaselineDelta: Math.max(...bodyRows.map(item=>item.baselineDelta)),
    invalidOutlineColor: bodyRows.filter(item=>!/^#[0-9a-f]{6}$/i.test(item.outlineColor || '')).map(item=>item.civ),
    lowContrast: bodyRows.filter(item=>item.contrastRatio<1.3||item.outlineContrastPercent<0.30).map(item=>({civ:item.civ,outlineColor:item.outlineColor,contrastRatio:item.contrastRatio,outlineContrastPercent:item.outlineContrastPercent})),
    outlinePixelCounts: bodyRows.map(item=>({civ:item.civ,count:item.outlinePixelCount,expectedColor:item.outlineColor})),
    outlineValidation: 'Counts rendered pixels matching each sprite’s computed per-civ outline color and verifies contrast against the gallery background.',
    measurements: bodyRows
  };
  const npcPropAudit = await page.evaluate(() => {
    const {ARCHETYPES,ARCHETYPE_PROP_LAYERS,ARCHETYPE_PROP_SHAPES,PROP_ROLE_COLORS,ARCHETYPE_ACCESSORY_ROLES}=window.NPC_SPRITES.TABLES;
    const names=Object.keys(ARCHETYPES);
    const frontTypes=names.map(name=>({archetype:name,type:ARCHETYPES[name].prop.front.type}));
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
    return {pass:duplicateTypes.length===0&&duplicateColors.length===0&&duplicateShapes.length===0&&missingRoleColors.length===0&&nonRectangularShapeCount>=14,
      archetypeCount:names.length,frontTypes,propColors,shapeRows,footprintCount:footprints.length,
      duplicateTypes,duplicateColors,duplicateShapes,missingRoleColors,rectangularShapes,nonRectangularShapeCount,footprints};
  });

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
  const baselineRefreshPending = fs.existsSync(path.join(root, 'qa', 'update-goldens.flag'));
  const allSnapshotsMatch = snapshotResults.length === 24 && snapshotResults.every(item => item.status === 'match');
  const snapshotCheck = {
    // A committed one-time flag authorizes a deliberate baseline refresh.
    // Otherwise all 24 native-grid renders must match byte-for-byte.
    pass: snapshotResults.length === 24 && (baselineRefreshPending || allSnapshotsMatch),
    baselineRefreshPending,
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
  const fanVariantSignatures = fanVariantData.map(fan => [...fan.colors].sort().join('|'));
  const fanVariantAudit = {
    pass: fanVariantData.length === 20 && new Set(fanVariantSignatures).size === 20 &&
      fanVariantData.every(fan => fan.uniqueColorCount <= 12),
    count: fanVariantData.length,
    uniqueLooks: new Set(fanVariantSignatures).size,
    maxUniqueColors: Math.max(...fanVariantData.map(fan => fan.uniqueColorCount)),
    fans: fanVariantData.map(({id,uniqueColorCount,colors})=>({id,uniqueColorCount,colors}))
  };

  const catSnapshotData = await page.evaluate(() => {
    if (!window.SG || typeof window.SG.npcRenderCatSnapshots !== 'function') throw new Error('Cat render snapshot hook is unavailable');
    return window.SG.npcRenderCatSnapshots();
  });
  const catSnapshotDir = path.join(out, 'npc-cats');
  fs.mkdirSync(catSnapshotDir, { recursive: true });
  for (const cat of catSnapshotData) {
    fs.writeFileSync(path.join(catSnapshotDir, cat.id + '.png'), Buffer.from(cat.dataUrl.split(',')[1], 'base64'));
  }
  const catGalleryDataUrl = await page.evaluate(async cats => {
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=320;
    const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.fillStyle='#777982';ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<cats.length;i++){
      const img=new Image();img.src=cats[i].dataUrl;await img.decode();
      ctx.drawImage(img,i*256,0,256,256);
      ctx.fillStyle='#ffffff';ctx.font='bold 18px monospace';ctx.textAlign='center';ctx.fillText(cats[i].id.toUpperCase(),i*256+128,292);
    }
    return canvas.toDataURL('image/png');
  }, catSnapshotData);
  fs.writeFileSync(path.join(out, 'npc-cats-4x.png'), Buffer.from(catGalleryDataUrl.split(',')[1], 'base64'));
  const catArtAudit = {
    pass: catSnapshotData.length === 4 && catSnapshotData.every(cat => cat.opaquePixelCount >= 100 && cat.uniqueColorCount >= 4 &&
      cat.bounds.width > 0 && cat.bounds.height > 0),
    catCount: catSnapshotData.length,
    cats: catSnapshotData.map(({id,direction,opaquePixelCount,uniqueColorCount,bounds})=>({id,direction,opaquePixelCount,uniqueColorCount,bounds}))
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
  const silhouetteComparisons = [];
  for (const direction of ['d', 'u', 'l', 'r']) {
    const view = archetypeSilhouettes.filter(item => item.direction === direction);
    for (let i = 0; i < view.length; i++) for (let j = i + 1; j < view.length; j++) {
      let intersection = 0, union = 0, torsoIntersection = 0, torsoUnion = 0, edgeRowsDifferentBy2 = 0;
      for (let y = 0; y < 96; y++) {
        let leftA = 64, rightA = -1, leftB = 64, rightB = -1;
        for (let x = 0; x < 64; x++) {
          const a = view[i].maskRows[y][x] === '1', b = view[j].maskRows[y][x] === '1';
          if (a && b) intersection++;
          if (a || b) union++;
          // Torso-only diagnostic excludes shared head and leg mass so those
          // regions cannot make otherwise similar bodies look more distinct.
          if (y >= 20 && y < 58) {
            if (a && b) torsoIntersection++;
            if (a || b) torsoUnion++;
          }
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
    basis: 'Rows 20–57 only; excludes shared head and leg regions. Props remain excluded.',
    targetIoU: 0.85,
    minIoU: silhouetteBaseline.minTorsoOnlyIoU,
    maxIoU: silhouetteBaseline.maxTorsoOnlyIoU,
    meanIoU: silhouetteBaseline.meanTorsoOnlyIoU,
    pairsBelowTarget: silhouetteComparisons.filter(x => x.torsoOnlyIou < 0.85).length,
    pairsAtOrAboveTarget: silhouetteComparisons.filter(x => x.torsoOnlyIou >= 0.85).length,
    pass: silhouetteComparisons.length === 180 && silhouetteComparisons.every(x => x.torsoOnlyIou < 0.85),
    failingPairs: silhouetteComparisons.filter(x => x.torsoOnlyIou >= 0.85).sort((a,b)=>b.torsoOnlyIou-a.torsoOnlyIou),
    closestPairs: [...silhouetteComparisons].sort((a, b) => b.torsoOnlyIou - a.torsoOnlyIou).slice(0, 10),
    lowestOverlapPairs: [...silhouetteComparisons].sort((a, b) => a.torsoOnlyIou - b.torsoOnlyIou).slice(0, 10)
  };

  const silhouetteQualityCheck = {
    // Reject trivial one-row edge edits: a distinct body silhouette must
    // hold its contour difference across at least six torso/head scanlines.
    pass: silhouetteBaseline.pairCount === 180 &&
      silhouetteBaseline.pairsBelowTarget === silhouetteBaseline.pairCount &&
      silhouetteBaseline.pairsAtOrAboveTarget === 0 &&
      silhouetteBaseline.minEdgeRowsDifferentBy2 >= 6 &&
      torsoOnlySilhouetteSummary.pass,
    pairCount: silhouetteBaseline.pairCount,
    pairsBelowTarget: silhouetteBaseline.pairsBelowTarget,
    pairsAtOrAboveTarget: silhouetteBaseline.pairsAtOrAboveTarget,
    failingOverlapPairs: silhouetteComparisons.filter(x => x.iou >= 0.85),
    failingTorsoOnlyPairs: torsoOnlySilhouetteSummary.failingPairs,
    failingEdgePairs: silhouetteComparisons.filter(x => x.edgeRowsDifferentBy2 < 6),
    minIoU: silhouetteBaseline.minIoU,
    maxIoU: silhouetteBaseline.maxIoU,
    minEdgeRowsDifferentBy2: silhouetteBaseline.minEdgeRowsDifferentBy2,
    minimumDistinctEdgeRows: 6,
    requirements: 'All 180 pairs across ten live owCiv archetypes must have IoU < 0.85 in all four directions; every pair must differ by at least 2 px across at least six torso/head edge rows. Granny is validated separately against her original baseline.'
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
      return {pass:measurements.length===4&&measurements.every(x=>!x.error&&x.heightRatio>=0.80&&x.heightRatio<=1.20),
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
    pass: atlasComparisonData.length === 4 && atlasComparisonData.every(item => !item.error && item.atlasDataUrl && item.rendererDataUrl) &&
      atlasComparisonScaleAudit?.pass === true,
    comparisonCount: atlasComparisonData.length,
    scaleAudit: atlasComparisonScaleAudit || null,
    comparisons: atlasComparisonData.map(({id,direction,key,frame,x,y,civ,error})=>({id,direction,key,frame,x,y,civ,error:error||null})),
    error: atlasComparisonError
  };

  scriptErrors.push(...await page.evaluate(() => window.__qaScriptErrors || []));
  const report = {
    timestamp: new Date().toISOString(),
    htmlFile: path.basename(html),
    syntaxCheck,
    npcSpriteSyntaxCheck,
    npcSpriteModuleLoaded,
    grannyBeforeAfterCapture: { path: 'granny-before-after-4x.png', directions: ['front','back','left','right'], rows: ['pre-side-view renderer','current renderer'] },
    npcInventoryCheck,
    pixelPackImpact,
    atlasRuntimeAudit,
    atlasComparisonAudit,
    pixelPackDirectionGuard: { pass: pixelPackDirectionGuard && pixelPackImpact.verticalFacingFallbackIds.length > 0, guardPresent: pixelPackDirectionGuard },
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
    paletteDifferentiation,
    npcBodyCheck,
    npcPropAudit,
    catArtAudit,
    fanVariantAudit,
    snapshotCheck,
    archetypeSilhouetteCount: archetypeSilhouettes.length,
    silhouetteMaskDiagnostics: archetypeSilhouettes
      .filter(item => ['courier', 'trades', 'clinic', 'civic', 'vendor'].includes(item.archetype))
      .map(item => ({ archetype: item.archetype, direction: item.direction, maskRows: item.maskRows })),
    silhouetteBaseline,
    torsoOnlySilhouetteSummary,
    renderedPropShapeAudit,
    silhouetteQualityCheck,
    liveArchetypeUsageAudit,
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
    note: "Browser QA. Native-grid snapshots are written to qa-output/npc-snapshots and compared byte-for-byte with qa/golden-npcs. Gallery PNGs are exported from the full backing canvas; cellGrid verifies 40 non-empty live archetype-direction cells; the Granny special renderer is validated separately against the original baseline."
  };
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (!syntaxCheck.ok || !npcSpriteSyntaxCheck.ok || !npcSpriteModuleLoaded || !npcInventoryCheck.ok || !liveArchetypeUsageAudit.pass || !pixelPackDirectionGuard || !atlasComparisonAudit.pass || !grannyRefGeneratorCheck.ok || !townSceneState.pass || !grannyMeasurementCheck.pass || !npcPaletteCheck.pass || !paletteDifferentiation.pass || !npcBodyCheck.pass || !npcPropAudit.pass || !catArtAudit.pass || !fanVariantAudit.pass || !snapshotCheck.pass || !silhouetteQualityCheck.pass || !galleryExists || galleryRenderError || !canvasMetrics?.grannyDirectionalVisualCheck?.pass || (atlasOverrideIds.length > 0 && (pixelPackAtlasCaptureError || pixelPackAtlasCaptures.length !== atlasOverrideIds.length || pixelPackAtlasCaptures.some(item => item.error))) || pageErrors.length || scriptErrors.length || (canvasMetrics?.cellGrid?.nonEmptyCells !== 40)) process.exitCode = 1;
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
