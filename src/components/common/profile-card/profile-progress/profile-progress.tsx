"use client"
import { useAppSelector } from "@/lib/redux/store";
import { UserAchievementsData } from "@/utils/graphql-requests/generated/schema";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RefreshBtn = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 absolute right-3 top-3 cursor-pointer">
            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
        </svg>
    );
}

export default function ProfileProgress(props: {
    userId: string;
    data: UserAchievementsData;
    achievementsTotal: number;
}) {
    const {userId, data, achievementsTotal} = props;
    const user = useAppSelector(state => state.user.user);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return;
    }

    return (
        <div className="stats stats-vertical lg:stats-horizontal bg-black glass text-primary-content max-w-full">
            <div className="stat relative">
                <div className="stat-title text-center">Current level</div>
                <RefreshBtn/>
                <div className="stat-value flex flex-wrap mt-1 gap-3 justify-center">
                    <Image src={"/assets/icons/trophy.png"} alt="trophy" width={1000} height={1000} className="w-10"/>
                    3
                </div>
                <div className="stat-actions relative">
                    <span className="font-bold absolute top-[-14px]">40</span>
                    <span className="font-bold absolute top-[-14px] right-0">126</span>
                    <progress className="progress w-full min-w-40" value="40" max="100"></progress>
                </div>
            </div>

            <div className="stat relative">
                <div className="stat-title text-center">Challanges completed</div>
                <RefreshBtn/>
                <div className="stat-value text-center">{data.achievements?.length || 0}/{achievementsTotal || '...'}</div>
                <div className="stat-actions">
                    <Link href={`/profile/${user?._id === userId ? "me" : userId}/achievements`} className="btn btn-sm btn-primary glass text-white w-full">List of challenges</Link>
                </div>
            </div>

            <div className="stat relative">
                <div className="stat-title text-center">Total likes</div>
                <RefreshBtn/>
                <div className="stat-value text-center flex items-center justify-center">
                    {data.totalLikes}
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" fill="currentColor" className="inline-block h-8 w-8">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                </div>
                <div className="stat-actions">
                    <button className="btn btn-sm btn-primary glass text-white w-full">Most liked tracks</button>
                </div>
            </div>

            <div className="stat relative">
                <div className="stat-title text-center">Total saves</div>
                <RefreshBtn/>
                <div className="stat-value text-center flex items-center justify-center">
                    {data.totalSaves}
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" fill="currentColor" className="inline-block h-8 w-8">
                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="stat-actions">
                    <button className="btn btn-sm btn-primary glass text-white w-full">Most saved tracks</button>
                </div>
            </div>
        </div>
    );
}