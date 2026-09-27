/**
 * The Blue Alliance API v3 data layer.
 *
 * BUILD-TIME ONLY. This module reads `TBA_AUTH_KEY`, deliberately *not*
 * prefixed `PUBLIC_` so that Astro keeps it out of the client bundle — only
 * `PUBLIC_`-prefixed vars are exposed to client-side code. Import this from
 * component frontmatter only, never from a `<script>` block or a client
 * island, or the key ships to every visitor.
 *
 * `astro:env` is intentionally not used here. It validates *every* declared
 * secret whenever anything is imported from `astro:env/server`, even secrets
 * that aren't imported, which would fail the build whenever no key is set —
 * exactly the state this widget has to keep working in.
 */
import { BLUE_ALLIANCE_TEAM_PAGE, TEAM_NAME, TEAM_NUMBER } from "./site";

import fixtureEvents from "./fixtures/tba-events.json";
import fixtureMatches from "./fixtures/tba-matches.json";
import fixtureAwards from "./fixtures/tba-awards.json";

const TBA_BASE = "https://www.thebluealliance.com/api/v3";

/** Keep a slow or unreachable TBA from stalling a Netlify build. */
const TIMEOUT_MS = 8_000;

/* -------------------------------------------------------------------------- */
/* Raw TBA shapes — only the fields this widget actually reads.               */
/* -------------------------------------------------------------------------- */

interface RawEvent {
  key: string;
  name: string;
  start_date?: string | null;
  city?: string | null;
  state_prov?: string | null;
}

interface RawAlliance {
  score?: number | null;
  team_keys?: string[];
}

interface RawMatch {
  key?: string;
  event_key?: string;
  /** "red" | "blue" for a decided match; "" for both a tie *and* an unplayed one. */
  winning_alliance?: string;
  alliances?: { red?: RawAlliance; blue?: RawAlliance };
}

interface RawAward {
  name: string;
  event_key: string;
}

/* -------------------------------------------------------------------------- */
/* Public shapes                                                              */
/* -------------------------------------------------------------------------- */

export interface TeamRecord {
  wins: number;
  losses: number;
  ties: number;
  /** Matches counted toward the record — excludes scheduled-but-unplayed ones. */
  played: number;
}

export interface SeasonEvent {
  key: string;
  name: string;
  location: string | null;
}

export interface SeasonAward {
  name: string;
  /** Resolved event name where possible, falling back to the raw event key. */
  event: string;
}

export type SeasonState =
  /** Fetched from the real API. */
  | "live"
  /** Rendered from local fixtures because TBA_FIXTURES is set. */
  | "fixtures"
  /** No TBA_AUTH_KEY set — nothing to fetch with. */
  | "unconfigured"
  /** A key exists but the fetch (or the fixture load) failed. */
  | "error";

export interface TeamSeason {
  state: SeasonState;
  year: string;
  teamKey: string;
  record: TeamRecord;
  events: SeasonEvent[];
  awards: SeasonAward[];
  profileUrl: string;
}

const EMPTY_RECORD: TeamRecord = { wins: 0, losses: 0, ties: 0, played: 0 };

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const authKey = import.meta.env.TBA_AUTH_KEY as string | undefined;
const teamKey = (import.meta.env.TBA_TEAM_KEY as string | undefined) || `frc${TEAM_NUMBER}`;

/**
 * FRC season years track the calendar year, so defaulting to the build year
 * keeps this correct without anyone editing it each January. Pin `TBA_YEAR`
 * to show a specific season instead.
 */
const year = (import.meta.env.TBA_YEAR as string | undefined) || String(new Date().getFullYear());

const useFixtures =
  import.meta.env.TBA_FIXTURES === "1" || import.meta.env.TBA_FIXTURES === "true";

/* -------------------------------------------------------------------------- */
/* Record math                                                                */
/* -------------------------------------------------------------------------- */

/**
 * TBA reports an unplayed match with `winning_alliance: ""` — the very same
 * value it uses for a real tie — so gating on that field alone counts every
 * future qualification match as a tie. Unplayed matches score `-1` (or null),
 * so the scores are what actually distinguish them.
 */
function isPlayed(match: RawMatch): boolean {
  const red = match.alliances?.red?.score;
  const blue = match.alliances?.blue?.score;
  if (red == null || blue == null) return false;
  return red >= 0 && blue >= 0;
}

/** Exported for testing: the one piece here with non-obvious logic. */
export function computeRecord(matches: RawMatch[], team: string): TeamRecord {
  const record: TeamRecord = { ...EMPTY_RECORD };

  for (const match of matches) {
    if (!isPlayed(match)) continue;

    const onRed = match.alliances?.red?.team_keys?.includes(team) ?? false;
    const onBlue = match.alliances?.blue?.team_keys?.includes(team) ?? false;
    if (!onRed && !onBlue) continue;

    record.played += 1;

    const winner = match.winning_alliance;
    if (winner !== "red" && winner !== "blue") {
      record.ties += 1;
      continue;
    }

    const won = (onRed && winner === "red") || (onBlue && winner === "blue");
    if (won) record.wins += 1;
    else record.losses += 1;
  }

  return record;
}

/* -------------------------------------------------------------------------- */
/* Normalisation                                                              */
/* -------------------------------------------------------------------------- */

function eventLocation(event: RawEvent): string | null {
  const parts = [event.city, event.state_prov].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

function normalize(
  rawEvents: RawEvent[],
  rawMatches: RawMatch[],
  rawAwards: RawAward[],
  team: string,
): Pick<TeamSeason, "record" | "events" | "awards"> {
  const events = [...rawEvents]
    .sort((a, b) => (a.start_date ?? "").localeCompare(b.start_date ?? ""))
    .map((event) => ({
      key: event.key,
      name: event.name,
      location: eventLocation(event),
    }));

  // Show "Rookie All Star Award — Hudson Valley Regional" rather than the
  // opaque event key the API returns on each award.
  const eventNames = new Map(events.map((event) => [event.key, event.name]));
  const awards = rawAwards.map((award) => ({
    name: award.name,
    event: eventNames.get(award.event_key) ?? award.event_key,
  }));

  return { record: computeRecord(rawMatches, team), events, awards };
}

/* -------------------------------------------------------------------------- */
/* Fetching                                                                   */
/* -------------------------------------------------------------------------- */

async function tbaFetch<T>(path: string, key: string): Promise<T> {
  const response = await fetch(`${TBA_BASE}${path}`, {
    headers: {
      "X-TBA-Auth-Key": key,
      // TBA's own client docs note that a missing User-Agent can draw a 403.
      "User-Agent": `${TEAM_NAME} team website build`,
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`TBA ${path} responded ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

/** Memoised so a build fetches once, not once per page using the widget. */
let cached: Promise<TeamSeason> | undefined;

/**
 * Fetch the team's season from TBA at build time.
 *
 * Never throws and never rejects: a TBA outage must not fail a deploy, so
 * every failure resolves to a state the widget renders as its fallback.
 */
export function getTeamSeason(): Promise<TeamSeason> {
  cached ??= loadTeamSeason();
  return cached;
}

async function loadTeamSeason(): Promise<TeamSeason> {
  const base = {
    year,
    teamKey,
    profileUrl: BLUE_ALLIANCE_TEAM_PAGE,
    record: EMPTY_RECORD,
    events: [] as SeasonEvent[],
    awards: [] as SeasonAward[],
  };

  if (useFixtures) {
    // Constructed sample data, not the team's real results — see
    // src/lib/fixtures/README.md.
    return {
      ...base,
      state: "fixtures",
      ...normalize(fixtureEvents, fixtureMatches, fixtureAwards, teamKey),
    };
  }

  if (!authKey) {
    return { ...base, state: "unconfigured" };
  }

  try {
    const [rawEvents, rawMatches, rawAwards] = await Promise.all([
      tbaFetch<RawEvent[]>(`/team/${teamKey}/events/${year}/simple`, authKey),
      tbaFetch<RawMatch[]>(`/team/${teamKey}/matches/${year}/simple`, authKey),
      tbaFetch<RawAward[]>(`/team/${teamKey}/awards/${year}`, authKey),
    ]);

    return {
      ...base,
      state: "live",
      ...normalize(rawEvents, rawMatches, rawAwards, teamKey),
    };
  } catch (error) {
    // Warn, don't throw — the build has to survive TBA being down.
    console.warn(
      `[blue-alliance] Falling back: could not load ${teamKey} for ${year} —`,
      error instanceof Error ? error.message : error,
    );
    return { ...base, state: "error" };
  }
}
