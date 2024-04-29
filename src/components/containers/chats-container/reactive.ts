import { makeVar } from "@apollo/client";

export const chatsContainerStateBaseValues = {
    selectedChatId: null,
}


export const chatsContainerState = makeVar<{
    selectedChatId: null | string;
}>(
    chatsContainerStateBaseValues
);