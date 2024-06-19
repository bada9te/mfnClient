import { gql } from "@apollo/client/index.js";


export const CORE_COMMENT_FIELDS = gql`
    fragment CoreCommentFields on Comment {
        _id
        text
        isReply
        replies {
            _id   
            owner {
                _id
                avatar
                nick
            }
            text
            createdAt
        }
        post {
            _id
        }
        createdAt
    }
`;

// Q
export const COMMENTS_BY_IDS_QUERY = gql`
    ${CORE_COMMENT_FIELDS}
    query commentsByIds($ids: [ID!]!) {
        commentsByIds(ids: $ids) {
            ...CoreCommentFields 
            owner {
                _id
                avatar
                nick
            }   
        }
    }
`;

export const COMMENTS_REPLIES_BY_COMMENT_ID = gql`
    ${CORE_COMMENT_FIELDS}
    query commentReplies($_id: ID!) {
        commentReplies(_id: $_id) {
            ...CoreCommentFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;

export const COMMENTS_BY_POST_ID = gql`
    ${CORE_COMMENT_FIELDS}
    query commentsByPostId($_id: ID!) {
        commentsByPostId(_id: $_id) {
            ...CoreCommentFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;

// M
export const COMMENT_CREATE_MUTATION = gql`
    ${CORE_COMMENT_FIELDS}
    mutation commentCreate($input: AddCommentInput!) {
        commentCreate(input: $input) {
            ...CoreCommentFields
        }
    }
`;

export const COMMENT_DELETE_BY_ID_MUTATION = gql`
    mutation commentDeleteById($_id: ID!) {
        commentDeleteById(_id: $_id) {
            _id
        }
    }
`;