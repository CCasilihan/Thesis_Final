# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import librosa
# from sklearn.preprocessing import LabelEncoder
# from sklearn.ensemble import RandomForestClassifier
# import pickle

# app = Flask(__name__)
# CORS(app)  # To allow cross-origin requests

# # Load pre-trained model and label encoder
# with open('model.pkl', 'rb') as f:
#     model = pickle.load(f)

# with open('label_encoder.pkl', 'rb') as f:
#     le = pickle.load(f)

# def extract_mfcc_from_audio(y, sr, n_mfcc=13, frame_size=2048, hop_length=512):
#     mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc, n_fft=frame_size, hop_length=hop_length)
#     mfcc_mean = np.mean(mfcc, axis=1)
#     return mfcc_mean

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part in the request'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     y, sr = librosa.load(file, sr=None)
#     mfcc_features = extract_mfcc_from_audio(y, sr)
#     features = mfcc_features.reshape(1, -1)
    
#     probabilities = model.predict_proba(features)
#     top_3_indices = np.argsort(probabilities[0])[-3:][::-1]
#     top_3_labels = le.inverse_transform(top_3_indices)
#     top_3_probabilities = probabilities[0][top_3_indices]
    
#     predictions = [{'label': label, 'probability': float(prob)} for label, prob in zip(top_3_labels, top_3_probabilities)]
#     return jsonify(predictions)

# if __name__ == '__main__':
#     app.run(debug=True)











# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import librosa
# from sklearn.preprocessing import LabelEncoder
# from sklearn.ensemble import RandomForestClassifier
# import pickle

# app = Flask(__name__)
# CORS(app)  # To allow cross-origin requests

# # Load pre-trained model and label encoder
# with open('model.pkl', 'rb') as f:
#     model = pickle.load(f)

# with open('label_encoder.pkl', 'rb') as f:
#     le = pickle.load(f)

# def extract_mfcc_from_audio(y, sr, n_mfcc=13, frame_size=2048, hop_length=512):
#     mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc, n_fft=frame_size, hop_length=hop_length)
#     mfcc_mean = np.mean(mfcc, axis=1)
#     return mfcc_mean

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part in the request'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     y, sr = librosa.load(file, sr=None)
#     mfcc_features = extract_mfcc_from_audio(y, sr)
#     features = mfcc_features.reshape(1, -1)
    
#     probabilities = model.predict_proba(features)
#     top_3_indices = np.argsort(probabilities[0])[-3:][::-1]
#     top_3_labels = le.inverse_transform(top_3_indices)
#     top_3_probabilities = probabilities[0][top_3_indices]
    
#     predictions = [{'label': label, 'probability': float(prob)} for label, prob in zip(top_3_labels, top_3_probabilities)]
#     return jsonify(predictions)

# if __name__ == '__main__':
#     app.run(debug=True)
