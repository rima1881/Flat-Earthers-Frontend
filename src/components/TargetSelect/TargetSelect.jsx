import { useState } from "react";
import style from "./TargetSelect.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function TargetSelect(props){

    const [ selectedOption , setSelectedOption ] = useState()
    const [ isOn , setIsOn ] = props.isOn

    const closeHandle = () => setIsOn(false)

    for(let i=0; i < props.num;i++)

    

    return (
    <div className={isOn ? style.containerOn : style.containeroff}>
        <div className={style.header}>
            <span>Select one of the targets</span>
            <button><FontAwesomeIcon icon={faClose} onClick={closeHandle} /></button>
        </div>
        <div className={style.body}>
            <ul className={style.list}>
                <li>
                    <span>Option 1</span>
                </li>
                <li> 
                    <span>Option 2</span>
                </li>
                <li>
                    <span>Option 3</span>
                </li>
            </ul>
            <button className={style.submit}>Submit</button>
        </div>
    </div>
    )

}