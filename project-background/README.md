# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest combined renderer source:** `b15d14fd9c6604c7ee232adf47d44a5d328054b3`. Run #435 tested the preceding correction commit `6332fb4622ed56686771e60541f975b2d6e33a61`: targeted checks passed, but visual inspection showed Coach's broad front-view jacket silhouette remained underneath the side-profile overlay. The base jacket is now suppressed for side views and the profile torso narrowed. A fresh browser QA run for `b15d14f` is required before visual verification. It addresses owner feedback from run #434: Coach's side profile was too front-facing and clipboard layering hid the hand/board relationship; Referee's raised card arm sat on the rear side in profiles; Runner's side stride included a duplicate underlayer that read as a third leg. The new artifact must be inspected in all four directions at native and game scale before these corrections can be considered verified.

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
