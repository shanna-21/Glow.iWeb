// import React, { useEffect, useState } from 'react';
// import './Scan.css';
// import { faL } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';


// const Scan = () => {
//     const [files, setFiles] = useState([]);
//     const [prediction, setPrediction] = useState(null);
//     const [uploadComplete, setUploadComplete] = useState(false);
//     const [uploadCompleteText, setUploadCompleteText] = useState('');
//     const uploadMessage = " You have successfully uploaded 3 images. Click the scan button to continue."
//     const typingSpeed = 50;
  
//     const handleFileChange = (event) => {
//       const uploadedFiles = event.target.files;
//       if (uploadedFiles.length === 3) {
//         setFiles(uploadedFiles);
//         setUploadComplete(true);
//       } else {
//         alert("Please upload exactly three images.");
//         setUploadComplete(false);
//         setUploadCompleteText('');
//       }
//     };

//     useEffect(() => {
//       if (uploadComplete){
//         let index = 0;
//         const interval = setInterval(() => {
//           index++;
//           setUploadCompleteText((prev) => prev + uploadMessage[index]);
//           if (index === uploadMessage.length - 1) clearInterval(interval);
//         }, typingSpeed);

//         return () => clearInterval(interval);
//       }
//     }, [uploadComplete]);
  
//     const handleSubmit = async () => {
//       if (files.length !== 3) {
//         alert("You need to upload 3 images.");
//         return;
//       }
  
//       const formData = new FormData();
//       for (let i = 0; i < files.length; i++) {
//         formData.append(`image${i + 1}`, files[i]);
//       }
  
//       try {
//         const response = await fetch('http://localhost:5000/predict', {
//           method: 'POST',
//           body: formData,
//         });
  
//         const result = await response.json();
//         setPrediction(result.prediction);
//       } catch (error) {
//         console.error('Error during prediction:', error);
//       }
//     };
  
//     return (
//       <div className="upload-predict-container">
//         <h2>Skin Disease Prediction</h2>
//         <div className="upload-file">
//           <label htmlFor="file-upload" className="custom-file-upload">
//             Choose Files
//           </label>
//           <input id="file-upload" type="file" multiple onChange={handleFileChange} accept="image/*" />
//         </div>


//         {uploadComplete && (
//           <p className='upload-description'>{uploadCompleteText}</p>
//         )}

//         <button onClick={handleSubmit}>Scan</button>

//         {prediction && (
//           <div className="prediction-result">
//             <h3>Prediction Result</h3>
//             <p>{prediction}</p>
//           </div>
//         )};
//       </div>
//     );
// };

// export default Scan

import React, { useState } from 'react';
import axios from 'axios';

const Scan = () => {
    const [images, setImages] = useState([]);
    const [predictions, setPredictions] = useState([]); // State to hold predictions
    const [error, setError] = useState(null); // State to hold error messages

    const handleImageChange = (event) => {
        setImages(event.target.files);
    };

    const handleScanClick = async () => {
        if (images.length !== 3) {
            alert("Please upload exactly 3 images.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Store predictions in state
            setPredictions(response.data.predictions);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error uploading images:', error);
            setError('An error occurred while processing the images.');
        }
    };

    return (
        <div>
          <h2>Skin Disease Prediction</h2>
          <input type="file" multiple onChange={handleImageChange} />
          <button onClick={handleScanClick}>Scan</button>

          {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}

          {/* Render predictions */}
          <div>
            {predictions.length > 0 && (
                <h3>Predictions:</h3>
            )}
            <ul>
                {predictions.map((prediction, index) => (
                    <li key={index}>{prediction}</li> // Adjust this based on your prediction structure
                ))}
            </ul>
          </div>
        </div>
    );
};

export default Scan;
