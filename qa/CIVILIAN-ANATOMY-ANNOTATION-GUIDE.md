# Semantic Civilian Anatomy Annotation Guide

## Purpose

This guide defines consistent source-space measurements for Granny Volt and the six current vector civilians. It replaces guesses based on full-sprite alpha bounds with explicit semantic masks and landmarks.

The tooling is descriptive only. It does not approve a character, enforce provisional proportion bands, or infer anatomy from rendered pixels.

## Coordinate system

- Annotate in the character renderer's local source coordinates, normalized to a 100×140 reference canvas.
- Origin is top-left; x increases rightward and y increases downward.
- Keep fractional coordinates when the renderer uses fractional paths.
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

`qa/civilian-anatomy-landmarks.json` currently records Granny's known measurements as `reference_only` and all six current civilians as `pending_annotation`. This is deliberate: no new landmark coordinates have been invented. The framework is implemented and testable, but no character is marked semantically measured until a human has annotated and reviewed all four directions.

## Safety rails

- Do not turn provisional bands or scorecard into hard CI failures.
- Do not infer anatomy from whole-sprite bounds, role debug boxes or prop extents.
- Do not remove distinctive design features to force a ratio into range.
- Do not compare Runner's airborne leg geometry to standing-character leg bands.
- Do not alter golden snapshots or character artwork as part of measurement annotation.


## Source-derived candidate annotation update — 2026-11-19

The six civilian records now contain first-pass source-derived candidate landmarks for front, back, left and right, based on the pinned `npc_sprites.js` draw paths at commit `8ac99ec8fd7eb7f2328eda7b7332d5e8f2d45317`. Candidate annotations include a coarse anatomical body polygon, headwear and prop exclusion polygons, head/chin/shoulder/pelvis/foot landmarks, and (for Runner) bilateral shoulder/elbow/wrist/hip/knee/ankle joints. The measurement report computes descriptive candidate ratios but labels these records `source_annotated`, not `measured`.

**Verification boundary:** these are manually transcribed source-geometry candidates, not pixel-traced/visually approved masks. The polygons are intentionally coarse and must be overlaid against fresh native 64×96 captures in all four directions; profile mirroring, hair/headwear boundaries, shoulder joints, prop exclusions, and Runner's stride joints require spot-check/correction before promoting any record to `measured` or using ratios for calibration. No proportion band is enforced, no renderer art changed, and no approval status changed.
