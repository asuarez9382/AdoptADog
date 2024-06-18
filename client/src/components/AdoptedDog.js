import React from "react";
import { Link } from "react-router-dom";

function AdoptedDog({ id, name, breed, image }){

    return(
        <div className="user-dog-details" key={id}>
            <h2>{name}</h2>
            <Link to={`/dogs/${id}`}>
                <img src={image} alt={breed} className="user-dog-image" />
            </Link>
        </div>
    );
}

export default AdoptedDog;