## Fourth civilian batch — integrated F6 face-stage checkpoint (2026-11-21)

The owner-authorized grayscale face integration for Sailor #12, Slicker #13 and Painter #14 has passed internal design-stage QA with a direct 28×42 readability caveat. Exact tested source `a857f7b4d2238ef8fd63da99465aa27ee11cafe0`; [Actions Run #867](https://github.com/tinytime/Tinytime.github.io/actions/runs/44845374254), artifact [14682766863](https://github.com/tinytime/Tinytime.github.io/actions/runs/44845374254/artifacts/14682766863). The overlay is separate from the approved revision-21 silhouette/construction baseline; no production renderer, palette, golden snapshots or provenance were changed. See [integrated face QA](qa-artifacts/fourth-civilian-batch/FOURTH-BATCH-INTEGRATED-FACE-INTERNAL-QA-01.md) and [Claude review package](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-FACE-CLAUDE-REVIEW-PACKAGE-01.md). Independent review and owner approval remain pending.

## Fourth civilian batch — revision 21 exact-source checkpoint, Run #810 (2026-11-20)

- **Source and tested branch head:** `be1c0c012894ccae23b4cbce2ad06e523fb460c5`; revision-21 SVG blob `36f645d7de9ee5bedc79a0288c50bc8399382f4b`.
- **Exact evidence:** [Actions Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854).
- **Focused design-source checks PASS:** 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged captures; body preservation 12/12 with zero removed pixels; anatomy/prop connectivity 48/48; profile prop contact 2/2; semantic proportion/annotation validation passed. Slicker remains byte-identical to revision 18 across all eight body/prop direction panels.
- **Separate full workflow FAIL:** game-browser diagnostics failed with 135 audio/resource HTTP 404 responses plus 45 corresponding sound-load messages; pageErrors=0 and scriptErrors=0. Golden snapshot gate remains 1 match / 23 changed and unapproved. No golden snapshots or provenance were modified.
- **Additional ChatGPT artifact inspection:** opened actual native and direct body/prop comparison sheets, matched-face comparison sheet, and enlarged Sailor-front and Painter-front/left-profile prop crops. Sailor's hand/coil read remains compact and merits close direct-scale reviewer scrutiny; Painter's brush is identifiable but the hand/handle/head cluster is dense at game scale. Face studies remain provisional grayscale geometry. This is limited supplementary inspection, not a complete all-crops verdict or approval.
- **Handoff:** review package 06 is pinned to this exact source/run/artifact and remains prepared but not sent to Claude. No independent Claude verdict or owner art approval exists. All construction families remain UNASSIGNED; no palette or renderer work is authorized; #15–23 remain held.

---

## Fourth-batch authorization clarification — parallel design stage only (2026-11-20)

The owner explicitly authorized Sailor (#12), Slicker (#13) and Painter (#14) to be developed simultaneously through identity refinement, four-view silhouette exploration and construction cards. This is a task authorization, not a change to the ratified normative standard or its eight-stage pipeline. The prior Sailor-only authorization notes are superseded for current execution. All three families remain UNASSIGNED pending each character's own owner silhouette/construction approval. Production renderer work is not authorized.

Current design-stage evidence: [revision 10 silhouette source](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg), [Run #678 artifact](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818), [Claude review package 04](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md), [preflight](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md) and [construction cards](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md). Design-source capture and internal visual inspection are complete; independent Claude critique and owner silhouette approval remain pending. This status does not alter the construction standard or authorize renderer implementation.

## Fourth-batch owner authorization — Sailor silhouette exploration only (2026-11-20)

The owner approved the refined role directions for Sailor (#12), Slicker (#13) and Painter (#14), and authorized Sailor silhouette exploration only. The exploration must follow the body-only plus prop-on four-view evidence method, evidence-based comparison against the two closest actual roster faces before selecting new face cues, and anatomy-before-props construction with four-view contact/handedness documentation. Compare Sailor against Clinic first, then Coach, Guard and Fisher at matched scale. These are human-review comparisons, not numeric gates.

Current exploration artifacts: [Sailor silhouette study 01](qa-artifacts/fourth-civilian-batch/SAILOR-SILHOUETTE-EXPLORATION-01.svg) and [construction card 01](qa-artifacts/fourth-civilian-batch/SAILOR-CONSTRUCTION-CARD-EXPLORATION-01.md). The silhouette is not approved; palette and renderer implementation remain unauthorized. Slicker and Painter remain queued. Keep all three construction families UNASSIGNED until their own silhouette gates pass.

# Vapor City Civilian Vector Construction Standard

## Owner approval — third batch and fourth-batch preflight (2026-11-20)

The owner approved Tech (#9), Hacker (#10) and Fisher (#11). Approval scope is stage-specific: Tech's production-rendered art is approved; Hacker and Fisher are approved as finished design-stage art, with production renderer implementation still outstanding. The post-correction Claude re-review has not been separately recorded.

The next batch is Sailor (#12), Slicker (#13), Painter (#14). Their identity and silhouette hypotheses are documented in [the fourth-batch preflight](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md). This preflight is planning only. Owner review of the hypotheses and subsequent four-view silhouette approval are required before renderer production. Keep their vector families UNASSIGNED until approved. Continue to use the eight-stage pipeline below; do not skip silhouette-first review.

## Owner approval and Run #603 closeout — 2026-11-20

## Owner authorization — Tech/Hacker/Fisher renderer implementation (2026-11-20)

The owner explicitly approved renderer implementation for the round-05 Tech/Hacker/Fisher silhouettes. This supersedes the earlier preparation-only authorization below. Build one character at a time: Tech first, then Hacker, then Fisher. Each renderer must pass internal four-direction native 64×96 and direct 28×42 QA plus visual inspection before starting the next character. This approval authorizes implementation, not acceptance of rendered output, independent review or golden snapshot changes.

## Owner-directed progression exception — third-batch preparation (2026-11-20)

The owner explicitly directed ChatGPT to proceed with preparing Tech, Hacker and Fisher without returning the prior Guard/Vendor/Clinic Run #629 output to Claude. This authorizes the third-batch design preflight only. It does not retroactively complete or waive the historical exact-output Claude review record for Run #629, and it does not approve the new silhouettes or authorize renderer implementation. The owner must approve the Tech/Hacker/Fisher construction preflight before their renderer work begins. Preserve this distinction in status reporting.

## Latest rendered-batch decision — Guard, Vendor and Clinic (2026-11-20)

The owner has approved the rendered Guard/Vendor/Clinic batch based on Run #629. The exact-output Claude independent review is still pending; under §12 and §13A the batch remains review-gated for formal closeout and the remaining 17 civilians remain on hold. See the Run #629 closeout record below and the linked review package.

This is the current authority for approval and rollout; historical run notes remain unchanged below.

- **Five-character art:** Usher, Cook, Courier, Coach and Referee are explicitly **APPROVED by the project owner**. Claude Run #603 recommended owner review, found no P0/P1 defects and verified Usher U4; it did not itself grant owner approval.
- **Preservation:** Cook C1 is deferred/accepted as-is; Usher U2 is declined; U4 is implemented/resolved; Coach/Courier rear X1 is accepted. Preserve the five approved designs unless the owner authorizes a new change.
- **Outline/style:** Claude withdrew its earlier claim that the five lacked Granny's outline. No blanket outline pass is warranted. A blind value-hierarchy/style comparison may be run later as an optional experiment, not a release gate.
- **F2 — handedness convention:** character-relative anatomy is authoritative. For a front-facing character, character-left appears viewer-right and character-right appears viewer-left; rear view reverses. Record both labels per direction. In profiles, record near/far relative to facing direction.
- **F3 — three must-survive items:** every card has exactly three items. The required direct-28×42 head-read cue is one of those three, not a fourth item.
- **F4 — backdrop evidence:** direct in-game 28×42 captures on fixed neutral-grey backgrounds are mandatory. Town/night composite is contextual regression evidence only unless the named character is explicitly spawned and individually captured at direct 28×42; otherwise mark character-specific town evidence unavailable.
- **F5 — shell-family register:** maintain the roster-wide shell-family audit before production of the remaining 17. Legacy archetype grouping is reference context, not a vector template. Record actual vector family only after silhouette exploration; unbuilt characters remain UNASSIGNED. No arbitrary family quota.
- **F6 — closest-face method:** compare new native 64×96 front/profile face crops against current roster using head/jaw proportions, eye placement/geometry, brow shape, nose/profile, cheek and mouth/expression. Exclude skin tone, hair colour, headwear and palette. Name the two closest faces, show matched-scale crops and state concrete geometric differences. This is a documented human comparison, not a numeric gate.
- **F7 — Cook card accuracy:** describe the approved render as a rounded chef-toque/curl mass and compact handled copper pan; note that the pan can read bowl-like at direct game scale. Documentation only; Cook's renderer remains unchanged.
- **Normative structure:** §§1–13 contain current rules. Dated reviewer/QA outcomes are historical evidence, not additional rules.
- **Current standard status:** revised in response to Claude F2–F7 and **RATIFIED BY THE PROJECT OWNER on 2026-11-19**. This version is the governing construction and QA standard for new civilian production. Changes to normative requirements require explicit owner authorization.
- **Next-batch preparation:** draft briefs for Guard, Vendor and Clinic worker and the 23-character shell-family register are linked in §14. Planning only; no renderer production begins until standard ratification and silhouette preflight are accepted.
- **Runner:** built but excluded from Claude Run #603; pending focused review and not part of the five-character approval.
- **Run #603:** [Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44658311124), artifact 14593339734. Targeted results passed; overall Actions failure remains due to unapproved snapshots (1 match / 23 changed) and 180 existing audio 404s. No golden snapshots were refreshed or approved.


## Guard, Vendor and Clinic — Run #629 closeout (2026-11-20)

## Guard, Vendor and Clinic — Run #629 and owner decision (2026-11-20)

- Final renderer source for this round: [`2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`](https://github.com/tinytime/Tinytime.github.io/commit/2bc1629edd82afc1a50ac7a4ab882b428dbd0c32). The final focused change moved Vendor's profile eye/brow inward onto the visible cheek plane after Run #628's automated face-distinctness checks passed but manual direct-game-scale inspection found the mark insufficiently legible.
- Browser QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), [artifact 14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Targeted vector/capture checks pass; overall Actions remains failed on the unapproved golden snapshot baseline (1 match / 23 changed) and existing audio/resource 404 console errors. No golden snapshots or provenance were changed.
- Inspected the exact Run #629 artifact: 12/12 native 64×96 and 12/12 direct 28×42 captures for Guard/Vendor/Clinic; Vendor's left and right profile eye now reads in both scales. Guard's near-side forearm/bracer/hand and Clinic's right-profile cord/coil remain present. Directional integrity 92/92, zero edge contacts and detached components, face distinctness 23/23 at both scales, prop audit, gallery, town smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- **Owner decision:** the project owner explicitly approved the rendered Guard, Vendor and Clinic Worker batch on 2026-11-20 after the Run #629 evidence review.
- **Independent-review record:** Claude's final independent review of this exact Run #629 commit/artifact is not yet recorded in the repository. Per the governing approval process, retain that as the outstanding independent-review gate; do not label the batch fully closed or release the remaining 17 until the exact-output review is logged. This records the owner's approval without fabricating reviewer sign-off.
- No golden snapshots changed. Existing global Actions blockers are tracked separately from the passing character-specific evidence.

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

The terms below define a consistent vocabulary if a specific measurement is later authorized. They are not routine numeric deliverables for new character briefs while semantic calibration is suspended. Active briefs use qualitative build descriptors, visible-silhouette notes, pose class and prop/foot-contact construction:

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
- Each identity brief specifies at least two purposeful face-construction cues, named by type (eye geometry/spacing, brow, nose/profile, cheek/jaw, mouth/expression or facial proportions) and distinct from the two closest roster faces. Determine the two closest faces by comparing matched native 64×96 front/profile crops for head/jaw proportions, eye placement/geometry, brow shape, nose/profile, cheek and mouth/expression. Exclude skin tone, hair colour, headwear and palette. Name the two comparators, show the crops, and state concrete geometric differences; this is a human comparison, not a numeric similarity gate. Skin tone, hair colour and headwear alone do not count.
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
5. Direct 28 × 42 captures on a fixed neutral-grey backdrop. Record exact backdrop asset/configuration and preserve it between review rounds. Town/night evidence is contextual regression evidence only unless the named character is explicitly spawned and individually captured at direct 28 × 42; otherwise mark character-specific town evidence unavailable.
6. A prop-contact table for every visible direction: arm/hand continuity, grip/support point, occlusion order, handedness and character-relative prop side.
7. Exactly three must-survive items on each identity card (silhouette/construction feature, signature prop/interaction, palette/headwear/major shape block). The direct-28×42 head-read cue must be named within one of these three items, not added as a fourth. Also list details allowed to disappear.
8. For animated/walking characters, a minimum two-frame-per-direction sheet (front, back, left, right) showing limb continuity, prop/hand stability, silhouette flicker and direction transitions. Static-only characters must record not-applicable.
9. Before/after side-by-side evidence for every correction finding, exact renderer commit, direction, native and direct game-scale captures, and pixel-diff method/threshold.
10. A package completeness manifest listing every required document, artifact, direction, scale, background, frame set, source commit and unavailable item.
11. Inspect clipping, edge contacts, detached components, limb/prop overlap, baseline, gallery and town context. A town composite is diagnostic only unless the named character was actually spawned and captured.

**Tier B — diagnostic roster audit**
- Pairwise full-character and torso-mask IoU tables with exact mask basis, alpha threshold, direction and scale.
- Every pair at or above 0.85 is review_required, not fail; include paired images and a human disposition.
- Maintain the roster-wide torso/garment-shell family table and accepted-exception register. No numeric cap; document recurrence and meaningful construction distinctions. Record legacy archetype groupings separately from actual vector construction families; leave unbuilt characters UNASSIGNED until silhouette exploration.

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
8. **Directional/game-scale QA:** capture all directions and scales; inspect direct game-scale captures on fixed neutral-grey backgrounds; treat town/night composites as contextual regression evidence unless the named character is individually spawned and captured; review walk/animation frames where applicable; run metrics and document findings.

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

The project owner explicitly ratified this revised standard on 2026-11-19. It is the governing standard for future civilian production. The five artworks were separately approved. Renderer production for Guard, Vendor and Clinic worker remains gated on owner approval of their silhouette/brief preflight.

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

For mirrored left/right views, character-relative anatomy is authoritative. In a front view, character-left appears viewer-right and character-right appears viewer-left; the rear view reverses. Record both labels per direction and near/far relative to profile facing. Mirroring is acceptable only when anatomy and prop side remain correct in each view. Maintain an accepted-exception register with exact pair/direction, evidence scales, rationale and owner disposition.



## 13A. Lessons ratified from the Guard/Vendor/Clinic correction round

These are repeatable construction and evidence requirements derived from the Run #624–#629 profile-correction cycle. They clarify the existing silhouette-first pipeline; they do not introduce numeric art targets or relax approval gates.

### Silhouette and directional anatomy

- A profile must read as one intentional near-side anatomy plane. Keep the near arm/hand and its bracer or prop-support relationship visible where the pose requires it; occlude the far arm unless a deliberate pose clearly establishes a separate plane. Do not let two arms stack into one ambiguous edge.
- Distinguish adjacent roster silhouettes through actual construction: headwear/hair contour, torso/garment shell, stance, limb placement and prop-support geometry. Palette or a small emblem alone cannot resolve a generic or overlapping silhouette.
- A profile prop must remain inside the sprite bounds and show a believable contact chain. For a tray or carried object, expose enough of the lip/edge and supporting hand to communicate both object and grip; move the construction inward rather than allowing a defining cue to clip at the canvas edge.
- Record character-relative near/far anatomy and prop handedness for each direction. Mirrored output must preserve the intended anatomical side, not merely mirror pixels.

### Face construction and game-scale legibility

- Profile eye/brow marks must sit on the visible cheek/face plane, forward of and clear of headwear brims, ears and hair masses. A mark placed behind an occluder or on the wrong face plane can exist in source and still disappear in the render.
- Do not accept a profile face because a uniqueness metric passes. Inspect both left and right profile crops at native 64×96 and direct 28×42. Automated face-distinctness is a screening check; human visual legibility is authoritative.
- Use the direct renderer's 28×42 capture, not a resized native image. Details should survive the actual game-scale rendering path; if they only read enlarged, revise placement/shape or deliberately simplify them.
- Judge the complete face construction (head/jaw, eye placement/geometry, brow, nose/profile, cheek and expression), not an isolated token pixel. Keep face cues character-specific and do not converge on one generic face system.

### Correction-round evidence and diagnosis

- Every focused visual correction must be followed by a fresh browser run against the exact renderer commit. Inspect the resulting artifact, not an earlier run or source code alone.
- For a profile-only correction, compare before/after captures and confirm unaffected front/back views remain unchanged. Still perform the full four-direction and two-scale regression review so unintended changes are caught.
- A complete visual review includes enlarged/native 64×96 and direct 28×42 views, all four directions, relevant prop-contact details, gallery/town context and any named character-specific contextual capture. Contact sheets aid comparison but do not replace opening small or ambiguous face/hand crops.
- Treat 0.85 pairwise silhouette IoU as a human-review prompt only. Review the exact pair, direction, mask definition and visible construction. Record accepted differentiation and rationale; do not reshape a character solely to improve a metric.
- Report character-specific capture/integrity results separately from unrelated project-wide failures such as unapproved golden snapshots or legacy resource 404s. A red overall workflow is not proof of a character defect; passing targeted checks is not by itself visual approval.

### Approval record

- Distinguish design/brief approval, rendered-character owner approval, internal QA, independent Claude review and final completion status. Record who approved what, on which exact renderer commit and artifact, and on what date.
- The owner may explicitly approve the rendered art, but the batch is not marked fully closed while a required independent review of the exact final output remains unrecorded. Do not imply Claude approval from an owner decision, automated checks or prior review of an earlier commit.
- Keep remaining roster work on hold until the defined gates are satisfied. Do not modify golden snapshots or provenance without explicit owner authorization.

## 14. Source references

- Historical review outcomes and dated run records: [Construction Standard — Historical Review and Run Log](qa-artifacts/standard-history/REVIEW-AND-VERSION-HISTORY.md).
- Run #603 five-character independent review: [Claude re-review log](qa-artifacts/five-civilian-corrections/CLAUDE-REREVIEW-RUN-603.md).
- Roster shell-family audit: [23-character shell-family register](qa-artifacts/next-civilian-batch/ROSTER-SHELL-FAMILY-AUDIT.md).
- Next-batch draft briefs: [Guard, Vendor and Clinic worker](qa-artifacts/next-civilian-batch/BATCH-1-GUARD-VENDOR-CLINIC-WORKER.md).
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
