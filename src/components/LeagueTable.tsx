import { fetchFixtureByRound, getLeagueStandingBySeason, getRounds } from "@/app/lib/actions";
import { StandingsItem } from "@/app/lib/types/standingsType";
import Image from "next/image";
import SimulatorTable from "./SimulatorTable";
import { FixtureItem } from "@/app/lib/types/fixtureType";


export default async function LeagueTable({ year, id }: { year: string, id: string }) {
   
    const standings = await getLeagueStandingBySeason(id, year);

    if (standings.response[0] == undefined || !Array.isArray(standings.response[0].league.standings[0])) {
        return <h1 className="text-lg font-semibold text-center py-4">Standings not found</h1>
    }

    const data = standings.response[0].league.standings[0];

    const fixtureData = await fetchFixtureByRound(id, year, "Regular Season - 3");

    if ( Array.isArray(fixtureData.response[0])) {
        return <h1 className="text-lg font-semibold text-center py-4">Fixtures not found</h1>
    }

    const fixtures: FixtureItem[] = fixtureData.response

    console.log(`fixtures: ${fixtures}`)

    const roundsData = await getRounds(id, year);

    console.log(`rounds: ${roundsData}`)

    if (!Array.isArray(roundsData.response)) {
        return <h1 className="text-lg font-semibold text-center py-4">Rounds not found</h1>
    }

    const rounds = roundsData.response



    return (
        <>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <TableHead />
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((team, standingIndex) => (
                        <tr key={standingIndex}>
                            
                            <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">
                                <div className="font-medium text-gray-900">{team.rank.toString()} {team.team.name}</div>
                            </td>
                            <TableItem item={team.points.toString()} />
                            <TableItem item={team.goalsDiff.toString()} />
                            <TableItem item={team.all.win.toString()} />
                            <TableItem item={team.all.draw.toString()} />
                            <TableItem item={team.all.lose.toString()} />
                            <TableItem item={team.all.goals.for.toString()} />
                            <TableItem item={team.all.goals.against.toString()} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            <SimulatorTable
                initialData={data}
                fixtures={fixtures}
                rounds={rounds}
            />
        </>
    );
}

function TableItem({ item }: { item: string }) {
    return (
        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500 bg-blue-200 text-center">
            {item}
        </td>
    );
}

function TableHead() {
    return (
        <thead className="bg-gray-50">
            <tr>
                <TableHeadItem
                item="Team"
                />
                <TableHeadItem
                item="Points"
                />
                <TableHeadItem
                item="Goal"
                />
                <TableHeadItem
                item="Wins"
                />
                <TableHeadItem
                item="Draw"
                />
                <TableHeadItem
                item="Loss"
                />
                <TableHeadItem
                item="Goal"
                />
                <TableHeadItem
                item="Goal"
                />
            </tr>
        </thead>
    );
}
function TableHeadItem({ item }: { item: string }) {
    return (
    <th className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">{item}</th>
    );
}
