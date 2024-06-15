export default function HeroWrapper(props: {
    children: React.ReactNode;
    bgStyles: string;
    title: string;
    description: string;
}) {
    const { bgStyles, children, title, description } = props;

    return (
        <div className={`hero min-h-screen ${bgStyles} rounded-none`}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="flex w-full flex-col items-center justify-center py-10">
                <h1 className="mb-5 text-5xl font-bold text-white text-center">{title}</h1>
                <p className="mb-5 text-white text-center">{description}</p>
                <div className="hero-content text-center w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}