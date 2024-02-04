import { io } from "socket.io-client";

const HTTP_SERVER_BASE = process.env.REACT_APP_SERVER_BASE;
const VERSION_TYPE     = process.env.REACT_APP_VERSION_TYPE;

const socket = io(HTTP_SERVER_BASE, { autoConnect: false });


if (VERSION_TYPE === 'development') {
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });
}

socket.on('connect_error', (err) => {
    if (err.message === "Invalid user id") {
        console.error("Make sure that the client got user id via init request");
    }
});

export default socket;