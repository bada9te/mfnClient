export default function PostSkeleton(props: {
    fullWidth?: boolean;
}) {
    const { fullWidth } = props;

    return (
        <div className={`card w-fit md:${fullWidth ? 'w-full rounded-none' : 'w-80 max-w-80'} bg-black shadow-xl max-h-[550px] text-white glass`}>
            <div className="skeleton h-16 w-80 shadow-md"></div>
            

            <div className="skeleton w-80 h-[180px]"></div>

            <div className="card-body text-start p-5">
                <h2 className="card-title">
                    <div className="skeleton h-8 w-36 shadow-md"></div>
                </h2>
                <div className="skeleton h-6 w-48 shadow-md"></div>
            </div>
            <div className="skeleton h-[130px] w-80 shadow-md my-2"></div>
            <div className="skeleton h-12 w-80 shadow-md"></div>
        </div>
    );
}