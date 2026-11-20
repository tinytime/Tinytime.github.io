# Tech (#9) renderer review package

**Review status:** internal QA and visual inspection complete; ready for independent Claude review; not owner-approved.  
**Latest QA run:** [GitHub Actions #44744188993](https://github.com/tinytime/Tinytime.github.io/actions/runs/44744188993)  
**Tested source:** `07a014cc234d9203088324789f48ffaec733ca53`  
**Artifact:** `14632995073` (download from the run's Artifacts section)  
**Branch:** `npc-granny-baseline-overhaul`

## Source under review

- Renderer: `npc_sprites.js` — dedicated `drawTechVector`, wired to `tech`.
- Latest renderer correction: `e1def929f2c377485ebf2903be09d6da01c14a29` (stronger inward profile eye/brow cue).
- QA evidence layout correction: `07a014cc234d9203088324789f48ffaec733ca53` (role-debug legend no longer overlaps the left/right labels).
- QA harness: `qa/vapor-city-browser-qa.mjs`.
- Role legend: `adacc1f8d8dac3c832cd947a71fd5ab8fd055496`.
- Tech role-debug and town-spawn evidence: `c3ab02e929dc479850046d081e678d3cf585d85f`.
- Silhouette source: `project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg`.

## Required artifact images

Inspect the exact files in artifact `14632210592`:

- `tech-native-64x96/tech-d.png`, `tech-u.png`, `tech-l.png`, `tech-r.png`
- `tech-direct-game-scale-28x42/tech-d.png`, `tech-u.png`, `tech-l.png`, `tech-r.png`
- Matching `*-neutral-grey.png` captures at both scales.
- `tech-role-debug-four-directions-8x.png` (rechecked; labels and legend are separated).
- Matching Clinic captures under `approved-next-batch-native-64x96/clinic-*.png` and `approved-next-batch-game-scale-28x42/clinic-*.png` for direct side-by-side silhouette/face comparison.
- `game-town-tech-spawn-1x.png` (full-map capture; runtime NPC-list insertion passed, but this wide screenshot is not by itself a close-up visual proof of the rendered character).
- `five-civilian-native-4x-contact-sheet.png` and `five-civilian-game-scale-4x-contact-sheet.png` are broad roster context and do not include Tech; use the Tech-specific files above for character review.

## Internal QA evidence

- Tech native 64×96: 4/4.
- Tech direct 28×42: 4/4; captures are rendered directly, not resized from native.
- Tech edge contacts: 0.
- Tech role-debug: 4/4, seven semantic role labels; evidence sheet layout visually inspected after overlap correction.
- Explicit street-map runtime NPC-list spawn audit: PASS.
- Full directional integrity: 92/92.
- General role-debug: 12/12.
- Prop audit and gallery: PASS.
- Page errors / script errors: 0.
- Explicit Tech town spawn audit: PASS (`techgirl`, `civ:'tech'`, street map; full-map capture is not close-up visual proof).
- `pageErrors=[]`; `scriptErrors=[]`.
- Overall Actions status: FAILED on existing global gates — unapproved golden snapshot baseline (1 match / 23 changed) and 180 existing audio/resource 404 console errors. Evidence builders and artifact upload completed. No golden snapshots or provenance were changed.

## Focus of independent review

1. At direct 28×42 scale, are the stronger inward profile eye/brow cues clearly readable and unobscured by the ear cup?
2. Does Tech's angular/asymmetric field-shell construction and rear service pack distinguish the side/back silhouette from Clinic beyond palette and harness differences?
3. Does the left-profile meter read as held, with a clear hand-to-tool contact at both scales, without the prop becoming oversized?
4. Are all four directions coherent with the approved round-05 silhouette concept, including ear protection, harness, utility shell and diagnostic meter?
5. Any clipping, detached geometry, implausible anatomy, direction/handedness issues, or game-scale readability regressions?

Treat IoU/similarity diagnostics as human-review prompts, not automatic failures. Do not change or approve golden snapshots. Do not begin Hacker or Fisher until Tech review is complete and the project owner approves the direction.

## Current disposition

ChatGPT automated QA: targeted Tech captures 4/4 native and 4/4 direct 28×42; zero edge contacts; Tech role-debug 4/4; explicit street-map spawn audit PASS; broad directional integrity 92/92; general role-debug 12/12; prop audit and gallery PASS; page/script errors 0.  
Internal visual inspection: all four views at both scales inspected. The revised eye/brow now reads in both direct-scale profiles; the left-profile meter/hand contact is discernible; Tech's angular field shell, crossing harness and rear service pack distinguish its side/back construction from Clinic in direct side-by-side review. Full-character IoU remains a human-review prompt (Clinic/Tech: back 0.915, right 0.908, front 0.892), not an automatic failure. The corrected Tech role-debug sheet was also inspected and has no label overlap.  
Independent Claude review: package ready; exact-output review not yet recorded. No Claude connector is available from this workspace, so this package is prepared for handoff rather than claiming it was submitted.  
Project-owner rendered-art approval: pending.  
Hacker and Fisher: held pending Claude review and owner approval.
