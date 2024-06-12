import React, { useContext } from "react";
import { DogContext } from "../components/AppContext";

function UserPage() {

    const { userData } = useContext(DogContext)

    //Problems:
    //userData.dogs.map dies on relogin


    return(
        
            <div className="user-page-container">
                <div className="welcome-banner">
                    <h1>Welcome, {userData.username}!</h1>
                </div>
                <div>
                        <h2>My Adopted Dogs:</h2>
                        {userData.dogs.map(dog => (
                            <h3>{dog.name}</h3>
                        ))}
                </div>
            </div>
        
    );
}

export default UserPage;