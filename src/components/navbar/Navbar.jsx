import style from "./Navbar.module.css"
import { faCircleUp , faMap , faCircleDot , faCircleDown , faSignIn , faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTarget } from "../../utils/useTarget"
import useAuth from "../../utils/useAuth"
import {useRef} from 'react'

export default function Navbar(){

    const { targetsState } = useTarget()
    const { downloadTarget } = targetsState()

    const { userState } = useAuth()
    const { user , logout } = userState()

    const hasLoggedIn = user.token != ''
    const fileInputRef = useRef(null)
    const handleUpload = (event) => {
        const file = event.target.files[0];
    
        if (!file) {
            alert('Please choose a file');
            console.log('No file selected.');
        } 
        else {    }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };


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
                    <a href="#" onClick={triggerFileInput}>
                        <FontAwesomeIcon className={style.icon} icon={faCircleUp} />
                        <input type="file" accept=".csv, .xlsx" onChange={handleUpload} ref={fileInputRef} style={{display:'none'}}/>
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