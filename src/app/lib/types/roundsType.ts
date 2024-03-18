export type RoundsApiType = {
  get: string;
  parameters: LeagueParams;
  errors: any[]; // Assuming errors is an array of a specific structure, replace any[] with a more detailed type if needed
  results: number;
  paging: Paging;
  response: RoundsType;
};

export type LeagueParams = {
  league: string;
  season: string;
};

export type RoundsType =[]

type Paging = {
  current: number;
  total: number;
};
