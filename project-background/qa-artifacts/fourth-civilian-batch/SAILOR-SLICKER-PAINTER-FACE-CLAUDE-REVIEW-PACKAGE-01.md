# Sailor, Slicker and Painter — F6 face-stage independent review package 01

**Purpose:** Independent comparative review of the integrated grayscale face proposals.  
**Repository:** `tinytime/Tinytime.github.io`  
**Branch:** `npc-granny-baseline-overhaul`  
**Exact source commit tested:** `a857f7b4d2238ef8fd63da99465aa27ee11cafe0`  
**Actions run:** [#867](https://github.com/tinytime/Tinytime.github.io/actions/runs/44845374254)  
**Evidence artifact:** [vapor-city-browser-qa — 14682766863](https://github.com/tinytime/Tinytime.github.io/actions/runs/44845374254/artifacts/14682766863)

## Review status

Prepared for Claude; **not yet sent and not independently reviewed**. The owner retains final approval authority.

## Source files

- [Approved revision-21 silhouette baseline](SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-21.svg)
- [F6 face geometry exploration 03](SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-03.svg)
- [Integrated grayscale face overlays 01](SAILOR-SLICKER-PAINTER-INTEGRATED-FACE-OVERLAYS-01.svg)
- [Integrated face internal QA record 01](FOURTH-BATCH-INTEGRATED-FACE-INTERNAL-QA-01.md)
- [Owner decision package 01](SAILOR-SLICKER-PAINTER-FACE-OWNER-DECISION-PACKAGE-01.md)

The Actions artifact contains all nine native 64×96 captures, all nine independently rendered direct 28×42 captures, all nine enlarged 4× diagnostics, nine matched 40×38 face crops and six matched comparisons against the closest existing roster faces.

## Characters and comparison targets

| New character | Matched roster comparators | Intended distinguishing cues |
|---|---|---|
| Sailor #12 | Clinic and Guard | Stronger brow shelf, longer slightly hooked profile nose, leaner cheek-to-chin transition |
| Slicker #13 | Hacker and Courier | Closer-set eyes, compact level brow, tucked chin, compressed mouth |
| Painter #14 | Cook and Busker | Lifted asymmetric brow, squarer lower face/jaw turn, shorter blunter profile nose |

Granny Volt remains the 10/10 quality benchmark, **not a face or character template**. Evaluate each civilian as an original design with its own silhouette, face, clothing, props, palette potential and personality.

## Requested review

Assess each character separately and the batch as a whole:

1. **Identity and differentiation:** Are the three faces clearly distinct from each other and from their matched roster comparators?
2. **Native readability:** Do front and both profile views read cleanly at 64×96?
3. **Game-scale readability:** Are the key cues still understandable in independently rendered direct 28×42 captures? Pay particular attention to Slicker's profile eye/brow detail and reduced mouth detail in profile views.
4. **Direction and anatomy:** Are nose direction, cheek/jaw transition, eye placement and brow shape coherent across front and both profiles?
5. **Occlusion and clipping:** Do cap, hood and beanie/hair masses preserve face visibility without changing the approved revision-21 outer silhouette?
6. **Distinctive personality:** Does each face support a distinct civilian personality without converging toward Granny Volt or another roster member?
7. **Actionable corrections:** Identify exact geometry changes, if any, with character, direction and severity.

Return:
- an individual verdict for Sailor, Slicker and Painter;
- a batch-level verdict;
- blocking issues versus optional polish;
- specific pixel/geometry evidence for every blocking finding;
- whether this integrated grayscale face stage is ready for owner approval or needs another grayscale revision.

## Internal QA context

The focused design-source projection, integrated face capture, construction-detail capture and semantic validation steps passed on the exact source commit above. ChatGPT manually inspected the actual native, direct 28×42 and enlarged outputs.

The overall browser workflow remains red at global diagnostics: page and script error arrays are empty, but existing audio resources return HTTP 404. The golden snapshot gate reports 1 match / 23 changed. No golden snapshots were changed or approved.

## Boundaries

This is a grayscale design-stage review only. Do not treat it as approval for final palette or material colors, production renderer integration, town/gallery placement or spawn validation, golden snapshot refresh or approval, or starting the remaining 20 civilian characters.

The owner makes the final decision after Claude's findings are evaluated.
