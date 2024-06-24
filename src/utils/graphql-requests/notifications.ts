import { gql } from "@apollo/client/index.js";
import { CORE_COMMENT_FIELDS } from "./comments";
import { CORE_POST_FIELDS } from "./posts";


export const CORE_NOTIFICATION_FIELDS = gql`
    ${CORE_POST_FIELDS}
    ${CORE_COMMENT_FIELDS}
    fragment CoreNotificationFields on Notification {
        _id
        receiver {
            _id
        }
        sender {
            _id
            nick
            avatar
        }
        post {
            ...CorePostFields
        }
        comment {
            ...CoreCommentFields
        }
        text
        checked
        createdAt
    }
`;

// Q
export const NOTIFICATIONS_QUERY = gql`
    ${CORE_NOTIFICATION_FIELDS}
    query notifications($receiverId: ID!, $checked: Boolean!, $offset: Int!, $limit: Int!) {
        notifications(receiverId: $receiverId, checked: $checked, offset: $offset, limit: $limit) {
            ...CoreNotificationFields
        }
    }
`;


// M
export const CREATE_NOTIFICATION_MUTATION = gql`
    mutation notificationCreate($input: CreateNotificationInput!) {
        notificationCreate(input: $input) {
            _id
        }
    }
`;

export const DELETE_NOTIFICATION_MUTATION = gql`
    mutation notificationDeleteById($_id: ID!) {
        notificationDeleteById(_id: $_id) {
            _id
        }
    }
`;

export const DELETE_NOTIFICATIONS_MUTATION = gql`
    mutation notificationsDeleteByIds($ids: [ID!]!) {
        notificationsDeleteByIds(ids: $ids) {
            count
        }
    }
`;

export const MARK_NOTIFICATION_AS_READ_MUTATION = gql`
    mutation notificationMarkAsReadById($_id: ID!) {
        notificationMarkAsReadById(_id: $_id) {
            _id
        }
    }
`;

export const MARK_NOTIFICATIONS_AS_READ_MUTATION = gql`
    mutation notificationsMarkAsReadByIds($ids: [ID!]!) {
        notificationsMarkAsReadByIds(ids: $ids) {
            count
        }
    }
`;

