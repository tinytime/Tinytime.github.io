# NPC Vector Character Design Tracker

**Project:** Vapor City civilian NPC vector redesign  
**Branch:** `npc-granny-baseline-overhaul`  
**Last recorded implementation checkpoint:** `08b4556a8ec4d1756ac3c7af698d4acb8bb8685a` (Cook renderer refinement; verify the latest branch head before continuing)

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
| Cook | Food service / chef | **BUILT — NOT APPROVED** | Targeted palette/body/face/role-debug/prop checks pass; follow-up silhouette and pan-grip QA pending | Pending | Dedicated vector path integrated: tall pleated toque, broad double-breasted cream coat, terracotta apron with ties/pocket, copper sauté pan with visibly connected grip; follow-up widened shoulder/apron silhouette refinement committed, dark cropped curls; four intentional directions. Native-size and 4× directional renders inspected. No approval claimed. |
| Courier | Delivery / messenger | **PLANNED — NOT APPROVED** | Pending | Pending | Working concept: distinct cap or helmet, delivery bag, parcel/dispatch prop, separate silhouette and palette. |

## Full civilian roster

All designs below remain unapproved until their own design and review are complete.

| # | Character | Current design status | Internal QA | Claude review | Notes |
|---:|---|---|---|---|---|
| 1 | Runner | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 2 | Coach | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 3 | Referee | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 4 | Courier | **PLANNED — NOT APPROVED** | Pending | Pending | Included in first three-character pilot. |
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

- **2026-11-19 follow-up:** Visual inspection of Run `44537243995`'s actual four-direction artifact found the front/side pan handle too weakly legible and Cook's rear silhouette too close to Usher (back-view IoU `0.8778`). Updated Cook's coat/apron silhouette and drew a filled, outlined pan handle from the hand into the pan. Commit `5ed3f49cd7c7767a716383945236a33b4c82dcb8`. Browser run `44537588645` is testing that code; QA output from this run is not yet verified. CI on the previous tested revision also fails the global civilian silhouette uniqueness audit, unapproved golden-snapshot gate, and reports missing audio assets (404); Cook-specific checks passed there. No Courier work started.
