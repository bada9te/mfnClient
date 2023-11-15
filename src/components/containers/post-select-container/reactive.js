import { makeVar } from "@apollo/client";

export const postSelectContainerState = makeVar({
    isMine: true,
    selectingFor: "battle",
    initiator: null,
    query: "",
});