import BarTabsPlaylists from "../components/navigation-bar";
import PlaylistForm from "./components/forms/playlist";
import HeroWrapperForm from "../../components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Playlist creation',
    description: 'Playlist creation',
}

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
                <PlaylistForm dictionary={dict.components}/>
            </HeroWrapperForm>
        </>
    );
}