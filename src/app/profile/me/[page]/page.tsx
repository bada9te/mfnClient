import ProfileCard from "@/components/profile/profile-card/profile-card";
import {PreloadQuery} from "@/lib/apollo/client";
import {POSTS_BY_OWNER_QUERY, POSTS_QUERY} from "@/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PostsContainerProfile from "@/components/containers/posts-container/posts-container-profile";
import {cookies} from "next/headers";
import nextConfig from "@/../next.config.mjs";
import {USER_QUERY} from "@/utils/graphql-requests/users";

export default function Profile({params}: {params: { page: number }}) {
    const myId = cookies().get(nextConfig.env?.userIdCookieKey as string)?.value as string;

    return (
        <>
            <PreloadQuery
                query={USER_QUERY}
                variables={{
                    _id: myId,
                }}
            >
                <Suspense fallback={<>LOADING USER PROFILE</>}>
                    <ProfileCard userId={myId}/>
                </Suspense>
            </PreloadQuery>

            <HeroWrapper
                title=""
                description=""
            >
                <div className="card w-full">
                    <div className="flex flex-wrap justify-center md:justify-around gap-5">
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
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}