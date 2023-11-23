import axios from "axios";


const API_URL = process.env.REACT_APP_SERVER_BASE;

// create
const httpCreateSupportRequest = async(supportRequestData) => {
    const response = await axios.post(`${API_URL}/support-requests/create`, {
        supportRequest: supportRequestData,
    });
    return response;
}


const httpCloseSupportRequest = async(id) => {
    const response = await axios.post(`${API_URL}/reports/close`, {
        supportRequest: id,
    });
    return response;
}




export {
    httpCreateSupportRequest,
    httpCloseSupportRequest,
}