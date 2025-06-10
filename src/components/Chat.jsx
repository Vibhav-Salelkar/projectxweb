import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/contants";

function Chat() {
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
            withCredentials: true
        })

        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((message) => {
            return {
                firstName: message.senderId.firstName,
                lastName: message.senderId.lastName,
                message: message.text,
                createdAt: new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }
        });

        setMessages(chatMessages);
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {        
        if(!user) return;
        const socket = createSocketConnection();

        socket.emit("joinChat", {userId, targetUserId});

        socket.on("messageReceived", ({firstName, lastName, message}) => {
            setMessages(prevMessages => [...prevMessages, {firstName, lastName, message,  createdAt: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]);
        });

        return () => {
            socket.disconnect();
        }
    },[userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            message: newMessage
        });
        setNewMessage("");
    }

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[80vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5 flex flex-col">
                {messages.map((message, index) => {
                    return (
                        <div key={index} className={`chat ${user.firstName === message.firstName ? "chat-end" : "chat-start"}`}>
                            <div className="chat-header">
                                {message.firstName + " " + message.lastName}
                                <time className="text-xs opacity-50">{message.createdAt}</time>
                            </div>
                            <div className="chat-bubble">{message.message}</div>
                        </div>
                    )
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
                <input value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} className="flex-1 border border-gray-500 text-white rounded p-2"/>
                <button onClick={sendMessage} className="btn btn-primary">Send</button>
            </div>
        </div>
    )
}

export default Chat;