# Sailor, Slicker and Painter — independent Claude design review package 05

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Exact reviewed design source commit:** `73774e27092de36fd88f45b0d5cb6c97f760c7ea`  
**Current source:** [revision 18 SVG](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg)  
**Exact evidence:** [Run #730](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551) · [artifact 14658967396](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551/artifacts/14658967396)  
**Stage:** design-source silhouettes, body/prop construction and geometric face studies only

Package 05 supersedes packages 01–04 for current review. The tested design source remains commit `73774e27092de36fd88f45b0d5cb6c97f760c7ea`; later documentation-only commits do not change the tested SVG or evidence.

## Authority and review boundary

The owner authorized simultaneous design-stage exploration for Sailor (#12), Slicker (#13) and Painter (#14). The owner has **not** approved any final silhouette, construction family, face, prop or palette. Production renderer implementation is **not authorized**. Granny Volt is the 10/10 craft benchmark, not a template. Each character must retain an original silhouette, face, clothing construction, prop and personality.

Please review only the exact revision-18 source and evidence cited here. Do not modify repository files. Claude's review is independent and advisory; the owner makes all final decisions.

## Exact evidence and source files

- Revision 18 SVG: [SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg)
- Exact-source Actions run: [Run #730](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551)
- Artifact: [14658967396 — vapor-city-browser-qa](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551/artifacts/14658967396)
- Tested source commit: `73774e27092de36fd88f45b0d5cb6c97f760c7ea`
- Construction cards: [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md)
- Owner-approved role hypotheses/constraints: [preflight](SAILOR-SLICKER-PAINTER-PREFLIGHT.md)
- Internal QA log: [FOURTH-BATCH-INTERNAL-QA-LOG.md](FOURTH-BATCH-INTERNAL-QA-LOG.md)
- Matched face evidence: `fourth-batch-design/matched-face-comparisons-native-40x38.png`
- Body-only sheets: `fourth-batch-design/body-native-comparison.png`, `body-direct-comparison.png`
- Prop-on sheets: `fourth-batch-design/prop-native-comparison.png`, `prop-direct-comparison.png`, `prop-front-group-comparison.png`
- Sailor/Welder rear diagnostic: `fourth-batch-design/sailor-welder-back-silhouette-comparison.png`
- All-civilian anatomy connectivity: `fourth-batch-design/anatomy-connectivity-audit.json`
- Body preservation: `fourth-batch-design/body-preservation-audit.json`
- Individual native, direct 28×42 and enlarged crops: `fourth-batch-design/{sailor,slicker,painter}-*.png`

The artifact includes 24 body-only/prop-on figure fields, 24 native 64×96 captures, 24 independently vector-rasterized direct 28×42 captures, 24 enlarged nearest-neighbour captures, 69 roster face crops, six new face-design crops and six matched face-comparison rows. Direct 28×42 images are not resized native images.

## Internal QA results

**Revision-18 design projection and semantic proportion/annotation validation: PASS.**

- 24/24 native 64×96, 24/24 independent direct 28×42 and 24/24 enlarged projections.
- 69 roster face crops and six matched 40×38 face rows.
- All 12 body-only/prop-on pairs preserve every body pixel (`removedBodyPixels=0`).
- All three civilians' body-only and prop-on figures each form one connected component in all four directions at both native and direct scales (48/48 projections).
- Profile prop audit: Sailor/right +172 added pixels; Painter/left +153 total / +151 expected-region pixels. These are descriptive values, not invented acceptance thresholds.

**Actual artifact visual inspection: completed with review questions.**

Inspected the native/direct body and prop comparison sheets, front prop group, Sailor/Welder rear comparison, matched face rows, and enlarged Painter/Sailor details.

- **Sailor:** compact upright body and four-view arm separations remain visible. The coil is legible as a loop, but the precise hand-to-rope grasp remains subtle. Please scrutinize contact, handedness and whether the prop is sufficiently subordinate.
- **Slicker:** the integrated face-side-open hood, long rain shell, shortened closure and rear yoke/hem read as rainwear. There is no separate umbrella. Judge whether the clothing construction alone gives a sufficiently distinctive silhouette.
- **Painter:** head/neck joins and body anatomy are connected. Brush/hand/handle/ferrule/bristle construction is one component in all directions at both scales after the latest correction. The compact hand/tool cluster remains dense at 28×42; connectivity does not by itself prove a believable grasp or immediate brush recognition.
- **Faces:** proposed geometric studies distinguish Sailor (strong brow shelf, hooked nose/cheek), Slicker (close-set level brow, narrow hood-framed face) and Painter (lifted asymmetric brow, squarer cheek/jaw, shorter nose). The matched rows compare Sailor with Clinic/Guard, Slicker with Hacker/Courier, Painter with Cook/Busker. These are provisional grayscale studies, not final face rendering or palette approval.
- **Set differentiation:** Sailor narrow/upright, Slicker compact/forward-pitched long shell, Painter open/asymmetrical reaching. Challenge similarities against nearest roster neighbours rather than relying on pixel metrics.

## Separate full-workflow failure — do not conflate with design-source pass

Run #730 overall concluded **FAILURE** at the separate game-browser diagnostics step. The design projection and semantic validation steps passed. The full browser gate remains blocked because:

- Golden snapshot gate: **1 match / 23 changed**; provenance remains explicitly unapproved.
- Existing audio/resource HTTP 404 console entries remain.
- `pageErrors` and `scriptErrors` are empty.
- The five-civilian review evidence reports 20/20 native and 20/20 direct game-scale captures, directional integrity 92/92, role debug 12/12, prop audit 10 archetypes and gallery rendered.
- The town-ground composite is a diagnostic overlay, not live NPC spawn/placement proof.
- No golden snapshots or provenance were changed.

Do not recommend refreshing/approving snapshots or weakening the gate. This is design-source evidence only, not production-renderer integration, live-town spawn validation or full green browser QA.

## Character-by-character review request

### Sailor #12 — working sailor

Assess narrow upright deck-coat construction, compact cap, raised collar, leg stance and arm negative spaces without relying on the coil. Compare with Clinic, Guard, Coach, Fisher and especially Welder's rear silhouette. Is the proposed Sailor clearly differentiated from Welder? Is the coil held credibly, with clear character-relative handedness and visible palm/forearm contact at direct 28×42? Judge the strong brow shelf and hooked profile nose/cheek geometry against Clinic and Guard.

### Slicker #13 — rain-ready commuter

Assess forward-pitched long rain-shell construction, hood-to-face relationship, asymmetric hem and shell overlap. Compare with Fisher, Courier, Hacker, Coach and Sailor. Does the body alone read as rainwear without a separate prop? Is the face-side hood opening directional and anatomically plausible in both profiles? Challenge the close-set level brow and narrow hood-framed face against Hacker and Courier.

### Painter #14 — sign painter / muralist

Assess open reaching pose, asymmetrical workwear, rolled sleeve, beanie/forelock contour and body-only distinction from Cook, Welder, Busker and Hacker. Inspect brush head, handle, ferrule, bristles and character-relative grip/contact in front, back and near-side left profile; confirm far-side right profile hides the brush. Does it read immediately as a brush at direct 28×42 without dominating the figure? Does the connected silhouette actually communicate a credible hand grip? Challenge lifted asymmetric brow and squarer cheek/jaw against Cook and Busker.

## Required Claude response

For each character, provide one verdict: **PASS**, **PASS WITH NON-BLOCKING NOTES**, or **CHANGES REQUIRED**.

1. Strongest and weakest body-only silhouette cues before props.
2. Four-direction orientation, near/far anatomy and handedness.
3. Any clipping, detached geometry, outline cuts, unsupported hand contact or ambiguous joins, with exact direction.
4. Prop recognition, contact chain and subordination at direct 28×42 and native scale.
5. Two genuinely distinctive face-geometry cues at small scale and closest roster comparator.
6. Sailor/Welder rear differentiation.
7. Set-level differentiation from one another and nearest existing roster figures.
8. Corrections ranked by severity. Do not invent IoU or pixel-count pass thresholds.
9. Explicitly separate findings that require design correction from subjective owner-choice questions.

## Approval boundary and next gate

ChatGPT has completed revision-18 design-source automated checks and inspected the actual artifact images. The overall browser workflow remains failed at the unrelated/unapproved global snapshot and existing resource gates. Claude review is now requested against this exact source and artifact. ChatGPT will evaluate every finding and implement valid, authorized design-stage corrections. The owner then makes the final silhouette/construction decision. No palette/final rendering or production renderer integration should begin unless separately authorized.

All three construction families remain **UNASSIGNED**. No silhouette, face, prop or palette is owner-approved. Roster #15–23 remains on hold.
