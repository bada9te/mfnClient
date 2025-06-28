export default function RightbarDrawerUserSkeleton() {
    return (
        <div className="card w-80 h-[337px] bg-base-300  shadow-2xl">
            <div className="h-80 w-80 skeleton rounded-b-none"></div>
            <div className="card-body">
                <div className="flex flex-row gap-4 items-center">
                    <div className="h-12 w-12 skeleton rounded-full"></div>
                    <div className="h-6 w-32 skeleton"></div>
                </div>
                <div className="flex flex-row gap-2 flex-wrap mt-3 font-bold">
                    <div className="h-6 w-24 skeleton"></div>
                    <div className="h-6 w-24 skeleton"></div>
                </div>
            </div>
            <div className="skeleton w-80 h-32"></div>
        </div>
    );
}