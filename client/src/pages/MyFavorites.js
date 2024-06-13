import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DogContext } from "../components/AppContext";


function MyFavorites(){

  const { favoriteList } = useContext(DogContext);
   
  console.log(favoriteList)

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
              </div>
              )
            )}
        </div>
      </div>
    );
}

export default MyFavorites;