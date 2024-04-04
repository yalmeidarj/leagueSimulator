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
        <div className=" border-r border-dotted border-custom-foreground bg-custom-background
         from-custom-gradient to-custom-gradientSecond
           min-w-[190px]
            overflow-x-hidden shadow-lg hover:shadow-2xl
            transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
            <a
                href={`?league=${leagueData.id}&season=${season}`}
                target="_self"
                className=""
            >
                <div className='flex w-full flex-row items-center gap-2'>
                    <Image
                        src={countryData.flag}
                        alt={countryData.name}
                        // src={leagueData.logo}
                        // alt={leagueData.name}
                        width={30}
                        height={30}
                        className="mx-auto rounded-full  bg-white border-2 border-custom-foreground shadow-md"
                    />
                    <div className='w-full flex flex-col justify-between  items-center '>
                        <h1 className="w-full font-bold">{ countryData.name }</h1>
                        <div className='w-full flex flex-row justify-between items-center gap-2 '>
                            <h1 className="text-sm text-nowrap">{nameFormatted}</h1>
                            <Image
                                // src={countryData.flag}
                                // alt={countryData.name}
                                src={leagueData.logo}
                                alt={leagueData.name}
                                width={28}
                                height={28}
                                className="rounded-full border p-1 mr-1 self-center border-gray-400"
                            />
                        </div>
                        {/* <h2 className="text-xs font-semibold mt-1 bg-gray-700 py-1 px-3 rounded-full">{season}</h2> */}
                    </div>
                </div>
            </a>
                    
        </div>
    );
}