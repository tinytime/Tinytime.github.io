# Project Overview

## Current authority — 2026-11-20

- **Third batch preflight — round 05:** Art-silhouette inspection passed across all 12 views (reported black-silhouette IoU 0.997; minor differences are anti-aliasing). The initial 3× sheet's two clipped text blocks were wrapped in SVG commit `e25ac611ee17d12771cbf2815001b78f43090d7f`; GitHub Actions [Run #2](https://github.com/tinytime/Tinytime.github.io/actions/runs/44739247661) successfully regenerated the 4800×3540 PNG and committed it (render commit `7b3decc`). ChatGPT visually checked the replacement sheet: both text blocks are fully visible and no right-edge clipping remains. The review sheet is render-complete; explicit owner silhouette approval is still required before any renderer implementation.
- **Scope protection:** no Tech/Hacker/Fisher renderer code, approved civilian art, golden snapshots or baselines were changed during round-04 silhouette preparation.

- Owner approval for the rendered Guard, Vendor and Clinic Worker batch was received on 2026-11-20, based on Run #629. Internal QA/visual inspection are complete; Claude's independent review of the exact final artifact remains pending. The remaining 17 stay on hold until that required review is recorded. (updated after Run #628)

- The first five civilians (Usher, Cook, Courier, Coach and Referee) are owner-approved. Preserve their accepted exceptions and do not make unrequested changes.
- Guard, Vendor and Clinic Worker Revision 02 designs are owner-approved. Claude reviewed Run #626 at source `8cc6836d4eff0a3cb8fcd997373da17769564e20` and requested one final focused profile-readability pass. ChatGPT implemented that pass in `npc_sprites.js` commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`: Guard right-profile forearm/bracer, stronger Guard/Vendor profile eye and brow marks, and a near-side Clinic pouch strap cue.
- Run #628 tested commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`; internal visual inspection confirms Vendor profile eye/brow visibility at native and direct game scale. Claude must independently review that exact output before the owner makes the final approval decision. The three-character batch is not yet approved as complete.
- Runner remains built but pending focused review and owner decision. The remaining 17 unstarted civilians remain on hold until the current batch passes internal QA, corrected-output Claude review, and explicit owner approval.
- Never approve or refresh golden snapshots without explicit owner authorization. Keep snapshot provenance and existing audio/resource 404s separate from character-art acceptance.

## Project purpose and review model

Vapor City is a browser-based game prototype. This workstream replaces legacy civilian pixel-art characters with individually designed, reusable vector-rendered characters. Granny Volt is the approved visual-quality benchmark, not a template. Every civilian needs an original silhouette, face, outfit, props, palette, and personality.

- **Project owner:** sets direction and makes final approval decisions.
- **Primary builder (ChatGPT):** implements, integrates, tests, inspects rendered evidence, and maintains documentation.
- **Independent reviewer (Claude):** evaluates completed work against Granny Volt and project standards; review does not replace owner approval.

See the [QA handoff](04-QA-AND-HANDOFF.md), [NPC tracker](NPC_VECTOR_CHARACTER_TRACKER.md), [technical implementation](03-TECHNICAL-IMPLEMENTATION.md), and [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md); consult the repository's current art-direction document for visual requirements.

## Latest Guard, Vendor and Clinic QA — Run #628 (2026-11-20)

Run #628 tested renderer commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f` ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539)). Internal inspection confirms Vendor L/R profile eye/brow visibility at native scale and subtle readability at direct 28×42; Guard and Clinic profile corrections remain intact. Capture/integrity checks pass. Overall Actions remains red on the unapproved golden snapshot gate and existing 180 audio/resource 404 console errors. Claude's corrected-output review and owner approval remain pending. The batch is not approved complete; remaining 17 civilians remain on hold. See the [Run #628 review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).

## Guard, Vendor and Clinic follow-up — 2026-11-20

Run #628 tested commit `a8f3689` ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539)). Targeted capture and integrity checks passed; overall workflow failed on browser diagnostics with the unapproved golden snapshot gate and existing audio/resource 404s. Manual inspection found the Vendor profile eye was still not sufficiently legible at game scale, so a focused cheek-plane placement correction was committed as `2bc1629`. Run #629 is pending inspection. Claude's independent review and owner approval remain outstanding; remaining 17 civilians stay on hold. See the linked QA package in the QA handoff.

## Latest Guard, Vendor and Clinic status — Run #629 (2026-11-20)

The Vendor profile eye correction in `2bc1629` has been visually verified in all four profile captures (left/right at native 64×96 and direct 28×42). Targeted capture and integrity checks pass in [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), artifact [14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Overall Actions remains failed on the unapproved golden snapshot gate and existing audio/resource 404s; no snapshots changed. Claude review and owner approval remain pending; the remaining 17 civilians stay on hold. See the QA handoff review package.


## Guard, Vendor and Clinic — Run #629 and owner decision (2026-11-20)

- Final renderer source for this round: [`2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`](https://github.com/tinytime/Tinytime.github.io/commit/2bc1629edd82afc1a50ac7a4ab882b428dbd0c32). The final focused change moved Vendor's profile eye/brow inward onto the visible cheek plane after Run #628's automated face-distinctness checks passed but manual direct-game-scale inspection found the mark insufficiently legible.
- Browser QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), [artifact 14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Targeted vector/capture checks pass; overall Actions remains failed on the unapproved golden snapshot baseline (1 match / 23 changed) and existing audio/resource 404 console errors. No golden snapshots or provenance were changed.
- Inspected the exact Run #629 artifact: 12/12 native 64×96 and 12/12 direct 28×42 captures for Guard/Vendor/Clinic; Vendor's left and right profile eye now reads in both scales. Guard's near-side forearm/bracer/hand and Clinic's right-profile cord/coil remain present. Directional integrity 92/92, zero edge contacts and detached components, face distinctness 23/23 at both scales, prop audit, gallery, town smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- **Owner decision:** the project owner explicitly approved the rendered Guard, Vendor and Clinic Worker batch on 2026-11-20 after the Run #629 evidence review.
- **Independent-review record:** Claude's final independent review of this exact Run #629 commit/artifact is not yet recorded in the repository. Per the governing approval process, retain that as the outstanding independent-review gate; do not label the batch fully closed or release the remaining 17 until the exact-output review is logged. This records the owner's approval without fabricating reviewer sign-off.
- No golden snapshots changed. Existing global Actions blockers are tracked separately from the passing character-specific evidence.
