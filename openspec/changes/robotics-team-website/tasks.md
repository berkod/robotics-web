# Phase 1 — Proof of Concept

Only these tasks are in scope for `/opsx:apply` right now. Phase 2 tasks below are deferred until the Phase 1 design is reviewed — do not start them yet.

## 1. Project Setup

- [x] 1.1 Scaffold a new Astro project with TypeScript
- [x] 1.2 Add and configure Tailwind CSS
- [x] 1.3 Define the Pine & Circuit theme tokens (`--pine`, `--deep-pine`, `--signal`, `--gold`, `--mint`, `--white`) from `design.md`'s Brand & Color System section as Tailwind theme colors / CSS variables
- [x] 1.4 Set up base typography scale and global styles
- [ ] 1.5 Create the Netlify site and connect it to the git repository (no Identity/Git Gateway yet) — **needs the team's own Netlify/git account, not something an agent can create; follow `deploy.md` Part 1**
- [ ] 1.6 Verify a push to main triggers an automatic build and deploy — blocked on 1.5, covered by `deploy.md` Part 1

## 2. Minimal Site Shell

- [x] 2.1 Build the shared page layout (header/nav + content slot + footer)
- [x] 2.2 Add the logo placeholder/wordmark to the nav, linking to the homepage
- [x] 2.3 Build responsive navigation with links to Home and Our Robots only, including a mobile collapsed menu below 768px
- [x] 2.4 Build the footer with placeholder contact email and social/TBA profile link slots
- [x] 2.5 Run an accessibility check (contrast, semantic landmarks, focus states) against the WCAG AA bar — this applies in full even though content is placeholder

## 3. Placeholder Content

- [x] 3.1 Define a minimal `robots` Astro content collection (year, name, photo, 3 spec bullets) seeded with 2-3 Lorem-Ipsum-bulleted placeholder entries and placeholder photos
- [x] 3.2 Use Lorem Ipsum for all other body copy (hero tagline, section intros, etc.) across both POC pages

## 4. Homepage (POC)

- [x] 4.1 Build the hero section (team name/tagline placeholder, featured current robot from the placeholder `robots` collection)
- [x] 4.2 Build a sponsor-tier teaser section using placeholder logo blocks (grid pattern only — full Sponsors page is Phase 2)
- [x] 4.3 Add a static styled placeholder in the Blue Alliance widget's final position/size (e.g. "Live match results — coming soon")
- [x] 4.4 Add a static styled placeholder grid in the Instagram feed's final position/size (e.g. "Instagram feed — coming soon")
- [x] 4.5 Add teaser cards/links for the pages that don't exist yet (About & FIRST, Team Leadership, Outreach & Impact, Sponsors, Join/Contact), pointing at `#` or a "coming soon" state

## 5. Our Robots Page (POC)

- [x] 5.1 Build the robots gallery component, ordered newest-first by year
- [x] 5.2 Render each placeholder entry's name, photo, and exactly 3 Lorem Ipsum spec bullets
- [x] 5.3 Visually distinguish the current season's robot from past robots

## 6. Handoff Docs

- [x] 6.1 Rewrite the repo-root `claude.md` as a maintainer handoff doc: what's built so far (Phase 1 POC), where the plan lives (`openspec/changes/robotics-team-website/`), how to run the site locally, and what Phase 2 will add
- [x] 6.2 Create `missing-assets.md` in this change directory listing every piece of real content/images still needed from the team before the Phase 2 content pass (logo file, real robot photos, sponsor logos per tier, leadership headshots if used, school address for the map, TBA team key + season year, Instagram handle, official contact email, About Us / Outreach copy)

## 7. Review Checkpoint

- [ ] 7.1 Share the deployed POC (Homepage + Our Robots) with the team for design feedback before starting Phase 2 — **ready to share once hosted (1.5); until then, run `npm run dev` locally to preview**

---

# Phase 2 — Full Build (deferred, not yet scoped for apply)

Do not start these until Phase 1 is reviewed and approved. Revisit scope via `/opsx:continue` or `/opsx:update` first — the design may change based on POC feedback.

## 8. Content Collections & CMS

- [ ] 8.1 Extend/replace the placeholder `robots` collection with its full Zod schema and migrate seeded entries
- [ ] 8.2 Define the `leadership` Astro content collection with a Zod schema (name, role, category: student-leader | mentor, subteam)
- [ ] 8.3 Define the `sponsors` Astro content collection with a Zod schema (name, logo, tier, optional link)
- [ ] 8.4 Install and configure Decap CMS at `/admin`, with one collection config matching each schema above
- [ ] 8.5 Set up Netlify Identity + Git Gateway for CMS authentication — follow `deploy.md` Part 2
- [ ] 8.6 Verify the CMS admin login → edit → publish loop end-to-end

## 9. Remaining Informational Pages

- [ ] 9.1 Build the About Us & FIRST page (team mission/history + plain-language FIRST explanation)
- [ ] 9.2 Build the Outreach & Impact page (community work + school demos summary, CMS-editable copy)
- [ ] 9.3 Replace homepage teaser "coming soon" states with real links now that the pages exist

## 10. Team Leadership Page

- [ ] 10.1 Build the leadership chart component grouped by category (student leaders, mentors) and sub-team
- [ ] 10.2 Ensure empty sub-teams are omitted from rendering
- [ ] 10.3 Wire the page to the `leadership` content collection

## 11. Sponsors Page

- [ ] 11.1 Define the sponsorship tier ordering (e.g. Platinum > Gold > Silver > Bronze) used for schema validation and display order
- [ ] 11.2 Build the full tiered logo grid page, grouped and ordered by tier, higher tiers more prominent
- [ ] 11.3 Make sponsor logos with a configured link open the sponsor's site in a new tab
- [ ] 11.4 Wire the page to the `sponsors` content collection

## 12. Join / Contact Us Page

- [ ] 12.1 Build the contact page with school name and official team email as visible, clickable (`mailto:`) text
- [ ] 12.2 Embed a Google Map iframe centered on the school's address
- [ ] 12.3 Verify the map is interactive (pannable/zoomable) and responsive on mobile

## 13. The Blue Alliance Widget (live)

- [ ] 13.1 Obtain the team's TBA team key and a TBA Read API v3 key
- [ ] 13.2 Build a client-side Astro island that fetches team events, matches, and awards from the TBA API, replacing the Phase 1 static placeholder
- [ ] 13.3 Default the widget to the current competition season
- [ ] 13.4 Add a graceful fallback (friendly message + link to the team's TBA profile) when the API request fails or times out
- [ ] 13.5 Place the full widget on its own section/page and a condensed teaser version on the homepage

## 14. Social Media Feed (live)

- [ ] 14.1 Choose and set up a third-party Instagram embed widget provider (e.g. SnapWidget or LightWidget)
- [ ] 14.2 Replace the Phase 1 static placeholder with the auto-refreshing Instagram grid on the homepage
- [ ] 14.3 Add a "follow us" link from the grid to the team's Instagram profile
- [ ] 14.4 Add a graceful fallback (hidden section or static profile link) if the embed fails to load

## 15. Content Pass, Docs & Launch

- [ ] 15.1 Replace all placeholder content with real leadership, robot history, sponsor logos, and outreach copy via the CMS, using `missing-assets.md` as the checklist
- [ ] 15.2 Update `claude.md` with the finished CMS login steps, sponsor tier update process, and TBA/season rotation instructions
- [ ] 15.3 Point the team's domain (or a free `*.netlify.app` subdomain) at the Netlify site and verify SSL
- [ ] 15.4 Run a final cross-device check (mobile/tablet/desktop) and Lighthouse pass on all core pages
