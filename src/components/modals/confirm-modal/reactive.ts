import { makeVar } from "@apollo/client/index.js";

export const confirmModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});