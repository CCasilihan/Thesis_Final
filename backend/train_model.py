import os
import numpy as np
import librosa
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score  # Add this import
import pickle

# Function to extract MFCC features from an audio file
def extract_mfcc_from_file(file_path, n_mfcc=13, frame_size=2048, hop_length=512):
    y, sr = librosa.load(file_path, sr=None)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc, n_fft=frame_size, hop_length=hop_length)
    mfcc_mean = np.mean(mfcc, axis=1)
    return mfcc_mean

# Load the dataset from a single folder
def load_dataset(folder_path):
    X, y = [], []
    for filename in os.listdir(folder_path):
        if filename.endswith(".wav"):
            file_path = os.path.join(folder_path, filename)
            label = filename.split('_')[0]  # Assuming the file name format is 'label_filename.wav'
            mfcc_features = extract_mfcc_from_file(file_path)
            X.append(mfcc_features)
            y.append(label)
    return np.array(X), np.array(y)

# Folder path containing all bark sounds
folder_path = r'C:\Users\charisse\Desktop\Thesis_Bark_Recognition\backend\dataset'  

# Load the dataset
X, y = load_dataset(folder_path)

# Check if the dataset is loaded correctly
print(f"Dataset loaded with {len(X)} samples.")

# Encode the labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Check class distribution
unique, counts = np.unique(y_encoded, return_counts=True)
print(f"Class distribution: {dict(zip(unique, counts))}")

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Train a simple model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Test the model on the test set
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")  # Ensure accuracy_score is imported

# Save the trained model to a file
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Save the label encoder to a file
with open('label_encoder.pkl', 'wb') as f:
    pickle.dump(le, f)

print("Model and label encoder have been saved.")
