import socket from "../socket"

// message create
const emitMessageCreate = (message, toUsers) => {
    socket.emit("message create", { message, toUsers });
}


export {
    emitMessageCreate,
}