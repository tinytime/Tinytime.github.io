## Fourth civilian batch — revision 21 exact-source checkpoint, Run #810 (2026-11-20)

- **Source and tested branch head:** `be1c0c012894ccae23b4cbce2ad06e523fb460c5`; revision-21 SVG blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`.
- **Exact evidence:** [Actions Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854).
- **Focused design-source checks PASS:** 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged captures; body preservation 12/12 with zero removed pixels; anatomy/prop connectivity 48/48; profile prop contact 2/2; semantic proportion/annotation validation passed. Slicker remains byte-identical to revision 18 across all eight body/prop direction panels.
- **Separate full workflow FAIL:** game-browser diagnostics failed with 135 audio/resource HTTP 404 responses plus 45 corresponding sound-load messages; pageErrors=0 and scriptErrors=0. Golden snapshot gate remains 1 match / 23 changed and unapproved. No golden snapshots or provenance were modified.
- **Additional ChatGPT artifact inspection:** opened the actual native and direct body/prop comparison sheets, matched-face comparison sheet, and enlarged Sailor-front and Painter-front/left-profile prop crops. The overall silhouettes remain directionally coherent; Sailor's hand/coil read is still compact and merits close direct-scale reviewer scrutiny; Painter's brush is identifiable but the hand/handle/head cluster is dense at game scale. Face studies remain provisional grayscale geometry. This is a limited supplementary inspection, not a complete all-crops reviewer verdict or approval.
- **Handoff:** the owner has approved the revision 21 silhouettes for Sailor (#12), Slicker (#13) and Painter (#14), following the owner's report of Claude approval. The Claude verdict itself is not yet recorded in GitHub; see the owner-approval record below. Construction-card/family and anatomy/pose/clothing/prop design work is now authorized. Palette/colour rendering, production renderer work, golden snapshot/provenance changes and roster #15–23 remain unauthorized/on hold.

---

## Owner silhouette approval — Sailor #12, Slicker #13 and Painter #14 (2026-11-20)

The owner has explicitly approved the **revision 21 silhouettes** for all three characters, following the owner's report that Claude approved the latest silhouette round. This approval is limited to the silhouette/design gate and authorizes progression into the next design stage: finalize the three identity/construction cards, assign and justify construction families, and develop anatomy/pose and clothing/prop integration against the approved silhouettes.

- **Approved design source:** revision 21 SVG, blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`; exact tested artwork source commit `be1c0c012894ccae23b4cbce2ad06e523fb460c5`.
- **Evidence:** [Actions Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854). Focused design-source checks passed; the overall workflow remains failed on the separate global browser-resource 404 and unapproved golden-snapshot gates described below.
- **Claude record:** approval is recorded here as reported by the owner in the project conversation. The actual Claude verdict/package response has not yet been added to GitHub, so its detailed findings and exact reviewed-source identity are not independently documented here. Attach or transcribe that verdict when available; do not invent review details.
- **Next authorized stage:** identity/construction cards, construction-family assignment, anatomy/pose and clothing/prop integration. Keep the approved silhouette contours as the baseline; any material silhouette change returns for review.
- **Not authorized by this decision:** palette/colour rendering, production renderer implementation/integration, golden snapshot or provenance changes, and work on roster #15–23. Face studies remain provisional unless separately approved.

## Fourth civilian batch — revision 21 exact-source internal design QA (2026-11-20)

The owner-authorized parallel design-stage work for Sailor (#12), Slicker (#13) and Painter (#14) has reached **internal design-source QA PASS**. Independent Claude review and owner approval remain pending.

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
- **Authority:** [Claude package 06](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-06.md) is prepared but not sent; no Claude verdict is recorded. All three construction families remain UNASSIGNED. No palette or production-renderer work is authorized; roster #15–23 remains held.

## Revision 19 — latest design correction pass (2026-11-20)

- **Current artwork source:** [revision 19 SVG](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-19.svg), latest source commit `0320663dd638f33f498a7a760ae505a7bdf0f208`.
- **Handedness (§13):** Sailor carries character-left (front viewer-right, rear viewer-left, visible right/near profile only). Painter carries character-right (front viewer-left, rear viewer-right, visible left/near profile only). Far-side props remain hidden; no profile mirroring inversion.
- **Sailor:** compact rope-loop grip/tail refinement added to front, rear and right profile. Body-only construction unchanged in this pass.
- **Painter:** brush head enlarged into a flat wedge with a distinct ferrule; grip connection clarified additively. Body-only silhouette unchanged in this pass. Garment transition and profile frame-clearance still require focused human review.
- **Slicker:** all eight body/prop direction panels are byte-identical to revision 18; no design changes.
- **Evidence:** [Run #752](https://github.com/tinytime/Tinytime.github.io/actions/runs/44801977936) is testing exact source commit `0320663dd638f33f498a7a760ae505a7bdf0f208`. Earlier Run #751 caught body-pixel erasure from white grip marks; those marks were removed to preserve all body-only pixels. Do not treat Run #751 as a pass.
- **Status:** design revision in progress; internal QA pending the final exact-source artifact and visual inspection. No Claude package prepared, no owner approval, no renderer implementation. #15–23 remain held.


## Fourth civilian batch — revision 18 design-source QA captured; independent review pending (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) remain design-stage candidates; **not owner-approved and not authorized for production-renderer implementation**. Current SVG is [silhouette exploration 18](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg), exact latest tested source commit 73774e27092de36fd88f45b0d5cb6c97f760c7ea.

- **Fresh exact-source evidence:** [Run #730](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551), artifact [14658967396](https://github.com/tinytime/Tinytime.github.io/actions/runs/44796157551/artifacts/14658967396). Design-source projection and semantic proportion/annotation steps PASS: 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged; 69 roster face crops, six new face crops and six matched face rows.
- **Structural audits:** all 12 body-only/prop-on comparisons preserve every body pixel. Connected-anatomy audit passes 48/48 projections (Sailor, Slicker and Painter × body/prop × four directions × native/direct scales). Painter's left-profile brush retains short bristle grooves while remaining one connected component at direct 28×42.
- **Props:** Sailor/right +172 added silhouette pixels, all in the intended region. Painter/left +153 total / +151 in the expected region. Counts are descriptive only; no arbitrary thresholds.
- **Sailor:** coil-to-palm bridge retained; front/right coil reads as a loop, but precise hand-to-rope grasp remains subtle and is an explicit Claude/owner review question.
- **Slicker:** integrated face-side-open hood, rear yoke/hem seams and shortened storm closure; no separate umbrella. Rear seam construction now preserves connected silhouette anatomy.
- **Painter:** front ferrule overlap corrected; profile handle-to-bristle contact corrected; two short internal grooves restore a brush-head cue without splitting the direct-scale silhouette. Compact hand/tool cluster remains dense and requires independent scrutiny.
- **Visual inspection:** exact Run #730 native/direct body and prop sheets, face comparisons, Painter profile brush details and key Sailor/Slicker detail crops inspected. Findings are recorded in the current Claude package; remaining reviewer questions are not treated as approvals.
- **Full workflow:** Run #730 overall FAILS at the separate global browser diagnostics step. Golden snapshot gate remains unapproved (1 match / 23 changed); 180 existing console resource/audio 404 entries; pageErrors and scriptErrors are empty. Five-civilian regression checks pass 92/92 directional integrity, 20/20 native and 20/20 direct captures, 12/12 role debug, 10 archetype prop audit and gallery render. No golden snapshots or provenance changed.
- **Review package 05** is refreshed to the exact Run #730 source and artifact. Claude independent review and owner approval remain pending. All construction families remain UNASSIGNED; no renderer integration or roster #15–23 work is authorized.

---


## Fourth civilian batch — revision 18 internal evidence captured; owner/reviewer gates pending (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) remain design-stage candidates; none is owner-approved. Renderer implementation is NOT AUTHORIZED. Current source: [silhouette exploration 18](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-18.svg). Exact tested source commit: `4045675e71854b08b2e2fb1ab5c879d7b2ea2ab6`.

- **Correction chain:** `a6a70e530328598a2f1663eb63587f88be780612` narrowed/shifted Painter's front ferrule to stop removing two body pixels; `cf65450591d673008a7a9262fe4cea4fd2bf2bd7` exposed a separate direct-28×42 disconnected Painter left-profile prop component; `4045675e71854b08b2e2fb1ab5c879d7b2ea2ab6` connected the profile brush handle to its bristle fan.
- **Exact-source Actions evidence:** [Run #721](https://github.com/tinytime/Tinytime.github.io/actions/runs/44794789910), tested SHA `4045675e71854b08b2e2fb1ab5c879d7b2ea2ab6`, artifact [14656889410](https://github.com/tinytime/Tinytime.github.io/actions/runs/44794789910/artifacts/14656889410). Design projection and semantic proportion/annotation steps PASS: 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged; 69 roster face crops and six matched face rows. All 12 body-only/prop-on comparisons remove zero body pixels. Painter body-only and prop-on connectivity each pass as one connected component in all four directions at both native and direct scales. Profile prop-region audit: Sailor/right 172 added pixels; Painter/left 161 total / 159 expected-region pixels; no arbitrary threshold.
- **Manual artifact inspection:** inspected actual native and direct body/prop comparison sheets, front prop group, Sailor/Welder rear comparison, matched 40×38 face rows, and enlarged Painter front/left plus Sailor front details. Slicker's hood opening, broad rain shell, shortened closure and rear rainwear cues read coherently in the four-view silhouettes. Painter's brush/hand/handle/ferrule/bristle assembly is connected in the final native and direct captures; the compact hand/tool cluster remains dense at 28×42 and should remain an explicit reviewer/owner scrutiny point. Sailor's coil remains visually legible as a loop, but the exact hand-to-rope grasp is still subtle and should be challenged in independent review. Face rows are geometric studies, not final rendered faces.
- **Full workflow status:** Run #721 overall FAILS at the separate game-browser diagnostics step. The golden snapshot gate reports 1 match / 23 changed because provenance remains unapproved; multiple existing audio/resource HTTP 404s also remain. `pageErrors` and `scriptErrors` are empty. The five-civilian review evidence reports 20/20 native and 20/20 direct game-scale captures, directional integrity 92/92, role debug 12/12, prop audit 10 archetypes, and gallery rendered. Its town-ground composite is diagnostic only, not a live NPC spawn test. No snapshots or provenance were changed.
- **Disposition:** revision-18 design-source automated checks PASS and the artifact has been visually inspected; the overall browser workflow does NOT pass. Internal design review is substantially evidenced but reviewer/owner gates remain. Prepare a fresh Claude package against this exact source/artifact only after all internal QA documentation is current; do not imply Claude has reviewed it. No production renderer, live integration, approved character art, snapshots or provenance changed. All three construction families remain UNASSIGNED; #15–23 remain held.

---




---

## Fourth civilian batch — revision 10 internal QA complete; Claude package 04 prepared (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) remain design-stage candidates; none is owner-approved. Internal QA and visual inspection of revision 10 are complete. [Claude review package 04](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md) supersedes packages 01–03.

- Exact tested source commit `8ae6a47055c6c75e361738b21c01d8b07b6830b4`; [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818).
- Design-source evidence: 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged; 69 roster face crops and six matched face rows. Profile prop-region audit: Sailor 172, Slicker 272, Painter 95 added pixels; all passed.
- Manual inspection covered all three body-only and prop-on four-view sets, direct-scale sheets, enlarged profiles, face comparisons and Sailor/Welder rear comparison. Revision 10 clarifies Slicker's front/back folded-umbrella silhouette; Claude should judge its direct-scale identity/contact. Sailor rope grasp and Painter brush contact/readability also remain reviewer questions.
- Overall browser workflow failed only at global gates: unapproved golden snapshots (1 match / 23 changed) and 135 existing audio/resource 404 console entries. Page/script errors empty; no snapshots/provenance changed. This is design-source evidence, not production renderer or town integration QA.
- All construction families remain UNASSIGNED. Renderer implementation NOT AUTHORIZED. #15–23 remain on hold.

## Fourth civilian batch — revision 10 internal QA complete (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) remain design-stage candidates; none is owner-approved. Internal capture and visual inspection of revision 10 are complete. [Claude review package 04](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md) is prepared against exact Run #678 evidence.

- Current source: [silhouette exploration 10](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg). Exact tested source commit: 8ae6a47055c6c75e361738b21c01d8b07b6830b4. Later SVG title correction is metadata-only; geometry unchanged.
- [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818): 24/24 native 64×96, 24/24 direct 28×42, 24/24 enlarged, semantic validation passed; 69 roster face crops and six matched face rows.
- Profile prop-region checks passed: Sailor right 172/100, Slicker left 272/100, Painter left 95/12. Actual body-only/prop-on sheets, direct-scale sheets, enlarged profiles, face comparisons and Sailor/Welder rear comparison were inspected.
- Revision 10 makes Slicker's front/back folded umbrella clearer at direct scale. Sailor's rope-loop grasp remains subtle and is an explicit Claude question; Painter's near-side brush grip and crop placement are improved.
- Overall browser workflow remains failed on global gates: unapproved golden snapshots (1 match / 23 changed) and 135 existing audio-resource 404 console entries. Page/script errors empty; no snapshots/provenance changed.
- All three construction families remain UNASSIGNED. No silhouette, face, prop or palette is owner-approved. Renderer implementation is NOT AUTHORIZED. #15–23 remain on hold.

## Fourth civilian batch — internal design evidence ready for Claude review (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) remain in design stage. Current evidence package 02 is ready for independent Claude critique; this is not final approval.

- Current source: [silhouette exploration 09](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-09.svg).
- Exact tested source commit: c74219986db2466122fe08ff3ad0bdcb012b5264.
- [Run #677](https://github.com/tinytime/Tinytime.github.io/actions/runs/44778420801), artifact [14650099995](https://github.com/tinytime/Tinytime.github.io/actions/runs/44778420801/artifacts/14650099995): design projections and semantic validation passed. Native 64×96 24/24; direct 28×42 24/24; enlarged 24/24; 69 roster face crops; six matched face rows. Near-side prop audit: Sailor 172/100, Slicker 272/100, Painter 95/12. Sailor/Welder rear silhouettes are visibly differentiated.
- Manual review: body-only constructions remain distinct. Painter brush profile is clearer and crop-safe. Claude should challenge Sailor's subtle coil grasp at game scale and Slicker's front/back umbrella read, which can resemble a pouch despite a clearer near-side profile.
- Overall browser workflow remains failed on the global golden snapshot gate (1/23) and existing audio/resource 404s; page/script errors are empty. No snapshots or provenance changed.
- [Claude review package 02](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-02.md) is current; package 01 is superseded.
- Construction families remain UNASSIGNED; no silhouettes, faces, props or palettes are owner-approved. Production renderer work remains NOT AUTHORIZED. #15–23 remain on hold.

## Fourth civilian batch — Sailor exploration authorized (2026-11-20)

- Owner approved the refined role directions for Sailor (#12), Slicker (#13) and Painter (#14), and authorized **Sailor silhouette exploration only**.
- Sailor has preliminary body-only and prop-on four-view studies plus a construction-card exploration: [silhouette sheet](qa-artifacts/fourth-civilian-batch/SAILOR-SILHOUETTE-EXPLORATION-01.svg), [construction card](qa-artifacts/fourth-civilian-batch/SAILOR-CONSTRUCTION-CARD-EXPLORATION-01.md).
- These are exploration candidates, not owner-approved silhouettes. Internal visual review and matched-scale roster comparisons remain to be completed before presenting the gate to the owner.
- QA refinements: body-only and prop-on four-view sets; actual matched-scale face comparison against the two closest existing faces before finalizing cues; anatomy/near-far arm construction before props, with four-view contact/handedness evidence.
- Sailor comparison priority: Clinic first (especially front and profiles, shoulder-to-waist contour and arm negative spaces), then Coach, Guard and Fisher. No numeric similarity threshold is introduced.
- Slicker (#13) and Painter (#14) are active in parallel under the superseding authorization; all three vector families remain UNASSIGNED.
- No palette or renderer work, no changes to approved characters, and no golden snapshot/provenance changes.

## Fourth batch preflight — Sailor, Slicker and Painter (2026-11-20)

**Fourth-batch characters:** #12 Sailor, #13 Slicker, #14 Painter. Identity briefs and proposed silhouette directions are prepared in [SAILOR-SLICKER-PAINTER-PREFLIGHT.md](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-PREFLIGHT.md). Their vector construction families remain UNASSIGNED until silhouette exploration and owner approval. These are hypotheses, not approved art.

**Owner handoff:** review the three identity/role hypotheses, then authorize or revise the four-view black silhouette exploration. Do not begin renderer implementation until silhouette and construction approvals are recorded. Work one character at a time.

## Third batch — owner approval and reviewer corrections (2026-11-20)

The project owner explicitly approved the Tech/Hacker/Fisher batch on 2026-11-20. Tech is approved at production-renderer stage; Hacker and Fisher are approved at finished design-art stage only. This does not mean Hacker/Fisher have production renderer implementations. Claude's post-correction re-review has not been separately recorded; preserve that review status honestly while following the owner's direction to prepare the next set.



**Current package:** [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE-REVISION-02.md).

- **Tech (#9):** first Claude verdict was PASS WITH NON-BLOCKING NOTES with P1 Tech/Clinic separation finding. Implemented darker desaturated petrol shell and squared storm-flap shoulder; Clinic unchanged. Targeted QA [Run #648](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752105957), artifact 14635417540, tested source cea601503504c6b23527452a66cc64c3cb93e7a7. Native/direct 4/4; zero edge contacts; role-debug 4/4; town spawn/close-up; wider integrity 92/92; face uniqueness 23/23; gallery/prop/Granny pass; page/script errors 0. Visual inspection of Tech/Clinic direct-scale comparison and town crop complete. Independent re-review pending; owner rendered-art acceptance pending.
- **Hacker (#10):** first verdict CHANGES REQUIRED. Front chest narrowed ~one-third; character-left bare forearm separated; left-profile drape tapered; temple notch and asymmetrical earbud strengthened. One compact slate and handedness retained.
- **Fisher (#11):** first verdict PASS WITH NON-BLOCKING NOTES. Right-profile pouch now matches smock with seam; rear yoke/smock is ochre with darker flap seam; unexplained inter-leg bar removed. Basket handedness and broad silhouette retained.
- Hacker/Fisher corrected design render [Run #9](https://github.com/tinytime/Tinytime.github.io/actions/runs/44752401697), artifact 14636805512, source SHA-256 5e20a05a445b4684c3a212bf6e55fd61b3abb230c557e5d7ab85842a6ab03a52; all eight views captured at 64×96 and direct design-projection 28×42, plus 4× enlargements. Render and visual inspection passed. Design-stage evidence only; no renderer integration.
- Overall Browser QA Run #648 remains failed at global unapproved snapshot gate (1/23 match) and existing 135 audio/resource 404s. No snapshots/provenance changed.
- **Status:** all first-review findings implemented; Claude re-review and owner acceptance pending. Hacker/Fisher renderer implementation remains held until Tech review/owner rendered-art approval and owner acceptance of H/F designs.

## Third-batch combined Claude review — 2026-11-20

**Review package ready:** [THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md](qa-artifacts/third-civilian-batch/THIRD-BATCH-CLAUDE-REVIEW-PACKAGE.md).

- Tech (#9): production renderer internally QA-passed and visually inspected in Run #644 / artifact `14634020084`; exact tested source `579f0fff61b8cfd4e416cc59381187b162d3b8ca`.
- Hacker (#10) and Fisher (#11): finished design-stage internal QA passed using corrected Playwright Run #7 / artifact `14634776106`; source `2b08e60d4814846923e133503f965532bde055ad`. No additional render required.
- Claude's independent review is pending for the three-character package. Owner acceptance is pending for Tech's rendered output and Hacker/Fisher's finished design artwork.
- Hacker/Fisher renderer implementation remains held until Tech's independent review and owner rendered-art approval, and owner acceptance of Hacker/Fisher designs.
- Preserve the evidence boundary: Hacker/Fisher scale captures are design projections, not production renderer output.

## Hacker (#10) and Fisher (#11) — finished design-stage vector study (2026-11-20)

- Finished colour design: [HACKER-FISHER-FINISHED-DESIGN-STUDY.svg](qa-artifacts/third-civilian-batch/HACKER-FISHER-FINISHED-DESIGN-STUDY.svg); design handoff: [HACKER-FISHER-DESIGN-REVIEW.md](qa-artifacts/third-civilian-batch/HACKER-FISHER-DESIGN-REVIEW.md).
- Approved round-05 silhouette exploration and 3× reference remain unchanged; all eight finished directions retain the accepted construction.
- Hacker character-right slate: front viewer-left, rear viewer-right, right profile only. Fisher character-left basket: front viewer-right, rear viewer-left, left profile only.
- Corrected Playwright design render [Run #7](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989) tested source `2b08e60d4814846923e133503f965532bde055ad`; artifact [14634776106](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989/artifacts/14634776106). Render/syntax/capture generation and artifact upload passed. Workflow commit/push failed on a non-fast-forward branch race; corrected PNGs remain in the artifact, not committed repository files. Run #6 outputs are superseded.
- Internal visual inspection of the corrected 1× sheet, native 64×96 montage, direct 28×42 montage and 4× nearest-neighbour enlargement confirmed one Hacker front slate with overlapping supporting hand, correct prop handedness/near-far visibility, distinct Hacker/Fisher silhouettes, and no visible clipping, detached large components, duplicate limbs or duplicate props. Direct 28×42 captures are design projections, not production renderer captures.
- **Status:** finished design-stage candidate; owner acceptance pending. No Hacker/Fisher renderer implementation or game integration. Existing Tech (#9) independent-review and owner rendered-art gates remain. No golden snapshots or provenance changed.

## Tech, Hacker and Fisher — round-05 silhouette render (2026-11-20)

**Tech latest checkpoint — Run #644:** [GitHub Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189), artifact [14634020084](https://github.com/tinytime/Tinytime.github.io/actions/runs/44746091189/artifacts/14634020084), tested exact branch HEAD `579f0fff61b8cfd4e416cc59381187b162d3b8ca`. Tech targeted captures: 4/4 native 64×96 and 4/4 direct 28×42; zero edge contacts at either scale; Tech role-debug 4/4; explicit live street spawn audit PASS and native 1× close-up generated. Wider QA: directional and visual integrity 92/92; zero detached large components; face uniqueness 23/23; general role-debug 12/12; prop audit and gallery PASS; Granny check PASS; page/script errors 0. Semantic annotation, syntax, module and NPC inventory checks PASS.

**Visual inspection:** ChatGPT inspected all four Tech directions at both scales, side-by-side Clinic comparisons, role-debug sheet and live town close-up. Both profile eye/brow cues read at 28×42; left-profile meter/hand contact is discernible. The revised angular side shell and rear high-mounted service loop/short split flap separate Tech from Clinic's wrap tunic and hip kit. No clipping or detached large components. Similarity diagnostics remain human-review prompts only: Clinic/Tech full-character IoU back 0.8775, front 0.8922, right 0.8562.

**Workflow disposition:** overall Actions FAILED at browser diagnostics because the snapshot baseline remains unapproved (1 match / 23 changed, no missing) and existing audio/resource diagnostics report 180 HTTP 404 console errors across 46 URL entries. Evidence generation and artifact upload succeeded. No golden snapshots or provenance were changed.

**Status:** built; targeted automated QA passed; visually inspected; ready for independent Claude exact-output review; owner rendered-art approval pending. Claude review is not yet recorded. Hacker (#10) and Fisher (#11) remain held pending Tech's independent review and owner approval.

**Review package:** [Tech renderer review package](qa-artifacts/third-civilian-batch/TECH-RENDERER-REVIEW-PACKAGE.md), updated to Run #644.

**Owner approval update (2026-11-20):** Round-05 Tech/Hacker/Fisher designs and renderer implementation are explicitly approved. Tech (#9) has now passed internal renderer QA and visual inspection in Run #644. Hacker (#10) and Fisher (#11) remain held until Tech's exact-output Claude review and owner rendered-art approval are complete.

**Tech implementation:** dedicated `drawTechVector` added and wired to `tech` in `npc_sprites.js` commit `67b397242996f675c4a257415e4620fa0d3a40ca`. Dedicated Tier-A capture QA added in `qa/vapor-city-browser-qa.mjs` commit `2eab7e84027f088ed8f9f7be5740547f590aa13d`. Run [44740192417](https://github.com/tinytime/Tinytime.github.io/actions/runs/44740192417) is in progress. Renderer QA and manual inspection remain pending; no approval of rendered Tech art is implied yet. No golden snapshots changed.


- **Art inspection:** PASS for all 12 silhouette views. Reviewer comparison reported black-silhouette IoU 0.997 against an independent render; the small difference was attributed to anti-aliasing. Tech's ear-cup cue, left-profile meter contact, Fisher's short right-profile hood lip, dark rear yoke with seams, and dark resting right-profile hand with knuckle seam were confirmed.
- **Text correction:** the first 3× PNG had two clipped text blocks at the right edge. Both were wrapped in the canonical SVG in commit `e25ac611ee17d12771cbf2815001b78f43090d7f`.
- **Final sheet render:** GitHub Actions [Run #2](https://github.com/tinytime/Tinytime.github.io/actions/runs/44739247661) succeeded. Chromium rendered exact 3× scale: 4800×3540 pixels. The generated PNG was retrieved and visually inspected; both wrapped text blocks are complete and clear of the right canvas edge. Artifact `14630192008`.
- PNG path: `project-background/qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-ROUND-05-3X.png`.
- **Approval gate:** art inspection is passed and the review sheet is render-complete. Explicit project-owner silhouette approval is still required before renderer implementation. Do not begin Tech until that approval is recorded.
- Renderer implementation, native 64×96 captures, direct 28×42 captures and game-scale renderer QA have not occurred. No golden snapshots were changed.

## Guard, Vendor and Clinic — corrected renderer QA (2026-11-20)

- Claude's targeted review findings were implemented in renderer commit `27c414b46d560ae9b4e2dd0f67b1936ce3d8f3c8`: Guard right-profile near-arm/hand cue; Vendor right-profile supporting hand/tray lip; clearer Guard and Vendor profile eye/brow marks; Clinic profile coil/tie shifted rearward for distinction.
- Run #625 ([run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44672166234), artifact `14599579908`) generated complete evidence but failed browser diagnostics. Its artifact was inspected. The Vendor right-profile tray/hand cue was then moved inward in renderer commit `8cc6836d4eff0a3cb8fcd997373da17769564e20` to keep the cue within the sprite frame.
- Run #626 ([run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44673031471), artifact `14599664923`) tested the exact follow-up commit and completed FAILED on global gates: unapproved golden snapshots (1 match / 23 changed) and 180 existing resource/audio 404 console errors. Semantic validation, 12/12 native and 12/12 direct game-scale captures, role debug 12/12, prop audit, directional integrity 92/92, zero edge contacts/detached large components, gallery and Granny directional checks passed.
- ChatGPT inspected all 12 native 64×96 and all 12 direct 28×42 captures. Guard's near arm/hand and Vendor's tray lip/supporting hand read in profile; Clinic's rear coil/tie helps distinguish the profile. No visible clipping or detached components were found. The Clinic pouch remains on the far side and is not visible in the right profile; the alternative coil-placement distinction is present.
- Status: Claude reviewed Run #626 and requested one final focused profile pass; implementation is committed as `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`. Fresh QA and artifact inspection are pending, followed by Claude's re-review of that exact output and owner approval. Do not alter golden snapshots or start the remaining 17. No approval is implied by implementation or automated passes.

## Claude targeted re-review and follow-up — 2026-11-20

Claude reviewed the corrected Run #626 package at renderer commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`. The Vendor right-profile tray/hand correction is resolved; the Guard right-profile arm remains too small; Clinic right profile lacks a near-side kit cue and has the highest remaining pair overlap with Guard at IoU 0.87; Guard and Vendor profile faces still read blank at game scale. Front/back views are unchanged and retain the prior assessment. No blocking defects were reported, but Claude recommended one more focused pass on these three profile-readability areas.

ChatGPT implemented that focused pass in `npc_sprites.js` commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`: extended Guard's right-profile forearm into a visible steel bracer and hand; strengthened Guard and Vendor profile eye/brow marks; and added a narrow near-side Clinic pouch strap/buckle cue to the right profile without moving or duplicating the pouch. This is implementation only. Fresh browser QA, artifact inspection at native 64×96 and direct 28×42 scales, and a new Claude review are pending. Preserve all front/back designs, unrelated civilians, accepted exceptions, and golden snapshots. Do not start the remaining 17 civilians until the independent review and explicit owner approval gates are complete.

## Guard, Vendor and Clinic — Run #627 (2026-11-20)

- Renderer commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b` received fresh browser QA [Run #627](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457), artifact [14611292138](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457/artifacts/14611292138). Overall Actions **FAILED** on browser diagnostics (unapproved golden snapshots and existing audio/resource 404s); targeted vector checks passed.
- All 12 native 64×96 and 12 direct 28×42 captures were inspected. Profile-only changes confirmed against Run #626; front/back remain byte-identical. Guard right forearm/bracer/hand, Guard/Vendor profile face marks, and Clinic right-profile near-side strap/buckle are visible. No clipping or detached geometry. Directional integrity 92/92, zero edge contacts, zero detached large components, profile face uniqueness 23/23, prop audit/gallery/town checks pass.
- Guard/Clinic right-profile full-character IoU 0.8547 remains a human-review prompt only; Vendor/Clinic right profile is 0.8326. Claude must provide the independent disposition on the exact Run #627 output. No owner approval yet; do not start the remaining 17 civilians.
- Evidence and Claude review criteria: [Run #627 review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).

## Guard, Vendor and Clinic — Run #628 / Run #629 follow-up (2026-11-20)

- Run #628 tested `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`: [Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539). Targeted captures and integrity checks pass, but overall Actions failed at browser diagnostics (unapproved golden snapshots and existing audio/resource 404s). No snapshots changed.
- All 12 native 64×96 and 12 direct 28×42 captures inspected. 92/92 directional integrity, zero edge contacts/detached large components, 23/23 unique faces at both scales, prop/gallery/town checks pass. Internal visual inspection found Vendor eye still insufficiently legible at game scale.
- Focused placement correction committed: `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`. Run #629 is in progress; do not close the Vendor face item until its direct 28×42 captures are visually inspected. Claude review and owner approval remain pending. Remaining 17 civilians stay on hold.


## Guard, Vendor and Clinic — Run #628 (2026-11-20)

- Tested renderer commit `a8f3689abfe50be5c6fb544789d0f26fb2d41e9f`; [Run #628](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485), artifact [14612581539](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700298485/artifacts/14612581539). Overall Actions **FAILED** at browser diagnostics. Syntax, inventory, semantic annotation validation, capture/evidence generation and artifact upload passed.
- The only renderer change since Run #627 is Vendor profile eye/brow placement. Inspected actual native and direct 28×42 profile montages plus enlarged Vendor L/R face crops. The marks now read in both profiles at native scale; at direct game scale they are subtle but visible. Cap brim/ear clearance is maintained. Guard right-profile forearm/bracer/hand and Clinic right-profile strap/coil remain present. No visible clipping or detached components in the inspected profile captures.
- Capture and integrity checks: Guard/Vendor/Clinic 12/12 native and 12/12 direct game-scale captures; wider five-civilian sheet 20/20 native and 20/20 direct game-scale; directional integrity 92/92; visual integrity 92/92; zero edge contacts; face uniqueness 23/23 at both scales; role debug 12/12; prop audit PASS; gallery and Granny directional checks PASS. pageErrors=0; scriptErrors=0.
- Silhouette diagnostics are review prompts only: maximum full-character IoU 0.9065 (back Coach/Guard); 0.85 remains a human-review trigger, not a gate. Preserve previously accepted distinctions/exceptions and do not redesign solely to chase overlap values.
- Global blockers: unapproved golden snapshot baseline (1 match / 23 changed, no missing) and 180 existing audio/resource HTTP 404 console errors across 46 URL entries. No golden snapshots or provenance changed.
- Next: Claude independently reviews the exact Run #628 artifact/commit, especially Vendor profile facial marks at both scales and preservation of tray/hand, Guard and Clinic details. Then owner makes explicit final decision. The three-character batch is not approved complete; remaining 17 stay on hold.

## Guard, Vendor and Clinic — Run #629 (2026-11-20)

- Renderer commit `2bc1629edd82afc1a50ac7a4ab882b428dbd0c32` received fresh QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), artifact [14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Overall Actions failed on global browser diagnostics (unapproved golden snapshots and existing audio/resource 404s); targeted vector checks pass.
- Internal inspection confirms Vendor profile eye is now legible in left/right native 64×96 and direct 28×42 captures. Guard and Clinic profile details retained. Capture audit 12/12 at both scales, directional integrity 92/92, zero edge contacts/detached components, face uniqueness 23/23 at both scales, prop/gallery/town checks pass.
- **Owner approval:** received 2026-11-20 for the rendered Guard, Vendor and Clinic Worker batch, based on Run #629.
- **Claude independent review:** exact-output review of Run #629 is still pending and must be logged before formal batch closeout. Keep remaining 17 civilians on hold until that gate is complete. Do not modify golden snapshots.


## Guard, Vendor and Clinic — Run #629 and owner decision (2026-11-20)

- Final renderer source for this round: [`2bc1629edd82afc1a50ac7a4ab882b428dbd0c32`](https://github.com/tinytime/Tinytime.github.io/commit/2bc1629edd82afc1a50ac7a4ab882b428dbd0c32). The final focused change moved Vendor's profile eye/brow inward onto the visible cheek plane after Run #628's automated face-distinctness checks passed but manual direct-game-scale inspection found the mark insufficiently legible.
- Browser QA: [Run #629](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613), [artifact 14613105475](https://github.com/tinytime/Tinytime.github.io/actions/runs/44700724613/artifacts/14613105475). Targeted vector/capture checks pass; overall Actions remains failed on the unapproved golden snapshot baseline (1 match / 23 changed) and existing audio/resource 404 console errors. No golden snapshots or provenance were changed.
- Inspected the exact Run #629 artifact: 12/12 native 64×96 and 12/12 direct 28×42 captures for Guard/Vendor/Clinic; Vendor's left and right profile eye now reads in both scales. Guard's near-side forearm/bracer/hand and Clinic's right-profile cord/coil remain present. Directional integrity 92/92, zero edge contacts and detached components, face distinctness 23/23 at both scales, prop audit, gallery, town smoke and Granny directional checks pass. pageErrors=0; scriptErrors=0.
- **Owner decision:** the project owner explicitly approved the rendered Guard, Vendor and Clinic Worker batch on 2026-11-20 after the Run #629 evidence review.
- **Independent-review record:** Claude's final independent review of this exact Run #629 commit/artifact is not yet recorded in the repository. Per the governing approval process, retain that as the outstanding independent-review gate; do not label the batch fully closed or release the remaining 17 until the exact-output review is logged. This records the owner's approval without fabricating reviewer sign-off.
- No golden snapshots changed. Existing global Actions blockers are tracked separately from the passing character-specific evidence.


## Third civilian batch — Tech, Hacker and Fisher (2026-11-20)

- Owner directed preparation to proceed without returning the prior Guard/Vendor/Clinic Run #629 output to Claude. This does not imply a Claude verdict on Run #629; its exact-output review remains historically unrecorded.
- The owner approved the round-05 Tech/Hacker/Fisher silhouette package and renderer implementation on 2026-11-20.
- Tech (#9) is implemented and internally QA-passed in Run #644 at source `579f0fff61b8cfd4e416cc59381187b162d3b8ca`, artifact `14634020084`. The current status and evidence are recorded at the top of this tracker and in the [Tech renderer review package](qa-artifacts/third-civilian-batch/TECH-RENDERER-REVIEW-PACKAGE.md).
- Tech's remaining similarity diagnostics are human-review prompts only; the exact-output Claude review and owner rendered-art approval remain pending.
- Hacker (#10) and Fisher (#11) renderer implementation remains on hold until Tech clears independent review and owner approval. Proceed one character at a time, with full native 64×96 and direct 28×42 four-direction QA and visual inspection after each.
- No golden snapshots or provenance were changed.
- Package: [Tech/Hacker/Fisher preflight](qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-PREFLIGHT.md); [round-05 four-view silhouette exploration](qa-artifacts/third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg).


## Hacker (#10) and Fisher (#11) — Internal design QA disposition (2026-11-20)

- Internal QA inspected corrected Playwright [Run #7](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989), source `2b08e60d4814846923e133503f965532bde055ad`, artifact [14634776106](https://github.com/tinytime/Tinytime.github.io/actions/runs/44748083989/artifacts/14634776106).
- Verified complete 1× sheet, all eight native 64×96 directional captures, all eight direct 28×42 design projections, and all eight 4× nearest-neighbour enlargements. Render report confirms complete 1680×1720 output and exact direction/scale inventory.
- **Internal design QA: PASS.** Hacker's corrected single front slate and supporting-hand overlap are intact; rear/right-profile placement and left-profile far-side occlusion are consistent. Fisher basket is correctly placed front viewer-right, rear viewer-left and left-profile only, with no right-profile duplicate. The two silhouettes, outfit masses and palettes remain distinct. No visible clipping, detached large components, duplicate limbs or duplicate props.
- Minor design-readability notes are recorded in [the internal review package](qa-artifacts/third-civilian-batch/HACKER-FISHER-DESIGN-REVIEW.md): retain the compact slate grip at 28×42; keep Fisher's right-profile hip detail subordinate and garment-integrated; facial micro-expression details naturally compress at game scale.
- Run #7's render, syntax, capture generation and artifact upload passed. Its PNG commit/push failed on a non-fast-forward branch race; the artifact is authoritative and corrected PNGs are not committed as repository files.
- **Finished-art owner acceptance remains pending.** Internal QA is not owner approval.
- No game renderer, live town integration, gallery integration, golden snapshots or snapshot provenance changed. Hacker/Fisher renderer implementation remains held by the Tech-first independent-review and owner rendered-art approval gate.


## Fourth civilian batch — current design QA and Claude handoff (2026-11-20)

- Current source: [revision 10](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-10.svg).
- Exact tested source commit: `8ae6a47055c6c75e361738b21c01d8b07b6830b4`.
- [Run #678](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334), artifact [14650399818](https://github.com/tinytime/Tinytime.github.io/actions/runs/44779104334/artifacts/14650399818).
- Design-source projection and semantic validation passed: 24/24 native 64×96, 24/24 independently rasterized direct 28×42, 24/24 enlarged 4× images; 69 roster face crops; six new face crops; six matched face rows.
- Near-side prop-region audit passed: Sailor/right 172 pixels, Slicker/left 272 pixels, Painter/left 95 pixels. Manual visual inspection confirms Sailor coil front/back/right only; Slicker umbrella front/back/left only; Painter brush front/back/left only. Props are hidden in the far-side profile.
- Body-only silhouettes remain distinct at direct 28×42. The proposed Sailor rear silhouette is visibly differentiated from live Welder in a matched native 64×96 comparison; the legacy 0.889 IoU trigger refers to existing roster renders, not proposed vector Sailor.
- Face comparison sheet is legible and labels Clinic/Guard, Hacker/Courier, Cook/Busker references. Face identity remains provisional for Claude's independent review.
- Town/gallery screenshots inspected as existing-scene smoke checks only. No production renderers or live integration for #12–14.
- Overall browser workflow failed the global unapproved snapshot gate (1 match / 23 changed) and 135 existing audio/resource 404 console errors. pageErrors=0, scriptErrors=0. No snapshots or provenance changed.
- **Current disposition: INTERNAL DESIGN-SOURCE QA PASS WITH REVIEW QUESTIONS.** [Claude review package 04](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-04.md) is prepared for independent review. Not owner-approved. Construction families remain UNASSIGNED; production renderer work is NOT AUTHORIZED; roster #15–23 remains on hold.


## Revision 21 — current internal design QA disposition (2026-11-20)

- **Design source:** [revision 21 SVG](qa-artifacts/fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg), exact artwork commit be1c0c012894ccae23b4cbce2ad06e523fb460c5.
- **Evidence:** [GitHub Actions Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056) · artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854). The workflow ran at branch head be1c0c012894ccae23b4cbce2ad06e523fb460c5; revision-21 SVG was unchanged from the exact artwork commit.
- **Focused automated design checks: PASS.** 12/12 body-preservation pairs (zero removed body pixels); 48/48 connected body/prop projections across native 64×96 and independently rasterized direct 28×42; profile prop contact 2/2; semantic proportion/annotation validation passed. Evidence includes 24 native, 24 direct 28×42 and 24 enlarged captures, 69 roster face crops, six new face studies and six matched face-comparison rows.
- **Manual visual inspection: PASS WITH REVIEW QUESTIONS.** Inspected native/direct body and prop comparison sheets, enlarged Sailor front and right-profile coil details, enlarged Painter front and left-profile brush details, matched face rows and Sailor/Welder rear comparison. Sailor's compact winding coil is visibly held in front/back and near-side right profile; Painter's flat wedge brush, handle and ferrule are legible in front/back and near-side left profile. Hand/prop contact is improved but still merits independent scrutiny at 28×42. Slicker is unchanged.
- **Slicker preservation:** all eight directional body/prop panels (four directions × two views) compare byte-for-byte with revision 18.
- **Separate full-workflow failure:** Run #810 fails at existing browser diagnostics, not the design-source steps. Existing checks report 180 console/resource errors (135 HTTP 404 responses plus 45 corresponding sound-load messages), pageErrors empty, scriptErrors empty, and golden snapshot gate **1 match / 23 changed**. Directional integrity 92/92, direct game-scale captures 20/20, role debug 12/12, prop audit 10 archetypes and gallery render passed. No golden snapshots or provenance were changed.
- **Status:** revision-21 design-source internal QA is PASS WITH REVIEW QUESTIONS. This is not production-renderer QA, owner art approval or a globally green browser run. Claude independent review is prepared in [package 06](SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-06.md), not yet sent or completed. All construction families remain UNASSIGNED; #15–23 remain held.


