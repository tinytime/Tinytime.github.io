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

# UI Overhaul — Consolidated Independent Review Implementation Plan

**Created:** 2026-11-25  
**Workstream:** Circuit Football RPG UI overhaul  
**Implementation branch:** `UI-Overhaul`  
**Status:** IN PROGRESS — owner authorized the complete polish pass. Run #456 passed 286/286 and its screenshots were inspected; a further owner-requested Goals & Stats single-cyan-outline correction is committed and awaiting Run #457 QA.

## 1. Purpose and authority

This plan converts the independent review of UI Stages 1–4 into one tracked implementation and QA milestone. It includes every finding D1–D12, the cross-stage consistency findings, and the reviewer's top-five recommendations. The scope is the complete review, not only the two release blockers.

The owner has directed that **all review polish be addressed**. ChatGPT is responsible for repository implementation, regression testing, screenshot inspection, documentation and the next independent-review handoff. Claude remains the independent reviewer; the owner retains final approval.

The independent review's consolidated verdict was **REQUIRES CORRECTIONS**: Stages 1–3 were approved with minor polish, while Stage 4 requires corrections. This plan does not revoke the recorded owner approvals for Stages 1–3 or reopen the deferred pre-game matchup redesign.

## 2. Review evidence and limits

The reviewer examined a 51-file QA bundle whose `report.json` and `summary.md` identify commit `f26e48986376c03ab07cb286c176660c8ff8eb65`, Run #397, with 259/259 checks passing. The reviewer cloned the branch and reported that this commit differed from then-current HEAD `eaa2377` by documentation only.

The reviewer did **not** access Actions artifacts for Runs #194, #365, #322 or #331; did not have the Gemini DOCX mockups; could not run a live browser; and did not individually review the startup, `overworld-after-return`, or desktop settings/credits screenshots. The root-cause explanation for D1 is explicitly a source-based hypothesis, not a reproduced diagnosis. The reviewer also noted byte-identical `portrait-credits-developer.png` and `portrait-credits.png`, so the developer-drawer state was not independently evidenced.

Repository checkpoint verified while preparing this plan:
- Branch: `UI-Overhaul`
- HEAD: `01f7b56c5f3caef1e675a37c28b150881aecc41a`
- Latest successful browser QA checked at planning time: Run #430, workflow [45696589378](https://github.com/tinytime/Tinytime.github.io/actions/runs/45696589378), tested commit `bb889480702d423dd241ff779d6fcd43de46cca1`, 268/268 checks passed.
- Run #430 is later than the review bundle and verifies the title-screen Settings correction. It does not by itself resolve or re-review D1–D12.

All implementation work must begin from the then-current branch HEAD, not by assuming the review bundle commit is still current.

## 3. Scope and work packages

### WP1 — Match-flow release blockers

#### D1 — Fumble instruction clipping (High; release blocker)
**Finding:** The `#pileSub` “MASH A TO HOLD ON!” instruction is partly off-screen in `match-fumble-pile.png`. The reviewer suspects the app shell's narrower width makes its parent-relative centering incorrect; the heading was later anchored to `50vw`, but the prompt was not.

**Implementation:**
- Reproduce the fumble state at the review viewport and at narrow/mobile and landscape breakpoints.
- Inspect the actual containing block, computed position, transform and bounding rectangle for `#pileSub` and its visible prompt.
- Anchor the prompt to the true viewport center (or another measured, stable viewport-relative geometry) consistently with the corrected fumble heading; do not apply a blind CSS offset.
- Preserve the prompt's intended hierarchy, typography, navy/gold/cyan palette and legibility. Ensure it does not collide with the bar, timer, button, HUD or safe areas.

**Acceptance / regression QA:**
- Add a geometry assertion for the prompt itself: its visible bounds remain inside the viewport, it is horizontally centered within a documented tolerance, and it is not clipped by the app shell.
- Assert the full “MASH A TO HOLD ON!” instruction and A key cue are visible.
- Capture the fumble screenshot at the required responsive sizes and visually inspect it.

#### D2 — Achievement / defense-selection / ticker overlap (High; release blocker)
**Finding:** The defense-selection modal reappears beneath the “THEIR DRIVE” pill and play-by-play card in the achievement-toast capture. The reviewer could not establish the duration or whether the overlap persists beyond the captured state.

**Implementation:**
- Trace the actual state/timer/event sequence that opens defense selection, shows the drive pill, emits the play-by-play ticker and displays the achievement toast.
- Establish a single intentional presentation order. Defense selection must not become interactive or visible underneath transient drive/ticker messaging.
- Dismiss or defer the modal until transient messaging clears; if a modal must remain queued, show it only after the drive pill and ticker have completed their presentation.
- Keep the achievement toast non-blocking and avoid changing game rules or timing beyond what is necessary for clear UI sequencing.

**Acceptance / regression QA:**
- Add deterministic QA that triggers the exact sequence and samples geometry/visibility during the transition, not just after it.
- Assert no unintended intersections among the visible defense panel, drive pill, ticker/play-by-play card and achievement toast.
- Assert the defense panel is usable once shown and that no queued modal is lost.
- Capture the sequence at the critical overlap window and inspect the actual screenshot.

### WP2 — Stage Four interaction and Playbook polish

#### D3 — FLIP has no visible state change (Medium)
**Finding:** The FLIP overlay and after-FLIP captures are pixel-identical below the scoreboard; the control is cyan-filled and competes with CALL PLAY, rather than reading as the gold secondary action in the spec.

**Implementation:** Give FLIP an unmistakable, accessible on/off state with visible feedback in the intended play surface/control. Restyle it as a gold-outline secondary action so CALL PLAY retains primary emphasis. Preserve the existing FLIP behavior and keyboard/touch accessibility.

**Acceptance:** QA toggles FLIP on and off and asserts both the state and corresponding visible change; capture before/after screenshots; verify CALL PLAY remains visually primary and the state resets/retains according to the existing intended lifecycle.

#### D4 — Playbook card title/star collisions and route readability (Medium)
**Finding:** Some titles collide with the favorite star; route diagrams are approximately 101×60px and too small to read comfortably.

**Implementation:** Rebalance card header space (shorten titles only where necessary, or adjust title width/star size/placement) and allocate more usable card-sheet height to route diagrams. Preserve the true 3×2 layout, pager, favorite behavior, selected state and responsive fit.

**Acceptance:** No title/star overlap at supported breakpoints; route lines, receivers and direction are legible at actual display size; all six cards remain visible per page without clipping or scroll regression. Inspect Playbook screenshots at narrow and landscape sizes.

#### D5 — Defensive simulation scoreboard context mismatch (Medium)
**Finding:** The scoreboard reads “1st & 10 · OWN 25” while the defense pill reads “2nd & 6 · THEIR 39”.

**Implementation:** Make the scoreboard context consistent with the defensive simulation state, or neutralize/hide offensive down-and-distance fields when they would be misleading. Do not fabricate possession or yard-line values. Keep the scoreboard readable and stable during transitions.

**Acceptance:** Deterministic defense-simulation QA asserts that every simultaneously visible possession/down/distance/yard-line indicator is coherent; capture the defensive state and transition back to the normal match state.

#### D8 — Playbook counts and category split disagree (Medium; cross-stage)
**Finding:** The menu advertises “9 plays”, the in-match Playbook contains 19, and the current category split is RUN 3 / PASS 12 / TRICK 4. The written spec calls for RUN 7 / PASS 8 / TRICK 4.

**Implementation:** Audit the actual play catalogue, menu count source, in-match catalogue, category assignment and spec. Identify whether “9 plays” is a stale count, a count of a different subset, or a deliberate label that needs clearer wording. Reconcile the user-facing totals and category labels with the actual available plays and the written 7/8/4 target. Do not delete, duplicate, misclassify or silently hide plays merely to make the numbers match. If the implementation or spec has a legitimate intentional difference, document the owner-approved source of truth and make the labels explicit.

**Acceptance:** Add automated assertions that derive counts from the same canonical play data used by both menu and in-match views. Confirm total and per-category counts match the approved catalogue/spec; verify favorites, pagination and play selection still work. Record the final authoritative counts in the implementation summary.

### WP3 — Cross-stage visual consistency and content polish

#### D6 — Post-game portrait overlap and dead space (Medium)
**Finding:** The squad frame top edge is obscured by the score card and the lower composition has a large dead zone. The reviewer suggested a modest rewards/summary card. The review bundle also records that removal of the prior post-game rewards card was an **owner decision**.

**Implementation:** Fix the squad-frame/score-card overlap and improve the composition of the remaining space without silently reversing the owner's decision to remove the rewards card. A replacement rewards card is out of scope unless the owner explicitly changes that decision. Use existing approved post-game content and spacing to make the screen feel intentional; do not invent progression rewards.

**Acceptance:** Portrait and landscape post-game screenshots show the complete squad frame, no card collisions, balanced spacing and no invented reward content. Verify win/loss/draw states and ensure match result data remains accurate.

#### D7 — Live-play receiver clipping and legacy pink defense control (Medium)
**Finding:** Receiver C is partly hidden under the scoreboard; the “D” defense button retains a legacy pink fill.

**Implementation:** Keep live-play player/receiver markers below or clear of the HUD/scoreboard using responsive field bounds and safe clearance. Replace the pink treatment with the established green/navy treatment while preserving a clear, accessible defensive-control state. Avoid altering route/player positioning logic beyond necessary HUD collision handling.

**Acceptance:** Geometry checks assert all visible receiver markers remain within the playfield and clear of the scoreboard/HUD at supported aspect ratios. Assert the D control no longer uses the legacy pink palette and retains visible focus/pressed states. Inspect live-play captures.

#### D9 — Stage Three card borders, medal icon variety and small typography (Low)
**Finding:** Stage Three cards have noisy double cyan/gold borders; all achievements use the same sparkle icon; tab/pill text is around 9px.

**Implementation:**
- Harmonize Stage Three card borders with the single-border language used elsewhere (one clear 1–2px edge; retain a second accent only when it communicates a distinct selected/focus state).
- Give achievement/medal types distinct, semantically appropriate icons; do not use arbitrary decoration that makes achievements harder to scan.
- Improve tab and pill typography to a readable size at 360px and larger widths, while maintaining hierarchy and avoiding wrapping/clipping.
- Preserve the existing approved card layouts and achievement data.

**Acceptance:** Add/adjust visual assertions for border treatment and text sizing where practical; inspect Stage Three at 360px and desktop; confirm medal icons are distinguishable and labels remain legible.

#### D10 — Credits text clipping and developer-tools disclosure (Low)
**Finding:** Credits text is cut off mid-sentence and includes “5 taps for dev tools”, exposing the hidden developer drawer.

**Implementation:** Rewrite/resize/reflow the credits copy so all intended text is visible and complete at portrait, landscape and desktop sizes. Remove the instruction that exposes hidden developer tools from the public credits UI. Do not remove the underlying developer QA capability or expose it through another public-facing route.

**Acceptance:** Capture complete credits screenshots at supported sizes; assert no text overflow/clipping and that public credits content contains no developer-tools reveal instructions.

#### D11 — Developer credits evidence is duplicated (Low; QA evidence)
**Finding:** `portrait-credits-developer.png` and `portrait-credits.png` are byte-identical, so the developer drawer state is not evidenced.

**Implementation:** Correct the QA capture flow so the ordinary credits screenshot and developer-drawer screenshot are generated from distinct, explicitly prepared states. Keep hidden developer functionality out of the ordinary user-facing credits. The special QA state may invoke the existing developer-only path directly through the deterministic test hook rather than teaching users how to reveal it.

**Acceptance:** Assert the two captures represent the expected distinct states and are not byte-identical; assert the developer-only drawer is present only in its dedicated QA state. Review both actual images.

#### D12 — Fixture artifacts and remaining legacy match UI (Low)
**Finding:** A “TOUGH LOSS” at 0–0 appears to be a fixture artifact; the play-by-play card has a legacy white-bordered black style; the rotate-device screen is plain/legacy; and “TAP TO PLAY” is muted teal.

**Implementation:**
- Trace the 0–0 tough-loss screenshot to its deterministic fixture/setup. Correct the test fixture so the result label and score are coherent; do not change actual match-result logic to make a screenshot look better.
- Restyle the play-by-play card, rotate-device screen and TAP TO PLAY prompt using the established navy/gold/cyan visual system, while preserving responsive guidance, legibility, safe-area behavior and interaction.
- Treat the rotate screen as an intentional usability surface, not as a decorative-only element.

**Acceptance:** Deterministic post-game fixtures produce logically coherent score/result combinations. Inspect the play-by-play, rotate-device and TAP TO PLAY states at portrait/landscape breakpoints; verify the rotate prompt appears only when appropriate and does not trap the user.

## 4. Cross-stage consistency requirements

The following are system-wide review goals and must be verified as part of the packages above:

1. One canonical play catalogue and count source across menu and in-match Playbook.
2. Consistent navy `#131620`, gold `#F5B841`, cyan `#4DE1F2` and approved supporting colours; eliminate accidental legacy pink/teal/white-bordered treatments in the reviewed match surfaces.
3. Consistent card border language, readable type scale and meaningful icon semantics.
4. No empty-state voids or layout collisions in Identity, Career or post-game. For Identity/Career, inspect current implementation and fill only where existing product data/content supports it; do not invent career history or identity customization options.
5. Keep the post-game rewards-card removal as an explicit owner decision unless the owner changes it.
6. Preserve Stage One–Three approved functionality, the title-screen gate and pre-game Settings separation. The pre-game matchup redesign remains deferred.

## 5. Execution order

Implement in small, reviewable commits on the latest `UI-Overhaul` branch:

1. **Preflight:** verify current branch/HEAD, inspect relevant source and QA harness, review latest Actions and confirm no uncommitted/competing changes.
2. **WP1 blockers:** D1 and D2 plus deterministic regression tests. Run targeted and full browser QA; inspect screenshots before moving on.
3. **WP2 match/Playbook:** D3, D4, D5 and D8. Keep play-catalogue changes isolated and test selection/favorites/pagination.
4. **WP3 consistency:** D6, D7, D9, D10, D11 and D12. Separate fixture-only changes from production behavior.
5. **Cross-stage regression:** run all established UI-overhaul browser checks and inspect relevant screenshots for Stages 1–4, title screen/settings, menu, Playbook, live play, fumble, defense, achievement, post-game, credits, rotate-device and responsive layouts.
6. **Documentation:** update this plan with implementation commits, test run IDs, exact tested SHAs, artifact links, screenshot findings and any deviations. Update the UI implementation summary and project README index.
7. **Independent review:** prepare one consolidated Claude package covering all findings and exact final tested commit/artifacts. Evaluate the review and fix valid issues.
8. **Owner gate:** present a clear change/test/evidence report for final owner approval. Do not mark the overhaul approved before that decision.

## 6. QA and visual evidence contract

A passing workflow is necessary but not sufficient. For every relevant state:
- Record the exact tested commit and workflow run.
- Assert both content/state and geometry; styling-only assertions are insufficient for clipping/overlap findings.
- Capture real browser screenshots at relevant viewport sizes.
- Inspect the actual images for clipping, overlap, alignment, route legibility, text scale, contrast, icon meaning and visual consistency.
- Check console/page errors and same-origin request failures.
- Check transitions and transient states, not just static end states.
- Verify functionality remains intact: play selection, FLIP, defense choice, fumble mash, achievements, post-game, credits, settings and title-screen entry.
- Do not approve, update or replace golden snapshots without explicit owner authorization.

Minimum targeted evidence:
- D1: fumble prompt geometry and full instruction visible.
- D2: defense/drive/ticker/achievement timeline with no unintended overlap.
- D3: before/after FLIP state.
- D4: all six Playbook cards and route detail at display size.
- D5: coherent defensive scoreboard state.
- D6: complete post-game squad frame and balanced portrait composition.
- D7: live-play receiver bounds and D control styling.
- D8: canonical play-count report for menu and in-match catalogue.
- D9: Stage Three card and achievement captures at 360px and desktop.
- D10/D11: distinct ordinary credits and developer-only QA captures; complete public credits text.
- D12: coherent result fixture, play-by-play, rotate-device and TAP TO PLAY captures.

## 7. Guardrails and non-goals

- Do not begin the deferred pre-game matchup redesign.
- Do not reopen approved Stage One–Three decisions except for the specific polish findings listed here.
- Do not restore the removed post-game rewards card without new owner authorization.
- Do not invent player statistics, career history, rewards, play data or customization options.
- Do not change match/gameplay rules to accommodate QA fixtures.
- Do not weaken assertions merely to obtain a passing run.
- Do not modify golden snapshots or their provenance without explicit owner approval.
- Do not describe a change as implemented, tested, visually inspected, independently reviewed or approved until that exact gate has actually occurred.

## 8. Completion checklist

- [ ] D1 fumble prompt clipping fixed; geometry assertion and screenshot pass.
- [ ] D2 defense/modal/drive/ticker/achievement overlap fixed; transition assertion and screenshot pass.
- [ ] D3 FLIP has a visible state and gold-outline secondary styling.
- [ ] D4 Playbook titles/stars do not collide; routes are readable.
- [ ] D5 defensive scoreboard context is coherent.
- [ ] D6 post-game portrait overlap/dead space improved without reversing the rewards-card decision.
- [ ] D7 receiver markers clear the HUD; D control uses the approved palette.
- [ ] D8 canonical play counts and category distribution reconciled and documented.
- [ ] D9 Stage Three borders, medal icons and typography polished.
- [ ] D10 credits complete; public developer-tools reveal text removed.
- [ ] D11 ordinary/developer credits QA captures are distinct and inspected.
- [ ] D12 result fixture and legacy match surfaces corrected.
- [ ] Cross-stage responsive and functional regression suite passes.
- [ ] Actual screenshots/artifacts visually inspected.
- [ ] UI implementation summary and project README updated with exact evidence.
- [ ] Consolidated Claude review completed and valid findings addressed.
- [ ] Final owner approval recorded.

**Current state:** this is the approved scope and execution plan. Implementation, fresh QA, visual inspection, Claude re-review and final owner approval remain outstanding.
