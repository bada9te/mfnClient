import { gql } from "@apollo/client";


// M
export const REPORT_CREATE_MUTATION = gql`
    mutation reportCreate($input: CreateReportInput!) {
        reportCreate(input: $input) {
            _id
        }
    }
`;