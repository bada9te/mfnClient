import { gql } from "@apollo/client/index.js";

export const CORE_USER_FIELDS = gql`
    fragment CoreUserFileds on User {
        _id
        nick
        description
        avatar
        background
        achievements
    }
`;



// Q
export const USER_QUERY = gql`
    ${CORE_USER_FIELDS}
    query user($_id: ID!) {
        user(_id: $_id) {
            ...CoreUserFileds
            subscribedOn {
                _id
            }
            subscribers {
                _id
            }
        }
    }
`;

export const USERS_BY_NICKNAME_QUERY = gql`
    ${CORE_USER_FIELDS}
    query usersByNickname($nick: String!) {
        usersByNickname(nick: $nick) {
            ...CoreUserFileds
            subscribedOn {
                _id
            }
            subscribers {
                _id
            }
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
export const USER_CREATE_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userCreate($input: AddUserInput!) {
        userCreate(input: $input) {
            user {
                ...CoreUserFileds
            }
            action {
                _id
            }
        }
    }
`;

export const USER_DELETE_BY_ID_MUTATION = gql`
    mutation userDeleteById($_id: ID!) {
        userDeleteById(_id: $_id) {
            _id
        }
    }
`;

export const USER_SWITCH_SUBSCRIPTION_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userSwitchSubscription($input: SwitchSubscriptionOnUserInput!) {
        userSwitchSubscription(input: $input) {
            subscriber {
                ...CoreUserFileds
                subscribedOn {
                    _id
                }
                subscribers {
                    _id
                }
            }
            subscribeOn {
                ...CoreUserFileds
                subscribedOn {
                    _id
                }
                subscribers {
                    _id
                }
            }
        }
    }
`;

export const USER_UPDATE_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userUpdate($input: UpdateUserInput!) {
        userUpdate(input: $input) {
            ...CoreUserFileds
        }
    }
`;

export const USER_PREPARE_ACCOUNT_TO_RESTORE_MUTATION = gql`
    mutation userPrepareAccountToRestore($input: PrepareAccountToRestoreInput!) {
        userPrepareAccountToRestore(input: $input) {
            user { _id }
            action { _id }
        }
    }
`;

export const USER_CONFIRM_ACCOUNT_MUTATION = gql`
    mutation userConfirmAccount($input: AccountConfirmInput!) {
        userConfirmAccount(input: $input) {
            user { _id }
            action { _id }
        }
    }
`;

export const USER_RESTORE_ACCOUNT_MUTATION = gql`
    mutation userRestoreAccount($input: AccountRestoreInput!) {
        userRestoreAccount(input: $input) {
            user { _id }
            action { _id }
        }
    }
`;
