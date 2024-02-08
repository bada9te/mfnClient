import socket from "../socket"

// message create
const emitMessageCreate = (message, toUsers) => {
    socket.emit("message create", { message, toUsers });
}

// message delete 
const emitMessageDelete = (message, toUsers) => {
    socket.emit("message delete", { message, toUsers });
}


export {
    emitMessageCreate,
    emitMessageDelete,
}