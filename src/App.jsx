import React, { useState } from "react";
//import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GoogleMaps from "./components/GoogleMaps";
import PathRowFinder from "./components/PathRowFinder";
import Login from "./pages/Login/Login";

function App() {
  const [userEmail, setUserEmail] = useState("");

  const pageContent =
    userEmail == "" ? (
      <Login setUserEmail={( user ) => {
          setUserEmail(user);
      }} />
    ) : (
      <div>
        <PathRowFinder />
        <GoogleMaps />
      </div>
    );

  return <>{pageContent}</>;
}

export default App;
