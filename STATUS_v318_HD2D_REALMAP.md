# STATUS — HD-2D TEST WORKSPACE v3.18 (2026-11-17)

## Approval / canon
- User explicitly approved a tilted 3D environment with 2D sprites for the TEST overworld only.
- Canon change: Overworld may be HD-2D (tilted 3D street + 2D sprites), user, 2026-11-16.
- MAIN was not changed and remains unauthorized.

## This milestone
- Added `VaporCity_HD2D_RealMap_v318.html`, a standalone HD-2D visual study.
- Replaced the invented plaza building arrangement with all 11 Vapor City outdoor building footprints from the actual TEST game's `OWB` table.
- Mapped the real game tile coordinates into the 3D scene (game tile x,y -> world x-16,y-20).
- Repositioned the arena, crew buildings, shops, lamps, hologram ads, vents, crew tags, and selected pack civilians to their real map tile positions.
- Preserved the intended visual direction: deep blue/violet night, pink/cyan neon, amber accents, wet pavement, puddle reflections, rain, steam, bloom and restrained tilt-shift.
- Eli is still the existing 2D game art as a billboard sprite. The 3D match player model is untouched.
- This remains a visual study, not yet an integrated gameplay renderer.

## Verified headless / static
- JavaScript syntax check with Node: PASS.
- Static coordinate comparison against the actual TEST source `OWB` table: 11/11 building footprints match.
- Confirmed all referenced local visual assets are included in the package.
- MAIN untouched; original TEST source is included unchanged as `test_v316QQ1_original.html`.

## Not verified
- Browser screenshot/render: attempted with local Chromium + Playwright, but navigation is blocked by the environment (`ERR_BLOCKED_BY_ADMINISTRATOR`). No screenshot or runtime render is claimed.
- Live game integration, camera follow, doors/NPC tap targets, movement/collision, save behavior, match transitions, and fallback handling: not implemented or tested yet.
- iPhone performance, touch, heat, and sustained frame rate: requires user's iPhone.

## Next step
Implement a TEST-only renderer hook that draws the 3D plaza while leaving all 2D gameplay logic authoritative. Keep the original 2D renderer available as OLD/fallback, and verify all 20 Vapor City doors and 16 NPCs remain reachable before considering any broader rollout.
