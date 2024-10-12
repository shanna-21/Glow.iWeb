# %%

# import sys
# import os
# sys.path.append(os.path.dirname(os.path.abspath(__file__)))


# from flask import Flask, request, jsonify
# from scan_model import IAmPredicting  

# app = Flask(__name__)

# @app.route('/predict', methods=['POST'])
# def predict_skin_disease():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image provided'}), 400
    
#     files = request.files.getlist('image')  # Expecting three images
#     predictions = []

#     for file in files:
#         file_path = f'/path/to/save/{file.filename}'  # Define a path to save the uploaded image
#         file.save(file_path)  # Save the uploaded image

#         # Get the prediction for the image
#         prediction = IAmPredicting(file_path)
#         predictions.append(prediction)

#     return jsonify({'predictions': predictions})

# if __name__ == '__main__':
#     app.run(debug=True)

# %%

import os
import torch
from torchvision import transforms
from torchvision.models import vit_b_16  # Import the Vision Transformer
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS



# %%

# Load the model architecture
model = vit_b_16(weights=None, num_classes = 3)  # Initialize the ViT model without default weights
checkpoint = torch.load('best_model.pth', map_location=torch.device('cpu'))
# model.load_state_dict(torch.load('best_model.pth'))  # Load the trained weights
model.load_state_dict(checkpoint['model_state_dict'], strict=False)
model.eval()  # Set the model to evaluation mode

# Define the transformation for input images
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize image to fit model input
    transforms.ToTensor(),
])

# Prediction function
def predict(image_path):
    image = Image.open(image_path).convert('RGB')
    image = preprocess(image)
    image = image.unsqueeze(0)  # Add batch dimension
    
    with torch.no_grad():
        output = model(image)
        _, predicted = torch.max(output, 1)  # Get the class with the highest score
    
    return predicted.item()  # Return the predicted class index



# %%

# # Flask app setup
# app = Flask(__name__)

# @app.route('/predict', methods=['POST'])
# def predict_skin_disease():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image provided'}), 400
    
#     files = request.files.getlist('image')  # Expecting multiple images
#     predictions = []

#     # for file in files:
#     #     file_path = f'/path/to/save/{file.filename}'  # Define a path to save the uploaded image
#     #     file.save(file_path)  # Save the uploaded image

#     #     # Get the prediction for the image
#     #     prediction = predict(file_path)
#     #     predictions.append(prediction)

#     # return jsonify({'predictions': predictions})
    
#     for file in files:
#         if file.filename == '':
#             return jsonify({'error': 'Empty filename'}), 400

#         if not file.content_type.startswith('image/'):
#             return jsonify({'error': 'File is not an image'}), 400

#         # Define a path to save the uploaded image
#         save_dir = '/path/to/save/'
#         os.makedirs(save_dir, exist_ok=True)  # Create directory if it doesn't exist
#         file_path = os.path.join(save_dir, file.filename)  # Save the uploaded image

#         file.save(file_path)  # Save the uploaded image

#         # Get the prediction for the image
#         prediction = predict(file_path)
#         predictions.append(prediction)

#     return jsonify({'predictions': predictions})

# if __name__ == '__main__':
#     app.run(debug=True, port=8080)
# %%

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict_skin_disease():
    try:
        if 'images' not in request.files:
            return jsonify({'error': 'No images provided'}), 400
        
        files = request.files.getlist('image')
        if len(files) != 3:
            return jsonify({'error': 'Please upload exactly 3 images'}), 400

        save_dir = './images/'  # Change this to an appropriate directory path
        os.makedirs(save_dir, exist_ok=True)  # Create the directory if it doesn't exist
        predictions = []
        
        for file in files:
            if file and file.filename != '':  # Check if file exists
                print(f"Received file: {file.filename} with content type: {file.content_type}")
                
                if not file.content_type.startswith('image/'):
                    return jsonify({'error': f"File {file.filename} is not an image"}), 400
                
                file_path = os.path.join(save_dir, file.filename)
                file.save(file_path)
                
                # file_path = f'./images/{file.filename}'
                # file.save(file_path)
                # Debug: Print the file name to verify it’s uploaded correctly
                print(f"File saved at: {file_path}")
                # Prediction logic here (pretend prediction logic)
                prediction = predict(file_path)
                predictions.append(prediction)
            else:
                return jsonify({'error': 'One of the files is missing'}), 400
        
        return jsonify({'predictions': predictions})

    except Exception as e:
        # Print the error in the Flask console to debug
        print(f"Error during file handling: {e}")
        return jsonify({'error': 'An error occurred while processing the images.'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
# %%
