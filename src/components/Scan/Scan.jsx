// import React, { useEffect, useState } from 'react';
// import './Scan.css';


// const Scan = () => {
//     const [files, setFiles] = useState([]);
//     const [predictions, setPrediction] = useState([]);
//     const [uploadComplete, setUploadComplete] = useState(false);
//     const [uploadCompleteText, setUploadCompleteText] = useState('');
//     const uploadMessage = " You have successfully uploaded 3 images. Click the scan button to continue."
//     const typingSpeed = 50;
//     const [error, setError] = useState(null);
  
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

//         if (files.length !== 3) {
//             alert("You need to upload 3 images.");
//             return;
//         }
  
//     //   const formData = new FormData();
//     //   for (let i = 0; i < files.length; i++) {
//     //     formData.append(`image${i + 1}`, files[i]);
//     //   }
//         const formData = new FormData();
//             for (let i = 0; i < images.length; i++) {
//                 formData.append('images', images[i]);
//             }

  
//         try {
//             const response = await fetch('http://localhost:5000/predict', {
//             method: 'POST',
//             body: formData,
//             });
    
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} ${response.statusText}`);
//             }

//             const result = await response.json();
//             setPrediction(result.predictions);
//             setError(null);
//         } catch (error) {
//             console.error('Error during prediction:', error);
//             setError('An error occurred while processing the images.');
//         }
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

//         {error && <div style={{ color: 'red' }}>{error}</div>}

//         {/* {prediction && (
//           <div className="prediction-result">
//             <h3>Prediction Result</h3>
//             <p>{prediction}</p>
//           </div>
//         )}; */}
//         <div className='prediction-result'>
//             {predictions.length > 0 && (
//                 <>
//                     <h3>Prediction Result</h3>
//                     <p>{predictions}</p>
//                 </>
//             )}
//             <ul>
//                 {predictions.map((prediction, index) => (
//                     <li key={index}>{prediction}</li> // Adjust this based on your prediction structure
//                 ))}
//             </ul>
//         </div>
//       </div>
//     );
// };

// export default Scan

import React, { useState, useEffect } from 'react';
import './Scan.css';
import axios from 'axios';

const Scan = () => {
    const [images, setImages] = useState([]);
    const [predictions, setPredictions] = useState([]); // State to hold predictions
    const [uploadComplete, setUploadComplete] = useState(false);
    const [uploadCompleteText, setUploadCompleteText] = useState('');
    const uploadMessage = " You have successfully uploaded 3 images. Click the scan button to continue."
    const typingSpeed = 0;
    const [error, setError] = useState(null); // State to hold error messages

    const handleImageChange = (event) => {
        // setImages(event.target.files);
        const uploadedFiles = Array.from(event.target.files);
        if (uploadedFiles.length === 3) {
            setImages(uploadedFiles);
            setUploadComplete(true);
        } else {
            alert("Please upload exactly three images.");
            setUploadComplete(false);
            setUploadCompleteText('');
        }  
    };

    useEffect(() => {
        if (uploadComplete){
            let index = 0;
            setUploadCompleteText('');
            const interval = setInterval(() => {
                index++;
                setUploadCompleteText((prev) => prev + uploadMessage[index]);
                if (index === uploadMessage.length - 1) clearInterval(interval);
            }, typingSpeed);

            return () => clearInterval(interval);
        }
    }, [uploadComplete]);

    const handleScanClick = async () => {
        console.log('Scan button clicked');
        if (images.length !== 3) {
            alert("Please upload exactly 3 images.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }
        // images.forEach((image) => {
        //     formData.append('images', image);
        // });

        try {
            // const response = await axios.post('http://localhost:5000/predict', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData,
            });

            // if (!response.ok) {
            //     throw new Error ('Failed to process images.')
            // }
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data)

            // Store predictions in state
            setPredictions(data.predictions);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error uploading images:', error);
            setError(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className='background-scan'>
            <div className='upload-predict-container'>
                <h2>Skin Disease Prediction</h2>
                <div className="upload-file">
                <label htmlFor="file-upload" className="custom-file-upload">
                    Choose Files
                </label>
                <input id="file-upload" type="file" multiple onChange={handleImageChange} />
                </div>

            {uploadComplete && (
                <p className='upload-description'>{uploadCompleteText}</p>
            )}

            {/* <input type="file" multiple onChange={handleImageChange} /> */}
            <button onClick={handleScanClick}>Scan</button>


            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}

            {/* Render predictions */}
            <div>
                {predictions.length > 0 && (
                    <h3>Predictions:</h3>
                )}
                <ul>
                    {predictions.map((prediction, index) => (
                        <li key={index}>The prediction: {prediction}</li> // Adjust this based on your prediction structure
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default Scan;