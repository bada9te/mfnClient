"use client"
import Playlist from "@/components/entities/playlist/playlist";
import Post from "@/components/entities/post/post";
import {
    usePlaylistsByOwnerIdSuspenseQuery,
} from "@/utils/graphql-requests/generated/schema";
import Pagination from "@/components/pagination/pagination";
import InfoImage from "@/components/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import {useAppSelector} from "@/lib/redux/store";

export default function PlaylistsContainerOwner(props: TPaginationProps) {
    const { offset, limit, page } = props;
    const { user } = useAppSelector(state => state.user.user);

    const { data } = usePlaylistsByOwnerIdSuspenseQuery({
        variables: {
            offset, limit, owner: user._id
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
                                <Playlist key={key} title={"Playlist1"} posts={[<Post/>, <Post/>, <Post/>]}/>
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


