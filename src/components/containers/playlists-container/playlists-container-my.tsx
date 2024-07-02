"use client"
import Playlist from "@/components/entities/playlist/playlist";
import Post from "@/components/entities/post/post";
import {
    Post as TPost,
    usePlaylistsByOwnerIdSuspenseQuery,
} from "@/utils/graphql-requests/generated/schema";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/info-image/info-image";
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
                                <Playlist key={key} title={"Playlist1"} posts={playlist.tracks?.map((post, keyP) => {
                                    return (
                                        <Post data={post as TPost} key={keyP}/>
                                    );
                                })}/>
                            );
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.playlistsByOwnerId.count as number / limit)} />
                </>
                :
                <InfoImage text={"No public playlists found"}/>
            }
        </>
    );
}


