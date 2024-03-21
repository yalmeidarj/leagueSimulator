type Form = {
    form: string;
};

const getBgClass = (char: string) => {
    switch (char) {
        case 'W':
            return 'bg-green-500'; // green background for 'W'
        case 'D':
            return 'bg-yellow-500'; // yellow background for 'D'
        case 'L':
            return 'bg-red-500'; // red background for 'L'
        default:
            return ''; // default background if it's none of W, D, L
    }
};

export default function FormView({ form }: Form) {

    if (form === null) {
        return (
            <>
                <div className='flex flex-row max-w-[200px]'>
                    <span className={`mx-0.5 p-1 text-sm font-bold rounded-sm`}>
                        -
                    </span>
                </div>
            </>
        );
    }
    else {
        const formArray = form.split('');

        return (
            <>
                <div className='flex flex-row max-w-[200px]'>
                    {
                        formArray.map((char: string, index: number) => {
                            return (
                                <span key={index} className={`${getBgClass(char)} mx-0.5 p-1 text-xs font-thin rounded-sm`}>
                                    {char}
                                </span>
                            );
                        })
                    }
                </div>
            </>
        );
    }
}