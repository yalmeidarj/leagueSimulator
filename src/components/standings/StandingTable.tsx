import StandingsTableHeader from "./StandingsTableHeader";

export default function StandingsTable({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl'>
            <table className="w-full text-xs sm:text-sm md:text-base">
                <StandingsTableHeader />
                {children}
            </table>
        </div>
    );
}