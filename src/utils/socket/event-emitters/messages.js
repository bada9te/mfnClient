import socket from "../socket"

// message create
const emitMessageCreate = (message, toUsers) => {
    socket.emit("message create", { message, toUsers });
}

// message delete 
const emitMessageDelete = (message, toUsers) => {
    socket.emit("message delete", { message, toUsers });
}

// message update
const emitMessageUpdate = (message, toUsers) => {
    socket.emit("message update", { message, toUsers });
}

export {
    emitMessageCreate,
    emitMessageDelete,
    emitMessageUpdate,
}