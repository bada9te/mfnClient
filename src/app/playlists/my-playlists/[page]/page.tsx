import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PlaylistsContainer from "@/components/containers/playlists-container/playlists-container";


export default function Playlists({params}: {params: {page: number}}) {
    return (
        <>
            <BarTabsPlaylists activeTab="my-playlists"/>
            <HeroWrapper
                title="My playlists"
                description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            >
                <div className="card w-full">
                    <div className="flex flex-wrap w-full gap-5">
                        <PlaylistsContainer page={params.page} offset={(params.page - 1) * 12} limit={12} type={"my"}/>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}