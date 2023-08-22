import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;


// create
const httpCreatePlaylist = async(owner, title) => {
    return await axios.post(`${API_URL}/playlists/create`, {
        playlist: {
            owner, 
            title,
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
const httpGetPlaylistByOwner = async(ownerId) => {
    return await axios.post(`${API_URL}/playlists/owner`, {
        ownerId,
    });
}

// get by title
const httpGetPlaylistByTitle = async(title) => {
    return await axios.post(`${API_URL}/playlists/title`, {
        title,
    });
}


export {
    httpCreatePlaylist,
    httpDeletePlaylistById,
    httpSwitchTrackInPlaylist,
    httpGetPlaylistByOwner,
    httpGetPlaylistByTitle,
}