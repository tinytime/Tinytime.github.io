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

