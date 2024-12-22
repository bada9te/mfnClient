import {InMemoryCache} from "@apollo/experimental-nextjs-app-support"


const cache = new InMemoryCache({
    typePolicies: {
        Post: {
            keyFields: ['_id'],
            fields: {
                likedBy: {
                    merge(_, incoming) {
                        return incoming;
                    },
                },
                

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
            fields: {
                subscribedOn: {
                    merge(_, incoming) {
                        return incoming
                    }
                },
                subscribers: {
                    merge(_, incoming) {
                        return incoming
                    }
                }
            }
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
        Chat: {
            keyFields: ['_id'],
            fields: {
                participants: {
                    merge(_, incoming) {
                        return incoming;
                    }
                }
            }
        },
        Query: {
            fields: {
                chatMessagesByChatId: {
                    merge(_, incoming) {
                        return incoming;
                    }
                }
            }
        }
    }
});


export default cache;