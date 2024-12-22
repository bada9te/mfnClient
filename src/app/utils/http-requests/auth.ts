import axios from "axios";
import envCfg from "@/app/config/env";

const SERVER_BASE = envCfg.serverBase;

// login
const httpLogin = async(email: string, password: string) => {
    return await axios.post(`${SERVER_BASE}/auth/local`, {
        email,
        password,
    }, {withCredentials: true}); 
}

// log out
const httpLogOut = async() => {
    return await axios.post(`${SERVER_BASE}/auth/logout`, {}, { withCredentials: true });
}

// web3 login
const httpWeb3Login = async(address: string, message: string, signed: string) => {
    return await axios.post(`${SERVER_BASE}/auth/web3`, {
        address, message, signed
    }, {withCredentials: true});
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
    httpWeb3Login,
    httpLogOut,
    httpUpdateSessionUser,
    httpGetCurrentUser,
}