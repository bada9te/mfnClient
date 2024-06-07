import { makeVar } from "@apollo/client/index.js";
import { User } from "utils/graphql-requests/generated/schema";

export const postSelectContainerState = makeVar<{
    isMine: boolean;
    selectingFor: string;
    initiator: null | User;
    query: string;
}>({
    isMine: true,
    selectingFor: "battle",
    initiator: null,
    query: "",
});