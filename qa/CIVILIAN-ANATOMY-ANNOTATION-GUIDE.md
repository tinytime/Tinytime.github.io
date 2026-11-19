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
- shoulderLeft, shoulderRight, shoulderY: anatomical shoulder endpoints and their shared y row. These are shoulder joints/contour transitions, not sleeve edges or props.
- pelvisY: consistent pelvis/hip transition used to divide torso and lower-body region.
- footBaseline: lowest anatomical foot contact row. Exclude props and trailing clothing; if a pose has no shared foot row, document why and use pose-aware foot contacts instead.
- bodyPolygon: explicit polygon around anatomical body.
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

Run #506 produced a complete overlay for all 24 native captures with the corrected source-to-capture affine fit. I visually inspected the artifact. The red outer contours now align with the rendered bodies far better than the first stretched-grid overlay; the blue headwear and yellow prop exclusions are in the correct broad regions. Runner's revised front/back/side contours include the limbs, the race bib is no longer excluded as a prop, and the stopwatch exclusion aligns with its wrist position. Referee's raised arm/hand is already included in the body contour; the card remains a separate yellow exclusion.

The inspection exposed a further semantic issue: side-profile shoulder landmarks had been placed at front-view widths, leaving green points outside the visible shoulder projection. All six characters' left/right profile shoulder landmarks have now been repositioned to a narrow, foreshortened pair; front/back shoulder landmarks remain full-width. This is a candidate correction, not a visual approval. A new run must regenerate and inspect the 24-capture overlay before promoting any record to `measured`.

Remaining coarse areas: some held-object exclusion polygons are intentionally broad (especially Cook's pan/handle, Courier's satchel/parcel, and Coach's clipboard), and should be tightened against individual pixels before ratio calibration. No thresholds or renderer artwork were changed.


Referee now uses a core body polygon plus separate raised-arm/hand anatomical appendage polygons. The measurement report preserves these as `anatomicalAppendagePolygons`; the overlay renders them in the body-mask color. This avoids forcing a complex raised-arm silhouette into a self-crossing single polygon.
