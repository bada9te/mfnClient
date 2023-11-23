import axios from "axios";


const SERVER_BASE = process.env.REACT_APP_SERVER_BASE;

// login
const httpLogin = async(email, password) => {
    return await axios.post(`${SERVER_BASE}/login`, {
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
    return await axios.post(`${SERVER_BASE}/logout`);
}




export {
    httpLogin,
    httpRegister,
    httpLogOut,
}