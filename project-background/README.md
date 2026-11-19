# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest combined renderer source:** `52f286912bf6fa44219972520211bc13d6f3ef7a`. Browser QA run [#432](https://github.com/tinytime/Tinytime.github.io/actions/runs/44566620323), job `135710025332`, tested this exact SHA; artifact `14550224509` was downloaded and visually inspected. It contains Runner, Coach and Referee four-direction 64×96 captures, role-debug, full gallery, Granny comparison, town screenshot and report. Targeted checks pass: syntax/module/inventory, role-debug 12/12, visual integrity 92/92 with zero edge contacts or detached large components, prop audit, silhouette-quality 180/180, gallery and town regression; no page/script errors. The overall workflow remains failed on the separate global Clinic/Sailor front silhouette overlap (IoU 0.909429), explicitly unapproved golden snapshots (23 changed, 1 match), and 180 missing-audio 404s. No snapshots were refreshed or approved.

**Active task:** Claude's prior review required Runner and Coach corrections and identified optional Referee polish. Runner and Coach corrections plus Referee profile-face/jacket-depth polish are now implemented. The first fresh QA attempt (#431) caught a one-pixel top-edge touch on Runner's profile curls; that was corrected, and run #432 verifies all 92 directional captures pass. The updated [Runner / Coach / Referee GitHub review package](qa-artifacts/runner-coach-referee-run-429/README.md) points to run #432 and lists the exact PNGs to extract from artifact `14550224509`. The standard town capture does not explicitly spawn each of these three NPCs; treat it as scene-regression evidence, not character-specific live-town proof. All three remain NOT APPROVED pending Claude's refreshed comparative review and owner acceptance.

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
