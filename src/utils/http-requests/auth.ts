import axios from "axios";
import envCfg from "@/config/env";

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

const httpGetGoogleInfo = async(accessToken: string) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data; // This will contain user info including email
    } catch (error) {
        // @ts-ignore
        console.error('Error fetching user info:', error.response?.data || error.message);
        throw new Error('Unable to fetch user info');
    }
}

const httpGetFacebookInfo = async(accessToken: string, userId: string) => {
    const url = `https://graph.facebook.com/v20.0/${userId}?access_token=${accessToken}`;
    return await axios.get(url)
        .then(response => {
            console.log('User Data:', response.data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        });
}



export {
    httpLogin,
    httpWeb3Login,
    httpLogOut,
    httpUpdateSessionUser,
    httpGetCurrentUser,
    httpGetGoogleInfo,
    httpGetFacebookInfo,
}