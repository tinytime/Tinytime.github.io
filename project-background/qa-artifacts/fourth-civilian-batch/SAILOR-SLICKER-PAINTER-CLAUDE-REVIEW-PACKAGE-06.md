# Sailor, Slicker and Painter — independent Claude design review package 06

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Exact tested commit:** `5beb3709dd5080313e6ddea5248ef8698f74dd51`  
**Revision 21 SVG blob:** `02f7ffb3854a8bacdaf00ca6198ae411c3122602`  
**Current source:** [revision 21 SVG](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg)  
**Exact evidence:** [Run #808](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663) · [artifact 14663163320](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663/artifacts/14663163320)  
**Stage:** design-source silhouettes, body/prop construction and geometric face studies only

Package 06 supersedes package 05 for the current review. It is bound to the exact revision-21 source and Run #808 artifact above. It is prepared for independent review but has not yet been sent; no Claude response is recorded.

## Authority and review boundary

The owner authorized simultaneous design-stage exploration of Sailor (#12), Slicker (#13) and Painter (#14). This package requests independent critique only. It does not grant owner approval, assign a construction family, authorize palette/final rendering, or authorize production renderer integration.

ChatGPT completed internal design-source checks and inspected the actual native/direct projections. Claude's independent verdict is pending.

## Evidence inventory and QA results

- 24/24 native 64×96 body-only/prop-on captures.
- 24/24 independently rendered direct 28×42 captures; these are not resized native images.
- 24/24 enlarged 4× views.
- Matched face comparisons at native 40×38 and enlarged views, with closest existing roster comparators.
- Sailor/Welder rear silhouette comparison.
- Body-preservation audit: 12/12 pass, zero removed body pixels.
- Anatomy/prop connectivity audit: 48/48 pass, one connected component per capture.
- Near-side profile prop audit: 2/2 pass. Sailor/right: 53 added silhouette pixels, all 53 in the configured prop region. Painter/left: 159 added silhouette pixels, 26 in the configured prop region, zero removed body pixels. These are diagnostics, not numeric approval thresholds.
- All eight Slicker body/prop direction panels are byte-identical to revision 18.

The overall GitHub Actions workflow remains failed at global browser diagnostics: pageErrors=0, scriptErrors=0, 135 audio/resource HTTP 404 responses plus 45 corresponding sound-load console messages, and an unapproved golden-snapshot gate of 1 match / 23 changed. The design projection, semantic validation, gallery and review-sheet generation passed. No golden snapshot or provenance was modified.

## Character-specific review

### Sailor #12 — deckhand / harbor sailor

Review the compact rope coil and spiral as actual coiled line rather than a tire, shield or life ring at direct 28×42 and native 64×96. Assess the hand/coil contact chain in front, rear and near-side right profile. Confirm character-left carry: front viewer-right, rear viewer-left, visible right profile only; far-side left profile hides the prop.

Evaluate the narrow upright deck-coat silhouette, cap, collar, body-only arm/torso readability and distinction from Welder. The Sailor/Welder rear comparison is included. Confirm the near-side coil remains connected and legible without extra detached accents.

### Slicker #13 — rainwear civilian

Revision 18 is preserved exactly; all eight body/prop panels are byte-identical. This is a preservation review, not a redesign request. Confirm the face-side hood opening, rear yoke/hem, storm closure, garment silhouette and near/far profile consistency remain coherent at direct and native scales. Do not request ornamental changes merely to make this character differ from the other two.

### Painter #14 — sign painter / muralist

Assess the compact brush at direct 28×42: does the connected scalloped bristle edge, ferrule and diagonal handle read immediately as a paintbrush rather than a hammer, scraper or block? Inspect front, rear and near-side left profile; confirm far-side right profile hides the brush. Assess the hand-to-handle contact and whether the extended reaching arm remains clear of the frame.

The current smock uses paired side darts rather than a full-width hem stroke; the latter was removed after it disconnected the torso/leg silhouette. Confirm the side darts read as garment construction without looking arbitrary. Check body-only anatomy and front/back continuity. Character-right carry is front viewer-left, rear viewer-right, visible left profile only.

The profile prop audit reports 159 added silhouette pixels, 26 within the configured prop region. This is not an automatic failure or numeric approval threshold; please inspect whether the remaining additions are credible arm/hand extension and whether the brush contact is clear.

## Required Claude response

For each character, provide one verdict: **PASS**, **PASS WITH NON-BLOCKING NOTES**, or **CHANGES REQUIRED**.

1. Strongest and weakest body-only silhouette cues before props.
2. Four-direction orientation, near/far anatomy and handedness.
3. Any clipping, detached geometry, outline cuts, unsupported hand contact or ambiguous joins, with exact direction.
4. Prop recognition, contact chain and subordination at direct 28×42 and native scale.
5. Two genuinely distinctive face-geometry cues at small scale and closest roster comparator.
6. Sailor/Welder rear differentiation.
7. Slicker preservation against revision 18.
8. Set-level differentiation from one another and nearest existing roster figures.
9. Corrections ranked by severity. Do not invent IoU or pixel-count pass thresholds.
10. Explicitly separate required design corrections from subjective owner-choice questions.

## Approval boundary and next gate

ChatGPT's internal design-source QA is complete for this exact source/artifact pair. Independent Claude review is pending. ChatGPT will evaluate every finding and implement valid, authorized design-stage corrections. The owner then makes the final silhouette/construction decision.

All three construction families remain **UNASSIGNED**. No silhouette, face, prop or palette is owner-approved. No production renderer integration or golden snapshot/provenance change is authorized. Roster #15–23 remains on hold.
