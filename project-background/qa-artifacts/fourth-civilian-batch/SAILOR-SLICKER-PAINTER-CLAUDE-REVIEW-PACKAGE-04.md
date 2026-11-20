# Sailor, Slicker and Painter — independent Claude design review package 04

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Exact reviewed source commit:** `8ae6a47055c6c75e361738b21c01d8b07b6830b4`  
**Current silhouette source:** [revision 10](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg)  
**Stage:** design-source silhouettes, face studies and prop-contact exploration only


The SVG's internal title was corrected from “exploration 09” to “exploration 10” in metadata-only commit `f7efb67c3fdfcd38899c9d29996b1ed3e1310322` after Run #678. No geometry changed; the evidence remains pinned to tested source commit `8ae6a47055c6c75e361738b21c01d8b07b6830b4`.

## Review scope and authority

The owner approved the role directions and simultaneous design-stage exploration for Sailor (#12), Slicker (#13) and Painter (#14). The owner has **not** approved any final silhouette, face, prop, palette or construction family. Production renderer implementation is **not authorized**.

Please review the exact revision-10 source and Run #678 evidence below. This package replaces packages 01, 02 and 03, which describe older source revisions. Do not review or cite package 01 as current evidence.

Granny Volt is the approved 10/10 craft-quality benchmark, not a visual template. Each civilian must retain an original silhouette, face geometry, clothing construction, prop and personality. The three characters must be judged individually and as a set against the closest existing roster figures.

## Exact evidence

- Browser/design QA: [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334)
- Artifact: [14650399818 — vapor-city-browser-qa](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818)
- Exact tested commit: `8ae6a47055c6c75e361738b21c01d8b07b6830b4`
- Source SVG: [SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg)
- Construction cards: [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md)
- Face geometry study: [SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg](SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg)
- Owner-approved role directions and constraints: [preflight](SAILOR-SLICKER-PAINTER-PREFLIGHT.md)
- Matched rear silhouette diagnostic: `fourth-batch-design/sailor-welder-back-silhouette-comparison.png`
- Design projection sheets: `fourth-batch-design/body-native-comparison.png`, `body-direct-comparison.png`, `prop-native-comparison.png`, `prop-direct-comparison.png`
- Enlarged individual directional PNGs: `fourth-batch-design/*-enlarged-4x.png`
- Face comparisons: `fourth-batch-design/matched-face-comparisons-native-40x38.png` and `matched-face-comparisons-3x.png`

The artifact contains 24 body-only / prop-on figure fields rendered at native 64×96, 24 independently vector-rasterized direct 28×42 projections, 24 4× nearest-neighbour enlargements, 69 current-roster face crops, six new face-design crops, six matched face-comparison rows, the profile prop audit, and the matched Sailor/Welder rear silhouette comparison. The direct 28×42 evidence is not resized from 64×96.

## Internal QA disposition

**Design-source projection and semantic validation: PASS.**

- 24/24 native 64×96 projections.
- 24/24 independent direct 28×42 projections.
- 24/24 enlarged nearest-neighbour inspection images.
- 69 roster face crops and six matched face-comparison rows.
- Profile prop-presence/contact audit: Sailor right profile 172 added pixels (172 in the prop region); Slicker left profile 295 added pixels (272 in the prop region); Painter left profile 237 added pixels (95 in the prop region). All three designated near-side profile checks passed their region checks.
- Browser report: directional integrity 92/92; existing five-civilian direct 28×42 capture assertion 20/20; role debug 12/12; prop audit 10 archetypes; gallery rendered; silhouette diagnostic inventory completed.

**Manual visual inspection: PASS WITH REVIEW QUESTIONS.**

- **Sailor:** narrow upright deck-coat body reads without the coil. The mooring coil is visible front (viewer-right), back (viewer-left) and right profile only; hidden in the left profile. Enlarged and direct 28×42 right-profile evidence shows the loop connected through a palm/forearm bridge. The new proposed rear silhouette is visibly narrower and more vertically structured than the live Welder rear silhouette: Sailor has a compact cap, cropped deck-coat mass, narrow leg stance and clear arm negative space; Welder retains a broader blockier torso and different shoulder/tool mass. The legacy Sailor/Welder full-character back IoU trigger (0.889) is a diagnostic on existing roster renderers, not a similarity score for the proposed vector Sailor. Please independently judge the proposed pair.
- **Slicker:** compact forward-pitched long rain-shell body reads without the umbrella. The folded umbrella is visible front (viewer-left), back (viewer-right) and left profile only; hidden in the right profile. Revision 10 adds a clearer shaft/canopy silhouette in the front and back views while retaining the near-side profile grip. At direct 28×42, the item now reads as a folded umbrella rather than a pouch or generic side mass; please still judge its grip and scale.
- **Painter:** open asymmetrical reaching body reads without the brush. The brush is visible front (viewer-left), back (viewer-right) and left profile only; hidden in the right profile. Revision 10 retains the broad head and clear handle/grip contact. The enlarged and direct 28×42 views read as a short broad brush; please judge whether the brush is immediately identifiable without dominating Painter.
- **Set:** the three body-only constructions remain visibly different: Sailor narrow/upright, Slicker compact/long-shell/forward-pitched, Painter open/asymmetrical/reaching. Please challenge any shared silhouette or generic construction.
- **Faces:** the native face-comparison labels are readable. Proposed cues are Sailor's strong brow shelf and hooked profile nose/cheek plane; Slicker's angular brow/eye and tucked chin/short nose; Painter's asymmetric lifted brow and longer angular nose/cheek plane. The six matched 40×38 face rows compare Sailor with Clinic/Guard, Slicker with Hacker/Courier, and Painter with Cook/Busker. Face geometry remains provisional; assess actual identity separation rather than headwear, palette or expression alone.

## Browser workflow disposition and evidence boundaries

Run #678 overall concluded **FAILURE** at the global browser diagnostics gate:

- Golden snapshot gate: **1 match / 23 changed**, no missing snapshots. Baseline approval metadata remains unapproved.
- Existing audio/resource diagnostics: 135 console 404 entries. `pageErrors` and `scriptErrors` are empty.
- No golden snapshots or provenance were modified.
- The design-source evidence generation, semantic proportion/annotation validation, Granny semantic overlay, six-civilian annotation overlay, five-civilian review sheet and artifact upload completed successfully.

These global baseline/audio failures are not evidence of a new Sailor/Slicker/Painter renderer regression: these characters are not installed in the production renderer. The fourth-batch evidence is a design-source projection only, not production-renderer QA, live-town spawn proof or gallery integration.

## Character-by-character review request

### Sailor #12 — working sailor

Review the narrow upright deck-coat construction, compact cap, raised collar, leg stance and arm negative spaces. Compare the body-only silhouette against Clinic, Guard, Coach, Fisher and especially Welder's rear silhouette. Decide whether the proposed vector Sailor is clearly differentiated from Welder and whether the rope coil is a credible, subordinate held prop. Judge the strong brow shelf and hooked profile nose/cheek geometry against Clinic and Guard. Do not allow the coil to carry the identity.

### Slicker #13 — rain-ready commuter

Review the forward-pitched long rain-shell construction, hood/brim-to-face relationship, asymmetric curved hem and visible shell overlap. Compare against Fisher, Courier, Hacker, Coach and Sailor. Decide whether the body carries the rainwear identity without a prop. Inspect the folded umbrella at direct 28×42 and enlarged profile scale: does it read as a held folded umbrella, with believable grip and near/far visibility, or should it be replaced by an integrated closure/hood cue? Challenge the angular brow/eye and tucked chin against Hacker and Courier.

### Painter #14 — sign painter / muralist

Review the open reaching pose, asymmetric work smock, rolled sleeve, beanie/forelock contour and body-only distinction from Cook, Welder, Busker and Hacker. Inspect the broad brush head, handle and character-right grip/contact chain in front, back and left profile; ensure the far-side right profile hides the brush. Decide whether the brush reads clearly at direct 28×42 without dominating the character. Challenge the lifted asymmetric brow and angular nose/cheek plane against Cook and Busker.

## Required Claude response

For each character, provide one verdict: **PASS**, **PASS WITH NON-BLOCKING NOTES**, or **CHANGES REQUIRED**.

Please also provide:

1. Strongest and weakest body-only silhouette cues, before considering props.
2. Whether all four directions have coherent orientation, near/far anatomy and correct handedness.
3. Any clipping, detached geometry, unsupported hand contact or prop visibility defect, with exact character and direction.
4. Whether each prop reads as the intended object at direct 28×42 and remains subordinate to the body.
5. Whether each face has two genuinely distinctive geometric cues at small scale, and the closest roster comparator.
6. Whether proposed Sailor is clearly differentiated from Welder in the rear view.
7. Set-level differentiation: whether all three are distinct from each other and the closest existing roster figures.
8. Corrections ranked by severity. Avoid numeric IoU targets and do not recommend palette or renderer work before the silhouette/construction gate.

Please review the exact revision-10 commit and Run #678 artifact above. Do not modify repository files. Do not infer owner approval from this handoff.

## Approval boundary and next gate

Claude's review is independent and advisory. ChatGPT will assess valid findings and implement any authorized design-stage corrections. The owner then makes the final decision on each character's silhouette/construction. No production renderer work begins until the owner explicitly approves the relevant silhouette/construction and separately authorizes the next stage.

All three construction families remain **UNASSIGNED**. No silhouette, face, prop or palette is owner-approved. Roster positions #15–23 remain on hold. No golden snapshot or provenance changes are permitted without explicit owner authorization.
