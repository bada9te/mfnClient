import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;

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

// rm by id
const httpRemoveCommentById = async(id) => {
    const response = await axios.post(`${API_URL}/comments/rm-id`, {
        id: id,
    });
    return response;
}

export {
    httpAddComment,
    httpGetAllCommentsWithIds,
    httpRemoveCommentById,
}