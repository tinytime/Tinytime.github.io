

## Current Guard, Vendor and Clinic QA status — 2026-11-20

The latest completed QA remains [Run #626](https://github.com/tinytime/Tinytime.github.io/actions/runs/44673031471), tested commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`, artifact `14599664923`. Claude reviewed that output and requested a final focused pass on Guard's right-profile forearm, Guard/Vendor profile face cues, and Clinic's near-side kit strap. Those changes are committed in `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`; fresh browser QA and visual inspection are pending. Run #626's overall failure remains attributable to the unapproved golden-snapshot gate (1 match / 23 changed) and 180 existing audio/resource 404 console errors; no golden snapshots were changed. The remaining 17 civilians stay on hold.

## Claude targeted re-review and follow-up — 2026-11-20

Claude reviewed the corrected Run #626 package at renderer commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`. The Vendor right-profile tray/hand correction is resolved; the Guard right-profile arm remains too small; Clinic right profile lacks a near-side kit cue and has the highest remaining pair overlap with Guard at IoU 0.87; Guard and Vendor profile faces still read blank at game scale. Front/back views are unchanged and retain the prior assessment. No blocking defects were reported, but Claude recommended one more focused pass on these three profile-readability areas.

ChatGPT implemented that focused pass in `npc_sprites.js` commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`: extended Guard's right-profile forearm into a visible steel bracer and hand; strengthened Guard and Vendor profile eye/brow marks; and added a narrow near-side Clinic pouch strap/buckle cue to the right profile without moving or duplicating the pouch. This is implementation only. Fresh browser QA, artifact inspection at native 64×96 and direct 28×42 scales, and a new Claude review are pending. Preserve all front/back designs, unrelated civilians, accepted exceptions, and golden snapshots. Do not start the remaining 17 civilians until the independent review and explicit owner approval gates are complete.

## Latest work — Guard, Vendor and Clinic Run #627 (2026-11-20)

Fresh QA and internal visual inspection are complete for renderer commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`. [Run #627](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457) produced artifact [14611292138](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457/artifacts/14611292138). Targeted capture/integrity checks pass, but overall Actions failed on existing global snapshot/audio-resource diagnostics. Claude's corrected-output review and owner approval are pending; the remaining 17 civilians remain on hold. See the [Run #627 review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).

## Latest QA — Vendor profile follow-up (2026-11-20)

Run #628 tested `a8f3689` ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539)). Targeted vector checks passed, but overall Actions failed on the unapproved golden snapshot gate and existing audio/resource 404s. Manual game-scale inspection found Vendor's eye still needed repositioning. Follow-up commit `2bc1629` is under Run #629; inspect that artifact before Claude review or owner approval. Remaining 17 civilians remain on hold; golden snapshots untouched.
