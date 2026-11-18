# Tinytime.github.io

## NPC art QA scope

The standard NPC art scorecard excludes all cat variants (`cat`, `gcat1`, `gcat2`, `gcat3`) and the 18 legacy `owFig` characters listed in `qa/npc-scope-policy.json`. They remain documented in the full live inventory where applicable, but are not counted in standard NPC coverage, galleries, silhouette comparisons, or golden-image checks. Granny is the owner reference baseline, not a standard NPC scorecard entry. Every browser QA report records the exact `GITHUB_SHA` used to generate it, and the workflow fails if that SHA is unavailable.


### NPC golden snapshot approval

The files in `qa/golden-npcs/` are comparison fixtures, not an art-quality scorecard. The initial 24 PNGs were generated automatically by GitHub Actions in commit `68bf499f078ee9f1156e6503522325e98e71de6f` on 2026-11-18; they were not owner-approved. Their provenance is recorded in `qa/golden-npcs/PROVENANCE.json`. Browser QA must not treat a pixel match as a passing baseline until a human reviewer records an explicit approval identity, date, and approval commit in that manifest. Automated first-run seeding is disabled. Do not refresh or approve the goldens merely to make CI pass; visual review is required first.
