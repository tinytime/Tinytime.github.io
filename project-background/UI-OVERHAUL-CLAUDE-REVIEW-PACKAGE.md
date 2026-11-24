# Claude Independent Visual Review Package — Stage One (Complete Scope)

**Project:** Circuit Football RPG  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `UI-Overhaul`  
**Review baseline:** `95c7a8120a077aab4ec8fd23adf21890ca9fc7c7`  
**Browser QA:** [Run #194](https://github.com/tinytime/Tinytime.github.io/actions/runs/45458852969) — **142/142 passed**  
**Evidence artifact:** [Run #194 artifact 14951189647](https://github.com/tinytime/Tinytime.github.io/actions/runs/45458852969/artifacts/14951189647)

## Reviewer role and decision boundary

You are the independent visual reviewer. ChatGPT is responsible for implementation and internal QA. The project owner makes the final approval decision. Review the complete Stage One scope below against the original Gemini handoff/reference images and the owner's subsequent art-direction feedback. Do not edit code. Do not treat automated QA pass count as visual approval.

The 14-page **Circuit Football — UI Overhaul Handoff Spec** remains the design authority. Compare rendered output with its relevant reference pages and the owner's explicit refinements. If the original handoff images are not attached to your review session, request them before assigning a final fidelity score.

## Strict review image set

Review exactly these **20 screenshots** from Run #194's artifact. Do not score unrelated diagnostics, startup captures, or Stage Two screens.

1. `overworld-portrait.png` — Overworld HUD, portrait.
2. `overworld-after-return.png` — Overworld HUD, landscape.
3. `desktop-menu.png` — Menu composition, desktop.
4. `portrait-menu.png` — Menu composition, portrait.
5. `narrow-menu-360.png` — Menu at 360px.
6. `desktop-settings.png` — Settings, desktop.
7. `portrait-settings.png` — Settings, portrait.
8. `portrait-reset-confirm.png` — Reset confirmation, portrait.
9. `portrait-credits.png` — Credits, portrait.
10. `desktop-credits-developer.png` — Hidden developer drawer, desktop.
11. `desktop-playbook.png` — Playbook catalog, desktop.
12. `match-playbook-overlay.png` — Actual in-game play-calling sheet.
13. `match-pre-game.png` — Pre-game matchup.
14. `match-pre-snap.png` — Pre-snap state.
15. `match-live-play.png` — Live-play HUD and TURBO stamina ring.
16. `match-fumble-pile.png` — Fumble pile and mash control.
17. `match-defense-selection.png` — Defense selection.
18. `match-defense-simulation.png` — Defense simulation.
19. `match-achievement-toast.png` — Achievement toast.
20. `match-post-game-portrait.png` — Portrait post-game result.

Use only these named files from the artifact. The full artifact is evidence storage, not permission to review unrelated images. Do not inspect or score MY TEAM / MY SQUAD as a redesigned Stage One surface; that is Stage Two and remains on hold.

## Stage One scope to review in totality

### Overworld and navigation shell
- Full-bleed Overworld town scene with town/status/cleared/UPG pill, GOAL strip, MENU control and contextual A-button action label.
- Centered, constrained menu composition; 2×2 icon-led cards; clear UPG and Goals hierarchy; distinct DATA & SUPPORT group; crimson/pink BACK TO TOWN action.
- Narrow-phone layout at 360px: no horizontal overflow, title/UPG collision, or PLAYBOOK/arrow overlap; GOALS & STATS wraps to exactly two lines.

### Settings, reset, credits and developer utility
- Settings hierarchy, leading icons, consistent row treatment, tighter vertical spacing, usable touch targets, and correct semantic colors.
- Settings content scrolls fully to the DANGER ZONE without clipping it behind BACK TO TOWN.
- Reset confirmation is clear and fits portrait viewport.
- Credits remain concise and grouped; runtime diagnostics/build metadata stay in the hidden developer drawer.

### Playbook
- Desktop Playbook catalog uses enlarged route diagrams and readable play names.
- Actual in-game play-calling sheet uses route diagrams, category controls, selected gold card, FLIP and cyan CALL PLAY.
- The scoreboard's first-to target badge must yield cleanly to the in-game Playbook sheet; check for overlap, obscured text, and correct layering.

### In-game match HUD and states
These are included in Stage One because they are explicitly part of the handoff's Stage One screen inventory and have received correction work. Do not omit them:
- Pre-game matchup and TAP TO PLAY separation from the progress bar.
- Pre-snap HUD and HIKE action.
- Live-play HUD and segmented TURBO stamina ring.
- Fumble meter at approximately 65% width, clear of the A mash button.
- Defense Selection with three aligned stat rows: STOP, BIG PLAY, TAKEAWAY.
- Defense Simulation with the navy drive-status pill lowered clear of the top HUD; offense controls hidden.
- Bottom-centered, non-blocking Achievement Toast clear of the ticker.
- Post-game result with matte navy team-score card, exactly two team marks, matchup and score; portrait fit.

The top scoreboard itself is not being redesigned. Review only the framing/spacing/overlap checks explicitly included above.

## Owner-specific visual requirements

- Main matte charcoal/navy: `#131620`; inner/inactive pills: `#1C2130`.
- Gold `#F5B841`: selected/active cards and tabs.
- Cyan `#4DE1F2`: primary execution CTAs, active toggles and stamina/loading.
- Green `#34D399`: open receiver highlight and PREVENT defense border.
- Crimson `#EF4444`: BLITZ, fumble DEFENSE fill and reset danger treatment.
- Town accent reserved for Overworld A-button ring and town pill.
- 1–2px borders, 12–16px radii, restrained effects on in-match HUDs.
- Respect safe-area insets and fixed bottom controls.

## Evaluation and required output

Score each changed surface from 0–10 against the Gemini reference target. Assess composition, hierarchy, typography, palette, responsive fit, readability, clipping, overlap, spacing, gameplay-state clarity and fidelity to owner requirements.

Return:
1. Overall Stage One visual score and per-surface scores.
2. Whether the owner's 6.5+/10 target is met.
3. The five highest-impact remaining corrections, ordered by severity.
4. Every blocking clipping, overlap, interaction or responsive defect, with screenshot filename and location.
5. Separate visual defects, functional defects and subjective polish.
6. Explicit recommendation: ready for owner approval, or exact fixes required first.

Do not request changes to untouched surfaces outside this Stage One scope. Do not recommend starting Stage Two as though it is authorized.

## QA evidence (supporting evidence only)

- Run #192: 141/141 passed; HIKE readiness 18,353 ms.
- Run #193: 141/141 passed; HIKE readiness 9,190 ms.
- Run #194: 142/142 passed; HIKE readiness 18,104 ms; `artReady:true`, `carryReady:true`, `missing:0`.
- Run #194 reports zero failed checks, page errors, console errors and same-origin failures.
- The measured HIKE readiness varies by run; the existing 20-second assertion remains in force. Do not award visual points for QA pass count.

## Decision state

Internal implementation, automated QA and screenshot inspection are complete for this Stage One correction checkpoint. **This is not owner approval.** Independent review is requested against the exact baseline and 20-image set above. Stage Two MY TEAM / MY SQUAD remains on hold until the owner explicitly approves Stage One.
