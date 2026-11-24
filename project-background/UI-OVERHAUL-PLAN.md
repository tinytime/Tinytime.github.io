# Circuit Football RPG — UI Overhaul Workstream

## Status

- Working branch: `UI-Overhaul`
- Baseline: current `main` at the time this branch was created
- UI handoff source: `Circuit Football — UI Overhaul Handoff Spec.docx` (14 pages; supplied in the project conversation)
- Implementation status: Stage 1 foundation is implemented (shared design tokens and first Overworld HUD matte treatment); remaining screens are not yet redesigned
- Owner approval: pending

## Source-of-truth rules

1. Treat the current `main` version of `index.html` as the game-code baseline unless the owner explicitly replaces it.
2. Treat the supplied 14-page UI handoff as the design requirements source.
3. Keep this work isolated on `UI-Overhaul`; do not merge or modify the NPC workstream.
4. Preserve existing gameplay, saves, progression, audio, model loading, accessibility, and responsive behavior unless a handoff requirement explicitly changes the presentation.
5. A successful build is not visual approval. Inspect actual portrait and landscape renders and exercise the affected interactions.

## Handoff requirements inventory

### Global design system
- Unified matte dark charcoal/navy surfaces: `#131620`; inner/inactive pills: `#1C2130`.
- 1–2px borders and 12–16px radii; avoid heavy outer neon bloom on in-match HUD.
- Gold `#F5B841`: active tabs, selected cards, UPG/PTS badges, secondary action borders.
- Cyan `#4DE1F2`: primary execute CTAs, active toggles, stamina/loading bars.
- Green `#34D399`: OPEN receiver highlight and PREVENT defense border.
- Crimson `#EF4444`: BLITZ, fumble defense fill, reset-progress danger zone.
- Preserve town-specific accent for the overworld A-button ring and town pill.
- Respect safe-area insets for headers and corner controls.

### 1. Overworld HUD (portrait)
- Place town/cleared/upgrade information and MENU in translucent `#131620` pills.
- Add a compact current-goal strip below the town pill.
- Dynamically label the contextual A action (TALK, ENTER, FISH, PLAY).

### 2. Overworld menu, settings, credits (portrait)
- Fixed header, current-goal card, MENU/SETTINGS/CREDITS tabs, sticky BACK TO TOWN.
- Menu content includes navigation to squad/team/upgrades/goals/stats and data/support actions.
- Settings grouped into AUDIO, GAMEPLAY & DISPLAY, and DANGER ZONE; reset requires confirmation.
- Credits grouped into 3D ART & UI, MUSIC & SFX, and TOWN AMBIENCE.
- Five taps on the build footer opens the hidden Dev/Test Drawer with test and performance toggles.

### 3. MY TEAM and MY SQUAD (portrait)
- MY TEAM: front/back 2.5D preview, IDENTITY/UNIFORM/TRAILS tabs, paired team name/logo controls, town unlock hints, sticky SAVE & EQUIP.
- MY SQUAD: separate CAP and PTS badges; upgrade buttons show boost and cost; consolidate appearance and gear into STYLE & GEAR; retain ATTRIBUTES/STYLE & GEAR/CAREER tabs and sticky horizontal starter roster strip.

### 4. GOALS & STATS (portrait)
- Fixed header, trophy badge, CHALLENGES/ACHIEVEMENTS/TEAM STATS tabs, sticky CLOSE.
- Challenges use color-coded trail reward pills.
- Achievements show medals, counters, and progress bars.
- Team stats use the specified passing/rushing, receiving, and skill-moves card arrangement with a MY SQUAD > CAREER note.

### 5. Pre-game matchup and playbook (landscape)
- Atmospheric blurred team/town backdrops behind solid team badge cards; OVR pills below; matchup/mode and win condition above loading bar.
- Playbook category pills remain single-line; active play gets gold border; FLIP and CALL PLAY retain their specified treatments.

### 6. Pre-snap, in-match HUD, fumble (landscape)
- Unified matte scoreboard across match states, with field position/down, team logos/scores, star-play progress, play clock, first-to target, and circular pause.
- Pre-snap CHANGE PLAY/SHOW PLAY bottom-left; cyan HIKE bottom-right.
- Highlight only open receivers with green ring and OPEN pill; covered receivers stay muted.
- TURBO uses segmented radial stamina ring; HURDLE/DIVE use matte controls with gold border.
- Fumble contest bar centered in upper area with timer pill, clear of bottom-right A mash control.

### 7. Defense, sim, achievement toast, post-game
- Defense selection below scoreboard with STOP/BIG PLAY/TAKEAWAY rows in BLITZ/BALANCED/PREVENT cards.
- Defense sim status below scoreboard; hide offensive controls; play-by-play bottom-center and TAP TO SKIP at bottom-right.
- Achievement toast is non-blocking and bottom-center.
- Post-game portrait layout includes result/mode, team score, celebrating squad, rewards, and REMATCH/MENU actions.

## Initial repository audit

- The current `main/index.html` is a 2.2 MB single-file game build titled “Circuit Football TEST”.
- The ZIP supplied for the latest game build contains 68 files: `index.html`, 45 audio assets under `audio/`, and 22 model/data assets under `models/`.
- The ZIP's `index.html` Git blob SHA is `769a284d91013e324d96765b7a46dbdff5f76f30`, matching the blob currently present on `main`. This confirms that the main-branch HTML is byte-for-byte identical to the ZIP's HTML.
- The current `main` tree does not contain `audio/` or `models/`, while the HTML references those relative paths (for example, `audio/mus_r2.b935fef0.mp3`). These runtime dependencies must be restored to the branch before complete audio/model QA or deployment.
- The repository's recent Actions history is dominated by the separate NPC workstream. The latest observed browser QA run (#965) failed on commit `840bb23c3874eafc6000b2d39c71dbc17ba83388`; it is not a UI-overhaul validation and must not be treated as a result for this branch.

## Current implementation checkpoint

- Stage 1 foundation exists in `ui-overhaul.css`, linked from `index.html`.
- Added shared semantic tokens and restrained matte styling for the Overworld town/progress pill, MENU control, and contextual A-button ring. Existing DOM IDs and pointer handlers were retained.
- The branch history records static JavaScript syntax validation for all five inline script blocks. I independently re-ran `node --check` against all five non-empty inline script blocks in the supplied ZIP HTML; all passed. This validates script syntax only, not browser behavior or visual quality.
- No browser render or visual approval has been completed.

## Work sequence

1. Complete baseline dependency restoration: add the exact `audio/` and `models/` files from the supplied ZIP without modifying their contents; verify paths and hashes.
2. Build a screen/state inventory from the current implementation and map each handoff requirement to its existing DOM/CSS/JS hooks.
3. Implement the global tokens and shared panel/control primitives, then the portrait overworld/menu/team/goals surfaces.
4. Implement landscape pre-game/playbook and in-match/defense surfaces.
5. Implement post-game presentation and verify transitions.
6. Run automated checks and real browser QA in portrait and landscape; inspect screenshots and test save/gameplay regressions.
7. Prepare a review package for independent Claude review, then wait for owner approval before calling the overhaul complete.

## Guardrails

- Do not replace the game with static mockups.
- Do not remove existing gameplay controls or state transitions to make a screenshot match.
- Do not invent or substitute missing model/audio assets.
- Do not update golden snapshots without explicit owner authorization.
- Record commit SHA, test evidence, visual inspection, review status, and owner approval separately.
