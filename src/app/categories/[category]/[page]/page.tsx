import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PostsContainerCategory from "@/components/containers/posts-container/posts-container-category";
import {PreloadQuery} from "@/lib/apollo/client";
import {POSTS_BY_CATEGORY_QUERY} from "@/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";

export default function Categories({params}: {params: {category: string, page: number}}) {
    const category = params.category.replaceAll('-', ' ');

    return (
        <HeroWrapper
            title={category.substring(0, 1).toUpperCase() + category.substring(1, category.length)}
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
            <div className="card w-full">
                <div className="flex flex-wrap flex-row justify-around gap-5">
                    <PreloadQuery
                        query={POSTS_BY_CATEGORY_QUERY}
                        variables={{
                            offset: (params.page - 1) * 12,
                            limit: 12
                        }}
                    >
                        <Suspense fallback={<PostsContainerSkeleton/>}>
                            <PostsContainerCategory
                                offset={(params.page - 1) * 12}
                                limit={12}
                                page={params.page}
                                category={params.category}
                            />
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>   
    );
}