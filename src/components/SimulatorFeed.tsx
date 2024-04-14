import { getLeagueStandingBySeason, getAllMatchesByLeagueSeason, getCurrentRound } from "@/lib/actions"
import Simulator from "./Simulator"
import LeagueCTA from "./LeagueCTA"

export default async function SimulatorFeed({ leagueId, currentSeason }: { leagueId: string, currentSeason: string }) {
    try {
        // Fetch all data concurrently
        const [rankingTable, allMatches, currentRound] = await Promise.all([
            getLeagueStandingBySeason(leagueId, currentSeason),
            getAllMatchesByLeagueSeason(leagueId, currentSeason),
            getCurrentRound(leagueId, currentSeason)
        ]);

        if (!rankingTable?.response || !allMatches?.response) {
            throw new Error('Required league or match data is missing.');
        }
        if (!Array.isArray(rankingTable.response[0]?.league.standings[0])) {
            return <LeagueCTA />;
        }

        const rankingTableData = rankingTable.response[0].league.standings[0];
        if (!Array.isArray(rankingTableData)) {
            throw new Error('Ranking table data structure is invalid.');
        }

        const allMatchesData = allMatches.response;
        const data = {
            matchData: allMatchesData,
            standingsData: rankingTableData,
            fetchedCurrentRound: currentRound.response
        };

        return (
            <>
                <Simulator simulatorData={data} />
            </>
        );
    } catch (error:any) {

        // Return an error message or a specialized component to handle errors
        return <div>Error: {error.message}</div>;
    }
}
