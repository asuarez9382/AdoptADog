import React from "react";

function DogCard({
  id,
  name,
  breed,
  age,
  description,
  isAdopted,
  image,
  price
}) {
  return (
    <div className="dog-card">
        <div className="dog-image-container">
            <img src={image} alt={breed} className="dog-image" />
        </div>
        <h3 className="dog-name">{name}</h3>
        <h3 className={`dog-status ${isAdopted ? 'adopted' : 'available'}`}>
            {isAdopted ? "Adopted" : "Available for Adoption"}
        </h3>
        <h3 className="dog-breed">{breed}</h3>
        <h3 className="dog-price">${price}</h3>
        <h3 className="dog-age">Age: {age}</h3>
        <p className="dog-description">{description}</p>
    </div>
  );
}

export default DogCard;
