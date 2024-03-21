import { LeagueInfoType, Country, Seasons } from "@/lib/types/leagueType";
import Image from "next/image";

type CardProps = {
    leagueData: LeagueInfoType;
    countryData: Country;
    currentSeason: Seasons[];
};

type LeagueCardProps = {
    data: CardProps;
};

export default function LeagueCard({ data }: LeagueCardProps) {
    const { leagueData, countryData, currentSeason } = data;

    const season = currentSeason[0].year;

    var text = leagueData.name
    var count = 10;

    var nameFormatted = text.slice(0, count) + (text.length > count ? "..." : "")
    return (
        <div className="bg-gradient-to-tr from-custom-gradient to-custom-gradientSecond w-[140px] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <a
                href={`?league=${leagueData.id}`}
                target="_self"
                className="flex flex-col items-center justify-center p-4 text-white"
            >
                <div className='flex w-full flex-col items-center gap-2'>
                    <Image
                        src={leagueData.logo}
                        alt={leagueData.name}
                        width={60}
                        height={60}
                        className="mx-auto rounded-full m-2 p-2 bg-white border-2 border-custom-foreground shadow-md"
                    />
                    <div className='flex flex-col items-center mt-2'>
                        <h1 className=" font-bold">{nameFormatted}</h1>
                        <div className='flex flex-row items-center gap-2 mt-1'>
                            <Image
                                src={countryData.flag}
                                alt={countryData.name}
                                width={24}
                                height={24}
                                className="rounded-full border border-gray-400"
                            />
                            <h1 className="text-sm">{countryData.name}</h1>
                        </div>
                        <h2 className="text-xs font-semibold mt-1 bg-gray-700 py-1 px-3 rounded-full">{season}</h2>
                    </div>
                </div>
            </a>
        </div>
    );
}