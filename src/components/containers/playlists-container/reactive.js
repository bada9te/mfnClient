import { makeVar } from "@apollo/client";

export const playlistsContainerState = makeVar({
    playlists: [],
    isLoading: true,
    page: "Explore",
    targetPlaylist: null,

    maxCountPerPage: 12,
    maxPage: 1,
    activePage: 1,
    error: null,
});