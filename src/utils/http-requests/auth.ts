import axios from "axios";
import nextConfig from "../../../next.config.mjs";

const SERVER_BASE = nextConfig.env?.serverBase;

// login
const httpLogin = async(email: string, password: string) => {
    return await axios.post(`${SERVER_BASE}/auth/local`, {
        email,
        password,
    }, {withCredentials: true}); 
}

// log out
const httpLogOut = async() => {
    return await axios.get(`${SERVER_BASE}/logout`, { withCredentials: true });
}

// update session user object
const httpUpdateSessionUser = async(user: any) => {
    return await axios.post(`${SERVER_BASE}/update-session-user`, user)
}

// get current user 
const httpGetCurrentUser = async() => {
    return await axios.get(`${SERVER_BASE}/auth/me`, { withCredentials: true });
}



export {
    httpLogin,
    httpLogOut,
    httpUpdateSessionUser,
    httpGetCurrentUser,
}