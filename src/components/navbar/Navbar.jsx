import style from "./Navbar.module.css"
import { faGear , faMap , faCircleDot , faCircleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Navbar(){
    return (
        <div className={style.container}>
            <ul className={style.list}>
                <li className={style.logo}>

                </li>
                <li>
                    <a href="/">
                        <FontAwesomeIcon className={style.icon} icon={faMap} />
                    </a>
                </li>
                <li>
                    <a href="/targets">
                        <FontAwesomeIcon className={style.icon} icon={faCircleDot} />
                    </a>
                </li>
                <li>
                    <a href="/setting">
                        <FontAwesomeIcon className={style.icon} icon={faGear} />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <FontAwesomeIcon className={style.icon} icon={faCircleDown} />
                    </a>
                </li>
            </ul>
        </div>
    )
}