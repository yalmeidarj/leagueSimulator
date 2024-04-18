"use client"
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";

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

    const formattedDate = new Date(props.date).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    });


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

    // Button component for incrementing and decrementing goals
    const GoalButton = ({ team, increment, className }: { team: 'home' | 'away', increment: boolean, className?:string }) => (
        <button
            aria-label={increment ? `Increase ${team} goals` : `Decrease ${team} goals`}
            className={cn(" font-bold bg-[#969696] text-white text-lg w-full")}
            onClick={() => handleGoalInputChange(team, increment ? (team === 'home' ? Number(homeGoals) + 1 : Number(awayGoals) + 1) : (team === 'home' ? Number(homeGoals) - 1 : Number(awayGoals) - 1))}
        >
            {increment ? '+' : '-'}
        </button>
    );
    return (
        // Updated component layout and styling to match the provided image
        <div className="flex flex-col items-center justify-around w-full  border my-0.5  p-0.5 text-custom-text  ">
            <p className='text-xs font-light'>
            {formattedDate} {props.time}
            
            </p>            
            <div className='flex  items-center justify-between w-full text-sm  gap-1 '>
                <div className='flex items-center justify-between gap-2 w-full mx-0.5'>
                    <div className='flex justify-end w-full '>                
                        <h1 className='text-lg font-bold truncate'>{props.homeTeam}</h1>
                        <Image
                            width="30"
                            height="30"
                            src={props.homeLogo as string}
                            alt={`${props.homeTeam}'s Logo`}
                            className=""
                            />
                    </div>
                    <div className='max-w-[5rem] grid grid-cols-2 w-full gap-0.5 '>
                        <div className='flex flex-col gap-0.5 '>                   
                            <GoalButton team="home" increment={true} />
                            <GoalButton team="home" increment={false} />
                        </div>
                        <input
                            type="number"
                            id="homeGoals"
                            min="0"
                            max="10"
                            value={homeGoals === null ? '' : homeGoals.toString()}
                            onChange={(e) => handleGoalInputChange('home', e.target.value ? parseInt(e.target.value) : null)}
                            className='bg-[#34383C] text-white font-bold h-full sm:min-w-0   text-center'
                        />
                    </div>
                </div>
                <div className="group relative flex flex-col text-xl  border-b border-transparent transition duration-300 ease-in-out transform hover:text-br-yellow hover:border-br-yellow hover:scale-105">
                    <div className='absolute  invisible group-hover:visible  text-white '>
                        {/* <p><strong>Coming soon...</strong></p> */}
                        <CtaSubscribe
                            
                        />
                    </div>
                    <MdQueryStats className="cursor-pointer" />
                </div>
                <div className='flex justify-between items-center mx-0.5 gap-2 w-full '>
                    
                    <div className='max-w-[5rem] grid grid-cols-2 w-full gap-0.5'>
                        <input
                            type="number"
                            id="awayGoals"
                            min="0"
                            max="10"
                            value={awayGoals !== null ? awayGoals : ''}
                            onChange={(e) => handleGoalInputChange('away', e.target.value ? parseInt(e.target.value) : null)}
                            className='bg-[#34383C] text-white font-bold h-full sm:min-w-0    text-center'
                        />
                        <div className='flex flex-col gap-0.5'>
                            <GoalButton team="away" increment={true} />
                            <GoalButton team="away" increment={false} />
                        </div>
                    </div>
                <div className='flex justify-self-start  w-full justify-start items-center '>
                <Image
                    width="30"
                    height="30"
                    src={props.awayLogo as string}
                    alt={`${props.awayTeam}'s Logo`}
                    className=""
                />
                <h1 className='text-lg font-semibold truncate'>{props.awayTeam}</h1>
                    </div>
                </div>            
            </div>
        </div>
    );

}


function CtaSubscribe() {
    return (
        <div className="flex flex-col z-40  items-center p-2 rounded-md justify-center min-w-[14rem]  w-full  bg-gradient-to-r from-[#38bdf8] to-[#9333ea] ">
            <div    className="flex flex-row items-center gap-1">
                <h1 className="text-xl font-bold">Coming Soon!</h1>
                <Link
                    href="#"
                    className="hover:text-br-yellow">
                    <div className='flex flex-row underline max-w-auto gap-0.5 items-center
                    hover:text-custom-text text-custom-foreground hover:translate-x-1 transform transition duration-200 ease-in-out
                    cursor-pointer
                    '>
                        <h3 className="text-xs w-full font-bold">
                            View more
                        </h3>
                        <FaExternalLinkAlt />
                    </div>
                
                </Link>
            
            </div>
            <p className="text-sm">Get notified when this (and more) is available.</p>
            <div className='flex w-full flex-col items-center'>
            
            <input type="email"
                    className="p-2 w-full mt-2 rounded-md text-sm  text-custom-text"
                placeholder="Email"
                />
            <button className="self-end bg-white text-black text-sm p-1 rounded-md mt-2">Let me know!</button>
                </div>
        </div>
    );
}

