import Link from "next/link";
import Image from "next/image";
import LeagueFeed from "./LeagueFeed";


export default function NavBar() {
    return (
        <>
        <div className='relative bg-custom-background flex flex-col text-custom-text   '>
            <div className=' w-full flex flex-row justify-between items-center  bg-custom-foreground h-4/4'>
                    <div className='z-20 absolute top-0 flex justify-between w-auto'>
                    <Link
                        href="/"
                        className="hover:text-br-yellow"
                    >
                        <Image
                            src="/logo3.png"
                            alt="League Simulator Logo"
                            width={90}
                            height={90}
                                className="py-1.5  rounded-r-full
                                 bg-gradient-to-tr from-custom-gradient to-custom-gradientSecond 
                                 mr-[1rem] hover:scale-110 transform transition duration-300 ease-in-out"
                        />
                    </Link>

                </div>

                <div className='flex w-full justify-end pr-[1rem]'>
                    <h1 className='text-2xl font-bold text-custom-background'>
                        {/* <h1 className='text-2xl font-bold bg-gradient-to-tr from-custom-background to-custom-foreground text-transparent bg-clip-text'> */}
                        League Simulator
                    </h1>
                </div>
            </div>
        </div>
            <LeagueFeed />
        </>
    );
}