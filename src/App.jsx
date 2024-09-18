import React, { useState } from "react";
import { Routes , Route} from "react-router-dom"
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Setting from "./pages/setting/Setting";
import Targets from "./pages/Targets/Targets";

export default function App() {
  const [userEmail, setUserEmail] = useState("");

  return ( 
  <Routes>
    <Route path="/" element={<Layout />}>
      
      {/* general Paths */}
      <Route path="/" element={<Home />} />
      <Route path="/setting" element={<Setting />}/>
      <Route path="/targets" element={<Targets />} />

    </Route>
  </Routes>
  )
}
