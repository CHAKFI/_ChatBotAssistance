from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/pros', methods=['GET','POST'])

def chatbot():

    if request.method == 'GET':
        return render_template('run.html')

    # handle the message and generate a response
    responses = {
        'bonjour': ['Hey Bonjour!', 'Bonjour à vous !', 'Salut !', 'Bon matin !', 'Bonjour, comment ça va ?'],
        'salut': ['Hey Bonjour!', 'Bonjour à vous !', 'Salut !', 'Bon matin !', 'Bonjour, comment ça va ?'],
        'ça va ?': ['Je vais bien, merci.', 'Ça va bien, et vous ?', 'Je vais très bien, merci. Et vous-même ?','Je me porte bien, merci.','Je vais bien, merci pour demander. Et vous-même ?'],
        'comment allez-vous ?': ['Je vais bien, merci.', 'Ça va bien, et vous ?', 'Je vais très bien, merci. Et vous-même ?','Je me porte bien, merci.','Je vais bien, merci pour demander. Et vous-même ?'],
        'je vais très bien': ['C\'est parfait ! N\'hésitez pas à me poser des questions si vous avez besoin d\'aide'],
        'quel est votre nom ?': ['Je suis xbot!', 'je m\'appel xbot!', 'Mon nom est xbot', 'On m\'appelle xbot'],
        'comment vous vous appelez ?': ['Je suis xbot!', 'je m\'appel xbot!', 'Mon nom est xbot', 'On m\'appelle xbot'],
        'quel est votre rôle ?': ['Je peux vous aidez en répendant à votre questions', 'Je peux vous donnez des informations et des astuces', 'Mon rôle est de fournir un support client basé sur votre demandes', 'En tant qu\'un chatbot je suis votre assistant automatisée'],
        'comment pouvez vous m\'aider ?' : ['Je peux vous aidez en répendant à votre questions', 'Je peux vous donnez des informations et des astuces', 'Mon rôle est de fournir un support client basé sur votre demandes', 'En tant qu\'un chatbot je suis votre assistant automatisée'],
        'au revoir': ['Goodbye!', 'Au revoir !', 'À bientôt !', 'À la prochaine !', 'À plus tard !','Prenez soin de vous !','On se voit bientôt !','À demain !'],
        'goodbye': ['Goodbye!', 'Au revoir !', 'À bientôt !', 'À la prochaine !', 'À plus tard !','Prenez soin de vous !','On se voit bientôt !','À demain !']
    }

    print("Received request:", request.data) # to check if Flask server is receiving the request

    app.logger.info('Received request: %s', request)
    data = request.get_json()
    app.logger.info('Received message: %s', data)
    message = data.get('message')

    print("Received message:", message) # to check if Flask server is receiving the message


    if not message:
        response = 'Ce message ne peut pas être traité'
    else:
        if message in responses:
            response = random.choice(responses[message])
        else:
            response = "Désolé, je n'ai pas compris, pouvez-vous essayer quelque chose d'autre ?"
    return jsonify({'message': response})

@app.errorhandler(404)    
def invalid_route(e): 
    return "Invalid route (-_-)."

if __name__ == '__main__':
    app.run(debug=True)