import ProfileCard from "@/components/profile/profile-card/profile-card";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";
import PostsContainer from "@/components/containers/posts-container/posts-container";

export default function Profile({params}: {params: { page: number }}) {
    return (
        <>
            <ProfileCard/>
            <div className="card shadow-2xl bg-base-100 w-full rounded-none">
                <div className="card-body flex flex-wrap flex-row justify-around gap-5">
                    <PostsContainer offset={(params.page - 1) * 12} limit={12} page={params.page}/>
                </div>
            </div>
        </>
    );
}