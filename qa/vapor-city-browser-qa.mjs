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
  await page.screenshot({ path: path.join(out, 'game-1x.png'), fullPage: true });

  // The game can launch on a menu/settings screen. Navigate only when the button is visible.
  const backToTown = page.getByRole('button', { name: /back to town/i });
  let navigatedToTown = false;
  if (await backToTown.count() && await backToTown.first().isVisible()) {
    await backToTown.first().click({ timeout: 5000 });
    await page.waitForTimeout(1500);
    navigatedToTown = true;
  }

  const galleryToggle = page.locator('#owNpcGalleryToggle');
  const galleryToggleVisible = await galleryToggle.count() > 0 && await galleryToggle.isVisible();
  let galleryOpened = false;
  if (galleryToggleVisible) {
    await galleryToggle.click({ timeout: 5000 });
    await page.waitForTimeout(500);
    galleryOpened = true;
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
    galleryCanvas.evaluate(c => { c.style.width = (c.clientWidth * 4) + 'px'; c.style.maxWidth = 'none'; });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(out, 'npc-gallery-4x.png'), fullPage: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    htmlFile: path.basename(html),
    pageTitle: await page.title(),
    navigatedToTown,
    galleryToggleVisible,
    galleryOpened,
    galleryFound: galleryExists,
    canvasMetrics,
    consoleErrors,
    note: 'Smoke test captures the game page and checks whether the NPC gallery is reachable. Canvas summary is sampled, not per-NPC measurement; this is not a visual-quality PASS.'
  };
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
