import React from "react";
import PostSkeleton from "@/app/components/entities/post/post-skeleton";

export default function PlaylistSkeleton() {
    return (
        <div className="collapse collapse-plus bg-base-100 rounded-2xl shadow-md">
            <input type="checkbox" name="my-accordion-3"/>
            <div className="collapse-title text-xl font-medium py-4 mt-1">
                <div className="skeleton w-full h-6 shadow-md shrink-0"></div>
            </div>
            <div className="collapse-content">
                <div className="py-2 join join-horizontal w-full flex justify-center">
                    <div className="skeleton w-full h-8 shadow-md shrink-0"></div>
                </div>
                <div className="flex flex-wrap gap-5 justify-around mb-10 mt-5">
                    <PostSkeleton/>
                    <PostSkeleton/>
                    <PostSkeleton/>
                </div>
            </div>
        </div>
    );
}