# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest verified branch commit at this status check:** `a91131469e0f027e431fbf740e7b63c84dd45ef2` — handoff refreshed after Cook QA review; latest Cook implementation commit remains `5ed3f49cd7c7767a716383945236a33b4c82dcb8`.  
**Latest browser QA:** [Run #44537588645](https://github.com/tinytime/Tinytime.github.io/actions/runs/44537588645), tested commit `5ed3f49cd7c7767a716383945236a33b4c82dcb8`, **overall FAILED**. Cook-specific palette, body/baseline, face, role-debug, prop, four-direction visual-integrity, town and gallery checks passed; actual four-direction renders were inspected. Global legacy civilian silhouette and unapproved golden-snapshot gates failed; audio assets also logged HTTP 404. Artifact `14536893339` inspected. No golden snapshots changed.

**Active task:** Build Courier as the third pilot character. Cook's internal QA is complete; Cook remains BUILT — NOT APPROVED pending comparative review and owner acceptance.  
**Assigned specialist chat:** **NPC Art Designer / Vector Development** (Courier design and implementation).  
**Next action:** Complete and commit Courier's bespoke vector renderer with four intentional directions and role-specific silhouette, clothing, palette, and props. Then hand the exact commit to the QA and Independent Review Coordinator for browser QA and actual render inspection. Once all three pilots are internally checked, Main Builder prepares the comparative Claude review package for Usher, Cook, Courier, and Granny Volt. Do not start the remaining 20 civilians before that review and owner approval.

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
