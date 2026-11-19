# Project Overview

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

The project owner approved the first batch—Usher, Cook, and Courier—on 2026-11-19 and authorized the next group of three:

1. **Runner** — built and internally checked; dedicated vector renderer integrated and actual four-direction, role-debug, gallery and town evidence inspected.
2. **Coach** — built with a dedicated vector renderer; targeted internal QA passed after side-profile facial refinement.
3. **Referee** — built and internally checked; four-direction, role-debug, gallery and town evidence inspected.

Complete and internally inspect each character in four directions, at native/enlarged scale, and in town/gallery context before moving to the next character. The owner initially expanded review to all six, then reduced the review to five to fit Claude's usage limit: Usher, Cook, Courier, Coach and Referee. Runner is intentionally excluded for this round because it shares the athletic archetype with Coach and Referee; Runner is not deleted or rejected and remains pending a later focused review. Claude must compare the five against Granny Volt, provide individual verdicts and a five-character ranking, and derive a reusable Civilian Vector Build Standard. Evaluate Claude's findings and obtain owner approval before starting the remaining 20.

## Scope and counts

The project tracker lists 23 civilian character types. Granny Volt is separate: she is the approved visual benchmark, not one of the 23 civilian redesigns. Fan variants are variants of the Fan character family, not extra base character types.

The repository's automated inventory currently describes 24 live civilian archetype mappings. That inventory count includes the Fan archetype and is separate from the 23-name redesign roster in the project tracker. Keep those two scopes distinct; do not change inventory policy or scope classifications casually.

## Key decisions already made

- Move from the prior pixel approach to bespoke vector-rendered civilians.
- Reuse the completed vector character designs across towns.
- Make the 23 civilians individually recognizable; avoid a shared-body recolor approach.
- Use Granny Volt as a 10/10 quality reference, not a template to copy.
- Complete Usher, Cook, and Courier as the first owner-approved batch. Next group: Runner, Coach, Referee.
- Require internal QA and independent review for each new batch; record the project owner's explicit final approval.
- Keep golden snapshot approval separate from automated QA. Never approve or refresh snapshots without explicit owner authorization.

## Current state at handoff

The Usher vector renderer is integrated in `npc_sprites.js`. The previous browser QA run (#393) showed the targeted usher checks passing, but the overall workflow still failed for separate snapshot-approval and legacy silhouette-audit gates. See [QA, known issues, and handoff](04-QA-AND-HANDOFF.md).

Usher, Cook, and Courier were owner-approved and then reopened by the owner on 2026-11-19 for Claude-recommended corrections. Runner, Coach and Referee are built and remain NOT APPROVED pending the full six-civilian Claude review and owner acceptance. Run #457 verifies all six native directional sheets and includes direct game-scale captures for Runner/Coach/Referee. Targeted visual integrity passes; the Courier body/baseline audit still flags a 2px delta against a 1px vector threshold, and global silhouette/snapshot/audio gates still fail. The live status is maintained in [the character tracker](NPC_VECTOR_CHARACTER_TRACKER.md).


## Latest six-civilian polish and QA — 2026-11-19

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
