# Tinytime.github.io

## NPC art QA scope

The standard NPC art scorecard excludes all cat variants (`cat`, `gcat1`, `gcat2`, `gcat3`) and the 18 legacy `owFig` characters listed in `qa/npc-scope-policy.json`. They remain documented in the full live inventory where applicable, but are not counted in standard NPC coverage, galleries, silhouette comparisons, or golden-image checks. Granny is the owner reference baseline, not a standard NPC scorecard entry. Every browser QA report records the exact `GITHUB_SHA` used to generate it, and the workflow fails if that SHA is unavailable.


### NPC golden snapshot approval

The files in `qa/golden-npcs/` are comparison fixtures, not an art-quality scorecard. The initial 24 PNGs were generated automatically by GitHub Actions in commit `68bf499f078ee9f1156e6503522325e98e71de6f` on 2026-11-18; they were not owner-approved. Their provenance is recorded in `qa/golden-npcs/PROVENANCE.json`. Browser QA must not treat a pixel match as a passing baseline until a human reviewer records an explicit approval identity, date, and approval commit in that manifest. Automated first-run seeding is disabled. Do not refresh or approve the goldens merely to make CI pass; visual review is required first.


### NPC renderer review notes

- Civilian outline ink is darkened independently of the hair palette. Browser QA requires at least 3:1 contrast against the gallery background and reports each low-contrast sprite.
- Fan renders are audited separately for exact RGBA uniqueness and alpha-mask silhouette uniqueness. Palette recolors do not count as silhouette variety. Fan variants now use varied headwear styles and a football foam-finger prop profile; the browser report is the authority on whether those changes produce actual shape diversity.
- The browser artifact includes `torso-pair-diagnostics.png`, showing the eight closest torso-mask pairs as A/B/overlap crops. The closest numerical pair remains a visual-review item even while it is below the IoU cutoff.
- Golden snapshot comparisons remain blocked until the provenance manifest records explicit human approval. Snapshot matches are regression evidence, not art-quality approval.

- Torso-diversity QA rasterizes the renderer's native torso masks at 64x96, rather than cropping arbitrary rows from full-body sprites. All 40 archetype/direction masks must be non-empty. This caught and fixed an inverted youth side-torso transform; the corrected audit reports 180 comparisons with maximum torso IoU 0.813 and at least 16 distinct edge rows in every pair.
- Fan review now records 20 distinct rendered RGBA images and 7 distinct alpha silhouettes; each fan uses its own headwear family and a football foam-finger prop. These counts are technical diversity evidence, not final art approval.
