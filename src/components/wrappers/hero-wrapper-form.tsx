import Image from "next/image";

export default function HeroWrapperForm(props: {
    children: React.ReactNode;
    bgStyles: string;
    title: string;
    description: string;
    fullWidth?: boolean;
}) {
    const { bgStyles, children, title, description, fullWidth } = props;

    return (
        <div className="w-full p-0 md:px-8 md:pt-8">
            <div className={`hero min-h-screen rounded-none h-fit shadow-2xl relative`}>
                <div className="hero-overlay glass rounded-none"></div>
                <div className="flex w-full flex-col items-center justify-center py-10 min-h-screen z-10">
                    <div className="hero-content text-center w-full flex flex-col relative">
                            <h1 className="mb-5 text-5xl font-bold text-white text-center z-20">{title}</h1>
                            <p className="mb-5 text-white text-center z-20">{description}</p>
                            <Image 
                                src="/assets/figures/cube.svg" 
                                alt="drawing-1" 
                                className="w-48 absolute top-3 right-56 lg:right-96 z-0 opacity-75"
                                width={500}
                                height={500}
                            />
                        <div className={`card shrink-0 w-full ${!fullWidth && "max-w-md"} shadow-2xl bg-base-100`}>
                            {children}
                        </div>
                    </div>
                </div>
                <Image 
                    src="/assets/drawings/drawing-1.png" 
                    alt="drawing-1" 
                    className="w-48 md:w-64 lg:w-80 absolute bottom-0 right-0 opacity-75"
                    width={1000}
                    height={1000}
                />
                <Image 
                    src="/assets/drawings/drawing-5.png" 
                    alt="drawing-2" 
                    className="w-48 md:w-64 lg:w-96 absolute bottom-0 left-0 opacity-75"
                    width={1000}
                    height={1000}
                />
            </div>
        </div>
    );
}