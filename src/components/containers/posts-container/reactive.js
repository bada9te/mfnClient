import { makeVar } from "@apollo/client";

export const postsContainerState = makeVar({
    posts: [],
    isLoading: true,
    maxCountPerPage: 12,
    maxPage: 1,
    activePage: 1,
    error: null,
});