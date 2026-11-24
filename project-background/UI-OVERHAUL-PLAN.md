> **Current handoff:** [UI Overhaul Implementation Summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md). The detailed, current status and next actions live there. This plan below preserves the original design inventory and historical planning notes; older status text should not override the implementation summary.

# Circuit Football RPG — UI Overhaul Workstream

## Status

- Working branch: `UI-Overhaul`
- Baseline: current `main` at the time this branch was created
- UI handoff source: `Circuit Football — UI Overhaul Handoff Spec.docx` (14 pages; supplied in the project conversation)
- Implementation status: Stage One art-direction correction is implemented across Overworld, menu, settings, credits/developer drawer, playbook and match screens. Latest verified implementation commit: `d980f2e533de7d5bdfe55c7df98a593da7af8aee`.
- Browser QA: [Run #114](https://github.com/tinytime/Tinytime.github.io/actions/runs/45438679781), **110/110 passed**, with 28 screenshots retrieved and inspected.
- Internal visual assessment: approximately 7.2/10; the requested 6.5+/10 Stage One target is provisionally met. This is not independent approval.
- Independent Claude review: pending. Owner approval: pending. Do not begin Stage Two until the owner approves the direction.

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


## UI Overhaul progress update — 2026-11-24

Stage 2 (Overworld Menu / Settings / Credits) has been implemented on `UI-Overhaul`:
- Functional MENU / SETTINGS / CREDITS tabs with keyboard arrow navigation and ARIA roles.
- Current-goal card reads the existing overworld objective.
- Existing navigation, save-code, feedback, settings and reset controls are moved into the new grouped panels without replacing their DOM nodes or original handlers.
- Existing build footer is retained with its original click behavior; five taps reveal the developer/test drawer.
- The new behavior module is loaded from `index.html`; the UI stylesheet is loaded in the document head.

Static validation at the implementation checkpoint passed: five existing inline scripts and the new menu module compile; CSS brace counts balance; both assets are linked. Browser rendering and interaction QA remain pending, and no visual approval is claimed. The exact `audio/` and `models/` runtime assets are still absent from the branch, preventing full-fidelity gameplay QA.

Latest branch commit at this update: `77d0933cf6dfd8dd29315478b1e011e8f11510cf`.


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


## Runtime dependency restoration — verified 2026-11-24

The owner has restored the runtime asset directories on `UI-Overhaul`. The current tree now contains:
- `audio/`: 45 audio files (44 MP3 and 1 WAV).
- `models/`: 22 model/data TXT files.

Static reference audit against the current `index.html`:
- All 45 referenced audio filenames resolve to files in the lowercase `audio/` directory.
- All 22 model/data filenames resolve to files in the lowercase `models/` directory.
- No missing referenced runtime assets were found.
- Case matches the relative paths embedded in the game HTML.

Current QA checkpoint:
- Current branch HEAD at audit start: `efcf75eb5bcf0573fcb0d15b6f6439d48346c48b`.
- Five existing inline JavaScript blocks compile using the JavaScript parser.
- The new `ui-overhaul-menu.js` compiles.
- All element IDs referenced by the menu module exist in `index.html`.
- CSS brace counts balance (78 opening / 78 closing).
- `main` remains at `36830922fa5b99922ce583bcf3888cb297bad03c`; this QA pass did not change it.
- The repository's visible recent Actions runs belong to `npc-granny-baseline-overhaul`; none is a UI-Overhaul browser run.

Remaining QA limitation:
- A real Chromium browser render, screenshot inspection, and interaction pass have not been completed. The available repository browser QA script is hard-wired to the older `VaporCity_HD2D_Hybrid_Test.html` fixture, which is not the current `index.html` game entry point. No visual approval is claimed.
- Next step: adapt or add a UI-Overhaul-specific browser QA harness targeting `index.html`, then inspect menu/settings/credits in portrait and landscape and exercise save, reset, and return-to-town flows. Do not change golden snapshots.


## Current UI-Overhaul QA checkpoint — 2026-11-24

The working branch is UI-Overhaul, current HEAD 1c57d2457b468a266d410984c2fe0898574f5baa. The latest retrieved runs (#15 and #16) both failed before menu tests because the real #owMenu control was hidden. The harness startup sequence was corrected to capture startup screenshots and computed-style/ancestor diagnostics, use the existing SG.owShow() helper before clicking when necessary, wait for actual visibility, and click once. Commits: 1fc422e, 62bb843, 1c57d24.

The corrected Actions run and diagnostic screenshots still need to be retrieved and inspected. No browser pass or visual approval is claimed. Next: inspect the startup diagnostics, correct the real game-entry sequence if needed, then complete the menu interaction and portrait/landscape visual QA. Do not begin MY TEAM / MY SQUAD until the menu stage is green and the owner has reviewed its direction. No golden snapshots were changed.


### Documentation-only follow-up

The status notes above were recorded in three sequential documentation commits: summary ac0e4298c420696323d4918233971ee0aefd8b39, workstream README a05c5317c1ed2a216197c62654483177dfecf3f1, and plan 02e447b4cdce53b437db56567c85fe5870906464. The verified current branch HEAD is now 02e447b4cdce53b437db56567c85fe5870906464; these commits only update documentation. The QA harness/code commit awaiting browser evidence remains 1c57d2457b468a266d410984c2fe0898574f5baa.


## Stage 2 — Overworld Menu / Settings / Credits — QA passed (2026-11-24)

**Tested commit:** `d4c1952a45f467a891f1341c2f0597fde812869c`  
**GitHub Actions:** [UI Overhaul Browser QA #37](https://github.com/tinytime/Tinytime.github.io/actions/runs/45419632794)  
**Evidence artifact:** [ui-overhaul-browser-qa](https://github.com/tinytime/Tinytime.github.io/actions/runs/45419632794/artifacts/14932584439)

The exact branch commit was tested in GitHub Actions with Chromium and the repository's local HTTP asset server. **50 checks passed; zero failures, page exceptions, console errors, or same-origin HTTP failures.**

Coverage included:
- Actual Overworld entry, menu open/close, return-to-town, and reopen behavior.
- MENU / SETTINGS / CREDITS switching and keyboard arrow navigation.
- Current objective, progression controls, Playbook overlay and category filtering.
- Music/effects toggles, volume input, haptics, runner camera, lite effects, and LOW / MED / HIGH resolution selection with restoration of the original setting.
- Reset confirmation, explicit confirmation gating, and cancel behavior.
- All three credits groups, five-tap developer drawer, and retained test/performance controls.
- Portrait 390×844 and landscape 844×390 layout fit, sticky return button, and tab visibility.
- Successful HTTP 200 requests for a representative audio file and model file.

Asset verification on the tested branch: 45 audio files and 22 model files are present; all 45 direct asset references and all 22 model references resolve. No golden snapshots were changed.

### Visual inspection notes

The Actions artifact screenshots were inspected for portrait menu, portrait settings, portrait credits/developer drawer, landscape menu, desktop menu, desktop settings, desktop credits/developer drawer, and Playbook. The three-tab menu and settings are visually coherent at the tested sizes; the developer drawer remains scrollable in portrait and fully inspectable in desktop landscape.

### Remaining scope

This is **Stage 2 approval evidence only**, not approval of the complete UI overhaul. The next handoff section is **My Team & My Squad** (section 3). Later goals/stats, match/playbook, in-match HUD, defense, toast, and post-game screens remain to be implemented and tested. The Overworld A-button contextual action sub-label is also still outstanding.



### Portrait reset-confirmation evidence refinement — 2026-11-24

Run #38 initially passed its checks, but visual inspection caught that the screenshot labelled as the portrait reset confirmation had been captured after cancellation. The QA sequence was corrected to capture the open dialog before cancelling and to assert the modal fits inside the 390×844 viewport.

- Correction commit: `dca37967819c83e62a8442ce29b1c6ba6bbaef5b`.
- [Run #39](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694): **SUCCESS, 51/51 checks**, exact commit above.
- [Evidence artifact](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694/artifacts/14934375326), including the inspected `portrait-reset-confirm.png`.
- The reset flow was cancelled; no progress reset was performed.


## Latest verification — Stage 2 menu and reset-modal evidence (2026-11-24)

**Tested commit:** `dca37967819c83e62a8442ce29b1c6ba6bbaef5b`  
**GitHub Actions:** [UI Overhaul Browser QA #39](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694)  
**Evidence artifact:** [ui-overhaul-browser-qa — artifact 14934375326](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694/artifacts/14934375326)

Run #39 completed successfully: **51/51 browser checks passed**, with no failures, uncaught page exceptions, console errors, or same-origin HTTP errors. It extends Run #37 with an explicit portrait reset-confirmation geometry check and a screenshot of the open modal. At 390×844, the dialog measured 350×190.7 px at x=20, y=326.7 and fit fully within the viewport. Cancel closed it without resetting progress.

The artifact contains 14 PNG screenshots plus the JSON report and diagnostics. The open reset dialog screenshot was retrieved and visually inspected: backdrop blur/dimming, warning heading, explanatory copy, distinct Cancel and Reset actions, and centered mobile fit all render as intended.

The exact tested branch contains 45 referenced audio files and 22 referenced model files; every direct reference resolves. Representative browser HTTP probes also returned 200. `main` remains at `36830922fa5b99922ce583bcf3888cb297bad03c` and was not modified.

**Approval gate remains unchanged:** Stage 2 is implemented, automated-tested, and internally visually inspected, but is not owner-approved or independently reviewed. Do not start MY TEAM / MY SQUAD until the owner has reviewed and explicitly approved the menu direction.


## Owner art-direction correction checkpoint — 2026-11-24

The first UI pass was graded 3.2/10. The Stage One correction is implemented on `UI-Overhaul`: a full-viewport Overworld HUD treatment with GOAL strip and contextual A label; stronger centered 2×2 arcade menu hierarchy; compact grouped credits/dev utility presentation; and visual treatment for the real in-match playbook sheet (gold selected card, FLIP and cyan CALL PLAY). The live game controls and `callPlay()` behavior are retained.

Implementation details, exact commits and QA status are recorded in [UI Overhaul Implementation Summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md). Browser QA has been extended to the Overworld and pre-game play-calling flow, but the new run/artifact has not yet been verified. The prior 51/51 Run #39 does not validate these edits. Target for the next visual review is 6.5+/10; live-play, defense, fumble, achievement-toast and post-game screenshots remain required before visual sign-off.


## Reconciled Stage One correction and gameplay QA scope — 2026-11-24

The live Overworld menu module owns the status pill, GOAL strip and contextual A-button composition; duplicate static HUD markup was removed. The real in-match play-calling sheet now has the selected gold card, FLIP and cyan CALL PLAY styling. The browser harness has been extended through pre-game, playbook, pre-snap, live play, fumble/turnover, defense selection, achievement toast and post-game.

See [UI Overhaul Implementation Summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) for the exact current branch checkpoint, commits and QA state. The expanded Actions result/artifact has not yet been retrieved and inspected; the earlier Run #39 does not validate these changes. Actual screenshot inspection, independent review and owner approval remain outstanding. Target for the next visual review is 6.5+/10.


Latest QA harness checkpoint: 68 assertions, including rendered-color checks for both cyan CALL PLAY and cyan HIKE actions. The harness covers Overworld, matchup, playbook, pre-snap, live play, fumble, defense selection, achievement toast and post-game. The latest harness commit is `a60adc9d6621b4272e9290c482a07ec91771d718`. Actions result/artifact retrieval and screenshot inspection remain pending; see the implementation summary for the exact state.


Latest QA harness commit: `ad2cd22c26005f7e244a18f28a6ea7c88961d9e9`, with 76 assertions and a corrected cyan HIKE text-contrast assertion. The workflow result/artifact is not yet retrieved; assertions are not reported as executed until Actions confirms the exact tested SHA. See the implementation summary.


## Latest verified Stage One checkpoint — 2026-11-24

This section supersedes older implementation and QA status notes elsewhere in this historical plan. The [Implementation Summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) remains the detailed source of truth.

- Verified implementation commit: `d980f2e533de7d5bdfe55c7df98a593da7af8aee` on `UI-Overhaul`.
- Browser QA: [Run #114](https://github.com/tinytime/Tinytime.github.io/actions/runs/45438679781), **110/110 passed**. Artifact `ui-overhaul-browser-qa` contains 28 PNG screenshots.
- Visual inspection confirmed the full-bleed Overworld HUD; centered 2×2 menu cards, UPG badge and crimson/pink town CTA; settings hierarchy; concise grouped credits with runtime diagnostics moved into the hidden developer drawer; playbook diagrams, category filters, gold selection, FLIP and cyan CALL PLAY; and the required pre-game, playbook, pre-snap, live, defense, fumble, achievement-toast and post-game states.
- HIKE activation now supports pointer-up and keyboard activation. The sprite-readiness retry is bounded by elapsed time rather than callback count, avoiding headless timer throttling stalls.
- The achievement toast is positioned clear of the play-by-play ticker and cleared when post-game begins.
- Internal visual assessment: approximately **7.2/10**, provisional and above the owner's 6.5+ target. Claude's independent review and final owner approval are still required. Do not start MY TEAM / MY SQUAD Stage Two until approval.


## 2026-11-24 — Stage One complete-scope review checkpoint

The live Stage One correction baseline is `95c7a8120a077aab4ec8fd23adf21890ca9fc7c7`. Browser QA Runs #192–#194 passed 141/141, 141/141 and 142/142 respectively; Run #194 artifact `14951189647` was retrieved and inspected. The review scope includes the Stage One in-game HUD/state screens as specified by the original seven-section handoff and the owner's clarification; do not omit pre-game, pre-snap, live play, fumble, defense selection/simulation, achievement toast or post-game. The updated [Claude review package](UI-OVERHAUL-CLAUDE-REVIEW-PACKAGE.md) identifies the exact curated 20-image set. Stage Two remains held pending owner approval.
