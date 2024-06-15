import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import PlaylistForm from "@/components/forms/playlist";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";

export default function Playlists() {
    return (
        <>
            <BarTabsPlaylists activeTab="create"/>
            <HeroWrapperForm
                bgStyles="bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right"
                title="New playlist"
                description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            >
                <PlaylistForm/>
            </HeroWrapperForm>
        </>
    );
}