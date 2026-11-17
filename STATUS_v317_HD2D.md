# STATUS — HD-2D TEST WORKSPACE (2026-11-16)

## Approval / canon
User explicitly approved a tilted 3D environment with 2D sprites for the TEST overworld only. MAIN is not authorized for changes and was not touched.

## Current deliverable
- `VaporCity_HD2D_VisualTest.html` is an isolated visual prototype based on the supplied HD-2D scene.
- Its palette, exposure, fog and bloom have been adjusted toward the original Vapor City look: deep blue-violet shadows, pink/cyan neon, warm amber accents, rain and wet reflections.
- Supporting local assets are in `assets/`; `three.js` is local beside the HTML.
- The existing gameplay TEST page is included separately as `test_v316QQ1_original.html` and is unchanged.

## Verified headless
- Source HTML was assembled from the supplied prototype and local assets.
- Static JavaScript syntax check: passed with `node --check`.
- Browser render/screenshot: blocked in this environment (`ERR_BLOCKED_BY_ADMINISTRATOR` for local browser navigation); no render result is claimed.
- Gameplay integration, real-map tile alignment, camera follow, and touch interaction: not yet implemented or verified.

## Needs iPhone
- Performance, heat, visual balance, touch controls and sustained frame rate.

## Safety
- MAIN unchanged.
- Original TEST source preserved unchanged in this package.
- This is a visual prototype, not yet a replacement TEST artifact or an integrated gameplay build.
