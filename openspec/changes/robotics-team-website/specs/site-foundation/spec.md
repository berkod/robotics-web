## ADDED Requirements

### Requirement: Brand design system
The site SHALL apply the "Pine & Circuit" color palette and tokens defined in `CLAUDE.md` (Pine, Deep Pine, Signal Green, Circuit Gold, Mint Tint, White) consistently across all pages, including the WCAG-AA-checked pairings documented there (e.g. white text on Pine, Deep Pine text on Gold, Deep Pine body text on Mint Tint).

#### Scenario: Palette applied via shared tokens
- **WHEN** any page renders a themed element (nav, buttons, section fills, badges)
- **THEN** the element's colors resolve to the shared `--pine`, `--deep-pine`, `--signal`, `--gold`, `--mint`, or `--white` tokens rather than one-off hex values

#### Scenario: Gold never used as text on white
- **WHEN** a page renders text content
- **THEN** Circuit Gold (`#F5ED3D`) is never used as a text color directly on a white background

### Requirement: Logo placement
The site SHALL display the team logo in the primary navigation on every page and SHALL support a placeholder/wordmark treatment if a final logo file has not yet been delivered.

#### Scenario: Logo visible in navigation
- **WHEN** a visitor loads any page
- **THEN** the team logo (or placeholder wordmark) is visible in the top navigation and links back to the homepage

### Requirement: Responsive page shell
The site SHALL provide a shared navigation and footer shell used by every page, and SHALL remain usable on mobile, tablet, and desktop viewport widths.

#### Scenario: Navigation exposes all core pages
- **WHEN** a visitor opens the site navigation
- **THEN** links to Home, About Us & FIRST, Team Leadership, Our Robots, Outreach & Impact, Sponsors, and Join/Contact Us are all reachable within two clicks

#### Scenario: Mobile navigation collapses
- **WHEN** a visitor loads any page on a viewport narrower than 768px
- **THEN** the navigation collapses into a mobile-friendly menu (e.g. hamburger) without overlapping page content

#### Scenario: Footer present on every page
- **WHEN** a visitor scrolls to the bottom of any page
- **THEN** a shared footer is present with at least the team's official contact email and links to social/TBA profiles

### Requirement: Non-technical content editing
The site SHALL provide a git-based CMS admin interface that lets a non-technical student or mentor edit content collections (leadership, robots, sponsors) through a web form, without editing code or markdown by hand.

#### Scenario: Authorized editor reaches the CMS
- **WHEN** an authorized team member navigates to the CMS admin route and logs in
- **THEN** they see a form-based editor for each content collection (leadership, robots, sponsors) instead of raw file contents

#### Scenario: CMS edit publishes without a developer
- **WHEN** an authorized editor saves a change in the CMS
- **THEN** the change is committed to the site's git repository and triggers a new deploy without any manual code edit or pull request review required

### Requirement: Automated static hosting and deploy
The site SHALL be built as a static site and SHALL redeploy automatically whenever content or code changes are pushed to the main branch.

#### Scenario: Push triggers a deploy
- **WHEN** a commit lands on the site's main branch (via CMS save or a code change)
- **THEN** a new production build is triggered and published automatically, without a manual deploy step

### Requirement: Baseline accessibility
The site SHALL meet WCAG AA contrast requirements for all text and interactive elements, consistent with the pairings documented in `CLAUDE.md`.

#### Scenario: Body text meets contrast minimums
- **WHEN** body copy is rendered on a Pine, Mint Tint, or White background
- **THEN** the text/background contrast ratio meets or exceeds WCAG AA (4.5:1 for normal text, 3:1 for large text/icons)
