# Runner / Coach / Referee — direct game-scale QA package (run #442)

**Status:** Internal QA and visual inspection PASS for these three characters. **NOT APPROVED** pending independent Claude review and explicit owner approval.

## Exact source and run

- Source commit: [9d7e66ba9667a555c4b42c65d5910a2ea08cc055](https://github.com/tinytime/Tinytime.github.io/commit/9d7e66ba9667a555c4b42c65d5910a2ea08cc055)
- Branch: `npc-granny-baseline-overhaul`
- Browser QA: [run #442](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577766543)
- Job: `135749839135`
- Artifact: [vapor-city-browser-qa.zip — artifact 14558375601](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577766543/artifacts/14558375601)
- Artifact retention: 14 days from 2026-11-19.

## Evidence in the artifact

- `npc-game-scale-28x42/`: 12 direct game-scale PNGs — Runner, Coach and Referee × front/back/left/right. These are newly rendered by `owCiv` at the live town tile size `OWT=36` and vector scale `0.28`; no 64×96 image is resized to create them.
- `npc-type-directions/`: 12 native 64×96 PNGs for the same characters and directions.
- `runner-coach-ref-cook-courier-usher-role-debug-8x.png`: role-colour diagnostic sheet, 12 captures.
- `npc-gallery-4x.png`, `npc-gallery-1x.png`: full civilian gallery evidence.
- `game-town-1x.png`: street/town regression scene; this does not specifically spawn these three NPCs.
- `report.json`: source SHA, capture dimensions/method, automated checks and global failures.

## Internal QA results

- Game-main syntax, NPC renderer syntax and module load: PASS.
- Direct game-scale capture audit: **12/12 PASS**, each exactly 28×42, correct unique character/direction pair, direct `owCiv` capture method.
- Native directional captures: 12/12 present at 64×96.
- Role-debug: 12/12 PASS.
- Directional visual integrity: 92/92 PASS; no crop-edge contacts and no detached large components.
- Face distinctness: 23/23 unique in the existing native/derived-scale audit. Note that the all-civilian 28×42 face-signature sub-audit still derives its signature images from native snapshots; the separate direct 28×42 capture files in this package cover Runner/Coach/Referee.
- Prop audit, archetype silhouette-quality audit (180/180), gallery render and town regression: PASS.
- Town regression: street map, 16 NPCs, Granny present.
- Browser page errors: 0; script errors: 0.

## Visual inspection

All 12 native 64×96 captures, all 12 direct 28×42 captures, the role-debug sheet, full gallery and town regression screenshot were inspected.

- **Runner:** front/back/left/right remain coherent; profile retains two distinct stride legs/feet, readable bib and shoe separation at direct game scale; cleaned profile nose/mouth does not show the removed cheek flecks.
- **Coach:** profile head reads as a true side silhouette with one visible eye, ear, projecting nose and jaw; narrow side torso remains coherent; clipboard/hand relationship is visible; angled whistle with dark opening remains legible in the native and game-scale renders.
- **Referee:** raised card arm/card remain on the forward/face side in both profiles; card is still readable at game scale.
- No character-specific crop-edge clipping or detached large components were found.

## Workflow-wide failures (do not conceal)

The overall GitHub Actions job is **FAILED**, despite the targeted character checks passing:

1. The full 23-civilian type-silhouette audit still fails: Clinic/Sailor front alpha-mask IoU is `0.9094292803970223`, above the required `<0.90` threshold. Coach/Courier back is the next closest at `0.8904785397138628`.
2. Golden snapshot comparison: 23 changed / 1 match. The golden baseline remains explicitly unapproved. **No snapshots were refreshed or approved.**
3. Existing missing audio resources produce 180 console errors (including 404s); no page or script runtime errors were recorded.

These global failures do not invalidate the targeted Runner/Coach/Referee capture and visual checks, but the workflow must not be described as fully green.

## Claude independent review request

Use this package and the exact source commit above. Compare Runner, Coach and Referee against Granny Volt's approved quality benchmark without treating Granny as a template. Review both native 64×96 and direct game-scale 28×42 evidence, including all four directions.

Please provide:
- An individual score and verdict for Runner, Coach and Referee.
- Any mandatory corrections, especially Runner's profile face/stride, Coach's profile anatomy/clipboard grip/whistle mouthpiece, and Referee's forward-side card arm.
- A collective readiness verdict for owner review.

The standard town screenshot is regression context only; it does not prove these three are spawned in the live town. Do not approve golden snapshots. Remaining 20 civilians stay on hold until Claude review and owner approval are complete.
