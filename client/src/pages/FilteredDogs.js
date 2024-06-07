import React, { useContext } from "react";
import { DogContext } from "../components/AppContext";
import DogCard from "../components/DogCard";

function FilteredDogs() {

    const { filteredList, setFilteredList } = useContext(DogContext);

    return(
        <div className="filtered-list-container">
            <h1 className="dog-list-title">Available {filteredList[0]['breed']}'s</h1>
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
                    />
                ))}
            </div>
        </div>
    );
}

export default FilteredDogs; 