# STATUS — CURRENT STATE (v3.41T COMPLETE CHARACTERS + AAA AUDIT, 2026-11-26)

Replaces `CF_01_STATUS_v338T_UPDATE.md`. Covers completion of **CF_85 Steps E2, D, E3, F1** plus the **Step F2 MAIN Migration Plan** and **Step G Town 3 Spec**, layered cleanly onto the modularized AAA audit build.

## Completed in This Build
- **Step E1 (Crew + Story Characters Everywhere):** `CH3AREA = id => true` active across Hale Harbor, Gull's Reach, Ferry, Vapor City, Arena Dungeon, and Spillway.
- **Step C + E2 (Townspeople Everywhere):** Removed the `n.hb` Hale Harbor lock in `owCiv()`, aliased all 6 generic Vapor City `CIV4` keys (`busker`, `dancer`, `hacker`, `mouse`, `tech`, `usher`) to their approved `CF_104` looks without mutating game data, and renamed the MENU switch to **`TOWNSFOLK: NEW (TEST) / CLASSIC`**.
- **Steps D & E3 (Drawn Town Animations Everywhere):**
  - Turn-to-face-Eli + 3-step friendly arm wave on talk (auto-restores original facing after dialogue).
  - Captains on Trophy Thrones stay seated and give a 3-step head nod on talk.
  - Job animations across all towns: shore crab-kid (`kid2`) 4-step crouch/dig, `sailor`/`courier` carry bob, `n.sit` seated posture, and 4-step `welder` tool/torch swing.
- **Step F1 (Speed & Memory Pass):**
  - **LITE Effects 3 Hz Cadence:** Standing NPC picture cache drops from 10 Hz to **3 Hz** (and caps DPR at `2x`) when `LITE EFFECTS` is ON — cutting idle canvas redraws by **70%** on older phones.
  - **Bounded 48-Entry NPC Picture Pool:** `owCiv3Draw._pool` evicts and zeroes offscreen canvas buffers beyond 48 entries across town/room transitions so mobile Safari GPU memory stays flat.
  - **All MENU Switches Kept Intact:** `TOWNSFOLK: NEW (TEST) / CLASSIC` and `CHARACTERS: NEW (TEST) / CLASSIC` remain untouched pending your explicit Step F2 approval.
- **AAA Audit & 10/10 Trilogy Included:** 6 modular engine files (`src/modules/`), `scripts/build-core.mjs`, `qa/release-gate.mjs` (`0` `MutationObserver`s, `0` silent catches, `18.2 KB` `index.html`), Lob/Bullet passing, Chain-Move Combos, One-Tap Pre-Snap Audibles, Native Gamepad support, full `A11Y` Settings suite, cel-shaded `title-screen.webp`, and compressed `rain.mp3`.

## Step F1 — Speed & Memory Hotspot Audit
1. **Matches (KayKit + Big Guys):** Peak GPU memory (~25–35 MB) when 22 rigged figures + 4x MSAA render target (`rt`) run simultaneously. Mitigated by lazy `kkShowcase` FBO reuse, demand-driven `bakePump()`, and zero-alloc `dynZoom()`.
2. **Drawn Towns & Rooms:** Peak canvas memory previously grew unbounded as every visited NPC kept `n._c3`. Now hard-capped at 48 active canvases (~3–5 MB max) and throttled to 3 Hz in `LITE EFFECTS`.
3. **Audio Payload:** Deferred non-active area music/beds behind `requestIdleCallback` and compressed `rain.b0c6101e.wav` (479 KB -> 131 KB `.mp3`).

## Step F2 — MAIN Migration Plan (DO NOT EXECUTE UNTIL OWNER APPROVES)
MAIN is currently at **v3.16** (pre-dungeon, pre-KayKit, pre-Hale Harbor overhaul, pre-drawn townspeople).
- **What Changes for Existing MAIN Players:**
  - Full modular Vite/static architecture, Hale Harbor + Gull's Reach + Ferry + Basin/Arena Dungeons, 3D KayKit match figures + big linemen, drawn townspeople/captains/animations everywhere, full `A11Y` suite, Gamepad support, and Lob/Bullet/Audible/Combo offense upgrades.
- **Save-Compatibility Risks & Mitigations:**
  - `migrateSave()` must be tested with a raw v3.16 `localStorage` payload (`SAVE.starters`, `SAVE.beaten`, `SAVE.uni`, `SAVE.settings`) to confirm zero crash on load, default `SAVE.settings.snd` initialization, and safe fallback if `SAVE.town` is absent.
  - Confirm `SAVE CODE` export/restore round-trips cleanly from v3.16 -> v3.41T.
- **Switches to Remove Only After Your Green Light:** `TOWNSFOLK: NEW/CLASSIC`, `CHARACTERS: NEW/CLASSIC`, and `MY TEAM 3D: KAYKIT/CLASSIC`.

## Step G — Town 3 (Cinderhold) Drawn-From-Start Rule
All Town 3 townspeople, crew members, and story characters must be authored directly in `src/modules/05-overworld-towns.js` using `CIV3` + `CH3MAP`:
- Reuse approved jobs (`keeper`, `elder`, `fisher`, `welder`, `guard`, `coach`, `clinic`, `kid`, `fan`) with zero duplicate art.
- Add only Cinderhold-exclusive jobs to `C4` / `CIV3` (front/side/back, `#1E262C` outline, 2–4 U idle loop) and add Cinderhold captains/crew to `CH3MAP` with team jackets + Trophy Throne toppers.
