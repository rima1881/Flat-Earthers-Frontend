import React from "react";
import { Routes , Route} from "react-router-dom"
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Targets from "./pages/Targets/Targets";
import Login from "./pages/Login/Login"
import { useTarget } from "./utils/useTarget";
import useAuth from "./utils/useAuth";
import ExamineTarget from "./pages/ExamineTarget/ExamineTarget";
import PrivateRoutes from "./utils/privateRoutes";

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
            <Route path="/targets" element={<Targets />} />
            <Route path="/login" element={<Login />} />

            {/* user Paths */}
            <Route element={<PrivateRoutes />}>
              <Route path="/examine/:targetId" element={<ExamineTarget />} />
            </Route>


          </Route>
        </Routes>
      </AuthProvider>
    </TargetsProvider>
  )
}
