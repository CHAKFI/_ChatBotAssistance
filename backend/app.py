from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/pros')

def chatbot():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Invalide requ\ête de payload'}), 400
    
    message = data['message']
    response = generateResponse(message)
    return jsonify({'message': response})

def generateResponse(message):
    responseOptions = {
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
    }

    messageLower = message.lower()
    if messageLower in responseOptions:
        mssg = responseOptions[messageLower]
        rdMessag = random.randint(0, len(mssg) - 1)
        return f"{mssg[rdMessag]}"
    else:
        return "Désolé, je n'ai pas compris, Pouvez-vous essayer quelque chose d'autre ?"

@app.errorhandler(404)    
def invalid_route(e): 
    return "Invalid route AHMED (-_-)."

if __name__ == '__main__':
    app.run(debug=True)
