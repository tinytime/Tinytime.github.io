## Fourth civilian batch — construction cards owner-approved (2026-11-20)

The owner approved construction cards 02 for Sailor #12, Slicker #13 and Painter #14. Their construction-family assignments are now current in the roster register:
- Sailor — Narrow Deck-Coat / Vertical Utility Shell
- Slicker — Integrated Hooded Rain-Smock Shell
- Painter — Offset Artisan Smock / Reaching-Arm Shell

Detailed black-only construction study 01 is committed at [SAILOR-SLICKER-PAINTER-CONSTRUCTION-DETAIL-STUDY-01.svg](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CONSTRUCTION-DETAIL-STUDY-01.svg). It reuses revision-21 silhouette geometry and proposes internal garment construction details only. It is design-stage art, not final face art, palette, renderer output or owner-approved finished art. Next: QA the exact SVG, resolve face comparisons with matched roster crops, and refine/validate the four-direction details. No renderer integration, golden snapshot changes, or #15–23 work is authorized.

---

## Fourth civilian batch — post-silhouette identity/construction cards 02 (2026-11-20)

The owner-approved revision 21 silhouettes are now the fixed baseline for the next design stage. The three complete identity/construction cards are in [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-02.md](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-02.md).

- **Approved silhouette source:** commit `be1c0c012894ccae23b4cbce2ad06e523fb460c5`; SVG blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`; [revision 21 SVG](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg).
- **Silhouette QA evidence:** [Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854). Focused design-source checks passed; overall browser workflow remains failed on unrelated global audio/resource 404 and unapproved golden-snapshot gates. No snapshots/provenance changed.
- **Proposed construction-family descriptors (not yet owner-approved):** Sailor — Narrow Deck-Coat / Vertical Utility Shell; Slicker — Integrated Hooded Rain-Smock Shell; Painter — Offset Artisan Smock / Reaching-Arm Shell. These are descriptive, character-specific roster family tags, not reusable templates or quota targets.
- **Baseline protection:** no approved revision-21 SVG geometry was changed. Branch HEAD also contains a later revision-22 exploration (`f39f450a361668d60f3eb77f0e93ab804f848070`); it is a separate unapproved proposal and is not used as the baseline for these cards.
- **Stage status:** cards submitted for internal QA and owner review. Face studies remain proposals. No final palette/rendering, production renderer/integration, golden snapshot/provenance work, or roster #15–23 work is authorized.

---

## Fourth civilian batch — revision 21 exact-source checkpoint, Run #810 (2026-11-20)

- **Source and tested branch head:** `be1c0c012894ccae23b4cbce2ad06e523fb460c5`; revision-21 SVG blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`.
- **Exact evidence:** [Actions Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854).
- **Focused design-source checks PASS:** 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged captures; body preservation 12/12 with zero removed pixels; anatomy/prop connectivity 48/48; profile prop contact 2/2; semantic proportion/annotation validation passed. Slicker remains byte-identical to revision 18 across all eight body/prop direction panels.
- **Separate full workflow FAIL:** game-browser diagnostics failed with 135 audio/resource HTTP 404 responses plus 45 corresponding sound-load messages; pageErrors=0 and scriptErrors=0. Golden snapshot gate remains 1 match / 23 changed and unapproved. No golden snapshots or provenance were modified.
- **Additional ChatGPT artifact inspection:** opened actual native and direct body/prop comparison sheets, matched-face comparison sheet, and enlarged Sailor-front and Painter-front/left-profile prop crops. Sailor's hand/coil read remains compact and merits close direct-scale reviewer scrutiny; Painter's brush is identifiable but the hand/handle/head cluster is dense at game scale. Face studies remain provisional grayscale geometry. This is limited supplementary inspection, not a complete all-crops verdict or approval.
- **Handoff:** the owner has approved the revision 21 silhouettes for Sailor (#12), Slicker (#13) and Painter (#14), following the owner's report of Claude approval. The Claude verdict itself is not yet recorded in GitHub; see the owner-approval record below. Construction-card/family and anatomy/pose/clothing/prop design work is now authorized. Palette/colour rendering, production renderer work, golden snapshot/provenance changes and roster #15–23 remain unauthorized/on hold.

---

## Owner silhouette approval — Sailor #12, Slicker #13 and Painter #14 (2026-11-20)

The owner has explicitly approved the **revision 21 silhouettes** for all three characters, following the owner's report that Claude approved the latest silhouette round. This approval is limited to the silhouette/design gate and authorizes progression into the next design stage: finalize the three identity/construction cards, assign and justify construction families, and develop anatomy/pose and clothing/prop integration against the approved silhouettes.

- **Approved design source:** revision 21 SVG, blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`; exact tested artwork source commit `be1c0c012894ccae23b4cbce2ad06e523fb460c5`.
- **Evidence:** [Actions Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854). Focused design-source checks passed; the overall workflow remains failed on the separate global browser-resource 404 and unapproved golden-snapshot gates described below.
- **Claude record:** approval is recorded here as reported by the owner in the project conversation. The actual Claude verdict/package response has not yet been added to GitHub, so its detailed findings and exact reviewed-source identity are not independently documented here. Attach or transcribe that verdict when available; do not invent review details.
- **Next authorized stage:** identity/construction cards, construction-family assignment, anatomy/pose and clothing/prop integration. Keep the approved silhouette contours as the baseline; any material silhouette change returns for review.
- **Not authorized by this decision:** palette/colour rendering, production renderer implementation/integration, golden snapshot or provenance changes, and work on roster #15–23. Face studies remain provisional unless separately approved.

# Chat continuity and role prompts

**When creating a new Vapor City chat, start with the [Chat Playbook](CHAT-PLAYBOOK.md).** It contains a common startup prompt and copy-ready role prompts for the Project Lead, NPC Designer, Renderer/Technical Developer, QA/Visual Reviewer, Claude Independent Reviewer, Gameplay/Systems Developer, and Documentation/Release Steward.

Every new chat must re-read current GitHub state, verify the branch HEAD and latest relevant Actions/artifacts, and establish its own evidence-backed starting point. Do not rely on prior chat memory.

---

## Fourth civilian batch — revision 21 exact-source internal design QA (2026-11-20)

The owner-authorized parallel design-stage work for Sailor (#12), Slicker (#13) and Painter (#14) has reached **internal design-source QA PASS**. The owner has now approved the revision 21 silhouettes and authorized the next design stage. Claude approval is owner-reported; the actual Claude verdict has not yet been filed in GitHub.

- **Exact tested commit:** `5beb3709dd5080313e6ddea5248ef8698f74dd51` (revision 21 SVG source blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`).
- **Source:** [revision 21 SVG](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg).
- **Exact evidence:** [Run #808](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663) · [artifact 14663163320](https://github.com/tinytime/Tinytime.github.io/actions/runs/44808523663/artifacts/14663163320).
- **Design projections:** 24/24 native 64×96, 24/24 independently rendered direct 28×42, and 24/24 enlarged 4× views across body-only/prop-on states and all four directions.
- **Structural checks:** body preservation 12/12 with zero removed body pixels; anatomy/prop connectivity 48/48; near-side profile prop audit 2/2. Sailor/right: 53 added pixels, all 53 in the configured prop region. Painter/left: 159 added silhouette pixels, 26 in the configured prop region, zero removed body pixels; this diagnostic count is a reviewer prompt, not an approval threshold.
- **Visual inspection:** native/direct body and prop comparison sheets, enlarged Sailor/Painter details, matched face comparisons, and Sailor/Welder rear comparison inspected. All eight Slicker body/prop direction panels remain byte-identical to revision 18.
- **Sailor #12:** connected rope coil/spiral refined for front, rear and near-side right profile; character-left carry remains front viewer-right, rear viewer-left, visible right profile only.
- **Painter #14:** connected scalloped flat-brush head, ferrule/handle and grip retained; paired side darts shape the smock without cutting the torso/leg silhouette. Character-right carry remains front viewer-left, rear viewer-right, visible left profile only.
- **Slicker #13:** preserved unchanged from revision 18; no redesign.
- **Overall workflow boundary:** design projection, semantic proportion/annotation validation, gallery and review-sheet generation passed. The overall Actions run remains **FAILED** at global browser diagnostics: pageErrors=0, scriptErrors=0, 135 audio/resource HTTP 404 responses plus 45 corresponding sound-load console messages; the golden-snapshot gate reports 1 match / 23 changed. No golden snapshots or provenance were modified or approved.
- **Authority:** the owner approved all three revision 21 silhouettes on 2026-11-20, after reporting Claude's approval. The actual Claude verdict/package response is not yet filed in GitHub. All three construction families remain UNASSIGNED pending the newly authorized construction-card stage. Palette/colour rendering and production-renderer work remain unauthorized; roster #15–23 remains held.

## Fourth civilian batch — revision 10 internal QA complete; Claude package 04 prepared (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) have completed the current design-source capture and internal visual inspection. [Claude review package 04](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md) supersedes packages 01–03.

- Current source: [revision 10](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg); exact tested source commit `8ae6a47055c6c75e361738b21c01d8b07b6830b4`.
- Exact evidence: [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818). Design-source capture/semantic validation passed: 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged 4×; 69 roster face crops and six matched face-comparison rows.
- Profile prop-region checks passed: Sailor right 172, Slicker left 272, Painter left 95 added pixels. Visual inspection covered body-only/prop-on sheets, direct-scale projections, enlarged profiles, face comparisons and Sailor/Welder rear comparison. Revision 10 clarifies Slicker's folded umbrella canopy/shaft in front/back while retaining left-profile near-side visibility; Painter's broad brush remains crop-safe and the Sailor rope loop is connected through a palm/forearm bridge. Claude should independently judge small-scale identity, grip and subordination.
- Browser QA overall remains FAILED at global diagnostics: unapproved golden snapshot baseline (1 match / 23 changed) and 135 existing audio/resource HTTP 404 console entries. Page/script errors are empty. No golden snapshots or provenance changed.
- These are design-source projections only, not production-renderer QA, live-town spawn proof or gallery integration for the new civilians.
- All three construction families remain UNASSIGNED. No silhouette, face, prop or palette is owner-approved. Renderer work is NOT AUTHORIZED; #15–23 remain held pending independent review and explicit owner approval.

## Fourth civilian batch — revision 10 internal QA complete; Claude package 04 prepared (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) have completed internal design-source capture and visual inspection. The current independent-review package is [Claude review package 04](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md). Packages 01–03 are superseded.

- Current source: [silhouette exploration 10](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg). Exact tested source commit: `8ae6a47055c6c75e361738b21c01d8b07b6830b4`. The SVG title was corrected metadata-only after the run in commit `f7efb67c3fdfcd38899c9d29996b1ed3e1310322`; no geometry changed.
- Exact evidence: [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818). Design-source capture/semantic validation passed: 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged 4×; 69 roster face crops and six matched face-comparison rows.
- Near-side prop-region audit passed: Sailor 172/100, Slicker 272/100, Painter 95/12. Body-only/prop-on sheets, direct-scale sheets, enlarged profiles, face comparisons and Sailor/Welder rear comparison were visually inspected.
- Revision 10 clarifies Slicker's folded umbrella shaft/canopy in front and back as well as profile; direct 28×42 now reads more clearly as an umbrella. Sailor's rope-loop grasp remains a human-review question; Painter's broad brush and near-side grip are readable and crop-safe. Claude should challenge the prop identity/contact and all face comparisons.
- Browser QA overall remains FAILED at the unapproved golden snapshot baseline (1 match / 23 changed) and 135 existing audio/resource HTTP 404 console entries. Page/script errors are empty. No golden snapshots or provenance changed. These are global diagnostics; these new characters remain design-source projections, not production renderer or live-town tests.
- All three construction families remain UNASSIGNED. No silhouette, face, prop, palette or renderer is owner-approved. Claude review is advisory; the owner makes all final decisions. Production renderer authorization is NOT GRANTED. #15–23 remain on hold.

## Fourth civilian batch — Claude review package 02 prepared (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) have completed the current internal design-source evidence pass and are ready for independent critique. This is **not** owner approval and does not authorize production renderer work.

- Current source: [silhouette exploration 09](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-09.svg); [construction cards](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md); [face geometry study](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg).
- [Claude review package 02](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-02.md) supersedes package 01. It cites the exact revision-09 source and [Run #677](https://github.com/tinytime/Tinytime.github.io/actions/runs/44778420801), artifact [14650099995](https://github.com/tinytime/Tinytime.github.io/actions/runs/44778420801/artifacts/14650099995), tested commit `c74219986db2466122fe08ff3ad0bdcb012b5264`.
- Design-source evidence passed: 24 native 64×96 projections, 24 independently rasterized direct 28×42 projections, 24 enlarged views, 69 roster face crops and six matched face-comparison rows. Near-side profile prop-region audit passed: Sailor 172/100, Slicker 272/100, Painter 95/12. Sailor/Welder rear silhouettes were directly compared and read as distinct.
- Manual review finds the body-only silhouettes differentiated. Painter's brush is clearer and kept off the crop edge. Two questions are explicitly escalated to Claude: Sailor's rope-loop grasp remains subtle at direct game scale; Slicker's profile umbrella is clearer, but its front/back game-scale read can still resemble a pouch. Claude should decide whether these need design changes or whether the integrated closure alternative is stronger.
- Overall browser workflow still fails on global diagnostics: golden snapshot gate 1 match / 23 changed, plus existing audio/resource 404 console errors. Page and script errors are empty. No golden snapshots or provenance were changed. The new civilians remain design-source projections, not production renderer or live-town tests.
- All three construction families remain UNASSIGNED. No silhouette, face, prop, palette or renderer is owner-approved. Claude review is advisory; the owner makes all final decisions. Production renderer authorization is NOT GRANTED. #15–23 remain on hold.

## Fourth civilian batch — owner direction approval and Sailor exploration (2026-11-20)

The owner approved the refined Sailor/Slicker/Painter role directions and authorized **Sailor (#12) silhouette exploration only**. Shared QA refinements: body-only plus prop-on four-view silhouette sets; evidence-based comparison against the two closest existing faces before finalizing face cues; and near/far anatomy established before adding props. Sailor must receive matched-scale comparison against Clinic (highest priority), Coach, Guard and Fisher, with particular attention to raised collar, cap contour, leg stance, shoulder-to-waist construction and arm negative spaces. The mooring-line coil is optional and cannot carry identity.

- [Sailor silhouette exploration 01](qa-artifacts/fourth-civilian-batch/SAILOR-SILHOUETTE-EXPLORATION-01.svg) — preliminary body-only and prop-on four-view studies; not approved art.
- [Sailor construction card exploration 01](qa-artifacts/fourth-civilian-batch/SAILOR-CONSTRUCTION-CARD-EXPLORATION-01.md) — provisional construction/contact notes and face-reference comparison plan.
- [Fourth-batch preflight](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md) — updated with owner decision and QA refinements.

- The prop-on study explicitly hides the character-left coil in the right profile (far side); front/back placement reverses correctly, and the left profile alone shows it on the near side. This remains a prop hypothesis, not a locked design.

**Gate:** Sailor silhouette/construction review is pending. Slicker (#13) and Painter (#14) remain queued. All three construction families remain UNASSIGNED. No palette or renderer work is authorized; no golden snapshots or provenance changed.

## Latest browser QA harness checkpoint — Run #649 (2026-11-20)

[Run #649](https://github.com/tinytime/Tinytime.github.io/actions/runs/44753230689), artifact [14636147603](https://github.com/tinytime/Tinytime.github.io/actions/runs/44753230689/artifacts/14636147603), tested commit `2d963db5e0b54f1f7b9afd652b33c053aa168c1b` after Tech was added to the vector-civilian QA contract. Directional integrity 92/92, direct 28×42 assertion 20/20, role-debug 12/12, prop audit 10 archetypes, gallery render and silhouette diagnostic inventory pass; page/script errors are zero. Overall workflow remains failed on unapproved golden snapshots (1 match / 23 changed) and existing audio/resource 404s. No golden snapshots/provenance changed.

## Owner approval and next batch — 2026-11-20

The owner approved batch #9–11 (Tech, Hacker, Fisher). Tech is approved at production-renderer stage; Hacker and Fisher are approved as finished design-stage art, not production-renderer integrations. Claude's post-correction re-review remains unrecorded. Next set: **Sailor (#12), Slicker (#13), Painter (#14)**. Their identity/silhouette preflight is ready: [SAILOR-SLICKER-PAINTER-PREFLIGHT.md](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md). Proposed directions only; owner review and silhouette approval are pending.

## Third-batch reviewer corrections — 2026-11-20

**Updated independent review package:** [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md). Claude's first verdicts have been addressed: Tech's field shell is darker/desaturated petrol with a squared storm-flap shoulder; Hacker's front chest is narrowed, bare forearm separated, left-profile drape tapered and temple/earbud cues strengthened; Fisher's rear smock is ochre rather than a dark cape-like block, the unexplained leg bar is gone, and the right-profile pouch is integrated into the garment.

- Tech targeted browser QA: [Run #648](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957), artifact [14635417540](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957/artifacts/14635417540), exact tested renderer source cea601503504c6b23527452a66cc64c3cb93e7a7. Targeted 4/4 native, 4/4 direct game-scale, zero edge contacts, role-debug 4/4, town spawn/close-up present; wider integrity 92/92, face uniqueness 23/23, gallery/prop/Granny checks pass, page/script errors 0. Actual Tech/Clinic game-scale comparison and town crop inspected.
- Hacker/Fisher design render: [Run #9](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697), artifact [14636805512](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697/artifacts/14636805512), SVG SHA-256 5e20a05a445b4684c3a212bf6e55fd61b3abb230c557e5d7ab85842a6ab03a52. Render succeeded; all eight views recaptured at native 64×96 and direct design-projection 28×42, with 4× nearest-neighbour enlargements. Actual full sheet and directional montages inspected. These remain design-stage captures, not production renderer evidence.
- Browser QA Run #648 overall remains FAILED on the unapproved golden snapshot baseline (1 match / 23 changed) and existing 180 console/resource errors (135 HTTP 404 responses plus 45 corresponding sound-load messages). No snapshots/provenance changed. These are global gates, not new character-specific defects.
- Claude re-review pending; owner acceptance pending. Hacker/Fisher production renderer implementation remains held until Tech independent review and owner rendered-art approval, plus owner acceptance of their finished designs.

## Hacker and Fisher design-stage delivery — 2026-11-20
## Third-batch independent review handoff — 2026-11-20

**Combined Claude package ready:** [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md). It consolidates Tech (#9) production-renderer evidence (Run #644 / artifact `14634020084`) with Hacker/Fisher (#10/#11) corrected finished-design evidence (Playwright Run #7 / artifact `14634776106`). Internal QA is complete for all three at their respective stages. Tech is production-renderer QA-passed; Hacker and Fisher have design-stage QA only. Claude review and owner acceptance remain pending. No additional render is needed for this review handoff. Hacker/Fisher renderer implementation remains held until Tech's independent review and owner approval, and owner acceptance of their finished designs.


The owner authorized finished design-stage vector development for Hacker (#10) and Fisher (#11), preserving the approved round-05 silhouettes. The corrected four-direction colour study is [HACKER-FISHER-FINISHED-DESIGN-STUDY.svg](qa-artifacts/third-civilian-batch/HACKER-FISHER-FINISHED-DESIGN-STUDY.svg); see [design review](qa-artifacts/third-civilian-batch/HACKER-FISHER-DESIGN-REVIEW.md). Corrected Playwright [Run #7](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989) tested source `2b08e60d4814846923e133503f965532bde055ad` and uploaded artifact [14634776106](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989/artifacts/14634776106). Rendering, syntax and capture generation passed; the workflow's commit/push step failed on a non-fast-forward branch race, so the corrected PNGs remain in the artifact and are not committed to the repository. ChatGPT inspected the corrected full sheet, native 64×96, direct 28×42 and 4× nearest-neighbour montages; Hacker's single front slate and supporting-hand overlap are corrected, and both characters' prop handedness/profile visibility are consistent. This is design-source evidence, not game-renderer QA. Owner finished-art acceptance remains pending; renderer implementation remains held by the Tech-first independent-review/owner gate. No renderer, approved art, golden snapshots or snapshot provenance changed.

## Next civilian batch — Tech, Hacker and Fisher (2026-11-20)

**Current checkpoint — Tech internal QA complete; independent review package ready:** latest browser QA [Run #644](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189) tested exact branch HEAD `579f0fff61b8cfd4e416cc59381187b162d3b8ca` and uploaded artifact [14634020084](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189/artifacts/14634020084). Tech captures passed 4/4 native 64×96 and 4/4 direct 28×42, with zero edge contacts; Tech role-debug 4/4; explicit live street spawn and native 1× close-up; directional/visual integrity 92/92; face uniqueness 23/23; general role-debug 12/12; prop audit, gallery and Granny checks PASS; page/script errors 0. Actual captures at both scales, Clinic comparisons, role-debug sheet and town close-up were downloaded and visually inspected. Both profile eye/brow cues read at direct scale; left-profile meter grip is discernible; profile shell overlap with Clinic improved (right 0.856 from 0.908; back 0.878 from 0.915). Remaining Clinic/Tech similarity prompts are back 0.878, front 0.892 and right profile 0.856; they require human judgment and are not automatic failures. Overall Actions failed only on the unapproved golden snapshot baseline (1 match / 23 changed) and 180 existing audio/resource 404 console errors; no snapshots or provenance changed. Tech is ready for Claude's exact-output review; owner rendered-art approval remains pending. Hacker and Fisher design-stage vector development is now owner-authorized and recorded in `qa-artifacts/third-civilian-batch/HACKER-FISHER-FINISHED-DESIGN-STUDY.svg`; renderer implementation remains held pending Tech's independent review and owner rendered-art approval.

The project owner directed ChatGPT to move forward without sending the prior Guard/Vendor/Clinic Run #629 output back to Claude. The exact-output Claude review remains historically unrecorded; this instruction authorizes next-batch preparation and does not imply a reviewer verdict.

Prepared:
- [Tech/Hacker/Fisher design preflight](qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-PREFLIGHT.md)
- [Four-view silhouette exploration SVG](qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg)

**Owner authorization update — 2026-11-20:** The owner approved the round-05 Tech/Hacker/Fisher designs and renderer implementation. Tech (#9) is complete through internal QA and visual inspection; the exact-output Claude review and owner rendered-art approval are now the gates. Hacker (#10) and Fisher (#11) remain untouched until Tech clears those gates. No golden snapshots or provenance were changed.



## Current Guard, Vendor and Clinic QA status — Run #629 (2026-11-20)

The latest completed QA is [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), testing commit `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`, artifact `14613105475`. Vendor's final profile eye placement was verified in left/right profiles at native 64×96 and direct 28×42; Guard and Clinic profile details remain intact. Targeted capture, integrity, face-distinctness, prop and gallery checks pass. Overall Actions remains failed on the unapproved golden-snapshot gate (1 match / 23 changed) and 180 existing audio/resource 404 console errors; no golden snapshots were changed. Owner approval for the rendered batch was received 2026-11-20. Claude's exact-output review remains pending; the remaining 17 civilians stay on hold until that required review is logged.

## Claude targeted re-review and follow-up — 2026-11-20

Claude reviewed the corrected Run #626 package at renderer commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`. The Vendor right-profile tray/hand correction is resolved; the Guard right-profile arm remains too small; Clinic right profile lacks a near-side kit cue and has the highest remaining pair overlap with Guard at IoU 0.87; Guard and Vendor profile faces still read blank at game scale. Front/back views are unchanged and retain the prior assessment. No blocking defects were reported, but Claude recommended one more focused pass on these three profile-readability areas.

ChatGPT implemented that focused pass in `npc_sprites.js` commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`: extended Guard's right-profile forearm into a visible steel bracer and hand; strengthened Guard and Vendor profile eye/brow marks; and added a narrow near-side Clinic pouch strap/buckle cue to the right profile without moving or duplicating the pouch. This is implementation only. Fresh browser QA, artifact inspection at native 64×96 and direct 28×42 scales, and a new Claude review are pending. Preserve all front/back designs, unrelated civilians, accepted exceptions, and golden snapshots. Do not start the remaining 17 civilians until the independent review and explicit owner approval gates are complete.

## Latest work — Guard, Vendor and Clinic Run #627 (2026-11-20)

Fresh QA and internal visual inspection are complete for renderer commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`. [Run #627](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457) produced artifact [14611292138](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457/artifacts/14611292138). Targeted capture/integrity checks pass, but overall Actions failed on existing global snapshot/audio-resource diagnostics. Claude's corrected-output review and owner approval are pending; the remaining 17 civilians remain on hold. See the [Run #627 review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).

## Latest QA — Vendor profile follow-up (2026-11-20)

Run #628 tested `a8f3689` ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539)). Targeted vector checks passed, but overall Actions failed on the unapproved golden snapshot gate and existing audio/resource 404s. Manual game-scale inspection found Vendor's eye still needed repositioning. Follow-up commit `2bc1629` is under Run #629; inspect that artifact before Claude review or owner approval. Remaining 17 civilians remain on hold; golden snapshots untouched.


## Guard, Vendor and Clinic — Run #628 (2026-11-20)

- Tested renderer commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`; [Run #628](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539). Overall Actions **FAILED** at browser diagnostics. Syntax, inventory, semantic annotation validation, capture/evidence generation and artifact upload passed.
- The only renderer change since Run #627 is Vendor profile eye/brow placement. Inspected actual native and direct 28×42 profile montages plus enlarged Vendor L/R face crops. The marks now read in both profiles at native scale; at direct game scale they are subtle but visible. Cap brim/ear clearance is maintained. Guard right-profile forearm/bracer/hand and Clinic right-profile strap/coil remain present. No visible clipping or detached components in the inspected profile captures.
- Capture and integrity checks: Guard/Vendor/Clinic 12/12 native and 12/12 direct game-scale captures; wider five-civilian sheet 20/20 native and 20/20 direct game-scale; directional integrity 92/92; visual integrity 92/92; zero edge contacts; face uniqueness 23/23 at both scales; role debug 12/12; prop audit PASS; gallery and Granny directional checks PASS. pageErrors=0; scriptErrors=0.
- Silhouette diagnostics are review prompts only: maximum full-character IoU 0.9065 (back Coach/Guard); 0.85 remains a human-review trigger, not a gate. Preserve previously accepted distinctions/exceptions and do not redesign solely to chase overlap values.
- Global blockers: unapproved golden snapshot baseline (1 match / 23 changed, no missing) and 180 existing audio/resource HTTP 404 console errors across 46 URL entries. No golden snapshots or provenance changed.
- Next: Claude independently reviews the exact Run #628 artifact/commit, especially Vendor profile facial marks at both scales and preservation of tray/hand, Guard and Clinic details. Then owner makes explicit final decision. The three-character batch is not approved complete; remaining 17 stay on hold.

## Latest QA — Guard, Vendor and Clinic Run #629 (2026-11-20)

Vendor's final profile-eye placement correction is implemented and visually verified at native and direct game scales. [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), artifact [14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475), passes targeted vector capture/integrity checks but overall Actions remains failed on the unapproved golden snapshot gate and existing audio/resource 404s. No snapshots changed. Claude's independent review and owner approval remain pending; the remaining 17 civilians remain on hold.


## Guard, Vendor and Clinic — Run #629 and owner decision (2026-11-20)

- Final renderer source for this round: [`2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`](https://github.com/tinytime/Tinytime.github.io/commit/2bc1629edd82afc1a50ac7a4ab882b428dbd0c32). The final focused change moved Vendor's profile eye/brow inward onto the visible cheek plane after Run #628's automated face-distinctness checks passed but manual direct-game-scale inspection found the mark insufficiently legible.
- Browser QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), [artifact 14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Targeted vector/capture checks pass; overall Actions remains failed on the unapproved golden snapshot baseline (1 match / 23 changed) and existing audio/resource 404 console errors. No golden snapshots or provenance were changed.
- Inspected the exact Run #629 artifact: 12/12 native 64×96 and 12/12 direct 28×42 captures for Guard/Vendor/Clinic; Vendor's left and right profile eye now reads in both scales. Guard's near-side forearm/bracer/hand and Clinic's right-profile cord/coil remain present. Directional integrity 92/92, zero edge contacts and detached components, face distinctness 23/23 at both scales, prop audit, gallery, town smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- **Owner decision:** the project owner explicitly approved the rendered Guard, Vendor and Clinic Worker batch on 2026-11-20 after the Run #629 evidence review.
- **Independent-review record:** Claude's final independent review of this exact Run #629 commit/artifact is not yet recorded in the repository. Per the governing approval process, retain that as the outstanding independent-review gate; do not label the batch fully closed or release the remaining 17 until the exact-output review is logged. This records the owner's approval without fabricating reviewer sign-off.
- No golden snapshots changed. Existing global Actions blockers are tracked separately from the passing character-specific evidence.


## Hacker and Fisher — internal design QA result (2026-11-20)

Internal QA has now inspected corrected Playwright [Run #7](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989), source `2b08e60d4814846923e133503f965532bde055ad`, artifact [14634776106](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989/artifacts/14634776106). All eight native 64×96 captures, all eight direct 28×42 design projections, the complete sheet and all eight 4× nearest-neighbour enlargements were inspected. **Internal design QA: PASS**, with minor readability notes recorded in [the review package](qa-artifacts/third-civilian-batch/HACKER-FISHER-DESIGN-REVIEW.md). The Run #7 PNG commit/push failed on a branch race, but render/capture generation and artifact upload passed; the artifact is authoritative. This does not constitute production renderer QA or owner finished-art acceptance. Hacker/Fisher renderer work remains held pending Tech's independent review and owner rendered-art approval. No renderer or golden snapshot changes.


## Revision 21 — exact-source internal design QA (2026-11-20)

- **Design source:** [revision 21 SVG](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg), exact artwork commit be1c0c012894ccae23b4cbce2ad06e523fb460c5.
- **Evidence:** [GitHub Actions Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056) · artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854). The workflow ran at branch head be1c0c012894ccae23b4cbce2ad06e523fb460c5; revision-21 SVG was unchanged from the exact artwork commit.
- **Focused automated design checks: PASS.** 12/12 body-preservation pairs (zero removed body pixels); 48/48 connected body/prop projections across native 64×96 and independently rasterized direct 28×42; profile prop contact 2/2; semantic proportion/annotation validation passed. Evidence includes 24 native, 24 direct 28×42 and 24 enlarged captures, 69 roster face crops, six new face studies and six matched face-comparison rows.
- **Manual visual inspection: PASS WITH REVIEW QUESTIONS.** Inspected native/direct body and prop comparison sheets, enlarged Sailor front and right-profile coil details, enlarged Painter front and left-profile brush details, matched face rows and Sailor/Welder rear comparison. Sailor's compact winding coil is visibly held in front/back and near-side right profile; Painter's flat wedge brush, handle and ferrule are legible in front/back and near-side left profile. Hand/prop contact is improved but still merits independent scrutiny at 28×42. Slicker is unchanged.
- **Slicker preservation:** all eight directional body/prop panels (four directions × two views) compare byte-for-byte with revision 18.
- **Separate full-workflow failure:** Run #810 fails at existing browser diagnostics, not the design-source steps. Existing checks report 180 console/resource errors (135 HTTP 404 responses plus 45 corresponding sound-load messages), pageErrors empty, scriptErrors empty, and golden snapshot gate **1 match / 23 changed**. Directional integrity 92/92, direct game-scale captures 20/20, role debug 12/12, prop audit 10 archetypes and gallery render passed. No golden snapshots or provenance were changed.
- **Status:** revision-21 design-source internal QA is PASS WITH REVIEW QUESTIONS. This is not production-renderer QA, owner art approval or a globally green browser run. Claude independent review is prepared in [package 06](SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-06.md), not yet sent or completed. All construction families remain UNASSIGNED; #15–23 remain held.

