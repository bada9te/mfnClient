import { makeVar } from "@apollo/client";

export const languageSelectModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});