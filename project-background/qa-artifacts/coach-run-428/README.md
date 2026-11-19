# Coach Browser QA — Run 428

**QA scope:** fresh render after the Coach clipboard / rear-hair correction.

## Provenance

- Branch: `npc-granny-baseline-overhaul`
- Tested source commit: [`3fdbd1e0640c97afce2c3b732491ff84823ba84e`](https://github.com/tinytime/Tinytime.github.io/commit/3fdbd1e0640c97afce2c3b732491ff84823ba84e)
- Workflow: [Vapor City Browser QA #428](https://github.com/tinytime/Tinytime.github.io/actions/runs/44560760230)
- Job: [browser-qa / 135689302384](https://github.com/tinytime/Tinytime.github.io/actions/runs/44560760230/job/135689302384)
- Artifact: `14550985215` (`vapor-city-browser-qa`, 6.96 MB; expires 2026-12-03)
- Workflow conclusion: **FAILED**. Browser diagnostic step failed; screenshot/report upload succeeded.
- The artifact is the authoritative source for the actual captures and `report.json`. Download it from the run's Artifacts section.

## Relevant files inside the artifact

- `npc-type-directions/coach-front.png`
- `npc-type-directions/coach-back.png`
- `npc-type-directions/coach-left.png`
- `npc-type-directions/coach-right.png`
- `npc-snapshots/coach.png`
- `npc-gallery-4x.png` and `npc-gallery-1x.png`
- `runner-coach-ref-cook-courier-usher-role-debug-8x.png`
- `game-town-1x.png`, `game-menu-1x.png`
- `report.json` and `game-main-check.js`

## Internal visual inspection

- All four native 64×96 views and nearest-neighbour enlarged views inspected.
- Back view: charcoal/silver rear hair is visible below the cap.
- Left and right profiles: clipboard board, paper and clip are separate from the jacket; the hand overlaps the board's near/lower edge. Both sides mirror coherently.
- Cream yoke follows the shoulder seam as a tailored panel in both profiles; it does not collapse into the torso.
- Both profiles retain eye, projecting nose and mouth details. Sideburn/hair edge is clean without an obvious detached strand.
- Whistle and short gold lanyard appear in both profiles. At native scale the pendant is very small and reads more readily as a gold pendant than an unmistakable whistle; treat as a minor legibility/polish concern for reviewer consideration.
- No Coach-specific clipping, edge contact or detached large component observed.
- The gallery includes Coach in all four directions. The role-debug sheet includes Coach front/right only, as designed by the current QA harness.
- Town scene regression passed (street map, 16 NPCs, Granny present). The standard town roster does not explicitly identify/spawn Coach, so this is general town regression evidence, not a Coach-specific in-world prop-readability check.

## Automated results

- Syntax checks, NPC renderer module load, and inventory: pass.
- Vector palette audit: pass; Coach 1,052 unique antialiased colors, 2,040 opaque pixels, 64 exact outline pixels.
- Body/baseline audit: pass; rendered body height 34.5625 px vs 35 px target (0.4375 px deviation), baseline delta 1, contrast ratio 3.665.
- Face distinctness: 23/23; role-debug: 12/12 captures across six vector characters (front/right).
- Directional visual integrity: 92/92; zero edge contacts and zero detached large components.
- Prop audit, separate silhouette-quality audit (180/180 below 0.85), gallery and town regression: pass.
- Page errors: 0; script errors: 0; console errors: 180, reported as missing audio-resource 404s.

## Workflow-wide failures

- Global civilian-type silhouette audit: Clinic/Sailor front IoU 0.909429 exceeds 0.90. Coach/Courier front 0.855085 and back 0.890479 are below the 0.90 failure threshold.
- Golden snapshot gate remains explicitly unapproved (23 changed, 1 match). No snapshots were refreshed or approved.

## Verdict / follow-up

**Coach targeted internal browser QA and four-direction visual review: PASS with a minor whistle-legibility note. Coach remains NOT APPROVED.** Independent comparative review against Granny Volt and owner acceptance are still required. A dedicated Coach town spawn/capture would be needed if approval requires proof of Coach-specific readability in the live street scene.
