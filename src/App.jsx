import React, { useState } from "react";
import { Routes , Route} from "react-router-dom"
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Setting from "./pages/setting/Setting";
import Targets from "./pages/Targets/Targets";
import Login from "./pages/Login/Login"
import { useTarget } from "./utils/useTarget";
import useAuth from "./utils/useAuth";



export default function App() {

  const { TargetsProvider } = useTarget()
  const { AuthProvider } = useAuth()

  return (          
    <TargetsProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* general Paths */}
            <Route path="/" element={<Home />} />
            <Route path="/setting" element={<Setting />}/>
            <Route path="/targets" element={<Targets />} />
            <Route path="/login" element={<Login />} />

          </Route>
        </Routes>
        </AuthProvider>
    </TargetsProvider>
  )
}
