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

## Revision 18 — construction cards with latest exact-source QA status (2026-11-20)

**Current SVG:** [revision 18](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg)  
**Exact tested source:** 73774e27092de36fd88f45b0d5cb6c97f760c7ea  
**Evidence:** [Run #730](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551) · [artifact 14658967396](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551/artifacts/14658967396)

- **Sailor #12:** body-only/prop-on geometry preserves all body pixels in all four directions. The mooring coil is visible front/back/right as designed, hidden on the far-side profile. The front/right grasp remains subtle and is an explicit independent-review question. Construction family remains UNASSIGNED.
- **Slicker #13:** integrated face-side-open hood, long rain shell, rear yoke/hem seams and shortened storm closure read as rainwear. No separate umbrella. Connected-anatomy audit passes through all four views at native/direct scales. Construction family remains UNASSIGNED.
- **Painter #14:** front ferrule no longer overlaps body-only pixels. Left-profile handle joins the bristle fan at direct scale. Two short internal bristle grooves restore a brush-head cue without splitting the silhouette. The compact hand/tool cluster remains dense at 28×42; connectivity does not by itself establish a believable grip or instant prop recognition. Construction family remains UNASSIGNED.
- **All structural checks:** 12/12 body-preservation pairs pass with zero removed body pixels; 48/48 connected-anatomy projections pass across all three characters, body/prop, four directions and both scales. Native 64×96, independent direct 28×42 and enlarged captures are present 24/24 each.
- **Prop-region diagnostics:** Sailor/right +172 pixels; Painter/left +153 total / +151 expected-region pixels. Descriptive only; no arbitrary thresholds.
- **Visual evidence inspected:** native/direct body and prop sheets, matched face comparisons, Sailor/Welder rear comparison, and enlarged key Sailor/Slicker/Painter contact details. Sailor grasp and Painter tool readability remain review questions.
- **Overall Actions workflow:** Run #730 fails at the separate global browser diagnostics gate after the revision-18 design projection and semantic validation passed. Golden snapshot baseline remains unapproved (1 match / 23 changed); 180 existing resource/audio 404s; page/script errors empty. No snapshots/provenance changed.
- **Approval boundary:** design-stage proposals only. No silhouette, face, prop or palette is owner-approved. No production renderer work is authorized. Independent Claude review and owner approval remain pending.

## Revision 15 — QA capture inspected; owner review pending

**Source:** [silhouette exploration 15](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-15.svg)  
**QA:** [Run #695](https://github.com/tinytime/Tinytime.github.io/actions/runs/44787355926) · [artifact 14653489949](https://github.com/tinytime/Tinytime.github.io/actions/runs/44787355926/artifacts/14653489949) · tested source commit 9abb7de906314a092157f6d5bffe4492e7736cb9

- **Slicker:** the separate umbrella is removed. The face-framing hood opening and diagonal storm closure are integrated into the rain smock; a longer character-left storm flap, mirrored in front/rear views, makes the asymmetric hem visible at direct 28×42. The broad pear mass and forward-leaning profile remain.
- **Painter:** the left-profile body-only arm/hand matches prop-on exactly; the right hand supports the brush below the face in every visible direction. The flared bristle head is more readable at direct scale, but the compact tool/hand cluster remains dense and is explicitly flagged for owner scrutiny.
- **Sailor:** the front coil-to-palm bridge is thickened; rear/profile arm negative-space breaks remain clear.
- **Internal audit:** 24/24 native, direct and enlarged projections; 69 face crops and six matched face rows; all 12 body-only/prop-on pairs preserve every body pixel. Sailor/right +172 and Painter/left +143 / +141 expected-region prop pixels; counts are descriptive, no arbitrary threshold.
- **Cross-roster body comparison:** Clinic, Guard, Coach, Courier and Fisher directional captures, plus Usher/Cook/Ref silhouette sheet, reviewed qualitatively. Sailor's nearest shape resemblance is Usher/Coach; Slicker is distinct from Fisher/Cook/Guard; Painter is distinct from Coach/Courier/Ref. Existing pixel/game captures are not normalized to the new vector studies.
- **Status:** design-stage only. Owner review pending; independent Claude re-review of revision 15 not yet performed. No renderer, approved art or golden snapshots changed.


## Revision 14 — QA evidence inspected; owner review pending

**Source:** [silhouette exploration 14](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-14.svg)  
**QA:** [Run #691](https://github.com/tinytime/Tinytime.github.io/actions/runs/44786466007) · [artifact 14654237640](https://github.com/tinytime/Tinytime.github.io/actions/runs/44786466007/artifacts/14654237640) · tested commit `6d0c27e71d17e0eaa20eb069926fee323bd255a7`

- **Painter arm/prop:** the left-profile body-only arm and hand are identical to prop-on; all 12 body-only/prop-on comparisons remove zero body pixels. The flared brush head and hand contact are present. The direct-scale tool/hand cluster remains dense and is flagged for owner scrutiny, not represented as fully resolved.
- **Slicker weather cue:** the separate umbrella is removed. The integrated face-framing hood opening, profile brow/rear flap and diagonal storm closure read as clothing details; forward pitch and asymmetric smock remain visible.
- **Sailor:** the front coil-to-palm bridge is thickened; rear and profile views retain arm/torso negative-space breaks.
- **Painter head/face:** knit beanie remains distinct from Sailor's brimmed cap; asymmetric brow, squarer cheek/jaw and shorter blunt profile nose appear in the matched geometric face study.
- **Evidence:** 24/24 native 64×96 and 24/24 independently rasterized direct 28×42 projections; six matched face rows; 12/12 zero-body-removal checks. Manual artifact inspection is complete for the source-projection sheets. These are not final game-rendered sprites.
- **CI caveat:** overall workflow remains failed at game-browser diagnostics: the golden snapshot baseline is explicitly unapproved (1/24 match, 23/24 changed) and 180 resource 404 console entries were logged. Page/script errors are empty. Do not refresh/approve snapshots without owner authorization.
- **Status:** design-source QA passed; visual source study inspected; independent reviewer/owner approval pending. No renderer, approved art, or golden snapshots changed.

---

## Revision 14 — final Claude correction pass; browser QA pending

**Source:** [silhouette exploration 14](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-14.svg)

- **Painter arm/prop:** the left-profile body-only arm and hand are identical to prop-on; the right hand sits below the face and holds the brush. The front, back and profile brush heads flare into a bristle edge at direct 28×42 scale. The front/back prop-on bases remain body-only geometry plus the tool.
- **Slicker weather cue:** the separate umbrella was removed after the 28×42 render failed to read as an umbrella. It is replaced by a face-framing integrated rain hood, short profile brow/rear flap and diagonal storm closure. The broad pear smock, forward pitch and asymmetric front/rear hem remain.
- **Sailor:** the front coil-to-palm bridge remains thickened; rear and both profile views retain arm/torso negative-space breaks.
- **Painter head/face:** knit beanie without Sailor's brim, more pronounced asymmetric brow, squarer cheek/jaw and shorter blunt profile nose.
- **Audit:** no arbitrary profile pixel minimum remains. All 12 body-only/prop-on pairs are checked for zero removed body pixels; only Sailor and Painter have separate near-side props. Slicker is audited as integrated clothing detail.
- **CI:** browser QA is pinned to Ubuntu 24.04 and installs Chromium without apt dependency provisioning, avoiding the stalled Ubuntu 26.04 ubuntu-latest step observed in the prior run.
- **Status:** revision 14 is a design-stage proposal. Browser QA and manual visual review are pending; no renderer, approved art or golden snapshots were changed.

## Revision 11 — Claude review corrections implemented; fresh QA pending

**Source:** [silhouette exploration 11](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-11.svg)  
**Scope:** design-source geometry and evidence harness only. No production renderer, approved art, golden snapshot or provenance changes.

- **Sailor:** widened the front coil-to-palm bridge; added narrow negative-space breaks to rear and both profile body-only and prop-on views. Character-left prop visibility remains front/back/right-profile only.
- **Slicker:** shifted the upper shell to strengthen the forward-pitched read and exaggerated the diagonal front/rear hem. Rebuilt the character-right folded umbrella with a longer shaft, tapered canopy and higher hand/grip contact; near-side left profile only.
- **Painter:** lowered the extended front/rear working arm so the tool no longer crowds the face; rebuilt prop-on front, back and near-side left profile from the exact body-only base plus a separate hand/handle/brush head. This directly removes the former back-view arm swap and prevents prop-on from replacing the free arm.
- **Painter headwear/face:** changed both silhouette profiles to a cuffless knit-beanie contour; the matched 40×38 face study now uses a knit cap without a brim, a more pronounced asymmetric brow, a squarer cheek/jaw plane and a shorter blunt profile nose.
- **Audit correction:** removed the unsupported 12-pixel Painter threshold (and the inconsistent 100-pixel comparisons). Profile-region pixel counts are now descriptive only. The automated gate checks a stronger, meaningful invariant: prop-on must not erase any body-only silhouette pixels across all 12 direction pairs.
- **Validation status:** source edits committed. Revision-11 browser capture is queued as Run #682; no visual pass or owner approval is claimed until the resulting artifact is inspected.

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


## Revision 19 — Claude package 05 corrections (design source; QA pending)

**Source:** [SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-19.svg](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-19.svg) · source commit [44d133b65c8ebd6aa3c207e03960d85034df193b](https://github.com/tinytime/Tinytime.github.io/commit/44d133b65c8ebd6aa3c207e03960d85034df193b).

- **Handedness decision:** retain the construction-standard convention. Character-left appears viewer-right in front and viewer-left in rear; profile visibility is determined by near/far relative to facing. Sailor carries the coil in character-left: front/rear placements remain viewer-right/viewer-left, visible in right profile (near-side) and hidden in left profile (far-side). Painter carries the brush in character-right: front/rear placements remain viewer-left/viewer-right, visible in left profile (near-side) and hidden in right profile (far-side). No blind profile mirroring or handedness swap.
- **Sailor:** revised front, rear and right-profile rope loop/grip geometry to compact the coil and bring the hand visibly across the coil edge. The upright deck-coat body, cap, collar and leg stance are retained. This is a first grip-shape iteration; direct-scale believability remains unverified until captures are inspected.
- **Painter:** replaced the long thin rake-like brush treatment with a shorter diagonal handle, compact solid wedge bristle block and a thicker hand/grip silhouette in front, rear and near-side left profile. The reaching-arm silhouette remains asymmetric. Garment transition/body-only polish is not yet completed and remains open for the next correction pass.
- **Slicker:** no source geometry changed. Revision 19 preserves the full revision-18 Slicker artwork byte-for-byte; only the title identifies it as preserved.
- **QA status:** no revision-19 native/direct captures, enlarged detail sheets, connectivity/contact review, frame-clearance inspection or Actions result has yet been produced. Do not infer grip quality from path connectivity. Revision 19 is NOT internally QA-passed and NOT owner-approved. Do not prepare a new Claude review package until internal QA passes.
- **Outstanding:** capture all four directions body-only and prop-on for Sailor/Painter at native 64×96 and independently rasterized direct 28×42; enlarged details; inspect grip/contact, body-only anatomy, Painter garment transition, clipping and roster differentiation; verify Slicker unchanged; update tracker after QA evidence exists.


## Revision 19 construction addendum

- Sailor's coil now has an additional rope-tail cue crossing the palm/coil junction in front, rear and near-side right profile. Hand contact remains a human visual question, not proven by connected pixels.
- Painter's bristle block is widened into a flat wedge and the ferrule/handle junction is clearer in front, rear and near-side left profile. Grip marks are additive only; white cutout overlays were removed because they erased body-only pixels in the audit.
- Painter's offset garment transition and profile frame-edge clearance remain open review items. Slicker remains unchanged.
- Exact current source: `0320663dd638f33f498a7a760ae505a7bdf0f208`; Run #752 pending.


## Revision 19 — exact-source internal QA findings

- Exact source: `e161240696ac27659360a4dbfbc7922d6be6e49f`; [Run #780](https://github.com/tinytime/Tinytime.github.io/actions/runs/44805957949), artifact [14662329201](https://github.com/tinytime/Tinytime.github.io/actions/runs/44805957949/artifacts/14662329201).
- Focused checks passed: 12/12 body-preservation (zero removed pixels), 48/48 connectivity, 2/2 profile-prop contact. Direct 28×42 and native 64×96 source projections rendered.
- Manual inspection of native/direct sheets and enlarged Sailor/Painter detail captures found improved rope-coil and brush readability. Painter's side darts are short, paired, and matched in body-only/prop-on views. Do not restore the full-width curved seam: it disconnected torso and legs in native masks.
- Slicker: eight body/prop directional panels remain byte-identical to revision 18.
- Overall workflow remains FAIL at the separate browser diagnostics step (audio HTTP 404 and golden gate 1/23). No golden snapshots changed. This is not a design-source failure.
- Design-source internal QA passed; Claude review and owner approval remain outstanding. No renderer authorization.
