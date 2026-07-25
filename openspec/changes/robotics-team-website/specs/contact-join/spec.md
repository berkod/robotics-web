## ADDED Requirements

### Requirement: Join/Contact Us page
The site SHALL provide a page listing the team's high school name, official team email address, and an embedded map of the school location, so prospective members, mentors, or sponsors know how to reach the team.

#### Scenario: Visitor finds contact info
- **WHEN** a visitor loads the Join/Contact Us page
- **THEN** they see the school name and the team's official email address as visible text (not only inside an image)

#### Scenario: Visitor sees the school location on a map
- **WHEN** a visitor loads the Join/Contact Us page
- **THEN** an embedded Google Map centered on the school's address is displayed and interactive (pannable/zoomable)

#### Scenario: Email is directly actionable
- **WHEN** a visitor clicks the official team email address
- **THEN** their default mail client opens a new message addressed to that email
