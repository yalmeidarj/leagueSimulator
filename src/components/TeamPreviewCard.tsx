import Image from "next/image";
import Link from "next/link";
import FormView from "./FormView";
import { cn } from "@/lib/utils";
// import { ApiResponse, Stats } from "@/lib/teamTypes/teamTypes";

type League = {
    name: string;
    country: string;
};

type Team = {
    logo?: string;
    name: string;
    // league: League;
    form: string; // Assuming form is a string; adjust as needed
    gpg: number; // Assuming gpg is a number; adjust as needed
};

type PreviewTeamStatsCardProps = {
    team: Team;
    className?: string;
};


export function TeamPreviewCard({ team, className }: PreviewTeamStatsCardProps) {
    return (
        <div className={cn("invisible group-hover:visible absolute bg-gray-800 text-white p-4 rounded-lg max-w-sm")}>
            <div className='flex flex-row text-left'>
                <Image
                    src={team?.logo || "https://via.placeholder.com/20"}
                    width={50}
                    height={50}
                    alt={team.name}
                ></Image>
                <div className='ml-4'>
                    <Link
                        href="#"
                        className="hover:text-br-yellow">
                        <h3 className="text-lg font-bold">{team.name}</h3>
                    </Link>
                    {/* <p className="text-sm">{team.league.name} ({team.league.country})</p> */}

                </div>
            </div >
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Form
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last 5
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            GPG
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Overall
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            <FormView
                                form={team.form}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {team.gpg}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Home
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">

                            <FormView
                                form={team.form}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {team.gpg}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Away
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            <FormView
                                form={team.form}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {team.gpg}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div >
    )
}