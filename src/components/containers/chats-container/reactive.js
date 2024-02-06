import { makeVar } from "@apollo/client";

export const chatsContainerStateBaseValues = {
    selectedChatId: null,
}


export const chatsContainerState = makeVar(
    chatsContainerStateBaseValues
);