import React from "react";
import { Routes, Route } from "react-router-dom"
import {Dashboard} from "./dashboard";
import CheckIn from "./checkinout/checkIn";
import {Login} from "./login";
import { Setting } from "./settings";

function App() {

  
  
  return (
    <>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="checkin" element={<CheckIn/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="settings" element={<Setting/>}/>
        </Routes>
    </>
         
    
  );
}

export default App;
