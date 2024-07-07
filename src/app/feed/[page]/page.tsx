import PostsContainerFeed from "@/components/containers/posts-container/posts-container-feed";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import {PreloadQuery} from "@/lib/apollo/client";
import {POSTS_QUERY} from "@/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";


export default async function Feed({params}: {params: { page: number }}) {
    return (
        <HeroWrapper
            title="Recent tracks"
            description="The newest tracks from users"
        >
            <div className="card w-full">
                <div className="flex flex-wrap justify-center md:justify-around gap-5">
                    <PreloadQuery
                        query={POSTS_QUERY}
                        variables={{
                            offset: (params.page - 1) * 12,
                            limit: 12
                        }}
                    >
                        <Suspense fallback={<PostsContainerSkeleton/>}>
                            <PostsContainerFeed offset={(params.page - 1) * 12} limit={12} page={params.page} />
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}