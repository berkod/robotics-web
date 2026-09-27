# TBA fixtures

Sample payloads for `TBA_FIXTURES=1`, which lets the Blue Alliance widget
render its populated state without a TBA Read API key. See
`src/lib/blue-alliance.ts`.

## These are constructed, not recorded

**No part of this data came off the real API.** A TBA Read API key was not
available when the widget was built, and every TBA v3 endpoint — including
`/status` — returns `401` without one, so there was no way to capture real
responses. These files were hand-built to match the documented v3 response
schemas instead.

What *is* real, taken from the team's public TBA page:

- the team key `frc10262` (Bionic Buzzers, rookie year 2025)
- the 2026 event keys and names — `2026nysu` Hudson Valley Regional,
  `2026nyn2` Gotham Regional, `2026bc` BattleCry at WPI

Everything else — match scores, alliance partners, opponents, the awards, and
all dates — is invented. The 7-4-1 record and the two awards are **not** the
team's real results. Do not quote these numbers anywhere.

When a real key is added, the first live fetch may reveal a field that was
guessed wrong here. `getTeamSeason()` catches any such failure and falls back
to the "temporarily unavailable" state rather than breaking the build, so the
symptom would be a fallback box, not a failed deploy.

## What the match fixture deliberately covers

`tba-matches.json` is 14 matches chosen to exercise `computeRecord()`:

- **12 played, 2 unplayed.** The unplayed ones carry `score: -1` and
  `winning_alliance: ""`. TBA uses that same empty string for a real tie, so
  anything that doesn't gate on the score counts future matches as ties.
  Correct record is **7-4-1**, not 7-4-3.
- **The team sits on red in some matches and blue in others**, so a
  win/loss attribution that only checks one alliance colour shows up as wrong.
- **One genuine tie** (equal scores, empty `winning_alliance`).
