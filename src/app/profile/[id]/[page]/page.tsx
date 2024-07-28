import ProfileCard from "@/components/common/profile-card/profile-card";
import { PreloadQuery } from "@/lib/apollo/client";
import { Suspense } from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import PostsContainerProfile from "@/components/containers/posts-container/posts-container-profile";
import { POSTS_BY_OWNER_QUERY, POSTS_QUERY } from "@/utils/graphql-requests/posts";
import ProfileCardSkeleton from "@/components/common/profile-card/profile-card-skelton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function ProfileId({params}: {params: {page: number, id: string}}) {
    return (
        <>
            <PreloadQuery
                query={POSTS_QUERY}
                variables={{
                    _id: params.id
                }}
            >
                <Suspense fallback={<ProfileCardSkeleton/>}>
                    <ProfileCard userId={params.id}/>
                </Suspense>
            </PreloadQuery>
            <HeroWrapper
                title=""
                description=""
            >
                <div className="card shadow-none w-full rounded-none">
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