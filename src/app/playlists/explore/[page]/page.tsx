import Post from "@/components/entities/post/post";
import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import Playlist from "@/components/entities/playlist/playlist";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function Playlists({params}: {params: {page: number}}) {
    return (
        <>
            <BarTabsPlaylists activeTab="explore"/>
            <HeroWrapper imgUrl="url('/assets/bgs/newPlaylistFormBG.png')">
                <div className="flex w-full flex-col items-center justify-center py-10">
                    <h1 className="mb-5 text-5xl font-bold">Explore playlists</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <div className="card shadow-2xl bg-base-100 w-full">
                        <div className="card-body m-0 p-0">
                            <Playlist title={"Playlist1"} posts={[<Post/>, <Post/>, <Post/>]}/>
                            <Playlist title={"Playlist2"} posts={[<Post/>, <Post/>, <Post/>]}/>
                        </div>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}