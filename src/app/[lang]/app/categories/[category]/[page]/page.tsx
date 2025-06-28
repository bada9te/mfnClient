import HeroWrapper from "@/app/[lang]/app/components/wrappers/hero-wrapper";
import PostsContainerCategory from "@/app/[lang]/app/components/containers/posts-container/posts-container-category";
import {PreloadQuery} from "@/app/lib/apollo/client";
import {POSTS_BY_CATEGORY_QUERY} from "@/app/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/app/[lang]/app/components/containers/posts-container/posts-container-skeleton";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Category',
    description: 'Category',
}

export default async function Categories({params}: {params: {category: string, page: number, lang: TLang}}) {
    let category = params.category.replaceAll('-', ' ');
    category = category.substring(0, 1).toUpperCase() + category.substring(1, category.length);

    const dict = await getDictionary(params.lang)
    return (
        <HeroWrapper
            title={category}
            description={`${dict.app.categories["description-part1"]} "${category}" ${dict.app.categories["description-part2"]}`}
        >
            <div className="card w-full">
                <div className="flex flex-wrap flex-row justify-around gap-5">
                    <PreloadQuery
                        query={POSTS_BY_CATEGORY_QUERY}
                        variables={{
                            offset: (params.page - 1) * 12,
                            limit: 12,
                            category: params.category
                        }}
                    >
                        <Suspense fallback={<PostsContainerSkeleton/>}>
                            <PostsContainerCategory
                                offset={(params.page - 1) * 12}
                                limit={12}
                                page={params.page}
                                category={params.category}
                                dictionary={dict.components}
                            />
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>   
    );
}