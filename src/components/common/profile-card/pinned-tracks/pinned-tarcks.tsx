"use client"
import { revalidatePathAction } from "@/actions/revalidation";
import Post from "@/components/entities/post/post";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import { PostPlaceholder } from "@/components/forms/battle";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useAppSelector } from "@/lib/redux/store";
import { Post as TPost, useUserPinnedTracksSuspenseQuery, useUserSwitchPostPinnedMutation } from "@/utils/graphql-requests/generated/schema";

export default function PinnedTracks({
    userId,
    dictionary
}: {
    userId: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const user = useAppSelector(state => state.user.user);
    const [switchPostPinned] = useUserSwitchPostPinnedMutation();
    const {data: pinnedTracks} = useUserPinnedTracksSuspenseQuery({
        variables: {
            _id: userId
        }
    });

    const handleSelect = async(a: TPost) => {
        console.log(a)
        await switchPostPinned({
            variables: {
                userId: user._id as string,
                postId: a._id
            }
        });
        revalidatePathAction("/profile/me", "page");
    }

    return (
        <div className="w-full md:w-[800px] lg:w-full bg-[#107973] p-0 pb-5 md:p-5 rounded-2xl glass shadow-2xl flex justify-center flex-col items-center">
            <p className="font-bold text-4xl text-center md:text-start mt-5 md:mt-0 w-full flex flex-row gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path fillRule="evenodd"
                          d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                          clipRule="evenodd"/>
                </svg>
                {dictionary.common["profile-card"]["pinned-tracks"].pinned}
            </p>
            <div className="flex flex-col md:flex-row gap-5 justify-around mt-7 flex-wrap">
                {
                    pinnedTracks.userPinnedTracks?.map((i, key) => {
                        return (
                            <Post key={key} data={i as TPost} dictionary={dictionary}/>
                        );
                    })
                }
                
                {
                    (() => {
                        if (pinnedTracks.userPinnedTracks?.length) {
                            if (pinnedTracks.userPinnedTracks.length < 3) {
                                const amount = 3 - pinnedTracks.userPinnedTracks.length;
                                
                                return Array(amount).fill(0).map((_, key) => {
                                    return (
                                        <PostPlaceholder key={key} userIsOwner handleSelect={handleSelect} dictionary={dictionary}/>
                                    );
                                });
                            }
                        } else {
                            return (
                                <>
                                    <PostPlaceholder userIsOwner handleSelect={handleSelect} dictionary={dictionary}/>
                                    <PostPlaceholder userIsOwner handleSelect={handleSelect} dictionary={dictionary}/>
                                    <PostPlaceholder userIsOwner handleSelect={handleSelect} dictionary={dictionary}/>
                                </>
                            );
                        }
                    })()
                }
            </div>
        </div>
    );
}