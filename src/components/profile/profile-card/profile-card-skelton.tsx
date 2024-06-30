export default function ProfileCardSkeleton() {
    return (
        <div className="card w-full max-h-screen bg-base-100 shadow-xl rounded-none text-black">
            <div className="skeleton h-40 md:h-48 w-full"></div>
            
            <div className="card-body flex flex-col md:flex-row gap-5">
                <div className="avatar flex justify-center">
                    <div className="w-32 h-32 mask mask-hexagon skeleton"></div>
                </div>
                <div>
                    <h2 className="card-title flex flex-col md:flex-row">
                        <div className="skeleton w-28 h-7"></div>
                        <div className="badge skeleton w-24 h-5"></div>
                        <div className="badge skeleton w-24 h-5"></div>
                    </h2>
                    <div className="mt-3 skeleton w-64 h-4"></div>
                    <div className="card-actions justify-start mt-3">
                        <div className="h-12 w-full md:w-72 skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}