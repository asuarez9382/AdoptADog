import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  const [adopted, setAdopted] = useState(is_adopted)

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
      setAdopted(true) 
      // Handle success response here
    })
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
        <h3 className={`dog-status ${adopted ? 'adopted' : 'available'}`}>
            {adopted ? "Adopted" : "Available for Adoption"}
        </h3>
        <h3 className="dog-breed">{breed}</h3>
        <h3 className="dog-price">${price}</h3>
        <h3 className="dog-age">Age: {age}</h3>
        <p className="dog-description">{description}</p>
        <button onClick={handleClick} className="adopt-btn">Adopt Me</button>
    </div>
  );
}

export default DogCard;
