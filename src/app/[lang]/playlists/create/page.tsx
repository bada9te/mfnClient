import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import PlaylistForm from "@/components/forms/playlist";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";

export default async function Playlists({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <BarTabsPlaylists activeTab="create" dictionary={dict.components}/>
            <HeroWrapperForm
                bgStyles="bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right"
                title={dict.app.playlists.create.title}
                description={dict.app.playlists.create.description}
            >
                <PlaylistForm/>
            </HeroWrapperForm>
        </>
    );
}