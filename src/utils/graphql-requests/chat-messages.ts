import { gql } from "@apollo/client/index.js";

export const CORE_CHAT_MESSAGE_FIELDS = gql`
    fragment CoreChatMessageFields on ChatMessage {
        _id
        owner {
            _id
        }
        chat {
            _id
        }
        text
        image
        video
        audio
        file
        spotify
        createdAt
    }
`;


// Q
export const CHAT_MESSAGE_QUERY = gql`
    ${CORE_CHAT_MESSAGE_FIELDS}
    query chatMessage($_id: ID!) {
        chatMessage(_id: $_id) {
            ...CoreChatMessageFields
            owner {
                avatar nick
            }
        }
    }
`;

export const CHAT_MESSAGES_BY_CHAT_ID_QUERY = gql`
    ${CORE_CHAT_MESSAGE_FIELDS}
    query chatMessagesByChatId($_id: ID!, $offset: Int!, $limit: Int!) {
        chatMessagesByChatId(_id: $_id, offset: $offset, limit: $limit) {
            ...CoreChatMessageFields
            owner {
                avatar nick
            }
            reply {
                ...CoreChatMessageFields
                owner {
                    avatar nick
                }
            }
        }
    }
`;

// M
export const CHAT_MESSAGE_CREATE_MUTATION = gql`
    ${CORE_CHAT_MESSAGE_FIELDS}
    mutation chatMessageCreate($input: ChatMessageCreateInput!) {
        chatMessageCreate(input: $input) {
            ...CoreChatMessageFields
            owner {
                avatar nick
            }
            reply {
                ...CoreChatMessageFields
                owner {
                    avatar nick
                }
            }
        }
    }
`;

export const CHAT_MESSAGE_DELETE_BY_ID_MUTATION = gql`
    ${CORE_CHAT_MESSAGE_FIELDS}
    mutation chatMessageDeleteById($_id: ID!) {
        chatMessageDeleteById(_id: $_id) {
            ...CoreChatMessageFields
        }
    }
`;

export const CHAT_MESSAGE_UPDATE_MUTATION = gql`
    ${CORE_CHAT_MESSAGE_FIELDS}
    mutation chatMessageUpdate($input: ChatMessageUpdateInput!) {
        chatMessageUpdate(input: $input) {
            ...CoreChatMessageFields
        }
    }
`;


