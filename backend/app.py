from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import os
from bson import json_util
import pandas as pd
import os
import nltk
nltk.download('punkt')
from flask_cors import CORS
import yfinance as yf
from bs4 import BeautifulSoup
import pandas as pd
import requests

app = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb://mongo:27017/gold_data"
app.config["MONGO_URI"] = "mongodb://localhost:27017/gold_data"
CORS(app)

mongo = PyMongo(app)

news_df = os.path.join("data_tables", "gold_post_data.csv")


@app.route('/', methods=['GET'])
def main():
   return jsonify({"message": "Hello from Flask!"})


@app.route('/gold_price', methods=['GET'])
def get_gold_price():
    headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
    
    link='https://www.kitco.com/'
    
    response = requests.get(link,headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    header = soup.find("div", class_='flex justify-between gap-2')

    # Find all h3 tags within the header
    h3_tags = header.find_all('h3')

    texts = [h3.text for h3 in h3_tags]

    bid, ask, change, performance = texts

    price_list={

        'bid':bid,
        'ask':ask,
        'change':change,
        'performance':performance
    }

    return jsonify(price_list)


@app.route('/auth/register', methods=['POST'])
def register():
    _json = request.json
    _username = _json['username']
    _email = _json['email']
    _password = _json['password']
    
    # validate received values
    if _username and _email and _password and request.method == 'POST':
        # do not save password as a plain text
        _hashed_password = generate_password_hash(_password)
        # save details
        id = mongo.db.user.insert_one({'username': _username, 'email': _email, 'password': _hashed_password}).inserted_id
        response = jsonify('User added successfully.')
        response.status_code = 200
        return response
    else:
        return not_found()
    

@app.route('/auth/login', methods=['POST'])
def login():
    _json = request.json
    _username = _json['username']
    _password = _json['password']

    # validate received values
    if _username and _password and request.method == 'POST':
        # check if user exists
        user = mongo.db.user.find_one({'username': _username})
        if user:
            # check if password matches
            if check_password_hash(user['password'], _password):
                user['_id'] = str(user['_id'])  # convert ObjectId to string
                response = jsonify(json_util.dumps(user))  # use json_util.dumps
                response.status_code = 200
                return response
            else:
                response = jsonify('Wrong password.')
                response.status_code = 401
                return response
        else:
            response = jsonify('User not found.')
            response.status_code = 404
            return response
    else:
        return not_found()
    
def get_first_four_sentences(text):
    sentences = nltk.tokenize.sent_tokenize(text)
    return ' '.join(sentences[:2])


@app.route('/user/news', methods=['GET'])
def news():
    df=pd.read_csv(news_df)
    df = df.where(pd.notnull(df), None) 
    return jsonify(df.to_dict(orient='records'))


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0',debug=True, port=port)

