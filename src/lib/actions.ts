'use server'
import { env } from "process";
import { FixtureItem, FixtureResponse } from "./types/fixtureType";
import { leagueApiType } from "./types/leagueType";
import { RoundsApiType } from "./types/roundsType";
import { standingsApiObjType } from "./types/standingsType";

const ApiConstants2Provider = {
  BASE_URL: process.env.BASE_URL,
  revalidate: 5400, // default revalidate time in seconds
  
  setRevalidateTime(seconds: number) {
    this.revalidate = seconds;
  },
  
  // disableRevalidation: false, // Flag to disable revalidation
  
  // setDisableRevalidation() {
  //   this.disableRevalidation = true;
  // },

  // setEnableRevalidation() {
  //   this.disableRevalidation = false;
  // },

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
  ApiConstants2Provider.setRevalidateTime(12 * 3600); // 12 hours
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
    ApiConstants2Provider.setRevalidateTime(2 * 3600); // 2 hours for league standings
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
    ApiConstants2Provider.setRevalidateTime(5 * 3600); // 5 hours for league standings
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

  ApiConstants2Provider.setRevalidateTime(2592000); // Set to 30 days
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
    ApiConstants2Provider.setRevalidateTime(3600); // 1 hours for league standings
    const url = `${ApiConstants2Provider.BASE_URL}fixtures?league=${league}&season=${season}`;
    const response = await fetch(url, ApiConstants2Provider.getFetchOptions());
    const data = await response.json();

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

export async function getCurrentRound(league: string, season: string): Promise<RoundsApiType> {
  try {
    ApiConstants2Provider.setRevalidateTime(24 * 3600); // 1 day
    
    const url = `${ApiConstants2Provider.BASE_URL}fixtures/rounds?league=${league}&season=${season}&current=true`;
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


