import ProfileCard from "@/app/[lang]/app/profile/components/profile-card/profile-card";
import PostContainer from "@/app/[lang]/app/components/containers/posts-container/post-container";
import PostsContainerProfile from "@/app/[lang]/app/components/containers/posts-container/posts-container-profile";
import PostsContainerSkeleton from "@/app/[lang]/app/components/containers/posts-container/posts-container-skeleton";
import PostSkeleton from "@/app/[lang]/app/components/entities/post/post-skeleton";
import HeroWrapper from "@/app/[lang]/app/components/wrappers/hero-wrapper";
import { getDictionary } from "@/app/translations/dictionaries";
import { PreloadQuery } from "@/app/lib/apollo/client";
import { TLang } from "@/app/types/language";
import { POST_QUERY, POSTS_BY_OWNER_QUERY } from "@/app/utils/graphql-requests/posts";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Tunes Hub - Post',
    description: 'Post',
}

export default async function PostPage({params}: {params: {id: string, owner: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapper
            title={dict.app.post.title}
            description={dict.app.post.description}
        >
            <div className="card w-full">
                <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-5">
                    <div className="min-w-80 mt-5">
                        <PreloadQuery
                            query={POST_QUERY}
                            variables={{
                                _id: params.id
                            }}
                        >
                            <Suspense fallback={<PostSkeleton/>}>
                                <PostContainer postId={params.id} dictionary={dict.components}/>
                            </Suspense>
                        </PreloadQuery>
                    </div>


                    {
                        params.owner ?
                        <ProfileCard userId={params.owner} disableMargins dictionary={dict.components}/> :
                        null
                    }
                </div>

                {
                    params.owner ?
                    <>
                        <div className="divider divider-primary my-10">More tracks</div>
                        <div className="flex flex-wrap justify-center md:justify-center gap-5 lg:gap-14">
                            <PreloadQuery
                                query={POSTS_BY_OWNER_QUERY}
                                variables={{
                                    owner: params.owner,
                                    offset: 0,
                                    limit: 6
                                }}
                            >
                                <Suspense fallback={<PostsContainerSkeleton/>}>
                                    <PostsContainerProfile profileId={params.owner} offset={0} limit={6} page={1} paginationHidden dictionary={dict.components}/>
                                </Suspense>
                            </PreloadQuery>
                        </div>
                    </>
                    :
                    null
                }
            </div>
        </HeroWrapper>
    );
}