# Correction package — Sailor, Slicker and Painter (revision 18)

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Status:** Claude's requested source corrections have been implemented. Fresh revision-18 QA and artifact inspection are pending; this is not an approval request and does not authorize renderer implementation.

## Current source

- Silhouette/design source: [SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg)
- Matched face study: [SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg](SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg)
- Construction cards: [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md)
- Internal QA log: [FOURTH-BATCH-INTERNAL-QA-LOG.md](FOURTH-BATCH-INTERNAL-QA-LOG.md)
- Evidence builder: `qa/build-fourth-batch-design-evidence.mjs` (now requires revision 18)
- Latest source commit: `50e267b01a76de1b95e31b766dc332da896ce543`
- Revision-18 source creation: `46a0457fb841c8981395f36b4b54eedfec8fb888`
- Evidence-builder retarget: `0d83656aa40aa2b9eb492dda909a2ed2c0768e98`

## Claude correction checklist

| Claude finding | Revision 18 source response | Verification still required |
|---|---|---|
| Painter profiles detached at head/torso | Both profile head/neck/shoulder paths are connected; the empty row gap is removed in source. | Inspect all four directions at native 64×96 and direct 28×42; confirm no new overlaps/clipping. |
| Slicker back has no rainwear cue | Added rear yoke and hem seams to the rain-shell body. | Confirm seams survive native and direct game scale and do not read as arbitrary stripes. |
| Slicker hood opening is enclosed / non-directional | Hood opening is now face-side-open and the profile shape is oriented toward the face. | Inspect both profile directions at direct 28×42 to confirm near/far orientation. |
| Slicker front closure splits torso; face study has a cap | Shortened the chest closure; revised the matched face study's Slicker headwear silhouette to a hood. | Confirm closure ends above the crotch gap and the face/body read as one hooded design. |
| Painter brush reads as dangling bundle and merges with thigh | Added a visible ferrule band and separated bristle strokes. Shifted the left-profile near-side leg rearward in both body-only and prop-on views to separate the brush mass from the thigh. | Confirm the tool reads as a brush at direct 28×42, hand→handle→ferrule→bristles chain is clear, and right profile remains prop-hidden. |
| Slicker/Painter faces too similar | Slicker retains close-set level brows and a narrow hood-framed face; Painter retains lifted asymmetric brow, squarer cheek/jaw and shorter profile nose. | Compare matched face crops at native/direct scales; final face distinction remains a human judgment. |
| Sailor coil bridge too thin; profile slits may vanish | Retain the thicker front coil-to-palm bridge and rear/profile arm separation. | Confirm front hand contact and profile gaps at direct 28×42. |

## QA status and limits

The last completed evidence, Runs #695 and #697, tested **revision 15**, not revision 18. Their 24/24 projection and 12/12 body-preservation results must not be attributed to revision 18.

Fresh revision-18 Actions execution, artifact retrieval, and manual inspection are outstanding. Once available, inspect:
- all 24 source views at native 64×96 and independently rasterized direct 28×42;
- nearest-neighbour enlargements for detached components, clipping and overlap;
- all 12 body-only/prop-on pairs, requiring zero removed body pixels;
- Painter left-profile brush separation and the complete contact chain;
- Slicker rear seams, both profile hood openings, shortened front closure and matched face study;
- Sailor front coil contact and profile arm gaps.

The global game-browser diagnostics historically fail on the explicitly unapproved golden-snapshot baseline and existing resource 404s. Do not refresh or approve golden snapshots or provenance. No new source-specific QA result is claimed here.

## Approval boundary

This remains design-stage vector work only. No production renderer, live town/gallery integration, approved character art, palette lock, golden snapshot or snapshot provenance has changed. Claude's re-review of the corrected exact output and the owner's final approval remain required. The remaining civilian roster stays on hold.
