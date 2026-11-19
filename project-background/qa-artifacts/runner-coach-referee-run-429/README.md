# Runner / Coach / Referee — Latest review package (run #436)

**Status:** Ready for refreshed independent comparative review after run #436 internal visual QA; all three characters remain NOT APPROVED.

This GitHub package index points to the exact latest corrected-render evidence. The PNGs are preserved unchanged in the GitHub Actions artifact from run #436; they are not duplicated into Git history. The folder name is retained to preserve the existing package link.

## Source and evidence

- Repository: [tinytime/Tinytime.github.io](https://github.com/tinytime/Tinytime.github.io)
- Branch: `npc-granny-baseline-overhaul`
- Tested renderer/source commit: [`b15d14fd9c6604c7ee232adf47d44a5d328054b3`](https://github.com/tinytime/Tinytime.github.io/commit/52f286912bf6fa44219972520211bc13d6f3ef7a)
- GitHub Actions run #432: [Open run and download artifact](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570917085)
- Job: `135710025332`
- Artifact: `vapor-city-browser-qa`
- Artifact ID: `14553029329`
- Artifact archive: use the **Artifacts** section at the bottom of the run page and download `vapor-city-browser-qa`.

## Required review images

Extract these unchanged PNGs from artifact `14550224509`:

### Runner
- `npc-type-directions/runner-front.png`
- `npc-type-directions/runner-back.png`
- `npc-type-directions/runner-left.png`
- `npc-type-directions/runner-right.png`

### Coach
- `npc-type-directions/coach-front.png`
- `npc-type-directions/coach-back.png`
- `npc-type-directions/coach-left.png`
- `npc-type-directions/coach-right.png`

### Referee
- `npc-type-directions/ref-front.png`
- `npc-type-directions/ref-back.png`
- `npc-type-directions/ref-left.png`
- `npc-type-directions/ref-right.png`

### Comparative context
- `runner-coach-ref-cook-courier-usher-role-debug-8x.png`
- `granny-before-after-4x.png`

The same artifact also contains `npc-gallery-4x.png`, `npc-gallery-1x.png`, `game-town-1x.png`, `npc-snapshots/granny.png`, and `report.json` for optional context.

## Reviewer brief

Read [CLAUDE-RUNNER-COACH-REFEREE-REVIEW.md](../../CLAUDE-RUNNER-COACH-REFEREE-REVIEW.md) and score each character against Granny Volt. Review the latest run #432 images—not the older #416, #420, #425 or #429 renders.

The brief requests per-character scores and verdicts, blocking corrections, optional polish, and a collective batch-readiness recommendation. It includes the previous Claude verdict and describes the new Runner, Coach and Referee changes.

## QA status and caveats

The exact run #432 artifact was downloaded and inspected. All 12 native 64×96 directional images were enlarged and visually reviewed, along with the six-character role-debug sheet, 23-civilian gallery, Granny comparison, town screenshot and report.

Targeted checks passed:
- Renderer/game syntax, module load and NPC inventory.
- Vector palette, body/baseline/contrast and 23/23 face distinctness.
- Role-debug 12/12.
- Directional visual integrity 92/92; zero edge contacts and zero detached large components.
- Prop audit.
- Separate archetype silhouette-quality audit 180/180.
- Gallery and town-scene regression.
- Zero page errors and zero script errors.

The overall workflow remains failed on the separate global Clinic/Sailor front type-silhouette overlap (IoU 0.909429), explicitly unapproved golden snapshots (23 changed, 1 match), and 180 missing-audio 404s. No snapshots were refreshed or approved. The standard 16-NPC town screenshot does not explicitly spawn Runner, Coach or Referee, so it is scene-regression evidence rather than character-specific live-town proof.

**Approval state:** Runner, Coach and Referee are all NOT APPROVED. Claude's refreshed independent review and the project owner's explicit acceptance are still required. The remaining roster stays on hold.


## Run #436 inspection notes



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


Artifact paths: `npc-type-directions/runner-{front,back,left,right}.png`, `npc-type-directions/coach-{front,back,left,right}.png`, `npc-type-directions/ref-{front,back,left,right}.png`, `runner-coach-ref-cook-courier-usher-role-debug-8x.png`, `npc-gallery-1x.png`, `npc-gallery-4x.png`, `granny-before-after-4x.png`, `game-town-1x.png`, and `report.json`. These exact paths are in the run #436 artifact. No screenshots are copied into Git history; use the Actions artifact.
