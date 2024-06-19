import { gql } from "@apollo/client/index.js";

// Q
export const MODERATION_ACTION_VALIDATE_QUERY = gql`
    query moderationActionValidate($input: ModerateActionInput!) {
        moderationActionValidate(input: $input) {
            _id
        }
    }
`;

// M
export const MODERATION_ACTION_CREATE_MUTATION = gql`
    mutation moderationActionCreate($input: CreateModerationActionInput!) {
        moderationActionCreate(input: $input) {
            _id
        }
    }
`;

export const MODERATION_ACTION_DELETE_MUTATION = gql`
    mutation moderationActionDelete($input: ModerateActionInput!) {
        moderationActionDelete(input: $input) {
            _id
        }
    }
`;

