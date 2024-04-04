import { getLeagueStandingBySeason, getAllMatchesByLeagueSeason } from "@/lib/actions"
import Simulator from "./Simulator"
import LeagueCTA from "./LeagueCTA"

export default async function SimulatorFeed({ leagueId, currentSeason }: { leagueId: string, currentSeason: string }) {

    const rankingTable = await getLeagueStandingBySeason(leagueId, `${currentSeason}`)
    const allMatches = await getAllMatchesByLeagueSeason(leagueId, `${currentSeason}`)

    if (!rankingTable || !rankingTable.response || !allMatches || !allMatches.response) {
        return <div>Loading...</div>
    }


    if (!rankingTable.response || !Array.isArray(rankingTable.response[0]?.league.standings[0])) {
        return (<LeagueCTA />)
    }

    const rankingTableData = rankingTable.response[0].league.standings[0]

    if (!Array.isArray(rankingTableData)) {
        return <div>Loading...</div>
    }

    const allMatchesData = allMatches.response

    const data = {
        matchData: allMatchesData,
        standingsData: rankingTableData
    }

    return (
        <>
            <Simulator
                simulatorData={data}
            />
        </>
    )
}