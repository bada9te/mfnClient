export default function HeroWrapper(props: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    const { children, title, description } = props;

    return (
        <div className={`hero min-h-screen rounded-none text-white`}>
            <div className="flex w-full flex-col items-center justify-center py-10">
                <h1 className="mb-5 text-5xl font-bold text-center">{title}</h1>
                <p className="mb-5 text-center">{description}</p>
                <div className="hero-content text-center w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}