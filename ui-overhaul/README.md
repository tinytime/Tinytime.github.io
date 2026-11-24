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
