# Technical Implementation

## Repository and branch

- Repository: `tinytime/Tinytime.github.io`
- Active work branch: `npc-granny-baseline-overhaul`
- Main game page: `VaporCity_HD2D_Hybrid_Test.html`
- Civilian renderer: `npc_sprites.js`
- Browser QA: `qa/vapor-city-browser-qa.mjs`
- Workflow: `.github/workflows/vapor-city-browser-qa.yml`

Always check the branch head before editing. The code may have changed since this background document was written.

## Rendering model

The game page contains the game/runtime and loads the NPC rendering code. The civilian rendering logic is in `npc_sprites.js`. The vector pilot work is being integrated into the existing civilian dispatch rather than creating an unrelated standalone renderer.

Usher, Cook, Courier, Runner, Coach, and Referee each have dedicated vector draw paths in `npc_sprites.js`, dispatched by character kind. Each vector path renders to the 64×96 QA canvas for existing grid/palette metrics, then exits before legacy pixel body and prop layers can paint over the vector character. Runner's `drawRunnerVector(...)` has a distinct airborne sprint pose, coral race singlet, split shorts, race bib, sweatband, stopwatch, and technical shoes. Coach's `drawCoachVector(...)` uses a grounded stance, forest-green warm-up jacket, cream shoulder yoke, whistle, marked clipboard, track trousers, court shoes, and silver-templed side-profile face. Referee's `drawRefVector(...)` uses a black/ivory striped official shirt, vermilion shorts, tall socks, whistle, and raised yellow card; the final revision keeps the card in the same anatomical left hand across all four views, adds rear hair beneath the sweatband, and narrows the profile torso.

Important implementation principle: when adding further characters, follow the integration pattern only where it is appropriate. Give each character a dedicated draw function and character-specific paths, palette, and props. Ensure the vector path exits before legacy pixel layers can overwrite it. Do not make one generic renderer whose only differences are palette values.

## Existing reference assets

- `docs/usher_vector.js` — initial Usher vector source/reference. Its header currently describes it as a proposed design and may not reflect the final integrated state; the live renderer in `npc_sprites.js` is authoritative.
- `docs/granny_vs_vector_usher_4x.png` — enlarged comparison image.
- `qa/granny-ref.json` — measured Granny scale and directional reference.
- `qa/granny-ref.js` and `qa/generate-granny-ref.mjs` — reference-generation support.
- `qa/npc-inventory.json` and `qa/generate-npc-inventory.mjs` — generated live NPC inventory and renderer classification.

## Technical guardrails

- Preserve the existing game placement, direction conventions, animation/movement inputs, and scale behavior.
- Verify front (`d`), back (`u`), left (`l`), and right (`r`) render paths.
- Make sure mirrored side views are intentionally composed and props do not disappear or land on the wrong side.
- Keep outlines consistent and readable against the game background.
- Keep the character's feet aligned to the intended baseline.
- Keep the custom vector path from being overwritten by legacy pixel rendering.
- Do not alter unrelated NPC families or global rendering behavior to solve a character-specific issue.
- Do not change the QA scope policy or golden snapshot provenance merely to get a green workflow.
- Keep generated inventory data synchronized if a renderer/archetype mapping change affects it.

## Suggested implementation sequence for each new vector character

1. Inspect the current branch head and the live renderer dispatch.
2. Inspect the existing character's four-direction output and the Granny reference.
3. Design a genuinely distinct character, including all four directions.
4. Integrate the dedicated vector draw function into the correct dispatch path.
5. Ensure legacy pixel layers do not overwrite the vector output.
6. Add or adapt character-aware QA metrics without weakening checks for unrelated legacy characters.
7. Render four directions, enlarged comparisons, and the town/game context.
8. Inspect actual images, not only numeric reports.
9. Run browser QA and inspect the uploaded artifact even if the workflow reports failure.
10. Update the character tracker and review log with exact commit/run evidence.

## Do not assume

The initial vector file under `docs/` is not necessarily the live implementation. A successful isolated render does not prove the game dispatch uses it. A passing targeted check does not prove the entire browser workflow passes. Verify each claim against the current branch and the relevant artifacts.


## 2026-11-19 second-batch renderer polish

The latest tested source is `52f286912bf6fa44219972520211bc13d6f3ef7a`. Runner's enlarged side-profile curl crown was lowered slightly after run #431 detected a single antialiased pixel touching the top edge in both profile captures; run #432 verifies all 92 directional captures have zero edge contacts. Referee's optional profile polish adds a clearer projecting nose, warm ear detail and an angled jacket seam to suggest a subtle three-quarter torso plane. These details are implemented in the dedicated Referee vector draw path in `npc_sprites.js`; they are not approval by themselves. See the [latest Claude review package](qa-artifacts/runner-coach-referee-run-429/README.md).
