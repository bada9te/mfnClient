import PostsContainer from "@/components/containers/posts-container/posts-container";

export default async function Feed({params}: {params: { page: number }}) {
    return (
        <PostsContainer offset={(params.page - 1) * 12} limit={12} page={params.page} />
    );
}