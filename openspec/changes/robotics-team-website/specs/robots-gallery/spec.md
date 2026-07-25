## ADDED Requirements

### Requirement: Robots content collection
The site SHALL maintain a CMS-editable collection of yearly robot entries, where each entry has a competition year, robot name, a photo, and exactly three spec bullet points, validated against a schema at build time.

#### Scenario: Editor adds a new season's robot
- **WHEN** an authorized editor adds a robot entry via the CMS with a year, name, photo, and three spec bullets
- **THEN** the build validates the entry against the robots schema and fails with a clear error if the photo is missing or the bullet count is not exactly three

### Requirement: Our Robots page
The site SHALL render the robots collection as a gallery ordered newest-first by competition year, showing each robot's name, photo, and its three spec bullets.

#### Scenario: Visitor browses robot history
- **WHEN** a visitor loads the Our Robots page
- **THEN** robots are listed with the most recent competition year first, each showing its name, photo, and exactly three spec bullets

#### Scenario: Current robot is distinguishable
- **WHEN** a visitor loads the Our Robots page
- **THEN** the current season's robot (most recent year) is visually distinguished from past robots
