/* Circuit Football — AAA Accessibility & Input Preferences Suite (Pillar 3) */
(() => {
  'use strict';
  const STORE_KEY = 'cf_a11y_v1';
  const CB_MODES = ['off', 'deutan', 'protan', 'tritan', 'high'];
  const CB_LABELS = { off: 'OFF', deutan: 'DEUTAN', protan: 'PROTAN', tritan: 'TRITAN', high: 'HIGH CONTRAST' };
  const SCALES = [1, 1.15, 1.3];
  const SFX_CAPTIONS = {
    fumble: 'FUMBLE!',
    whistle: 'WHISTLE',
    td: 'TOUCHDOWN!',
    first: 'FIRST DOWN!',
    tick: 'PLAY CLOCK LOW',
    buzzer: 'DELAY OF GAME',
    bigHit: 'BIG HIT!',
    star: 'STAR PLAY READY',
    int: 'INTERCEPTED!'
  };
  const CB_MVC = {
    off:    { juke: '#3dff7a', stiff: '#ff7a2e', spin: '#ff4fd8', hit: '#ffffff', bad: '#ff4a4a' },
    deutan: { juke: '#56b4e9', stiff: '#e69f00', spin: '#cc79a7', hit: '#ffffff', bad: '#d55e00' },
    protan: { juke: '#56b4e9', stiff: '#f0e442', spin: '#cc79a7', hit: '#ffffff', bad: '#0072b2' },
    tritan: { juke: '#009e73', stiff: '#ff7a2e', spin: '#f0e442', hit: '#ffffff', bad: '#d55e00' },
    high:   { juke: '#00ffea', stiff: '#ffea00', spin: '#ff66ff', hit: '#ffffff', bad: '#ff3355' }
  };

  const defaults = {
    colorblind: 'off',
    uiScale: 1,
    holdToMash: false,
    captions: true,
    leftHanded: false,
    compactHud: !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches),
    keys: { juke: 'q', stiff: 'e', spin: 'f', hurdle: 'h', style: 'r' }
  };

  let cfg = Object.assign({}, defaults, { keys: Object.assign({}, defaults.keys) });
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (raw && typeof raw === 'object') {
      cfg = Object.assign({}, defaults, raw, { keys: Object.assign({}, defaults.keys, raw.keys || {}) });
    }
  } catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(cfg)); } catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
  }

  function apply() {
    const root = document.documentElement;
    root.dataset.cb = cfg.colorblind || 'off';
    root.style.setProperty('--ui-scale', String(cfg.uiScale || 1));
    if (document.body) {
      document.body.classList.toggle('a11y-left', !!cfg.leftHanded);
      document.body.classList.toggle('a11y-compact-hud', !!cfg.compactHud);
      document.body.classList.toggle('a11y-captions', !!cfg.captions);
    }
    if (window.MVC && CB_MVC[cfg.colorblind]) {
      Object.assign(window.MVC, CB_MVC[cfg.colorblind]);
    }
    save();
    if (window.emitUI) window.emitUI('a11y:changed', cfg);
  }

  let capTimer = 0;
  function caption(text) {
    if (!cfg.captions || !text) return;
    let el = document.getElementById('a11yCap');
    if (!el) {
      el = document.createElement('div');
      el.id = 'a11yCap';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      const host = document.getElementById('app') || document.body;
      if (host) host.appendChild(el);
    }
    el.textContent = text;
    el.classList.add('on');
    clearTimeout(capTimer);
    capTimer = setTimeout(() => el.classList.remove('on'), 1800);
  }

  function onSfx(name) {
    const label = SFX_CAPTIONS[name];
    if (label) caption(label);
  }

  function mountSettings() {
    const settingsPane = document.getElementById('uiMenuSettings');
    if (!settingsPane || settingsPane.querySelector('.ui-a11y-card')) return;
    const card = document.createElement('section');
    card.className = 'ui-a11y-card';
    card.setAttribute('aria-label', 'Accessibility settings');
    card.innerHTML =
      '<div class="ui-a11y-title">ACCESSIBILITY &amp; CONTROLS</div>' +
      '<div class="ui-a11y-row"><span>COLORBLIND MODE</span><button type="button" id="a11yCbBtn" class="ui-a11y-btn"></button></div>' +
      '<div class="ui-a11y-row"><span>UI SCALE</span><button type="button" id="a11yScaleBtn" class="ui-a11y-btn"></button></div>' +
      '<div class="ui-a11y-row"><span>HOLD TO MASH (FUMBLES)</span><button type="button" id="a11yHoldBtn" class="ui-a11y-btn"></button></div>' +
      '<div class="ui-a11y-row"><span>VISUAL SOUND CAPTIONS</span><button type="button" id="a11yCapBtn" class="ui-a11y-btn"></button></div>' +
      '<div class="ui-a11y-row"><span>LEFT-HANDED MOBILE</span><button type="button" id="a11yLeftBtn" class="ui-a11y-btn"></button></div>' +
      '<div class="ui-a11y-row"><span>COMPACT 3-BTN HUD</span><button type="button" id="a11yCompactBtn" class="ui-a11y-btn"></button></div>' +
      '<div class="ui-a11y-keys" aria-label="Keyboard bindings">' +
        '<div class="ui-a11y-sub">DESKTOP ACTION KEYS (CLICK TO REMAP)</div>' +
        '<div class="ui-a11y-keygrid">' +
          ['juke','stiff','spin','hurdle','style'].map(act =>
            '<button type="button" class="ui-a11y-key" data-act="' + act + '"><span>' + (act === 'stiff' ? 'TRUCK' : act.toUpperCase()) + '</span><b></b></button>'
          ).join('') +
        '</div>' +
      '</div>';
    settingsPane.appendChild(card);

    const syncButtons = () => {
      card.querySelector('#a11yCbBtn').textContent = CB_LABELS[cfg.colorblind] || 'OFF';
      card.querySelector('#a11yScaleBtn').textContent = Math.round((cfg.uiScale || 1) * 100) + '%';
      card.querySelector('#a11yHoldBtn').textContent = cfg.holdToMash ? 'ON' : 'OFF';
      card.querySelector('#a11yCapBtn').textContent = cfg.captions ? 'ON' : 'OFF';
      card.querySelector('#a11yLeftBtn').textContent = cfg.leftHanded ? 'ON' : 'OFF';
      card.querySelector('#a11yCompactBtn').textContent = cfg.compactHud ? 'ON' : 'OFF';
      card.querySelectorAll('.ui-a11y-key').forEach(btn => {
        const act = btn.dataset.act;
        btn.querySelector('b').textContent = (cfg.keys[act] || '').toUpperCase();
      });
    };

    card.querySelector('#a11yCbBtn').addEventListener('click', () => {
      const idx = (CB_MODES.indexOf(cfg.colorblind) + 1) % CB_MODES.length;
      cfg.colorblind = CB_MODES[idx]; apply(); syncButtons();
    });
    card.querySelector('#a11yScaleBtn').addEventListener('click', () => {
      const idx = (SCALES.indexOf(cfg.uiScale) + 1) % SCALES.length;
      cfg.uiScale = SCALES[idx]; apply(); syncButtons();
    });
    card.querySelector('#a11yHoldBtn').addEventListener('click', () => {
      cfg.holdToMash = !cfg.holdToMash; apply(); syncButtons();
    });
    card.querySelector('#a11yCapBtn').addEventListener('click', () => {
      cfg.captions = !cfg.captions; apply(); syncButtons();
      if (cfg.captions) caption('CAPTIONS ENABLED');
    });
    card.querySelector('#a11yLeftBtn').addEventListener('click', () => {
      cfg.leftHanded = !cfg.leftHanded; apply(); syncButtons();
    });
    card.querySelector('#a11yCompactBtn').addEventListener('click', () => {
      cfg.compactHud = !cfg.compactHud; apply(); syncButtons();
    });

    card.querySelectorAll('.ui-a11y-key').forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.dataset.act;
        btn.querySelector('b').textContent = '...';
        const onKey = (ev) => {
          ev.preventDefault(); ev.stopPropagation();
          const k = (ev.key || '').toLowerCase();
          if (k && k !== 'escape' && k.length === 1) {
            cfg.keys[act] = k;
            apply();
          }
          syncButtons();
          window.removeEventListener('keydown', onKey, true);
        };
        window.addEventListener('keydown', onKey, true);
      });
    });

    syncButtons();
  }

  window.A11Y = {
    cfg,
    apply,
    caption,
    onSfx,
    mountSettings,
    set(patch) { Object.assign(cfg, patch); apply(); }
  };


  // Modal Keyboard Focus-Trapping & Escape Close (Sprint 2)
  window.addEventListener('keydown', (ev) => {
    const dialogs = ['#svFix', '#svPanel', '#fb', '#menu', '#pile', '#fourth', '#dcall', '#sheet'];
    let active = null;
    for (let i = 0; i < dialogs.length; i++) {
      const el = document.querySelector(dialogs[i]);
      if (el && !el.hidden && el.offsetParent !== null) { active = el; break; }
    }
    if (!active) return;
    if (ev.key === 'Escape') {
      const closeBtn = active.querySelector('#fbClose, #svClose, .ui-menu-close');
      if (closeBtn) { ev.preventDefault(); closeBtn.click(); }
      return;
    }
    if (ev.key !== 'Tab') return;
    const focusables = [...active.querySelectorAll('button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.hidden && el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  });

  const boot = () => {
    apply();
    mountSettings();
    setTimeout(mountSettings, 300);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
