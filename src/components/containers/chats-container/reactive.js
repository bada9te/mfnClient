import { makeVar } from "@apollo/client";

export const chatsContainerStateBaseValues = {
    selectedChatId: null,
    replyingTo: null,
    messageText: "",
    messages: [],
    messagesPerLoad: 12,
}


export const chatsContainerState = makeVar(
    chatsContainerStateBaseValues
);