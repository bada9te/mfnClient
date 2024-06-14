export default function HeroWrapper(props: {
    children: React.ReactNode;
    imgUrl: string;
}) {
    const { imgUrl, children } = props;

    return (
        <div className={`hero min-h-screen bg-[${imgUrl}] bg-right rounded-none`}>
            <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
            <div className="hero-content text-center">
                {children}
            </div>
        </div>
    );
}