import { makeVar } from "@apollo/client";

export const confirmModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});