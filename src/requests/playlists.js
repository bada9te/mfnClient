import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;


// create
const httpCreatePlaylist = async(owner, title, publicAccess) => {
    return await axios.post(`${API_URL}/playlists/create`, {
        playlist: {
            owner, 
            title,
            public: publicAccess,
        }
    });
}

// delete
const httpDeletePlaylistById = async(playlistId) => {
    return await axios.post(`${API_URL}/playlists/delete`, {
        id: playlistId,
    });
}

// swicth track in playlist
const httpSwitchTrackInPlaylist = async(playlistId, trackId) => {
    return await axios.post(`${API_URL}/playlists/switch-track`, {
        playlistId, 
        trackId,
    });
}

// get by owner
const httpGetPlaylistsByOwner = async(ownerId) => {
    return await axios.get(`${API_URL}/playlists/owner`, {
        params: {
            ownerId,
        },
    });
}

// get by title
const httpGetPlaylistsByTitle = async(title) => {
    return await axios.get(`${API_URL}/playlists/title`, {
        params: {
            title,
        },
    });
}

// get public available
const httpGetPublicavailablePlaylists = async(skipCount) => {
    return await axios.get(`${API_URL}/playlists/public-available`, {
        params: {
            skipCount,
        }
    });
}


export {
    httpCreatePlaylist,
    httpDeletePlaylistById,
    httpSwitchTrackInPlaylist,
    httpGetPlaylistsByOwner,
    httpGetPlaylistsByTitle,
    httpGetPublicavailablePlaylists,
}