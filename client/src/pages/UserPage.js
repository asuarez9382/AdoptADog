import React, { useContext } from "react";
import { DogContext } from "../components/AppContext";

function UserPage() {

    const { userData } = useContext(DogContext)

    return(
        
            <div className="user-page-container">
                <div className="welcome-banner">
                    <h1>Welcome, {userData.username}!</h1>
                </div>
            </div>
        
    );
}

export default UserPage;