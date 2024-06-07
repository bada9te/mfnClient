import { makeVar } from "@apollo/client/index.js";

export const chatCreateModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});