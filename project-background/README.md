# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest branch head:** `fd38a8b1562d5020fc6c76e6e5f3aa8ab45cf0dc` (refresh at each handoff). **Latest renderer source:** `6905171293c04f34f3ee09c804c490082e1f3d57`. Browser run [#44548532467](https://github.com/tinytime/Tinytime.github.io/actions/runs/44548532467), job `135645796007`, tested that exact renderer source; artifact `14540104692` inspected. Runner targeted internal QA passed; overall workflow remains failed on the global Clinic/Sailor silhouette gate and unapproved golden baseline.

**Active task:** Runner is built and has passed targeted internal QA. Four directions, role-debug, gallery and town evidence from artifact `14540104692` have been inspected. Runner remains NOT APPROVED pending the next-group review and owner acceptance.
**Assigned specialist chat:** **NPC Vector Development specialist**.
**Next action:** Runner is internally checked. Coach is next in the authorized group; Referee follows Coach. Keep other roster members on hold until the owner advances the batch.

## Working agreement

- The project owner sets priorities and gives final approval.
- ChatGPT is the primary builder: inspect, implement, test, review artifacts, and update the docs.
- Claude is the independent visual reviewer. Claude reviews completed batches against Granny Volt and gives a candid approval or rejection.
- Never mark a design approved based only on code completion or automated test results.
- Do not refresh or approve golden snapshots just to make CI pass. Human visual approval is required first.

## Current focus

The first batch—**Usher, Cook, and Courier**—was approved by the project owner on 2026-11-19. The next group is **Runner, Coach, and Referee**. Runner is internally complete; Coach is next, followed by Referee. Complete internal QA on each before advancing.

## Source of truth

The tracker records design status. The live game and renderer code are authoritative for implementation. The QA workflow and its artifacts are authoritative for what a particular test run actually checked. If these disagree, report the discrepancy and reconcile the documents; do not silently assume one is correct.
