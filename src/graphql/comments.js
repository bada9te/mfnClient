import { gql } from "@apollo/client";


// M
export const COMMENT_DELETE_BY_ID_MUTATION = gql`
    mutation commentDeleteById($_id: ID!) {
        commentDeleteById(_id: $_id) {
            _id
        }
    }
`;