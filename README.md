# Tinytime.github.io

## NPC art QA scope

The standard NPC art scorecard excludes all cat variants (`cat`, `gcat1`, `gcat2`, `gcat3`) and the 18 legacy `owFig` characters listed in `qa/npc-scope-policy.json`. They remain documented in the full live inventory where applicable, but are not counted in standard NPC coverage, galleries, silhouette comparisons, or golden-image checks. Granny is the owner reference baseline, not a standard NPC scorecard entry. Every browser QA report records the exact `GITHUB_SHA` used to generate it, and the workflow fails if that SHA is unavailable.
