# Sailor, Slicker and Painter — independent Claude design review package 06

**Prepared:** 2026-11-20  
**Repository:** tinytime/Tinytime.github.io  
**Branch:** npc-granny-baseline-overhaul  
**Exact reviewed design source commit:** be1c0c012894ccae23b4cbce2ad06e523fb460c5  
**Current source:** [revision 21 SVG](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg)  
**Exact evidence:** [Run #808](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663) · [artifact 14663163320](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663/artifacts/14663163320)  
**Stage:** design-source silhouettes, body/prop construction and geometric face studies only

Package 06 supersedes packages 01–05 for the current Sailor/Slicker/Painter design review. The tested branch head was 5beb3709dd5080313e6ddea5248ef8698f74dd51; the revision-21 SVG itself is the exact design source commit above. Run #808's evidence report explicitly identifies the revision-21 SVG path. The review package is prepared but has **not** been sent to Claude.

## Authority and review boundary

The owner authorized simultaneous design-stage exploration for Sailor (#12), Slicker (#13) and Painter (#14). The owner has **not** approved any final silhouette, construction family, face, prop or palette. Production renderer implementation is **not authorized**. Granny Volt is the 10/10 craft benchmark, not a template. Each character must retain an original silhouette, face, clothing construction, prop and personality.

Please review only the exact revision-21 source and evidence cited here. Do not modify repository files. Claude's review is independent and advisory; the owner makes all final decisions.

## Exact evidence and source files

- Revision 21 SVG: [SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg)
- Exact-source Actions run: [Run #808](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663)
- Artifact: [14663163320 — vapor-city-browser-qa](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663/artifacts/14663163320)
- Tested design-source commit: be1c0c012894ccae23b4cbce2ad06e523fb460c5
- Construction cards: [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md)
- Owner-approved role hypotheses/constraints: [preflight](SAILOR-SLICKER-PAINTER-PREFLIGHT.md)
- Internal QA log: [FOURTH-BATCH-INTERNAL-QA-LOG.md](FOURTH-BATCH-INTERNAL-QA-LOG.md)
- Body-only sheets: fourth-batch-design/body-native-comparison.png, body-direct-comparison.png
- Prop-on sheets: fourth-batch-design/prop-native-comparison.png, prop-direct-comparison.png, prop-front-group-comparison.png
- Face comparisons: fourth-batch-design/matched-face-comparisons-native-40x38.png, matched-face-comparisons-3x.png, new-face-designs-matched-40x38.png
- Sailor/Welder rear diagnostic: fourth-batch-design/sailor-welder-back-silhouette-comparison.png
- All-civilian anatomy connectivity: fourth-batch-design/anatomy-connectivity-audit.json
- Body preservation: fourth-batch-design/body-preservation-audit.json
- Profile prop audit: fourth-batch-design/profile-prop-audit.json
- Individual native, direct 28×42 and enlarged crops: fourth-batch-design/{sailor,slicker,painter}-*.png

The artifact includes 24 body-only/prop-on figure fields, 24 native 64×96 captures, 24 independently vector-rasterized direct 28×42 captures, 24 enlarged nearest-neighbour captures, 69 roster face crops, six new face-design crops and six matched face-comparison rows. Direct 28×42 images are not resized native images.

## Internal QA results

**Revision-21 design projection and semantic proportion/annotation validation: PASS.**

- 24/24 native 64×96, 24/24 independent direct 28×42 and 24/24 enlarged projections.
- All 12 body-only/prop-on pairs preserve every body pixel (removedBodyPixels=0).
- All three civilians' body-only and prop-on figures form one connected component in all four directions at both native and direct scales (48/48 projections).
- Profile prop audit: Sailor/right 53 added silhouette pixels; Painter/left 159 added silhouette pixels, 26 in the expected prop region. Both preserve body pixels. These are descriptive values, not invented acceptance thresholds.
- All eight Slicker body/prop direction panels compare byte-for-byte with revision 18.
- Semantic source projection and annotation validation passed.

**Actual artifact visual inspection: completed with review questions.**

Inspected the native/direct body and prop comparison sheets, enlarged Sailor front and right-profile coil details, enlarged Painter front and left-profile brush details, matched face rows, and Sailor/Welder rear comparison.

- **Sailor:** compact multi-turn rope coil is visible front (viewer-right), back (viewer-left) and right profile only; hidden in left profile. The coil reads more clearly as wound rope than the earlier single ring. Please scrutinize whether the hand/palm contact is believable and sufficiently clear at direct 28×42, and whether the coil remains subordinate to the figure.
- **Slicker:** revision-18 integrated rainwear construction is preserved byte-for-byte; face-side-open hood, long rain shell, shortened closure and rear yoke/hem remain. There is no separate umbrella. Judge whether clothing construction alone gives a sufficiently distinctive silhouette.
- **Painter:** open reaching pose and asymmetrical smock remain. The compact flat wedge brush has a clearer head/handle/ferrule relationship and is visible front (viewer-left), back (viewer-right) and left profile only; hidden in right profile. Please scrutinize immediate brush recognition and credible wrapped-handle grip at direct 28×42; connectivity does not prove a believable grasp.
- **Faces:** proposed grayscale geometric studies compare Sailor with Clinic/Guard, Slicker with Hacker/Courier, and Painter with Cook/Busker. They are provisional studies, not final face rendering or palette approval.
- **Set differentiation:** Sailor narrow/upright, Slicker compact/forward-pitched long rain shell, Painter open/asymmetrical reaching. Challenge similarities against nearest roster neighbours rather than relying on pixel metrics. Sailor/Welder rear comparison is included; the proposed Sailor is narrower and more vertically structured than the broader/blockier live Welder.

## Separate full-workflow failure — do not conflate with design-source pass

Run #808 overall concluded **FAILURE** at the separate game-browser diagnostics step. Design projection and semantic proportion/annotation validation passed. The full browser gate remains blocked by:

- Golden snapshot gate: **1 match / 23 changed**; baseline approval metadata remains unapproved.
- Existing audio/resource console HTTP 404s: 180 console/resource errors in the current run (135 HTTP 404 responses and 45 corresponding sound-load messages).
- pageErrors and scriptErrors are empty.
- Existing game diagnostics: directional integrity 92/92, direct 28×42 captures 20/20, role debug 12/12, prop audit 10 archetypes, gallery rendered.
- The town-ground composite is a diagnostic overlay, not live NPC spawn/placement proof.
- No golden snapshots or provenance were changed.

Do not recommend refreshing/approving snapshots or weakening the gate. This is design-source evidence only, not production-renderer integration, live-town spawn validation or full green browser QA.

## Character-by-character review request

### Sailor #12 — working sailor

Assess narrow upright deck-coat construction, compact cap, raised collar, leg stance and arm negative spaces without relying on the coil. Compare with Clinic, Guard, Coach, Fisher and especially Welder's rear silhouette. Is the proposed Sailor clearly differentiated from Welder? Is the character-left coil held credibly, with clear character-relative handedness and visible palm/forearm contact at direct 28×42? Judge the multi-turn winding detail: does it read as rope rather than a tire, shield or generic ring? Assess the strong brow shelf and hooked profile nose/cheek against Clinic and Guard.

### Slicker #13 — rain-ready commuter

Revision 21 intentionally preserves the exact revision-18 Slicker geometry. Assess forward-pitched long rain-shell construction, hood-to-face relationship, asymmetric hem and shell overlap. Compare with Fisher, Courier, Hacker, Coach and Sailor. Does the body alone read as rainwear without a separate prop? Is the face-side hood opening directional and anatomically plausible in both profiles? Challenge the close-set level brow and narrow hood-framed face against Hacker and Courier. Do not request a redesign merely for novelty; identify a concrete differentiation problem if one exists.

### Painter #14 — sign painter / muralist

Assess open reaching pose, asymmetrical workwear, rolled sleeve, beanie/forelock contour and body-only distinction from Cook, Welder, Busker and Hacker. Inspect brush head, handle, ferrule, bristles and character-relative grip/contact in front, back and near-side left profile; confirm far-side right profile hides the brush. Does it read immediately as a flat brush at direct 28×42 without dominating the figure? Does the connected silhouette communicate a credible hand grip? Challenge lifted asymmetric brow and squarer cheek/jaw against Cook and Busker.

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

ChatGPT has completed revision-21 design-source automated checks and inspected the actual artifact images. The overall browser workflow remains failed at the existing audio-resource and unapproved global snapshot gates. Claude review is requested against this exact source and artifact, but has **not yet been sent or completed**. ChatGPT will evaluate every finding and implement valid, authorized design-stage corrections. The owner then makes the final silhouette/construction decision. No palette/final rendering or production renderer integration should begin unless separately authorized.

All three construction families remain **UNASSIGNED**. No silhouette, face, prop or palette is owner-approved. Roster #15–23 remains on hold.
