# NPC Vector Character Design Tracker

**Project:** Vapor City civilian NPC vector redesign  
**Branch:** `npc-granny-baseline-overhaul`  
**Last recorded implementation checkpoint:** `35027d7d849ee3bb9ef173f2ae6172a53de920ba` (Usher targeted-QA checkpoint; verify the latest branch head before continuing)

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
| Cook | Food service / chef | **IN PROGRESS — NOT APPROVED** | Pending | Pending | Working concept: chef headwear, distinctive kitchen uniform/apron, profession-specific prop, and a palette distinct from Usher and Granny. |
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
| 7 | Cook | **IN PROGRESS — NOT APPROVED** | Pending | Pending | Included in first three-character pilot. |
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
- **2026-11-19:** Project background handoff folder created. This tracker was moved here from `docs/NPC_VECTOR_CHARACTER_TRACKER.md`.
- **Approval rule:** Keep every new character marked **NOT APPROVED** until internal QA, Claude's independent review, and project-owner acceptance are complete.
