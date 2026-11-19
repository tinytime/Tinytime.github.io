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


## 2026-11-19 owner-feedback profile corrections

Owner feedback from browser QA run #434 identified three profile-specific anatomy/layering defects. Renderer commit `6332fb4622ed56686771e60541f975b2d6e33a61` changes only the three affected vector draw paths in npc_sprites.js:
- Runner: removed a preliminary side-leg/boot underlayer that duplicated one of the two later stride planes.
- Coach: replaced the front-oval profile head treatment with a shaped profile silhouette and forward visor; reordered the side clipboard layers so the board and paper render in front of the forearm/hand while retaining a visible finger overlap.
- Referee: moved the raised card arm and card to the forward/face side of the side-profile body; left-facing output is mirrored from the same anatomical construction.

Browser QA run #435 (`44570451203`) is the required verification run for this exact source. These are implementation changes, not approval. Inspect all four directions and both native/game scales before recording them as visually verified.


### Coach side-torso refinement — 2026-11-19

Visual inspection of run #435 showed that the Coach side-view overlay still inherited the broad front-view jacket base. Follow-up renderer commit `b15d14fd9c6604c7ee232adf47d44a5d328054b3` now paints that broad base only for non-side views and uses a narrower side torso. This requires fresh browser QA; run #435 predates the change.


## Run #436 — owner-feedback profile correction verification (2026-11-19)

- Tested renderer/source: `b15d14fd9c6604c7ee232adf47d44a5d328054b3` (run #436, run ID `44570917085`, job `135725393768`). Artifact `14553029329` (`vapor-city-browser-qa`); [GitHub Actions run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570917085).
- Actual native directional evidence: all 12 PNGs in `npc-type-directions/` are 64×96 (Runner, Coach, Referee × front/back/left/right). Enlarged 4× sheet and separately downsampled 28×42 visual check were inspected locally from these captures. The artifact itself does not contain separate browser-captured 28×42 character PNGs; record the 28×42 check as a derived resampling, not a native game-scene capture.
- **Runner:** both profiles now show two distinct stride legs and two feet; the duplicate third-leg underlayer is gone at native and derived 28×42 scale.
- **Coach:** side head and torso read as a side view rather than the front body underneath a turned head. Clipboard is in front of the arm/hand and remains legible; hand/board contact is visible. The follow-up torso narrowing from `b15d14f` is present in the tested source.
- **Referee:** raised card arm/card are on the forward/face side in both left and right profiles; no longer emerge from behind the body.
- Targeted checks: syntax/module/inventory pass; palette and body checks pass; role-debug 12/12; directional integrity 92/92, zero edge contacts and zero detached large components; prop audit passes; silhouette-quality 180/180; gallery visual pass; town scene pass (16 NPCs, Granny present); page errors 0 and script errors 0.
- Overall workflow remains failed on unrelated/global checks: civilian type silhouette audit max IoU `0.9094292803970223` (Clinic/Sailor overlap); golden snapshot comparison 23 changed / 1 match, with no baseline refresh or approval; existing audio resource 404 console errors. No snapshots were refreshed or approved.
- The QA report has no character-specific town spawn/capture for Runner/Coach/Referee; town screenshot is regression context only. Granny comparison remains a separate reference check.
- **Internal visual verdict:** all three owner-reported profile defects are corrected in the run #436 native renders. This is not independent Claude review or owner approval. Runner/Coach/Referee remain NOT APPROVED pending Claude's comparative review and owner decision. Keep remaining 20 civilians on hold.


## Owner-requested side-profile anatomy correction — 2026-11-19

Owner feedback identified double-visible arms in the side profiles of Runner, Coach and Referee, and questioned Runner's unusually angular, trouser-like legs. Renderer commit `98f58884f9fa2609414b17f5a5ce28e275ab3064` removes the far arm from each side profile while preserving Runner's stopwatch arm, Coach's clipboard arm and Referee's raised-card arm. Runner's profile legs were then refined with curved thigh/calf contours and exposed skin below the shorts. Follow-up commit `21481ee1768e80595cfdb13f6e338f57c10d076c` extends the shorts-to-calf separation into front/back views for consistent anatomy.

**Animation clarification:** Runner's vector pose is drawn statically from direction; the current draw path does not animate the leg polygons. The airborne running posture is a deliberate still pose, not a temporary frame that animation will automatically normalize. Every still direction must therefore look anatomically intentional. Fresh browser QA run #444 (`44579787401`, artifact `14558936072`) tested the revised source. Syntax/module, direct capture 12/12, role-debug 12/12, visual integrity 92/92, face distinctness 23/23, palette/body, props, silhouette quality 180/180, gallery and town regression passed; no page/script errors. All native and direct game-scale images were visually inspected. The overall workflow remains failed on the existing global silhouette overlap, unapproved snapshots and audio 404 gates. The corrections are internally verified, not Claude-reviewed or owner-approved.


## Coach profile volume and Runner leg follow-up — 2026-11-19

- Source commit `7b265931c800ad6055e16cc024f0339cefd517e5` widened Coach's side-profile rear jacket contour and moved the whistle/lanyard toward the front. Run #445 exposed one remaining Runner trailing-leg issue: the lower leg still read too much like a long dark trouser shape.
- Follow-up source commit `fafb991d3ce94ffa491179a84ecb63c10934b0e0` shortened the trailing shorts form and exposed a distinct tapered calf. Run #446 tested this exact renderer commit.
- Run #446 native 64×96 and direct 28×42 captures were inspected for all 12 Runner/Coach/Referee directions. See [run #446 review package](../qa-artifacts/runner-coach-referee-run-446/README.md).


## Five-civilian direct game-scale QA capture (2026-11-19)

The `window.SG.npcRenderGameScaleSnapshots()` hook in `VaporCity_HD2D_Hybrid_Test.html` now renders **Usher, Cook, Courier, Coach, and Referee** directly through `owCiv` at the live `OWT=36` / vector scale `0.28`. It emits four directions per character as native 28×42 PNGs; this is a fresh renderer pass, not a resize of the 64×96 QA captures. `qa/vapor-city-browser-qa.mjs` asserts exactly 20 unique character/direction pairs, all five named characters, all four directions, expected dimensions, and the explicit direct-render capture method. Implementation commit: `c1d8d75aceeef0c9a689c2f8c40ae88909c55ada`; run #463 is the first verification of this expanded hook. Do not call this tested until that run completes and its report/artifact confirms all 20 captures.


The evidence generator was subsequently extended to create a second contact sheet from the direct game-scale PNGs. [Run #464](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571) verified both sheets and uploaded [artifact `14568746641`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571/artifacts/14568746641): native sheet `five-civilian-native-4x-contact-sheet.png` and direct game-scale sheet `five-civilian-game-scale-4x-contact-sheet.png` (730×1208). The latter is made from the 28×42 renderer outputs, enlarged 4× nearest-neighbour only for inspection.


## Civilian Vector Construction Standard — technical companion (2026-11-19)

See [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md) for measurement definitions, anatomy/prop separation, per-character proportion cards, the eight-stage pipeline, the provisional scorecard, and proposed QA instrumentation. The Granny reference values originate from `qa/granny-ref.json`; `qa/granny-ref.js` is generated and must not be edited by hand.

No renderer or browser QA code was changed as part of creating the standard. Before adding automated hard-fail proportion checks, measure the five review characters and Granny using consistent body masks, accessory exclusions, alpha thresholds, and landmark conventions. Compare pose categories separately. Keep silhouette IoU as a human-review trigger until the threshold is calibrated against actual judgments. Preserve current QA gates and golden-snapshot policy.

## Semantic civilian proportion measurement — 2026-11-19

The browser QA workflow validates the semantic measurement framework in `qa/civilian-proportion-measurements.mjs` and `qa/civilian-anatomy-landmarks.json`. The framework accepts human-verified landmarks in Granny's 100×140 source coordinate convention and calculates ratios from anatomical landmarks rather than accessory-inclusive sprite bounds. Headwear and prop polygons are recorded separately. Runner uses a dynamic-pose joint model (shoulder/elbow/wrist/hip/knee/ankle on both sides) and receives no upright leg-region ratio.

The initial manifest preserves Granny's existing measured reference as a separate legacy baseline. All six current civilian annotations remain pending until their landmarks are verified against actual four-direction renders. The framework reports pending status rather than guessing coordinates. Its test suite and manifest validation run before browser diagnostics; the resulting JSON report is uploaded with the QA artifact. No new proportion thresholds or hard-fail gates are introduced.
