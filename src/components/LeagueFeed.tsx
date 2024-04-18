import { supportedLeagues } from "@/lib/supportedLeagues";
import League from "./League";

type leagueCardProps = {
    id: number;
}

type leagueFeedProps = {
    supporteLeagues: leagueCardProps[];
};


// export default function LeagueFeed({ supporteLeagues }: leagueFeedProps) {
export default function LeagueFeed() {
    return (
        <div
            className='relative bottom-0 max-w-5xl min-h-[80px] p-2 items-center z-0 overflow-x-auto '
        >
            <div className='ml-[6rem] flex flex-nowrap sm:gap-6 gap-6 items-center justify-between'>

                {supportedLeagues.map((league: leagueCardProps) => {
                    return <League id={`${league.id}`} />
                }
                )}
            </div>
            {/* <h3 className='justify-self-end w-full bg-yellow-200'>Scroll to view more</h3> */}
        </div>
    );
}