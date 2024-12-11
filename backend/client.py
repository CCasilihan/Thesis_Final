import os
import requests

# URL of the Flask application
url = 'http://127.0.0.1:5000/predict'

# Path to the folder containing the audio files you want to test
folder_path = r'C:\Users\charisse\Desktop\Thesis_Bark_Recognition - Copy\backend\dataset'

# Ensure the folder exists
if not os.path.exists(folder_path):
    print(f"Folder '{folder_path}' does not exist.")
    exit()

# List all files in the folder
files = os.listdir(folder_path)

# Filter only .wav files
wav_files = [f for f in files if f.endswith('.wav')]

# Iterate over each .wav file and send it to the server for prediction
for filename in wav_files:
    file_path = os.path.join(folder_path, filename)
    with open(file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(url, files=files)
        
        # Check if the response was successful
        if response.status_code == 200:
            # Print the response from the server
            print(f"File: {filename}, Response: {response.json()}")
        else:
            print(f"File: {filename}, Error: {response.json()}")








# import os
# import requests

# # URL of the Flask application
# url = 'http://127.0.0.1:5000/predict'

# # Path to the folder containing the audio files you want to test
# folder_path = r'C:\Users\charisse\Desktop\Thesis_Bark_Recognition - Copy\backend\dataset'

# # Ensure the folder exists
# if not os.path.exists(folder_path):
#     print(f"Folder '{folder_path}' does not exist.")
#     exit()

# # List all files in the folder
# files = os.listdir(folder_path)

# # Filter only .wav files
# wav_files = [f for f in files if f.endswith('.wav')]

# # Iterate over each .wav file and send it to the server for prediction
# for filename in wav_files:
#     file_path = os.path.join(folder_path, filename)
#     with open(file_path, 'rb') as f:
#         files = {'file': f}
#         response = requests.post(url, files=files)
    
#     # Print the response from the server
#     print(f"File: {filename}, Response: {response.json()}")

















































# import os
# import requests

# # URL of the Flask application
# url = 'http://192.168.1.7:5000/predict'

# # List of paths to the audio files you want to test
# file_paths = [
#     'C:\\Users\\charisse\\Desktop\\Thesis_Bark_Recognition\\backend\\dataset\\Aggressive2.wav',
#     'C:\\Users\\charisse\\Desktop\\Thesis_Bark_Recognition\\backend\\dataset\\Anger1.wav'
# ]

# # Iterate through each file path
# for file_path in file_paths:
#     # Ensure the file exists
#     if not os.path.exists(file_path):
#         print(f"File '{file_path}' does not exist.")
#         continue

#     # Open the file in binary mode
#     with open(file_path, 'rb') as f:
#         files = {'file': f}
#         response = requests.post(url, files=files)

#     # Print the response from the server
#     print(f"Response for '{file_path}': {response.json()}")


# import os
# import requests

# # URL of the Flask application
# url = 'http://127.0.0.0:5000/predict'

# # Path to the folder containing the audio files you want to test
# folder_path = r'C:\Users\charisse\Desktop\Thesis_Bark_Recognition\backend\dataset'

# # Ensure the folder exists
# if not os.path.exists(folder_path):
#     print(f"Folder '{folder_path}' does not exist.")
#     exit()

# # List all files in the folder
# files = os.listdir(folder_path)

# # Filter only .wav files
# wav_files = [f for f in files if f.endswith('.wav')]

# # Iterate over each .wav file and send it to the server for prediction
# for filename in wav_files:
#     file_path = os.path.join(folder_path, filename)
#     with open(file_path, 'rb') as f:
#         files = {'file': f}
#         response = requests.post(url, files=files)
    
#     # Print the response from the server
#     if response.status_code == 200:
#         print(f"File: {filename}, Response: {response.json()}")
#     else:
#         print(f"File: {filename}, Error: {response.status_code}, Message: {response.text}")
