import { chromium } from 'playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = process.cwd();
const sourcePath = resolve(root, 'project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg');
const outputPath = resolve(root, 'project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-ROUND-05-3X.png');
const svg = await readFile(sourcePath, 'utf8');

const svgOpen = svg.match(/<svg\\b([^>]*)>/s)?.[1];
const widthText = svgOpen?.match(/\\bwidth=["'](\\d+)["']/)?.[1];
const heightText = svgOpen?.match(/\\bheight=["'](\\d+)["']/)?.[1];
const viewBox = svgOpen?.match(/\\bviewBox=["']([^"']+)["']/)?.[1];
if (!widthText || !heightText || !viewBox) throw new Error('Could not validate SVG width, height and viewBox.');
const width = Number(widthText);
const height = Number(heightText);
if (width !== 1600 || height !== 1180 || viewBox.trim() !== '0 0 1600 1180') {
  throw new Error(`Unexpected source SVG geometry: ${width}x${height}, viewBox=${viewBox}`);
}
const scale = 3;
const outputWidth = width * scale;
const outputHeight = height * scale;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: outputWidth, height: outputHeight },
    deviceScaleFactor: 1,
    colorScheme: 'light'
  });
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
  await page.setContent(`<!doctype html><html><head><style>html,body{margin:0;padding:0;width:${outputWidth}px;height:${outputHeight}px;overflow:hidden;background:#f3f1eb}img{display:block;width:${outputWidth}px;height:${outputHeight}px}</style></head><body><img id="sheet" src="${dataUri}" width="${outputWidth}" height="${outputHeight}"></body></html>`, { waitUntil: 'load' });
  await page.locator('#sheet').evaluate(img => img.decode());
  const imageInfo = await page.locator('#sheet').evaluate(img => ({
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    complete: img.complete
  }));
  if (!imageInfo.complete || imageInfo.naturalWidth !== width || imageInfo.naturalHeight !== height) {
    throw new Error(`SVG image did not load as expected: ${JSON.stringify(imageInfo)}`);
  }
  await mkdir(dirname(outputPath), { recursive: true });
  const png = await page.locator('#sheet').screenshot({ type: 'png', animations: 'disabled' });
  if (png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Screenshot output is not a PNG.');
  await writeFile(outputPath, png);
  const dimensionsFromPng = await page.evaluate(async () => {
    const img = new Image();
    img.src = document.querySelector('#sheet').src;
    await img.decode();
    return { cssWidth: document.querySelector('#sheet').clientWidth, cssHeight: document.querySelector('#sheet').clientHeight };
  });
  console.log(JSON.stringify({
    source: 'project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg',
    output: 'project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-ROUND-05-3X.png',
    scale,
    pngWidth: outputWidth,
    pngHeight: outputHeight,
    sourceViewBox: viewBox,
    imageInfo,
    dimensionsFromPng,
    bytes: png.length
  }, null, 2));
} finally {
  await browser.close();
}
