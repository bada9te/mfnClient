import Playlist from "@/components/entities/playlist/playlist";
import Post from "@/components/entities/post/post";

export default function PlaylistsContainer() {
    return (
        <>
            <Playlist title={"Playlist1"} posts={[<Post/>, <Post/>, <Post/>]}/>
            <Playlist title={"Playlist2"} posts={[<Post/>, <Post/>, <Post/>]}/>
        </>
    );
}