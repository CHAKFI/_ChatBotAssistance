from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB


app = Flask(__name__)
CORS(app)

# Load the chat data from CSV file
chat_data = pd.read_csv('C:/Users/ahmed/Documents/Github/Web/_ChatBotAssistance/data/chat.csv', encoding='ANSI')

# Extract user messages and bot responses from chat data
user_messages = []
bot_responses = []

for i in range(len(chat_data)):
    row = chat_data.iloc[i]
    message = row['MESSAGE']
    responses = row['RESPONSE'].split(',')
    for response in responses:
        user_messages.append(message)
        bot_responses.append(response)

# Train a simple Naive Bayes classifier
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(user_messages)
clf = MultinomialNB()
clf.fit(X, bot_responses)

@app.route('/pros', methods=['GET', 'POST'])
def chatbot():
    if request.method == 'GET':
        return render_template('run.html')

    # handle the message and generate a response
    data = request.get_json()
    message = data.get('message')

    app.logger.info('Received request: %s', request)
    print("Received request:", request.data) # to check if Flask server is receiving the request
    app.logger.info('Received message: %s', data)
    print("Received message:", message) # to check if Flask server is receiving the message

    if not message:
        response = 'Ce message ne peut pas être traité'
    else:
        # find all the rows in the chat_data dataframe that match the user's message
        matching_rows = chat_data[chat_data['MESSAGE'] == message]

        if len(matching_rows) > 0:
            # randomly select one of the corresponding bot responses
            response = random.choice(matching_rows['RESPONSE'].iloc[0].split(','))
        else:
            response = "Désolé, je n'ai pas compris, pouvez-vous essayer quelque chose d'autre ?"
    return jsonify({'message': response})

@app.errorhandler(404)
def invalid_route(e):
    return "Invalid route (-_-)."

if __name__ == '__main__':
    app.run(debug=True)