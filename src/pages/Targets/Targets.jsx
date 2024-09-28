import { useTarget } from "../../utils/useTarget"
import styles from "./Targets.module.css"

export default function Targets(){

    const { targetsState } = useTarget()
    const { targets } = targetsState()

    const TargetTemplate = ({row , path , imageCount}) => (
        <tr>
            <td>
                {row}
            </td>
            <td>
                {path}
            </td>
            <td>
                Fuck Umar
            </td>
            <td>
                <span>Fuck Umar</span>
            </td>
            <td>
                <button>Examine</button>
                <button>Download</button>
                <button>Delete</button>
            </td>
        </tr>
    )

    const renderedTargets = targets.map( (target, index) => 
        <TargetTemplate row={target.row} path={target.path} key={index} /> 
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