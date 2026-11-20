# Run #603 — Usher U4 Clipboard Contact Internal QA

**Verdict:** U4 is internally resolved in the exact current renderer. This is not Claude's independent re-review and does not approve any of the five civilians.

## Exact source and evidence

- Renderer source tested: 2c00cfca09cc12ea19a72662c235beed2e9a19cb
- Browser QA run: [Run #603](https://github.com/tinytime/Tinytime.github.io/actions/runs/44658311124)
- Artifact: [vapor-city-browser-qa — artifact 14593339734](https://github.com/tinytime/Tinytime.github.io/actions/runs/44658311124/artifacts/14593339734)
- Baseline comparison: Run #600 artifact 14591690387.
- Exact renderer scope: compared with branch head 47a9b0bdd4438707e7002da5eaff96aa2e0e3398 from before this task, the only npc_sprites.js design change is the Usher profile clipboard/arm correction. Cook's pre-existing renderer block is preserved exactly; Usher's outer silhouette is unchanged.
- Captures inspected: npc-type-directions/usher-left.png, npc-type-directions/usher-right.png, npc-game-scale-28x42/usher-left.png, npc-game-scale-28x42/usher-right.png, plus the full five-civilian native and direct game-scale contact sheets.

## U4 correction and visual result

The profile clipboard is carried by one continuous near-arm construction. The shoulder-to-elbow-to-forearm chain reaches the board; one visible hand contacts the board's lower/front edge. The former hanging near arm and separate far hand are hidden. Left and right profiles preserve character-relative handedness.

- **Native 64×96:** both profiles show one connected arm/hand carrying the clipboard; no second visible hand remains. The forearm chain is visible and the hand meets the lower board edge.
- **Direct 28×42:** the clipboard remains a distinct pale role-prop block; the hand is a compact but connected contact at its lower edge. There is no visible gap.
- **Integrity:** no crop-edge contacts, no detached large components, and no new profile clipping.
- **Scope discipline:** Cook's renderer remains exactly as it was at the starting branch head. No Cook handle work and no Usher silhouette work were included.

## Automated results

| Check | Result |
|---|---|
| Native directional captures | 20/20 |
| Direct game-scale captures | 20/20 at 28×42 |
| Directional visual integrity | PASS, 92/92 |
| Edge contacts | 0 |
| Detached large components | 0 |
| Role debug | PASS, 12/12 |
| Prop audit | PASS |
| Gallery evidence | Generated; PASS |
| Civilian type silhouette audit | Technical pass; 7 full-body review triggers remain human-review items |
| Page errors / script errors | 0 / 0 |
| Missing audio console 404s | 180, existing environment noise |
| Golden snapshot comparison | FAIL, 1 match / 23 changed; baseline remains unapproved and untouched |

Overall Browser QA Run #603 concluded **FAILED** because the golden snapshot baseline is unapproved and existing missing-audio 404s remain. The silhouette audit reports 0.85 as a human-review trigger and passes technical completeness. No golden snapshots were changed or approved.

## Owner dispositions

- Cook C1: owner explicitly says ignore/defer; preserve the starting implementation.
- Usher U2: owner explicitly declined the proposed silhouette change; preserve the starting silhouette.
- Usher U4: owner authorized the correction; internally resolved by this run.
- Coach/Courier rear: accepted exception; preserve rationale.

## Remaining approval work

Submit this exact Run #603 evidence and the current construction standard to Claude for independent re-review. All five civilians remain NOT APPROVED until that review and explicit owner approval. Run #603 has no walk-frame sheet; for any animated character's review package, include the required two frames per direction or explicitly mark unavailable/not applicable.
