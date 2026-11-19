# Claude Independent Review — Runner / Coach / Referee (Run #444)

**Review status:** Updated evidence ready; owner-requested anatomy corrections included  
**Characters:** Runner, Coach, Referee  
**Branch:** `npc-granny-baseline-overhaul`  
**Exact renderer source tested:** `21481ee1768e80595cfdb13f6e338f57c10d076c`

## Primary evidence

- [GitHub Actions run #444](https://github.com/tinytime/Tinytime.github.io/actions/runs/44579787401)
- [Download QA artifact — artifact ID 14558936072](https://github.com/tinytime/Tinytime.github.io/actions/runs/44579787401)
- [Exact tested source commit](https://github.com/tinytime/Tinytime.github.io/commit/21481ee1768e80595cfdb13f6e338f57c10d076c)
- [Live civilian renderer — npc_sprites.js](https://github.com/tinytime/Tinytime.github.io/blob/21481ee1768e80595cfdb13f6e338f57c10d076c/npc_sprites.js)
- [Art direction and approval standard](../../project-background/02-ART-DIRECTION-AND-APPROVAL.md)
- [Technical implementation and owner feedback](../../project-background/03-TECHNICAL-IMPLEMENTATION.md)
- [QA and handoff record](../../project-background/04-QA-AND-HANDOFF.md)
- [NPC vector character tracker](../../project-background/NPC_VECTOR_CHARACTER_TRACKER.md)

Artifact contents:
- `npc-type-directions/`: 12 native 64×96 PNGs — each character × front/back/left/right.
- `npc-game-scale-28x42/`: 12 direct 28×42 renders from the live `owCiv` renderer, no resize.
- Role-debug sheet, gallery, Granny comparison, town regression screenshot and `report.json`.

## Owner-requested corrections incorporated in this evidence

The owner identified that the three side profiles showed two arms and that Runner's legs looked unusually angular and trouser-like.

- **Runner:** far arm removed from side views; stopwatch/near arm retained. Leg construction refined with curved contours, shorts ending above the knees, and visible lower-leg skin. The same shorts/calf separation is used in front and back views.
- **Coach:** far arm hidden in side views; clipboard-holding arm and hand retained.
- **Referee:** far arm hidden in side views; raised-card arm retained.

Animation clarification: Runner's current vector draw path renders a static pose per direction; the odd leg shapes were not temporary animation frames expected to normalize during animation.

## Internal visual inspection

I inspected all 12 native images and all 12 direct 28×42 captures from run #444.

- Side profiles now show one visible arm for Runner, Coach and Referee, with their role-defining prop/stopwatch arms preserved.
- Runner's front and back views now read as running shorts plus exposed calves rather than long angular trouser shapes. The two-leg stride and shoe separation remain legible at both scales.
- Coach's clipboard remains held by the visible profile arm.
- Referee's card remains raised and forward-facing in both profiles.
- No crop-edge contacts or detached large components were found in the 92-capture directional integrity audit.

## Automated QA results

Run #444 tested the exact source SHA above.

- JavaScript syntax: PASS.
- NPC sprite syntax: PASS.
- NPC sprite module loaded: PASS.
- Direct game-scale capture: 12/12 PASS, all exactly 28×42, direct live renderer method.
- Role-debug: 12/12 PASS.
- Civilian visual integrity: 92/92 PASS; zero edge contacts and zero detached large components.
- Face distinctness: 23/23 PASS at native and game scale.
- Palette/body checks: PASS.
- Prop audit: PASS.
- Archetype silhouette quality: 180/180 PASS.
- Gallery visual check: PASS.
- Town regression: PASS; street map, 16 NPCs, Granny present.
- Page errors: 0; script errors: 0.

## Overall workflow status — separate from character-specific review

The overall workflow remains **FAILED** on existing/global gates:
1. Clinic/Sailor front full-body silhouette IoU is `0.9094292803970223`, above the strict `<0.90` threshold.
2. Golden snapshot comparison reports 23 changed / 1 match; the baseline remains explicitly unapproved.
3. 180 missing-audio resource 404 console errors remain.

No golden snapshots were refreshed or approved. These failures are not evidence of a Runner, Coach or Referee-specific regression; the targeted checks above pass.

## Requested independent review

Please inspect the actual images in the run #444 artifact. Compare each character independently with Granny Volt as the project's 10/10 benchmark for finish, clarity, personality and game-scale readability. Granny is a quality benchmark, not a design template.

For each character, provide:
1. Score out of 10 and verdict: approve, approve after specified corrections, or reject pending corrections.
2. Role/silhouette readability at native 64×96 and direct 28×42.
3. Face/expression quality and profile readability.
4. Four-direction consistency and intentionality.
5. Clothing construction, palette, props and hand/prop contact.
6. Any remaining anatomy, clipping, overlaps or edge issues.
7. Required corrections versus optional polish.
8. Whether it meets Granny's quality bar without imitating Granny.

Specific focus:
- **Runner:** whether the revised shorts/calf split looks athletic and anatomically convincing; whether both stride legs read naturally in front/back/left/right; bib, stopwatch and shoe legibility.
- **Coach:** one-arm side profile; natural clipboard grip/contact; true profile head/torso; whistle/mouthpiece.
- **Referee:** one-arm side profile; clear raised-card grip and forward placement; natural torso/arm silhouette.

Please give an overall batch verdict and identify any mandatory corrections before owner acceptance.

## Approval boundary

The corrections are implemented and have passed targeted internal QA plus visual inspection. This is **not** Claude's independent review or owner approval. All three remain **NOT APPROVED** until Claude's review is recorded and the owner explicitly accepts the batch. Do not start the remaining 20 civilians before both gates are complete.
