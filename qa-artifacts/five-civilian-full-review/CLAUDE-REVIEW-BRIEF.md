# CURRENT CLAUDE RE-REVIEW — OWNER-AUTHORIZED P2 CORRECTIONS

**This current section supersedes the historical brief below.** Review the corrected five-character set after the owner's explicit authorization of all four P2 areas from your Run #595 review.

## Exact source and evidence

- Repository: https://github.com/tinytime/Tinytime.github.io
- Branch: `npc-granny-baseline-overhaul`
- Review package documentation: current branch head, with the renderer and evidence commits pinned separately below.
- **Exact renderer source:** `3d1ec4bcbac231e99e75d36f21e79a5fcf7fd4eb` (P2 renderer changes; this is the source to inspect).
- **QA evidence-builder commit:** `90c5d266279c61461b460b024ee96e71f327e081` (adds black silhouettes and town-ground composite; does not change renderer drawing).
- **Before/baseline:** [Run #595](https://github.com/tinytime/Tinytime.github.io/actions/runs/44645116652), artifact `14587318765`, renderer `c354abfa3d78b46dc982a03d2c5d1ece0c918257`.
- **Corrected render evidence:** [Run #599](https://github.com/tinytime/Tinytime.github.io/actions/runs/44650509863), artifact `14590034123`, exact renderer `3d1ec4b`.
- **Expanded evidence package:** [Run #600](https://github.com/tinytime/Tinytime.github.io/actions/runs/44650864326), artifact `14591690387`, evidence builder `90c5d266`, renderer remains `3d1ec4b`.
- **Internal QA and before/after pixel-diff report:** [RUN-599-600-INTERNAL-QA.md](../../project-background/qa-artifacts/five-civilian-corrections/RUN-599-600-INTERNAL-QA.md).
- **Character identity/proportion cards:** [IDENTITY-AND-PROPORTION-CARDS.md](../../project-background/qa-artifacts/five-civilian-corrections/IDENTITY-AND-PROPORTION-CARDS.md).
- **Current draft construction standard:** [CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md](../../project-background/CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md), including the Version 2.1 review response.

Download Run #600's artifact for the complete corrected evidence, and Run #595's artifact for the same-named baseline PNGs. Compare actual files, not just summaries. Run #599 contains the corrected captures and focused comparisons as well.

## Review scope

Review exactly these five characters: **Usher, Cook, Courier, Coach and Referee**. Runner remains excluded. The remaining 17 civilians remain on hold.

## Four P2 areas to re-evaluate

1. **F1 — individual face construction (Usher, Cook, Courier).**
   - Usher: narrower, composed face; narrower/hooded eye construction; restrained closed-mouth expression and formal brow treatment.
   - Cook: broader cheek construction, softer/heavier brows, broader nose and fuller friendly smile.
   - Courier: alert asymmetrical gaze, sharper nose/profile contour and tighter half-smile.
   - Determine whether there are at least two purposeful identity cues per face beyond skin tone, hair colour and headwear, and whether at least one cue is perceptible at direct 28×42 or as a readable profile contour. Do not treat unique hashes or one-pixel differences as proof of individuality.
2. **U1 — Usher left/right shoes.** Confirm the darker slate shoes/sole are clearly separable from the pale trouser planes at direct 28×42, in both side directions, without making the footwear look detached or excessively heavy.
3. **C1 — Cook pan/hand.** Confirm the front pan reads as a shallow skillet rather than a mug/cup; the handle is visibly continuous from the gripping hand to the pan body; the cuff/forearm/hand chain remains physically plausible; and front/left/right remain readable at direct 28×42. Check for clipping, detached pieces or hand/pan merging.
4. **X1 — Coach/Courier rear distinction.** No torso redesign was made. Reassess the written rationale and native/direct game-scale paired images: Coach has a straight hem and visible side elbow/hand negative spaces; Courier has an A-line coat and arms more integrated into the coat; cap/hair construction and shoe values differ. Is this an acceptable shared-body-mass case, or does the actual rendered evidence still show an identity collision? Do not use IoU as an automatic artistic pass/fail.

## Evidence to inspect

From Run #600 artifact:
- `five-civilian-native-4x-contact-sheet.png` and all 20 individual native 64×96 PNGs.
- `five-civilian-game-scale-4x-contact-sheet.png` and all 20 individual direct 28×42 PNGs (direct renderer captures, not resized native images).
- `five-civilian-black-silhouette-4x-contact-sheet.png` for shape-only review.
- `five-civilian-town-ground-composite.png` for palette/value contrast against the actual town/night screenshot.
- `coach-courier-back-native-comparison.png` and `coach-courier-back-game-scale-comparison.png`.
- `cook-prop-contact-native.png` and `cook-prop-contact-game-scale.png`.
- `usher-game-scale-readability.png`.
- Role-debug, gallery, town regression, `report.json`, and the summary.

**Evidence caveats:** the black silhouette sheet is derived from alpha masks and is not a semantic anatomy mask. The town-ground composite overlays direct sprites onto a captured town screenshot; it is diagnostic only and is not proof that the named NPCs were live-spawned in town. The ordinary town screenshot remains regression context. The identity/proportion cards state qualitative design intent only; they do not contain verified semantic measurements.

## Before/after pixel diffs

The internal QA report includes changed-pixel counts for all four directions at both native and direct game scales, comparing Run #595 with Run #599. Use those counts only to locate changed areas. They are not quality scores. Coach and Referee are pixel-identical to baseline; Coach/Courier rear distinction is supported by a documented rationale and paired evidence, not forced pixel changes.

## Automated QA context

Run #599 on renderer `3d1ec4b` and Run #600 on the same renderer/evidence-builder update confirm:
- syntax and NPC module load pass;
- 20/20 native captures and 20/20 direct 28×42 captures;
- directional integrity 92/92, zero edge contacts, zero detached large components;
- role-debug 12/12, prop audit pass, gallery pass;
- pageErrors=0 and scriptErrors=0.

The overall workflow still concludes **FAILED** because the branch has 180 expected missing-audio 404 console diagnostics, the unrelated full-roster Clinic/Sailor front silhouette gate remains at IoU `0.9094292803970223`, and the golden snapshot gate remains unapproved (1 match / 23 changed). No golden snapshots were refreshed or approved. These are not evidence of a failure in the four P2 corrections. Do not propose bypassing or refreshing the golden gate.

## Required response

For each of the five characters:
- score 1–10 relative to Granny Volt's approved craft benchmark;
- state strongest and weakest direction;
- evaluate identity, anatomy/construction, face, clothing, prop contact, palette/value, four-direction consistency and direct game-scale readability;
- classify each remaining finding P0–P3 and distinguish objective defects from preferences;
- state whether each P2 is resolved, partly resolved or unresolved, with exact direction/scale evidence.

Then provide:
- comparative ranking and batch verdict;
- whether the five are ready for owner review;
- any smallest remaining correction set;
- whether Coach/Courier rear should be accepted with rationale or changed;
- any concern with the current Version 2.1 draft standard, especially face cues at small scale and game-scale context checks.

## Approval and scope restrictions

This is an independent recommendation only. Do not modify source, approve any character, change tracker approval status, refresh/replace golden snapshots, add Runner, or release the remaining 17. ChatGPT remains responsible for evaluating your findings and implementing valid corrections. The project owner makes all final decisions.

---

## Historical first-review brief (superseded)

**Review type:** Independent comparative visual review after the correction pass.
**Builder:** ChatGPT. **Independent reviewer:** Claude. **Final approval:** project owner.
**Review status:** Package prepared; Claude review has NOT yet been performed. None of the five characters is approved by this brief.

## Exact source and evidence

- Repository: https://github.com/tinytime/Tinytime.github.io
- Branch: `npc-granny-baseline-overhaul`
- Current package commit: `fbb2e26cd1aea9e0f3a80a22b1786f74447121ea` (documentation/handoff only).
- Renderer correction source: `23c792f7e83eb14ff7d48e197678272f1c3e58b0` (five-civilian renderer corrections and rim-light pass).
- Direct game-scale capture hook: `c1d8d75aceeef0c9a689c2f8c40ae88909c55ada` (QA hook expansion only; does not alter character drawing).
- Evidence-sheet generator: `2b21457cb4faaa5d993c46d696df3d3aca07f87a`.
- Latest QA: [Actions run #464](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571).
- Latest artifact: [artifact 14568746641](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571/artifacts/14568746641).

## Required visual evidence

Please download and inspect the actual artifact, not only the source or summary:
- `five-civilian-native-4x-contact-sheet.png` — all 20 native 64×96 direction captures.
- `five-civilian-game-scale-4x-contact-sheet.png` — all 20 direct 28×42 game-renderer captures enlarged 4× with nearest-neighbour rendering.
- Individual `npc-type-directions/{usher,cook,courier,coach,ref}-{front,back,left,right}.png`.
- Individual `npc-game-scale-28x42/{usher,cook,courier,coach,ref}-{front,back,left,right}.png`.
- `npc-gallery-4x.png`, `game-town-1x.png`, `game-menu-1x.png`, and `report.json` for context.
- Granny baseline images: `npc-snapshots/granny.png` and `granny-before-after-4x.png`.

## Review scope

Review these five only: **Usher, Cook, Courier, Coach, Referee**. Runner is excluded from this round. The remaining 20 civilians are on hold.

Compare each against Granny Volt's approved 10/10 finish benchmark without treating Granny as a design template. Apply `project-background/02-ART-DIRECTION-AND-APPROVAL.md` and `project-background/CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md`.

For each character, provide a 1–10 score and approve/revise recommendation. Assess:
1. Original silhouette and identity at native 64×96 and direct 28×42 game scale.
2. Face, expression, hair/headwear, age cues, and profile readability.
3. Clothing construction, materials, layering, seams, and value hierarchy.
4. Palette cohesion and distinction from the other four and Granny.
5. Signature prop readability, physical grip/attachment, and correct visibility in all directions.
6. Front/back/left/right completeness, anatomy, limb occlusion, foot placement, baseline, clipping, and consistency.
7. Town/gallery integration and whether role identity survives actual in-game scale.
8. Concrete defects ranked critical/major/minor, with exact direction and recommended correction.

## Known corrections to verify

- **Usher:** clipboard must retain a paper face, clip and detail in profile; confirm the uniform/cap identity remains distinctive.
- **Cook:** raised toque band must not obscure the eyes; side profile should show intentional face detail without a far-arm leak; pan grip and placement should remain coherent.
- **Courier:** global front/back rotation removed to restore baseline; verify consistent messenger satchel/parcel identity and readable side faces; no detached cyan hem stripe.
- **Coach:** shorter yoke; silver temples and rear profile hair; whistle clear of clipboard; vector-stroke team lettering independent of installed fonts; restrained rim light.
- **Referee:** broad torso limited to front/back; side views must not leak front torso; rear/profile hair/nape detail; raised yellow card and restrained rim light.

## Automated QA context — do not confuse with visual approval

Run #464 confirms native captures 20/20; direct 28×42 captures 20/20; directional integrity 92/92; role-debug 12/12; prop audit pass for 10 archetypes; gallery render pass; page errors 0; script errors 0.

The overall workflow is still **FAILED** on the separate full-roster civilian silhouette gate (max rendered IoU `0.9094292803970223`, Clinic/Sailor front; Coach/Courier back `0.8939319190922546`) and golden snapshot gate (1 match / 23 changed; baseline explicitly unapproved). Missing-audio 404 console errors remain. No golden snapshots were refreshed or approved. Do not recommend bypassing these gates or changing the golden baseline as part of this visual review. Separate character-specific findings from the full-roster/global gate.

## Required reviewer response

Return a comparative table for all five characters with score, recommendation, strongest qualities, weakest direction, and required fixes. Then rank the five as a batch and state whether each is ready for owner review after any listed corrections. Do not infer owner approval. Do not begin the remaining 20 civilians.

**Approval boundary:** Claude's recommendation is advisory. ChatGPT will assess and implement valid findings, rerun QA, and update the package. The project owner makes the final approval decision.


## Additional required review: critique the draft construction standard

Read [Civilian Vector Construction Standard](../../project-background/CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md) in full. It is a new owner-authorized draft, not a locked policy. Alongside the five character verdicts, assess:

1. Are Granny's measured dimensions and the exclusion of umbrella/ground effects methodologically correct?
2. Are the proposed proportion bands useful and measurable? Identify ambiguous landmarks, pose-specific cases, and likely false positives.
3. Are the scorecard weights and suggested 90+ / 75%-per-category thresholds appropriate? Recommend changes with reasons.
4. Which criteria should be hard technical invariants, soft numeric warnings, or purely human art-direction judgments?
5. How should the five reviewed characters and Granny be measured to calibrate the ranges consistently?
6. Does the standard preserve original character identity and avoid turning Granny's body or design into a template?

Please return a concrete proposed revision and calibration table. Keep all numeric bands and score thresholds provisional unless the evidence supports locking them. Your critique must distinguish Granny's measured facts from the draft's proposed targets.

## Additional context: six-civilian standard application

ChatGPT has completed an internal application of the draft construction standard to all six built vector civilians, including Runner. See [Six-Civilian Construction Standard Audit](../../project-background/SIX-CIVILIAN-CONSTRUCTION-AUDIT.md) for the six per-character construction cards, provisional scorecard, rendered evidence, and QA measurements. **Review scope remains the five characters listed above.** Runner is not added to the independent Claude review by this note; the owner must explicitly change that scope if desired.
