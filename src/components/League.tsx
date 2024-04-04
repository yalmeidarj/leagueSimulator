import { getCurrentSeason } from "@/lib/actions"
import LeagueCard from "./LeagueCard"

export default async function League({ id }: { id: string }) {
    const league = await getCurrentSeason(id)

    if (!league || !league.response || !league.response[0] || !Array.isArray(league.response)) {
        return <div>Loading (from league componente)...</div>
    }

    const currentSeason = league.response[0].seasons
    const leagueData = league.response[0].league
    const countryData = league.response[0].country

    const data = {
        leagueData: leagueData,
        countryData: countryData,
        currentSeason: currentSeason
    }


    return (
        <div
            className=""
        >
            <LeagueCard
                data={data}
            />
        </div>
    );

}