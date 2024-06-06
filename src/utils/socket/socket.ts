import { io } from "socket.io-client";
import {cfg} from "@/config";

const HTTP_SERVER_BASE = cfg.serverBase;

const socket = io(HTTP_SERVER_BASE, { autoConnect: false });

socket.on('connect_error', (err) => {
    if (err.message === "Invalid user id") {
        console.error("Make sure that the client got user id via init request");
    }
});

export default socket;