# Deploying to Netlify

This happens in two parts, matching the Phase 1 / Phase 2 split in
`openspec/changes/robotics-team-website/design.md`:

- **Part 1:** get the site live on a public URL. Plain static hosting, no
  login required to view it.
- **Part 2:** add Netlify Identity + Git Gateway so non-technical editors can
  log into `/admin` and use the Decap CMS that's already built into the
  codebase.

You can do Part 1 on its own first (e.g. for the Phase 1 design review) and
come back for Part 2 later — nothing breaks by deferring it.

## Prerequisites

- A GitHub account, with this repo pushed to a GitHub repository (see below
  if that hasn't happened yet)
- A Netlify account — free tier is enough. Sign up at
  [app.netlify.com](https://app.netlify.com), ideally with "Sign up with
  GitHub" so the two are already linked

## Pushing this repo to GitHub (if not already done)

1. Create a new **empty** repository on GitHub (github.com/new) — don't
   initialize it with a README, .gitignore, or license, since this repo
   already has those.
2. From this project's root:

   ```sh
   git init
   git add .
   git commit -m "Initial commit: Phase 1 POC"
   git branch -M main
   git remote add origin https://github.com/<org-or-user>/<repo-name>.git
   git push -u origin main
   ```

## Part 1: Deploy the POC

1. Log into Netlify → **Add new site** → **Import an existing project**.
2. Choose **GitHub**, authorize Netlify if prompted, and select this
   repository.
3. Netlify should auto-detect the build settings from this repo's
   `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`

   If it shows blank fields instead of picking these up, enter them
   manually.
4. Click **Deploy site**. Netlify installs dependencies, runs the build, and
   publishes to a random `*.netlify.app` subdomain (e.g.
   `random-name-123456.netlify.app`). This usually takes under a minute.
5. Open the resulting URL and confirm both the homepage and Our Robots page
   load correctly.
6. *(Optional)* Rename the subdomain to something memorable: **Site
   configuration → Domain management → Options → Edit site name** — e.g.
   `teamname-robotics.netlify.app`.
7. Share the URL with the team for design review
   (`tasks.md` task 7.1).

From this point on, every push to `main` automatically triggers a new
deploy. Pull requests also get their own preview-deploy URL, which is useful
for reviewing a change before merging it.

## Custom domain (optional, anytime)

Once the team has a domain to point at the site:

1. **Site configuration → Domain management → Add a domain**.
2. Follow Netlify's instructions — either point the domain's nameservers at
   Netlify, or add the CNAME/A records it gives you at your registrar.
3. Netlify auto-provisions a free SSL certificate once DNS propagates (can
   take a few minutes to a few hours).

## Part 2: CMS auth

The codebase already has Decap CMS wired up at `/admin` (`public/admin/index.html`
+ `config.yml`), configured for **invite-only** registration.

**Free-tier note:** Netlify's Identity email templates (including where the
invite/recovery link points) are a Pro-plan feature — on the free tier there's
no way to make invite emails link straight to `/admin/`, they always link to
the site root (`{{ siteURL }}/#invite_token=...`). To work around that, the
Netlify Identity widget is loaded **site-wide** (`src/layouts/Layout.astro`),
not just on the admin page — this is Decap's own documented fallback for this
exact situation ([Decap's Netlify Identity guide](https://decapcms.org/docs/choosing-a-backend/),
"site-wide registration"). When someone clicks their invite link, the widget
on the homepage catches the token in the URL, pops the "set your password"
modal right there, and redirects to `/admin/` once they're logged in. If the
team ever upgrades to Pro, switch the email templates to link straight to
`/admin/#...` and the site-wide widget can be removed (revert to only
loading it in `public/admin/index.html`).

1. **Site configuration → Identity → Enable Identity**.
2. **Identity → Registration** → set to **Invite only**.
3. **Identity → Services → enable Git Gateway** — this lets Identity-
   authenticated users commit content changes through Netlify without each
   person needing their own GitHub account or token.
4. **Identity → Invite users** → send an invite to each mentor/student who
   should be able to edit content. They'll get an email linking to the site
   root — that's expected, the widget handles it (see above).
5. Invited users click the link, set a password in the modal that pops up,
   and land on `/admin` automatically. After that, they can always go
   straight to `https://<your-site>/admin` to log in and edit Our Robots,
   Team Leadership, Sponsors, and the About/Outreach page copy.

## Rolling back a bad deploy

Every deploy is kept in Netlify's **Deploys** tab. If one breaks the site,
open the last good deploy and click **Publish deploy** to roll back
instantly — no code changes or git history rewrite required.

## Environment variables

The Blue Alliance widget and Instagram feed both degrade gracefully to a
"not connected yet" state until these are set. Add them in **Site
configuration → Environment variables**, then trigger a new deploy (env
vars only take effect on the next build) — never commit them to the repo.
See `missing-assets.md` for where to get each value.

| Variable | Purpose |
|---|---|
| `PUBLIC_TBA_AUTH_KEY` | TBA Read API key, from your TBA account's dashboard |
| `PUBLIC_TBA_TEAM_KEY` | The team's TBA key, e.g. `frc10262` |
| `PUBLIC_TBA_YEAR` | Competition season year to show, e.g. `2026` |
| `PUBLIC_INSTAGRAM_EMBED_URL` | Embed URL from a widget provider (e.g. SnapWidget) — see `design.md` Decision 5 |

All of these are prefixed `PUBLIC_` because Astro only exposes `PUBLIC_`-prefixed
env vars to client-side code — that's intentional here, not an oversight:
the TBA read key and Instagram embed URL are meant to be public (see
`design.md`'s Risks section for why that's fine for the TBA key).
