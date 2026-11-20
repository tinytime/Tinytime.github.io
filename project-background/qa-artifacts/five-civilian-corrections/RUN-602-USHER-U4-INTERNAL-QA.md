> **SUPERSEDED:** Use the exact-source Run #603 QA and Claude re-review brief instead. Run #602 tested an intermediate source that temporarily restored Cook's pre-existing edit; the current owner instruction is to preserve the branch-start Cook code. Run #603 is the authoritative U4 evidence.

# Run #602 — Usher U4 Clipboard Contact Internal QA

**Verdict:** U4 is internally resolved in the tested renderer. This is not Claude's independent re-review and does not approve any of the five civilians.

## Exact source and evidence

- Renderer source tested: `880cad6bf937d8bfc1e004fe81cbd6854c522d23`
- Browser QA run: [Run #602](https://github.com/tinytime/Tinytime.github.io/actions/runs/44657007100)
- Artifact: [`vapor-city-browser-qa` — artifact 14592969167](https://github.com/tinytime/Tinytime.github.io/actions/runs/44657007100/artifacts/14592969167)
- Artifact capture summary: 20/20 native 64×96 and 20/20 direct 28×42 captures; exact direct renderer method, no resize.
- Inspected actual files: `npc-type-directions/usher-left.png`, `npc-type-directions/usher-right.png`, `npc-game-scale-28x42/usher-left.png`, `npc-game-scale-28x42/usher-right.png`, plus the five-civilian native and game-scale contact sheets.

## U4 correction and visual result

The profile clipboard is now carried by one continuous near-arm construction. The shoulder-to-elbow-to-forearm chain reaches the board; one visible hand contacts the board's lower/front edge. The former hanging near arm and separate far hand are hidden. Left and right profiles mirror the character-relative carry consistently.

- **Native 64×96:** both profiles show one arm/hand carrying the clipboard; no second visible hand remains. The forearm chain is visible and the hand meets the lower board edge.
- **Direct 28×42:** the clipboard remains a distinct pale role-prop block; the hand is a compact but connected contact at its lower edge. No visible gap between hand and board.
- **Integrity:** no crop-edge contacts, no detached large components, no new clipping in the two profiles.
- **Scope discipline:** Cook's C1 handle/pan contact was restored to its pre-existing implementation in this same commit; no Cook fix remains. Usher's outer silhouette was not changed.

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
| Civilian type silhouette audit | Technical pass; 7 full-body and 3 torso review triggers remain human-review items |
| Page errors / script errors | 0 / 0 |
| Missing audio console 404s | 180, existing environment noise |
| Golden snapshot comparison | FAIL, 1 match / 23 changed; baseline remains unapproved and untouched |

Overall Browser QA Run #602 concluded **FAILED** because the unapproved golden snapshot gate and existing 180 missing-audio 404 console errors remain. The artistic silhouette audit now reports 0.85 as a review trigger and passes technical completeness; no pairwise similarity is an automatic failure. No golden snapshots were changed or approved.

## Owner dispositions

- Cook C1: owner explicitly deferred/accepted current implementation; no Cook edit authorized.
- Usher U2: owner explicitly declined the silhouette proposal; no silhouette edit authorized.
- Usher U4: owner authorized and the tested implementation is internally resolved as described above.
- Coach/Courier rear: accepted exception remains unchanged.

## Remaining approval work

Submit the exact Run #602 evidence and this internal QA record for Claude's independent re-review. The five civilians remain NOT APPROVED until that review and explicit owner approval. Run #602 contains no walk-frame sheet; any animated character's next review package must include the required two frames per direction or explicitly mark the evidence unavailable/not applicable.
