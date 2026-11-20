

## Current Guard, Vendor and Clinic QA status — Run #628 (2026-11-20)

The latest completed QA is [Run #628](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), testing commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`, artifact `14612581539`. Vendor profile eye/brow placement was corrected and internally inspected at native 64×96 and direct 28×42; Guard and Clinic profile details remain intact. Targeted capture, integrity, face-distinctness, prop and gallery checks pass. Overall Actions remains failed on the unapproved golden-snapshot gate (1 match / 23 changed) and 180 existing audio/resource 404 console errors; no golden snapshots were changed. Claude's exact-output review and owner approval are pending. The remaining 17 civilians stay on hold.

## Claude targeted re-review and follow-up — 2026-11-20

Claude reviewed the corrected Run #626 package at renderer commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`. The Vendor right-profile tray/hand correction is resolved; the Guard right-profile arm remains too small; Clinic right profile lacks a near-side kit cue and has the highest remaining pair overlap with Guard at IoU 0.87; Guard and Vendor profile faces still read blank at game scale. Front/back views are unchanged and retain the prior assessment. No blocking defects were reported, but Claude recommended one more focused pass on these three profile-readability areas.

ChatGPT implemented that focused pass in `npc_sprites.js` commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`: extended Guard's right-profile forearm into a visible steel bracer and hand; strengthened Guard and Vendor profile eye/brow marks; and added a narrow near-side Clinic pouch strap/buckle cue to the right profile without moving or duplicating the pouch. This is implementation only. Fresh browser QA, artifact inspection at native 64×96 and direct 28×42 scales, and a new Claude review are pending. Preserve all front/back designs, unrelated civilians, accepted exceptions, and golden snapshots. Do not start the remaining 17 civilians until the independent review and explicit owner approval gates are complete.

## Latest work — Guard, Vendor and Clinic Run #627 (2026-11-20)

Fresh QA and internal visual inspection are complete for renderer commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`. [Run #627](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457) produced artifact [14611292138](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457/artifacts/14611292138). Targeted capture/integrity checks pass, but overall Actions failed on existing global snapshot/audio-resource diagnostics. Claude's corrected-output review and owner approval are pending; the remaining 17 civilians remain on hold. See the [Run #627 review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).

## Latest QA — Vendor profile follow-up (2026-11-20)

Run #628 tested `a8f3689` ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539)). Targeted vector checks passed, but overall Actions failed on the unapproved golden snapshot gate and existing audio/resource 404s. Manual game-scale inspection found Vendor's eye still needed repositioning. Follow-up commit `2bc1629` is under Run #629; inspect that artifact before Claude review or owner approval. Remaining 17 civilians remain on hold; golden snapshots untouched.


## Guard, Vendor and Clinic — Run #628 (2026-11-20)

- Tested renderer commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`; [Run #628](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539). Overall Actions **FAILED** at browser diagnostics. Syntax, inventory, semantic annotation validation, capture/evidence generation and artifact upload passed.
- The only renderer change since Run #627 is Vendor profile eye/brow placement. Inspected actual native and direct 28×42 profile montages plus enlarged Vendor L/R face crops. The marks now read in both profiles at native scale; at direct game scale they are subtle but visible. Cap brim/ear clearance is maintained. Guard right-profile forearm/bracer/hand and Clinic right-profile strap/coil remain present. No visible clipping or detached components in the inspected profile captures.
- Capture and integrity checks: Guard/Vendor/Clinic 12/12 native and 12/12 direct game-scale captures; wider five-civilian sheet 20/20 native and 20/20 direct game-scale; directional integrity 92/92; visual integrity 92/92; zero edge contacts; face uniqueness 23/23 at both scales; role debug 12/12; prop audit PASS; gallery and Granny directional checks PASS. pageErrors=0; scriptErrors=0.
- Silhouette diagnostics are review prompts only: maximum full-character IoU 0.9065 (back Coach/Guard); 0.85 remains a human-review trigger, not a gate. Preserve previously accepted distinctions/exceptions and do not redesign solely to chase overlap values.
- Global blockers: unapproved golden snapshot baseline (1 match / 23 changed, no missing) and 180 existing audio/resource HTTP 404 console errors across 46 URL entries. No golden snapshots or provenance changed.
- Next: Claude independently reviews the exact Run #628 artifact/commit, especially Vendor profile facial marks at both scales and preservation of tray/hand, Guard and Clinic details. Then owner makes explicit final decision. The three-character batch is not approved complete; remaining 17 stay on hold.

## Latest QA — Guard, Vendor and Clinic Run #629 (2026-11-20)

Vendor's final profile-eye placement correction is implemented and visually verified at native and direct game scales. [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), artifact [14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475), passes targeted vector capture/integrity checks but overall Actions remains failed on the unapproved golden snapshot gate and existing audio/resource 404s. No snapshots changed. Claude's independent review and owner approval remain pending; the remaining 17 civilians remain on hold.
