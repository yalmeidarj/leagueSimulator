import { FaHandPointer } from "react-icons/fa";


export default function LeagueCTA() {
    return (
        <div
            className=" h-4/5  flex flex-col gap-6 items-center justify-around"
        >
            <div className=' md:hidden  flex flex-col  items-center justify-center'>
                <FaHandPointer className="scroll-hint" />
                <span>
                SCROLL TO VIEW MORE
                </span>
            </div>
            <div className='mt-[14rem] items-center text-start h-[25rem] text-4xl  text-white bg-gradient-to-tr from-custom-foreground to-custom-text rounded-lg shadow-lg p-4'>
            

            <h1>Please select a League to simulate...</h1>
            </div>
        </div>
    );
}