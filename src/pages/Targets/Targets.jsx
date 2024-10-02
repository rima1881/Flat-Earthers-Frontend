import { useTarget } from "../../utils/useTarget"
import styles from "./Targets.module.css"

export default function Targets(){

    const { targetsState } = useTarget()
    const { targets, deleteTarget } = targetsState()
    
   
    const TargetTemplate = ({row , path ,lat,lng, imageCount, key}) => (
         
        <tr>
            <td>
                {row}
            </td>
           
            <td>
                {path}
            </td>
            <td>
                {lat}
                
            </td>
            <td>
                {lng}
            </td>
            <td>
                <button>Examine</button>
                <button>Download</button>
                <button onClick={()=>deleteTarget(key)}>Delete</button>
            </td>
        </tr>
    )
    
    const renderedTargets = targets.map( (target, index) => 
        <TargetTemplate row={target.row} path={target.path} lat={target.lat} lng={target.lng} key={index} /> 
    
    )

    return(
        <div className={styles.container}>
            <div className={styles.header}><span>Selected Targets</span><button>Sync</button></div>
            <div className={styles.body}>
                <table>
                    
                    <th>
                        <td>
                            Row
                        </td>
                        <td>
                            Path
                        </td>
                        <td>
                            Latitude
                        </td>
                        <td>
                            Longitude
                        </td>
                        <td>
                            Action
                        </td>
                        
                    </th>
                    {renderedTargets}
                    
                </table>
            </div>

        </div>
    )
}