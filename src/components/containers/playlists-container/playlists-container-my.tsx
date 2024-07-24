"use client"
import Playlist from "@/components/entities/playlist/playlist";
import Post from "@/components/entities/post/post";
import {
    Post as TPost,
    usePlaylistsByOwnerIdSuspenseQuery,
} from "@/utils/graphql-requests/generated/schema";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";

export default function PlaylistsContainerOwner(props: TPaginationProps & { ownerId: string }) {
    const { offset, limit, page, ownerId } = props;

    const { data } = usePlaylistsByOwnerIdSuspenseQuery({
        variables: {
            offset, limit, owner: ownerId
        }
    });

    return (
        <>
            {
                data?.playlistsByOwnerId.playlists?.length
                ?
                <>
                    {
                        data?.playlistsByOwnerId.playlists?.map((playlist, key) => {
                            return (
                                <Playlist key={key} _id={playlist._id} title={playlist.title} posts={playlist.tracks as TPost[]}/>
                            );
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.playlistsByOwnerId.count as number / limit)} />
                </>
                :
                <InfoImage text={"No playlists found"}/>
            }
        </>
    );
}


