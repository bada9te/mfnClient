import { makeVar } from "@apollo/client";

export const battlesContainerState = makeVar({
    maxCountPerPage: 12,
    maxPage: 1,
    activePage: 1,
    error: null,
});