import Post from "@/components/entities/post/post";

export default function Feed({params}: {params: { page: number }}) {
    return (
        <>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </>
    );
}