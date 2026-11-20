# Project Overview

## Current authority — 2026-11-20

- **Independent review:** Claude Run #603 recommends the five-character set for owner review, reports no P0/P1 defects, confirms U4, and withdraws the earlier blanket-outline criticism. Review scope limitations are recorded in the Run #603 review log.
- **Owner approval:** Usher, Cook, Courier, Coach and Referee are **APPROVED — first five-character batch complete** by explicit owner decision on 2026-11-20.
- **Preserve:** Cook C1 remains deferred/accepted as-is; Usher U2 remains declined; Usher U4 is implemented and internally resolved; Coach/Courier rear X1 remains accepted. No renderer edits to these designs without renewed authorization.
- **Renderer/QA provenance:** renderer 2c00cfca09cc12ea19a72662c235beed2e9a19cb; Run #603 [tested the exact source](https://github.com/tinytime/Tinytime.github.io/actions/runs/44658311124), artifact 14593339734. Targeted U4 checks passed; overall Actions concluded failure on unapproved snapshots (1 match / 23 changed) and 180 existing audio 404s. No snapshots were refreshed or approved.
- **Construction standard:** Claude recommended ready with revisions; F2–F7 have been reconciled. The owner ratified the revised standard on 2026-11-19; it now governs new civilian production.
- **Next batch preparation:** Guard, Vendor and Clinic Worker have an existing Revision 02 design-only package: separately constructed front/back/left/right silhouettes for each character, front/profile face studies, per-direction prop/contact notes, construction cards and a matched roster comparison. The first silhouette exploration was returned for revision; the focused directional correction is committed and ready for owner design review. The matched comparison's embedded 64×96 images now preserve their native aspect ratio. Renderer production remains gated on explicit owner approval of the actual directional designs; no renderer implementation or browser QA has been performed for these proposals.
- **Runner:** already built, but excluded from Claude Run #603; remains pending a focused review and owner decision. It is not counted among the five approved.
- **Remaining 17:** production remains on hold pending owner approval of each next-batch brief/silhouette preflight. No golden snapshots were changed or approved.


## Historical build and approval status — pre-Run #602

- Owner authorized all four Claude P2 areas. Source corrections are implemented in renderer `3d1ec4bcbac231e99e75d36f21e79a5fcf7fd4eb`.
- Run #599 tested the exact renderer. It passes 92/92 directional integrity with zero edge contacts, 20/20 direct game-scale captures, 12/12 role-debug, prop audit and gallery. Page/script errors are zero.
- Visual inspection confirms Usher profile shoes separate; Cook pan is now shallow with a visible handle and no clipping; Usher/Cook/Courier have purposeful face-cue changes; Coach/Courier rear construction remains distinct without torso edits. Referee is pixel-identical to baseline.
- Before/after pixel diffs are recorded in the tracker and compare Run #595 with Run #599. Run #600 is building the black silhouette and town-ground diagnostic sheets.
- All five remain NOT APPROVED pending Claude re-review and owner approval. Runner remains excluded; remaining 17 ON HOLD. No golden snapshots or approvals changed.



## What this project is

Vapor City is a browser-based game prototype in this repository. This workstream is a visual and technical redesign of its civilian non-player characters (NPCs). The goal is to replace the current pixel-style civilian characters with individually designed, custom vector-rendered characters that look polished, readable, and consistent in the game world.

The intention is not to create one generic vector person and recolor it. Each civilian should have a recognizable identity, silhouette, face, clothing, palette, and role-specific details. The approved vector characters will be reusable across the game's towns.

## Why the work changed direction

The earlier pixel-oriented approach was not producing the desired character quality or distinctiveness. The project owner decided to move forward with custom vector rendering for the civilian roster. Granny Volt is already the visual quality benchmark. The first vector usher experiment demonstrated that the game can render a character using custom vector paths and gradients while retaining the game's placement and scale conventions.

The vector approach is now the chosen direction for the civilian redesign. Treat the existing pixel art as legacy implementation to be replaced for each character as that character is completed—not as a design template that every new character should imitate.

## Roles and review model

- **Project owner:** sets direction, approves designs, and decides when a batch is ready to expand.
- **Primary builder (ChatGPT):** owns implementation, integration, browser QA, artifact inspection, and documentation updates.
- **Independent reviewer (Claude):** reviews completed character designs critically against Granny Volt and the project's standards. Claude is a reviewer, not the primary implementer.

The builder should provide Claude with the actual rendered sheets, comparative images, relevant source, and a clear review brief. A reviewer should not be asked to approve from code descriptions alone.

## Current agreed plan

1. **Completed and owner-approved:** Usher, Cook, Courier, Coach and Referee. Claude Run #603 recommends owner review with no P0/P1 defects; the owner approved all five on 2026-11-20. Preserve their renderers and accepted exceptions.
2. **Built but not approved:** Runner. It was excluded from the Run #603 five-character review and requires a separate focused review before it can be counted as complete.
3. **Next draft batch:** Guard, Vendor and Clinic worker. Their draft briefs and the roster shell-family audit are in qa-artifacts/next-civilian-batch/.
4. **Production gate:** the revised construction standard was ratified by the owner on 2026-11-19. The Guard, Vendor and Clinic Worker Revision 02 four-direction design package is committed for owner review. Do not begin renderer production until the owner explicitly approves the actual directional silhouettes and construction.
5. **Remaining roster:** the 17 unstarted characters remain on production hold. Complete one character at a time with four-direction/native and direct game-scale evidence, internal QA, independent review and explicit owner approval.


## Scope and counts

The project tracker lists 23 civilian character types. Granny Volt is separate: she is the approved visual benchmark, not one of the 23 civilian redesigns. Fan variants are variants of the Fan character family, not extra base character types.

The repository's automated inventory currently describes 24 live civilian archetype mappings. That inventory count includes the Fan archetype and is separate from the 23-name redesign roster in the project tracker. Keep those two scopes distinct; do not change inventory policy or scope classifications casually.

## Key decisions already made

- Move from the prior pixel approach to bespoke vector-rendered civilians.
- Reuse the completed vector character designs across towns.
- Make the 23 civilians individually recognizable; avoid a shared-body recolor approach.
- Use Granny Volt as a 10/10 quality reference, not a template to copy.
- First five-character batch now owner-approved: Usher, Cook, Courier, Coach and Referee. Next draft production batch: Guard, Vendor and Clinic worker; Runner remains built but pending focused review.
- Require internal QA and independent review for each new batch; record the project owner's explicit final approval.
- Keep golden snapshot approval separate from automated QA. Never approve or refresh snapshots without explicit owner authorization.

## Current state at handoff

The five-character art review is complete. Usher, Cook, Courier, Coach and Referee are **APPROVED by the owner**. Run #603 tested renderer source 2c00cfca09cc12ea19a72662c235beed2e9a19cb; targeted checks passed, while the overall Actions conclusion remains failed on the unapproved snapshot baseline and existing audio 404s. See the current [QA handoff](04-QA-AND-HANDOFF.md) and [NPC tracker](NPC_VECTOR_CHARACTER_TRACKER.md).

Runner is built but excluded from Claude Run #603 and remains pending a focused review. The next design-review package is Guard, Vendor and Clinic Worker Revision 02: four separately constructed directions per character, face studies, contact/occlusion notes, construction cards and the corrected matched-scale roster comparison. The package is design-only and NOT APPROVED; no renderer implementation begins until the owner approves it. The approved five's art and accepted exceptions are protected from unrequested changes.


## Historical six-civilian polish and QA — 2026-11-19

The owner supplied review corrections for larger eye catchlights (Coach, Referee, Courier, Runner), Cook's toque and side-view pan, Runner's side stride, and Courier's forward lean. Inspection of the live renderer confirmed these design changes were already present in the source tested by run #453. The final renderer source `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0` keeps those changes, removes a redundant duplicate Runner leg draw, preserves Cook's existing eye treatment, and compresses the Cook toque crown vertically to ensure transparent headroom in all four views.

Browser QA [run #457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167) tested that exact source; artifact `14563778383`. All 24 native 64×96 images for the six completed civilians and 12 direct 28×42 Runner/Coach/Referee captures were inspected. Visual integrity passes 92/92 with zero edge contacts or detached components; role-debug 12/12, face distinctness 23/23, silhouette-quality 180/180, props, gallery and town regression pass. The Runner side stride reads as two legs/two feet; Cook's toque has transparent top headroom.

The overall workflow remains FAILED: Courier's body/baseline audit reports a 2px delta against a 1px vector threshold; the global Clinic/Sailor silhouette overlap remains (front IoU `0.9094292803970223`); golden snapshots remain unapproved (23 changed / 1 match); and 180 missing-audio 404 console errors remain. No snapshots were refreshed or approved. Usher, Cook and Courier retain owner approval; Runner, Coach and Referee remain NOT APPROVED pending Claude's independent six-character review and owner approval. The [five-civilian Claude review package](../qa-artifacts/five-civilian-full-review/README.md) contains the exact npc_sprites.js source and QA artifact links. The remaining 20 civilians remain on hold.


## Five-civilian Claude review scope — 2026-11-19

To fit Claude's available usage, the owner reduced the comparative review from six to five characters: **Usher, Cook, Courier, Coach and Referee**. Runner is intentionally excluded—not deleted, rejected or approved—because Runner, Coach and Referee share the athletic archetype. Keeping Coach and Referee preserves two distinct athletic-role examples while retaining civic, vendor and courier design families. Runner remains built and pending a later focused review.

The new [five-civilian review package](../qa-artifacts/five-civilian-full-review/README.md) is the handoff source. It explicitly provides the authoritative `npc_sprites.js` at exact tested source commit `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`, the raw source link, run #457's rendered evidence, and a detailed requirement for individual scores/verdicts plus a reusable Civilian Vector Build Standard. The main goal is to reduce future design iteration through clear preflight, construction and QA rules without imposing a generic character template.


## Owner authorization: reopen five-civilian correction pass — 2026-11-19

The owner explicitly authorized implementation of Claude's recommendations across all five reviewed characters, including reopening the previously approved Usher, Cook and Courier. The historical approvals are preserved, but current status is revision in progress. Coach and Referee remain not approved. Runner remains excluded from this pass.

Committed renderer changes: [027be47d8f6763f447992a9dec058ff62a7c60a3](https://github.com/tinytime/Tinytime.github.io/commit/027be47d8f6763f447992a9dec058ff62a7c60a3). Fresh browser QA and visual inspection are pending; run #457 applies to the previous source only. Do not start the remaining 20 or refresh golden snapshots.


## Civilian Vector Construction Standard — 2026-11-19

The owner authorized a permanent construction standard based on Granny Volt's measured geometry and quality strengths. See [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md). It formalizes the distinction between shared technical invariants and original character identity, adds a per-character proportion card, defines measurement conventions, proposes an eight-stage production pipeline and 100-point design scorecard, and identifies automated QA metrics.

The standard is a draft for Claude review and owner ratification. The numeric proportion bands and scoring thresholds are provisional and must be calibrated against Granny plus the five-character review set. The standard does not authorize starting the remaining 20 civilians or approving any pending design.

## Six-civilian construction-standard application — 2026-11-19

The draft Civilian Vector Construction Standard has been applied internally to all six built vector civilians (Usher, Cook, Courier, Runner, Coach, Referee). See [Six-Civilian Construction Standard Audit](SIX-CIVILIAN-CONSTRUCTION-AUDIT.md) for rendered evidence, per-character construction cards, provisional scorecard, current QA measurements, and calibration gaps. This internal six-character scope does not change the owner's current five-character Claude review scope; Runner remains excluded from that submission only. The remaining 20 civilians remain on hold.


**NPC Designer handoff:** [GitHub issue #1 — approved four-view silhouette exploration for Guard, Vendor and Clinic Worker](https://github.com/tinytime/Tinytime.github.io/issues/1).
