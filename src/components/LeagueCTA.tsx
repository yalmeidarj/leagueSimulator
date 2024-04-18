import { FaHandPointer } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi";


export default function LeagueCTA() {
    return (
        <div
            className="relative min-h-[75vh]  flex flex-col  items-center justify-around"
        >
            {/* <div className='absolute top-0 lg:hidden  flex flex-col  items-center justify-center'>
                <FaHandPointer className="scroll-hint" />
                <span>
                SCROLL TO VIEW MORE
                </span>
            </div> */}
            <div className='flex flex-col w-full gap-4 justify-around items-center text-start h-[20rem] text-4xl  text-white bg-gradient-to-tr from-custom-foreground to-custom-text rounded-lg shadow-lg p-4'>
            <h1>Please select a League to simulate...</h1>
                <GiSoccerBall className="self-center animate-bounce h-10 w-10 text-custom-background" />
            </div>
        </div>
    );
}