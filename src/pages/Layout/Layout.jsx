import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar"
import style from "./Layout.module.css"


export default function Layout(){


    return(
        
        <main>
            <div className={style.container}>
                <div className={style.sideBar}>
                    <Navbar />
                </div>
                <div className={style.content}>
                    <Outlet />
                </div>
            </div>
        </main>
    )


}