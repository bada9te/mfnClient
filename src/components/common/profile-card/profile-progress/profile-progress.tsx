"use client"
import { getDictionary } from "@/dictionaries/dictionaries";
import { useAppSelector } from "@/lib/redux/store";
import { UserAchievementsData, UserAchievementsDataQuery } from "@/utils/graphql-requests/generated/schema";
import { ApolloQueryResult } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RefreshBtn = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 absolute left-3 top-3 cursor-pointer">
            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
        </svg>
    );
}

export default function ProfileProgress(props: {
    userId: string;
    data: UserAchievementsData;
    achievementsTotal: number;
    totalRP: number;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
    refreshStatistics: () => Promise<ApolloQueryResult<UserAchievementsDataQuery>>;
}) {
    const {userId, data, achievementsTotal, refreshStatistics, totalRP, dictionary} = props;
    const user = useAppSelector(state => state.user.user);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return;
    }

    return (
        <div className="stats stats-vertical lg:stats-horizontal glass max-w-full rounded-2xl text-white">
            <div className="stat relative">
                <div className="stat-title text-center">{dictionary.common["profile-card"]["profile-progress"].level}</div>
                <span onClick={refreshStatistics}><RefreshBtn/></span>
                <div className="stat-value flex flex-wrap mt-1 gap-3 justify-center">
                    <Image src={"/assets/icons/trophy.png"} alt="trophy" width={1000} height={1000} className="w-10"/>
                    {Math.floor((totalRP) / 800) + 1}
                </div>
                <div className="stat-actions relative">
                    <span className="font-bold absolute top-[-14px]">{totalRP}</span>
                    <span className="font-bold absolute top-[-14px] right-0">800</span>
                    <progress className="progress w-full min-w-40" value={totalRP} max={800}></progress>
                </div>
            </div>

            <div className="stat relative">
                <div className="stat-title text-center">{dictionary.common["profile-card"]["profile-progress"].challenges}</div>
                <div className="stat-value text-center flex flex-wrap mt-1 gap-3 justify-center">
                    <Image src={"/assets/icons/challenge.png"} alt="trophy" width={1000} height={1000} className="w-10"/>
                    {data.achievements?.length || 0}/{achievementsTotal || '...'}</div>
                <div className="stat-actions">
                    <Link href={`/profile/${user?._id === userId ? "me" : userId}/achievements`} className="btn btn-sm btn-primary glass text-white w-full">{dictionary.common["profile-card"]["profile-progress"]["list-of-challenges"]}</Link>
                </div>
            </div>

            <div className="stat relative">
                <div className="stat-title text-center">{dictionary.common["profile-card"]["profile-progress"]["total-likes"]}</div>
                <div className="stat-value text-center flex flex-wrap mt-1 gap-3 justify-center">
                    <Image src={"/assets/icons/heart.png"} alt="trophy" width={1000} height={1000} className="w-10"/>
                    {data.totalLikes}
                </div>
                <div className="stat-actions">
                    <Link href={`/post/${data.maxLikesPostId}/${userId}`} className="btn btn-sm btn-primary glass text-white w-full">{dictionary.common["profile-card"]["profile-progress"]["most-liked-track"]}</Link>
                </div>
            </div>

            <div className="stat relative">
                <div className="stat-title text-center">{dictionary.common["profile-card"]["profile-progress"]["total-saves"]}</div>
                <div className="stat-value text-center flex flex-wrap mt-1 gap-3 justify-center">
                    <Image src={"/assets/icons/bookmark.png"} alt="trophy" width={1000} height={1000} className="w-10"/>
                    {data.totalSaves}
                </div>
                <div className="stat-actions">
                    <Link href={`/post/${data.maxSavesPostId}/${userId}`} className="btn btn-sm btn-primary glass text-white w-full">{dictionary.common["profile-card"]["profile-progress"]["most-saved-track"]}</Link>
                </div>
            </div>
        </div>
    );
}