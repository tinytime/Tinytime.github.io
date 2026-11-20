# Vapor City Civilian Vector Construction Standard

## Decision addendum — silhouette diagnostics and rollout gate (2026-11-19)

This section supersedes older status statements below where they conflict. Historical run notes remain unchanged as historical records.

- **Construction standard:** independently reviewed in Claude's Run #600 re-review; retained with revisions and awaiting owner ratification. Use the revised face, evidence-tier and IoU rules below. Use it now to develop and document the next designs; do not treat its provisional proportion bands, scorecard weights or score floors as acceptance gates.
- **Silhouette recommendation:** retain the existing pairwise silhouette audit as a *diagnostic review trigger*. The 0.85 value is a human-review trigger only; do not turn it into a universal artistic acceptance threshold, and do not reshape a character merely to optimize IoU. The reported maximum pair is Clinic/Sailor front at 0.9094292803970223; Coach/Courier back at 0.890479 is a secondary watch item. These are roster-wide findings, not evidence that the five-character correction group fails. Require the report to name the exact pair/direction, show both actual renders at native and game scale, and record a human decision: genuine identity collision, acceptable shared body mass with distinct role construction, or inconclusive. Escalate genuine collisions for design correction; retain accepted exceptions with rationale. Keep silhouette similarity separate from semantic-mask fit, anatomical proportions, and visual quality review.
- **Current first-review group:** Usher, Cook, Courier, Coach and Referee are in the owner-authorized correction/review round. The three previously owner-approved designs were reopened; prior approvals are historical only. Runner is excluded from this Claude submission and remains for a later focused review.
- **Release decision:** the remaining 17 civilians are **ON HOLD** for production rollout. The standard may inform planning and future briefs, but do not begin the remaining batch until the five-character correction set has fresh four-direction/native and direct game-scale evidence, internal QA, independent Claude comparative review, and explicit owner approval of the direction/standard.
- **Latest Granny diagnostic QA:** Run #591 verified the landmark-sheet presentation and output manifest, plus the targeted semantic, capture, overlay, directional, gallery and town checks. Granny's semantic polygon/landmark candidates remain unverified; pixel-derived contours matching renderer alpha do not prove anatomical correctness. Granny remains `reference_only`; no ratio calibration or candidate promotion is authorized.
- **Workflow interpretation:** the #591 GitHub Actions run itself concluded FAILED. Its substantive blockers include the global silhouette gate and unapproved golden snapshots (1 match / 23 changed). Missing audio assets/404s are expected on this branch and are non-blocking environment noise for project assessment; do not spend time adding/fixing audio or count those 404s as a character defect. Do not rewrite the historical Actions conclusion. No golden snapshots were refreshed or approved.
- **Next sequence:** obtain owner dispositions for the new Cook/Usher findings; complete only authorized renderer corrections; add walk-frame evidence and the full package manifest; run and inspect fresh QA; obtain final owner approval; only then release the remaining roster.


## Historical review and run records

Detailed historical reviewer outcomes and dated implementation/QA notes are preserved in [Construction Standard — Historical Review and Run Log](qa-artifacts/standard-history/REVIEW-AND-VERSION-HISTORY.md). They are not current acceptance rules; use the current standard and tracker for authority.

## Run #600 re-review and Run #601 QA interpretation — 2026-11-20

Claude's independent Run #600 verdict is **Ready with disclosed minor issues**; Version 2.1 is **Retain with revisions**. No P0/P1 findings were reported. The five characters remain NOT APPROVED. The three P2 findings (Cook profile handle/contact C1; Usher profile clipboard/arm continuity U4; Usher silhouette originality U2) and evidence limits are recorded in [the independent review log](qa-artifacts/five-civilian-corrections/CLAUDE-REREVIEW-RUN-600.md). Coach/Courier rear is an accepted exception; preserve its rationale and do not redesign.

Run #601 ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44656202003), artifact 14593307326) tested the QA-harness IoU change at source `3754caa2ae742622d6a4d12afdb1376f3c67a7fc`. Semantic validation/tests passed; Granny capture/overlay, six-civilian overlay (24/24), five-civilian captures (20/20 native and 20/20 direct 28×42), directional integrity, role-debug, prop audit and gallery evidence generation passed. The ten-archetype silhouette diagnostics passed technical completeness (180/180 pairs; max full-body IoU 0.8275; max torso IoU 0.8128). The 23-civilian type audit is also technically complete and now reports `reviewRequired: true` for full-body alpha pairs at/above 0.85, including Clinic/Sailor front 0.9094 and Coach/Courier rear 0.8910; these are diagnostic human-review triggers, not workflow failures. Overall Actions remains FAILED on the unapproved golden snapshot baseline (1 match / 23 changed) and 180 expected audio-resource 404 console errors. Page and script errors are zero. No golden snapshots were changed or approved.

## Operational process addendum — 2026-11-19 (current authority)

This section records process changes made after the first draft. Where an earlier section or dated historical note conflicts with this addendum, follow this addendum for current work. Historical notes are retained as history, not as current status.

### Current operating loop

Use §11's eight-stage production pipeline as the single normative character-build sequence. The following operating loop adds project controls around it; it does not create a second, competing art process:

1. **Repository preflight:** verify the active branch/head, read the current project overview, art direction, technical implementation, QA handoff, tracker and this standard; inspect the live renderer and latest relevant Actions evidence.
2. **Authorize scope:** confirm the named character(s), current owner dispositions, protected assets and explicit exclusions before editing. Do not infer approval from historical status.
3. **Create the brief and construction card:** state role/personality, original silhouette, pose/build descriptor (no numeric targets), face cues, signature prop, handedness, three must-survive items, allowed-to-vanish details and likely shell family.
4. **Build with identity first:** follow §11. Do not begin with numeric anatomy ratios or semantic polygon work. Keep props physically integrated and profile near/far arm logic clear.
5. **Capture and inspect:** follow Tier A in §8, including all four native and direct 28×42 directions, fixed backdrops, black silhouettes, prop-contact table, applicable walk frames, before/after evidence and package manifest.
6. **Run and interpret QA:** keep technical capture/integrity checks separate from human artistic judgments and Tier B IoU review triggers. Tier C semantic calibration remains suspended.
7. **Close out:** correct valid findings, rerun, inspect actual artifacts, update tracker/docs, prepare Claude's independent review package where required, and wait for explicit owner approval. Never change golden snapshots without authorization.

### Semantic measurement status — suspended

- Semantic civilian anatomy annotations remain source-derived candidates, not verified measurements. Granny's legacy front/back facts remain reference-only for calibration; her side-view widths are unresolved.
- Do not refine polygons, calculate/promote ratios, or use semantic mask-fit scores for design acceptance unless a concrete technical/design decision requires it and the owner reauthorizes the work.
- Visible-silhouette height, width, hem row, foot baseline and cross-direction agreement may be reported as descriptive diagnostics only, with exact pixel/mask definitions.
- If an anatomical landmark is ever documented for a separately authorized task, clothing-occluded points must be marked inferred. Never compare different pose classes or mix clothing-inflated bounds with anatomical measures.
- No provisional proportion bands or score weights are targets, pass marks or hard gates.

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

### 4.2 Numeric proportion bands — deferred appendix only

No numeric proportion band is part of the active construction or acceptance standard. Semantic proportion calibration is suspended under §13. Historical exploration ranges are preserved in Appendix A for traceability only; they are unvalidated, must not appear as design targets, and must not be used to score, gate, or reshape a character.

### 4.3 Per-character proportion card

Before detailed vector construction, create a short specification with:
- intended height/build category and pose category;
- intended build descriptor (no numeric targets);
- torso and leg landmarks;
- intended shoulder, hip, and foot-contact shape;
- asymmetry and handedness;
- silhouette-defining clothing/headwear;
- prop bounds and hand/attachment points;
- any intentional departures from the intended build descriptor or pose logic.

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

A prop can contribute to the full character silhouette, but cannot be the only thing making an otherwise generic body recognizable. IoU is a human-review trigger, not a pass/fail gate or design target. Any pair at or above 0.85 IoU at native 64×96 or direct 28×42, or any pair a reviewer judges visually similar, requires a recorded human conclusion.

Every IoU result must declare its mask basis: (1) rendered full-character alpha uses pixels with alpha > 0, includes visible clothing, hair, limbs and visible handheld/worn props, and excludes background; (2) torso construction masks use the named renderer torso-mask rows and exclude head, arms, legs and props. These measures are not interchangeable. State alpha threshold, crop, transform, direction and scale; never compare values from different mask families or exclusion rules.

Show the exact pair/direction at both scales and classify it as genuine identity collision, acceptable shared body mass with distinct role construction, or inconclusive. A meaningful construction distinction must be visible at direct game scale and cannot consist only of colour, emblem or badge.

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
- Each identity brief specifies at least two purposeful face-construction cues, named by type (eye geometry/spacing, brow, nose/profile, cheek/jaw, mouth/expression or facial proportions) and distinct from the two closest roster faces. Skin tone, hair colour and headwear alone do not count.
- Judge interior facial features at native 64×96 and in front/profile views. Interior facial marks are not required to survive direct 28×42.
- At direct 28×42, at least one deliberate head-read cue must remain visible: hair mass/hairline, sideburns, headwear profile, age cue or head shape. Name it in the character's must-survive list.
- Do not count token one-pixel edits or rely on a shared face template.

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

### Granny Volt: fixed reference facts versus non-transferable design choices

**Fixed reference/technical facts:** 100×140 source grid; 0.28 renderer scale; shared ink `#171725`; foot-contact row 136; 36 px tile. These describe Granny's established renderer/reference setup and do not change the civilians' 64×96 native canvas.

**Transferable craft principles:** bold outline hierarchy, restrained detail, a protected/legible face, one dominant silhouette idea, and a prop integrated into the character's pose and hand contact.

**Character-specific; do not copy as defaults:** umbrella, 30.4% legacy head ratio, 36-unit shoulder width, skirt wedge, and purple palette. Granny's side-view widths (candidate 40 versus legacy 55) remain unresolved and are not calibration targets. Her 100×140 grid differs from the civilians' 64×96 grid.

## 8. Four-direction and scale review

Use three evidence tiers:

**Tier A — required for every character**
1. Native 64 × 96 captures: front, back, left and right.
2. Enlarged nearest-neighbour views for edge/path inspection.
3. Direct in-game 28 × 42 captures in all four directions; derived resizes do not qualify.
4. A separately inspectable solid-black silhouette sheet for all four directions.
5. Direct 28 × 42 captures on fixed neutral-grey and town-ground/night backdrops. Record exact backdrop asset/configuration and preserve it between review rounds.
6. A prop-contact table for every visible direction: arm/hand continuity, grip/support point, occlusion order, handedness and character-relative prop side.
7. Exactly three must-survive items on each identity card (silhouette/construction feature, signature prop/interaction, palette/headwear/major shape block), plus a list of details allowed to disappear.
8. For animated/walking characters, a minimum two-frame-per-direction sheet (front, back, left, right) showing limb continuity, prop/hand stability, silhouette flicker and direction transitions. Static-only characters must record not-applicable.
9. Before/after side-by-side evidence for every correction finding, exact renderer commit, direction, native and direct game-scale captures, and pixel-diff method/threshold.
10. A package completeness manifest listing every required document, artifact, direction, scale, background, frame set, source commit and unavailable item.
11. Inspect clipping, edge contacts, detached components, limb/prop overlap, baseline, gallery and town context. A town composite is diagnostic only unless the named character was actually spawned and captured.

**Tier B — diagnostic roster audit**
- Pairwise full-character and torso-mask IoU tables with exact mask basis, alpha threshold, direction and scale.
- Every pair at or above 0.85 is review_required, not fail; include paired images and a human disposition.
- Maintain a torso/garment-shell family table and accepted-exception register. No numeric cap; document recurrence and meaningful construction distinctions.

**Tier C — suspended semantic calibration**
- Keep source-annotated anatomy polygons and mask-fit diagnostics out of acceptance decisions and ratio calibration until a design decision requires them and the owner reauthorizes the work.
- Visible-silhouette facts (height, width, hem row, foot baseline and cross-direction consistency) may be reported with exact definitions.
- Anatomical landmarks remain human-annotated; if clothing occludes a landmark, label it inferred. Never compare across pose classes.

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
- visible-silhouette height, width, hem row, foot baseline and cross-direction consistency (report only until validated);
- foot-contact baseline deviation;
- outline colour and sampled stroke-width consistency;
- palette role/value separation and contrast;
- pairwise full-character/torso IoU as a diagnostic review trigger only, with mask basis and alpha threshold declared;
- negative-space and connected-component checks;
- prop bounds, attachment/contact overlap, and handedness;
- directional capture completeness;
- native and direct game-scale image completeness;
- clipping/edge contacts and detached components;
- console/page/script errors.

For every metric, store the measurement definition, source image/canvas, direction, scale, threshold, and result. Do not compare values generated with different masks, crops, alpha thresholds, or accessory-exclusion rules.

### Threshold policy

1. Keep current proven QA gates intact.
2. Do not introduce hard-fail proportion or artistic silhouette-IoU thresholds. The 0.85 IoU value is a human-review trigger only, not an automated acceptance gate.
3. Calibrate thresholds against actual successful and failed examples; record false positives and false negatives.
4. Treat silhouette IoU at or above 0.85 as a diagnostic human-review trigger only. The QA harness reports the pair and evidence; it must not fail Actions for artistic similarity. Technical capture and data-integrity checks remain gating.
5. Never weaken or remove an existing gate merely to obtain a green workflow.
6. Report targeted character results separately from global legacy failures, unapproved snapshots, and unrelated asset errors.

## 11. Eight-stage production pipeline

1. **Identity brief:** role, personality, age/read, posture, silhouette concept, signature prop, palette direction, purposeful face/head cues and intended torso/garment construction family.
2. **Silhouette:** four solid-black directional views; compare against Granny and the roster before detail work.
3. **Construction card:** record intended build descriptor (no numeric targets), pose category, visible silhouette bounds, baseline, prop footprint, handedness and intentional exceptions.
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

This standard remains a **draft** until the project owner ratifies the revised rules. Keep the remaining 17 civilians on hold until the five-character correction set, standard and direction have passed internal QA, independent review and explicit owner approval.

## 13. Calibration status and future evidence requirements

**Semantic proportion calibration is suspended.** The current civilian annotations are source-derived candidates, not verified anatomical measurements. Granny's legacy front/back facts remain reference-only for calibration; her side-view widths are unresolved. Do not spend time refining polygons or promoting measurements unless a concrete design/technical decision requires them and the owner reauthorizes that work.

Until then:
- Keep visible-silhouette height, width, hem row, foot baseline and cross-direction agreement as descriptive diagnostics with their exact pixel/mask definitions.
- Keep anatomical landmarks human-annotated. If clothing occludes a landmark, mark it inferred; do not imply it was directly observed.
- Never compare different pose classes or mix clothing-inflated bounds with anatomical measures.
- Do not use provisional proportion bands or score weights as targets, pass marks or hard gates.
- If numeric calibration is later reauthorized, first gather at least 8–10 varied characters across at least three pose classes with pixel-verified body polygons; require two independent annotators to agree at IoU ≥0.95; record at least 20 flagged silhouette-pair outcomes; and have two reviewers blind-score the same five characters and compare rank order before ratifying score weights.

### Correction-round evidence and roster-level variety

Every correction round includes before/after side-by-side comparisons for each finding, tied to the exact renderer commit, direction, native capture and direct game-scale capture. Report changed-pixel counts/regions as diagnostic locators, not quality scores. Every count must state whether it is exact RGBA pixel inequality or thresholded colour difference; for thresholded counts, state the threshold (for example, summed RGB difference >12). If no visual change occurred, explain why and show evidence of resolution.

Maintain a roster-level audit of recurring torso/garment-shell families before starting the remaining 17 civilians. Record family tags, recurrence and whether construction remains meaningfully distinct; do not impose an arbitrary numeric cap. A shared shell family is a review prompt, not an automatic failure.

For mirrored left/right views, document anatomical handedness and the character-relative side carrying each prop. Mirroring is acceptable only when anatomy and prop side remain correct in each view. Maintain an accepted-exception register with exact pair/direction, evidence scales, rationale and owner disposition.

## 14. Source references

- Historical review outcomes and dated run records: [Construction Standard — Historical Review and Run Log](qa-artifacts/standard-history/REVIEW-AND-VERSION-HISTORY.md).
- Current five-civilian Run #600 independent review: [Claude re-review log](qa-artifacts/five-civilian-corrections/CLAUDE-REREVIEW-RUN-600.md).
- Required package manifest: [Review Package Completeness Manifest](qa-artifacts/five-civilian-corrections/REVIEW-PACKAGE-MANIFEST.md).
- Accepted exception register: [Five-Civilian Accepted-Exception Register](qa-artifacts/five-civilian-corrections/ACCEPTED-EXCEPTIONS.md).

- `npc_sprites.js`: live Granny and dedicated civilian vector renderers.
- `qa/granny-ref.json`: measured Granny reference geometry.
- `qa/granny-ref.js`: generated browser reference data; do not edit by hand.
- `qa/vapor-city-browser-qa.mjs`: browser capture and diagnostic harness.
- `qa/npc-scope-policy.json`: explicit scorecard scope; Granny is the reference baseline, not a normal civilian scorecard entry.
- `project-background/02-ART-DIRECTION-AND-APPROVAL.md`: art-direction and approval policy.
- `project-background/03-TECHNICAL-IMPLEMENTATION.md`: renderer integration and technical guardrails.
## Appendix A. Historical unvalidated proportion prompts (not active rules)

The ranges below appeared in an earlier draft as exploration prompts. Claude's Run #600 review recommends deferring numeric bands until semantic calibration is valid. They are retained only so prior discussions remain traceable. Do not use these values to construct, rank, approve, or reject any character.

| Historical metric | Unvalidated exploration range | Original denominator / notes |
|---|---:|---|
| Head height | 25–34% | Body height; exclude tall headwear and props |
| Shoulder width | 24–34% | Body height; measure anatomical shoulder span |
| Torso height | 30–40% | Body height; landmark-based; overlaps neck/junction conventions |
| Leg region height | 38–48% | Body height; pose-aware, not a rigid vertical segment |
| Visible neck height | 4–8% | Body height; may be partly occluded by clothing |

These ranges are not additive, were not validated against a varied pose-aware roster, and are not derived from Granny Volt. They are not targets, tolerances, scoring inputs, or automated checks.
