## Claude first-review correction — Run #648 (2026-11-20)

Claude's first verdict was PASS WITH NON-BLOCKING NOTES with a P1 Tech/Clinic separation finding (especially back at direct 28×42). ChatGPT implemented a darker, desaturated petrol shell and a squared storm-flap shoulder outline across front/back/profile, without changing Clinic. Current combined handoff: [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md](THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md).

- Tested renderer source: cea601503504c6b23527452a66cc64c3cb93e7a7.
- [Browser QA Run #648](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957), artifact [14635417540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957/artifacts/14635417540).
- Tech native 64×96 4/4; direct game-renderer 28×42 4/4; zero edge contacts at both scales; role-debug 4/4; explicit street spawn and native 1× close-up pass. Wider integrity 92/92, face uniqueness 23/23, prop audit/gallery/Granny checks pass, page/script errors 0.
- ChatGPT inspected actual four-direction direct 28×42 captures, Tech/Clinic game-scale comparison and live town close-up. The dark petrol, squared shoulder edge, X harness and rear service loop provide stronger role separation from Clinic. Independent Claude re-review and owner rendered-art acceptance remain pending.
- Overall Actions remains failed on unapproved snapshot baseline (1 match / 23 changed) and 180 existing audio/resource 404 console errors. No snapshots or provenance changed.

# Tech (#9) renderer review package

**Review status:** internal QA and visual inspection complete; ready for independent Claude review; owner rendered-art approval pending.  
**Latest QA run:** [GitHub Actions #644](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189)  
**Tested source:** `579f0fff61b8cfd4e416cc59381187b162d3b8ca`  
**Artifact:** [14634020084](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189/artifacts/14634020084)  
**Branch:** `npc-granny-baseline-overhaul`

## Source under review

- Renderer: `npc_sprites.js` — dedicated `drawTechVector`, wired to `tech`.
- Profile-shell and meter-grip correction: `9f11ca20a3bdaf3ca8e5bd1ace3f6043d394327e`.
- Rear-construction correction: `579f0fff61b8cfd4e416cc59381187b162d3b8ca` (replaces hip-level mass with high-mounted service loop and shorter split rear flap).
- QA close-up capture: `4c3f87ad7be831b83b9f5502911abee2602a3ea5` (native 1× crop of explicitly spawned Tech in town).
- QA harness: `qa/vapor-city-browser-qa.mjs`.
- Role legend: `adacc1f8d8dac3c832cd947a71fd5ab8fd055496`.
- Tech role-debug and town-spawn evidence: `c3ab02e929dc479850046d081e678d3cf585d85f`.
- Silhouette source: `project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg`.

## Artifact evidence to review

Run #644 artifact `14634020084` contains:

- `tech-native-64x96/tech-d.png`, `tech-u.png`, `tech-l.png`, `tech-r.png`.
- `tech-direct-game-scale-28x42/tech-d.png`, `tech-u.png`, `tech-l.png`, `tech-r.png` — direct renderer output, not resized.
- Matching neutral-grey variants at both scales.
- `tech-role-debug-four-directions-8x.png` — four directions and seven semantic role labels.
- Clinic comparison captures under `approved-next-batch-native-64x96/` and `approved-next-batch-game-scale-28x42/`.
- `game-town-tech-spawn-closeup-1x.png` — 120×120 crop from the actual town scene at native 1× in-world scale, in addition to the full-map capture.
- `report.json` — exact source SHA, capture audits, browser diagnostics, and snapshot report.

## Run #644 automated QA

- Source syntax and NPC sprite syntax: PASS; NPC sprite module loaded.
- NPC inventory: PASS (135 NPCs, 24 civilian entries).
- Tech native 64×96: 4/4; direct 28×42: 4/4.
- Tech opaque bounds: all four directions remain inside the frame; zero edge contacts at both scales.
- Tech role-debug: 4/4; seven semantic role labels.
- Explicit town spawn audit: PASS (`techgirl`, `civ:'tech'`, street map, position 21/22, down-facing); native 1× close-up capture generated.
- Global directional integrity: 92/92; visual integrity: 92/92; zero detached large components; profile face uniqueness 23/23.
- General role-debug: 12/12; prop audit: PASS; gallery visual pass: PASS; Granny directional visual check: PASS.
- Gallery opened and rendered without error.
- `pageErrors=[]`; `scriptErrors=[]`.
- Semantic civilian proportion/annotation validation: PASS.
- Silhouette similarity triggers remain human-review prompts, not automatic failures. Clinic/Tech full-character IoU: back 0.8775, front 0.8922, right 0.8562. The 0.85 threshold is a human-review trigger only.

**Overall GitHub Actions: FAILED** at browser diagnostics. The artifact and all evidence builders uploaded successfully. The two recorded global blockers are the unapproved golden snapshot baseline (1 match / 23 changed; no missing; 24 expected) and 180 existing audio/resource HTTP 404 console errors across 46 URL entries. No golden snapshots or provenance were refreshed, approved, or changed.

## ChatGPT visual inspection — Run #644

Inspected the actual four-direction Tech native and direct game-scale captures, side-by-side Clinic captures at both scales, the Tech role-debug sheet, and the native 1× town close-up.

- Front/back/left/right are coherent with the approved round-05 construction.
- Profile eye/brow cues are visible in both directions at direct 28×42 scale and are not obscured by the ear-protection cup.
- Left-profile diagnostic meter and hand contact are discernible at both scales; the fuller hand contour reads as a grip without overwhelming the tool.
- The asymmetric petrol field shell and crossing harness distinguish the side views; the rear now uses a compact high-mounted service/tool loop and shorter split flap rather than a hip-level pouch, separating it from Clinic's wrap tunic and medical kit.
- Role-debug labels and legend are separated and legible.
- The town close-up confirms the explicitly spawned Tech is visibly rendered in the live street scene; it is a native 1× crop, not an enlarged sprite sheet.
- No clipping or edge contact was observed. Automated visual-integrity checks report no detached large components.

## Focus of independent review

1. At direct 28×42 scale, are the profile eye/brow cues clearly readable and unobscured?
2. Does Tech's asymmetric field shell, crossing harness and rear service pack distinguish its silhouette from Clinic?
3. Does the left-profile meter read as held, with clear hand-to-tool contact at both scales?
4. Are all four directions coherent with the approved round-05 concept?
5. Any clipping, detached geometry, implausible anatomy, direction/handedness issues, or game-scale readability regressions?

Treat IoU/similarity diagnostics as human-review prompts, not automatic failures. Do not change or approve golden snapshots. Hacker and Fisher remain on hold until Tech has cleared independent review and the project owner approves the rendered direction.

## Current disposition

**Built:** dedicated Tech vector renderer implemented.  
**Automated QA:** Tech targeted captures and associated checks pass in Run #644.  
**Visually inspected:** all four directions at native and direct game scales, Clinic comparison, role-debug, and actual town close-up.  
**Independent Claude review:** not yet recorded; package is ready for handoff.  
**Project-owner rendered-art approval:** pending.  
**Hacker and Fisher:** remain on hold.
