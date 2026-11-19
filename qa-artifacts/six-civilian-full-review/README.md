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

- [Live renderer at the exact reviewed source commit](https://github.com/tinytime/Tinytime.github.io/blob/4eafc657fa9ee15db3b70f3c64a76280d4add0a6/npc_sprites.js)
- [Raw `npc_sprites.js` at the exact reviewed source commit](https://raw.githubusercontent.com/tinytime/Tinytime.github.io/4eafc657fa9ee15db3b70f3c64a76280d4add0a6/npc_sprites.js)
- [Current branch copy](https://github.com/tinytime/Tinytime.github.io/blob/npc-granny-baseline-overhaul/npc_sprites.js)
- Source commit: [`4eafc657fa9ee15db3b70f3c64a76280d4add0a6`](https://github.com/tinytime/Tinytime.github.io/commit/4eafc657fa9ee15db3b70f3c64a76280d4add0a6)
- Review branch: `npc-granny-baseline-overhaul`
- Review-package branch head when prepared: `cbd98d527d850f72dd6f15a5be2ce82ace2ab65d` (documentation-only commits after the renderer source)

Please read the actual draw functions, dispatch, palettes, directional paths, shape layering, shared helpers and archetype mappings—not just the rendered screenshots. The source link is deliberately pinned to the renderer commit used by the latest Runner/Coach/Referee QA.

## Rendered evidence

### First batch — Usher, Cook, Courier

- [First-pilot Claude review brief and evidence history](../../project-background/CLAUDE-PILOT-REVIEW-PACKAGE.md)
- [First-batch renderer source: Courier correction commit](https://github.com/tinytime/Tinytime.github.io/commit/98dbcda2a32fa506ba355f12ddd449db3322a4b4)
- [Courier correction QA run #410](https://github.com/tinytime/Tinytime.github.io/actions/runs/44542492048), artifact `14537384741`
- The first-pilot package records the four-direction native renders, Granny comparison, gallery, role-debug, town/menu context, diagnostics, and Claude's earlier findings. Usher, Cook and Courier are marked APPROVED BY OWNER in the live tracker.

### Second batch — Runner, Coach, Referee

- [Latest QA run #452](https://github.com/tinytime/Tinytime.github.io/actions/runs/44587406698), artifact `14562025835`
- Exact tested renderer source: [`4eafc657fa9ee15db3b70f3c64a76280d4add0a6`](https://github.com/tinytime/Tinytime.github.io/commit/4eafc657fa9ee15db3b70f3c64a76280d4add0a6)
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

Run #452 targeted checks passed: direct game-scale captures 12/12, role-debug 12/12, directional integrity 92/92 with zero edge contacts/detached large components, silhouette-quality 180/180, palette/body and prop checks, gallery and town regression. Page/script errors were empty.

The overall workflow was **FAILED** on separate/global gates: Clinic/Sailor full-civilian silhouette overlap, unapproved golden snapshots (23 changed / 1 match), and 180 missing-audio 404 console errors. No snapshots were refreshed or approved. These global failures are not evidence of a new Runner/Coach/Referee defect, but must not be hidden.

The first-batch evidence also has historical QA notes and Claude findings in its linked review package. Use those as context, but independently inspect the actual six designs and source.

## Approval boundaries

- Usher, Cook and Courier: **APPROVED BY OWNER**.
- Runner, Coach and Referee: **BUILT — TARGETED INTERNAL QA PASSED — NOT APPROVED** pending this comparative review and owner acceptance.
- Remaining 20 civilians: **ON HOLD**.
- Claude provides independent recommendations; ChatGPT evaluates findings and implements agreed corrections; the project owner makes final approval decisions.
- Do not refresh or approve golden snapshots.
