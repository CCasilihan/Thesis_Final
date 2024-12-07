import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import librosa
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import pickle

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests

# Sample data for training the model
data = [
    ("dataset/Aggressive2.wav", "Aggressive"),
    ("dataset/Aggressive3.wav", "Aggressive"),
    ("dataset/Aggressive4.wav", "Aggressive"),
    ("dataset/Aggressive5.wav", "Aggressive"),
    ("dataset/Aggressive6.wav", "Aggressive"),
    ("dataset/Aggressive7.wav", "Aggressive"),
    ("dataset/Aggressive8.wav", "Aggressive"),
    ("dataset/Aggressive9.wav", "Aggressive"),
    ("dataset/Aggressive10.wav", "Aggressive"),

    ("dataset/Anger1.wav", "Anger"),
    ("dataset/Anger2.wav", "Anger"),
    ("dataset/Anger3.wav", "Anger"),
    ("dataset/Anger4.wav", "Anger"),
    ("dataset/Anger5.wav", "Anger"),
    ("dataset/Anger6.wav", "Anger"),
    ("dataset/Anger7.wav", "Anger"),
    ("dataset/Anger8.wav", "Anger"),
    ("dataset/Anger9.wav", "Anger"),
    ("dataset/Anger10.wav", "Anger"),

    ("dataset/Growling1.wav", "Growling"),
    ("dataset/Growling2.wav", "Growling"),
    ("dataset/Growling3.wav", "Growling"),
    ("dataset/Growling4.wav", "Growling"),
    ("dataset/Growling5.wav", "Growling"),
    ("dataset/Growling6.wav", "Growling"),

    ("dataset/Happy1.wav", "Happy"),
    ("dataset/Happy_shih-tzu.wav", "Happy"),

    ("dataset/Pain1.wav", "Pain"),
    ("dataset/Pain2.wav", "Pain"),
    ("dataset/Pain3.wav", "Pain"),
    ("dataset/Pain4.wav", "Pain"),
    ("dataset/Pain5.wav", "Pain"),

    ("dataset/Sad1.wav", "Sad"),
    ("dataset/Sad2.wav", "Sad"),
    ("dataset/Sad3.wav", "Sad"),
    ("dataset/Sad4.wav", "Sad"),

    ("dataset/Scared1.wav", "Scared"),
    ("dataset/Scared2.wav", "Scared"),
    ("dataset/Scared3.wav", "Scared"),

    ("dataset/Warning1.wav", "Warning"),
    ("dataset/Warning2.wav", "Warning"),
    ("dataset/Warning3.wav", "Warning"),
    ("dataset/Warning4.wav", "Warning")
]

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

@app.route('/')
def home():
    return "Welcome to the Audio Classification API"

@app.route('/predict', methods=['GET'])
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)





















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

# # Sample data
# data = [
#     ("dataset/Aggressive2.wav", "Aggressive"),
#     ("dataset/Aggressive3.wav", "Aggressive"),
#     ("dataset/Aggressive4.wav", "Aggressive"),
#     ("dataset/Aggressive5.wav", "Aggressive"),
#     ("dataset/Aggressive6.wav", "Aggressive"),
#     ("dataset/Aggressive7.wav", "Aggressive"),
#     ("dataset/Aggressive8.wav", "Aggressive"),
#     ("dataset/Aggressive9.wav", "Aggressive"),
#     ("dataset/Aggressive10.wav", "Aggressive"),

#     ("dataset/Anger1.wav", "Anger"),
#     ("dataset/Anger2.wav", "Anger"),
#     ("dataset/Anger3.wav", "Anger"),
#     ("dataset/Anger4.wav", "Anger"),
#     ("dataset/Anger5.wav", "Anger"),
#     ("dataset/Anger6.wav", "Anger"),
#     ("dataset/Anger7.wav", "Anger"),
#     ("dataset/Anger8.wav", "Anger"),
#     ("dataset/Anger9.wav", "Anger"),
#     ("dataset/Anger10.wav", "Anger"),

#     ("dataset/Growling1.wav", "Growling"),
#     ("dataset/Growling2.wav", "Growling"),
#     ("dataset/Growling3.wav", "Growling"),
#     ("dataset/Growling4.wav", "Growling"),
#     ("dataset/Growling5.wav", "Growling"),
#     ("dataset/Growling6.wav", "Growling"),

#     ("dataset/Happy1.wav", "Happy"),
#     ("dataset/Happy_shih-tzu.wav", "Happy"),

#     ("dataset/Pain1.wav", "Pain"),
#     ("dataset/Pain2.wav", "Pain"),
#     ("dataset/Pain3.wav", "Pain"),
#     ("dataset/Pain4.wav", "Pain"),
#     ("dataset/Pain5.wav", "Pain"),

#     ("dataset/Sad1.wav", "Sad"),
#     ("dataset/Sad2.wav", "Sad"),
#     ("dataset/Sad3.wav", "Sad"),
#     ("dataset/Sad4.wav", "Sad"),

#     ("dataset/Scared1.wav", "Scared"),
#     ("dataset/Scared2.wav", "Scared"),
#     ("dataset/Scared3.wav", "Scared"),

#     ("dataset/Warning1.wav", "Warning"),
#     ("dataset/Warning2.wav", "Warning"),
#     ("dataset/Warning3.wav", "Warning"),
#     ("dataset/Warning4.wav", "Warning")
# ]

# def extract_mfcc_from_audio(y, sr, n_mfcc=13, frame_size=2048, hop_length=512):
#     mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc, n_fft=frame_size, hop_length=hop_length)
#     mfcc_mean = np.mean(mfcc, axis=1)
#     return mfcc_mean

# def load_and_preprocess_data(data):
#     X = []
#     y = []
#     for file_path, label in data:
#         y_audio, sr = librosa.load(file_path, sr=None)
#         mfcc_features = extract_mfcc_from_audio(y_audio, sr)
#         X.append(mfcc_features)
#         y.append(label)
#     return np.array(X), np.array(y)

# # Load and preprocess data
# X, y = load_and_preprocess_data(data)

# # Encode labels
# le = LabelEncoder()
# y_encoded = le.fit_transform(y)

# # Train model
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X, y_encoded)

# # Save model and label encoder
# with open('model.pkl', 'wb') as f:
#     pickle.dump(model, f)

# with open('label_encoder.pkl', 'wb') as f:
#     pickle.dump(le, f)

# # API Address
# API_ADDRESS = '192.168.1.9'
# API_PORT = 8081

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
#     app.run(host=API_ADDRESS, port=API_PORT, debug=True)







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
#     app.run(host='0.0.0.0', port=5000, debug=True)








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

# # Sample data for training the model
# data = [
#     ("dataset/Aggressive2.wav", "Aggressive"),
#     ("dataset/Aggressive3.wav", "Aggressive"),
#     ("dataset/Aggressive4.wav", "Aggressive"),
#     ("dataset/Aggressive5.wav", "Aggressive"),
#     ("dataset/Aggressive6.wav", "Aggressive"),
#     ("dataset/Aggressive7.wav", "Aggressive"),
#     ("dataset/Aggressive8.wav", "Aggressive"),
#     ("dataset/Aggressive9.wav", "Aggressive"),
#     ("dataset/Aggressive10.wav", "Aggressive"),

#     ("dataset/Anger1.wav", "Anger"),
#     ("dataset/Anger2.wav", "Anger"),
#     ("dataset/Anger3.wav", "Anger"),
#     ("dataset/Anger4.wav", "Anger"),
#     ("dataset/Anger5.wav", "Anger"),
#     ("dataset/Anger6.wav", "Anger"),
#     ("dataset/Anger7.wav", "Anger"),
#     ("dataset/Anger8.wav", "Anger"),
#     ("dataset/Anger9.wav", "Anger"),
#     ("dataset/Anger10.wav", "Anger"),

#     ("dataset/Growling1.wav", "Growling"),
#     ("dataset/Growling2.wav", "Growling"),
#     ("dataset/Growling3.wav", "Growling"),
#     ("dataset/Growling4.wav", "Growling"),
#     ("dataset/Growling5.wav", "Growling"),
#     ("dataset/Growling6.wav", "Growling"),

#     ("dataset/Happy1.wav", "Happy"),
#     ("dataset/Happy_shih-tzu.wav", "Happy"),

#     ("dataset/Pain1.wav", "Pain"),
#     ("dataset/Pain2.wav", "Pain"),
#     ("dataset/Pain3.wav", "Pain"),
#     ("dataset/Pain4.wav", "Pain"),
#     ("dataset/Pain5.wav", "Pain"),

#     ("dataset/Sad1.wav", "Sad"),
#     ("dataset/Sad2.wav", "Sad"),
#     ("dataset/Sad3.wav", "Sad"),
#     ("dataset/Sad4.wav", "Sad"),

#     ("dataset/Scared1.wav", "Scared"),
#     ("dataset/Scared2.wav", "Scared"),
#     ("dataset/Scared3.wav", "Scared"),

#     ("dataset/Warning1.wav", "Warning"),
#     ("dataset/Warning2.wav", "Warning"),
#     ("dataset/Warning3.wav", "Warning"),
#     ("dataset/Warning4.wav", "Warning")
# ]

# def extract_mfcc_from_audio(y, sr, n_mfcc=13, frame_size=2048, hop_length=512):
#     mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc, n_fft=frame_size, hop_length=hop_length)
#     mfcc_mean = np.mean(mfcc, axis=1)
#     return mfcc_mean

# def load_and_preprocess_data(data):
#     X = []
#     y = []
#     for file_path, label in data:
#         y_audio, sr = librosa.load(file_path, sr=None)
#         mfcc_features = extract_mfcc_from_audio(y_audio, sr)
#         X.append(mfcc_features)
#         y.append(label)
#     return np.array(X), np.array(y)

# # Load and preprocess data
# X, y = load_and_preprocess_data(data)

# # Encode labels
# le = LabelEncoder()
# y_encoded = le.fit_transform(y)

# # Train model
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X, y_encoded)

# # Save model and label encoder
# with open('model.pkl', 'wb') as f:
#     pickle.dump(model, f)

# with open('label_encoder.pkl', 'wb') as f:
#     pickle.dump(le, f)

# @app.route('/')
# def home():
#     return "Welcome to the Audio Classification API"

# @app.route('/predict', methods=['GET'])
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
#     app.run(debug=True, host='0.0.0.0', port=3000)


