# QA, Known Issues, and Handoff

## Browser QA

The GitHub Actions workflow is `.github/workflows/vapor-city-browser-qa.yml`. It runs on pushes to `npc-granny-baseline-overhaul` and `main` when relevant game, renderer, QA, or workflow files change. It can also be started manually.

The workflow installs Node 20 and Playwright/Chromium, runs `node qa/vapor-city-browser-qa.mjs`, and uploads `qa-output/` as the `vapor-city-browser-qa` artifact even when the diagnostic step fails.

For every run:

1. Confirm the run's commit SHA matches the code being reviewed.
2. Inspect job status and step-level failure details.
3. Download and inspect the artifact, including the rendered sheets, town/gallery images, and JSON report.
4. Separate character-specific results from global or legacy-system failures.
5. Record the run ID, commit SHA, targeted results, overall result, and unresolved issues in the tracker.

A workflow failure is not automatically proof that the new character is defective. Conversely, a targeted character pass is not equivalent to whole-workflow success or design approval.

## Known result from browser QA run #393

This is a historical handoff snapshot. Recheck the latest branch and run before relying on it.

- Run ID: `44528522790`
- Run URL: https://github.com/tinytime/Tinytime.github.io/actions/runs/44528522790
- Tested commit: `35027d7d849ee3bb9ef173f2ae6172a53de920ba`
- Overall workflow: **FAILED**
- Targeted Usher body, palette, outline, prop, and visual-integrity checks: **PASSED**
- Four-direction rendering and Granny checks: **PASSED**
- Town scene/gallery checks: **PASSED**
- No material JavaScript/page errors were observed in that run.

The workflow remained failed for two separate reasons:

1. **Golden snapshot approval gate:** golden images had not been explicitly approved by the project owner. Do not approve or refresh them simply to clear this failure.
2. **Legacy civilian silhouette audit:** the global audit still flagged overlap among legacy pixel civilian designs (examples recorded at the time included clinic/sailor and coach/vendor). This was not identified as an Usher-specific defect.

The correct summary for that run is: **Usher targeted checks passed; the overall workflow failed on separate snapshot-approval and legacy silhouette gates. Usher was not approved.**

## Golden snapshot policy

The README explains that files in `qa/golden-npcs/` are comparison fixtures, not an art-quality scorecard. Their provenance is recorded in `qa/golden-npcs/PROVENANCE.json`. Human visual review and explicit approval identity/date/commit are required before the goldens can be treated as approved baselines.

Do not:
- refresh golden images to make a test pass;
- edit the provenance manifest to imply approval;
- treat a pixel match as proof of good art;
- weaken unrelated QA thresholds to hide a legacy issue.

If the owner explicitly approves a golden update, document exactly what was approved and why.

## Scope policy

`qa/npc-scope-policy.json` explicitly excludes cat variants and a set of legacy `owFig` characters from the standard NPC art scorecard. Granny is classified as the reference baseline, not a standard NPC scorecard entry. Do not change those classifications without an explicit owner decision.

The inventory generator reads live NPC records and renderer tables from the game HTML and `npc_sprites.js`. It expects 24 live civilian archetype mappings. This technical inventory count should not be conflated with the 23 civilian names in the design tracker.

## Next actions

1. Check the latest branch head and confirm the tracker is current.
2. Courier's bespoke vector renderer is integrated in `npc_sprites.js`; inspect the latest pending browser run `44539341875` and its four-direction, role-debug, gallery, town, and JSON artifacts.
3. Correct any Courier-specific defects and rerun the browser workflow. Keep global legacy silhouette and golden-snapshot failures separate from Courier-specific results; do not refresh snapshots.
4. Once Usher, Cook, and Courier are all internally checked, assemble one Claude review package comparing the three with Granny Volt.
5. Record Claude's findings in the tracker, make required corrections, and recheck.
6. Only after the three-character review should the project owner decide whether to proceed with the remaining civilian roster.

## Handoff checklist for a new builder

- [ ] Read this folder's README and all four background documents.
- [ ] Read the [NPC Vector Character Tracker](NPC_VECTOR_CHARACTER_TRACKER.md).
- [ ] Confirm branch and current commit before making changes.
- [ ] Inspect the live renderer and latest QA artifacts.
- [ ] Keep Usher marked not approved until Claude and owner review are complete.
- [ ] Do not start the remaining 20 characters before the three-character review.
- [ ] Update the tracker after each meaningful build or QA milestone.
