import envCfg from "@/config/env";
import { PinataSDK } from "pinata"

export const pinata = new PinataSDK({
    pinataJwt: envCfg.pinataJWT,
    pinataGateway: envCfg.IPFSGateway,
});
