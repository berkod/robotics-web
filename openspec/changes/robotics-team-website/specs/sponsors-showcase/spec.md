## ADDED Requirements

### Requirement: Sponsors content collection
The site SHALL maintain a CMS-editable collection of sponsors, where each entry has a name, logo image, sponsorship tier, and optional link, validated against a schema at build time.

#### Scenario: Editor adds a sponsor
- **WHEN** an authorized editor adds a sponsor via the CMS with a name, logo, and tier
- **THEN** the build validates the entry against the sponsors schema and fails with a clear error if the tier is not one of the site's defined tier values

### Requirement: Sponsors page tiered grid
The site SHALL render the sponsors collection as a logo grid grouped by sponsorship tier, with higher tiers displayed more prominently (e.g. larger logos, listed first).

#### Scenario: Visitor views sponsors by tier
- **WHEN** a visitor loads the Sponsors page
- **THEN** sponsor logos are grouped under clearly labeled tier headings, ordered from highest to lowest tier

#### Scenario: Sponsor logo links out
- **WHEN** a visitor clicks a sponsor logo that has a link configured
- **THEN** they are taken to that sponsor's external site in a new tab
