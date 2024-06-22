import PostSkeleton from "@/components/entities/post/post-skeleton";

export default function BattleSkeleton() {
    return (
        <div className="card bg-base-100 w-full">
            <div className="card-body justify-center items-center flex flex-col gap-5 p-4">
                <div className="skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                <div className="flex flex-wrap gap-5 justify-center items-center flex-col lg:flex-row">
                    {/* left */}
                    <div className="flex flex-nowrap flex-col w-72 md:w-80">
                        <PostSkeleton/>
                        <div className="p-2 join join-vertical mt-3">
                            <div className="join-item skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                            <div className="join-item skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                        </div>
                    </div>

                    {/* mid */}
                    <div className="stats stats-vertical shadow-md w-64">
                        <div className="stat place-items-center">
                            <div className="skeleton w-32 h-20 rounded-xl shadow-md shrink-0"></div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="skeleton w-full h-8 rounded-xl shadow-md shrink-0"></div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="skeleton w-32 h-20 rounded-xl shadow-md shrink-0"></div>
                        </div>
                    </div>


                    {/* right */}
                    <div className="flex flex-nowrap flex-col w-72 md:w-80">
                        <PostSkeleton/>
                        <div className="p-2 join join-vertical mt-3">
                            <div className="join-item skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                            <div className="join-item skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}