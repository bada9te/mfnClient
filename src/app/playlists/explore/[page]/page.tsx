import Post from "@/components/entities/post/post";
import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import Playlist from "@/components/entities/playlist/playlist";

export default function Playlists({params}: {params: {page: number}}) {
    return (
        <>
            <BarTabsPlaylists activeTab="explore"/>
            <div className="hero min-h-screen bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right rounded-none">
                <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="flex w-full flex-col items-center justify-center py-10">
                        <h1 className="mb-5 text-5xl font-bold">Explore playlists</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="card shadow-2xl bg-base-100 text-black">
                            <div className="card-body m-0 p-0">
                                <Playlist title={"Playlist1"} posts={[<Post/>, <Post/>, <Post/>]}/>
                                <Playlist title={"Playlist2"} posts={[<Post/>, <Post/>, <Post/>]}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}