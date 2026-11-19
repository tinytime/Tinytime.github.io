# Six-Civilian Construction Standard Audit

**Status:** Internal application of the draft Civilian Vector Construction Standard  
**Audit date:** 2026-11-19  
**Scope:** Usher, Cook, Courier, Runner, Coach, Referee  
**Reference:** Granny Volt remains the separate approved 10/10 quality benchmark.  
**Approval:** This audit is not Claude's independent review, owner approval, or ratification of the draft standard.

## 1. Purpose and boundaries

This document applies the draft [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md) to all six currently built vector civilians. It records actual rendered evidence, a first-pass construction assessment, the current QA measurements, and the measurement work still required to calibrate Granny's proportions against the six designs.

The scope distinction is intentional:

- **Construction-standard application:** all six vector civilians.
- **Current independent Claude review scope:** Usher, Cook, Courier, Coach, and Referee, as previously narrowed by the owner. Runner is included in this internal construction audit but is not silently added back to that Claude review.
- **Remaining 20 civilians:** remain ON HOLD.
- **Renderer changes:** none are made by this audit. Corrections require their own implementation and fresh browser evidence.
- **Numeric standard:** all proposed proportion bands, score weights, score bands, and category floors remain provisional. No new hard-fail gate is introduced.

## 2. Evidence and provenance

### Renderer and captures

- Current six-character renderer source: [npc_sprites.js at 23c792f](https://github.com/tinytime/Tinytime.github.io/blob/23c792f7e83eb14ff7d48e197678272f1c3e58b0/npc_sprites.js).
- Latest combined five-character correction QA: [run #464](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571), artifact [14568746641](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571/artifacts/14568746641).
- Run #464 includes native 64×96 directional captures for all six vector civilians in npc-type-directions, even though its generated five-character contact sheets intentionally omit Runner.
- Run #464 provides direct 28×42 game-scale captures for Usher, Cook, Courier, Coach, and Referee.
- Runner's direct 28×42 captures are from [run #457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167), artifact [14563778383](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167/artifacts/14563778383). The intervening renderer comparison from 5e02024 to 23c792f changes only Coach and Referee rim-light details; Runner's draw path is unchanged. Therefore the Runner game-scale images remain representative of its current renderer, but the six direct game-scale views were not produced in one single run.
- The six-character native contact sheet and direct game-scale comparison were assembled for this audit from the above verified artifacts. They are comparison aids, not new browser captures.

### Granny baseline facts

The approved reference values remain those recorded in qa/granny-ref.json:

| Measurement | Granny Volt |
|---|---:|
| Source grid | 100 × 140 |
| Renderer scale / reference tile | 0.28 / 36 px |
| Body height | 125 source units |
| Total measured height | 139 source units |
| Head height | 38 source units |
| Shoulder width | 36 source units |
| Foot baseline | row 136 |
| Outline ink | #171725 |
| Head/body ratio | 30.4% |
| Shoulder/body ratio | 28.8% |

Granny's umbrella canopy and shaft are excluded from her body bounds; the gripping arm and hand remain included. The six-civilian QA bounds below are not yet demonstrated to use that same semantic exclusion mask. They are reported as the existing QA render-envelope measurements, not as calibrated anatomical ratios.

## 3. Six-character construction cards

The cards below record the design intent visible in the current rendered directions. They are not instructions to make the characters more alike.

### Usher — civic attendant

- **Pose class:** grounded, upright standing pose.
- **Silhouette language:** long formal uniform coat, compact cap, narrow trouser/leg column, clipboard as a secondary silhouette feature.
- **Head and face:** dark hair framing the face under a low-profile navy cap; brass cap band and badge create a strong head identity.
- **Torso and clothing:** vertically structured navy/steel uniform with gold piping, cuffs, and hem; the long coat gives Usher a clean civic silhouette.
- **Leg construction:** straight, restrained stance; shoes read as separate grounded contact shapes.
- **Signature prop:** clipboard with a readable paper face, clip, and detail. It remains visible in the side views after the profile correction.
- **Direction notes:** front is the clearest role statement; rear is intentionally quieter and relies on cap/hair, coat seams, and trim; both profiles retain the clipboard.
- **Preserve:** formal proportions, cap silhouette, restrained brass accents, and clipboard placement.
- **Polish watch:** rear-view identity is less information-dense than the front. Only add a rear detail if it strengthens the uniform rather than decorating an already clear silhouette.

### Cook — chef / food service

- **Pose class:** grounded, upright standing pose.
- **Silhouette language:** tall pleated toque above a broad, flared apron/coat mass; this is the widest and most apron-led silhouette in the six.
- **Head and face:** toque is the dominant headwear cue; the raised band clears the eye area. Hair and face remain distinct in profile.
- **Torso and clothing:** double-breasted cream coat under a terracotta apron, with ties and pocket; strong material/value separation.
- **Leg construction:** compact, straight stance below the apron; feet remain separated.
- **Signature prop:** copper sauté pan with a distinct bowl and handle; profile views preserve the pan and its orientation.
- **Direction notes:** the toque has transparent top headroom in all four views; front/back apron construction is deliberate; both profiles show the pan rather than dropping the role prop.
- **Preserve:** tall toque, apron flare, warm terracotta/cream contrast, and directional pan placement.
- **Polish watch:** keep the hand-to-handle overlap obvious at 28×42; do not enlarge the pan at the expense of the body silhouette.

### Courier — delivery / messenger

- **Pose class:** upright standing pose with a restrained forward-leaning character attitude.
- **Silhouette language:** swept cap, teal outerwear, diagonal strap, compact satchel, and separate parcel; the carried geometry creates a strong asymmetric identity.
- **Head and face:** swept storm cap with gold trim; profile face remains visible in both directions.
- **Torso and clothing:** teal windbreaker with layered collar and trim; forward lean distinguishes the posture from the formal Usher and Cook.
- **Leg construction:** narrow trouser/boot shapes with grounded foot placement.
- **Signature props:** cross-body satchel and parcel, with strap routing and hand/parcel contact maintained across front, back, and profiles.
- **Direction notes:** rear satchel placement and strap are important identity checks; both side views must preserve the face and parcel/satchel relationship.
- **Preserve:** forward attitude, teal palette, asymmetric messenger loadout, and parcel grip.
- **Polish watch:** monitor the close rear-view silhouette comparison with Coach; distinguish them through garment contour and loadout, not extra decoration.

### Runner — sprinter

- **Pose class:** dynamic airborne running pose. This is a separate pose family and must not be measured as if the legs form a vertical standing stack.
- **Silhouette language:** forward-leaning coral singlet, split shorts, bent/striding legs, sweatband, stopwatch, and bright technical shoes.
- **Head and face:** close-cropped hair beneath a yellow sweatband; face is intentionally compact relative to the moving pose.
- **Torso and clothing:** sleeveless coral race top and distinct shorts; bib 07 is the main front identifier.
- **Leg construction:** two separate stride legs with exposed tapered lower-leg anatomy and distinct shoes. The current side views read as two legs/two feet rather than a duplicate third leg.
- **Signature props:** bib 07 and stopwatch; the stopwatch arm/prop is part of the running identity and must remain attached in profile.
- **Direction notes:** side views carry most of the dynamic read; front/back remain intentional still poses and cannot rely on animation to repair anatomy.
- **Preserve:** airborne stride, split-short/calf separation, bright shoe shapes, and athletic energy.
- **Polish watch:** at 28×42, inspect the stopwatch and bib as small role details; do not force the leg landmarks into the standing-character proportion bands.

### Coach — veteran sideline tactician

- **Pose class:** grounded, upright standing pose.
- **Silhouette language:** stable jacket-and-trouser form with a low-profile cap, silver-templed hair, and clipboard held at the side/front.
- **Head and face:** mature face with silver temple locks and rear/profile hair visible below the cap.
- **Torso and clothing:** forest-green warm-up jacket, cream shoulder yoke, pockets, hem band, and a deliberate rear team mark; the yoke should follow the shoulder construction rather than become a broad generic chest panel.
- **Leg construction:** straight track trousers and pale court shoes; profile torso remains narrow enough to read as a side view.
- **Signature props:** clipboard with paper/markings and gold whistle/lanyard; hand-to-board overlap is visible.
- **Direction notes:** side views must keep the whistle on the forward side and retain the near clipboard arm; back view carries a distinct team mark and hair construction.
- **Preserve:** veteran face, green/cream garment identity, silver hair cues, and clipboard.
- **Polish watch:** previous internal review noted that the whistle pendant can be borderline-readable at native scale. A small mouthpiece/pendant clarity refinement is the most defensible optional polish; preserve the existing lanyard and avoid enlarging it into a second silhouette prop.

### Referee — match official

- **Pose class:** grounded, upright standing pose with one raised card arm.
- **Silhouette language:** striped official shirt, vermilion shorts, tall socks, compact dark headwear/hair, and raised yellow card.
- **Head and face:** short dark hair beneath the headband; profile nose/ear/face details and rear hair/nape keep the head intentional from all sides.
- **Torso and clothing:** black/ivory vertical stripe rhythm and a clean shirt-to-short transition; the broad front/back torso base is not allowed to leak into the side views.
- **Leg construction:** red shorts, tall socks, and separate dark shoes create a clear lower-body rhythm.
- **Signature prop:** yellow card held in the same anatomical hand across views; the hand overlaps the lower card edge.
- **Direction notes:** front/back reverse the viewer-side card position naturally; both profiles keep the card on the correct forward/rear-facing anatomical side.
- **Preserve:** striped uniform, raised-card silhouette, red shorts, and consistent card handedness.
- **Polish watch:** no new mandatory character-specific correction is established by this audit. Keep the card/hand contact and profile torso isolation as regression checks.

## 4. Current QA measurements

Run #464's npcBodyCheck passed. The following values are copied from its report.json for the six vector renderers. Bounds are the QA hook's reported 64×96 render envelope; they are **not** claimed to be accessory-excluded anatomical masks.

| Character | Render bounds (x, y; inclusive) | Envelope W×H | Foot row | Rendered height | Height deviation | Baseline delta | Contrast ratio |
|---|---:|---:|---:|---:|---:|---:|---:|
| Usher | 17–46, 1–82 | 30×82 | 82 | 35.4375 px | 0.4375 px | 1 | 4.08 |
| Cook | 14–60, 2–82 | 47×81 | 82 | 35.0000 px | 0.0000 px | 1 | 4.68 |
| Courier | 12–61, 2–82 | 50×81 | 82 | 35.0000 px | 0.0000 px | 1 | 4.75 |
| Runner | 13–49, 1–82 | 37×82 | 82 | 35.4375 px | 0.4375 px | 1 | 4.75 |
| Coach | 15–55, 3–82 | 41×80 | 82 | 34.5625 px | 0.4375 px | 1 | 3.66 |
| Referee | 14–59, 1–82 | 46×82 | 82 | 35.4375 px | 0.4375 px | 1 | 4.70 |

Run #464 aggregate results relevant to the six:

- NPC body/height/baseline check: **PASS**; 24 sprite measurements; expected adult body-height target 35 px; maximum deviation 0.4375 px; maximum baseline delta 1 px.
- Native directional integrity: **92/92 PASS**, with no edge contacts or detached large components.
- Face distinctness: **23/23 PASS** at native and game scale.
- Role-debug: **12/12 PASS**.
- Prop audit and gallery render: **PASS**.
- Page errors: **0**; script errors: **0**.
- Direct game-scale evidence: 20/20 for the five current Claude-review characters in run #464; Runner's four direct 28×42 views are available from run #457. This is complete six-character image coverage across two artifacts, not a single-run 24/24 assertion.

### Measurement-method gap

The current QA envelope measurements do not yet provide all of the standard's requested anatomical landmarks. In particular, they do not establish a consistent Granny-equivalent body-only mask that excludes headwear, handheld props, bags, and other accessories. They also do not provide reliable semantic landmarks for head top/chin, shoulder line, torso-to-pelvis, neck interval, or limb joints.

Therefore:

- Do not calculate or publish head/body, shoulder/body, torso/body, leg/body, or neck/body ratios from the envelope table above.
- Do not treat the envelope width as anatomical shoulder width; Cook's pan, Courier's carried load, and Referee's raised card can affect the silhouette envelope.
- Add a semantic measurement pass using one shared 100×140 source-space convention and documented masks/landmarks before locking proportion bands.
- Measure Runner with a pose-aware joint/region model; standing ratios are not directly comparable to the airborne stride.
- Keep Granny's existing values as measured reference facts, not targets that the six must match.

## 5. Provisional 100-point first-pass scorecard

The scores below are an internal visual first pass based on the actual native and direct game-scale renders. They are not calibrated against Claude's future judgments, do not establish approval, and must not be treated as hard thresholds. The score weights and interpretation remain draft.

| Character | Silhouette / proportions (20) | Head / face (15) | Anatomy / pose (15) | Clothing (15) | Props (10) | Palette (10) | Lighting (10) | Directions (5) | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Usher | 18 | 12 | 13 | 13 | 8 | 9 | 9 | 4 | **86** |
| Cook | 18 | 12 | 13 | 14 | 9 | 9 | 8 | 4 | **87** |
| Courier | 18 | 12 | 12 | 13 | 9 | 9 | 8 | 4 | **85** |
| Runner | 17 | 12 | 12 | 13 | 8 | 9 | 9 | 4 | **84** |
| Coach | 17 | 12 | 13 | 14 | 9 | 8 | 8 | 4 | **85** |
| Referee | 18 | 12 | 13 | 14 | 9 | 9 | 8 | 4 | **87** |

All six land in the draft 80–89 "promising / targeted polish expected" band. No character reaches the draft 90+ review-candidate band in this first pass. That is a prompt for comparative review, not an automated failure. The provisional 75% category floor is not being enforced.

## 6. Comparative silhouette and construction notes

- The six use visibly different silhouette strategies: long formal coat (Usher), flared apron/toque (Cook), forward messenger loadout (Courier), airborne stride (Runner), stable jacket/clipboard (Coach), and raised-card official (Referee).
- The strongest possible pairwise watch item in the current full-roster report is Coach/Courier back view at IoU **0.8939319190922546**. This is below the current 0.90 global failure threshold but close enough to retain for human review. Cook/Courier back is also a nearer pair at IoU **0.863231850117096**.
- The overall civilian-type silhouette audit still fails elsewhere: Clinic/Sailor front is IoU **0.9094292803970223**. This is a global roster issue, not evidence that one of these six automatically fails.
- Keep silhouette IoU as a review trigger. Do not change thresholds or reduce character individuality to optimize a single overlap number.

## 7. Next actions

1. **Build the semantic measurement pass.** Define consistent source-space body masks and head/shoulder/torso/leg/neck landmarks for Granny and all six. Exclude accessories from anatomy but store prop/accessory bounds and hand-contact points separately.
2. **Handle Runner as a distinct pose class.** Record hip, knee, ankle, shoulder, elbow, and foot landmarks per direction; compare its body masses and joint relationships rather than applying upright leg-height assumptions.
3. **Calibrate the draft ratio bands.** Use Granny plus these six only after the masks and landmarks are consistent. Record out-of-band examples and whether they are intentional, pose-driven, or genuine anatomy problems.
4. **Calibrate the scorecard.** Have Claude independently score the current five-character review scope and compare those scores with this internal first pass. Runner remains in this construction audit and can be scored in a later focused review.
5. **Optional targeted polish:** revisit Coach's whistle readability at native/game scale. Do not make speculative renderer changes to the other five without a concrete visual defect.
6. **Refresh evidence after any correction.** A new six-character review set should provide all 24 native views and all 24 direct 28×42 views in one run, with six-character contact sheets and the measurement report.
7. Keep all current approval gates, golden-snapshot policy, and remaining-20 hold unchanged.

## 8. Approval and QA status

- **Usher, Cook, Courier:** prior owner approvals are historical; the revised versions remain reopened / revision in progress and are not currently approved.
- **Runner, Coach, Referee:** built and targeted internal QA evidence exists; remain NOT APPROVED pending independent review and owner acceptance.
- **Claude review:** the prepared current review scope remains five (Usher, Cook, Courier, Coach, Referee). This audit does not add Runner to that submission.
- **Overall workflow:** run #464 remains FAILED on the full-roster civilian silhouette gate and the explicitly unapproved golden snapshots. The run also records missing-audio 404 console errors. No snapshots were refreshed or approved.
- **Remaining 20:** ON HOLD.

This audit applies the draft standard to the six current designs. It does not ratify the standard, approve any character, alter renderer code, change QA thresholds, or release the remaining roster.


## Semantic measurement system implementation update — 2026-11-19

The first reusable semantic measurement framework is now implemented in `qa/civilian-proportion-measurements.mjs`, driven by `qa/civilian-anatomy-landmarks.json`. It validates per-direction anatomical body polygons and landmarks, requires explicit headwear/prop polygon declarations, computes descriptive ratios, and uses joint landmarks rather than upright leg ratios for dynamic poses. Unit tests cover standing calculations, Runner-style dynamic joints, incomplete-direction rejection, and pending reports.

Granny's existing umbrella-excluded geometry is preserved as a legacy reference baseline. All six civilian entries are currently pending annotation. This is deliberate: the previous alpha-bound hook excludes props but not all headwear and cannot safely supply head/body or torso/body ratios. The browser QA workflow now runs the tests and structural check and uploads the generated measurement report. No ratio bands are hard-fail gates. The next step is to annotate and visually verify the six characters' four-direction landmarks from fresh renders.


**Annotation readiness update:** the six-character manifest now has explicit front/back/left/right annotation slots for every character. Source-space point and polygon bounds are validated against the 100×140 coordinate grid, and the structural check requires the exact six-character roster. Missing landmarks remain visibly pending; they are not synthesized from sprite bounds.


## Semantic measurement tooling follow-through — 2026-11-19

The follow-up measurement framework is implemented:
- `qa/civilian-proportion-measurements.mjs` computes ratios only from explicit semantic landmarks and separately bounded body/headwear/prop polygons.
- `qa/civilian-anatomy-landmarks.json` records Granny's existing values as `reference_only` and all six current NPCs as `pending_annotation`.
- `qa/test-civilian-proportion-measurements.mjs` tests standing ratios, dynamic Runner joint-only behavior, missing annotations and reference-only accounting.
- `qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md` defines how to annotate all four directions.

This implements the measurement engine and guardrails, not the actual landmark annotation. Semantic coverage remains 0/6 NPCs; Granny's legacy mask convention also needs harmonization before direct ratio calibration. The workflow runs the fixture tests and manifest structural check.


### Framework verification result

Run [#481](https://github.com/tinytime/Tinytime.github.io/actions/runs/44608283710) passed the semantic measurement fixture tests and manifest structural check. Artifact [14570697656](https://github.com/tinytime/Tinytime.github.io/actions/runs/44608283710/artifacts/14570697656) contains the generated `qa-output/civilian-proportion-measurements.json` alongside the browser QA evidence. The full workflow remains failed on the known global silhouette and unapproved snapshot gates, with audio 404 console errors. Semantic annotations remain pending for all six NPCs; a test pass does not create measured character ratios.


## Source-derived candidate annotation update — 2026-11-19

The six civilian records now contain first-pass source-derived candidate landmarks for front, back, left and right, based on the pinned `npc_sprites.js` draw paths at commit `8ac99ec8fd7eb7f2328eda7b7332d5e8f2d45317`. Candidate annotations include a coarse anatomical body polygon, headwear and prop exclusion polygons, head/chin/shoulder/pelvis/foot landmarks, and (for Runner) bilateral shoulder/elbow/wrist/hip/knee/ankle joints. The measurement report computes descriptive candidate ratios but labels these records `source_annotated`, not `measured`.

**Verification boundary:** these are manually transcribed source-geometry candidates, not pixel-traced/visually approved masks. The polygons are intentionally coarse and must be overlaid against fresh native 64×96 captures in all four directions; profile mirroring, hair/headwear boundaries, shoulder joints, prop exclusions, and Runner's stride joints require spot-check/correction before promoting any record to `measured` or using ratios for calibration. No proportion band is enforced, no renderer art changed, and no approval status changed.
