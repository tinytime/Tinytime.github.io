# Fourth civilian batch — Claude independent review package

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Reviewed source commit:** `65252b64031626901b03905c4f253d1043f1a31e`  
**Characters:** Sailor #12 · Slicker #13 · Painter #14  
**Stage:** design-stage silhouette/construction review only  
**Owner authorization:** simultaneous identity refinement and silhouette exploration. No final silhouette, face, prop, palette or construction family is approved. Production renderer implementation is NOT authorized.

## Review evidence

- [Silhouette exploration 05 — body-only and prop-on, four directions](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-05.svg)
- [Construction cards and differentiation report 01](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md)
- [Matched-scale face geometry study 02](SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg)
- [Owner-approved role direction and constraints](SAILOR-SLICKER-PAINTER-PREFLIGHT.md)
- [Civilian Vector Construction Standard](../../CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md)
- [Roster shell-family audit](../next-civilian-batch/ROSTER-SHELL-FAMILY-AUDIT.md)

**Latest internal QA:** [Browser QA Run #664](https://github.com/tinytime/Tinytime.github.io/actions/runs/44773501153)  
**Artifact:** [Run #664 artifact 14648551327](https://github.com/tinytime/Tinytime.github.io/actions/runs/44773501153/artifacts/14648551327)  
**Artifact tested commit:** `65252b64031626901b03905c4f253d1043f1a31e`

The artifact contains 24 native 64×96 source projections, 24 separately rasterized direct 28×42 projections, 24 4× nearest-neighbour enlargements, body-only and prop-on comparison sheets, 69 current-roster face crops, six new 40×38 face-design crops, and six matched face-comparison rows at native and 3× scales. The evidence report records the source and capture counts.

## Internal QA disposition

**Design-source capture:** PASS. All 24 figure fields rendered at native 64×96, direct 28×42 and enlarged scales. The 28×42 images are independently rasterized from the SVG; they are not resized native images.

**Manual visual inspection:** PASS WITH REVIEW NOTES.

- Body-only silhouettes remain role-distinct as a set: Sailor is the narrow upright deckhand; Slicker is the compact, long-shell/hooded commuter; Painter is the open asymmetrical reaching figure.
- Front/back and left/right profile orientation is consistent. Near/far prop visibility follows the character-relative handedness recorded in the construction cards.
- Sailor's character-left mooring coil appears front (viewer-right), back (viewer-left) and right profile only; it is hidden in the left profile.
- Slicker's character-right folded umbrella appears front (viewer-left), back (viewer-right) and left profile only; it is hidden in the right profile. The front-view side error found in the previous pass was corrected in the source and verified in Run #664. At direct 28×42, the front umbrella is subtle; please judge whether it reads sufficiently or should be replaced by a small integrated rainwear closure cue.
- Painter's character-right brush appears front (viewer-left), back (viewer-right) and left profile only; it is hidden in the right profile. The rear reaching arm reverses correctly.
- The native matched-face sheet label collision was corrected; native labels are now compact and the 3× sheet remains readable.
- The SVG title now correctly identifies revision 05.

**Face differentiation remains the principal design question.** The proposed two cues are documented per character, but the three new front faces share some broad proportions and expression structure at 40×38. Please challenge whether the proposed brow/eye and nose/cheek geometry actually creates three distinct identities at small scale, rather than relying on headwear. Do not assume the current face geometry is approved.

## Browser QA workflow disposition

Run #664 completed with overall conclusion **FAILURE**, but the failure is in existing global diagnostics, not the design-source projection step:

- Design-source projection generation: completed successfully.
- Semantic proportion/annotation validation: completed successfully.
- Directional integrity: PASS 92/92.
- Direct 28×42 renderer assertion for the existing five-civilian QA group: PASS 20/20.
- Role debug: PASS 12/12.
- Prop audit: PASS (10 archetypes).
- Gallery render: PASS.
- Silhouette diagnostic inventory: PASS; IoU values are review prompts, not approval gates.
- Browser diagnostics: failed on the unapproved golden-snapshot baseline (1 match / 23 changed) and existing audio/resource HTTP 404s. The log reports empty `pageErrors` and `scriptErrors`; 45 sound-file 404 entries plus 135 resource 404 console messages were observed.
- No golden snapshots or provenance were changed.

**Evidence boundary:** Sailor/Slicker/Painter images are design-source projections only. They are not production-renderer captures, live-town spawn tests, or gallery integrations. No new NPC renderer was installed.

## Character-by-character review request

### Sailor #12
Review the narrow upright deck-coat construction, raised collar/cap relationship, leg stance and arm negative spaces. Compare especially with Clinic, Guard, Coach and Fisher, and use Granny Volt as a craft-quality benchmark only. Judge whether the body reads as a working sailor without the mooring coil. Assess the strong straight brow shelf and long hooked profile nose against Clinic/Guard without relying on cap shape.

### Slicker #13
Review the long rain-shell construction, curved/asymmetric hem, hood-to-face opening, forward pitch and compact folded umbrella. Compare especially with Fisher, Courier, Hacker, Coach and Sailor. Determine whether the shell itself carries the role identity without the umbrella. Specifically inspect the corrected front umbrella at direct 28×42 and decide whether it is legible enough or whether an integrated closure cue is stronger. Challenge the angular brow/eye and tucked chin/nose-cheek cues against Hacker and Courier.

### Painter #14
Review the open reaching pose, asymmetrical smock, rolled sleeve, beanie/forelock contour and brush interaction. Compare especially with Cook, Welder, Busker, Hacker, Sailor and Slicker. Judge whether the reaching body remains identifiable without the brush. Inspect the character-right grip/contact chain in all visible directions and the rear-view arm reversal. Challenge the lifted asymmetric brow and long angular nose bridge against Cook/Busker.

## Required Claude response

Please provide:

1. An independent verdict for each character: **PASS**, **PASS WITH NON-BLOCKING NOTES**, or **CHANGES REQUIRED**.
2. The strongest and weakest silhouette cues for each character, considering body-only before props.
3. Any profile orientation, near/far anatomy, clipping, prop-contact or handedness defects, with exact direction and location.
4. Whether each face has two genuinely distinctive geometric cues at direct game scale, and which existing roster face is the closest comparator.
5. Whether Slicker's front umbrella is sufficiently readable at 28×42.
6. The most important corrections, if any, ranked by severity. Avoid numeric IoU targets and do not request palette/renderer work before the silhouette gate.
7. A set-level assessment: whether the three characters are distinct from each other and the closest existing roster figures.

Please review the exact commit and Run #664 artifact above. Do not modify repository files. Do not infer owner approval from this handoff.

## Approval boundary and next gate

Claude's review is advisory and independent. ChatGPT will evaluate valid findings and implement authorized design-stage corrections. The project owner then reviews and explicitly approves or revises each character independently.

All three vector construction families remain **UNASSIGNED**. No palette polish, production renderer implementation, live town/gallery integration, golden snapshot update, or work on roster positions #15–23 is authorized by this package.
