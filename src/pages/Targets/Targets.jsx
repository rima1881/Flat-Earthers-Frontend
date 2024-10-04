import { useTarget } from "../../utils/useTarget"
import styles from "./Targets.module.css"
import useAuth from "../../utils/useAuth"


export default function Targets(){

    const { targetsState } = useTarget()
    const { targets, deleteTarget } = targetsState()

    const { userState } = useAuth()
       
    const { user } = userState()

    const hasLoggedIn = user.token != ""

    const deleteHandle = (targetId , index) => {

        //  Delete local targets
        deleteTarget(index)

        //  Delete server targets
        if (hasLoggedIn){
            console.log("i have to make api call :(")
        }

    }

    const TargetTemplate = ({id, index, row, path, lat, lng}) => (
         
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
                <button onClick={() => deleteHandle(id, index)}>Delete</button>
            </td>
        </tr>
    )
    
    const renderedTargets = targets.map( (target, index) => 
        <TargetTemplate row={target.row} path={target.path} lat={target.lat} lng={target.lng} key={index} index={index} /> 
    
    )

    return(
        <div className={styles.container}>
            <div className={styles.header}><span>Selected Targets</span><button>Upload</button><button disabled={!hasLoggedIn}>Sync</button></div>
            <div className={styles.body}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Row
                        </th>
                        <th>
                            Path
                        </th>
                        <th>
                            Latitude
                        </th>
                        <th>
                            Longitude
                        </th>
                        <th>
                            Action
                        </th>
                        
                    </tr>
                    </thead>
                    <tbody>
                        {renderedTargets}
                    </tbody>
                </table>
            </div>

        </div>
    )
}