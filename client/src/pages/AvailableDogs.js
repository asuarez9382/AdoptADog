import React, { useContext } from "react";
import DogList from "../components/DogList";



function AvailableDogs() {

    

    return (
            <div className="dog-list-container">
                <DogList />
            </div>
    );
}

export default AvailableDogs;