import ProfileCard from "@/app/[lang]/profile/components/profile-card/profile-card";
import {PreloadQuery} from "@/app/lib/apollo/client";
import {POSTS_BY_OWNER_QUERY} from "@/app/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/app/[lang]/components/containers/posts-container/posts-container-skeleton";
import HeroWrapper from "@/app/[lang]/components/wrappers/hero-wrapper";
import PostsContainerProfile from "@/app/[lang]/components/containers/posts-container/posts-container-profile";
import {cookies} from "next/headers";
import {USER_ACHIEVEMENTS_DATA_QUERY, USER_PINNED_POSTS_QUERY, USER_QUERY} from "@/app/utils/graphql-requests/users";
import ProfileCardSkeleton from "@/app/[lang]/profile/components/profile-card/profile-card-skelton";
import { ACHIEVEMENTS_COUNT_QUERY } from "@/app/utils/graphql-requests/achievements";
import envCfg from "@/app/config/env";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";
import PinnedTracks from "@/app/[lang]/profile/components/profile-card/components/pinned-tracks";


export const metadata: Metadata = {
    title: 'Tunes Hub - Profile',
    description: 'Profile',
}


export default async function Profile({params}: {params: { page: number, lang: TLang }}) {
    const myId = cookies().get(envCfg.userIdCookieKey as string)?.value as string;
    const dict = await getDictionary(params.lang);

    return (
        <>
            <PreloadQuery query={ACHIEVEMENTS_COUNT_QUERY}>
                <PreloadQuery query={USER_ACHIEVEMENTS_DATA_QUERY} variables={{ _id: myId }}>
                    <PreloadQuery query={USER_QUERY} variables={{ _id: myId }}>
                        <Suspense fallback={<ProfileCardSkeleton/>}>
                            <ProfileCard userId={myId} dictionary={dict.components}/>
                        </Suspense>
                    </PreloadQuery>
                </PreloadQuery>
            </PreloadQuery>
            <HeroWrapper
                title={dict.app.profile.me.page.title}
                description={dict.app.profile.me.page.description}
            >
                <div className="card w-full">
                    <div className="flex flex-wrap justify-center md:justify-center gap-5 lg:gap-14">
                        <PreloadQuery
                            query={USER_PINNED_POSTS_QUERY}
                            variables={{
                                _id: myId
                            }}
                        >
                            <Suspense fallback={<></>}>
                                <PinnedTracks dictionary={dict.components} userId={myId}/>
                            </Suspense>
                        </PreloadQuery>
                        <PreloadQuery
                            query={POSTS_BY_OWNER_QUERY}
                            variables={{
                                offset: (params.page - 1) * 12,
                                limit: 12,
                                owner: myId
                            }}
                        >
                            <Suspense fallback={<PostsContainerSkeleton/>}>
                                <PostsContainerProfile
                                    offset={(params.page - 1) * 12}
                                    limit={12}
                                    page={params.page}
                                    profileId={myId}
                                    dictionary={dict.components}
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}