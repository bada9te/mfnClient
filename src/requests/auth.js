import axios from "axios";


const SERVER_BASE = process.env.REACT_APP_SERVER_BASE;

// login
const httpLogin = async(data) => {
    return await axios.post(`${SERVER_BASE}/login`, {
        email: data.Email,
        password: data.Password,
    }); 
}

// register
const httpRegister = async(data) => {
    return await axios.post(`${SERVER_BASE}/register`, {
        email: data.Email,
        password: data.Password,
        nick: data.Nickname,
        avatar: data.Avatar,
        background: data.Background,
    });
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