# Project Overview

## What this project is

Vapor City is a browser-based game prototype in this repository. This workstream is a visual and technical redesign of its civilian non-player characters (NPCs). The goal is to replace the current pixel-style civilian characters with individually designed, custom vector-rendered characters that look polished, readable, and consistent in the game world.

The intention is not to create one generic vector person and recolor it. Each civilian should have a recognizable identity, silhouette, face, clothing, palette, and role-specific details. The approved vector characters will be reusable across the game's towns.

## Why the work changed direction

The earlier pixel-oriented approach was not producing the desired character quality or distinctiveness. The project owner decided to move forward with custom vector rendering for the civilian roster. Granny Volt is already the visual quality benchmark. The first vector usher experiment demonstrated that the game can render a character using custom vector paths and gradients while retaining the game's placement and scale conventions.

The vector approach is now the chosen direction for the civilian redesign. Treat the existing pixel art as legacy implementation to be replaced for each character as that character is completed—not as a design template that every new character should imitate.

## Roles and review model

- **Project owner:** sets direction, approves designs, and decides when a batch is ready to expand.
- **Primary builder (ChatGPT):** owns implementation, integration, browser QA, artifact inspection, and documentation updates.
- **Independent reviewer (Claude):** reviews completed character designs critically against Granny Volt and the project's standards. Claude is a reviewer, not the primary implementer.

The builder should provide Claude with the actual rendered sheets, comparative images, relevant source, and a clear review brief. A reviewer should not be asked to approve from code descriptions alone.

## Current agreed plan

The first batch is exactly three civilians:

1. **Usher** — first vector pilot; integrated in the renderer, targeted checks passed, but not approved.
2. **Cook** — second pilot character; integrated and internally checked for Cook-specific criteria, pending comparative review.
3. **Courier** — third pilot character; bespoke vector renderer integrated, correction QA run #410 independently inspected; ready for focused Claude re-review.

After all three are built and internally checked in four directions and at game scale, send them together to Claude for a comparative review alongside Granny Volt. Apply the review findings, rerun checks, and return the results to the project owner. Do not start the other 20 civilian designs before this review unless the owner changes the sequence.

## Scope and counts

The project tracker lists 23 civilian character types. Granny Volt is separate: she is the approved visual benchmark, not one of the 23 civilian redesigns. Fan variants are variants of the Fan character family, not extra base character types.

The repository's automated inventory currently describes 24 live civilian archetype mappings. That inventory count includes the Fan archetype and is separate from the 23-name redesign roster in the project tracker. Keep those two scopes distinct; do not change inventory policy or scope classifications casually.

## Key decisions already made

- Move from the prior pixel approach to bespoke vector-rendered civilians.
- Reuse the completed vector character designs across towns.
- Make the 23 civilians individually recognizable; avoid a shared-body recolor approach.
- Use Granny Volt as a 10/10 quality reference, not a template to copy.
- Complete Usher, Cook, and Courier as the first review batch.
- Require both internal QA and Claude's independent review before approval.
- Keep golden snapshot approval separate from automated QA. Never approve or refresh snapshots without explicit owner authorization.

## Current state at handoff

The Usher vector renderer is integrated in `npc_sprites.js`. The previous browser QA run (#393) showed the targeted usher checks passing, but the overall workflow still failed for separate snapshot-approval and legacy silhouette-audit gates. See [QA, known issues, and handoff](04-QA-AND-HANDOFF.md).

Usher, Cook, and Courier remain unapproved pending the comparative pilot review and owner acceptance. The live status is maintained in [the character tracker](NPC_VECTOR_CHARACTER_TRACKER.md).
