# KayKit 3D Football Player & Animation Upgrade — Builder Handoff

**Prepared:** 2026-11-20  
**Repository:** `tinytime/Tinytime.github.io`  
**Working branch:** `Circuit-Football-RPG`  
**Branch HEAD at handoff creation:** `f8d6a56e6f88491bfe799a1395c3129a48241492`  
**Purpose:** Technical investigation, implementation planning, and staged delivery by the builder (Claude).  
**Status:** Handoff only. No game code, models, animations, snapshots, or assets have been changed by this document.

---

## 1. Owner's direction

The owner wants to use the supplied KayKit character models as the base player characters in the 3D football games.

- Use the KayKit adventurer characters as the starting player bodies.
- Give the football players our existing team jerseys and helmets. The KayKit characters are the base models, not the final football uniforms.
- Use the larger / heavier character builds for offensive and defensive linemen.
- Use the smaller / lighter builds for the other football positions.
- Inspect the accompanying animation pack and determine which animations can be implemented to improve football gameplay and which, if any, can improve other parts of the project.

The desired result is a reusable player-character system, not a one-off replacement of a single player model.

## 2. Supplied source packages

The owner supplied these archives with the request:

1. `KayKit_Adventurers_2.0_FREE.zip` — character/model package.
2. `KayKit_Character_Animations_1.1.zip` — animation package.

**Important asset-access gate:** These archives were attached to the originating ChatGPT conversation. They have not yet been unpacked or inspected for this handoff because data-analysis access was temporarily unavailable. Do not claim to have inspected their contents. Confirm that both exact archives are available in the builder's working environment before beginning. If either is missing, ask the owner to provide it; do not substitute guessed downloads or similarly named packages.

Before using any asset:
- Inventory the archive contents and preserve the original folder structure.
- Read all included README, license, attribution and usage files.
- Record the exact model, texture, rig and animation filenames used.
- Confirm the package's license and any attribution / redistribution obligations for this project.
- Keep pristine source archives separate from converted or optimized working assets.

Do not infer animation names, model variants, skeleton compatibility, or licensing terms from the archive filenames alone.

## 3. Repository facts verified at handoff time

The current working branch is `Circuit-Football-RPG`, at commit `f8d6a56e6f88491bfe799a1395c3129a48241492`.

The branch root contains:
- `VaporCity_HD2D_Hybrid_Test.html`
- `test_v316QQ1_original.html`
- `three.js` — bundled Three.js r158
- `README.md` — currently only a minimal repository title
- `NETRUNNERS_ARENA_DUNGEON_HANDOFF.md` — an unrelated dungeon handoff

The two HTML files are present, but their large source contents were not available through the repository inspection method used to prepare this document. **The authoritative 3D football game entry point and current player-rendering path are therefore not established here.**

Builder must inspect the actual checked-out source and determine:
- Which HTML/app is the current authoritative 3D football game.
- Whether both HTML files are active, experimental, historical, or duplicates.
- Where the 3D field, player entities, team/jersey data, helmet assets, camera, input, and match simulation are implemented.
- Whether Three.js r158 is actually used by the football game and how it is loaded.
- Whether a model loader (for example, GLTF/GLB support) already exists. Do not add a second Three.js copy or loader stack without first checking.
- How player state and animation currently work, if at all.

Do not assume the Vapor City hybrid test is the football game's authoritative entry point merely because it is named in the repository.

## 4. Required first phase — asset and code audit (no destructive edits)

### 4.1 KayKit asset inventory

Produce a concise inventory table containing, for every candidate character and animation asset:

| Field | Required finding |
|---|---|
| Asset path | Exact path inside the archive |
| Type | Model, rig, texture, material, animation, documentation, etc. |
| Format | Exact file extension / format |
| Skeleton | Rig name and bone count, if applicable |
| Scale/orientation | Measured or verified conventions |
| Animation clips | Exact clip names and durations, if present |
| Dependencies | Textures, materials, or companion files |
| License | Applicable license and attribution requirement |
| Suitability | Candidate use and known limitations |

Identify which character variants are genuinely larger/heavier and which are smaller/lighter. Verify this by inspecting geometry and proportions, not filename or thumbnail alone.

Determine whether the animation pack:
- Uses the same skeleton as the adventurer models.
- Uses a compatible but differently named skeleton.
- Requires retargeting.
- Contains in-place motion, root motion, or both.
- Has clip naming, frame-rate, scale, or orientation conventions that need conversion.

Do not assume all clips are interchangeable across every character.

### 4.2 Current game architecture audit

Before implementation, trace one player from creation through rendering and gameplay:
1. Player/team data creation.
2. Model construction/loading.
3. Uniform and helmet assignment.
4. Position, facing and movement updates.
5. Animation or pose updates.
6. Tackle, collision, possession and other football interactions.
7. Player reset / respawn / substitution / game-state transitions.
8. Cleanup and disposal when models or matches are replaced.

Document the current architecture and identify the smallest safe integration point. Preserve current game behavior while building the new model path.

## 5. Player model direction

### 5.1 Reusable body classes

Create a small, data-driven set of body-size classes based on the supplied character variants:

- **Large / heavy:** linemen. Prioritize a broad, sturdy silhouette and convincing mass.
- **Standard / smaller:** other positions. Prioritize agility and readable movement.

The owner’s size distinction is a starting direction, not permission to distort every model arbitrarily. First compare the actual KayKit body variants. If the pack does not provide enough useful size variation, propose the least destructive solution (for example, carefully tuned scale and/or a small number of body presets) and show a visual comparison before committing.

Avoid per-player duplicated model files when a shared model plus configuration can achieve the result.

### 5.2 Football equipment and team identity

Use our existing team identity and assets. Do not invent replacement jersey or helmet designs.

Inspect the current source of truth for:
- Jersey meshes, textures, logos, numbers, colors and material setup.
- Helmet meshes, shell colors, facemask, decals/logos and attachment points.
- Existing team data and player-number assignment.

The integration should make it possible to assign the correct team uniform and helmet to each player through data/configuration rather than baking one team's appearance into the base model.

Preferred design direction:
- Keep the KayKit body/rig as the reusable base.
- Apply the existing football jersey appearance using the best-supported current asset/material approach.
- Attach the correct helmet to the head using a stable head-bone or equivalent attachment transform when the rig supports it.
- Preserve player identity, team colors, jersey number and existing helmet details.
- Make equipment fit each body size without obvious clipping, floating, or gaps.

Do not assume the KayKit package includes football equipment. Do not discard existing project equipment in favor of generic KayKit clothing.

### 5.3 Fit and visual QA

Inspect front, back, left and right views for each selected body class, both with and without equipment. Check:
- Jersey fit around shoulders, torso, waist and arms.
- Helmet scale, head alignment, facemask clearance and neck contact.
- No visible body or clothing intersections in idle, run, crouch and contact poses.
- Hands, feet and head remain correctly aligned to the skeleton.
- Large linemen read as substantially heavier than standard players without looking like a uniformly scaled toy.
- Team colors, logos and jersey numbers remain legible from the normal game camera.

Use actual game-camera screenshots, not only asset-viewer screenshots.

## 6. Animation investigation and implementation

### 6.1 Build a clip catalogue first

List every animation clip found in the supplied package using its exact source name. For each clip, record duration, loop suitability, root-motion behavior, skeleton compatibility, and an observed preview.

Then classify candidates by gameplay purpose. The categories below are **questions to investigate, not claims that these clips exist in the pack**:

| Football use | What to look for | Integration consideration |
|---|---|---|
| Idle / ready stance | Idle, breathing, ready or stance clips | Loop cleanly; avoid distracting motion |
| Locomotion | Walk, jog, run, sprint | Blend by speed and direction; preserve gameplay position |
| Acceleration / deceleration | Start, stop, turn, pivot | Avoid foot sliding and abrupt snaps |
| Blocking | Push, brace, shove or two-arm contact | Align contact pose with gameplay collision |
| Tackling | Lunge, grab, fall or impact | Trigger from authoritative tackle state, not visual proximity alone |
| Falling / getting up | Fall, knockdown, rise | Respect player recovery and invulnerability timing |
| Catching / throwing | Catch, receive, throw or pass-like clips | Check hand/ball alignment; may need custom football-specific work |
| Jumping | Jump, hop or landing | Only use if a real gameplay action needs it |
| Celebration / reactions | Cheer, victory, defeat, hit reaction | Trigger from match events; avoid blocking controls |
| Sideline / presentation | Wave, clap, look, talk or other idle actions | Potential use outside active play if suitable |

Do not label a generic punch or weapon attack as a football tackle without checking the pose, contact point and timing. Do not use an animation that implies a ball action unless the hand/ball alignment is credible.

### 6.2 Other project uses

In addition to football gameplay, inspect whether any clips could improve:
- Team lineup and pre-game introductions.
- Touchdown / score / victory presentation.
- Sideline or bench idles.
- Crowd or background character reactions, if skeleton and style are suitable.
- Menus, character previews, roster screens or team-selection presentation.
- Vapor City NPCs only if technically and artistically appropriate; this is a separate project context and must not cause changes to the Vapor City NPC standard or renderer without owner authorization.

For each proposed non-gameplay use, state why it improves the experience, what integration work it requires, and whether it is worth the performance and maintenance cost. Avoid adding animations merely because they are available.

### 6.3 Runtime requirements

Use the existing animation/runtime architecture if it is sound. If Three.js animation support is used, confirm the installed revision and existing loading path before adding dependencies.

The implementation should:
- Use one animation controller per player instance, with shared immutable clip data where safe.
- Support cross-fades between compatible states.
- Prevent conflicting actions from playing simultaneously.
- Give gameplay state authority over animation selection.
- Avoid root-motion drift if the game simulation already controls player position.
- Ensure animation updates use the game's existing frame delta/time-step strategy.
- Pause or throttle off-screen/background animation where appropriate.
- Dispose of mixers, actions, geometries, materials and textures correctly.
- Avoid repeated model/texture loads for every player when caching/shared resources are appropriate.

Document how animation state maps to football simulation state. Keep gameplay collision, ball possession, player location and match rules independent of decorative animation.

## 7. Staged implementation plan

Do not replace the whole roster at once. Deliver a controlled proof of concept.

### Stage A — Audit report

Deliver:
- Confirmed authoritative game entry point and current rendering architecture.
- Asset inventory and license/attribution notes.
- Character size/variant comparison.
- Full animation clip catalogue.
- Skeleton compatibility result.
- Shortlist of useful football and non-football animations.
- Proposed integration architecture and risks.

**Gate:** Stop for owner review if the asset license is unclear, the rigs are incompatible in a costly way, or the current game architecture cannot be safely identified.

### Stage B — Visual player prototype

Implement one large/lineman body and one standard/smaller body in an isolated test scene or safe development path.

Show:
- Bare base models.
- Existing team jersey applied.
- Existing helmet applied.
- Front/back/side views.
- Normal in-game camera view.
- Comparative scale and silhouette.

Do not replace the full roster yet.

**Gate:** Owner reviews the body choices, proportions, jersey fit and helmet fit before roster-wide rollout.

### Stage C — Animation proof of concept

Choose a small set of confirmed compatible clips that cover:
- Idle / ready.
- Locomotion.
- One football contact or reaction action, only if the pack contains a credible candidate.

Demonstrate state transitions and cross-fades in the real game or a faithful isolated harness. Include a clip that is deliberately rejected if it illustrates a compatibility or quality issue.

**Gate:** Owner reviews the animation feel and gameplay fit before expanding the mapping.

### Stage D — Controlled gameplay integration

Integrate the approved model classes and animation controller into a limited number of test players first. Verify that:
- Existing football logic remains authoritative.
- Players still move, collide, tackle, possess/carry the ball and reset correctly.
- Animation does not move players away from simulation positions.
- Team jerseys, helmets and numbers remain correct.
- The game remains playable with the new player path enabled.

Keep a reversible fallback to the current player rendering until the new path is proven.

### Stage E — Roster rollout and polish

Only after the limited test passes:
- Map body classes to all required positions.
- Assign team uniforms and helmets from existing team data.
- Add approved animation state mappings.
- Optimize shared resources and loading.
- Add any approved presentation/ambient animation uses.
- Update documentation and regression tests.

## 8. Required QA and evidence

A passing JavaScript/build check is not sufficient. Capture and inspect actual rendered output.

Minimum evidence:
- Large and standard player side-by-side.
- Each body class in front, back and both profiles.
- Jersey and helmet fit at native game scale.
- Team-color / number / logo correctness.
- Idle-to-run and run-to-stop transitions.
- One representative contact/fall/recovery sequence if implemented.
- Game-camera screenshots during actual play.
- At least one test with multiple players visible simultaneously.
- Browser console and network checks.
- Performance comparison against the existing player path.
- Regression evidence for ball handling, collisions, tackles, scoring, reset and match flow.

Record browser, viewport, commit SHA, test steps and artifact links. Distinguish automated pass results from manual visual inspection. Do not refresh or replace golden snapshots without explicit owner approval.

## 9. Constraints and non-goals

- Do not alter football rules, player attributes, team balance, AI, controls or match timing as a side effect of the visual upgrade.
- Do not replace the existing team jersey or helmet designs.
- Do not make every player the same scale or use a single body class for every position.
- Do not import the entire animation pack into runtime if only a small subset is needed.
- Do not assume the animation rig matches the character rig.
- Do not use root motion to override authoritative gameplay movement without explicit design approval.
- Do not change the Vapor City NPC renderer, roster, construction standard or approved civilian art as part of this football task.
- Do not modify golden snapshots or baselines without owner authorization.
- Keep changes scoped and reversible until the owner accepts the prototype.

## 10. Builder's final report

Return a concise report with these separate statuses:

1. **Inspected:** exact archives, license files, model variants, rigs and animation clips inspected.
2. **Implemented:** exact files and systems changed.
3. **Tested:** automated tests and gameplay checks run, with results.
4. **Visually inspected:** exact screenshots/artifacts reviewed and findings.
5. **Performance:** before/after measurements and test conditions.
6. **Not implemented:** clips or ideas rejected/deferred, with reasons.
7. **Remaining risks:** compatibility, licensing, fit, performance or gameplay concerns.
8. **Commit:** exact branch and commit SHA.
9. **Owner decisions needed:** only the remaining choices that genuinely block progression.

Never report an animation as implemented unless it has been exercised in the game. Never report the model upgrade as complete based only on a viewer screenshot or a successful build.

---

## 11. Immediate next action

Begin with **Stage A only**: obtain and inspect the two exact supplied archives, inspect the current checked-out branch and game source, identify the authoritative 3D football entry point, and produce the asset/architecture audit.

Do not begin roster-wide model replacement or broad animation integration until the owner has reviewed the Stage A findings and approved the prototype direction.
