# Circuit Football RPG — Stage Two Independent Review Package

**Review target:** MY TEAM and MY SQUAD  
**Design authority:** owner-supplied *Circuit Football — UI Overhaul Handoff Spec*, Section 3, pages 5–6  
**Implementation branch:** `UI-Overhaul`  
**Code commit tested by QA:** `381363ff1caae36c080b7a9f3cf73af6f4a77046`  
**Browser QA:** [Run #291](https://github.com/tinytime/Tinytime.github.io/actions/runs/45522385402) — successful, 212/212 assertions  
**Evidence artifact:** [Artifact 14981780185](https://github.com/tinytime/Tinytime.github.io/actions/runs/45522385402/artifacts/14981780185)

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

Run #291 tested the exact code commit above and completed successfully:

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

## Current limitations and approval gate

ChatGPT's internal screenshot inspection is **not yet recorded**. The artifact has been generated and the automated run is green, but screenshot fidelity has not been independently or internally visually approved in this checkpoint.

Stage Two remains **in progress** until:
1. ChatGPT inspects the actual screenshots and resolves valid defects.
2. Claude completes independent review and valid findings are addressed.
3. The project owner explicitly approves the Stage Two package.

No golden snapshots or snapshot provenance were changed.
