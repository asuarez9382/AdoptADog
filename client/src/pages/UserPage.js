import React, { useContext } from "react";
import { DogContext } from "../components/AppContext";

function UserPage() {

    const { userData } = useContext(DogContext)

    return(
        <div>
            <h1>Welcome {userData.username}!</h1>
        </div>
    );
}

export default UserPage;