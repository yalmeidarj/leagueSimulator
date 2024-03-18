'use client'
// pages/League.tsx
import React, { useEffect, useState } from 'react';
import {
    getLeagueStandingBySeason,
    getRounds,
    getAllMatchesByLeagueSeason
} from '@/app/lib/actions';
import {RoundsApiType} from '@/app/lib/types/roundsType';
import {FixtureResponse} from '@/app/lib/types/fixtureType';
import { standingsApiObjType } from '@/app/lib/types/standingsType';
import RankTable from './RankTable';
import RoundsSelector from './RoundsSelector';

function League() {
    const [standings, setStandings] = useState<standingsApiObjType | null>(null);
    const [currentRound, setCurrentRound] = useState<string | null>(null); // Adjust type based on your needs
    const [rounds, setRounds] = useState<RoundsApiType | null>(null);
    const [fixtures, setFixtures] = useState<FixtureResponse | null>(null);

    // Assuming league and season are predetermined or fetched elsewhere
    const league = '71';
    const season = '2023';



    useEffect(async () => {
        // Fetch initial data
        // const standingsRes = fetchLeagueStandingForSeasonLeague(league, season);

        setStandings(standings);
        const roundsRes = await getRounds(league, season);
        setRounds(roundsRes);
        // setCurrentRound(roundsRes.response[0]);
        // getRounds(league, season).then(data => {
        //     setRounds(data);
        //     setCurrentRound(data.response[0]);
        //     console.log(data);
        // });
    }, [league, season]);

    useEffect(() => {
        if (currentRound) {
            getAllMatchesByLeagueSeason(league, season).then(setFixtures);
        }
    }, [league, season]);



    return (
        <div className="container mx-auto">
            <RankTable standings={standings} />
            <RoundsSelector rounds={rounds} currentRound={currentRound} setCurrentRound={setCurrentRound} fixtures={fixtures} />
        </div>
    );
};

export default League;
