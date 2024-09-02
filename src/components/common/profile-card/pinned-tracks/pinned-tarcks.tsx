"use client"
import PostSkeleton from "@/components/entities/post/post-skeleton";
import { PostPlaceholder } from "@/components/forms/battle";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Post } from "@/utils/graphql-requests/generated/schema";

export default function PinnedTracks({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const handleSelect = (a: Post) => {

    }

    return (
        <div className="w-full md:w-[800px] lg:w-full bg-[#107973] p-0 pb-5 md:p-5 rounded-2xl glass shadow-2xl flex justify-center flex-col items-center">
            <p className="font-bold text-4xl text-center md:text-start mt-5 md:mt-0 w-full flex flex-row gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path fillRule="evenodd"
                          d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                          clipRule="evenodd"/>
                </svg>
                Pinnned
            </p>
            <div className="flex flex-col md:flex-row gap-5 justify-around mt-7 flex-wrap">
                <PostPlaceholder userIsOwner handleSelect={handleSelect} dictionary={dictionary}/>
                <PostPlaceholder userIsOwner handleSelect={handleSelect} dictionary={dictionary}/>
                <PostPlaceholder userIsOwner handleSelect={handleSelect} dictionary={dictionary}/>
            </div>
        </div>
    );
}