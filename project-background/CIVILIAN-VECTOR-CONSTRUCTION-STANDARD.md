# Vapor City Civilian Vector Construction Standard

**Status:** Draft for independent review and owner ratification  
**Created:** 2026-11-19  
**Benchmark:** Granny Volt (approved 10/10 quality reference)  
**Applies to:** The 23 civilian redesign characters; Granny Volt remains the separate reference baseline.

> This document establishes a repeatable design and measurement process. It does not authorize renderer changes, approve any pending character, refresh golden snapshots, or release the remaining 20 characters from their current hold.

## 1. Purpose and governing principle

Build a coherent cast of individually recognizable characters—not one generic body recolored 23 times.

Granny Volt demonstrates the desired level of finish, clarity, personality, and directional consistency. She is a **quality and craft benchmark**, not a proportion, silhouette, outfit, palette, or prop template.

Every character must satisfy the shared technical and QA rules while retaining an original:
- silhouette and shape language;
- head, face, expression, and hair/headwear;
- anatomy, stance, and pose;
- garment construction and material treatment;
- role-specific prop design and attachment;
- palette and value hierarchy.

When a universal rule conflicts with a character's intentional identity, preserve identity and document the exception. Never silently weaken a technical or QA gate.

## 2. Granny Volt: measured reference geometry

Source of truth: `qa/granny-ref.json`, generated from browser-rendered `drawGrannyVoltSprite` output. The measurement pass excludes the umbrella canopy and shaft and disables ground effects; the gripping hand and arm remain in the body measurement.

| Measurement | Granny reference |
|---|---:|
| Native source coordinate grid | 100 × 140 |
| Source origin Y offset | 3 |
| Renderer scale | 0.28 |
| Reference tile size | 36 px |
| Body height | 125 source units |
| Total measured height | 139 source units |
| Head top row | 12 |
| Head height | 38 source units |
| Neck row | 49 |
| Shoulder measurement row | 50 |
| Shoulder width | 36 source units |
| Foot baseline row | 136 |
| Outline ink | `#171725` |
| In-game body height | 35 px |
| In-game full height | 38.92 px |
| In-game body width | 15.4 px |

Derived descriptive ratios (not universal requirements):
- Head height / body height = 38 / 125 = **30.4%**.
- Shoulder width / body height = 36 / 125 = **28.8%**.
- Body height / total measured height = 125 / 139 = **89.9%**.

The body-height measurement excludes the umbrella. Accessory bounds must never inflate anatomical height or width metrics. The measured source is the rendered asset, not a hand-estimated drawing box.

## 3. Shared technical invariants

These are the initial common implementation constraints, subject to confirmation against the live renderer:

1. Use the established 100 × 140 source-coordinate convention and current renderer placement/scale unless a documented technical exception is approved.
2. Preserve the existing game anchor, tile placement, direction codes, animation inputs, and dispatch behavior.
3. Keep the intended foot-contact baseline aligned to the character's approved anchor. Granny's reference row is 136; new character geometry must be measured and calibrated to the same in-game foot contact rather than blindly forcing every shoe to the identical local coordinate.
4. Use the established dark outline ink `#171725` as the default shared ink. Any alternate outline treatment requires a visual reason and review.
5. Keep stroke weights and joins visually coherent at the actual 28 × 42 game scale and at native 64 × 96 QA scale.
6. Render intentional front, back, left, and right views. A mirrored profile is acceptable only when the character's anatomy, handedness, props, and asymmetry remain correct after mirroring.
7. Props and accessories are separate from anatomical measurement bounds. Record their bounds and attachment points independently.
8. Do not allow legacy pixel layers to overwrite the dedicated vector render.
9. Preserve town/gallery integration and existing unrelated NPC behavior.
10. Do not change golden snapshots or their provenance without explicit owner authorization.

The exact 0.28 scale and 36 px tile reference describe Granny's current renderer. They are a compatibility reference, not permission to change the global renderer scale for other NPC families.

## 4. Proportion specification: measure, don't clone

### 4.1 Measurement definitions

For each character, record the following from the rendered front view and verify the relevant geometry in all four views:

- **Body height:** top of anatomical head/hair (excluding detached or role-specific headwear when it is an accessory) to lowest foot-contact pixel; document the convention used.
- **Head height:** top of cranium/hair mass to chin/jaw, excluding tall hats, helmets, hair accessories, or other separate props.
- **Shoulder width:** maximum anatomical shoulder span at the shoulder line; exclude sleeves that deliberately flare and carried objects.
- **Torso height:** shoulder/neck junction to pelvis/garment waist landmark. Record garment and anatomy bounds separately when they differ.
- **Leg region:** pelvis/waist landmark to foot-contact baseline. For bent, airborne, seated, or running poses, record the bounding box and joint landmarks rather than pretending the legs form a vertical stack.
- **Neck height:** visible neck interval between jaw/head and shoulder/torso junction.
- **Limb widths and gaps:** record upper/lower arm and leg widths, plus visible negative-space gaps between limbs and torso.
- **Prop footprint:** independent bounding box, attachment/hand-contact point, and whether the prop is part of the character's silhouette.

### 4.2 Provisional exploration bands

The following are **draft exploration bands**, not locked acceptance thresholds. They are intentionally broad and must be tested against the five-character review set and Granny before automation or enforcement.

| Metric | Draft exploration band | Denominator / notes |
|---|---:|---|
| Head height | 25–34% | Body height; exclude tall headwear and props |
| Shoulder width | 24–34% | Body height; measure anatomical shoulder span |
| Torso height | 30–40% | Body height; landmark-based, may overlap neck/junction conventions |
| Leg region height | 38–48% | Body height; pose-aware, not a rigid vertical segment |
| Visible neck height | 4–8% | Body height; may be partly occluded by clothing |

These bands are not additive and must not be summed to 100%. Anatomy is measured using landmarks and overlapping rendered regions; clothing, hair, footwear, and pose can alter visible boundaries. A deliberate character design may fall outside a band if the silhouette remains believable, readable, and internally coherent. Record the reason and have it reviewed.

**Do not automatically fail a character for an out-of-band proportion.** First validate the measurement convention, pose category, and intended design. A numeric range is a diagnostic prompt, not an art director.

### 4.3 Per-character proportion card

Before detailed vector construction, create a short specification with:
- intended height/build category and pose category;
- target head/body and shoulder/body ratios;
- torso and leg landmarks;
- intended shoulder, hip, and foot-contact shape;
- asymmetry and handedness;
- silhouette-defining clothing/headwear;
- prop bounds and hand/attachment points;
- any intentional departures from the draft bands.

Do not copy Granny's values by default. Set values that serve the character's role and silhouette.

## 5. Character identity and silhouette requirements

Before colour or detail work, render each of the four views as a single solid silhouette.

The silhouette must:
- identify the character's broad role/personality without relying on colour or tiny detail;
- have a distinctive outer contour and intentional negative spaces;
- remain distinguishable from other civilians at thumbnail and game scale;
- show a deliberate relationship between body, clothing, hair/headwear, and signature props;
- avoid accidental tangencies, detached components, or fused limbs/props;
- remain recognizable from front, back, and both profiles.

A prop can contribute to the silhouette, but it cannot be the only thing making an otherwise generic body recognizable. Compare the roster pairwise and inspect the most similar pairs manually. Automated intersection-over-union (IoU) is a flag for review, not a substitute for judgment: high overlap may reveal a genuine duplicate, while pose or prop differences can also make two characters distinct despite similar body masses.

## 6. Anatomy, face, clothing, and props

### Anatomy and pose
- Head, neck, torso, pelvis, arms, hands, legs, and feet must connect plausibly.
- Side profiles should normally show one visible near arm; hide the far arm behind the torso unless the pose clearly establishes its separate plane.
- Limbs must be distinguishable from clothing folds and props.
- Feet/shoes must read as separate contact shapes and align to the intended stance.
- Dynamic poses must read correctly as static directional sprites; animation cannot repair unclear anatomy.

### Face and head
- Design an individual face, not a shared generic face with recoloured hair.
- Front, side, and rear head construction must be considered independently.
- Profiles need a readable forehead/nose/chin contour and correctly placed visible eye/ear details where appropriate.
- Back views need deliberate hair/headwear/nape construction rather than a blank head fallback.
- Facial details must survive actual game scale; do not add detail that collapses into noise.

### Clothing
- Garments need clear volume, layering, closures, collars, cuffs, seams, pockets, hems, folds, and material cues where appropriate.
- Details must explain construction and form; decorative lines without a structural purpose should be limited.
- Front/back/profile garment logic must agree. Avoid reusing a shared body shell and only changing colours.

### Props and accessories
- Every signature prop needs a clear shape, readable scale, consistent handedness, and believable attachment/contact.
- Hands must visibly grip, support, or interact with the prop.
- Prop geometry is measured separately from anatomy.
- A prop that becomes an unreadable speck at 28 × 42 does not count as a successful role identifier.

## 7. Palette, value, lighting, and vector finish

For each character, define palette roles before assigning individual fills:
- outline/ink;
- primary garment;
- garment shadow and highlight;
- secondary garment/material;
- skin base/shadow/highlight;
- hair/headwear base/shadow/highlight;
- signature accent;
- prop base/shadow/highlight.

Use a clear value hierarchy: the viewer should know where to look first, second, and third. The signature colour or prop should attract attention without making every surface equally saturated.

Use gradients and highlights to describe volume and material, not as decoration for its own sake. Skin, cloth, leather, metal, hair, and hard props should have distinguishable treatments. Avoid excessive gradient bands, muddy midtones, indistinguishable adjacent values, and tiny details that disappear at game scale.

The visual target is Granny's cohesion and finish—not her pink/purple/silver palette or umbrella.

## 8. Four-direction and scale review

Every candidate requires:
1. Native 64 × 96 captures: front, back, left, right.
2. Enlarged nearest-neighbour views for edge/path inspection.
3. Direct in-game 28 × 42 captures in all four directions where the harness supports them.
4. Solid-black silhouette sheet for all four directions.
5. Role-debug/layer evidence when supported by the renderer.
6. Gallery and town-context evidence.
7. Inspection of clipping, edge contacts, detached components, limb/prop overlap, handedness, baseline, and readability.

A derived downsample is not a substitute for a direct in-game capture; label evidence accurately. A standard town screenshot is not proof that a particular character was spawned if the roster does not include that character.

## 9. Proposed 100-point internal design scorecard

This scorecard is a structured review aid, not a replacement for the approval gates. Scores must be supported by actual renders, not source-code descriptions alone.

| Category | Weight |
|---|---:|
| Silhouette and proportions | 20 |
| Head, face, and expression | 15 |
| Anatomy and pose | 15 |
| Clothing construction | 15 |
| Props and accessories | 10 |
| Palette and value contrast | 10 |
| Lighting and shading | 10 |
| Four-direction consistency | 5 |
| **Total** | **100** |

Suggested scoring interpretation:
- 90–100: strong candidate for independent review;
- 80–89: promising, but targeted polish is expected;
- below 80: revise before independent review.

Suggested category floor: 75% of each category's available points. A high total cannot compensate for a failed face, silhouette, anatomy, or prop integration category.

**These weights, score bands, and category floors are provisional.** Claude and the project owner must review them before they become mandatory. A score of 90+ never constitutes Claude review or owner approval.

## 10. Automated QA metrics and failure policy

Automate objective checks where possible:
- source/render dimensions and transparent bounds;
- body bounds measured with props and ground effects excluded;
- head/body, shoulder/body, torso/body, and leg/body ratios;
- foot-contact baseline deviation;
- outline colour and sampled stroke-width consistency;
- palette role/value separation and contrast;
- silhouette IoU against other civilian types;
- negative-space and connected-component checks;
- prop bounds, attachment/contact overlap, and handedness;
- directional capture completeness;
- native and direct game-scale image completeness;
- clipping/edge contacts and detached components;
- console/page/script errors.

For every metric, store the measurement definition, source image/canvas, direction, scale, threshold, and result. Do not compare values generated with different masks, crops, alpha thresholds, or accessory-exclusion rules.

### Threshold policy

1. Keep current proven QA gates intact.
2. Do not introduce new hard-fail proportion thresholds until measurements have been collected across the existing five review characters and Granny using one consistent method.
3. Calibrate thresholds against actual successful and failed examples; record false positives and false negatives.
4. Treat silhouette IoU as a review trigger until the team has validated a threshold that distinguishes genuinely duplicate designs from legitimate pose/prop similarities.
5. Never weaken or remove an existing gate merely to obtain a green workflow.
6. Report targeted character results separately from global legacy failures, unapproved snapshots, and unrelated asset errors.

## 11. Eight-stage production pipeline

1. **Identity brief:** role, personality, age/read, posture, silhouette concept, signature prop, palette direction.
2. **Silhouette:** four solid-black directional views; compare against Granny and the roster before detail work.
3. **Proportion card:** record body landmarks, ratios, pose category, baseline, prop footprint, and intentional exceptions.
4. **Anatomy and pose:** establish believable connected forms and negative spaces.
5. **Clothing and props:** construct garments and integrate props with hands/attachment points.
6. **Face and head identity:** create deliberate front, profile, and rear head construction.
7. **Colour and rendering:** assign palette roles, values, material shading, highlights, and controlled vector detail.
8. **Directional/game-scale QA:** capture all directions and scales, inspect actual artifacts, run metrics, and document findings.

Do not spend time polishing gradients before the silhouette and proportions are approved internally.

## 12. Approval gates and review ownership

A character remains **NOT APPROVED** until:
- the identity brief and proportion card are complete;
- the silhouette and four directional constructions pass internal review;
- actual native, enlarged, game-scale, gallery, and town evidence has been inspected;
- automated QA results and known limitations are documented;
- Claude independently reviews the actual renders against Granny's quality benchmark and the proposed construction standard;
- required corrections are implemented and retested;
- the project owner explicitly approves.

This standard itself remains a **draft** until Claude has reviewed it and the project owner ratifies it. The first five-character review should be used to test whether the ranges, scorecard, and automated measurements are practical. Keep the remaining 20 characters on hold until the existing review/approval gate is satisfied.

## 13. Calibration tasks before locking numeric thresholds

- Measure the five-character review set with the same body/prop masks and landmark definitions used for Granny.
- Add the current five characters' per-direction bounds and proportion cards to the review evidence.
- Compare ratios by pose category (standing, running/airborne, seated, etc.) rather than pooling unlike poses.
- Test whether the draft proportion bands accept intentional designs without admitting visibly weak anatomy.
- Review the 100-point rubric against Granny and the five candidate designs; record why scores differ.
- Validate silhouette IoU against human judgments and identify whether the current 0.85/0.90 limits are suitable for different pose classes.
- Only then propose locked thresholds and automate hard failures.

## 14. Source references

- `npc_sprites.js`: live Granny and dedicated civilian vector renderers.
- `qa/granny-ref.json`: measured Granny reference geometry.
- `qa/granny-ref.js`: generated browser reference data; do not edit by hand.
- `qa/vapor-city-browser-qa.mjs`: browser capture and diagnostic harness.
- `qa/npc-scope-policy.json`: explicit scorecard scope; Granny is the reference baseline, not a normal civilian scorecard entry.
- `project-background/02-ART-DIRECTION-AND-APPROVAL.md`: art-direction and approval policy.
- `project-background/03-TECHNICAL-IMPLEMENTATION.md`: renderer integration and technical guardrails.


## Initial six-civilian application — 2026-11-19

The draft standard has been applied internally to all six currently built vector civilians (Usher, Cook, Courier, Runner, Coach, Referee). See [Six-Civilian Construction Standard Audit](SIX-CIVILIAN-CONSTRUCTION-AUDIT.md) for the per-character construction cards, provisional first-pass scorecard, actual render evidence, current QA measurements, and semantic-measurement calibration gap. The audit does not ratify this draft, turn its provisional values into hard gates, expand the active five-character Claude submission, or release the remaining 20 civilians from hold.


## Semantic measurement implementation — 2026-11-19

A first implementation of the measurement framework now lives in:

- `qa/civilian-anatomy-landmarks.json`: source-space annotation manifest for Granny plus all six current vector civilians.
- `qa/civilian-proportion-measurements.mjs`: validates annotated landmarks and computes head/body, shoulder/body, torso/body, neck/body, and (standing poses only) leg-region/body ratios.
- `qa/test-civilian-proportion-measurements.mjs`: deterministic tests for standing ratios, dynamic-pose joints, incomplete-direction rejection, and pending-record reporting.

The manifest uses Granny's 100×140 source coordinate convention. Each of the four directions must carry an anatomical body polygon, head/chin landmarks, anatomical shoulder points, shoulder/pelvis/foot rows, and explicit headwear/prop polygons (empty arrays are explicit declarations, not omissions). Dynamic poses additionally require shoulder, elbow, wrist, hip, knee, and ankle landmarks for both sides. Runner is configured as a dynamic pose and is deliberately excluded from standing leg-height ratios.

**Important status:** Granny is recorded as a legacy measured reference, preserving the existing umbrella-excluded values and its known convention limitation. The six civilian records are currently `pending_annotation`; the system does not invent anatomical coordinates from the old accessory-inclusive alpha bounds. It will emit a pending report until each direction is annotated from fresh renders. This is intentional and is not a QA failure or an approval gate.

The browser QA workflow now runs the framework's unit tests and structural validation and uploads `qa-output/civilian-proportion-measurements.json` with the normal artifact. No proposed ratio band has been made a hard-fail gate.


## Semantic measurement implementation — 2026-11-19

The measurement framework is implemented in `qa/civilian-proportion-measurements.mjs`. Its source manifest is `qa/civilian-anatomy-landmarks.json`; human annotation rules are in [Semantic Civilian Anatomy Annotation Guide](../qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md).

The framework separates anatomical body polygons, headwear polygons and prop polygons, and records semantic landmarks per direction in a shared 100×140 source-space convention. Runner uses explicit joint landmarks for its airborne pose and is excluded from standing lower-body ratio calculations.

Calibration boundary: Granny's existing reference values remain a legacy reference record, not silently relabelled semantic measurements. The six NPCs remain pending human annotation. No Granny-to-NPC proportion comparison is yet claimed, and all proposed numeric bands remain provisional and non-enforcing.


**Annotation readiness update:** the six-character manifest now has explicit front/back/left/right annotation slots for every character. Source-space point and polygon bounds are validated against the 100×140 coordinate grid, and the structural check requires the exact six-character roster. Missing landmarks remain visibly pending; they are not synthesized from sprite bounds.


## Source-derived candidate annotation update — 2026-11-19

The six civilian records now contain first-pass source-derived candidate landmarks for front, back, left and right, based on the pinned `npc_sprites.js` draw paths at commit `8ac99ec8fd7eb7f2328eda7b7332d5e8f2d45317`. Candidate annotations include a coarse anatomical body polygon, headwear and prop exclusion polygons, head/chin/shoulder/pelvis/foot landmarks, and (for Runner) bilateral shoulder/elbow/wrist/hip/knee/ankle joints. The measurement report computes descriptive candidate ratios but labels these records `source_annotated`, not `measured`.

**Verification boundary:** these are manually transcribed source-geometry candidates, not pixel-traced/visually approved masks. The polygons are intentionally coarse and must be overlaid against fresh native 64×96 captures in all four directions; profile mirroring, hair/headwear boundaries, shoulder joints, prop exclusions, and Runner's stride joints require spot-check/correction before promoting any record to `measured` or using ratios for calibration. No proportion band is enforced, no renderer art changed, and no approval status changed.


## Semantic annotation QA update — 2026-11-19 (Run #517)

The six candidate annotation sets are structurally valid and are rendered over 24/24 native directional captures in [Run #517](https://github.com/tinytime/Tinytime.github.io/actions/runs/44613152087), artifact `14573916586`. Dedicated semantic tests passed (43 checks). The report remains at 0 verified measurements, 6 source-annotated candidates, 1 Granny legacy reference, and 6 pending visual verification; no thresholds are enforced. Referee's raised arm/hand is represented by separate appendage polygons, and profile shoulder landmarks permit only a one-source-unit vertical offset. Visual inspection finds the contours generally track the six native renders, but Cook's pan/handle, Courier's bag/parcel and Coach's clipboard exclusions remain coarse, and Runner's joint positions still need final anatomical review. Do not promote any record to `measured` or calibrate proportion bands yet.

Overall browser QA remains failed on the existing game-wide silhouette gate (max full-body IoU 0.909429; max torso-mask IoU 0.923077), unapproved golden snapshots (1 match / 23 changed), and 180 missing audio-file 404s. No renderer artwork or golden snapshots changed, and no character approval status changed. The remaining 17 civilians remain on hold.


## Direction-specific prop refinement — Run #522 (2026-11-19)

Run #522 ([artifact `14572968146`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44613594260/artifacts/14572968146)) regenerated and visually inspected all 24 candidate overlays. Cook's pan/handle exclusions are now distinct for front/back/side (back explicitly empty); Courier's parcels/satchel are direction-specific; Usher's clipboard bounds are direction-specific. This supersedes the earlier note that Cook and Courier still shared broad generic boxes. Coach's clipboard remains the broadest outstanding prop mask. All six records remain `source_annotated`, with 0 verified measurements and 6 pending visual verification. Semantic validation and overlay generation passed; overall browser QA still fails on the established global silhouette, unapproved golden snapshot, and audio 404 gates. No renderer artwork, golden snapshots, or approval states changed.
