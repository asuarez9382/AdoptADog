import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Header from "./Header";
import AvailableDogs from "../pages/AvailableDogs";
import ListDog from "../pages/ListDog";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/dogs" element={<AvailableDogs/>} />
          <Route path="/listdog" element={<ListDog/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
