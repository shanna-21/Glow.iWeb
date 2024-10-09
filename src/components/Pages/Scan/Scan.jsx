import React, { useState } from 'react';
import './Scan.css';


const Scan = () => {
    const [files, setFiles] = useState([]);
    const [prediction, setPrediction] = useState(null);
  
    const handleFileChange = (event) => {
      const uploadedFiles = event.target.files;
      if (uploadedFiles.length === 3) {
        setFiles(uploadedFiles);
      } else {
        alert("Please upload exactly three images.");
      }
    };
  
    const handleSubmit = async () => {
      if (files.length !== 3) {
        alert("You need to upload 3 images.");
        return;
      }
  
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`image${i + 1}`, files[i]);
      }
  
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData,
        });
  
        const result = await response.json();
        setPrediction(result.prediction);
      } catch (error) {
        console.error('Error during prediction:', error);
      }
    };
  
    return (
      <div className="upload-predict-container">
        <h2>Skin Disease Prediction</h2>
        <input type="file" multiple onChange={handleFileChange} accept="image/*" />
        <button onClick={handleSubmit}>Scan</button>
        {prediction && (
          <div className="prediction-result">
            <h3>Prediction Result</h3>
            <p>{prediction}</p>
          </div>
        )}
      </div>
    );
}

export default Scan