import { gql } from "@apollo/client";
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
    query notifications($receiverId: ID!, $checked: Boolean!) {
        notifications(receiverId: $receiverId, checked: $checked) {
            ...CoreNotificationFields
        }
    }
`;
