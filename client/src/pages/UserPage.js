import React, { useContext } from "react";
import { DogContext } from "../components/AppContext";

function UserPage() {

    const { userData } = useContext(DogContext)

    //Problems:
    //userData.dogs.map dies on relogin
    //multiple users can adopt the same dog 
    //user_id and dogs [] not getting commited to database therefore above

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