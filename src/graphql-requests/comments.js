import { gql } from "@apollo/client";


export const CORE_COMMENT_FIELDS = gql`
    fragment CoreCommentFields on Comment {
        _id
        owner {
            _id
            avatar
            nick
        }
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