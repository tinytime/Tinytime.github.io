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
