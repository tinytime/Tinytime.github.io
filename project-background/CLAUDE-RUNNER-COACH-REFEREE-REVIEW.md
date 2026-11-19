# Claude Independent Comparative Review — Runner, Coach, Referee

**Review date:** 2026-11-19  
**Project:** Vapor City civilian vector overhaul  
**Repository:** https://github.com/tinytime/Tinytime.github.io  
**Branch:** `npc-granny-baseline-overhaul`  
**Requested reviewer:** Claude (independent reviewer)  
**Final approval authority:** Project owner  
**Builder:** ChatGPT  
**Status:** RUN #437 INTERNAL VISUAL QA COMPLETE; READY FOR INDEPENDENT COMPARATIVE RE-REVIEW. ALL THREE CHARACTERS REMAIN NOT APPROVED.

**Focused GitHub review package:** [Runner / Coach / Referee — latest run #437](qa-artifacts/runner-coach-referee-run-437/README.md). Download artifact 14555840087 and use the exact PNG paths listed in that package index.

## Primary evidence — use this latest combined run (run #437)

- **Latest tested renderer/source commit:** [`4aee0893d41c2c67de560d9d494b7ba7639685f9`](https://github.com/tinytime/Tinytime.github.io/commit/4aee0893d41c2c67de560d9d494b7ba7639685f9)
- **Browser QA run #437:** [GitHub Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44572590664)
- **Job:** `135731400814`
- **Artifact:** `vapor-city-browser-qa`, ID `14555840087`
- **Report sourceCommitSha:** `4aee0893d41c2c67de560d9d494b7ba7639685f9`
- **Branch head at package preparation:** `4aee0893d41c2c67de560d9d494b7ba7639685f9`.

The artifact is the primary evidence. It contains all three characters' four native 64×96 directional PNGs, role-debug, full 23-civilian gallery, Granny comparison, town screenshot and report. Do not base approval on source code descriptions or earlier run images alone.

## Required files in artifact 14555840087

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

## Historical internal QA summary — run #432

The exact run #437 artifact was downloaded. All 12 native directional images were enlarged 5× with nearest-neighbour and visually inspected, along with the six-character role-debug sheet, 23-civilian four-direction gallery, Granny comparison and report.

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


## Independent review received — run #432 (2026-11-19)

Claude's latest visual verdict supersedes the earlier run #432 review state:

| Character | Score | Verdict | Blocking correction |
|---|---:|---|---|
| Runner | 6.5/10 | Reject | Left-profile bib numerals mirrored; profile bib too flat; profile mouth still unreadable at native size; crossed stance / four-shoe overlap |
| Coach | 7.5/10 | Approve after correction | Whistle still reads as round gold medallion |
| Referee | 7.5/10 | Approve after correction | Dark chin-level line protrudes outside the head in both profiles |

Claude confirmed Runner's floating sole dash is gone, curls are coherent and clear the crop, shorts accents read as seams, and the stopwatch appears in profiles. Front/back are strong. Coach's clipboard separation/grip, rear silver hair and yoke are good. Referee's card readability/grip, rear hair, nose, ear and jacket seam are good. Global Clinic/Sailor overlap, unapproved snapshots and audio 404s are explicitly not character blockers. Claude did not inspect game-scale 28×42 captures or the 1× town screenshot.

### Builder corrections implemented after that review

- Commit [`a08c7eff983ea8ce23cbd31b33d008f1d33b9366`](https://github.com/tinytime/Tinytime.github.io/commit/a08c7eff983ea8ce23cbd31b33d008f1d33b9366): Runner side bib reshaped to a tapered/wrapped profile panel; profile number is counter-flipped so the left view retains legible `07`; side stride simplified to two separated leg/foot planes; mouth strengthened with a distinct dark smile/lower-lip detail; Referee chin contour shortened and moved inside the jaw.
- Commit [`777db4e16176324e66d368c6a5b4f022ab1cd411`](https://github.com/tinytime/Tinytime.github.io/commit/777db4e16176324e66d368c6a5b4f022ab1cd411): Coach front and profile whistle redesigned as a horizontal barrel with a clearly projecting mouthpiece/tip rather than a round pendant.

**QA status:** These new corrections are code-implemented only. They have not yet been browser-tested or visually inspected. Run #433 was triggered by the first correction commit `a08c7ef`, before the Coach whistle commit `777db4e`; it does not validate the final combined source. Do not use run #432 images as evidence for these new corrections. A fresh standard browser QA run must test exact source commit `777db4e` and include explicit 28×42 game-scale inspection for Runner, Coach and Referee.

**Next gate:** inspect the new combined run's 12 native 64×96 PNGs, all 12 28×42 game-scale captures, role-debug, gallery, Granny comparison and town context. Verify left/right bib typography, two-foot stride, Coach barrel whistle, and Referee chin edge. Update this brief with actual evidence, then return the three-character package to Claude. All three remain NOT APPROVED pending the next independent review and owner decision.


## Owner feedback after run #434 — required correction pass

The project owner reviewed the run #434 native directional captures and reported:
- Coach's side profile looked like the front-facing head merely turned; clipboard was hidden behind the hand.
- Referee's raised-card arm appeared to emerge from behind the character in both side profiles; it must be on the forward/face side.
- Runner's side profile had a duplicate leg layer, reading as three legs.

These were confirmed in the run #434 artifact and corrected together in renderer commit [6332fb4622ed56686771e60541f975b2d6e33a61](https://github.com/tinytime/Tinytime.github.io/commit/6332fb4622ed56686771e60541f975b2d6e33a61):
- Coach now has a shaped side-profile head with a forward-projecting visor; clipboard board/paper are painted in front of the arm/hand, with a small visible finger overlap.
- Referee's raised arm and card now occupy the forward side of the profile; the mirrored view retains the same anatomical orientation.
- Runner's redundant preliminary profile leg/boot layer was removed; the two intended stride planes are painted once.

**Fresh evidence required:** Browser QA run #435 [is running](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570451203) against exact source `6332fb4622ed56686771e60541f975b2d6e33a61`. Do not review the run #434 artifact as proof of these fixes. Inspect the new artifact's six side captures (Runner/Coach/Referee left and right), all 12 native directions, 28×42 game-scale captures if available, role-debug, gallery, Granny comparison and report. Explicitly verify Coach profile identity and board/hand overlap, Referee arm/card forward placement in both views, and exactly two Runner legs/two feet in each profile. Keep all three NOT APPROVED until internal QA, Claude review and owner approval.


## Coach profile body follow-up — after run #435

Run #435 verified Runner's duplicate profile leg removal and Referee's forward-side raised-card placement in the rendered left/right captures. Coach's clipboard was visible with the hand relationship retained, and the shaped head read more clearly as a profile; however, the rendered side torso still contained the broad front-view jacket underneath the side overlay. This was corrected in follow-up commit [b15d14fd9c6604c7ee232adf47d44a5d328054b3](https://github.com/tinytime/Tinytime.github.io/commit/b15d14fd9c6604c7ee232adf47d44a5d328054b3): the broad jacket base is no longer painted for side views, and the side torso is narrower. This follow-up needs its own fresh browser artifact before review. Do not use run #435 to verify this additional change.


## Run #436 — refreshed evidence and internal visual verdict



## Run #436 — owner-feedback profile correction verification (2026-11-19)

- Tested renderer/source: `b15d14fd9c6604c7ee232adf47d44a5d328054b3` (run #436, run ID `44570917085`, job `135725393768`). Artifact `14553029329` (`vapor-city-browser-qa`); [GitHub Actions run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570917085).
- Actual native directional evidence: all 12 PNGs in `npc-type-directions/` are 64×96 (Runner, Coach, Referee × front/back/left/right). Enlarged 4× sheet and separately downsampled 28×42 visual check were inspected locally from these captures. The artifact itself does not contain separate browser-captured 28×42 character PNGs; record the 28×42 check as a derived resampling, not a native game-scene capture.
- **Runner:** both profiles now show two distinct stride legs and two feet; the duplicate third-leg underlayer is gone at native and derived 28×42 scale.
- **Coach:** side head and torso read as a side view rather than the front body underneath a turned head. Clipboard is in front of the arm/hand and remains legible; hand/board contact is visible. The follow-up torso narrowing from `b15d14f` is present in the tested source.
- **Referee:** raised card arm/card are on the forward/face side in both left and right profiles; no longer emerge from behind the body.
- Targeted checks: syntax/module/inventory pass; palette and body checks pass; role-debug 12/12; directional integrity 92/92, zero edge contacts and zero detached large components; prop audit passes; silhouette-quality 180/180; gallery visual pass; town scene pass (16 NPCs, Granny present); page errors 0 and script errors 0.
- Overall workflow remains failed on unrelated/global checks: civilian type silhouette audit max IoU `0.9094292803970223` (Clinic/Sailor overlap); golden snapshot comparison 23 changed / 1 match, with no baseline refresh or approval; existing audio resource 404 console errors. No snapshots were refreshed or approved.
- The QA report has no character-specific town spawn/capture for Runner/Coach/Referee; town screenshot is regression context only. Granny comparison remains a separate reference check.
- **Internal visual verdict:** all three owner-reported profile defects are corrected in the run #436 native renders. This is not independent Claude review or owner approval. Runner/Coach/Referee remain NOT APPROVED pending Claude's comparative review and owner decision. Keep remaining 20 civilians on hold.

**Reviewer focus for next pass:** compare Runner/Coach/Referee against Granny Volt on the latest source and assess the corrected profile anatomy, especially Coach's true side silhouette and clipboard grip, Referee's forward-side card arm, and Runner's two-leg stride. Review native 64×96 captures; the supplied artifact has no separate 28×42 browser captures, so a downsampled 28×42 check is supplementary only. The full artifact is attached to run #436, artifact ID `14553029329`.


## Superseding polish verification — run #437

Use run #437 as the current primary evidence; earlier run #436 and #432 images are historical only. The exact source changes after the prior run refine Runner's profile nose/mouth and remove cheek flecks that could read as stubble; refine Coach's whistle into an angled chamber with a dark mouthpiece opening and simplify the profile face into a clearer single-eye side silhouette. Referee is included unchanged from the prior corrected construction.

All 12 native 64×96 direction captures were inspected, along with 6× nearest-neighbour enlargements, derived 28×42 resamplings, role-debug, 23-civilian gallery, Granny comparison, town capture and report. Targeted QA: inventory 135 NPCs / 24 mappings; palette and body/baseline pass; 23/23 unique faces at native and game scale; role-debug 12/12; integrity 92/92 with no edge contacts or detached large components; prop audit pass; silhouette-quality 180/180; gallery and town regression pass; zero page/script errors. Workflow-wide failures remain Clinic/Sailor front IoU 0.909429, unapproved snapshots (23 changed / 1 match), and 180 missing-audio 404s. No snapshots were refreshed or approved. Standard town scene does not explicitly spawn these three.

**Reviewer request:** use the new run #437 images for fresh individual scores and verdicts. Reassess Runner's profile face cleanup, Coach's profile face and dark whistle mouthpiece at native/game scale, and Referee's unchanged forward-side card arm. Please state whether the batch is collectively ready for owner approval and identify any mandatory corrections. All three remain NOT APPROVED until the independent review and owner decision.
