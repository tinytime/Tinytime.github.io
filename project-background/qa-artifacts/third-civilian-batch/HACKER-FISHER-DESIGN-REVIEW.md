# Hacker (#10) and Fisher (#11) — finished design-stage review package

**Status:** owner-authorized design development in progress; final design-sheet visual inspection and owner acceptance remain pending. This package does not authorize renderer implementation.

## Authoritative construction

- Preserve the accepted four-direction round-05 construction in [TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg](TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg).
- Finished colour design: [HACKER-FISHER-FINISHED-DESIGN-STUDY.svg](HACKER-FISHER-FINISHED-DESIGN-STUDY.svg).
- Round-05 3× black-silhouette reference remains unchanged.
- No new silhouette concept pass or silhouette reapproval is requested.

## Hacker (#10)

**Identity:** guarded, clever, agile and self-contained digital operator.

- **Construction:** narrowest figure; folded-in, slightly off-centre stance; cropped asymmetric charcoal/lilac drape-shell over a close-fitting base layer; one short hanging panel and opposite exposed forearm.
- **Head/face:** broken side-swept fringe, exposed temple, one asymmetrical earbud, uneven brow, one narrowed eye, short upturned nose and compact pointed chin.
- **Palette:** charcoal `#343640`, cool lilac `#77718b`, pale lilac `#aaa2bd`, deep base `#282a35`, slate `#565b72`, slate-blue device `#9ba8ba`, pale display `#c3d3df`.
- **Handedness:** character-right slate: front viewer-left, rear viewer-right; shown only in the near-side right profile. Left profile hides the far-side slate. The rear and right-profile views include a visible hand/wrist contact cue.

**Three must-survive elements**
1. Broken fringe, exposed temple and single asymmetrical earbud.
2. Cropped asymmetric drape-shell with one hanging panel and opposite exposed forearm.
3. One-handed fold-out input slate with believable hand/wrist contact.

## Fisher (#11)

**Identity:** weathered, patient, practical and quietly resilient waterfront net worker.

- **Construction:** broadest and most grounded figure; low braced stance; low oilskin hood/cowl with short brow lip and soft rear neck flap; broad short waterproof smock with bib chest plane and diagonal shoulder closure; substantial trousers and heavy deck boots.
- **Face:** broad cheek planes, relaxed low brow, deep-set eyes, blunt nose tip, stronger lower lip and sturdy rounded chin.
- **Palette:** dark weathered brown `#3b302a`, ochre oilskin `#a9783e`, worn ochre highlight `#c59b5c`, weathered canvas `#71695a`, warm skin `#bc9272`, deep charcoal `#282b2d`, salt-grey net `#777e72`.
- **Handedness:** character-left basket: front viewer-right, rear viewer-left; near-side left profile only. Right profile has no basket. The front view is mirrored as a complete character construction to preserve the approved round-05 orientation and prop side.

**Three must-survive elements**
1. Low oilskin hood with short brow lip and rear neck flap.
2. Broad short waterproof smock with diagonal bib closure.
3. Low-held compact net basket with a connected supporting hand/wrist.

## Presentation and scale evidence

The SVG contains a comparison sheet and an appended scale section for all eight directional designs. The reproducible Playwright render job produces:

- Full design sheet at 1× and 3×.
- Eight native 64×96 design projections.
- Eight direct 28×42 design projections.
- Eight 28×42 crops enlarged 4× with image smoothing disabled (true nearest-neighbour enlargement).
- A JSON render report recording the source hash and capture geometry.

These are design-source captures, not direct game-renderer captures. Downsampling the vector study does not replace the later production renderer QA.

## Source-level checks and scope

- SVG IDs are unique; all internal fragment references resolve.
- Eight distinct directional art groups are defined and reused for scale presentation.
- Hacker's slate is absent from the far-side left profile and present in the near-side right profile.
- Fisher's front basket is on viewer-right; rear basket is on viewer-left; only the near-side left profile shows it.
- The original round-05 silhouette source file is unchanged.
- No game renderer, existing approved civilian, golden snapshot or snapshot provenance was changed.

## Remaining gates / unresolved issues

1. Complete the Playwright render workflow and inspect the actual 1×/3× sheets, all eight native crops, all eight direct 28×42 crops and nearest-neighbour enlargements. Resolve any visible clipping, face, anatomy or prop-contact defects found there.
2. Owner inspects and accepts the finished design-stage artwork.
3. Tech (#9) independent Claude review and owner rendered-art approval remain the existing prerequisite for Hacker/Fisher renderer implementation. No Hacker/Fisher renderer work or game QA is authorized by this design-stage assignment.
