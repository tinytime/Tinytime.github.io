## Current design revision — internal QA PASS, owner review pending

**Exact tested design-package commit:** `4864fc565c2e08e662394c2ea406c37a119d2d59`  
**Current branch HEAD:** `9f3a23f402c03c3c3f3bd99e4b1ddb861ce91b51` (documentation-only follow-up; Batch 5 art and evidence-builder blobs are unchanged)  
**Silhouette blob:** `5892e66018fed61ceb02c3b222738d14870ce524`  
**Face/head blob:** `e3b5b58dbf8225f23453c8b097ef4c61343e4cd9`  
**Design-card blob:** `577af346658dd70fa99afe2825919fea4f64663b`  
**Roster-comparison blob:** `c92fadb679f35ec343f9e929c9826d04d433f28b`  
**Evidence-builder blob:** `98505716c117285dc7ef31c38adcac987931464b`

### Run #24 — exact-source design evidence

- [GitHub Actions Run #24](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850251480)
- [Artifact 14684123957](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850251480/artifacts/14684123957)
- Dedicated design-evidence workflow: **PASS**.
- Captures: 12 native 64×96 directional silhouettes, 12 independently rendered direct 28×42 silhouettes, 12 enlarged 4× diagnostics, six matched face crops and three full-roster silhouette comparison sheets.
- Connectivity: all 24 native/direct silhouette views report exactly one connected black component and zero contacts with any frame edge.
- Visual inspection: all four directions for Welder, Kid and Kid 2 were inspected at native, direct game scale and enlarged scale. The shortened Welder hose reads as a compact connected cable rather than a loose ring; the torch/hand contact and rear cylinder are integrated. Kid's glider stays within the profile frame and remains visible on the intended near-side views. Kid 2's closed hardback is connected to both hands and its cover/spine/page-edge seams remain visible; the beanie clears the frame.
- Full-roster comparison sheets cover the 15 existing designed civilians. Matched face rows compare Welder with Guard/Fisher, Kid with Dancer/Vendor, and Kid 2 with Clinic/Referee. The face/head study supplies distinct front/profile geometry for all three.

### Related full browser workflow

[Run #939](https://github.com/tinytime/Tinytime.github.io/actions/runs/44849914254) completed the fifth-batch design-projection step successfully. Its overall browser workflow failed at existing global audio-resource HTTP 404 diagnostics; its `pageErrors` and `scriptErrors` arrays were empty. The later [Run #945](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850251491) also completed the Batch 5 projection step successfully but was cancelled before the unrelated global browser checks completed. These are separate from the successful focused Batch 5 design-evidence workflow.

### Disposition and boundaries

**Internal design QA: PASS. Owner silhouette/construction approval: PENDING.** This package is ready for owner review of the three concepts together. All construction-family assignments remain **UNASSIGNED**.

A separate provisional full-colour render SVG exists in the branch, but it is out of scope for this design stage, was not captured by Run #24, is not palette-approved and is not production art. No production renderer, town/gallery, golden snapshot or provenance change was made or authorized.

# Fifth Civilian Batch — Internal QA Log

**Scope:** Welder #15, Kid #16 and Kid 2 #17  
**Branch:** `npc-granny-baseline-overhaul`  
**Status:** Design-stage internal QA in progress. Not review-ready, not independently reviewed, and not owner-approved.

## Current source checkpoint

The source files are pinned by exact Git blob SHA:

| Input | Path | Git blob SHA |
|---|---|---|
| Design cards | `project-background/qa-artifacts/fifth-civilian-batch/WELDER-KID-KID2-DESIGN-CARDS-01.md` | `577af346658dd70fa99afe2825919fea4f64663b` |
| Four-view silhouette sheet | `project-background/qa-artifacts/fifth-civilian-batch/WELDER-KID-KID2-SILHOUETTE-EXPLORATION-01.svg` | `5892e66018fed61ceb02c3b222738d14870ce524` |
| Face/head study | `project-background/qa-artifacts/fifth-civilian-batch/WELDER-KID-KID2-FACE-HEAD-EXPLORATION-01.svg` | `e3b5b58dbf8225f23453c8b097ef4c61343e4cd9` |
| Roster comparison | `project-background/qa-artifacts/fifth-civilian-batch/WELDER-KID-KID2-ROSTER-COMPARISON-01.md` | `c92fadb679f35ec343f9e929c9826d04d433f28b` |
| Browser evidence builder | `qa/build-fifth-batch-design-evidence.mjs` | `98505716c117285dc7ef31c38adcac987931464b` |

The exact tested artwork commit for Run #22 is `e3611fd918ca0b800a1d79616bd39357826f84b8`. Subsequent commits through current HEAD `57cff8e864dbee5ca240ac2a59f282bc04a7d39d` changed documentation only; the four Batch 5 source blobs above remain unchanged. The capture script pins the exact SVG blob IDs.

## Prior evidence and findings

### Run #883 — superseded source revision

- [GitHub Actions run #883](https://github.com/tinytime/Tinytime.github.io/actions/runs/44847586755)
- [Artifact 14684365547](https://github.com/tinytime/Tinytime.github.io/actions/runs/44847586755/artifacts/14684365547)
- Tested commit: `d5c78933a95152276ec96c84b98d393303889eef`
- The fifth-batch capture step produced 12 native 64×96 images, 12 independently rasterized 28×42 images and 12 enlarged diagnostic images. The full browser workflow had other global diagnostics; the artifact is not an approval.
- Manual inspection found the original sheet descriptions overlapping the first silhouette and front-face columns. The sheet layout was subsequently repositioned; the silhouette path data was preserved during that layout-only correction.
- Manual inspection of that older source also found narrow or disconnected head/torso joins in several rear/profile views, Welder torch/nozzle contact concerns, and a Kid 2 front-view book contact concern. These are findings against the old source, not conclusions about the current revision.

### Subsequent focused revisions

The repository subsequently records focused changes for:
- repositioning the silhouette and face/head study columns to remove text overlap;
- making Kid 2's book and near-hand contact visible in the left profile;
- connecting Kid 2 rear headwear and clarifying Welder's rear gas cylinder;
- correcting the matched face-crop coordinates after the face/head sheet was repositioned;
- pinning the capture builder to the revised silhouette and face/head source blobs;
- adding 8-connected black-pixel component and edge-contact diagnostics.

These revisions are implemented in the current source checkpoint above. **They have not yet received a successful exact-source visual rerender and manual inspection.** The earlier Run #883 images must not be used to waive the new checks.

The attempted exact-source browser run for commit `60f6ff8385d8026cb42034a75add14b3747d4a8b` was cancelled before the relevant capture step because concurrent branch updates cancelled the workflow. It produced no valid current-source artifact.

## Current evidence builder

The pinned Playwright builder is configured to produce:
- all 12 directional silhouettes at native 64×96;
- all 12 directions independently rasterized at direct 28×42 (not resized from native);
- enlarged 4× diagnostic images and the full silhouette sheet;
- the six face/head proposal panels;
- three matched native 64×96 roster silhouette comparison sheets using the 15 existing designed civilians;
- six matched 40×38 face-comparison rows and an enlarged comparison sheet;
- 8-connected black-pixel component counts, component sizes, bounds and edge-contact diagnostics for native and direct-scale images.

The connectivity report is diagnostic evidence only. It does not impose an invented numeric art-quality threshold and does not replace manual inspection. Granny Volt remains the separate 100×140 craftsmanship benchmark, not a silhouette template or a member of the 64×96 roster grid.

## Required internal QA before Claude review

1. Complete the browser workflow against the exact current source blobs and inspect the manifest's tested commit.
2. Inspect every front, back, left and right capture at 64×96 and direct 28×42, plus enlarged details.
3. Inspect all diagnostic multi-component and edge-contact cases manually. Confirm head/torso continuity, no unintended detached anatomy, and continuous hand → grip → prop contact.
4. Verify Welder's rear cylinder, harness support, hose and torch handedness/near-far visibility in all directions.
5. Verify Kid's glider contact, correct near/far visibility and intentional hiding in the right-facing profile.
6. Verify Kid 2's book is held by the hands in front and the intended near-side profile, with no accidental merging into the coat; verify rear headwear/neck continuity.
7. Inspect the matched roster silhouette sheets and matched face rows at their stated scales. Review Granny separately as a craftsmanship benchmark, not as a construction template.
8. Compare body-only and prop-on construction where required by the construction standard; record any missing evidence rather than treating prop-on silhouettes as body-only proof.
9. Complete internal QA before preparing a Claude review package. Claude review and final owner approval remain separate gates.

## Explicitly not authorized by this batch

No production renderer integration, palette/colour finalization, town/gallery integration, golden snapshot or snapshot-provenance changes, family assignment, or work on Mouse #18 and later roster characters.
