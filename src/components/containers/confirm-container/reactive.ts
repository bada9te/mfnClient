import { makeVar } from "@apollo/client/index.js";

export const confirmContainerState = makeVar<{
    itemId: string;
    title: string;
    text: string;
    actionType: string;
}>({
    itemId: "",
    title: "",
    text: "",
    actionType: "",
});