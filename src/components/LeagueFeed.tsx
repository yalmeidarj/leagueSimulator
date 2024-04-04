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
            className='relative bottom-0 max-w-full min-h-5/5 overflow-x-auto '
        >
            <div className='flex flex-nowrap items-center'>
            
            {supportedLeagues.map((league: leagueCardProps) => {
                return <League id={`${league.id}`} />
            }
            )}
            </div>
            {/* <h3 className='justify-self-end w-full bg-yellow-200'>Scroll to view more</h3> */}
        </div>
    );
}