## Context

Greenfield build for a high school FRC team's public website. The team has no engineering staff dedicated to the site — it will be maintained by rotating students and mentors, so the technical bar for content edits must be low. The design builds on the "Pine & Circuit" brand system (see below) rather than inventing new colors. Visual direction is explicitly modeled on stuypulse.com: bold hero, card-based sections, sponsor logo grid, minimal/whitespace-friendly layout, technical-but-approachable tone.

Constraints:
- No backend budget/ability to run servers; prefer zero/near-zero recurring cost.
- Content that changes yearly (leadership, robots, sponsors) must be editable by non-technical students without touching code.
- Two feeds (TBA results, Instagram) must update themselves — the team must never have to manually re-post match results or photos.

## Brand & Color System — "Pine & Circuit"

This is the canonical source for the palette (originally lived in the repo root doc; the maintainer handoff content that doc grew into now lives in `README.md`).

| Role | Name | Hex | RGB | Use for |
|---|---|---|---|---|
| Primary | Pine | `#00482B` | rgb(0, 72, 43) | Nav, primary buttons, headlines, dark section fills |
| Shade | Deep Pine | `#002818` | rgb(0, 40, 24) | Body text on light backgrounds, hover states on Pine, footers |
| Secondary | Signal Green | `#008751` | rgb(0, 135, 81) | Links, secondary buttons, icons, focus states |
| Accent | Circuit Gold | `#F5ED3D` | rgb(245, 237, 61) | Badges, tags, single CTAs — use as a fill with dark text on it, never as text on white |
| Tint | Mint Tint | `#D9F2E8` | rgb(217, 242, 232) | Section backgrounds, card fills, table stripes |
| Ground | White | `#FFFFFF` | rgb(255, 255, 255) | Page background, text on Pine/Deep Pine |

WCAG AA-checked pairings: white-on-Pine (10.7:1), Deep-Pine-on-Gold (8.7:1), Pine-on-white (10.7:1), Signal-on-white (5.9:1). Signal Green on Mint Tint (3.9:1) is large-text/icon only — use Deep Pine for body copy on Mint. Never use Gold as text on white (1.2:1). These pairings are the hard floor for every page, including the POC (see Delivery Phasing) — placeholder content is exempt from copy accuracy, never from contrast.

```css
:root {
  --pine: #00482B;       /* primary */
  --deep-pine: #002818;  /* shade / ink */
  --signal: #008751;     /* secondary */
  --gold: #F5ED3D;       /* accent, fills only */
  --mint: #D9F2E8;       /* tint / surfaces */
  --white: #FFFFFF;      /* ground */
}
```

## Goals / Non-Goals

**Goals:**
- Modern, responsive static site matching the Pine & Circuit brand and the StuyPulse-inspired design language.
- Non-technical content editing (leadership roster, yearly robots, sponsors) via a simple web form, not raw code edits.
- Automatic, self-updating TBA match/awards data and Instagram grid — no manual re-publishing.
- Free or near-free hosting with git-based deploys.
- WCAG AA compliance, consistent with the contrast pairings documented above.

**Non-Goals:**
- User accounts, authentication, or member portals.
- Donation/payment processing for sponsors.
- Multi-language support.
- A custom backend/API service — all third-party data (TBA, Instagram, Maps) is consumed directly from the client or via existing public embeds.
- Analytics/telemetry dashboards (can be added later with a drop-in tool; out of scope here).
- **This pass (POC):** the full page set, live CMS auth, and live TBA/Instagram integration are explicitly out of scope — see Delivery Phasing.

## Delivery Phasing

The full capability set in `proposal.md` and `specs/` describes the target end state, but it is being delivered in two passes so the visual design can be reviewed before the team invests in CMS and live-integration work that would need to be redone if the design changes.

**Phase 1 — Proof of Concept (this pass):**
- Two pages only: Homepage and Our Robots. Together they cover every major layout pattern the rest of the site will reuse (hero, card gallery, tiered/logo grid, teaser sections), so a reviewer can judge the full visual language from two pages.
- All body copy is Lorem Ipsum placeholder text — no real content research/writing yet.
- No CMS: content lives in local placeholder data (e.g. static Astro content collection entries), not wired to Decap CMS or Netlify Identity.
- The Blue Alliance widget and Instagram grid are **static visual stubs** (styled placeholder blocks in their final position/size) — no live API calls.
- WCAG AA contrast still applies in full — the palette isn't optional just because the copy is.
- Deliverables beyond code: this design.md update (palette + phasing), a maintainer handoff doc (now `README.md`), and a `missing-assets.md` list of real content/images still needed from the team.

**Phase 2 — Full build (future pass, not scheduled here):**
- Remaining pages: About Us & FIRST, Team Leadership, Outreach & Impact, Sponsors, Join/Contact Us.
- Decap CMS + Netlify Identity/Git Gateway wiring for non-technical editing.
- Live TBA API integration and a real Instagram embed widget.
- Real content pass (replacing Lorem Ipsum) once assets from `missing-assets.md` are collected.
- Domain + launch.

Phase 2 will be scoped via `/opsx:continue` or a follow-up change once the Phase 1 design is reviewed and approved; the capability specs already written stay valid as the target contract for that work.

## Decisions

**1. Framework: Astro**
Astro is chosen over Next.js and plain Eleventy. It's built for content-heavy static sites, ships zero JS by default, has first-class typed Content Collections (Zod schemas) which give us a clean data model for `leadership`, `robots`, and `sponsors`, and supports small interactive "islands" (needed for the TBA widget and Instagram grid) without paying for a full SPA framework. Next.js was rejected as heavier than this project needs (no routing/auth complexity that would justify it); Eleventy was rejected because it lacks Astro's typed content collections, which we rely on to keep CMS-authored content valid.

**2. CMS: Decap CMS (formerly Netlify CMS) — Phase 2**
Free, open-source, git-based CMS that renders a form-based admin UI at `/admin` and commits edits straight to the content files Astro's collections read. No hosted CMS subscription, no separate database. Alternatives considered: Tina CMS (nicer live preview, more setup/hosting overhead for a small site), Sanity/Contentful (hosted headless CMS — adds a recurring dependency and cost the team doesn't need for ~4 content collections). Not wired up in the Phase 1 POC — see Delivery Phasing.

**3. Hosting: Netlify**
Chosen specifically because Decap CMS's simplest zero-backend auth path is Netlify Identity + Git Gateway (login with email/password, no separate OAuth app to run). Netlify also gives free git-push-to-deploy and PR preview builds. Vercel was considered but would require standing up a separate OAuth proxy for Decap login, adding infra the team would have to maintain. The POC deploys to Netlify too, just without Identity/Git Gateway enabled yet.

**4. The Blue Alliance widget: direct client-side fetch to the TBA Read API v3 — Phase 2**
A small Astro island fetches team match/event/award data straight from `https://www.thebluealliance.com/api/v3` using the team's public **read-only** API key, rendered on load (client:visible). No server proxy. TBA read keys are meant to be used from clients, are free, and rate-limited/read-only, so there's no meaningful exposure from shipping the key in client JS. A server-side proxy was considered and rejected as unneeded complexity for a static site with no backend. The Phase 1 POC renders a static styled placeholder in this widget's exact position instead.

**5. Instagram feed: third-party embed widget (e.g. SnapWidget or LightWidget), not the Instagram Graph API directly — Phase 2**
The official Graph API requires an Instagram Business/Creator account, app review, and a 60-day access token that must be refreshed by *something* running on a schedule — real ongoing engineering the team can't reliably staff. A drop-in embed widget service handles refresh and rendering for us at a small, often-free tier (typically with light widget-provider branding). This can be swapped for a direct Graph API integration later if the team gets a maintainer who can own token rotation. The Phase 1 POC renders a static styled placeholder grid instead.

**6. Google Map: plain `<iframe>` embed**, not the JS Maps API — avoids needing a billing-enabled Google Cloud project just to show a pin for the school address. Part of the Join/Contact page, which is Phase 2.

**7. Styling: Tailwind CSS wired to the `--pine / --deep-pine / --signal / --gold / --mint / --white` CSS variables defined above.** Component patterns (dark hero, card sections, logo grid, sticky nav) are adapted from stuypulse.com's structure but re-skinned in Pine & Circuit rather than copying its black/red palette.

**8. Content model: one Astro Content Collection per data-driven capability**, each with a Zod schema mirrored by a matching Decap CMS collection config so the CMS form and the build-time schema can't silently drift:
- `leadership`: person entries (name, role, type: student-leader | mentor, subteam) — rendered as a grouped chart.
- `robots`: yearly entries (year, name, photo, 3 spec bullets) — rendered newest-first.
- `sponsors`: entries (name, logo, tier, link) — rendered grouped by tier.

## Risks / Trade-offs

- [Instagram embed widget adds a third-party dependency and possible branding footer] → Mitigate: pick a widget with an acceptable free tier (e.g. SnapWidget); document the swap path to direct Graph API integration if the team later has sponsorship budget or engineering support for token refresh.
- [TBA API key is shipped in client-side JS] → Mitigate: this is the intended usage pattern for TBA read keys (public, free, rate-limited, read-only) — no sensitive data is exposed.
- [Netlify Identity + Git Gateway is a legacy Netlify feature and could be deprecated] → Mitigate: document the fallback (Decap CMS's GitHub OAuth backend via a one-file Cloudflare Worker) as a follow-up path; flagged as an open question below to confirm before build.
- [Rotating student/mentor maintainers could hand-edit content files incorrectly] → Mitigate: Zod schema validation fails the Astro build with a clear error instead of silently publishing malformed data.
- [Institutional knowledge loss as students graduate each year] → Mitigate: ship a short `MAINTAINERS.md` covering how to add a season's robot, update sponsor tiers, and rotate the TBA team/year — kept in the repo, not in someone's head.

## Migration Plan

This is a new build, not a migration of an existing site — the "rollback strategy" here is Netlify's deploy history (any bad deploy can be reverted to the previous build with no data loss, since content lives in git). Sequenced across the two phases from Delivery Phasing:

**Phase 1 (this pass):**
1. Scaffold the Astro + Tailwind project and wire the Pine & Circuit tokens as the base theme.
2. Build the minimal page shell (nav with only Home + Our Robots, footer, base layout) — trimmed `site-foundation`.
3. Build the Homepage and Our Robots page with Lorem Ipsum copy and static placeholder data (no CMS yet).
4. Add static styled placeholders for the TBA widget and Instagram grid in their final positions.
5. Deploy to Netlify (no Identity/Git Gateway yet) for review.
6. Write the maintainer handoff doc (`README.md`) and `missing-assets.md`.

**Phase 2 (future pass, after design review):**
7. Define the `leadership`, `robots`, `sponsors` content collections and matching Decap CMS config; migrate the POC's placeholder Our Robots data into the real collection.
8. Build the remaining informational pages — rest of `content-pages`, `team-directory`, `sponsors-showcase`, `contact-join`.
9. Integrate the live TBA widget and Instagram embed — `blue-alliance-widget`, `social-media-feed`.
10. Connect Netlify Identity + Git Gateway and verify a full CMS login → edit → publish loop end-to-end.
11. Content pass: team fills in real leadership, robot history, and sponsor logos via the CMS, using `missing-assets.md` as the checklist.
12. Launch: point the team's domain (or a free `*.netlify.app` subdomain) at Netlify and verify SSL.

## Open Questions

- Does the team have (or plan to buy) a custom domain, or should launch start on a free `*.netlify.app` subdomain?
- Is there an existing Instagram Business account we could connect if we later move off the third-party embed widget?
- What is the team's TBA team key (e.g. `frcXXXX`) and current competition year, to set as the widget's default scope?
- Is a finished logo file available, or does `site-foundation` need to scope a placeholder/wordmark treatment until one is delivered?
- Should we commit now to Netlify Identity + Git Gateway for CMS auth, or plan directly for Decap's GitHub OAuth backend given Identity's legacy status?
