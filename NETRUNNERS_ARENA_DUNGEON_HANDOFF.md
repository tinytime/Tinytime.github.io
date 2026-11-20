# Netrunners Arena — Boss Dungeon Implementation Handoff

**Repository:** `tinytime/Tinytime.github.io`  
**Working branch:** `Circuit-Football-RPG`  
**Prepared:** 2026-11-20  
**Status:** Planning handoff — implementation not yet authorized by this document  
**Design target:** A six-room, top-down action-puzzle dungeon inspired by the readable room progression and puzzle logic of *The Legend of Zelda: Link’s Awakening*.  
**Primary objective:** Make the Netrunners Arena a meaningful challenge before the Captain match, not a waiting room. Preserve the existing football game and progression systems.

---

## 1. Authority, scope, and implementation guardrails

This document consolidates the owner’s prior design decisions and the technical review refinements. It is the implementation brief for the builder.

### Scope

Build a six-room Netrunners-themed dungeon inside the existing arena building:

1. Lobby / prerequisite gate
2. Switch Yard
3. Locker Maze
4. Hazard Gauntlet
5. Breaker Room
6. Netrunners Turf / existing arena court

The dungeon contains exploration, switches, barriers, crates, plates, readable hazards, and a final challenge interaction with Mainframe Mo. The existing football match remains the only football gameplay in this sequence.

### Do not change

- Football movement, aiming, tackling, passing, or match controls.
- Existing crew match logic except the minimum routing needed to gate access to the Captain match.
- Existing Captain win/loss reward logic, roster changes, stat rewards, upgrade points, or rematch behavior.
- Existing `SAVE.beaten` semantics.
- Existing crew buildings or their NPC populations.
- Existing player progression or unrelated interiors.

Do not add a new lieutenant flag. Do not add the three earlier crews as NPCs inside this dungeon.

### Evidence labels

- **Owner decision:** A decision already supplied by the project owner.
- **Design requirement:** Required behavior for this build.
- **Builder verification:** Must be checked against the actual current implementation before coding.
- **Open owner choice:** Must remain unchanged until the owner explicitly decides.

---

## 2. Story and progression decisions

### Captain’s three lieutenants

The three earlier crews are Captain’s lieutenants in the story:

- Glitch Cats — `cats`
- Scrap Kings — `kings`
- Skyline Drifters — `rollers`

Their existing defeated state in `SAVE.beaten` is the sole source of truth. Do not create parallel lieutenant state.

The Netrunners dungeon is staffed and themed only around the Netrunners, Captain, Mainframe Mo, and generic arena staff. The three lieutenant crews remain in their own buildings.

### Prerequisite gate

The lobby displays three distinct indicators, one for each prerequisite crew.

- A crew’s indicator changes from locked/red to complete/green when its existing key is present in `SAVE.beaten`.
- Use a symbol, shape, or pattern as well as color; color must not be the only signal.
- Re-evaluate the indicators and gate from `SAVE.beaten` whenever the lobby is entered or refreshed.
- The gate opens only when all three required keys are present.
- Do not persist a second copy of these three completion states.

### Existing Captain winners

A player whose `SAVE.beaten` already contains `captain` bypasses Rooms 1–5 and enters Room 6 directly. This preserves the prior decision that existing Captain winners do not replay the dungeon.

A new player must complete the dungeon before being able to challenge Mo.

### Story canon

Do not introduce the proposed brother/PED storyline. It is not approved canon. Preserve Mo’s existing Dante reference as it currently exists; do not expand or reinterpret it in this task.

---

## 3. Critical state model — keep three milestones separate

The implementation must never conflate opening the boss door, clearing the dungeon, and winning the Captain match.

### Required distinctions

| State | Meaning | What sets it |
|---|---|---|
| Puzzle room solved | A specific puzzle room has been completed | Its exit/solution condition is satisfied |
| `bossAccess` | The route into Room 6 is unlocked | Breaker Room / boss-door condition is satisfied |
| `cleared` | The player has legitimately reached Room 6 through the dungeon route | Room 6 is entered after satisfying the dungeon path |
| Captain defeated | The existing football match has been won | Existing Captain win logic updates `SAVE.beaten` |

**Important:** Opening the boss door sets `bossAccess`, not `cleared`. Entering Room 6 through the valid dungeon route sets `cleared`. Neither flag means the Captain football match has been won.

For old saves, an existing Captain victory implies the player can bypass the dungeon. A dungeon clear does not imply a Captain victory.

Use the following conceptual bypass rule:

```js
const captainAlreadyDefeated =
  Array.isArray(SAVE.beaten) && SAVE.beaten.includes('captain');

const dungeonCleared =
  captainAlreadyDefeated || SAVE.dg?.arena?.cleared === true;
```

Treat this as a behavioral definition, not a mandate to paste this exact code. Match the project’s actual JavaScript style and defensive patterns.

### Proposed save shape

Add only the dungeon-specific state, preserving all existing fields:

```js
SAVE.dg = {
  arena: {
    v: 1,
    solved: {},
    cp1: false,
    shortcut: false,
    bossAccess: false,
    cleared: false,
    loot: false
  }
};
```

Requirements:

- Missing `SAVE.dg`, `SAVE.dg.arena`, or individual fields must safely default without breaking older saves.
- `solved` records permanent puzzle-room completion, keyed by stable room IDs.
- `cp1` records checkpoint activation.
- `shortcut` records permanent shortcut unlock.
- `bossAccess` records boss-door access.
- `cleared` records legitimate dungeon completion/reaching Room 6.
- `loot` records any one-time optional reward claimed.
- Do not store the three prerequisite crew indicators here; derive them from `SAVE.beaten`.
- Do not change `SAVE.beaten` to represent dungeon completion.
- Do not reset, replace, or reconstruct the whole `SAVE` object in a way that discards unknown fields.

The proposed schema may be adjusted to fit the actual serializer, but the semantic distinctions above are mandatory.

---

## 4. Room-by-room design

### Room 1 — Lobby / prerequisite gate

**Purpose:** Establish the Netrunners’ identity, explain the challenge, and show exactly what the player still needs.

- Front desk, security fixtures, arena signage, and restrained Netrunners technology.
- Three visible prerequisite indicators for Cats, Kings, and Drifters.
- Locked gate to the dungeon route until all three existing crew keys are present.
- Clear visual feedback when the gate opens.
- No puzzle reset button is required while the room is only a lobby; if the shared dungeon UI shows one here, it must not reset progression.

### Room 2 — Switch Yard

**Purpose:** Teach the switch/barrier language safely.

- One interactable switch controls a clearly paired barrier.
- Teach the player to interact with or deliberately bump a switch; merely walking over it never toggles it.
- Show the resulting barrier state immediately and clearly.
- Include a forced but readable loop so the player understands cause and effect.
- No hazard or fail state in this tutorial room.

### Room 3 — Locker Maze

**Purpose:** Add spatial reasoning, multiple switches, and a useful shortcut.

- Two switches with understandable relationships to barriers.
- One reset/checkpoint pad or clearly marked checkpoint activation point.
- Activate Checkpoint 1 at a deliberate interaction point.
- Unlock the shortcut door once its stated puzzle condition is solved.
- Mo may taunt the player through short text or screen dialogue, but do not let dialogue block movement indefinitely or swallow queued input.
- The shortcut remains unlocked permanently once earned.

### Room 4 — Hazard Gauntlet

**Purpose:** Introduce timing and readable movement hazards.

- Two hazard lanes with arena equipment or Netrunners-themed moving machinery.
- A safe central median or clearly marked safe route.
- Hazard timing/patterns must be visible before the player commits.
- Hazard movement should be slower than the player’s normal movement; initial tuning target is approximately 0.5–0.6 seconds per tile, subject to playtesting.
- Hazards must never cross or occupy the defined restart tile.
- On contact, restart only the current hazard attempt at the lane start. Do not reset solved rooms, switches elsewhere, checkpoint, shortcut, or permanent rewards.
- Provide a short, clear recovery/invulnerability window to prevent immediate repeated collision.

### Room 5 — Breaker Room

**Purpose:** Deliver the main multi-object puzzle payoff.

- Two movable crates, two pressure plates, and one switch.
- Both plates must be occupied by crates to satisfy the primary door condition.
- Plates are crate-only; the player standing on a plate does not count.
- Include one optional side reward if it can be reached without introducing a softlock.
- Every crate destination and push sequence must be checked for recoverability.
- Do not allow a crate to be pushed into a corner or corridor position that makes the room unsolvable unless a clearly explained reset restores the unsolved room.
- Solving the room sets `bossAccess` and permanently records the room as solved.

### Room 6 — Netrunners Turf / existing arena

**Purpose:** Dramatic reveal and handoff to the existing Captain match.

- Reuse the existing arena court and Mainframe Mo placement where technically practical.
- Make this room feel like the climax: Netrunners lighting, coordinated floor markings, controlled sightlines, strong arena identity, and Mo commanding the space.
- Entering Room 6 must **not** automatically launch a football match.
- The player can move around the court and approach Mo.
- Interacting with Mo presents challenge dialogue and an explicit confirmation step.
- Only after confirmation should the existing Captain match launch path be called (reported existing path: `owPlay(c)` / `startMatch(c)`; builder must verify current names and call flow).
- Set `cleared = true` when Room 6 is legitimately entered from the completed dungeon route, before the match interaction.
- A loss to the Captain returns the player to Room 6 near Mo, with dungeon state intact. Do not replay Rooms 1–5.
- A win uses the existing Captain reward logic exactly once.

---

## 5. Puzzle interaction rules

### Switches and barriers

- Switches activate only by an explicit interact action or deliberate bump.
- Walking over a switch never toggles it.
- A switch cannot toggle into a state that traps the player or a crate inside a solid/barrier tile.
- If activation is refused, show a brief readable feedback cue (for example, a buzz).
- Distinguish barrier states by pattern/marking as well as color.

### Crates and plates

- Crates move one tile when pushed by the player, provided the destination is valid and unoccupied.
- Crates cannot be pulled unless a future approved design explicitly adds that mechanic.
- Plates count crates only.
- Each room must have a known valid solution path and a check for dead-end crate placements.
- Reset must restore crate and plate state in the current unsolved room.

### Hazard recovery

- Hazard failure resets only the current hazard attempt.
- Room switches and previously solved room state remain unchanged.
- Checkpoint and shortcut flags remain unchanged.
- Hazard recovery must clear stale queued movement or interaction input so the player cannot be moved into danger immediately after respawn.

---

## 6. Reset, checkpoint, shortcut, and reload semantics

### On-screen reset

Provide a visible, mobile-friendly reset control in dungeon rooms.

- Require a confirmation step before resetting.
- Reset only the current **unsolved** room’s transient puzzle state: switches, crate positions, plate occupancy, and local hazard state.
- Return the player to that room’s entrance.
- Never clear solved-room flags, checkpoint activation, shortcut unlock, dungeon clear, optional reward claim, crew victories, Captain victory, roster, upgrades, or any other permanent save data.
- If the current room is already solved, reset must not undo it. Either disable the reset control or make it a harmless return-to-entrance action without altering permanent state.

### Checkpoint and shortcut

- Checkpoint activation is permanent once earned.
- Hazard failures use the current hazard’s restart point; checkpoint applies to the defined return/re-entry behavior, not as a reason to reset solved puzzle state.
- The shortcut stays unlocked permanently after its puzzle condition is met.
- Shortcut destination is an **open owner choice**. The original proposal is a return to the street; do not silently finalize this if the owner has not confirmed it.

### Quit and reload

Define reload behavior explicitly:

- Permanent progress is restored from the save.
- A solved room remains solved.
- An unsolved room reloads in its documented default state unless the implementation deliberately persists its transient puzzle state.
- If the player reloads while in an unsolved room, restore the room entrance/default puzzle state rather than a partially mutated state unless a reliable full transient-state save is intentionally implemented.
- Do not store only a room ID if the loader can then restore an inconsistent player position or invalid room state.
- Unknown or obsolete room IDs must fall back safely to a known valid location.

---

## 7. Save compatibility and migration requirements

The project has used the `street_gridiron_v1` localStorage key and backup keys (builder must verify the current implementation). There may be multiple HTML builds on the same origin.

**Do not assume an older build preserves unknown fields.** The builder must inspect the actual load, normalize, and serialization paths.

Required investigation and tests:

1. Identify every place the save object is initialized, normalized, replaced, and serialized.
2. Confirm whether unknown fields survive load/save cycles.
3. Add dungeon defaults without overwriting unrelated or unknown save properties.
4. Test: save in the new build → load and save in the older build → return to the new build → verify dungeon and existing progression data.
5. If the older build drops unknown fields, document that incompatibility and do not claim cross-build safety. Propose a safe rollout/isolation strategy before implementation is shipped.
6. Verify backup/restore behavior and ensure dungeon migration does not corrupt or invalidate existing backups.

Never wipe or rewrite the owner’s existing save as a migration shortcut.

---

## 8. Match integration and reward safety

- The dungeon gates access to the Captain challenge; it does not replace the Captain match.
- Room 6 interaction launches the existing match flow only after explicit player confirmation.
- Match loss returns to Room 6 near Mo with dungeon flags intact.
- Match loss must not set `SAVE.beaten` to include `captain`.
- Match win must use the existing reward sequence and must not duplicate rewards on rematch or reload.
- Existing Captain winners bypass the dungeon.
- Dungeon clear and Captain victory remain independent milestones.
- Do not modify `endGame`, reward logic, or `owGateOpen` unless code inspection proves a minimal change is unavoidable. If a change is unavoidable, isolate it and document the exact reason and regression tests.

---

## 9. Builder preflight — mandatory before coding

The builder must first inspect the current branch and verify the real implementation. The following are reported names/structures from an earlier code audit and are **not substitutes for fresh verification**:

- Overworld movement: `owStep`, `owTryMove`, `owArrive`, `owInteract`, `owBump`, `owEnter`, `owLeave`, `owPlace`, `owSave`.
- Collision: `owBlocked(x, y)`.
- Room construction: `owMap(id)`, `OWI`, `HBI`.
- Arena: `OWB.arena`, `OWI.arena`.
- Challenge/match flow: `owChallenge(n)`, `owPlay(c)`, `startMatch(c)`, `endGame(win)`.
- Save: `SAVE`, `street_gridiron_v1`, `SAVE.ow`, `SAVE.beaten`.
- Test gating: `window.CF_TEST`.

Before implementation, record:

1. Current branch, HEAD commit, and latest relevant Actions results.
2. Which HTML file is the actual authoritative build and why.
3. Whether `VaporCity_HD2D_Hybrid_Test.html` or `test_v316QQ1_original.html` is the correct target. Do not infer authority merely because one file changed in a recent commit.
4. The current room/door/exit architecture and how it can represent six connected rooms.
5. Exact save normalization, serialization, backup, and reload paths.
6. The complete Captain challenge → match → win/loss → retry/rematch call flow.
7. Whether `CF_TEST` is active in the target build and what it is intended to gate.
8. Baseline behavior for town, existing interiors, movement, touch controls, saves, Captain win, and Captain loss.

If the authoritative file cannot be established, stop before modifying game code and ask the owner to confirm the target.

---

## 10. Recommended implementation order

Keep changes incremental and test each stage before proceeding.

1. **Baseline and target confirmation** — establish the authoritative HTML, branch/commit, save behavior, and regression baseline.
2. **Room graph and navigation** — add the room/door table and connect the six rooms without puzzle logic; verify all exits and return paths.
3. **Save model and migration** — add versioned `SAVE.dg.arena` defaults, preserve unknown fields, and test old/new save compatibility.
4. **Progression routing** — implement prerequisite gate, live crew indicators, and the existing-Captain-winner bypass.
5. **Switches and barriers** — implement shared interaction rules and Switch Yard / Locker Maze mechanics.
6. **Crates and plates** — implement Breaker Room puzzle with deadlock checks and reset behavior.
7. **Hazards and recovery** — implement Hazard Gauntlet, safe restart points, and input-queue cleanup.
8. **Checkpoint and shortcut** — add permanent flags and explicit reload behavior.
9. **Boss access and match interaction** — add boss door, Room 6 arrival, Mo interaction/confirmation, loss return, and existing match launch.
10. **Visual/audio polish and full regression** — make the rooms feel like one coherent Netrunners facility without changing football gameplay.

Do not start unrelated buildings or new storylines as part of this task.

---

## 11. QA and acceptance criteria

A passing JavaScript build is not enough. Inspect actual rendered output at native game scale and enlarged scale, on desktop and touch/mobile layouts.

### Functional acceptance

- [ ] A fresh save cannot pass the lobby gate before all three prerequisite crews are beaten.
- [ ] Each indicator accurately reflects the existing `SAVE.beaten` key.
- [ ] A player with all three prerequisite victories can enter the dungeon.
- [ ] A player who already beat the Captain bypasses Rooms 1–5 and enters Room 6.
- [ ] A new player cannot challenge Mo until the dungeon route is completed.
- [ ] Entering Room 6 does not automatically start the match.
- [ ] Mo’s explicit interaction and confirmation starts the existing Captain match.
- [ ] Losing to the Captain returns to Room 6 near Mo with all dungeon progress intact.
- [ ] Winning the Captain match grants the existing rewards once only.
- [ ] Dungeon clear does not falsely mark the Captain as defeated.
- [ ] Opening the boss door does not falsely mark the dungeon as cleared.
- [ ] Switches require explicit interaction/bump; walking over them has no effect.
- [ ] Barriers cannot trap the player or make a room unsolvable.
- [ ] Crates and plates follow the crate-only rules.
- [ ] No crate configuration creates an unrecoverable softlock.
- [ ] Hazard failure restarts only the current hazard attempt.
- [ ] Reset affects only the current unsolved room’s transient state.
- [ ] Solved rooms, checkpoint, shortcut, rewards, and crew progression survive reset.
- [ ] Keyboard and touch controls work for every puzzle and reset/confirmation action.
- [ ] Reload during each room restores a valid, documented state.
- [ ] Existing town, interiors, NPC interactions, football movement, and match flow still work.

### Required save-state test matrix

| Save state | Expected behavior |
|---|---|
| Fresh / no prerequisite crews | Lobby indicators locked; gate closed |
| One or two prerequisite crews beaten | Matching indicators complete; gate remains closed |
| All three prerequisites beaten; Captain not beaten | Dungeon opens; puzzle route required |
| Mid-dungeon, unsolved room | Reload restores valid room/default transient state |
| Mid-dungeon, checkpoint earned | Checkpoint persists |
| Shortcut unlocked | Shortcut remains open after reload |
| Dungeon cleared, Captain not beaten | Room 6 accessible; Captain match still available |
| Captain already beaten | Direct Room 6 bypass; existing rewards unchanged |

### Visual inspection

- Inspect all six rooms, every direction of movement, door transitions, and collision boundaries.
- Verify switches, barriers, crates, plates, hazards, and reset control are legible at native scale.
- Verify color-independent barrier and prerequisite indicators.
- Check player/NPC/prop overlap, clipping, and touch-control coverage.
- Verify Room 6 has a strong visual climax and Mo remains readable and approachable.
- Compare screenshots before and after implementation to identify regressions.

### Regression and artifacts

- Run the established project QA workflow and relevant GitHub Actions.
- Capture and inspect screenshots/artifacts; do not rely on a green build alone.
- Do not approve, refresh, or replace golden snapshots without explicit owner authorization.
- Record commit SHA, tests, actual visual inspection, failures, fixes, and remaining issues.

---

## 12. Open owner choices — do not silently decide

1. **Authoritative game file:** confirm the exact HTML file to modify if repository/deployment evidence does not prove it.
2. **Shortcut destination:** proposed destination is the street; owner confirmation required.
3. **Test gating:** confirm whether the feature should initially ship behind `CF_TEST` or be enabled directly in the authoritative build.
4. **Cross-build save strategy:** if old builds discard unknown save fields, present the safe rollout choice before enabling the feature across builds.

The existing-Captain-winner route is settled: bypass Rooms 1–5 and enter Room 6 directly.

---

## 13. Definition of done

The dungeon is ready for owner review only after:

1. The implementation is in the confirmed authoritative file.
2. All functional and save-state acceptance tests pass.
3. Actual desktop and mobile renders have been inspected.
4. Existing interiors, saves, football controls, Captain win/loss, and rewards have passed regression.
5. The implementation commit and QA artifacts are recorded.
6. Any required independent review has been completed.
7. The owner has approved the result.

**This handoff authorizes planning and implementation preparation only. It does not itself constitute visual approval, independent review, or final owner approval.**
