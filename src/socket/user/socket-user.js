import { io } from "socket.io-client";

const SERVER_BASE = process.env.REACT_APP_SERVER_BASE;

// socket
const userSocket = io(SERVER_BASE.endsWith('/') ? SERVER_BASE : `${SERVER_BASE}/`, {
    transports : ['websocket']
});




// export user socket
export default userSocket;