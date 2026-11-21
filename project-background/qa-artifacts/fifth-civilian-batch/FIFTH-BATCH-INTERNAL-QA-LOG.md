# Fifth Civilian Batch — Internal QA Log

**Scope:** Welder #15, Kid #16 and Kid 2 #17  
**Branch:** `npc-granny-baseline-overhaul`  
**Disposition:** **Internal design QA PASS. Owner silhouette/construction approval PENDING.** Not Claude-reviewed and not owner-approved.

## Current exact-source evidence

- **Latest verified source commit:** `47a7b0c08f764695472fa0728b70bb79816c77b1` (current art source; subsequent documentation-only commits do not change these blobs).
- **Latest focused evidence:** [Fifth Civilian Batch Design Evidence Run #35](https://github.com/tinytime/Tinytime.github.io/actions/runs/44851212540), artifact [14685376816](https://github.com/tinytime/Tinytime.github.io/actions/runs/44851212540/artifacts/14685376816).
- **Silhouette blob:** `5892e66018fed61ceb02c3b222738d14870ce524`.
- **Corrected face/head blob:** `bbed7692680234c30591ea3a03d170c22d87a12f`.
- **Run #32** ([artifact 14685396683](https://github.com/tinytime/Tinytime.github.io/actions/runs/44851094495/artifacts/14685396683)) captured the corrected footer; **Run #33** re-ran the same two source blobs. All 66 non-manifest files in the Run #32 and Run #33 artifacts match byte-for-byte.
- **Run #31** exposed clipping in the face-study footer; that text was shortened, then verified in Runs #32 and #33.



### Run #35 — exact current-source recheck

- Tested commit: `47a7b0c08f764695472fa0728b70bb79816c77b1`.
- Current source blobs: silhouette `5892e66018fed61ceb02c3b222738d14870ce524`; face/head `bbed7692680234c30591ea3a03d170c22d87a12f`; evidence builder `d62c849080b2d45f425cb2214c2be4c1a3d74063`.
- [Run #35](https://github.com/tinytime/Tinytime.github.io/actions/runs/44851212540), [artifact 14685376816](https://github.com/tinytime/Tinytime.github.io/actions/runs/44851212540/artifacts/14685376816), completed successfully. All 24 native/direct prop-on silhouette projections report one connected component and zero edge contact. I visually inspected the native/direct sheets, enlarged views and matched face comparisons; the updated Kid expression reads more curious, and the sheet labels remain separated.
- The builder still does not produce a separate body-only raster set or body-only matched-roster sheet. Body-only construction distinctions are described in the cards; the owner may request separate body-only evidence before approval.
- Direct 28×42 images are independently rasterized from the design SVG, not in-game Tier A renderer captures.

## Captures and structural diagnostics

The evidence package contains 12 native 64×96 directional silhouettes, 12 independently rendered direct 28×42 captures (not resized from native), 12 enlarged 4× diagnostics, the full silhouette sheet, the face/head sheet, three matched four-direction prop-on roster sheets against the 15 existing designed civilians, six grayscale 40×38 face-reference rows, and JSON manifests/connectivity diagnostics.

All 24 native/direct silhouette views report exactly one connected black component and zero contact with any frame edge. This is diagnostic evidence, not an artistic quality score. Manual inspection covered all 12 native views, all 12 direct 28×42 views, all 12 enlarged 4× views, all three roster comparison sheets and the corrected face/head sheet.

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

The latest completed broad [Vapor City Browser QA Run #955](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850966073) is **FAILED**, separately from the focused design evidence. Batch 5 design projections and other capture steps passed, but the overall workflow failed at the global audio-resource HTTP 404 diagnostics and the golden snapshot gate (**1 match / 23 changed**); pageErrors and scriptErrors were empty. No golden snapshots or provenance were changed. This global failure does not invalidate the focused Batch 5 design-evidence pass; do not refresh or approve the baseline without explicit owner authorization.

## Approval and scope boundaries

- All three current vector-family assignments remain **UNASSIGNED**.
- The provisional full-colour SVG in the repository is held, uncaptured, unapproved and out of scope; the evidence manifest records `colourRenderCaptured:false` and `paletteApproved:false`.
- No production renderer, `npc_sprites.js`, town/gallery, golden snapshot or snapshot-provenance changes were made by this Batch 5 design work.
- No Mouse #18 or later roster work was started.
- No Claude review or owner approval is claimed.

**Next action:** submit the three concepts together to the owner for silhouette/construction review, explicitly flagging the body-only comparison limitation and Welder cylinder-read question. Do not begin palette or production renderer work until the owner approves the design direction.
