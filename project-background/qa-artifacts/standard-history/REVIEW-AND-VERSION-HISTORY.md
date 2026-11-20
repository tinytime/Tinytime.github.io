# Construction Standard — Historical Review and Run Log

This file preserves historical review outcomes and dated implementation/QA notes moved out of the normative construction standard on 2026-11-20. These records are retained for provenance; current requirements and status are in the live standard, README and tracker.

## Version 2 / Version 2.1 review-derived history

## Version 2 review-derived visual acceptance addendum — 2026-11-19

This addendum translates Claude's independent review of the Usher, Cook, Courier, Coach and Referee evidence into stronger design and review requirements. It supplements the construction and semantic-measurement framework below; it does not replace the existing technical invariants, approve the five characters, ratify this standard, or release the remaining 17 civilians. Where this addendum is more specific than earlier general wording, use the more specific requirement. Numeric score weights and any future thresholds remain provisional until independently reviewed and owner-ratified.

### A. Design quality is separate from technical completeness

A complete four-direction render set, passing automated checks, valid semantic JSON, or a green workflow does not by itself establish visual quality. Reviewers must assess the actual rendered images and distinguish:
- technical/render correctness;
- semantic annotation accuracy;
- character design quality and identity;
- readability at actual game scale;
- integration with the game’s visual environment.

A defect in one category must not be hidden by success in another. A high aggregate score cannot compensate for a critical failure in a defining visual requirement.

### B. Roster identity separation — construction, not decoration

Before detail polish, compare each new design with the closest existing civilians in front, back, left and right silhouettes. Record the closest pairings and inspect the actual paired renders at native 64 × 96 and direct in-game 28 × 42 scale.

When two characters share a similar body mass, the designer must identify at least two meaningful construction-level distinctions, chosen where relevant from:
- outer garment length, hem geometry, layering or closure construction;
- shoulder, sleeve, torso or leg construction;
- head shape, hairline, headwear profile or posture;
- intentional negative spaces and limb/prop relationships;
- signature prop placement and physical interaction.

Color, emblem, badge or accessory differences alone do not resolve a genuine construction-level collision. They may reinforce an already distinct construction. Silhouette IoU remains a diagnostic trigger only; record a human conclusion for each material warning: genuine identity collision, acceptable shared body mass with distinct role construction, or inconclusive. Do not distort a design to chase a score.

### C. Physical interaction and prop-contact test

Every handheld or body-supported signature prop must be reviewed as a complete physical interaction, not as an isolated shape. For each direction in which the interaction is visible, verify:

1. **Anatomical continuity:** shoulder to upper arm, elbow, forearm and wrist form a plausible connected limb.
2. **Hand continuity:** the hand connects visibly and plausibly to the wrist/forearm.
3. **Contact and support:** the hand visibly grips, supports, touches or operates the prop; the contact relationship is unambiguous at native scale.
4. **Occlusion and depth:** the hand, prop, clothing and torso overlap in a deliberate front-to-back order; hidden geometry is not mistaken for missing contact.
5. **Directional continuity:** handedness, prop placement and interaction remain logically consistent across front, back and profiles, allowing intentional view-dependent occlusion.

Classify the interaction as handheld/gripped, supported, body-attached, worn/carried by a strap, or intentionally obscured. State the chosen relationship in the identity/proportion card when it is not self-evident. A prop emerging from a sleeve/apron edge, floating without support, or disappearing behind clothing without a credible grip is a construction defect. Prop bounds remain separate from anatomical measurement bounds; the hand and arm remain anatomy.

### D. Individual face and head identity

A technically non-identical face is not necessarily an individually designed face. Each identity brief must specify at least two intentional facial/head identity cues beyond skin tone, hair color or headwear. Appropriate cues include eye shape/spacing, brow shape, nose/profile contour, mouth/expression, facial proportions, hairline, sideburns, ear placement or age cues.

Review front and both profiles for facial identity; review the rear for deliberate hair, nape and headwear construction. Each identity brief specifies at least two purposeful face-construction cues, each named by type (eye geometry/spacing, brow, nose/profile, cheek/jaw, mouth/expression or facial proportions) and distinct from the two closest roster faces. Skin tone, hair colour and headwear alone do not count. Judge interior features at native 64×96; they are not required to survive direct 28×42. At 28×42, at least one deliberate head-read cue must remain visible: hair mass/hairline, sideburns, headwear profile, age cue or head shape. Identify it in the must-survive list. Do not count token one-pixel edits or rely on a shared face template.

### E. Rasterized value, shape hierarchy and game-scale acceptance

Every candidate must pass a dedicated visual-readability inspection using the actual direct 28 × 42 in-game capture in all four directions. A derived resize is useful for diagnosis but is not a substitute for direct capture.

At game scale, inspect at minimum:
- head and headwear separation, including age/personality cues;
- face and expression where pixels permit;
- separation of adjacent major forms such as coat/trousers, trousers/shoes, arm/torso, hair/headwear, hand/prop and garment layers;
- silhouette and stance;
- signature prop and role identifier;
- whether small details remain intentional marks or collapse into noise.

Every identity card must list exactly three must-survive items: (1) a silhouette/construction feature, (2) the signature prop or role-identifying interaction, and (3) a palette, headwear or other major shape block. Also list details intentionally allowed to disappear at 28×42. Test must-survive items on the direct 28×42 silhouette sheet where applicable, the neutral-grey capture and town/night capture.

Important adjacent forms must remain distinguishable through value, outline, shape, spacing or another deliberate cue. Do not require a universal contrast ratio without calibrated evidence. Simplify, enlarge or remove details that become noise. Do not add detail merely because it is visible at 64 × 96. Record any intentional detail that is not expected to survive game scale and ensure it is not the sole role identifier.

Shape hierarchy must be deliberate: outer silhouette first, major construction forms second, small decorative detail last. Outlines, internal lines, gradients and highlights should reinforce that hierarchy. Granny's bold outline and restrained detail are quality lessons, not a universal stroke-width or shading template; each design must remain cohesive at both scales.

### F. Review severity and evidence format

Use a consistent finding severity:
- **P0 — Critical:** major render corruption, unusable character, or fundamental identity failure.
- **P1 — Major:** at normal 1× game presentation, a viewer is likely to misread the role, signature prop/object or defining construction; or a continuity/directional defect prevents intended use.
- **P2 — Minor:** role and object still read correctly at 1×, but a visible construction/finish flaw is apparent under 4× inspection. Correct where practical or record an explicit owner-accepted exception.
- **P3 — Polish/preference:** noticeable only to a close reviewer, or a subjective preference without demonstrated impact.

A finding is objective only when it cites a visible fact and exact image location, direction and scale. If it cannot be tied to observable evidence or is preference-only, classify it as P3.

Every finding must name the character, direction, evidence scale/source, exact visible issue, why it matters, proposed correction and severity. Separate objective defects from subjective preferences. Reviewers must also record **what should not change** so successful identity decisions are protected from unnecessary redesign. A score or automated audit finding must never substitute for image evidence.

### G. Gallery and town rendering compatibility

Character-level quality and project-wide art-style compatibility are separate review decisions. Inspect new vectors in the gallery and town alongside representative legacy assets, but do not automatically flatten, pixelate or otherwise degrade a well-constructed vector to imitate legacy art.

The owner must decide the intended long-term coexistence/rendering direction. Until then, report style mismatch as a project-level art-direction risk, not automatically as a character defect. Do not change global antialiasing, outline, gradient or rendering behavior as a local character fix without explicit scope approval.

### H. Provisional visual review scorecard proposal

For consistent comparative reporting, use this proposed allocation only as a non-gating discussion aid:

| Category | Proposed points |
|---|---:|
| Identity and silhouette | 20 |
| Anatomy and construction | 15 |
| Face and expression | 10 |
| Clothing construction | 10 |
| Props and physical interaction | 15 |
| Palette and value hierarchy | 10 |
| Vector craftsmanship and finish | 5 |
| Four-direction consistency | 5 |
| Direct game-scale readability | 10 |
| **Total** | **100** |

These weights are proposed, not ratified. This revised allocation supersedes earlier scorecard weights: vector craft is 5 and direct game-scale readability is 10. Do not use former score bands, category floors, or this allocation as automatic acceptance gates. Do not invent a pass mark. Any score must be accompanied by evidence-backed rationale and P0–P3 findings. A high score never constitutes internal QA, Claude review or owner approval. Revisit weights only after multiple characters have been reviewed consistently and the owner has ratified the method.

### I. Acceptance blockers and approval discipline

Regardless of score, a character cannot advance as ready for owner approval while a verified P0 or P1 visual defect remains unresolved. Examples include a major prop with no believable contact, a head shape that reads as the wrong object, a genuine roster identity collision, a defining form that collapses at game scale, or a broken directional construction.

P2 findings require correction or an explicit documented rationale for acceptance. P3 findings may be deferred. Reviewers must not turn subjective preferences into mandatory defects without explaining the impact on identity, readability, construction or integration.

Keep technical QA, semantic measurement status, visual scorecard, review findings and approval state as separate records. Only the project owner can grant final approval. The five-character correction round is the calibration case for this addendum; it does not release the remaining 17 civilians.

**Status:** Draft for independent review and owner ratification  
**Created:** 2026-11-19  
**Benchmark:** Granny Volt (approved 10/10 quality reference)  
**Applies to:** The 23 civilian redesign characters; Granny Volt remains the separate reference baseline.

> This document establishes a repeatable design and measurement process. It does not authorize renderer changes, approve any pending character, refresh golden snapshots, or release the remaining 20 characters from their current hold.


## Version 2.1 independent-review response — 2026-11-19

Claude completed the independent Run #595 visual review of Usher, Cook, Courier, Coach and Referee. This response tightens the draft standard; it does not approve any character, ratify the standard, authorize renderer edits, or release the remaining 17 civilians.

### Round #595 outcome and evidence boundary

- **Batch verdict:** Claude recommends **ready for owner review**, with P2 findings disclosed first. This is a reviewer recommendation, not owner approval. No P0/P1 findings remain.
- **Resolved round-one P1s:** Coach's head/cap read, Cook's connected forearm/hand/pan construction, and Usher's coat/trouser/shoe separation.
- **Coach/Courier rear:** reclassified from P1 to P2: acceptable shared body mass with distinct role construction, marginally. The reviewer cites Coach's straight hem and visible elbow/hand negative spaces, Courier's A-line coat and arms integrated into the coat, different cap/hair construction, and shoe values. Retain the exact comparison and rationale; owner disposition is still required.
- **P2 findings:** F1 facial individuality for Courier, Usher and Cook; U1 Usher profile shoe separation; C1 Cook pan/hand and handle readability; X1 documented Coach/Courier rear rationale.
- **P3 observations:** Cook rear hand continuity; faint pale arc behind Coach's ear; cyan/orange rim-fringe preference; mirrored near-side prop convention; Referee plain back. These are optional polish unless a concrete defect is demonstrated.
- **Evidence limits:** Claude inspected all 20 native 64×96 and 20 direct 28×42 captures and supplied composites. The ZIP lacked the solid-black silhouette sheet, identity briefs, proportion cards and Actions logs. Claude did not inspect repository source or supporting docs 02/04. The town image does not prove all five characters were individually spawned.
- **QA context:** Run #595 tested renderer c354abfa3d78b46dc982a03d2c5d1ece0c918257; [Actions run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44645116652), artifact 14587318765. Targeted checks passed; overall workflow FAILED on the global Clinic/Sailor front silhouette gate and unapproved golden snapshots. Expected audio 404s are non-blocking noise. No snapshots were refreshed or approved.
- **Disposition:** all five remain NOT APPROVED pending owner decision and P2 disposition. Runner remains excluded; the remaining 17 remain ON HOLD.

| Character | Claude score | Result |
|---|---:|---|
| Referee | 7.5/10 | Strongest; no change warranted |
| Cook | 7/10 | P2 pan/hand readability; P3 rear-hand continuity |
| Courier | 6.5/10 | P2 face individuality; X1 shared rear rationale |
| Coach | 6/10 | X1 shared rear rationale; P3 pale arc behind ear |
| Usher | 6/10 | P2 profile shoe separation and face individuality |

### Version 2.1 requirements adopted for the draft

- **Silhouette trigger:** any pair at or above 0.85 IoU in any direction at native 64×96 or direct 28×42, or any pair a reviewer judges similar, requires recorded human review. This is not an automatic failure threshold. Show the exact pair/direction at both scales and classify it as genuine identity collision, acceptable shared body mass with distinct role construction, or inconclusive. A meaningful distinction must be visible at game scale and cannot consist only of color, emblem or badge.
- **Face identity:** each identity brief specifies at least two purposeful cues beyond skin tone, hair color and headwear. Cues must be inspectable in native front/profile views; at least one must survive at direct 28×42 or be expressed as a readable profile contour. Do not count token one-pixel changes; allow structural cues appropriate to the small face area.
- **Game-scale environments:** inspect direct 28×42 captures on neutral grey and actual town ground/night lighting. Neither replaces the other.
- **Animation:** inspect walk/animation frames for animated characters; record not-applicable for static-only characters.
- **Correction evidence:** every correction round includes before/after evidence for each finding, exact source commit, direction, native and direct game-scale captures, and a pixel-diff summary. Diffs locate changes; they are not quality scores.
- **Roster variety:** maintain a roster-level torso/garment-shell family audit. Do not impose an arbitrary numeric cap; record recurrence and whether construction remains meaningfully distinct.
- **Mirrored props:** document anatomical handedness and character-relative prop side. Mirroring is acceptable only if the prop remains on the correct character-relative side in each view.
- **Semantic measurements:** retain the framework as diagnostic. Do not use unverified masks, candidate measurements or Granny-derived assumptions as hard gates or proportion calibration. Granny remains reference_only until semantic boundaries are verified.
- **History:** preserve existing historical run records. Future detailed run logs may live in a dedicated QA log.

## Run #600 re-review authority — 2026-11-20

Claude's independent re-review verdict is **Ready with disclosed minor issues** for the five-character batch and **Retain with revisions** for Version 2.1. These are reviewer recommendations, not owner approval or standard ratification. See [CLAUDE-REREVIEW-RUN-600.md](qa-artifacts/five-civilian-corrections/CLAUDE-REREVIEW-RUN-600.md) for detailed findings and evidence limits.

- No P0/P1 defects were reported. All five characters remain **NOT APPROVED**.
- New P2 findings: Cook profile pan handle/contact (C1); Usher profile clipboard/arm continuity (U4); Usher generic silhouette (U2). These require owner disposition before new renderer edits.
- Coach/Courier rear is accepted as shared body mass with distinct role construction. Preserve the rationale; no torso redesign.
- Run #600 did not include walk frames. Animated characters require at least two frames per direction in the next review package.
- The 0.85 IoU value is a human-review trigger only. Every report must state mask basis, alpha threshold, prop inclusion/exclusion, direction and scale.
- The scorecard remains provisional and non-gating. Do not use an undefined “/10 versus Granny” scale.
- Town-ground composite is diagnostic only, not proof of named-character spawning. The black silhouette sheet is alpha-derived, not semantic anatomy.
- The remaining 17 civilians remain **ON HOLD**. Do not refresh or approve golden snapshots without explicit owner authorization.

## Dated application and QA history

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


## Granny directional measurement qualification — Run #534 (2026-11-19)

The current browser report confirms the existing Granny front/back reference measurements and runtime scale match. It does **not** establish that the legacy side-view measurements are equivalent: the left/right profile body widths are emitted as candidate-only values (40 source units versus the legacy copied width of 55), and full widths are 50 versus 70. The QA report explicitly leaves these profile candidates un-compared to the owner-approved baseline. Keep the historical front/back values as reference facts, but do not use the copied side-view shoulder/body values as harmonized semantic ratios. The next Granny step is a direction-specific semantic audit of profile anatomy, shoulder landmarks, head top/chin, and umbrella/hand exclusions. Any newly derived profile geometry must remain a candidate until the native side-view render and source paths are checked under the same convention; it must not silently rewrite the approved baseline.

Run #534 also produced a visually inspected six-civilian overlay (24/24 native captures). It is useful as a coarse review aid, not a pixel-accurate mask acceptance. The six candidate records remain `source_annotated`; no semantic ratios have been calibrated and all numeric bands remain provisional and non-enforcing.


## Operational update — Granny capture Run #540 (2026-11-19)

The live renderer access defect is fixed in commit `2a8ea18201c0ef43eb17fb1b9da3604832822f2d`: `createGrannyRenderer` is exported through `window.NPC_SPRITES.createGrannyRenderer`. [Run #540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44621620719), artifact `14578155959`, confirms successful 100×140 captures for front/back/left/right, semantic validation, six-civilian overlay generation (24/24), and five-civilian review sheet generation (20/20 native and 20/20 direct 28×42).

Visual inspection confirms valid four-direction captures, side-view 0.72 scaling and left-facing mirroring. The Granny polygons remain coarse candidate annotations, not pixel-traced measurements; the overlay requires refinement around head/face, shoulders, raised gripping arm/hand, and umbrella/shaft edges. Keep Granny `reference_only`, keep candidate geometry unverified, preserve approved front/back measurements, and do not compare profile ratios until the side-view convention is harmonized. Overall workflow failure is independent: browser diagnostics/audio HTTP 404s, full-roster silhouette max IoU `0.909429`, and unapproved snapshots (1/24 match). No snapshots or approvals changed.


## Candidate mask-fit diagnostics — 2026-11-19

A reusable non-gating comparison now measures source-space candidate polygons against exact renderer alpha row masks. The Granny capture emits `granny-pixel-mask-fit-report.json`; implementation is `qa/granny-mask-fit.mjs`, with fixture tests in `qa/test-granny-mask-fit.mjs`. Body polygons plus appendages are rasterized with the same direction transform and compared to the exact umbrella-excluded body alpha mask using IoU, precision, recall and pixel differences. Prop polygons are assessed by coverage of visible umbrella-delta pixels only; hidden/occluded prop geometry must not be mislabeled as false-positive area.

The first Run #552 artifact baseline shows why this is useful: Granny's current body candidate recall is approximately 95.4% front/back but only 72.7–73.1% in profiles. This is a diagnostic finding, not an approval score or hard gate. Profile candidate polygons need refinement before semantic promotion or ratio comparison. The visible umbrella candidate covers approximately 81.5–82.2% of the exposed prop pixels; refine uncovered visible edges after inspecting the direction-specific images. Do not set universal numeric thresholds from one character.


## Pixel-derived contour refinement — 2026-11-19

The Granny capture now preserves the original hand-transcribed body polygon and appendages for audit, then derives the active candidate body polygon from the exact umbrella-excluded alpha mask. The contour is traced at pixel boundaries and profile coordinates are inverse-transformed so the existing renderer-aware overlay transform places it back on the captured sprite. The report compares both the manual candidate and the pixel-derived contour with the exact mask. This is a Granny-specific method enabled by her dedicated renderer pass, not an automatic rule for every NPC. Only use it for another character if the renderer layer is known to exclude exactly the intended props and retain the intended anatomy/clothing/hair convention.

Run #555's actual artifact provides the four-direction alpha masks. Applying the helper locally to that artifact yields pixel-derived contour IoU of 0.9964 front, 0.9961 back, 0.9954 left, and 0.9975 right (recall 1.0 in all directions under the current outer-contour convention). The original manual polygons remain preserved and are materially less aligned, particularly in profiles. This validates the contour extraction against the mask; it does not validate the semantic meaning of the mask or the landmarks. No universal IoU threshold is proposed.


## Visible prop mask and complete prop geometry — 2026-11-19

The Granny output now distinguishes the complete hand-transcribed umbrella geometry (`manualPropPolygonCandidate`) from the visible-only contour traced from the full-render alpha minus the body alpha (`visiblePropPolygons`). The former may extend behind the character; the latter represents only pixels that are actually visible. The overlay and fit report display both. On Run #555's artifact, the manually drawn complete prop candidate covers about 81.5–82.2% of visible umbrella pixels; the derived visible contour reproduces the exposed delta mask at IoU 1.0 in all four directions. This validates visible-mask tracing, not the hidden geometry or hand/shaft semantic contact. Preserve both representations and do not call occluded candidate area erroneous.


The current helper traces all disconnected visible prop components via `deriveLocalMaskContours`; the semantic overlay draws every returned contour. Its fixture suite now includes split-component coverage. Do not silently discard smaller visible fragments when a prop is partially occluded.


## Disconnected pixel-mask components — 2026-11-19

Contour extraction must retain every disconnected outer component. A largest-contour-only algorithm can drop a detached body-alpha fragment or the umbrella shaft when the visible umbrella delta separates canopy and shaft. The Granny helper now returns all outer loops; body components populate the primary body polygon plus appendage polygons, while visible prop components are retained as an array. A fixture checks two disjoint shapes. Continue to preserve manual full-prop geometry separately because visible alpha omits occluded geometry. This remains a Granny-specific renderer-mask technique, not a semantic approval rule.


## Contour topology validation — 2026-11-19

The contour tracer now distinguishes outer boundaries from interior holes using loop winding. Only positive-winding outer loops become polygons; negative-winding interior holes are not mislabeled as disconnected body appendages. All disconnected outer components are retained. Exact row-span masks remain in the JSON as the authoritative pixel evidence, so the polygon approximation's filled interior holes do not erase the source mask. The fixture suite now has nine cases, including a hollow shape and two disconnected components.


## Pixel-mask topology — 2026-11-19

Candidate contours must preserve the topology of the renderer alpha mask: all disconnected outer components **and** interior holes. Largest-loop-only tracing loses detached parts; outer-only tracing fills transparent gaps. The Granny helper now stores body outer components and holes separately, does the same for visible umbrella alpha, and subtracts hole masks during rasterized fit comparison. The method is only applicable when the renderer alpha pass has a known semantic partition. It does not replace human review of anatomical meaning or prop contact.


## Landmark-to-mask evidence without semantic overclaim — 2026-11-19

Where exact body alpha masks are available, record whether candidate landmark coordinates are consistent with the visible mask: top/bottom offsets, chin vertical range, shoulder-point pixel inclusion, shoulder/pelvis row occupancy and foot-baseline alignment. Treat this as a diagnostic aid only. A point falling on the silhouette does not prove it is the correct anatomical landmark; human review must still interpret the character anatomy and the chosen measurement convention. No hard thresholds are established from Granny alone.


## Run #587 evidence — mask and landmark diagnostics (2026-11-19)

The 11-fixture helper suite passed in browser QA Run #587. Exact alpha-mask contours reconstructed both the umbrella-excluded body render and visible umbrella delta at IoU 1.0 in all four directions. This validates the mask-tracing implementation, not anatomical segmentation: the body pass intentionally includes hair and clothing. Manual candidate fit is separately reported and currently weak (body IoU 0.786 front/back; 0.645/0.644 profiles), demonstrating why source annotations must not be accepted merely because they render. Record landmark-to-mask offsets and pixel inclusion as non-gating evidence; human anatomical interpretation remains mandatory. Candidate headTop is one pixel above the first body-alpha row in all views. No universal ratio thresholds or semantic hard gates are inferred from this single character.
