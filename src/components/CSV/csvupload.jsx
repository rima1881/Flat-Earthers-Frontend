import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvUpload = ({ addTarget }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert('No file selected.');
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const newTargets = results.data.map(row => ({
                    lat: parseFloat(row.Latitude),
                    lng: parseFloat(row.Longitude),
                    path: row.Path,
                    row: row.Row,
                    prediction: row.Prediction
                }));

                addTarget(newTargets);
            },
            error: (error) => {
                console.error('Error parsing the file:', error);
            }
        });
    };

    return (
        <div>
            <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileChange} 
            />
            <button onClick={handleUpload}>Upload CSV</button>
        </div>
    );
};

export default CsvUpload;