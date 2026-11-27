/* Circuit Football — Shared UI Event Bus, Listener Lifecycle & Dev Diagnostics (Pillar 1 Refactor) */
(() => {
  'use strict';
  const bus = new EventTarget();
  const listeners = [];

  function emitUI(type, detail) {
    bus.dispatchEvent(new CustomEvent(type, { detail }));
  }

  function onUI(type, handler, opts) {
    const wrapped = (ev) => handler(ev.detail, ev);
    bus.addEventListener(type, wrapped, opts);
    return () => bus.removeEventListener(type, wrapped, opts);
  }

  function trackListener(target, type, handler, opts) {
    if (!target || typeof target.addEventListener !== 'function') return () => {};
    target.addEventListener(type, handler, opts);
    const entry = { target, type, handler, opts };
    listeners.push(entry);
    return () => {
      target.removeEventListener(type, handler, opts);
      const idx = listeners.indexOf(entry);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }

  function disposeTrackedListeners() {
    while (listeners.length) {
      const { target, type, handler, opts } = listeners.pop();
      try { target.removeEventListener(type, handler, opts); } catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
    }
  }

  function disposeThreeObject(obj) {
    if (!obj) return;
    if (obj.geometry && typeof obj.geometry.dispose === 'function') obj.geometry.dispose();
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (let i = 0; i < mats.length; i++) {
        const m = mats[i];
        if (!m) continue;
        if (m.map && typeof m.map.dispose === 'function') m.map.dispose();
        if (typeof m.dispose === 'function') m.dispose();
      }
    }
    if (typeof obj.dispose === 'function') obj.dispose();
  }

  
  function triggerBroadcastWipe() {
    if (document.body && document.body.classList.contains('lite')) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let el = document.getElementById('cfWipe');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cfWipe';
      el.setAttribute('aria-hidden', 'true');
      (document.getElementById('app') || document.body).appendChild(el);
    }
    el.classList.remove('go');
    void el.offsetWidth;
    el.classList.add('go');
  }

  window.triggerBroadcastWipe = triggerBroadcastWipe;
  window.UIBus = bus;
  window.emitUI = emitUI;
  window.onUI = onUI;
  window.CFRuntime = {
    trackListener,
    disposeTrackedListeners,
    disposeThreeObject,
    warn(scope, err) {
      if (window.sgRO || window.__cfDebug) {
        console.warn('[CF:' + scope + ']', err);
      }
    }
  };
})();
