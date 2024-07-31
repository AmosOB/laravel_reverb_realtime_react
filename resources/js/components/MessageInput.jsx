import React, { useState } from "react";

const MessageInput = ({ rootUrl }) => {
    const [message, setMessage] = useState("");

    const messageRequest = async (text) => {
        try {
            await axios.post(`${rootUrl}/message`, {
                text,
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }

        messageRequest(message);
        setMessage("");
    };

    return (
        <form onSubmit={sendMessage}>
            <div className="input-group mb-3">
                <input
                value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    className="form-control form-control-lg"
                    id="message"
                    placeholder="Message..."
                />
                <button type="submit" className="btn btn-primary">Send Message</button>
            </div>
        </form>

    );
};

export default MessageInput;
