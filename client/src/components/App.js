import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "./AppContext";
import Home from "../pages/Home"
import Header from "./Header";
import AvailableDogs from "../pages/AvailableDogs";
import ListDog from "../pages/ListDog";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserPage from "../pages/UserPage";
import FilteredDogs from "../pages/FilteredDogs";
import DogPage from "../pages/DogPage";


function App() {
  

  return (
    <Provider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes> 
            <Route path="/" element={<Home />} /> 
            <Route path="/dogs" element={<AvailableDogs/>} />
            <Route path="/dogs/:id" element={<DogPage/>} />
            <Route path="/listdog" element={<ListDog/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/users/:id" element={<UserPage/>} />
            <Route path="/dogs/:breed" element={<FilteredDogs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
