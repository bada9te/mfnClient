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
    httpLogOut,
    httpUpdateSessionUser,
    httpGetCurrentUser,
    httpGetGoogleInfo,
    httpGetFacebookInfo,
}