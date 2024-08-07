import axios from "axios";
import {IBlob} from "@/utils/common-functions/blobToFile";
import envCfg from "@/config/env";

const SERVER_BASE = envCfg.serverBase;

const httpSaveFile = async(file: File | IBlob) => {
    const data = new FormData();
    console.log(file)
    data.append("file", file, file.name);

    return await axios.post(`${SERVER_BASE}/files/upload`, data);
}

const httpSaveFileMultiple = async(files: (File | IBlob)[]) => {
    const data = new FormData();
    for (const file of files) {
        data.append('uploadedFiles', file)
    }

    return await axios.post(`${SERVER_BASE}/files/upload-multiple`, data);
}

export {
    httpSaveFile,
    httpSaveFileMultiple,
}