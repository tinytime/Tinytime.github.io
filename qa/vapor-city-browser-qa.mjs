import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = path.join(root, 'VaporCity_HD2D_Hybrid_Test.html');
const out = path.join(root, 'qa-output');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const consoleErrors = [];
page.on('pageerror', e => consoleErrors.push(e.message));
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

try {
  await page.goto('file://' + html, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1500);
  const mainScreenshot = path.join(out, 'game-1x.png');
  await page.screenshot({ path: mainScreenshot, fullPage: true });

  const galleryToggle = page.locator('#owNpcGalleryToggle');
  if (await galleryToggle.count()) {
    await galleryToggle.click();
    await page.waitForTimeout(500);
  }
  const galleryCanvas = page.locator('#owNpcGalleryCanvas');
  const galleryExists = await galleryCanvas.count() > 0;
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
    // CSS enlargement screenshot for visual inspection; pixelated artwork remains nearest-neighbor.
    await galleryCanvas.evaluate(c => { c.style.width = (c.clientWidth * 4) + 'px'; c.style.maxWidth = 'none'; });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(out, 'npc-gallery-4x.png'), fullPage: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    htmlFile: path.basename(html),
    pageTitle: await page.title(),
    galleryFound: galleryExists,
    canvasMetrics,
    consoleErrors,
    note: 'This first pass is a browser smoke test and gallery-canvas summary, not per-NPC pixel measurements or a quality PASS.'
  };
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (!galleryExists) process.exitCode = 1;
} finally {
  await browser.close();
}
