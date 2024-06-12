import { makeVar } from "@apollo/client/index.js";

export const categoriesContainerState = makeVar<{
    selectedCategory: null | string;
    openedTab: number;
}>({
    selectedCategory: null,
    openedTab: 0,
});