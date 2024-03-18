"use client"
import Image from "next/image";
import { useState, useEffect } from "react";


type MatchProps = {
    homeTeam: string,
    homeId: number,
    homeLogo: string | null,
    awayTeam: string | null,
    awayId: number,
    awayLogo: string,
    homeGoals: number | null,
    awayGoals: number | null,
    venue: string,
    date: string,
    time: string
}

type MatchCardProps = {
    props: MatchProps,
    onGoalsChange: (
        homeTeamId: number,
        awayTeamId: number,
        homeGoals: number | null,
        awayGoals: number | null) => void;
}
export default function MatchCard({ props, onGoalsChange }: MatchCardProps) {
    const [homeGoals, setHomeGoals] = useState<number | null>(props.homeId);
    const [awayGoals, setAwayGoals] = useState<number | null>(props.awayId);

    useEffect(() => {
        setHomeGoals(props.homeGoals);
        setAwayGoals(props.awayGoals);
    }, [props.homeGoals, props.awayGoals]);

    // This function is called whenever the home or away goals input values change.
    // It updates the local state and also propagates the change up to the parent component.
    const handleGoalInputChange = (team: 'home' | 'away', goals: number | null) => {
        if (team === 'home') {
            setHomeGoals(goals);
            onGoalsChange(props.homeId, goals as number, props.awayId, awayGoals as number);
        } else {
            setAwayGoals(goals);
            onGoalsChange(props.homeId, homeGoals as number, props.awayId, goals as number);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-4/5 sm:w-72 border border-solid border-white py-2 bg-white">
            <div className='flex flex-row justify-between text-start text-xs w-full px-2'>
                <p className="truncate max-w-[30%]">{props.date}</p>
                <p className="truncate max-w-[40%]">{props.venue.substring(0, 15)}</p>
                <p className="truncate max-w-[30%]">{props.time}</p>
            </div>
            <div className='flex flex-row justify-between items-center w-full px-2'>
                <div className='flex flex-row items-center gap-2'>
                    <h1 className='text-lg font-thin truncate max-w-[80px]'>{props.homeTeam}</h1>
                    <Image
                        width="26"
                        height="26"
                        src={props.homeLogo as string}
                        alt={`${props.homeTeam}'s Logo`}
                        className="w-6 h-6"
                    />
                    <span>{homeGoals}</span>
                </div>
                <form className="flex flex-row items-center gap-2">
                    <input
                        type="number"
                        id="homeGoals"
                        min="0"
                        max="10"
                        value={homeGoals === null ? '' : homeGoals.toString()}
                        onChange={(e) => handleGoalInputChange('home', e.target.value ? parseInt(e.target.value) : null)}
                        className='text-slate-800 w-10 text-center'
                    />
                    <span className="text-lg text-slate-200">X</span>
                    <input
                        type="number"
                        id="awayGoals"
                        min="0"
                        max="10"
                        value={awayGoals !== null ? awayGoals : ''}
                        onChange={(e) => handleGoalInputChange('away', e.target.value ? parseInt(e.target.value) : null)}
                        className='text-slate-800 w-10 text-center'
                    />
                </form>
                <div className='flex flex-row items-center gap-2'>
                    <span>{awayGoals}</span>
                    <Image
                        width="26"
                        height="26"
                        src={props.awayLogo as string}
                        alt={`${props.awayTeam}'s Logo`}
                        className="w-6 h-6"
                    />
                    <h1 className='text-lg font-thin truncate max-w-[80px]'>{props.awayTeam}</h1>
                </div>
            </div>
        </div>
    );
}