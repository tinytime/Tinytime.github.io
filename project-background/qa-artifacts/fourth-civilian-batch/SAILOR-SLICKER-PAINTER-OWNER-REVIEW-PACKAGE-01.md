# Owner review package — Sailor, Slicker and Painter (revision 14)

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Status:** submitted for owner design review only; not approved for renderer implementation.

## Source and evidence

- Design source: [SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-14.svg](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-14.svg), introduced at `a0c46c30fd42bdb717fa3893bd5a5759fc735d60`.
- Matched face geometry study: [SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg](SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg).
- Construction notes: [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md).
- Internal QA log: [FOURTH-BATCH-INTERNAL-QA-LOG.md](FOURTH-BATCH-INTERNAL-QA-LOG.md).
- Latest completed revision-14 evidence: [Run #691](https://github.com/tinytime/Tinytime.github.io/actions/runs/44786466007), tested source commit `6d0c27e71d17e0eaa20eb069926fee323bd255a7`, [artifact 14654237640](https://github.com/tinytime/Tinytime.github.io/actions/runs/44786466007/artifacts/14654237640). Run #691 is the verified source-projection evidence. A subsequent docs-only commit triggered Run #693 against the current branch head; it was pending when this package was prepared and is not counted as completed evidence.

## Claude correction checklist

| Review finding | Revision 14 response | Internal evidence / disposition |
|---|---|---|
| 1. Painter rear handedness and body-only preservation | Prop-on rear/profile constructions retain the same base body/arm geometry; brush is added without deleting body pixels. | 12/12 body-preservation checks passed; zero removed body pixels. |
| 2. Painter brush hand/contact, brush-vs-mallet readability, arbitrary profile threshold | Hand/grip supports the brush; head flares into a bristle edge; arbitrary minimum removed. | Painter left profile adds 143 silhouette pixels (141 in expected prop region); direct 28×42 projection inspected. Tool/hand cluster remains dense and should be judged by owner. |
| 3. Slicker umbrella ambiguity | Separate umbrella removed; integrated hood opening and diagonal storm closure replace it. | Direct 28×42 and native source projections inspected; clothing cue now reads as hood/closure. |
| 4. Painter headwear similarity to Sailor | Painter wears a knit beanie without Sailor's brim. | Matched face/head crops inspected. |
| 5. Painter asymmetric brow strength | Brow asymmetry strengthened; cheek/jaw and profile nose also differentiated. | Matched 40×38 geometric face comparison inspected; final face rendering still requires owner judgment. |
| 6. Sailor coil bridge and arm separation | Coil-to-palm bridge thickened; rear/profile arm gaps preserved. | Native/direct silhouette and prop comparisons inspected. |
| 7. Slicker pitch and hem asymmetry | Forward pitch and front/rear hem asymmetry exaggerated; umbrella replaced with integrated rain gear. | Native/direct silhouette projections inspected. |

## Internal QA results

- Design source: 24/24 views projected at native 64×96 and 24/24 independently rasterized at direct 28×42; 24/24 nearest-neighbour enlarged evidence images.
- Body integrity: 12/12 body-only/prop-on comparisons pass with zero removed body pixels.
- Face references: 69 current-roster crops and six matched comparison rows (Sailor vs Clinic/Guard; Slicker vs Hacker/Courier; Painter vs Cook/Busker).
- Manual inspection: body-native, body-direct, prop-native, prop-direct, front prop group and matched face comparison sheets reviewed. This is a source-art study, not a final pixel-rendered character approval.
- Ancillary existing-civilian checks in the browser report: 92/92 directional integrity, 20/20 direct 28×42 captures, 12/12 role debug, 10 archetype prop audit, gallery rendered.

## Outstanding QA caveat

The overall browser workflow remains failed at the global game-browser diagnostics gate. The golden snapshot metadata explicitly marks the baseline as `unapproved`; report shows 24 expected/present, one match (Granny) and 23 changed civilian captures, with none missing. The run also logged 180 resource 404 console entries, including audio resources. `pageErrors` and `scriptErrors` are empty. No golden snapshots or provenance were changed. Do not approve or refresh the golden baseline without explicit owner authorization. These global diagnostics are separate from the fourth-batch design-source checks.

## Decision requested

Please review the three distinct silhouettes, all four directions, the direct 28×42 readability, prop contact, and matched face geometry. In particular, scrutinize Painter's compact brush/hand cluster and whether Slicker's hood/closure is distinctive enough without an umbrella.

**No renderer implementation is authorized by this package.** After owner direction, the next gate is any requested design adjustment, followed by independent Claude comparative review of the revised package if requested/required, then explicit owner approval. Remaining roster characters stay on hold until this batch's direction is approved.
