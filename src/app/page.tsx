import SimulatorFeed from "@/components/SimulatorFeed";

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
    <main className='justify-between flex flex-col sm:h-screen pt-8 sm:pt-2 '>
      <SimulatorFeed
        leagueId={leagueId}
        currentSeason={currentSeason}
      />
    </main>
  );
}


