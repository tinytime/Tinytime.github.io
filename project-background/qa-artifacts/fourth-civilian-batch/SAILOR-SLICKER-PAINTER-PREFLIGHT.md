# Fourth civilian batch — Sailor, Slicker and Painter preflight

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Roster positions:** #12 Sailor, #13 Slicker, #14 Painter  
**Stage:** identity and silhouette preflight only  
**Status:** proposed directions for owner review; no silhouettes, palettes, construction families or renderer implementations are approved yet.

## Batch objective and order

Develop three original civilian identities that are immediately distinguishable in solid-black silhouette before colour or props. Work in this order:

1. **Sailor (#12)** — establish the first Trades identity without borrowing Fisher's broad oilskin smock or basket-bearing stance.
2. **Slicker (#13)** — establish a weatherwear/rain-slicker identity with a distinctly different torso and head silhouette from Sailor, Fisher, Courier, Coach and Hacker.
3. **Painter (#14)** — establish an artist/work-painter identity that does not collapse into Cook's apron, Welder's tool silhouette, or the generic Trades worker.

The sequence is a proposed production order, not permission to skip the owner silhouette gate. Complete and review one character's four-view silhouette and construction card before locking the next character's silhouette. Do not start renderer implementation in this preflight.

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

For each character, produce:

1. An identity brief with personality, pose, head/face cues, role construction, signature prop and palette hypothesis.
2. Four solid-black silhouettes: front, back, left profile and right profile. Compare at the same scale against Granny and the closest existing roster figures before colour work.
3. A construction card with a qualitative build descriptor, pose class, visible silhouette/baseline notes, prop footprint, character-relative handedness, near/far anatomy and exactly three must-survive cues.
4. A matched-scale face comparison against the two closest current roster faces, using native 64×96 front/profile crops and geometric distinctions. Exclude skin tone, hair colour and headwear as the sole differences.
5. A roster shell-family audit update. Keep each new family UNASSIGNED until silhouette exploration and owner approval; no numeric family quotas.
6. An explicit prop-contact/handedness table for all four directions. Profiles must show one intentional near-side anatomy plane and occlude the far arm unless the pose clearly justifies it.
7. Black-silhouette comparison evidence and a rendered sheet for owner review. Do not polish gradients before silhouette and construction approval.

After silhouette approval and colour design approval, production proceeds one character at a time. Each renderer needs dedicated character-specific paths and four directional constructions. Internal QA must inspect native 64×96 and direct-rendered 28×42 captures, not resized native art; inspect enlarged details, neutral-grey backgrounds, gallery, live town context, props/contact, face crops and regressions. Run relevant tests and inspect the actual artifacts before the next character begins.

## Protected decisions and exclusions

- Do not edit Granny Volt or existing approved NPC art as a shortcut to improve separation.
- Do not change golden snapshots or snapshot provenance.
- Do not introduce new numeric proportion targets, score thresholds or semantic calibration.
- Do not reuse the legacy Trades renderer as a vector template.
- Do not treat these hypotheses, palette suggestions, props or construction families as owner-approved.
- Do not start the remaining roster (#15–23) during this batch.

## Handoff state

- Previous batch #9–11: owner-approved by the project owner on 2026-11-20. Tech is a production-renderer character; Hacker and Fisher are approved finished design-stage characters. This approval does not imply Hacker/Fisher production renderer integration.
- Fourth batch #12–14: preflight prepared; owner review of the identity/silhouette direction is pending.
- First recommended action: owner reviews the three role hypotheses and approves or revises them; then ChatGPT produces the four-view black silhouette exploration and construction cards before any renderer work.
