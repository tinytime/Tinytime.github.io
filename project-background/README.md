# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest renderer source:** `3fdfdb25a5481e62f43c84b3483ec131493e290b` (Referee card/hand lowered to clear top-edge clipping). Documentation updates follow this source. Coach QA: run [#420](https://github.com/tinytime/Tinytime.github.io/actions/runs/44551256553), job `135655281455`, source `a9c29109e8f64a1009fd0b1df5ab560ff08fdbd8`, artifact `14542916538`. Referee QA: run [#425](https://github.com/tinytime/Tinytime.github.io/actions/runs/44553520770), job `135663311368`, exact source `3fdfdb25a5481e62f43c84b3483ec131493e290b`, artifact `14542904013`. Both characters passed targeted internal QA and visual inspection. Overall workflow remains failed on the global Clinic/Sailor silhouette gate and explicitly unapproved golden baseline.

**Active task:** Runner, Coach and Referee are built and have passed targeted internal QA. Their four-direction renders, role-debug sheets, gallery and town evidence have been inspected. All three remain NOT APPROVED pending Claude's comparative review and owner acceptance.
**Assigned specialist chat:** **QA and Independent Review Coordinator**.
**Next action:** Deliver the prepared Runner/Coach/Referee evidence package to Claude for comparative review against Granny Volt. Keep the remaining roster on hold until the owner approves the direction.

## Working agreement

- The project owner sets priorities and gives final approval.
- ChatGPT is the primary builder: inspect, implement, test, review artifacts, and update the docs.
- Claude is the independent visual reviewer. Claude reviews completed batches against Granny Volt and gives a candid approval or rejection.
- Never mark a design approved based only on code completion or automated test results.
- Do not refresh or approve golden snapshots just to make CI pass. Human visual approval is required first.

## Current focus

The first batch—**Usher, Cook, and Courier**—was approved by the project owner on 2026-11-19. The current group is **Runner, Coach, and Referee**. All three have passed targeted internal QA; comparative review is next.

## Source of truth

The tracker records design status. The live game and renderer code are authoritative for implementation. The QA workflow and its artifacts are authoritative for what a particular test run actually checked. If these disagree, report the discrepancy and reconcile the documents; do not silently assume one is correct.
