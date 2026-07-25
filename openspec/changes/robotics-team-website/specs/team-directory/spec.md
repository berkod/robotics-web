## ADDED Requirements

### Requirement: Leadership content collection
The site SHALL maintain a CMS-editable collection of people, where each entry has a name, role, category (student leader, mentor), and sub-team, and SHALL validate entries against a schema at build time.

#### Scenario: Editor adds a leadership entry
- **WHEN** an authorized editor adds a person via the CMS with a name, role, category, and sub-team
- **THEN** the build validates the entry against the leadership schema and fails with a clear error if a required field is missing

### Requirement: Team Leadership page
The site SHALL render the leadership collection as a simple chart grouped by category (student leaders, mentors) and sub-team.

#### Scenario: Visitor views leadership grouped by role
- **WHEN** a visitor loads the Team Leadership page
- **THEN** student leaders and mentors are shown in visually distinct groups, each further organized by sub-team

#### Scenario: Empty sub-team is omitted
- **WHEN** a sub-team currently has no listed members
- **THEN** that sub-team group is not rendered as an empty section
