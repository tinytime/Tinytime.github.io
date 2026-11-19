# NPC Vector Character Design Tracker

**Project:** Vapor City civilian NPC vector redesign  
**Branch:** `npc-granny-baseline-overhaul`  
**Current baseline commit:** `35027d7d849ee3bb9ef173f2ae6172a53de920ba`

## Approval standard

A character is **Approved** only after:
1. The custom vector design is complete and visually distinct.
2. Internal QA passes for front, back, left, and right views, scale/foot baseline, silhouette, face, palette, props, and town readability.
3. Claude independently reviews it against the Granny Volt 10/10 benchmark and recommends approval.
4. Any review changes are addressed and rechecked.

A passing automated test alone does not mean the design is approved. Do not approve or refresh golden snapshots without explicit project-owner authorization.

## Benchmark

| Character | Role | Status | Notes |
|---|---|---|---|
| Granny Volt | Visual quality benchmark | **APPROVED — 10/10 baseline** | Reference for quality, finish, readability, and consistency. Do not copy her silhouette, outfit, or palette. |

## Three-character vector pilot

The first review batch is three characters total. Once all three are built and internally checked, send the complete set to Claude for a comparative review alongside Granny Volt.

| Character | Role / identity | Status | Internal QA | Claude review | Notes |
|---|---|---|---|---|---|
| Usher | Civic / venue usher; cap, clipboard, formal uniform | **BUILT — NOT APPROVED** | Targeted checks passed; four-direction render captured | Pending | First vector pilot. Navy/steel palette with restrained brass accents; distinct from Granny. |
| Cook | Food service / chef | **IN PROGRESS — NOT APPROVED** | Pending | Pending | Planned identity: chef toque, distinctive kitchen uniform/apron, profession-specific prop, warm palette unlike Usher and Granny. |
| Courier | Delivery / messenger | **NOT STARTED — NOT APPROVED** | Pending | Pending | Planned identity: distinct cap or helmet, delivery bag, parcel/dispatch prop, separate silhouette and palette. |

## Full civilian roster

All designs below remain unapproved until their own design and review are complete.

| # | Character | Current design status | Internal QA | Claude review | Notes |
|---:|---|---|---|---|---|
| 1 | Runner | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 2 | Coach | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 3 | Referee | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 4 | Courier | **NOT STARTED — NOT APPROVED** | Pending | Pending | Included in first three-character pilot. |
| 5 | Guard | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 6 | Vendor | **NOT STARTED — NOT APPROVED** | Pending | Pending | |
| 7 | Cook | **NOT STARTED — NOT APPROVED** | Pending | Pending | Included in first three-character pilot. |
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

- **2026-11-19:** Usher vector pilot integrated. Run #393 passed its targeted usher checks. Overall browser workflow remains failed by the unapproved golden-snapshot gate and legacy civilian silhouette-overlap audit. These are tracked separately from usher approval.
- **2026-11-19:** Agreed to complete three vector characters before the next Claude review: Usher, Cook, and Courier.
- **Approval rule:** Keep every new character marked **NOT APPROVED** until internal QA and Claude's independent review are complete.
