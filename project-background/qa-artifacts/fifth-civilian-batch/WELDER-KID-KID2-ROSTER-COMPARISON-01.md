# Batch 5 — full current-roster comparison 01

**Welder #15 · Kid #16 · Kid 2 #17**  
**Status:** matched-scale design evidence completed in Run #24 and re-confirmed in Run #28; internal QA PASS, owner silhouette/construction approval pending.

This comparison uses the current roster register and approved/active design descriptions. It does not pretend that unbuilt roster entries have finished vector art. The 15 existing designed civilians below are the relevant comparison set; unbuilt Mouse, Busker, Dancer, Broker and Fan remain future design prompts, not completed silhouette comparators.

## Candidate-to-roster differentiation matrix

| Existing civilian | Existing construction / identity read | Welder #15 distinction | Kid #16 distinction | Kid 2 #17 distinction |
|---|---|---|---|---|
| **Runner #1** | Athletic singlet/shorts; airborne stride | Protective apron, tank and controlled work stance, not sportswear | Hoodie and paper glider, not singlet or running stride | Scarf-coat and book, upright rather than airborne |
| **Coach #2** | Straight-hem track jacket and yoke | Leather split apron and gas rig, no athletic jacket | Cropped zip hoodie and asymmetrical reach, no track yoke | Soft cardigan and scarf, no athletic construction |
| **Referee #3** | Striped official shirt and shorts | Work protection and tool rig, not official uniform | Hooded youth jacket and glider | Pom beanie, scarf and book; no striped uniform |
| **Courier #4** | A-line messenger jacket, cap and parcel | Apron plus rear cylinder/torch, no parcel pack | Cropped hoodie and open stride; no messenger bag or parcel | Longer scarf-coat and two-hand book, no courier equipment |
| **Guard #5** | Protective wedge, helmet, braced stance and baton/plate | Shared protective context only; raised visor, narrow leather apron and gas cylinder create a distinct industrial worker | Youth hoodie and glider, no armor or guard stance | Soft coat and close-held book, no armor or baton |
| **Vendor #6** | Service-worker hat/apron and tray/bowl interaction | Tool/harness construction, not food service or apron presentation | Hoodie and paper glider, no service tray | Scarf-coat/book interaction, no service apron |
| **Cook #7** | Chef toque, chef coat/apron and handled pan | Raised welding visor, split leather apron and tank; no toque or pan | Cropped hoodie, no chef garment | Cardigan/scarf/book, no chef coat or pan |
| **Clinic #8** | Wrap tunic, hair band and medical kit | Heavy industrial protection and torch, not clinical tunic | Hooded casual youth construction | Soft scarf-coat and book, not clinical wrap or kit |
| **Tech #9** | Compact forward-leaning maintenance harness and diagnostic meter | Both have equipment, but Welder's visible split apron, raised visor, rear gas cylinder and hand-held torch differ from Tech's compact harness/meter shell | Youth hood and glider, not field-maintenance harness | Book and scarf-coat, no maintenance gear |
| **Hacker #10** | Narrow folded-in asymmetric drape shell, hood and slate | Upright work stance and rigid protective equipment, not folded drape or slate | Both use a hood; Kid's open forward stride, cropped zip construction and glider must distinguish from Hacker's tucked drape/slate | Upright close-held book and scarf-coat, not Hacker's folded drape and one-hand slate |
| **Fisher #11** | Broad short oilskin smock, wide braced deck stance and net basket | Closest trades silhouette risk: Welder stays narrow/upright, with split apron, tank and torch instead of broad oilskin and net | Youth body language and hoodie, not deck workwear | Inward book-holding youth silhouette, not broad braced trades shell |
| **Sailor #12** | Narrow deck-coat / vertical utility shell and rope coil | Welder uses a short split apron and supported gas rig, not a deck coat or rope coil | Youth hoodie and glider, not maritime utility coat | Scarf-coat/book, no deck utility equipment |
| **Slicker #13** | Integrated hooded rain-smock and umbrella | Raised visor and rigid tank/torch equipment, not rainwear | Both use hood forms; Kid's cropped jacket, fringe break and glider must stay distinct from Slicker's integrated rain-smock/umbrella | Beanie/scarf-coat and book, not rain hood or umbrella |
| **Painter #14** | Offset artisan smock, reaching-arm pose and brush | Both are tradespeople with hand tools; Welder's narrow apron, raised visor and rear cylinder differ from Painter's smock and brush reach | Youth hoodie/glider, not artisan smock | Scarf-coat/book, not smock or brush |
| **Usher #22** | Long formal uniform coat, cap and clipboard | Industrial apron and tank, not formal civic coat | Cropped youth hoodie, not formal coat | **Closest coat-length risk:** Kid 2 must keep a softer, shorter split cardigan, high scarf and book interaction rather than Usher's long formal uniform coat and clipboard |

## Nearest silhouette risks and required human scrutiny

- **Welder:** Fisher, Tech, Sailor and Painter. The design must remain narrow and upright; the rear cylinder should read as a rounded, harness-supported gas tank rather than a rectangular backpack. The torch grip and hose must stay physically connected in front, rear and near-side profile.
- **Kid:** Hacker and Courier. The hood alone is insufficient; the cropped asymmetric zip jacket, forward-sprung open stride and glider reach must all remain visible. The glider is far-side and hidden in the right-facing profile.
- **Kid 2:** Usher, Hacker and Kid. The coat must not become a long formal uniform; the scarf frame, inward elbow posture and clearly held book are essential. The book must read as a separate held object in front and near-side profiles, not merge into the coat.

## Face comparison candidates

These are the two closest current roster face-construction comparisons selected for each proposed character. The matched 40×38 crop sheet was produced and visually inspected in Run #31. Dancer is used only as a current renderer face-construction reference; no unbuilt Dancer silhouette is treated as completed artwork.

| New character | Two comparison candidates | Distinguishing geometry proposed |
|---|---|---|
| Welder | Guard, Fisher | More compressed level brow shelf, longer straight-to-hooked profile bridge and squared lower jaw; avoid Guard's relaxed brow and Fisher's severe angry/frown pairing |
| Kid | Dancer, Vendor | Rounder eye openings, fuller cheek arc and small open curious mouth; avoid Dancer's worried brow/smile and Vendor's more mature grin |
| Kid 2 | Clinic, Referee | Close-set eyes retained as the comparison anchor, but short level brows, tapered chin and asymmetric smirk replace Clinic's worried/neutral mouth and Referee's arched/open expression |

## Matched-scale evidence outputs

Exact-source evidence was captured in [Run #31](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850966072), artifact [14684849806](https://github.com/tinytime/Tinytime.github.io/actions/runs/44850966072/artifacts/14684849806), on design source commit `4864fc565c2e08e662394c2ea406c37a119d2d59`. The dedicated Playwright evidence builder produced three separate native 64×96 matched silhouette sheets, one for each proposed character:
- `roster-silhouette-comparison-welder-native-64x96.png`
- `roster-silhouette-comparison-kid-native-64x96.png`
- `roster-silhouette-comparison-kid2-native-64x96.png`

Each sheet places the proposed silhouette beside the 15 existing designed roster civilians in all four directions. Existing roster silhouettes are captured from the current renderer and reduced to alpha silhouettes; the proposed designs are independently rasterized from their SVG source.

The builder also produces `matched-face-comparisons-native-40x38.png` and `matched-face-comparisons-enlarged-3x.png`, with six matched rows (front and profile for each proposed character) and the two named face comparators per character. These are geometry studies, not automated similarity scores.

Run #23 re-ran the same exact silhouette/face source blobs at current branch HEAD; all 66 non-manifest artifact files match Run #31 byte-for-byte. Granny Volt remains the craftsmanship benchmark, not a silhouette or face template, and is not included in the 64×96 roster comparison grid.

## Evidence boundary

- The written roster matrix is design rationale; the matched-scale visual evidence is supplied by the outputs listed above.
- The matched-scale roster silhouette and face sheets were generated from the exact source commit and visually inspected. The concepts are now ready for owner silhouette/construction approval.
- Direct 28×42 game-scale captures were independently rendered from the design source; enlarged or resized images were not substituted.
- No family assignments are promoted. Welder, Kid and Kid 2 remain **UNASSIGNED**.
