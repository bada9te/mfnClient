export default function HeroWrapper(props: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    const { children, title, description } = props;

    return (
        <div className="w-full p-0 md:px-8 md:pt-8">
            <div className={`hero min-h-screen rounded-none shadow-2xl text-white glass`}>
                <div className="flex w-full flex-col items-center justify-center py-10 relative">
                    <img src="/assets/figures/pyramid.svg" alt="pyramid" className="z-0 absolute top-0 left-72 lg:left-96 w-48 opacity-70"/>
                    <h1 className="mb-5 text-5xl font-bold text-center z-10">{title}</h1>
                    <p className="mb-5 text-center z-10">{description}</p>
                    <div className="hero-content text-center w-full z-10 mt-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}