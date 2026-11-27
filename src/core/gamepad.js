/* Circuit Football — Full Native Gamepad & Auto-Glyph Controller (Pillar 3 -> 10/10) */
(() => {
  'use strict';
  const DZ = 0.14;
  let connected = false;
  let prevButtons = [];
  let rafId = 0;

  function detectBrand(id) {
    const s = String(id || '').toLowerCase();
    if (/playstation|dualsense|dualshock|054c/.test(s)) return 'playstation';
    if (/nintendo|switch|pro controller|057e/.test(s)) return 'nintendo';
    return 'xbox';
  }

  const GLYPHS = {
    xbox:        { a: 'A', b: 'B', x: 'X', y: 'Y', lb: 'LB' },
    playstation: { a: '✕', b: '○', x: '□', y: '△', lb: 'L1' },
    nintendo:    { a: 'B', b: 'A', x: 'Y', y: 'X', lb: 'L' }
  };
  function syncPromptGlyphs(mode) {
    const g = GLYPHS[mode];
    const hike = document.getElementById('hike');
    const aud = document.getElementById('audibleBtn');
    const mot = document.getElementById('motionBtn');
    if (hike) hike.textContent = g ? 'HIKE! [' + g.a + ']' : 'HIKE!';
    if (aud) aud.textContent = g ? 'AUDIBLE [' + g.y + ']' : 'AUDIBLE';
    if (mot) mot.textContent = g ? 'MOTION [' + g.lb + ']' : 'MOTION';
    const dcallBtns = document.querySelectorAll('#dcall button[data-c] b');
    const dLabels = ['BLITZ', 'BALANCED', 'PREVENT'];
    const dKeys = g ? [g.x, g.a, g.b] : null;
    dcallBtns.forEach((b, i) => { if (dLabels[i]) b.textContent = dKeys ? dLabels[i] + ' [' + dKeys[i] + ']' : dLabels[i]; });
    const fBtns = document.querySelectorAll('#fourth button[data-a]');
    const fLabels = ['GO FOR IT', 'FIELD GOAL', 'PUNT'];
    const fKeys = g ? [g.a, g.x, g.b] : null;
    fBtns.forEach((b, i) => { if (fLabels[i]) b.textContent = fKeys ? fLabels[i] + ' [' + fKeys[i] + ']' : fLabels[i]; });
  }
  function setInputMode(mode) {
    if (document.documentElement.dataset.input !== mode) {
      document.documentElement.dataset.input = mode;
      syncPromptGlyphs(mode);
      if (window.emitUI) window.emitUI('input:mode', { mode });
    }
  }

  function fireKey(key, type) {
    window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true, cancelable: true }));
  }

  function tapKey(key) {
    fireKey(key, 'keydown');
    setTimeout(() => fireKey(key, 'keyup'), 40);
  }

  function poll() {
    rafId = 0;
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let pad = null;
    for (let i = 0; i < pads.length; i++) {
      if (pads[i] && pads[i].connected) { pad = pads[i]; break; }
    }
    if (!pad) {
      if (connected) {
        connected = false;
        setInputMode(window.matchMedia && window.matchMedia('(pointer: coarse)').matches ? 'touch' : 'keyboard');
      }
      return;
    }

    if (!connected) {
      connected = true;
      const brand = detectBrand(pad.id);
      setInputMode(brand);
      if (window.A11Y) window.A11Y.caption('CONTROLLER CONNECTED (' + brand.toUpperCase() + ')');
    }

    const pressed = (idx) => !!(pad.buttons[idx] && pad.buttons[idx].pressed);
    const justPressed = (idx) => pressed(idx) && !prevButtons[idx];

    // Left stick + D-pad steering into window.__gpInput (read by kbStick / overworld)
    let ax = pad.axes[0] || 0;
    let ay = -(pad.axes[1] || 0);
    if (pressed(14)) ax = -1; else if (pressed(15)) ax = 1;
    if (pressed(12)) ay = 1;  else if (pressed(13)) ay = -1;
    const mag = Math.hypot(ax, ay);
    const anyBtn = pad.buttons.some(b => b && b.pressed);
    if (anyBtn || mag >= DZ) setInputMode(detectBrand(pad.id));
    if (mag < DZ) { ax = 0; ay = 0; }
    else {
      const sc = Math.min(1, (mag - DZ) / (1 - DZ));
      ax = (ax / mag) * sc;
      ay = (ay / mag) * sc;
    }

    const rtVal = pad.buttons[7] ? pad.buttons[7].value : 0;
    window.__gpInput = {
      active: true,
      sx: ax,
      sy: ay,
      turbo: rtVal > 0.25 || pressed(7)
    };

    const keysCfg = (window.A11Y && window.A11Y.cfg && window.A11Y.cfg.keys) || { juke: 'q', stiff: 'e', spin: 'f', hurdle: 'h', style: 'r' };
    const bulletHeld = (pad.buttons[6] && pad.buttons[6].value > 0.25) || pressed(6);
    window.__gpBullet = bulletHeld;

    // Navigation & Live Actions
    if (justPressed(12)) tapKey('ArrowUp');
    if (justPressed(13)) tapKey('ArrowDown');
    if (justPressed(14)) tapKey('ArrowLeft');
    if (justPressed(15)) tapKey('ArrowRight');

    const sg = window.SG;
    const inPocket = !!(sg && sg.F && sg.F.mode === 'live' && sg.F.passer && sg.F.carrier === sg.F.passer && !sg.F.ballAir);
    const inOverworld = !!(document.getElementById('world') && !document.getElementById('world').hidden);
    const dcallEl = document.getElementById('dcall');
    const fourthEl = document.getElementById('fourth');
    if (dcallEl && !dcallEl.hidden) {
      const btns = dcallEl.querySelectorAll('button[data-c]');
      if (justPressed(2) && btns[0]) { btns[0].click(); prevButtons = pad.buttons.map(b => !!b.pressed); rafId = requestAnimationFrame(poll); return; }
      if (justPressed(0) && btns[1]) { btns[1].click(); prevButtons = pad.buttons.map(b => !!b.pressed); rafId = requestAnimationFrame(poll); return; }
      if (justPressed(1) && btns[2]) { btns[2].click(); prevButtons = pad.buttons.map(b => !!b.pressed); rafId = requestAnimationFrame(poll); return; }
    }
    if (fourthEl && !fourthEl.hidden) {
      const btns = fourthEl.querySelectorAll('button[data-a]');
      if (justPressed(0) && btns[0]) { btns[0].click(); prevButtons = pad.buttons.map(b => !!b.pressed); rafId = requestAnimationFrame(poll); return; }
      if (justPressed(2) && btns[1]) { btns[1].click(); prevButtons = pad.buttons.map(b => !!b.pressed); rafId = requestAnimationFrame(poll); return; }
      if (justPressed(1) && btns[2]) { btns[2].click(); prevButtons = pad.buttons.map(b => !!b.pressed); rafId = requestAnimationFrame(poll); return; }
    }

    if (justPressed(0)) { // A / Cross: Overworld Interact, Hike, Call Play, Fumble Mash, or Throw WR1
      const pile = document.getElementById('pile');
      const sheet = document.getElementById('sheet');
      const setbar = document.getElementById('setbar');
      if (inOverworld) tapKey('e');
      else if (pile && !pile.hidden) { window.__pileHeld = true; tapKey(' '); }
      else if ((sheet && !sheet.hidden) || (setbar && !setbar.hidden)) tapKey(' ');
      else if (inPocket) tapKey('1');
    } else if (!pressed(0) && prevButtons[0]) {
      window.__pileHeld = false;
    }

    if (justPressed(1)) tapKey(inPocket ? '2' : keysCfg.juke);   // B / Circle -> WR2 in pocket, else Juke
    if (justPressed(2)) tapKey(inPocket ? '3' : keysCfg.stiff);  // X / Square -> TE in pocket, else Truck
    if (justPressed(3)) {                                        // Y / Triangle -> WR4/RB in pocket, Audible pre-snap, else Spin
      const setbar = document.getElementById('setbar');
      if (inPocket) tapKey('4');
      else if (setbar && !setbar.hidden) {
        const aud = document.getElementById('audibleBtn');
        if (aud) aud.click();
      } else {
        tapKey(keysCfg.spin);
      }
    }
    if (justPressed(4)) {                       // LB / L1 -> Pre-Snap Motion, else Style
      const setbar = document.getElementById('setbar');
      if (setbar && !setbar.hidden) {
        const mot = document.getElementById('motionBtn');
        if (mot) mot.click();
      } else {
        tapKey(keysCfg.style);
      }
    }
    if (justPressed(5)) tapKey(keysCfg.hurdle); // RB / R1 -> Hurdle / Dive
    if (justPressed(9)) {                       // Start -> Menu / Escape
      const owMenu = document.getElementById('owMenu');
      if (owMenu && !owMenu.hidden && owMenu.offsetParent !== null) owMenu.click();
      else tapKey('Escape');
    }

    prevButtons = pad.buttons.map(b => !!b.pressed);
    rafId = requestAnimationFrame(poll);
  }

  window.addEventListener('gamepadconnected', () => {
    if (!rafId) rafId = requestAnimationFrame(poll);
  });
  window.addEventListener('gamepaddisconnected', () => {
    window.__gpInput = null;
  });
  window.addEventListener('keydown', (e) => { if (e.isTrusted) setInputMode('keyboard'); }, { passive: true });
  window.addEventListener('pointerdown', (e) => {
    if (e.isTrusted) setInputMode(e.pointerType === 'touch' ? 'touch' : 'keyboard');
  }, { passive: true });

  // Kick once in case controller was already connected before load
  if (navigator.getGamepads && Array.from(navigator.getGamepads()).some(p => p && p.connected)) {
    rafId = requestAnimationFrame(poll);
  }
})();
