import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import Echo from "laravel-echo";

const ChatBox = ({ rootUrl }) => {
    // Get user data from a data attribute
    const userData = document.getElementById('main').getAttribute('data-user');
    const user = JSON.parse(userData);
    const webSocketChannel = `chat`;

    const [messages, setMessages] = useState([]);
    const [authUserId, setAuthUserId] = useState(null);
    const scroll = useRef(null);

    // Function to scroll to the bottom of the messages
    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    // Echo.channel("chat");

    // Function to connect to the WebSocket and listen for new messages
    const connectWebSocket = () => {
        window.Echo.channel(webSocketChannel)
            .listen('GotMessage', async (e) => {
                // Fetch messages when a new message event is received
                console.log("connected");
                await getMessages();
            });
    };

    // Function to fetch messages from the server
    const getMessages = async () => {
        try {
            const response = await axios.get(`${rootUrl}/messages`);
            setMessages(response.data.messages);
            setAuthUserId(response.data.authUserId);
            setTimeout(scrollToBottom, 0);
        } catch (err) {
            console.log(err.message);
        }
    };

    // useEffect to fetch messages and connect WebSocket on component mount
    useEffect(() => {
        getMessages();
        connectWebSocket();

        // Cleanup WebSocket connection on component unmount
        return () => {
            window.Echo.leave(webSocketChannel);
        };
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-md-12">
                <div className="card bg-white border-0">
                    <div className="text-center fs-1 bold">Group Chat</div>
                    <div className="">
                        {
                            messages.map((message) => (
                                <Message
                                    key={message.id}
                                    userId={user.id}
                                    message={message}
                                    authUserId={authUserId} />
                            ))
                        }
                        <span ref={scroll}></span>
                    </div>
                    <div className="">
                        <MessageInput rootUrl={rootUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
