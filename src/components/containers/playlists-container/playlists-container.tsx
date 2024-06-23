"use client"
import Playlist from "@/components/entities/playlist/playlist";
import Post from "@/components/entities/post/post";
import {
    usePlaylistsByOwnerIdLazyQuery,
    usePlaylistsPublicAvailableLazyQuery
} from "@/utils/graphql-requests/generated/schema";
import {useAppSelector} from "@/lib/redux/store";
import {useEffect} from "react";
import PlaylistsContainerSkeleton from "@/components/containers/playlists-container/playlists-container-skeleton";
import Pagination from "@/components/pagination/pagination";
import InfoImage from "@/components/info-image/info-image";

export default function PlaylistsContainer(props: {
    offset: number;
    limit: number;
    page: number;
    type: "explore" | "my";
}) {
    const { offset, limit, page, type } = props;
    const user = useAppSelector(state => state.user.user);

    const [getPlaylistsByOwnerId, { data: oDate, loading: oLoading }] = usePlaylistsByOwnerIdLazyQuery({
        variables: {
            offset, limit, owner: user?._id
        }
    });

    const [getPublicAvailablePlaylists, {data: pData, loading: pLoading}] = usePlaylistsPublicAvailableLazyQuery({
        variables: {
            offset, limit
        }
    });

    useEffect(() => {
        switch (type) {
            case "explore":
                getPublicAvailablePlaylists();
                break;
            case "my":
                getPlaylistsByOwnerId();
                break;
        }
    }, [type, getPlaylistsByOwnerId, getPublicAvailablePlaylists]);

    return (
        <>
            {
                oLoading || pLoading
                ?
                <PlaylistsContainerSkeleton/>
                :
                <>
                    {
                        type === "explore"
                        ?
                        <>
                            {
                                pData?.playlistsPublicAvailable.playlists?.length
                                ?
                                <>
                                    {
                                        pData?.playlistsPublicAvailable.playlists?.map((playlist, key) => {
                                            return (
                                                <Playlist key={key} title={"Playlist1"} posts={[<Post/>, <Post/>, <Post/>]}/>
                                            );
                                        })
                                    }
                                    <Pagination page={page} maxPage={Number(pData?.playlistsPublicAvailable.count as number / limit)} />
                                </>
                                :
                                <InfoImage text={"No public playlists found"}/>
                            }

                        </>
                        :
                        <>
                            {
                                oDate?.playlistsByOwnerId.playlists?.length
                                ?
                                <>
                                    {
                                        oDate?.playlistsByOwnerId.playlists?.map((playlist, key) => {
                                            return (
                                                <Playlist key={key} title={"Playlist1"} posts={[<Post/>, <Post/>, <Post/>]}/>
                                            );
                                        })
                                    }

                                    <Pagination page={page} maxPage={Number(oDate?.playlistsByOwnerId.count as number / limit)} />
                                </>
                                :
                                <InfoImage text={"No playlists found"}/>
                            }
                        </>
                    }
                </>
            }
        </>
    );
}


