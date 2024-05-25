import axios from "axios";


const SERVER_BASE = process.env.REACT_APP_SERVER_BASE;

// login
const httpLogin = async(email, password) => {
    return await axios.post(`${SERVER_BASE}/auth/local`, {
        email,
        password,
    }, {withCredentials: true}); 
}

// register
const httpRegister = async(data) => {
    return await axios.post(`${SERVER_BASE}/register`, data);
}

// log out
const httpLogOut = async() => {
    return await axios.get(`${SERVER_BASE}/logout`, { withCredentials: true });
}

// update session user object
const httpUpdateSessionUser = async(user) => {
    return await axios.post(`${SERVER_BASE}/update-session-user`, user)
}

// get current user 
const httpGetCurrentUser = async() => {
    return await axios.get(`${SERVER_BASE}/auth/me`, { withCredentials: true });
}



export {
    httpLogin,
    httpRegister,
    httpLogOut,
    httpUpdateSessionUser,
    httpGetCurrentUser,
}