import { gql } from "@apollo/client";

export const CORE_USER_FIELDS = gql`
    fragment CoreUserFileds on User {
        _id
        nick
        description
        avatar
        background
    }
`;



// Q
export const USERS_BY_NICKNAME_QUERY = gql`
    ${CORE_USER_FIELDS}
    query usersByNickname($nick: String!) {
        usersByNickname(nick: $nick) {
            ...CoreUserFileds
        }
    }
`;

export const USERS_BY_IDS_QUERY = gql`
    ${CORE_USER_FIELDS}
    query usersByIds($ids: [ID!]!) {
        usersByIds(ids: $ids) {
            ...CoreUserFileds
        }
    }
`;

// M
export const USER_DELETE_BY_ID_MUTATION = gql`
    mutation userDeleteById($_id: ID!) {
        userDeleteById(_id: $_id) {
            _id
        }
    }
`;