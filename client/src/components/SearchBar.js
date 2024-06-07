import React, { useCallback, useContext, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { DogContext } from './AppContext';


const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  }
];


function SearchBar() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const { dogList, setDogList } = useContext(DogContext)



  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return dogList.filter(dog => regex.test(dog.breed));
  }

  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };
  
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion.breed;

  const renderSuggestion = suggestion => (
    <span>{suggestion.breed}</span>
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
      <button>Search</button>
    </div>
  );
}

export default SearchBar;


