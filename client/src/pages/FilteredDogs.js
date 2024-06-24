import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DogContext } from "../components/AppContext";
import DogCard from "../components/DogCard";

function FilteredDogs() {

    const { filteredList, 
            setFilteredList, 
            currentBreed, 
            showLogOn, 
            setShowLogOn, 
            userData, 
            showLikedMessage 
        } = useContext(DogContext);

    const navigate = useNavigate();

    console.log(showLogOn)

    if(!filteredList){
        console.log("took me to home")
        navigate("/");
    }

    return(
        <div className="filtered-list-container">
            <h1 className="dog-list-title">Available {currentBreed}'s</h1>
            { showLikedMessage ? <h2 className="log-on-adopt-message">Log on to favorite a dog</h2> : "" }
            { showLogOn ? <h2 className="log-on-adopt-message">Log on to adopt a dog</h2> : "" }
            <div className="filtered-list">
                {filteredList.map(dog => (
                    <DogCard
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                        breed={dog.breed}
                        image={dog.image}
                        isAdopted={dog.isAdopted}
                        age={dog.age}
                        description={dog.description} 
                        price={dog.price}
                        userData={userData}
                    />
                ))}
            </div>
        </div>
    );
}

export default FilteredDogs; 