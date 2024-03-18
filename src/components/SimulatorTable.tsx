"use client"
import React, { useState, useEffect } from 'react';
import { StandingsItem } from "@/app/lib/types/standingsType";
import { FixtureItem } from '@/app/lib/types/fixtureType';
import { fetchFixtureByRound, getRounds } from '@/app/lib/actions';

function TableHeadItem({ item }: { item: string }) {
    return <th className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">{item}</th>;
}

function TableItem({ item }: { item: string }) {
    return <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500 bg-blue-200 text-center">{item}</td>;
}

function TableHead() {
    return (
        <thead className="bg-gray-50">
            <tr>
                <TableHeadItem item="Team" />
                {/* Other items */}
            </tr>
        </thead>
    );
}

export default function SimulatorTable({ initialData, fixtures }: { initialData: StandingsItem[]; fixtures: FixtureItem[] }) {
    const [standings, setStandings] = useState<StandingsItem[]>([]);
    const [matches, setMatches] = useState<FixtureItem[]>([]);

    useEffect(() => {
        setStandings([...initialData]); // Directly use initialData for initial standings
    }, [initialData]);

    useEffect(() => {
        async function fetchAndSetMatches() {
            const roundFixtures = await fetchFixtureByRound('71', '2023', 'Regular Season - 3');
            if (Array.isArray(roundFixtures)) {
                setMatches(roundFixtures);
            }
        }
        fetchAndSetMatches();
    }, []); // Empty dependency array to fetch only on mount


    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <TableHead />
                <tbody className="bg-white divide-y divide-gray-200">
                    {standings.map((team, index) => (
                        <tr key={index}>
                            <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">
                                <div className="font-medium text-gray-900">{team.rank}. {team.team.name}</div>
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
            <div>
                {matches.map((match, index) => (
                    <div key={index}>
                        <p>{match.teams.home.name} vs {match.teams.away.name}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}
