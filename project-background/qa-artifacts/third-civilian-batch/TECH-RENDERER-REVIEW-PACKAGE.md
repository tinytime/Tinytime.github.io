# Tech (#9) renderer review package

**Review status:** internal review found one remaining game-scale readability concern; not yet ready for independent review or owner approval.  
**QA run:** [GitHub Actions #44742568524](https://github.com/tinytime/Tinytime.github.io/actions/runs/44742568524)  
**Tested source:** `c3ab02e929dc479850046d081e678d3cf585d85f`  
**Artifact:** `14632210592` (download from the run's Artifacts section)  
**Branch:** `npc-granny-baseline-overhaul`

## Source under review

- Renderer: `npc_sprites.js` — dedicated `drawTechVector`, wired to `tech`.
- Latest renderer correction: `59d6dab5f509bed825e0209045385a7e443f4805`.
- QA harness: `qa/vapor-city-browser-qa.mjs`.
- Role legend: `adacc1f8d8dac3c832cd947a71fd5ab8fd055496`.
- Tech role-debug and town-spawn evidence: `c3ab02e929dc479850046d081e678d3cf585d85f`.
- Silhouette source: `project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg`.

## Required artifact images

Inspect the exact files in artifact `14632210592`:

- `tech-native-64x96/tech-d.png`, `tech-u.png`, `tech-l.png`, `tech-r.png`
- `tech-direct-game-scale-28x42/tech-d.png`, `tech-u.png`, `tech-l.png`, `tech-r.png`
- Matching `*-neutral-grey.png` captures at both scales.
- `tech-role-debug-four-directions-8x.png`
- `game-town-tech-spawn-1x.png` (full-map capture; runtime NPC-list insertion passed, but this wide screenshot is not by itself a close-up visual proof of the rendered character).
- `five-civilian-native-4x-contact-sheet.png` and `five-civilian-game-scale-4x-contact-sheet.png` are broad roster context and do not include Tech; use the Tech-specific files above for character review.

## Internal QA evidence

- Tech native 64×96: 4/4.
- Tech direct 28×42: 4/4; captures are rendered directly, not resized from native.
- Tech edge contacts: 0.
- Tech role-debug: 4/4, seven semantic role labels.
- Explicit street-map runtime NPC-list spawn audit: PASS.
- Full directional integrity: 92/92.
- General role-debug: 12/12.
- Prop audit and gallery: PASS.
- Page errors / script errors: 0.
- Overall Actions status: FAILED on global gates only — unapproved golden snapshot baseline (1 match / 23 changed) and 180 existing audio/resource 404 console errors. Evidence builders and artifact upload completed. No golden snapshots or provenance were changed.

## Focus of independent review

1. At direct 28×42 scale, are both profile eye/brow cues clearly readable and unobscured by the ear cup?
2. Does Tech's angular/asymmetric field-shell construction and rear service pack distinguish the side/back silhouette from Clinic beyond palette and harness differences?
3. Does the left-profile meter read as held, with a clear hand-to-tool contact at both scales, without the prop becoming oversized?
4. Are all four directions coherent with the approved round-05 silhouette concept, including ear protection, harness, utility shell and diagnostic meter?
5. Any clipping, detached geometry, implausible anatomy, direction/handedness issues, or game-scale readability regressions?

Treat IoU/similarity diagnostics as human-review prompts, not automatic failures. Do not change or approve golden snapshots. Do not begin Hacker or Fisher until Tech review is complete and the project owner approves the direction.

## Current disposition

ChatGPT automated QA: passed for targeted captures. Internal visual inspection: completed; profile face readability remains insufficiently clear at direct 28×42. The review package is held for one more focused correction and fresh browser artifact.  
Independent Claude review: not yet requested; wait for the corrected artifact.  
Project-owner rendered-art approval: pending.  
Hacker and Fisher: held until Tech's corrected output clears internal QA and owner review.
