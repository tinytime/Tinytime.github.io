# QA, Known Issues, and Handoff

## Current authority — 2026-11-20

- **Run #603:** Claude's independent review recommended the five-character set for owner review, reported no P0/P1 defects and verified Usher U4. The scope limitations and findings remain documented in the [Run #603 review log](qa-artifacts/five-civilian-corrections/CLAUDE-REREVIEW-RUN-603.md).
- **Owner approval:** Usher, Cook, Courier, Coach and Referee are owner-approved and complete. Preserve Cook C1 (deferred), Usher U2 (declined), U4 (resolved) and Coach/Courier X1 (accepted).
- **QA provenance:** Run #603 tested renderer `2c00cfca09cc12ea19a72662c235beed2e9a19cb`, artifact 14593339734. Targeted results passed: 20/20 native, 20/20 direct 28×42, 92/92 integrity, zero edge contacts/detached large components, role-debug 12/12, prop audit/gallery, page/script errors 0. Overall Actions concluded failure on snapshots (1 match / 23 changed) and 180 existing audio 404s. No snapshots refreshed or approved.
- **Construction standard:** owner-ratified on 2026-11-19; it is the governing standard for new civilian production.
- **Next batch QA:** Run #622 [tested renderer `b5762ab47868de96389d75f82517c57d481cd3ed` and QA harness `87eac9cd0a2b23a706f57df3e570ca3669c94c53`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670705401); [artifact 14599434590](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670705401/artifacts/14599434590). 12/12 native and 12/12 direct 28×42 captures (39px game anchor), 23/23 face uniqueness, palette/body checks, 92/92 directional integrity with zero edge contacts, prop audit, full 40-cell gallery and town smoke check passed. Visual inspection of all new captures and the gallery is complete. The overall Actions run remains failed because the golden-snapshot provenance is still unapproved; no snapshot changes were made. 135 audio-resource 404s remain in console output; pageErrors and scriptErrors are zero.
- **Claude review:** the [Guard/Vendor/Clinic renderer review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md) is prepared. Ten pairwise full-body silhouette overlaps trigger human review; they are not automatic failures. Claude must inspect the exact pairs and rendered captures before owner completion approval.
- **Runner:** built but excluded from the Run #603 five-character review; pending focused review and owner decision.
- **Golden snapshots:** none were refreshed or approved. Keep overall Actions failure distinct from targeted character evidence and visual approval.

## Claude Run #600 re-review findings — historical; owner dispositions recorded above

Claude's independent verdict is **Ready with disclosed minor issues**, with no P0/P1 findings. This is not approval. New P2 findings are Cook profile pan handle/contact (C1), Usher profile clipboard/arm continuity (U4), and Usher silhouette originality (U2). The face-scale rule requires revision; the package lacked walk frames. Coach/Courier rear is accepted as documented. Full findings and evidence limits are in [the re-review log](qa-artifacts/five-civilian-corrections/CLAUDE-REREVIEW-RUN-600.md).

All five remain NOT APPROVED. U4 and U2 require owner disposition before renderer changes. Next package must include two walk frames per direction for animated characters, exact IoU mask basis/alpha threshold, per-finding before/after sheets, fixed backdrop configuration and a completeness manifest. Do not refresh golden snapshots without explicit owner authorization.


## Review-derived visual acceptance requirements — 2026-11-19

Claude's review of the five-character evidence has been incorporated into the draft construction standard's Version 2 addendum. For future reviews, distinguish technical completeness, semantic annotation validity, visual design quality, direct game-scale readability and project integration. Do not treat passing automated checks as visual approval.

Required review checks now include:
- compare close roster silhouettes at native 64×96 and direct in-game 28×42; decide whether each warning is a genuine identity collision, acceptable shared body mass with distinct construction, or inconclusive;
- verify every handheld prop through shoulder/arm/wrist/hand/contact/support and directional continuity;
- assess character-specific face/head cues rather than accepting token differences in a shared template;
- inspect value separation, shape hierarchy and noise at actual 28×42 output;
- classify evidence-backed findings P0 critical, P1 major, P2 minor or P3 polish;
- record what must be preserved as well as what must change;
- keep gallery/town rendering-style compatibility as a separate project-level art-direction decision.

The revised 100-point category allocation is proposed only and remains non-gating. No new numeric contrast, IoU, score or category-floor threshold is introduced. A verified P0/P1 defect blocks advancement to owner approval regardless of aggregate score. P2 requires correction or documented acceptance rationale; P3 may be deferred. The project owner retains final approval authority.

Current application is limited to Usher, Cook, Courier, Coach and Referee. Runner remains excluded from this submission; the remaining 17 remain on hold. No snapshots or approval states are changed by this documentation update.

## Historical QA interpretation and handoff — 2026-11-19

This section supersedes older status statements below where they conflict. Historical run notes remain unchanged as historical records.

- **Construction standard:** operational as a controlled build-and-review method, but still awaiting independent Claude review and owner ratification. Use it now to develop and document the next designs; do not treat its provisional proportion bands, scorecard weights or score floors as acceptance gates.
- **Silhouette recommendation:** retain the existing pairwise silhouette audit as a *diagnostic review trigger*. Do not turn the observed 0.90 alert into a universal artistic acceptance threshold, and do not reshape a character merely to optimize IoU. The reported maximum pair is Clinic/Sailor front at 0.9094292803970223; Coach/Courier back at 0.890479 is a secondary watch item. These are roster-wide findings, not evidence that the five-character correction group fails. Require the report to name the exact pair/direction, show both actual renders at native and game scale, and record a human decision: genuine identity collision, acceptable shared body mass with distinct role construction, or inconclusive. Escalate genuine collisions for design correction; retain accepted exceptions with rationale. Keep silhouette similarity separate from semantic-mask fit, anatomical proportions, and visual quality review.
- **Current first-review group:** Usher, Cook, Courier, Coach and Referee are in the owner-authorized correction/review round. The three previously owner-approved designs were reopened; prior approvals are historical only. Runner is excluded from this Claude submission and remains for a later focused review.
- **Release decision:** the remaining 17 civilians are **ON HOLD** for production rollout. The standard may inform planning and future briefs, but do not begin the remaining batch until the five-character correction set has fresh four-direction/native and direct game-scale evidence, internal QA, independent Claude comparative review, and explicit owner approval of the direction/standard.
- **Latest Granny diagnostic QA:** Run #591 verified the landmark-sheet presentation and output manifest, plus the targeted semantic, capture, overlay, directional, gallery and town checks. Granny's semantic polygon/landmark candidates remain unverified; pixel-derived contours matching renderer alpha do not prove anatomical correctness. Granny remains `reference_only`; no ratio calibration or candidate promotion is authorized.
- **Workflow interpretation:** the #591 GitHub Actions run itself concluded FAILED. Its substantive blockers include the global silhouette gate and unapproved golden snapshots (1 match / 23 changed). Missing audio assets/404s are expected on this branch and are non-blocking environment noise for project assessment; do not spend time adding/fixing audio or count those 404s as a character defect. Do not rewrite the historical Actions conclusion. No golden snapshots were refreshed or approved.
- **Next sequence:** finish and render the five-character correction pass; update the five-character evidence package against the current source; run and inspect fresh QA artifacts; submit that exact evidence to Claude; resolve valid findings; obtain owner approval; only then release the remaining roster.


## Run #600 expanded review evidence — 2026-11-20

- [Actions run #600](https://github.com/tinytime/Tinytime.github.io/actions/runs/44650864326), artifact `14591690387`, QA evidence-builder commit `90c5d266279c61461b460b024ee96e71f327e081`; the renderer source remains `3d1ec4bcbac231e99e75d36f21e79a5fcf7fd4eb`.
- Evidence builder succeeded and added `five-civilian-black-silhouette-4x-contact-sheet.png` (native alpha silhouettes) and `five-civilian-town-ground-composite.png` (direct 28×42 sprites composited over the captured night-town screenshot).
- The town-ground composite is diagnostic only, not proof of a live named-NPC spawn. The black silhouette sheet is a shape aid, not a semantic anatomy mask.
- The underlying renderer QA metrics remain as recorded in Run #599: 92/92 directional integrity, zero edge contacts, 20/20 direct 28×42, 12/12 role-debug, prop/gallery pass, zero page/script errors. The workflow's unrelated audio/global silhouette/unapproved snapshot gates remain failed.
- [Internal QA record and before/after pixel diffs](qa-artifacts/five-civilian-corrections/RUN-599-600-INTERNAL-QA.md).

## Run #599 P2 correction QA — 2026-11-20

- Exact renderer source: `3d1ec4bcbac231e99e75d36f21e79a5fcf7fd4eb`.
- [Actions run #599](https://github.com/tinytime/Tinytime.github.io/actions/runs/44650509863), artifact `14590034123`.
- Results: syntax/module pass; 20/20 native and 20/20 direct 28×42 captures; 92/92 directional integrity with zero edge contacts and zero detached large components; 12/12 role-debug; prop audit and gallery pass; pageErrors=0; scriptErrors=0.
- Overall workflow remains FAILED on expected 180 missing-audio 404 console diagnostics, global Clinic/Sailor front silhouette IoU 0.9094292803970223, and unapproved golden snapshots (1 match / 23 changed). No snapshots were refreshed or approved.
- Visual inspection: Usher profile shoes separate at game scale; Cook front pan is now a shallow skillet with visible handle and no edge clipping; face edits for Courier/Usher/Cook are visible in native and direct game-scale evidence; Coach/Courier rear construction remains distinct; Referee is pixel-identical to Run #595.
- Before/after pixel diffs from Run #595 to #599 are in the tracker. All five remain NOT APPROVED pending Claude re-review and owner approval.

## Owner-authorized P2 correction pass — 2026-11-20

Owner authorized all four P2 areas from Claude Run #595. Renderer commit `2b45201eb762a939547f5c8414ae9f44e5dc0d22` changes the three affected draw functions (Usher, Cook, Courier); Coach/Courier rear distinction is documented without a torso change. Run #596 is the exact-source browser QA. Do not report visual resolution until all native 64×96 and direct 28×42 captures have been inspected. Required evidence includes before/after views, both profiles for Usher, Cook front and both profiles, Coach/Courier rear paired comparison, neutral-grey and town/night game-scale contexts, four-direction black silhouette sheet, and named-character town evidence where supported. Include pixel-diff summary and exact source SHA. Referee must remain unchanged. Do not refresh golden snapshots. All five remain NOT APPROVED pending internal QA, Claude review and owner approval.

## Run #595 independent review and revised evidence requirements — 2026-11-19

Claude's independent visual review of the five-character Run #595 package is complete. Verdict: **ready for owner review**, not approval. No P0/P1 findings remain. P2s requiring owner disposition: F1 facial individuality (Courier/Usher/Cook), U1 Usher profile shoe separation, C1 Cook pan/hand readability, and X1 documented Coach/Courier rear distinction. P3 notes may be deferred. All five remain NOT APPROVED pending owner decision.

Claude inspected all 20 native 64×96 and 20 direct 28×42 images and supplied composites. The ZIP did not contain the black silhouette sheet, identity briefs, proportion cards or Actions logs; the reviewer did not inspect source or supporting docs 02/04. A generic town scene is not proof that every named NPC was spawned. Future review packages must include those missing records or explicitly label them unavailable.

Every correction round must include before/after evidence for each finding, with exact source commit, direction, native and direct game-scale captures, and a pixel-diff summary. Inspect direct game-scale output on neutral grey and actual town ground/night lighting. Include a solid-black four-direction silhouette sheet, identity brief and proportion card, and walk/animation frames where applicable. Pixel diffs are diagnostic locators, not quality scores.

Maintain a roster-level torso/garment-shell variety audit without an arbitrary numeric cap. Document character-relative prop handedness and near-side prop placement in mirrored profiles. Retain semantic measurement tools as diagnostic; unverified candidate annotations must not become hard gates or Granny-derived targets. Preserve historical QA records; future detailed logs may be separated into a dedicated QA log.

Run #595 overall workflow remains FAILED on the global Clinic/Sailor silhouette gate and unapproved golden snapshots. Expected audio 404s are non-blocking branch noise. No golden snapshots were refreshed or approved.

## Browser QA

The GitHub Actions workflow is `.github/workflows/vapor-city-browser-qa.yml`. It runs on pushes to `npc-granny-baseline-overhaul` and `main` when relevant game, renderer, QA, or workflow files change. It can also be started manually.

The workflow installs Node 20 and Playwright/Chromium, runs `node qa/vapor-city-browser-qa.mjs`, and uploads `qa-output/` as the `vapor-city-browser-qa` artifact even when the diagnostic step fails.

For every run:

1. Confirm the run's commit SHA matches the code being reviewed.
2. Inspect job status and step-level failure details.
3. Download and inspect the artifact, including the rendered sheets, town/gallery images, and JSON report.
4. Separate character-specific results from global or legacy-system failures.
5. Record the run ID, commit SHA, targeted results, overall result, and unresolved issues in the tracker.

A workflow failure is not automatically proof that the new character is defective. Conversely, a targeted character pass is not equivalent to whole-workflow success or design approval.

## Known result from browser QA run #393

This is a historical handoff snapshot. Recheck the latest branch and run before relying on it.

- Run ID: `44528522790`
- Run URL: https://github.com/tinytime/Tinytime.github.io/actions/runs/44528522790
- Tested commit: `35027d7d849ee3bb9ef173f2ae6172a53de920ba`
- Overall workflow: **FAILED**
- Targeted Usher body, palette, outline, prop, and visual-integrity checks: **PASSED**
- Four-direction rendering and Granny checks: **PASSED**
- Town scene/gallery checks: **PASSED**
- No material JavaScript/page errors were observed in that run.

The workflow remained failed for two separate reasons:

1. **Golden snapshot approval gate:** golden images had not been explicitly approved by the project owner. Do not approve or refresh them simply to clear this failure.
2. **Legacy civilian silhouette audit:** the global audit still flagged overlap among legacy pixel civilian designs (examples recorded at the time included clinic/sailor and coach/vendor). This was not identified as an Usher-specific defect.

The correct summary for that run is: **Usher targeted checks passed; the overall workflow failed on separate snapshot-approval and legacy silhouette gates. Usher was not approved.**

## Golden snapshot policy

The README explains that files in `qa/golden-npcs/` are comparison fixtures, not an art-quality scorecard. Their provenance is recorded in `qa/golden-npcs/PROVENANCE.json`. Human visual review and explicit approval identity/date/commit are required before the goldens can be treated as approved baselines.

Do not:
- refresh golden images to make a test pass;
- edit the provenance manifest to imply approval;
- treat a pixel match as proof of good art;
- weaken unrelated QA thresholds to hide a legacy issue.

If the owner explicitly approves a golden update, document exactly what was approved and why.

## Scope policy

`qa/npc-scope-policy.json` explicitly excludes cat variants and a set of legacy `owFig` characters from the standard NPC art scorecard. Granny is classified as the reference baseline, not a standard NPC scorecard entry. Do not change those classifications without an explicit owner decision.

The inventory generator reads live NPC records and renderer tables from the game HTML and `npc_sprites.js`. It expects 24 live civilian archetype mappings. This technical inventory count should not be conflated with the 23 civilian names in the design tracker.

## Current independent pilot review and next actions

Claude's comparative review of the 18-image evidence package is complete. The reviewer found no required character fixes on Usher or Cook. Courier has three required corrections: readable face/profile in left/right views (major); consistent messenger satchel across all four directions, correctly on the character's right hip in rear view (major); remove or attach the detached cyan line below the hem in back/side views (minor). Optional polish and a legacy QA threshold-documentation discrepancy are recorded in the tracker; neither is a pilot blocker.

A first Courier correction pass was committed as `98dbcda2a32fa506ba355f12ddd449db3322a4b4` in `npc_sprites.js`: side profile face added, backpack-like rear/side pack replaced with a compact messenger satchel and rear strap, detached hem stripe removed.

Browser QA run #410 (`44542492048`) tested that exact source SHA and uploaded artifact `14537384741`. Courier-specific syntax/module, palette, body/baseline/contrast, unique face, 92-capture visual integrity, prop, role-debug, town and gallery checks passed. Actual four-direction native captures, nearest-neighbor enlargements, role-debug, full gallery and town screenshot were inspected. The profile face is readable; satchel placement is consistent (rear view on viewer-right, the character's right hip); the detached hem stripe is absent; parcel/hand contact remains connected. No page/script errors. 135 missing audio resources returned 404.

The overall workflow is **FAILED**, but for separate existing/global gates: the 23-civilian silhouette audit still flags Clinic/Sailor front (0.9094), Coach/Vendor front (0.8990) and back (0.8912), Sailor/Welder back (0.8893), Clinic/Sailor back (0.8842), and Clinic/Welder back (0.8718), above the 0.90 limit. Cook/Courier back is 0.8635 and below the limit. The golden baseline remains explicitly unapproved (23 changed snapshots, 1 match); no golden images were refreshed or approved.

Next actions:
1. QA and Independent Review Coordinator independently verifies run #410, its exact source SHA, report and uploaded artifact.
2. Send the corrected Courier front/back/left/right images and 8× role-debug evidence to Claude for focused reinspection of the three required findings.
3. Record Claude's follow-up and any required changes; rerun browser QA if changes are made.
4. Return the three-pilot status to the owner. Keep all pilots NOT APPROVED until owner acceptance.
5. Keep the remaining 20 civilian designs on hold until the three-pilot review is complete and the owner approves the direction.

## Handoff checklist for a new builder

- [ ] Read this folder's README and all four background documents.
- [ ] Read the [NPC Vector Character Tracker](NPC_VECTOR_CHARACTER_TRACKER.md).
- [ ] Confirm branch and current commit before making changes.
- [ ] Inspect the live renderer and latest QA artifacts.
- [ ] Keep Usher marked not approved until Claude and owner review are complete.
- [ ] Do not start the remaining 20 characters before the three-character review.
- [ ] Update the tracker after each meaningful build or QA milestone.


## Courier correction independent QA verification — run #410

The QA Coordinator independently rechecked the current correction run and artifact after the renderer handoff.

- Run: [#410 / 44542492048](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048)
- Tested source SHA: `98dbcda2a32fa506ba355f12ddd449db3322a4b4`
- Browser QA job: `135624264131` (diagnostic step failed; artifact upload succeeded)
- Artifact: `vapor-city-browser-qa`, ID `14537384741`
- Artifact files inspected: `npc-type-directions/courier-{front,back,left,right}.png`, `cook-courier-usher-role-debug-8x.png`, `npc-gallery-4x.png`, `npc-gallery-1x.png`, `game-town-1x.png`, and `report.json`.

Independent visual verification confirms the side-profile face is readable in both directions; the satchel is consistent in front/back/side views and appears on viewer-right (the character's right hip) in the rear view; the detached cyan hem stripe is absent; and the parcel remains visibly held. The role-debug evidence shows distinct Courier props and garments. Gallery and town renders show no obvious clipping. Reported visual-integrity checks cover 92 captures with zero edge contacts and zero detached large components.

Courier-specific automated checks pass: syntax/module/inventory; three-vector palette evidence (Courier 1,405 unique antialiased colors, 2,210 opaque pixels, 42 ink pixels); body/baseline/contrast; 23 distinct faces at native and game scale; role-debug (6 captures); prop audit; town scene; and gallery. No scriptErrors or pageErrors.

The workflow remains **FAILED** on unrelated/global gates: all-civilian silhouette audit max rendered IoU 0.909429 (Clinic/Sailor front), with further legacy overlaps including Coach/Vendor, Sailor/Welder, and Clinic/Welder; golden snapshots remain explicitly unapproved (23 changed, 1 match). No snapshots were refreshed or approved. 135 missing audio-resource 404s were logged.

**QA Coordinator verdict:** Courier's three required corrections pass internal visual verification and the updated evidence is ready for Claude's focused re-review. This is not independent reviewer approval or owner approval. Claude has not yet been contacted. Keep all three pilots NOT APPROVED and the remaining 20 on hold.

## QA Coordinator final verification and threshold clarification — run #410

On 2026-11-19 the QA Coordinator re-fetched run #410, verified job `135624264131` and artifact `14537384741`, and independently inspected the Courier native directional PNGs, role-debug sheet, 4× gallery, and town capture. The artifact report's `sourceCommitSha` is `98dbcda2a32fa506ba355f12ddd449db3322a4b4`. Current branch head is `db3f958351aa9994fab544dfb915ea0e2424708d`; comparison confirms the 12 commits after the tested source changed documentation files only, not renderer/game/QA source.

**Courier correction verdict: PASS for internal QA; NOT APPROVED.** The left/right profiles show a readable face; the same compact satchel appears across the directions and is on viewer-right in the rear view; the detached cyan hem stripe is absent; parcel grip remains visibly connected. Targeted syntax/module, inventory, palette, body/baseline/contrast, face distinctness, 92-capture integrity, prop, role-debug, gallery, and town checks pass. `scriptErrors` and `pageErrors` are empty.

**Important audit interpretation correction:** the 23-civilian full-body `civilianTypeSilhouetteAudit` has a strict IoU limit of 0.90. Only Clinic/Sailor front (0.909429) is above the limit and causes that audit to fail. Coach/Vendor front (0.898985), Coach/Vendor back (0.891175), Sailor/Welder back (0.889290), Clinic/Sailor back (0.884215), Clinic/Welder back (0.871764), and Cook/Courier back (0.863465) are nearest pairs but remain **below** 0.90; they are not failures of that threshold. The separate `silhouetteQualityCheck` uses a different <0.85 criterion across its 180 legacy archetype pairs and passes (max IoU 0.827467). These two audits must not be conflated.

The overall workflow remains **FAILED** due to the Clinic/Sailor front overlap and the explicitly unapproved golden-snapshot baseline (23 changed, 1 match). No snapshots were refreshed or approved. Missing-audio resource 404s remain in console output; no page/script errors were reported. The Courier focused Claude re-review package has been prepared, but Claude has not yet been contacted.

## Owner approval and next character group — 2026-11-19

The project owner approved the first batch (Usher, Cook, Courier) and authorized the next group: Runner, Coach, Referee. Runner is the first active build. Its dedicated vector renderer is in `npc_sprites.js` at commit `129c7ed6e0f97d9029bd25ef12bed1d5f8524429`; QA coverage for four vector civilians and eight role-debug views is at `ccd238161ca58a7d5743f7f4462ec7c8f7292e14`. The latest Runner browser workflow and artifact inspection are pending. Verify four directions, native and enlarged readability, silhouette/face/palette/prop, foot baseline, town/gallery context, and regressions. Do not start Coach or Referee until Runner's internal QA passes. No golden snapshots may be changed without separate owner authorization.


## Runner implementation and first QA findings — 2026-11-19

Runner's dedicated `drawRunnerVector` is integrated in `npc_sprites.js` with a mid-stride pose, coral race singlet, split shorts, bib, sweatband, curls, stopwatch, and technical shoes. Renderer commits: `129c7ed6e0f97d9029bd25ef12bed1d5f8524429` initial; `fbf8de28ae3ab9f4f3f242e353f598695fcff011` attempted height adjustment; `ae550b0fc65ab9df4e23c510a473d7e7ad2b269e` corrected the scope (Runner vertical transform only; Cook transform restored). QA coverage commit `ccd238161ca58a7d5743f7f4462ec7c8f7292e14` expects four vector civilians and eight role-debug captures.

Initial browser run `44547198609` / artifact `14540998102` confirmed Runner rendering in four directions, vector palette evidence, distinct face, role-debug, prop, gallery and town. It found Runner body height 76px vs 81px target and feet two pixels above baseline. It also caught Cook touching the top edge after the first transform edit; source inspection revealed the edit had accidentally matched Cook's transform instead of Runner's. The next run `44547955840` tests the scoped correction commit `ae550b0fc65ab9df4e23c510a473d7e7ad2b269e`; it has not yet completed at this handoff. Inspect its artifact before deciding whether Runner passes. Keep Coach and Referee unstarted until Runner internal QA and visual inspection pass.


## Runner clothing silhouette refinement — 2026-11-19

Run `44547955840` tested renderer commit `ae550b0fc65ab9df4e23c510a473d7e7ad2b269e`; artifact `14540254177` confirmed Runner's 81px body height and foot baseline exactly, and passed targeted palette (four vector / 19 legacy), face distinctness, eight role-debug captures, 92-capture visual integrity, props, town and gallery. The enlarged four-direction sheet exposed a remaining art-direction issue: the long red singlet read as a tunic and obscured the split shorts. Commit `6905171293c04f34f3ee09c804c490082e1f3d57` shortens the front/back/side singlet hem and raises the shorts boundary to show the intended athletic layering. Run `44548532467` is the active browser validation of that latest change; inspect all directional PNGs and native-scale gallery/town evidence before passing Runner. Coach and Referee remain unstarted.


## Runner final targeted QA result — 2026-11-19

Run `44548532467`, job `135645796007`, tested exact source `6905171293c04f34f3ee09c804c490082e1f3d57`; artifact `14540104692` was downloaded and inspected. Runner-specific checks passed: four-vector palette (19 legacy / 4 vector), body/baseline (80px / 0.4375px deviation / 1px baseline delta), 23 unique faces, role-debug 8/8, visual integrity across 92 captures (zero edge contacts and zero detached large components), prop audit, town state, gallery, and separate silhouette-quality audit. Actual front/back/left/right 64×96 PNGs, 4× directional sheet, 8× role-debug, 4× gallery, and town screenshot were inspected. The shortened singlet reads as a race top with visible split shorts. No script/page errors; 180 missing-audio 404s. Overall workflow remains FAILED on global Clinic/Sailor front full-body IoU 0.909429 (>0.90) and the explicitly unapproved golden snapshot baseline (23 changed, Granny only match). No golden snapshots refreshed or approved. **Runner internal QA: PASS; design approval: pending.** Coach and Referee remain unstarted.


## Runner internal QA — 2026-11-19

- Browser run: [#44548532467](https://github.com/tinytime/Tinytime.github.io/actions/runs/44548532467), job `135645796007`.
- Tested source commit: `6905171293c04f34f3ee09c804c490082e1f3d57` (latest branch head before documentation updates: `eab4b276221cd599003815fc86d148dadeaae3a7`).
- Artifact `14540104692` was downloaded. Actual front/back/left/right 64×96 captures, 8× Runner/Cook/Courier/Usher role-debug sheet, town screenshot, and gallery evidence were inspected.
- Runner-specific checks: palette/vector output, group palette differentiation, body height and baseline, face uniqueness (23/23 at native and game scale), role-debug 8/8, visual integrity (92/92 captures; no edge contacts or detached large components), props, silhouette quality, town state (16 NPCs; Granny present), and gallery visual pass all passed. The race bib and distinct shorts/legs read in enlarged views; no character-specific clipping or detached geometry was found.
- Overall workflow: **FAILED**, not because of Runner's targeted checks. Two known global gates remain: golden snapshots are unapproved (23 changed, 1 match; no snapshot refresh or provenance change), and the global 23-civilian silhouette audit flags legacy pairs including clinic/sailor and coach/vendor. There were 180 console errors, all audio-resource 404s across 46 unique audio URLs; `scriptErrors` and `pageErrors` were empty. `townButtonVisible=false` / no town click was attempted, but `townSceneState.pass=true` and the town screenshot was captured; gallery opened and passed.
- Runner status: **BUILT — TARGETED INTERNAL QA PASSED; NOT APPROVED**. Claude review and owner approval for the second group are still pending. Coach is the next authorized character; Referee follows after Coach's internal QA.


## Runner internal QA — independent Coordinator verification (run #416)

- Run: [#416 / 44548532467](https://github.com/tinytime/Tinytime.github.io/actions/runs/44548532467)
- Browser QA job: 135645796007 (diagnostic step failed; artifact upload succeeded)
- Tested renderer/source SHA: 6905171293c04f34f3ee09c804c490082e1f3d57
- QA coverage commit: ccd238161ca58a7d5743f7f4462ec7c8f7292e14
- Artifact: vapor-city-browser-qa, ID 14540104692.

The QA Coordinator independently downloaded and inspected the artifact: four native 64×96 Runner directions, nearest-neighbor 4× direction composite, 8× Runner/Cook/Courier/Usher role-debug, 4× civilian gallery, town screenshot, and report.json. The Runner's four views read consistently as an athletic sprint character. Side profiles show facial details; the front/back and side running poses retain distinct limb arrangements; race bib 07, terry sweatband, stopwatch, split shorts and technical shoes remain legible. No Runner-specific clipping or detached geometry was observed.

Targeted results: syntax and module load pass; inventory pass (135 NPC, 24 civilian mappings); palette audit pass (four vector / 19 legacy pixel, Runner 1,083 unique colors, 1,904 opaque pixels, 20 exact ink pixels); palette differentiation pass; body check pass (80px body vs 81px target, 0.4375px deviation, baseline delta 1); face distinctness 23/23 unique at native and game scale; role-debug 8/8; visual integrity 92/92 with zero edge contacts and zero detached large components; prop audit pass; town scene pass (16 NPCs, Granny present); gallery pass; separate silhouette-quality audit 180/180 pairs below 0.85. No page or script errors.

The overall workflow is FAILED on two global gates: civilian-type silhouette audit Clinic/Sailor front IoU 0.909429 exceeds 0.90, and the golden baseline remains explicitly unapproved (23 changed snapshots, 1 match). 180 audio-resource 404 console errors across 46 unique URLs were logged. These are not Runner-specific defects. No golden snapshots were refreshed or approved.

**QA Coordinator verdict:** Runner's targeted internal QA is independently verified as PASS. This is not Claude approval or owner approval; Runner remains NOT APPROVED. Coach is next in the authorized group, followed by Referee.

## Coach browser QA — run #420 (2026-11-19)

- Run: [#420 / 44551256553](https://github.com/tinytime/Tinytime.github.io/actions/runs/44551256553)
- Browser job: 135655281455; artifact: 14542916538 (vapor-city-browser-qa)
- Exact tested renderer/source commit: a9c29109e8f64a1009fd0b1df5ab560ff08fdbd8; QA coverage commit: 6800e95ce9ebb7b647044b2dd81d0202d5c12fae.
- Coach has a dedicated drawCoachVector dispatch path: veteran sideline coach with forest-green warm-up jacket, cream shoulder yoke, silver-templed face, gold whistle/lanyard, marked clipboard, track trousers and court shoes. Side-profile facial details were strengthened after the first artifact showed the profile too blank; run #420 contains the corrected eye/nose/mouth.
- Targeted QA passed: syntax/module load; 5 vector / 18 legacy-pixel palette audit; palette differentiation; Coach body/baseline/contrast (80px body, 0.4375px height deviation, baseline delta 1); 23/23 distinct faces; role-debug 10/10; 92/92 directional visual-integrity captures with zero edge contacts and zero detached large components; prop audit; separate silhouette-quality audit (180/180 pairs below 0.85); town scene (street map, 16 NPCs, Granny present); gallery visual pass. No page or script errors.
- Actual Coach front/back/left/right native 64×96 captures were inspected and enlarged 4× with nearest-neighbor. The 10-capture role-debug sheet, 4× 23-civilian gallery, and town screenshot were also inspected. The front clipboard is hand-connected; jacket/yoke, trousers, shoes, rear team mark, and side-profile face read clearly. No Coach-specific clipping or detached geometry was found.
- Overall workflow: FAILED on the pre-existing global Clinic/Sailor front silhouette overlap (IoU 0.909429 > 0.90) and the explicitly unapproved golden snapshot gate (23 changed, 1 match). Coach/Courier rear overlap is 0.893564, below the 0.90 threshold; Coach/Courier front is 0.855085. The separate silhouette-quality audit passes. 180 console errors are missing-audio resource 404s; scriptErrors and pageErrors are empty. No golden snapshots were refreshed or approved.
- Coach status: BUILT — TARGETED INTERNAL QA PASSED; NOT APPROVED. Claude's comparative review and owner acceptance for the Runner/Coach/Referee group remain pending. Referee is next; do not start other roster characters.


## 2026-11-19 Runner/Coach/Referee group internal QA closeout

- **Coach:** run #420 (`44551256553`), job `135655281455`, exact renderer source `a9c29109e8f64a1009fd0b1df5ab560ff08fdbd8`, artifact `14542916538`. Targeted palette/body/baseline/face/role-debug (10/10)/visual-integrity (92/92)/prop/silhouette-quality/town/gallery checks passed. Four native directions and 4× views, role-debug, gallery and town were visually inspected. No Coach-specific clipping or detached geometry. Overall workflow failed only on global Clinic/Sailor silhouette and unapproved golden snapshot gates; 180 missing-audio 404s, no page/script errors.
- **Referee:** run #425 (`44553520770`), job `135663311368`, exact source `3fdfdb25a5481e62f43c84b3483ec131493e290b`, artifact `14542904013`. Targeted palette/body/baseline/face (23/23)/role-debug (12/12)/visual-integrity (92/92)/prop/silhouette-quality (180/180 pairs)/town/gallery checks passed. Four native 64×96 directions and nearest-neighbor enlargement, six-character role-debug, 4× gallery and town screenshot were inspected. Latest card/hand position clears top-edge clipping. No Referee-specific clipping or detached geometry. Overall workflow failed on global Clinic/Sailor front IoU 0.909429 (>0.90) and explicitly unapproved golden snapshots (23 changed, 1 match); 180 missing-audio 404s, no page/script errors.
- **Group verdict:** Runner, Coach and Referee have all passed targeted internal QA and visual inspection. All remain **NOT APPROVED** pending Claude's comparative review against Granny Volt and explicit owner acceptance. No golden snapshots were refreshed or approved. The remaining 20 civilian designs stay on hold.

## Referee corrected-render QA — run #426 (2026-11-19)

- Run: [#426 / 44557279748](https://github.com/tinytime/Tinytime.github.io/actions/runs/44557279748)
- Browser job: `135676647176`; artifact: `14545038850` (`vapor-city-browser-qa`)
- Exact tested renderer/source commit: `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495` (Referee handedness, rear hair and side-profile refinement).
- The dedicated `drawRefVector` path remains wired through the existing `kind==='ref'` vector dispatch. No dispatch or unrelated renderer changes were required.
- Targeted checks passed: renderer/game syntax and module load; inventory; vector palette (Referee 1,078 unique antialiased colors, 2,192 opaque pixels, 93 exact ink pixels); body/baseline/contrast (35.4375px rendered vs 35px target, 0.4375px deviation, baseline delta 1, contrast ratio 4.70); 23/23 face uniqueness; role-debug 12/12 across six vector characters (front/right views); 92/92 directional visual-integrity captures with zero edge contacts and zero detached large components; prop audit; separate silhouette-quality audit (180/180 pairs below 0.85); town scene and gallery.
- Downloaded and visually inspected the artifact. Referee front/back/left/right native 64×96 PNGs and a nearest-neighbor 4× composite were checked, along with the Referee four-direction gallery column, six-character role-debug sheet, full gallery, town screenshot and report. Card handedness is consistent: front view card on viewer-right, back view card on viewer-left, and both profiles place it on the trailing side; the fingers overlap the lower card edge. Dark cropped rear hair is visible under the sweatband. The side torso narrows distinctly, with profile face and opposite hanging hand present. At 28×42 game scale the yellow card/red mark remains recognizable. No Referee-specific clipping or detached components.
- **Town-scene limitation:** the standard QA town capture forces the street map (16 NPCs, Granny present). That map's roster does not explicitly include a Referee. The town test therefore verifies scene/render regressions, but does not prove a Referee instance's card in the live street. The directional game-scale downsample confirms the card cue at 28×42; an explicitly spawned Referee in a town scene would be needed for a strict live-town card check.
- Overall workflow: **FAILED** on global Clinic/Sailor front full-body IoU 0.909429 (>0.90) and the explicitly unapproved golden snapshot gate (23 changed, 1 match). Separate silhouette-quality check passed. 180 console errors are missing audio-resource 404s; pageErrors and scriptErrors are empty. No golden snapshots were refreshed or approved.
- **Renderer verdict:** Referee targeted internal QA and visual inspection PASS. Referee remains **NOT APPROVED** pending QA Coordinator's independent verification, Claude's comparative review of Runner/Coach/Referee against Granny Volt, and owner acceptance. The remaining roster stays on hold.


## 2026-11-19 latest Runner / Coach / Referee internal review

See [Runner / Coach / Referee Internal Review](RUNNER-COACH-REFEREE-INTERNAL-REVIEW.md) for the consolidated review record and exact source/run/artifact references. Latest Referee renderer source `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495` was tested by run #426 (`44557279748`), job `135676647176`, artifact `14545038850`. Native 64×96 four directions, enlarged sheet, gallery column, six-character role-debug, full gallery, town screenshot and report were inspected. Handedness, card/hand overlap, rear hair beneath sweatband, narrowed profile torso and profile hand details are visually sound; card and red mark remain recognizable at 28×42. Referee targeted QA passed: palette, body/baseline, 23/23 face distinctness, role-debug 12/12, visual integrity 92/92, prop, silhouette-quality, gallery and town regression; no page/script errors. **Town caveat:** standard 16-NPC town capture does not explicitly spawn Referee, so a dedicated live-town capture remains outstanding if required for approval.

The global run remains failed on Clinic/Sailor front IoU 0.909429 (>0.90), unapproved golden snapshots (23 changed, 1 match), and 180 missing-audio 404s. Do not refresh or approve snapshots. Runner, Coach and Referee remain **NOT APPROVED** pending Claude comparative review against Granny Volt and owner acceptance.

## 2026-11-19 Coach corrected-render QA — run #428

The latest Coach source commit `3fdbd1e0640c97afce2c3b732491ff84823ba84e` was tested by [browser run #428](https://github.com/tinytime/Tinytime.github.io/actions/runs/44560760230), job `135689302384`, artifact `14550985215`. See [Coach Run 428 review package](qa-artifacts/coach-run-428/README.md) for provenance, capture inventory and the detailed checklist.

Internal inspection covered the actual native 64×96 front/back/left/right captures, nearest-neighbour enlarged views, gallery, role-debug sheet, town screenshot and report. Rear hair is visible below the cap. Both profiles show the clipboard as a separate board/paper/clip construction with the hand overlapping its near/lower edge. The cream yoke follows the shoulder seam on both profiles. Profile eyes, projecting noses and mouths remain readable; sideburn edges are clean. The whistle and gold lanyard are present on both sides, but the small pendant is borderline whistle-readable at native scale and is recorded as a minor polish note. No Coach-specific clipping, edge contacts or detached large components were observed.

Automated checks passed for syntax/module/inventory, Coach vector palette (1,052 unique antialiased colors / 2,040 opaque pixels / 64 exact outline pixels), body/baseline (34.5625px vs 35px target; 0.4375px deviation; baseline delta 1; contrast 3.665), face distinctness 23/23, role-debug 12/12, visual integrity 92/92, prop audit, silhouette-quality 180/180, gallery and town regression. Page/script errors were zero; 180 console errors were missing audio-resource 404s. The street town capture has 16 NPCs and Granny but does not explicitly spawn Coach, so it is not Coach-specific live-scene proof.

Overall workflow **FAILED** on the global Clinic/Sailor front full-body IoU 0.909429 (>0.90) and explicitly unapproved golden snapshots (23 changed, 1 match). Coach/Courier front (0.855085) and back (0.890479) overlaps are below the 0.90 failure threshold. No golden snapshots were refreshed or approved. **Coach targeted internal QA and visual review PASS with a minor whistle-legibility note; Coach remains NOT APPROVED** pending Claude comparative review against Granny Volt and owner acceptance.


## 2026-11-19 Coach corrected-render QA — run #428

Coach's corrected renderer source `3fdbd1e0640c97afce2c3b732491ff84823ba84e` was tested exactly by run #428 (`44560760230`), job `135689302384`, artifact `14550985215`. The artifact's native four-direction Coach images, 4× gallery, role-debug sheet and town screenshot were inspected. Coach-specific targeted QA passed: palette (1,052 unique antialiased colors / 2,040 opaque pixels / 64 ink pixels), body/baseline (34.5625px vs 35px target, 0.4375px deviation, baseline delta 1, contrast 3.66), face distinctness 23/23, role-debug 12/12, visual integrity 92/92 with zero edge contacts/detached large components, prop audit, silhouette-quality 180/180, gallery and town regression. No page/script errors. Rear hair and profile clipboard/hand construction look connected; the whistle pendant is tiny at 28×42 and the profile clipboard compresses to a narrow shape, both minor readability polish notes. Town roster does not explicitly spawn Coach.

The separate full civilian type-silhouette audit is still failed: Clinic/Sailor front IoU 0.909429 and Coach/Courier back IoU 0.890479 exceed the 0.85 threshold; additional pairs are Sailor/Welder back 0.889290, Clinic/Sailor back 0.884215, Clinic/Welder back 0.871764 and Cook/Courier back 0.863465. This is distinct from the separate archetype silhouette-quality check, which passes 180/180 pairs. Golden snapshots remain unapproved (23 changed, 1 match); 180 audio-resource 404s persist. Do not refresh or approve snapshots. Coach remains **NOT APPROVED** pending Claude comparison and owner acceptance. See [Runner / Coach / Referee Internal Review](RUNNER-COACH-REFEREE-INTERNAL-REVIEW.md).


## 2026-11-19 refreshed Runner / Coach / Referee QA — run #432

- Run: [#432 / 44566620323](https://github.com/tinytime/Tinytime.github.io/actions/runs/44566620323)
- Browser job: `135710025332`; artifact: `14550224509` (`vapor-city-browser-qa`)
- Exact tested source commit: `52f286912bf6fa44219972520211bc13d6f3ef7a`.
- The artifact was downloaded and inspected. All 12 native 64×96 Runner/Coach/Referee directional images were reviewed at enlarged scale, along with role-debug, full gallery, Granny comparison, town screenshot and report.
- Targeted QA passed: syntax/module/inventory; vector palette; body/baseline/contrast; 23/23 face distinctness; role-debug 12/12; directional visual integrity 92/92 with zero edge contacts and zero detached large components; prop audit; silhouette-quality 180/180; gallery and town regression. PageErrors 0 and scriptErrors 0.
- Run #431 had caught a single top-edge pixel contact on Runner's two profile curl crowns. A small vertical adjustment in commit `52f2869` clears the edge; run #432 confirms the correction.
- The overall workflow remains **FAILED** on the separate global Clinic/Sailor front type-silhouette overlap IoU 0.909429 (>0.90), explicitly unapproved golden snapshots (23 changed, 1 match), and 180 missing-audio resource 404s. The separate silhouette-quality audit passes. No golden snapshots were refreshed or approved.
- The standard 16-NPC town capture does not explicitly spawn Runner, Coach or Referee; it is scene-regression evidence only, not character-specific live-town proof.
- **Status:** Runner, Coach and Referee have fresh targeted internal QA and visual inspection, but all remain **NOT APPROVED** pending refreshed Claude comparative review and explicit owner acceptance. See the [updated review brief](CLAUDE-RUNNER-COACH-REFEREE-REVIEW.md) and [run #432 package index](qa-artifacts/runner-coach-referee-run-429/README.md).


## Run #436 — owner-feedback profile correction verification (2026-11-19)

- Tested renderer/source: `b15d14fd9c6604c7ee232adf47d44a5d328054b3` (run #436, run ID `44570917085`, job `135725393768`). Artifact `14553029329` (`vapor-city-browser-qa`); [GitHub Actions run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570917085).
- Actual native directional evidence: all 12 PNGs in `npc-type-directions/` are 64×96 (Runner, Coach, Referee × front/back/left/right). Enlarged 4× sheet and separately downsampled 28×42 visual check were inspected locally from these captures. The artifact itself does not contain separate browser-captured 28×42 character PNGs; record the 28×42 check as a derived resampling, not a native game-scene capture.
- **Runner:** both profiles now show two distinct stride legs and two feet; the duplicate third-leg underlayer is gone at native and derived 28×42 scale.
- **Coach:** side head and torso read as a side view rather than the front body underneath a turned head. Clipboard is in front of the arm/hand and remains legible; hand/board contact is visible. The follow-up torso narrowing from `b15d14f` is present in the tested source.
- **Referee:** raised card arm/card are on the forward/face side in both left and right profiles; no longer emerge from behind the body.
- Targeted checks: syntax/module/inventory pass; palette and body checks pass; role-debug 12/12; directional integrity 92/92, zero edge contacts and zero detached large components; prop audit passes; silhouette-quality 180/180; gallery visual pass; town scene pass (16 NPCs, Granny present); page errors 0 and script errors 0.
- Overall workflow remains failed on unrelated/global checks: civilian type silhouette audit max IoU `0.9094292803970223` (Clinic/Sailor overlap); golden snapshot comparison 23 changed / 1 match, with no baseline refresh or approval; existing audio resource 404 console errors. No snapshots were refreshed or approved.
- The QA report has no character-specific town spawn/capture for Runner/Coach/Referee; town screenshot is regression context only. Granny comparison remains a separate reference check.
- **Internal visual verdict:** all three owner-reported profile defects are corrected in the run #436 native renders. This is not independent Claude review or owner approval. Runner/Coach/Referee remain NOT APPROVED pending Claude's comparative review and owner decision. Keep remaining 20 civilians on hold.


## Run #437 — refreshed Runner / Coach / Referee renders after final polish (2026-11-19)

- **Exact renderer source:** `4aee0893d41c2c67de560d9d494b7ba7639685f9` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/4aee0893d41c2c67de560d9d494b7ba7639685f9), “Refine Runner and Coach profile faces and Coach whistle”.
- **Browser QA:** [run #437 / 44572590664](https://github.com/tinytime/Tinytime.github.io/actions/runs/44572590664), job `135731400814`; artifact `vapor-city-browser-qa`, ID `14555840087`.
- The run tested the exact current branch head. Artifact downloaded; all 12 native 64×96 PNGs (Runner, Coach, Referee × front/back/left/right) inspected, enlarged 6× nearest-neighbour sheets created, and derived 28×42 game-scale resamplings inspected. Also inspected role-debug sheet, full 23-civilian 4× gallery, Granny comparison, town screenshot and `report.json`.
- **Latest polish visible:** Runner's side-profile nose/mouth are more deliberate and the cheek flecks that could read as stubble are removed; Coach's angled whistle chamber now has a distinct dark mouthpiece opening in front and profiles; Coach's profile face has a clearer single-eye / ear / projecting-nose / jaw construction with less cheek clutter. Referee remains consistent with the previously corrected forward-side card arm.
- **Visual result:** all three characters render in all four directions at native size; no crop-edge contacts or detached large components in any of the 92 directional captures. Runner retains two distinct stride legs/feet and readable bib/stopwatch; Coach's profile head reads as a true side silhouette, narrow single-plane torso, visible hand-to-clipboard contact and clear whistle; Referee's card remains on the forward/face side in both profiles and readable at derived game scale. No character-specific clipping found.
- **Targeted automated checks:** syntax/module/inventory pass (135 NPCs / 24 civilian mappings); six-vector palette audit pass; body/baseline pass (35px target, max deviation 0.4375px, max baseline delta 1); face distinctness 23/23 at native and 28×42; role-debug 12/12 (front/right across six vector civilians); visual integrity 92/92 with zero edge contacts and zero detached large components; prop audit pass; separate silhouette-quality 180/180; gallery pass; town regression pass (street map, 16 NPCs, Granny present); pageErrors 0; scriptErrors 0.
- **Overall workflow remains FAILED** for independent/global gates: full 23-civilian type-silhouette audit flags Clinic/Sailor front IoU 0.909429 (>0.90), with Coach/Courier back at 0.890479; golden snapshots remain explicitly unapproved (23 changed, 1 match); 180 missing-audio resource 404 console errors. The separate archetype silhouette-quality audit passes 180/180. No snapshots were refreshed or approved.
- **Town limitation:** the standard street scene does not explicitly spawn Runner, Coach or Referee; it is regression evidence only, not character-specific live-town proof.
- **Status:** refreshed targeted internal QA and visual inspection **PASS** for Runner, Coach and Referee. This is not Claude's independent review or owner approval. All three remain **NOT APPROVED** pending updated Claude comparative review and explicit owner acceptance. Remaining 20 civilians stay on hold.
- Review image package: [run #437 evidence index](qa-artifacts/runner-coach-referee-run-437/README.md).


## Run #441 — initial direct in-game-scale capture implementation (2026-11-19; superseded by run #442)

- **Exact source commit:** `8eeca34ae10a1d829f5035d72b57989bffb9e6e0` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/8eeca34ae10a1d829f5035d72b57989bffb9e6e0).
- **Browser QA:** [run #441 / 44577303597](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577303597), job `135748177849`; artifact ID `14558375062`.
- **QA harness change:** added a dedicated `npcRenderGameScaleSnapshots` hook. It calls the actual live `owCiv` vector renderer afresh with the town's `OWT=36` and vector scale `0.28`, writing 28×42 transparent PNGs directly. It does **not** resize or derive these files from the 64×96 QA snapshots. The harness asserts the exact capture method and all 12 expected character/direction combinations.
- **Capture verification:** artifact contains Runner, Coach and Referee × front/back/left/right: 12 PNGs at exactly 28×42, plus all 12 native 64×96 direction captures. I inspected both full contact sheets and all directions. No character-specific crop-edge clipping was found. At game scale, Runner's bib/stride and shoe separation remain legible; Coach's profile face, clipboard/hand, uniform and whistle placement remain coherent; Referee's raised card remains readable and correctly forward-facing in both profiles.
- **Initial gate result:** the 12 direct game-scale PNGs were present at 28×42, but the capture audit's data-URL MIME-prefix check was too strict and reported FAIL. The validator was corrected and the successful 12/12 gate is recorded in run #442. Other targeted checks; role-debug 12/12 PASS; directional integrity 92/92 PASS with zero edge contacts or detached large components; face-distinctness audit 23/23 PASS (note: the all-civilian 28×42 face-signature sub-audit still derives its images from native snapshots; direct game-scale PNGs are currently captured for Runner/Coach/Referee only); prop audit PASS; archetype silhouette-quality 180/180 PASS; gallery and town regression PASS; town has 16 NPCs and Granny present; page errors 0 and script errors 0.
- **Overall workflow FAILED** on pre-existing/global gates: the 23-civilian type-silhouette audit still fails at Clinic/Sailor front IoU `0.9094292803970223` (threshold `<0.90`); golden snapshots remain explicitly unapproved (23 changed / 1 match), and no golden snapshots were refreshed or approved; 180 audio resource 404 console errors remain. These do not invalidate the targeted direct-capture audit, but they prevent an overall green QA result.
- **Status:** QA harness implementation and direct game-scale evidence are verified. Internal visual QA for Runner/Coach/Referee passes on this run. This is not Claude's independent review or owner approval. Keep all three NOT APPROVED pending Claude comparative review and owner decision; remaining 20 civilians stay on hold.

## Run #442 — direct game-scale capture gate verified (2026-11-19)

- **Exact source commit:** `9d7e66ba9667a555c4b42c65d5910a2ea08cc055` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/9d7e66ba9667a555c4b42c65d5910a2ea08cc055).
- **Browser QA:** [run #442 / 44577766543](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577766543), job `135749839135`; artifact ID `14558375601`.
- The direct game-scale hook invokes the actual `owCiv` renderer with town `OWT=36` and vector scale `0.28`, producing 12 fresh 28×42 PNGs (Runner, Coach, Referee × front/back/left/right). It does not resize the 64×96 QA images. The run #442 audit confirms 12/12 dimensions, method and unique character/direction combinations. The all-civilian face-signature sub-audit still derives its 28×42 signature images from native snapshots; direct captures in this package cover these three target characters.
- **Internal visual inspection:** all 12 direct 28×42 images, all 12 native 64×96 images, role-debug sheet, full gallery and town regression screenshot inspected. Runner's two-leg stride, bib and shoe separation remain readable; profile face cleanup remains visible. Coach's single-eye profile face, projecting nose/jaw, narrow side torso, clipboard/hand contact and dark whistle mouthpiece remain coherent. Referee's raised card remains forward-facing and readable in both profiles. No character-specific crop-edge clipping or detached large components found.
- **Targeted QA PASS:** syntax/module checks; direct game-scale capture 12/12; role-debug 12/12; directional integrity 92/92; face distinctness 23/23 (with the derivation caveat above); prop audit; archetype silhouette-quality 180/180; gallery and town regression (street, 16 NPCs, Granny present); page errors 0 and script errors 0.
- **Overall workflow FAILED** on the unchanged global gates: Clinic/Sailor front silhouette IoU `0.9094292803970223` exceeds `<0.90`; golden snapshots 23 changed / 1 match and remain unapproved (no refresh or approval); 180 missing-audio 404 console errors. The full civilian silhouette audit is separate from the archetype silhouette-quality 180/180 check, which passes.
- **Review package:** [run #442 evidence index](qa-artifacts/runner-coach-referee-run-442/README.md); artifact [14558375601](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577766543/artifacts/14558375601).
- **Status:** targeted internal QA and visual inspection PASS. This is not Claude's independent review or owner approval. Runner, Coach and Referee remain **NOT APPROVED** pending Claude comparative review and owner decision. Remaining 20 civilians stay on hold.
 

## Runner / Coach / Referee — Claude review package prepared (2026-11-19)

- Review package: [run #441 Claude review brief and evidence index](../qa-artifacts/runner-coach-referee-run-441/README.md).
- Exact renderer source: `8eeca34ae10a1d829f5035d72b57989bffb9e6e0`.
- Primary evidence: [GitHub Actions run #441](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577303597), artifact ID `14558375062`.
- The artifact contains 12 native 64×96 direction PNGs and 12 direct `owCiv` 28×42 renders at live `OWT=36` / vector scale `0.28`, plus role-debug, gallery, Granny comparison, town regression and report evidence. The direct 28×42 files are actual fresh renderer captures, not resampled native images.
- **Audit clarification:** run #441's initial direct-capture audit falsely failed because its data-URL MIME-prefix check was too strict, although all 12 PNGs were present. The validator was corrected in follow-up QA #442. Do not report the initial run #441 capture-audit assertion as a pass. The images were independently inspected visually.
- Run #441 targeted checks otherwise include role-debug 12/12, directional integrity 92/92 with zero edge contacts/detached components, prop audit, silhouette-quality 180/180, gallery/town regression, and zero page/script errors. Face-distinctness 23/23 passes; its all-civilian game-scale signature check still uses derived images, while direct 28×42 captures are currently only present for Runner/Coach/Referee.
- Overall workflow remains failed on global Clinic/Sailor front IoU `0.9094292803970223`, explicitly unapproved golden snapshots (23 changed / 1 match), and 180 audio 404s. No snapshots were refreshed or approved.
- Claude's brief requests separate scores/verdicts, mandatory corrections versus optional polish, Granny-quality comparison without imitation, and an overall batch verdict.
- **Status:** package prepared in GitHub; it has not been sent to Claude through an external channel. Runner, Coach and Referee remain NOT APPROVED until Claude review and owner acceptance. Remaining 20 stay on hold.


## Run #444 — owner-requested side-profile and Runner leg corrections (2026-11-19)

- **Exact renderer source:** `21481ee1768e80595cfdb13f6e338f57c10d076c` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/21481ee1768e80595cfdb13f6e338f57c10d076c).
- **Browser QA:** [run #444](https://github.com/tinytime/Tinytime.github.io/actions/runs/44579787401), run ID `44579787401`, job `135756996215`; artifact ID `14558936072`.
- **Owner feedback:** side profiles of all three characters should not show two arms; Runner's legs looked unusually angular and trouser-like.
- **Changes:** Runner, Coach and Referee now hide the far arm in side views while retaining the defining near arm (Runner stopwatch, Coach clipboard, Referee raised card). Runner's leg geometry now uses curved contours, shorts ending above the knees, and exposed lower-leg skin across front/back/side directions.
- **Animation clarification:** the current Runner vector draw path is a static pose per direction; the old leg geometry was not an animation frame that would normalize automatically.
- **Artifact inspection:** all 12 native 64×96 and all 12 direct 28×42 renders inspected. One visible arm in each side profile; Runner's shorts/calf separation and two-leg stride read more clearly at both scales. No crop-edge clipping or detached large components.
- **Targeted QA PASS:** syntax and NPC module checks; direct game-scale capture 12/12; role-debug 12/12; civilian visual integrity 92/92 with zero edge contacts/detached components; face distinctness 23/23 at native and game scale; palette/body checks; prop audit; archetype silhouette quality 180/180; gallery visual check; town regression (16 NPCs, Granny present); page errors 0 and script errors 0.
- **Overall workflow FAILED** on the unchanged global gates: Clinic/Sailor front silhouette IoU `0.9094292803970223`; unapproved golden snapshots (23 changed / 1 match); 180 missing-audio 404s. No snapshots were refreshed or approved.
- **Updated Claude package:** [run #444 review brief and evidence index](../qa-artifacts/runner-coach-referee-run-444/README.md).
- **Status:** owner-requested corrections implemented and targeted internal QA/visual inspection PASS. Not Claude-reviewed or owner-approved. All three remain NOT APPROVED; remaining 20 stay on hold.


## Owner follow-up verification — run #446 (2026-11-19)

- Tested source: `fafb991d3ce94ffa491179a84ecb63c10934b0e0`.
- Run: [#446 / 44581720083](https://github.com/tinytime/Tinytime.github.io/actions/runs/44581720083); job `135762041794`; artifact `14559965367`.
- Actual 64×96 native directional renders and direct 28×42 game-scale captures inspected for Runner, Coach and Referee (12 of each size). Coach's side torso now has more rear volume; the whistle/lanyard is shifted toward the front in both profiles. Runner's trailing shorts end at the knee and the calf is exposed; the running stride remains distinct. Referee is unchanged per owner feedback.
- Targeted checks pass: syntax/module, 12/12 direct game-scale captures, role-debug 12/12, visual integrity 92/92 with zero edge contacts/detached components, 23/23 face distinctness, palette, body/baseline, props, silhouette-quality 180/180, gallery and town regression. No page or script errors.
- Overall workflow remains **FAILED** on global Clinic/Sailor front silhouette IoU `0.9094292803970223`, unapproved golden snapshots (23 changed / 1 match), and 180 missing-audio 404 console errors. No golden snapshots were refreshed or approved.
- Review package: [Runner / Coach / Referee run #446](../qa-artifacts/runner-coach-referee-run-446/README.md).
- Internal targeted QA and visual inspection are not Claude review or owner approval. All three remain NOT APPROVED pending independent comparative review and explicit owner acceptance; remaining 20 remain on hold.


## Run #452 — latest Runner side-profile verification

- Source commit `4eafc657fa9ee15db3b70f3c64a76280d4add0a6`; [run #452](https://github.com/tinytime/Tinytime.github.io/actions/runs/44587406698), artifact `14562025835`.
- Inspected fresh Runner native 64×96 front/back/left/right and direct 28×42 game-scale captures. Side torso front hem is narrowed; collar and bib remain aligned to the forward chest plane in both mirrored profiles. Front design unchanged.
- Targeted checks pass: direct captures 12/12; role-debug 12/12; directional integrity 92/92; silhouette-quality 180/180; palette/body/prop; gallery; town scene (16 NPCs, Granny present); page/script errors 0.
- Workflow overall FAILED on global Clinic/Sailor silhouette overlap (max IoU `0.9094292803970223`), unapproved golden snapshots (23 changed / 1 match), and 180 audio 404s. No snapshot refresh or approval performed.
- Claude comparative review and owner acceptance remain outstanding. All three remain NOT APPROVED.


## Run #457 — six-civilian polish QA (2026-11-19)

- **Exact renderer source:** `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0), “Compress Cook toque crown to clear sprite edge”.
- **Browser QA:** [run #457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167), artifact `14563778383`.
- **Changes in the tested renderer:** larger eye shapes/catchlights are retained across the vector civilians; Cook's side pan is angled to show its opening; Courier's forward lean is retained; Runner's far trailing leg and lifted rear shoe are layered behind the near leg; Cook's toque crown is compressed vertically to create top-edge headroom while preserving the band.
- **Visual inspection:** all 24 native 64×96 directional captures for Usher, Cook, Courier, Runner, Coach and Referee were assembled and inspected. Runner's mirrored side views read as a two-foot stride, not a third foot. Cook's toque no longer contacts the top edge in the four views. Direct 28×42 captures for Runner/Coach/Referee (12/12) and the full gallery, town and Granny comparison captures were also inspected.
- **Targeted checks passed:** syntax/module load; inventory (135 NPCs / 24 civilian mappings); palette; face distinctness (23/23 at native and game scale); directional visual integrity (92/92, zero edge contacts and zero detached large components); role-debug (12/12); prop audit; archetype silhouette quality (180/180); gallery; town regression (street map, 16 NPCs, Granny present); Granny directional comparison. Page errors 0; script errors 0.
- **Remaining failed gates:** NPC body audit reports failed (Cook's measured body height is now exactly 35px; Courier's baseline delta remains 2px); global civilian-type silhouette audit still fails, led by Clinic/Sailor front IoU `0.9094292803970223`; golden snapshots remain unapproved (23 changed / 1 match); 180 missing-audio 404 console errors. Overall workflow remains **FAILED**. No golden snapshots were refreshed or approved.
- **Status:** this run verifies the requested visual polish and targeted visual-integrity gate, but does not make Runner/Coach/Referee approved. The six-civilian comparative review remains open with Claude; owner approval is still required for the second batch. Remaining 20 civilians stay on hold.


## Run #457 — combined six-civilian polish verification (2026-11-19)

- **Exact source:** `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0).
- **Run:** [GitHub Actions #457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167), job `135800700792`, artifact `14563778383`.
- **Evidence inspected:** all 24 native 64×96 images for Usher, Cook, Courier, Runner, Coach and Referee (front/back/left/right); 12 direct 28×42 game-scale captures for Runner/Coach/Referee; role-debug, Granny comparison, gallery, town regression and `report.json`.
- **Source reconciliation:** all requested eye catchlights, Courier forward lean, Cook pan/toque geometry and Runner stride paths were already in the renderer source tested by run #453. Final source removes the accidental duplicate Runner leg draw, restores Cook's prior eye treatment, and compresses the Cook toque crown vertically (anchored at its lower edge) to create transparent headroom. This keeps the hat band and body baseline in place.
- **Visual result:** Cook toque has transparent headroom in all four directions. Runner side stride reads as two legs and two feet, with exactly one trailing-leg draw. All six characters' native views inspected. No new detached components or edge clipping.
- **Targeted checks PASS:** syntax/module/inventory; palette; face distinctness 23/23; direct game-scale capture 12/12; role-debug 12/12; directional visual integrity 92/92 with zero edge contacts and zero detached components; props; silhouette-quality 180/180; gallery; town regression (street map, 16 NPCs, Granny present); page errors 0; script errors 0.
- **Targeted/global checks still FAIL:** NPC body/baseline audit flags Courier baseline delta 2 against the vector threshold of 1. Global civilian type-silhouette audit flags Clinic/Sailor front IoU `0.9094292803970223`. Golden snapshots remain explicitly unapproved (23 changed / 1 match); 180 missing-audio 404 console errors remain. No snapshots were refreshed or approved.
- **Status:** targeted visual integrity and requested polish verified; overall workflow FAILED on the above gates. The first batch retains owner approval; Runner/Coach/Referee remain NOT APPROVED pending Claude's independent six-civilian review and owner approval. Remaining 20 remain ON HOLD.
- Updated [Claude's full six-civilian review package](../qa-artifacts/six-civilian-full-review/README.md) with the exact source and artifact links.


## Five-civilian Claude review package — owner scope update (2026-11-19)

Claude reached its usage limit during the six-character review. The owner therefore reduced the review scope to **Usher, Cook, Courier, Coach and Referee**. Runner is excluded only from this review to reduce scope; it is not deleted, rejected or approved. Coach and Referee retain two distinct athletic-role examples, while the five still cover civic, vendor, courier and athletic design families. Runner remains built and awaits a later focused review.

The new [five-civilian Claude package](../qa-artifacts/five-civilian-full-review/README.md) replaces the six-character package as the current handoff. It explicitly supplies the exact tested `npc_sprites.js` source at `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`, the raw source URL, run #457 QA artifact, five-character image scope, review criteria, and a detailed required deliverable for the reusable Civilian Vector Build Standard. Claude must return five individual scores/verdicts, ranked corrections, a comparative ranking and an actionable production rule set to reduce future iteration without using a generic body template.

No character code changed for this scope update. Existing approvals and QA status are unchanged. Coach and Referee remain NOT APPROVED; Runner remains NOT APPROVED but out of scope for this pass; the remaining 20 remain ON HOLD. No golden snapshots were refreshed or approved. The new package is committed to GitHub but has not been sent externally to Claude.

## Five-civilian Claude correction pass — 2026-11-19

Owner authorization: reopen Usher, Cook and Courier despite their prior owner approval, and implement the corrections recommended for all five reviewed civilians (Usher, Cook, Courier, Coach, Referee). Prior approvals are historical; the revised versions are not currently approved. Runner is excluded from this pass; remaining 20 stay on hold.

Renderer implementation commit: [027be47d8f6763f447992a9dec058ff62a7c60a3](https://github.com/tinytime/Tinytime.github.io/commit/027be47d8f6763f447992a9dec058ff62a7c60a3).

Changes in that commit:
- Cook: lifted front/profile toque band to clear the eye area; added profile ear/mouth marks; removed the far profile arm so the pan-holding arm is the single visible arm.
- Courier: removed the -0.035 rad front/back whole-sprite rotation responsible for the native baseline delta.
- Coach: shortened the cream yoke in front/back/profile; made silver temple and rear profile hair visible; moved profile whistle away from the clipboard; replaced font-dependent VC lettering with path strokes.
- Referee: restricted the broad base torso to front/back so it no longer leaks beneath the side-specific torso; added rear hair/nape detail to the profile.
- Usher: changed the profile clipboard from the brown board back to the paper face with clip/details.

**Not yet verified:** no browser QA has run against this commit and no new render artifacts have been visually inspected. Run #457 remains evidence for prior source 5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0, not this correction commit. The overall run #457 failure gates remain known: Courier baseline delta (the targeted correction aims to clear it), Clinic/Sailor global silhouette overlap, unapproved golden snapshots, and missing-audio 404s. Do not refresh or approve golden snapshots.

Next QA must render all five characters in front/back/left/right at native 64×96 and enlarged scale; include direct 28×42 captures for all five if the harness supports them, plus role-debug, gallery, town regression and Granny comparisons. Verify Courier baseline, Referee side torso width/leakage, Cook eye visibility, Coach hair/yoke/whistle and deterministic back mark, and Usher clipboard identity. Inspect actual screenshots before recording a visual verdict. Keep all five in revision / NOT APPROVED status pending QA, Claude re-review, and owner acceptance.
## Follow-up finish pass — 2026-11-19

Renderer commit: [23c792f7e83eb14ff7d48e197678272f1c3e58b0](https://github.com/tinytime/Tinytime.github.io/commit/23c792f7e83eb14ff7d48e197678272f1c3e58b0).

Added restrained warm/cool rim-light accents to Coach and Referee, matching the established light treatment already present on Usher, Cook and Courier. The accents are limited to face/shoulder contours and intentionally avoid tracing the clipboard, whistle or yellow card.

This is a source-only finish refinement. It has not yet been browser-tested or visually inspected. All five characters remain in revision / NOT APPROVED status; Runner remains excluded from this review round and the remaining 20 civilians stay on hold. No golden snapshots were changed.

## Run #459 — five-civilian correction source QA (2026-11-19)

- Exact renderer tested: `23c792f7e83eb14ff7d48e197678272f1c3e58b0` ([commit](https://github.com/tinytime/Tinytime.github.io/commit/23c792f7e83eb14ff7d48e197678272f1c3e58b0)).
- [GitHub Actions run #459](https://github.com/tinytime/Tinytime.github.io/actions/runs/44599635463), job `135827201638`; [artifact `14568035039`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44599635463/artifacts/14568035039).
- The run produced 92 native 64×96 directional captures (23 civilians × four directions), including Usher, Cook, Courier, Coach and Referee. Direct 28×42 capture remains 12/12 for Runner, Coach and Referee only; Usher, Cook and Courier are not included in that direct game-scale set.
- Automated targeted checks pass: syntax/module/inventory; vector/legacy palette checks; face distinctness; 92/92 directional integrity with zero edge contacts and detached large components; role-debug 12/12; prop audit; gallery; page errors 0; script errors 0. The 12 direct game-scale captures pass their dimensions/method assertion.
- Overall workflow FAILED on the full civilian type-silhouette audit (max rendered IoU `0.9094292803970223`, Clinic/Sailor front; Coach/Courier back `0.8939319190922546`) and golden snapshots (23 changed / 1 match; baseline explicitly unapproved). Console logs record 180 missing-audio 404s. No golden snapshots refreshed or approved.
- **Evidence boundary:** Actions logs and the JSON report were inspected. PNGs in artifact `14568035039` have not yet been visually inspected. Do not record visual pass, Claude review or owner approval from automated checks alone.
- Next: visually inspect the five characters' native four-direction captures and enlarged views, extend direct 28×42 captures to Usher/Cook/Courier if the harness is adapted, resolve or explicitly disposition the global silhouette gate, then prepare the updated artifact for Claude. Keep all five NOT APPROVED and the remaining 20 ON HOLD.


## Five-civilian evidence packaging automation — 2026-11-19

Added `qa/build-five-civilian-review-sheet.mjs` and wired it into `.github/workflows/vapor-city-browser-qa.yml`. After the browser diagnostics step (including failed runs), the workflow now creates a labelled 4× native directional contact sheet for Usher, Cook, Courier, Coach and Referee, plus a machine-readable-check summary Markdown file. The contact sheet is assembled from the actual native 64×96 captures; it does not modify renderer code, test thresholds or golden snapshots. The summary explicitly distinguishes automated evidence from human visual approval.

- Generator commit: [`1f5ffa09189ea20e3d7a6c96a9d7118d72ed22bc`](https://github.com/tinytime/Tinytime.github.io/commit/1f5ffa09189ea20e3d7a6c96a9d7118d72ed22bc).
- Workflow integration commit: [`80bac03d1ee2eb99ff6be9c73bee9d04dcc67b3f`](https://github.com/tinytime/Tinytime.github.io/commit/80bac03d1ee2eb99ff6be9c73bee9d04dcc67b3f).
- Fresh Actions run #461 was triggered by the workflow update and is pending at the time of this note. Its artifact must be checked before claiming the new sheet generator works.


## Run #461 — review-sheet workflow integration verified (2026-11-19)

- Workflow commit tested: `80bac03d1ee2eb99ff6be9c73bee9d04dcc67b3f`; current branch head at handoff: `ce0c63dc71b595c87f899e44d487f5f139a2f085`.
- [GitHub Actions run #461](https://github.com/tinytime/Tinytime.github.io/actions/runs/44600405554), run ID `44600405554`, job `135829961792`; [artifact `14566568903`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44600405554/artifacts/14566568903), 7,178,358 bytes.
- Step results: Chromium install PASS; browser diagnostics FAILED; five-civilian review sheet and summary generation PASS; artifact upload PASS (249 files). The contact-sheet generator therefore completed successfully on its first integrated run.
- The run tested workflow packaging, not a new renderer revision; renderer source remains `23c792f7e83eb14ff7d48e197678272f1c3e58b0` as tested by run #459.
- The generator expects and packages 20 native 64×96 images (five civilians × four directions) enlarged 4×. Direct 28×42 captures remain only the existing 12 for Runner/Coach/Referee; no direct game-scale capture has yet been added for Usher/Cook/Courier.
- The Actions log confirms the diagnostics job still fails. Existing report failures remain global civilian-type silhouette overlap and unapproved golden snapshots; 180 audio 404s remain. No snapshots were refreshed or approved.
- **Visual evidence boundary:** the artifact is available, but the PNGs have not been human-visually inspected in this pass. Contact-sheet generation is not a visual verdict. All five remain NOT APPROVED; Runner remains outside this review round; remaining 20 remain ON HOLD.


## Five-civilian game-scale coverage expansion — 2026-11-19

Commit `c1d8d75aceeef0c9a689c2f8c40ae88909c55ada` expands `npcRenderGameScaleSnapshots()` from 12 captures (Runner/Coach/Referee) to 20 direct `owCiv` captures for Usher, Cook, Courier, Coach and Referee, four directions each, at 28×42. The QA audit now asserts all 20 unique pairs and all five names explicitly. Verified by [run #463](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178): `gameScaleNpcCaptureAudit` passed 20/20 with the explicit direct `owCiv` render method and all five names × four directions. [Artifact `14568093189`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178/artifacts/14568093189) contains 20 native captures, 20 direct game-scale captures, contact sheet, summary, and report. The workflow still fails on the global civilian silhouette audit and unapproved golden snapshot gate; page/script errors are zero. Do not equate the 20/20 capture pass with visual approval.


## Paired native and game-scale review sheets — run #464

The review-sheet generator now packages two separate contact sheets: `five-civilian-native-4x-contact-sheet.png` from native 64×96 captures, and `five-civilian-game-scale-4x-contact-sheet.png` from direct 28×42 `owCiv` captures (4× nearest-neighbour enlargement for inspection). [Run #464](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571) verified 20/20 native and 20/20 direct game-scale captures, with no missing images, and uploaded [artifact `14568746641`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571/artifacts/14568746641). The workflow still fails on the global silhouette and golden snapshot gates; the paired sheets are evidence aids, not approval. Human visual inspection remains outstanding.


## Runs #463–#464 — direct game-scale evidence and internal visual QA (2026-11-19)

The five-character QA set now has complete, independently inspectable native and direct game-scale evidence.

- Implementation commit c1d8d75aceeef0c9a689c2f8c40ae88909c55ada expands the live renderer hook to Usher, Cook, Courier, Coach and Referee, four directions each. Each 28×42 PNG is a direct `owCiv` render at live OWT=36 / vector scale 0.28, not a resize.
- Run #463 (https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178) confirmed 20/20 unique civilian/direction pairs.
- Generator commit 2b21457cb4faaa5d993c46d696df3d3aca07f87a adds a second 4× nearest-neighbour contact sheet built from direct 28×42 PNGs, separate from the 64×96 native sheet.
- Run #464 (https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571) uploaded artifact 14568746641. Both sheets and summary were verified in the artifact. Report: native 20/20, direct game-scale 20/20, directional integrity 92/92, role debug 12/12, prop audit pass, gallery pass, page errors 0, script errors 0.
- ChatGPT visually inspected the native contact sheet, direct game-scale contact sheet and town screenshot. No obvious clipping or detached components were seen. Usher clipboard, Cook toque/pan, Courier bag/parcel/strap, Coach age cues/profile hair/whistle, and Referee yellow card persist across directions. At game scale, major silhouettes and signature props remain distinguishable while fine facial detail compresses. This is internal QA, not Claude's independent review or owner approval.

**Remaining gates:** overall run #464 is still FAILED because the full-roster civilian silhouette gate reports max rendered IoU 0.9094292803970223 (Clinic/Sailor front; Coach/Courier back 0.8939319190922546) and the golden snapshot baseline remains unapproved (1 match / 23 changed). Missing-audio 404s remain in the console, but there are no page/script exceptions. Do not lower thresholds or update/approve snapshots without owner authorization. The global silhouette issue needs separate disposition. All five remain NOT APPROVED pending Claude re-review and owner decision; Runner is excluded; remaining 20 are ON HOLD.


## Civilian Vector Construction Standard — draft and calibration plan (2026-11-19)

The owner authorized creation of [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md). It records Granny's measured reference geometry and proposes proportion metrics, an eight-stage design pipeline, a 100-point internal scorecard, and automated measurement candidates. All newly proposed ranges, weights, floors, and scoring bands are provisional. They must not be introduced as hard-fail gates until calibrated against Granny and the five-character review set using consistent measurement masks and pose categories.

No golden snapshots, existing thresholds, renderer code, or NPC scope policy were changed. Existing approval gates remain in force. Latest recorded review evidence: run #464 confirms native 20/20 and direct game-scale 20/20 captures, directional integrity 92/92, role-debug 12/12, prop audit and gallery pass; the overall workflow remains failed on global silhouette overlap and unapproved golden snapshots. Missing-audio 404s remain, with zero page/script exceptions. The five candidates remain NOT APPROVED pending Claude review and owner decision; Runner remains outside this review round; the remaining 20 are ON HOLD.

## Claude re-review package prepared — five civilians (2026-11-19)

Created `qa-artifacts/five-civilian-full-review/CLAUDE-REVIEW-BRIEF.md`. It packages the exact renderer revision, run #464, artifact 14568746641, all 20 native and 20 direct game-scale captures, Granny comparison assets, review criteria, known correction targets, and explicit global QA caveats. The package is ready for independent review, but **Claude has not yet reviewed these corrected versions**. All five remain NOT APPROVED pending that review and owner decision. No golden snapshots were changed.


## Six-civilian construction-standard application — 2026-11-19

See [Six-Civilian Construction Standard Audit](SIX-CIVILIAN-CONSTRUCTION-AUDIT.md). The audit applies the draft standard to all six dedicated vector renderers: Usher, Cook, Courier, Runner, Coach and Referee. It uses run #464's native 64×96 captures and body/baseline report, plus direct 28×42 captures from run #464 for five and run #457 for Runner. The Runner renderer path is unchanged between the run #457 and current five-character renderer sources.

Verified run #464 results for the six: body/height/baseline check PASS (maximum height deviation 0.4375 px; maximum baseline delta 1 px); directional integrity 92/92; face distinctness 23/23; role-debug 12/12; prop audit and gallery PASS; page/script errors 0. The workflow remains FAILED on the global civilian silhouette gate (Clinic/Sailor front IoU 0.9094292803970223) and unapproved golden snapshots (23 changed / 1 match); missing-audio 404 console errors remain. No golden snapshots were refreshed or approved.

The audit deliberately does not infer head/body or torso/body ratios from the current QA render envelope. A consistent body-only mask and semantic landmarks excluding headwear/accessories/props must be implemented and calibrated against qa/granny-ref.json before numeric proportion bands can be assessed. Runner requires pose-aware joint landmarks. The internal construction audit covers all six, while the active Claude review remains five as previously directed. No character approval or remaining-roster release is implied.


## Semantic proportion measurement framework — 2026-11-19

Implemented the first measurement layer:

- `qa/civilian-anatomy-landmarks.json` defines the shared source-space manifest and per-direction semantic annotation requirements.
- `qa/civilian-proportion-measurements.mjs` validates complete records and computes the descriptive ratios.
- `qa/test-civilian-proportion-measurements.mjs` tests standing calculations, dynamic Runner joint requirements, incomplete directions, and pending reports.
- The browser workflow runs these checks and writes `qa-output/civilian-proportion-measurements.json` for artifact upload.

Granny remains a separate legacy reference measurement (body 125, head 38, shoulders 36, foot row 136). The six character entries are intentionally pending manual landmark annotation. The existing `excludeProps` render option is not treated as a semantic anatomy mask because it does not independently exclude role headwear. Do not promote the legacy alpha envelope to anatomical ratios. No new ratio thresholds are enforced. Next task is to annotate all four directions from fresh native captures, verify body/headwear/prop masks visually, then compare the six with Granny and calibrate only after review.


## Semantic proportion measurement framework — 2026-11-19

The semantic measurement tool and fixture tests are included in the browser QA workflow before the game diagnostics:
- `node qa/test-civilian-proportion-measurements.mjs`
- `node qa/civilian-proportion-measurements.mjs --check`

The structural check requires exactly one Granny legacy reference and six pending NPC annotations. This is a framework-integrity check, not a character proportion pass. The generated report is `qa-output/civilian-proportion-measurements.json`; inspect it and the source annotations whenever records are added.

See [Semantic Civilian Anatomy Annotation Guide](../qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md). Current semantic annotation coverage is 0/6 NPCs: all six remain pending. Granny remains reference-only pending harmonization of her legacy mask convention. No proportion bands are enforced and no character is approved by this tooling.


**Annotation readiness update:** the six-character manifest now has explicit front/back/left/right annotation slots for every character. Source-space point and polygon bounds are validated against the 100×140 coordinate grid, and the structural check requires the exact six-character roster. Missing landmarks remain visibly pending; they are not synthesized from sprite bounds.


## Semantic proportion measurement framework — 2026-11-19

The semantic measurement tool and fixture tests are included in the browser QA workflow before game diagnostics:
- `node qa/test-civilian-proportion-measurements.mjs`
- `node qa/civilian-proportion-measurements.mjs --check`

The structural check requires exactly one Granny legacy reference and six pending NPC annotations. This is a framework-integrity check, not a character proportion pass. The generated report is `qa-output/civilian-proportion-measurements.json`; inspect it and the source annotations whenever records are added.

See [Semantic Civilian Anatomy Annotation Guide](../qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md). Current semantic annotation coverage is 0/6 NPCs: all six remain pending. Granny remains reference-only pending harmonization of her legacy mask convention. No proportion bands are enforced and no character is approved by this tooling.


## Semantic measurement implementation verification — run #481

[Run #481](https://github.com/tinytime/Tinytime.github.io/actions/runs/44608283710) tested semantic measurement engine commit `6a9793f1431b3b79bccc375b3ed09b5265859772`. The semantic measurement test and manifest validation step **PASSED**. This confirms the fixture calculations, source-bound polygon validation, dynamic Runner joint-only handling, Granny legacy-reference accounting, and six-NPC pending-scope manifest are structurally valid.

The full browser workflow still **FAILED** on the existing global civilian silhouette gate (max IoU 0.9094292803970223) and unapproved golden snapshots (1 match / 23 changed). The run also records missing audio-resource 404 console errors; page errors and script errors are empty. Directional integrity 92/92, direct game-scale capture assertion 20/20, role-debug 12/12, prop audit and gallery pass. Artifact: [14570697656](https://github.com/tinytime/Tinytime.github.io/actions/runs/44608283710/artifacts/14570697656).

This is a framework test pass, not semantic annotation coverage: the six characters remain pending human landmark annotation. No snapshots were refreshed or approved.


## Source-derived candidate annotation update — 2026-11-19

The six civilian records now contain first-pass source-derived candidate landmarks for front, back, left and right, based on the pinned `npc_sprites.js` draw paths at commit `8ac99ec8fd7eb7f2328eda7b7332d5e8f2d45317`. Candidate annotations include a coarse anatomical body polygon, headwear and prop exclusion polygons, head/chin/shoulder/pelvis/foot landmarks, and (for Runner) bilateral shoulder/elbow/wrist/hip/knee/ankle joints. The measurement report computes descriptive candidate ratios but labels these records `source_annotated`, not `measured`.

**Verification boundary:** these are manually transcribed source-geometry candidates, not pixel-traced/visually approved masks. The polygons are intentionally coarse and must be overlaid against fresh native 64×96 captures in all four directions; profile mirroring, hair/headwear boundaries, shoulder joints, prop exclusions, and Runner's stride joints require spot-check/correction before promoting any record to `measured` or using ratios for calibration. No proportion band is enforced, no renderer art changed, and no approval status changed.


## Semantic annotation QA update — 2026-11-19 (Run #517)

The six candidate annotation sets are structurally valid and are rendered over 24/24 native directional captures in [Run #517](https://github.com/tinytime/Tinytime.github.io/actions/runs/44613152087), artifact `14573916586`. Dedicated semantic tests passed (43 checks). The report remains at 0 verified measurements, 6 source-annotated candidates, 1 Granny legacy reference, and 6 pending visual verification; no thresholds are enforced. Referee's raised arm/hand is represented by separate appendage polygons, and profile shoulder landmarks permit only a one-source-unit vertical offset. Visual inspection finds the contours generally track the six native renders, but Cook's pan/handle, Courier's bag/parcel and Coach's clipboard exclusions remain coarse, and Runner's joint positions still need final anatomical review. Do not promote any record to `measured` or calibrate proportion bands yet.

Overall browser QA remains failed on the existing game-wide silhouette gate (max full-body IoU 0.909429; max torso-mask IoU 0.923077), unapproved golden snapshots (1 match / 23 changed), and 180 missing audio-file 404s. No renderer artwork or golden snapshots changed, and no character approval status changed. The remaining 17 civilians remain on hold.


## Direction-specific prop refinement — Run #522 (2026-11-19)

Run #522 ([artifact `14572968146`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44613594260/artifacts/14572968146)) regenerated and visually inspected all 24 candidate overlays. Cook's pan/handle exclusions are now distinct for front/back/side (back explicitly empty); Courier's parcels/satchel are direction-specific; Usher's clipboard bounds are direction-specific. This supersedes the earlier note that Cook and Courier still shared broad generic boxes. Coach's clipboard remains the broadest outstanding prop mask. All six records remain `source_annotated`, with 0 verified measurements and 6 pending visual verification. Semantic validation and overlay generation passed; overall browser QA still fails on the established global silhouette, unapproved golden snapshot, and audio 404 gates. No renderer artwork, golden snapshots, or approval states changed.


## Semantic annotation QA update — 2026-11-19 (Run #530)

[Run #530](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614186989) produced the latest six-civilian annotation overlay artifact `14573802446`. The overlay includes all 24/24 native directional captures (Usher, Cook, Courier, Runner, Coach, Referee); the measurement report remains 7 records total, 0 verified measurements, 6 source-annotated candidates, 1 Granny legacy reference and 6 pending visual verifications. Dedicated semantic tests and manifest validation passed. The overlay coordinate fit is now renderer-aware, including per-character vertical fit and left-facing mirroring. Referee's raised arm is represented as separate anatomical appendage polygons. Runner's race bib remains part of the singlet, with stopwatch-only prop exclusions and revised stride joints. Coach's clipboard/whistle masks are now direction-specific: front clipboard+whistle, rear empty, profile clipboard+whistle. Cook and Courier prop masks are likewise direction-specific.

Overall browser QA still fails on the existing game-wide silhouette gate (max full-body IoU 0.909429; max torso-mask IoU 0.923077), the unapproved golden snapshot baseline (1 match / 23 changed), and 180 audio-file 404s. Page errors and script errors are both 0. No renderer artwork, golden snapshots, proportion thresholds, or NPC approval states were changed. All six annotation sets remain candidates pending pixel-tight visual verification; do not calibrate ratios or promote to `measured` yet. Remaining 17 civilians stay on hold.


## Latest semantic annotation QA — Run #534 (2026-11-19)

- Run: [#534](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614783942); tested commit `5db307350e3e93db05d1145b1aeb9da3a7273b73`; artifact `14574047896`.
- Dedicated semantic measurement tests and manifest validation passed. Six-civilian overlay generation passed with 24/24 native 64×96 captures and no missing directions. Five-civilian review-sheet generation passed with 20/20 native and 20/20 direct 28×42 captures for the five-character review scope.
- The actual overlay was visually inspected. Candidate masks broadly track the rendered silhouettes, but remain coarse, manually transcribed source-space candidates. All six records remain `source_annotated`; Granny remains `reference_only`; measured count remains zero. Do not calibrate ratios or promote any record based only on structural validation or this broad overlay review.
- The report's Granny check passed front/back reference validation and runtime-scale matching. Its left/right profile widths are explicitly candidate-only (body width 40 vs legacy reference width 55; full width 50 vs legacy width 70) and were not compared against the owner-approved baseline. Treat profile geometry as unresolved pending a direction-specific, semantically consistent review; do not infer that front/back validation approves side-view measurements.
- Other targeted results: native directional integrity 92/92 passed; archetype silhouette-quality gate 180/180 pairs passed (max IoU 0.827467); NPC body check passed (24 sprites, max height deviation 0.4375 px, max baseline delta 1 px); gallery passed; page errors 0 and script errors 0.
- Overall workflow failed on the full-roster civilian silhouette gate (max IoU 0.909429, Clinic/Sailor front; Coach/Courier back 0.893932), unapproved golden snapshots (1 match / 23 changed), and 180 audio resource 404s. No golden snapshots, renderer artwork, thresholds, or approval statuses changed.
- Next: refine and verify the six candidate masks against native captures, resolve Granny's side-view convention before comparing ratios, then prepare the current five-character review package for Claude. Runner remains outside that five-character submission; remaining civilians remain on hold.


## Run #540 — Granny capture defect resolved; overall QA still failing

Run [#540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44621620719), tested commit `2a8ea18201c0ef43eb17fb1b9da3604832822f2d`, artifact `14578155959`. Semantic measurement validation passed. Granny's dedicated four-direction capture passed after correcting the browser API lookup to `window.NPC_SPRITES.createGrannyRenderer`. The six-civilian overlay generated 24/24 native captures and the five-civilian review sheet found 20/20 native plus 20/20 direct 28×42 captures.

The overall job failed at the independent browser diagnostics step. The log records missing audio resources (HTTP 404); the review summary also records the existing full-roster silhouette gate failure (max IoU `0.909429`, Clinic/Sailor front; Coach/Courier back `0.893932`) and unapproved golden snapshots (1 match / 23 changed). No snapshots were refreshed or approved. Granny capture output was opened and visually inspected: all four directions render, including side scaling/mirroring, but the red anatomy polygons are coarse candidate outlines and not accepted pixel-tight masks. Granny stays `reference_only`; front/back approved values are preserved; profile measurements remain unresolved. Continue source-to-pixel refinement before promoting any candidate annotation.


## Run #546 — Granny pixel-mask capture and integrity verification (2026-11-19)

- Exact branch head/tested commit: `07c63b6bc9eef95b9d39dd62fe4a09ac896c4553` on `npc-granny-baseline-overhaul`.
- [GitHub Actions run #546](https://github.com/tinytime/Tinytime.github.io/actions/runs/44625579202); job `135918539934`; artifact [`14578484083`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44625579202/artifacts/14578484083).
- Semantic measurement tests and manifest validation passed. The live Granny capture step passed for front/back/left/right and wrote `granny-semantic-candidate.json`, four body/full PNG pairs, and `granny-four-direction-semantic-overlay.png`. The new alpha row-mask integrity checks passed in all four directions: exactly 140 rows per mask, inclusive spans within x=0..99, row-span pixel sums equal declared counts, and body alpha count does not exceed full-render alpha count.
- Artifact spot-check of the JSON and PNGs confirms these per-direction body/full/delta pixel counts (alpha threshold >8/255): front 4380 / 5302 / 922; back 4381 / 5303 / 922; left 3231 / 3895 / 664; right 3186 / 3849 / 663. Umbrella-exposed delta bounds are front/back x=14..82,y=0..23; left x=26..75,y=0..23; right x=24..73,y=0..23. Side profiles preserve the renderer's horizontal foreshortening/mirroring.
- **Important semantic boundary:** the alpha masks are exact renderer-output masks, not yet a verified anatomy-only segmentation. The body pass excludes the umbrella canopy/shaft and retains the gripping arm/hand, but also includes the character's headwear and clothing. Therefore the masks provide exact pixel evidence for the rendered body pass and umbrella delta; they do not by themselves separate headwear from anatomy or establish verified semantic ratios. The red polygon outlines in the contact sheet remain coarse candidates. Granny stays `reference_only`; profile measurements remain unresolved; no legacy values or ratio bands changed.
- Overall workflow: **FAILED** at game browser diagnostics due to existing missing audio resources (HTTP 404); independent full-roster silhouette gate remains max IoU `0.909429`; golden snapshot gate remains 1 match / 23 changed and unapproved. The Granny capture, six-civilian overlay and five-civilian review-sheet steps all completed successfully. No snapshots were refreshed or approved.
- Next: use the exact masks as source evidence to trace/validate separate headwear and prop regions, then derive a semantically consistent anatomy mask and inspect its boundary against all four PNGs. Do not promote Granny or civilian records to `measured` until semantic partitioning and human verification are complete.


## Pixel-exact Granny semantic review sheet — implementation pending browser QA (2026-11-19)

- Capture implementation: [`2f50d11`](https://github.com/tinytime/Tinytime.github.io/commit/2f50d11dc44491e60ac26f1de84df978674f0b94) adds `granny-pixel-mask-overlay.png`, a four-direction sheet rendered from the exact per-pixel alpha row masks already captured by Run #546.
- Legend: cyan = umbrella-excluded body pass (hair, clothing, anatomy and raised gripping hand/arm retained); gold = visible umbrella pixels in the full render that are absent from the body pass.
- Semantic correction: Granny has no separate worn headwear. Silver hair belongs to anatomy. Both canopy and shaft are umbrella props. The hand/forearm grip remains anatomy. The exposed-delta mask represents only visible prop pixels, not hidden umbrella geometry.
- Annotation guide update: [`2c317e9`](https://github.com/tinytime/Tinytime.github.io/commit/2c317e982734f221de8729d5373c4ee4b0f27220) corrects the earlier wording that called the canopy headwear and documents the new overlay.
- **Verification status:** implementation is committed, but the new PNG has not yet been produced by a browser QA run or visually inspected. The output is not yet verified. Granny remains `reference_only`; no legacy values, semantic landmarks, profile ratios, civilian statuses, ratio bands, renderer artwork or golden snapshots changed.
- Next: obtain the workflow artifact for this source, inspect the new sheet beside all four full/body captures, verify hand/shaft contact and profile transforms, then refine any remaining candidate polygons/landmarks. Do not promote Granny to `measured` until all four directions and the semantic convention are visually verified.


## Run #552 — Granny anatomy / umbrella semantic correction (2026-11-19)

- Exact tested source: `7e9b3879cd4f816ed1093706d471fe11de0e31c8` on `npc-granny-baseline-overhaul`.
- [GitHub Actions run #552](https://github.com/tinytime/Tinytime.github.io/actions/runs/44628269878); job `135927955152`; artifact [`14581180670`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44628269878/artifacts/14581180670).
- Semantic manifest validation passed. Granny's live capture passed in all four directions; all four row-mask integrity validations passed; six-civilian overlay generation (24/24) and five-civilian review-sheet generation (20/20 native + 20/20 direct 28×42) passed.
- The first correction run (#550) correctly caught that the back view still carried the old canopy-as-headwear annotation. The subsequent correction standardized all four directions and added a hard structural guard: `headwearPolygons` must be empty and `propPolygons` must contain separate canopy and shaft masks in every direction. The tested #552 source passed this guard.
- Semantic partition now follows the renderer: Granny has **no separate worn headwear**; silver hair cap/sweep and the dark hair fringe remain anatomy; umbrella canopy and shaft are props; raised forearm and gripping hand remain anatomy. The shaft polygon stops at the hand contact. The core body polygon head contour was tightened to follow the rendered hair/head outline.
- Downloaded artifact JSON and actual four-direction overlay/PNG captures were inspected. Alpha pixel counts (body pass / full render / umbrella-exposed delta) remain front 4380 / 5302 / 922, back 4381 / 5303 / 922, left 3231 / 3895 / 664, right 3186 / 3849 / 663. Delta bounds: front/back x=14..82,y=0..23; left x=26..75,y=0..23; right x=24..73,y=0..23. The pixel-exact body pass excludes umbrella canopy/shaft and retains hair, clothing, raised arm and grip. The umbrella polygon contours are source-derived candidates, not pixel-perfect segmentation; the overlay visually follows the canopy and shaft across all views, but remains a candidate annotation.
- **Status boundary:** Granny remains `reference_only`; approved legacy front/back measurements are untouched; side profile measurements remain unresolved. No Granny or civilian record was promoted to `measured`; no ratios were calibrated; no golden snapshots were refreshed or approved.
- Overall workflow **FAILED** only at the known game-wide diagnostics/gates: 180 missing-audio HTTP 404 console errors (page errors 0, script errors 0); full-roster civilian type silhouette gate max IoU `0.9094292803970223` (Clinic/Sailor front; Coach/Courier back `0.8939319190922546`); golden snapshot gate remains unapproved (23 changed / 1 match). The separate archetype silhouette-quality audit passed 180/180 (max IoU `0.8274672187715666`). No snapshots were refreshed or approved.
- Next: pixel-trace the umbrella prop boundary against full-render alpha/color pixels if higher precision is needed, and have a second reviewer spot-check the body/prop contact and all landmarks before any semantic promotion. The exact alpha row masks are reliable renderer evidence but do not themselves constitute human-verified anatomy labels.


## Run #555 — pixel-exact Granny mask visualization verified (2026-11-19)

- Tested source: `c90f9bb1a7572670bd85ef0de6dbacd3797bed0e` on `npc-granny-baseline-overhaul`.
- [GitHub Actions run #555](https://github.com/tinytime/Tinytime.github.io/actions/runs/44628953326); job `135930179097`; artifact [`14580687401`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44628953326/artifacts/14580687401).
- Semantic validation passed; Granny four-direction capture passed; six-civilian overlay generation passed (24/24); five-civilian review sheet passed (20/20 native and 20/20 direct 28×42). The new `granny-pixel-mask-overlay.png` was generated, downloaded and visually inspected. The final legend spacing is clean and no longer overlaps.
- The pixel-mask sheet clearly separates the umbrella-excluded body alpha (cyan) from visible umbrella-only alpha (gold) across front/back/left/right. This is the exact per-pixel renderer partition at alpha threshold >8/255, not a hand-traced polygon. It retains the silver hair, outfit, arms and hand; canopy and shaft are separate visible prop pixels. It confirms the 0.72 side scale and left-facing mirror. The companion semantic polygon sheet was also generated and visually inspected; candidate head contours and canopy/shaft prop contours broadly follow the rendered forms.
- Counts are unchanged: front body/full/umbrella delta 4380/5302/922; back 4381/5303/922; left 3231/3895/664; right 3186/3849/663. All four directions have empty `headwearPolygons` and two candidate prop polygons (canopy and shaft). The alpha umbrella mask is exact for visible pixels; it does not infer hidden prop geometry behind the character or prove every manually authored polygon edge.
- **Status boundary:** the pixel-exact body/umbrella segmentation is now generated, browser-tested and visually inspected. The semantic landmarks and hand-authored polygons are still candidates requiring second-review/pixel-boundary refinement. Granny remains `reference_only`; legacy front/back values are untouched; side ratios remain unresolved; no measurements or ratio bands were promoted/calibrated. No golden snapshots were refreshed or approved.
- Overall workflow **FAILED** at known global gates: 180 audio HTTP 404 console errors; page errors 0 and script errors 0; full-roster type-silhouette max IoU `0.9094292803970223`; golden snapshot baseline still unapproved (23 changed / 1 match). Separate archetype silhouette-quality audit passed 180/180 (max IoU `0.8274672187715666`), directional integrity passed 92/92, role debug 12/12, prop audit passed, and direct game-scale capture passed 20/20. No snapshots were refreshed or approved.
- Next: obtain independent second-review of the semantic landmark locations and hand-drawn polygon boundaries, especially shoulder/head/hand contact. Keep Granny reference-only until this is complete; then harmonize side measurements using the same semantic convention before comparing ratios with civilians.


### Run #555 polygon-to-alpha comparison — candidate boundary precision

A local rasterized comparison was performed against the Run #555 pixel masks (100×140 grid; side polygons transformed using the renderer's 0.72 scale and left mirror). Core body polygon plus appendage polygons vs exact body alpha IoU: front 0.790, back 0.790, left 0.672, right 0.666. Combined canopy+shaft prop polygons vs exact umbrella-delta alpha IoU: front 0.609, back 0.609, left 0.612, right 0.615. This is a diagnostic, not a CI gate or an approval score. It confirms the exact row masks are materially more precise than the hand-authored polygons, particularly for the prop boundary and side silhouettes. Keep all semantic polygons/landmarks candidate-only; refine from renderer paths and exact masks before any measurement promotion.


## Granny candidate polygon fit diagnostics — implementation and Run #552 baseline (2026-11-19)

Run #552 ([artifact `14581180670`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44628269878/artifacts/14581180670)) supplied the exact 100×140 alpha row masks and four-direction PNGs used for this initial diagnostic. I reconstructed the pixel-mask visualization from that artifact and inspected it against the actual front/back/left/right captures. The cyan body pass retains silver hair, clothing and the raised gripping hand/arm; gold marks visible umbrella pixels absent from the body pass. This confirms the mask convention visually, but the mask itself is not an automatic anatomy classifier.

A reusable fit diagnostic has now been added:
- `qa/granny-mask-fit.mjs` rasterizes candidate body/appendage and prop polygons with the capture's profile scale/mirror transform, then compares them with the exact row masks.
- `qa/test-granny-mask-fit.mjs` covers perfect/partial overlap, alpha row conversion and profile mirroring.
- `qa/build-granny-semantic-overlay.mjs` now adds `pixelMaskFitReview` to the candidate JSON and emits `granny-pixel-mask-fit-report.json`.
- The browser QA workflow runs the helper fixture test.

The helper and fixture tests passed locally against four fixtures. Applying the same helper to the Run #552 artifact produced:

| Direction | Body IoU | Body precision | Body recall | Visible umbrella coverage |
|---|---:|---:|---:|---:|
| Front | 0.786 | 0.817 | 0.954 | 0.822 |
| Back | 0.786 | 0.817 | 0.954 | 0.822 |
| Left | 0.645 | 0.852 | 0.727 | 0.815 |
| Right | 0.644 | 0.844 | 0.731 | 0.816 |

Interpretation: the current body candidates capture most front/back body pixels but miss roughly 27% of side-view body pixels under the correct profile transform. This is a concrete refinement target; do not promote the profile masks or use the resulting ratios for calibration. The umbrella polygons cover about 82% of visible umbrella-delta pixels. Their extra area may be legitimately occluded behind Granny, so visible coverage—not IoU or precision—is the relevant prop diagnostic.

**Verification boundary:** the new helper's four fixture tests passed locally, and the baseline calculation was run against the downloaded Run #552 artifact. The new GitHub Actions workflow execution for the helper/report changes has not yet been retrieved or confirmed. No hard thresholds, legacy Granny values, renderer artwork, NPC approval states or golden snapshots changed. Granny remains `reference_only`.


## Pixel-derived Granny body contour refinement — implementation (2026-11-19)

Following the Run #555 artifact inspection, the capture now retains the previous manual body polygon/appendages as `manualBodyPolygonCandidate` and derives the active candidate `bodyPolygon` from the exact umbrella-excluded `bodyAlpha` row mask. `qa/granny-mask-fit.mjs` traces the outer contour and converts profile coordinates back through the renderer's inverse 0.72 scale/mirror transform. The review sheet overlays red mask-derived contours against magenta manual candidates; yellow remains the umbrella prop outline. The fit report records manual candidate fit, pixel-derived contour fit, and visible umbrella coverage.

Local tests: `node qa/test-granny-mask-fit.mjs` passed ten fixtures. The helper was also applied locally to the downloaded Run #555 artifact (artifact `14580687401`): derived contour IoU was 0.9964 front, 0.9961 back, 0.9954 left, 0.9975 right, with 1.0 recall in all four directions. This verifies contour tracing against the renderer mask, not human semantic correctness. The earlier manual candidate fit and prop coverage metrics remain in the diagnostic report for comparison. The exact semantic convention is Granny-specific; do not apply this auto-contour method to other NPCs unless their renderer body pass has a verified prop-exclusion definition.

**Verification boundary:** this latest contour-generation and side-by-side overlay change is committed but has not yet been run through a fresh Actions artifact. The last inspected Actions evidence remains Run #555, tested source `c90f9bb`. No legacy reference values, ratio thresholds, renderer artwork, NPC approval states or golden snapshots changed. Granny remains `reference_only`.


## Visible-only umbrella contour refinement — 2026-11-19

The capture now preserves the complete manual umbrella geometry as `manualPropPolygonCandidate` and separately derives `visiblePropPolygons` from the exact full-render-minus-body alpha delta. This avoids confusing the hidden portion of the umbrella with visible rendered pixels. The semantic overlay shows the full candidate in yellow and the visible-only contour in cyan. The fit report records manual visible-pixel coverage and exact visible-contour fit independently.

Applied locally to Run #555's artifact, the visible-only contour matches the exposed umbrella alpha at IoU 1.0 in all four directions. The manual complete-prop candidate covers 82.2% of visible pixels front/back and 81.5–81.6% in profiles; hidden/occluded candidate area is intentionally not scored as false-positive. This does not verify the hidden shaft/canopy geometry or the grip contact; those remain for visual/second-review.

**Verification boundary:** this visible-prop contour integration and updated overlay have not yet been produced by a fresh Actions run. The last inspected workflow remains Run #555. No prop geometry was approved or changed in the live renderer; Granny remains `reference_only`.


The latest follow-up also retains all disconnected visible umbrella mask contours (`visiblePropPolygons`) rather than selecting only the largest component. The helper test suite now covers this split-component and hole-handling cases (ten fixtures). This refinement is committed but remains pending fresh Actions artifact verification.


## Multi-component Granny contour follow-up — implementation (2026-11-19)

The contour helper and capture were hardened to preserve every disconnected alpha component rather than selecting only the largest contour. The primary outer body loop is stored in `bodyPolygon`; remaining disconnected outer body loops are stored in `bodyAppendagePolygons`; interior hole loops are filtered out; all visible umbrella-delta outer loops are stored in `visiblePropPolygons`. Original hand-authored candidates remain in `manualBodyPolygonCandidate` and `manualPropPolygonCandidate`. The fit report compares the manual body and prop candidates with the exact masks and separately reports mask-derived body/visible-prop fit.

The fixture suite includes two disconnected components and an interior hole; it checks that disconnected outer loops are retained while inner hole loops are not misclassified as body appendages. This guards against accidentally dropping a detached component (particularly the visible umbrella shaft). The code is committed, but no fresh Actions run/artifact has yet been confirmed for this latest change. Last visually inspected browser evidence remains Run #555; do not describe the new contour overlay/report as browser-tested until a new artifact is retrieved and inspected. Granny remains `reference_only`.


## Contour topology follow-up — 2026-11-19

The latest helper filters inner hole loops by winding and retains every disconnected outer component. This prevents interior voids from being incorrectly added as anatomical appendages while still preserving separate visible prop fragments. Exact row-span alpha masks remain untouched in the candidate JSON. The ten-fixture local test suite passed; applying the updated contour helper to Run #555 again yields body contour IoU 0.9964/0.9961/0.9954/0.9975 and visible umbrella contour IoU 1.0 in all directions. This is a local artifact calculation, not a fresh Actions run.


## Granny contour topology follow-up — implementation (2026-11-19)

A further edge case was identified: tracing only the largest outer loop can drop detached body/prop fragments, while tracing outer loops alone fills transparent holes. The helper now returns all outer components and interior holes separately. The capture stores body components in `bodyPolygon`/`bodyAppendagePolygons`, body cutouts in `bodyMaskHolePolygons`, visible umbrella components in `visiblePropPolygons`, and visible-prop cutouts in `visiblePropMaskHolePolygons`. Fit diagnostics subtract holes before comparing with exact alpha row spans. Manual body and full-prop candidates remain preserved for audit.

The ten-fixture suite covers disconnected components and an interior hole; the exact current helper reconstructs the Run #555 body and visible umbrella alpha masks at IoU 1.0 in all directions. The new helper, tests and capture integration are committed but remain unverified by a fresh Actions run/artifact. Run #555 remains the latest browser-tested and visually inspected artifact. Granny remains `reference_only`.


## Hole-aware contour reconstruction local validation — 2026-11-19

The current helper retains outer loops and interior holes separately for both body alpha and visible umbrella delta. The fit report rasterizes outer loops and subtracts hole polygons before comparison. Local ten-fixture tests pass. Applying the current helper to Run #555's downloaded artifact reconstructs body alpha and visible umbrella delta at IoU 1.0 in front/back/left/right. This confirms the contour algorithm against the source masks, not semantic correctness or a fresh Actions run. Granny remains `reference_only`.


## Candidate landmark-to-mask evidence — local Run #555 inspection (2026-11-19)

The helper now emits landmark evidence alongside polygon/mask fit. Applying it to Run #555's actual four-direction artifact reports body alpha bounds y=9..136 in every direction. Candidate headTop is y=8 in all views (one pixel above the first body-alpha row); chin y values are within the body's vertical bounds; both candidate shoulder points land on exact body-alpha pixels in all four directions; pelvis rows contain 40 pixels front/back and 30 pixels in profiles; candidate footBaseline y=136 matches the final body-alpha row exactly.

This supports retaining the shoulder and foot-baseline candidates for now, while explicitly flagging the one-pixel headTop offset for human review. It does not establish semantic correctness of shoulder/chin/pelvis landmarks. Local helper tests now cover eleven fixtures. This report integration is committed but still needs a fresh Actions artifact before being called browser-tested.


## Run #587 — browser QA and Granny pixel-mask verification (2026-11-19)

[Run #587](https://github.com/tinytime/Tinytime.github.io/actions/runs/44632151886) tested commit `64b841bdc53caad66fb9780a0f2bdeb3afcda0a2`. Current branch head at review was `8936de0cc808b939ab7efb4cec3dd20bb3d82d5f`; the helper, test and capture-script blob SHAs are identical between the tested commit and current head, with subsequent commits limited to documentation.

**Passed:** 11 Granny mask-helper fixtures; live Granny capture in all four directions; pixel-mask overlay and fit-report generation; 24/24 six-civilian overlay captures; 20/20 five-civilian native captures; 20/20 direct 28×42 captures; directional integrity 92/92; role debug 12/12; prop audit across 10 archetypes; gallery render.

**Granny mask evidence:** derived body and visible umbrella contours reproduce their exact source alpha masks at IoU 1.0 in front/back/left/right. Candidate landmarks: body bounds y=9..136; headTop y=8 is one pixel above the first body-alpha row; chin stays in bounds; both shoulder points lie on exact body pixels; pelvis rows contain 40 pixels front/back and 30 in profiles; footBaseline y=136 matches the bottom row.

**Important limitation:** the hand-transcribed body polygon candidate fit is only IoU 0.786 front/back and 0.645/0.644 in profiles. The manual candidate remains unverified and needs human pixel-tight refinement. The derived contour exactly reproduces the renderer mask, but that mask includes hair/clothing and is not itself an anatomical segmentation or approved semantic outline. Manual umbrella geometry covers 81.5–82.2% of visible pixels; the visible-only contour is exact, while hidden geometry and grip contact still need review.

**Workflow failed overall:** browser diagnostics report widespread audio resource HTTP 404s. The five-civilian report also records the full-roster silhouette gate at max IoU 0.909429 and the golden snapshot gate at 1 match / 23 changed. No golden snapshots were modified or approved. Artifact `14581958311` was downloaded; Granny pixel-mask and semantic overlays, before/after capture, five-civilian native/game-scale sheets, and town screenshot were visually inspected. No clipping or directional capture omissions were apparent in the inspected contact sheets. Visual inspection is not artistic approval. Granny remains `reference_only`.


## Run #591 — follow-up verification and artifact inspection (2026-11-19)

- Workflow: [Vapor City Browser QA #591](https://github.com/tinytime/Tinytime.github.io/actions/runs/44633672693)
- Tested commit / branch head: `5ada0ff9a419f547c178c5a2c559c43ffe0e39f1`
- Job: `135946628982`; conclusion: **FAILED**
- Artifact: `vapor-city-browser-qa`, ID `14582493188` (downloaded and inspected)

**Follow-up fix verified:** `granny-landmark-review.png` is now included in the artifact and the CHIN/SHOULDER labels are clearly separated in the actual four-direction sheet. All four Granny views, head-top/chin/shoulder/pelvis/foot guides and shoulder markers are visible. This confirms the output-manifest and label-spacing change; it does not approve any candidate landmark.

**Passed:** semantic civilian validation; Granny live capture and overlay generation in all four directions; six-civilian overlay 24/24; five-civilian review 20/20 native and 20/20 direct game-scale; directional integrity 92/92; role debug 12/12; prop audit 10 archetypes; gallery render; town scene state (16 NPCs, Granny present); Granny directional visual comparison. `scriptErrors` and `pageErrors` are empty.

**Failed:** browser diagnostics recorded 180 audio-resource HTTP 404 console errors across 46 unique URLs; full-roster civilian silhouette gate max IoU `0.9094292803970223`; golden snapshot gate 1 match / 23 changed with baseline unapproved. No golden snapshots were refreshed or approved. These global failures do not invalidate the targeted Granny capture/landmark-sheet result, but the overall workflow remains failed.

**Granny evidence boundary:** manual body polygon fit remains IoU 0.7875 front, 0.7877 back, 0.6458 left and 0.6447 right. Pixel-derived body and visible-umbrella contours reproduce the exact source alpha masks at IoU 1.0, but this is renderer-mask reconstruction, not semantic anatomy approval. Candidate landmark values remain diagnostic. Granny remains `reference_only`; no measurement promotion, ratio calibration, renderer art change, or snapshot approval occurred.

**Next:** address audio-resource diagnostics and the independent global silhouette/snapshot gates separately; continue pixel-tight semantic review before promoting Granny landmarks or using them to calibrate other civilians. Keep snapshot approval strictly owner-controlled.


## Five-character correction round — Claude targeted findings (2026-11-20)

- Owner-authorized scope: Usher, Cook, Courier, Coach and Referee only. Runner remains excluded; the remaining 17 civilians remain ON HOLD. Referee's dedicated renderer was not modified.
- Renderer commit `d1f937730cbc823fa784f896e716c30ec0c15f71` made the first targeted pass: lighter Usher trousers/shoes and a clearer single badge/waist separation; Coach's first straight-hem jacket revision and reduced silver temple shapes; Cook's first connected cuff/hand/pan construction and lower pan placement.
- Review-sheet tooling commit `e599500e16ad8673fe8073e16fa007183306edf7` adds dedicated Coach/Courier back comparisons (native and direct game scale), Cook prop-contact sheets (native and direct game scale), and Usher direct game-scale readability sheets. These are evidence-generation aids only.
- Browser QA Run #593 ([run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44644502056), source `e599500e16ad8673fe8073e16fa007183306edf7`, artifact `14587548199`) produced 20/20 native 64×96 captures and 20/20 direct 28×42 captures. Syntax and inventory passed; directional integrity 92/92, role-debug 12/12, prop audit, gallery and town regression passed. The five-character contact sheets and all five targeted sheets were generated.
- Internal visual inspection of Run #593 found the Coach/Courier back hem distinction improved, Usher's trousers clearer at game scale, and Cook's pan lower with a visible arm path. Two residual issues remained: additional rear silver shapes still read as headset pieces, and Cook's hand was obscured by later pan drawing at game scale.
- Follow-up renderer commit `a5a22da39a28e51121326d8cc0fc07f36ac1d51d` removes Coach's residual silver side shapes and paints Cook's hand after the handle/pan so the grip can read over the prop. This is implemented but not yet visually verified.
- Browser QA Run #594 is in progress against exact renderer source `a5a22da39a28e51121326d8cc0fc07f36ac1d51d`: [run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44644810758). Do not treat Run #593 as verification of this follow-up.
- Run #593's overall workflow concluded FAILED on the full-roster civilian silhouette gate (maximum rendered IoU 0.9094292803970223; Coach/Courier back 0.8909718796250616) and unapproved golden snapshots (1 match / 23 changed). Page and script errors were zero. Missing audio resource 404s are expected branch noise and non-blocking; no audio assets were added.
- No golden snapshots or provenance were modified. No semantic annotation candidates were promoted. No character is approved by this correction pass; internal QA, Claude's updated comparative review and explicit owner approval remain required.
