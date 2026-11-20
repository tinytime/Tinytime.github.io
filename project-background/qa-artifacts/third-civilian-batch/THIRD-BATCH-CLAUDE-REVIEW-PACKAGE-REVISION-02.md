# Third civilian batch — independent Claude review package (revision 02)

**Characters:** Tech (#9), Hacker (#10), Fisher (#11)  
**Prepared:** 2026-11-20  
**Branch:** `npc-granny-baseline-overhaul`  
**Package source baseline:** `c7443ff3ff7cc4d2a646f2112bc3e745a9b88c7c`  
**Purpose:** re-review the three characters after implementing every finding from Claude's first verdict.

## Review stages and verdicts being re-evaluated

| Character | Prior verdict | Evidence stage | Current requested verdict |
|---|---|---|---|
| Tech (#9) | PASS WITH NON-BLOCKING NOTES; P1 Tech/Clinic separation to fix before approval | Production game renderer | Re-evaluate whether the darker desaturated petrol shell and squared storm-flap shoulder resolve the 28×42 back-view similarity and distinguish the four directions from Clinic |
| Hacker (#10) | CHANGES REQUIRED; P1 front torso slab/merged arm and left-profile slab/head cues | Finished design-stage vector art only | Re-evaluate narrowed front chest, visible separated bare forearm, tapered left-profile drape, visible temple notch and single earbud |
| Fisher (#11) | PASS WITH NON-BLOCKING NOTES; right hip detail, rear cape-like slab and unexplained bar | Finished design-stage vector art only | Re-evaluate garment-integrated right-profile pouch, ochre rear smock/yoke and removed inter-leg bar |

Granny Volt is the approved 10/10 craft benchmark for finish, clarity, personality and directional consistency—not a construction template. Preserve each character's original identity.

## Exact evidence under review

### Tech (#9) — production renderer

- Renderer source and tested commit: `cea601503504c6b23527452a66cc64c3cb93e7a7`.
- Renderer file: `npc_sprites.js`, dedicated `drawTechVector`.
- [Browser QA Run #648](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957)
- [Run #648 artifact 14635417540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957/artifacts/14635417540)
- Target captures: `tech-native-64x96/` and `tech-direct-game-scale-28x42/`.
- Clinic comparison: `approved-next-batch-native-64x96/` and `approved-next-batch-game-scale-28x42/`.
- Role debug: `tech-role-debug-four-directions-8x.png`.
- Live town spawn and native 1× crop: `game-town-tech-spawn-1x.png`, `game-town-tech-spawn-closeup-1x.png`.
- Report: `report.json`.

**Implemented correction:** shell gradient shifted to darker, desaturated petrol; squared storm-flap shoulder outline added to front/back and profile constructions. Clinic renderer/art was not changed.

**Targeted QA:** Tech native 64×96 4/4; direct game-renderer 28×42 4/4; zero edge contacts at both scales; Tech role-debug 4/4; explicit `techgirl` street spawn and native 1× close-up present. Wider directional/visual integrity 92/92; face uniqueness 23/23; prop audit, gallery and Granny directional checks pass; page errors 0 and script errors 0. ChatGPT inspected all four directions at both scales, the Tech/Clinic 28×42 comparison and the actual town close-up.

**Workflow disposition:** overall Browser QA concluded FAILED on the existing unapproved golden-snapshot baseline (1 match / 23 changed) and existing audio/resource diagnostics (180 HTTP 404 console errors). No snapshots or provenance were changed. These global gates are not Tech-specific art failures.

Please focus on the previous P1: does the back view at direct 28×42 now read as a distinct field-shell silhouette rather than a Clinic palette swap? Also inspect the front, both profiles, role cues, meter contact and town-context appearance. Similarity/IoU is a human-review prompt, not an automatic gate.

### Hacker (#10) and Fisher (#11) — finished design-stage artwork

- Finished source: [HACKER-FISHER-FINISHED-DESIGN-STUDY.svg](HACKER-FISHER-FINISHED-DESIGN-STUDY.svg).
- Approved silhouette basis: [TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg](TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg).
- [Playwright design render Run #9](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697)
- [Run #9 artifact 14636805512](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697/artifacts/14636805512)
- Exact finished SVG SHA-256 from render report: `5e20a05a445b4684c3a212bf6e55fd61b3abb230c557e5d7ab85842a6ab03a52`.
- Report: `HACKER-FISHER-DESIGN-RENDER-REPORT.json`.

Run #9 completed successfully. The artifact contains the 1× and 3× full design sheets, eight native 64×96 captures, eight direct 28×42 design projections and eight 4× nearest-neighbour enlargements. All eight directional views are represented at both scales. **These are design-source projections, not production game-renderer captures.** Do not infer game integration, town spawn, gallery or renderer QA for Hacker/Fisher.

**Hacker corrections implemented:**
- Front chest narrowed by approximately one-third relative to the previous slab construction.
- Character-left bare forearm separated visibly from the lilac shell.
- Left-profile drape panel tapered and given a stronger seam/edge break.
- Left-profile temple notch and single earbud made explicit; fringe/head construction remains asymmetrical.
- One compact slate and its existing hand contact retained; correct near/far visibility unchanged.

**Fisher corrections implemented:**
- Right-profile hip pouch changed to smock ochre with seam detail instead of a hard black plate.
- Rear yoke/smock mass changed from black/cream cape-like slab to weathered ochre with a darker flap seam.
- Unexplained grey vertical bar between the legs removed.
- Hood/brow lip, broad grounded silhouette, bib closure, boots and basket handedness retained.

ChatGPT inspected the actual Run #9 full sheet. The corrected front forearm/chest separation and tapered left-profile drape/head cues are visible; Fisher's rear construction and right-profile pouch read as garment details rather than the former detached accessories. Please inspect the individual captures and scale evidence and re-evaluate each prior finding.

## Cross-character checks

1. Tech vs Clinic: confirm role separation at direct 28×42, especially back view, without changing Clinic.
2. Hacker vs Vendor/Referee: confirm the narrowed front and folded-in profile no longer create the prior torso-mass collision.
3. Fisher vs Guard/Cook: confirm the broad grounded smock remains distinctive.
4. Check all four directions for continuity, clipping, prop handedness, occlusion, grip/contact and face/head cues.
5. Compare finish and personality against Granny Volt's craft standard without copying her design.

## Requested Claude response

Return a separate verdict for each character:
- **PASS**
- **PASS WITH NON-BLOCKING NOTES**
- **CHANGES REQUIRED**

For every remaining finding, specify severity, direction, scale, exact visible defect and smallest effective correction. Separate P0/P1 blockers from P2/P3 polish. State explicitly whether each previous finding is resolved.

Also provide one batch-level recommendation. Distinguish Tech's production-renderer evidence from Hacker/Fisher's design-stage-only evidence. Do not treat global snapshot/audio QA gates as character-specific art findings. Do not approve golden snapshots or infer owner approval.

## Current gates

- ChatGPT implementation: correction pass committed; Tech targeted QA passed; H/F design render passed and actual output visually inspected.
- Claude independent re-review: pending.
- Owner acceptance: pending for Tech rendered output and Hacker/Fisher finished design artwork.
- Hacker/Fisher production renderer implementation remains held until Tech independent review and owner rendered-art approval, and owner acceptance of their finished designs.
- No golden snapshots or snapshot provenance changed.
