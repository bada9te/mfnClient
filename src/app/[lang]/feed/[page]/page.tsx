import PostsContainerFeed from "@/components/containers/posts-container/posts-container-feed";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import {PreloadQuery} from "@/lib/apollo/client";
import {POSTS_QUERY} from "@/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import { TLang } from "@/types/language";
import { getDictionary } from "@/dictionaries/dictionaries";


export default async function Feed({params}: {params: { page: number, lang: TLang }}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapper
            title={dict.app.feed.title}
            description={dict.app.feed.description}
        >
            <div className="card w-full">
                <div className="flex flex-wrap justify-center md:justify-around gap-5 z-10">
                    <PreloadQuery
                        query={POSTS_QUERY}
                        variables={{
                            offset: (params.page - 1) * 12,
                            limit: 12
                        }}
                    >
                        <Suspense fallback={<PostsContainerSkeleton/>}>
                            <PostsContainerFeed offset={(params.page - 1) * 12} limit={12} page={params.page} dictionary={dict.components}/>
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}