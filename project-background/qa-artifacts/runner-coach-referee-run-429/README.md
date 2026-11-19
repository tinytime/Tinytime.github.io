# Runner / Coach / Referee — Latest review package (run #432)

**Status:** Ready for refreshed independent comparative review; all three characters remain NOT APPROVED.

This GitHub package index points to the exact latest corrected-render evidence. The PNGs are preserved unchanged in the GitHub Actions artifact from run #432; they are not duplicated into Git history. The folder name is retained to preserve the existing package link.

## Source and evidence

- Repository: [tinytime/Tinytime.github.io](https://github.com/tinytime/Tinytime.github.io)
- Branch: `npc-granny-baseline-overhaul`
- Tested renderer/source commit: [`52f286912bf6fa44219972520211bc13d6f3ef7a`](https://github.com/tinytime/Tinytime.github.io/commit/52f286912bf6fa44219972520211bc13d6f3ef7a)
- GitHub Actions run #432: [Open run and download artifact](https://github.com/tinytime/Tinytime.github.io/actions/runs/44566620323)
- Job: `135710025332`
- Artifact: `vapor-city-browser-qa`
- Artifact ID: `14550224509`
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
