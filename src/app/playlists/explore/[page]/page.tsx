import Post from "@/components/entities/post/post";
import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import Playlist from "@/components/entities/playlist/playlist";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PlaylistsContainer from "@/components/containers/playlists-container/playlists-container";


export default function Playlists({params}: {params: {page: number}}) {
    return (
        <>
            <BarTabsPlaylists activeTab="explore"/>
            <HeroWrapper
                title="Explore playlists"
                description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            >
                <div className="card w-full">
                    <div className="flex flex-wrap w-full gap-5">
                        <PlaylistsContainer/>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}