import PostContainer from "@/app/[lang]/components/containers/posts-container/post-container";
import PostSkeleton from "@/app/[lang]/components/entities/post/post-skeleton";
import PostEditForm from "./components/forms/post-edit";
import HeroWrapper from "@/app/[lang]/components/wrappers/hero-wrapper";
import { getDictionary } from "@/app/translations/dictionaries";
import { PreloadQuery } from "@/app/lib/apollo/client";
import { TLang } from "@/app/types/language";
import { POST_QUERY } from "@/app/utils/graphql-requests/posts";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Tunes Hub - Post edit',
    description: 'Post edit',
}


export default async function EditPost({params}: {params: {postId: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang)
    return (
        <HeroWrapper
            title={dict.app.profile.me.edit.post.title}
            description={dict.app.profile.me.edit.post.description}
        >
            <div className="card w-full">
                <div className="flex flex-wrap flex-row justify-center md:justify-center gap-5 lg:gap-14">
                    <PreloadQuery
                        query={POST_QUERY}
                        variables={{
                            _id: params.postId 
                        }}
                    >
                        <Suspense fallback={<PostSkeleton/>}>
                            <PostContainer postId={params.postId} dictionary={dict.components}/>
                        </Suspense>
                        <PostEditForm posId={params.postId} dictionary={dict.components}/>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}