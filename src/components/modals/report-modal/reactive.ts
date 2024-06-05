import { makeVar } from "@apollo/client";

export const reportModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});