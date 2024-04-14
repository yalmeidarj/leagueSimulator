import { FaHandPointer } from "react-icons/fa";


export default function LeagueCTA() {
    return (
        <div
            className="relative min-h-screen  flex flex-col  items-center justify-around"
        >
            <div className='absolute top-0 lg:hidden  flex flex-col  items-center justify-center'>
                <FaHandPointer className="scroll-hint" />
                <span>
                SCROLL TO VIEW MORE
                </span>
            </div>
            <div className='  items-center text-start h-[20rem] text-4xl  text-white bg-gradient-to-tr from-custom-foreground to-custom-text rounded-lg shadow-lg p-4'>
            <h1>Please select a League to simulate...</h1>
            </div>
        </div>
    );
}