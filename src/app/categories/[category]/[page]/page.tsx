"use client"
import Post from "@/components/entities/post/post";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PostsContainer from "@/components/containers/posts-container/posts-container";

export default function Categories({params}: {params: {category: string, page: number}}) {
    const category = params.category;

    return (
        <HeroWrapper
            title={category.substring(0, 1).toUpperCase() + category.substring(1, category.length)}
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
            <div className="card w-full">
                <div className="flex flex-wrap flex-row justify-around gap-5">
                    <PostsContainer
                        offset={(params.page - 1) * 12}
                        limit={12}
                        page={params.page}
                        category={params.category}
                    />
                </div>
            </div>
        </HeroWrapper>   
    );
}