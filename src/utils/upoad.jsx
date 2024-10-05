import Papa from 'papaparse';
import { useTarget } from './useTarget'; // Adjust the import path if necessary

const uploadTargets = (file) => {
    const { targetsState } = useTarget()
  const { targets, addTarget } = targetsState()

    // Parse the CSV file
    Papa.parse(file, {
        header: true,
        complete: (results) => {
            results.data.forEach(target => {
                const newTarget = {
                    lat: parseFloat(target.Latitude),  // Ensure these match your CSV headers
                    lng: parseFloat(target.Longitude),
                    path: target.Path,
                    row: target.Row,
                };

                // Add each new target using the addTarget function
                addTarget(newTarget);
            });
        },
        error: (error) => {
            console.error('Error parsing CSV:', error);
        }
    });
};

export default uploadTargets;