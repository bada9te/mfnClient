import ProfileCard from "@/components/common/profile-card/profile-card";
import PostContainer from "@/components/containers/posts-container/post-container";
import PostsContainerProfile from "@/components/containers/posts-container/posts-container-profile";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { getDictionary } from "@/dictionaries/dictionaries";
import { PreloadQuery } from "@/lib/apollo/client";
import { TLang } from "@/types/language";
import { POST_QUERY, POSTS_BY_OWNER_QUERY } from "@/utils/graphql-requests/posts";
import { Suspense } from "react";

export default async function PostPage({params}: {params: {id: string, owner: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapper
            title={dict.app.post.title}
            description={dict.app.post.description}
        >
            <div className="card w-full">
                <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-5">
                    <PreloadQuery
                        query={POST_QUERY}
                        variables={{
                            _id: params.id
                        }}
                    >
                        <Suspense fallback={<PostSkeleton/>}>
                            <PostContainer postId={params.id}/>
                        </Suspense>
                    </PreloadQuery>

                    <ProfileCard userId={params.owner} disableMargins/>
                </div>
                <div className="divider divider-primary my-10">More tracks</div>
                <div className="flex flex-wrap justify-center md:justify-around gap-5">
                    <PreloadQuery
                        query={POSTS_BY_OWNER_QUERY}
                        variables={{
                            owner: params.owner,
                            offset: 0,
                            limit: 6
                        }}
                    >
                        <Suspense fallback={<PostsContainerSkeleton/>}>
                            <PostsContainerProfile profileId={params.owner} offset={0} limit={6} page={1} paginationHidden/>
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}