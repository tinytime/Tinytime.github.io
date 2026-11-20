## Fourth civilian batch — post-silhouette identity/construction cards 02 (2026-11-20)

The owner-approved revision 21 silhouettes are now the fixed baseline for the next design stage. The three complete identity/construction cards are in [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-02.md](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-02.md).

- **Approved silhouette source:** commit `be1c0c012894ccae23b4cbce2ad06e523fb460c5`; SVG blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`; [revision 21 SVG](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg).
- **Silhouette QA evidence:** [Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854). Focused design-source checks passed; overall browser workflow remains failed on unrelated global audio/resource 404 and unapproved golden-snapshot gates. No snapshots/provenance changed.
- **Construction families assigned for this design proposal:** Sailor — Narrow Deck-Coat / Vertical Utility Shell; Slicker — Integrated Hooded Rain-Smock Shell; Painter — Offset Artisan Smock / Reaching-Arm Shell. These are descriptive, character-specific roster family tags, not reusable templates or quota targets.
- **Baseline protection:** no approved revision-21 SVG geometry was changed. Branch HEAD also contains a later revision-22 exploration (`f39f450a361668d60f3eb77f0e93ab804f848070`); it is a separate unapproved proposal and is not used as the baseline for these cards.
- **Stage status:** cards submitted for internal QA and owner review. Face studies remain proposals. No final palette/rendering, production renderer/integration, golden snapshot/provenance work, or roster #15–23 work is authorized.

---

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

## Owner approval and next NPC batch — 2026-11-20

The owner approved the third civilian batch: Tech (#9), Hacker (#10), Fisher (#11). Tech is approved as a production-renderer character; Hacker/Fisher are approved at finished design-art stage and do not yet have production renderer integrations. Claude's post-correction re-review remains unrecorded. The next three roster entries are Sailor (#12), Slicker (#13), Painter (#14). Their identity and silhouette preflight is [here](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md); all concepts remain proposed pending owner review. Do not begin renderer implementation before silhouette/construction approval.

## Third civilian batch — review correction checkpoint (2026-11-20)

Claude's initial batch verdicts and ChatGPT's implemented corrections are documented in [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md). Tech (#9) now has a darker desaturated petrol shell and squared storm-flap shoulder; targeted production-renderer QA passed in Run #648. Hacker (#10) has a narrowed front chest, separated bare forearm, tapered left-profile drape and clearer temple/earbud; Fisher (#11) has an integrated right-profile pouch, ochre rear smock and removed unexplained inter-leg bar. Hacker/Fisher Run #9 design rendering succeeded and was visually inspected; these are design-stage projections only. Independent Claude re-review and owner acceptance are pending. Do not start Hacker/Fisher production renderer implementation until Tech clears its independent review and owner approval, and owner accepts their finished designs.

# Project Overview

## Current authority — 2026-11-20

- **Combined independent review handoff:** [Third-batch Claude review package](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md) covers Tech (#9), Hacker (#10) and Fisher (#11) with stage boundaries explicit. Tech is internally QA-passed at production-renderer stage (Run #644); Hacker/Fisher passed finished design-stage QA using corrected Playwright Run #7. Claude review and owner acceptance are pending. Hacker/Fisher renderer implementation remains held; no further design render is required for review.
- **Third batch — Tech renderer QA checkpoint:** Tech (#9) is implemented, targeted automated QA-passed, and visually inspected against Run #644 / artifact `14634020084` at exact branch HEAD `579f0fff61b8cfd4e416cc59381187b162d3b8ca`. Four directions passed at native 64×96 and direct 28×42 with zero edge contacts; role-debug 4/4; explicit live street spawn and native 1× close-up; wider directional/visual integrity 92/92; face uniqueness 23/23; gallery, prop and Granny checks pass; page/script errors 0. Profile shell/hand correction and rear service-loop correction were visually verified. Clinic/Tech IoU remains a human-review prompt (back 0.878, front 0.892, right 0.856), not a hard gate. Overall Actions remains red only on the unapproved snapshot baseline and existing audio/resource 404s. Tech is ready for Claude's exact-output review; rendered-art owner approval is pending. Hacker and Fisher remain held pending that review and owner approval. No golden snapshots changed.
- **Scope protection:** Tech-only renderer corrections were confined to `drawTechVector`; no other approved civilian renderer, golden snapshot or snapshot provenance was changed. Hacker and Fisher renderers remain untouched.
- **Hacker (#10) and Fisher (#11) design-stage work:** owner-authorized without reopening the accepted round-05 silhouettes. Corrected Playwright Run #7 tested source `2b08e60d4814846923e133503f965532bde055ad`; render, syntax, and capture generation passed, and artifact `14634776106` uploaded. ChatGPT inspected the corrected full sheet and all scale montages; Hacker's single front slate now has a clear supporting-hand overlap, and prop handedness/profile visibility is consistent for both characters. The workflow's commit/push step failed on a non-fast-forward branch race, so corrected PNGs remain in the artifact rather than committed repository files. This is design-stage evidence only; owner acceptance is pending and renderer implementation remains blocked on Tech's independent review and owner rendered-art approval. No renderer or golden snapshot changed.

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
