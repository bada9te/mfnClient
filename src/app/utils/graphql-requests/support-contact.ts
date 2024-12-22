import { gql } from "@apollo/client/index.js";


// M
export const SUPPORT_CONTACT_CREATE_MUTATION = gql`
    mutation supportRequestCreate($input: CreateSupportRequestInput!) {
        supportRequestCreate(input: $input) {
            _id
        }
    }
`;

export const SUPPORT_CONTACT_CLOSE_MUTATION = gql`
    mutation supportRequestClose($_id: ID!) {
        supportRequestClose(_id: $_id) {
            _id
        }
    }
`;