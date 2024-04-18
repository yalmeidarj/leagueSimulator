export default function StandingsTableHeader() {
    return (
        <thead className="text-center p-4 border-b border-slate-400">
            <tr>
                <th className="border-r px-6 py-2 border-slate-400">Team</th>
                <th className="px-2 py-2">Points</th>
                <th className="px-2 py-2">Played</th>
                <th className="px-2 py-2">Wins</th>
                <th className="px-2 py-2">GD</th>
                <th className="px-2 py-2">GF</th>
            </tr>
        </thead>
    );
}