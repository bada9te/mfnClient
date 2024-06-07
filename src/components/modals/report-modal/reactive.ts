import { makeVar } from "@apollo/client/index.js";

export const reportModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});