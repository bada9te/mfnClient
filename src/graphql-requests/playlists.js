import { gql } from "@apollo/client";
import { CORE_POST_FIELDS } from "./posts";

export const CORE_PLAYLIST_FIELDS = gql`
    ${CORE_POST_FIELDS}
    fragment CorePlaylistFields on Playlist {
        _id
        owner {
            _id
            nick
            avatar
        }
        title
        tracks {
            ...CorePostFields
            owner {
                _id
                nick
                avatar        
            }
        }
        public
        createdAt
    }
`;

// Q
export const PLAYLISTS_BY_OWNER_ID_QUERY = gql`
    ${CORE_PLAYLIST_FIELDS}
    query playlistsByOwnerId($owner: ID!, $offset: Int!, $limit: Int!) {
        playlistsByOwnerId(owner: $owner, offset: $offset, limit: $limit) {
            playlists {
                ...CorePlaylistFields
            }
            count
        }
    }
`;

export const PLAYLISTS_PUBLIC_AWAILABLE_QUERY = gql`
    ${CORE_PLAYLIST_FIELDS}
    query playlistsPublicAvailable($offset: Int!, $limit: Int!) {
        playlistsPublicAvailable(offset: $offset, limit: $limit) {
            playlists {
                ...CorePlaylistFields
            }
            count
        }
    }
`;



// M
export const PLAYLIST_CREATE_MUTATION = gql`
    ${CORE_PLAYLIST_FIELDS}
    mutation playlistCreate($input: CreatePlaylistInput!) {
        playlistCreate(input: $input) {
            ...CorePlaylistFields
        }
    }
`;

export const PLAYLIST_SWICTH_TRACK_MUTATION = gql`
    ${CORE_PLAYLIST_FIELDS}
    mutation playlistSwicthTrack($input: SwitchTrackInPlaylistInput!) {
        playlistSwicthTrack(input: $input) {
            ...CorePlaylistFields
        }
    }
`;