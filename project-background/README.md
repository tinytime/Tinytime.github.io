# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest verified documentation commit at this status check:** `2979453a8762dc48fd96026bc149198389fd1e4f` — Courier correction pass `98dbcda2a32fa506ba355f12ddd449db3322a4b4`; review/tracker/handoff updates through the latest documentation commit. Browser QA for the correction pass is pending; do not treat the source commit as tested.
**Latest browser QA before Courier corrections:** [Run #44539341875](https://github.com/tinytime/Tinytime.github.io/actions/runs/44539341875), tested exact commit `a006d3cee143b7ac7b3a4ec2ed614eb0f604a551`, **overall FAILED**. Courier-specific checks passed before Claude's corrections; global legacy silhouette and unapproved golden-snapshot gates failed; 135 audio-resource 404s logged. Artifact `14537616516` was inspected and supplied to Claude.

**Active task:** Apply Claude's required Courier corrections. Claude found no required fixes on Usher or Cook. Courier fixes: side-profile face; consistent right-hip messenger satchel in all directions; remove detached cyan hem stripe. Correction source commit `98dbcda2a32fa506ba355f12ddd449db3322a4b4` is committed but not yet browser-tested or independently reinspected. All three pilots remain NOT APPROVED.
**Assigned specialist chat:** **Main Builder / QA and Independent Review Coordinator**.
**Next action:** Run browser QA against the corrected source, inspect all new artifacts, then submit updated Courier directions and role-debug evidence to Claude for focused reinspection. Do not start the remaining 20 civilians before the pilot review is complete and the owner approves.

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
