# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest branch head:** `db3f958351aa9994fab544dfb915ea0e2424708d`. The latest game/renderer/QA source tested remains `98dbcda2a32fa506ba355f12ddd449db3322a4b4`; the 12 commits between those SHAs are documentation-only. Browser QA run [#410](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048), job `135624264131`, tested that exact source commit; artifact `14537384741` was independently re-fetched and visually inspected by the QA Coordinator. Courier's three required corrections pass internal visual QA.

**Active task:** Runner's bespoke vector renderer and QA coverage are integrated. Initial directional/gallery/town evidence was inspected; a height/baseline correction and Cook transform restoration are in commit `ae550b0`. The corrected browser run is still in progress.
**Assigned specialist chat:** **NPC Vector Development specialist**.
**Next action:** Finish run `44547955840`, inspect its report and actual screenshots, verify Runner's body height/baseline and Cook's edge integrity, fix any remaining Runner-specific visual issues, then move to Coach only after Runner passes internal QA. Referee follows Coach. Keep all other characters on hold.

## Working agreement

- The project owner sets priorities and gives final approval.
- ChatGPT is the primary builder: inspect, implement, test, review artifacts, and update the docs.
- Claude is the independent visual reviewer. Claude reviews completed batches against Granny Volt and gives a candid approval or rejection.
- Never mark a design approved based only on code completion or automated test results.
- Do not refresh or approve golden snapshots just to make CI pass. Human visual approval is required first.

## Current focus

The first batch—**Usher, Cook, and Courier**—was approved by the project owner on 2026-11-19. The next group is **Runner, Coach, and Referee**. Runner is the active character; complete its internal QA before starting Coach.

## Source of truth

The tracker records design status. The live game and renderer code are authoritative for implementation. The QA workflow and its artifacts are authoritative for what a particular test run actually checked. If these disagree, report the discrepancy and reconcile the documents; do not silently assume one is correct.
