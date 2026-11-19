# Vapor City — Project Background & Handoff

This folder is the starting point for anyone taking over work on the Vapor City NPC vector redesign. Read the documents in this order:

1. **[Project overview](01-PROJECT-OVERVIEW.md)** — what the project is, the goal, ownership, decisions already made, and current work.
2. **[Art direction and approval standard](02-ART-DIRECTION-AND-APPROVAL.md)** — what a successful character must look like and how Granny Volt is used as the benchmark.
3. **[Technical implementation](03-TECHNICAL-IMPLEMENTATION.md)** — where the renderer lives, how vector NPCs are integrated, and which files matter.
4. **[QA, known issues, and handoff](04-QA-AND-HANDOFF.md)** — how to test, interpret failures, and continue safely.
5. **[NPC vector character tracker](NPC_VECTOR_CHARACTER_TRACKER.md)** — live roster and per-character approval status.

## Current project status — refresh this block at every handoff

**Branch:** `npc-granny-baseline-overhaul`  
**Latest combined renderer source:** `b15d14fd9c6604c7ee232adf47d44a5d328054b3`. Browser QA run [#436](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570917085) completed against this exact source; artifact `14553029329` inspected. The three owner-reported profile defects are visually corrected in native 64×96 captures and derived 28×42 resampling. Internal QA passes for these character-specific corrections; overall workflow remains failed on global Clinic/Sailor silhouette overlap, unapproved golden snapshots, and existing audio 404s. All three remain NOT APPROVED pending Claude review and owner approval.

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


## Run #436 — owner-feedback profile correction verification (2026-11-19)

- Tested renderer/source: `b15d14fd9c6604c7ee232adf47d44a5d328054b3` (run #436, run ID `44570917085`, job `135725393768`). Artifact `14553029329` (`vapor-city-browser-qa`); [GitHub Actions run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570917085).
- Actual native directional evidence: all 12 PNGs in `npc-type-directions/` are 64×96 (Runner, Coach, Referee × front/back/left/right). Enlarged 4× sheet and separately downsampled 28×42 visual check were inspected locally from these captures. The artifact itself does not contain separate browser-captured 28×42 character PNGs; record the 28×42 check as a derived resampling, not a native game-scene capture.
- **Runner:** both profiles now show two distinct stride legs and two feet; the duplicate third-leg underlayer is gone at native and derived 28×42 scale.
- **Coach:** side head and torso read as a side view rather than the front body underneath a turned head. Clipboard is in front of the arm/hand and remains legible; hand/board contact is visible. The follow-up torso narrowing from `b15d14f` is present in the tested source.
- **Referee:** raised card arm/card are on the forward/face side in both left and right profiles; no longer emerge from behind the body.
- Targeted checks: syntax/module/inventory pass; palette and body checks pass; role-debug 12/12; directional integrity 92/92, zero edge contacts and zero detached large components; prop audit passes; silhouette-quality 180/180; gallery visual pass; town scene pass (16 NPCs, Granny present); page errors 0 and script errors 0.
- Overall workflow remains failed on unrelated/global checks: civilian type silhouette audit max IoU `0.9094292803970223` (Clinic/Sailor overlap); golden snapshot comparison 23 changed / 1 match, with no baseline refresh or approval; existing audio resource 404 console errors. No snapshots were refreshed or approved.
- The QA report has no character-specific town spawn/capture for Runner/Coach/Referee; town screenshot is regression context only. Granny comparison remains a separate reference check.
- **Internal visual verdict:** all three owner-reported profile defects are corrected in the run #436 native renders. This is not independent Claude review or owner approval. Runner/Coach/Referee remain NOT APPROVED pending Claude's comparative review and owner decision. Keep remaining 20 civilians on hold.
