import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DogContext } from "../components/AppContext";
import FavoriteCard from "../components/FavoriteCard";


function MyFavorites() {
  const { favoriteList, setFavoriteList } = useContext(DogContext);

  console.log(favoriteList);

  function handleClick(id) {
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

  return (
    <div className="fav-page-container">
      <div className="fav-dog-container">
        <h2 className="fav-dog-title">My Favorited Dogs:</h2>
        <div className="fav-dog-grid">
          {favoriteList.map(favorite => (
            <FavoriteCard key={favorite.dog.id} favorite={favorite} onDelete={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFavorites;