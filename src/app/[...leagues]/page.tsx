import League from "@/components/League";
import { combineFixtureAndRounds, getLeagueStandingBySeason, getLeagueInfo, getRounds } from "../lib/actions";
import LeagueTable from "@/components/LeagueTable";

export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
    }) {
    
    const currentYear = new Date().getFullYear().toString();
    
    const leagueId = searchParams.league as string;
    const season = searchParams.season ?? currentYear;
    const seasonProp = season as string;

    const leagueData = await getLeagueInfo(Number(leagueId));

    
    

    if (!leagueData || leagueData.response === null) {
        return <h1>League not found</h1>
    }



    // const league = leagueData.response[0]

    const t = await combineFixtureAndRounds(leagueId, seasonProp);

    
    return (
        <>
        {/* <h1>{league.country.name}</h1> */}
            {/* <LeagueTable
                id={leagueId}
                year={seasonProp}
            />  */}

            <League />
        </>
    )

}

