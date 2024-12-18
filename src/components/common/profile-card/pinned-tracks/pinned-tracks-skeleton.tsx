"use client"
import PostSkeleton from "@/components/entities/post/post-skeleton";


export default function PinnedTracks() {
    return (
        <div className="w-full md:w-[800px] lg:w-full bg-[#107973] p-0 pb-5 md:p-5 rounded-2xl  shadow-2xl flex justify-center flex-col items-center">
            <p className="font-bold text-4xl text-center md:text-start mt-5 md:mt-0 w-full">Pinnned</p>
            <div className="flex flex-col md:flex-row gap-5 justify-around mt-7 flex-wrap">
                <PostSkeleton/>
                <PostSkeleton/>
                <PostSkeleton/>
            </div>
        </div>
    );
}