# Claude Independent Comparative Review — Runner, Coach, Referee

**Review date:** 2026-11-19  
**Project:** Vapor City civilian vector overhaul  
**Repository:** https://github.com/tinytime/Tinytime.github.io  
**Branch:** `npc-granny-baseline-overhaul`  
**Requested reviewer:** Claude (independent reviewer)  
**Final approval authority:** Project owner  
**Builder:** ChatGPT  
**Status:** UPDATED RENDERS READY FOR FOCUSED COMPARATIVE RE-REVIEW. ALL THREE CHARACTERS REMAIN NOT APPROVED.

**Focused GitHub review package:** [Runner / Coach / Referee — latest run #432](qa-artifacts/runner-coach-referee-run-429/README.md). Download the run #432 artifact and use the exact PNG paths listed in that package index.

## Primary evidence — use this latest combined run

- **Latest tested renderer/source commit:** [`52f286912bf6fa44219972520211bc13d6f3ef7a`](https://github.com/tinytime/Tinytime.github.io/commit/52f286912bf6fa44219972520211bc13d6f3ef7a)
- **Browser QA run #432:** [GitHub Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44566620323)
- **Job:** `135710025332`
- **Artifact:** `vapor-city-browser-qa`, ID `14550224509`
- **Report sourceCommitSha:** `52f286912bf6fa44219972520211bc13d6f3ef7a`
- **Branch head at package preparation:** `52f286912bf6fa44219972520211bc13d6f3ef7a` (the tested source is the branch head).

The artifact is the primary evidence. It contains all three characters' four native 64×96 directional PNGs, role-debug, full 23-civilian gallery, Granny comparison, town screenshot and report. Do not base approval on source code descriptions or earlier run images alone.

## Required files in artifact 14550224509

**Runner**
- `npc-type-directions/runner-front.png`
- `npc-type-directions/runner-back.png`
- `npc-type-directions/runner-left.png`
- `npc-type-directions/runner-right.png`

**Coach**
- `npc-type-directions/coach-front.png`
- `npc-type-directions/coach-back.png`
- `npc-type-directions/coach-left.png`
- `npc-type-directions/coach-right.png`

**Referee**
- `npc-type-directions/ref-front.png`
- `npc-type-directions/ref-back.png`
- `npc-type-directions/ref-left.png`
- `npc-type-directions/ref-right.png`

**Comparative/context evidence**
- `runner-coach-ref-cook-courier-usher-role-debug-8x.png`
- `npc-gallery-4x.png`
- `npc-gallery-1x.png`
- `granny-before-after-4x.png`
- `npc-snapshots/granny.png`
- `game-town-1x.png`
- `report.json`

## Internal QA summary — run #432

The exact run #432 artifact was downloaded. All 12 native directional images were enlarged 5× with nearest-neighbour and visually inspected, along with the six-character role-debug sheet, 23-civilian four-direction gallery, Granny comparison and report.

- Renderer/game syntax, module load and NPC inventory: pass (135 NPCs / 24 civilian archetype mappings).
- Vector palette audit: pass (six vector civilians; Runner 1,070 unique colors, Coach 1,077, Referee 1,078).
- Body/baseline/contrast and face distinctness: pass (23/23 unique faces).
- Role-debug: 12/12.
- Directional visual integrity: 92/92, zero edge contacts and zero detached large components. The prior run #431 detected one-pixel top-edge contact on Runner's two profile curl crowns; the crowns were lowered slightly in commit `52f2869`, and run #432 verifies the correction.
- Prop audit: pass.
- Separate archetype silhouette-quality audit: 180/180 pairs pass (maximum IoU 0.827467).
- Gallery visual check: pass.
- Town-scene regression: pass (street map, 16 NPCs, Granny present).
- Page errors: 0. Script errors: 0.

### Important global workflow failures — not character-specific

The overall workflow concluded **failure** because:
1. The full 23-civilian type-silhouette audit flags Clinic/Sailor front IoU 0.909429 (>0.90). Other close pairs include Coach/Courier back 0.890479, Sailor/Welder back 0.889290, Clinic/Sailor back 0.884215, Clinic/Welder back 0.871764 and Cook/Courier back 0.863465.
2. Golden snapshots remain explicitly unapproved: 23 changed, 1 match. No snapshots were refreshed or approved.
3. 180 missing-audio resource 404 console errors were logged.

The separate archetype silhouette-quality audit passes; do not conflate it with the full civilian type-silhouette audit. No page or script errors were reported. These global gates are not evidence of a Runner, Coach or Referee-specific defect.

### Town-context limitation

The standard street-town screenshot contains 16 NPCs and Granny but does not explicitly spawn Runner, Coach or Referee. Treat it as scene-regression evidence, not proof of character-specific live-town readability. The 28×42 game-scale directional captures remain available in the report/captures for readability assessment.

## Previous Claude verdict and what changed

Claude's previous review of run #429 scored Runner 6/10 (corrections required), Coach 7/10 (approve after whistle correction), and Referee 7.5/10 (acceptable as-is, optional polish). Claude found Runner's four run #429 directional PNGs pixel-identical to run #416; source comparison confirmed the Runner corrections had been omitted from the tested integration commit. The run #429 source also showed a whistle pendant that read too much like a medallion.

The following corrections are now included in the latest tested renderer:
- **Runner:** side-profile eye/nose/mouth strengthened; profile curl crown enlarged to match front/back; detached pale sole strokes removed; shorts accents softened into seams; profile stopwatch added; crossed-leg value separation improved. The enlarged profile curls were then lowered slightly to clear the native capture's top edge; run #432 confirms no directional edge contacts.
- **Coach:** whistle redesigned with a projecting mouthpiece and barrel-like body; previous rear silver hair, profile clipboard board/paper/clip separation and visible hand overlap, and shoulder-yoke corrections remain in the combined render.
- **Referee:** optional polish added after the previous review—clearer projecting profile nose, subtle warm ear detail, and a short angled jacket seam to give the profile torso a more three-quarter garment read. Run #432's four-direction images include this polish; no other Referee pose, card-hand or rear-hair changes were made in this pass.

## Review criteria

Please inspect all four directions and comparative context, then provide for each character:

1. A candid 1–10 quality score against Granny Volt's 10/10 finish benchmark.
2. Approve / reject / approve after specified corrections.
3. Silhouette identity and role readability at native size and thumbnail scale.
4. Face construction, expression and profile quality.
5. Rear-head/hair construction and consistency across directions.
6. Clothing construction, material cues, layering and finish.
7. Palette distinction from the other two characters and the existing vector roster.
8. Prop readability, grip/attachment and direction-specific consistency.
9. Four-direction completeness, pose anatomy, feet/baseline and clipping.
10. Concrete defects ranked major/minor/optional, with specific corrective guidance.

### Character-specific points to scrutinize

**Runner**
- Confirm side-profile faces read clearly after the eye/nose/mouth corrections.
- Confirm enlarged curls remain coherent in front, back and both profiles without touching the crop edge.
- Confirm bib 07 orientation and legibility in front and side views.
- Confirm the pale floating dash beneath the feet is gone.
- Judge whether the softened shorts accents read as intentional athletic seams rather than tears.
- Judge leg separation and stopwatch visibility across directions.

**Coach**
- Confirm rear silver-templed hair beneath the cap reads as intentional hair.
- Confirm clipboard is a separate board/paper/clip construction and hand-connected in both profiles.
- Judge whether the redesigned whistle reads clearly as a whistle at native 64×96 / 28×42 game scale, rather than an abstract chest ornament.
- Confirm the cream shoulder yoke remains a coherent garment panel in profiles.

**Referee**
- Confirm card handedness is anatomically consistent across front/back/profiles.
- Confirm the hand visibly supports the card.
- Confirm rear hair beneath the sweatband reads intentionally.
- Judge whether the new projecting profile nose and ear detail improve face construction without appearing exaggerated.
- Judge whether the angled jacket seam gives the profile a subtle three-quarter read without looking like an accidental stripe.
- Confirm the yellow card remains readable at native and game scale.

## Required final verdict

Please state:
- Individual scores and recommendations for Runner, Coach and Referee.
- Whether the three-character batch is collectively ready for owner approval.
- Any mandatory corrections before approval.
- Any optional polish that should not block approval.
- Whether the Granny comparison demonstrates comparable finish without copying Granny's design.

Do not approve based on code inspection or automated metrics alone. The project owner makes the final decision. Until Claude's updated review is received and the owner explicitly accepts the batch, all three remain **NOT APPROVED** and the remaining roster remains on hold.

No golden snapshots were refreshed or approved.
