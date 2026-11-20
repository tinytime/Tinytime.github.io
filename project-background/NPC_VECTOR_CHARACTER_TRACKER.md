# NPC Vector Character Design Tracker

## Current owner decisions and release status — 2026-11-20

- **Five-character approval:** Usher, Cook, Courier, Coach and Referee are owner-approved and complete following Claude Run #603. Preserve their accepted/deferred dispositions; no renderer changes without renewed owner authorization.
- **Run #603 provenance:** renderer `2c00cfca09cc12ea19a72662c235beed2e9a19cb`; [Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44658311124), artifact 14593339734. Targeted checks passed; overall Actions failed on snapshots 1/23 changed and 180 existing audio 404s. No golden snapshots refreshed or approved.
- **Construction standard:** ratified by the owner on 2026-11-19; it governs future civilian production.
- **Next batch QA:** Guard, Vendor and Clinic Worker Revision 02 designs were owner-approved on 2026-11-19. Run #624 tested renderer `28bf7d31938c3f7a574a3b9df48d2f73488a5d80` and QA harness `2bc8c39babf145878925adb3d78fd93d8a2296e3`; 12/12 native and 12/12 direct 28×42 captures (39px game anchor), dedicated 24/24 alpha bounds clear, palette/body/face audits, 92/92 directional integrity with zero edge contacts, prop audit, full gallery and town smoke check passed. Visual inspection complete. Overall Actions failed on the existing unapproved golden-snapshot gate; no snapshots changed. See [renderer QA and Claude review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).
- **Claude review / correction pass:** Claude's independent review found no blocking defects and recommended four targeted fixes (Guard right-profile near arm, Vendor right-profile tray/hand, stronger Guard/Vendor profile face cues, and Clinic rear-coil placement to separate the Vendor/Clinic right profiles). ChatGPT implemented these in renderer commit `27c414b46d560ae9b4e2dd0f67b1936ce3d8f3c8`. Run #625 completed with all 12 native and 12 direct 28×42 captures generated, but its report flagged Vendor right-profile tray edge contact at 28×42. ChatGPT visually inspected all 24 captures and moved the right-profile hand/tray inward in commit `8cc6836d4eff0a3cb8fcd997373da17769564e20`. Run #626 tested exact correction commit `8cc6836d4eff0a3cb8fcd997373da17769564e20` and artifact `14599664923` was inspected. The dedicated Guard/Vendor/Clinic audit passed 12/12 native and 12/12 direct 28×42 with zero edge contacts; 92/92 directional integrity, zero detached large components, prop audit, role debug, gallery and town smoke check passed. ChatGPT visually inspected all 24 captures plus gallery/town output; the Vendor right-profile tray now clears the edge and the four targeted corrections are visibly present. Internal QA is complete for this correction pass. Overall Actions remains failed on browser diagnostics (180 console errors, including 135 audio 404s; pageErrors/scriptErrors zero) and unapproved golden snapshots (1/23). No golden snapshots changed or approved. Claude's final independent review and explicit owner completion approval remain pending.
- **Runner:** built but excluded from Run #603; pending focused review and owner decision.
- **Remaining unstarted roster:** remains ON HOLD for renderer production pending character-specific owner-approved silhouette/brief preflight.

## Claude review and targeted correction pass — 2026-11-20

- **Independent verdict:** no blocking defects; four targeted visual corrections recommended before final owner completion approval.
- **Review evidence:** 12 native 64×96 and 12 direct 28×42 captures. No visible clipping, detached components or edge-clearance problems. The reviewer did not receive construction cards, renderer source or a Granny comparison; Courier's game-scale capture appeared to use an older anchor and was excluded from judgment.
- **Corrections committed:** [`27c414b`](https://github.com/tinytime/Tinytime.github.io/commit/27c414b46d560ae9b4e2dd0f67b1936ce3d8f3c8) adds Guard's near-side right-profile arm/hand while preserving the character-right bracer, exposes a partial Vendor right-profile tray lip and supporting hand, strengthens Guard/Vendor profile eye/brow marks, and shifts Clinic's low hair coil to the rear side in both profiles.
- **Preservation:** the approved Revision 02 identities, palettes, garment construction and must-survive items remain intact. No other civilian renderer changed. No golden snapshots refreshed, approved or replaced.
- **Verification:** Run #625 was triggered on the correction commit and is in progress; new native/direct captures still require inspection. All three remain IN PRODUCTION / NOT COMPLETE pending fresh QA, visual inspection and final owner approval.

## Guard / Vendor / Clinic Worker silhouette revision 02 — 2026-11-20

- **Review disposition:** the first exploration was returned for revision before renderer production. The review identified shared mannequin construction, weak Guard equipment silhouette, unreadable Vendor vest opening/pose/contact, insufficient Clinic wrap/stance separation, and missing face/comparison/shell-family/reduction evidence.
- **Revision 02 deliverables:** [four-view silhouette and face-study sheet](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-SILHOUETTE-REVISION-02.svg), [matched roster comparison sheet](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-ROSTER-COMPARISON-REVISION-02.svg), and [revised construction cards](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-CONSTRUCTION-CARDS-REVISION-02.md).
- **Construction changes:** Guard now has a broader protective wedge, braced character-right forearm and offset bent-knee stance; Vendor has a forward customer lean, advanced foot, open-waistcoat negative space and connected tray support; Clinic Worker has a tapered wrap tunic, shifted hip, angled feet and separated pouch/hand relationship.
- **Evidence:** the design comparison remains the approved Revision 02 preflight reference. Production render evidence is now available: 12 individual 64×96 captures and 12 direct 28×42 captures using the corrected 39px game anchor in Run #624 artifact 14600880214; the full 23-civilian × four-direction roster gallery (92 views) includes Field Clinic, City Guard and Street Vendor in all four directions. The separate 40-cell archetype-grid integrity check also passed.
- **Approved shell families:** Guard — protective wedge / articulated braced stance; Vendor — forward-leaning stall-service / tray-presenting stance; Clinic Worker — tapered wrap tunic / offset-hip stance. All three Revision 02 concepts are owner-approved; renderer targeted QA and visual inspection pass, independent review remains pending.
- **Status:** Revision 02 designs are OWNER-APPROVED. Dedicated vector renderers are implemented and dispatched. Internal targeted QA and visual inspection pass; all three remain IN PRODUCTION / NOT COMPLETE pending Claude review and final owner acceptance.
- **Current blocking issue:** the earlier revision 02 SVG reused the front geometry for back/left and mirrored it for right. The current focused directional-construction revision replaces those placements with distinct view-specific paths. The roster comparison is already present; it is not an outstanding deliverable.
- **Next gate:** Claude reviews the prepared package and eight pairwise overlap triggers. ChatGPT evaluates valid findings, fixes and retests. Then the owner gives final completion approval. Do not change golden snapshots.

## Guard / Vendor / Clinic Worker silhouette exploration — revision 01 history

The initial exploration and cards remain in Git history as the first submission. They were returned for revision and are superseded by revision 02 for current review.

## Claude independent re-review — Run #600 (2026-11-20)

- Verdict: **Ready with disclosed minor issues**; no P0/P1 findings. Not owner approval.
- Claude's Run #600 review identified Cook C1, Usher U4 and Usher U2 as P2s; see the current owner dispositions above. U4 was the only authorized correction and is now internally resolved.
- Face standard: two distinct native-scale face-construction cues plus one head-read cue at direct 28×42; interior facial marks need not survive.
- Coach/Courier rear: accepted shared body mass with distinct role construction; preserve the written rationale, no redesign.
- Walk-frame evidence was absent from Run #600; next package needs at least two frames per direction for animated characters.
- Town-ground composite is diagnostic only; black silhouette sheet is alpha-derived, not anatomical segmentation.
- All five remain **NOT APPROVED**. Owner dispositions are recorded above; U4 is the only authorized open renderer correction. See [Claude re-review log](qa-artifacts/five-civilian-corrections/CLAUDE-REREVIEW-RUN-600.md).


## P2 renderer iterations and internal QA — 2026-11-20

**Current renderer source:** `3d1ec4bcbac231e99e75d36f21e79a5fcf7fd4eb`.  
**Evidence:** [Run #599](https://github.com/tinytime/Tinytime.github.io/actions/runs/44650509863), artifact `14590034123`.  
**Expanded evidence package:** [Run #600](https://github.com/tinytime/Tinytime.github.io/actions/runs/44650864326), artifact `14591690387`, generated the black silhouette sheet and town-ground composite on QA evidence-builder commit `90c5d266279c61461b460b024ee96e71f327e081`; renderer source remains `3d1ec4b`.

### Implementation and correction history

- `2b45201`: first targeted pass for Usher shoe value, Cook pan/hand and the three face designs. Run #596 confirmed syntax/module, 20/20 native, 20/20 direct 28×42, 92/92 integrity, 12/12 role-debug and prop audit. Human inspection showed Cook's pan still read too much like a mug.
- `7d95cce`: made Cook's grip/handle longer and shifted the hand; lowered Cook/Courier brows to exposed face regions. Run #597 caught Cook left/right edge contacts; rejected as not ready.
- `48a74ca`: reshaped the Cook pan profile and moved it inward; added exposed facial cues for Usher and Courier. Run #598 caught a Cook front edge contact; rejected as not ready.
- `3d1ec4b`: flattened the front sauté-pan bowl and drew the handle visibly over its lower edge before the gripping hand. Run #599 then passed 92/92 directional integrity with zero edge contacts, 20/20 direct game-scale captures, 12/12 role-debug, prop audit and gallery. Syntax/module checks pass; page/script errors are zero.
- Claude's F1, U1 and C1 are **implemented, internally inspected and pending independent re-review**, not approved. X1 is documented and visually supported; no Coach/Courier torso changes were made.

### Before/after pixel-diff summary

Compared Run #595 baseline captures (renderer `c354abf`) with Run #599 (renderer `3d1ec4b`). Counts are changed pixels per exact image, not quality scores:

| Character / view | Native 64×96 changed pixels | Direct 28×42 changed pixels |
|---|---:|---:|
| Usher front | 120 | 48 |
| Usher back | 0 | 0 |
| Usher left | 111 | 34 |
| Usher right | 111 | 34 |
| Cook front | 276 | 83 |
| Cook back | 0 | 0 |
| Cook left | 221 | 66 |
| Cook right | 221 | 65 |
| Courier front | 70 | 25 |
| Courier back | 9 | 6 |
| Courier left | 42 | 19 |
| Courier right | 42 | 17 |
| Coach all four | 0 | 0 |
| Referee all four | 0 | 0 |

The pixel diffs localize the changes. Review the same-named native and direct game-scale PNGs in the two run artifacts for actual before/after comparison. Coach/Courier rear images are unchanged; X1 is handled by documented construction rationale and side-by-side evidence, not by artificially changing the silhouettes.

### Run #599 overall result and known gates

The browser job still concludes FAILED because the existing diagnostics count 180 expected missing-audio resource 404s; pageErrors=0 and scriptErrors=0. The global 23-civilian silhouette gate remains at Clinic/Sailor front IoU 0.9094292803970223, outside this correction group. Golden snapshots remain unapproved (1 match / 23 changed). No snapshots were refreshed or approved. These are not evidence that the P2 character corrections failed.

### Visual inspection

- Usher: both profile shoes are now dark and clearly separated from the pale trouser planes at direct 28×42.
- Cook: front pan is now a shallow skillet rather than a tall cup shape; side views retain a separate pan profile and connected grip. No edge clipping or detached components remain in Run #599.
- Courier/Usher/Cook: front and profile face construction now has purposeful character-specific differences; the three faces remain small at 28×42, so Claude must verify that the distinctions are sufficient rather than relying on automated face hashes.
- Coach/Courier: rear comparison visibly distinguishes Coach's straight jacket hem and exposed side elbow/hand negative spaces from Courier's A-line coat and arms integrated into the coat; cap/hair and shoe values reinforce the distinction.
- Referee: pixel-identical to Run #595 in all four directions and both scales; preserved.

**Internal QA record:** [RUN-599-600-INTERNAL-QA.md](qa-artifacts/five-civilian-corrections/RUN-599-600-INTERNAL-QA.md). **Disposition:** targeted P2 corrections pass internal visual QA; all five remain NOT APPROVED. Send the corrected evidence to Claude for independent re-review. Owner approval remains the final gate; Runner and the remaining 17 remain excluded/on hold.

## Owner-authorized P2 correction pass — 2026-11-20

The owner has authorized implementation of all four P2 areas from Claude's Run #595 review.

- **F1 — face identity:** purposeful individual face cues for Courier, Usher and Cook, beyond skin tone, hair colour or headwear.
- **U1 — Usher:** stronger shoe/sole value separation from the pale trouser planes in both profile views at direct 28×42.
- **C1 — Cook:** visible pan handle extending from the gripping hand to the pan body; preserve cuff/forearm/hand continuity and ensure pan/rim reads at direct 28×42.
- **X1 — Coach/Courier:** document and evidence the accepted shared-body-mass distinction; no torso redesign unless fresh evidence shows the distinction is not legible.

**Renderer change:** `2b45201eb762a939547f5c8414ae9f44e5dc0d22` (npc_sprites.js).  
**Identity/proportion cards:** [IDENTITY-AND-PROPORTION-CARDS.md](qa-artifacts/five-civilian-corrections/IDENTITY-AND-PROPORTION-CARDS.md).  
**QA:** Run #599 tests renderer `3d1ec4b`; Run #600 adds the black silhouette and town-ground diagnostic sheets. See the current internal QA record and artifact links above.  
**Status:** corrections implemented in source, visual validation pending. All five characters remain NOT APPROVED. Referee is intentionally unchanged. Runner and the remaining 17 are out of scope. No snapshots or approvals changed.


## Independent Claude review — Run #595 (2026-11-19)

- **Review received:** independent comparative visual review of Usher, Cook, Courier, Coach and Referee.
- **Claude batch verdict:** **READY FOR OWNER REVIEW**, with P2 findings disclosed. This is not owner approval; all five remain NOT APPROVED.
- **Resolved round-one P1s:** Coach head/cap read, Cook connected forearm/hand/pan construction, and Usher coat/trouser/shoe separation.
- **No P0/P1 findings remain.** Coach/Courier rear similarity was reclassified to P2: acceptable shared body mass with distinct construction, marginally. IoU remains around 0.89; record the human rationale, not a numeric pass/fail.
- **P2 owner disposition:** F1 facial individuality for Courier, Usher and Cook; U1 Usher profile shoe separation; C1 Cook pan/hand and handle readability; X1 documented Coach/Courier rear distinction.
- **P3 optional polish:** Cook rear hand continuity; faint pale arc behind Coach's ear; cyan/orange rim-fringe preference; mirrored near-side prop convention; Referee plain back. Do not redesign Referee absent a demonstrated defect.
- **Scores:** Referee 7.5/10 (82/100); Cook 7/10 (73/100); Courier 6.5/10 (70/100); Coach 6/10 (65/100); Usher 6/10 (64/100). Scores are non-gating.
- **Evidence limits:** Claude inspected 20/20 native and 20/20 direct game-scale images and supplied composites. The ZIP lacked the black silhouette sheet, identity briefs, proportion cards and Actions logs. Claude did not inspect repository source or supporting docs 02/04. Town evidence did not prove all five were individually spawned.
- **QA:** [Run #595](https://github.com/tinytime/Tinytime.github.io/actions/runs/44645116652), artifact 14587318765; renderer c354abfa3d78b46dc982a03d2c5d1ece0c918257. Targeted checks passed; overall workflow FAILED on global Clinic/Sailor front silhouette and unapproved golden snapshots. Audio 404s are expected non-blocking noise. No snapshots were refreshed or approved.
- **Current disposition:** ready to present to owner with P2s visible. None is approved. Resolve or explicitly accept P2s before final approval. Runner remains excluded; remaining 17 remain ON HOLD.

## Five-character Claude correction round — 2026-11-20

- **Working renderer source:** `c354abfa3d78b46dc982a03d2c5d1ece0c918257` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/c354abfa3d78b46dc982a03d2c5d1ece0c918257).
- **QA:** [Run #595](https://github.com/tinytime/Tinytime.github.io/actions/runs/44645116652), artifact [`14587318765`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44645116652/artifacts/14587318765). The artifact contains all 20 native 64×96 and all 20 direct 28×42 captures for Usher, Cook, Courier, Coach and Referee, plus both contact sheets, focused Coach/Courier rear comparisons, Cook prop-contact sheets, Usher game-scale readability sheet, gallery and town captures.
- **Corrections in this pass:** Coach's silver temple details are narrowed to sideburns, the bright cap-crown highlight was removed, and the jacket hem was straightened to distinguish its back construction from Courier. Cook's pan handle/hand draw order was corrected so the hand overlaps the handle, with visible cuff/forearm connections in front and profile views. Usher's coat/trouser values, waist separation, badge simplification and shoe contrast were adjusted; a follow-up specifically lightened the near/far trouser planes and shoes in profile.
- **Visual inspection:** the actual native and direct game-scale contact sheets and focused comparison sheets were opened and inspected. Coach/Courier back silhouettes now have a clear difference in jacket length/hem construction, not just palette or emblem. Cook's hand visibly overlaps the pan handle in front and profile captures. Usher's side trouser planes and shoes now separate more clearly at game scale. Referee remains unchanged; its raised card/arm, stripes, red shorts and white socks are preserved. Courier's parcel, satchel, strap and teal/gold palette are preserved.
- **Automated results:** semantic annotation validation PASS; Granny semantic capture PASS; six-civilian annotation overlay PASS (24/24); five-character review evidence generation PASS; native captures 20/20; direct 28×42 captures 20/20; directional integrity 92/92; role debug 12/12; prop audit and gallery capture PASS. Town integration screenshot was captured as scene-regression evidence; it is not proof that each of the five named characters was individually spawned in that scene.
- **Overall workflow:** Run #595 concluded FAILED at browser diagnostics. The report retains the global full-roster silhouette gate (max IoU 0.9094292803970223; Clinic/Sailor front is the known maximum) and unapproved golden-snapshot gate (1 match / 23 changed). Expected branch audio 404s remain non-blocking environment noise. No golden snapshots were refreshed or approved.
- **Status:** the correction work is implemented, the evidence was generated, and the actual contact sheets were visually inspected. This is **not** character approval or final internal sign-off. Usher, Cook, Courier, Coach and Referee remain **NOT APPROVED / Claude review complete; awaiting owner decision and P2 disposition**. Runner remains excluded. The remaining 17 civilians remain ON HOLD. No construction-standard text was changed.


## Current release gate — 2026-11-19

This section supersedes older status statements below where they conflict. Historical run notes remain unchanged as historical records.

- **Construction standard:** operational as a controlled build-and-review method, but still awaiting independent Claude review and owner ratification. Use it now to develop and document the next designs; do not treat its provisional proportion bands, scorecard weights or score floors as acceptance gates.
- **Silhouette recommendation:** retain the existing pairwise silhouette audit as a *diagnostic review trigger*. Do not turn the observed 0.90 alert into a universal artistic acceptance threshold, and do not reshape a character merely to optimize IoU. The reported maximum pair is Clinic/Sailor front at 0.9094292803970223; Coach/Courier back at 0.890479 is a secondary watch item. These are roster-wide findings, not evidence that the five-character correction group fails. Require the report to name the exact pair/direction, show both actual renders at native and game scale, and record a human decision: genuine identity collision, acceptable shared body mass with distinct role construction, or inconclusive. Escalate genuine collisions for design correction; retain accepted exceptions with rationale. Keep silhouette similarity separate from semantic-mask fit, anatomical proportions, and visual quality review.
- **Current first-review group:** Usher, Cook, Courier, Coach and Referee are in the owner-authorized correction/review round. The three previously owner-approved designs were reopened; prior approvals are historical only. Runner is excluded from this Claude submission and remains for a later focused review.
- **Release decision:** the remaining 17 civilians are **ON HOLD** for production rollout. The standard may inform planning and future briefs, but do not begin the remaining batch until the five-character correction set has fresh four-direction/native and direct game-scale evidence, internal QA, independent Claude comparative review, and explicit owner approval of the direction/standard.
- **Latest Granny diagnostic QA:** Run #591 verified the landmark-sheet presentation and output manifest, plus the targeted semantic, capture, overlay, directional, gallery and town checks. Granny's semantic polygon/landmark candidates remain unverified; pixel-derived contours matching renderer alpha do not prove anatomical correctness. Granny remains `reference_only`; no ratio calibration or candidate promotion is authorized.
- **Workflow interpretation:** the #591 GitHub Actions run itself concluded FAILED. Its substantive blockers include the global silhouette gate and unapproved golden snapshots (1 match / 23 changed). Missing audio assets/404s are expected on this branch and are non-blocking environment noise for project assessment; do not spend time adding/fixing audio or count those 404s as a character defect. Do not rewrite the historical Actions conclusion. No golden snapshots were refreshed or approved.
- **Next sequence:** finish and render the five-character correction pass; update the five-character evidence package against the current source; run and inspect fresh QA artifacts; submit that exact evidence to Claude; resolve valid findings; obtain owner approval; only then release the remaining roster.


**Project:** Vapor City civilian NPC vector redesign  
**Branch:** `npc-granny-baseline-overhaul`  
**Latest renderer source:** `23c792f7e83eb14ff7d48e197678272f1c3e58b0`. Latest combined QA evidence is run #464 / artifact `14568746641`; it contains native 64×96 captures for all six vector civilians and direct 28×42 captures for the five review characters. Runner's direct game-scale captures are available from run #457 / artifact `14563778383`; Runner's draw path is unchanged between the two renderer sources. [Run #463](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178) confirmed 20/20 direct `owCiv` captures. [Run #464](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571) verified the paired contact-sheet generator and uploaded [artifact `14568746641`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571/artifacts/14568746641), containing 20 native 64×96 images, 20 direct 28×42 images, and native/game-scale 4× sheets. Run #464 summary: native captures 20/20, game-scale captures 20/20, directional integrity 92/92, role-debug 12/12, props and gallery pass. Overall workflow remains failed on global silhouette overlap (max IoU 0.909429; Coach/Courier back is among the closest pairs) and unapproved golden snapshots (23 changed / 1 match); page/script errors are 0 and audio-resource 404 console errors remain. No golden snapshots refreshed or approved. Five review characters remain NOT APPROVED pending visual inspection, Claude re-review and owner decision.

> This is the live status document. Update it after each meaningful design, integration, QA, and review milestone. The project background and working rules are in this folder's [README](README.md).

## Approval standard

A character is **Approved** only after:
1. The custom vector design is complete and visually distinct.
2. Internal QA passes for front, back, left, and right views, scale/foot baseline, silhouette, face, palette, props, and town readability.
3. Claude independently reviews the actual renders against the Granny Volt 10/10 benchmark and recommends approval.
4. Any review changes are addressed and rechecked.
5. The project owner accepts the result.

A passing automated test alone does not mean the design is approved. Do not approve or refresh golden snapshots without explicit project-owner authorization.

## Benchmark

| Character | Role | Status | Notes |
|---|---|---|---|
| Granny Volt | Visual quality benchmark | **APPROVED — 10/10 baseline** | Reference for quality, finish, readability, and consistency. Do not copy her silhouette, outfit, signature props, or palette. |

Reference image: [Granny vs. vector Usher at 4×](../docs/granny_vs_vector_usher_4x.png). Measured scale and directional reference: [qa/granny-ref.json](../qa/granny-ref.json).

## Historical first three-character vector batch — previously owner approved; reopened for revision

The first review batch is three characters total. Once all three are built and internally checked, send the complete set to Claude for a comparative review alongside Granny Volt.

| Character | Role / identity | Status | Internal QA | Claude review | Notes |
|---|---|---|---|---|---|
| Usher | Civic / venue usher; cap, clipboard, formal uniform | **REOPENED — REVISION IN PROGRESS** (prior owner approval retained in history) | Targeted checks passed; four-direction render captured | Comparative review history recorded; owner accepted batch | First vector pilot. Navy/steel direction with restrained brass accents; distinct from Granny. |
| Cook | Food service / chef | **REOPENED — REVISION IN PROGRESS** (prior owner approval retained in history) | Run `44537588645` / commit `5ed3f49`: palette, body/baseline, face, role-debug, prop, four-direction visual-integrity, town and gallery checks passed; 4× directional renders inspected. Overall workflow failed on unrelated global silhouette and unapproved golden-snapshot gates; audio asset 404s also logged. | Comparative review history recorded; owner accepted batch | Dedicated vector path: tall pleated toque, double-breasted cream coat, terracotta apron with ties/pocket, copper sauté pan. Latest refinement widens coat/apron silhouette and connects the pan grip visibly to the hand. First batch is owner-approved; no golden snapshots changed. |
| Courier | Delivery / messenger | **REOPENED — REVISION IN PROGRESS** (prior owner approval retained in history) | Run #410 / source commit `98dbcda2a32fa506ba355f12ddd449db3322a4b4`: syntax/module, 3-vector palette, body/baseline/contrast, 23-unique-face, 92-capture visual-integrity, prop, role-debug, town and gallery checks passed. Actual native 64×96 front/back/left/right captures and 4× role-debug/gallery evidence inspected. | Focused correction re-review package prepared; owner accepted corrected batch | Profile face is visible in both side views; compact messenger satchel is consistent across views and sits on viewer-right in the rear view (character's right hip); detached hem stripe removed. Overall workflow failed only on global legacy silhouette and unapproved golden-snapshot gates. 23 snapshots differ, 1 matches; no refresh/approval. No page/script errors; 135 audio-resource 404s. |

## Historical next character batch: Runner, Coach, Referee — 2026-11-19

The project owner approved the first batch (Usher, Cook, Courier) on 2026-11-19 and authorized the next three-character group. Runner, Coach, and Referee are built and have passed the targeted visual checks, with the Courier baseline audit still flagged in the latest combined six-civilian run. Run #457 tested exact source `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`; artifact `14563778383` was inspected. All 24 native views for the six completed civilians and 12 direct 28×42 captures for Runner/Coach/Referee were inspected. Runner's side stride has two legs/two feet; Cook's toque has clear top headroom. All three remain NOT APPROVED pending Claude comparative review and owner acceptance. The standard town screenshot does not explicitly spawn Coach or Referee, so it is scene-regression evidence rather than character-specific live-town proof.



## Expanded six-civilian comparative review — 2026-11-19

The owner initially requested a review of all six, then reduced the scope to five to fit Claude's usage: **Usher, Cook, Courier, Coach and Referee**. Runner is deliberately excluded for this round because it shares the athletic archetype with Coach and Referee; this is not deletion, rejection or approval. Runner remains built and awaits a later focused review. The new handoff is [Claude's five-civilian review package](../qa-artifacts/five-civilian-full-review/README.md). It explicitly links the authoritative live renderer **[npc_sprites.js](../npc_sprites.js)** at exact tested source `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`, the raw source, and run #457's six-character image evidence (with the five in-scope characters identified).

Claude's deliverables: individual scores/verdicts and ranked required/optional fixes for the five in-scope characters; a five-character comparative ranking; an overall batch verdict; and a technically actionable Vapor City Civilian Vector Build Standard. The standard must reduce avoidable iteration with a design brief, preflight checklist, four-view planning, construction rules, implementation conventions and QA gates—without imposing a shared body/template or sacrificing bespoke identities.

Status has now changed by explicit owner instruction: Usher, Cook and Courier are REOPENED — REVISION IN PROGRESS; their earlier owner approval remains part of the historical record, but is not current approval of the revised designs. Coach and Referee remain BUILT — NOT APPROVED and are also in the correction pass. Runner remains BUILT — NOT APPROVED and is excluded only from this review. The remaining 20 remain ON HOLD until the owner reviews Claude's findings and approves the standard. No golden snapshots were refreshed or approved. The package is prepared in GitHub; it has not been transmitted to Claude externally.

## Run #457 — combined six-civilian polish verification (2026-11-19)

- **Exact renderer source:** `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0).
- **QA run:** [#457](https://github.com/tinytime/Tinytime.github.io/actions/runs/44592153167), job `135800700792`, artifact `14563778383`.
- All six civilians' native 64×96 front/back/left/right captures inspected (24 total). Direct 28×42 game-scale captures inspected for Runner, Coach and Referee (12 total); role-debug, gallery, Granny comparison, town scene and report inspected.
- Requested eye catchlights, Courier forward lean, Cook pan/toque design and Runner stride paths were already in the renderer source tested by run #453. Final follow-up preserves these, removes an accidental duplicate Runner trailing-leg draw, restores Cook's prior eye treatment, and compresses the Cook toque crown vertically so every view has transparent headroom. No body baseline or toque band repositioning.
- **Passes:** syntax/module, palette, face distinctness 23/23, game-scale capture 12/12, role-debug 12/12, directional visual integrity 92/92 (zero edge contacts/detached components), prop audit, silhouette-quality 180/180, gallery and town regression; page/script errors 0. Visual inspection confirms Cook headroom and a two-leg/two-foot Runner side stride.
- **Fails:** NPC body/baseline check flags Courier baseline delta 2 against the vector threshold of 1. Global type-silhouette audit flags Clinic/Sailor front IoU `0.9094292803970223`; golden snapshots remain unapproved (23 changed / 1 match); 180 missing-audio 404 console errors remain. No snapshots refreshed or approved.
- **Status:** internal visual integrity and requested polish verified; overall workflow FAILED on the gates above. Runner/Coach/Referee remain NOT APPROVED pending Claude's full six-character review and owner approval. Remaining 20 remain ON HOLD.
- The updated [six-civilian Claude review package](../qa-artifacts/six-civilian-full-review/README.md) points to this source and artifact.


## Full civilian roster

The five approved designs are complete. Runner remains built but pending a focused review. All other designs remain unapproved until their own design and review are complete.

| # | Character | Current design status | Internal QA | Claude review | Notes |
|---:|---|---|---|---|---|
| 1 | Runner | **BUILT — PENDING FOCUSED REVIEW; NOT APPROVED** | Run #457 (`44592153167`), source `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`, artifact `14563778383`. Native 64×96 four-direction capture inspected; direct 28×42 captures also inspected. Runner stride reads as two legs/two feet; visual integrity 92/92 and role-debug/game-scale capture audits pass. | Pending — full six-civilian comparative review | Mid-stride coral sprinter with bib 07, sweatband, stopwatch and technical shoes. One trailing-leg draw only; no third foot. |
| 2 | Coach | **APPROVED — OWNER SIGN-OFF 2026-11-20** | Run #603 native/direct-scale sheets reviewed by Claude. | Claude Run #603: 7.5/10; no P0/P1; owner approved | Forest-green team jacket, cream shoulder yoke, silver-templed hair, marked clipboard and gold whistle. Preserve accepted rear construction. |
| 3 | Referee | **APPROVED — OWNER SIGN-OFF 2026-11-20** | Run #603 native/direct-scale sheets reviewed by Claude. | Claude Run #603: 8.5/10; no P0/P1; owner approved | Black/ivory striped official shirt, vermilion shorts, tall socks, whistle and raised yellow card. |
| 4 | Courier | **APPROVED — OWNER SIGN-OFF 2026-11-20** | Run #603 native/direct-scale sheets reviewed by Claude. | Claude Run #603: 8.5/10; no P0/P1; owner approved | Messenger A-line shell, parcel, satchel and cross-body strap; preserve accepted construction. |
| 5 | Guard | **DESIGN APPROVED — TARGETED QA PASS / CLAUDE REVIEW PENDING** | Pending | Pending | Run #624: 4/4 native and 4/4 direct 28×42 captures; zero edge contacts; helmet top clearance verified. |
| 6 | Vendor | **DESIGN APPROVED — TARGETED QA PASS / CLAUDE REVIEW PENDING** | Pending | Pending | Run #624: 4/4 native and 4/4 direct 28×42 captures; zero edge contacts; tray edge clearance verified; pairwise overlap review required. |
| 7 | Cook | **APPROVED — OWNER SIGN-OFF 2026-11-20** | Run #603 native/direct-scale sheets reviewed by Claude. Preserve C1 as deferred/accepted; no renderer change. | Claude Run #603: 7.5/10; no P0/P1; owner approved | Rounded chef toque/curl mass, ivory coat, terracotta apron and compact handled copper pan. |
| 8 | Clinic worker | **DESIGN APPROVED — TARGETED QA PASS / CLAUDE REVIEW PENDING** | Pending | Pending | Run #624: 4/4 native and 4/4 direct 28×42 captures; pouch/hand separation inspected. |
| 9 | Tech | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 10 | Hacker | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 11 | Fisher | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 12 | Sailor | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 13 | Slicker | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 14 | Painter | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 15 | Welder | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 16 | Kid | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 17 | Kid 2 | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 18 | Mouse | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 19 | Busker | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 20 | Dancer | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 21 | Broker | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 22 | Usher | **APPROVED — OWNER SIGN-OFF 2026-11-20** | Run #603 exact-source QA; U4 resolved at native and direct 28×42. | Claude Run #603: 7.5/10; no P0/P1; owner approved | Formal navy uniform, peaked cap, clipboard and brass trim. Preserve U2 silhouette; U4 resolved. |
| 23 | Fan | **NOT STARTED — NOT APPROVED** | Pending | Pending | Fan variants will share the approved base design while retaining their variant-specific identity. |

## Owner approval and Run #603 closeout — 2026-11-20

- Owner approved Usher, Cook, Courier, Coach and Referee. First five-character batch is complete. Claude Run #603 recommended owner review with no P0/P1; this log records the distinct owner approval.
- Claude withdrew the outline criticism; no blanket outline pass. F2–F7 documentation/process revisions are recorded in the current standard. The standard still awaits explicit owner ratification.
- Current renderer batch: Guard, Vendor and Clinic Worker Revision 02. Dedicated vector draw paths are implemented and dispatched; browser QA and visual inspection are pending. Runner remains pending focused review; all other unstarted characters remain on hold.

## Ongoing decisions and review log

- **2026-11-19:** Usher vector pilot integrated. Run #393 targeted Usher checks passed. Overall browser workflow remained failed by the unapproved golden-snapshot gate and legacy civilian silhouette-overlap audit. These are tracked separately from Usher approval.
- **2026-11-19:** Agreed to complete three vector characters before the next Claude review: Usher, Cook, and Courier.
- **2026-11-19:** Cook's bespoke vector renderer integrated in `npc_sprites.js` with front/back/left/right compositions, pleated toque, double-breasted chef coat, terracotta apron and copper sauté pan. Browser QA now counts Cook as the second vector civilian and validates vector baseline/outline evidence. Commits: `1fdb0c2c501844b2a2589655334325833182d72d` (initial renderer), `421607e0940d29d572f72321d9b24645e6774cbf` (dispatch syntax correction), `08979b4320e95bdf597e3a8914d0a8f523a98d5f` (headroom/baseline correction), `d333e4562032162579f2ba6105f8336a14a9ef29` (Cook QA tolerances), `5c57947f9a08055282391c1dd4097245bf5c8924` (QA syntax correction), `08b4556a8ec4d1756ac3c7af698d4acb8bb8685a` (pan grip refinement). Run `44536883982` verified Cook's palette, baseline/body, face, role-debug, prop, and directional visual-integrity checks; town and gallery passed. Overall workflow remains failed on unapproved golden snapshots and global legacy silhouette overlap. Final pan-grip refinement is undergoing a follow-up run. Cook remains NOT APPROVED.
- **2026-11-19:** Project background handoff folder created. This tracker was moved here from `docs/NPC_VECTOR_CHARACTER_TRACKER.md`.
- **Approval rule:** Keep every new character marked **NOT APPROVED** until internal QA, Claude's independent review, and project-owner acceptance are complete.

- **2026-11-19 Cook QA review:** Inspected run `44537588645` and artifact `14536893339` for exact commit `5ed3f49cd7c7767a716383945236a33b4c82dcb8`. Cook-specific palette, body/baseline, face, role-debug, prop, four-direction visual-integrity, town scene, and gallery checks passed. Actual front/back/left/right 4× renders inspected: pan grip is visibly connected; revised rear/coat silhouette no longer appears among closest failing pairs. Overall workflow remains failed because global legacy civilian silhouette audit reports Clinic/Sailor and Coach/Vendor overlaps, and the golden snapshot baseline remains explicitly unapproved. Missing audio assets return HTTP 404; no page/script errors. No golden snapshots refreshed or approved. Cook remains NOT APPROVED pending comparative Claude review of the completed three-character batch and owner acceptance.

- **2026-11-19 Courier handoff:** Cook internal QA finalized. Cook-specific checks passed on commit `5ed3f49cd7c7767a716383945236a33b4c82dcb8` (run `44537588645`, artifact `14536893339` inspected); global legacy-silhouette and unapproved-golden gates remain separate failures. Courier is now the active third pilot and is assigned to the NPC Art Designer chat. Next handoff: once the dedicated Courier vector implementation is committed, route it to QA for four-direction, native-scale, town/gallery, clipping, and regression inspection. Keep Courier and all pilot characters NOT APPROVED pending comparative Claude review and owner acceptance.

- **2026-11-19 Courier implementation:** Dedicated `drawCourierVector` added to `npc_sprites.js` and wired into civilian dispatch. Its own storm cap, forward-leaning windbreaker, cross-body satchel, parcel prop, face, and four-direction compositions distinguish it from Cook and Usher. Renderer syntax check passed. Browser QA was extended to expect three vector civilians, include Courier in palette/body checks, and capture Cook/Courier/Usher role-debug views. Renderer commits `5876ba595989743eca40cf80b7271c083810bf69`, `5caf2cfc5eb96a50d332898c246b6308d25ceb65` (front satchel), and `87227b217fead5134d9dd375e67139c13097f49c` (visible parcel grip); QA commits `b6206240fb32ebaca11191fec0a81a1235889a77` and `a006d3cee143b7ac7b3a4ec2ed614eb0f604a551` (third-vector expectations); final run `44539341875` in progress. Courier remains NOT APPROVED until actual artifacts are inspected and the pilot batch receives Claude and owner review.

- **2026-11-19 Courier artifact follow-up:** Partial artifact from cancelled run `44538730042` (tested initial renderer commit `5876ba595989743eca40cf80b7271c083810bf69`) showed Courier front/back/left/right captures and gallery/town output. `civilianVisualIntegrityAudit`, face distinctness, props, role-debug, palette differentiation, torso-mask integrity, and vector silhouette-quality checks passed; Courier's palette audit produced 1,292 colors and 43 outline pixels. The initial run's palette audit failed only because its legacy-pixel count still expected 21 instead of 20 after Courier became the third vector sprite. Body audit also needed the vector Courier's antialiased outline exemption (the vector palette audit independently confirmed ink pixels). Full-body silhouette audit's closest global legacy overlaps remained Clinic/Sailor and Coach/Vendor; Cook/Courier rear overlap was 0.8517, below the 0.90 rendered threshold. The parcel looked detached at native size, so visible fingers were layered over its near edge; the front-view satchel was also enlarged. Fixes: renderer `5caf2cfc5eb96a50d332898c246b6308d25ceb65` and `87227b217fead5134d9dd375e67139c13097f49c`; QA correction `a006d3cee143b7ac7b3a4ec2ed614eb0f604a551`. Run `44539341875` is the first full workflow intended to test all fixes. The cancelled artifact is diagnostic only, not final approval evidence.

- **2026-11-19 Courier internal QA review:** Inspected completed run `44539341875` (job `135613259428`), artifact `14537616516`, and report for exact tested commit `a006d3cee143b7ac7b3a4ec2ed614eb0f604a551`; Courier renderer refinement is commit `87227b217fead5134d9dd375e67139c13097f49c`. Syntax/module load, inventory, three-vector palette evidence, body/baseline/contrast, 23-unique-face audit, six role-debug captures, 92-capture visual-integrity audit (no edge contacts or detached large components), Courier parcel/satchel prop audit, town scene, and gallery passed. Inspected actual front/back/left/right native renders, 4× role-debug, 1×/4× gallery, and town screenshot. Courier reads distinctly via swept cap, teal windbreaker, cross-body satchel, parcel, and unique face; Courier/Cook back-view IoU is 0.8517 (<0.90). No script/page errors. Overall workflow FAILED on pre-existing global legacy civilian silhouette audit (Clinic/Sailor front 0.9094; Coach/Vendor front 0.8990 and back 0.8912) and the explicit unapproved golden-snapshot gate (23 changed, 1 match; no refresh or approval). 135 console 404s are missing audio assets, not Courier runtime errors. Courier-specific internal QA PASSED; Courier remains NOT APPROVED pending comparative Claude review and owner acceptance.


- **2026-11-19 Independent Claude pilot review:** Claude inspected all 12 native directional renders plus role-debug, Granny comparisons, gallery and town evidence. Usher and Cook have no required character fixes; Courier has three: (1) add a readable face/profile to left/right views (major), (2) use one consistent messenger satchel in front/back/left/right, positioned on the character's right hip (major), and (3) remove or correctly attach the detached cyan stripe below the jacket hem in back/side views (minor). Claude recommends approval only after Courier fixes and reinspection; no pilot is approved. Reviewer also noted optional Cook pan/face, Usher side-prop/outline and leg-stance polish, plus a QA threshold documentation discrepancy. These are not required blockers. Reviewer did not approve or refresh goldens.

- **2026-11-19 Courier correction pass:** Renderer commit `98dbcda2a32fa506ba355f12ddd449db3322a4b4` adds a visible side-profile face and replaces the mismatched rear/side backpack with a compact messenger satchel, including a rear strap routed to the character's right hip. The detached cyan hem line was removed. Browser re-render, native-size inspection, four-direction reinspection and Claude follow-up are still required. Courier and the pilot batch remain NOT APPROVED.

- **2026-11-19 Courier corrected-art browser QA:** GitHub Actions run #410 (`44542492048`) tested exact source commit `98dbcda2a32fa506ba355f12ddd449db3322a4b4`; job `135624264131` completed and artifact `14537384741` uploaded successfully. Syntax checks, renderer module load, inventory, vector palette evidence (Courier 1,405 unique antialiased colors / 2,210 opaque pixels / 42 ink pixels), body height/baseline/contrast, 23 distinct faces at native and game scale, all 92 directional visual-integrity captures (zero edge contacts and zero detached large components), prop audit, six role-debug captures, town scene, and gallery passed. Inspected actual Courier front/back/left/right 64×96 PNGs enlarged nearest-neighbor, the 8× role-debug sheet, 4× 23-civilian gallery, and town screenshot. The side profile now has a readable eye/cheek/jaw/nose; the compact satchel appears at the hip in front/back/side views and is on viewer-right in the rear view; the detached hem stripe is gone; parcel grip remains visibly connected. Overall workflow **FAILED**: global all-civilian silhouette audit still exceeds its 0.90 full-body threshold for legacy pairs Clinic/Sailor front (0.9094), Coach/Vendor front (0.8990) and back (0.8912), Sailor/Welder back (0.8893), Clinic/Sailor back (0.8842), Clinic/Welder back (0.8718); Cook/Courier back is 0.8635 and below threshold. Golden snapshot gate remains unapproved (23 changed, 1 match); no snapshots refreshed or approved. 135 missing-audio 404s logged; no page or script errors. Courier targeted internal QA PASSED, not character approval. Handoff: QA and Independent Review Coordinator to verify the evidence independently and send corrected directional images plus role-debug evidence to Claude for focused re-review. Keep the other 20 civilians on hold and all three pilots NOT APPROVED.


- **2026-11-19 Courier correction independent QA verification:** Re-fetched run #410 (`44542492048`), confirmed completed browser job `135624264131` tested exact source commit `98dbcda2a32fa506ba355f12ddd449db3322a4b4`, and downloaded artifact `14537384741` (`vapor-city-browser-qa`). Independently inspected native 64×96 Courier front/back/left/right PNGs, the 8× Cook/Courier/Usher role-debug sheet, 4× full civilian gallery, and town screenshot. All three prior Claude-required corrections are visibly addressed: readable left/right profile face; consistent messenger satchel across views with rear placement on viewer-right (character's right hip); detached cyan hem stripe absent. Parcel remains visibly held. Report confirms syntax checks/module load/inventory, three-vector palette evidence (Courier 1,405 unique antialiased colors, 2,210 opaque pixels, 42 ink pixels), body/baseline/contrast, 23 distinct faces at native and game scale, 92-capture visual-integrity (zero edge contacts and zero detached large components), prop audit, six role-debug captures, town and gallery pass. No page/script errors. Overall workflow FAILED only on separate global gates: legacy silhouette audit max IoU 0.9094 (Clinic/Sailor front; additional Coach/Vendor, Sailor/Welder and Clinic/Welder overlaps) and unapproved golden snapshots (23 changed, 1 match); 135 audio-resource 404s logged. No golden snapshots changed or approved. **QA Coordinator verdict: Courier corrections pass internal visual verification; ready for focused Claude re-review; not approved.** The package has been updated with run #410 evidence, but Claude has not yet been contacted.

- **2026-11-19 QA Coordinator final verification:** Re-fetched run #410 / job `135624264131` and artifact `14537384741`; verified report source SHA `98dbcda2a32fa506ba355f12ddd449db3322a4b4`. Current branch head `db3f958351aa9994fab544dfb915ea0e2424708d` is 12 documentation-only commits ahead of tested renderer source. Re-inspected native Courier front/back/left/right, role-debug, 4× gallery, and town screenshot. All three prior Claude-required corrections are visibly resolved; parcel grip remains connected. Targeted QA passes; no script/page errors. The overall run remains failed on Clinic/Sailor front full-body IoU 0.909429 (>0.90) and unapproved snapshots (23 changed, 1 match). Other nearest pairs Coach/Vendor (0.898985 front; 0.891175 back), Sailor/Welder back (0.889290), Clinic/Sailor back (0.884215), Clinic/Welder back (0.871764), and Cook/Courier back (0.863465) are below 0.90 and are not threshold failures. Separate legacy `silhouetteQualityCheck` uses <0.85 and passes (max 0.827467). Prepared focused Claude package `vapor-city-courier-claude-rereview.zip`; not yet sent. All three pilots remain NOT APPROVED; other 20 remain on hold.

- **2026-11-19 owner decision:** Project owner approved the completed first batch—Usher, Cook, and Courier—and authorized the next group of three. The tracker records owner approval as the final decision; the prior Claude comparative review and Courier correction package history remain documented above without claiming that the prepared focused re-review was sent. Next group order: Runner, Coach, Referee. Runner is now in development; Coach and Referee remain unstarted pending Runner's internal QA.
- **2026-11-19 Runner implementation:** Added bespoke `drawRunnerVector` with an airborne sprint silhouette, cropped coral race singlet, split shorts, bib 07, terry sweatband, close-cropped curls, stopwatch, and technical shoes. Integrated ahead of legacy pixel layers; role-debug legend added. Renderer commits `129c7ed6e0f97d9029bd25ef12bed1d5f8524429` (initial), `ae550b0fc65ab9df4e23c510a473d7e7ad2b269e` (height/baseline correction; Cook transform restored), and `6905171293c04f34f3ee09c804c490082e1f3d57` (shortened singlet). Browser QA updated to expect four vector civilians / 19 legacy pixel sprites, validate Runner's antialiased vector baseline, and capture eight role-debug views across Runner/Cook/Courier/Usher; QA commit `ccd238161ca58a7d5743f7f4462ec7c8f7292e14`. Syntax checks passed; full browser QA and artifact inspection pending.

- **2026-11-19 Runner first QA review:** Run `44547198609`, artifact `14540998102`, exact QA commit `ccd238161ca58a7d5743f7f4462ec7c8f7292e14` (initial Runner renderer `129c7ed6e0f97d9029bd25ef12bed1d5f8524429`). Four Runner directional captures, 8× role-debug, town and gallery were inspected. Palette audit (1,052 unique colors / 1,852 opaque pixels / 32 exact ink pixels), palette differentiation, 23-face uniqueness, role-debug (8/8), props, gallery, town and silhouette-quality checks passed. Initial body check failed: Runner measured 76px vs 81px expected and baseline was two pixels high. Visual-integrity audit also caught Cook top-edge contact after an overly broad transform replacement. Corrective commit `fbf8de28ae3ab9f4f3f242e353f598695fcff011` attempted to set Runner height, but review traced the transform to Cook rather than Runner. Corrective commit `ae550b0fc65ab9df4e23c510a473d7e7ad2b269e` restores Cook's original scale and scopes vertical scaling to Runner; this is the currently tested revision. Run `44547955840` is still in progress; no artifact for the corrected revision has been inspected. Runner remains IN DEVELOPMENT — NOT APPROVED. Do not start Coach until the corrected run and visual review pass.

- **2026-11-19 Runner visual refinement:** Inspection of corrected artifact `14540254177` / run `44547955840` confirmed Runner body bounds exactly match the 81px target (height deviation 0; baseline delta 0), with palette, face, role-debug, visual-integrity, props, town and gallery checks passing. The 4× directional sheet still read the long singlet as a tunic, so the front/back/side hem and shorts boundary were tightened in commit `6905171293c04f34f3ee09c804c490082e1f3d57`. Browser run `44548532467` is the active validation for that latest visual revision; do not mark Runner internally complete until its artifacts are inspected.

- **2026-11-19 Runner internal QA complete:** Run `44548532467` / job `135645796007` tested exact renderer commit `6905171293c04f34f3ee09c804c490082e1f3d57`; artifact `14540104692` inspected. `npcPaletteCheck` passed (19 legacy pixel sprites / 4 vector sprites; Runner 1,083 unique antialiased colors, 1,904 opaque pixels, 20 ink pixels); `npcBodyCheck` passed (Runner body height 80px, deviation 0.4375px, baseline delta 1); 23-face distinctness passed; role-debug 8/8 passed; 92-capture visual integrity passed with zero edge contacts and zero detached large components; prop audit, town state, gallery and separate silhouette-quality audit passed. Inspected front/back/left/right native 64×96 renders, 4× directional sheet, 8× role-debug sheet, 4× full gallery, and town screenshot. Singlet hem now reveals the split shorts and maintains a distinct running silhouette. No page/script errors; 180 console 404s are missing audio resources. Overall workflow remains FAILED on the pre-existing global full-body silhouette pair Clinic/Sailor front (IoU 0.909429 > 0.90) and the explicit unapproved golden baseline (23 changed, Granny only match); no golden snapshots were refreshed or approved. Runner targeted internal QA PASSED, not design approval. Coach and Referee remain unstarted.

- **2026-11-19 Runner internal review complete:** Browser run `44548532467` tested `6905171293c04f34f3ee09c804c490082e1f3d57`; artifact `14540104692` downloaded and inspected. Targeted palette/body/face/role-debug/visual-integrity/prop/town/gallery and silhouette-quality checks passed. Four directional captures and the 8× role sheet were visually inspected. The singlet hem was shortened to make split shorts and stride separation clearer. Workflow overall remains failed on global unapproved snapshot and legacy silhouette gates; audio resources logged 180 console 404s (46 unique URLs), with no page or script errors. No golden files touched. Runner remains not approved pending group review. Next task: Coach.


- **2026-11-19 Runner QA Coordinator independent verification:** Re-fetched run #416 (44548532467), confirmed browser QA job 135645796007 and artifact 14540104692 are tied to exact source SHA 6905171293c04f34f3ee09c804c490082e1f3d57, downloaded the artifact, and independently inspected runner front/back/left/right (native 64×96), nearest-neighbor 4× directional composite, 8× Runner/Cook/Courier/Usher role-debug, 4× civilian gallery, town screenshot, and report.json. All four views read as the same athletic runner; side profiles include face details, running pose and limb placement remain coherent, bib 07, sweatband, stopwatch, split shorts and technical shoes remain visible. No Runner-specific clipping, edge contacts, or detached large components found. Report confirms syntax/module load, inventory (135 NPC / 24 civilian archetype mappings), palette (four vector sprites / 19 legacy pixel sprites; Runner 1,083 unique antialiased colors, 1,904 opaque pixels, 20 ink pixels), palette differentiation, body/baseline (80px body vs 81px target, deviation 0.4375px, baseline delta 1), 23 unique faces at native and game scale, role-debug 8/8, 92/92 visual-integrity captures with zero edge contacts and zero detached large components, prop audit, town (16 NPCs, Granny present), gallery and separate silhouette-quality audit (180/180 pairs below 0.85). No page or script errors. Overall workflow FAILED on global civilian-type silhouette overlap Clinic/Sailor front IoU 0.909429 (>0.90) and explicitly unapproved golden snapshots (23 changed, 1 match); these are not Runner-specific. 180 audio-resource 404 console errors across 46 unique URLs were logged. No golden snapshots were refreshed or approved. **QA Coordinator verdict: Runner targeted internal QA independently verified PASS; Runner remains NOT APPROVED** pending group review and owner approval. Coach is next; Referee remains after Coach.

- **2026-11-19 Coach implementation:** Added dedicated drawCoachVector in npc_sprites.js and wired it into the vector dispatch. The Coach has a steady stance, forest-green warm-up jacket, cream shoulder yoke, silver-templed face, gold whistle/lanyard, marked clipboard, dark track trousers and court shoes. QA coverage now expects five vector civilians / 18 legacy pixel sprites and captures ten role-debug views across Runner, Coach, Cook, Courier and Usher. Renderer commit e299665036694d9c202c03ccd20cb2b5f5c3a666; QA commits ff3962c3565ab8298388d7924ec4cff1d42dbf4e and 6800e95ce9ebb7b647044b2dd81d0202d5c12fae. The first artifact showed the side profile was too blank, so eye/nose/mouth details were strengthened in renderer commit a9c29109e8f64a1009fd0b1df5ab560ff08fdbd8.

- **2026-11-19 Coach targeted internal QA:** Run 44551256553 / job 135655281455 tested exact renderer source a9c29109e8f64a1009fd0b1df5ab560ff08fdbd8; artifact 14542916538 inspected. Palette (5 vector / 18 legacy), palette differentiation, body/baseline/contrast (80px body, 0.4375px deviation, baseline delta 1), 23/23 face distinctness, role-debug 10/10, 92/92 directional visual-integrity captures with zero edge contacts and zero detached large components, prop audit, separate silhouette-quality audit, town and gallery passed. Actual native front/back/left/right and 4× views, role-debug sheet, 4× gallery and town screenshot were inspected. Coach's clipboard is connected to the front hand; jacket/yoke, trousers, shoes, rear marking and side-profile face are readable. No Coach-specific clipping or detached geometry found. No page/script errors; 180 console 404s are missing audio assets. Overall workflow FAILED only on global Clinic/Sailor front silhouette IoU 0.909429 (>0.90) and explicitly unapproved golden snapshots (23 changed, 1 match). Coach/Courier rear IoU 0.893564 is below threshold; no Coach-specific silhouette gate failure. No golden snapshots were refreshed or approved. Coach targeted internal QA PASSED; Coach remains NOT APPROVED pending comparative Claude review of the Runner/Coach/Referee group and owner acceptance. Referee is next.


- **2026-11-19 Referee internal QA review:** Latest branch head `3fdfdb25a5481e62f43c84b3483ec131493e290b` includes the card/hand lowering correction. Browser run #425 (`44553520770`), job `135663311368`, tested that exact SHA; artifact `14542904013` inspected. Referee palette evidence passed (1,069 unique antialiased colors, 2,094 opaque pixels, 80 exact outline pixels); body/baseline passed (80px body, 0.4375px height deviation, baseline delta 1); face distinctness passed 23/23; role-debug passed 12/12 across Runner/Coach/Referee/Cook/Courier/Usher; 92/92 directional visual-integrity captures passed with zero edge contacts or detached large components; prop audit and separate silhouette-quality audit passed (180/180 pairs below 0.85). Inspected Referee front/back/left/right at native 64×96 and nearest-neighbor enlargement, six-character role-debug sheet, full 4× gallery, and town screenshot. Raised card now clears the top edge; stripe rhythm, shorts, socks, shoes, whistle and side-profile face remain legible; no Referee-specific clipping or detached geometry found. Gallery and town (16 NPCs, Granny present) passed. No page or script errors. Overall workflow FAILED on global Clinic/Sailor front full-body IoU 0.909429 (>0.90) and explicitly unapproved golden snapshots (23 changed, 1 match); 180 console 404s are missing audio resources. No golden snapshots refreshed or approved. **Referee targeted internal QA PASSED; Referee remains NOT APPROVED** pending comparative Claude review and owner acceptance. The Runner/Coach/Referee group is ready to package for Claude.

- **2026-11-19 Referee corrected-render QA follow-up:** Latest renderer commit `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495` was tested by browser run #426 (`44557279748`), job `135676647176`; artifact `14545038850` downloaded and inspected. Commit diff refines the dedicated `drawRefVector` path: same anatomical-left card arm across front/back/profiles, card/hand overlap, rear cropped hair under sweatband, narrowed side torso and profile hand details. Syntax/module and inventory passed; Referee palette 1,078 unique antialiased colors / 2,192 opaque pixels / 93 exact ink pixels; body check passed (35.4375px rendered vs 35px target, 0.4375px deviation, baseline delta 1; contrast ratio 4.70); face distinctness 23/23; role-debug 12/12 across six vector characters (front/right); 92/92 directional visual-integrity captures with zero edge contacts and zero detached large components; prop audit, separate silhouette-quality audit (180/180 pairs below 0.85), town scene and gallery passed. Inspected Referee front/back/left/right at native 64×96, nearest-neighbor 4× directional sheet, Referee's full four-direction gallery column, role-debug sheet, full 4× gallery, town screenshot and report. Handedness is consistent: front card is viewer-right, rear card viewer-left, and both profiles carry it on the rear-facing side; hand visibly overlaps the lower card edge. Rear hair is present below the headwear. Profile torso is visibly narrower than the front/back silhouette; profile face and opposite hanging hand remain visible. At 28×42 game scale the yellow card and red mark remain recognizable. Town scene run is the standard street map with 16 NPCs and Granny; it does not explicitly spawn a Referee, so town pass is regression evidence, not a Referee-specific live-scene assertion. No Referee-specific clipping or detached geometry found. No page/script errors; 180 console 404s are missing audio resources. Overall workflow **FAILED** on global Clinic/Sailor front full-body IoU 0.909429 (>0.90) and explicitly unapproved golden snapshots (23 changed, 1 match); no snapshots refreshed or approved. **Referee targeted internal QA PASSED; Referee remains NOT APPROVED** pending independent QA Coordinator verification, Claude's comparative review and owner acceptance.


- **2026-11-19 QA Coordinator independent verification of Referee final renderer:** Re-verified run #426 (`44557279748`), job `135676647176`, exact source `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495`, artifact `14545038850`. Inspected native 64×96 front/back/left/right captures, enlarged Referee four-direction gallery column, six-character role-debug sheet, full 4× gallery, town screenshot, Granny baseline context and report. Card handedness is anatomically consistent: front viewer-right, back viewer-left, profiles on the rear-facing side. Fingers overlap the lower card edge; rear cropped hair remains visible below the sweatband; profile torso is narrowed and the face/opposite hanging hand remain readable. Card and red mark survive 28×42 scale. No Referee-specific clipping or detached geometry found. Automated checks: syntax/module/inventory pass; palette Referee 1,078 unique antialiased colors / 2,192 opaque pixels / 93 ink pixels; body 35.4375px vs 35px target, deviation 0.4375px, baseline delta 1, contrast 4.70; face distinctness 23/23; role-debug 12/12 across six vector characters; visual integrity 92/92 with zero edge contacts or detached large components; prop audit, silhouette-quality 180/180 below 0.85, and gallery pass. No page/script errors. **Important town gap:** the street town capture has 16 NPCs and Granny but no Referee; it is general regression evidence, not proof of Referee in-world readability. A dedicated Referee town/room spawn capture remains outstanding if that criterion is required. Overall workflow fails on Clinic/Sailor front IoU 0.909429 (>0.90), explicitly unapproved snapshots (23 changed, 1 match), and 180 missing-audio 404s. No snapshots refreshed or approved. Referee remains NOT APPROVED pending Claude comparative review and owner acceptance.


## 2026-11-19 latest Referee renderer review

The latest renderer source `4f0d135f0f14506a2c19df0f760d0fe2ec5a7495` was tested on run #426 (`44557279748`), job `135676647176`, artifact `14545038850`. QA Coordinator inspected the actual native 64×96 four-direction captures, enlarged sheet, Referee gallery column, six-character role-debug, full gallery, town screenshot and report. Handedness is consistent across all directions; the hand overlaps the card; rear hair appears below the sweatband; side torso is narrower and profile face/opposite hand remain visible; yellow card and red mark read at 28×42. No Referee-specific clipping or detached geometry. Targeted checks: palette 1,078 unique antialiased colors / 2,192 opaque pixels / 93 ink pixels; body 35.4375px vs 35px target, 0.4375px deviation, baseline delta 1, contrast 4.70; faces 23/23; role-debug 12/12; visual integrity 92/92 with zero edge contacts/detached large components; prop and silhouette-quality audits, gallery and town regression passed; no page/script errors. Town capture uses the standard 16-NPC roster and does not explicitly spawn Referee, so it is not Referee-specific live-town proof. Overall workflow still fails on Clinic/Sailor front IoU 0.909429, unapproved golden snapshots (23 changed, 1 match), and 180 audio 404s. No snapshots were refreshed or approved. Runner/Coach/Referee remain NOT APPROVED pending Claude comparative review and owner acceptance.

- **2026-11-19 Coach corrected-render internal QA:** Latest branch source commit `3fdbd1e0640c97afce2c3b732491ff84823ba84e` was tested by browser run #428 (`44560760230`), job `135689302384`; artifact `14550985215` downloaded and inspected. See [Coach Run 428 review package](qa-artifacts/coach-run-428/README.md). Inspected actual native 64×96 front/back/left/right captures and nearest-neighbour enlarged views, Coach's four-direction gallery entries, six-character role-debug sheet, town screenshot and report. Rear silver/charcoal hair remains visible beneath the cap. In both profiles the clipboard board/paper/clip remain separate from the jacket and the hand overlaps the board's near/lower edge. Cream shoulder yoke follows the shoulder seam in both profiles. Profile eye, projecting nose and mouth remain readable; sideburn edge is clean. Gold lanyard and pendant are present on both sides, but the pendant is small and only borderline whistle-readable at native scale; recorded as a minor polish note. No Coach-specific clipping, edge contacts or detached large components. Automated checks: syntax/module/inventory pass; Coach vector palette 1,052 unique antialiased colors / 2,040 opaque pixels / 64 exact outline pixels; body 34.5625px vs 35px target, deviation 0.4375px, baseline delta 1, contrast ratio 3.665; face distinctness 23/23; role-debug 12/12 across six vector characters (front/right); visual integrity 92/92 with zero edge contacts or detached large components; prop audit, silhouette-quality 180/180 below 0.85, gallery and town regression pass. No page/script errors; 180 console errors are missing audio-resource 404s. Town street capture has 16 NPCs and Granny but does not explicitly spawn Coach, so it is general regression evidence only. Overall workflow FAILED on global Clinic/Sailor front IoU 0.909429 (>0.90) and explicitly unapproved golden snapshots (23 changed, 1 match); Coach/Courier front/back overlaps are below the 0.90 failure threshold. No golden snapshots refreshed or approved. **Coach targeted internal QA and visual inspection PASS with minor whistle-legibility note; Coach remains NOT APPROVED** pending independent comparative review against Granny Volt and owner acceptance.


## 2026-11-19 combined second-batch Claude package — ready

- **Latest tested renderer source:** `f78627caf53b15cfe1bee0f30feea39d68da7c35`.
- **Browser QA:** [Run #429](https://github.com/tinytime/Tinytime.github.io/actions/runs/44562696912), job `135695989340`.
- **Artifact:** `vapor-city-browser-qa`, ID `14548434248`; downloaded and inspected. This is the primary combined review evidence because it includes the latest Coach polish alongside Runner and Referee.
- **Images inspected:** Runner, Coach and Referee front/back/left/right native 64×96 PNGs; six-character role-debug sheet; 4× 23-civilian gallery; Granny before/after directional comparison; report.json.
- **Targeted results:** syntax and module load pass; inventory pass (135 NPCs / 24 civilian mappings); six vector palette audit pass; role-debug 12/12; visual integrity 92/92 with zero edge contacts and zero detached large components; prop audit pass; silhouette-quality audit 180/180; gallery pass; town scene regression pass (16 NPCs, Granny present); pageErrors 0; scriptErrors 0.
- **Global workflow remains FAILED:** full civilian type-silhouette audit flags Clinic/Sailor front IoU 0.909429 (>0.90). Other nearest pairs include Coach/Courier back 0.890479, Sailor/Welder back 0.889290, Clinic/Sailor back 0.884215, Clinic/Welder back 0.871764 and Cook/Courier back 0.863465. Golden snapshots remain explicitly unapproved (23 changed, 1 match); no snapshots were refreshed or approved. 180 missing-audio resource 404 console errors.
- **Evidence caveat:** the standard street town capture has 16 NPCs and Granny but does not explicitly spawn Coach or Referee; it proves scene regression, not character-specific live-town visibility for those two.
- **Review status:** package ready for Claude comparative review against Granny Volt. Runner, Coach and Referee remain **NOT APPROVED** pending Claude's independent verdict and owner acceptance. Remaining roster stays on hold.


- **2026-11-19 Claude second-batch review and correction handoff:** Claude verified the run #429 PNGs against source `f78627caf53b15cfe1bee0f30feea39d68da7c35`. Verdict: Runner 6/10, corrections required; Coach 7/10, approve after whistle correction; Referee 7.5/10, reviewer considers it acceptable with optional polish. Crucially, Claude pixel-diffed all four Runner directions against run #416 and found zero changed pixels. Commit inspection confirms `f78627c` only changed Coach renderer details; it did not include any Runner renderer change. The Runner vector path does exist and is dispatched by `createCivRenderer`, so the issue was omitted Runner edits—not a pixel-pack override. Correction commit `5e50ee26f192792d78e7e9b7ae72dd95b9d640f1` now strengthens the Runner profile eye/nose/mouth and curl crown, removes detached pale sole strokes in all views, softens shorts slashes into seams, adds profile stopwatch visibility and improves crossed-leg value separation; it also reshapes the Coach whistle with a projecting mouthpiece/barrel. These are **implemented but not yet browser-tested or visually inspected**. No snapshots changed. Next: run the standard browser QA on this exact commit, inspect all four Runner and Coach views at native and enlarged scale, and only then send the corrected renders to Claude for focused re-review. Referee remains pending explicit owner acceptance; do not refresh snapshots.


- **2026-11-19 refreshed Runner / Coach / Referee QA and Claude package:** Renderer source commit `52f286912bf6fa44219972520211bc13d6f3ef7a` tested exactly by browser run #432 (`44566620323`), job `135710025332`, artifact `14550224509`. The prior run #431 on commit `1ba8923da6804d0ef4b662cce7626b384857f9ab` caught a one-pixel top-edge contact in both Runner profile curl crowns; those curls were lowered slightly and run #432 confirms all 92 directional captures have zero edge contacts and zero detached large components. The optional Referee polish adds a projecting profile nose, subtle ear detail and angled jacket seam for a three-quarter garment read. Actual Runner, Coach and Referee native 64×96 four-direction PNGs and enlarged composites were inspected, along with the role-debug sheet, full 23-civilian gallery, Granny comparison and report. Targeted results: syntax/module/inventory pass; vector palette pass (Runner 1,070 colors / Coach 1,077 / Referee 1,078); body/baseline/contrast pass; face distinctness 23/23; role-debug 12/12; visual integrity 92/92; prop audit pass; silhouette-quality 180/180; gallery pass; town regression pass (16 NPCs, Granny present); pageErrors 0; scriptErrors 0. The overall workflow remains FAILED on the separate global Clinic/Sailor front type-silhouette overlap IoU 0.909429 and explicitly unapproved golden snapshots (23 changed, 1 match); 180 missing-audio 404s. The town capture does not explicitly spawn Runner, Coach or Referee. No golden snapshots were refreshed or approved. Updated Claude brief and run #432 package index are ready; all three characters remain NOT APPROVED pending refreshed Claude review and owner acceptance.


## 2026-11-19 — Claude second review and combined correction pass

Claude's independent review of run #432 scored Runner 6.5/10 (reject pending four corrections), Coach 7.5/10 (approve after whistle correction), and Referee 7.5/10 (approve after chin-line correction). Batch remains blocked by Runner.

Implemented:
- Runner: profile bib is now tapered/wrapped; number glyphs are counter-flipped in the mirrored left profile so "07" remains readable; profile mouth strengthened; profile stride redrawn with two separated leg/foot planes.
- Coach: front and profile whistle redesigned as a horizontal barrel with a projecting mouthpiece/tip.
- Referee: profile chin-level contour moved inside the jaw to remove the protruding dark line.

Renderer commits: `a08c7eff983ea8ce23cbd31b33d008f1d33b9366` (Runner and Referee), then `777db4e16176324e66d368c6a5b4f022ab1cd411` (Coach). Fresh browser QA run #434 (`44568781463`) is in progress against the exact combined source `777db4e`; run #433 was cancelled because it tested only the intermediate commit before the Coach correction. The 28×42 game-scale inspection requested by Claude is a required gate for the new artifact. Do not reuse run #432 as proof of these changes. No new visual pass or approval is claimed yet; all three characters remain NOT APPROVED.


## Owner feedback correction pass — 2026-11-19

The owner reviewed the actual run #434 renders and identified three required profile corrections:
- **Coach:** side profile read as a front-facing head turned sideways; redesign the head as a genuine side silhouette. Clipboard must be visibly in front of the hand, with the grip still legible.
- **Referee:** raised-card arm in both side profiles appeared to originate behind the character; move it to the forward/face side of the profile.
- **Runner:** side profiles showed an overlapping duplicate leg that read as a third leg; remove the redundant underlayer and retain exactly two distinct stride legs/feet.

Implemented together in renderer commit [6332fb4](https://github.com/tinytime/Tinytime.github.io/commit/6332fb4622ed56686771e60541f975b2d6e33a61). Browser QA run [#435](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570451203), exact source `6332fb4622ed56686771e60541f975b2d6e33a61`, is in progress. The run #434 artifact confirmed the owner's observations; it is baseline evidence only and cannot verify the new changes. All three remain NOT APPROVED pending inspection of the new artifact, independent Claude review, and owner acceptance. Do not begin the remaining 20 characters.


### Coach profile follow-up after run #435

Run #435's actual four-direction sheet confirmed the Runner duplicate leg layer was removed and Referee's card arm moved to the forward side in both profiles. Coach's head and clipboard were clearer, but inspection showed the broad front-view jacket base still painted beneath the side overlay. Follow-up commit `b15d14fd9c6604c7ee232adf47d44a5d328054b3` suppresses that base jacket when rendering side views and narrows the side torso to a single-plane profile. Fresh QA and visual inspection are pending; do not treat run #435 as evidence for this last Coach body change. All three remain NOT APPROVED.


## Run #436 — owner-feedback profile correction verification (2026-11-19)

- Tested renderer/source: `b15d14fd9c6604c7ee232adf47d44a5d328054b3` (run #436, run ID `44570917085`, job `135725393768`). Artifact `14553029329` (`vapor-city-browser-qa`); [GitHub Actions run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44570917085).
- Actual native directional evidence: all 12 PNGs in `npc-type-directions/` are 64×96 (Runner, Coach, Referee × front/back/left/right). Enlarged 4× sheet and separately downsampled 28×42 visual check were inspected locally from these captures. The artifact itself does not contain separate browser-captured 28×42 character PNGs; record the 28×42 check as a derived resampling, not a native game-scene capture.
- **Runner:** both profiles now show two distinct stride legs and two feet; the duplicate third-leg underlayer is gone at native and derived 28×42 scale.
- **Coach:** side head and torso read as a side view rather than the front body underneath a turned head. Clipboard is in front of the arm/hand and remains legible; hand/board contact is visible. The follow-up torso narrowing from `b15d14f` is present in the tested source.
- **Referee:** raised card arm/card are on the forward/face side in both left and right profiles; no longer emerge from behind the body.
- Targeted checks: syntax/module/inventory pass; palette and body checks pass; role-debug 12/12; directional integrity 92/92, zero edge contacts and zero detached large components; prop audit passes; silhouette-quality 180/180; gallery visual pass; town scene pass (16 NPCs, Granny present); page errors 0 and script errors 0.
- Overall workflow remains failed on unrelated/global checks: civilian type silhouette audit max IoU `0.9094292803970223` (Clinic/Sailor overlap); golden snapshot comparison 23 changed / 1 match, with no baseline refresh or approval; existing audio resource 404 console errors. No snapshots were refreshed or approved.
- The QA report has no character-specific town spawn/capture for Runner/Coach/Referee; town screenshot is regression context only. Granny comparison remains a separate reference check.
- **Internal visual verdict:** all three owner-reported profile defects are corrected in the run #436 native renders. This is not independent Claude review or owner approval. Runner/Coach/Referee remain NOT APPROVED pending Claude's comparative review and owner decision. Keep remaining 20 civilians on hold.


## Run #437 — refreshed Runner / Coach / Referee renders after final polish (2026-11-19)

- **Exact renderer source:** `4aee0893d41c2c67de560d9d494b7ba7639685f9` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/4aee0893d41c2c67de560d9d494b7ba7639685f9), “Refine Runner and Coach profile faces and Coach whistle”.
- **Browser QA:** [run #437 / 44572590664](https://github.com/tinytime/Tinytime.github.io/actions/runs/44572590664), job `135731400814`; artifact `vapor-city-browser-qa`, ID `14555840087`.
- The run tested the exact current branch head. Artifact downloaded; all 12 native 64×96 PNGs (Runner, Coach, Referee × front/back/left/right) inspected, enlarged 6× nearest-neighbour sheets created, and derived 28×42 game-scale resamplings inspected. Also inspected role-debug sheet, full 23-civilian 4× gallery, Granny comparison, town screenshot and `report.json`.
- **Latest polish visible:** Runner's side-profile nose/mouth are more deliberate and the cheek flecks that could read as stubble are removed; Coach's angled whistle chamber now has a distinct dark mouthpiece opening in front and profiles; Coach's profile face has a clearer single-eye / ear / projecting-nose / jaw construction with less cheek clutter. Referee remains consistent with the previously corrected forward-side card arm.
- **Visual result:** all three characters render in all four directions at native size; no crop-edge contacts or detached large components in any of the 92 directional captures. Runner retains two distinct stride legs/feet and readable bib/stopwatch; Coach's profile head reads as a true side silhouette, narrow single-plane torso, visible hand-to-clipboard contact and clear whistle; Referee's card remains on the forward/face side in both profiles and readable at derived game scale. No character-specific clipping found.
- **Targeted automated checks:** syntax/module/inventory pass (135 NPCs / 24 civilian mappings); six-vector palette audit pass; body/baseline pass (35px target, max deviation 0.4375px, max baseline delta 1); face distinctness 23/23 at native and 28×42; role-debug 12/12 (front/right across six vector civilians); visual integrity 92/92 with zero edge contacts and zero detached large components; prop audit pass; separate silhouette-quality 180/180; gallery pass; town regression pass (street map, 16 NPCs, Granny present); pageErrors 0; scriptErrors 0.
- **Overall workflow remains FAILED** for independent/global gates: full 23-civilian type-silhouette audit flags Clinic/Sailor front IoU 0.909429 (>0.90), with Coach/Courier back at 0.890479; golden snapshots remain explicitly unapproved (23 changed, 1 match); 180 missing-audio resource 404 console errors. The separate archetype silhouette-quality audit passes 180/180. No snapshots were refreshed or approved.
- **Town limitation:** the standard street scene does not explicitly spawn Runner, Coach or Referee; it is regression evidence only, not character-specific live-town proof.
- **Status:** refreshed targeted internal QA and visual inspection **PASS** for Runner, Coach and Referee. This is not Claude's independent review or owner approval. All three remain **NOT APPROVED** pending updated Claude comparative review and explicit owner acceptance. Remaining 20 civilians stay on hold.
- Review image package: [run #437 evidence index](qa-artifacts/runner-coach-referee-run-437/README.md).


## Run #441 — initial direct in-game-scale capture implementation (2026-11-19; superseded by run #442)

- **Exact source commit:** `8eeca34ae10a1d829f5035d72b57989bffb9e6e0` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/8eeca34ae10a1d829f5035d72b57989bffb9e6e0).
- **Browser QA:** [run #441 / 44577303597](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577303597), job `135748177849`; artifact ID `14558375062`.
- **QA harness change:** added a dedicated `npcRenderGameScaleSnapshots` hook. It calls the actual live `owCiv` vector renderer afresh with the town's `OWT=36` and vector scale `0.28`, writing 28×42 transparent PNGs directly. It does **not** resize or derive these files from the 64×96 QA snapshots. The harness asserts the exact capture method and all 12 expected character/direction combinations.
- **Capture verification:** artifact contains Runner, Coach and Referee × front/back/left/right: 12 PNGs at exactly 28×42, plus all 12 native 64×96 direction captures. I inspected both full contact sheets and all directions. No character-specific crop-edge clipping was found. At game scale, Runner's bib/stride and shoe separation remain legible; Coach's profile face, clipboard/hand, uniform and whistle placement remain coherent; Referee's raised card remains readable and correctly forward-facing in both profiles.
- **Initial gate result:** the 12 direct game-scale PNGs were present at 28×42, but the capture audit's data-URL MIME-prefix check was too strict and reported FAIL. The validator was corrected and the successful 12/12 gate is recorded in run #442. Other targeted checks; role-debug 12/12 PASS; directional integrity 92/92 PASS with zero edge contacts or detached large components; face-distinctness audit 23/23 PASS (note: the all-civilian 28×42 face-signature sub-audit still derives its images from native snapshots; direct game-scale PNGs are currently captured for Runner/Coach/Referee only); prop audit PASS; archetype silhouette-quality 180/180 PASS; gallery and town regression PASS; town has 16 NPCs and Granny present; page errors 0 and script errors 0.
- **Overall workflow FAILED** on pre-existing/global gates: the 23-civilian type-silhouette audit still fails at Clinic/Sailor front IoU `0.9094292803970223` (threshold `<0.90`); golden snapshots remain explicitly unapproved (23 changed / 1 match), and no golden snapshots were refreshed or approved; 180 audio resource 404 console errors remain. These do not invalidate the targeted direct-capture audit, but they prevent an overall green QA result.
- **Status:** QA harness implementation and direct game-scale evidence are verified. Internal visual QA for Runner/Coach/Referee passes on this run. This is not Claude's independent review or owner approval. Keep all three NOT APPROVED pending Claude comparative review and owner decision; remaining 20 civilians stay on hold.

## Run #442 — direct game-scale evidence verified (2026-11-19)

- Source commit `9d7e66ba9667a555c4b42c65d5910a2ea08cc055`; [Actions run #442](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577766543), artifact `14558375601`.
- Direct `owCiv` game-scale capture gate: **12/12 PASS** at 28×42, all three target civilians × four directions, rendered at town `OWT=36` / vector scale `0.28` with no resize. Native 64×96 set also present.
- Internal visual inspection PASS for Runner, Coach and Referee at both sizes; role-debug 12/12, directional integrity 92/92, prop audit, archetype silhouette quality 180/180, gallery and town regression pass. No page/script errors.
- Workflow-wide gates remain failed: Clinic/Sailor front full-body IoU `0.9094292803970223`; golden snapshots unapproved (23 changed / 1 match; none refreshed); 180 missing-audio 404 console errors.
- Claude comparative review is the next gate. All three remain **NOT APPROVED** until Claude review and owner decision; do not start the remaining 20.
- Evidence: [run #442 package index](qa-artifacts/runner-coach-referee-run-442/README.md).


## 2026-11-19 — Runner / Coach / Referee Claude review package prepared

The GitHub review brief and evidence index are ready: [Claude review package — run #441](../qa-artifacts/runner-coach-referee-run-441/README.md). It anchors the review to renderer source `8eeca34ae10a1d829f5035d72b57989bffb9e6e0` and browser QA [run #441](https://github.com/tinytime/Tinytime.github.io/actions/runs/44577303597), artifact `14558375062`. The artifact includes 12 native 64×96 and 12 direct-rendered 28×42 PNGs for all four directions of Runner, Coach and Referee, plus role-debug, gallery, Granny comparison, town regression and report evidence.

**Capture-audit clarification:** run #441's first direct-capture assertion falsely failed because of an overly strict data-URL MIME-prefix check; all 12 actual 28×42 PNGs were present and visually inspected. The validator was corrected in follow-up QA #442. Do not describe the initial run #441 assertion as passing. Other targeted checks and the global workflow failures are detailed in the package.

The brief asks Claude for an independent per-character score and verdict, required corrections versus optional polish, four-direction and native/game-scale inspection, and comparison against Granny Volt's quality bar without copying her design. It also asks for an overall batch recommendation.

**Review state:** package prepared in GitHub; not externally sent. Runner, Coach and Referee remain **NOT APPROVED** pending Claude's independent review and explicit owner acceptance. Remaining 20 civilian designs remain on hold.


## 2026-11-19 — Owner-requested profile arms and Runner leg anatomy

Owner feedback: all three side profiles should show only one visible arm; Runner's legs look unusually angular compared with the other civilians and should not depend on animation to read correctly.

- Renderer commit `98f58884f9fa2609414b17f5a5ce28e275ab3064`: hides the far arm in Runner, Coach and Referee side views, retaining the prop/stopwatch arm.
- Renderer commit `21481ee1768e80595cfdb13f6e338f57c10d076c`: refines Runner's leg shapes with curved contours, visible lower-leg skin and shorts that end above the knee across front/back and side views.
- **Animation clarification:** Runner's current vector draw path is a static pose per direction; the unusual leg shapes were not temporary animation frames.
- Run #443 artifact visually confirmed the one-arm side-profile change. Run #444 is the verification render for the fuller Runner leg refinement; inspect its artifact before closing the feedback.
- Status: owner feedback implemented in renderer; fresh QA and visual inspection pending. All three remain NOT APPROVED pending independent review and owner acceptance.


## Run #444 — owner-requested side-profile and Runner leg corrections (2026-11-19)

- Source: `21481ee1768e80595cfdb13f6e338f57c10d076c`; [Actions run #444](https://github.com/tinytime/Tinytime.github.io/actions/runs/44579787401), artifact `14558936072`.
- Side-profile far arms removed for Runner, Coach and Referee; respective near stopwatch/clipboard/raised-card arms retained.
- Runner's shorts/calf split and leg contours refined across front/back/left/right. The pose is static per direction, not an animation frame.
- Inspected all 12 native 64×96 and 12 direct 28×42 images. Targeted QA PASS: capture 12/12, role-debug 12/12, visual integrity 92/92, face distinctness 23/23, palette/body, props, silhouette quality 180/180, gallery and town regression; zero page/script errors.
- Workflow-wide failures persist on Clinic/Sailor silhouette overlap, unapproved golden snapshots, and 180 missing-audio 404s. No snapshots refreshed or approved.
- Updated independent review brief: [Claude package — run #444](../qa-artifacts/runner-coach-referee-run-444/README.md).
- **Status:** internal corrections and targeted QA PASS; Claude review and owner approval still pending. All three remain NOT APPROVED. Remaining 20 stay on hold.


- **2026-11-19 owner follow-up / run #446:** Owner feedback: “Ref good”; Coach should have more back volume in side profile and the whistle should stay on his front; Runner's legs should continue toward the proportions of the other civilians. Source `fafb991d3ce94ffa491179a84ecb63c10934b0e0` widens Coach's rear torso contour, shifts the profile whistle/lanyard toward the front, and shortens Runner's trailing shorts to expose a distinct calf. Run #446 (`44581720083`, artifact `14559965367`) tested the exact source. All 12 native 64×96 and 12 direct 28×42 captures inspected. Targeted QA passed; workflow remains failed on global Clinic/Sailor overlap, unapproved snapshots and 180 missing-audio 404s. [Run #446 review package](../qa-artifacts/runner-coach-referee-run-446/README.md). Referee unchanged. All three remain NOT APPROVED pending Claude's independent comparative review and owner acceptance.


## Run #452 — Runner side-profile narrowing verification (2026-11-19)

- **Exact source:** `4eafc657fa9ee15db3b70f3c64a76280d4add0a6` — [commit](https://github.com/tinytime/Tinytime.github.io/commit/4eafc657fa9ee15db3b70f3c64a76280d4add0a6).
- **Browser QA:** [run #452](https://github.com/tinytime/Tinytime.github.io/actions/runs/44587406698), artifact `14562025835`.
- **Change:** Runner side torso lower front edge moved inward (x=71 to x=64); no front/back torso geometry changed. Side collar and bib positions from the previous correction retained.
- **Visual inspection:** fresh Runner front/back/left/right native 64×96 captures and direct 28×42 front/left/right game-scale captures inspected. Both mirrored profiles show a slimmer forward torso contour; collar and ID bib sit on the forward chest plane; front view remains unchanged. The side bib is necessarily foreshortened at game scale. No new edge clipping or detached components.
- **Targeted checks pass:** syntax/module load, palette/body checks, direct game-scale captures 12/12, role-debug 12/12, directional integrity 92/92 (zero edge contacts/detached large components), prop audit, silhouette-quality 180/180, gallery visual pass, town regression (16 NPCs; Granny present), page errors 0 and script errors 0.
- **Overall workflow failed:** global civilian type silhouette audit still flags Clinic/Sailor front at IoU `0.9094292803970223` (other close pairs also listed in report); golden snapshots remain unapproved (23 changed / 1 match); 180 existing audio resource 404s. No snapshots were refreshed or approved.
- **Evidence:** run artifact contains `npc-type-directions/runner-{front,back,left,right}.png`, `npc-game-scale-28x42/runner-*.png`, role-debug, gallery/town screenshots and `report.json`. See [run artifact](https://github.com/tinytime/Tinytime.github.io/actions/runs/44587406698).
- **Status:** internal targeted QA and visual inspection pass. Claude review and owner approval are still pending; Runner, Coach and Referee remain NOT APPROVED. Remaining 20 remain on hold.


## Five-civilian Claude review scope — owner update (2026-11-19)

- **In scope:** Usher, Cook, Courier, Coach, Referee.
- **Excluded only for this round:** Runner. Not deleted, not rejected, not approved; it remains pending a later focused review. Reason: reduce Claude's review load while retaining Coach and Referee as distinct athletic-role examples alongside civic, vendor and courier designs.
- **Review package:** [five-civilian full review](../qa-artifacts/five-civilian-full-review/README.md). The package explicitly names `npc_sprites.js` and pins both rendered evidence and source to run #457 / commit `5e02024ea1fbeb5b56eb6492b64427b9ca44b4d0`.
- **Required Claude output:** five scores and verdicts; severity-ranked fixes; five-character ranking; batch verdict; practical Civilian Vector Build Standard designed to minimize future iteration without templating the cast.
- No new character implementation is authorized by this scope reduction. Remaining 20 remain ON HOLD.


## Claude correction round reopened — 2026-11-19

The owner explicitly authorized reopening the previously approved Usher, Cook and Courier for the edits recommended in Claude's five-civilian review. This does not erase their prior approval history; it suspends current approval while the revised versions are evaluated.

- **Usher — REOPENED / REVISION IN PROGRESS:** profile clipboard changed from the brown board back to a visible paper face with clip/detail; further silhouette and back-view identity polish remains to complete.
- **Cook — REOPENED / REVISION IN PROGRESS:** toque band lifted so its lower edge is at y=27 in front and profile, profile ear/mouth details added, and far profile arm occluded. Pan consistency and world-fixed rim parity still require visual confirmation / follow-up.
- **Courier — REOPENED / REVISION IN PROGRESS:** removed the global -0.035 rad front/back rotation that produced unequal native foot rows. Profile forward lean is a separate optional art refinement, not yet implemented.
- **Coach — REVISION IN PROGRESS / NOT APPROVED:** shortened yoke to approximately y=62, exposed silver temple locks and profile rear hair, moved side whistle clear of clipboard, and replaced font-dependent “VC” lettering with vector strokes.
- **Referee — REVISION IN PROGRESS / NOT APPROVED:** guarded the front/back base torso so it no longer paints underneath side views; added a rear hair/nape lock in profile.

**Implementation commit:** [027be47d8f6763f447992a9dec058ff62a7c60a3](https://github.com/tinytime/Tinytime.github.io/commit/027be47d8f6763f447992a9dec058ff62a7c60a3).

**Verification status:** implementation is committed; no post-change browser QA run or new screenshot inspection has yet been completed. Do not restore approval status until all five revised characters pass four-direction native/enlarged and game-scale review, relevant QA gates, independent Claude re-review, and explicit owner acceptance. Runner remains excluded from this round. Remaining 20 remain ON HOLD.

## Follow-up finish pass — 2026-11-19

Renderer commit: [23c792f7e83eb14ff7d48e197678272f1c3e58b0](https://github.com/tinytime/Tinytime.github.io/commit/23c792f7e83eb14ff7d48e197678272f1c3e58b0).

Added restrained warm/cool rim-light accents to Coach and Referee, matching the established light treatment already present on Usher, Cook and Courier. The accents are limited to face/shoulder contours and intentionally avoid tracing the clipboard, whistle or yellow card.

This is a source-only finish refinement. It has not yet been browser-tested or visually inspected. All five characters remain in revision / NOT APPROVED status; Runner remains excluded from this review round and the remaining 20 civilians stay on hold. No golden snapshots were changed.

## Run #459 — post-correction automated QA (2026-11-19)

- **Renderer source tested:** `23c792f7e83eb14ff7d48e197678272f1c3e58b0` — [rim-light finish commit](https://github.com/tinytime/Tinytime.github.io/commit/23c792f7e83eb14ff7d48e197678272f1c3e58b0). The branch head subsequently advanced only through documentation commits; no renderer changes followed this tested source.
- **Browser QA:** [Actions run #459](https://github.com/tinytime/Tinytime.github.io/actions/runs/44599635463), run ID `44599635463`, job `135827201638`, artifact `14568035039`.
- **Automated evidence:** 92/92 directional captures pass integrity checks with zero edge contacts and zero detached large components; 12/12 direct 28×42 captures pass for Runner, Coach and Referee; role-debug 12/12; prop audit pass; gallery pass; zero page errors and zero script errors. The 92 native directional captures include all 23 civilians, including all five in the current Claude review scope.
- **Overall workflow FAILED on two report gates:** full civilian-type silhouette audit (maximum rendered IoU `0.9094292803970223`, Clinic/Sailor front; Coach/Courier back is `0.8939319190922546`) and golden snapshot comparison (23 changed / 1 match; baseline remains explicitly unapproved). The separate role, prop, directional-integrity and gallery checks pass. The run records 180 missing-audio 404 console errors; no page/script exceptions.
- **Capture limitation:** the workflow's direct native 28×42 capture set remains 12 images for Runner/Coach/Referee only. Usher, Cook and Courier have native 64×96 four-direction captures but no separate direct 28×42 PNGs in this run. Do not describe derived/resized images as direct game-scale captures.
- **Visual-inspection limitation:** the report and Actions logs were inspected; the artifact PNGs have not yet received human visual inspection. Automated integrity results are not a visual verdict.
- No golden snapshots were refreshed or approved. All five reviewed civilians remain in revision / NOT APPROVED status pending visual inspection, Claude re-review and owner acceptance. Runner remains excluded from this review round; remaining 20 stay ON HOLD.
- [Five-civilian review package](../qa-artifacts/five-civilian-full-review/README.md) now links this exact run and artifact.


## Five-civilian evidence packaging automation — 2026-11-19

Added `qa/build-five-civilian-review-sheet.mjs` and wired it into `.github/workflows/vapor-city-browser-qa.yml`. After the browser diagnostics step (including failed runs), the workflow now creates a labelled 4× native directional contact sheet for Usher, Cook, Courier, Coach and Referee, plus a machine-readable-check summary Markdown file. The contact sheet is assembled from the actual native 64×96 captures; it does not modify renderer code, test thresholds or golden snapshots. The summary explicitly distinguishes automated evidence from human visual approval.

- Generator commit: [`1f5ffa09189ea20e3d7a6c96a9d7118d72ed22bc`](https://github.com/tinytime/Tinytime.github.io/commit/1f5ffa09189ea20e3d7a6c96a9d7118d72ed22bc).
- Workflow integration commit: [`80bac03d1ee2eb99ff6be9c73bee9d04dcc67b3f`](https://github.com/tinytime/Tinytime.github.io/commit/80bac03d1ee2eb99ff6be9c73bee9d04dcc67b3f).
- Fresh Actions run #461 was triggered by the workflow update and is pending at the time of this note. Its artifact must be checked before claiming the new sheet generator works.


## Run #461 — review-sheet workflow integration verified (2026-11-19)

- Workflow commit tested: `80bac03d1ee2eb99ff6be9c73bee9d04dcc67b3f`; current branch head at handoff: `ce0c63dc71b595c87f899e44d487f5f139a2f085`.
- [GitHub Actions run #461](https://github.com/tinytime/Tinytime.github.io/actions/runs/44600405554), run ID `44600405554`, job `135829961792`; [artifact `14566568903`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44600405554/artifacts/14566568903), 7,178,358 bytes.
- Step results: Chromium install PASS; browser diagnostics FAILED; five-civilian review sheet and summary generation PASS; artifact upload PASS (249 files). The contact-sheet generator therefore completed successfully on its first integrated run.
- The run tested workflow packaging, not a new renderer revision; renderer source remains `23c792f7e83eb14ff7d48e197678272f1c3e58b0` as tested by run #459.
- The generator expects and packages 20 native 64×96 images (five civilians × four directions) enlarged 4×. Direct 28×42 captures remain only the existing 12 for Runner/Coach/Referee; no direct game-scale capture has yet been added for Usher/Cook/Courier.
- The Actions log confirms the diagnostics job still fails. Existing report failures remain global civilian-type silhouette overlap and unapproved golden snapshots; 180 audio 404s remain. No snapshots were refreshed or approved.
- **Visual evidence boundary:** the artifact is available, but the PNGs have not been human-visually inspected in this pass. Contact-sheet generation is not a visual verdict. All five remain NOT APPROVED; Runner remains outside this review round; remaining 20 remain ON HOLD.


## Five-civilian direct game-scale evidence expansion — 2026-11-19

The browser QA hook now targets Usher, Cook, Courier, Coach and Referee at direct live-renderer scale (OWT=36, vector scale 0.28), with 28×42 output in front/back/left/right. The QA assertion requires 20 unique pairs and explicitly checks all five names and all four directions. Implementation commit: `c1d8d75aceeef0c9a689c2f8c40ae88909c55ada`. Verified by [Actions run #463](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178): 20/20 direct 28×42 captures passed, with all five civilians × four directions. [Artifact `14568093189`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178/artifacts/14568093189) contains the native and game-scale captures, contact sheet and report. The artifact has not yet received human visual inspection.


## Run #463 — five-civilian direct game-scale verification (2026-11-19)

- Tested commit: `c1d8d75aceeef0c9a689c2f8c40ae88909c55ada`
- [Actions run #463](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178); [artifact `14568093189`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178/artifacts/14568093189)
- Direct 28×42 `owCiv` capture audit: **20/20 PASS** — Usher, Cook, Courier, Coach and Referee, each front/back/left/right; method explicitly states live OWT=36, vector scale 0.28, no resize.
- Native directional integrity: 92/92 PASS; no edge contacts or detached large components; 23 unique face profiles left/right.
- Role-debug: 12/12 PASS; prop audit: 10 archetypes PASS; gallery rendered.
- Page errors: 0; script errors: 0; audio-resource 404 console errors remain.
- Overall workflow: **FAILED** on global civilian type silhouette audit (max rendered IoU 0.909429; closest pairs include Clinic/Sailor front and Coach/Courier back) and golden snapshot gate (23 changed / 1 match; baseline remains unapproved).
- The 20 native 64×96 captures and 20 direct 28×42 captures have not been visually inspected by ChatGPT or Claude. All five remain NOT APPROVED; no golden snapshots were refreshed or approved.


## Run #464 — paired contact-sheet packaging verification (2026-11-19)

- [Actions run #464](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571); [artifact `14568746641`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571/artifacts/14568746641)
- Generator verified 20/20 native captures and 20/20 direct game-scale captures, with no missing images.
- Artifact includes `five-civilian-native-4x-contact-sheet.png` (1114×2208) and `five-civilian-game-scale-4x-contact-sheet.png` (730×1208), plus individual images and report.
- Overall workflow remains failed on the global silhouette and unapproved golden snapshot gates. Human visual inspection of both sheets and individual PNGs remains outstanding.


## Runs #463–#464 — complete five-civilian visual evidence (2026-11-19)

- Direct game-scale hook expanded in commit c1d8d75aceeef0c9a689c2f8c40ae88909c55ada: five in-scope civilians × four directions, each rendered directly through `owCiv` at live OWT=36 / vector scale 0.28 into a 28×42 canvas (no resize).
- Run #463 (https://github.com/tinytime/Tinytime.github.io/actions/runs/44602240178), artifact 14568093189, verified the 20/20 direct captures and generated the native 64×96 contact sheet.
- Generator commit 2b21457cb4faaa5d993c46d696df3d3aca07f87a adds a separate 4× nearest-neighbour game-scale contact sheet from the direct 28×42 captures.
- Run #464 (https://github.com/tinytime/Tinytime.github.io/actions/runs/44602808571), artifact 14568746641, verified: native captures 20/20; direct 28×42 captures 20/20; directional integrity 92/92; role debug 12/12; prop audit 10 archetypes; gallery rendered; page errors 0; script errors 0.
- Internal visual inspection of both contact sheets and the town render found no obvious clipping or detached pieces. Usher's clipboard reads in profile; Cook's toque clears the face and pan remains directional; Courier's parcel/satchel and strap remain visible; Coach's silver age cues/profile hair and whistle remain present; Referee's raised card remains present in all views. At 28×42, major role silhouettes and signature props remain distinguishable while fine facial detail compresses. This is ChatGPT internal visual QA only, not owner approval or Claude review.
- Overall Actions result remains FAILED for the global civilian silhouette gate (max rendered IoU 0.9094292803970223, Clinic/Sailor front; Coach/Courier back 0.8939319190922546) and golden snapshot gate (1 match / 23 changed; baseline explicitly unapproved). Do not weaken thresholds or refresh snapshots. Missing-audio 404s remain; page/script exceptions are zero.
- All five remain NOT APPROVED pending Claude's independent review and owner decision. Runner remains outside this review round; remaining 20 civilians remain ON HOLD. No golden snapshots were refreshed or approved.


## Civilian Vector Construction Standard — draft added (2026-11-19)

The owner authorized the permanent [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md). It documents Granny's measured geometry, common technical invariants, character-specific proportion cards, silhouette/anatomy/face/clothing/prop requirements, an eight-stage pipeline, a proposed 100-point rubric, and candidate automated QA measurements.

**Standard status: DRAFT FOR CLAUDE REVIEW AND OWNER RATIFICATION.** Numeric exploration bands, score weights, score bands, and category floors are provisional—not locked production rules and not automated fail thresholds. They require calibration against Granny and the five-character review set. This documentation does not change any character's approval status, authorize golden updates, or release the remaining 20 from hold. Latest five-character evidence remains run #464 as summarized above; current approval and correction statuses in the tracker remain authoritative.

## Independent reviewer handoff — five-civilian revision

Prepared `qa-artifacts/five-civilian-full-review/CLAUDE-REVIEW-BRIEF.md` against renderer source `23c792f7e83eb14ff7d48e197678272f1c3e58b0` and evidence artifact `14568746641` from run #464. The brief covers Usher, Cook, Courier, Coach and Referee, including all 20 native and 20 direct game-scale captures. It explicitly records the global silhouette/snapshot gates and approval boundaries. **Prepared only; not yet submitted to Claude.** All five remain NOT APPROVED; Runner is excluded; remaining 20 remain ON HOLD.


## Six-civilian construction-standard application — 2026-11-19

The [Six-Civilian Construction Standard Audit](SIX-CIVILIAN-CONSTRUCTION-AUDIT.md) applies the draft standard to Usher, Cook, Courier, Runner, Coach and Referee. It records actual native and game-scale renders, a provisional scorecard, and the current six-character body/baseline measurements from run #464. The QA envelope bounds are explicitly not treated as calibrated anatomical ratios because the current measurement method has not yet demonstrated the Granny-equivalent accessory-exclusion convention.

Run #464 body/height/baseline check passes (max height deviation 0.4375 px; max baseline delta 1 px); native directional integrity 92/92, face distinctness 23/23, role-debug 12/12, prop audit, and gallery pass. The overall workflow remains failed on the global Clinic/Sailor silhouette overlap (IoU 0.909429) and unapproved golden snapshots (23 changed / 1 match); missing-audio 404s remain. Runner's direct 28×42 captures are from run #457; its renderer path is unchanged in the later five-character source. The current Claude submission remains five characters; Runner is included in this internal audit only. No snapshots were refreshed or approved. The remaining 20 remain ON HOLD.


## Semantic proportion measurement framework — 2026-11-19

A reusable semantic measurement engine and manifest are implemented: `qa/civilian-proportion-measurements.mjs` and `qa/civilian-anatomy-landmarks.json`. The framework uses Granny's 100×140 source coordinate convention, requires explicit anatomy/headwear/prop annotations per direction, and calculates descriptive head/body, shoulder/body, torso/body, neck/body, and standing leg-region/body ratios. Runner is pose-aware and requires bilateral shoulder/elbow/wrist/hip/knee/ankle landmarks rather than a standing leg ratio. Unit tests and structural validation are now part of the browser QA workflow. Granny's legacy measurement remains the separate baseline; all six civilian records now have source-derived candidate annotations in four directions. These remain unverified candidates; no thresholds are enforced and numeric ratios must not be treated as calibrated until the native overlay review is complete.


## Semantic anatomy measurement framework — 2026-11-19

The semantic proportion measurement engine and fixture tests are now part of the browser QA workflow. See `qa/civilian-proportion-measurements.mjs`, `qa/civilian-anatomy-landmarks.json`, and `qa/CIVILIAN-ANATOMY-ANNOTATION-GUIDE.md`. Granny's established geometry remains a legacy reference record; Usher, Cook, Courier, Runner, Coach and Referee are explicitly pending manual annotation in all four directions. No semantic ratios are claimed yet. Runner requires pose-aware joint landmarks rather than standing leg proportions. Provisional ranges remain non-enforcing.


## Source-derived candidate annotation update — 2026-11-19

The six civilian records now contain first-pass source-derived candidate landmarks for front, back, left and right, based on the pinned `npc_sprites.js` draw paths at commit `8ac99ec8fd7eb7f2328eda7b7332d5e8f2d45317`. Candidate annotations include a coarse anatomical body polygon, headwear and prop exclusion polygons, head/chin/shoulder/pelvis/foot landmarks, and (for Runner) bilateral shoulder/elbow/wrist/hip/knee/ankle joints. The measurement report computes descriptive candidate ratios but labels these records `source_annotated`, not `measured`.

**Verification boundary:** these are manually transcribed source-geometry candidates, not pixel-traced/visually approved masks. The polygons are intentionally coarse and must be overlaid against fresh native 64×96 captures in all four directions; profile mirroring, hair/headwear boundaries, shoulder joints, prop exclusions, and Runner's stride joints require spot-check/correction before promoting any record to `measured` or using ratios for calibration. No proportion band is enforced, no renderer art changed, and no approval status changed.


## Native annotation overlay review — 2026-11-19

Run #487's actual native 64×96 captures were overlaid with the current source-space candidate masks. The preliminary visual review identified corrections still needed: Referee's source-space contour already includes the raised arm/hand and card exclusions are direction-specific. Runner's first candidate incorrectly excluded outfit/arm areas and had off-joint landmarks; it has been revised to retain the race bib as clothing, exclude only the stopwatch, trace the arm/stride silhouette, and reposition all bilateral joints. Cook/Courier/Usher/Coach prop exclusions remain coarse and need direction-specific refinement. The five-civilian evidence sheet excludes Runner, so a new six-civilian overlay generator has been added to the browser QA workflow. No candidates have been promoted to measured and no proportion bands have been calibrated. Referee remains represented as `ref` in renderer capture filenames.


## Runner annotation correction — 2026-11-19

Native overlay inspection showed that the initial Runner candidate wrongly classified the race bib and an arm region as props and placed shoulder/elbow/wrist/knee/ankle landmarks too centrally. The manifest now keeps the bib as clothing, uses only the stopwatch as a prop exclusion (front and side; none on back), expands the anatomical outer contour to follow both arm silhouettes and the stride, and relocates bilateral joints to source-defined limb segments. This is still a candidate revision; the next fresh six-character overlay must be inspected before acceptance.


## Semantic annotation QA update — 2026-11-19 (Run #517)

The six candidate annotation sets are structurally valid and are rendered over 24/24 native directional captures in [Run #517](https://github.com/tinytime/Tinytime.github.io/actions/runs/44613152087), artifact `14573916586`. Dedicated semantic tests passed (43 checks). The report remains at 0 verified measurements, 6 source-annotated candidates, 1 Granny legacy reference, and 6 pending visual verification; no thresholds are enforced. Referee's raised arm/hand is represented by separate appendage polygons, and profile shoulder landmarks permit only a one-source-unit vertical offset. Visual inspection finds the contours generally track the six native renders, but Cook's pan/handle, Courier's bag/parcel and Coach's clipboard exclusions remain coarse, and Runner's joint positions still need final anatomical review. Do not promote any record to `measured` or calibrate proportion bands yet.

Overall browser QA remains failed on the existing game-wide silhouette gate (max full-body IoU 0.909429; max torso-mask IoU 0.923077), unapproved golden snapshots (1 match / 23 changed), and 180 missing audio-file 404s. No renderer artwork or golden snapshots changed, and no character approval status changed. The remaining 17 civilians remain on hold.


## Direction-specific prop refinement — Run #522 (2026-11-19)

Run #522 ([artifact `14572968146`](https://github.com/tinytime/Tinytime.github.io/actions/runs/44613594260/artifacts/14572968146)) regenerated and visually inspected all 24 candidate overlays. Cook's pan/handle exclusions are now distinct for front/back/side (back explicitly empty); Courier's parcels/satchel are direction-specific; Usher's clipboard bounds are direction-specific. This supersedes the earlier note that Cook and Courier still shared broad generic boxes. Coach's clipboard remains the broadest outstanding prop mask. All six records remain `source_annotated`, with 0 verified measurements and 6 pending visual verification. Semantic validation and overlay generation passed; overall browser QA still fails on the established global silhouette, unapproved golden snapshot, and audio 404 gates. No renderer artwork, golden snapshots, or approval states changed.


## Semantic annotation QA update — 2026-11-19 (Run #530)

[Run #530](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614186989) produced the latest six-civilian annotation overlay artifact `14573802446`. The overlay includes all 24/24 native directional captures (Usher, Cook, Courier, Runner, Coach, Referee); the measurement report remains 7 records total, 0 verified measurements, 6 source-annotated candidates, 1 Granny legacy reference and 6 pending visual verifications. Dedicated semantic tests and manifest validation passed. The overlay coordinate fit is now renderer-aware, including per-character vertical fit and left-facing mirroring. Referee's raised arm is represented as separate anatomical appendage polygons. Runner's race bib remains part of the singlet, with stopwatch-only prop exclusions and revised stride joints. Coach's clipboard/whistle masks are now direction-specific: front clipboard+whistle, rear empty, profile clipboard+whistle. Cook and Courier prop masks are likewise direction-specific.

Overall browser QA still fails on the existing game-wide silhouette gate (max full-body IoU 0.909429; max torso-mask IoU 0.923077), the unapproved golden snapshot baseline (1 match / 23 changed), and 180 audio-file 404s. Page errors and script errors are both 0. No renderer artwork, golden snapshots, proportion thresholds, or NPC approval states were changed. All six annotation sets remain candidates pending pixel-tight visual verification; do not calibrate ratios or promote to `measured` yet. Remaining 17 civilians stay on hold.


## Semantic annotation status — Run #530, 2026-11-19

All six current civilians now have four-direction candidate annotations and have received a native-overlay visual spot-check across 24/24 captures in [Run #530](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614186989), artifact `14573802446`. Candidate contours and directional prop/headwear exclusions visually align at overlay scale; this does not make them pixel-traced or verified measurements. Status remains `source_annotated` for all six, Granny remains `reference_only`, and no ratio bands are calibrated. The measurement validator and overlay generator passed. Overall browser QA remains failed on the pre-existing game-wide silhouette, unapproved golden snapshot and missing-audio gates. Remaining work: source-coordinate boundary refinement, harmonize Granny's semantic mask, compare candidate ratios only after conventions match, then independent Claude review and owner approval.


## Six-civilian overlay evidence — Run #534, 2026-11-19

[Run #534](https://github.com/tinytime/Tinytime.github.io/actions/runs/44614783942), artifact \`14574047896\`, tested commit \`5db307350e3e93db05d1145b1aeb9da3a7273b73\` and generated all 24/24 native directional overlays with no missing captures. The overlay was visually inspected; candidate contours are broadly aligned but still coarse and manually transcribed. All six records remain \`source_annotated\`, Granny remains \`reference_only\`, and zero are \`measured\`. Semantic validation, overlay generation, and five-character capture-sheet generation passed. Overall browser QA failed on full-roster silhouette max IoU 0.909429, unapproved golden snapshots (1 match / 23 changed), and 180 audio 404s. The 92-capture visual integrity audit, archetype silhouette quality gate, NPC body check, and gallery passed; page/script errors were zero. No art, golden snapshots, thresholds, or approval states changed.


## Granny semantic capture update — Run #546 (2026-11-19)

[Run #546](https://github.com/tinytime/Tinytime.github.io/actions/runs/44625579202), tested commit `07c63b6bc9eef95b9d39dd62fe4a09ac896c4553`, artifact `14578484083`. The live four-direction Granny capture and alpha row-mask integrity checks passed. Artifact JSON and images were inspected. Pixel counts (body pass / full render / umbrella-exposed delta): front 4380 / 5302 / 922; back 4381 / 5303 / 922; left 3231 / 3895 / 664; right 3186 / 3849 / 663. The umbrella-excluded body pass retains the raised gripping arm/hand, as required, but includes headwear and clothing; it is not yet a verified anatomy-only semantic mask. The polygon outlines remain coarse candidates. Granny stays `reference_only`; approved legacy front/back values are untouched and side-view ratios remain unresolved. No civilian annotations were promoted, no ratio bands changed, and no snapshots were refreshed or approved. Overall workflow failed on existing audio 404 diagnostics, the full-roster silhouette gate (max IoU 0.909429), and the unapproved snapshot gate (1 match / 23 changed). See [QA handoff](04-QA-AND-HANDOFF.md) for full detail.


## Granny pixel-mask visualization follow-up — 2026-11-19

Implementation commit [`2f50d11`](https://github.com/tinytime/Tinytime.github.io/commit/2f50d11dc44491e60ac26f1de84df978674f0b94) adds `granny-pixel-mask-overlay.png` to the live capture output. It visualizes the exact alpha row masks in all four directions: cyan is the umbrella-excluded body pass (including silver hair, clothing and the raised grip); gold is the visible umbrella alpha present only in the full render. Annotation-guide correction [`2c317e9`](https://github.com/tinytime/Tinytime.github.io/commit/2c317e982734f221de8729d5373c4ee4b0f27220) makes the semantic rule explicit: Granny has no separate worn headwear; silver hair is anatomy; canopy and shaft are umbrella props; gripping hand/forearm remain anatomy.

**Status: implementation committed, browser QA and visual inspection pending.** The new sheet has not yet been verified from a fresh Actions artifact. Granny remains `reference_only`; profile measurements unresolved. No reference values, artwork, civilian annotation states, ratio bands, or golden snapshots changed.


## Granny semantic partition correction — Run #552 (2026-11-19)

[Run #552](https://github.com/tinytime/Tinytime.github.io/actions/runs/44628269878), tested source `7e9b3879cd4f816ed1093706d471fe11de0e31c8`, artifact `14581180670`. The live capture, semantic validation and four-direction pixel-mask integrity checks passed. The candidate annotations now correctly declare no worn headwear, retain silver hair/fringe in anatomy, separate the umbrella canopy and shaft as props, and retain the raised forearm/gripping hand as anatomy. A structural validator enforces the four-direction partition. Actual overlay and PNGs were downloaded and visually inspected; the umbrella candidate boundary follows the canopy/shaft in front, back and both profiles. Counts for body/full/umbrella delta are front 4380/5302/922, back 4381/5303/922, left 3231/3895/664, right 3186/3849/663. The prop polygons are still source-derived candidates and require pixel-tight/second-review verification. Granny remains `reference_only`; approved legacy front/back measurements are unchanged; side ratios remain unresolved. No character was promoted to `measured`, no ratios calibrated, and no snapshots approved. Overall workflow failed on 180 audio 404 console errors, full-roster silhouette max IoU 0.909429, and the unapproved golden snapshot gate (23 changed / 1 match). Archetype silhouette-quality audit passed 180/180. See QA handoff for full details.


## Granny pixel-mask overlay verified — Run #555 (2026-11-19)

[Run #555](https://github.com/tinytime/Tinytime.github.io/actions/runs/44628953326), tested source `c90f9bb1a7572670bd85ef0de6dbacd3797bed0e`, artifact `14580687401`. The new four-direction `granny-pixel-mask-overlay.png` was generated, downloaded and visually inspected. Cyan is the exact umbrella-excluded body alpha; gold is the exact visible umbrella-only alpha. The final legend spacing is clean. Semantic validation and Granny capture passed; six-civilian overlays passed 24/24; five-civilian review captures passed 20/20 native and 20/20 direct 28×42. The four direction pixel counts (body/full/umbrella delta) remain front 4380/5302/922, back 4381/5303/922, left 3231/3895/664, right 3186/3849/663. Empty headwear arrays and separate canopy/shaft prop polygons are present in all four directions. Pixel segmentation is now implemented, tested and visually inspected; semantic landmarks and manual polygon edges remain candidates requiring second-review. Granny remains `reference_only`, approved legacy values untouched, profile ratios unresolved; no character promoted, no ratios calibrated and no golden snapshots approved. Overall workflow still fails on 180 audio 404 console errors, full-roster silhouette max IoU 0.909429, and unapproved snapshots (23 changed / 1 match); page/script errors are 0. Archetype silhouette-quality passed 180/180. See QA handoff for full details.


### Candidate polygon precision check — Run #555 artifact

A diagnostic rasterized comparison of hand-authored polygons against exact Run #555 alpha masks found body polygon + appendage IoU of 0.790 front/back and 0.672 left / 0.666 right. Combined umbrella canopy + shaft polygon IoU against the exact visible umbrella delta was 0.609 front/back, 0.612 left and 0.615 right. These are descriptive local comparisons, not CI gates or approval scores. They show why the row-span pixel masks are the reliable segmentation evidence and why manually drawn semantic contours/landmarks remain candidates requiring refinement and second review.


## Granny mask-fit diagnostic baseline — 2026-11-19

The Run #552 artifact's exact alpha masks were used to establish a non-gating polygon-fit diagnostic. The reusable helper/test and capture integration are committed in `qa/granny-mask-fit.mjs`, `qa/test-granny-mask-fit.mjs`, and `qa/build-granny-semantic-overlay.mjs`. Initial body IoU/precision/recall: front 0.786/0.817/0.954; back 0.786/0.817/0.954; left 0.645/0.852/0.727; right 0.644/0.844/0.731. Visible umbrella coverage: front/back 0.822; left 0.815; right 0.816. Side body candidates need substantial refinement; prop coverage is incomplete at some visible edges. These are diagnostic metrics, not hard gates or approval scores. Helper fixture tests passed locally; fresh Actions verification is pending. Granny remains `reference_only`.


## Pixel-derived Granny body contour candidate — 2026-11-19

The current capture implementation retains the old hand-transcribed body polygon/appendages as `manualBodyPolygonCandidate` and replaces the active candidate `bodyPolygon` with an outer contour traced from the exact umbrella-excluded renderer alpha mask. Profiles are inverse-transformed back into local coordinates. The semantic overlay displays the derived contour in red and the manual candidate in magenta. This is still a candidate, not a verified measurement.

Local ten-fixture tests pass. Applied to Run #555's actual artifact, the derived contour matches the body alpha mask at IoU 0.9964 front, 0.9961 back, 0.9954 left and 0.9975 right (recall 1.0). Fresh Actions verification is pending. This method is specific to Granny's renderer pass; do not generalize to other NPCs without confirming their body/prop layer semantics.


## Visible-only umbrella contour — 2026-11-19

The output now keeps full manual umbrella geometry in `manualPropPolygonCandidate` and separate visible-only contours in `visiblePropPolygons`, traced from exact exposed prop alpha. Local comparison against Run #555 gives visible contour IoU 1.0 in all four directions. The full manual prop candidate covers 81.5–82.2% of visible umbrella pixels; the remaining hidden/visible boundary needs second review. This is a diagnostic candidate, not approved prop geometry. Fresh Actions verification pending.


The latest contour helper now preserves every disconnected visible prop component. Its ten-fixture suite covers disconnected components and interior-hole handling; fresh Actions verification remains pending.


## Multi-component mask contour follow-up — 2026-11-19

The Granny mask contour helper now retains every disconnected outer component. Outer body loops are split between the primary `bodyPolygon` and additional `bodyAppendagePolygons`; interior hole loops are excluded; all visible umbrella outer loops are retained in `visiblePropPolygons`. Manual body/prop candidates remain preserved for audit. A new fixture verifies two disconnected components. Latest implementation is committed but awaits fresh Actions evidence and visual inspection; Run #555 remains the latest verified browser artifact. No semantic promotion or approval change.


## Contour topology validation — 2026-11-19

The contour helper now excludes interior hole loops (by winding) from the returned outer contours and preserves all disconnected outer components. This avoids misclassifying holes as anatomical appendages. Ten fixture cases pass locally, including hollow and disconnected masks. Fresh Actions verification remains pending.


## Granny mask topology — 2026-11-19

Contour extraction now retains disconnected outer components and interior holes for both body alpha and visible umbrella delta. The candidate manifest stores outer body loops plus cutout loops separately; fit diagnostics subtract cutouts before mask comparison. This prevents lost detached components and filled transparent gaps. Fixtures cover disconnected components and one interior hole. Latest code is committed; fresh Actions verification and visual inspection remain pending. No semantic status or approval changed.


## Hole-aware contour reconstruction — 2026-11-19

The current helper stores interior body/prop holes separately and subtracts them during fit comparison. Ten local fixtures pass. Applied to Run #555, the exact current contour helper reconstructs body and visible umbrella masks at IoU 1.0 in all four directions. This is algorithm-to-source-mask verification only; fresh Actions QA and human semantic review remain pending.


## Landmark-to-mask evidence — 2026-11-19

The diagnostic report now checks candidate headTop/chin/shoulder/pelvis/foot-baseline values against the exact body alpha. Run #555 data: body bounds y=9..136 in all views; headTop y=8 is one pixel above the first alpha row; chin is within body bounds; both shoulder points touch exact body-alpha pixels; pelvis row counts are 40 front/back and 30 profiles; footBaseline y=136 matches the bottom alpha row. This is evidence for human review, not semantic approval. Eleven local fixtures pass; fresh Actions verification pending.


## Run #587 verification update — 2026-11-19

Run #587 ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44632151886), artifact `14581958311`) confirms the latest Granny helper/capture code in the browser workflow. The 11-fixture helper suite passed; live four-direction Granny capture and both pixel-mask outputs were generated. Pixel-derived body and visible umbrella contours reproduce source alpha at IoU 1.0 in all directions. Landmark diagnostics flag headTop y=8 as one pixel above body alpha y=9; chin is in bounds; shoulder points hit exact body pixels; pelvis row counts are 40 front/back and 30 profiles; footBaseline y=136 matches the bottom row.

The original manual body candidate remains weak (IoU 0.786 front/back; 0.645/0.644 profiles), so it is not ready for semantic promotion. Manual umbrella candidate covers 81.5–82.2% of visible umbrella pixels; hidden extent/grip remains for human review. The pixel-derived masks are renderer evidence, not approved anatomy polygons.

Other QA: 24/24 six-civilian overlay captures; 20/20 five-civilian native and direct game-scale captures; 92/92 directional integrity; role debug 12/12; prop audit 10 archetypes; gallery rendered. Workflow failed on audio 404 diagnostics; full-roster silhouette gate remains max IoU 0.909429 and golden snapshot gate 1/23. No golden snapshots changed. Visual artifact inspection completed; no artistic approval. Granny remains `reference_only`.


## Run #591 — Granny landmark sheet verification (2026-11-19)

[Browser QA #591](https://github.com/tinytime/Tinytime.github.io/actions/runs/44633672693), artifact `14582493188`, tested `5ada0ff9a419f547c178c5a2c559c43ffe0e39f1` (branch head). The label-spacing/output-manifest correction is verified: the four-view `granny-landmark-review.png` is present in the artifact, its CHIN and SHOULDER labels no longer collide, and all candidate lines/points are visible. This is a presentation and artifact-integrity pass, not approval of the candidate anatomical landmarks.

Targeted evidence passed: semantic validation; Granny four-direction capture; six-civilian overlays 24/24; five-civilian native and direct game-scale captures 20/20 each; directional integrity 92/92; role debug 12/12; prop audit 10 archetypes; gallery and town state (16 NPCs; Granny present). Granny direction distinction check passed. No page/script errors. Overall workflow failed on 180 audio 404 console errors across 46 unique URLs, full-roster silhouette max IoU `0.9094292803970223`, and unapproved golden snapshots (1/23). No golden files or approval provenance changed.

The sheet's visual layout is now readable, but body-mask candidate fit remains weak (IoU 0.7875 front, 0.7877 back, 0.6458 left, 0.6447 right); exact pixel-derived contours reproduce renderer alpha at IoU 1.0 but are not semantic anatomy segmentation. Candidate landmarks/polygons remain unverified; Granny stays `reference_only`. Do not calibrate ratios or promote annotations from this run.


## Five-character correction round — Claude targeted findings (2026-11-20)

- Owner-authorized scope: Usher, Cook, Courier, Coach and Referee only. Runner remains excluded; the remaining 17 civilians remain ON HOLD. Referee's dedicated renderer was not modified.
- Renderer commit `d1f937730cbc823fa784f896e716c30ec0c15f71` made the first targeted pass: lighter Usher trousers/shoes and a clearer single badge/waist separation; Coach's first straight-hem jacket revision and reduced silver temple shapes; Cook's first connected cuff/hand/pan construction and lower pan placement.
- Review-sheet tooling commit `e599500e16ad8673fe8073e16fa007183306edf7` adds dedicated Coach/Courier back comparisons (native and direct game scale), Cook prop-contact sheets (native and direct game scale), and Usher direct game-scale readability sheets. These are evidence-generation aids only.
- Browser QA Run #593 ([run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44644502056), source `e599500e16ad8673fe8073e16fa007183306edf7`, artifact `14587548199`) produced 20/20 native 64×96 captures and 20/20 direct 28×42 captures. Syntax and inventory passed; directional integrity 92/92, role-debug 12/12, prop audit, gallery and town regression passed. The five-character contact sheets and all five targeted sheets were generated.
- Internal visual inspection of Run #593 found the Coach/Courier back hem distinction improved, Usher's trousers clearer at game scale, and Cook's pan lower with a visible arm path. Two residual issues remained: additional rear silver shapes still read as headset pieces, and Cook's hand was obscured by later pan drawing at game scale.
- Follow-up renderer commit `a5a22da39a28e51121326d8cc0fc07f36ac1d51d` removes Coach's residual silver side shapes and paints Cook's hand after the handle/pan so the grip can read over the prop. This is implemented but not yet visually verified.
- Browser QA Run #594 is in progress against exact renderer source `a5a22da39a28e51121326d8cc0fc07f36ac1d51d`: [run](https://github.com/tinytime/Tinytime.github.io/actions/runs/44644810758). Do not treat Run #593 as verification of this follow-up.
- Run #593's overall workflow concluded FAILED on the full-roster civilian silhouette gate (maximum rendered IoU 0.9094292803970223; Coach/Courier back 0.8909718796250616) and unapproved golden snapshots (1 match / 23 changed). Page and script errors were zero. Missing audio resource 404s are expected branch noise and non-blocking; no audio assets were added.
- No golden snapshots or provenance were modified. No semantic annotation candidates were promoted. No character is approved by this correction pass; internal QA, Claude's updated comparative review and explicit owner approval remain required.


## Claude comparative re-review — Runs #599/#600 and owner decisions (2026-11-20)

The owner supplied Claude's completed five-character comparative findings. This record summarizes the reviewer report as received; ChatGPT has not independently re-opened every image in this turn.

- **Claude verdict:** ready with disclosed minor issues; no P0/P1 defects; craft scores vs Granny: Usher 6.5, Cook 7.0, Courier 6.5, Coach 6.0, Referee 7.5. None of the five is approved.
- **U1 Usher footwear:** resolved at native and direct 28×42 scales.
- **F1 face individuality:** partly resolved at native scale. Owner decision: facial individuality does not need to survive at direct 28×42; do not treat failure of tiny face cues at that scale as a defect or require a new correction for this reason. Preserve useful native-scale character expression.
- **X1 Coach/Courier rear:** reviewer classified as acceptable shared body mass with distinct role construction, marginally. Owner decision: accept the Coach/Courier rear as-is; no torso redesign or IoU-driven change.
- **C1 Cook pan:** partly resolved, remains an objective P2 in Claude's report. Pan reads as shallow dish, but handle shaft is not visibly continuous from hand to pan; grip fuses at 28×42. Reviewer suggests extending handle about 3–4 native pixels with hand over its end and pan beyond.
- **U2 Usher silhouette:** new P2 in Claude's report. Black silhouette reads as a generic column, especially front/back; reviewer suggests one additional silhouette-level feature. Owner disposition not yet recorded.
- **K1 Coach pale arc/banded rear hair, C2 Cook rear hand posture, U3 Usher profile shoe shape:** P3 observations, not blockers absent owner direction.
- **Evidence limits recorded by reviewer:** Run #599/#600 captures inspected; walk frames not inspected; black sheet is alpha-derived rather than semantic anatomy; town-ground composite is diagnostic, not proof of live named-NPC spawn. Reviewer did not inspect the written identity/proportion cards or internal QA rationale in that session.
- **Version 2.1 audit:** Parts Seven/Eight remain unperformed pending reviewer access to the exact 64,953-byte current standard and supporting documents. The current branch standard includes the Version 2.1 independent-review response section; do not infer the audit from summaries.
- **Next:** resolve C1 and decide whether to address U2. Keep all five NOT APPROVED until internal QA, completed independent review (including the Version 2.1 audit), and explicit owner approval. Remaining 17 stay ON HOLD; Runner remains excluded. No golden snapshots refreshed or approved.


**NPC Designer handoff:** [GitHub issue #1 — approved four-view silhouette exploration for Guard, Vendor and Clinic Worker](https://github.com/tinytime/Tinytime.github.io/issues/1).
