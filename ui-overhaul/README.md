# Circuit Football RPG — UI Overhaul

## Workstream

- Working branch: `UI-Overhaul`
- Baseline: `main` at `36830922fa5b99922ce583bcf3888cb297bad03c`
- Game entry point: `index.html`
- Design authority: owner-supplied **Circuit Football — UI Overhaul Handoff Spec** (14 pages)
- Scope: UI redesign only. Preserve game rules, progression, save data, controls, simulation, and existing content unless a UI requirement explicitly requires a behavior change.

## Repository audit — 2026-11-24

- Created `UI-Overhaul` from the current `main` head. Existing branches were not changed.
- `index.html` is 2,208,493 bytes and is a single-file application with inline CSS, HTML overlays, and a large inline JavaScript implementation.
- The game renders its main playfield through canvas `#cv` inside fixed application shell `#app`. The app uses a portrait-width shell (up to 480px) and switches layout through the `body.land` class.
- The existing interface is a hybrid: canvas-rendered game/world content plus DOM-based HUD, controls, playbook, overworld, and menu surfaces. Existing DOM landmarks include `#hud`, `#sheet`, `#world`, `#owTop`, `#owMenu`, and `#menu`; these should be extended or restyled rather than replacing game systems wholesale.
- The uploaded ZIP's `index.html` is byte-for-byte the same Git blob as `main/index.html` (Git blob SHA `769a284d91013e324d96765b7a46dbdff5f76f30`).
- The ZIP contains 68 files: the HTML entry point, 45 audio files under `audio/`, and 22 text model files under `models/`. The current `main` tree contains the matching `index.html` but does **not** contain either `audio/` or `models/`. The HTML references the audio files through `window.SGA_FILES` and explicitly loads its model/animation data from `models/kk_*.txt` (with fingerprint validation and a classic-figure fallback). The current GitHub checkout is therefore missing runtime assets needed for a complete fidelity test.
- The repository's current root and `project-background/` are primarily Vapor City civilian-vector project material. No dedicated UI-overhaul QA workflow is present in the current `main` tree. Recent Actions runs are for the separate NPC/Vapor City branch and are not evidence for this game build.

## Handoff requirements

Implement the seven handoff areas in stages:

1. Overworld HUD (portrait): safe-area-aware town/cleared/upgrade and menu pills, goal strip, contextual A-button label.
2. Overworld menu: consistent shell, MENU / SETTINGS / CREDITS tabs, goal and support cards, settings groups, reset confirmation, credits and hidden developer drawer.
3. My Team and My Squad: preview, identity/uniform/trails, compact attributes/style/gear/career tabs, upgrade-cost labels, pinned actions and roster strip.
4. Goals & Stats: challenges, achievements, and team-stat tabs with fixed header and bottom action.
5. Pre-game matchup and playbook (landscape): matchup cards, atmosphere, category pills, selected play treatment, clear call-to-action.
6. Pre-snap, live-match HUD and fumble: unified scoreboard, uncluttered controls, receiver-state clarity, stamina ring, separated fumble meter.
7. Defense selection, defense simulation, achievement toast and post-game: scoreboard clearance, mode-specific control visibility, non-blocking toast, portrait result layout.

## Design tokens from the handoff

- Surface: `#131620`; inner/inactive surface: `#1C2130`
- Gold: `#F5B841`
- Cyan: `#4DE1F2`
- Green: `#34D399`
- Crimson: `#EF4444`
- Town-specific accent remains reserved for the overworld A-button ring and town pill.
- Use 12–16px card radii, 1–2px borders, no heavy outer neon bloom on in-match HUDs, and respect `env(safe-area-inset-*)`.

## Implementation and QA gates

- First establish a source map of the current DOM, CSS, screen state, and event handlers before changing behavior.
- Keep gameplay/rendering and persistence logic intact; prefer isolated UI markup/CSS and narrowly scoped presentation helpers.
- Implement one screen group at a time and test both portrait and landscape, mobile-safe areas, keyboard/touch controls, and transitions between screens.
- Verify the game with its required runtime assets present. Do not treat a successful static parse or build as visual approval.
- Capture and inspect real renders for clipping, overlap, truncation, hit targets, visual hierarchy, and regressions.
- Do not refresh or replace golden snapshots without explicit owner approval.
- Distinguish implemented, automated-tested, visually inspected, independently reviewed, and owner-approved states in all progress reports.

## Progress — 2026-11-24

### Stage 1 foundation committed

Commit: [992631b2a9e0514eb5b0915771c7c1fac84198b9](https://github.com/tinytime/Tinytime.github.io/commit/992631b2a9e0514eb5b0915771c7c1fac84198b9)

- Added `ui-overhaul.css` and linked it from `index.html`.
- Added the handoff's shared semantic design tokens.
- Applied the first restrained matte treatment to the Overworld HUD town/progress pill, MENU control, and contextual A-button ring while preserving existing DOM IDs and pointer handlers.
- Static validation: all five inline JavaScript blocks in the resulting HTML pass `node --check`.
- Not yet browser-rendered or visually approved. The missing ZIP runtime assets remain a blocker for complete end-to-end visual QA.

## Immediate blockers / next actions

1. Restore the ZIP's `audio/` and `models/` directories to this branch before claiming a complete runtime baseline. Their absence from the current GitHub tree is confirmed; the audio references are embedded in `index.html`.
2. Finish mapping the existing screen-state and event-handler paths in `index.html`.
3. Establish a repeatable browser QA route for this standalone game branch.
4. Begin implementation with the shared UI shell and Overworld HUD, then proceed through the seven handoff areas in dependency order.


## Stage 2 — Overworld menu shell (2026-11-24)

Implementation commits:
- `3b844eb0e130583a30a3f9f91f77f55825d96409` — initial responsive menu presentation pass.
- `2b19d5a4f316c4fe5b83afaf5c23cba2f272d0df` — functional tabbed menu styling.
- `eb7da1921cae89198452d722a405d14166ef2ac8` — tabbed menu behavior module.
- `bf80febdb3cc3602d29fceb98cdd29a57f74f983` — load the menu behavior module from the game entry point.
- `655dcdf4ea1671be993ae1e5d3608327c930baff` — remove the legacy menu tagline from the new shell.

Implemented in the working branch:
- A three-tab MENU / SETTINGS / CREDITS shell with keyboard left/right tab navigation and ARIA tab semantics.
- Current-goal card sourced from the existing overworld objective element.
- MENU navigation groups for squad, team, upgrades, goals, feedback and save-code actions.
- SETTINGS groups for music, effects, volume, haptics, runner camera, lite effects, resolution and reset progress.
- CREDITS groups for 3D ART & UI, MUSIC & SFX and TOWN AMBIENCE, using the existing credit text.
- Five-tap build-footer trigger for the hidden developer/test drawer, retaining existing FPS and performance controls.
- Existing game buttons are moved intact to preserve their original event handlers and state logic.

QA status:
- Implementation is committed on `UI-Overhaul`; no changes were made to `main` or the NPC workstream.
- Browser interaction, portrait/landscape visual inspection, save/reset regression testing and accessibility checks are **pending**. Do not treat this stage as visually approved.
- The current GitHub tree still lacks the ZIP's `audio/` and `models/` runtime directories. The game entry point references them, so full-fidelity gameplay/audio QA remains blocked until the exact supplied assets are restored.
- No golden snapshots were changed.


### Stage 2 integration and static validation update

- The tabbed menu behavior module is now linked at the end of `index.html`; the stylesheet is linked in the document head.
- The existing `mBuild` element is retained and moved into Credits rather than replaced, preserving its original build/art toggle handler. The five-tap developer drawer is layered onto that existing control.
- Latest implementation checkpoint: `c475bb8109b7f5add76feb67902894a98ff9b3ba`.
- Static checks on the exact branch HEAD: all five existing inline JavaScript blocks compile; the new menu module compiles; CSS opening/closing brace counts match; both UI assets are referenced by `index.html`.
- These are static checks only. A browser session and screenshot capture did not complete in this environment, so no interaction, layout, clipping, mobile safe-area or visual approval is claimed.


## Runtime asset restoration and path correction — 2026-11-24

Owner restored the runtime asset folders to the `UI-Overhaul` branch. The uploaded folder names were capitalized (`Audio/`, `Models/`), while the game entry point requests lowercase `audio/` and `models/`. GitHub Pages is case-sensitive, so the asset files would otherwise 404.

Correction committed at `89e4264f8801836dd8c350f0fe0da8d11579a8a1`:
- Renamed the 46 audio-directory entries to lowercase `audio/`.
- Renamed the 23 model-directory entries to lowercase `models/`.
- Preserved each asset's existing Git blob unchanged; this was a path-only normalization.
- Confirmed all 45 explicit audio filename references in `index.html` resolve to files in `audio/`; the model loader's `models/kk_*.txt` pattern matches the 23 model files.
- No uppercase `Audio/` or `Models/` paths remain.

Static verification on commit `89e4264f8801836dd8c350f0fe0da8d11579a8a1`:
- Five existing inline JavaScript blocks: 5/5 syntax pass.
- `ui-overhaul-menu.js`: syntax pass.
- `ui-overhaul.css`: 78 opening / 78 closing braces.
- `index.html` references both `ui-overhaul.css` and `ui-overhaul-menu.js`.
- `main` remains unchanged at `36830922fa5b99922ce583bcf3888cb297bad03c`.

Remaining QA limitation: this branch has no `.github/workflows/` files and no browser automation workflow configured. Static checks do not establish successful browser rendering, actual audio/model fetches, responsive layout, menu interactions, or gameplay regressions. Those checks remain pending; no golden snapshots were touched and no visual approval is claimed.


### Runtime asset restoration and QA checkpoint — 2026-11-24

The owner restored the runtime directories. Current tree verification confirms 45 audio files (44 MP3 + 1 WAV) and 22 model/data TXT files. All 45 audio references and all 22 model references found in the current game HTML resolve to exact paths in the lowercase directories; no missing references or case mismatches were found.

Static checks at branch HEAD `efcf75eb5bcf0573fcb0d15b6f6439d48346c48b`:
- Five existing inline game scripts: compile successfully.
- `ui-overhaul-menu.js`: compiles successfully.
- Every DOM ID looked up by the menu module exists in `index.html`.
- CSS braces: 78 opening / 78 closing.
- `main` remains unchanged at `36830922fa5b99922ce583bcf3888cb297bad03c`.

The recent GitHub Actions history currently shows runs for the separate NPC branch, not this UI branch. The checked-in browser QA script targets an older standalone HTML fixture and cannot be used as-is for this build. Browser screenshots and interaction checks therefore remain pending; this is not visual approval. Next task is a dedicated `index.html` Chromium harness and portrait/landscape inspection, followed by save/reset/return-to-town regression checks. Golden snapshots remain untouched.
