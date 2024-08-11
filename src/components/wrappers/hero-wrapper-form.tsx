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
        <div className="w-full p-2 pt-4 md:px-4 md:pt-4">
            <div className={`hero min-h-screen h-fit shadow-2xl relative rounded-2xl`}>
                <div className="hero-overlay rounded-2xl bg-base-300 bg-opacity-80"></div>
                <div className="flex w-full flex-col items-center justify-center py-10 min-h-screen z-10 overflow-hidden">
                    <div className="hero-content text-center w-full flex flex-col relative">
                            <h1 className="mb-5 text-5xl font-bold text-white text-center z-20">{title}</h1>
                            <p className="mb-5 text-white text-center z-20">{description}</p>
                            <Image 
                                src="/assets/figures/cube.svg" 
                                alt="drawing-1" 
                                className="w-48 absolute top-3 right-56 lg:right-96 z-0 "
                                width={400}
                                height={400}
                            />
                        <div className={`card shrink-0 w-full ${!fullWidth && "max-w-md"} shadow-2xl bg-base-300`}>
                            {children}
                        </div>
                    </div>
                </div>
                <Image 
                    src="/assets/drawings/drawing-1.png" 
                    alt="drawing-1" 
                    className="w-48 md:w-64 lg:w-80 absolute bottom-0 right-0 rounded-2xl"
                    width={500}
                    height={500}
                />
                <Image 
                    src="/assets/drawings/drawing-5.png" 
                    alt="drawing-2" 
                    className="w-48 md:w-64 lg:w-96 absolute bottom-0 left-0 rounded-2xl"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
}