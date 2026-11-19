# Runner / Coach / Referee — Run #429 review package

**Status:** Ready for independent review; all three characters remain NOT APPROVED.

This GitHub package index points to the exact corrected-render evidence. The PNGs are preserved unchanged in the GitHub Actions artifact from the run below; they are not duplicated into Git history.

## Source and evidence

- Repository: [tinytime/Tinytime.github.io](https://github.com/tinytime/Tinytime.github.io)
- Branch: `npc-granny-baseline-overhaul`
- Tested renderer/source commit: [`f78627caf53b15cfe1bee0f30feea39d68da7c35`](https://github.com/tinytime/Tinytime.github.io/commit/f78627caf53b15cfe1bee0f30feea39d68da7c35)
- GitHub Actions run #429: [Open run and download artifact](https://github.com/tinytime/Tinytime.github.io/actions/runs/44562696912)
- Job: `135695989340`
- Artifact: `vapor-city-browser-qa`
- Artifact ID: `14548434248`
- Artifact archive: use the **Artifacts** section at the bottom of the run page and download `vapor-city-browser-qa`.

## Required review images

Extract these unchanged PNGs from the artifact:

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

Read [CLAUDE-RUNNER-COACH-REFEREE-REVIEW.md](../../CLAUDE-RUNNER-COACH-REFEREE-REVIEW.md) and score each character against Granny Volt. Review the corrected run #429 images—not the older #416, #420, or #425 renders.

The brief covers the required Runner, Coach and Referee checks and requests per-character scores, verdicts, blocking corrections, optional polish, and a collective batch-readiness recommendation.

## QA status and caveats

The 12 directional renders, role-debug sheet and gallery were visually inspected internally. Targeted checks passed: role-debug 12/12, directional visual integrity 92/92, prop audit, silhouette-quality 180/180, gallery and town regression; zero page errors and zero script errors.

The overall workflow is still failed on the separate global Clinic/Sailor front silhouette overlap (IoU 0.909429), unapproved golden snapshots (23 changed, 1 match), and 180 missing-audio 404s. No golden snapshots were refreshed or approved. The standard town screenshot does not explicitly spawn Coach or Referee, so it is not character-specific live-town proof.

**Approval state:** Runner, Coach and Referee are all NOT APPROVED. Claude's independent review and the project owner's explicit acceptance are still required. The remaining roster stays on hold.
