## Owner polish follow-up — fumble and Playbook (2026-11-25)

- Owner feedback: enlarge the live fumble prompt/event label; relocate the Playbook star-charge control to the bottom-left beneath play categories; center the play explanation in the remaining footer space.
- CSS implementation: `8e2363e316678762c6660e64a3466ef1c9d3310e`; browser QA assertions: `9153b877bcd8ba1073d7614fd49cee4ba26331c4`; latest QA-triggering CSS commit: `75c8bab3b1b4a2bd68a632b97379f0b1f59c18e4`.
- Run #490 is executing against the latest CSS-trigger commit. Do not mark these changes verified until its assertions, report and screenshots have been inspected.
- No gameplay logic, star-charge behavior, favorite behavior, or golden snapshots were intentionally changed.

---

## UI Overhaul — latest verified checkpoint (2026-11-25)

- Current branch: `UI-Overhaul`; latest application-code commit validated by browser QA: `abc60524d6f3bf491fbb87e5bd22967b720a6004`. Subsequent commits are documentation-only.
- Latest browser QA: [Run #487](https://github.com/tinytime/Tinytime.github.io/actions/runs/45720095191) passed on that exact commit: **300/300 checks, 0 failures**, 0 page errors, 0 console errors, and 0 same-origin request failures. Evidence artifact: [ui-overhaul-browser-qa (artifact 15071354604)](https://github.com/tinytime/Tinytime.github.io/actions/runs/45720095191).
- The D12 play-by-play ticker now renders opaque white text on a solid navy panel; the TAP TO SKIP hint remains visible. The portrait rotation prompt is fully within the 390×844 viewport and is dismissed on return to landscape.
- Run #484 exposed a real queue-priority issue: queued achievement toasts could delay the deferred defense-selection panel. Commit `abc60524d6f3bf491fbb87e5bd22967b720a6004` prioritizes the waiting defense panel after the active toast clears, then resumes remaining achievement toasts. Run #487 verified the panel returns only after the drive ticker and toast are clear.
- Run #482 previously passed 297/297 checks on `ac2168937ce96a9f197cecf29cae62956818d602`; its inspected screenshots confirmed the D6 post-game layout (without restoring the removed rewards card), D9 Goals & Stats styling, D4 Playbook layout, MY SQUAD Style & Gear/Career palette, credits views, and D12 loss fixture. D8 catalogue counts reconcile to RUN 3 / PASS 12 / TRICK 4, with four intentionally grouped trick plays.
- Key implementation commits: ticker styling `3e0ff82410722473618373968e1e2b4def656814`; ticker/rotation QA `75d669d30a8eceff53443168cc22bc74e0c49c80`; full-drive QA wait `a61d97d0a8d3bee9335dafc4182a488e6e67f1b5`; queued-defense priority fix `abc60524d6f3bf491fbb87e5bd22967b720a6004`.
- No golden snapshots were changed. This is internally implemented, browser-tested, and visually inspected; **Claude independent review and owner approval are still pending**.
- The consolidated [Claude independent review package](UI-OVERHAUL-CLAUDE-REVIEW-PACKAGE.md) is now prepared with the exact code baseline, Run #487 artifact, D1–D12 criteria, and required reviewer response. Claude review and owner approval remain pending. See the [implementation plan](UI-OVERHAUL-INDEPENDENT-REVIEW-IMPLEMENTATION-PLAN.md) and [implementation summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md).

---

## Playbook / FLIP corrective pass — implementation committed; Run #468 still executing (2026-11-25)

- Run [#467](https://github.com/tinytime/Tinytime.github.io/actions/runs/45705390851) completed against commit 24f86d2e6f4628d093eb478f1cf4e1732cb48022: 292/294 checks passed. The two remaining failures were the D4 Playbook title-width assertion and D3 FLIP default gold-outline assertion. The run had zero page exceptions, console errors and same-origin HTTP failures.
- Retrieved and inspected artifact 15064668104. The Team Stats screenshot shows all four cards with cyan/neutral frames and no gold inset rings. MY SQUAD Style & Gear shows the navy/cyan name field and jersey-number controls; Career uses neutral text with cyan tab/heading and gold emphasis. The Playbook evidence confirms that the longer card names are still ellipsized in the compact match layout; the failure was real, not a stale assertion.
- Root causes: the title header reserved excessive width for the favorite star; and the FLIP button had moved into .ui-playbook-actions, while the later gold correction only targeted the retired .pbTop location. A more-specific cyan action-row rule therefore won.
- Corrective CSS commit: bc59ce26c84242200d6b053924a193ab79d44da0 — reduce the card-title font slightly and reclaim title width while retaining the favorite affordance; apply the gold default/active styles directly to #app #sheet .ui-playbook-actions #flipBtn.
- Fresh browser QA [Run #468](https://github.com/tinytime/Tinytime.github.io/actions/runs/45706478943) is testing exact CSS commit bc59ce26c84242200d6b053924a193ab79d44da0. At the time of this checkpoint the workflow is still in its Playwright test step; no conclusion or new screenshot artifact is available. Do not call the two corrections verified until Run #468 completes and its report/screenshots are inspected.
- No golden snapshots were changed. Run #467's Team Stats and MY SQUAD appearance corrections are visually verified; D3/D4 corrective styling is implemented but awaiting the fresh run's computed-style/geometry assertions and screenshots.

---
## Live selector correction — implementation committed, browser verification pending (2026-11-25)

- Owner reported that Team Stats gold outlines and the MY SQUAD palette corrections were still not visible in the live preview.
- Investigation found the prior Team Stats override targeted `#ui-goals-panel-stats`, which is not the actual panel root. The rendered page uses `#goalsP`; therefore that override did not match the cards. Corrected the CSS to target `#goalsP .ui-goals-stat-card`, explicitly removing shadow/outline and retaining a restrained cyan border. Corrected the QA locator to the same real DOM root.
- Strengthened MY SQUAD overrides with direct `#squad #sqBody` selectors for all inputs and jersey number controls, plus scoped Career text, heading and emphasis colors.
- CSS correction commit: `2e787ae8565c325d3112db86b90e9df8d9bf3877`; QA correction commit: `24f86d2e6f4628d093eb478f1cf4e1732cb48022`.
- Verification is pending: no completed Actions run or fresh screenshot artifact has yet been retrieved for this correction. Do not treat the live appearance as confirmed until the browser run and screenshots are inspected. No golden snapshots were changed.

## MY SQUAD palette correction — implementation complete, QA pending (2026-11-25)

- Owner identified three remaining legacy treatments in MY SQUAD: the Style & Gear name field, jersey-number plus/minus controls, and Career text.
- Updated Style & Gear name input to the current matte navy field with a cyan border and neutral white text.
- Updated both jersey-number controls to navy buttons with cyan borders/text, replacing the legacy control treatment.
- Scoped the Career tab to the current neutral/cyan/gold text palette; headings use cyan and emphasized values use gold.
- Added browser QA checks for the computed name-field and plus/minus styles, plus every visible Career text leaf's computed color.
- CSS commit: `e3ab4ee17b701fc71fb9688c92793819b87c33c`; QA commit: `ed298516feec6d5fcc8e1e6e4fff514db5dca942`.
- Verification status: implementation is committed; the new checks and screenshots have not yet been confirmed by a completed Actions run. No gameplay handlers, save logic, or golden snapshots were changed.

## Team Stats card outline correction — implementation complete, QA pending (2026-11-25)

- Owner clarified that the yellow outlines remain on the individual boxes in GOALS & STATS > TEAM STATS; the previous correction covered only the three tabs.
- Root cause: the legacy `#goalsP .ui-goals-stat-card` presentation rule applies a gold inset `box-shadow` inside each cyan border.
- Corrected `#ui-goals-panel-stats .ui-goals-stat-card` to retain its cyan frame and use `box-shadow:none`, removing the inner gold ring from all four Team Stats cards.
- Added a browser QA assertion that checks all four cards for a 2px cyan border and no box shadow.
- CSS commit: `aa6781d3ea875e02618b2dd6de9ce34f08dd5430`; QA commit: `43b820fd56cea408e10c2e179509ee511caa2706`.
- Verification status: implementation is committed; the new assertion has not yet been confirmed by a completed Actions run. Run #457 was superseded/cancelled while its upload step was still running. No golden snapshots were changed.

## Review polish checkpoint — Run #456 passed; Goals tab refinement underway (2026-11-25)

- Run [#456](https://github.com/tinytime/Tinytime.github.io/actions/runs/45703042276) tested exact commit `ce4641fe39fb5700786ff40cda0aacc0b43e08f1` and passed **286/286 checks**, zero failures, zero page exceptions, zero console errors and zero same-origin HTTP failures. Artifact: [15064785874](https://github.com/tinytime/Tinytime.github.io/actions/runs/45703042276/artifacts/15064785874).
- Retrieved and inspected the actual browser evidence. Verified the fumble prompt is centered and fully in bounds; defense selection waits until the ticker/toast clear; FLIP visibly changes to its gold on-state; Playbook titles clear the favorite controls and route canvases are 68px; the live receiver test now checks open markers only; the defensive HUD is contextualized; post-game score/frame spacing is clear; credits and developer drawer captures are distinct (100315 vs 103153 bytes) and the developer drawer is visible; credits attribution text is expanded; the loss fixture shows a coherent 0–7 result; and the pre-game prompt uses navy/gold styling. The three Goals & Stats captures were also inspected and showed the selected tab still using a yellow outline inside an outer rail.
- Owner added a further correction: all three Goals & Stats tabs must use a single cyan outline and no yellow outline. Implemented in `ui-overhaul.css` and added QA coverage that selects CHALLENGES, ACHIEVEMENTS and TEAM STATS in turn, asserting one cyan active border, no shadow and no second outer rail.
- CSS commit: `6999eaa56d35552eacc62adac53f838b7e975a2b`; QA commit / current branch HEAD: `5dafced3c082d9c1547b5af94cc67763f56e09ae`. Fresh browser QA Run [#457](https://github.com/tinytime/Tinytime.github.io/actions/runs/45703996605) is queued/running against the QA commit; do not mark the new tab correction tested until that run and its screenshots are inspected.
- Run #456 did not modify golden snapshots. Its pass is internal QA evidence, not independent Claude review or final owner approval of the consolidated polish.

---

## Pre-game Settings separation — Run #427 passed (2026-11-25)

The owner clarified that Settings opened from the title screen must be a true pre-game page: only global/main settings, with no in-game navigation tabs, team/squad/playbook/goals destinations, town/progression header, or NEXT UNLOCK banner. Back must return to the title. The in-game Settings page must retain its normal game header, tabs, and BACK TO TOWN navigation.

**Implementation**
- Commit: [`1d6021db5abdc3e9cc01f98b4ae3351c0bdf8de7`](https://github.com/tinytime/Tinytime.github.io/commit/1d6021db5abdc3e9cc01f98b4ae3351c0bdf8de7) — `Hide the exact overworld progression banner in pre-game settings`.
- The pre-game settings mode now hides the exact `#mNext` progression banner, which had remained visible because the prior generic hide logic skipped elements inside `#menu`. Its original hidden/display state is saved for restoration when leaving pre-game mode.
- The pre-game page keeps the main Audio, Gameplay & Display, and Danger Zone settings controls. It omits the in-game tabs and destinations and all town/progression header content.
- The in-game Settings page retains its Circuit Football/Vapor City/UPG header, MENU/SETTINGS/CREDITS tabs, and BACK TO TOWN action.

**Browser QA**
- [Run #427](https://github.com/tinytime/Tinytime.github.io/actions/runs/45695023897) tested the exact commit above on `UI-Overhaul`.
- **267/267 checks passed; 0 failures.** Browser job and evidence upload both succeeded.
- `report.json`: 267 checks, zero failures, zero uncaught page errors, zero console errors, and zero same-origin HTTP failures.
- Relevant assertions passed: title is the initial gate; title SETTINGS opens standalone pre-game settings; town/progression header and NEXT UNLOCK banner are hidden; game menu tabs/destinations are hidden; only main settings controls remain; Back returns to title; BEAT THE CIRCUIT enters the game.
- Retrieved and visually inspected the actual artifact screenshots `title-screen-portrait.png`, `title-settings-portrait.png`, `portrait-settings.png`, and `overworld-after-return.png`. The pre-game screenshot shows only the intended settings sections with no progression banner; the in-game screenshot retains its normal header/tabs/back action; the title and returned overworld are visible in their expected states.
- Artifact: [15060571275](https://github.com/tinytime/Tinytime.github.io/actions/runs/45695023897/artifacts/15060571275).
- No golden snapshots were changed or approved.

**Status:** pre-game Settings separation is implemented, browser-QA passing, and internally visually inspected. It is not independently reviewed by Claude or owner-approved unless the owner separately records that decision.

---

## Title screen entry gate — implementation and QA complete (2026-11-25)

The owner requested that the Circuit Football RPG title screen be moved from the separate NPC baseline branch into `UI-Overhaul`. It is now integrated into the UI Overhaul app; no NPC-workstream commits or files were merged.

**Implemented**
- `ui-overhaul-menu.js` creates a startup title gate with CIRCUIT FOOTBALL RPG branding and **BEAT THE CIRCUIT** / **SETTINGS** actions.
- **BEAT THE CIRCUIT** dismisses the gate and calls the existing `window.SG.owShow()` overworld entry path.
- **SETTINGS** opens the existing UI Overhaul MENU → SETTINGS tab. Its close/Back action returns to the title screen.
- Returning to the title resets the underlying menu tab to MENU so the ordinary in-game menu opens in its normal default state.
- CSS is isolated under `.ui-title-screen` / `.ui-title-*` selectors. Existing gameplay, save/progression, Settings controls, NPC renderer, and golden snapshots were not intentionally changed.

**Visual status**
- The port uses the same inline SVG title-scene interpretation as the source implementation. It is **not the supplied final raster artwork**. The title composition and mobile/desktop layout were visually inspected, but this illustration remains provisional and is not owner-approved as final art.

**Browser QA**
- Run #403 ([workflow 45676582496](https://github.com/tinytime/Tinytime.github.io/actions/runs/45676582496)) tested code commit `2e89b89bce15810f50ea56eb0e5235d6574f8559`: **263/263 checks passed**, 0 failures, 0 page errors, 0 console errors, 0 same-origin HTTP failures.
- Run #404 ([workflow 45677310836](https://github.com/tinytime/Tinytime.github.io/actions/runs/45677310836)) tested the QA-only mobile screenshot addition at `ab1ad1dab25632d2ef8ce73738d375d85fb93f9a`: **263/263 checks passed**, 0 failures, 0 page errors, 0 console errors, 0 same-origin HTTP failures.
- The title-flow checks cover initial title visibility, opening the existing Settings tab, returning to the title, and starting the game. The actual 390×844 title and Settings screenshots were retrieved and visually inspected. Artifact [15051807818](https://github.com/tinytime/Tinytime.github.io/actions/runs/45677310836/artifacts/15051807818) contains the 48-screen QA evidence.
- No golden snapshots were changed or approved.

**Implementation commits**
- Menu/title gate: `d60eba91f4d2587105ec6bc763acd1e13e51e414`
- Title CSS: `9666a76fcf1087d29ea4882290efd023fe62c5df`
- Settings/return and landscape scaling corrections: `a5b768d57e579119bdb3a81cceefc28ad5b144ea`, `ed2ecbfc90bcaaee39b7ebfdaed7687db2769cc3`, `2e89b89bce15810f50ea56eb0e5235d6574f8559`
- QA coverage and portrait evidence: `e60b67940b06c58e37ac94d740bf0dffab29b553`, `ab1ad1dab25632d2ef8ce73738d375d85fb93f9a`

The title/settings flow is implemented and browser-QA passing. Final visual-art approval remains with the owner.

---


**Live checkpoint (2026-11-25):** Stages One–Three are owner-approved. The second Stage Four polish batch passed Run #397 (259/259) on `f26e48986376c03ab07cb286c176660c8ff8eb65`; screenshots for the Playbook, post-FLIP, fumble, defense and achievements were visually inspected. The Playbook favorite QA baseline correction is included in that tested commit. Stage Four remains in progress and awaits the owner's review/approval. The pre-game matchup redesign remains explicitly deferred. See [UI Overhaul Implementation Summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) for exact evidence and the next gate.

## Circuit Football RPG — UI Overhaul

**Stage Four checkpoint (2026-11-25):** the seven cross-stage owner corrections passed Run #365 (249/249). The subsequent owner polish batch passed Run #397 (259/259) on `f26e48986376c03ab07cb286c176660c8ff8eb65`, with key screenshots visually inspected. Stage Four remains in progress and awaits owner review/approval; the pre-game matchup redesign is deferred. See the [Implementation Summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) for exact evidence and next action.

**Workflow safeguard:** workflow-level concurrency for `UI-Overhaul` browser QA cancels an older in-progress run when a newer push arrives.

Related references:
- [UI Overhaul Plan](UI-OVERHAUL-PLAN.md) — design scope and project guardrails.
- [Consolidated Independent Review Implementation Plan](UI-OVERHAUL-INDEPENDENT-REVIEW-IMPLEMENTATION-PLAN.md) — complete D1–D12 correction and polish scope, acceptance criteria, QA evidence requirements, execution order and approval gates.
- [UI Overhaul Implementation Summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) — current implementation and QA handoff.
- [Stage Four Owner Review Package](UI-OVERHAUL-STAGE-FOUR-REVIEW-PACKAGE.md) — Run #397 polish scope, exact tested commit, screenshot evidence, reviewer attention item, and owner approval checklist.
- [UI Overhaul Claude Review Package](UI-OVERHAUL-CLAUDE-REVIEW-PACKAGE.md) — exact Stage One independent-review scope and evidence.
- [UI Overhaul Stage Two Review Package](UI-OVERHAUL-STAGE-TWO-REVIEW-PACKAGE.md) — independent findings, Run #322 correction and optional-polish evidence, and owner approval gate.
- [UI Overhaul workstream README](../ui-overhaul/README.md) — workstream history and implementation notes.

When working on the UI overhaul, use branch `UI-Overhaul`, verify its live HEAD and latest Actions, and do not confuse the separate civilian-vector workstream below with the Circuit Football UI work.


---

## Fourth civilian batch — parallel Sailor/Slicker/Painter exploration (2026-11-20)

The owner authorized **Sailor (#12), Slicker (#13) and Painter (#14) simultaneously** through identity refinement, four-view silhouette exploration and construction cards. This supersedes the earlier Sailor-only authorization note below.

- [Parallel silhouette exploration 02](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-05.svg)
- [Parallel construction cards and differentiation report 01](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md)
- Current status: revision 05 refines Painter hip continuity and brush construction. The prior Run #447656 artifact contains projections from an earlier state and is not accepted as current evidence. Fresh native/direct raster evidence and visual inspection are pending; face studies and closest-roster comparisons remain outstanding. Full owner-review package is incomplete.
- Families remain UNASSIGNED; no palettes or production renderer work. #15–23 remain on hold. No approved NPC art, golden snapshots or snapshot provenance changed.

## Fourth civilian batch — owner direction approval and Sailor exploration (2026-11-20)

The owner approved the refined Sailor/Slicker/Painter role directions and authorized **Sailor (#12) silhouette exploration only**. Shared QA refinements: body-only plus prop-on four-view silhouette sets; evidence-based comparison against the two closest existing faces before finalizing face cues; and near/far anatomy established before adding props. Sailor must receive matched-scale comparison against Clinic (highest priority), Coach, Guard and Fisher, with particular attention to raised collar, cap contour, leg stance, shoulder-to-waist construction and arm negative spaces. The mooring-line coil is optional and cannot carry identity.

- [Sailor silhouette exploration 01](qa-artifacts/fourth-civilian-batch/SAILOR-SILHOUETTE-EXPLORATION-01.svg) — preliminary body-only and prop-on four-view studies; not approved art.
- [Sailor construction card exploration 01](qa-artifacts/fourth-civilian-batch/SAILOR-CONSTRUCTION-CARD-EXPLORATION-01.md) — provisional construction/contact notes and face-reference comparison plan.
- [Fourth-batch preflight](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md) — updated with owner decision and QA refinements.

- The prop-on study explicitly hides the character-left coil in the right profile (far side); front/back placement reverses correctly, and the left profile alone shows it on the near side. This remains a prop hypothesis, not a locked design.

**Gate:** Sailor silhouette/construction review is pending. Slicker (#13) and Painter (#14) remain queued. All three construction families remain UNASSIGNED. No palette or renderer work is authorized; no golden snapshots or provenance changed.

## Latest browser QA harness checkpoint — Run #649 (2026-11-20)

[Run #649](https://github.com/tinytime/Tinytime.github.io/actions/runs/44753230689), artifact [14636147603](https://github.com/tinytime/Tinytime.github.io/actions/runs/44753230689/artifacts/14636147603), tested commit `2d963db5e0b54f1f7b9afd652b33c053aa168c1b` after Tech was added to the vector-civilian QA contract. Directional integrity 92/92, direct 28×42 assertion 20/20, role-debug 12/12, prop audit 10 archetypes, gallery render and silhouette diagnostic inventory pass; page/script errors are zero. Overall workflow remains failed on unapproved golden snapshots (1 match / 23 changed) and existing audio/resource 404s. No golden snapshots/provenance changed.

## Owner approval and next batch — 2026-11-20

The owner approved batch #9–11 (Tech, Hacker, Fisher). Tech is approved at production-renderer stage; Hacker and Fisher are approved as finished design-stage art, not production-renderer integrations. Claude's post-correction re-review remains unrecorded. Next set: **Sailor (#12), Slicker (#13), Painter (#14)**. Their identity/silhouette preflight is ready: [SAILOR-SLICKER-PAINTER-PREFLIGHT.md](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md). Proposed directions only; owner review and silhouette approval are pending.

## Third-batch reviewer corrections — 2026-11-20

**Updated independent review package:** [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md). Claude's first verdicts have been addressed: Tech's field shell is darker/desaturated petrol with a squared storm-flap shoulder; Hacker's front chest is narrowed, bare forearm separated, left-profile drape tapered and temple/earbud cues strengthened; Fisher's rear smock is ochre rather than a dark cape-like block, the unexplained leg bar is gone, and the right-profile pouch is integrated into the garment.

- Tech targeted browser QA: [Run #648](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957), artifact [14635417540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957/artifacts/14635417540), exact tested renderer source cea601503504c6b23527452a66cc64c3cb93e7a7. Targeted 4/4 native, 4/4 direct game-scale, zero edge contacts, role-debug 4/4, town spawn/close-up present; wider integrity 92/92, face uniqueness 23/23, gallery/prop/Granny checks pass, page/script errors 0. Actual Tech/Clinic game-scale comparison and town crop inspected.
- Hacker/Fisher design render: [Run #9](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697), artifact [14636805512](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697/artifacts/14636805512), SVG SHA-256 5e20a05a445b4684c3a212bf6e55fd61b3abb230c557e5d7ab85842a6ab03a52. Render succeeded; all eight views recaptured at native 64×96 and direct design-projection 28×42, with 4× nearest-neighbour enlargements. Actual full sheet and directional montages inspected. These remain design-stage captures, not production renderer evidence.
- Browser QA Run #648 overall remains FAILED on the unapproved golden snapshot baseline (1 match / 23 changed) and existing 180 audio/resource HTTP 404 console errors. No snapshots/provenance changed. These are global gates, not new character-specific defects.
- Claude re-review pending; owner acceptance pending. Hacker/Fisher production renderer implementation remains held until Tech independent review and owner rendered-art approval, plus owner acceptance of their finished designs.

## Hacker and Fisher design-stage delivery — 2026-11-20
## Third-batch independent review handoff — 2026-11-20

**Combined Claude package ready:** [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md). It consolidates Tech (#9) production-renderer evidence (Run #644 / artifact `14634020084`) with Hacker/Fisher (#10/#11) corrected finished-design evidence (Playwright Run #7 / artifact `14634776106`). Internal QA is complete for all three at their respective stages. Tech is production-renderer QA-passed; Hacker and Fisher have design-stage QA only. Claude review and owner acceptance remain pending. No additional render is needed for this review handoff. Hacker/Fisher renderer implementation remains held until Tech's independent review and owner approval, and owner acceptance of their finished designs.


The owner authorized finished design-stage vector development for Hacker (#10) and Fisher (#11), preserving the approved round-05 silhouettes. The corrected four-direction colour study is [HACKER-FISHER-FINISHED-DESIGN-STUDY.svg](qa-artifacts/third-civilian-batch/HACKER-FISHER-FINISHED-DESIGN-STUDY.svg); see [design review](qa-artifacts/third-civilian-batch/HACKER-FISHER-DESIGN-REVIEW.md). Corrected Playwright [Run #7](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989) tested source `2b08e60d4814846923e133503f965532bde055ad` and uploaded artifact [14634776106](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989/artifacts/14634776106). Rendering, syntax and capture generation passed; the workflow's commit/push step failed on a non-fast-forward branch race, so the corrected PNGs remain in the artifact and are not committed to the repository. ChatGPT inspected the corrected full sheet, native 64×96, direct 28×42 and 4× nearest-neighbour montages; Hacker's single front slate and supporting-hand overlap are corrected, and both characters' prop handedness/profile visibility are consistent. This is design-source evidence, not game-renderer QA. Owner finished-art acceptance remains pending; renderer implementation remains held by the Tech-first independent-review/owner gate. No renderer, approved art, golden snapshots or snapshot provenance changed.

## Next civilian batch — Tech, Hacker and Fisher (2026-11-20)

**Current checkpoint — Tech internal QA complete; independent review package ready:** latest browser QA [Run #644](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189) tested exact branch HEAD `579f0fff61b8cfd4e416cc59381187b162d3b8ca` and uploaded artifact [14634020084](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189/artifacts/14634020084). Tech captures passed 4/4 native 64×96 and 4/4 direct 28×42, with zero edge contacts; Tech role-debug 4/4; explicit live street spawn and native 1× close-up; directional/visual integrity 92/92; face uniqueness 23/23; general role-debug 12/12; prop audit, gallery and Granny checks PASS; page/script errors 0. Actual captures at both scales, Clinic comparisons, role-debug sheet and town close-up were downloaded and visually inspected. Both profile eye/brow cues read at direct scale; left-profile meter grip is discernible; profile shell overlap with Clinic improved (right 0.856 from 0.908; back 0.878 from 0.915). Remaining Clinic/Tech similarity prompts are back 0.878, front 0.892 and right profile 0.856; they require human judgment and are not automatic failures. Overall Actions failed only on the unapproved golden snapshot baseline (1 match / 23 changed) and 180 existing audio/resource 404 console errors; no snapshots or provenance changed. Tech is ready for Claude's exact-output review; owner rendered-art approval remains pending. Hacker and Fisher design-stage vector development is now owner-authorized and recorded in `qa-artifacts/third-civilian-batch/HACKER-FISHER-FINISHED-DESIGN-STUDY.svg`; renderer implementation remains held pending Tech's independent review and owner rendered-art approval.

The project owner directed ChatGPT to move forward without sending the prior Guard/Vendor/Clinic Run #629 output back to Claude. The exact-output Claude review remains historically unrecorded; this instruction authorizes next-batch preparation and does not imply a reviewer verdict.

Prepared:
- [Tech/Hacker/Fisher design preflight](qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-PREFLIGHT.md)
- [Four-view silhouette exploration SVG](qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg)

**Owner authorization update — 2026-11-20:** The owner approved the round-05 Tech/Hacker/Fisher designs and renderer implementation. Tech (#9) is complete through internal QA and visual inspection; the exact-output Claude review and owner rendered-art approval are now the gates. Hacker (#10) and Fisher (#11) remain untouched until Tech clears those gates. No golden snapshots or provenance were changed.



## Current Guard, Vendor and Clinic QA status — Run #629 (2026-11-20)

The latest completed QA is [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), testing commit `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`, artifact `14613105475`. Vendor's final profile eye placement was verified in left/right profiles at native 64×96 and direct 28×42; Guard and Clinic profile details remain intact. Targeted capture, integrity, face-distinctness, prop and gallery checks pass. Overall Actions remains failed on the unapproved golden-snapshot gate (1 match / 23 changed) and 180 existing audio/resource 404 console errors; no golden snapshots were changed. Owner approval for the rendered batch was received 2026-11-20. Claude's exact-output review remains pending; the remaining 17 civilians stay on hold until that required review is logged.

## Claude targeted re-review and follow-up — 2026-11-20

Claude reviewed the corrected Run #626 package at renderer commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`. The Vendor right-profile tray/hand correction is resolved; the Guard right-profile arm remains too small; Clinic right profile lacks a near-side kit cue and has the highest remaining pair overlap with Guard at IoU 0.87; Guard and Vendor profile faces still read blank at game scale. Front/back views are unchanged and retain the prior assessment. No blocking defects were reported, but Claude recommended one more focused pass on these three profile-readability areas.

ChatGPT implemented that focused pass in `npc_sprites.js` commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`: extended Guard's right-profile forearm into a visible steel bracer and hand; strengthened Guard and Vendor profile eye/brow marks; and added a narrow near-side Clinic pouch strap/buckle cue to the right profile without moving or duplicating the pouch. This is implementation only. Fresh browser QA, artifact inspection at native 64×96 and direct 28×42 scales, and a new Claude review are pending. Preserve all front/back designs, unrelated civilians, accepted exceptions, and golden snapshots. Do not start the remaining 17 civilians until the independent review and explicit owner approval gates are complete.

## Latest work — Guard, Vendor and Clinic Run #627 (2026-11-20)

Fresh QA and internal visual inspection are complete for renderer commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`. [Run #627](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457) produced artifact [14611292138](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457/artifacts/14611292138). Targeted capture/integrity checks pass, but overall Actions failed on existing global snapshot/audio-resource diagnostics. Claude's corrected-output review and owner approval are pending; the remaining 17 civilians remain on hold. See the [Run #627 review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).

## Latest QA — Vendor profile follow-up (2026-11-20)

Run #628 tested `a8f3689` ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539)). Targeted vector checks passed, but overall Actions failed on the unapproved golden snapshot gate and existing audio/resource 404s. Manual game-scale inspection found Vendor's eye still needed repositioning. Follow-up commit `2bc1629` is under Run #629; inspect that artifact before Claude review or owner approval. Remaining 17 civilians remain on hold; golden snapshots untouched.


## Guard, Vendor and Clinic — Run #628 (2026-11-20)

- Tested renderer commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`; [Run #628](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539). Overall Actions **FAILED** at browser diagnostics. Syntax, inventory, semantic annotation validation, capture/evidence generation and artifact upload passed.
- The only renderer change since Run #627 is Vendor profile eye/brow placement. Inspected actual native and direct 28×42 profile montages plus enlarged Vendor L/R face crops. The marks now read in both profiles at native scale; at direct game scale they are subtle but visible. Cap brim/ear clearance is maintained. Guard right-profile forearm/bracer/hand and Clinic right-profile strap/coil remain present. No visible clipping or detached components in the inspected profile captures.
- Capture and integrity checks: Guard/Vendor/Clinic 12/12 native and 12/12 direct game-scale captures; wider five-civilian sheet 20/20 native and 20/20 direct game-scale; directional integrity 92/92; visual integrity 92/92; zero edge contacts; face uniqueness 23/23 at both scales; role debug 12/12; prop audit PASS; gallery and Granny directional checks PASS. pageErrors=0; scriptErrors=0.
- Silhouette diagnostics are review prompts only: maximum full-character IoU 0.9065 (back Coach/Guard); 0.85 remains a human-review trigger, not a gate. Preserve previously accepted distinctions/exceptions and do not redesign solely to chase overlap values.
- Global blockers: unapproved golden snapshot baseline (1 match / 23 changed, no missing) and 180 existing audio/resource HTTP 404 console errors across 46 URL entries. No golden snapshots or provenance changed.
- Next: Claude independently reviews the exact Run #628 artifact/commit, especially Vendor profile facial marks at both scales and preservation of tray/hand, Guard and Clinic details. Then owner makes explicit final decision. The three-character batch is not approved complete; remaining 17 stay on hold.

## Latest QA — Guard, Vendor and Clinic Run #629 (2026-11-20)

Vendor's final profile-eye placement correction is implemented and visually verified at native and direct game scales. [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), artifact [14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475), passes targeted vector capture/integrity checks but overall Actions remains failed on the unapproved golden snapshot gate and existing audio/resource 404s. No snapshots changed. Claude's independent review and owner approval remain pending; the remaining 17 civilians remain on hold.


## Guard, Vendor and Clinic — Run #629 and owner decision (2026-11-20)

- Final renderer source for this round: [`2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`](https://github.com/tinytime/Tinytime.github.io/commit/2bc1629edd82afc1a50ac7a4ab882b428dbd0c32). The final focused change moved Vendor's profile eye/brow inward onto the visible cheek plane after Run #628's automated face-distinctness checks passed but manual direct-game-scale inspection found the mark insufficiently legible.
- Browser QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), [artifact 14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Targeted vector/capture checks pass; overall Actions remains failed on the unapproved golden snapshot baseline (1 match / 23 changed) and existing audio/resource 404 console errors. No golden snapshots or provenance were changed.
- Inspected the exact Run #629 artifact: 12/12 native 64×96 and 12/12 direct 28×42 captures for Guard/Vendor/Clinic; Vendor's left and right profile eye now reads in both scales. Guard's near-side forearm/bracer/hand and Clinic's right-profile cord/coil remain present. Directional integrity 92/92, zero edge contacts and detached components, face distinctness 23/23 at both scales, prop audit, gallery, town smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- **Owner decision:** the project owner explicitly approved the rendered Guard, Vendor and Clinic Worker batch on 2026-11-20 after the Run #629 evidence review.
- **Independent-review record:** Claude's final independent review of this exact Run #629 commit/artifact is not yet recorded in the repository. Per the governing approval process, retain that as the outstanding independent-review gate; do not label the batch fully closed or release the remaining 17 until the exact-output review is logged. This records the owner's approval without fabricating reviewer sign-off.
- No golden snapshots changed. Existing global Actions blockers are tracked separately from the passing character-specific evidence.


## Hacker and Fisher — internal design QA result (2026-11-20)

Internal QA has now inspected corrected Playwright [Run #7](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989), source `2b08e60d4814846923e133503f965532bde055ad`, artifact [14634776106](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989/artifacts/14634776106). All eight native 64×96 captures, all eight direct 28×42 design projections, the complete sheet and all eight 4× nearest-neighbour enlargements were inspected. **Internal design QA: PASS**, with minor readability notes recorded in [the review package](qa-artifacts/third-civilian-batch/HACKER-FISHER-DESIGN-REVIEW.md). The Run #7 PNG commit/push failed on a branch race, but render/capture generation and artifact upload passed; the artifact is authoritative. This does not constitute production renderer QA or owner finished-art acceptance. Hacker/Fisher renderer work remains held pending Tech's independent review and owner rendered-art approval. No renderer or golden snapshot changes.


## UI Overhaul — title-screen Settings correction (2026-11-25)

The owner identified that title-screen SETTINGS could still display the overworld menu. Corrected the transition timing and added visible-content regression checks. Browser QA [Run #430](https://github.com/tinytime/Tinytime.github.io/actions/runs/45696589378) passed **268/268** on `bb889480702d423dd241ff779d6fcd43de46cca1`, with zero page errors, console errors or same-origin HTTP failures. Actual title-settings and in-game settings screenshots were inspected: pre-game shows only main settings; in-game navigation remains intact. Full evidence and remaining approval status are recorded in [UI Overhaul implementation summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md). No golden snapshots changed. This correction is internally QA-passing and visually inspected, not yet independently reviewed by Claude or owner-approved.


Owner approval recorded 2026-11-25: the focused title-screen Settings correction from Run #430 is approved after review of its screenshots and live preview. This approval is limited to that correction and does not approve the broader UI Overhaul or Stage Four. Details are recorded in [the implementation summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md).


## Playbook landscape grid expansion — implementation committed; Run #475 executing (2026-11-25)

- Run [#474](https://github.com/tinytime/Tinytime.github.io/actions/runs/45714287271) tested `067262f884f802822b122e6822517af785226b98` and did not pass. Its captured Playbook screenshot showed the six-card grid occupying only about 326px of the 844px-wide landscape sheet; the route diagrams were approximately 91px wide and titles remained clipped. The QA readiness wait also timed out because it requires each route canvas to reach at least 100px wide.
- The root cause was intrinsic sizing of the Playbook grid region beside the category rail. Added a landscape layout rule making `#pbTabs` a fixed 104px rail and `#pbGrid` a flexing, zero-basis region that consumes the remaining width. The six-card grid and card wrappers are explicitly width-constrained to that expanded region. Existing title/favourite treatment is retained; the widened card geometry should give the title label enough room without shrinking the favourite hit target.
- CSS commit: [92fdb1521693578f78401eaddf64c06d2b014c7a](https://github.com/tinytime/Tinytime.github.io/commit/92fdb1521693578f78401eaddf64c06d2b014c7a).
- Fresh browser QA [Run #475](https://github.com/tinytime/Tinytime.github.io/actions/runs/45715223232) is running against that exact commit. Do not mark D4 resolved until the run completes, the report is checked, and the landscape/portrait Playbook screenshots are inspected. No gameplay logic or golden snapshots were changed.


## UI Overhaul — consolidated review checkpoint, Run #493 (2026-11-25)

The latest UI Overhaul browser QA [Run #493](https://github.com/tinytime/Tinytime.github.io/actions/runs/45724268883) passed **303/303 checks** on exact tested commit `7c124d0ac33dae62255626f7a7fc666d833cb3b2`, with zero page exceptions, console errors or same-origin request failures. Artifact [15074495383](https://github.com/tinytime/Tinytime.github.io/actions/runs/45724268883/artifacts/15074495383) was retrieved; defense-simulation, Team Stats and fumble screenshots were visually inspected. The ticker height is now 47.86px and meets the 36px minimum. The implementation plan, summary and [Claude review package](UI-OVERHAUL-CLAUDE-REVIEW-PACKAGE.md) record the exact evidence and remaining approval gates. Claude's independent review and final owner approval of the overall UI Overhaul remain pending; no golden snapshots changed.


## Pre-game matchup redesign — Run #503 passed (2026-11-26)

The owner-requested reference redesign is implemented on `UI-Overhaul`: one shared town arena with diagonal home/away jersey-color tints and a gold divider/VS badge; compact navy team cards with marks, names and OVR; three current-uniform 2.5D player poses per side; and the FIRST TO / gradient bar / solid cyan TAP TO PLAY footer. Browser QA [Run #503](https://github.com/tinytime/Tinytime.github.io/actions/runs/45728666540) passed **304/304** on exact tested application commit `fb44284e067df9a6f42b3a77136ea692102d2baf`, with zero page errors, console errors or same-origin request failures. Artifact [15074973445](https://github.com/tinytime/Tinytime.github.io/actions/runs/45728666540/artifacts/15074973445) was retrieved; the 844×390 pre-game screenshot was visually inspected and confirms the six models and intended hierarchy. Full evidence is in [the implementation summary](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md) and [Claude review package](UI-OVERHAUL-CLAUDE-REVIEW-PACKAGE.md). This is internal QA, not independent Claude review or final owner approval; no golden snapshots changed.


## Pre-game landscape correction — Run #523 passed (2026-11-26)

The matchup screen now places town and game-mode pills in the bottom corners, enlarges the logo marks in compact navy/gold/cyan team cards, and uses actual animated Three.js/KayKit skinned player models (three per side: Cheering, Push_Ups and Idle_A). Browser QA [Run #523](https://github.com/tinytime/Tinytime.github.io/actions/runs/45733097704) passed **307/307** on exact tested commit `4c00e5b387ec0199cda285445bbe283af178f912`; no page exceptions, console errors or same-origin request failures. Both 844×390 and 1536×611 screenshots were inspected and pass clipping/overlap checks. Artifact [15077298779](https://github.com/tinytime/Tinytime.github.io/actions/runs/45733097704/artifacts/15077298779) contains the screenshots and report. Claude independent review and final owner approval remain pending; no golden snapshots changed.
