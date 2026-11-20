# Fourth civilian batch — internal QA log

**Date:** 2026-11-20  
**Characters:** Sailor #12, Slicker #13, Painter #14  
**Current source:** [silhouette exploration 10](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg)  
**Current review package:** [Claude review package 04](SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md)  
**Exact source tested by latest run:** `8ae6a47055c6c75e361738b21c01d8b07b6830b4`

## Run history and corrections

- **Run #665** — source commit `184fe72b211c11e968b7b192228bb7cf04792e5b`, artifact `14647819936`. Native face-comparison labels were corrected, but visual inspection found Sailor's coil separated from the hand, Slicker's umbrella too subtle at direct 28×42, and Painter's profile grip unclear. Not ready for Claude.
- **Run #670** — source commit `65fb26fd2635bb178c2298826da2c729db01db03`, artifact `14650042107`. Expanded near/far audit correctly failed: Slicker's far-side umbrella remained visible and Painter's designated grip region did not meet its check. Follow-up source edits removed Slicker's far-side umbrella and strengthened Painter's grip.
- **Run #671** — revision 07 workflow was cancelled by a newer push before completing; not treated as validation.
- **Run #672** — revision 07 source `f6d9e2dc84c3309489085f530f686fed195cd42c`, artifact `14649699220`. Design projection and semantic validation passed. Visual inspection supported clearer umbrella and brush profile forms; the profile prop audit passed. Run still failed overall on global browser diagnostics.
- **Run #673** — cancelled by a newer push; not treated as validation.
- **Run #674** — revision 08 source `c004c4e9b231803bc3977b9d418f104e223dc417`, artifact `14650547538`. Latest authoritative validation and visual evidence for this package.

## Run #674 automated evidence

- 24/24 native 64×96 vector-source projections.
- 24/24 independently rasterized direct 28×42 projections.
- 24/24 4× nearest-neighbour enlargements.
- 69 current-roster face crops; six new face-design crops; six matched face-comparison rows.
- Profile prop-region audit: Sailor right 172 added pixels (minimum 100); Slicker left 389 (minimum 100); Painter left 163 total / 22 in brush region (minimum 12). All designated near-side checks passed.
- Browser QA: directional integrity 92/92; direct 28×42 assertion 20/20; role debug 12/12; prop audit 10 archetypes; gallery rendered; silhouette diagnostic inventory passed as an inventory.
- The full-character silhouette diagnostic lists 23 review pairs at/above the 0.85 human-review trigger; maximum IoU 0.9065. This is a review prompt, not an automatic art failure. Legacy Sailor/Welder back IoU is 0.889.

## Manual visual inspection — Run #674 artifact

**Body-only silhouettes**
- Sailor: narrow upright deckhand with a short squared deck-coat mass, compact cap and raised collar. At direct 28×42, the narrow vertical construction and planted stagger remain distinct.
- Slicker: compact forward-pitched long-shell commuter. The hood/brim and longer asymmetric shell mass distinguish it from Sailor's cropped jacket and Fisher's broad smock.
- Painter: open asymmetrical reaching pose with uneven arm line and separated legs; the body remains more open than Slicker's compact shell and Sailor's vertical deckhand construction.

**Prop-on silhouettes and profiles**
- Sailor's character-left coil is visible front (viewer-right), back (viewer-left) and right profile only; hidden in the left profile. Enlarged right-profile view shows a loop with a palm/forearm bridge; the coil remains subordinate to the torso.
- Slicker's character-right folded umbrella is visible front (viewer-left), back (viewer-right) and left profile only; hidden in the right profile. Revision 08 improves the folded canopy/handle silhouette. At direct scale the object is still close to the body, but reads more clearly as a held folded umbrella than the previous revision.
- Painter's character-right brush is visible front (viewer-left), back (viewer-right) and left profile only; hidden in the right profile. Revision 08 gives the profile brush head a broader flat shape and retains the handle/grip connection. Enlarged profile shows a clear short brush form.
- No duplicate prop, far-side prop or detached profile prop was found in the inspected source projections.

**Sailor / Welder rear comparison**
- The artifact includes a matched native 64×96 proposed Sailor body-only rear silhouette beside the live roster Welder rear snapshot, both presented as black silhouettes at the same display scale.
- Proposed Sailor is narrower and more vertically structured, with compact cap/deck-coat geometry, visible arm negative space and a narrower leg stance. Welder retains a broader blockier torso/shoulder mass and distinct rear equipment shape.
- The legacy rendered Sailor/Welder back IoU trigger (0.889) comes from the existing roster renderers; it is not a score of the proposed vector Sailor. Human comparison supports differentiation, but Claude should independently challenge the pair.

**Faces**
- Native and 3× matched face comparison sheets are readable.
- Comparators: Sailor vs Clinic/Guard; Slicker vs Hacker/Courier; Painter vs Cook/Busker.
- Proposed geometric cues are recorded in package 02. The face study is not approved; independent review should decide whether the brow/eye and nose/cheek cues produce genuinely distinct identities beyond headwear and expression.

## Overall browser QA disposition

Run #674 concluded **FAILURE** at global browser diagnostics:
- Golden snapshot baseline is still unapproved: 1 match / 23 changed, no missing.
- 180 console 404 entries for existing audio/resource URLs.
- `pageErrors` and `scriptErrors` are empty.
- Design-source capture, semantic validation, Granny semantic overlay, six-civilian annotation overlay, five-civilian review sheet and artifact upload completed.
- No golden snapshots or provenance changed.

These global failures do not mean the new design-source projections failed. Sailor/Slicker/Painter have no production renderers installed; this run is not production-renderer, town-spawn or gallery integration QA.

## Disposition

**Internal design-source QA: PASS WITH REVIEW QUESTIONS.** Ready for Claude's independent comparative review. Not owner-approved.

All three construction families remain UNASSIGNED. No final silhouette, face, prop or palette is approved. Production renderer implementation is NOT AUTHORIZED. Roster positions #15–23 remain on hold until Claude's review is assessed and the owner explicitly approves the next gate.


## Run #678 — revision 10 current authoritative evidence (2026-11-20)

- Exact source commit: `8ae6a47055c6c75e361738b21c01d8b07b6830b4`; source [revision 10](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg).
- [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818).
- Design-source projection and semantic validation passed: 24/24 native 64×96, 24/24 direct 28×42, 24/24 4× nearest-neighbour images; 69 roster face crops, six new face crops and six matched face rows.
- Profile prop audit passed: Sailor/right 172 total / 172 in expected region; Slicker/left 295 total / 272 in expected region; Painter/left 237 total / 95 in expected region.
- Browser checks: directional integrity 92/92; direct 28×42 assertion 20/20; role debug 12/12; prop audit 10 archetypes; gallery rendered. Golden snapshot gate remains 1 match / 23 changed. Existing audio/resource 404 console errors: 135. pageErrors=0; scriptErrors=0. No golden snapshots or provenance changed.
- Visual inspection of all 24 native/direct/enlarged fields: Sailor's coil is held front/back/right profile only; Slicker's umbrella front/back/left profile only; Painter's brush front/back/left profile only. All far-side props are occluded. Body-only silhouettes are distinct at 28×42. The corrected native-aspect-ratio Sailor/Welder rear comparison supports clear proposed-silhouette differentiation.
- Face comparison labels and comparator names are legible. Faces remain provisional and are explicitly submitted for independent geometric-identity critique.
- Town/gallery screenshots were inspected as existing-scene smoke evidence only; these three characters are not installed in production renderers or live spawn/gallery systems.

**Current disposition: INTERNAL DESIGN-SOURCE QA PASS WITH REVIEW QUESTIONS.** Claude package 04 is prepared. No owner approval or renderer authorization. All construction families remain UNASSIGNED; #15–23 remain held.
