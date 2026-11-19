# Referee Browser QA — Review Package

**Status:** Targeted Referee QA passed; overall workflow failed on unrelated/global gates. Referee is **not approved**.

## Source and provenance

- Repository branch: `npc-granny-baseline-overhaul`
- Tested source commit: [`4f0d135f0f14506a2c19df0f760d0fe2ec5a7495`](https://github.com/tinytime/Tinytime.github.io/commit/4f0d135f0f14506a2c19df0f760d0fe2ec5a7495)
- Browser QA workflow run: [#426](https://github.com/tinytime/Tinytime.github.io/actions/runs/44557279748)
- QA job: [135676647176](https://github.com/tinytime/Tinytime.github.io/actions/runs/44557279748/job/135676647176)
- Actions artifact ID: `14545038850` (download it from the run's **Artifacts** section)
- Artifact extracted for inspection as `refereeqa` during the QA pass.
- This index was added after the tested commit; it does not change or reinterpret the test result.

## Attachments in the run artifact

Download the workflow artifact above. The review images and supporting evidence are in that archive:

| Attachment | Purpose |
|---|---|
| `ref-directions-native-review.png` | Four Referee directions at native 64×96 |
| `ref-directions-4x-review.png` | Enlarged four-direction inspection |
| `ref-gallery-all-directions.png` | Referee's four-direction gallery presentation |
| `referee-game-scale-4dir.png` | Four-direction 28×42 game-scale legibility preview |
| `runner-coach-ref-cook-courier-usher-role-debug-8x.png` | Role-debug sheet |
| `npc-gallery-4x.png`, `npc-gallery-1x.png` | Full NPC gallery at enlarged and native scales |
| `game-town-1x.png`, `town-2x.png` | Town scene context |
| `game-menu-1x.png` | Menu / surrounding UI regression context |
| `report.json` | Machine-readable browser QA report |
| `game-main-check.js` | Browser QA harness/source captured with the artifact |

The artifact also contains the directional captures for all NPC types, snapshots, fan variants, and diagnostic images.

## Referee inspection notes

- Handedness is consistent across front, back, left, and right.
- Rear hair remains visible beneath the headwear.
- Profile torso shape is narrower than the front/back silhouette; the hand-to-card overlap reads as connected.
- Yellow card and red mark remain recognizable in the downscaled preview.
- No Referee-specific clipping or detached geometry was observed.
- Gallery shows all four directions.

**Town-scene limitation:** the standard town capture uses the street map and its 16-NPC roster does not explicitly include a Referee. The town screenshot therefore demonstrates general scene/regression context, not an in-world Referee card-readability proof. The 28×42 preview is derived from the Referee directional captures, not a live town spawn. QA should add or capture a Referee in-world before treating town-scene readability as proven.

## Workflow-wide failures (not a Referee-specific rejection)

- Global civilian silhouette audit: Clinic/Sailor front IoU = 0.909429, above the 0.90 threshold.
- Golden snapshot gate remains explicitly unapproved (23 changed, 1 match); no golden snapshots were refreshed or approved.
- Console reported 180 audio-resource 404s; page errors and script errors were 0.
- The separate silhouette-quality audit passed 180/180 comparisons.

## Reviewer checklist

1. Verify the artifact belongs to run #426 and the tested source SHA above.
2. Inspect native and enlarged front/back/left/right captures.
3. Check handedness, rear hair, profile torso, and hand/card attachment.
4. Confirm gallery and role-debug presentation.
5. Do not overstate the town screenshot: arrange an explicit Referee town/room capture if that criterion is required.
6. Keep Referee and the three-character batch unapproved until the required independent review and owner decision are complete.
