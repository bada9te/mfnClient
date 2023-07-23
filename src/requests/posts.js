import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;


const httpAddPost = async(data) => {
    const response = await axios.post(`${API_URL}/posts/add`, {
        owner: data.ownerId,
        title: data.title,
        description: data.description,
        audio: data.audio,
        image: data.image,
        commentsAllowed: data.commentsAllowed,
        downloadsAllowed: data.downloadsAllowed,
    });
    return response;
}


const httpGetAllPosts = async(skipCount=0) => {
    if (skipCount < 0) 
        skipCount = 0;

    const response = await axios.get(`${API_URL}/posts/all`, {
        params: {
            skipCount: skipCount,
        },
    });
    return response;
}


const httpGetAllPostsWithOwnerId = async(id, skipCount=0) => {
    const response = await axios.get(`${API_URL}/posts/owner`, {
        params: {
            id: id,
            skipCount: skipCount,
        },
    });
    return response;
}


const httpGetUserSavedPosts = async(userId, skipCount=0) => {
    const response = await axios.get(`${API_URL}/posts/saved`, {
        params: {
            userId: userId,
            skipCount: skipCount,
        },
    });
    return response;
}

const httpGetPostsByTitle = async(query, isMine=null, ownerId=null, skipCount=0) => {
    const response = await axios.get(`${API_URL}/posts/by-title`, {
        params: {
            title: query,
            isMine: isMine,
            ownerId: ownerId,
            skipCount: skipCount,
        },
    });
    return response;
}


const httpSwitchLike = async(userId, postId) => {
    const response = await axios.post(`${API_URL}/posts/switch-like`, { 
        userId: userId,
        postId: postId,
    });
    return response;
} 

// add post to saved
const httpSwitchPostInSaved = async(userId, postId) => {
    const response = await axios.post(`${API_URL}/posts/switch-save`, {
        userId: userId,
        postId: postId,
    });
    return response;
}


const httpGetPostById = async(id) => {
    const response = await axios.get(`${API_URL}/posts/id`, {
        params: {
            id: id,
        },
    });
    return response;
}


const httpDeletePostById = async(id) => {
    return await axios.post(`${API_URL}/posts/delete`, {
        id: id,
    });
}




export {
    httpAddPost,
    httpGetAllPosts,
    httpGetAllPostsWithOwnerId,
    httpGetUserSavedPosts,
    httpGetPostsByTitle,
    httpSwitchLike,
    httpSwitchPostInSaved,
    httpGetPostById,
    httpDeletePostById,
}