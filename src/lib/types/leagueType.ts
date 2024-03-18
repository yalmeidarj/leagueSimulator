export type leagueApiType = {
  get: string;
  parameters: {};
  errors: [];
  results: number;
  paging: object;
  response: leagueDataObjType[];
};

export type leagueDataObjType = {
  league: LeagueInfoType;
  country: Country;
  seasons: Seasons[];
};

export type LeagueInfoType = {
  id: number;
  name: string;
  type: string;
  logo: string;
};

type Country = {
  name: string;
  code: string;
  flag: string;
};

type Seasons = {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
};

type Coverage = {
  fixtures: {
    events: boolean;
    lineups: boolean;
    statistics_fixtures: boolean;
    statistics_players: boolean;
  };
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
};
