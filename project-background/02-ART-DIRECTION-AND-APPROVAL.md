# Art Direction and Approval

## Current authority — 2026-11-20

- Use the revised Civilian Vector Construction Standard as a working method for planning and controlled briefs. It is not yet owner-ratified for production rollout.
- Cook C1 is deferred/accepted as-is; Usher U2 is declined; Usher U4 is the only authorized open visual correction and is implemented at renderer commit `880cad6bf937d8bfc1e004fe81cbd6854c522d23`, internally resolved by Run #602 at native and direct 28×42; Claude re-review remains pending.
- Preserve the accepted Coach/Courier rear construction. Do not alter Cook's pan/handle or Usher's outer silhouette without renewed authorization.
- The five review characters remain NOT APPROVED pending U4 verification, updated Claude review and explicit owner approval. The remaining 17 civilians remain ON HOLD for production.

 Standard

## Current build and approval status — 2026-11-19

This is the current status summary; dated historical entries below remain historical and are superseded where they conflict.

- The construction standard is available as the working method, but remains subject to independent Claude review and owner ratification. Proportion bands and scorecard values remain provisional/non-enforcing.
- Pairwise silhouette IoU remains a diagnostic review trigger, not a universal hard-fail art threshold. Current global watch items: Clinic/Sailor front 0.9094292803970223; Coach/Courier back 0.890479. Inspect the exact pair/direction at native and direct game scale and record a human judgment. Do not optimize art to a number.
- The current correction/review group is Usher, Cook, Courier, Coach and Referee. Usher/Cook/Courier's earlier owner approvals were reopened and are historical only. Runner is excluded from this review submission and remains for a later focused review.
- The remaining 17 civilians are ON HOLD. Do not begin production until the five-character correction set has fresh QA and visual inspection, independent Claude review, valid findings resolved, and explicit owner approval.
- Run #591 verified targeted Granny/semantic/capture/overlay/directional/gallery/town checks, but the overall Actions workflow concluded FAILED on the global silhouette and unapproved golden-snapshot gates (1 match / 23 changed). Audio 404s are expected branch noise and non-blocking; do not add audio or count these as character defects. No snapshots were refreshed or approved.
- Granny remains reference_only; candidate semantic landmarks/polygons are not verified measurements. Exact pixel-derived contour fit is renderer-mask evidence, not proof of anatomical semantics. No proportion calibration or candidate promotion is authorized.


## Review-derived design acceptance requirements — 2026-11-19

Claude's independent review exposed gaps between general construction principles and repeatable visual acceptance. The draft construction standard now adds explicit checks for construction-level roster differentiation, hand/prop physical contact, individual facial identity cues, value separation and shape hierarchy at direct 28×42 game scale, and evidence-based P0–P3 findings. These supplement—not replace—the existing identity, anatomy, clothing, prop, palette and four-direction requirements.

Important distinctions:
- A prop or accessory cannot rescue an otherwise indistinct body construction by color/emblem alone.
- A handheld prop must show a believable anatomical chain and visible grip/support in each relevant view.
- Adjacent major forms must remain separable at game scale; tiny details that collapse into noise must be simplified or removed.
- The shared face system must not become a shared generic face with token pixel edits.
- Gallery/town mismatch between new antialiased vectors and legacy pixel assets is a project-level art-direction decision, not an automatic reason to degrade individual vector craft.
- Revised scorecard weights are provisional and non-gating. No new numeric threshold or automatic pass mark is approved.

The five-character correction group is the first application of these requirements. The standard remains draft pending independent Claude review and owner ratification; the remaining 17 civilians remain on hold.

## Owner-authorized P2 correction pass — 2026-11-20

The owner authorized all four P2 areas from Claude's Run #595 review. Implement face identity cues for Courier, Usher and Cook; improve Usher profile shoe separation at direct 28×42; make Cook's pan handle/hand contact legible at direct game scale; and document Coach/Courier rear distinction with evidence rather than redesigning either torso without cause. Referee is protected from unnecessary edits. Renderer source commit: `2b45201eb762a939547f5c8414ae9f44e5dc0d22`; Run #596 is the pending browser QA. See [identity and proportion cards](qa-artifacts/five-civilian-corrections/IDENTITY-AND-PROPORTION-CARDS.md). No P2 may be called resolved until the actual fresh captures have been inspected. All five remain NOT APPROVED.

## Claude Round #595 review outcome and owner gate — 2026-11-19

Claude's independent review recommends **ready for owner review**, not approval. No P0/P1 findings remain. P2s requiring owner disposition are F1 facial individuality for Courier/Usher/Cook, U1 Usher profile shoe separation, C1 Cook pan/hand readability, and X1 documented Coach/Courier rear-construction rationale. Referee needs no change. P3 notes are optional. The owner must decide whether to require corrections or explicitly accept each P2 before approving any character.

Claude reclassified Coach/Courier rear similarity as acceptable shared body mass with distinct role construction, marginally. Retain the exact pair/direction evidence and written rationale; do not treat IoU as a pass/fail threshold. Coach's straight hem and visible side elbow/hand negative spaces contrast with Courier's A-line coat and arms integrated into the coat; headwear/hair and shoe values also differ.

For future roster work, require purposeful face cues, direct 28×42 inspection on neutral-grey diagnostic and actual town/night backgrounds, roster-level torso-shell variety review, explicit character-relative prop handedness in mirrored profiles, applicable walk-frame inspection, and before/after evidence for each correction. Do not set an arbitrary torso-family cap. The construction standard remains a draft; Granny is a quality benchmark, not a proportion template.

## Quality target

Every civilian should feel like a finished, intentional game character—not a recolored template, a rough placeholder, or a flat icon. Designs should read clearly at the actual in-game size and remain attractive when enlarged for inspection.

Granny Volt is the project's **10/10 visual benchmark** for finish, clarity, character, and consistency. She is a quality reference only. Do not copy her silhouette, outfit, signature props, or palette.

## Required character identity

Each civilian design should have its own combination of:

- **Silhouette:** recognizable body proportions, headwear, clothing shape, posture, and/or carried objects.
- **Face and expression:** deliberate facial construction with visible identity and expression; avoid identical generic faces.
- **Clothing:** role-appropriate clothing with clear construction, layering, seams, collars, cuffs, hems, or other intentional details.
- **Palette:** a deliberate palette that distinguishes the character from the other pilot characters and Granny.
- **Props:** role-specific objects that are legible at native game scale and integrated naturally into the pose.
- **Four-direction design:** front, back, left, and right views must all look intentional. Side and back views cannot be simple mirrored or blank fallbacks if they undermine the character's identity.

Color variation alone does not create a distinct character. A prop that is too small to read in-game does not carry the identity by itself. The whole figure must communicate the role.

## Pilot direction (working concepts, not locked designs)

These are starting concepts to guide exploration. They are not final art specifications; the builder may improve them as long as each character remains distinct and role-readable.

### Runner
- Athletic sprinter identity, communicated through a dynamic airborne stride rather than a static upright pose.
- Coral race singlet with clearly separate split shorts, race bib 07, terry sweatband, close-cropped curls, stopwatch, and technical shoes.
- Keep the running pose legible from front, back, left, and right; shorts and shoe separation must remain readable at native 64×96 scale.

### Coach
- Veteran sideline tactician with a steady, grounded stance; do not reuse Runner's airborne athletic pose.
- Forest-green warm-up jacket with a distinct cream shoulder yoke, stitched pockets and hem band; dark track trousers and pale court shoes.
- Silver-templed hair beneath a low-profile team cap, expressive mature face, gold whistle/lanyard, and a marked clipboard held visibly in the front view.
- Preserve a readable face/profile in both side views and a deliberate rear jacket/yoke/team-mark composition. The clipboard and hands must feel physically connected at native 64×96 scale.

### Usher
- Civic / venue attendant identity.
- Current implementation uses a formal uniform, cap, and clipboard.
- Navy/steel direction with restrained brass accents was the intended distinction from Granny.
- This is the first vector pilot, not an approved final design.

### Cook
- Food-service / chef identity.
- Explore a distinctive chef head shape or toque, kitchen clothing, apron or other strong uniform construction, and a readable cooking/service prop.
- Avoid simply borrowing the Usher's body and changing the colors. Use a warm palette only if it supports a clearly different silhouette and finish.

### Courier
- Delivery / messenger identity.
- Explore a distinctive cap or helmet, cross-body delivery bag, parcel or dispatch prop, and a silhouette that reads differently from both Usher and Cook.
- Give the bag and parcel clear shape and placement at game scale; do not rely on color alone.

## Scale and construction reference

The Granny reference measurement file is `qa/granny-ref.json`. It records the reference renderer's 100×140 native source grid, scale factor 0.28 at a 36-pixel tile reference, outline ink `#171725`, and foot row 136. Its measured body height is 125 source units and total measured height is 139 units. These measurements are a useful alignment and scale reference, not a demand that every civilian have Granny's proportions.

Reference image in the repository: [Granny vs. vector Usher at 4×](../docs/granny_vs_vector_usher_4x.png).

## Approval is a gated decision

A character is approved only when all of the following are true:

1. The design is complete and visually distinct.
2. Front, back, left, and right views have been inspected.
3. Native-size and enlarged views have been inspected.
4. Silhouette, face, palette, clothing, props, foot placement, and overall readability pass internal review.
5. The character is visible and coherent in the game/town context.
6. Claude has independently reviewed the actual rendered character against Granny Volt and recommended approval.
7. Any required corrections have been implemented and rechecked.
8. The project owner has accepted the result.

Until then, keep the tracker status at **NOT APPROVED**, even if code is integrated or automated tests pass.

## Visual review questions

For each character, ask:

- Can I identify the role from the silhouette before inspecting small details?
- Does the character look different from the other pilot characters at thumbnail size?
- Are the face and expression intentional and readable?
- Do clothing layers and materials have believable construction?
- Are the props recognizable, correctly placed, and not fused into the body?
- Are all four directions equally considered?
- Does the design look polished at native game size?
- Does it meet Granny's quality level without looking like Granny?


## Owner profile-anatomy feedback — 2026-11-19

A side-profile civilian should read as a single visible arm, not two arms stacked along the same silhouette. The far arm should be occluded by the torso unless a deliberate pose clearly establishes a separate far-side plane. For prop-holding characters, retain the near arm that carries the defining prop and hide the far arm. Apply this consistently across Runner, Coach and Referee.

Runner's sprint pose must remain energetic, but the legs should read as athletic human legs rather than long trouser-like polygons. Shorts should end above the knees, with exposed lower-leg anatomy and clear shoe separation. Do not rely on animation to make an awkward static sprite look correct: each directional sprite must read clearly on its own.


## Owner follow-up — Coach profile and Runner leg anatomy (2026-11-19)

- Coach's side-profile jacket should carry more volume along the rear/back contour so the torso does not collapse into a skinny edge-on strip. The side-profile whistle and lanyard must angle toward the face/front edge and remain on the character's front in both mirrored directions; keep the near clipboard arm as the single visible arm.
- Runner's stride should use clearly separated shorts/thighs and exposed, tapered lower legs. Avoid long dark ribbon-like shapes that read as trouser legs. Preserve the dynamic running pose and shoe separation.
- Referee received positive owner feedback (“Ref good”); no additional change requested in this pass.


## Civilian Vector Construction Standard — draft companion (2026-11-19)

The [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md) is the detailed implementation companion to this art direction. It adds a silhouette-first eight-stage pipeline, measurable proportion cards, independent prop/anatomy bounds, directional construction requirements, a provisional 100-point rubric, and proposed automated metrics. Granny's 100×140 source grid, 125-unit body height, 38-unit head height, 36-unit shoulder width, row-136 foot baseline, 0.28 scale, and `#171725` ink are recorded as actual measured reference values.

These values are reference geometry, not mandatory proportions for every character. Proposed ratio bands and score thresholds remain provisional until Claude and the owner review calibration against the five-character evidence set. The standard does not supersede the existing approval gates.