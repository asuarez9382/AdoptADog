import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';


function FavoriteCard({ favorite, onDelete }) {
  const [showInput, setShowInput] = useState(false);
  const [note, setNote] = useState("")
  

  function handleNoteToggle() {
    setShowInput(prevState => !prevState);
  }

  function handleChange(e) {
    setNote(e.target.value)
    console.log(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log("Submitted!")
    setNote("")
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
          { showInput ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
        </button>
      </div>
      <div className='note-container'>
        {showInput ? (
            <div className='note-sub-container'>
                <div className="note-input-container">
                    <input
                        type="text"
                        name="note"
                        className="note-input"
                        value={note} 
                        onChange={handleChange}
                        placeholder="Enter your note..."
                    />
                    <button className='note-button' onClick={handleSubmit}>Submit</button>
                </div>
                <div className='note-display'>
                    <span className='note'>{note}</span>
                </div>
            </div>
        ) : ""}
        </div>
    </div>
  );
}

export default FavoriteCard;