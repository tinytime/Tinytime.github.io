# Full Six-Civilian Vector Review — Claude

## Purpose

Claude: please conduct one complete, independent comparative review of **all six completed vector civilians together**:

1. Usher
2. Cook
3. Courier
4. Runner
5. Coach
6. Referee

Compare all six against Granny Volt's approved 10/10 quality benchmark. The goal is not merely to approve the existing work: identify every worthwhile correction, bring all six to a consistent finished standard, and extract a practical, reusable set of design/construction rules that ChatGPT can use to build the remaining civilians efficiently **without making them look templated**.

The first three (Usher, Cook, Courier) have owner approval. The second three (Runner, Coach, Referee) are built and internally checked but remain pending this full comparative review and owner acceptance. Do not treat the existing approval status as a reason to skip scrutiny.

## Source code — essential

The live renderer is **`npc_sprites.js`** (with an underscore; not `npcsprites.js`). This is the authoritative implementation Claude must inspect.

- [Live renderer at the exact reviewed source commit](https://github.com/tinytime/Tinytime.github.io/blob/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0/npc_sprites.js)
- [Raw `npc_sprites.js` at the exact reviewed source commit](https://raw.githubusercontent.com/tinytime/Tinytime.github.io/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0/npc_sprites.js)
- [Current branch copy](https://github.com/tinytime/Tinytime.github.io/blob/npc-granny-baseline-overhaul/npc_sprites.js)
- Source commit: [`5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`](https://github.com/tinytime/Tinytime.github.io/commit/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0)
- Review branch: `npc-granny-baseline-overhaul`
- Review-package branch head when prepared: `cbd98d527d850f72dd6f15a5be2ce82ace2ab65d` (documentation-only commits after the renderer source)

Please read the actual draw functions, dispatch, palettes, directional paths, shape layering, shared helpers and archetype mappings—not just the rendered screenshots. The source link is deliberately pinned to the renderer commit used by the latest six-civilian QA.

## Rendered evidence

### First batch — Usher, Cook, Courier

- [First-pilot Claude review brief and evidence history](../../project-background/CLAUDE-PILOT-REVIEW-PACKAGE.md)
- [First-batch renderer source: Courier correction commit](https://github.com/tinytime/Tinytime.github.io/commit/98dbcda2a32fa506ba355f12ddd449db3322a4b4)
- [Courier correction QA run #410](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048), artifact `14537384741`
- The first-pilot package records the four-direction native renders, Granny comparison, gallery, role-debug, town/menu context, diagnostics, and Claude's earlier findings. Usher, Cook and Courier are marked APPROVED BY OWNER in the live tracker.

### Second batch — Runner, Coach, Referee

- [Latest QA run #457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167), artifact `14563778383`
- Exact tested renderer source: [`5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`](https://github.com/tinytime/Tinytime.github.io/commit/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0)
- [Run #452 evidence index](../runner-coach-referee-run-452/README.md)
- Artifact includes all three characters' native 64×96 four-direction captures, direct 28×42 game-scale captures, role-debug, Granny comparison, gallery, town regression and `report.json`.
- Run #452 specifically verifies the latest Runner side-profile narrowing. Coach and Referee have no source changes in that final Runner-only commit; their latest reviewed state is included in the same artifact.

## Required review process

Please inspect the six designs **side by side**, not as two disconnected batches. Evaluate:

- Whether each has an immediately recognizable, original identity and silhouette.
- Anatomy, proportions, pose, stance, hands, feet and limb readability in every direction.
- Face construction, expression, hair/headwear and profile anatomy.
- Clothing construction, layering, seams, hems, material cues and outline quality.
- Prop design, grip/contact, anatomical placement and readability at game scale.
- Four-direction consistency: front, back, left and right must each be deliberately designed.
- Thumbnail/native 28×42 readability and enlarged/native 64×96 finish.
- Palette distinctness and overall visual hierarchy.
- Consistency of craft and finish across the six, while preserving each character's individuality.
- Any visual or technical issues apparent from the implementation or evidence.

For every character, provide:
1. A candid score out of 10 against Granny Volt's quality bar.
2. A verdict: approve as-is, approve after required fixes, or reject/rework.
3. Required corrections ranked by severity, with precise direction/view and the specific visual problem.
4. Optional polish that would materially improve quality.
5. What is already working especially well and should be preserved.

Also provide a **six-character comparative ranking** and an overall batch verdict. Do not soften criticism to protect previous work. Distinguish objective defects from taste-based preferences.

## The reusable civilian build rules are a deliverable

After the six-character review, derive a concise but technically actionable **Vapor City Civilian Vector Build Standard** for the remaining roster. Base it on the actual strengths, weaknesses and corrections observed across all six—not generic art advice.

The standard should cover:
- Required character identity brief before drawing (silhouette, face, outfit, palette, prop, personality).
- How to create original silhouettes rather than recoloring/reusing a shared body.
- Proportion, anatomy, limb/hand/foot and pose construction.
- Face and head construction at 64×96 and 28×42.
- Four-direction planning and mirrored-profile rules, including one visible arm in side profile unless a deliberate pose justifies otherwise.
- Clothing layers, outlines, occlusion order and prop-to-hand contact.
- Palette limits/roles and contrast.
- Renderer integration conventions in `npc_sprites.js`, dedicated draw paths and dispatch.
- QA gates and actual render evidence required before a character is considered internally complete.
- A repeatable build sequence/checklist that speeds production while preserving bespoke character design.
- Common failure patterns found in these six and how to prevent them.

Separate **hard technical/art-quality rules** from **flexible design choices**. The rules must accelerate future work, not force all civilians into one body template. Include a short per-character example of what should be reused as a lesson versus what must remain unique.

Do not start designing the remaining civilians. The owner must review Claude's findings and approve the build standard before the next 20 begin.

## Internal QA context and limitations

Run #457 targeted checks pass: syntax/module and inventory; direct game-scale captures 12/12; role-debug 12/12; directional visual integrity 92/92 with zero edge contacts or detached components; face distinctness 23/23; palette; prop audit; silhouette-quality 180/180; gallery and town regression. Page/script errors are empty. All 24 native 64×96 images for the six civilians were inspected.

The NPC body/baseline audit still flags Courier's baseline delta 2 against the vector threshold of 1. The overall workflow was **FAILED** on this and separate/global gates: Clinic/Sailor full-civilian silhouette overlap (front IoU `0.9094292803970223`), unapproved golden snapshots (23 changed / 1 match), and 180 missing-audio 404 console errors. No snapshots were refreshed or approved. These failures must be reported separately from the visual integrity pass.

The first-batch evidence also has historical QA notes and Claude findings in its linked review package. Use those as context, but independently inspect the actual six designs and source.

## Approval boundaries

- Usher, Cook and Courier: **APPROVED BY OWNER**.
- Runner, Coach and Referee: **BUILT — TARGETED INTERNAL QA PASSED — NOT APPROVED** pending this comparative review and owner acceptance.
- Remaining 20 civilians: **ON HOLD**.
- Claude provides independent recommendations; ChatGPT evaluates findings and implements agreed corrections; the project owner makes final approval decisions.
- Do not refresh or approve golden snapshots.


## Latest polish and QA — run #457

- Tested exact source: [`5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`](https://github.com/tinytime/Tinytime.github.io/commit/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0).
- [GitHub Actions run #457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167); artifact ID `14563778383`.
- The 24 native 64×96 captures for all six civilians were inspected. Direct 28×42 game-scale captures for Runner/Coach/Referee were inspected. Runner's side stride reads as two feet; Cook's compressed toque clears the top edge in all four directions.
- Targeted results: syntax/module/inventory pass; palette pass; face distinctness 23/23; visual integrity 92/92 with zero edge contacts/detached large components; role-debug 12/12; prop audit; archetype silhouette quality 180/180; gallery and town regression pass; page/script errors 0.
- Overall workflow remains **FAILED**: NPC body audit failed; global civilian type-silhouette audit still flags Clinic/Sailor front at IoU `0.9094292803970223`; golden snapshots remain unapproved (23 changed / 1 match); 180 missing-audio 404 console errors. No snapshots were refreshed or approved.
- This evidence updates the review source and current status; it does not constitute Claude review or owner approval. The first three remain owner-approved; Runner/Coach/Referee remain pending comparative review and owner approval; remaining 20 stay on hold.


## Latest verification — run #457

- Exact source: `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0` — [renderer commit](https://github.com/tinytime/Tinytime.github.io/commit/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0).
- [GitHub Actions run #457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167), artifact `14563778383`.
- Inspect the artifact's `npc-type-directions/` for all six × four native views and `npc-game-scale-28x42/` for the 12 direct Runner/Coach/Referee game-scale captures. `report.json` contains the exact audit results.
- Cook toque now has transparent headroom in all directions; Runner side stride shows two legs/two feet with one trailing-leg draw. All 92 integrity checks pass with no edge contacts or detached components.
- Not an overall workflow pass: Courier baseline alignment, Clinic/Sailor overlap, unapproved snapshots and 180 missing-audio console errors remain. No snapshots refreshed.

