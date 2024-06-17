import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DogContext } from "../components/AppContext";


function MyFavorites(){

  const { favoriteList, setFavoriteList } = useContext(DogContext);
   
  console.log(favoriteList)


  function handleClick(id){
    fetch(`/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      // Update favoriteList to remove the deleted favorite
      setFavoriteList(prevList => prevList.filter(fav => fav.id !== id));
    })
    .catch(error => {
      console.error('Error removing favorite:', error);
    });
  }
  //Next step add trash can icon to make delete request to api
  //Add button to add a note about favorited dog

    return(
      <div className="fav-page-container">
        <div className="fav-dog-container">
          <h2 className="fav-dog-title">My Favorited Dogs:</h2>
          <div className="fav-dog-grid">
            {favoriteList.map(favorite => (
              <div className="fav-dog-card" key={favorite.dog.id}>
                <button className="delete-button" onClick={() => handleClick(favorite.id)}>x</button>
                <Link to={`/dogs/${favorite.dog.id}`} className="fav-dog-link">
                  <img src={favorite.dog.image} alt={favorite.dog.breed} className="fav-dog-image" />
                </Link>
                  <div className="fav-dog-details">
                    <h3 className="fav-dog-name">{favorite.dog.name}</h3>
                    <p className="fav-dog-breed">{favorite.dog.breed}</p>
                    <p className="fav-dog-price">${favorite.dog.price}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
    </div>
    );
}

export default MyFavorites;