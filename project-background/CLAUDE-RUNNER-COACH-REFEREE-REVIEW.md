# Claude Independent Comparative Review — Runner, Coach, Referee

**Review date:** 2026-11-19  
**Project:** Vapor City civilian vector overhaul  
**Repository:** https://github.com/tinytime/Tinytime.github.io  
**Branch:** `npc-granny-baseline-overhaul`  
**Requested reviewer:** Claude (independent reviewer)  
**Final approval authority:** Project owner  
**Builder:** ChatGPT  
**Status:** READY FOR CLAUDE REVIEW — NONE OF THE THREE CHARACTERS IS APPROVED

**Focused GitHub review package:** [Runner / Coach / Referee — run #429](qa-artifacts/runner-coach-referee-run-429/README.md). Download the exact run #429 artifact from its Actions page; the focused package index lists the required PNG paths.

## Primary evidence (use this combined run)

- **Latest tested renderer/source commit:** [`f78627caf53b15cfe1bee0f30feea39d68da7c35`](https://github.com/tinytime/Tinytime.github.io/commit/f78627caf53b15cfe1bee0f30feea39d68da7c35)
- **Browser QA run #429:** [GitHub Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44562696912)
- **Job:** `135695989340`
- **Artifact:** `vapor-city-browser-qa`, ID `14548434248` (download from the run's Artifacts section)
- **Report sourceCommitSha:** `f78627caf53b15cfe1bee0f30feea39d68da7c35`
- Current branch head at package preparation: `ac0d6a5b085aa6c4f35f5d7936be0d776e37f63a`. It is three documentation-only commits ahead of the tested renderer source; compare confirms no renderer/game/QA source changes after the tested SHA.

The artifact is the primary evidence. It includes all three characters' four native 64×96 directional PNGs, role-debug, full gallery, Granny comparison, town screenshot and report. Do not base approval on source code alone.

## Required files in artifact 14548434248

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

## Internal QA summary

The combined run #429 artifact was downloaded and the 12 directional PNGs, role-debug sheet and full gallery were visually inspected.

- Syntax checks and NPC renderer module load: pass.
- NPC inventory: pass (135 NPCs, 24 civilian archetype mappings).
- Vector palette audit: pass (six vector civilians; Runner 1,083 unique colors, Coach 1,072, Referee 1,078).
- Role-debug: 12/12.
- Directional visual integrity: 92/92, zero edge contacts, zero detached large components.
- Prop audit: pass.
- Separate archetype silhouette-quality audit: 180/180 pairs pass.
- Gallery: pass.
- Town scene regression: pass (16 NPCs, Granny present).
- Page errors: 0. Script errors: 0.

### Important global workflow failures (not to be misreported as character-specific)

The overall GitHub Actions workflow concluded **failure** because:
1. The full civilian-type silhouette audit flags Clinic/Sailor front IoU 0.909429 (>0.90). Other closest pairs include Coach/Courier back 0.890479, Sailor/Welder back 0.889290, Clinic/Sailor back 0.884215, Clinic/Welder back 0.871764 and Cook/Courier back 0.863465.
2. Golden snapshots are explicitly unapproved: 23 changed, 1 match. No snapshots were refreshed or approved.
3. 180 missing-audio resource 404 console errors were logged.

The separate silhouette-quality audit passes; do not conflate these two audits. No page or script errors were reported. The global silhouette gate and snapshot provenance gate are not proof of a Runner, Coach or Referee defect.

### Town-context limitation

The standard town screenshot is the 16-NPC street roster with Granny present. It does not explicitly spawn Coach or Referee. Treat this as town-scene regression evidence, not proof of character-specific live-town readability for those two characters. The 28×42 game-scale directional captures remain available for readability assessment.

## Review criteria

Please inspect all four directions and the comparative context, then provide for each character:

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
- Confirm side-profile faces read clearly.
- Confirm hair silhouette remains coherent in front, back and both profiles.
- Confirm bib 07 orientation and legibility in front and side views.
- Confirm the pale floating dash beneath the feet is gone.
- Judge whether the orange trouser accents read as intentional athletic detailing rather than tears.
- Judge leg separation and stopwatch visibility across directions.

**Coach**
- Confirm rear silver-templed hair beneath the cap reads as intentional hair.
- Confirm clipboard is a separate board/paper/clip construction and hand-connected in both profiles.
- Judge whether the enlarged whistle pendant reads clearly as a whistle at native 64×96 / 28×42 game scale, rather than an abstract chest ornament.
- Confirm the cream shoulder yoke remains a coherent garment panel in profiles.

**Referee**
- Confirm card handedness is anatomically consistent across front/back/profiles.
- Confirm the hand visibly supports the card.
- Confirm rear hair beneath the sweatband reads intentionally.
- Confirm side torso/profile construction reads as a side view.
- Judge yellow-card readability at native and game scale.

## Required final verdict

Please state:
- Individual scores and recommendations for Runner, Coach and Referee.
- Whether the three-character batch is collectively ready for owner approval.
- Any mandatory corrections before approval.
- Any optional polish that should not block approval.
- Whether the Granny comparison demonstrates comparable finish without copying Granny's design.

Do not approve based on code inspection or automated metrics alone. The project owner makes the final decision. Until Claude's review is received and the owner explicitly accepts the batch, all three remain **NOT APPROVED** and the remaining roster remains on hold.

## Earlier review history

The previous Claude review identified required corrections for this batch: Runner profile faces / floating foot dash / consistent curls; Coach rear hair / profile clipboard and hand connection / profile yoke; Referee card handedness / rear hair. Those corrections were implemented and internally rechecked. Coach received an additional final polish pass for the whistle and profile clipboard, and the combined run #429 artifact contains that latest version.
