import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DogContext } from "../components/AppContext";

function UserPage() {

    //const { userData, setUserData } = useContext(DogContext)

    const [userData, setUserData] = useState("");

    const { id } = useParams()
    //Problems:
    //userData.dogs.map dies on relogin

    console.log(id)
    
    useEffect(()=> {
        fetch(`/users/${id}`)
        .then(r => r.json())
        .then(data => setUserData(data))
    },[id])

    if (!userData.dogs) {
        return <div>Loading...</div>;
    }

    return(
        
            <div className="user-page-container">
                <div className="welcome-banner">
                    <h1>Welcome, {userData.username}!</h1>
                </div>
                <div>
                        <h2>My Adopted Dogs:</h2>
                        {userData.dogs.map(dog=>(
                            <h2>{dog.name}</h2>
                        )
                        )}
                </div>
            </div>
        
    );
}

export default UserPage;