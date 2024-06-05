import { makeVar } from "@apollo/client";

export const commentsModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});