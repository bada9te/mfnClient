import { makeVar } from "@apollo/client";

export const battlesContainerState = makeVar<{
    maxCountPerPage: number;
    maxPage: number;
    activePage: number;
    error: null | any,
}>({
    maxCountPerPage: 12,
    maxPage: 1,
    activePage: 1,
    error: null,
});