// components/RoundsSelector.tsx
import React from 'react';
import { RoundsApiType } from '@/lib/types/roundsType';
import { FixtureResponse } from '@/lib/types/fixtureType';

interface RoundsSelectorProps {
    rounds: RoundsApiType | null;
    currentRound: string | null;
    setCurrentRound: (round: string) => void;
    fixtures: FixtureResponse | null;
}

const RoundsSelector: React.FC<RoundsSelectorProps> = ({ rounds, currentRound, setCurrentRound, fixtures }) => {
    if (!rounds) return <div>Loading...</div>;

    const handlePrevNextRound = (direction: 'prev' | 'next') => {
        const currentIndex = rounds.response.findIndex((round) => round === currentRound);
        if (direction === 'prev' && currentIndex > 0) {
            setCurrentRound(rounds.response[currentIndex - 1]);
        } else if (direction === 'next' && currentIndex < rounds.response.length - 1) {
            setCurrentRound(rounds.response[currentIndex + 1]);
        }
    };

    return (
        <div className="flex justify-between items-center my-4">
            <button onClick={() => handlePrevNextRound('prev')}>&lt; Prev</button>
            <span>Round: {currentRound}</span>
            <button onClick={() => handlePrevNextRound('next')}>Next &gt;</button>
        </div>
    );
};

export default RoundsSelector;