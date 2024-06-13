import Post from "@/components/entities/post/post";

export default function Feed({params}: {params: { page: number }}) {
    return (
        <div className="card shadow-2xl bg-base-100 text-black w-full">
            <div className="card-body flex flex-wrap flex-row justify-between gap-5">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    );
}