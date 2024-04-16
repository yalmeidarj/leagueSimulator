import Image from "next/image";
import Link from "next/link";
import FormView from "./FormView";
import { cn } from "@/lib/utils";
// import { ApiResponse, Stats } from "@/lib/teamTypes/teamTypes";
import { FaExternalLinkAlt } from "react-icons/fa"

type League = {
    name: string;
    country: string;
};

type Team = {
    logo?: string;
    name: string;
    // league: League;
    form: string; // Assuming form is a string; adjust as needed
    gpg: string; // Assuming gpg is a number; adjust as needed
};

type PreviewTeamStatsCardProps = {
    team: Team;
    className?: string;
};


export function TeamPreviewCard({ team, className }: PreviewTeamStatsCardProps) {
    return (
        <div className={cn("invisible group-hover:visible absolute bg-gray-800 text-white p-4 rounded-lg w-auto", className)}>
            <div className='flex flex-row text-left'>
                <Image
                    src={team?.logo || "https://via.placeholder.com/20"}
                    width={80}
                    height={30}
                    alt={team.name}
                    className=''
                    ></Image>

                <div className='ml-2 flex flex-col'>
                    <Link
                        href="#"
                        className="hover:text-br-yellow">
                        <div className='flex flex-row items-center gap-2 underline
                    hover:text-br-yellow hover:translate-x-1 transform transition duration-200 ease-in-out
                    cursor-pointer
                    '>
                    
                        <h3 className="text-lg font-bold">
                            {team.name}
                        </h3>
                        <FaExternalLinkAlt />                    
                        </div>
                    </Link>
                    {/* <p className="text-sm">{team.league.name} ({team.league.country})</p> */}

            <div className="flex flex-col">
                <p className="text-xs font-bold">Goals Per Game</p>
                <p>{team.gpg}</p>
            </div>
                </div>
            </div >
            <div className="flex flex-row justify-start mt-2">
                <div className="flex flex-col">
                    {/* <p className="text-sm font-bold">Form</p> */}
                    <FormView
                        form={team.form}
                    />
                </div>

            </div>
            {/* <table className="min-w-full divide-y divide-gray-200">
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
            </table> */}

        </div >
    )
}