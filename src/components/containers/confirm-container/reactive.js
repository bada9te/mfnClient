import { makeVar } from "@apollo/client";

export const confirmContainerState = makeVar({
    itemId: "",
    title: "",
    text: "",
    actionType: "",
});