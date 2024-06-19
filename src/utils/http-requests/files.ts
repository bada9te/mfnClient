import axios from "axios";
import {IBlob} from "@/utils/common-functions/blobToFile";
import nextConfig from "../../../next.config.mjs";

const SERVER_BASE = nextConfig.env?.serverBase;

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