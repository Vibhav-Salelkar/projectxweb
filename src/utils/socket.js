import io from "socket.io-client";
import { BASE_URL } from "./contants";

export const createSocketConnection = () => {
    const socket = io(BASE_URL, {
        transports: ["websocket"],
        withCredentials: true,
    });
    return socket;
}