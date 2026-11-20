# Tech (#9) renderer review package

**Review status:** internal QA and visual inspection complete; ready for independent Claude review; owner rendered-art approval pending.  
**Latest QA run:** [GitHub Actions #643](https://github.com/tinytime/Tinytime.github.io/actions/runs/44745345901)  
**Tested source:** `4c3f87ad7be831b83b9f5502911abee2602a3ea5`  
**Artifact:** [14633745010](https://github.com/tinytime/Tinytime.github.io/actions/runs/44745345901/artifacts/14633745010)  
**Branch:** `npc-granny-baseline-overhaul`

## Source under review

- Renderer: `npc_sprites.js` — dedicated `drawTechVector`, wired to `tech`.
- Latest renderer correction: `9f11ca20a3bdaf3ca8e5bd1ace3f6043d394327e` (differentiate Tech profile shell and reinforce meter grip).
- Latest evidence-only correction: `4c3f87ad7be831b83b9f5502911abee2602a3ea5` (native 1× close-up crop of explicitly spawned Tech in town).
- QA harness: `qa/vapor-city-browser-qa.mjs`.
- Role legend: `adacc1f8d8dac3c832cd947a71fd5ab8fd055496`.
- Tech role-debug and town-spawn evidence: `c3ab02e929dc479850046d081e678d3cf585d85f`.
- Silhouette source: `project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg`.

## Artifact evidence to review

Run #643 artifact `14633745010` contains:

- `tech-native-64x96/tech-d.png`, `tech-u.png`, `tech-l.png`, `tech-r.png`.
- `tech-direct-game-scale-28x42/tech-d.png`, `tech-u.png`, `tech-l.png`, `tech-r.png` — direct renderer output, not resized.
- Matching neutral-grey variants at both scales.
- `tech-role-debug-four-directions-8x.png` — four directions and seven semantic role labels.
- Clinic comparison captures under `approved-next-batch-native-64x96/` and `approved-next-batch-game-scale-28x42/`.
- `game-town-tech-spawn-closeup-1x.png` — 120×120 crop from the actual town scene at native 1× in-world scale, in addition to the full-map capture.
- `report.json` — exact source SHA, capture audits, browser diagnostics, and snapshot report.

## Run #643 automated QA

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
- Silhouette similarity triggers remain human-review prompts, not automatic failures. Clinic/Tech full-character IoU: back 0.9154, front 0.8922, right 0.8562.

**Overall GitHub Actions: FAILED** at browser diagnostics. The artifact and all evidence builders uploaded successfully. The two recorded global blockers are the unapproved golden snapshot baseline (1 match / 23 changed; no missing; 24 expected) and 180 existing audio/resource HTTP 404 console errors across 46 URL entries. No golden snapshots or provenance were refreshed, approved, or changed.

## ChatGPT visual inspection — Run #643

Inspected the actual four-direction Tech native and direct game-scale captures, side-by-side Clinic captures at both scales, the Tech role-debug sheet, and the native 1× town close-up.

- Front/back/left/right are coherent with the approved round-05 construction.
- Profile eye/brow cues are visible in both directions at direct 28×42 scale and are not obscured by the ear-protection cup.
- Left-profile diagnostic meter and hand contact are discernible at both scales; the fuller hand contour reads as a grip without overwhelming the tool.
- The asymmetric petrol field shell, crossing harness, ear cup and rear service-pack construction differentiate Tech from Clinic's pale medical coat, diagonal trim and side medical kit in the direct comparison.
- Role-debug labels and legend are separated and legible.
- The town close-up confirms the explicitly spawned Tech is visibly rendered in the live street scene; it is a native 1× crop, not an enlarged sprite sheet.
- No clipping or edge contact was observed. Automated visual-integrity checks report no detached large components.

## Focus of independent review

1. At direct 28×42 scale, are the profile eye/brow cues clearly readable and unobscured?
2. Does Tech's asymmetric field shell, crossing harness and rear service pack distinguish its silhouette from Clinic?
3. Does the left-profile meter read as held, with clear hand-to-tool contact at both scales?
4. Are all four directions coherent with the approved round-05 concept?
5. Any clipping, detached geometry, implausible anatomy, direction/handedness issues, or game-scale readability regressions?

Treat IoU/similarity diagnostics as human-review prompts, not automatic failures. Do not change or approve golden snapshots. Do not begin Hacker or Fisher until Tech has cleared independent review and the project owner approves the rendered direction.

## Current disposition

**Built:** dedicated Tech vector renderer implemented.  
**Automated QA:** Tech targeted captures and associated checks pass in Run #643.  
**Visually inspected:** all four directions at native and direct game scales, Clinic comparison, role-debug, and actual town close-up.  
**Independent Claude review:** not yet recorded; package is ready for handoff.  
**Project-owner rendered-art approval:** pending.  
**Hacker and Fisher:** remain on hold.
