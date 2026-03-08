import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Curd from "./Dash";


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <Login setIsLoggedIn={setIsLoggedIn} />
        } />

        {/* <Route path="/home" element={
          isLoggedIn ? <Curd/> : <Navigate to="/" />
        } /> */}
    <Route 
  path="/home" 
  element={isLoggedIn ? <Curd setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/" />}
/>
      </Routes>
    </BrowserRouter>
  );
}
