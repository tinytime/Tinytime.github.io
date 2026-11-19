# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest verified documentation commit at this status check:** Courier correction QA reviewed on source commit `98dbcda2a32fa506ba355f12ddd449db3322a4b4`; documentation handoff refreshed at `ee05fbc1d6859904d9d3f6d973601824207451ae`. Browser QA run [#410](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048) tested the exact correction commit and completed **FAILED** overall. Courier-specific targeted checks passed; global legacy civilian silhouette and unapproved golden-snapshot gates remain failed. Artifact `14537384741` was downloaded and the corrected Courier directions, role-debug sheet, gallery, and town screenshot were visually inspected. No golden snapshots were changed.

**Active task:** Courier's corrected vector art is integrated and has completed internal browser QA. The side-profile face, consistent right-hip messenger satchel, and removed hem stripe are visible in the fresh four-direction captures. QA and Independent Review Coordinator now takes over to independently verify the run/artifacts and send the updated Courier evidence to Claude for focused re-review. Usher, Cook, Courier, and the pilot batch remain **NOT APPROVED** pending Claude's follow-up and owner acceptance.
**Assigned specialist chat:** **QA and Independent Review Coordinator**.
**Next action:** Complete independent QA artifact verification and Claude's Courier re-review. Keep the remaining 20 civilian designs on hold until the three-pilot review is complete and the owner approves the direction.

## Working agreement

- The project owner sets priorities and gives final approval.
- ChatGPT is the primary builder: inspect, implement, test, review artifacts, and update the docs.
- Claude is the independent visual reviewer. Claude reviews completed batches against Granny Volt and gives a candid approval or rejection.
- Never mark a design approved based only on code completion or automated test results.
- Do not refresh or approve golden snapshots just to make CI pass. Human visual approval is required first.

## Current focus

Complete the first three-character vector pilot: **Usher, Cook, and Courier**. Once all three are implemented and internally checked, prepare one comparative Claude review with Granny Volt as the 10/10 benchmark. Do not begin the remaining civilian redesigns until that review is complete unless the project owner changes the plan.

## Source of truth

The tracker records design status. The live game and renderer code are authoritative for implementation. The QA workflow and its artifacts are authoritative for what a particular test run actually checked. If these disagree, report the discrepancy and reconcile the documents; do not silently assume one is correct.
