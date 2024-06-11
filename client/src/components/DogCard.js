import React, { useState, useContext } from "react";
import { DogContext } from "./AppContext";
import { Link, useParams } from "react-router-dom";

function DogCard({
  id,
  name,
  breed,
  age,
  description,
  is_adopted,
  image,
  price
}) {

  
  const { dogList, setDogList, adoptTrigger, setAdoptTrigger } = useContext(DogContext)

  const { filteredBreed } = useParams()

  console.log(`from filtered ${filteredBreed}`)

  function handleClick(e){
    
    fetch(`/dogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        is_adopted: true
      })
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setAdoptTrigger(status => !status)
      console.log(adoptTrigger)
    }
    )
    .catch(error => {
      console.error('Error:', error);
      // Handle error here
    });
  }

  return (
    <div className="dog-card">
        <div className="dog-image-container">
          <Link to={`/dogs/${id}`}>
            <img src={image} alt={breed} className="dog-image" />
          </Link>
        </div>
        <h3 className="dog-name">{name}</h3>
        <h3 className={`dog-status ${is_adopted ? 'adopted' : 'available'}`}>
            {is_adopted ? "Adopted" : "Available for Adoption"}
        </h3>
        <h3 className="dog-breed">{breed}</h3>
        <h3 className="dog-price">${price}</h3>
        <h3 className="dog-age">Age: {age}</h3>
        <p className="dog-description">{description}</p>
        {
          filteredBreed ? ""
          :
          <button onClick={handleClick} className="adopt-btn">Adopt Me</button>
        }
    </div>
  );
}

export default DogCard;
