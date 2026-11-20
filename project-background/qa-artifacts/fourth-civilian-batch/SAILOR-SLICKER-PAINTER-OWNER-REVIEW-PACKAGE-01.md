# Owner review package — Sailor, Slicker and Painter (revision 15)

**Prepared:** 2026-11-20  
**Repository:** tinytime/Tinytime.github.io  
**Branch:** npc-granny-baseline-overhaul  
**Status:** ready for owner design review; not approved for renderer implementation.

## Source and evidence

- Design source: [SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-15.svg](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-15.svg), tested at commit 9abb7de906314a092157f6d5bffe4492e7736cb9.
- Matched face geometry study: [SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg](SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg).
- Construction notes: [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md).
- Internal QA log: [FOURTH-BATCH-INTERNAL-QA-LOG.md](FOURTH-BATCH-INTERNAL-QA-LOG.md).
- Latest completed evidence: [Run #695](https://github.com/tinytime/Tinytime.github.io/actions/runs/44787355926), tested source commit 9abb7de906314a092157f6d5bffe4492e7736cb9, [artifact 14653489949](https://github.com/tinytime/Tinytime.github.io/actions/runs/44787355926/artifacts/14653489949).

## Claude correction checklist

| Review finding | Revision 15 response | Internal evidence / disposition |
|---|---|---|
| 1. Painter rear handedness and body-only preservation | Prop-on views retain the same base body and arm geometry; the profile arm/hand is shared with body-only and the brush is added below the hand. | All 12 body-only/prop-on comparisons passed with zero removed body pixels. |
| 2. Painter brush hand/contact, brush-vs-mallet readability and arbitrary profile threshold | Right hand visibly supports the brush in front/back/left profile; the head flares into a bristle edge. Arbitrary minimum removed. | Painter/left adds 143 pixels (141 in expected region); direct 28×42 inspected. Tool/hand cluster remains dense and should receive owner scrutiny. |
| 3. Slicker umbrella ambiguity | Separate umbrella removed; integrated face-framing hood, diagonal storm closure and longer character-left storm flap replace it. | Direct 28×42, native and enlarged projections inspected; rainwear reads as integrated clothing rather than a club/paddle. |
| 4. Painter headwear similarity to Sailor | Painter uses a knit beanie without Sailor's flat brim. | Matched face/head crops inspected. |
| 5. Painter asymmetric brow strength | Brow asymmetry strengthened; cheek/jaw and profile nose differentiated. | Six matched geometric face comparisons inspected; final face rendering still needs owner judgment. |
| 6. Sailor coil bridge and arm separation | Coil-to-palm bridge thickened; rear/profile arm negative-space breaks retained. | Native/direct silhouette and prop comparisons inspected. |
| 7. Slicker pitch and hem asymmetry | Profile forward lean retained; front/rear character-left storm flap makes the uneven rain-smock hem more legible. | Direct 28×42 and enlarged front/back/profile views inspected. |

## Internal QA results

- Design-source evidence: 24/24 views projected at native 64×96, 24/24 independently rasterized at direct 28×42, and 24/24 nearest-neighbour enlarged images.
- Body integrity: 12/12 body-only/prop-on pairs pass with zero removed body pixels.
- Separate prop audit: Sailor/right +172 pixels; Painter/left +143 total / +141 in the expected region. Counts are descriptive; no arbitrary threshold is used. Slicker has integrated weather detail rather than a separate prop.
- Face references: 69 current-roster crops and six matched 40×38 comparison rows (Sailor vs Clinic/Guard; Slicker vs Hacker/Courier; Painter vs Cook/Busker).
- Manual inspection: body-native/direct, prop-native/direct, front prop group, enlarged directional crops, matched face comparisons and Sailor/Welder rear diagnostic reviewed.
- Cross-roster body comparison: inspected Clinic, Guard, Coach, Courier and Fisher directional captures, plus the existing five-civilian black-silhouette sheet (Usher, Cook, Ref). Sailor's nearest body resemblance is Usher/Coach due to upright narrow mass, differentiated by flat-brim deck cap, longer stance, separated arms and coil. Slicker differs from Fisher/Cook/Guard through pear-shaped hooded smock, face opening and storm flap. Painter differs from Coach/Courier/Ref through open reaching pose and hip-level brush. These are qualitative comparisons, not pixel-normalized pairs: existing roster assets are game-rendered sprites while these are design-source silhouettes.
- The Sailor/Welder rear diagnostic is vector-versus-legacy-pixel, not like-for-like. Face comparisons are grayscale geometry beside painted roster crops, not final character rendering approval.

## Outstanding QA caveat

The overall browser workflow remains failed at the global game-browser diagnostics gate. The golden snapshot metadata explicitly marks the baseline unapproved: 24 expected/present, one match (Granny), 23 changed civilian captures and none missing. The run also logged 180 resource 404 console entries, including audio resources. pageErrors and scriptErrors are empty. No golden snapshots or provenance were refreshed or approved. Ancillary checks passed: syntax and sprite module, NPC inventory, palette/body checks, atlas runtime and vertical fallback, 20/20 game-scale captures, 92/92 directional integrity, 12/12 role debug, 10 archetype prop audit and gallery render. These are existing-renderer diagnostics, not proof of live integration for these design candidates.

## Decision requested

Please review the three distinct silhouettes, all four directions, direct 28×42 readability, prop contact and matched face geometry. In particular, scrutinize Painter's compact brush/hand cluster, Sailor's nearest resemblance to Usher/Coach, and whether Slicker's longer storm flap gives the rain smock enough front/rear asymmetry.

**No renderer implementation is authorized by this package.** The supplied Claude review drove the corrections, but independent Claude re-review of revision 15 has not yet been performed. After owner direction, the next gate is any requested design adjustment, then independent review if required, then explicit owner approval. Remaining roster characters stay on hold until this batch's direction is approved.
