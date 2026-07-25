# Team Website — Maintainer Handoff

This repo is the team's public website: an [Astro](https://astro.build) static
site styled with Tailwind CSS in the "Pine & Circuit" brand.

**Status: Phase 1 proof-of-concept.** Two pages exist (Homepage, Our Robots),
built with Lorem Ipsum placeholder copy and static stand-ins for the live
widgets, so the visual design can be reviewed before the team invests in a
CMS and live integrations. Nothing here is final content — see
`openspec/changes/robotics-team-website/missing-assets.md` for exactly what's
still needed from the team before this becomes the real site.

## Where the plan lives

The full plan — why this site exists, the technical decisions behind it, the
complete spec for every page, and the task breakdown — lives in
`openspec/changes/robotics-team-website/`:

- `proposal.md` — why, and what's changing
- `design.md` — how, including the **Brand & Color System** section (the
  canonical Pine & Circuit palette reference — colors moved here from this
  file) and the **Delivery Phasing** section explaining the Phase 1 / Phase 2
  split
- `specs/` — the target behavior for every capability (site foundation,
  content pages, team directory, robots gallery, sponsors, contact, the Blue
  Alliance widget, the Instagram feed), including what's not built yet
- `tasks.md` — the full task checklist, split into Phase 1 (done) and Phase 2
  (deferred until the POC is reviewed)
- `missing-assets.md` — every piece of real content/images the team needs to
  gather before Phase 2's content pass

If you're planning the next round of work, start with `design.md`'s Delivery
Phasing section, not this file.

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

## Deploying

See [`deploy.md`](./deploy.md) for how to get this hosted on Netlify from
GitHub — it's split into Part 1 (static POC hosting, do now) and Part 2
(Netlify Identity + Git Gateway for the CMS, Phase 2 only).

## Project layout

```
src/
  components/   Nav, Footer, Logo, and small reusable UI pieces
  layouts/      Layout.astro — shared page shell (nav + slot + footer)
  content/      Content collections (currently just `robots`)
  content.config.ts   Content collection schemas (Zod)
  pages/        Route files — index.astro (Home), robots.astro (Our Robots)
  styles/       global.css — Pine & Circuit CSS variables + Tailwind theme
public/
  images/       Static assets, including the placeholder robot photo
```

## What Phase 2 adds

Not built yet — see `tasks.md` sections 8–15 for the full breakdown:

- Remaining pages: About Us & FIRST, Team Leadership, Outreach & Impact,
  Sponsors, Join/Contact Us
- Decap CMS at `/admin` (with Netlify Identity + Git Gateway) so non-technical
  students/mentors can edit content without touching code
- Live match/awards data from The Blue Alliance API, replacing today's
  static placeholder block
- A real Instagram embed, replacing today's static placeholder grid
- Real content everywhere, replacing today's Lorem Ipsum
- A production domain and launch checklist

## Ownership

This team is maintained by a rotating group of students and mentors — assume
whoever reads this next wasn't around when it was written. When you finish a
piece of Phase 2 work, update this file's "What Phase 2 adds" list and the
corresponding checkboxes in `tasks.md` so the next maintainer has an accurate
picture of what's real and what's still a placeholder.
