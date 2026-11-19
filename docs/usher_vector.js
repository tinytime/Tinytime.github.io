// Usher drawn the way Granny is drawn: vector paths + gradients on the same 100x140 source grid,
// same anchor, same scale rule, same ink colour. PROPOSED art, not wired into the game.
window.drawUsherVector = function (n, dir, ctx, OWT, opts) {
  opts = opts || {};
  const g = ctx, scale = OWT / 36 * .28;
  const sx = n.x * OWT + OWT / 2, sy = n.y * OWT + OWT - 5;
  const back = dir === 'u', side = dir === 'l' || dir === 'r', facingLeft = dir === 'l';
  g.save(); g.translate(sx, sy); g.scale(scale, scale); g.translate(-50, -137);
  if (facingLeft) { g.translate(50, 0); g.scale(-1, 1); g.translate(-50, 0); }
  const ink = '#171725', skin = '#C98A62', pink = '#FF2FA8', pinkHi = '#FF8ACB', pinkLo = '#A91D77';
  const path = (pts, fill, stroke = ink, lw = 1.6) => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); g.fillStyle = fill; g.fill(); if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.lineJoin = 'round'; g.stroke(); } };
  const grad = (x1, y1, x2, y2, stops) => { const z = g.createLinearGradient(x1, y1, x2, y2); for (const [p, c] of stops) z.addColorStop(p, c); return z; };
  const line = (pts, color, width = 2) => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.strokeStyle = color; g.lineWidth = width; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); };
  const jacketG = (x1, x2) => grad(x1, 50, x2, 98, [[0, '#B08AD8'], [.4, '#7551A0'], [1, '#3A2658']]);
  const pantsL = grad(36, 93, 48, 130, [[0, '#9C94CC'], [.5, '#5A5290'], [1, '#2A2450']]);
  const pantsR = grad(52, 93, 64, 130, [[0, '#8880BC'], [.5, '#4A4380'], [1, '#221D46']]);
  const sleeveG = (x1, x2) => grad(x1, 54, x2, 86, [[0, '#C09CE4'], [.5, '#7E5AA6'], [1, '#3F2A5E']]);
  const shoe = '#2B2340';
  const ell = (cx, cy, rx, ry, fill, stroke = ink, lw = 1.6, rot = 0) => { g.beginPath(); g.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); g.fillStyle = fill; g.fill(); if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); } };
  const board = (x, y, w, h, face) => {
    path([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], face ? '#EDE8D8' : grad(x, y, x + w, y + h, [[0, '#D89A5A'], [1, '#8F5B33']]), ink, 1.4);
    if (face) { for (let i = 0; i < 4; i++) line([[x + 2, y + 5 + i * 4], [x + w - 2, y + 5 + i * 4]], '#7F7392', 1); }
    path([[x + w * .28, y - 3], [x + w * .72, y - 3], [x + w * .72, y + 3], [x + w * .28, y + 3]], '#C6D3E0', ink, 1.2);
  };
  const cap = (cx, front) => {
    // flat usher cap: dome, pink band, small badge
    g.beginPath(); g.moveTo(cx - 15, 23); g.quadraticCurveTo(cx - 16, 8, cx, 8); g.quadraticCurveTo(cx + 16, 8, cx + 15, 23); g.closePath();
    g.fillStyle = grad(cx - 15, 8, cx + 15, 23, [[0, '#B08AD8'], [.6, '#7551A0'], [1, '#3A2658']]); g.fill(); g.strokeStyle = ink; g.lineWidth = 1.8; g.stroke();
    line([[cx - 14, 22], [cx, 24], [cx + 14, 22]], pink, 3.2);
    line([[cx - 9, 12], [cx - 2, 10]], '#A58CC4', 1.2);
    if (front) { path([[cx - 4, 14], [cx + 4, 14], [cx + 3, 20], [cx, 21], [cx - 3, 20]], pinkHi, ink, 1); }
  };
  const hairG = grad(34, 14, 64, 46, [[0, '#4A3C4E'], [.5, '#241B26'], [1, '#14101A']]);

  // ---------------- legs & shoes ----------------
  if (!side) {
    path([[38, 93], [49, 93], [48, 108], [47, 120], [47, 130], [37, 130], [38, 120], [38, 108]], pantsL, ink, 1.4);
    path([[51, 93], [62, 93], [62, 108], [62, 120], [63, 130], [53, 130], [52, 120], [51, 108]], pantsR, ink, 1.4);
    line([[41, 104], [44, 104]], '#1D1936', 1); line([[56, 104], [59, 104]], '#1D1936', 1);
    path([[36, 130], [47, 130], [49, 133], [49, 136], [35, 136], [34, 133]], shoe, ink, 1.4);
    path([[53, 130], [64, 130], [66, 133], [66, 136], [52, 136], [52, 133]], shoe, ink, 1.4);
    line([[36, 135], [48, 135]], '#120F20', 1); line([[54, 135], [65, 135]], '#120F20', 1);
    line([[37, 131], [43, 131]], '#6A6290', 1); line([[54, 131], [60, 131]], '#6A6290', 1);
  } else {
    // back leg (darker), then front leg; both face right
    path([[40, 93], [50, 93], [49, 108], [47, 120], [46, 130], [37, 130], [38, 120], [39, 108]], grad(38, 93, 50, 130, [[0, '#4C4676'], [1, '#17132C']]), ink, 1.4);
    path([[37, 130], [47, 130], [52, 133], [53, 136], [36, 136]], '#221B36', ink, 1.4);
    path([[46, 93], [57, 93], [57, 108], [58, 120], [59, 130], [49, 130], [48, 120], [47, 108]], pantsL, ink, 1.4);
    path([[48, 130], [59, 130], [65, 133], [66, 136], [47, 136], [47, 133]], shoe, ink, 1.4);
    line([[49, 135], [65, 135]], '#120F20', 1); line([[50, 131], [56, 131]], '#6A6290', 1);
  }

  // ---------------- upper body ----------------
  if (!side) {
    // neck
    path([[44, 40], [55, 40], [56, 50], [43, 50]], back ? '#A8704F' : '#B97F5C', ink, 1.4);
    // jacket
    path([[35, 53], [43, 48], [57, 48], [65, 53], [67, 62], [66, 84], [68, 99], [32, 99], [34, 84], [33, 62]], jacketG(33, 67), ink, 1.8);
    if (!back) {
      // collar V + lapels
      path([[43, 48], [50, 60], [57, 48], [55, 47], [50, 54], [45, 47]], skin, null);
      path([[40, 50], [49, 62], [46, 66], [38, 55]], '#6F538F', ink, 1.2);
      path([[60, 50], [51, 62], [54, 66], [62, 55]], '#3E2B58', ink, 1.2);
      line([[41, 52], [48, 61]], pink, 2.4); line([[59, 52], [52, 61]], pink, 2.4);
      line([[50, 62], [50, 98]], '#241632', 1.5);
      [72, 82, 92].forEach(y => { ell(50, y, 1.3, 1.3, '#FFD0EE', null); });
      // name badge
      path([[38, 65], [48, 65], [48, 73], [38, 73]], '#FFE1F4', ink, 1.2); line([[40, 69], [46, 69]], pinkLo, 2);
      // hem trim
      line([[34, 97], [50, 99], [66, 97]], pink, 3);
      // hanging right arm (viewer-left)
      path([[33, 55], [38, 54], [37, 72], [36, 88], [30, 88], [31, 72]], sleeveG(30, 38), ink, 1.4);
      line([[30.5, 85], [36.5, 85]], pink, 3);
      path([[30, 88], [36, 88], [36, 94], [30, 94]], skin, ink, 1.2);
      // bent left arm (viewer-right) holding clipboard
      path([[62, 54], [67, 55], [69, 68], [66, 80], [58, 82], [57, 76], [62, 74], [63, 66]], sleeveG(57, 69), ink, 1.4);
      board(50, 60, 15, 19, true);
      path([[50, 74], [60, 74], [61, 82], [51, 83]], sleeveG(50, 61), ink, 1.3);
      line([[50.5, 79], [58, 80]], pink, 3);
      ell(48, 78, 3.4, 3.2, skin, ink, 1.3);
    } else {
      // back: yoke, centre seam, short coat tail
      path([[34, 54], [43, 49], [57, 49], [66, 54], [65, 66], [35, 66]], '#5E4380', ink, 1.2);
      line([[50, 52], [50, 98]], '#241632', 1.6);
      line([[34, 97], [50, 99], [66, 97]], pink, 3);
      path([[39, 99], [49, 99], [49, 109], [44, 111], [39, 108]], '#2F1F42', ink, 1.3);
      path([[51, 99], [61, 99], [61, 108], [56, 111], [51, 109]], '#3A2850', ink, 1.3);
      // viewer-left = character's left arm (clipboard hand hidden in front)
      path([[33, 55], [38, 54], [38, 70], [36, 82], [30, 80], [31, 68]], sleeveG(30, 38), ink, 1.4);
      line([[30.5, 78], [36.5, 80]], pink, 3);
      // viewer-right = character's right arm, hanging, hand visible
      path([[62, 54], [67, 55], [69, 72], [70, 88], [64, 88], [63, 72]], sleeveG(62, 70), ink, 1.4);
      line([[64, 85], [70, 85]], pink, 3);
      path([[64, 88], [70, 88], [70, 94], [64, 94]], skin, ink, 1.2);
    }
  } else {
    // side (facing right)
    path([[44, 40], [54, 40], [55, 50], [43, 50]], '#B97F5C', ink, 1.4);
    path([[43, 53], [49, 48], [57, 50], [61, 56], [60, 84], [62, 99], [38, 99], [41, 84], [40, 60]], grad(40, 50, 62, 98, [[0, '#B08AD8'], [.45, '#7551A0'], [1, '#3A2658']]), ink, 1.8);
    line([[39, 97], [50, 99], [61, 97]], pink, 3);
    path([[38, 94], [43, 96], [41, 105], [37, 101]], '#2F1F42', ink, 1.2);   // short rear tail
    line([[56, 56], [57, 96]], '#241632', 1.3);
    ell(57, 74, 1.2, 1.2, '#FFD0EE', null); ell(57, 84, 1.2, 1.2, '#FFD0EE', null);
    // clipboard held in front (back of board visible), far hand under it
    board(58, 62, 8, 17, false);
    ell(61, 80, 2.4, 2.2, skin, ink, 1.2);
    // near arm hanging
    path([[45, 54], [52, 54], [52, 72], [51, 88], [45, 88], [45, 72]], sleeveG(45, 52), ink, 1.4);
    line([[45.5, 85], [51.5, 85]], pink, 3);
    path([[45, 88], [51, 88], [51, 94], [45, 94]], skin, ink, 1.2);
  }

  // ---------------- head ----------------
  if (!side) {
    if (!back) {
      ell(49, 30, 12.5, 15, grad(37, 18, 61, 44, [[0, '#E2AC85'], [.5, skin], [1, '#8F5A45']]), ink, 1.8, -.06);
      // hair sides + fringe under cap
      path([[36, 24], [35, 40], [39, 46], [40, 30]], hairG, ink, 1.4); path([[62, 24], [63, 40], [59, 46], [58, 30]], hairG, ink, 1.4);
      ell(43.5, 31, 1.9, 2.4, '#171725', null); ell(55.5, 31, 1.9, 2.4, '#171725', null);
      ell(44.2, 30.2, .6, .6, '#FFFFFF', null); ell(56.2, 30.2, .6, .6, '#FFFFFF', null);
      line([[40.5, 26.5], [46, 26]], '#3A2418', 1.3); line([[53, 26], [58.5, 26.5]], '#3A2418', 1.3);
      line([[49, 33], [48.2, 36.5], [50.4, 36.5]], '#9A5E45', 1);
      line([[45.5, 40.5], [49, 42], [52.5, 40.5]], '#7A3F3A', 1.3);
      // visor
      path([[37, 24], [61, 24], [64, 27], [49, 30], [34, 27]], '#2A1A3A', ink, 1.4);
      line([[38, 25.5], [60, 25.5]], '#7B5C9E', .9);
      cap(49, true);
    } else {
      ell(49, 30, 13, 15.5, hairG, ink, 1.8);
      line([[40, 27], [44, 37], [49, 40], [55, 36], [59, 27]], '#4A3C4E', 1.2);
      cap(49, false);
      path([[44, 44], [55, 44], [54, 49], [45, 49]], '#B97F5C', null);
      ctxNoop();
    }
  } else {
    // profile, facing right
    ell(49, 30, 11, 15, hairG, ink, 1.8);
    ell(53, 31, 9, 13.5, grad(44, 18, 62, 44, [[0, '#E2AC85'], [.55, skin], [1, '#8F5A45']]), ink, 1.6, -.04);
    path([[61, 29], [66, 33], [61, 36]], skin, ink, 1.2);                       // nose
    ell(44, 31, 2.2, 3.2, '#B07050', ink, 1, 0);                                   // ear
    ell(57, 30.5, 1.7, 2.4, '#171725', null); ell(57.6, 29.8, .55, .55, '#FFFFFF', null);
    line([[54, 26.5], [59.5, 26]], '#3A2418', 1.3);
    line([[56.5, 39.5], [60, 39.5]], '#7A3F3A', 1.3);
    // visor to the front
    path([[50, 24], [62, 24], [71, 27], [62, 29], [50, 28]], '#3A2658', ink, 1.4);
    line([[52, 25.5], [66, 26]], '#B08AD8', .9);
    cap(48, false);
    path([[56, 15], [63, 21], [60, 22], [54, 16]], '#4C3568', null);
  }

  // ---------------- rim light (same recipe as Granny) ----------------
  g.save(); g.globalAlpha = .62; g.shadowBlur = .65 / scale; g.shadowColor = 'rgba(255,154,61,.38)';
  if (!side) {
    line([[36, 53], [40, 49], [46, 47]], 'rgba(255,177,104,.86)', 1 / scale);
    line([[32, 58], [29, 66], [30, 72]], 'rgba(255,154,61,.78)', 1 / scale);
    g.shadowColor = 'rgba(41,242,232,.34)';
    line([[56, 48], [63, 50], [67, 55]], 'rgba(113,245,229,.82)', 1 / scale);
    line([[68, 58], [71, 66], [71, 72]], 'rgba(41,210,211,.76)', 1 / scale);
  } else {
    line([[44, 52], [47, 49], [52, 48]], 'rgba(255,177,104,.86)', 1 / scale);
    g.shadowColor = 'rgba(41,242,232,.34)';
    line([[60, 52], [62, 58], [62, 66]], 'rgba(113,245,229,.82)', 1 / scale);
  }
  g.restore();
  g.restore();
  function ctxNoop() {}
};
