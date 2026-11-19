# Claude Independent Review — Runner / Coach / Referee (Run #441)

**Review status:** Ready for independent review  
**Characters:** Runner, Coach, Referee  
**Working branch:** `npc-granny-baseline-overhaul`  
**Exact renderer source tested:** `8eeca34ae10a1d829f5035d72b57989bffb9e6e0`  
**Documentation/package commit:** added after the tested source; no renderer changes.

## Primary evidence

- [GitHub Actions run #441](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577303597)
- [Downloadable QA artifact — vapor-city-browser-qa (artifact ID 14558375062)](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577303597)
- [Exact tested source commit](https://github.com/tinytime/Tinytime.github.io/commit/8eeca34ae10a1d829f5035d72b57989bffb9e6e0)
- [Live civilian renderer — npc_sprites.js](https://github.com/tinytime/Tinytime.github.io/blob/8eeca34ae10a1d829f5035d72b57989bffb9e6e0/npc_sprites.js)
- [Direct game-scale capture implementation and assertions](https://github.com/tinytime/Tinytime.github.io/blob/8eeca34ae10a1d829f5035d72b57989bffb9e6e0/qa/vapor-city-browser-qa.mjs)
- [Art direction and approval standard](../../project-background/02-ART-DIRECTION-AND-APPROVAL.md)
- [Project overview and review model](../../project-background/01-PROJECT-OVERVIEW.md)
- [Technical implementation notes](../../project-background/03-TECHNICAL-IMPLEMENTATION.md)
- [QA and known-issues record](../../project-background/04-QA-AND-HANDOFF.md)
- [NPC vector character tracker](../../project-background/NPC_VECTOR_CHARACTER_TRACKER.md)

The artifact ZIP is the authoritative image bundle. It contains:
- `npc-type-directions/`: 12 native 64×96 PNGs — Runner, Coach and Referee × front, back, left and right.
- `npc-game-scale-28x42/`: 12 direct 28×42 PNGs — same character/direction combinations.
- Role-debug evidence, gallery and Granny comparison images, town regression screenshot, and `report.json`.

## Important game-scale capture clarification

The 28×42 files are **fresh direct renders from the actual live `owCiv` vector renderer**, using the in-game town scale (`OWT=36`, vector scale `0.28`). They are not downscaled copies of the 64×96 QA images. The harness records the capture method and asserts all 12 expected files and dimensions.

The direct game-scale PNGs are isolated transparent sprite captures, not full screenshots of the town camera. The town screenshot is general scene-regression evidence only; the standard town setup does not explicitly spawn these three characters.

## What internal QA has verified

The builder inspected all 12 native views and all 12 direct game-scale views, plus enlarged sheets and supporting artifact images.

- **Runner:** airborne stride retains two distinct legs/feet; bib and stopwatch remain legible; side-profile nose/mouth read cleanly.
- **Coach:** both side views read as true profiles; narrow side torso is maintained; clipboard is visibly in front with hand contact; whistle/mouthpiece and uniform details remain coherent.
- **Referee:** raised card remains readable and is on the forward/face side in both profiles.
- No character-specific crop-edge clipping was found in the inspected native or game-scale sheets.

Automated targeted checks recorded in run #441:
- Direct game-scale capture audit: 12/12 PASS.
- Role-debug: 12/12 PASS.
- Directional integrity: 92/92 PASS; zero edge contacts and zero detached large components.
- Face distinctness: 23/23 PASS. Note: the all-civilian 28×42 face-signature sub-audit still derives those signatures from native captures; the direct 28×42 PNGs in this artifact are for these three characters.
- Prop audit: PASS.
- Archetype silhouette-quality: 180/180 PASS.
- Gallery and town regression: PASS; town has 16 NPCs and Granny present.
- Page errors: 0. Script errors: 0.

## Overall workflow status — do not conflate with character verdict

The overall GitHub Actions workflow is **FAILED** on separate/global gates:
1. The 23-civilian type-silhouette audit flags Clinic/Sailor front IoU `0.9094292803970223`, above the strict `<0.90` threshold.
2. Golden snapshot comparison reports 23 changed / 1 match. The baseline is explicitly unapproved.
3. 180 missing-audio resource 404 console errors remain.

These are reported transparently but are not identified as defects in Runner, Coach or Referee by the targeted checks. **No golden snapshots were refreshed or approved.** The separate archetype silhouette-quality audit passes 180/180.

## Requested independent review

Please inspect the actual PNGs in the artifact, not just this summary or the source code. Compare the three designs with Granny Volt as the project's 10/10 standard for finish, clarity, personality and game-scale readability. Granny is a quality benchmark, not a design template: do not reward visual similarity or recommend copying her silhouette, palette, outfit or signature props.

For **each character independently**, please provide:
1. A score out of 10 and a clear verdict: approve, approve after specified corrections, or reject pending corrections.
2. Silhouette and role recognition at 28×42 game scale and at native 64×96.
3. Face/expression quality and profile readability.
4. Four-direction consistency and whether left/right are intentional views rather than accidental mirrors or front-view overlays.
5. Clothing construction, palette distinction, prop integration and physical hand/prop contact.
6. Any clipping, edge contact, detached marks, awkward overlaps or anatomy/layering issues.
7. A concise list of required corrections, separated from optional polish. If none, explicitly say no required corrections.
8. Whether each character meets Granny's quality bar without imitating Granny.

Character-specific focus:
- **Runner:** two-leg stride clarity in both profiles; race bib/number legibility; stopwatch visibility; shoe/sole separation; profile facial expression.
- **Coach:** genuine side-profile head and torso; clipboard layering in front of forearm/hand with readable grip; whistle and mouthpiece readability; rear hair/cap and jacket/yoke construction.
- **Referee:** raised card and arm placement in both profiles; card readability; consistent anatomical arm/prop placement across left and right; face and uniform distinction.

Please also give an overall batch verdict: is the three-character direction strong enough to return to the owner for acceptance, or should the batch remain blocked? Be specific about which findings are mandatory before acceptance.

## Approval boundary

This is a request for independent review, **not** a declaration of approval. Current status for all three remains **NOT APPROVED** until Claude's review is recorded and the project owner explicitly accepts the batch. Do not start the remaining 20 civilian designs before both gates are complete.
