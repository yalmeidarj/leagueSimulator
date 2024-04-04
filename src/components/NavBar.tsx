import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
    return (
        <div className='bg-custom-background flex flex-row text-custom-text h-[80px]  '>
            <div className=' w-full flex flex-row justify-between items-center  bg-custom-foreground h-4/4'>
                <div className='absolute top-0 flex justify-between w-full'>
                    <Link
                        href="/"
                        className="hover:text-br-yellow"
                    >
                        <Image
                            src="/logo3.png"
                            alt="League Simulator Logo"
                            width={90}
                            height={90}
                            className="pb-4 rounded-r-full bg-custom-background mr-[1rem] hover:scale-110 transform transition duration-300 ease-in-out"
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
    );
}