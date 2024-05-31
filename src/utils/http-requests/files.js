import axios from "axios";

const SERVER_BASE = process.env.REACT_APP_SERVER_BASE;

const httpSaveFile = async(file) => {
    let data = new FormData();
    console.log(file)
    data.append("file", file, file.name);

    const response = await axios.post(`${SERVER_BASE}/files/upload`, data);
    return response;
}

const httpSaveFileMultiple = async(files) => {
    let data = new FormData();
    for (const file of files) {
        data.append('uploadedFiles', file)
    }

    const response = await axios.post(`${SERVER_BASE}/files/upload-multiple`, data);
    return response;
}


export {
    httpSaveFile,
    httpSaveFileMultiple,
}