import { makeVar } from "@apollo/client";

export const userSelectModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});