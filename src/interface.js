import React, { useState } from 'react';

function Chatbot(){

    const [chatHistory, setChatHistory] = useState([]);

    const handleNewMessage = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        const newMessage = { text: message, sender: 'user', timestamp };
        const response = generateResponse(message);
        const responseMessage = { text: response, sender: 'bot', timestamp };
        setChatHistory([...chatHistory, newMessage, responseMessage]);
    }; 


    const generateResponse = (message) => {
        return `You said: ${message}`
    };

    return (
        <div className="chatbot">
            <div className="chat-window">
                {chatHistory.map((message, index) => (
                    <div 
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
                    >
                        <div className="message-tex">{message.text}</div>
                        <div className="message-timestamp">{message.timestamp}</div>
                    </div>
                ))}
            </div>
            <form className="input-form" onSubmit={(event) => {
                event.preventDefault();
                const input = event.target.elements['chat-input'];
                handleNewMessage(input.value);
                input.value = '';
            }}
            >

              <input name="chat-input" type="text" placeholder="Type a message..." />
              <button type="submit" >SEND</button>
            </form>
        </div>
    );
}

export default Chatbot;