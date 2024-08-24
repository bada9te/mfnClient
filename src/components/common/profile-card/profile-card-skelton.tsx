export default function ProfileCardSkeleton() {
    return (
        <div className={`m-2 mt-6 md:m-4 mb-0 card w-full text-white rounded-2xl md:rounded-2xl shadow-2xl bg-base-100`}>
            <div className="skeleton h-40 md:h-48 w-full"></div>
            
            <div className="card-body flex flex-col gap-5">
                <div className="avatar flex justify-center">
                    <div className="w-32 h-32 mask mask-hexagon skeleton"></div>
                </div>
                <div className="flex w-full justify-center items-center flex-col">
                    <h2 className="card-title flex flex-col md:flex-row">
                        <div className="skeleton w-28 h-7"></div>
                        <div className="badge skeleton w-24 h-5"></div>
                        <div className="badge skeleton w-24 h-5"></div>
                    </h2>
                    <div className="mt-3 skeleton w-64 h-4"></div>
                </div>
                
                <div className="h-12 w-full skeleton"></div>
                <div className="h-36 w-full skeleton"></div>
            </div>
        </div>
    );
}