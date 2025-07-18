import { gql } from "@apollo/client/index.js";
import { CORE_POST_FIELDS } from "./posts";

export const CORE_USER_FIELDS = gql`
    fragment CoreUserFields on User {
        _id
        nick
        description
        avatar
        background
        achievements
        level
    }
`;



// Q
export const CURRENT_USER_QUERY = gql`
    ${CORE_USER_FIELDS}
    query whoAmI {
        whoAmI {
            ...CoreUserFields
            local {
                email
            }
            google {
                email
            }
            facebook {
                name
            }
            twitter {
                name
            }
        }
    }
`;

export const USER_QUERY = gql`
    ${CORE_USER_FIELDS}
    query user($_id: ID!) {
        user(_id: $_id) {
            ...CoreUserFields
            local {
                email
            }
            google {
                email
            }
            facebook {
                name
            }
            twitter {
                name
            }
            subscribedOn {
                _id
            }
            subscribers {
                _id
            }
            likedPosts {
                _id
            }
            savedPosts {
                _id
            }
        }
    }
`;

export const USERS_BY_NICKNAME_QUERY = gql`
    ${CORE_USER_FIELDS}
    query usersByNickname($nick: String!) {
        usersByNickname(nick: $nick) {
            ...CoreUserFields
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
            ...CoreUserFields
        }
    }
`;

export const USER_ACHIEVEMENTS_DATA_QUERY = gql`
    query userAchievementsData($_id: ID!) {
        userAchievementsData(_id: $_id) {
            achievements
            totalLikes
            totalSaves
            maxLikesByPost
            maxSavesByPost
            postCount
            maxLikesPostId
            maxSavesPostId
            totalRP
        }
    }
`;

export const USER_PINNED_POSTS_QUERY = gql`
    ${CORE_POST_FIELDS}
    query userPinnedTracks($_id: ID!) {
        userPinnedTracks(_id: $_id) {
            ...CorePostFields
            owner {
                _id
                nick
                avatar
            }
        }
    }
`;

// M
export const USER_CREATE_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userCreate($input: AddUserInput!) {
        userCreate(input: $input) {
            user {
                ...CoreUserFields
            }
            action {
                _id
            }
        }
    }
`;

/*
export const USER_DELETE_BY_ID_MUTATION = gql`
    mutation userDeleteById($_id: ID!) {
        userDeleteById(_id: $_id) {
            _id
        }
    }
`;
*/

export const USER_SWITCH_SUBSCRIPTION_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userSwitchSubscription($input: SwitchSubscriptionOnUserInput!) {
        userSwitchSubscription(input: $input) {
            subscriber {
                ...CoreUserFields
                subscribedOn {
                    _id
                }
                subscribers {
                    _id
                }
            }
            subscribeOn {
                ...CoreUserFields
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
            ...CoreUserFields
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


export const USER_UNLINK_GOOGLE_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userUnlinkGoogle($_id: ID!) {
        userUnlinkGoogle(_id: $_id) {
            ...CoreUserFields
        }
    }
`;


export const USER_UNLINK_FACEBOOK_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userUnlinkFacebook($_id: ID!) {
        userUnlinkFacebook(_id: $_id) {
            ...CoreUserFields
        }
    }
`;


export const USER_UNLINK_TWITTER_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userUnlinkTwitter($_id: ID!) {
        userUnlinkTwitter(_id: $_id) {
            ...CoreUserFields
        }
    }
`;


export const USER_SWITCH_LIKE_MUTATION = gql`
    ${CORE_POST_FIELDS}
    ${CORE_USER_FIELDS}
    mutation userSwitchLike($input: SwitchLikeOrPostInSavedInput!) {
        userSwitchLike(input: $input) {
            post {
                ...CorePostFields
            }
            user {
                ...CoreUserFields
            }
        }
    }
`;

export const USER_SWITCH_SAVE_MUTATION = gql`
    ${CORE_POST_FIELDS}
    ${CORE_USER_FIELDS}
    mutation userSwitchSave($input: SwitchLikeOrPostInSavedInput!) {
        userSwitchSave(input: $input) {
            post {
                ...CorePostFields
            }
            user {
                ...CoreUserFields
            }
        }
    }
`;

export const USER_SWITCH_POST_PINNED_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userSwitchPostPinned($userId: ID!, $postId: ID!) {
        userSwitchPostPinned(userId: $userId, postId: $postId) {
            ...CoreUserFields
            _id
            nick
            avatar
        }
    }
`

export const USER_LINK_EMAIL_REQUEST_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation userLinkEmailRequest($input: LinkEmailInput!) {
        userLinkEmailRequest(input: $input) {
            _id
        }
    }
`;