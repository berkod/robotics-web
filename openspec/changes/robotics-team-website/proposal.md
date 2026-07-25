## Why

The team has no web presence today, which makes it harder to recruit students, communicate with the school, and present sponsors with a professional home for their support. Sponsors, judges, and prospective members expect a modern site (in the spirit of references like stuypulse.com) that shows the team's identity, current robot, results, and community impact without requiring a webmaster to hand-edit code every season.

## What Changes

- **Delivered in two passes.** Phase 1 (this pass) ships a static, placeholder-content proof-of-concept — Homepage and Our Robots only, Lorem Ipsum copy, no CMS, static stubs in place of the live TBA/Instagram widgets — so the visual design can be reviewed before further investment. Phase 2 (a later pass) completes the remaining pages and wires the live CMS and integrations once the design is approved. See `design.md`'s Delivery Phasing section for the full breakdown.
- Stand up a new static marketing site using the "Pine & Circuit" brand system (documented in `design.md`), styled as a modern, StuyPulse-inspired design (dark/bold hero, card-based sections, generous whitespace, sponsor grid, motion-light polish).
- Add a git-based CMS (e.g. Decap CMS) on top of the static site so non-technical students/mentors can edit content (leadership roster, yearly robots, sponsors, outreach copy) through a web form instead of editing code.
- Build the core page set: Homepage, About Us & FIRST, Team Leadership, Our Robots, Outreach & Impact, Sponsors, Join/Contact Us.
- Add a live The Blue Alliance widget that pulls match history and awards automatically from the TBA API (no manual updates).
- Add an auto-refreshing Instagram grid embedded on the homepage.
- Add an embedded Google Map and official contact info on the Join/Contact page.
- Set up static hosting and CI deploy (e.g. Netlify/Vercel) so content edits and code changes publish automatically.

## Capabilities

### New Capabilities
- `site-foundation`: Brand/design system (Pine & Circuit palette, typography, logo slot), responsive page shell (nav, footer), accessibility baseline, git-based CMS wiring, and static hosting/deploy pipeline that every page builds on.
- `content-pages`: Homepage, About Us & FIRST, and Outreach & Impact — the mostly-static, CMS-editable informational pages and the homepage's composition of highlights from other capabilities.
- `team-directory`: Team Leadership page — CMS-managed collection of student leaders, mentors, and sub-teams rendered as a simple org chart.
- `robots-gallery`: Our Robots page — CMS-managed yearly collection of robot name, photo, and 3 spec bullets, newest first.
- `sponsors-showcase`: Sponsors page — CMS-managed sponsor entries grouped and displayed by sponsorship tier as a logo grid.
- `contact-join`: Join/Contact Us page — school name, official team email, and an embedded Google Map.
- `blue-alliance-widget`: Live match history and awards display sourced automatically from the TBA (The Blue Alliance) public API.
- `social-media-feed`: Auto-refreshing Instagram post grid embedded on the homepage.

### Modified Capabilities
(none — this is a new site with no existing specs)

## Impact

- **New codebase**: static site project (framework chosen in `design.md`), CMS config, and CI deploy config — none of this exists yet.
- **Third-party dependencies**: TBA (The Blue Alliance) public API, Instagram/Meta embed or API, Google Maps embed, git-based CMS (e.g. Decap CMS), static host (e.g. Netlify/Vercel).
- **Content ownership**: team mentors/students become responsible for keeping CMS-managed collections (leadership, robots, sponsors) current each season (Phase 2 onward).
- **Repo docs**: the repo-root `claude.md` is repurposed from a bare color-palette reference into a maintainer handoff doc; the palette itself moves into `design.md` as the canonical source. A new `missing-assets.md` in this change tracks real content/images still needed from the team before Phase 2's content pass.
- **No existing systems affected** — greenfield build.
