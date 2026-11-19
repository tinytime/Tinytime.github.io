# Semantic Civilian Anatomy Annotation Guide

## Purpose

This guide defines consistent source-space measurements for Granny Volt and the six current vector civilians. It replaces guesses based on full-sprite alpha bounds with explicit semantic masks and landmarks.

The tooling is descriptive only. It does not approve a character, enforce provisional proportion bands, or infer anatomy from rendered pixels.

## Coordinate system

- Annotate in the character renderer's local source coordinates, normalized to a 100×140 reference canvas.
- Origin is top-left; x increases rightward and y increases downward.
- Keep fractional coordinates when the renderer uses fractional paths. Store coordinates in the renderer's local, pre-transform coordinate system; do not pre-mirror left-facing records when the renderer itself flips them.
- Do not annotate from enlarged contact sheets or the 28×42 downsample. Use source renderer paths or native 64×96 capture mapped back to source space.
- Store the coordinate source and renderer commit before marking a record measured.

## Three independent geometry layers

1. **Anatomical body polygon:** head/hair, neck, torso, pelvis, arms, legs and feet. Exclude detachable role headwear and carried/handheld props. Keep actual hair and facial anatomy inside the body mask.
2. **Headwear polygons:** hats, caps, toques, headbands and other separate role headwear. Empty arrays are valid only when no separate headwear exists.
3. **Prop polygons:** clipboards, pans, parcels, satchels, stopwatches, whistles/lanyards, cards and other role equipment. Keep hand/prop contact points inspectable; never count carried objects as shoulder or torso width.

Clothing worn as part of the body silhouette remains in the anatomical body polygon unless it is a detachable accessory. Record difficult garment boundaries in the annotation note rather than changing conventions between characters.

## Required landmarks per direction

For each of front, back, left and right:

- headTop: top of anatomical scalp/hair, excluding separately bounded headwear.
- chin: bottom of chin, not collar or beard tip.
- shoulderLeft, shoulderRight, shoulderY: anatomical shoulder endpoints and the representative shoulder row. Front/back endpoints must share a y row; profile endpoints may differ by at most one source unit because of foreshortening, and shoulderY must lie between them. These are shoulder joints/contour transitions, not sleeve edges or props.
- pelvisY: consistent pelvis/hip transition used to divide torso and lower-body region.
- footBaseline: lowest anatomical foot contact row. Exclude props and trailing clothing; if a pose has no shared foot row, document why and use pose-aware foot contacts instead.
- bodyPolygon: explicit polygon around the core anatomical body.
- bodyAppendagePolygons: optional additional anatomical regions when a single body polygon would self-intersect (for example, Referee's raised arm and hand). These are included in the anatomical mask, not treated as props.
- headwearPolygons and propPolygons: explicit exclusion geometry arrays, including empty arrays where appropriate.

For Runner, additionally annotate both shoulders, elbows, wrists, hips, knees and ankles in every direction. Runner is a dynamic airborne pose; the system reports joint paths and deliberately does not compute a standing leg-height ratio.

## Derived measurements

The script derives descriptive values only:

- body height = foot baseline − head top + 1
- head height = chin − head top + 1
- shoulder width = Euclidean distance between shoulder landmarks
- torso region = pelvis y − shoulder y
- neck interval = shoulder y − chin
- standing lower-body region = foot baseline − pelvis y
- ratios are percentages of the body-height interval

These are landmark interval ratios, not pixel-area ratios. Do not compare them to Granny's legacy percentages until her reference has been re-annotated with the same mask and landmark convention.

## Annotation workflow

1. Pin the exact renderer commit and character source.
2. Open all four native directions.
3. Annotate body, headwear and prop polygons independently.
4. Place semantic landmarks; record ambiguous boundaries and rationale.
5. For dynamic Runner, annotate all 12 required joints per direction.
6. Run `node qa/test-civilian-proportion-measurements.mjs`.
7. Run `node qa/civilian-proportion-measurements.mjs --check`.
8. Inspect `qa-output/civilian-proportion-measurements.json`; verify it matches source annotations, not merely that the script exits successfully.
9. Have a second reviewer spot-check landmarks before using ratios for calibration.

## Current manifest status

`qa/civilian-anatomy-landmarks.json` records Granny's known measurements as `reference_only` and all six current civilians as `source_annotated`. The six candidate sets were transcribed from renderer paths and pass structural validation, but are not verified measurements. Do not promote them to `measured` until every direction's overlay has been visually checked and corrected, including headwear/prop exclusions and anatomical landmarks. The browser QA workflow now emits `six-civilian-annotation-overlay.png` and a machine-readable summary to make this review repeatable.

## Safety rails

- Do not turn provisional bands or scorecard into hard CI failures.
- Do not infer anatomy from whole-sprite bounds, role debug boxes or prop extents.
- Do not remove distinctive design features to force a ratio into range.
- Do not compare Runner's airborne leg geometry to standing-character leg bands.
- Do not alter golden snapshots or character artwork as part of measurement annotation.


## Source-derived candidate annotation update — 2026-11-19

The six civilian records now contain first-pass source-derived candidate landmarks for front, back, left and right, based on the pinned `npc_sprites.js` draw paths at commit `8ac99ec8fd7eb7f2328eda7b7332d5e8f2d45317`. Candidate annotations include a coarse anatomical body polygon, headwear and prop exclusion polygons, head/chin/shoulder/pelvis/foot landmarks, and (for Runner) bilateral shoulder/elbow/wrist/hip/knee/ankle joints. The measurement report computes descriptive candidate ratios but labels these records `source_annotated`, not `measured`.

**Verification boundary:** these are manually transcribed source-geometry candidates, not pixel-traced/visually approved masks. The polygons are intentionally coarse and must be overlaid against fresh native 64×96 captures in all four directions; profile mirroring, hair/headwear boundaries, shoulder joints, prop exclusions, and Runner's stride joints require spot-check/correction before promoting any record to `measured` or using ratios for calibration. No proportion band is enforced, no renderer art changed, and no approval status changed.


## Native overlay inspection — 2026-11-19

The first QA artifact overlay was generated locally from Run #487's actual 64×96 native captures. This is a preliminary visual spot-check, not final annotation acceptance. It confirms the candidate body contours generally track the broad character silhouettes, but several exclusions and joints remain visibly coarse. Referee's raised-card arm/hand needs to be included in the anatomical body polygon while the yellow card remains excluded; the front card exclusion is currently on the wrong side. Cook and Courier handheld-object boundaries, Usher's clipboard, Coach's clipboard, and Runner's dynamic joints also require direction-by-direction correction. The overlay maps the 100×140 local source space to 64×96 pixels and mirrors x for left-facing captures where the renderer flips the local path; authoritative coordinate values remain in unflipped source-space.

The existing five-civilian contact sheet covers Usher, Cook, Courier, Coach and Referee; it does not include Runner. Runner's four-direction captures are available separately in the browser artifact and are included in the new six-civilian overlay step. No annotation is promoted to `measured` from this spot-check. A fresh workflow artifact is required after the overlay step is committed.


The overlay renderer was corrected to apply the left-facing x mirror at display time. Manifest geometry remains in local pre-flip coordinates for all directions. This avoids double-mirroring accessory polygons and keeps measurements consistent with the renderer transform.


## Runner annotation correction — 2026-11-19

Native overlay inspection showed that the initial Runner candidate wrongly classified the race bib and an arm region as props and placed shoulder/elbow/wrist/knee/ankle landmarks too centrally. The manifest now keeps the bib as clothing, uses only the stopwatch as a prop exclusion (front and side; none on back), expands the anatomical outer contour to follow both arm silhouettes and the stride, and relocates bilateral joints to source-defined limb segments. This is still a candidate revision; the next fresh six-character overlay must be inspected before acceptance.


## Runner and directional-mask refinement — 2026-11-19

Runner's race bib is part of the singlet and remains inside the body/garment mask; it is not a detachable prop. The wrist stopwatch is the prop exclusion where visible, and the back view explicitly has no prop polygon. Runner's joint candidates were revised using the actual sprint leg paths in `npc_sprites.js`, including separate profile near/far knees and ankles. These remain candidate landmarks pending visual verification; they do not yet support a measured or calibrated result.

Courier's cap polygon was tightened to the source crown/visor path. Referee's body candidate now follows the raised sleeve contour in all views, with direction-specific yellow-card exclusions. These corrections improve the candidate overlays but do not constitute visual approval.


## Native coordinate-fit correction — 2026-11-19

The first overlay renderer incorrectly stretched the 100×140 local coordinate grid across the full 64×96 PNG. The sprites occupy only part of that capture, so that overlay was not a valid pixel-alignment check and its apparent boundary offsets must not be used to alter annotations. The overlay renderer now maps source x around the native capture centerline (source x=50 to capture x=32), mirrors left-facing x at display time, and fits y independently for each character from its headwear top to the shared native foot baseline. This accommodates the renderer's differing vertical transforms, including Runner's y-scale. A fresh workflow artifact is required before any further pixel-level mask judgments are made.


## Corrected native overlay review — 2026-11-19

Run #506 produced a complete overlay for all 24 native captures with the corrected source-to-capture affine fit. I visually inspected the artifact. The red outer contours now align with the rendered bodies far better than the first stretched-grid overlay; the blue headwear and yellow prop exclusions are in the correct broad regions. Runner's revised front/back/side contours include the limbs, the race bib is no longer excluded as a prop, and the stopwatch exclusion aligns with its wrist position. Referee's raised arm/hand is represented by separate `bodyAppendagePolygons` alongside the core body polygon to avoid a self-intersecting contour; the card remains a separate yellow exclusion.

The inspection exposed a further semantic issue: side-profile shoulder landmarks had been placed at front-view widths, leaving green points outside the visible shoulder projection. All six characters' left/right profile shoulder landmarks have now been repositioned to a narrow, foreshortened pair; front/back shoulder landmarks remain full-width. This is a candidate correction, not a visual approval. A new run must regenerate and inspect the 24-capture overlay before promoting any record to `measured`.

Remaining coarse areas: some held-object exclusion polygons are intentionally broad (especially Cook's pan/handle, Courier's satchel/parcel, and Coach's clipboard), and should be tightened against individual pixels before ratio calibration. No thresholds or renderer artwork were changed.


Referee now uses a core body polygon plus separate raised-arm/hand anatomical appendage polygons. The measurement report preserves these as `anatomicalAppendagePolygons`; the overlay renders them in the body-mask color. This avoids forcing a complex raised-arm silhouette into a self-crossing single polygon.


## Run #517 native overlay review — 2026-11-19

[Run #517](https://github.com/tinytime/Tinytime.github.io/actions/runs/44613152087) passed semantic annotation validation and emitted all 24 native direction overlays. The latest overlay was visually inspected: the six core masks and accessory exclusions generally track the renders; Referee's raised arm/hand is now separated into two appendage polygons per direction and no longer creates a self-crossing line through the face. The left-facing display transform is mirrored at render time while manifest points remain in pre-flip local coordinates. The profile shoulder validator now allows a maximum one-source-unit vertical offset; front/back points must remain on one row. Runner's stride joints are more plausibly aligned than the first draft but remain candidate landmarks. Cook's pan/handle and Courier's parcels/satchel and Coach's clipboard remain broad exclusion boxes and need pixel-tight refinement before measurement acceptance.

Run #517 measurement report: 7 records total; Granny 1 `reference_only`; six `source_annotated`; 0 verified `measured`; 6 pending visual verification; no thresholds enforced. Dedicated tests passed (43 checks), manifest validation passed, and the overlay contains 24/24 captures. Overall browser QA still failed on the existing game-wide civilian silhouette gate (max full-body IoU 0.909429; max torso-mask IoU 0.923077), the unapproved golden snapshot baseline (1 match / 23 changed), and 180 missing audio-file 404s. No golden snapshots were changed or approved. See artifact `14573916586` for captures, overlays and diagnostics.


## Direction-specific prop mask refinement — 2026-11-19

Renderer path inspection was used to tighten the object exclusions. Usher's front and rear clipboard bounds now reflect their distinct board placements. Cook's pan and handle are traced separately in front/profile views, with no pan exclusion in the rear view. Courier's satchel and parcel polygons now follow their actual six-point object paths; the rear view excludes only the satchel. Regression assertions lock these directional differences, Runner's stopwatch-only exclusion, and the profile shoulder-row alignment. These remain candidate masks pending another visual inspection of the next generated artifact.


## Direction-specific prop refinement — Run #522, 2026-11-19

The next native overlay pass ([Run #522](https://github.com/tinytime/Tinytime.github.io/actions/runs/44613594260), artifact `14572968146`) confirms that the direction-specific exclusion polygons are materially tighter. Cook's front pan/handle, back (explicitly empty), and side pan/handle masks now follow the actual visible objects. Courier's front two carried items, back satchel, and side-view parcel/satchel masks are now distinct per direction instead of reusing one generic pair. Usher's clipboard is also direction-specific. The overlay was inspected across all 24 captures. Coach's clipboard remains the broadest outstanding exclusion and should be tightened next; all candidates remain unverified until the remaining prop and anatomy boundaries are pixel-checked. The run's semantic validation and overlay generation passed; overall browser QA remains failed on the unrelated game-wide silhouette/golden/audio gates described in the run artifact.


## Coach prop mask correction — 2026-11-19

Coach's clipboard polygons now follow the actual front and side renderer paths, and the rear view explicitly has no clipboard/whistle exclusion. Regression tests cover this alongside Cook's rear no-pan, Courier's rear satchel-only, and Runner's stopwatch-only masks. The earlier broad rectangles are no longer the active candidate geometry. These refined polygons still need pixel-level visual review in the next fresh artifact.


Coach's directional prop mask has now been corrected from the actual draw paths: front includes the clipboard and whistle, back explicitly has no prop exclusions, and side views use the foreshortened clipboard and whistle bounds. The next fresh overlay is required to confirm these tighter bounds; the candidates remain pending verification.


## Run #530 native overlay review — 2026-11-19

Inspected the generated six-civilian overlay from [Run #530](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614186989), artifact `14573802446`, against all 24 native 64×96 directional captures. The overlay maps the source-space polygons to each character's actual native headwear top and foot baseline, and mirrors the left-facing capture for display. Broad body contours, headwear exclusions, and direction-specific prop exclusions visually track the captured silhouettes. Coach's rear view correctly has no prop exclusion; Cook's rear pan is empty; Courier's rear excludes only the satchel; Runner's dynamic body and joint markers remain distinct; Referee's raised arm/hand is included through separate appendage polygons while the card and whistle remain excluded.

The six records' provenance is updated to `candidate_visually_spot_checked_run530`. This is a visual spot-check, not pixel tracing or final measurement acceptance. Candidate polygons remain manually transcribed and coarse; the ratios are descriptive candidates only. All six remain `source_annotated`; Granny remains `reference_only` and must be semantically harmonized before direct comparison. The measurement validator passed, generated all 24 overlays, and the report contains 6 source-annotated candidates, 0 verified measurements, and 6 pending. No thresholds were enforced.

Browser QA overall still fails on the established game-wide gates: full-body civilian silhouette maximum IoU `0.909429` (Clinic/Sailor front; Coach/Courier back `0.893932`), torso-mask maximum IoU `0.923077` (Kid2/Mouse side), unapproved golden snapshot baseline (1 match / 23 changed), and 180 missing audio-file 404s. The existing `npcBodyCheck` passes (24 sprites; max height deviation 0.4375 px; max baseline delta 1), the 92-capture visual-integrity audit passes, the gallery visual pass succeeds, and the prop audit passes. No golden snapshots were refreshed or approved.


## Run #534 six-civilian overlay verification — 2026-11-19

Inspected \`six-civilian-annotation-overlay.png\` from [Run #534](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614783942), artifact \`14574047896\`, tested commit \`5db307350e3e93db05d1145b1aeb9da3a7273b73\`. All 24 native directional captures were present. The red body, blue headwear, yellow prop, green shoulder and magenta Runner-joint overlays are broadly aligned with their respective rendered figures and expose where each annotation sits. This is a visual review aid only: the candidate polygons remain coarse/manual and need pixel-tight source-coordinate refinement before the records can be promoted to \`measured\`. All six remain \`source_annotated\`; Granny remains \`reference_only\`.

Run #534 semantic validation and overlay generation passed. The full browser workflow failed on the 23-character full-body silhouette gate (max IoU 0.909429; Clinic/Sailor front and Coach/Courier back are the closest pairs), the unapproved golden baseline (1 match / 23 changed), and 180 audio 404s. The 92-capture integrity audit, archetype silhouette quality gate, NPC body check and gallery passed; page/script errors were zero. No golden snapshot was refreshed or approved.


## Granny four-direction semantic capture — candidate only

The browser workflow now runs `qa/build-granny-semantic-overlay.mjs`. It instantiates the live `createGrannyRenderer` implementation and emits four 100×140 source-space captures with the umbrella excluded from the body pass, plus a separate full render for visual comparison. It disables ground effects and fixes the idle phase to zero. The overlay separates both the canopy and shaft as umbrella props, and retains the raised gripping arm/hand as anatomy. Granny has no separate worn headwear; her silver hair remains part of the anatomical body. Side-view coordinates remain in renderer-local space: the renderer applies the 0.72 horizontal profile scale and mirrors the left-facing pose. The output `granny-semantic-candidate.json` and `granny-four-direction-semantic-overlay.png` are review artifacts, not accepted measurements. The hand-transcribed polygons are intentionally marked `candidate_source_annotated`; no values are copied into `qa/granny-ref.json`, and no legacy baseline or proportion band is changed. Before promotion, inspect all four generated images against the native renderer captures and correct the head, shoulder, arm, pelvis, foot and prop boundaries. Confirm that `createGrannyRenderer` is exposed in the browser runtime and that the capture coordinate fit is exact; if the script cannot access the renderer or produces clipped captures, treat the run as failed and do not use its candidate coordinates.


## Run #540 Granny capture result and visual inspection — 2026-11-19

Run [#540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44621620719), artifact `14578155959`, successfully captured all four directions from the live renderer. The first attempt failed because the script queried `window.createGrannyRenderer`; the actual API is `window.NPC_SPRITES.createGrannyRenderer`. The script was corrected and the Granny capture step now passes. Native source-space renders are 100×140, ground effects are disabled, idle phase is fixed, body-only output excludes the umbrella, full output is retained for comparison, and the renderer itself applies the 0.72 side scale and left-facing mirror.

I inspected `granny-four-direction-semantic-overlay.png` and the individual left/right body captures. The four renderings are present and correctly oriented. The red body polygons are still broad/manual candidate contours rather than pixel-tight masks; do not call them verified. Refine head/face, shoulder/upper-arm joins, raised umbrella-gripping hand/arm, torso/coat outline, legs/feet and canopy/shaft exclusions against the actual pixels. Front/back approved measurements remain unchanged; side-view ratios remain a separate unresolved problem. Granny remains `reference_only` and no candidate is promoted to `measured`.

Run #540 semantic validation passed; six-civilian overlay 24/24 and five-civilian review sheet 20/20 native plus 20/20 direct game-scale passed. Overall browser QA failed independently: browser diagnostics reported audio HTTP 404s; full-roster silhouette max IoU was `0.909429`; golden snapshot gate was 1 match / 23 changed with baseline unapproved. No golden snapshots or approvals changed.


## Pixel-exact Granny silhouette mask capture — implementation pending QA

The Granny capture script now derives row-run alpha masks directly from the live renderer's 100×140 body-only and full renders. Each direction records inclusive per-row spans, pixel bounds, pixel count, and the alpha threshold (>8/255). The body mask comes from the umbrella-excluded pass and retains the raised gripping hand/arm; the exposed umbrella delta is computed from full-render alpha pixels absent from the body pass. These masks are stored in `granny-semantic-candidate.json` under `pixelMasks` and are distinct from the existing coarse hand-authored polygons and landmarks. The mask capture is intended to provide exact renderer-pixel silhouette evidence rather than treating broad polygons as measurements.

Implementation commits: `0a9a008ac26477d4831d2bc804f97c7b8d1b5361` (manifest field) and `6795c57e37f3252df44fa06ed4d31e7af3446061` (alpha-mask extraction). **Not yet browser-tested or visually inspected.** Do not promote Granny or civilian records to `measured`; do not change `qa/granny-ref.json`, legacy front/back values, side ratios, proportion bands, or golden snapshots. The next QA run must confirm four direction masks are emitted, row spans are valid and bounded to 100×140, body/full/delta counts are coherent, and the resulting artifact is inspected before using the masks for measurement work.


### Mask integrity checks added before browser QA

The capture now validates each generated body, full-render, and umbrella-delta mask before writing the candidate JSON: exactly 140 row arrays; every inclusive span bounded to x=0..99 with start <= end; and the sum of span widths equals the reported pixel count. It also rejects a body mask larger than the full-render mask and records the umbrella-delta bounding box. These checks protect the manifest against malformed or internally inconsistent masks; they do not establish anatomical correctness or approval.

Validation implementation commit: `b31c7cbb4fc326e666b961fd7c6444a1a78f77b3`. Browser execution and artifact inspection are still pending; candidate statuses and approved Granny measurements remain unchanged.


## Granny-specific semantic partition — 2026-11-19

The live Granny renderer has no separate worn headwear. Her silver hair cap and side sweep are part of the anatomical head/hair silhouette and must remain in the body mask. The pink overhead canopy and its descending shaft are the carried umbrella prop and belong in `propPolygons`, not `headwearPolygons`. The small gripping hand and raised forearm remain anatomy; the shaft mask must stop at the hand/shaft contact and must not erase the hand. The umbrella-excluded renderer pass omits canopy and shaft while retaining the grip, making it useful source evidence for this partition.

The initial candidate overlay incorrectly labelled the canopy as headwear and its shaft polygon extended through the grip. The capture script now records empty headwear arrays in all four directions, separates the canopy and shaft into two prop polygons, and validates those semantic declarations and their bounds before writing the candidate manifest. The canopy contour remains a manually sampled candidate polygon—not a pixel-traced verified prop boundary—and must be checked against the full-render PNG in each direction. Do not promote Granny to `measured` until this review is complete.


## Pixel-exact Granny mask visualization — 2026-11-19

The Granny capture now emits `granny-pixel-mask-overlay.png` in addition to the existing coarse candidate polygon sheet. It overlays the exact alpha row masks from the live 100×140 renderer captures: cyan marks the umbrella-excluded body pass (including hair, clothing and the gripping hand/arm); gold marks visible umbrella pixels present in the full render but absent from the body pass. The overlay is evidence for reviewing the actual raster boundary, not an automatic anatomy classifier or a new measurement state.

The semantic convention is explicit: Granny has no separate worn headwear; silver hair is anatomical hair. Both canopy and shaft are parts of the carried umbrella and are props. The grip/hand/forearm remain anatomy. The umbrella-delta mask contains only visible umbrella pixels not occluded by the character; it must not be interpreted as the full hidden geometric extent of the prop. Inspect the new four-direction sheet against the original full/body captures before accepting any landmarks. Granny remains `reference_only` until that visual verification and the profile convention review are complete.


## Candidate polygon-to-pixel fit diagnostics — 2026-11-19

When a capture provides exact renderer alpha row masks, compare candidate semantic polygons with those masks instead of relying only on visual impression:

1. Rasterize the body polygon plus all anatomical appendage polygons into the same 100×140 output grid, using pixel-center inclusion. Apply the exact renderer transform used by the capture (Granny profiles: 0.72 horizontal scale; left view additionally mirrors).
2. Compare that candidate raster with the exact umbrella-excluded `bodyAlpha` mask. Record intersection-over-union (IoU), precision, recall, candidate-only pixels and reference-only pixels. Low recall indicates missing visible body pixels; low precision indicates candidate overreach. Inspect the difference by direction before editing landmarks.
3. Rasterize prop polygons separately. Compare their coverage of the visible `umbrellaExposedDelta` pixels, but do **not** treat candidate pixels outside that delta as false positives: the prop polygon may correctly include umbrella geometry hidden behind the character. Record visible-pixel coverage and uncovered visible pixels.
4. Keep these metrics diagnostic and non-gating until multiple successful and failed examples have been reviewed. No universal IoU/precision/recall threshold is established by this one character.
5. Pixel masks are renderer evidence, not semantic labels by themselves. A mask that excludes a prop can still include hair, clothing and anatomy; human review must confirm the semantic convention and all hand/prop contact boundaries.

The reusable implementation is `qa/granny-mask-fit.mjs`, exercised by `qa/test-granny-mask-fit.mjs` and emitted by `qa/build-granny-semantic-overlay.mjs` as `granny-pixel-mask-fit-report.json`. This method is a calibration aid for future NPC annotations; do not assume every renderer can provide an automatic prop-excluded alpha pass.
