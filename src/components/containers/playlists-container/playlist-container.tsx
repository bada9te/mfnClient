"use client"

import Playlist from "@/components/entities/playlist/playlist";
import { Post, usePlaylistSuspenseQuery } from "@/utils/graphql-requests/generated/schema";

export default function PlaylistContainer(props: {
    playlistId: string;
}) {
    const {data: playlistData} = usePlaylistSuspenseQuery({
        variables: {
            _id: props.playlistId
        }
    });

    return (
        <Playlist _id={playlistData.playlist._id} title={playlistData.playlist.title} posts={playlistData.playlist.tracks as Post[]} expanded/>
    );
}