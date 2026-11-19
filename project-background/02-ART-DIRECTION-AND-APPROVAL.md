# Art Direction and Approval Standard

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
