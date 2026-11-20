# F6 Face Geometry Exploration 03 — Internal QA Record 01

**Prepared:** 2026-11-20  
**Batch:** Sailor #12 · Slicker #13 · Painter #14  
**Branch at source review:** `npc-granny-baseline-overhaul`  
**Branch HEAD at source review:** `302a8a587d082b41e987abedf40bfc437990ed35`  
**Exact face-study SVG:** `SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-03.svg`  
**SVG blob:** `3c5fdf964d76ee6bfc947299dfa151110847ba88`  
**Approved outer baseline:** revision 21, SVG blob `02f7ffb3854a8bacdaf00ca6198ae411c3122602`  
**Disposition:** source audit recorded; exact-source browser captures and manual visual inspection pending.

## Authority and scope

The owner-approved revision-21 silhouette and construction-detail study remain fixed. Exploration 03 is a grayscale face-geometry proposal only. It does not approve final face art, palette, renderer integration, golden snapshots/provenance or roster #15–23.

The current source contains front and profile face studies for each of the three characters. It deliberately leaves the outer silhouette and headwear unchanged. The matched-roster F6 pairs recorded in current art-direction documentation are:
- Sailor: Clinic and Guard.
- Slicker: Hacker and Courier; Fisher was reviewed but not selected as a closest face.
- Painter: Cook and Busker.

## Source-level review

- Six face panels are present: front and profile for Sailor, Slicker and Painter.
- All panels use the common 40×38 crop field and neutral grayscale treatment; these are comparative design crops, not direct in-game 28×42 captures.
- The authored distinctions are:
  - Sailor: continuous brow shelf; longer, slightly hooked profile nose; leaner cheek-to-chin transition.
  - Slicker: closer-set eyes; compact near-level brow; tucked chin; compressed mouth.
  - Painter: lifted asymmetric brow; squarer lower face/jaw turn; shorter, blunter profile nose.
- Face 03 is a refinement of the earlier exploratory study, not a replacement for the approved revision-21 silhouette or construction-detail SVG.
- The design file itself does not prove profile-facing orientation, correct face-plane placement in the full character, small-scale legibility, or absence of occlusion. Those require rendered evidence and human inspection.

## Exact-source test discrepancy

The latest completed Browser QA before this record is Run #832 (ID `44824789247`), tested SHA `aabe72cd58a7f86c3174ef45ce4b92aebf873d25`, artifact `14672664444`. The exact face-03 SVG was added after that run; compare from that SHA to current HEAD lists face-03 as a new file and the design-evidence builder as modified. Therefore Run #832 does **not** validate exploration 03.

A fresh Browser QA must run on a commit containing this record and the exact face-03 source. Required targeted steps are design-source projections/roster face crops, construction-detail capture, semantic annotation validation and artifact upload. The overall browser workflow may still fail at the known global audio 404 and unapproved golden-snapshot gates; report targeted step results separately and do not modify snapshots or provenance.

## Manual review checklist — pending exact artifact

- Open Sailor, Slicker and Painter front/profile crops at native source scale and enlarged diagnostic scale.
- Verify eyes/brows lie on the visible face plane and are not hidden by cap, hood, hair or brim.
- Check the two closest matched roster face crops per character at identical crop scale; compare head/jaw proportions, eye geometry/placement, brow, nose/profile, cheek and mouth/expression. Exclude palette, skin tone, hair colour and headwear.
- Inspect whether each intended distinction survives the direct game renderer's actual 28×42 capture. Do not substitute a resized crop.
- Verify the proposed profile is the correct side for the character and does not imply a mirrored anatomical/prop change.
- Confirm the face refinement does not alter the approved revision-21 outer contour or approved construction-detail geometry.
- Record concrete geometric differences and any required corrections. Do not invent numeric pass thresholds.

## Status and next gate

**Not yet visually inspected; not yet internally QA-approved; not sent to Claude; not owner-approved.** Do not begin colour/rendering or production renderer work. After exact-source artifact inspection, address any valid design findings, prepare a face-stage owner review package, and wait for the owner's decision before proceeding to colour/rendering.
