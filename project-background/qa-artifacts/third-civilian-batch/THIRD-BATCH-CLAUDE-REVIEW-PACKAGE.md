# Third civilian batch — independent Claude review package

**Characters:** Tech (#9), Hacker (#10), Fisher (#11)  
**Review purpose:** independent comparative review of the completed character artwork and evidence for the three-character batch.  
**Prepared:** 2026-11-20  
**Branch:** `npc-granny-baseline-overhaul`  
**Package prepared against repository HEAD:** `0716e4759dee6f426ec2bb31b6f35f4d54cba4ea`

## Review scope and evidence boundary

This package intentionally combines three characters at different implementation stages:

| Character | Evidence stage | What Claude is reviewing | What this evidence does not establish |
|---|---|---|---|
| Tech (#9) | Production vector renderer | Actual game renderer at native 64×96 and direct game scale 28×42, four directions; role-debug; explicit town spawn and close-up; Clinic comparison | Owner acceptance or any approval of golden snapshots |
| Hacker (#10) | Finished design-stage vector art | Corrected finished-colour design in four directions; native-size and design-scale projections; prop placement/contact and handedness | Production renderer geometry, game integration, town/gallery behavior or production renderer QA |
| Fisher (#11) | Finished design-stage vector art | Corrected finished-colour design in four directions; native-size and design-scale projections; basket handedness/contact and garment construction | Production renderer geometry, game integration, town/gallery behavior or production renderer QA |

**Do not treat Hacker/Fisher's 28×42 images as game-renderer captures.** They are design-stage vector projections. Their production renderer implementation remains unstarted. Tech's 28×42 captures are direct game-renderer output.

Granny Volt is the approved 10/10 craft benchmark for finish, clarity, personality and directional consistency—not a template. Each character must retain an original silhouette, face, outfit, palette, props and personality. Evaluate the actual approved concepts, not conformity to Granny's construction.

## Authoritative review links

### Tech (#9) — production renderer

- [Tech renderer review package](TECH-RENDERER-REVIEW-PACKAGE.md)
- [Browser QA Run #644](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189)
- [Run #644 artifact 14634020084](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189/artifacts/14634020084)
- Tested renderer source: `579f0fff61b8cfd4e416cc59381187b162d3b8ca`
- Main renderer: `npc_sprites.js`, dedicated `drawTechVector`
- Latest corrections: `9f11ca20a3bdaf3ca8e5bd1ace3f6043d394327e` (profile shell/meter grip), `579f0fff61b8cfd4e416cc59381187b162d3b8ca` (rear service-loop and shortened flap)
- Native 1× town close-up and explicit `techgirl` street spawn evidence are included in the artifact.

**Internal QA disposition:** targeted Tech capture checks and wider character integrity checks passed; all actual captures and comparison evidence were visually inspected. Tech remains pending Claude's independent verdict and owner rendered-art acceptance.

### Hacker (#10) and Fisher (#11) — finished design-stage artwork

- [Hacker/Fisher design-stage review notes](HACKER-FISHER-DESIGN-REVIEW.md)
- [Finished colour design source SVG](HACKER-FISHER-FINISHED-DESIGN-STUDY.svg)
- [Approved round-05 silhouette exploration](TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg)
- [Corrected Playwright design render Run #7](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989)
- [Run #7 artifact 14634776106](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989/artifacts/14634776106)
- Corrected source commit: `2b08e60d4814846923e133503f965532bde055ad`
- Finished design SVG SHA-256: `c322e8c44a04478e59b8bc7319203213577d7ce3100c13fdc3de56e0f9e0565c`

The corrected Run #7 artifact contains:
- Complete 1× and 3× finished-design sheets.
- Eight native 64×96 directional captures (four per character).
- Eight direct 28×42 design projections (four per character).
- Eight 4× nearest-neighbour enlargements of the 28×42 projections.
- Render report with source hash and capture manifest.

**Internal QA disposition:** Hacker and Fisher both passed finished-design internal visual QA. No additional render was requested or required. The render workflow's optional commit/push of presentation PNGs failed on a non-fast-forward branch race; rendering, capture generation and artifact upload succeeded. The artifact is the authoritative corrected evidence; the corrected PNGs are not committed as repository files. Run #6 outputs are superseded.

## Character-specific review anchors

### Tech (#9)

Three must-survive identity cues:
1. Swept-back stepped undercut and compact ear-protection cup.
2. Petrol field shell with structural crossing harness.
3. Character-left diagnostic meter with a connected wrist/hand grip.

Internal QA corrections already incorporated: both profile eye/brow cues read at direct game scale; the profile shell and rear service-loop/flap construction are more distinct from Clinic; left-profile meter contact is discernible.

Please assess:
- Whether profile face cues remain legible and unobscured at 28×42.
- Whether the field-shell silhouette and rear construction distinguish Tech from Clinic beyond palette alone.
- Whether the left-profile meter reads as held with believable contact.
- Four-direction coherence, clipping, anatomy, and town-context integration.

Clinic/Tech silhouette IoU diagnostics (back 0.8775, front 0.8922, right profile 0.8562) are human-review prompts only, not automatic failures. Judge the actual silhouettes and role distinction; do not optimize to a number.

### Hacker (#10)

Three must-survive identity cues:
1. Broken side-swept fringe, exposed temple and single asymmetrical earbud.
2. Cropped asymmetric drape-shell with one hanging panel and opposite exposed forearm.
3. One-handed fold-out input slate in character-right hand, with supporting-hand/wrist contact.

Internal QA confirms the corrected front contains one slate only, with the supporting hand overlapping its rim. Rear and right-profile device placement is consistent; the left profile correctly hides the far-side device.

Please assess:
- Whether the narrow, folded-in construction and asymmetric drape read as a distinct agile digital intruder.
- Face/head identity and open temple/earbud cues at both presented scales.
- Slate placement, hand-over-rim contact and correct near/far visibility.
- Whether the compact slate remains legible without becoming oversized.

### Fisher (#11)

Three must-survive identity cues:
1. Low oilskin hood with short brow lip and soft rear neck flap.
2. Broad waterproof smock with bib chest plane and diagonal shoulder closure.
3. Low-held compact net basket on character-left, with connected supporting wrist/hand.

Internal QA confirms the broad, grounded stance, substantial boots and bib construction remain distinct from Hacker. Basket handedness is front viewer-right, rear viewer-left and left profile only; right profile correctly has no basket. No duplicate basket or detached hand geometry was found.

Please assess:
- Whether the broad, braced silhouette and oilskin construction read as a weathered waterfront worker.
- Hood/face opening, brow lip, rear neck flap and diagonal bib closure.
- Basket handedness, profile visibility, wrist/grip plausibility and garment integration.
- Whether the right-profile hip detail remains subordinate and integrated rather than reading as a second basket or oversized pouch.

## Cross-character comparative review

Please compare Tech, Hacker and Fisher side-by-side for:
1. Distinct silhouette, torso volume, stance and negative space—not merely different colours or props.
2. Unique face/head construction and recognizable role/personality.
3. Coherent front/back/left/right construction, including correct prop handedness and near/far occlusion.
4. Readability at the intended scale. For Hacker/Fisher, distinguish the design projection from production output; for Tech, assess the direct game-renderer capture.
5. Finish quality against Granny Volt's craft standard without copying her template.
6. Any unintended overlap with existing roster characters, especially Tech vs Clinic, Hacker vs Vendor/Referee, and Fisher vs Guard/Cook.

Use the project construction standard and QA guide for definitions. IoU/similarity values are review prompts, not hard gates. The 100-point scorecard is non-gating; do not invent ratio targets or numeric score floors.

## Internal QA findings and non-blocking notes

### Tech
- Native 64×96: 4/4; direct game-renderer 28×42: 4/4.
- Edge contacts: 0.
- Tech role-debug: 4/4; explicit town spawn and native 1× close-up present.
- Wider directional/visual integrity: 92/92; face uniqueness 23/23; general role-debug 12/12.
- Prop audit, gallery, Granny checks: PASS; page/script errors: 0.
- Overall Actions concluded failure only at the unapproved golden-snapshot baseline (1 match / 23 changed) and existing audio/resource diagnostics (180 HTTP 404 console errors across 46 URL entries). No snapshots or provenance changed.

### Hacker and Fisher
- Corrected Run #7 rendered complete 1680×1720 source sheet.
- All eight directional views captured at native 64×96 and design-projection 28×42; true 4× nearest-neighbour enlargements generated.
- Internal QA: both characters PASS; no visible clipping, detached large components, duplicate limbs or duplicate props.
- Minor non-blocking implementation notes:
  - Hacker: preserve compact hand-to-slate connection; do not enlarge the slate at the expense of the silhouette.
  - Fisher: keep right-profile hip detail subordinate and clearly integrated into the garment.
  - Both: facial micro-expression details compress at 28×42; preserve major face/head cues rather than exaggerating small marks.

## Requested Claude response

Please return a separate verdict for each character and a batch-level comparative verdict:

- **PASS / PASS WITH NON-BLOCKING NOTES / CHANGES REQUIRED** for each character.
- Identify any P0/P1 blockers separately from polish suggestions. If changes are required, specify exact character, direction, scale, visible defect, and minimal correction.
- For Tech, judge the production renderer evidence and game integration.
- For Hacker/Fisher, judge finished design-stage artwork only; do not imply production renderer QA.
- Identify any cross-character similarity or role-readability concern with concrete pair/direction evidence.
- Confirm whether the three designs meet the Granny Volt craft benchmark while retaining original identities.
- Do not ask for another render unless a specific defect cannot be judged from the supplied evidence.

## Approval and implementation gates

- Internal QA: **complete** for all three at their respective evidence stages.
- Claude independent review: **pending**.
- Owner acceptance: **pending** (Tech rendered-art acceptance; Hacker/Fisher finished-art acceptance).
- Hacker/Fisher production renderer implementation: **held** until Tech's independent review and owner rendered-art acceptance are complete, and the owner accepts their finished designs.
- No golden snapshots or snapshot provenance were changed or approved in this work.
