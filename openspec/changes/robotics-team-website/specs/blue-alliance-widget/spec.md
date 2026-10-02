## ADDED Requirements

### Requirement: Live match history and awards
The site SHALL display the team's match history and awards by fetching data automatically from the TBA (The Blue Alliance) public API, without requiring any manual content update when new results are published.

The fetch SHALL happen at build time and the widget SHALL be delivered as static markup, so that the TBA API key is never exposed to the browser.

#### Scenario: New match result appears without a site edit
- **WHEN** TBA publishes a new match result or award for the team's event
- **THEN** the widget reflects that result on the site's next build, with no code or CMS change required
- **AND** a scheduled build keeps that refresh automatic during competition season, so no person has to trigger it

#### Scenario: Scheduled matches are not counted as results
- **WHEN** the team's season includes matches that are scheduled but not yet played
- **THEN** those matches are excluded from the displayed win-loss-tie record, rather than counted as ties

#### Scenario: Widget shows current season by default
- **WHEN** a visitor loads the page containing the Blue Alliance widget
- **THEN** the widget defaults to showing the team's current competition season's events, matches, and awards

### Requirement: Graceful handling of TBA API failure
The widget SHALL degrade gracefully if the TBA API is unreachable or returns an error, without breaking the rest of the page.

#### Scenario: TBA API is unreachable
- **WHEN** the TBA API request fails or times out
- **THEN** the widget displays a friendly fallback message (e.g. a link to the team's TBA profile) instead of a broken component or blank section, and the rest of the page renders normally

#### Scenario: TBA is unreachable during a deploy
- **WHEN** the build-time TBA request fails, times out, or returns an auth error
- **THEN** the build still succeeds and publishes, with the widget in its fallback state — a TBA outage never blocks a deploy of unrelated content

#### Scenario: No API key is configured
- **WHEN** no TBA API key is present in the environment
- **THEN** the widget renders its "not connected yet" state, and the build succeeds
