import {PreloadQuery} from "@/lib/apollo/client";
import {POSTS_SAVED_BY_USER_QUERY} from "@/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PostsContainerSaved from "@/components/containers/posts-container/posts-container-saved";

export default function Feed({params}: {params: { page: number }}) {
    return (
        <HeroWrapper
            title="Saved tracks"
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
            <div className="card w-full">
                <div className="flex flex-wrap justify-center md:justify-around gap-5">
                    <PreloadQuery
                        query={POSTS_SAVED_BY_USER_QUERY}
                        variables={{
                            offset: (params.page - 1) * 12,
                            limit: 12
                        }}
                    >
                        <Suspense fallback={<PostsContainerSkeleton/>}>
                            <PostsContainerSaved offset={(params.page - 1) * 12} limit={12} page={params.page} />
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}