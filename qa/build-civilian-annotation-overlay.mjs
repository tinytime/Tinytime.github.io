// Render semantic annotation candidates over the exact native captures from browser QA.
// Red = anatomical body polygon; blue = headwear exclusion; yellow = prop exclusion;
// green = anatomical landmarks; magenta = Runner's pose-aware joints.
// This is a review aid, not an annotation approval or pixel-perfect mask validator.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const out = path.join(root, 'qa-output');
const captureDir = path.join(out, 'npc-type-directions');
const manifestPath = path.join(root, 'qa', 'civilian-anatomy-landmarks.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const characters = ['usher', 'cook', 'courier', 'runner', 'coach', 'referee'];
const captureKey = { referee: 'ref' };
const directions = ['front', 'back', 'left', 'right'];
const captures = [];
const missing = [];

for (const id of characters) {
  const record = manifest.characters[id];
  for (const direction of directions) {
    const key = captureKey[id] || id;
    const file = path.join(captureDir, key + '-' + direction + '.png');
    if (!fs.existsSync(file)) {
      missing.push(id + '/' + direction);
      continue;
    }
    const d = record?.directions?.[direction];
    if (!d) {
      missing.push(id + '/' + direction + ' (annotation)');
      continue;
    }
    captures.push({
      id, direction,
      dataUrl: 'data:image/png;base64,' + fs.readFileSync(file).toString('base64'),
      annotation: d
    });
  }
}

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  const result = await page.evaluate(async ({ captures }) => {
    const cellW = 256, cellH = 420, pad = 18, cols = 4;
    const rows = Math.ceil(captures.length / cols);
    const canvas = document.createElement('canvas');
    canvas.width = pad + cols * (cellW + pad);
    canvas.height = pad + rows * (cellH + pad);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#292b35';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const colors = { body: '#ff3535', headwear: '#39a8ff', props: '#ffd21a', points: '#35f27c', joints: '#f05bff' };
    for (let i = 0; i < captures.length; i++) {
      const item = captures[i];
      const image = new Image();
      image.src = item.dataUrl;
      await image.decode();
      const x = pad + (i % cols) * (cellW + pad);
      const y = pad + Math.floor(i / cols) * (cellH + pad);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 17px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(item.id.toUpperCase() + ' / ' + item.direction.toUpperCase(), x, y + 20);
      ctx.fillStyle = '#777982';
      ctx.fillRect(x, y + 32, cellW, 384);
      ctx.drawImage(image, x, y + 32, 256, 384);

      const sx = 256 / 100, sy = 384 / 140;
      const px = p => [x + p.x * sx, y + 32 + p.y * sy];
      const polygon = (points, color) => {
        if (!Array.isArray(points) || points.length < 3) return;
        ctx.beginPath();
        points.forEach((p, index) => {
          const [xx, yy] = px(p);
          if (index === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
        });
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      };
      polygon(item.annotation.bodyPolygon, colors.body);
      for (const p of item.annotation.headwearPolygons || []) polygon(p, colors.headwear);
      for (const p of item.annotation.propPolygons || []) polygon(p, colors.props);

      const pointKeys = ['shoulderLeft', 'shoulderRight'];
      for (const key of pointKeys) {
        const point = item.annotation[key];
        if (!point) continue;
        const [xx, yy] = px(point);
        ctx.beginPath(); ctx.arc(xx, yy, 4, 0, Math.PI * 2);
        ctx.fillStyle = colors.points; ctx.fill();
      }
      const joint = item.annotation.joints;
      if (joint) {
        for (const point of Object.values(joint)) {
          const [xx, yy] = px(point);
          ctx.beginPath(); ctx.arc(xx, yy, 3, 0, Math.PI * 2);
          ctx.fillStyle = colors.joints; ctx.fill();
        }
      }
      const baselineY = y + 32 + item.annotation.footBaseline * sy;
      ctx.beginPath(); ctx.moveTo(x, baselineY); ctx.lineTo(x + 256, baselineY);
      ctx.strokeStyle = 'rgba(255,255,255,.65)'; ctx.lineWidth = 1; ctx.stroke();
    }
    return { dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height };
  }, { captures });

  fs.writeFileSync(path.join(out, 'six-civilian-annotation-overlay.png'),
    Buffer.from(result.dataUrl.split(',')[1], 'base64'));
  const summary = {
    sourceCommit: process.env.GITHUB_SHA || null,
    annotationSourceCommit: Object.values(manifest.characters).find(x => x.annotationProvenance)?.annotationProvenance.sourceCommit || null,
    characterCount: characters.length,
    expectedCaptures: characters.length * directions.length,
    renderedCaptures: captures.length,
    missing,
    overlay: 'six-civilian-annotation-overlay.png',
    dimensions: { width: result.width, height: result.height },
    status: 'candidate_visual_review_required',
    legend: colors
  };
  fs.writeFileSync(path.join(out, 'six-civilian-annotation-overlay-summary.json'), JSON.stringify(summary, null, 2) + '\n');
  console.log(JSON.stringify(summary));
} finally {
  await browser.close();
}
