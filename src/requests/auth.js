import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;

// login
const httpLogin = async(data) => {
    return await axios.post(`${API_URL}/users/login`, {
        email: data.Email,
        password: data.Password,
    }); 
}

// register
const httpRegister = async(data) => {
    return await axios.post(`${API_URL}/users/register`, {
        email: data.Email,
        password: data.Password,
        nick: data.Nickname,
        avatar: data.Avatar,
        background: data.Background,
    });
}

// log out
const httpLogOut = async() => {
    return await axios.post(`${API_URL}/users/logout`);
}




export {
    httpLogin,
    httpRegister,
    httpLogOut,
}