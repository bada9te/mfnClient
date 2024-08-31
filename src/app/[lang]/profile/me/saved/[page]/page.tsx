import {PreloadQuery} from "@/lib/apollo/client";
import {POSTS_SAVED_BY_USER_QUERY} from "@/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PostsContainerSaved from "@/components/containers/posts-container/posts-container-saved";
import {cookies} from "next/headers";
import envCfg from "@/config/env";
import { TLang } from "@/types/language";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music From Nothing - Feed',
    description: 'Feed',
}

export default async function Feed({params}: {params: { page: number, lang: TLang }}) {
    const userId = cookies().get(envCfg.userIdCookieKey as string)?.value as string;
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapper
            title={dict.app.profile.me.saved.title}
            description={dict.app.profile.me.saved.description}
        >
            <div className="card w-full">
                <div className="flex flex-wrap justify-center md:justify-around gap-5">
                    <PreloadQuery
                        query={POSTS_SAVED_BY_USER_QUERY}
                        variables={{
                            offset: (params.page - 1) * 12,
                            limit: 12,
                            user: userId
                        }}
                    >
                        <Suspense fallback={<PostsContainerSkeleton/>}>
                            <PostsContainerSaved offset={(params.page - 1) * 12} limit={12} page={params.page} userId={userId} dictionary={dict.components}/>
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}