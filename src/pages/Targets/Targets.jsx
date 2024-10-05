import { useTarget } from "../../utils/useTarget"
import useAPI from "../../utils/useAPI"
import styles from "./Targets.module.css"
import useAuth from "../../utils/useAuth"


export default function Targets(){

    const { targetsState } = useTarget()
    const { targets, deleteTarget } = targetsState()
    const { deleteTargetServer , pushTargets , pullTargets } = useAPI()

    const { userState } = useAuth()
    const { user } = userState()

    const hasLoggedIn = user.token != ''

    const deleteHandle = (targetId , index) => {

        //  Delete local targets
        deleteTarget(index)

        //  Delete server targets
        if (hasLoggedIn)
            deleteTargetServer(targetId)
    }

    const handleSync = () => {
        if (hasLoggedIn)
            pullTargets()
    }

    const handlePush = () => {
        if (hasLoggedIn)
            pushTargets()
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
                <a href={"examine/"+ id} >Examine</a>
                <button onClick={() => deleteHandle(id, index)}>Delete</button>
            </td>
        </tr>
    )
    
    const renderedTargets = targets.map( (target, index) => 
        <TargetTemplate row={target.row} path={target.path} lat={target.lat} lng={target.lng} key={index} index={index} /> 
    
    )

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Selected Targets</span>
                <button disabled={!hasLoggedIn} onClick={handlePush}>Upload</button>
                <button disabled={!hasLoggedIn} onClick={handleSync}>Sync</button>
            </div>
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