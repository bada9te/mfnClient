import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import PlaylistForm from "@/components/forms/playlist";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function Playlists() {
    return (
        <>
            <BarTabsPlaylists activeTab="create"/>
            <HeroWrapper imgUrl="url('/assets/bgs/newPlaylistFormBG.png')">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">New playlist</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div className="card shadow-2xl bg-base-100">
                        <PlaylistForm/>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}