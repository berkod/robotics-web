## ADDED Requirements

### Requirement: Leadership content collections
The site SHALL maintain two separate CMS-editable collections of people — student leaders and mentors — where each entry has a name, role, and sub-team, and SHALL validate entries against a schema at build time. Each collection SHALL have its own edit interface in the CMS, so an editor picks the group before adding a person rather than setting a category field on a combined list.

#### Scenario: Editor adds a student leader
- **WHEN** an authorized editor adds a person to the Student Leaders collection with a name, role, and sub-team
- **THEN** the build validates the entry against the schema and fails with a clear error if a required field is missing

#### Scenario: Editor adds a mentor
- **WHEN** an authorized editor adds a person to the Mentors collection with a name, role, and sub-team
- **THEN** the entry is stored separately from the student leaders and appears under the Mentors heading on the Team Leadership page

### Requirement: Team Leadership page
The site SHALL render both collections on one page as a simple chart, with student leaders and mentors in distinct groups, each further organized by sub-team.

#### Scenario: Visitor views leadership grouped by role
- **WHEN** a visitor loads the Team Leadership page
- **THEN** student leaders and mentors are shown in visually distinct groups, each further organized by sub-team

#### Scenario: Empty sub-team is omitted
- **WHEN** a sub-team currently has no listed members
- **THEN** that sub-team group is not rendered as an empty section
