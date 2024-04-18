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
import StandingsTableHeader from "./standings/StandingsTableHeader";
import StandingsTableBody from "./standings/StandingsTableBody";
import MatchCard from "./MatchCard";
import StandingsTable from "./standings/StandingTable";


type Props = {
    matchData: FixtureItem[];
    standingsData: StandingsItem[];
    fetchedCurrentRound: string[];
};

type SimulatorProps = {
    simulatorData: Props;
};

type GroupedMatches = Record<string, FixtureItem[]>;

export default function Simulator({ simulatorData }: SimulatorProps) {
    const { matchData, standingsData, fetchedCurrentRound } = simulatorData;
    const [matches, setMatches] = useState<FixtureItem[]>(matchData);
    const [standings, setStandings] = useState<StandingsItem[]>(standingsData);
    const [currentRound, setCurrentRound] = useState<string>(fetchedCurrentRound[0]);
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

    
    const totalMatches = groupedMatches[currentRound]?.length || 0;

    // Separate matches into 2 groups to be displayed in a carousel.
    // Each group will contain half of the total matches for the current round.
    
    // If totalMatches is odd, initialMatches will get the extra match
    const splitIndex = Math.ceil(totalMatches / 2);
    const initialMatches = groupedMatches[currentRound]?.slice(0, splitIndex);
    const lastMatches = groupedMatches[currentRound]?.slice(splitIndex);

    const matchesFeedData = [initialMatches, lastMatches];

    return (
        <main className="flex flex-col  items-center  min-h-screen w-full sm:p-4 md:p-12 ">
            <div className='flex flex-col  w-full mt-2 sm:flex-row-reverse md:items-start md:justify-between lg:gap-16'>
                <Carousel className="w-full  max-h-auto lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl shadow-md rounded-lg relative">
                    <div className=' rounded-md w-full  '>
                        <div className=" rounded-tl-md rounded-tr-md flex flex-row justify-between items-center w-full text-background text-xl font-semibold p-2 bg-custom-foreground">
                        <button onClick={() => navigateRounds('previous')} className="text-sm md:text-base lg:text-lg">
                            <GrLinkPrevious
                                className="m-2"
                            />
                        </button>
                        <span className="text-xs md:text-sm lg:text-md">{currentRound}</span>
                        <button onClick={() => navigateRounds('next')} className="text-sm md:text-base lg:text-lg">
                            <GrLinkNext
                                className="m-2"
                            />
                        </button>
                    </div>
                        <div className=' '> 
                <CarouselContent>                            
                    {matchesFeedData.map((matches, idx) => {                        
                        return (
                            <CarouselItem
                                key={idx}
                            >
                                <div className="flex flex-col w-full items-center  gap-2">
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
                <CarouselPrevious className="absolute left-6 text-4xl bg-custom-foreground text-custom-background top-1/2 transform -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-6 text-4xl bg-custom-foreground text-custom-background top-1/2 transform -translate-y-1/2 z-10" />
                        </div>
                    </div>
                </Carousel>                    
                <StandingsTable>
                    <StandingsTableBody
                        standings={standings}
                    />
                </StandingsTable>
            </div>
        </main>
    );
}

