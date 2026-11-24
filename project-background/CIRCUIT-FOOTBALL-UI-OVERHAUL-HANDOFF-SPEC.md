# Circuit Football — UI Overhaul Handoff Spec

**Permanent design authority:** owner-supplied 14-page Gemini handoff. This repository mirror preserves the complete written requirements. The original DOCX contains the embedded visual mockups and should remain attached in the ChatGPT Project files for image-level reference.

## Global Design System & Tokens (page 1)

- **Surface & Chrome:** unified matte dark charcoal-navy `#131620` for all cards, modals and HUD bars; `#1C2130` for inner/inactive pills; 1–2px solid borders; 12–16px radius; no heavy outer neon bloom on in-match HUDs.
- **Gold `#F5B841`:** active tabs, selected cards, UPG 15 / PTS badges and secondary action borders (CHANGE PLAY, SHOW PLAY, FLIP, HURDLE).
- **Cyan `#4DE1F2`:** primary execute CTAs (CALL PLAY, HIKE!), active toggles, stamina/loading bars and secondary card borders.
- **Green `#34D399`:** OPEN receiver highlight and PREVENT defense border.
- **Crimson `#EF4444`:** BLITZ defense border, Fumble DEFENSE fill and RESET PROGRESS danger zone.
- **Town Accent:** reserved for the Overworld A-button ring and town pill.
- **Safe areas:** top headers/corner controls must clear `env(safe-area-inset-top)` / Dynamic Island.

## 1. Overworld HUD (Portrait) (pages 2)

- Wrap top-left TOWN NAME · CLEARED · UPG 15 and top-right MENU in translucent `#131620` pills (`rgba(19,22,32,.85))) so text does not collide with signs/NPCs.
- Pin compact GOAL: <current town objective> directly beneath town pill.
- Dynamically update a small sub-label inside the A button (TALK, ENTER, FISH, PLAY) when an interactable is in range.

## 2. Overworld Menu (MENU, SETTINGS, CREDITS) (Portrait) (pages 3–4)

- **Shell:** fixed header (X, CIRCUIT FOOTBALL + town pill, UPG 15 badge), CURRENT GOAL card, 3-tab bar (MENU | SETTINGS | CREDITS), sticky bottom BACK TO TOWN.
- **Menu:** GOALS & STATS and DATA & SUPPORT group (SAVE CODE (BACKUP), SEND FEEDBACK, progress-saved status).
- **Settings:** single-column rows grouped into AUDIO (MUSIC, EFFECTS, VOLUME slider), GAMEPLAY & DISPLAY (HAPTICS, RUNNER CAMERA, LITE EFFECTS, RESOLUTION LOW / MED / HIGH), DANGER ZONE (RESET PROGRESS behind confirmation modal).
- **Credits:** grouped into 3D ART & UI, MUSIC & SFX, TOWN AMBIENCE. Build v3.40T · 22 Models · 45 Sounds footer is a 5-tap trigger for hidden Dev/Test Drawer containing all (TEST) and PERF toggles.

## 3. MY TEAM & MY SQUAD (Portrait) (pages 5–6; Stage Two)

- **MY TEAM:** pin 2.5D front/back preview at top; IDENTITY | UNIFORM | TRAILS controls; TEAM NAME and TEAM LOGO (PICK LOGO) side-by-side; town unlock hints under locked Run Trail chips; pin SAVE & EQUIP at bottom.
- **MY SQUAD:** separate CAP 95 and 15 PTS badges in top-right; attribute upgrade buttons formatted +2 · 3P; merge APPEARANCE and GEAR into STYLE & GEAR tab (ATTRIBUTES | STYLE & GEAR | CAREER); pin horizontal starter roster strip at bottom.
- This screen group is Stage Two and must not begin until owner approves all of Stage One.

## 4. GOALS & STATS (Portrait) (pages 6–7)

- Fixed header (X, GOALS & STATS, 0/13 trophy badge), three tabs (CHALLENGES | ACHIEVEMENTS | TEAM STATS), sticky bottom CLOSE.
- CHALLENGES: crew challenge cards with color-coded trail reward pills.
- ACHIEVEMENTS: medal icons, right-aligned counters (0 / 1, 0 / 25), progress bars.
- TEAM STATS: 2-column PASSING & RUSHING, full-width RECEIVING, 3-column SKILL MOVES (ANKLES, TRUCKS, SPINS), footer note pointing to MY SQUAD > CAREER.

## 5. Pre-Game Matchup & Playbook (Landscape) (pages 8–9)

- **Pre-Game Matchup:** blurred atmospheric town/team backdrops (warm floodlit turf left, town-specific right) behind solid `#131620` team badge cards; OVR pills below; HALE HARBOR / CREW GAME top pills; FIRST TO 14 WINS above loading bar.
- **Playbook:** replace overlapping left-rail text with single-line category pills (★ FAV, ALL (19), RUN (7), PASS (8), TRICK (4)); gold border on active play card + FLIP; cyan `#4DE1F2` CALL PLAY.
- Page 9 mockup shows the landscape in-match play sheet over the field: scoreboard remains legible above it; compact vertical category rail at left; play cards with readable route diagrams; selected play framed in gold; FLIP as a secondary gold control; CALL PLAY as the cyan execution CTA.

## 6. Pre-Snap, In-Match HUD & Fumble (Landscape) (pages 10–11)

- **Unified Scoreboard:** one `#131620` matte top bar across match states (1st & 10 · OWN 25, team logos + scores, slim STAR PLAY progress bar tucked underneath, PLAY CLOCK, FIRST TO X, circular Pause (||) replacing EXIT).
- **Pre-Snap:** `#131620` + gold-bordered CHANGE PLAY / SHOW PLAY bottom-left; cyan HIKE! bottom-right.
- **Live Play:** highlight only open receiver(s) with bright green ring + one OPEN pill below; covered receivers are muted dark-translucent circles with no pill. TURBO uses segmented radial stamina ring; HURDLE / DIVE use matte `#131620` + gold border.
- **Fumble:** center RUNNER vs DEFENSE bar at ~65% width in upper-center with 1.8s pill below; keep bottom-right A mash button clear.

## 7. Defense Selection, Defense Sim, Achievement Toast & Post-Game (Landscape/Portrait) (pages 12–14)

- **Defense Selection:** modal strictly below scoreboard (top offset >= scoreboard height + 8px), never clip OPP 38 / PLAY CLOCK. Show STOP, BIG PLAY, TAKEAWAY as three aligned stat rows inside BLITZ (red), BALANCED (slate), PREVENT (green).
- **Defense Sim:** dock THEIR DRIVE · BALANCED · ... below scoreboard with 8–12px clearance; hide MOVE/TURBO/HURDLE offense controls; play-by-play card bottom-center; TAP TO SKIP >> bottom-right.
- **Achievement Toast:** non-blocking bottom-center banner so TOUCHDOWN! and HIGHLIGHT REEL! remain unobstructed.
- **Post-Game Results:** portrait `#131620` layout with win/loss banner + mode pill, team score card with logos, celebrating 2.5D squad card, STYLE POINTS / rewards card, side-by-side REMATCH (gold) and MENU (dark cyan) buttons.

## Stage One boundary

Stage One includes sections 1, 2, 4, 5, 6 and 7 and their specified screen states. Section 3 (MY TEAM & MY SQUAD) is Stage Two and remains held until explicit owner approval. Visual mockups in the original DOCX are the comparison target; this Markdown mirror is the searchable written specification.
