## Owner decision recorded — 2026-11-21

**Decision:** Option 1 authorized — proceed with the limited integrated grayscale design-stage face projections only. This authorization was given in the project conversation after presentation of this decision package.

The authorized work has been completed and internally QA'd. See [FOURTH-BATCH-INTEGRATED-FACE-INTERNAL-QA-01.md](FOURTH-BATCH-INTEGRATED-FACE-INTERNAL-QA-01.md) and [SAILOR-SLICKER-PAINTER-FACE-CLAUDE-REVIEW-PACKAGE-01.md](SAILOR-SLICKER-PAINTER-FACE-CLAUDE-REVIEW-PACKAGE-01.md). It does **not** approve final face geometry, palette, production renderer integration, golden snapshot changes, or characters #15–23. Independent Claude review and final owner approval remain pending.

# Sailor, Slicker and Painter — F6 face-stage owner decision package 01

**Prepared:** 2026-11-20 (QA evidence completed 2026-11-21 UTC)  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Package commit:** recorded in GitHub history  
**Exact corrected face-study source commit tested:** `ab95cc5da377ffe2c929f5ebc0d9fc3cdf59b5e0`  
**Corrected face SVG:** [SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-03.svg](SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-03.svg)  
**SVG blob:** `dc68b54e86b0d5a434ccebb22b34d9ac8e27bc76`  
**Approved outer baseline:** revision 21, source commit `be1c0c012894ccae23b4cbce2ad06e523fb460c5`  
**Status:** owner decision requested on the next evidence gate only. This package does not ask for face-art approval and does not authorize production renderer implementation.

## Executive summary

The face-study crop-layout defect is fixed and verified. Run #839 tested the exact corrected face-study source and produced six correctly aligned new-face crops and matched roster comparisons. Focused automated design-capture and semantic checks passed. Manual inspection confirms that the intended geometric differences are visible in the 40×38 grayscale comparisons.

However, the face studies are still isolated face geometry panels. They have not been composited into the approved full character heads and have not been captured at direct 28×42 through the project renderer. Correct face-plane placement, four-direction orientation/occlusion and actual game-scale readability are therefore unproven. Slicker's closer-eye-spacing distinction is also the least pronounced of the three at comparison scale.

**ChatGPT recommendation:** do not approve the face designs yet and do not send them to Claude as a completed internal-QA package. First authorize a narrowly scoped, non-production design-evidence step: integrate the proposed face geometry into the existing approved revision-21 head/silhouette studies solely for visual projection, then capture front and both profiles at native 64×96 and independently rendered direct 28×42, with enlarged diagnostics. Preserve the revision-21 outer silhouette and approved construction-detail geometry byte-for-byte. This is a design-stage evidence exercise only, not production renderer integration.

## Exact evidence

- [Corrected-source Browser QA Run #839](https://github.com/tinytime/Tinytime.github.io/actions/runs/44841485275)
- [Run #839 artifact 14681366588](https://github.com/tinytime/Tinytime.github.io/actions/runs/44841485275/artifacts/14681366588)
- Exact tested source commit: `ab95cc5da377ffe2c929f5ebc0d9fc3cdf59b5e0`
- Corrected face SVG blob: `dc68b54e86b0d5a434ccebb22b34d9ac8e27bc76`
- Internal findings: [FOURTH-BATCH-FACE-GEOMETRY-INTERNAL-QA-01.md](FOURTH-BATCH-FACE-GEOMETRY-INTERNAL-QA-01.md)
- Project tracker: [NPC_VECTOR_CHARACTER_TRACKER.md](../../NPC_VECTOR_CHARACTER_TRACKER.md)

### Artifact files manually inspected

- `fourth-batch-design/new-face-designs-matched-40x38.png`
- `fourth-batch-design/matched-face-comparisons-native-40x38.png`
- `fourth-batch-design/matched-face-comparisons-3x.png`

Run #838's equivalent comparison sheets are rejected and must not be used; its fixed-coordinate capture windows included labels/blank regions. Run #839 confirms the correction.

## Automated and manual findings

### Focused automated checks — PASS

- Exact-source design projection / roster face-crop capture.
- Fourth-batch construction-detail capture.
- Semantic civilian proportion and annotation validation.
- Review-sheet generation and artifact upload.

### Full workflow — FAIL, separate from the focused checks

- Global game-browser diagnostics report existing audio/resource HTTP 404 and sound-load messages.
- The log reports no page errors and no script errors.
- Golden comparison remains **1 match / 23 changed**. This is a protected, unapproved baseline; no snapshots or provenance were changed.
- Do not refresh snapshots or weaken the gate.

### Manual matched-crop review — PASS WITH LIMITS

- **Sailor vs Clinic/Guard:** stronger brow shelf and longer, slightly hooked profile nose/leaner lower-face transition are visible. The front brow is two separated strokes, not a literal uninterrupted contour.
- **Slicker vs Hacker/Courier:** compact level brow, closer-set eyes and tucked lower face are visible. The eye-spacing cue is comparatively subtle.
- **Painter vs Cook/Busker:** lifted asymmetric brow, squarer jaw turn and shorter/blunter profile nose are visible.
- The three profile studies face left as authored. All six crops contain the intended artwork with no capture labels or obvious crop clipping.

These findings apply only to the isolated grayscale comparison crops. They do not establish integrated head placement, headwear/hair occlusion, four-direction mapping or direct 28×42 legibility.

## Required next evidence, if authorized

1. Use approved revision-21 silhouette and construction geometry as immutable input.
2. Place only the proposed grayscale face geometry into the relevant full head studies. Do not change outer head contour, headwear, body, garment, props or palette.
3. Capture all three characters in front, left-profile and right-profile views at native 64×96.
4. Produce independently rendered direct 28×42 captures; do not resize native captures to simulate game scale.
5. Include enlarged nearest-neighbour diagnostic crops.
6. Verify character-relative side mapping, visible face plane, profile nose direction, brow/eye visibility, and absence of clipping/occlusion by cap, hood, hair or brim.
7. Recheck matched face differentiation against Sailor—Clinic/Guard, Slicker—Hacker/Courier, Painter—Cook/Busker.
8. Run targeted automated checks and inspect the actual artifact. Keep global browser failures and golden status separately reported.
9. Only after internal QA passes, prepare the exact-output package for Claude. Claude review and owner approval remain separate gates.

## Owner decision requested

Please choose the next gate:

- **Recommended — authorize integrated design-stage face projections:** allow the limited non-production evidence work described above. This does not approve the proposed faces or authorize production renderer integration.
- **Alternative — stop at the crop-comparison stage:** do not authorize further integration or renderer work; retain face exploration 03 as an unapproved grayscale proposal.
- **Alternative — revise the face geometry first:** provide character-specific changes before any integrated projection work.

No decision is inferred from this package.

## Approval and scope ledger

| Item | Current status |
|---|---|
| Revision-21 outer silhouettes | Owner-approved baseline; immutable for this stage |
| Construction cards 02 and family assignments | Owner-approved |
| Face exploration 03 grayscale crop layout | Corrected and exact-source tested |
| Matched 40×38 face comparison | Manually inspected; crop-stage pass with scale caveat |
| Integrated full-head placement | Not tested |
| Direct 28×42 face readability | Not tested |
| Four-direction face mapping / occlusion | Not tested |
| Internal face-stage QA | Incomplete |
| Claude independent face review | Not sent |
| Owner face-art approval | Not granted |
| Palette / production renderer | Not authorized |
| Golden snapshots / provenance | Protected; unchanged |
| Remaining roster #15–23 | Held |

