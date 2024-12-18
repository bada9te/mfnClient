export default function PostSkeleton(props: {
    fullWidth?: boolean;
}) {
    const { fullWidth } = props;

    return (
        <div className={`card w-fit md:${fullWidth ? 'w-full ' : 'w-80 max-w-80'} bg-base-300 shadow-xl max-h-[550px] text-base-content `}>
            <div className="p-2">
                <div className="skeleton h-14 w-full shadow-md rounded-2xl"></div>
            </div>
            

            <div className="skeleton w-80 h-[180px] rounded-none"></div>

            <div className="card-body text-start p-5">
                <h2 className="card-title">
                    <div className="skeleton h-8 w-36 shadow-md"></div>
                </h2>
                <div className="skeleton h-6 w-48 shadow-md"></div>
            </div>

            <div className="p-2">
                <div className="skeleton h-[130px] w-full shadow-md"></div>
            </div>
            <div className="skeleton h-14 w-full shadow-md rounded-2xl rounded-t-none"></div>
        </div>
    );
}