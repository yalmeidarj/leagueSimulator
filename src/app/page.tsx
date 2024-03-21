

import { getCurrentSeason } from "../lib/actions";
import SimulatorFeed from "@/components/SimulatorFeed";
import League from "@/components/League";


export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
    searchParams?: { [league: string]: string | string[] | undefined };
}) {
  const supportedLeagues = [
    {
      "id": 71, // Brasileirão masculino
    },
    {
      "id": 74, // Brasileirão feminino
    },
    {
      "id": 140, // La Liga
    },
    {
      "id": 866, // MLS
    },
    // {
    //   "id": 135, // Seria A italy
    // },
    // {
    //   "id": 78, // Bundesliga
    // },
    {
      "id": 39, // Premier League
    },

  ];
  if (!searchParams || !searchParams.league) {
    return <div>No chosen League....</div>
  }

  const league = searchParams.league as string
  const leagueId = league
  const leagueData = await getCurrentSeason(leagueId)

  if (!leagueData || !leagueData.response || !Array.isArray(leagueData.response)) {
    return <div>Loading...</div>
  }

  const currentSeason = leagueData.response[0].seasons[0].year
  
  return (
    <main>
      <div className='flex flex-row overflow-x-scroll sm:overflow-hidden mt-4 sm:flex sm:flex-row w-full gap-4 items-center '>
        {supportedLeagues.map((league) => {
          return <League id={`${league.id}`} />
        }
        )}
      </div>
      <SimulatorFeed
        leagueId={leagueId}
        currentSeason={`${currentSeason}`}
      />
    </main>
  );
}


