"use client"
import { revalidatePathAction } from "@/app/utils/actions/revalidation";
import Post from "@/app/[lang]/components/entities/post/post";
import { PostPlaceholder } from "@/app/[lang]/battles/create/components/forms/battle";
import { getDictionary } from "@/app/translations/dictionaries";
import { useAppSelector } from "@/app/lib/redux/store";
import { Post as TPost, useUserPinnedTracksSuspenseQuery, useUserSwitchPostPinnedMutation } from "@/app/utils/graphql-requests/generated/schema";
import { Pin } from "lucide-react";
import { useEffect, useState } from "react";

export default function PinnedTracks({
    userId,
    dictionary
}: {
    userId: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const user = useAppSelector(state => state.user.user);
    const [isMounted, setIsMounted] = useState(false);

    const [switchPostPinned] = useUserSwitchPostPinnedMutation();
    const {data: pinnedTracks} = useUserPinnedTracksSuspenseQuery({
        variables: {
            _id: userId
        }
    });

    const handleSelect = async(a: TPost) => {
        await switchPostPinned({
            variables: {
                userId: user?._id as string,
                postId: a._id
            }
        });
        revalidatePathAction("/profile/me", "page");
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return;
    }

    return (
        <div className="w-full md:w-[800px] lg:w-full pb-10 bg-[#107973] p-0 md:p-5 rounded-2xl  shadow-2xl flex justify-center flex-col items-center">
            <p className="font-bold text-4xl text-center md:text-start mt-5 md:mt-0 w-full flex flex-row gap-3 items-center">
                <Pin />
                {dictionary.common["profile-card"]["pinned-tracks"].pinned}
            </p>
            <div className="flex flex-col md:flex-row gap-14 mb-10 justify-around mt-7 flex-wrap">
                {
                    pinnedTracks?.userPinnedTracks?.map((i, key) => {
                        if (userId === user?._id) {
                            return (
                                <Post key={key} data={i as TPost} dictionary={dictionary} handleRemove={handleSelect}/>
                            );
                        } else {
                            return (
                                <Post key={key} data={i as TPost} dictionary={dictionary}/>
                            );
                        }
                    })
                }
                
                {
                    (() => {
                        if (pinnedTracks?.userPinnedTracks?.length) {
                            if (pinnedTracks?.userPinnedTracks.length < 3) {
                                const amount = 3 - pinnedTracks?.userPinnedTracks.length;
                                
                                return Array(amount).fill(0).map((_, key) => {
                                    return (
                                        <PostPlaceholder key={key} userIsOwner={userId === user?._id} handleSelect={handleSelect} dictionary={dictionary}/>
                                    );
                                });
                            }
                        } else {
                            return (
                                <>
                                    <PostPlaceholder userIsOwner={userId == user?._id} handleSelect={handleSelect} dictionary={dictionary}/>
                                    <PostPlaceholder userIsOwner={userId == user?._id} handleSelect={handleSelect} dictionary={dictionary}/>
                                    <PostPlaceholder userIsOwner={userId == user?._id} handleSelect={handleSelect} dictionary={dictionary}/>
                                </>
                            );
                        }
                    })()
                }
            </div>
        </div>
    );
}