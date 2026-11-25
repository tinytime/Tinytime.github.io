# Circuit Football RPG — UI Overhaul Implementation Summary

**Purpose:** durable restart/handoff document. A new ChatGPT session should read this file first, then inspect the live branch before changing anything.

- Repository: `tinytime/Tinytime.github.io`
- Working branch: `UI-Overhaul`
- Game entry point: `index.html`
- Design authority: owner-supplied **Circuit Football — UI Overhaul Handoff Spec** (14-page Gemini handoff, reattached by the owner on 2026-11-24)
- Latest application/QA commit tested: `f26e48986376c03ab07cb286c176660c8ff8eb65`; Run #397 passed 259/259 browser assertions, 0 page exceptions, 0 console errors and 0 same-origin HTTP failures. Artifact `15035343585`; key Stage Four screenshots were visually inspected. Documentation-only commits now bring branch HEAD to `164704981a919698ce75757477216e642f2b1903` (verify live HEAD before further work).
- Stage One: owner-approved.
- Stage Two: MY TEAM and MY SQUAD are implemented, independently reviewed, corrected and owner-approved (owner decision recorded in the project conversation). Run #322 passed 224/224; uniform and trail screenshots were visually inspected.
- Stage Three: GOALS & STATS is implemented, automated browser-tested and internally visually inspected on the exact code/QA commit above. **Owner-approved on 2026-11-25.** Stage Four is authorized and in progress.

## 1. Read this first in a new chat

When the owner says “review the implementation summary,” do the following:

1. Read this file: `project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md`.
2. Read `project-background/UI-OVERHAUL-PLAN.md` and `ui-overhaul/README.md`.
3. Read the 14-page Gemini handoff attached to the project conversation if available. It is the design authority; this summary is the implementation/status authority. If it is not available in the new conversation, do not pretend to have inspected the embedded mockups—use the linked specification details below and ask the owner to reattach it only if visual reference inspection is essential.
4. Verify the current `UI-Overhaul` branch HEAD, latest commits, current `index.html`, `ui-overhaul.css`, `ui-overhaul-menu.js`, QA harness, workflow, and latest UI-Overhaul Actions runs. This file is a restart map, not a substitute for live repository verification.
5. Continue from **Section 8 — Immediate next actions**. Stages One–Three are owner-approved. The Stage Four polish batch has passed internal QA and visual inspection but still awaits owner review/approval. The pre-game matchup redesign is explicitly deferred until the owner authorizes it.
6. Keep all changes on `UI-Overhaul`. Do not modify `main`, NPC workstream files, or golden snapshots.

## 2. Overall implementation status

Stage One (Overworld HUD, menu/settings/credits, playbook and match-flow surfaces) is owner-approved. Stage Two (MY TEAM and MY SQUAD) is implemented and its independent-review correction round is complete.

Stages One–Three are owner-approved. Stage Four's current owner polish batch passed Run #397 with **259/259 browser assertions** and received internal visual inspection of key screenshots. It awaits owner review/approval; do not report the full UI overhaul as complete. The pre-game matchup redesign is deferred until the current batch is reviewed and the owner explicitly authorizes that work.

## 3. Design contract from the Gemini handoff

Preserve the handoff's seven-section structure and terminology.

### Global design system
- Main matte charcoal/navy surface: `#131620`; inner/inactive pills: `#1C2130`.
- Gold `#F5B841`: selected/active tabs and cards, upgrade/points badges, secondary action borders.
- Cyan `#4DE1F2`: primary execution CTAs, active toggles, stamina/loading bars.
- Green `#34D399`: open receiver highlight and PREVENT defense border.
- Crimson `#EF4444`: BLITZ, fumble DEFENSE fill, reset-progress danger zone.
- Keep town accent reserved for the overworld A-button ring and town pill.
- 1–2px borders, 12–16px card radii, no heavy neon bloom on in-match HUDs.
- Respect safe-area insets, especially top controls and fixed bottom actions.

### Required screen groups
1. **Overworld HUD (portrait):** town/cleared/upgrade and MENU pills, goal strip, contextual A-button label (TALK / ENTER / FISH / PLAY).
2. **Overworld Menu (portrait):** fixed header, goal card, MENU / SETTINGS / CREDITS tabs, menu navigation and data/support, grouped settings, reset confirmation, credits cards, five-tap hidden developer drawer.
3. **MY TEAM & MY SQUAD (portrait):** 2.5D front/back preview; team identity/uniform/trails; paired team name/logo; unlock hints; SAVE & EQUIP; squad CAP and PTS badges; attribute upgrade boost/cost labels; ATTRIBUTES / STYLE & GEAR / CAREER tabs; pinned starter roster strip.
4. **GOALS & STATS (portrait):** CHALLENGES / ACHIEVEMENTS / TEAM STATS tabs; trail reward pills; medal counters/progress; passing/rushing, receiving and skill-move stats.
5. **Pre-Game Matchup & Playbook (landscape):** atmospheric matchup backgrounds and team cards; category pills; gold selected-play border; cyan CALL PLAY.
6. **Pre-Snap, In-Match HUD & Fumble (landscape):** unified scoreboard; gold-bordered CHANGE PLAY / SHOW PLAY; cyan HIKE; only open receivers highlighted; segmented TURBO stamina ring; uncluttered HURDLE/DIVE; fumble meter kept clear of A mash control.
7. **Defense Selection, Defense Sim, Achievement Toast & Post-Game:** defense panel below scoreboard; aligned STOP/BIG PLAY/TAKEAWAY stats; hide offense controls during defense sim; non-blocking toast; portrait result/rewards/actions.

The uploaded document's mockups are important visual references as well as the text requirements. Page 2 shows the Overworld HUD; pages 3–4 show the three menu states; page 5–6 show MY TEAM and MY SQUAD; pages 6–7 show GOALS & STATS; pages 8–9 show matchup/playbook; pages 10–11 show in-match/fumble; pages 12–14 show defense/sim/toast/post-game.

## 4. Repository architecture and preservation rules

- `index.html` is a large single-file application containing the existing game markup, styles, state, rendering and interaction logic.
- The game is a hybrid: canvas playfield plus DOM-based HUD, overworld, controls, playbook and menu surfaces.
- Key existing landmarks include `#app`, `#cv`, `#hud`, `#sheet`, `#world`, `#owTop`, `#owMenu` and `#menu`.
- The implementation strategy is to add isolated presentation CSS and a narrowly scoped menu behavior module while retaining the existing DOM nodes and their original handlers/state.
- Do not rebuild game logic or replace controls with visual-only mockups.
- Preserve gameplay, save/progression, audio, model loading, accessibility and responsive behavior.
- Never refresh, replace, or approve golden snapshots without explicit owner authorization.

## 5. Current implementation

### Overworld HUD foundation
- `ui-overhaul.css` contains shared semantic tokens.
- The Overworld town/progress pill, MENU control and A-button ring received the initial matte styling.
- Existing DOM IDs and pointer handlers were retained.
- Safe-area-aware layout treatment was introduced for the menu shell.

### Overworld menu shell
Files:
- `index.html`
- `ui-overhaul.css`
- `ui-overhaul-menu.js`

Implemented behavior and content:
- Functional MENU / SETTINGS / CREDITS tabs, with keyboard left/right navigation and ARIA tab semantics.
- Current-goal card reads the live overworld objective.
- MENU group contains existing squad, team, upgrades and goals navigation plus feedback and save-code actions.
- SETTINGS groups existing music, effects, volume, haptics, runner camera, lite effects, resolution and reset controls.
- CREDITS groups 3D ART & UI, MUSIC & SFX and TOWN AMBIENCE using existing credit text.
- Existing game controls are moved intact rather than recreated, preserving their original event handlers and state.
- Existing build footer remains the five-tap trigger for the hidden developer/test drawer.
- Existing TEST/performance controls are retained in the developer drawer; the player-art toggle was moved there in a later correction.
- A reset confirmation dialog was added; do not trigger destructive reset in QA.
- The menu can be opened through the real overworld HUD MENU control and returned to the town.

### Runtime assets
- Owner restored the runtime asset directories to this branch.
- The branch tree at the last repository audit contained lowercase `audio/` and `models/` paths, matching the case-sensitive paths used by the game.
- The recorded inventory is 45 audio assets (44 MP3 and one WAV) and 22 model/data TXT files.
- The model/audio paths were normalized from capitalized folder names without changing the underlying asset blobs.
- Verify the current tree and references again before making asset claims.

## 6. Important implementation history

The branch has many small commits; the following are useful milestones, not a complete log:

- `992631b2a9e0514eb5b0915771c7c1fac84198b9` — initial shared design-token / Overworld HUD foundation.
- `3b844eb0e130583a30a3f9f91f77f55825d96409` — initial responsive menu presentation.
- `2b19d5a4f316c4fe5b83afaf5c23cba2f272d0df` — tabbed menu styling.
- `eb7da1921cae89198452d722a405d14166ef2ac8` — menu behavior module.
- `bf80febdb3cc3602d29fceb98cdd29a57f74f983` — load behavior module from `index.html`.
- `89e4264f8801836dd8c350f0fe0da8d11579a8a1` — lowercase runtime asset paths.
- `2473a93a28580459894f4545d6f30e4b6a292b9d` — first dedicated browser QA workflow/harness checkpoint.
- `c68e877ad9b239cb06783fe7ee9d9327f1a5ad61` — move legacy TEST controls into hidden developer drawer.
- `be2b1a5d052c9aa0a457d6a485bcebdec758dc59` — keep tab navigation visible in menu layout.
- `5f70b1081fc36dccfec5e24ba22111468ebae975` and `0c4de5d6fb50fff4729a155070b6b32ff9530cc9` — open the live overworld menu through the HUD before browser interaction checks.
- `d64653a412aa45b9a1cf06617f8399c0711ba69f` — add reset confirmation and move player-art toggle into developer drawer.
- `e66cb4b9ee2930e4c0281327bebf740288737831` — style accessible progress-reset confirmation modal.

**Last verified HEAD before adding this handoff file:** `e66cb4b9ee2930e4c0281327bebf740288737831`. Recheck because adding this document and updating the project index will create new commits.

## 7. Browser QA: exact result and interpretation

Dedicated files:
- `.github/workflows/ui-overhaul-browser-qa.yml`
- `qa/ui-overhaul-browser-qa.mjs`

Workflow installs Node 20, Playwright and Chromium, then runs the harness against the local `index.html`. The harness attempts to exercise the live menu, navigation controls, objective, tabs, settings controls, credits, five-tap developer drawer, keyboard navigation, runtime asset fetches, portrait and landscape viewports, return-to-town behavior, same-origin HTTP failures and page exceptions. It is designed to save screenshots and JSON/Markdown evidence under `ui-overhaul-qa-output/`.

### First run
- GitHub Actions run: [#1 / 45414902765](https://github.com/tinytime/Tinytime.github.io/actions/runs/45414902765)
- Tested commit: `2473a93a28580459894f4545d6f30e4b6a292b9d`
- Result: **FAILED**.
- Chromium installed successfully; the game loaded, menu module initialized, and the harness opened the overworld menu.
- The run then timed out trying to click `[data-tab="settings"]`: Playwright resolved the Settings tab but reported it was not visible. This was the first concrete browser-discovered defect/visibility mismatch.
- The workflow's artifact-upload step also failed because the artifact name included a literal backslash before the commit SHA. No QA artifact was retained; do not claim screenshots were captured or inspected.
- The failure was not an audio/model fetch error or a game startup failure. The logs show the failure at the Settings-tab click.
- The harness had an extra redundant menu opener click after the menu had already been opened. Inspect and simplify this sequence if it is still present; test the intended real interaction rather than double-clicking the opener.

### Follow-up changes after the failed run
The branch subsequently advanced through commits that adjust tab visibility, open the menu through the live HUD before tests, move developer controls, and add/style the reset modal. These are code changes only. **They do not convert the failed run into a pass.** No fresh Actions run on the later HEAD was confirmed during this review.

### QA status at handoff
- Browser automation infrastructure: implemented.
- First browser attempt: failed at Settings-tab visibility.
- Artifact evidence from that run: unavailable.
- Newer follow-up code: not yet browser-tested.
- Screenshot visual inspection: not completed.
- Save/reset destructive-flow regression: not completed.
- Independent review: not performed.
- Owner approval: pending.

## 8. Immediate next actions

1. **Stage Three owner review / approval.** Present the GOALS & STATS implementation and Run #331 evidence. The exact tested code/QA commit is `da5a017b5d3914fd0e90bb8cba68bec93dfec37d`; the latest branch HEAD `92d1ff32cc950b01c273146dd01e007b5e500213` contains documentation-only updates. Do not mark Stage Three approved until the owner explicitly approves it.
2. **After Stage Three owner approval only**, proceed to the next unimplemented handoff section (pre-game matchup/playbook integration), first mapping its existing DOM/state and acceptance criteria.
3. Keep all changes on `UI-Overhaul`. Do not modify `main`, NPC workstream files, gameplay/save/progression behavior, or golden snapshots without explicit authorization.

### Stage Two correction round completed

- MY TEAM: added header BACK control and live UPG status badge; stacked PICK LOGO at full width above the emblem.
- MY SQUAD: cost labels now include the `P` unit (for example `+2 · 3P`); VISOR and ARM SLEEVES are displayed inline directly below JERSEY NUMBER, eliminating the nested BACK TO STYLE step.
- Menu: consolidated navigation into a gold MY SQUAD tile (subtitle “Starters & upgrades”), MY TEAM, PLAYBOOK and GOALS & STATS in a 2×2 grid. DATA & SUPPORT and BACK TO TOWN fit in portrait.
- Browser QA: [Run #315](https://github.com/tinytime/Tinytime.github.io/actions/runs/45534558797), 222/222 passed, zero page/console/same-origin errors. Artifact [14987300342](https://github.com/tinytime/Tinytime.github.io/actions/runs/45534558797/artifacts/14987300342).
- Actual screenshots inspected: `portrait-menu.png`, `desktop-menu.png`, `narrow-menu-360.png`, `my-team-portrait.png`, `my-team-uniform-portrait.png`, `my-team-trails-portrait.png`, `my-team-trails-bottom-portrait.png`, `my-squad-attributes-portrait.png`, `my-squad-style-gear-portrait.png`, plus Stage One regression captures `overworld-portrait.png`, `match-fumble-pile.png` and `match-defense-simulation.png`.
- No golden snapshots or provenance changed.
## Optional Stage Two polish — Run #322 (2026-11-25)

- Exact tested commit: `3fe58d3778fbee7b310b400dc9d1b9548264ba59`.
- [Run #322](https://github.com/tinytime/Tinytime.github.io/actions/runs/45536484337) passed **224/224 assertions**, with zero failed assertions, page exceptions, console errors or same-origin HTTP failures.
- Evidence [Artifact 14986404860](https://github.com/tinytime/Tinytime.github.io/actions/runs/45536484337/artifacts/14986404860) was downloaded and visually inspected.
- **MY TEAM > UNIFORM:** repository source confirms jersey/pants cut choices are intentionally non-functional in the current player-art renderer; saved values are preserved but have no rendered effect. Removed the orphaned JERSEY STYLE / PANTS STYLE headings and kept the controls hidden, replacing the empty space with the note: “JERSEY & PANTS CUTS ARE NOT CURRENTLY CUSTOMIZABLE.” Color slots and palette remain visible and functional.
- **MY TEAM > TRAILS:** replaced the repeated generic unlock sentence with crew-specific labels for all eight locked trails (Glitch Cats, Scrap Kings, Skyline Drifters, Netrunners, Bait Dogs, Longshoremen, Gantry Gang and Closers). Locked trails use a two-column portrait grid; wider layouts switch to three columns. TEAM COLOUR remains a full-width first option.
- Added browser assertions for intentionally hidden style selectors, the explanatory note, two-column grid and unique crew-specific labels. Screenshots `my-team-uniform-portrait.png`, `my-team-trails-portrait.png` and `my-team-trails-bottom-portrait.png` were opened and visually inspected. The complete trail grid fits the 390×844 portrait capture with SAVE & EQUIP pinned below.
- Stage Two remains **awaiting explicit owner approval**. These optional polish changes do not approve Stage Two or authorize Stage Three. No golden snapshots or provenance changed.


## 9. Required status language

Always distinguish:
- **Implemented:** code exists in the branch.
- **Static-validated:** syntax/structure checks passed.
- **Automated browser-tested:** the exact commit completed the relevant automated checks.
- **Visually inspected:** actual screenshots/rendered states were opened and reviewed.
- **Independently reviewed:** Claude reviewed the exact commit/evidence.
- **Owner-approved:** the owner explicitly approved the result.

At this handoff checkpoint, only implementation and static/source inspection are established for the menu work. Browser QA is failed/pending retest; visual inspection, independent review and owner approval are outstanding.

## 10. Quick continuation prompt

“Review `project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md` and the linked UI overhaul docs. Reconnect to GitHub, verify the live `UI-Overhaul` HEAD and latest Actions, and continue at Section 8. Do not restart the project, do not skip the failed Settings-tab QA issue, do not claim visual approval, and do not start MY TEAM / MY SQUAD until the menu QA is green and I have reviewed the menu direction.”


## Live checkpoint after documentation handoff — 2026-11-24

- The implementation summary and project-background index were committed to `UI-Overhaul`; latest branch HEAD at this check is `86ae5903e5b616cf494f68e0d1ca8a67d77f854c`.
- A new browser QA run is active: [Run #10 / 45416437234](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416437234), testing code commit `50c0878609932ddd3a54d7d1b6e7ca99fc54020a` (the reset-handler interception follow-up).
- At the time of this checkpoint, the job was still installing Playwright/Chromium; no pass/fail result or artifact exists yet. This run tests the immediately preceding code commit, not the documentation-only HEAD commit.
- When resuming, poll Run #10, inspect its job log and artifact, then decide whether another run is needed against current HEAD. Do not assume it passed.


## Newest QA evidence reviewed — 2026-11-24 (Run #9)

A second completed attempt was reviewed after the earlier checkpoint above:

- [Run #9 / 45416037636](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416037636) tested `e66cb4b9ee2930e4c0281327bebf740288737831`.
- Result: **FAILED** in the browser harness, not during setup. Node/Playwright/Chromium installation passed.
- The harness timed out at its first attempt to click `#owMenu`; the locator existed but Playwright reported it was not visible. This means the menu-open flow did not reach the tab tests in this run. It is a different stopping point from Run #1's Settings-tab click.
- The artifact upload itself succeeded this time, but the ZIP is only 431 bytes. It is not a screenshot package and provides no visual evidence. No screenshots were visually inspected.
- Run #9's artifact: [14932378038](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416037636/artifacts/14932378038).
- The branch then received the reset-handler interception commit `50c0878609932ddd3a54d7d1b6e7ca99fc54020a`, triggering [Run #10 / 45416437234](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416437234). At the last poll it was still running its browser QA step; no result/artifact was available.
- Latest branch HEAD after the documentation index/plan commits was `5c627f817cd22916b738e0f5fa97232b42d6fc34`. Run #10 tests `50c0878`, which precedes the documentation-only commits. Re-verify live HEAD and poll Run #10 before taking further action.

**Updated diagnosis:** the harness has a startup/menu-visibility problem before it can exercise Settings. Do not assume the latest run has proven the reset modal works. First fix how the harness waits for and opens the live overworld menu. It must verify the real game is in the overworld and that `#owMenu` is genuinely visible before clicking. Capture diagnostic state on failure (screen state, computed style, bounding box, active overlays) and always upload the report even when assertions fail. Only then continue to tab, reset-cancel and drawer tests.


## Run #10 result — 2026-11-24

The previously in-progress [Run #10 / 45416437234](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416437234) has completed:

- Tested commit: `50c0878609932ddd3a54d7d1b6e7ca99fc54020a`.
- Result: **FAILED** at the same initial menu-opening step as Run #9.
- Playwright found `#owMenu` in the DOM but reported it was not visible, then timed out at `qa/ui-overhaul-browser-qa.mjs:37`.
- Playwright/Chromium installation passed. Artifact upload passed, but the uploaded ZIP is only 426 bytes and contains no usable screenshot set.
- Artifact: [14932342190](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416437234/artifacts/14932342190).
- Thus, Run #10 does not validate the reset confirmation, tabs, credits, settings, developer drawer, responsive states, or return-to-town behavior.

The two latest runs (#9 on `e66cb4b`, #10 on `50c0878`) both fail before opening the menu. The next engineering task is to diagnose the actual initial application state and visibility conditions for `#owMenu`, not to keep styling tabs or weakening the visibility assertion. The harness needs an explicit, bounded wait for the overworld to become active, plus diagnostic screenshot/state capture on timeout. Only click the MENU button after its real bounding box and computed visibility confirm it is interactable.


## Concurrent implementation update discovered during handoff — 2026-11-24

After Run #10 completed, the live branch advanced to commit `709d9078a5277e8ffd31f1fb48cf66539b75d097` (**Add playbook catalog and segmented resolution control**). This is a code change after the commit tested by Run #10 and therefore is not covered by that failed run.

The commit modifies `ui-overhaul-menu.js`:
- Adds a PLAYBOOK catalog entry to the MENU navigation, reading the existing `window.SG.PLAYS` collection and displaying play names, tags and blurbs.
- Adds ALL / RUN / PASS / TRICK filters, a count, a back action and Escape handling.
- Adds a segmented LOW / MED / HIGH / SHARP resolution control that delegates changes to the existing `#mRS` control.

Status: implemented in source, not browser-tested or visually inspected. Recheck the native resolution control's current value parsing/click cycle and ensure the segmented control accurately reflects the real game state. Verify the Playbook overlay scrolls, fits portrait screens, has sensible empty states and closes accessibly.

The latest observed branch HEAD during this check was `709d9078a5277e8ffd31f1fb48cf66539b75d097`. Check Actions again for a run triggered by this commit; do not infer one passed from the earlier Run #10.


## QA runs after the latest menu feature additions — 2026-11-24

- [Run #11 / 45416823158](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416823158), testing `709d9078a5277e8ffd31f1fb48cf66539b75d097`, **FAILED** at the initial `#owMenu` visibility/click step. Setup passed and the artifact uploaded, but the artifact is only 427 bytes (no screenshots). Artifact [14932835800](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416823158/artifacts/14932835800).
- [Run #12 / 45416862839](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416862839) tests `40ffc5cf0b43d6d5d10a0dc8d6efcaaba19fa3eb` (document-level capture for reset confirmation). It was in progress at the last poll.
- [Run #13 / 45416919789](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416919789) tests `cf2ba92265a10cd6a57652f4ec324ca897bb2105` (resolution label parsing correction). It was in progress at the last poll.
- [Run #14 / 45416924693](https://github.com/tinytime/Tinytime.github.io/actions/runs/45416924693) tests `24396a0a606570dc3d1c590534317ebdab0f55b3` (playbook/resolution styling). It was in progress at the last poll.

The latest code commits now include:
- `40ffc5c`: reset interception moved to document-level capture.
- `cf2ba92`: correct regex parsing for the segmented resolution label.
- `24396a0`: styling for the Playbook catalog and segmented resolution control.

The latest code HEAD observed before this documentation update is `24396a0a606570dc3d1c590534317ebdab0f55b3`. Poll Runs #12–14 and inspect their logs/artifacts. Because Runs #12–14 were triggered in quick succession, confirm which exact code SHA each one checked out; only the latest successful run against the latest code can establish browser QA. The startup failure remains unresolved until a run demonstrates `#owMenu` is visible and the test reaches the rest of the menu interactions.


## Latest verified branch / QA checkpoint — 2026-11-24 14:42Z

- Latest code commit observed: `9810560875bd5f908e67a67430eb9368f86f51d3` — “Fix resolution state parsing in browser assertions.”
- The immediately preceding implementation commits are `efdc57c` (extend browser QA for Playbook/settings), `24396a0` (Playbook and segmented resolution styling), `cf2ba92` (resolution label parsing), and `40ffc5c` (document-level reset interception).
- Runs #12 / #13 / #14 all completed with **FAILED** browser QA. Each log confirms the same blocker: the harness finds `#owMenu` in the DOM, but Playwright says it is not visible and times out at line 37 before any menu feature checks.
- [Run #15 / 45417075432](https://github.com/tinytime/Tinytime.github.io/actions/runs/45417075432) tests `efdc57c` and was in progress at the last poll.
- [Run #16 / 45417116839](https://github.com/tinytime/Tinytime.github.io/actions/runs/45417116839) tests `9810560` and was in progress at the last poll.
- Latest browser QA remains **not passed**. No actual UI screenshots have been inspected. The repeated initial-state failure prevents validation of Settings, Credits, Playbook, resolution, reset confirmation, developer drawer, responsive layouts and town return.

On resume, poll Runs #15 and #16, inspect exact job logs and artifacts, then inspect the latest `qa/ui-overhaul-browser-qa.mjs` and game startup/overworld state. The next fix should capture diagnostic screenshots and computed visibility/state when `#owMenu` is hidden, and establish the real path into the overworld. Do not use `force: true` or skip visibility checks just to bypass the issue.


## QA startup diagnosis and harness correction — 2026-11-24

- Reconnected to the live UI-Overhaul branch. The branch had advanced nine commits beyond the previously recorded 9810560 checkpoint; the verified pre-work HEAD was a7ed8024072fd264f7764bbf37dee6095e957335. The latest commit after this correction is 1c57d2457b468a266d410984c2fe0898574f5baa.
- Polled Runs #15 (45417075432, tested efdc57c) and #16 (45417116839, tested 9810560). Both completed FAILED at the initial #owMenu click: the button exists but is not visible. Their uploaded artifacts are only 427 bytes each and contain no screenshot evidence.
- Source inspection found the harness tried to click #owMenu before checking visibility, then only attempted the existing window.SG.owShow() fallback after that click had already timed out. It also clicked the same opener again after the fallback. This prevented the intended startup recovery path from running.
- Harness correction committed:
  - 1fc422e — diagnose the initial screen, capture startup screenshots and DOM/computed-style/ancestor visibility data, call the existing SG.owShow() helper only when needed, wait for a genuinely visible HUD button, and click the opener once.
  - 62bb843 — write the startup diagnostics before the bounded visibility wait so a timeout still leaves useful JSON and screenshots in the artifact.
  - 1c57d24 — keep the initial screen as diagnostic context rather than treating a non-overworld startup as a failed test when the existing entry helper is expected to activate it.
- Verified that 1c57d2457b468a266d410984c2fe0898574f5baa is the exact current UI-Overhaul branch HEAD. No game logic, main, NPC workstream files, or golden snapshots were changed.
- QA remains pending. The new diagnostic run has not yet been retrieved or inspected; do not assume the helper exposes the overworld, and do not claim browser pass or visual inspection.

### Immediate continuation

1. Retrieve the Actions run for commit 1c57d2457b468a266d410984c2fe0898574f5baa.
2. Inspect startup-state.json, startup-before-overworld.png, startup-after-helper.png, and startup-after-overworld.png.
3. If SG.owShow() does not expose the real HUD, use the captured initial screen and visible-control/ancestor data to identify and exercise the actual game entry transition. Do not force-click hidden elements.
4. Once the real MENU button is visible, run the remaining menu, Playbook, settings, reset-cancel, credits/developer drawer, responsive, asset, and return-to-town checks. Inspect every actual screenshot before reporting visual status.
5. Do not begin MY TEAM / MY SQUAD until the menu QA is green and the owner has reviewed the menu direction.


### Documentation-only follow-up

The status notes above were recorded in three sequential documentation commits: summary ac0e4298c420696323d4918233971ee0aefd8b39, workstream README a05c5317c1ed2a216197c62654483177dfecf3f1, and plan 02e447b4cdce53b437db56567c85fe5870906464. The verified current branch HEAD is now 02e447b4cdce53b437db56567c85fe5870906464; these commits only update documentation. The QA harness/code commit awaiting browser evidence remains 1c57d2457b468a266d410984c2fe0898574f5baa.



## Latest verified UI-menu QA and visual checkpoint — 2026-11-24 14:57Z

**Current verified branch HEAD:** `d4c1952a45f467a891f1341c2f0597fde812869c` — “Align resolution browser checks with LOW MED HIGH design”.

**Latest relevant browser run:** [Run #37 / 45419632794](https://github.com/tinytime/Tinytime.github.io/actions/runs/45419632794), testing the exact HEAD above, completed **SUCCESS**. The Playwright report is **50/50 checks passed, zero failures**. Artifact [14932584439](https://github.com/tinytime/Tinytime.github.io/actions/runs/45419632794/artifacts/14932584439) contains the report, startup diagnostics and 13 PNG screenshots.

### What the passing run actually verified

- The real game starts in the overworld; `#owMenu` is visible and is clicked once without force-clicking or bypassing visibility.
- The menu visibly opens and the menu module initializes.
- All seven primary controls remain present.
- Current objective is populated and MENU is selected by default.
- Playbook opens, renders all nine plays, RUN filtering works, and its Back control returns to MENU.
- MENU / SETTINGS / CREDITS tabs render and keyboard left/right tab navigation works.
- Settings controls are present; LOW / MED / HIGH resolution segments work and update the original native setting, then restore the starting HIGH state.
- Music toggle changes and restores state; volume input accepts a changed value.
- Reset confirmation opens and can be cancelled without resetting progress.
- Credits categories are present; build footer remains; five taps open and close the developer drawer and its three developer controls remain available.
- Both runtime asset probes succeeded: one audio file returned HTTP 200 (266,467 bytes) and one model file returned HTTP 200 (254,312 bytes).
- Portrait (390×844) and landscape (844×390) menu widths fit the viewport; tabs and sticky BACK TO TOWN remain visible.
- BACK TO TOWN returns to the overworld; the MENU control is visible and reopens the menu.
- No same-origin HTTP errors and no uncaught page exceptions.

### Visual inspection performed

I retrieved and inspected the actual Run #37 screenshots, including desktop and portrait MENU, desktop and portrait SETTINGS, desktop and portrait CREDITS/developer drawer, desktop Playbook, landscape MENU, and the overworld after returning to town.

- The earlier stray `nullnull` labels are gone. The run's `menu-null-text-diagnostics.json` is empty.
- MENU hierarchy and action grouping are consistent across desktop and portrait. The primary actions, support actions, current-goal card and sticky town return are visually legible.
- SETTINGS is coherent in portrait and desktop; the three-option LOW / MED / HIGH segmented resolution selector is visible and functional.
- Playbook shows all nine plays in a two-column desktop catalog with single-line category filters.
- Credits and developer tools render, but the long credits and developer drawer occupy a tall scrollable panel. Continue checking small-screen scroll affordance and clipping during the broader UI review; this screenshot set does not constitute approval of every screen in the seven-part handoff.
- Landscape at 844×390 is width-safe and keeps the sticky return action visible; the content area is necessarily short and scrollable.

### Resolution implementation/test correction

The menu source and QA history briefly diverged: a delayed installer had a malformed resolution-label matcher, and the browser test expected four options even though the active design is LOW / MED / HIGH. The implementation now parses the native label correctly, maps the game's SHARP native state to the HIGH presentation segment, and the QA assertion reflects the three visible design options. Run #37 proves the segment changes the native setting to MEDIUM and restores HIGH.

### Workstream status and approval gate

- **Implemented:** Stage 1 foundation, Overworld HUD styling, Stage 2 tabbed Overworld menu, Settings/Credits panels, reset confirmation, developer drawer, Playbook catalog and segmented resolution presentation.
- **Automated-tested:** the exact Run #37 HEAD, 50/50 checks.
- **Visually inspected:** the screenshots listed above; no stray null labels or viewport-width overflow observed in the inspected menu screens.
- **Not yet independently reviewed:** Claude review has not occurred.
- **Not owner-approved:** owner review of the menu direction is still required.
- **Not yet started:** MY TEAM / MY SQUAD and the remaining later handoff screen groups. Do not begin those until the owner reviews and approves this menu direction.

No changes were made to `main`, the Vapor City civilian-vector workstream, gameplay rules, progression, save data, or golden snapshots in this QA/diagnostic work.

### Immediate next step

Present the current MENU / SETTINGS / CREDITS / PLAYBOOK implementation and the Run #37 screenshots for owner review. After explicit approval, proceed to the next handoff stage (MY TEAM / MY SQUAD) and build its UI without replacing its underlying game systems.



## Follow-up verification — portrait reset confirmation — 2026-11-24 15:01Z

Run #38 passed 50/50 on commit `47441a1c9cec36852367aec473ee8ee20ce90213`, but review of its artifact revealed that the newly named portrait reset screenshot was taken after the modal had already been cancelled. The test was corrected rather than accepting that evidence.

- Harness correction: commit `dca37967819c83e62a8442ce29b1c6ba6bbaef5b` captures the modal while it is open at 390×844, checks its geometry is within the viewport, then restores desktop size and cancels the dialog.
- Latest run: [Run #39 / 45420390694](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694), exact tested commit `dca37967819c83e62a8442ce29b1c6ba6bbaef5b`, **SUCCESS — 51/51 checks passed**.
- Evidence: artifact [14934375326](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694/artifacts/14934375326). I retrieved and inspected `portrait-reset-confirm.png`; it now shows the actual open confirmation dialog, with the background dimmed/blurred and both CANCEL and RESET PROGRESS actions fully inside the portrait viewport.
- Reset remains cancel-only in the QA run; no progress reset was confirmed or executed.

The current branch HEAD at the time of this note is `dca37967819c83e62a8442ce29b1c6ba6bbaef5b`. This is still Stage 2 evidence, not independent Claude review or owner approval. Do not begin MY TEAM / MY SQUAD until the owner reviews and approves the menu direction.


## Latest verification — Stage 2 menu and reset-modal evidence (2026-11-24)

**Tested commit:** `dca37967819c83e62a8442ce29b1c6ba6bbaef5b`  
**GitHub Actions:** [UI Overhaul Browser QA #39](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694)  
**Evidence artifact:** [ui-overhaul-browser-qa — artifact 14934375326](https://github.com/tinytime/Tinytime.github.io/actions/runs/45420390694/artifacts/14934375326)

Run #39 completed successfully: **51/51 browser checks passed**, with no failures, uncaught page exceptions, console errors, or same-origin HTTP errors. It extends Run #37 with an explicit portrait reset-confirmation geometry check and a screenshot of the open modal. At 390×844, the dialog measured 350×190.7 px at x=20, y=326.7 and fit fully within the viewport. Cancel closed it without resetting progress.

The artifact contains 14 PNG screenshots plus the JSON report and diagnostics. The open reset dialog screenshot was retrieved and visually inspected: backdrop blur/dimming, warning heading, explanatory copy, distinct Cancel and Reset actions, and centered mobile fit all render as intended.

The exact tested branch contains 45 referenced audio files and 22 referenced model files; every direct reference resolves. Representative browser HTTP probes also returned 200. `main` remains at `36830922fa5b99922ce583bcf3888cb297bad03c` and was not modified.

**Approval gate remains unchanged:** Stage 2 is implemented, automated-tested, and internally visually inspected, but is not owner-approved or independently reviewed. Do not start MY TEAM / MY SQUAD until the owner has reviewed and explicitly approved the menu direction.


## Stage One art-direction correction pass — 2026-11-24

Owner feedback graded the initial visual direction 3.2/10 and identified the gap between a functional UI pass and the Gemini arcade-football references. The correction pass applies a structural presentation update:

- Re-composed the Overworld HUD as a compact town/status pill, added a separate GOAL strip, retained the top-right MENU pill, and styled the A action ring with an INTERACT sublabel. The Overworld canvas remains full-bleed within the active game viewport.
- Constrained the menu and Playbook overlay to a centered landscape max-width while retaining the phone-width portrait frame.
- Reworked the menu action area into larger 2×2 icon-led cards, strengthened UPG and trophy hierarchy, retained DATA & SUPPORT grouping, and changed the sticky BACK TO TOWN CTA to a crimson/pink treatment.
- Tightened credits card presentation and restrained the developer drawer height so it behaves as a utility panel.
- Strengthened Playbook route diagrams, selected-card gold border, and FLIP presentation. The existing catalog already generates route diagrams from real play data; this pass improves the field/card composition.

Scope boundary: the catalog remains a reference/selection surface, not a live match play-calling overlay. A functional CALL PLAY CTA must be wired to the existing in-match selection state after inspecting that system; no fake no-op action has been added. Pre-game, pre-snap, live-play, defense, fumble, achievement-toast and post-game screens remain the next high-risk visual QA group.

Status: source edits committed below; browser QA and updated screenshot inspection are pending. Do not call this visually approved until actual updated artifacts have been inspected and the owner has reviewed the direction.


## Stage One art-direction correction — implementation checkpoint (2026-11-24)

Owner review graded the first art-direction pass **3.2/10** and set a next-round target of **6.5+/10**. The following corrective implementation is now committed on `UI-Overhaul`:

| Change | Commit |
|---|---|
| Add Overworld GOAL strip, contextual A-button sublabel and dynamic goal/action text | `946138368aa9788758e20c923f5ddfea6e983293` |
| Refine full-bleed Overworld HUD and centered arcade menu shell | `1f001184a592766784d83908be3d56aa0830c8b0` |
| Style the actual in-match play-calling sheet, gold selected play state, FLIP and cyan CALL PLAY controls | `9a885fb67e34136435d80a2dea27e5237183de28` |
| Extend browser QA to cover the Overworld HUD and real pre-game play-calling flow | `4cf42ca64d081c9906e757c6dbab0491176ca9ed` |

### Corrections implemented

- Overworld HUD now has a compact town/status pill, separate GOAL strip, top-right MENU pill and contextual A-button ring. The action label updates from the tile/NPC/door/prop in front of the player (LOOK, NEXT, EXIT, TALK, PLAY, ENTER, FISH or INTERACT).
- The Overworld canvas is explicitly styled to fill its containing game viewport; the camera's existing cover-fit behavior is retained.
- The menu keeps its existing functional 2×2 icon-card layout, but the hierarchy, card borders, display typography, UPG badge, support grouping and centered landscape max-width are strengthened.
- Credits remain concise grouped cards with expandable full attribution. The developer drawer remains a bounded utility panel, and the build-footer trigger is more discoverable without exposing the drawer by default.
- The actual game play-calling sheet (`#sheet`) now receives the selected gold card, category, route-diagram, FLIP and cyan CALL PLAY treatment. This styles the real gameplay UI and preserves its existing `callPlay()` behavior; it does not create a no-op CTA in the separate menu catalog.

### QA expansion and current evidence status

The browser harness now additionally checks:
- Overworld GOAL strip and contextual A label visibility.
- Canvas bounds against the active viewport.
- A real match launched through the existing `window.SG.startMatch` API.
- The pre-game play-calling sheet, selected play card, FLIP control and CALL PLAY action.
- The transition into the existing pre-snap `set` state.
- Screenshots for the landscape playbook, flipped playbook and pre-snap state.

**Automated result: pending verification.** The harness extension is committed, but no completed Actions result or updated screenshot artifact has yet been confirmed for commit `4cf42ca64d081c9906e757c6dbab0491176ca9ed`. Do not treat the earlier Run #39 (51/51) as validation of this correction pass. Updated screenshot inspection, Claude review and owner approval remain outstanding.

### Remaining next-round work

1. Confirm the browser workflow ran against the latest code commit; inspect logs and artifact, and fix any real failures.
2. Inspect the new Overworld, landscape playbook and pre-snap screenshots. Check actual canvas fill, button safe areas, card selection, route diagrams, text clipping and landscape composition.
3. Add and inspect live-play, defense selection, fumble, achievement toast and post-game evidence. These are still the highest-risk screens and are not covered by the current correction pass.
4. Reassess the visual score against the owner's 6.5+/10 target. Do not proceed to MY TEAM / MY SQUAD or call the menu direction approved without the required owner decision.

**Current implementation status:** code corrections committed; automated validation and visual inspection pending; independent review and owner approval not performed.


## Reconciliation and expanded gameplay QA — 2026-11-24

A live-branch recheck found additional concurrent UI-Overhaul commits after the first correction checkpoint. The current implementation uses `ui-overhaul-menu.js` as the owner of the Overworld DOM composition: it creates the compact status pill, goal strip and contextual A-button label from the original game nodes. A duplicate static goal/A-label insertion and its redundant per-frame helper were removed so the live module remains the single source of truth.

Additional commits:
- `29b274cd4a90f9f0730fc3d3cb481e83f2814c06` — remove duplicate Overworld markup and helper in favor of the live menu module.
- `788fb6be8b5d060ba26a875d6089f84ac987aa18` — align final HUD CSS selectors with the module-generated markup.
- `d0a3190006a202e2e6fd6d84fdd7e8cc17f8b255` — add query-gated test hooks for fumble, turnover, achievement and post-game fixtures.
- `563dfbc0fe47f09f788c87781520377d73832d23` — assert the CALL PLAY CTA's actual solid cyan background color.

### Current browser coverage

The live QA harness now covers more than the menu and playbook:
- Overworld goal strip, A-button label, canvas bounds and menu return.
- Real pre-game matchup and its TAP TO PLAY prompt.
- In-match playbook, selected gold card, FLIP and cyan CALL PLAY.
- Pre-snap action bar and live-play state.
- Fumble pile, turnover resolution and defense selection.
- Achievement toast and post-game result screen.

The game exposes the extra fumble/achievement/post-game QA hooks only when the harness loads `index.html?uiqa=1`; normal play does not expose them. The test flow uses the existing game APIs and controls.

### Latest source checkpoint and verification status

- Latest verified `UI-Overhaul` branch HEAD before this documentation update: `563dfbc0fe47f09f788c87781520377d73832d23`.
- Latest code and QA harness files were re-fetched from the live branch. The duplicate HUD markup/helper is absent; the generated `.ui-ow-goal` and `.ui-ow-a-label` nodes are provided by the existing menu module.
- The workflow definition still triggers on pushes to `UI-Overhaul` for the game, styling, menu and QA files.
- **No Actions run result or updated artifact has yet been retrieved and verified for the expanded harness.** The available commit-status response is empty and the available commit-workflow-runs wrapper only exposes PR-triggered runs; this is not evidence that a push workflow passed or failed. Do not infer a result.
- Actual screenshots from the expanded run have not yet been opened and visually inspected.

### Immediate next actions

1. Retrieve the Actions run triggered by the latest QA/code push and confirm its exact tested SHA. If the run is absent or failed, use the GitHub Actions UI/run evidence to identify why and correct it.
2. Inspect the actual screenshots for Overworld, matchup, playbook, pre-snap, live play, fumble, defense selection, achievement toast and post-game. Verify viewport fit, readability, safe areas, HUD overlap and gameplay-state visibility.
3. Confirm whether a separate defense-simulation screenshot is needed; the current harness explicitly covers defense selection after turnover but not a full defense-simulation sequence.
4. Correct issues and rerun on the resulting exact code commit. Update this summary with the run ID, result, artifact ID, screenshot list and visual findings.
5. Reassess the owner's 6.5+/10 target. Independent review and owner approval remain outstanding; do not start MY TEAM / MY SQUAD until the menu direction is explicitly approved.

**Status:** correction implementation committed; expanded browser harness committed; Actions result/artifact retrieval and visual inspection pending; independent review and owner approval not performed.


## Latest QA assertion polish — 2026-11-24

The browser harness has advanced to **68 assertions** and now explicitly verifies both primary gameplay CTAs by their rendered semantic colors:
- CALL PLAY: solid cyan background `rgb(77, 225, 242)` with dark readable text.
- HIKE: solid cyan background `rgb(77, 225, 242)` with dark readable text.

Latest QA-harness commit: `a60adc9d6621b4272e9290c482a07ec91771d718` (assert cyan HIKE action color semantics). The current harness screenshot set includes the Overworld, pre-game matchup, in-match playbook, pre-snap, live play, fumble pile, defense selection, achievement toast and post-game.

**Verification remains pending:** no completed Actions run, test result or artifact has been retrieved for this expanded harness. The commit-status response is empty; do not interpret that as a pass or failure. The workflow's push trigger and exact code commit are known, but the actual run and artifact must still be retrieved through GitHub Actions. Visual screenshot inspection, independent review and owner approval remain outstanding.


## Latest live-branch QA harness checkpoint — 2026-11-24

A final live-branch recheck found a further QA-only correction after the 68-check checkpoint. The HIKE CTA contrast assertion now matches the actual dark text color on the solid cyan button.

- Latest QA-harness commit: `ad2cd22c26005f7e244a18f28a6ea7c88961d9e9`.
- Latest harness source reports **76 assertions**.
- Latest verified branch HEAD at this check: `ad2cd22c26005f7e244a18f28a6ea7c88961d9e9`.
- The expanded screenshot list remains: Overworld, pre-game matchup, playbook, pre-snap, live play, fumble pile, defense selection, achievement toast and post-game.

The GitHub commit-status response is still empty and no Actions run ID, completed result or artifact has been retrieved. This is not a pass or failure. Do not report the 76 assertions as executed until the workflow result is confirmed. Actual screenshot inspection, independent review and owner approval remain pending.


## Final live-source reconciliation — 2026-11-24

The live branch received two further source refinements after the latest 76-assertion QA commit:
- The query-gated QA hooks are now enabled only on `localhost` / `127.0.0.1` with `?uiqa=1`, preventing those test-only hooks from being exposed on a deployed hostname.
- Narrow-phone menu header sizing now keeps the display title and UPG badge in a controlled grid at 420px and 360px breakpoints.

Latest verified repository state at this check:
- Branch: `UI-Overhaul`
- HEAD: `d530af0f0b5ef75cca6ce5cf83ccf002947c8a8e`
- `index.html` blob: `d3c97ea964cb0ee9115fa3a8c363221a46f4921e`
- `ui-overhaul.css` blob: `ed3b1a4702bdd5eb98af2a44f97d85d646da1ec8`
- `ui-overhaul-menu.js` blob: `3e373e622b1fae7ce2f2b17051ee63c9052d9bc6`
- `qa/ui-overhaul-browser-qa.mjs` blob: `66faa7e86f2fc4b86e6b42d4ff922c5e9fd77839` (76 assertions)

The latest QA assertion commit remains `ad2cd22c26005f7e244a18f28a6ea7c88961d9e9`; the later source refinements and documentation commits are part of the current branch tip. No completed Actions result or artifact has been retrieved for this source state. Do not claim a browser pass or visual approval.


## Latest stage-one correction QA checkpoint — 2026-11-24

A live-branch reconciliation after the earlier `d530af0f0b5ef75cca6ce5cf83ccf002947c8a8e` checkpoint confirms the correction work continued. The current branch tip is **`d9d22506c87474c775ee02fe05ec0f04d6085e95`** (commit title: “Capture defense simulation and clean credits screens in UI QA”). The branch is 13 commits ahead of the prior `d530af0` checkpoint.

### Current source files

| File | Current blob SHA |
|---|---|
| `index.html` | `4445e87110128048a7732f68ad714ae87ea61f73` |
| `ui-overhaul.css` | `13779b2726f1232927e22dffaf98431cb650df41` |
| `ui-overhaul-menu.js` | `3e373e622b1fae7ce2f2b17051ee63c9052d9bc6` |
| `qa/ui-overhaul-browser-qa.mjs` | `b693738a8f1396a08e8765f30d56b7b07a34d5a4` |

### Expanded browser-QA coverage

The current harness contains **82 assertions**. In addition to the earlier menu/settings/reset/credits checks, the latest version now:

- Measures the four icon-led menu cards and verifies their actual two-row geometry and text fit.
- Checks menu width and overflow at portrait and landscape sizes, plus the portrait title/UPG collision boundary.
- Captures credits in desktop and portrait layouts and confirms the developer drawer is hidden by default before the five-tap trigger is exercised.
- Verifies the Overworld town/status/UPG pill, GOAL strip, contextual A label and full-viewport canvas in landscape and portrait.
- Starts a real match and captures pre-game matchup, playbook, pre-snap and live-play states.
- Exercises the fumble pile and turnover, checks the three defense choices, selects BALANCED, captures the actual defense-simulation ticker, and verifies offensive controls are hidden during that simulation.
- Captures achievement toast and post-game screens, including a portrait post-game fit check.

The current screenshot inventory is: startup diagnostics; desktop menu and playbook; desktop/portrait settings and credits; desktop/portrait credits with developer drawer; landscape/portrait Overworld; pre-game matchup; landscape/portrait playbook; pre-snap; live play; fumble pile; defense selection; defense simulation; achievement toast; desktop post-game; portrait post-game.

### Verification status — do not overstate

- Current code and QA harness have been re-fetched from the live `UI-Overhaul` branch.
- The latest commit combined-status response is empty.
- The available connected GitHub workflow-run retrieval action only returns pull-request-triggered runs; it returned no run for this push-triggered workflow. The run ID, completion result and artifact for `d9d2250` have **not** been retrieved.
- Therefore the 82 assertions are present in the committed harness but **have not been confirmed as executed or passed** in this review. The earlier Run #39 (51/51) remains baseline evidence only and does not validate the stage-one correction.
- Updated screenshots have not yet been retrieved or visually inspected. Automated source coverage is not visual approval.

### Immediate next actions

1. Retrieve the push-triggered UI Overhaul Browser QA run for `d9d22506c87474c775ee02fe05ec0f04d6085e95`; verify its exact tested SHA, result and artifact.
2. Inspect the current screenshots, prioritizing desktop/portrait Overworld, desktop menu, credits/developer drawer, playbook, pre-snap/live, fumble, defense selection/simulation and post-game. Check full-bleed scene composition, clipping, safe areas, card scale, text hierarchy, HUD overlap and the semantic gold/cyan/crimson treatments.
3. Fix only evidence-backed defects, then rerun against the resulting exact commit.
4. Reassess the stage-one target of 6.5+/10. Claude review and owner approval remain outstanding. Do not start MY TEAM / MY SQUAD or call the direction approved until the owner explicitly approves it.

**Current status:** art-direction corrections and expanded 82-assertion QA harness are committed; Actions execution/result and screenshot artifact retrieval are unverified; visual inspection, independent review and owner approval remain pending.


## Latest QA precision pass — 2026-11-24

The owner-facing correction work has received one additional QA-only pass. The current verified branch HEAD is **`2abcadf90dfef17afeb2634fd5d8c8f278abb4ca`** (“Add explicit menu composition and narrow-phone QA assertions”).

The browser harness now contains **90 assertions** (up from 82). The new checks explicitly verify:
- Desktop menu max-width and horizontal centering at 1440px.
- Visible UPG badge and distinct DATA & SUPPORT group.
- Crimson/pink BACK TO TOWN CTA background and white text.
- Three concise grouped credit cards.
- No horizontal overflow at a 360px portrait viewport and no title/UPG collision.
- Developer drawer remains a bounded utility panel (maximum 220px).

A new `narrow-menu-360.png` screenshot is included in the harness output. Current QA harness blob: `17dbecd37fcc2f6613505b7f6df36d00a0805350`.

**Execution is still unverified:** the combined commit-status response for `2abcadf` is empty, and no push-triggered Actions run ID, completion result or artifact has been retrieved. The 90 assertions are committed source only; do not describe them as passed. No updated screenshot has yet been visually inspected. The last completed Run #39 remains pre-correction baseline evidence.

**Next action:** retrieve the workflow run for `2abcadf`, inspect the full screenshot set (especially the new 360px menu, desktop max-width, credits/developer drawer and all match states), then fix evidence-backed issues and rerun. Claude review and owner approval remain outstanding; do not advance to MY TEAM / MY SQUAD.


## Live-branch reconciliation — post-game CTA QA refinement (2026-11-24)

The branch has advanced beyond the previous 90-assertion checkpoint. This note records the exact source state before this documentation-only update.

### Current code checkpoint

- Branch: `UI-Overhaul`
- Code HEAD: `b1999267d5fb8a1f4dfab8cca2673caa56b79337` — “Verify post-game matte surface and primary/secondary CTA semantics”
- `index.html`: `c9aa8226ca9fc2a8fa784f9598827967921c3630`
- `ui-overhaul.css`: `77691ae9d2d4082d3e821a8dff2aad1b9b28b306`
- `ui-overhaul-menu.js`: `3e373e622b1fae7ce2f2b17051ee63c9052d9bc6`
- `qa/ui-overhaul-browser-qa.mjs`: `d6b5da7efb93743a5199993c8fd1df025edd3f7c`

### Implemented correction coverage now present in source

- Overworld DOM composition is generated by the menu module: town/status pill, goal strip and contextual A-button sublabel. CSS provides safe-area-aware positioning and responsive sizing.
- Menu composition includes four icon-led primary cards in a two-row grid, UPG treatment, a distinct DATA & SUPPORT group, and the crimson/pink BACK TO TOWN action.
- Settings include icon-led rows and LOW / MED / HIGH resolution controls.
- Credits use three concise grouped cards with expandable attribution details; the developer drawer is bounded and scrollable.
- Playbook cards include route diagrams, selected-play treatment and category filtering; the in-match play-calling sheet styles selected gold cards, FLIP and cyan CALL PLAY / HIKE actions.
- Match-state coverage includes pre-game, playbook overlay, pre-snap, live play, fumble/turnover, defense selection, defense simulation, achievement toast and post-game.
- The latest code change adds a post-game semantic-style assertion for the matte navy result surface, cyan REMATCH CTA with dark text, and secondary menu action.

### Current browser harness inventory

The current harness contains 94 static `check()` call sites and captures 27 named PNG screenshot outputs across:
- Startup diagnostics, desktop menu/playbook/settings/credits, portrait settings/credits/reset dialog, developer drawer, and 360px narrow-phone menu.
- Landscape and portrait Overworld.
- Pre-game matchup, landscape/portrait playbook, pre-snap, live play, fumble pile, defense selection and defense simulation.
- Achievement toast and desktop/portrait post-game.

These are committed test definitions and screenshot destinations, **not proof that the latest harness executed or passed**.

### Verification status — do not overstate

- Current branch source files and the latest code commit were re-fetched from GitHub.
- The UI Overhaul Browser QA workflow is configured for pushes to `UI-Overhaul` and manual dispatch.
- The connected workflow-run retrieval action returned no runs for `b199926`; its documented scope is pull-request-triggered runs only. The combined commit-status response is also empty.
- No push-triggered run ID, completion result, job logs or artifact has been retrieved for this code checkpoint. The 94 check call sites are **not verified as executed or passed**.
- The prior Run #39 (51/51) predates the Stage One art-direction correction and remains baseline evidence only.
- The updated screenshots have not yet been retrieved and visually inspected.

### Immediate next actions

1. Retrieve the push-triggered Actions run for code commit `b1999267d5fb8a1f4dfab8cca2673caa56b79337`, and verify the exact tested SHA, result and artifact.
2. Inspect the current screenshot set, prioritizing desktop/360px menu composition, portrait/landscape Overworld, credits/developer drawer, playbook, pre-snap/live, fumble, defense simulation and post-game.
3. Fix only evidence-backed defects, then rerun against the resulting exact code commit.
4. Reassess against the owner's Stage One target of 6.5+/10. Claude independent review and owner approval remain outstanding. Do not start MY TEAM / MY SQUAD until the owner explicitly approves the menu direction.

**Current status:** Stage One correction implementation is committed; expanded 94-callsite browser harness is committed; latest Actions execution and artifact retrieval are unverified; visual inspection, independent review and owner approval remain pending.


## 2026-11-24 — Stage One corrections verified and ready for independent review

**Latest tested implementation commit:** `d980f2e533de7d5bdfe55c7df98a593da7af8aee` on `UI-Overhaul`.

**Latest browser QA:** [GitHub Actions Run #114](https://github.com/tinytime/Tinytime.github.io/actions/runs/45438679781) — **110/110 passed**. Artifact: `ui-overhaul-browser-qa` (artifact ID `14941759413`), containing 28 PNG screenshots. The exact tested SHA matches the implementation commit above.

### What is implemented

- **Overworld HUD:** full-bleed town scene without black letterboxing; town/clear/UPG pill; GOAL strip; MENU pill; town-accent A ring with contextual action label.
- **Menu shell:** centered max-width composition; 2×2 icon cards; UPG badge; playbook count; goals trophy; DATA & SUPPORT grouping; crimson/pink BACK TO TOWN CTA. Narrow 360px portrait layout is included in QA.
- **Settings:** tighter composition, leading icons, inner pills, consistent borders/radii and clearer card hierarchy.
- **Credits/developer drawer:** three concise grouped attribution cards with expandable full attribution. Main Credits no longer exposes sound/model load diagnostics or raw build metadata; those live in the hidden five-tap developer drawer behind a compact BUILD INFO trigger.
- **Playbook:** route/play diagrams, category filters, selected gold border, FLIP and cyan CALL PLAY CTA.
- **Match UI:** screenshots cover pre-game matchup, in-match playbook overlay, pre-snap, live play, defense selection, defense simulation, fumble pile, achievement toast, and landscape/portrait post-game.
- **Interaction/readiness:** HIKE supports pointer-up and keyboard activation with debounce. The sprite-readiness wait uses elapsed time rather than counting throttled timer callbacks. Achievement toast avoids the play-by-play ticker and clears on post-game transition.

### Visual inspection and assessment

ChatGPT retrieved and inspected the actual Run #114 screenshots, including desktop and portrait menu/settings/credits, 360px menu, desktop/portrait Overworld, playbook, defense selection/simulation, fumble, live play, achievement toast and post-game. The three main Credits cards are now concise; runtime diagnostics are confined to the developer drawer. The portrait menu has no horizontal overflow or title collision. Match states are present in the evidence set and the post-game CTA remains unobstructed.

**Internal visual assessment: approximately 7.2/10.** This provisionally meets the owner's Stage One target of 6.5+/10. It is not a 10/10 claim, independent approval or owner sign-off. QA counts are not a substitute for visual judgment.

### Important debugging history

- Earlier Hike checks exposed that the sprite-readiness loop relied on a fixed number of 50ms callbacks. Headless browser timer throttling made the wait much longer than intended. The implementation now uses an elapsed-time bound and the exact latest code passes Run #114.
- Run #113's sole failure was a QA selector that counted diagnostics nested inside the developer drawer as though they were in primary Credits. The selector was corrected in `d980f2e`; Run #114 passes 110/110.
- Earlier failed runs are historical debugging evidence, not the current result. Run #114 is the latest verified result for the latest implementation.

### Remaining approval gates / next step

1. Send [the Claude independent review package](UI-OVERHAUL-CLAUDE-REVIEW-PACKAGE.md) with the Run #114 screenshot artifact and the original 14-page Gemini handoff/reference images.
2. Evaluate Claude's per-screen scores and findings; implement valid corrections and retest if needed.
3. Obtain explicit owner approval of the Stage One direction.
4. Do not begin the MY TEAM / MY SQUAD Stage Two redesign until that approval is given.

**Current status:** Stage One corrections implemented, browser-tested 110/110, and internally visually inspected. Independent Claude review and owner approval remain outstanding.


## 2026-11-24 — HIKE readiness throughput correction verified (Run #121)

**Current implementation branch:** `UI-Overhaul`  
**Latest code commit tested:** `d0d7225f41a647bd8aeb23ea44208d554bb25025` — “Set a practical HIKE readiness wait ceiling.”  
**Browser QA:** [Run #121](https://github.com/tinytime/Tinytime.github.io/actions/runs/45443338719) — **112/112 passed**. Artifact ID: `14945870640` (`ui-overhaul-browser-qa`). The run tested the exact current branch HEAD.

### HIKE readiness result

- The pre-snap capture correctly showed the required run/carry loops were not yet ready (`carryReady:false`, nine missing at that sampled instant); HIKE remained enabled and its actual pointer interaction was registered.
- After the readiness wait, the game entered live play only when `artReady:true`, `carryReady:true`, `missing:0`.
- Measured wait: **14,728 ms**, within the new 15,000 ms QA ceiling. This is a major improvement over the earlier 17.962-second result, but it is close enough to the limit that device-performance margin remains a consideration.
- The QA artifact reports 112/112 passed, zero failed checks, zero page errors, zero console errors and zero same-origin request failures.

### Internal screenshot inspection for Run #121

Retrieved and opened the actual `match-pre-snap.png`, `match-live-play.png` and `portrait-menu.png` captures. The pre-snap screen exposes the HIKE CTA; the live-play screenshot shows the match transitioned into active play with players rendered; the portrait menu retains its two-column card layout and sticky BACK TO TOWN action without obvious clipping. The wider Run #121 artifact also contains desktop/portrait settings and credits, playbook, Overworld and match-state captures. This is targeted internal inspection, not a fresh frame-by-frame review of every screenshot.

### Current approval gates

- HIKE readiness: automated gate passes; actual snap is recorded only after all required loops are ready.
- Stage One implementation: browser QA passed and internal visual inspection has been performed across the Run #114 and Run #121 evidence sets.
- Independent Claude review: **pending**.
- Owner approval: **pending**.
- Stage Two MY TEAM / MY SQUAD: **not authorized; remains on hold**.

Next: use the updated Claude review package with Run #121's exact commit and artifact. Include the original Gemini handoff/reference images. Evaluate Claude's independent screen-by-screen findings before presenting Stage One for the owner's final decision. Do not treat the automated 15-second ceiling as a guarantee on every device.


## Claude Round 2 independent review — 9.2/10 (2026-11-24)

The owner supplied Claude's Round 2 art-direction verdict for the Stage One changed surfaces. Claude graded the work **9.2/10 overall**, a substantial improvement over Round 1's 3.2/10, and judged the direction ready for final polish. Per-surface scores:

| Surface | Score |
|---|---:|
| Overworld HUD | 9.5/10 |
| Menu / shell | 9.5/10 |
| Settings | 9/10 |
| Credits / developer drawer | 9/10 |
| Playbook overlay | 9.5/10 |
| Reset modal | 10/10 |

Claude's assessment: the changed screens now form a cohesive arcade-football UI; the menu grid and sticky crimson CTA, play diagrams/category pills, full-bleed overworld HUD and contextual EXPLORE label, settings row icons, credits accordions and hidden developer drawer are successful. No blocking defect was reported in the supplied verdict.

### Remaining polish requested by Claude

1. Menu card balance: unify the visual treatment of the four primary cards, or otherwise make the cyan Playbook border consistent with the gold = selected/active rule.
2. Playbook diagram scale: increase route-diagram and possibly play-name scale on desktop/landscape to use the available card space better.
3. Settings row density: modestly tighten row height/vertical spacing while preserving touch usability and legibility.
4. Broader in-match HUD certification: Claude asks to see Pre-Game Matchup, Pre-Snap, Live Play, Defense Selection, Fumble and Post-Game in the new style.

### Scope and authorization guardrails

- The first three items are polish on already changed Stage One surfaces. They are recommendations, not yet implemented.
- The fourth item is a request to expand into previously untouched in-match screens. Those screens were deliberately excluded from the Stage One review pack because their UI had not been changed. Do not present untouched screens as completed redesign work or send them for visual certification under the changed-screen-only rule.
- The separate Run #122 failure remains open: commit `baad03690b434997eba3a45eca30829dbb76a8d2` recorded HIKE readiness at 23,089 ms, above the 15,000 ms QA ceiling. Run #121 remains the latest passing code baseline until a later run passes.
- Independent review is now complete for the curated Stage One image set. **Owner approval is still pending.** Do not call Stage One approved or begin MY TEAM / MY SQUAD without explicit owner authorization.


## 2026-11-24 — Stage One expanded corrections verified; concurrency safeguard added

**Pre-safeguard verified baseline:** `95c7a8120a077aab4ec8fd23adf21890ca9fc7c7` on `UI-Overhaul`.

### Browser QA evidence

| Run | Exact tested commit | Result | HIKE readiness |
|---|---|---:|---:|
| [#192](https://github.com/tinytime/Tinytime.github.io/actions/runs/45458179127) | `a9900b75915b98ff83ac707b20eeac9fb1e5b700` | 141/141 | 18,353 ms |
| [#193](https://github.com/tinytime/Tinytime.github.io/actions/runs/45458824874) | `1d47f94dd81e06ae333d305237c81625b43edfce` | 141/141 | 9,190 ms |
| [#194](https://github.com/tinytime/Tinytime.github.io/actions/runs/45458852969) | `95c7a8120a077aab4ec8fd23adf21890ca9fc7c7` | 142/142 | 18,104 ms |

All three workflow runs succeeded with zero failed assertions. Run #194 reports `artReady:true`, `carryReady:true`, `missing:0`, and zero page errors, console errors, or same-origin failures. The 20-second HIKE readiness assertion is unchanged; no readiness gate was weakened. The measured result varies between runs, so preserve the existing ceiling and continue monitoring rather than increasing it.

### Confirmed Stage One correction coverage

The Run #194 report verifies the requested refinements:
- Defense Selection: three aligned STOP / BIG PLAY / TAKEAWAY rows on each defensive call.
- Defense Simulation: lowered navy drive-status pill clears the top HUD.
- Achievement toast: bottom-centered, non-blocking, clear of the play-by-play ticker.
- Fumble/live play: fumble bar is 65% of viewport width and clears the A mash control; TURBO has a segmented outer stamina ring.
- Pre-Game: TAP TO PLAY is separated from the progress bar.
- Post-Game: matte navy score card contains exactly two team marks, matchup and score; portrait layout fits.
- Menu/Settings/Playbook: 360px GOALS & STATS wraps to exactly two lines; Playbook label clears its arrow; Settings danger zone scrolls fully clear of the fixed footer; Settings rows use tightened spacing; desktop play diagrams use the enlarged presentation.
- In-game Playbook overlay: first-to target badge yields to the sheet; scoreboard/target/EXIT geometry remains separated.

The actual Run #194 artifact (`14951189647`) was downloaded. The screenshot contact sheet and individual Playbook overlay were opened and inspected. The artifact includes Stage One Overworld, menu/settings/credits, Playbook, pre-game, pre-snap, live play, fumble, defense selection/simulation, achievement toast, and desktop/portrait post-game captures. This is internal visual inspection, not owner approval.

### Workflow reliability change

Added workflow-level GitHub Actions concurrency:
```yaml
concurrency:
  group: ui-overhaul-browser-qa-${{ github.ref }}
  cancel-in-progress: true
```
A newer push to the same branch now supersedes an older in-progress browser-QA run. Verify this safeguard in the next workflow execution.

### Approval and next actions

- Stage One implementation: implemented.
- Automated browser QA: passed 142/142 on the pre-safeguard baseline.
- Internal screenshot inspection: performed on Run #194 evidence.
- Independent Claude review: updated package prepared against the complete Stage One scope; review still pending.
- Owner approval: pending.
- Stage Two MY TEAM / MY SQUAD: remains on hold.

Next: commit this grouped workflow/documentation update, confirm concurrency behavior in the resulting Actions run, inspect that run's artifact, then submit the curated Stage One image set for Claude's independent review. Do not describe Stage One as owner-approved.


## 2026-11-24 — Gemini Stage One Round Two polish implemented; verification pending

**Working branch:** `UI-Overhaul`  
**Implementation checkpoint:** `b6a037c07bdd2318dacb88319125db08fc093477` (Round Two implementation and targeted assertions).  
**QA-trigger commit:** `2e88f012d20f7a97ee658d451d4b5c5a31ffe123` (CSS-only no-visual-change trigger for a fresh push workflow).  
**Prior verified baseline:** Run #194, commit `95c7a8120a077aab4ec8fd23adf21890ca9fc7c7`, 142/142 passed. Run #194 does not test the new Round Two changes.

### Gemini Round Two feedback — implementation

All six requested items have been addressed in code:

1. **Overworld portrait header:** increased horizontal flex gap between VAPOR CITY and CLEARED to 8px.
2. **In-game Playbook overlay:** moved the sheet top edge down by 10px (56px to 66px, respecting safe-area inset).
3. **Pre-game matchup:** framed both team-logo regions in #131620 rounded badge cards with subtle borders and shadows.
4. **Defense Selection:** moved the possession message into the modal heading as “THEY GET THE BALL · [field position]”; the existing target badge remains suppressed while the modal is open.
5. **Post-game portrait:** converted the result screen to a vertical flex stack and anchored REMATCH / MENU in a bottom thumb-zone footer. Added an explicit hidden-state override so the flex layout cannot reveal the post-game screen before transition.
6. **Scoreboard control:** replaced the EXIT pill visually with a circular 42px pause-symbol control. The existing two-tap exit safeguard is retained; first tap arms the control and second tap exits. This is a visual control refinement, not a newly implemented pause/resume state.

### QA harness changes

Added six browser assertions covering:
- 8px Overworld header spacing.
- Two navy rounded matchup logo badges.
- Playbook sheet top offset.
- Defense modal possession heading.
- Post-game portrait bottom action position.
- Circular accessible pause-symbol control.

### Verification status — do not overstate

- Source and QA harness changes are committed to `UI-Overhaul`.
- The QA assertions have been added. A fresh push-triggered run was requested by commit `2e88f012d20f7a97ee658d451d4b5c5a31ffe123`; its run ID, result and artifact have not yet been retrieved. Do not treat it as executed or passed.
- No new workflow run ID, completion result, logs, screenshot artifact or tested SHA has been retrieved through the available GitHub Actions retrieval actions for this checkpoint.
- Run #194 remains the latest verified QA baseline only; it predates these six corrections.
- The new visual changes have not yet been inspected in a fresh rendered screenshot set.
- Independent Claude review and owner approval for this Round Two checkpoint remain pending.

### Immediate next actions

1. Retrieve the push-triggered browser-QA run for `2e88f012d20f7a97ee658d451d4b5c5a31ffe123` and verify the exact tested SHA, all assertions, HIKE readiness, page/console/request errors and artifact.
2. Inspect only the affected Round Two screens: `overworld-portrait.png`, `match-playbook-overlay.png`, `match-pre-game.png`, `match-defense-selection.png`, `match-post-game-portrait.png`, plus the scoreboard-bearing match screenshot.
3. Fix any real regressions and rerun against the corrected exact commit.
4. Update the Claude package with the new exact commit and artifact; send only changed/affected assets for review.
5. Keep Stage Two MY TEAM / MY SQUAD on hold until the owner approves all of Stage One.

**Current state:** Round Two implementation and targeted QA assertions committed; a QA-trigger push commit is present. Workflow execution/result/artifact retrieval, rendered screenshot inspection, independent review and owner approval are pending.


## 2026-11-24 — Gemini reference re-review: in-match Playbook palette consolidation

**Reference authority:** Circuit Football — UI Overhaul Handoff Spec, page 1 (global tokens) and page 9 (Pre-Game Matchup & Playbook, landscape). The owner re-supplied the 14-page reference in this project conversation.

### Stage One comparison and correction

The actual in-match play-calling sheet (#app #sheet) was re-compared with the complete Stage One direction, especially the page 1 color semantics and page 9 Playbook screenshot/instructions. The earlier treatment had accumulated competing gradients, cyan-tinted outer framing, multiple near-navy card shades, and duplicated selector blocks. That drifted from the reference's compact, matte #131620 sheet and understated #1C2130 inner surfaces.

The canonical in-match Playbook CSS is now consolidated into one authoritative block:
- Sheet surface: solid matte #131620, restrained border and shadow; no cyan outer glow.
- Inactive category controls and play cards: consistent #1C2130 inner surface.
- Active category and selected play: gold #F5B841 border/tint.
- Route diagrams: dark, quiet #101722 canvas.
- FLIP and secondary controls: dark inner surface with gold outline.
- CALL PLAY remains the single cyan #4DE1F2 execution CTA.
- Existing landscape/portrait geometry, safe-area padding, 66px landscape top clearance, play selection, route flip and call behavior are retained.

This is a focused correction to the in-match Playbook included in Stage One, not the separate menu Playbook catalog and not Stage Two.

### QA delta

Two targeted browser assertions were added for:
1. Matte navy sheet, restrained gold top edge and absence of cyan outer glow.
2. Consistent inactive inner-navy category state, gold active/selected states and dark route canvas.

Source CSS commit: 7e29d95a77aa3d268f07e7158f5883c22aa8bccb  
QA assertion commit: 8d7410d19d869d99ebd8cb2dbaedb43dc1a7895c

**Verification:** These changes are committed, but no fresh Actions result or rendered screenshot has yet been retrieved. The two new assertions are test definitions only until the workflow executes. Visual approval remains pending.


## 2026-11-24 — Full Stage One Gemini mockup comparison and correction pass

**Reference inspection:** Reopened the owner's original 14-page Gemini DOCX and inspected its embedded visual mockups, including pages/images for Overworld HUD, Menu, Settings, Credits, Goals & Stats, matchup/playbook, pre-snap, live play, fumble, defense selection/simulation, achievement toast and post-game. The written handoff mirror is not a substitute for these original visual references.

**Baseline evidence inspected:** Run #204, commit e12972b3377ccb8fa4965a5ee9353ca477b1272c, 149/149 browser assertions passed. Its screenshots are pre-correction evidence only; they do not validate the changes below.

### Corrections implemented

- **Overworld HUD:** town/progress header moved to a quiet translucent matte-navy pill, removing the overly bright title treatment; status and UPG remain in the same pill. GOAL strip and contextual A label behavior remain.
- **Overworld Menu:** header title/town centered between the corner controls. Home actions now match the Stage One mockup order: UPGRADES, MY TEAM, PLAYBOOK, GOALS & STATS. The hidden original mUpg action remains the authoritative click target; the MY SQUAD control is not deleted, but is no longer substituted for the reference's UPGRADES tile. The pink BACK TO TOWN treatment is intentional and matches the Gemini mockup; do not "correct" it to cyan.
- **Settings/Credits:** shared header centered; Home-only CURRENT GOAL card is suppressed on these tabs so their content starts at the reference's tab rail.
- **Goals & Stats:** trophy progress badge, segmented tab rail, larger cyan/gold framed challenge and achievement cards, visible one-off 0/1 counters, two-up Passing/Rushing layout, full-width Receiving and three-cell Skill Moves card.
- **Pre-game matchup:** home/away badge cards receive gold/cyan accents while retaining matte navy surfaces; subtle warm/cool atmospheric tint added. Dynamic crew names and target score remain game-state-driven.
- **In-match Playbook:** consolidated single canonical CSS treatment from page 9: matte #131620 sheet, #1C2130 inner surfaces, gold selected states/FLIP, dark route canvases, cyan CALL PLAY. Existing play/flip/call behavior retained.
- **Defense Selection:** changed from a nearly full-width bottom dock to a centered floating panel below the scoreboard; three cards use red BLITZ, slate BALANCED and green PREVENT treatments with larger readable stats.
- **Post-game:** added a mode pill, portrait team-celebration frame, reward-card styling for non-empty STYLE POINTS, gold REMATCH and cyan-edged dark MENU action. Existing loss/practice/crew outcome logic is not changed.
- **QA harness:** assertions added for menu tile order and accents, Overworld pill, centered header, Home-only goal card, Goals badge/segmented tabs/card frames/one-off counters/Stats layout, matchup badge accents, centered defense panel, and post-game mode/action treatment.

### Screens inspected and correction scope

Run #204 assets inspected: overworld-portrait.png; portrait-menu.png; portrait-settings.png; portrait-credits.png; goals-stats-challenges.png; goals-stats-achievements.png; goals-stats-team-stats.png; match-pre-game.png; match-playbook-overlay.png; match-pre-snap.png; match-live-play.png; match-fumble-pile.png; match-defense-selection.png; match-defense-simulation.png; match-achievement-toast.png; match-post-game-portrait.png.

The next fresh artifact must include and visually inspect the changed screens: overworld-portrait.png; portrait-menu.png; portrait-settings.png; portrait-credits.png; goals-stats-challenges.png; goals-stats-achievements.png; goals-stats-team-stats.png; match-pre-game.png; match-playbook-overlay.png; match-defense-selection.png; match-post-game-portrait.png. Other Stage One screens were compared and were not changed in this pass; do not include unchanged screenshots in the delta review unless fresh QA exposes a regression.

### Remaining visual questions / verification gates

1. The pre-game atmosphere remains a stylized split/halftone game backdrop rather than the blurred photographic/town-specific backdrop in the mockup. A subtle warm/cool tint is not a full replacement; this remains a visual gap unless the owner prefers the in-game art direction over the mockup backdrop.
2. The scoreboard's FIRST TO target remains a separate pill below the scoreboard, while the mockup integrates FIRST TO beside PLAY CLOCK. The actual target is game-state-driven (Run #204 showed 21); do not hard-code 14 and change match rules just to imitate the reference. Decide whether to redesign the scoreboard geometry without altering the underlying target.
3. The current live-play screenshot did not show an open receiver state clearly enough to score that specific mockup requirement. Add/verify a deterministic open-receiver screenshot before final Stage One review.
4. Run #204's post-game portrait screenshot is a loss. It does not validate the win-state STYLE POINTS reward card or practice-mode pill; add a deterministic win/practice visual case.
5. Fresh Actions run and screenshots for the current CSS/JS/QA commits have not been retrieved. The latest inspected run #204 predates these changes. Do not report the new assertions as passed or visually approve the screens until the exact current SHA is tested and its artifact inspected.

**Latest implementation work in this pass:** see current branch HEAD. Stage One remains pending fresh QA, screenshot inspection, Claude delta review and owner approval. Stage Two remains held.


### Additional Credits fidelity correction

The Credits mockup (page 7) shows the actual asset/source attributions expanded in the three cyan-framed cards. The previous implementation hid the attribution behind VIEW FULL ATTRIBUTION and showed generic summaries. The three details sections now open by default, the generic summaries and disclosure labels are hidden, and the existing source text remains intact and visible. The QA harness now checks all three expanded groups and representative source names (Kay Lousberg, glitchart, Thimras and Kevin MacLeod).

Latest code/QA checkpoint before this documentation update: 6e2154c968c9789cfccae121843f045e3c0ccab0. JavaScript syntax parsing succeeded for ui-overhaul-menu.js and the QA module after stripping module-only imports for parser validation. This is syntax validation only, not browser execution. No new Actions run/status/artifact was retrievable; Run #204 remains the last inspected browser result and predates all current corrections.


### Follow-up to the full Stage One pass

A subsequent code-level comparison corrected the pre-game overlay atmosphere: removed the split halftone/rain geometry in favor of a matte navy field with restrained warm/cool stadium-light gradients; town and crew-game chips now use gold and cyan respectively, and the VS/progress/TAP TO PLAY controls use the unified gold/cyan action hierarchy. This is an atmospheric CSS treatment, not a photographic backdrop matching the mockup exactly.

The QA harness now also checks the pre-game backdrop and team-label colors, plus verifies the Home-only CURRENT GOAL card is absent on Credits (Settings already had a corresponding check). The original run #204 screenshots still predate all of these changes.

**Latest source changes in this continuation:** CSS commit c0189cc (pregame atmosphere), QA commit 6a51cf4 (credits/pregame checks). Fresh browser QA has not yet been retrieved. The reference mockup's scoreboard placement of FIRST TO beside PLAY CLOCK is still not fully matched; the underlying target value remains dynamic and must not be hard-coded. The post-game screenshot from run #204 is a loss, so the reward card/win-state layout still requires a deterministic win-state visual check.


## Latest full Stage One QA checkpoint — 2026-11-24

- Current branch: UI-Overhaul
- Current QA-trigger commit: b88ccd45213c12bdbd2e22d5294a38858944b850
- QA harness now contains 146 assertions, including the new menu tile order, Settings/Credits goal-card removal, Goals & Stats composition, pre-game stadium-light palette, matchup badges, Playbook palette, defense panel geometry, and post-game mode/actions.
- Static validation performed: ui-overhaul-menu.js parses successfully; QA module parses successfully after accounting for module imports/top-level await; CSS and JS braces are balanced.
- GitHub commit-workflow lookup and combined-status lookup returned no workflow run or status for b88ccd4. Therefore the push-triggered browser run and screenshots have not been retrieved. No browser pass or visual approval is claimed.
- Run #204 (149/149) is pre-change baseline evidence only. It must not be used to approve the present corrections.
- Required next: obtain a fresh workflow run for exactly b88ccd4 (or a later current HEAD), verify all 146 assertions, inspect the changed screenshot set and any regressions, and add deterministic win/practice post-game evidence. The FIRST TO target's placement beside PLAY CLOCK and exact photographic pre-game backdrop remain known fidelity gaps. Stage One owner approval remains pending; Stage Two remains held.


## 2026-11-24 — Round Two polish source reconciliation (latest live branch)

**Verified branch tip at reconciliation:** `c2b024195643ce143d411a19e05381b82c23d781` — “Align Stage One matchup QA with cyan execution CTA.” The latest commit is a QA-only correction: the pre-game TAP TO PLAY assertion now expects the implemented cyan execution CTA (`#4DE1F2`), rather than the obsolete matte-navy value.

### Round Two polish implementation status

The six targeted Round Two polish items are present in the live branch:
1. Overworld town/CLEARED spacing: 8px minimum, with a dedicated portrait assertion.
2. In-game Playbook overlay: top edge at 66px (safe-area-aware), with scoreboard-clearance assertion.
3. Pre-game matchup: two rounded matte-navy logo badges with gold home / cyan away accents.
4. Defense Selection: “THEY GET THE BALL” is placed in the modal heading; duplicate field banner is suppressed.
5. Post-game portrait: vertical result composition with REMATCH / MENU actions in the lower thumb zone.
6. Scoreboard control: 42px circular, accessible pause/exit control; target badge and control separation are asserted.

The Playbook overlay is part of Stage One and remains in scope. These changes are presentation/QA refinements; no gameplay rules, save/progression logic, golden snapshots, or Stage Two surfaces were changed in this reconciliation.

### Current source inventory

- `ui-overhaul.css` blob: `44080d817290a1a41907371e9aa316cbb7d64a7f`.
- `ui-overhaul-menu.js` blob: `3cc7fec5ec2d5f03bdc93ac1220632042b276a06`.
- `qa/ui-overhaul-browser-qa.mjs` blob: `2a7d25da4ad8181cf714d3bb6e5f54ae78c84195`.
- Current QA harness contains 158 `check()` call sites, including targeted assertions for all six polish items and the cyan pre-game CTA.
- Workflow concurrency safeguard remains enabled for the `UI-Overhaul` branch; newer in-progress runs for that branch are cancelled when a newer push arrives.

### Run #225 / evidence status

The latest code/QA push is commit `c2b024195643ce143d411a19e05381b82c23d781`, which is configured to trigger the push-based UI Overhaul Browser QA workflow. The connected GitHub run lookup and commit-status lookup returned no push-run record/status; the available run lookup only exposes PR-triggered runs. **Run #225's run ID, exact tested SHA, result, job logs and artifact are therefore not independently verified here.** Do not claim it passed or inspect an older artifact as a substitute. Retrieve Run #225 from the repository Actions UI, confirm it tested the expected current code, then inspect its changed screenshots before closing this polish round.

### Remaining Stage One fidelity checks

The earlier full mockup comparison recorded these separate visual/evidence gaps; do not silently mark them closed based on the six-item Round Two polish:
- The pre-game stadium-light gradient remains an approximation of the reference's blurred town/stadium photography.
- FIRST TO remains a separate target pill rather than integrated beside PLAY CLOCK; any geometry change must preserve the live game target value.
- The current live-play capture does not prove an open-receiver state clearly enough.
- The post-game QA path currently exercises a loss result; add deterministic win/practice evidence if the reward card and mode pill still need certification.

**Approval state:** Round Two polish is implemented in source and statically represented in the browser harness; fresh Run #225 execution/artifact inspection is unverified. Stage One independent review of the complete current output and explicit owner approval remain required. Stage Two MY TEAM / MY SQUAD remains on hold. Golden snapshots remain untouched.


## Run #225 result and corrective follow-up (2026-11-24)

**Run #225 verified:** [GitHub Actions run #225](https://github.com/tinytime/Tinytime.github.io/actions/runs/45472123999), run ID `45472123999`, tested exact commit `c2b024195643ce143d411a19e05381b82c23d781`. Conclusion: **failure**. The browser QA report contained 164 checks, with 3 failures; no page exceptions, console errors, or same-origin HTTP failures.

### Passed targeted Round Two checks

The run explicitly passed the six targeted polish assertions: Overworld header spacing; in-match Playbook clearance; pre-game matchup badge treatment and cyan TAP TO PLAY; Defense Selection possession headline; post-game portrait thumb-zone actions; and scoreboard target/pause-control separation. The post-game screen and portrait fit assertions also passed.

### Three failures diagnosed from report and screenshots

1. **Menu brand centering:** measured center x=710 in a 1440px viewport, 10px left of true center. The header grid allocated unequal 40px / 60px side columns.
2. **Menu tile accents:** later broad neutral-border rules overrode the semantic tile colors. The captured colors were neutral / cyan / neutral / gold, instead of gold UPGRADES plus cyan MY TEAM, PLAYBOOK and GOALS & STATS.
3. **Team Stats skill cells:** the screenshot showed Skill Moves as a single inline text row, not three separate cells. The enhancement script targeted `#goalsP` while the rendered stats panel is `#ui-goals-panel-stats`, so the helper did not find the target panel.

### Corrective commits pushed

- `4b4eef4a94300408699ebddee177fbda125cf5eb` — balanced the menu header side columns at 60px each; restored the gold/cyan semantic tile border colors after later neutral rules; added explicit three-cell Skill Moves presentation styles to the rendered stats panel.
- `6d1c6cfaa7876a5370fb536a13b16a4596d46a88` — changed the Team Stats enhancement target to prefer `#ui-goals-panel-stats`, with `#goalsP` fallback, so the skill-move cells are generated in the actual rendered panel.

These commits should trigger the next push-based Browser QA run (expected Run #226). **Do not mark Run #225 passed**; it failed on the three assertions above. Inspect the next run's report and screenshots to confirm all three corrections, then continue the full Stage One review. No golden snapshots were modified.


## Run #229 result and single remaining menu correction (2026-11-24)

**Run #229 verified:** [GitHub Actions run #229](https://github.com/tinytime/Tinytime.github.io/actions/runs/45474891207), run ID `45474891207`, tested exact commit `6195c2eb34b5232b309be1c79723f21a411c6bde`. Result: **163/164 checks passed**. No uncaught page errors, console errors or same-origin HTTP failures.

The run confirms the Team Stats correction: Skill Moves now renders as three independent cells. The six Round Two polish assertions all pass, along with the other Stage One menu, Goals & Stats, Overworld, pre-game, in-match Playbook, defense-selection and post-game checks. The actual desktop menu screenshot was inspected. The only failing assertion is the semantic tile accent check: UPGRADES is gold, MY TEAM and PLAYBOOK are cyan, but GOALS & STATS remains gold.

**Root cause:** the legacy selector `#menu .ui-menu-actions #mGoals` has greater CSS specificity than the data-attribute tile selectors, so it continues to force a gold border even though the GOALS tile is tagged `data-ui-tile="goals"`. This is a CSS cascade issue, not a missing tile tag or a runtime error.

A narrow, higher-specificity override is being added for only `#mGoals`, including hover and keyboard-focus states. No other tile colors or behaviors are changed. Run #230 must confirm the single remaining assertion and the refreshed screenshot before this correction is considered verified. Golden snapshots remain untouched; Stage One is not yet approved and Stage Two remains held.


## Run #230 result and remaining menu accent correction (2026-11-24)

**Run #230 verified:** [GitHub Actions run #230](https://github.com/tinytime/Tinytime.github.io/actions/runs/45475484945), run ID `45475484945`, tested exact commit `c48d542b8484fabaac606ea45d3b54033ca052ad`. Result: **163/164 checks passed**. No page errors, console errors or same-origin request failures.

The GOALS & STATS cyan correction is confirmed by the computed style in the browser report. The only remaining failure is the MY TEAM border-strength assertion: its computed cyan alpha is `.62`, while the Stage One tile treatment requires `.82`. The desktop screenshot shows the tile is cyan, but the exact style token remains inconsistent.

**Root cause:** an older selector, `#menu .ui-menu-actions #mTeam`, sets the border to `rgba(77,225,242,.62)` with important priority. The prior semantic tile selector does not override that legacy ID rule. A narrowly scoped, higher-specificity override is being added for `#mTeam` and its hover/focus-visible states, setting the shared `.82` cyan frame strength. No tile layout, content, gameplay, or other menu behavior is changed.

Run #231 must verify the exact four computed tile colors and fresh desktop/portrait menu screenshots. Run #230 confirms the Team Stats three-cell layout and all six Round Two polish assertions. Stage One is still not approved; complete the remaining Stage One fidelity/evidence gates, Claude's independent review and owner approval before Stage Two. Golden snapshots remain untouched.


## Run #231 result and Stage One scoreboard correction (2026-11-24)

**Run #231 verified:** [GitHub Actions run #231](https://github.com/tinytime/Tinytime.github.io/actions/runs/45477746909), run ID `45477746909`, tested exact commit `3153abc6676d8a4dd3ba7cbfb93366aa1f2545dd`. Result: **164/164 checks passed**. The MY TEAM cyan tile frame now matches the required PLAYBOOK and GOALS & STATS border strength. Fresh menu screenshots were inspected; the desktop and narrow portrait menu layouts are visually consistent.

### Remaining Stage One work in progress

The FIRST TO target has now been moved into the scoreboard's PLAY CLOCK module as a compact adjacent target badge. Browser QA now asserts that it is a static child of the clock module, visibly adjacent to the clock readout, and does not overlap it; the circular EXIT control remains independently checked. This change is pending its next full browser QA run and screenshot inspection.

The other remaining gates are unchanged: deterministic OPEN-receiver visual evidence, atmospheric pre-game background fidelity, deterministic win/practice post-game evidence, complete Stage One screenshot review, Claude's independent review, and explicit owner approval. Stage Two remains untouched; golden snapshots remain untouched.


### Run #232 result and scoreboard spacing correction (2026-11-24)

**Run #232:** [GitHub Actions run #232](https://github.com/tinytime/Tinytime.github.io/actions/runs/45478784824), run ID `45478784824`, tested `9974170d811bfa49a360a7855c33ce6e8ef11877`. Result: **164/165 checks passed**. The new target is correctly nested inside the PLAY CLOCK module and is no longer a floating pill. However, the first screenshot revealed that the target badge overlapped the clock readout because the clock's inner flex children were allowed to shrink without fixed widths. The screenshot was inspected and the QA geometry recorded a -20px overlap.

The clock module is being corrected with explicit 40px readout and 56px target widths, a 132px container, and space-between alignment. The assertion requires a positive horizontal gap and shared vertical alignment. The circular pause control and overlay hide behavior passed. This correction is pending Run #233. No gameplay logic or golden snapshots changed.


### Run #232 — scoreboard integration QA found a specificity conflict

Run #232 tested `9974170d811bfa49a360a7855c33ce6e8ef11877`: **164/165 passed**. The new assertion correctly caught the target still stacking over the clock readout. The legacy `#hud #bug #bClock` column rule had higher specificity than the first integration rule, so the target was technically nested but not side-by-side. No page exceptions or same-origin HTTP errors were reported. The correction now explicitly overrides that legacy rule at matching/higher specificity and gives the target a fixed adjacent slot. Retest pending; no snapshots were changed.


### Run #232 regression and correction

Run #232 (ID `45478784824`) tested commit `9974170d811bfa49a360a7855c33ce6e8ef11877` and returned **164/165**. The sole failure was the new target/readout spacing assertion: the target badge was a child of the clock module, but a legacy display rule prevented the intended flex row and caused a 20px overlap. The screenshot confirmed the overlap. No page errors, console errors, or same-origin request failures occurred.

A narrow CSS correction now explicitly sets the clock module to a non-wrapping flex row and fixes the readout/target widths. The strict QA assertion remains unchanged; this correction is pending a fresh run. Stage Two and golden snapshots remain untouched.


### Run #235 — scoreboard layout verified; overlay regression identified

Run #235 tested `0da4bf7c10527d989e6c96620a815acc16933555`: **163/165**. The integrated target/readout spacing is now correct (10px gap, no overlap), and the screenshot confirms the target badge is legible beside PLAY CLOCK. The two remaining failures were that the target badge did not hide beneath the in-match Playbook and Defense Selection overlays: the new high-specificity flex rule overrode the older hide selectors. No page errors, console errors, or same-origin failures occurred.

The correction adds overlay-aware selectors at the same specificity level. In the same pass, the receiver cue rendering is being brought into line with the original handoff mockup: covered receivers become dark translucent controls with muted lettering; only open receivers retain their role-color marker and green ring; each open receiver receives one green OPEN pill below the marker. A localhost-only deterministic QA hook and screenshot assertion now exercise both open and covered states. These changes are pending a new browser run and visual inspection.


### Run #235 — overlay regression isolated

Run #235 (ID `45479577833`) tested commit `0da4bf7c10527d989e6c96620a815acc16933555`: **163/165**. The only two failures were FIRST TO not yielding while the in-match Playbook and Defense Selection overlays were open. Screenshots confirmed the badge remained visible behind both overlays; no page exceptions, console errors, or same-origin request failures occurred.

The root cause was the overlay visibility being controlled through the game's shared `show()` helper while the CSS-only `:has()` hide selectors did not reliably track the active overlay in the runtime. The helper now explicitly hides the integrated target while either overlay is shown and restores it after both close. The existing strict QA assertions remain unchanged. Pending a fresh run and screenshot inspection.


### Run #236 — receiver cue render confirmed; deterministic fixture stabilized

Run #236 tested `a10e3fba0c8c91717cab318a47b9040c6ab7a615` and stopped on the new receiver-state wait (5-second timeout). The captured live-play screenshot confirms the new green rings and OPEN pills render, but the real match advanced into a dead-ball state before the test's polling condition completed. The browser reported no page exceptions, console errors, or same-origin failures.

The QA fixture is being made deterministic: it pauses the play clock, parks defenders away from the catch points, holds two receivers outside QB range, and samples the live cue state after one render interval rather than waiting through the live simulation. This remains QA-only and does not change normal match behavior. Overlay-hide assertions were not reached in this run and remain pending verification.


### Run #238 — integrated scoreboard and match-state verification (2026-11-24)

**Run #238 verified:** [GitHub Actions run #238](https://github.com/tinytime/Tinytime.github.io/actions/runs/45480794999), run ID `45480794999`, tested exact commit `21c71ce548d426f7668c176be003dea5f3d689f8`. Result: **167/167 checks passed**. No uncaught page exceptions, console errors, or same-origin request failures.

The fresh live-play screenshot was inspected: two receivers carry green rings and one OPEN pill each; covered receivers remain muted with no OPEN pill. The fumble meter clears the A mash control by 47.9px at 65% viewport width. Defense selection, three aligned stat rows, in-modal possession headline, defense simulation, hidden offense controls, play-by-play/TAP TO SKIP, achievement toast, integrated FIRST TO/PLAY CLOCK scoreboard, overlay target hiding, and portrait loss-result layout all passed.

**Visual gaps found during screenshot inspection:** the pre-game screen still reads as a flat gradient/grid rather than the handoff's warm floodlit turf and town skyline. The loss-result screen also leaves the STYLE POINTS card blank when the match earns zero points. These are now being corrected. The browser suite is being extended to verify both halves of the pre-game atmosphere, solid navy badge cards, a visible zero-point card, and a deterministic PRACTICE WIN result with a 3,700-point card and fresh portrait screenshot. Pending retest; no golden snapshots changed.


### Run #239 — QA parser correction

Run #239 (ID `45481651325`) tested `77ba7e053a48430f15d6ffb4dcb66ea6c27e5cc4` and failed before the browser suite started because of one extra closing brace in the new pre-game atmosphere assertion. No application checks ran and no screenshots were generated. The QA-only syntax error was corrected in commit `93de189bc16552916d7adffd50421f7a610124d6`; the next run executed the suite normally.

### Run #240 — rewards verified; two visual corrections remain

Run #240 (ID `45481832612`) tested `93de189bc16552916d7adffd50421f7a610124d6`: **172/173 checks passed**. The deterministic practice-win and loss result states both rendered; the portrait practice-win screenshot was visually inspected and confirms PRACTICE WIN, PRACTICE MODE, both team logos, the celebrating squad, and STYLE POINTS 3,700. The loss screen now shows STYLE POINTS 0 rather than leaving the reward card blank. No uncaught page exceptions or same-origin failures occurred.

The single failed assertion exposed a CSS specificity conflict: the matchup's legacy `.rain` and `.holo` backgrounds overrode the new stadium/town backdrop layers. The new background selectors now outrank those classes. Visual inspection also found that the defense-selection panel's final stat row was clipped on the 844×390 landscape viewport even though the DOM contained all three rows. A short-landscape compression rule and a strict no-clipping/no-internal-scroll assertion are added. Both fixes are pending a fresh run and screenshot inspection. Stage Two and golden snapshots remain untouched.


### Run #240 — backdrop and practice-win screenshots visually inspected

Run #240 (ID `45481832612`) tested `93de189bc16552916d7adffd50421f7a610124d6`: **172/173 passed**. The only failure was the new atmosphere assertion expecting a `conic-gradient` in the computed left background. The browser's computed style correctly reports the actual repeated field-line gradient instead; the screenshot shows the intended warm left-side light treatment and cyan town skyline. The QA assertion is being aligned with the rendered CSS (repeating field lines, clipped warm/cool halves, skyline silhouette, and pseudo-layer presence), not relaxed to a generic pass.

The practice-win screenshot was visually inspected: PRACTICE WIN banner, explicit NO REWARDS · PRACTICE MODE pill, 14–0 team score with both logos, framed squad panel, STYLE POINTS 3,700 card, and side-by-side REMATCH / MENU actions are all visible. The zero-point loss-state reward-card correction is included. Retest pending.


### Run #240 result and remaining Stage One visual work (2026-11-24)

**Run #240:** [GitHub Actions run #240](https://github.com/tinytime/Tinytime.github.io/actions/runs/45481832612), tested `93de189bc16552916d7adffd50421f7a610124d6`. Result: **172/173 checks passed**. The only failure was the expanded pre-game atmosphere assertion: the dynamic in-game style block overrode the new external `.fx1/.fx2` background declarations because their selectors had equal specificity. The new skyline/light layers are visible in the screenshot, but the intended conic floodlight beam and radial town glow were not active. The next correction raises selector specificity and checks the actual team badge card, not only its logo child.

The deterministic Practice Win screen now renders with the correct win banner, practice mode pill, team score card, and a visible `STYLE POINTS 3,700` card. The screenshot was inspected. One remaining visual improvement is to trigger the existing touchdown celebration animation on the squad instead of leaving the players in neutral poses; the QA fixture now requests that animation and verifies the celebration state.

Additional visual findings from the original handoff comparison: the Defense Selection panel clips its lower stat row in 390px landscape; the fumble countdown is plain text rather than the required seconds pill; and the defense-simulation screenshot is currently captured before a completed play-by-play snap. These are being corrected and asserted. No golden snapshots changed.

### Run #243 — QA duplicate declaration corrected

Run #243 (ID `45482963439`) tested `13eace99835b3a3f6f153bb47dbe5ee5e7bd9422` and failed before browser launch because two defense-selection geometry checks declared the same `const defenseFit` in one block. The application changes were not exercised and no screenshots were generated. The more detailed scoreboard-relative geometry object is now named `defenseFitDetailed`; both strict clipping checks remain in place. Pending full retest.

### Run #244 — fumble timer assertion corrected

Run #244 (ID `45483202613`) tested `b5baeed91b94bd445281fa7a679e3f788933f9df` and reached the fumble-pile check, then timed out waiting for the countdown's new seconds suffix. The game-side timer now appends `s`; the QA regex had an over-escaped decimal point, so it could not match the rendered value. No page exceptions, console errors, or same-origin failures occurred. The assertion now uses a character class for the decimal point, preserving the strict one-decimal-plus-`s` format check. Pending rerun.


### Run #244 result — timer assertion correction and pre-game accent refinement (2026-11-24)

**Run #244:** [GitHub Actions run #244](https://github.com/tinytime/Tinytime.github.io/actions/runs/45483202613), tested `b5baeed91b94bd445281fa7a679e3f788933f9df`. The browser job reached the fumble QA state, then timed out waiting for the countdown text. The game now emits the expected seconds suffix; the QA regular expression had been over-escaped and was looking for a literal backslash, so it could not match the valid value. The expression is corrected. The failure was in the assertion, not the timer logic.

The Run #244 pre-game screenshot was visually inspected. The new atmospheric backdrop and solid matte-navy badge cards are a substantial improvement; the VS medallion and card composition now align with the handoff. The remaining badge correction is to force the home accent to gold and away accent to cyan rather than inheriting each crew's orange/purple palette. That is now applied. The verified Defense Selection no-clipping rule from Run #242 is retained without the redundant override.

The practice-win fixture now resets every field player's rig fall state and sets the standing, arms-raised celebration pose, without relying on a team-label filter. Run #245 will verify the timer pill, celebration screenshot, gold/cyan badge accents, and the complete Stage One browser suite. No golden snapshots changed.


### Run #246 — celebration fixture API correction

Run #246 (ID `45483894574`) reached the deterministic Practice Win setup after the preceding fumble, defense, and matchup checks, then stopped with `TypeError: RIGF is not a function`. `RIGF` is the front-view rig object, not a callable reset function. The fixture already resets each player's fall/lying/stun fields directly; the invalid rig invocation is removed while preserving the touchdown result and arms-raised celebration pose. The updated fixture is pending a full retest.


### Run #247 — full suite green; final match-control polish

**Run #247 verified:** [GitHub Actions run #247](https://github.com/tinytime/Tinytime.github.io/actions/runs/45484497458), run ID `45484497458`, tested exact commit `b25e4902ba8cbb943e71ad29b5f10cf9db045159`. Result: **177/177 checks passed**. The run confirms the corrected fumble timer seconds pill, three-row Defense Selection, completed Defense Simulation play-by-play and TAP TO SKIP, and deterministic Practice Win rendering. Fresh screenshots were inspected.

The practice-win screenshot still showed the squad in a neutral-looking pose. The fixture now selects the first procedural celebration variant (raised-arm jump) instead of the third taunt variant. The final control polish also replaces the pre-snap CHANGE PLAY / SHOW PLAY brown surfaces with matte navy and gold borders, and gives the live-run HURDLE / DIVE button the specified matte navy/gold treatment. Query-gated fixtures and strict palette/clearance assertions are added. Pending full retest. Stage Two and golden snapshots remain untouched.


### Run #247 — full Stage One browser suite passes

Run #247 (ID `45484497458`) tested `b25e4902ba8cbb943e71ad29b5f10cf9db045159`: **177/177 passed, 0 failed**. The fumble countdown now renders as the gold-edged navy seconds pill, the defense-selection modal fits all three aligned stat rows in the 390px landscape viewport, and defense simulation captures a completed play-by-play result with offense controls hidden. The practice-win result now uses the actual touchdown celebration pose and shows the 3,700 STYLE POINTS card, team logos, and side-by-side actions. I visually inspected the pre-game, defense-selection, fumble, defense-simulation, live-play, and practice-win screenshots.

### Final scoreboard consistency correction

The Stage One specification describes one unified scoreboard containing PLAY CLOCK and FIRST TO X across match states. The target was still being hidden by legacy overlay CSS during Playbook, Defense Selection, and Defense Simulation, despite now being integrated inside the clock module. That old hiding behavior is no longer appropriate because the target no longer occupies the lane below the scoreboard. It now remains visible inside the scoreboard during all three overlays; Browser QA checks visibility and existing geometry checks ensure it stays inside the scoreboard and clear of the overlay. Retest pending.


### Run #249 — unified scoreboard and control polish verified (2026-11-24)

Run #249 (ID `45485336117`) tested exact commit `7e56672a0091e60cb6a5749372b6ae2792c1e4ec`: **182/182 checks passed, 0 failures**. FIRST TO remains visible inside the clock module during the in-game Playbook, Defense Selection, and Defense Simulation. Pre-snap CHANGE PLAY / SHOW PLAY and live HURDLE / DIVE controls now use the approved matte-navy/gold treatment; HURDLE clears TURBO by 14px. The screenshot set was visually inspected.

The next correction addresses three issues visible in those screenshots that were not yet asserted: the legacy MY SQUAD button row still appears above the redesigned menu; the fumble timer is styled correctly but remains at the bottom of the viewport instead of immediately below the contest bar; and the practice-win screenshot is not yet a convincing celebration because the fixture ends the match before the field renderer can apply the pose, while also clearing the practice note that reserves space below the squad frame. The fixture now briefly restores the HUD and allows 45 render frames before ending the practice match, preserves the game's `Practice win. No rewards.` note, and verifies that the celebration timer has actually advanced and the reward card clears the squad frame. A new DIVE screenshot is also captured. Pending Run #250. Stage Two and golden snapshots remain untouched.


### Run #250 — menu and fumble fixes pass; celebration renderer needs explicit draw (2026-11-24)

Run #250 (ID `45486127416`) tested `646d4169ea1199fea9689e12d7a685e47e73c3a5`: **184/185 checks passed**. The legacy MY SQUAD row is hidden in both portrait and landscape menu screenshots; the fumble timer is centered directly below the contest bar (6px gap, exact center alignment); and the practice-win note keeps the STYLE POINTS card below the framed squad area. No page errors, console errors or same-origin request failures.

The sole failure was the rendered celebration check: all seven players had `celeb=60` after the fixture's wait, proving the game renderer had not advanced. The field renderer only applies the 3D pose when `drawEntities()` is called; the ended-match test fixture had waited for animation frames without invoking the renderer. The next correction explicitly advances `drawEntities()` for 45 frames with the HUD gate open, records the 3D renderer frame delta, and keeps the HUD element present but visually transparent/inert on standard post-game screens so the field renderer does not fall back to idle 2D sprites. Browser QA now verifies both the renderer frame delta and the hidden-HUD/render-only state. Pending Run #251. Stage Two and golden snapshots remain untouched.


### Run #251 — renderer hook scope correction (2026-11-24)

Run #251 tested `b5de0791448cd06b73be78881d1d54f4c11f2959` and stopped in the practice-win fixture because `drawEntities()` is private to the field-rendering script closure, while the UI QA hook is defined in a separate closure. This was a test-harness scope error, not a game-renderer failure. The field-rendering module now exposes a narrow `window.__CF3D_DRAW_ENTITIES` hook, and the practice fixture calls that function for 45 animation frames while the HUD gate is open. The end-game renderer-only HUD behavior and visual layout assertions remain in place. Pending Run #252; no golden snapshots changed.


### Run #252 — field renderer advances; vector celebration path required (2026-11-24)

Run #252 tested `95396692ebed114cebbf9fd21da8748ef888163a`: **185/186 checks passed**. The renderer hook executed 45 field frames, the post-game HUD stayed visually hidden while the renderer gate remained active, and the practice note/reward-card spacing passed. The only failed assertion was the celebration pose: the default match renderer uses the baked 2D vector sprites, whose art path did not consume `p.celeb`; the optional 3D renderer frame count alone was not proof of a visible pose. The next correction adds a cached raised-arm SVG variant to the default vector player art, passes the celebration flag into the sprite renderer, and verifies that the actual 2D celebration sprite was drawn (or the 3D path was used). Pending Run #253. No golden snapshots changed.


### Round 3 polish — implementation and Run #256 verification (2026-11-24)

**Implemented on `UI-Overhaul`:** the five Round 3 items are recorded together with the two additional handoff-fidelity corrections:
- In-match Playbook now uses four cards per row at the tested 844px landscape viewport (five at wider landscape widths), wraps titles, and reduces title size to 12px so play names remain legible.
- Selected-card fill is neutral navy; the route canvas is grayscale/monochrome so the route art no longer uses the legacy brown/gold palette. Gold remains reserved for the selected-card border and secondary controls.
- Defense Simulation fades/hides the prior field banner and delays the `THEIR DRIVE · BALANCED` pill entrance by 170ms.
- Practice-win reveal reinforces the raised-arm celebration state for all seven visible field players through the reveal. QA now audits every visible player rather than only counting players with a celebration flag.
- Pre-game matchup adds a clearer diagonal stadium-light beam and a visible floodlight bank while retaining the two solid `#131620` team badge cards and town skyline treatment.

**Commits (in order):**
- CSS and matchup/Playbook polish: `e6b5fa35251ca0890cdbccc5c25502e92834db1c`
- Practice-win squad celebration: `17413cdd090b91e4c61e28bd708cf27d774991fa`
- Expanded browser assertions: `a814d3b80de94e44f5161abd0004e1fbab790c6e` (current tested HEAD)

**Browser QA:** [Run #256](https://github.com/tinytime/Tinytime.github.io/actions/runs/45496316858) completed **SUCCESS — 190/190 checks passed, 0 failures** against exact HEAD `a814d3b80de94e44f5161abd0004e1fbab790c6e`. The five new/expanded assertions all passed: pre-game floodlight/beam, four-to-five-column Playbook with fitting titles, neutral route artwork, prior-banner/drive-pill transition, and all-seven-player celebration audit. The run reports zero page exceptions, console errors, and same-origin HTTP failures.

**Evidence:** [Run #256 artifact — ui-overhaul-browser-qa](https://github.com/tinytime/Tinytime.github.io/actions/runs/45496316858/artifacts/14967729271), 8,650,180 bytes, 37 PNG screenshots plus QA report/diagnostics; retained through 2026-12-08. The artifact is uploaded and available for download. Screenshot images have not yet been visually inspected in this session because local data-analysis access is temporarily unavailable; therefore this is automated QA evidence, not visual approval.

**Stage One status:** implementation and automated browser QA updated; internal visual inspection of the new artifact, Claude review where required, and owner approval remain pending. Stage Two remains on hold. No golden snapshots or snapshot provenance were changed.


### Round 4 — defense-drive pill fit correction and scope clarification (2026-11-24)

**Owner feedback:** Round 4 rated the Stage One bundle 9/10. Round 3 visual issues were confirmed fixed. One new defect remains: the Defense Simulation status pill clips the right edge, truncating the yard-line context. The reviewer also noted MY TEAM and MY SQUAD were not in the bundle.

**Implemented for the remaining Stage One defect:**
- `#tkTop` is centered with `left:50%` / `translateX(-50%)`, a viewport-constrained max width, border-box sizing, and wrapping on both title/status rows.
- Browser QA now asserts the pill is centered, has at least 12px viewport clearance on both sides, has no internal horizontal overflow, and retains the `BALL ON` yard-line context.
- CSS commit: `91fa9cf60baa661fe3ac3e5ca527acf4812cf47f`.
- QA commit / Run #258 tested HEAD: `f3b657617d601d331702b2be556590c7210c6592`. Run #258 is pending at time of this documentation update.

**MY TEAM / MY SQUAD scope:** These screens are Section 3 of the supplied handoff and explicitly designated **Stage Two**. They are intentionally not included in the Stage One QA artifact. They remain unverified against Section 3, and no implementation or Stage Two QA has been started. The gate remains owner approval of the complete Stage One package.

**Current status:** Round 3 fixes remain backed by Run #256 (190/190). Round 4 pill correction awaits Run #258. Final visual inspection, independent Claude review where required, and owner approval remain outstanding. No golden snapshots or snapshot provenance were changed.


### Run #258 — Round 4 defense-drive pill verified (2026-11-24)

- **Result:** browser QA completed successfully, **191/191 checks passed**, zero failures, zero page exceptions, zero console errors, and zero same-origin HTTP failures.
- **Tested commit:** `f3b657617d601d331702b2be556590c7210c6592`.
- **New defense-pill assertion:** passed at the 844px landscape viewport. The pill bounds were left=184.95px, right=659.05px, viewport=844px (centered within 2px and >12px clearance on both sides); no horizontal overflow. Full status remained visible: `2nd & 6 · BALL ON THEIR 39`.
- **Evidence:** [Run #258](https://github.com/tinytime/Tinytime.github.io/actions/runs/45510700772), artifact [14974438683](https://github.com/tinytime/Tinytime.github.io/actions/runs/45510700772/artifacts/14974438683), 8,535,878 bytes, 37 PNG screenshots plus report/diagnostics. Retained through 2026-12-08.
- **Scope:** MY TEAM and MY SQUAD remain Section 3 / Stage Two, intentionally excluded from Stage One. They remain unverified and untouched pending Stage One owner approval.
- **Status:** Round 4 automated correction is verified. Artifact screenshot visual inspection, Claude's independent review where required, and owner approval remain outstanding. Stage Two remains on hold. No golden snapshots or provenance were changed.


### Round 5 — Fumble contest centering and palette correction (2026-11-24)

**Owner feedback:** the Fumble page's contest pill/bar is visibly off-center and the text/button still use the legacy palette.

**Root cause found in the live stylesheet:** an older later-in-file override reset `#pileBar` to `left:8vw` and `transform:none`, overriding an earlier centered rule. The fumble meter also retained legacy burgundy track and green fill, muted labels, and an unthemed A mash button.

**Implemented on UI-Overhaul:**
- `#pileBar` is now centered against the viewport with `left:50%` and `translateX(-50%)`, while preserving its 65vw target width and 8px clearance from the A mash control.
- Fumble panel and labels now use the Stage One `#131620` navy, white, cyan `#4DE1F2`, and gold `#F5B841` palette.
- Track is deep navy; fill is a cyan-to-gold gradient; center marker is white/gold.
- Countdown pill stays navy with a gold border and text.
- A mash button is now navy with cyan text and a gold border.
- Browser QA now asserts viewport centering, width, mash-button clearance, and computed palette for the panel, track, fill, labels and button.
- CSS commit: `ac23e1aa282c3c2197294738fae0b338de352f68`.
- QA commit / current tested HEAD: `01e96cdc2f2398d42d23b81981bd4999062520b4`. Fresh browser QA run pending.

**Status:** implementation committed; automated verification pending. This is a targeted correction to Stage One Fumble gameplay UI. No golden snapshots or provenance changed. Stage Two remains on hold.


## Round 5 — Run #260 failure analysis and follow-up QA correction (2026-11-24)

**Run #260:** [GitHub Actions run 45514343698](https://github.com/tinytime/Tinytime.github.io/actions/runs/45514343698) tested `01e96cdc2f2398d42d23b81981bd4999062520b4` and completed with a failed browser-qa job. Workflow setup and Playwright/Chromium installation passed; the harness executed and uploaded a 42-file / 8.57 MB artifact (`14977317527`). There were no page exceptions, console errors, or same-origin HTTP failures.

Three Fumble assertions failed:
1. The viewport-centered 65vw bar was centered at x=422 in an 844px viewport, but its right edge overlapped the A mash button by 32.25px.
2. The palette assertion reported the fill's computed background shorthand as transparent; the panel, track, labels and A mash button computed navy/cyan/gold as intended. The assertion was not inspecting backgroundImage, so it did not reliably verify the actual gradient.
3. The timer was 2.3s, navy, 24px high and 6px below the bar, but its center was x=341.81 versus the bar center x=422. The timer's actual navy alpha was .98, while the assertion expected .96.

### Follow-up already present on the live branch

The current branch stylesheet has a later Round 5 follow-up that centers the contest meter within the usable left field lane (40vw center), reduces it to 55vw with a viewport/button-safe max width, and aligns the timer to the same 40vw center. The QA geometry check was correspondingly updated to require 50–58vw width, at least 8px button clearance, and alignment to the usable-lane center. This is intentionally not viewport-center alignment because the A mash control occupies the right-side lane.

### QA precision correction committed

After Run #260's report was inspected, the QA harness was strengthened to read backgroundImage as well as computed background color, assert both cyan #4DE1F2 and gold #F5B841 gradient stops explicitly, and check the timer's actual .98 navy surface, gold text and gold border as well as its alignment directly beneath the bar.

QA assertion commit: `d8730820367ce5914051180a1200bfbbf8f1ca8e`.

**Verification status:** Run #260 is a confirmed failure on its exact tested commit; it does not validate the later usable-lane CSS/QA state. The updated harness and branch state require a fresh browser Actions run. Do not claim the Fumble correction is verified until that run passes and its match-fumble-pile.png is visually inspected. No golden snapshots/provenance were changed. Stage Two remains on hold; Stage One owner approval remains pending.


## Stage One owner approval and Stage Two start — 2026-11-24

**Owner decision:** The owner explicitly approved Stage One and authorized moving to Stage Two. Stage Two is now active. This approval is recorded as the project gate decision; it does not retroactively claim the Run #260 Fumble follow-up passed. Run #260 remains a failed run (189/192) on `01e96cdc2f2398d42d23b81981bd4999062520b4`; the follow-up QA changes still need a fresh Actions result and screenshot inspection.

### Stage Two scope — handoff Section 3, pages 5–6

The work is limited to **MY TEAM and MY SQUAD**. Existing save-backed editors, 2.5D preview renderer, roster state, progression locks, attribute purchases, uniform/team identity, logo selection and career data remain authoritative. This is a presentation and navigation overhaul, not a replacement of game systems.

### Implemented in the first Stage Two pass

- Added a visible MY SQUAD action to the tabbed Overworld menu beside MY TEAM, preserving the existing `#mSquad` click handler.
- Restyled MY TEAM and MY SQUAD around the Stage One `#131620` / `#1C2130`, gold `#F5B841`, cyan `#4DE1F2`, white and muted-slate palette.
- Reframed the existing team and player canvases as atmospheric 2.5D preview cards; retained existing preview functions and saved customization state.
- Restyled team name, logo picker, uniform slots, palette controls, lock hints, player attribute bars, upgrade cost/boost controls, player OVR and the pinned horizontal roster strip.
- Recast the team screen's existing DONE action as SAVE & EQUIP presentation; its original handler remains in place and edits continue to persist through existing save logic.
- Consolidated squad navigation into ATTRIBUTES / STYLE & GEAR / CAREER. STYLE & GEAR retains appearance controls and exposes an EDIT GEAR & TRAILS action; the gear editor has a BACK TO STYLE return path. Existing appearance, gear and career renderers remain in use.
- Split squad progression into distinct PTS and CAP badges, with team defense shown as secondary metadata.
- Added responsive portrait layout rules and a dedicated Stage Two browser-QA sequence for team and squad navigation, preview, identity/uniform controls, tabs, gear return path, metrics and screenshots.

### Code and QA commits

- CSS Stage Two screen treatment: `3791e1e86b22402901bed7c2156b802f02ba6b64`.
- Menu MY SQUAD entry: `c8cafb13906bfb7266c57f9ff5e08c784a9e3fd6`.
- Squad navigation and gear subview: `943c81267587d4460b0f52938fe5db282762e798`.
- PTS/CAP markup: `f5e171d20bcd7398212ba06b17bc33d589cff365`.
- Metric styling: `9b180fea6dfbed09464f6b41f685ba1effa3cd60`.
- Stage Two QA coverage: `178021e568be9a0c0d5a8072cb47c9dbff6399ba` and portrait viewport correction `8b978a48267059f5c9e54adeb20705dffa592899`.

**Verification status:** implementation changes and QA assertions are committed. The fresh browser run for this Stage Two branch state has not yet been retrieved or confirmed. No Stage Two screenshot has been visually inspected in this pass. Do not claim automated or visual approval until the exact pushed HEAD has a passing Actions run and its `my-team-portrait.png`, `my-squad-attributes-portrait.png`, and `my-squad-gear-portrait.png` are inspected. No golden snapshots were modified. Stage Two remains in progress and requires owner review after internal QA.


### Stage Two follow-up — paired team identity and QA alignment

- MY TEAM now groups the live team-name input and logo picker in one responsive identity card. Existing logo picker, team-name input events and save persistence are retained.
- MY SQUAD now presents separate PTS / CAP metric badges; Team Defense remains secondary metadata.
- Stage Two browser assertions were expanded to verify the paired identity card, portrait viewport, team canvas, uniform controls, SAVE & EQUIP presentation, MY SQUAD menu tile, three-tab navigation, nested gear editor and return path.
- Follow-up commits: paired identity markup `ebec6dc0b78e938e9c64d1d00c41a8897a506865`; identity card CSS `09644d3c2a7e2085b501425ec470558ef70101eb`; QA identity assertion `a2ed087defb74e2dbef8544f3cd6f21c92b045f1`.

The latest Stage Two QA source is committed, but its Actions result is not yet verified. The QA sequence captures `my-team-portrait.png`, `my-squad-attributes-portrait.png`, and `my-squad-gear-portrait.png`. The first browser run must be inspected for functional regressions, 390×844 clipping, fixed roster strip behavior, and actual screenshot fidelity. No golden snapshots changed.


### Stage Two browser QA — Run #275 queued/in progress

The latest Stage Two code/QA commit is `a217742d20b36e626d9b43a327df1fcebe786606`. GitHub Actions [Run #275](https://github.com/tinytime/Tinytime.github.io/actions/runs/45517810094), run ID `45517810094`, checks out that exact SHA. At the last poll, job `browser-qa` was in progress: checkout and Node setup succeeded; Playwright/Chromium installation was running; browser assertions had not started and no artifact was uploaded yet. Earlier push-triggered runs were cancelled by the branch concurrency guard as newer Stage Two commits arrived; Run #275 is the first run against the consolidated Stage Two QA commit. Await its final result before assessing implementation.


## Stage Two continuation — MY TEAM tabs and menu QA corrections (2026-11-25)

**Current live HEAD:** `bab0e23c9c37cffebb1730c654cdd8336501d3b3` on `UI-Overhaul`.

### Run #278 diagnosis
- [Run #278](https://github.com/tinytime/Tinytime.github.io/actions/runs/45520949059) tested `2cc7966a3785c8227cd0eaeb4a29a980b0f5b0d8`.
- The earlier Node-side `innerWidth` reference in the Fumble assertion was corrected by reading the captured browser viewport from `pileGeometry.viewport`.
- The run then completed the browser suite and produced artifact [14980032182](https://github.com/tinytime/Tinytime.github.io/actions/runs/45520949059/artifacts/14980032182), but failed three menu assertions: tile DOM order, SAVE & EQUIP pseudo-label, and cyan border assignment. The Fumble and other screen checks passed; this was not a green run.

### Menu corrections
- Reordered the actual menu grid DOM to the expected sequence: UPGRADES, MY TEAM, MY SQUAD, PLAYBOOK, GOALS & STATS.
- Replaced brittle `:nth-of-type` border styling with semantic tile selectors: UPGRADES gold; all four other actions cyan.
- Changed the MY TEAM primary action to actual visible/accessibility text `SAVE & EQUIP`, preserving its existing click handler.
- QA now checks the real button text and all four cyan action borders rather than generated pseudo-content.

Commits:
- `f9d285514591a05856b318824b02c48cabb1407c` — menu order and SAVE & EQUIP text.
- `04b7f46c77b292f890d4d2a2fdc7bb3bab9df67e` — semantic tile borders and visible save label.
- `c5236169944472ea36bdf71393d9f8d5d03b03cc` — QA alignment for actual label and four cyan tiles.

### MY TEAM three-tab implementation
The Gemini handoff requires three distinct MY TEAM tabs: **IDENTITY / UNIFORM / TRAILS**. The prior first pass had paired identity controls and a run-trail row but did not separate these into the required tab structure.

- Added accessible IDENTITY / UNIFORM / TRAILS tab controls while keeping the 2.5D player preview and SAVE & EQUIP action persistent.
- IDENTITY contains the existing paired team-name and logo picker.
- UNIFORM contains the existing colour-slot and palette controls; saved jersey/pants choices remain preserved.
- TRAILS contains the live run-trail challenge picker. Locked trails receive an explanatory unlock hint.
- Existing save-backed controls and handlers remain authoritative; no gameplay or persistence logic was replaced.
- Responsive styles keep the content region scrollable and the save action fixed at the bottom.

Commits:
- `ca7c742453c9d491738217ce7d5a702692bcd3a1` — tab behavior and existing-node grouping.
- `2ff187a14360556dafa0b97f80ed2f01778e1b96` — three-tab styling.
- `6b717a4d1e48a3a3257a8614065c189183338d22` — explicit tab interaction assertions.
- `bab0e23c9c37cffebb1730c654cdd8336501d3b3` — valid tab typography declaration.

**Verification:** Run #284 was launched for the earlier QA commit `6b717a4d1e48a3a3257a8614065c189183338d22`; the later CSS typography commit `bab0e23c9c37cffebb1730c654cdd8336501d3b3` is the current HEAD and requires its own fresh Actions result. Do not infer a pass from Run #284 or mark Stage Two visually approved. Next: verify the latest run, fix any actual failures, inspect MY TEAM / MY SQUAD portrait artifacts at 390×844, and update this handoff with the exact passing commit/run/artifact. No golden snapshots or provenance were modified.


## Latest Stage Two checkpoint — Run #291 (2026-11-25)

- **Current branch HEAD:** `381363ff1caae36c080b7a9f3cf73af6f4a77046`.
- **Actions:** [Run #291](https://github.com/tinytime/Tinytime.github.io/actions/runs/45522385402) completed successfully against that exact SHA.
- **Automated QA:** 212/212 assertions passed; zero failed assertions, zero uncaught page exceptions, zero console errors and zero same-origin HTTP failures.
- **Fumble:** browser geometry, usable-lane centering, A-button clearance, gradient palette and countdown pill checks all pass.
- **Menu:** semantic gold UPGRADES frame, cyan frames on the four other tiles, SAVE & EQUIP actual text, and visual tile order assertions pass.
- **MY TEAM:** 2.5D preview, paired identity controls, real SAVE & EQUIP label, IDENTITY / UNIFORM / TRAILS tabs, tab interactions, run-trail picker and all eight locked-trail hints pass. The fixed action and identity content fit the 390×844 viewport.
- **MY SQUAD:** separate PTS/CAP badges, three required tabs, gear subview/return, no horizontal overflow and pinned starter strip checks pass.
- **Artifact:** [14981780185](https://github.com/tinytime/Tinytime.github.io/actions/runs/45522385402/artifacts/14981780185), 8,836,872 bytes; includes the full screenshot set, including `my-team-portrait.png`, `my-squad-attributes-portrait.png` and `my-squad-gear-portrait.png`.
- **Visual inspection:** not yet completed in this pass. The artifact exists, but automated assertions do not replace reviewing the actual screenshots. The Stage Two independent review package is [UI-OVERHAUL-STAGE-TWO-REVIEW-PACKAGE.md](UI-OVERHAUL-STAGE-TWO-REVIEW-PACKAGE.md). Do not claim visual approval.
- **Gate:** Stage Two remains in progress and awaits screenshot inspection, independent review as required, and owner approval. No golden snapshots or provenance were changed.


## Stage Two screenshot review and CSS root-scope correction — 2026-11-25

Run #291 artifact [14981780185](https://github.com/tinytime/Tinytime.github.io/actions/runs/45522385402/artifacts/14981780185) was downloaded and the actual MY TEAM, MY SQUAD attributes, MY SQUAD gear, menu, and Fumble screenshots were inspected at their captured viewport sizes.

### Internal visual findings
- The MY TEAM and MY SQUAD screens retained the legacy brown/orange appearance despite the Stage Two navy/cyan/gold design implementation. MY TEAM's tab rail was visually undersized, and SAVE & EQUIP appeared at y=534 in the 844px portrait capture rather than being pinned to the bottom safe area.
- MY SQUAD's PTS/CAP presentation was compressed into a single visually crowded header string; the metric badge styling was not being applied.
- These were not detected by Run #291 because its Stage Two checks validated element presence, navigation, and viewport fit, but did not assert the relevant computed styles or actual fixed-action position.

### Root cause and correction
The original Stage Two CSS used selectors prefixed with `#app` (for example, `#app #team` and `#app #squad`). Inspection of the actual HTML structure confirmed that `#team` and `#squad` are siblings of `#app`, not descendants. Therefore those selectors never matched the live screens.

- CSS correction: commit [`71e1a20af05483d45ea832d0193e68d9f557b1fc`](https://github.com/tinytime/Tinytime.github.io/commit/71e1a20af05483d45ea832d0193e68d9f557b1fc) removes the incorrect `#app` ancestor from all 116 Stage Two selectors. No markup, gameplay, save, progression, renderer, or golden snapshot changes were made.
- QA hardening: commit [`2cd3b457eca4b36481298a3d6dfab79e95fa0573`](https://github.com/tinytime/Tinytime.github.io/commit/2cd3b457eca4b36481298a3d6dfab79e95fa0573) adds checks for the MY TEAM navy/cyan/gold treatment, tab sizing, bottom-pinned SAVE & EQUIP position, and MY SQUAD navy/cyan/gold screen/model/metric styling.

### Verification state and next action
The workflow is configured to run on pushes to `UI-Overhaul` when the CSS or QA harness changes. The CSS correction and targeted presentation assertions passed in [Run #295](https://github.com/tinytime/Tinytime.github.io/actions/runs/45526079186) against commit `2cd3b457eca4b36481298a3d6dfab79e95fa0573`: 216/216 assertions, zero failures, zero page exceptions, zero console errors, and zero same-origin HTTP failures. Evidence artifact: [14982981067](https://github.com/tinytime/Tinytime.github.io/actions/runs/45526079186/artifacts/14982981067). Actual refreshed MY TEAM, MY SQUAD attributes, and MY SQUAD gear screenshots were inspected; the corrected navy/cyan/gold skin, readable separated PTS/CAP badges, bottom-pinned SAVE & EQUIP action, and pinned roster strip are visible.

A further QA-only follow-up commit `0689410f424ba8947ae3554d891002b7cefc2fd4` adds explicit checks for the full MY SQUAD STYLE & GEAR controls (Name, Skin Tone, Jersey Number, skin swatches, and jersey-number controls) and captures `my-squad-style-gear-portrait.png`. Its fresh Actions run and screenshot are pending.

Next: retrieve the push-triggered browser run for commit `2cd3b457eca4b36481298a3d6dfab79e95fa0573`, confirm all assertions pass, and inspect the refreshed MY TEAM / MY SQUAD screenshots plus Stage One regression screenshots before preparing the Stage Two package for independent review. Stage Two remains in progress; owner approval and independent review remain pending. No golden snapshots or provenance were changed.


## Run #295 — corrected Stage Two presentation verified

- Run [#295](https://github.com/tinytime/Tinytime.github.io/actions/runs/45526079186) tested exact code/QA commit `2cd3b457eca4b36481298a3d6dfab79e95fa0573` and succeeded: 216/216, zero failures, zero uncaught page exceptions, zero console errors, and zero same-origin HTTP failures.
- Artifact [14982981067](https://github.com/tinytime/Tinytime.github.io/actions/runs/45526079186/artifacts/14982981067) was downloaded and actual screenshots inspected: `my-team-portrait.png`, `my-squad-attributes-portrait.png`, and `my-squad-gear-portrait.png`.
- MY TEAM now visibly uses navy/cyan/gold, 40px minimum tabs, and bottom-pinned SAVE & EQUIP (captured bounds y=784–834 in an 844px viewport). MY SQUAD shows distinct PTS/CAP badges (approximately 60×38px each), the intended palette/model frame, and a pinned 66px starter strip with no horizontal overflow.
- The inspected MY SQUAD gear screenshot is the gear subview (VISOR and ARM SLEEVES); it is not a screenshot of the STYLE & GEAR parent tab. The parent tab's controls are present in source (NAME, SKIN TONE, JERSEY NUMBER), but the previous QA only checked one text input and the gear-entry action.
- QA-only commit `0689410f424ba8947ae3554d891002b7cefc2fd4` adds explicit DOM assertions for NAME / SKIN TONE / JERSEY NUMBER, skin swatches, jersey number buttons, and the gear action, plus screenshot `my-squad-style-gear-portrait.png`. Await its fresh Actions run and inspect that screenshot before closing Stage Two.


## Run #297 — defense simulation correction and expanded Stage Two evidence

- Workflow [#297](https://github.com/tinytime/Tinytime.github.io/actions/runs/45527525193) tested commit `02fbc1d9761812fbd49e0815574f1bf82c1e40a3` and succeeded: **216/216 passed**, zero failures. Browser QA and evidence upload steps both completed successfully.
- Artifact [14983701764](https://github.com/tinytime/Tinytime.github.io/actions/runs/45527525193/artifacts/14983701764) was downloaded and inspected.
- Run #296 had exposed a real defense-simulation presentation defect: the old field banner remained visible behind the new possession pill. The CSS suppression used `#app:has(...)`, but the relevant match elements are not descendants of `#app`. Commit `02fbc1d9761812fbd49e0815574f1bf82c1e40a3` changes the two banner suppression rules to use the document body as the ancestor and explicitly suppresses the old banner while the new drive title is active.
- Actual `match-defense-simulation.png` inspection from Run #297 confirms the old field banner no longer overlays the new possession pill. The top scoreboard and “THEIR DRIVE · BALANCED” pill are clearly visible. The lower simulation event card remains part of the gameplay presentation; it is not the stale field banner.
- Actual `my-squad-style-gear-portrait.png` inspection confirms the parent STYLE & GEAR panel is now captured: NAME input, seven skin swatches, JERSEY NUMBER controls, EDIT GEAR & TRAILS action, player preview, and pinned starter roster all fit in the 390×844 portrait viewport. Run #297 asserts these controls and the in-squad gear-editor transition.
- The fresh artifact also contains the broad regression set: overworld, menu/settings/credits, goals and stats, playbook, pre-game, pre-snap, live match, fumble, defense selection/simulation, achievement toast, and post-game. The Run #297 fumble screenshot retains the approved left-lane meter and distinct A control placement.
- Stage Two is **not approved**. Reconcile the complete package with the current design handoff, inspect the remaining required screenshots at full size, prepare Claude's independent review package, address valid findings, and wait for explicit owner approval. Stage One remains owner-approved. No golden snapshots or snapshot provenance were changed.


## Stage Three — GOALS & STATS — internal QA passed; owner review pending (2026-11-25)

- Current branch HEAD and exact tested commit: da5a017b5d3914fd0e90bb8cba68bec93dfec37d on UI-Overhaul.
- GitHub Actions: [UI Overhaul Browser QA Run #331](https://github.com/tinytime/Tinytime.github.io/actions/runs/45546328877) completed successfully. Browser QA job and artifact upload both succeeded.
- Automated evidence: report.json records 230/230 checks passed, zero failed assertions. The report includes no same-origin HTTP errors and no uncaught page exceptions. Artifact [14990919745](https://github.com/tinytime/Tinytime.github.io/actions/runs/45546328877/artifacts/14990919745) was downloaded.
- Stage Three scope implemented: GOALS & STATS accessible header X with centered title and trophy badge; CHALLENGES / ACHIEVEMENTS / TEAM STATS tabs; challenge trail reward cards; achievement medal/counter/progress cards; live trophy/one-off counter updates; four Team Stats cards; separate aligned REC and YDS receiving metrics; fixed CLOSE footer; narrow-width layout.
- Observer stability: guarded redundant DOM class/ARIA writes. Browser regression check confirms the achievement observer settles without repeated DOM mutation after an achievement counter changes.
- Relevant QA assertions passed: all three tabs and content states; trophy total 0/13 and dynamic 1/13; one-off achievement counter 0 / 1 and dynamic 1 / 1; 13 achievement cards/medals/counters; four Team Stats cards and MY SQUAD > CAREER note; Receiving REC/YDS alignment; 360px header/tab fit; CLOSE footer and header X return to menu; Escape close behavior.
- Visual inspection completed: actual artifact screenshots opened and reviewed: goals-stats-challenges.png, goals-stats-achievements.png, goals-stats-team-stats.png, and goals-stats-team-stats-360.png. The new title/header, medal list, card borders, receiving metrics, narrow layout and pinned footer render as intended. Scrolled-bottom screenshots are also included in the artifact.
- Not changed: gameplay/save/progression behavior, main, and golden snapshots/provenance.
- Status: Stage Three is implemented, automated browser-tested on the exact current HEAD, and internally visually inspected. It is not independently reviewed or owner-approved. Do not start Stage Four or mark the UI overhaul complete until the owner reviews and explicitly approves Stage Three.
- Review evidence: [Run #331](https://github.com/tinytime/Tinytime.github.io/actions/runs/45546328877); [artifact 14990919745](https://github.com/tinytime/Tinytime.github.io/actions/runs/45546328877/artifacts/14990919745). Acceptance criteria are the GOALS & STATS section in the supplied 14-page UI handoff and assertions in qa/ui-overhaul-browser-qa.mjs.

### Stage Three next action

Present the Run #331 evidence and GOALS & STATS screens for owner review. Await explicit owner approval or feedback. If feedback arrives, change only affected Stage Three items, rerun browser QA, inspect refreshed screenshots, and update this summary. Do not advance to Stage Four before approval.


## Owner approval — Stage Three (2026-11-25)

The owner explicitly approved Stage Three GOALS & STATS and authorized Stage Four. Stage Three remains evidenced by exact code/QA commit `da5a017b5d3914fd0e90bb8cba68bec93dfec37d`, [Run #331](https://github.com/tinytime/Tinytime.github.io/actions/runs/45546328877) (230/230 checks), and artifact [14990919745](https://github.com/tinytime/Tinytime.github.io/actions/runs/45546328877/artifacts/14990919745), whose screenshots were visually inspected. Stage Three is now owner-approved.

## Stage Four kickoff — Pre-Game Matchup & Playbook (landscape)

- Scope follows handoff section 5: matchup screen with town/crew pills, atmospheric split backdrop, solid matte team badge cards, OVR pills, FIRST TO target and loading progress; then the landscape in-match play sheet with category rail, readable route diagrams, gold selected-play frame and FLIP, cyan CALL PLAY.
- Existing implementation is present in `index.html` (matchup overlay `#mu`, play sheet `#sheet`, category rail `#pbTabs`, cards `#cards`, controls `#flipBtn` / `#callBtn`) and is already partially covered by the consolidated browser suite. Stage Four will focus on end-to-end acceptance completeness and any verified visual/interaction gaps, not wholesale replacement.
- Baseline artifact [14990919745](https://github.com/tinytime/Tinytime.github.io/actions/runs/45546328877/artifacts/14990919745) contains `match-pre-game.png`, `match-playbook-overlay.png`, `match-playbook-portrait.png`, and `desktop-playbook.png`. These were opened for the Stage Four kickoff audit. The matchup composition and landscape play-sheet hierarchy are present; targeted category-count and real CTA-flow coverage is being added before deciding whether code changes are warranted.
- Stage Four status: **in progress**. No Stage Four completion, independent review, or owner approval is claimed.


## Stage Three owner approval — 2026-11-25

The owner explicitly approved Stage Three (GOALS & STATS) and authorized proceeding to Stage Four. Approval applies to the implementation tested at `da5a017b5d3914fd0e90bb8cba68bec93dfec37d`, verified by [Run #331](https://github.com/tinytime/Tinytime.github.io/actions/runs/45546328877) with 230/230 browser assertions and actual screenshot inspection. Documentation-only commits followed; current branch baseline before Stage Four is `4efd6c9786c08537d5d022f56efc31cb6f3e9ef7`.

## Stage Four — Pre-Game Matchup & Playbook integration (authorized; in progress)

- **Scope:** handoff Section 5, landscape pre-game matchup and playbook, with emphasis on the end-to-end transition from the real matchup intro into play selection and the pre-snap handoff. This is a targeted integration/fidelity pass, not a wholesale rebuild of previously completed Stage One surfaces.
- **Existing baseline found:** QA already exercises a real crew match, matchup badges/atmosphere/TAP TO PLAY, the in-match playbook sheet, selected-play state, FLIP, CALL PLAY, pre-snap HIKE, and a standalone menu Playbook. Preserve this working behavior.
- **Stage Four audit focus:** verify handoff-required matchup labels and win-condition/loading-bar hierarchy, both team badge/OVR groupings, landscape clipping/spacing at supported widths, Playbook category/favorite affordances and selected-play/diagram readability, and the complete matchup → playbook → pre-snap transition. Identify gaps from the live rendered UI before changing code.
- **Guardrails:** keep changes on `UI-Overhaul`; preserve match state, play selection, play orientation and gameplay rules; do not touch `main`, civilian-vector files, or golden snapshots. Do not mark Stage Four complete until the exact tested commit passes browser QA and its screenshots are inspected; then prepare the owner review package.

### Immediate Stage Four actions

1. Map current matchup/playbook DOM, state and handlers against Section 5 of the handoff.
2. Add targeted assertions for any acceptance criteria not already covered.
3. Run the real landscape match flow, inspect fresh matchup and playbook screenshots, and correct only confirmed gaps.
4. Retest, inspect artifacts, and document the evidence before owner review.


## Stage Four live QA continuation — 2026-11-25

- Reconciled the live branch after Run #343. Current Stage Four code/QA checkpoint: `d697196db1d6a4addb111377a10c0fad5534096c` (QA-only correction; no gameplay or CSS changes).
- Run #343 (`45550546264`) tested `cba2cb006352132f8c23c585579e2fef50a1f830` and failed at `qa/ui-overhaul-browser-qa.mjs:439` because Playwright's automatic locator click reported the card/header containers intercepting the favorite control. The run reported no page errors, console errors, or same-origin request failures.
- Retrieved artifact `14993825718`. Inspected `match-pre-game.png` and `match-playbook-overlay.png`: matchup labels, team badge/OVR groupings, loading bar and TAP TO PLAY are visible; the landscape play sheet shows FAV/ALL/RUN/PASS/TRICK, route diagrams, selected-play frame, FLIP and CALL PLAY. No visual defect was identified in those screenshots.
- Corrected the favorite interaction QA to scroll the control into view, verify its center is the topmost pointer target after scrolling, and issue a real browser mouse click at that verified coordinate. The test still asserts the favorite toggles, the selected play remains unchanged, and the original favorite state is restored. No force-click, DOM event dispatch, or skipped interaction assertion is used.
- Run #344 (`45551278842`) is executing against exact commit `d697196db1d6a4addb111377a10c0fad5534096c`. Browser/Chromium installation passed; the browser QA step was still in progress at this documentation update. Artifact and final assertion count are pending.
- Stage Four remains **in progress and not owner-approved**. After Run #344 completes: verify its tested SHA and all assertions; retrieve and inspect the new artifact/screenshots; if the favorite interaction passes, verify the full matchup → playbook → pre-snap flow and inspect the refreshed images before preparing the Stage Four owner-review package. If it fails, use the new diagnostics and correct the actual interaction or test geometry without weakening the behavior check.
- Preserve gameplay/save/progression behavior, `main`, NPC files, and all golden snapshots/provenance.


## Run #344 result and Run #345 diagnostics — 2026-11-25

- Run #344 (`45551278842`) completed **FAILED** against `d697196db1d6a4addb111377a10c0fad5534096c`. It confirmed that the favorite center is not the topmost pointer target after `scrollIntoViewIfNeeded()`: the measured favorite rectangle was `x=266.19, y=113, 28×24`, while `document.elementFromPoint(280.19,125)` returned the enclosing `.card`. The test stopped before sending the mouse click. This is an actual post-scroll hit-target defect; no bypass is acceptable.
- Run #344 artifact: `14994580319`. Its `match-pre-game.png` and `match-playbook-overlay.png` retain the clean visual presentation seen in Run #343. Runtime snap diagnostics show no missing assets; page errors, console errors and same-origin failures are all empty.
- QA diagnostics were expanded in commit `9c7fb0ec44d51168ab4229c9a9875b601e9bf384`: after scrolling, the harness now records element connection/current-node identity, the full hit-test stack, card/header/cards/sheet rectangles, relevant computed stacking/overflow/pointer styles, page scroll position, and a screenshot `favorite-hit-test-after-scroll.png` if the target is covered.
- Run #345 (`45551752624`) is in progress against exact commit `9c7fb0ec44d51168ab4229c9a9875b601e9bf384`. Browser/Chromium installation passed; the full browser QA step is still running. Retrieve its log/artifact before choosing the actual CSS/DOM correction.
- Stage Four remains in progress and is not owner-approved. Preserve the real favorite toggle and selected-play independence checks, existing gameplay behavior, and golden snapshots.


## Stage Four favorite hit-surface refactor — 2026-11-25

- Run #344 (`45551278842`) tested `d697196db1d6a4addb111377a10c0fad5534096c` and failed after scrolling: the favorite button's center was covered by its parent `.card` (`elementFromPoint` returned the card). This confirmed a real hit-target/overflow issue, not merely Playwright's default locator click behavior.
- Inspected the rendered card styles: the play card has `overflow:hidden`; earlier favorite placements kept the button inside that clipped/clickable card surface. The favorite control is now a sibling of the card within a dedicated `.cardWrap` grid cell, outside the card's overflow and click surface. The card remains independently clickable for play selection; the favorite remains an actual button with its own click handler and state.
- Updated `updateSel()` to select the actual `.card` nodes inside wrappers. Updated browser QA to target the sibling favorite and retain the verified-center real mouse click, toggle assertion, unchanged selected-play assertion, and restoration check.
- Implementation commits: `35e7270bb66ebd8b73a4e755bcfb1a88f1dc80cc` (DOM refactor), `7e03ecf3a6787130f7106862825608c8b5c46437` (favorite overlay styling), `655f4fc595c8b928b32c8d14f01bef4f6bd048cb` (QA locator update).
- Run #347 (`45551937896`) started on the CSS commit before the QA locator update and is not the final validation. A subsequent run must test the combined current branch head. Latest docs update may trigger Run #348; verify its exact tested SHA before accepting results.
- Stage Four remains in progress and is not owner-approved. Do not change gameplay rules, save/progression behavior, golden snapshots, or unrelated UI.


## Wrapped Playbook favorite QA reconciliation — 2026-11-25

- The concurrent Stage Four refactor was reconciled from the live branch: the favorite button is now a sibling of the clickable `.card` inside `.cardWrap`, outside the card's clipped hit surface. The play selection handler remains on the card; the favorite handler stops propagation and toggles its independent state.
- Run #350 (`45552197143`) tested `5054db3088607324e24d669ecccab8a224db6a0e` and failed at QA line 426 because the diagnostic attempted `getComputedStyle(el.closest('.card'))` after the favorite had moved outside the card. It did not reach the favorite interaction assertion; do not treat this as a failure of the wrapper refactor.
- Combined correction commit: `e6a951c6ff07b587cc8f76f1862c2315df1aed33`. It:
  - updates hit-test diagnostics to resolve the card through the closest `.cardWrap` and query its child card/header;
  - keeps the real scroll, center-point hit test, mouse click, toggle, selected-play independence, and state-restoration checks;
  - updates grid sizing to target `.cardWrap` and its child card;
  - changes favorite text to actual `★` / `☆` characters rather than escaped backslash-u text.
- Run #351 (`45552534531`) is executing against exact commit `e6a951c6ff07b587cc8f76f1862c2315df1aed33`. Chromium installation passed; browser QA remains in progress at this checkpoint. Verify tested SHA, full assertion count, artifact and screenshots before making further changes.
- Stage Four remains in progress and is not owner-approved. Continue to preserve gameplay/save/progression behavior and all golden snapshots.


## Stage Four QA reconciliation — Run #354 (2026-11-25)

- Run #354 ([workflow 45553025385](https://github.com/tinytime/Tinytime.github.io/actions/runs/45553025385)) tested exact commit `e2316e6eca437366c13a1da61567210d6d25be58` and completed **FAILED: 244/245**. The sole failure was the QA assertion for the playbook category totals, not a runtime or interaction defect: the live 19-play roster reports **3 RUN, 12 PASS, 4 TRICK**. The assertion incorrectly expected 7 RUN and 8 PASS.
- Verified from the report: all category tabs activate correctly; play cards and route diagrams render; FLIP, selected-play treatment and CALL PLAY are present; favorite-star hit testing, independent toggle, unchanged selected play and restoration all pass. No uncaught page exceptions, console errors, or same-origin request failures were recorded.
- Inspected artifact [14993959120](https://github.com/tinytime/Tinytime.github.io/actions/runs/45553025385/artifacts/14993959120), including `match-pre-game.png` and `match-playbook-overlay.png`. Both show the matchup and landscape playbook hierarchy rendering cleanly; the Playbook displays the correct live counts (3 / 12 / 4).
- Corrected the stale browser-QA expected counts and assertion label in commit `6612565415fdeddb5774d689e7cb8575b447b2d8`. This is a QA-only change; no gameplay rules, match state, save/progression behavior, or golden snapshots were changed.
- The prior renderer fix (`drawCard(c.querySelector('canvas'), ...)`) and `updateSel()` query fix are both present in the tested code. The real favorite button is now a topmost pointer target after scrolling and its state toggles/restores successfully.
- **Next action:** run the browser QA workflow against exact current branch HEAD `6612565415fdeddb5774d689e7cb8575b447b2d8`; inspect its result and fresh screenshots. Stage Four remains **in progress and not owner-approved** until the exact latest commit passes and the full matchup → Playbook → pre-snap flow is verified.


## Cross-stage owner feedback corrections — 2026-11-25

The owner supplied a consolidated seven-item review spanning the approved Stage One–Three surfaces and Stage Four in-progress match UI. Targeted corrections were prepared on `UI-Overhaul`:

- Removed the post-game Style Points element and made its legacy result-display helper a no-op; in-game style scoring and star-meter behavior remain intact.
- Recentered the fumble meter on the viewport, replaced the legacy mash-button styling with the matte navy/gold/cyan palette, and restyled the mash prompt to avoid an opaque blue block.
- Removed duplicate down-and-distance from the Playbook header, simplified the favorite affordance to eliminate pill-like chrome, and changed FLIP to the current cyan/navy palette.
- Changed the pre-game matchup from automatic dismissal after the ready prompt to explicit player confirmation. The prior 1.2-second auto-dismiss could close the screen before the player could reliably act; QA now waits and confirms the explicit tap transition.
- Promoted receiving yards to the same large white number hierarchy as receptions, retaining a small gold YDS unit.
- Changed move-based challenge copy to action wording: “Perform 3 trucks in the match” and “Perform 3 ankle breakers in the match.”
- Updated the MY TEAM logo picker and preview square to the matte navy/cyan palette.

QA coverage was updated for the new post-game visibility, exact fumble center, receiving number formatting, explicit matchup persistence/confirmation, Playbook header/FLIP, challenge wording and logo palette. This is an implementation checkpoint only: fresh browser QA and screenshot inspection are required before the owner should reconsider approval status. Golden snapshots and `main` were not changed.


## Cross-stage feedback validation correction — Run #363 (2026-11-25)

- Live branch HEAD before this correction was `ea92b21ac9e7528044ad12bd02fc7e309b23fbda`. Run #363 ([workflow 45556224432](https://github.com/tinytime/Tinytime.github.io/actions/runs/45556224432)) tested that exact SHA and failed at the practice-win QA assertion because the harness still expected the removed `#endStyle` element to contain `STYLE POINTS 3,700`.
- The source implementation intentionally removes that element for both ordinary and practice-win post-game states; in-game style scoring remains a separate gameplay mechanic. This was a stale test expectation, not a runtime exception or a regression in the seven requested corrections.
- Corrected the practice-win QA to assert that `#endStyle` is absent and that the explanatory practice note and squad score frame remain. Removed the obsolete layout assertion that dereferenced the deleted reward node.
- QA-only correction committed as `9bc3bb14935b22ba7b2df14bc693673fbe3677a0` (“Align practice-win QA with removed Style Points UI”). It does not change game code, gameplay, save/progression or golden snapshots.
- **Next action:** retrieve the new workflow run triggered by the QA correction; verify its exact tested SHA and all assertions. Inspect fresh screenshots for post-game (ordinary and practice win), fumble, Playbook, pre-game, Team Stats and MY TEAM logo. Do not mark the cross-stage pass complete until that visual inspection is done. Stage Four remains in progress and not owner-approved.

## Cross-stage feedback validation correction — Run #364 (2026-11-25)

- Run #364 ([workflow 45556761354](https://github.com/tinytime/Tinytime.github.io/actions/runs/45556761354)) tested exact SHA `9bc3bb14935b22ba7b2df14bc693673fbe3677a0` and failed one assertion: the fumble countdown seconds pill was not horizontally centered under the contest meter. The captured geometry showed the timer center at x=337.6px while the meter center was x=422px in an 844px viewport.
- Root cause: earlier responsive CSS positioned the timer with hard-coded `left:40.5vw` / `36vw` values, while later rules centered the meter at 50vw. The timer therefore drifted away from the bar center.
- Corrected by adding a final responsive-independent rule that anchors `#pileT` at `left:50%` with `translateX(-50%)`, retaining its existing vertical placement and gold-edged navy styling. Commit: `fa7ca59b35654747a942ffd18aa2fb7b88fd6a60`.
- All other reported checks in Run #364 passed, including the removed post-game Style Points display, practice-win layout, challenge copy, palette checks, and no page/console/network errors.
- The run uploaded artifact `14995804055`; its screenshots still require visual inspection after the alignment correction is validated by a new run.
- **Next action:** verify the latest branch SHA and inspect the next browser-QA run and fresh screenshots. Do not treat this cross-stage pass as complete until the exact current commit passes and visual inspection is complete. Stage Four remains in progress and not owner-approved.

## Cross-stage feedback verification — Run #365 (2026-11-25)

- Run #365 ([workflow 45557165949](https://github.com/tinytime/Tinytime.github.io/actions/runs/45557165949)) passed on the exact tested implementation SHA `fa7ca59b35654747a942ffd18aa2fb7b88fd6a60`.
- Browser QA report: **249 checks, 0 failures**, 0 page errors, 0 console errors, and 0 same-origin HTTP failures. Evidence artifact: `14996048088` (45 screenshots).
- The fumble meter and countdown now share the exact viewport center (x=422 in an 844px viewport). The countdown is directly beneath the meter in a gold-edged navy pill; the A mash button clears the meter. The prompt, track, labels and button use the navy/gold/cyan palette.
- Verified all seven owner feedback items in automated checks and evidence:
  1. Post-game Style Points display absent, including practice-win mode.
  2. Fumble meter/countdown centered, palette aligned, and A button clear of meter.
  3. Playbook duplicate down-and-distance header hidden; selected state and FLIP styling consistent.
  4. Pre-game matchup remains open until explicit TAP TO PLAY confirmation.
  5. Receiving receptions and yards are large white values with small subordinate REC/YDS labels.
  6. Move challenges use “Perform …” wording.
  7. MY TEAM logo picker retains the updated navy/cyan/gold surface.
- Inspected fresh Run #365 screenshots for fumble pile, playbook overlay, pre-game matchup, post-game (regular and practice-win), Team Stats, Challenges, and MY TEAM. The timer is visibly centered beneath the fumble meter; the playbook has no stray gold oval or duplicate down/distance; receiving values and units have the intended hierarchy; challenge copy and logo palette are correct. No new visual defects were identified in these reviewed captures.
- No golden snapshots were changed. Run #365 tests the CSS implementation commit; the later documentation-only commits are not part of that tested SHA.
- **Status:** the seven cross-stage corrections are implemented, automated-QA passing, and visually inspected. They are not separately owner-approved. Stage Four remains in progress and awaits the owner's review/approval before any next stage.


## Owner polish batch 2 — Run #397 passed; internal visual inspection complete (2026-11-25)

The owner requested a focused polish pass before returning to the pre-game matchup redesign. The matchup redesign remains explicitly deferred until this batch is reviewed and approved.

Requested scope:
- Move the FUMBLE label down so it sits immediately above the contest bar.
- Rework the in-match Playbook to show three cards per row and two rows per page (six plays per page), enlarge route diagrams, move FLIP into the bottom action row beside CALL PLAY, and update category/page text, icons and the per-player star meter to the current navy/gold/cyan palette.
- Remove the duplicate star-play meter from the scoreboard while preserving the per-player Playbook meter.
- Change the truck achievement wording to “Perform 25 trucks”.

Implementation and QA history:
- Implementation commits include `ae23a1ba451701f53f37c2157c018e9aaf5f7022`, `fdb2180a0cfbb08c66948c8195b02481d9093f4c`, `d38c318a7e6e507c8e58712bf3e1c87c92a158fd`, `5efb2d3784601d49f79a646051c91e87d08e4451`, `59518fcde5772da455f7e58a5448d55deb2c2d00`, `4713a591652e7146ee19cac2b77acd2a96cb5c5d`, and `1e3c1c62e2f6548445291d8f5ff79f84f634d56f`.
- Runs #385–#396 were used to resolve genuine Playbook state/visibility issues and QA-harness defects. These included preserving the overlay across FLIP, pausing the play clock during extended QA, resetting category pagination/selection, and fixing a Node/browser scope error in portrait diagnostics.
- Run #396 exposed one incorrect favorite-test baseline: the QA test compared against the selection from before a deliberate selection-change test. The favorite button itself toggled correctly and stopped event propagation.
- QA-only correction committed as `f26e48986376c03ab07cb286c176660c8ff8eb65` (“Fix Playbook favorite selection baseline in browser QA”). It updates only `qa/ui-overhaul-browser-qa.mjs`; no app behavior changed in that commit.
- **Run #397** ([workflow 45641399159](https://github.com/tinytime/Tinytime.github.io/actions/runs/45641399159)) tested exact SHA `f26e48986376c03ab07cb286c176660c8ff8eb65` and passed **259/259 checks, 0 failures**, with 0 page exceptions, 0 console errors, and 0 same-origin HTTP failures. Evidence artifact: `15035343585`.
- Verified favorite toggling is independent of play selection and that the test restores the original favorite state. Six-card/three-column/two-row pagination, category filters, page navigation, FLIP persistence, and six visible route diagrams after FLIP all passed.
- Fumble assertions passed: contest bar centered in the usable lane, clear of the A mash button, navy/gold/cyan palette, countdown centered directly below the bar, and FUMBLE label centered immediately above it.
- Defense drive pill assertions passed: lowered below the HUD, centered, with full down/distance and yard-line context visible.
- Duplicate scoreboard star meter is hidden while the per-player meter remains visible. Post-game Style Points remain absent, including practice-win mode. The achievement wording is “Perform 25 trucks”.
- ChatGPT visually inspected actual Run #397 screenshots: `match-playbook-overlay.png`, `match-playbook-after-flip.png`, `match-fumble-pile.png`, `match-defense-simulation.png`, `match-post-game.png`, and `goals-stats-achievements.png`. The Playbook grid and diagrams remain legible after FLIP; fumble bar/heading alignment and palette match the requested treatment; defense pill is readable; post-game omits Style Points; achievement wording is correct. No new blocking visual regression was identified in these inspected captures.
- No golden snapshots were changed. Run #397 tests the application plus QA correction commit above. Documentation updates are subsequent and do not alter the tested code.

**Status:** the second owner polish batch is implemented, browser-QA passing, and internally visually inspected. It is **not owner-approved** and has not received the independent Claude review. Stage Four remains in progress. Prepare the complete owner review package next; do not start the deferred pre-game matchup redesign until the owner explicitly authorizes it.
