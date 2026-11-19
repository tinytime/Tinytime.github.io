# NPC Vector Character Design Tracker

**Project:** Vapor City civilian NPC vector redesign  
**Branch:** `npc-granny-baseline-overhaul`  
**Latest implementation commit:** `87227b217fead5134d9dd375e67139c13097f49c` (Courier parcel-grip refinement). QA expectations update: `a006d3cee143b7ac7b3a4ec2ed614eb0f604a551`; latest browser run `44539341875` is IN PROGRESS for the combined final revision.

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

## Three-character vector pilot

The first review batch is three characters total. Once all three are built and internally checked, send the complete set to Claude for a comparative review alongside Granny Volt.

| Character | Role / identity | Status | Internal QA | Claude review | Notes |
|---|---|---|---|---|---|
| Usher | Civic / venue usher; cap, clipboard, formal uniform | **BUILT — NOT APPROVED** | Targeted checks passed; four-direction render captured | Pending | First vector pilot. Navy/steel direction with restrained brass accents; distinct from Granny. |
| Cook | Food service / chef | **BUILT — INTERNAL QA PASSED; NOT APPROVED** | Run `44537588645` / commit `5ed3f49`: palette, body/baseline, face, role-debug, prop, four-direction visual-integrity, town and gallery checks passed; 4× directional renders inspected. Overall workflow failed on unrelated global silhouette and unapproved golden-snapshot gates; audio asset 404s also logged. | Pending — batch review after Courier | Dedicated vector path: tall pleated toque, double-breasted cream coat, terracotta apron with ties/pocket, copper sauté pan. Latest refinement widens coat/apron silhouette and connects the pan grip visibly to the hand. No golden snapshots changed; no design approval claimed. |
| Courier | Delivery / messenger | **REVIEW FINDINGS — COURIER FIXES IN PROGRESS; NOT APPROVED** | Claude reviewed all 12 direction PNGs and supporting composites. Required: add readable profile face to left/right; make front/back/side bag one consistent messenger satchel with correct right-hip orientation; remove detached cyan line below jacket hem. | Independent review received; reinspection required after fixes | Claude found no blocking defects on Usher or Cook. Courier requires all three corrections before batch recommendation. No golden snapshots changed; owner approval pending. |

## Full civilian roster

All designs below remain unapproved until their own design and review are complete.

| # | Character | Current design status | Internal QA | Claude review | Notes |
|---:|---|---|---|---|---|
| 1 | Runner | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 2 | Coach | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 3 | Referee | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 4 | Courier | **COURIER FIXES IN PROGRESS — NOT APPROVED** | Internal QA passed on run `44539341875`; Claude identified two major and one minor correction | Claude review received; correction/reinspection pending | Third vector pilot. No new characters until all pilot corrections are complete, independently rechecked, and owner decides. |
| 5 | Guard | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 6 | Vendor | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 7 | Cook | **BUILT — NOT APPROVED** | Targeted checks pass; global workflow fails on separate gates | Pending | Included in first three-character pilot; dedicated vector renderer now integrated. |
| 8 | Clinic worker | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
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
| 22 | Usher | **BUILT — NOT APPROVED** | Targeted checks passed | Pending | First vector pilot. |
| 23 | Fan | **NOT STARTED — NOT APPROVED** | Pending | Pending | Fan variants will share the approved base design while retaining their variant-specific identity. |

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