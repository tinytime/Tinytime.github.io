# Hacker (#10) and Fisher (#11) — finished design-stage review package

**Status:** finished design-stage candidate; Playwright design rendering and internal visual inspection complete on 2026-11-20. Awaiting owner acceptance of the finished colour artwork. This package does not authorize renderer implementation.

## Authoritative construction and scope

- Preserve the approved four-direction round-05 construction in [TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg](TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg). No silhouette restart or new silhouette approval was requested.
- Finished colour design: [HACKER-FISHER-FINISHED-DESIGN-STUDY.svg](HACKER-FISHER-FINISHED-DESIGN-STUDY.svg).
- Original round-05 SVG and 3× black-silhouette reference remain unchanged.
- No game renderer, existing approved civilian, golden snapshot or snapshot provenance was changed.

## Hacker (#10)

**Identity:** guarded, clever, agile and self-contained digital operator.

- **Construction:** narrowest figure; folded-in, slightly off-centre stance; cropped asymmetric charcoal/lilac drape-shell over a close-fitting base layer; one short hanging panel and opposite exposed forearm.
- **Head/face:** broken side-swept fringe, exposed temple, one asymmetrical earbud, uneven brow, one narrowed eye, short upturned nose and compact pointed chin. Front and profile eye/brow cues remain visible; rear hair mass follows the accepted head construction.
- **Palette:** charcoal `#343640`, cool lilac `#77718b`, pale lilac `#aaa2bd`, deep base `#282a35`, slate `#565b72`, slate-blue device `#9ba8ba`, pale display `#c3d3df`.
- **Handedness:** character-right slate: front viewer-left, rear viewer-right; shown only in the near-side right profile. Left profile hides the far-side slate. Rear and right-profile views include hand/wrist contact cues.

**Three must-survive elements**
1. Broken fringe, exposed temple and single asymmetrical earbud.
2. Cropped asymmetric drape-shell with one hanging panel and opposite exposed forearm.
3. One-handed fold-out input slate with believable hand/wrist contact.

## Fisher (#11)

**Identity:** weathered, patient, practical and quietly resilient waterfront net worker.

- **Construction:** broadest and most grounded figure; low braced stance; low oilskin hood/cowl with short brow lip and soft rear neck flap; broad waterproof smock with bib chest plane and diagonal shoulder closure; substantial trousers and heavy deck boots.
- **Face:** broad cheek planes, relaxed low brow, deep-set eyes, blunt nose tip, stronger lower lip and sturdy rounded chin. Hood frames the face; profile face remains visible.
- **Palette:** dark weathered brown `#3b302a`, ochre oilskin `#a9783e`, worn ochre highlight `#c59b5c`, weathered canvas `#71695a`, warm skin `#bc9272`, deep charcoal `#282b2d`, salt-grey net `#777e72`.
- **Handedness:** character-left basket: front viewer-right, rear viewer-left; near-side left profile only. Right profile has no basket. Front-view mirroring is the same complete-character orientation used by the accepted round-05 silhouette study.

**Three must-survive elements**
1. Low oilskin hood with short brow lip and rear neck flap.
2. Broad waterproof smock with diagonal bib closure.
3. Low-held compact net basket with a connected supporting hand/wrist.

## Presentation and scale evidence

The SVG contains the combined comparison sheet and scale section for all eight directional designs. Reproducible Playwright render workflow:

- [Run #6 — successful design render](https://github.com/tinytime/Tinytime.github.io/actions/runs/44747910509), tested source `71e3e8a674e887715613faa8e687a36b0e34a9d8`.
- [Render artifact](https://github.com/tinytime/Tinytime.github.io/actions/runs/44747910509/artifacts/14633573148).
- Committed outputs: 1× and 3× full sheets; eight native 64×96 crops; eight direct 28×42 vector projections; eight 28×42 crops enlarged 4× with smoothing disabled (nearest-neighbour); JSON report with source hash and capture geometry.
- Render outputs are committed on the working branch in commit `b0216c079b3969469c3192366b57f98b619c2213`.

**Internal visual inspection:** ChatGPT inspected the full 1× sheet, native directional contact sheet, direct 28×42 contact sheet and 4× nearest-neighbour sheet. The eight views retain clearly different body envelopes (Hacker narrow/folded; Fisher broad/braced). Hacker's slate appears front viewer-left, rear viewer-right and near-side right profile only; no far-side slate appears in left profile. Fisher's basket appears front viewer-right, rear viewer-left and near-side left profile only; no basket appears in right profile. Hacker's fringe does not cover the visible profile eye; Fisher's hood leaves the profile face visible. No visible clipping, detached limbs or duplicate props were found in these design-source captures.

**Evidence boundary:** these are captures from the finished design SVG, not direct game-renderer captures. They do not prove game integration, live town spawning, production renderer contact geometry or production QA. Direct game-renderer 28×42 capture, gallery/town integration and renderer QA belong to the later implementation gate.

## Automated checks and workflow disposition

- Design-render workflow #6 passed: Playwright/Chromium install, script syntax, SVG render, eight native/direct crops, nearest-neighbour enlargement, report generation, commit and artifact upload all succeeded.
- Source checks: eight unique directional art groups, unique SVG IDs and resolved fragment references; source round-05 SVG unchanged.
- General Browser QA Run #647 was triggered by the source commit. It failed its pre-existing game-browser diagnostics: unapproved golden-snapshot comparison (1 match / 23 changed) and existing audio/resource HTTP 404 errors. The same run still generated and uploaded its wider evidence. This general game QA is not a Hacker/Fisher renderer test; neither character is integrated into the game renderer yet. No snapshots or provenance were changed.

## Visual inspection and correction history

- Playwright Render Run #6 rendered the previous source revision and produced the first 1×/3× sheets, native crops, direct 28×42 projections and true 4× nearest-neighbour captures. ChatGPT visually inspected all four outputs. The review found an accidental second slate-like rectangle in Hacker's front view; the source now removes that duplicate and adds a visible grip on the single viewer-left slate (`2b08e60d4814846923e133503f965532bde055ad`).
- The Run #6 PNGs predate that final correction and are superseded. Render Run #7 is pending while its Chromium-install step runs; do not treat the old PNGs as final evidence. Regenerate and inspect the outputs against the latest SVG before owner review.

## Remaining gates / unresolved issues

1. **Owner acceptance of the finished design-stage artwork** is pending.
2. Tech (#9) independent Claude review and owner rendered-art approval remain the existing prerequisite for Hacker/Fisher renderer implementation.
3. No Hacker/Fisher renderer work, game QA, golden snapshot change or production approval is implied by this design-stage package.

No specific unresolved construction defect was found during the design-source visual inspection.