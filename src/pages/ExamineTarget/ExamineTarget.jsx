
import { useParams } from "react-router-dom"

export default function ExamineTarget(){

    const { targetId } = useParams()

    console.log(targetId)

    return (
        <p>
            Fuck umar from examine target
        </p>
    )
}