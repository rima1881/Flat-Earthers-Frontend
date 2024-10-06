import { useTarget } from "./useTarget";
import { useState , useEffect } from "react";

const useTargetDetails = (guid) => {

    const { targetsState } = useTarget()
    const { targets } = targetsState()

    // Define state outside of useCallback
    const [images, setImages] = useState()

    const [targetData , setTargetData] = useState(targets.find( t => t.guid === guid ))

    const [imageNum , setImageNum] = useState(5)

    useEffect(() => {

        if (!targetData) return;  // Check if target exists

        const params = new URLSearchParams({
            path: targetData.path,
            row: targetData.row,
            numResults: imageNum
        });

        const requestURL = `http://localhost:5029/Images?${params.toString()}`;

        fetch(requestURL)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => setImages(data))
            .catch(error => console.log(error));

    }, [guid, targets]);  // Include `targets` in the dependency array if it's coming from the component

    return { targetData , images , imageNum }
}

export default useTargetDetails