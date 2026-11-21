## Current design revision — exact-source rerender required

**Current source commit:** `9e70682fd65606a05543cfc774d34a8cfa1e7e40`  
**Current silhouette source blob:** `9d66d21fa2126568ccad8bc8ccc0575f45ee66eb`  
**Face/head source blob:** `e3b5b58dbf8225f23453c8b097ef4c61343e4cd9`  
**Evidence builder blob:** `7d1a8d9d11e9b7f0574d1d1114f2940e08257709`

The previous successful design-evidence capture was [Run #19](https://github.com/github.com/tinytime/Tinytime.github.io/actions/runs/44849382535), artifact `14683888322`, tested commit `5340d66ea9c83152d92e6b0a92d0fef9cc9a6df9`. It generated all 12 native 64×96 and 12 independently rendered direct 28×42 silhouette views, enlarged diagnostics, full-roster silhouette comparison sheets and matched 40×38 face comparisons. Manual inspection found no edge contacts and no disconnected black components in its connectivity report. The direct-scale silhouettes were legible and the full-roster comparisons showed distinct body/prop reads.

Manual review of Run #19 nevertheless identified two design-read refinements:
- Welder's large front hose loop read like a ring rather than a cable route from torch to the body.
- Kid 2's two-page open-book shape resembled spectacles at 4× diagnostic scale.

Those two points have been revised in the current source: Welder's exposed hose segment is shortened to a compact connected curve; Kid 2 now holds a single closed hardback with a visible cover, spine and page-edge seam. The design card was updated to match. **Run #19 does not test these latest changes.** A fresh exact-source render and inspection is required before internal QA can pass.

The current evidence builder intentionally captures identity, silhouette, face and roster-comparison evidence only. A separate provisional full-colour render file exists in the branch, but it is **out of scope for this stage**, is not captured by this evidence run, and is not palette-approved or production art. Do not use it to infer palette approval.

**Current disposition:** internal design QA remains open pending exact-source rerender and visual inspection. Construction-family assignments remain UNASSIGNED. No production renderer, golden snapshot or provenance change is authorized.

# Fifth Civilian Batch — Internal QA Log

**Scope:** Welder #15, Kid #16 and Kid 2 #17  
**Branch:** `npc-granny-baseline-overhaul`  
**Status:** Design-stage internal QA in progress. Not review-ready, not independently reviewed, and not owner-approved.

## Current source checkpoint

The source files are pinned by exact Git blob SHA:

| Input | Path | Git blob SHA |
|---|---|---|
| Design cards | `project-background/qa-artifacts/fifth-civilian-batch/WELDER-KID-KID2-DESIGN-CARDS-01.md` | `aca33aed6b2bfb66c2d90e323bfbcfe68221782a` |
| Four-view silhouette sheet | `project-background/qa-artifacts/fifth-civilian-batch/WELDER-KID-KID2-SILHOUETTE-EXPLORATION-01.svg` | `8bc0b82833c6efd83a4f1fd3f9fe1a7955313843` |
| Face/head study | `project-background/qa-artifacts/fifth-civilian-batch/WELDER-KID-KID2-FACE-HEAD-EXPLORATION-01.svg` | `e3b5b58dbf8225f23453c8b097ef4c61343e4cd9` |
| Browser evidence builder | `qa/build-fifth-batch-design-evidence.mjs` | `c9e7fe44db8b2e12575c541d54e714b9710dacce` |

The current branch HEAD before this QA-log update is `638f4c3a1d7aa6a39189f3da1b5959b8e908af57`. The next browser run must record its own exact tested commit in the generated manifest. The source SVGs are pinned in the capture script; a successful build against an earlier blob is not evidence for a later source revision.

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
