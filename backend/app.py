import csv
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random
import nltk
from nltk.chat.util import Chat, reflections


app = Flask(__name__)
CORS(app)

@app.route('/pros', methods=['GET','POST'])
def chatbot():

    if request.method == 'GET':
        return render_template('run.html')

    # load the data from CSV file
    pairs = []
    with open('C:/Users/ahmed/Documents/Github/Web/_ChatBotAssistance/data/chat.csv', 'r', encoding='ANSI') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) > 0:
                elements = row[0].split(',')
                if len(elements) >= 3:
                    # Extracting nested elements from comma-separated values
                    id = elements[0]
                    user_message = elements[1].split(',')
                    bot_response = elements[2]
                    
                    pairs.append([id, user_message, bot_response])
    
    # handle the message and generate a response
    print("Received request:", request.data)
    app.logger.info('Received request: %s', request)
    data = request.get_json()
    app.logger.info('Received message: %s', data)
    message = data.get('message')

    print("Received message:", message)
    

    # Find matching user message
    matching_pairs = [pair for pair in pairs if user_message == pair[1]]

    if matching_pairs:
        # Select a random response
        response =  random.choice(matching_pairs)[2]
        
    else:
        response = 'No response found for this message.'

    print("bot response:", response)
    return jsonify({'message': response})

@app.errorhandler(404)    
def invalid_route(e): 
    return "Invalid route (-_-)."

if __name__ == '__main__':
    app.run(debug=True)
