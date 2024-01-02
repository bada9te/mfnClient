import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
    typePolicies: {
        Post: {
            keyFields: ['_id'],
            fields: {
                likedBy: {
                    merge(_, incoming) {
                        return incoming;
                    },
                },
                savedBy: {
                    merge(_, incoming) {
                        return incoming;
                    },
                }
            },
        },
        PostsWithCount: {
            fields: {
                posts: {
                    merge(_, incoming) {
                        return incoming
                    }
                },
            }
        },
        User: {
            keyFields: ['_id'],
        },
        Playlist: {
            keyFields: ['_id'],
        },
        Comment: {
            keyFields: ['_id']
        }
    }
});