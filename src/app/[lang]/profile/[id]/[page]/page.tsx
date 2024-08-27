import ProfileCard from "@/components/common/profile-card/profile-card";
import { PreloadQuery } from "@/lib/apollo/client";
import { Suspense } from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import PostsContainerProfile from "@/components/containers/posts-container/posts-container-profile";
import { POSTS_BY_OWNER_QUERY } from "@/utils/graphql-requests/posts";
import ProfileCardSkeleton from "@/components/common/profile-card/profile-card-skelton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { USER_ACHIEVEMENTS_DATA_QUERY, USER_QUERY } from "@/utils/graphql-requests/users";
import { ACHIEVEMENTS_COUNT_QUERY } from "@/utils/graphql-requests/achievements";
import { TLang } from "@/types/language";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function ProfileId({params}: {params: {page: number, id: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <PreloadQuery query={ACHIEVEMENTS_COUNT_QUERY}>
                <PreloadQuery query={USER_ACHIEVEMENTS_DATA_QUERY} variables={{ _id: params.id }}>
                    <PreloadQuery query={USER_QUERY} variables={{ _id: params.id }}>
                        <Suspense fallback={<ProfileCardSkeleton/>}>
                            <ProfileCard userId={params.id}/>
                        </Suspense>
                    </PreloadQuery>
                </PreloadQuery>
            </PreloadQuery>
            <HeroWrapper
                title={dict.app.profile.id.page.title}
                description={dict.app.profile.id.page.description}
            >
                <div className="card shadow-none w-full ">
                    <div className="flex flex-wrap justify-center md:justify-around gap-5">
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
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}