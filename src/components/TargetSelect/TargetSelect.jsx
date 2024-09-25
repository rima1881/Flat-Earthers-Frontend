import style from "./TargetSelect.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function TargetSelect({options, clearOptions}){



    const isOn = options.length > 0


    const OptionTemplate = ({isActive , text}) => (<li className={ isActive ? style.active : ""}>
        <span>{ text }</span>
    </li>)

    const renderedOptions = options.map( ( _ , index) => <OptionTemplate isActive={false} text={"Option " + (index + 1)} key={index} /> )

    const submitHandle = () => {
        clearOptions()
    }

    return (
        <>
            <div className={isOn ? style.blockMap : style.unBlockMap}></div>
            <div className={isOn ? style.containerOn : style.containeroff}>
            <div className={style.header}>
                <span>Select one of the targets</span>
                <button onClick={clearOptions}><FontAwesomeIcon icon={faClose} /></button>
            </div>
                <div className={style.body}>
                    <ul className={style.list}>
                        {renderedOptions}
                    </ul>
                    <button className={style.submit} onClick={submitHandle}>Submit</button>
                </div>
            </div>
        </>
    )

}