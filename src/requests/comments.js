import axios from "axios";


const API_URL = process.env.REACT_APP_SERVER_BASE;

// add comment
const httpAddComment = async(data) => {
    const response = await axios.post(`${API_URL}/comments/add`, {
        comment: data,
    });
    return response;
}

// get all in ids array
const httpGetAllCommentsWithIds = async(ids) => {
    const response = await axios.post(`${API_URL}/comments/ids-array`, {
        ids: ids,
    });
    return response;
}

// get one comment
const httpGetCommentWithId = async(id) => {
    const response = await axios.get(`${API_URL}/comments/id`, {
        params: {
            id: id,
        },
    });
    return response;
}

// rm by id
const httpRemoveCommentById = async(id) => {
    const response = await axios.post(`${API_URL}/comments/remove`, {
        id: id,
    });
    return response;
}

export {
    httpAddComment,
    httpGetAllCommentsWithIds,
    httpGetCommentWithId,
    httpRemoveCommentById,
}