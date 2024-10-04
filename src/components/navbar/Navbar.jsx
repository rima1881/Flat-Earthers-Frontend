import style from "./Navbar.module.css"
import { faCircleUp , faMap , faCircleDot , faCircleDown , faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTarget } from "../../utils/useTarget"
import useAuth from "../../utils/useAuth"


export default function Navbar(){

    const { targetsState } = useTarget()
    const { downloadTarget } = targetsState()

    const { userState } = useAuth()
    const { user } = userState()


    const hasLoggedIn = user.token != ""

    const loginOption = <li>
        <a href="/login">
            <FontAwesomeIcon className={style.icon} icon={faLock} />
        </a>
    </li>

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
                    <a href="/upload">
                        <FontAwesomeIcon className={style.icon} icon={faCircleUp} />
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => downloadTarget()}>
                        <FontAwesomeIcon className={style.icon} icon={faCircleDown} />
                    </a>
                </li>
                {!hasLoggedIn && loginOption}
            </ul>
        </div>
    )
}