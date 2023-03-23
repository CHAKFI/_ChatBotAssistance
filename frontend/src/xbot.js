/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react';


function Chatbot(){

    const [chatHistory, setChatHistory] = useState([]);
    const chatWindowRef = useRef(null);

    const handleNewMessage = async (message) => {
      const timestamp = new Date().toLocaleTimeString();
      const newMessage = { text: message, sender: 'user', timestamp };
      setChatHistory(prevChatHistory => [...prevChatHistory, newMessage]);
  
      try {
          const response = await fetch('http://127.0.0.1:5000/pros', {
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  sender: 'user',
                  message: message
              })
              .then(response => response.json())
          });

          if (response.ok) {
              const jsonResponse = await response.json();
              if (jsonResponse.length > 0) {
                  setTimeout(() => {
                    const response = generateResponse(message);
                    const responseMessage = { text: response, sender: 'bot', timestamp };
                    setChatHistory(prevChatHistory => [...prevChatHistory, responseMessage]);
                  }, 700);
              }
          } else {
              throw new Error('Invalide r\réponse');
          }
      } catch (error) {
          console.error(error);
          setTimeout(() => {
            const errorMessage = { text: 'Oops! Un problème est survenu..', sender: 'bot', timestamp };
            setChatHistory(prevChatHistory => [...prevChatHistory, errorMessage]);
          }, 800);
      }
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
          'comment pouvez vous m\'aider ?' : ['Je peux vous aidez en répendant à votre questions', 'Je peux vous donnez des informations et des astuces', 'Mon rôle est de fournir un support client basé sur votre demandes', 'En tant qu\'un chatbot je suis votre assistant automatisée'],
          'au revoir': ['Goodbye!', 'Au revoir !', 'À bientôt !', 'À la prochaine !', 'À plus tard !','Prenez soin de vous !','On se voit bientôt !','À demain !'],
          'goodbye': ['Goodbye!', 'Au revoir !', 'À bientôt !', 'À la prochaine !', 'À plus tard !','Prenez soin de vous !','On se voit bientôt !','À demain !'],
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

            <form method='POST' className="input-form" onSubmit={(event) => {
                event.preventDefault();
                const input = event.target.elements['chat-input'];
                const message = input.value.trim();
                if (message) {
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