# Five-Civilian P2 Correction — Internal QA Record

**Date:** 2026-11-20  
**Renderer source tested:** `3d1ec4bcbac231e99e75d36f21e79a5fcf7fd4eb`  
**Evidence-builder commit:** `90c5d266279c61461b460b024ee96e71f327e081`  
**Baseline:** Run #595, renderer `c354abfa3d78b46dc982a03d2c5d1ece0c918257`, artifact `14587318765`  
**Corrected captures:** Run #599, artifact `14590034123`  
**Expanded review package:** Run #600, artifact `14591690387`

## Scope and owner authorization

The owner authorized four P2 areas from Claude's Run #595 review:
- F1: distinctive face construction for Courier, Usher and Cook.
- U1: stronger Usher profile shoe/sole separation from the light trousers.
- C1: clear Cook pan shape, handle and gripping-hand contact at direct 28×42.
- X1: document and evidence the Coach/Courier rear distinction without unnecessary torso redesign.

Referee was deliberately left unchanged. Runner and the remaining 17 are out of scope.

## Automated QA

Run #599 tested the exact renderer source `3d1ec4b`. Run #600 reran the same renderer with the expanded evidence builder.

| Check | Run #599 / #600 |
|---|---|
| JavaScript syntax and NPC module load | PASS |
| Native captures | 20/20 at 64×96 |
| Direct game-scale captures | 20/20 at 28×42, direct `owCiv` render, no resize |
| Directional integrity | PASS 92/92, zero edge contacts |
| Detached large components | 0 |
| Role debug | PASS 12/12 |
| Prop audit | PASS, 10 archetypes |
| Gallery | PASS |
| Page errors | 0 |
| Script errors | 0 |
| Console errors | 180 expected missing-audio 404s |

The overall Actions workflow concludes **FAILED** because the browser diagnostics count the 180 missing-audio 404s, the full-roster silhouette gate remains Clinic/Sailor front IoU `0.9094292803970223`, and the golden snapshot gate remains unapproved (1 match / 23 changed). These are pre-existing environment/global gates, not P2 character-specific defects. Do not modify audio assets or golden snapshots as part of this work.

## Visual inspection

The following actual artifacts were inspected: native and direct 28×42 contact sheets; Cook front/left/right close-ups at both scales; Usher direct game-scale readability; Coach/Courier rear comparison at both scales; solid-black silhouette sheet; and the town-ground composite.

- **Usher (U1):** profile shoes are dark slate/charcoal and now clearly separate from pale trouser planes in both direct 28×42 side views. The front and profile face cues are also revised.
- **Cook (C1):** front pan is a shallow, wide skillet rather than a tall cup; its handle is drawn over the lower pan edge and the gripping hand is painted last. Profile pans remain shallow and distinct. Run #599 has no edge clipping. The cuff/forearm/hand chain is retained.
- **Cook face (F1):** broader cheek construction, fuller smile and softened/heavier brow structure distinguish the chef's warm expression.
- **Courier face (F1):** asymmetrical alert gaze, sharper nose/profile contour and tighter half-smile differentiate the messenger.
- **Usher face (F1):** narrower composed face, narrower/hooded eye construction, restrained mouth and formal brow treatment distinguish the attendant.
- **Coach/Courier rear (X1):** Coach has a straight jacket hem and visible side elbow/hand negative space; Courier has an A-line coat with arms more integrated/occluded by the coat. Their cap/hair construction and shoe values also differ. This is a human-reviewed distinction, not an IoU threshold. No torso code was changed.
- **Referee:** pixel-identical to Run #595 in all four directions at native and direct game scale. Raised arm/card, stripes, red shorts and white socks are preserved.

The black silhouette sheet is derived from native alpha masks and is a shape-inspection aid, not a semantic anatomy mask. The town-ground composite places direct 28×42 sprites over the actual captured night-town screenshot to inspect palette/value contrast. It is explicitly a **diagnostic composite, not proof of live named-NPC spawn or game placement**. The ordinary town screenshot remains regression context only.

## Before/after pixel diffs

Run #595 baseline versus Run #599 corrected captures. Changed-pixel counts are exact image differences, not quality scores.

| Character / view | Native 64×96 changed pixels | Direct 28×42 changed pixels |
|---|---:|---:|
| Usher front | 120 | 48 |
| Usher back | 0 | 0 |
| Usher left | 111 | 34 |
| Usher right | 111 | 34 |
| Cook front | 276 | 83 |
| Cook back | 0 | 0 |
| Cook left | 221 | 66 |
| Cook right | 221 | 65 |
| Courier front | 70 | 25 |
| Courier back | 9 | 6 |
| Courier left | 42 | 19 |
| Courier right | 42 | 17 |
| Coach all four | 0 | 0 |
| Referee all four | 0 | 0 |

The before and after PNGs have matching filenames in the Run #595 and Run #599 artifacts. Inspect the actual captures; diffs only locate the changed regions. Coach/Courier rear is unchanged in source and render; X1 is addressed through written rationale and paired evidence.

## Evidence package contents

Run #600 artifact `14591690387` includes:
- 20 native directional captures and 20 direct 28×42 captures.
- Native and game-scale contact sheets.
- `five-civilian-black-silhouette-4x-contact-sheet.png`.
- `five-civilian-town-ground-composite.png` (diagnostic only).
- Coach/Courier rear comparisons, Cook prop-contact sheets and Usher game-scale sheet.
- Role-debug, gallery, town regression, report and logs.

## Disposition

**Internal QA: targeted P2 corrections visually pass at the inspected native and direct game scales.** The Cook pan now reads as a shallow skillet with a visible handle, with no edge clipping. The remaining P2 decisions require Claude to judge whether the face cues are sufficiently individual and whether the Coach/Courier rear rationale is acceptable.

All five characters remain **NOT APPROVED**. Next: submit this exact evidence and the Version 2.1 construction standard to Claude for independent comparative re-review. The owner makes final approval. Runner remains excluded; remaining 17 stay on hold. No golden snapshots or approvals were changed.
