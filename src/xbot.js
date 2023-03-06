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
        const responseOptions = {
          'bonjour': ['Hey Bonjour!', 'Bonjour à vous !', 'Salut !', 'Bon matin !', 'Bonjour, comment ça va ?'],
          'salut': ['Hey Bonjour!', 'Bonjour à vous !', 'Salut !', 'Bon matin !', 'Bonjour, comment ça va ?'],
          'ça va ?': ['Je vais bien, merci.', 'Ça va bien, et vous ?', 'Je vais très bien, merci. Et vous-même ?','Je me porte bien, merci.','Je vais bien, merci pour demander. Et vous-même ?'],
          'comment allez-vous ?': ['Je vais bien, merci.', 'Ça va bien, et vous ?', 'Je vais très bien, merci. Et vous-même ?','Je me porte bien, merci.','Je vais bien, merci pour demander. Et vous-même ?'],
          'quel est votre nom ?': ['Je suis Chatbot!', 'je m\'appel Chatbot!', 'Mon nom est Chatbot', 'On m\'appelle Chatbot'],
          'comment vous vous appelez ?': ['Je suis Chatbot!', 'je m\'appel Chatbot!', 'Mon nom est Chatbot', 'On m\'appelle Chatbot'],
          'quel est votre rôle ?': ['Je peux vous aidez en répendant à votre questions', 'Je peux vous donnez des informations et des astuces', 'Mon rôle est de fournir un support client basé sur votre demandes', 'En tant qu\'un chatbot je suis votre assistant automatisée'],
          'comment pouvez vous m\'aidez' : ['Je peux vous aidez en répendant à votre questions', 'Je peux vous donnez des informations et des astuces', 'Mon rôle est de fournir un support client basé sur votre demandes', 'En tant qu\'un chatbot je suis votre assistant automatisée'],
          'au revoir': ['Goodbye!', 'Au revoir !', 'À bientôt !', 'À la prochaine !', 'À plus tard !','Prenez soin de vous !','On se voit bientôt !','À demain !'],
          'goodbye': ['Goodbye!', 'Au revoir !', 'À bientôt !', 'À la prochaine !', 'À plus tard !','Prenez soin de vous !','On se voit bientôt !','À demain !']
        };
      
        const messageLower = message.toLowerCase();
        if (messageLower in responseOptions) {
            const mssg = responseOptions[messageLower];
            const rdMessag = Math.floor(Math.random() * mssg.length);
          return `${mssg[rdMessag]}`;
        } else {
          return `Désolé, je n'ai compris, Pouvez-vous essayer quelque chose d'autre ?`;
        }
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