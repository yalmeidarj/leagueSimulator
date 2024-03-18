import { StandingsItem } from "@/lib/types/standingsType";
import Image from "next/image";
import { FaArrowDown, FaArrowUp, FaSquareFull } from "react-icons/fa";

type tableProps = {
    standings: StandingsItem[];
};

export default function StandingsTableBody({ standings }: tableProps) {
    return (
        <tbody>
            {standings.map((standing, idx) => {
                const tableIndex = idx + 1;
                const difference = standing.rank - tableIndex;
                let icon;
                if (difference < 0) {
                // Rank is worse than the index, indicating a drop
                    icon = <div className='flex flex-row items-center gap-1'>
                        <span>{difference}</span><FaArrowDown color="red" />
                    </div>
                } else if (difference > 0) {
                    // Rank is better than the index, indicating a rise
                    icon = <div className='flex flex-row items-center gap-1'>
                        <span>{difference}</span><FaArrowUp color="green" />
                    </div>
                } else { // No change
                    icon = <div className='flex flex-row items-center gap-1'>
                        <span>0</span><FaSquareFull color="" />
                        </div>
                }
                return (
                    <tr key={standing.team.id} className="text-center p-4 border-y border-slate-400">
                        <td className="flex flex-row justify-between items-center px-2 sm:px-6  py-2 ">
                            <span className="text-xs border-r text-start border-slate-400">{tableIndex}</span>
                            <div className="flex flex-row items-center self-start w-full justify-between gap-2">
                                <div className='flex flex-row  items-center w-full '>
                                <div className='flex flex-row justify-start gap-1 sm:gap-0 w-full'>
                                <Image
                                    src={standing.team.logo}
                                    alt={`${standing.team.name}'s Logo`}
                                    width={24}
                                    height={24}
                                    />
                                    <span className="text-md sm:ml-4">{standing.team.name.slice(0, 3)}</span>
                                    </div>
                                    </div>
                                <span className='text-sm'>{icon}</span>
                            </div>
                        </td>
                        <td className="px-2  py-1">{standing.points}</td>
                        <td className="px-2  py-1">{standing.all.played}</td>
                        <td className="px-2  py-1">{standing.all.win}</td>
                        <td className="px-2  py-1">{standing.goalsDiff}</td>
                        <td className="px-2  py-1">{standing.all.goals.for}</td>
                    </tr>
                );
            })}
        </tbody>
    );
}
