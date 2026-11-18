import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

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
  await page.goto('file://' + html, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1200);
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
  if (galleryExists) {
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
    await page.screenshot({ path: path.join(out, 'npc-gallery-1x.png'), fullPage: true });
    await galleryCanvas.evaluate(c => { c.style.width = (c.clientWidth * 4) + 'px'; c.style.maxWidth = 'none'; });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(out, 'npc-gallery-4x.png'), fullPage: true });
  }

  scriptErrors.push(...await page.evaluate(() => window.__qaScriptErrors || []));
  const report = {
    timestamp: new Date().toISOString(),
    htmlFile: path.basename(html),
    syntaxCheck,
    pageTitle: await page.title(),
    townButtonVisible,
    townClickAttempted,
    townClickError,
    worldState,
    galleryState,
    galleryToggleVisible,
    galleryOpened,
    galleryClickError,
    galleryFound: galleryExists,
    canvasMetrics,
    scriptErrors,
    pageErrors,
    consoleErrors,
    note: 'Browser smoke test. Script error event includes filename/line/column when Chromium provides it. Canvas summary is sampled, not per-NPC measurement or a visual-quality PASS.'
  };
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
