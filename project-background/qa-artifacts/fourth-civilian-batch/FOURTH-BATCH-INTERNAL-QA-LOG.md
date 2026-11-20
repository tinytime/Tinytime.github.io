## Fourth civilian batch — revision 21 exact-source internal design QA (2026-11-20)

The owner-authorized parallel design-stage work for Sailor (#12), Slicker (#13) and Painter (#14) has reached **internal design-source QA PASS**. Independent Claude review and owner approval remain pending.

- **Exact tested commit:** `5beb3709dd5080313e6ddea5248ef8698f74dd51` (revision 21 SVG source blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`).
- **Source:** [revision 21 SVG](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg).
- **Exact evidence:** [Run #808](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663) · [artifact 14663163320](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663/artifacts/14663163320).
- **Design projections:** 24/24 native 64×96, 24/24 independently rendered direct 28×42, and 24/24 enlarged 4× views across body-only/prop-on states and all four directions.
- **Structural checks:** body preservation 12/12 with zero removed body pixels; anatomy/prop connectivity 48/48; near-side profile prop audit 2/2. Sailor/right: 53 added pixels, all 53 in the configured prop region. Painter/left: 159 added silhouette pixels, 26 in the configured prop region, zero removed body pixels; this diagnostic count is a reviewer prompt, not an approval threshold.
- **Visual inspection:** native/direct body and prop comparison sheets, enlarged Sailor/Painter details, matched face comparisons, and Sailor/Welder rear comparison inspected. All eight Slicker body/prop direction panels remain byte-identical to revision 18.
- **Sailor #12:** connected rope coil/spiral refined for front, rear and near-side right profile; character-left carry remains front viewer-right, rear viewer-left, visible right profile only.
- **Painter #14:** connected scalloped flat-brush head, ferrule/handle and grip retained; paired side darts shape the smock without cutting the torso/leg silhouette. Character-right carry remains front viewer-left, rear viewer-right, visible left profile only.
- **Slicker #13:** preserved unchanged from revision 18; no redesign.
- **Overall workflow boundary:** design projection, semantic proportion/annotation validation, gallery and review-sheet generation passed. The overall Actions run remains **FAILED** at global browser diagnostics: pageErrors=0, scriptErrors=0, 135 audio/resource HTTP 404 responses plus 45 corresponding sound-load console messages; the golden-snapshot gate reports 1 match / 23 changed. No golden snapshots or provenance were modified or approved.
- **Authority:** [Claude package 06](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-06.md) is prepared but not sent; no Claude verdict is recorded. All three construction families remain UNASSIGNED. No palette or production-renderer work is authorized; roster #15–23 remains held.

## Revision 18 — Run #730 exact-source design QA and visual inspection (2026-11-20)

- **Exact tested source:** 73774e27092de36fd88f45b0d5cb6c97f760c7ea; [Run #730](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551); artifact [14658967396](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551/artifacts/14658967396). Branch: npc-granny-baseline-overhaul.
- **Source correction history:** Painter's front ferrule was shifted/narrowed after the first Run #715 body-preservation failure. The left-profile handle was extended into the bristle fan after Run #719 exposed a detached direct-scale component. Three white bristle strokes were removed in commit afc8690703462ca4d1567bc80b9ededf9e8bb197, but this made the head read too much like a pail. Current commit 73774e27092de36fd88f45b0d5cb6c97f760c7ea restores two short internal bristle grooves; the 28×42 silhouette remains connected. No connectivity gate was weakened.
- **Automated design-source checks:** projection and semantic proportion/annotation steps PASS. 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged nearest-neighbour crops; 69 roster face crops, six new face crops and six matched 40×38 comparison rows. Proportion test reports 54 checks passed; Granny mask-fit helper tests pass 11 fixtures.
- **Structural checks:** body preservation passes 12/12 with zero removed body pixels. Connected anatomy passes 48/48 (three civilians × body/prop × four directions × native/direct). Painter's front, back and left brush contacts were visually inspected; profile bristle grooves remain legible in the enlarged crop while direct 28×42 stays one component. Profile prop audit: Sailor/right +172; Painter/left +153 total / +151 expected-region pixels. No arbitrary minimum threshold is applied.
- **Manual artifact inspection:** inspected actual Run #730 native and direct body/prop comparison sheets, Sailor/Welder rear comparison, matched 40×38 face rows, new face-design sheet, and enlarged Sailor coil, Slicker hood/rain-shell and Painter front/back/left brush crops. Four-direction silhouette sets are present and the body/prop near-side visibility is consistent with the construction sheets. Sailor's loop is visible but the exact hand-to-rope grasp remains subtle. Slicker's integrated hood and rain shell read as clothing. Painter's hand/handle/ferrule/bristle assembly is connected; the compact game-scale hand/tool cluster remains dense. These are explicit Claude/owner scrutiny points, not automatic approvals.
- **Roster differentiation:** matched face comparators are Sailor vs Clinic/Guard, Slicker vs Hacker/Courier, Painter vs Cook/Busker. Sailor/Welder rear comparison shows a distinct narrow, upright proposed Sailor silhouette. Existing pixel/game renders are not normalized to the new vector study; comparative judgments remain qualitative.
- **Five-civilian regression sheet:** 20/20 native and 20/20 direct 28×42 captures; directional integrity 92/92; role debug 12/12; prop audit 10 archetypes; gallery rendered. Town-ground composite is diagnostic only, not live spawn proof.
- **Separate full-workflow failure:** Run #730 overall FAILS at global game-browser diagnostics. Golden baseline provenance remains explicitly unapproved (1 match / 23 changed); 180 resource/audio console 404s remain. pageErrors and scriptErrors are empty. No golden snapshots or provenance were changed.
- **Disposition:** revision-18 design-source automation and internal visual inspection are complete **with review questions**. The overall browser workflow is not green. Review package 05 is pinned to this exact source/artifact; Claude has not yet reviewed it. No renderer integration, approved character art, snapshot changes or provenance changes. All three construction families remain UNASSIGNED; owner approval remains pending.

---


## Revision 18 — Run #721 predecessor evidence (superseded by Run #730)

**Current source:** [revision 18 SVG](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg)  
**Exact tested commit:** `4045675e71854b08b2e2fb1ab5c879d7b2ea2ab6`  
**Actions:** [Run #721](https://github.com/tinytime/Tinytime.github.io/actions/runs/44794789910) · [artifact 14656889410](https://github.com/tinytime/Tinytime.github.io/actions/runs/44794789910/artifacts/14656889410)

### Focused correction history

- `a6a70e530328598a2f1663eb63587f88be780612`: narrowed/shifted Painter's front brush ferrule to eliminate the two-pixel body overlap flagged by Run #715.
- `cf65450591d673008a7a9262fe4cea4fd2bf2bd7`: body-preservation passed, but the direct 28×42 Painter left-profile prop projection exposed a second disconnected component (16 pixels) at the brush/hand assembly.
- `4045675e71854b08b2e2fb1ab5c879d7b2ea2ab6`: connected the Painter profile brush handle to the bristle fan at direct scale. Run #721 is the exact-source retest.

### Automated design-source evidence

Run #721 design projection and semantic proportion/annotation steps both PASS.

- 24/24 native 64×96 projections, 24/24 independently rasterized direct 28×42 projections, and 24/24 enlarged nearest-neighbour projections.
- 69 roster face crops and six matched 40×38 face-comparison rows.
- All 12 body-only/prop-on pairs preserve every body pixel (`removedBodyPixels=0`).
- Painter body-only and prop-on connectivity: one connected component in all four directions at both native and direct scales.
- Profile prop audit: Sailor/right +172 added pixels; Painter/left +161 total / +159 expected-region pixels. Counts are descriptive; no arbitrary acceptance threshold is applied.

### Manual artifact inspection

Inspected actual `body-native-comparison.png`, `body-direct-comparison.png`, `prop-native-comparison.png`, `prop-direct-comparison.png`, `prop-front-group-comparison.png`, `sailor-welder-back-silhouette-comparison.png`, `matched-face-comparisons-native-40x38.png`, and enlarged Painter/Sailor details.

- **Sailor:** all four body and prop directions are present at native/direct scale; rear silhouette is visibly distinct from the legacy Welder comparison. Front coil reads as a loop, but the hand-to-rope grasp remains subtle and should be explicitly challenged by Claude and the owner.
- **Slicker:** front/back/profile hood and rain-shell silhouette read as weatherwear; rear yoke/hem and shortened storm closure remain visible. No separate umbrella is used.
- **Painter:** head/neck joins and body-only anatomy are connected; brush/hand/handle/ferrule/bristle construction now forms one component at both scales in all directions. The compact hand/tool cluster remains dense at 28×42 and is retained as a reviewer/owner scrutiny point, not claimed fully resolved.
- Face comparison rows are grayscale/geometric studies against existing rendered roster faces; they are not final character face art or approval.
- Five-civilian review evidence: 20/20 native captures and 20/20 direct 28×42 captures; directional integrity 92/92; role debug 12/12; prop audit 10 archetypes; gallery rendered. The town-ground composite is a diagnostic overlay, not live spawn/placement proof.

### Separate full-workflow failure and evidence boundary

Run #721 overall FAILS at game-browser diagnostics, not at the revision-18 design projection or semantic validation. The golden snapshot gate reports 1 match / 23 changed because baseline provenance remains explicitly unapproved. Existing audio/resource HTTP 404s also remain; `pageErrors` and `scriptErrors` are empty. The five-civilian summary records the failed golden gate. No snapshots or provenance were changed. Do not weaken or bypass this gate.

**Disposition:** revision-18 design-source automated checks PASS and actual evidence images have been visually inspected. Overall browser QA remains FAIL. This is not renderer integration, live town spawn validation, independent Claude review, or owner approval. No production renderer, approved character art, golden snapshots or provenance changed. Sailor, Slicker and Painter remain design-stage candidates; construction families UNASSIGNED; Claude re-review and owner approval pending; #15–23 remain held.


## Revision 15 — internal QA and cross-roster comparison complete (2026-11-20)

- [Run #695](https://github.com/tinytime/Tinytime.github.io/actions/runs/44787355926) tested revision-15 source at 9abb7de906314a092157f6d5bffe4492e7736cb9; artifact [14653489949](https://github.com/tinytime/Tinytime.github.io/actions/runs/44787355926/artifacts/14653489949). The design-source capture and semantic validation passed; the overall workflow failed at the separate global game-browser diagnostics gate.
- Design evidence: 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged 4×; 69 roster face crops and six matched 40×38 comparison rows. All 12 body-only/prop-on pairs passed with removedBodyPixels=0. Profile prop audit: Sailor/right +172; Painter/left +143 total / +141 in expected region; no arbitrary threshold.
- Manual inspection covered body-native/direct, prop-native/direct, front prop group, enlarged directional crops, matched face comparisons and Sailor/Welder rear diagnostic. Sailor's coil and arm gaps read clearly. Painter's hand/brush connection and profile arm are preserved; the flared head is more brush-like, but the direct-scale tool/hand cluster remains dense and is flagged for owner scrutiny. Slicker's longer character-left storm flap makes the front/rear hem asymmetry more legible; the integrated hood and diagonal closure read as rainwear.
- Cross-roster body comparison: inspected all four available directional captures for Clinic, Guard, Coach, Courier and Fisher, plus the five-civilian black-silhouette sheet for Usher, Cook and Ref. Sailor is closest to Usher/Coach in upright narrow mass, differentiated by flat-brim cap, longer stance, separated arms and coil. Slicker differs from Fisher/Cook/Guard through the pear-shaped hooded shell and storm flap. Painter differs from Coach/Courier/Ref through open reaching posture and hip-level brush. These comparisons are qualitative, not pixel-normalized; the roster captures are game-rendered sprites and the new set is design-source vector silhouette art.
- The Sailor/Welder rear diagnostic remains a vector-versus-legacy-pixel comparison, not like-for-like. Face comparisons are grayscale geometry next to painted roster crops, not final character art.
- Global browser diagnostics: golden snapshot metadata remains explicitly unapproved (1 match / 23 changed; none missing); 180 resource 404 console entries including audio; pageErrors and scriptErrors empty. No golden snapshots or provenance changed. Ancillary checks passed: syntax, sprite module, inventory, palette/body, atlas runtime/fallback, 20/20 game-scale captures, 92/92 directional integrity, 12/12 role debug, 10 archetype prop audit and gallery render.
- No renderer, approved art, golden snapshots or provenance changed. Independent Claude re-review and owner approval remain pending.


## Revision 14 — fresh QA and manual artifact inspection (2026-11-20)

- [Run #691](https://github.com/tinytime/Tinytime.github.io/actions/runs/44786466007) tested revision-14 source at commit `6d0c27e71d17e0eaa20eb069926fee323bd255a7`; artifact [14654237640](https://github.com/tinytime/Tinytime.github.io/actions/runs/44786466007/artifacts/14654237640). The run's initial revision-14 attempt failed on an unescaped apostrophe in the evidence script; follow-up commit `beb81f182bd0a520db8765ca67955ae55ce414ce` corrected it, and Run #691 then passed the design projection, semantic proportion/annotation validation, Granny overlay, six-civilian annotation overlay, five-civilian review sheet and artifact upload.
- Design-source report: 24/24 native 64×96 captures, 24/24 direct 28×42 captures (separately rasterized), 24/24 enlarged nearest-neighbour captures; 69 roster face crops and six matched 40×38 comparison rows. All 12 body-only/prop-on pairs passed with `removedBodyPixels=0`. Profile prop audit: Sailor/right +172 pixels; Painter/left +143 total / +141 in expected region; no arbitrary threshold applied.
- Manually inspected `body-native-comparison.png`, `body-direct-comparison.png`, `prop-native-comparison.png`, `prop-direct-comparison.png`, `prop-front-group-comparison.png` and `matched-face-comparisons-native-40x38.png`. Sailor coil/arm gaps read clearly. Painter's flared brush head and hand are present and base geometry is preserved; tool/hand cluster remains dense at 28×42 and should receive owner scrutiny. Slicker's integrated hood opening and diagonal closure replace the ambiguous umbrella; broad forward-pitched smock and asymmetric hem are visible. Face comparisons are geometric reference only, not final character rendering approval.
- Overall Run #691 failed only at the separate game-browser diagnostics step. Syntax checks and sprite module loading passed; NPC inventory passed (135 NPCs, 24 civilians, 20 fans, six atlas sprites); atlas runtime and vertical fallback audits passed; Granny capture and overlay passed. Five-civilian review sheet ancillary checks: directional integrity 92/92, direct 28×42 20/20, role debug 12/12, prop audit 10 archetypes, gallery rendered. No live spawn test for these three design candidates was performed.
- Golden snapshot gate failed because the baseline metadata remains explicitly `unapproved`: 24 expected/24 present, 1 match (Granny), 23 changed civilians, none missing. This baseline must not be refreshed or approved without explicit owner authorization. Browser console logged 180 resource 404 entries (including `mus_r2`, `amb_r2`, `amb_fy`, `sfx_horn` assets); `pageErrors` and `scriptErrors` are empty. Treat these as outstanding project diagnostics, not a reason to alter golden baselines.
- **Disposition:** revision-14 design-source checks pass and manual source-projection review completed; global browser QA remains failed due to the unapproved golden gate and missing resources. No production renderer, approved art, snapshots or provenance changed. The three characters remain design-stage; independent review and owner approval are pending.

---

## Revision 14 — Run #688 inspected; revision 14 retest pending (2026-11-20)

- Current source on branch before this log update: [revision 14](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-14.svg), commit `a0c46c30fd42bdb717fa3893bd5a5759fc735d60`.
- Latest completed run is [Run #688](https://github.com/tinytime/Tinytime.github.io/actions/runs/44784814224), exact tested source commit `81aacbcbe701fe4b748b72b406144c7b6389b0a4` (revision 13), artifact [14654841365](https://github.com/tinytime/Tinytime.github.io/actions/runs/44784814224/artifacts/14654841365). Chromium install, design-source capture, semantic proportion/annotation validation, Granny overlay, six-civilian overlay, five-civilian review sheet and artifact upload completed.
- Revision-13 design-source evidence: 24/24 native 64×96, 24/24 direct 28×42, 24/24 enlarged 4×; 69 roster face crops and six matched face rows. All 12 body-preservation pairs passed with zero removed body-only pixels. Profile additions were descriptive only: Sailor/right 172, Slicker/left 245, Painter/left 93; no minimum threshold is applied.
- Artifact visual inspection: Sailor coil/arm gaps are visible in the silhouettes. Painter's near-side hand/brush is present, but the small brush head remains borderline mallet-like at 28×42. Slicker's separate umbrella still reads ambiguously at 28×42. Revision 14 responds with a flared brush head and integrated rain hood/diagonal storm closure. These visual observations apply to revision 13 only.
- The global game browser diagnostics step failed: golden snapshot gate 1 match / 23 changed (unapproved baseline), and existing audio/resource requests generated console 404 entries. Syntax checks, NPC inventory, atlas runtime/vertical fallback, fan checks and Granny semantic overlay passed; pageErrors and scriptErrors were empty. The five-civilian review sheet reported directional integrity 92/92, direct game-scale captures 20/20, role debug 12/12, prop audit 10 archetypes and gallery rendered. This is not proof of new-character renderer integration or live-town spawning.
- Revision 14 changes the SVG design source, QA projection script and runner environment (Ubuntu 24.04; Playwright Chromium without apt dependency installation). The current Actions run tested revision 13, not revision 14. The revision-14 capture and full browser QA remain pending; do not mark this iteration complete or pass based on Run #688.
- No golden snapshots/provenance, production renderer or approved character art were changed. Construction families remain UNASSIGNED; owner approval and renderer authorization remain pending.

---

## Revision 14 — correction pass and QA runner stabilization

- **Run #687** rendered revision 12 and produced design-source projections. Its anatomy audit found Painter/left removed 85 body-only pixels. Inspection traced this to a mismatch between the near-side profile arm/hand and the prop-on construction; revision 13 shares the same arm/hand geometry in both views and adds the brush below the hand.
- Run #687 visual inspection: Sailor rear/profile arm gaps and coil bridge are improved. Painter front/back brush heads no longer crowd the face, but the direct 28×42 brush head remained borderline mallet-like. Slicker's separate umbrella remained unreadable at 28×42, so it was removed in favor of an integrated hood and diagonal storm closure.
- **Run #688** was superseded while its Chromium dependency-install step remained in progress on the new Ubuntu 26.04 ubuntu-latest image. Revision 14 pins browser QA to Ubuntu 24.04 and uses the browser-only Playwright install to avoid the long apt dependency step.
- Revision 14 adds a flared brush head, integrated Slicker hood/closure, zero-body-pixel-removal checks across all 12 body-only/prop-on pairs, and descriptive-only profile pixel counts. A new browser run will validate this revision; artifact inspection and owner approval remain pending.
- No production renderer, approved character art, golden snapshots or provenance files were changed.

## Revision 11 — Claude corrections and internal QA in progress

- Implemented the seven requested correction groups in [silhouette exploration 11](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-11.svg) and the matched face study.
- Added body-preservation checks for all 12 body-only/prop-on direction pairs. Removed the unjustified Painter 12-pixel profile threshold; prop-region counts are now informational, not pass/fail.
- Fresh browser capture is queued as [Run #682](https://github.com/tinytime/Tinytime.github.io/actions/runs/44783740911), source commit `51ede3a3c065dddb1eb56717e7d530e6acf528f1`. It has not completed yet; artifact inspection and manual visual disposition are pending.
- No golden snapshots or provenance were changed. No production renderer or approved civilian assets were touched.

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


## Revision 19 — design-source update, QA not yet performed

**Artwork source commit:** `44d133b65c8ebd6aa3c207e03960d85034df193b` ([revision 19 SVG](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-19.svg)).

- Sailor: compacted the rope loop and revised the visible grip silhouette in front, rear and near-side right profile. Character-left handedness is retained under standard §F2.
- Painter: replaced the fork/rake-like brush treatment with a compact diagonal handle and solid wedge bristle head in front, rear and near-side left profile. Character-right handedness is retained under standard §F2.
- Slicker: unchanged; source geometry is preserved.
- No revision-19 captures or automated/manual QA have been run. No result is inferred from the source edit. Internal QA is pending, not passed; Claude review and owner approval have not occurred. Renderer implementation is not authorized.


## Revision 21 — exact-source QA result (2026-11-20)

- **Design source:** [revision 21 SVG](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg), exact artwork commit be1c0c012894ccae23b4cbce2ad06e523fb460c5.
- **Evidence:** [GitHub Actions Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056) · artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854). The workflow ran at branch head be1c0c012894ccae23b4cbce2ad06e523fb460c5; revision-21 SVG was unchanged from the exact artwork commit.
- **Focused automated design checks: PASS.** 12/12 body-preservation pairs (zero removed body pixels); 48/48 connected body/prop projections across native 64×96 and independently rasterized direct 28×42; profile prop contact 2/2; semantic proportion/annotation validation passed. Evidence includes 24 native, 24 direct 28×42 and 24 enlarged captures, 69 roster face crops, six new face studies and six matched face-comparison rows.
- **Manual visual inspection: PASS WITH REVIEW QUESTIONS.** Inspected native/direct body and prop comparison sheets, enlarged Sailor front and right-profile coil details, enlarged Painter front and left-profile brush details, matched face rows and Sailor/Welder rear comparison. Sailor's compact winding coil is visibly held in front/back and near-side right profile; Painter's flat wedge brush, handle and ferrule are legible in front/back and near-side left profile. Hand/prop contact is improved but still merits independent scrutiny at 28×42. Slicker is unchanged.
- **Slicker preservation:** all eight directional body/prop panels (four directions × two views) compare byte-for-byte with revision 18.
- **Separate full-workflow failure:** Run #810 fails at existing browser diagnostics, not the design-source steps. Existing checks report 180 console/resource errors (135 HTTP 404 responses plus 45 corresponding sound-load messages), pageErrors empty, scriptErrors empty, and golden snapshot gate **1 match / 23 changed**. Directional integrity 92/92, direct game-scale captures 20/20, role debug 12/12, prop audit 10 archetypes and gallery render passed. No golden snapshots or provenance were changed.
- **Status:** revision-21 design-source internal QA is PASS WITH REVIEW QUESTIONS. This is not production-renderer QA, owner art approval or a globally green browser run. Claude independent review is prepared in [package 06](SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-06.md), not yet sent or completed. All construction families remain UNASSIGNED; #15–23 remain held.


