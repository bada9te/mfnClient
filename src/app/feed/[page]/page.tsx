import Post from "@/components/entities/post/post";

export default function Feed({params}: {params: { page: number }}) {
    return (
        <div className="flex flex-wrap gap-5 justify-between">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    );
}