# QA, Known Issues, and Handoff

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
