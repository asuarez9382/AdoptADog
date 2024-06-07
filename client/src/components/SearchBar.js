import React, { useState, useContext, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { DogContext } from './AppContext';

function SearchBar() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [uniqueBreeds, setUniqueBreeds] = useState([]);

  const { dogList } = useContext(DogContext);

  useEffect(() => {
    const breedSet = new Set();
    dogList.forEach(dog => {
      breedSet.add(dog.breed);
    });
    setUniqueBreeds(Array.from(breedSet));
  }, [dogList]);

  function handleClick(e) {
    console.log(value);
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



