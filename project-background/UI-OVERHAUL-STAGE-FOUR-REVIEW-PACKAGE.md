# Stage Four — Owner Review Package (Run #397 polish batch)

**Status:** Ready for owner review. Implemented, browser-QA passing, and internally visually inspected. **Not owner-approved.** Independent Claude review has not yet been completed for this batch.

## Review decision requested

Please review the second Stage Four polish batch described below and decide whether to approve it. The pre-game matchup redesign remains explicitly deferred; do not begin it unless the owner approves this batch and separately authorizes that next scope.

## Exact source and validation

- Repository: [tinytime/Tinytime.github.io](https://github.com/tinytime/Tinytime.github.io)
- Working branch: `UI-Overhaul`
- Exact tested application + QA commit: [`f26e48986376c03ab07cb286c176660c8ff8eb65`](https://github.com/tinytime/Tinytime.github.io/commit/f26e48986376c03ab07cb286c176660c8ff8eb65)
- Commit message: `Fix Playbook favorite selection baseline in browser QA`
- Workflow: [Run #397 — UI Overhaul Browser QA](https://github.com/tinytime/Tinytime.github.io/actions/runs/45641399159)
- Result: **259/259 checks passed; 0 failures**
- Workflow job: `browser-qa` — success, including Playwright/Chromium setup, browser QA, and evidence upload
- Browser diagnostics: 0 uncaught page exceptions, 0 console errors, 0 same-origin HTTP failures
- Evidence artifact: [`ui-overhaul-browser-qa` — artifact 15035343585](https://github.com/tinytime/Tinytime.github.io/actions/runs/45641399159/artifacts/15035343585) (9.36 MB; 45 screenshot/evidence files)
- No golden snapshots were changed.

The current branch HEAD after the tested commit is `aae10154e2642cf951be39f198cb7d4bc1cc3ffd`, a documentation-only commit updating `ui-overhaul/README.md` with the Run #397 result. The application and QA code tested by Run #397 is exactly `f26e48986376c03ab07cb286c176660c8ff8eb65`; the later documentation commit does not change that tested code.

## Changes in this polish batch

1. **Fumble layout:** moved the FUMBLE label to sit centered immediately above the contest bar; retained a centered timer pill below the bar, kept the bar clear of the A mash button, and applied the navy/gold/cyan presentation.
2. **In-match Playbook:** changed the page to three columns by two rows (six plays per page); enlarged route diagrams; placed FLIP beside CALL PLAY in the footer; added native page navigation; updated FAV / ALL / RUN / PASS / TRICK categories, counts, and palette.
3. **Playbook interaction:** favorite star is a separate topmost hit target and toggles without changing the selected play. The QA uses a real pointer click, verifies independent selection, and restores the original favorite state.
4. **FLIP persistence:** the Playbook remains open after field-orientation flip, with all six route diagrams visible at usable dimensions; portrait restoration also remains available.
5. **Scoreboard duplication:** hid the duplicate scoreboard star-play meter while preserving the per-player Playbook meter.
6. **Defense drive pill:** positioned it below the HUD, centered it, and kept the complete down/distance and ball-position text visible.
7. **Achievement copy:** changed the truck achievement to “Perform 25 trucks”.
8. **Previously approved cross-stage polish remains intact:** post-game Style Points display remains absent, including practice-win mode.

## Screenshot review set

All images below are in the Run #397 artifact linked above. Download the artifact ZIP and open these exact filenames:

| Screenshot | Review focus |
|---|---|
| `match-playbook-overlay.png` | Six-card 3×2 grid, route legibility, category rail, selected card, footer, FLIP and CALL PLAY |
| `match-playbook-after-flip.png` | Playbook remains open and diagrams remain visible after FLIP |
| `match-playbook-portrait.png` | Portrait rotation/restoration prompt and layout |
| `match-fumble-pile.png` | FUMBLE label/bar/timer alignment, palette, clear A mash control |
| `match-defense-simulation.png` | Lowered drive-status pill and complete context |
| `match-live-play.png` | In-match scoreboard and gameplay HUD context |
| `match-post-game.png` | Post-game hierarchy and absence of Style Points |
| `match-post-game-practice-win-portrait.png` | Practice-win state and absence of Style Points |
| `goals-stats-achievements.png` | “Perform 25 trucks” achievement wording |
| `goals-stats-achievements-bottom.png` | Lower achievement list and pinned Close control |

Internal inspection completed for the Playbook overlay, post-FLIP Playbook, fumble pile, defense simulation, ordinary post-game, and achievement screenshots. No blocking regression was identified in those inspected captures.

### Reviewer attention item

In `match-fumble-pile.png`, a separate “HOLD ON!” pill at the far left edge appears partially outside the captured viewport. The requested FUMBLE label/bar/timer layout itself is centered and passed its geometry assertions. The QA report does not classify the “HOLD ON!” edge treatment as a failure; please decide whether it is an intentional contextual prompt or a clipping defect that should be corrected before approval. This is called out rather than silently treating the screenshot as flawless.

## Key automated evidence

- Six visible plays in a 3-column / 2-row layout; live ALL count 19; native page 1/4 and next-page navigation work.
- RUN, PASS, TRICK and ALL category states activate correctly.
- Favorite control is the topmost pointer target; toggles from ☆ to ★ independently of play selection; original favorite state is restored after the test.
- FLIP changes orientation state while leaving the Playbook visible; six canvases remain visible at 101.7×60 CSS px in the measured post-FLIP viewport.
- FUMBLE label center and bar center both measured at x=422, with a 10px gap; timer remains centered beneath the bar.
- Defense drive pill is centered within the 844px viewport and its full text fits without horizontal overflow.
- Scoreboard star meter is hidden; per-player meter remains visible.
- Truck achievement exact text is “Perform 25 trucks”.
- Post-game Style Points remain absent in ordinary and practice-win results.

The full per-check report is `summary.md` and `report.json` in the same artifact.

## Owner review checklist

- [ ] Playbook six-card layout, route diagrams and footer hierarchy are acceptable.
- [ ] FLIP behavior and post-FLIP visibility are acceptable.
- [ ] Favorite interaction feels clear and reliable.
- [ ] Fumble label, bar, timer and A mash control are correctly composed.
- [ ] The left-edge “HOLD ON!” pill is intentional or corrected.
- [ ] Defense drive pill is readable and fully contained.
- [ ] Scoreboard duplicate meter removal preserves the player meter.
- [ ] Achievement wording is correct.
- [ ] Post-game Style Points removal is correct.
- [ ] No regressions are visible in the supplied evidence.

## Approval boundary and next step

This package records internal QA and visual inspection only. It does not constitute independent Claude review or owner approval. On owner approval, record the decision and then request explicit authorization before starting the deferred pre-game matchup redesign. If any finding requires correction, ChatGPT will implement it, rerun browser QA, inspect fresh screenshots, and update this package before approval is reconsidered.
