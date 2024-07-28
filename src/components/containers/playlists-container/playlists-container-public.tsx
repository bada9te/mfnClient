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


export default function PlaylistsContainerPublic(props: TPaginationProps) {
    const { offset, limit, page } = props;

    const { data } = usePlaylistsPublicAvailableSuspenseQuery({
        variables: {
            offset, limit
        }
    });

    return (
        <>
            {
                data?.playlistsPublicAvailable.playlists?.length
                ?
                <>
                    {
                        data?.playlistsPublicAvailable.playlists?.map((playlist, key) => {
                            return (
                                <Playlist key={key} _id={playlist._id} title={playlist.title} posts={playlist.tracks as TPost[]}/>
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


