import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PlaylistsContainerOwner from "@/components/containers/playlists-container/playlists-container-my";
import {cookies} from "next/headers";
import nextConfig from "../../../../../next.config.mjs";
import {PreloadQuery} from "@/lib/apollo/client";
import {Suspense} from "react";
import PlaylistsContainerSkeleton from "@/components/containers/playlists-container/playlists-container-skeleton";
import {PLAYLISTS_BY_OWNER_ID_QUERY} from "@/utils/graphql-requests/playlists";


export default function Playlists({params}: {params: {page: number}}) {
    const myId = cookies().get(nextConfig.env?.userIdCookieKey as string)?.value as string;

    return (
        <>
            <BarTabsPlaylists activeTab="my-playlists"/>
            <HeroWrapper
                title="My playlists"
                description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            >
                <div className="card w-full">
                    <div className="flex flex-wrap w-full gap-5">
                        <PreloadQuery
                            query={PLAYLISTS_BY_OWNER_ID_QUERY}
                            variables={{
                                owner: myId,
                                offset: (params.page - 1) * 12,
                                limit: 12
                            }}
                        >
                            <Suspense fallback={<PlaylistsContainerSkeleton/>}>
                                <PlaylistsContainerOwner
                                    page={params.page}
                                    offset={(params.page - 1) * 12}
                                    limit={12}
                                    ownerId={myId}
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}