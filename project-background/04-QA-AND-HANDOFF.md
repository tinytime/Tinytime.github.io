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

## Current independent pilot review and next actions

Claude's comparative review of the 18-image evidence package is complete. The reviewer found no required character fixes on Usher or Cook. Courier has three required corrections: readable face/profile in left/right views (major); consistent messenger satchel across all four directions, correctly on the character's right hip in rear view (major); remove or attach the detached cyan line below the hem in back/side views (minor). Optional polish and a legacy QA threshold-documentation discrepancy are recorded in the tracker; neither is a pilot blocker.

A first Courier correction pass was committed as `98dbcda2a32fa506ba355f12ddd449db3322a4b4` in `npc_sprites.js`: side profile face added, backpack-like rear/side pack replaced with a compact messenger satchel and rear strap, detached hem stripe removed.

Browser QA run #410 (`44542492048`) tested that exact source SHA and uploaded artifact `14537384741`. Courier-specific syntax/module, palette, body/baseline/contrast, unique face, 92-capture visual integrity, prop, role-debug, town and gallery checks passed. Actual four-direction native captures, nearest-neighbor enlargements, role-debug, full gallery and town screenshot were inspected. The profile face is readable; satchel placement is consistent (rear view on viewer-right, the character's right hip); the detached hem stripe is absent; parcel/hand contact remains connected. No page/script errors. 135 missing audio resources returned 404.

The overall workflow is **FAILED**, but for separate existing/global gates: the 23-civilian silhouette audit still flags Clinic/Sailor front (0.9094), Coach/Vendor front (0.8990) and back (0.8912), Sailor/Welder back (0.8893), Clinic/Sailor back (0.8842), and Clinic/Welder back (0.8718), above the 0.90 limit. Cook/Courier back is 0.8635 and below the limit. The golden baseline remains explicitly unapproved (23 changed snapshots, 1 match); no golden images were refreshed or approved.

Next actions:
1. QA and Independent Review Coordinator independently verifies run #410, its exact source SHA, report and uploaded artifact.
2. Send the corrected Courier front/back/left/right images and 8× role-debug evidence to Claude for focused reinspection of the three required findings.
3. Record Claude's follow-up and any required changes; rerun browser QA if changes are made.
4. Return the three-pilot status to the owner. Keep all pilots NOT APPROVED until owner acceptance.
5. Keep the remaining 20 civilian designs on hold until the three-pilot review is complete and the owner approves the direction.

## Handoff checklist for a new builder

- [ ] Read this folder's README and all four background documents.
- [ ] Read the [NPC Vector Character Tracker](NPC_VECTOR_CHARACTER_TRACKER.md).
- [ ] Confirm branch and current commit before making changes.
- [ ] Inspect the live renderer and latest QA artifacts.
- [ ] Keep Usher marked not approved until Claude and owner review are complete.
- [ ] Do not start the remaining 20 characters before the three-character review.
- [ ] Update the tracker after each meaningful build or QA milestone.


## Courier correction independent QA verification — run #410

The QA Coordinator independently rechecked the current correction run and artifact after the renderer handoff.

- Run: [#410 / 44542492048](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048)
- Tested source SHA: `98dbcda2a32fa506ba355f12ddd449db3322a4b4`
- Browser QA job: `135624264131` (diagnostic step failed; artifact upload succeeded)
- Artifact: `vapor-city-browser-qa`, ID `14537384741`
- Artifact files inspected: `npc-type-directions/courier-{front,back,left,right}.png`, `cook-courier-usher-role-debug-8x.png`, `npc-gallery-4x.png`, `npc-gallery-1x.png`, `game-town-1x.png`, and `report.json`.

Independent visual verification confirms the side-profile face is readable in both directions; the satchel is consistent in front/back/side views and appears on viewer-right (the character's right hip) in the rear view; the detached cyan hem stripe is absent; and the parcel remains visibly held. The role-debug evidence shows distinct Courier props and garments. Gallery and town renders show no obvious clipping. Reported visual-integrity checks cover 92 captures with zero edge contacts and zero detached large components.

Courier-specific automated checks pass: syntax/module/inventory; three-vector palette evidence (Courier 1,405 unique antialiased colors, 2,210 opaque pixels, 42 ink pixels); body/baseline/contrast; 23 distinct faces at native and game scale; role-debug (6 captures); prop audit; town scene; and gallery. No scriptErrors or pageErrors.

The workflow remains **FAILED** on unrelated/global gates: all-civilian silhouette audit max rendered IoU 0.909429 (Clinic/Sailor front), with further legacy overlaps including Coach/Vendor, Sailor/Welder, and Clinic/Welder; golden snapshots remain explicitly unapproved (23 changed, 1 match). No snapshots were refreshed or approved. 135 missing audio-resource 404s were logged.

**QA Coordinator verdict:** Courier's three required corrections pass internal visual verification and the updated evidence is ready for Claude's focused re-review. This is not independent reviewer approval or owner approval. Claude has not yet been contacted. Keep all three pilots NOT APPROVED and the remaining 20 on hold.

## QA Coordinator final verification and threshold clarification — run #410

On 2026-11-19 the QA Coordinator re-fetched run #410, verified job `135624264131` and artifact `14537384741`, and independently inspected the Courier native directional PNGs, role-debug sheet, 4× gallery, and town capture. The artifact report's `sourceCommitSha` is `98dbcda2a32fa506ba355f12ddd449db3322a4b4`. Current branch head is `db3f958351aa9994fab544dfb915ea0e2424708d`; comparison confirms the 12 commits after the tested source changed documentation files only, not renderer/game/QA source.

**Courier correction verdict: PASS for internal QA; NOT APPROVED.** The left/right profiles show a readable face; the same compact satchel appears across the directions and is on viewer-right in the rear view; the detached cyan hem stripe is absent; parcel grip remains visibly connected. Targeted syntax/module, inventory, palette, body/baseline/contrast, face distinctness, 92-capture integrity, prop, role-debug, gallery, and town checks pass. `scriptErrors` and `pageErrors` are empty.

**Important audit interpretation correction:** the 23-civilian full-body `civilianTypeSilhouetteAudit` has a strict IoU limit of 0.90. Only Clinic/Sailor front (0.909429) is above the limit and causes that audit to fail. Coach/Vendor front (0.898985), Coach/Vendor back (0.891175), Sailor/Welder back (0.889290), Clinic/Sailor back (0.884215), Clinic/Welder back (0.871764), and Cook/Courier back (0.863465) are nearest pairs but remain **below** 0.90; they are not failures of that threshold. The separate `silhouetteQualityCheck` uses a different <0.85 criterion across its 180 legacy archetype pairs and passes (max IoU 0.827467). These two audits must not be conflated.

The overall workflow remains **FAILED** due to the Clinic/Sailor front overlap and the explicitly unapproved golden-snapshot baseline (23 changed, 1 match). No snapshots were refreshed or approved. Missing-audio resource 404s remain in console output; no page/script errors were reported. The Courier focused Claude re-review package has been prepared, but Claude has not yet been contacted.