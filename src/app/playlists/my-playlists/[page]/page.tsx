import Post from "@/components/entities/post/post";
import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import Playlist from "@/components/entities/playlist/playlist";

export default function Playlists({params}: {params: {page: number}}) {
    return (
        <div className="flex flex-wrap gap-5 justify-center">
            <BarTabsPlaylists activeTab="my-playlists"/>
            <Playlist title={"Playlist1"} posts={[<Post/>, <Post/>, <Post/>]}/>
            <Playlist title={"Playlist2"} posts={[<Post/>, <Post/>, <Post/>]}/>
        </div>
    );
}