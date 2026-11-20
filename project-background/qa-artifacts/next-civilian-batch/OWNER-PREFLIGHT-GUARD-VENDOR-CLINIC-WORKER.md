# Guard, Vendor and Clinic Worker — Silhouette / Brief Preflight

**Status:** owner-review proposal; not approved for renderer production  
**Prepared against:** `npc-granny-baseline-overhaul` at `424c442943c2fa18d8e97d133ff328a24b0be782`  
**Governing standard:** owner-ratified Civilian Vector Construction Standard  
**Scope:** first three unstarted roster entries — Guard, Vendor, Clinic worker

## Decision requested

Review and approve, revise or reject the proposed identity and silhouette directions below. Approval of this preflight would authorize the NPC Designer to produce the actual four-view black silhouette exploration and construction cards. It would **not** by itself approve finished character art or authorize changes to the live renderer.

No renderer code, game code, golden snapshots or existing approved character art has been changed for this preflight.

## Design principles applied

- Granny Volt is the 10/10 craft benchmark for finish, clarity, personality and directional consistency—not a body, outfit, palette or prop template.
- The six existing vector constructions are protected references: Usher (long formal coat), Cook (broad chef/apron-front), Courier (A-line messenger jacket), Runner (airborne singlet/shorts), Coach (straight-hem warm-up jacket/yoke), and Referee (striped official shirt/shorts).
- The legacy `guard`, `vendor` and `clinic` archetype data in `npc_sprites.js` is clue material only. Legacy helmet/baton, hat/bowl, and hair-band/medical-kit details are not mandatory templates.
- Each character must read from body construction, pose, head/face and garment shape—not merely colour, emblem or prop.
- No anatomy ratios, score floors, family quotas or unvalidated numerical targets are introduced.
- The final construction card must have exactly three must-survive items. The direct 28×42 head-read cue is one of those three.
- Character-relative handedness is authoritative. Front character-left appears viewer-right; rear reverses; profiles record near/far relative to facing.

## Roster comparison and proposed separation

| New character | Closest existing construction risks | Proposed separation |
|---|---|---|
| Guard | Usher's formal vertical coat; Coach's structured jacket; Referee's uniform blocks | Compact protective overshirt with squared shoulder protection, segmented chest/utility structure and a short split hem; low protective helmet with rear nape contour; grounded, alert stance |
| Vendor | Cook's broad apron-front and chef head mass; Usher's service-uniform formality | Soft market cap with a sloped brim; open short waistcoat over rolled sleeves; narrow offset waist apron/sash rather than a broad apron wedge; customer-facing, slightly forward posture |
| Clinic worker | Usher's long coat; Cook's apron/prop silhouette; Tech/Hacker future overlap | Short wrap-front clinical tunic with asymmetric closure and curved hem over visible trousers; compact belt-mounted care pouch; swept-back hair gathered low with a small side tie; calm attentive posture |

These are construction hypotheses to test in silhouette, not locked designs. If the four-view black silhouettes do not clearly separate from the named references, revise the construction before colour or detail work.

---

## 1. Guard — security / protective role

**Personality read:** observant, dependable, quietly authoritative; alert rather than aggressive.

### Proposed silhouette

- **Head:** low rounded protective helmet with a short projecting brow and a small rear nape guard. It must not resemble Usher's peaked cap, Coach's low team cap or Referee's cap/sweatband.
- **Torso:** compact protective overshirt/vest with a clear squared shoulder line and a structured chest plane. Keep the hem above the knee with a visible belt break; no long coat and no athletic warm-up yoke.
- **Arms:** one forearm may carry a visibly distinct protective bracer/guard plane. Keep both arms anatomically readable and avoid a permanently crossed-arm pose.
- **Legs/stance:** stable, slightly wide planted stance with separated trouser legs and substantial work boots. The stance—not a baton—should establish a protective role.
- **Rear:** helmet nape, shoulder protection and back panel must form a deliberate rear silhouette; do not use a generic flat jacket back.

### Face identity

- Front: heavier straight brow with close-set, focused eyes; broad lower jaw with a compact chin.
- Profile: clearly projecting nose bridge and firm chin/jaw break; face remains visible beneath the helmet brim.
- Rear: helmet shell and nape guard provide a recognizable head contour.

### Prop / contact proposal

Prefer a compact radio clipped to the upper chest or belt as an integrated secondary detail. A baton is optional, not required. If the Designer chooses a handheld baton, it must be supported by a visible continuous shoulder–upper arm–forearm–wrist–hand chain in every relevant direction, with contact and occlusion documented. Do not let the baton carry the identity by itself.

### Palette direction

Deep blue-charcoal / graphite protective fabric, desaturated slate planes and a restrained muted ochre safety accent. Avoid Usher's navy/steel/brass formalism, Coach's forest/cream and Referee's black/ivory/vermilion. The accent must support form separation, not become a large glowing stripe.

### Exactly three proposed must-survive items

1. Distinct low helmet plus squared protective shoulder contour (**direct 28×42 head-read cue: helmet brow/nape profile**).
2. Compact protective overshirt with a clear belt break and short split hem.
3. Integrated radio/protective-gear detail that reinforces security work without substituting for the silhouette.

**Allowed to simplify/disappear at 28×42:** tiny radio buttons, seams, individual helmet rivets and fine belt hardware.

**Four-view checks:** front must show the face under the brow and separated arms; back must retain helmet/nape and protective back-panel shape; left/right must preserve the same helmet projection and show the forearm/gear relationship without mirrored-hand errors.

---

## 2. Vendor — market / stall worker

**Personality read:** approachable, quick-witted, practical and welcoming; a person who knows their regular customers.

### Proposed silhouette

- **Head:** soft market cap with a sloped, modest brim and a slightly irregular crown/cloth fold. No chef toque, tall pleated hat or Cook-like curl mass.
- **Torso:** open short waistcoat over a rolled-sleeve shirt. Use a narrow offset waist apron or tied sash, not a broad triangular apron-front. The waistcoat opening and exposed shirt create a different central negative space from Cook.
- **Arms:** customer-facing gesture, with one arm bent toward a compact market item and the other relaxed or resting near the sash. Avoid Cook's pan-presenting pose.
- **Legs/stance:** slight forward lean and one foot subtly advanced, suggesting a stall interaction without becoming a running pose.
- **Rear:** waistcoat back seam and tied sash ends create a distinct rear rhythm; avoid Cook's broad apron panel and ties.

### Face identity

- Front: rounded cheek volume with a lifted outer brow and asymmetrical friendly smile.
- Profile: softly sloped nose and fuller cheek-to-chin transition; use a different jaw and brow geometry from Cook's face.
- Rear: cap crown and cloth fold should read without relying on colour.

### Prop / contact proposal

A shallow produce bowl/tray remains an option because it is a legacy role clue, but it must be redesigned as a market object rather than Cook's pan. Preferred composition is a small shallow tray supported close to the waist with a clearly visible palm/finger support point. Do not use a large bowl that hides the torso or becomes the whole silhouette. A folded paper parcel or compact produce bundle is an acceptable alternative if it produces cleaner contact.

### Palette direction

Rich muted berry/plum for the waistcoat, warm saffron or ochre for a small accent, and natural linen for the shirt/apron detail. Avoid Cook's copper/chef warmth, Courier's orange/cyan and Usher's navy. Keep large value planes distinct at game scale.

### Exactly three proposed must-survive items

1. Soft sloped market cap and friendly, rounded face silhouette (**direct 28×42 head-read cue: cap brim/crown plus cheek contour**).
2. Open waistcoat over rolled sleeves with a narrow offset sash/apron—not a chef coat or broad apron wedge.
3. Compact market tray/bundle interaction held close to the body, with a visible support point.

**Allowed to simplify/disappear at 28×42:** tiny waistcoat buttons, individual produce pieces, fine apron stitching and small cloth folds.

**Four-view checks:** front must preserve the open waistcoat negative space and support contact; back must show the tied sash/waistcoat construction; profiles must keep the cap brim and shallow prop readable without turning the tray into a bowl-like torso mass.

---

## 3. Clinic worker — healthcare role

**Personality read:** calm, attentive, reassuring and capable; clinical without feeling like a generic lab scientist.

### Proposed silhouette

- **Head:** swept-back hair gathered into a low compact bun/coil, held by a narrow band with a small side tie. The hair mass and gathered rear shape—not the band alone—must identify the head from back and profile.
- **Torso:** short wrap-front clinical tunic with a diagonal overlapping closure, shaped side seams and a softly curved hem. Keep it clearly shorter than Usher's long coat and avoid Cook's apron-front wedge.
- **Arms:** relaxed attentive posture; one hand may rest near the care pouch or extend in a small reassuring gesture. Avoid Coach's clipboard stance and Cook's two-handed serving pose.
- **Legs/stance:** balanced, modestly narrow stance with visible trousers below the curved tunic hem. No long coat obscuring the leg/torso relationship.
- **Rear:** gathered hair, tunic back yoke and curved hem must make the rear intentional; do not default to a blank rectangular coat back.

### Face identity

- Front: soft tapered jaw, slightly wider-set eyes and a calm, gently raised inner brow.
- Profile: clean, shallow nose bridge and rounded chin; retain an unmistakable forehead-to-nose transition.
- Rear: gathered hair/bun and side tie provide a distinct head silhouette.

### Prop / contact proposal

Prefer a compact care pouch attached to a short belt/waist strap, with a visible flap and cross-body/hip placement. This avoids forcing a handheld medical kit into every view. If a handheld kit is selected instead, show the handle, supporting fingers, arm chain and correct mirrored profile contact. A medical symbol may be a secondary cue only; it cannot replace the clinical garment/head construction.

### Palette direction

Deep muted teal/blue-green tunic with pale sea-glass or sage panels and a small muted plum accent. Avoid Referee's black/ivory/vermilion, Coach's forest/cream, Usher's navy/brass and Cook's warm copper. Do not make the whole character white; preserve material and value separation.

### Exactly three proposed must-survive items

1. Swept-back gathered hair with a low rear bun/coil (**direct 28×42 head-read cue: gathered rear hair mass and side tie**).
2. Short asymmetric wrap-front tunic with curved hem and visible trouser break.
3. Compact integrated care pouch/strap that reads as clinical equipment without dominating the body.

**Allowed to simplify/disappear at 28×42:** tiny pouch contents, fine wrap stitching, small badge text and individual hair strands.

**Four-view checks:** front must show the wrap closure and a clear face; back must show the gathered hair and curved tunic hem; profiles must show the hair mass, tunic overlap/hem and pouch placement without collapsing into a lab-coat rectangle.

---

## Owner preflight checklist

- [ ] Guard silhouette direction accepted or revisions requested.
- [ ] Vendor silhouette direction accepted or revisions requested.
- [ ] Clinic worker silhouette direction accepted or revisions requested.
- [ ] Face-construction directions accepted or revisions requested.
- [ ] Prop/contact approach accepted or revisions requested.
- [ ] Palette directions accepted or revisions requested.

## What approval unlocks

After owner acceptance, the NPC Designer may create the actual four-view black silhouette explorations and completed identity/construction cards. Those actual silhouettes must be compared at matched scale against all six existing vector characters and against one another. If a genuine collision appears, revise the silhouette before adding colour or detailed vector paths.

Only after the owner accepts that silhouette exploration should the team begin renderer implementation, one character at a time, with the full Tier A evidence package and browser QA required by the ratified standard.

## Evidence status and limitations

- This document is a **design preflight proposal**, not a rendered silhouette sheet. It contains proposed construction directions and four-view requirements; it does not claim that the silhouettes have been visually rendered or measured.
- No native 64×96 or direct 28×42 character captures exist for these unbuilt characters.
- No prop-contact table can be marked verified until actual views exist.
- No roster shell-family assignment is made here; each remains UNASSIGNED until actual four-view silhouette evidence exists.
- No production art, renderer code, game code, QA baseline or golden snapshot has been changed.
