import PostContainer from "@/components/containers/posts-container/post-container";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import PostEditForm from "@/components/forms/post-edit";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { getDictionary } from "@/dictionaries/dictionaries";
import { PreloadQuery } from "@/lib/apollo/client";
import { TLang } from "@/types/language";
import { POST_QUERY } from "@/utils/graphql-requests/posts";
import { Suspense } from "react";

export default async function EditPost({params}: {params: {postId: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang)
    return (
        <HeroWrapper
            title={dict.app.profile.me.edit.post.title}
            description={dict.app.profile.me.edit.post.description}
        >
            <div className="card w-full">
                <div className="flex flex-wrap flex-row justify-center md:justify-around gap-5">
                    <PreloadQuery
                        query={POST_QUERY}
                        variables={{
                            _id: params.postId 
                        }}
                    >
                        <Suspense fallback={<PostSkeleton/>}>
                            <PostContainer postId={params.postId} dictionary={dict.components}/>
                        </Suspense>
                    </PreloadQuery>
                    
                    <PostEditForm posId={params.postId}/>
                </div>
            </div>
        </HeroWrapper>
    );
}