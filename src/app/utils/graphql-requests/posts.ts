import { gql } from "@apollo/client/index.js";


export const CORE_POST_FIELDS = gql`
    fragment CorePostFields on Post {
        _id
        title
        description
        saves
        likes
        createdAt
        image
        audio
        downloadsAllowed
        category
    }
`;


// Q
export const POST_QUERY = gql`
    ${CORE_POST_FIELDS}
    query post($_id: ID!) {
        post(_id: $_id) {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;

export const POSTS_QUERY = gql`
    ${CORE_POST_FIELDS}
    query posts($offset: Int!, $limit: Int!) {
        posts(offset: $offset, limit: $limit) {
            posts {
                ...CorePostFields
                owner {
                    _id
                    avatar
                    nick
                }
            }
            count
        }
    }
`;

export const POSTS_BY_OWNER_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsByOwner($owner: ID!, $offset: Int!, $limit: Int!) {
        postsByOwner(owner: $owner, offset: $offset, limit: $limit) {
            posts {
                ...CorePostFields
                owner {
                    _id
                    avatar
                    nick
                }
            }
            count
        }
    }
`;

export const POSTS_SAVED_BY_USER_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsSavedByUser($user: ID!, $offset: Int!, $limit: Int!) {
        postsSavedByUser(user: $user, offset: $offset, limit: $limit) {
            posts {
                ...CorePostFields
                owner {
                    _id
                    avatar
                    nick
                }
            }
            count
        }
    }
`;

export const POSTS_BY_TITLE_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsByTitle($input: PostsByTitleInput!) {
        postsByTitle(input: $input) {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;

export const POSTS_BY_IDS_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsByIds($ids: [ID!]!) {
        postsByIds(ids: $ids) {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;

export const POSTS_MOST_POPULAR_BY_STARTDATE_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsMostPopular($date: Date!) {
        postsMostPopular(date: $date) {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;

export const POSTS_BY_CATEGORY_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsByCategory($category: String!, $offset: Int!, $limit: Int!) {
        postsByCategory(category: $category, offset: $offset, limit: $limit) {
            posts {
                ...CorePostFields
                owner {
                    _id
                    avatar
                    nick
                }
            }
            count
        }
    }
`;

export const POSTS_BY_CATEGORIES_COUNT = gql`
    query postsByCategoryCount {
        postsByCategoryCount {
            country
            pop
            classical
            funk
            soul
            hipHop
            rock
            electronic
            latin
            jazz
            blues
            folk
            metal
            reggae
        }
    }
`;

export const POSTS_MOST_RECENT_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsMostRecent {
        postsMostRecent {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;

export const POSTS_MOST_RECENT_BY_FOLLOWING_QUERY = gql`
    ${CORE_POST_FIELDS}
    query postsMostRecentByFollowing($user: ID!) {
        postsMostRecentByFollowing(user: $user) {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;


// M
export const POST_CREATE_MUTATION = gql`
    ${CORE_POST_FIELDS}
    mutation postCreate($input: AddPostInput!) {
        postCreate(input: $input) {
            ...CorePostFields
        }
    }
`;

export const POST_DELETE_BY_ID_MUTATION = gql`
    ${CORE_POST_FIELDS}
    mutation postDeleteById($_id: ID!) {
        postDeleteById(_id: $_id) {
            _id
            title
        }
    }
`;


export const POST_UPDATE_BY_ID_MUTATION = gql`
    ${CORE_POST_FIELDS}
    mutation postUpdate($input: UpdatePostInput!) {
        postUpdate(input: $input) {
            ...CorePostFields
            owner {
                _id
                avatar
                nick
            }
        }
    }
`;