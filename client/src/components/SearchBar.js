import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { DogContext } from './AppContext';
import DogCard from './DogCard';

function SearchBar({ showMessage, setShowMessage }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [uniqueBreeds, setUniqueBreeds] = useState([]);

  const { 
      dogList, 
      filteredList, 
      setFilteredList, 
      currentBreed, 
      setCurrentBreed 
    } = useContext(DogContext);

  const navigate = useNavigate();

  useEffect(() => {
    const breedSet = new Set();
    dogList.forEach(dog => {
      breedSet.add(dog.breed);
    });
    setUniqueBreeds(Array.from(breedSet));
  }, [dogList]);

  function handleClick(e) {
    console.log(value);

    try {
      const uniqueDogs = dogList.filter(dog => {
        console.log(dog.breed)
        return dog.breed == value && dog.is_adopted === false;
      })
      setFilteredList(uniqueDogs)
      setValue("")
      setCurrentBreed(uniqueDogs[0].breed)
      navigate(`/filtered-dogs/${uniqueDogs[0].breed}`)
    }
    catch {
      setShowMessage(true)
    }
  }

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return uniqueBreeds.filter(breed => regex.test(breed));
  }

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setShowMessage(false);
  };
  
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion;

  const renderSuggestion = suggestion => (
    <span>{suggestion}</span>
  );

  const inputProps = {
    placeholder: "Browse Breeds",
    value,
    onChange
  };

  return (
      <div className='searchbar-container'>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
        <button onClick={handleClick}>Search</button>
      </div>
  );
}

export default SearchBar;



