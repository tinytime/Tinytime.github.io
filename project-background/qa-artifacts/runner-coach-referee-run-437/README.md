# Runner / Coach / Referee — Run #437 evidence

- **Source commit:** [`4aee0893d41c2c67de560d9d494b7ba7639685f9`](https://github.com/tinytime/Tinytime.github.io/commit/4aee0893d41c2c67de560d9d494b7ba7639685f9)
- **Browser QA:** [run #437](https://github.com/tinytime/Tinytime.github.io/actions/runs/44572590664)
- **Job:** `135731400814`
- **Artifact:** `vapor-city-browser-qa`, ID `14555840087`
- **Branch:** `npc-granny-baseline-overhaul`

This is the current three-character render set after the latest Runner and Coach profile polish. The artifact is the source of truth for the browser captures.

## Direction captures

All are native 64×96 PNGs:

- Runner: `npc-type-directions/runner-front.png`, `runner-back.png`, `runner-left.png`, `runner-right.png`
- Coach: `npc-type-directions/coach-front.png`, `coach-back.png`, `coach-left.png`, `coach-right.png`
- Referee: `npc-type-directions/ref-front.png`, `ref-back.png`, `ref-left.png`, `ref-right.png`

## Other inspected evidence

- `runner-coach-ref-cook-courier-usher-role-debug-8x.png`
- `npc-gallery-4x.png` and `npc-gallery-1x.png`
- `granny-before-after-4x.png`
- `game-town-1x.png`
- `report.json`

## Internal visual inspection

- **Runner:** front/back/profile identity remains coherent; both profiles show two distinct stride legs and feet. The updated profile nose and mouth are more deliberate, with cheek flecks removed. Bib 07 and stopwatch remain present.
- **Coach:** profile head reads as a true side silhouette with one visible eye; the narrow side torso remains a single plane. Clipboard is distinct and the hand visibly overlaps its lower edge. The cream yoke is coherent in profile. The whistle is now an angled chamber with a dark mouthpiece opening, visible in front and profile captures.
- **Referee:** raised card arm/card remain on the forward/face side in both profiles. The hand supports the card; striped shirt, red shorts, socks and footwear remain coherent.
- No edge contacts or detached large components in all 92 directional integrity captures; no character-specific clipping found.

## Targeted automated QA

Pass: syntax and renderer module load; inventory (135 NPCs / 24 civilian mappings); six-vector palette audit; body/baseline (35px target, max deviation 0.4375px, baseline delta 1); face distinctness 23/23 at native and 28×42; role-debug 12/12 across six vector civilians; directional integrity 92/92; prop audit; separate silhouette-quality audit 180/180; gallery; town regression (street map, 16 NPCs, Granny present); zero page errors; zero script errors.

## Workflow-wide failures and limitations

The overall workflow concluded **FAILED**, not because of a new Runner/Coach/Referee targeted defect:

1. Full civilian type-silhouette audit: Clinic/Sailor front IoU 0.909429 (>0.90); Coach/Courier back IoU 0.890479. Separate silhouette-quality audit passes 180/180.
2. Golden snapshot gate: 23 changed / 1 match; approval remains explicitly unapproved. No golden snapshots were refreshed or approved.
3. 180 missing-audio resource 404 console errors; pageErrors 0 and scriptErrors 0.

The standard street-town capture contains 16 NPCs and Granny but does not explicitly spawn Runner, Coach or Referee. Treat it as regression evidence, not character-specific in-world readability proof. Derived 28×42 images are resamplings of the native captures, not separate browser scene captures.

## Status

**Targeted internal QA and visual inspection: PASS for all three.** This is not Claude's independent comparative review or owner approval. Runner, Coach and Referee remain **NOT APPROVED** pending updated Claude review and explicit owner acceptance. Keep the remaining 20 civilians on hold.
