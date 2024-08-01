import { gql } from "@apollo/client";

export const CORE_ACHIEVEMENT_FIELDS = gql`
    fragment CoreAchievementFields on Achievement {
        _id
        title
        achievement
        description
        type
        count
        rarity
        posNumber
    }
`;

// Q
export const ACHIEVEMENTS_ALL_QUERY = gql`
    ${CORE_ACHIEVEMENT_FIELDS}
    query allAchievements() {
        allAchievements() {
            ...CoreAchievementFields
        }
    }
`;

export const ACHIEVEMENTS_BY_IDS_QUERY = gql`
    ${CORE_ACHIEVEMENT_FIELDS}
    query achievementsByIds($ids: [ID!]!) {
        achievementsByIds(ids: $ids) {
            ...CoreAchievementFields
        }
    }
`;

export const ACHIVEEMENTS_BY_POS = gql`
    ${CORE_ACHIEVEMENT_FIELDS}
    query achievementsByPos($pos: [Int!]!) {
        achievementsByPos(pos: $pos) {
            ...CoreAchievementFields
        }
    }
`;
