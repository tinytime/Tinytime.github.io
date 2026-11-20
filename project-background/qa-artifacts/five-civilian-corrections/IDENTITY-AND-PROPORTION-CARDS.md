# Five-Civilian Identity and Proportion Cards

**Status:** correction-round working briefs; qualitative proportion intent only.  
**Scope:** Usher, Cook, Courier, Coach and Referee. Runner is excluded.  
**Source baseline:** Run #595 renderer `c354abfa3d78b46dc982a03d2c5d1ece0c918257`.  
**Correction implementation under test:** `2b45201eb762a939547f5c8414ae9f44e5dc0d22`.

These are design-intent cards, not verified semantic measurements. Do not infer or publish body/head ratios from them. The six source-annotated semantic records remain unverified; Granny remains `reference_only`. Granny is a craft benchmark, not a proportion template.

## Usher — venue attendant

- **Role/personality:** composed, observant, formal and quietly authoritative.
- **Silhouette/proportion intent:** compact, upright uniform jacket; narrow waist; clean leg separation; light trousers; grounded stance. Side views should retain two readable trouser planes and a clearly distinct shoe mass.
- **Head/face identity cues:** narrower, composed face; hooded/narrow eye construction; one subtly lifted brow; restrained, small closed-mouth expression. These are structural expression cues, not a badge/headwear distinction.
- **Clothing/palette:** navy-blue peaked cap and jacket, brass/gold trim, cool light trousers and slate shoes.
- **Signature role identifiers:** peaked cap with badge and a single clean chest badge; clipboard remains part of the established design.
- **Preserve:** cap, badge, gold trim, light trousers and the existing uniform silhouette.
- **Correction target:** darken profile shoe and sole so both remain distinct from the pale trouser planes at direct 28×42.
- **No numeric proportion targets:** use native render and direct game-scale readability, not Granny-derived ratios.

## Cook — chef / food service

- **Role/personality:** warm, confident, generous, practiced and approachable.
- **Silhouette/proportion intent:** broad planted stance, substantial shoulders, rounded face, tall pleated toque, double-breasted coat and broad terracotta apron wedge. The pan arm is an intentional outward gesture; preserve the connected sleeve/cuff/forearm/hand chain.
- **Head/face identity cues:** broad cheek construction; softly arched, heavier brows; broad nose; full, friendly smile with cheek creases. The smile and cheek construction should survive as a clear expression rather than tiny decoration.
- **Clothing/palette:** warm ivory chef coat, terracotta apron, dark planted trousers, dark shoes and pale toque.
- **Signature role identifiers:** toque, curls, terracotta apron and handled sauté pan.
- **Preserve:** toque/curls, apron wedge, cuffed forearm and hand-to-pan interaction.
- **Correction target:** make the handle visibly extend from the gripping hand to the pan body; retain a clear rim/interior so it reads as a pan, not a mug, at 28×42.
- **No numeric proportion targets:** use the character's broad, grounded kitchen-worker construction; do not normalize to Granny.

## Courier — messenger / delivery worker

- **Role/personality:** alert, quick, practical and focused; a working messenger rather than a generic athletic figure.
- **Silhouette/proportion intent:** forward-ready but grounded posture; compact weatherproof jacket with a distinct A-line lower shell; cross-body satchel and parcel integrated into the pose. Retain negative space and visible hand/parcel contact.
- **Head/face identity cues:** alert asymmetric gaze; one more strongly angled brow; sharper, projecting nose/profile; tight, purposeful half-smile. Do not count cap or hair colour as face cues.
- **Clothing/palette:** teal windbreaker, ochre/gold satchel and strap, dark trousers, storm cap and parcel.
- **Signature role identifiers:** diagonal strap, hip satchel, carried parcel and teal/gold palette.
- **Preserve:** parcel, satchel, strap placement, four-view handedness and existing palette.
- **Correction target:** add purposeful face construction without changing the established delivery identity.
- **No numeric proportion targets:** retain its forward-ready compact construction; no Granny-derived ratios.

## Coach — veteran sideline tactician

- **Role/personality:** experienced, measured, strategic and supportive.
- **Silhouette/proportion intent:** athletic shoulders, grounded stance, straight-hem track jacket and visible side negative space at elbows/hands.
- **Head/face identity cues:** silver sideburn/temple hair should read as age-related hair, not headset/helmet pieces; flat green cap with gold band.
- **Clothing/palette:** forest-green jacket, cream shoulder yoke, track trousers and light shoes.
- **Signature role identifiers:** clipboard, whistle, cream yoke and VC rear emblem.
- **Preserve:** cap, silver sideburns, clipboard, whistle, yoke and emblem.
- **Coach/Courier rear distinction rationale:** Coach's jacket has a straight hem and visible side elbow/hand negative spaces; Courier's shell is A-line and its arms are more integrated/occluded by the coat. Their cap/hair constructions and shoe values also differ. These construction differences are the basis for Claude's marginally acceptable shared-body-mass classification. This is a documented human judgment, not an IoU pass threshold. Revisit only if fresh renders erase these visible differences.
- **No numeric proportion targets:** do not alter Coach's torso merely to reduce IoU.

## Referee — football official

- **Role/personality:** decisive, alert and impartial.
- **Silhouette/proportion intent:** athletic base with a clear raised-card arm and visible negative space around the pose.
- **Head/face identity cues:** retain the existing official's head and profile construction; no new face edits authorized in this correction pass.
- **Clothing/palette:** black/ivory stripes, vermilion shorts, tall white socks and dark footwear.
- **Signature role identifiers:** raised yellow card, whistle, stripes and red shorts.
- **Preserve:** raised arm/card, stripes, red shorts and white socks. No redesign or incidental changes.
- **No numeric proportion targets:** preserve current character-specific athletic construction.

## Correction-round acceptance record

For each finding, attach before/after native 64×96 and direct 28×42 captures, direction, exact source commit and pixel-diff summary. Pixel diffs are change locators, not quality scores. Inspect the direct game-scale captures on both neutral grey and actual town/night backgrounds. Include a solid-black four-direction silhouette sheet and character-specific town spawn evidence where the harness supports it; otherwise mark the evidence unavailable.

All five remain **NOT APPROVED** until internal QA, independent review of the corrected evidence and explicit owner approval. The remaining 17 civilians stay on hold.
