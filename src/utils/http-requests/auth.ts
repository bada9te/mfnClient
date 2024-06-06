import axios from "axios";
import {cfg} from "@/config";


const SERVER_BASE = cfg.serverBase;

// login
const httpLogin = async(email: string, password: string) => {
    return await axios.post(`${SERVER_BASE}/auth/local`, {
        email,
        password,
    }, {withCredentials: true}); 
}

// register
const httpRegister = async(data: any) => {
    return await axios.post(`${SERVER_BASE}/register`, data);
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
    httpRegister,
    httpLogOut,
    httpUpdateSessionUser,
    httpGetCurrentUser,
}