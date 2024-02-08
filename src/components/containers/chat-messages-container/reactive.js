import { makeVar } from "@apollo/client";

export const replyingToNull = {
    messageId: null,
    userId: null,
    userNick: null,
}

export const chatMessagesContainerState = makeVar({
    replyingTo: replyingToNull,
    messageText: "",
    messages: [],
    messagesPerLoad: 6,
});