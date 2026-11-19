# Claude Independent Review Package — First Vector Civilian Pilot

**Purpose:** Independent comparative visual review of Usher, Cook, and Courier against Granny Volt's approved 10/10 quality benchmark.

**Requested reviewer:** Claude (independent reviewer)  
**Project owner:** Final approval authority  
**Builder:** ChatGPT  
**Review status:** Initial independent review received; Courier corrections in progress. No pilot character is approved by this package.

## Exact source and evidence

- Repository: https://github.com/tinytime/Tinytime.github.io
- Branch: `npc-granny-baseline-overhaul`
- Combined source commit used for the review artifact: [`a006d3cee143b7ac7b3a4ec2ed614eb0f604a551`](https://github.com/tinytime/Tinytime.github.io/commit/a006d3cee143b7ac7b3a4ec2ed614eb0f604a551)
- Latest renderer commit for Courier: [`87227b217fead5134d9dd375e67139c13097f49c`](https://github.com/tinytime/Tinytime.github.io/commit/87227b217fead5134d9dd375e67139c13097f49c)
- Cook renderer refinement: [`5ed3f49cd7c7767a716383945236a33b4c82dcb8`](https://github.com/tinytime/Tinytime.github.io/commit/5ed3f49cd7c7767a716383945236a33b4c82dcb8)
- QA workflow: [Run #44539341875](https://github.com/tinytime/Tinytime.github.io/actions/runs/44539341875)
- Artifact: `vapor-city-browser-qa` (artifact ID `14537616516`; available from the run's Artifacts section; artifact expiry shown by GitHub)
- QA report in artifact: `report.json`, sourceCommitSha `a006d3cee143b7ac7b3a4ec2ed614eb0f604a551`

## Required artifact files

Inspect the actual rendered PNGs, not only source code or report metrics:

- Four directions at native 64×96: `npc-type-directions/usher-{front,back,left,right}.png`, `cook-{front,back,left,right}.png`, and `courier-{front,back,left,right}.png`.
- Granny baseline: `npc-snapshots/granny.png` and `granny-before-after-4x.png`.
- Pilot comparison and construction: `npc-gallery-4x.png`, `npc-gallery-1x.png`, `cook-courier-usher-role-debug-8x.png`.
- Game context: `game-town-1x.png` and `game-menu-1x.png`.
- Supporting diagnostics: `report.json`, `torso-pair-diagnostics.png`, `npc-atlas-vs-renderer-4x.png`.

## Internal QA status (ChatGPT)

All three pilot characters have passed their character-specific internal QA and are **BUILT — NOT APPROVED**.

- **Usher:** targeted palette/body/face/role/prop and four-direction checks passed in prior QA; included again in the combined gallery and current QA artifact.
- **Cook:** internal QA passed on run #44537588645, artifact #14536893339; front/back/left/right inspected; revised pan grip and rear silhouette addressed.
- **Courier:** internal QA passed on run #44539341875, artifact #14537616516. Syntax/module/inventory, palette, body/baseline/contrast, face distinctness, prop, 92-capture visual-integrity, town and gallery checks passed. All four directions inspected. Courier/Cook back-view full-body silhouette IoU is 0.8517, below the 0.90 pair threshold.

The combined run's overall workflow is **FAILED**, not because of a new pilot-specific defect:
1. Legacy full-civilian silhouette audit still flags Clinic/Sailor front (IoU 0.9094), Coach/Vendor front (0.8990) and Coach/Vendor back (0.8912).
2. Golden snapshots are explicitly unapproved; 23 snapshots differ and one matches. Do not refresh or approve them as part of this review.
3. The browser log contains 135 audio-resource 404 console errors. Reported scriptErrors and pageErrors are both empty.

These global failures must be evaluated separately from the three pilots. The internal QA pass is not an approval.

## Review criteria

Please independently score each of Usher, Cook, and Courier from 1–10 against Granny's finish and consistency, and provide:

1. Overall quality score and approve/reject recommendation for each character.
2. Silhouette identity at native size and thumbnail size; compare all three pilots against each other and Granny.
3. Face/expression quality and distinction.
4. Clothing construction, material cues, layering, seams, and finish.
5. Palette cohesion and differentiation.
6. Prop design, grip/attachment, readability at native game scale, and correct direction-specific placement.
7. Front/back/left/right completeness and consistency; identify any weak direction.
8. Foot placement, scale, clipping, and town/gallery integration.
9. Specific defects ranked by severity, with concrete corrections.
10. Whether the three-character batch is collectively ready for owner approval after any required fixes.

Do not give credit solely for passing automated checks. Do not approve based on code inspection alone. Use the screenshots in the artifact as the primary visual evidence and source code only to clarify construction.

## Approval boundary

Claude's review is advisory and independent. ChatGPT will assess each finding, implement valid corrections, and rerun QA. The project owner makes the final approval decision. Until both stages are complete, tracker status remains **NOT APPROVED** for all three pilots. Do not begin the remaining 20 civilians before this review and owner approval.


## Independent Claude review received — 2026-11-19

Claude inspected the 18-image package and recommended approval after specified fixes and reinspection. Usher and Cook had no required character fixes. Courier required: (1) a readable face/profile in left/right views (major); (2) one consistent messenger satchel across front/back/left/right, on the character's right hip in the rear view (major); and (3) removal or attachment of the detached cyan hem stripe in back/side views (minor). Optional polish: Cook's face/pan consistency; Usher's side-view prop readability, outline contrast and leg stance. QA clarification: the package's 0.90 rendered pair threshold does not explain legacy Coach/Vendor flags at 0.8990 and 0.8912; document the distinct threshold(s) used by the legacy audit.

**Correction commit:** `98dbcda2a32fa506ba355f12ddd449db3322a4b4` updates Courier's side profile and messenger-bag consistency and removes the detached hem stripe. This change is not yet browser-tested or visually re-reviewed. The reviewer's recommendation is advisory; owner approval remains required. Do not refresh or approve golden snapshots.

## Courier correction follow-up evidence — ready for Claude re-review

**Follow-up status:** Internal QA Coordinator verification complete; Claude focused re-review not yet submitted.

- Correction source commit: [`98dbcda2a32fa506ba355f12ddd449db3322a4b4`](https://github.com/tinytime/Tinytime.github.io/commit/98dbcda2a32fa506ba355f12ddd449db3322a4b4)
- Browser QA run: [#410 / 44542492048](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048)
- Artifact: `vapor-city-browser-qa`, ID `14537384741`
- Exact tested source SHA in `report.json`: `98dbcda2a32fa506ba355f12ddd449db3322a4b4`

Please inspect these updated files from artifact `14537384741`:
- `npc-type-directions/courier-front.png`
- `npc-type-directions/courier-back.png`
- `npc-type-directions/courier-left.png`
- `npc-type-directions/courier-right.png`
- `cook-courier-usher-role-debug-8x.png`
- `npc-gallery-4x.png`
- `game-town-1x.png`

The QA Coordinator independently verified that the left/right face profiles are now readable; the same messenger satchel is used in all views and is on the character's right hip (viewer-right) in the rear view; the detached cyan hem stripe is gone; and the parcel remains visibly held. Courier-specific targeted checks passed, including the 92-capture integrity audit, prop audit, native/game-scale face distinctness, role-debug, town and gallery. No page/script errors.

The overall workflow still fails on global legacy silhouette overlaps (max rendered IoU 0.909429 for Clinic/Sailor front, plus Coach/Vendor, Sailor/Welder and Clinic/Welder pairs) and the explicitly unapproved golden-snapshot baseline (23 changed, 1 match). 135 audio-resource 404s were logged. These are separate from the Courier corrections; no snapshots were changed or approved.

**Focused review request:** Reassess only the three previously required Courier findings against these corrected images, and state whether each is resolved. Also note any newly visible defect that should block the pilot. Usher and Cook remain as previously reviewed. Do not treat this QA verification as Claude approval; project-owner approval remains mandatory.

## QA Coordinator verification and focused Courier follow-up package — 2026-11-19

- Current branch head: `db3f958351aa9994fab544dfb915ea0e2424708d`. The 12 commits after tested source `98dbcda2a32fa506ba355f12ddd449db3322a4b4` are documentation-only; no renderer/game/QA source changed.
- Run #410: [44542492048](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048), job `135624264131`, artifact `14537384741`.
- QA Coordinator re-inspected Courier's native four-direction captures, role-debug, gallery and town screenshot. The three previously required fixes are resolved in the evidence: side profiles show a readable face; the compact satchel is consistent across views and is on viewer-right in rear view; detached cyan hem stripe is absent. Parcel remains visibly held.
- Targeted checks pass. Workflow still fails on the single strict full-body silhouette violation Clinic/Sailor front IoU 0.909429 (>0.90) and unapproved golden snapshots (23 changed, 1 match). Coach/Vendor front 0.898985 and back 0.891175, Sailor/Welder back 0.889290, Clinic/Sailor back 0.884215, Clinic/Welder back 0.871764, and Cook/Courier back 0.863465 are below 0.90 and are nearest pairs, not failing pairs. The separate legacy archetype `silhouetteQualityCheck` uses <0.85 and passes (max 0.827467). No golden snapshots were changed or approved.
- Focused reviewer handoff ZIP prepared: `vapor-city-courier-claude-rereview.zip` (brief + four Courier directions + role-debug + gallery + town + Granny context + report). **Not yet sent to Claude; no follow-up review received.**

**QA Coordinator verdict:** Courier's three requested corrections pass internal visual verification. Ready for Claude focused re-review, not yet independently approved. The three-pilot batch remains NOT APPROVED pending Claude's response and owner acceptance; do not start the remaining 20.
