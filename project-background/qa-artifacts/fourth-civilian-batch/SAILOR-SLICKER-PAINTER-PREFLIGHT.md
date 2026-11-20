## Latest internal QA status — revision 09 in revalidation (2026-11-20)

The current parallel design-source study is [revision 09](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-09.svg). The previous Claude-ready claim is withdrawn; do not send superseded review package 01.

- Run #673 [44777304508](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777304508), artifact [14649699220](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777304508/artifacts/14649699220), tested revision 07 at `f6d9e2dc84c3309489085f530f686fed195cd42c`. It generated all 24 native 64×96 and 24 direct 28×42 projections. Near-side prop-presence assertions passed; visual review then found Slicker's umbrella and Painter's brush too close to the left-profile crop edge.
- Run #674 [44777818302](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777818302), artifact [14650547538](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777818302/artifacts/14650547538), tested revision 08 before the latest crop corrections. The Sailor/Welder matched rear comparison was visually distinct; its high overlap diagnostic remains a human-review prompt only.
- Painter's left-profile brush was shifted inward in commit `3f5271a82f89a0882b5c24a5667db3907b01c874`. Slicker's left-profile umbrella, hand and handle cluster was shifted inward in revision 09 / commit `b70582e3ff4141e18c345ee68c9c968aef027d21`. The evidence builder targets revision 09 in commit `c74219986db2466122fe08ff3ad0bdcb012b5264`. A fresh artifact against this exact latest HEAD is required before considering the crop correction verified.
- Both completed runs failed the global browser gate: unapproved golden snapshot baseline (1 match / 23 changed) and audio-resource HTTP 404s. Page/script errors were empty. No snapshots or provenance were changed.

All three remain design-stage only. Construction families remain UNASSIGNED; no silhouette, face, prop, handedness or palette has owner approval. Renderer implementation is NOT AUTHORIZED. Do not begin #15–23.

## Current internal QA and independent review handoff — revision 08 (2026-11-20)

The internal design-source pass is complete for Sailor (#12), Slicker (#13) and Painter (#14). The exact-output Claude review package is [SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-02.md](SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-02.md). Package 01 is superseded.

- Current source: [silhouette exploration 08](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-08.svg); [construction cards 01](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md); [face geometry study 02](SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg).
- Exact evidence: [Run #674](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777818302), artifact [14650547538](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777818302/artifacts/14650547538), tested commit `c004c4e9b231803bc3977b9d418f104e223dc417`.
- Design-source captures: 24/24 native 64×96, 24/24 independently vector-rasterized direct 28×42, 24/24 enlarged 4×. Matched face comparisons, profile prop checks and proposed Sailor/Welder rear comparison are included.
- Manual inspection: body-only silhouettes are distinct at native and direct scale; near-side props and character-relative handedness are present; far-side profile props are hidden; profile prop shapes and contact were visually inspected. Sailor/Welder rear comparison shows the proposed Sailor's narrower deck-coat construction distinct from Welder's broader blockier silhouette. Face geometry remains a principal independent-review question.
- Overall Browser QA still fails only at global gates: unapproved snapshots (1 match / 23 changed) and 180 existing audio/resource HTTP 404 console entries. Page/script errors are empty. No snapshots or provenance changed.
- No silhouette, face, prop, palette or construction family is owner-approved. All construction families remain UNASSIGNED; renderer work is NOT AUTHORIZED; #15–23 remain on hold.

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

Run #665 [44773914851](https://github.com/tinytime/Tinytime.github.io/actions/runs/44773914851), artifact [14647819936](https://github.com/tinytime/Tinytime.github.io/actions/runs/44773914851/artifacts/14647819936), tested source commit 184fe72b211c11e968b7b192228bb7cf04792e5b. Actual images were inspected: the native face-comparison labels are now readable, but Sailor's coil visibly separates from the hand, Slicker's umbrella is too subtle to identify confidently at direct 28×42, and Painter's profile grip needs stronger hand/brush continuity.

Run #670 [44776178822](https://github.com/tinytime/Tinytime.github.io/actions/runs/44776178822), artifact [14650042107](https://github.com/tinytime/Tinytime.github.io/actions/runs/44776178822/artifacts/14650042107), tested source commit 65fb26fd2635bb178c2298826da2c729db01db03. The expanded profile audit correctly failed: Slicker's far-side umbrella was still visible, and Painter's near-side grip region did not meet its explicit check. This confirms the previous profile contact/occlusion evidence was insufficient.

Current source revision 06 has follow-up changes in commit 388efaff3d545a84e2b768f2fead9ee3609d3e1c: Sailor's coil is moved inward with a stronger palm bridge; Slicker's umbrella is enlarged and the far-side profile prop removed; Painter's near-side profile grip is enlarged. The exact source commit still requires a fresh Actions run and visual inspection. No claim of pass is made yet.

The matched face comparison now uses named roster comparators and the native labels are legible. Face geometry remains a human-review question. Overall browser QA continues to fail on the unapproved golden snapshot baseline and existing audio/resource HTTP 404 diagnostics; do not update snapshots or provenance.

Next: validate the exact revision-06 source against fresh native 64×96 and direct 28×42 projections, inspect every prop direction and hand contact, confirm hidden far-side props, compare Sailor's rear silhouette against Welder and other close roster figures, then update the Claude package only after internal QA is genuinely complete. All three construction families remain UNASSIGNED; no owner silhouette approval, palette approval, renderer authorization or work on #15–23.
