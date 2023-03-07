/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react';

function Chatbot(){

    const [chatHistory, setChatHistory] = useState([]);
    const chatWindowRef = useRef(null);

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
          'quel est votre nom ?': ['Je suis xbot!', 'je m\'appel xbot!', 'Mon nom est xbot', 'On m\'appelle xbot'],
          'comment vous vous appelez ?': ['Je suis xbot!', 'je m\'appel xbot!', 'Mon nom est xbot', 'On m\'appelle xbot'],
          'quel est votre rôle ?': ['Je peux vous aidez en répendant à votre questions', 'Je peux vous donnez des informations et des astuces', 'Mon rôle est de fournir un support client basé sur votre demandes', 'En tant qu\'un chatbot je suis votre assistant automatisée'],
          'comment pouvez vous m\'aidez ?' : ['Je peux vous aidez en répendant à votre questions', 'Je peux vous donnez des informations et des astuces', 'Mon rôle est de fournir un support client basé sur votre demandes', 'En tant qu\'un chatbot je suis votre assistant automatisée'],
          'au revoir': ['Goodbye!', 'Au revoir !', 'À bientôt !', 'À la prochaine !', 'À plus tard !','Prenez soin de vous !','On se voit bientôt !','À demain !'],
          'goodbye': ['Goodbye!', 'Au revoir !', 'À bientôt !', 'À la prochaine !', 'À plus tard !','Prenez soin de vous !','On se voit bientôt !','À demain !']
        };
      
        const messageLower = message.toLowerCase();
        if (messageLower in responseOptions) {
            const mssg = responseOptions[messageLower];
            const rdMessag = Math.floor(Math.random() * mssg.length);
          return `${mssg[rdMessag]}`;
        } else {
          return `Désolé, je n'ai pas compris, Pouvez-vous essayer quelque chose d'autre ?`;
        }
      };

        useEffect(() => {
          chatWindowRef.current.scrollIntoView({ behavior: 'smooth' });
        }, [chatHistory]);

    return (
        <div className="chatbot">
          <div className="chat-head"> <img src="chatbott.png"/>  </div>
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
                <div ref={chatWindowRef}></div>
            </div>
            <form className="input-form" onSubmit={(event) => {
                event.preventDefault();
                const input = event.target.elements['chat-input'];
                handleNewMessage(input.value);
                input.value = '';
            }}
            >

              <input name="chat-input" type="text" placeholder="Ecrire quelque chose..." />
              <button type="submit" >Envoyer</button>
            </form>
        </div>
    );
}

export default Chatbot;