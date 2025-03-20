import PostsContainerFeed from "@/app/[lang]/app/components/containers/posts-container/posts-container-feed";
import HeroWrapper from "../../components/wrappers/hero-wrapper";
import {PreloadQuery} from "@/app/lib/apollo/client";
import {POSTS_QUERY} from "@/app/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/app/[lang]/app/components/containers/posts-container/posts-container-skeleton";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Feed',
    description: 'List of new tracks',
}

export default async function Feed({params}: {params: { page: number, lang: TLang }}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapper
            title={dict.app.feed.title}
            description={dict.app.feed.description}
        >
            <div className="card w-full">
                <div className="flex flex-wrap justify-center md:justify-center gap-5 lg:gap-14 z-10">
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