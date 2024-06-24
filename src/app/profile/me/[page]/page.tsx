import ProfileCard from "@/components/profile/profile-card/profile-card";
import PostsContainerFeed from "@/components/containers/posts-container/posts-container-feed";

export default function Profile({params}: {params: { page: number }}) {
    return (
        <>
            <ProfileCard/>
            <div className="card shadow-2xl bg-base-100 w-full rounded-none">
                <div className="card-body flex flex-wrap flex-row justify-around gap-5">
                    <PostsContainerFeed offset={(params.page - 1) * 12} limit={12} page={params.page}/>
                </div>
            </div>
        </>
    );
}