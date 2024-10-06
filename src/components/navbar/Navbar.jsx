import style from "./Navbar.module.css"
import { faCircleUp , faMap , faCircleDot , faCircleDown , faSignIn , faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTarget } from "../../utils/useTarget"
import useAuth from "../../utils/useAuth"
import { useEffect} from 'react'
import useAPI from "../../utils/useAPI"

export default function Navbar(){

    const { targetsState } = useTarget()
    const { downloadTarget , deletePrev } = targetsState()

    const { userState } = useAuth()
    const { user , logout } = userState()

    const { syncUserTarget } = useAPI()

    const hasLoggedIn = user.token != ''

    useEffect(() => {

        console.log("I was ran")

        if(!hasLoggedIn)
            deletePrev()
        else
            syncUserTarget()

    } , [user])

    const loginOption = <li>
        <a href="/login">
            <FontAwesomeIcon className={style.icon} icon={faSignIn} />
        </a>
    </li>

    const logoutOption = <li>
        <a href="#" onClick={logout}>
            <FontAwesomeIcon className={style.icon} icon={faSignOut} />
        </a>
    </li>

    return (
        <div className={style.container}>
            <ul className={style.list}>
                <a href="/about" className={style.pointToLIKN}>
                    <li className={style.logo}>

                    </li>
                </a>
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
                    <a href="#">
                        <FontAwesomeIcon className={style.icon} icon={faCircleUp} />
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => downloadTarget()}>
                        <FontAwesomeIcon className={style.icon} icon={faCircleDown} />
                    </a>
                </li>
                {!hasLoggedIn ? loginOption : logoutOption}
            </ul>
        </div>
    )
}