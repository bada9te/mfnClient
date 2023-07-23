import axios from "axios";
import * as Alert from "../components/alerts/alerts";
import { httpRefreshAccessToken } from "./auth";


axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    async(response) => {
        return response;
    }, 
    async(error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const userData = JSON.parse(localStorage.getItem("mfnCurrentUser"));
            const result = await httpRefreshAccessToken(userData.id, userData.email);
            localStorage.setItem("mfnCurrentToken", JSON.stringify(result.data.token));
            axios.defaults.headers.common['Authorization'] = result.data.token.accessToken;
            originalRequest.headers['Authorization'] = result.data.token.accessToken;
            //console.log(originalRequest, 'Retrying request...');
            return await axios.request(originalRequest);
        } catch (error) {
            localStorage.removeItem("mfnCurrentUser");
            localStorage.removeItem("mfnCurrentToken");
            //navigate('/login');
            Alert.alertWarning('Session expired, pls re-login');
            
            if (error.response && error.response.data) {
            return Promise.reject(error.response.data)
            }
            return Promise.reject(error);
        }
        }
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(async(config) => {
    config.headers = {
    ...config.headers,
    Authorization: localStorage.getItem("mfnCurrentToken") ? JSON.parse(localStorage.getItem("mfnCurrentToken")).accessToken : "",
    }
    return config;
});
