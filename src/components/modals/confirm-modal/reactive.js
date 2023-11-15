import { makeVar } from "@apollo/client";

export const confirmModalState = makeVar({
    isShowing: false,
});