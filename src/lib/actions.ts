'use server'
import { env } from "process";
import { FixtureItem, FixtureResponse } from "./types/fixtureType";
import { leagueApiType } from "./types/leagueType";
import { RoundsApiType } from "./types/roundsType";
import { standingsApiObjType } from "./types/standingsType";

// const ApiConstants = {
//   BASE_URL: "https://api-football-v1.p.rapidapi.com/v3/",
//   API_KEY: "6b3b3ae179msh12092c0b165179fp11063cjsnc52d628c2c4c",
//   API_HOST: "api-football-v1.p.rapidapi.com",
//   ONE_HOUR: 60 * 60 * 1000,
//   getFetchOptions(): FetchOptions {
//     return {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": this.API_KEY,
//         "X-RapidAPI-Host": this.API_HOST,
//       },
//     };
//   },
// };

const ApiConstants2Provider = {

  BASE_URL: process.env.BASE_URL,
  // ONE_HOUR: 60 * 60 * 1000,
  getFetchOptions(): FetchOptions {
    return {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY as string,
        "X-RapidAPI-Host": process.env.API_HOST as string,
        
      },
    };
  },
};

type FetchOptions = {
  method: string;
  headers: {
    readonly "X-RapidAPI-Key": string;
    readonly "X-RapidAPI-Host": string;
  };
};



export async function getLeagueInfo(
  league: number,
  season?: number
): Promise<leagueApiType> {
  let url = `${ApiConstants2Provider.BASE_URL}leagues?id=${league}`;
  if (season) {
    url += `&season=${season}`; // Appends the season parameter to the URL if it's provided
  }
  try {
    const response = await fetch(url, ApiConstants2Provider.getFetchOptions());
    const data: leagueApiType = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export async function getLeagueStandingBySeason(
  league: string,
  season?: string
): Promise<standingsApiObjType> {
  try {
    let url = `${ApiConstants2Provider.BASE_URL}standings?season=${season}&league=${league}`;
    
    if (season) {
      url += `&season=${season}`; // Appends the season parameter to the URL if it's provided
    }
    const response = await fetch(url, ApiConstants2Provider.getFetchOptions());
    
    const data: standingsApiObjType = await response.json();

    // console.log(`From API:${data.response[0]?.rank}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchFixtureByRound(
  league: string,
  season: string,
  round: string
): Promise<FixtureResponse> {
  try {
    const url = `${ApiConstants2Provider.BASE_URL}fixtures?league=${league}&season=${season}&round=${round}`;
    const response = await fetch(url, ApiConstants2Provider.getFetchOptions());
    const data: FixtureResponse = await response.json();


    // console.log(data);


    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCurrentSeason(league: string): Promise<leagueApiType> {
  //  Leagues whose season is running
  // Get the list of available leagues and cups.
  // The league id are unique in the API and leagues keep it across all seasons
  // Most of the parameters of this endpoint can be used together.

  try {
    const url = `${ApiConstants2Provider.BASE_URL}leagues?id=${league}&current=true`;
    const response = await fetch(url, ApiConstants2Provider.getFetchOptions());
    const data: leagueApiType = await response.json();
    // const currentSeason = data.response[0].seasons[0].year;

    return data;
  } catch (error) {
    throw error;
  }
}



export async function getAllMatchesByLeagueSeason(
  league: string,
  season: string,

): Promise<FixtureResponse> {
  try {
    const url = `${ApiConstants2Provider.BASE_URL}fixtures?league=${league}&season=${season}`;
    const response = await fetch(url, ApiConstants2Provider.getFetchOptions());
    const data = await response.json();
    // console.log(data);

    // Sort the data by round (round.league.round)
    // data.response.sort((a, b) => {
    //   const aRound = a.league.round;
    //   const bRound = b.league.round;
    //   if (aRound < bRound) {
    //     return -1;
    //   }
    //   if (aRound > bRound) {
    //     return 1;
    //   }
    //   return 0;
    // });

    // console.log(data);


    return data;
  } catch (error) {
    throw error;
  }
}

export async function getRounds(
  league: string,
  season: string,
): Promise<RoundsApiType> {
  try {
    const url = `${ApiConstants2Provider.BASE_URL}fixtures/rounds?league=${league}&season=${season}`;
    const response = await fetch(url, ApiConstants2Provider.getFetchOptions());
    const data: RoundsApiType = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function combineFixtureAndRounds(league: string, season: string){
  try {
    const fixtureResponse = await getAllMatchesByLeagueSeason(league, season);
    const roundsResponse = await getRounds(league, season);

    // sort fixture data by round (fixture.league.round)

    // Assuming fixtureResponse and roundsResponse are correctly fetched and follow the structure
    const fixtures: FixtureItem[] = fixtureResponse.response;
    const rounds: string[] = roundsResponse.response; // Assuming this gives a list of round strings

    // Sort fixtures by round
    const sortedFixtures = fixtures.sort((a, b) => {
      const roundANumber = parseInt(a.league.round.replace(/^\D+/g, ""));
      const roundBNumber = parseInt(b.league.round.replace(/^\D+/g, ""));
      return roundANumber - roundBNumber;
    });

    // Return or process the sorted fixtures as needed
    return { sortedFixtures, rounds };

    // return { fixture, roundsList };
  } catch (error) {
    throw error;
  }
}


