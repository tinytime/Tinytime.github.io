> **SUPERSEDED:** Use the exact-source Run #603 QA and Claude re-review brief instead. Run #602 tested an intermediate source whose Cook renderer differed from the task-start branch head. The owner instructed us to preserve the task-start Cook code. Run #603 is the authoritative exact-source U4 evidence.

# Claude Independent Re-review Brief — Run #602 / U4 and Revised Construction Standard

## Review request

Please independently review the five-civilian batch against Granny Volt and the current Civilian Vector Construction Standard. The primary changed item is Usher's profile clipboard contact (U4). Also assess whether the revised standard is coherent and ready as a repeatable working method for the next civilian briefs.

This is an independent review, not an approval request for the remaining 17 designs. The project owner retains final approval.

## Exact evidence and source

- Repository: tinytime/Tinytime.github.io
- Branch: npc-granny-baseline-overhaul
- Renderer source tested: 880cad6bf937d8bfc1e004fe81cbd6854c522d23
- Latest QA: [Run #602](https://github.com/tinytime/Tinytime.github.io/actions/runs/44657007100), artifact [14592969167](https://github.com/tinytime/Tinytime.github.io/actions/runs/44657007100/artifacts/14592969167)
- Baseline comparison: Run #600 artifact 14591690387
- Current construction standard: project-background/CIVILIAN-VECTOR-CONSTRUCTION-STANDARD.md
- Owner dispositions and exception register: project-background/qa-artifacts/five-civilian-corrections/ACCEPTED-EXCEPTIONS.md
- Identity cards: project-background/qa-artifacts/five-civilian-corrections/IDENTITY-AND-PROPORTION-CARDS.md
- Internal U4 QA: project-background/qa-artifacts/five-civilian-corrections/RUN-602-USHER-U4-INTERNAL-QA.md
- Run #600 re-review: project-background/qa-artifacts/five-civilian-corrections/CLAUDE-REREVIEW-RUN-600.md

The package artifact embeds the full current project documents and both Run #600 and Run #602 browser QA evidence ZIPs, plus U4 before/after profile sheets at native and direct game scale.

## Owner dispositions — do not reopen without new evidence

- **Cook C1:** owner explicitly deferred/accepted the existing pan/handle implementation as-is. No Cook handle correction is requested or authorized.
- **Usher U2:** owner explicitly declined the proposed silhouette feature. Preserve the current silhouette; do not redesign it.
- **Coach/Courier rear X1:** accepted exception. Preserve the recorded distinction and do not redesign either torso.
- **Usher U4:** owner authorized the profile clipboard contact correction. Review the new evidence and determine whether the one-arm carry/contact is now physically legible.

## U4 change to inspect

Run #602 changes only the Usher profile clipboard/arm construction in addition to restoring the unrelated Cook block to its pre-U4 implementation. In both profiles:
- one near arm forms a continuous shoulder-to-elbow-to-forearm chain;
- one visible hand contacts the clipboard's lower/front edge;
- the far hand and separate hanging arm are hidden;
- left/right mirroring preserves character-relative handedness.

Inspect npc-type-directions/usher-left.png, usher-right.png and the matching npc-game-scale-28x42 captures. Confirm the hand-to-board contact at native 64×96 and direct 28×42, with no visual gap, duplicate hand, detached component or silhouette accident.

## Run #602 automated evidence

- 20/20 native 64×96 captures.
- 20/20 direct 28×42 captures.
- Directional integrity 92/92; zero edge contacts; zero detached large components.
- Role-debug 12/12; prop audit and gallery pass.
- Page errors 0; script errors 0.
- Overall Actions failed on the explicitly unapproved golden snapshot baseline (1 match / 23 changed) and 180 existing audio-resource 404 console errors. No golden snapshots were changed or approved.
- Full-roster silhouette diagnostics now treat 0.85 as a human-review trigger, not an artistic failure. Run #602 reports seven full-character and three torso review pairs; inspect exact pairs only where relevant. This is separate from U4.

## Construction standard — requested assessment

Version 2.1 was retained with revisions after the Run #600 review. The current document now:
- uses one normative eight-stage production pipeline, with a separate operating loop for repository/QA/review controls;
- defines Tier A mandatory per-character evidence, Tier B diagnostic roster similarity, and Tier C suspended semantic calibration;
- defers numeric proportion bands to a historical appendix; no ratio targets or unvalidated score floors;
- defines two native-scale face-construction cues and one direct-game-scale head-read cue;
- requires exactly three must-survive items and details allowed to vanish;
- requires prop-contact, handedness and character-relative side records;
- records accepted exceptions and a package completeness manifest;
- makes 0.85 full-character/torso IoU a review trigger only, with declared mask basis and alpha threshold;
- keeps the 100-point scorecard non-gating.

Please identify any remaining contradictions, ambiguous acceptance criteria, missing production steps, or unworkable evidence requirements. Distinguish must-fix issues from optional preferences. Do not treat the deferred numeric bands or semantic annotations as approved measurement rules.

## Deliverable requested

1. U4 verdict: resolved / partly resolved / unresolved, with exact direction and scale evidence.
2. Five-character comparative verdict and ranking against Granny, noting that Cook C1 and Usher U2 are owner-declined dispositions rather than open work.
3. Construction-standard verdict: ready as a working method / ready with revisions / not ready, with exact blocking revisions if any.
4. P0–P3 findings and objective evidence versus preferences.
5. Whether any evidence gap prevents a reliable decision. Run #602 has no walk-frame sheet; mark it unavailable or not applicable by character rather than assuming it exists.
6. No owner approval should be implied. Final approval remains with the project owner.
