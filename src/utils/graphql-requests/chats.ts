import { gql } from "@apollo/client/index.js";


export const CORE_CHAT_FIELDS = gql`
    fragment CoreChatFields on Chat {
        _id
        title
        owner {
            _id
        }
        participants {
            _id
        }
        messagesUnreadCount {
            user {
                _id
            }
            count
        }
    }
`;

// Q
export const CHAT_QUERY = gql`
    ${CORE_CHAT_FIELDS}
    query chat($_id: ID!, $userId: ID) {
        chat(_id: $_id, userId: $userId) {
            ...CoreChatFields
            participants {
                avatar
                nick
            }
        }
    }
`;

export const CHATS_BY_IDS_QUERY = gql`
    ${CORE_CHAT_FIELDS}
    query chatsByIds($ids: [ID!]!) {
        chatsByIds(ids: $ids) {
            ...CoreChatFields
            participants {
                avatar
                nick
            }
        }
    }
`;

export const CHATS_USER_RELATED_BY_USER_ID_QUERY = gql`
    ${CORE_CHAT_FIELDS}
    query chatsUserRelatedByUserId($_id: ID!) {
        chatsUserRelatedByUserId(_id: $_id) {
            ...CoreChatFields
            participants {
                avatar
                nick
            }
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
    mutation chatUpdate($input: ChatUpdateInput!) {
        chatUpdate(input: $input) {
            ...CoreChatFields
        }
    }
`;

export const CHAT_READ_ALL_MESSAGES_MUTATION = gql`
    mutation chatReadAllMessages($chatId: ID!, $userId: ID!) {
        chatReadAllMessages(chatId: $chatId, userId: $userId) {
            _id
        }
    }
`;

export const CHAT_SWITCH_PARTICIPANT_MUTATION = gql`
    ${CORE_CHAT_FIELDS}
    mutation chatSwitchParticipants($chatId: ID!, $participants: [ID!]!) {
        chatSwitchParticipants(chatId: $chatId, participants: $participants) {
            ...CoreChatFields
            participants {
                avatar
                nick
            }
        }
    }
`;

export const CHAT_SWITCH_MESSAGE_MUTATION = gql`
    ${CORE_CHAT_FIELDS}
    mutation chatSwitchMessage($chatId: ID!, $messageId: ID!) {
        chatSwitchMessage(chatId: $chatId, messageId: $messageId) {
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
