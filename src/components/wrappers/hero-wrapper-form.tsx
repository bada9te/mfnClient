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
            <div className={`hero min-h-screen ${bgStyles} rounded-none md:rounded-2xl h-fit shadow-2xl`}>
                <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                <div className="flex w-full flex-col items-center justify-center py-10 min-h-screen">
                    <div className="hero-content text-center w-full flex flex-col">
                        <div>
                            <h1 className="mb-5 text-5xl font-bold text-white text-center">{title}</h1>
                            <p className="mb-5 text-white text-center">{description}</p>
                        </div>
                        <div className={`card shrink-0 w-full ${!fullWidth && "max-w-md"} shadow-2xl bg-base-100`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}