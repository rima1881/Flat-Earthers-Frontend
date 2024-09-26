import style from "./TargetSelect.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useTarget } from "../../utils/useTarget";

export default function TargetSelect({options, clearOptions, setActive}){

    console.log(options)

    const isOn = options.length > 0

    const OptionTemplate = ({isActive , text , index}) => (<li className={ isActive ? style.active : ""} onClick={() =>setActive(index)}>
        <span>{ text }</span>
    </li>)

    const renderedOptions = options.map( ( _ , index) => <OptionTemplate isActive={options.activeIndex == index} text={"Option " + (index + 1)} key={index} index={index} /> )

    const { targetsState } = useTarget()
    const { addTarget } = targetsState()

    console.log(targetsState())

    const submitHandle = () => {

        const newTarget = options[options.activeIndex]

        console.log(addTarget)


        addTarget(newTarget)

        clearOptions()
    }

    return (
        <>
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