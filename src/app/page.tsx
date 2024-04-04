

import SimulatorFeed from "@/components/SimulatorFeed";
import LeagueFeed from "@/components/LeagueFeed";
import Footer from "@/components/Footer";



export default async function Home({
  params,
  searchParams,
}: {
    params: { slug: string };
    searchParams?: { [league: string]: string | string[] | undefined };
}) {

  const leagueId = searchParams?.league as string
  const currentSeason = searchParams?.season as string
    
  return (
    <main className='justify-between flex flex-col sm:h-screen '>
      <div className='ml-[5rem] '>
    
      <LeagueFeed />  
    </div>
      <SimulatorFeed
        leagueId={leagueId}
        currentSeason={currentSeason}
      />

    </main>
  );
}


