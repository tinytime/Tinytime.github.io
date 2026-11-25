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


## Current checkpoint — 2026-11-24

- Current UI-Overhaul HEAD: 1c57d2457b468a266d410984c2fe0898574f5baa.
- The last two retrieved browser runs (#15 and #16) both fail before menu interaction because #owMenu is present but hidden. Their 427-byte artifacts contain no usable screenshots.
- The QA harness now captures startup screenshots and computed visibility/ancestor diagnostics, calls the existing SG.owShow() entry helper before attempting the HUD click when necessary, and clicks the real visible opener once. Diagnostic files are written before the visibility wait so failures remain inspectable.
- Commits: 1fc422e, 62bb843, 1c57d24. No gameplay logic, main branch, or golden snapshots changed.
- The corrected run and its screenshots have not yet been retrieved. Browser QA and visual approval remain pending. See project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md for the exact next steps.


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



## Latest verified checkpoint — 2026-11-24 14:57Z

- Latest tested implementation commit: `d4c1952a45f467a891f1341c2f0597fde812869c`.
- GitHub Actions [Run #37](https://github.com/tinytime/Tinytime.github.io/actions/runs/45419632794) passed **50/50** browser QA checks on that exact commit. Evidence artifact: [14932584439](https://github.com/tinytime/Tinytime.github.io/actions/runs/45419632794/artifacts/14932584439).
- Verified menu opening, seven retained primary controls, Playbook (nine plays and category filter), all three tabs, settings controls and LOW/MED/HIGH resolution state changes, reset-cancel flow, music/volume interaction, Credits, developer drawer, runtime audio/model HTTP 200 probes, portrait/landscape menu fit, return-to-town and menu reopen. No same-origin HTTP errors or uncaught page exceptions.
- ChatGPT retrieved and visually inspected the real desktop/portrait menu, settings, credits/developer, Playbook, landscape menu and overworld return screenshots. The earlier `nullnull` artifacts are gone.
- Status: menu implementation is automated-tested and internally visually inspected. Claude independent review and owner approval are still pending. MY TEAM / MY SQUAD and later handoff screens remain unstarted pending owner approval of this menu direction.
- See [UI Overhaul Implementation Summary](../project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) for the detailed 50-check report, screenshot inventory, QA history and next action.



### Latest evidence refinement — Run #39 (2026-11-24)

- [Run #39](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694) passed **51/51** on `dca37967819c83e62a8442ce29b1c6ba6bbaef5b`.
- The portrait reset-confirmation screenshot was corrected to capture the dialog while it is open (before cancelling), and the harness now asserts that the dialog geometry fits within 390×844. The actual screenshot was inspected and confirms both actions are fully visible.
- Artifact: [14934375326](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694/artifacts/14934375326).
- Reset was cancelled; no destructive reset was executed. Owner approval is still pending.


## Latest verification — Stage 2 menu and reset-modal evidence (2026-11-24)

**Tested commit:** `dca37967819c83e62a8442ce29b1c6ba6bbaef5b`  
**GitHub Actions:** [UI Overhaul Browser QA #39](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694)  
**Evidence artifact:** [ui-overhaul-browser-qa — artifact 14934375326](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694/artifacts/14934375326)

Run #39 completed successfully: **51/51 browser checks passed**, with no failures, uncaught page exceptions, console errors, or same-origin HTTP errors. It extends Run #37 with an explicit portrait reset-confirmation geometry check and a screenshot of the open modal. At 390×844, the dialog measured 350×190.7 px at x=20, y=326.7 and fit fully within the viewport. Cancel closed it without resetting progress.

The artifact contains 14 PNG screenshots plus the JSON report and diagnostics. The open reset dialog screenshot was retrieved and visually inspected: backdrop blur/dimming, warning heading, explanatory copy, distinct Cancel and Reset actions, and centered mobile fit all render as intended.

The exact tested branch contains 45 referenced audio files and 22 referenced model files; every direct reference resolves. Representative browser HTTP probes also returned 200. `main` remains at `36830922fa5b99922ce583bcf3888cb297bad03c` and was not modified.

**Approval gate remains unchanged:** Stage 2 is implemented, automated-tested, and internally visually inspected, but is not owner-approved or independently reviewed. Do not start MY TEAM / MY SQUAD until the owner has reviewed and explicitly approved the menu direction.


## Stage One art-direction correction — 2026-11-24

Owner feedback: 3.2/10 overall; next-round target 6.5+/10. The UI correction now adds the Overworld GOAL strip and contextual A-action label, improves the HUD/menu composition, strengthens menu card and UPG hierarchy, tightens credits/dev drawer presentation, and styles the actual in-match play-calling sheet. The browser QA harness now launches a real match and checks selected play, FLIP, CALL PLAY and pre-snap transition.

Exact commits and current evidence status: `project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md`. QA and updated screenshot inspection are pending; the prior Run #39 is not evidence for this correction pass. No visual or owner approval is claimed.


## Reconciled correction and gameplay QA — 2026-11-24

The live menu module now owns the Overworld goal/status/A-button markup, with duplicate static HUD markup removed. The real play-calling sheet has the gold selected-card, FLIP and cyan CALL PLAY treatment. The browser harness covers pre-game matchup, playbook, pre-snap, live play, fumble/turnover, defense selection, achievement toast and post-game using query-gated QA hooks.

The expanded Actions result and screenshot artifact are not yet retrieved/verified. Do not use Run #39 as evidence for this correction. See `project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md` for exact commits, current status and next steps. Visual inspection, Claude review and owner approval remain pending.


Latest browser harness checkpoint: 68 assertions, covering Overworld, pre-game, playbook, pre-snap, live play, fumble, defense selection, achievement toast and post-game. It checks the actual cyan CALL PLAY and HIKE render colors. Latest harness commit: `a60adc9d6621b4272e9290c482a07ec91771d718`. Actions result/artifact retrieval and visual inspection are still pending; consult the implementation summary for the current gate.


Latest QA harness commit: `ad2cd22c26005f7e244a18f28a6ea7c88961d9e9` (76 assertions; corrected cyan HIKE text contrast). The Actions result and screenshot artifact are still pending retrieval. Do not describe the assertions as passed until the exact run is confirmed. See the implementation summary.


## Stage-one correction — latest QA harness checkpoint (2026-11-24)

The current `UI-Overhaul` branch tip is `d9d22506c87474c775ee02fe05ec0f04d6085e95`. The browser harness now contains **82 assertions**, including actual two-row menu-card geometry, portrait/landscape layout fit, credits/developer visibility, full-viewport Overworld checks, real match/playbook/pre-snap/live-play states, fumble/turnover, defense selection and the selected-call defense simulation, achievement toast, and desktop/portrait post-game fit.

The current harness captures a dedicated `match-defense-simulation.png` after choosing BALANCED and asserts that the offensive controls are hidden during the simulation. It also captures desktop and portrait credits before/after opening the developer drawer.

**Important:** the 82 assertions are committed source, not a verified pass. The push-triggered Actions run ID/result/artifact for this commit has not yet been retrieved. The previous Run #39 (51/51) predates the art-direction correction and is not validation of this version. Screenshot inspection, Claude review and owner approval remain pending.

See [the implementation summary](../project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) for current source blob SHAs, exact coverage, evidence status and next steps.


### Latest QA precision pass — 2026-11-24

- Current branch tip: `2abcadf90dfef17afeb2634fd5d8c8f278abb4ca`.
- The browser harness now has **90 assertions**. New checks cover 1440px desktop centering/max-width, UPG visibility, DATA & SUPPORT grouping, crimson/pink BACK TO TOWN semantics, grouped credits, 360px portrait overflow/title collision, and the developer drawer's 220px height cap.
- Added screenshot: `narrow-menu-360.png`.
- QA source blob: `17dbecd37fcc2f6613505b7f6df36d00a0805350`.
- **No Actions pass is claimed:** the push-triggered run ID/result/artifact has not been retrieved, and the updated screenshots have not been visually inspected. The previous Run #39 predates the correction pass.

The implementation summary remains the source of truth for current status and approval gates.


## Latest verified checkpoint — 2026-11-24

- Latest verified implementation commit: `d980f2e533de7d5bdfe55c7df98a593da7af8aee` on `UI-Overhaul`.
- Latest browser QA: [Run #114](https://github.com/tinytime/Tinytime.github.io/actions/runs/45438679781), **110/110 passed**, artifact ID `14941759413`, 28 screenshots.
- Stage One art-direction corrections are implemented and internally visually inspected across Overworld, menu, settings, credits/developer drawer, playbook and all requested match states. Internal visual assessment is approximately 7.2/10, provisionally above the 6.5+ target.
- Sound/model diagnostics and full build metadata are now hidden in the developer drawer; the primary Credits page contains only three grouped attribution cards and a compact BUILD INFO trigger.
- HIKE input supports pointer-up and keyboard activation. Sprite readiness uses an elapsed-time bound. The achievement toast does not obscure the ticker and clears on post-game.
- Claude independent review and owner approval remain pending. Do not start Stage Two before approval.

See [the implementation summary](../project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) and [Claude review package](../project-background/UI-OVERHAUL-CLAUDE-REVIEW-PACKAGE.md) for the complete evidence and next step.


### Round 5 — Fumble QA follow-up (2026-11-24)

Run #260 failed three Fumble assertions on `01e96cdc2f2398d42d23b81981bd4999062520b4`: the viewport-centered bar overlapped the A mash button, the timer was offset from the bar, and the fill-gradient assertion inspected the wrong computed CSS property. The workflow uploaded artifact `14977317527`; no page/console/HTTP errors were reported.

The branch now positions the meter in the usable left field lane (40vw center, 55vw width) to clear the right-side A mash control and aligns the timer to it. The QA harness now checks the actual cyan-to-gold backgroundImage gradient and the timer's real navy/gold colors. QA commit `d8730820367ce5914051180a1200bfbbf8f1ca8e`; fresh browser verification and screenshot inspection remain pending. Stage Two is still held; no golden snapshots were changed.


## Stage Two — MY TEAM & MY SQUAD started (2026-11-24)

The owner approved Stage One and authorized Stage Two. Initial implementation now restyles the existing MY TEAM and MY SQUAD screens without replacing their underlying save, renderer or progression systems. MY SQUAD is exposed in the menu; its tabs are ATTRIBUTES / STYLE & GEAR / CAREER, with gear in a nested editor; PTS and CAP are separate badges. The team screen presents its existing editor as SAVE & EQUIP. Browser QA now exercises both portrait screens and captures dedicated screenshots. The exact Stage Two Actions result and screenshot inspection are pending. See the implementation summary for the commit chain and acceptance criteria.


Stage Two follow-up: MY TEAM's name/logo are paired in a responsive identity card, MY SQUAD uses explicit PTS/CAP badges, and the Stage Two browser suite checks the identity and nested gear flow. Fresh Actions verification and screenshot inspection remain pending. See the implementation summary for exact commit SHAs.


Stage Two QA Run #275 is in progress against `a217742d20b36e626d9b43a327df1fcebe786606`; Playwright/Chromium installation is underway. No browser result or artifact is available yet. [Monitor Run #275](https://github.com/tinytime/Tinytime.github.io/actions/runs/45517810094).


## Stage Two visual QA follow-up — 2026-11-25

Run #291 passed 212/212 automated assertions on code commit `381363ff1caae36c080b7a9f3cf73af6f4a77046`, but internal inspection of artifact [14981780185](https://github.com/tinytime/Tinytime.github.io/actions/runs/45522385402/artifacts/14981780185) found that the MY TEAM and MY SQUAD CSS was not reaching the live screens. The screens are siblings of `#app`, while the Stage Two selectors incorrectly required them to be descendants. The screenshots therefore retained legacy colors, MY TEAM's tabs were undersized, SAVE & EQUIP was not bottom-pinned, and PTS/CAP appeared compressed.

- CSS root-selector correction: `71e1a20af05483d45ea832d0193e68d9f557b1fc` (116 Stage Two selectors corrected).
- QA hardening: `2cd3b457eca4b36481298a3d6dfab79e95fa0573` (adds computed-style and fixed-action assertions).
- Run #295 passed 216/216 against the corrected MY TEAM / MY SQUAD CSS. Artifact 14982981067 was downloaded; the refreshed MY TEAM and MY SQUAD screenshots were inspected.
- Run #296 exposed a real stale field-banner defect in defense simulation. CSS commit `02fbc1d9761812fbd49e0815574f1bf82c1e40a3` corrected the selector scope. Run #297 passed 216/216 against that exact commit; artifact 14983701764 was downloaded and inspected. The defense-simulation screenshot confirms the old banner is suppressed, and the dedicated parent STYLE & GEAR screenshot shows the name, skin tone, jersey number and gear-entry controls.
- Stage Two remains in progress pending final package reconciliation, Claude independent review, and explicit owner approval. No golden snapshots or provenance were changed.


## Run #297 verification — 2026-11-25

- [Run #297](https://github.com/tinytime/Tinytime.github.io/actions/runs/45527525193) passed **216/216** browser assertions on `02fbc1d9761812fbd49e0815574f1bf82c1e40a3`.
- Artifact [14983701764](https://github.com/tinytime/Tinytime.github.io/actions/runs/45527525193/artifacts/14983701764) was retrieved. The defense-simulation screenshot confirms the duplicate/stale field banner no longer overlays the possession pill. The dedicated MY SQUAD STYLE & GEAR parent-panel screenshot confirms the name field, skin swatches, jersey-number controls and gear/trails entry action.
- The artifact also contains the broad Stage One and match-flow regression screenshots, including Fumble; the Fumble meter and A control remain distinctly separated.
- Stage Two is still awaiting independent Claude review and owner approval. See `project-background/UI-OVERHAUL-STAGE-TWO-REVIEW-PACKAGE.md` and the implementation summary for full evidence and remaining gates.


## Latest Stage Two reviewer-correction checkpoint — Run #313 (2026-11-25)

Independent Stage Two review findings have been implemented on `UI-Overhaul`:

- MY TEAM now has a header BACK control, live UPG status badge, and a full-width stacked PICK LOGO action. SAVE & EQUIP remains available and bottom-pinned.
- MY SQUAD upgrade costs show the `P` point unit. VISOR and ARM SLEEVES are inline beneath JERSEY NUMBER in STYLE & GEAR; the nested BACK TO STYLE step is removed.
- The menu is a compact 2×2 grid: gold MY SQUAD (subtitle “Starters & upgrades”), MY TEAM, PLAYBOOK, GOALS & STATS. DATA & SUPPORT and BACK TO TOWN fit at 390px and 360px portrait widths.

Verification:
- Exact tested commit: `3be8785d5a250d65430f7c50571d5d0d428a9d36`.
- [Run #313](https://github.com/tinytime/Tinytime.github.io/actions/runs/45533380570): **221/221 passed**, zero page/console/same-origin errors.
- Artifact [14985344956](https://github.com/tinytime/Tinytime.github.io/actions/runs/45533380570/artifacts/14985344956) retrieved; updated MY TEAM, MY SQUAD, portrait/desktop/narrow menu, Fumble and defense-simulation screenshots visually inspected.
- Stage One remains owner-approved. Stage Two implementation and independent-review corrections are complete and browser-tested; **owner final approval is pending**. Do not begin Stage Three until approval.

The implementation summary and Stage Two review package are the source of truth for detailed criteria and evidence. No golden snapshots or snapshot provenance were changed.
