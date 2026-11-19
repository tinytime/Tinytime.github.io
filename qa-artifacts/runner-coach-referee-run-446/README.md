# Runner / Coach / Referee — independent review package (run #446)

## Review request

Please independently compare Runner, Coach, and Referee against Granny Volt's 10/10 quality benchmark. Review the actual four-direction native and game-scale renders, not code descriptions alone. Provide a candid comparative verdict and required corrections. Referee's latest design is accepted by the owner as visually good; this is not blanket approval of the batch.

## Exact source and QA evidence

- Branch: `npc-granny-baseline-overhaul`
- Renderer source commit: [`fafb991d3ce94ffa491179a84ecb63c10934b0e0`](https://github.com/tinytime/Tinytime.github.io/commit/fafb991d3ce94ffa491179a84ecb63c10934b0e0)
- Browser QA: [run #446 / 44581720083](https://github.com/tinytime/Tinytime.github.io/actions/runs/44581720083)
- Job: `135762041794`
- Artifact: `14559965367` (`vapor-city-browser-qa`)
- Artifact contents: native 64×96 captures, direct game-scale 28×42 captures, role-debug sheet, Granny comparison, gallery, town scene and `report.json`.

## Owner feedback addressed in this source

### All three
- Side profiles show only the near arm; far arm remains occluded.

### Coach
- Added width along the rear contour of the side-profile jacket so the body reads less edge-on and less skinny.
- Shifted the side-profile lanyard and whistle toward the face/front edge in both mirrored profiles so the pendant stays on the character's front.
- Retained the near clipboard arm and visible clipboard grip.

### Runner
- Refined the side-profile stride anatomy again.
- Shorts now stop at the knee on the trailing leg, with a distinct exposed calf; both legs read as separate thigh/shorts and lower-leg forms.
- Kept the dynamic stride, technical shoes, stopwatch and race bib.

### Referee
- No change in this pass. Owner feedback: “Ref good”.

## Evidence paths inside the artifact

- Native directional PNGs: `npc-type-directions/{runner,coach,ref}-{front,back,left,right}.png`
- Direct game-scale PNGs: `npc-game-scale-28x42/{runner,coach,ref}-{front,back,left,right}.png`
- Role debug: `runner-coach-ref-cook-courier-usher-role-debug-8x.png`
- Granny comparison: `granny-before-after-4x.png`
- Gallery: `npc-gallery-4x.png`, `npc-gallery-1x.png`
- Town regression: `game-town-1x.png`
- Machine report: `report.json`

All 12 game-scale images are direct `owCiv` renders at live `OWT=36`, vector scale `.28`, with no resize.

## Internal QA summary

Targeted checks passed:
- JavaScript and NPC sprite syntax; renderer module loaded.
- Direct 28×42 capture audit: 12/12.
- Role-debug audit: 12/12.
- Directional visual integrity: 92/92, zero edge contacts and zero detached large components.
- Face distinctness: 23/23 at native and game scale.
- Palette, body/baseline, prop and silhouette-quality checks.
- Gallery visual pass.
- Town regression pass (street map, 16 NPCs, Granny present).
- `scriptErrors` and `pageErrors` empty.

The overall workflow remains failed on existing global gates:
1. Full-civilian silhouette audit: Clinic/Sailor front IoU `0.9094292803970223`, above the strict `<0.90` threshold.
2. Golden snapshots: 23 changed / 1 match; baseline explicitly unapproved. No snapshots were refreshed or approved.
3. Existing missing-audio resource 404s (180 console errors).

These global failures are not Runner/Coach/Referee-specific regressions.

## Review criteria

For each character, assess:
- Originality and identity relative to the other civilians and Granny.
- Silhouette, anatomy, proportions and stance in all four directions.
- Face construction and expression.
- Clothing layers, materials, outline quality and palette.
- Prop clarity, placement and physical integration.
- Readability at 64×96 and direct 28×42 game scale.
- Whether any remaining change is required before owner approval.

## Approval boundary

This package is evidence for independent review only. Runner, Coach and Referee remain **NOT APPROVED** until Claude's review is recorded and the owner explicitly accepts each design. Referee's positive owner feedback is recorded but is not a substitute for the batch's required independent comparative review. Keep the remaining 20 civilians on hold. Do not refresh or approve golden snapshots.
