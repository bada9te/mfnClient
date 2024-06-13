import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import BattleForm from "@/components/forms/battle";
import PlaylistForm from "@/components/forms/playlist";

export default function Playlists() {
    return (
        <>
            <BarTabsPlaylists activeTab="create"/>
            <div className="hero min-h-screen bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right rounded-none">
                <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">New playlist</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <div className="card shadow-2xl bg-base-100 text-black">
                            <PlaylistForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}