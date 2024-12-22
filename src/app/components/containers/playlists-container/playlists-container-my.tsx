"use client"
import Playlist from "@/app/components/entities/playlist/playlist";
import Post from "@/app/components/entities/post/post";
import {
    Post as TPost,
    usePlaylistsByOwnerIdSuspenseQuery,
} from "@/app/utils/graphql-requests/generated/schema";
import Pagination from "@/app/components/common/pagination/pagination";
import InfoImage from "@/app/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/app/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/app/dictionaries/dictionaries";

export default function PlaylistsContainerOwner(props: TPaginationProps & { ownerId: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const { offset, limit, page, ownerId, dictionary } = props;

    const { data, refetch } = usePlaylistsByOwnerIdSuspenseQuery({
        variables: {
            offset, limit, owner: ownerId
        }
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, owner: ownerId})} dictionary={dictionary}/>
            {
                data?.playlistsByOwnerId?.playlists?.length
                ?
                <>
                    {
                        data?.playlistsByOwnerId.playlists?.map((playlist, key) => {
                            return (
                                <Playlist key={key} _id={playlist._id} title={playlist.title} posts={playlist.tracks as TPost[]} editable dictionary={dictionary}/>
                            );
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.playlistsByOwnerId.count as number / limit)} />
                </>
                :
                <InfoImage text={"No playlists found"} image="/assets/icons/logo_playlist.png"/>
            }
        </>
    );
}


