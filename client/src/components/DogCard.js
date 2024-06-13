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
  price,
  userData
}) {

  
  const { 
      dogList, 
      setDogList, 
      adoptTrigger, 
      setAdoptTrigger, 
      handleLoggedOffClick,
      handleLikedLoggedOffClick,
      favoriteList,
      setFavoriteList
     } = useContext(DogContext)

  const [isLiked, setIsLiked] = useState(false);
  

  const { filteredBreed } = useParams()

  console.log(favoriteList)
  

  const toggleLike = () => {
    setIsLiked(prevIsLiked => {
      // Toggle the state
      const newIsLiked = !prevIsLiked;
  
      // If isLiked is now true, make the GET request
      if (newIsLiked) {
        fetch('/favorites', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user_id: userData['id'],
              dog_id: id
          })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log('New favorite data:', data);
              setFavoriteList([...favoriteList, data])
          })
          .catch(error => {
              console.error('Error adding new dog:', error);
          });
        }
      // Return the new state value
      return newIsLiked;
    });
  };

  function handleClick(e){
    
    if(!is_adopted){
      fetch(`/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_adopted: true,
          user_id: userData['id']
        })
      })
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json();
      })
      .then(dogData => {
        setAdoptTrigger(status => !status)
        userData.dogs.push(dogData)
      }
      )
      .catch(error => {
        console.error('Error:', error);
        // Handle error here
      });
    }
    else{
      console.log("Already adopted!")
    }
  }

  return (
    <div className="dog-card">
        <div className="dog-image-container">
          <Link to={`/dogs/${id}`}>
            <img src={image} alt={breed} className="dog-image" />
          </Link>
        </div>
        <div className="dog-header">
          <div className="dog-name-container">
            <h3 className="dog-name">{name}</h3>
          </div>
          <div className="dog-heart-container">
            {userData ? (
              <span className={`heart ${isLiked ? "liked" : ""}`} onClick={toggleLike}>
                ♥️
              </span>
            ) : (
              <span className='heart' onClick={handleLikedLoggedOffClick}>
                ♥️
              </span>
            )
            }
          </div>
        </div>
        <h3 className={`dog-status ${is_adopted ? 'adopted' : 'available'}`}>
            {is_adopted ? "Adopted" : "Available for Adoption"}
        </h3>
        <h3 className="dog-breed">{breed}</h3>
        <h3 className="dog-price">${price}</h3>
        <h3 className="dog-age">Age: {age}</h3>
        <p className="dog-description">{description}</p>
        {userData ? (
          filteredBreed ? (
            ""
          ) : (
            <button onClick={handleClick} className="adopt-btn">Adopt Me</button>
          )
        ) : (
          <button onClick={handleLoggedOffClick} className="adopt-btn">Adopt Me</button>
        )}
    </div>
  );
}

export default DogCard;
