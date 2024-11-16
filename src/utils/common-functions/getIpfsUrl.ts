import envCfg from "@/config/env";

export default function getIpfsUrl(filename: string) {
    const data_parts = filename.split('_');

    return `${envCfg.filebase_FILEBASE_IPFS_GATEWAY}/${data_parts[1]}`;
}