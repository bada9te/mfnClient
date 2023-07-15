import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


const httpValidateAction = async(userId, actionId, verifyToken, type) => {
    const response = await axios.post(`${API_URL}/moderation/validate`, {
        userId, actionId, verifyToken, type,
    });
    return response;
}

const httpCreateAction = async(action, newValue) => {
    const response = await axios.post(`${API_URL}/moderation/create`, {
        action: action,
        newValue: newValue,
    });
    return response;
}

const httpCancelAction = async(userId, actionId, verifyToken, type) => {
    const response = await axios.post(`${API_URL}/moderation/delete`, {
        userId,
        actionId,
        verifyToken,
        type,
    });
    return response;
}


export {
    httpValidateAction,
    httpCreateAction,
    httpCancelAction,
}