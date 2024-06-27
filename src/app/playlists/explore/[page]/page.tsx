import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PlaylistsContainerPublic from "@/components/containers/playlists-container/playlists-container-public";
import {PreloadQuery} from "@/lib/apollo/client";
import {Suspense} from "react";
import PlaylistsContainerSkeleton from "@/components/containers/playlists-container/playlists-container-skeleton";
import {PLAYLISTS_PUBLIC_AWAILABLE_QUERY} from "@/utils/graphql-requests/playlists";


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
                        <PreloadQuery
                            query={PLAYLISTS_PUBLIC_AWAILABLE_QUERY}
                            variables={{
                                offset: (params.page - 1) * 6,
                                limit: 6
                            }}
                        >
                            <Suspense fallback={<PlaylistsContainerSkeleton/>}>
                                <PlaylistsContainerPublic
                                    page={params.page}
                                    offset={(params.page - 1) * 6}
                                    limit={6}
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}