## Latest QA harness follow-up — Run #649 (2026-11-20)

The QA harness now includes Tech in the vector civilian classification and expected counts. [Run #649](https://github.com/tinytime/Tinytime.github.io/actions/runs/44753230689), artifact [14636147603](https://github.com/tinytime/Tinytime.github.io/actions/runs/44753230689/artifacts/14636147603), tested `2d963db5e0b54f1f7b9afd652b33c053aa168c1b`. Directional integrity 92/92, direct 28×42 assertion 20/20, role debug 12/12, prop audit 10 archetypes, gallery and silhouette diagnostic inventory pass; page/script errors 0. Overall Actions failed only at the unapproved golden snapshot gate (1 match / 23 changed) and existing audio/resource 404 diagnostics. No snapshots or provenance changed.

## Next civilian batch — preflight only (2026-11-20)

The owner approved batch #9–11: Tech's production-renderer art and Hacker/Fisher finished design art. Hacker/Fisher have not been integrated as dedicated production renderers. The next set is Sailor (#12), Slicker (#13), Painter (#14). Their preflight is [SAILOR-SLICKER-PAINTER-PREFLIGHT.md](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md). Legacy Trades metadata is reference context only; do not reuse the legacy shared Trades renderer or its wrench/tool-pocket layout as a vector template. No renderer changes are authorized until each silhouette and construction card is owner-approved.

## Third-batch reviewer correction implementation — 2026-11-20

Current handoff: [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md).

- **Tech renderer correction:** npc_sprites.js commit cea601503504c6b23527452a66cc64c3cb93e7a7 darkens/desaturates the petrol field shell and adds a squared storm-flap shoulder outline across front/back/profile. Clinic source/art is unchanged. Browser QA [Run #648](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957), artifact [14635417540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957/artifacts/14635417540), tests that exact source. Tech native/direct captures 4/4 each, zero edge contacts, role-debug 4/4, explicit town spawn/close-up pass; wider integrity 92/92, face uniqueness 23/23, gallery/prop/Granny checks pass; page/script errors 0. Actual Tech/Clinic comparisons and town close-up inspected. Overall workflow remains red on unapproved snapshot baseline (1 match / 23 changed) and existing 180 audio/resource 404s; no snapshots/provenance changed.
- **Hacker/Fisher design corrections:** source HACKER-FISHER-FINISHED-DESIGN-STUDY.svg is revised; Hacker front chest narrowed with separated bare forearm, left-profile drape tapered and temple/earbud cues clarified. Fisher rear smock/yoke is ochre, inter-leg bar removed, and right-profile hip pouch is smock-coloured with seam detail. Playwright design render [Run #9](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697), artifact [14636805512](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697/artifacts/14636805512), source SVG SHA-256 5e20a05a445b4684c3a212bf6e55fd61b3abb230c557e5d7ab85842a6ab03a52. Eight native 64×96 and eight direct design-projection 28×42 views, plus 4× enlargements; render passed and actual sheets inspected. This is design-only evidence, not game renderer QA.
- **Gate:** Claude's independent re-review and owner acceptance are pending. Hacker/Fisher renderer implementation remains held. No golden snapshots or provenance changed.

# Technical Implementation

## Current authority — 2026-11-20

- **Third-batch independent review package:** [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md) combines Tech's production renderer evidence with Hacker/Fisher's finished design-stage evidence. The latter are not game-renderer captures and do not certify production integration. Internal QA is complete at each stated stage; independent review and owner acceptance remain pending.
- **Tech final correction checkpoint — Run #644:** Latest tested source is `579f0fff61b8cfd4e416cc59381187b162d3b8ca`; [Run #644](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189), artifact [14634020084](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189/artifacts/14634020084). `9f11ca2` differentiates the profile shell and strengthens the meter grip; `579f0ff` replaces the rear hip-level mass with a compact high-mounted service loop and short split flap. The QA harness includes a native 1× town close-up after explicit Tech spawn. Tech captures 4/4 native 64×96 and 4/4 direct 28×42; zero edge contacts; role-debug 4/4; town spawn and close-up present. Wider checks: syntax/module/inventory PASS; directional and visual integrity 92/92; face uniqueness 23/23; general role-debug 12/12; prop, gallery and Granny checks PASS; page/script errors 0. Actual captures at both scales, Clinic comparisons, role-debug sheet and town close-up were downloaded and inspected. Clinic/Tech full-character IoU is now back 0.8775, front 0.8922, right 0.8562; these remain human-review prompts only. Overall Actions failed on the unapproved snapshot baseline (1 match / 23 changed) and 180 existing audio/resource 404 console errors. No snapshots or provenance changed. Tech is internally QA-passed and visually inspected; ready for Claude's exact-output review. Owner rendered-art approval remains pending; Hacker/Fisher stay held pending review and owner approval.

- **Tech (#9) renderer implementation:** Owner authorized implementation on 2026-11-20. Dedicated `drawTechVector` is in `npc_sprites.js` commit `67b397242996f675c4a257415e4620fa0d3a40ca`; Tech-only four-direction native/direct capture QA was added in `2eab7e84027f088ed8f9f7be5740547f590aa13d`. Subsequent renderer and QA refinements are recorded in the Tech review package. The latest artifact and disposition are recorded above; Hacker and Fisher remain untouched pending independent review and owner approval.

- Final Guard/Vendor/Clinic renderer for this review round: `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`. Run #629 tested that exact source and its artifact was visually inspected at native 64×96 and direct 28×42; Vendor profile eye is now legible in both directions and both scales. Guard and Clinic profile cues remain intact.
- Owner approval for the rendered three-character batch was received 2026-11-20. Claude's exact-output independent review remains pending; do not record final batch closeout until it is logged.

- Latest renderer source for the approved Guard/Vendor/Clinic batch: `28bf7d31938c3f7a574a3b9df48d2f73488a5d80`. Added `drawGuardVector`, `drawVendorVector` and `drawClinicVector`, wired them into `owCiv` dispatch, and added palette-role legends. Guard scale and Vendor left-profile/front-tray placement received edge-clearance refinements. The approved designs are rendered in all four directions.
- Run #603 tested that exact renderer. Targeted evidence: 20/20 native and 20/20 direct 28×42 captures, 92/92 directional integrity, zero edge contacts/detached large components, role-debug 12/12, prop audit/gallery pass, page/script errors 0. Claude independently judged U4 resolved in both profiles and at both scales.
- Overall Run #603 Actions concluded failure on the unapproved snapshot baseline (1 match / 23 changed) and 180 existing audio-resource 404s. No golden snapshots were changed or approved.
- Five owner-approved designs: Usher, Cook, Courier, Coach and Referee. Preserve current renderers and owner dispositions; no art changes authorized by review closeout.
- Runner is built but not included in the five-character approval; it remains pending focused review.
- Run #624 [tested the exact renderer and QA harness](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670975455), artifact `14600880214`. Dedicated captures: 12/12 native 64×96 and 12/12 direct 28×42 using the 39px game sprite anchor; dedicated alpha-bound check confirms 24/24 unclipped captures. Palette audit: 23 civilians / 14 legacy / 9 vector. Body audit: max height deviation 0.875 px, max baseline delta 1. Directional integrity: 92/92, zero edge contacts, zero detached large components. Face uniqueness: 23/23 at both scales. Prop audit, full 23-civilian × four-direction roster gallery (92 views) and town smoke check passed; the separate 40-cell archetype-grid integrity check also passed. Run conclusion remains failure on the pre-existing unapproved snapshot gate; no snapshots were changed. Legacy archetype data remains reference context only, not a shared vector template.


## Historical build and approval status — 2026-11-19

This is the current status summary; dated historical entries below remain historical and are superseded where they conflict.

- The construction standard is available as the working method, but remains subject to independent Claude review and owner ratification. Proportion bands and scorecard values remain provisional/non-enforcing.
- Pairwise silhouette IoU remains a diagnostic review trigger, not a universal hard-fail art threshold. Current global watch items: Clinic/Sailor front 0.9094292803970223; Coach/Courier back 0.890479. Inspect the exact pair/direction at native and direct game scale and record a human judgment. Do not optimize art to a number.
- The current correction/review group is Usher, Cook, Courier, Coach and Referee. Usher/Cook/Courier's earlier owner approvals were reopened and are historical only. Runner is excluded from this review submission and remains for a later focused review.
- The remaining 14 unstarted civilians are ON HOLD. Do not begin them until the current three-character batch completes internal QA, Claude independent review, valid findings are resolved, and the owner gives final approval.
- Run #591 verified targeted Granny/semantic/capture/overlay/directional/gallery/town checks, but the overall Actions workflow concluded FAILED on the global silhouette and unapproved golden-snapshot gates (1 match / 23 changed). Audio 404s are expected branch noise and non-blocking; do not add audio or count these as character defects. No snapshots were refreshed or approved.
- Granny remains reference_only; candidate semantic landmarks/polygons are not verified measurements. Exact pixel-derived contour fit is renderer-mask evidence, not proof of anatomical semantics. No proportion calibration or candidate promotion is authorized.


## Latest five-character independent review — 2026-11-19

Claude reviewed Run #595 and recommends ready for owner review, with P2 findings disclosed; this is not approval. No P0/P1 issues remain. The five designs remain NOT APPROVED pending owner decision. Renderer source remains c354abfa3d78b46dc982a03d2c5d1ece0c918257; this documentation update does not alter renderer code. Run #595 remains the latest relevant character QA artifact; overall workflow failure is due global silhouette and unapproved snapshot gates. Do not change golden snapshots without explicit authorization.

The 23-name design roster, Granny benchmark, and 24 live inventory mappings are separate counts. Runner is built but excluded from this five-character review; the remaining 17 are on hold. Semantic candidates remain diagnostic and unverified.

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


## Semantic civilian proportion measurement framework — 2026-11-19

Implemented in `qa/civilian-proportion-measurements.mjs`, with the source annotation manifest at `qa/civilian-anatomy-landmarks.json` and annotation procedure at [Semantic Civilian Anatomy Annotation Guide](../qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md).

The framework uses a shared 100×140 local source-space convention and separates anatomical body polygons from headwear and prop polygons. Required per-direction landmarks are head top, chin, shoulder endpoints/row, pelvis row and foot baseline. Runner is explicitly dynamic and requires shoulder/elbow/wrist/hip/knee/ankle joints; the script does not apply standing leg-height ratios to it.

The report derives body/head/shoulder/torso/neck and (standing only) lower-body intervals and ratios. It validates polygon geometry and coordinates against the source canvas. Ratios are descriptive only; provisional bands are not hard-fail CI gates.

Current data state is intentionally honest: Granny's existing measured facts are stored as `reference_only` because the legacy umbrella/body mask convention is not yet harmonized with the new semantic mask. All six current NPCs have source-derived candidate landmarks in all four directions and remain `source_annotated`; the report counts these six as pending until their masks are visually verified. Referee's raised arm/hand is represented by separate `bodyAppendagePolygons` to avoid a self-intersecting single contour. Runner remains dynamic with bilateral limb joints and no upright leg-height ratio. The validator allows a one-source-unit shoulder-height offset only in profile views, while front/back shoulder landmarks must share a row. The tool does not invent landmarks or mark characters measured based on whole-sprite bounds.


## Five-character correction round — Claude targeted findings (2026-11-20)

- Owner-authorized scope: Usher, Cook, Courier, Coach and Referee only. Runner remains excluded; the remaining 17 civilians remain ON HOLD. Referee's dedicated renderer was not modified.
- Renderer commit `d1f937730cbc823fa784f896e716c30ec0c15f71` made the first targeted pass: lighter Usher trousers/shoes and a clearer single badge/waist separation; Coach's first straight-hem jacket revision and reduced silver temple shapes; Cook's first connected cuff/hand/pan construction and lower pan placement.
- Review-sheet tooling commit `e599500e16ad8673fe8073e16fa007183306edf7` adds dedicated Coach/Courier back comparisons (native and direct game scale), Cook prop-contact sheets (native and direct game scale), and Usher direct game-scale readability sheets. These are evidence-generation aids only.
- Browser QA Run #593 ([run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44644502056), source `e599500e16ad8673fe8073e16fa007183306edf7`, artifact `14587548199`) produced 20/20 native 64×96 captures and 20/20 direct 28×42 captures. Syntax and inventory passed; directional integrity 92/92, role-debug 12/12, prop audit, gallery and town regression passed. The five-character contact sheets and all five targeted sheets were generated.
- Internal visual inspection of Run #593 found the Coach/Courier back hem distinction improved, Usher's trousers clearer at game scale, and Cook's pan lower with a visible arm path. Two residual issues remained: additional rear silver shapes still read as headset pieces, and Cook's hand was obscured by later pan drawing at game scale.
- Follow-up renderer commit `a5a22da39a28e51121326d8cc0fc07f36ac1d51d` removes Coach's residual silver side shapes and paints Cook's hand after the handle/pan so the grip can read over the prop. This is implemented but not yet visually verified.
- Browser QA Run #594 is in progress against exact renderer source `a5a22da39a28e51121326d8cc0fc07f36ac1d51d`: [run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44644810758). Do not treat Run #593 as verification of this follow-up.
- Run #593's overall workflow concluded FAILED on the full-roster civilian silhouette gate (maximum rendered IoU 0.9094292803970223; Coach/Courier back 0.8909718796250616) and unapproved golden snapshots (1 match / 23 changed). Page and script errors were zero. Missing audio resource 404s are expected branch noise and non-blocking; no audio assets were added.
- No golden snapshots or provenance were modified. No semantic annotation candidates were promoted. No character is approved by this correction pass; internal QA, Claude's updated comparative review and explicit owner approval remain required.


## Guard, Vendor and Clinic — Run #629 and owner decision (2026-11-20)

- Final renderer source for this round: [`2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`](https://github.com/tinytime/Tinytime.github.io/commit/2bc1629edd82afc1a50ac7a4ab882b428dbd0c32). The final focused change moved Vendor's profile eye/brow inward onto the visible cheek plane after Run #628's automated face-distinctness checks passed but manual direct-game-scale inspection found the mark insufficiently legible.
- Browser QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), [artifact 14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Targeted vector/capture checks pass; overall Actions remains failed on the unapproved golden snapshot baseline (1 match / 23 changed) and existing audio/resource 404 console errors. No golden snapshots or provenance were changed.
- Inspected the exact Run #629 artifact: 12/12 native 64×96 and 12/12 direct 28×42 captures for Guard/Vendor/Clinic; Vendor's left and right profile eye now reads in both scales. Guard's near-side forearm/bracer/hand and Clinic's right-profile cord/coil remain present. Directional integrity 92/92, zero edge contacts and detached components, face distinctness 23/23 at both scales, prop audit, gallery, town smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- **Owner decision:** the project owner explicitly approved the rendered Guard, Vendor and Clinic Worker batch on 2026-11-20 after the Run #629 evidence review.
- **Independent-review record:** Claude's final independent review of this exact Run #629 commit/artifact is not yet recorded in the repository. Per the governing approval process, retain that as the outstanding independent-review gate; do not label the batch fully closed or release the remaining 17 until the exact-output review is logged. This records the owner's approval without fabricating reviewer sign-off.
- No golden snapshots changed. Existing global Actions blockers are tracked separately from the passing character-specific evidence.
