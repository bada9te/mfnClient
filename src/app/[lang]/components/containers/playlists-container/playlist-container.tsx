"use client"

import Playlist from "../../entities/playlist/playlist";
import { getDictionary } from "@/app/translations/dictionaries";
import { Post, usePlaylistSuspenseQuery } from "@/app/utils/graphql-requests/generated/schema";

export default function PlaylistContainer(props: {
    playlistId: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const {data: playlistData} = usePlaylistSuspenseQuery({
        variables: {
            _id: props.playlistId
        }
    });

    return (
        <Playlist 
            _id={playlistData?.playlist._id as string} 
            title={playlistData?.playlist.title as string} 
            posts={playlistData?.playlist.tracks as Post[]} 
            expanded 
            dictionary={props.dictionary}
        />
    );
}