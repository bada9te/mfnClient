import PostSkeleton from "../post/post-skeleton";

export default function BattleSkeleton() {
    return (
        <div className="card bg-base-100  w-full">
            <div className="card-body justify-center items-center flex flex-col gap-5 p-0 md:p-4">
                <div className="skeleton w-full h-8 shadow-md shrink-0"></div>
                <div className="flex flex-wrap gap-5 justify-center items-center flex-col lg:flex-row">
                    {/* left */}
                    <div className="flex flex-nowrap flex-col w-80">
                        <PostSkeleton fullWidth/>
                        <div className="py-2 join join-vertical mt-3">
                            <div className="join-item skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                            <div className="join-item skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                        </div>
                    </div>

                    {/* mid */}
                    <div className="stats stats-vertical shadow-md w-64 bg-base-100">
                        <div className="stat place-items-center">
                            <div className="skeleton w-full h-20 shadow-md shrink-0"></div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="skeleton w-full h-8 shadow-md shrink-0"></div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="skeleton w-full h-20 shadow-md shrink-0"></div>
                        </div>
                    </div>


                    {/* right */}
                    <div className="flex flex-nowrap flex-col w-80">
                        <PostSkeleton fullWidth/>
                        <div className="py-2 join join-vertical mt-3">
                            <div className="join-item skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                            <div className="join-item skeleton w-full h-8 rounded-full shadow-md shrink-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}