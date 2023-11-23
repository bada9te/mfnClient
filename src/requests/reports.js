import axios from "axios";


const API_URL = process.env.REACT_APP_SERVER_BASE;

// create
const httpCreateReport = async(reportData) => {
    const response = await axios.post(`${API_URL}/reports/create`, {
        report: reportData,
    });
    return response;
}


const httpCloseReport = async(id) => {
    const response = await axios.post(`${API_URL}/reports/close`, {
        reportId: id,
    });
    return response;
}




export {
    httpCreateReport,
    httpCloseReport,
}