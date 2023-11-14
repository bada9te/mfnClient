import { gql } from "@apollo/client";

export const CORE_POST_FIELDS = gql`
    fragment CorePostFields on Post {
        _id
        owner {
            _id
            avatar
            nick
        }
        savedBy {
            _id
        }
        likedBy {
            _id
        }
        comments {
            _id
        }
        createdAt
        image
        audio
        commentsAllowed
        downloadsAllowed
    }
`;

export const POST_QUERY = gql`
    ${CORE_POST_FIELDS}
    query post($_id: String!) {
        getPostById(_id: $_id) {
            ...CorePostFields
        }
    }
`;

export const POSTS_QUERY = gql`
    ${CORE_POST_FIELDS}
    query posts($offset: Int!, $limit: Int!) {
        posts(offset: $offset, limit: $limit) {
            posts {
                ...CorePostFields
            }
            count
        }
    }
`;

export const POSTS_BY_OWNER_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsByOwner($owner: ID!, $offset: Int!, $limit: Int!) {
        postsByOwner(owner: $owner, offset: $offset, limit: $limit) {
            posts {
                ...CorePostFields
            }
            count
        }
    }
`;

export const POSTS_SAVED_BY_USER_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsSavedByUser($user: ID!, $offset: Int!, $limit: Int!) {
        postsSavedByUser(user: $user, offset: $offset, limit: $limit) {
            posts {
                ...CorePostFields
            }
            count
        }
    }
`;

export const POSTS_BY_TITLE_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsByTitle($input: PostsByTitleInput!) {
        postsByTitle(input: $input) {
            ...CorePostFields
        }
    }
`;

export const POSTS_BY_IDS_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsByIds($ids: [ID!]!) {
        postsByIds(ids: $ids) {
            ...CorePostFields
        }
    }
`;

