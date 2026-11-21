# Fifth Civilian Batch — Internal QA Log

**Scope:** Welder #15, Kid #16 and Kid 2 #17  
**Branch:** `npc-granny-baseline-overhaul`  
**Current branch HEAD:** `6531181acb141e33fb48bde12d773c96fba4cff8`  
**Disposition:** **Internal design QA PASS. Owner silhouette/construction approval PENDING.** Not Claude-reviewed and not owner-approved.

## Exact-source evidence

### Run #22 — visually inspected artifact

- [GitHub Actions Run #22](https://github.com/tinytime/Tinytime.github.io/actions/runs/44849832232)
- [Artifact 14684738023](https://github.com/tinytime/Tinytime.github.io/actions/runs/44849832232/artifacts/14684738023)
- Tested artwork commit: `e3611fd918ca0b800a1d79616bd39357826f84b8`
- Silhouette blob: `5892e66018fed61ceb02c3b222738d14870ce524`
- Face/head blob: `e3b5b58dbf8225f23453c8b097ef4c61343e4cd9`
- Design-card blob at the time: `7fef03ede5be76f08829ab57c0d740b5a377c300`
- Evidence-builder blob: `98505716c117285dc7ef31c38adcac987931464b`

### Run #23 — current-branch exact-source recheck

- [GitHub Actions Run #23](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850175415)
- [Artifact 14684907505](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850175415/artifacts/14684907505)
- Tested branch commit: `dbcb701235b6af8056b3572c65f712ed8c7a92b5`
- Silhouette and face/head blobs are identical to Run #22.
- All 66 non-manifest artifact files match Run #22 byte-for-byte; only the manifest's tested commit field differs.
- Later documentation-only edits do not change the two rendered art-source blobs. Current design-card blob: `577af346658dd70fa99afe2825919fea4f64663b`; current roster-comparison document blob: `c92fadb679f35ec343f9e929c9826d04d433f28b`.

## Captures and structural diagnostics

The evidence package contains 12 native 64×96 directional silhouettes, 12 independently rendered direct 28×42 captures (not resized from native), 12 enlarged 4× diagnostics, the full silhouette sheet, the face/head sheet, three matched four-direction prop-on roster sheets against the 15 existing designed civilians, six grayscale 40×38 face-reference rows, and JSON manifests/connectivity diagnostics.

All 24 native/direct silhouette views report exactly one connected black component and zero contact with any frame edge. This is diagnostic evidence, not an artistic quality score. Manual inspection covered all 12 native views, all 12 direct 28×42 views, all 12 enlarged 4× views, all three roster comparison sheets and the six-row face-reference sheet.

## Character-by-character findings

### Welder #15
- Raised visor, exposed focused face, narrow split apron and rear gas rig form a distinct industrial-worker read against Fisher, Painter and Sailor.
- The near-side glove and torch handle are connected; front/rear views show the clipped hose route and both profiles hide the route behind the torso. The torch is visible in the left profile and intentionally hidden in the right profile.
- The rear cylinder remains harness-supported and connected. Owner review should confirm it reads as a cylinder rather than a compact pack at direct game scale.

### Kid #16
- Forward-sprung hooded shell and open stride differ from Kid 2 and the adult roster.
- The glider is held by the near-side hand in front and left profile; it is intentionally hidden in the right-facing profile as a far-side prop. Back-view visibility is a narrow forward-held edge, not a second accessory.
- Hood opening and glider-leading pose remain readable at direct 28×42.

### Kid 2 #17
- Pom beanie, high scarf frame, longer split coat and compact inward posture distinguish the second youth.
- The book is supported by both hands in front; the near-side hand and fore-edge remain visible in profile, while the book is hidden from the back. Rear headwear/nape is connected to the scarf collar.
- Book/hand contact remains legible at native and direct scales; small page lines are intentionally allowed to disappear.

## Roster and face comparison limitations

- The three roster sheets compare **prop-on** silhouettes against Runner, Coach, Referee, Courier, Guard, Vendor, Cook, Clinic, Tech, Hacker, Fisher, Sailor, Slicker, Painter and Usher, each in four directions.
- A separate body-only matched roster sheet has not been produced. The prop-on sheets are not body-only proof; the cards also describe the underlying shell/pose distinctions. Owner may request a body-only comparison before final approval.
- The six-row grayscale face-reference sheet shows two current-renderer candidates per character. Some legacy hair/headwear edge pixels remain contextual in those crops; the written geometry comparisons exclude hair, headwear, helmet and palette.
- Granny Volt is reviewed separately through her dedicated 100×140 renderer as the craftsmanship benchmark, not as a silhouette or construction template.

## Approval and scope boundaries

- All three current vector-family assignments remain **UNASSIGNED**.
- The provisional full-colour SVG in the repository is held, uncaptured, unapproved and out of scope; the evidence manifest records `colourRenderCaptured:false` and `paletteApproved:false`.
- No production renderer, `npc_sprites.js`, town/gallery, golden snapshot or snapshot-provenance changes were made.
- No Mouse #18 or later roster work was started.
- No Claude review or owner approval is claimed.

**Next action:** submit the three concepts together to the owner for silhouette/construction review, explicitly flagging the body-only comparison limitation and Welder cylinder-read question. Do not begin palette or production renderer work until the owner approves the design direction.
