# Circuit Football RPG — Stage Two Independent Review Package

**Review target:** MY TEAM and MY SQUAD  
**Design authority:** owner-supplied *Circuit Football — UI Overhaul Handoff Spec*, Section 3, pages 5–6  
**Implementation branch:** `UI-Overhaul`  
**Run #291 baseline code commit:** `381363ff1caae36c080b7a9f3cf73af6f4a77046`  
**CSS root-selector correction:** `71e1a20af05483d45ea832d0193e68d9f557b1fc`  
**Run #295 verified correction:** `2cd3b457eca4b36481298a3d6dfab79e95fa0573`  
**Browser QA:** [Run #295](https://github.com/tinytime/Tinytime.github.io/actions/runs/45526079186) — successful, 216/216 assertions  
**Evidence artifact:** [Artifact 14982981067](https://github.com/tinytime/Tinytime.github.io/actions/runs/45526079186/artifacts/14982981067)  
**Additional STYLE & GEAR QA:** `0689410f424ba8947ae3554d891002b7cefc2fd4` — Run #296 in progress

## Scope

Review only the Stage Two MY TEAM and MY SQUAD changes. Do not expand scope into Stage Three. Preserve the approved Stage One surfaces and all gameplay, progression, save data, and existing renderers.

## Changed implementation files

- `ui-overhaul-menu.js` — MY TEAM tab behavior, menu action handling and SAVE & EQUIP visible label.
- `ui-overhaul.css` — menu action layout/frames and MY TEAM / MY SQUAD portrait styling.
- `qa/ui-overhaul-browser-qa.mjs` — browser assertions for menu, MY TEAM tabs and locked-trail hints, MY SQUAD and broader regression coverage.
- `project-background/UI-OVERHAUL-IMPLEMENTATION-SUMMARY.md` — implementation handoff and current verification state.

## Required visual evidence in Artifact 14981780185

Inspect these first at 390×844 portrait:

1. `my-team-portrait.png`
2. `my-squad-attributes-portrait.png`
3. `my-squad-gear-portrait.png)

Also inspect `portrait-menu.png` and `desktop-menu.png` for menu tile order and treatment. The artifact contains the wider Stage One/Two regression screenshot set, including playbook and match screens.

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

Run #295 tested the CSS-corrected code/QA commit above and completed successfully:

- 212 assertions passed; zero failed assertions.
- Zero uncaught page exceptions.
- Zero console errors.
- Zero same-origin HTTP failures.
- Menu visually orders UPGRADES, MY TEAM, MY SQUAD, PLAYBOOK and GOALS & STATS.
- UPGRADES uses a gold frame; the other four menu tiles use cyan frames.
- MY TEAM's IDENTITY / UNIFORM / TRAILS tabs and their interactions pass.
- All eight locked trails display a crew-challenge unlock hint.
- MY TEAM identity content and SAVE & EQUIP fit the 390×844 viewport.
- MY SQUAD's PTS/CAP badges, three tabs, gear subview/return, pinned roster strip and horizontal fit checks pass.
- Fumble geometry and Stage One palette checks pass.

## Reviewer instructions

Please compare the actual screenshots to the handoff mockups, not just the automated report. Give separate scores and concrete findings for MY TEAM, MY SQUAD, and menu integration. Call out any visual defects, unclear hierarchy, cramped controls, clipping, weak contrast, inconsistent spacing, or divergence from the reference. Distinguish blocking defects from polish recommendations. Do not approve the work merely because automated QA passed.

## Run #295 correction verification

Run #295 succeeded on commit `2cd3b457eca4b36481298a3d6dfab79e95fa0573`: 216/216 assertions, zero page exceptions, console errors, or same-origin HTTP failures. Artifact 14982981067 was downloaded and the refreshed MY TEAM, MY SQUAD attributes, and gear-subview screenshots were visually inspected. The Stage Two palette now renders; MY TEAM SAVE & EQUIP is pinned to y=784–834 in the 844px portrait viewport; PTS/CAP badges are separate and approximately 60×38px; the roster strip is pinned without overflow.

The previous gear screenshot captured the gear subview, not the parent STYLE & GEAR panel. A further QA commit `0689410f424ba8947ae3554d891002b7cefc2fd4` adds assertions for NAME, SKIN TONE, JERSEY NUMBER, skin swatches and jersey-number controls, and captures `my-squad-style-gear-portrait.png`. Run #296 is in progress; do not use that screenshot until the artifact is available.

## Internal screenshot inspection and corrective follow-up

ChatGPT retrieved and inspected the actual Run #291 screenshots for MY TEAM, MY SQUAD attributes, MY SQUAD gear, menu integration, and Fumble. This is internal inspection of the **pre-correction** output, not approval.

Two visual defects were identified:
- MY TEAM / MY SQUAD retained legacy brown/orange styling, and MY TEAM's tabs were undersized. The save action was not pinned to the bottom: its captured bottom edge was at y=582 in an 844px viewport.
- MY SQUAD's PTS/CAP header metrics were visually compressed.

Root cause: Stage Two CSS selectors incorrectly assumed the team and squad screens were descendants of `#app`; the HTML places both screens as siblings of `#app`. The selector correction is committed in `71e1a20af05483d45ea832d0193e68d9f557b1fc` (116 selectors corrected). QA commit `2cd3b457eca4b36481298a3d6dfab79e95fa0573` adds explicit computed-style, tab-size, bottom-pinning, and metric-presentation assertions.

The corrected output has **not yet been browser-tested or visually inspected**. Run #291 and artifact 14981780185 remain pre-correction evidence only. The new push-triggered Actions run ID/result/artifact has not been retrievable through the connected GitHub status/run lookup in this session; no pass is claimed.

## Current limitations and approval gate

Stage Two remains **in progress** until:
1. The fresh browser run tests the correction commit and all new style/pinning assertions pass.
2. ChatGPT inspects the refreshed MY TEAM / MY SQUAD screenshots and Stage One regression captures, correcting any valid defects.
3. Claude completes independent review and valid findings are addressed.
4. The project owner explicitly approves the Stage Two package.

No golden snapshots or snapshot provenance were changed.
