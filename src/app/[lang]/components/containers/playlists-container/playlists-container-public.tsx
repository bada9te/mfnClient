"use client"
import Playlist from "../../entities/playlist/playlist";
import {
    usePlaylistsPublicAvailableSuspenseQuery,
    Post as TPost
} from "@/app/utils/graphql-requests/generated/schema";
import Pagination from "@/app/[lang]/components/common/pagination/pagination";
import InfoImage from "@/app/[lang]/components/common/info-image/info-image";
import {TPaginationProps} from "@/app/types/pagination";
import RefreshButtonPerContainer from "@/app/[lang]/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/app/translations/dictionaries";


export default function PlaylistsContainerPublic(props: TPaginationProps & {dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const { offset, limit, page, dictionary } = props;

    const { data, refetch } = usePlaylistsPublicAvailableSuspenseQuery({
        variables: {
            offset, limit
        }
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit})} dictionary={dictionary}/>
            {
                data?.playlistsPublicAvailable.playlists?.length
                ?
                <>
                    {
                        data?.playlistsPublicAvailable.playlists?.map((playlist, key) => {
                            return (
                                <Playlist key={key} _id={playlist._id} title={playlist.title} posts={playlist.tracks as TPost[]} dictionary={dictionary}/>
                            );
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.playlistsPublicAvailable.count as number / limit)} />
                </>
                :
                <InfoImage text={"No public playlists found"} image="/assets/icons/logo_playlist.png"/>
            }
        </>
    );
}


