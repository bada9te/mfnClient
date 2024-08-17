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
                description="Start building your ideal playlist by setting up a new collection. Organize and name your playlist to match any mood or event, and add tracks later when you're ready. It’s the ultimate way to plan your music journey and ensure you have the perfect soundtrack at your fingertips."
            >
                <PlaylistForm/>
            </HeroWrapperForm>
        </>
    );
}