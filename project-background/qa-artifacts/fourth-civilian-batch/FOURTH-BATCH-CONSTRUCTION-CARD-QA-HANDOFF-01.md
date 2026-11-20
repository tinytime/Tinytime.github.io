# Fourth civilian batch — construction-card internal QA handoff 01

**Characters:** Sailor #12, Slicker #13, Painter #14  
**Branch:** `npc-granny-baseline-overhaul`  
**Approved silhouette source:** revision 21, commit `be1c0c012894ccae23b4cbce2ad06e523fb460c5`, SVG blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`  
**Silhouette evidence:** [Run #810](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056), artifact [14664701854](https://github.com/tinytime/Tinytime.github.io/actions/runs/44809023056/artifacts/14664701854)  
**Cards under review:** [SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-02.md](SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-02.md)  
**Stage:** internal card review before any additional vector detail work

## Scope and non-negotiable baseline

Review the identity and construction specifications against the approved revision-21 contours. Do not substitute the later revision-22 proposal or edit the approved SVG. Any proposed material contour change must be isolated for owner approval. The cards are design proposals; they do not approve faces, palette, finished art or renderers.

## Card completeness audit

For each character, verify the card contains:
- role/personality and a distinct visual identity;
- qualitative build, pose and connected anatomy description without numeric proportion targets;
- front, rear and both-profile garment construction logic;
- face/head cues plus nearest-roster comparison status;
- exactly three must-survive items, with direct-28×42 head-read cue included in one;
- allowed-to-simplify details;
- prop/handedness/contact/occlusion table where a handheld prop exists;
- construction-family assignment and rationale;
- explicit technical risks and QA questions.

## Character-specific review questions

### Sailor #12
- Does Narrow Deck-Coat / Vertical Utility Shell describe a genuinely distinctive shell rather than a reusable generic worker coat?
- Does the front/rear character-left coil mapping remain correct (front viewer-right, rear viewer-left)?
- Is the coil visible only on the right/near profile and hidden on the left/far profile?
- Is the contact chain complete from shoulder through palm/fingers to the loop? Distinguish hand, rope loop and tail at direct scale.
- Are Clinic and Guard the correct closest face geometry prompts? Verify using matched native 64×96 front/profile crops before face lock.

### Slicker #13
- Does Integrated Hooded Rain-Smock Shell describe one continuous garment construction, with a face-side-open hood connected to neck/back?
- Does the design stay umbrella-free and preserve the approved revision-21 rainwear silhouette?
- Are front storm closure, rear yoke/hem seams and both profiles coherent, without false cuts or floating hood pieces?
- Does the hem preserve leg/shoe separation at direct 28×42?
- Select the two genuinely closest face comparators from matched native crops; Fisher and Courier are starting candidates only, not a predetermined result.

### Painter #14
- Does Offset Artisan Smock / Reaching-Arm Shell describe a distinct smock/pose system rather than a generic apron?
- Is character-right brush carry correct (front viewer-left, rear viewer-right), visible only on left/near profile, hidden on right/far profile?
- Is the hand grip believable—not merely connected—with distinct hand, handle, ferrule and connected flat bristle fan?
- Does the brush remain identifiable at direct 28×42 without dominating the arm or changing the approved contour?
- Do the paired darts read as garment shaping and never cut body pixels or create unintended negative spaces?
- Are Cook and Busker the correct closest face geometry prompts? Verify against matched native crops.

## Evidence and QA requirements for any subsequent vector study

When detailed geometry is built, follow the ratified construction standard:
1. Body-only and prop-on four-view studies, with before/after evidence against revision 21.
2. Native 64×96, enlarged nearest-neighbour crops, and independently captured direct in-game 28×42 in all four directions; use fixed neutral-grey direct-scale backgrounds.
3. Solid-black four-view silhouette sheet.
4. Body-pixel preservation and connected-component checks for all body/prop views and scales; inspect negative spaces, seams, edge contacts and clipping.
5. Directional prop-contact table, including near/far arm visibility and handedness.
6. Matched-scale native face comparisons and concrete geometric distinctions; face marks are not required to survive 28×42.
7. Gallery/town evidence only where the character is actually integrated/spawned; otherwise mark unavailable.
8. No arbitrary thresholds, semantic proportion calibration, snapshot refresh or provenance edits.

The prior Run #810 evidence is for the revision-21 silhouette source only. It does not QA these newly authored cards or any future face/garment/prop detail changes. The full Run #810 workflow also remains failed at separate global audio/resource 404 and unapproved golden-snapshot gates; report character-specific results separately from those global failures.

## Expected QA disposition

Return per character:
- card completeness: PASS / CHANGES REQUIRED;
- family assignment: accept / revise with rationale;
- silhouette-preservation review: no deviation / proposed deviation requiring owner approval;
- unresolved face-comparator decisions;
- prop-contact and near/far findings;
- concrete corrections and exact card section references.

Do not mark final art approved. After internal QA, present the cards and findings to the owner. Do not begin production renderer implementation or roster #15–23 work.
