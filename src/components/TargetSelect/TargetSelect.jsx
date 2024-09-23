import { useState } from "react";
import style from "./TargetSelect.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function TargetSelect(props){

    const [ selectedOption , setSelectedOption ] = useState()

    for(let i=0; i < props.num;i++)

    

    return (
    <div className={style.container}>
        <div className={style.header}>
            <span>Select one of the targets</span>
            <button><FontAwesomeIcon icon={faClose} /></button>
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
        </div>
    </div>
    )

}