import csv
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random
import nltk
from nltk.chat.util import Chat, reflections


app = Flask(__name__)
CORS(app)

file_path = 'C:/Users/ahmed/Documents/Github/Web/_ChatBotAssistance/data/chat.csv'
def load_data(file_path):
    data = {}
    with open(file_path, 'r', encoding='ANSI') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip header row
        for row in reader:
            user_messages = row[1].split(',')
            bot_responses = row[2].split(',')
            for message in user_messages:
                if message not in data:
                    data[message] = bot_responses
    return data

responses = load_data('C:/Users/ahmed/Documents/Github/Web/_ChatBotAssistance/data/chat.csv')

@app.route('/pros', methods=['GET','POST'])
def chatbot():
    if request.method == 'GET':
        return render_template('run.html')

    # handle the message and generate a response
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