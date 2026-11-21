# Sailor, Slicker and Painter — colour and rendering study 01

**Prepared:** 2026-11-21  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Stage:** 7 — colour and rendering design  
**Disposition:** first-pass design proposal; not final art approval or production renderer authorization

## Authorization and immutable inputs

The owner has approved the Run #867 integrated grayscale face checkpoint and reports Claude's independent approval. This study advances the three-character batch into colour/material design only.

- Sailor #12, Slicker #13 and Painter #14 are the only in-scope characters.
- Approved revision-21 silhouette and approved construction details remain immutable.
- Integrated F6 grayscale face geometry is the approved face-study input. Do not reshape faces, headwear or outer contours as part of palette exploration.
- This is a separate design-stage proposal. It does not authorize edits to `npc_sprites.js`, production renderer integration, live town/gallery integration, golden snapshots/provenance, or characters #15–23.
- Granny Volt remains the 10/10 quality benchmark for finish, clarity and craft—not a palette, face, silhouette, material or character template.

## Rendering contract

Develop colour on separate non-production study artwork. Preserve the existing native 64×96 construction and direction mapping. Use a restrained, readable pixel-scale value structure translated into clean vector shapes:

1. **Base material value:** one dominant midtone per large garment/material mass.
2. **Shadow plane:** one controlled darker shape that explains overlap, fold or underside; avoid airbrushed gradients that blur the silhouette.
3. **Light plane:** a small, consistent highlight plane on the light-facing edge or fold.
4. **Edge discipline:** retain crisp silhouette edges and deliberate negative spaces; no decorative outline clutter.
5. **Face hierarchy:** keep eye/brow/nose identity readable; facial marks must not be buried by hair, hood, cap, highlights or shadow.
6. **Prop hierarchy:** rope, rainwear details and brush remain secondary to the character read, while their material and contact cues remain identifiable.
7. **Scale test:** evaluate native 64×96 and independently rendered direct 28×42. Do not use resized native art as a substitute for direct game-scale output.

Avoid glossy plastic, excessive gradients, noisy texture, tiny seams/buttons that collapse at 28×42, and uniform shading recipes across the three characters.

## Character palette proposals

Hex values below are initial swatch candidates for controlled study, not locked production values. Skin and hair tones must be selected to preserve face readability and character-specific contrast; do not infer a single shared complexion or hair treatment across the batch.

### #12 Sailor — deck-line keeper

**Material story:** weathered harbour workwear; sturdy woven deck cloth, aged brass fasteners and natural hemp rope.

| Role | Candidate | Intended use |
|---|---|---|
| Coat base | `#31515B` | Deep muted harbour teal |
| Coat shadow | `#203943` | Collar underside, coat overlap and lower folds |
| Coat light | `#55747A` | Shoulder/cuff planes, restrained edge light |
| Inner shirt | `#C6C5B5` | Small warm neutral neck opening |
| Rope | `#B88C54` | Hemp coil; keep distinct from skin and coat |
| Metal accent | `#A9824E` | Sparse aged-brass closure detail |
| Trouser | `#34404A` | Dark cool neutral, distinct from coat |
| Boot | `#292B2C` | Near-black work footwear |

**Value/identity priority:** the narrow upright coat and raised collar remain the dominant read; the hemp coil is a warm secondary accent. Keep rope loops and supporting hand separable. The face should remain warmer/lighter than the cap and coat opening without becoming a bright focal mask.

### #13 Slicker — rain-slick courier

**Material story:** practical waterproof rain-smock with a soft, matte coated-canvas finish; darker hood interior and restrained reflective piping.

| Role | Candidate | Intended use |
|---|---|---|
| Smock base | `#536B78` | Storm-slate blue shell |
| Smock shadow | `#354B58` | Hood depth, side folds and underarm |
| Smock light | `#82959A` | Broad rain-facing planes, not glossy streaks |
| Hood/interior | `#26343D` | Face-framing dark mass; preserve face opening |
| Lining accent | `#C28A4B` | Small warm ochre lining/closure cue |
| Trouser | `#343B43` | Dark neutral lower garment |
| Boot | `#252A2E` | Waterproof footwear |

**Value/identity priority:** Slicker must not collapse into Sailor's teal work coat. Keep the smock cooler and more blue-slate, with a distinct broad hooded/rain-shell mass. Warm lining is a small locator, not a large competing panel. The hood opening and profile eye/brow marks must remain legible at direct 28×42.

### #14 Painter — sign and mural painter

**Material story:** pigment-marked artisan smock, worn cotton/canvas, dark work trousers and a wooden-handled flat brush.

| Role | Candidate | Intended use |
|---|---|---|
| Smock base | `#A85F3F` | Warm oxide/clay workwear |
| Smock shadow | `#704337` | Fold depth, sleeve/side overlap |
| Smock light | `#D18A5D` | Selective fabric planes |
| Shirt | `#D7C9A9` | Warm pale underlayer |
| Trouser | `#394B61` | Muted indigo/navy contrast |
| Brush handle | `#8B633D` | Natural wood |
| Ferrule | `#9B9A8B` | Dull metal |
| Bristle/head | `#D6C7A6` | Pale bristle mass; avoid white glare |
| Boot | `#34302D` | Dark work footwear |

**Value/identity priority:** Painter owns the warmest garment field in this trio. The smock must remain distinct from generic brown clothing through its oxide/clay hue and asymmetric artisan construction. Keep the brush head, ferrule, handle and gripping hand readable as one connected tool assembly; pigment marks are sparse accents, not noise.

## Batch-level separation

- Sailor: cool harbour teal + natural hemp + brass; narrow vertical deck coat.
- Slicker: blue-slate waterproof shell + dark hood + small ochre lining; broad rain-smock.
- Painter: warm oxide/clay smock + indigo trousers + wood/metal brush; offset artisan construction.

Do not equalize their palettes into one shared saturation, shadow hue or highlight recipe. Keep material logic consistent within each character, not uniform across the batch.

## Required study and review sequence

1. Create separate colour-study variants for each character, preserving the approved grayscale geometry and outer silhouettes.
2. Show front, back, left profile and right profile; include prop-on views and body-only checks where relevant.
3. Include labelled swatch strips and material-role notes beside each character, outside the sprite bounds.
4. Capture native 64×96 and direct 28×42 through the established project path; include enlarged nearest-neighbour diagnostics.
5. Inspect all four directions for palette consistency, face/hand/prop separation, clipping, contrast and value grouping.
6. Compare the three characters side-by-side and against the broader roster to detect colour-family collisions.
7. Prepare an exact-source review package and request owner decision before treating any palette as final.
8. Only after explicit final-art authorization should production renderer integration be considered as a separate stage and separate approval.

## Known carry-forward scrutiny

- Slicker's profile eye/brow cue was the least pronounced at direct 28×42 in Run #867. Colour must improve face-plane separation without relying on colour alone to create identity.
- Sailor's hand-to-rope grip is compact; maintain a clear value boundary between fingers, rope and coat.
- Painter's brush/hand/handle/head cluster is dense at game scale; use value grouping to clarify the contact chain without changing geometry.
- The overall Run #867 Actions workflow remains failed at global audio-resource 404 diagnostics and the protected golden-snapshot gate (1 match / 23 changed). That status must remain separate from focused colour-study checks. Do not refresh or approve snapshots.

## Current status

**Proposed palettes drafted; no colour artwork, automated colour captures, production code, or final palette approval has yet been completed.** Next implementation action is to create the three isolated four-direction colour-study variants against the approved grayscale inputs, then run exact-source QA and inspect actual captures.
