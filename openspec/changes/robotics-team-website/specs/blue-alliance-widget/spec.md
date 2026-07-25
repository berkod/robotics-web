## ADDED Requirements

### Requirement: Live match history and awards
The site SHALL display the team's match history and awards by fetching data automatically from the TBA (The Blue Alliance) public API, without requiring any manual content update when new results are published.

#### Scenario: New match result appears without a site edit
- **WHEN** TBA publishes a new match result or award for the team's event
- **THEN** the widget reflects that result on its next page load, with no code or CMS change required

#### Scenario: Widget shows current season by default
- **WHEN** a visitor loads the page containing the Blue Alliance widget
- **THEN** the widget defaults to showing the team's current competition season's events, matches, and awards

### Requirement: Graceful handling of TBA API failure
The widget SHALL degrade gracefully if the TBA API is unreachable or returns an error, without breaking the rest of the page.

#### Scenario: TBA API is unreachable
- **WHEN** the TBA API request fails or times out
- **THEN** the widget displays a friendly fallback message (e.g. a link to the team's TBA profile) instead of a broken component or blank section, and the rest of the page renders normally
