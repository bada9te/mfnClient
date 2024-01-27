import { gql } from "@apollo/client";


export const CORE_CHAT_FIELDS = gql`
    fragment CoreChatFields on Chat {
        _id
        title
        owner {
            _id
        }
        participants {
            _id
            avatar
            nick
        }
        messages {
            _id
            text
        }
    }
`;

// Q
export const CHAT_QUERY = gql`
    ${CORE_CHAT_FIELDS}
    query chat($_id: ID!) {
        chat(_id: $_id) {
            ...CoreChatFields
        }
    }
`;

export const CHATS_BY_IDS_QUERY = gql`
    ${CORE_CHAT_FIELDS}
    query chatsByIds($ids: [ID!]!) {
        chatsByIds(ids: $ids) {
            ...CoreChatFields
        }
    }
`;

export const CHATS_USER_RELATED_BY_USER_ID_QUERY = gql`
    ${CORE_CHAT_FIELDS}
    query chatsUserRelatedByUserId($_id: ID!) {
        chatsUserRelatedByUserId(_id: $_id) {
            ...CoreChatFields
        }
    }
`;


// M
export const CHAT_CREATE_MUTATION = gql`
    ${CORE_CHAT_FIELDS}
    mutation chatCreate($input: ChatCreateInput!) {
        chatCreate(input: $input) {
            ...CoreChatFields
        }
    }
`;

export const CHAT_UPDATE_MUTATION = gql`
    ${CORE_CHAT_FIELDS}
    mutation chatCreate($input: ChatUpdateInput!) {
        chatCreate(input: $input) {
            ...CoreChatFields
        }
    }
`;

export const CHAT_SWITCH_MESSAGE_MUTATION = gql`
    ${CORE_CHAT_FIELDS}
    mutation chatSwicthMessage($chatId: ID!, $messageId: ID!) {
        chatSwicthMessage(chatId: $chatId, messageId: $messageId) {
            ...CoreChatFields
        }
    }
`;

export const CHAT_DELETE_BY_ID_MUTATION = gql`
    ${CORE_CHAT_FIELDS}
    mutation chatDeleteById($_id: ID!) {
        chatDeleteById(_id: $_id) {
            ...CoreChatFields
        }
    }
`;