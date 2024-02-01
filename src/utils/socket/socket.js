import { io } from "socket.io-client";

const HTTP_SERVER_BASE = process.env.REACT_APP_SERVER_BASE;
const VERSION_TYPE     = process.env.REACT_APP_VERSION_TYPE;

const socket = io(HTTP_SERVER_BASE, { autoConnect: false });

if (VERSION_TYPE === 'development') {
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });
}

export default socket;