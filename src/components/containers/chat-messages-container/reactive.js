import { makeVar } from "@apollo/client";

export const replyingToNull = {
    messageId: null,
    userId: null,
    userNick: null,
}

export const chatMessagesContainerState = makeVar({
    replyingTo: replyingToNull,
    editingMessageId: null,
    messageText: "",
    messages: [],
    messagesPerLoad: 12,
});