# Project Overview

## Current authority — 2026-11-20

- The first five civilians (Usher, Cook, Courier, Coach and Referee) are owner-approved. Preserve their accepted exceptions and do not make unrequested changes.
- Guard, Vendor and Clinic Worker Revision 02 designs are owner-approved. Claude reviewed Run #626 at source `8cc6836d4eff0a3cb8fcd997373da17769564e20` and requested one final focused profile-readability pass. ChatGPT implemented that pass in `npc_sprites.js` commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b`: Guard right-profile forearm/bracer, stronger Guard/Vendor profile eye and brow marks, and a near-side Clinic pouch strap cue.
- Fresh browser QA and visual inspection of the new commit are pending. Claude must independently review that exact output before the owner makes the final approval decision. The three-character batch is not yet approved as complete.
- Runner remains built but pending focused review and owner decision. The remaining 17 unstarted civilians remain on hold until the current batch passes internal QA, corrected-output Claude review, and explicit owner approval.
- Never approve or refresh golden snapshots without explicit owner authorization. Keep snapshot provenance and existing audio/resource 404s separate from character-art acceptance.

## Project purpose and review model

Vapor City is a browser-based game prototype. This workstream replaces legacy civilian pixel-art characters with individually designed, reusable vector-rendered characters. Granny Volt is the approved visual-quality benchmark, not a template. Every civilian needs an original silhouette, face, outfit, props, palette, and personality.

- **Project owner:** sets direction and makes final approval decisions.
- **Primary builder (ChatGPT):** implements, integrates, tests, inspects rendered evidence, and maintains documentation.
- **Independent reviewer (Claude):** evaluates completed work against Granny Volt and project standards; review does not replace owner approval.

See the [QA handoff](04-QA-AND-HANDOFF.md), [NPC tracker](NPC_VECTOR_CHARACTER_TRACKER.md), [technical implementation](03-TECHNICAL-IMPLEMENTATION.md), and [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md); consult the repository's current art-direction document for visual requirements.

## Latest Guard, Vendor and Clinic QA — 2026-11-20

Run #627 tested renderer commit `6a1fd2a4fbad50dfe39d0fc27ec14c674ecf394b` ([Actions](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457), artifact [14611292138](https://github.com/tinytime/Tinytime.github.io/actions/runs/44698054457/artifacts/14611292138)). Internal QA and visual inspection of all 12 native 64×96 and 12 direct 28×42 captures are complete. The profile refinements are visible; front/back are unchanged; directional integrity and capture checks pass. The workflow remains red on global snapshot/audio-resource diagnostics. Claude's review of the exact output and owner approval remain pending. The batch is not approved complete; remaining 17 civilians remain on hold. See the [Run #627 review package](qa-artifacts/next-civilian-batch/GUARD-VENDOR-CLINIC-RENDERER-QA-AND-CLAUDE-REVIEW.md).
