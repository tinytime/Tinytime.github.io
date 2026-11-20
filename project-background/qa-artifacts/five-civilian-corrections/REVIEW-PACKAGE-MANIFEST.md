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
| Internal QA record | included | `RUN-599-600-INTERNAL-QA.md` |
| Independent review log | included | `CLAUDE-REREVIEW-RUN-600.md` |
| Accepted-exception register | included | `ACCEPTED-EXCEPTIONS.md` |
| Native four-direction captures | included | Run #600 artifact; record all 20 filenames |
| Direct 28×42 four-direction captures | included | Run #600 artifact; record all 20 filenames |
| Black silhouette sheet | included | Alpha-derived; not anatomical segmentation |
| Neutral-grey and town/night captures | included | Record exact background configuration |
| Walk frames, two per direction | unavailable | Not present in Run #600; required next round for animated characters |
| Before/after sheets for each finding | partial | Pixel diffs exist; add per-finding side-by-side sheets next round |
| Named-character town spawn proof | unavailable | Town-ground composite is diagnostic only |
| Role-debug evidence | included | Run #600 artifact |
| QA report and logs | included | Run #600 artifact |
| Exact renderer commit | included | `3d1ec4bcbac231e99e75d36f21e79a5fcf7fd4eb` |
| Exact QA/evidence run | included | Runs #599 and #600 |

## Review freeze

- Never refresh/approve golden snapshots without explicit owner authorization.
- Record alpha threshold, prop inclusion/exclusion, crop, transform, direction and scale for every IoU value.
- Record pixel-diff method and threshold for every changed-pixel count.
- Preserve accepted exceptions and owner dispositions verbatim.
- Do not mark any civilian approved based on package completeness or a reviewer recommendation.
