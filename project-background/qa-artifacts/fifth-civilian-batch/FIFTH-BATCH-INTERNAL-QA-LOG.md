# Fifth Civilian Batch — Internal QA Log

**Scope:** Welder #15, Kid #16 and Kid 2 #17  
**Branch:** `npc-granny-baseline-overhaul`  
**Disposition:** **Internal design QA PASS. Owner silhouette/construction approval PENDING.** Not Claude-reviewed and not owner-approved.

## Exact-source visual evidence

### Run #24 — artwork checkpoint

- [Fifth Civilian Batch Design Evidence Run #24](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850251480)
- [Artifact 14684123957](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850251480/artifacts/14684123957)
- Tested artwork commit: `4864fc565c2e08e662394c2ea406c37a119d2d59`
- Silhouette blob: `5892e66018fed61ceb02c3b222738d14870ce524`
- Face/head blob at Run #24: `e3b5b58dbf8225f23453c8b097ef4c61343e4cd9`

### Run #28 — documentation-commit recheck

- [Fifth Civilian Batch Design Evidence Run #28](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850511145)
- [Artifact 14684109418](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850511145/artifacts/14684109418)
- Tested documentation commit: `fab33607dfa25922b8b93158ae48b9319153fa5c`
- Both SVG source blobs are identical to Run #24.
- All 66 non-manifest artifact files match Run #24 byte-for-byte; only the manifest's tested commit field differs.



### Run #31 — current face-study source and evidence recheck

- [Fifth Civilian Batch Design Evidence Run #31](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850966072)
- [Artifact 14684849806](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850966072/artifacts/14684849806)
- Tested commit: `83af4bfea94664bc57808146337636e4172f3076`.
- Silhouette blob remains `5892e66018fed61ceb02c3b222738d14870ce524`; face/head blob is now `a3335e74ff9d7e58b91080557da9d4c04ff3c070`; evidence-builder blob is `8ce86a60ff48bed909b7d565c37c786462540770`.
- The face-sheet footer was corrected to state that matched native-scale roster crops are present in the companion evidence. No face geometry or silhouette paths changed.
- Run conclusion: success. All 24 native/direct prop-on silhouette views again report one connected component and zero frame-edge contact. The capture includes 12 native, 12 independently rasterized direct 28×42 and 12 enlarged views, six face/head views and roster comparisons. Direct 28×42 outputs remain design-source projections, not in-game Tier A captures.

## Captures and structural diagnostics

The evidence package contains 12 native 64×96 directional silhouettes, 12 independently rendered direct 28×42 captures (not resized from native), 12 enlarged 4× diagnostics, the full silhouette sheet, the face/head sheet, three matched four-direction prop-on roster sheets against the 15 existing designed civilians, six grayscale 40×38 face-reference rows, and JSON manifests/connectivity diagnostics.

All 24 native/direct silhouette views report exactly one connected black component and zero contact with any frame edge. This is diagnostic evidence, not an artistic quality score. Run #24's actual images were visually inspected across all 12 native views, all 12 direct 28×42 views, all 12 enlarged 4× views, the three roster comparison sheets and the six-row face-reference sheet. Run #28 reproduced the same image files byte-for-byte.

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

## Separate full browser QA result

The broader [Vapor City Browser QA Run #952](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850511163) is **FAILED**, not because the focused Batch 5 evidence step failed. The Batch 5 projection step passed. The overall browser workflow failed at global audio-resource HTTP 404 diagnostics and the golden snapshot gate (**1 match / 23 changed**); `pageErrors` and `scriptErrors` were empty. This is a separate shared-workflow result. No golden snapshots or provenance were changed, and none should be refreshed or approved without explicit owner authorization.



### Run #952 — full browser QA, separate project-wide gate

- [Vapor City Browser QA Run #952](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850511163)
- [Artifact 14685201429](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850511163/artifacts/14685201429)
- Tested commit: `fab33607dfa25922b8b93158ae48b9319153fa5c`.
- Batch 5 design evidence and the review-sheet build succeeded. Global browser diagnostics failed: 1 of 24 golden snapshots matched and 23 differed; the baseline approval record is explicitly `unapproved`. The report also records multiple audio-resource HTTP 404s and no JavaScript errors.
- No golden snapshots or provenance were modified. This global gate is separate from Batch 5 design-source QA and must not be bypassed or refreshed without explicit owner authorization.



### Run #955 — latest full browser QA, separate project-wide gate

- [Vapor City Browser QA Run #955](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850966073)
- [Artifact 14684564044](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850966073/artifacts/14684564044)
- Tested current commit: `83af4bfea94664bc57808146337636e4172f3076`.
- Batch 5 design projections, other capture steps and the review-sheet build succeeded. Game browser diagnostics failed: 1 of 24 golden snapshots matched and 23 differed against the explicitly unapproved baseline. The report records 180 console errors, principally missing audio assets (HTTP 404); pageErrors and scriptErrors are empty.
- No golden snapshots or provenance were changed. This global failure is separate from the focused Batch 5 design-evidence pass; do not refresh or approve the baseline without explicit owner authorization.

## Approval and scope boundaries

- All three current vector-family assignments remain **UNASSIGNED**.
- The provisional full-colour SVG in the repository is held, uncaptured, unapproved and out of scope; the evidence manifest records `colourRenderCaptured:false` and `paletteApproved:false`.
- No production renderer, `npc_sprites.js`, town/gallery, golden snapshot or snapshot-provenance changes were made by this Batch 5 design work.
- No Mouse #18 or later roster work was started.
- No Claude review or owner approval is claimed.

**Next action:** submit the three concepts together to the owner for silhouette/construction review, explicitly flagging the body-only comparison limitation and Welder cylinder-read question. Do not begin palette or production renderer work until the owner approves the design direction.
