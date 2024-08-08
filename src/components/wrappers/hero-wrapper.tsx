import Image from "next/image";

export default function HeroWrapper(props: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    const { children, title, description } = props;

    return (
        <div className="w-full p-0 md:px-4 md:pt-4">
            <div className={`hero min-h-screen  md:rounded-2xl shadow-2xl text-white bg-base-300 relative`}>
                <div className="flex w-full flex-col items-center justify-center py-10 relative">
                    <img src="/assets/figures/pyramid.svg" alt="pyramid" className="z-0 absolute top-0 left-72 lg:left-96 w-48 opacity-70"/>
                    <img src="/assets/figures/triangle.svg" alt="triangle" className="z-0 absolute top-0 right-72 lg:right-96 w-24 rotate-90 opacity-70"/>
                    <h1 className="mb-5 text-5xl font-bold text-center z-10">{title}</h1>
                    <p className="mb-5 text-center z-10">{description}</p>
                    <div className="hero-content text-center w-full z-10 mt-5">
                        {children}
                    </div>
                </div>
                <Image 
                    src="/assets/drawings/drawing-5.png" 
                    alt="drawing-2" 
                    className="w-48 md:w-64 lg:w-96 absolute bottom-0 left-0 rounded-2xl"
                    width={500}
                    height={500}
                />
                <Image 
                    src="/assets/bgs/footer.png" 
                    alt="title" 
                    className="w-48 md:w-[460px] lg:w-[600px] absolute bottom-0 right-3 rounded-2xl"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
}