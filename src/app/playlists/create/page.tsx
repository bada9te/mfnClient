import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";

export default function Playlists() {
    return (
        <>
            <BarTabsPlaylists activeTab="create"/>
            <div className="hero min-h-screen bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right rounded-2xl">
                <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    );
}