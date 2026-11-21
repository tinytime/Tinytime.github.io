# Batch 5 — identity and construction preflight 01

**Welder #15 · Kid #16 · Kid 2 #17**  
**Project:** Vapor City · **Branch:** `npc-granny-baseline-overhaul`  
**Design status:** proposal only — owner silhouette/construction decision required  
**Reference HEAD at start:** `5bb45c73fc807ccf03e7bb7cba07b13a6d4ea97c`

This batch is explicitly released by the project owner. Work is limited to identity, silhouette and construction design. No production renderer, palette rendering, town/gallery integration, golden snapshot or provenance changes are included.

## Batch-level design thesis

The three silhouettes use different posture logic and garment masses rather than a shared civilian mannequin:

- **Welder:** upright, asymmetrically loaded protective tradesperson; narrow torso under a split leather apron, raised hinged visor, and a back-mounted gas cylinder. The torch/hose relationship is part of the pose, not a floating accessory.
- **Kid:** forward-sprung, open and kinetic; cropped zip hoodie with a deep, forward-pointed hood opening, uneven sleeves and a paper glider extended ahead of the body.
- **Kid 2:** compact, inward and observant; rounded pom beanie, high wrapped scarf, longer split-hem coat and a small book held close with both hands.

These are proposals. No family assignment is promoted from UNASSIGNED.

### Companion design sheets
- [Four-view black silhouette exploration 01](WELDER-KID-KID2-SILHOUETTE-EXPLORATION-01.svg) — front, back, left and right.
- [Face/head construction exploration 01](WELDER-KID-KID2-FACE-HEAD-EXPLORATION-01.svg) — front and profile geometry for each character.

---

## #15 Welder — identity and construction card

### Identity
A patient, meticulous repair specialist who pauses to inspect a join before committing the torch. Their body language is controlled rather than broad or swaggering. The design is intentionally lean and vertically composed, avoiding Fisher's broad braced oilskin mass and Painter's reaching artisan-smock pose.

### Silhouette / body construction
- Narrow shoulder-to-waist line with a slight asymmetrical shoulder shield on the torch side.
- Upright stance with feet planted at different angles; one elbow bends toward the work while the torch arm reaches slightly forward.
- Short split leather apron over fitted work trousers; the apron does not become a broad coat or a long continuous skirt.
- Protective glove and gauntlet create a clear hand-to-tool contact silhouette.
- Welding visor is **raised**, hinged above the forehead. The exposed face is essential to character recognition and personality; a lowered opaque mask would erase the face study and make the character read as generic equipment.
- Cylinder sits on a compact rear harness, secured by two straps and a waist bracket. A hose is routed from regulator down the near hip and clipped along the body before reaching the torch grip.

### Head and face construction
- Head read: angular raised visor plate with a single visible temple hinge; face remains exposed.
- Face cue 1: a broad, nearly level brow shelf with a short downward notch at the outer end.
- Face cue 2: a longer straight-to-hooked nose bridge and a squared lower cheek/jaw turn.
- Expression: focused, slightly narrowed eyes; mouth closed, no grin.
- Closest roster face comparison candidates: **Guard** and **Fisher**. Guard's sleepy eye and flat brow create a heavier, more relaxed mask; Welder's brow is more compressed and deliberate. Fisher's angry brow/frown pairing is more severe; Welder keeps a level mouth and longer nose bridge. These are comparison hypotheses from current renderer face construction, not completed matched-crop findings. Validate with same-scale native roster face crops. Compare geometry only, excluding skin, hair, helmet and palette.

### Clothing / material logic
- Main garment: short, split-front leather apron with a bib that narrows into a waist strap; the lower panels separate around the legs.
- Underlayer: close-fitting work shirt with one reinforced shoulder and fitted trousers.
- Secondary protection: one heavy glove and one forearm gauntlet; the near-side glove must not merge into the torch barrel.
- Cylinder straps cross the upper back and terminate at a waist bracket; do not draw unsupported diagonal bands.
- No decorative badges, sparks or colour coding are required for identity.

### Prop, contact and handedness plan
- **Torch:** character-right hand. Front view therefore places the torch on viewer-left; rear view places that hand on viewer-right. It is visible in the **left profile** (character-right side is near when facing left) and hidden in the right profile, where it is the far-side hand.
- **Cylinder:** fixed to the back harness, centered just off the spine toward character-left to avoid a perfect mirror-balanced pack. Visible in back and both profiles as the body turn permits; not drawn as a second handheld object.
- **Hose:** regulator outlet to a short clipped route along character-right hip, then a controlled curve into the torch grip. No free loop crosses the leg gap or floats away from the hand.
- **Near/far anatomy:** in profile, show one near arm and suppress the far arm unless a clear separate plane is necessary. The cylinder remains behind the torso silhouette and must not replace the far arm as an ambiguous limb.

### Proposed construction family — UNASSIGNED
**Offset Leather Apron / Rear Gas-Rig Shell.** The descriptor captures the narrow vertical body, split apron and mechanically supported rear equipment. It is not a reusable template and must be checked against Fisher, Painter, Sailor and Slicker in the full roster comparison.

### Exactly three must-survive identity features
1. **Head read at direct 28×42:** raised angular visor with its temple hinge, leaving the focused face exposed.
2. Split-front leather apron over a narrow upright torso.
3. Rear-mounted cylinder with a visible, body-clipped hose leading to the torch hand.

### Details allowed to disappear at game scale
Regulator dial, tiny apron rivets, glove seam, torch nozzle grooves, hose clip and individual harness stitching.

### Unresolved questions / risks
- Does the raised visor remain legible as a welding mask rather than a generic forehead plate at 28×42?
- Does the cylinder read as a supported tank rather than a detached backpack in both profiles?
- Is the hose/torch contact still unambiguous when the near arm is compressed?
- Does the lean shell remain distinct from the existing Trades roster after direct matched-scale comparison?

---

## #16 Kid — identity and construction card

### Identity
A curious, restless kid who is always halfway into the next idea. The pose is open and forward-moving: shoulders lead, one heel lifts, and the paper glider is held out as if testing its flight. This is not a small adult tradesperson and not a recoloured version of Kid 2.

### Silhouette / body construction
- Forward-sprung torso with a visible diagonal from hood through shoulder to the extended glider arm.
- Deep hood opening frames the head; the crown has a forward-pointed fold and uneven side fringe, not a simple round hood bubble.
- Cropped zip hoodie with a high asymmetric collar and sleeves that bunch differently at each wrist.
- Shorter, softer trouser construction with an open stride and lifted rear heel; no numeric child/adult proportion targets.
- One arm reaches forward; the other bends back toward the ribs, giving the pose a clear directional counterbalance.
- The paper glider is a single folded shape with a strong nose and two wings; it must remain attached to the hand rather than reading as a floating paper accessory.

### Head and face construction
- Head read: deep hood opening plus an asymmetric fringe that breaks the forehead contour; the head silhouette must remain identifiable if the paper plane disappears.
- Face cue 1: broad cheek arc with a rounded lower jaw, wider than the chin.
- Face cue 2: large, round-set eyes with shallow arched brows and a small open triangular mouth.
- Expression: absorbed curiosity, eyes lifted toward the glider rather than a generic smile.
- Closest roster face comparison candidates: **Dancer** and **Vendor**. Dancer's tall eyes and worried brow produce a more anxious expression; Kid uses rounder eye geometry, fuller cheeks and an open, curious mouth. Vendor's tall eyes and arched brow sit in a more mature, narrow-cheek face with a grin; Kid's lower-face mass is rounder and the mouth is smaller/open rather than a broad grin. These are comparison hypotheses from current renderer face construction, not completed matched-crop findings. Validate with same-scale native roster face crops. Compare geometry only, excluding headwear, hair and palette.

### Clothing / material logic
- Cropped zip hoodie with an integrated hood, raised collar and visibly different sleeve volumes.
- Soft, lightly gathered trousers with distinct knee and ankle breaks.
- Plain low-profile shoes; no heavy boot or workwear cues.
- No backpack: the forward gesture and glider already supply the interaction; a second prop would clutter the youth silhouette.

### Prop, contact and handedness plan
- **Paper glider:** character-right hand. Front view places it on viewer-left; rear view on viewer-right. It is visible in the left profile and hidden in the right profile because the carrying hand is far-side in that view.
- **Grip:** thumb and curled fingers close around the central folded keel; the wrist aligns with the forearm. Keep the wing plane above the fist, not behind the head.
- **Near/far anatomy:** left profile exposes character-right arm as the near arm; right profile exposes character-left near arm while the glider hand is far and therefore hidden. The far arm remains behind the torso.
- No additional prop or loose accessory is proposed.

### Proposed construction family — UNASSIGNED
**Forward-Sprung Hooded Zip-Shell / Open-Stride Youth Build.** The forward lean, cropped jacket and lifted heel differ from Kid 2's close-held, upright scarf-coat construction. It is a descriptive proposal, not a reusable youth template.

### Exactly three must-survive identity features
1. **Head read at direct 28×42:** deep asymmetric hood opening with the forward-pointed crown fold and visible fringe break.
2. Open forward-sprung stance with one lifted heel and a reaching arm.
3. Single paper glider held in the extended character-right hand.

### Details allowed to disappear at game scale
Zipper pull, cuff ribbing, tiny fold creases, glider fold seam and individual shoelace marks.

### Unresolved questions / risks
- Does the glider remain hand-connected in front and left profile without masking the forearm?
- Does the hood/fringe head read remain distinctive when reduced directly to 28×42?
- Is the lifted heel still a deliberate stride rather than a detached foot shape?
- Does the face remain youthfully curious without drifting toward Dancer's worried expression?

---

## #17 Kid 2 — identity and construction card

### Identity
A thoughtful, reserved kid who carries a small book close and watches before joining in. The body language is deliberately inward: shoulders rounded, elbows tucked, feet closer and slightly turned in. This contrasts with Kid's reaching, open stride.

### Silhouette / body construction
- Upright compact stance with a gently rounded shoulder line and close-set feet; no forward reach.
- Rounded pom beanie sits low over the crown, but the identity does not depend on the pom alone.
- High scarf wrap creates a broad, soft neck frame and overlaps the top of a longer split-hem coat.
- Coat has a clear center opening, separate front panels and a back vent; it is not an apron, smock or long formal uniform.
- Both elbows angle inward to support a small open book against the upper chest.
- The hands meet the book's lower outer corners; the spine sits between them. The prop must read as held, not as a floating rectangle.

### Head and face construction
- Head read: low rounded beanie with a compact pom, framed by a high scarf collar that makes a distinct head/neck silhouette.
- Face cue 1: narrower, tapered jaw with a small chin point and fuller upper cheek.
- Face cue 2: close-set eyes under short level brows, with a slight one-sided mouth lift.
- Expression: observant, quietly amused; not sleepy, not broadly cheerful.
- Closest roster face comparison candidates: **Clinic** and **Referee**. Clinic's close-set eyes sit under worried brows with a small neutral mouth; Kid 2 keeps the close spacing but uses level brows and an asymmetric smirk. Referee's close-set eyes and arched brows create a more alert, surprised read; Kid 2's jaw tapers more sharply and the mouth is a sideways lift rather than an open shape. These are comparison hypotheses from current renderer face construction, not completed matched-crop findings. Validate with same-scale native roster face crops. Compare geometry only, excluding hair, headwear and palette.

### Clothing / material logic
- Soft, longer cardigan-coat with separate front panels and a split hem.
- Scarf is a wrapped garment with a visible overlap and one short tucked end; avoid a long loose tail that merges with the book or coat.
- Trousers are straight and slightly gathered at the shoe; feet remain close without fusing.
- No backpack or second accessory; the book is the one intentional interaction.

### Prop, contact and handedness plan
- **Book:** supported by both hands at the upper chest. Front view shows both hands; back view hides the book behind the torso. In either profile, show only the near-side hand and the book's fore-edge, with the far hand hidden behind the cover/torso.
- **Contact:** left hand supports the lower viewer-right corner in front view; right hand supports the lower viewer-left corner. The spine is centered, with the thumbs on the front cover and fingers wrapping behind.
- **Near/far anatomy:** both arms are visible in front because they form a deliberate two-hand hold. In profile, the arm on the side facing the viewer is the only clearly drawn arm.
- Keep book corners inside the chest/arm envelope; do not let the book float beyond the hands.

### Proposed construction family — UNASSIGNED
**Wrapped Scarf-Coat / Close-Held Book Shell.** The high scarf frame, long split coat and tucked two-hand interaction are unlike Kid's cropped hooded jacket and open stride. It must also be compared against Usher's long formal coat and Hacker's folded-in stance to avoid accidental convergence.

### Exactly three must-survive identity features
1. **Head read at direct 28×42:** low rounded pom beanie framed by the high scarf collar, not the pom alone.
2. Inward shoulder/elbow posture with a close two-hand book hold.
3. Longer split-hem coat over close-set, slightly inward feet.

### Details allowed to disappear at game scale
Book page lines, scarf knit ribs, tiny coat buttons, pom thread, seam topstitching and small cuff folds.

### Unresolved questions / risks
- Does the book remain clearly held by both hands in front and by the near hand in profiles?
- Does the scarf collar separate from the jaw rather than swallowing the lower face?
- Does the long coat remain distinct from Usher's formal uniform coat?
- Do the two youth faces remain individually recognizable when headwear and palette are excluded?

---

## Cross-character roster comparison

The following comparisons are design hypotheses from the current roster register and face-construction source, not a completed matched-scale visual audit. The closest-face candidates named above must still be shown as native 64×96 matched crops and reviewed without palette/headwear influence.

| Existing roster contrast | Welder #15 | Kid #16 | Kid 2 #17 |
|---|---|---|---|
| Closest overall construction risks | Fisher, Painter, Sailor | Dancer, Mouse, Courier | Usher, Hacker, Kid |
| Main body distinction | Narrow vertical apron + rear gas rig; no broad oilskin or reaching smock | Forward lean + cropped asymmetric hoodie + open stride | Upright inward posture + long split coat + two-hand book |
| Head distinction | Exposed face beneath raised hinged visor | Deep hood opening with pointed fold and asymmetric fringe | Low pom beanie framed by high scarf collar |
| Pose distinction | Controlled work stance with torch reach | Open, kinetic, glider-leading reach | Closed, balanced, close-held reading pose |

### Proposed family descriptors and rationale
- Welder — Offset Leather Apron / Rear Gas-Rig Shell: equipment is harness-supported and the split apron is a narrow vertical garment.
- Kid — Forward-Sprung Hooded Zip-Shell / Open-Stride Youth Build: the cropped hoodie and reaching stride define the silhouette.
- Kid 2 — Wrapped Scarf-Coat / Close-Held Book Shell: scarf frame, coat length and tucked prop posture define the silhouette.

**All three actual vector-family assignments remain UNASSIGNED pending owner approval.**

## Design-stage limits and next review

- This is a first-pass identity/construction proposal. The silhouette SVG is a four-view black-only exploration, not production renderer geometry.
- Face proposals are geometric directions for later integrated grayscale studies. No production facial renderer changes are included.
- Exact native 64×96 and independently rendered direct 28×42 captures, full roster matched silhouette crops, closest-face matched crops, anatomy/prop connectivity checks and visual review remain required before owner approval.
- No palette, production renderer, gallery/town integration, golden snapshot or provenance work is authorized by this package.
- The next design review should challenge the three concepts together, with special attention to Welder's cylinder/hose support, Kid's glider grip and Kid 2's two-hand book contact.
