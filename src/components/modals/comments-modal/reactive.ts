import { makeVar } from "@apollo/client/index.js";

export const commentsModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});