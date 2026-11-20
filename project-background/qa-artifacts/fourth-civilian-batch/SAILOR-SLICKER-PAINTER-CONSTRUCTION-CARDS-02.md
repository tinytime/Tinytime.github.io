# Sailor, Slicker and Painter — identity and construction cards 02

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Stage:** post-silhouette identity and construction design  
**Disposition:** submitted for internal QA and owner review; not final character-art approval

## Approved baseline and scope

The project owner approved the revision 21 silhouettes for all three characters and authorized this next design stage. The approved silhouette source is:

- **Artwork source commit:** `be1c0c012894ccae23b4cbce2ad06e523fb460c5`
- **Revision 21 SVG blob:** `02f7ffb3854a8bacdaf00ca6198ae411c3122602`
- **Source file:** [SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg)
- **Exact-source QA:** [Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854)
- **Approval record:** [owner silhouette approval and next-stage authorization](../../README.md)

The current branch also contains a later, separate revision-22 exploration commit (`f39f450a361668d60f3eb77f0e93ab804f848070`). Revision 22 is not the approved baseline and is not used as authority for these cards. It remains a proposal only. These cards preserve revision 21's body contours, pose class, headwear/garment outline, prop side, and near/far visibility. No material silhouette edits are proposed here.

**Approval boundary:** the owner approved these construction families and the specified anatomy, clothing and prop integration direction on 2026-11-20. Face geometry, final palette, finished art and renderer implementation remain unapproved. It does not approve face geometry, palette, finished art, renderer implementation or integration. Palette is expressed only as verbal direction and material/value roles, not final swatches.

## Shared construction and QA contract

- Civilian canvas and evidence convention: native 64×96 plus independently captured direct in-game 28×42; enlarged nearest-neighbour crops are diagnostic only.
- Build in order: identity and silhouette preservation → connected anatomy → garment volume/layers → prop/contact chain → face construction → material/value direction → four-direction QA.
- Character-relative handedness is authoritative. Front viewer-right is character-left; rear viewer-left is character-left. Front viewer-left is character-right; rear viewer-right is character-right.
- In profile, show the near-side arm/hand and hide the far-side arm/hand unless a clearly separated plane is intentionally required. Far-side carried props are hidden.
- No semantic ratio calibration or arbitrary numeric art-quality thresholds. IoU is a human-review trigger only.
- Every card has exactly three must-survive identity items. The direct-28×42 head-read cue is included within those three. Other details may simplify or disappear at direct scale.
- Any proposed change that materially alters the approved revision-21 outer contour must be isolated as a separate owner decision before implementation.

---

# 1. Sailor #12 — deck-line keeper

## Identity and personality

A capable, quietly upbeat harbour worker who knows ropes, knots and changing water by touch. Sailor is observant and economical rather than swaggering: alert eyes, a slight forward readiness in the shoulders, and hands that look practiced. The character should feel like someone who can secure a line in rough weather without making a show of it.

**Emotional read:** steady, attentive, reassuring; a small confident half-smile rather than a broad grin.

**Silhouette identity:** narrow upright deck-worker build, compact cap, raised collar and long vertical coat rhythm. The coiled line is a secondary silhouette punctuation, not a substitute for a distinctive body.

## Construction-family assignment

**Owner-approved construction family: Narrow Deck-Coat / Vertical Utility Shell (new roster family tag).**

This family is defined by a close, vertically organized outer coat with a raised protective collar, restrained shoulder volume, a clear front opening/closure line and a relatively straight lower garment edge. It is not the broad rain-smock, apron, or boxy workshop jacket family. The narrow body mass and disciplined vertical seams support Sailor's rope-handling role and preserve separation from broad-bodied trades characters.

This is a descriptive family assignment for the roster register, not a shared template. Do not reuse Sailor's exact collar, coat edge, stance or rope arrangement for another civilian.

## Anatomy, proportions and pose

- **Build:** lean, compact and upright; modest shoulder breadth, narrow waist/hip transition, long clean leg separation. Do not impose numeric body ratios.
- **Pose:** quiet working stance with a slight forward readiness. Keep the head balanced over the torso; no exaggerated heroic chest or wide-legged action stance.
- **Torso:** coat volume sits close to the body. Preserve the approved vertical torso rhythm and the negative-space breaks between arm, coat and legs.
- **Arms:** establish the rope-carrying character-left arm as a connected shoulder → upper arm → elbow → forearm → wrist → palm/fingers chain. The support hand must read as a hand, not a black knot merged into the coil. The other arm remains anatomically plausible and subordinate.
- **Legs/feet:** separate trouser legs and shoes; feet planted with clear contact and no prop-induced foot/baseline changes.
- **Head/neck:** compact head under the approved cap, raised coat collar framing but not swallowing the jaw/neck transition.

## Face and head construction

Use the existing neutral face-geometry sheet only as a proposal, not as approved facial art. Preserve the compact cap/head mass from revision 21.

Purposeful geometric cues:
1. A strong, slightly shelf-like brow with a focused, level eye line.
2. A longer, gently hooked profile nose and a defined chin-to-neck break; keep the cheek plane lean rather than broad.

The existing matched-face study names **Clinic** and **Guard** as the closest geometric comparison prompts. Distinguish Sailor from Clinic through a firmer brow shelf and less elongated lower-face transition; distinguish Sailor from Guard through a narrower cheek/jaw and less squared lower-face plane. These are hypotheses to confirm against matched native 64×96 crops before face geometry is finalized. Do not borrow their hairlines, facial hair, headwear or palettes.

Back view: cap crown, lower band and nape/hair edge must be deliberately constructed; do not use a blank head fallback.

## Clothing construction

- **Primary garment:** close-cut deck coat with raised collar. Preserve revision-21 coat length and outer contour.
- **Layering:** a simple inner shirt/neck opening beneath the coat; the collar overlaps the shirt naturally and frames the neck without closing the face.
- **Front:** readable central closure/placket; restrained seam or fastening marks that follow the coat plane. Avoid a dense row of tiny buttons.
- **Back:** shoulder yoke or upper-back seam may clarify tailoring, but must follow the approved back contour and remain secondary.
- **Profiles:** collar thickness and coat front/back overlap must agree with the front/rear construction. No false second arm or white gap that severs the coat/arm outline.
- **Sleeves/cuffs:** fitted sleeves with a small cuff transition at the wrist; the rope hand remains exposed enough to show grip.
- **Material:** sturdy woven deck cloth, with a slightly structured collar and softened sleeve folds. No final colour selection in this stage.

## Signature prop — mooring-line coil

**Prop:** compact hand-held coil of working rope, with a visible loop/turn and short tail. It is not an anchor, fishing net, basket or generic circular accessory.

**Handedness and visibility:**

| View | Carry side | Required visibility |
|---|---|---|
| Front | Character-left = viewer-right | Coil held at the character's left side |
| Rear | Character-left = viewer-left | Same anatomical hand; viewer side reverses |
| Right profile | Character-left = visible near side | Coil and grasp visible |
| Left profile | Character-left is far side | Coil hidden; no mirrored duplicate |

**Contact chain:** shoulder → upper arm → bent elbow → forearm → wrist → palm → curled fingers → rope loop. The rope should be pinched/retained by the palm and fingers, with the coil resting against the hand/forearm plane. Keep the rope loop itself connected and its tail visually subordinate. The coil may overlap the hand only where the grip explains the overlap; do not let a black coil erase the thumb/finger silhouette.

**Occlusion:** hand sits in front of the rope at the grip; the coil sits in front of the coat only at the carried side. Far arm/prop is hidden in the opposite profile. Do not add a second rope coil or a shoulder-slung line without owner approval.

## Three must-survive identity items

1. Narrow upright deck-coat construction with raised collar and compact cap (direct-scale head cue: the cap/collar silhouette).
2. Character-left rope coil with a legible loop and a physically readable supporting hand.
3. Lean, alert working stance with a focused brow/longer nose profile; the face remains a native-scale identity cue.

**Allowed to simplify/disappear:** tiny coat fasteners, fine rope strands, secondary seam stitches, subtle mouth line and small cap texture. The coil's loop, hand contact, cap, collar and body contour must not disappear.

## QA risks and targeted inspection

- Sailor's hand-to-rope grasp is already a known scrutiny point: inspect front and right-profile at native 64×96, direct 28×42 and enlarged detail.
- Confirm coil is character-left in front/rear and visible only on right/near profile; left/far profile must contain no stray coil pixels.
- Check thumb/finger separation, palm-to-loop overlap and coil-tail attachment; no detached loop, floating tail or false hand/rope fusion.
- Confirm coat/collar does not swallow neck or fuse forearm to torso.
- Check both profile views for near/far arm stacking, crop-edge contact and accidental negative-space closure.
- Compare face geometry to Clinic and Guard using matched 64×96 front/profile crops; document concrete differences.
- Preserve all revision-21 body-only pixels when adding or refining prop details unless an explicitly approved correction requires otherwise.

---

# 2. Slicker #13 — the weather watcher

## Identity and personality

A thoughtful, practical city resident who is comfortable in drizzle and wind. Slicker notices small changes in the weather and quietly helps others prepare. The personality is reserved but warm, with a patient, slightly inward expression. Avoid making the character look timid, gloomy or comic.

**Emotional read:** calm, observant, self-contained; a small attentive expression.

**Silhouette identity:** broad pear-shaped rain smock, forward-ready stance, face-side-open integrated hood, and a deliberately shaped lower shell. Weather protection is built into the clothing; Slicker does not carry an umbrella.

## Construction-family assignment

**Owner-approved construction family: Integrated Hooded Rain-Smock Shell (new roster family tag).**

This family is defined by one continuous weather shell with an integrated hood, face opening, storm closure and shaped hem/yoke construction. It differs from the narrow vertical deck coat, waist-tied apron/smock silhouettes and rigid workshop jackets. The hood and shell must read as one garment system, not a separate hat pasted onto a generic torso.

This is a new family tag for Slicker, not a reusable silhouette template. Future rainwear characters must differ in hood geometry, shell volume, hem, posture and construction details.

## Anatomy, proportions and pose

- **Build:** sturdy, softly rounded pear mass; fuller through the torso/hip garment volume with a comparatively compact head/neck opening. Do not translate the garment volume into exaggerated anatomical body mass.
- **Pose:** relaxed, slightly forward-ready stance suited to wind and wet pavement. Preserve revision-21 lean and leg placement; no action pose or umbrella arm.
- **Torso:** anatomy remains connected beneath the smock. The shell is a clothing layer around the body, not an opaque blob that erases shoulder/arm logic.
- **Arms:** maintain the approved arm placement and negative-space windows. The near arm is the visible profile arm; the far arm remains behind the torso unless the existing approved view clearly establishes a separate plane.
- **Legs/feet:** legs emerge cleanly below the hem with distinct shoes and grounded contact. The hem must not fuse the legs or hide all foot separation.
- **Head/neck:** hood opening frames the face-side and leaves a clear face aperture. Keep a readable chin/neck transition; hood must not become a featureless helmet.

## Face and head construction

Use the existing grayscale face study as a proposal only. The hood is the headwear/outer-frame identity; face geometry remains independently designed.

Purposeful geometric cues:
1. Close-set eyes beneath a nearly level, compact brow line.
2. A tucked chin and compressed, softly closed mouth, with a restrained cheek plane.

The exact two closest roster faces are **not yet established by a recorded matched-crop comparison**. QA must compare Slicker's native 64×96 front and both profiles against likely nearby face candidates (start with Fisher and Courier, then select the two genuinely closest by geometry). Exclude hood/headwear, hair colour and palette from the face comparison. Record actual comparators and concrete differences before finalizing the face.

Back view: hood crown, rear hood seam and nape/neck transition must be deliberate. The back of the hood should have its own construction rather than simply mirroring the front opening.

## Clothing construction

- **Primary garment:** single-piece rain smock with an integrated face-side-open hood. Preserve the approved pear shell, shoulder/hood outline and hem contour.
- **Hood:** hood is sewn into the neckline/shoulder shell. The opening follows the face and leaves a clear visible cheek/jaw plane. A short brow/side flap may shield the face, but must not obscure the eye or create a false second brim.
- **Front closure:** retain the shortened storm closure from the approved baseline. It should be a functional overlapping storm flap, not a decorative stripe or a long zipper that changes the silhouette.
- **Back:** rear yoke and lower hem seam define panel construction and weather shedding. Keep the two seams aligned to the garment volume and subordinate to the outer contour.
- **Profiles:** show hood depth and shell thickness consistently. The hood should connect to the back neck; no floating hood rim or disconnected rear flap.
- **Sleeves/cuffs:** sleeves are integrated into the shell; define cuffs as gathered/adjustable weather closures. Do not add bulky gauntlets that change the approved arm silhouette.
- **Pockets:** optional low-profile welt or flap pockets only if they clarify garment use without introducing a new protruding silhouette or an umbrella-like shape.
- **Material:** matte coated canvas or waxed raincloth, with controlled folds and a heavier hem. No final colour or rendered wet effects.

## Props and accessories

**No handheld signature prop.** The hooded shell itself is the role-defining construction. Do not add an umbrella, walking stick, pouch, basket or unrelated weather accessory. A small closure tab or hood adjuster is garment hardware, not a separate prop.

**Directional garment visibility:**

| View | Required construction |
|---|---|
| Front | Face-side-open hood, short storm closure, sleeve/shell separation |
| Rear | Hood crown, rear yoke, shaped lower hem seam |
| Left profile | Near-side hood depth, shell pitch and near arm; far arm hidden |
| Right profile | Opposite shell plane and hood back/face opening logic; no mirrored false flap |

Hand contact table: not applicable to a handheld prop. QA must instead inspect sleeve-to-hand continuity and confirm both hands remain anatomically connected and visible/occluded consistently with the approved pose.

## Three must-survive identity items

1. Integrated, face-side-open hood connected to the rain shell (direct-scale head cue: the open hood frame).
2. Broad pear-shaped rain smock with its forward-ready posture and shaped hem.
3. Front storm closure plus rear yoke/hem construction that makes the garment read as a functional rain shell.

**Allowed to simplify/disappear:** tiny closure stitching, subtle hood-adjuster hardware, fine fabric creases, small pocket welts and minor hem topstitching. Hood opening, pear shell, storm flap, rear seam logic and leg separation must remain.

## QA risks and targeted inspection

- Confirm no umbrella or unrelated handheld prop has appeared in any direction.
- Check hood-to-neck and hood-to-back continuity, face aperture, brow/cheek clearance and rear hood seam.
- Verify front closure does not read as a dangling prop or split the torso silhouette.
- Inspect the rear yoke and lower seam for accidental line cuts or a false floating hem.
- Compare all four views for shell-volume consistency; the pear mass must not collapse into a generic apron or balloon.
- Check both profiles for far-arm ghosts, stacked arms and fused sleeve/torso edges.
- Verify the hem leaves clear leg and shoe separation at direct 28×42.
- Complete a matched-scale face comparison before choosing the two nearest roster comparators.

---

# 3. Painter #14 — the patient sign-painter

## Identity and personality

A focused craftsperson who paints shop signs, wayfinding marks and small civic murals. Painter is patient, exacting and quietly expressive; the character studies a surface before making a confident stroke. Avoid a generic “artist with random tools” look or a flamboyant beret-and-palette stereotype.

**Emotional read:** concentrated, curious, quietly proud of careful work.

**Silhouette identity:** open reaching pose, cuffed knit beanie, offset work smock and a compact flat brush carried on character-right. The brush should feel like a practical sign-painting tool, not a broom, paddle or broad house-painting roller.

## Construction-family assignment

**Owner-approved construction family: Offset Artisan Smock / Reaching-Arm Shell (new roster family tag).**

This family is defined by a short, workmanlike smock with an offset front/side construction, paired shaping darts and a deliberately extended working arm. It is not a full apron, cook's chef shell, broad rain smock or rigid trades coat. The asymmetrical arm/brush relationship is a pose-and-garment system rather than a generic tunic with an accessory.

This family tag is unique to Painter's design proposal. Do not turn the reach pose or brush silhouette into a shared generic artist template.

## Anatomy, proportions and pose

- **Build:** compact, balanced torso with a practical working reach; moderate shoulder width and a clear waist-to-hip transition beneath the smock. No numeric ratio targets.
- **Pose:** open reaching pose already established by revision 21. Preserve the direction and extent of the working arm; do not pull the arm inward or swing the brush to the opposite hand.
- **Torso:** smock sits over the torso with paired side darts shaping the fabric. Darts describe cloth tension and must not cut through body silhouette or create false gaps.
- **Arms:** character-right is the working/brush arm. Keep a continuous shoulder → upper arm → elbow → forearm → wrist → palm/fingers chain. The support/relaxed arm remains separate from the torso where the approved negative space shows it.
- **Legs/feet:** keep the lower body grounded and distinct under the smock; avoid brush/hand overlap with thigh or foot. Feet retain clear contact.
- **Head/neck:** cuffed knit beanie sits above the forehead and leaves the brow/face unobscured. Preserve the head scale and neck connection.

## Face and head construction

Use the neutral grayscale face study as a starting proposal only; no final face is approved.

Purposeful geometric cues:
1. A pronounced lifted/asymmetric brow break that gives Painter an alert, questioning look.
2. Squarer cheek/jaw planes and a shorter, blunter profile nose than Sailor's hooked profile.

The existing matched-face study names **Cook** and **Busker** as the closest geometric comparison prompts. Distinguish Painter from Cook with the lifted brow and less rounded midface; distinguish Painter from Busker with a squarer lower-face plane and a more restrained, concentrated mouth. Confirm both against matched native 64×96 front/profile crops. Do not borrow their hairlines, facial hair, headwear or palettes.

Back view: knit cap cuff, crown shaping and nape/hair transition should be designed, not left blank.

## Clothing construction

- **Primary garment:** short offset artisan's smock over a simple work shirt. Preserve revision-21 outer contour and reaching pose.
- **Front:** retain the paired side darts as cloth-shaping seams. Keep the opening/overlap offset rather than adding a centered apron bib.
- **Back:** continue the smock's shoulder/side construction around the body; seams should explain the front offset and not appear as arbitrary decorative lines.
- **Profiles:** show front/back overlap thickness and how the smock clears the extended working arm. Do not let the brush handle or forearm fuse with the garment edge.
- **Sleeves/cuffs:** practical rolled or narrow cuff treatment, with a visible wrist transition at the working hand. The cuff must not resemble a detached bracelet.
- **Headwear:** soft knit beanie with a distinct folded cuff; the cuff is the direct-scale head cue. Avoid a large pom-pom or beret that changes the silhouette.
- **Material:** midweight cotton/canvas smock with softer shirt fabric beneath; the knit cap should have a different surface treatment. No final colour rendering.

## Signature prop — compact flat sign-painter's brush

**Prop:** short-handled flat brush with a distinct ferrule and compact scalloped/wedge bristle head. Preserve the approved brush identity and character-right carry. It should read as a flat brush at 28×42, not a roller, palette knife or paddle.

**Handedness and visibility:**

| View | Carry side | Required visibility |
|---|---|---|
| Front | Character-right = viewer-left | Brush held at character's right side |
| Rear | Character-right = viewer-right | Same anatomical hand; viewer side reverses |
| Left profile | Character-right = visible near side | Brush and grip visible |
| Right profile | Character-right is far side | Brush hidden; no mirrored duplicate |

**Contact chain:** character-right shoulder → upper arm → elbow → forearm → wrist → palm → curled fingers → handle. The palm and fingers wrap the handle; handle enters the grip and continues to the ferrule, then the bristle fan. Keep a visible distinction between hand mass, handle and ferrule. The ferrule must visibly join the bristle head; no floating wedge or detached bristle fan.

**Grip/orientation:** compact working grip with the handle angled naturally from the wrist toward the bristle head. The brush head is flat and slightly flared/scalloped; bristles are a single connected fan with only restrained internal grooves. Do not create individual hairline bristles that fragment at direct scale.

**Occlusion:** fingers overlap the handle; handle overlaps the smock only where the working arm is in front. The brush remains subordinate to the hand/arm rather than becoming a large black shape that hides the wrist.

## Three must-survive identity items

1. Cuffed knit beanie framing a focused, lifted brow (direct-scale head cue: the beanie cuff/head profile).
2. Offset artisan's smock with paired shaping darts and open reaching pose.
3. Character-right compact flat brush with a readable hand → handle → ferrule → bristle contact chain.

**Allowed to simplify/disappear:** tiny knit stitches, fine smock topstitching, small ferrule rivets, individual bristle marks and subtle mouth details. The brush's flat head/ferrule/handle, hand contact, beanie cuff and smock's offset construction must remain.

## QA risks and targeted inspection

- Inspect the brush/hand/handle/ferrule/bristle assembly at native 64×96, direct 28×42 and enlarged crop. The direct-scale cluster is known to be dense.
- Confirm character-right carry: front viewer-left, rear viewer-right, visible left/near profile only; right/far profile has no brush.
- Verify left-profile handle-to-bristle contact and front ferrule clearance from body-only pixels.
- Confirm fingers visibly wrap/support the handle; mere component connectivity is not enough to establish a believable grip.
- Check the extended arm remains connected through shoulder/elbow/wrist and does not fuse into the smock or torso.
- Inspect paired darts as garment seams, not white cuts through anatomy or negative-space openings.
- Compare face geometry against Cook and Busker at matched native scale.
- Inspect beanie cuff and head silhouette in all views; no abrupt headwear gaps or profile clipping.

---

## Cross-character separation and unresolved decisions

| Character | Dominant shell family | Body/pose language | Head read | Signature construction |
|---|---|---|---|---|
| Sailor | Narrow Deck-Coat / Vertical Utility | Lean, upright, ready | Compact cap, raised collar | Character-left mooring coil |
| Slicker | Integrated Hooded Rain-Smock | Broad pear shell, forward-ready | Face-side-open hood | Integrated weather shell; no handheld prop |
| Painter | Offset Artisan Smock / Reaching-Arm | Open reach, compact torso | Cuffed knit beanie | Character-right flat brush |

These are three intentionally different garment systems and pose grammars. The three family labels are proposed design-stage descriptors only; under the roster audit rules, the current vector construction family remains UNASSIGNED until the owner approves each character's silhouette/construction card. Record the proposals in the roster family register and compare them with all existing civilians before any later character reuses a family.

### Unresolved design questions for internal QA / owner review

1. Sailor: does the grasp read as a real hand securing a rope loop at direct 28×42, or does the loop still merge into a dark accessory knot?
2. Slicker: do the face-side-open hood, front storm closure and rear yoke make the clothing read unmistakably as rainwear without any umbrella?
3. Painter: is the flat-brush identity and hand grip immediately legible at 28×42, particularly in the left profile?
4. Slicker: which two roster faces are genuinely closest by geometry once matched front/profile crops are compared?
5. All three: do their proposed face cues remain individually recognizable without palette, headwear or hair colour doing all the work?
6. Do all three retain the approved revision-21 outer contours after garment seams, face geometry and prop contact are refined?

### Explicit exclusions

No final palette or colour rendering; no production renderer code or integration; no gallery/town rollout; no golden snapshot/provenance changes; no work on #15–23. Revision 21 remains the approved silhouette baseline. Revision 22 and any future geometry changes are proposals only and cannot silently replace it.

