import React, { useEffect, useState } from "react";
import DogCard from "./DogCard";


function DogList(){

    const [dogList, setDogList] = useState([]);
    

    useEffect(() => {
        fetch("/dogs")
        .then(r => {
            if(r.ok){
                r.json()
                .then(dogs => {
                    setDogList(dogs)
                })
            } else {
                console.log(r)
            }
        })
    },[]);

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
                        isAdopted={dog.isAdopted}
                        age={dog.age}
                        description={dog.description} 
                    />
                ))}
            </div>
        </div>

        
    );
}

export default DogList;