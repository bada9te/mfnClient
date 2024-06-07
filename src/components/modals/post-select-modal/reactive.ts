import { makeVar } from "@apollo/client/index.js";

export const postSelectModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
})