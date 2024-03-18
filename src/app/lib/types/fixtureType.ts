export type FixtureResponse = {
  get: string;
  parameters: Parameters;
  errors: any[];
  results: number;
  paging: Paging;
  response: FixtureItem[];
};

type Parameters = {
  live: string;
};

type Paging = {
  current: number;
  total: number;
};

export type FixtureItem = {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  score: Score;
};

type Fixture = {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
};

type Periods = {
  first: number | null;
  second: number | null;
};

type Venue = {
  id: number | null;
  name: string;
  city: string;
};

type Status = {
  long: string;
  short: string;
  elapsed: number | null;
};

type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
};

type Teams = {
  home: TeamDetail;
  away: TeamDetail;
};

type TeamDetail = {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
  draw?: boolean | null;
};

type Goals = {
  home: number | null;
  away: number | null;
};

type Score = {
  halftime: ScoreDetail;
  fulltime: ScoreDetail | null;
  extratime: ScoreDetail | null;
  penalty: ScoreDetail | null;
};

type ScoreDetail = {
  home: number | null;
  away: number | null;
};
