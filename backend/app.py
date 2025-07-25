from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import math
import re

app = Flask(__name__)
CORS(app)

model = joblib.load('./model.pkl')

def entropy(password):
    prob = [password.count(c) / len(password) for c in set(password)]
    return -sum(p * math.log2(p) for p in prob)

def extract_features(password):
    length = len(password)
    upper = sum(1 for c in password if c.isupper())
    lower = sum(1 for c in password if c.islower())
    digits = sum(1 for c in password if c.isdigit())
    symbols = length - upper - lower - digits
    ent = entropy(password)
    return [[length, upper, lower, digits, symbols, ent]]

@app.route('/api/password_strength', methods=['POST'])
def password_strength():
    data = request.get_json()
    password = data.get('password', '')
    if not password:
        return jsonify({"error": "Password is required"}), 400

    features = extract_features(password)
    prediction = model.predict(features)[0]
    return jsonify({"strength": prediction})

if __name__ == "__main__":
    app.run(debug=True)
