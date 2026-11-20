## Revision 10 internal QA update

Exact source: [revision 10 silhouette exploration](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg), tested commit 8ae6a47055c6c75e361738b21c01d8b07b6830b4. Exact evidence: [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818). The subsequent SVG title correction was metadata-only; no geometry changed.

- All 24 body-only/prop-on views generated at native 64×96, separately rasterized direct 28×42 and enlarged 4×. Face evidence: 69 roster crops and six matched comparison rows.
- Profile prop audit passed: Sailor right 172 added / 172 region pixels; Slicker left 295 / 272 region pixels; Painter left 237 / 95 region pixels.
- Manual inspection covered body-only and prop-on sheets, direct-scale captures, enlarged profiles, matched face comparisons and Sailor/Welder rear silhouette. Sailor's narrow upright rear construction is visibly distinct from Welder's broad squared rear.
- Revision 10 clarifies Slicker's folded umbrella shaft/canopy in front/back as well as profile; direct 28×42 reads more clearly as an umbrella. Sailor's rope-loop grasp remains subtle at direct scale and should be independently judged. Painter's broad brush and near-side grip are clearer and crop-safe.
- Browser QA global result: failure on unapproved golden snapshots (1/23) and 135 existing audio/resource 404 console entries; page/script errors empty. No snapshots/provenance changed.
- Current independent-review handoff: [Claude review package 04](SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md). Packages 01–03 are superseded.

## #12 Sailor — proposed construction card

- **Role/personality:** experienced working sailor; observant, steady, practical and quietly confident.
- **Qualitative build:** narrow upright deckhand; short squared deck coat, raised split collar, compact cap, vertically structured torso. Not a broad smock and not Fisher's wide stance.
- **Pose class:** planted, slightly staggered, upright; arm-to-torso negative-space breaks.
- **Baseline:** both feet grounded; modest stagger rather than a wide braced stance.
- **Head/face:** cap brim clears the ear in both profiles. Exactly two proposed defining cues: (1) strong, straight brow shelf; (2) long hooked nose with a tapered cheek-to-jaw plane.
- **Closest roster faces (matched crops):** Clinic and Guard. Clinic is closest in elongated profile/nose projection; Sailor's jaw is squarer. Guard is closest in brow shelf and jaw plane; Sailor's nose is longer and more hooked.
- **Garment:** squared cropped hem; collar visibly frames neck; shoulder-to-waist contour must separate from Clinic's tapered wrap tunic and Coach's athletic jacket.
- **Proposed construction family:** **PROPOSED — narrow cropped deck-coat / upright deckhand**. Current family remains **UNASSIGNED**.
- **Prop footprint:** optional compact mooring-line coil; subordinate to torso, held low by character-left hand. Remove or simplify if not legible at direct 28×42.
- **Must-survive cues (exactly three):**
  1. Narrow upright cropped deck-coat construction, distinct from Fisher's broad smock.
  2. Compact cap plus raised split collar forming a clear head/neck contour at game scale.
  3. Planted stagger and arm negative-space breaks that identify the body without a rope.

### Sailor prop contact / handedness

| Direction | Carrying hand | Viewer side | Near-side anatomy | Far-side anatomy | Contact / footprint |
|---|---|---|---|---|---|
| Front | Character-left | Viewer-right | Left arm, wrist and palm visible | Right arm separated on viewer-left | Coil seated in left palm; compact, low beside hip |
| Back | Character-left | Viewer-left | Left arm/hand visible | Right arm separated/occluded as pose requires | Same single coil; no duplicate |
| Left profile | Character-left, far-side | Far side | Right arm is near-side and empty | Left/far arm occluded | Coil hidden; no ghost coil |
| Right profile | Character-left, near-side | Near side | Left arm/hand visible | Right/far arm occluded | Coil touches palm/forearm; compact coil must remain legible |

**Roster comparisons:** Clinic is highest-priority body comparison, then Coach, Guard and Fisher; Granny is craft benchmark only. Compare shoulder-to-waist contour, collar/neck opening, cap/ear relationship, leg stance and arm gaps. Do not optimize against IoU.

## #13 Slicker — proposed construction card

- **Role/personality:** rain-ready city pedestrian / storm-season commuter; quick, self-contained and alert.
- **Qualitative build:** compact forward-pitched figure whose long waterproof shell is the body construction, not a generic body with a coat over it. Low shaped hood or bucket-brim, visible face opening, shell overlap and curved/asymmetric hem.
- **Pose class:** forward-leaning compact stance; elbows and lower shell create intentional negative spaces.
- **Baseline:** compact grounded feet beneath a longer shell; avoid Fisher's broad planted deck stance.
- **Head/face:** exposed face plane beneath hood; profile eye remains readable at 28×42. Exactly two proposed defining cues: (1) sharply angled brow/eye set; (2) compressed tucked chin with a short projecting nose/cheek break.
- **Closest roster faces (matched crops):** Hacker and Courier. Hacker is closest in compact lower-face and angled eye line; Slicker's chin is more tucked. Courier is closest in nose/cheek projection; Slicker's nose is shorter and brow more acute.
- **Garment:** shell wraps the torso with a clear closure/overlap; hem curves asymmetrically and remains a defining contour from front, back and both profiles.
- **Proposed construction family:** **PROPOSED — forward-pitched long rain-shell / hooded commuter**. Current family remains **UNASSIGNED**.
- **Prop footprint:** optional compact folded umbrella in character-right hand. It must remain shorter than the torso and never dominate the silhouette. An integrated hood/closure may replace it.
- **Must-survive cues (exactly three):**
  1. Long waterproof shell with distinctive curved/asymmetric hem and visible overlap.
  2. Hood/brim-to-face relationship with exposed, readable face plane at game scale.
  3. Forward compact pose and one integrated rainwear interaction/closure detail.

### Slicker prop contact / handedness

| Direction | Carrying hand | Viewer side | Near-side anatomy | Far-side anatomy | Contact / footprint |
|---|---|---|---|---|---|
| Front | Character-right | Viewer-left | Right arm/wrist/palm visible | Left arm separated or shell-occluded | Folded umbrella rests in right palm; small vertical footprint |
| Back | Character-right | Viewer-right | Right arm/hand visible | Left arm intentionally occluded by shell | Same single umbrella; no duplicate |
| Left profile | Character-right, near-side | Near side | Right arm/wrist/palm visible | Left/far arm occluded | Folded umbrella contacts the right hand; compact footprint |
| Right profile | Character-right, far-side | Far side | Left arm is near-side and empty | Right/far arm occluded | Umbrella hidden |

**Roster comparisons:** Fisher, Courier, Hacker, Coach and Sailor. Distinguish shell architecture and pose before prop: long asymmetric rain shell vs Fisher's broad short smock, Courier's A-line messenger coat, Hacker's cropped drape and Coach's athletic jacket.

## #14 Painter — proposed construction card

- **Role/personality:** practical sign painter / muralist; expressive, meticulous and slightly eccentric.
- **Qualitative build:** open reaching figure in an asymmetrical loose work-smock or cropped coverall; one rolled sleeve, offset pocket/tool break, distinct beanie plus swept forelock. Avoid Cook's apron wedge and Welder's protective equipment.
- **Pose class:** open reaching / weight-shifted pose; one arm extended with a controlled brush grip, opposite arm relaxed or bent.
- **Baseline:** uneven weight distribution with separated legs; not Fisher's braced stance or Slicker's compact stance.
- **Head/face:** beanie and swept forelock are silhouette context, not face uniqueness. Exactly two proposed defining cues: (1) lifted asymmetric brow; (2) long angular nose bridge with a sharper cheek plane.
- **Closest roster faces (matched crops):** Cook and Busker. Cook is closest in midface width; Painter's jaw tapers more and nose bridge is longer. Busker is closest in open expression; Painter's brow is more asymmetric and cheek plane sharper.
- **Garment:** asymmetrical smock cut, rolled sleeve and offset hem/pocket plane; do not rely on paint splatters or palette for identity.
- **Proposed construction family:** **PROPOSED — open asymmetrical sign-painter smock / reaching pose**. Current family remains **UNASSIGNED**.
- **Prop footprint:** short broad brush in character-right hand. Brush tip and handle must form one continuous object with a visible hand contact chain. Paint tin/palette remains optional and is not included in this first silhouette hypothesis.
- **Must-survive cues (exactly three):**
  1. Asymmetric work-smock construction with rolled sleeve and open reaching pose.
  2. Beanie plus swept forelock / distinctive head contour readable at game scale.
  3. One believable character-right brush grip and contact chain.

### Painter prop contact / handedness

| Direction | Carrying hand | Viewer side | Near-side anatomy | Far-side anatomy | Contact / footprint |
|---|---|---|---|---|---|
| Front | Character-right | Viewer-left | Right arm extended with hand | Left arm visible but secondary | Fingers wrap brush handle; brush broadside remains compact |
| Back | Character-right | Viewer-right | Right arm/hand follows same reach | Left arm secondary/partly occluded | Same brush; rear placement reverses |
| Left profile | Character-right, near-side | Near side | Right arm/wrist/grip visible | Left/far arm occluded | Brush contacts right palm; handle and bristles form one supported object |
| Right profile | Character-right, far-side | Far side | Left arm is near-side | Right/far arm occluded | Brush hidden |

**Roster comparisons:** Cook, Welder, Busker, Hacker, Sailor and Slicker. Compare garment cut, sleeve construction, reach angle, head/jaw geometry and arm negative space. Cook's apron/pan, Welder's protective mask/gear, Busker's performer stance and Hacker's cropped drape are not templates.

## Parallel differentiation assessment — preliminary, not acceptance

- **Sailor** is intended to be the narrowest and most upright, with a cropped structured torso and planted stagger.
- **Slicker** is intended to have the longest garment mass, a forward pitch and a low hood/face opening; the shell itself must create the silhouette.
- **Painter** is intended to have the most open arm pose and asymmetric sleeve/hem construction; the reaching gesture must be legible without the brush.
- The likely closest internal pair is Sailor/Slicker at head-and-shoulder level, while Slicker/Fisher share weatherproof clothing context and Painter/Busker share a possible beanie/handheld-object cue. These are hypotheses requiring matched-scale human comparison, not measured findings.
- Body-only identity is the controlling test. If a figure becomes generic when its prop is removed, revise the torso/pose rather than enlarging the prop.
- No construction family is assigned. Proposed family descriptors above are planning language only.

## Evidence captured for independent review

The current evidence is pinned to revision 10 and Run #678:
1. Body-only and prop-on four-view sets: 12 body-only plus 12 prop-on views across the three characters.
2. Native 64×96 and independently rasterized direct 28×42 comparison sheets; direct 28×42 output is not resized from native.
3. Four-times nearest-neighbour enlargements for all 24 fields.
4. Matched current-roster face crops and comparator pairs: Sailor—Clinic/Guard; Slicker—Hacker/Courier; Painter—Cook/Busker.
5. Six new 40×38 face-design crops and six matched face-comparison rows at native and 3× scales.
6. Near-side prop-region audit passed for Sailor/right, Slicker/left and Painter/left. Far-side visibility and grip are also manually reviewed in the exact artifact.
7. Proposed Sailor rear silhouette is compared against the live Welder rear silhouette at matched native 64×96 aspect ratio.
8. Exact source and artifact links are recorded in [Claude review package 04](SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md): source commit `8ae6a47055c6c75e361738b21c01d8b07b6830b4`, Run #678, artifact `14650399818`.

Internal visual review finds the three body-only constructions distinct and the props readable at direct game scale. Face geometry and set-level originality remain open for Claude's independent critique. The overall browser workflow still fails at the existing unapproved golden snapshot gate (1/23 match) and existing audio/resource 404 console diagnostics; no snapshots or provenance were changed. These are not production-renderer results for the three proposed characters.

## Reproducible source rendering

The source is vector geometry in a 64×96 local figure field. For direct game-scale design projections, render the same vector paths with the output surface set to 28×42 (scale 0.4375 from the vector coordinate system) in the rasterizer; do not create the 28×42 evidence by resizing an already-rasterized 64×96 PNG. For enlarged inspection, apply nearest-neighbour scaling only to the direct/native raster outputs. These are design-source projections, not game-renderer captures.

## Approval boundary

No silhouette, face, prop, handedness, palette or construction family is approved. Current family remains UNASSIGNED for #12–14. No production renderer, live town integration, gallery integration, golden snapshot or snapshot provenance work is authorized.
