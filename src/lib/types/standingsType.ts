export type standingsApiObjType = {
  get: string;
  parameters: {};
  errors: [];
  results: number;
  paging: object;
  response: LeagueType[];
};

export type StandingsType = {
    // standings: FootballTeam[];
  rank: number | null;
  team: {
    id: number;
    name: string ;
    logo: string ;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string | null;
  status: string;
  description: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  home: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  away: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  update: string;
};



export type LeagueType = {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: StandingsItem[];
  };
};

export type StandingsItem = {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: "same" | "up" | "down"; // Assuming 'status' can be 'same', 'up', or 'down'. Adjust as needed.
  description: string;
  all: MatchStats;
  home: MatchStats;
  away: MatchStats;
  update: string; // Assuming ISO 8601 date format as string. Adjust the type if necessary (e.g., to Date for actual Date objects).
};

type MatchStats = {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
};

type Goals = {
  for: number;
  against: number;
};
