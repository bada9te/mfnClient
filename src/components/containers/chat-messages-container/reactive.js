import { makeVar } from "@apollo/client";

export const chatMessagesContainerState = makeVar({
    replyingTo: null,
    messageText: "",
    messages: [],
    messagesPerLoad: 12,
});