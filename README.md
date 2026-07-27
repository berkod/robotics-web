# Team Website — Maintainer Handoff

This repo is the team's public website: an [Astro](https://astro.build) static
site styled with Tailwind CSS in the "Pine & Circuit" brand.

**Status: Phase 2 build, content pass in progress.** All 7 pages exist and
Decap CMS is wired up at `/admin`. Some real content has landed (school name,
address, TBA team number, Instagram handle — see below); the rest is still
Lorem Ipsum or placeholder data. See
`openspec/changes/robotics-team-website/missing-assets.md` for exactly what's
still outstanding, and `tasks.md` for the full checklist.

## What's real vs. placeholder right now

Real:
- Team name: Hastings-on-Hudson Bionic Buzzers Robotics, team #10262
  (`src/lib/site.ts`)
- School: Hastings High School, address in `src/lib/site.ts`
- TBA team: `frc10262` (link in `src/lib/site.ts`)
- Instagram: `@bionic_buzzers` (link in `src/lib/site.ts`)

Still placeholder (see `missing-assets.md` for the full list):
- Logo file (currently a generated gear-emoji wordmark)
- Official contact email (`team@example.org` in `src/lib/site.ts`)
- Robot names/photos/specs, leadership roster, sponsor list — all seeded with
  Lorem Ipsum entries in `src/content/`
- Live data: the Blue Alliance widget and Instagram grid both render their
  graceful "not connected yet" fallback until the env vars below are set

## Where the plan lives

The full plan — why this site exists, the technical decisions behind it, the
complete spec for every page, and the task breakdown — lives in
`openspec/changes/robotics-team-website/`:

- `proposal.md` — why, and what's changing
- `design.md` — how, including the **Brand & Color System** section (the
  canonical Pine & Circuit palette reference) and the **Delivery Phasing**
  section explaining the Phase 1 / Phase 2 split
- `specs/` — the target behavior for every capability
- `tasks.md` — the full task checklist
- `missing-assets.md` — every piece of real content/images still needed

## Running it locally

```sh
nvm use          # pins Node from .nvmrc
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

`AGENTS.md` has additional notes for AI coding agents working in this repo
(e.g. running the dev server in the background).

To edit content locally without the CMS, edit the markdown files under
`src/content/` directly (`robots/`, `leadership/`, `sponsors/`, `pages/`) —
the CMS is just a friendlier form-based editor over the same files.

## Deploying

See [`deploy.md`](./deploy.md) for hosting on Netlify from GitHub — Part 1
(static hosting) and Part 2 (Netlify Identity + Git Gateway, so `/admin`
actually works for editors).

### Environment variables for live data

Unset by default, so the site works correctly with no configuration (both
widgets show their fallback state). Set these in Netlify once available —
see `deploy.md`'s Environment variables section for details:

- `PUBLIC_TBA_AUTH_KEY`, `PUBLIC_TBA_TEAM_KEY`, `PUBLIC_TBA_YEAR` — Blue
  Alliance widget
- `PUBLIC_INSTAGRAM_EMBED_URL` — Instagram feed (needs a SnapWidget/LightWidget
  account first, see `design.md` Decision 5 — that's a team action, not
  something committed to the repo)

## Project layout

```
src/
  components/   Nav, Footer, Logo, BlueAllianceWidget, InstagramFeed, page-teaser cards
  layouts/      Layout.astro — shared page shell (nav + slot + footer)
  lib/          site.ts (contact/school/social constants), sponsorTiers.ts
  content/      Content collections: robots, leadership, sponsors, pages (About/Outreach body copy)
  content.config.ts   Content collection schemas (Zod)
  pages/        index, about, leadership, robots, outreach, sponsors, contact
  styles/       global.css — Pine & Circuit CSS variables + Tailwind theme + typography plugin
public/
  admin/        Decap CMS (index.html + config.yml)
  images/       Static assets, including placeholder photos/logos
```

## Editing content via the CMS

Once Netlify Identity + Git Gateway are enabled (`deploy.md` Part 2) and
you're invited as an editor, log into `/admin` to edit Our Robots, Team
Leadership, Sponsors, and the About/Outreach page copy through a form —
no code required. Each save commits directly to this repo and triggers a
redeploy.

To add next season's robot, update sponsor tiers, or rotate the TBA
year: do it through `/admin`, or edit the corresponding file under
`src/content/` directly and commit — both end up in the same place.

## Ownership

This team is maintained by a rotating group of students and mentors — assume
whoever reads this next wasn't around when it was written. When you learn a
new piece of real info (school email, robot name, sponsor logo, etc.), put it
in the actual content/constant, not just in your head — and cross it off
`missing-assets.md`.
