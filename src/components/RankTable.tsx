// components/RankTable.tsx
import React from 'react';
import { StandingsItem, standingsApiObjType } from '@/app/lib/types/standingsType';


interface RankTableProps {
    standings: standingsApiObjType | null;
}

const RankTable: React.FC<RankTableProps> = ({ standings }) => {
    if (!standings || !standings.response) {

        return <div>Loading...</div>;
    }

    return (
        <div>
            {standings.response.map((league) =>
                league.league.standings.map((standing, index) => (
                    <div key={index}>
                        <h1>{standing.rank}</h1>
                        <h1>{standing.team.name}</h1>
                        <h1>{standing.points}</h1>
                        <h1>{standing.goalsDiff}</h1>
                        <h1>{standing.group}</h1>
                        <h1>{standing.form}</h1>
                        <h1>{standing.status}</h1>
                        <h1>{standing.description}</h1>
                        <h1>{standing.all.played}</h1>
                        <h1>{standing.all.win}</h1>
                        <h1>{standing.all.draw}</h1>
                        <h1>{standing.all.lose}</h1>
                        <h1>{standing.all.goals.for}</h1>
                        <h1>{standing.all.goals.against}</h1>
                        <h1>{new Date(standing.update).toLocaleDateString()}</h1>
                    </div>
                ))
            )}
            {/* <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Points</th>
                        <th>Goal Difference</th>
                        <th>Group</th>
                        <th>Form</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Played</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>Goals For</th>
                        <th>Goals Against</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.response.map((league) =>
                        league.league.standings.map((standing, index) => (
                            <tr key={index}>
                                <td>{standing.rank}</td>
                                <td>
                                   
                                    {standing.team.name}
                                </td>
                                <td>{standing.points}</td>
                                <td>{standing.goalsDiff}</td>
                                <td>{standing.group}</td>
                                <td>{standing.form}</td>
                                <td>{standing.status}</td>
                                <td>{standing.description}</td>
                                <td>{standing.all.played}</td>
                                <td>{standing.all.win}</td>
                                <td>{standing.all.draw}</td>
                                <td>{standing.all.lose}</td>
                                <td>{standing.all.goals.for}</td>
                                <td>{standing.all.goals.against}</td>
                                <td>{new Date(standing.update).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table> */}
        </div>
    );
};

export default RankTable;