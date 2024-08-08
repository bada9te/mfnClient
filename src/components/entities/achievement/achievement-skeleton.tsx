export default function AchievementSkeleton() {
    return (
        <div className="card bg-base-300 glass text-neutral-content w-80 relative">
            <div className="w-2 h-full absolute skeleton"></div>

            <div className="card-body items-center text-center">
                <div className="card-title font-bold skeleton w-64 h-6 mt-1"></div>
                <div className="skeleton h-3 w-64 mt-2"></div>
                <div className="skeleton h-3 w-64"></div>

                <div className="relative mt-5 w-full">
                    <div className="skeleton w-full h-4"></div>
                </div>
            </div>
        </div>
    );
}