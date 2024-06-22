import PostsContainer from "@/components/containers/posts-container/posts-container";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default async function Feed({params}: {params: { page: number }}) {
    return (
        <HeroWrapper
            title="Recent tracks"
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
            <div className="card w-full min-h-screen">
                <div className="flex flex-wrap flex-row justify-around gap-5">
                    <PostsContainer offset={(params.page - 1) * 12} limit={12} page={params.page} />
                </div>
            </div>
        </HeroWrapper>
    );
}