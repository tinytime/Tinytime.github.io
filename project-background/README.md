# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest verified branch commit at this status check:** `777fa6e26500cd9fbac6e0af96021742b43d2303` — project status and tracker handoff updates; latest code change remains `5ed3f49cd7c7767a716383945236a33b4c82dcb8`.  
**Latest browser QA:** [Run #44537588645](https://github.com/tinytime/Tinytime.github.io/actions/runs/44537588645), testing Cook refinement commit `5ed3f49cd7c7767a716383945236a33b4c82dcb8`; rerun queued after the prior attempt was cancelled by overlapping branch updates; result/artifact inspection pending. Prior run [#44537243995](https://github.com/tinytime/Tinytime.github.io/actions/runs/44537243995) failed global civilian silhouette uniqueness and unapproved golden-snapshot gates; Cook palette/body/face/role-debug/prop checks and gallery rendering passed. Prior artifact revealed Cook/Usher back-view overlap and a weakly legible pan handle; both addressed in `5ed3f49` and await retest.

**Active task:** Finish internal browser QA and visual inspection of Cook's revised four-direction vector character. It remains built but NOT APPROVED.  
**Assigned specialist chat:** **NPC Vector Development specialist**, with QA and Independent Review Coordinator to inspect final artifacts.  
**Next action:** Inspect Run `44537588645` and its actual `qa-output/` screenshots/report. Verify pan grip, Cook-vs-Usher silhouette separation, four directions, native-size readability, town/gallery rendering and regressions. Update this tracker and status block with exact evidence. Fix any remaining Cook-specific issues and rerun. Do not start Courier or any other unapproved character.

**Handoff rule:** Main Builder must keep one authoritative current-status block here (or in the linked tracker) containing the latest verified repository commit, active task, assigned specialist chat, and explicit next action. Refresh it after every meaningful implementation, QA, review, or approval milestone and before handing work to another chat. Also update the per-character tracker; do not let this summary replace detailed evidence or approval records. A fresh conversation must verify the live branch head and latest Actions run rather than blindly trusting an old status snapshot.

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
