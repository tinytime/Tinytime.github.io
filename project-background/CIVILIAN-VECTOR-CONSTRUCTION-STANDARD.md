# Vapor City Civilian Vector Construction Standard

## Decision addendum — silhouette diagnostics and rollout gate (2026-11-19)

This section supersedes older status statements below where they conflict. Historical run notes remain unchanged as historical records.

- **Construction standard:** operational as a controlled build-and-review method, but still awaiting independent Claude review and owner ratification. Use it now to develop and document the next designs; do not treat its provisional proportion bands, scorecard weights or score floors as acceptance gates.
- **Silhouette recommendation:** retain the existing pairwise silhouette audit as a *diagnostic review trigger*. Do not turn the observed 0.90 alert into a universal artistic acceptance threshold, and do not reshape a character merely to optimize IoU. The reported maximum pair is Clinic/Sailor front at 0.9094292803970223; Coach/Courier back at 0.890479 is a secondary watch item. These are roster-wide findings, not evidence that the five-character correction group fails. Require the report to name the exact pair/direction, show both actual renders at native and game scale, and record a human decision: genuine identity collision, acceptable shared body mass with distinct role construction, or inconclusive. Escalate genuine collisions for design correction; retain accepted exceptions with rationale. Keep silhouette similarity separate from semantic-mask fit, anatomical proportions, and visual quality review.
- **Current first-review group:** Usher, Cook, Courier, Coach and Referee are in the owner-authorized correction/review round. The three previously owner-approved designs were reopened; prior approvals are historical only. Runner is excluded from this Claude submission and remains for a later focused review.
- **Release decision:** the remaining 17 civilians are **ON HOLD** for production rollout. The standard may inform planning and future briefs, but do not begin the remaining batch until the five-character correction set has fresh four-direction/native and direct game-scale evidence, internal QA, independent Claude comparative review, and explicit owner approval of the direction/standard.
- **Latest Granny diagnostic QA:** Run #591 verified the landmark-sheet presentation and output manifest, plus the targeted semantic, capture, overlay, directional, gallery and town checks. Granny's semantic polygon/landmark candidates remain unverified; pixel-derived contours matching renderer alpha do not prove anatomical correctness. Granny remains `reference_only`; no ratio calibration or candidate promotion is authorized.
- **Workflow interpretation:** the #591 GitHub Actions run itself concluded FAILED. Its substantive blockers include the global silhouette gate and unapproved golden snapshots (1 match / 23 changed). Missing audio assets/404s are expected on this branch and are non-blocking environment noise for project assessment; do not spend time adding/fixing audio or count those 404s as a character defect. Do not rewrite the historical Actions conclusion. No golden snapshots were refreshed or approved.
- **Next sequence:** finish and render the five-character correction pass; update the five-character evidence package against the current source; run and inspect fresh QA artifacts; submit that exact evidence to Claude; resolve valid findings; obtain owner approval; only then release the remaining roster.


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

Review front and both profiles for facial identity; review the rear for deliberate hair, nape and headwear construction. Avoid one shared face template with token one-pixel edits. Do not force every face to be radically different: the requirement is purposeful character-specific construction that reads at game scale.

### E. Rasterized value, shape hierarchy and game-scale acceptance

Every candidate must pass a dedicated visual-readability inspection using the actual direct 28 × 42 in-game capture in all four directions. A derived resize is useful for diagnosis but is not a substitute for direct capture.

At game scale, inspect at minimum:
- head and headwear separation, including age/personality cues;
- face and expression where pixels permit;
- separation of adjacent major forms such as coat/trousers, trousers/shoes, arm/torso, hair/headwear, hand/prop and garment layers;
- silhouette and stance;
- signature prop and role identifier;
- whether small details remain intentional marks or collapse into noise.

Important adjacent forms must remain distinguishable through value, outline, shape, spacing or another deliberate cue. Do not require a universal contrast ratio without calibrated evidence. Simplify, enlarge or remove details that become noise. Do not add detail merely because it is visible at 64 × 96. Record any intentional detail that is not expected to survive game scale and ensure it is not the sole role identifier.

Shape hierarchy must be deliberate: outer silhouette first, major construction forms second, small decorative detail last. Outlines, internal lines, gradients and highlights should reinforce that hierarchy. Granny's bold outline and restrained detail are quality lessons, not a universal stroke-width or shading template; each design must remain cohesive at both scales.

### F. Review severity and evidence format

Use a consistent finding severity:
- **P0 — Critical:** character cannot function/read as intended, major render corruption, or fundamental identity failure. Stop approval and correct.
- **P1 — Major:** clear construction, prop-contact, identity, directional or game-scale readability defect. Must be corrected before the character/group advances to owner approval.
- **P2 — Minor:** noticeable quality weakness that should be corrected where practical or explicitly accepted with rationale.
- **P3 — Polish:** subjective refinement or low-impact preference; optional unless it exposes a real defect.

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

## Operational process addendum — 2026-11-19 (current authority)

This section records process changes made after the first draft. Where an earlier section or dated historical note conflicts with this addendum, follow this addendum for current work. Historical notes are retained as history, not as current status.

### Current build-and-measure sequence

1. **Start from GitHub, not a remembered handoff.** Verify the active branch and head SHA; read `project-background/README.md`, this standard, the art-direction/technical/QA documents, the live tracker, the six-civilian audit, and the semantic annotation guide. Inspect the current renderer and latest relevant Actions run before editing.
2. **Define identity before geometry.** Write the character identity brief and four-direction silhouette concept. The design must be original; Granny is a quality benchmark, never a template.
3. **Create the per-character proportion card.** Declare pose class (standing, dynamic/airborne, seated, etc.), anatomical landmarks, intentional asymmetries/handedness, body bounds, headwear/prop bounds, and exceptions. Do not copy Granny's measurements by default.
4. **Construct all four views.** Build silhouette and anatomy before garment detail, face polish, palette and lighting. Side profiles normally show one near arm; dynamic poses must read as static sprites as well as in motion.
5. **Capture actual renderer output.** Preserve the distinction between native 64×96 captures, direct in-game 28×42 captures, enlarged nearest-neighbour inspection sheets, role-debug/layer evidence, and derived resamples. Never describe a derived resample as a direct game-scale capture.
6. **Annotate anatomy separately from accessories.** Use `qa/civilian-anatomy-landmarks.json` and `qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md`. For each direction, define the anatomical body polygon, head top/chin, shoulder landmarks/row, pelvis row and foot baseline. Define headwear and prop exclusion polygons separately; an empty list is an explicit declaration. Dynamic poses require bilateral shoulder, elbow, wrist, hip, knee and ankle landmarks. Do not calculate standing leg-region ratios for dynamic poses such as Runner.
7. **Overlay and correct candidates against renders.** Run the semantic validator and overlay generator, then inspect every direction against the actual native captures. Refine polygons to pixel-tight boundaries, especially profile mirroring/foreshortening, hair/headwear, shoulder/arm transitions, prop/hand contact, pelvis/feet and dynamic joints. A structurally valid manifest or broadly aligned overlay is not proof of accurate measurement. Where exact renderer alpha masks exist, also report candidate-polygon IoU, precision and recall against the same transformed pixel grid; for props, report coverage of visible prop pixels without penalizing intentionally occluded geometry. Keep these metrics diagnostic until calibrated across multiple characters.
8. **Promote only after verification.** Keep source-transcribed or spot-checked records in candidate states (for example `source_annotated`); they are not `measured`. Promote only after the relevant human visual verification is complete and provenance is recorded. Pending/candidate data may be reported descriptively but must not calibrate bands, create hard-fail gates, or support claims of Granny-to-NPC equivalence.
9. **Harmonize Granny before comparison.** Treat `qa/granny-ref.json` and its established front/back values as legacy reference data. The historical side-view width values were copied rather than independently harmonized and must not be used as accepted semantic ratios. Capture and annotate front/back/left/right using one consistent body/prop convention; keep new profile values candidate-only until the rendered source paths and masks are verified. Never silently rewrite the approved legacy reference file.
10. **Run full QA and inspect artifacts.** Run the established GitHub Actions workflow; inspect job steps/logs and download the actual artifact. Record targeted character results separately from global silhouette failures, snapshot approval gates, unrelated missing assets/audio, and script/page errors. Inspect gallery/town context, but do not claim a character-specific town check unless that character was actually spawned/captured.
11. **Close the loop.** Fix valid issues, rerun the relevant workflow, update the tracker and handoff documents, and commit. Claude reviews actual rendered evidence independently; the owner makes the final approval decision. No character is approved from a score, code review, or green build alone.

### Semantic measurement rules now in force

- Coordinate convention: Granny's 100×140 source space. The source renderer, transform, crop, direction, scale, and exclusion convention must be recorded for each capture.
- Anatomical body, headwear and props are separate semantic regions. Props/accessories never inflate body-height or shoulder-width measurements. Granny's raised gripping hand/arm remains anatomy under the existing Granny convention; the umbrella canopy and shaft are excluded.
- Four-direction completeness is mandatory. Profile views require direction-specific geometry and correct mirroring/foreshortening; do not copy front-view widths into profiles.
- Candidate labels are meaningful provenance. `source_annotated`, spot-checked or candidate overlay status must never be reported as verified `measured` data.
- The six current civilian annotations have candidate landmarks in all four directions. The 24/24 overlay from Run #534 was a coarse visual spot-check, not pixel-tight mask acceptance. All six remain candidates pending correction/verification; there are currently zero verified semantic civilian measurements.
- Granny remains `reference_only` under the legacy convention. Her front/back baseline checks pass, but left/right semantic width harmonization remains unresolved. No Granny semantic ratios are accepted for direct comparison yet.
- No proposed proportion band, score weight, category floor, or new threshold is a hard gate. Keep existing proven QA gates unchanged until comparable verified measurements and human review justify calibration.

### Current execution status at this addendum

- Latest verified branch head when this addendum was written: `6a958bbbddac22ab77cfe5748d19089884f72496`.
- [Browser QA Run #539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44620273835) tested that exact commit and concluded **failure**. Semantic measurement validation passed; the six-civilian overlay generated all 24 native captures; the five-civilian review sheet found 20/20 native and 20/20 direct game-scale captures. The Granny four-direction capture step failed because `createGrannyRenderer` is not exposed to the browser script. Therefore no Granny capture or semantic overlay from that step is verified. The main game browser diagnostics also failed on established global checks; the full-roster silhouette gate, unapproved golden snapshots, and missing audio resources remain separate issues. No snapshots or approvals were changed.
- Immediate measurement task: fix the Granny QA capture access using the live renderer implementation, rerun Actions, inspect all four actual Granny captures and overlay, then pixel-tight correct and verify the Granny semantic annotations. Do not compare candidate Granny profile values with the six civilians until harmonization is complete.
- The active independent Claude review scope remains five characters: Usher, Cook, Courier, Coach and Referee. Runner is excluded from that submission only and remains pending a later focused review. The remaining 17 civilians stay on hold until independent review and owner approval.

### Implementation references

- `qa/civilian-anatomy-landmarks.json` — per-direction semantic annotation manifest.
- `qa/civilian-proportion-measurements.mjs` and `qa/test-civilian-proportion-measurements.mjs` — validation, ratio calculations and regression tests.
- `qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md` — coordinate, polygon, landmark and human-verification instructions.
- `qa/build-civilian-annotation-overlay.mjs` — six-civilian overlay generator.
- `qa/build-granny-semantic-overlay.mjs` — Granny candidate capture/overlay generator (currently blocked by renderer exposure; see Run #539).
- `.github/workflows/vapor-city-browser-qa.yml` — established automated workflow.


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

The following are **unvalidated reviewer prompts**, not target proportions or acceptance thresholds. They are not derived from Granny Volt's 30.4% legacy head/body reference. Do not pull a design toward these values. Keep them diagnostic until the measurement convention is harmonized and a varied set of pose-aware characters has verified semantic measurements.

| Metric | Draft exploration band | Denominator / notes |
|---|---:|---|
| Head height | 25–34% | Body height; exclude tall headwear and props |
| Shoulder width | 24–34% | Body height; measure anatomical shoulder span |
| Torso height | 30–40% | Body height; landmark-based, may overlap neck/junction conventions |
| Leg region height | 38–48% | Body height; pose-aware, not a rigid vertical segment |
| Visible neck height | 4–8% | Body height; may be partly occluded by clothing |

These bands are not additive and must not be summed to 100%. Anatomy is measured using landmarks and overlapping rendered regions; clothing, hair, footwear, and pose can alter visible boundaries. A deliberate character design may fall outside a band if the silhouette remains believable, readable, and internally coherent. Record the reason and have it reviewed.

**Do not automatically fail or redesign a character for an out-of-band proportion.** First validate the measurement convention, pose category, and intended design. These ranges are not derived from Granny and must never normalize the roster toward her proportions. Candidate semantic values remain diagnostic; do not calibrate or promote unverified values.

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

A prop can contribute to the silhouette, but it cannot be the only thing making an otherwise generic body recognizable. Compare the roster pairwise and inspect the most similar pairs manually. Automated intersection-over-union (IoU) is a review trigger, not a substitute for judgment. Any pair at or above 0.85 IoU in any direction at native 64×96 or direct 28×42, or any pair a reviewer judges visually similar, requires a recorded human conclusion. This is not an automatic failure threshold and must not cause design distortion. Show the exact pair/direction at both scales and classify it as genuine identity collision, acceptable shared body mass with distinct role construction, or inconclusive. A meaningful construction distinction must be visible at direct game scale and cannot consist only of color, emblem or badge.

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
- Each identity brief specifies at least two purposeful facial/head cues beyond skin tone, hair color and headwear. Cues must be inspectable in native front/profile views; at least one must survive at direct 28×42 or be expressed as a readable profile contour. Do not count token one-pixel changes; cues may be structural rather than tiny interior marks.
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
4. A separately inspectable solid-black silhouette sheet for all four directions.
5. Role-debug/layer evidence when supported by the renderer.
6. Gallery and town-context evidence, including a named-character spawn/capture where the harness supports it.
7. Direct 28 × 42 inspection on both a neutral-grey diagnostic background and actual town ground/night lighting; neither background replaces the other.
8. Walk/animation-frame review for animated characters, including frame-to-frame limb continuity, prop/hand stability, silhouette flicker and direction transitions. Record not-applicable for static-only characters.
9. Inspection of clipping, edge contacts, detached components, limb/prop overlap, handedness, baseline, and readability.

A derived downsample is not a substitute for a direct in-game capture; label evidence accurately. A standard town screenshot is regression context only, not proof that a particular character was spawned. The review package must include the identity brief and proportion card, or explicitly identify them as unavailable; do not claim to have reviewed missing records.

## 9. Proposed 100-point internal design scorecard

This scorecard is a structured review aid, not a replacement for the approval gates. Scores must be supported by actual renders, not source-code descriptions alone.

| Category | Weight |
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

This allocation supersedes the earlier proposed weights. It is a non-gating discussion aid only. **All former score bands, category floors and pass thresholds are withdrawn.** Do not invent a pass mark. Explain scores with actual image evidence. A high score cannot override a verified P0/P1 defect or substitute for internal QA, independent review or owner approval.

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
4. Treat silhouette IoU as a diagnostic human-review trigger, not an artistic pass/fail gate. A numeric trigger may prompt inspection, but must not become a universal approval threshold or cause design distortion.
5. Never weaken or remove an existing gate merely to obtain a green workflow.
6. Report targeted character results separately from global legacy failures, unapproved snapshots, and unrelated asset errors.

## 11. Eight-stage production pipeline

1. **Identity brief:** role, personality, age/read, posture, silhouette concept, signature prop, palette direction, purposeful face/head cues and intended torso/garment construction family.
2. **Silhouette:** four solid-black directional views; compare against Granny and the roster before detail work.
3. **Proportion card:** record body landmarks, ratios, pose category, baseline, prop footprint, and intentional exceptions.
4. **Anatomy and pose:** establish believable connected forms and negative spaces.
5. **Clothing and props:** construct garments and integrate props with hands/attachment points.
6. **Face and head identity:** create deliberate front, profile, and rear head construction.
7. **Colour and rendering:** assign palette roles, values, material shading, highlights, and controlled vector detail.
8. **Directional/game-scale QA:** capture all directions and scales, inspect actual artifacts on neutral-grey and town/night backgrounds, review walk/animation frames where applicable, run metrics and document findings.

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
- Record how often the 0.85 review trigger produces genuine collisions, acceptable shared body mass, or inconclusive cases; use this to improve reviewer guidance, not to establish a universal artistic pass/fail threshold.
- Keep automated hard failures limited to objective technical integrity checks. Do not automate artistic approval from proportions, silhouette IoU or the visual scorecard.

### Correction-round evidence and roster-level variety

Every correction round includes before/after comparisons for each finding, tied to the exact renderer commit, direction, native capture and direct game-scale capture. Report changed-pixel counts/regions as diagnostic locators, not quality scores. If no visual change occurred, explain why and show evidence of resolution.

Maintain a roster-level audit of recurring torso/garment shell families. Record recurrence and whether construction remains meaningfully distinct; do not impose an arbitrary numeric cap before the roster provides evidence for one. A shared shell family is a review prompt, not an automatic failure.

For mirrored left/right views, document anatomical handedness and the character-relative side carrying each prop. Mirroring is acceptable only when anatomy and prop side remain correct in each view.

Retain semantic measurement tools as diagnostics, but do not use unverified candidate annotations, mask-fit metrics or Granny-derived assumptions as artistic acceptance gates or proportion calibration. Preserve historical run records; future detailed run logs may be maintained in a dedicated QA log.

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
