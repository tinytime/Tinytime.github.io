# Runner / Coach / Referee — Internal Review Record

**Review date:** 2026-11-19  
**Branch:** `npc-granny-baseline-overhaul`  
**Latest renderer source reviewed:** `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495`  
**Branch head at documentation update:** `c1d35a6b29ec8687bf0c8f9f62d2c2b93acacc2c`

## Evidence reviewed

| Character | Browser run | Tested source | Artifact |
|---|---:|---|---:|
| Runner | #416 / 44548532467 | `6905171293c04f34f3ee09c804c490082e1f3d57` | `14540104692` |
| Coach | #420 / 44551256553 | `a9c29109e8f64a1009fd0b1df5ab560ff08fdbd8` | `14542916538` |
| Referee | #426 / 44557279748 | `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495` | `14545038850` |

The source-artifact downloads are retained in GitHub Actions for the runs above. This document records verified findings and is the review handoff; no local ZIP is required.

## Referee — latest renderer review

The Referee correction commit `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495` refines the dedicated `drawRefVector` path: consistent anatomical-left card arm across front/back/profiles, improved card/hand overlap, rear cropped hair beneath the sweatband, narrower side torso and profile hand details.

Actual artifact images inspected:
- Front, back, left and right at native 64×96.
- Nearest-neighbor enlarged four-direction sheet.
- Referee four-direction gallery column.
- Six-character role-debug sheet.
- Full NPC gallery.
- Town screenshot and `report.json`.

Visual findings:
- Handedness is consistent: front card appears viewer-right; rear card viewer-left; both profile views place it on the rear-facing side.
- Hand visibly overlaps the lower card edge.
- Rear hair is visible below the headwear.
- Profile torso is narrower than the front/back silhouette; profile face and opposite hanging hand remain visible.
- Yellow card and red mark remain recognizable at 28×42 game scale.
- No Referee-specific clipping or detached geometry found.

Targeted QA:
- Syntax/module and inventory checks passed.
- Palette: 1,078 unique antialiased colors, 2,192 opaque pixels, 93 exact ink pixels.
- Body/baseline: 35.4375px rendered vs 35px target; 0.4375px deviation; baseline delta 1; contrast ratio 4.70.
- Face distinctness: 23/23.
- Role-debug: 12/12 captures across six vector characters.
- Directional visual integrity: 92/92; zero edge contacts and zero detached large components.
- Prop audit, silhouette-quality audit (180/180 pairs below 0.85), gallery and town scene regression passed.
- No page or script errors.

**Evidence limitation:** the standard town screenshot is the regular street roster (16 NPCs) and does not explicitly spawn a Referee. It is valid scene-regression evidence, but not proof of Referee-specific live town readability. A dedicated in-world Referee capture remains outstanding if that is required for approval.

## Runner and Coach

The earlier targeted QA and visual reviews remain recorded in the tracker:
- Runner: run #416, artifact `14540104692`, all targeted character checks passed; four native directions and enlarged sheet, role-debug, gallery and town evidence inspected.
- Coach: run #420, artifact `14542916538`, palette/body/baseline/face, role-debug 10/10, 92/92 visual integrity, prop, silhouette-quality, gallery and town checks passed; four directions and enlarged views inspected.

Neither has been independently approved by Claude for this second group.

## Global workflow failures — separate from character findings

Run #426 is not a whole-workflow pass. The remaining failures are:
1. Global full-body silhouette audit: Clinic/Sailor front IoU 0.909429 exceeds the 0.90 limit.
2. Golden snapshots remain explicitly unapproved (23 changed, 1 match). Do not refresh, replace or approve them without explicit owner authorization.
3. 180 missing-audio resource 404 console errors.

These do not identify a Referee-specific defect. There were no page or JavaScript errors.

## Group verdict and next action

Runner, Coach and Referee have passed targeted internal QA. The latest Referee renderer correction has been visually inspected and the previously raised handedness, rear-hair, profile-torso and hand/card-contact issues are resolved in the current evidence.

**Status: BUILT — INTERNAL QA PASSED — NOT APPROVED.** Claude's comparative review against Granny Volt and the project owner's final acceptance are still required. Close the Referee live town/room capture gap if live town readability is part of the approval bar, then submit the three-character evidence set to Claude. Keep the remaining 20 civilian designs on hold until review and owner approval.
