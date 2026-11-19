# Runner / Coach / Referee — refreshed independent review package (run #452)

## Review request

Please independently compare Runner, Coach, and Referee against Granny Volt's 10/10 quality benchmark. Inspect the actual four-direction native and direct game-scale renders in the linked GitHub Actions artifact. Provide separate scores/verdicts, mandatory corrections versus optional polish, and an overall batch verdict. Do not infer approval from the internal QA pass.

## Exact source and QA evidence

- Branch: `npc-granny-baseline-overhaul`
- Renderer source commit: [`4eafc657fa9ee15db3b70f3c64a76280d4add0a6`](https://github.com/tinytime/Tinytime.github.io/commit/4eafc657fa9ee15db3b70f3c64a76280d4add0a6)
- Browser QA: [run #452](https://github.com/tinytime/Tinytime.github.io/actions/runs/44587406698)
- Job: `135783978098`
- Artifact: `14562025835` (`vapor-city-browser-qa`)
- Artifact includes native directional captures, direct game-scale captures, role-debug, Granny comparison, gallery, town scene and `report.json`.

## Changes since run #446

### Runner
- Side torso lower forward edge narrowed (path point x=71 to x=64), without changing the front/back torso geometry.
- Side collar/neckline and race bib remain shifted onto the forward chest plane in both mirrored side views.
- The front view remains unchanged from the owner's accepted front-profile feedback.
- This pass is specifically to address the owner's note that the side profile remained too broad at its front edge.

### Coach and Referee
- No source changes in this commit relative to the previous reviewed group state.

## Evidence paths inside the run #452 artifact

- Runner native directional PNGs: `npc-type-directions/runner-{front,back,left,right}.png`
- Runner direct game-scale PNGs: `npc-game-scale-28x42/runner-{front,back,left,right}.png`
- All three characters' native captures: `npc-type-directions/{runner,coach,ref}-{front,back,left,right}.png`
- All three characters' direct game-scale captures: `npc-game-scale-28x42/{runner,coach,ref}-{front,back,left,right}.png`
- Role debug: `runner-coach-ref-cook-courier-usher-role-debug-8x.png`
- Granny comparison: `granny-before-after-4x.png`
- Gallery: `npc-gallery-4x.png`, `npc-gallery-1x.png`
- Town regression: `game-town-1x.png`
- Machine report: `report.json`

The direct 28×42 captures are rendered at live `OWT=36`, vector scale `.28`, with no resize.

## Internal QA summary

Passed:
- JavaScript and NPC sprite syntax; vector renderer module loaded.
- Direct 28×42 capture audit: 12/12.
- Role-debug audit: 12/12.
- Directional visual integrity: 92/92, zero edge contacts and zero detached large components.
- Palette and body/baseline checks.
- Prop audit.
- Silhouette-quality checks: 180/180.
- Gallery visual pass.
- Town regression: street map, 16 NPCs, Granny present.
- `pageErrors` and `scriptErrors` empty.

Overall workflow is **FAILED** on existing/global gates:
1. Full-civilian silhouette audit: Clinic/Sailor front IoU `0.9094292803970223`, above the strict threshold; other close legacy pairs are listed in `report.json`.
2. Golden snapshots: 23 changed / 1 match; baseline explicitly unapproved. No snapshots were refreshed or approved.
3. Existing missing-audio resources: 180 console 404 errors.

These global failures are not identified as Runner-specific regressions.

## Review criteria

For each character, assess:
- Originality and identity relative to other civilians and Granny.
- Silhouette, anatomy, proportions and stance in all four directions.
- Face construction and expression.
- Clothing layers, materials, outline quality and palette.
- Prop clarity, placement and physical integration.
- Readability at 64×96 and direct 28×42 game scale.
- Any mandatory changes before owner approval.

For Runner specifically, please examine whether the slimmer side contour is now proportionate, whether the collar and bib sit naturally on the forward chest plane in both mirrored views, and whether the details remain legible at 28×42.

## Approval boundary

This is evidence for independent review only. Runner, Coach and Referee remain **NOT APPROVED** until Claude's review is recorded, any mandatory changes are rechecked, and the owner explicitly accepts the designs. Keep the remaining 20 civilians on hold. Do not refresh or approve golden snapshots.
