import { makeVar } from "@apollo/client";
import { ChatMessage } from "utils/graphql-requests/generated/schema";

export type TReplyingToNull = {
    messageId: null | string,
    userId:    null | string,
    userNick:  null | string,
}

export type TSendMessage = {
    owner: string;
    text: string;
    chat: string;
    type: string;
    reply?: string;
}

export const replyingToNull = {
    messageId: null,
    userId: null,
    userNick: null,
}

export const chatMessagesContainerState = makeVar<{
    replyingTo: TReplyingToNull;
    editingMessageId: null | string;
    messageText: string;
    messages: ChatMessage[];
    messagesPerLoad: number;
}>({
    replyingTo: replyingToNull,
    editingMessageId: null,
    messageText: "",
    messages: [],
    messagesPerLoad: 12,
});