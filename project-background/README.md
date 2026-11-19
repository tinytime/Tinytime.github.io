# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest renderer source verified:** `3fdbd1e0640c97afce2c3b732491ff84823ba84e` (Coach clipboard / rear-hair correction). Browser run [#428](https://github.com/tinytime/Tinytime.github.io/actions/runs/44560760230), job `135689302384`, tested that exact SHA; artifact `14550985215` inspected. Coach four-direction review passes with a minor whistle-at-native-scale legibility note; standard town roster does not explicitly spawn Coach. Referee run #426 (`4f0d135f0f14506a2c19df0f760d0fe2ec5a7495`) remains the latest Referee-specific evidence; dedicated live town spawn has not been captured. Runner #416 remains current targeted evidence. Overall workflow fails on the global Clinic/Sailor silhouette gate and explicitly unapproved golden baseline; 180 missing-audio 404s, no page/script errors.

**Active task:** Runner, Coach and Referee have passed targeted internal QA. The latest Referee render has been visually inspected at native and enlarged scale; handedness, rear hair, profile torso and card grip are consistent. The regular town screenshot does not spawn Referee, so a dedicated in-world Referee capture remains outstanding if town readability is required. All three remain NOT APPROVED pending Claude's comparative review and owner acceptance.
**Assigned specialist chat:** **QA and Independent Review Coordinator**.
**Next action:** Close the Referee live town/room capture gap if required, then submit the three-character evidence set to Claude against Granny Volt. Review record: [Runner / Coach / Referee Internal Review](RUNNER-COACH-REFEREE-INTERNAL-REVIEW.md). Keep the remaining roster on hold until owner approval.

## Working agreement

- The project owner sets priorities and gives final approval.
- ChatGPT is the primary builder: inspect, implement, test, review artifacts, and update the docs.
- Claude is the independent visual reviewer. Claude reviews completed batches against Granny Volt and gives a candid approval or rejection.
- Never mark a design approved based only on code completion or automated test results.
- Do not refresh or approve golden snapshots just to make CI pass. Human visual approval is required first.

## Current focus

The first batch—**Usher, Cook, and Courier**—was approved by the project owner on 2026-11-19. The current group is **Runner, Coach, and Referee**. All three have passed targeted internal QA; Coach's corrected-render run #428 has now been visually inspected, with a minor whistle-legibility note and no character-specific clipping or geometry defect. Comparative review is next.

## Source of truth

The tracker records design status. The live game and renderer code are authoritative for implementation. The QA workflow and its artifacts are authoritative for what a particular test run actually checked. If these disagree, report the discrepancy and reconcile the documents; do not silently assume one is correct.
