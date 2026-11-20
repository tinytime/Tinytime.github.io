# Guard / Vendor / Clinic Worker — Renderer QA and Claude Review Package

**Owner design approval:** 2026-11-19  
**Renderer source commit:** [b5762ab47868de96389d75f82517c57d481cd3ed](https://github.com/tinytime/Tinytime.github.io/commit/b5762ab47868de96389d75f82517c57d481cd3ed)
**QA harness commit:** [87eac9cd0a2b23a706f57df3e570ca3669c94c53](https://github.com/tinytime/Tinytime.github.io/commit/87eac9cd0a2b23a706f57df3e570ca3669c94c53)  
**Branch:** `npc-granny-baseline-overhaul`  
**Browser QA:** [Run #622](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670705401)  
**Artifact:** [Download the complete Run #622 evidence package](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670705401/artifacts/14599434590)

## Scope and status

The owner approved the Revision 02 designs for Guard, Vendor and Clinic Worker. Dedicated renderer functions have been implemented in `npc_sprites.js` and wired into the live civilian renderer dispatch:

- `drawGuardVector` — protective shell, helmet, character-right braced forearm, rear-harness radio.
- `drawVendorVector` — forward-pitched stall worker, split waistcoat, open shirt, offset sash, tray supported by the hand.
- `drawClinicVector` — tapered wrap tunic, offset hip stance, low rear hair coil/side tie, separate character-left medical pouch.

The first renderer pass exposed two clipping defects: Guard's helmet touched the native top edge; Vendor's left-profile tray touched the native left edge. They were corrected and further refined in renderer commit b5762ab. Run #622 verified zero edge contacts. The direct 28×42 capture anchor was corrected to the live game sprite baseline (39px) in QA harness commit 87eac9c.

**Current status:** design approved; renderer implemented; targeted QA and visual inspection passed; independent Claude review and final owner completion approval are still pending. Do not begin the remaining 20 civilians yet.

## Exact QA evidence

Run #622 tested renderer commit `b5762ab47868de96389d75f82517c57d481cd3ed` and QA harness commit `87eac9cd0a2b23a706f57df3e570ca3669c94c53`.

| Check | Result |
|---|---|
| Dedicated new-batch native captures | 12/12, all 64×96 |
| Dedicated new-batch direct game-scale captures | 12/12, all 28×42; rendered directly through `owCiv`, not resized |
| Full roster face distinctness | 23/23 unique at native and game scale |
| Palette audit | Pass; 23 civilians, 14 legacy pixel renderers, 9 vector renderers |
| Body proportion / baseline audit | Pass; max height deviation 0.875 px; max baseline delta 1 |
| Directional visual integrity | Pass; 92/92 captures checked; no edge contacts; no detached large components |
| Prop/archetype audit | Pass |
| NPC gallery | Pass; full 40-cell gallery rendered, including Field Clinic, City Guard and Street Vendor in all four directions |
| Town-scene smoke check | Pass; street scene rendered with 16 NPCs and Granny present. This is a regression smoke check, not proof that all three new civilians spawned in that scene |
| JavaScript/page errors | None |
| Golden snapshot gate | Not passed: existing provenance remains `unapproved`. No snapshot was refreshed, approved or replaced |
| Workflow conclusion | Failure only because the established golden-snapshot approval gate is still unapproved; the targeted renderer checks above passed |

The browser log contains 135 existing audio-resource 404 responses. These are separate from the new renderer code; no page errors or JavaScript errors were reported. Direct game-scale captures now use the 39px live sprite anchor.

## Mandatory human-review triggers

The pairwise silhouette diagnostics are technically complete and pass their diagnostic validity check. Ten full-body pairs cross the established IoU review threshold (0.85). This threshold is a **human-review trigger**, not an automatic art rejection. Torso-only IoU is materially lower, showing that torso construction is more distinct than the combined head/limb silhouette alone.

| Direction | Pair | Full-body IoU | Torso-only IoU |
|---|---|---:|---:|
| Back/up | Courier / Vendor | 0.8929 | 0.2656 |
| Back/up | Guard / Vendor | 0.8893 | 0.4390 |
| Profile right | Vendor / Clinic | 0.8879 | 0.5329 |
| Back/up | Courier / Guard | 0.8771 | 0.3345 |
| Back/up | Vendor / Clinic | 0.8686 | 0.5402 |

| Front | Vendor / Clinic | 0.8654 | 0.5664 |
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
7. [Run #622 screenshots and report](https://github.com/tinytime/Tinytime.github.io/actions/runs/44670705401/artifacts/14599434590)

The Run #622 artifact contains the 12 individual native 64×96 PNGs, 12 individual direct 28×42 PNGs, full NPC gallery captures, town screenshot, and machine-readable QA report.

## Claude review criteria

- Compare each character against Granny Volt's construction quality, without copying Granny's silhouette or styling.
- Verify the three designs remain individually recognizable in all four directions at 28×42.
- Inspect Guard's rear-harness radio visibility and front occlusion; front bracer placement and profile near/far-arm occlusion.
- Inspect Vendor's hand-to-tray contact, far-side tray occlusion, sash continuity, and forward-pitched stance.
- Inspect Clinic Worker's wrap overlap, low rear hair gathering, pouch attachment and separation from the hand.
- Review the ten overlap-trigger pairs above, using torso-only metrics as supporting evidence rather than a substitute for visual judgment.
- Check clipping, edge clearance, detached components, face uniqueness, prop readability and consistency across directions.
- Return actionable findings per character/direction. Do not approve golden snapshots or change the design scope.

## Remaining gates

1. Claude independent comparative review.
2. ChatGPT evaluates findings and fixes valid defects, then reruns browser QA and inspects the new artifacts.
3. Owner gives final approval of the completed rendered characters.

No golden snapshots have been changed. No remaining roster characters have been started.
