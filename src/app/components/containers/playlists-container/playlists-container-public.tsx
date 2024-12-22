"use client"
import Playlist from "@/app/components/entities/playlist/playlist";
import Post from "@/app/components/entities/post/post";
import {
    usePlaylistsPublicAvailableSuspenseQuery,
    Post as TPost
} from "@/app/utils/graphql-requests/generated/schema";
import Pagination from "@/app/components/common/pagination/pagination";
import InfoImage from "@/app/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/app/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import PlaylistSkeleton from "@/app/components/entities/playlist/playlist-skeleton";


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


