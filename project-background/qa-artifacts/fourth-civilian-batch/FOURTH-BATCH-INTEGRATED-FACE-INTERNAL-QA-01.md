# Sailor, Slicker and Painter — integrated grayscale face study internal QA 01

**Prepared:** 2026-11-21  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Exact tested source commit:** `a857f7b4d2238ef8fd63da99465aa27ee11cafe0`  
**Approved revision-21 silhouette baseline:** `be1c0c012894ccae23b4cbce2ad06e523fb460c5`  
**Revision-21 source blob verified by the capture script:** `36f645d7de9ee5bedc79a0288c50bc8399382f4b`  
**Actions run:** [#867](https://github.com/tinytime/Tinytime.github.io/actions/runs/44845374254)  
**Artifact:** [vapor-city-browser-qa — 14682766863](https://github.com/tinytime/Tinytime.github.io/actions/runs/44845374254/artifacts/14682766863)

## Verdict

**Internal design-stage QA: PASS WITH GAME-SCALE READABILITY CAVEAT.**

The limited grayscale face integration is implemented and its required evidence was generated and manually inspected. The integrated F6 face stage is internally QA'd for handoff to independent review. This is not owner approval, final face-art approval, palette approval, or production-renderer approval.

## Authorized scope

The owner authorized the limited step of integrating the grayscale face proposals into the approved revision-21 full-head studies for front, left-profile and right-profile directions.

The work remains a separate non-production design overlay:
- `SAILOR-SLICKER-PAINTER-INTEGRATED-FACE-OVERLAYS-01.svg`
- `qa/build-fourth-batch-integrated-face-evidence.mjs`

The capture script verifies the approved revision-21 SVG source blob before rendering. The revision-21 silhouette source and construction-detail source were not edited. No production renderer, palette, golden snapshot or provenance file was changed.

## Automated evidence — exact source

Run #867 completed the following focused steps successfully:
- Fourth-batch design-source projections and roster face crops.
- Integrated fourth-batch grayscale face projections.
- Construction-detail study captures.
- Semantic civilian proportion and annotation validation.
- Granny semantic overlay, six-civilian annotation overlay and five-civilian review-sheet generation.
- Artifact upload.

Integrated face evidence:
- 9 native 64×96 captures (3 characters × front/left/right).
- 9 independently rendered direct 28×42 captures.
- 9 nearest-neighbour enlarged 4× diagnostics.
- 9 integrated 40×38 face crops.
- 6 matched-face comparison rows.

Comparison pairs:
- Sailor front and left profile against Clinic and Guard.
- Slicker front and left profile against Hacker and Courier.
- Painter front and left profile against Cook and Busker.

The direct 28×42 images are independent captures, not resized native images.

## Manual visual inspection

Inspected the actual Run #867 artifact:
- `integrated-faces-native-64x96.png`
- `integrated-faces-direct-28x42.png`
- native 64×96 and direct 28×42 contact sheets (all nine views at each scale)
- `integrated-matched-face-comparisons-native-40x38.png`
- `integrated-matched-face-comparisons-3x.png`
- selected enlarged individual views, including Sailor, Slicker and Painter profile captures

Findings:
- **Sailor #12:** The stronger front brow shelf and distinctive profile nose/leaner lower-face transition are integrated. The brow reads as two separated strokes rather than a single uninterrupted contour. Both profile directions preserve correct nose orientation and remain visible under the cap.
- **Slicker #13:** The compact brow and closer-set front eyes are visible. The left and right profile studies align the face plane with the hood opening; the hood remains a distinct mass above and behind the face rather than swallowing it. At direct 28×42, the profile eye/brow cue remains the least pronounced and deserves explicit independent scrutiny.
- **Painter #14:** The lifted asymmetric front brow, squarer jaw turn and shorter/blunter profile nose are integrated. The beanie/hair silhouette does not obscure the face. Both profile directions read coherently.
- Across the nine native views, face marks remain within the visible head openings; no face geometry was found to clip through the cap, hood or beanie.
- At direct 28×42, identity is carried mainly by eye/brow placement and nose/jaw silhouette. Fine mouth marks compress. This is acceptable for internal review evidence but remains a review question rather than final approval.

## Global browser QA boundary

The overall browser QA job remains **failed** at the global game-browser diagnostics step. In the diagnostic payload:
- `scriptErrors: []`
- `pageErrors: []`
- `consoleErrors` include HTTP 404 resource failures for existing audio assets, including `/audio/mus_r2.b935fef0.mp3` and `/audio/amb_r2.8708e683.mp3`
- golden snapshot gate: **1 match / 23 changed**

Other logged browser checks include directional integrity 92/92, direct 28×42 capture assertion 20/20, role debug 12/12, prop audit 10 archetypes, and gallery rendered. No golden snapshots were refreshed or approved. The global failure is not represented as a passing browser workflow.

## Next gate

The independent Claude review package is [SAILOR-SLICKER-PAINTER-FACE-CLAUDE-REVIEW-PACKAGE-01.md](SAILOR-SLICKER-PAINTER-FACE-CLAUDE-REVIEW-PACKAGE-01.md). It is prepared in the repository but has **not** been sent and has **not** been independently reviewed.

The face proposals remain unapproved pending independent review and owner decision. Do not begin palette work, production renderer integration, town/gallery placement or spawn validation, golden snapshot refresh, or characters #15–23.
