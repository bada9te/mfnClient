import Post from "@/components/entities/post/post";

export default function Feed() {
    return (
        <div className="flex flex-wrap gap-5 justify-between">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    );
}