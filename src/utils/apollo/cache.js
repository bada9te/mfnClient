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
            keyFields: ['posts'],
            fields: {
                posts: {
                    merge(_, incoming) {
                        return incoming
                    }
                },
                count: {
                    merge(_, incoming) {
                        return incoming
                    }
                }
            }
        },
        PlaylistsWithCount: {
            keyFields: ['playlists'],
            fields: {
                playlists: {
                    merge(_, incoming) {
                        return incoming
                    }
                },
                count: {
                    merge(_, incoming) {
                        return incoming
                    }
                }
            }
        },
        User: {
            keyFields: ['_id'],
        },
        Playlist: {
            keyFields: ['_id'],
            fields: {
                tracks: {
                    merge(_, incoming) {
                        return incoming
                    }
                }
            }
        },
        Comment: {
            keyFields: ['_id']
        },
        
    }
});