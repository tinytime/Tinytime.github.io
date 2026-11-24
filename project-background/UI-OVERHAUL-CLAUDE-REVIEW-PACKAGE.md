# Claude Independent Visual Review Package — Stage One

**Project:** Circuit Football RPG  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `UI-Overhaul`  
**Review baseline:** `d0d7225f41a647bd8aeb23ea44208d554bb25025`  
**Browser QA:** [GitHub Actions Run #121](https://github.com/tinytime/Tinytime.github.io/actions/runs/45443338719) — **112/112 passed**  
**Source artifact:** `ui-overhaul-browser-qa`, artifact ID `14945870640`

## Reviewer role

You are the independent visual reviewer. ChatGPT is the implementation owner; the project owner makes the final approval decision. Review only the UI surfaces explicitly listed below, against the original Gemini handoff/reference images and the owner's Stage One feedback. Do not edit code or treat passing QA as visual approval.

The 14-page **Circuit Football — UI Overhaul Handoff Spec** is the design authority. The owner should attach the original handoff/reference images when sending this package if you cannot access them. The implementation/status authority is [UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md](UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md).

## Strict image limit and review scope

**Review exactly these 14 screenshots. Do not inspect or score any other screenshot in the full Actions artifact.** This curated set is intentionally below the agent's 20-image limit.

1. `overworld-portrait.png` — Overworld HUD, portrait.
2. `overworld-after-return.png` — Overworld HUD, landscape.
3. `desktop-menu.png` — Menu, desktop.
4. `landscape-menu.png` — Menu, landscape.
5. `portrait-menu.png` — Menu, portrait.
6. `narrow-menu-360.png` — Menu, narrow phone width.
7. `desktop-settings.png` — Settings, desktop.
8. `portrait-settings.png` — Settings, portrait.
9. `portrait-reset-confirm.png` — Reset confirmation modal, portrait.
10. `desktop-credits.png` — Credits, desktop.
11. `portrait-credits.png` — Credits, portrait.
12. `desktop-credits-developer.png` — Hidden developer drawer, desktop.
13. `portrait-credits-developer.png` — Hidden developer drawer, portrait.
14. `match-playbook-overlay.png` — In-match play-calling sheet.

A curated ZIP containing only these 14 images is supplied separately as `claude-stage-one-review-images-14.zip`. The full Run #121 artifact is retained as QA evidence, but **do not give the reviewer the full artifact as the image-review set**.

### Explicit exclusions

Do not review, score, or request corrections for screens whose UI was not changed in this workstream. In particular, exclude:

- Pre-game matchup screen.
- General pre-snap and live-play HUD.
- Fumble/turnover pile.
- Defense selection and defense simulation.
- Achievement toast.
- Post-game result screens.
- The separate desktop Playbook browsing screen.
- Startup/loading/helper captures and diagnostic JSON.

Those states may appear in automated regression coverage, but regression coverage is not a request for visual review. If a concern arises in an excluded screen, flag it separately as out of scope; do not include it in the Stage One visual score.

## Owner's Stage One requirements

1. Constrain layout: phone-width portrait menus and centered max-width landscape/desktop composition; no 1440px edge-to-edge admin dashboard.
2. Menu: 2×2 large icon cards; strong UPG badge; playbook counter; goals trophy; DATA & SUPPORT; crimson/pink sticky BACK TO TOWN CTA.
3. Typography: display face for titles/section headers; all-caps mono only for labels/badges; stronger scale and hierarchy.
4. Settings: leading icons, consistent row heights, #1C2130 inner pills, 12–16px radii, 1–2px borders and correct color semantics.
5. Overworld: full-bleed town scene; top-left town/cleared/UPG pill; GOAL strip; top-right MENU; town-accent A ring with dynamic action sublabel; no black letterboxing.
6. In-match play-calling sheet: route/play diagrams, category pills, gold selected card border, FLIP control and cyan CALL PLAY CTA.
7. Credits: concise grouped attribution cards; long details expandable; raw diagnostics/build metadata confined to the hidden developer drawer.

## Evaluation criteria

Score each of the changed UI surfaces from 0–10 against the Gemini references (which define the 10/10 target). Assess:

- Composition, scale, max-width and responsive behavior.
- Typography, iconography, card hierarchy and arcade football energy.
- Palette and semantic CTA colors.
- Readability, clipping, overlap, spacing and visual balance.
- Whether the changed surface faithfully implements the owner's listed requirements.

**Do not award points for QA pass count.** QA is supporting evidence only.

## Required review output

1. Overall visual score and per-surface scores, limited to the changed surfaces above.
2. A short verdict on whether the owner's 6.5+/10 Stage One target is met.
3. The five highest-impact remaining visual corrections, ordered by severity.
4. Any blocking clipping, overlap, interaction or responsive defects, with screenshot filename and location.
5. Explicit distinction between visual issues, functional issues and subjective polish.
6. State whether these changed surfaces are ready for owner approval, or what must be fixed first.

Do not begin or recommend Stage Two redesign work as though it is authorized. The owner must approve the Stage One direction first.

## QA evidence and baseline

- Exact reviewed code baseline: `d0d7225f41a647bd8aeb23ea44208d554bb25025`.
- [Run #121](https://github.com/tinytime/Tinytime.github.io/actions/runs/45443338719): **112/112 passed**, zero failures.
- Artifact: [Run #121 evidence](https://github.com/tinytime/Tinytime.github.io/actions/runs/45443338719/artifacts/14945870640).
- HIKE readiness was explicitly asserted at the actual snap: `artReady:true`, `carryReady:true`, `missing:0`, measured wait **14,728 ms**, within the 15-second automated ceiling.
- The report contained zero page errors, console errors and same-origin request failures.
- ChatGPT inspected the pre-snap, live-play and portrait-menu captures from Run #121. This is internal QA evidence, not a claim that every screenshot received individual visual inspection.

### Newer unqualified commit — do not use as review baseline

Run #122 tested `baad03690b434997eba3a45eca30829dbb76a8d2` and **failed** its strict HIKE readiness timing assertion: readiness completed at **23,089 ms**, exceeding the 15-second ceiling. The other reported checks passed, including actual sprite readiness at snap, but the run is not a pass. Do not describe that commit as QA-passed or use its artifact to replace the Run #121 review baseline until the timing issue is corrected and a new run passes.

## Decision state

Claude's Round 2 independent review is now recorded: **9.2/10 overall**. Per-surface scores: Overworld HUD 9.5, Menu/shell 9.5, Settings 9, Credits/developer drawer 9, Playbook overlay 9.5, Reset modal 10. Claude found no blocking defect in the supplied verdict and recommended three polish refinements (menu card color consistency, larger desktop/landscape play diagrams, and slightly tighter settings rows).\n\nClaude also requested broader in-match HUD certification. Those six screens were not changed in this workstream and were deliberately excluded from this changed-screen-only package. Do not claim they are redesigned or certified. A separate scope decision is required before modifying them.\n\n**Independent review: complete. Owner approval: pending.** Stage Two MY TEAM / MY SQUAD remains on hold. Run #122's HIKE readiness timing failure on the newer commit remains unresolved; Run #121 is still the passing code baseline.
