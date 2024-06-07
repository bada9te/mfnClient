import { makeVar } from "@apollo/client/index.js";

export const userSelectModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});