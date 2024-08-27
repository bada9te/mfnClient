import PlaylistContainer from "@/components/containers/playlists-container/playlist-container";
import PlaylistSkeleton from "@/components/entities/playlist/playlist-skeleton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { getDictionary } from "@/dictionaries/dictionaries";
import { PreloadQuery } from "@/lib/apollo/client";
import { TLang } from "@/types/language";
import { PLAYLIST_QUERY } from "@/utils/graphql-requests/playlists";
import { Suspense } from "react";

export default async function Playlist({params}: {params: {playlistId: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapper
            title={dict.app.playlists.id.title}
            description={dict.app.playlists.id.description}
        >
            <div className="card w-full">
                <div className="flex flex-col-reverse lg:flex-row justify-center items-start gap-5">
                    <PreloadQuery
                        query={PLAYLIST_QUERY}
                        variables={{
                            _id: params.playlistId
                        }}
                    >
                        <Suspense fallback={<PlaylistSkeleton/>}>
                            <PlaylistContainer playlistId={params.playlistId}/>
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}