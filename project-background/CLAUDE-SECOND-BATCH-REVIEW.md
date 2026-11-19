# Claude Independent Comparative Review — Runner, Coach, Referee

**Purpose:** Review the completed second vector-civilian batch side by side against Granny Volt's approved 10/10 visual-quality benchmark.

**Builder:** ChatGPT  
**Independent reviewer:** Claude  
**Final decision authority:** Project owner  
**Status:** Internal QA complete for all three; Referee final renderer independently inspected; Claude review pending; owner approval pending. Do not start the remaining 20 civilians.

## Exact source and evidence

Repository: [tinytime/Tinytime.github.io](https://github.com/tinytime/Tinytime.github.io)  
Branch: `npc-granny-baseline-overhaul`  
Latest Referee renderer source: [`4f0d135f0f14506a2c19df0f760d0fe2ec5a7495`](https://github.com/tinytime/Tinytime.github.io/commit/4f0d135f0f14506a2c19df0f760d0fe2ec5a7495)  
Branch head at review handoff: `cc26b76f01c7c32533d138af8c987d8cdcd8812f` (subsequent QA index/documentation only).

| Character | Workflow run | Tested source | Artifact |
|---|---|---|---|
| Runner | [#416 / 44548532467](https://github.com/tinytime/Tinytime.github.io/actions/runs/44548532467) | `6905171293c04f34f3ee09c804c490082e1f3d57` | `14540104692` |
| Coach | [#420 / 44551256553](https://github.com/tinytime/Tinytime.github.io/actions/runs/44551256553) | `a9c29109e8f64a1009fd0b1df5ab560ff08fdbd8` | `14542916538` |
| Referee | [#426 / 44557279748](https://github.com/tinytime/Tinytime.github.io/actions/runs/44557279748) | `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495` | `14545038850` |

Download each artifact from the corresponding GitHub Actions run's **Artifacts** section. The Referee artifact index is also committed at [project-background/qa-artifacts/referee-run-426/README.md](qa-artifacts/referee-run-426/README.md).

## Character-specific internal QA

### Runner
- Dedicated airborne sprint pose, coral race singlet, separate split shorts, bib 07, sweatband, curls, stopwatch, technical shoes.
- Four native 64×96 directions and 4× directional view inspected.
- Palette/body/baseline/face, role-debug, 92/92 visual integrity, prop, town, gallery and separate silhouette-quality checks passed.
- No Runner-specific clipping or detached geometry found.

### Coach
- Grounded veteran coach stance, forest-green jacket, cream shoulder yoke, silver-templed face, whistle/lanyard, marked clipboard, track trousers and court shoes.
- Four native directions and enlarged views, role-debug, gallery and town evidence inspected.
- Palette/body/baseline/face, role-debug 10/10, 92/92 visual integrity, prop, silhouette-quality, town and gallery checks passed.
- Side-profile facial detail was refined in the final tested source. No Coach-specific clipping or detached geometry found.

### Referee
- Black/ivory striped official shirt, vermilion shorts, tall socks, whistle and raised yellow card.
- Final correction commit establishes the same anatomical-left card arm across all four views, visible fingers overlapping the card edge, cropped rear hair beneath the sweatband, and a narrower profile torso.
- QA Coordinator inspected native 64×96 front/back/left/right, enlarged four-direction gallery column, six-character role-debug sheet, full 4× gallery, town screenshot and report.
- Palette: 1,078 unique antialiased colors, 2,192 opaque pixels, 93 ink pixels.
- Body/baseline: 35.4375px vs 35px target, deviation 0.4375px, baseline delta 1, contrast ratio 4.70.
- Face distinctness: 23/23. Role-debug: 12/12. Visual integrity: 92/92, zero edge contacts and zero detached large components. Prop audit and silhouette-quality 180/180 below 0.85 passed. Gallery passed. No page or script errors.
- At 28×42 downscaled preview, the yellow card and red mark remain recognizable.
- No Referee-specific clipping or detached geometry found.

## Known global QA gates — not character-specific rejections

The latest Referee run's overall workflow is **FAILED**:
1. Global rendered civilian silhouette audit: Clinic/Sailor front IoU = 0.909429, above 0.90.
2. Golden snapshots remain explicitly unapproved (23 changed, 1 match). Do not refresh or approve snapshots.
3. 180 audio-resource 404 console errors. Script errors = 0; page errors = 0.
4. Separate silhouette-quality audit passed 180/180 comparisons (maximum IoU 0.827467 under its <0.85 target).

Do not conflate these global gates with the targeted character-specific passes.

## Explicit evidence limitation

The standard town capture uses the street map with 16 NPCs and Granny, but does **not** explicitly spawn a Referee. It proves scene regression only, not Referee-specific in-world readability. If town/room readability is part of approval, obtain a dedicated live Referee spawn capture before recommending final approval. The 28×42 Referee preview is derived from directional captures, not a live town spawn.

## Review request

Please compare all three designs with Granny Volt and with one another. Score each 1–10 and provide an independent approve/reject recommendation. Assess:

1. Distinctive silhouette and personality at native and thumbnail size.
2. Face construction, expression and side/back consistency.
3. Clothing construction, material cues, layering, seams, hems and finish.
4. Palette cohesion and separation from Granny and the other two characters.
5. Prop design, grip/attachment, readability and correct direction-specific placement.
6. Four-direction completeness and anatomical consistency.
7. Native 64×96 and 28×42 game-scale readability.
8. Foot baseline, scale, clipping and gallery presentation.
9. Any defects ranked by severity, with concrete fixes.
10. Whether the group is ready for owner approval after any required corrections.

Be candid. Automated QA does not substitute for visual judgement. Please identify optional polish separately from approval blockers.

## Approval boundary

Claude's review is independent and advisory. ChatGPT will evaluate the findings, implement valid corrections and rerun relevant QA. The project owner makes the final approval decision. Until then Runner, Coach and Referee remain **NOT APPROVED**, and the remaining 20 civilian designs stay on hold.
