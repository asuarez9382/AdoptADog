import React, { useContext, useEffect, useState } from "react";
import DogCard from "./DogCard";
import { DogContext } from "./AppContext";


function DogList(){

    const { dogList } = useContext(DogContext);

    if (!dogList) {
        // Handle the case where dogList is null or undefined
        return <div>Loading...</div>; // or any other loading indicator
    }

    return (
        <div className="dog-list-container">
            <h1 className="dog-list-title">Available Dogs</h1>
            <div className="dog-list">
                {dogList.map(dog => (
                    <DogCard
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                        breed={dog.breed}
                        image={dog.image}
                        is_adopted={dog.is_adopted}
                        age={dog.age}
                        description={dog.description} 
                        price={dog.price}
                    />
                ))}
            </div>
        </div>

        
    );
}

export default DogList;