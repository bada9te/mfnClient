import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_BASE;

const httpSaveFile = async(file) => {
    let data = new FormData();
    data.append("file", file, file.name);

    const response = await axios.post(`${API_URL}/upload-single`, data);
    return response;
}

const httpSaveFileMultiple = async(files) => {
    let data = new FormData();
    for (const file of files) {
        console.log(file)
        data.append('uploadedFiles', file)
    }

    const response = await axios.post(`${API_URL}/upload-multiple`, data);
    return response;
}


export {
    httpSaveFile,
    httpSaveFileMultiple,
}