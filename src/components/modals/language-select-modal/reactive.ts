import { makeVar } from "@apollo/client/index.js";

export const languageSelectModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});