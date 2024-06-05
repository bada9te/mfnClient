import socket from "../socket";

// chat create
const emitChatCreate = (chat, toUsers) => {
    socket.emit('chat create', { chat, toUsers });
}

// chat update
const emitChatUpdate = (chat, toUsers) => {
    socket.emit('chat update', { chat, toUsers });
}



export {
    emitChatCreate,
    emitChatUpdate,
}