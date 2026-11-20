## Fourth civilian batch — current internal QA checkpoint (2026-11-20)

Sailor (#12), Slicker (#13) and Painter (#14) remain in parallel design-stage exploration. The earlier Claude-ready claim is withdrawn. No Claude handoff, owner silhouette approval, palette approval, or renderer authorization is in force.

- Current design source: [revision 09](../fourth-civilian-batch/SAILOR-SLICKER-PAINTER-SILHOUETTE-EXPLORATION-09.svg); evidence builder: `qa/build-fourth-batch-design-evidence.mjs`; construction cards: [01](../fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CONSTRUCTION-CARDS-01.md); face geometry study: [02](../fourth-civilian-batch/SAILOR-SLICKER-PAINTER-FACE-GEOMETRY-EXPLORATION-02.svg).
- [Run #673](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777304508), artifact [14649699220](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777304508/artifacts/14649699220), tested revision 07 at commit `f6d9e2dc84c3309489085f530f686fed195cd42c`. It generated 24/24 native 64×96 and 24/24 direct 28×42 design projections. Near-side profile prop-presence assertions passed (Sailor 172, Slicker 386, Painter 190 added silhouette pixels). Visual review then found Slicker's umbrella and Painter's brush too close to the left-profile crop edge; presence-only assertions did not catch this.
- [Run #674](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777818302), artifact [14650547538](https://github.com/tinytime/Tinytime.github.io/actions/runs/44777818302/artifacts/14650547538), tested commit `c004c4e9b231803bc3977b9d418f104e223dc417` and revision 08 before the subsequent crop-edge corrections. Evidence generation and profile-presence audit passed. The matched-scale Sailor/Welder rear comparison was inspected: narrow, long-legged Sailor and broad, squared Welder read as distinct silhouettes despite a high automated overlap trigger; the metric is a human-review prompt, not an automatic failure.
- Run #674's left-profile captures showed Slicker's umbrella and Painter's brush pressed against / clipped by the left crop edge. Painter's brush was pulled inward in commit `3f5271a82f89a0882b5c24a5667db3907b01c874`; Slicker's near-side umbrella/hand/handle cluster was moved inward in revision 09 (commit `b70582e3ff4141e18c345ee68c9c968aef027d21`). The evidence builder now targets revision 09 (commit `c74219986db2466122fe08ff3ad0bdcb012b5264`). **A fresh artifact against this exact latest HEAD is still required.**
- Browser diagnostics remain globally failed on the unapproved golden snapshot baseline (1 match / 23 changed) and missing audio resources returning HTTP 404. Runs report zero page and script errors. Do not update or approve golden snapshots or provenance to silence this gate.
- Native face-comparison labels are readable. The six matched face crops remain proposed geometry and require human comparison; no face is approved.
- All three construction families remain UNASSIGNED. No silhouette, face, prop, handedness or palette is owner-approved. Production renderer work is NOT AUTHORIZED. Characters #15–23 remain held.

The earlier [Claude review package 01](../fourth-civilian-batch/SAILOR-SLICKER-PAINTER-CLAUDE-REVIEW-PACKAGE-01.md) is superseded and must not be sent.

## Historical fourth-batch direction approval — superseded by parallel authorization above (2026-11-20)

Historical status only: the owner initially authorized Sailor first. This was superseded by the parallel authorization recorded at the top of this audit. All three now proceed together; each remains UNASSIGNED pending its own approval. See [Sailor silhouette study](../fourth-civilian-batch/SAILOR-SILHOUETTE-EXPLORATION-01.svg) and [construction card](../fourth-civilian-batch/SAILOR-CONSTRUCTION-CARD-EXPLORATION-01.md). No renderer or palette work is authorized.

# Roster Shell-Family Audit — Pre-Production Register

**Status:** active roster construction register under the owner-ratified construction standard. Character-family assignments reflect owner-approved designs where explicitly recorded; no numeric family quota applies. Legacy family labels describe the old sprite dispatch only; they are not approved vector templates.

## Rules
- Record a proposed vector construction family after bespoke silhouette exploration; promote it to the current/actual family only after owner silhouette approval.
- Unbuilt characters remain UNASSIGNED until silhouette exploration.
- Legacy archetype families are context, not a mandate to reuse a body shell.
- A recurring family is a review prompt, not an automatic failure. No numeric family cap.
- Differentiation must appear in construction, contour, pose, garment volume, negative space, face/head construction and prop integration—not colour or emblem alone.
- IoU ≥0.85 triggers human review only.

## Full 23-character register

| # | Character | Legacy family | Current vector construction family | Planning note |
|---:|---|---|---|---|
| 1 | Runner | Athletic | Dynamic singlet/shorts; airborne stride | Built; pending focused review; excluded from five-character review |
| 2 | Coach | Athletic | Straight-hem track jacket / yoke | **Owner-approved** |
| 3 | Referee | Athletic | Striped official shirt / shorts | **Owner-approved** |
| 4 | Courier | Courier | A-line messenger jacket | **Owner-approved** |
| 5 | Guard | Guard | Protective wedge / articulated braced stance (owner-approved Revision 02) | Owner-approved Revision 02; renderer implementation in progress |
| 6 | Vendor | Vendor | Forward-leaning stall-service / tray-presenting stance (owner-approved Revision 02) | Owner-approved Revision 02; renderer implementation in progress |
| 7 | Cook | Vendor | Broad chef-coat / apron-front construction | **Owner-approved** |
| 8 | Clinic worker | Clinic | Tapered wrap tunic / offset-hip stance (owner-approved Revision 02) | Owner-approved Revision 02; renderer implementation in progress |
| 9 | Tech | Clinic | Compact forward-leaning field-maintenance harness / split utility shell | Owner-approved batch #9–11 (2026-11-20); dedicated production renderer implemented and owner-approved at rendered-art stage |
| 10 | Hacker | Clinic | Narrow folded-in cropped asymmetric drape-shell | Owner-approved finished design-stage art (2026-11-20); production renderer not yet implemented |
| 11 | Fisher | Trades | Broad short oilskin smock / wide braced deck stance | Owner-approved finished design-stage art (2026-11-20); production renderer not yet implemented |
| 12 | Sailor | Trades | UNASSIGNED | PROPOSED planning descriptor: narrow cropped deck-coat / upright deckhand; parallel silhouette exploration authorized; owner approval pending |
| 13 | Slicker | Trades | UNASSIGNED | PROPOSED planning descriptor: forward-pitched long rain-shell / hooded commuter; parallel silhouette exploration authorized; owner approval pending |
| 14 | Painter | Trades | UNASSIGNED | PROPOSED planning descriptor: open asymmetrical sign-painter smock / reaching pose; parallel silhouette exploration authorized; owner approval pending |
| 15 | Welder | Trades | UNASSIGNED | Legacy grouping only |
| 16 | Kid | Youth | UNASSIGNED | Legacy grouping only |
| 17 | Kid 2 | Youth | UNASSIGNED | Legacy grouping only |
| 18 | Mouse | Youth | UNASSIGNED | Legacy grouping only |
| 19 | Busker | Performer | UNASSIGNED | Legacy grouping only |
| 20 | Dancer | Performer | UNASSIGNED | Legacy grouping only |
| 21 | Broker | Civic | UNASSIGNED | Legacy grouping only |
| 22 | Usher | Civic | Long formal uniform coat | **Owner-approved** |
| 23 | Fan | Civic | UNASSIGNED | Legacy grouping only |

## Existing vector constructions

The six existing vector renderers are not one template: Runner has a dynamic athletic pose; Coach a straight-hem jacket/yoke; Referee a striped official uniform; Courier an A-line messenger shell; Usher a long formal uniform coat; Cook a broad chef/apron-front construction. Five are owner-approved. Runner is built but excluded from Claude Run #603 and remains pending focused review.

## Next-batch differentiation hypotheses

- **Guard:** legacy cues include helmet, baton and rear guard plate. Explore protective silhouette, distinctive stance and structured outerwear. Avoid Usher's long formal coat, Coach's athletic jacket and a generic recolour. Confirm prop hand/side from actual composition.
- **Vendor:** legacy cues include hat, bowl and apron ties. Explore market/service-worker silhouette with different torso volume and garment logic from Cook. Do not reuse Cook's toque, chef coat, apron wedge or pan presentation. Bowl is optional.
- **Clinic worker:** legacy cues include hair-band, medical kit and rear yoke. Explore clinical-work silhouette that does not default to a generic long lab coat or copy Cook/Usher. Medical kit is optional; validate interaction/contact before locking it.

Update each UNASSIGNED entry only after actual four-view silhouette evidence exists.


## Third-batch silhouette exploration — Tech, Hacker and Fisher (2026-11-20)

The owner directed the project to move forward without sending the Run #629 Guard/Vendor/Clinic output back to Claude. This authorizes preparation of the next batch; it does not retroactively record a Claude verdict or mark that earlier independent review as completed.

- **Tech:** proposed compact forward-leaning field-maintenance harness / split utility shell; swept-back undercut and ear cup; low diagnostic-meter interaction.
- **Hacker:** proposed narrow folded-in stance / cropped asymmetric drape-shell; uneven fringe and exposed temple; one-hand low slate interaction.
- **Fisher:** proposed broad short oilskin smock / braced deck stance; low hood with rear neck flap; low-held net basket interaction.

The concepts and their separately authored four-view black silhouette studies are in [Tech/Hacker/Fisher preflight](../third-civilian-batch/TECH-HACKER-FISHER-PREFLIGHT.md) and [silhouette sheet](../third-civilian-batch/TECH-HACKER-FISHER-SILHOUETTE-EXPLORATION.svg). These are proposals only. Keep all three out of renderer implementation until the owner approves or revises the silhouettes and construction cards. Do not treat the proposed families as current approved assignments.
