"use client"
import { useEffect, useState } from "react";
import { FixtureItem } from  "@/lib/types/fixtureType";
import { StandingsItem } from "@/lib/types/standingsType";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import StandingsTableHeader from "./StandingsTableHeader";
import StandingsTableBody from "./StandingsTableBody";
import MatchCard from "./MatchCard";


type Props = {
    matchData: FixtureItem[];
    standingsData: StandingsItem[];
};

type SimulatorProps = {
    simulatorData: Props;
};

type GroupedMatches = Record<string, FixtureItem[]>;

export default function Simulator({ simulatorData }: SimulatorProps) {
    const { matchData, standingsData } = simulatorData;
    const [matches, setMatches] = useState<FixtureItem[]>(matchData);
    const [standings, setStandings] = useState<StandingsItem[]>(standingsData);
    const [currentRound, setCurrentRound] = useState<string>('');
    const [groupedMatches, setGroupedMatches] = useState<GroupedMatches>({});

    // Group matches by round
    useEffect(() => {
        const grouped = groupMatchesByRound(matches);
        setGroupedMatches(grouped);

        // Only update the current round if it's not already set or if it no longer exists in the grouped matches
        if (!currentRound || !grouped[currentRound]) {
            setCurrentRound(Object.keys(grouped)[0] || '');
        }
    }, [matches]);

    const groupMatchesByRound = (matches: FixtureItem[]): GroupedMatches => {
        return matches.reduce((acc: GroupedMatches, match) => {
            const round = match.league.round;
            if (!acc[round]) acc[round] = [];
            acc[round].push(match);
            return acc;
        }, {});
    };

    const navigateRounds = (direction: 'next' | 'previous') => {
        const rounds = Object.keys(groupedMatches);
        const currentRoundIndex = rounds.indexOf(currentRound);
        const nextIndex = direction === 'next' ? currentRoundIndex + 1 : currentRoundIndex - 1;
        if (nextIndex >= 0 && nextIndex < rounds.length) {
            setCurrentRound(rounds[nextIndex]);
        }
    };

    const handleGoalsChange = (homeTeamId: number, homeGoals: number | null, awayTeamId: number | null, awayGoals: number | null) => {

        // Update matches with the new goals only for the specific match identified by both home and away team IDs
        const updatedMatches = matches.map((match) => {
            if (match.teams.home.id === homeTeamId && match.teams.away.id === awayTeamId) {
                return {
                    ...match,
                    goals: {
                        home: homeGoals,
                        away: awayGoals,
                    },
                };
            }
            return match;
        });

        setMatches(updatedMatches);// This triggers the useEffect that groups matches by round


        // Recalculate standings based on the updated matches
        const updatedStandings = standings.map((standing) => {
            // Initialize accumulators for wins, draws, losses, goals for, and goals against
            let wins = 0;
            let draws = 0;
            let losses = 0;
            let goalsFor = 0;
            let goalsAgainst = 0;

            // Accumulate results from all matches for this team
            updatedMatches.forEach((match) => {
                const isHome = match.teams.home.id === standing.team.id;
                const isAway = match.teams.away.id === standing.team.id;

                if (isHome || isAway) {
                    const matchGoalsFor = isHome ? match.goals.home : match.goals.away;
                    const matchGoalsAgainst = isHome ? match.goals.away : match.goals.home;

                    goalsFor += matchGoalsFor ?? 0;
                    goalsAgainst += matchGoalsAgainst ?? 0;

                    if (matchGoalsFor !== null && matchGoalsAgainst !== null) {
                        if (matchGoalsFor > matchGoalsAgainst) wins++;
                        else if (matchGoalsFor === matchGoalsAgainst) draws++;
                        else if (matchGoalsFor < matchGoalsAgainst) losses++;
                    }
                }
            });

            const played = wins + draws + losses;
            const points = wins * 3 + draws;
            const goalsDiff = goalsFor - goalsAgainst;

            return {
                ...standing,
                points,
                goalsDiff,
                all: {
                    played,
                    win: wins,
                    draw: draws,
                    lose: losses,
                    goals: {
                        for: goalsFor,
                        against: goalsAgainst,
                    },
                },
            };
        });

        // Sort standings after updating it with new calculations
        const sortedStandings = updatedStandings.sort((a, b) => {
            // Compare by points first
            if (a.points !== b.points) {
                return b.points - a.points;
            }

            // If points are equal, compare by wins
            const aWins = a.all.win;
            const bWins = b.all.win;
            if (aWins !== bWins) {
                return bWins - aWins;
            }

            // If wins are also equal, compare by goal difference
            return b.goalsDiff - a.goalsDiff;
        });

        setStandings(sortedStandings);
        setStandings(updatedStandings);
    };

    // Separate matches into groups of 5
    // matches should be displayed in a carousel with 5 matches per slide.
    // get the first 5 matches
    const totalMatches = groupedMatches[currentRound]?.length || 0;
    // If totalMatches is odd, initialMatches will get the extra match
    const splitIndex = Math.ceil(totalMatches / 2);

    // Split the matches into two groups
    const initialMatches = groupedMatches[currentRound]?.slice(0, splitIndex);
    const lastMatches = groupedMatches[currentRound]?.slice(splitIndex);
    
    const matchesFeedData = [initialMatches, lastMatches];


    return (
        <main className="flex flex-col items-center justify-between min-h-screen w-full p-4 md:p-12">
            <div className='flex flex-col  bg-slate-400 w-full gap-8 md:flex-row md:items-center md:justify-center lg:gap-16'>
                <Carousel className="w-full max-w-md max-h-[300px]  lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl relative">
                    <div className=' bg-slate-400'>
                    <div className="flex flex-row justify-between items-center w-full text-xl font-bold p-2">
                        <button onClick={() => navigateRounds('previous')} className="text-sm md:text-base lg:text-lg">
                            <GrLinkPrevious />
                        </button>
                        <span className="text-xs md:text-sm lg:text-md">{currentRound}</span>
                        <button onClick={() => navigateRounds('next')} className="text-sm md:text-base lg:text-lg">
                            <GrLinkNext />
                        </button>
                    </div>
                    <div className=' '> 
                <CarouselContent>                            
                    {matchesFeedData.map((matches, idx) => {                        
                        return (
                            <CarouselItem
                                key={idx}
                            >
                                <div className="flex flex-col items-center">
                                    {matches?.map((match) => {
                                        const dateFromTimestamp = new Date(match.fixture.timestamp * 1000);
                                        const timeFromTimestamp = dateFromTimestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                        const data = {
                                            homeTeam: match.teams.home.name.substring(0, 3),
                                            homeId: match.teams.home.id,
                                            homeLogo: match.teams.home.logo,
                                            awayTeam: match.teams.away.name.substring(0, 3),
                                            awayId: match.teams.away.id,
                                            awayLogo: match.teams.away.logo,
                                            homeGoals: match.goals.home,
                                            awayGoals: match.goals.away,
                                            venue: match.fixture.venue.name,
                                            date: dateFromTimestamp.toLocaleDateString(
                                                'en-US', {
                                                weekday: 'short',
                                                month: '2-digit',
                                                day: '2-digit',
                                                    year: '2-digit'
                                            }).toUpperCase(),
                                            time: timeFromTimestamp.toUpperCase()
                                        }
                                        return (
                                            <MatchCard
                                                props={data}
                                                onGoalsChange={handleGoalsChange}
                                            />
                                        );
                                    })}
                                </div>
                            </CarouselItem>
                        );                         
                    })}
                </CarouselContent>                        
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
                        </div>
                        </div>
                    <div className='w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl'>
                        <table className="w-full text-xs sm:text-sm md:text-base">
                <StandingsTableHeader />
                <StandingsTableBody standings={standings} />
                </table>
                    </div>
                </Carousel>
            </div>
        </main>
    );
}

