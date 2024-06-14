import ProfileCard from "@/components/profile/profile-card/profile-card";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";

export default function ProfileId({params}: {params: {page: number}}) {
    return (
        <>
            <ProfileCard/>
            <div className="card shadow-2xl bg-base-100 w-full rounded-none">
                <div className="card-body flex flex-wrap flex-row justify-between gap-5">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
                <Pagination/>
            </div>
        </>
    );
}