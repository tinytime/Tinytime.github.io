# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest combined renderer source:** `f78627caf53b15cfe1bee0f30feea39d68da7c35`. Browser QA run [#429](https://github.com/tinytime/Tinytime.github.io/actions/runs/44562696912), job `135695989340`, tested that exact source; artifact `14548434248` was downloaded and visually inspected. It includes Runner, Coach and Referee four-direction captures, role-debug, gallery, Granny comparison and report. Coach's final whistle/profile-clipboard polish is now included in rendered evidence. Targeted checks pass: role-debug 12/12, directional visual integrity 92/92, prop audit, gallery and town regression; no page/script errors. The overall workflow remains failed on the global Clinic/Sailor silhouette overlap (IoU 0.909429) and explicitly unapproved golden snapshots (23 changed, 1 match); 180 missing-audio 404s. No snapshots were refreshed or approved.

**Active task:** Runner, Coach and Referee have passed targeted internal QA and are packaged for Claude's comparative review. The combined run #429 artifact contains their 12 native directional images, role-debug, gallery, Granny comparison and report. The standard street-town screenshot does not explicitly spawn Coach or Referee; treat it as scene-regression evidence, not character-specific live-town proof. All three remain NOT APPROVED pending Claude's review and owner acceptance.
**Assigned specialist chat:** **QA and Independent Review Coordinator**.
**Next action:** Send [the second-batch Claude review brief](CLAUDE-RUNNER-COACH-REFEREE-REVIEW.md) and run #429 artifact to Claude. Keep the remaining roster on hold until owner approval.

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
