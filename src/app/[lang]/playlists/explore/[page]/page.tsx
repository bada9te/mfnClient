import BarTabsPlaylists from "@/components/bars/bar-tabs/bar-tabs-playlists";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import PlaylistsContainerPublic from "@/components/containers/playlists-container/playlists-container-public";
import {PreloadQuery} from "@/lib/apollo/client";
import {Suspense} from "react";
import PlaylistsContainerSkeleton from "@/components/containers/playlists-container/playlists-container-skeleton";
import {PLAYLISTS_PUBLIC_AWAILABLE_QUERY} from "@/utils/graphql-requests/playlists";
import { TLang } from "@/types/language";
import { getDictionary } from "@/dictionaries/dictionaries";


export default async function Playlists({params}: {params: {page: number, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <BarTabsPlaylists activeTab="explore" dictionary={dict.components}/>
            <HeroWrapper
                title={dict.app.playlists.explore.title}
                description={dict.app.playlists.explore.description}
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
                                    dictionary={dict.components}
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}