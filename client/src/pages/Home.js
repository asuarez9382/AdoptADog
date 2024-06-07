import React from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();


    function handleClick(e){
        navigate("/dogs")
    }

    return (
        <main className="home-main">
            <div className="home-container"> 
                <h1>Welcome to AdoptADog</h1>
                <p>Your perfect pet is just a click away.</p>
                <button className="explore-button" onClick={handleClick}>Explore Available Dogs</button>
            </div>  
            <SearchBar />
        </main>
    );
}

export default Home;