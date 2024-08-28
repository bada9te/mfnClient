"use client"
import Playlist from "@/components/entities/playlist/playlist";
import Post from "@/components/entities/post/post";
import {
    usePlaylistsPublicAvailableSuspenseQuery,
    Post as TPost
} from "@/utils/graphql-requests/generated/schema";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/dictionaries/dictionaries";


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


