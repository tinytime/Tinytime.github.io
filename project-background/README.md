# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest combined renderer source:** `777db4e16176324e66d368c6a5b4f022ab1cd411`. Browser QA run [#434](https://github.com/tinytime/Tinytime.github.io/actions/runs/44568781463) is in progress against this exact combined source; job `135717958193`. Run #433 was cancelled because it tested the intermediate Runner/Referee-only commit before the Coach whistle correction. No new visual verdict is available yet.

**Active task:** Claude's independent run #432 verdict required four Runner corrections, one Coach whistle correction and one Referee chin-line correction. All six are implemented in the current combined source. The new review brief records the exact findings and fixes. QA #434 must finish and its artifact must be inspected at native 64×96 and 28×42 game scale for all three characters, with role-debug, gallery and Granny comparison context, before the package is returned to Claude. The prior run #432 artifact is not evidence for these changes. All three remain NOT APPROVED pending fresh internal QA, Claude review and owner acceptance.

## Working agreement

- The project owner sets priorities and gives final approval.
- ChatGPT is the primary builder: inspect, implement, test, review artifacts, and update the docs.
- Claude is the independent visual reviewer. Claude reviews completed batches against Granny Volt and gives a candid approval or rejection.
- Never mark a design approved based only on code completion or automated test results.
- Do not refresh or approve golden snapshots just to make CI pass. Human visual approval is required first.

## Current focus

The first batch—**Usher, Cook, and Courier**—was approved by the project owner on 2026-11-19. The current group is **Runner, Coach, and Referee**. All three have passed targeted internal QA. The latest combined run #429 includes Coach's final polish and has been visually inspected. Comparative review is next.

## Source of truth

The tracker records design status. The live game and renderer code are authoritative for implementation. The QA workflow and its artifacts are authoritative for what a particular test run actually checked. If these disagree, report the discrepancy and reconcile the documents; do not silently assume one is correct.
