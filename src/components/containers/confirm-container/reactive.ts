import { makeVar } from "@apollo/client";

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