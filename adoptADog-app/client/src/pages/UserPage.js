import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdoptedDog from "../components/AdoptedDog";

function UserPage() {

    

    const [userData, setUserData] = useState("");

    const { id } = useParams()
    

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
            <div className="user-dog-container">
                <h2 className="user-dog-title">My Adopted Dogs:</h2>
                <div className="user-dog-grid">
                {userData.dogs.map(dog => (
                    <AdoptedDog 
                        id ={dog.id} 
                        name={dog.name} 
                        breed={dog.breed}
                        image={dog.image}
                        key={dog.id}
                    />
                ))}
                </div>
            </div>
        </div>
      
        
    );
}

export default UserPage;