# Vapor City chat playbook

Use these prompts to create focused new chats without losing project rules or relying on old conversation context.

## How to start a new chat

1. Open the role prompt that matches the work.
2. Copy the entire [Common Startup Prompt](chat-prompts/00-COMMON-STARTUP-PROMPT.md) into the new chat.
3. Paste the selected role prompt after it.
4. Give the new chat the immediate task or the exact handoff package.
5. Require it to complete the GitHub cold-start and report branch, HEAD, latest relevant test evidence, current stage and authorization before acting.

Every role prompt requires the new chat to re-read current GitHub state. The prompts are durable instructions; dated project status belongs in the README and tracker, not hard-coded into role prompts.

## Role prompts

| Chat type | Prompt |
|---|---|
| Project Lead / Orchestrator | [01 — Project Lead and Orchestrator](chat-prompts/01-PROJECT-LEAD-AND-ORCHESTRATOR.md) |
| NPC Designer | [02 — NPC Designer](chat-prompts/02-NPC-DESIGNER.md) |
| Renderer / Technical Development Specialist | [03 — Renderer and Technical Developer](chat-prompts/03-RENDERER-AND-TECHNICAL-DEVELOPER.md) |
| QA / Visual Reviewer | [04 — QA and Visual Reviewer](chat-prompts/04-QA-AND-VISUAL-REVIEWER.md) |
| Claude Independent Reviewer | [05 — Claude Independent Reviewer](chat-prompts/05-CLAUDE-INDEPENDENT-REVIEWER.md) |
| Gameplay / Systems Developer | [06 — Gameplay and Systems Developer](chat-prompts/06-GAMEPLAY-AND-SYSTEMS-DEVELOPER.md) |
| Documentation / GitHub / Release Steward | [07 — Documentation and Release Steward](chat-prompts/07-DOCUMENTATION-AND-RELEASE-STEWARD.md) |

## Canonical project documents

- [Project README / current checkpoint](README.md)
- [Project Overview](01-PROJECT-OVERVIEW.md)
- [Art Direction and Approval](02-ART-DIRECTION-AND-APPROVAL.md)
- [Technical Implementation](03-TECHNICAL-IMPLEMENTATION.md)
- [QA and Handoff](04-QA-AND-HANDOFF.md)
- [NPC Vector Character Tracker](NPC_VECTOR_CHARACTER_TRACKER.md)
- [Civilian Vector Construction Standard](CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md)

## Continuity rules

- GitHub is the source of truth. Chat history is not a project database.
- Each new chat must verify branch HEAD and current Actions/artifacts, not trust a copied SHA or stale status summary.
- Every specialist must report work state precisely: implemented, tested, visually inspected, independently reviewed, owner-approved.
- Internal QA must catch construction-standard defects before Claude review.
- Claude reviews exact evidence independently; owner makes the final decision.
- Do not bypass approvals, alter golden snapshots, or begin held work without explicit authorization.
