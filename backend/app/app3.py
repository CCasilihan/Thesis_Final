import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import librosa
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import pickle
from database import fetch_data_from_db, add_sound

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests

def extract_mfcc_from_audio(y, sr, n_mfcc=13, frame_size=2048, hop_length=512):
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc, n_fft=frame_size, hop_length=hop_length)
    mfcc_mean = np.mean(mfcc, axis=1)
    return mfcc_mean

def load_and_preprocess_data(data):
    X = []
    y = []
    for file_path, label in data:
        y_audio, sr = librosa.load(file_path, sr=None)
        mfcc_features = extract_mfcc_from_audio(y_audio, sr)
        X.append(mfcc_features)
        y.append(label)
    return np.array(X), np.array(y)

# Fetch data from database
data = fetch_data_from_db()

# Load and preprocess data
X, y = load_and_preprocess_data(data)

# Encode labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y_encoded)

# Save model and label encoder
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('label_encoder.pkl', 'wb') as f:
    pickle.dump(le, f)

# API Address
API_ADDRESS = '192.168.50.69'
API_PORT = 8081

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    y, sr = librosa.load(file, sr=None)
    mfcc_features = extract_mfcc_from_audio(y, sr)
    features = mfcc_features.reshape(1, -1)
    
    probabilities = model.predict_proba(features)
    top_3_indices = np.argsort(probabilities[0])[-3:][::-1]
    top_3_labels = le.inverse_transform(top_3_indices)
    top_3_probabilities = probabilities[0][top_3_indices]
    
    predictions = [{'label': label, 'probability': float(prob)} for label, prob in zip(top_3_labels, top_3_probabilities)]
    return jsonify(predictions)

@app.route('/add_sound', methods=['POST'])
def add_new_sound():
    data = request.json
    file_path = data.get('file_path')
    label = data.get('label')
    
    if not file_path or not label:
        return jsonify({'error': 'Missing file_path or label'}), 400
    
    add_sound(file_path, label)
    
    return jsonify({'message': 'Sound added successfully'}), 201

if __name__ == '__main__':
    app.run(host=API_ADDRESS, port=API_PORT, debug=True)
