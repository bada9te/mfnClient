import config from "@/../next.config.mjs";
import { usePostsByIdsLazyQuery, User } from "@/utils/graphql-requests/generated/schema";
import { useEffect } from "react";


export default function PlayerTrackInfo() {
    const [fetchPostsDataByIds, {data, loading}] = usePostsByIdsLazyQuery();

    useEffect(() => {
        fetchPostsDataByIds({
            variables: {
                ids: ['66819f3c2746e06bf102dd7a']
            }
        });
    }, [])

    return (
        <div className="flex h-auto flex-col flex-1 gap-1">
            <div className="flex flex-row mb-3 gap-3">
                <img 
                    src={`${config.env?.serverBase}/files/pngtree-abstract-bg-image_914283.png`}
                    className="shadow-2xl max-h-[180px] h-[180px] max-w-80" 
                />

                <div className="flex flex-col gap-1">
                    <div className="stats glass thin-scrollbar h-36">
                        <div className="stat text-center p-3 px-5">
                            <div className={`cursor-pointer`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-8 w-8 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">0X</div>
                        </div>

                        <div className="stat text-center p-3">
                            <div className={`cursor-pointer`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            </div>
                            <div className="stat-title">Total Saves</div>
                            <div className="stat-value text-primary">0X</div>
                        </div>
                    </div>

                    <button className="btn btn-primary glass btn-sm text-white">
                        Track details
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex flex-col relative">
                <div className="join flex flex-row absolute justify-end items-end w-full md:hidden">
                    <button className="join-item btn btn-primary btn-sm glass flex justify-center items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                        </svg>
                    </button>
                    <button className="join-item btn btn-primary btn-sm glass flex justify-center items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="join-item btn btn-primary btn-sm glass flex justify-center items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <p className="text-white text-2xl font-bold">Track title</p>
                <p className="text-white text-md font-bold">Track description</p>
            </div>
        </div>
    );
}