import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";

export default function Feed({params}: {params: { page: number }}) {
    return (
        <div className="card shadow-2xl bg-base-100 w-full">
            <div className="card-body flex flex-wrap flex-row justify-between gap-5">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
            <Pagination/>
        </div>
    );
}