# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest renderer source:** `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495` (Referee handedness, rear hair, side-profile torso and card grip refinement). Browser QA run [#426](https://github.com/tinytime/Tinytime.github.io/actions/runs/44557279748), job `135676647176`, tested that exact SHA; artifact `14545038850` was downloaded and inspected. Referee-specific four-direction, palette, body/baseline, face, prop, clipping and visual-integrity evidence passed. Role-debug passed 12/12 across six vectors (front/right views); full gallery four-direction evidence was inspected. Town scene loaded with 16 NPCs, but its street roster does not explicitly include a Referee, so this is scene-regression evidence rather than proof of the Referee's live town card. Overall workflow remains failed on the global Clinic/Sailor silhouette gate and explicitly unapproved golden baseline.

**Active task:** Runner, Coach and Referee are built and have passed targeted internal QA. Referee's latest renderer (run #426 / source `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495`) has been independently inspected at native 64×96 and enlarged scale. All three remain NOT APPROVED pending Claude's comparative review and owner acceptance. Referee-specific town readability is not yet evidenced: the standard street capture does not spawn Referee.
**Assigned specialist chat:** **QA and Independent Review Coordinator**.
**Next action:** Close the Referee live town/room capture gap if town readability is required, then deliver Runner/Coach/Referee's current artifacts (Runner #416, Coach #420, Referee #426) to Claude for comparative review against Granny Volt. Keep the remaining roster on hold until the owner approves the direction.

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
