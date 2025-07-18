import BarTabsPlaylists from "../../components/navigation-bar";
import HeroWrapper from "@/app/[lang]/components/wrappers/hero-wrapper";
import PlaylistsContainerOwner from "@/app/[lang]/components/containers/playlists-container/playlists-container-my";
import {cookies} from "next/headers";

import {PreloadQuery} from "@/app/lib/apollo/client";
import {Suspense} from "react";
import PlaylistsContainerSkeleton from "@/app/[lang]/components/containers/playlists-container/playlists-container-skeleton";
import {PLAYLISTS_BY_OWNER_ID_QUERY} from "@/app/utils/graphql-requests/playlists";
import envCfg from "@/app/config/env";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - My playlists',
    description: 'My playlists',
}

export default async function Playlists({params}: {params: {page: number, lang: TLang}}) {
    const myId = cookies().get(envCfg.userIdCookieKey as string)?.value as string;
    const dict = await getDictionary(params.lang);
    return (
        <>
            <BarTabsPlaylists activeTab="my-playlists" dictionary={dict.components}/>
            <HeroWrapper
                title={dict.app.playlists["my-playlists"].title}
                description={dict.app.playlists["my-playlists"].description}
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