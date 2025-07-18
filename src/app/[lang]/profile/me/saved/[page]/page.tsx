import {PreloadQuery} from "@/app/lib/apollo/client";
import {POSTS_SAVED_BY_USER_QUERY} from "@/app/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/app/[lang]/components/containers/posts-container/posts-container-skeleton";
import HeroWrapper from "@/app/[lang]/components/wrappers/hero-wrapper";
import PostsContainerSaved from "@/app/[lang]/components/containers/posts-container/posts-container-saved";
import {cookies} from "next/headers";
import envCfg from "@/app/config/env";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Feed',
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
                <div className="flex flex-wrap justify-center md:justify-center gap-5 lg:gap-14">
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