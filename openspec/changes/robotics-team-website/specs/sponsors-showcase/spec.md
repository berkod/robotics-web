## ADDED Requirements

### Requirement: Sponsors content collection
The site SHALL maintain a CMS-editable collection of sponsors, where each entry has a name, logo image, and optional link, validated against a schema at build time. The team does not run sponsorship tiers, so entries carry no tier field.

#### Scenario: Editor adds a sponsor
- **WHEN** an authorized editor adds a sponsor via the CMS with a name and logo
- **THEN** the build validates the entry against the sponsors schema and fails with a clear error if a required field is missing

### Requirement: Sponsors page logo grid
The site SHALL render the sponsors collection as a single logo grid in which every sponsor is displayed at the same prominence, ordered by sponsor name.

#### Scenario: Visitor views sponsors
- **WHEN** a visitor loads the Sponsors page
- **THEN** all sponsor logos appear in one grid at a uniform size, with no tier headings

#### Scenario: Sponsor logo links out
- **WHEN** a visitor clicks a sponsor logo that has a link configured
- **THEN** they are taken to that sponsor's external site in a new tab
