# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.
6. **[Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md)** — Granny Volt's measured reference geometry, shared technical rules, provisional proportion bands, staged build pipeline, scorecard, and QA calibration plan.
7. **[Six-Civilian Construction Standard Audit](SIX-CIVILIAN-CONSTRUCTION-AUDIT.md)** — first application of the draft standard to Usher, Cook, Courier, Runner, Coach, and Referee, including rendered evidence, provisional scorecards, verified QA measurements, and calibration gaps.
8. **[Semantic Civilian Anatomy Annotation Guide](../qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md)** — exact coordinate convention, body/headwear/prop masks, required landmarks, Runner joint annotations, and the human annotation workflow.



### Current semantic construction and QA state — 2026-11-19

The [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md) now contains an **Operational process addendum**. Treat that addendum as the current authority for build sequencing, semantic annotation, evidence states, Granny harmonization, QA and handoff. The earlier dated notes below the standard are historical; do not use them as current status when they conflict with the addendum.

- **Branch/head at last verification:** `npc-granny-baseline-overhaul` / `2f50d11dc44491e60ac26f1de84df978674f0b94` (latest QA visualization implementation; documentation commits may advance the branch).
- **Semantic framework:** validation/tests pass. Six civilian sets have four-direction source-derived candidates; Run #534's 24/24 overlay was a coarse visual spot-check only. All six remain `source_annotated`, not verified `measured`; no semantic civilian ratios are approved for calibration.
- **Granny:** Run #546 passed the live four-direction capture and alpha row-mask integrity checks; the exact body/full/umbrella-delta pixel counts are recorded in the tracker and QA handoff. Her silver hair is anatomy, both canopy and shaft are umbrella props, and the raised grip remains anatomy. A new pixel-exact mask overlay is implemented in `qa/build-granny-semantic-overlay.mjs` but awaits a fresh browser artifact and visual inspection. Legacy front/back values remain reference facts; profile ratios remain unresolved.
- **Latest verified browser QA:** [Run #546](https://github.com/tinytime/Tinytime.github.io/actions/runs/44625579202) tested `07c63b6bc9eef95b9d39dd62fe4a09ac896c4553`; Granny capture and mask integrity passed, while the overall workflow failed on audio 404 diagnostics, full-roster silhouette overlap, and the unapproved snapshot gate. The newer pixel-mask visualization commit has not yet been tested in Actions. No snapshots or approvals changed.
- **Next task:** run browser QA for the new pixel-mask overlay, inspect the generated sheet against all four full/body captures, refine and verify semantic landmarks, and keep Granny `reference_only` until then. Do not promote candidates or introduce proportion hard gates.
- **Review scope:** Claude's current independent review is five characters—Usher, Cook, Courier, Coach and Referee. Runner is excluded from this submission only. The remaining 17 civilians stay on hold pending independent review and owner approval.

Read the [semantic anatomy annotation guide](../qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md) alongside the standard for exact coordinate, polygon, landmark and verification rules. The tracker remains authoritative for per-character approval status.

## Working agreement

- The project owner sets priorities and gives final approval.
- ChatGPT is the primary builder: inspect, implement, test, review artifacts, and update the docs.
- Claude is the independent visual reviewer. Claude reviews completed batches against Granny Volt and gives a candid approval or rejection.
- Never mark a design approved based only on code completion or automated test results.
- Do not refresh or approve golden snapshots just to make CI pass. Human visual approval is required first.

## Current focus

The first batch—**Usher, Cook, and Courier**—was approved by the project owner on 2026-11-19, then explicitly reopened by the owner on 2026-11-19 for Claude-recommended corrections. Their prior approval remains historical; current status is revision in progress. **Coach and Referee** are also in the five-character correction pass and remain not approved. Runner remains excluded from this round. The owner has narrowed the independent review to five: Usher, Cook, Courier, Coach and Referee. Runner is excluded for this round only because of its shared athletic archetype with Coach/Referee; it remains built and awaiting a later focused review. See the [five-civilian review package](../qa-artifacts/five-civilian-full-review/README.md) and its [Claude review brief](../qa-artifacts/five-civilian-full-review/CLAUDE-REVIEW-BRIEF.md), which still point to the historical run #464 evidence; refresh the package after the annotation and measurement review. Claude's review must produce a practical, non-templating build standard before the remaining 20 are started.

## Source of truth

The tracker records design status. The live game and renderer code are authoritative for implementation. The QA workflow and its artifacts are authoritative for what a particular test run actually checked. If these disagree, report the discrepancy and reconcile the documents; do not silently assume one is correct.


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


## Run #457 — six-civilian polish verification (2026-11-19)

- **Exact renderer source:** `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0).
- **Browser QA:** [run #457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167), run ID `44592153167`, job `135800700792`, artifact `14563778383`.
- **Source audit:** the requested eye catchlights, Courier forward lean, Cook's revised pan/toque geometry, and Runner trailing-leg stride were already present in the renderer source tested by run #453. The final follow-up source preserves those changes, removes a redundant duplicate Runner leg draw, preserves Cook's original eye treatment, and compresses only the Cook toque crown vertically to clear the top edge without moving the band or body baseline.
- **Visual inspection:** all 24 native 64×96 captures (six civilians × four directions) inspected; all 12 direct 28×42 game-scale captures for Runner/Coach/Referee inspected; role-debug, gallery, Granny comparison, town regression and report inspected. Cook now has transparent top headroom in all four views. Runner's side stride reads as two legs and two feet, not a third foot. Eyes/catchlights are visible at native scale and the Courier retains the forward lean.
- **Targeted checks pass:** syntax/module and inventory; palette; face distinctness 23/23; direct game-scale capture 12/12; role-debug 12/12; directional visual integrity 92/92 with zero edge contacts and zero detached components; prop audit; silhouette-quality 180/180; gallery visual pass; town regression (street map, 16 NPCs, Granny present); page errors 0 and script errors 0.
- **QA checks that still fail:** NPC body/baseline audit flags Courier baseline delta 2 where the vector-character threshold is 1. Global civilian type silhouette audit still flags Clinic/Sailor front at IoU `0.9094292803970223` (other close pairs also appear in the report). Golden snapshots remain unapproved (23 changed / 1 match). Console records 180 missing-audio 404s. No snapshots were refreshed or approved.
- **Status:** targeted visual integrity and requested character polish verified; overall workflow remains FAILED on the above gates. This is not Claude's independent review or owner approval. Usher/Cook/Courier retain their existing owner approval; Runner/Coach/Referee remain NOT APPROVED. Remaining 20 civilians stay on hold.
- The full six-civilian Claude review package now points to this source and artifact.


## Claude correction round — owner authorization (2026-11-19)

The owner authorized reopening Usher, Cook and Courier for all relevant corrections in Claude's five-civilian review. The previous approvals remain in the history but do not apply to the revised versions. Coach and Referee are included in the same correction pass; Runner remains excluded.

Implementation commit: [027be47d8f6763f447992a9dec058ff62a7c60a3](https://github.com/tinytime/Tinytime.github.io/commit/027be47d8f6763f447992a9dec058ff62a7c60a3). The changes address Cook's toque/face clearance and profile arm, Courier's baseline tilt, Coach's yoke/age cues/whistle/font-dependent lettering, Referee's side-torso leakage/profile hair, and Usher's profile clipboard face.

**The correction source is committed but not yet browser-tested or visually inspected.** Run #457 is prior-source evidence only. No golden snapshots were refreshed or approved. Keep all five in revision / not-approved status until fresh QA, visual inspection, independent Claude re-review, and owner acceptance. Remaining 20 stay on hold.

## Follow-up finish pass — 2026-11-19

Renderer commit: [23c792f7e83eb14ff7d48e197678272f1c3e58b0](https://github.com/tinytime/Tinytime.github.io/commit/23c792f7e83eb14ff7d48e197678272f1c3e58b0).

Added restrained warm/cool rim-light accents to Coach and Referee, matching the established light treatment already present on Usher, Cook and Courier. The accents are limited to face/shoulder contours and intentionally avoid tracing the clipboard, whistle or yellow card.

This is a source-only finish refinement. It has not yet been browser-tested or visually inspected. All five characters remain in revision / NOT APPROVED status; Runner remains excluded from this review round and the remaining 20 civilians stay on hold. No golden snapshots were changed.

## Civilian Vector Construction Standard — draft added (2026-11-19)

The owner authorized formalizing the Granny Volt art analysis as a permanent GitHub standard. The new [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md) records measured reference geometry from `qa/granny-ref.json`, separates fixed technical invariants from character-specific design, defines measurement conventions and provisional exploration bands, establishes an eight-stage build pipeline, proposes a 100-point internal scorecard, and lists automated QA metrics plus calibration work.

**Status is DRAFT FOR CLAUDE REVIEW AND OWNER RATIFICATION.** The proportion bands, score weights, score floors, and scoring bands are explicitly provisional; they are not hard-fail QA thresholds. They must be tested against Granny and the five-character review set before being locked. The standard does not alter renderer code, change existing QA gates, approve any character, refresh golden snapshots, or release the remaining 20 civilians from hold.

Current review evidence is recorded in QA run #464: native 64×96 captures 20/20, direct 28×42 captures 20/20, directional integrity 92/92, role-debug 12/12, prop audit and gallery pass; overall workflow remains failed on the full-roster silhouette gate and unapproved golden snapshots. Missing-audio 404s remain; page/script exceptions are zero. See the QA handoff and tracker for full evidence and exact limitations.

## Six-civilian construction standard application — 2026-11-19

The draft standard has now been applied internally to all six built vector civilians: Usher, Cook, Courier, Runner, Coach, and Referee. The [six-character audit](SIX-CIVILIAN-CONSTRUCTION-AUDIT.md) records rendered evidence, per-character construction cards, a provisional first-pass scorecard, current body/baseline measurements, and the need for a consistent accessory-excluded anatomical measurement pass. This does not expand the current five-character Claude submission, approve any revised design, ratify the standard, change renderer code or release the remaining 20 from hold.


## Source-derived candidate annotation update — 2026-11-19

The six civilian records now contain first-pass source-derived candidate landmarks for front, back, left and right, based on the pinned `npc_sprites.js` draw paths at commit `8ac99ec8fd7eb7f2328eda7b7332d5e8f2d45317`. Candidate annotations include a coarse anatomical body polygon, headwear and prop exclusion polygons, head/chin/shoulder/pelvis/foot landmarks, and (for Runner) bilateral shoulder/elbow/wrist/hip/knee/ankle joints. The measurement report computes descriptive candidate ratios but labels these records `source_annotated`, not `measured`.

**Verification boundary:** these are manually transcribed source-geometry candidates, not pixel-traced/visually approved masks. The polygons are intentionally coarse and must be overlaid against fresh native 64×96 captures in all four directions; profile mirroring, hair/headwear boundaries, shoulder joints, prop exclusions, and Runner's stride joints require spot-check/correction before promoting any record to `measured` or using ratios for calibration. No proportion band is enforced, no renderer art changed, and no approval status changed.


The QA workflow now builds a six-civilian native-capture overlay (`six-civilian-annotation-overlay.png`) in addition to the legacy five-civilian review sheet. Source-annotated candidates count as **pending visual verification** until reviewed; the report therefore tracks six candidates and six pending verifications, with zero records promoted to `measured`. The first Referee prop-box correction is direction-specific. The overlay review identified additional body-mask/prop/joint corrections before semantic calibration. See the annotation guide for the current visual findings. The semantic validator is passing; the overall browser workflow continues to fail on existing full-roster silhouette and unapproved snapshot gates.


Latest semantic annotation evidence: [Run #530](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614186989) generated 24/24 six-civilian native overlays and passed semantic validation. The current measurement report is 0 verified measurements, 6 source-annotated candidates and 6 pending visual verifications. Direction-specific prop masks have been refined for Usher, Cook, Courier, Runner, Coach and Referee; the overlay guide and QA handoff contain the current review notes. Overall browser QA still fails on existing full-roster silhouette, unapproved golden snapshot and audio 404 gates. Do not promote candidates or calibrate ratio bands yet.


## Six-civilian overlay evidence — Run #534 (2026-11-19)

The browser workflow at commit \`5db307350e3e93db05d1145b1aeb9da3a7273b73\` generated \`six-civilian-annotation-overlay.png\` from all 24/24 native 64×96 captures (Usher, Cook, Courier, Runner, Coach and Referee), with no missing directions. Artifact: [Run #534](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614783942), artifact \`14574047896\`. The overlay has been visually inspected. The body/headwear/prop/joint candidates broadly track the rendered figures and are useful for review, but remain manually transcribed, coarse masks—not pixel-traced measurements. All six remain \`source_annotated\`; Granny remains \`reference_only\`; zero records are promoted to \`measured\`, and no proportion bands are calibrated.

Run #534's semantic manifest validation passed, the overlay generator passed, and the five-civilian review-sheet generator passed (20/20 native and 20/20 direct 28×42 captures for its five-character scope). Overall browser QA failed: full-roster civilian silhouette max IoU 0.909429 (Clinic/Sailor front; Coach/Courier back 0.893932), golden snapshot gate 1 match / 23 changed with baseline still unapproved, and 180 audio resource 404s. The 92-capture visual integrity audit, 180-pair archetype silhouette quality gate, NPC body check, and gallery audit passed; page/script errors were zero. Do not refresh or approve snapshots. Continue pixel-tight annotation review and address the unrelated full-roster/audio gates separately.


## Granny semantic capture — Run #540 (2026-11-19)

[Run #540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44621620719) tested commit `2a8ea18201c0ef43eb17fb1b9da3604832822f2d` and produced artifact `14578155959`. The initial capture failure was a bad export lookup: the live renderer is exposed as `window.NPC_SPRITES.createGrannyRenderer`, not `window.createGrannyRenderer`. The QA script now uses the actual public export. Granny capture passed for all four directions; semantic validation passed; the six-civilian overlay generated 24/24 captures; the five-civilian review sheet found 20/20 native and 20/20 direct game-scale captures.

The four-direction Granny overlay and body/full images were visually inspected. Captures are valid and show the intended 0.72 profile scaling and left-facing mirror. Candidate anatomical polygons are still coarse/manual and are not pixel-tight enough to certify; head/face, raised gripping arm/hand, profile shoulders and umbrella/shaft boundaries need source-to-pixel refinement. Granny remains `reference_only`; candidate capture remains `candidate_source_annotated`; approved front/back reference values are unchanged and profile ratios remain unresolved. No renderer artwork, golden snapshots, or approval states changed.

Overall Run #540 failed in separate existing gates: browser diagnostics (including missing audio resources returning HTTP 404), civilian silhouette gate (max IoU `0.909429`, Clinic/Sailor front; Coach/Courier back `0.893932`), and golden snapshot gate (1 match / 23 changed; baseline remains unapproved). Do not refresh or approve snapshots. Next: refine Granny's candidate masks, preserve front/back values, investigate profile measurement convention, and separately track global browser/audio/silhouette failures.


## Granny pixel-mask refinement in progress — 2026-11-19

After inspecting Run #540's four-direction overlay, the hand-authored body polygons were judged too coarse for reliable measurements. The capture script has been extended to extract per-pixel alpha row spans for each direction from the live renderer's accessory-excluded body pass and full pass, plus the exposed umbrella alpha delta. This keeps the raised umbrella-gripping hand/arm in the anatomy mask while separating visible umbrella pixels. The exact masks are additional candidate evidence; existing polygons and landmarks remain unverified.

Implementation: `6795c57e37f3252df44fa06ed4d31e7af3446061`; documentation: `0ec63862ad7b08df2b55ea622a6829f7862c9f7c`. **The updated capture has not yet been browser-tested.** Next: inspect the Actions run and artifact, validate all four masks and their row spans/bounds, then visually inspect the mask overlays before considering any semantic measurement. Granny remains `reference_only`; no civilian annotation status, approved Granny values, ratio bands, or golden snapshots changed.


## Granny pixel-mask QA refresh — Run #546 (2026-11-19)

The current capture implementation is now browser-tested on branch head `07c63b6bc9eef95b9d39dd62fe4a09ac896c4553`. [Run #546](https://github.com/tinytime/Tinytime.github.io/actions/runs/44625579202), artifact `14578484083`, confirms all four live Granny direction captures and alpha row-mask integrity checks pass. The artifact was downloaded and its JSON/PNG evidence inspected. Per-direction body/full/umbrella-delta alpha counts are front 4380/5302/922, back 4381/5303/922, left 3231/3895/664, right 3186/3849/663. These exact renderer masks still include headwear and clothing in the umbrella-excluded body pass, so they are not yet a semantically partitioned anatomy mask. The polygon overlay remains coarse; Granny remains `reference_only`, with profile ratios unresolved. Overall QA still fails on missing audio 404s, the global silhouette gate (max IoU 0.909429), and unapproved golden snapshots (1 match / 23 changed). No snapshots or approvals changed. Full evidence and next steps are in [QA handoff](04-QA-AND-HANDOFF.md).
