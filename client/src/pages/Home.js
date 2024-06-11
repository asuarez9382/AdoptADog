import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    
    const [ showMessage, setShowMessage ] = useState(false)

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
            {
                showMessage ? <span className="availability-message">There are no more dogs availble of this breed.</span>
                :
                ""
            }
            <SearchBar showMessage={showMessage} setShowMessage={setShowMessage} />
        </main>
    );
}

export default Home;