from flask import Flask, request, jsonify
from flask_cors import CORS
import random
# from your_model_module import predict_emotion  # Import your actual model prediction function

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Placeholder function to simulate emotion prediction
def predict_emotion(audio_file_path):
    emotions = ['Happy', 'Sad', 'Anger', 'Aggressive', 'Alertness', 'Growling', 'Pain', 'Scared', 'Fear', 'Hungry']
    probabilities = [random.uniform(0, 100) for _ in emotions]
    total = sum(probabilities)
    probabilities = [p / total * 100 for p in probabilities]  # Normalize to sum to 100%
    predicted_emotion = emotions[probabilities.index(max(probabilities))]
    return {
        "label": predicted_emotion,
        "probability": max(probabilities),
        "results": [{"emotion": emotion, "probability": prob} for emotion, prob in zip(emotions, probabilities)]
    }

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        file_path = f"/tmp/{file.filename}"
        file.save(file_path)

        # Replace with your actual model prediction logic
        prediction = predict_emotion(file_path)

        return jsonify(prediction)

    return jsonify({"error": "File not processed"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)





# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Your prediction logic here
#     return jsonify({
#         "label": "Joy",
#         "probability": 95,
#         "results": [
#             {"emotion": "Joy", "probability": 95},
#             {"emotion": "Sadness", "probability": 5},
#         ]
#     })

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)
