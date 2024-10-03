import React, {useEffect} from 'react'
import Cookies from 'js-cookie'
import { useTarget } from '../../utils/useTarget'


export default function Download(){
    //Get the targets data from targetstate(from use target)
    const { targetsState } = useTarget()
    const { targets } = targetsState()
   
    
    //Download performs the downloading of the csv
    const download = (data) =>{
        if(data.length === 0){
            alert('Add Target points to Download data')
            return;
        }
        
    //setting up the data for headers and row data
    const header = ['Latitude', 'Longitude','Path', 'Row', 'Prediction']
    const rows = data.map(entry =>[
        entry.lat,
        entry.lng,
        entry.path,
        entry.row,
        entry.prediction
    ])
    //mapping the rows to the headers
    const csv= [
        header.join(','),
        ...rows.map(e => e.join(','))
    ].join('\n');

    //create a binary large object? with the data and type(csv)
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;' });
    //creating link and url for the blob and download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    //link setup for download
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
    const handleDownload = ()=>{
        console.log(targets)
        download(targets);
    }
    return(
        <button onClick={handleDownload}>Amir make this button the same I need to go for my lab. I'm late</button>
    )
    
}