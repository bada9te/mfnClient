import { makeVar } from "@apollo/client/index.js";

export const walletConnectModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});