# Guard / Vendor / Clinic Worker — Renderer QA and Claude Review Package

**Owner design approval:** 2026-11-19  
**Renderer source commit:** [28bf7d31938c3f7a574a3b9df48d2f73488a5d80](https://github.com/tinytime/Tinytime.github.io/commit/28bf7d31938c3f7a574a3b9df48d2f73488a5d80)
**QA harness commit:** [2bc8c39babf145878925adb3d78fd93d8a2296e3](https://github.com/tinytime/Tinytime.github.io/commit/2bc8c39babf145878925adb3d78fd93d8a2296e3)  
**Branch:** `npc-granny-baseline-overhaul`  
**Browser QA:** [Run #624](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670975455)  
**Artifact:** [Download the complete Run #624 evidence package](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670975455/artifacts/14600880214)

## Scope and status

The owner approved the Revision 02 designs for Guard, Vendor and Clinic Worker. Dedicated renderer functions have been implemented in `npc_sprites.js` and wired into the live civilian renderer dispatch:

- `drawGuardVector` — protective shell, helmet, character-right braced forearm, rear-harness radio.
- `drawVendorVector` — forward-pitched stall worker, split waistcoat, open shirt, offset sash, tray supported by the hand.
- `drawClinicVector` — tapered wrap tunic, offset hip stance, low rear hair coil/side tie, separate character-left medical pouch.

The first renderer pass exposed two clipping defects: Guard's helmet touched the native top edge; Vendor's left-profile tray touched the native left edge. They were corrected and refined in renderer commit 28bf7d3. Run #624 verified zero edge contacts in both the roster-wide and dedicated 24-capture alpha-bound checks. The direct 28×42 capture anchor is the live game sprite baseline (39px) in QA harness commit 2bc8c39.

**Current status:** design approved; renderer implemented; targeted QA and visual inspection passed; independent Claude review and final owner completion approval are still pending. Do not begin the remaining 14 unstarted civilians until Claude's independent review is complete and the owner approves the direction.

## Exact QA evidence

Run #624 tested renderer commit `28bf7d31938c3f7a574a3b9df48d2f73488a5d80` and QA harness commit `2bc8c39babf145878925adb3d78fd93d8a2296e3`.

| Check | Result |
|---|---|
| Dedicated new-batch native captures | 12/12, all 64×96 |
| Dedicated new-batch direct game-scale captures | 12/12, all 28×42; rendered directly through `owCiv`, not resized |
| Full roster face distinctness | 23/23 unique at native and game scale |
| Palette audit | Pass; 23 civilians, 14 legacy pixel renderers, 9 vector renderers |
| Body proportion / baseline audit | Pass; max height deviation 0.875 px; max baseline delta 1 |
| Directional visual integrity | Pass; 92/92 captures checked; no edge contacts; no detached large components |
| New-batch alpha bounds | Pass; 24/24 captures (12 native + 12 direct) have no left/right/top/bottom edge contact |
| Prop/archetype audit | Pass |
| NPC gallery | Pass; full 23-civilian × four-direction roster gallery (92 views) rendered and visually inspected, including Field Clinic, City Guard and Street Vendor. The separate existing 40-cell archetype-grid integrity check also passed |
| Town-scene smoke check | Pass; street scene rendered with 16 NPCs and Granny present. This is a regression smoke check, not proof that all three new civilians spawned in that scene |
| JavaScript/page errors | None |
| Golden snapshot gate | Not passed: existing provenance remains `unapproved`. No snapshot was refreshed, approved or replaced |
| Workflow conclusion | Failure only because the established golden-snapshot approval gate is still unapproved; the targeted renderer checks above passed |

The browser log contains 135 existing audio-resource 404 responses. These are separate from the new renderer code; no page errors or JavaScript errors were reported. Direct game-scale captures now use the 39px live sprite anchor.

## Mandatory human-review triggers

The pairwise silhouette diagnostics are technically complete and pass their diagnostic validity check. Eight full-body pairs cross the established IoU review threshold (0.85). This threshold is a **human-review trigger**, not an automatic art rejection. Torso-only IoU is materially lower, showing that torso construction is more distinct than the combined head/limb silhouette alone.

| Direction | Pair | Full-body IoU | Torso-only IoU |
|---|---|---:|---:|
| Back/up | Courier / Vendor | 0.8929 | 0.2656 |
| Back/up | Guard / Vendor | 0.8893 | 0.4390 |
| Profile right | Vendor / Clinic | 0.8879 | 0.5329 |
| Back/up | Courier / Guard | 0.8771 | 0.3345 |
| Back/up | Vendor / Clinic | 0.8686 | 0.5402 |

| Front | Guard / Clinic | 0.8624 | 0.6621 |
| Profile right | Guard / Clinic | 0.8550 | 0.5980 |
| Back/up | Guard / Clinic | 0.8546 | 0.6405 |

Claude should inspect these exact comparisons in the native and game-scale captures, especially the Vendor/Courier back and profile pairs and the Vendor/Clinic profile pair. Determine whether the distinct torso construction, face, headwear, prop/contact and personality cues are sufficient at actual game scale, or whether a valid silhouette refinement is needed. Do not treat the numeric trigger alone as a rejection.

## Review inputs

1. [Revision 02 construction cards](GUARD-VENDOR-CLINIC-CONSTRUCTION-CARDS-REVISION-02.md)
2. [Revision 02 directional silhouette sheet](GUARD-VENDOR-CLINIC-SILHOUETTE-REVISION-02.svg)
3. [Matched roster comparison](GUARD-VENDOR-CLINIC-ROSTER-COMPARISON-REVISION-02.svg)
4. [Owner-approved preflight and criteria](OWNER-PREFLIGHT-GUARD-VENDOR-CLINIC-WORKER.md)
5. [Renderer implementation source](https://github.com/tinytime/Tinytime.github.io/blob/npc-granny-baseline-overhaul/npc_sprites.js)
6. [Browser QA implementation](https://github.com/tinytime/Tinytime.github.io/blob/npc-granny-baseline-overhaul/qa/vapor-city-browser-qa.mjs)
7. [Run #624 screenshots and report](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670975455/artifacts/14600880214)

The Run #624 artifact contains the 12 individual native 64×96 PNGs, 12 individual direct 28×42 PNGs using the corrected 39px anchor, the full 23-civilian × four-direction roster gallery (92 views), the separate 40-cell archetype-grid integrity capture, town screenshot, and machine-readable QA report.

## Claude review criteria

- Compare each character against Granny Volt's construction quality, without copying Granny's silhouette or styling.
- Verify the three designs remain individually recognizable in all four directions at 28×42.
- Inspect Guard's rear-harness radio visibility and front occlusion; front bracer placement and profile near/far-arm occlusion.
- Inspect Vendor's hand-to-tray contact, far-side tray occlusion, sash continuity, and forward-pitched stance.
- Inspect Clinic Worker's wrap overlap, low rear hair gathering, pouch attachment and separation from the hand.
- Review the eight overlap-trigger pairs above, using torso-only metrics as supporting evidence rather than a substitute for visual judgment.
- Check clipping, edge clearance, detached components, face uniqueness, prop readability and consistency across directions.
- Return actionable findings per character/direction. Do not approve golden snapshots or change the design scope.

## Remaining gates

1. Claude independent comparative review.
2. ChatGPT evaluates findings and fixes valid defects, then reruns browser QA and inspects the new artifacts.
3. Owner gives final approval of the completed rendered characters.

No golden snapshots have been changed. No remaining roster characters have been started.

## Claude independent review — 2026-11-20

**Verdict:** no blocking defects; four targeted corrections recommended before final owner completion approval.

Claude reviewed 12 native 64×96 and 12 direct game-scale 28×42 captures. The visual review found no visible clipping, detached components or edge-clearance problems. The following pairs were judged distinct enough on visual inspection: the three rear views (Guard radio, Vendor sash/tray stub, Clinic coil/pouch); Guard/Clinic front and profile; and the helmet-versus-gathered-hair distinction. The Guard helmet band and Vendor cap band remain a minor shared horizontal-dome motif to watch, not a blocking defect.

### Review limitations

- The supplied zip's torso-pair diagnostic showed older pairs rather than the eight current overlap triggers. Claude independently recomputed full-body IoU from the PNGs; native values agreed with the table within approximately 0.005.
- The zip did not include construction cards, renderer source or a Granny comparison. Claude therefore did not assess construction quality against Granny Volt.
- The Courier game-scale capture appeared to use an older anchor (approximately 0.69 versus approximately 0.89 native); Claude excluded that game-scale discrepancy from judgment.
- These limitations do not invalidate the 12 new-batch native/direct captures, but the Granny craft comparison and Courier direct-scale evidence remain outside this review.

### Required targeted corrections

1. **Guard — right profile:** add a visible near-side arm/hand cue so the view does not read as a plain column. Keep the character-right bracer on its anatomically correct arm; do not duplicate it onto the near-side arm.
2. **Vendor — right profile:** expose a small forward tray lip and supporting hand beyond the torso contour while retaining far-side occlusion. Preserve the tray's character-left placement and avoid a second full tray.
3. **Guard and Vendor — profile faces:** strengthen the eye/brow cue so each has a clearly visible one-pixel facial mark at direct 28×42 scale. Clinic's existing profile eye is the consistency reference.
4. **Vendor / Clinic — right-profile separation:** the full-body IoU review trigger is approximately 0.888. Improve the profile distinction through the Vendor's tray/hand projection and by placing Clinic's low hair coil on the rear side of the skull in both profiles. Treat IoU as a human-review prompt, not a target or automatic rejection.

Claude also noted that Vendor's rear tray is only a 2–3px stub, but considered it marginally readable alongside the sash. No concept redesign was requested.

### ChatGPT correction pass

Implemented in [commit 27c414b46d560ae9b4e2dd0f67b1936ce3d8f3c8](https://github.com/tinytime/Tinytime.github.io/commit/27c414b46d560ae9b4e2dd0f67b1936ce3d8f3c8), limited to `npc_sprites.js`:

- Guard right profile now shows a separate near-side sleeve/hand; the character-right bracer remains on its original arm.
- Vendor right profile now exposes a partial supporting hand and tray lip; the remainder stays occluded.
- Guard and Vendor profile eye/brow cues are strengthened for direct game-scale readability.
- Clinic's low coil/tie is repositioned to the rear side of the skull in both profiles.

The three approved Revision 02 concepts, palettes, garments and must-survive items are preserved. No other civilian renderer was changed. No golden snapshots were refreshed, approved or replaced.

**Follow-up QA:** Run #625 was triggered by the correction commit and is in progress at the time of this documentation update. Do not treat the code correction as visually verified until the new native/direct captures are inspected. Final owner completion approval remains pending.


## Follow-up QA — Runs #625 and #626 (2026-11-20)

### Run #625 — initial correction verification

- [Actions Run #625](https://github.com/tinytime/Tinytime.github.io/actions/runs/44672166234); tested renderer commit `27c414b46d560ae9b4e2dd0f67b1936ce3d8f3c8`; artifact `14599579908`.
- Semantic proportion/annotation validation passed. All 12 native 64×96 and 12 direct 28×42 Guard/Vendor/Clinic captures were generated. Role-debug 12/12, prop audit, full gallery, 92/92 directional integrity and zero detached large components passed.
- The dedicated new-batch audit found one edge contact: Vendor right-profile tray touched the right edge at 28×42. ChatGPT inspected all 24 captures and confirmed the clipping. Browser diagnostics failed on console resource errors, including the known audio-resource 404s; pageErrors and scriptErrors were zero. No golden snapshots changed.

### Vendor right-profile bounds correction

Committed as [`8cc6836d4eff0a3cb8fcd997373da17769564e20`](https://github.com/tinytime/Tinytime.github.io/commit/8cc6836d4eff0a3cb8fcd997373da17769564e20). The supporting hand and tray lip were shifted inward by three native design units. The hand remains beneath the tray and the same single partially occluded tray is preserved; no concept, palette or other direction changed.

### Run #626 — corrected capture verification

- [Actions Run #626](https://github.com/tinytime/Tinytime.github.io/actions/runs/44673031471); tested exact source commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`; [artifact `14599664923`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44673031471/artifacts/14599664923).
- **Dedicated batch capture audit PASS:** 12/12 native 64×96 and 12/12 direct 28×42, with zero edge contacts. **Directional integrity PASS:** 92/92, zero edge contacts, zero detached large components and 23/23 unique profile-face crops. Prop audit, role-debug 12/12, gallery render and town smoke check passed.
- ChatGPT visually inspected all 12 native and all 12 direct game-scale captures, the full 23-civilian directional gallery, and the town screenshot. Vendor's right-profile tray now clears the sprite edge at both scales. The four Claude-directed corrections are visible: Guard's near-side profile arm/hand; Vendor's profile tray/hand; stronger Guard/Vendor profile eye/brow cues; and Clinic's rear-shifted low coil. No visible clipping or detached components were found in the inspected new-batch captures. The approved Revision 02 designs remain intact.
- **Internal visual QA: PASS for this correction pass.** Overall Actions remains failed because browser diagnostics recorded 180 console errors (including 135 audio-resource HTTP 404s; pageErrors and scriptErrors are zero) and the golden snapshot comparison is still unapproved (1 match / 23 changed). No golden snapshots were refreshed, approved or replaced.

### Remaining approval gates

1. Claude's final independent comparative review of the corrected Run #626 captures and relevant construction evidence.
2. Owner's explicit final approval of Guard, Vendor and Clinic Worker as completed rendered characters.

Until both gates are complete, all three remain IN PRODUCTION / NOT COMPLETE. Do not start the remaining roster. Do not alter golden snapshots or their provenance.

## Run #627 — focused renderer QA and Claude review package (2026-11-20)

- Renderer source: [commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`](https://github.com/tinytime/Tinytime.github.io/commit/6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b), changing only `npc_sprites.js` (20 additions, 8 deletions). Current branch HEAD at QA review: `05d0d57f1861faf00c7ab6e106cecdb47dd4966c`; renderer commit is in its ancestry.
- Browser QA: [Run #627](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457), artifact [14611292138](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457/artifacts/14611292138). Run completed **FAILED**; browser diagnostics was the failing step. Chromium setup, semantic measurement/annotation validation, syntax/inventory, evidence builders and artifact upload completed successfully.
- Artifact downloaded and inspected: all 12 direct native 64×96 captures and all 12 direct game-scale 28×42 captures for Guard, Vendor and Clinic Worker. All four directions are present at both scales. The 28×42 images are direct renderer captures, not resizes. Native and game-scale captures have no edge contacts; 92/92 directional integrity passes with zero detached large components. Gallery and town-scene smoke checks pass; pageErrors=0 and scriptErrors=0.
- Before/after decoded-RGBA pixel comparison against Run #626 confirms front/back images are byte-identical. Changes are confined to profile views: native changed pixels Guard L/R 35/164, Vendor L/R 12/12, Clinic R 56; direct 28×42 changed pixels Guard L/R 13/54, Vendor L/R 6/6, Clinic R 21.
- Internal visual inspection: Guard right profile now has a connected near forearm, steel bracer and hand; Vendor left/right profile eye and brow marks are clearer; Clinic right profile has a visible near-side kit strap/buckle cue without moving the far-side pouch. No clipping or detached geometry was seen. At direct 28×42 the Guard arm cue and Clinic strap are small but present; face-interior details are judged at native scale, consistent with the construction standard. Front/back designs remain unchanged.
- Diagnostic roster result: the rendered full-character right-profile Guard/Clinic pair remains just above the human-review trigger at IoU 0.8547 (mask basis: alpha > 0; visible clothing, hair, limbs and visible worn/held props included; background excluded). This is **not a failure threshold**. Right-profile Vendor/Clinic is 0.8326. Record a human disposition; do not redesign solely to chase the number.
- Global workflow blockers: golden snapshot baseline remains unapproved (1 match / 23 changed; 24 expected; no missing). No golden snapshots or provenance were changed. Browser report contains 180 console errors associated with 404 audio/resource requests (135 raw failed-resource messages plus 45 sound-loader messages across 46 URL entries); pageErrors and scriptErrors are zero. These are separate existing project-wide blockers, not evidence of a new vector-renderer exception.
- **Claude review requested:** compare Run #627 artifact against the approved Revision 02 briefs/cards and Granny Volt's benchmark; specifically assess Guard right-profile forearm/bracer continuity and handedness, Guard/Vendor profile face construction at native scale, Clinic right-profile near-side strap readability/contact, profile pair differentiation (including Guard/Clinic IoU 0.8547 as a review prompt only), and preservation of all front/back views. Confirm whether any additional correction is warranted. Do not infer owner approval from QA passes or this package.
- **Status:** internal QA and visual inspection completed; independent Claude review and explicit owner approval remain pending. Keep the remaining 17 civilians on hold. Do not touch golden snapshots without explicit owner authorization.

## Run #628 — Vendor profile eye follow-up (2026-11-20)

- Tested commit: `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`. [Browser QA Run #628](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539).
- Overall workflow **FAILED** at browser diagnostics. Chromium install and semantic annotation validation passed; evidence sheets and artifact upload completed. The report's golden snapshot gate remains unapproved (1 match / 23 changed; no missing). No snapshots or provenance were changed. 180 console errors are existing audio/resource 404 requests; pageErrors=0 and scriptErrors=0.
- All 12 direct native 64×96 and 12 direct game-scale 28×42 captures for Guard, Vendor and Clinic Worker were generated and inspected. Capture audit passed with no edge contacts; global directional integrity 92/92, zero detached large components, face distinctness 23/23 at native and game scale, prop audit, gallery, town-scene smoke check and Granny directional check passed.
- Visual review confirms Guard right-profile forearm/bracer/hand and Clinic right-profile near-side pouch cord are present; Vendor eye placement from this pass was still too far toward the face contour and did not read clearly enough in direct 28×42 output. Do not call Vendor profile face fix complete based solely on uniqueness metrics. Clinic cord remains optional and low contrast; no need to reopen unless Claude identifies a concrete readability issue.
- Corrective follow-up commit `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32` moves Vendor's profile eye/brow inward onto the visible cheek plane. [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613) is running against that exact commit; its direct game-scale captures must be inspected before declaring the face correction resolved.
- Claude's independent review should use the latest passing/inspected artifact after Run #629, not Run #628 as final face evidence. Owner approval remains pending. Do not start remaining 17 civilians or modify golden snapshots.


## Run #628 — Vendor profile eye verification and corrected-output review package (2026-11-20)

- Renderer source: [commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`](https://github.com/tinytime/Tinytime.github.io/commit/a8f3689abfe50be5c6fb544789d0f26fb2d41e9f), changing only the Vendor profile eye/brow placement in `npc_sprites.js`. The forward-set, high-contrast mark was moved clear of the cap brim/ear after Run #627's actual profile montage showed the prior marks were not reading.
- Browser QA: [Run #628](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539). Tested SHA exactly matches the renderer commit and current branch HEAD at test time. Overall Actions **FAILED** at browser diagnostics; setup, semantic annotation validation, syntax/inventory, evidence generation and artifact upload succeeded.
- Capture assertions: approved batch Guard/Vendor/Clinic = 12/12 native 64×96 and 12/12 direct 28×42; all four directions at both scales, direct renderer output with no resizing, no edge contacts. Wider five-civilian evidence contains 20/20 native and 20/20 direct game-scale captures. Directional integrity 92/92; civilian visual integrity 92/92; face distinctness 23/23 at native and 23/23 at game scale; role-debug 12/12; prop audit PASS (10 archetypes); gallery PASS; Granny directional check PASS. Semantic annotation validation and syntax/inventory checks pass. No pageErrors or scriptErrors.
- Internal visual inspection: reviewed the Run #628 native and direct-game-scale profile montages and enlarged Vendor left/right face crops. Vendor's forward-set eye/brow is now visible in both native profiles; the direct 28×42 face cues remain small but readable on close inspection and are not obscured by the cap brim or ear. Guard's near forearm/bracer/hand and Clinic's right-profile strap/coil details remain visible. No visible clipping or detached components in the inspected profile evidence. This verifies the targeted profile correction; it is not a final artistic approval of the three-character batch.
- Diagnostic silhouette review remains human-led. The 0.85 IoU value is a review trigger, not a pass/fail score. Run #628 reports a maximum rendered full-character pair IoU of 0.9065 (back Coach/Guard); the accepted Guard/Clinic profile distinction must not be redesigned solely to lower overlap. Existing torso/full-character pair prompts should be dispositioned against the actual silhouettes and accepted exceptions, not treated as automated failures.
- Global blockers remain: golden snapshot gate **FAIL** (1 match / 23 changed; baseline provenance status `unapproved`; no missing snapshots), and 180 console errors from existing audio/resource HTTP 404s across 46 URL entries. No golden snapshots or provenance were changed. These blockers are distinct from the passing targeted vector checks.
- **Claude re-review requested on this exact commit/artifact.** Verify Vendor L/R eye/brow placement and visibility at native 64×96 and direct 28×42; confirm cap-brim/ear clearance and facial anatomy; ensure Vendor tray/hand remains intact; confirm Guard arm and Clinic profile cues remain intact; check all four directions/front/back preservation; disposition silhouette review prompts including accepted Guard/Clinic overlap. Do not reopen accepted exceptions or request numeric-driven silhouette redesign.
- **Status:** renderer correction implemented, committed, tested and internally visually inspected. Claude's independent corrected-output review and explicit owner approval remain outstanding. Guard, Vendor and Clinic are not yet marked complete; keep the remaining 17 civilians on hold. No golden snapshot changes authorized.

## Run #629 — Vendor profile eye correction verified (2026-11-20)

- Tested renderer commit: `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`. [Browser QA Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), artifact [14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475).
- Downloaded and inspected all 12 native 64×96 and 12 direct game-scale 28×42 Guard/Vendor/Clinic captures. Vendor's repositioned eye now sits inside the visible cheek plane and reads in both left and right profile at both scales. Guard and Clinic profile details remain visible; no unintended changes to other directions were introduced by the Vendor-only edit.
- Automated checks: syntax/inventory pass; approved-batch capture audit 12/12 native + 12/12 direct game scale, zero edge contacts; game-scale capture audit 20/20; global directional integrity 92/92, zero edge contacts, zero detached large components; face distinctness 23/23 native and 23/23 game scale; prop audit, gallery, town-scene smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- Overall Actions **FAILED** at browser diagnostics. The snapshot gate remains unapproved (1 match / 23 changed, no missing); console contains 180 existing audio/resource HTTP 404 errors. No golden snapshots or provenance changed. These global gates are separate from the passing targeted vector checks.
- Silhouette diagnostics retain human-review prompts, including right-profile Guard/Clinic IoU approximately 0.855; the construction standard defines 0.85 as a human-review trigger, not an automatic failure. Claude should make the qualitative disposition; do not redesign solely to lower IoU. The Clinic near-side cord remains a subtle/optional cue and is not being reopened absent a concrete review finding.
- **Claude review requested against this exact Run #629 artifact and commit.** Please assess Vendor eye readability in both profiles at native and 28×42 scales, confirm Guard forearm/bracer/hand and Clinic pouch-cord treatment, assess the Guard/Clinic right-profile pair qualitatively, and confirm all front/back views and approved concepts remain intact. Compare to Granny Volt and the approved Revision 02 cards. This is an independent review package, not an approval.
- **Status:** internal QA and visual inspection complete for Run #629; Claude review and explicit owner approval remain pending. Do not begin remaining 17 civilians or touch golden snapshots.


## Guard, Vendor and Clinic — Run #629 and owner decision (2026-11-20)

- Final renderer source for this round: [`2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`](https://github.com/tinytime/Tinytime.github.io/commit/2bc1629edd82afc1a50ac7a4ab882b428dbd0c32). The final focused change moved Vendor's profile eye/brow inward onto the visible cheek plane after Run #628's automated face-distinctness checks passed but manual direct-game-scale inspection found the mark insufficiently legible.
- Browser QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), [artifact 14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Targeted vector/capture checks pass; overall Actions remains failed on the unapproved golden snapshot baseline (1 match / 23 changed) and existing audio/resource 404 console errors. No golden snapshots or provenance were changed.
- Inspected the exact Run #629 artifact: 12/12 native 64×96 and 12/12 direct 28×42 captures for Guard/Vendor/Clinic; Vendor's left and right profile eye now reads in both scales. Guard's near-side forearm/bracer/hand and Clinic's right-profile cord/coil remain present. Directional integrity 92/92, zero edge contacts and detached components, face distinctness 23/23 at both scales, prop audit, gallery, town smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- **Owner decision:** the project owner explicitly approved the rendered Guard, Vendor and Clinic Worker batch on 2026-11-20 after the Run #629 evidence review.
- **Independent-review record:** Claude's final independent review of this exact Run #629 commit/artifact is not yet recorded in the repository. Per the governing approval process, retain that as the outstanding independent-review gate; do not label the batch fully closed or release the remaining 17 until the exact-output review is logged. This records the owner's approval without fabricating reviewer sign-off.
- No golden snapshots changed. Existing global Actions blockers are tracked separately from the passing character-specific evidence.
