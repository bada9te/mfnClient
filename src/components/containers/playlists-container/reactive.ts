import { makeVar } from "@apollo/client/index.js";
import { Playlist } from "utils/graphql-requests/generated/schema";

export const playlistsContainerState = makeVar<{
    playlists: Playlist[];
    isLoading: boolean;
    page: string;
    targetPlaylist: null | string;

    maxCountPerPage: number;
    maxPage: number;
    activePage: number;
    error: null | string,
}>({
    playlists: [],
    isLoading: true,
    page: "Explore",
    targetPlaylist: null,

    maxCountPerPage: 12,
    maxPage: 1,
    activePage: 1,
    error: null,
});