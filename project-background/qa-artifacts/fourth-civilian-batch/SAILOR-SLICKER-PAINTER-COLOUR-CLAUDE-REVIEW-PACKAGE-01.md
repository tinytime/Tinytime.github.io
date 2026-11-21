# Sailor, Slicker and Painter — Stage 7 colour/rendering independent review package 01

**Prepared:** 2026-11-21  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Review stage:** non-production colour/material/rendering study  
**Disposition:** HOLD — not ready to send for independent review. Internal visual QA is NOT PASS pending owner disposition of inherited Sailor rear-coil clipping; not final art approval or production-renderer authorization



> **HOLD — do not send to Claude yet.** Reinspection of the exact Run #23 artifact found Sailor's rear rope coil clipped at the left frame edge in native 64×96 and direct 28×42 captures. The same clipping exists in the owner-approved revision-21 Run #810 artifact. No accepted exception is recorded. Stage 7 authorization protects revision-21 geometry, so the designer has not changed it. The owner must authorize a crop-safe correction or explicitly accept a documented exception before this package is sent. The direct contact-sheet labels also overlap; rebuild the overview before external review.

## Exact source and evidence

- **Exact tested commit:** `6531181acb141e33fb48bde12d773c96fba4cff8`
- **Current colour study:** [SAILOR-SLICKER-PAINTER-COLOUR-STUDY-05.svg](SAILOR-SLICKER-PAINTER-COLOUR-STUDY-05.svg), Git blob `905081e8021f6a6d4affdf53344525283b315c3e`.
- **Exact-source browser capture:** [Fourth Batch Colour Study Run #23](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850288600), artifact [14684903417](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850288600/artifacts/14684903417).
- **Capture manifest:** 24 panels; 72 PNG captures across native 64×96, independently rasterized direct 28×42 and enlarged 4×. Protected revision-21 paths 108/108; missing 0; body-only face overlays 9/9; prop-on face overlays 9/9; character-specific prop-face skin rules 3/3; material gradients 3/3; Slicker sleeve overrides 4/4.
- **Protected approved silhouette:** revision 21 SVG, blob `36f645d7de9ee5bedc79a0288c50bc8399382f4b`.
- **Integrated grayscale face input:** blob `59c71c823c2b42cd1ea039f724fce0c05e6dcc37`.
- **Design and rendering brief:** [SAILOR-SLICKER-PAINTER-COLOUR-AND-RENDERING-STUDY-01.md](SAILOR-SLICKER-PAINTER-COLOUR-AND-RENDERING-STUDY-01.md).
- **Construction cards:** [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-02.md](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-02.md).
- **Internal QA history:** [FOURTH-BATCH-INTERNAL-QA-LOG.md](FOURTH-BATCH-INTERNAL-QA-LOG.md).

## Review scope

Review all three characters together and individually against Granny Volt's craftsmanship benchmark (not as a design template) and the ratified Civilian Vector Construction Standard.

1. Palette separation and material logic: Sailor's harbour deck cloth/hemp/brass; Slicker's matte storm-slate rain shell and hood; Painter's oxide-clay canvas, indigo lower garment and wooden/metal flat brush.
2. Value hierarchy and restraint: controlled base/shadow/light planes, clean edges, no noisy texture or glossy over-rendering.
3. Face preservation and readability in all front/profile views, including prop-on panels, at native 64×96 and direct 28×42.
4. Directional consistency, near/far anatomy, clipping, silhouette preservation and body/prop state consistency.
5. Prop contact and handedness: Sailor's character-left mooring-line coil; Painter's character-right flat brush. Slicker has **no handheld signature prop**.
6. Roster distinction: these three must remain materially and visually distinct from one another and the existing civilians.

## Specific questions requiring independent judgement

- **Sailor #12:** Does the rope coil and exposed hand read as one believable contact chain at direct 28×42? Is the coil a secondary accent rather than a competing focal mass?
- **Slicker #13:** Does the integrated hood and pear-shaped shell read as coherent rainwear? The near-side sleeve/arm has been recoloured to the shell base material because the previous dark treatment looked like a separate carried object. Does the current treatment now read as garment construction, or does the approved revision-21 contour itself remain ambiguous? The brief explicitly prohibits a handheld prop; do not recommend adding one.
- **Painter #14:** Does the compact flat brush remain identifiable and convincingly gripped at direct 28×42? Does the warm smock retain material depth without losing leg/arm separation?

## Known limitations and approval boundaries

- This is a design-stage SVG study, not a production renderer capture. The live `npc_sprites.js` renderer still uses the existing generic civilian path for these characters; dedicated production renderer integration has not begun.
- Manual inspection of Run #23's native/direct contact sheets and selected 4× crops found the three palettes clearly separated, face overlays visible in body-only and prop-on panels, and no obvious clipping in the inspected views. Slicker's near-side sleeve/arm remains the principal ambiguity to judge.
- No production renderer, `npc_sprites.js`, town/gallery integration, golden snapshots or provenance were changed.
- Do not treat this review as permission to alter the approved revision-21 silhouette or face geometry. Any material contour change requires a separate owner decision.
- A positive independent review is not final owner approval. Production renderer implementation and integration remain gated on independent review and explicit owner authorization of final rendered art.

## Requested verdict

Please return:
- pass / conditional pass / revise for each character and for the batch as a whole;
- exact direction and scale for every finding;
- whether Slicker's near-side sleeve/arm is acceptable as garment construction;
- required corrections, if any, ranked by visual impact;
- confirmation that the approved revision-21 silhouettes and integrated grayscale face geometry remain intact.

