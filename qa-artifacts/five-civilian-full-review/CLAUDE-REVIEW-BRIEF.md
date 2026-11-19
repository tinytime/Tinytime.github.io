# Claude Independent Review Brief — Five-Civilian Revision

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