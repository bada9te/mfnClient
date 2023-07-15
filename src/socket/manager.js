import { Manager } from "socket.io-client";

const socketManager = new Manager("/");

export default socketManager;