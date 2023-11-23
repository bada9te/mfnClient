import axios from "axios";


const API_URL = process.env.REACT_APP_SERVER_BASE;

// get user by email
const httpGetUserByEmail = async(email) => {
    const response = await axios.get(`${API_URL}/users/email`, {
        params: { 
            email: email 
        },
    });
    return response;
}

// get user by id
const httpGetUserById = async(id) => {
    const response = await axios.get(`${API_URL}/users/id`, {
        params: {
            id: id,
        },
    });
    return response;
}

const httpGetUsersByIds = async(ids) => {
    const response = await axios.get(`${API_URL}/users/ids`, {
        params: {
            ids: ids,
        },
    });
    return response;
}

// get first 10 by title
const httpGetUsersByNickname = async(nickname) => {
    const response = await axios.get(`${API_URL}/users/by-nickname`, {
        params: {
            nickname: nickname,
        }
    });
    return response;
}

// update user
const httpUpdateUser = async(id, value, what) => {
    const response = await axios.post(`${API_URL}/users/update`, { 
        id: id,
        value: value,
        what: what,
    });
    return response;
}

// switch subscription on user
const httpSwitchSubscriptionOnUser = async(subscriberId, userId) => {
    const response = await axios.post(`${API_URL}/users/swicth-sub-on-user`, {
        subscriberId: subscriberId,
        userId: userId,
    });
    return response;
}

// confirm account creation
const httpVerifyAccount = async(userId, actionId, verifyToken) => {
    const response = await axios.post(`${API_URL}/users/verify`, {
        userId: userId,
        actionId: actionId,
        verifyToken: verifyToken,
    });
    return response;
}


// prepare account to rstore /restore-prepare
const httpPrepareAccountToRestore = async(email, type) => {
    const response = await axios.post(`${API_URL}/users/restore-prepare`, {
        email: email,
        type: type,
    });
    return response;
}

// restore
const httpRestoreAccount = async(userId, actionId, verifyToken, newValue, type) => {
    const response = await axios.post(`${API_URL}/users/restore`, {
        userId: userId,
        actionId: actionId,
        verifyToken: verifyToken,
        newValue: newValue,
        type: type,
    });
    return response;
}

// delete 
const httpDeleteAccount = async(id) => {
    const response = await axios.post(`${API_URL}/users/delete`, {
        id: id,
    });
    return response;
}


export {
    httpGetUserByEmail,
    httpGetUserById,
    httpGetUsersByIds,
    httpGetUsersByNickname,
    httpUpdateUser,
    httpSwitchSubscriptionOnUser,
    httpVerifyAccount,
    httpPrepareAccountToRestore,
    httpRestoreAccount,
    httpDeleteAccount,
}