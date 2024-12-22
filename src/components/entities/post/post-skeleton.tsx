export default function PostSkeleton(props: {
    fullWidth?: boolean;
}) {
    const { fullWidth } = props;

    return (
        <div className={`card w-fit md:${fullWidth ? 'w-full' : 'w-80 max-w-80'} min-h-[360px] bg-base-100 shadow-xl max-h-[550px] text-base-content rounded-xl relative overflow-hidden`}>
            <div className="h-8 w-36 bg-base-100 absolute top-3 left-3 rounded-full flex flex-row items-center gap-1">
                <div className="ml-1 h-7 w-7 rounded-full skeleton"></div>
                <div className="skeleton h-4 w-24"></div>
            </div>
            
            <div className="skeleton h-[140px] w-full min-w-80 rounded-none"></div>


            <div className="card-body text-start p-5 relative">
                <div className="flex flex-row gap-3 items-center">
                    <div className="skeleton h-8 w-40"></div>
                    <div className="skeleton w-20 h-5"></div>
                </div>
                
                <div className="skeleton h-6 w-60"></div>
            </div>
            
            <div className={`flex flex-row flex-wrap gap-2 mx-5 mt-2 thin-scrollbar text-[#b2ccd6] relative`}>
                <div className="skeleton w-20 h-5"></div>
                <div className="skeleton w-20 h-5"></div>
                <div className="skeleton w-20 h-5"></div>
                <div className="skeleton w-20 h-5"></div>
            </div>
                

            <div className="card-actions justify-center p-2 mt-2 flex flex-row text-[#20252e]">
                <div className="skeleton w-full h-8"></div>
            </div>
            
        </div>
    );
}