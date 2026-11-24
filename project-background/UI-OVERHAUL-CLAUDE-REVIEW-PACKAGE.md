# Claude Independent Visual Review Package — Stage One

**Project:** Circuit Football RPG  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `UI-Overhaul`  
**Latest verified implementation commit:** `d0d7225f41a647bd8aeb23ea44208d554bb25025`  
**Browser QA:** [GitHub Actions Run #121](https://github.com/tinytime/Tinytime.github.io/actions/runs/45443338719) — 112/112 passed  
**Screenshot artifact:** `ui-overhaul-browser-qa`, artifact ID `14945870640` (browser QA screenshot and diagnostic package)

## Reviewer role

You are the independent visual reviewer. ChatGPT is the implementation owner; the project owner makes the final approval decision. Review the actual rendered screenshots against the original Gemini handoff/reference images and the owner's Stage One feedback. Do not edit code or treat passing QA as visual approval.

The 14-page **Circuit Football — UI Overhaul Handoff Spec** is the design authority. It was supplied in the project conversation and is not stored as a binary file in this repository; the owner should attach the original handoff/reference images when sending this package if you cannot access them. The implementation/status authority is [UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md), with the design inventory in [UI-OVERHAUL-PLAN.md](UI-OVERHAUL-PLAN.md).

## Review scope

Download and inspect the current Run #121 artifact. It includes:

- Overworld: `overworld-after-return.png`, `overworld-portrait.png`, startup transition captures.
- Menu: `desktop-menu.png`, `landscape-menu.png`, `portrait-menu.png`, `narrow-menu-360.png`.
- Settings: `desktop-settings.png`, `desktop-settings-pre-resolution.png`, `portrait-settings.png`.
- Credits: `desktop-credits.png`, `portrait-credits.png`, `desktop-credits-developer.png`, `portrait-credits-developer.png`.
- Menu playbook: `desktop-playbook.png`.
- Match: `match-pre-game.png`, `match-playbook-overlay.png`, `match-playbook-portrait.png`, `match-pre-snap.png`, `match-live-play.png`, `match-defense-selection.png`, `match-defense-simulation.png`, `match-fumble-pile.png`, `match-achievement-toast.png`, `match-post-game.png`, `match-post-game-portrait.png`.

## Owner's Stage One requirements

1. Constrain layout: phone-width portrait menus and centered max-width landscape/desktop composition; no 1440px edge-to-edge admin dashboard.
2. Menu: 2×2 large icon cards; strong UPG badge; playbook counter; goals trophy; DATA & SUPPORT; crimson/pink sticky BACK TO TOWN CTA.
3. Typography: display face for titles/section headers; all-caps mono only for labels/badges; stronger scale and hierarchy.
4. Settings: leading icons, consistent row heights, #1C2130 inner pills, 12–16px radii, 1–2px borders and correct color semantics.
5. Overworld: full-bleed town scene; top-left town/cleared/UPG pill; GOAL strip; top-right MENU; town-accent A ring with dynamic action sublabel; no black letterboxing.
6. Playbook: route/play diagrams, category pills, gold selected card border, FLIP control and cyan CALL PLAY CTA.
7. Credits: concise grouped attribution cards; long details expandable; raw diagnostics/build metadata confined to the hidden developer drawer.
8. Match evidence: pre-game, playbook overlay, pre-snap, live play, defense selection, defense simulation, fumble, achievement toast and post-game. Check overlap/clipping in landscape and portrait where supplied.

## Evaluation criteria

Score each screen from 0–10 against the Gemini references (which define the 10/10 target). Assess:

- Composition, scale, max-width and responsive behavior.
- Typography, iconography, card hierarchy and arcade football energy.
- Palette and semantic CTA colors.
- Readability, clipping, overlap, spacing and visual balance.
- Whether transient overlays (especially achievement toast) obscure HUD, ticker or post-game controls.
- Whether Credits stays concise while the hidden developer drawer remains useful but subordinate.

**Do not award points for QA pass count.** QA is supporting evidence only. A passing test does not prove visual fidelity.

## Required review output

1. Overall visual score and per-screen scores.
2. A short verdict on whether the owner's 6.5+/10 Stage One target is met.
3. The five highest-impact remaining visual corrections, ordered by severity.
4. Any blocking clipping, overlap, interaction or responsive defects, with screenshot filename and location.
5. Explicit distinction between visual issues, functional issues and subjective polish.
6. State whether the implementation is ready for owner approval, or what must be fixed first.

Do not begin or recommend Stage Two redesign work as though it is authorized. The owner must approve the Stage One direction first.


## Latest readiness verification — Run #121

Use Run #121, not the superseded Run #114, as the current functional evidence:

- Exact tested commit: `d0d7225f41a647bd8aeb23ea44208d554bb25025` (matches current `UI-Overhaul` code HEAD at the time of QA).
- [GitHub Actions Run #121](https://github.com/tinytime/Tinytime.github.io/actions/runs/45443338719): **112/112 passed**, zero failures.
- Artifact: `ui-overhaul-browser-qa`, ID `14945870640`.
- HIKE readiness is now explicitly asserted at the actual snap. The recorded state is `artReady:true`, `carryReady:true`, `missing:0`, with a measured readiness wait of **14,728 ms**, within the 15-second automated ceiling. The pre-snap sample also records the expected not-yet-ready state before baking finishes.
- The report contains zero page errors, console errors and same-origin request failures.
- ChatGPT retrieved and inspected `match-pre-snap.png`, `match-live-play.png` and `portrait-menu.png` from this artifact. This confirms the captured pre-snap/live transition and a readable portrait menu; it is not a claim that every image in this artifact received a fresh individual inspection.

The wait is close to the 15-second ceiling and should be considered a performance watch item, particularly on slower devices. Do not hide or remove the readiness gate to improve timing. The reviewer should assess the actual screenshots and design fidelity independently of the green automated result.

**Current decision state:** Stage One is internally QA-passed and ready for independent visual review. It is **not** independently reviewed or owner-approved. Stage Two remains on hold.
