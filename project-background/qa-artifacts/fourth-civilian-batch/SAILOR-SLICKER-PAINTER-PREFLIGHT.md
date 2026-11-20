## Latest internal QA status — revision 10 validated; Claude package 04 prepared (2026-11-20)

The current parallel design-source study is [revision 10](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg). Internal design-source capture and visual inspection are complete. The exact-output review package is [Claude review package 04](SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md); packages 01–03 are superseded.

- Exact tested source commit: 8ae6a47055c6c75e361738b21c01d8b07b6830b4. The SVG's internal title was corrected metadata-only after the run in commit f7efb67c3fdfcd38899c9d29996b1ed3e1310322; geometry is unchanged.
- [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818). Design-source capture/semantic validation passed: 24/24 native 64×96, 24/24 direct 28×42, 24/24 enlarged; 69 roster face crops and six matched face rows.
- Profile prop audit passed: Sailor right 172 added/172 region; Slicker left 295 added/272 region; Painter left 237 added/95 region. Actual sheets and enlarged views were inspected. Revision 10 clarifies Slicker's umbrella shaft/canopy in front and back; direct game-scale identity is stronger. Sailor's rope-loop grasp remains a Claude review question; Painter's near-side brush grip and crop placement are clearer.
- Proposed Sailor rear silhouette is visibly narrower and more vertically structured than Welder's broad squared rear silhouette in the matched comparison.
- Browser QA overall failed only at global gates: unapproved golden snapshots (1 match / 23 changed) and 135 existing audio/resource HTTP 404 console entries. Page/script errors are empty; no golden snapshots or provenance changed.
- All three remain design-stage only. Construction families UNASSIGNED; no silhouette, face, prop or palette has owner approval. Renderer implementation is NOT AUTHORIZED. #15–23 remain on hold pending independent review and owner approval.

# Fourth civilian batch — Sailor, Slicker and Painter preflight

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Roster positions:** #12 Sailor, #13 Slicker, #14 Painter  
**Stage:** parallel identity refinement and silhouette exploration for all three (current authority)  
**Status:** owner approved the three role directions and authorized simultaneous exploration on 2026-11-20. Sailor, Slicker and Painter are all active design-stage work; none has an approved silhouette, palette, construction family or renderer.

## Batch objective and order

Develop three original civilian identities that are immediately distinguishable in solid-black silhouette before colour or props. Work in this order:

1. **Sailor (#12)** — establish the first Trades identity without borrowing Fisher's broad oilskin smock or basket-bearing stance.
2. **Slicker (#13)** — establish a weatherwear/rain-slicker identity with a distinctly different torso and head silhouette from Sailor, Fisher, Courier, Coach and Hacker.
3. **Painter (#14)** — establish an artist/work-painter identity that does not collapse into Cook's apron, Welder's tool silhouette, or the generic Trades worker.

The owner has explicitly superseded the historical one-at-a-time sequence. Work on all three simultaneously and submit one coordinated comparison package. Each character advances independently only after its own owner silhouette/construction approval. No renderer implementation is authorized.

## Source-of-truth context

- The 23-character register in [ROSTER-SHELL-FAMILY-AUDIT.md](../next-civilian-batch/ROSTER-SHELL-FAMILY-AUDIT.md) names these characters #12–14 and currently leaves their vector construction families UNASSIGNED.
- Legacy dispatch metadata in `npc_sprites.js` groups all three under the old `trades` archetype. It records legacy head-style hints (Sailor: newsboy cap; Slicker: bucket hat; Painter: beanie) and a generic wrench/tool-pocket prop. These are historical cues only, not approved vector designs or a mandate to reuse the old Trades body, palette or wrench.
- Fisher (#11) is the immediately preceding owner-approved design: broad, grounded waterfront worker in a short oilskin smock, hood/brow lip and character-left net basket. Do not create another broad waterfront smock, repeat its basket, or make Fisher and Sailor read as palette variants.
- Granny Volt is the quality/craft benchmark, not a template. Existing approved characters and their accepted exceptions are protected.

## Identity briefs — hypotheses, not locked designs

### Sailor (#12)

**Role/personality hypothesis:** an experienced, observant working sailor; steady, practical, quietly confident. Avoid a generic navy-uniform mascot or a Fisher clone.

**Silhouette hypothesis:** a narrower, upright, weather-braced deckhand with a short squared pea-jacket or cropped deck coat, a clear raised collar/neck opening, and a compact cap contour. Keep the torso vertically structured rather than Fisher's broad smock volume. Use a distinct leg stance and negative-space break at the arms.

**Head/face cues to explore:** a strong brow shelf and a long, slightly hooked nose/profile or a distinctive cheek/jaw plane; make the cap brim and ear relationship clear in both profiles. Choose two face cues only after comparing against the closest current roster faces at matched native scale.

**Signature prop hypothesis:** a short coiled mooring line or a single belaying/line-handling tool, with one clearly visible hand contact. Do not default to a basket, wrench, or large ship's wheel. If the rope coil becomes unreadable at 28×42, simplify it or choose a more legible prop.

**Palette direction:** restrained storm-blue / salt-grey / warm canvas with one small safety-orange or brass accent. This is a provisional value direction only; Fisher's ochre and petrol/teal family are excluded.

**Three must-survive cues (provisional):**
1. Upright, narrow deck-coat construction distinct from Fisher's wide smock.
2. Recognizable cap/collar/head contour at direct 28×42.
3. One legible, physically supported sailor-specific line-handling cue.

**Likely confusion risks:** Fisher (waterfront role), Guard (braced stance/outerwear), Coach (short structured jacket), Vendor (handheld item). Resolve with body construction, face geometry and negative space, not palette alone.

### Slicker (#13)

**Role/personality hypothesis:** a rain-ready city pedestrian or storm-season commuter; quick, self-contained, alert. Treat “Slicker” as a rainwear identity hypothesis because the legacy name and bucket-hat cue suggest a rain slicker, but validate this interpretation before locking it.

**Silhouette hypothesis:** a compact, slightly forward-leaning figure with a clearly shaped rain hood or bucket-hat brim and a long, curved or asymmetrically fastened waterproof shell. The shell should have a visible opening/overlap and a hem that creates a different outline from Sailor's cropped jacket and Fisher's broad smock. Avoid simply adding a coat over a generic body.

**Head/face cues to explore:** an angular brow/eye set and a compressed, tucked chin or distinctive nose/cheek profile; preserve enough exposed face plane beneath the brim/hood for the profile eye to read at 28×42.

**Signature prop hypothesis:** a compact folded umbrella or a small rain gauge/handheld weather item, integrated into one hand with an explicit grip. Do not use an umbrella if it dominates the body silhouette or becomes a thin unreadable line at game scale; a distinctive fastener/hood construction may carry the role instead.

**Palette direction:** muted plum / charcoal / wet-stone with a controlled acid-lime or reflective silver accent. Avoid Fisher's ochre, Tech's petrol and the bright courier orange.

**Three must-survive cues (provisional):**
1. Rain-shell silhouette with a distinctive curved/asymmetric hem and visible closure.
2. Clear hood/brim-to-face relationship, including a readable direct-scale head cue.
3. One integrated rain-specific interaction or closure detail that survives 28×42.

**Likely confusion risks:** Fisher (weatherproof garment), Courier (outerwear and carried gear), Hacker (folded-in posture), Coach (jacket mass). Differentiate through rain-shell geometry, pose and head construction; do not depend on a prop or colour swap.

### Painter (#14)

**Role/personality hypothesis:** a hands-on sign painter / muralist or practical working painter; expressive, meticulous, a little eccentric. The exact work setting can be owner-adjusted, but avoid a generic labourer.

**Silhouette hypothesis:** an asymmetrical, loose work smock or cropped painter's coverall with one rolled sleeve, a pronounced pocket/tool-belt break and a distinctive head/beanie contour. Use a more open, reaching or weight-shifted pose rather than the braced stance of Fisher or the compact stance of Slicker. Keep the garment shape clearly separate from Cook's apron-front and Welder's protective equipment.

**Head/face cues to explore:** a swept forelock or hair tuft under the beanie, plus a distinct eye/brow expression or angular nose bridge. The head should remain recognizable when small paint details disappear.

**Signature prop hypothesis:** a short broad brush held with a clear hand grip, with a small paint tin or palette only if it remains physically connected and readable. Do not add multiple floating brushes or a large easel that overwhelms the 64×96 sprite.

**Palette direction:** warm workwear canvas / deep indigo / brick or vermilion accent with a restrained paint mark. Keep paint colours subordinate to the garment value hierarchy; do not use splatters as the main identity.

**Three must-survive cues (provisional):**
1. Asymmetric painter's workwear construction, distinct from Cook's apron and Welder's mask/gear.
2. Distinct beanie/hair silhouette and readable face cue at 28×42.
3. One believable brush grip/contact chain; paint tin is optional.

**Likely confusion risks:** Cook (apron and handheld utensil), Welder (Trades/tools), Busker (beanie and handheld object), Hacker (asymmetrical clothing). Resolve through garment cut, arm pose, face geometry and prop shape.

## Shared construction and evidence requirements

Use the owner-ratified [Civilian Vector Construction Standard](../../CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md), especially its eight-stage pipeline and §13A directional/face requirements.

Under the current owner authorization, apply the shared deliverables to Sailor, Slicker and Painter in parallel.

For Sailor, produce:

1. Two complete four-view silhouette sets: body-only (no props) and prop-on. The body-only set controls identity; the prop-on set tests optional prop integration.
2. An identity brief with personality, pose, head/face cues, role construction, signature prop and palette hypothesis.
3. Four solid-black silhouettes per set: front, back, left profile and right profile. Compare at matched scale against Granny and the closest existing roster figures before colour work.
4. A construction card with a qualitative build descriptor, pose class, visible silhouette/baseline notes, prop footprint, character-relative handedness, near/far anatomy and exactly three must-survive cues.
5. A matched-scale face comparison against the two closest current roster faces, using native 64×96 front/profile crops and geometric distinctions. Exclude skin tone, hair colour and headwear as the sole differences.
6. A roster shell-family audit update. Keep each new family UNASSIGNED until silhouette exploration and owner approval; no numeric family quotas.
7. An explicit prop-contact/handedness table for all four directions. Profiles must show one intentional near-side anatomy plane and occlude the far arm unless the pose clearly justifies it.
8. Black-silhouette comparison evidence and a rendered sheet for owner review. Do not polish gradients before silhouette and construction approval.

After silhouette approval and colour design approval, production proceeds one character at a time. Each renderer needs dedicated character-specific paths and four directional constructions. Internal QA must inspect native 64×96 and direct-rendered 28×42 captures, not resized native art; inspect enlarged details, neutral-grey backgrounds, gallery, live town context, props/contact, face crops and regressions. Run relevant tests and inspect the actual artifacts before the next character begins.

## Owner decision and execution refinements — 2026-11-20

The owner approved the refined role directions and explicitly authorized parallel exploration for Sailor (#12), Slicker (#13) and Painter (#14). The approval does not approve a final silhouette, face, prop, palette or construction family, and does not authorize renderer implementation.

Three shared QA refinements apply to Sailor:
- Produce both body-only and prop-on four-view silhouette sets. Identity must read in the body-only set; the prop-on set is a secondary interaction check.
- Choose the two closest existing face references from actual matched-scale face crops before finalizing new cues. Compare head/jaw proportions, brow, eye geometry/placement, nose/profile, cheek and mouth/expression; colour and headwear do not count.
- Establish near/far arm anatomy before adding any prop. Then document grip, contact and character-relative handedness in all four directions.

Sailor-specific emphasis:
- Prioritize raised collar, compact cap contour, leg stance, shoulder-to-waist construction and arm negative spaces.
- Compare front and both profiles against Clinic first; also compare Coach, Guard and Fisher at matched scale. The historical Clinic/Sailor front overlap is a human-review prompt, not a numeric threshold.
- Rope coil remains optional and cannot carry the identity.

See [Sailor silhouette exploration 01](SAILOR-SILHOUETTE-EXPLORATION-01.svg) and [Sailor construction card exploration 01](SAILOR-CONSTRUCTION-CARD-EXPLORATION-01.md). Both are preliminary review material, not approval.

## Protected decisions and exclusions

- Do not edit Granny Volt or existing approved NPC art as a shortcut to improve separation.
- Do not change golden snapshots or snapshot provenance.
- Do not introduce new numeric proportion targets, score thresholds or semantic calibration.
- Do not reuse the legacy Trades renderer as a vector template.
- Do not treat unapproved silhouettes, face cues, palette suggestions, props or construction families as owner-approved.
- Do not start the remaining roster (#15–23) during this batch.

## Internal QA continuation — 2026-11-20

**Current design source:** [silhouette exploration revision 10](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg)  
**Exact tested source commit:** `8ae6a47055c6c75e361738b21c01d8b07b6830b4`  
**Latest evidence:** [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818).

Run #678 passed design-source projection and semantic validation:
- 24/24 native 64×96 projections, 24/24 independently rasterized direct 28×42 projections, and 24/24 4× nearest-neighbour enlargements.
- 69 current-roster face crops, six new face-design crops and six matched face-comparison rows.
- Near-side prop-region audit: Sailor/right 172 pixels (minimum 100); Slicker/left 272 pixels (minimum 100); Painter/left 95 pixels (minimum 12). All three pass.
- Browser report: directional integrity 92/92; existing five-civilian direct 28×42 assertion 20/20; role debug 12/12; prop audit 10 archetypes; gallery rendered.

Actual Run #678 images were downloaded and inspected at native 64×96, direct 28×42 and enlarged 4× nearest-neighbour scales:
- **Sailor:** narrow upright deck-coat body reads without the coil. The character-left mooring coil is visible front (viewer-right), back (viewer-left) and right profile only; hidden in the left profile. The compact loop is connected through the palm/forearm bridge and reads as held rope at direct scale.
- **Slicker:** compact forward-pitched long-shell body reads without the umbrella. The character-right folded umbrella is visible front (viewer-left), back (viewer-right) and left profile only; hidden in the right profile. Revision 10 adds a more legible shaft/canopy silhouette in front and back; direct 28×42 and enlarged views read as a folded umbrella rather than a generic pouch/side mass.
- **Painter:** open asymmetrical reaching body reads without the brush. The character-right broad brush is visible front (viewer-left), back (viewer-right) and left profile only; hidden in the right profile. The broad head and continuous handle/grip chain remain visible at direct 28×42 and enlarged scale.
- **Set:** body-only constructions remain distinct: Sailor narrow/upright, Slicker compact/forward-pitched rain shell, Painter open/asymmetrical/reaching.
- **Faces:** native and 3× matched comparisons are legible and name their comparator pairs: Sailor—Clinic/Guard; Slicker—Hacker/Courier; Painter—Cook/Busker. Face geometry remains provisional.
- **Sailor/Welder:** the matched rear comparison preserves native 64×96 aspect ratio. Proposed Sailor is narrower and more vertically structured; live Welder remains broader/blockier with different shoulder/equipment mass. The legacy 0.889 Sailor/Welder diagnostic is from existing roster renderers, not the proposed vector Sailor.

Run #678 overall concluded **FAILURE** at the global browser diagnostics gate:
- Golden snapshot gate: 1 match / 23 changed; baseline approval metadata remains unapproved.
- 135 existing audio/resource console 404s.
- `pageErrors` and `scriptErrors` are empty.
- Design-source generation, semantic validation, Granny overlay, six-civilian annotation overlay, five-civilian review sheet and artifact upload completed. Gallery and town screenshots were inspected; the characters are not integrated into production renderer/town/gallery, so these are existing-scene smoke checks only.
- No golden snapshots or provenance were changed.

**Internal design-source QA: PASS WITH REVIEW QUESTIONS.** Claude package 04 is prepared with the exact revision-10 source and Run #678 artifact. This is ready for independent comparative review, not owner approval. No silhouette, face, prop, palette or construction family is approved. All three construction families remain UNASSIGNED. Production renderer implementation is NOT AUTHORIZED. Roster positions #15–23 remain on hold pending Claude's review and explicit owner approval.
