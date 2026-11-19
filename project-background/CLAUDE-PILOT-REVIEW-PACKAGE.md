# Claude Independent Review Package — First Vector Civilian Pilot

**Purpose:** Independent comparative visual review of Usher, Cook, and Courier against Granny Volt's approved 10/10 quality benchmark.

**Requested reviewer:** Claude (independent reviewer)  
**Project owner:** Final approval authority  
**Builder:** ChatGPT  
**Review status:** Ready for independent review; no pilot character is approved by this package.

## Exact source and evidence

- Repository: https://github.com/tinytime/Tinytime.github.io
- Branch: `npc-granny-baseline-overhaul`
- Combined source commit used for the review artifact: [`a006d3cee143b7ac7b3a4ec2ed614eb0f604a551`](https://github.com/tinytime/Tinytime.github.io/commit/a006d3cee143b7ac7b3a4ec2ed614eb0f604a551)
- Latest renderer commit for Courier: [`87227b217fead5134d9dd375e67139c13097f49c`](https://github.com/tinytime/Tinytime.github.io/commit/87227b217fead5134d9dd375e67139c13097f49c)
- Cook renderer refinement: [`5ed3f49cd7c7767a716383945236a33b4c82dcb8`](https://github.com/tinytime/Tinytime.github.io/commit/5ed3f49cd7c7767a716383945236a33b4c82dcb8)
- QA workflow: [Run #44539341875](https://github.com/tinytime/Tinytime.github.io/actions/runs/44539341875)
- Artifact: `vapor-city-browser-qa` (artifact ID `14537616516`; available from the run's Artifacts section; artifact expiry shown by GitHub)
- QA report in artifact: `report.json`, sourceCommitSha `a006d3cee143b7ac7b3a4ec2ed614eb0f604a551`

## Required artifact files

Inspect the actual rendered PNGs, not only source code or report metrics:

- Four directions at native 64×96: `npc-type-directions/usher-{front,back,left,right}.png`, `cook-{front,back,left,right}.png`, and `courier-{front,back,left,right}.png`.
- Granny baseline: `npc-snapshots/granny.png` and `granny-before-after-4x.png`.
- Pilot comparison and construction: `npc-gallery-4x.png`, `npc-gallery-1x.png`, `cook-courier-usher-role-debug-8x.png`.
- Game context: `game-town-1x.png` and `game-menu-1x.png`.
- Supporting diagnostics: `report.json`, `torso-pair-diagnostics.png`, `npc-atlas-vs-renderer-4x.png`.

## Internal QA status (ChatGPT)

All three pilot characters have passed their character-specific internal QA and are **BUILT — NOT APPROVED**.

- **Usher:** targeted palette/body/face/role/prop and four-direction checks passed in prior QA; included again in the combined gallery and current QA artifact.
- **Cook:** internal QA passed on run #44537588645, artifact #14536893339; front/back/left/right inspected; revised pan grip and rear silhouette addressed.
- **Courier:** internal QA passed on run #44539341875, artifact #14537616516. Syntax/module/inventory, palette, body/baseline/contrast, face distinctness, prop, 92-capture visual-integrity, town and gallery checks passed. All four directions inspected. Courier/Cook back-view full-body silhouette IoU is 0.8517, below the 0.90 pair threshold.

The combined run's overall workflow is **FAILED**, not because of a new pilot-specific defect:
1. Legacy full-civilian silhouette audit still flags Clinic/Sailor front (IoU 0.9094), Coach/Vendor front (0.8990) and Coach/Vendor back (0.8912).
2. Golden snapshots are explicitly unapproved; 23 snapshots differ and one matches. Do not refresh or approve them as part of this review.
3. The browser log contains 135 audio-resource 404 console errors. Reported scriptErrors and pageErrors are both empty.

These global failures must be evaluated separately from the three pilots. The internal QA pass is not an approval.

## Review criteria

Please independently score each of Usher, Cook, and Courier from 1–10 against Granny's finish and consistency, and provide:

1. Overall quality score and approve/reject recommendation for each character.
2. Silhouette identity at native size and thumbnail size; compare all three pilots against each other and Granny.
3. Face/expression quality and distinction.
4. Clothing construction, material cues, layering, seams, and finish.
5. Palette cohesion and differentiation.
6. Prop design, grip/attachment, readability at native game scale, and correct direction-specific placement.
7. Front/back/left/right completeness and consistency; identify any weak direction.
8. Foot placement, scale, clipping, and town/gallery integration.
9. Specific defects ranked by severity, with concrete corrections.
10. Whether the three-character batch is collectively ready for owner approval after any required fixes.

Do not give credit solely for passing automated checks. Do not approve based on code inspection alone. Use the screenshots in the artifact as the primary visual evidence and source code only to clarify construction.

## Approval boundary

Claude's review is advisory and independent. ChatGPT will assess each finding, implement valid corrections, and rerun QA. The project owner makes the final approval decision. Until both stages are complete, tracker status remains **NOT APPROVED** for all three pilots. Do not begin the remaining 20 civilians before this review and owner approval.
