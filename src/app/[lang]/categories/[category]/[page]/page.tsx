import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PostsContainerCategory from "@/components/containers/posts-container/posts-container-category";
import {PreloadQuery} from "@/lib/apollo/client";
import {POSTS_BY_CATEGORY_QUERY} from "@/utils/graphql-requests/posts";
import {Suspense} from "react";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";

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
                            />
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>   
    );
}