import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DogContext } from "../components/AppContext";

function UserPage() {

    //const { userData, setUserData } = useContext(DogContext)

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
                        {userData.dogs.map(dog=>(
                            <div className="user-dog-details" key={dog.id}>
                                <h2>{dog.name}</h2>
                                <Link to={`/dogs/${dog.id}`}>
                                    <img src={dog.image} alt={dog.breed} className="user-dog-image" />
                                </Link>
                            </div>
                        )
                        )}
                </div>
            </div>
        
    );
}

export default UserPage;