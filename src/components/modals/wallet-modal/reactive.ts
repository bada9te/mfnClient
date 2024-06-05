import { makeVar } from "@apollo/client";

export const walletConnectModalState = makeVar<{
    isShowing: boolean;
}>({
    isShowing: false,
});