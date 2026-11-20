# Five-Civilian Review Package Completeness Manifest

Use this manifest for every independent review package. Mark each row `included`, `not applicable`, or `unavailable`; include exact filenames and source commit. Do not send a package as complete while required evidence is merely linked or implied.

| Requirement | Status | Exact file(s) / note |
|---|---|---|
| Current construction standard, full text | included | `project-background/CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md` |
| Project art direction | included | `project-background/02-ART-DIRECTION-AND-APPROVAL.md` |
| Technical implementation | included | `project-background/03-TECHNICAL-IMPLEMENTATION.md` |
| QA handoff | included | `project-background/04-QA-AND-HANDOFF.md` |
| Live NPC tracker | included | `project-background/NPC_VECTOR_CHARACTER_TRACKER.md` |
| Identity/proportion cards | included | `IDENTITY-AND-PROPORTION-CARDS.md` |
| Internal QA record | included | `RUN-599-600-INTERNAL-QA.md`; `RUN-602-USHER-U4-INTERNAL-QA.md` |
| Independent review log | included | `CLAUDE-REREVIEW-RUN-600.md` |
| Accepted-exception register | included | `ACCEPTED-EXCEPTIONS.md` |
| Native four-direction captures | included | Run #602 artifact `14592969167`; all 20 exact-source PNGs, plus Run #600 baseline artifact `14591690387` for comparison |
| Direct 28×42 four-direction captures | included | Run #602 artifact `14592969167`; all 20 direct exact-source PNGs, plus Run #600 baseline artifact `14591690387` |
| Black silhouette sheet | included | Alpha-derived; not anatomical segmentation |
| Neutral-grey and town/night captures | included | Record exact background configuration |
| Walk frames, two per direction | unavailable | Not present in Runs #600 or #602; required for any character with active walk animation, otherwise record not applicable |
| Before/after sheets for each finding | partial | Run #600 and #602 contain the exact native/direct captures for U4 before/after comparison; the two profile pairs are not yet merged into a single side-by-side composite. Other accepted/declined findings need no new correction sheet. |
| Named-character town spawn proof | unavailable | Town-ground composite is diagnostic only |
| Role-debug evidence | included | Run #600 artifact |
| QA report and logs | included | Run #600 artifact |
| Exact renderer commit | included | `880cad6bf937d8bfc1e004fe81cbd6854c522d23` (U4 only; Cook restored; U2 unchanged) |
| Exact QA/evidence run | included | Run #602 (renderer `880cad6`); Runs #599/#600 retained as baseline and independent-review evidence |

## Review freeze

- Never refresh/approve golden snapshots without explicit owner authorization.
- Record alpha threshold, prop inclusion/exclusion, crop, transform, direction and scale for every IoU value.
- Record pixel-diff method and threshold for every changed-pixel count.
- Preserve accepted exceptions and owner dispositions verbatim.
- Do not mark any civilian approved based on package completeness or a reviewer recommendation.
## Current owner dispositions

- Cook C1: explicitly deferred/accepted as-is; no renderer change.
- Usher U2: explicitly declined; no silhouette redesign.
- Usher U4: authorized and implemented; internal QA record is `RUN-602-USHER-U4-INTERNAL-QA.md`; Claude re-review remains pending.
- Coach/Courier rear: accepted exception; preserve rationale.
- All five remain NOT APPROVED until updated Claude review and explicit owner approval.
