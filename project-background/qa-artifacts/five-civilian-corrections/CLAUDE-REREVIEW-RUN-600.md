# Claude Independent Re-review — Five Civilians, Run #600

**Date:** 2026-11-20  
**Batch verdict:** Ready with disclosed minor issues. No P0/P1 defects reported. Not approved; owner decides.  
**Construction standard verdict:** Retain with revisions. Not ratified.  
**Evidence:** Run #600 artifact `14591690387`, renderer source `3d1ec4bcbac231e99e75d36f21e79a5fcf7fd4eb`. Run #599 and #600 renders were byte-identical.

## Evidence inspected and limits

Claude reports inspecting all 20 native 64×96 and 20 direct 28×42 captures; native, game-scale and black-silhouette sheets; town-ground composite; Coach/Courier rear comparison; Cook prop-contact sheets; Usher readability sheet; role-debug sheet; Run #595-to-#600 pixel diffs; report and measurement JSON; the current Version 2.1 standard; identity cards; internal QA notes; and art-direction document 02.

Not verified: QA handoff doc 04 and tracker in detail; walk frames (none supplied); live named-character spawning from the town-ground composite; semantic anatomy from alpha-derived silhouettes; or measurements from the identity cards. The black silhouette sheet is alpha-derived, not an anatomical mask.

Pixel-diff discrepancy: internal QA reports 120 changed pixels for Usher front. Claude reports 61 using summed RGB difference greater than 12. Both are locators, not quality scores. Future reports must state the diff method and threshold.

## Character scorecard (reviewer opinion, non-gating)

| Character | Score /10 | Strongest | Weakest | Main note |
|---|---:|---|---|---|
| Usher | 6.0 | Front | Profiles | Three open P2s |
| Cook | 7.0 | Front | Profiles/pan | Face improved; profile handle/contact remains |
| Courier | 6.5 | Front/side | Back | Strong prop integration |
| Coach | 6.0 | Front | Back | Rear distinction accepted |
| Referee | 7.5 | Front/side | Back | Strongest; unchanged |

These scores are qualitative reviewer comparisons to Granny's craft, not an approved scale or automated metric.

## Findings

### Objective P2

- **C1 — Cook, left/right, native and direct 28×42:** no visible handle shaft between the hand and pan in either profile; hand and pan merge into a 4–5 px smudge at game scale. Reviewer proposes a 3–4 native-pixel handle with the hand over its end. Front brown bar reads as a foreshortened handle.
- **U4 — Usher, left/right, native:** clipboard hangs at chest front; a small hand appears beneath it while a separate near arm hangs at the side, creating two visible hands and an unclear forearm-to-clipboard chain. Reviewer proposes carrying clipboard on near arm or hiding far hand.
- **U2 — Usher, all directions, black silhouette sheet:** front/back read as a generic column apart from cap and bob; profile is a thin sliver. Reviewer proposes a silhouette-level feature.

### Standard finding

- **F3 — all five faces at direct 28×42:** interior features collapse under cap shadow. Reviewer recommends native-scale face-construction cues plus a game-scale head-read cue rather than requiring interior details to survive.

### P3 / preference

- **U5:** Usher front hand beside belt buckle is ambiguous but plausible occlusion.
- **C2:** Cook rear hands at hips.
- **K1:** pale arc behind Coach's ear.
- **S1:** rim fringe.
- **S2:** mirrored near-side prop convention.
- **R1:** Referee plain back.

## Accepted exception

**Coach/Courier rear:** acceptable shared body mass with distinct role construction, marginally. Distinctions visible at both scales: Coach straight hem and elbow/hand negative spaces; Courier A-line coat and arms integrated into coat; distinct head construction, footwear values, and Courier strap/satchel. Reported IoU remains a review diagnostic, not a verdict. Preserve the rationale; no torso redesign requested.

## Version 2.1 audit and required revisions

1. Keep 0.85 IoU as a human review trigger only. Declare mask basis, alpha threshold, prop inclusion/exclusion, direction and scale. Re-review a pair when its renders change.
2. Replace the face "one cue survives at 28×42" clause with two named face-construction cues at native scale and one visible head-read cue at 28×42.
3. Keep fixed neutral-grey and town/night backgrounds; record their exact configurations.
4. Require a minimum two-frame-per-direction walk sheet for animated characters. Run #600 lacks it.
5. Keep correction diffs, but always state exact-diff or thresholded method and threshold.
6. Create a roster shell-family table before remaining civilians are built; no arbitrary numeric cap.
7. Add a handedness/character-relative prop-side table.
8. Keep the 100-point scorecard provisional and non-gating; avoid an undefined /10 scale.
9. Fix §4.3 to request an intended build descriptor, not numeric head/body and shoulder/body targets.
10. Fix stale "remaining 20" references to "remaining 17".
11. Remove reviewer outcomes from the normative standard; preserve them in this QA log.
12. Keep semantic annotation/calibration suspended until a design decision needs it; retain visible-silhouette diagnostics and human-annotated landmarks marked inferred when occluded.
13. Add a package completeness manifest, accepted-exception register, must-survive list, and handedness table.

## Calibration observations (reviewer-computed; not harness-verified)

- Coach/Courier front IoU: approximately 0.85 native, 0.873 at 28×42.
- Coach/Courier rear IoU: approximately 0.885 native, 0.894 at 28×42.
- Cook/Courier rear IoU: approximately 0.859 native, 0.891 at 28×42.
- Candidate proportions are source-annotated, not measured; measuredCount remains 0. Reported bands are not validated and are not acceptance targets.
- Minimum evidence proposed before ratifying numeric calibration: 8–10 varied characters across at least 3 pose classes with pixel-verified body polygons; two annotators with IoU agreement ≥0.95; at least 20 flagged pair outcomes; two reviewers blind-scoring the same five and agreeing on rank order.

## Owner dispositions required

No owner approval is inferred from this review. U4 and U2 are new findings and need explicit owner disposition before renderer edits. C1 should be reconciled against the current owner-authorized scope and prior dispositions before editing; do not treat Claude's recommendation as automatic authorization. Coach/Courier rear is accepted as documented. All five remain NOT APPROVED pending owner decision and approval.
