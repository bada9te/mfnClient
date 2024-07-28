import PostContainer from "@/components/containers/posts-container/post-container";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import PostEditForm from "@/components/forms/post-edit";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { PreloadQuery } from "@/lib/apollo/client";
import { POST_QUERY } from "@/utils/graphql-requests/posts";
import { Suspense } from "react";

export default function EditPost({params}: {params: {postId: string}}) {
    return (
        <HeroWrapper
            title="Editing post"
            description="You can edit your selected post using the form below"
        >
            <div className="card w-full">
                <div className="flex flex-wrap flex-row justify-center md:justify-around gap-5">
                    <PreloadQuery
                        query={POST_QUERY}
                        variables={{
                            _id: params.postId 
                        }}
                    >
                        <Suspense fallback={<PostSkeleton/>}>
                            <PostContainer postId={params.postId}/>
                        </Suspense>
                    </PreloadQuery>
                    
                    <PostEditForm posId={params.postId}/>
                </div>
            </div>
        </HeroWrapper>
    );
}