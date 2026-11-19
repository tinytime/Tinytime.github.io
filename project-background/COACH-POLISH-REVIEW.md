# Coach — Final Polish Review

**Date:** 2026-11-19  
**Branch:** `npc-granny-baseline-overhaul`  
**Previous inspected renderer:** `3fdbd1e0640c97afce2c3b732491ff84823ba84e`  
**Polish commit:** `f78627caf53b15cfe1bee0f30feea39d68da7c35`

## Scope

This is a deliberately narrow polish pass based on the latest Coach corrected-render review. It does not reopen the character design, repeat the full four-direction approval process, alter other NPCs, or touch golden snapshots.

## Changes

- **Whistle:** enlarged and reshaped the front/profile pendant into a clearer whistle form, with a brighter barrel highlight, defined mouthpiece/bell silhouette, and slightly stronger lanyard.
- **Profile clipboard:** widened the board and paper area, strengthened the practice-mark detail, and adjusted the overlapping forearm/hand so the prop reads less like a narrow strip while remaining visibly held.
- Preserved Coach's forest-green jacket, cream yoke, cap, silver-templed hair, pose, face, baseline, and existing direction/mirroring logic.

## Internal review

**Source-level review: PASS for this polish patch.** The changes are confined to `drawCoachVector` in `npc_sprites.js`; the patch uses the existing path/line/shape helpers and retains the hand-over-board layering. No other character renderer was intentionally changed. The previous corrected-render run #428 remains the baseline evidence for all other Coach construction and directional integrity.

**Post-patch visual render:** not yet inspected. The patch is ready for owner review; if the newly enlarged whistle or clipboard feels too prominent in the live render, make only a small scale adjustment.

## Approval boundary

This is an internal approval of the limited polish implementation, not final character approval. Coach remains **NOT APPROVED** as a member of the Runner/Coach/Referee comparative batch until Claude's comparative review and the owner's acceptance. No golden snapshots were refreshed or approved.
