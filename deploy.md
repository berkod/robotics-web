# Deploying to Netlify

This happens in two parts, matching the Phase 1 / Phase 2 split in
`openspec/changes/robotics-team-website/design.md`:

- **Part 1 (do this now):** get the Phase 1 POC live on a public URL for
  design review. Plain static hosting, no login, no CMS.
- **Part 2 (do this later, after the POC is reviewed and Decap CMS is
  installed — `tasks.md` section 8):** add Netlify Identity + Git Gateway so
  non-technical editors can log into `/admin`.

Don't do Part 2 yet — there's nothing for it to authenticate into until the
CMS exists.

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

## Part 2: CMS auth (Phase 2 — do this later)

Only relevant once Decap CMS is installed in the codebase. Not needed for
the POC.

1. **Site configuration → Identity → Enable Identity**.
2. **Identity → Registration** → set to **Invite only**, so random visitors
   can't create accounts.
3. **Identity → Services → enable Git Gateway** — this lets Identity-
   authenticated users commit content changes through Netlify without each
   person needing their own GitHub account or token.
4. **Identity → Invite users** → send an invite to each mentor/student who
   should be able to edit content.
5. Once Decap CMS's `/admin` route exists, invited users log in at
   `https://<your-site>/admin` with the email/password from their invite.

## Rolling back a bad deploy

Every deploy is kept in Netlify's **Deploys** tab. If one breaks the site,
open the last good deploy and click **Publish deploy** to roll back
instantly — no code changes or git history rewrite required.

## Environment variables

None needed yet. The POC makes no external API calls and has no secrets.
When Phase 2 adds the Blue Alliance widget, the team's TBA API key goes in
**Site configuration → Environment variables** — never commit it to the
repo.
