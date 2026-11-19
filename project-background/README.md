# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest verified source commit at this status check:** Courier correction source `98dbcda2a32fa506ba355f12ddd449db3322a4b4`. Browser QA run [#410](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048) tested that exact commit; artifact `14537384741` was downloaded and independently re-inspected. The Courier corrections pass internal visual QA. Documentation handoff is being refreshed from branch head `0dc99d6fda28af34a17f6a1221516fe4b96dd8bf`.

**Active task:** Courier's corrected vector art has passed the QA Coordinator's independent artifact verification. The profile face, consistent messenger satchel/right-hip rear placement, and removed detached hem stripe are confirmed in the fresh four-direction captures. The 8× role-debug sheet, 4× gallery, and town screenshot were also inspected. All Courier-specific targeted checks passed; the overall workflow remains failed on the global legacy silhouette audit and unapproved golden snapshots, with missing audio-resource 404s logged. No golden snapshots were changed.
**Assigned specialist chat:** **QA and Independent Review Coordinator**.
**Next action:** Send the updated Courier four-direction captures and role-debug evidence from run #410 to Claude for focused re-review of the three previously required corrections. Record Claude's response and return the complete pilot batch to the owner. Keep the remaining 20 civilian designs on hold until the three-pilot review is complete and the owner approves the direction.

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
