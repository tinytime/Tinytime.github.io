# Five-Civilian Vector Review — Claude

## Purpose and scope

Claude: conduct one complete, independent comparative review of these **five** completed vector civilians together:

1. Usher — civic / venue attendant
2. Cook — food service / chef
3. Courier — delivery / messenger
4. Coach — veteran sideline tactician
5. Referee — football official

Compare all five against Granny Volt's approved 10/10 quality benchmark. Review the actual rendered evidence and source, not descriptions alone. The goal is to identify the corrections needed to bring these five to a consistently excellent finish, then extract a practical production rule set that will let ChatGPT build the remaining civilians faster, with less iteration, without making them look like recolored versions of one template.

**Runner is intentionally excluded from this review to reduce review scope. Runner is not deleted, not rejected, and not approved by this scope change.** Runner shares the athletic archetype with Coach and Referee; retaining Coach and Referee provides two distinct athletic-role examples while preserving the civic, vendor, and courier design families. Runner remains built and pending a later focused review. Do not spend review effort scoring Runner in this pass.

Usher, Cook and Courier were previously owner-approved, but those approvals were explicitly reopened for this correction pass; they are not currently approved. Coach and Referee remain NOT APPROVED. Review all five critically regardless of historical approval; identify worthwhile polish and do not change any approval status—only the project owner can do that.

## Essential source code

The authoritative live renderer is **`npc_sprites.js`** (with an underscore).

- [Open exact renderer source at the tested commit](https://github.com/tinytime/Tinytime.github.io/blob/23c792f7e83eb14ff7d48e197678272f1c3e58b0/npc_sprites.js)
- [Raw `npc_sprites.js` source](https://raw.githubusercontent.com/tinytime/Tinytime.github.io/23c792f7e83eb14ff7d48e197678272f1c3e58b0/npc_sprites.js)
- [Current branch copy](https://github.com/tinytime/Tinytime.github.io/blob/npc-granny-baseline-overhaul/npc_sprites.js)
- Exact source commit: [`23c792f7e83eb14ff7d48e197678272f1c3e58b0`](https://github.com/tinytime/Tinytime.github.io/commit/23c792f7e83eb14ff7d48e197678272f1c3e58b0)

Read the actual draw functions, dispatch, palettes, directional paths, layering/occlusion, shared helpers and archetype mappings. Do not rely only on screenshots or prior review notes.

## Rendered evidence

### Latest five-civilian evidence — runs #463 and #464

- [Run #463](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178) tested the direct game-scale capture hook and confirmed 20/20 28×42 captures: Usher, Cook, Courier, Coach and Referee, front/back/left/right.
- [Run #464](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571) verified the evidence-sheet generator and uploaded [artifact `14568746641`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571/artifacts/14568746641).
- The artifact contains 20 native 64×96 captures and 20 direct 28×42 captures, plus two sheets:
  - `five-civilian-native-4x-contact-sheet.png` — 1114×2208
  - `five-civilian-game-scale-4x-contact-sheet.png` — 730×1208
- It also includes role-debug evidence, gallery/town outputs and `report.json`. The log summary confirms no missing native or game-scale images.
- The native and game-scale contact sheets are enlarged with nearest-neighbour rendering for inspection; individual original PNGs are included for exact pixel review.
- [Civilian renderer source](https://github.com/tinytime/Tinytime.github.io/blob/23c792f7e83eb14ff7d48e197678272f1c3e58b0/npc_sprites.js) is at commit `23c792f7e83eb14ff7d48e197678272f1c3e58b0`. The expanded direct game-scale capture hook and 20-pair QA assertion are at [commit `c1d8d75aceeef0c9a689c2f8c40ae88909c55ada`](https://github.com/tinytime/Tinytime.github.io/commit/c1d8d75aceeef0c9a689c2f8c40ae88909c55ada); the contact-sheet enhancement is at [commit `2b21457cb4faaa5d993c46d696df3d3aca07f87a`](https://github.com/tinytime/Tinytime.github.io/commit/2b21457cb4faaa5d993c46d696df3d3aca07f87a).
- Automated targeted checks: 92/92 directional integrity, 20/20 direct game-scale, 12/12 role-debug, prop audit and gallery pass. Overall workflow remains failed on the global silhouette and golden snapshot gates.
- **Visual inspection is still outstanding.** ChatGPT has not inspected the PNGs. The owner can review the paired sheets and individual captures from artifact `14568746641`; do not treat the automated evidence as a visual verdict.

## What to evaluate

Review the five **side by side** and compare each to Granny Volt for finish, clarity, character and visual coherence. Evaluate:

- Instant role recognition and originality of full silhouette at thumbnail size.
- Proportions, anatomy, pose, stance, hands, feet and limb readability in all four directions.
- Face construction, expression, eyes/catchlights, hair/headwear and side-profile anatomy.
- Clothing construction: layering, seams, hems, collars, cuffs, material cues, outline consistency and occlusion.
- Prop design, readability at game scale, physical grip/contact and consistent placement in mirrored views.
- Front, back, left and right as intentionally composed views—not just mirrored shortcuts or blank fallbacks.
- Readability at native 28×42 game scale and finish at 64×96 native source size / enlarged inspection.
- Palette hierarchy and contrast; avoid palette-only character differentiation.
- Consistent craft quality across the five without erasing their individual identities.
- Technical/source issues that may explain visible artifacts.

For **each of the five characters**, provide:
1. A candid score out of 10 against Granny's 10/10 quality bar.
2. Verdict: approve as-is, approve after required fixes, or reject/rework (recommendation only; owner decides).
3. Required corrections ranked critical / major / minor, with exact direction/view and a precise description of the problem and desired result.
4. Optional polish only where it materially improves the result.
5. What is strongest and must be preserved.
6. Whether it reads as finished at both 28×42 and 64×96.

Then provide:
- A five-character comparative ranking, with clear criteria.
- An overall batch verdict and the smallest high-impact correction set that would bring the group to the desired standard.
- A distinction between objective defects, technical constraints, and subjective art preferences.

## Required deliverable: Vapor City Civilian Vector Build Standard

The main long-term goal is to reduce iteration on the remaining civilians. Derive a concise, technically actionable **Vapor City Civilian Vector Build Standard** from the five reviewed characters, their renderer implementation, the QA evidence, and the actual successful/failed corrections.

This is not a generic art-advice sheet. It must tell ChatGPT how to get the design right earlier and reduce avoidable correction loops. Include:

### A. Design brief before drawing
A one-page per-character brief covering role/personality, silhouette concept, head/face, body proportions, pose, clothing construction, palette, defining prop, and the unique feature that distinguishes the character at thumbnail scale. Include a quick overlap check against the existing approved/reviewed civilians.

### B. Silhouette and anatomy
Rules for creating original proportions and pose rather than reusing a shared body. Explain torso/head/limb relationships, visible limb separation, hands/feet, grounded vs dynamic poses, foot baseline and direction-specific anatomy. Include concrete do/don't examples from these five.

### C. Face and head
Practical native-pixel guidance for eye size/contrast/catchlights, expression, profile nose/ear/eye placement, hair and headwear. Explain how details survive reduction to 28×42.

### D. Four-direction construction
A planning grid for front/back/left/right before implementation. Rules for mirrored profiles, intentional prop placement, back-view identity, occlusion and the one-visible-arm side-profile convention unless a deliberate pose justifies otherwise.

### E. Clothing, material and props
Layer order, line/outline weight, seams/folds/highlights, fabric/material separation, prop-to-hand contact, silhouette contribution and game-scale legibility.

### F. Palette and finish
A compact role-based palette system and contrast rules without prescribing one shared palette. State which finish details are mandatory and which are optional polish.

### G. Renderer implementation
Exact integration conventions in `npc_sprites.js`: dedicated draw path per character, archetype dispatch, helper reuse only for genuinely shared mechanics, save/restore transforms, mirrored geometry/text compensation, and prevention of legacy layers painting over the vector path. Do not propose a generic recolor-only renderer.

### H. Production sequence and QA gates
A repeatable build sequence designed to reduce rework: design brief → silhouette thumbnails → four-view blockout → face/head → clothing/props → native render → 28×42 check → enlarged inspection → town/gallery → browser QA → review. Identify which decisions should be locked before code and which can be tuned late. Define measurable pass/fail checks and mandatory screenshots/artifacts.

### I. Failure prevention
List recurring failure patterns from these five and their prevention steps. Separate hard technical/art-quality requirements from flexible creative decisions. Include a reusable preflight checklist that ChatGPT can apply before implementing each future civilian.

### J. Reuse lessons, not designs
For each reviewed character, say what construction lesson can be reused and what must remain unique. The standard must accelerate work without imposing a common silhouette, outfit, face, palette, or prop language.

**The build standard is a first-class deliverable, not an optional appendix.** It should be specific enough that ChatGPT can follow it on the next civilian with fewer rounds of correction.

## Internal QA context and limitations

The current civilian renderer is `npc_sprites.js` at `23c792f7e83eb14ff7d48e197678272f1c3e58b0`. The direct game-scale capture hook and 20-capture QA assertion were added in `c1d8d75aceeef0c9a689c2f8c40ae88909c55ada`.

[Run #463](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178) tested the combined state and uploaded [artifact `14568093189`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178/artifacts/14568093189). Confirmed automated results:
- Native directional integrity: 92/92 PASS; no edge contacts or detached large components.
- Direct game-scale capture audit: 20/20 PASS at 28×42, direct `owCiv` render, live OWT=36 / vector scale 0.28 / no resize; all five characters × four directions.
- Role-debug: 12/12 PASS; prop audit: 10 archetypes PASS; gallery rendered.
- Page errors: 0; script errors: 0; audio-resource 404 console errors remain.
- Overall workflow: **FAILED** on global civilian-type silhouette overlap (max rendered IoU `0.9094292803970223`; closest pairs include Clinic/Sailor front and Coach/Courier back) and unapproved golden snapshots (23 changed / 1 match).

The run #463 artifact includes the 20 native 64×96 captures, 20 direct 28×42 captures, contact sheet, role-debug evidence, gallery/town outputs and `report.json`. **ChatGPT has not visually inspected these PNGs.** The automated pass is not visual approval. Coach/Courier rear-view silhouette overlap needs visual assessment before the package is sent to Claude.

No golden snapshots were refreshed or approved. All five remain NOT APPROVED pending human visual inspection, independent Claude re-review and owner decision. Runner remains excluded from this review; remaining 20 civilians stay on hold.

## Owner decision and correction implementation — 2026-11-19

The owner explicitly authorized reopening Usher, Cook and Courier for the review corrections, while also implementing the Coach and Referee fixes. Their previous approval history is preserved, but the revised versions are not currently approved.

Initial correction commit: [027be47d8f6763f447992a9dec058ff62a7c60a3](https://github.com/tinytime/Tinytime.github.io/commit/027be47d8f6763f447992a9dec058ff62a7c60a3). The code addresses Cook's toque/face clearance and profile arm, Courier's whole-sprite baseline tilt, Coach's yoke/age cues/whistle/font-dependent lettering, Referee's side-torso leakage/profile hair, and Usher's profile clipboard face.

Important: the commit has not yet been browser-tested or visually inspected. Run #457 is prior-source evidence only. Keep all five in revision / NOT APPROVED status pending fresh four-direction QA, screenshot inspection, independent Claude re-review, and owner acceptance. Runner remains excluded; remaining 20 stay on hold.

## Updated source and automated evidence — run #459 (2026-11-19)

The renderer was corrected after Claude's review and received a final rim-light consistency pass. The current five-character review source is now [`npc_sprites.js` at commit `23c792f7e83eb14ff7d48e197678272f1c3e58b0](https://github.com/tinytime/Tinytime.github.io/blob/23c792f7e83eb14ff7d48e197678272f1c3e58b0/npc_sprites.js). The source commit is the exact renderer revision tested by [GitHub Actions run #459](https://github.com/tinytime/Tinytime.github.io/actions/runs/44599635463); artifact ID `14568035039` is available from the [run artifacts page](https://github.com/tinytime/Tinytime.github.io/actions/runs/44599635463/artifacts/14568035039).

- The artifact includes 92 native 64×96 directional captures (23 civilians × four directions), including the five characters in this review. Use `npc-type-directions/{usher,cook,courier,coach,ref}-{front,back,left,right}.png`.
- Direct 28×42 game-scale PNGs in this run are limited to Runner, Coach and Referee. Coach and Referee are in scope; Usher, Cook and Courier do not have direct game-scale captures in this artifact.
- Automated checks pass for directional integrity (92/92, no edge contacts or detached large components), role-debug (12/12), props, gallery, page/script errors (0). Overall run remains FAILED on global civilian-type silhouette overlap (Clinic/Sailor front IoU `0.9094292803970223`) and unapproved golden snapshots (23 changed / 1 match). There are 180 missing-audio 404 console errors.
- **Do not treat the automated report as visual inspection.** The artifact's PNGs have not yet been visually inspected. The run does not confer approval; all five remain in revision / NOT APPROVED pending visual inspection, independent Claude re-review and owner decision. No golden snapshots were refreshed or approved.

The original run #457 links above remain historical context only; use run #459 and commit `23c792f7e83eb14ff7d48e197678272f1c3e58b0` as the latest post-correction evidence.


## Workflow-generated review sheet (new QA automation)

The browser QA workflow now runs `qa/build-five-civilian-review-sheet.mjs` after diagnostics, even when diagnostics fail. It is intended to add `five-civilian-native-4x-contact-sheet.png` and `five-civilian-review-summary.md` to the uploaded artifact. The contact sheet uses the actual five civilians' 64×96 front/back/left/right captures. The separate direct 28×42 game-scale hook now covers all five civilians and all four directions; run #463 confirms 20/20. Neither automation step constitutes visual review.

- Generator commit: [`1f5ffa09189ea20e3d7a6c96a9d7118d72ed22bc`](https://github.com/tinytime/Tinytime.github.io/commit/1f5ffa09189ea20e3d7a6c96a9d7118d72ed22bc).
- Workflow commit: [`80bac03d1ee2eb99ff6be9c73bee9d04dcc67b3f`](https://github.com/tinytime/Tinytime.github.io/commit/80bac03d1ee2eb99ff6be9c73bee9d04dcc67b3f).
- [Run #461](https://github.com/tinytime/Tinytime.github.io/actions/runs/44600405554) is the first execution of the updated workflow; verify its artifact before relying on the generated files.



## Run #461 — review-sheet workflow verification

The first integrated run completed the new contact-sheet generator and artifact upload successfully. [Run #461](https://github.com/tinytime/Tinytime.github.io/actions/runs/44600405554), job `135829961792`, uploaded [artifact `14566568903`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44600405554/artifacts/14566568903) (7,178,358 bytes; 249 files). Browser diagnostics itself still failed, so this is evidence-packaging success, not an overall QA pass or a renderer retest.

The generated sheet is based on 20 native 64×96 directional captures for the five reviewed civilians. Direct 28×42 game-scale captures remain limited to Runner, Coach and Referee; Usher, Cook and Courier still need genuine direct game-scale renders. The PNGs in the new artifact have not yet been human-visually inspected. Do not treat the sheet generator or automated checks as approval. All five remain NOT APPROVED pending internal visual inspection, independent Claude re-review and owner decision; no golden snapshots were refreshed or approved.


## Latest packaged review evidence — run #464

- [Run #464](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571), source commit `2b21457cb4faaa5d993c46d696df3d3aca07f87a` (contact-sheet generator update only; renderer remains `23c792f7e83eb14ff7d48e197678272f1c3e58b0`).
- [Artifact `14568746641`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571/artifacts/14568746641) includes 20 native 64×96 captures, 20 direct 28×42 captures, the paired contact sheets, role-debug/gallery/town evidence and report.
- Generator step passed; both contact sheets generated and no expected images were missing. The main diagnostics remain failed on global silhouette overlap and unapproved golden snapshots.
- ChatGPT has not visually inspected the PNGs. The owner can now review the two contact sheets and individual images directly from the artifact; no character approvals have been changed.


## Current evidence — runs #463 and #464 (2026-11-19)

The five review characters now have both evidence scales for every direction:

- Run #463 (https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178) verified 20 direct 28×42 renders (five civilians × four directions) from the live `owCiv` renderer, not resized 64×96 captures.
- Run #464 (https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571) uploaded artifact 14568746641. It contains `five-civilian-native-4x-contact-sheet.png`, `five-civilian-game-scale-4x-contact-sheet.png`, the summary, individual native/direct PNGs, gallery/town screenshots and QA report.
- Run #464 checks: native 20/20; direct game-scale 20/20; directional integrity 92/92; role debug 12/12; prop audit PASS; gallery PASS; page errors 0; script errors 0.
- ChatGPT visually inspected both contact sheets and the town screenshot. No obvious clipping or detached pieces were seen; signature props and role cues persist across directions. Fine face detail compresses at 28×42, but major silhouettes and props remain distinguishable. This is internal QA, not Claude review or owner approval.

The overall workflow remains FAILED on the global civilian silhouette audit (max IoU 0.9094292803970223, Clinic/Sailor front; Coach/Courier back 0.8939319190922546) and unapproved golden snapshot comparison (1 match / 23 changed). Missing-audio 404s remain; page/script exceptions are zero. No thresholds were lowered and no golden snapshots were refreshed or approved.

**Status:** all five remain NOT APPROVED pending Claude's independent review and the owner's final decision. Runner is excluded from this review round; remaining 20 civilians remain ON HOLD.
