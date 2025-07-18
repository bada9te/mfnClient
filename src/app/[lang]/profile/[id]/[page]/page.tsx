import ProfileCard from "@/app/[lang]/profile/components/profile-card/profile-card";
import { PreloadQuery } from "@/app/lib/apollo/client";
import { Suspense } from "react";
import PostsContainerSkeleton from "@/app/[lang]/components/containers/posts-container/posts-container-skeleton";
import PostsContainerProfile from "@/app/[lang]/components/containers/posts-container/posts-container-profile";
import { POSTS_BY_OWNER_QUERY } from "@/app/utils/graphql-requests/posts";
import ProfileCardSkeleton from "@/app/[lang]/profile/components/profile-card/profile-card-skelton";
import HeroWrapper from "@/app/[lang]/components/wrappers/hero-wrapper";
import { USER_ACHIEVEMENTS_DATA_QUERY, USER_PINNED_POSTS_QUERY, USER_QUERY } from "@/app/utils/graphql-requests/users";
import { ACHIEVEMENTS_COUNT_QUERY } from "@/app/utils/graphql-requests/achievements";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";
import PinnedTracks from "@/app/[lang]/profile/components/profile-card/components/pinned-tracks";

export const metadata: Metadata = {
    title: 'Tunes Hub - Profile',
    description: 'Profile',
}

export default async function ProfileId({params}: {params: {page: number, id: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <PreloadQuery query={ACHIEVEMENTS_COUNT_QUERY}>
                <PreloadQuery query={USER_ACHIEVEMENTS_DATA_QUERY} variables={{ _id: params.id }}>
                    <PreloadQuery query={USER_QUERY} variables={{ _id: params.id }}>
                        <Suspense fallback={<ProfileCardSkeleton/>}>
                            <ProfileCard userId={params.id} dictionary={dict.components}/>
                        </Suspense>
                    </PreloadQuery>
                </PreloadQuery>
            </PreloadQuery>
            <HeroWrapper
                title={dict.app.profile.id.page.title}
                description={dict.app.profile.id.page.description}
            >
                <div className="card shadow-none w-full ">
                    <div className="flex flex-wrap justify-center md:justify-center gap-5 lg:gap-14">
                        <PreloadQuery
                            query={USER_PINNED_POSTS_QUERY}
                            variables={{
                                _id: params.id
                            }}
                        >
                            <Suspense fallback={"LOADING..."}>
                                <PinnedTracks dictionary={dict.components} userId={params.id}/>
                            </Suspense>
                        </PreloadQuery>
                        <PreloadQuery 
                            query={POSTS_BY_OWNER_QUERY}
                            variables={{
                                offset: (params.page - 1) * 12,
                                limit: 12,
                                owner: params.id
                            }}
                        >
                            <Suspense fallback={<PostsContainerSkeleton/>}>
                                <PostsContainerProfile
                                    page={params.page}
                                    offset={(params.page - 1) * 12} 
                                    limit={12}
                                    profileId={params.id}
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