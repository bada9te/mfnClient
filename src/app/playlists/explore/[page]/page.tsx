import Post from "@/components/entities/post/post";
import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import Playlist from "@/components/entities/playlist/playlist";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function Playlists({params}: {params: {page: number}}) {
    return (
        <>
            <BarTabsPlaylists activeTab="explore"/>
            <HeroWrapper
                bgStyles="bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right"
                title="Explore playlists"
                description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            >

                <div className="card shadow-2xl bg-base-100 w-full min-h-screen">
                    <div className="card card-body flex flex-wrap m-0 p-0 w-full gap-5 md:p-10">
                        <Playlist title={"Playlist1"} posts={[<Post/>, <Post/>, <Post/>]}/>
                        <Playlist title={"Playlist2"} posts={[<Post/>, <Post/>, <Post/>]}/>
                    </div>
                </div>

            </HeroWrapper>
        </>
    );
}