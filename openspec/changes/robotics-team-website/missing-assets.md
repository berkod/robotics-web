# Missing Assets

Tracks what's still placeholder vs. real. Checked items are confirmed and
live in the code (see the note on each); unchecked items still need to come
from the team before the content pass (`tasks.md` section 15.1) is complete.

## Identity

- [x] Official team name — **Bionic Buzzers**,
      team #10262 (`src/lib/site.ts`)
- [ ] Final logo file (vector, e.g. SVG/AI) — currently a generated gear-emoji
      wordmark placeholder in `src/components/Logo.astro`
- [ ] Confirmed brand tagline/mission statement for the homepage hero
      (currently Lorem Ipsum)

## Robots

- [ ] Real name for each season's robot (currently "Robot 2025/2026
      (placeholder name)" in `src/content/robots/*.md`)
- [ ] Real photo for each season's robot (currently
      `public/images/placeholder-robot.svg` for both)
- [ ] Three real spec bullets per robot (currently Lorem Ipsum sentences)
- [ ] Confirm whether older seasons beyond 2025–2026 should be included

## Team Leadership

- [x] Student leadership roles and sub-teams — confirmed by the team:
      2 co-presidents, 1 mechanical head, 1 electrical head, 2 programming
      heads, 2 outreach leads, 2 social media heads, 1 business head
- [ ] The name of the student filling each of those 11 roles (entries in
      `src/content/leadership/` still carry placeholder names)
- [x] Mentor count — confirmed by the team: 2 mentors
- [ ] Mentor names, and confirmation of each mentor's role and sub-team
      (currently 2 placeholder entries: Lead Mentor / Mechanical and
      Programming Mentor / Programming)
- [ ] Headshots, if the team wants photos on the leadership chart (optional —
      not in any spec requirement, confirm if wanted)

## Sponsors

- [ ] Current sponsor list — currently 8 placeholder entries in
      `src/content/sponsors/`. The team does not use sponsorship tiers, so
      every sponsor renders at the same size.
- [ ] Sponsor logo files (vector or high-res raster) for each sponsor
- [ ] Sponsor website links, where applicable

## Outreach & Impact / About Us & FIRST

- [ ] Summary copy for the team's community work and school demos
      (`src/content/pages/outreach.md`)
- [ ] Team mission/history copy for the About Us page
      (`src/content/pages/about.md`)
- [ ] Any outreach photos the team wants to feature

## Contact & Location

- [x] High school's official name — **Hastings High School**
      (`src/lib/site.ts`)
- [x] School's street address, for the embedded Google Map — **One Mount
      Hope Blvd. Hastings-on-Hudson, NY 10706** (`src/lib/site.ts`)
- [x] Official team contact email (currently `hastingsrobotics2025@gmail.com` placeholder
      in `src/lib/site.ts`)

## Integrations

- [x] Team's TBA (The Blue Alliance) team key — **frc10262**
      (`src/lib/site.ts`, and set as the `PUBLIC_TBA_TEAM_KEY` default in
      `.env.example`)
- [ ] TBA Read API key — generate one from the team's TBA account dashboard,
      set as `PUBLIC_TBA_AUTH_KEY` in Netlify env vars (never commit it)
- [ ] Current competition season/year — set as `PUBLIC_TBA_YEAR`
- [x] Team's Instagram handle — **@bionic_buzzers** (`src/lib/site.ts`)
- [ ] Instagram embed provider account (e.g. SnapWidget or LightWidget — see
      `design.md` Decision 5) and the resulting embed URL, set as
      `PUBLIC_INSTAGRAM_EMBED_URL`. Signing up for this account is a team
      action — an agent can't create third-party accounts on the team's
      behalf.

## Hosting & Launch

- [ ] Does the team have or want to buy a custom domain, or launch on a free
      `*.netlify.app` subdomain? (see `design.md` Open Questions)
- [ ] Netlify account to connect for hosting + Identity/Git Gateway
      (`deploy.md` Parts 1 and 2)
