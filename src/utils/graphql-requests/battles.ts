import { gql } from "@apollo/client/index.js";
import { CORE_POST_FIELDS } from "./posts";


export const CORE_BATTLE_FIELDS = gql`
    ${CORE_POST_FIELDS}
    fragment CoreBattleFields on Battle {
        _id
        title
        post1 {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
        post2 {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
        winner {
            _id
        }
        createdAt
        willFinishAt
        finished
        votedBy {
            _id
        }
        post1Score
        post2Score
    }
`;

// Q
export const BATTLES_BY_STATUS_QUERY = gql`
    ${CORE_BATTLE_FIELDS}
    query battlesByStatus($finished: Boolean!, $offset: Int!, $limit: Int!) {
        battlesByStatus(finished: $finished, offset: $offset, limit: $limit) {
            battles {
                ...CoreBattleFields
            }
            count
        }
    }
`;

export const BATTLE_BY_ID_QUERY = gql`
    ${CORE_BATTLE_FIELDS}
    query battleById($_id: ID!) {
        battleById(_id: $_id) {
            ...CoreBattleFields
        }
    }
`;

// M
export const BATTLE_MAKE_VOTE_MUTATION = gql`
    ${CORE_BATTLE_FIELDS}
    mutation battleMakeVote($input: MakeBattleVoteInput!) {
        battleMakeVote(input: $input) {
            ...CoreBattleFields
        }
    }
`;

export const BATTLE_CREATE_MUTATTION = gql`
    mutation battleCreate($input: AddNewBattleByPostsIdsInput!) {
        battleCreate(input: $input) {
            _id
        }
    }
`;