/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react';

function Chatbot(){

    const [chatHistory, setChatHistory] = useState([]);
    const chatWindowRef = useRef(null);

    const handleNewMessage = (message) => {

        console.log("Message transmit via handleNewMessage method:", message); 

        // Send message to Flask server
        fetch('http://127.0.0.1:5000/pros', {
            method: 'POST',
            body: JSON.stringify({message}),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
          console.log("The Body: ",JSON.stringify({message}));
          return response.json();
         })
        
          .then(data => {
            // Add bot response to chat history
            const timestamp = new Date().toLocaleTimeString();
            setTimeout(() => {
              setChatHistory(history => [...history, { sender: 'bot', text: data.message, timestamp }]);
            }, 800);
        })
        .catch(error => {
            console.error('Erreur de transmission du message:', error);
            const timestamp = new Date().toLocaleTimeString();
            setChatHistory(history => [...history, { sender: 'bot', text: 'Serveur Erreur {-_-}', timestamp }]);
        });
    };

    useEffect(() => {
        chatWindowRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleClearChat = () => {
        setChatHistory([]);
    };

    return (
        <div className="chatbot">

            <div className="chat-head"> 
                <img className="chatWindLogo" />  
            </div>

            <div className="chat-window">
                {chatHistory.map((message, index) => (
                    <div 
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
                    >
                        <div className="avatar-container">
                            {message.sender === 'bot' && (
                                <div className="bot-avatar">
                                    <img alt="Bot" />
                                </div>
                            )}
                            {message.sender === 'user' && (
                                <div className="user-avatar">
                                    <img alt="User" />
                                </div>
                            )}
                        </div>
                        <div className="message-content">
                            <div className="message-tex">{message.text}</div>
                            <div className="message-timestamp">{message.timestamp}</div>
                        </div>
                    </div>
                ))}
                <div ref={chatWindowRef}></div>
            </div>

            <form className="input-form" onSubmit={(event) => {
                event.preventDefault();
                const input = event.target.elements['chat-input'];
                const message = input.value.trim();
                console.log('Message transmit via onSubmit method:', message);
                if (message) {
                    // Add user message to chat history
                    const timestamp = new Date().toLocaleTimeString();
                    setChatHistory(history => [...history, { sender: 'user', text: message, timestamp }]);
                    handleNewMessage(message);
                    input.value = '';
                }
            }}
            >
                <input name="chat-input" type="text" placeholder="Ecrire quelque chose..." />
                <div className="submit-button">
                    <button type="submit" >Envoyer</button>
                </div>
                <div className="clear-button">
                    <button type="reset" onClick={handleClearChat}>Vider</button>
                </div>
            </form>

        </div>
    );
}

export default Chatbot;