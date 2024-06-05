import { makeVar } from "@apollo/client";

export const postSelectModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
})