import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GoogleMaps from "./components/GoogleMaps";
import PathRowFinder from "./components/PathRowFinder";

function App() {
  return (
    <div>
      <PathRowFinder />
      <GoogleMaps />
    </div>
  );
}

export default App;
