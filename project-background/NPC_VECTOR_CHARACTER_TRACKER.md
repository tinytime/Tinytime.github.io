## Tech, Hacker and Fisher — round-05 silhouette render (2026-11-20)

- **Art inspection:** PASS for all 12 silhouette views. Reviewer comparison reported black-silhouette IoU 0.997 against an independent render; the small difference was attributed to anti-aliasing. Tech's ear-cup cue, left-profile meter contact, Fisher's short right-profile hood lip, dark rear yoke with seams, and dark resting right-profile hand with knuckle seam were confirmed.
- **Text correction:** the first 3× PNG had two clipped text blocks at the right edge. Both were wrapped in the canonical SVG in commit `e25ac611ee17d12771cbf2815001b78f43090d7f`.
- **Final sheet render:** GitHub Actions [Run #2](https://github.com/tinytime/Tinytime.github.io/actions/runs/44739247661) succeeded. Chromium rendered exact 3× scale: 4800×3540 pixels. The generated PNG was retrieved and visually inspected; both wrapped text blocks are complete and clear of the right canvas edge. Artifact `14630192008`.
- PNG path: `project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-ROUND-05-3X.png`.
- **Approval gate:** art inspection is passed and the review sheet is render-complete. Explicit project-owner silhouette approval is still required before renderer implementation. Do not begin Tech until that approval is recorded.
- Renderer implementation, native 64×96 captures, direct 28×42 captures and game-scale renderer QA have not occurred. No golden snapshots were changed.

## Guard, Vendor and Clinic — corrected renderer QA (2026-11-20)

- Claude's targeted review findings were implemented in renderer commit `27c414b46d560ae9b4e2dd0f67b1936ce3d8f3c8`: Guard right-profile near-arm/hand cue; Vendor right-profile supporting hand/tray lip; clearer Guard and Vendor profile eye/brow marks; Clinic profile coil/tie shifted rearward for distinction.
- Run #625 ([run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44672166234), artifact `14599579908`) generated complete evidence but failed browser diagnostics. Its artifact was inspected. The Vendor right-profile tray/hand cue was then moved inward in renderer commit `8cc6836d4eff0a3cb8fcd997373da17769564e20` to keep the cue within the sprite frame.
- Run #626 ([run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44673031471), artifact `14599664923`) tested the exact follow-up commit and completed FAILED on global gates: unapproved golden snapshots (1 match / 23 changed) and 180 existing resource/audio 404 console errors. Semantic validation, 12/12 native and 12/12 direct game-scale captures, role debug 12/12, prop audit, directional integrity 92/92, zero edge contacts/detached large components, gallery and Granny directional checks passed.
- ChatGPT inspected all 12 native 64×96 and all 12 direct 28×42 captures. Guard's near arm/hand and Vendor's tray lip/supporting hand read in profile; Clinic's rear coil/tie helps distinguish the profile. No visible clipping or detached components were found. The Clinic pouch remains on the far side and is not visible in the right profile; the alternative coil-placement distinction is present.
- Status: Claude reviewed Run #626 and requested one final focused profile pass; implementation is committed as `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`. Fresh QA and artifact inspection are pending, followed by Claude's re-review of that exact output and owner approval. Do not alter golden snapshots or start the remaining 17. No approval is implied by implementation or automated passes.

## Claude targeted re-review and follow-up — 2026-11-20

Claude reviewed the corrected Run #626 package at renderer commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`. The Vendor right-profile tray/hand correction is resolved; the Guard right-profile arm remains too small; Clinic right profile lacks a near-side kit cue and has the highest remaining pair overlap with Guard at IoU 0.87; Guard and Vendor profile faces still read blank at game scale. Front/back views are unchanged and retain the prior assessment. No blocking defects were reported, but Claude recommended one more focused pass on these three profile-readability areas.

ChatGPT implemented that focused pass in `npc_sprites.js` commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`: extended Guard's right-profile forearm into a visible steel bracer and hand; strengthened Guard and Vendor profile eye/brow marks; and added a narrow near-side Clinic pouch strap/buckle cue to the right profile without moving or duplicating the pouch. This is implementation only. Fresh browser QA, artifact inspection at native 64×96 and direct 28×42 scales, and a new Claude review are pending. Preserve all front/back designs, unrelated civilians, accepted exceptions, and golden snapshots. Do not start the remaining 17 civilians until the independent review and explicit owner approval gates are complete.

## Guard, Vendor and Clinic — Run #627 (2026-11-20)

- Renderer commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b` received fresh browser QA [Run #627](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457), artifact [14611292138](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457/artifacts/14611292138). Overall Actions **FAILED** on browser diagnostics (unapproved golden snapshots and existing audio/resource 404s); targeted vector checks passed.
- All 12 native 64×96 and 12 direct 28×42 captures were inspected. Profile-only changes confirmed against Run #626; front/back remain byte-identical. Guard right forearm/bracer/hand, Guard/Vendor profile face marks, and Clinic right-profile near-side strap/buckle are visible. No clipping or detached geometry. Directional integrity 92/92, zero edge contacts, zero detached large components, profile face uniqueness 23/23, prop audit/gallery/town checks pass.
- Guard/Clinic right-profile full-character IoU 0.8547 remains a human-review prompt only; Vendor/Clinic right profile is 0.8326. Claude must provide the independent disposition on the exact Run #627 output. No owner approval yet; do not start the remaining 17 civilians.
- Evidence and Claude review criteria: [Run #627 review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).

## Guard, Vendor and Clinic — Run #628 / Run #629 follow-up (2026-11-20)

- Run #628 tested `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`: [Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539). Targeted captures and integrity checks pass, but overall Actions failed at browser diagnostics (unapproved golden snapshots and existing audio/resource 404s). No snapshots changed.
- All 12 native 64×96 and 12 direct 28×42 captures inspected. 92/92 directional integrity, zero edge contacts/detached large components, 23/23 unique faces at both scales, prop/gallery/town checks pass. Internal visual inspection found Vendor eye still insufficiently legible at game scale.
- Focused placement correction committed: `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`. Run #629 is in progress; do not close the Vendor face item until its direct 28×42 captures are visually inspected. Claude review and owner approval remain pending. Remaining 17 civilians stay on hold.


## Guard, Vendor and Clinic — Run #628 (2026-11-20)

- Tested renderer commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`; [Run #628](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539). Overall Actions **FAILED** at browser diagnostics. Syntax, inventory, semantic annotation validation, capture/evidence generation and artifact upload passed.
- The only renderer change since Run #627 is Vendor profile eye/brow placement. Inspected actual native and direct 28×42 profile montages plus enlarged Vendor L/R face crops. The marks now read in both profiles at native scale; at direct game scale they are subtle but visible. Cap brim/ear clearance is maintained. Guard right-profile forearm/bracer/hand and Clinic right-profile strap/coil remain present. No visible clipping or detached components in the inspected profile captures.
- Capture and integrity checks: Guard/Vendor/Clinic 12/12 native and 12/12 direct game-scale captures; wider five-civilian sheet 20/20 native and 20/20 direct game-scale; directional integrity 92/92; visual integrity 92/92; zero edge contacts; face uniqueness 23/23 at both scales; role debug 12/12; prop audit PASS; gallery and Granny directional checks PASS. pageErrors=0; scriptErrors=0.
- Silhouette diagnostics are review prompts only: maximum full-character IoU 0.9065 (back Coach/Guard); 0.85 remains a human-review trigger, not a gate. Preserve previously accepted distinctions/exceptions and do not redesign solely to chase overlap values.
- Global blockers: unapproved golden snapshot baseline (1 match / 23 changed, no missing) and 180 existing audio/resource HTTP 404 console errors across 46 URL entries. No golden snapshots or provenance changed.
- Next: Claude independently reviews the exact Run #628 artifact/commit, especially Vendor profile facial marks at both scales and preservation of tray/hand, Guard and Clinic details. Then owner makes explicit final decision. The three-character batch is not approved complete; remaining 17 stay on hold.

## Guard, Vendor and Clinic — Run #629 (2026-11-20)

- Renderer commit `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32` received fresh QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), artifact [14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Overall Actions failed on global browser diagnostics (unapproved golden snapshots and existing audio/resource 404s); targeted vector checks pass.
- Internal inspection confirms Vendor profile eye is now legible in left/right native 64×96 and direct 28×42 captures. Guard and Clinic profile details retained. Capture audit 12/12 at both scales, directional integrity 92/92, zero edge contacts/detached components, face uniqueness 23/23 at both scales, prop/gallery/town checks pass.
- **Owner approval:** received 2026-11-20 for the rendered Guard, Vendor and Clinic Worker batch, based on Run #629.
- **Claude independent review:** exact-output review of Run #629 is still pending and must be logged before formal batch closeout. Keep remaining 17 civilians on hold until that gate is complete. Do not modify golden snapshots.


## Guard, Vendor and Clinic — Run #629 and owner decision (2026-11-20)

- Final renderer source for this round: [`2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`](https://github.com/tinytime/Tinytime.github.io/commit/2bc1629edd82afc1a50ac7a4ab882b428dbd0c32). The final focused change moved Vendor's profile eye/brow inward onto the visible cheek plane after Run #628's automated face-distinctness checks passed but manual direct-game-scale inspection found the mark insufficiently legible.
- Browser QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), [artifact 14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Targeted vector/capture checks pass; overall Actions remains failed on the unapproved golden snapshot baseline (1 match / 23 changed) and existing audio/resource 404 console errors. No golden snapshots or provenance were changed.
- Inspected the exact Run #629 artifact: 12/12 native 64×96 and 12/12 direct 28×42 captures for Guard/Vendor/Clinic; Vendor's left and right profile eye now reads in both scales. Guard's near-side forearm/bracer/hand and Clinic's right-profile cord/coil remain present. Directional integrity 92/92, zero edge contacts and detached components, face distinctness 23/23 at both scales, prop audit, gallery, town smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- **Owner decision:** the project owner explicitly approved the rendered Guard, Vendor and Clinic Worker batch on 2026-11-20 after the Run #629 evidence review.
- **Independent-review record:** Claude's final independent review of this exact Run #629 commit/artifact is not yet recorded in the repository. Per the governing approval process, retain that as the outstanding independent-review gate; do not label the batch fully closed or release the remaining 17 until the exact-output review is logged. This records the owner's approval without fabricating reviewer sign-off.
- No golden snapshots changed. Existing global Actions blockers are tracked separately from the passing character-specific evidence.


## Third civilian batch — Tech, Hacker and Fisher (2026-11-20)

- Owner directed preparation to proceed without returning the prior Guard/Vendor/Clinic Run #629 output to Claude. This does not imply a Claude verdict on Run #629; its exact-output review remains historically unrecorded.
- Prepared individual role/personality, silhouette, face, must-survive, palette and prop-contact briefs for **Tech (#9), Hacker (#10) and Fisher (#11)**.
- Round 04 was reviewed at 3× and accepted except for Fisher's right-profile bill and Tech's left-profile meter contact. Round 05 shortens the right hood lip, brings Tech's meter against the torso with a connected forearm/wrist/hand chain, and reinforces Fisher's resting profile hand with a dark fill and subtle contour. All accepted round-04 construction is preserved.
- Owner feedback confirmed the round-03 front-view handedness, Hacker fringe distinction, reduced Fisher head and reduced Tech trouser flare as fixed or substantially fixed. Round 05 is **awaiting internal 3× render check before owner silhouette review; not approved**.
- No renderer code, existing civilian art, golden snapshot or baseline was changed. No game captures or renderer QA evidence exist for this batch yet.
- Next gate: explicit owner approval of the silhouettes. Then implement Tech, Hacker and Fisher one at a time, with full native 64×96 and direct 28×42 four-direction QA and visual inspection after each character.
- Package: [Tech/Hacker/Fisher preflight](qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-PREFLIGHT.md); [round-05 four-view silhouette exploration](qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg).
