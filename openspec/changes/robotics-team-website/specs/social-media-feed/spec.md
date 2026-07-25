## ADDED Requirements

### Requirement: Auto-refreshing Instagram grid on homepage
The homepage SHALL display a grid of the team's recent Instagram posts that refreshes automatically as new posts are published, without requiring a manual content update.

#### Scenario: New Instagram post appears without a site edit
- **WHEN** the team publishes a new Instagram post
- **THEN** the homepage grid reflects that post within the embed provider's normal refresh window, with no code or CMS change required

#### Scenario: Grid links to the full Instagram profile
- **WHEN** a visitor clicks a post in the grid or a "follow us" link near it
- **THEN** they are taken to the team's Instagram profile in a new tab

### Requirement: Graceful handling of feed failure
The Instagram grid SHALL degrade gracefully if the embed provider is unreachable, without breaking the rest of the homepage.

#### Scenario: Instagram embed fails to load
- **WHEN** the Instagram embed widget fails to load
- **THEN** the homepage still renders normally with the grid section either hidden or replaced by a static link to the team's Instagram profile
