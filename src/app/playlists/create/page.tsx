import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import PlaylistForm from "@/components/forms/playlist";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function Playlists() {
    return (
        <>
            <BarTabsPlaylists activeTab="create"/>
            <HeroWrapper
                bgStyles="bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right"
                title="New playlist"
                description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            >
                <div className="card shadow-2xl bg-base-100">
                    <PlaylistForm/>
                </div>
            </HeroWrapper>
        </>
    );
}