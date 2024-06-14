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
      <div className="user-page-container">
        <div className="user-dog-container">
            <h2 className="user-dog-title">My Favorited Dogs:</h2>
            {favoriteList.map(favorite=>(
              <div className="user-dog-details" key={favorite.dog.id}>
                
                <h2>{favorite.dog.name}</h2>
                <Link to={`/dogs/${favorite.dog.id}`}>
                  <img src={favorite.dog.image} alt={favorite.dog.breed} className="user-dog-image" />
                </Link>
                <button onClick={() => handleClick(favorite.id)}>x</button>
              </div>
              )
            )}
        </div>
      </div>
    );
}

export default MyFavorites;