# Circuit Football RPG — Stage Two Independent Review Package

**Review target:** MY TEAM and MY SQUAD  
**Design authority:** owner-supplied *Circuit Football — UI Overhaul Handoff Spec*, Section 3, pages 5–6  
**Implementation branch:** `UI-Overhaul`  
**Latest successful correction commit:** `8aff7da49a4a5bafc255f3fc073783803469377c`  
**CSS root-selector correction:** `71e1a20af05483d45ea832d0193e68d9f557b1fc`  
**Latest verification:** [Run #315](https://github.com/tinytime/Tinytime.github.io/actions/runs/45534558797), 222/222 assertions, exact tested commit `8aff7da49a4a5bafc255f3fc073783803469377c`  
**Historical baseline QA:** [Run #297](https://github.com/tinytime/Tinytime.github.io/actions/runs/45527525193) — successful, 216/216 assertions  
**Latest evidence artifact:** [Artifact 14987300342](https://github.com/tinytime/Tinytime.github.io/actions/runs/45534558797/artifacts/14987300342)  
**Latest STYLE & GEAR and defense-simulation QA:** Run #315 passed; the parent-panel, trail-scroll-end and defense-simulation screenshots were inspected.

## Scope

Review only the Stage Two MY TEAM and MY SQUAD changes. Do not expand scope into Stage Three. Preserve the approved Stage One surfaces and all gameplay, progression, save data, and existing renderers.

## Changed implementation files

- `ui-overhaul-menu.js` — MY TEAM tab behavior, menu action handling and SAVE & EQUIP visible label.
- `ui-overhaul.css` — menu action layout/frames and MY TEAM / MY SQUAD portrait styling.
- `qa/ui-overhaul-browser-qa.mjs` — browser assertions for menu, MY TEAM tabs and locked-trail hints, MY SQUAD and broader regression coverage.
- `project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md` — implementation handoff and current verification state.

## Required visual evidence in the latest Artifact 14987300342

Inspect these first at 390×844 portrait:

1. `my-team-portrait.png`
2. `my-squad-attributes-portrait.png`
3. `my-squad-style-gear-portrait.png`
4. `my-team-uniform-portrait.png`
5. `my-team-trails-portrait.png`
6. `my-team-trails-bottom-portrait.png`

Also inspect `portrait-menu.png`, `desktop-menu.png` and `narrow-menu-360.png` for menu tile order, treatment and narrow-width fit. The artifact contains the wider Stage One/Two regression screenshot set, including playbook and match screens.

## MY TEAM acceptance criteria

- Keep the live 2.5D player preview prominent and visually balanced.
- Provide three distinct, clearly selected tabs: **IDENTITY | UNIFORM | TRAILS**.
- IDENTITY must pair TEAM NAME and TEAM LOGO / PICK LOGO side-by-side without clipping.
- UNIFORM must present the existing colour-slot and palette controls clearly; preserve save-backed customization.
- TRAILS must show run-trail challenge chips and readable unlock hints underneath locked trails.
- Keep the full-width **SAVE & EQUIP** action fixed at the bottom and accessible.
- Confirm tab changes do not discard edits or break the existing save flow.

## MY SQUAD acceptance criteria

- Keep the 2.5D player preview prominent.
- Show distinct, readable **CAP** and **PTS** badges.
- Use three distinct tabs: **ATTRIBUTES | STYLE & GEAR | CAREER**.
- Attribute upgrades should communicate boost and cost together (handoff format: `+2 · 3P`).
- STYLE & GEAR must expose Name, Skin tone, Jersey number, Visor and Arm sleeves controls.
- Keep the starter roster strip pinned at the bottom, with all entries readable and selectable.
- Confirm no horizontal overflow, clipping, or loss of save/progression behavior.

## Automated QA evidence

[Run #315](https://github.com/tinytime/Tinytime.github.io/actions/runs/45534558797) tested exact commit `8aff7da49a4a5bafc255f3fc073783803469377c` and passed **222/222 assertions** with zero failures, zero uncaught page exceptions, zero console errors and zero same-origin HTTP failures. Evidence artifact: [14987300342](https://github.com/tinytime/Tinytime.github.io/actions/runs/45534558797/artifacts/14987300342).

Coverage includes:
- Four-tile 2×2 menu order, gold MY SQUAD / cyan secondary frames, and portrait vertical fit at 390px and 360px.
- MY TEAM Back/Cancel, live UPG badge, full-width single-line PICK LOGO action, IDENTITY / UNIFORM / TRAILS tabs, bottom-pinned SAVE & EQUIP, eight locked-trail hints and scroll-to-end visibility of the final hint above the fixed save action.
- MY SQUAD PTS/CAP badges, ATTRIBUTES / STYLE & GEAR / CAREER tabs, `P` cost suffix, inline VISOR / ARM SLEEVES, appearance-toggle persistence, pinned roster strip and no horizontal overflow.
- Stage One and match-flow regressions, including Fumble meter/A-control separation and defense-simulation banner suppression.


## Independent review findings and correction round — 2026-11-25

Independent Stage Two review scores: MY TEAM **8/10**, MY SQUAD **8.5/10**, Menu Integration **7.5/10**. All listed findings were addressed:

- **MY TEAM — navigation:** added a clear header BACK control that returns to the menu without requiring SAVE & EQUIP; retained the existing SAVE & EQUIP action. Added a live UPG status badge driven by the overworld upgrade count.
- **MY TEAM — logo action:** PICK LOGO is now a full-width single-line control stacked above the fox emblem. The actual 390×844 screenshot shows the button at 132.5px wide with no text overflow.
- **MY SQUAD — cost units:** upgrade buttons display values such as `+2 · 3P`, `+2 · 2P` and `+2 · 1P`.
- **MY SQUAD — gear hierarchy:** VISOR and ARM SLEEVES now render inline below JERSEY NUMBER in the parent STYLE & GEAR panel. The separate BACK TO STYLE subview and its extra tap are removed; toggle changes remain visible and save-backed.
- **Menu — layout:** consolidated the separate upgrade and squad destinations into one gold MY SQUAD tile with the subtitle “Starters & upgrades”; MY TEAM, PLAYBOOK and GOALS & STATS occupy the other three positions in a 2×2 grid. DATA & SUPPORT and BACK TO TOWN fit in the portrait view. Desktop and 360px narrow screenshots were inspected.

Run #315 tests the corrected state and includes assertions for each of these points plus scroll-to-end visibility of the final locked-trail hint above SAVE & EQUIP. Automated QA passed 222/222 with zero page exceptions, console errors or same-origin failures. Stage Two remains pending explicit owner approval.

## Reviewer instructions

Please compare the actual screenshots to the handoff mockups, not just the automated report. Give separate scores and concrete findings for MY TEAM, MY SQUAD, and menu integration. Call out any visual defects, unclear hierarchy, cramped controls, clipping, weak contrast, inconsistent spacing, or divergence from the reference. Distinguish blocking defects from polish recommendations. Do not approve the work merely because automated QA passed.

## Run #295 correction verification

Run #295 succeeded on commit `2cd3b457eca4b36481298a3d6dfab79e95fa0573`: 216/216 assertions, zero page exceptions, console errors, or same-origin HTTP failures. Artifact 14982981067 was downloaded and the refreshed MY TEAM, MY SQUAD attributes, and gear-subview screenshots were visually inspected. The Stage Two palette now renders; MY TEAM SAVE & EQUIP is pinned to y=784–834 in the 844px portrait viewport; PTS/CAP badges are separate and approximately 60×38px; the roster strip is pinned without overflow.

The earlier gear screenshot captured the gear subview, not the parent STYLE & GEAR panel. Run #297 now captures and asserts the parent panel in `my-squad-style-gear-portrait.png`; the actual screenshot was inspected. It shows NAME, seven SKIN TONE swatches, JERSEY NUMBER controls, EDIT GEAR & TRAILS, the player preview, and the pinned starter roster.

## Internal screenshot inspection and corrective follow-up

ChatGPT retrieved and inspected the actual Run #291 screenshots for MY TEAM, MY SQUAD attributes, MY SQUAD gear, menu integration, and Fumble. This is internal inspection of the **pre-correction** output, not approval.

Two visual defects were identified:
- MY TEAM / MY SQUAD retained legacy brown/orange styling, and MY TEAM's tabs were undersized. The save action was not pinned to the bottom: its captured bottom edge was at y=582 in an 844px viewport.
- MY SQUAD's PTS/CAP header metrics were visually compressed.

Root cause: Stage Two CSS selectors incorrectly assumed the team and squad screens were descendants of `#app`; the HTML places both screens as siblings of `#app`. The selector correction is committed in `71e1a20af05483d45ea832d0193e68d9f557b1fc` (116 selectors corrected). QA commit `2cd3b457eca4b36481298a3d6dfab79e95fa0573` adds explicit computed-style, tab-size, bottom-pinning, and metric-presentation assertions.

Run #295 and artifact 14982981067 verify the MY TEAM / MY SQUAD selector correction (216/216). Run #297 and artifact 14983701764 verify the expanded STYLE & GEAR controls and the defense-simulation banner correction (216/216). The latest screenshots have been retrieved and visually inspected. Run #291 remains historical pre-correction evidence only.

## Current limitations and approval gate

All independent Stage Two findings supplied on 2026-11-25 have been addressed and verified in Run #315. The corrected screenshots and broader Stage One regression captures have been retrieved and visually inspected. **The only remaining Stage Two gate is explicit owner approval.**

1. The owner reviews the updated Stage Two package and evidence.
2. The owner explicitly approves Stage Two.
3. Only then may Stage Three begin.

No golden snapshots or snapshot provenance were changed.

## Latest verification — Run #297

- Exact tested commit: `02fbc1d9761812fbd49e0815574f1bf82c1e40a3`.
- [Run #297](https://github.com/tinytime/Tinytime.github.io/actions/runs/45527525193): **216/216 passed**, zero failures; artifact [14983701764](https://github.com/tinytime/Tinytime.github.io/actions/runs/45527525193/artifacts/14983701764).
- Defense simulation: Run #296 revealed that the old field banner remained visible because its CSS ancestor selector targeted the wrong DOM root. Commit `02fbc1d` moves the suppression scope to `body`. The Run #297 `match-defense-simulation.png` screenshot confirms the old banner is absent and the “THEIR DRIVE · BALANCED” possession pill is unobstructed.
- STYLE & GEAR: `my-squad-style-gear-portrait.png` is now the correct parent panel screenshot, not merely the nested gear subview. It visually shows the name editor, skin swatches, jersey-number controls, gear/trails entry action, player preview, and pinned starter roster with no horizontal overflow.
- Run #297's artifact contains the Stage One regression screenshots as well as the broader Stage Two and match-flow screens. The fumble screenshot was rechecked and retains the approved meter/A-control separation.
- **Approval gate remains open:** this package is ready for final internal reconciliation and independent Claude review, not owner approval yet. Claude review and explicit owner approval remain pending. No golden snapshots or provenance were changed.


## Latest verification — Run #313 (2026-11-25)

- Exact tested commit: `3be8785d5a250d65430f7c50571d5d0d428a9d36`.
- [Run #313](https://github.com/tinytime/Tinytime.github.io/actions/runs/45533380570): **222/222 passed**, zero failures, zero page exceptions, zero console errors and zero same-origin failures.
- Evidence [Artifact 14985344956](https://github.com/tinytime/Tinytime.github.io/actions/runs/45533380570/artifacts/14985344956) was downloaded and inspected.
- Screenshots inspected: `portrait-menu.png`, `desktop-menu.png`, `narrow-menu-360.png`, `my-team-portrait.png`, `my-squad-attributes-portrait.png`, `my-squad-style-gear-portrait.png`, `overworld-portrait.png`, `match-fumble-pile.png`, and `match-defense-simulation.png`.
- MY TEAM header and logo layout are clear; UPG reads the live count; SAVE & EQUIP remains bottom-pinned.
- MY SQUAD cost units are legible; VISOR and ARM SLEEVES are directly below JERSEY NUMBER in the parent STYLE & GEAR view; the roster strip remains pinned.
- The menu uses four tiles in two rows. At 360px portrait, DATA & SUPPORT and BACK TO TOWN remain visible without clipping.
- The Fumble meter remains separated from the A control; defense simulation retains the corrected possession pill without the stale field banner.
- Independent review findings have been addressed. **Stage Two owner approval remains pending.** Do not begin Stage Three until explicit approval. No golden snapshots or provenance were changed.



## Latest verification — Run #315 (2026-11-25)

- Exact tested commit: `8aff7da49a4a5bafc255f3fc073783803469377c`.
- [Run #315](https://github.com/tinytime/Tinytime.github.io/actions/runs/45534558797): **222/222 passed**, zero failures, zero page exceptions, zero console errors and zero same-origin failures.
- Evidence [Artifact 14987300342](https://github.com/tinytime/Tinytime.github.io/actions/runs/45534558797/artifacts/14987300342) was downloaded and inspected.
- Added a dedicated trail-scroll assertion: the QA scrolls the actual `.ui-team-tab-content` panel to its end and verifies the final locked-trail unlock hint remains above the fixed SAVE & EQUIP action. The captured bottom state places the final hint bottom at y=751.5 and the save action top at y=784 in the 844px viewport.
- Screenshots inspected: `portrait-menu.png`, `desktop-menu.png`, `narrow-menu-360.png`, `my-team-portrait.png`, `my-team-uniform-portrait.png`, `my-team-trails-portrait.png`, `my-team-trails-bottom-portrait.png`, `my-squad-attributes-portrait.png`, `my-squad-style-gear-portrait.png`, `overworld-portrait.png`, `match-fumble-pile.png`, and `match-defense-simulation.png`.
- Independent review findings remain addressed. **Stage Two owner approval remains pending.** Do not begin Stage Three until explicit approval. No golden snapshots or provenance changed.

