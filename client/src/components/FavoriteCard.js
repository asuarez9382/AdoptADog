import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';


function FavoriteCard({ favorite, onDelete }) {
  const [showInput, setShowInput] = useState(false);

  function handleNoteToggle() {
    setShowInput(prevState => !prevState);
  }

  //Next steps:
  //style button to be centered get input not patch working

  return (
    <div className="fav-dog-card">
      <button className="delete-button" onClick={() => onDelete(favorite.id)}>x</button>
      <Link to={`/dogs/${favorite.dog.id}`} className="fav-dog-link">
        <img src={favorite.dog.image} alt={favorite.dog.breed} className="fav-dog-image" />
      </Link>
      <div className="fav-dog-details">
        <h3 className="fav-dog-name">{favorite.dog.name}</h3>
        <p className="fav-dog-breed">{favorite.dog.breed}</p>
        <p className="fav-dog-price">${favorite.dog.price}</p>
      </div>
      <div className="note-button-container">
        <button className="toggle-note-button" onClick={handleNoteToggle}>
          &#x25BC;
        </button>
        {/* Show input or "hi" only if showInput is true */}
        {showInput && <p>hi</p>}
      </div>
    </div>
  );
}

export default FavoriteCard;